#!/usr/bin/env python3
"""Quiz web app server.

Serves the static frontend and a small JSON API using only the Python
standard library. Binds to localhost only.

Usage:
    python server.py [port]        # default port: 8000
"""

import json
import mimetypes
import os
import re
import sys
import threading
from datetime import datetime
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent
QUIZ_DIR = ROOT / "_quizzes"
RESULTS_DIR = ROOT / "_results"

HOST = "127.0.0.1"
DEFAULT_PORT = 8003
MAX_BODY_BYTES = 1_000_000

# Only these paths are served as static files (no directory listing, no traversal).
STATIC_ROUTES = {"/": ROOT / "index.html", "/index.html": ROOT / "index.html"}
STATIC_DIRS = {"/styles/": ROOT / "styles", "/scripts/": ROOT / "scripts"}

QUESTION_TYPES = ("multiple_choice", "multiple_select")

# Result file names look like: <name>_result_2026-10-14T154500.jsonl (optional _N suffix).
SESSION_RE = re.compile(r"^[A-Za-z0-9._-]+_result_\d{4}-\d{2}-\d{2}T\d{6}(?:_\d+)?\.jsonl$")

_write_lock = threading.Lock()


# --------------------------------------------------------------------------
# Quiz loading and validation
# --------------------------------------------------------------------------

def validate_quiz(data):
    """Return an error message if the quiz is malformed, else None."""
    if not isinstance(data, dict):
        return "Quiz must be a JSON object."
    if not isinstance(data.get("title"), str) or not data["title"].strip():
        return "Missing or empty 'title'."
    questions = data.get("questions")
    if not isinstance(questions, list) or not questions:
        return "'questions' must be a non-empty list."

    seen_ids = set()
    for index, q in enumerate(questions, start=1):
        where = f"Question #{index}"
        if not isinstance(q, dict):
            return f"{where}: must be an object."
        qid = q.get("id")
        if isinstance(qid, bool) or not isinstance(qid, int):
            return f"{where}: 'id' must be an integer."
        if qid in seen_ids:
            return f"{where}: duplicate id {qid}."
        seen_ids.add(qid)
        if q.get("type") not in QUESTION_TYPES:
            return f"{where}: 'type' must be one of {', '.join(QUESTION_TYPES)}."
        if not isinstance(q.get("question"), str) or not q["question"].strip():
            return f"{where}: missing 'question' text."
        choices = q.get("choices")
        if (
            not isinstance(choices, dict)
            or not choices
            or not all(isinstance(v, str) for v in choices.values())
        ):
            return f"{where}: 'choices' must be an object of letter -> text."
        answer = q.get("answer")
        if q["type"] == "multiple_choice":
            if not isinstance(answer, str) or answer not in choices:
                return f"{where}: 'answer' must be one letter that exists in 'choices'."
        else:
            if (
                not isinstance(answer, list)
                or not answer
                or len(set(answer)) != len(answer)
                or not all(isinstance(a, str) and a in choices for a in answer)
            ):
                return f"{where}: 'answer' must be a list of unique letters from 'choices'."
        if not isinstance(q.get("justification"), str):
            return f"{where}: missing 'justification'."
    return None


def read_quiz_file(path):
    """Return (quiz_dict, error_message). Exactly one is None."""
    try:
        # utf-8-sig also accepts files saved with a BOM (common on Windows editors).
        with open(path, "r", encoding="utf-8-sig") as f:
            data = json.load(f)
    except (OSError, json.JSONDecodeError) as exc:
        return None, f"Could not read quiz file: {exc}"
    error = validate_quiz(data)
    return (None, error) if error else (data, None)


def slug_for(path):
    """Slug = path relative to _quizzes/, no extension, '/' separators."""
    return path.relative_to(QUIZ_DIR).with_suffix("").as_posix()


def discover_quiz_files():
    """Return all quiz files at any depth, skipping hidden files and directories."""
    paths = []
    for path in QUIZ_DIR.rglob("*.json"):
        relative_parts = path.relative_to(QUIZ_DIR).parts
        if any(part.startswith(".") for part in relative_parts):
            continue
        if path.is_file():
            paths.append(path)
    # Sort by directory and file name, case-insensitive, so the order is stable.
    return sorted(paths, key=lambda p: [part.lower() for part in p.relative_to(QUIZ_DIR).parts])


def find_quiz_path(slug):
    """Match the slug against discovered files so request input never builds a path."""
    for path in discover_quiz_files():
        if slug_for(path) == slug:
            return path
    return None


def list_quizzes():
    items = []
    for path in discover_quiz_files():
        quiz, error = read_quiz_file(path)
        if error:
            items.append({
                "slug": slug_for(path),
                "title": path.stem,
                "description": "",
                "question_count": 0,
                "error": error,
            })
        else:
            items.append({
                "slug": slug_for(path),
                "title": quiz["title"],
                "description": quiz.get("description", ""),
                "question_count": len(quiz["questions"]),
            })
    return items


# --------------------------------------------------------------------------
# Results (append-only JSONL)
# --------------------------------------------------------------------------

def now_iso():
    return datetime.now().astimezone().isoformat(timespec="seconds")


def dump_line(record):
    return json.dumps(record, ensure_ascii=False) + "\n"


def create_result_file(quiz_path, start_record):
    """Create a results file, mirroring the quiz's folder under _results/.

    Returns the session id: the file's path relative to _results/ ('/' separators).
    Directory names come from the real quiz path on disk, not from request input.
    """
    relative_dir = quiz_path.relative_to(QUIZ_DIR).parent
    target_dir = RESULTS_DIR / relative_dir
    target_dir.mkdir(parents=True, exist_ok=True)

    safe_stem = re.sub(r"[^A-Za-z0-9._-]+", "-", quiz_path.stem)
    stamp = datetime.now().strftime("%Y-%m-%dT%H%M%S")
    attempt = 0
    while True:
        suffix = f"_{attempt}" if attempt else ""
        name = f"{safe_stem}_result_{stamp}{suffix}.jsonl"
        try:
            # Mode "x" fails if the file exists, so two quick starts never collide.
            with open(target_dir / name, "x", encoding="utf-8") as f:
                f.write(dump_line(start_record))
                f.flush()
                os.fsync(f.fileno())
            return (relative_dir / name).as_posix()
        except FileExistsError:
            attempt += 1


def resolve_session(session):
    """Return the existing result file for a session id, or None if it is not valid."""
    if not isinstance(session, str) or "\\" in session or "\x00" in session:
        return None
    path = (RESULTS_DIR / session).resolve()
    if not path.is_relative_to(RESULTS_DIR.resolve()):
        return None
    if not SESSION_RE.match(path.name) or not path.is_file():
        return None
    return path


def read_events(path):
    """Return the parsed JSON lines of a results file, skipping blank or damaged lines."""
    events = []
    try:
        with open(path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    events.append(json.loads(line))
                except json.JSONDecodeError:
                    continue
    except OSError:
        pass
    return events


def is_duplicate(existing, record):
    """A retry after a dropped connection must not write the same event twice."""
    if record["event"] == "complete":
        return any(e.get("event") == "complete" for e in existing)
    if record["event"] == "answer":
        return any(
            e.get("event") == "answer" and e.get("question_id") == record["question_id"]
            for e in existing
        )
    return False


def append_result(path, record):
    """Append one line and force it to disk so a crash loses nothing.

    Returns False (and writes nothing) if the event is a duplicate.
    """
    with _write_lock:
        if is_duplicate(read_events(path), record):
            return False
        with open(path, "a", encoding="utf-8") as f:
            f.write(dump_line(record))
            f.flush()
            os.fsync(f.fileno())
        return True


def is_completed(path):
    with _write_lock:
        return any(e.get("event") == "complete" for e in read_events(path))


def is_number(value):
    return isinstance(value, (int, float)) and not isinstance(value, bool)


def is_letter_or_letters(value):
    if isinstance(value, str):
        return True
    return isinstance(value, list) and all(isinstance(v, str) for v in value)


def build_answer_record(body):
    qid = body.get("question_id")
    if isinstance(qid, bool) or not isinstance(qid, int):
        raise ValueError("'question_id' must be an integer.")
    if body.get("type") not in QUESTION_TYPES:
        raise ValueError("'type' is invalid.")
    if not is_letter_or_letters(body.get("selected")) or not is_letter_or_letters(body.get("correct")):
        raise ValueError("'selected' and 'correct' must be a string or list of strings.")
    if not isinstance(body.get("is_correct"), bool):
        raise ValueError("'is_correct' must be a boolean.")
    if not is_number(body.get("score")):
        raise ValueError("'score' must be a number.")
    return {
        "event": "answer",
        "question_id": qid,
        "type": body["type"],
        "selected": body["selected"],
        "correct": body["correct"],
        "is_correct": body["is_correct"],
        "score": body["score"],
        "answered_at": now_iso(),
    }


def build_marker_record(event):
    """Records for 'resume' and 'abandon': just the event name and a timestamp."""
    field = "resumed_at" if event == "resume" else "abandoned_at"
    return {"event": event, field: now_iso()}


def build_complete_record(body):
    for field in ("score", "total", "percentage"):
        if not is_number(body.get(field)):
            raise ValueError(f"'{field}' must be a number.")
    return {
        "event": "complete",
        "score": body["score"],
        "total": body["total"],
        "percentage": body["percentage"],
        "completed_at": now_iso(),
    }


# --------------------------------------------------------------------------
# HTTP handler
# --------------------------------------------------------------------------

class ApiError(Exception):
    def __init__(self, status, message):
        super().__init__(message)
        self.status = status
        self.message = message


class Handler(BaseHTTPRequestHandler):
    server_version = "QuizServer/1.0"

    # ---- response helpers ----

    def _send_bytes(self, status, body, content_type):
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.end_headers()
        self.wfile.write(body)

    def _send_json(self, payload, status=HTTPStatus.OK):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self._send_bytes(status, body, "application/json; charset=utf-8")

    def _send_error_json(self, status, message):
        self._send_json({"error": message}, status)

    def _read_json_body(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            raise ApiError(HTTPStatus.BAD_REQUEST, "Invalid Content-Length.")
        if length <= 0 or length > MAX_BODY_BYTES:
            raise ApiError(HTTPStatus.BAD_REQUEST, "Request body missing or too large.")
        try:
            body = json.loads(self.rfile.read(length).decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError):
            raise ApiError(HTTPStatus.BAD_REQUEST, "Body must be valid JSON.")
        if not isinstance(body, dict):
            raise ApiError(HTTPStatus.BAD_REQUEST, "Body must be a JSON object.")
        return body

    # ---- routing ----

    def do_GET(self):
        path = unquote(urlsplit(self.path).path)
        try:
            if path == "/api/quizzes":
                self._send_json(list_quizzes())
            elif path.startswith("/api/quizzes/"):
                self._get_quiz(path[len("/api/quizzes/"):])
            elif path.startswith("/api/"):
                raise ApiError(HTTPStatus.NOT_FOUND, "Unknown API endpoint.")
            else:
                self._serve_static(path)
        except ApiError as exc:
            self._send_error_json(exc.status, exc.message)

    def do_POST(self):
        path = unquote(urlsplit(self.path).path)
        try:
            if path != "/api/results":
                raise ApiError(HTTPStatus.NOT_FOUND, "Unknown API endpoint.")
            self._post_result()
        except ApiError as exc:
            self._send_error_json(exc.status, exc.message)

    # ---- endpoints ----

    def _get_quiz(self, slug):
        quiz_path = find_quiz_path(slug)
        if quiz_path is None:
            raise ApiError(HTTPStatus.NOT_FOUND, "Quiz not found.")
        quiz, error = read_quiz_file(quiz_path)
        if error:
            raise ApiError(HTTPStatus.UNPROCESSABLE_ENTITY, error)
        self._send_json(quiz)

    def _post_result(self):
        body = self._read_json_body()
        event = body.get("event")

        if event == "start":
            slug = body.get("quiz")
            quiz_path = find_quiz_path(slug) if isinstance(slug, str) else None
            if quiz_path is None:
                raise ApiError(HTTPStatus.NOT_FOUND, "Quiz not found.")
            quiz, error = read_quiz_file(quiz_path)
            if error:
                raise ApiError(HTTPStatus.UNPROCESSABLE_ENTITY, error)
            record = {
                "event": "start",
                "quiz": slug,
                "title": quiz["title"],
                "total_questions": len(quiz["questions"]),
                "started_at": now_iso(),
            }
            session = create_result_file(quiz_path, record)
            self._send_json({"session": session}, HTTPStatus.CREATED)
            return

        if event not in ("answer", "complete", "resume", "abandon"):
            raise ApiError(
                HTTPStatus.BAD_REQUEST,
                "'event' must be start, answer, complete, resume, or abandon.",
            )

        result_path = resolve_session(body.get("session"))
        if result_path is None:
            raise ApiError(HTTPStatus.BAD_REQUEST, "Invalid or unknown 'session'.")

        if event == "resume" and is_completed(result_path):
            raise ApiError(HTTPStatus.CONFLICT, "This quiz session was already completed.")

        try:
            if event == "answer":
                record = build_answer_record(body)
            elif event == "complete":
                record = build_complete_record(body)
            else:
                record = build_marker_record(event)
        except ValueError as exc:
            raise ApiError(HTTPStatus.BAD_REQUEST, str(exc))
        written = append_result(result_path, record)
        self._send_json({"ok": True, "duplicate": not written}, HTTPStatus.CREATED)

    def _serve_static(self, path):
        target = STATIC_ROUTES.get(path)
        if target is None:
            for prefix, directory in STATIC_DIRS.items():
                if path.startswith(prefix):
                    candidate = (directory / path[len(prefix):]).resolve()
                    if candidate.is_relative_to(directory.resolve()):
                        target = candidate
                    break
        if target is None or not target.is_file():
            raise ApiError(HTTPStatus.NOT_FOUND, "Not found.")
        content_type = mimetypes.guess_type(target.name)[0] or "application/octet-stream"
        if content_type.startswith("text/") or content_type in ("application/javascript", "text/javascript"):
            content_type += "; charset=utf-8"
        self._send_bytes(HTTPStatus.OK, target.read_bytes(), content_type)


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_PORT
    QUIZ_DIR.mkdir(exist_ok=True)
    RESULTS_DIR.mkdir(exist_ok=True)
    server = ThreadingHTTPServer((HOST, port), Handler)
    print(f"Quiz app running at http://localhost:{port}  (Ctrl+C to stop)")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping server.")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
