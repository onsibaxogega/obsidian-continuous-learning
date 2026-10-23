
# Cloud APIs & Google Cloud SDK

> `Cloud APIs` provide programmatic interfaces to Google Cloud services — call them via `HTTP/JSON` or `gRPC` requests. 
> The `Google Cloud SDK` is the toolset for interacting with Google Cloud products and services, featuring `command-line tools` and `language-specific Cloud Client Libraries`. Both use Cloud APIs under the hood. #GCP_Cloud_APIs #GCP_SDK


---


## 1. Cloud APIs

- **Definition:** Cloud APIs are `programmatic interfaces` to Google Cloud services — you use a Google Cloud resource or service in your application by calling its corresponding Cloud API
- **Features accessible via Cloud APIs:** compute, networking, storage, machine learning, and more

### Two Ways to Call Cloud APIs

| Protocol      | Description                                                                                                                         |
| :------------ | :---------------------------------------------------------------------------------------------------------------------------------- |
| **HTTP/JSON** | standard HTTP requests with `JSON payloads` — widely supported, language-agnostic                                                   |
| **gRPC**      | `open-source remote procedure call framework` that uses an efficient `binary request structure` — faster and more compact than JSON |

> `NOTE:` gRPC is the preferred protocol for `high-performance, service-to-service communication` — it uses Protocol Buffers (protobuf) for serialization, which is significantly more efficient than JSON. The Cloud Client Libraries use gRPC under the hood by default. In Cloud Run microservices calling other GCP services, you're already using gRPC implicitly through the client libraries.

### Authentication

- to call Cloud APIs, the caller must supply `application credentials`
- credentials are validated to ensure the application is `allowed to access your Google Cloud project and resources`


---


## 2. Google Cloud SDK

- **Definition:** the Google Cloud SDK is used to `interact with Google Cloud products and services`
- **two categories of features:**
	- **command-line tools** — `gcloud`, `gsutil`, `bq`, etc.
	- **language-specific Cloud Client Libraries** — Python, Java, Go, Node.js, etc.
- both the CLI tools and client libraries `use Cloud APIs` to communicate with Google Cloud

### How It All Connects

![[cloud_apis.png|1058]]

> `NOTE:` you rarely call Cloud APIs directly — the `Cloud Client Libraries` handle authentication, retries, pagination, and serialization for you. Direct HTTP/JSON calls are typically only needed for APIs that don't have a client library yet or for quick `curl`-based testing.


---


## 3. Tips & Tricks

- **always use Cloud Client Libraries over raw HTTP calls** — they handle `authentication, retries with exponential backoff, and pagination` automatically
- **gRPC vs. HTTP/JSON** —  Cloud Client Libraries default to gRPC; you only need to think about this if you're calling APIs from environments where gRPC is blocked (some corporate firewalls block HTTP/2)
- **application default credentials (ADC)** — the Cloud Client Libraries automatically discover credentials via the `ADC chain`: attached service account (Cloud Run) → `GOOGLE_APPLICATION_CREDENTIALS` env var → user credentials from `gcloud auth application-default login`. For local development, run `gcloud auth application-default login` to authenticate
- **exam tip:** know the distinction between `Cloud APIs` (the programmatic interfaces themselves) and `Cloud Client Libraries` (the language-specific SDKs that wrap those APIs)