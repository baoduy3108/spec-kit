---
name: how-distributed-consensus-works
description: How distributed systems agree on state — the consensus problem, replication, quorums and majority voting, leader election and log replication (Raft/Paxos intuition), and why the FLP/CAP limits make trade-offs unavoidable. Use to understand replicated databases, leader election, split-brain, and why distributed agreement is hard.
category: engineering
keywords_vi: consensus phân tán, raft, paxos, bầu leader, replication, quorum, split-brain, đồng thuận phân tán
---

# How Distributed Consensus Works

The core problem: multiple machines must agree on a single value/order of operations even though messages get delayed/lost and machines crash — and no one has a global view. This underlies replicated databases, distributed locks, and leader election.

## Replication & Quorums

To survive failures, data is **replicated** across N nodes. To stay consistent, operations require a **quorum** — a majority (⌊N/2⌋+1) must agree before a write counts. Majority quorums guarantee any two quorums overlap, so a later read/quorum always sees the latest committed write. This is why clusters are sized odd (3, 5) and why you need a *majority* alive — a 5-node cluster tolerates 2 failures, not 4.

## Leader-Based Consensus (Raft intuition)

Rather than everyone negotiating every value, elect one **leader** that orders operations:
- **Leader election** — nodes are followers; if they hear nothing from a leader within a randomized timeout, a follower becomes a **candidate** and requests votes. Win a majority → become leader. Randomized timeouts prevent endless split votes.
- **Log replication** — clients send commands to the leader; it appends to its **log** and replicates to followers; once a majority acknowledge, the entry is **committed** and applied to the state machine. All nodes apply the same log in the same order → identical state (a replicated state machine).
- **Terms** — each election starts a new numbered term; a leader from an old term is rejected, preventing two live leaders from both committing (**split-brain**).

Paxos solves the same problem with different mechanics; Raft is the same guarantees made understandable.

## The Fundamental Limits

- **FLP result** — with truly asynchronous messaging and even one crash, no algorithm can guarantee consensus in bounded time. Real systems dodge this with timeouts/randomization (accepting "eventually" not "always by deadline").
- **CAP** — under a network partition you must choose consistency or availability. A quorum system typically stays **consistent** (a minority partition refuses writes — it can't reach majority) at the cost of availability on that side.
- **Split-brain** — two sides both thinking they're leader; majority quorums + terms prevent both from committing.

## Why It Matters

This explains why distributed databases need an odd number of nodes, why a minority partition goes read-only, why leader election causes brief unavailability, and why "just replicate it" is deceptively hard. When you don't need strong agreement, eventual consistency (async replication, conflict resolution) is cheaper and more available — pick per requirement.
