
# Google Cloud Service Accounts

Service accounts allow you to assign specific permissions to a virtual machine (or other compute resource), so it can interact with other cloud services without human intervention.

## Why service accounts exist

Instead of requiring a person to manually grant access each time a program runs, you give the virtual machine itself the necessary permissions. For example, if an application running in a VM needs to store data in Cloud Storage — but you don't want anyone on the internet to have access to that data — you can create a service account to authenticate that VM to Cloud Storage.

## Key characteristics

- **Named with an email address** — but instead of passwords, service accounts use `cryptographic keys` to access resources.
- **Function as an identity** — a service account can be granted roles just like any other principal. For example, granting a service account Compute Engine's `instanceAdmin` role allows an application running in a VM with that service account to create, modify, and delete other VMs.
- **Also a resource** — a service account can have IAM policies of its own attached to it. This means you can control who can use or manage the service account itself.

## Service account as both identity and resource

This dual nature is a critical concept. Because a service account is also a resource, you can grant IAM roles *on the service account itself* to control access to it:

| Principal | Role on the service account | What they can do |
|-----------|----------------------------|------------------|
| Alice | editor | manage which Google accounts can act as the service account |
| Bob | viewer | view a list of service accounts |

This works just like granting roles for any other Google Cloud resource.
