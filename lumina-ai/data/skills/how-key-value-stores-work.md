---
name: how-key-value-stores-work
description: How key-value stores work — the simplest database model (get/put by key), in-memory vs persistent (append-only log + index, LSM-trees), hash vs sorted indexes, and why they're fast; plus Redis-style features. Use to understand key-value stores, Redis, how a simple database works, building a KV store, or the storage engine behind NoSQL.
category: engineering
keywords_vi: how key-value stores work, key-value store hoạt động thế nào, get put theo khóa, in-memory vs bền vững, append-only log index lsm-tree, hash vs sorted index, redis, nhanh
---

# How Key-Value Stores Work

A key-value store is the **simplest database model**: store and retrieve values by a unique **key**, like a giant persistent dictionary. Understanding it reveals the fundamentals under many databases and caches (Redis, DynamoDB, RocksDB — see how-databases-work), and it's the classic "build your own database" starting point.

## The Model: get / put / delete

The entire interface is basically:
- **put(key, value)** — store a value under a key.
- **get(key)** — retrieve the value for a key.
- **delete(key)** — remove it.
No queries, no joins, no schema — just keyed access. This simplicity is a **feature**: it's easy to make **fast and scalable** (a key maps cleanly to a location; easy to shard by key — see how-database-sharding-works, how-consistent-hashing-works). The value is often opaque bytes (you serialize your data — see how-json-serialization-works).

## In-Memory vs Persistent

- **In-memory** (Redis) — keep everything in RAM keyed by a hash table (see how-hash-tables-work) → **extremely fast** (`O(1)` lookups, microsecond latency). Used as caches and fast stores. Volatile unless it also persists (snapshotting/logging) — RAM is limited and lost on crash.
- **Persistent (on-disk)** — must survive restarts and hold more than RAM. This needs a storage engine (below).

## The Persistent Storage Engine

How do you store key→value on disk efficiently, especially for lots of writes? The classic evolution (a great learning arc):
1. **Append-only log** — the simplest durable store: append every `put` to the end of a file (sequential writes are fast — see how-hard-drives-work). Durable and simple, but **reading** a key means scanning the whole log — `O(n)`.
2. **Add an in-memory index** — keep a hash map of `key → byte offset in the log` in RAM. Now `get` is `O(1)` (look up the offset, seek, read). Writes append to the log **and** update the index. (This is essentially "Bitcask.")
3. **Compaction** — the log grows forever (old values for overwritten keys pile up); periodically **compact** — rewrite keeping only the latest value per key. (Same idea as LSM-tree compaction.)
4. **LSM-trees** (see how-lsm-trees-work) — for large datasets where the index can't all fit in RAM: buffer writes in memory, flush sorted files (SSTables), compact in the background. Powers RocksDB/LevelDB/Cassandra.
This progression — log → index → compaction → LSM — is the heart of many real storage engines.

## Hash Index vs Sorted (B-tree) Index

- **Hash index** — `O(1)` lookup by exact key, but **no range queries** (keys are scattered). Great for pure key-value access.
- **Sorted index (B-tree — see how-b-trees-work, or LSM's sorted SSTables)** — keys kept in order → supports **range scans** and ordered iteration, at slightly higher lookup cost. Needed if you query ranges of keys.
Choose by whether you need range queries.

## Beyond Plain KV (Redis)

Real stores add features: **TTL/expiry** (caching — see caching-strategies), richer value types (Redis: lists, sets, sorted sets — see skip-lists, hashes), atomic operations, pub/sub (see event-driven-architecture), and replication/persistence. But the core remains: fast keyed access.

## Pitfalls (in understanding/using)

- Treating an **in-memory** store as durable — it's volatile unless configured to persist; RAM is limited.
- Expecting **range queries** from a hash-indexed store (only exact-key) — use a sorted/B-tree/LSM store for ranges.
- **Unbounded append-only log** without compaction → disk fills with dead values.
- Assuming the in-memory **index fits in RAM** for huge datasets — that's when you need LSM-trees.
- Storing huge values or using it as a **relational** DB — KV is for keyed access, not complex queries/joins.
- Ignoring **key design** (hot keys, sharding) at scale (see how-database-sharding-works).
- Forgetting **serialization** — values are bytes; you encode/decode your objects.
