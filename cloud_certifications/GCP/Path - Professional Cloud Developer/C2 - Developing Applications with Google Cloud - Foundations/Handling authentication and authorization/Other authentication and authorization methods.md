
# GCP User Authentication & Authorization Methods

> methods for authenticating and authorizing `end users` to access resources and applications — as opposed to authenticating an application itself to Google Cloud APIs


---


## 1. Core Concept

- **Definition:** beyond authenticating your application to Google Cloud APIs, your application may also need to `access resources on behalf of a user` or `control which users can access the application itself`
- these methods address a different problem than ADC or service accounts — they deal with `user identity and consent`, not application identity
- **Use cases:**
	- your application needs access to `BigQuery datasets that belong to your application users`
	- your application needs to `authenticate as a user` to create projects or resources on their behalf


---


## 2. OAuth 2.0 (Accessing Resources on Behalf of a User) #OAuth_2

- **Definition:** OAuth 2.0 is a protocol that allows your application to `request access to resources on behalf of a user` by obtaining consent and exchanging it for credentials
- **How it works:**
	- your application requests access to resources
	- the user is `prompted for consent`
	- if consent is provided, the application requests credentials from an `authorization server`
	- the application uses those credentials to `access resources on behalf of the user`

- `NOTE:` OAuth 2.0 is about `delegated access` — the user grants your application permission to act on their behalf, the application does not become the user

---


## 3. Identity-Aware Proxy (IAP) #IAP

- **Definition:** IAP controls access to your `cloud applications running in your Google Cloud project` by verifying a user's identity and determining whether they should be granted access based on configuration
- think of IAP as a `gatekeeper sitting in front of your application` — it handles authentication and authorization so `the developer does not need to write code to control access`

- **Key characteristics:**
	- **central authorization layer:** IAP establishes a single authorization layer for `applications accessed by HTTPS`
	- **application-level access control:** IAP helps you adopt an `application-level access control model` instead of relying on VPNs, network-level firewalls, or complex authorization code baked into your applications
	- **zero code changes:** access control is configured at the infrastructure level, not in application code


---


## 4. Firebase Authentication #Firebase_Auth

- **Definition:** Firebase Authentication provides features to help you add `authentication and identity management to your mobile apps`
- Firebase is an `app development platform` — Firebase Auth is its authentication layer

- **Supported sign-in methods:**
	- passwords
	- phone numbers
	- federated identity providers — `Google, Apple, and GitHub`

- **Developer experience:**
	- provides `drop-in auth components` that handle UI flows for sign-up, sign-in, and edge cases like account recovery
	- `SDKs and ready-made UI libraries` make development easy

- **Post-login capabilities:**
	- access the user's profile
	- use the provided token in `OAuth 2.0 and OpenID Connect flows` for backend services


---


## 5. Identity Platform vs Firebase Authentication #Identity_Platform

- **Definition:** Identity Platform is Google Cloud's `enterprise-grade` authentication service — it shares core functionality with Firebase Auth but adds capabilities designed for enterprise customers
- both let you `sign users in to your apps` by providing backend services, SDKs, and UI libraries

### Comparison

| Feature | Firebase Authentication | Identity Platform |
| :--- | :--- | :--- |
| **basic sign-in** (passwords, phone, federated IdPs) | ✅ | ✅ |
| **backend services, SDKs, UI libraries** | ✅ | ✅ |
| **OpenID Connect sign-in** | ❌ | ✅ |
| **SAML authentication** | ❌ | ✅ |
| **multi-factor authentication (MFA)** | ❌ | ✅ |
| **integration with Identity-Aware Proxy** | ❌ | ✅ |

- `NOTE:` if your application needs `OIDC, SAML, MFA, or IAP integration`, Identity Platform is the right choice over Firebase Auth — these are common requirements in enterprise environments


---


## 6. Tips & Tricks

- IAP is particularly useful when you want to `replace a VPN-based access model` with a per-application identity-aware model — users authenticate at the application layer, not the network layer
- when building mobile apps that need simple sign-in flows, `start with Firebase Auth` — the drop-in UI components handle edge cases (account recovery, email verification) that are tedious to build from scratch
- for enterprise web applications that require `SAML or OIDC federation` with a corporate IdP, use `Identity Platform` — it integrates directly with IAP for a seamless auth-to-access pipeline
- OAuth 2.0 is the right tool when your app needs to `act on behalf of a user` (e.g., reading their BigQuery datasets) — it is not meant for authenticating your app's own identity to GCP services
