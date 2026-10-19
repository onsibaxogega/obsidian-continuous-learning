
# Cloud Storage

> `Cloud Storage` is Google Cloud's fully managed, durable, and highly available `object storage` service. It allows customers to store any amount of data and retrieve it as often as needed. #GCP_Cloud_Storage


---


## 1. Core Concept — Object Storage

- **Definition:** object storage is a computer data storage architecture that manages data as `"objects"` — not as a file and folder hierarchy (`file storage`) or as chunks of a disk (`block storage`)
- **What makes up an object:** each object is stored in a packaged format containing three things:
	- **binary data:** the `actual data itself` in binary form
	- **metadata:** relevant associated information such as `date created`, `author`, `resource type`, and `permissions`
	- **globally unique identifier:** a unique key in the form of a `URL`, which means object storage `interacts well with web technologies`
- **Common data types stored as objects:** video, pictures, and audio recordings

> `NOTE:` the fact that object keys are URLs is a key architectural property — it makes object storage `natively web-friendly`, unlike block or file storage


---


## 2. Cloud Storage — Use Cases & Primary Purpose

- **Primary use:** whenever `binary large-object storage` (also known as a `"BLOB"`) is needed
- **Common use cases:**
	- serving website content
	- storing data for `archival and disaster recovery`
	- distributing large data objects to end users via `direct download`
	- online content such as videos and photos
	- storage of `intermediate results` in processing workflows


---


## 3. Buckets

- **Definition:** Cloud Storage files are organized into `buckets` — a bucket is the top-level container for your objects
- **Bucket requirements:**
	- a `globally unique name`
	- a `specific geographic location` for where it should be stored
- **Location strategy:** the ideal location for a bucket is where `latency is minimized`
	- _Example:_ if most of your users are in Europe, pick a specific Google Cloud region in Europe, or the `EU multi-region`


---


## 4. Immutability & Versioning

- **Immutability:** storage objects offered by Cloud Storage are `immutable` — you do not edit them in place; instead, `a new version is created with every change made`
- **Without versioning (default):** new versions will always `completely overwrite` older versions
- **With versioning enabled:** Cloud Storage keeps a `detailed history of modifications` (i.e., overwrites or deletes) of all objects contained in that bucket
- **What versioning lets you do:**
	- list the `archived versions` of an object
	- restore an object to an `older state`
	- permanently delete a `specific version` of an object

> `NOTE:` versioning is a per-bucket setting — if you don't explicitly turn it on, `overwrites are destructive by default`


---


## 5. Access Control — IAM & ACLs

- **Why it matters:** data objects may contain `personally identifiable information`, so controlling access is essential to ensuring `security and privacy`
- **Two options for controlling access:**

### IAM Roles (recommended for most purposes)

- roles are inherited from `project → bucket → object`
- sufficient for most access control needs
- follows the security best practice of `least privilege` — each user should have access and permissions to `only the resources they need to do their jobs, and no more`

### Access Control Lists (ACLs) — for finer control

- each ACL consists of two pieces of information:
	- **scope:** defines `who` can access and perform an action (e.g., a specific user or group of users)
	- **permission:** defines `what actions` can be performed (e.g., read or write)


---


## 6. Lifecycle Management Policies

- **Why it exists:** storing and retrieving large amounts of object data can `quickly become expensive` — lifecycle policies give you automated cost control
- **Example policies:**
	- delete objects `older than 365 days`
	- delete objects `created before a specific date` (e.g., January 1, 2013)
	- keep only the `3 most recent versions` of each object in a versioning-enabled bucket
- **Key benefit:** ensures you're `not paying for more than you actually need`

> `NOTE:` lifecycle policies are applied at the `bucket level` and run automatically — they are essential for managing storage costs at scale, especially for archival and compliance use cases


---


## 7. Tips & Tricks

- **Choose bucket location wisely** — latency and data residency requirements should drive your decision; for Acme Corp's `acme-prod-123` project serving a US audience, a `US multi-region` or a specific US region is ideal
- **Default to IAM over ACLs** — ACLs add complexity; only reach for them when IAM's `project → bucket → object` inheritance model doesn't provide enough granularity
- **Enable versioning for critical data** — particularly for disaster recovery or compliance scenarios, but pair it with lifecycle policies to avoid unbounded storage growth
- **Use lifecycle rules from day one** — it's much easier to set them up proactively than to clean up months of accumulated stale objects later
