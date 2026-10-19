
# Kubernetes & GKE — Core Concepts

> `Kubernetes` is an open-source platform for managing containerized workloads and services. It orchestrates containers across many hosts, scales them as microservices, and handles rollouts and rollbacks. `Google Kubernetes Engine (GKE)` bootstraps Kubernetes so you can skip the manual cluster setup. #GCP_Kubernetes #GCP_GKE


---


## 1. Core Architecture

- **Definition:** at the highest level, Kubernetes is `a set of APIs` that you use to deploy containers on a set of nodes called a `cluster`
- **Two major components:**
	- **control plane:** a set of `primary components` that manage the cluster's state and scheduling
	- **nodes:** computing instances that `run containers`

> `NOTE:` a "node" in Kubernetes means a `computing instance` (like a machine) — this is different from a "node" on Google Cloud, which specifically refers to a `virtual machine running in Compute Engine`


---


## 2. Pods

- **Definition:** a `Pod` is the smallest unit in Kubernetes that you can create or deploy — it's a wrapper around one or more containers
- a Pod represents a `running process` on your cluster, either as a component of your application or an entire app
- **one container per Pod** is the general pattern — only package multiple containers into a single Pod if they have a `hard dependency` and need to share networking and storage resources
- each Pod provides:
	- a `unique network IP` and set of ports for your containers
	- `configurable options` that govern how your containers should run

### Running a Pod

```bash
# start a Deployment with a container running inside a Pod
kubectl run <deployment-name> --image=<image-name>

# see all running Pods in your project
kubectl get pods
```


---


## 3. Deployments

- **Definition:** a `Deployment` represents a group of `replicas of the same Pod` and keeps your Pods running even when the nodes they run on fail
- a Deployment could represent a `component of an application` or even an `entire app`
- Deployments are the primary mechanism for ensuring your desired number of Pod replicas are always running

### Scaling a Deployment

```bash
# imperative scaling — e.g., scale to 3 replicas
kubectl scale deployment <deployment-name> --replicas=3

# autoscaling based on CPU utilization
kubectl autoscale deployment <deployment-name> --min=1 --max=5 --cpu-percent=80
```

> `NOTE:` you can also use `autoscaling with other parameters` — e.g., specify that the number of Pods should increase when CPU utilization reaches a certain limit


---


## 4. Services

- **Definition:** a `Service` is an abstraction that defines a `logical set of Pods` and a `policy by which to access them`
- **why Services exist:** as Deployments create and destroy Pods, each Pod gets its own IP address — but those addresses `don't remain stable over time`. A Service provides a `stable endpoint` (fixed IP address) for a set of Pods
- **external access:** Kubernetes can attach an `external load balancer` with a public IP address to a Service so clients outside the cluster can reach it — in GKE, this is created as a `network load balancer`
- any client that reaches the Service's IP address will be `routed to a Pod` behind the Service

### Frontend / Backend Pattern

- _Example:_ if you create two sets of Pods called `frontend` and `backend` and put them behind their own Services:
	- the `backend Pods might change` (scale up/down, redeploy)
	- but `frontend Pods are not aware of this` — they simply refer to the `backend Service` by its stable IP
	- this is `service discovery` in action — services decouple producers from consumers

```bash
# get the external IP of a Service
kubectl get services
```


---


## 5. Imperative vs. Declarative Management

### Imperative (good for learning and testing)

- issue commands directly: `kubectl run`, `kubectl expose`, `kubectl scale`
- works well for `step-by-step` experimentation

### Declarative (the real strength of Kubernetes)

- provide a `configuration file` that tells Kubernetes what your `desired state` looks like
- Kubernetes `determines how to make that happen`
- this is the production-ready approach — all state is `version-controlled` and `reproducible`

```bash
# apply a Deployment config file
kubectl apply -f deployment.yaml

# check Deployment status
kubectl get deployments
kubectl describe deployments
```

> `NOTE:` GitHub CI/CD example: store `deployment.yaml` in your repo, and Cloud Build applies it on merge to main


---


## 6. Rolling Updates

- **problem:** rolling out all changes at once is `risky`
- **solution:** use `kubectl rollout` or update the Deployment config file and run `kubectl apply`
- new Pods are created according to your `update strategy`
- _Example:_ a rolling update strategy that creates `new version Pods individually` and waits for a new Pod to be `available before destroying one of the old Pods`

```yaml
# example rolling update strategy in a deployment.yaml
spec:
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1        # create 1 new Pod at a time
      maxUnavailable: 0   # don't destroy old Pods until new one is ready
```

> `NOTE:` `maxSurge: 1` + `maxUnavailable: 0` is the most conservative strategy — it guarantees `zero downtime` during updates because a new Pod must be healthy before an old one is removed. This is the default you should use for production workloads at Acme Corp.

```bash
# trigger a rollout
kubectl apply -f deployment.yaml

# check rollout status
kubectl rollout status deployment/<deployment-name>

# rollback if something goes wrong
kubectl rollout undo deployment/<deployment-name>
```


---


## 7. Key Kubernetes Primitives — Quick Reference

| Primitive      | What It Is                                             | Key Behavior                                                                |
| :------------- | :----------------------------------------------------- | :-------------------------------------------------------------------------- |
| **Pod**        | smallest deployable unit; wrapper around 1+ containers | unique IP, shared storage/network within the Pod                            |
| **Deployment** | manages replicas of the same Pod                       | ensures desired replica count; handles rolling updates                      |
| **Service**    | stable endpoint for a set of Pods                      | fixed IP; load balances across Pods; decouples consumers from Pod lifecycle |
| **Node**       | a computing instance that runs Pods                    | managed by the control plane; Pods are scheduled onto nodes                 |
| **Cluster**    | the full set of nodes + control plane                  | the top-level Kubernetes environment                                        |


---


## 8. Tips & Tricks

- **declarative over imperative, always** — use `kubectl apply -f` with version-controlled YAML files; reserve imperative commands for debugging and experimentation only
- **one container per Pod unless you have a hard dependency** — the sidecar pattern (e.g., a logging agent alongside your app container) is the main exception
- **Services are the stable contract** — never hardcode Pod IPs; always reference Services by name or ClusterIP
- **rolling updates with `maxUnavailable: 0`** — this ensures zero downtime during deployments
- **exam tip:** if a question asks about the "smallest deployable unit" in Kubernetes, the answer is `Pod` — not container, not Deployment
