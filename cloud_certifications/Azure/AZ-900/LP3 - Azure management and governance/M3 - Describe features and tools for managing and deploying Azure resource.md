

# U1: Introduction

- This module introduces you to features and tools for managing and deploying Azure resources.
- You learn about the Azure portal (a graphic interface for managing Azure resources), the command line, and scripting tools that help deploy or configure resources.
- You also learn about Azure services that help you manage your on-premises and multicloud environments from within Azure.

## Learning objectives

- After completing this module, you’ll be able to:
- [ ] Describe the Azure portal.
- [ ] Describe Azure Cloud Shell, including Azure CLI and Azure PowerShell.
- [ ] Describe the purpose of Azure Arc.
- [ ] Describe Azure Resource Manager (ARM), ARM templates, and Bicep.

---



# U2: Describe Tools for Interacting with Azure

- Azure provides multiple tools to manage its environment, including management groups, subscriptions, resource groups, and resources. The primary tools are:
	1.  **Azure portal**
	2.  **Azure PowerShell**
	3.  **Azure Command Line Interface (CLI)**

## Azure Portal

- A **web-based, unified console** offering a graphical user interface (GUI) for managing Azure subscriptions.
- Allows you to build, manage, and monitor resources, create custom dashboards, and configure accessibility options.
- Designed for **resiliency and continuous availability**, present in every Azure datacenter.

## Azure Cloud Shell

- A **browser-based shell tool** for creating, configuring, and managing Azure resources using a shell.
- Supports both **Azure PowerShell** and **Azure CLI (Bash)**.
- **Features**:
    - No local installation required.
    - Authenticated via Azure credentials.
    - Supports both Azure PowerShell and Azure CLI.
- Accessible via the Azure portal by selecting the Cloud Shell icon.

## Azure PowerShell

- A shell that uses **command-lets (cmdlets)** to call the Azure REST API for management tasks.
- Cmdlets can be run independently or combined to orchestrate complex actions like resource setup, teardown, maintenance, and infrastructure deployment.
- Scripts make processes **repeatable and automatable**.
- Installable on Windows, Linux, and Mac platforms, and available via Azure Cloud Shell.

## Azure CLI
- Functionally **equivalent to Azure PowerShell**, but uses **Bash commands** instead of PowerShell.
- Offers the same benefits for discrete tasks or orchestrating complex operations.
- Installable on Windows, Linux, and Mac platforms, and available via Azure Cloud Shell.
- The choice between Azure PowerShell and Azure CLI often depends on language familiarity.

---



# U3: Describe the Purpose of Azure Arc

> **Azure Arc** simplifies the management of **hybrid and multi-cloud environments** by extending Azure Resource Manager (ARM) capabilities to `non-Azure resources`. 

- It provides a consistent management platform across `on-premises and multiple cloud providers.`

## Key Capabilities:

- Azure Arc enables you to:
	- **Manage your entire environment together** by projecting existing non-Azure resources into ARM.
	- **Manage multi-cloud and hybrid resources** (virtual machines, Kubernetes clusters, databases) as if they were running in Azure.
	- **Utilize familiar Azure services and management capabilities** regardless of resource location.
	- **Integrate traditional ITOps with DevOps practices** for new cloud patterns.
	- **Configure custom locations** on top of Azure Arc-enabled Kubernetes clusters.

## Azure Arc Management Outside of Azure:

Azure Arc currently supports managing the following resource types hosted outside of Azure:

- **Servers**
- **Kubernetes clusters**
- **Azure data services**
- **SQL Server**
- **Virtual machines** (preview)
---



# U4: Describe Azure Resource Manager (ARM) and Azure ARM Templates

> **Azure Resource Manager (ARM)** is the Azure service for deployment and management. It provides a layer to create, update, and delete Azure resources. ARM handles all requests from Azure tools, APIs, and SDKs, ensuring consistent results across all interfaces.

## Azure Resource Manager Benefits:

-   **Declarative Templates**: Manage infrastructure using JSON files that define desired resources.
-   **Group Management**: Deploy, manage, and monitor solution resources collectively.
-   **Consistent Deployments**: Ensure resources are deployed in a consistent state throughout the development lifecycle.
-   **Dependency Management**: Define resource dependencies for correct deployment order.
-   **Integrated Access Control**: RBAC is natively integrated for access control.
-   **Resource Tagging**: Organize resources and clarify billing by grouping them with tags.

## Infrastructure as Code (IaC):

- **IaC** manages infrastructure as code. ARM templates and Bicep are key tools for IaC with ARM.

### ARM Templates:

ARM templates are **declarative JSON files** describing Azure resources.
-   **Verification**: Code is verified before execution, ensuring correct resource creation.
-   **Parallel Deployment**: Resources are created in parallel for faster deployments.
-   **Desired State**: Define the desired state, and the template handles resource setup, including script execution.

#### Benefits of ARM Templates:

-   **Declarative Syntax**: Define what to deploy without writing explicit programming commands.
-   **Repeatable Results**: Deploy infrastructure consistently across development lifecycles.
-   **Orchestration**: ARM manages resource dependencies and parallel deployments for efficiency.
-   **Modular Files**: Break down templates into smaller, reusable, and nestable components.
-   **Extensibility**: Add PowerShell or Bash scripts for advanced resource setup and end-to-end environment configuration within a single template.


### Bicep

- **Bicep** is a **declarative language** for deploying Azure resources, offering a simpler and more concise syntax than ARM JSON templates.
- A Bicep file defines your infrastructure, and ARM deploys the environment based on it.

#### Benefits of Bicep:

1.  **Support for All Resource Types and API Versions**: Immediately supports all preview and GA versions of Azure services as soon as they are available from resource providers.
2.  **Simple Syntax**: More concise and easier to read than equivalent JSON templates. Requires no prior programming knowledge. Declarative syntax specifies desired resources and properties.
3.  **Repeatable Results**: **Idempotent** files ensure consistent resource deployment. Deploying the same file multiple times results in the same resource state.
4.  **Orchestration**: Resource Manager orchestrates the deployment of interdependent resources in the correct order and in parallel for faster deployments.
5.  **Modularity**: Use **modules** to break Bicep code into manageable, reusable parts for simpler development and code reuse.

