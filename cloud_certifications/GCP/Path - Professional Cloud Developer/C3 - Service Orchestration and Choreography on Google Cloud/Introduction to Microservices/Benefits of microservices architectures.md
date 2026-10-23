
# Benefits of Microservices


---


## 1. Simpler Codebase and Agile Development

- each microservice is `simpler than a large, monolithic application`
- each has a `smaller and simpler codebase`, which generally allows for a single, small team to focus on the internal details of that microservice
- easier for team members to `understand and update` without causing issues in other parts of the application
- microservices are typically `easier to unit test` because there are clear boundaries between different services
- microservices are `separately deployable` — teams can update their microservices on their own schedules
- other microservices are only affected when a `breaking change is made to the interface` of a microservice
- these traits lead to `more agile development` — microservices can be separately updated and deployed without affecting other services


---


## 2. Technology Flexibility

- microservices can use `different programming languages and technologies`
- microservices connect using an `API interface` — the languages, frameworks, and technologies used internally do not affect calling services
- a team can choose the languages and technologies that `best suit their service`
- microservices running on one platform can connect to microservices running on a `different platform`
- microservices typically connect using `HTTP APIs` and can call each other `without worrying about where the service is located`


---


## 3. Independent Scaling

- each microservice can be `scaled separately`, dedicating more resources only to those services that require more capacity
- microservices are typically easy to `scale up and down` based on fluctuations in traffic
- instead of building the infrastructure required when load is highest, the infrastructure and cost can be `optimized based on current traffic requirements`
