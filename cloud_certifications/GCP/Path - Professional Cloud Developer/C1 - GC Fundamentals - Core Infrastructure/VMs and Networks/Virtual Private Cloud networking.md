
# Google Compute Engine — Virtual Networking & VPCs


---


## 1. Core Concept

> A `Virtual Private Cloud (VPC)` is a secure, individual, private cloud-computing model `hosted within a public cloud` — like Google Cloud. #VPC

- Google Cloud Virtual Private Cloud (VPC) provides networking functionality to Compute Engine virtual machine (VM) instances, Kubernetes Engine containers, and App Engine flexible environment.
	- In other words, without a VPC network you cannot create VM instances, containers, or App Engine applications.
	- Therefore, each Google Cloud project has a **default** network to get you started.
- You can think of a VPC network as similar to a physical network, except that it is virtualized within Google Cloud. 
- A VPC network is a global resource that consists of a list of regional virtual subnetworks (subnets) in data centers, all connected by a global wide area network (WAN). VPC networks are logically isolated from each other in Google Cloud.

- **Key Value Proposition:** VPCs combine the `scalability and convenience of public cloud computing` with the `data isolation of private cloud computing`

### Why It Matters for Enterprise

- **Network Foundation:** a VPC is typically the `first thing` users define when starting a new Google Cloud project — it's the foundational networking layer everything else sits on
- **Default VPC:** many users begin by starting with the `default VPC` that Google Cloud provides, then customize from there
- **Isolation + Scale:** you get the security posture of a private network with the `elastic scalability` of the public cloud — critical for enterprise workloads that need both


---


## 2. VPC Network Capabilities

- **Resource Connectivity:** VPC networks connect `Google Cloud resources to each other and to the internet`
- **Network Segmentation:** segment networks into logical pieces to isolate workloads
- **Firewall Rules:** restrict access to instances using `firewall rules`
- **Static Routes:** create static routes to `forward traffic to specific destinations`


---


## 3. Global Scope & Subnets

> `NOTE:` Google VPC networks are `global` — this tends to surprise a lot of new Google Cloud users.

- **Global Networks:** unlike many other cloud providers, a single Google VPC can `span all regions worldwide` without needing peering or additional configuration #global_VPC
- **Subnets:** a `segmented piece of the larger network` that exists within a specific Google Cloud region
	- subnets can `span the zones` that make up a region
	- resources can be in `different zones on the same subnet`
- **Expandable:** the size of a subnet can be increased by `expanding the range of IP addresses` allocated to it — and doing so `won't affect virtual machines` that are already configured

### Why It Matters for Enterprise

- **Simple Global Layout:** this architecture makes it easy to define `network layouts with global scope` — no complex cross-region networking plumbing required
- **Resilience:** resources in different zones on the same subnet can be used to `build solutions that are resilient to disruptions` yet retain a `simple network layout`


---


## 4. Example Architecture

> Consider a VPC network named `vpc1` with two subnets defined in the `asia-east1` and `us-east1` regions.

- **Setup:** `vpc1` has three [[Compute Engine]] VMs attached to it
- **Behavior:** the VMs are `neighbors on the same subnet` even though they're in `different zones`
- **Takeaway:** this demonstrates how Google Cloud's global VPC model lets you distribute resources across zones (and regions) while keeping them logically connected on the same network

![[vpc_global_subnet_layout.png|837]]


---


## 5. Tips & Tricks

- **Start with the default VPC:** Google Cloud auto-creates a default VPC with subnets in every region — great for prototyping before designing a custom network topology
- **Expand subnets without downtime:** you can grow a subnet's IP range at any time without impacting running VMs — plan for growth but don't over-allocate on day one
- **Zone distribution for resilience:** place instances in `different zones on the same subnet` to protect against zone-level failures while keeping networking simple
- **Global VPC = simpler architecture:** take advantage of global scope to avoid the complexity of cross-region VPC peering that other cloud providers require
