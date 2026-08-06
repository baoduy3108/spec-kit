---
name: cohort-and-funnel-analysis
description: Two core product-analytics techniques — funnel analysis (where users drop off across a sequence of steps) and cohort analysis (how groups defined by a shared start behave/retain over time). Use when analyzing user behavior, diagnosing drop-off, measuring retention, or evaluating whether a change actually improved things.
category: engineering
keywords_vi: cohort analysis, funnel analysis, phân tích phễu, phân tích nhóm cohort, tỷ lệ rớt drop off, retention giữ chân, phân tích hành vi người dùng
---

# Cohort & Funnel Analysis

Two complementary lenses on user behavior. **Funnels** answer *"where do users drop off in a flow?"*; **cohorts** answer *"do users stick around over time, and is that getting better?"* Together they turn raw event data into decisions.

## Funnel Analysis

A **funnel** is an ordered sequence of steps toward a goal (e.g. visit → sign up → activate → purchase). Funnel analysis measures the **conversion rate between each step** and reveals the **biggest drop-off** — where you're losing people.
- Focus effort on the **leakiest step** (highest-leverage fix), not the one that's easiest to tweak.
- **Segment** the funnel (by channel, device, plan, cohort) — an average conversion hides that mobile converts half as well as desktop.
- Watch **time-to-convert** — a step people eventually complete but slowly is different from one they abandon.
- Define steps as **events** precisely; ambiguous step definitions produce misleading rates.

## Cohort Analysis

A **cohort** is a group of users sharing a start characteristic — usually **signup period** (the January cohort, the week-12 cohort). You track a metric (retention, revenue, activation) for each cohort **over the weeks/months since their start**, laid out as a triangle/heatmap.
- **Retention curves** reveal whether your product is "sticky": a curve that **flattens** to a plateau means you have a core of retained users (good); one that **decays to zero** means no lasting value (a leaky bucket no acquisition can fix).
- **Compare cohorts over time** — if newer cohorts retain better than older ones, your product/onboarding changes are working. This is how you tell real improvement from noise.
- **Behavioral cohorts** (grouping by an action taken, not just signup date) reveal what predicts retention — e.g. "users who invited a teammate in week 1 retain 3×." That points at your activation lever.

## Using Them Together

- Funnels find **where** users drop; cohorts show whether fixes **durably** improve retention.
- Retention (cohort plateau) usually beats top-of-funnel acquisition for long-term growth (see saas-metrics) — a great funnel feeding a leaky product still fails.
- Tie both to a clear **North Star** action that represents real value delivered.

## Practical Approach

- Instrument clean, well-named events first (garbage events → garbage analysis).
- Always **segment** — blended numbers mislead.
- Look for the **flattening point** of retention curves; that plateau is your true retained base.
- Change one thing, then compare **new cohorts** to old — that's your controlled read on impact.

## Pitfalls

- **Blended averages** hiding that segments behave very differently.
- Reading a **single cohort** as truth (small samples/seasonality mislead) — compare several.
- **Vanity funnels** optimizing a step that doesn't drive real value/retention.
- Confusing **correlation with causation** in behavioral cohorts (inv>iting teammates may correlate with already-committed users) — validate with experiments.
- Ignoring **survivorship** — recent cohorts have had less time; don't compare their retention to old cohorts at the same calendar date.
