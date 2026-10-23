
# Managed Data Storage Services

> Google Cloud offers a full range of `managed storage services` — no one size fits all, and your choice depends on your `application and workload`. Each service is optimized for a specific data type, access pattern, and scale requirement. #GCP_Data_Storage


![[gcloud_storage_services_suite.png|1067]]
---


## 1. Cloud Storage — Object Storage

- **Definition:** unified `object storage` for serving, analyzing, and archiving data anywhere in the world
- objects are accessed via `HTTP requests`, including `ranged GETs` to retrieve portions of data
- the only key is the `object name` — the object itself is treated as `unstructured bytes`
- objects can be up to `5 TB each`
- built for `availability, durability, scalability, and consistency`

### Ideal Use Cases

- hosting `static websites`
- storing `images, videos, objects, and blobs`
- storing any `unstructured data`
- serving `large static content`
- accepting `user-uploaded content` (videos, photos, files)


---


## 2. Firestore — NoSQL Document Database

- **Definition:** a fast, fully managed, serverless, `NoSQL document database` built for automatic scaling, high performance, and ease of application development #GCP_Firestore
- **Key features:**
	- `strongly consistent` storage layer
	- `hierarchical` collection and document-based data model
	- `real-time updates` and `offline features`
	- `mobile and web` client libraries
- data model: store data in `documents`, organized into `collections` — documents can contain `complex nested objects` and `subcollections`
- built to scale with `automatic scaling` in response to application load

### Ideal Use Cases

- `mobile and web apps`, especially those requiring flexible data storage
- applications with `external user accounts`
- use cases needing `real-time sync` and `offline support`

---


## 3. Bigtable — Wide-Column NoSQL

- **Definition:** a high-performance, `NoSQL database` that can scale to `billions of rows` and `thousands of columns` #GCP_Bigtable
- stores `terabytes to petabytes` of data
- built for fast `key-value lookup` with consistent `sub-10ms latency`
- offers `seamless scaling` — changes to deployment configuration are immediate with `no downtime`
- supports the open-source `HBase API`

### Ideal Use Cases

- storing `user behavior` data (fast lookup and write speed)
- `operational and analytical` applications
- storing `large amounts of single-keyed data`
- performing `MapReduce` operations
- `IoT` and `time-series` data


---


## 4. Cloud SQL — Managed Relational Database

- **Definition:** Google Cloud's `managed relational database` service supporting `MySQL`, `PostgreSQL`, and `SQL Server` #GCP_Cloud_SQL
- Google manages `replication, failover, and backups`
- supports `read replicas` — a copy of the primary that reflects changes in `almost-real time`
- supports `automatic failover` for high availability

### Cloud SQL Auth Proxy

- a local client (proxy) runs in the local environment
- the application communicates with the proxy using the `standard database protocol`
- the proxy uses a `secure tunnel` to communicate with the server
- provides `secure access` without configuring `allowed IP addresses` or `SSL certificates`

### Ideal Use Cases

- `web frameworks` and applications requiring `structured data`
- `OLTP` (online transaction processing) workloads
- applications using `MySQL, PostgreSQL, or SQL Server` with `minimal refactoring` for migration


---


## 5. AlloyDB — High-Performance PostgreSQL

- **Definition:** a fully managed, `high-performance PostgreSQL` database service from Google Cloud #GCP_AlloyDB
- **key architecture insight:** Google `separates compute and storage` for the database — the same approach used by Bigtable and Spanner, enabling independent scaling
- historically, PostgreSQL runs on a `single VM with an attached disk` — this architecture is `difficult to scale`

### Performance Claims

- `4x faster` than standard PostgreSQL for `transactional workloads`
- `100x faster` for `analytical queries` via the `Columnar Engine`
- `zero impact` on transactional performance when running BI, reporting, and `hybrid transactional/analytical processing (HTAP)` workloads

### Key Properties

- full `PostgreSQL compatibility`
- `high availability` with automatic scaling
- Google manages `replication, failover, and backups`
- **AlloyDB Auth Proxy** — similar to Cloud SQL Auth Proxy; secure access without configuring allowed IPs or SSL certificates

### Ideal Use Cases

- applications requiring `high performance` and `PostgreSQL compatibility`
- applications performing a `mix of transactional and analytical processing` (HTAP)


---


## 6. Spanner — Globally Distributed Relational Database

- **Definition:** Google Cloud's fully managed relational database offering both `strong consistency` and `horizontal scalability` #GCP_Spanner
- designed for `mission-critical OLTP` applications
- provides `automatic, synchronous replication` for high availability
- built for `multi-region replication`
- offers one of the highest SLAs in the industry: `99.999%` (five nines)

### Ideal Use Cases

- applications with `relational, structured, and semi-structured data`
- applications requiring `high availability, strong consistency, and transactional reads/writes`
- `global-scale` applications needing multi-region replication


---


## 7. Storage Decision Guide — Quick Reference

| Service           | Data Model                         | Scale                     | Latency  | Best For                             |
| :---------------- | :--------------------------------- | :------------------------ | :------- | :----------------------------------- |
| **Cloud Storage** | unstructured blobs                 | up to 5 TB per object     | varies   | static assets, media, backups        |
| **Firestore**     | NoSQL documents                    | auto-scaling              | low      | mobile/web apps, real-time sync      |
| **Bigtable**      | wide-column NoSQL                  | PB-scale                  | sub-10ms | IoT, time-series, analytics          |
| **Cloud SQL**     | relational (MySQL, PG, SQL Server) | up to ~64 TB              | low      | web apps, OLTP                       |
| **AlloyDB**       | relational (PostgreSQL)            | separated compute/storage | very low | high-perf HTAP, PostgreSQL workloads |
| **Spanner**       | relational (globally distributed)  | unlimited horizontal      | low      | global OLTP, five-nines availability |
| **BigQuery**      | columnar analytics                 | PB-scale                  | seconds  | data warehousing, BI, ad-hoc queries |

> `NOTE:` for the exam, know which service to recommend based on the use case described in the question. The key differentiators: `Cloud SQL` = managed relational (single region), `AlloyDB` = high-perf PostgreSQL (HTAP), `Spanner` = global relational (five nines), `Firestore` = NoSQL document (mobile/web), `Bigtable` = NoSQL wide-column (IoT/time-series), `BigQuery` = analytics, `Cloud Storage` = blobs, 


---


## 8. Tips & Tricks

- **Cloud SQL Auth Proxy is always the answer** — any exam question about connecting to Cloud SQL securely from a VM or Cloud Run will have Auth Proxy as the correct answer; never allowlist IPs in production
- **AlloyDB vs. Cloud SQL for PostgreSQL** — if the question mentions `high performance`, `analytical queries`, or `HTAP`, the answer is AlloyDB; if it's a standard OLTP workload, Cloud SQL is sufficient
- **Spanner vs. Cloud SQL** — if the question mentions `global scale`, `multi-region`, `five nines`, or `horizontal scaling of a relational database`, the answer is Spanner; Cloud SQL only scales vertically
- **Firestore vs. Bigtable** — Firestore is for `document data with real-time sync`; Bigtable is for `massive single-keyed datasets with sub-10ms reads`; they serve very different use cases despite both being NoSQL
- **BigQuery is not a transactional database** — it's an `analytics/data warehouse` service; never recommend it for OLTP workloads
- **AlloyDB separated compute/storage** — this is the same architecture as Bigtable and Spanner; it's what enables AlloyDB to scale independently while maintaining PostgreSQL compatibility
