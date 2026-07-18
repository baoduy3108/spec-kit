---
name: materialized-views
description: How materialized views work — precomputing and storing the result of an expensive query so reads are fast, versus regular (virtual) views, the freshness/refresh trade-off (on-demand, scheduled, incremental), and when to use them. Use to understand materialized views, precomputed query results, speeding up expensive aggregations, or view vs materialized view.
category: engineering
keywords_vi: materialized view, khung nhìn cụ thể hóa, precompute lưu kết quả query, view ảo vs materialized, làm mới refresh freshness, tăng tốc aggregation đắt, đánh đổi tươi mới
---

# Materialized Views

A materialized view **stores the precomputed result** of a query physically, so reading it is fast — instead of recomputing an expensive query every time. It's a caching technique built into the database, trading storage and freshness for read speed.

## View vs Materialized View

- A **regular (virtual) view** is a **saved query** — a named alias. Every time you read it, the database **runs the underlying query fresh**. Always up-to-date, but if the query is expensive (big joins, aggregations), every read pays that cost.
- A **materialized view** **runs the query once and stores the result** as an actual table. Reads just fetch the stored rows — **fast**, no recomputation. But the stored result gets **stale** as the underlying data changes, until refreshed.
The trade: virtual = always fresh, slow; materialized = fast, potentially stale.

## When to Use One

Materialized views shine when:
- The query is **expensive** (heavy aggregations, multi-table joins, analytics rollups).
- It's **read far more often than the data changes** (read-heavy dashboards, reports, leaderboards, summary tables).
- **Slightly stale data is acceptable** (a dashboard that's a few minutes behind is usually fine).
Classic uses: analytics/reporting summaries (see how-data-warehouses-work), precomputed aggregates, denormalized read models (see event-sourcing-cqrs), leaderboards.

## The Refresh Problem (the core trade-off)

Since the stored result goes stale, you must **refresh** it — and *when/how* is the key decision:
- **On-demand / scheduled full refresh** — recompute the whole thing periodically (e.g. every 5 min / nightly). Simple; freshness = the interval. Expensive if the query is huge and refreshed often.
- **Incremental / continuous refresh** — update only the parts affected by changed data (some databases support incremental materialized views; or you maintain it via triggers/CDC — see how-change-data-capture-works). Fresher and cheaper per update, but more complex.
- **Concurrent refresh** — refresh without locking readers (e.g. Postgres `REFRESH MATERIALIZED VIEW CONCURRENTLY`).
Pick the refresh strategy by how fresh the data must be versus the cost of refreshing.

## Materialized View vs Application Cache

A materialized view is essentially a **database-managed cache** of a query. Compared to caching in Redis/app memory (see caching-strategies): the DB keeps it consistent with its own refresh, it's queryable with SQL (you can index/join it), but it's less flexible than an app cache. Choose based on where the read happens and how you refresh.

## Pitfalls (in understanding/using)

- Using one where you need **always-current** data — materialized views are stale between refreshes; use a regular view or query directly.
- **Refreshing too often** on an expensive query → the refresh cost negates the benefit (or hammers the DB).
- **Refreshing too rarely** → users see unacceptably stale data.
- **Full refresh locking** the view during rebuild → readers blocked; use concurrent/incremental refresh.
- Forgetting to **index** the materialized view (it's a table — index it for the read patterns).
- Treating it as a silver bullet — it's a cache with a **staleness** trade-off; reason about freshness explicitly.
- Storage cost of many/large materialized views (they duplicate data).
