
# Benefits of Event-Driven Architecture


---


## 1. Auditing and Control

- a centralized event service can simplify `auditing and control` for a distributed application
- a log of immutable events can be used for `auditing purposes` — events provide a timed, ordered record of `every change to the state of an application`
- a centralized event service helps you `control access` to particular services and data
- by requiring `authentication and authorization` at the event service, you can limit access to each of your event-based services


---


## 2. Decoupling

- when using an event intermediary, producer and consumer are `decoupled`
- services can create an event `without having to send direct requests` to any consuming services
- services can consume an event `without knowing anything` about the service that generated it
- no point-to-point spider web — each event travels through the event intermediary, which `routes the event to the correct consumer(s)`
- a producer or consumer is only required to know the `format of a specific event`
- new event consumers can be added to your application `without modifying any existing services`


---


## 3. Resilience Through Asynchronous Processing

- microservices applications that use `synchronous request/response calls` are fragile — the health of a service is affected by the health of every service it calls, directly or indirectly
- when a single service fails, it can `bring down your entire application`
- with event-based architecture, events are generated `asynchronously` — created without waiting for a response
- the architecture can be designed to `survive the temporary loss of a service`
- events sent to an unhealthy service can be `replayed or redelivered` when the service comes back up
- this asynchronous handling leads to `more resilient applications`


---


## 4. Push-Based Messaging vs Polling

| aspect | polling model | push-based model |
| :--- | :--- | :--- |
| **how it works** | consumers continuously poll to determine when there's work to be done | consumers are automatically notified when there are events to consume |
| **network efficiency** | increased network I/O and unnecessary delays in processing | events are efficiently routed to consumers |
| **latency** | delays between polls mean slower reaction times | near-immediate notification |

- when services are asynchronous, `push-based messaging` allows clients to receive updates without needing to continuously poll remote services


---


## 5. Tips & Tricks

- for the PCD exam, the four benefits to remember: `auditing/control`, `decoupling`, `resilience`, and `push-based efficiency`
- the resilience argument is the most important one for exam scenarios — if a question describes a system where `one service failure cascades to other services`, the answer is to move to an event-driven architecture with asynchronous messaging
- the "replay/redeliver" capability is what makes Pub/Sub powerful — messages are retained until acknowledged, so a service that goes down doesn't lose events
- the "add new consumers without modifying existing services" point is key for extensibility — e.g., you can add a new analytics consumer to an existing order event stream without touching the order service
