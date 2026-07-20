---
name: system-design-fundamentals
description: Reason about scalable system architecture — clarify requirements and estimate scale first, then apply load balancing, horizontal scaling and statelessness, caching layers, database replication/sharding, async queues, the CAP trade-off, and idempotency. Use when designing a system's architecture or answering a system-design question.
category: engineering
keywords_vi: thiết kế hệ thống, system design, kiến trúc mở rộng, scalability, load balancing, caching, sharding, thiết kế hệ thống chịu tải
---

# System Design Fundamentals

Design starts with requirements and numbers, not boxes. Wrong scale estimates produce wrong architectures.

## Start Here

1. **Clarify functional + non-functional requirements** — what it must do, plus scale (users, QPS, data size), latency targets, read/write ratio, consistency needs, availability target.
2. **Estimate** — back-of-envelope QPS, storage/year, bandwidth. This decides whether you need one server or a fleet.
3. **Define the API and data model** before drawing infrastructure.

## Scaling Levers (in rough order)

- **Vertical first** (bigger box) is simplest — until it isn't; then go horizontal.
- **Horizontal scaling + statelessness** — put app servers behind a **load balancer**; keep servers stateless (session/state in a shared store) so any server handles any request and you can add/remove nodes freely.
- **Caching** — the highest-leverage speedup. Cache at multiple layers (CDN for static, in-memory like Redis for hot data, application-level for computed results). Decide invalidation strategy (TTL, write-through, write-behind) — stale cache is the classic bug.
- **Database scaling** — read replicas for read-heavy loads (accept replication lag → eventual consistency on reads); **sharding/partitioning** for write/size limits (pick a shard key that spreads load and avoids hot spots; cross-shard queries get expensive).
- **Async & queues** — offload slow/spiky work (email, image processing, fan-out) to a queue + workers; smooths load and decouples producer from consumer.

## Trade-offs to State Explicitly

- **CAP** — under a network partition you choose consistency *or* availability. Most web systems pick availability + eventual consistency; financial cores pick consistency. Name the choice per component.
- **Idempotency** — retries and at-least-once queues mean operations can run twice; design mutations to be idempotent (idempotency keys, upserts).
- **Consistency spectrum** — strong vs eventual; pick per feature, not globally.
- **Single points of failure** — every critical component needs redundancy; the load balancer and the database primary are common SPOFs.

## Reliability

Add observability (metrics/logs/traces), health checks, timeouts + retries with backoff + circuit breakers between services, and rate limiting at the edge. Design for graceful degradation — shed load or serve stale data rather than fall over.
