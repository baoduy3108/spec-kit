---
name: roadmap-prioritization
description: How to prioritize a product roadmap and backlog — scoring frameworks (RICE, ICE, value vs effort, weighted scoring), MoSCoW, avoiding the feature factory, saying no, and outcome-based over feature-based roadmaps. Use when prioritizing features, building a roadmap, deciding what to work on next, or defending trade-offs to stakeholders.
category: engineering
keywords_vi: roadmap prioritization, ưu tiên lộ trình sản phẩm, rice ice scoring, value vs effort, moscow, nói không với tính năng, outcome vs feature, feature factory
---

# Roadmap Prioritization

With infinite ideas and finite time, prioritization is the core product skill. Good prioritization means consistently working on the **highest-impact things** and confidently **saying no** to the rest — with a rationale you can defend to stakeholders.

## Scoring Frameworks

Structured scoring makes trade-offs explicit and less political:
- **RICE** — score each item by **Reach** (how many users) × **Impact** × **Confidence** ÷ **Effort**. Higher RICE = do sooner. Forces you to quantify assumptions and penalizes low-confidence, high-effort bets.
- **ICE** — a lighter Impact × Confidence × Ease.
- **Value vs Effort (2×2)** — plot items; do **high-value/low-effort** first ("quick wins"), schedule high-value/high-effort ("big bets"), avoid low-value/high-effort ("money pits").
- **Weighted scoring** — score against multiple weighted criteria (strategic fit, revenue, risk).
These aren't precise truth — they're **thinking tools** to compare apples to apples and surface disagreement (see decision-making-frameworks).

## MoSCoW (for scoping)

For a given release, classify: **Must have** (non-negotiable), **Should have** (important, not vital), **Could have** (nice if time allows), **Won't have (this time)** (explicitly deferred). Great for scope negotiation and setting expectations — the explicit "Won't have" is powerful for saying no clearly.

## Outcomes Over Features

The biggest shift: prioritize by the **outcome/problem** you'll move (a metric, a user pain), not a list of features to ship. A **feature factory** cranks out features and measures output ("we shipped 12 things") instead of impact ("did anything improve?"). Frame the roadmap around **problems to solve / results to achieve**, and let discovery (see product-discovery) determine the feature. This keeps you honest about value.

## The Art of Saying No

Prioritization is mostly **declining** good ideas so you can do the great ones. Every yes is a no to something else (opportunity cost). Say no with a **reason** (it scored low, it doesn't serve our current goal) — a transparent framework makes no's defensible and depersonalizes them. A roadmap that says yes to everything delivers nothing well.

## Pitfalls (in understanding/using)

- **Feature factory** — measuring output (shipped features) instead of outcomes (impact); prioritize problems/results.
- Treating scores (RICE) as **objective truth** — they're structured estimates; use them to discuss, not to autopilot.
- **HiPPO** decisions (highest-paid person's opinion) overriding evidence — frameworks help push back.
- **Sandbagging effort/confidence** to justify a pet feature — be honest in inputs.
- Prioritizing only **quick wins** and never the strategic big bets (or vice versa) — balance the portfolio.
- Roadmaps as **date-locked feature commitments** — prefer outcome-based, time-horizon (now/next/later) roadmaps that absorb learning.
- Not communicating the **why** — stakeholders accept trade-offs far better with visible rationale.
