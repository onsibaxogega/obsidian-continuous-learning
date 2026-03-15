# M1: Describe cloud computing

## U1: Introduction to Microsoft Azure Fundamentals
|**AZ-900 Domain Area**|**Weight**|
|---|---|
|Describe cloud concepts|25-30%|
|Describe Azure architecture and services|35-40%|
|Describe Azure management and governance|30-35%|


## U2: Introduction to cloud computing

### Module learning objectives:

After completing this module, you’ll be able to:
- Define cloud computing.
- Describe the shared responsibility model.
- Define cloud models, including public, private, and hybrid.
- Identify appropriate use cases for each cloud model.
- Describe the consumption-based model.
- Compare cloud pricing models.


## U3: What is cloud computing?

- #Cloud_computing is the delivery of `computing / IT services` over the internet.

### Features:

- Available for use in only a few minutes
- Only pay for what you use
- No contract or long-term commitment

### Cloud computing provides:

 - Reduced up-front investment required
 - Ongoing, monthly cost savings to the business
 - Vast catalog of computing services that you are able to use to serve your customers that wouldn’t otherwise be available to you
`... with increased performance, availability and security to the end user`



## U4: Describe the shared responsibility model

- The #shared_responsibility_model is a cloud computing framework that dictates how security, maintenance, and management tasks are divided between the cloud service provider and the consumer based on the type of cloud service being used (IaaS, PaaS, or SaaS).
### When using a cloud provider, you’ll always be responsible for:

- The information and data stored in the cloud
- Devices that are allowed to connect to your cloud (cell phones, computers, and so on)
- The accounts and identities of the people, services, and devices within your organization

### The cloud provider is always responsible for:

- The physical datacenter
- The physical network
- The physical hosts

### Your service model will determine responsibility for things like:

- Operating systems
- Network controls
- Applications
- Identity and infrastructure

![Diagram showing the responsibilities of the shared responsibility model.|696](https://learn.microsoft.com/en-us/training/wwl-azure/describe-cloud-compute/media/shared-responsibility-b3829bfe.svg)



## U5: Define cloud models

- Cloud models define the `deployment type` of cloud resources.
- The three main cloud models are: private, public, and hybrid.

### Private cloud

- A private cloud is a cloud computing environment where all hardware, software, and underlying infrastructure are `dedicated exclusively to a single organization`
- a private cloud `may be hosted from`:
	- your on-site datacenter,
	- dedicated datacenter offsite,
	- third party that has dedicated that datacenter to your company

### Public cloud

- A public cloud is built, controlled, and maintained by a third-party cloud provider.
- Anyone that wants to purchase cloud services can access and use resources.

### Hybrid cloud

- A hybrid cloud is a computing environment that uses both public and private clouds in an inter-connected environment.
- Can be used to allow a private cloud to surge for increased, temporary demand by deploying public cloud resources.
- Hybrid cloud can be used to provide an extra layer of security. For example, users can flexibly choose which services to keep in public cloud and which to deploy to their private cloud infrastructure.

| **Public cloud**                                                      | **Private cloud**                                                  | **Hybrid cloud**                                                  |
| --------------------------------------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------- |
| No capital expenditures to scale up                                   | Organizations have complete control over resources and security    | Provides the most flexibility                                     |
| Applications can be quickly provisioned and deprovisioned             | Data is not collocated with other organizations’ data              | Organizations determine where to run their applications           |
| Organizations pay only for what they use                              | Hardware must be purchased for startup and maintenance             | Organizations control security, compliance, or legal requirements |
| Organizations don’t have complete control over resources and security | Organizations are responsible for hardware maintenance and updates |                                                                   |

### Multi-cloud

- In a multi-cloud scenario, you use multiple public cloud providers.
#### Potentially due to:
- you use different features from different cloud providers
- you are in the process of migrating to a different provider
- you need fault tolerance when one platform is unavailable



## U6: Describe the consumption-based model

- The #consumption-based_model is a cloud computing pricing strategy that shifts IT spending away from the upfront CapEx of purchasing physical infrastructure and instead relies on `a pay-as-you-go OpEx structure` where you are only billed for the resources you actively use.

### It can help you:
- Plan and manage your operating costs.
- Run your infrastructure more efficiently.
- Scale as your business needs change.

---




# M2: Describe the benefits of using cloud services


## U1: Introduction

### Learning objectives

After completing this module, you’ll be able to:

- Describe the benefits of high availability and scalability in the cloud.
- Describe the benefits of reliability and predictability in the cloud.
- Describe the benefits of security and governance in the cloud.
- Describe the benefits of manageability in the cloud.



## U2: Describe the benefits of high availability and scalability in the cloud

- When building or deploying a cloud application, two of the biggest considerations are uptime (or availability) and the ability to handle demand (or scale).

### High Availability

- **Definition:** Ensuring maximum availability of applications, services, or IT resources when needed, regardless of disruptions or events.
- **Service-Level Agreements (SLAs):** Azure guarantees specific uptime percentages depending on the service you are using. You must account for these guarantees when architecting your solution.

### Scalability

- **Definition:** The ability to adjust resources to meet demand (e.g., adding resources to handle sudden peak traffic so systems are not overwhelmed).
- **Cost Efficiency:** Tied directly to the consumption-based model. Because you only pay for what you use, you can reduce resources and cut costs when demand drops, ensuring you aren't overpaying.

#### Types of Scaling

- **Vertical Scaling (Scaling Up / Down):**
    - Focuses on increasing or decreasing the _capabilities_ of a resource.
    - _Example:_ Adding more processing power (CPUs or RAM) to a single virtual machine (scaling up), or lowering the specifications if you over-specified your needs (scaling down).

- **Horizontal Scaling (Scaling Out / In):**
    - Focuses on adding or subtracting the _number_ of resources.
    - _Example:_ Adding additional virtual machines or containers during a steep jump in demand (scaling out), or removing them when demand drops (scaling in). This can be configured to happen either automatically or manually.



## U3: Describe the benefits of reliability and predictability in the cloud


### Reliability

- **Definition:** The ability of a system to recover from failures and continue to function.
	- It is one of the foundational pillars of the `Microsoft Azure Well-Architected Framework`.
- **Decentralized Design:** The cloud naturally supports a reliable and resilient infrastructure by allowing resources to be deployed in regions around the world.
    - If one region experiences a catastrophic event, other regions remain up and running.
    - Applications can be designed to automatically take advantage of this, and in some cases, the cloud environment will automatically shift to a different region for you with no manual action needed.

### Predictability

- Predictability is also heavily influenced by the `Microsoft Azure Well-Architected Framework`.
- It is generally categorized into two main focuses: performance predictability and cost predictability.
#### Performance Predictability

- **Definition:** Predicting the resources needed to deliver a positive experience for your customers.
- It is supported by core cloud concepts, including:
    - **Autoscaling:** Automatically deploying additional resources to meet sudden demand, and scaling them back when demand drops.
    - **Load balancing:** Redirecting heavy traffic overloads to less stressed areas of the system.
    - [[#High Availability]].

#### Cost Predictability

- **Definition:** Predicting or forecasting the cost of your cloud spend.
- Achieved by tracking resource use in real-time, monitoring efficiency, and applying data analytics to find patterns and trends to plan future deployments.
- **Tools:** You can use Azure tools like the `Total Cost of Ownership (TCO)` or the `Pricing Calculator` to get an estimate of potential cloud spend before deploying.



## U4: Describe the benefits of security and governance in the cloud

- By establishing a good governance footprint early, you can keep your cloud footprint updated, secure, and well-managed.

### Governance & Compliance

- Cloud features naturally support governance and compliance, whether you are deploying infrastructure as a service or software as a service.
- **Templates:** Set templates help ensure that all your deployed resources meet corporate standards and government regulatory requirements.
	- As standards change, you can update all your deployed resources to align with the new standards.
- **Cloud-based auditing:** Helps flag any resource that is out of compliance with your corporate standards and provides mitigation strategies.
- Depending on your operating model, software patches and updates may automatically be applied, which aids both governance and security.

### Security

- You can find a cloud solution that matches your specific security needs by choosing the right service model:
    - **IaaS (Infrastructure as a Service):** Best for maximum control. Provides physical resources but lets you manage the operating systems and installed software, including patches and maintenance.
    - **PaaS (Platform as a Service) / SaaS (Software as a Service):** Best if you want patches and maintenance taken care of automatically.
- **DDoS Protection:** Because the cloud is built for the over-the-internet delivery of IT resources, cloud providers are inherently well-suited to handle `distributed denial of service (DDoS) attacks`, making your network more robust and secure.


## U5: Describe the benefits of manageability in the cloud

- 2 types of manageability for cloud:
### Management of the cloud

- **Management of the cloud** speaks to managing your cloud resources.
- In the cloud, you can:
	- Automatically scale resource deployment based on need.
	- Deploy resources based on a preconfigured template, removing the need for manual configuration.
	- Monitor the health of resources and automatically replace failing resources.
	- Receive automatic alerts based on configured metrics, so you’re aware of performance in real time.

### Management in the cloud

- **Management in the cloud** speaks to how you’re able to manage your cloud environment and resources.
- i.e., `mechanisms to conduct "management of the cloud"`. These include:
	- Through a web portal.
	- Using a command line interface.
	- Using APIs.
	- Using PowerShell.

---




# M3: Describe cloud service types


## U1: Introduction

### Learning objectives

- After completing this module, you’ll be able to:
	- Describe infrastructure as a service (IaaS).
	- Describe platform as a service (PaaS).
	- Describe software as a service (SaaS).
	- Identify appropriate use cases for each cloud service (IaaS, PaaS, SaaS).



## U2: Describe Infrastructure as a Service

- With IaaS, you’re essentially renting the hardware in a cloud datacenter, but what you do with that hardware is up to you.
### The cloud provider is responsible for maintaining:
- the hardware, 
- network connectivity (to the internet), 
- and physical security.
### You’re responsible for everything else: 
- operating system installation, configuration, and maintenance; 
- network configuration;
- database and storage configuration; 
- ... and so on.

### Some common scenarios where IaaS might make sense include:

#### Lift-and-shift migration:
- You’re setting up cloud resources similar to your on-prem datacenter, and then simply moving the things running on-prem to running on the IaaS infrastructure.
#### Testing and development: 
- You have established configurations for development and test environments that you need to rapidly replicate.
	- You can start up or shut down the different environments rapidly with an IaaS structure, while maintaining complete control.




## U3: Describe Platform as a Service

- Platform as a service (PaaS) is a middle ground between renting space in a datacenter (infrastructure as a service) and paying for a complete and deployed solution (software as a service). 
- It is well suited to `provide a complete development environment without the headache of maintaining all the development infrastructure.`
- ### In a PaaS environment, the cloud provider maintains:
	- the physical infrastructure,
	- physical security,
	- and connection to the internet,
	- the operating systems, 
	- middleware, development tools, 
	- and business intelligence services that make up a cloud solution. 
- In a PaaS scenario, you don't have to worry about the licensing or patching for operating systems and databases.
- Depending on the configuration, you or the cloud provider may be responsible for **networking settings and connectivity within your cloud environment, network and application security, and the directory infrastructure.**

### Scenarios

- Some common scenarios where PaaS might make sense include:

#### Development framework: 
- PaaS **provides a framework that developers can build upon to develop or customize cloud-based applications.**
- Cloud features such as scalability, high-availability, and multi-tenant capability are included, reducing the amount of coding that developers must do.
#### Analytics or business intelligence: 
- **Tools provided as a service with PaaS allow organizations to analyze and mine their data,** finding insights and patterns and predicting outcomes to improve forecasting, product design decisions, investment returns, and other business decisions.




## U4: Describe Software as a Service

- With SaaS, you’re essentially renting or using a fully developed application.
- **Examples:**
	- email, 
	- financial software, 
	- messaging applications,
	- and connectivity software

- While the SaaS model may be the least flexible, it’s also the easiest to get up and running. It requires the least amount of technical knowledge or expertise to fully employ.
- ### In a SaaS environment you’re responsible for:
	- the data that you put into the system,
	- the devices that you allow to connect to the system,
	- and the users that have access.
- Nearly everything else falls to the cloud provider

---