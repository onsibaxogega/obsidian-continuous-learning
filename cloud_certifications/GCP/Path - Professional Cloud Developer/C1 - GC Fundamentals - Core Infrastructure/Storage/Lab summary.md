
# Lab Summary — Getting Started with Cloud Storage and Cloud SQL

> This lab demonstrated the practical integration between `Cloud Storage`, `Cloud SQL`, and `Compute Engine` — the pattern of serving `static assets from object storage` while connecting application logic on a VM to a `managed relational database`. You built a PHP web application on Apache, connected it to a MySQL Cloud SQL instance, and embedded a publicly accessible image from a Cloud Storage bucket.


---


## What Was Covered

- **deployed a Compute Engine VM (`bloghost`)** — an `e2-standard-2` instance running Debian 12 with Apache + PHP + php-mysql installed via a `startup script` in the Automation metadata field
- **created a Cloud Storage bucket via `gcloud`** — bucket named after the project ID (guaranteeing global uniqueness), set to a multi-region location (`US`, `EU`, or `ASIA`)
- **uploaded an image and made it public** — used `gcloud storage cp` to upload, then `gsutil acl ch -u allUsers:R` to grant read access to all users on that specific object
- **created a Cloud SQL instance (`blog-db`)** — MySQL engine, Enterprise edition with Sandbox preset, placed in the `same region and zone` as the bloghost VM for latency optimization
- **configured Cloud SQL user and network access** — created a `blogdbuser` account, then authorized the bloghost VM's `external IP/32` in the Connections > Networking tab
- **connected the web server to Cloud SQL** — edited `index.php` to include the Cloud SQL public IP and credentials, used PHP's `PDO` to establish a MySQL connection, confirmed `"Connected successfully"` in the browser
- **embedded a Cloud Storage image in the web page** — copied the object's public URL and added an `<img>` tag to `index.php`, demonstrating static asset serving from Cloud Storage alongside dynamic content from Cloud SQL


---


## Connection Flow

```
User's browser
    │
    ▼ HTTP request
bloghost VM (Compute Engine)
    │── serves index.php (Apache + PHP)
    │── <img> tag references Cloud Storage URL
    │
    ├──▶ Cloud SQL (blog-db)
    │     └── PDO connection via public IP
    │     └── authorized via external IP/32 allowlist
    │
    └──▶ Cloud Storage (project bucket)
          └── my-excellent-blog.png served directly to browser via public URL
```


---


## Key Concepts Reinforced

- **startup scripts automate VM provisioning** — a bash script in the `Automation > Startup script` metadata field runs at boot, installing Apache, PHP, and php-mysql without manual SSH
- **Cloud Storage bucket names are globally unique** — using `$DEVSHELL_PROJECT_ID` as the bucket name is a reliable pattern since project IDs are already globally unique
- **ACLs provide object-level access control** — `gsutil acl ch -u allUsers:R` grants public read on a single object without affecting the rest of the bucket
- **co-locate compute and database** — placing Cloud SQL and Compute Engine in the `same region and zone` minimizes latency; the lab explicitly calls this out as a best practice
- **Cloud SQL network authorization uses CIDR notation** — `/32` means a single IP address; you authorized only the bloghost VM's external IP to connect


---


## Lab Shortcuts vs. Production Best Practices

| Lab Shortcut | Production Alternative |
| :--- | :--- |
| Cloud SQL `public IP` + allowlisted external IP | `Cloud SQL Auth Proxy` or `Private IP` within the VPC |
| hardcoded database password in `index.php` | store in `Secret Manager`, retrieve at runtime |
| `Allow unencrypted network traffic` on Cloud SQL | always enforce `SSL/TLS` connections |
| `allUsers:R` ACL for public image access | `signed URLs`, `IAM Conditions`, or `Cloud CDN` with authentication |
| direct connection via Cloud SQL public IP | `Private Google Access` + VPC connector for serverless, or `Cloud SQL Auth Proxy` for VMs |

> `NOTE:` the exam loves to test whether you know the production-ready approach vs. the lab shortcut — if a question mentions connecting to Cloud SQL from a web server, the answer almost always involves `Cloud SQL Auth Proxy` or `Private IP`, not public IP allowlisting
