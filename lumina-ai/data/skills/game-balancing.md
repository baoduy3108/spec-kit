---
name: game-balancing
description: Balance a game — difficulty curves and pacing, economy design (sources/sinks, inflation), avoiding dominant strategies, symmetric vs asymmetric balance, risk/reward, and tuning through playtesting and data. Use when a game feels too easy/hard, has a broken "best" strategy, or its economy/progression is off.
category: design
keywords_vi: cân bằng game, game balancing, đường cong độ khó, kinh tế trong game economy sink source, chiến thuật bá đạo dominant strategy, risk reward, tinh chỉnh playtest, game dễ quá khó quá
---

# Game Balancing

Balancing tunes a game so it's fair, challenging, and offers viable choices. Even great mechanics feel bad if the difficulty, economy, or options are off. It's mostly iteration and data, not one-shot design.

## Difficulty Curve & Pacing

Difficulty should **rise to match the player's growing skill**, keeping them in flow (see game-design-fundamentals) — not flat, not a sudden wall. Pace it: gentle onboarding, escalating challenge, peaks (bosses) and valleys (breathers) rather than relentless intensity. Offer **difficulty options** since players' skills vary widely. A spike that frustrates or a plateau that bores both break engagement.

## Economy Design (sources & sinks)

A game economy (gold, resources, XP) is balanced by **sources** (how players *gain*) and **sinks** (how they *spend/lose*). If sources exceed sinks, currency **inflates** and becomes meaningless (everything's affordable, no tension); if sinks dominate, players feel starved. Balance the flow so resources stay meaningful and choices about spending stay interesting. Watch for exploits that generate infinite resources (a broken source).

## Avoid Dominant Strategies

The classic balance failure: one **dominant strategy/build/unit** that's strictly best, so everyone uses it and all other options are wasted — the game collapses to one choice (no meaningful decisions). Aim for **rock-paper-scissors**-style relationships where every option has a counter and a niche. If playtesters all converge on one tactic, it's overpowered — nerf it or buff alternatives. Perfect balance is impossible; the goal is *multiple viable* options, not identical ones.

## Symmetric vs Asymmetric

- **Symmetric** — all players have the same tools (chess, many shooters). Easier to balance (fairness is inherent), but can feel samey.
- **Asymmetric** — players have different abilities/factions/roles (many strategy games, hero shooters). Richer and more replayable, but **much harder to balance** — each option must be *different but comparably strong*. This is where most balance effort goes.

## Risk / Reward

Higher risk should offer higher reward, and vice versa. A high-risk play that pays the same as a safe one is never taken; a low-risk play with huge reward is a no-brainer (dominant). Tie payoff to risk to make decisions interesting.

## Tuning: Playtest + Data

Balance is discovered, not decreed. **Playtest** widely (you can't predict how players break your systems), watch what they actually do, and use **telemetry** (win rates, pick rates, where players quit, resource curves) to find outliers. Tune iteratively — small changes, re-test (a big nerf can over-correct). Live games balance continuously as the "meta" evolves (see also A/B testing, feature-flags for rollout).

## Pitfalls

- **Dominant strategy** — one best option kills meaningful choice.
- **Broken economy** — inflation (too many sources) or starvation (too many sinks).
- **Difficulty spikes/walls** or flat curves.
- **Balancing by intuition alone** — playtest and measure; players surprise you.
- **Over-nerfing** — big swings that over-correct; iterate in small steps.
- Chasing *perfect* symmetry instead of *multiple viable* options.
