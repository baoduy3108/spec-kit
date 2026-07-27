---
name: tail-latency-and-hedged-requests
description: Why the SLOW requests (p99, p99.9) dominate user experience in large systems, and the techniques that tame them — hedged/backup requests, request cancellation, tied requests, and avoiding fan-out amplification. Use to understand why average latency lies, why one slow component ruins a fan-out, and how to trade a little extra load for dramatically better tail latency.
category: distributed-systems
keywords_vi: độ trễ đuôi tail latency p99 và p99.9, request dự phòng hedged gửi bản sao thứ hai, trung bình che giấu phần trăm chậm, fan-out khuếch đại một thành phần chậm làm hỏng cả phản hồi, huỷ request thừa để giảm tải, đánh đổi tải thêm lấy đuôi ngắn hơn
---

# Tail Latency & Hedged Requests

Users don't experience your **average** latency — they experience your **worst** requests. In a system where a single user action fans out to dozens or hundreds of backend calls, the overall response is only as fast as the **slowest** call. So the tail of the latency distribution (**p99, p99.9**) — not the mean or median — decides how the product *feels*. This is the central insight of "The Tail at Scale" (see performance-optimization, load-shedding-and-graceful-degradation, distributed-systems-fundamentals).

## Why the Average Lies

Say each backend call is fast 99% of the time but occasionally slow (GC pause, cold cache, a busy disk, a noisy neighbor). One call: 1% chance of hitting the slow path. But a request that **fans out to 100** parallel calls waits for the slowest — the chance that *at least one* is slow is `1 − 0.99¹⁰⁰ ≈ 63%`. **Fan-out amplifies the tail**: rare slowness becomes the common case for whole requests. The mean latency of one component tells you almost nothing about user-visible latency.

## Sources of Tail Latency

- **Shared resource contention** — CPU, disk, network, locks; a "noisy neighbor" on the same host.
- **Background activity** — GC, compaction (LSM), log rotation, checkpoints, cron jobs.
- **Queueing** — a brief burst fills a queue; requests behind it wait.
- **Cold state** — cache misses, JIT warmup, connection setup.

## Hedged & Tied Requests

The key technique: **don't let one unlucky replica hold you hostage.**
- **Hedged requests** — send the request to one replica; if no reply within, say, the p95 latency, send a **second** copy to another replica and take whichever answers first. This adds only ~5% extra load (you only hedge the slow tail) but can slash p99 dramatically.
- **Tied requests** — send to two replicas *immediately*, each tagged so that when one **starts** executing it tells the other to **cancel**. Cuts the tail further at a bit more load; needs cheap cancellation.
- **Cancellation** — critical hygiene: when the winner returns, **cancel the losers** so you don't pay double for everything.

## Other Tail-Taming Moves

- **Micro-partition + rebalance** — many small shards so a hot one can be moved off a slow host.
- **Prefer slightly-stale over slow** — serve a cached/replica answer rather than wait on the straggler.
- **Isolate background work** — throttle compaction/GC so it doesn't spike foreground latency.
- **Load-shed** — under overload, drop or degrade rather than let queues (and the tail) explode.

## Design Guidance

- **Measure p99/p99.9, not just the mean** — dashboards must show percentiles, or you're blind to what users feel.
- **Hedge the tail, not everything** — trigger the backup only after a threshold (e.g. p95) so extra load stays small.
- **Always cancel losers** — un-cancelled hedges double your real load.
- **Budget latency across the fan-out** — the more parallel calls, the tighter each one's tail must be.

## Pitfalls (in understanding/using)

- Optimizing the **average** while p99 rots → users still see slowness.
- Hedging **immediately on every request** → you double load and can make overload worse.
- Forgetting cancellation → wasted duplicate work, higher utilization, worse tail.
- Ignoring that **fan-out amplifies** rare slowness into common slowness.
- Treating a single slow component as "rare enough to ignore" when it's on the critical fan-out path.
