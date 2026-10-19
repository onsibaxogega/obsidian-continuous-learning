
# Accessing & Interacting with Google Cloud

> `Google Cloud` provides four primary methods for accessing and managing cloud resources: the `Google Cloud console`, the `Google Cloud SDK & Cloud Shell`, `APIs`, and the `Google Cloud app`.


---


## 1. Google Cloud Console

- **Definition:** the `graphical user interface (GUI)` for Google Cloud — a `web-based interface` for deploying, scaling, and diagnosing production issues
- **Resource Management:** easily find resources, check their health, and have `full management control` over them
- **Budget Controls:** set budgets to control how much you spend on resources
- **Search Facility:** quickly find resources and `connect to instances via SSH` directly in the browser

> `NOTE:` the Google Cloud console is the most visual and beginner-friendly way to interact with Google Cloud — ideal for `ad hoc management tasks` and exploring available services.


---


## 2. Google Cloud SDK & Cloud Shell

### Google Cloud SDK

- **Definition:** a `set of tools` for managing resources and applications hosted on Google Cloud #Google_Cloud_SDK
- **Key Tools:**
	- **gcloud CLI:** the main `command-line interface` for Google Cloud products and services
	- **bq:** a `command-line tool` specifically for [[BigQuery]]
- **Installation:** when installed, all tools within the SDK are located under the `bin` directory

### Cloud Shell

- **Definition:** provides `command-line access to cloud resources` directly from a browser — no local installation required #Cloud_Shell
- **Virtual Machine:** a `Debian-based virtual machine` with a `persistent 5 GB home directory`
- **Pre-configured:** the `gcloud` command and other utilities are `always installed, available, up to date, and fully authenticated`

> `NOTE:` Cloud Shell is ideal when you need quick CLI access without setting up a local development environment — everything is ready to go out of the box.


---


## 3. APIs

- **Definition:** Google Cloud services offer `application programming interfaces (APIs)` so that `code you write can control them` programmatically #Google_Cloud_APIs
- **Google APIs Explorer:** a tool within the Google Cloud console that shows `which APIs are available, and in which versions` — you can try APIs interactively, even those requiring user authentication
- **Client Libraries:** Google provides `Cloud Client libraries` and `Google API Client libraries` in many popular languages to simplify calling Google Cloud from your code
- **Supported Languages:** `Java`, `Python`, `PHP`, `C#`, `Go`, `Node.js`, `Ruby`, and `C++`

> `NOTE:` you do not need to code from scratch — the client libraries take `a lot of the drudgery out of the task` of integrating with Google Cloud APIs.


---


## 4. Google Cloud App

- **Definition:** a `mobile application` for managing Google Cloud resources on the go #Google_Cloud_App
- **Compute Engine:** start, stop, and `use SSH to connect to Compute Engine instances` and view logs from each instance
- **Cloud SQL:** stop and start `Cloud SQL instances`
- **App Engine:** administer applications deployed on [[App Engine]] — view errors, roll back deployments, and change `traffic splitting`
- **Billing:** provides `up-to-date billing information` for your projects and `billing alerts` for projects going over budget
- **Monitoring:** set up customizable graphs showing key metrics such as `CPU usage`, `network usage`, `requests per second`, and `server errors`
- **Alerts & Incidents:** offers `alerts and incident management` capabilities
- **Download:** available at `cloud.google.com/app`


---


## 5. Tips & Tricks

- **Choose the right tool for the job:** use the `console` for visual exploration, the `SDK/Cloud Shell` for scripting and automation, `APIs` for programmatic integration, and the `app` for on-the-go monitoring
- **Cloud Shell for quick tasks:** if you don't want to install the SDK locally, `Cloud Shell` gives you a fully authenticated CLI environment instantly in your browser
- **APIs Explorer for discovery:** before writing code, use the `Google APIs Explorer` to test API calls interactively and understand the request/response structure
- **Client libraries over raw REST:** prefer `Cloud Client libraries` over raw API calls — they handle authentication, retries, and pagination for you
