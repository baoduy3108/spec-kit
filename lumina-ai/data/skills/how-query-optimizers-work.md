---
name: how-query-optimizers-work
description: How a database query optimizer works — turning a declarative SQL query into an efficient execution plan by exploring alternatives and picking the cheapest using a cost model and table statistics, plus join ordering, and why stale statistics cause bad plans. Use to understand query planners, cost-based optimization, EXPLAIN plans, join ordering, or why the same query is sometimes slow.
category: engineering
keywords_vi: query optimizer cơ sở dữ liệu hoạt động thế nào, biến sql khai báo thành kế hoạch thực thi hiệu quả, khám phá phương án chọn rẻ nhất, cost model và thống kê bảng, thứ tự join, thống kê cũ gây kế hoạch tệ
---

# How Query Optimizers Work

SQL is **declarative** — you say *what* data you want, not *how* to get it. The **query optimizer** is the database component that figures out the *how*: it turns your query into an efficient **execution plan** by considering many possible strategies and picking the cheapest, using a **cost model** and **statistics** about your data. Understanding it explains `EXPLAIN` plans, why the same query can be fast or slow, and how to help the database (see sql-query-optimization, how-columnar-storage-works).

## The Problem: One Query, Many Ways to Run It

A single SQL query can be executed in **many** different ways that all produce the same result but differ **enormously** in speed: which index (if any) to use, which order to join tables, which join algorithm, whether to sort or hash, whether to scan or seek. The number of possible plans explodes combinatorially. The optimizer's job is to **find a good plan** (not necessarily the perfect one) **quickly**, without running them all.

## The Core Process

Most databases use a **cost-based optimizer**:
1. **Parse & rewrite** — turn SQL into a logical query tree; apply rewrites (push filters down, simplify expressions, flatten subqueries).
2. **Enumerate alternatives** — generate candidate physical plans: different **access paths** (full scan vs index seek), **join algorithms** (nested-loop, hash join, merge join), and **join orders**.
3. **Estimate cost** — for each candidate, use a **cost model** + **statistics** to estimate how expensive it is (rows processed, I/O, CPU, memory).
4. **Pick the cheapest** estimated plan and execute it.
The chosen plan is what `EXPLAIN` shows you.

## Statistics: The Fuel for Good Decisions

The optimizer's estimates rely on **statistics** about the data: table **row counts**, column **value distributions** (histograms), **distinct-value counts**, index selectivity. From these it estimates how many rows each operation will produce (**cardinality estimation**) — the single most important and error-prone part. If it estimates "this filter returns 10 rows" it might pick an index seek; if "10 million rows," a full scan. **Bad cardinality estimates → bad plans.** This is why **stale or missing statistics** are a top cause of sudden slow queries: the data changed but the optimizer is planning against an outdated picture.

## Join Ordering: The Hard Part

The order in which tables are joined dramatically affects cost — joining two small filtered tables first, then the big one, beats the reverse. But the number of possible join orders grows factorially, so optimizers use heuristics and dynamic programming to search a manageable subset. Join ordering + join algorithm choice (hash vs nested-loop vs merge) is often where the biggest wins and losses happen.

## Why the Same Query Can Be Slow

- **Stale statistics** → mis-estimated cardinalities → a bad plan chosen.
- **Parameter sniffing** — a cached plan optimized for one parameter value is reused for a very different value it doesn't suit.
- **Data skew / correlation** the stats don't capture → wrong estimates.
- **Missing indexes** → no good access path to consider.

## Design Guidance

- **Keep statistics fresh** — ensure auto-analyze runs, or update stats after big data changes.
- **Read `EXPLAIN` / `EXPLAIN ANALYZE`** — compare **estimated vs actual** rows; large gaps reveal bad cardinality estimates (the root of most bad plans).
- **Provide good indexes** so the optimizer has efficient access paths to choose.
- **Write sargable queries** so filters can use indexes (see sql-query-optimization).
- **Watch parameter sniffing** — sometimes hints/recompilation help for skewed parameters.
- **Trust but verify** — the optimizer is usually right; when it's not, the fix is often stats/indexes, not fighting it with hints.

## Pitfalls (in understanding/using)

- **Stale/missing statistics** → wrong cardinality estimates → bad plans (the #1 cause of sudden slowdowns).
- Reading only **estimated** rows in EXPLAIN → compare with **actual** (ANALYZE) to spot mis-estimates.
- Blaming the query when the real issue is a **missing index** (no good access path).
- **Parameter-sniffing** surprises — one cached plan misfitting other parameter values.
- Over-using **optimizer hints** to force plans → brittle; fix stats/indexes/schema instead.
- Assuming the optimizer finds the **globally optimal** plan → it finds a good-enough one within a search budget; help it with stats and indexes.
