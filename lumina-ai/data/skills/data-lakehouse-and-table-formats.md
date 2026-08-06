---
name: data-lakehouse-and-table-formats
description: How the lakehouse and open table formats (Iceberg, Delta Lake, Hudi) work — bringing database reliability (ACID transactions, schema evolution, time travel) to cheap object-storage data lakes via a metadata layer over Parquet files. Use to understand the lakehouse, Apache Iceberg/Delta/Hudi, ACID on data lakes, time travel, or lake vs warehouse vs lakehouse.
category: engineering
keywords_vi: lakehouse và table format mở, iceberg delta hudi, đưa độ tin cậy database vào data lake, acid transaction schema evolution time travel, lớp metadata trên parquet, lake vs warehouse vs lakehouse
---

# The Lakehouse and Open Table Formats

The **lakehouse** combines the low-cost, open storage of a **data lake** with the **reliability and features of a data warehouse** — ACID transactions, schema management, time travel — achieved by open **table formats** (Apache **Iceberg**, **Delta Lake**, Apache **Hudi**) that add a smart **metadata layer** over plain files in object storage. It resolves the long-standing lake-vs-warehouse trade-off (see how-data-warehouses-work, how-columnar-storage-works).

## The Problem: Lakes Are Cheap but Unreliable; Warehouses Reliable but Rigid

- **Data lakes** — dump files (Parquet/ORC) into cheap object storage (S3/GCS). Flexible, cheap, open, scalable — but a "pile of files" has **no transactions**, no consistent schema, no safe concurrent writes; readers can see half-written data, and updates/deletes are painful. Prone to becoming a "data swamp."
- **Data warehouses** — reliable, ACID, fast, structured — but proprietary, expensive, and couple storage to compute (see how-data-warehouses-work).
The lakehouse asks: can we get warehouse **reliability** on top of lake **storage**?

## The Core Idea: A Metadata Layer Over Files

Open table formats keep data as ordinary columnar files (Parquet) in object storage, but add a **transaction/metadata layer** that tracks **which files make up a table** at each point in time:
- A **table** is defined by a manifest/log of the files (and their statistics) that constitute its current state — not "whatever files are in this folder."
- Writes create **new** files and **atomically** update the metadata to a new **snapshot** — so readers always see a consistent version, never a half-written mess.
This metadata layer is what unlocks database features on a lake.

## What It Unlocks

- **ACID transactions** — atomic, consistent commits; safe **concurrent** writes (no corruption from simultaneous jobs).
- **Time travel / snapshots** — query the table **as of** a past version/timestamp; roll back a bad write; reproduce yesterday's report. (Each commit is a snapshot in the metadata.)
- **Schema evolution** — add/rename/drop/reorder columns safely, tracked in metadata, without rewriting all data.
- **Efficient updates/deletes/upserts (MERGE)** — row-level changes (needed for GDPR deletion, CDC — see how-change-data-capture-works) without rewriting whole partitions.
- **Partition evolution & hidden partitioning** (Iceberg) — change partitioning without rewriting; queries prune files via metadata statistics (see data-partitioning-strategies).
- **Decoupled, open compute** — many engines (Spark, Trino, Flink, DuckDB) read/write the same open table; no lock-in.

## The Three Formats

- **Apache Iceberg** — designed for huge tables and correctness; strong partition/schema evolution; engine-agnostic; rising as the open standard.
- **Delta Lake** — a transaction log over Parquet; tight Spark/Databricks integration; widely used.
- **Apache Hudi** — strong at **streaming upserts** and incremental processing (record-level indexes).
They share the core idea (metadata/transaction layer over Parquet); they differ in design emphasis and ecosystem.

## Design Guidance

- **Use a table format**, not raw file folders, for any lake you update or query seriously — it prevents the "data swamp."
- **Leverage time travel** for reproducibility, audits, and rollback.
- **Use MERGE/upserts** for CDC and compliance deletes instead of rewriting partitions.
- **Compaction / file sizing** — many small files hurt performance; compact them (a maintenance job).
- **Pick by ecosystem** — Iceberg for open/multi-engine, Delta for Spark/Databricks, Hudi for heavy streaming upserts.

## Pitfalls (in understanding/using)

- Treating a lake as **raw file folders** → no ACID, inconsistent reads, a data swamp; use a table format.
- **Small-files problem** → thousands of tiny files kill performance; run compaction.
- Ignoring **metadata/snapshot growth** → old snapshots/manifests pile up; expire/clean them.
- Expecting warehouse-level **low-latency** on huge lakehouse tables without tuning (partitioning, compaction, statistics).
- Assuming formats are fully **interchangeable** → they overlap but differ; mixing engines needs care.
- Forgetting the lakehouse is **storage+metadata** — you still need a query engine (Spark/Trino/etc.) on top.
