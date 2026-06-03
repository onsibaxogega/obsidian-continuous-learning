> [!question] 1. Which cloud pricing model shifts IT spending away from capital expenses (CapEx) to a pay-as-you-go operational expense (OpEx) structure?
> a) The Fixed-rate model
> b) The Consumption-based model
> c) The Shared-responsibility model
> d) The Enterprise Agreement model
>> [!success]- Answer
>> b) The Consumption-based model

> [!question] 2. True or False: In a Public Cloud environment, organizations have complete control over the physical hardware and security of the datacenter.
> a) True
> b) False
>> [!success]- Answer
>> b) False. Organizations don’t have complete control over physical resources and security; the cloud provider manages the physical datacenter.

> [!question] 3. Adding more virtual machines during a steep jump in demand, and removing them when demand drops, is known as what?
> a) Vertical Scaling (Scaling Up/Down)
> b) Horizontal Scaling (Scaling Out/In)
> c) Geo-redundancy
> d) High Availability
>> [!success]- Answer
>> b) Horizontal Scaling (Scaling Out/In)

> [!question] 4. Which foundational pillar of the Microsoft Azure Well-Architected Framework focuses on the ability of a system to recover from failures and continue to function?
> a) Security
> b) Performance Predictability
> c) Reliability
> d) Manageability
>> [!success]- Answer
>> c) Reliability

> [!question] 5. In a Platform as a Service (PaaS) scenario, who is responsible for patching and maintaining the underlying Operating Systems?
> a) The Cloud Provider
> b) The Customer
> c) Shared equally between provider and customer
> d) The third-party application developer
>> [!success]- Answer
>> a) The Cloud Provider

> [!question] 6. True or False: Some global Azure services, such as Microsoft Entra ID and Azure Traffic Manager, do not require you to select a particular deployment region.
> a) True
> b) False
>> [!success]- Answer
>> a) True

> [!question] 7. Which Azure isolation boundary consists of one or more datacenters equipped with independent power, cooling, and networking within a single region?
> a) Azure Region Pair
> b) Sovereign Region
> c) Availability Zone
> d) Resource Group
>> [!success]- Answer
>> c) Availability Zone

> [!question] 8. What happens to the resources inside an Azure Resource Group if the Resource Group itself is deleted?
> a) The resources are orphaned and moved to the subscription root.
> b) The resources are automatically stopped but retained.
> c) All the resources within the resource group are deleted.
> d) Only resources without active locks are deleted.
>> [!success]- Answer
>> c) All the resources within the resource group are deleted.

> [!question] 9. True or False: A single Azure account can have multiple subscriptions, but it is only required to have one.
> a) True
> b) False
>> [!success]- Answer
>> a) True

> [!question] 10. Match the management level: Which Azure feature provides a level of scope ABOVE subscriptions to efficiently manage access, policies, and compliance across multiple subscriptions?
> a) Resource Groups
> b) Availability Zones
> c) Management Groups
> d) Microsoft Entra ID
>> [!success]- Answer
>> c) Management Groups

> [!question] 11. Sovereign regions (like US DoD Central or US Gov Virginia) are physically and logically isolated instances of Azure. Who operates these specific datacenters?
> a) Third-party contractors only
> b) Screened U.S. personnel
> c) The United Nations IT division
> d) Standard global Microsoft personnel
>> [!success]- Answer
>> b) Screened U.S. personnel

> [!question] 12. What is an Azure "Image" in the context of Virtual Machines?
> a) A snapshot backup of a corrupted disk.
> b) A graphical representation of network traffic.
> c) A template used to create a VM that may already include an OS and other software.
> d) A Docker container registry.
>> [!success]- Answer
>> c) A template used to create a VM that may already include an OS and other software.

> [!question] 13. Which Azure Virtual Machine feature is completely free to configure and protects against physical power or networking failures by grouping VMs into "Fault domains"?
> a) Virtual Machine Scale Sets
> b) Virtual Machine Availability Sets
> c) Azure Container Apps
> d) Availability Zones
>> [!success]- Answer
>> b) Virtual Machine Availability Sets

> [!question] 14. Which container engine does Azure actively support and utilize as one of the most popular engines for virtualization?
> a) VMware
> b) Hyper-V
> c) Docker
> d) Xen
>> [!success]- Answer
>> c) Docker

> [!question] 15. Select all that apply: Which of the following application styles are natively supported for hosting on Azure App Service?
> a) Web apps
> b) API apps
> c) WebJobs
> d) Mobile apps
> e) All of the above
>> [!success]- Answer
>> e) All of the above

> [!question] 16. What is the fundamental difference between a public endpoint and a private endpoint in Azure Virtual Networking?
> a) Public endpoints use IPv4; private endpoints use IPv6.
> b) Public endpoints are accessible from anywhere in the world; private endpoints exist within a virtual network and use a private IP address.
> c) Public endpoints are free; private endpoints are billed per gigabyte.
> d) Public endpoints use TCP; private endpoints use UDP.
>> [!success]- Answer
>> b) Public endpoints are accessible from anywhere in the world; private endpoints exist within a virtual network and use a private IP address.

> [!question] 17. Which Azure routing feature uses custom rules to dictate exactly how packets are routed between specific subnets, overriding Azure's default routing?
> a) Border Gateway Protocol (BGP)
> b) Service Endpoints
> c) Route tables (User-defined routes)
> d) Network Security Groups
>> [!success]- Answer
>> c) Route tables (User-defined routes)

> [!question] 18. True or False: You can deploy up to three VPN gateways inside a single Azure Virtual Network (VNet) for load balancing purposes.
> a) True
> b) False
>> [!success]- Answer
>> b) False. A VNet is strictly limited to ONE VPN gateway, though that single gateway can multiplex connections.

> [!question] 19. Azure ExpressRoute Direct connects directly into Microsoft's global peering edge to support massive Active/Active scale. What dual port speeds are offered?
> a) 1 Gbps or 10 Gbps
> b) 10 Gbps or 100 Gbps
> c) 100 Mbps or 1 Gbps
> d) 40 Gbps or 400 Gbps
>> [!success]- Answer
>> b) 10 Gbps or 100 Gbps

> [!question] 20. Which Storage Account Type is the ONLY option if you require a storage account that supports BOTH Server Message Block (SMB) and NFS file shares?
> a) Standard general-purpose v2
> b) Premium block blobs
> c) Premium file shares
> d) Premium page blobs
>> [!success]- Answer
>> c) Premium file shares

> [!question] 21. Locally Redundant Storage (LRS) is the lowest-cost redundancy option. How many "nines" of durability does it provide over a given year?
> a) 9 nines (99.9999999%)
> b) 11 nines (99.999999999%)
> c) 12 nines (99.9999999999%)
> d) 16 nines (99.99999999999999%)
>> [!success]- Answer
>> b) 11 nines (99.999999999%)

> [!question] 22. True or False: When you configure Geo-Redundant Storage (GRS), the secondary paired region is automatically selected based on Azure Region Pairs and cannot be manually changed.
> a) True
> b) False
>> [!success]- Answer
>> a) True

> [!question] 23. By default, is the data copied to a secondary region (via GRS or GZRS) immediately available for read/write access while the primary region is perfectly healthy?
> a) Yes, it operates in an Active/Active state.
> b) No, it isn't available for read or write access unless there's a failover or unless Read-Access (RA-GRS/RA-GZRS) is explicitly enabled.
>> [!success]- Answer
>> b) No, it isn't available for read or write access unless there's a failover or unless Read-Access (RA-GRS/RA-GZRS) is explicitly enabled.

> [!question] 24. Which Azure Storage service is ideal for serving images or documents directly to a browser, or storing data for backup, disaster recovery, and archiving?
> a) Azure Queues
> b) Azure Disks
> c) Azure Tables
> d) Azure Blobs
>> [!success]- Answer
>> d) Azure Blobs

> [!question] 25. Which Azure Storage Access Tier cannot be set at the account level, and instead must be set at the individual blob level?
> a) Hot access tier
> b) Cool access tier
> c) Cold access tier
> d) Archive access tier
>> [!success]- Answer
>> d) Archive access tier

> [!question] 26. Which Azure file movement tool allows you to configure "cloud tiering" on a local Windows Server to keep frequently accessed files local and infrequently accessed files in the cloud?
> a) AzCopy
> b) Azure Storage Explorer
> c) Azure File Sync
> d) Azure Migrate
>> [!success]- Answer
>> c) Azure File Sync

> [!question] 27. When using Azure Data Box for an import order, what happens to the physical disks on the device after the data is successfully uploaded to Azure?
> a) They are shipped back to the customer for reuse.
> b) They are physically shredded and destroyed.
> c) They are wiped clean in accordance with NIST 800-88r1 standards.
> d) They are permanently mounted in the Azure datacenter.
>> [!success]- Answer
>> c) They are wiped clean in accordance with NIST 800-88r1 standards.

> [!question] 28. Which Azure directory service synchronizes one-way from the cloud to provide legacy Kerberos/NTLM authentication for "lift and shift" scenarios?
> a) Microsoft Entra ID
> b) Microsoft Entra Connect
> c) Microsoft Entra Domain Services
> d) Azure Active Directory B2C
>> [!success]- Answer
>> c) Microsoft Entra Domain Services

> [!question] 29. When utilizing Microsoft Entra External Identities for Business to Business (B2B) Collaboration, how do external users appear in your directory?
> a) As global administrators
> b) As B2B Direct Connect users
> c) As guest users
> d) They do not appear in your directory at all
>> [!success]- Answer
>> c) As guest users

> [!question] 30. Which authentication method provides both High Security and High Convenience by utilizing biometrics (like Windows Hello) tied to a specific hardware device?
> a) Passwords
> b) SSO + MFA
> c) Passwordless Authentication
> d) LDAP Authentication
>> [!success]- Answer
>> c) Passwordless Authentication

> [!question] 31. True or False: Azure Role-Based Access Control (RBAC) relies on an "Allow Model," meaning if multiple role assignments grant you permissions, you possess the combined permissions of all assignments.
> a) True
> b) False
>> [!success]- Answer
>> a) True

> [!question] 32. What is the guiding principle of the Zero Trust model that dictates utilizing Just-In-Time (JIT) and Just-Enough-Access (JEA) policies?
> a) Verify Explicitly
> b) Use Least Privilege Access
> c) Assume Breach
> d) End-to-end Encryption
>> [!success]- Answer
>> b) Use Least Privilege Access

> [!question] 33. In the Defense-in-Depth model, which layer protects computing hardware inside the actual datacenters?
> a) Perimeter
> b) Identity & Access
> c) Network
> d) Physical Security
>> [!success]- Answer
>> d) Physical Security

> [!question] 34. Which Microsoft Defender for Cloud feature actively limits exposure to brute force attacks by reducing access to VM management ports until requested?
> a) Secure Score
> b) Just-in-Time VM Access
> c) Adaptive Application Controls
> d) Fusion Kill-Chain Analysis
>> [!success]- Answer
>> b) Just-in-Time VM Access

> [!question] 35. Which Azure resource factor can affect operational expenses (OpEx) because different areas have varying costs for power, labor, taxes, and fees?
> a) Resource Type
> b) Consumption
> c) Geography
> d) Maintenance
>> [!success]- Answer
>> c) Geography

> [!question] 36. Select all that apply: Cost Management alerts provide a centralized view of which of the following alert types?
> a) Budget Alerts
> b) Credit Alerts
> c) Department Spending Quota Alerts
> d) Security Score Alerts
>> [!success]- Answer
>> a) Budget Alerts, b) Credit Alerts, c) Department Spending Quota Alerts

> [!question] 37. True or False: You can apply a specific resource tag (like "Environment: Prod") using an Azure Resource Manager (ARM) template.
> a) True
> b) False
>> [!success]- Answer
>> a) True

> [!question] 38. Which governance tool allows you to evaluate resources and prevent the creation of non-compliant resources, or automatically remediate them (like applying a missing tag)?
> a) Azure Policy
> b) Azure RBAC
> c) Resource Locks
> d) Microsoft Purview
>> [!success]- Answer
>> a) Azure Policy

> [!question] 39. Which suite of solutions provides an up-to-date map of your data estate, allowing you to automatically discover and classify sensitive data across on-premises and multicloud environments?
> a) Microsoft Defender for Cloud
> b) Microsoft Service Trust Portal
> c) Microsoft Purview
> d) Azure Policy Initiatives
>> [!success]- Answer
>> c) Microsoft Purview

> [!question] 40. True or False: If a "Delete" resource lock is applied, authorized users can still read and modify the resource, they just cannot delete it.
> a) True
> b) False
>> [!success]- Answer
>> a) True

> [!question] 41. Which command-line interface utilizes "cmdlets" to call the Azure REST API and make processes repeatable and automatable?
> a) Azure CLI
> b) Azure PowerShell
> c) Bash
> d) Bicep
>> [!success]- Answer
>> b) Azure PowerShell

> [!question] 42. True or False: Azure Cloud Shell is authenticated securely using your Azure credentials and requires no local software installation.
> a) True
> b) False
>> [!success]- Answer
>> a) True

> [!question] 43. Which Infrastructure as Code (IaC) tool is described as having "Idempotent" files, meaning deploying the same file multiple times results in the exact same resource state?
> a) Azure CLI scripts
> b) Bicep (and ARM templates)
> c) PowerShell cmdlets
> d) Microsoft Purview
>> [!success]- Answer
>> b) Bicep (and ARM templates)

> [!question] 44. Azure Advisor provides personalized recommendations across five specific categories. Which of the following is NOT one of those categories?
> a) Reliability
> b) Security
> c) Performance
> d) Data Lineage
> e) Cost
>> [!success]- Answer
>> d) Data Lineage (The fifth is Operational Excellence)

> [!question] 45. Which Azure Service Health component provides a global overview of the health of all Azure services, useful for identifying widespread outages?
> a) Resource Health
> b) Service Health
> c) Azure Status
> d) Application Insights
>> [!success]- Answer
>> c) Azure Status

> [!question] 46. Select all that apply: Application Insights is an Azure Monitor feature used to monitor web applications. Which of the following specific metrics can it track?
> a) Request rates, response times, and failure rates
> b) Page views and load performance
> c) AJAX calls
> d) Server performance counters (CPU, memory, network)
>> [!success]- Answer
>> a) Request rates, response times, and failure rates, b) Page views and load performance, c) AJAX calls, d) Server performance counters (CPU, memory, network)

> [!question] 47. In Azure Monitor, what component defines the notification recipients (like SMS or email) and potential corrective actions when an alert threshold is crossed?
> a) Log Analytics Workspace
> b) Action Groups
> c) Route Tables
> d) Management Groups
>> [!success]- Answer
>> b) Action Groups

> [!question] 48. True or False: You can use the "Pricing Calculator" to deploy actual infrastructure once you are satisfied with the cost estimate.
> a) True
> b) False
>> [!success]- Answer
>> b) False. The pricing calculator is for information purposes only; no resources are provisioned.

> [!question] 49. When managing Azure Resource Tags, what component can be used to explicitly enforce tagging conventions (e.g., requiring an "Owner" tag before a resource can be created)?
> a) Azure RBAC
> b) Resource Locks
> c) Azure Policy
> d) Microsoft Purview
>> [!success]- Answer
>> c) Azure Policy

> [!question] 50. Which Azure tool allows you to send synthetic requests to check the status of a web application even during periods of low user activity?
> a) Azure Log Analytics
> b) Azure Advisor
> c) Application Insights
> d) Azure Resource Health
>> [!success]- Answer
>> c) Application Insights