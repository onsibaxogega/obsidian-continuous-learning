- The HTTP Authentication framework is the internet's standardized, built-in mechanism for negotiating access to protected resources. 
- Defined by HTTP semantics (such as **RFC 9110** meaning and intent of HTTP messages), it *establishes the universal rules and communication patterns for a client and server to securely exchange identity credentials*.

## The Challenge/Response Loop

At the *core of the framework* is the challenge/response loop, which dictates how a server demands credentials and how a client supplies them.

1. **The Initial Request:** The client attempts to access a protected resource without providing any credentials.
2. **The Challenge:** The server rejects the request with a `401 Unauthorized` status and issues a *challenge header specifying which authentication schemes it accepts* + other info.
3. **The Response:** The client acquires the necessary credential (e.g., by prompting the user or fetching a stored token) and re-sends the request, this time attaching the credential in the appropriate response header.
4. **The Resolution:** The server validates the credential. If valid, access is granted (`200 OK`). If invalid, the server restarts the loop by issuing another 401 challenge.

## Key HTTP Status Codes

The framework utilizes specific status codes to manage access denial:

- **`401 Unauthorized`:** Indicates that the request lacks valid authentication credentials for the target resource.
- **`407 Proxy Authentication Required`:** Similar to a 401, but specifically indicates that the client must first authenticate itself with a network proxy intercepting the request. NOTE:
	- It is specifically the **proxy server** that returns the `407 Proxy Authentication Required` status code.
	- The application server (often called the origin server) is only responsible for returning a `401 Unauthorized` when it needs to verify a client's identity.
	- The proxy server sits in the middle of the network path. If that proxy is configured to require its own authentication (like a corporate firewall ensuring only employees can browse the external internet, or an API gateway acting as a strict proxy), it will intercept the client's request and issue the `407` challenge itself, before the request ever reaches the application server.

## Standardized HTTP Headers

The framework defines a specific set of headers to facilitate the negotiation process:

- **`WWW-Authenticate`:** Sent by the server alongside a `401` status. This is the "challenge" that tells the client which authentication scheme to use (e.g., `Bearer`, `Basic`) and defines the security `realm`. (may supply additional info e.g. "nonce" in the Digest scheme)
	- a **realm** is a string identifier used by the server to group protected resources into a specific security domain.
	- It essentially tells the client _which_ set of credentials is required for that specific area.
	- This allows a single server to partition its resources (e.g., `realm="admin_dashboard"` versus `realm="public_api"`), so the client's browser or application knows exactly which token or password it needs to provide.
- **`Authorization`:** Sent by the client to supply the credential to the server. It contains the scheme name followed by the actual credential payload.
- **`Proxy-Authenticate`:** The proxy server's equivalent of `WWW-Authenticate`, sent alongside a `407` status to challenge the client.
- **`Proxy-Authorization`:** The client's equivalent of the `Authorization` header, used to supply credentials specifically meant for the proxy rather than the final destination server.
- **`Authentication-Info`:** Sent by the server upon a successful authentication (usually with a `200 OK`). It is used to pass secure state data or next-step cryptographic values (like a new nonce in the `Digest` scheme) back to the client.

## Example Network Flow

Here is how the framework facilitates a JWT Bearer token exchange in practice:

1. **Client:** `GET /api/dashboard`
2. **Server:** `401 Unauthorized`
   - *Header:* `WWW-Authenticate: Bearer realm="dashboard_api"`
3. **Client:** `GET /api/dashboard`
   - *Header:* `Authorization: Bearer eyJhbGciOiJIUzI1NiIs...`
1. **Server:** `200 OK`