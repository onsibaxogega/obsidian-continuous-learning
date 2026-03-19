

# U1: Introduction

- In this module, you’ll be introduced to the Azure storage services. 
- You’ll learn about the Azure Storage Account and how that relates to the different storage services that are available.
- You’ll also learn about blob storage tiers, data redundancy options, and ways to move data or even entire infrastructures to Azure.

## Learning objectives

After completing this module, you’ll be able to:

- [ ] Compare Azure storage services.
- [ ] Describe storage tiers.
- [ ] Describe redundancy options.
- [ ] Describe storage account options and storage types.
- [ ] Identify options for moving files, including AzCopy, Azure Storage Explorer, and Azure File Sync.
- [ ] Describe migration options, including Azure Migrate and Azure Data Box.

---



# U2: Describe Azure storage accounts

> An #Azure_Storage_account is a globally accessible, highly scalable, and secure *cloud storage service* that *provides a unique namespace for your data*, `supporting` various types of storage like *blobs, files, queues, and tables with configurable redundancy options.*

- You choose a **storage** **account type**, which dictates supported services, **redundancy options**, and use cases.
## Storage Account Types

| **Type**                        | **Supported services**                                | **Redundancy Options**               | **Usage**                                                                                                                                                                                                                                       |
| ------------------------------- | ----------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Standard general-purpose v2** | Blob (including Data Lake), Queue, Table, Azure Files | LRS, GRS, RA-GRS, ZRS, GZRS, RA-GZRS | `Most common.` For general use of blobs, file shares, queues, and tables. Use premium file shares for NFS                                                                                                                                       |
| **Premium block blobs**         | Blob Storage (including Data Lake Storage)            | LRS, ZRS                             | Premium storage account type for block blobs and append blobs.<br>Recommended for scenarios with high transaction rates or that use smaller objects or require consistently low storage latency.                                                |
| **Premium file shares**         | Azure Files                                           | LRS, ZRS                             | Premium storage account type for file shares only.<br>Recommended for enterprise or high-performance scale applications. Use this account type if you want a storage account that supports both Server Message Block (SMB) and NFS file shares. |
| **Premium page blobs**          | Page blobs only                                       | LRS                                  | Premium storage account type for page blobs only.                                                                                                                                                                                               |

> A **container** in an Azure storage account *organizes sets of blobs (files)*, acting like a directory in a file system to store data such as images, videos, or text. 
- A single storage account can hold an unlimited number of containers, each holding an unlimited number of blobs, forming part of the unique URI for accessing that data.
- A container name must be a valid DNS name, as it forms part of the unique URI (Uniform resource identifier) used to address the container or its blobs.
- They cannot be nested within each other.

## Storage account endpoints

- Each storage account needs a **unique name** (3-24 lowercase letters/numbers) within Azure.
- This name, combined with the service endpoint, forms your data access URL.

- The following table shows the endpoint format for Azure Storage services:

| **Storage Service**    | **Endpoint Format**                                     |
| ---------------------- | ------------------------------------------------------- |
| Blob Storage           | `https://<storage-account-name>.blob.core.windows.net`  |
| Data Lake Storage Gen2 | `https://<storage-account-name>.dfs.core.windows.net`   |
| Azure Files            | `https://<storage-account-name>.file.core.windows.net`  |
| Queue Storage          | `https://<storage-account-name>.queue.core.windows.net` |
| Table Storage          | `https://<storage-account-name>.table.core.windows.net` |

---



# U3: Describe Azure storage redundancy

- Azure Storage always *stores multiple copies of your data* ( #reduncancy ) to ensure that your storage account meets its availability and durability targets even in the face of failures.
- When deciding which redundancy option is best for your scenario, consider the tradeoffs between lower costs and higher availability. 

### Factors to consider to determine redundancy option

- How your data is replicated in the primary region.
- Whether your data is replicated to a second region that is geographically distant to the primary region, to protect against regional disasters.
- Whether your application requires read access to the replicated data in the secondary region if the primary region becomes unavailable.


## Redundancy in the primary region

- Data in an Azure Storage account is `always replicated three times in the primary region. `
- Azure Storage offers `two options for how your data is replicated in the primary region:`
	- locally redundant storage (LRS) 
	- zone-redundant storage (ZRS).

### Locally redundant storage

- #locally_redundant_storage (LRS) replicates your data *three times within a single data center in the primary region.*
- LRS provides at least `11 nines of durability` (99.999999999%) of objects` over a given year.`

![Diagram showing the structure used for locally redundant storage.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-azure-storage-services/media/locally-redundant-storage.png)

- LRS is the `lowest-cost redundancy option `
- offers the least durability compared to other options.
- LRS protects your data against `server rack and drive failures. `
- However, if a disaster such as fire or flooding occurs within the data center, all replicas of a storage account using LRS may be lost or unrecoverable:
	- To mitigate this risk, Microsoft recommends using zone-redundant storage (ZRS), geo-redundant storage (GRS), or geo-zone-redundant storage (GZRS).

### Zone-redundant storage

- For Availability Zone-enabled Regions, #zone-redundant_storage (ZRS) *replicates your Azure Storage data synchronously across three Azure availability zones in the primary region.* 
- ZRS offers durability for Azure Storage data objects of at least `12 nines` (99.9999999999%) over a given year.

![Diagram showing ZRS, with a copy of data stored in each of three availability zones.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-azure-storage-services/media/zone-redundant-storage.png)

- With ZRS, your data is still accessible for both read and write operations even if a zone becomes unavailable. 
- No remounting of Azure file shares from the connected clients is required.
	- If a zone becomes unavailable, Azure undertakes networking updates, such as DNS repointing.
- These updates may affect your application if you access data before the updates have completed.
- Microsoft `recommends` using ZRS `in the primary region for scenarios that require high availability. `
- ZRS is also `recommended` for `restricting replication of data within a country or region to meet data governance requirements.`


## Redundancy in a secondary region

- `For applications requiring high durability`, you can choose to `additionally copy` the data in your storage account to a` secondary region that is hundreds of miles away` from the primary region. 
- If the data in your storage account is copied to a secondary region, then your data is durable even `in the event of a catastrophic failure that prevents the data in the primary region from being recovered.`
- When you create a storage account, you select the primary region for the account. 
	- The paired `secondary region is based on Azure Region Pairs, and can't be changed.`
- Azure Storage offers` two options for copying your data to a secondary region: `
	- #geo-redundant_storage (GRS) - *similar to running LRS in two regions*
	- #geo-zone-redundant_storage (GZRS) - *similar to running ZRS in the primary region and LRS in the secondary region.*


- **By default, data in the secondary region isn't available for read or write access unless there's a failover to the secondary region.** 
- If the primary region becomes unavailable, you can choose to fail over to the secondary region. 
	- After the failover has completed, the secondary region becomes the primary region, and you can again read and write data.

 >`Note`
	Because `data is replicated to the secondary region asynchronously`, a `failure that affects the primary region` may result in `data loss if the primary region can't be recovered. `
		*The interval between the most recent writes to the primary region and the last write to the secondary region is known as the* #recovery_point_objective (RPO). *The RPO indicates the point in time to which data can be recovered.* 
		 Azure Storage typically has an RPO of less than 15 minutes, although there's currently no SLA on how long it takes to replicate data to the secondary region.


### Geo-redundant storage

- GRS `copies your data synchronously three times within a single physical location in the primary region using LRS.` 
- It then `copies your data asynchronously to a single physical location in the secondary region `(the region pair) `using LRS`. 
- GRS offers durability for Azure Storage data objects of `at least 16 nines `(99.99999999999999%) over a given year.

![Diagram showing GRS, with primary region LRS replicating data to LRS in a second region.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-azure-storage-services/media/geo-redundant-storage.png)

### Geo-zone-redundant storage

- GZRS combines the `high availability` provided by redundancy across availability zones with `protection from regional outages` provided by geo-replication.
- Data in a GZRS storage account is copied across three Azure availability zones in the `primary region (similar to ZRS) `
	- and is also replicated to a `secondary geographic region, using LRS`, for protection from regional disasters. 
- Microsoft `recommends` using GZRS `for applications requiring maximum consistency, durability, and availability, excellent performance, and resilience for disaster recovery`.

![Diagram showing GZRS, with primary region ZRS replicating data to LRS in a second region.](https://learn.microsoft.com/en-us/training/wwl-azure/describe-azure-storage-services/media/geo-zone-redundant-storage.png)

- GZRS is designed to provide at least `16 nines `(99.99999999999999%) of durability of objects over a given year.


### Read access to data in the secondary region

- If you` enable read access to the secondary region`, your `data is always available`, `even when the primary region is running optimally`. 
- For read access to the secondary region, enable:
	- **read-access geo-redundant storage** (`RA-GRS`) 
	- or **read-access geo-zone-redundant storage** (`RA-GZRS`).

 > `Note`
Remember that the **data in your secondary region may not be up-to-date due to RPO.**


---




# U4: Describe Azure storage services


- The Azure Storage platform includes the following `data services`:
	> #Azure_Blobs: A massively scalable *object store for text and binary data*. Also includes support for big data analytics through Data Lake Storage Gen2.
	#Azure_Files: Managed *file shares for cloud or on-premises deployments*.
	#Azure_Queues: A messaging store for reliable *messaging between application components.*
	#Azure_Disks: Block-level *storage volumes for Azure VMs*.
	#Azure_Tables: *NoSQL table option for structured, non-relational data*.



### Benefits of Azure Storage

It is:
#### Durable and highly available
- achieved by replication (LRS, ZRS, ...)
#### Secure 
- All data written to an Azure storage account is encrypted by the service.
- Azure Storage provides you with fine-grained control over who has access to your data.
#### Scalable
- Azure Storage is designed to be massively scalable to meet the data storage and performance needs of today's applications.
#### Managed
- Azure handles hardware maintenance, updates, and critical issues for you.
#### Accessible
- Data in Azure Storage is accessible from anywhere in the world over HTTP or HTTPS.
- Microsoft provides client libraries for Azure Storage in a variety of languages as well as a mature REST API. 
- Azure Storage supports scripting in Azure PowerShell or Azure CLI.
- And the Azure portal and Azure Storage Explorer offer easy visual solutions for working with your data.


## Azure Blobs

- Azure Blob storage is an `object storage solution` for the cloud. 
- It can store massive amounts of data, such as text or binary data. 
- Azure Blob storage is `unstructured`, meaning that there are no restrictions on the kinds of data it can hold.
- Blob storage can manage thousands of simultaneous uploads, massive amounts of video data, constantly growing log files, and can be reached from anywhere with an internet connection.
- Blobs aren't limited to common file formats. 
	- A blob could contain gigabytes of binary data streamed from a scientific instrument, an encrypted message for another application, or data in a custom format for an app you're developing. 
- One advantage of blob storage over disk storage is that it doesn't require developers to think about or manage disks. 
	-` Data is uploaded as blobs, and Azure takes care of the physical storage needs.`


### Blob storage is ideal for

- Serving` images or documents` directly to a browser.
- Storing `files for distributed access`.
- `Streaming video and audio`.
- Storing `data for backup and restore, disaster recovery, and archiving`.
- Storing `data for analysis` by an on-premises or Azure-hosted service.

### Accessing blob storage

- Objects in blob storage can be accessed from anywhere in the world via HTTP or HTTPS. 
- Users or client applications can access blobs via URLs, the Azure Storage REST API, Azure PowerShell, Azure CLI, or an Azure Storage client library. 
- The storage client libraries are available for multiple languages, including .NET, Java, Node.js, Python, PHP, and Ruby.

### Blob storage tiers

- Data stored in the cloud can grow at an exponential pace. 
- To manage costs for your expanding storage needs, it's helpful to `organize your data based on attributes like frequency of access and planned retention period`. 
- To accommodate these different access needs, Azure provides several access tiers, which you can use to balance your storage costs with your access needs.

#### Hot access tier
- Optimized for storing data that is *accessed frequently* (for example,` images for your website`).
#### Cool access tier
- Optimized for data that is *infrequently accessed and stored for at least 30 days* (for example, `invoices for your customers`).
#### Cold access tier
- Optimized for storing data that is *infrequently accessed and stored for at least 90 days*.
#### Archive access tier
- Appropriate for data that is *rarely accessed and stored for at least 180 days, with flexible latency requirements* (for example, `long-term backups`).


#### Access Tier Considerations

- `Hot, cool, and cold` access tiers can be `set at the account level`. 
	- The archive access tier isn't available at the account level.
- Hot, cool, cold, and `archive tiers can be set at the blob level, during or after upload`.
- Data in the cool and cold access tiers can tolerate slightly lower availability, but still requires high durability, retrieval latency, and throughput characteristics similar to hot data.
	- For cool and cold data, a `lower availability SLA` and `higher access costs compared to hot data` are acceptable trade-offs for lower storage costs.
- `Archive` storage `stores data offline` and offers the `lowest storage costs`, but also the `highest costs to rehydrate and access data`.

## Azure Files

- Azure File storage offers `fully managed file shares` in the cloud that are accessible via the industry standard Server Message Block (`SMB`) or Network File System (`NFS`) `protocols`. 
- Azure Files file shares can be mounted concurrently by cloud or on-premises deployments. 
- SMB Azure file shares are accessible from Windows, Linux, and macOS clients. 
- NFS Azure Files shares are accessible from Linux or macOS clients. 
- Additionally, SMB Azure file shares can be cached on Windows Servers with Azure File Sync for fast access near where the data is being used.

### Azure Files key benefits

- **Shared access**: Azure file shares support the industry standard SMB and NFS protocols, meaning you can seamlessly replace your on-premises file shares with Azure file shares without worrying about application compatibility.
- **Fully managed**: Azure file shares can be created without the need to manage hardware or an OS. This means you don't have to deal with patching the server OS with critical security upgrades or replacing faulty hard disks.
- **Scripting and tooling**: PowerShell cmdlets and Azure CLI can be used to create, mount, and manage Azure file shares as part of the administration of Azure applications. You can create and manage Azure file shares using Azure portal and Azure Storage Explorer.
- **Resiliency**: Azure Files has been built from the ground up to always be available. Replacing on-premises file shares with Azure Files means you don't have to wake up in the middle of the night to deal with local power outages or network issues.
- **Familiar programmability**: Applications running in Azure can access data in the share via file system I/O APIs. Developers can therefore use their existing code and skills to migrate existing applications. In addition to System IO APIs, you can use Azure Storage Client Libraries or the Azure Storage REST API.

## Azure Queues

- Azure Queue storage is a service for storing large numbers of messages. 
- Once stored, you can access the messages from anywhere in the world via authenticated calls using HTTP or HTTPS. 
- A queue can contain as many messages as your storage account has room for (potentially millions). 
- Each individual message can be up to 64 KB in size. 
- Queues are commonly used to create a backlog of work to process asynchronously.
- Queue storage can be combined with compute functions like Azure Functions to take an action when a message is received.
	- For example, you want to perform an action after a customer uploads a form to your website. You could have the submit button on the website trigger a message to the Queue storage. Then, you could use Azure Functions to trigger an action once the message was received.

## Azure Disks

- Azure Disk storage, or Azure managed disks, are block-level storage volumes managed by Azure for use with Azure VMs. 
- Conceptually, they’re the same as a physical disk, but they’re virtualized – offering greater resiliency and availability than a physical disk. 
- With managed disks, all you have to do is provision the disk, and Azure will take care of the rest.

## Azure Tables

- Azure Table storage stores large amounts of structured non-relational data. 
- Azure tables are a NoSQL datastore that accepts authenticated calls from inside and outside the Azure cloud. 
- This enables you to use Azure tables to build your hybrid or multicloud solution and have your data always available. Azure tables are ideal for storing structured, non-relational data.

---





# U5: Exercise - Create a storage blob

- In this **15-minute** exercise, you:
	1. **Create a Storage Account**:
	    - Sign in to the Azure portal and create a new storage account with specified settings, including a unique name and redundancy options.
	2. **Work with Blob Storage**:
	    - Create a Blob container, upload a file (image), and verify the upload by checking the properties of the blob.
	3. **Change Blob Access Level**:
	    - Modify the access level of the blob to allow anonymous read access, enabling public access to the uploaded file.
	4. **Clean Up**:
	    - Delete the resource group created during the exercise to clean up resources.


---




# U6: Identify Azure data migration options

- Now that you understand the different storage options within Azure, it’s important to also understand how to get your data and information into Azure.
- Azure supports both `real-time migration` of infrastructure, applications, and data using Azure Migrate as well as `asynchronous migration` of data using Azure Data Box.

## Azure Migrate

> #Azure_Migrate is a *service that helps you migrate from an on-premises environment to the cloud*. 

- Azure Migrate functions as a hub to help you manage the assessment and migration of your on-premises datacenter to Azure. It provides the following:
	- **Unified migration platform**: A single portal to start, run, and track your migration to Azure.
	- **Range of tools**: A range of tools for assessment and migration. 
		- Azure Migrate tools include `Azure Migrate: Discovery and assessment` and `Azure Migrate: Server Migration`. 
		- Azure Migrate also `integrates` with other Azure services and tools, and with `independent software vendor (ISV) `offerings.
	- **Assessment and migration**: In the Azure Migrate hub, you can assess and migrate your on-premises infrastructure to Azure.

### Integrated tools

- In addition to working with tools from ISVs, the Azure Migrate hub also includes the following tools to help with migration:
	- **Azure Migrate: Discovery and assessment**. Discover and assess on-premises servers running on VMware, Hyper-V, and physical servers in preparation for migration to Azure.
	- **Azure Migrate: Server Migration**. Migrate VMware VMs, Hyper-V VMs, physical servers, other virtualized servers, and public cloud VMs to Azure.
	- **Data Migration Assistant**. Data Migration Assistant is a stand-alone tool to assess SQL Servers. It helps pinpoint potential problems blocking migration. It identifies unsupported features, new features that can benefit you after migration, and the right path for database migration.
	- **Azure Database Migration Service**. Migrate on-premises databases to Azure VMs running SQL Server, Azure SQL Database, or SQL Managed Instances.
	- **Azure App Service migration assistant**. Azure App Service migration assistant is a standalone tool to assess on-premises websites for migration to Azure App Service. Use Migration Assistant to migrate .NET and PHP web apps to Azure.
	- **Azure Data Box**. Use Azure Data Box products to move large amounts of offline data to Azure.

## Azure Data Box

> #Azure_Data_Box is a *physical migration service that helps transfer large amounts of data* in a quick, inexpensive, and reliable way. 

- The secure data transfer is accelerated by `shipping you a proprietary Data Box storage device that has a maximum usable storage capacity of 80 terabytes`. 
	- The Data Box is `transported to and from your datacenter via a regional carrier`. A rugged case protects and secures the Data Box from damage during transit.
- You can order the Data Box device via the Azure portal to import or export data from Azure. 
- Once the device is received, you can quickly set it up using the local web UI and connect it to your network.
- Once you’re finished transferring the data (either into or out of Azure), simply return the Data Box.
- If you’re transferring data into Azure, the data is automatically uploaded once Microsoft receives the Data Box back. 
- The entire process is tracked end-to-end by the Data Box service in the Azure portal.

> `Note`
> 	Once the data from your import order is uploaded to Azure, the disks on the device are wiped clean in accordance with NIST 800-88r1 standards. For an export order, the disks are erased once the device reaches the Azure datacenter.

### Use cases

- Data Box is ideally suited to transfer `data sizes larger than 40 TBs` in scenarios with `no to limited network connectivity. `
- The data movement can be one-time, periodic, or an initial bulk data transfer followed by periodic transfers.

#### Importing Use Cases

- **Onetime migration** - when a large amount of on-premises data is moved to Azure.
- Moving a **media library from offline tapes** into Azure to create an online media library.
- Migrating your **VM farm, SQL server, and applications** to Azure.
- Moving **historical data to Azure for in-depth analysis** and reporting using HDInsight.
- **Initial bulk transfer** - when an initial bulk transfer is done using Data Box (seed) followed by incremental transfers over the network.
- **Periodic uploads** - when large amount of data is generated periodically and needs to be moved to Azure.


#### Exporting Use Cases

- **Disaster recovery** - when a copy of the data from Azure is restored to an on-premises network. 
	- In a typical disaster recovery scenario, a large amount of Azure data is exported to a Data Box. Microsoft then ships this Data Box, and the data is restored on your premises in a short time.
- **Security requirements** - when you need to be able to export data out of Azure due to government or security requirements.
- **Migrate back to on-premises or to another cloud service provider** - when you want to move all the data back to on-premises, or to another cloud service provider, export data via Data Box to migrate the workloads.

---



# U7: Identify Azure file movement options

- In addition to large scale migration using services like Azure Migrate and Azure Data Box, `Azure also has tools designed to help you move or interact with individual files or small file groups. `
- Among those tools are AzCopy, Azure Storage Explorer, and Azure File Sync.

## AzCopy

> #AzCopy is a *command-line utility* that you can *use to copy blobs or files* to or from your storage account. 

- With AzCopy, you can `upload` files, `download` files, `copy` files` between storage accounts, `and even `synchronize files`.
- AzCopy `can even be configured to work with other cloud providers` to help move files back and forth between clouds.

>`Note`
Synchronizing blobs or files with AzCopy is `one-direction synchronization`. When you synchronize, you designate the source and destination, and AzCopy will copy files or blobs in that direction.` It doesn't synchronize bi-directionally based on timestamps or other metadata.`


## Azure Storage Explorer

> #Azure_Storage_Explorer is a *standalone app that provides a graphical interface to manage files and blobs in your Azure Storage Account.* 

- It works on Windows, macOS, and Linux operating systems and` uses AzCopy on the backend `to perform all of the file and blob management tasks. 
- With Storage Explorer, you can `upload` to Azure, `download` from Azure, or `move` between storage accounts.

## Azure File Sync

> #Azure_File_Sync is a *tool that lets you centralize your file shares in Azure Files* and *keep the flexibility, performance, and compatibility of a Windows file server.*

- It’s almost like turning your Windows file server into a miniature content delivery network. 
- **Once you install Azure File Sync on your local Windows server, it will automatically stay bi-directionally synced with your files in Azure.**


### With Azure File Sync, you can

- Use any `protocol` that's available on Windows Server to access your data locally, including `SMB`, NFS, `and` `FTPS`.
- Have `as many caches as you need` across the world.
- `Replace a failed local server` by installing Azure File Sync on a new server in the same datacenter.
- `Configure cloud tiering` so the **most frequently accessed files are replicated locally**, while **infrequently accessed files are kept in the cloud** until requested.