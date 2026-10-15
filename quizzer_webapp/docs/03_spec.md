
# Quiz Web App — Full Specification

## Overview

A lightweight, localhost-only quiz web application. No external dependencies — Python stdlib only for the backend, vanilla HTML/CSS/JS for the frontend.

---

## Directory Structure

```
/
├── server.py
├── index.html
├── styles/
│   └── main.css
├── scripts/
│   └── app.js
├── _quizzes/
│   ├── intro.json                         (quizzes may sit directly in _quizzes/)
│   └── aws/                               (subdirectories can nest to any depth)
│       └── networking/
│           └── vpc-basics.json
└── _results/                              (auto-generated; mirrors the _quizzes/ tree)
    ├── intro_result_<timestamp>.jsonl
    └── aws/
        └── networking/
            └── vpc-basics_result_<timestamp>.jsonl
```

See [Nested quizzes and mirrored results](#nested-quizzes-and-mirrored-results) for the rules.

---

## Architecture

### Backend: `server.py`

A single Python file using **only `http.server`** from the standard library (zero pip packages). It serves the static frontend files AND exposes 3 API endpoints:

| Endpoint | Method | Description |
|---|---|---|
| `GET /api/quizzes` | GET | Returns a flat JSON array of available quizzes. The server searches `_quizzes/` and all of its subdirectories recursively. Each entry includes the slug (the quiz's path relative to `_quizzes/`, without the `.json` extension, using `/` separators), title, description, and question count. |
| `GET /api/quizzes/<slug>` | GET | Returns the full quiz JSON for a given slug. The slug can contain `/`, for example `GET /api/quizzes/aws/networking/vpc-basics`. |
| `POST /api/results` | POST | Accepts a JSONL event (one line) and appends it to the appropriate results file. The frontend calls this once per event (start, each answer, complete). |

The server must auto-create `_quizzes/` and `_results/` directories on startup if they don't exist.

### Frontend: `index.html` + `styles/main.css` + `scripts/app.js`

A single-page app. Vanilla HTML/CSS/JS — no frameworks, no build step.

---

## Quiz JSON Schema

**Location:** `_quizzes/<slug>.json`
**Example filename:** `_quizzes/aws-networking-fundamentals.json`

```json
{
  "title": "AWS Networking Fundamentals",
  "description": "Covers VPCs, subnets, route tables, and security groups.",
  "questions": [
    {
      "id": 1,
      "type": "multiple_choice",
      "question": "Which AWS service provides a logically isolated virtual network?",
      "choices": {
        "A": "Amazon EC2",
        "B": "Amazon VPC",
        "C": "AWS Direct Connect",
        "D": "Amazon Route 53"
      },
      "answer": "B",
      "justification": "Amazon VPC (Virtual Private Cloud) is the service specifically designed to provision a logically isolated section of the AWS cloud. EC2 provides compute instances (not the network itself), Direct Connect is a dedicated physical connection from on-premises to AWS, and Route 53 is a DNS service."
    },
    {
      "id": 2,
      "type": "multiple_select",
      "question": "Which of the following are valid targets for a VPC route table entry? (Select all that apply)",
      "choices": {
        "A": "Internet Gateway",
        "B": "NAT Gateway",
        "C": "Amazon S3 bucket (directly)",
        "D": "VPC Peering Connection",
        "E": "Transit Gateway"
      },
      "answer": ["A", "B", "D", "E"],
      "justification": "Internet Gateways, NAT Gateways, VPC Peering Connections, and Transit Gateways are all valid route table targets. S3 buckets cannot be targeted directly in a route table — S3 access is achieved via a VPC Gateway Endpoint, which itself becomes the route target, not the bucket."
    }
  ]
}
```

### Schema notes

- **`type`**: either `"multiple_choice"` (single answer) or `"multiple_select"` (multiple answers)
- **`choices`**: object with letter keys (A, B, C, D, …). Letters are display labels.
- **`answer`**: string for `multiple_choice`, array of strings for `multiple_select`
- **`justification`**: explains why the correct answer is correct, especially for trade-off questions. This is shown on the review screen after quiz submission.
- **`id`**: integer, unique within the quiz. Used to reference questions in results.

---

## Results JSONL Schema

**Format:** JSONL (JSON Lines) — one JSON object per line, append-only.
**Location:** `_results/<quiz-subdirectories>/<quiz-file-name>_result_<timestamp>.jsonl`, where `<quiz-subdirectories>` mirrors the quiz's location under `_quizzes/` (empty for a quiz directly in `_quizzes/`).
**Example filename:** `_results/aws-networking-fundamentals_result_2026-10-14T154500.jsonl` for `_quizzes/aws-networking-fundamentals.json`, or `_results/aws/networking/vpc-basics_result_2026-10-14T154500.jsonl` for `_quizzes/aws/networking/vpc-basics.json`.

```
{"event":"start","quiz":"aws-networking-fundamentals","title":"AWS Networking Fundamentals","total_questions":2,"started_at":"2026-10-14T15:45:00-05:00"}
{"event":"answer","question_id":1,"type":"multiple_choice","selected":"B","correct":"B","is_correct":true,"score":1.0,"answered_at":"2026-10-14T15:45:32-05:00"}
{"event":"answer","question_id":2,"type":"multiple_select","selected":["A","B","D"],"correct":["A","B","D","E"],"is_correct":false,"score":0.75,"answered_at":"2026-10-14T15:46:10-05:00"}
{"event":"complete","score":1.75,"total":2,"percentage":87.5,"completed_at":"2026-10-14T15:46:10-05:00"}
```

### Event types

| Event | When written | Key fields |
|---|---|---|
| `start` | User clicks "Start Quiz" | `quiz` (slug, including any subdirectory path, for example `aws/networking/vpc-basics`), `title`, `total_questions`, `started_at` |
| `answer` | User submits the quiz (one line per question) | `question_id`, `type`, `selected`, `correct`, `is_correct`, `score`, `answered_at` |
| `complete` | All answer events written | `score` (sum), `total` (question count), `percentage`, `completed_at` |

### Crash resilience

- The `start` event is written immediately when the quiz begins.
- All `answer` events + the `complete` event are written at submission time. Each answer is a separate POST call flushed individually.
- If the `complete` event is missing, the session was interrupted — any consumer can detect this.

---

## Scoring Rules

### `multiple_choice`

- Correct answer: score = **1.0**
- Wrong answer: score = **0.0**

### `multiple_select`

Partial credit model:

- Each **correct** selection: **+1 unit**
- Each **incorrect** selection: **−1 unit**
- **Question score** = `max(0, units_sum) / total_number_of_correct_choices`
- Score is clamped to the range **[0.0, 1.0]**

**Example:** Question has correct answers `[A, B, D, E]` (4 correct). User selects `[A, B, C, D]`.
- A (+1), B (+1), C (−1, incorrect), D (+1) → sum = 2
- Score = max(0, 2) / 4 = **0.5**

### Overall quiz score

- **Percentage** = `(sum of all question scores / number of questions) × 100`

---

## Nested quizzes and mirrored results

### Quiz discovery

- The server finds every `*.json` file under `_quizzes/`, at any depth.
- The **slug** of a quiz is its path relative to `_quizzes/`, without the `.json` extension, with `/` as the separator (for example, `aws/networking/vpc-basics`). Slugs are unique because file paths are unique.
- Files and directories whose names start with `.` are ignored. Symbolic links to directories are not followed.
- Directories that contain no quizzes are not shown in the quiz selector.
- The frontend builds the selector tree from the slugs in the flat `GET /api/quizzes` response. The API itself stays a flat array.
- The server resolves a requested slug by matching it against the discovered quiz files. It never joins request input into a file path.

### Mirrored results

- When a quiz starts, the server creates the result file in a directory under `_results/` that has the same relative path as the quiz's directory under `_quizzes/`. It creates missing directories as needed.
- The result file name stays `<quiz-file-name>_result_<timestamp>.jsonl`. It uses the quiz's file name only, because the directories already carry the rest of the path. Characters other than letters, digits, `.`, `_`, and `-` in the file name are replaced with `-` (for example, `vpc basics.json` produces `vpc-basics_result_...`). Directory names are never altered.
- Directory names in `_results/` are copied from the matching directories in `_quizzes/`, so the two trees stay identical.
- The `session` value that `POST /api/results` returns for a `start` event is the result file's path relative to `_results/`, with `/` separators. The frontend sends it back unchanged with each `answer` and `complete` event.
- The server rejects any `session` value that resolves outside `_results/`, does not end in a valid result file name, or does not refer to an existing file.

---

## UX & Frontend Behavior

### Quiz selection screen

- On load, fetch `GET /api/quizzes`
- If **zero quizzes** (in `_quizzes/` or any subdirectory): show a friendly message ("No quizzes found. Add .json files to the _quizzes/ directory or its subdirectories.")
- If **one or more**: display the quizzes as a tree that mirrors the `_quizzes/` directory structure:
  - Each subdirectory is a collapsible group labeled with the directory name, expanded by default. Groups nest to match the directory depth.
  - Each quiz is a card showing title, description, and question count.
  - Within a level, subdirectories are listed first, then quizzes. Both are sorted alphabetically (case-insensitive) by directory or file name.
  - Quizzes placed directly in `_quizzes/` appear at the top level of the tree.

### Quiz screen (single scrollable page)

- **All questions are rendered on a single page** — user scrolls down through them
- **Sticky progress bar at the top of the viewport** — shows how many questions have been answered out of total (updates in real-time as the user selects answers)
- **Question types rendered differently:**
  - `multiple_choice`: radio buttons (only one selectable)
  - `multiple_select`: checkboxes (multiple selectable) — clearly labeled, e.g., "(Select all that apply)"
- **No answers/justifications shown until submission**
- **Submit button at the bottom** — disabled until all questions have been answered
- **Questions are shuffled randomly** on each load. Choices are NOT shuffled (displayed in original A, B, C, D order).

### Review screen (shown after submission)

After the user clicks Submit:

1. All answer events are written to the results file via `POST /api/results` (one call per answer line, sequential)
2. The `complete` event is written last
3. The UI transitions to the **review screen** showing:
   - **Overall score** (e.g., "Score: 17.5 / 20 (87.5%)")
   - **Per-question breakdown** (scrollable list):
     - The question text
     - The user's selected answer(s) — highlighted green if correct, red if incorrect
     - The correct answer(s) — always shown
     - The justification text
     - The question's individual score

### Visual design

- Clean, minimal, readable. Light theme. Nothing fancy needed.
- Responsive enough to be usable on a laptop browser — no mobile optimization required.

---

## Implementation Constraints

- **Python stdlib only** — no pip packages whatsoever. `http.server`, `json`, `os`, `pathlib`, `datetime`, etc. are all fine.
- **Vanilla frontend** — no frameworks, no npm, no build step. Just HTML + CSS + JS files.
- **Localhost only** — no HTTPS, no auth, no CORS considerations.
- All generated files (this spec + source code) should be ready to run with: `python server.py` then open `http://localhost:8000` (or similar).
