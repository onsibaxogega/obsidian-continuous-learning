
# Compute Engine — Autoscaling & Load Balancing


---


## 1. Core Concept

> `Autoscaling` in [[Compute Engine]] allows VMs to be `automatically added to or subtracted from` an application based on `load metrics`. Combined with `load balancing`, this forms the foundation of elastic, resilient infrastructure on Google Cloud. #Autoscaling

- **Scaling Out vs. Scaling Up:** most Google Cloud customers start with `scaling out (horizontal)`, not `scaling up (vertical)` — even though Compute Engine supports very large VM configurations
- **Two-Part System:**
	- **Autoscaling:** dynamically adjusts the `number of VM instances` based on demand
	- **Load Balancing:** distributes `incoming traffic` evenly among the available VMs

### Why It Matters for Enterprise

- **Cost Efficiency:** autoscaling ensures you're only running the VMs you actually need — no over-provisioning during low-traffic periods, no under-provisioning during spikes
- **Resilience:** distributing traffic across multiple VMs (and zones) protects against single points of failure
- **Operational Simplicity:** Google manages the scaling mechanics — your team focuses on defining the `load metrics and thresholds`


---


## 2. Autoscaling

- **Definition:** a [[Compute Engine]] feature that automatically adds or removes VMs from a `managed instance group` based on load metrics #Autoscaling
- **Load Metrics:** scaling decisions are driven by metrics such as `CPU utilization`, `HTTP load balancing serving capacity`, or `custom Cloud Monitoring metrics`
- **Scale Out (Horizontal):** add more VM instances to handle increased load — the preferred approach for most workloads
- **Scale In:** remove VM instances when demand drops, reducing cost

> `NOTE:` autoscaling works with `managed instance groups (MIGs)` — you define an instance template and the autoscaler handles the rest.


---


## 3. Load Balancing

- **Definition:** Google's **VPC** supports several different kinds of `load balancing` to distribute incoming traffic among VMs #load_balancing
- **Purpose:** the other half of the autoscaling equation — once you have multiple VMs, you need to `balance incoming traffic` so no single instance becomes a bottleneck

> `NOTE:` Google Cloud offers multiple load balancer types (HTTP(S), TCP/UDP, internal, external) — the right choice depends on whether your traffic is internal or external, and whether it's HTTP or raw TCP/UDP. 

---


## 4. Large VMs & Machine Family Constraints

- **Large VMs:** Compute Engine supports `very large VM` configurations — great for workloads like `in-memory databases` and `CPU-intensive analytics`
- **Machine Family Limits:** the `maximum number of CPUs per VM` is tied to its `machine family`
- **Quota Constraints:** also constrained by the `quota available to the user`, which is `zone-dependent`
- **Reference:** specifications for currently available VM machine types can be found at cloud.google.com/compute/docs/machine-types

> `NOTE:` even though large VMs are available, the general best practice is to `scale out horizontally` first and only scale up when your workload genuinely requires it (e.g., a single large in-memory database that can't be sharded).


---


## 5. Tips & Tricks

- **default to scaling out:** horizontal scaling with autoscaling + load balancing is more resilient and cost-effective than vertically scaling a single large VM
- **set appropriate cooldown periods:** avoid flapping (rapid scale-in and scale-out cycles) by configuring `stabilization windows` on your autoscaler
- **use custom metrics for smarter scaling:** CPU utilization is the default, but `custom Cloud Monitoring metrics` (e.g., queue depth, request latency) can trigger scaling decisions that better match your application's actual behavior
- **check your quotas:** the maximum vCPUs per VM is `zone-dependent` — if you need large VMs, verify your quota in the target zone before deploying
- **combine with [[Cloud Run]] for serverless:** for workloads already on Cloud Run, autoscaling is fully managed — consider Compute Engine autoscaling only when you need `VM-level control` that Cloud Run doesn't offer
