- **Modules:**

---

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
- 
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


----> continue from here:
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