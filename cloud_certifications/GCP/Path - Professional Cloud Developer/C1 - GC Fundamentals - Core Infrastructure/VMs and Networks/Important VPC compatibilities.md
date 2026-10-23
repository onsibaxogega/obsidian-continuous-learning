
# VPC Compatibility Features — Routing, Firewalls & Peering


---


## 1. Core Concept

> Google Cloud [[VPC|Virtual Private Cloud]] networks come with `built-in routing tables and a global distributed firewall` — no need to provision or manage these yourself. VPCs also support `cross-project connectivity` via VPC Peering and Shared VPC. #VPC_features

### Why It Matters for Enterprise

- **Managed Networking Primitives:** Google handles the underlying router and firewall infrastructure — your team focuses on defining `rules and policies`, not managing appliances
- **Multi-Project Connectivity:** critical for organizations with `separate GCP projects for dev, test, and prod` — *VPC Peering and Shared VPC* let these environments communicate securely while maintaining project-level [[IAM]] boundaries


---


## 2. Routing Tables

- VPC routing tables are `built-in` — you don't have to provision or manage a router #routing_tables
- **Traffic Forwarding:** used to forward traffic from one instance to another within the same network, `across subnetworks`, or even `between Google Cloud zones`
- **No External IP Required:** routing between instances works `without requiring an external IP address`

> `NOTE:` this is a significant simplification compared to on-prem networking where you'd need to configure and maintain physical or virtual routers — Google Cloud abstracts all of that away.


---


## 3. Firewall Rules

- **Definition:** VPCs provide a `global distributed firewall` that can be controlled to restrict access to instances through both `incoming and outgoing traffic` #firewall_rules
- **No Provisioning Needed:** like routing tables, you don't have to `provision or manage` the firewall infrastructure
- **Network Tags:** firewall rules can be defined through `network tags` on [[cloud_certifications/GCP/Path - Professional Cloud Developer/C1 - GC Fundamentals - Core Infrastructure/VMs and Networks/Compute Engine]] instances — this is the key convenience feature

### Example: Tag-Based Firewall Rules

> Tag all your web servers with `"WEB"`, then write a firewall rule saying that traffic on `ports 80 or 443` is allowed into all VMs with the `"WEB"` tag — `no matter what their IP address happens to be`.

- **Why Tags Matter:** as VMs scale in and out (via [[Compute Engine - Autoscaling & Load Balancing|autoscaling]]), new instances automatically inherit the tag and its associated firewall rules — no manual IP-based rule updates needed


---


## 4. Cross-Project VPC Connectivity

VPCs belong to Google Cloud projects, but what if your `separate dev, test, and prod projects` need their VPCs to communicate?

### VPC Peering

- **Definition:** establishes a `relationship between two VPCs` to exchange traffic #VPC_Peering
- **Use Case:** when two projects need direct network connectivity and are managed by the `same or different teams/organizations`
- **Decentralized:** each side of the peering relationship manages its own VPC independently

### Shared VPC

- **Definition:** uses the full power of `Identity Access Management (IAM)` to control `who and what` in one project can interact with a VPC in another #Shared_VPC
- **Use Case:** when a central networking team needs to manage the network topology while allowing `individual project teams` to deploy resources into shared subnets
- **Centralized Control:** a single `host project` owns the VPC, and `service projects` are attached to it


---


## 5. Tips & Tricks

- **use network tags over IP-based rules:** tags decouple firewall rules from specific IP addresses — this scales much better with autoscaling and dynamic environments
- **least-privilege firewall rules:** default-deny all ingress, then explicitly allow only the ports and tags needed — don't leave broad rules in place from prototyping
- **shared VPC for multi-project orgs:** if you have centralized networking requirements (common in government), Shared VPC gives you `IAM-controlled cross-project networking` without duplicating subnets and firewall rules across projects
- **VPC peering for third-party integration:** when connecting to a partner or vendor's GCP project, VPC Peering is the simpler option since each side retains full control of their own network
- **audit firewall rules regularly:** use `VPC Flow Logs` and `Firewall Rules Logging` to verify that traffic patterns match your expectations — especially important in regulated environments
