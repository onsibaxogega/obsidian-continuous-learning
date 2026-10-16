# PCD exam prep question style

Write Professional Cloud Developer (PCD) exam-style questions using only the source material the user provides. Do not use outside knowledge, and if the material does not support a question, a correct answer, or a point in a justification, leave it out. Match the style of the examples below: a realistic scenario with a technical or business constraint, a question that asks for the best action, one clearly best answer with plausible distractors that suit other situations, and a justification that explains why the answer fits the constraint and why each distractor falls short. Use the examples only as a guide to style and structure, never reuse their content, and vary which letter is correct. Follow the quiz file format document for syntax.

## Defaults

Apply these unless the user's message says otherwise:

- Input: Treat the user's message/provided documents as the source material. Do not ask clarifying questions. Start writing the quiz.
- Size and mix: Write 20 questions per quiz, with about 75% `multiple_choice` (15 questions) and about 25% `multiple_select` (5 questions).
- Title and description: Derive them from the subject of the notes.

## Examples

```json
{
  "title": "PCD sample questions",
  "description": "Style examples for Professional Cloud Developer exam questions.",
  "questions": [
    {
      "id": 1,
      "type": "multiple_choice",
      "question": "You are developing an online gaming platform as a microservices application on GKE. Users on social media are complaining about long loading times in certain parts of the application. You need to investigate performance bottlenecks in the application and identify which HTTP requests have a significantly high latency span in user requests. What should you do?",
      "choices": {
        "A": "Instrument your microservices by installing the OpenTelemetry tracing package. Update your application code to send traces to Trace for inspection and analysis. Create an analysis report on Trace to analyze user requests.",
        "B": "Update your microservices to log HTTP request methods and requests to STDOUT. Use the logs router to send container logs to Cloud Logging. Create filters in Cloud Logging to evaluate the latency of user requests across different methods and request paths.",
        "C": "Configure GKE workload metrics using kubectl. Select all Pods to send their metrics to Cloud Monitoring. Create a custom dashboard of application metrics in Cloud Monitoring to determine performance bottlenecks of your GKE cluster.",
        "D": "Install tcpdump on your GKE nodes. Run tcpdump to capture network traffic over an extended period of time to collect data. Analyze the data files using Wireshark to determine the cause of high latency."
      },
      "answer": "A",
      "justification": "Distributed tracing with OpenTelemetry and Cloud Trace records a latency span for each step of a user request across microservices, and Trace analysis reports show which requests are slow. Logs (B) can show timing within one service, but they do not connect the steps of a single request into spans. Workload metrics (C) are aggregated per Pod and do not describe individual HTTP requests. Capturing packets with tcpdump and Wireshark (D) is impractical at scale and does not map traffic to application-level requests."
    },
    {
      "id": 2,
      "type": "multiple_choice",
      "question": "You need to containerize a web application that will be hosted on Google Cloud behind a global load balancer with SSL certificates. You don’t have the time to develop authentication at the application level, and you want to offload SSL encryption and management from your application. You want to configure the architecture using managed services where possible. What should you do?",
      "choices": {
        "A": "Host the application on GKE, and deploy an NGINX Ingress Controller to handle authentication.",
        "B": "Host the application on GKE, and deploy cert-manager to manage SSL certificates.",
        "C": "Host the application on GKE, and use Identity-Aware Proxy (IAP) with Cloud Load Balancing and Google-managed certificates.",
        "D": "Host the application on Compute Engine, and configure Cloud Endpoints for your application."
      },
      "answer": "C",
      "justification": "IAP adds authentication in front of the application without any application code, and Cloud Load Balancing with Google-managed certificates terminates SSL and handles certificate renewal. Both are managed services, which meets the stated preference. An NGINX Ingress Controller (A) and cert-manager (B) are components you deploy and operate yourself, and cert-manager does not address authentication. Cloud Endpoints (D) manages APIs rather than offloading SSL and user sign-in for a web application."
    },
    {
      "id": 3,
      "type": "multiple_choice",
      "question": "You manage a microservice-based ecommerce platform on Google Cloud that sends confirmation emails to a third-party email service provider using a Cloud Run function. Your company just launched a marketing campaign, and some customers are reporting that they have not received order confirmation emails. You discover that the services triggering the Cloud Run function are receiving HTTP 500 errors. You need to change the way emails are handled to minimize email loss. What should you do?",
      "choices": {
        "A": "Increase the Cloud Run function’s timeout to nine minutes.",
        "B": "Configure the sender application to publish the outgoing emails in a message to a Pub/Sub topic. Update the Cloud Run function configuration to consume the Pub/Sub queue.",
        "C": "Configure the sender application to retry the execution of the Cloud Run function every one second if a request fails.",
        "D": "Configure the sender application to write emails to Memorystore and then trigger the Cloud Run function. When the function is triggered, it reads the email details from Memorystore and sends them to the email service."
      },
      "answer": "B",
      "justification": "Pub/Sub decouples the sender from the function, durably stores each email, and redelivers it until the function acknowledges it, so a burst of traffic or a failing function no longer loses emails. A longer timeout (A) does not address errors that appear under load. Retrying every second (C) adds more load while the function is struggling, and the emails are lost if the sender fails or stops retrying. Memorystore (D) is an in-memory cache rather than a durable queue, and the sender still calls the function directly, so the same failure point remains."
    },
    {
      "id": 4,
      "type": "multiple_choice",
      "question": "You are developing a web application that contains private images and videos stored in a Cloud Storage bucket. Your users are anonymous and do not have Google Accounts. You want to use your application-specific logic to control access to the images and videos. How should you configure access?",
      "choices": {
        "A": "Configure Identity-Aware Proxy (IAP) to authenticate users into the web application. Allow users to access the bucket after authenticating through IAP.",
        "B": "Grant the Storage Object Viewer IAM role to allUsers. Allow users to access the bucket after authenticating through your web application.",
        "C": "Cache each web application user’s IP address to create a named IP list using Google Cloud Armor. Create a Google Cloud Armor security policy that allows users to access the backend bucket.",
        "D": "Generate a signed URL that grants read access to the bucket. Allow users to access the URL after authenticating through your web application."
      },
      "answer": "D",
      "justification": "A signed URL gives time-limited access to Cloud Storage objects without requiring the user to have a Google Account, and your application logic decides who receives one. IAP (A) authenticates users to an application with supported identities, which anonymous users do not have, and it does not authorize access to bucket objects. Granting Storage Object Viewer to allUsers (B) makes the objects public, so the application logic no longer controls access. Cloud Armor IP lists (C) filter traffic by address, which is not a reliable way to identify or authorize individual users."
    },
    {
      "id": 5,
      "type": "multiple_choice",
      "question": "You work on an application that relies on Cloud Spanner as its main datastore. New application features have occasionally caused performance regressions. You want to prevent performance issues by running an automated performance test with Cloud Build for each commit made. If multiple commits are made at the same time, the tests might run concurrently. What should you do?",
      "choices": {
        "A": "Create a project with a Cloud Spanner instance and the required data. Adjust the Cloud Build build file to automatically restore the data to its previous state after the test is complete.",
        "B": "Create a new project with a random name for every build. Load the required data. Delete the project after the test is complete.",
        "C": "Create a new Cloud Spanner instance for every build. Load the required data. Delete the Cloud Spanner instance after the test is complete.",
        "D": "Start the Cloud Spanner emulator locally. Load the required data. Shut down the emulator after the test is complete."
      },
      "answer": "C",
      "justification": "A separate Cloud Spanner instance for each build isolates concurrent tests from each other, measures performance on the real service, and is deleted afterward to avoid ongoing cost. Sharing one instance and restoring the data afterward (A) fails when builds overlap, because concurrent tests change each other’s data and skew timing. Creating a new project for every build (B) adds project setup, quota, and billing overhead that a separate instance already avoids. The emulator (D) does not reproduce the performance characteristics of Cloud Spanner, so it cannot detect performance regressions."
    }
  ]
}
```
