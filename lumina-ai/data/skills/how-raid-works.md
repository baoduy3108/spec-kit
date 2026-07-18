---
name: how-raid-works
description: How RAID works — combining multiple disks for redundancy and/or performance, the common levels (0 striping, 1 mirroring, 5/6 parity, 10 mirror+stripe), how parity rebuilds lost data, and why RAID is not a backup. Use to understand RAID levels, disk redundancy, striping/mirroring/parity, or storage reliability.
category: engineering
keywords_vi: raid hoạt động thế nào, gộp nhiều ổ đĩa, dự phòng redundancy, striping mirroring parity, raid 0 1 5 6 10, rebuild khôi phục đĩa, raid không phải backup
---

# How RAID Works

RAID (Redundant Array of Independent Disks) combines several physical disks into one logical volume to gain **redundancy** (survive disk failure), **performance** (parallel I/O), or both. Understanding the levels lets you pick the right trade-off between capacity, speed, and safety.

## The Two Basic Techniques

- **Striping** — split data across disks so reads/writes happen in parallel → more throughput. But *reduces* reliability: any one disk dying loses everything (more disks = more failure chances).
- **Mirroring** — write the same data to two disks → survive one disk's death (read from the other). Costs 50% of capacity.
- **Parity** — store computed redundancy (XOR) so a lost disk's data can be **reconstructed** from the survivors. Cheaper redundancy than mirroring.

## Common Levels

- **RAID 0** (stripe) — pure performance/capacity, **zero redundancy**. Fast, but one disk fails → total loss. Only for scratch/replaceable data.
- **RAID 1** (mirror) — every byte on two disks. Survives one failure; simple, fast reads; half the capacity. Great for small critical volumes.
- **RAID 5** (stripe + distributed parity) — needs ≥3 disks; survives **one** failure; usable capacity = (N−1) disks (one disk's worth goes to parity). Good balance, but slow random writes (read-modify-write parity) and risky rebuilds on large drives.
- **RAID 6** (double parity) — needs ≥4 disks; survives **two** simultaneous failures. Safer than 5 for big arrays (rebuilds take hours during which a second disk can die).
- **RAID 10** (mirror + stripe) — pairs of mirrors, striped together. Survives a failure per mirror, fast, but 50% capacity cost. Preferred for databases/high-I/O.

## How Parity Rebuilds Data

Parity is a running **XOR** of the data blocks across the stripe. Property of XOR: if you know all blocks but one, XOR-ing the survivors (including parity) **reproduces** the missing block. So when a disk dies, the array reads the corresponding blocks from every other disk, XORs them, and reconstructs the lost data onto a replacement — the array keeps serving (degraded) meanwhile. Double parity (RAID 6) uses a second, independent parity for two-failure tolerance.

## RAID Is NOT a Backup

Critical point: RAID protects against **disk hardware failure**, not against **deletion, corruption, ransomware, or disaster**. If you `rm -rf` or a bug corrupts data, RAID faithfully mirrors/parities the corruption to all disks. It's for **availability/uptime**, not recovery. You still need real backups (separate copies, offsite, versioned) — the 3-2-1 rule.

## Pitfalls (in understanding/using)

- **Treating RAID as a backup** — it isn't; it doesn't protect against human error, corruption, or fire.
- **RAID 0 for anything you care about** — no redundancy, amplified failure risk.
- Ignoring **rebuild risk** on large RAID 5 arrays — rebuilds are long and stress the remaining disks; a second failure during rebuild loses all (use RAID 6/10 for big/critical arrays).
- Using identical disks from the same batch → correlated failures (they may die around the same time).
- No monitoring — running **degraded** unnoticed until a second disk fails.
- Forgetting a UPS / write cache with battery — power loss mid-write can still corrupt.
