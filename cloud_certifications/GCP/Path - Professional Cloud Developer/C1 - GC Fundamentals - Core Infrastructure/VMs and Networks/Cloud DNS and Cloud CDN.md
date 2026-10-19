
# Cloud DNS & Cloud CDN — Name Resolution & Content Delivery


---


## 1. Core Concept

> `Cloud DNS` is a managed DNS service that runs on the `same infrastructure as Google`, and `Cloud CDN` is a content delivery network that uses Google's `global system of edge caches` to accelerate content delivery. Together, they ensure your applications are `discoverable and fast` for users worldwide. #Cloud_DNS #Cloud_CDN

### Google's Public DNS (8.8.8.8)

- **Definition:** one of the most famous free Google services — a `public Domain Name Service` available to the world
- **What DNS Does:** translates `internet hostnames to addresses`
- **Google's Advantage:** Google has a `highly developed DNS infrastructure`, and makes `8.8.8.8` available so everyone can take advantage of it


---


## 2. Cloud DNS

- **Definition:** a `managed DNS service` that helps the world find applications built in Google Cloud #Cloud_DNS
- **Low Latency & High Availability:** a `cost-effective way` to make your applications and services available to your users
- **Redundant:** DNS information you publish is served from `redundant locations around the world`
- **Programmable:** publish and manage `millions of DNS zones and records` using:
	- the `Cloud console`
	- the `command-line interface`
	- the `API`

> `NOTE:` Cloud DNS supports both `public zones` (for internet-facing records) and `private zones` (for internal resolution within your VPC — e.g., resolving internal service names across your dev, test, and prod projects without exposing them to the public internet).


---


## 3. Cloud CDN

- **Definition:** a `Content Delivery Network` that uses Google's `global system of edge caches` to accelerate content delivery #Cloud_CDN
- **Edge Caching:** caching servers `store content closer to end users` — reducing the distance data has to travel
- **Benefits:**
	- **Lower Latency:** customers experience `lower network latency`
	- **Reduced Origin Load:** the origins of your content experience `reduced load`
	- **Cost Savings:** you can `save money` by serving cached content instead of hitting your origin servers for every request
- **Easy Activation:** after an Application Load Balancer is set up, Cloud CDN can be enabled with `a single checkbox`
	> **NOTE**: Cloud CDN is available for external ALBs only.

### CDN Interconnect

- **Third-Party CDNs:** if you're already using another CDN, chances are it's part of Google Cloud's `CDN Interconnect partner program`
- **Continuity:** you can `continue to use` your existing CDN provider alongside or instead of Cloud CDN


---


## 4. Tips & Tricks

- **enable Cloud CDN for static assets immediately:** if you're already using an Application Load Balancer (which Cloud Run routes through), it's literally a single checkbox — low effort, high impact
- **use private DNS zones for internal services:** keep internal hostnames like `api.internal.acme.corp` resolvable only within your VPC — no public exposure, no split-horizon hacks
- **set appropriate cache TTLs:** overly long TTLs mean stale content; overly short TTLs negate the caching benefit — start with `1 hour` for static assets and tune from there
- **programmable DNS for IaC:** manage your Cloud DNS zones and records via [[Terraform]]'s `google_dns_managed_zone` and `google_dns_record_set` resources — keep DNS configuration version-controlled alongside your infrastructure
- **monitor cache hit ratios:** use Cloud Monitoring to track your CDN's `cache hit ratio` — if it's low, review your cache-control headers and origin response configuration
- **8.8.8.8 for troubleshooting:** when debugging DNS resolution issues locally or in your Proxmox homelab, `8.8.8.8` is a reliable external resolver to test against
