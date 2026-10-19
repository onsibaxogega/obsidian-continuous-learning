
# Google Cloud Storage — Decision Guide

> Use this note as a `quick-reference decision guide` for choosing the right GCP core storage product based on your application's requirements. This maps directly to the certification exam's storage selection questions. #GCP_Storage_Decision


---


## 1. Decision Matrix

| Storage Product   | Consider When                                                                                                                   | Capacity                                | Max Unit Size                  | Best For                                                                        |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------- | :----------------------------- | :------------------------------------------------------------------------------ |
| **Cloud Storage** | storing `immutable blobs` larger than 10 MB (e.g., large images, movies)                                                        | `petabytes`                             | 5 TB per object                | media, backups, archives, large file distribution                               |
| **Cloud SQL**     | you need `full SQL support` for OLTP; horizontal scalability is not required                                                    | up to `64 TB` (depends on machine type) | n/a                            | web frameworks, existing applications (e.g., user credentials, customer orders) |
| **Spanner**       | you need full SQL support for OLTP but Cloud SQL doesn't fit because you need `horizontal scalability` (not just read replicas) | `petabytes`                             | n/a                            | global-scale transactional apps, financial systems                              |
| **Firestore**     | you need `massive scaling + predictability` with `real-time query results` and `offline query support`                          | `terabytes`                             | 1 MB per entity                | storing, syncing, and querying data for mobile and web apps                     |
| **Bigtable**      | storing a `large number of structured objects`; no SQL queries or multi-row transactions needed                                 | `petabytes`                             | 10 MB per cell; 100 MB per row | analytical data with heavy read/write events (e.g., AdTech, financial, IoT)     |


---


## 2. Key Decision Signals for the Exam

- **"immutable blobs" / "large files" / "media"** → `Cloud Storage`
- **"full SQL" / "OLTP" / "web framework" / "existing application"** → `Cloud SQL`
- **"horizontal scalability" / "global consistency" / "Cloud SQL doesn't fit"** → `Spanner`
- **"mobile" / "web" / "real-time" / "offline" / "sync"** → `Firestore`
- **"NoSQL" / "time-series" / "IoT" / "AdTech" / "heavy read/write" / "> 1 TB"** → `Bigtable`

> `NOTE:` the phrase `"horizontal scalability, not just through read replicas"` is the exact signal that distinguishes Spanner from Cloud SQL — if a question mentions read replicas as insufficient, the answer is Spanner


---


## 3. Capacity Quick Reference

| Product       | Capacity      | Max Unit Size                       |
| :------------ | :------------ | :---------------------------------- |
| Cloud Storage | petabytes     | `5 TB` per object                   |
| Cloud SQL     | up to `64 TB` | depends on machine type             |
| Spanner       | petabytes     | n/a                                 |
| Firestore     | terabytes     | `1 MB` per entity                   |
| Bigtable      | petabytes     | `10 MB` per cell / `100 MB` per row |


---


## 4. Important Limitations to Remember

- **Cloud SQL:** does not scale horizontally beyond read replicas — `vertical scaling only`
- **Spanner:** full SQL + horizontal scaling, but at a `premium cost`
- **Firestore:** max `1 MB per entity` — for larger objects, store in Cloud Storage and reference the URL
- **Bigtable:** `no SQL queries` and `no multi-row transactions` — if you need either, look at Cloud SQL or Spanner


---


## 5. Combining Storage Products

- depending on your application, you might use `one or several` of these services together
- _Example:_ a typical Acme Corp application on Cloud Run might use:
	- `Cloud SQL for PostgreSQL` for relational user and order data
	- `Cloud Storage` for uploaded files and media
	- `Firestore` for real-time session state or config data
	- `Bigtable` for high-volume analytics or IoT ingestion (if applicable)


---


## 6. Where Does BigQuery Fit?

- BigQuery was intentionally `not covered in the core storage section` because it sits on the `edge between data storage and data processing`
- **the usual reason to store data in BigQuery** is to use its `big data analysis and interactive querying capabilities`
- BigQuery is `not purely a data storage product` — it's a `serverless data warehouse`
- **Bigtable vs. BigQuery:**
	- Bigtable = `low-latency NoSQL store` for operational and analytical workloads (the ingest/serving layer)
	- BigQuery = `serverless SQL analytics engine` for ad-hoc queries over massive datasets (the query layer)
	- they often work together: stream data into Bigtable → batch export summarized results to BigQuery for analysis

> `NOTE:` for the exam, if a question asks about `ad-hoc SQL analytics` over petabytes of data, the answer is BigQuery. If it asks about `low-latency reads/writes` on time-series or IoT data, the answer is Bigtable. The key distinction is `query pattern` — interactive analytics vs. operational throughput.
