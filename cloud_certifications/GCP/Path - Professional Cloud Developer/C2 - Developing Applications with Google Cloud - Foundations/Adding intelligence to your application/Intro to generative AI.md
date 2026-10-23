
# Generative AI and Large Language Models


## 1. Core Concept

- **Definition:** generative AI is a type of artificial intelligence that `creates new content based on what it has learned from existing content` — this learning process is called `training`
- a `statistical model` is created from existing content → you provide an input (called a `prompt`) → the model predicts an expected response → new content is generated based on that prediction
- the model learns from a massive amount of existing content — `text, images, and audio`
- training results in the creation of a `foundation model`

### Traditional Programming vs Machine Learning vs Generative AI

| Approach                               | How it works                                                                                                                                                                       | Limitations                                                                                                       |
| :------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| **traditional programming**            | you specify the rules, the machine acts on them and returns answers (e.g., define a cat as `type: animal, legs: 4, ears: 2, fur: yes, likes: yarn, catnip`)                        | impossible to implement all possible rules — writing exhaustive algorithms is impractical                         |
| **machine learning (neural networks)** | you feed the machine data and answers, it discovers the rules itself (e.g., train on many pictures of cats, the machine learns the pattern and predicts if a new picture is a cat) | typically narrow in scope — `trained to solve a specific task`                                                    |
| **generative AI**                      | you feed a machine a `huge amount of multimodal data`, it learns a seemingly endless number of concepts and develops foundation models                                             | aims to solve general problems — when you ask "what's a cat," it can give you `everything it learned about a cat` |


---


## 2. Large Language Models (LLMs) #LLM

- **Definition:** large, general-purpose language models that can be `pre-trained` and then `fine-tuned` for specific purposes
- LLMs are the most popular type of foundation model
- LLMs are trained on `text data only`, but other types of foundation models might be trained on images or programming code

### What "Large" Means

- **training dataset size:** enormous, sometimes at the `petabyte scale`
- **number of parameters:** now reaches `billions and even trillions`
	- parameters are essentially `the memories and knowledge` that the machine has learned during training
	- parameters determine the ability of a model to solve a problem, such as predicting text

### What "General-Purpose" Means

- the models are sufficient to `solve common problems` due to the `commonality found in human language`, regardless of the specific task

### Pre-Trained and Fine-Tuned

- a large language model can be `pre-trained for general purpose use` with a large dataset
- later, it can be `fine-tuned for a specific purpose` by using a `much smaller dataset`
- _Example:_ a foundation model can be used directly for general tasks like `content extraction or document summarization`, then fine-tuned with domain-specific data for tasks like `financial model generation or healthcare consulting`


---


## 3. Use Cases for Generative AI

- **content creation:**
	- generate stories or poems based on prompts
	- improve images based on instructions
- **knowledge summarization:**
	- automatically summarize video, audio, and paragraphs
	- generate questions and answers based on content
- **search and discovery:**
	- search for a document
	- discover products based on desired features
- **workflow automation:**
	- extract and label contracts
	- classify feedback and create support tickets


---


## 4. Generative AI for Developers (Gemini)

- generative AI revolutionizes how applications are developed — you can code your apps with help from a `generative AI-powered coding assistant`
- `Gemini` provides this assistance to help you write code faster and more efficiently

### Coding Assistant Capabilities

| capability               | description                                                                                             |
| :----------------------- | :------------------------------------------------------------------------------------------------------ |
| **code generation**      | generate code based on a `natural language description` of the desired code                             |
| **unit test generation** | automatically generate unit tests for a piece of code                                                   |
| **code optimization**    | ask your assistant to optimize existing code                                                            |
| **documentation**        | add comments to code or generate release notes based on changes                                         |
| **code explanation**     | ask your assistant to explain what the code does and how it does it                                     |
| **fixing code**          | find bugs in your code and fix them                                                                     |
| **code completion**      | finish the line of code you're writing based on context, or suggest code for an entire function         |
| **code translation**     | translate code from one language to another while adhering to coding conventions of the target language |
