A sequence diagram illustrating the traffic flow from a corporate user accessing an internal AI tool, showing how IAP authenticates the user and passes the identity via JWT to a Serverless NEG.

1. **Ingress & Interception:**
   * The User navigates to `chat.ai.acme.corp`.
   * The traffic hits the GCP Internal Application Load Balancer (ALB).
   * The Identity-Aware Proxy (IAP), attached to the ALB, intercepts the request.
2. **Authentication (Okta):**
   * IAP checks if the user has a valid IAP session cookie (`GCP_IAP_UID`).
   * If no valid session exists, IAP redirects the user's browser to the central Identity Provider (Okta) via the OIDC protocol.
   * The User logs in at Okta. Okta redirects back to IAP with a success payload.
3. **JWT Minting & Injection:**
   * IAP validates the Okta response and establishes a browser session cookie for the user.
   * Crucially, IAP now generates a brand new JSON Web Token. It places the user's email into the payload and signs the token using Google's private cryptographic keys.
   * IAP attaches this token to the `X-Goog-Authenticated-User-JWT` HTTP header and forwards the request through the Proxy Subnet to the Serverless NEG.
4. **Backend Verification:**
   * The request arrives at the FastAPI Cloud Run container.
   * A FastAPI dependency intercepts the request, reads the `X-Goog-Authenticated-User-JWT` header, and fetches Google's public keys (from `https://www.gstatic.com/iap/verify/public_key`).
   * FastAPI mathematically verifies the signature. If valid, it extracts the user's email and processes the request with absolute certainty of the user's identity.
