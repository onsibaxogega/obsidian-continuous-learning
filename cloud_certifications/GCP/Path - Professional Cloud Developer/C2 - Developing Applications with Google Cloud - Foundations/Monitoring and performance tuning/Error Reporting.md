
# Error Reporting


---


## 1. Core Concept

- **Definition:** Error Reporting counts, analyzes, and aggregates `crashes in your running cloud services` and notifies you of errors in your application
- provides a `centralized error management interface` with sorting and filtering capabilities
- error details include `timing, occurrences, first and last-seen dates, and number of affected users`
- application error events are processed and displayed `within seconds`


---


## 2. How Errors Are Detected and Grouped

### Error Detection

- errors are either reported by the `Error Reporting API` or are `inferred` when Error Reporting inspects log entries for common text patterns such as `stack traces`

### Intelligent Grouping

- error events are `intelligently grouped into error groups` and `deduplicated` by analyzing stack traces
- this helps you understand the different errors you're encountering `regardless of the number of occurrences`
- Error Reporting recognizes the `common frameworks used for your language` and groups errors accordingly


---


## 3. Error Reporting Dashboard

- shows your application's `top or new errors` in a clear dashboard
- by default, displays a list of recently occurring `open and acknowledged errors in order of frequency`
- stack traces are parsed and displayed in a way that helps you `focus on what matters`
- the stack trace for an error event is displayed along with a `list of occurrences within the error group` — easy to investigate similar error events at the same time
- you can sort errors by `number of occurrences` or by `first and last seen`
- you can `link an issue tracker` to an error group

### Error Details Page

- selecting an error entry opens a details page showing:
	- number of occurrences over time
	- specific error events
	- stack traces
- click `View Logs` from any entry in the Recent samples panel → opens `Logs Explorer` to view the log entry associated with a sample error

### Gemini Cloud Assist

- can assist you debug and resolve Google Cloud errors through:
	- `in-console explanations`
	- `conversational debugging`
	- `deployment and infrastructure diagnostics`


---


## 4. Enabling Error Reporting by Compute Environment

| platform                               | how to enable                                                    |
| :------------------------------------- | :--------------------------------------------------------------- |
| **Cloud Run** (services and functions) | `automatically enabled` — no action needed                       |
| **GKE**                                | add the `cloud-platform access scope` when creating the cluster  |
| **Compute Engine**                     | grant the VM's service account the `Error Reporting Writer` role |


---


## 5. Supported Languages and Reporting Methods

- **supported languages:** Go, Java, Node.js, PHP, Python, Ruby, .NET
- **reporting methods:** client libraries, REST API, or send errors with Cloud Logging

### Node.js Example

```javascript
// include the error-reporting library
const { ErrorReporting } = require('@google-cloud/error-reporting');

// create a client
const errors = new ErrorReporting();

// create a new error event, add details, and report it
const errorEvent = errors.event();
errorEvent.setMessage('Something went wrong!');

// error is reported asynchronously — code continues without waiting for delivery
errors.report(errorEvent, (err) => {
    if (err) {
        console.error('Failed to report error:', err);
    }
});
```

- `NOTE:` error events are reported `asynchronously` so that your code can continue processing without waiting for delivery — this means Error Reporting has minimal impact on application performance


---


## 6. Tips & Tricks

- for Cloud Run services, Error Reporting is `automatically enabled` — you don't need to configure anything; if your app throws an exception with a stack trace to stderr, Error Reporting picks it up
- the `View Logs` link from Error Reporting → Logs Explorer is the fastest way to correlate an error with the full request context in your structured JSON logs
- link your error groups to your GitHub Enterprise issue tracker so your team can track resolution directly from the Error Reporting dashboard
- for the PCD exam, remember the enablement differences: Cloud Run = automatic, GKE = access scope at cluster creation, Compute Engine = IAM role on the service account
- error grouping is based on `stack trace analysis`, not error message text — two errors with the same message but different stack traces will be grouped separately
