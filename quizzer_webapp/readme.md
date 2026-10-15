# Quizzer

A localhost-only quiz app. It uses Python standard library only (no pip packages) and vanilla HTML, CSS, and JavaScript. For the full design, see `docs/03_spec.md`.

## Prerequisites

- Python 3.9 or later.

## Run the app

1. From the project root, start the server:

   ```
   python server.py
   ```

   To use a different port, pass it as an argument, for example `python server.py 9000`.

2. Open `http://localhost:8000` in your browser.
3. To stop the server, press `Ctrl+C`.

The server listens on `127.0.0.1` only and has no authentication.

## Add quizzes

Put quiz files in `_quizzes/`. You can nest them in subdirectories to any depth. The quiz selector mirrors the directory structure.

```
_quizzes/
├── intro.json
└── aws/
    └── networking/
        └── vpc-basics.json
```

Reload the page to pick up new or changed files. A quiz file looks like this:

```json
{
  "title": "AWS Networking Fundamentals",
  "description": "Covers VPCs, subnets, and route tables.",
  "questions": [
    {
      "id": 1,
      "type": "multiple_choice",
      "question": "Which AWS service provides a logically isolated virtual network?",
      "choices": { "A": "Amazon EC2", "B": "Amazon VPC", "C": "Amazon Route 53" },
      "answer": "B",
      "justification": "Amazon VPC provisions an isolated section of the AWS cloud."
    },
    {
      "id": 2,
      "type": "multiple_select",
      "question": "Which are valid route table targets? (Select all that apply)",
      "choices": { "A": "Internet Gateway", "B": "NAT Gateway", "C": "S3 bucket (directly)" },
      "answer": ["A", "B"],
      "justification": "S3 is reached through a VPC endpoint, not directly from a route table."
    }
  ]
}
```

- `type` is `multiple_choice` (one answer, a string) or `multiple_select` (several answers, an array).
- `id` is an integer that is unique within the quiz.
- Invalid quiz files appear in the selector as disabled cards with the reason.

## Take a quiz

1. Select a quiz from the list and click **Start quiz**.
2. Answer every question. The sticky bar at the top shows your progress. Questions appear in random order, but choices stay in A, B, C order.
3. Click **Submit quiz**. The button is enabled after you answer all questions.
4. Review your score and, for each question, your answer, the correct answer, and the justification.

For multiple-select questions, each correct pick adds 1 point and each incorrect pick subtracts 1. The question score is that sum (minimum 0) divided by the number of correct choices.

## Results

The app writes results to `_results/` as JSON Lines files. The folder structure mirrors `_quizzes/`:

```
_results/aws/networking/vpc-basics_result_2026-10-14T154500.jsonl
```

Each file has a `start` line, one `answer` line per question, and a final `complete` line. If the `complete` line is missing, the session was interrupted.
