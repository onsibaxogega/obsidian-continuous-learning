
# Google Cloud Network and Infrastructure

Google Cloud runs on Google's own global network — the largest of its kind, built through billions of dollars of investment over many years. The network is designed to deliver the highest possible throughput and lowest possible latencies by leveraging more than 100 content caching nodes worldwide.

## Content caching nodes

Content caching nodes are locations where high-demand content is cached for quicker access. They allow applications to respond to user requests from the location that provides the quickest response time.

## Geographic locations

Google Cloud's infrastructure is based in seven major geographic locations:

- north america
- south america
- europe
- africa
- the middle east
- asia
- australia

Choosing where to locate applications affects three key qualities:

- **availability** — whether the service is up and reachable
- **durability** — whether data is preserved over time
- **latency** — the time a packet of information takes to travel from its source to its destination

## Regions and zones

- **Region** — an independent geographic area composed of zones. Example: London, or `europe-west2`, is a region currently comprising three zones.
- **Zone** — an area where Google Cloud resources are deployed. Launching a virtual machine using Compute Engine, for example, requires specifying a zone to ensure resource redundancy.

Running resources in different regions is useful for:

- bringing applications closer to users around the world
- protection in case there are issues with an entire region, such as a natural disaster

## Multi-region

Some Google Cloud services support placing resources in a multi-region. For example, Spanner multi-region configurations allow you to replicate a database's data across multiple zones in multiple regions.

These additional replicas enable low-latency reads from multiple locations close to or within the configured regions (e.g., the Netherlands and Belgium).

## Further reading

The number of zones and regions is increasing all the time. Up-to-date numbers can be found at [cloud.google.com/about/locations](https://cloud.google.com/about/locations).
