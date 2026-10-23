
# Cloud Run Functions — Event-Driven Compute

> `Cloud Run functions` is a lightweight, event-based, asynchronous compute solution that lets you create small, `single-purpose functions` that respond to cloud events — without the need to manage a server or a runtime environment. #GCP_Cloud_Run_Functions


---


## 1. Core Concept

- **Definition:** Cloud Run functions lets you write `single-purpose functions` that are triggered by cloud events and executed on demand
- **Key property:** you don't manage servers, containers, or runtime environments — you write a function, deploy it, and Google handles everything else
- **Relationship to Cloud Run:** Cloud Run functions is built `on top of Cloud Run` — your function is packaged into a container behind the scenes, but you never interact with the container directly

### The Problem It Solves

- many applications contain `event-driven parts` — e.g., a user uploads an image and it needs to be processed (converted to a standard format, thumbnails generated, stored in a repository)
- you *could* integrate this logic into your main application, but then you'd have to `provision compute resources for it` whether it runs once a millisecond or once a day
- Cloud Run functions lets you write the processing logic as an `isolated function` that runs only when the event occurs

> `NOTE:` this is a key architectural distinction — Cloud Run functions is for `event-driven, single-purpose logic`; Cloud Run (the service) is for `long-running stateless web applications`. They complement each other.


---


## 2. Trigger Types

### Asynchronous Triggers (event-driven)

- **Cloud Storage events:** e.g., a new file is uploaded to a bucket → function fires
- **Pub/Sub events:** e.g., a message is published to a topic → function fires
- these are `asynchronous` — the event source doesn't wait for the function to complete

### Synchronous Triggers (request-driven)

- **HTTP invocation:** the function is exposed as an `HTTPS endpoint` and executes synchronously when called
- the caller `waits for the response`


---


## 3. Supported Languages

- Node.js
- Python
- Go
- Java
- .NET Core
- Ruby
- PHP


---


## 4. Pricing

- billed to the nearest `100 milliseconds`, only while your code is running
- **zero usage = zero cost** — if the function doesn't execute, you pay nothing
- same granularity model as Cloud Run — the key difference is Cloud Run functions is priced per `invocation + execution time`, while Cloud Run is priced per `request + container time`


---


## 5. Cloud Run vs. Cloud Run Functions — When to Use Which

| Feature             | Cloud Run (service)                                | Cloud Run Functions                                          |
| :------------------ | :------------------------------------------------- | :----------------------------------------------------------- |
| **purpose**         | `long-running` stateless web applications and APIs | `short-lived`, single-purpose event-driven logic             |
| **deployment unit** | container image                                    | `source code` (function)                                     |
| **trigger**         | HTTP requests, Pub/Sub                             | Cloud Storage events, Pub/Sub, HTTP                          |
| **startup**         | container cold start                               | function cold start (generally lighter)                      |
| **complexity**      | full application with routing, middleware, etc.    | single function, single responsibility                       |
| **use case**        | web apps, APIs, microservices                      | image processing, file transforms, notifications, glue logic |
| **billing**         | per request + container time                       | per invocation + execution time                              |

> `NOTE:` Cloud Run functions is ideal for `glue logic` and `event-driven processing` in your architecture. For example, at Acme Corp: Cloud Run handles the main web application; Cloud Run functions handles the background tasks (image resize on upload, Pub/Sub message processing, Cloud Storage event reactions).


---


## 6. Tips & Tricks

- **one function = one job** — resist the temptation to put multiple responsibilities in a single function; keep each function `single-purpose` for maintainability and independent scaling
- **use Pub/Sub as a decoupling layer** — instead of triggering functions directly from your Cloud Run application, publish an event to Pub/Sub and let the function subscribe; this gives you `retry semantics`, `dead-letter queues`, and `loose coupling`
- **mind the cold start** — Cloud Run functions spin up on demand, so the first invocation after idle time has `additional latency`; keep dependencies minimal and use lightweight runtimes
- **Cloud Run functions can call other GCP services** — your function can write to Cloud SQL, read from Firestore, publish to Pub/Sub, etc., using the same `service account` and `IAM` patterns as Cloud Run
- **construct workflows from individual functions** — Cloud Run functions can be composed into `application workflows` from individual business logic tasks — for more complex orchestration, look at `Workflows` (a GCP service for chaining steps with retries and conditionals)
- **exam tip:** if a question mentions `event-driven`, `single-purpose function`, `triggered by Cloud Storage or Pub/Sub`, or `lightweight compute`, the answer is `Cloud Run functions`. If it mentions a `full web application` or `stateless container`, the answer is `Cloud Run`
