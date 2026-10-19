
# Cloud SQL

> `Cloud SQL` is Google Cloud's `fully managed relational database` service. It handles patching, updates, backups, and replication so you can focus on building great applications. #GCP_Cloud_SQL


---


## 1. Core Concept

- **Definition:** Cloud SQL offers fully managed relational databases as a service, supporting three engines:
	- `MySQL` (Cloud SQL for MySQL)
	- `PostgreSQL` (Cloud SQL for PostgreSQL)
	- `SQL Server` (Cloud SQL for SQL Server)
- **What "fully managed" means:** Google handles the `mundane but necessary` and often time-consuming tasks:
	- applying `patches and updates`
	- managing `backups`
	- configuring `replications`
- **No software installation or maintenance** required on your part

### Why It Matters for Enterprise

- **offloads operational burden:** instead of dedicating engineering time to database administration, teams like those at Acme Corp can focus on `application development`
- **supports standard SQL engines:** no proprietary lock-in — you can use `MySQL`, `PostgreSQL`, or `SQL Server`, all of which your team likely already knows
- **managed PostgreSQL is particularly relevant** if you're running Postgres workloads in GCP (e.g., for self-hosted applications backed by a relational database)


---


## 2. Specs & Limits

- **Compute:** scales up to `128 processor cores`
- **Memory:** up to `864 GB of RAM`
- **Storage:** up to `64 TB of storage`

> `NOTE:` these are `vertical scaling` limits — Cloud SQL is designed for `scaling up`, not scaling out horizontally. For globally distributed, horizontally scalable relational needs, Spanner is the better fit.


---


## 3. Replication

- **Automatic replication** is supported across several scenarios:
	- from a `Cloud SQL primary instance`
	- from an `external primary instance`
	- from `external MySQL instances`

> `NOTE:` replication from external instances is particularly useful for `migration scenarios` — you can replicate from an on-prem or other-cloud MySQL instance into Cloud SQL as a stepping stone to a full migration


---


## 4. Backups & Security

### Managed Backups

- Cloud SQL supports `managed backups` — data is securely stored and accessible if a restore is required
- **cost:** the cost of an instance covers `seven backups`

### Encryption

- **data at rest:** Cloud SQL encrypts customer data when on Google's internal networks and when stored in `database tables`, `temporary files`, and `backups`
- **network security:** includes a `network firewall` that controls network access to each database instance

> `NOTE:` encryption is automatic and built-in — you don't need to configure it separately, but you can layer on `Customer-Managed Encryption Keys (CMEK)` for additional control


---


## 5. Connectivity & Integration

- **Key benefit:** Cloud SQL instances are accessible by `other Google Cloud services` and even `external services`

### Google Cloud Service Integration

- **App Engine:** connect using standard drivers like `Connector/J` for Java or `MySQLdb` for Python
- **Compute Engine:** instances can be authorized to access Cloud SQL — configure the Cloud SQL instance to be in the `same zone` as your virtual machine for optimal latency
- **BigQuery:** import and export data between Cloud SQL and BigQuery (covered in Cloud Storage integration context)

### External Tools & Applications

- Cloud SQL supports external applications and tools using `standard MySQL drivers`:
	- `SQL Workbench`
	- `Toad`
	- other external applications

> `NOTE:` because Cloud SQL uses `standard database drivers and protocols`, existing applications can often connect with `zero code changes` — this is a major advantage during migrations from self-managed databases


---


## 6. Tips & Tricks

- **choose the right engine for your stack** — if Acme Corp's `acme-prod-123` project runs Python applications on Cloud Run, `Cloud SQL for PostgreSQL` with the `pg8000` or `asyncpg` driver is a natural fit
- **co-locate instances with your compute** — place your Cloud SQL instance in the `same region and zone` as your Cloud Run services or Compute Engine VMs to minimize latency
- **use Cloud SQL Auth Proxy for secure connections** — instead of allowlisting IPs in the network firewall, the `Cloud SQL Auth Proxy` provides `IAM-based authentication` and encrypted tunnels without managing SSL certificates manually
- **understand the scaling ceiling** — Cloud SQL scales `vertically` up to 128 cores / 864 GB RAM / 64 TB storage; if you hit these limits or need `horizontal scaling` and `global distribution`, evaluate `Spanner` instead
- **leverage managed backups, but also test restores** — having seven backups included is great, but periodically `test your restore process` to validate your disaster recovery plan
