![IDP flowchart](https://github.com/aws-solutions-library-samples/accelerated-intelligent-document-processing-on-aws/blob/main/images/IDP.UnifiedPatterns.drawio.png?raw=true)


This diagram illustrates a highly decoupled, event-driven architecture. It's built to handle varying loads of documents asynchronously without crashing. If you were architecting a document processing pipeline for a health records management system like Medvise, this exact pattern—buffering uploads before processing them—ensures that a suddenhttps://github.com/aws-solutions-library-samples/accelerated-intelligent-document-processing-on-aws/blob/main/images/IDP.UnifiedPatterns.drawio.png?raw=true influx of large medical PDFs wouldn't overwhelm the compute resources.

Here is a breakdown of what each AWS service is doing in this flow, mapped to the Azure equivalents you might be more familiar with:

### 1. Ingestion & Queueing (Left Side)

This section captures the document and safely queues it up for processing.

- **Input Bucket (Amazon S3):** This is where the raw PDFs land initially. It's object storage, identical in function to an **Azure Blob Storage** container.
    
- **Queue Sender & Queue Processor (AWS Lambda):** These are serverless compute functions, exactly like **Azure Functions**. The Sender acts as a lightweight trigger that notices a new file in S3 and drops a message into the queue. The Processor picks up that message when the system is ready to handle it.
    
- **SQS Queue (Amazon Simple Queue Service):** This buffers the requests. Instead of processing 1,000 documents the second they are uploaded, SQS holds the line. This is the equivalent of an **Azure Service Bus Queue** or **Storage Queue**.
    

### 2. Orchestration & Processing (The Center Box)

This is the "brain" of the operation where the actual AI work happens.

- **Unified State Machine (AWS Step Functions):** This orchestrates the entire sequence of events, deciding which Lambda functions to run and in what order. It handles the branching logic (like the "Use BDA?" diamond). This is the AWS counterpart to **Azure Logic Apps** or **Durable Functions**.
    
- **The Lambda Pipeline (OCR, Extraction, Rule Validation, etc.):** In the top path, a series of Lambda functions sequentially process the document. They call out to **Amazon Textract** (similar to **Azure AI Document Intelligence**) to pull the text, and **Amazon Bedrock** (similar to the **Azure OpenAI Service**) to classify the pages, extract the specific entities, and validate business rules.
    
- **Invoke BDA (Bedrock Data Automation):** This is an alternative, newer path that handles the end-to-end extraction natively within Bedrock without needing a complex multi-step Lambda pipeline.
    

### 3. State Tracking & APIs (Top Center)

These services keep track of where a document is in the pipeline and serve that status to the frontend.

- **Document Tracking Table & Concurrency Counter (Amazon DynamoDB):** This is a highly scalable NoSQL database used to track the exact status of every document and ensure the system doesn't exceed its processing limits. The direct Azure equivalent is **Azure Cosmos DB**.
    
- **AWS AppSync API:** This provides a managed GraphQL API layer. It allows the web frontend to query the database and get real-time updates on document processing status. You might achieve something similar in Azure using **Azure API Management** or building a GraphQL endpoint in an Azure App Service.
    

### 4. User Interface, Analytics, & Storage (Right Side)

This handles how users interact with the system and how the final data is stored and analyzed.

- **GenAI IDP Web UI (S3 & CloudFront):** The frontend web application is stored as static files in S3 and delivered globally via CloudFront (a Content Delivery Network). This is structurally identical to hosting a frontend using an **Azure Static Web App** or Azure Blob Storage paired with **Azure Front Door**.
    
- **Amazon Cognito:** This handles user authentication and authorization, ensuring only secure logins can access the UI. This is the AWS equivalent of **Microsoft Entra ID B2C** (formerly Azure AD B2C).
    
- **Output / Reporting / Evaluation Buckets (Amazon S3):** Once the data is structured (usually as JSON), it is dumped back into object storage for long-term keeping.
    
- **Amazon Athena:** This is a serverless interactive query service that lets you run standard SQL queries directly against the JSON files sitting in the S3 Reporting Bucket—without needing to load them into a traditional database. The closest Azure equivalent is an **Azure Synapse Analytics Serverless SQL Pool**.
    
- **Amazon CloudWatch:** This collects the logs, metrics, and application traces from all the services above, functioning just like **Azure Monitor** and **Application Insights**.