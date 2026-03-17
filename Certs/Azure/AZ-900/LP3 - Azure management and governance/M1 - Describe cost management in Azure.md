

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

- =====================> [Continue from here](https://learn.microsoft.com/en-us/training/modules/describe-cost-management-azure/3-compare-pricing-total-cost-of-ownership-calculators/)

