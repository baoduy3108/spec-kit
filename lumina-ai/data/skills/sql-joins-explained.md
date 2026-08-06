---
name: sql-joins-explained
description: Understand SQL joins — inner, left/right/full outer, cross, and self joins; what each returns; how NULLs behave in outer joins; the accidental fan-out (row multiplication) from many-to-many joins; and picking the right join. Use when writing or debugging SQL with joins, or when a query returns too many/few/duplicate rows.
category: engineering
keywords_vi: sql join, inner left right outer join, kết nối bảng sql, join bị nhân đôi dòng, full join cross join, self join, join trả sai số dòng, hiểu join sql
---

# SQL Joins Explained

A join combines rows from two tables based on a related column. The join *type* decides what happens to rows that have no match — which is where most join bugs live.

## The Types

- **INNER JOIN** — only rows with a match in **both** tables. Non-matching rows are dropped. The default and most common; use when you want only related pairs.
- **LEFT (OUTER) JOIN** — **all** rows from the left table, plus matching right-table columns; where there's no match, the right columns are **NULL**. Use for "all customers, and their orders if any" — customers with zero orders still appear. The workhorse for "keep everything on this side."
- **RIGHT JOIN** — the mirror (all right rows). Rarely used — people just flip the tables and use LEFT.
- **FULL OUTER JOIN** — all rows from **both** sides; NULLs fill wherever either side has no match. Use to see everything and find unmatched rows on either side.
- **CROSS JOIN** — every row of A paired with every row of B (Cartesian product). Rarely intentional; usually an accident (a missing join condition).
- **SELF JOIN** — a table joined to itself (employees → their managers, hierarchies).

## NULLs in Outer Joins (a common gotcha)

In a LEFT join, unmatched right-side columns are NULL. Two consequences: (1) to **find rows with no match** ("customers with no orders"), filter `WHERE right.id IS NULL`. (2) Putting a condition on the right table in the `WHERE` clause **turns a LEFT join back into an INNER join** (NULLs fail the condition) — if you want to keep unmatched left rows, put the right-table condition in the `ON` clause, not `WHERE`.

## The Fan-Out (row multiplication)

If the join key isn't unique on the "other" side, each left row matches **multiple** right rows, so rows **multiply** — a one-to-many join returns more rows than the left table has, and worse, a **many-to-many** join multiplies both. This silently inflates counts and **breaks aggregates** (a `SUM` double-counts). Symptoms: "my query returns duplicates" or "the totals are too high." Fixes: aggregate before joining, join on unique keys, or use `EXISTS`/a subquery instead of a join when you only need to test existence (don't reach for `SELECT DISTINCT` to paper over an accidental fan-out — fix the join).

## Choosing

- Need only matched pairs → **INNER**.
- Need all of one side regardless of matches → **LEFT** (put that table on the left).
- Need to find unmatched rows → **LEFT/FULL** + `IS NULL`.
- Need everything from both → **FULL OUTER**.
Ensure join columns are **indexed** (unindexed joins on big tables are slow — see sql-query-optimization).

## Pitfalls

- **Wrong type** (INNER when you needed LEFT) → silently dropping rows.
- **Right-table filter in WHERE** demoting a LEFT join to INNER.
- **Fan-out** from non-unique keys → duplicated rows and inflated aggregates.
- **Missing join condition** → accidental CROSS JOIN (huge result).
- Forgetting NULLs don't compare with `=` (use `IS NULL`).
