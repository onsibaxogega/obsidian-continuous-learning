# U1: Introduction

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


# U2: Describe Azure virtual machines

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





# U4: Describe Azure virtual desktop

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




# U5: Describe Azure containers

- Virtual machines are  limited to a single operating system per virtual machine. 
- If you want to run multiple instances of an application on a single host machine, containers are an excellent choice.

### What are containers?

- Containers are a virtualization environment.
> A #container is a *lightweight, executable software package that bundles an application's code with all its required libraries and dependencies, allowing it to run consistently and in isolation across any computing environment by sharing the host machine's operating system kernel rather than booting a full operating system of its own*.

- Much like running multiple virtual machines on a single physical host, you can run multiple containers on a single physical or virtual host. 
- Unlike virtual machines, you don't manage the operating system for a container.
- Containers are lightweight and designed to be created, scaled out, and stopped dynamically.
- It's possible to create and deploy virtual machines as application demand increases, but containers are a lighter weight, more agile method
	- you can quickly restart one if there's a crash or hardware interruption. 
-  Azure supports `Docker: one of the most popular container engines`, among other engines

### Azure Container Instances (ACI)

- Is a PaaS
- You Provide the "Specs"

> #Azure_Container_Instances is the *simplest, most raw way to run a container*. It is literally `just "Containers as a Service."` When you deploy to ACI, you *provide the container image, plus* the **raw hardware specifications**

- **Compute Resources:** You must explicitly tell Azure exactly how many **vCPUs** and how much **Memory (RAM)** to allocate to this specific container.
- **OS Type:** You must specify if the underlying host needs to be Windows or Linux.
- **Exposed Ports:** You tell it exactly which IP ports to open so you can reach it.


- `The mindset:` "Here is my image. Give me 2 vCPUs and 4GB of RAM, open port 80, and just run the thing right now."


### Azure Container Apps (ACA)

- Is a PaaS
- You Provide the "Behavior"
>  #Azure_Container_Apps is *built for complex, event-driven microservices*. When you deploy to ACA, you provide the *container image, plus* the **application-level rules**:
	- **Scaling Rules:** You provide the triggers. You tell ACA, `"Scale this container up if HTTP traffic spikes, or if a message queue gets too long, and scale it to zero if there is no traffic."`
	- **Ingress Configuration:** You provide the routing rules for how web traffic should reach the container.
	- **Microservice Settings:** If your app needs to talk to other containers securely, you provide those environment variables and connection rules.

- `The mindset:` "Here is my app's image. Here is how I want it to behave, scale, and communicate. You handle the servers."

### Azure Kubernetes Service

> #Azure_Kubernetes_Service (AKS) is a *container orchestration service* that manages the lifecycle of containers.

- When you're deploying a fleet of containers, AKS can make fleet management simpler and more efficient.

### Using containers in your solutions

- Containers are `often used to create solutions using a microservice architecture`. 
	- For example, you might split a website into a container hosting your front end, another hosting your back end, and a third for storage. 
		- This split allows you to separate portions of your app into logical sections that can be maintained, scaled, or updated independently.


# U6: Describe Azure functions

> #Azure_Functions is an *event-driven, serverless compute option* that doesn’t require maintaining virtual machines or containers. 

- If you build an app using VMs or containers, those resources have to be “running” in order for your app to function:
	- With Azure Functions, an event wakes the function, alleviating the need to keep resources provisioned when there are no events.


## Benefits of Azure Functions

- **Infrastructure-Free:** Allows you to focus entirely on writing code without managing the underlying servers or platform.
- **Event-Driven:** Designed to execute quickly (in seconds or less) in response to triggers like REST requests, timers, or messages from other services.
- **Auto-Scaling:** Dynamically scales resources up or down to instantly match variable demand.
- **Cost-Efficient:** Uses a true serverless billing model where *Azure only charges for the exact CPU time consumed while the function runs.*
- **State Flexibility:** *
	- _Stateless (Default):_ Restarts completely fresh for every single event.
    - _Stateful (Durable Functions):_ Passes context through the function to track prior activity and build complex workflows.
- **Deployment Portability:** Can be moved out of the serverless environment if needed, allowing for custom scaling, Virtual Network integration, or strict hardware isolation.



# U7: Describe application hosting options

- When hosting applications on Azure, you can choose Virtual Machines for maximum control, containers for robust isolation, or alternative platforms like Azure App Service.

## Azure App Service

> #Azure_App_Service is an *HTTP-based service for hosting web applications, REST APIs, and mobile back ends.* 

- Azure App Service supports multiple technologies, including programming languages like Java, PHP, Python, and JavaScript (via Node.js), as well as frameworks such as .NET and .NET Core. Azure App Service supports both Windows and Linux environments.
- App Service enables you to build and host:
	- web apps,
	- background jobs, 
	- mobile back-ends,
	- and RESTful APIs
	... in the programming language of your choice without managing infrastructure.

- It offers `automatic scaling and high availability. `
- App Service supports Windows and Linux. 
- It enables `automated deployments from GitHub, Azure DevOps, or any Git repo to support a continuous deployment model`.

- Azure App Service lets you focus on building and maintaining your app, and Azure focuses on keeping the environment up and running.

### Types of app services

- With App Service, you can host most common app service styles like:
	- Web apps
	- API apps
	- WebJobs
	- Mobile apps

- App Service `handles most of the infrastructure decisions you deal with in hosting web-accessible apps`:
	- `Deployment` and management are integrated into the platform.
	- `Endpoints` can be secured.
	- Sites can be `scaled` quickly to handle high traffic loads.
	- The built-in `load balancing `and traffic manager provide `high availability.`

- All of these app styles are hosted in the same infrastructure and share these benefits. This flexibility makes App Service the ideal choice to host web-oriented applications.

### Web apps

- App Service includes full support for hosting web apps by using ASP.NET, ASP.NET Core, Java, Ruby, Node.js, PHP, or Python. You can choose either Windows or Linux as the host operating system.

### API apps

- Much like hosting a website, you can build REST-based web APIs by using your choice of language and framework. You get full Swagger support and the ability to package and publish your API in Azure Marketplace. The produced apps can be consumed from any HTTP- or HTTPS-based client.

### WebJobs

- You can use the WebJobs feature to run a program (.exe, Java, PHP, Python, or Node.js) or script (.cmd, .bat, PowerShell, or Bash) in the same context as a web app, API app, or mobile app. 
	- They can be scheduled or run by a trigger. 
	- WebJobs are often used to run background tasks as part of your application logic.

### Mobile apps

- Use the Mobile Apps feature of App Service to quickly build a back end for iOS and Android apps. With just a few actions in the Azure portal, you can:
	- Store mobile app data in a cloud-based SQL database.
	- Authenticate customers against common social providers, such as MSA, Google, X, and Facebook.
	- Send push notifications.
	- Execute custom back-end logic in C# or Node.js.
- On the mobile app side, there's SDK support for native iOS and Android, Xamarin, and React native apps.