---
name: database-migrations
description: How to evolve a database schema safely — versioned migration files, forward-only vs reversible migrations, and zero-downtime patterns (expand-contract/parallel change, backfilling, additive changes) so schema changes don't break running code. Use when changing a production database schema, adding/removing columns safely, or doing zero-downtime migrations.
category: engineering
keywords_vi: database migration, di trú lược đồ schema, versioned migration file, zero-downtime không gián đoạn, expand contract parallel change, backfill, thay đổi cột an toàn
---

# Database Migrations

A database migration is a **versioned, repeatable change to your schema** (add a table/column, change a type, add an index). Done casually, a schema change breaks running code or locks a table during peak traffic. Done well, it's routine and safe — even with zero downtime.

## Versioned Migration Files

Migrations are code: each change is a **numbered/timestamped file** checked into version control, applied in order, tracking which have run (via tools like Flyway, Liquibase, Alembic, Rails migrations, Prisma). Benefits: the schema evolves reproducibly across environments (dev/staging/prod), everyone gets the same structure, and changes are reviewed like code (see git-workflow-and-versioning). Never edit an already-applied migration — add a new one.

## Forward-Only vs Reversible

- **Reversible** — each migration has an `up` and a `down` (to roll back). Nice in development.
- **Forward-only** — in production, rolling *back* a schema change is often dangerous (data already written to the new shape). Many teams treat production migrations as **forward-only** and "fix forward" with a new migration rather than reversing. Design changes so you don't *need* to roll back.

## Zero-Downtime: Expand-Contract (Parallel Change)

The critical pattern for changing a schema **without breaking a running app** (where old and new code run simultaneously during a deploy — see deployment-strategies): make changes **backward-compatible** in stages rather than one breaking step.
To rename/replace a column with zero downtime:
1. **Expand** — add the new column (additive, safe); deploy code that **writes to both** old and new.
2. **Backfill** — copy existing data from old to new (in batches, to avoid locking).
3. **Migrate reads** — deploy code that reads from the new column.
4. **Contract** — once nothing uses the old column, drop it (a later, separate migration).
Each step is safe with both old and new code running. The naive "rename in one migration" breaks whichever code version doesn't match the schema.

## Safe-Change Rules

- **Additive first** — adding a nullable column/table is safe; removing or renaming is not (do it via expand-contract).
- **Avoid long locks** — some operations (adding a column with a default, certain index builds) can lock a large table. Use online/concurrent index builds (`CREATE INDEX CONCURRENTLY`), batch backfills, and know your DB's locking behavior.
- **Decouple schema change from data change** — separate migrations for structure vs backfilling data.
- **Test on production-like data volume** — a migration that's instant on 100 rows can lock for minutes on 100M.

## Pitfalls (in understanding/using)

- **One-step rename/drop** on a live system → breaks the code version that doesn't match; use **expand-contract**.
- **Locking a large table** (blocking default add, non-concurrent index) → an outage; use online operations and batching.
- Editing an **already-applied** migration instead of adding a new one → drift between environments.
- Backfilling millions of rows in **one transaction** → long locks/timeouts; batch it.
- Assuming you can **roll back** production schema changes safely — often you can't (data written); fix forward.
- Coupling the deploy so schema and code must change atomically (impossible with rolling deploys) — stage compatible changes.
