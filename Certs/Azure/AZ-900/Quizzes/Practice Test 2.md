> [!question] 1. Which of the following best defines "Cloud computing" in the context of Azure?
> a) A dedicated on-premises hardware environment for enterprise applications.
> b) The delivery of computing and IT services over the internet.
> c) A mandatory long-term contract for renting physical servers.
> d) A software platform limited to virtual machine hosting.
>> [!success]- Answer
>> b) The delivery of computing and IT services over the internet.

> [!question] 2. In an Infrastructure as a Service (IaaS) model, which party is responsible for operating system installation, configuration, and maintenance?
> a) The cloud provider (Microsoft)
> b) The customer (You)
> c) It is a shared responsibility managed automatically by Azure Policy.
> d) The hardware vendor
>> [!success]- Answer
>> b) The customer (You)

> [!question] 3. Select all that apply: Which of the following are valid reasons an organization might adopt a Multi-cloud strategy?
> a) To avoid all capital expenditures (CapEx).
> b) To use different specialized features from different cloud providers.
> c) To maintain fault tolerance if one cloud platform becomes completely unavailable.
> d) To transition during a migration from one provider to another.
>> [!success]- Answer
>> b) To use different specialized features from different cloud providers, c) To maintain fault tolerance if one cloud platform becomes completely unavailable, d) To transition during a migration from one provider to another.

> [!question] 4. True or False: Autoscaling and load balancing are core cloud concepts that primarily support "Cost Predictability."
> a) True
> b) False
>> [!success]- Answer
>> b) False. Autoscaling and load balancing support "Performance Predictability."

> [!question] 5. Match the cloud model to its use case: Which model provides a framework that developers can build upon to develop or customize cloud-based applications without managing the underlying OS?
> a) IaaS
> b) PaaS
> c) SaaS
> d) On-premises
>> [!success]- Answer
>> b) PaaS

> [!question] 6. What is included in the Azure free student account that sets it apart from the standard free account?
> a) A 30-day credit limitation.
> b) $100 credit and the ability to sign up without a credit card.
> c) Lifetime access to all premium virtual machine tiers.
> d) Free ExpressRoute connectivity.
>> [!success]- Answer
>> b) $100 credit and the ability to sign up without a credit card.

> [!question] 7. True or False: Azure Cloud Shell requires a local installation of the Azure CLI software on your desktop before it can be used.
> a) True
> b) False
>> [!success]- Answer
>> b) False. Azure Cloud Shell is a browser-based tool that requires no local installation.

> [!question] 8. Which of the following regions is unique because its paired secondary region is located completely outside of its own geography?
> a) West US
> b) South-East Asia
> c) Brazil South
> d) West India
>> [!success]- Answer
>> c) Brazil South (paired with South Central US).

> [!question] 9. True or False: If you move a resource from Resource Group A to Resource Group B, it maintains its association with Resource Group A.
> a) True
> b) False
>> [!success]- Answer
>> b) False. When you move a resource to a new group, it will no longer be associated with the former group.

> [!question] 10. In the context of Azure Subscriptions, what are the two main types of boundaries they define?
> a) Billing boundary and Access control boundary
> b) Network boundary and Geographic boundary
> c) Resource boundary and Policy boundary
> d) Domain boundary and Identity boundary
>> [!success]- Answer
>> a) Billing boundary and Access control boundary

> [!question] 11. What is the maximum number of Azure management groups that can be supported in a single directory?
> a) 1,000
> b) 5,000
> c) 10,000
> d) Unlimited
>> [!success]- Answer
>> c) 10,000

> [!question] 12. Which Azure compute option is generally considered the best choice for a "lift and shift" migration from a physical server to the cloud?
> a) Azure Functions
> b) Azure Container Apps
> c) Azure Virtual Machines (VMs)
> d) Azure Kubernetes Service
>> [!success]- Answer
>> c) Azure Virtual Machines (VMs)

> [!question] 13. Which feature of a Virtual Machine Availability Set groups VMs that can be rebooted at the same time, ensuring only one grouping is offline during scheduled maintenance?
> a) Fault domain
> b) Update domain
> c) Scale set
> d) Availability zone
>> [!success]- Answer
>> b) Update domain

> [!question] 14. Which Azure service manages the orchestration and lifecycle of a large fleet of containers?
> a) Azure Container Instances (ACI)
> b) Azure Kubernetes Service (AKS)
> c) Azure Virtual Desktop (AVD)
> d) Azure Functions
>> [!success]- Answer
>> b) Azure Kubernetes Service (AKS)

> [!question] 15. True or False: Azure Functions can be stateful (Durable Functions) where context is passed through the function to track prior activity.
> a) True
> b) False
>> [!success]- Answer
>> a) True

> [!question] 16. Which feature of Azure App Service allows you to run a background program or script (.exe, .cmd, PowerShell) in the same context as a web app?
> a) Mobile Apps
> b) API Apps
> c) WebJobs
> d) Logic Apps
>> [!success]- Answer
>> c) WebJobs

> [!question] 17. Which mechanism provides an encrypted connection over the public internet linking an on-premises VPN device to an Azure VPN gateway?
> a) Point-to-site VPN
> b) Site-to-site VPN
> c) Azure ExpressRoute
> d) Virtual network peering
>> [!success]- Answer
>> b) Site-to-site VPN

> [!question] 18. By default, a newly deployed Linux VM's Network Security Group (NSG) allows inbound traffic on which port?
> a) Port 80 (HTTP)
> b) Port 443 (HTTPS)
> c) Port 22 (SSH)
> d) Port 3389 (RDP)
>> [!success]- Answer
>> c) Port 22 (SSH)

> [!question] 19. Which VPN Gateway type uses statically defined IP address sets to evaluate every data packet to choose the appropriate encryption tunnel?
> a) Route-based VPN
> b) Policy-based VPN
> c) ExpressRoute Direct
> d) Point-to-site VPN
>> [!success]- Answer
>> b) Policy-based VPN

> [!question] 20. True or False: Azure DNS supports Alias record sets that seamlessly update DNS resolution if the IP address of the underlying Azure resource (like a Public IP or Traffic Manager) changes.
> a) True
> b) False
>> [!success]- Answer
>> a) True

> [!question] 21. Which Azure Storage account type is recommended for enterprise or high-performance scale applications that require BOTH Server Message Block (SMB) and NFS file shares?
> a) Standard general-purpose v2
> b) Premium block blobs
> c) Premium file shares
> d) Premium page blobs
>> [!success]- Answer
>> c) Premium file shares

> [!question] 22. What acts as a directory within an Azure storage account to organize sets of blobs (files)?
> a) A Subnet
> b) A Container
> c) A Resource Group
> d) A Workspace
>> [!success]- Answer
>> b) A Container

> [!question] 23. Locally redundant storage (LRS) protects your data against which of the following? (Select all that apply)
> a) Server rack failures
> b) Drive failures
> c) Regional datacenter fires or floods
> d) Multi-region internet backbone outages
>> [!success]- Answer
>> a) Server rack failures, b) Drive failures

> [!question] 24. Which redundancy option copies your data synchronously across three availability zones in the primary region, AND replicates it to a secondary geographic region using LRS?
> a) ZRS
> b) GRS
> c) GZRS
> d) RA-GRS
>> [!success]- Answer
>> c) GZRS

> [!question] 25. True or False: Data in the Azure Cool and Cold access tiers requires lower durability than data in the Hot access tier.
> a) True
> b) False
>> [!success]- Answer
>> b) False. It tolerates slightly lower *availability*, but still requires high *durability* similar to hot data.

> [!question] 26. Which Azure Storage service is specifically designed as a NoSQL table option for storing large amounts of structured, non-relational data?
> a) Azure Blobs
> b) Azure Files
> c) Azure Disks
> d) Azure Tables
>> [!success]- Answer
>> d) Azure Tables

> [!question] 27. Which feature of Azure File Sync automatically ensures that frequently accessed files are replicated locally, while infrequently accessed files are kept only in the cloud?
> a) AzCopy
> b) Cloud tiering
> c) Blob archiving
> d) DFS Replication
>> [!success]- Answer
>> b) Cloud tiering

> [!question] 28. Which of the following is a key characteristic of Azure Data Box?
> a) It is a command-line utility for one-way blob synchronization.
> b) It requires a continuous, high-speed internet connection to function.
> c) It is a physical migration service device shipped to your datacenter to transfer up to 80TB of offline data.
> d) It assesses on-premises servers for migration compatibility.
>> [!success]- Answer
>> c) It is a physical migration service device shipped to your datacenter to transfer up to 80TB of offline data.

> [!question] 29. True or False: Resources created directly inside Microsoft Entra Domain Services (Entra DS) are synchronized back up to Microsoft Entra ID.
> a) True
> b) False
>> [!success]- Answer
>> b) False. Synchronization is strictly one-way from Microsoft Entra ID down to Entra DS.

> [!question] 30. Which authentication method relies entirely on a mobile device where a user receives a notification, matches a displayed number, and confirms with biometrics or a PIN?
> a) Windows Hello for Business
> b) Microsoft Authenticator App
> c) FIDO2 Security Keys
> d) Standard SSO
>> [!success]- Answer
>> b) Microsoft Authenticator App

> [!question] 31. Which feature of Microsoft Entra External ID establishes a mutual, two-way trust specifically to support features like Teams shared channels?
> a) B2B Collaboration
> b) B2B Direct Connect
> c) Azure AD B2C
> d) Azure Arc
>> [!success]- Answer
>> b) B2B Direct Connect

> [!question] 32. Select all that apply: Which of the following are examples of "Signals" collected by Azure Conditional Access to make access decisions?
> a) The user's identity
> b) The user's geographic location
> c) The device being used
> d) The specific application being accessed
> e) All of the above
>> [!success]- Answer
>> e) All of the above

> [!question] 33. In Azure Role-Based Access Control (RBAC), if a user is assigned multiple roles that grant different permissions, what is the effective result?
> a) The most restrictive permission is applied (Deny overrides Allow).
> b) The user has the combined (Allow) permissions from all assignments.
> c) The system triggers a conflict alert and revokes access.
> d) Only the permissions from the highest scope (e.g., Management Group) are applied.
>> [!success]- Answer
>> b) The user has the combined (Allow) permissions from all assignments.

> [!question] 34. In the Defense-in-Depth model, which layer is responsible for securing access to virtual machines and ensuring systems are patched?
> a) Application
> b) Compute
> c) Network
> d) Perimeter
>> [!success]- Answer
>> b) Compute

> [!question] 35. What is the primary function of Microsoft Defender for Cloud's "Secure Score"?
> a) It dictates the billing tier for your security services.
> b) It groups recommendations into controls and assigns a score to indicate overall security posture health.
> c) It tracks the performance latency of your firewalls.
> d) It measures compliance exclusively for AWS resources.
>> [!success]- Answer
>> b) It groups recommendations into controls and assigns a score to indicate overall security posture health.

> [!question] 36. True or False: Outbound network data transfers from Azure datacenters are always free, regardless of geographic zones.
> a) True
> b) False
>> [!success]- Answer
>> b) False. Inbound transfers are often free, but outbound transfers are priced based on geographical zones.

> [!question] 37. Which Azure Cost Management feature allows you to set a spending limit that triggers an email alert, but requires advanced automation to actually suspend resources?
> a) Cost Analysis
> b) Budgets
> c) Pricing Calculator
> d) TCO Calculator
>> [!success]- Answer
>> b) Budgets

> [!question] 38. Which tool provides automated data discovery, sensitive data classification, and end-to-end data lineage mapping across Azure, Microsoft 365, and on-premises databases?
> a) Azure Policy
> b) Azure Monitor
> c) Microsoft Purview
> d) Microsoft Defender for Cloud
>> [!success]- Answer
>> c) Microsoft Purview

> [!question] 39. What happens if a resource does not comply with the rules defined in an Azure Policy?
> a) The resource is immediately deleted.
> b) The policy can highlight the non-compliant resource, prevent its creation, or automatically remediate it.
> c) The subscription is suspended until compliance is met.
> d) A "Delete" lock is automatically applied to the resource.
>> [!success]- Answer
>> b) The policy can highlight the non-compliant resource, prevent its creation, or automatically remediate it.

> [!question] 40. True or False: To modify a resource protected by a Resource Lock, an administrator with "Owner" permissions can simply bypass the lock during the modification process.
> a) True
> b) False
>> [!success]- Answer
>> b) False. Even users with Owner permissions must explicitly remove the lock before performing blocked activities.

> [!question] 41. Which of the following Azure command-line tools is functionally equivalent to Azure PowerShell but uses Bash commands?
> a) Azure Arc
> b) Bicep
> c) Azure CLI
> d) AzCopy
>> [!success]- Answer
>> c) Azure CLI

> [!question] 42. Which Azure feature allows you to manage non-Azure servers, Kubernetes clusters, and SQL databases as if they were running natively inside Azure Resource Manager (ARM)?
> a) Azure Migrate
> b) Azure Arc
> c) ExpressRoute
> d) Azure Policy
>> [!success]- Answer
>> b) Azure Arc

> [!question] 43. What is a key benefit of using Bicep over JSON for ARM templates?
> a) Bicep is imperatively executed line-by-line rather than declaratively.
> b) Bicep offers a simpler, more concise syntax that is easier to read without prior programming knowledge.
> c) Bicep files cannot be made modular, making them highly secure.
> d) Bicep bypasses Azure Resource Manager completely for faster deployments.
>> [!success]- Answer
>> b) Bicep offers a simpler, more concise syntax that is easier to read without prior programming knowledge.

> [!question] 44. Match the service: Which component of Azure Monitor is specifically used for writing and running both simple and complex queries to perform statistical analysis on collected logs?
> a) Azure Advisor
> b) Application Insights
> c) Azure Log Analytics
> d) Action Groups
>> [!success]- Answer
>> c) Azure Log Analytics

> [!question] 45. Which Azure Service Health component gives you a global overview of the health of all Azure services across all regions, useful for identifying widespread outages?
> a) Azure Status
> b) Service Health
> c) Resource Health
> d) Azure Advisor
>> [!success]- Answer
>> a) Azure Status

> [!question] 46. True or False: Azure Monitor can monitor applications running on-premises and in other cloud environments, not just natively in Azure.
> a) True
> b) False
>> [!success]- Answer
>> a) True

> [!question] 47. Which networking mechanism propagates your on-premises routing tables to your Azure VNets via VPN or ExpressRoute?
> a) User-Defined Routes (UDR)
> b) Network Security Groups (NSGs)
> c) Border Gateway Protocol (BGP)
> d) Azure DNS
>> [!success]- Answer
>> c) Border Gateway Protocol (BGP)

> [!question] 48. What is the maximum size limit for an individual message stored in Azure Queue storage?
> a) 64 KB
> b) 1 MB
> c) 64 MB
> d) 1 GB
>> [!success]- Answer
>> a) 64 KB

> [!question] 49. Which of the following describes the "Assume Breach" principle of the Zero Trust model?
> a) Rely exclusively on the corporate network perimeter firewall.
> b) Segment access, use end-to-end encryption, and minimize the blast radius of any potential compromise.
> c) Grant wide permissions so users aren't interrupted if a breach occurs.
> d) Trust all devices connected via a physical ethernet cable.
>> [!success]- Answer
>> b) Segment access, use end-to-end encryption, and minimize the blast radius of any potential compromise.

> [!question] 50. True or False: Azure tags can be used to visualize resources in complex deployments and automate tasks using software like Azure DevOps.
> a) True
> b) False
>> [!success]- Answer
>> a) True