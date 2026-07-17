---
name: chaos-engineering
description: Chaos engineering — deliberately injecting failures (killed instances, network latency/partitions, dependency outages) to verify a system's resilience before real incidents do. Covers forming a hypothesis, blast-radius control, running in production carefully, and turning findings into fixes. Use when hardening a distributed system's reliability.
category: engineering
keywords_vi: chaos engineering, tiêm lỗi có chủ đích, kiểm thử độ bền hệ thống, giả lập sự cố, blast radius, resilience testing, kill instance mô phỏng, độ tin cậy phân tán
---

# Chaos Engineering

Chaos engineering is the practice of **deliberately injecting failures** to discover weaknesses before they cause a real outage. The premise: a distributed system's failure modes are too complex to reason about fully, so you *test* resilience empirically — "break it on purpose, in a controlled way, to prove it survives."

## The Method (it's an experiment, not random breaking)

1. **Define steady state** — a measurable "healthy" signal (p99 latency, success rate, orders/min). This is what you'll watch.
2. **Form a hypothesis** — "if the payments service goes down, checkout degrades gracefully and steady state holds." You're testing a belief about resilience.
3. **Inject a realistic failure** — kill an instance, add network latency, drop a dependency, fill a disk, spike CPU, partition the network.
4. **Observe** — did steady state hold? Did the fallback/circuit breaker/retry work as designed?
5. **If it broke**, you found a real weakness cheaply — fix it (add a timeout, a fallback, redundancy) and re-test.

## Control the Blast Radius

The point is controlled learning, not causing the outage you're trying to prevent:
- **Start small** — in staging, then a tiny slice of production traffic, then wider as confidence grows.
- **Have an abort/stop button** — halt the experiment instantly if steady state degrades badly.
- **Run when you can respond** — business hours with the team watching, not Friday night.
- **Minimize customer impact** — target redundant components; expand only what you understand.

## Common Experiments

Kill random instances (validates redundancy/auto-recovery — the original "Chaos Monkey"), inject latency/packet loss (validates timeouts and circuit breakers), take down a dependency (validates fallbacks/graceful degradation), simulate a zone/region outage, exhaust a resource (CPU/memory/disk/connections), and clock skew.

## Why It Works

Failures are inevitable in distributed systems; chaos engineering makes them happen **when you're watching and prepared** instead of at 3am. It validates that resilience patterns (retries, circuit breakers, redundancy, fallbacks) actually work under real failure — not just in theory. Findings turn into concrete fixes and runbooks.

## Prerequisites & Pitfalls

- **Don't start with chaos** — you need good monitoring/alerting and basic resilience patterns first, or you'll just cause an outage you can't observe or recover from.
- Running too broad, too early, or without a stop button → self-inflicted incident.
- No clear steady-state metric → you can't tell if the experiment "passed."
- Treating it as a one-off — resilience regresses; run experiments continuously as the system evolves.
