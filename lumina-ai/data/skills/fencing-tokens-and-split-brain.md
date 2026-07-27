---
name: fencing-tokens-and-split-brain
description: Why distributed locks and leader election alone don't guarantee safety, and how fencing tokens fix it. A process can pause (GC, network stall) past its lock's expiry, wake up believing it still holds the lock, and corrupt shared state — the classic split-brain / stale-leader problem. Monotonic fencing tokens let the storage layer reject stale writers. Use to understand safe locking, leader leases, and split-brain prevention.
category: distributed-systems
keywords_vi: token phân định fencing tăng đơn điệu, khoá phân tán không đủ an toàn, tiến trình tạm dừng gc vượt hạn khoá rồi tưởng còn giữ, não phân đôi split-brain hai leader cùng ghi, tầng lưu trữ từ chối writer cũ stale, thuê leader lease và ngăn ghi đè hỏng
---

# Fencing Tokens & Split-Brain

Everyone reaches for a **distributed lock** to make sure only one process does something dangerous (write a file, run a job, act as leader). But a lock service **alone is not enough** for safety. The subtle killer: a process can **pause** — a long stop-the-world GC, a hypervisor freeze, a network stall — for longer than the lock's lease. The lock service, seeing no heartbeat, hands the lock to **another** process. Then the first process **wakes up**, still *believing* it holds the lock, and writes to shared storage — now **two** writers clobber each other. This is **split-brain** / the **stale-leader** problem (see how-distributed-consensus-works, leader-election, gossip-and-failure-detection).

## Why Leases and Timeouts Don't Save You

You cannot prevent arbitrary pauses, and you cannot make the paused process "notice" in time. Shortening lease timeouts only makes false expirations *more* likely. Fundamentally: **the moment a process checks "do I hold the lock?" is not the moment it performs the write** — anything can happen in between. Safety must be enforced **at the point of the write**, not at the point of the check.

## The Fix: Fencing Tokens

Every time the lock is granted, the lock service also returns a **monotonically increasing number** — a **fencing token** (1, 2, 3, …). The rule:
1. The client includes its token with **every write** to the protected resource.
2. The **storage/resource** remembers the highest token it has seen and **rejects any write with a lower (stale) token**.

Now the stale writer is harmless: when it wakes up and writes with token **33**, but the storage has already accepted token **34** from the new holder, the old write is **fenced off** (rejected). The resource itself enforces "only the latest legitimate holder wins" — no trust in well-behaved clients required.

## Why It Works

The token turns "who *thinks* they hold the lock" (unknowable, racy) into "who holds the **newest** grant" (a total order the storage can check). It doesn't stop pauses; it makes their consequences **safe**. This is the same idea as **epochs/terms** in consensus protocols (Raft terms, ZooKeeper `zxid`, Paxos ballot numbers) — a monotonic number that lets everyone ignore messages from an older leadership.

## Design Guidance

- **Require the resource to enforce fencing** — a lock is only *advisory* unless the protected store checks tokens. If the store can't check tokens, your lock is not safe.
- **Use monotonic tokens from the lock/consensus layer** (ZooKeeper `zxid`, etcd revision, a consensus term) — never a wall-clock timestamp (skew breaks monotonicity).
- **Pass the token end-to-end** — through every layer down to the write, not just at acquire time.
- **Prefer real consensus** (Raft/Paxos-backed) for leader election over ad-hoc locks when correctness matters.

## Pitfalls (in understanding/using)

- Believing a distributed lock **guarantees** mutual exclusion of *effects* → without fencing, a paused holder still corrupts state.
- Checking the lock, then writing later → the gap is where split-brain sneaks in; fence at the write.
- Using **timestamps** as tokens → clock skew violates monotonicity, defeating fencing.
- The resource **not** validating tokens → the token is decorative; nothing is actually fenced.
- Shrinking lease timeouts to "fix" it → more false expirations, more churn, still unsafe.
