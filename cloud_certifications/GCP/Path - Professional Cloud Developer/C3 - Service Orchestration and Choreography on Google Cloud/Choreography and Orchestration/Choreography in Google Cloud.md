
# Pub/Sub and Eventarc


## 1. Pub/Sub #Pub_Sub

- **Definition:** Pub/Sub is a `fully managed real-time messaging service` that lets you send and receive messages between independent services or applications
- Pub/Sub is one of the GCP services used to implement the `choreography pattern`

### How Pub/Sub Works

1. a **publisher** sends a message to a `Pub/Sub topic` — often a custom-built application, but can also be a Google service
2. the message is `stored within Pub/Sub`
3. the message is delivered to the `message queue for each subscriber` of the topic
4. each subscriber receives the message
5. the subscriber `acknowledges` the message — acknowledging removes it from the queue
6. deletion of the queued message follows handling, which guarantees that a message will be handled `at least once`

![[pubsub_usage.png|900]]


### Pull vs Push Subscriptions

| subscription type | how it works |
| :--- | :--- |
| **pull** | subscriber `occasionally polls` for messages sent to the topic |
| **push** | message is `automatically sent` to a configured endpoint for the subscription |

### Example: Image Resizing Application

![[image_resize_example_pubsub.png|600]]


---


## 2. Eventarc #Eventarc

- **Definition:** Eventarc is Google Cloud's `fully managed eventing system` that makes building event-driven applications easy
- Eventarc is an `abstraction layer on top of Pub/Sub` that provides significant benefits for designing event-driven applications
- Eventarc uses `Pub/Sub as its transport layer` due to its superior reliability and observability
- Eventarc `automatically creates and manages` Pub/Sub topics and subscriptions — your applications only need to accept HTTP requests

![[eventarc_usage.png|900]]

### Event Sources

- **direct Google Cloud services:** some services can directly send events to Eventarc
- **Cloud Audit Logs:** for services or event types that don't support direct access, Eventarc seamlessly uses `Cloud Audit Log entries` to generate events — no code needed to parse audit logs or poll for events
- **third-party providers:** can use the `Eventarc API` to create events
- **Pub/Sub messages:** messages to specified topics can be used as event sources, allowing custom applications to send events

### Event Triggers

- an event trigger is a `rule-based filter` to route specific event types from a particular event source to specified event consumers (targets)
- Eventarc provides a `simple, rule-based interface` to select the source, filter, and destination of a trigger

### CloudEvents Format #CloudEvents

- events are delivered to targets using the standard `CNCF CloudEvents format`, regardless of event source
- CloudEvents specifies a `common metadata format` for describing event data, providing `interoperability across services, platforms, and systems`
- standardizing on a specific format allows developers to use the `same event handling logic` regardless of the source or type of the event
- CloudEvents provides SDKs for: `Python, JavaScript, Java, Go, C#, Ruby, PHP`
- developers can use these SDKs to easily parse incoming events, increasing `code portability and developer productivity`

![[cloudevents.png|800]]


---


## 3. When to Use Pub/Sub vs Eventarc

| consideration         | Pub/Sub                                                                   | Eventarc                                                                                                     |
| :-------------------- | :------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------- |
| **abstraction level** | lower — you manage topics, subscriptions, and write code to ingest events | higher — rule-based interface, topics/subscriptions auto-managed                                             |
| **event sources**     | custom publishers sending to topics                                       | many built-in Google Cloud services, Cloud Audit Logs, third-party providers, and Pub/Sub topics             |
| **event format**      | custom message format (you define the schema)                             | standardized `CloudEvents` format with SDK support                                                           |
| **setup effort**      | more code to manage topics, subscriptions, and message parsing            | simpler — select source, filter, and destination via triggers                                                |
| **best for**          | custom messaging between your own services where you need full control    | detecting changes in Google Cloud services or third-party apps and automatically triggering code in response |


---


## 4. Tips & Tricks

- for the PCD exam, remember that Eventarc `uses Pub/Sub under the hood` — it's not a separate transport; it's an abstraction that auto-manages the Pub/Sub plumbing for you
- the "at least once" delivery guarantee from Pub/Sub means your consuming services must be `idempotent` — design them to handle receiving the same message more than once without side effects
- for your Cloud Run services, `push subscriptions` are the natural fit — Pub/Sub sends the message directly to your Cloud Run HTTPS endpoint; no need to poll
- the CloudEvents SDK for Python makes parsing Eventarc events trivial — `from cloudevents.http import from_http` and you get a structured event object with standard metadata fields
- for your Cloud Build + Cloud Run CI/CD pipeline, Eventarc can detect `Artifact Registry events` (new image pushed) and trigger a Cloud Run deployment automatically — an alternative to Cloud Deploy for simpler pipelines
