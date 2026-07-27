---
name: predicate-pushdown-and-projection-pruning
description: Two foundational query optimizations that cut data movement early — predicate pushdown (apply filters as close to the data source as possible) and projection pruning (read only the columns you need). Use to understand why filtering/column-selection early beats doing it late, how they enable partition pruning and reading fewer bytes from columnar/Parquet stores, and why SELECT * and late filters are slow.
category: databases
keywords_vi: đẩy điều kiện lọc predicate pushdown xuống gần nguồn dữ liệu nhất, cắt tỉa cột projection pruning chỉ đọc cột cần, lọc sớm hơn tốt hơn lọc muộn giảm dữ liệu di chuyển, cắt phân vùng partition pruning bỏ qua file không khớp, đọc ít byte từ kho cột parquet, select sao và lọc muộn chậm
---

# Predicate Pushdown & Projection Pruning

The fastest data to process is data you **never read**. Two of the most valuable query optimizations both follow this principle by cutting work at the **source** instead of after the fact: **predicate pushdown** (do the filtering early) and **projection pruning** (read only the needed columns). They apply from single databases to distributed query engines and columnar lakes (see how-query-optimizers-work, how-columnar-storage-works, data-lakehouse-and-table-formats).

## Predicate Pushdown: Filter Early

A query like `SELECT ... FROM t WHERE region='EU'` logically filters *after* reading. **Predicate pushdown** moves that `WHERE` **as close to the storage as possible** so rows are discarded before they're read into the engine, sent over the network, or joined:
- **Into the scan** — the storage layer applies the filter while reading, skipping non-matching rows/pages.
- **Partition pruning** — if the table is partitioned by `region`, the engine reads **only the `EU` partition** and skips the rest entirely (huge win on partitioned/sharded data).
- **File/row-group skipping** — columnar formats (**Parquet/ORC**) keep **min/max statistics** per row group; a pushed-down predicate lets the reader **skip whole row groups** whose stats can't match (data skipping / zone maps).
- **Into remote sources** — federated/JDBC/lake queries push the filter to the remote DB/storage so **less data crosses the wire**.
- **Through joins** — filters get pushed below joins so each side is smaller before the (expensive) join.

The win compounds: less I/O, less network, smaller joins, less memory.

## Projection Pruning: Read Only Needed Columns

**Projection pruning** (column pruning) reads **only the columns the query actually uses**, dropping the rest as early as possible. On **row stores** it saves some processing; on **columnar stores** it's dramatic — columns are stored separately, so reading 3 of 200 columns reads ~1.5% of the bytes. This is why `SELECT specific_cols` massively outperforms `SELECT *` on analytical/columnar data: `SELECT *` forces reading every column off disk even if you use two.

## They Reinforce Each Other and Columnar Storage

Together they minimize bytes read: pushdown cuts **rows** (which partitions/row-groups), pruning cuts **columns**. On a Parquet lake, `WHERE date='2024-01' AND ...` + selecting 4 columns can turn a terabyte scan into reading a few gigabytes — the core reason columnar + these optimizations power fast analytics.

## Design Guidance (for understanding/using)

- **Select only the columns you need** — avoid `SELECT *`, especially on columnar/wide tables; it defeats projection pruning.
- **Partition/cluster on common filter columns** — so predicate pushdown becomes partition pruning (skip whole partitions).
- **Write filters the engine can push** — sargable predicates on raw columns push down; wrapping a column in a function (`WHERE lower(x)=...`) or complex expressions can **block** pushdown.
- **Exploit columnar stats** — sort/cluster data so min/max row-group stats enable data skipping.
- **Check the plan** — verify filters appear at the scan (pushed down) and only needed columns are read, not filtered late.

## Pitfalls (in understanding/using)

- `SELECT *` on columnar/wide tables → reads all columns; kills projection pruning.
- Wrapping filter columns in **functions/casts** → predicate can't push down (non-sargable); it filters late after a full read.
- No **partitioning/clustering** on filter keys → the engine can't skip partitions/row-groups; full scans.
- Assuming filters/columns are optimized regardless of how you write them → verify pushdown in `EXPLAIN`.
- Filtering **after** a join that could have been pushed **before** it → the join processes far more rows than needed.
