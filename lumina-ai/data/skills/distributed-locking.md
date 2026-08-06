---
name: distributed-locking
description: How distributed locks coordinate exclusive access across machines — why in-process locks don't work across servers, lock services (Redis/ZooKeeper/etcd), TTLs and fencing tokens, and the correctness pitfalls. Use to understand distributed locks, preventing concurrent processing across servers, Redlock, or coordinating a single leader/worker across a cluster.
category: engineering
keywords_vi: distributed locking, khóa phân tán, truy cập độc quyền nhiều máy, redis zookeeper etcd, ttl fencing token, redlock, phối hợp cluster, chỉ một tiến trình xử lý
---

# Distributed Locking

A distributed lock ensures that **only one process across many machines** does something at a time — process this job once, run this cron on only one node, guard a shared external resource. It's the cross-machine version of a mutex, and it's notoriously **easy to get subtly wrong**.

## Why In-Process Locks Don't Work

A normal mutex/lock (see concurrency-and-parallelism) only coordinates threads **within one process**. When your app runs on **multiple servers/instances** (the norm for scaled systems), each has its own memory — an in-process lock on server A means nothing to server B. So two instances can both run "the nightly billing job" or both process the same message. You need a lock in a **shared, external** system all instances consult.

## How It Works

Use a shared store as the lock authority:
- **Redis** — `SET key value NX PX <ttl>` (set if-not-exists with expiry) acquires the lock atomically; delete to release. Simple and fast.
- **ZooKeeper / etcd** — purpose-built coordination services using consensus (see how-distributed-consensus-works) for stronger correctness guarantees (ephemeral nodes, leases).
- **Database** — a row/advisory lock.
A process **acquires** the lock (atomically, so only one wins), does its work, and **releases** it. Others wait or skip.

## The TTL Problem (and why locks are hard)

What if the lock holder **crashes** while holding the lock? Without protection, the lock is held forever → deadlock. So locks have a **TTL (time-to-live)** — they auto-expire. But this creates a dangerous race:
- The holder is **slow** (GC pause, network hiccup) and its lock **expires** while it *thinks* it still holds it.
- Another process acquires the lock and starts working.
- Now **two processes** run concurrently — exactly what the lock was supposed to prevent.
This is the core correctness pitfall: a lock with a TTL is a *lease*, and leases can expire under you.

## Fencing Tokens (the correct fix)

To make distributed locking **safe**, the lock service issues a monotonically increasing **fencing token** with each grant. The protected resource (database, storage) **checks the token** and **rejects** writes with an older token than it has already seen. So even if a stale, expired-lock holder tries to act, its old token is refused — preventing the two-writers problem. Without fencing (or an equivalent), a distributed lock **cannot guarantee** mutual exclusion under delays. (This is the crux of the famous Redlock debate — locks alone aren't enough for correctness; you need the resource to enforce fencing.)

## When You Need It (and Alternatives)

- Ensuring **exactly one** worker/leader (see leader-election — often a better-structured solution).
- Preventing duplicate processing — but frequently **idempotency** (see idempotency) is a more robust approach: make the operation safe to run twice rather than trying to guarantee it runs once (which distributed systems can't truly promise).

## Pitfalls (in understanding/using)

- Assuming a **TTL lock guarantees** mutual exclusion — a slow holder can have its lock expire while still acting → two workers. Use **fencing tokens**.
- Using an **in-process** lock across multiple servers (does nothing cross-machine).
- **No TTL** → a crashed holder deadlocks the lock forever.
- Trusting a single Redis lock for **correctness-critical** work without fencing (the Redlock controversy).
- Preferring locking when **idempotency** would be simpler and safer (design for "safe to run twice" instead of "runs exactly once").
- The lock service becoming a **single point of failure**/bottleneck — use HA coordination (ZooKeeper/etcd) for critical cases.
- Long-held locks causing contention/timeouts — keep critical sections short.
