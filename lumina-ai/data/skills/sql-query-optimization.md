---
name: sql-query-optimization
description: Write and tune SQL for correctness and speed — read the query plan (EXPLAIN), index the right columns, avoid N+1 and SELECT *, understand join strategies, use set-based over row-by-row logic, paginate with keyset not large OFFSET, and know when to denormalize. Use when a query is slow or when designing queries against a relational database.
category: engineering
keywords_vi: tối ưu sql, query chậm, đánh index, explain query plan, câu truy vấn chậm, tối ưu database, sql chậm, n+1 query
---

# SQL Query Optimization

Most slow queries are missing an index or doing work the database could do better. Diagnose with the plan before guessing.

## Read the Plan First

Run `EXPLAIN` (or `EXPLAIN ANALYZE`) and look for: **sequential/full-table scans** on large tables (usually a missing index), **row estimates** far off from actual (stale statistics — run `ANALYZE`), and expensive **sort/hash** steps. Optimize the step that dominates the cost, not the one that looks scary.

## Indexing

- Index columns used in `WHERE`, `JOIN`, and `ORDER BY`.
- **Composite index column order matters** — put the equality/most-selective column first; a `(a, b)` index helps `WHERE a=? AND b=?` and `WHERE a=?`, but not `WHERE b=?` alone.
- **Covering index** — include all selected columns so the query never touches the table.
- Indexes cost write speed and storage — don't index everything; index for the real queries.
- A function on an indexed column (`WHERE lower(email)=…`) defeats the index unless you have a matching expression index.

## Query Patterns

- **Never `SELECT *`** in application code — fetch only needed columns (enables covering indexes, less I/O).
- **Kill N+1** — one query with a `JOIN`/`IN` beats a loop of per-row queries. This is the single most common ORM performance bug.
- **Set-based over row-by-row** — express logic as one statement over a set, not a cursor loop.
- **Keyset pagination** — `WHERE id > :last ORDER BY id LIMIT n` scales; large `OFFSET` scans and discards every skipped row.
- **Sargable predicates** — keep the indexed column bare on one side (`created_at >= :d`, not `date(created_at) = :d`).

## Joins & Aggregation

Understand which join strategy the planner picked (nested loop for small/indexed, hash for large unindexed, merge for sorted). Filter *before* joining/aggregating where possible. `EXISTS` often beats `IN (subquery)` for large sets. Avoid `SELECT DISTINCT` as a band-aid for an accidental fan-out join — fix the join.

## When Indexes Aren't Enough

Consider a materialized view for expensive repeated aggregations, deliberate denormalization for read-heavy hot paths (accept the write complexity), partitioning for very large time-series tables, and caching at the app layer for identical repeated reads.
