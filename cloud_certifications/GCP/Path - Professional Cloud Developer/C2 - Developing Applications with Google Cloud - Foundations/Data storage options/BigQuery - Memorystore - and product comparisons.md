
# BigQuery, Memorystore & Storage Comparison

> Choose the right storage option by understanding what each product `is and isn't ideal for` by design. You are `not limited to a single database` — choose the one most suitable for each use case. #GCP_Data_Storage #GCP_BigQuery #GCP_Memorystore


---


## 1. BigQuery — Analytics & Data Warehousing

- **Definition:** a fully managed, serverless `enterprise data warehouse` for analytics #GCP_BigQuery
- **Built-in features:** machine learning, geospatial analysis, business intelligence
- **Performance:** scans `terabytes in seconds` and `petabytes in minutes`

### Ideal Use Cases

- `OLAP` (online analytical processing) workloads
- big data `exploration and processing`
- `reporting` with business intelligence tools

### NOT Ideal For

- `OLTP` (transactional) workloads — BigQuery is an analytics engine, not a transactional database
- low-latency, high-frequency `read/write` operations

> `NOTE:` BigQuery is where your data goes `after` it's been generated — it's the analytics layer, not the operational layer. For your team at Acme Corp, the pattern could be: Cloud SQL (operational data) → export/stream to BigQuery (analytics, BI, reporting). Never use BigQuery as your application's primary database.


---


## 2. Memorystore — In-Memory Caching

- **Definition:** a fully managed, in-memory data store supporting `Redis` and `Memcached` — fully protocol compatible with each engine #GCP_Memorystore
- **Managed features:** provisioning, replication, failover, and patching are all `automated`
- **Monitoring:** integrates with `Cloud Monitoring` for instance monitoring and alerts
- **Security:**
	- protected from the internet using `VPC networks` and `internal IP addresses`
	- integrates with `IAM` for access control

### Ideal Use Cases

- `scalable web applications` — caching frequently accessed data
- `gaming` — low-latency state management
- `stream processing` — fast, real-time access or processing of data
- `distributed in-memory data store` for any use case requiring `sub-millisecond reads`

> `NOTE:` for a Cloud Run + Cloud SQL stack at Acme Corp, Memorystore for Redis sits between your application and Cloud SQL — cache frequently accessed query results (e.g., user profiles, config data) to reduce database load and improve response times. Since Memorystore is `inside the VPC` with internal IPs only, it's secure by default.


---


## 3. Storage Decision Guide — Comprehensive Comparison

| Service           | Type                               | Ideal For                                            | NOT Ideal For                                       | Latency  | Scale                     |
| :---------------- | :--------------------------------- | :--------------------------------------------------- | :-------------------------------------------------- | :------- | :------------------------ |
| **Cloud Storage** | object storage                     | static assets, media, backups, unstructured blobs    | structured data, transactional workloads            | varies   | up to 5 TB per object     |
| **Firestore**     | NoSQL document                     | mobile/web apps, real-time sync, flexible schemas    | analytics, full SQL joins, extreme write throughput | low      | auto-scaling              |
| **Bigtable**      | NoSQL wide-column                  | IoT, time-series, massive single-keyed datasets      | multi-row transactions, small datasets (<1 TB)      | sub-10ms | PB-scale                  |
| **Cloud SQL**     | relational (MySQL, PG, SQL Server) | web apps, OLTP, structured data                      | horizontal scaling, global distribution             | low      | up to ~64 TB              |
| **AlloyDB**       | relational (PostgreSQL)            | high-perf HTAP, analytical + transactional mix       | non-PostgreSQL workloads                            | very low | separated compute/storage |
| **Spanner**       | relational (global)                | global OLTP, five-nines availability, horizontal SQL | small-scale apps (cost), non-relational data        | low      | unlimited horizontal      |
| **BigQuery**      | columnar analytics                 | OLAP, BI, reporting, big data exploration            | OLTP, low-latency transactional reads/writes        | seconds  | PB-scale                  |
| **Memorystore**   | in-memory cache                    | caching, session management, real-time access        | persistent primary storage, complex queries         | sub-ms   | depends on instance size  |


---


## 4. Key Design Principle — Use Multiple Databases

- you are `not limited to a single database` — choose the database that is `most suitable for each use case`
- `size limits are per database` — you can exceed limits by splitting data into multiple databases
- a typical application might use:
	- `Cloud Storage` for user-uploaded images
	- `Cloud SQL` or `AlloyDB` for transactional data
	- `Memorystore` for caching hot data
	- `BigQuery` for analytics and reporting
	- `Firestore` for real-time features

### Acme Corp Example Architecture

![[example_multi-db_archt.png|1098]]

> `NOTE:` this multi-database pattern is a `very common exam question` — if a question describes an application that needs to store images, serve transactional data, cache results, AND run analytics, the answer is `multiple services`, not a single one. Each service is purpose-built for a specific data type and access pattern.


---


## 5. Other Considerations for Choosing Storage

When choosing a storage option, also evaluate:

- **read/write latency** requirements
- **typical size of your data**
- **storage type** (structured, semi-structured, unstructured)

> `NOTE:` refer to the [Google Cloud documentation](https://cloud.google.com/products/databases) for the latest size limits, pricing, and feature comparisons — these change over time.


---


## 6. Tips & Tricks

- **BigQuery is for analytics, not transactions** — if an exam question mentions `OLAP`, `BI`, `reporting`, or `petabyte-scale queries`, the answer is BigQuery; if it mentions `OLTP` or `low-latency writes`, it's not
- **Memorystore is a cache, not a primary database** — it's `volatile` by design; always have a persistent backend (Cloud SQL, Firestore) behind it
- **Redis vs. Memcached in Memorystore:**
	- `Redis` — supports data structures (sorted sets, hashes, pub/sub), persistence, replication; choose for most use cases
	- `Memcached` — simpler, multi-threaded, good for pure key-value caching; choose when you need multi-threaded performance and don't need persistence
- **use the architecture diagram pattern in §4** — when designing your application's data layer, map each data type to the purpose-built service; this is both the exam answer and the real-world best practice
- **exam tip:** if a question asks "which storage option is NOT suitable for [use case]," the "NOT ideal for" column in the comparison table is exactly what they're testing
