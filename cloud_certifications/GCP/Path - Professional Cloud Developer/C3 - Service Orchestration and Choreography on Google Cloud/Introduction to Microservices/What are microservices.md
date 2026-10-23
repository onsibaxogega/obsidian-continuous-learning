
# Monoliths, SOA, and Microservices


---


## 1. Monolithic Applications

- **Definition:** early enterprise applications were developed as `large, self-contained applications` that included the user interface, business logic, and data access code, with data persisted in a `large relational database`
- designed to handle many tasks — the codebase was `necessarily complex`
- each major change tended to make the codebase `even more complex`
- application code was often `tightly coupled` because everything lived in a single application
- interdependent code was `hard to maintain` — difficult to fix bugs without introducing new ones
- we now call these `monolithic applications, or monoliths`


---


## 2. Service-Oriented Architecture (SOA) #SOA

- **Definition:** SOA is an architectural style that focuses on building `reusable software components called services`, where each service executes a `discrete business function`
- communication between services was implemented using `messaging over defined service interfaces`
- typically implemented at an `enterprise level` — organizations would map business activities into services and mandate `interoperability and discoverability standards`

### Benefits of SOA

- services were `smaller and more loosely coupled` than in large monolithic applications
- smaller services led to `smaller development teams` focused on a single service and a smaller problem domain
- `service reuse` was a large focus — applications were created by combining services

### Enterprise Service Bus (ESB)

- messages between services were handled by a messaging middleware component called the `Enterprise Service Bus (ESB)`
- the ESB managed `connectivity, security, and message routing and transformation`
- enabled applications to be integrated, even for `applications outside the organization`
- applications connected to the ESB → the ESB transformed protocols, routed messages, and transformed data

### Why SOA Produced Mixed Results

- though SOA reduced complexity in service code, the complexity was `shifted to ESB integrations`
- ESB integrations became the `bottleneck` in successfully launching and updating applications
- the ESB was typically managed by a `central team` — all application teams needed ESB work, causing significant delays
- changing an integration for one application might `destabilize other applications` using the same integration
- updates to ESB software itself could `break existing integrations`, requiring significant testing


---


## 3. Microservices

- **Definition:** microservices are an alternative, `decentralized approach` to decomposing applications into `separate services, limited in scope`
- each business domain (e.g., orders, products, reviews) lives in its `own microservice with its own database`
- a microservice specifies an `interface, typically an API`, that is used by other services
- the separation of microservices leads to `loose coupling` — loosely coupled services are easier to maintain, update, and deploy

### Monolith vs SOA vs Microservices

| aspect             | monolith                          | SOA                                                             | microservices                                 |
| :----------------- | :-------------------------------- | :-------------------------------------------------------------- | :-------------------------------------------- |
| **structure**      | single self-contained application | reusable services connected via ESB                             | independent services with their own databases |
| **coupling**       | tightly coupled                   | loosely coupled services, but tightly coupled to ESB            | loosely coupled via APIs                      |
| **complexity**     | lives in the application codebase | shifted to ESB integrations                                     | distributed across services                   |
| **deployment**     | deploy the entire application     | deploy services, but ESB changes require coordination           | each service is independently deployable      |
| **team structure** | large team on a single codebase   | smaller teams per service, but central ESB team is a bottleneck | small teams with reduced scope per service    |
| **communication**  | internal function calls           | messaging via ESB (protocol transformation, routing)            | direct HTTP APIs between services             |


---


## 4. Monolith-First vs Microservices-First

- **starting with microservices:** if you require the ability to `quickly release changes` or plan to `grow the size of your team`, it probably makes sense to start with microservices
- **starting with a monolith:** if you `don't have expertise in the problem domain`, choosing the right service boundaries might be difficult — starting with a monolith lets you `build your application before you fully understand how to separate the services`
- you can `migrate to microservices later` as you gain more experience with the problem domain
- one of the most difficult parts of architecting a microservices application is `designing the service boundaries`

- `NOTE:` when starting with a monolith, design your application to be `modular` so it's easier to migrate to microservices in the future


---


## 5. Tips & Tricks

- the monolith → SOA → microservices evolution is a common exam framing — remember that `SOA moved complexity to the ESB`, while microservices `eliminate the central middleware entirely` in favor of direct API calls
- for the PCD exam, the key signal for "microservices" is: independently deployable, own database per service, small team per service, API interfaces
- the "monolith-first" approach is a legitimate strategy — don't treat it as inherently wrong; it's appropriate when the `problem domain is not well understood yet`
- the "own database per service" pattern is critical — if microservices share a database, you've reintroduced tight coupling through the data layer
