
# Google Cloud Identity and Centralized User Management

When new Google Cloud customers start using the platform, it's common to log in with a Gmail account and use Google Groups for collaboration. While easy to start with, this approach presents challenges because `team identities are not centrally managed` — for example, there's no easy way to immediately remove a user's access when someone leaves the organization.

## Cloud Identity

Cloud Identity is a tool that lets organizations define policies and manage their users and groups using the Google Admin Console.

- **Integration with existing identity systems** — admins can log in and manage Google Cloud resources using the same usernames and passwords they already use in existing Active Directory or LDAP systems.
- **Centralized offboarding** — when someone leaves an organization, an administrator can use the Google Admin Console to disable their account and remove them from groups.

## Editions

| Edition | Description |
|---------|-------------|
| free | core identity and group management |
| premium | adds capabilities to manage mobile devices |

> `NOTE:` If you're a Google Cloud customer who is also a Google Workspace customer, this functionality is already available in the Google Admin Console.
