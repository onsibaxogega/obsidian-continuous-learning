
# Google Cloud IAM (Identity and Access Management)

When an organization node contains lots of folders, projects, and resources, administrators need to restrict who has access to what. IAM lets administrators apply policies that define who can do what and on which resources.

## IAM policy structure

- **"Who" (principal)** — a Google account, Google group, service account, or Cloud Identity domain. Each principal has its own identifier, usually an email address.
- **"Can do what" (role)** — a collection of permissions. Granting a role to a principal grants all permissions that the role contains.
- **"On which resources"** — when a principal is given a role on a specific element of the resource hierarchy, the policy applies to that element and all elements below it.

## Deny rules

- deny rules prevent certain principals from using certain permissions, regardless of the roles they're granted
- IAM always checks relevant deny policies before checking relevant allow policies
- deny policies, like allow policies, are inherited through the resource hierarchy

## Role types

### Basic roles

Basic roles are broad in scope — when applied to a project, they affect all resources in that project.

| Role                  | Permissions                                                                         |
| --------------------- | ----------------------------------------------------------------------------------- |
| viewer                | access resources but can't make changes                                             |
| editor                | access and make changes to a resource                                               |
| owner                 | access and make changes to a resource; manage roles and permissions; set up billing |
| billing administrator | control billing for a project without the ability to change resources               |

> `NOTE:` If several people are working together on a project that contains sensitive data, basic roles are probably too broad.

### Predefined roles

Specific Google Cloud services offer sets of predefined roles and define where those roles can be applied. For example, Compute Engine provides predefined roles such as `instanceAdmin`, which can be applied to resources in a given project, folder, or entire organization.

### Custom roles

Custom roles support the **least-privilege model**, where each person is given the minimal amount of privilege needed to do their job.

- example: define an `instanceOperator` role to allow users to stop and start Compute Engine VMs but not reconfigure them
- you must manage the permissions that define the custom role yourself
> **NOTE:** custom roles can only be applied at the **project level** or **organization level** — *not the folder level*



![[iam_principal_role_permission_relationship.png]]