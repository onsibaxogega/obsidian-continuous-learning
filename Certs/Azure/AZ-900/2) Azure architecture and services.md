-  3 hr. 25 min
- 4 modules
---


# M1: Describe the core architectural components of Azure


## U1: Introduction

- In this module, you’ll be introduced to the core architectural components of Azure. 
- You’ll learn about the physical organization of Azure: datacenters, availability zones, and regions; and you’ll learn about the organizational structure of Azure: resources and resource groups, subscriptions, and management groups.

### Learning objectives

- After completing this module, you’ll be able to:
	- Describe Azure regions, region pairs, and sovereign regions.
	- Describe Availability Zones.
	- Describe Azure datacenters.
	- Describe Azure resources and Resource Groups.
	- Describe subscriptions.
	- Describe management groups.
	- Describe the hierarchy of resource groups, subscriptions, and management groups.



## U2: What is Microsoft Azure

- Azure is a continually expanding set of cloud services that help you meet current and future business challenges.
- Azure provides more than 100 services that enable you to do everything from running your existing applications on virtual machines to exploring new software paradigms, such as intelligent bots and mixed reality.


## U3: Get started with Azure accounts

- To create and use Azure services, you need an `Azure subscription`.
- When you create an Azure account, a subscription will be created for you.
- After you've created an Azure account, you're free to create additional subscriptions:
	- For example, your company might use a single Azure account for your business and separate subscriptions for development, marketing, and sales departments.

- ![hierarchy of organization of Azure services](https://learn.microsoft.com/en-us/training/wwl-azure/describe-core-architectural-components-of-azure/media/account-scope-levels-9ceb3abd-a2d45a13.png)

- Most of the exercises in the Introduction to Azure learning paths and modules are bring your own subscription (BYOS). BYOS requires you to have a subscription to complete the exercise.
- Each exercise has a **clean up** step at the end. It's important to complete the clean up step in order to avoid unanticipated Azure costs.
### What is the Azure free account?
- The Azure free account includes:
	- Free access to popular Azure products for 12 months.
	- A credit to use for the first 30 days.
	- Access to more than 25 products that are always free.

### What is the Azure free student account?

- The Azure free student account offer includes:
	- Free access to certain Azure services for 12 months.
	- A credit to use in the first 12 months.
	- Free access to certain software developer tools.
- The [Azure free student account](https://azure.microsoft.com/free/students/?cid=msft_learn) is an offer for students that gives $100 credit and free developer tools. Also, you can sign up without a credit card.



## U4: Exercise - Explore interacting with Azure

### Access the Azure Portal
- The [Azure portal](https://portal.azure.com/) provides a graphic user interface (GUI) to interact with Azure services:
	- You can navigate to different service areas, manage subscriptions and accounts, search for specific services or settings, and so on.
- You can also use the command line interface with PowerShell and BASH commands.

### Use the Azure command line interface

`(Execution of specific commands is not tested on AZ-900 (~ reddit))`

- You can use the CLI from within the Azure portal.
- Launching Cloud Shell brings up a CLI window in PowerShell or BASH mode.
- To access `CloudShell` from the Azure portal, select the CloudShell icon:
	![Screenshot of the Azure Portal action area with the CloudShell icon pointed out.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-core-architectural-components-of-azure/media/open-cloudshell.png)
- You can quickly change between PowerShell and BASH in the CLI by selecting the **Switch to ...** button or entering `BASH` or `PWSH`.
	- ![Screenshot of the Switch to button in the Azure command line interface.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-core-architectural-components-of-azure/media/switch-button.png)
- Most Azure specific commands start with the letters `'az'`

### Use Azure CLI interactive mode

- Another way to interact is using the Azure CLI interactive mode.
- Interactive mode provides:
	- autocompletion,
	- command descriptions,
	- and even examples
- run `az interactive` from bash or PS to enter interactive mode.
- ![Screenshot of interactive mode with autocompletion providing commands that start with A.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-core-architectural-components-of-azure/media/azure-interactive-mode-c8421a2d-3c3d662b.png)
- Interactive mode is set up specifically for Azure, so you don't need to start a command with `'az'`



## U5: Describe Azure Physical Infrastructure

- The core architectural components of Azure may be broken down into two main groupings: 
	- the physical infrastructure, 
	- and the management infrastructure.

>The physical infrastructure for Azure starts with #datacenters.
	Conceptually, the datacenters are the same as large corporate datacenters: *They’re facilities with resources arranged in racks, with dedicated power, cooling, and networking infrastructure.*

- As a global cloud provider, Azure has datacenters around the world:
	- However, these individual datacenters aren’t directly accessible:
		- Datacenters are grouped into Azure Regions or Azure Availability Zones that are designed to help you achieve resiliency and reliability for your workloads.

### Regions

>A #region is a *geographical area on the planet* that contains at least one, but *potentially multiple datacenters that are nearby and networked together* with a low-latency network.
- Azure intelligently assigns and controls the resources within each region to ensure workloads are appropriately balanced.
- When you deploy a resource in Azure, you'll often need to choose the region where you want your resource deployed.

> `Note:`
	Some services or virtual machine (VM) features are only available in certain regions, such as specific VM sizes or storage types.
	There are also some global Azure services that don't require you to select a particular region, such as Microsoft Entra ID, Azure Traffic Manager, and Azure DNS.


### Availability Zones

> #availability_zones are *physically separate datacenters within an Azure region*. 
> 	Each availability zone is made up of `one or more datacenters` equipped with `independent power, cooling, and networking.`
> 	 **`An availability zone is set up to be an isolation boundary. If one zone goes down, the other continues working.`** 

- Availability zones (within the same region?) are `connected through high-speed, private fiber-optic networks.` :
	- ![Diagram showing three datacenters connected in a single Azure region representing an availability zone.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-core-architectural-components-of-azure/media/availability-zones-c22f95a3-14cd8677.png)

> `Note:`
> To ensure resiliency, a minimum of three separate availability zones are present in all availability zone-enabled regions.
> 	However, not all Azure Regions currently support availability zones.


#### Using availability zones in your apps

- When you host your infrastructure, setting up your own redundancy requires that you create duplicate hardware environments:
- You can use availability zones to run mission-critical applications and build high-availability into your application architecture by **co-locating your compute, storage, networking, and data resources within an availability zone, and replicating in other availability zones**.
	- Keep in mind that there could be a cost to duplicating your services and transferring data between availability zones.
- Availability zones are `primarily for VMs, managed disks, load balancers, and SQL databases`. 

##### Azure services that support availability zones fall into three categories:
###### Zonal services: 
- You *pin the resource to a specific zone* (for example, VMs, managed disks, IP addresses).
###### Zone-redundant services:
- The *platform replicates automatically across zones* (for example, zone-redundant storage, SQL Database).
###### Non-regional services: 
- Services are always available from Azure geographies and are resilient to zone-wide outages as well as region-wide outages.

> Even with the additional resiliency that availability zones provide, it’s possible that an event could be so large that it impacts multiple availability zones in a single region. To provide even further resilience, Azure has Region Pairs.



### Region pairs

> #region_pairs:
> 	*Most Azure regions are paired with another region within the same geography* (such as US, Europe, or Asia) *at least 300 miles away*.

- This approach allows for the replication of resources across a geography that **helps reduce the likelihood of interruptions because of events such as** `natural disasters, civil unrest, power outages, or physical network outages` **that affect an entire region**. 
	- For example, if a region in a pair was affected by a natural disaster, services would automatically fail over to the other region in its region pair.
 - Not all Azure services automatically replicate data or automatically fall back from a failed region to cross-replicate to another enabled region.
	 - In these scenarios, recovery and replication must be configured by the customer.

- Examples of region pairs in Azure are:
	- West US paired with East US,
	- South-East Asia paired with East Asia.

![Diagram showing the relationship between geography, region pair, region, and availability zone.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-core-architectural-components-of-azure/media/region-pairs-7c495a33-85c0fa20.png)

#### Additional advantages of region pairs:

- If an extensive Azure outage occurs, one region out of every pair is prioritized to make sure at least one is restored as quickly as possible for applications hosted in that region pair.
- Planned Azure updates are rolled out to paired regions one region at a time to minimize downtime and risk of application outage.
- Data continues to reside within the same geography as its pair (except for Brazil South) for tax- and law-enforcement jurisdiction purposes.

 Important

Most regions are paired in two directions, meaning they are the backup for the region that provides a backup for them (West US and East US back each other up). However, some regions, such as West India and Brazil South, are paired in only one direction. In a one-direction pairing, the Primary region does not provide backup for its secondary region. So, even though West India’s secondary region is South India, South India does not rely on West India. West India's secondary region is South India, but South India's secondary region is Central India. Brazil South is unique because it's paired with a region outside of its geography. Brazil South's secondary region is South Central US. The secondary region of South Central US isn't Brazil South.

### Sovereign Regions

- In addition to regular regions, Azure also has sovereign regions. Sovereign regions are instances of Azure that are isolated from the main instance of Azure. You may need to use a sovereign region for compliance or legal purposes.
- Azure sovereign regions include:
- US DoD Central, US Gov Virginia, US Gov Iowa and more: These regions are physical and logical network-isolated instances of Azure for U.S. government agencies and partners. These datacenters are operated by screened U.S. personnel and include additional compliance certifications.
- China East, China North, and more: These regions are available through a unique partnership between Microsoft and 21Vianet, whereby Microsoft doesn't directly maintain the datacenters.