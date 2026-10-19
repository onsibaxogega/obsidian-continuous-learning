
# Firestore

> `Firestore` is a flexible, horizontally scalable, `NoSQL cloud database` for mobile, web, and server development. Data is stored in `documents`, organized into `collections`. #GCP_Firestore


---


## 1. Core Concept — Document Model

- **Definition:** Firestore is a `document-oriented NoSQL database` — data is stored as `documents` which are organized into `collections`
- **Document structure:** each document contains a set of `key-value pairs`
	- _Example:_ a document representing a user might have keys for `firstname` and `lastname` with associated values
	- documents can contain `complex nested objects` in addition to `subcollections`
- **Analogy:** think of collections as folders and documents as JSON files inside them — except documents can nest `subcollections` within themselves, creating a flexible hierarchical data model

### Why It Matters for Enterprise

- **serverless and fully managed** — no database instances to provision or maintain, which pairs perfectly with `serverless compute` like Cloud Run
- **real-time sync for connected apps** — if Acme Corp builds a mobile or web dashboard that needs `live data updates`, Firestore pushes changes to all connected clients automatically
- **offline-first architecture** — critical for field applications where connectivity is unreliable


---


## 2. Querying

- **NoSQL queries** can retrieve `individual, specific documents` or `all documents in a collection` that match your query parameters
- queries support `multiple, chained filters` and can combine `filtering and sorting` options
- **indexed by default:** query performance is proportional to the `size of the result set`, not the dataset

> `NOTE:` the "indexed by default" behavior is a key differentiator — in traditional relational databases, you have to manually create indexes for performance. Firestore handles this automatically, so `query speed depends on how many results you return, not how big your collection is`


---


## 3. Data Synchronization & Offline Support

- **real-time sync:** Firestore uses `data synchronization` to update data on any connected device in real time
- **one-time fetches:** also designed to make simple, `one-time fetch queries` efficiently — you're not forced into a real-time model
- **offline support:**
	- Firestore `caches data` that an app is actively using
	- the app can `write, read, listen to, and query data` even if the device is `offline`
	- when the device comes back online, Firestore `synchronizes any local changes` back to Firestore

> `NOTE:` the offline caching + sync behavior is built into the `client SDKs` (mobile and web) — you don't need to implement your own caching or conflict resolution layer


---


## 4. Infrastructure & Reliability

Firestore leverages Google Cloud's powerful infrastructure:

- **automatic multi-region data replication**
- **strong consistency guarantees**
- **atomic batch operations** — group multiple writes into a single atomic unit
- **real transaction support** — full ACID transactions across documents

> `NOTE:` strong consistency in a NoSQL database is not a given — many NoSQL systems (e.g., DynamoDB in its default mode, Cassandra) offer only `eventual consistency`. Firestore providing `strong consistency by default` removes a major class of bugs around stale reads


---


## 5. Firestore vs. Cloud SQL vs. Spanner

| Feature             | Cloud SQL                   | Spanner                      | Firestore                                    |
| :------------------ | :-------------------------- | :--------------------------- | :------------------------------------------- |
| **data model**      | `relational` (tables, rows) | `relational` (tables, rows)  | `document-oriented` (collections, documents) |
| **query language**  | SQL                         | SQL (Google Standard SQL)    | `NoSQL queries` (chained filters)            |
| **scaling**         | vertical                    | horizontal                   | `horizontal` (serverless, auto-scales)       |
| **consistency**     | strong (single region)      | strong global                | `strong`                                     |
| **offline support** | none                        | none                         | `built-in` (client SDK caching)              |
| **real-time sync**  | none                        | none                         | `built-in`                                   |
| **best for**        | traditional relational apps | global-scale relational apps | mobile, web, serverless apps                 |

> `NOTE:` Firestore is a strong candidate for `document-centric` or `event-driven` data (e.g., user profiles, session data, config stores) while Cloud SQL for PostgreSQL remains the better fit for `relational data with complex joins`


---


## 6. Tips & Tricks

- **use Firestore for what it's good at** — document-oriented data like user profiles, app config, real-time feeds, and event logs; `don't try to force relational patterns` (complex joins, multi-table transactions) into a document model
- **leverage subcollections for hierarchical data** — instead of deeply nesting objects within a single document, use `subcollections` to keep documents small and queries efficient
- **mind the document size limit** — individual documents have a `1 MiB size limit`; if you're storing large objects, use Cloud Storage and reference the URL in your Firestore document
- **Firestore has two modes** — `Native mode` (full feature set with real-time sync and offline) and `Datastore mode` (backward-compatible with the legacy Datastore API). For new projects, `always choose Native mode`
- **exam tip:** if a question mentions `mobile`, `offline support`, `real-time sync`, or `document-based data model`, the answer is almost certainly Firestore