
# Compute Options for Your Application


## Module Overview

- Google Cloud has a `range of compute options` to run your applications
- you choose a platform that matches the needs of your application, including the `level of control` you need for the infrastructure
- having more control over the infrastructure usually leads to a `greater operational burden`
- if you use `cloud client libraries` in your application to work with Google Cloud services, you can usually move to another platform without reworking your application

### Module Learning Objectives

after completing this module, you'll be able to:

- identify which `use cases are most appropriate` for each compute option
- decide between compute options based on your application's requirements

### Compute Options Summary

| platform                           | what it is                                                                     | key characteristics                                                                                                                                                                                                |
| :--------------------------------- | :----------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Compute Engine**                 | create `virtual machines` that mimic traditional data center servers           | highly flexible; run the same wide range of applications as physical hardware, but on Google's infrastructure                                                                                                      |
| **Google Kubernetes Engine (GKE)** | managed service for `running containers` and managing the VMs used to run them | a cluster of VMs is created for containerized apps; GKE manages `scaling and security`; reduces operational costs                                                                                                  |
| **Cloud Run**                      | fully managed `serverless platform` for containerized applications             | all infrastructure management is abstracted away; scales up and down `from zero almost instantaneously`; `pay only when your code is running`; can create containers from source code — you only supply the source |

- `NOTE:` the spectrum runs from `most control / most operational burden` (Compute Engine) to `least control / least operational burden` (Cloud Run), with GKE in the middle
