The **Internet Engineering Task Force (IETF)** maintains an official registry of HTTP authentication schemes. Beyond **Bearer**, the most common schemes used in web development are categorized below by their primary use case.

## 1. Developer and Machine Integration
- **Basic**: Sends a username and password joined by a colon (`username:password`) and encoded in Base64. It is simple but insecure unless used over HTTPS.
- **ApiKey**: Expects a long-lived, server-generated API key. This is often used for server-to-server communications where a user is not present.
	- **ApiKey** is technically not a standardized IETF scheme in the same way Basic or Bearer are. However, it is an extremely widespread industry standard.
	- API keys are often passed in the `Authorization` header (e.g., `Authorization: ApiKey ...`) or via a custom header like `X-API-Key`

## 2. Enterprise and Legacy Networks

- **Digest**: An older, more secure alternative to _Basic_. The server sends a temporary challenge value (*nonce*), and the client hashes the password with that nonce before sending it back, ensuring the raw password never travels over the network.
- **Negotiate**: Used predominantly in Windows enterprise networks. It allows the browser to automatically log the user into a web app using their local Windows login credentials via **Kerberos** or **NTLM** protocols.

## 3. Modern Cloud and Infrastructure

- **AWS4-HMAC-SHA256**: A highly secure, custom scheme designed by Amazon Web Services. It uses cryptographic signing where the request body, timestamp, and headers are hashed together to prove authenticity without sending the actual secret key.
- **HOBA (HTTP Origin-Bound Authentication)**: A digital-signature-based scheme that uses public-key cryptography instead of traditional passwords.

## 4. Special Purpose Schemes

- **Mutual**: A scheme where both the client and the server authenticate each other simultaneously using specialized cryptographic exchanges.
- **VAPID**: Used specifically for Web Push notifications. It allows an application server to voluntarily identify itself to a push service provider.

## Format Comparison Examples

```
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
Authorization: ApiKey abcd1234_my_secret_api_key
Authorization: Digest username="Mufasa", realm="me@ostrich.com", nonce="dcd98b..."
Authorization: Negotiate YUlGQkFVRU...
```