
# Containers — Introduction

> A `container` is an invisible box around your code and its dependencies with limited access to its own partition of the file system and hardware. It virtualizes the `OS` rather than the hardware, giving you the `scalability of PaaS` with nearly the same `flexibility as IaaS`. #GCP_Containers


---


## 1. Core Concept — The Problem Containers Solve

- **IaaS (VMs) give you flexibility but are heavy:**
	- each developer gets their own OS, access to RAM, file systems, networking interfaces, etc.
	- the smallest unit of compute is `an app with its VM`
	- the guest OS can be `gigabytes in size` and take `minutes to boot`
	- scaling means `copying an entire VM and booting the guest OS` for each new instance — slow and costly
- **PaaS gives you scalability but limits flexibility:**
	- independent scalability of workloads, but you're constrained to the platform's runtime and configuration options
- **containers give you both:**
	- the `independent scalability` of PaaS
	- an `abstraction layer` of the OS and hardware like IaaS
	- in essence, `the OS is being virtualized` — not the hardware

### How a Container Differs from a VM

- only requires `a few system calls` to create
- starts `as quickly as a process` (seconds, not minutes)
- all that's needed on each host is an `OS kernel that supports containers` and a `container runtime`
- makes code `ultra portable` — the OS and hardware can be treated as a `black box`
- you can go from `development → staging → production`, or from your `laptop → the cloud`, without changing or rebuilding anything


---


## 2. Scaling with Containers

- **single container scaling:** you can scale a web server in `seconds` and deploy `dozens or hundreds` of containers on a single host, depending on workload size
- **microservices pattern:** instead of running the whole application in one container, build with `lots of containers, each performing their own function`
	- connect them with `network connections`
	- they become `modular` — deploy easily and `scale independently` across a group of hosts
- **dynamic host management:** hosts can `scale up and down`, and `start and stop containers` as demand changes or as hosts fail

> `NOTE:` the microservices pattern is what makes containers truly powerful — it's not just about packaging one app more efficiently, it's about `decomposing your application into independently scalable, deployable units`


---


## 3. Where GKE Fits In

- **Google Kubernetes Engine (GKE)** acts as a `bridge` between PaaS and IaaS
- provides the `automation of PaaS` with the `granular control of IaaS`
- manages the orchestration of containers across a group of hosts — scheduling, scaling, health checking, and networking

> `NOTE:` Cloud Run is `serverless containers` (PaaS-like), while GKE gives you the `full Kubernetes control plane` when you need more granular orchestration


---


## 4. Key Takeaways

- **VMs virtualize the hardware** — containers `virtualize the OS`
- **containers are fast** — a few system calls to create, starts in seconds, no guest OS to boot
- **portability is the killer feature** — same container image runs identically from dev to staging to prod, from laptop to cloud
- **microservices + containers = independent scalability** — each service scales on its own, fails on its own, deploys on its own
- **GKE bridges PaaS and IaaS** — gives you Kubernetes orchestration with the full power of GCP's infrastructure underneath
