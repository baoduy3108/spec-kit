---
name: stateful-stream-processing-and-checkpointing
description: How streaming jobs remember things across events and survive crashes — managed state (keyed state, aggregations, joins) plus checkpointing/snapshots for fault tolerance. Covers where state lives (embedded RocksDB + changelog), consistent distributed snapshots, savepoints for upgrades, and state TTL. Use to understand why streaming state must be recoverable, how a job resumes exactly where it left off, and how to bound state growth.
category: data-engineering
keywords_vi: xử lý luồng có trạng thái stateful nhớ qua nhiều sự kiện, trạng thái theo khoá keyed state cho tổng hợp và join, chốt điểm checkpoint và ảnh chụp snapshot để chịu lỗi, trạng thái nhúng rocksdb kèm changelog, ảnh chụp phân tán nhất quán khôi phục đúng chỗ, savepoint nâng cấp và ttl giới hạn trạng thái
---

# Stateful Stream Processing & Checkpointing

Trivial stream jobs are **stateless** — map/filter each event independently. But the interesting ones are **stateful**: running counts, windowed aggregations, deduplication, stream-to-stream joins, pattern detection, machine-learning features. These must **remember** information across events, sometimes for millions of keys and long time spans. And because streams run **forever**, that state must survive process crashes, restarts, rescaling, and code upgrades — **without losing or double-counting** (see exactly-once-stream-processing, event-time-and-watermarks, write-ahead-logging).

## What "State" Looks Like

Most frameworks give you **keyed state** — state partitioned by a key, so each key (user, device, session) has its own value: a counter, a list, a window accumulator, a join buffer. The framework routes all events for a key to the same partition, so its state is local and consistent. State can be large — far bigger than RAM — so it's typically backed by an **embedded key-value store** (e.g. **RocksDB**) on local disk, with a **changelog** streamed to durable storage for recovery.

## Checkpointing: Surviving Failure

A **checkpoint** is a periodic, consistent **snapshot** of *all* operator state **plus the input positions (offsets)** that produced it, written to durable storage (S3/HDFS). On failure, the job **restarts from the last checkpoint**: restore state, rewind sources to the checkpointed offsets, and resume — as if the crash never happened.

The hard part is taking a **consistent** snapshot of a distributed, running pipeline without stopping it. Flink uses **asynchronous barrier snapshotting** (a Chandy-Lamport variant): special **barrier** markers flow through the dataflow; each operator snapshots its state when the barrier passes, so the global snapshot is a coherent cut across all operators. This is what makes exactly-once state possible.

## Savepoints vs Checkpoints

- **Checkpoints** — automatic, frequent, for **fault recovery**; often cleaned up.
- **Savepoints** — manual, durable snapshots for **operations**: upgrade the job's code, rescale parallelism, migrate, or A/B a new version, then resume from the savepoint with state intact.

## Bounding State (or it grows forever)

Forever-running + per-key state = unbounded growth unless you **expire** it. Use **state TTL** (drop keys untouched for N time), **window cleanup** (free window state after firing + lateness), and careful key cardinality (a key per unbounded id — e.g. raw URLs — explodes state). Unbounded state is the #1 streaming production failure.

## Design Guidance (for understanding/using)

- **Make state recoverable** — never keep critical streaming state only in memory; rely on the framework's checkpointed state, not ad-hoc variables.
- **Checkpoint atomically with offsets** — state and source position must snapshot together for correct recovery.
- **Use savepoints for upgrades/rescaling** — don't lose state when deploying new code.
- **Set TTL and clean windows** — bound state explicitly; monitor state size as a first-class metric.
- **Mind key cardinality** — unbounded distinct keys → unbounded state; bucket or expire them.

## Pitfalls (in understanding/using)

- Keeping streaming state in **plain variables** → lost on restart, not checkpointed, wrong after failure.
- Snapshotting state **without** the matching offsets → duplicates or gaps on recovery.
- Never expiring state (no TTL, unbounded keys) → memory/disk blowup and job death.
- Confusing checkpoints (auto, recovery) with savepoints (manual, upgrades) → losing state on a redeploy.
- Assuming exactly-once "just works" without durable, consistent checkpointing underneath it.
