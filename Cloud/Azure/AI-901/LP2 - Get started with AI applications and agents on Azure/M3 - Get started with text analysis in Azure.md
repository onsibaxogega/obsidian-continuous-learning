

# U1: Introduction to Text Analysis & NLP

## Overview
- The module focuses on how AI can interpret and extract meaning from written text in documents and other assets.
- Text understanding is enabled by natural language processing (NLP), which allows machines to process human language and derive structure or meaning from it.

## NLP (Natural Language Processing)
- NLP provides the techniques that let systems understand, interpret, and respond to human language.
- It transforms unstructured text into structured information that models can analyze.

## Text Analysis
- Text analysis is the automated examination of written content to uncover insights such as:
    - Sentiment
    - Keywords
    - Entities
    - Topics
- It relies on NLP to convert raw text into meaningful signals.

## Applications of Text Analysis
### Customer Feedback Analysis
- Helps organizations process large volumes of reviews, support tickets, and surveys.
- Enables early detection of customer dissatisfaction and identification of trends.

### Healthcare Text Analysis
- Extracts clinical details from unstructured medical notes.
- Supports identification of symptoms, medications, and diagnoses to improve decision-making.

### Financial Document Processing
- Automates extraction of key information from contracts, loan applications, and regulatory documents.
- Reduces manual review time and improves accuracy for fields like borrower details or interest rates.

### Legal Document Summarization
- Summarizes long legal documents such as case files or agreements.
- Highlights important clauses and categorizes documents by topic to support faster legal review.

## Next Steps
- The module continues with Azure’s language capabilities, specifically Azure Language in Microsoft Foundry tools, which provides pre‑trained services for multiple text analysis tasks.

---




# U2: Azure Language

- **Microsoft Foundry** is the platform for building AI apps and agents on Azure. 
- **Azure Language in Foundry tools** is a *natural language processing service in Foundry* that is *built in models for common text analysis tasks*. 
	- Azure Language can perform advanced NLP over unstructured text.


### Core text analysis tasks Azure Language supports include

- **Key phrase extraction** lists the main concepts from unstructured text.
- **Named entity recognition** identifies people, places, events, and more. This feature can also be customized to extract custom categories.
- **Entity linking** identifies known entities together with a link to Wikipedia.
- **Sentiment analysis and opinion mining** identifies whether text is positive or negative.
- **Summarization** summarizes text by identifying the most important information.
- **Personal identifying information (PII) detection** identifies personally sensitive information, including personal health information (PHI).
- **Language detection** evaluates text and detects the language and dialect.


## Get started with text analysis in Foundry portal

- To test out Azure Language features in the Foundry portal, you need to create a _Foundry resource_ and _Foundry project_.

- A Foundry resource and project is sufficient for testing Azure Language capabilities in the _classic_ Foundry portal **Language Playground**. 
	- The Language Playground is a built‑in workspace in the _classic_ portal that lets you use natural language models directly in the browser.

Let’s explore some text analysis tasks in the classic Foundry portal.


#### Key phrase extraction

- First, we might want to extract the keywords and phrases used in some text, which can be helpful in processes like indexing and searching for relevant documents. 
- **Key phrase extraction** identifies the main points from text.

For example, you might receive a review such as:

> "_I had a fantastic meal at the diner in Seattle on Saturday. The mushroom risotto was perfectly prepared, and really tasty. Our waiter, Pete, was friendly and efficient; and gave us a great recommendation for a dessert (strawberry cheesecake). I'd definitely recommend this place for a casual dinner._"

Key phrase extraction can provide some context to this review by extracting the following phrases:

- casual dinner
- dessert
- fantastic meal
- diner
- great recommendation
- mushroom risotto
- Pete
- place
- Saturday
- Seattle
- strawberry cheesecake
- waiter

In the classic Foundry portal, you can test out Azure Language's key phrase extraction feature in the Language Playground.

[![Screenshot of the Language playground's key phrase extraction capability.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-text-analysis-azure/media/playground-key-phrases.png)](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-text-analysis-azure/media/playground-key-phrases.png#lightbox)


#### Entity recognition and linking

- Additionally, we might want to use **named entity recognition** to find people, places, dates, and other specific entities mentioned in the text.
- You can provide Azure Language with unstructured text and it returns a list of _entities_ in the text that it recognizes. 
- **An entity** is an item of a particular type or a category; and in some cases, subtype, for example:

|Type|SubType|Example|
|---|---|---|
|Person||"Bill Gates", "John"|
|Location||"Paris", "New York"|
|Organization||"Microsoft"|
|Quantity|Number|"6" or "six"|
|Quantity|Percentage|"25%" or "fifty percent"|
|Quantity|Ordinal|"1st" or "first"|
|Quantity|Age|"90 day old" or "30 years old"|
|Quantity|Currency|"10.99"|
|Quantity|Dimension|"10 miles", "40 cm"|
|Quantity|Temperature|"45 degrees"|
|DateTime||"6:30PM February 4, 2012"|
|DateTime|Date|"May 2nd, 2017" or "05/02/2017"|
|DateTime|Time|"8am" or "8:00"|
|DateTime|DateRange|"May 2nd to May 5th"|
|DateTime|TimeRange|"6pm to 7pm"|
|DateTime|Duration|"1 minute and 45 seconds"|
|DateTime|Set|"every Tuesday"|
|US-based Phone Number||"(312) 555-0176"|

- In the classic Foundry portal, you can test out Azure Language's named entity recognition feature in the Language Playground.

[![Screenshot of the Language playground's named entity recognition capability.|697](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-text-analysis-azure/media/playground-named-entities.png)](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-text-analysis-azure/media/playground-named-entities.png#lightbox)

- Azure Language also supports **entity linking** to help disambiguate entities by linking to a specific reference. For recognized entities, the service returns a URL for a relevant _Wikipedia_ article.
- For example, suppose you use Azure Language to detect entities in the following restaurant review extract:

> "_I ate at the restaurant in Seattle last week._"

|Entity|Type|SubType|Wikipedia URL|
|---|---|---|---|
|Seattle|Location||https://en.wikipedia.org/wiki/Seattle|
|last week|DateTime|DateRange||


#### Sentiment analysis and opinion mining

- We can also use **sentiment analysis** to classify a document as positive or negative, with an overall rating for the document as well as a sentence-by-sentence breakdown.
- The text analytics capabilities in Azure Language can evaluate text and return sentiment scores and labels for each sentence. 
	- This capability is useful for detecting positive and negative sentiment in social media, customer reviews, discussion forums and more.
- Azure Language returns sentiment scores in three categories: **positive, neutral, and negative**
	- In each of the categories, *a score between 0 and 1 is provided*. 
		- Scores indicate how likely the provided text is a particular sentiment.
	- Azure Language **returns both an overall document sentiment, and a sentence-by-sentence breakdown**.

- We could analyze the sentiment of our restaurant review:

> "_I had a fantastic meal at the diner in Seattle on Saturday. The mushroom risotto was perfectly prepared, and really tasty. Our waiter, Pete, was friendly and efficient; and gave us a great recommendation for a dessert (strawberry cheesecake). I'd definitely recommend this place for a casual dinner._"

- The sentiment score for the review might be:
	- Document sentiment: positive
	    - Positive score: 0.99
	    - Neutral score: 0.01
	    - Negative score: 0.00
	- Sentence 1 sentiment: positive
	    - Positive score: 0.98
	    - Neutral score: 0.02
	    - Negative score: 0.00
	- ...

- The service would provide sentence analysis for each of the sentences.
- In classic Foundry portal, you can test out Azure Language's sentiment analysis capability in the Language Playground.

[![Screenshot of the Language playground's sentiment capability.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-text-analysis-azure/media/playground-sentiment.png)](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-text-analysis-azure/media/playground-sentiment.png#lightbox)



#### Summarization

- With **text summarization**, we can generate both _extractive_ summaries that include only the most relevant sentences and _abstractive_ summaries that create an overall description of the key points of the document.

- Given the example text:
> "_I had a fantastic meal at the diner in Seattle on Saturday. The mushroom risotto was perfectly prepared, and really tasty. Our waiter, Pete, was friendly and efficient; and gave us a great recommendation for a dessert (strawberry cheesecake). I'd definitely recommend this place for a casual dinner._"

- We could extract an:
##### Extractive summary
- (Rank score: 100%) I had a fantastic meal at the diner in Seattle on Saturday.
- (Rank score: 52%) The mushroom risotto was perfectly prepared, and really tasty.
- (Rank score: 63%) I'd definitely recommend this place for a casual dinner.

##### Abstractive summary 
- The individual experienced an exceptional dining experience at the diner in Seattle, highlighting the delectable mushroom risotto as a standout dish. They appreciated the friendly and efficient service provided by the waiter, Pete, who also offered a highly recommended dessert option—strawberry cheesecake. The overall ambiance and food quality were such that the diner was deemed suitable for a casual dinner. The positive review underscores the diner's ability to deliver a satisfying meal, paired with commendable customer service, making it a recommended destination for future dining in the area. The summary encapsulates the main points of enjoyment and recommendation without redundant details from the original document.

- In classic Foundry portal, you can test out Azure Language's summarization capability in the Language Playground.

[![Screenshot of the Language playground's summarization capability.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-text-analysis-azure/media/playground-summarize.png)](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-text-analysis-azure/media/playground-summarize.png#lightbox)

Next, let's learn how to get started with the Azure Language software development kit (SDK) to build a lightweight application.

---



# U3: Azure Language SDK

- The **Azure Language SDK** is a *client library* that makes it easy for developers to add natural language processing (NLP) features—such as sentiment analysis, entity recognition, key phrase extraction, language detection, and text summarization—to their applications without having to call REST APIs directly. 
- You would use the SDK when writing applications in _Python_, _JavaScript_, _C#_, or _Java_.
- A client library is a set of ready made code that developers can use in their application to easily talk to a service or API.
- You can review foundational material on applications and using endpoints in: [Get started with AI in Azure](https://learn.microsoft.com/en-us/training/modules/get-started-with-ai-in-azure/5-endpoints?pivots=text%3Fazure-portal%3Dtrue).

- To use the Azure Language SDK, you need to have a _Foundry resource_. 
- When you create a Foundry resource, Azure creates an _endpoint_. 
- You can find your resource endpoint and key in the _new_ Foundry portal's home page. 
- When you run your application code, your application sends a request, or call, to the endpoint. 
	- The call can be sent using the REST API or SDK. 
- The service returns a response, such as key phrases detected, in a format known as JSON.

## Use the Azure Language Python SDK

- Let's see how you can use the Azure Language Python SDK to build an application that analyzes a document.
- To use the Azure Language Python SDK, you need to have compatible version of Python and the Azure Language Python SDK installed.

- The Python SDK can be installed in the Visual Studio Code _terminal_ using:

```bash
pip install azure-ai-textanalytics
```

- In the code editor, we can create *one text file, and one Python file* which contains application code.
![Screenshot of Visual Studio Code with a text file open.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-text-analysis-azure/media/python-sdk-document-example.png)

- At the start of the application code, import the SDK
```python
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
```

[![Screenshot of Visual Studio Code with a Python file open with a focus on the client object created.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-text-analysis-azure/media/python-sdk-client-example.png)](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-text-analysis-azure/media/python-sdk-client-example.png#lightbox)

- Then we use our Foundry resource endpoint and key to create an authenticated **client object**, the tool your code uses to communicate with a service.
	- The client object knows the service's endpoint, carries credentials (like keys or tokens), exposes methods (for example: `analyze_sentiment()`), and handles sending requests and receiving responses under the hood.

- We use the client's methods to call Azure Language functions. 
	- For example, we can extract key phrases with `client.extract_key_phrases()`, 
	- recognize entities with the function `client.recognize_entities()`, 
	- and analyze sentiment with `client.analyze_sentiment()`. 



- To **generate a summary**, we need to use an **asynchronous technique** *to begin the summarization task and retrieve the results.*

[![Screenshot of Visual Studio Code with a Python file open with a focus on the text analysis functions.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-text-analysis-azure/media/python-sdk-text-analysis-example.png)](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-text-analysis-azure/media/python-sdk-text-analysis-example.png#lightbox)



- We can **display the results of the analysis by** running the application code in the terminal with the command `python <file_name>.py`. 
- When we run the app, it uses Azure Language in our Foundry resource to perform each of the tasks.

[![Screenshot of Visual Studio Code with the terminal open with a focus on the results.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-text-analysis-azure/media/python-sdk-results.png)](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-text-analysis-azure/media/python-sdk-results.png#lightbox)


## Examples of code to use with the Azure Language Python SDK

- Take a look at examples of code that can be used with the Azure Python SDK for the same text analysis tasks found in the previous unit.
- Regardless of the text analysis feature used, a client is needed to call the feature.


```python
# Import packages
import os
from azure.core.credentials import AzureKeyCredential
from azure.ai.textanalytics import TextAnalyticsClient

# Create a client 
endpoint = os.environ["FOUNDRY_ENDPOINT"]
key = os.environ["FOUNDRY_KEY"]

client = TextAnalyticsClient(endpoint=endpoint, credential=AzureKeyCredential(key))
```

#### Key phrase extraction

```python
text = "I had a fantastic meal at the diner in Seattle on Saturday. The mushroom risotto was perfectly prepared, and really tasty. Our waiter, Pete, was friendly and efficient; and gave us a great recommendation for a dessert (strawberry cheesecake). I'd definitely recommend this place for a casual dinner."

result = client.extract_key_phrases([text])[0]

print("Key phrases:")
for phrase in result.key_phrases:
    print("-", phrase)
```

#### Entity extraction

```python
text = "I had a fantastic meal at the diner in Seattle on Saturday. The mushroom risotto was perfectly prepared, and really tasty. Our waiter, Pete, was friendly and efficient; and gave us a great recommendation for a dessert (strawberry cheesecake). I'd definitely recommend this place for a casual dinner."

result = client.recognize_entities([text])[0]

for entity in result.entities:
    print(f"{entity.text} | category={entity.category} | confidence={entity.confidence_score}")
```

#### Sentiment analysis

```python
text = "I had a fantastic meal at the diner in Seattle on Saturday. The mushroom risotto was perfectly prepared, and really tasty. Our waiter, Pete, was friendly and efficient; and gave us a great recommendation for a dessert (strawberry cheesecake). I'd definitely recommend this place for a casual dinner."

result = client.analyze_sentiment([text])[0]

print("Sentiment:", result.sentiment)
print("Confidence scores:", result.confidence_scores)
```

#### Summarization

In the Python SDK, **extractive summarization** is done as a long‑running action.

```python
from azure.ai.textanalytics import ExtractiveSummaryAction

text = (
    "I had a fantastic meal at the diner in Seattle on Saturday. The mushroom risotto was perfectly prepared, and really tasty. Our waiter, Pete, was friendly and efficient; and gave us a great recommendation for a dessert (strawberry cheesecake). I'd definitely recommend this place for a casual dinner."
)

poller = client.begin_analyze_actions(
    documents=[text],
    actions=[ExtractiveSummaryAction(max_sentence_count=2)]
)

# Wait for the operation to finish and print the summary sentences
for doc_actions in poller.result():
    extractive_results = doc_actions[0]  # first (and only) document
    for action_result in extractive_results:
        if action_result.is_error:
            print("Error:", action_result.code, action_result.message)
        else:
            print("Summary sentences:")
            for sentence in action_result.sentences:
                print("-", sentence.text)
```


- With Foundry and the Azure Language SDK, you can write code for AI applications that process natural language text and generate insight from your documents. 
- Next, let's take a look at how to include Azure Language capabilities in AI agents.

---



# U4: Azure Language MCP

- An AI agent uses tools and models to perform tasks such as reasoning, planning, retrieval, and calling external services. 
- While AI agents can use various generative AI models to perform language-related tasks, you can create an *agent that uses Azure Language in Foundry Tools to ensure consistent and predictable text analysis functionality*.

- The **Azure Language MCP server** in Foundry Tools is a managed service that exposes Azure Language capabilities through the **Model Context Protocol (MCP)** so that AI agents can use advanced language processing tools without custom integration work.
- A **MCP server** gives an agent access to tools, data, or actions that the agent can't do on its own. 
- The agent can make a request to the MCP server. The MCP server might respond by:
	- Providing _data_ (for example: files, records, or analytics)
	- Taking _action_ (for example: sending an email)

- You can access the Azure Language MCP server and other Foundry Tools in the _new_ Foundry portal.
[![Screenshot of the Azure Language MCP server description page in the new Foundry portal.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-text-analysis-azure/media/azure-language-mcp-details.png)](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-text-analysis-azure/media/azure-language-mcp-details.png#lightbox)


- You can start out in the _new_ Foundry portal by deploying a model and saving it in the Foundry playground as an agent.
[![Screenshot of the agent in the Foundry playground.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-text-analysis-azure/media/agent-playground.png)](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-text-analysis-azure/media/agent-playground.png#lightbox)

 - `Note`
	- A **Foundry resource** provides a unified environment that *already includes access to Language tools*. 
		- You do not need to create a separate Azure Language resource to access the Azure Language MCP server.


- You can add tools, such as **Azure Language in Foundry Tools**, to your agent in the Foundry playground.
[![Screenshot of the tool browser open in the playground and the Azure Language in Foundry Tools selected.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-text-analysis-azure/media/add-tool-to-agent.png)](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-text-analysis-azure/media/add-tool-to-agent.png#lightbox)

- To connect to the Azure Language MCP server, you need to configure your connection with your _Foundry resource name_. 
- Once you've connected the MCP server to an agent as a tool, you can use prompts to instruct the agent to use the tool to analyze text.
- The ability to use Azure Language as a tool in an agent helps you build agentic solutions that make sense of text documents.

[![Screenshot of Azure Language in Foundry Tools used in the Foundry playground.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-text-analysis-azure/media/language-agent-response.png)](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-text-analysis-azure/media/language-agent-response.png#lightbox)