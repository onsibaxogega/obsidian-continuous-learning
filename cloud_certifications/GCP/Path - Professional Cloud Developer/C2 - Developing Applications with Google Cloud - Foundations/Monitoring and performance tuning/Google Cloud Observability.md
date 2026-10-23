
# Google Cloud Observability


---


## 1. Core Concept

- **Definition:** Google Cloud Observability is a suite of `integrated managed services` that help you manage your running services and applications
- monitoring is the `foundation of application reliability`
- supports monitoring across `Google Cloud, on-premises, or other clouds`


---


## 2. Observability Services

| service              | what it does                                                                                                                                                                                                                              |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Cloud Monitoring** | provides visibility into `performance, availability, and overall health`; collects metrics, events, and metadata from Google Cloud services and applications; supports `alerting policies` for timely awareness of problems               |
| **Cloud Logging**    | fully managed service that ingests `application and platform log data`, as well as custom log data from GKE, VMs, and other services inside and outside Google Cloud; lets you `search, filter, troubleshoot, and analyze` log data       |
| **Error Reporting**  | counts, analyzes, and aggregates `errors produced in running cloud services`; displays a summary dashboard with error counts and occurrences; sends `notifications` when new or resolved errors occur                                     |
| **Cloud Trace**      | distributed tracing system that collects `latency data` from applications and displays it in near real-time; helps understand how long it takes to handle incoming requests and `analyze latency across services`                         |
| **Cloud Profiler**   | uses `statistical techniques and low-impact instrumentation` across all production instances; provides a complete picture of application performance `without slowing it down`; helps identify and eliminate potential performance issues |

- `NOTE:` for Error Reporting, you add the error reporting library to your application and report errors when they occur — it's not automatic, you instrument it


---


## 3. Why Developers Should Monitor

- **spot anomalies:** build custom dashboards or use out-of-the-box dashboards to monitor health of infrastructure and applications
- **identify trends:** monitoring over time reveals usage patterns — e.g., how fast is my database growing? how quickly is my daily active user count growing? which features are used the most?
- **urgent attention:** is the application broken, or will it soon break? alerting on metric trends or limits lets you `fix issues before they cause catastrophic failures`
- **retrospective analysis:** latency increased dramatically overnight — what else happened around the same time? is there a condition I can alert on to `fix the issue before it affects users`?


---


## 4. The Four Golden Signals #four_golden_signals

at a minimum, your application dashboards should capture these four key metrics:

### Latency

- the amount of time it takes to `serve a request`
- distinguish between the latency of `successful and unsuccessful requests`
- _Example:_ an HTTP error due to a lost database connection might resolve quickly, but including `HTTP 500 errors` in your overall latency can result in `misleading metrics`

### Traffic

- a measure of `how much demand` is placed on your system
- measured as a system-specific metric:
	- web server → `HTTP/HTTPS requests per second`
	- NoSQL database → `read or write operations per second`

### Errors

- the number of `failed requests`
- failure criteria can include:
	- explicit errors — e.g., `HTTP 500`
	- successful HTTP 200 responses but with `incorrect content`
	- policy errors — e.g., your application promises a response time of one second, but some requests `take over a second`

### Saturation

- indicates `how full your application is` — what resources are being stretched and reaching target capacity
- systems can degrade in performance `before they achieve 100% utilization`
- set `utilization targets carefully` — don't wait for 100% to trigger alerts


---


## 5. Tips & Tricks

- the four golden signals (`latency, traffic, errors, saturation`) originate from Google's SRE book — this is a very common PCD exam topic
- for your Cloud Run services, `Cloud Monitoring` automatically captures request latency, request count, and container instance count — you get the first three golden signals out of the box
- for saturation on Cloud Run, monitor `memory utilization` and `CPU utilization` per container instance — these are the resources most likely to hit limits
- remember that Cloud Logging works `inside and outside of Google Cloud` — if your team has on-prem services feeding logs to Cloud Logging, they show up in the same console alongside your Cloud Run logs
- for structured JSON logging, Cloud Logging natively parses `structured JSON log lines` — fields like `severity`, `message`, and `httpRequest` are automatically indexed and searchable
