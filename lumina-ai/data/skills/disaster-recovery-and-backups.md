---
name: disaster-recovery-and-backups
description: How to plan for disaster recovery and backups — RPO and RTO targets, the 3-2-1 backup rule, testing restores, multi-region/failover strategies, and the difference between backups, replication, and DR. Use to understand disaster recovery, backup strategy, RPO/RTO, business continuity, or surviving a region/data loss.
category: engineering
keywords_vi: disaster recovery backup, khôi phục thảm họa sao lưu, rpo rto, quy tắc 3-2-1, kiểm thử phục hồi restore, multi-region failover, backup vs replication, business continuity
---

# Disaster Recovery & Backups

Disaster recovery (DR) is your plan for surviving a catastrophe — a region outage, data corruption, ransomware, accidental deletion — and getting back to running. Backups are a core piece. The key is defining **how much data loss and downtime you can tolerate**, then designing to meet it.

## RPO and RTO (define these first)

Two targets drive every DR decision:
- **RPO (Recovery Point Objective)** — how much **data loss** is acceptable, measured in time. "RPO = 1 hour" means you can lose up to the last hour of data. Drives **backup/replication frequency** (RPO of seconds needs continuous replication; RPO of a day allows nightly backups).
- **RTO (Recovery Time Objective)** — how much **downtime** is acceptable. "RTO = 4 hours" means you must be back up within 4 hours. Drives your **recovery mechanism** (a warm standby recovers in minutes; restoring from cold backups takes hours).
Lower RPO/RTO = more resilience = more cost. Set them by **business impact** per system (not everything needs the same), then design to hit them.

## The 3-2-1 Backup Rule

A durable backup strategy: **3** copies of your data, on **2** different media/storage types, with **1** copy **offsite** (or in a different region/provider). Why: a single backup on the same system dies with it; ransomware/corruption can spread to connected copies; a datacenter fire destroys co-located copies. The offsite copy survives local disasters. Add **versioning** so you can restore a point *before* corruption/ransomware, not just the latest (already-corrupted) state.

## Backups ≠ Replication ≠ DR

- **Replication** (see how-database-replication-works) — real-time copies for **availability**; but it faithfully replicates **deletions and corruption** too. Not a backup.
- **Backups** — point-in-time copies you can restore from, protecting against corruption/deletion/ransomware. Not automatically highly available.
- **DR** — the whole plan (backups + failover + runbooks + people) to recover operations after a disaster.
You need all three concepts; don't mistake one for another (RAID and replicas are **not** backups — see how-raid-works).

## Test Your Restores (the rule everyone breaks)

**A backup you haven't tested restoring is not a backup — it's a hope.** Backups fail silently (misconfigured, corrupted, incomplete, missing a critical dataset). Regularly perform **actual restore drills**: restore to a clean environment and verify the data and that the system works. Also **test failover** to your DR region. Untested DR fails exactly when you need it.

## Failover Strategies (RTO-driven)

- **Backup & restore** — cheapest, highest RTO (restore from backups — hours).
- **Pilot light** — core minimal infra always running in another region; scale it up on disaster.
- **Warm standby** — a scaled-down full copy running; promote and scale on failover (low RTO).
- **Multi-region active-active** — running everywhere; near-zero RTO, highest cost/complexity.
Pick per the system's RTO/RPO and budget.

## Pitfalls (in understanding/using)

- **Never testing restores** — the #1 DR failure; test regularly.
- Treating **replication/RAID** as a backup — they copy corruption/deletion (see how-raid-works).
- **No offsite/versioned** copy → ransomware or a local disaster takes everything (follow 3-2-1).
- Undefined **RPO/RTO** → over- or under-investing; set them per system by business impact.
- Backing up data but not the **config/infrastructure** to run it (can't restore into nothing).
- No **runbook** — a DR plan nobody has practiced fails under pressure (see runbooks-and-oncall).
- Assuming the cloud provider handles DR for you — usually *your* data/config is *your* responsibility.
