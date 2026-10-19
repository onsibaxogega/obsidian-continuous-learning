
# Lab Summary — VPC Networking & Compute Engine

> This lab demonstrated that `VPC is the foundational networking prerequisite` in Google Cloud — without it, you cannot create VMs, containers, or App Engine applications. You explored the default network, recreated it, and systematically proved how `firewall rules are the gatekeepers` of all connectivity.


---


## What Was Covered

- **explored the default VPC network** — examined its subnets (one per region), routes (one per subnet, auto-managed), and the four default ingress firewall rules (`allow-icmp`, `allow-rdp`, `allow-ssh`, `allow-internal`)
- **proved that VPC is required** — deleted the default network and confirmed that Compute Engine throws a `"no more networks"` error when you try to create a VM without a VPC
- **recreated the network as auto mode** — created `mynetwork` with automatic subnet creation (one subnet per region) and all standard firewall rules
- **created two VMs in different regions** — `mynet-us-vm` and `mynet-r2-vm`, both `e2-micro` instances on the `mynetwork` VPC, to test cross-region connectivity
- **tested connectivity with all rules active** — confirmed SSH works (via `allow-ssh`), internal ping works (via `allow-custom`), and external ping works (via `allow-icmp`)
- **progressively deleted firewall rules** to observe the impact on connectivity:


---


## Firewall Deletion Experiment

| Rules Remaining | SSH | Ping Internal IP | Ping External IP |
| :--- | :--- | :--- | :--- |
| all rules active | ✅ | ✅ | ✅ |
| after removing `allow-icmp` | ✅ | ✅ | ❌ |
| after removing `allow-custom` | ✅ | ❌ | ❌ |
| after removing `allow-ssh` | ❌ | ❌ | ❌ |

- **`allow-icmp`** controlled ICMP from `outside` the network (`0.0.0.0/0`) — removing it broke external pings but internal pings still worked via `allow-custom`
- **`allow-custom`** controlled all traffic `within` the network (`10.128.0.0/9`) — removing it broke internal pings entirely
- **`allow-ssh`** controlled SSH from `anywhere` (`0.0.0.0/0`) — removing it made the VM completely unreachable


---


## Key Concepts Reinforced

- **no VPC = no VMs** — VPC is a hard prerequisite, not optional
- **auto mode networks** create subnets in every region automatically — a quick way to rebuild if the default network is deleted
- **every VPC has two implied rules** — `deny-all-ingress` and `allow-all-egress` — explicit allow rules override deny-all because they have `higher priority` (lower integer)
- **internal vs. external rules are separate** — `allow-custom` handles intra-VPC traffic; `allow-icmp`/`allow-ssh` handle traffic from `0.0.0.0/0`
- **ephemeral external IPs** are released on VM stop and reassigned on start — use `static IPs` for consistent addressing
- **firewall rule priority** — lower integer = higher priority; explicit allow rules are evaluated before the implied deny-all-ingress
