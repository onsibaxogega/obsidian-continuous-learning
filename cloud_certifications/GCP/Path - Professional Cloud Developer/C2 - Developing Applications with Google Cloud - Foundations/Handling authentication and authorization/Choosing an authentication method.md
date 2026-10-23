
# GCP Authentication Methods

> authenticating to `Google Cloud APIs` from an application — choosing the right method based on where your application runs and what identity provider is available


---


## 1. Core Concept

- **Definition:** Google Cloud provides `multiple authentication methods` for applications to securely access its APIs, and the right choice depends on where your application runs and whether identity federation is possible
- **Why It Matters for Enterprise:**
	- **security posture:** choosing the correct auth method minimizes credential exposure and aligns with `zero-trust principles`
	- **operational overhead:** some methods (e.g., service account keys) require manual rotation and secure storage, while others (e.g., Workload Identity) are fully managed
	- **portability:** Application Default Credentials (ADC) lets your code remain `environment-agnostic` — the same code works locally, on Cloud Run, GKE, or even outside Google Cloud

### Authentication Decision Tree

the decision tree follows this logic:

1. **is your app running on Google Cloud?**
	- **yes, but not on GKE** → use `attached service accounts` (production) or `gcloud auth application-default login` (local dev)
	- **yes, on GKE** → use `Workload Identity`
	- **no** → proceed to step 2
2. **is federation possible?** (i.e., can your external environment generate an ID token?)
	- **yes** → use `Workload Identity Federation`
	- **no** → use `service account keys` (last resort)

![[gcp_authentication_decision_tree.png|1171]]


---


## 2. Application Default Credentials (ADC) #ADC

- **Definition:** ADC is `a strategy used by Cloud Client Libraries` to automatically find your application's credentials and authenticate to Google Cloud APIs
- think of ADC as a `credential resolver` — it searches a well-defined sequence of locations for valid credentials so your code doesn't need to specify them explicitly
- **Key Benefit:** your code `does not need to change` when moving between environments — from local dev to Cloud Run to GKE to external workloads

### ADC Credential Search Order

ADC checks for credentials in the following order:

1. **`GOOGLE_APPLICATION_CREDENTIALS` environment variable** — if set, ADC uses the service account file at the path specified by this variable
2. **well-known location for user credentials** — credentials set using `gcloud auth application-default login` via the gcloud CLI are stored here
3. **attached service account** — if running on a Google Cloud service, ADC uses the service account attached to the specific resource (e.g., a Cloud Run service); if no specific service account is attached, ADC falls back to the `default service account` for the compute service (Compute Engine, GKE, Cloud Run)
4. **error** — if no credentials are found during all checks, an error is raised

- `NOTE:` the search order means you can override credentials at any level — e.g., setting the environment variable takes precedence over an attached service account

### Python Example

```python
# ADC automatically finds credentials — no explicit credential specification needed
# the same code works locally, on Cloud Run, GKE, or external environments

from google.cloud import storage

def list_buckets():
    # ADC searches for credentials in the defined order
    # no credentials are passed to the client constructor
    storage_client = storage.Client()
    
    buckets = storage_client.list_buckets()
    for bucket in buckets:
        print(bucket.name)
```


![[adc_credential_search_flow.png|723]]


---


## 3. Authentication Methods

### 3a. Local Development — `gcloud auth application-default login`

- **Command:** `gcloud auth application-default login`
- this generates `a JSON file containing user access credentials` and places it in the well-known location that ADC checks
- the JSON file allows your application to make API calls `with your user identity`
- **Security:** the JSON file is secure, `does not include your password`, and is `time-bound`

- `NOTE:` do not confuse this with `gcloud auth login`:

| Command | Purpose |
| :--- | :--- |
| `gcloud auth login` | authenticates your identity for `gcloud CLI commands` |
| `gcloud auth application-default login` | authenticates your identity for `application code` calling Google Cloud APIs |

### 3b. Attached Service Accounts #attached_service_accounts

- **Definition:** the preferred way to authenticate production applications running on `Google Cloud serverless products` (Cloud Run, Cloud Run functions) or `Compute Engine`
- attach a `user-managed service account` directly to the compute or serverless instance instead of using the default service account
- that service account should be given `only the privileges needed` by your application (principle of least privilege)

- **Compute Engine:** replace the default service account on the VM with a service account created specifically for your application
- **Cloud Run / Cloud Run functions:** attach a service account to the specific service or function at deployment time

- `NOTE:` attaching a user-managed service account is `the preferred way to provide credentials to ADC` for production code running on Google Cloud

### 3c. Workload Identity (GKE) #Workload_Identity

- **Definition:** Workload Identity allows `a Kubernetes service account` in your GKE cluster to act as an `IAM service account` when your application calls Google Cloud APIs
- think of it as `bridging Kubernetes identity to Google Cloud IAM identity` — your pods authenticate as a Google Cloud service account without ever handling keys

- **How it works:**
	- Workload Identity `automatically exchanges` Kubernetes service account tokens for IAM tokens when calling Google Cloud APIs
	- this allows you to assign `distinct, fine-grained identities and authorization` for each application in your cluster

- **Setup steps:**
	1. enable Workload Identity on your GKE cluster
	2. configure the Kubernetes service account to impersonate the IAM service account you created
	3. ADC manages the rest — no code changes needed

### 3d. Workload Identity Federation (External Workloads) #Workload_Identity_Federation

- **Definition:** Workload Identity Federation lets you grant `on-premises or multi-cloud workloads` access to Google Cloud APIs `without requiring a service account key`
- works with any identity provider that supports `OpenID Connect (OIDC)` — e.g., AWS, Azure AD, on-premises IdPs
- **How it works:**
	- an external `OpenID Connect ID token` is exchanged for a `short-lived Google Cloud access token`
	- that access token allows impersonation of an IAM service account
	- the external app can call Google Cloud services `without securing or rotating a service account key`

- `NOTE:` this replaces the traditional approach of using service account keys for external applications — significantly reducing credential management overhead and security risk

### 3e. Service Account Keys (Last Resort) #service_account_keys

- **Definition:** a downloaded or uploaded key pair used to authenticate as a service account from outside Google Cloud
- `NOTE:` using service account keys is a `last resort` — only use when federation is not possible
- service account keys are `powerful credentials` that can present a `security risk` when not managed correctly


---


## 4. Best Practices & Security

- **Upload your own public key** instead of downloading a private key created by Google
	- generate a public/private key pair using your own infrastructure
	- upload the public key to Google
	- securely deliver the private key to your runtime environment
	- this `leaves less chance of error` when handling your private key
- **Never embed keys in source code or binaries**
	- keys can be `extracted from binaries`
	- source code might be hosted in repositories, making keys `more likely to be compromised`
- **Principle of least privilege**
	- grant only the `minimum set of permissions necessary` for the associated application
	- if a service account key is compromised, this `limits the access for the bad actor`
- **Prefer keyless authentication** whenever possible — Workload Identity and Workload Identity Federation eliminate the need for key management entirely


---


## 5. Tips & Tricks

- use `gcloud auth application-default login` during local development — it's the simplest path and ADC picks it up automatically
- when deploying to Cloud Run, always `attach a user-managed service account` at deploy time rather than relying on the default service account, e.g., `gcloud run deploy --service-account=my-sa@acme-prod-123.iam.gserviceaccount.com`
- if you're running workloads on GKE, `enable Workload Identity at cluster creation` to avoid retrofitting later
- for multi-cloud or on-premises workloads (e.g., CI/CD pipelines in GitHub Enterprise), prefer `Workload Identity Federation` over service account keys
- remember the ADC search order (`env var → well-known location → attached SA → default SA → error`) — this helps you debug authentication issues quickly
- test ADC resolution locally by running `gcloud auth application-default print-access-token` to verify which credentials ADC is finding
