

# U1: Introduction

- In this module, you’ll be introduced to factors that impact costs in Azure and tools to help you both predict potential costs and monitor and control costs.

## Learning objectives

- After completing this module, you’ll be able to:
	- [ ] Describe factors that can affect costs in Azure.
	- [ ] Compare the Pricing calculator and Total Cost of Ownership (TCO) calculator.
	- [ ] Describe the Microsoft Cost Management Tool.
	- [ ] Describe the purpose of tags.

---


# U2: Describe Factors That Can Affect Costs in Azure

- Azure transitions development costs from **capital expense (CapEx)** to **operational expense (OpEx)**, allowing you to rent infrastructure as needed. 
- Several factors can impact these OpEx costs:
	1. **Resource Type**
	2. **Consumption**
	3. **Maintenance**
	4. **Geography**
	5. **Subscription Type**
	6. **Azure Marketplace**

## Resource Type

The cost of Azure resources is influenced by:
- **Resource**: Different resources have varying costs, and same resource cost can vary based on settings and region.
- **Metered Instances**: 
	- When you provision an Azure resource, Azure creates metered instances for that resource.
	- Meters track the resources' usage and generate a usage record that is used to calculate your bill.

### Examples:
- **Storage Account**: Costs vary by type (blob), performance tier, access tier, redundancy settings, and region.
- **Virtual Machine (VM)**: Consider OS licensing, processor cores, attached storage, and network interface. Costs differ by region.

## Consumption
- Azure follows a **pay-as-you-go** model, where you pay for resources used during a billing cycle. 
- You can also reserve resources in advance for discounts (up to **72%**). This allows flexibility to scale as needed while saving on consistent workloads.

## Maintenance
- Maintaining your cloud environment is crucial for cost control.
- Resources provisioned with a VM (like storage and networking) may not deprovision automatically. 
- Regularly review resources to avoid unnecessary costs.

## Geography
- Resource costs vary by region due to `differences in power, labor, taxes, and fees.` `Network traffic costs also differ`; for example, moving data within Europe is cheaper than between continents.

## Network Traffic
- **Bandwidth**: Costs are based on data movement in and out of Azure datacenters.
- **Inbound Transfers**: Some are free.
- **Outbound Transfers**: Priced based on geographical zones.

## Subscription Type
- Different Azure subscriptions may include usage allowances affecting costs. 
	- For instance, a **free trial** provides access to several products for **12 months** and includes initial credits.

## Azure Marketplace
- Azure Marketplace allows purchasing Azure-based solutions from third-party vendors. 
- Costs may include both Azure services and vendor services. All solutions are certified and compliant with Azure policies.

---



# U3: Explore the pricing calculator

- The #pricing_calculator helps you understand potential Azure expenses and is accessible online. 
- The **Total Cost of Ownership (TCO)** calculator has been retired.

## Pricing Calculator

The pricing calculator provides estimated costs for provisioning resources in Azure. You can:

1. Estimate costs for individual resources.
2. Build out a solution to get its cost estimate
3. Use example scenarios to see estimated Azure spend.

### Note

- The pricing calculator is for **information purposes only**. 
- Prices are estimates; no resources are provisioned, and you won't be charged for selected services.

- With the pricing calculator, you can estimate costs for:
	- **Compute**
	- **Storage**
	- **Associated network costs**

- You can also account for different storage options, including `storage type, access tier, and redundancy.`

![Screenshot of the pricing calculator for reference.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-cost-management-azure/media/price-calculator-0a750ac3.png)


---



# U4: Exercise - Estimate Workload Costs by Using the Pricing Calculator

In this exercise, you use the **Pricing calculator** to estimate the cost of running a basic web application on Azure.

## Define Your Requirements
Before using the Pricing calculator, identify the Azure services needed for a basic web application, such as:
- An **ASP.NET web application** running on Windows.
- Two **virtual machines** connected through a central load balancer.
- An **Azure SQL Database** for inventory and pricing information.

### Basic Facts and Requirements:
- The application is **internal** and not accessible to customers.
- It requires minimal computing power.
- Virtual machines and the database run **24/7** (730 hours/month).
- The network processes about **1 TB** of data/month.
- The database requires no more than **32 GB** of storage.

## Explore the Pricing Calculator
- Navigate to the Pricing calculator and notice the following tabs:
	- **Products**: Choose Azure services for your estimate.
	- **Example Scenarios**: Reference architectures for common solutions.
	- **Saved Estimates**: Access previously saved estimates.
	- **FAQs**: Answers to common questions about the Pricing calculator.

## Estimate Your Solution
- **Add Services**: Select services from the Products tab:
   - **Compute**: Virtual Machines
   - **Databases**: Azure SQL Database
   - **Networking**: Application Gateway
- **Configure the Services**

## Review, Share, and Save Your Estimate
- At the bottom, view the total estimated cost. Options include:
	- **Export**: Save as an Excel document.
	- **Save**: Store in the Saved Estimates tab.
	- **Share**: Generate a URL to share with your team.

- You now have a cost estimate to share and adjust as needed for your Azure workload.

---




# U5: Describe the Microsoft Cost Management Tool

- #Cost_Management is a built-in *suite of FinOps tools* that helps organizations *monitor, allocate, and optimize cloud spending*
- It includes the following tools among others:
	- **Cost Analysis**
		- for visualization & ad-hoc exploration, 
	- **Budgets**
		- for threshold alerts, 
	- **Advisor**
		- for rightsizing recommendations



![Screenshot of initial view of cost analysis in the Azure portal.|697](https://learn.microsoft.com/en-us/training/wwl-azure/describe-cost-management-azure/media/cost-analysis-b52dedab.png)


## Cost Analysis

- #Cost_Analysis is a subset of Cost Management that *visually represents Azure costs*. It allows you to:
	- View total costs by billing cycle, region, resource, etc.
	- Analyze organizational costs to identify spending trends.
	- Estimate monthly, quarterly, or yearly costs against a budget.

## Cost Alerts
Cost alerts provide a centralized view of different alert types:
1. **Budget Alerts**: Notify when spending exceeds defined budget conditions. Budgets can be created in the Azure portal or via the Azure Consumption API.
2. **Credit Alerts**: Notify when Azure credit commitments are consumed, generated at 90% and 100% of the credit balance.
3. **Department Spending Quota Alerts**: Notify when department spending reaches a set threshold, configured in the EA portal.

## Budgets
- A budget sets a spending limit for Azure based on:
	- Subscription
	- Resource group
	- Service type
- When a budget threshold is reached, a budget alert is triggered, which can also send email notifications. 
- Advanced budget conditions can trigger automation to suspend or modify resources when thresholds are met.

---



# U6: Describe the Purpose of Tags

- As cloud usage grows, #resource_tags are essential for *organizing related resources* and *managing costs*. 
	- Tags provide **metadata** about resources, aiding in various aspects of cloud management.

## Key Purposes of Tags:

1.  **Resource Management**: Locate and act on resources by workload, environment, business unit, or owner.
2.  **Cost Management & Optimization**: Group resources for cost reporting, internal cost allocation, budget tracking, and cost forecasting.
3.  **Operations Management**: Group resources by criticality to define Service-Level Agreements (SLAs).
4.  **Security**: Classify data by security level (e.g., public, confidential).
5.  **Governance & Regulatory Compliance**: Identify resources that align with compliance requirements (e.g., ISO 27001) and enforce standards (e.g., requiring owner or department tags).
6.  **Workload Optimization & Automation**: Visualize resources in complex deployments and automate tasks using software like Azure DevOps.

## Managing Resource Tags:

- Tags can be added, modified, or deleted via PowerShell, Azure CLI, ARM templates, REST API, or the Azure portal.
- **Azure Policy** can enforce tagging rules and conventions, requiring specific tags or reapplying removed ones.
- Tags do not inherit from subscriptions or resource groups, allowing for custom tagging schemas at different levels.

## Tagging Structure:

A resource tag consists of a **Name** and a **Value**. You can assign multiple tags to a resource.

### Example Tag Structure:

| Name        | Value                                            |
| :---------- | :----------------------------------------------- |
| AppName     | Name of the application the resource belongs to. |
| CostCenter  | Internal cost center code.                       |
| Owner       | Business owner responsible for the resource.     |
| Environment | Environment name (e.g., "Prod," "Dev," "Test").  |
| Impact      | Resource importance (e.g., "Mission-critical").  |

>`Note`: 
Tagging is flexible; you don't need to enforce specific tags on all resources. For instance, the "Impact" tag might only be applied to mission-critical resources.




