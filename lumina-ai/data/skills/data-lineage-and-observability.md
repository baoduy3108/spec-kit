---
name: data-lineage-and-observability
description: How data lineage and observability work — tracking where data comes from and flows (column/table-level lineage), and monitoring data health (freshness, volume, schema, distribution) to catch broken or wrong data before it reaches dashboards/models. Use to understand data lineage, data observability, data quality monitoring, impact analysis, or debugging bad data.
category: engineering
keywords_vi: data lineage, data observability, lineage cấp cột, freshness volume schema distribution, theo dõi dữ liệu đến từ đâu, giám sát sức khỏe dữ liệu, bắt dữ liệu sai âm thầm, impact analysis dữ liệu
---

# Data Lineage and Observability

As data pipelines grow into tangled webs of tables feeding tables feeding dashboards and models, two questions become critical: **"where did this data come from and what depends on it?"** (lineage) and **"is this data healthy or broken?"** (observability). Together they let you trust data, debug it fast, and assess the impact of changes (see data-pipelines-etl, data-contracts-and-schema-evolution, observability-and-instrumentation).

## Data Lineage: The Map of Data Flow

**Lineage** tracks how data moves and transforms through your systems — a graph of "this table is built from those tables via this transformation, and feeds these dashboards/models":
- **Table-level lineage** — which datasets derive from which.
- **Column-level lineage** — which specific **columns** feed which downstream columns (finer, more powerful).
Why it matters:
- **Impact analysis** — before changing/deprecating a source, see **everything** downstream that would break (essential for safe schema changes — see data-contracts-and-schema-evolution).
- **Root-cause debugging** — when a dashboard shows wrong numbers, trace **upstream** to find where it went wrong.
- **Trust & discovery** — understand where a metric actually comes from (is this "revenue" the one I think?).
- **Compliance** — trace where personal data flows (for GDPR/deletion — see data-retention-and-deletion).
Lineage is often auto-extracted by parsing SQL/pipeline code.

## Data Observability: Is the Data Healthy?

Like application observability (see observability-and-instrumentation) but for **data quality** — continuously monitoring the **health** of datasets to catch problems **before** they reach consumers. The common pillars ("the five"):
- **Freshness** — is the data up to date, or did the pipeline stop updating it? (Stale data silently shown as current is a classic failure.)
- **Volume** — did the expected number of rows arrive? A sudden drop (or spike) signals a broken/duplicated load.
- **Schema** — did the structure change unexpectedly (a column dropped/retyped upstream)?
- **Distribution** — are the **values** in a sane range? (Nulls spiking, a metric suddenly 10× off, negative ages.)
- **Lineage** — the map that ties issues to their blast radius.
The goal: **detect bad data automatically** (anomaly detection, tests, thresholds) and alert, rather than a stakeholder discovering a broken dashboard.

## Why It Matters: Silent Data Problems

The scary thing about data bugs is they're often **silent** — the pipeline "succeeds," the dashboard renders, but the numbers are **wrong** (a join dropped rows, a source changed units, an upstream field went null). No error is thrown. Observability surfaces these; lineage lets you trace and fix them fast. Without both, you find out when an executive makes a decision on bad data.

## Design Guidance

- **Capture lineage** (table + ideally column level) — automate it from your SQL/pipeline definitions.
- **Do impact analysis** before schema/source changes using lineage.
- **Monitor the five pillars** — freshness, volume, schema, distribution, lineage — with automated tests/anomaly detection.
- **Test data like code** — assertions on row counts, null rates, ranges, uniqueness, referential integrity (dbt tests, Great Expectations).
- **Alert on data health**, and route bad data to quarantine (see dead-letter-queues) rather than into dashboards.
- **Ownership** — each dataset has an owner accountable for its health.

## Pitfalls (in understanding/using)

- **Silent data errors** (pipeline "succeeds" but data is wrong) → the most dangerous; monitor distribution/volume, not just job success.
- **Stale data shown as fresh** → monitor freshness explicitly.
- No **lineage** → can't do impact analysis (changes break unknown downstreams) or root-cause bad data.
- Monitoring only **job success/failure** → misses wrong-but-completed loads.
- **No data tests** → schema/quality regressions slip through to consumers.
- Finding out about bad data from **stakeholders**, not alerts → observability gap.
- Column-meaning drift with no lineage/contract → wrong metrics that look right.
