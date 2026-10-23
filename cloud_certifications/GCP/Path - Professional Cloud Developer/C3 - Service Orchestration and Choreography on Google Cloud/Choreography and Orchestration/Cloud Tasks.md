
# Cloud Tasks


---


## 1. Core Concept

- **Definition:** Cloud Tasks lets you manage the `execution, dispatch, and delivery` of large numbers of distributed tasks
- a task is a piece of work that can be `processed independently` by dispatching it to an HTTP service
- you set up a `queue` for tasks that will be sent to a particular service
- a task added to the queue is `automatically dispatched` to your chosen HTTP service
- the returned `status code` determines whether the task completed successfully or should be retried


---


## 2. Key Features

- **scheduling:** schedule a task to be dispatched at a `specified future time`
- **rate limiting:** configure the queue with a `maximum rate` to dispatch tasks or a `maximum number of concurrent tasks`
- **retries:** specify the `maximum number of attempts` and the `delay between attempts` when tasks are retried
- **at-least-once delivery:** supported, with `best-effort task deduplication` when task names are explicitly provided
- **authentication:** HTTP services that require authentication can be called by `automatically attaching a token` associated with the service account of the application creating the task


---


## 3. Cloud Tasks vs Pub/Sub

both implement message passing and asynchronous integration, but they are designed for different use cases:

| aspect               | Cloud Tasks                                                                             | Pub/Sub                                                                                                                            |
| :------------------- | :-------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| **invocation model** | `explicit invocation` — the creator retains full control over execution and destination | `implicit invocation` — the publisher causes subscribers to execute, but has no control over which subscribers receive the message |
| **destination**      | creator places the task in a queue attached to a `specified endpoint`                   | publisher sends to a topic; `subscribers decide` whether to consume                                                                |
| **scheduling**       | creator can `defer dispatching` to a future time                                        | no built-in scheduling (use Cloud Scheduler to trigger)                                                                            |
| **control**          | creator controls `when, where, and how` the task is executed                            | publisher has `no control` over downstream processing                                                                              |
| **best for**         | asynchronously executing a `specific service` with control over timing                  | `event-based architectures` where receiving services react to events                                                               |


---


## 4. Use Cases

- **offloading slow background operations:** separate out independent pieces of work to be processed asynchronously by a `separate worker`, reducing work required by the main application and `improving response time`
- **controlled async execution:** when an application wants to `asynchronously execute a specific service` and possibly control the timing of the execution
- **rate-limited processing:** when you need to control the `rate and concurrency` of dispatched tasks to avoid overwhelming a downstream service
- unlike Pub/Sub, the application `retains control of the execution`, specifying the endpoint to handle the offloaded task


---


## 5. Tips & Tricks

- for the PCD exam, the key distinction: Cloud Tasks = `explicit invocation` (you control the target), Pub/Sub = `implicit invocation` (subscribers react independently) — if the question mentions "offload work to a specific service," the answer is Cloud Tasks
- Cloud Tasks is ideal for things like `sending emails after user signup`, `generating PDF reports`, or `processing image uploads` — any work that doesn't need to block the user-facing request
- the rate limiting feature is critical when your downstream service has `quota limits` — e.g., calling a third-party API with a rate cap; Cloud Tasks throttles the dispatch rate for you
- Cloud Tasks supports `at-least-once delivery`, which means your target service should be `idempotent` — same as with Pub/Sub
- `NOTE:` Cloud Tasks is not Pub/Sub with scheduling — the mental model is different; Cloud Tasks is a `task queue` (you tell it exactly what to do and where), Pub/Sub is a `message bus` (you broadcast and let consumers decide)
