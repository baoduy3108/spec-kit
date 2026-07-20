---
name: how-mpp-databases-work
description: How massively parallel processing (MPP) databases work — splitting data and query execution across many nodes that each process their shard in parallel, the shuffle/data-movement bottleneck, and why data distribution/skew determine performance. Use to understand MPP/distributed analytical databases, sharding for queries, data shuffle, distribution keys, or why some queries don't parallelize well.
category: engineering
keywords_vi: mpp database, distribution key, shuffle di chuyển dữ liệu, data skew node chậm, xử lý query song song nhiều node, mỗi node xử lý shard, massively parallel processing
---

# How MPP (Massively Parallel Processing) Databases Work

MPP databases (Redshift, Snowflake, BigQuery, Greenplum, ClickHouse clusters) run analytical queries over **huge datasets** by **splitting the work across many machines** that each process a **piece of the data in parallel**. This is how you query terabytes/petabytes in seconds — but the performance hinges on **how data is distributed** and how much must be **moved between nodes** (see how-data-warehouses-work, how-columnar-storage-works).

## The Idea: Divide the Data and the Work

A single machine can't scan petabytes fast enough. MPP **partitions the data across many nodes** and executes each query **in parallel**:
- Data is **distributed** (sharded) across nodes — each node holds a slice.
- A query is broken into steps that each node runs **on its own slice simultaneously** (scan, filter, aggregate locally).
- Partial results are **combined** into the final answer.
With N nodes, an ideal scan is ~N× faster. This "scale out" (add nodes) is how MPP handles data far beyond one machine — versus "scale up" (a bigger single box), which hits limits.

## The Bottleneck: The Shuffle (data movement)

The catch: some operations need data from **other** nodes. A **join** or **GROUP BY** on a key that isn't the distribution key requires rows with the same key to end up on the **same** node — so the system **shuffles** (redistributes) data across the network between nodes. **Network data movement is the main bottleneck** in MPP:
- Operations that stay **local** (each node works on its own data) are fast and scale well.
- Operations that require a **shuffle** (moving lots of data between nodes) are expensive.
So the art of MPP performance is **minimizing and localizing data movement**.

## Data Distribution: The Key Decision

How you distribute data across nodes determines how much shuffling queries need:
- **Hash distribution (by a key)** — rows go to nodes by hashing a **distribution key**. Joins/aggregations on that key are **local** (no shuffle) — great if you pick the key you join/group on most.
- **Round-robin / even** — spreads rows evenly (good for load balance) but joins usually need a shuffle.
- **Replicated** — small dimension tables copied to **every** node, so joins to them are always local (avoids shuffling the big table).
Choosing the **right distribution key** (matching common join/group keys) is the single biggest MPP performance lever.

## Data Skew: The Silent Killer

MPP is only as fast as its **slowest** node. If data is **unevenly** distributed — one node gets far more rows (e.g. a distribution key with a dominant value, or lots of NULLs) — that node becomes a **straggler** while others idle. **Skew** destroys parallelism: 100 nodes don't help if one holds 50% of the data. Good distribution keys have **high cardinality and even distribution**.

## Design Guidance

- **Distribute by the column you most join/aggregate on** → local operations, minimal shuffle.
- **Replicate small dimension tables** to avoid shuffling big fact tables.
- **Avoid skew** — pick high-cardinality, evenly-distributed distribution keys; watch for dominant values/NULLs.
- **Minimize shuffles** — co-locate joined tables on the same key; filter early to move less data.
- **Columnar + compression** (see how-columnar-storage-works) — MPP engines are columnar to scan only needed columns.
- **Separate storage/compute** (Snowflake/BigQuery) lets you scale compute independently and avoid manual distribution in some systems.

## Pitfalls (in understanding/using)

- **Wrong distribution key** → constant shuffles; the biggest MPP performance mistake.
- **Data skew** → one straggler node bottlenecks the whole cluster despite many nodes.
- **Shuffling big tables** for joins instead of replicating small dimensions or co-locating keys.
- Expecting **linear** speedup from more nodes → shuffles, skew, and coordination overhead limit it.
- Treating MPP like a **transactional** DB → it's for analytics (big scans/aggregations), not high-rate small point writes.
- Ignoring that MPP is only as fast as the **slowest node** — balance matters more than raw node count.
