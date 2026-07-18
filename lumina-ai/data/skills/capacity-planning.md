---
name: capacity-planning
description: How to plan system capacity — estimating load (throughput, peak vs average), headroom for spikes, vertical vs horizontal scaling, identifying bottlenecks, load testing to find limits, and autoscaling. Use when sizing infrastructure, planning for growth/traffic spikes, avoiding over/under-provisioning, or preparing for a launch.
category: engineering
keywords_vi: capacity planning, lập kế hoạch dung lượng, ước lượng tải throughput, peak vs average, headroom dự phòng spike, scale dọc ngang, nút thắt bottleneck, autoscaling
---

# Capacity Planning

Capacity planning is ensuring a system has **enough resources to handle its load** — now and as it grows — without wasting money on idle over-provisioning or falling over under a spike. It's part estimation, part measurement, part safety margin.

## Estimate the Load

Start with numbers, not guesses:
- **Throughput** — requests/second, transactions/day, data volume. Derive from users × actions × frequency.
- **Peak vs average** — this is critical: systems must survive the **peak**, not the average. Traffic is spiky (business hours, launches, flash sales, the "thundering herd" when a notification fires). A system sized for average load dies at peak. Know your peak-to-average ratio.
- **Growth** — project forward (organic growth, marketing, seasonality) so you're not re-planning constantly.
- **Resource per unit** — how much CPU/memory/DB/IO one request costs (measure it — see load-testing).

## Headroom for Spikes

Never run at 100% of capacity — leave **headroom** (buffer) for unexpected spikes, failures (a node dying shifts its load to others), and growth. A common target is running at ~50–70% of capacity at peak, so a surge or a lost node doesn't tip you over. Too little headroom = fragile; too much = wasteful. Autoscaling reduces (but doesn't eliminate) the need for static headroom.

## Scaling: Vertical vs Horizontal

- **Vertical (scale up)** — a bigger machine (more CPU/RAM). Simple, but has a **ceiling** and a single point of failure.
- **Horizontal (scale out)** — more machines behind a load balancer (see how-load-balancers-work). Scales far further and adds redundancy, but requires the app to be **stateless/shardable** and adds coordination complexity.
Most scalable systems go horizontal for the stateless tiers; the **database** is often the hardest to scale (see how-database-replication-works, how-database-sharding-works) and frequently the real bottleneck.

## Find the Bottleneck

A system is only as fast as its **slowest resource** — CPU, memory, disk I/O, network, database connections, or a downstream dependency. Capacity planning means finding **which** resource saturates first and sizing/scaling *that*. Adding web servers doesn't help if the database is the bottleneck. **Load test** (see load-testing) to find real limits and the breaking point, rather than guessing.

## Autoscaling

Cloud **autoscaling** adds/removes capacity based on demand (CPU, request rate, queue depth) — matching resources to load and saving money off-peak. But it's not magic: scaling up takes time (cold starts, warm-up), so it lags sudden spikes; it can't fix a non-scalable bottleneck (a single DB); and misconfigured thresholds cause thrashing or runaway cost. Combine autoscaling with baseline headroom for instant spikes.

## Pitfalls (in understanding/using)

- Sizing for **average** instead of **peak** load → outages at the worst time.
- Running at **~100% capacity** with no headroom → any spike/failure tips it over.
- **Scaling the wrong tier** — adding app servers when the database is the bottleneck.
- Assuming **autoscaling** handles everything — it lags spikes, can't scale a stateful bottleneck, and can blow the budget.
- **Guessing** limits instead of **load testing** to find the real breaking point.
- Ignoring **downstream dependencies** (a third-party API, a shared DB) that cap your capacity.
- Over-provisioning "to be safe" → burning money; balance headroom against cost.
