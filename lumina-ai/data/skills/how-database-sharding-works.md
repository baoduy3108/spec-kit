---
name: how-database-sharding-works
description: How database sharding works — horizontally partitioning data across servers to scale writes and storage beyond one machine, sharding keys and strategies (range/hash/directory), rebalancing, and the hard parts (cross-shard queries, hotspots, transactions). Use to understand sharding, horizontal partitioning, scaling writes, shard keys, or distributing a database.
category: engineering
keywords_vi: database sharding, phân mảnh cơ sở dữ liệu, phân vùng ngang horizontal partition, shard key khóa phân mảnh, range hash directory, hotspot, cross-shard query, mở rộng ghi
---

# How Database Sharding Works

Sharding splits one database's data **horizontally** across many servers (shards), so you can scale **writes and storage beyond a single machine's limits**. Replication (see how-database-replication-works) scales reads and adds redundancy; **sharding is how you scale writes**. It's powerful but adds real complexity.

## The Idea: Split Rows Across Servers

Each shard holds a **subset of the rows** (not a copy — a partition). E.g. users A–M on shard 1, N–Z on shard 2. A query for a given row goes only to the shard that holds it. Total capacity = sum of all shards, so you scale by adding shards. This is **horizontal partitioning** (more machines), versus **vertical** scaling (a bigger machine, which hits a ceiling).

## The Shard Key (the most important decision)

You pick a **shard key** — the column that determines which shard a row lives on. The key choice makes or breaks the system, because it dictates data distribution and which queries are cheap:
- The key should spread data/load **evenly** (avoid hotspots) and match your **access pattern** (queries that filter by the shard key hit one shard; queries that don't must fan out to all).

## Sharding Strategies

- **Range-based** — partition by key ranges (A–M, N–Z; or by date). Simple, and range queries on the key are efficient — but prone to **hotspots** (recent dates or popular ranges get all the traffic; sequential keys pile onto one shard).
- **Hash-based** — hash the key and assign by hash → **even distribution**, no hotspots. But loses range-query locality (adjacent keys scatter). Most common for even load.
- **Consistent hashing** — a hash scheme that minimizes data movement when adding/removing shards (see how-consistent-hashing-works) — important for rebalancing.
- **Directory/lookup** — a lookup service maps keys→shards, flexible but adds a dependency.

## Rebalancing

As data grows or shards get added, data must be **rebalanced** across shards without downtime — moving partitions, updating routing. Consistent hashing / a fixed large number of virtual partitions makes this manageable (move a few partitions, not everything).

## The Hard Parts (why sharding is a last resort)

- **Cross-shard queries** — anything that isn't keyed by the shard key must query **all** shards and merge results (**scatter-gather**) — slow and complex. Joins across shards are especially painful.
- **Cross-shard transactions** — ACID across shards needs distributed transactions (2PC/sagas) — hard and slow; you often lose easy transactionality.
- **Hotspots** — a bad key or a "celebrity" row overloads one shard.
- **Operational complexity** — rebalancing, backups, schema changes across shards.
Because of this, exhaust simpler options first (indexing, caching, read replicas, a bigger box) before sharding.

## Pitfalls (in understanding/using)

- Choosing a **poor shard key** → hotspots or forcing scatter-gather on common queries. Design the key around your access patterns.
- **Sharding prematurely** — huge complexity; scale vertically / with replicas / caching first.
- Assuming cross-shard **joins/transactions** are easy — they're the main pain; denormalize or avoid them.
- Monotonic keys (auto-increment IDs, timestamps) with range sharding → all writes hit the last shard.
- Forgetting **rebalancing** cost when adding shards (use consistent hashing / many virtual partitions).
- Confusing sharding (splitting data, scales writes) with replication (copying data, scales reads).
