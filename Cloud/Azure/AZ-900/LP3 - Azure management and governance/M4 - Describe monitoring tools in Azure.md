
# U1: # Introduction

- In this module, you’ll be introduced to tools that help you monitor your environment and applications, both in Azure and in on-premises or multicloud environments.

## Learning objectives

- After completing this module, you’ll be able to:
	- [ ] Describe the purpose of Azure Advisor.
	- [ ] Describe Azure Service Health.
	- [ ] Describe Azure Monitor, including Azure Log Analytics, Azure Monitor Alerts, and Application Insights.

---



# U2: Describe the Purpose of Azure Advisor

- **Azure Advisor** *analyzes your Azure resources and provides **personalized recommendations** to optimize your cloud environment*. 
  
![Screenshot of the Azure Advisor dashboard with boxes for the main areas of recommendations.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-monitoring-tools-azure/media/azure-advisor-dashboard-baca22e2.png)


- It helps improve:
	-   **Reliability**: Ensure and improve the continuity of business-critical applications.
	-   **Security**: Detect threats and vulnerabilities to prevent security breaches.
	-   **Performance**: Enhance the speed of your applications.
	-   **Operational Excellence**: Achieve process efficiency, resource manageability, and deployment best practices.
	-   **Cost**: Optimize and reduce overall Azure spending.

## Key Features

-   **Personalized Recommendations**: Available via the Azure portal and API.
-   **Actionable Insights**: Suggestions include actions to take immediately, postpone, or dismiss.
-   **Notifications**: Set up alerts for new recommendations.
-   **Filtering**: Filter recommendations by subscription, resource group, or service.

---



# U3: Describe Azure Service Health

> **Azure Service Health** *provides a comprehensive view of the Azure infrastructure and your deployed resources*, combining three key services:

## Azure Status
*   Provides a **global overview** of the health of all Azure services across all regions.
*   Useful for identifying **widespread outages** and incidents.

## Service Health
*   Offers a **narrower view** focused on the Azure services and regions you actively use.
-   Best for information on **outages, planned maintenance, and health advisories** affecting your specific environment.
*   Allows for **Service Health alerts** to notify you of potential impacts.

## Resource Health
*   Provides a **tailored view** of the health of your **individual Azure resources** (e.g., a specific virtual machine).
-   Can be configured with **Azure Monitor alerts** for availability changes.

- By integrating these three services, Azure Service Health offers a complete picture from global Azure status down to specific resource health.
- It also provides access to **historical alerts** for review and links to support in case of workload impact.

---



# U4: Describe Azure Monitor

- **Azure Monitor** is a *platform for collecting, analyzing, visualizing, and acting* on data about your *Azure, on-premises, and multi-cloud resources*. 
- It provides comprehensive monitoring across all layers of your application architecture.

## Key Components and Capabilities

1.  **Data Collection**: Gathers logging and metric data from various sources, including applications, operating systems, and networks.
2.  **Centralized Repositories**: Stores collected data for analysis.
3.  **Data Utilization**:
    *   **Real-time and Historical Performance**: View performance across different architecture layers.
    -   **Reporting**: High-level reports on the Azure Monitor Dashboard or custom views using Power BI and Kusto queries.
    -   **Alerting**: React to critical events in real-time via SMS, email, etc.
    -   **Autoscaling**: Trigger autoscaling functionality based on thresholds.

- The following diagram illustrates just how comprehensive Azure Monitor is:
![An illustration showing the flow of information that Azure Monitor uses to provide monitoring and data visualization.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-monitoring-tools-azure/media/azure-monitor-overview-614cd2fd.svg)


- The following all included under Azure Monitor:


### Azure Log Analytics
-   A tool within the Azure portal for writing and running **log queries**.
-   Supports **simple and complex queries**, data analysis, statistical analysis, and visualization.
-   Used interactively or with other Azure Monitor features like log query alerts and workbooks.

### Azure Monitor Alerts
-   **Automated notifications** when thresholds are crossed.
-   Configurable `alert conditions, notification actions, and potential corrective actions`.
-   Alerts can be based on **logs** (complex logic across multiple sources) or **metrics** (near real-time alerts on numeric values, e.g., CPU usage > 80%).
-   Uses **Action Groups** to define notification recipients and actions, shared across Azure Monitor, Service Health, and Azure Advisor.
  
![Screenshot of Azure Monitor Alerts showing total alerts, and then the alerts grouped by severity.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-monitoring-tools-azure/media/azure-monitor-alerts-2478e941.png)


### Application Insights
-   An Azure Monitor feature that **monitors web applications** running in Azure, on-premises, or other cloud environments.
-   Configured by installing an **SDK** or using the **Application Insights agent**.
	- The Application Insights agent is supported in C#.NET, VB.NET, Java, JavaScript, Node.js, and Python.
-   Monitors:
    -   Request rates, response times, and failure rates.
    -   Dependency rates, response times, and failure rates.
    -   Page views and load performance.
    -   AJAX calls.
    -   User and session counts.
    -   Server performance counters (CPU, memory, network).
-   Can send **synthetic requests** to check application status even during low activity periods.

