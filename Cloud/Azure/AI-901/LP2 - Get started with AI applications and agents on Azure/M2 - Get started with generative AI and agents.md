

# U1: Introduction

- Microsoft offers an ecosystem of tools for AI use and development. 
- This module explores the Foundry model catalog and how to **discover, evaluate, and deploy an appropriate model**. 
- Learn how to **test and configure the deployed model** in the **Foundry playground**, and call it from code using the OpenAI‑compatible **Responses API.** 
- Finally, you’ll **see how agents encapsulate a model, its instructions, and optional tools** so your solution is reusable and consistent across Playground and code via the Project API.


# U2: Generative AI models

- Large language models (LLMs) form the foundation of generative AI solutions that can provide a wide variety of responses. 
- **Microsoft Foundry** provides an integrated environment for discovering, evaluating, deploying, and operating generative AI models.
	- It brings together a rich model catalog, flexible deployment options, and built‑in governance capabilities so teams can build copilots, agents, and AI-powered applications with enterprise confidence.
- In order to use Microsoft Foundry, you need an Azure subscription. 
- To utilize Foundry's capabilities, start by creating a project in Foundry. For more information, review [Get started in Microsoft Foundry](https://learn.microsoft.com/en-us/training/modules/get-started-ai-in-foundry/).

## Discover models in Foundry's model catalog

- **Foundry's model catalog** is a central hub for discovering and using a wide selection of generative AI models from an extensive range of providers.
- In Foundry, you can filter models by source, capabilities, inference tasks, and more.
- Foundry enables you to understand and compare model capabilities, as well as test and build scalable, secure, responsible AI solutions.

![Screenshot of Foundry's model catalog with the new UI.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-with-generative-ai-and-agents/media/model-catalog-1.png)

- The model catalog offers a broad selection of models including models sold directly by Azure alongside models from partners and open-source communities.
	- **Models Sold Directly by Azure**:
		- These models are hosted by Microsoft under Microsoft Product Terms. 
		- They offer high levels of integration with Azure, enterprise-grade service level agreements (SLAs), preconfigured security, and compliance alignment.
	- **Models from Partners and the Community**: 
		- Includes open-source or vendor-hosted models integrated through the catalog. 
		- These models support broader experimentation and rapid innovation and are often suitable for specialized or domain‑specific tasks.

- Each model entry typically includes:
	- Model descriptions and capabilities (text generation, reasoning, coding, multimodal, embeddings, etc.)
	- Benchmark results and performance comparisons
	- Supported inference tasks and fine‑tuning options
	- Responsible AI documentation (model cards, constraints, caveats)

![Screenshot of Foundry's model entries with gpt-4.1 as an example.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-with-generative-ai-and-agents/media/gpt-4-model-details.png)

#### Commonly used model families

- Among the thousand-plus models available in Foundry, there are many grouped by **model family**.
	- A model family refers to a group of related models that share the same underlying architecture or lineage, but differ in size, capability, specialization, or version.

- Commonly used model families include:
	- **GPT‑5.x** (OpenAI)
	- **Claude Opus 4.5** (Anthropic)
	- **Mistral Large 3** (Mistral AI)

> In Foundry, **foundation models** are *large, pretrained models—such as GPT, Claude, Mistral, and others—that provide general language, reasoning, or multimodal capabilities out of the box.* 
	-These models can be deployed immediately or customized through fine‑tuning, and serve as the base layer for building AI applications.


## Evaluate models in Foundry

Choosing the right model in Foundry starts with understanding **your workload, task type, and constraints**.

#### Select a model by task type

|**Task**|**Recommended model types**|**Model details**|
|---|---|---|
|**Chat**|GPT‑5.x chat, Claude Sonnet/Opus, Mistral‑Large‑3, DeepSeek V3.1, small language models (SLMs) like Phi‑4 or Llama|Strong reasoning, conversation tuning, safety|
|**Coding**|GPT‑5.1‑codex, Claude‑Sonnet|Support for complex agent flows|
|**Summarization**|GPT‑5.x reasoning models, Claude Opus/Sonnet|Long-context, high-quality compression|
|**Embeddings**|text‑embedding‑3-small or other embedding models|Built for semantic vector representations|
|**Multimodal**|Phi‑4‑multimodal‑instruct, GPT‑5.x chat multimodal, Mistral‑Large‑3|Support for images, audio, and video in chat completions|
|**Industry or domain-specific**|Domain-tuned models in the catalog|Applications specific to an industry such as finance, healthcare, legal|


- When the use case is well‑defined, instead of choosing a model from the model catalog, you may choose a [**Foundry tool**](https://azure.microsoft.com/products/ai-foundry/tools/?msockid=2bbfe2e7589c63f40fd5f7ea5c9c654c#Tools). 
	- **Foundry tools** are *powered by prebuilt models that provide predictable performance, built‑in compliance, and fast time‑to‑value without custom modeling*.


#### Score and compare models in Foundry

- Foundry's model catalog includes benchmarking results that show how models perform on standard datasets.
	- Benchmark scores simplify model selection by using consistent evaluation criteria.
- Through the Foundry portal, you can also view:
	- **Model leaderboards**: leaderboards rank models based on attributes like quality, safety, and throughput. 
		- This helps identify the best model for a task. Examples of tasks include reasoning, summarization, code generation.
	- **Comparisons and filters**: Side‑by‑side model comparison by quality and accuracy, cost, security and compliance, and performance metrics. 
		- You can filter by industry, use case, model type, licensing, and more.

![Screenshot of Foundry's model leaderboard and side-by-side comparisons.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-with-generative-ai-and-agents/media/model-leaderboard.png)

- A common way you can evaluate is to start in Foundry's model catalog, choose a model, then select _Benchmarks → Try with your own data_.
	- You can try out prompts and see if the responses are as expected.
- There are various ways to score a model in Foundry portal, including _Natural Language Processing (NLP) metrics_ and _AI‑assisted quality metrics_. 
	- Examples of classic _NLP quality metrics_ are: accuracy, precision, recall, and F1. 
	- Examples of _AI‑assisted metrics_ include groundedness, relevance, coherence and fluency, and GPT similarity. Choose AI-assisted metrics for qualitative scoring beyond traditional metrics.

- In Foundry, **evaluators** are components used to measure the quality, safety, and effectiveness of AI model or agent outputs.
	- For example, safety evaluators can be used help ensure responsible AI output. 
		- They scan for harmful or unsafe content, bias and unfairness, violence, self‑harm, or protected‑class harms. 
	- Foundry's Evaluator Library offers reusable evaluators for quality scoring, safety scanning, and more.
	- On their own, Foundry's evaluators detect, scan, and score issues but do not actively resolve them.


## Deploy models in Foundry

- Once you select a model, Foundry provides flexible deployment mechanisms that let you tailor performance, cost, and governance. 
- **Deploying a model** takes an AI model and makes it available for use in production through a stable, scalable, and secure endpoint. 
- Deployment of a configured model turns the model into a service that applications can call—usually through an API.
- Deploying a configured model helps ensure consistent performance and reliability. It also allows developers to prevent unauthorized or unsafe use.

- Deployment parameters that you can customize in Foundry include:
	- **Deployment type**: such as standard, global batch, and regional provisioned throughput, determine where and how inference is processed in Foundry. 
		- Deployment types are tied to throughput and data‑processing requirements.
	- **Model version**
	- **Tokens per minute (TPM)** rate limit

- `NOTE:` A **token** is the smallest unit of text or data that a generative AI model can process. Models break input into tokens—such as words, subwords, characters, or punctuation—so they can understand and generate language efficiently.

- When you deploy a model, you can assign it a _Tokens Per Minute_ (TPM) allocation. 
	- TPM determines the speed and scale the model can process inputs and the rate‑limit boundaries such as requests per minute (RPM). When you assign a higher TPM allocation to a model deployment, you're increasing its capacity to handle token traffic per minute. Lower TPM reduces how fast your deployment is allowed to consume tokens across requests.

- Limits differ by model family, for example:
	- High‑end reasoning models (for example: DeepSeek R1, Grok, large Llama versions) may have high TPM ceilings.
	- Specialized or image models often operate under capacity units instead of TPM.

- _Throttling_, in a compute context, means intentionally slowing down or limiting how much compute work can happen at one time. 
	- It's a protective mechanism used when a system is close to hitting its processing limits. 
	- Throttling temporarily restricts resource usage so the system can remain stable and responsive.

- **Deployment‑level quotas** define *how many tokens or requests can be processed before throttling occurs.* 
	- Larger prompts and higher max output token settings consume more TPM, leading to rate-limit errors if exceeded (covered in throttling description search results). 
	- If you see throttling, lower **max tokens** or reduce concurrent requests in code.


- When you deploy a model in Foundry, several things occur:
	- **Compute resources are allocated**: Foundry assigns the hardware needed to run the model—CPUs, GPUs, memory, networking, and scaling rules.
	- **An API endpoint is created:** You're able to securely invoke the model through the OpenAI Responses API, validated through management API checks.
	- **Configuration** (such as model version, response style, safety settings) is locked in
	- **Monitoring and logging become active:** usage metrics, performance, latency, errors, and costs are tracked

---



# U3: Using a generative AI model

- The easiest way to interact with a deployed model is to use the model playground in the Foundry portal. 
- You can use the **Foundry Playgrounds** to *try prompts, compare models, and capture working settings* before you write any code.

![Screenshot of the Foundry playgrounds.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-with-generative-ai-and-agents/media/model-playground-example.png)

## Key configuration parameters

- Several _model arguments_ or _parameters_ influence runtime behavior, performance, and cost. 
- In the playground settings, you can configure parameters such as **temperature**, **max output tokens**, and **system instructions**

### Temperature
- controls creativity vs. determinism.
### Max output tokens
- caps response length; affects token consumption and throttling behavior.
### System instructions
- sets behavior and role of the model.
- Unlike the user prompt, which is the end-user request or question (example: Where should I travel?), a **System prompt** sets behavior, tone, tools, and guardrails for the assistant. 
	- An example of a system prompt is: "You are a helpful, step‑by‑step tutor. Cite sources. Decline medical advice."



- After you test representative prompts, you can use the same system and user prompts and parameter values in your code. 
- The playground provides code that can call your Foundry deployment via the OpenAI‑compatible _Responses_ API. 
	- The code is essentially what is running when you use the chat interface to configure settings and send user prompts.
	- You can take the code as a starting point for creating your own chat client.

![Screenshot of code example in Foundry portal that is based in the playground.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-with-generative-ai-and-agents/media/chat-code-example.png)



## Create a lightweight chat client by using the Foundry SDK

- A **lightweight client application** is a small, minimal app whose primary job is to **collect user input**, **call a remote service/API**, and **display results**, without heavy UI frameworks, complex backend logic, or large local dependencies. In practice, it typically:
	- Runs as a **CLI (command-line interface)**, small desktop utility, or simple web page.
	- Keeps **state and compute mostly on the server** (the model runs remotely).
	- Has a **small code footprint** and minimal configuration (often just environment variables + a short script).
	- Is easy to prototype, easy to run locally, and easy to extend later.

- For Foundry, a lightweight chat client is often a **single Python file** that connects to a Foundry project endpoint and sends chat messages to a deployed model. 
- The Foundry SDK exposes a **Project client** (Foundry‑native ops) and an **OpenAI‑compatible client** for calling models via the **Responses API**. 
	- Most apps use both.

#### Build a Python chat client

- After you created a **Foundry project** and **deployed a chat model** (for example, `gpt-4.1`), you can use the Foundry SDK.
- In the example, the client application uses authentication to connect to the endpoint for the model, submit a prompt, and display the response.

``` python
# pip install openai>=1.3.0
# pip install azure-ai-projects azure-identity openai

import os
from openai import OpenAI

client = OpenAI(
    base_url=f"{os.environ['AZURE_OPENAI_ENDPOINT']}/openai",
    api_key=os.environ["AZURE_OPENAI_API_KEY"]
)

response = client.responses.create(
    model=os.environ["DEPLOYMENT_NAME"],          # e.g., "gpt-4o-mini"
    input=[{"role": "system", "content": "You're a helpful assistant."},
           {"role": "user", "content": "Summarize the key points from our release notes in 3 bullets."}],
    max_output_tokens=300,
    temperature=0.7
)

print(response.output_text)
```

## Understand the difference between models and agents

- In Microsoft Foundry, **generative AI models** and **agents** are related but serve different purposes. You can think of it this way:
	- **Models = raw intelligence**
	- **Agents = packaged, task‑oriented workers built on top of that intelligence**

- When you use a generative AI model on its own:
	- You want pure inference: "Take this prompt and generate output."
	- You’re experimenting in the Playground
	- You call the model via the **OpenAI Responses API**


---



# U4: Creating an agent

- **Agents** are _applications_ built with generative AI models. 
	- Agentic AI moves beyond one‑off prompts and instead defines a consistent, workflow-like behavior that can be reused across apps, experiences, and services.

- An agent in Microsoft Foundry is a packaged, reusable AI component that brings together three things:
	- **A model**: the generative AI model the agent uses for reasoning (for example, GPT‑4.1)
	- **Instructions**: the system prompt that defines the agent’s role, behavior, style, constraints, and output rules
	- **Tools**: the actions the agent can take

- Agents can:
	- Call external tools (APIs, functions, retrieval) automatically
	- Break goals into structured steps
	- Maintain working memory during a conversation
	- Process user input, decide actions, and generate structured outputs


## Create an agent in Foundry portal

- To create an agent in Foundry, you can start by exploring a model or just go straight to agent development.
- In Foundry portal, creating an agent looks similar at first to testing a model in the playground.
	1. Choose the model your agent uses.
	2. Write the system instructions, such as "You're a helpful scheduling assistant who returns answers in concise bullet points."
- What sets the agent apart from using the model alone is the addition of tools, which allow the model to act on information and knowledge, which grounds the model with information.
	- Tools = _actions_.  
	- Knowledge = _context_.


### Add Tools

- **Tools** in Foundry allow a model to perform actions by calling external systems. 
- They represent **callable capabilities** such as searching the web, querying a database, or using an MCP server.
- When enabled in the model playground, the model can inspect available tools, then call them when relevant to a user request. 
- Examples of tools include:
	- Code Interpreter (data analysis, file handling)
	- Using knowledge sources
	- Custom functions or APIs

- Tools allow the model to:
	- Take real actions (read/write files, search, update systems)
	- Execute workflows
	- Integrate into enterprise systems

- In Foundry, tools form the basis for action-taking agents. 
	- They can be configured centrally using the **Foundry Tool Catalog**, where you can discover and manage tools.

### Add Knowledge

- **Knowledge** allows the model to **access and retrieve external content** (your documents, datasets, internal sites) through `retrieval-augmented generation (RAG).`
- Knowledge in Foundry refers to **documents or datasets** provided to the model so it can retrieve highly relevant context during generation. 
	- Data can include internal PDFs, SharePoint content, Azure Storage files, and multi‑source knowledge bases.

- In the playground, Foundry uses **retrieval pipelines** to:
	1. **Ingest + index** your content
	2. **Search + ground** responses
	3. Make answers more accurate, traceable, and domain‑specific

- Agents rely heavily on knowledge when answering domain-specific questions. 
- When knowledge is used, the response includes a citation for the knowledge store the agent used.
- Knowledge enables:
	- Document-grounded Q&A
	- Context-rich assistance
	- Enterprise-safe retrieval

- In the Foundry portal, you can **save your model, instructions, and tools as an agent.** 
- You can continue to test and refine your agent in the Playground.

![Screenshot of the Foundry portal with the dialog box open to save, name, and create your agent.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-with-generative-ai-and-agents/media/save-create-agent.png)

![Screenshot of the Foundry portal with the agent saved and open in the playground.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-with-generative-ai-and-agents/media/continue-testing-agent.png)


## Using an agent

- You can use an agent from a client application by using the **Foundry Projects SDK** to connect to the project and call it from a client using the **Project API**.
- The Project API enables you to:
	- Integrate agents into web apps, bots, or backend workflows
	- Orchestrate multi‑step tasks
	- Pass structured inputs or tool calls
	- Run agents at scale with your Foundry deployments

### Create a client application for an agent

- To call the agent programmatically using Foundry’s Project API, you need the `agent-id` of your agent.
	- You can find the `agent-id` in the Playground view of the agent when you select the _code_ view and open the _.env variables_.

![Screenshot of the agent id that can be found with the environment variables.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-with-generative-ai-and-agents/media/agent-id.png)



- Let's take a look at a Python code sample to use an agent:

```python
# Before running the sample, install the packages:
#    pip install --pre azure-ai-projects>=2.0.0b1
#    pip install azure-identity

from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

myEndpoint = "https://<resource>.services.ai.azure.com/api/projects/<resource-name>"

project_client = AIProjectClient(
    endpoint=myEndpoint,
    credential=DefaultAzureCredential(),
)

myAgent = "learning-agent"
# Get an existing agent
agent = project_client.agents.get(agent_name=myAgent)
print(f"Retrieved agent: {agent.name}")

openai_client = project_client.get_openai_client()

# Reference the agent to get a response
response = openai_client.responses.create(
    input=[{"role": "user", "content": "Tell me what you can help with."}],
    extra_body={"agent": {"name": agent.name, "type": "agent_reference"}},
)

print(f"Response output: {response.output_text}")

```



### Publishing an agent

- **Publishing** **an agent** *changes it from a saved development asset to a managed Azure resource with a dedicated endpoint*. 
	- A published agent can be shared without exposing the Foundry project or source code. 
	- You can publish an agent through the Foundry portal.

- `NOTE:`
	- You don't need to publish an agent in order to use its endpoint. 
	- However, when you use the unpublished endpoint, you're essentially using the agent as a development asset inside your Foundry project.
	- That is great for iteration, but not ideal for distribution, governance, or stable integrations. 
	- After you publish an agent, your agent gets its own unique endpoint that is different from the Foundry project endpoint.

![Screenshot of publishing agent in the Foundry portal.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-with-generative-ai-and-agents/media/publish-agent.png) ![Screenshot of agent after it is published in the Foundry portal with the endpoint information.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-with-generative-ai-and-agents/media/agent-published.png)

- Publishing an agent gives you a stable endpoint to integrate the agent into applications.