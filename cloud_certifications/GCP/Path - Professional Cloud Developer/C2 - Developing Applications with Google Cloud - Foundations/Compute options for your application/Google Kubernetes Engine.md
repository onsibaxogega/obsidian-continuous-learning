
# Google Kubernetes Engine (GKE)


---


## 1. Core Concept

- **Definition:** GKE is a `managed Kubernetes service` on Google infrastructure that helps you deploy, manage, and scale Kubernetes environments for your containerized applications
- **Kubernetes** is a leading open source platform (originally developed at Google, now a `Cloud Native Computing Foundation` project) for deploying, scaling, and operating containers
- Kubernetes provides a framework to run `distributed containerized systems resiliently and at scale`

### What Kubernetes Manages

- scaling application components
- providing network abstractions
- orchestrating failovers
- rolling out deployments
- storage orchestration
- management of secrets and configurations

### Cluster Architecture

- a Kubernetes cluster contains `control plane` and `worker nodes`
- **nodes:** the machines (virtual or physical) that run your applications
- **control plane:** manages the worker nodes and the pods in the cluster
- **pod:** a group of containers that `share networking and storage resources` on the node — the smallest deployable unit in Kubernetes


---


## 2. GKE Standard vs Autopilot

| aspect                  | GKE Standard                                                                                                  | GKE Autopilot                                                                                                          |
| :---------------------- | :------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------- |
| **what Google manages** | control plane, pod scaling, node patching/upgrades, cluster monitoring/availability/reliability               | `entire cluster infrastructure` — control plane, node pools, and nodes                                                 |
| **what you manage**     | underlying nodes and node pools (provisioning, maintenance, lifecycle), security and networking configuration | your workloads only — Google manages everything else                                                                   |
| **GPU/TPU support**     | create node pools of VMs with attached GPUs/TPUs, then allocate resources to workloads                        | specify the GPU/TPU resources you need, GKE `automatically manages nodes` that provide those resources                 |
| **security**            | you configure security settings                                                                               | automatically implements `GKE hardening guidelines` and security/networking best practices; blocks less safe practices |
| **best for**            | advanced configuration flexibility over cluster infrastructure                                                | reducing operational/maintenance costs while improving resource utilization                                            |

- you can use `different modes for different clusters` depending on how much infrastructure control you need
- `NOTE:` GKE uses a `container-optimized operating system` maintained by Google — optimized to scale quickly with a minimal resource footprint


---


## 3. Key GKE Features

### AutoUpgrade

- ensures clusters are always `automatically upgraded with the latest stable version` of Kubernetes

### Auto-Repair

- automatically repairs unhealthy nodes
- performs `periodic health checks` on each node
- if a node is unhealthy: GKE `drains the node` (allowing workloads to gracefully exit), then `recreates the node`

### Auto-Scaling

- adds or removes compute instances in response to changes in `resource requirements of the containers` running inside the cluster
- you can deploy `fixed-size clusters` or configure clusters to automatically scale
- GKE supports scaling of `workloads within a cluster` and scaling of `the cluster itself`

### Auto-Provisioning of Google Cloud Resources

- `persistent disks` are automatically provisioned when you create Kubernetes persistent volumes (storage for stateful applications)
- `network load balancers` are automatically provisioned when you deploy Kubernetes network load balancer services
- `HTTP/HTTPS load balancers` are automatically provisioned when you configure Kubernetes Ingress resources

### Observability

- GKE uses `Cloud Monitoring` and `Cloud Logging` to help you monitor and understand your application's performance and behavior
- has support for `Google Cloud Observability` with integration into troubleshooting and monitoring tools

### Google Cloud Integrations

- **Cloud Build + Artifact Registry:** use private container images securely stored in Artifact Registry to automate deployment
- **IAM:** control access by using accounts and role permissions
- **VPC:** use Google Cloud's networking features
- **Google Cloud Console:** view, inspect, and delete resources in GKE clusters


---


## 4. AI/ML on GKE

- GKE lets you implement a `robust, production-ready AI/ML platform` with all the benefits of managed Kubernetes
- provides infrastructure orchestration that supports `GPUs and TPUs` for training and serving AI/ML workloads at scale
- **Standard mode:** create node pools of VMs with attached GPUs/TPUs, then allocate GPU/TPU resources to containerized workloads on those nodes
- **Autopilot mode:** specify the GPU/TPU resources you need, and GKE `automatically manages nodes` that provide those resources


---


## 5. Deploying Applications to GKE

- deploy and manage containerized applications the same way you would for `any other Kubernetes environment`
- use the `kubectl` command to perform most operational tasks

### YAML Manifests (Best Practice)

- although you can deploy ad-hoc resources directly with `kubectl` commands, the recommended best practice is to use `YAML manifest files` to define configurations
- manifests define:
	- properties of the containers used for application components
	- network services
	- security policies
	- other Kubernetes objects for resilient, scalable, containerized applications

### Deployment Types

- **deployments:** for `stateless components` — Kubernetes continually ensures a specified number of replicas for a pod or (set of pods) is running
- **stateful sets:** for applications that need `persistent storage`

### CI/CD Integration

- generate a new Docker image for each code commit as part of a CI/CD pipeline
- the pipeline can automatically deploy the image to `dev, test, and production environments`
- `Cloud Build` + `Artifact Registry` + `Cloud Deploy` + `GKE` = a strong CI/CD system


---


## 6. When to Use GKE

- your application is containerized and you need `more control over the infrastructure` than Cloud Run provides
- you need to run containers in a `hybrid or multi-cloud environment` — some parts on-premises, others in the cloud
- you need `network protocols other than HTTP/HTTPS`
- you need `GPU/TPU support` for AI/ML workloads at scale
- you need `stateful applications` with persistent storage orchestration
- you want to run `third-party containerized software`
- you need fine-grained control over `scaling, networking, security policies, and secrets management`
- you want managed Kubernetes without the overhead of managing `the cluster itself` (especially with Autopilot)


---


## 7. Tips & Tricks

- for PCD exam prep, know the difference between `Standard` and `Autopilot` — Standard = you manage nodes, Autopilot = Google manages everything including nodes
- the auto-provisioning of load balancers and persistent disks is a key GKE advantage — you define Kubernetes resources (Ingress, PV, Services) and GKE `maps them to Google Cloud resources automatically`
- remember that GKE supports `non-HTTP protocols` — if an exam question mentions TCP/UDP workloads that need container orchestration, GKE is the answer (Cloud Run is HTTP/HTTPS only)
- `kubectl` is for operational tasks, but always prefer `YAML manifests checked into version control` over ad-hoc `kubectl` commands
