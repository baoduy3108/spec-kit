---
name: how-columnar-storage-works
description: How columnar storage works — storing data by column instead of by row, why that makes analytical queries and compression far faster, formats like Parquet/ORC, vectorized execution, and when row stores still win. Use to understand columnar databases, Parquet, OLAP storage, why analytics engines are column-oriented, or row vs column storage.
category: engineering
keywords_vi: columnar storage, lưu trữ theo cột, parquet orc, phân tích olap nhanh, nén tốt hơn, vectorized execution, row store vs column store
---

# How Columnar Storage Works

Columnar storage lays data out **by column** rather than by row. This one change makes analytical queries dramatically faster and data far more compressible — it's why every modern analytics/OLAP system (data warehouses, Parquet, ClickHouse, BigQuery) is column-oriented.

## Row vs Column Layout

- **Row store** (traditional OLTP DBs) — stores each **row** contiguously: `[id,name,age][id,name,age]…`. Great when you read/write **whole rows** (fetch a user, insert an order).
- **Column store** — stores each **column** contiguously: all the `id`s together, then all the `name`s, then all the `age`s. Great when you read a **few columns across many rows** (`SELECT AVG(age) FROM users` touches only the age column).

## Why Columnar Wins for Analytics

Analytical queries typically scan **millions of rows but only a few columns** (aggregations, filters). With columnar storage:
- **Read only the columns you need** — `SELECT AVG(age)` reads just the age column, skipping name/address entirely. A row store would read every full row (all columns) off disk. Huge I/O savings.
- **Far better compression** — a column holds values of the **same type and similar values** together, so compression (run-length, dictionary, delta encoding) is much more effective than compressing mixed-type rows. Less data on disk → less I/O → faster.
- **Vectorized execution** — process a column as a tight array in CPU-cache-friendly batches (see how-cpu-caches-work), often with SIMD, instead of row-by-row. Big CPU efficiency gains.
Together these give order-of-magnitude speedups on analytical scans.

## Formats & Systems

- **Parquet / ORC** — open columnar **file formats** for data lakes: column chunks + per-column stats (min/max) enabling **predicate pushdown** (skip chunks that can't match a filter). The standard for big-data storage.
- **Columnar databases/warehouses** — ClickHouse, BigQuery, Redshift, Snowflake, DuckDB.

## When Row Stores Still Win (OLTP)

Columnar is bad at **transactional** workloads:
- **Point lookups / single-row reads** touch every column file — inefficient for "get this one full record."
- **Inserts/updates of individual rows** are expensive (a row's fields are scattered across column files).
So **OLTP** (many small reads/writes of whole rows) stays row-oriented (Postgres, MySQL), while **OLAP** (big analytical scans) is columnar (see how-data-warehouses-work). Many systems now do both (HTAP) or pair a row store with a columnar analytics copy.

## Pitfalls (in understanding/using)

- Using a **columnar** store for **transactional** single-row read/write workloads — slow; use a row store (OLTP).
- Doing many **small inserts/updates** into columnar storage — batch loads instead (columnar loves bulk append).
- `SELECT *` on a wide columnar table — defeats the "read only needed columns" advantage.
- Ignoring **partitioning/ordering** — physical layout and sort order drive how much data can be skipped.
- Expecting row-store-like point-lookup latency from an analytics engine.
