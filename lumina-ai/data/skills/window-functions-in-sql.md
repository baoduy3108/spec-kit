---
name: window-functions-in-sql
description: SQL window functions — computing running totals, rankings, moving averages, and row-to-row comparisons across a set of rows without collapsing them like GROUP BY does, using OVER/PARTITION BY/ORDER BY. Use to write running totals, rankings (ROW_NUMBER/RANK), lag/lead comparisons, moving averages, or understand OVER and PARTITION BY.
category: engineering
keywords_vi: window function sql, hàm cửa sổ, running total tổng lũy kế, xếp hạng row_number rank, moving average trung bình trượt, so sánh dòng lag lead, over partition by không gộp dòng
---

# SQL Window Functions

Window functions let you compute values **across a set of related rows** — running totals, rankings, moving averages, comparisons to the previous/next row — **without collapsing those rows** the way `GROUP BY` does. They're one of SQL's most powerful features for analytics, and understanding `OVER` unlocks queries that are painful or impossible otherwise (see how-data-warehouses-work).

## The Problem: GROUP BY Collapses Rows

`GROUP BY` with aggregates (`SUM`, `AVG`, `COUNT`) **reduces** many rows to one per group — you get the total, but you **lose the individual rows**. But often you want **both**: each row *and* an aggregate computed over related rows. "Show each sale **and** the running total up to it," or "each employee **and** their rank within their department." You can't do that with `GROUP BY` (it threw the rows away). Window functions keep every row and attach a computed value.

## The Core Idea: A "Window" of Rows per Row

A window function computes over a **window** — a set of rows related to the current row — defined by the `OVER` clause, while **returning every input row**:
```
SUM(amount) OVER (PARTITION BY customer_id ORDER BY date)
```
- **`OVER (...)`** — marks it as a window function and defines the window.
- **`PARTITION BY`** — divides rows into groups (like GROUP BY, but rows are **kept**); the function resets per partition. (Omit it → the whole result is one partition.)
- **`ORDER BY`** (inside OVER) — orders rows within the partition, which matters for running/ranking calculations.
- **Frame** (`ROWS BETWEEN ...`) — optionally narrows the window to a range of rows around the current one (e.g. last 3 rows for a moving average).

So each row gets an aggregate computed over its window, and **no rows disappear**.

## The Main Functions

- **Ranking** — `ROW_NUMBER()` (unique sequential number), `RANK()` (ties share a rank, leaves gaps), `DENSE_RANK()` (ties share, no gaps), `NTILE(n)` (buckets). Great for "top N per group", deduplication, percentiles.
- **Offset / row comparison** — `LAG(col)` / `LEAD(col)` access the **previous/next** row's value — perfect for period-over-period differences ("this month vs last month") without a self-join.
- **Aggregates as windows** — `SUM`, `AVG`, `COUNT`, `MIN`, `MAX` with `OVER` → **running totals**, **moving averages**, group totals alongside each row.
- **First/last** — `FIRST_VALUE`, `LAST_VALUE`, `NTH_VALUE` within the window.

## Common Uses

- **Running total** — `SUM(x) OVER (ORDER BY date)`.
- **Top N per group** — `ROW_NUMBER() OVER (PARTITION BY group ORDER BY metric DESC)` then filter `= 1..N`.
- **Moving average** — `AVG(x) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)`.
- **Period-over-period** — `value - LAG(value) OVER (ORDER BY period)`.
- **Deduplication** — number rows per key, keep row 1.

## Pitfalls (in understanding/using)

- Reaching for **self-joins or subqueries** for running totals/rankings when a window function is far simpler and faster.
- Forgetting **`ORDER BY` inside `OVER`** for running/ranking functions → undefined/incorrect order.
- Confusing `PARTITION BY` (inside OVER, keeps rows) with `GROUP BY` (collapses rows) — they're different.
- `LAST_VALUE` surprising results — the default frame is up to the **current** row, so it isn't the partition's last value unless you set the frame to the full partition.
- Using window functions in a **`WHERE`** clause → not allowed; they're computed after WHERE, so wrap in a subquery/CTE to filter on them (e.g. `WHERE rn = 1`).
- Mixing up **`RANK`** (gaps on ties) vs **`DENSE_RANK`** (no gaps) vs **`ROW_NUMBER`** (always unique).
- Ignoring the **frame clause** for moving windows → getting a full running aggregate when you wanted a sliding one.
