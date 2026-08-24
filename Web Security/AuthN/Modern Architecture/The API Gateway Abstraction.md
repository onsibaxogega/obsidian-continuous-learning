### Overview

- When reading HTTP specifications, "the server" is treated as a single logical entity. However, in modern distributed systems and microservice architectures, this is an abstraction. 
- The client rarely connects directly to the backend application server or the authentication server. 
- Instead, this role is usually fulfilled by a **[[Web Security/AuthN/Overview & Definitions#Reverse Proxy|Reverse Proxy]]** or **[[Web Security/AuthN/Overview & Definitions#API Gateway|API Gateway]]**.

### The Gateway as "The Server"
- From the client's perspective, the Gateway *is* the server. 
- Therefore, when a request lacks credentials, the Gateway intercepts the traffic and immediately returns the standard `401 Unauthorized` challenge, shielding the internal network from unauthenticated requests. 
	- *Note: it returns a 401, not a 407, because a reverse proxy acts on behalf of the origin server.*


### Gateway Authentication Patterns
When a client successfully provides an `Authorization` header, the Gateway must determine if the token is valid before routing the traffic. This typically happens in one of three ways:

#### 1. Local JWT Validation (Stateless) 
   Because a JWT is self-contained and cryptographically signed, the Gateway can mathematically verify the token's signature locally using a public key. It does not need to communicate with the Auth Server, making it highly scalable. Once verified, it routes the request downstream.
#### 2. Token Introspection (Stateful) 
   If the system uses opaque tokens (like standard API keys) instead of JWTs, the Gateway cannot verify them locally. It must pause the request, make a fast internal network call to the Auth Server to ask, "Is this token valid?", and then route the traffic based on the Auth Server's response.
#### 3. Pass-Through (Delegated)
   In some infrastructures, the Gateway is configured purely for routing and rate-limiting. It blindly forwards the `Authorization` header to the downstream application servers (such as your .NET Core or Spring Boot microservices). In this scenario, the application server itself is responsible for validating the token, processing the AuthZ rules, and returning the 401 or 403 if validation fails.