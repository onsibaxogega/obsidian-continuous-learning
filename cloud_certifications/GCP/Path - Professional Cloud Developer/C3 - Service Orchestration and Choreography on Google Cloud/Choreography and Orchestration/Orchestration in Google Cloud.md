
# Workflows


---


## 1. Core Concept

- **Definition:** Workflows is a `fully managed orchestration platform` that acts as the central orchestrator for the `service orchestration pattern`
- you design and deploy workflows that orchestrate `Google Cloud services and API calls` to build stateful, automated processes
- a workflow provides a `central source-of-truth` for the application flow
- each execution is `logged and observable`, making it easier to understand the current state and troubleshoot issues
- a workflow can `hold state, retry, poll, or wait for up to a year` — allows for creation of long-running business processes

![[workflows_usage.png|900]]

---


## 2. Example: Product Ordering Workflow

![[product_order_example_workflow.png|700]]

each workflow execution handles a single transaction and is logged for troubleshooting or tracing. the workflow handles retries or exceptions thrown by APIs, improving reliability of the entire process


---


## 3. When to Use Workflows

- **chain HTTP-based microservices** into `durable and stateful workflows`
- implement `long-running processes` and maintain observability for each execution
- perform operations on a `set of items or batch data` — robust error handling guarantees each item is processed correctly
- when you need a `central source-of-truth` for the application flow — clear visibility into what step the process is on
- when you need `retries, polling, or wait states` as part of the business process


---


## 4. Tips & Tricks

- for the PCD exam, the key signals for Workflows are: `stateful`, `central orchestrator`, `long-running`, `observable`, `retry/error handling` — if a question describes a multi-step business process with conditional logic, Workflows is likely the answer
- the "wait for up to a year" capability is what makes Workflows suitable for `approval processes` and `human-in-the-loop` workflows — e.g., waiting for a manager to approve a purchase order
- Workflows handles `retries and exceptions` at the orchestration level — individual services don't need to implement their own retry logic for inter-service failures
- Workflows are useful for batch processing or data pipeline orchestration that spans multiple services
- Workflows vs Cloud Composer: Workflows is for `HTTP-based service orchestration`; Cloud Composer (managed Airflow) is for `data pipeline orchestration` with complex (**Directed Acyclic Graph**s) DAGs — different tools for different problems
