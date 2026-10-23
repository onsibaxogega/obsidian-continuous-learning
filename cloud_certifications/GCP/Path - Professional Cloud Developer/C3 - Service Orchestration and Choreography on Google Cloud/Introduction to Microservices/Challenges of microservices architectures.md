
# Challenges of Microservices


---


## 1. Operational Burden

- each microservice can be developed, deployed, and tested separately — but having more deployable entities causes a `greater operational burden`
- the operations team must manage `tens, hundreds, or thousands` of microservices
- `automated builds, testing, and deployments` are vital to maintaining the health and efficiency of your applications and your operational team
- with so many services, it's important to maintain `consistent logging, reporting, security, and authorization` across all services


---


## 2. Communication Complexity and Latency

- communication between microservices `can be complex` — if you don't design your systems well, it can be difficult to understand the `"spider web" of communication` between services
- microservices introduce `communication latency`:
	- in a monolith, calls between components are typically `in the same process running on the same hardware`
	- with microservices, calls happen `across the network`, which can be `thousands of times slower`
	- when a business operation requires many microservice calls, the `latency can be significant`


---


## 3. Testing and Debugging

- **unit testing** for each microservice can be straightforward
- **integration testing** is typically more challenging — the distributed nature means that testing the entire system requires `modeling the entire production deployment`
- **debugging** can be difficult — if an application consists of many microservices and each creates its own logs, `tracing calls that span many microservices can be challenging`

- `NOTE:` this is exactly where `Cloud Trace` (distributed tracing across services) and `Cloud Logging` (centralized log aggregation) become essential — they directly address the debugging and tracing challenges described here


---


## 4. Key Takeaway

- building microservices requires a `commitment to automation and operational excellence`
- the benefits of microservices `generally outweigh the challenges`
- `service orchestration and choreography` can reduce the complexity of microservice-based applications
