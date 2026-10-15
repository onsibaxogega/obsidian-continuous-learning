# Quiz file format

You generate quiz files for a study app called Quizzer. The user tells you the topic, the number of questions, the source material, and any other requirements. This document defines only the file format. Follow it exactly, because the app rejects a file that breaks the structural rules.

## Output

- Produce one valid JSON object, encoded as UTF-8.
- Do not add comments, trailing commas, Markdown code fences, or any text outside the JSON object.
- If you can write files, save the result as a `.json` file with a lowercase, hyphenated name, such as `pubsub-fundamentals.json`. If you cannot create json files, use any other text file format you support, e.g. txt, md, ... and write the json object to it. Otherwise, return only the JSON.

## Structure

```json
{
  "title": "Pub/Sub fundamentals",
  "description": "Delivery guarantees, acknowledgment deadlines, and dead-letter handling.",
  "questions": [
    {
      "id": 1,
      "type": "multiple_choice",
      "question": "A subscriber needs up to 5 minutes to process each message, and Pub/Sub keeps redelivering messages before processing finishes. What is the best fix?",
      "choices": {
        "A": "Increase the acknowledgment deadline, or have the client library extend the lease while processing",
        "B": "Switch the subscription from pull to push",
        "C": "Delete and recreate the subscription",
        "D": "Reduce the size of the published messages"
      },
      "answer": "A",
      "justification": "Redelivery happens because the message is not acknowledged before the ack deadline expires. Extending the deadline or renewing the lease fixes the cause. Changing the delivery type, recreating the subscription, or shrinking messages does not address the deadline."
    },
    {
      "id": 2,
      "type": "multiple_select",
      "question": "Which settings help you handle messages that repeatedly fail processing?",
      "choices": {
        "A": "A dead-letter topic",
        "B": "A retry policy with exponential backoff",
        "C": "Topic message retention set to 365 days",
        "D": "A maximum delivery attempts value in the dead-letter policy",
        "E": "Message ordering keys"
      },
      "answer": ["A", "B", "D"],
      "justification": "A dead-letter topic (A) captures messages that cannot be processed, the maximum delivery attempts value (D) decides when a message moves there, and a backoff retry policy (B) spaces out redeliveries. Retention (C) controls how long messages are stored, not how failures are handled. Ordering keys (E) control sequence, not failure handling."
    }
  ]
}
```

## Top-level fields

| Field           | Type   | Required | Rule                                     |
| --------------- | ------ | -------- | ---------------------------------------- |
| `title`       | string | Yes      | Non-empty quiz name.                     |
| `description` | string | No       | One sentence about what the quiz covers. |
| `questions`   | array  | Yes      | At least one question object.            |

## Question fields

| Field             | Type            | Required | Rule                                                                                                 |
| ----------------- | --------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| `id`            | integer         | Yes      | Unique within the quiz. Use 1, 2, 3, and so on.                                                      |
| `type`          | string          | Yes      | Exactly `"multiple_choice"` or `"multiple_select"`.                                              |
| `question`      | string          | Yes      | Non-empty question text.                                                                             |
| `choices`       | object          | Yes      | Maps letters to choice text. See the choice rules.                                                   |
| `answer`        | string or array | Yes      | A string for `multiple_choice`. An array of strings for `multiple_select`. See the answer rules. |
| `justification` | string          | Yes      | Explains the answer. See the justification rules.                                                    |

Do not add any other fields.

### Choice rules

- Keys are single uppercase letters that start at `"A"` and continue without gaps: `"A"`, `"B"`, `"C"`, and so on.
- Values are non-empty strings.
- Use 2 to 6 choices. The app shows them in the order you write them and does not shuffle them.

### Answer rules

- `multiple_choice`: a single letter string, such as `"B"`. Exactly one choice is correct.
- `multiple_select`: an array of two or more unique letter strings, such as `["A", "C"]`. The array holds every correct choice and no incorrect one.
- Every letter in `answer` must exist as a key in `choices`.

The app scores a `multiple_select` question as follows: each correct pick adds 1 point, each incorrect pick subtracts 1 point, and the total is divided by the number of correct choices (minimum 0, maximum 1). Define the correct set so that each choice is clearly right or clearly wrong.

### Justification rules

- Required for every question, as a non-empty string.
- The app shows it on the review screen after the user submits the quiz.
- Explain why the correct answer is correct, and why the most tempting incorrect choices are not.

## Text rules

- Use plain text only. The app does not render Markdown, HTML, or LaTeX.
- Use `\n` for a line break inside a string. Escape double quotes inside strings as `\"` and backslashes as `\\`.
- The app shuffles the order of questions every time a quiz runs. Write each question so that it makes sense on its own. Do not refer to other questions by position or number.
- The app adds a "Select all that apply" label to `multiple_select` questions, so you do not need to put that phrase in the question text.

## Validity checklist

Before you return the result, confirm each item:

1. The output is a single JSON object and nothing else.
2. Every `id` is a unique integer.
3. Every `type` is `"multiple_choice"` or `"multiple_select"`.
4. `multiple_choice` answers are strings. `multiple_select` answers are arrays.
5. Every letter in every `answer` exists in that question's `choices`.
6. Choice letters start at `"A"` and have no gaps.
7. Every question has a non-empty `justification`.
8. No field outside this specification appears.
9. The JSON has no comments and no trailing commas.
