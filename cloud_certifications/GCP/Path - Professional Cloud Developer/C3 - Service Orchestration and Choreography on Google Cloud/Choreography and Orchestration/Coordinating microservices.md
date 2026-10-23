
# Choreography vs Orchestration


---


## 1. The Coordination Problem

- one challenging aspect of microservices is `coordinating the communication between services`
- each microservice is smaller and simpler to design than a monolith, but some complexity is `shifted from the service to inter-service communications`
- multiple microservices are often combined to form `business processes` — coordination of communication becomes a key aspect of application design
- there are two basic approaches in an event-driven architecture: `service choreography` and `service orchestration`


---


## 2. Service Choreography

- **analogy:** like a choreographed dance — dancers are instructed how to perform, but each dancer is `fully responsible for performing their part` during the performance; there is no conductor
- each service `works independently`
- each service is responsible for `receiving and sending events asynchronously`, typically following defined rules of interaction
- the `event structures exchanged between services are specified` — each service must generate and expect events in the correct formats
- services are `loosely coupled` and can be created, changed, and scaled separately

### Challenge

- business logic is `distributed` — there's no central source of truth
- a distributed application can be `harder to understand`


---


## 3. Service Orchestration

- **analogy:** like an orchestra performance — each musician knows how to play their instrument, but the `conductor takes an active role` to ensure the musicians are synchronized
- each service performs its own tasks, but a `central orchestrator controls all interactions` between the services
- services `do not need to know about or communicate with other services` — the orchestrator handles it
- services are `loosely coupled` and can be created, changed, and scaled separately
- provides a `high-level view of business processes` — helps with understanding the application, tracking execution, and troubleshooting issues

### Challenge

- the orchestrator is a `single point of failure` — if the orchestrator is not operable, the orchestrated processes cannot run


---


## 4. Choreography vs Orchestration Comparison

| aspect             | choreography                                | orchestration                                        |
| :----------------- | :------------------------------------------ | :--------------------------------------------------- |
| **control**        | decentralized — each service manages itself | centralized — orchestrator controls all interactions |
| **coupling**       | loosely coupled                             | loosely coupled                                      |
| **business logic** | distributed across services                 | centralized in the orchestrator                      |
| **visibility**     | no single view of the business process      | high-level view of the entire process                |
| **failure mode**   | no single point of failure                  | orchestrator is a single point of failure            |
| **analogy**        | choreographed dance                         | orchestra with a conductor                           |
| **GCP service**    | Pub/Sub, Eventarc                           | Workflows                                            |


---


## 5. Tips & Tricks

- for the PCD exam, the decision heuristic: if the question mentions `central control, visibility, or step-by-step process` → orchestration (Workflows); if the question mentions `independent services reacting to events with no central controller` → choreography (Pub/Sub / Eventarc)
- both patterns produce loosely coupled services — the difference is `where the coordination logic lives` (distributed vs centralized)
- in practice, many applications `use both patterns` — orchestration for well-defined business processes with sequential steps, choreography for event-driven notifications and fan-out
- the single point of failure concern with orchestration is mitigated in GCP because `Workflows is a fully managed service` with built-in reliability — you're not running your own orchestrator
