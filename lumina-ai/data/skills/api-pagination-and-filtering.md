---
name: api-pagination-and-filtering
description: Design list endpoints that scale — offset vs cursor (keyset) pagination and their trade-offs, stable ordering, returning page metadata, and consistent filtering/sorting/field-selection conventions. Use when building or reviewing a REST/list API that returns collections.
category: engineering
keywords_vi: phân trang api, pagination, offset cursor keyset, lọc filter sắp xếp api, list endpoint, trả về nhiều bản ghi, api danh sách
---

# API Pagination & Filtering

Never return an unbounded list — always paginate. The choice of pagination style determines whether your API stays fast as data grows.

## Offset vs Cursor (keyset)

- **Offset pagination** (`?page=3&limit=20` / `LIMIT 20 OFFSET 40`) — simple, allows jumping to page N, shows total pages. But the database must **scan and discard** all skipped rows, so deep pages get slow (page 10000 scans 200k rows), and inserts/deletes shift rows so items get **skipped or duplicated** across pages.
- **Cursor / keyset pagination** (`?after=<cursor>&limit=20` → `WHERE (sort_key, id) > (:last) ORDER BY sort_key, id LIMIT 20`) — encodes "where the last page ended"; the DB seeks directly with an index, **O(1) regardless of depth**, and is stable under concurrent inserts. The cost: no random page jumps, no easy total count.

**Default to cursor pagination** for large/growing or real-time data (feeds, logs, timelines). Offset is fine for small, stable, admin-style lists where "go to page N" matters.

## Getting It Right

- **Stable, total ordering** — always order by something unique (append the primary key as a tiebreaker); otherwise rows with equal sort values reorder between pages and items leak or repeat.
- **Return metadata** — for cursor: `nextCursor` + `hasMore`; for offset: `total`, `page`, `pageSize`. Make the cursor opaque (base64) so clients don't depend on its internals.
- **Cap the page size** — enforce a max `limit` (e.g. 100); never let a client request "all."

## Filtering, Sorting, Field Selection

- **Filtering** — consistent query params (`?status=active&created_after=…`); validate and whitelist filterable fields; ensure filtered columns are indexed (unindexed filters + pagination = full scans).
- **Sorting** — `?sort=-created_at` (a convention for direction); whitelist sortable fields; every sort needs a tiebreaker for stable pagination.
- **Field selection / sparse fieldsets** — `?fields=id,name` to reduce payload; helps mobile/bandwidth.

## Pitfalls

- **Offset on deep pages** — silently slow; the classic scaling bug.
- **Non-unique ordering** → skipped/duplicated items across pages (users see the same row twice or miss one).
- **Unbounded results** — no default/max limit → one request pulls a million rows.
- **`COUNT(*)` on every page** for total — expensive on big tables; make it optional or approximate.
- Filtering/sorting on **unindexed** columns turns pagination into a table scan.
