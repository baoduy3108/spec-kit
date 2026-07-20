---
name: how-vectorized-query-execution-works
description: How vectorized query execution works — processing data in batches (vectors) of column values per operation instead of row-by-row, amortizing interpretation overhead and enabling CPU SIMD/cache efficiency, why it makes analytical engines fast. Use to understand vectorized execution, why columnar analytical databases are fast, row-at-a-time vs batch processing, or SIMD in query engines.
category: engineering
keywords_vi: vectorized execution, vectorized query, xử lý theo lô vector cột, simd query engine, thay vì từng dòng row-at-a-time, giảm chi phí diễn giải mỗi dòng, engine phân tích cột nhanh
---

# How Vectorized Query Execution Works

Vectorized execution is a key reason modern analytical databases (ClickHouse, DuckDB, Snowflake, Velox-based engines) are so fast. Instead of processing **one row at a time**, they process data in **batches ("vectors") of column values** per operation. This small change in *how* data flows through the engine yields **order-of-magnitude** speedups on analytical queries (see how-columnar-storage-works, how-query-optimizers-work).

## The Problem: Row-at-a-Time Is Slow

Traditional ("Volcano" iterator) query engines process **one row at a time**: for each row, call `next()` down a chain of operators (scan → filter → project → aggregate), with a virtual function call and interpretation overhead **per row per operator**. For a query over billions of rows, that **per-row overhead** — function-call dispatch, condition checks, poor CPU utilization — **dominates** the actual useful work. The CPU spends most of its time on bookkeeping, not computation.

## The Core Idea: Process a Batch of Values at Once

Vectorized engines pass **batches** (e.g. 1,000–4,000 values of a column) between operators, and each operator does its work over the **whole batch in a tight loop**:
- "Apply this filter to these 2,000 values" — one call, one loop, instead of 2,000 calls.
- The per-operation **overhead is amortized** across the whole batch (paid once per 2,000 rows, not once per row).
This is a middle ground between row-at-a-time (too much overhead) and full query compilation, capturing most of the benefit with simpler engineering.

## Why Batches Are So Much Faster (CPU-level)

Processing a batch of same-typed column values in a tight loop lets the CPU shine:
- **Amortized interpretation** — the dispatch/branching cost is spread over many values.
- **SIMD** — modern CPUs can apply **one instruction to multiple data** (process 4/8/16 values at once). Tight loops over columnar batches are exactly what SIMD needs; row-at-a-time can't use it.
- **Cache & memory efficiency** — columnar batches are contiguous, same-type data → cache-friendly, predictable memory access (see how-cpu-caches-work), and effective prefetching.
- **Branch prediction / pipelining** — uniform loops keep the CPU pipeline full.
This is why **columnar storage + vectorized execution** go together: columnar layout (see how-columnar-storage-works) delivers exactly the contiguous, same-type batches vectorized operators devour.

## Vectorization vs Compilation

Two approaches to beating row-at-a-time overhead:
- **Vectorized interpretation** — pre-built operators process batches (ClickHouse, DuckDB). Simpler, robust, no compile step.
- **Query compilation (JIT)** — generate specialized machine code for each query (see how-jit-compilers-work), eliminating interpretation entirely (some engines). Faster in theory but complex, with compile latency.
Many engines vectorize; some do both. Both target the same enemy: per-row overhead.

## Why It Matters / Implications

- Explains why **analytical (OLAP)** engines are fast on big scans/aggregations, while **row-store OLTP** engines aren't built this way (they optimize single-row point access).
- Reinforces using **columnar formats** (Parquet — see how-columnar-storage-works) that feed vectorized engines.
- It's an **engine internal** — you benefit automatically by using a vectorized engine on columnar data; you don't code it, but knowing it explains the performance and why row-by-row UDFs can kill it.

## Pitfalls (in understanding/using)

- Expecting a **row-store OLTP** database to scan/aggregate huge tables fast → it's row-at-a-time; use a columnar/vectorized engine for analytics.
- **Row-by-row UDFs / scalar functions** that break vectorization → they force per-row processing, negating the speedup.
- Assuming vectorization helps **point lookups** → its win is on **bulk** scans/aggregations, not single-row access.
- Using **row-oriented** storage with a vectorized engine → you lose the contiguous same-type batches it needs (pair it with columnar).
- Thinking it's something you **implement** → it's an engine internal; you get it by choosing the right engine + columnar data.
- Ignoring that **wide row-at-a-time** operations (many small transactions) are a different workload entirely.
