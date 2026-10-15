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
    throw new Error(message);
  }
  return response.json();
}

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
  state.slug = state.quiz = state.session = null;
  state.answers.clear();
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

  render(el("main", { className: "container" }, el("h1", { text: "Choose a quiz" }), body));
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
          el("span", { className: "muted folder-count", text: ` (${countQuizzes(child)})` })),
        renderTree(child)));
  });
  return el("ul", { className: "quiz-list" }, folders, node.quizzes.map(quizCard));
}

function quizCard(item) {
  if (item.error) {
    return el("li", { className: "quiz-card invalid" },
      el("div", {},
        el("h2", { text: item.title }),
        el("p", { text: `This quiz file is invalid: ${item.error}` })));
  }
  const count = `${item.question_count} question${item.question_count === 1 ? "" : "s"}`;
  return el("li", { className: "quiz-card" },
    el("div", {},
      el("h2", { text: item.title }),
      item.description ? el("p", { text: item.description }) : null,
      el("p", { className: "muted", text: count })),
    el("button", { type: "button", onClick: (event) => startQuiz(item.slug, event.currentTarget) , text: "Start quiz" }));
}

// ---------------------------------------------------------------- quiz screen

async function startQuiz(slug, button) {
  button.disabled = true;
  try {
    // Encode each path segment but keep the "/" separators.
    const quiz = await api(`/api/quizzes/${slug.split("/").map(encodeURIComponent).join("/")}`);
    // Writing the start event first means a crashed session still leaves a file.
    const { session } = await postResult({ event: "start", quiz: slug });
    state.slug = slug;
    state.quiz = quiz;
    state.session = session;
    state.answers = new Map();
    state.displayOrder = shuffled(quiz.questions);
    renderQuiz();
  } catch (err) {
    button.disabled = false;
    alert(`Could not start the quiz: ${err.message}`);
  }
}

function renderQuiz() {
  const total = state.displayOrder.length;

  const fill = el("div", { className: "progress-fill" });
  const track = el("div", {
    className: "progress-track",
    role: "progressbar",
    "aria-label": "Questions answered",
    "aria-valuemin": "0",
    "aria-valuemax": String(total),
    "aria-valuenow": "0",
  }, fill);
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
    fill.style.width = `${(answered / total) * 100}%`;
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
    updateProgress();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitQuiz(submit, errorSlot);
  });

  render(header, el("main", { className: "container" }, form));
}

function questionFieldset(question, number) {
  const isMulti = question.type === "multiple_select";
  const inputType = isMulti ? "checkbox" : "radio";
  const name = `q-${question.id}`;

  const legend = el("legend", {},
    `${number}. ${question.question}`,
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

  let saveError = null;
  try {
    for (const g of graded) {
      await postResult({
        event: "answer",
        session: state.session,
        question_id: g.question.id,
        type: g.question.type,
        selected: g.selected,
        correct: g.correct,
        is_correct: g.isCorrect,
        score: g.score,
      });
    }
    await postResult({ event: "complete", session: state.session, score: totalScore, total, percentage });
  } catch (err) {
    saveError = err.message;
  }

  renderReview(graded, { totalScore, total, percentage }, saveError);
}

// ---------------------------------------------------------------- review

function renderReview(graded, summary, saveError) {
  const byId = new Map(graded.map((g) => [g.question.id, g]));
  const inDisplayOrder = state.displayOrder.map((q) => byId.get(q.id));

  const scoreText = `Score: ${summary.totalScore} / ${summary.total} (${summary.percentage}%)`;
  const summaryBox = el("section", { className: "score-summary" },
    el("h1", { text: scoreText }),
    el("p", { className: "muted", text: state.quiz.title }),
    saveError
      ? el("p", { className: "warning-banner", role: "alert", text: `Your results were not fully saved to disk: ${saveError}` })
      : el("p", { className: "muted", text: "Results saved." }),
    el("div", { className: "actions" },
      el("button", { type: "button", className: "secondary", onClick: showQuizList, text: "Back to quizzes" })));

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
      el("span", { className: `badge ${status}`, text: `${statusLabel} · ${score} / 1` })),
    el("p", { className: "review-question", text: question.question }),
    el("ul", { className: "review-choices" }, choices),
    el("div", { className: "justification" },
      el("strong", { text: "Justification" }),
      question.justification));
}

// ---------------------------------------------------------------- boot

showQuizList();
