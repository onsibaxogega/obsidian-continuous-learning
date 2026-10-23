
# Choosing a Compute Platform


---


## 1. Decision Framework

the core question is: `where should I run my applications?` — the answer is always "it depends"

### Question 1: How Much Infrastructure Control Do I Need?

- **lift-and-shift legacy systems** or `specific licensing/hardware requirements` → Compute Engine
- **containerized apps** with hybrid/multi-cloud systems or `non-HTTP protocols` → GKE
- **stateless containers** with no infrastructure management needed, or `event-driven functions` → Cloud Run

![[compute_options_level_of_control.png|900]]

### Question 2: How Are My Teams Structured?

- **mostly developer-focused teams** → Cloud Run is probably best
- **developers + operations teams** → Cloud Run services and functions when appropriate, plus GKE for hybrid integration and more workload control
- **modernizing over time** (migrated VMs from on-premises) → Compute Engine VMs, with an operations team managing `health and security` of the VMs

### Question 3: What Are My Pricing Requirements?

- **Compute Engine / GKE:** charges based on usage of `dedicated VMs` — predictable charges, ideal when you require `consistent capacity`
- **Cloud Run:** `pay per use` — can result in significant savings, especially when `traffic patterns are inconsistent`


---


## 2. Platform Comparison

| aspect                     | Compute Engine                                         | GKE                                                              | Cloud Run                                                        |
| :------------------------- | :----------------------------------------------------- | :--------------------------------------------------------------- | :--------------------------------------------------------------- |
| **infrastructure control** | full control — you manage OS, software, updates        | Google manages VM nodes; you manage cluster size and app scaling | serverless — deploy your app, Google manages everything          |
| **operational effort**     | highest                                                | medium                                                           | lowest                                                           |
| **stateful apps**          | ✅                                                      | ✅ (stateful sets)                                                | ❌ stateless only                                                 |
| **non-HTTP protocols**     | ✅                                                      | ✅                                                                | ❌ HTTP/gRPC only                                                 |
| **pricing model**          | dedicated VM usage                                     | dedicated VM usage                                               | pay per use (per request)                                        |
| **scaling**                | managed instance groups + autoscaling                  | pod + cluster autoscaling                                        | automatic, scales to zero almost instantaneously                 |
| **best for**               | lift-and-shift, custom OS/licensing, GPU/TPU workloads | container orchestration, hybrid/multi-cloud, stateful containers | stateless services, event-driven functions, inconsistent traffic |


---


## 3. Cloud Run vs App Engine

- **App Engine** is a fully-managed serverless compute environment with two modes: `standard` and `flexible`
- **Cloud Run** is the `latest evolution of Google Cloud serverless`, building on the experience of running App Engine for more than a decade
- Cloud Run offers `much more flexibility` in implementing services, along with improved integrations with Google Cloud and third-party services
- Cloud Run can handle workloads that `cannot run on App Engine`
- Cloud Run scales up and down `almost immediately` in response to traffic spikes
- by default, you pay for Cloud Run services `only when requests are being processed`

- `NOTE:` if you are creating a new service, `use Cloud Run instead of App Engine` — App Engine is effectively legacy at this point


---


## 4. Key Principles

- **you don't need to standardize on a single platform**, even within a single application — larger applications might benefit from using multiple platforms
- **if you don't have complex infrastructure requirements**, start with a `serverless platform` (Cloud Run) that lets you focus on the application instead of the infrastructure
- **you can change your decision later** — most applications written with `cloud client libraries` can be easily moved from platform to platform
- **more control = more operational cost** — as you move from Cloud Run → GKE → Compute Engine, you gain control but take on more operational burden


---


## 5. Tips & Tricks

- for the PCD exam, the decision tree is: `stateless + HTTP + no infra management?` → Cloud Run; `containers + orchestration + hybrid/stateful/non-HTTP?` → GKE; `full control + legacy + licensing + lift-and-shift?` → Compute Engine
- if an exam question mentions `App Engine`, the correct modern answer is almost always `Cloud Run` — Google is steering everything toward Cloud Run for new serverless workloads
- remember the pricing distinction: Compute Engine and GKE charge for `provisioned VMs` (predictable), Cloud Run charges `per use` (variable but potentially much cheaper for bursty traffic)
