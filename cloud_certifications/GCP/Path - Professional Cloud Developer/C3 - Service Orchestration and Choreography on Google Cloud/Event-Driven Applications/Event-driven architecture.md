
# Event-Driven Architecture


---


## 1. What Is an Event?

- **Definition:** an event is a `record of something that has happened` — e.g., an employee logging in to an application or a product being added to a shopping cart

### Important Attributes of Events

- **immutable:** an event is treated as an `immutable fact` — it's a historical record of an occurrence and should `not be modified or deleted`
- **fire and forget:** an event can be generated `even if it's never consumed` — many applications that produce events don't know whether their events are ever consumed
- **persistent and replayable:** an event can be `persisted indefinitely` and consumed as many times as necessary
- **fan-out:** a single event can be consumed by `many services`, allowing event processing to occur `in parallel`


---


## 2. The Problem with Point-to-Point Communication

- the `"spider web"` of point-to-point communication between microservices is a challenge
- each service must know `how to communicate with all downstream services`
- point-to-point communication tends to introduce `coupling between the microservices`


---


## 3. Event-Driven Architecture as the Solution

- an event-driven architecture inserts an `event intermediary` between the services
- **event producer:** a service that sends events to the intermediary — it `doesn't need to know anything` about the services consuming the events
- **event consumer:** a service that receives events from the intermediary — it understands how to handle an event but `doesn't need to know any details about the event producer`
- this decoupling is the key benefit — producers and consumers are `completely independent` of each other


![[event_driven_architecture.png|797]]


---


## 4. Tips & Tricks

- in GCP, the event intermediary is typically `Pub/Sub` (for general messaging) or `Eventarc` (for routing Cloud events to Cloud Run and other targets)
- the immutability of events is a fundamental concept — this is why event stores and event sourcing patterns work; you never update an event, you append new events
- for the PCD exam, the key signal for event-driven architecture is when a question describes services that need to communicate `without knowing about each other` or `without direct coupling`
- the fan-out capability (one event → many consumers) is what makes event-driven architectures powerful for parallel processing — each consumer processes the event independently
