- YES to the questions schema
- YES to results schema

- the stdlib http.server python server sounds good. I want to completely avoid having to use any pip packages at all if possible.

- review screen: "after completing the quiz, show a summary with score + per-question breakdown (question, your answer, correct answer, justification)? this is where the justification field really shines." -> YES

- yes to progress bar: make it sticky at the top of viewport

- yes to shuffling questions, but not choices: by default - no need for a UI toggle

- no keyboard nav needed

- no past results viewer. the result json files should be sufficient for me, for now.

- no need for quiz metadata extensions

- multiple select grading: correct selection: +1 unit, incorrect: -1. question score = units_sum/total_num_correct_choices (0 min, 1 max)

- navigation: all questions can just be on a single page that I can scroll down - with the sticky progress bar at top of viewport. No answers shown until I submit the quiz

Any other question?