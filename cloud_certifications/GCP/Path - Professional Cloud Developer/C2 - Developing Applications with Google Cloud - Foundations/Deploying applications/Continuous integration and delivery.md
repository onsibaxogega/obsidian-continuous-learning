
# CI/CD Pipeline and Software Supply Chain Security


## 1. Core Concept

- **Definition:** a CI/CD pipeline provides a `stable, repeatable process` for building and deploying your applications
- the goal is to `automate` build, test, and release processes as much as possible to enable `high release velocity`


---


## 2. CI/CD Pipeline Flow

### Continuous Integration (CI)

1. developers commit changes into a `feature branch` in a code repository
2. a build service like `Cloud Build` is automatically triggered
3. rules you have established guide the generation of your application containers and executables
4. application artifacts are stored in a repository like `Artifact Registry`

### Continuous Delivery (CD)

1. changes are pushed to the `main branch` in the repository
2. the build system builds the code and creates `application images`
3. the deployment system (e.g., `Cloud Deploy`) deploys application images to Cloud Run or GKE in a `staging environment`
4. `integration and performance tests` are automatically run
5. if all tests pass, the build is tagged as a `release candidate build`
6. you `manually approve` the release candidate
7. approval triggers deployment to production as a `canary or blue-green release`
8. monitor performance using `Cloud Monitoring`
9. if the deployment functions optimally, `switch all traffic to the new release`
10. if problems are discovered, `roll back to the last stable release`

### Continuous Deployment

- varies slightly from continuous delivery — there is `no manual approval process`
- the deployment system `automatically deploys` release candidates to the production environment



---


## 3. Software Supply Chain Security

- it's critical to consider `security throughout the CI/CD process`
- Google Cloud provides a `comprehensive and modular set of capabilities and tools` to improve software supply chain security

### Security Services

| service                          | what it does                                                                                                                                                                                                                                                                                                                             |
| :------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Assured Open Source Software** | incorporates open `Java and Python` source packages that have been `verified and tested by Google`; built using Google's secure pipelines; regularly scanned, analyzed, and tested for vulnerabilities; Google actively finds and fixes vulnerabilities                                                                                  |
| **Cloud Build**                  | imports source code and verified open source packages; executes builds on Google Cloud infrastructure; maintains `verifiable metadata` about the build — helps verify that a built artifact was created from `trusted sources by a trusted build system`                                                                                 |
| **Artifact Registry**            | stores, secures, and manages your build artifacts                                                                                                                                                                                                                                                                                        |
| **Artifact Analysis**            | proactively detects vulnerabilities in Artifact Registry; provides `on-demand and automated scanning` for base container images and Maven and Go packages; scans Java projects for vulnerabilities in open source Maven dependencies; `continuously monitors` metadata for scanned images for new vulnerabilities after the initial scan |
| **Cloud Deploy**                 | automates delivery to a series of target environments in a defined sequence; supports continuous delivery to `Cloud Run and GKE`; provides `one-click approvals and rollbacks`; displays security insights for deployed applications                                                                                                     |
| **Binary Authorization**         | establishes, maintains, and verifies a `chain of trust` along the software supply chain; collects `attestations` (digital documents certifying an image was built by a required process); ensures images are deployed `only when attestations meet your organization's policy`; alerts when policy violations are found                  |
| **GKE security**                 | assesses container security; provides active guidance on `cluster settings, workload configuration, and vulnerabilities`; evaluates clusters and workloads with `actionable recommendations`                                                                                                                                             |
| **Cloud Run security**           | contains a `security panel` displaying security insights about builds and vulnerabilities in running services                                                                                                                                                                                                                            |


![[software_supply_chain_security.png]]


---


## 4. Tips & Tricks

- for PCD exam prep, remember the distinction: `continuous delivery` = manual approval before production, `continuous deployment` = fully automated to production with no manual gate
- `Artifact Analysis` does both initial and ongoing scanning — this is important for understanding that vulnerabilities discovered *after* your image was pushed will still be flagged
- `Binary Authorization` is the key service for enforcing `deploy-time policy` — it answers the question "should this image be allowed to run?" based on attestations, not just vulnerability scans
- for your Cloud Run deployments, check the `security panel` regularly — it surfaces build provenance and vulnerability insights without needing a separate tool
