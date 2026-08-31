> **GCP Identity-Aware Proxy (IAP)** acts as a Zero Trust security boundary, intercepting traffic at the load balancer level, authenticating the user via an Identity Provider (like Okta), and securely passing that verified identity down to backend services (like Cloud Run) using a cryptographically signed **JSON Web Token (JWT)**.

## 1. Core Concept

- **The IAP JWT Header:** When IAP successfully authenticates a user, it doesn't just blindly forward the raw HTTP request to your application. It injects a special HTTP header called `X-Goog-Authenticated-User-JWT`.
- **Google as the Issuer:** This injected JWT is fundamentally different from a token minted directly by Okta. While Okta verified the user, *Google IAP* mints and signs this specific JWT using Google's own private keys.
- **The Payload:** The payload of this IAP JWT contains the authenticated user's identity (their email or ID) in the `sub` or `email` claims.
- **Zero Trust Perimeter:** Your backend FastAPI application running in Cloud Run should *never* trust that a request is secure just because it came from the internal VPC. It must mathematically verify the signature of the `X-Goog-Authenticated-User-JWT` to prove the request genuinely passed through the IAP security checks.

### Why It Matters for Zero Trust

- **Defense in Depth:** Even if a malicious actor breached the internal corporate network and tried to send a direct HTTP request to the internal Cloud Run URL, they could not bypass security. Because they cannot forge Google's cryptographic signature on the JWT, the FastAPI backend will instantly reject the fake request.
- **Decoupling Auth from Business Logic:** Your backend developers do not need to write complex SAML or OIDC login flows. They only need to write a simple middleware that verifies a standard JWT signature. IAP handles the heavy lifting of the actual login screens and session cookies.

---

## 2. Architectural Flow

### DIAGRAM: gcp_iap_jwt_injection

This sequence illustrates the traffic flow from a corporate user accessing an internal AI tool, showing how IAP authenticates the user and passes the identity via JWT to a Serverless NEG.

1.  **Ingress & Interception:**
    *   The User navigates to `chat.ai.mo.gov`.
    *   The traffic hits the GCP Internal Application Load Balancer (ALB).
    *   The Identity-Aware Proxy (IAP), attached to the ALB, intercepts the request.
2.  **Authentication (Okta):**
    *   IAP checks if the user has a valid IAP session cookie (`GCP_IAP_UID`).
    *   If no valid session exists, IAP redirects the user's browser to the central Identity Provider (Okta) via the OIDC protocol.
    *   The User logs in at Okta. Okta redirects back to IAP with a success payload.
3.  **JWT Minting & Injection:**
    *   IAP validates the Okta response and establishes a browser session cookie for the user.
    *   Crucially, IAP now generates a brand new JSON Web Token. It places the user's email into the payload and signs the token using Google's private cryptographic keys.
    *   IAP attaches this token to the `X-Goog-Authenticated-User-JWT` HTTP header and forwards the request through the Proxy Subnet to the Serverless NEG.
4.  **Backend Verification:**
    *   The request arrives at the FastAPI Cloud Run container.
    *   A FastAPI dependency intercepts the request, reads the `X-Goog-Authenticated-User-JWT` header, and fetches Google's public keys (from `https://www.gstatic.com/iap/verify/public_key`).
    *   FastAPI mathematically verifies the signature. If valid, it extracts the user's email and processes the request with absolute certainty of the user's identity.

---

## 3. Implementation

This snippet demonstrates a FastAPI dependency specifically designed to verify GCP IAP JWTs.

```python
# Setup: pip install google-auth

from fastapi import Depends, HTTPException, Header, status
from google.oauth2 import id_token
from google.auth.transport import requests

# Google's public key endpoint for IAP
IAP_PUBLIC_KEY_URL = "https://www.gstatic.com/iap/verify/public_key"

def verify_iap_jwt(
    # FastAPI extracts the specific header automatically
    x_goog_authenticated_user_jwt: str = Header(None)
) -> dict:
    """
    Verifies the JWT injected by GCP Identity-Aware Proxy.
    """
    if not x_goog_authenticated_user_jwt:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing IAP JWT header"
        )

    try:
        # The google-auth library handles fetching the public keys and verifying the signature
        # We must explicitly verify the audience matches our specific GCP Backend Service ID
        expected_audience = "/projects/1234567890/global/backendServices/0987654321"
        
        decoded_jwt = id_token.verify_token(
            x_goog_authenticated_user_jwt,
            requests.Request(),
            audience=expected_audience,
            certs_url=IAP_PUBLIC_KEY_URL
        )
        
        return decoded_jwt  # prints {'sub': 'accounts.google.com:123', 'email': 'user@mo.gov', ...}
        
    except ValueError as e:
        # Raised if the signature is invalid, expired, or audience doesn't match
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Invalid IAP JWT: {str(e)}"
        )
```

---

## 4. Industry Best Practices & Security

- **Strict Audience Validation:**
	- `Audience` (`aud`) validation is non-negotiable. If you don't check the audience, a valid IAP token from *App A* could be maliciously sent to *App B*, and *App B* would accept it because the Google signature is technically valid.
	- **Rule:** Always ensure the `aud` claim matches the exact GCP Backend Service ID or project number of your specific application.
- **Do Not Trust `X-Goog-Authenticated-User-Email`:**
	- IAP also injects a plaintext header called `X-Goog-Authenticated-User-Email`. 
	- **Rule:** *Never* use this plaintext header for authorization. It can be easily spoofed if the network perimeter is misconfigured. *Always* rely on the cryptographically signed `X-Goog-Authenticated-User-JWT`.

---

## 5. Tips & Tricks

- **Local Development Bypass:** When running your FastAPI app locally, you won't have IAP sitting in front injecting JWTs. You'll need to create a development toggle in your code that bypasses the `verify_iap_jwt` dependency and injects a mock user payload when a local `.env` flag (e.g., `ENV=local`) is set.
