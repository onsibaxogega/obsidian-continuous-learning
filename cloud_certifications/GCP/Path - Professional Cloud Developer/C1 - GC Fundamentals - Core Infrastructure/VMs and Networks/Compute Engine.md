
# Google Compute Engine — IaaS Virtual Machines


---


## 1. Core Concept

> `Compute Engine` is Google Cloud's `Infrastructure as a Service (IaaS)` solution that lets users create and run virtual machines on Google infrastructure. #Compute_Engine #IaaS

- **Definition:** each virtual machine contains the `power and functionality of a full-fledged operating system` — it can be configured much like a physical server
- **No Upfront Investment:** there are no upfront costs, and `thousands of virtual CPUs` can run on a system designed to be `fast and offer consistent performance`
- **Configuration Options:** specify the amount of `CPU power and memory` needed, the `amount and type of storage`, and the `operating system`

### Why It Matters for Enterprise

- **Full Control:** Compute Engine gives you `server-level control` without owning physical hardware — ideal for workloads that need custom OS configurations, specific kernel modules, or legacy software
- **Elastic Scale:** spin up thousands of vCPUs on demand and tear them down when no longer needed — you only pay for what you use


---


## 2. Creating & Configuring Instances

- **Creation Methods:**
	- **Google Cloud console:** `web-based tool` to manage Google Cloud projects and resources
	- **Google Cloud CLI:** command-line interface via the [[Google Cloud SDK]]
	- **Compute Engine API:** programmatic access for automation and [[IaC|Infrastructure as Code]] workflows
- **Supported Images:**
	- `Linux` and `Windows Server` images provided by Google
	- `customized versions` of these images
	- images of `other operating systems`
- **Flexible Reconfiguration:** virtual machines can be `flexibly reconfigured` after creation



---


## 3. Cloud Marketplace

- **Definition:** a quick way to get started with Google Cloud — offers `solutions from both Google and third-party vendors` #Cloud_Marketplace
- **Pre-configured:** no need to manually configure `software, VM instances, storage, or network settings`
- **Modifiable:** many solutions `can be modified before launch` if required
- **Pricing:**
	- most software packages are available at `no additional charge` beyond normal Google Cloud usage fees
	- some images charge `usage fees`, particularly those published by `third parties with commercially licensed software`
	- all show `estimates of their monthly charges` before launch


---


## 4. Pricing & Billing

### Per-Second Billing

- **Billing Model:** Compute Engine bills `by the second` with a `one-minute minimum`
- **Sustained-Use Discounts:** automatically applied to VMs the longer they run — for each VM that runs for `more than 25% of a month`, a discount is applied for `every additional minute` #sustained_use_discounts

### Committed-Use Discounts

- **Definition:** for `stable and predictable workloads`, purchase a specific amount of `vCPUs and memory` at up to a `57% discount` off normal prices
- **Commitment Terms:** `one year` or `three years` #committed_use_discounts

### Spot VMs

- **Definition:** VMs available at up to `90% off` standard pricing — perfect for workloads that `don't require immediate human oversight`, e.g., a batch job analyzing a large dataset #Spot_VMs
- **No Maximum Runtime:** unlike the older `Preemptible` model, Spot VMs `have no maximum runtime` — they can run as long as capacity is available
- **Trade-Off:** Google Cloud reserves the right to `terminate the instance` if those resources are needed elsewhere
- **Design Requirement:** your workload must be designed to be `stopped and restarted without losing progress`

> `NOTE:` Spot VMs are ideal for fault-tolerant batch workloads like data processing pipelines, CI/CD builds, or rendering jobs — anything that can checkpoint and resume.


---


## 5. Storage & Custom Machine Types

### Storage

- **Default High Throughput:** Compute Engine doesn't require a particular option or machine type to get `high throughput between processing and persistent disks` — that's the default, at `no extra cost`

### Custom Machine Types

- **Definition:** choose the exact machine properties of your instances — the `number of virtual CPUs` and the `amount of memory` #custom_machine_types
- **Options:**
	- use a set of `predefined machine types`
	- create your own `custom machine types`
- **Pay for What You Need:** you're not locked into fixed configurations — tailor the machine to the workload

> `NOTE:` custom machine types are especially useful when predefined sizes are either too big (wasting cost) or too small (bottlenecking performance) for your specific workload.


---


## 6. Tips & Tricks

- **start with predefined, graduate to custom:** use predefined machine types for prototyping, then optimize with custom types once you understand your workload's actual resource needs
- **leverage sustained-use discounts passively:** no action required — just keep VMs running and the discounts apply automatically after the 25% threshold
- **committed-use for baseline workloads:** if you have a steady-state workload (e.g., a production database), committed-use discounts can save up to 57%
- **design for preemption with spot VMs:** use checkpointing, `idempotent jobs`, and retry logic to take advantage of up to 90% savings
- **cloud marketplace for quick starts:** when evaluating third-party tools, check Cloud Marketplace first — you get pre-configured deployments with transparent pricing estimates
