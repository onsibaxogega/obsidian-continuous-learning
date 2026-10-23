
# Cloud Scheduler


---


## 1. Core Concept

- **Definition:** Cloud Scheduler is a `fully managed, enterprise-grade cron job scheduler` managed from a single dashboard
- used to schedule jobs that should be executed on a `defined schedule or at regular intervals`
- jobs are specified using the `Unix cron job format`
- jobs have `guaranteed execution`, and failed job executions can be `retried`

### Job Targets

- `Pub/Sub topics`
- `App Engine applications`
- `publicly accessible HTTP endpoints` (including Cloud Run services and functions)
- like Cloud Tasks, Cloud Scheduler can `attach tokens associated with a specified service account` to HTTP requests for authentication


---


## 2. Unix Cron String Format

a set of `five space-separated fields` on a single line that indicates when a job should be executed:

```
┌───────────── minute (0-59)
│ ┌───────────── hour (0-23)
│ │ ┌───────────── day of month (1-31)
│ │ │ ┌───────────── month (1-12)
│ │ │ │ ┌───────────── day of week (0=Sun, 6=Sat)
│ │ │ │ │
* * * * *
```

### Field Syntax

| syntax | meaning | example |
| :--- | :--- | :--- |
| single number | execute at that value | `15` in minute field → 15 minutes past the hour |
| `*` | entire allowed range | `*` in hour field → every hour |
| range (`-`) | inclusive range of values | `1-5` in day of week → Monday through Friday |
| step (`/`) | skip that number of values through the range | `*/2` in hour field → every two hours |
| list (`,`) | comma-separated numbers or ranges | `1,15` in minute field → at minute 1 and minute 15 |

### Timezone

- schedules can be specified for a `specific time zone` — default is `UTC`
- time zones with daylight saving time can cause jobs to be `skipped` (clocks set forward) or `run twice` (clocks set backward)
- `NOTE:` using `UTC is recommended` to avoid daylight saving time issues


---


## 3. Cloud Scheduler vs Cloud Tasks

| aspect            | Cloud Scheduler                                                | Cloud Tasks                                                                                                                    |
| :---------------- | :------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| **trigger model** | `recurring`, `cron-based` — the schedule itself is the trigger | `application-initiated`, `on-demand` — your code creates a task and places it in a queue, optionally deferred to a future time |
| **use case**      | recurring jobs on a defined schedule                           | asynchronous execution of a specific service, possibly with controlled timing                                                  |
| **who initiates** | the scheduler triggers at the defined time                     | the application creates a task and adds it to a queue                                                                          |
| **rate limiting** | one execution per schedule interval                            | configurable max rate and concurrency                                                                                          |


---


## 4. The Application Integration Toolbox

a full-featured microservices application may benefit from any or all of these services:

| service | pattern | purpose |
| :--- | :--- | :--- |
| **Pub/Sub** | choreography | real-time messaging between independent services |
| **Eventarc** | choreography | event-driven triggers from Google Cloud services with CloudEvents format |
| **Workflows** | orchestration | stateful, centrally controlled multi-step business processes |
| **Cloud Tasks** | async execution | explicit, controlled dispatch of tasks to specific HTTP endpoints |
| **Cloud Scheduler** | scheduling | time-based triggering of jobs on a cron schedule |


---


## 5. Tips & Tricks

- for the PCD exam, if a question mentions `recurring`, `scheduled`, `daily`, `hourly`, or `cron` — the answer is Cloud Scheduler
- Cloud Scheduler + Pub/Sub is a common pattern: the scheduler publishes a message to a topic on a cron schedule, and subscribers react — useful for `scheduled batch processing` or `periodic data syncs`
- Cloud Scheduler + Cloud Run is straightforward: schedule an HTTP request to your Cloud Run service on a cron schedule — e.g., `nightly database cleanup`, `hourly report generation`
- always use `UTC` for your cron schedules in production — daylight saving time bugs are notoriously hard to debug
- the cron format is the same one you'd use in a Linux crontab
- In regulated industries, Cloud Scheduler is ideal for compliance-related tasks like `scheduled audit log exports` or `periodic security scans` that need to run on a guaranteed, documented schedule
