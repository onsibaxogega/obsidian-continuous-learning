
# Cloud Logging and Prometheus


---


## 1. Core Concept

- **Definition:** Cloud Logging is a `real-time log management system` with storage, search, analysis, and monitoring support
- Cloud Logging `automatically collects logs` from Google Cloud resources — you can also collect logs from your applications
- logs and metrics help you understand `how your application is working`


---


## 2. What Logs Help You Do

- **troubleshoot your application:** use the `Logs Explorer` to view individual log entries and find related entries; logging the flow of calls within your application helps you understand how it's working or `why it's not working as intended`
- **analyze application performance:** use the `Log Analytics` interface to perform aggregate operations on your logs with `SQL queries`
- **alerting on events:** configure Cloud Logging to notify you when certain kinds of events occur

### Log-Based Alerts vs Log-Based Metrics

- **log-based alert:** sends a notification when a `particular pattern appears` in a log entry
- **log-based metric:** counts `occurrences of a message` and notifies you when the count crosses a threshold; also suitable for observing `trends` and receiving notifications if values change in an unacceptable way


---


## 3. Log Collection by Compute Environment

### Compute Engine — Ops Agent

- install the `Ops Agent` on Compute Engine instances to stream logs and metrics from third-party applications into Cloud Logging
- uses `Fluent Bit` for high-throughput logging and `OpenTelemetry Collector` for metrics
- **automatic log collection:** collects from standard system log locations like `/var/log/syslog`
- **file-based logs:** configurable with customizable paths and refresh interval
- **log processing:** can parse text logs into structured logs, modify log entries (remove/rename/set fields), exclude logs based on labels and regular expressions
- **automatic metric collection:** CPU, disk, memory, network, and processes — no configuration needed
- **third-party application metrics:** curated support for Apache Tomcat, Apache web server, NGINX, and others

### Cloud Run — Built-In Logging

- Cloud Run services and functions have `built-in support` for logging
- logs written by applications are `automatically sent` to Cloud Logging
- simply write to `stdout` and `stderr` — logs are automatically delivered

### GKE — Enable Observability Integration

- enable the `observability for GKE integration` for your cluster
- Kubernetes logs are `not stored permanently` within GKE:
	- container logs are removed when their host pod is removed
	- system logs are periodically removed to free up space
	- cluster events are removed after `one hour`
- sending logs to Cloud Logging ensures log entries are `kept as long as you deem necessary`


---


## 4. Text Logs vs Structured Logs

- **text logs:** strings are put into the `textPayload` field of the log entry; other fields (time received, resource, log name) are also logged automatically
- **structured logs (recommended):** log a single line of `serialized JSON`, which is placed in the `jsonPayload` field of the log entry

### Why Structured Logs Are Better

- text logs `do not have a log level` — hard to find important content
- fields within structured log data can be `searched using queries`, making log analysis much easier
- some special fields are automatically stripped from the JSON payload and written to the corresponding field in the log entry:
	- `severity` → sets the log level
	- `message` → used as the main display text of the log

### Example (Cloud Run / Python)

```python
import json
import sys

# text log — goes into textPayload, no log level
print("This is a text log entry")

# structured log — goes into jsonPayload with searchable fields
# log a single line of serialized JSON to stdout
log_entry = json.dumps({
    "severity": "WARNING",          # stripped → becomes the log level
    "message": "Disk usage above 80%",  # stripped → main display text
    "component": "storage-monitor",
    "labels": {
        "environment": "production",
        "service": "api"
    }
})

print(log_entry, file=sys.stderr)
```



---


## 5. Prometheus and Managed Service for Prometheus

- **Prometheus** is an open source systems monitoring and alerting toolkit
- monitors services running on `VMs and Kubernetes` — very popular for monitoring Kubernetes workloads and clusters
- collects and stores metrics as `time series data` — helps you see trends in application metrics
- provides `PromQL`, a powerful query language for creating dashboards and alerts

### The Problem with Self-Managed Prometheus

- Prometheus can be `difficult to manage and scale` at the infrastructure level

### Google Cloud Managed Service for Prometheus

- a `fully-managed Prometheus solution` that removes the burden of manually managing and operating Prometheus at scale
- `multi-cloud and cross-project` — applications running in Google Cloud, other clouds, or on-premises can be managed in a single pane of glass using Cloud Monitoring

### Data Collectors

| collector type               | description                                                                                                        |
| :--------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| **managed collectors**       | recommended for all Kubernetes environments including GKE; operation is `fully handled by the Kubernetes operator` |
| **self-deployed collectors** | drop-in replacements for the normal Prometheus binary                                                              |
| **OpenTelemetry collectors** | can collect metrics compatible with Prometheus                                                                     |
| **Ops Agent**                | can also collect metrics for use with Prometheus                                                                   |

### Query and Alerting

- supports any query UI that can call the `PromQL query API`, including `Cloud Monitoring` and `Grafana`
- over `1,500 free metrics` available in Cloud Monitoring can be queried even without sending data to Managed Service for Prometheus
- provides a fully `cloud-based alerting pipeline` for Cloud Monitoring and Prometheus metrics


---


## 6. Tips & Tricks

- for Cloud Run services, structured JSON logging is the way to go — just `print(json.dumps({...}))` to stdout and Cloud Logging handles the rest; the `severity` and `message` fields are parsed automatically
- use `Log Analytics` with SQL queries when you need aggregate analysis — e.g., "how many 500 errors did we get in the last hour grouped by service?"
- log-based metrics are powerful for creating `Cloud Monitoring alerts from log patterns` — e.g., count occurrences of a specific error message and alert when it exceeds a threshold per minute
- for your GKE clusters, always enable the observability integration — Kubernetes logs are ephemeral (container logs die with the pod, events vanish after one hour), so Cloud Logging is the only way to retain them
- if your team is using Grafana dashboards, `Managed Service for Prometheus` is a good fit — it feeds PromQL-compatible metrics into Grafana without you having to run Prometheus infrastructure yourself
- for the PCD exam, remember that Ops Agent = `Fluent Bit (logs) + OpenTelemetry Collector (metrics)` — this is a common detail they test
