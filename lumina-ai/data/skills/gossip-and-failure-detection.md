---
name: gossip-and-failure-detection
description: How large clusters keep a shared view of who is alive without a central coordinator — gossip (epidemic) protocols and failure detectors. Each node periodically exchanges state with a few random peers; information spreads exponentially, and phi-accrual / SWIM-style detectors decide when a silent node is "suspected" then "dead". Use to understand membership, heartbeats, suspicion, and eventual convergence at scale.
category: distributed-systems
keywords_vi: giao thức lan truyền gossip kiểu dịch tễ, phát hiện lỗi node bằng heartbeat, mỗi node trao đổi trạng thái với vài peer ngẫu nhiên, thông tin lan theo cấp số nhân hội tụ, nghi ngờ rồi tuyên bố node chết, thành viên cụm swim và phi-accrual
---

# Gossip Protocols & Failure Detection

In a cluster of hundreds or thousands of nodes, everyone needs a rough answer to "who is alive, and what's their state?" — but a **central registry** is a bottleneck and a single point of failure, and having every node ping every other node is O(N²) traffic. **Gossip** (a.k.a. **epidemic**) protocols solve this the way rumors spread: each node periodically picks a **few random peers** and exchanges state. Information reaches the whole cluster in **O(log N)** rounds, with no coordinator (see distributed-systems-fundamentals, how-consistent-hashing-works, eventual-consistency).

## How Gossip Spreads

Every gossip interval (say, once a second) a node:
1. Picks one or a few **random** peers.
2. Sends its current view (membership list, versioned per-node metadata).
3. Merges the peer's view into its own — newer versions win (version numbers / heartbeat counters resolve conflicts).

Because each round roughly **doubles** the number of informed nodes, a fact reaches N nodes in ~log₂(N) rounds. Traffic per node is **constant**, independent of cluster size — that's why it scales. The trade-off is **eventual** convergence: at any instant, views may briefly disagree.

## Failure Detection

Gossip carries **heartbeats** (an ever-increasing counter per node). If a node's counter stops advancing across many gossip rounds, peers **suspect** it. Two influential designs:
- **SWIM** — separates *failure detection* (direct + indirect pings: "I can't reach X — can any of you?") from *dissemination* (gossip the result). Indirect probes avoid falsely blaming a node just because *one* link is bad.
- **Phi-accrual** — instead of a hard timeout, output a **suspicion level φ** from the statistical distribution of past heartbeat intervals; the app picks a threshold. Adapts to changing network latency instead of a brittle fixed timeout.

## Suspect → Confirm → Remove

Good detectors don't jump straight to "dead". A node moves **alive → suspected → dead (confirmed)**, giving a slow or briefly-partitioned node a chance to refute the suspicion (a **refutation** with a higher counter). This bounds **false positives** — the enemy of stable membership.

## Where You See It

- **Cassandra**, **DynamoDB**-style systems, **Consul/Serf**, **Redis Cluster**, **Akka Cluster** — all gossip membership + failure detection.

## Design Guidance

- **Tune the detector for your network** — aggressive timeouts flap on latency spikes; lax ones react slowly to real failures. Phi-accrual adapts automatically.
- **Suspect before removing** — allow refutation to cut false positives.
- **Bound message size** — gossip deltas, not the whole world, on each exchange.
- **Accept eventual convergence** — don't build logic needing an instant, globally-agreed membership; use consensus (see how-distributed-consensus-works) where you truly need agreement.

## Pitfalls (in understanding/using)

- Expecting an **instant, consistent** cluster view → gossip is eventually consistent.
- Timeouts too tight → healthy-but-slow nodes flap in and out ("false positive storms").
- Using gossip for data that needs **strong** agreement → use consensus, not gossip, for that.
- Ignoring version/heartbeat conflict resolution → stale state overwrites fresh state.
- Forgetting network partitions make **both** sides suspect the other.
