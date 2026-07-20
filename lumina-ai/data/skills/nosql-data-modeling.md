---
name: nosql-data-modeling
description: Model data for NoSQL databases — the four families (document, key-value, wide-column, graph), modeling by access pattern rather than normalization, denormalization and embedding vs referencing, partition/shard key choice, and when NoSQL fits vs when a relational DB is the right call. Use when designing for MongoDB/DynamoDB/Cassandra/Redis or deciding SQL vs NoSQL.
category: engineering
keywords_vi: nosql, mongodb dynamodb, mô hình dữ liệu nosql, document database, key-value, partition key, chọn sql hay nosql, denormalize nhúng dữ liệu
---

# NoSQL Data Modeling

NoSQL isn't "schema-less freedom" — it's modeling around **access patterns** instead of normalized relations. You design the data the way you'll read it.

## The Families

- **Document** (MongoDB, Firestore) — JSON-like documents; flexible nested structure; good for hierarchical entities read together.
- **Key-value** (Redis, DynamoDB simple) — a value by a key; fastest, simplest; caching, sessions, counters.
- **Wide-column** (Cassandra, Bigtable) — rows with dynamic columns partitioned by key; massive write throughput, time-series.
- **Graph** (Neo4j) — nodes and edges; for relationship-heavy queries (social, recommendations, fraud).

## Model by Access Pattern

The core mindset shift: **list your queries first, then design tables/documents to serve them directly.** Relational design normalizes and lets you join arbitrarily later; NoSQL often has no efficient join, so you shape the data so each query is a single lookup. If you don't know your access patterns, you're not ready to model NoSQL.

## Embed vs Reference

- **Embed** (denormalize) data that's read together and changes together — an order with its line items in one document. One read, no join. This duplicates data and you update it in multiple places.
- **Reference** when data is shared, large, or updated independently, or when embedding would create unbounded growth (a user's millions of posts shouldn't be one document).
- Accept **denormalization + eventual consistency** as the trade for read performance — the opposite of relational normalization.

## Partition / Shard Key (make or break)

Choose a key that **spreads load evenly** and matches your query pattern. A bad key creates **hot partitions** (all traffic on one node) or forces expensive scatter-gather queries. In DynamoDB/Cassandra this is the single most important decision — a low-cardinality or time-monotonic key (everything writing to "today") is a classic mistake. Model composite keys around "get all X for a Y."

## SQL vs NoSQL

- **Choose relational** for: complex/ad-hoc queries and joins, strong consistency and transactions across entities, well-defined relationships, moderate scale (most apps). Don't reach for NoSQL by default.
- **Choose NoSQL** for: known simple access patterns at very high scale, flexible/varying schemas, extreme write throughput, or a specific shape (graph, time-series, cache). 
- Many systems use **both** (polyglot persistence): relational for core data, Redis for cache, a document/search store for specific needs.
