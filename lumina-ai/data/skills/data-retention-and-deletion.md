---
name: data-retention-and-deletion
description: Designing data retention and deletion — retention policies tied to purpose, automated expiry, hard vs soft delete, cascading deletion across systems/backups, and honoring erasure requests. Use to design data retention, implement right-to-erasure/deletion, expire old data automatically, or handle deletes across services and backups.
category: engineering
keywords_vi: lưu giữ và xóa dữ liệu, chính sách retention theo mục đích, tự động hết hạn, hard delete soft delete, xóa lan tỏa qua hệ thống backup, đáp ứng yêu cầu xóa erasure
---

# Data Retention and Deletion

Keeping data **forever** is a liability (privacy law, breach exposure, storage cost) and often illegal under "storage limitation" rules. A retention-and-deletion strategy decides **how long** each kind of data lives and ensures it's **actually deleted** — everywhere — when its time is up or a user requests erasure. Deletion turns out to be surprisingly hard in distributed systems (see gdpr-and-data-privacy, pii-handling-and-minimization).

## Retention Policies: Keep Only As Long As Needed

Each data type should have a **retention period** tied to its **purpose** and legal requirements:
- **Purpose-based** — keep data only while it serves its stated purpose; delete after.
- **Legal minimums/maximums** — some data must be **kept** for a period (tax/financial records for years); other data must be **deleted** promptly. These can conflict — reconcile deliberately.
- **Automate expiry** — don't rely on manual cleanup; use TTLs, scheduled jobs, or lifecycle rules to delete/expire data automatically when its retention ends.
The default should be **delete when no longer needed**, not "keep indefinitely."

## Hard vs Soft Delete

- **Soft delete** — mark a record `deleted` (a flag/timestamp) but keep the row. Reversible, preserves referential integrity, good for undo/recovery and audit. But the data **still exists** — so soft delete **does not** satisfy privacy erasure, and the data is still breachable.
- **Hard delete** — physically remove the data. Required for genuine **erasure** (right to be forgotten) and to actually reduce risk.
Common pattern: soft-delete for UX/undo with a **grace period**, then **hard-delete** after it expires. Be clear which you need — a "delete" that's only soft won't satisfy a legal erasure request.

## The Hard Part: Deletion Is Distributed

A user's data isn't in one place — it's in the primary DB, **caches**, **search indexes**, **data warehouses/analytics**, **backups**, **logs**, and **third-party processors**. True deletion must **cascade** to all of them:
- **Cascade across systems** — delete from every store, not just the main table.
- **Downstream/derived data** — search indexes, caches, replicas, analytics copies.
- **Backups** — the thorny one: you usually **can't** surgically delete one record from immutable backups. Common approach: let backups **age out** per their (documented, bounded) retention, and ensure restored data re-applies pending deletions. Document this.
- **Third parties** — instruct processors to delete too.
- **Logs** — data logged earlier (a reason not to log PII in the first place — see pii-handling-and-minimization).

## Honoring Erasure Requests

To fulfill a "delete my data" request you must be able to **find all of a user's data** and remove it — which requires knowing where it lives (a data map) and having deletion paths into each store. Design for this **up front**; retrofitting deletion into a system that scattered data everywhere is painful.

## Design Guidance

- **Set a retention period per data type**; default to deleting when the purpose ends.
- **Automate expiry** (TTLs, lifecycle rules, scheduled jobs) — don't rely on humans.
- **Choose soft vs hard delete deliberately** — hard delete for real erasure; soft + grace + hard for UX.
- **Cascade deletes** to caches, indexes, warehouses, replicas, and third parties.
- **Handle backups** with bounded, documented retention; re-apply deletions on restore.
- **Map user data** so erasure requests are feasible.
- **Reconcile legal keep-vs-delete** requirements explicitly.

## Pitfalls (in understanding/using)

- **Keeping data forever** → legal exposure, breach risk, and cost.
- **Soft delete mistaken for erasure** → the data still exists; doesn't satisfy right-to-be-forgotten.
- Deleting from the **main table only** → copies linger in caches, indexes, warehouses, backups.
- **Backups** silently retaining "deleted" data indefinitely with no documented aging.
- No **data map** → can't find all of a user's data to erase it.
- **Manual** cleanup that never actually happens → data accumulates past its retention.
- Deleting data that a **legal hold / regulation requires keeping** (the opposite mistake) — reconcile requirements.
