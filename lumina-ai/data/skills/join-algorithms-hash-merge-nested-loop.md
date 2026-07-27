---
name: join-algorithms-hash-merge-nested-loop
description: How a database physically executes a join — the three core algorithms — nested-loop (good for small/indexed inputs), hash join (best for large unsorted equi-joins), and sort-merge join (great when inputs are sorted or for range/merge). Use to understand why the optimizer picks each, their cost profiles, why a nested loop over big tables is a disaster, memory spilling in hash joins, and reading join nodes in EXPLAIN.
category: databases
keywords_vi: thuật toán join vật lý nested-loop hash join sort-merge, nested loop tốt cho bảng nhỏ hoặc có index, hash join tốt nhất cho equi-join lớn không sắp xếp, sort-merge join khi đầu vào đã sắp xếp hoặc join khoảng, nested loop trên bảng lớn là thảm hoạ, hash join tràn bộ nhớ spill khi bảng băm quá lớn
---

# Join Algorithms: Nested-Loop, Hash, Sort-Merge

`A JOIN B` is a logical request; the database must choose a **physical algorithm** to actually match rows. There are three fundamental ones, each best in different situations, and the optimizer picks based on input sizes, whether indexes/sorts exist, and cardinality estimates. Knowing them explains why a query is fast or catastrophically slow, and how to read a plan (see cardinality-estimation-and-statistics, how-database-indexes-work, buffer-pool-and-page-replacement).

## 1. Nested-Loop Join

For each row of the **outer** table, scan the **inner** table for matches. Cost ≈ **outer rows × inner lookup cost**.
- ✅ **Excellent** when the outer input is **small** and the inner side has an **index** on the join key (then each inner "scan" is a cheap index lookup — an *indexed* nested loop). The workhorse for OLTP point-lookup joins.
- ❌ **Disastrous** when both inputs are large and there's no index: it degenerates to **O(N×M)** — a billion-row cross product. A nested loop chosen because of a **cardinality underestimate** is the classic "query ran for hours" story.

## 2. Hash Join

**Build** an in-memory **hash table** on the join key of the smaller ("build") input, then **probe** it with each row of the larger ("probe") input. Cost ≈ **O(N + M)** — roughly one pass over each.
- ✅ **The best choice for large, unsorted equi-joins** (`ON a.id = b.id`). No index or sort needed.
- ❌ Only works for **equality** joins (hashing needs equality). Needs **memory** for the hash table; if the build side exceeds the memory budget it **spills** to disk (grace/hybrid hash join — partition both sides and join partition-by-partition), which is slower. A too-small work_mem forcing spills is a common tuning issue.

## 3. Sort-Merge Join

**Sort** both inputs by the join key, then **merge** them in a single linear pass (like merging two sorted lists). Cost ≈ **sort cost + O(N + M)**.
- ✅ Great when inputs are **already sorted** (e.g. from an index scan or a prior sort) — then it skips the sort and is very cheap. Handles **range** and merge joins and produces **sorted output** (useful if the query needs an `ORDER BY` anyway).
- ❌ The **sort** is expensive if inputs aren't already ordered; usually loses to hash join for large unsorted equi-joins.

## How the Optimizer Chooses

Roughly: **small/indexed** → indexed nested-loop; **large unsorted equi-join** → hash join; **already-sorted or needs sorted output / range join** → sort-merge. The choice hinges on **cardinality estimates** — which is why a bad estimate (see that skill) picks the wrong algorithm and destroys performance.

## Design Guidance (for understanding/using)

- **Read the join node in `EXPLAIN`** — the algorithm chosen + estimated vs actual rows tells you why it's fast/slow.
- **A nested loop over big tables = red flag** — usually a missing index on the inner join key or a cardinality underestimate.
- **Give hash joins enough work memory** — spills to disk are the common slowdown; tune `work_mem`/equivalent for big joins.
- **Provide indexes/sort order** — an index on the inner key enables cheap indexed nested loops; pre-sorted inputs enable cheap merge joins.
- **Fix estimates first** — the right algorithm follows from right cardinalities; keep statistics fresh.

## Pitfalls (in understanding/using)

- A **nested loop** on two large unindexed tables → O(N×M) blowup; almost always a plan/stats bug.
- Expecting **hash join** for non-equality/range joins → it can't; those go sort-merge or nested-loop.
- Under-provisioned memory → hash join **spills**, silently slow; watch for disk-based hash/sort in the plan.
- Assuming the optimizer always picks right → a bad **cardinality estimate** picks the wrong algorithm.
- Ignoring that sort-merge's cost is **the sort** — cheap only if inputs are already ordered.
