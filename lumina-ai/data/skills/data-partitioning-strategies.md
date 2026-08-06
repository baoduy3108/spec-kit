---
name: data-partitioning-strategies
description: How data partitioning works — splitting a large table/dataset into partitions (by time, range, hash, or list) so queries scan only relevant partitions (partition pruning), plus choosing a partition key and avoiding too-many/too-few partitions. Use to design table partitioning, understand partition pruning, choose a partition key, or speed up big-table queries.
category: engineering
keywords_vi: chiến lược phân vùng dữ liệu, chia bảng lớn thành partition theo thời gian range hash list, query chỉ quét partition liên quan pruning, chọn khóa phân vùng, tránh quá nhiều hoặc quá ít partition
---

# Data Partitioning Strategies

Partitioning splits a large table or dataset into smaller **partitions** based on a column's value, so queries can **skip** the partitions they don't need — scanning far less data. It's one of the most effective ways to speed up queries on big tables (in warehouses, lakehouses, and OLTP databases), but only if the partition key matches how you query (see how-data-warehouses-work, data-lakehouse-and-table-formats, how-mpp-databases-work).

## The Idea: Split So You Can Skip

A query that filters on a column shouldn't have to scan the **whole** table. If the table is partitioned by that column, the engine reads only the **relevant partitions** — this is **partition pruning**. Example: a table of events partitioned by **date**; a query for "last 7 days" reads 7 daily partitions, not years of data. Partitioning turns a full-table scan into a small-subset scan — the core benefit.

## The Partitioning Schemes

- **Range partitioning** — split by ranges of a value, most commonly **time** (by day/month/year). The dominant scheme for event/log/time-series data, because most queries filter by time. Also enables cheap **dropping** of old partitions (delete a month by dropping its partition).
- **List partitioning** — split by discrete values of a column (by region, by country, by category). Good when data naturally groups into known buckets and queries filter by them.
- **Hash partitioning** — assign rows to N partitions by hashing a key. Gives **even** distribution (good for load balancing / parallelism — see how-mpp-databases-work), but doesn't help range/pruning queries the way range partitioning does.
- **Composite** — combine (e.g. range by month, then hash by user) for both pruning and even distribution.

## Choosing the Partition Key

The key rule: **partition by what you filter on most**. The partition key must match your dominant query predicate to enable pruning — otherwise queries scan everything and partitioning adds overhead for no gain. For most analytical/event data, that's **time**. Consider also what you need to **expire/delete** (time makes retention easy).

## The Goldilocks Problem: Partition Size

Partition **granularity** matters a lot:
- **Too many** partitions (e.g. partition by minute, or by high-cardinality user ID) → huge metadata overhead, tiny files (the small-files problem — see data-lakehouse-and-table-formats), slow planning, and queries touching thousands of partitions. This is a very common mistake ("over-partitioning").
- **Too few** / too-coarse partitions → each is huge, so pruning barely helps.
Aim for partitions that are **substantial but not enormous** (a common target is roughly hundreds of MB to a few GB each), and cardinality low enough to keep partition count manageable.

## Partitioning vs Related Concepts

- **Partitioning** — coarse: skip whole partitions (pruning).
- **Clustering / sorting** (within partitions) — order data so the engine skips **blocks/files** via min/max statistics (finer-grained skipping). Often combined with partitioning.
- **Sharding** (see how-database-sharding-works) — distributing across **servers** for scale; partitioning is within a table/dataset (though MPP distribution is related).

## Design Guidance

- **Partition by the dominant filter column** (usually time) to enable pruning.
- **Right-size partitions** — avoid over-partitioning (too many tiny partitions) and under-partitioning (few huge ones).
- **Time-range partitioning** for events/logs — enables pruning *and* cheap retention (drop old partitions).
- **Cluster/sort within partitions** for finer data-skipping.
- **Verify pruning** — check the query plan actually prunes; a predicate that doesn't match the partition key won't.
- **Avoid high-cardinality** partition keys (per-user, per-ID) → partition explosion.

## Pitfalls (in understanding/using)

- **Over-partitioning** (too many tiny partitions) → metadata bloat, small files, slow planning — a top mistake.
- Partitioning on a column you **don't filter on** → no pruning; pure overhead.
- **High-cardinality** partition keys → partition explosion.
- Queries that don't reference the partition key (or wrap it in a function) → **no pruning**, full scan.
- Confusing **partitioning** (skip partitions) with **indexing** (find rows) or **sharding** (across servers).
- Ignoring **retention** — time partitioning makes deleting old data trivial (drop partitions) vs expensive row deletes.
