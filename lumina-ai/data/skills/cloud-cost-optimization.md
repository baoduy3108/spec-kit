---
name: cloud-cost-optimization
description: How to control cloud costs (FinOps) — visibility and attribution (tagging), right-sizing, eliminating waste (idle/orphaned resources), pricing models (on-demand vs reserved vs spot), autoscaling, storage tiering, and watching egress. Use to understand cloud cost optimization, FinOps, reducing an AWS/GCP/Azure bill, or right-sizing infrastructure.
category: engineering
keywords_vi: cloud cost optimization, tối ưu chi phí đám mây, finops, right-sizing, tài nguyên nhàn rỗi lãng phí, reserved spot on-demand, autoscaling, egress lưu trữ phân tầng
---

# Cloud Cost Optimization (FinOps)

Cloud makes spinning up resources trivial — which makes **overspending** trivial too. FinOps is the practice of getting cloud costs under control without hurting performance: see where money goes, cut waste, and buy capacity smartly. A few habits often cut bills 30–50%.

## Visibility First (you can't optimize what you can't see)

The first step is **attribution**: know *what* costs money and *who/what* owns it.
- **Tag resources** (by team, service, environment) so costs map to owners and projects.
- Use cost dashboards/reports to find the **biggest line items** and **anomalies** (a sudden spike).
- Make costs **visible to the teams** that create them — engineers optimize what they can see (FinOps is a culture, not just a tool).
Without visibility, optimization is guessing.

## Eliminate Waste

The easiest wins are **paying for nothing**:
- **Idle/underused resources** — over-provisioned instances running at 10% CPU, oversized databases.
- **Orphaned resources** — unattached disks, unused IPs, old snapshots, forgotten dev environments, stale load balancers. These silently accrue.
- **Non-prod running 24/7** — shut down dev/staging nights and weekends (they don't need to run when nobody's working).
Regularly hunt and delete waste.

## Right-Sizing

Match resource size to **actual** usage. Most instances are over-provisioned "to be safe." Use utilization metrics to downsize CPU/memory to what's actually needed (with headroom — see capacity-planning), and use autoscaling so you pay for peak only at peak, not always.

## Pricing Models (buy smart)

Cloud offers big discounts for commitment/flexibility:
- **On-demand** — pay-as-you-go, most expensive, most flexible. For unpredictable/spiky workloads.
- **Reserved / savings plans / committed use** — commit to 1–3 years for large discounts (up to ~70%). For **steady, predictable** baseline load.
- **Spot / preemptible** — spare capacity at huge discounts (up to ~90%), but can be **reclaimed anytime**. For **fault-tolerant, interruptible** workloads (batch, CI, stateless workers).
Mix them: reserved for baseline, on-demand for variable, spot for interruptible.

## Storage & Data Transfer

- **Storage tiering** — move infrequently-accessed data to cheaper cold/archive tiers with lifecycle rules (see object-storage).
- **Egress fees** — data **leaving** the cloud (to the internet or across regions) is often expensive and easily overlooked. Minimize cross-region/cross-cloud transfer; use CDNs (see how-cdns-work) to cut egress.
- Delete old logs/backups/snapshots per a retention policy.

## Pitfalls (in understanding/using)

- **No visibility/tagging** — you can't optimize an unattributed bill; tag everything.
- **Orphaned/idle resources** quietly draining money — audit and clean regularly.
- **Over-provisioning** "to be safe" as the default — right-size with data.
- Ignoring **commitment discounts** on steady workloads (paying on-demand for baseline).
- Using **spot** for stateful/critical work that can't tolerate interruption.
- **Egress surprises** — cross-region/internet data transfer costs; architect to minimize it.
- Optimizing cost so hard you **hurt reliability/performance** — balance against SLOs (see slos-and-error-budgets).
- Treating it as a one-time cleanup rather than **ongoing** practice (usage grows).
