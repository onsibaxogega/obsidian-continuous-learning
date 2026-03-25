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
