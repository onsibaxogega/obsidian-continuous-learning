
# Cloud Run — Core Concepts

> `Cloud Run` is a managed compute platform that runs `stateless containers` via web requests or Pub/Sub events. It's `serverless` — all infrastructure management is removed so you can focus on developing applications. Built on `Knative`, an open API and runtime environment built on Kubernetes. #GCP_Cloud_Run


---


## 1. Core Concept

- **Definition:** Cloud Run is a `serverless container platform` — you deploy a container image, and Cloud Run handles everything else (scaling, TLS, infrastructure)
- **Built on Knative:** an open-source project built on Kubernetes — this means Cloud Run can be fully managed on Google Cloud, on GKE, or `anywhere Knative runs`
- **Stateless by design:** containers handle web requests or Pub/Sub events and are `started on demand`
- **Key property:** scales up and down from `zero almost instantaneously` — if no requests are coming in, you have zero running containers and pay nothing


---


## 2. Developer Workflow

Cloud Run offers two deployment workflows:

### Container-Based Workflow (standard)

1. **write your application** using your favorite programming language — the app must `start a server that listens for web requests`
2. **build and package** the application into a `container image`
3. **push the container image** to `Artifact Registry` — Cloud Run deploys from there
4. Cloud Run returns a `unique HTTPS URL` and starts your container `on demand` to handle requests

### Source-Based Workflow

- deploy `source code` instead of a container image
- Cloud Run `builds the source and packages it` into a container image automatically
- uses `Buildpacks` (an open-source project) to detect the language and build the container
- useful when you just want to `turn source code into an HTTPS endpoint` without managing a Dockerfile

> `NOTE:` the container-based workflow gives you `more transparency and flexibility` (you control the Dockerfile, base image, and build process). The source-based workflow is faster for prototyping


---


## 3. Key Properties

- **HTTPS serving is handled for you** — you only worry about handling web requests; Cloud Run `adds the encryption` automatically
- **auto-scaling:** dynamically adds and removes containers based on incoming request volume
- **scale to zero:** if no requests are coming in, `no containers are running` and you pay nothing
- **any Linux 64-bit binary:** you can run `any binary compiled for Linux 64-bit` — not just specific languages
- **popular languages:** Java, Python, Node.js, PHP, Go, C++
- **less common languages:** Cobol, Haskell, Perl — as long as your app `handles web requests`, it works

> `NOTE:` "as long as it handles web requests" is the fundamental contract — your app must `listen on a port` (Cloud Run injects the `$PORT` environment variable) and respond to HTTP requests. Everything else is up to you.


---


## 4. Pricing Model

- **pay only for resources used while:**
	- a container is `handling web requests`
	- a container is `starting or shutting down`
- **granularity:** billed down to the nearest `100 milliseconds`
- **zero usage = zero cost:** you don't pay anything if your container doesn't handle requests
- **request fee:** a small fee for every `one million requests` served
- **resource cost scales with size:** a container with more `vCPU and memory` costs more per unit of time

> `NOTE:` this pricing model is fundamentally different from GKE Standard (pay per node) or Compute Engine (pay per VM hour). Cloud Run's model means your `acme-dev-456` dev environment costs `virtually nothing` when idle — a huge advantage for development and testing projects that aren't under constant load.


---


## 5. Cloud Run vs. GKE — Decision Guide

| Feature | Cloud Run | GKE Autopilot | GKE Standard |
| :--- | :--- | :--- | :--- |
| **abstraction level** | `serverless` (no cluster) | managed cluster | self-managed cluster |
| **scaling** | auto, `to/from zero` | auto (not to zero) | you configure |
| **billing** | per request + resource time | per Pod resources | per node (VM) |
| **infrastructure management** | none | minimal | significant |
| **stateful workloads** | not supported | supported | supported |
| **GPU scheduling** | limited | supported | full control |
| **network policies** | basic | supported | full control |
| **best for** | stateless web services, APIs, event-driven | production Kubernetes workloads | workloads needing node-level control |



---


## 6. Tips & Tricks

- **always use the `$PORT` environment variable** — Cloud Run injects it; don't hardcode a port number in your app
- **keep containers fast to start** — Cloud Run starts containers on demand, so `cold start time directly affects request latency`; minimize image size and use lightweight base images (e.g., `distroless`, `alpine`)
- **use Artifact Registry, not Container Registry** — Container Registry is deprecated; `Artifact Registry` is the current standard for storing container images
- **source-based deploys are great for prototyping** — use `gcloud run deploy --source .` to deploy directly from source code without writing a Dockerfile; switch to the container-based workflow for production
- **Cloud Run + Cloud SQL Auth Proxy** — for PostgreSQL connections, use the `Cloud SQL Auth Proxy sidecar` (now natively supported in Cloud Run) instead of allowlisting IPs
- **set minimum instances for production** — while scale-to-zero is great for dev, set `--min-instances=1` (or more) for production services at Acme Corp to eliminate cold starts for user-facing applications
- **exam tip:** if a question mentions `serverless`, `stateless containers`, `HTTPS endpoint`, or `scale to zero`, the answer is almost certainly `Cloud Run`. If it mentions `managing a cluster` or `stateful workloads`, the answer is `GKE`.
