---
name: how-database-replication-works
description: How database replication works — copying data across servers for availability and read scaling, leader/follower (primary/replica), synchronous vs asynchronous replication and the consistency/durability trade-off, replication lag, failover, and multi-leader/leaderless models. Use to understand database replication, read replicas, replication lag, failover, or high availability.
category: engineering
keywords_vi: database replication, sao chép cơ sở dữ liệu, leader follower primary replica, đồng bộ vs bất đồng bộ, replication lag độ trễ, failover, read replica, high availability
---

# How Database Replication Works

Replication keeps **copies of your database on multiple servers**. It's the foundation of high availability (survive a server dying), read scaling (spread reads across copies), and disaster recovery. The central trade-offs are about **consistency vs availability/performance**.

## Leader/Follower (the common model)

The dominant setup:
- One **leader** (primary) accepts all **writes**.
- One or more **followers** (replicas) receive a stream of the leader's changes (usually via the write-ahead log — see how-write-ahead-logging-works) and apply them to stay in sync.
- **Reads** can be served by the leader **or** the followers → you scale read capacity by adding replicas.
This scales read-heavy workloads well and gives you standby copies for failover.

## Synchronous vs Asynchronous (the key trade-off)

When the leader gets a write, how long does it wait for replicas before confirming to the client?
- **Synchronous** — wait until (at least one) replica confirms it has the write. **Stronger durability** (a confirmed write survives leader failure) and replicas are up to date, but **slower** writes and if the replica is down/slow, writes stall.
- **Asynchronous** — confirm the write immediately; replicas catch up later. **Fast**, resilient to slow replicas, but a leader crash can **lose** the last un-replicated writes, and replicas briefly lag.
Many systems use **semi-synchronous** (wait for one replica, others async) to balance. This is a direct durability-vs-latency choice.

## Replication Lag & Read-Your-Writes

With async replication, followers are slightly **behind** — **replication lag**. Consequence: a user who writes then immediately reads from a **replica** may **not see their own change** (it hasn't propagated). This "read-your-writes" problem is a classic bug. Fixes: read from the leader after a write, use "read-your-writes" consistency (route recent writers to the leader), or wait for the replica to catch up. This is **eventual consistency** in action (see how-distributed-consensus-works).

## Failover

If the leader dies, a **follower is promoted** to leader (failover) — automatically or manually. Hard parts: detecting failure reliably (not a false alarm), choosing the most up-to-date replica, avoiding **split-brain** (two nodes both thinking they're leader → conflicting writes), and losing un-replicated writes (with async). This is why robust failover uses consensus (Raft) and careful configuration.

## Other Topologies

- **Multi-leader** — multiple leaders accept writes (e.g. per region) → write availability and locality, but **write conflicts** must be resolved (last-write-wins, CRDTs).
- **Leaderless** (Dynamo-style, Cassandra) — any node takes reads/writes, using quorums (R + W > N) for consistency. Highly available, tunable consistency.

## Pitfalls (in understanding/using)

- **Reading stale data** from replicas due to lag (read-your-writes bugs) — route recent writers to the leader.
- Assuming **async** replication is safe against data loss — a leader crash can lose recent writes.
- **Split-brain** during failover without proper fencing/consensus → data corruption.
- Treating read replicas as a **write** scaling solution — they scale reads, not writes (shard for write scale — see how-database-sharding-works).
- Ignoring failover testing — untested failover fails when you need it.
- Multi-leader without a **conflict-resolution** strategy → silent data conflicts.
