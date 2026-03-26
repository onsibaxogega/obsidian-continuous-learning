> `NOTE:` introduction unit contained redundant information from [[M1 - Introduction to AI concepts]] and [[M2 - Introduction to generative AI and agents]]

# U2: Tokenization

- **pre-processing techniques** that **might apply to tokenization** depending on the specific text analysis problem you're trying to solve include:


## Text Normalization
- Prepares text by standardizing format
- Removes punctuation and converts words to lowercase
- Improves performance in word frequency tasks
- May lose semantic detail e.g., 
	- "Mr Banks" vs. "banks"
	- Punctuation can signal sentence boundaries (e.g., "banks." vs. "banks")

## Stop Word Removal
- Removes common words with little semantic weight (e.g., "the," "a," "it")
- Helps focus analysis on meaningful terms
- Improves identification of key topics or themes
- Stop word lists should be customized based on task and language

## N-gram Extraction
- Identifies frequent sequences of words (phrases)
- Unigram: single word; Bigram: two-word phrase; Trigram: three-word phrase
- Captures context and meaning better than isolated words
- Used in text classification, topic modeling, language modeling

## Stemming
- Reduces words to root form by removing suffixes ("s," "ing," "ed," "ly")
- Consolidates different word forms into one token (e.g., "powering," "powered," "powerful" → "power")
- Simplifies analysis and frequency counts
- Can produce non-words or incorrect roots (less precise)

## Lemmatization
- Reduces words to base/dictionary form (lemma) using linguistic rules
- Ensures resulting word is valid (e.g., "running" → "run," "better" → "good")
- Requires part-of-speech info for accuracy
- More accurate but computationally intensive compared to stemming

## Parts of Speech (POS) Tagging
- Assigns grammatical category to each token (noun, verb, adjective, adverb)
- Uses linguistic rules and statistical models considering token and context
- Helps disambiguate word meanings (e.g., "bank" as noun or verb)
- Essential for parsing, named entity recognition, syntactic analysis



# U3: Statistical text analysis (Inferring Meaning)

- Having broken down a text corpus into its constituent tokens, and prepared them for analysis; there are some **common statistical analysis techniques you can use to infer meaning from the text**:

## Frequency Analysis

- *Count normalized token occurrences to identify topics or themes.*
- Assumption:
    - Frequently used terms indicate key subjects discussed in the document.
- Example workflow:
    - Tokenize → normalize → lemmatize → count term frequencies.
- Example (partial results):
    - **ai**: 4
    - **business**: 3
    - **benefit**: 2
    - **customer**: 2
    - **decision**: 2
    - **market**: 2
- Insight:
    - Most frequent terms suggest the text focuses on **AI** and its **business benefits**.

## Term Frequency – Inverse Document Frequency (TF‑IDF)

> **_Term Frequency - Inverse Document Frequency_ (TF-IDF)** is a technique that calculates scores based on how often a word or term appears in one document compared to its more general frequency across the entire collection of documents.

### Purpose

- Distinguish relevant terms **across multiple documents** in a corpus.
- Identify terms that are:
    - Frequent in a specific document.
    - Infrequent across the entire corpus.

### Problem with simple frequency

- Common terms across documents (e.g., _agent_, _Microsoft_, _AI_) do not help differentiate documents.

### TF‑IDF Calculation

> **Term Frequency (TF)** — Number of times a term appears in a document.  
> **Inverse Document Frequency (IDF)** — Measures how rare a term is across documents:  
> `idf(t) = log(N / df(t))`  
> **TF‑IDF** — Combined relevance score:  
> `tfidf(t, d) = tf(t, d) * log(N / df(t))`

- **High TF‑IDF** → *term is important in one document but rare in others.*
- **Low TF‑IDF** → *term appears in many documents.*

### Example (two samples)

- **Sample A:**
	_`Microsoft Copilot Studio enables declarative AI agent creation using natural language, prompts, and templates. With this declarative approach, an AI agent is configured rather than programmed: makers define intents, actions, and data connections, then publish the agent to channels. Microsoft Copilot Studio simplifies agent orchestration, governance, and lifecycles so an AI agent can be iterated quickly. Using Microsoft Copilot Studio helps modern businesses deploy Microsoft AI agent solutions fast.`_

 - **Sample B:**
	_`Microsoft Foundry enables code‑based AI agent development with SDKs and APIs. Developers write code to implement agent conversations, tool calling, state management, and custom pipelines. In Microsoft Foundry, engineers can use Python or Microsoft C#, integrate Microsoft AI services, and manage CI/CD to deploy the AI agent. This code-first development model supports extensibility and performance while building Microsoft Foundry AI agent applications.`_


- Common terms (_agent_, _Microsoft_, _AI_) appear in both → IDF = 0 → no discriminative value.
- Top TF‑IDF terms:

**Sample A**

- **copilot**: 2.0794
- **studio**: 2.0794
- **declarative**: 1.3863

**Sample B**

- **code**: 2.0794
- **develop**: 2.0794
- **foundry**: 2.0794

### Insight

- Sample A → declarative agent creation with **Copilot Studio**.
- Sample B → code‑based agent development with **Microsoft Foundry**.



## “Bag‑of‑words” Machine Learning Techniques

> **Bag‑of‑words** — Represents text as a vector of word frequencies, ignoring grammar and word order.

- Used as input features for ML algorithms (e.g., **Naive Bayes**).
- Applications:
    - **Spam filtering**
        - Words like “miracle cure”, “lose weight fast”, `"anti-aging"` may indicate spam.
    - **Sentiment analysis**
        - Model assigns labels such as _positive_ or _negative_ based on word frequencies.

## TextRank

> **TextRank** — Unsupervised graph‑based algorithm that ranks text units (sentences or words) based on similarity connections.


- TextRank is **commonly used to summarize text based on identifying a subset of sentences within a document that best represent its overall subject.**

### How it works

1. **Build a graph**
    - Nodes = sentences.
    - Edges = similarity weights (word overlap, cosine similarity).
2. **Iteratively calculate ranks**
    - Formula:  
        `TextRank(Sᵢ) = (1 - d) + d * Σ(wⱼᵢ / Σwⱼₖ) * TextRank(Sⱼ)`
        - _d_ = damping factor (typically 0.85).
3. **Extract top‑ranked sentences**
    - Highest‑scoring sentences form the summary.

### Example document (cloud computing)

- Five sentences extracted.
- Similarity edges created with weights (e.g., Sentence 1 ↔ Sentence 5: 0.7).
- After ranking, sentences 1, 3, and 5 selected as summary:
    - “Cloud computing provides on-demand access to computing resources.”
    - “Azure is Microsoft's cloud computing platform.”
    - “Cloud computing enables scalability and flexibility.”
  
![Diagram of connected sentence nodes.](https://learn.microsoft.com/en-us/training/wwl-data-ai/introduction-language/media/text-rank.png)

### Extractive vs. Abstractive Summarization

> **Extractive summarization** — Selects original sentences; no new text generated.  
> **Abstractive summarization** — Generates new language to summarize key themes.

### Keyword Extraction

- TextRank can operate at the **word level**.
- Nodes = words; edges = co‑occurrence within a window.
- Highest‑ranked words represent document’s main topics.

---






# U4: Semantic language models

## Overview
- Advances in NLP enable training models that capture **semantic relationships** between tokens.
- Core mechanism: encoding tokens as **embeddings** (multi‑dimensional numeric vectors).
- Early dense‑vector embedding techniques:
  - **Word2Vec**
  - **GloVe**
- Embeddings encode semantic characteristics learned from training text.
- Introduction of **attention** mechanisms:
  - Considers each token *in context*.
  - Produces **contextualized embeddings** (e.g., GPT models).
  - Forms the basis of modern **generative AI**.

## Representing text as vectors

### Vector fundamentals
- Vectors represent points in **multidimensional space**.
- Each vector has:
  - A **direction**
  - A **magnitude**
- Semantically similar words → vectors with **similar orientation**.

### Example embeddings (3D)
| Word | Vector |
|------|--------|
| `dog` | [0.8, 0.6, 0.1] |
| `puppy` | [0.9, 0.7, 0.4] |
| `cat` | [0.7, 0.5, 0.2] |
| `kitten` | [0.8, 0.6, 0.5] |
| `young` | [0.1, 0.1, 0.3] |
| `ball` | [0.3, 0.9, 0.1] |
| `tree` | [0.2, 0.1, 0.9] |

![Diagram of a 3D visualization of word vectors.](https://learn.microsoft.com/en-us/training/wwl-data-ai/introduction-language/media/vectors.png)

- `"dog"` and `"cat"` → similar (domestic animals).
- `"puppy"` and `"kitten"` → similar (young animals).
- `"tree"`, `"young"`, `"ball"` → distinct orientations.

## Finding related terms

> **Cosine similarity** — measures similarity between two vectors based on the angle between them.

- Formula:  
  `cosine_similarity(A, B) = (A · B) / (||A|| * ||B||)`
- High similarity → vectors point in similar directions.
- Low similarity → vectors diverge.

### Example comparisons
- **dog ↔ cat** → similarity ≈ **0.992**
- **dog ↔ tree** → similarity ≈ **0.333**
- **cat ↔ tree** → similarity ≈ **0.452**

![Diagram of cosine similarity visualization showing dog, cat, and tree vectors.](https://learn.microsoft.com/en-us/training/wwl-data-ai/introduction-language/media/cosine-similarity.png)

- **`tree`** is the odd one out.

## Vector translation through addition and subtraction

> **Vector arithmetic** — adding or subtracting embeddings to model semantic transformations.

### Examples
- `dog` + `young` → `puppy`
- `cat` + `young` → `kitten`

![Diagram of vector addition showing dog + young = puppy and cat + young = kitten.](https://learn.microsoft.com/en-us/training/wwl-data-ai/introduction-language/media/vector-addition.png)

- `"young"` encodes the transformation from adult → young.

> **Note** — Real models rarely produce exact matches; nearest‑neighbor search is used.

### Reverse operations
- `puppy` − `young` → `dog`
- `kitten` − `young` → `cat`

## Analogical reasoning

> **Analogy structure** — “A is to B as C is to ?” solved via vector arithmetic.

### Example
- Solve: *puppy is to dog as kitten is to ?*
- Compute: `kitten` − `puppy` + `dog` → `cat`

![Diagram of vector arithmetic showing kitten - puppy + dog = cat.](https://learn.microsoft.com/en-us/training/wwl-data-ai/introduction-language/media/vector-analogy.png)

- Demonstrates how embeddings encode **linguistic relationships**.

## Using semantic models for text analysis

### Text summarization
- Encode each sentence as a vector (e.g., pooled word embeddings).
- Identify sentences most **central** to the document.
- Extract these sentences for **extractive summarization**.

### Keyword extraction
- Compare each word’s embedding to:
  - The **document embedding**, or
  - The **distribution of word vectors**.
- Most similar or central words → key terms.

### Named entity recognition (NER)
- Fine‑tuned models learn embeddings that cluster:
  - People  
  - Organizations  
  - Locations  
  - Other entity types
- During inference:
  - Examine token embeddings + context to classify entity type.

### Text classification
- Represent documents as **aggregate vectors** (e.g., mean of word embeddings).
- Use these vectors for:
  - Sentiment analysis
  - Topic categorization
- Semantically similar documents → similar vector orientations.

---
