
# U1: Introduction

- In this module, you’ll be introduced to some of the features and tools you can use to help with governance of your Azure environment. 
- You’ll also learn about tools you can use to help keep resources in compliance with corporate or regulatory requirements.

## Learning objectives

- After completing this module, you’ll be able to:
	- [ ] Describe the purpose of **Microsoft Purview**
	- [ ] Describe the purpose of **Azure Policy**
	- [ ] Describe the purpose of **resource locks**
	- [ ] Describe the purpose of the **Service Trust portal**


---


# U2: Describe the Purpose of Microsoft Purview

> #Microsoft_Purview is a suite of solutions for **data governance, risk, and compliance**, providing a unified view of your data across on-premises, multicloud, and SaaS environments.

- Key capabilities include:
	- **Automated data discovery**
	- **Sensitive data classification**
	- **End-to-end data lineage**

- Purview is divided into two main solution areas:
  
![Illustration showing the main areas for Microsoft Purview.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-features-tools-azure-for-governance-compliance/media/purview-solution-areas-ceb1bedf-6bf29907.png)

## Microsoft Purview Risk and Compliance Solutions

- Monitors **Microsoft 365** services (Teams, OneDrive, Exchange) to help organizations:
	- **Protect sensitive data** across clouds, apps, and devices.
	- **Identify data risks** and manage regulatory compliance.

## Unified Data Governance

- Provides robust solutions to manage data stored in Azure, SQL, Hive databases, on-premises, and other clouds (e.g., Amazon S3). This enables organizations to:
	- Create an **up-to-date map of the data estate** with classification and lineage.
	- **Identify sensitive data locations**.
	- Create a **secure environment** for data consumers to find valuable data.
	- Generate **insights** into data storage and usage.
	- **Manage data access** securely and at scale.

---


# U3: Describe the Purpose of Azure Policy

> **Azure Policy** is a service that **enforces rules** *across resource configurations* to ensure *compliance with corporate standards and audit resources.*

## How Azure Policy Works:

*   **Policies and Initiatives**: Create individual policies or group related policies into **initiatives**.
*   **Evaluation**: Evaluates resources and highlights non-compliant ones, or prevents their creation.
*   **Scope and Inheritance**: Policies can be set at various levels (**resource, resource group, subscription**) and are `inherited by child resources.`
*   **Built-in Definitions**: Includes `pre-defined policies and initiatives` for Storage, Networking, Compute, Security Center, and Monitoring.
*   **Remediation**: `Can automatically remediate non-compliant resources` (e.g., applying missing tags), with options for exceptions.
*   **Integration**: Integrates with Azure DevOps for CI/CD pipeline policies.

## Azure Policy Initiatives:

>An **initiative** is a *collection of related policy definitions* to track compliance for a larger goal.

### Example: "Enable Monitoring in Azure Security Center" Initiative

- This initiative aims to monitor security recommendations for all Azure resource types. It includes policy definitions such as:
	- Monitor unencrypted SQL Database.
	- Monitor OS vulnerabilities.
	- Monitor missing Endpoint Protection.
- This initiative contains over 100 separate policy definitions.

---


# U4: Describe the Purpose of Resource Locks

> **Resource locks** prevent accidental **deletion or modification** of Azure resources, even for users with appropriate Azure RBAC permissions.

- They can be applied to individual resources, resource groups, or entire subscriptions and are **inherited** by child resources.

## Types of Resource Locks:

1.  **Delete**: Authorized users can read and modify the resource, but **cannot delete** it.
2.  **ReadOnly**: Authorized users can **only read** the resource; they cannot delete or update it. This is similar to the Reader role permissions, **e.g.**:
	- A ReadOnly resource lock on an `Azure Storage account` **prevents all control plane modifications, including creating containers.** 
	- Critically, it **also** **blocks data plane operations that require POST, PUT, or DELETE, such as uploading, updating, or deleting blobs**

## Managing Resource Locks:

- Resource locks can be managed through:
	- Azure portal
	- PowerShell
	- Azure CLI
	- Azure Resource Manager templates

To manage locks in the Azure portal, navigate to the **Locks** section within a resource's Settings pane.


![A screenshot showing the resource lock control, under settings, for a storage account.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-features-tools-azure-for-governance-compliance/media/resource-lock-54695e43-61c37c58.png)


## Deleting or Changing a Locked Resource:

To modify a locked resource, you must **first remove the lock**. Even users with Owner permissions must remove the lock before performing blocked activities.

---



# U5: Describe the Purpose of the Microsoft Service Trust Portal

-  The **Microsoft Service Trust Portal** *provides access to information, tools, and resources* regarding *Microsoft's security, privacy, and compliance practices for its cloud services*.

## Key Features:

-   **Access to Content**: Offers details on Microsoft's implementation of controls and processes for protecting cloud services and customer data.
-   **Authenticated Access**: Some resources require signing in with a Microsoft cloud services account and accepting a Non-Disclosure Agreement (NDA) for compliance materials.
-   **Navigation**: Features include:
    -   **Service Trust Portal**: Returns to the home page.
    -   **My Library**: Save (pin) documents for quick access and receive update notifications.
    -   **All Documents**: A central location to browse and pin documents to My Library.

## Access Information:

-   The portal is accessible at [https://servicetrust.microsoft.com/](https://servicetrust.microsoft.com/).

![Screenshot of the service trust portal with the main menu items visible.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-features-tools-azure-for-governance-compliance/media/service-trust-portal-f7b27e61-b5ad84d7.png)

- Reports and documents are available for download for at least **12 months** after publishing or until a new version is released.
