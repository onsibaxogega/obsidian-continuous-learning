
# Google Cloud Resource Hierarchy

Google Cloud's resource hierarchy contains four levels. Starting from the bottom up: resources, projects, folders, and an organization node. Policies can be defined at the project, folder, and organization node levels, and are inherited downward.

## 1. Resources

Resources represent virtual machines, Cloud Storage buckets, tables in BigQuery, or anything else in Google Cloud. Each resource belongs to exactly one project.

## 2. Projects

Projects are the basis for enabling and using Google Cloud services — managing APIs, enabling billing, adding and removing collaborators, and enabling other Google services. Projects can have different owners and users because they're billed and managed separately.

Each project has three identifying attributes:

| Attribute      | Description                                                       | Mutable        |
| -------------- | ----------------------------------------------------------------- | -------------- |
| project ID     | globally unique identifier assigned by Google                     | no (immutable) |
| project name   | user-created, does not have to be unique                          | yes            |
| project number | Google-assigned unique number, used internally to track resources | no             |

### Resource Manager

Google Cloud's Resource Manager tool is an API designed to programmatically manage projects. It can:

- gather a list of all projects associated with an account
- create new projects
- update existing projects
- delete projects
- recover previously deleted projects

It is accessible through the RPC API and the REST API.

## 3. Folders

Folders let you assign policies to resources at a level of granularity you choose. Resources in a folder inherit policies and permissions assigned to that folder. A folder can contain projects, other folders, or a combination of both.

- group resources on a per-department basis
- delegate administrative rights so teams can work independently
- apply shared policies in one place instead of duplicating them across projects

To use folders, you must have an organization node.

## 4. Organization node

The topmost resource in the Google Cloud hierarchy. Everything else — folders, projects, and other resources — goes under this node.

### Special roles

- **organization policy administrator** — controls who can change policies
- **project creator** — controls who can create projects and spend money

### Creating an organization node

- if your company is a Google Workspace customer, projects will automatically belong to your organization node
- otherwise, use **Cloud Identity** (Google's identity, access, application, and endpoint management platform) to generate one

Once created, anyone in the domain can create projects and billing accounts, and you can create folders underneath and organize projects into them. Both folders and projects are considered "children" of the organization node.


![[gcp_resource_hierarchy.png|1316]]