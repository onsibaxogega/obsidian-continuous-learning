
# U1: Introduction

- Generative AI is increasingly recognized, even by non-tech individuals, due to its seemingly "magical" ability to produce human-like original content (poetry, prose, code).
- This "magic" is actually based on mathematical techniques from statistics, data science, and machine learning, refined over years of research.
- Understanding core concepts of generative AI and AI agents helps envision future possibilities for AI.

---




# U2: Large Language Models (LLMs)

> **LLMs** (**and SLMs**) encapsulate *linguistic and semantic relationships between words/phrases* to generate meaningful responses from prompts.

- The following overview covers **tokenization, transformers, embeddings, and prediction in LLMs** with visual aids to help understanding.


## How LLMs are Trained
- LLMs predict text completions like advanced predictive text on phones.
- They identify which prior words most influence the next word (e.g., in "I heard a dog ...", "heard" and "dog" guide predicting "bark").
- This relies on a large vocabulary, learned linguistic structures, and semantic understanding.
- To train a model to achieve this capability, the following steps are followed:


### Step 1: Tokenization

- The first step is to provide the model with a large vocabulary of words and phrases, e.g.,
	- the latest generation of LLMs have vocabularies that consist of` hundreds of thousands of tokens`

> A **token** is the `fundamental, discrete unit of data` (*a sequence of characters, sub-word, whole word, punctuation mark, ...*) that a model processes to understand and generate text.


- This first step in training a large language model therefore includes `breaking down the training text into its distinct tokens`, and` assigning a unique integer identifier to each one`, e.g.:
	- I (1)
	- heard (2)
	- a (3)
	- dog (4)
	- bark (5)
	- loudly (6)
	- at (7)
	- a (3) _already assigned_
	- cat (8)
- ... and so on.
- As you add more training data, more tokens will be added to the vocabulary and assigned identifiers; so you might end up with tokens for words like _puppy_, _skateboard_, _car_, and others.




### Step 2: Transforming Tokens with a  Transformer

#### Token Vectors and Embeddings

- Now that we have a set of tokens with unique IDs, we need to find a way to `relate them to one another`
- To do this, we assign each token a _vector_ (an array of multiple numeric values, like [1, 23, 45]).
	- Each vector has multiple numeric _elements_ or _dimensions_
	- We use these dimensions to encode the `linguistic and semantic attributes` of the token
		- this helps to provide information about what the token _means_ and `how it relates to other tokens, in an efficient format`.

> We need to **transform these vector representations of the tokens** (`which are initially random`) **into new vectors with linguistic and semantic characteristics embedded in them**, `based on the contexts in which they appear in the training data`. 
	 Because the new vectors have semantic values embedded in them, we call them _embeddings_.

- To accomplish this task, we use a _transformer_ model. This kind of model consists of **two "blocks"**:



#### Transformer Architecture
- The following is a significantly simplified explanations of the the Transformer Architecture

##### Encoder
- The _encoder_ block creates the embeddings by applying a technique called _attention_. 
	- The **attention layer** *examines each token in turn, and determines how it's influenced by the tokens around it*. 
- To make the encoding process more efficient, *multi-head attention* is used to evaluate multiple elements of the token in parallel and assign weights that can be used to calculate the new vector element values. 
- The results of the attention layer are fed into a fully connected neural network to find the best vector representation of the embedding.


##### Decoder
- The _decoder_ layer uses the embeddings calculated by the encoder to determine the next most probable token in a sequence started by a prompt.
- The decoder also `uses attention and a feed-forward neural network to make its predictions`.

> **Note:** Attention helps capture context but details are complex. See [Attention is All You Need](https://arxiv.org/abs/1706.03762) paper for deep dive.


![Diagram of the Transformer architecture with the encoding and decoding layers.](https://learn.microsoft.com/en-us/training/wwl-data-ai/fundamentals-generative-ai/media/simplified-transformer-architecture.png)



#### Initial vectors and positional encoding

- Initially, the token vector values are assigned randomly, before being fed through the transformer to create embedding vectors. 
- The token vectors are fed into the transformer `along with` a _positional encoding_ that `indicates where the token appears in the sequence of training text` 
	- (we need to do this because the order in which tokens appear in the sequence is relevant to how they relate to one another). 
- For example, our tokens might start off looking like this:

| Token | ID  | Position | Vector     |
| ----- | --- | -------- | ---------- |
| I     | 1   | 1        | [3, 7, 10] |
| heard | 2   | 2        | [2, 15, 1] |
| a     | 3   | 3        | [9, 11, 1] |
| dog   | 4   | 4        | [2, 7, 11] |
| bark  | 5   | 5        | [9, 12, 0] |
| ...   | ... | ...      | ...        |

> **Note:** Real vectors have thousands of elements/dimensions.



#### Attention and Embeddings

- To determine the vector representations of tokens that include embedded contextual information, the transformer uses _attention_ layers. 
- An attention layer considers each token in turn, within the context of the sequence of tokens in which it appears. 
	- The tokens around the current one are weighted to reflect their influence and the weights are used to calculate the element values for the current token's embedding vector. 
	- For example, when considering the token "bark" in the context of "I heard a dog bark", the tokens for "heard" and "dog" will be assigned more weight than "I" or "a", since they're stronger indicators for "bark".
- Initially, the model doesn't "know" which tokens influence others; but as it's exposed to larger volumes of text, it can iteratively learn which tokens commonly appear together, and start to find patterns that help assign values to the vector elements that reflect the linguistic and semantic characteristics of the tokens, based on their proximity and frequency of use together. 
- The process is made more efficient by using _multi-head_ attention to consider different elements of the vectors in parallel.
- The result of the encoding process is a set of `embeddings`;
	- vectors that include contextual information about how the tokens in the vocabulary relate to one another. 
- A real transformer produces embeddings that include thousands of elements, but to keep things simple, let's stick to vectors with only three vectors in our example. 
	- The result of the encoding process for our vocabulary might look something like this:

|Token|Token ID|Embedding|
|---|---|---|
|I|1|[2, 0, -1 ]|
|heard|2|[-2, 2, 4 ]|
|a|3|[-3, 5, 5 ]|
|dog|4|[10, 3, 2 ]|
|bark|5|[9, 2, 10 ]|
|loudly|6|[-3, 8, 3 ]|
|at|7|[-5, -1, 1]|
|cat|8|[10, 3, 1]|
|puppy|127|[5, 3, 2 ]|
|car|128|[-2, -2, 1 ]|
|skateboard|129|[-3, -2, 2 ]|
- We can think of the elements of the embeddings as `dimensions in a multi-dimensional vector-space`. 
- In our simple example, our embeddings only have three elements, so we can visualize them as vectors in three-dimensional space, like this:

![Diagram of embedding vectors for tokens in three-dimensions.](https://learn.microsoft.com/en-us/training/wwl-data-ai/fundamentals-generative-ai/media/embed-example.png)

-  Because the dimensions are calculated based on how the tokens relate linguistically to one another, `tokens that are used in similar contexts` (and therefore have similar meanings) `result in vectors with similar directions`
- We can measure how close tokens are to one another semantically by calculating the _cosine similarity_ of their vectors.
- For example, the embeddings for "dog" and "puppy" point in more or less the same direction, which isn't too different from the embedding for "cat"; but very different from the embedding for "skateboard" or "car".



#### Predicting completions from prompts

- Now that we have a set of embeddings that encapsulate the contextual relationship between tokens, we can use the _decoder_ block of a transformer to iteratively predict the next word in a sequence based on a starting _prompt_.
- Once again, _attention_ is used to consider each token in context;
	- but `this time the context to be considered can only include the tokens that` _precede_ `the token we're trying to predict`. 
- The decoder model is trained, using data for which we already have the full sequence, by applying a technique called _masked attention_;
	- in which the `tokens after the current token are ignored. `
	- Since we already know the next token during training, the transformer can compare it to the predicted token and adjust the learned weights in later training iterations to reduce the error in the model.
- When predicting a new completion, for which the next tokens are unknown, the attention layers calculate possible vectors for the next token and the feed-forward network is used to help determine the most probable candidate. 
- The predicted value is then added to the sequence, and the whole process repeats to predict the _next_ token; and so on, `until the decoder predicts that the sequence has ended`.
- For example, given the sequence "_When my dog was a ..._", the model will evaluate the tokens in the sequence so far, use _attention_ to assign weights, and predict that the next most probable token is "_puppy_" rather than, say, "_cat_" or "_skateboard_".


---


