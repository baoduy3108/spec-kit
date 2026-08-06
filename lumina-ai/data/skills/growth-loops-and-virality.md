---
name: growth-loops-and-virality
description: How growth loops and viral mechanics work — self-reinforcing loops where output feeds back into input (vs linear funnels), the viral coefficient (K-factor) and viral cycle time, types of loops (viral, content, paid), and why loops compound while funnels leak. Use when designing growth, thinking about virality/referrals, or building compounding acquisition.
category: engineering
keywords_vi: growth loop, vòng lặp tăng trưởng, viral virality lan truyền, viral coefficient k-factor, cycle time, loop vs funnel, referral giới thiệu, tăng trưởng cộng dồn compounding
---

# Growth Loops & Virality

Growth loops are **self-reinforcing systems** where the output of using a product feeds back to acquire more users — creating compounding growth, unlike linear funnels that constantly leak and need refilling. Understanding loops is the modern way to think about durable growth.

## Loops vs Funnels

- A **funnel** is linear: you pour traffic in the top, some convert, and you must **keep pouring** (and paying) to sustain it. Growth stops when spending stops.
- A **loop** is circular: **new users generate the input that acquires the next users**. Output → input → more output. Loops **compound** — each turn feeds the next — and can grow without proportional new spend. This reframing (from "funnel" to "loop") is the key mental shift.

## Types of Growth Loops

- **Viral loops** — users invite/bring other users (a user shares content, invites teammates, or the product is inherently multiplayer). New users create more new users directly.
- **Content loops** — usage generates content (user-generated pages, reviews, profiles) that ranks in search (see seo-content-strategy) and pulls in new users, who create more content.
- **Paid loops** — revenue from users funds acquisition of more users (works only if LTV > CAC with margin — see saas-metrics); reinvest the profit.
The best products stack multiple loops.

## The Viral Coefficient (K-factor)

For viral loops, **K = (invites sent per user) × (conversion rate of invites)**:
- **K > 1** → each user brings **more than one** new user → exponential, self-sustaining viral growth (rare and powerful).
- **K < 1** (most products) → virality **amplifies** other acquisition (each user brings a fraction more) but doesn't self-sustain alone — still valuable (lowers effective CAC).
Also crucial: **viral cycle time** — how *fast* the loop turns. A shorter cycle (invite → signup → invite) compounds far faster than a high K with a slow cycle. Speed often beats raw coefficient.

## Designing Loops

- **Build sharing/invites into the core value** — the loop should be a natural part of getting value (Dropbox's "get more space by inviting," collaborative tools needing teammates), not a bolted-on "share" button nobody clicks.
- **Reduce friction** at every step of the loop (fewer steps = higher conversion = higher K).
- **Give both sides a reason** (double-sided referral incentives).
- **Measure and optimize each step** of the loop like a mini-funnel.

## Pitfalls (in understanding/using)

- Thinking of growth as a **funnel** to refill rather than **loops** to compound.
- Bolting on a **"share" feature** disconnected from core value → nobody uses it; virality must be intrinsic.
- Obsessing over **K-factor** while ignoring **cycle time** (fast loops compound faster).
- Forgetting **paid loops need LTV > CAC** — an unprofitable loop just burns money faster.
- Ignoring **retention** — a loop feeding a leaky bucket (users churn fast) doesn't compound (see cohort-and-funnel-analysis).
- Faking virality with spammy invites that annoy users and damage the brand.
- Expecting exponential growth — most products have K < 1; virality is an amplifier, not usually the whole engine.
