---
name: saas-metrics
description: The core metrics of a subscription/SaaS business — MRR/ARR, churn (customer vs revenue, gross vs net), LTV and CAC, the LTV:CAC ratio and CAC payback, expansion/NRR, and activation/retention. Use when analyzing a SaaS/subscription business, building a metrics dashboard, or reasoning about growth and unit economics.
category: engineering
keywords_vi: saas metrics, chỉ số saas, mrr arr doanh thu định kỳ, churn rời bỏ, ltv cac, net revenue retention, unit economics, giữ chân khách hàng
---

# SaaS Metrics

Subscription businesses live or die by a handful of metrics that reveal whether growth is healthy or a leaky bucket. These quantify acquisition, retention, and unit economics.

## Recurring Revenue

- **MRR / ARR** — Monthly / Annual Recurring Revenue: the predictable subscription revenue. The headline number. Decompose MRR change into **new + expansion + reactivation − contraction − churned** to see *why* it moved (growth quality matters, not just the total).

## Churn (the silent killer)

- **Customer churn** — % of customers who cancel in a period. **Revenue churn** — % of revenue lost. They differ when customers have different sizes.
- **Gross vs Net revenue churn** — gross counts only losses; **net** subtracts expansion from existing customers. **Negative net churn** (expansion > losses) means revenue grows even with zero new customers — the hallmark of a great SaaS.
- Small monthly churn compounds brutally (5%/month ≈ 46%/year). Retention is usually higher-leverage than acquisition.

## Unit Economics — LTV & CAC

- **CAC (Customer Acquisition Cost)** — total sales+marketing spend ÷ new customers acquired. What it costs to win a customer.
- **LTV (Lifetime Value)** — total gross-margin revenue you expect from a customer over their lifetime ≈ (ARPA × gross margin) ÷ churn rate. Higher retention → longer lifetime → higher LTV.
- **LTV:CAC ratio** — the core health check. **~3:1 or higher** is generally healthy; ~1:1 means you're paying as much as they're worth (unsustainable); very high (>5:1) may mean you're *underspending* on growth.
- **CAC payback period** — months to recover CAC from gross-margin revenue. Shorter = less cash tied up (< 12 months is often the target).

## Retention & Expansion

- **NRR (Net Revenue Retention)** — revenue this year from last year's cohort ÷ what they paid last year, including expansion and churn. **>100%** is excellent (existing customers grow). The single best summary of product-market fit + expansion.
- **Activation** — % of signups who reach the "aha" value moment. **Retention curves / cohort analysis** (see cohort-and-funnel-analysis) show whether users stick.

## Practical Approach

- **Retention first** — a leaky bucket can't be filled by pouring in more (fix churn before scaling acquisition).
- Watch **LTV:CAC and payback together** — growth is only good if the economics work.
- Segment by cohort/plan/channel — blended averages hide the truth.
- Define terms precisely and consistently (churn and MRR have many definitions — pick and document yours).

## Pitfalls

- **Vanity metrics** (total signups, page views) over ones tied to revenue/retention.
- **Confusing customer and revenue churn**, or gross and net.
- **Ignoring compounding** — "only 5% monthly churn" is a crisis.
- **Chasing acquisition while churn leaks** — unit economics never close.
- Measuring LTV with an unrealistically low churn assumption (inflates it).
- Blended CAC hiding that one channel is unprofitable.
