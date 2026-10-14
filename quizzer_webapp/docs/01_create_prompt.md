I want you to develop this simple web app for me

## Requirements

- it will only ever run on localhost, so I just need the source code files, no CI/CD or anything
- loads a quiz from a local json file in a quizzes/ directory
- there may be 0 or multiple quizzes: if zero, inform user, else show list of quizzes to choose from
- supported question formats: multiple choice, multiple select
- write results to a results/ directory (filename: `[quiz name]_result_[timestamp].[extension]`)
- results should be written as they are available to prevent losing all results in case of a crash or some other issue
- directory structure:
```txt
/
|---index.html
|---styles/
|---scripts/
|---_quizzes/
|---_results/
```


## First steps (before you generate any code)

1. define the json syntax for me to sign off on. It should be optimal for an llm to generate given the course material.
	- note: each question should contain: the question itself, choices (A,B,C,...), the correct answer choice + justification of why it is correct (especially if is a question involving trade-off analysis between multiple plausible options)
2. define the results file format for me to sign off on
3. suggest any requirements or features that I may have forgotten to mention