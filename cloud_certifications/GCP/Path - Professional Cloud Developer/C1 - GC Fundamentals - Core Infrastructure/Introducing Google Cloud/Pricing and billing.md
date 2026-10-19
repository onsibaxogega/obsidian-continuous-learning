
# Google Cloud Pricing and Billing

Google was the first major cloud provider to deliver per-second billing for its IaaS compute offering, Compute Engine.

## Per-second billing services

- compute engine
- google kubernetes engine (container IaaS)
- managed service for apache spark (equivalent of Hadoop, operating as a service)
- app engine flexible environment VMs (PaaS)

## Cost optimization features

- **Sustained-use discounts** — automatic discounts applied when running a virtual machine instance for a significant portion of the billing month. When you run an instance for more than 25% of a month, Compute Engine automatically gives you a discount for every incremental minute used.
- **Custom virtual machine types** — Compute Engine VMs can be fine-tuned with optimal amounts of vCPU and memory, allowing you to tailor pricing for your workloads.
- **Online pricing calculator** — estimate costs at [cloud.google.com/products/calculator](https://cloud.google.com/products/calculator).

## Budget and alerts

- budgets can be defined at the **billing account level** or the **project level**
- a budget can be a fixed limit or tied to another metric (e.g., a percentage of the previous month's spend)
- alerts notify you when costs approach your budget limit
- alerts are generally set at 50%, 90%, and 100%, but can be customized
- example: with a $20,000 budget and an alert at 90%, you receive a notification when expenses reach $18,000

## Expenditure monitoring

**Reports** is a visual tool in the Google Cloud console that allows you to monitor expenditure based on a project or services.

## Quotas

Quotas prevent over-consumption of resources due to errors or malicious attacks, protecting both account owners and the Google Cloud community. Both quota types are applied at the project level.

| Quota type        | Description                                                  | Example                                                                             |
| ----------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| Rate quotas       | reset after a specific time                                  | by default, GKE implements a quota of 3,000 API calls per project every 100 seconds |
| Allocation quotas | govern the number of resources you can have in your projects | by default, each project allows no more than 15 Virtual Private Cloud networks      |

Projects all start with the same quotas, but some can be changed by requesting an increase from Google Cloud Support.
