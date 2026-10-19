
# Hybrid Connectivity — Connecting Networks to Google Cloud


---


## 1. Core Concept

> Connecting your existing networks — on-premises, other clouds, or remote offices — to your Google Cloud VPC is a fundamental requirement for `hybrid and multicloud architectures`. Google Cloud offers several connectivity options ranging from `internet-based VPN tunnels` to `dedicated private circuits`.

### Why It Matters for Enterprise

- **Private Network Requirement:** (for internal applications) `all users access apps through a VPN or private network` — apps should never be reachable from the public internet. Choosing the right connectivity option is foundational to meeting that requirement.
- **Multi-Environment Strategy:** with e.g., separate GCP projects for dev, test, and prod, plus on-premises infrastructure and an M365/Azure tenant , ... , hybrid connectivity is the glue that ties these environments together.


---


## 2. Cloud VPN

- **Definition:** creates a `"tunnel" connection` over the internet between your on-premises network (or other cloud) and your Google VPC using an encrypted VPN #Cloud_VPN
- **Internet-Based:** traffic traverses the `public internet` but is encrypted within the tunnel
- **Cloud Router:** a Google Cloud feature that makes the VPN connection `dynamic` by exchanging route information using the `Border Gateway Protocol (BGP)` #Cloud_Router
	- if you add a `new subnet` to your Google VPC, your on-premises network will `automatically get routes to it` — no manual route updates required
- **Best For:** when you need `private-to-private connectivity` and your internet connection meets your bandwidth and performance requirements


---


## 3. Peering Options

For scenarios where your `internet connection to Google Cloud isn't performing well` but you don't need private IP addressing:

### Direct Peering

- **Definition:** placing a router in the `same public data center as a Google point of presence` and exchanging traffic between networks #Direct_Peering
- **Google PoPs:** Google has `points of presence around the world`
- **Requirement:** you must already have a footprint in a Google PoP, or be willing to `lease co-location space` and install and support routing equipment
- **No SLA:** peering is `not covered by a Google Service Level Agreement`

### Carrier Peering

- **Definition:** provides `direct access from your on-premises network` through a `service provider's network` to Google Workspace and Google Cloud products #Carrier_Peering
- **How It Works:** for customers who `aren't already in a point of presence` — work with a partner in the `Carrier Peering program` to get connected
- **Exposed via Public IPs:** connectivity to Google products that can be exposed through `one or more public IP addresses`
- **No SLA:** like Direct Peering, `not covered by a Google SLA`

> `NOTE:` peering options provide `public IP-based connectivity` to Google services — they don't provide private IP addressing. For a requirement that apps are never reachable from the public internet, peering alone would not be sufficient.


---


## 4. Interconnect Options

For `private, high-performance, SLA-backed connectivity` to Google Cloud:

### Dedicated Interconnect

- **Definition:** one or more `direct, private connections` to Google — a private circuit direct to Google's network #Dedicated_Interconnect
- **SLA:** if connections have topologies meeting Google's specifications, they can be covered by an SLA of up to `99.99%`
- **VPN Backup:** connections can be `backed up by a VPN` for even greater reliability
- **Requirement:** you must have a footprint or be willing to lease co-lo space and install routing equipment in a `Google point of presence`
- **Best For:** `highest uptimes` for private interconnection

### Partner Interconnect

- **Definition:** connectivity between an on-premises network and a VPC network through a `supported service provider` #Partner_Interconnect
- **When to Use:**
	- your data center `can't reach a Dedicated Interconnect colocation facility`
	- your data needs `don't warrant an entire 10 Gbps connection`
	- you'd `prefer to work with a service provider partner` as an intermediary
- **Flexibility:** can be configured to support `mission-critical services` or `applications that can tolerate some downtime`
- **SLA:** up to `99.99%` if topologies meet Google's specifications
- **Caveat:** Google is `not responsible for any aspects` provided by the third-party service provider, nor any issues `outside of Google's network`

### Cross-Cloud Interconnect

- **Definition:** `high-bandwidth dedicated connectivity` between Google Cloud and `another cloud service provider` #Cross_Cloud_Interconnect
- **How It Works:** Google provisions a `dedicated physical connection` between the Google network and another cloud provider's network — you use this to peer your Google VPC with your network hosted by the other provider
- **Connection Sizes:** `10 Gbps` or `100 Gbps`
- **Multicloud Strategy:** supports `integrated multicloud strategy` with reduced complexity, `site-to-site data transfer`, and `encryption`
- **Best For:** organizations running workloads across multiple cloud providers (e.g., GCP + Azure)


---
## 5. Summary
### Private vs. Public Connectivity

- **Peering** (Direct & Carrier) gives you access to Google services over `public IP addresses` only. You're exchanging traffic with Google's _public-facing_ network. Your on-prem servers **cannot** reach resources inside your GCP VPC using private/internal IPs.
- **Interconnect** (Dedicated & Partner) extends your network directly into your `Google VPC with private IP addressing`. Your on-prem servers **can** talk to GCP resources (like a Cloud SQL instance or a Cloud Run service on an internal ALB) using their private IPs — as if they were on the same network.

### Decision Framework

Three questions to assess your connectivity requirements:

1. **Do any on-premises servers or user computers with `private addressing` need to connect to Google Cloud resources with `private addressing`?**
2. **Does the `bandwidth and performance` of your current connection to Google services meet your business requirements?**
3. **Do you already have, or are you willing to install and manage, `access and routing equipment` in one of Google's point of presence locations?**

#### Decision Path

| **Need Private Connectivity?** | **Internet Performance OK?** | **Willing to Install Equipment at PoP?** | **Recommended Option**                      |
| :------------------------- | :----------------------- | :----------------------------------- | :-------------------------------------- |
| No                         | Yes                      | N/A                                  | Public IP addresses (standard internet) |
| No                         | No                       | Yes                                  | Direct Peering                          |
| No                         | No                       | No                                   | Carrier Peering                         |
| Yes                        | Yes                      | N/A                                  | Cloud VPN                               |
| Yes                        | No                       | Yes                                  | Dedicated Interconnect                  |
| Yes                        | No                       | No                                   | Partner Interconnect                    |
| Multicloud                 | N/A                      | N/A                                  | Cross-Cloud Interconnect                |


---


## 6. Tips & Tricks

- **cloud VPN as your minimum baseline for internal applications:** given a requirement that apps are never publicly reachable, ensure `every cross-network path` is tunneled through Cloud VPN at minimum
- **cloud router for dynamic routing:** always pair Cloud VPN with Cloud Router — static routes break when you add new subnets, BGP-based dynamic routing doesn't
- **dedicated interconnect + VPN backup:** for production workloads requiring `99.99% SLA`, use Dedicated Interconnect as the primary path and Cloud VPN as a failover — this gives you both performance and resilience
- **peering lacks SLA — plan accordingly:** if uptime guarantees matter, peering options should only be used for `non-critical, public-IP traffic` — never as your sole connectivity path for production
