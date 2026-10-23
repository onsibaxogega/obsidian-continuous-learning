
# Cloud Run


---


## 1. Core Concept

- **Definition:** Cloud Run is a `fully-managed compute platform` that allows you to run request or event-driven `stateless workloads` without having to worry about servers
- it abstracts away `all infrastructure management` — provisioning, configuring, and managing servers — so you can focus on writing code
- automatically scales up and down `from zero, almost instantaneously`, depending on traffic
- you only pay for the resources you use, rounded up to the `nearest hundred milliseconds` — you never pay for overprovisioned resources
- `NOTE:` Cloud Run charges for `CPU, memory, and networking` consumed during request handling


---


## 2. GPU Support on Cloud Run

- Cloud Run services and functions `can use GPUs`
- GPU on Cloud Run is `fully managed` — no extra drivers or libraries needed
- offers `on-demand availability` without requiring reservations
- instances with GPU configured can `scale down to zero` for cost savings when not in use
- you can configure `one GPU per Cloud Run instance`

### GPU Use Cases

- **AI inference workloads** with large language models
- **compute-intensive non-AI use cases** like video transcoding and 3D rendering

- `NOTE:` Cloud Run *does* support GPUs (but not TPUs); the exam may test this distinction


---


## 3. Deployment Options

all deployment options result in a container image that runs on Google Cloud's `fully-managed and highly-scalable infrastructure`

### 3a. Container Image

- supply any container that uses any base image and runs code in the `programming language of your choice`
- **rules the container must follow:**
	- listen for requests on a port at `0.0.0.0`
	- use `HTTP without TLS` — TLS is terminated by Cloud Run, and requests are proxied to the container without TLS
- deploy container images stored in `Artifact Registry` or `Docker Hub`

### 3b. Source Code

- deploy source code from a single `gcloud run deploy` command
- Cloud Build transforms the code into a container image stored in `Artifact Registry`
- **with a Dockerfile:** the uploaded source is built using that Dockerfile
- **without a Dockerfile:** the language is `automatically detected`, dependencies are fetched, and a production-ready container image using a `secure base image` is built
- supported buildpack languages: `Python, Node.js, Go, Java, Ruby, PHP, .NET`

### 3c. Functions

- deploy `single-purpose functions` that trigger when events are emitted from Cloud infrastructure, services, or supported third-party providers
- you provide only the function code in a supported language — a `buildpack creates the container`
- functions are deployed as `Cloud Run services`
- ideal for `microservices that require a small piece of code` to quickly process data in response to an event

### 3d. Continuous Deployment from GitHub

- Cloud Build automates builds and deployments to Cloud Run when `new commits are pushed to a specific branch` of a Git repository
- deploy source code that includes a Dockerfile or is written in a buildpack-supported language
- for other repository providers, use `Cloud Build and Cloud Deploy` to set up your own CI/CD pipeline to Cloud Run


---


## 4. Developer Workflow

a straightforward three-step process:

1. write your application in your `favorite programming language` — the app should listen for web requests
2. build and package your application into a `container image`
3. deploy the container image to Cloud Run — you get a `unique HTTPS URL`

- Cloud Run starts your container `on demand` to handle requests and dynamically adds and removes containers to match incoming request volume

### Container-Based vs Source-Based Workflow

- **container-based:** you build the container image yourself — full control over how software is built and how every file is added
- **source-based:** deploy source code instead of a container image — Cloud Run uses `buildpacks` to automatically build a secure container image for you
- buildpacks transform application source code into container images that `can run on any cloud`


---


## 5. Cloud Run Functions — Node.js Example

```javascript
// your function's source code must be exported in a Node.js module
// no need to upload zip files with package dependencies

const functions = require('@google-cloud/functions-framework');

// register an HTTP function
functions.http('myFunction', (req, res) => {
    // process the request
    res.send('Hello from Cloud Run function!');
});
```

```json
// package.json — specify dependencies here
// Cloud Run automatically installs all dependencies before running your code
{
    "name": "my-function",
    "version": "1.0.0",
    "dependencies": {
        "@google-cloud/functions-framework": "^3.0.0"
    }
}
```

- you can use `Cloud Client Libraries` to programmatically interact with other Google Cloud services from your function


---


## 6. Cloud Run Jobs

- Cloud Run jobs work differently from HTTP Cloud Run services
- a job `doesn't listen for and serve HTTP requests` — no need to listen on a port or start a web server
- the job is executed as a `one-off task or as part of a workflow`
- use `Cloud Scheduler` to run a job on a regular schedule
- when a Cloud Run job finishes, the `job exits`

### Task Execution

- each job can be composed of a `single task or multiple independent tasks`
- multiple tasks within a job `can run in parallel` because they are independent
- each task execution is aware of its `task index` (provided via an environment variable)
- tasks that fail can be `automatically retried`
- the `maximum number of parallel tasks` can be specified to avoid overwhelming backend services
- each task within a job runs a `single container image` that runs to completion
- like Cloud Run services, Cloud Run jobs run on a `fully serverless platform` — no infrastructure to manage


---


## 7. Use Cases

- **data processing:** pay for usage, not provisioned resources — you only pay when data is being processed
- **web applications and web APIs:** small or large; scales up when necessary, scales down to zero when not in use
- **event-driven processing:** jobs that run in response to `Pub/Sub or Eventarc events`
- **lightweight ETL operations:** functions for extract, transform, load workflows
- **Pub/Sub message processing:** functions that process messages published to a Pub/Sub topic
- **webhook targets:** functions that allow applications or services to make direct HTTP calls to invoke microservices
- **AI inference:** GPU-enabled Cloud Run services for LLM inference workloads


---


## 8. Tips & Tricks

- for the PCD exam, remember Cloud Run's deployment options: `container image`, `source code` (with or without Dockerfile), `functions`, and `continuous deployment from GitHub`
- the key exam signal for Cloud Run is `stateless, HTTP/gRPC, fully managed, scale to zero` — if a question mentions any combination of these, Cloud Run is likely the answer
- Cloud Run now supports `GPUs` (one per instance, scale to zero) — but *not* TPUs; if the question mentions TPUs, the answer is Compute Engine or GKE
- Cloud Run `terminates TLS for you` — your container should listen on plain HTTP; this is a common gotcha in exam questions about container requirements
- Cloud Run jobs are the answer when the question describes `batch processing or scheduled tasks that run to completion` — they don't need HTTP listeners
- for a Cloud Build + GitHub Enterprise workflow, the continuous deployment option maps directly — push to a branch, Cloud Build creates the image, deploys to Cloud Run
