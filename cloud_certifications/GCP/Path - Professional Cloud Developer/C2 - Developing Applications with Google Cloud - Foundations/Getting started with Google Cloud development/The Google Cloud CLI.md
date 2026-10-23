
# gcloud CLI & Command-Line Tools

> The `gcloud CLI` provides tools to manage Google Cloud services from the command line or in automated scripts. It wraps the `Cloud APIs` into an easy-to-use interface, automatically handling `credentials` and combining `multiple API calls` when needed to complete a single task. #GCP_gcloud_CLI


---


## 1. Core Concept

- **Definition:** the Google Cloud CLI is a set of `command-line tools` that provide the functionality of Cloud APIs in an easy-to-use interface
- **Key behaviors:**
	- `automates the process of sending credentials` in Cloud API calls
	- `combines multiple Cloud API calls` when required to complete a single common task
- you can use the gcloud CLI to perform `most tasks allowed by the Cloud APIs` — e.g., manage virtual machines, deploy applications, manage storage


---


## 2. CLI Tools

| Tool             | What It Does                                                                        |
| :--------------- | :---------------------------------------------------------------------------------- |
| `gcloud`         | interacts with Google Cloud services (compute, networking, IAM, deployments, etc.)  |
| `bq`             | runs queries and manages data in `BigQuery`                                         |
| `gcloud storage` | creates and manages `Cloud Storage` buckets and objects                             |
| `kubectl`        | manages `Kubernetes` clusters and workloads (installable via `gcloud components`)   |
| emulators        | emulate Google Cloud services locally like `Firestore` or `Pub/Sub` for development |
| `terraform`      | create infrastructure using `Terraform` (installable via `gcloud components`)       |


---


## 3. Managing CLI Components

```bash
# list all CLI components and their install status
gcloud components list
# each component shows: not installed, update available, or installed (latest version)

# install a specific component (e.g., kubectl)
gcloud components install kubectl

# update the entire gcloud CLI to the latest version
gcloud components update
```


---


## 4. gcloud storage — Cloud Storage Management

- **`gcloud storage buckets`** — creates, lists, deletes, and manages `access control lists` for buckets
- **`gcloud storage objects`** — manages objects and their access control lists
- other `gcloud storage` commands can copy, move, list, and delete objects

```bash
# copy a local file into a Cloud Storage bucket
gcloud storage cp local-file.txt gs://acme-prod-123-bucket/local-file.txt
```

> `NOTE:` `gcloud storage` is the modern replacement for the legacy `gsutil` command — they do the same things, but `gcloud storage` is faster (parallel uploads by default) and follows the consistent `gcloud` command structure. Use `gcloud storage` for all new scripts.


---


## 5. bq — BigQuery CLI

- `bq` is the command-line tool for `BigQuery`, Google Cloud's serverless data warehouse
- primary use: `running queries`
- also manages datasets, tables, and other BigQuery entities

```bash
# example: search for all occurrences of a word in Shakespeare's works (public dataset)
bq query --use_legacy_sql=false \
  'SELECT word, word_count
   FROM `bigquery-public-data.samples.shakespeare`
   WHERE word = "raven"'
```


---


## 6. Tips & Tricks

- **`gcloud` over console for repeatability** — anything you do in the Cloud Console should be captured as a `gcloud` command (or Terraform) so it's reproducible and version-controllable
- **`gcloud storage` over `gsutil`** — `gsutil` is legacy; `gcloud storage` is faster and consistent with the rest of the CLI
- **use `--format` for scripting** — `gcloud` supports `--format=json`, `--format=csv`, and `--format=value` for piping output into other tools or scripts
- **`gcloud config configurations`** — set up named configurations to quickly switch between projects (e.g., `acme-dev-456`, `acme-test-789`, `acme-prod-123`) without re-authenticating
- **local emulators for development** — use `gcloud emulators firestore start` or `gcloud beta emulators pubsub start` to run local emulators for development and testing without hitting real GCP resources
- **exam tip:** know that the gcloud CLI `wraps Cloud APIs` and `handles authentication automatically` — it's not a separate system; it's a convenience layer over the same APIs that Cloud Client Libraries use
