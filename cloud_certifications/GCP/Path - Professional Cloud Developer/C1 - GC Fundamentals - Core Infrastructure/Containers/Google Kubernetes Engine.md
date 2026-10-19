
# Google Kubernetes Engine (GKE) — Managed Kubernetes

> `GKE` is a Google-hosted `managed Kubernetes service` in the cloud. The GKE environment consists of multiple `Compute Engine instances` grouped together to form a `cluster`. GKE manages all the control plane components for you — you send Kubernetes API requests to an exposed IP address, and GKE handles everything behind it. #GCP_GKE


---


## 1. Core Concept — GKE vs. Raw Kubernetes

- **what GKE is:** a managed Kubernetes environment where Google provisions and manages `all the control plane infrastructure`
- **what makes it simpler:** you still interact with the standard `Kubernetes API`, but GKE eliminates the need to set up and manage a `separate control plane` yourself
- **cluster composition:** a GKE cluster is a group of `Compute Engine instances` (nodes) managed by the Kubernetes control plane

### Why It Matters

- **for your team at Acme Corp:** you're already on Cloud Run (serverless containers), which abstracts away Kubernetes entirely — GKE is the next step if you ever need `more granular control` over scheduling, networking, or Pod-level configuration than Cloud Run provides
- **exam context:** the key distinction is that GKE is `managed Kubernetes` — Google handles the control plane; you focus on workloads


---


## 2. GKE Modes — Autopilot vs. Standard

### Autopilot (recommended)

- GKE manages the `underlying infrastructure`:
	- node configuration
	- autoscaling
	- auto-upgrades
	- baseline security configurations
	- baseline networking configuration
- **optimized for production**
- **promotes a strong security posture** — secure defaults are applied automatically
- **promotes operational efficiency** — less toil, fewer knobs to turn

### Standard

- **you manage the underlying infrastructure**, including configuring individual nodes
- has the `same functionality as Autopilot`, but you're responsible for configuration, management, and optimization
- choose Standard only if you `require a specific level of configuration control` that Autopilot doesn't expose

> `NOTE:` unless you have a specific reason to manage nodes yourself, `always default to Autopilot` — it's Google's recommended mode and reduces the operational burden significantly. Think of it as the GKE equivalent of choosing Cloud Run over self-managed Compute Engine.


---


## 3. Creating a GKE Cluster

Two methods:

```bash
# via gcloud CLI — creates an Autopilot cluster named "k1" in us-central1
gcloud container clusters create-auto k1 --region us-central1
```

- also available via the **Google Cloud console** (UI)

### Cluster Customization

- GKE clusters support different `machine types`, `number of nodes`, and `network settings`
- you interact with the cluster using standard `Kubernetes commands and resources` to:
	- deploy and manage applications
	- perform administration tasks
	- set policies
	- monitor health of deployed workloads


---


## 4. Advanced Cluster Management Features

Running a GKE cluster includes these managed features from Google Cloud:

- **load balancing:** Google Cloud's load balancing for Compute Engine instances
- **node pools:** designate `subsets of nodes` within a cluster for additional flexibility (e.g., a pool of GPU nodes for ML workloads, a pool of high-memory nodes for caching)
- **automatic scaling:** cluster's `node instance count` scales automatically based on workload demand
- **automatic upgrades:** cluster's `node software` is automatically upgraded
- **node auto-repair:** maintains `node health and availability` — unhealthy nodes are automatically detected and repaired
- **logging and monitoring:** integration with `Google Cloud Observability` (formerly Stackdriver) for full visibility into your cluster

> `NOTE:` these are the features that differentiate GKE from self-managed Kubernetes — on raw Kubernetes, you'd have to set up `node auto-repair`, `auto-upgrades`, and `observability` yourself. GKE bundles them as managed features.


---


## 5. GKE Autopilot vs. Standard — Quick Reference

| Feature | Autopilot | Standard |
| :--- | :--- | :--- |
| **node management** | `Google-managed` | you manage |
| **autoscaling** | built-in, automatic | you configure |
| **auto-upgrades** | automatic | you configure |
| **security baseline** | applied automatically | you configure |
| **networking baseline** | applied automatically | you configure |
| **billing model** | pay per `Pod resources requested` | pay per `node (VM)` regardless of utilization |
| **best for** | most production workloads | workloads requiring specific node-level control |


---


## 6. Tips & Tricks

- **Autopilot first, Standard only if forced** — Autopilot reduces operational overhead dramatically; reserve Standard for edge cases like custom kernel modules, specific GPU configurations, or DaemonSets that Autopilot doesn't support
- **Autopilot billing is more efficient** — you pay for `Pod resource requests`, not for idle node capacity; in Standard mode, you pay for the full VM even if Pods only use 30% of it
- **node pools give you heterogeneous clusters** — in Standard mode, use node pools to mix machine types (e.g., `e2-standard-4` for web services + `n1-highmem-8` for data processing) within the same cluster
- **`gcloud container clusters create-auto`** is the Autopilot creation command — `create` (without `-auto`) creates a Standard cluster; don't mix them up
- **exam tip:** if a question says "managed Kubernetes" or "Google manages the control plane," the answer is `GKE`. If it says "fully managed with no cluster to manage at all," the answer is likely `Cloud Run`
