---
name: database-schema-design
description: Design relational schemas that stay correct and fast — normalize then denormalize deliberately, choose keys and types precisely, model relationships (1:1, 1:N, M:N) and cardinality, enforce integrity with constraints and foreign keys, index for real queries, and handle soft deletes, timestamps, and migrations safely. Use when designing tables or reviewing a data model.
category: engineering
keywords_vi: thiết kế database, thiết kế schema, mô hình dữ liệu, chuẩn hóa database, khóa ngoại quan hệ, thiết kế bảng, normalize denormalize, cardinality
---

# Database Schema Design

A schema encodes the rules of your domain. Get relationships and constraints right first; performance tuning comes after.

## Normalize First

Reach 3rd normal form as the default: every non-key column depends on the key, the whole key, and nothing but the key. Normalization removes update anomalies (one fact, one place). **Denormalize deliberately later** for measured read-hot paths, accepting the write-side complexity — never as a starting shortcut.

## Keys & Types

- **Primary key** — a stable surrogate key (auto-increment or UUID) is usually safer than a natural key that might change. UUIDs help with distributed generation but cost index locality (consider UUIDv7/ULID for time-ordering).
- **Right-size types** — the smallest type that fits (don't store money as float — use decimal/integer cents; store timestamps as UTC `timestamptz`; use enums/lookup tables for fixed sets).
- **NOT NULL by default** — nullable columns should be a deliberate choice; NULL has surprising semantics in comparisons and aggregates.

## Relationships

- **1:N** — foreign key on the "many" side.
- **M:N** — a junction table with the two FKs (plus any relationship attributes).
- **1:1** — usually a shared/foreign PK; question whether it should just be one table.
- Set FK **on-delete behavior** explicitly (`CASCADE`, `RESTRICT`, `SET NULL`) — it's part of the domain rule, not a default to ignore.

## Integrity

Push invariants into the database: `FOREIGN KEY`, `UNIQUE`, `CHECK`, `NOT NULL`. The database is the last line of defense — application checks can be bypassed by another writer. A `UNIQUE` constraint prevents the race that app-level "check then insert" cannot.

## Practical Conventions

- Consistent naming (snake_case, plural or singular — pick one), `id` PKs, `*_id` FKs.
- Add `created_at`/`updated_at` (UTC) to most tables.
- Prefer **soft delete** (`deleted_at`) when history matters — but remember to filter it everywhere and keep unique indexes partial.
- Index for the queries you actually run (FKs, filters, sorts) — not every column.

## Migrations

Make schema changes backward-compatible and reversible: add columns nullable/with defaults first, backfill, then enforce; use **expand→migrate→contract** for renames/type changes so old and new code coexist during deploy. Never edit a shipped migration — add a new one.
