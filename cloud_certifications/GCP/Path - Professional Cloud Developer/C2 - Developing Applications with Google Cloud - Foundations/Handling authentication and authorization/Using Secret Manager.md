
# GCP Secret Manager

> a secure and convenient way to `store, manage, and access sensitive information` such as API keys, passwords, and certificates — replacing scattered flat files with a centralized, IAM-controlled secret store


---


## 1. Core Concept

- **Definition:** Secret Manager provides a `centralized secret store` where you can store, manage, and access secrets as binary blobs or text strings
- **The problem it solves:** developers often store credentials in flat files — access is easy, but security is difficult because `not everyone should be able to see this information`
	- using flat files leads to `secrets being scattered across your organization's cloud and on-premises infrastructure`
	- restricting access via file system permissions is fragile and hard to manage at scale
- **Why It Matters for Enterprise:**
	- **centralization:** keeping all secrets in a single place simplifies secure management
	- **IAM-controlled access:** only users and applications with `appropriate IAM permissions` can access the secret — no more relying on file system ACLs
	- **auditability:** every interaction generates an audit entry when Cloud Audit Logs are enabled


---


## 2. Key Features

- **Global names, regional data:** the name of a secret is `global`, but the secret data can optionally be stored in a `specified region`
	- a replication policy of `automatic` lets the secret payload be stored in any region
	- a replication policy of `user-managed` lets you specify the regions where the secret might be stored
- **Versioning:**
	- secrets can be `versioned` — each version can have different secret data
	- there is `no limit` on the number of versions that can be stored
	- versions `cannot be modified`, but they `can be deleted`
	- versions are identified by ordinal numbers (`1`, `2`, `3`, ...) or the keyword `latest`
- **Principle of least privilege:**
	- secrets are created at the `project level`
	- only `project owners` start with permission to create and access secrets
	- other roles must be `explicitly granted IAM permissions`
- **Audit logging:**
	- when Cloud Audit Logs are enabled, every interaction with Secret Manager — including `reads and updates` — generates an audit entry
	- this lets you verify that only the appropriate users and apps are accessing your secrets
- **Encryption:**
	- Secret Manager manages `server-side encryption keys on your behalf` using the same hardened key management systems used for Google's own encrypted data
	- optionally integrates with `Cloud Key Management Service (Cloud KMS)` — Cloud KMS can encrypt the version before storing it, and decrypt it upon retrieval


---


## 3. Implementation

### Creating a Secret (gcloud CLI)

```bash
# create a secret named "my-secret" with data piped from echo
# replication policy set to "automatic" — secret payload can be stored in any region
echo -n "s3cr3t-valu3" | gcloud secrets create my-secret \
    --data-file=- \
    --replication-policy="automatic"

# alternative: "user-managed" replication policy to specify regions
# --replication-policy="user-managed" --locations="us-central1,us-east1"
```

### Retrieving a Secret (Python SDK)

```python
# pip install google-cloud-secret-manager

from google.cloud import secretmanager

def access_secret(project_id: str, secret_id: str, version_id: str = "latest") -> str:
    """retrieve a secret version from Secret Manager."""

    # create the Secret Manager client
    client = secretmanager.SecretManagerServiceClient()

    # build the resource name
    # format: projects/{project_id}/secrets/{secret_id}/versions/{version_id}
    # version_id can be an ordinal number (1, 2, 3) or "latest"
    name = f"projects/{project_id}/secrets/{secret_id}/versions/{version_id}"

    # access the secret version
    response = client.access_secret_version(request={"name": name})

    # decode and return the payload
    secret_value = response.payload.data.decode("UTF-8")
    return secret_value


# usage example
secret = access_secret("acme-prod-123", "my-secret", "latest")
```

- `NOTE:` the Secret Manager Python SDK can be used to `create, update, delete, or access` secrets — the example above only shows retrieval


---


## 4. Best Practices & Security

- **never store secrets in flat files or source code** — use Secret Manager as the single source of truth for all credentials
- **use `user-managed` replication** when data residency requirements apply (e.g., government or regulated workloads that must stay in specific regions)
- **use Cloud KMS integration** when you need `customer-managed encryption keys (CMEK)` for additional control over secret encryption
- **enable Cloud Audit Logs** to maintain a complete audit trail of who accessed which secrets and when
- **version your secrets** — when rotating credentials, create a new version rather than deleting and recreating the secret; this preserves the audit trail and allows rollback
- **grant IAM roles at the secret level**, not the project level, to follow the principle of least privilege — use `roles/secretmanager.secretAccessor` for read-only access


---


## 5. Tips & Tricks

- use the `latest` keyword when accessing secrets from your application code so you don't need to update version references after rotation
- in Cloud Run, you can `mount secrets as environment variables or volumes` directly from Secret Manager at deploy time — no SDK code needed for simple use cases
- combine Secret Manager with `Cloud Scheduler` or a Cloud Run function to automate secret rotation on a schedule
- when using Terraform, manage secrets with the `google_secret_manager_secret` and `google_secret_manager_secret_version` resources to keep your infrastructure-as-code workflow consistent
- for your dev/test/prod project separation, create secrets in each respective project rather than sharing across projects — this aligns with IAM boundary isolation
