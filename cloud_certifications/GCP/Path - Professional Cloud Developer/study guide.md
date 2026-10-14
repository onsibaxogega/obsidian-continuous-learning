
# Professional Cloud Developer Certification Exam Guide

A Professional Cloud Developer builds and configures scalable, secure applications by using Google-recommended tools and best practices. They are proficient in the full development lifecycle, from architecting cloud-native applications to integrating advanced machine learning capabilities. They are also responsible for utilizing generative AI APIs to create intelligent user experiences. Additionally, they leverage AI-powered development tools—such as AI coding assistants, context engineering, and automated debugging agents—to accelerate delivery and improve code quality.

## Section 1: Designing highly scalable, secure, and reliable cloud-native applications (~32% of the exam)

### 1.1 Designing high-performing applications and APIs. Considerations include:

- [ ] choosing the appropriate platform based on the use case and requirements (e.g., Compute Engine, Google Kubernetes Engine, Cloud Run)
- [ ] building, refactoring, and deploying application containers to Cloud Run and GKE
- [ ] understanding how Google Cloud services are geographically distributed (e.g., latency, regional services, zonal services)
- [ ] understanding the use cases for load balancers
- [ ] enabling session affinity for performant content delivery
- [ ] implementing caching solutions (e.g., Memorystore)
- [ ] creating and deploying APIs (e.g., HTTP REST, gRPC [Remote Procedure Call])
- [ ] using application rate limiting, authentication, and observability (e.g., Apigee, Cloud API Gateway)
- [ ] integrating applications using asynchronous or event-driven approaches (e.g., Eventarc, Pub/Sub)
- [ ] defining resource requirements for workloads
- [ ] optimizing for cost and resource usage
- [ ] understanding data replication to support zonal and regional failover models
- [ ] using traffic splitting strategies (e.g., gradual rollouts, rollbacks, A/B testing) on a new service on Cloud Run or GKE
- [ ] orchestrating application services with Workflows, Eventarc, Cloud Tasks, and Cloud Scheduler

### 1.2 Designing secure applications. Considerations include:

- [ ] implementing data retention and organization policies (e.g., Cloud Storage Object Lifecycle Management, Cloud Storage use and lock retention policies)
- [ ] using security mechanisms that identify vulnerabilities and protect services and resources (e.g., Identity-Aware Proxy [IAP], Web Security Scanner)
- [ ] responding to and resolving vulnerabilities, including those identified by Artifact Analysis and Security Command Center
- [ ] storing, accessing, and rotating application secrets, credentials, and encryption keys (e.g., Secret Manager, Cloud Key Management Service, Workload Identity Federation)
- [ ] authenticating to Google Cloud services (e.g., Application Default Credentials, JSON Web Token [JWT], OAuth 2.0, Cloud SQL Auth Proxy, AlloyDB Auth Proxy, Identity Platform, WIF)
- [ ] securing cloud resources using Identity and Access Management (IAM) roles for service accounts
- [ ] incorporating secure service-to-service communications (e.g., Cloud Service Mesh, Kubernetes Network Policies, Direct VPC egress, private service connectivity)
- [ ] running services with least privileged access
- [ ] securing application artifacts using Binary Authorization

### 1.3 Storing and accessing data. Considerations include:

- [ ] selecting the appropriate storage system based on the volume of data and performance requirements
- [ ] designing appropriate schemas for structured databases (e.g., AlloyDB, Spanner) and unstructured databases (e.g., Bigtable, Firestore)
- [ ] understanding the implications of eventual and strongly consistent replication of AlloyDB, Bigtable, Cloud SQL, Spanner, and Cloud Storage
- [ ] creating signed URLs to grant access to Cloud Storage objects
- [ ] writing data to BigQuery for analytics and AI/ML workloads

## Section 2: Building and testing applications (~23% of the exam)

### 2.1 Setting up your development environment. Considerations include:

- [ ] emulating Google Cloud services using the Google Cloud CLI for local application development and local unit testing
- [ ] using the Google Cloud console, Cloud SDK, Cloud Code, Gemini Cloud Assist, Cloud Shell, and Cloud Workstations
- [ ] configuring IDEs with the appropriate integrations (e.g., Cloud SDK, AI tooling [coding assistants, MCP servers])

### 2.2 Building. Considerations include:

- [ ] using Cloud Build and Artifact Registry to build and store containers from source code
- [ ] configuring provenance in Cloud Build (e.g., Binary Authorization)

### 2.3 Testing. Considerations include:

- [ ] writing unit tests with the help of AI coding assistants
- [ ] executing automated integration tests in Cloud Build

## Section 3: Configuring cloud-native applications for deployment (~24% of the exam)

### 3.1 Deploying applications to Cloud Run. Considerations include:

- [ ] deploying applications from source code
- [ ] invoking Cloud Run services using triggers (e.g., Eventarc, Pub/Sub)
- [ ] configuring event receivers (e.g., Eventarc, Pub/Sub)
- [ ] versioning, exposing and securing APIs in applications (e.g., Apigee)

### 3.2 Deploying containers to GKE. Considerations include:

- [ ] deploying containerized applications
- [ ] implementing Kubernetes health checks to increase application availability
- [ ] incorporating Horizontal Pod Autoscaler attributes (scaling, metrics)

## Section 4: Integrating applications with Google Cloud services (~21% of the exam)

### 4.1 Integrating applications with data and storage services. Considerations include:

- [ ] managing connections to various Google Cloud datastores (e.g., Cloud SQL, Firestore, Cloud Storage)
- [ ] reading and writing data to and from various Google Cloud data sources
- [ ] writing applications that publish and consume data using messaging services

### 4.2 Consuming Google Cloud APIs. Considerations include:

- [ ] enabling Google Cloud services
- [ ] making API calls by using supported options (e.g., Cloud Client Libraries, REST API, gRPC, API Explorer) taking into consideration:
	- [ ] batching requests
	- [ ] restricting return data
	- [ ] paginating results
	- [ ] caching results
  - [ ] handling errors (e.g., exponential backoff)
- [ ] using service accounts to make Cloud API calls

### 4.3 Troubleshooting and observability. Considerations include:

- [ ] instrumenting code to facilitate troubleshooting using metrics, logs, and traces in Google Cloud Observability
- [ ] identifying and resolving issues using Google Cloud Observability
- [ ] managing application issues using Error Reporting
- [ ] using trace IDs to correlate trace spans across services
- [ ] using AI-assisted observability
