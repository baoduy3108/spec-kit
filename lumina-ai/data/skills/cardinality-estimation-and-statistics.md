---
name: cardinality-estimation-and-statistics
description: Why the query optimizer's most important guess is "how many rows will this produce?" — cardinality estimation — and how it uses table statistics (histograms, distinct counts) to make it. Covers why bad estimates cause catastrophic plans (wrong join order/algorithm), the independence/uniformity assumptions that fail on correlated or skewed data, and how stale stats wreck performance. Use to understand ANALYZE, histograms, and why one query suddenly goes slow.
category: databases
keywords_vi: ước lượng lực lượng cardinality estimation đoán số dòng mỗi bước, thống kê bảng histogram và số giá trị phân biệt distinct, ước lượng sai gây kế hoạch thảm hoạ sai thứ tự join sai thuật toán, giả định độc lập và đồng đều sai trên dữ liệu tương quan lệch, thống kê cũ stale làm chậm đột ngột, chạy analyze cập nhật thống kê
---

# Cardinality Estimation & Statistics

The single most consequential number a cost-based query optimizer computes is **cardinality**: *how many rows will each operation produce?* Every downstream decision — which join algorithm, what join order, whether to use an index — depends on it. If the optimizer thinks a step yields 10 rows but it actually yields 10 million, it picks a plan that's catastrophically wrong (a nested-loop join that becomes billions of iterations). Cardinality estimation, driven by **table statistics**, is where good and bad query performance is really decided (see how-query-optimizers-work, join-algorithms-hash-merge-nested-loop, how-database-indexes-work).

## How Estimation Works

The optimizer can't run the query to count rows, so it **estimates** from precomputed **statistics** about the data:
- **Row counts** per table.
- **Number of distinct values (NDV)** per column — used to estimate equality selectivity (`col = x` ≈ rows / NDV).
- **Histograms** — the distribution of values in a column (equi-width or equi-depth buckets), so range predicates (`col BETWEEN a AND b`) and skew can be estimated instead of assuming uniformity.
- **Most-common-values (MCV)** lists — exact frequencies for skewed hot values.
- **Null fractions, correlation** with physical order.

Selectivities are then **combined** across predicates to estimate how many rows survive each filter and join. These stats are gathered by **`ANALYZE`/`UPDATE STATISTICS`**, usually sampled (not a full scan), and refreshed periodically.

## Why Estimates Go Wrong (and plans blow up)

Estimation relies on assumptions that real data violates:
- **Uniformity** — histograms help, but within a bucket values are assumed even; heavy skew still misleads.
- **Independence** — the killer. To combine `WHERE city='Paris' AND country='France'`, the optimizer multiplies selectivities **as if independent**. But they're **correlated** (Paris implies France), so it massively **underestimates** the result — leading to a plan sized for a few rows that must process many. Correlated columns are the classic cause of bad plans; **extended/multi-column statistics** exist to fix specific cases.
- **Stale statistics** — after a big load/delete, stats describe **old** data; the optimizer estimates against a table that no longer exists → wrong plans. A query that was fast "suddenly" goes slow after data changes and stats lag.
- **Estimation error compounds** — errors multiply up a deep join tree, so deep queries are especially fragile.

## Design Guidance (for understanding/using)

- **Keep statistics fresh** — ensure `ANALYZE`/auto-analyze runs after significant data changes; stale stats are a top cause of sudden slowdowns.
- **Read `EXPLAIN ANALYZE`** — compare **estimated vs actual** rows per node; a big divergence pinpoints the bad estimate causing the bad plan.
- **Fix correlation** — create **multi-column/extended statistics** (or restructure predicates) when correlated columns cause underestimates.
- **Raise the histogram/sample resolution** for skewed columns that estimate poorly.
- **Suspect cardinality, not the engine**, when a plan is bizarre — it usually believed a wrong row count.

## Pitfalls (in understanding/using)

- Assuming the optimizer "knows" row counts → it **estimates** from sampled stats and can be very wrong.
- Ignoring **stale stats** → the #1 "it was fast yesterday" regression after data changes.
- Correlated predicates with default per-column stats → **independence assumption** underestimates → nested-loop blowups.
- Trusting the plan without checking **estimated vs actual** rows → you miss the root cause.
- Over-relying on hints to force plans instead of fixing the **statistics** the optimizer reasons from.
