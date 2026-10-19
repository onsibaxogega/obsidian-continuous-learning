"use strict";

/* Quizzer frontend. Vanilla JS, no dependencies.
 * All dynamic text is inserted with textContent (never innerHTML),
 * so quiz content cannot inject markup. */

const app = document.getElementById("app");

// Per-run state for the quiz currently being taken.
const state = {
  slug: null,
  quiz: null,
  session: null,
  displayOrder: [], // questions in the shuffled order shown to the user
  answers: new Map(), // question id -> array of selected letters
  record: null, // the saved-session record for the quiz in progress (see "saved sessions")
};

// ---------------------------------------------------------------- helpers

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value === false || value == null) continue;
    if (key === "className") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (key.startsWith("on")) node.addEventListener(key.slice(2).toLowerCase(), value);
    else node.setAttribute(key, value === true ? "" : value);
  }
  for (const child of children.flat()) {
    if (child != null) node.append(child);
  }
  return node;
}

function render(...nodes) {
  app.replaceChildren(...nodes);
  window.scrollTo(0, 0);
}

async function api(path, options) {
  const response = await fetch(path, options);
  if (!response.ok) {
    let message = response.statusText;
    try {
      const body = await response.json();
      if (body.error) message = body.error;
    } catch (_) {
      /* keep statusText */
    }
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

// Encode each path segment but keep the "/" separators.
const quizUrl = (slug) => `/api/quizzes/${slug.split("/").map(encodeURIComponent).join("/")}`;

function postResult(payload) {
  return api("/api/results", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// Fisher-Yates shuffle on a copy.
function shuffled(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const round = (value, places) => {
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
};

// ---------------------------------------------------------------- saved sessions
// In-progress quizzes are kept in localStorage so a closed tab, refresh, or lost
// connection does not lose the user's answers. One record per session id:
//   { session, slug, title, total, order: [question ids], answers: { id: [letters] },
//     pending: null | [events still to write], startedAt, updatedAt }

const STORE_KEY = "quizzer.sessions.v1";

function loadSessions() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch (_) {
    return {};
  }
}

function writeSessions(sessions) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(sessions));
  } catch (_) {
    /* Storage disabled or full: the quiz still works, it just cannot be resumed. */
  }
}

function saveRecord(record) {
  record.updatedAt = new Date().toISOString();
  const sessions = loadSessions();
  sessions[record.session] = record;
  writeSessions(sessions);
}

function removeRecord(sessionId) {
  const sessions = loadSessions();
  delete sessions[sessionId];
  writeSessions(sessions);
}

function isValidRecord(record) {
  return Boolean(record)
    && typeof record.session === "string"
    && typeof record.slug === "string"
    && Array.isArray(record.order)
    && record.answers && typeof record.answers === "object";
}

// Write the remaining events in order. Each one is removed from the saved record only
// after the server confirms it, so a retry continues where the last attempt stopped.
// Returns null on success or an error message.
async function flushPending(record) {
  try {
    while (record.pending && record.pending.length) {
      await postResult(record.pending[0]);
      record.pending.shift();
      saveRecord(record);
    }
    removeRecord(record.session);
    return null;
  } catch (err) {
    return err.message;
  }
}

function persistAnswers() {
  if (!state.record) return;
  state.record.answers = Object.fromEntries(state.answers);
  saveRecord(state.record);
}

// ---------------------------------------------------------------- grading

function gradeQuestion(question, selectedLetters) {
  const selected = [...(selectedLetters || [])].sort();

  if (question.type === "multiple_choice") {
    const isCorrect = selected.length === 1 && selected[0] === question.answer;
    return {
      question,
      selected: selected[0] ?? "",
      correct: question.answer,
      selectedSet: new Set(selected),
      correctSet: new Set([question.answer]),
      isCorrect,
      score: isCorrect ? 1 : 0,
    };
  }

  // multiple_select: +1 per correct pick, -1 per incorrect pick,
  // score = max(0, units) / number of correct choices (clamped to 0..1).
  const correct = [...question.answer].sort();
  const correctSet = new Set(correct);
  const units = selected.reduce((sum, letter) => sum + (correctSet.has(letter) ? 1 : -1), 0);
  const score = Math.min(1, Math.max(0, units) / correct.length);
  const isCorrect = selected.length === correct.length && selected.every((l) => correctSet.has(l));
  return {
    question,
    selected,
    correct,
    selectedSet: new Set(selected),
    correctSet,
    isCorrect,
    score: round(score, 4),
  };
}

// ---------------------------------------------------------------- quiz list

async function showQuizList() {
  state.slug = state.quiz = state.session = state.record = null;
  state.answers = new Map();
  render(el("main", { className: "container" }, el("h1", { text: "Quizzes" }), el("p", { className: "muted", text: "Loading…" })));

  let quizzes;
  try {
    quizzes = await api("/api/quizzes");
  } catch (err) {
    render(el("main", { className: "container" }, el("p", { className: "error-banner", role: "alert", text: `Could not load quizzes: ${err.message}` })));
    return;
  }

  const body = quizzes.length === 0
    ? el("div", { className: "empty-state" },
        el("p", { text: "No quizzes found. Add .json files to the _quizzes/ directory or its subdirectories, then reload this page." }))
    : renderTree(buildTree(quizzes));

  const knownSlugs = new Set(quizzes.map((q) => q.slug));
  const unfinished = Object.values(loadSessions())
    .filter(isValidRecord)
    .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));

  render(el("main", { className: "container" },
    unfinished.length ? unfinishedSection(unfinished, knownSlugs) : null,
    el("h1", { text: "Choose a quiz" }),
    body));
}

// ---- Unfinished section: a flat list, deliberately separate from the folder tree.

function unfinishedSection(records, knownSlugs) {
  return el("section", { className: "unfinished", "aria-labelledby": "unfinished-title" },
    el("h2", { id: "unfinished-title", className: "unfinished-title", text: `Unfinished (${records.length})` }),
    el("ul", { className: "unfinished-list" },
      records.map((rec) => unfinishedItem(rec, knownSlugs.has(rec.slug)))));
}

function formatTime(iso) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

function unfinishedItem(rec, quizExists) {
  const hasPending = Array.isArray(rec.pending) && rec.pending.length > 0;
  const answered = Object.keys(rec.answers).length;
  const folder = rec.slug.split("/").slice(0, -1).join(" / ");
  const status = hasPending ? "Submitted, results not saved yet" : `${answered} / ${rec.total} answered`;
  const when = formatTime(rec.updatedAt);
  const meta = [folder, status, when && `updated ${when}`, !quizExists && !hasPending && "quiz file not found"]
    .filter(Boolean).join(" · ");

  const primary = hasPending
    ? el("button", { type: "button", onClick: (e) => retrySaving(rec, e.currentTarget), text: "Retry saving" })
    : el("button", { type: "button", disabled: !quizExists, onClick: (e) => resumeSession(rec, e.currentTarget), text: "Resume" });

  return el("li", { className: "unfinished-item" },
    el("div", { className: "unfinished-info" },
      el("strong", { text: rec.title || rec.slug }),
      el("span", { className: "unfinished-meta", text: meta })),
    el("div", { className: "unfinished-actions" },
      primary,
      el("button", { type: "button", className: "secondary", onClick: () => discardSession(rec), text: "Discard" })));
}

async function retrySaving(rec, button) {
  button.disabled = true;
  const error = await flushPending(rec);
  if (error) {
    button.disabled = false;
    alert(`Could not save the results: ${error}`);
    return;
  }
  showQuizList();
}

async function resumeSession(rec, button) {
  button.disabled = true;
  try {
    const quiz = await api(quizUrl(rec.slug));
    const byId = new Map(quiz.questions.map((q) => [q.id, q]));
    const unchanged = rec.order.length === quiz.questions.length && rec.order.every((id) => byId.has(id));
    if (!unchanged) {
      throw new Error("This quiz changed after you started it, so it cannot be resumed. Discard it and start again.");
    }
    await postResult({ event: "resume", session: rec.session });

    state.slug = rec.slug;
    state.quiz = quiz;
    state.session = rec.session;
    state.record = rec;
    state.displayOrder = rec.order.map((id) => byId.get(id));
    state.answers = new Map(Object.entries(rec.answers).map(([id, letters]) => [Number(id), letters]));
    renderQuiz();
  } catch (err) {
    if (err.status === 409) {
      // The results file already has a complete event, so there is nothing to resume.
      removeRecord(rec.session);
      alert("That quiz was already completed, so it was removed from the unfinished list.");
      showQuizList();
      return;
    }
    button.disabled = false;
    alert(`Could not resume the quiz: ${err.message}`);
  }
}

async function discardSession(rec) {
  if (!confirm("Discard this unfinished quiz? Your saved answers will be removed from this browser.")) return;
  try {
    await postResult({ event: "abandon", session: rec.session });
  } catch (_) {
    /* Best effort: the local record is removed either way. */
  }
  removeRecord(rec.session);
  showQuizList();
}

// Build a folder tree from flat quiz entries whose slugs look like "aws/networking/vpc-basics".
function buildTree(quizzes) {
  const root = { folders: new Map(), quizzes: [] };
  for (const item of quizzes) {
    const folderNames = item.slug.split("/").slice(0, -1);
    let node = root;
    for (const name of folderNames) {
      if (!node.folders.has(name)) node.folders.set(name, { folders: new Map(), quizzes: [] });
      node = node.folders.get(name);
    }
    node.quizzes.push(item);
  }
  return root;
}

const byName = (a, b) => a.localeCompare(b, undefined, { sensitivity: "base" });

function countQuizzes(node) {
  let count = node.quizzes.length;
  for (const child of node.folders.values()) count += countQuizzes(child);
  return count;
}

// Folders first (sorted), then quizzes in the order the server returned them.
function renderTree(node) {
  const folderNames = [...node.folders.keys()].sort(byName);
  const folders = folderNames.map((name) => {
    const child = node.folders.get(name);
    return el("li", { className: "folder-item" },
      el("details", { open: true, className: "folder" },
        el("summary", {},
          el("span", { className: "folder-name", text: name }),
          el("span", { className: "muted folder-count", text: `(${countQuizzes(child)})` }),
          tileCluster(countQuizzes(child))),
        renderTree(child)));
  });
  return el("ul", { className: "quiz-list" }, folders, node.quizzes.map(quizCard));
}

// Decorative cluster of tiles, one per quiz in the folder (capped).
function tileCluster(count) {
  const shown = Math.min(count, 12);
  return el("span", { className: "tiles", "aria-hidden": "true" },
    Array.from({ length: shown }, () => el("span", { className: "tile" })));
}

function quizCard(item) {
  if (item.error) {
    return el("li", { className: "quiz-card invalid" },
      el("div", {},
        el("h2", { text: item.title }),
        el("p", { text: `This quiz file is invalid: ${item.error}` })));
  }
  const count = `${item.question_count} question${item.question_count === 1 ? "" : "s"}`;
  // Slugs drop the extension, so rebuild the file name as it exists on disk (all quiz files are .json).
  const filename = `${item.slug.split("/").pop()}.json`;
  return el("li", { className: "quiz-card" },
    el("div", {},
      el("h2", {},
        item.title,
        " ",
        el("span", { className: "quiz-filename", text: `(${filename})` })),
      item.description ? el("p", { text: item.description }) : null,
      el("p", { className: "muted", text: count })),
    el("button", { type: "button", onClick: (event) => startQuiz(item.slug, event.currentTarget) , text: "Start quiz" }));
}

// ---------------------------------------------------------------- quiz screen

async function startQuiz(slug, button) {
  button.disabled = true;
  try {
    const quiz = await api(quizUrl(slug));
    // Writing the start event first means a crashed session still leaves a file.
    const { session } = await postResult({ event: "start", quiz: slug });
    state.slug = slug;
    state.quiz = quiz;
    state.session = session;
    state.answers = new Map();
    state.displayOrder = shuffled(quiz.questions);
    // Save immediately so even a quiz with no answers yet can be resumed.
    state.record = {
      session,
      slug,
      title: quiz.title,
      total: quiz.questions.length,
      order: state.displayOrder.map((q) => q.id),
      answers: {},
      pending: null,
      startedAt: new Date().toISOString(),
    };
    saveRecord(state.record);
    renderQuiz();
  } catch (err) {
    button.disabled = false;
    alert(`Could not start the quiz: ${err.message}`);
  }
}

function renderQuiz() {
  const total = state.displayOrder.length;

  // One tile per question, in the order shown on the page.
  const segments = state.displayOrder.map(() => el("span", { className: "segment" }));
  const track = el("div", {
    className: "progress-track",
    role: "progressbar",
    "aria-label": "Questions answered",
    "aria-valuemin": "0",
    "aria-valuemax": String(total),
    "aria-valuenow": "0",
  }, segments);
  const progressText = el("span", { text: `0 / ${total} answered` });
  const header = el("header", { className: "progress-header" },
    el("div", { className: "progress-inner" },
      el("div", { className: "progress-top" },
        el("span", { className: "progress-title", text: state.quiz.title }),
        progressText),
      track));

  const submit = el("button", { type: "submit", text: "Submit quiz", disabled: true });
  const hint = el("span", { className: "muted", text: `Answer all ${total} questions to submit.` });
  const errorSlot = el("div");

  const form = el("form", { novalidate: true },
    state.displayOrder.map((q, index) => questionFieldset(q, index + 1)),
    errorSlot,
    el("div", { className: "submit-bar" }, submit, hint));

  function updateProgress() {
    const answered = state.answers.size;
    state.displayOrder.forEach((q, i) => segments[i].classList.toggle("done", state.answers.has(q.id)));
    track.setAttribute("aria-valuenow", String(answered));
    progressText.textContent = `${answered} / ${total} answered`;
    submit.disabled = answered < total;
    hint.hidden = answered >= total;
  }

  form.addEventListener("change", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    const qid = Number(input.dataset.qid);
    const checked = [...form.querySelectorAll(`input[data-qid="${qid}"]:checked`)].map((i) => i.value);
    if (checked.length) state.answers.set(qid, checked);
    else state.answers.delete(qid);
    persistAnswers();
    updateProgress();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitQuiz(submit, errorSlot);
  });

  // Restore previously saved answers when resuming (no-op for a new quiz).
  for (const input of form.querySelectorAll("input")) {
    const saved = state.answers.get(Number(input.dataset.qid));
    if (saved && saved.includes(input.value)) input.checked = true;
  }
  updateProgress();

  render(header, el("main", { className: "container" }, form));
}

function questionFieldset(question, number) {
  const isMulti = question.type === "multiple_select";
  const inputType = isMulti ? "checkbox" : "radio";
  const name = `q-${question.id}`;

  const legend = el("legend", {},
    el("span", { className: "q-num", text: `${number}.` }),
    question.question,
    isMulti ? el("span", { className: "question-hint", text: "Select all that apply" }) : null);

  const choices = Object.entries(question.choices).map(([letter, text]) =>
    el("label", { className: "choice" },
      el("input", { type: inputType, name, value: letter, "data-qid": String(question.id) }),
      el("span", { className: "choice-letter", text: `${letter}.` }),
      el("span", { className: "choice-text", text })));

  return el("fieldset", { className: "question" }, legend, choices);
}

// ---------------------------------------------------------------- submit

async function submitQuiz(submitButton, errorSlot) {
  submitButton.disabled = true;
  submitButton.textContent = "Saving results…";
  errorSlot.replaceChildren();

  // Grade in the quiz's original order so result files are deterministic.
  const graded = state.quiz.questions.map((q) => gradeQuestion(q, state.answers.get(q.id)));
  const totalScore = round(graded.reduce((sum, g) => sum + g.score, 0), 4);
  const total = graded.length;
  const percentage = round((totalScore / total) * 100, 2);

  // Store every event first, then send them. If the connection drops part-way, the
  // remaining events stay in the saved record and can be retried later.
  state.record.pending = [
    ...graded.map((g) => ({
      event: "answer",
      session: state.session,
      question_id: g.question.id,
      type: g.question.type,
      selected: g.selected,
      correct: g.correct,
      is_correct: g.isCorrect,
      score: g.score,
    })),
    { event: "complete", session: state.session, score: totalScore, total, percentage },
  ];
  saveRecord(state.record);
  const saveError = await flushPending(state.record);

  renderReview(graded, { totalScore, total, percentage }, saveError);
}

// ---------------------------------------------------------------- review

function renderReview(graded, summary, saveError) {
  const byId = new Map(graded.map((g) => [g.question.id, g]));
  const inDisplayOrder = state.displayOrder.map((q) => byId.get(q.id));

  // Results files keep full precision; the screen shows at most 2 decimals.
  const scoreText = `Score: ${round(summary.totalScore, 2)} / ${summary.total} (${round(summary.percentage, 1)}%)`;
  const ring = el("div", {
    className: "score-ring",
    role: "img",
    "aria-label": `${summary.percentage} percent correct`,
  }, el("span", { className: "score-ring-value", text: `${Math.round(summary.percentage)}%` }));
  ring.style.setProperty("--pct", String(summary.percentage));

  const summaryBox = el("section", { className: "score-summary" },
    ring,
    el("div", {},
      el("h1", { text: scoreText }),
      el("p", { className: "muted", text: state.quiz.title }),
      saveError
        ? el("p", { className: "warning-banner", role: "alert", text: `Your results were not fully saved to disk: ${saveError}` })
        : el("p", { className: "muted", text: "Results saved." }),
      el("div", { className: "actions" },
        saveError
          ? el("button", {
              type: "button",
              text: "Retry saving",
              onClick: async (event) => {
                event.currentTarget.disabled = true;
                renderReview(graded, summary, await flushPending(state.record));
              },
            })
          : null,
        el("button", { type: "button", className: "secondary", onClick: showQuizList, text: "Back to quizzes" }))));

  render(el("main", { className: "container" }, summaryBox, inDisplayOrder.map(reviewItem)));
}

function reviewItem(graded, index) {
  const { question, score, isCorrect, selectedSet, correctSet } = graded;
  const status = isCorrect ? "correct" : score > 0 ? "partial" : "incorrect";
  const statusLabel = { correct: "Correct", partial: "Partially correct", incorrect: "Incorrect" }[status];

  const choices = Object.entries(question.choices).map(([letter, text]) => {
    const picked = selectedSet.has(letter);
    const right = correctSet.has(letter);
    let className = "";
    let tag = "";
    if (picked && right) { className = "selected-correct"; tag = "Your answer (correct)"; }
    else if (picked) { className = "selected-incorrect"; tag = "Your answer (incorrect)"; }
    else if (right) { className = "missed-correct"; tag = "Correct answer (not selected)"; }
    return el("li", { className },
      el("strong", { text: `${letter}.` }),
      el("span", { text }),
      tag ? el("span", { className: "tag", text: tag }) : null);
  });

  return el("article", { className: `review-item ${status}` },
    el("div", { className: "review-head" },
      el("h2", { text: `Question ${index + 1}` }),
      el("span", { className: `badge ${status}`, text: `${statusLabel} · ${round(score, 2)} / 1` })),
    el("p", { className: "review-question", text: question.question }),
    el("ul", { className: "review-choices" }, choices),
    el("div", { className: "justification" },
      el("strong", { text: "Justification" }),
      question.justification));
}

// ---------------------------------------------------------------- boot

showQuizList();
