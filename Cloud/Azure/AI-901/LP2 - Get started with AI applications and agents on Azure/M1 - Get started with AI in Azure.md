
# U1: Introduction

## What artificial intelligence means in applications
- Artificial Intelligence refers to systems designed to perform tasks that normally require human intelligence, including reasoning, perception, problem‑solving, and understanding language. 
- An AI application is any software solution that uses these capabilities—such as computer vision, speech processing, or information extraction—to interpret inputs and produce adaptive, context‑aware outputs. 
- Unlike traditional programs that follow fixed rules, AI applications learn patterns from data and apply that learning to new situations.

## How AI applications work
- AI systems rely on **machine learning models**, which are mathematical constructs trained to recognize patterns and make predictions. 
- During training, models learn from large datasets; during inference, they apply what they learned to new inputs. 
- AI applications are:
	- **Model‑powered**, use trained models to generate text, classify images, detect anomalies, or make decisions.
	- **Dynamic**, improve over time through retraining, fine‑tuning, or updated data.

## Examples across industries
AI applications support a wide range of real‑world scenarios:

- **Healthcare**: Diagnostic tools that analyze X‑rays or MRIs to help detect diseases more accurately and quickly.
- **Finance**: Fraud detection systems that monitor transactions in real time and flag suspicious activity.
- **Retail**: Recommendation engines that analyze customer behavior to personalize product suggestions.
- **Manufacturing**: Predictive maintenance systems that forecast equipment failures to reduce downtime.
- **Education**: Intelligent tutoring systems that adapt to each learner’s pace and provide personalized feedback.

## Building AI applications with Microsoft technologies
- Modern AI applications require more than just a model. 
	- They depend on secure infrastructure, networking, data storage, application logic, and user interfaces.
- Microsoft provides the cloud services and tooling needed to support enterprise‑scale AI development, including:
	- Secure hosting environments
	- Scalable compute for training and inference
	- Data platforms for storing and managing training data
	- Integration with Microsoft Foundry for rapid development and deployment
- This module introduces how Azure streamlines the process of building, deploying, and scaling AI applications while maintaining security and operational reliability.
- A natural next step is exploring how these foundational concepts connect to the specific AI workloads you’ve been studying, such as computer vision and information extraction.
---

# U3: Developing AI apps on Azure

## Overview
- Modern AI applications depend on far more than just a model. 
- They require secure identity, protected secrets, reliable networking, scalable hosting, robust data storage, and enterprise‑grade AI capabilities. 
- Azure provides all of these building blocks so you can develop AI applications quickly, securely, and at global scale.

## Security and networking
Security is the foundation of every AI solution. Azure is secure by design, offering built‑in identity, access control, and network isolation.

### Identity and access
- **Azure Entra ID** ensures only authorized users and services can access your AI resources.
- **Role‑based access control (RBAC)** limits who can deploy models, access data, or modify infrastructure.

### Secret protection
- AI applications often rely on sensitive values such as:
	- API keys  
	- Database connection strings  
	- OAuth tokens  
	- Passwords  
- These secrets are stored in **Azure Key Vault**, not in code or repositories. Applications retrieve them securely at runtime using managed identities.

### Example workflow
- Your AI chatbot calls a model endpoint.
- The request includes a key for authentication.
- The key is stored securely in Key Vault.
- Your application retrieves it using a managed identity.

Azure’s security ecosystem covers identity, secrets, data protection, compliance, threat detection, monitoring, and firewalls. Networking services ensure your application runs reliably across cloud and hybrid environments.

## Hosting and scaling
- Applications run on compute environments known as **hosts**. 
- In Azure, these hosts can be virtual machines or managed platforms.

### Hosting options
- **Azure Kubernetes Service (AKS)**  
    Orchestrates containerized workloads at scale.
- **Azure App Service**  
    Hosts web apps, APIs, and background jobs without managing servers.

### Scaling
Scaling adjusts compute resources based on demand.

- **Scale out (horizontal):** Add more instances.
- **Scale up (vertical):** Increase CPU or memory on an existing instance.

Azure can scale automatically based on CPU usage, request volume, or custom metrics.

## Data storage
AI applications rely on many types of data, including:
- Training data  
- Inference inputs  
- Model outputs  
- Application state  
- Configuration data  
- Logs and telemetry  
- Security and access data  

Azure provides multiple storage options:
- **Azure SQL Database** for mission‑critical workloads  
- **Azure Cosmos DB** for globally distributed, real‑time data  
- **Azure Database for PostgreSQL** for scalable relational workloads  

Storage ensures your AI system has a persistent, reliable place to keep information for learning, personalization, analytics, and debugging.

## AI capabilities
To bring AI agents to life, Azure integrates with **Microsoft Foundry**, an enterprise‑grade platform for developing and operating AI agents securely.

Administrators can manage all cloud resources through:
- Azure portal  
- Shell scripting  
- Infrastructure‑as‑code templates  

Azure’s broad ecosystem ensures you can meet any organizational requirement for security, infrastructure, or data platforms while delivering powerful AI solutions.

---


# U4: Microsoft Foundry for AI

- **Microsoft Foundry** is a unified, enterprise-grade *platform-as-a-service (PaaS)* for *building, deploying, and managing AI applications and agents*.
- It consolidates *models, agent orchestration, monitoring, and governance tools* in one platform, offering production-grade infrastructure and security.
- Foundry offers powerful capabilities for developers, including the ability to choose from a wide range of **models**, use those models to build **agents**, connect those agents to **tools**, and integrate **knowledge** by using **Foundry IQ**, `the centralized connection point for data sources.`
- The assets for your AI solution are organized within a **project**.
	- Each project is contained within a **Foundry resource**, which `provides model hosting and the services your apps and agents need in Azure.`

![Screenshot of elements within Foundry including icons for models, tools, agents, tools, and knowledge.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-with-ai-in-azure/media/foundry-elements.png)

#### Models

- Foundry supports thousands of models—including rich first-party, third-party, and open-source options—directly from its unified **model catalog**.
- Developers can access Azure-hosted OpenAI models such as the latest **GPT‑5 family** (GPT‑5, GPT‑5-mini, GPT‑5-nano, GPT‑5-chat/5.2-chat) with extensive multimodal and reasoning capabilities, alongside specialist models from Anthropic (e.g., Claude Opus 4.6/4.5, Sonnet), Mistral, Cohere, Meta LLaMA, DeepSeek, xAI’s Grok, Black Forest Labs, and gated (enterprise-governed) Hugging Face models.
- Users can browse thousands of models—ranging from massive foundation models to lightweight, domain-specific variants—`evaluate them via built-in leaderboards and playgrounds`, and manage deployments directly in Foundry.
- Full lifecycle support enables deployment per region, customizable deployment types (standard, provisioned, batch), version control, and governance support with Responsible AI and content safety.

#### Agents

- At the core of Microsoft Foundry is an agent‑first approach that lets developers build intelligent, task‑oriented agents directly within their Foundry projects.
- These` agents can reason over inputs, call tools, interact with data, and automate workflows` using the platform’s built‑in orchestration. 
- Foundry handles the underlying coordination—including message threading, tool execution, safety controls, and observability—so developers can focus on designing the agent’s goals and capabilities. 
- Using either low‑code or code‑first workflows, teams can create multi‑agent systems that work with project resources such as documents, datasets, search indexes, and connections to external systems, including integrations like Azure Functions or Microsoft Fabric.

#### Tools

- Foundry offers a comprehensive suite of Azure services—such as speech, vision, language, document intelligence, and more.
- These Foundry Tools provide AI capabilities that can be built into web or mobile applications in a way that's straightforward to implement.
- There're over a dozen different services that can be used separately or together to add AI power to applications. 
	- For example, you could use Azure Vision to analyze images, Azure Language to summarize text, classify information, or extract key phrases, and Azure Speech to convert speech to text and text to speech.

#### Knowledge

- Foundry IQ provides a permission‑aware, multi‑source knowledge layer that gives agents accurate, grounded answers using an organization’s own data.
- It lets you create a configurable knowledge base made up of internal and external knowledge sources—such as Azure Blob Storage, SharePoint, OneLake, or public web data—and automatically handles indexing, document chunking, vector embeddings, and metadata extraction.
- When an agent queries the knowledge base, Foundry IQ uses agentic retrieval to break the question into subqueries, search multiple sources in parallel, and return relevant, citation‑backed information while enforcing user permissions and Microsoft Purview sensitivity labels. 
- This ensures that agents can draw from trusted, up‑to‑date content and only return information the user is authorized to see, providing a reliable knowledge foundation for enterprise AI workflows.


## Foundry resources and projects

- To get started with Foundry, you need to create a **Foundry resource**, which provides model hosting and the services your apps and agents need. 
- You can `create a Foundry resource in` the **Azure portal**, **Foundry portal**, or **programmatically with scripting**.
- A Foundry resource is the _Azure resource_ that provides the platform capabilities.
- A Foundry resource provides access to:
	- Models (Microsoft, partner, and OpenAI‑compatible)
	- Foundry’s agent service
	- Deployment governance
	- Monitoring & observability
	- Security boundaries
	- Quotas and operational controls

- A **Foundry project** is a _workspace_ inside that resource where you build AI apps, agents, and evaluations. 
- A Foundry Project lets you build and manage:
	- Agents
	- Evaluations
	- Files and datasets
	- Vector indexes
	- Flows (AI logic)
	- Connections
	- Project‑specific settings

> `NOTE:` You might have one Foundry resource for a team or department, and many Foundry projects inside it, each focused on a separate AI use case.



## Foundry portal

- The Foundry portal provides a modern `web-based interface for developing, testing, and operating AI solutions`. 
- This is where you'll spend a lot of your time when working with models, agents, and other assets.

![Screenshot of Foundry main page.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-with-ai-in-azure/media/new-portal-1.png)

Foundry portal has a _classic_ user interface (UI) and a _new_ user interface. The two provide slightly different experiences for users. Choose the _new_ portal for a seamless experience that combines simplicity with powerful and secure tools to build, manage and grow multi-agent applications. Only Foundry projects are visible here - use _classic_ for all other resource types. Users can toggle back and forth between the classic and new interfaces as needed.

In the _new_ Foundry portal you can discover models and tools, build agents, manage the operation of those agents, and much more. At any time, you can get help with **Ask AI** agent helper. The _Ask AI_ experience uses specialized sub‑agents to answer questions and help with tasks across Microsoft Foundry. It can guide you through documentation, explain model catalog capabilities, troubleshoot issues, and manage model deployments, quotas, and operations. It also compares and analyzes models, interprets monitoring dashboards, and supports end‑to‑end evaluation workflows for language models and agents.

![Screenshot of Foundry Docs page with the agent helper open.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-with-ai-in-azure/media/foundry-docs-page.png)

#### Using Foundry portal for application development

- When you're building applications on Azure, Foundry provides a powerful and versatile platform for development.
- A general name for applications (that may or may not have AI capabilities) is **client applications**.
- A client application is a program that a user interacts with on their device (like a phone, laptop, or browser) that sends requests to a server and displays the results.

Consider the following workflow for using Foundry portal to develop an AI application:

1. Sign into Foundry portal using your Azure subscription and create a Foundry project.
2. In Foundry, pick a model from the Model Catalog and deploy it. ![Screenshot of a selected model.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-with-ai-in-azure/media/example-selected-model.png)
3. In Foundry, experiment with the model in the Playground. You can use the Playground to write prompts, test model responses, configure parameters. ![Screenshot of the model in the Foundry playground.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-with-ai-in-azure/media/example-model-playground.png)
4. Use the configured model in your own client application.

- An AI client application utilizes a model, data, and application logic to process and return results. 
- The app logic is the code or workflow that sends requests to the model, receives the response, and processes and transforms results. 
- The entire process is known as a **client–server** interaction. 
- A client-server system provides the foundation for how users interact with AI systems, how requests are processed, and how results are delivered.

- Responsibilities of the **client**:
	1. Present a UI or CLI
	2. Collect user input (text, voice, images)
	3. Format the input into a prompt or API request
	4. Send a request to the server (model endpoint)
	5. Display the returned output

- The client requests the model for results, which is hosted by the **server**, or the _back end_.
- In Foundry, the server is your **model deployment**.
- Responsibilities of the **server**:
	1. Receive the prompt
	2. Run inference on the model
	3. Apply system instructions, safety, context, and more
	4. Return the generated output (for example: text, image, audio, or structured JSON)

Next, let's take a look at how clients connect to to Foundry models and how to use Foundry endpoints.

---



# U5: Using Microsoft Foundry endpoints


- In Foundry, you can define the models and agents that you want to use in custom AI applications. 
- Since Foundry resources are cloud-based, you can consume them as _Application Programming Interfaces_ (APIs) across internet connections through programmatic interfaces.
- An API is a set of rules that allows one application to talk to another application or service. An API defines what requests you can make, what data you get back, and how to format your request.

## Understand endpoints

- Like most cloud services, Microsoft Foundry resources are accessed through an **API endpoint**, representing a service entry point. 
- The endpoint has a unique HTTP address, like a website, but it's for client application code rather than human users with a web browser. 
- When you view the endpoint for your model, it looks something like:
	`https://<foundry-project>-resource.cognitiveservices.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-05-01-preview`

- The interfaces provided at the endpoint are known as _Representational State Transfer Interfaces_, or _REST interfaces_ for short.
- To keep your Foundry resources secure, the endpoint is protected.
- Applications can only access it if they present the correct API key or a token confirming that your Microsoft Entra ID credentials are valid. 
- **The model endpoint and key can be found in the Foundry Playground's details page.**

![Screenshot of the model endpoint and key in the Foundry Playground's details page.](https://learn.microsoft.com/en-us/training/wwl-data-ai/get-started-with-ai-in-azure/media/example-model-details.png)

- Two common types of endpoints in Foundry include:
	- _Project-level endpoints_: for working with your Foundry project and its resources
	- _Model endpoints_: for sending prompts to deployed models

## Using endpoints

- Applications communicate with the endpoint by sending REST requests.
- REST requests consist of headers containing metadata, such as authentication and data format information, and a body consisting of data in JSON format. 
- For example, a request might include a prompt entered by a user in a chat application such as "What is an AI application?".

```bash
curl -X POST https://YOUR-FOUNDRY-RESOURCE-NAME.services.ai.azure.com/api/projects/YOUR-PROJECT-NAME/openai/responses?api-version=2025-11-15-preview \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $AUTH_TOKEN" \
-d '{
        "model": "gpt-4.1-mini",
        "input": "What is an AI application?"
}'
```

- The results of the request are returned as a response, also with headers and a body. 
- For example, the response might include the reply generated by a model from the prompt. 
- The response comes back in a JSON format. A section of that JSON may look like the following:

```json
{
    "metadata": {},
    "temperature": 1,
    "model": "gpt-4.1-mini",
    "object": "response",
    "status": "completed",
    "output": [
        {
            "type": "message",
            "status": "completed",
            "role": "assistant",
            "content": [
                {
                    "type": "output_text",
                    "text": "An AI application is a software program or system that utilizes artificial intelligence technologies to perform tasks that typically require human intelligence. These tasks can include recognizing speech, understanding natural language, making decisions, learning from data, recognizing images, and solving complex problems. AI applications are used in various fields such as healthcare, finance, customer service, autonomous vehicles, and more to enhance efficiency, accuracy, and user experience."
                }
            ]
        }
    ]
}
```

- While developers can write code that works directly with the REST interfaces, most developers prefer to work with **software development kits (SDKs)** that abstract the REST interfaces with code libraries for their preferred programming language, such as Python, JavaScript, or C#. These language-specific helpers build REST calls for you.
- The endpoint for your Foundry resources is the central point of service for client applications, enabling you to build custom solutions that are backed by the security, scalability, and reliability of the Azure Cloud Platform.

---


# U6: Exercise - Get started with Microsoft Foundry


## Create a Foundry project
- Access Foundry at https://ai.azure.com.
- Create a new project with:
    - Foundry resource name
    - Azure subscription
    - Resource group
    - Region (recommended Foundry regions)
- After creation, the project opens in the Foundry portal.

## Foundry projects as Azure resources
- Projects appear as **child resources** under a parent Foundry resource in Azure.
- You can view these relationships in **Azure Resource Visualizer**.
- Foundry projects follow Azure governance and security policies. 

## Explore the Foundry portal
### Home page
- Shows:
    - Project API key
    - Project endpoint
    - Azure OpenAI endpoint  

### Discover page
- Browse available models and services.
- Provides starting points for AI development.

### Build page
- Core development area for AI solutions.
- Capabilities:
    - Manage agents & workflows
    - Manage models
    - Fine‑tune base models
    - Add/configure tools
    - Manage knowledge sources (Foundry IQ)
    - Manage data indexes
    - Create evaluations
    - Define guardrails  

### Operate page
- Manage deployed AI solutions:
    - Assets (agents, models, tools)
    - Compliance & security
    - Quotas
    - Admin tasks  

### Docs page
- Access Foundry documentation.


## Deploy a model
- Use the Discover → Models tab to browse catalog.
- Deploy a model (e.g., gpt‑4.1‑mini).
- After deployment:
    - Opens model playground
    - You can chat with the model
    - Remember the deployment name for later use

## Use your Foundry resource endpoint
- Required values:
    - Project endpoint
    - Project API key
    - Model deployment name  

### Ask Anton app
- Open https://aka.ms/azk-anton.
- Configure with:
    - Project endpoint
    - Project API key
    - Deployment name
- App uses your Foundry model for chat.
- Speech features use Azure Speech via Foundry tools.  

## Summary
- You created and explored a Foundry project.
- Viewed Azure resources backing the project.
- Explored the Foundry portal (Home, Discover, Build, Operate, Docs).
- Deployed a model and used it through a client application.  

---

