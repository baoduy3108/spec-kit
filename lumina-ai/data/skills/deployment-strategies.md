---
name: deployment-strategies
description: How to release software safely — rolling, blue-green, and canary deployments, feature flags for decoupling deploy from release, health checks and automated rollback, and minimizing blast radius. Use when deploying to production, choosing a release strategy, doing zero-downtime deploys, or reducing deployment risk.
category: engineering
keywords_vi: deployment strategy, chiến lược triển khai, rolling blue-green canary, zero-downtime, feature flag tách deploy khỏi release, health check rollback tự động, giảm blast radius
---

# Deployment Strategies

How you push new code to production determines whether a bad release causes an outage or a shrug. Good deployment strategies deliver **zero downtime** and **limit the blast radius** of a bad version so problems are caught small and rolled back fast.

## Rolling Deployment

Update instances **gradually** — replace a few at a time with the new version while the rest keep serving. No downtime (there are always healthy instances), and it needs no extra infrastructure. But during the roll, **old and new versions run simultaneously** — so changes must be backward-compatible (especially the database — see database-migrations), and rolling back means rolling forward/back gradually. The default for most orchestrators (Kubernetes).

## Blue-Green Deployment

Run **two identical environments**: **blue** (current, live) and **green** (new version). Deploy to green, test it fully, then **switch all traffic** (via load balancer/router) from blue to green instantly. Benefits: instant cutover, and instant **rollback** (switch back to blue). Cost: you need double the infrastructure during the switch, and you must handle in-flight sessions and shared state (the database is shared, so schema must be compatible with both).

## Canary Deployment

Release the new version to a **small subset** of traffic/users first (e.g. 1%, then 5%, 25%, 100%), **watching metrics** (errors, latency) at each step. If the canary looks bad, roll it back having affected only a few users; if healthy, ramp up. This **minimizes blast radius** — you catch problems in production with real traffic but limited exposure. The most cautious, data-driven approach; needs good monitoring (see observability-and-instrumentation) and traffic-splitting.

## Decouple Deploy from Release: Feature Flags

**Deploying** code and **releasing** a feature don't have to be the same event. **Feature flags** (see feature-flags-and-rollouts) let you deploy code with a feature **turned off**, then enable it for a percent of users at will — and turn it **off instantly** without a redeploy if it misbehaves. This separates the risky "ship the code" from "expose the feature," enabling gradual rollout, A/B tests, and instant kill switches.

## Safety Nets

- **Health checks / readiness probes** — don't send traffic to an instance until it's healthy; pull unhealthy ones.
- **Automated rollback** — if error/latency metrics breach thresholds after deploy, roll back automatically.
- **Backward compatibility** — since old and new run together (rolling/canary/blue-green share a DB), avoid breaking schema/API changes in one step (expand-contract).
- **Observability** — you can only canary/auto-rollback if you can *see* the metrics.

## Pitfalls (in understanding/using)

- **Breaking schema/API changes** deployed in one step while old code still runs → errors; make changes backward-compatible (see database-migrations).
- **Big-bang deploys** (replace everything at once) → large blast radius, downtime, hard rollback.
- Canary/blue-green **without monitoring** — you can't tell if the new version is bad.
- Coupling **deploy and release** — no way to disable a bad feature without a full redeploy; use flags.
- Forgetting **in-flight requests/sessions** and shared state during cutover.
- No **automated/fast rollback** plan — a bad deploy at 3am with no quick revert is an outage.
- Long-lived feature flags never cleaned up → flag debt (see feature-flags-and-rollouts).
