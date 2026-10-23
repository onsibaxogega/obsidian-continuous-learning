
# IAM Authorization

> `IAM` lets you manage access control by defining `who` (the *principal*) has `what access` (*role*) for `which resource`. 
> Access should follow the `principle of least privilege` — only grant the permissions necessary for a principal to do its job. #GCP_IAM #least_privilege


---


## 1. Core Concept — Who, What, Which

IAM answers three questions:

- **who** — the `principal` (identity requesting access)
- **what access** — the `role` (collection of permissions)
- **which resource** — the `Google Cloud resource` being accessed (project, VM, bucket, etc.)


---


## 2. IAM Principals

| Principal Type               | What It Represents                                                                            | Can Establish Identity? |
| :--------------------------- | :-------------------------------------------------------------------------------------------- | :---------------------- |
| **Google Account**           | a developer, administrator, or individual user                                                | yes                     |
| **service account**          | an account for an `application or compute workload`, not an end user                          | yes                     |
| **Google Group**             | a named collection of Google Accounts and service accounts with a `unique email address`      | no                      |
| **Google Workspace account** | a virtual group of all Google Accounts in an organization (tied to a domain like `acme.corp`) | no                      |
| **Cloud Identity domain**    | like a Workspace account but `without access to Workspace apps` (Gmail, Docs, etc.)           | no                      |

- **service accounts** — you can create as many as needed to represent the `different logical components` of your application; when you run code on Google Cloud, it runs as the service account you specify
- **Google Groups** — a convenient way to apply access controls to a `collection of users`; grant and change access for the whole group at once instead of individually
- **Google Groups, Workspace accounts, and Cloud Identity domains** cannot be used to `establish identity` to make a request — they are only for `convenient permission management`

> `NOTE:` for an external IdP + Workforce Identity Federation setup, the external IdP identities are mapped into Google Cloud as `federated principals` — IAM policies can reference these identities directly without creating individual Google Accounts for each employee.


---


## 3. Permissions

- permissions determine `what operations are allowed` on a resource
- format: `<service>.<resource>.<verb>`
	- _Example:_ `pubsub.subscriptions.consume`
- you `cannot assign a permission to a user directly` — instead, you grant the user a `role`


---


## 4. Roles

- **Definition:** a `role` is a `collection of permissions` — when you grant a role to a user, you grant all the permissions contained in that role
- you can grant `multiple roles` to the same user
- _Example:_ all users in the Google group `staff@acme.corp` are granted the `InstanceAdmin` role on `acme-prod-123` — each user gets all permissions contained in that role

### Three Types of Roles

| Role Type      | Description                                                                          | Example                                                           | When to Use                                |
| :------------- | :----------------------------------------------------------------------------------- | :---------------------------------------------------------------- | :----------------------------------------- |
| **basic**      | highly permissive, broad access                                                      | `Viewer` (read-only to all resources in a project)                | almost `never in production` — too broad   |
| **predefined** | granular access to specific Google Cloud resources; created and maintained by Google | `run.invoker` (invoke Cloud Run services)                         | `default choice` for most use cases        |
| **custom**     | user-defined, maintained for specific needs                                          | a role with only `storage.objects.get` and `storage.objects.list` | when predefined roles are `too permissive` |

> `NOTE:` basic roles (Viewer, Editor, Owner) are a classic exam trap — they're `almost never the right answer` in production scenarios. If a question asks about `least privilege`, the answer is either a `predefined role` or a `custom role`, never a basic role.


---


## 5. Principle of Least Privilege

- provide each principal `exactly the permissions necessary` for it to do its job — nothing more
- **custom roles** help enforce least privilege when existing predefined roles are too permissive
- in practice:
	- use `predefined roles` first — they're maintained by Google and cover most use cases
	- create `custom roles` only when a predefined role grants more permissions than needed
	- prefer `service accounts per component` — each Cloud Run service, Cloud Build pipeline, or Cloud Run function should have its own service account with only the permissions it needs


---


## 6. Tips & Tricks

- **one service account per application component** — don't reuse a single service account across your entire project; create dedicated ones for Cloud Run, Cloud Build, Cloud Run functions, etc.
- **never use basic roles in production** — they grant access to `all resources in a project`; always use predefined or custom roles
- **Google Groups for team access** — instead of granting roles to individual developers, create a Google Group (e.g., `devs@acme.corp`) and grant the role to the group; when someone joins or leaves the team, update the group membership instead of IAM policies
- **custom roles require maintenance** — unlike predefined roles (maintained by Google), custom roles are `your responsibility` to update when new permissions are added to APIs; use them sparingly
- **permissions are additive** — IAM has no "deny" permissions by default (though IAM deny policies exist); if a user has multiple roles, their effective permissions are the `union of all role permissions`
- **exam tip:** the format `<service>.<resource>.<verb>` is how permissions are structured — know how to read them (e.g., `compute.instances.start` = start a Compute Engine VM)
