
# Containers and Cloud Build


## 1. Containers Refresher #containers

- **Definition:** container-based virtualization is an alternative to hardware virtualization (traditional VMs) that uses `built-in capabilities of modern operating systems` to isolate environments from one another
- containers are a `preferred method for packaging and deploying applications`
- containers can be deployed to both `Cloud Run` and `GKE`

### Containers vs Virtual Machines

| aspect                | virtual machines                                       | containers                                                                        |
| :-------------------- | :----------------------------------------------------- | :-------------------------------------------------------------------------------- |
| **isolation method**  | each VM has its own `instance of the operating system` | uses OS-level features — `namespaces` and resource limits — to isolate processes  |
| **boot time**         | typically `a minute or more`                           | boots in a `fraction of a second`                                                 |
| **resource usage**    | resource-heavy due to full OS per VM                   | lightweight — configured with a `minimal set of software libraries` to do the job |
| **abstraction level** | abstracts the whole virtual computer                   | abstracts `just the OS`                                                           |

- **How container isolation works:**
	- a process is a running program
	- in Linux and Windows, the `memory address spaces of running processes` have long been isolated from one another
	- containers build on this isolation by taking advantage of additional OS features — `namespaces` (giving processes their own isolated view of the system) and `resource limits` (restricting other processes' access to resources)
	- a `lightweight container runtime` handles the plumbing — launching the container, calling into the kernel as necessary, and determining the `image format`

### Three Key Benefits of Containers

- **separation of responsibility:**
	- developers focus on `application logic and dependencies`
	- IT operations teams manage deployment without worrying about application details like `software versions and configurations`
- **workload portability:**
	- containers are lightweight and can run `virtually anywhere` — developer laptop, on-premises VM, or any cloud
	- the same application tested on a developer's laptop and in integration can run in production
	- simplifies promotion during the development lifecycle and lets you `move workloads between clouds and data centers` with minimal effort
- **application isolation:**
	- containers virtualize `CPU, memory, storage, and network resources` at the OS level
	- containerized applications on the same hardware can use `different versions of dependencies` without affecting each other

### Container Images

- a container image is a `complete package` containing the application binary and all software required to run
- deploying the `same container image` in dev, test, and production environments ensures your application `performs the same way in each environment`


---


## 2. Cloud Build #Cloud_Build

- **Definition:** Cloud Build is a `fully managed service` that lets you set up build pipelines to create a Docker container image for your application and push the image to Artifact Registry
- you don't need to download build tools or container images to a build machine, or `manage your own build infrastructure`

### Build Triggers

- you create a `build trigger` that is executed based on a `trigger type`
- trigger types specify whether a build should be triggered based on:
	- commits to a `particular branch` in a repository
	- commits that contain a `particular tag`
- by using Artifact Registry and Cloud Build, you can create pipelines that are `automatically triggered` when you commit code to a repository

### Build Configuration

- you create a `build configuration file` that specifies the steps in the build pipeline
- the configuration can be specified in `YAML or JSON` format
- **steps** are analogous to commands or scripts that you execute to build your application
- each build step is a `Docker container` invoked by Cloud Build when the build is executed
- the `step name` identifies the container to invoke for the build step
- the `images` attribute contains the name of the container image to be created by this build configuration

### How /workspace Works

- Cloud Build mounts your source code into the `/workspace` directory of the Docker container associated with a build step
- artifacts produced by each build step are `persisted in the /workspace folder` and can be used by the following build step
- think of `/workspace` as a `shared volume` that passes data between build steps

### Build Output

- Cloud Build `automatically pushes` the built container image to Artifact Registry
- in Artifact Registry, you can view the `status and history of builds` for a given container
- Cloud Build can also publish `build status notifications to Pub/Sub` — you can subscribe to these notifications to act based on build status or other attributes


---


## 3. Tips & Tricks

- for the PCD exam, remember the three container benefits: `separation of responsibility`, `workload portability`, and `application isolation` — these are common exam topics
- the `/workspace` directory is the key mechanism for passing artifacts between build steps — if a step produces a file that the next step needs, it must be written to `/workspace`
- Cloud Build's Pub/Sub integration is useful for triggering downstream actions — e.g., sending a Slack notification on build failure or triggering a Cloud Run function to update a deployment tracker
- `NOTE:` even though build steps are described as Docker containers, you don't need Docker installed locally — Cloud Build runs everything server-side on Google Cloud infrastructure
