
# Authentication in Google Cloud

> `Authentication` proves that you are who you say you are by presenting some kind of credential.
>  `Authorization` (IAM) specifies what you're permitted to do. 
>  As an application developer, you need to authenticate your applications to Google Cloud services, authenticate callers to your apps, and authenticate end users. #GCP_Authentication #GCP_service_accounts


---


## 1. Authentication vs. Authorization

- **authentication:** proves `you are who you say you are` by presenting a credential
- **authorization (IAM):** specifies `what you're permitted to do` on which resources
- authentication comes first — you prove your identity, then IAM checks what you're allowed to access

> `NOTE:` think of it this way — authentication is the `badge scan at the building entrance` (who are you?), and authorization is the `keycard access on each floor` (which rooms can you enter?). Both are required, but they're separate systems.


---


## 2. Three Ways to Authorize API Calls

| Method                            | What It Is                                                                                                           | Security Level | When to Use                                                                               |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------------------- | :------------- | :---------------------------------------------------------------------------------------- |
| **API key**                       | a string of characters that `identifies the application` (not the user)                                              | low            | `low-security, read-only APIs` only; associates requests with a project for billing/quota |
| **user account (OAuth token)**    | represents a `person`; email + password creates an OAuth token with `limited access based on user permissions`       | medium-high    | interactive user sessions; token `expires after a period of time`                         |
| **service account (OAuth token)** | represents a `workload or application`; OAuth token provides access based on `roles attached to the service account` | high           | application-to-API authentication; no user involvement                                    |

- **API keys are risky:** a compromised key gives `full and long-lasting access` to the API — most Google APIs `do not accept API keys`
- **OAuth tokens are more secure than API keys** — they have `scoped permissions` and `expire`

---


## 3. Service Accounts — Deep Dive

- **Definition:** a service account acts as the `identity for an application or compute workload` — the service account calls Google APIs, so `users aren't directly involved` in the authentication process
- each service account is identified by its `unique email address`
- service accounts enable authorization because you can assign `specific IAM roles` to them
- there is `no password` associated with a service account — you `cannot log in with a browser` using a service account

### How Service Account Authentication Works

- service accounts are authenticated using an `RSA private-public key pair`
- if you know the `private key`, you can request an `access token`
- the access token can be used to interact with Google Cloud APIs `on the service account's behalf`
- having access to the private key is essentially `similar to knowing a user's password`


---


## 4. Service Account Keys — Risks

The private key for a service account can be downloaded as a `service account JSON file`. This was the standard practice in the early days, but it comes with significant security risks:

### Credential Leakage

- _Example:_ a developer commits a private key to a `public code repository`
- a bad actor could use this key to `gain access to resources` in your environment

### Privilege Escalation

- a bad actor with a service account key could use it to `escalate their own privileges`
- _Example:_ a service account with database permissions could be used to `grant the attacker direct access to the database`
- even after detecting the danger and `changing the service account key`, the `escalated privileges would remain`

### Identity Masking

- by authenticating as a service account, a bad actor could `conceal their identity and actions`
- audit logs would show the `service account` as the actor, not the actual person

### The Solution

> `NOTE:` the best way to mitigate these risks is to `avoid using downloaded service account keys` and use other methods to authenticate service accounts whenever possible.


---


## 5. Authentication Methods — When to Use Each

| Scenario                             | Recommended Method                            | Why                                                                  |
| :----------------------------------- | :-------------------------------------------- | :------------------------------------------------------------------- |
| Cloud Run service calling GCP APIs   | `attached service account` (automatic)        | no keys needed; credentials provided via metadata server             |
| local development calling GCP APIs   | `gcloud auth application-default login` (ADC) | uses your user account; no service account keys on your laptop       |
| external system calling GCP APIs     | `Workload Identity Federation`                | federate external identity (GitHub Actions, AWS, Azure) without keys |
| public-facing, low-security read API | `API key`                                     | only for truly low-security, read-only use cases                     |


---


## 6. Tips & Tricks

- **never download service account keys for production** — use `attached service accounts` (Cloud Run, GKE, Compute Engine) or `Workload Identity Federation` (external CI/CD)
- **never commit service account keys to a code repository** — use `Secret Manager` if you absolutely must store a key; better yet, eliminate the key entirely with WIF
- **one service account per application component** — each Cloud Run service should have its own service account with `only the permissions it needs` (least privilege)
- **OAuth tokens expire; API keys don't** — this is why OAuth tokens are more secure; a leaked token has a `limited window of exploitation`
- **privilege escalation survives key rotation** — even if you rotate the compromised key, any `IAM changes the attacker made` (like granting themselves direct access) persist; always audit IAM policies after a key compromise
- **exam tip:** if a question asks about the `most secure way to authenticate an application to Google Cloud APIs`, the answer is `attached service account` or `Workload Identity Federation` — never downloaded keys
