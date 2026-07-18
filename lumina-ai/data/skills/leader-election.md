---
name: leader-election
description: How leader election works in distributed systems — choosing one node to coordinate among many, why you need it, consensus-based election (Raft/Paxos, ZooKeeper/etcd), leases and heartbeats, split-brain, and failover. Use to understand leader election, choosing a coordinator node, avoiding split-brain, or how one node is picked to run singleton work.
category: engineering
keywords_vi: leader election, bầu chọn leader, split-brain, quorum, raft, failover, chọn node điều phối, zookeeper etcd election, lease heartbeat
---

# Leader Election

Leader election is how a group of nodes agrees on **one node to act as the coordinator** ("leader") for some task, and reliably picks a new one if the leader fails. It's a fundamental building block of distributed systems — databases, schedulers, and clusters all need a single decision-maker.

## Why You Need a Leader

Many tasks require **exactly one** node in charge to avoid conflicts:
- **Accepting writes** — one leader orders writes so replicas stay consistent (see how-database-replication-works).
- **Running singletons** — a scheduled job/cron that must run once cluster-wide, not on every node.
- **Coordination** — assigning work, managing shards, making cluster decisions.
Without a single leader, multiple nodes make conflicting decisions. Leader election gives you that single point of coordination **without** a permanent single point of failure — because a new leader is elected if the current one dies.

## How Election Works (consensus)

Nodes must **agree** on who the leader is, despite failures and network issues — this is a consensus problem (see how-distributed-consensus-works):
- **Consensus algorithms** (**Raft**, Paxos) include leader election: nodes vote, and a candidate that wins a **majority (quorum)** becomes leader for a **term**. Requiring a majority ensures only one leader can win (two candidates can't both get a majority).
- **Coordination services** (**ZooKeeper**, **etcd**) provide election primitives so apps don't implement raw consensus — e.g. whoever creates a special ephemeral node/lease first becomes leader.

## Leases & Heartbeats

The leader holds its role via a **lease** (time-bounded) and sends periodic **heartbeats** to prove it's alive. If followers stop hearing heartbeats (leader crashed or is partitioned), they start a **new election** and elect a new leader → automatic **failover**. The old leader, if it comes back, discovers a newer term/leader exists and steps down.

## Split-Brain (the danger)

The nightmare scenario: a **network partition** makes two groups each think the other is dead, and **both elect a leader** → two leaders accepting conflicting writes → data corruption ("split-brain"). The defense is **quorum**: require a **majority** to elect/act, so a minority partition **cannot** elect a leader or make progress. Only the side with the majority operates; the minority side steps down. This is why clusters use odd numbers (3, 5) and why a leader must confirm it still has quorum before acting.

## Pitfalls (in understanding/using)

- **Split-brain** — allowing two leaders during a partition → conflicting writes/corruption. Require **quorum/majority**; fence the old leader.
- Rolling your own election instead of using **proven** systems (Raft libraries, ZooKeeper, etcd) — consensus is famously easy to get subtly wrong.
- An **even number** of nodes → possible tie/no-majority; use odd cluster sizes.
- Assuming the leader is **always** up — design for fast, automatic failover and for brief leaderless windows.
- The old leader **acting after** losing leadership (didn't notice the partition) — needs fencing/lease expiry (see distributed-locking's fencing tokens).
- Heartbeat/lease timeouts too **short** (false failovers/flapping) or too **long** (slow failover) — tune carefully.
- Forgetting the leader is a **coordination** role, not a magic fix — the elected leader still needs the work designed correctly.
