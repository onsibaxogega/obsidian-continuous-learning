> [!question] 1. In the Shared Responsibility Model, which of the following is the cloud provider ALWAYS responsible for, regardless of the service type (IaaS, PaaS, SaaS)?
> a) Operating systems
> b) Physical datacenters, network, and hosts
> c) Network controls
> d) The data stored in the cloud
>> [!success]- Answer
>> b) Physical datacenters, network, and hosts

> [!question] 2. True or False: A private cloud must always be hosted from your own on-site datacenter.
> a) True
> b) False
>> [!success]- Answer
>> b) False. It may also be hosted in a dedicated datacenter offsite or by a third party that has dedicated that datacenter to your company.

> [!question] 3. What is the primary financial benefit of the consumption-based model in Azure?
> a) It requires a large upfront CapEx investment for better long-term rates.
> b) It shifts IT spending to a pay-as-you-go OpEx structure.
> c) It eliminates the need for any internal IT staff.
> d) It guarantees a flat monthly fee regardless of usage.
>> [!success]- Answer
>> b) It shifts IT spending to a pay-as-you-go OpEx structure.

> [!question] 4. Adding additional virtual machines or containers during a steep jump in demand is an example of what type of scaling?
> a) Vertical Scaling (Scaling Up)
> b) Horizontal Scaling (Scaling Out)
> c) Elastic Scaling
> d) Load Balancing
>> [!success]- Answer
>> b) Horizontal Scaling (Scaling Out)

> [!question] 5. Which of the following describes an Azure Availability Zone?
> a) A geographical area that contains at least one datacenter.
> b) A physically separate datacenter (or group of datacenters) within an Azure region equipped with independent power, cooling, and networking.
> c) A secondary region located at least 300 miles away.
> d) An isolated instance of Azure for government use.
>> [!success]- Answer
>> b) A physically separate datacenter (or group of datacenters) within an Azure region equipped with independent power, cooling, and networking.

> [!question] 6. True or False: All Azure regions currently support availability zones.
> a) True
> b) False
>> [!success]- Answer
>> b) False. Not all Azure Regions currently support availability zones.

> [!question] 7. Match the Azure region type: Which type of region is operated by screened U.S. personnel and isolated from the main instance of Azure for legal or compliance purposes?
> a) Azure Region Pairs
> b) Availability Zones
> c) Sovereign Regions
> d) Zonal Services
>> [!success]- Answer
>> c) Sovereign Regions

> [!question] 8. Which of the following statements about Azure Resource Groups is TRUE?
> a) Resource groups can be nested inside one another.
> b) A single resource can belong to multiple resource groups at the same time.
> c) When you apply an action (like delete) to a resource group, it applies to all resources within it.
> d) Moving a resource to a new group retains its association with the former group.
>> [!success]- Answer
>> c) When you apply an action (like delete) to a resource group, it applies to all resources within it.

> [!question] 9. How many levels of depth can an Azure Management Group tree support (excluding the root level or subscription level)?
> a) 3 levels
> b) 6 levels
> c) 10 levels
> d) Unlimited
>> [!success]- Answer
>> b) 6 levels

> [!question] 10. Which feature automatically deploys a load balancer and allows identical VMs to automatically increase or decrease in response to demand?
> a) Virtual machine availability sets
> b) Azure Container Instances
> c) Virtual machine scale sets
> d) Azure Functions
>> [!success]- Answer
>> c) Virtual machine scale sets

> [!question] 11. In a VM availability set, what is the purpose of an update domain?
> a) To group VMs by common power source and network switch.
> b) To group VMs that can be rebooted at the same time, ensuring only one group is offline during maintenance.
> c) To automatically scale the number of VMs up or down.
> d) To replicate the VM to a secondary geographic region.
>> [!success]- Answer
>> b) To group VMs that can be rebooted at the same time, ensuring only one group is offline during maintenance.

> [!question] 12. True or False: Azure Container Apps (ACA) is built for complex, event-driven microservices where you provide the application-level scaling rules.
> a) True
> b) False
>> [!success]- Answer
>> a) True

> [!question] 13. Which Azure compute option provides a fully managed, serverless model where you are charged strictly for the exact CPU time consumed while your code runs?
> a) Azure Virtual Machines
> b) Azure Functions
> c) Azure Kubernetes Service
> d) Azure Virtual Desktop
>> [!success]- Answer
>> b) Azure Functions

> [!question] 14. Which Azure service enables you to run Windows 10 or Windows 11 Enterprise in a multi-session environment on a single VM?
> a) Azure App Service
> b) Azure Virtual Desktop
> c) Azure Container Instances
> d) Virtual Machine Scale Sets
>> [!success]- Answer
>> b) Azure Virtual Desktop

> [!question] 15. What type of encrypted VPN connection connects an individual external client computer directly into an Azure VNet?
> a) Site-to-site VPN
> b) Point-to-site VPN
> c) ExpressRoute
> d) Network-to-network VPN
>> [!success]- Answer
>> b) Point-to-site VPN

> [!question] 16. True or False: An Azure Virtual Network (VNet) inherently creates a public, internet-routable IP address space.
> a) True
> b) False
>> [!success]- Answer
>> b) False. It creates an isolated, private IP address space that is non-internet routable by default.

> [!question] 17. Which of the following acts as a specialized VM that carries out hardened network functions, such as running a firewall?
> a) Network security groups (NSGs)
> b) Network virtual appliances (NVAs)
> c) Route tables
> d) Azure DNS
>> [!success]- Answer
>> b) Network virtual appliances (NVAs)

> [!question] 18. What is the primary benefit of Azure ExpressRoute Global Reach?
> a) It allows you to purchase public domain names globally.
> b) It links multiple ExpressRoute circuits together so global on-premises facilities can communicate privately across the Microsoft backbone.
> c) It automatically balances web traffic across multiple geographic regions.
> d) It replaces Azure DNS with an Anycast routing network.
>> [!success]- Answer
>> b) It links multiple ExpressRoute circuits together so global on-premises facilities can communicate privately across the Microsoft backbone.

> [!question] 19. Select all that apply: Which redundancy options copy your data to a secondary geographic region hundreds of miles away?
> a) LRS
> b) ZRS
> c) GRS
> d) GZRS
>> [!success]- Answer
>> c) GRS, d) GZRS

> [!question] 20. Which storage tier provides the lowest storage costs but requires the highest costs to rehydrate and access data?
> a) Hot access tier
> b) Cool access tier
> c) Cold access tier
> d) Archive access tier
>> [!success]- Answer
>> d) Archive access tier

> [!question] 21. True or False: Zone-redundant storage (ZRS) replicates your data synchronously across three availability zones in the primary region.
> a) True
> b) False
>> [!success]- Answer
>> a) True

> [!question] 22. Which Azure storage service offers fully managed file shares accessible via SMB or NFS protocols?
> a) Azure Blobs
> b) Azure Files
> c) Azure Disks
> d) Azure Tables
>> [!success]- Answer
>> b) Azure Files

> [!question] 23. What physical migration service uses a proprietary storage device to transfer massive amounts of offline data (up to 80TB) to Azure?
> a) AzCopy
> b) Azure Storage Explorer
> c) Azure Migrate
> d) Azure Data Box
>> [!success]- Answer
>> d) Azure Data Box

> [!question] 24. Which command-line utility provides one-direction synchronization and copying of blobs/files to or from your storage account?
> a) Azure File Sync
> b) Azure Migrate
> c) AzCopy
> d) Azure Storage Explorer
>> [!success]- Answer
>> c) AzCopy

> [!question] 25. Which Azure identity service enables you to run legacy applications in the cloud with managed domain join, group policy, and Kerberos authentication without managing domain controllers?
> a) Microsoft Entra ID
> b) Microsoft Entra Domain Services
> c) Microsoft Entra External ID
> d) Azure RBAC
>> [!success]- Answer
>> b) Microsoft Entra Domain Services

> [!question] 26. True or False: Synchronization between Microsoft Entra ID and Microsoft Entra Domain Services (Entra DS) is bi-directional.
> a) True
> b) False
>> [!success]- Answer
>> b) False. Synchronization is one-way from Microsoft Entra ID to Entra DS.

> [!question] 27. Which passwordless authentication method uses Fast IDentity Online standards (like WebAuthn) and is ideal for users seeking an unphishable method?
> a) Windows Hello for Business
> b) Microsoft Authenticator app
> c) FIDO2 security keys
> d) Microsoft Entra MFA
>> [!success]- Answer
>> c) FIDO2 security keys

> [!question] 28. What tool uses identity signals such as user, location, and device to dynamically allow access, block access, or require MFA?
> a) Azure RBAC
> b) Defense in Depth
> c) Azure Conditional Access
> d) Azure Policy
>> [!success]- Answer
>> c) Azure Conditional Access

> [!question] 29. Select all that apply: Which of the following are guiding principles of the Zero Trust model?
> a) Verify explicitly
> b) Assume the corporate network is safe
> c) Use least privilege access
> d) Assume breach
>> [!success]- Answer
>> a) Verify explicitly, c) Use least privilege access, d) Assume breach

> [!question] 30. In the Defense-in-Depth model, which layer focuses on limiting communication between resources through segmentation and denying by default?
> a) Application
> b) Compute
> c) Network
> d) Perimeter
>> [!success]- Answer
>> c) Network

> [!question] 31. Which feature of Microsoft Defender for Cloud secures VM management ports by limiting access to only when it is needed?
> a) Fusion Kill-Chain Analysis
> b) Just-in-Time VM Access
> c) Adaptive Application Controls
> d) Azure Security Benchmark
>> [!success]- Answer
>> b) Just-in-Time VM Access

> [!question] 32. True or False: When a budget threshold is reached in Microsoft Cost Management, the default action is to automatically shut down all virtual machines to prevent further charges.
> a) True
> b) False
>> [!success]- Answer
>> b) False. A budget alert is triggered and sends notifications; advanced automation must be specifically configured to suspend resources.

> [!question] 33. Which tool would you use to estimate the potential monthly costs of provisioning new resources in Azure before actually deploying them?
> a) Microsoft Cost Management
> b) TCO Calculator
> c) Pricing Calculator
> d) Azure Advisor
>> [!success]- Answer
>> c) Pricing Calculator

> [!question] 34. Which of the following statements about Resource Tags is FALSE?
> a) Tags consist of a Name and a Value.
> b) Tags are automatically inherited from the parent resource group.
> c) Azure Policy can enforce tagging rules and conventions.
> d) Tags help in organizing resources for cost allocation and billing.
>> [!success]- Answer
>> b) Tags are automatically inherited from the parent resource group. (They are not inherited).

> [!question] 35. What is the purpose of Microsoft Purview?
> a) To automate infrastructure deployment using declarative templates.
> b) To provide a unified view of data governance, risk, and compliance across multicloud environments.
> c) To monitor network traffic and optimize WAN routing.
> d) To provide managed Kubernetes clusters.
>> [!success]- Answer
>> b) To provide a unified view of data governance, risk, and compliance across multicloud environments.

> [!question] 36. What is an Azure Policy "initiative"?
> a) A script that deploys resources.
> b) A collection of related policy definitions grouped to track compliance for a larger goal.
> c) A lock that prevents resource deletion.
> d) A billing alert threshold.
>> [!success]- Answer
>> b) A collection of related policy definitions grouped to track compliance for a larger goal.

> [!question] 37. If you apply a "ReadOnly" resource lock to an Azure Storage account, what action is blocked?
> a) Only the deletion of the storage account.
> b) Only control plane modifications.
> c) Control plane modifications AND data plane operations requiring POST, PUT, or DELETE (like uploading blobs).
> d) Viewing the storage account in the Azure portal.
>> [!success]- Answer
>> c) Control plane modifications AND data plane operations requiring POST, PUT, or DELETE.

> [!question] 38. Where can you find information regarding Microsoft's implementation of controls and processes for protecting cloud services and customer data (e.g., SOC reports)?
> a) Microsoft Purview
> b) Microsoft Service Trust Portal
> c) Azure Advisor
> d) Azure Security Center
>> [!success]- Answer
>> b) Microsoft Service Trust Portal

> [!question] 39. True or False: Azure Cloud Shell supports both Azure PowerShell and Bash environments.
> a) True
> b) False
>> [!success]- Answer
>> a) True

> [!question] 40. Which service extends Azure Resource Manager (ARM) capabilities to non-Azure resources, allowing you to manage on-premises and multi-cloud environments natively?
> a) Azure Arc
> b) Microsoft Entra Connect
> c) Azure Migrate
> d) Azure Policy
>> [!success]- Answer
>> a) Azure Arc

> [!question] 41. Which declarative language offers a simpler, more concise syntax than JSON for deploying Azure resources as Infrastructure as Code (IaC)?
> a) Bash
> b) PowerShell
> c) Bicep
> d) Python
>> [!success]- Answer
>> c) Bicep

> [!question] 42. Which service analyzes your deployed resources and provides personalized recommendations focusing on Reliability, Security, Performance, Operational Excellence, and Cost?
> a) Azure Monitor
> b) Azure Advisor
> c) Azure Service Health
> d) Application Insights
>> [!success]- Answer
>> b) Azure Advisor

> [!question] 43. Within Azure Service Health, which component offers a narrower view focused strictly on outages and planned maintenance affecting your actively used services?
> a) Azure Status
> b) Service Health
> c) Resource Health
> d) Log Analytics
>> [!success]- Answer
>> b) Service Health

> [!question] 44. What Azure Monitor feature allows you to write simple or complex queries to perform statistical analysis and visualization on gathered data?
> a) Application Insights
> b) Action Groups
> c) Azure Log Analytics
> d) Resource Health
>> [!success]- Answer
>> c) Azure Log Analytics

> [!question] 45. Match the term: What defines the notification recipients and actions when an Azure Monitor Alert is triggered?
> a) Action Groups
> b) Security Groups
> c) Resource Groups
> d) Management Groups
>> [!success]- Answer
>> a) Action Groups

> [!question] 46. True or False: Azure RBAC relies on a "Deny" model, meaning you are explicitly denied access unless a role assignment overrides it.
> a) True
> b) False
>> [!success]- Answer
>> b) False. It uses an "Allow" model. You are granted permissions based on role assignments.

> [!question] 47. Which tier of Azure Blob storage is optimized for data that is infrequently accessed and stored for at least 30 days?
> a) Hot
> b) Cool
> c) Cold
> d) Archive
>> [!success]- Answer
>> b) Cool

> [!question] 48. What is the function of the Microsoft Entra B2B Direct Connect feature?
> a) It publishes SaaS apps to consumers.
> b) It establishes mutual, two-way trust with other Microsoft Entra organizations, currently supporting Teams shared channels.
> c) It creates guest accounts for external identities.
> d) It synchronizes on-premises AD to the cloud.
>> [!success]- Answer
>> b) It establishes mutual, two-way trust with other Microsoft Entra organizations.

> [!question] 49. In the context of Azure subscriptions, what are the two main types of subscription boundaries?
> a) Billing boundary and Access control boundary
> b) Management boundary and Resource boundary
> c) Region boundary and Zone boundary
> d) Policy boundary and Network boundary
>> [!success]- Answer
>> a) Billing boundary and Access control boundary

> [!question] 50. True or False: You can apply Azure Role-Based Access Control (RBAC) at the management group level, causing all sub-management groups and subscriptions beneath it to inherit those permissions.
> a) True
> b) False
>> [!success]- Answer
>> a) True