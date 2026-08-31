
This sequence diagram illustrates how a decoupled React Single Page Application (SPA) and a FastAPI backend utilize JWTs without relying on a central database for session state.

1. **Authentication Phase:**
   * The User inputs their credentials into the React SPA.
   * The React SPA sends these credentials to the Identity Provider (e.g., Okta Auth Server).
   * The Identity Provider validates the credentials.
   * The Identity Provider mints a JWT, signs it with its Private Key, and returns the JWT to the React SPA.
2. **Resource Access Phase:**
   * The React SPA makes an API request to the FastAPI Backend, including the JWT in the `Authorization: Bearer` header.
   * The FastAPI Backend intercepts the request. It does *not* contact the Identity Provider.
   * Instead, the FastAPI Backend uses the Identity Provider's Public Key (which it caches periodically) to mathematically verify the JWT's signature.
   * If the signature is valid and the `exp` claim is in the future, the FastAPI Backend extracts the `sub` (user ID) from the payload.
   * The FastAPI Backend executes the requested business logic and returns the `200 OK` response to the React SPA.
