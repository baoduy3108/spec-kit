---
name: how-time-series-databases-work
description: How time-series databases work — optimizing for timestamped append-heavy data, time-based partitioning, columnar+delta compression, downsampling/rollups and retention/TTL, and why general databases struggle with metrics/IoT/monitoring data. Use to understand time-series databases (InfluxDB/Prometheus/TimescaleDB), metrics storage, or handling high-volume timestamped data.
category: engineering
keywords_vi: time series database, cơ sở dữ liệu chuỗi thời gian, dữ liệu theo thời gian append, phân vùng theo thời gian, nén delta, downsampling rollup, retention ttl, metrics iot monitoring
---

# How Time-Series Databases Work

A time-series database (TSDB) is specialized for **timestamped data that arrives continuously and append-mostly** — metrics, monitoring, IoT sensor readings, financial ticks, logs. General databases can store this, but TSDBs (InfluxDB, Prometheus, TimescaleDB, ClickHouse) are far more efficient at the scale and access patterns this data implies.

## What Makes Time-Series Data Special

- **Append-heavy, rarely updated** — new points stream in with increasing timestamps; old points almost never change. (Very different from OLTP row updates.)
- **Enormous volume** — thousands of sensors/metrics each writing every second → billions of points.
- **Time-bounded queries** — you query **ranges** ("CPU over the last hour," "sales this quarter") and **aggregate** (avg/max/percentiles over time buckets), rarely single points.
- **Recent data is hot; old data is cold** and often can be summarized or dropped.
TSDBs are built around exactly these properties.

## Time-Based Partitioning

Data is partitioned into **time chunks** (e.g. per day/hour). This makes range queries fast (touch only the relevant chunks), makes **retention** trivial (drop a whole old chunk cheaply — see below), and keeps recent (hot) chunks small and fast. Writes always hit the latest chunk sequentially — friendly to append-optimized storage (often LSM-tree-based, see how-lsm-trees-work).

## Compression (huge wins)

Time-series data compresses extraordinarily well because consecutive points are similar:
- **Delta / delta-of-delta encoding** — store the tiny difference between consecutive timestamps/values instead of full numbers (timestamps at fixed intervals compress to almost nothing).
- **Columnar layout** (see how-columnar-storage-works) + specialized codecs (Gorilla-style) → often 10× or better compression versus raw.
This is essential to store billions of points affordably.

## Downsampling, Rollups & Retention

You don't need per-second resolution for last year's data. TSDBs support:
- **Downsampling / rollups** — precompute aggregates (hourly/daily averages) so long-range dashboards query small summaries, not raw points.
- **Retention policies / TTL** — automatically expire raw data after a period (drop the old time chunks), keeping storage bounded while retaining rollups. This lifecycle (keep raw briefly, summaries long-term) is core to TSDB operation.

## Query Features

TSDBs offer time-aware querying: time-bucketed aggregation (`GROUP BY time(5m)`), gap filling, interpolation, rate/derivative functions, and percentiles — tuned for metrics/monitoring (Prometheus's PromQL, InfluxDB's Flux/InfluxQL).

## Pitfalls (in understanding/using)

- Storing high-volume metrics in a **general OLTP database** → slow, bloated; use a TSDB.
- **High cardinality** — too many unique tag/label combinations (e.g. per-user-per-request labels) explodes index size and kills performance (a classic Prometheus/Influx pitfall). Keep label cardinality bounded.
- Keeping **raw high-resolution** data forever — use downsampling + retention.
- Updating/deleting individual old points frequently — TSDBs assume append-mostly; heavy updates fight the design.
- Expecting transactional/relational features — TSDBs trade those for time-series performance.
- Ignoring write batching — batch points for efficient ingestion.
