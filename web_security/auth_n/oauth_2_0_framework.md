> **OAuth 2.0 (Open Authorization)** is the industry-standard authorization framework. 
> It enables a *third-party application to obtain limited access to a web service on behalf of a resource owner*, without the owner having to share their highly sensitive credentials (like a username and password) directly with that third-party application.

## 1. Core Concept

- **Delegated Authorization:** OAuth 2.0 is fundamentally about *delegation*. 
	- It provides a standardized framework for a user to say to an Identity Provider (like Okta or Google): *"I permit this specific Application to access my data on that specific API, but only for a limited time and only for specific actions."*
- **Strictly AuthZ, Not AuthN:** OAuth 2.0 was designed *exclusively* for Authorization (AuthZ). It dictates how an app gets an Access Token to make API calls. It was never intended to verify a human's identity (AuthN), although it was heavily abused for this purpose before OpenID Connect (OIDC) was created.
- **Analogy:** Think of OAuth 2.0 like a **Valet Key** for a car. You (the owner) give the valet (the application) a special key. This key allows the valet to start the engine and drive the car to a parking spot, but it physically cannot unlock the trunk or the glovebox where your valuables are. Furthermore, if you lose the valet key, you can disable it without having to change the main locks on the car.

### Why It Matters for Enterprise Architecture

- **Credential Security:** In modern architectures, you never want your decoupled React frontend handling or storing a user's actual Okta password. OAuth 2.0 ensures the application never sees the password; the user enters it directly into the secure Okta login screen, and the application only receives a temporary, scoped token.
- **Zero Trust & Scopes:** It allows for granular, least-privilege access. An internal analytics app might be granted a token with a `read:reports` scope, while an admin dashboard gets a token with a `write:users` scope. The backend APIs blindly enforce these scopes.

---

## 2. The Four Actors

The OAuth 2.0 framework defines a specific cast of characters that participate in the token exchange.

1. **Resource Owner:** The entity that can grant access to a protected resource. In almost all web applications, this is the **Human User**.
2. **Client:** The application requesting access to the resource on behalf of the Resource Owner. 
   - *Example:* Your team's React Single Page Application (SPA), or the GCP Identity-Aware Proxy (IAP) acting on behalf of a user.
3. **Authorization Server:** The server that authenticates the Resource Owner and issues Access Tokens to the Client.
   - *Example:* Okta, Azure AD, or Google Workspace.
4. **Resource Server:** The server hosting the protected data. It accepts and validates the Access Tokens before serving the data.
   - *Example:* Your team's Python FastAPI backend running in GCP Cloud Run.

---

## 3. Architectural Flow

The framework provides several different "Flows" (or "Grant Types") depending on the type of application. For modern web applications (like React SPAs or decoupled backends), the industry standard is the **Authorization Code Flow with PKCE**.

### DIAGRAM: oauth2_auth_code_pkce_flow

This sequence details how a modern web application securely obtains an Access Token without exposing secrets to the browser.

1. **The Request:** The User clicks "Log In" on the React SPA (the Client).
2. **The Redirect:** The SPA generates a cryptographic random string called a `code_challenge`. It redirects the User's browser to the Authorization Server (Okta), passing the `code_challenge` and requesting specific `scopes` (permissions).
3. **User Authentication:** The User authenticates directly with Okta (e.g., entering a password and MFA). The SPA never sees this happen.
4. **The Consent (Optional):** Okta asks the User: *"Acme Corp Analytics wants to access your profile. Allow?"* The User clicks Yes.
5. **The Authorization Code:** Okta redirects the browser back to the SPA, appending a short-lived, single-use `Authorization Code` to the URL. *Note: This is not the token! It is just a temporary ticket.*
6. **The Token Exchange:** The SPA makes a direct, behind-the-scenes HTTP `POST` request to Okta. It sends the temporary `Authorization Code` *and* the original plaintext `code_verifier` (the secret that matches the `code_challenge` from step 2).
7. **The Validation:** Okta mathematically verifies that the `code_verifier` matches the original challenge. This proves that the SPA requesting the token is the exact same SPA that initiated the login in Step 1.
8. **The Issuance:** Okta issues an `Access Token` (often a JWT) and sends it to the SPA.
9. **Resource Access:** The SPA attaches the `Access Token` to an `Authorization: Bearer` header and sends it to the FastAPI backend (Resource Server). The backend verifies the token and returns the data.

---

## 4. Industry Best Practices & Security

- **Why PKCE replaced the Implicit Flow:**
  - Historically, SPAs used the "Implicit Flow," where the Authorization Server returned the Access Token directly in the URL redirect (Step 5). 
  - This was highly insecure because tokens could leak in browser history or be stolen by malicious browser extensions. 
  - **PKCE (Proof Key for Code Exchange)** solves this. Even if an attacker steals the temporary `Authorization Code` from the URL in Step 5, they cannot exchange it for a token in Step 6 because they do not have the secret `code_verifier` that the legitimate SPA kept hidden in its local memory.
- **Never Treat OAuth 2.0 as Authentication:**
  - An `Access Token` proves that an app has *permission* to access an API. It does not prove *who* the human is, when they logged in, or how they authenticated. 
  - **Rule:** If your application needs to know the user's identity (e.g., to display "Welcome, John!"), you must layer OpenID Connect (OIDC) on top of this framework.

---

## 5. Tips & Tricks

- **The State Parameter:** Always use the `state` parameter in the initial redirect. It is a random string generated by your app that Okta echoes back. It prevents **CSRF (Cross-Site Request Forgery)** attacks by ensuring the login response corresponds to a login request your app actually initiated.
- **Client Credentials Flow:** If you are building a server-to-server microservice integration where no human is involved (e.g., a chron job pulling nightly reports), you don't use the complex PKCE flow. You use the *Client Credentials Flow*, where the backend simply sends a hardcoded Client ID and Client Secret directly to Okta to get a token.
