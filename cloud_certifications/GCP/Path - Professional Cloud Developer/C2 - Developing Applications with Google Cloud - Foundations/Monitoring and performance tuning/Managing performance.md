
# Cloud Trace and Cloud Profiler


---


## 1. Cloud Trace #Cloud_Trace

- **Definition:** Cloud Trace is a `distributed tracing system` that collects and analyzes latency data from your applications and displays it in the Google Cloud console
- helps you understand how long it takes your application to `handle incoming requests` and how long it takes to `complete operations like RPC calls` when handling those requests
- latency data is reported on a `per-URL basis`, letting you focus on the operations showing the most latency

### Traces and Spans

- a **trace** describes the time it takes to complete a `single operation`
- a **span** describes the time it takes to complete a `suboperation within the trace`
- a trace consists of `one or more spans`
- visualization of traces and spans helps you `track down performance issues`

### Automatic Performance Reports

- Cloud Trace automatically creates a `daily report` that compares the previous day's performance with the `same day of the previous week` for the top endpoints
- you can also create a `custom analysis report` and select which traces are included

### Sending Trace Data

- **automatic tracing:**
	- some configurations support automatic tracing
	- latency data for `incoming and outgoing HTTP requests` from Cloud Run services and functions is `automatically collected`
	- however, latency data `within the services` is not collected automatically
- **instrumented tracing (recommended for detail):**
	- provides more detailed information than automatic tracing
	- `OpenTelemetry` with the `Cloud Trace Exporter` is the recommended solution (when available for your language)
	- you can also use the `Cloud Trace API` or `Cloud Trace client libraries` to send custom tracing data

### Trace Explorer

- the Trace Explorer page lets you find and examine `individual traces in detail`
- a **scatter plot** displays a dot for each request in the selected time interval
	- xy-coordinates correspond to `time` (x) and `latency` (y) of the request
	- you can filter requests by attributes like `methods or status codes`
- click a dot → the **Trace Details pane** displays details about the trace and its spans
- dots on a span indicate `events that were annotated` during completion of the span suboperation
- the visual indication of latency helps you determine `which parts of your application are causing performance issues`


---


## 2. Cloud Profiler #Cloud_Profiler

- **Definition:** Cloud Profiler is a `statistical, low-overhead profiler` that continuously gathers `CPU usage and memory allocation` information from your production applications
- it attributes resource consumption to the `source code that generated it`, helping you identify the parts of your application `consuming the most resources`

### Why Profile in Production?

- understanding the performance of production systems is `notoriously difficult`
- attempting to measure performance in test environments `often fails to replicate` the characteristics of the production environment
- Cloud Profiler runs `continuously in production` with low overhead, giving you real performance data without impacting your application


---


## 3. Tips & Tricks

- for Cloud Run, automatic tracing captures `incoming and outgoing HTTP latency` — but if you need to trace internal operations (e.g., database queries, cache lookups, service-to-service calls), you must `instrument with OpenTelemetry`
- the daily auto-generated report is a quick way to catch `performance regressions` — if your Tuesday is significantly slower than last Tuesday, it surfaces immediately
- for the PCD exam, remember the hierarchy: `trace > span` — a trace is the full request lifecycle, spans are the individual operations within it
- Cloud Profiler is the answer when an exam question asks about identifying `CPU or memory hotspots in production code` — it points directly to the source code responsible
- the Trace Explorer scatter plot is useful for spotting `latency outliers` — if most dots cluster at 50ms but a few spike to 2s, click those outliers to investigate the specific spans causing the delay
