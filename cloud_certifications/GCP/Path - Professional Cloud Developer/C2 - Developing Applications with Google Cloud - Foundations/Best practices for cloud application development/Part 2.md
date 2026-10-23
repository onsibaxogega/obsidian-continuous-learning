
# Best Practices for Cloud Application Development — Part 2

> Part 2 covers the `cross-cutting concerns` of cloud application development: caching, API management, identity delegation, logging, CI/CD pipelines, and migration strategies. These are the operational and infrastructure patterns that `surround your application code` and determine how it performs, scales, and evolves in production. #GCP_Best_Practices #cloud_native


---


## 1. Caching

### Application Data Caching

- cache data that is `frequently accessed` or `computationally intensive to calculate`
- when a user requests data:
	1. check the `cache first`
	2. if data exists in the cache → return the `previously cached data`
	3. if data is not in the cache or has expired → retrieve from `backend data sources`, recompute results, and `update the cache` with the new value
- **Memorystore** is Google Cloud's `fully managed, in-memory` caching service using `Redis` or `Memcached` #GCP_Memorystore

### Content Delivery Network (CDN)

- in addition to caching application data, use a `CDN to cache web content`
- **Cloud CDN** uses Google's `global Edge network` to serve content closer to users, accelerating websites and applications
- static content can be served from:
	- `Cloud Storage buckets`
	- services and functions running on `Cloud Run`
	- `Compute Engine` virtual machine instance groups


---


## 2. API Gateways

- implement API gateways to make `backend functionality available to consumer applications`
- **Apigee** is Google Cloud's platform for developing and managing APIs #GCP_Apigee
- by fronting services with a `proxy layer`, Apigee acts as a `facade` for your backend service APIs and provides:
	- **security**
	- **rate limiting**
	- **quota**
	- **analytics**
- **legacy application modernization:** if legacy applications `cannot be refactored and moved to the cloud`, consider implementing APIs in front of them — each consumer invokes `modern APIs` instead of communicating via `outdated protocols and disparate interfaces`

> `NOTE:` Apigee is the enterprise-grade solution — for simpler use cases (like internal APIs between your Cloud Run services), `API Gateway` (a lighter-weight GCP product) may be sufficient. Apigee shines when you need `rate limiting, analytics, and developer portal` capabilities.


---


## 3. Identity Management — Delegate Authentication

- minimize effort for user administration by `delegating identity management`
- delegate user authentication to `Google` or other external providers like `Facebook` or `GitHub`
- **Identity Platform** provides a `drop-in, customizable authentication service` for user sign-up and sign-in #GCP_Identity_Platform
- supported authentication methods:
	- external providers (Google, Facebook, GitHub)
	- `email/password`
	- `SAML`
	- `OpenID Connect (OIDC)`
	- `multi-factor authentication (MFA)`
- **Firebase Authentication with Identity Platform** provides `backend services`, `easy-to-use SDKs`, and `ready-made UI libraries`
- with `federated identity management`, you do not need to `implement, secure, and scale a proprietary solution` for authenticating users


---


## 4. Logging as Event Streams

- treat logs as a `continuous stream of events`
- do `not manage log files` in your application
- instead, write to an `event stream` like `standard out (stdout)` and let the underlying infrastructure `collate all events` for later analysis and storage
- this approach enables:
	- `logs-based metrics`
	- `tracing requests` across different services in your application
- logging by writing to stdout works `especially well for serverless compute` options like `Cloud Run`
- **Google Cloud Observability** provides:
	- `error reporting`
	- `logging and logs-based metrics`
	- monitoring for applications running in a `multi-cloud environment`


---


## 5. CI/CD Pipelines

### Continuous Integration (CI)

- developers merge code changes from their own `feature branch` into a `shared branch` in a code repository
- when an update is made, the `application build is triggered`
- `automated testing` confirms the new update hasn't broken existing unit and integration tests

### Continuous Delivery (CD)

- code changes validated during CI are automatically `stored in a code repository`
- the validated code base is `ready to be deployed to production` by the operations team

### Continuous Deployment

- takes CD one step further by `automatically deploying` validated changes to production
- `only a failed test` prevents the change from being deployed
- your application, tests, and CI/CD pipeline `must be well-designed` to prevent issues in production — there is `no manual validation` step

### Google Cloud CI/CD Pipeline

1. **Cloud Build** detects `repository commits`, triggers a build, and runs unit tests
2. build produces `deployment artifacts` stored in `Artifact Registry`
3. **Cloud Deploy** automatically triggers deployment to test environments or directly to production
4. `integration, security, and performance tests` are executed automatically
5. successful builds are deployed to the `production environment`


### Deployment Strategies

- **blue/green deployments:** maintain two identical production environments; switch traffic from "blue" (current) to "green" (new) after validation
- **canary testing:** roll out the new build to a `small percentage of users` first, then gradually increase if no issues are detected
- both strategies ensure that `unexpected issues with the new build do not affect most users`


---


## 6. The Strangler Pattern

- consider using the `strangler pattern` when re-architecting or migrating large applications #strangler_pattern
- **how it works:**
	1. in the early phases of migration, replace `smaller components` of the legacy application with newer services
	2. a `strangler facade` receives requests and directs them to the old application or new services
	3. incrementally replace `more features` of the original application
	4. as implementation evolves, the legacy application is `strangled by the new services` and is no longer required
- **why it works:** minimizes risk by allowing you to `learn from each service implementation` without affecting business-critical operations
- **etymology:** named after `strangler vines` — vines that seed and start growing on the upper branches of fig trees, gradually enveloping the tree

> `NOTE:` the strangler pattern is particularly relevant if you're ever tasked with migrating a legacy application to Cloud Run — you can front the legacy app with a load balancer, route new endpoints to Cloud Run microservices, and gradually decommission the legacy system without a risky big-bang migration.


---


## 7. Best Practices Quick Reference — Part 2

| Practice              | What to do                                                          | Example implementation                               |
| :-------------------- | :------------------------------------------------------------------ | :--------------------------------------------------- |
| caching (app data)    | cache frequently accessed or expensive-to-compute data              | `Memorystore` (Redis / Memcached)                    |
| caching (web content) | serve static content from edge locations                            | `Cloud CDN` + `Cloud Storage`                        |
| API gateway           | facade for backend services with security, rate limiting, analytics | `Apigee` / `API Gateway`                             |
| identity management   | delegate auth to external providers, don't build your own           | `Identity Platform` (OIDC, SAML, MFA)                |
| logging               | write to stdout, let infrastructure handle collation                | `Cloud Logging` (structured JSON to stdout)          |
| CI/CD                 | automate build → test → deploy pipeline                             | `Cloud Build` → `Artifact Registry` → `Cloud Deploy` |
| deployment strategy   | minimize blast radius of bad releases                               | blue/green deployments, canary testing               |
| migration strategy    | incrementally replace legacy components                             | `strangler pattern` with a facade                    |
