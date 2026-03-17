
# U1: Introduction

- In this module, you’ll be introduced to the Azure identity, access, and security services and tools.
- You’ll learn about directory services in Azure, authentication methods, and access control. 
- You’ll also cover things like Zero Trust and defense in depth, and how they keep your cloud safer. 
- You’ll wrap up with an introduction to Microsoft Defender for Cloud.

## Learning objectives

- After completing this module, you’ll be able to:
	- [ ] Describe directory services in Azure, including Microsoft Entra ID and Microsoft Entra Domain Services.
	- [ ] Describe authentication methods in Azure, including single sign-on (SSO), multifactor authentication (MFA), and passwordless.
	- [ ] Describe external identities and guest access in Azure.
	- [ ] Describe Microsoft Entra Conditional Access.
	- [ ] Describe Azure Role Based Access Control (RBAC).
	- [ ] Describe the concept of Zero Trust.
	- [ ] Describe the purpose of the defense in depth model.
	- [ ] Describe the purpose of Microsoft Defender for Cloud.

---


# U2: Describe Azure directory services

> #Microsoft_Entra_ID is a *cloud-based identity and access management service* that enables *sign-in to Microsoft and third-party applications*, and can integrate with on-premises Active Directory. 

- It provides enhanced security e.g. monitoring suspicious sign-in attempts.

## Who uses Microsoft Entra ID?

*   **IT Administrators**: Control access to applications and resources.
*   **App Developers**: Add SSO and credential management to applications.
*   **Users**: Manage identities and perform self-service actions like password reset.
*   **Online Service Subscribers**: Already use it for authentication to services like Microsoft 365, Azure, etc.

## What does Microsoft Entra ID do?

- Microsoft Entra ID offers services including:
	*   **Authentication**: Verifies identity for access, with features like self-service password reset, MFA, and smart lockout.
	*   **Single Sign-On (SSO)**: Allows access to multiple applications with a single set of credentials, simplifying management.
	*   **Application Management**: Manages cloud and on-premises apps via features like Application Proxy and the My Apps portal.
	*   **Device Management**: Supports device registration for management via tools like `Microsoft Intune` and device-based `Conditional Access` policies.

## Can I connect my on-premises AD with Microsoft Entra ID?

- Yes, you can connect on-premises Active Directory with Microsoft Entra ID using **Microsoft Entra Connect**. 
	- This synchronizes user identities, enabling a consistent experience with features like SSO, MFA, and self-service password reset across both environments.


## What is Microsoft Entra Domain Services?

> #Microsoft_Entra_Domain_Services (**Entra DS**) offers `managed domain services` in Azure, including `domain join, group policy, LDAP, and Kerberos/NTLM authentication. `

- It enables running legacy applications in the cloud without managing domain controllers, facilitating "lift and shift" scenarios. 
- Entra DS integrates with your Microsoft Entra tenant, allowing users to sign in with existing credentials and use existing accounts/groups for resource security.

### How does Microsoft Entra Domain Services work?

*   Creates a **managed domain** with a unique namespace and deploys **two Windows Server domain controllers** in your Azure region as a replica set.
*   Azure handles the management, patching, and backups of these DCs.

### Is information synchronized?

*   Synchronization is **one-way** from Microsoft Entra ID to Entra DS.
*   Resources created in Entra DS are **not synchronized back** to Microsoft Entra ID.
*   In hybrid setups, Microsoft Entra Connect syncs on-premises AD to Microsoft Entra ID, which then syncs to Entra DS.
*   Azure applications and VMs can leverage Entra DS features like domain join, group policy, LDAP, and Kerberos/NTLM authentication.

![Diagram of Microsoft Entra Connect Sync synchronizing information back to the Microsoft Entra tenant from on-premises AD.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-azure-identity-access-security/media/azure-active-directory-sync-topology-7359f2b8-427db2d4.png)

---



# U3: Describe Azure authentication methods

- #Authentication *verifies identity using credentials*. 
	- Azure supports various methods, balancing security and convenience.

## Authentication Methods & Levels

*   **Passwords:** High convenience, low security.
*   **SSO + MFA:** High security, low convenience.
*   **Passwordless:** High security, high convenience.

## What's Single Sign-On (SSO)?

- #SSO *allows a single sign-in to access multiple applications from different providers*. 
- It simplifies identity management by tying access to a single identity, reducing password fatigue and IT support burden. 
- However, SSO's security is limited by the initial authenticator's strength.

## What's Multifactor Authentication (MFA)?

- #MFA requires *two or more identification factors* (something you `know`, `have`, or `are`) *for sign-in*, significantly increasing security by protecting against compromised passwords.
- Examples include phone codes or biometrics.
*   **Microsoft Entra MFA**: A Microsoft service enabling users to choose additional authentication forms like phone calls or mobile app notifications.

## What's Passwordless Authentication?

- #Passwordless methods *remove passwords, replacing them with* a combination of "something you *have*" and "something you *know/are*" for enhanced convenience and security. 
- **Once a device is registered, authentication can occur via PIN or fingerprint without a password.**
- Azure offers these` passwordless options`:
	*   Windows Hello for Business
	*   Microsoft Authenticator app
	*   FIDO2 security keys

### Windows Hello for Business

*   **Ideal for**: Information workers with dedicated Windows PCs.
*   **How it works**: Biometric and PIN credentials are tied to the user's PC, ensuring owner-only access.
*   **Benefits**: Offers PKI integration and SSO for convenient access to on-premises and cloud resources.

### Microsoft Authenticator App

*   **Ideal for**: Employees using iOS or Android phones.
*   **How it works**: Turns a phone into a passwordless credential. Users receive a notification, match a displayed number, and confirm with biometrics (touch/face) or PIN.
*   **Benefits**: Provides a strong, passwordless authentication method for platforms and browsers.

### FIDO2 Security Keys

*   **Ideal for**: Users seeking an unphishable, standards-based passwordless method.
*   **How it works**: Uses FIDO (Fast IDentity Online) standards, including WebAuthn. 
	* Authentication is done via `external security keys (USB, Bluetooth, NFC) or built-in platform keys.`
*   **Benefits**: Increases account security by eliminating passwords that can be exposed or guessed. Users register and select the FIDO2 key at the sign-in interface.



# U4: Describe Azure External Identities

- #External_identities are *users, devices, or services outside your organization.* 
- Microsoft Entra External ID provides secure ways to interact with these external entities, enabling `collaboration with partners` and managing `customer identity experiences for consumer-facing apps.`
- External identities allow users to `"bring their own identities" `(**corporate, government, or social like Google/Facebook**). 
- Their` identity provider manages their identity`, while `you manage access to your apps using Microsoft Entra ID or Azure AD B2C.`
  
![Diagram showing B2B collaborators accessing your tenant and B2C collaborators accessing the AD B2C tenant.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-azure-identity-access-security/media/azure-active-directory-external-identities-5a892021-ca79a69c.png)


## Capabilities of External Identities:

*   **Business to Business (B2B) Collaboration**:
    *   Allows external users to sign in to your Microsoft or enterprise applications using their preferred identity.
    *   `B2B collaboration users appear as guest users` in your directory.

*   **B2B Direct Connect**:
    *   Establishes `mutual, two-way trust with other Microsoft Entra organizations` for seamless collaboration.
    *   Currently supports Teams shared channels for accessing resources within the user's home Teams instance.
    *   B2B direct connect users are not in your directory but are visible in Teams shared channels and can be monitored.

*   **Microsoft Azure Active Directory Business to Customer (B2C)**:
    *   For publishing modern SaaS or custom-developed apps (excluding Microsoft apps) to consumers.
    *   Uses Azure AD B2C for identity and access management.
    * **This service was retired and replace by Microsoft Entra External ID**

---



# U5: Describe Azure Conditional Access

- #Conditional_Access is a Microsoft Entra ID tool that `uses identity signals (user, location, device) `to **allow or deny access** to resources.
- It offers a more granular MFA experience.

## Conditional Access Flow

1.  **Signal Collection**: Gathers information about the user, their location, device, and the application being accessed.
2.  **Decision Making**: Based on signals, it decides whether to grant full access, block access, or require MFA.
    *   Example: Access granted from a usual location; access blocked or MFA required from an unusual location.
3.  **Enforcement**: Executes the decision by allowing access or prompting for MFA.


![Diagram showing the conditional access flow of a signal leading to a decision, leading to enforcement.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-azure-identity-access-security/media/conditional-access-9bd268b8-757297cb.png)


## Use Conditional Access When You Need To:

*   **Require MFA**: Based on user role, location, or network (e.g., MFA for admins, or for users outside the corporate network).
*   **Approved Client Applications**: Ensure access to services only through specific, approved applications.
*   **Managed Devices**: Restrict application access to devices meeting security and compliance standards.
*   **Block Untrusted Sources**: Deny access from unknown or unexpected locations.

---



# U6: Describe Azure Role-Based Access Control (Azure RBAC)

- #Azure_RBAC implements the **principle of least privilege**, granting users only the necessary access to complete tasks.
- It simplifies permission management for teams by `assigning roles instead of individual permissions.`

## How Azure RBAC Works:

*   **Built-in and Custom Roles**: Azure provides predefined roles (e.g., Owner, Reader) and allows you to create custom roles.
*   **Permissions**: Each role has a set of associated access permissions. Assigning a user or group to a role grants them these permissions.
*   **Inheritance**: Permissions are inherited hierarchically. Access granted at a parent scope (management group, subscription, resource group) applies to all child scopes.

![A diagram showing scopes and roles. Role and scope combinations map to a specific kind of user or account, such as an observer or an admin.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-azure-identity-access-security/media/role-based-access-scope-4b12a8f3-7f40fc55.png)


## Role Assignment Scopes:

- RBAC is applied to a **scope**, which is a resource or set of resources. Scopes include:
	*   Management Group
	*   Subscription
	*   Resource Group
	*   Single Resource

## How Azure RBAC is Enforced:

*   Enforced by **Azure Resource Manager** for any actions against Azure resources (via Azure portal, Cloud Shell, PowerShell, CLI).
*   **Allow Model**: You are granted permissions based on role assignments. 
	* If multiple assignments grant permissions, you have the combined permissions.
 
  >**Note**
   Azure RBAC does not enforce access at the application or data level; application security must be handled by the application itself.

---




# Describe Zero Trust Model

- #Zero_Trust is a *security model that **assumes breach** and verifies every request as if it originates from an uncontrolled network.* 
- It's designed for modern environments with mobile workforces, protecting people, devices, applications, and data regardless of location.

## Guiding Principles of Zero Trust:

1.  **Verify Explicitly**: Always authenticate and authorize based on all available data points.
2.  **Use Least Privilege Access**: Limit user access with `Just-In-Time and Just-Enough-Access (JIT/JEA)`, risk-based adaptive policies, and data protection.
3.  **Assume Breach**: Minimize blast radius, segment access, use end-to-end encryption, and leverage analytics for visibility, threat detection, and defense improvement.

## Shifting from Traditional Security:

*   **Traditional Model**:` Assumed the corporate network was safe`, with restricted access and managed devices.
*   **Zero Trust Model**: Flips this by requiring **everyone to authenticate** regardless of network location, granting access based on authentication rather than just network presence.

![Diagram comparing Zero Trust authenticating everyone compared to classic relying on network location.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-azure-identity-access-security/media/zero-trust-cf9202be-d5c6882e.png)


---



# U8: Describe Defense-in-Depth

> #Defense-in-depth is a *security strategy* that uses *multiple, layered mechanisms* to *protect information and slow down attacks, preventing unauthorized access*. It relies on a series of defenses so that *if one layer is breached, subsequent layers provide continued protection.*

## Layers of Defense-in-Depth:

The model visualizes layers from the center outwards:

1.  **Data**: Business and customer data to be protected.
2.  **Application**: Secure applications free of vulnerabilities.
3.  **Compute**: Secures access to virtual machines and ensures systems are patched and secure.
4.  **Network**: Limits communication between resources through segmentation and access controls, denying by default.
5.  **(Network) Perimeter**: Protects from network-based attacks using DDoS protection and firewalls.
6.  **Identity & Access**: Controls access to infrastructure and changes, using SSO, MFA, and logging.
7.  **Physical Security**: Protects computing hardware in datacenters.
  
![A diagram showing the defense in depth layers. From the center: data, application, compute, network, perimeter, identity & access, physical security.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-azure-identity-access-security/media/defense-depth-486afc12-71a03f12.png)

- Azure provides security tools and features for each layer.

---



# U9: Describe Microsoft Defender for Cloud

> #Microsoft_Defender_for_Cloud is a **monitoring tool** for *security posture management and threat protection*, `overseeing cloud, on-premises, hybrid, and multicloud environments` to enhance security posture.

## Key Features

- **Easy Deployment**: Natively integrated with Azure, many services are monitored without additional deployment.
- **Log Analytics Agent**: Automatically deployed to gather security data when necessary.
- **Azure Arc**: Extends Defender for Cloud capabilities to non-Azure machines.

## Azure-Native Protections

Defender for Cloud detects threats across:

1. **Azure PaaS Services**: Monitors Azure services like App Service, SQL, and Storage, with anomaly detection via `Microsoft Defender for Cloud Apps.`
2. **Azure Data Services**: Automatically classifies data in Azure SQL and assesses vulnerabilities with mitigation recommendations.
3. **Networks**: Limits exposure to brute force attacks by reducing access to VM ports and implementing secure access policies.

## Defend Hybrid Resources

- **Hybrid Cloud Protection**: Extend Defender for Cloud capabilities to non-Azure servers using Azure Arc for customized threat intelligence and prioritized alerts.

## Defend Resources in Other Clouds

- **Multicloud Protection**: Defender for Cloud can protect resources in AWS and GCP, assessing AWS resources for compliance with specific security standards.
- **Microsoft Defender for Containers**: Provides threat detection for Amazon EKS Linux clusters.
- **Microsoft Defender for Servers**: Offers threat detection for Windows and Linux EC2 instances.

## Assess, Secure, and Defend

Defender for Cloud addresses three vital needs:

1. **Continuously Assess**: Track vulnerabilities and security posture.
2. **Secure**: Harden resources with Azure Security Benchmark.
3. **Defend**: Detect and resolve threats to resources and services.

### Continuous Assessment

- Defender for Cloud includes vulnerability assessment solutions for virtual machines, container registries, and SQL servers, with integration to Microsoft Defender for Endpoint for comprehensive vulnerability management.
- Regular scans provide detailed insights into your compute, data, and infrastructure security, allowing for timely responses to vulnerabilities.

### Secure

*   **Security Policies**: Leverages `Azure Policy` for flexible policy creation across management groups, subscriptions, or tenants.
*   **Resource Monitoring**: Continuously assesses newly deployed resources against security best practices, flagging misconfigurations and providing prioritized recommendations.
*   **Azure Security Benchmark**: Recommendations are guided by this Microsoft-authored benchmark, which provides security and compliance best practices.
*   **Secure Score**: Groups recommendations into security controls and assigns a **secure score** to indicate overall security posture health.

### Defend

*   **Security Alerts**: Generates alerts when threats are detected, providing details on affected resources, remediation steps, and optional logic app triggers.
*   **Advanced Threat Protection**:
    *   **Fusion Kill-Chain Analysis**: Correlates alerts to provide a comprehensive understanding of attack campaigns.
    *   **Resource Protection**: Offers advanced threat protection for VMs, SQL databases, containers, web applications, and networks.
    *   **Just-in-Time VM Access**: Secures VM management ports by limiting access.
    *   **Adaptive Application Controls**: Creates allowlists for applications that can run on machines.

