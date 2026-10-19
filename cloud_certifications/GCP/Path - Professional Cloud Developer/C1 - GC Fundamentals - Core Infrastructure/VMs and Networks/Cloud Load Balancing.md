
# Cloud Load Balancing — Distributing Traffic at Scale


---


## 1. Core Concept

> `Cloud Load Balancing` is a `fully distributed, software-defined, managed service` that distributes user traffic across multiple instances of an application. #Cloud_Load_Balancing

- **Definition:** the job of a load balancer is to `distribute user traffic across multiple instances` of an application — reducing the risk of performance issues caused by uneven load
- **Fully Managed:** load balancers `don't run in VMs you have to manage` — you don't need to worry about scaling or managing them
- **All Traffic Types:** supports `HTTP/HTTPS`, other `TCP and SSL` traffic, and `UDP` traffic
- **No Pre-Warming:** no need to file a support ticket to warn Google of an incoming traffic spike — `no so-called "pre-warming" is required`

### Why It Matters for Enterprise

- **Elastic by Default:** as your **autoscaler** adds VMs from 4 to 40 (or 400), Cloud Load Balancing automatically distributes traffic to the new instances — zero manual intervention
- **Cross-Region Failover:** includes `automatic multi-region failover` that gently moves traffic in fractions if backends become unhealthy — critical for your team's `separate dev, test, and prod` GCP projects where production uptime is non-negotiable
- **Reactive:** reacts quickly to changes in `users, traffic, network, backend health`, and other related conditions


---


## 2. Load Balancer Classification

Google Cloud classifies load balancers based on the `OSI model layer` they operate at and their specific functionalities:

### Application Load Balancers (Layer 7)

- **OSI Layer:** `application layer (Layer 7)` #Application_Load_Balancer
- **Traffic Type:** designed to handle `HTTP and HTTPS` traffic
- **How It Works:** operates as a `reverse proxy` — distributes incoming traffic across multiple backend instances based on `rules you define`
- **Advanced Features:**
	- `content-based routing` (route traffic based on URL path, host headers, etc.)
	- `SSL/TLS termination` (offload encryption from your backends)
- **Scope:** can be configured for both `internet-facing (external)` and `internal` applications

> `NOTE:` for Cloud Run web applications, the Application Load Balancer is the most common choice — it handles HTTPS termination and can route traffic to different Cloud Run services based on URL paths.

### Network Load Balancers (Layer 4)

- **OSI Layer:** `transport layer (Layer 4)` #Network_Load_Balancer
- **Traffic Type:** efficiently handles `TCP, UDP, and other IP protocols`
- **Two Types:**

#### Proxy Network Load Balancers

- **How It Works:** functions as a `reverse proxy` — terminates client connections and establishes `new ones to backend services`
- **Advanced Traffic Management:** offers advanced traffic management capabilities
- **Hybrid Support:** supports backends located both `on-premises` and in `various cloud environments`

#### Passthrough Network Load Balancers

- **How It Works:** does `not modify or terminate connections` — directly forwards traffic to the backend while `preserving the original source IP address`
- **Use Case:** well-suited for applications that require `direct server return` or need to handle a `wider range of IP protocols`

> `NOTE:` the key distinction is whether you need the load balancer to `terminate the connection` (proxy) or `pass it through untouched` (passthrough). Passthrough preserves the client's source IP — important for logging, geolocation, or security appliances that inspect the original connection.


---


## 3. Comparison Table


| **Feature**                      | **Application LB (L7)**           | **Proxy Network LB (L4)**                   | **Passthrough Network LB (L4)**         |
| :--------------------------- | :---------------------------- | :-------------------------------------- | :---------------------------------- |
| **OSI Layer**                | Layer 7 (Application)         | Layer 4 (Transport)                     | Layer 4 (Transport)                 |
| **Traffic Types**            | HTTP, HTTPS                   | TCP, UDP, other IP                      | TCP, UDP, other IP                  |
| **Operates As**              | Reverse proxy                 | Reverse proxy                           | Direct forwarding                   |
| **Terminates Connections**   | Yes                           | Yes                                     | No                                  |
| **Preserves Source IP**      | No (via headers)              | No                                      | Yes                                 |
| **Content-Based Routing**    | Yes                           | No                                      | No                                  |
| **SSL/TLS Termination**      | Yes                           | Yes                                     | No                                  |
| **Hybrid (On-Prem + Cloud)** | Yes                           | Yes                                     | Limited                             |
| **Best For**                 | Web apps, APIs, microservices | TCP/UDP services needing proxy features | Apps requiring direct server return |


---


## 4. Tips & Tricks

- **application LB for web workloads:** if you're serving HTTP/HTTPS traffic (e.g., to Cloud Run), the Application Load Balancer is almost always the right choice — it gives you content-based routing and SSL termination out of the box
- **no pre-warming needed:** unlike some other cloud providers, Google Cloud's load balancers scale instantly — don't waste time filing capacity requests before a product launch or marketing event
- **use passthrough when source IP matters:** if your backend needs to see the `original client IP` (e.g., for geolocation or rate limiting), choose a passthrough Network Load Balancer — proxy-based LBs replace the source IP with their own
- **proxy network LB for hybrid architectures:** if your state government workloads span `on-premises data centers and GCP`, the proxy Network Load Balancer supports backends in both environments
- **pair with Cloud Armor for DDoS protection:** Cloud Load Balancing integrates with Cloud Armor to provide `DDoS mitigation` and `WAF (Web Application Firewall)` rules — especially important for public-facing government applications
