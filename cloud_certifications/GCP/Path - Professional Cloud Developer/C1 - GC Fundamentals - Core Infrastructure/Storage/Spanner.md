
# Spanner

> `Spanner` is a fully managed relational database service that `scales horizontally`, is `strongly consistent`, and speaks `SQL`. It is the service that powers Google's own $80 billion business. #GCP_Spanner


---


## 1. Core Concept

- **Definition:** Spanner is a `globally distributed, horizontally scalable relational database` with built-in high availability and strong consistency
- **Battle tested:** Google's own `mission-critical applications and services` run on Spanner — this isn't a theoretical product, it's `production-proven at Google scale`
- **Key differentiator:** Spanner gives you the benefits of a `relational database` (SQL, joins, secondary indexes) combined with the `horizontal scalability` typically associated with NoSQL databases

### Why It Matters for Enterprise

- **strong global consistency:** unlike eventually consistent systems, Spanner guarantees that `all reads return the most recent committed data`, regardless of which region you read from — critical for financial, inventory, and compliance-sensitive applications
- **horizontal scaling with SQL:** most relational databases (e.g., Cloud SQL, self-hosted Postgres) scale `vertically` — Spanner breaks this ceiling by scaling `horizontally` while still supporting full SQL semantics
- **high availability by design:** built-in HA means you don't need to architect your own failover, replication, or multi-region redundancy strategies


---


## 2. When to Use Spanner

Spanner is especially suited for applications that require:

- a `SQL relational database management system` with `joins and secondary indexes`
- `built-in high availability`
- `strong global consistency`
- `high numbers of input/output operations per second` — tens of thousands of reads and writes per second or more

> `NOTE:` if your application needs a relational database but doesn't require global distribution or horizontal scaling, `Cloud SQL` is likely more cost-effective. Spanner's power comes at a `premium price point` — use it when your scale or consistency requirements justify it.


---


## 3. Spanner vs. Cloud SQL

| Feature | Cloud SQL | Spanner |
| :--- | :--- | :--- |
| **scaling model** | `vertical` (scale up) | `horizontal` (scale out) |
| **max capacity** | 128 cores / 864 GB RAM / 64 TB storage | `virtually unlimited` — add nodes to scale |
| **consistency** | strong (single region) | `strong global consistency` (multi-region) |
| **SQL support** | full SQL (MySQL, PostgreSQL, SQL Server) | full SQL (Google Standard SQL) |
| **high availability** | configurable (regional/zonal) | `built-in` across zones and regions |
| **use case fit** | regional apps, moderate scale | global apps, massive throughput, financial systems |
| **cost** | lower — pay per instance | higher — pay per node + storage |


---


## 4. Tips & Tricks

- **don't default to Spanner** — it's powerful but expensive; start with Cloud SQL and `migrate to Spanner` only when you hit scaling or global consistency limits
- **understand the cost model** — Spanner charges per `node-hour` plus storage; a single node can handle ~10,000 reads/sec or ~2,000 writes/sec, so right-size your deployment
- **use Google Standard SQL** — Spanner supports its own SQL dialect (`Google Standard SQL`); it's ANSI-compliant but has some differences from PostgreSQL or MySQL syntax, so plan for minor query adjustments during migration
- **leverage Spanner's PostgreSQL interface** — Spanner now offers a `PostgreSQL-compatible interface`, which can ease migration from Cloud SQL for PostgreSQL or self-hosted Postgres
- **exam tip:** the Professional Cloud Developer exam loves to test the `Cloud SQL vs. Spanner` decision — the key signal is whether the question mentions `global scale`, `horizontal scaling`, or `strong global consistency`
