---
name: how-lsm-trees-work
description: How LSM-trees (Log-Structured Merge trees) work — buffering writes in memory, flushing sorted immutable files (SSTables), background compaction, and why they excel at write-heavy workloads compared to B-trees. Covers read amplification, bloom filters, and the write/read/space amplification trade-offs. Use to understand LSM-trees, why RocksDB/Cassandra/LevelDB are write-optimized, or B-tree vs LSM.
category: engineering
keywords_vi: lsm tree, log-structured merge, tối ưu ghi, memtable sstable, compaction nén nền, write amplification, read amplification, rocksdb cassandra, b-tree vs lsm
---

# How LSM-Trees Work

The Log-Structured Merge tree (LSM-tree) is the storage engine behind write-heavy databases — Cassandra, RocksDB, LevelDB, ScyllaDB, and many time-series/NoSQL stores. Where B-trees (see how-b-trees-work) update data in place, LSM-trees turn all writes into fast **sequential appends**, making them excellent for high write throughput.

## The Problem With In-Place Updates

A B-tree writes updates to their location on disk → **random writes**, which are slow on disks and cause write amplification on SSDs (see how-hard-drives-work, how-ssds-work). For write-heavy workloads (logging, time series, high-ingest), this is the bottleneck. LSM-trees avoid random writes entirely.

## The Write Path

1. A write first goes to an in-memory sorted structure, the **memtable** (and to a write-ahead log for durability — see how-write-ahead-logging-works). This is fast (memory) and durable (the log).
2. When the memtable fills, it's **flushed to disk** as an **immutable, sorted file** — an **SSTable** (Sorted String Table). Writing it is a single **sequential** write (fast).
3. New SSTables keep accumulating; old data is **never modified in place**. Updates and deletes are just **new entries** (a delete writes a "tombstone" marker); the newest value wins.
So all disk writes are sequential appends of sorted files → very high write throughput.

## Reads & the Cost

Because the latest value could be in the memtable or any SSTable, a read may have to **check multiple places** (newest first) → **read amplification**. Mitigations:
- SSTables are **sorted**, so lookups within one are fast (binary search / index).
- **Bloom filters** (see how-bloom-filters-work) per SSTable quickly answer "this key is *definitely not* here," so most SSTables are skipped without a disk read — crucial for making LSM reads efficient.
- Block caches keep hot data in memory.

## Compaction (background cleanup)

Accumulating SSTables would bloat storage (old versions, tombstones) and slow reads. **Compaction** runs in the background, **merging** multiple SSTables into fewer, larger ones: dropping overwritten/deleted entries and keeping data sorted. This reclaims space and bounds read amplification — but costs background I/O and CPU (**write amplification** from rewriting data during merges). Compaction strategy (leveled vs size-tiered) tunes the balance.

## The Amplification Trade-offs

LSM engines juggle three:
- **Write amplification** — data rewritten by compaction (LSM trades some here).
- **Read amplification** — checking multiple SSTables (mitigated by bloom filters/caching).
- **Space amplification** — extra space from un-compacted old versions.
You tune compaction to favor whichever matters for your workload. Generally: **LSM = write-optimized**; **B-tree = read/point-lookup-optimized with predictable latency**.

## Pitfalls (in understanding/using)

- Using an **LSM** store for **read-heavy, latency-sensitive point lookups** without tuning — read amplification and compaction stalls can hurt; a B-tree may fit better.
- Ignoring **compaction** impact — background compaction causes I/O spikes and latency jitter; size it for your hardware.
- **Tombstone** buildup (many deletes) bloating reads until compaction clears them.
- Forgetting **bloom filters** are what keep reads fast — misconfiguring them wrecks read performance.
- Expecting immediate space reclamation on delete — space frees only after compaction.
- Choosing LSM vs B-tree by hype rather than your read/write ratio and latency needs.
