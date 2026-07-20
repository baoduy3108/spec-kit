---
name: data-pipelines-etl
description: Design data pipelines — ETL vs ELT, batch vs streaming, idempotent and incremental processing, orchestration and dependencies (DAGs), data quality checks, schema evolution, and handling failures/backfills. Use when building a data pipeline moving data between systems, or reasoning about ETL/data-engineering design.
category: engineering
keywords_vi: data pipeline, etl elt, đường ống dữ liệu, batch streaming, orchestration, incremental, backfill, kỹ thuật dữ liệu data engineering
---

# Data Pipelines & ETL

A data pipeline moves and transforms data from sources (apps, APIs, files) into destinations (a warehouse, lake, or another system) reliably and repeatedly. Data engineering is mostly making this trustworthy at scale.

## ETL vs ELT

- **ETL** (Extract → Transform → Load) — transform data *before* loading into the destination. Classic for structured warehouses with limited compute.
- **ELT** (Extract → Load → Transform) — load raw data first, then transform *inside* the destination (a modern warehouse like BigQuery/Snowflake with cheap compute). More flexible — keep the raw data and re-transform as needs change; the dominant modern pattern.

## Batch vs Streaming

- **Batch** — process data in chunks on a schedule (hourly/daily). Simpler, efficient, fine when some latency is acceptable (reports, analytics). Most pipelines.
- **Streaming** — process events continuously as they arrive (Kafka + stream processors) for near-real-time needs (fraud, live dashboards). More complex; use only when the latency requirement demands it (see stream-processing).

## Core Design Principles

- **Idempotent & re-runnable** — running the pipeline twice must not duplicate or corrupt data (see idempotency). Failures happen; you must be able to safely re-run. Use upserts/merge keyed on a stable id.
- **Incremental over full reload** — process only new/changed data (by timestamp/id watermark) rather than reprocessing everything each run — far cheaper and faster at scale. Keep track of "where you left off."
- **Backfills** — the ability to reprocess a historical range (after a bug or schema change) without breaking current data. Design for it.
- **Orchestration (DAGs)** — pipelines are graphs of dependent steps; an orchestrator (Airflow, Dagster, etc.) runs them in order, handles retries, schedules, and dependencies. Model the dependencies explicitly (see topological-sort).

## Data Quality & Schema

- **Validate at ingestion** — schema, types, ranges, nulls, referential integrity (see data-cleaning); quarantine/alert on bad data rather than silently propagating it (garbage compounds downstream).
- **Handle schema evolution** — upstream sources change columns/types; design for additive changes and version schemas (see event-sourcing-cqrs for the same idea).
- **Track lineage** — know where each dataset came from and what depends on it (for debugging and impact analysis).

## Reliability

Expect failures: retries with backoff, dead-lettering bad records, alerting on failures *and* on silent anomalies (row counts way off, freshness stale), and monitoring **data freshness/completeness**, not just "did the job run." A pipeline that "succeeds" but produces wrong/stale data is worse than one that fails loudly.

## Pitfalls

- **Non-idempotent** pipelines → duplicates/corruption on re-run.
- **Full reloads** where incremental would do → slow and expensive at scale.
- **No data-quality checks** → bad data silently corrupts everything downstream.
- **No backfill strategy** → can't fix historical data.
- Monitoring only "job ran" not "data is correct/fresh."
- **Schema changes** upstream breaking the pipeline unexpectedly.
