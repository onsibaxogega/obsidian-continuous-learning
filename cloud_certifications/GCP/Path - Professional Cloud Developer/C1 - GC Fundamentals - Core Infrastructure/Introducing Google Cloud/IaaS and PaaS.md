
# IaaS, PaaS, and Serverless

- The move to virtualized data centers introduced two new types of offerings: **infrastructure as a service (IaaS)** and **platform as a service (PaaS)**.
- As cloud computing evolved further, **serverless** and **software as a service (SaaS)** models emerged.

## Cloud service models

| Model      | Description                                                                                                                      | Payment model                             | Google Cloud example                  |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------- |
| IaaS       | provides raw compute, storage, and network capabilities organized virtually into resources similar to physical data centers      | pay for resources allocated ahead of time | Compute Engine                        |
| PaaS       | binds code to libraries that provide access to the infrastructure an application needs, allowing more focus on application logic | pay for resources actually used           | App Engine                            |
| Serverless | allows developers to concentrate on code rather than server configuration by eliminating infrastructure management               | pay-as-you-go                             | Cloud Run, Cloud Run functions        |
| SaaS       | provides the entire application stack, delivering a cloud-based application consumed directly over the internet by end users     | subscription-based                        | Gmail, Docs, Drive (Google Workspace) |

## Managed services trend

**Managed infrastructure** is when a cloud provider takes over the responsibility of provisioning, configuring, maintaining, and scaling the underlying compute, storage, and networking resources. Instead of the customer managing virtual machines, disks, and networks themselves (as in the IaaS model), the provider handles those operational tasks. The customer still uses the infrastructure, but the "heavy lifting" of keeping it running is offloaded.

**Managed services** takes this a step further — the provider not only manages the underlying infrastructure but also the software layer on top of it (databases, message queues, monitoring, etc.). The customer simply consumes the service through an API or interface without worrying about patching, scaling, or availability.

As cloud computing has evolved, the momentum has shifted toward managed infrastructure and managed services. Leveraging managed resources and services allows companies to:

- concentrate more on their business goals
- spend less time and money creating and maintaining technical infrastructure
- deliver products and services to customers more quickly and reliably

## Serverless offerings on Google Cloud

- **Cloud Run** — deploy containerized microservices-based applications in a fully managed environment.
- **Cloud Run functions** — manage event-driven code as a pay-as-you-go service.
