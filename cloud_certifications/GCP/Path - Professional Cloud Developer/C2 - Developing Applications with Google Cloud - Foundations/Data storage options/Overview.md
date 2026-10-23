
# Overview of Data Storage Options — Module Overview

> This module covers how to choose the right `managed data storage service` on Google Cloud based on your application's data types and access patterns. You learn the ideal use cases — and the unsuitable use cases — for each option, helping you make informed storage decisions. #GCP_Data_Storage


---


## 1. Module Learning Objectives

After completing this module, you'll be able to:

- understand the ideal use cases for each Google Cloud data storage option
- identify use cases for which a given storage option might `not be suitable`
- choose the data storage option that meets `specific use cases` in your applications


---


## 2. The Problem — Applications Have Many Data Types

_Example:_ a social image sharing application needs to store:

- `image files` — large binary objects (blobs)
- `high volumes of user messages` — semi-structured, potentially real-time data
- `transactional data` — structured, relational, ACID-compliant
- `frequently accessed data` — cached for performance
- `analytics data` — collected, queried, and analyzed for business intelligence about users and product usage patterns

Each data type has different `storage, access, and performance requirements` — no single service handles them all optimally.


---


## 3. Services Covered

| Service           | Data Type                                                     |
| :---------------- | :------------------------------------------------------------ |
| **Cloud Storage** | unstructured blobs (images, video, backups)                   |
| **Firestore**     | semi-structured / document data (mobile, web, real-time sync) |
| **Bigtable**      | wide-column NoSQL (IoT, time-series, analytics)               |
| **Cloud SQL**     | relational / transactional (web apps, existing SQL workloads) |
| **Spanner**       | relational / transactional at global scale (horizontal SQL)   |
| **BigQuery**      | analytics / data warehousing (ad-hoc queries, BI)             |

