
# U1: Introduction

- This training `module is designed to provide a high-level overview of some core capabilities of artificial intelligence (AI)` and give you an _intuition_ of how they work. 
- It's not a deeply technical module, and we won't be writing any code or getting into the mathematical details of the machine learning models on which AI is built. 
- Instead, we'll focus on understanding the kinds of things that AI can do, and the basic principles on which it's based.

---




# U2: Generative AI and Agents

> **Generative AI** enables software to create new content (text, images, video, code) *using language models trained on large datasets from public sources*.

- Users interact via **prompts** (natural language questions/statements), which the model uses to generate meaningful responses by understanding semantic relationships between words.

## Model Types

- **Large Language Models (LLMs):** Trained on vast data, powerful, general-purpose, but costly.
- **Small Language Models (SLMs):** Focused, lightweight, suitable for specific tasks and local device deployment.

## Common Use Cases

- **AI agents** assisting users with information or task automation.
- Generating new content for iterative development.
- Automated language translation.
- Summarizing or explaining complex documents.

---



# U3: Text and Natural Language

> **Natural Language Processing (NLP)**: AI models/techniques for understanding language. It's the foundation for generative AI LLMs.

- Generative AI models handle many NLP scenarios, but `simpler NLP models are cost-effective for specific text analysis`.

## Text Analysis Use Cases

- **Text Classification:** Assigning documents to categories (e.g., sentiment analysis for positive/negative/neutral).
- **Key-term Extraction & Entity Detection:** Identifying key words/phrases and mentions of people, places, organizations.
- **Summarization:** Reducing text volume while retaining main points.

## Common NLP Text Analysis Scenarios

- Analyzing documents/transcripts for key subjects and entity mentions (people, places, orgs, products).
- Evaluating sentiment/opinion from social media, reviews, articles.
- Implementing chatbots for FAQs or predictable dialogues (less complex than generative AI).


---




# U4: Speech

> **Speech capabilities** in AI enable interaction through spoken language.

## Speech Recognition
- AI "hears" and interprets speech, typically as **speech-to-text** (audio converted to text).

## Speech Synthesis
- AI vocalizes text as spoken language, usually via **text-to-speech** (text converted to audio).
- AI speech tech is evolving to handle background noise, interruptions, and produce more human-like voices.

## AI Speech Scenarios
- AI agents understanding spoken input, performing tasks, and responding verbally.
- Automated transcription of calls or meetings.
- Automating audio descriptions for video or text.
- Automated speech translation between languages.

---



# U5: Computer Vision

> **Computer vision** is AI that analyzes visual input (photos, videos, live feeds) using models trained on large image datasets.

## Types of Computer Vision Models
- **Image Classification:** Trained on labeled images to identify the main subject in unlabeled images.
- **Object Detection:** Identifies locations of specific objects within an image.
- **Semantic Segmentation:** Identifies exact pixels belonging to objects, beyond just bounding boxes.
- **Multi-modal Models:** Combine visual features with text to generate detailed image descriptions.

## Common Computer Vision Scenarios
- AI agents interpreting visual input.
- Auto-captioning or tag generation for photos.
- Visual search.
- Monitoring stock or identifying items at checkout in retail.
- Security video monitoring.
- Facial recognition for authentication.
- Robotics and self-driving vehicles.

---


# U6: Information Extraction

> AI automates **extracting information** and insights from *unstructured data like scanned documents, forms, images, audio, and video*.
  
![Diagram of information being extracted from a receipt.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-ai-fundamentals/media/information-extraction.png)


## Core Technology
- **Optical Character Recognition (OCR):** Detects text location in images.
- Combined with analytical models to interpret and extract specific fields from documents.
- Advanced models now extract data from audio, images, and videos beyond text-based forms.

## Common Use Cases
- Automated processing of business documents (e.g., expense claims).
- Large-scale digitization of paper data (e.g., census records).
- Document indexing for search.
- Extracting key points and actions from meeting transcripts or recordings.

---




# U7: Responsible AI

- Principles for responsible AI include:

| Principle                  | Description                                                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Fairness**               | Minimize bias in training data and test AI systems to avoid discriminatory outputs caused by biased data selection. |
| **Reliability and Safety** | AI is probabilistic and not infallible; applications must mitigate associated risks.                                |
| **Privacy and Security**   | Protect personal data used in training; ensure models do not expose private information.                            |
| **Inclusiveness**          | Ensure AI benefits all users and does not exclude any group.                                                        |
| **Transparency**           | Inform users how AI works and its limitations to avoid the perception of "magic."                                   |
| **Accountability**         | Developers and organizations must apply governance frameworks to uphold responsible AI principles.                  |

## Responsible AI Examples

- AI college admissions systems should be tested for fairness, avoiding discrimination based on irrelevant demographics.
- AI robotic solutions using computer vision should act only when confidence in object detection is high to prevent harm.
- Facial ID systems in secure areas must delete personal images after use and restrict access to authorized personnel.
- Speech-based AI agents should provide text captions for users with hearing impairments.
- AI loan-approval systems should disclose AI use and describe training data features without revealing confidential info.
