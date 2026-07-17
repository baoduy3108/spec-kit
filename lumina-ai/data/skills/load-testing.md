---
name: load-testing
description: Load and performance testing — the test types (load, stress, spike, soak), thinking in latency percentiles not averages, defining SLOs, finding the breaking point and the bottleneck, and testing realistic scenarios. Use when validating a system can handle expected traffic or finding its capacity limits before production.
category: engineering
keywords_vi: load testing, load test, kiểm thử tải, stress test, đo hiệu năng, p99 percentile, throughput rps, bottleneck, chịu tải bao nhiêu
---

# Load Testing

Load testing answers "will this hold up under real traffic, and where does it break?" — before your users find out in production.

## Types of Test (different questions)

- **Load test** — expected peak traffic sustained; does it meet latency/error SLOs?
- **Stress test** — push past expected load until it breaks; find the **capacity limit** and how it fails (graceful vs cliff).
- **Spike test** — sudden surge (flash sale, launch); does it survive and recover?
- **Soak/endurance test** — moderate load for hours/days; reveals **leaks** and slow degradation (memory, connection pools, disk) that short tests miss.

## Measure Percentiles, Not Averages

**Averages lie.** A 100ms average can hide that 1% of users wait 5 seconds. Track **p50, p95, p99 (and p99.9)** latency — the tail is what users actually feel and what breaks under load. Also track **throughput** (requests/sec), **error rate**, and resource use (CPU, memory, connections). Set targets as SLOs ("p99 < 300ms at 1000 rps with <0.1% errors").

## Method

1. **Define the goal** — expected/peak load, and the SLO to meet.
2. **Model realistic scenarios** — real user journeys and traffic mix, realistic think-time and data variety — not one endpoint hammered with identical requests (which hits caches and misreports).
3. **Ramp up gradually** while watching latency/errors; find where p99 or errors start climbing — that's your **knee/capacity**.
4. **Find the bottleneck** — correlate the slowdown with a resource: CPU-bound? DB (slow queries, connection pool exhausted)? Downstream dependency? Locks? Fix the actual limiter, then re-test.
5. **Test in a production-like environment** — same infra sizing, data volume, and dependencies; results from a laptop don't transfer.

## Pitfalls

- **Averaging away the tail** — always look at p95/p99.
- **Unrealistic load** (same request repeatedly) → hits caches, misses real contention.
- **Testing on undersized/mocked infra** → meaningless numbers.
- **The load generator being the bottleneck** — verify the client can actually produce the load.
- **Not testing recovery** — after a spike, does it return to normal or stay degraded?
- Ignoring **soak** — a leak only shows over time.
