
# Handling Authentication & Authorization — Module Overview

> Implementing user authentication and authorization from scratch leaves you `vulnerable to attacks`. Google Cloud provides `IAM`, `Identity Platform`, `Identity-Aware Proxy (IAP)`, and `Secret Manager` as managed solutions for securing your application users and their data. #GCP_Auth #GCP_IAM #GCP_Identity_Platform


---


## 1. Module Learning Objectives

After completing this module, you'll be able to:

- understand `IAM principles` and how to specify the resources users can access and the operations they can perform
- use `service accounts` and other methods to authenticate and authorize applications to invoke Google Cloud APIs — and know when to use each method
- use `Identity-Aware Proxy (IAP)` to control access to your application
- use the `Firebase SDK` to validate users against credentials stored in `Identity Platform`
- use `Secret Manager` to securely store credentials required by your application


---


## 2. Topics Covered

| Topic                                | What You Learn                                                                            |
| :----------------------------------- | :---------------------------------------------------------------------------------------- |
| **IAM**                              | principles of identity and access management; specifying resources and allowed operations |
| **service accounts**                 | authenticating applications (not users) to invoke Google Cloud APIs                       |
| **Identity-Aware Proxy (IAP)**       | controlling access to your application at the infrastructure layer                        |
| **Identity Platform + Firebase SDK** | federated identity management for authenticating end users                                |
| **Secret Manager**                   | securely storing passwords, keys, certificates, and other sensitive data                  |


---


## 3. Why This Matters

- writing your own authentication/authorization code `leaves you vulnerable to attacks`
- IAM and Identity Platform provide a `simple and secure solution` for authenticating and authorizing application users
- the Firebase SDK makes it `easy to implement federated identity management` — you don't need to build, secure, or scale a proprietary auth solution

> `NOTE:` for the exam, understand the distinction between `authentication` (who are you?) and `authorization` (what are you allowed to do?). 
> IAM handles authorization for GCP resources. 
> Identity Platform handles authentication for your application's end users. 
> IAP sits in front of your application and handles both — it authenticates users via an identity provider and only allows authorized users through.
