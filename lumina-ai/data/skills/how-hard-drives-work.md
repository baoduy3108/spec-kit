---
name: how-hard-drives-work
description: How magnetic hard disk drives work — spinning platters, read/write heads, tracks/sectors/cylinders, seek time and rotational latency, why sequential is far faster than random, and how this shapes database and filesystem design. Use to understand hard drives, seek time, sequential vs random I/O, or why disk access patterns matter.
category: engineering
keywords_vi: hard drive hoạt động thế nào, ổ cứng từ hdd, platter đĩa quay, đầu đọc ghi head, seek time rotational latency, sequential vs random, i/o tuần tự ngẫu nhiên
---

# How Hard Disk Drives Work

A hard disk drive (HDD) stores data magnetically on spinning platters. Though SSDs are replacing them, HDDs still dominate bulk/cold storage, and their **mechanical** nature explains the single most important storage-performance fact: **sequential access is vastly faster than random access**.

## The Mechanism

- **Platters** — rigid disks coated with magnetic material, spinning at a fixed speed (5400/7200/15000 RPM).
- **Read/write heads** — float nanometers above each platter surface on an actuator arm, magnetizing tiny regions to write bits and sensing them to read.
- **Tracks** — concentric rings on each platter; each track is divided into **sectors** (the smallest addressable unit, historically 512 bytes, now 4 KB). Aligned tracks across platters form a **cylinder**.

## Why Random Access Is Slow: Seek + Rotation

To read a given sector, the drive must physically:
1. **Seek** — move the head to the right track (**seek time**, ~5–10 ms — an eternity in computing).
2. **Rotational latency** — wait for the target sector to spin under the head (~half a rotation on average, a few ms).
Only then does it transfer data. So each **random** access pays ~10 ms of mechanical delay — a few hundred per second (~100–200 IOPS). But once positioned, reading **sequential** sectors is fast (no more seeking) — hundreds of MB/s. The ratio between sequential and random throughput is enormous.

## Why This Shapes Software

This mechanical reality drives storage design:
- **Databases** batch and sequentialize writes (write-ahead logs are append-only sequential — see how-write-ahead-logging-works) and use **B-trees** to minimize the number of page reads (see how-b-trees-work).
- **Filesystems** try to allocate files contiguously to avoid fragmentation-induced seeks (see how-filesystems-work).
- **OS I/O schedulers** reorder requests (elevator algorithm) to minimize head movement.
- Log-structured and columnar designs exist largely to turn random writes into sequential ones.
On SSDs (see how-ssds-work) the random penalty nearly vanishes, but the "prefer sequential, batch I/O" instincts still help (write amplification, prefetching, throughput).

## Capacity vs Speed

HDDs win on **cost per terabyte** and are fine for sequential/archival workloads (backups, media, cold data). SSDs win on **latency and random IOPS**. Many systems tier: hot data on SSD, cold on HDD.

## Pitfalls (in understanding/using)

- Designing for **random** small I/O on HDDs → catastrophic performance (seek-bound); batch/sequentialize.
- Assuming disk throughput numbers (sequential MB/s) apply to random workloads — random is 100–1000× slower.
- Ignoring **fragmentation** on HDDs (scatters files → seeks); defrag helps HDDs (not SSDs).
- Treating an HDD like RAM — every cache miss to disk is milliseconds; keep the working set in memory.
- Expecting HDD durability against shock/vibration (moving parts fail).
