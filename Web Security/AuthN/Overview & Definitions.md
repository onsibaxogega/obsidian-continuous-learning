## Authentication Framework

A framework is a broad, extensible foundation that facilitates various authentication methods or protocols. It provides the overarching architecture but leaves the specific implementation details to the protocols or schemes layered on top of it.

- **Synonyms:** Authorization Framework, Security Layer, Auth Architecture.
- **Examples:**
	- OAuth 2.0 (technically an _authorization_ framework, but foundational for auth),
	- SASL (Simple Authentication and Security Layer),
	- the general HTTP Authentication framework (which establishes the `WWW-Authenticate` challenge/response loop).
- **Distinction:** A framework is the infrastructure. OAuth 2.0, for instance, dictates how an app gets a token to act on your behalf, but it relies on protocols like OpenID Connect to actually verify your human identity.

## Authentication Protocol

A protocol is a standardized, multi-step conversation between multiple parties (like a client, your server, and an identity provider) to securely verify an identity and issue credentials.

- **Synonyms:** Identity Protocol, SSO Protocol.
- **Examples:** OpenID Connect, SAML, Kerberos.
- **Distinction:** Protocols manage the actual _process_ of proving who you are (e.g., redirecting you to Google to log in). They are the systematic rules that eventually mint the credential.

## Credential

A credential is the actual piece of information or digital object presented to a system to prove identity, authorization, or both. It is the payload that gets transmitted over the network to gain access.

- **Synonyms:** Token, Proof of Identity, Pass, Auth Payload.
- **Examples:** A JWT (JSON Web Token), a username and password combination, a session ID cookie, or a biometric fingerprint.
- **Distinction:** The credential is the _what_. It gets packaged into a specific **Format** (like JSON or XML) and handed over using an **Authentication Scheme** (like Bearer or Basic).
- **Colloquialisms & Misuses:**
    - Developers frequently say "pass the key" when they actually mean "pass the credential" or "pass the token".
    - While "token" and "credential" are used interchangeably, a token is specifically a _digital, system-generated_ credential. A user's typed password is a credential, but not a token.

## Token Format

The format is the structural blueprint of the credential itself. It defines the syntax, encoding, and data structure of the credential.

- **Synonyms:** Token Type, Credential Format, Payload Structure.
- **Examples:** JWT (JSON Web Token), XML (used in SAML), Opaque strings (standard API keys).
- **Distinction:** If the scheme is the envelope, the format is the letter inside. A JWT is a self-contained, signed JSON object; it is the physical "badge" you wear, not the method used to hand it over.

## Authentication Scheme

An authentication scheme is the specific HTTP delivery mechanism used by the client to transmit proof of identity to the server. It dictates _how_ the credential is presented in the HTTP header.

- **Synonyms:** Authentication Method, Delivery Mechanism, Auth Pattern.
- **Examples:** Bearer, Basic, Digest.
- **Distinction:** A scheme simply instructs the server on how to read the authorization header. For example, "Bearer" means "grant access to the holder of this token", but it does not dictate what the credential is actually made of.

## Cryptographic Key

A cryptographic key is a mathematical value, secret string, or artifact used by an algorithm to encrypt, decrypt, sign, or verify data. In modern web authentication, it is the underlying secret that guarantees a credential (like a JWT) has not been tampered with or forged.

- **Synonyms:** Secret, Shared Secret, Private Key, Public Key, Signature Key.
- **Examples:** An HMAC-SHA256 secret string used for symmetric signing, or an RSA Public/Private key pair used for asymmetric signing.
- **Distinction:** The cryptographic key is the mathematical truth used to _validate_ the credential. In a JWT flow, the client holds the credential (the JWT), but the server holds the cryptographic key (the secret) to verify the token's signature. The cryptographic key should (almost) never travel over the network in a standard request.
- **Colloquialisms & Misuses:**
    - **The "API Key" exception:** The term "API Key" blurs the line between these concepts. In an API Key flow, the static, opaque secret string acts as _both_ the credential passed over the network and the key itself.
    - **Calling a token a "key":** A JWT is not a key; it is a credential that was _signed by_ a key.

## Summary Analogy

Imagine you are visiting a secure corporate building:

- **The Framework:** The overarching building security policy (e.g., all visitors must be tracked and badged).
- **The Protocol:** The standardized check-in process at the front desk (presenting ID, verifying the appointment).
- **The Credential:** The physical ID badge itself that you carry around and possess.
- **The Format:** The structure of the ID badge (a plastic card containing a photo, name, and barcode).
- **The Cryptographic Key:** The proprietary, highly guarded algorithm the building's security scanners use to verify the badge is a genuine issue and not a counterfeit.
- **The Scheme:** The specific physical act of tapping that badge against the RFID scanner at the turnstile to open the door.

---
## Reverse Proxy

A reverse proxy is an intermediary server that sits in front of one or more backend web servers. It intercepts all incoming client requests, forwards them to the appropriate backend server, and then returns the server's response back to the client. It acts as a protective and organizational shield for your infrastructure.

- **Synonyms:** Ingress Proxy, Edge Server.
- **Examples:** NGINX, HAProxy, Traefik, Apache HTTP Server.
- **Distinction:** A reverse proxy is a broad networking concept focused on general HTTP traffic management.
- Its **primary responsibilities are usually:** 
	- load balancing (distributing traffic across multiple servers), 
	- SSL termination (handling HTTPS decryption so the backend doesn't have to), 
	- caching, 
	- and hiding the internal IP addresses of your servers.
- **Colloquialisms & Misuses:**
    - Frequently confused with a *Forward Proxy*. A forward proxy sits in front of *clients* to protect their identity and manage their outbound traffic (like a corporate web filter or a VPN). A reverse proxy sits in front of *servers* to protect them and manage inbound traffic.

## API Gateway

An API Gateway is a *specialized, advanced type of reverse proxy* designed specifically *for managing, securing, and monitoring APIs*. **It sits between the client and a collection of backend microservices, acting as the single entry point for all API calls**.

- **Synonyms:** API Proxy, API Manager, Edge Gateway.
- **Examples:** AWS API Gateway, Kong, Apigee, Ocelot.
- **Distinction:** While an API Gateway *is* a reverse proxy under the hood, it goes far beyond basic routing. It understands the API context and handles cross-cutting business concerns like JWT validation (AuthN offloading), rate limiting, request/response payload transformation, billing, and API versioning. 
- **Colloquialisms & Misuses:**
    - Developers often use "Reverse Proxy" and "API Gateway" interchangeably. The easiest way to distinguish them is intent: if the tool is just routing raw traffic and balancing loads, it's acting as a reverse proxy. If it is inspecting payloads, validating tokens, and enforcing API quotas, it is acting as an API Gateway.