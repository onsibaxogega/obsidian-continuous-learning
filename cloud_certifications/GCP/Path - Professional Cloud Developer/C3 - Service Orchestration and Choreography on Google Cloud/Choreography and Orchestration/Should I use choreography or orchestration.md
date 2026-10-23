
# Choreography vs Orchestration — When to Use Which


---


## 1. How Each Pattern Handles Communication

### Choreography (Event-Based)

- you rely on the `receiving service to control the communication`
- when Service A completes work and sends an event, it has `no idea whether any other service will act on that event`
- it is not the responsibility of Service A to know whether any downstream service is consuming the event
- the receiver of an event must `understand the details of the event` to consume it
- Service B might know the event was sent by Service A, but it is `not directly coupled` to Service A

### Orchestration (Workflow-Based)

- each workflow execution is `tracked separately`
- the process logic — which may be built using many services or functions — is `defined in a single location`
- retries and error handling provide a `reliable flow`


---


## 2. Why Orchestration Fits the Product Ordering Example

- it's possible to implement the product ordering flow using choreography — each service would send an event to indicate readiness for the next step
- however, an enterprise order system requires `visibility, error handling, and retries`
- implementing these features in an event-based solution is difficult:
	- how would you `troubleshoot issues` with an event-based system?
	- what happens if the process `aborts between locking inventory and updating the order`?
	- how do you make sure `requests are successfully sent to suppliers`?
- with orchestration, these problems are solved: execution tracking, centralized logic, retries, and error handling


---


## 3. Decision Guide

| **choose choreography when...**                                               | **choose orchestration when...**                                       |
| :------------------------------------------------------------------------ | :----------------------------------------------------------------- |
| you need `decentralized control`                                          | you want to `control a complex process centrally`                  |
| services are built and managed by `different teams or organizations`      | the process requires `visibility, error handling, and reliability` |
| you want to combine `separate, decentralized services` using events       | you need to `track each execution separately`                      |
| you want to `leverage events from Google Cloud services`                  | the process logic should be `defined in a single location`         |
| shared management of a central orchestration process `would be difficult` | you need `retries, state management, and troubleshooting`          |


---


## 4. Using Both Patterns Together

- you don't have to choose one exclusively — you can `combine orchestration and choreography`
- _Example:_ the Order, Fulfillment, and Marketing services are each implemented using `Workflows` (orchestration)
- event triggers `between` the services and detection of new order files being uploaded to a Cloud Storage bucket are implemented using `Eventarc` (choreography)
- this pattern gives you `centralized control within each service` and `decentralized event-driven communication between services`


---


## 5. Tips & Tricks

- for the PCD exam, the decision heuristic: `need visibility + error handling + retries + central control?` → orchestration (Workflows); `need decentralized control + independent teams + event-driven reactions?` → choreography (Eventarc/Pub/Sub)
- the hybrid pattern (Workflows within each service, Eventarc between services) is the most realistic enterprise architecture — `orchestrate internally, choreograph externally`
- when an exam question describes a process that "aborts midway" or "needs to guarantee completion," the answer is almost always Workflows — choreography has no built-in mechanism for tracking whether a multi-step process completed end-to-end
- for your team's Cloud Run services, consider Workflows for any multi-step process that spans services (e.g., data ingestion → processing → notification) and Eventarc for reacting to Cloud Storage uploads or Pub/Sub events
