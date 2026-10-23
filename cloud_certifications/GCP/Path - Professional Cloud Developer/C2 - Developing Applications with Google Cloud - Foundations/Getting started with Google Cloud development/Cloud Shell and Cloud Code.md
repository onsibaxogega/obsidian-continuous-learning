
# Cloud Shell, Cloud Code & Cloud Workstations

> `Cloud Shell` is a free, browser-based admin machine with command-line access from the Google Cloud console. 
> `Cloud Code` is a set of IDE plugins for creating, deploying, and debugging cloud applications. 
> `Cloud Workstations` provides fully managed, secure cloud-based development environments. #GCP_Cloud_Shell #GCP_Cloud_Code #GCP_Cloud_Workstations


---


## 1. Cloud Shell

- **Definition:** a free admin machine with `browser-based command-line access` from the Google Cloud console
- provisions a `Compute Engine VM` running a `Debian-based Linux OS`
- provides `5 GB of persistent disk storage`
- instances are provisioned `per-user, per-session` — they persist while your session is active and `terminate after one hour of inactivity`
- when a new instance is provisioned, it `retains the persistent disk` from the previous instance (your files survive session restarts)
- the `Google Cloud SDK comes pre-installed` with `built-in authorization` to your Google Cloud projects and resources
- includes a `built-in code editor` based on `Theia` for browsing directories and editing files within the VM

> `NOTE:` Cloud Shell is great for quick admin tasks and running `gcloud` commands when you don't have your local machine set up — but it's `not a development environment`. For actual development, use VS Code locally with Cloud Code, or Cloud Workstations for a managed setup.


---


## 2. Cloud Code

- **Definition:** a set of `IDE plugins` that make it easier to create, deploy, and debug cloud applications for Google Cloud
- available for:
	- `Cloud Shell Editor`
	- `Visual Studio Code`
	- `JetBrains IDEs` (IntelliJ for Java, PyCharm for Python)
- streamlines common workflows by merging `non-trivial tasks into a simple UI` inside your IDE

### Key Features

- **Secret Manager integration** — manage passwords, keys, certificates, and other sensitive data `within the IDE`
- **Cloud API browser** — browse available Cloud APIs, view `Cloud Client Library documentation` specific to your language, find and copy `code samples`
- **Kubernetes development:**
	- develop Kubernetes applications in your IDE
	- run and debug on a `local cluster` or on `GKE`
	- **Kubernetes Explorer** — visualize and manage Kubernetes resources within the IDE (e.g., right-click a Pod to stream logs or open a terminal)
	- **YAML authoring assistance** — `autocomplete` and `inline documentation` for Kubernetes YAML config files
- **Cloud Run development:**
	- develop Cloud Run services in the IDE
	- use the `Cloud Run Emulator` to run and debug locally
	- `deploy directly from the IDE`
	- **Cloud Run Explorer** — manage Cloud Run services from the IDE


---


## 3. Local Emulators

- the `gcloud CLI` includes local emulators for several Google Cloud services
- install and manage emulators with `gcloud beta emulators` commands
- **no code changes required** — when you set specified `environment variables`, Cloud Client Libraries `automatically connect to the local emulator` instead of the Google Cloud service
- you can develop without a connection to GCP and `will not consume project resources`

### Available Emulators

| Service                    | Emulator Command                        |
| :------------------------- | :-------------------------------------- |
| Bigtable                   | `gcloud beta emulators bigtable start`  |
| Firestore                  | `gcloud beta emulators firestore start` |
| Firestore (Datastore mode) | `gcloud beta emulators datastore start` |
| Pub/Sub                    | `gcloud beta emulators pubsub start`    |
| Spanner                    | `gcloud beta emulators spanner start`   |

---


## 4. Cloud Workstations

- **Definition:** provides `fully managed and secure cloud-based development environments` for Google Cloud
- instead of requiring developers to install software and run setup scripts, you create a `workstation configuration` that specifies the environment in a `reproducible way`
- developers access environments `anytime, anywhere` via a `browser`, `SSH`, or a `local IDE`
- supports `any code editors and applications` that can be run in a container

### Key Properties

- **consistency:** environments are the same `regardless of developer location, computer, or network`
- **security:** the IDE runs on `customer-owned VMs` and `persistent disks inside the customer VPC` — developer machines and code are secure
- **cost efficiency:** runs on `ephemeral Compute Engine VMs` that can be `started or stopped on demand` or when the IDE is idle
- **admin-friendly:** IT admins can provision, scale, manage, and secure environments for `all developers on the team`


---


## 5. Development Tools Spectrum

| Tool                   | What It Is                           | Best For                                                 |
| :--------------------- | :----------------------------------- | :------------------------------------------------------- |
| **Cloud Shell**        | free, temporary browser-based VM     | quick admin tasks, `gcloud` commands, demos              |
| **Cloud Code**         | IDE plugins (VS Code, JetBrains)     | local development with GCP integration                   |
| **local emulators**    | local instances of GCP services      | offline development, testing without consuming resources |
| **Cloud Workstations** | fully managed cloud dev environments | team-wide standardized, secure dev environments          |

---


## 6. Tips & Tricks

- **Cloud Shell persistent disk survives sessions** — your `5 GB` of home directory data persists across session restarts, but the VM itself is ephemeral; don't store anything important outside `$HOME`
- **Cloud Shell has usage limits** — there's a weekly usage quota; don't use it as a long-running compute environment
- **Cloud Code YAML autocomplete is a lifesaver** — Kubernetes YAML schemas are complex; Cloud Code validates your config files inline and suggests completions
- **emulator environment variables are automatic** — when you start an emulator, it prints the environment variable to set (e.g., `FIRESTORE_EMULATOR_HOST=localhost:8080`); Cloud Client Libraries detect this and connect locally
- **Cloud Workstations for compliance** — since the VMs run inside your VPC with persistent disks on customer-owned infrastructure, this satisfies `data residency` and `network isolation` requirements
- **exam tip:** know that Cloud Shell provides `5 GB persistent disk`, terminates after `1 hour of inactivity`, and comes with the `Google Cloud SDK pre-installed with built-in authorization`
