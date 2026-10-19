
# Google Cloud Storage Products Overview

> Google Cloud provides storage options for `structured`, `unstructured`, `transactional`, and `relational` data — every application needs to store data, whether it's media to be streamed or sensor data from devices.


---


## 1. Core Storage Products

Google Cloud has `five core storage products`, each designed for different application needs and workloads: #GCP_Storage

- **Cloud Storage:** object storage for `unstructured data` (e.g., media files, backups, archives)
- **Cloud SQL:** managed `relational database` service for structured data
- **Spanner:** globally distributed, horizontally scalable `relational database` with strong consistency
- **Firestore:** flexible, scalable `NoSQL document database` for mobile, web, and server development
- **Bigtable:** managed `wide-column NoSQL` database for large analytical and operational workloads

> `NOTE:` depending on your application, you might use `one or several` of these services together — choosing the right storage product depends on the data type, access patterns, and scale requirements.


---


## 2. Choosing the Right Storage Product

- **structured + relational + SQL:** Cloud SQL or Spanner
- **structured + non-relational + high throughput:** Bigtable
- **semi-structured / document-based:** Firestore
- **unstructured (files, blobs, media):** Cloud Storage

![[gcp_storage_decision_flow.png|1310]]
