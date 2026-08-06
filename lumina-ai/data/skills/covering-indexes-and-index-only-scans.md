---
name: covering-indexes-and-index-only-scans
description: How to make a query answer entirely from an index without touching the table — covering indexes and index-only scans. When an index contains every column a query needs (key columns + INCLUDE'd payload), the engine skips the expensive heap/table lookup. Use to understand the index→table (bookmark) lookup cost, INCLUDE columns, why column order matters, and the write/space trade of wide indexes.
category: databases
keywords_vi: index bao phủ covering index và quét chỉ mục index-only scan, index chứa đủ mọi cột truy vấn cần bỏ qua tra bảng, tra cứu heap bookmark lookup từ index sang bảng tốn kém, cột include đính kèm payload ngoài khoá, thứ tự cột trong index quan trọng, đánh đổi ghi và dung lượng của index rộng
---

# Covering Indexes & Index-Only Scans

A normal index lookup has a **hidden second step**. The index finds *which rows* match (by key), but the actual column values usually live in the **table (heap)** — so for each match the engine does a **bookmark/heap lookup** to fetch the row. For a query returning many rows, those random table fetches dominate the cost. A **covering index** eliminates them: if the index already contains **every column the query needs**, the engine answers from the index alone — an **index-only scan** — never touching the table (see how-database-indexes-work, predicate-pushdown-and-projection-pruning, buffer-pool-and-page-replacement).

## The Cost a Covering Index Removes

Consider `SELECT email FROM users WHERE country = 'VN'` with an index on `(country)`:
1. Index scan finds all `country='VN'` entries → gives **row pointers**.
2. For **each** pointer, a **heap lookup** fetches the row to read `email`.

Step 2 is many **random** I/Os. If instead the index is on `(country, email)` — or `(country) INCLUDE (email)` — the index entries **already contain `email`**, so step 2 disappears: the engine reads only the (sorted, compact) index. That's an **index-only scan**, often an order of magnitude faster for such queries.

## Key Columns vs INCLUDE'd Columns

- **Key columns** — participate in **ordering/search** and enable filtering and range scans. Put columns you **filter/join/sort** on here, in the right order.
- **INCLUDE (payload) columns** (SQL Server / Postgres `INCLUDE`) — stored in the leaf level **only to be returned**, not for searching. Use them to "cover" the **SELECT list** columns without bloating the searchable key or affecting key ordering. (Where `INCLUDE` isn't available, you append them as trailing key columns.)

So the recipe for a covering index: **key = the WHERE/JOIN/ORDER BY columns (correct order); INCLUDE = the remaining SELECT columns**.

## Column Order Still Matters

A composite index `(a, b, c)` is usable for predicates on a **leading prefix** (`a`, or `a,b`) — the **leftmost-prefix** rule — and its stored order determines what ranges/sorts it can satisfy. Covering doesn't change this: you still order **key** columns by how they're filtered/sorted; INCLUDE columns are just payload. A covering index that ignores prefix rules won't be used for the filter.

## The Trade-offs

Covering/wide indexes aren't free:
- ❌ **Larger index** (more disk, more buffer-pool memory).
- ❌ **Slower writes** — every INSERT/UPDATE must maintain the index, and updating an INCLUDE'd column now updates the index too.
- ✅ **Much faster reads** for the covered queries.

So cover your **hot, high-value** queries — not every query.

## Design Guidance (for understanding/using)

- **Identify hot read queries** and build an index covering their WHERE + SELECT columns (key = filters/sorts, INCLUDE = returned columns).
- **Order key columns** by equality-filter first, then range/sort — respect the leftmost-prefix rule so the index is actually used.
- **Verify with `EXPLAIN`** — look for **Index-Only Scan** / "Using index" (no heap/key lookup) to confirm it's covering.
- **Don't over-index** — each covering index taxes writes and space; target the queries that matter.
- **(Postgres)** ensure the **visibility map** is fresh (autovacuum) so index-only scans actually skip the heap.

## Pitfalls (in understanding/using)

- Assuming any matching index avoids the table → without covering, each match does a **heap lookup**.
- Putting **SELECT-list** columns as leading **key** columns → bloats the searchable key / wrong order; use `INCLUDE` instead.
- Ignoring the **leftmost-prefix** rule → the index won't serve the filter, covering or not.
- Covering **everything** → write amplification and memory bloat; cover selectively.
- (Postgres) expecting index-only scans while the **visibility map** is stale → it still visits the heap.
