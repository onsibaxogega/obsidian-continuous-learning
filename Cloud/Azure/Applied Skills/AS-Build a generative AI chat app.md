
[Microsoft Applied Skills: Build a generative AI chat app](https://learn.microsoft.com/en-us/credentials/applied-skills/build-a-generative-ai-chat-app/?ns-enrollment-type=Collection&ns-enrollment-id=x3dntptmy0jxrg)

- *1 learning path -> 1 module -> 55 min*
---

**M1 - Develop an AI app with the Microsoft Foundry SDK**


# U1: Introduction

- Developers creating AI solutions with Microsoft Foundry need to work with a combination of services and software frameworks.
	- The Microsoft Foundry SDK is designed to bring together common services and code libraries in an AI project through a central programmatic access point, making it easier for developers to write the code needed to build effective AI apps on Azure.
- In this module, you'll learn how to use the Microsoft Foundry SDK to work with resources in an AI project.
 - `Note:`
	- Microsoft Foundry SDK is currently in *public preview*. Details described in this module are subject to change.

## Learning objectives

- After completing this module, you'll be able to:
	- [ ] Describe capabilities of the Microsoft Foundry SDK.
	- [ ] Use the Microsoft Foundry SDK to work with connections in projects.
	- [ ] Use the Microsoft Foundry SDK to develop an AI chat app.

---



# U2: What is the Microsoft Foundry SDK?

- The **Microsoft Foundry SDK** is a *unified set of client libraries* designed to help *developers build, test, and deploy AI applications and agents* within the Microsoft Foundry platform.

- Microsoft Foundry provides a REST API that you can use to work with AI Foundry projects and the resources they contain. 

- The core package for working with projects is the **Azure AI Projects** library, which *enables you to connect to A Microsoft Foundry project and access the resources defined within it*. 
- Available language-specific packages the for Azure AI Projects library include:
	- [Azure AI Projects for Python](https://pypi.org/project/azure-ai-projects)
	- [Azure AI Projects for Microsoft .NET](https://www.nuget.org/packages/Azure.AI.Projects)
	- [Azure AI Projects for JavaScript](https://www.npmjs.com/package/@azure/ai-projects)

 - `Note:`
	- In this module, we'll use Python code examples for common tasks that a developer may need to perform with Microsoft Foundry projects. 
	- You can refer to the other language-specific SDK documentation to find equivalent code for your preferred language. 
	- Each SDK is developed and maintained independently, so some functionality may be at different stages of implementation for each language.

- To use the `Azure AI Projects` library in `Python`, you can use the **pip** package installation utility to install the **azure-ai-projects** package from PyPi:

```bash
pip install azure-ai-projects
```


## Using the SDK to connect to a project

- The first task in most Microsoft Foundry SDK code is to connect to A Microsoft Foundry project. 
- Each project has a unique _endpoint_, which you can find on the project's **Overview** page in the Microsoft Foundry portal.
[![Screenshot of the project overview page in Microsoft Foundry portal.](https://learn.microsoft.com/en-us/training/wwl-data-ai/ai-foundry-sdk/media/ai-project-overview.png)](https://learn.microsoft.com/en-us/training/wwl-data-ai/ai-foundry-sdk/media/ai-project-overview.png#lightbox)


- The project provides *multiple endpoints and keys*, including:
	- **An endpoint for the project itself**; which can be used to access project connections, agents, and models in the Microsoft Foundry resource.
	- **An endpoint for Azure OpenAI Service APIs** in the project's Microsoft Foundry resource.
	- **An endpoint for Foundry Tools APIs** (such as Azure Vision and Azure Language) in the Microsoft Foundry resource.

- You can use the project endpoint in your code to create an **AIProjectClient** object, which provides a programmatic proxy for the project, as shown in this Python example:


```python
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient
...

project_endpoint = "https://......"
project_client = AIProjectClient(            
    credential=DefaultAzureCredential(),
    endpoint=project_endpoint)
```

 - `Note:`
	- The code uses the **default Azure credentials** to authenticate when accessing the project. To enable this authentication, in addition to the **azure-ai-projects** package, you need to install the **azure-identity** package:

```bash
pip install azure-identity
```


> To access the project successfully, **the code must be run in the context of an authenticated Azure session**
> 	For example, you could use the Azure command-line interface (CLI) `az-login` command to sign in before running the code