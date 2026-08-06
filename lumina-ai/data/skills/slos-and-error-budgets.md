---
name: slos-and-error-budgets
description: How SRE reliability targets work — SLIs (measured indicators), SLOs (objectives), SLAs (contracts), error budgets that quantify acceptable unreliability and balance velocity vs stability, and why 100% is the wrong target. Use when defining reliability targets, setting SLOs, using error budgets, or balancing shipping features against stability.
category: engineering
keywords_vi: slo sli sla, error budget ngân sách lỗi, mục tiêu độ tin cậy sre, chỉ số đo lường, cân bằng tốc độ vs ổn định, tại sao 100% là sai, độ khả dụng
---

# SLOs & Error Budgets

Site Reliability Engineering (SRE) makes reliability a **measurable, negotiable engineering target** rather than a vague "keep it up." The framework of SLIs, SLOs, and error budgets turns "how reliable should this be?" into concrete numbers that guide decisions.

## SLI, SLO, SLA (the vocabulary)

- **SLI (Service Level Indicator)** — a **measured** metric of service health: e.g. the % of requests served successfully under 300ms, or uptime. What you actually measure.
- **SLO (Service Level Objective)** — the **target** for an SLI: "99.9% of requests succeed within 300ms over 30 days." Your internal goal.
- **SLA (Service Level Agreement)** — a **contractual** promise to customers with consequences (refunds) if missed. SLAs are usually **looser** than internal SLOs (you want to breach your SLO — and get alerted — well before you breach the customer SLA).
Measure SLIs from the **user's perspective** (did their request succeed?), not just server internals.

## Why 100% Is the Wrong Target

Perfect reliability is **impossible and not worth it**: the cost rises exponentially near 100%, users usually can't perceive the difference beyond a point (their network/device fails more often than your 99.99% service), and chasing it **freezes all change** (every deploy risks the perfect record). So you pick a target that's **reliable enough** for users — often 99.9% or 99.95% — and deliberately accept the rest as budget for change.

## Error Budgets (the clever part)

If your SLO is 99.9% success, then **0.1% failure is allowed** — that's your **error budget**. It reframes unreliability as a **currency you can spend**:
- **Budget remaining** → you can take risks: ship features faster, run experiments, do risky migrations.
- **Budget exhausted** (too many failures this period) → **stop shipping risky changes**, freeze features, and focus on reliability until you're back within budget.
This **aligns dev and ops incentives** and turns the eternal "features vs stability" fight into a **data-driven policy**. Reliability work and feature work are balanced by the budget, not by argument or politics. Spending the budget wisely (on planned risk) is fine; blowing it on preventable incidents isn't.

## Using Them Well

- Set SLOs based on **what users actually need**, not arbitrary nines.
- **Alert on budget burn rate** — page when you're consuming the budget fast enough to breach, not on every blip.
- Review SLOs periodically — too strict wastes effort, too loose hurts users.
- Track a few **meaningful** SLIs (availability, latency, correctness), not dozens.

## Pitfalls (in understanding/using)

- Targeting **100%** — impossibly expensive, imperceptible to users, and it halts all change.
- Measuring the **wrong SLI** (server-side "it's up") when users experience failures — measure from the user's view.
- Setting the **SLO = SLA** (no margin) — you want internal alerts to fire before the customer contract breaks.
- Having SLOs but **not enforcing the error budget** (shipping recklessly with the budget blown) — then it's just a decoration.
- **Too many SLOs** → noise; focus on what matters to users.
- Alerting on raw errors instead of **budget burn rate** → alert fatigue (see observability-and-instrumentation, incident-response).
- Treating reliability as ops-only rather than a **shared, budgeted** engineering concern.
