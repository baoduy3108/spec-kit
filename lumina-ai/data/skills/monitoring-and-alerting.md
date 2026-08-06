---
name: monitoring-and-alerting
description: How to design effective monitoring and alerting — the four golden signals, symptom-based vs cause-based alerting, actionable alerts to avoid fatigue, dashboards, on-call escalation, and alerting on SLO burn rate. Use to understand monitoring, designing alerts, reducing alert fatigue, what to monitor, or golden signals.
category: engineering
keywords_vi: monitoring alerting, giám sát và cảnh báo, golden signals, alert fatigue, actionable, alert theo triệu chứng vs nguyên nhân, dashboard escalation, slo burn rate
---

# Monitoring & Alerting

Monitoring tells you how your system is behaving; alerting tells you **when a human needs to act**. The goal isn't to collect every metric or alarm on everything — it's to detect real problems fast while keeping alerts **rare, meaningful, and actionable**. (See observability-and-instrumentation for the instrumentation side.)

## The Four Golden Signals

For any user-facing service, monitor these four (from Google SRE) — they cover most problems:
- **Latency** — how long requests take (track percentiles p50/p95/**p99**, not just averages — averages hide the slow tail).
- **Traffic** — how much demand (requests/sec, throughput).
- **Errors** — the rate of failed requests.
- **Saturation** — how "full" your resources are (CPU, memory, disk, queue depth) — how close to capacity (see capacity-planning).
Watching these four gives strong coverage without drowning in metrics. Measure from the **user's perspective** where possible.

## Symptom-Based vs Cause-Based Alerting

The key principle: **alert on symptoms (user-visible problems), not every possible cause.**
- **Symptom-based** — "error rate is high," "latency exceeds SLO," "the checkout is failing." These matter because they mean **users are affected** — alert on them.
- **Cause-based** — "CPU is at 90%," "disk is filling." A cause only matters if it **causes a symptom**; high CPU that isn't hurting users is often not worth waking someone. Alerting on every cause creates noise.
Page on **user impact**; use causes for **diagnosis** (dashboards) once you're investigating.

## Actionable Alerts (avoid alert fatigue)

Every alert that pages a human should be **urgent, real, and actionable** — something that requires action *now*. The enemy is **alert fatigue**: too many alerts (especially noisy, non-actionable, or flapping ones) train people to **ignore** them — so the one real alert gets missed. Rules:
- If an alert isn't actionable, it shouldn't page (make it a ticket/log or delete it).
- Tune out flapping/noisy alerts ruthlessly.
- Every page should have a clear "what do I do?" (link a runbook — see runbooks-and-oncall).
Fewer, better alerts beat comprehensive noise.

## Alert on SLO Burn Rate

The modern approach (see slos-and-error-budgets): instead of alerting on raw thresholds, alert on the **rate you're consuming your error budget**. A fast burn (you'll blow the monthly budget in an hour) pages urgently; a slow burn is a ticket. This ties alerts directly to **user-facing reliability** and cuts noise.

## Dashboards & Escalation

- **Dashboards** — for **investigation** and trends (the golden signals, dependencies, resource use), not for alerting. When an alert fires, dashboards help diagnose.
- **On-call & escalation** — route alerts to whoever's on call, with escalation if unacknowledged (see runbooks-and-oncall). Include context (what, where, severity, runbook link).

## Pitfalls (in understanding/using)

- **Alert fatigue** — too many/noisy alerts → people ignore all of them, missing the real one. Alert only on actionable, user-impacting symptoms.
- **Cause-based alerting** on everything (CPU, disk) → noise; page on symptoms, use causes to diagnose.
- Alerting on **averages** instead of **percentiles** — averages hide the slow tail users feel.
- Alerts with **no runbook / no clear action** — the responder doesn't know what to do.
- **Monitoring internals** but not the **user experience** — measure what users actually feel.
- Dashboards **as alerts** (staring at graphs) instead of automated alerting.
- Never **tuning** alerts — noise accumulates; prune regularly.
