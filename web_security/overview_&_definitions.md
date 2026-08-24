## Authentication (AuthN)

Authentication is the process of verifying the identity of a user, device, or system. It acts as the gatekeeper that confirms a party is exactly who they claim to be, answering the fundamental question: "Who are you?"

- **Synonyms:** AuthN, Identity Verification, Login, Sign-In.
- **Examples:** Submitting a username and password, scanning a biometric fingerprint, entering an MFA code from an authenticator app, or validating the signature of a JSON Web Token.
- **Distinction:** Authentication must successfully occur *before* authorization. It establishes trust in the identity but says absolutely nothing about what that identity is allowed to do.
- **Colloquialisms & Misuses:**
    - Universally abbreviated as "Auth," which immediately creates ambiguity.
    - When configuring security middleware in web frameworks like .NET Core or Java Spring Boot, developers often say they are "implementing auth" or setting up "auth filters," even though those libraries typically manage both identity verification and access control simultaneously. 

## Authorization (AuthZ)

Authorization is the process of determining what an authenticated user, device, or system is permitted to do. It evaluates rules and policies to grant or deny access to resources, answering the question: "What are you allowed to do?"

- **Synonyms:** AuthZ, Access Control, Permissions, Privileges, Rights.
- **Examples:** Role-Based Access Control (RBAC) where an `Admin` can delete records but a `Standard_User` can only read them; or checking if an authenticated identity is the actual owner of a file before allowing them to edit it.
- **Distinction:** Authorization relies completely on the foundation of authentication. If authentication gives you the ID badge to enter the corporate building, authorization determines exactly which internal doors your badge is programmed to unlock. 
- **Colloquialisms & Misuses:**
    - Also heavily abbreviated as "Auth" in conversation and folder structures (e.g., an `AuthService` might check permissions rather than identity).
    - Developers frequently confuse authorization frameworks with authentication protocols. For example, OAuth 2.0 is strictly an *authorization* framework designed to grant third-party applications scoped access to resources, but it is routinely (and incorrectly) referred to as an authentication method.