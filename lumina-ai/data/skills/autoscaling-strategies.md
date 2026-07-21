---
name: autoscaling-strategies
description: How autoscaling works — horizontal vs vertical scaling, reactive metric-based scaling (HPA on CPU/custom metrics), cluster autoscaling for nodes, predictive/scheduled scaling, and pitfalls like thrashing and slow scale-up. Use to design autoscaling, understand HPA/cluster autoscaler, scale to demand, or avoid autoscaling thrashing.
category: engineering
keywords_vi: autoscaling, hpa horizontal pod autoscaler, cluster autoscaler, scale out in, mở rộng ngang vs dọc, scale theo metric, tránh thrashing scale-up chậm, scale to zero
---

# Autoscaling Strategies

Autoscaling automatically adjusts capacity to match **demand** — scaling **up** to handle load spikes and **down** to save money when idle. Done right, it gives you elasticity and cost efficiency; done wrong, it thrashes, scales too slowly to help, or costs a fortune. The key decisions are **what** to scale, **on what signal**, and **how fast** (see capacity-planning, backpressure-and-flow-control, kubernetes-basics).

## Horizontal vs Vertical Scaling

- **Horizontal (scale out/in)** — add/remove **instances** (more pods/servers). The preferred approach for stateless services: near-limitless, resilient (many small instances), and what cloud/Kubernetes are built for. Requires the workload to run in parallel (stateless, load-balanced).
- **Vertical (scale up/down)** — give an instance **more resources** (CPU/RAM). Simpler, and sometimes the only option (a single stateful process, a database), but bounded by the biggest machine and usually needs a restart. Databases often scale vertically (or via sharding — see how-database-sharding-works).
Prefer **horizontal** for stateless workloads; vertical where you can't parallelize.

## Reactive (Metric-Based) Scaling

The common mode: scale based on **observed metrics** vs a target:
- **HPA (Horizontal Pod Autoscaler)** in Kubernetes — scale replica count to keep a metric (CPU %, memory, or **custom/application metrics** like requests-per-second or queue depth) near a target.
- **Cluster Autoscaler** — a **second layer**: when pods can't be scheduled (no room), it adds **nodes** to the cluster; removes underused nodes when idle. Pod autoscaling and node autoscaling work **together** (scaling pods is useless if there's no node capacity).
- **Choose the right metric** — CPU is easy but often a poor proxy; **queue depth / latency / RPS** frequently reflects real load better (see backpressure-and-flow-control).

## Predictive and Scheduled Scaling

Reactive scaling **lags** — it reacts *after* load rises, and spinning up capacity takes time (image pull, warmup). For **predictable** patterns:
- **Scheduled scaling** — scale up before a known daily peak / business hours, down overnight.
- **Predictive scaling** — use historical trends/ML to scale **ahead** of anticipated demand.
These pre-provision capacity so it's ready when the spike hits, instead of scrambling after.

## The Hard Parts

- **Scale-up latency** — new instances aren't instant (provisioning, image pull, warmup, JIT). A sudden spike can overwhelm before autoscaling catches up; keep **headroom** or pre-warm.
- **Thrashing (flapping)** — scaling up and down repeatedly around the threshold wastes resources and churns. Fix with **cooldown/stabilization windows** and hysteresis (different up/down thresholds).
- **Scale-to-zero** — great for cost (serverless), but reintroduces **cold starts** (see how-jit-compilers-work for the warmup analogy).
- **Statefulness** — scaling stateful services is hard (data must move/replicate); mostly scale stateless tiers.

## Design Guidance

- **Horizontal for stateless**, vertical where you must; keep services stateless to scale freely.
- **Scale on a meaningful metric** (queue depth/latency/RPS), not just CPU.
- **Pair pod + cluster autoscaling** so pods have nodes to land on.
- **Set min/max bounds** and **cooldowns** to prevent thrashing and runaway cost.
- **Pre-scale** for known peaks (scheduled/predictive); keep headroom for spike latency.
- **Load-shed** (see backpressure-and-flow-control) as a safety net while scaling catches up.
- **Test** autoscaling under realistic spikes; watch cost.

## Pitfalls (in understanding/using)

- Scaling **pods** without **cluster** autoscaling → pods stuck pending (no node capacity).
- **Thrashing** from tight thresholds/no cooldown → constant churn, wasted resources.
- Scaling on **CPU** when load is really I/O/queue-bound → scales at the wrong time.
- Ignoring **scale-up latency** → the spike overwhelms you before capacity arrives; keep headroom.
- **No max bound** → a traffic surge (or bug/loop) auto-scales into a huge bill.
- Trying to horizontally scale a **stateful** service naively → data consistency problems.
- **Scale-to-zero** cold starts hurting latency-sensitive paths.
