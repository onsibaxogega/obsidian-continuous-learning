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

- `Azure` is a continually expanding set of cloud services that help you meet current and future business challenges.
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

>An #availability_zone is a *physically separate datacenter (or group of datacenters) within an Azure region*
> 	Each availability zone is made up of `one or more datacenters` equipped with `independent power, cooling, and networking.`
> 	 **`An availability zone is set up to be an `isolation boundary`. If one zone goes down, the other continues working.`** 

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

#### Note:

- **Most regions are paired in two directions, meaning they are the backup for the region that provides a backup for them (West US and East US back each other up).**
- **However, some regions, such as West India and Brazil South, are paired in only one direction.** 
	- In a one-direction pairing, the Primary region does not provide backup for its secondary region. So, even though West India’s secondary region is South India, South India does not rely on West India. West India's secondary region is South India, but South India's secondary region is Central India. Brazil South is unique because it's paired with a region outside of its geography. Brazil South's secondary region is South Central US. The secondary region of South Central US isn't Brazil South.

### Sovereign Regions

> #sovereign_regions *are instances of Azure that are isolated from the main instance of Azure.* 

- `You may need to use a sovereign region for compliance or legal purposes.`

#### Azure sovereign regions include:

- **US DoD Central, US Gov Virginia, US Gov Iowa** and more:
	- These regions are physical and logical network-isolated instances of Azure for U.S. government agencies and partners. These datacenters are operated by screened U.S. personnel and include additional compliance certifications.
- **China East, China North**, and more:
- These regions are available through a unique partnership between Microsoft and 21Vianet, whereby Microsoft doesn't directly maintain the datacenters.




## U6: Describe Azure management infrastructure

- The management infrastructure includes Azure resources and resource groups, subscriptions, and accounts.
	- Understanding the hierarchical organization will help you plan your projects and products within Azure.
### Azure resources and resource groups

> A #resource *is the basic building block of Azure: anything you create, provision, deploy, etc. is a resource.* 

- Virtual Machines (VMs), virtual networks, databases, cognitive services, etc. are all considered resources within Azure.

![Diagram showing a resource group box with a function, VM, database, and app included.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-core-architectural-components-of-azure/media/resource-group-eb2d7177-ff67d816.png)

> #resource_groups *are simply groupings of resources.* 

- When you create a resource, `you’re required to place it into a resource group.`
- While a resource group can contain many resources, `a single resource can only be in one resource group` at a time.
- `Some resources may be moved between resource groups`, but when you move a resource to a new group, it will no longer be associated with the former group. 
- Additionally, `resource groups can't be nested`, meaning you can’t put resource group B inside of resource group A.
- Resource groups provide a convenient way to group resources together:
	- `When you apply an action to a resource group, that action will apply to all the resources within the resource group`, e.g.:
		- If you delete a resource group, all the resources will be deleted.
		- If you grant or deny access to a resource group, you’ve granted or denied access to all the resources within the resource group.

- When you’re provisioning resources, it’s good to think about the resource group structure that best suits your needs. For example: 
	- if you’re setting up a temporary dev environment, grouping all the resources together means you can deprovision all of the associated resources at once by deleting the resource group.
	- If you’re provisioning compute resources that will need three different access schemas, it may be best to group resources based on the access schema, and then assign access at the resource group level.
- There aren’t hard rules about how you use resource groups, so consider how to set up your resource groups to maximize their usefulness for you.

### Azure subscriptions

> In Azure, #subscriptions are a *unit of management, billing, and scale*. 
> 	Similar to how resource groups are a way to logically organize resources, *subscriptions allow you to logically organize your resource groups and facilitate billing*.

![Diagram showing Azure subscriptions using authentication and authorization to access Azure accounts.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-core-architectural-components-of-azure/media/subscriptions-d415577b-04961c4b.png)

- `Using Azure requires an Azure subscription.`
	- A subscription provides you with authenticated and authorized access to Azure products and services. 
	- It also allows you to provision resources. 
	- An Azure subscription links to an Azure account, which is an identity in Microsoft Entra ID or in a directory that Microsoft Entra ID trusts.

- **An account can have multiple subscriptions, but it’s only required to have one.** 
- In a multi-subscription account, you can use the subscriptions to configure different billing models and apply different access-management policies. 
- You can use Azure subscriptions to define boundaries around Azure products, services, and resources : There are two types of #subscription_boundaries that you can use:

	- **Billing boundary**: This subscription type determines how an Azure account is billed for using Azure. 
		- You can create multiple subscriptions for different types of billing requirements. Azure generates separate billing reports and invoices for each subscription so that you can organize and manage costs.
	- **Access control boundary**: ==Azure applies access-management policies at the subscription level==, and you can create separate subscriptions to reflect different organizational structures. 
		- An example is that within a business, you have different departments to which you apply distinct Azure subscription policies. This billing model allows you to manage and control access to the resources that users provision with specific subscriptions.

#### Creating additional Azure subscriptions

- Similar to using resource groups to separate resources by function or access, you might want to create additional subscriptions for resource or billing management purposes.
- For example, you might choose to create additional subscriptions to separate:
	- **Environments**: 
		- You can choose to create subscriptions to set up separate environments for `development and testing, security, or to isolate data for compliance reasons`. This design is particularly useful because resource access control occurs at the subscription level.
	- **Organizational structures**: 
		- You can create subscriptions to reflect different organizational structures. `For example, you could limit one team to lower-cost resources, while allowing the IT department a full range`. This design allows you to manage and control access to the resources that users provision within each subscription.
	- **Billing**: 
		- You can create additional subscriptions for billing purposes. Because costs are first aggregated at the subscription level, you might want to create subscriptions to manage and track costs based on your needs. For instance, you might want to create one subscription for your production workloads and another subscription for your development and testing workloads.

### Azure management groups

> Azure #management_groups provide a *level of scope above subscriptions to efficiently manage access, policies, and compliance for those subscriptions.*

- **Useful e.g.:** 
	- if you’re dealing with `multiple applications, multiple development teams, in multiple geographies.`
- When you apply governance conditions to the management groups, all subscriptions within the management group automatically inherit them
> Note: `Management groups can be nested.`

### Management group, subscriptions, and resource group hierarchy

- You can build a `flexible structure of management groups and subscriptions` to organize your resources into a `hierarchy for unified policy and access management.` The following diagram shows an example of creating a hierarchy for governance by using management groups.

![Diagram showing an example of a management group hierarchy tree.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-core-architectural-components-of-azure/media/management-groups-subscriptions-dfd5a108-60f31f5a.png)

#### Examples of hierarchy organization

- **Create a hierarchy that applies a policy**. 
	- You could limit VM locations to the US West Region in a management group called "Production". 
		- This policy will inherit onto all the subscriptions that are descendants of that management group and will apply to all VMs under those subscriptions. 
			- This security policy can't be altered by the resource or subscription owner, which allows for improved governance.
- **Provide user access to multiple subscriptions**. 
	- By moving multiple subscriptions under a management group, `you can create one Azure role-based access control (Azure RBAC) assignment on the management group. `
		- Assigning Azure `RBAC at the management group level means that all sub-management groups, subscriptions, resource groups, and resources underneath that management group would also inherit those permissions.` 
			- One assignment on the management group can enable users to have access to everything they need instead of scripting Azure RBAC over different subscriptions.


####  **Important facts about management groups**

> 	 10,000 management groups can be supported in a single directory.
> 	A management group tree can support up to six levels of depth. This limit doesn't include the root level or the subscription level.
> 	Each management group and subscription can support only one parent.


---






# M2: Describe Azure compute and networking services


## U1: Introduction

- This module introduces you to the compute and networking services of Azure:
	- You learn about three of the compute options (`virtual machines, containers, and Azure functions`). 
	- You also learn about some of the `networking features, such as Azure virtual networks, Azure DNS, and Azure ExpressRoute`.

### Learning objectives

- After completing this module, you’ll be able to:
	- [ ] `Compare compute types`, including container instances, virtual machines, and functions.
	- [ ] Describe `virtual machine options`, including virtual machines (VMs), virtual machine scale sets, virtual machine availability sets, and Azure Virtual Desktop.
	- [ ] Describe resources required for virtual machines.
	- [ ] Describe application `hosting options`, including `Azure Web Apps, containers, and virtual machines.`
	- [ ] Describe `virtual networking`, including the purpose of Azure Virtual Networks, Azure virtual subnets, peering, Azure DNS, VPN Gateway, and ExpressRoute.
	- [ ] Define `public and private endpoints`.


## U2: Describe Azure virtual machines

> `VMs` provide infrastructure as a service `(IaaS)` *in the form of a virtualized server* and *can be used in many ways.*

- Just like a physical computer, `you can customize all of the software running on your VM`. 

### VMs are an ideal choice when you need

- Total control over the operating system (OS).
- The ability to run custom software.
- To use custom hosting configurations.


- As an IaaS offering, you still need to configure, update, and maintain the software that runs on the VM.
- An #image is a *template used to create a VM* and *may already include an OS and other software, like development tools or web hosting environments*.
	- You can create or use an already created image to rapidly(within minutes) provision VMs.

### Scaling VMs in Azure

- You can run single VMs for testing, development, or minor tasks. 
	- Or you can group VMs together to provide high availability, scalability, and redundancy. 
- **Azure can also manage the grouping of VMs for you** with features such as `scale sets` and `availability sets`.

#### Virtual machine scale sets

> Virtual machine #scale_sets *let you create and manage a group of identical, load-balanced VMs.* 

- If you simply created multiple VMs with the same purpose, you’d need to ensure they were all configured identically and then set up network routing parameters to ensure efficiency. 
	- You’d also have to monitor the utilization to determine if you need to increase or decrease the number of VMs.

- Instead, with virtual machine scale sets, Azure automates most of that work. 
	- The number of VM instances can `automatically increase or decrease in response to demand,`
	- or you can set it to `scale based on a defined schedule`. 
	- Virtual machine scale sets also `automatically deploy a load balancer `to make sure that your resources are being used efficiently.
- With virtual machine scale sets, you can build large-scale services for areas such as compute, big data, and container workloads.

#### Virtual machine availability sets

> #availability_sets are designed to *ensure that VMs stagger updates* and have *varied power and network connectivity*, preventing you from losing all your VMs with a single network or power failure.
> 	They help you build a *more resilient, highly available environment.* 

- Availability sets accomplish these objectives by grouping VMs in two ways: `update domain `and `fault domain`.
##### Update domain
- The #update_domain *groups VMs that can be rebooted at the same time*.
	- This setup `allows you to apply updates` while knowing that `only one update domain grouping is offline at a time`. 
	- All of the machines in one update domain update. 
	- An update group going through the update process `is given a 30-minute time to recover before maintenance on the next update domain starts.`
##### Fault domain
- The #fault_domain *groups* your VMs *by common power source* and *network switch*. 
	- This helps protect against a physical power or networking failure by having VMs in different fault domains (thus being connected to different power and networking resources).
	- By default, an availability set splits your VMs across up to three fault domains. 

> **Note**:
> 	There’s `no additional cost for configuring an availability set`. You only pay for the VM instances you create.

### Examples of situations to use VMs

- **During testing and development**
	- VMs provide a quick and easy way to create different OS and application configurations. 
	- Test and development personnel can then easily delete the VMs when they no longer need them.
- **When running applications in the cloud**
- The ability to run certain applications in the public cloud as opposed to creating a traditional infrastructure to run them can provide substantial economic benefits.
	- For example, an application might need to handle fluctuations in demand. Shutting down VMs when you don't need them or quickly starting them up to meet a sudden increase in demand means you pay only for the resources you use.
- **When extending your datacenter to the cloud**
	- An organization can extend the capabilities of its own on-premises network by creating a virtual network in Azure and adding VMs to that virtual network. 
	- Applications like SharePoint can then run on an Azure VM instead of running locally. 
	- This arrangement makes it easier or less expensive to deploy than in an on-premises environment.
- **During disaster recovery**
	- If a primary datacenter fails, you can create VMs running on Azure to run your critical applications and then shut them down when the primary datacenter becomes operational again.

### Move to the cloud with VMs

- VMs are also an excellent choice when you move from a physical server to the cloud (also known as `lift and shift`). 
	- You can create an image of the physical server and host it within a VM with little or no changes. 

### VM Resources

- When you provision a VM, you’ll also have the chance to `pick the resources that are associated with that VM, including:`
	- **Size** (purpose, number of processor cores, and amount of RAM)
	- **Storage disks** (hard disk drives, solid state drives, etc.)
	- **Networking** (virtual network, public IP address, and port configuration)





## U4: Describe Azure virtual desktop

- `Another type of virtual machine` is the Azure Virtual Desktop. 
> #Azure_Virtual_Desktop is a *desktop and application virtualization service that runs on the cloud. It enables you to use a cloud-hosted version of Windows from any location.* 

- Azure Virtual Desktop `works across devices and operating systems, and works with apps that you can use to access remote desktops or most modern browsers.`
### Enhance security

- Azure Virtual Desktop provides `centralized security management for users' desktops with Microsoft Entra ID`. 
	- You can enable `multifactor authentication` to secure user sign-ins. You can also `secure access to data by` assigning granular role-based access controls (`RBACs`) to users.
- With Azure Virtual Desktop, `the data and apps are separated from the local hardware`.
	- The actual desktop and apps are running in the cloud, meaning the r`isk of confidential data being left on a personal device is reduced`.
	- Additionally, `user sessions are isolated` in both single and multi-session environments.

### Multi-session Windows 10 or Windows 11 deployment

- Azure Virtual Desktop lets you use `Windows 10 or Windows 11 Enterprise multi-session`, 
	- the only Windows client-based operating system that enables multiple concurrent users on a single VM. 
- Azure Virtual Desktop also provides a more consistent experience with broader application support compared to Windows Server-based operating systems.




## U5: Describe Azure containers

