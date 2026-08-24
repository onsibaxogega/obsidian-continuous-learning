# Note-Taking Style Guide

A description of my personal note-taking style and formatting for my Obsidian vault (career/tech-focused continuous learning). Provide this to an LLM/agent so generated notes match my voice, structure, and formatting conventions.

---

## 1. Purpose & Voice

- Notes are a **"second brain" / knowledge cache** for technical skills and industry certification prep. Write to teach my future self, not to impress.
- **Tone:** knowledgeable but grounded, explanatory, and practical. Confident and direct, never fluffy or marketing-flavored.
- **Explain the "why," not just the "what."** After stating a fact or definition, elaborate on why it matters, when to use it, and how it connects to real-world (often enterprise/cloud) architecture.
- **Use analogies to anchor abstract concepts.** e.g., MCP as "USB-C for AI," `if __name__ == '__main__'` as "a traffic cop," pyenv shims as "traffic controllers." One good analogy per major concept.
- **Compare across technologies/languages** when it aids understanding. e.g., "type inference in Python differs from C# (`which happens at compile time`)," or "moving to A2A is like moving from a monolith to microservices."
- Write in a **concise definition + elaboration** rhythm: lead with a crisp one-sentence definition, then unpack it with bullets.

---

## 2. Note Types

I keep several distinct note archetypes. Match the structure to the type:

### a. Conceptual / Technical Deep-Dives (e.g., MCP, A2A)
- Use **numbered top-level sections**, always in this general arc:
  1. `## 1. Core Concept`
  2. `## 2. Architectural Flow` (usually with a Mermaid diagram)
  3. `## 3. Implementation` / Python Implementation (with code)
  4. `## 4. Cloud Deployment (Azure Architecture)`
  5. `## 5. Industry Best Practices & Security` / Governance
  6. `## 6. Tips & Tricks`
- Include a `### Why It Matters for [Enterprise/context]` subsection early on, with bolded lead-in bullets.

### b. Certification Study Notes (e.g., AZ-900, AI-901)
- **Mirror the Microsoft Learn hierarchy** using header prefixes: Course → Learning Path → Module → Unit.
  - `# M1: Describe cloud computing` (Module)
  - `## U2: Introduction to cloud computing` (Unit)
- Reproduce **"Module learning objectives"** as a bulleted list ("After completing this module, you'll be able to...").
- Preserve official phrasing/terms, but reformat into my bullet + bold + backtick style.
- Include comparison tables (e.g., Public vs Private vs Hybrid) and official diagrams/images where relevant.

### c. Reference / Cheat Sheets (e.g., pyenv, Bash Common Commands)
- Open with a blockquote definition callout.
- Core content is **command tables**: `| Command | What It Does |` with left-aligned columns (`:---`).
- Group commands under `##` headings by purpose (e.g., "Installing & Uninstalling," "Setting & Switching Versions").
- Use `*TODO: Add instructions*` as an italic placeholder for unfinished sections.

### d. Language/Concept Notes (e.g., Python Core)
- `#` headers for major topics, separated by `---` with generous blank lines.
- Definition → rules → short runnable code examples pattern.

### e. Quizzes / Practice Tests
- Use Obsidian callouts exclusively (see §6).

---

## 3. Document Structure & Hierarchy

- **Headings:** `#` for major topics/sections, `##` / `###` / `####` for progressively nested detail. Conceptual notes number their `##` sections; cert notes prefix with `M#:` / `U#:`.
- **Horizontal rules (`---`)** separate major sections. Surround them with multiple blank lines (often 2-3 blank lines before and after) for visual breathing room.
- Start the deepest relevant heading level for a definition, then bullet out details beneath it.

---

## 4. Formatting Conventions (the distinctive part)

- **Bullet points are the default unit of content.** Prefer nested bullets over long paragraphs. Indent sub-points with tabs.
- **Bold** for key terms and label-style lead-ins at the start of bullets:
  - `- **Definition:** ...`
  - `- **Standardization:** ...`
  - `- **Horizontal Scaling (Scaling Out / In):** ...`
- **Inline code backticks are used generously** — not only for real code/commands/filenames, but also to **highlight or emphasize key phrases, whole clauses, and concepts** within prose. This is a signature habit. Examples:
  - "delivery of `computing / IT services` over the internet"
  - "relies on `a pay-as-you-go OpEx structure`"
  - "type inference in languages like C# (`which happens at compile time`)"
- *Italics* for:
  - Inline examples: `_Example:_ user_name`
  - Asides and clarifications: `*Note:* Python does not have true constants`
  - Emphasizing a single word within an explanation.
- **`NOTE:` callouts** appear frequently, in two forms:
  - Inline/blockquote: `> `NOTE:`` followed by the note, or `> `NOTE: `` at the start of a blockquote.
  - As an indented bullet: `- `NOTE:`` then the caveat.
- Use "**e.g.,**" and "**i.e.,**" liberally, followed by concrete examples (often ending a sentence with ", e.g.," then a code block).
- Reference dates when noting time-sensitive info, e.g., "(as of 04/2026)".

---

## 5. Code Blocks

- Always use **language-tagged fenced code blocks**: ` ```python `, ` ```powershell `, ` ```mermaid `.
- **Comment code richly** — comments explain behavior, intent, and "why," not just what. Include setup hints as comments (e.g., `# pip install mcp` at the top).
- Keep examples **minimal but runnable/realistic**; use them to illustrate one concept clearly.
- For output-demonstrating snippets, show expected output inline as a comment: `print(type(x))  # prints <class 'str'>`.

---

## 6. Obsidian-Specific Features (use these actively)

- **Wikilinks** for cross-note references: `[[Language Guidelines]]`, and internal heading links like `[[#High Availability]]`.
- **Tags** as inline hashtags with underscores for multi-word terms: `#Cloud_computing`, `#shared_responsibility_model`, `#consumption-based_model`. Typically placed on the first mention of a defined term.
- **Callouts:**
  - Definitions/overviews: `> ` followed by the definition, often wrapping the term in backticks.
  - Quizzes use the question/answer callout pattern:
    ```
    > [!question] 1. <question text>
    > a) <option>
    > b) <option>
    > c) <option>
    > d) <option>
    >> [!success]- Answer
    >> b) <correct option>. <brief explanation of why>
    ```
  - The `-` after `[!success]` makes the answer collapsible. Answers often include a short justification, not just the letter.
- **Mermaid diagrams** for architecture and flows:
  - `sequenceDiagram` (with `autonumber`) for protocol/message flows.
  - `graph TD` for architecture, using `subgraph` blocks and `classDef` styling (e.g., colored fills for secure zones, agents, databases).
  - Use descriptive node labels with `<br/>` for a second line (e.g., `SK[Semantic Kernel App<br/>Azure App Service]`).
- **Tables** for comparisons and cheat sheets. Comparison tables use standard alignment; command cheat sheets use left-aligned (`:---`) columns.
- **Image embeds** with alt text and optional width: `![Diagram showing ...|696](url)`.
- **Quick Links** sections at the top of Overview notes: a bulleted list of `[label](url)` external links.

---

## 7. Organizational / Vault Conventions

- Folders are organized by domain: `AI/`, `AWS/`, `Cloud Certifications/`, `Linux/`, `Python/`, etc., with sub-folders for tooling, core concepts, cert codes, and learning paths.
- **`Overview.md`** notes act as index/landing pages for a topic area (quick links, hierarchy explanation, targeted certs/topics tables).
- Certification folders nest by exam code, then Learning Path (`LP#`), then Module files.
- File names are descriptive and human-readable (spaces allowed), often prefixed with the source structure (e.g., `LP2 - Azure architecture and services`, `M1 - Describe the core architectural components of Azure`).

---

## 8. Quick Checklist for Generating a Note in My Style

1. Pick the correct archetype (conceptual deep-dive, cert note, cheat sheet, language note, quiz).
2. Open with a crisp definition — as a blockquote callout for references, or a `## 1. Core Concept` for deep-dives.
3. Build content as **nested bullets** with **bold label lead-ins**.
4. Sprinkle **inline backticks** to highlight key phrases/clauses (not just code).
5. Add `NOTE:` callouts for caveats and gotchas.
6. Include **language-tagged, richly commented code** where relevant.
7. Add a **Mermaid diagram** for anything architectural or flow-based.
8. Use **tables** for comparisons and command references.
9. Wire in **wikilinks** and **#tags** for connected concepts.
10. Separate major sections with `---` and generous whitespace.
11. For cert content, mirror the **Course → LP → Module → Unit** hierarchy and include learning objectives.
12. Close deep-dives with **Best Practices/Security** and a **Tips & Tricks** section.
