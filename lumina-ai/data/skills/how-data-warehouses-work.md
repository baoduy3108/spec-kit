---
name: how-data-warehouses-work
description: How data warehouses work — OLAP vs OLTP, dimensional modeling (star/snowflake schemas, facts and dimensions), ETL/ELT loading, separation of storage and compute, and how they differ from data lakes/lakehouses. Use to understand data warehouses, OLAP, star schema, ETL vs ELT, or analytics data architecture.
category: engineering
keywords_vi: data warehouse, kho dữ liệu, olap vs oltp, dimensional modeling star schema, fact dimension, etl elt, data lake lakehouse, phân tích dữ liệu
---

# How Data Warehouses Work

A data warehouse is a system optimized for **analytics** — running big aggregate queries across huge volumes of historical data to answer business questions ("revenue by region by month"). It's architecturally different from the databases that run your app.

## OLAP vs OLTP (the core distinction)

- **OLTP** (Online Transaction Processing) — your app's database (Postgres/MySQL). Optimized for many small, fast **transactions**: insert an order, fetch a user. Row-oriented, normalized, low-latency single-row operations.
- **OLAP** (Online Analytical Processing) — the warehouse. Optimized for **few but massive analytical queries**: scan/aggregate millions of rows across a few columns. Columnar (see how-columnar-storage-works), denormalized, high-throughput scans.
Running heavy analytics on your OLTP database slows the app and is inefficient; warehouses exist to separate these workloads.

## Dimensional Modeling: Star Schema

Warehouses model data for **query simplicity and speed**, not transactional normalization:
- **Fact tables** — the measurable events/metrics (a sale, a click), with foreign keys and numeric measures (amount, quantity). Big, append-mostly.
- **Dimension tables** — the descriptive context (customer, product, date, store) you slice/filter by.
Arranged as a **star schema** (a central fact table surrounded by dimensions), this is intuitive for analysts and fast to join/aggregate. A **snowflake schema** normalizes dimensions further (more joins, less redundancy). Denormalization is intentional here — trading storage/redundancy for query speed and simplicity.

## Loading Data: ETL vs ELT

Data flows in from many sources (app DBs, logs, SaaS APIs):
- **ETL** (Extract, Transform, Load) — transform data **before** loading (classic; transformation in a separate engine).
- **ELT** (Extract, Load, Transform) — load raw data first, then transform **inside** the powerful warehouse (modern; tools like dbt). ELT leverages the warehouse's compute and keeps raw data for reprocessing.
Either way, data is cleaned, conformed, and shaped into the analytical model on a schedule (batch) or continuously.

## Modern Architecture: Storage/Compute Separation

Cloud warehouses (Snowflake, BigQuery, Redshift) **separate storage from compute** — data sits in cheap object storage; you spin up compute independently and scale it per workload. This lets you store enormous history cheaply and pay for compute only when querying, and scale query power elastically.

## Warehouse vs Data Lake vs Lakehouse

- **Data lake** — raw files (often Parquet) in object storage; flexible, cheap, schema-on-read, but less structured/governed.
- **Data warehouse** — structured, modeled, governed, fast SQL analytics.
- **Lakehouse** (Databricks/Delta, Iceberg) — combines lake storage with warehouse-like structure/transactions — the converging modern approach.

## Pitfalls (in understanding/using)

- Running heavy **analytics on the OLTP** app database — hurts app performance; use a warehouse.
- Over-normalizing the warehouse like an OLTP schema — defeats analytical speed; use star schemas.
- Treating the warehouse as **real-time** — it's typically batch/near-real-time; use streaming for low latency (see stream-processing).
- Dumping raw data into a "lake" with no governance → a **data swamp** nobody trusts.
- Ignoring cost — elastic compute and full scans can get expensive; partition, cluster, and limit `SELECT *`.
- Confusing ETL/ELT ordering — modern cloud favors ELT (transform in-warehouse).
