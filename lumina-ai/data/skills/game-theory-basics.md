---
name: game-theory-basics
description: Core game theory for engineers and decision-makers — payoff matrices, dominant strategies, Nash equilibrium, the prisoner's dilemma, zero-sum vs cooperative games, minimax, and repeated games. Use to reason about strategic interactions, incentive design, adversarial AI (minimax), auctions/pricing, or multi-party decisions.
category: engineering
keywords_vi: game theory, lý thuyết trò chơi, ma trận payoff, chiến lược thống trị dominant, nash equilibrium, prisoner's dilemma song đề tù nhân, zero-sum, minimax, thiết kế động lực incentive
---

# Game Theory Basics

Game theory studies **strategic decision-making** — how rational players choose when their outcomes depend on each other's choices. It's useful for incentive/mechanism design, pricing/auctions, adversarial AI (minimax game trees — see game-design-fundamentals), and negotiation (see negotiation-basics).

## The Building Blocks

- **Players** — the decision-makers.
- **Strategies** — the choices each can make.
- **Payoffs** — the outcome each player gets for every combination of choices, often laid out in a **payoff matrix**.
Game theory asks: given that everyone acts in their own interest, what happens?

## Dominant Strategies & Nash Equilibrium

- A **dominant strategy** is one that's best **regardless** of what others do — if you have one, play it.
- A **Nash equilibrium** is a set of strategies where **no player can improve by unilaterally changing** their own choice (given what others are doing). It's a stable outcome — everyone is best-responding to everyone else. Games can have one, several, or (in mixed strategies) always at least one Nash equilibrium. Crucially, a Nash equilibrium is **not necessarily the best collective outcome** (see below).

## The Prisoner's Dilemma (the famous one)

Two suspects each choose to **cooperate** (stay silent) or **defect** (betray). Individually, defecting is the dominant strategy — so both defect and get a **worse** outcome than if both had cooperated. The lesson: **individually rational choices can produce a collectively bad result**. This models arms races, price wars, overfishing, free-riding, and why cooperation needs enforcement/incentives. It's the canonical example that self-interest ≠ social optimum.

## Zero-Sum vs Cooperative

- **Zero-sum** — one player's gain is exactly another's loss (chess, poker, competitive markets for fixed pie). Purely adversarial.
- **Non-zero-sum / cooperative** — outcomes can be win-win or lose-lose (most real negotiations, business partnerships). Recognizing a situation is **not** zero-sum unlocks cooperative, value-creating strategies (see negotiation-basics).

## Minimax (adversarial decisions)

In zero-sum games, **minimax** = choose the strategy that **minimizes your maximum possible loss** (assume the opponent plays optimally against you). This is the algorithm behind game-playing AI (chess/tic-tac-toe game trees, alpha-beta pruning) and robust decision-making under adversarial uncertainty.

## Repeated Games & Cooperation

When a game is **played repeatedly**, cooperation can emerge even in a prisoner's dilemma — because defecting invites future retaliation. Strategies like **tit-for-tat** (cooperate first, then mirror the opponent) foster mutual cooperation. The **shadow of the future** (ongoing relationship) changes incentives — a key insight for designing sustainable systems, reputation, and trust.

## Pitfalls (in understanding/using)

- Treating every situation as **zero-sum** when it's actually cooperative → missing win-win value creation.
- Assuming a **Nash equilibrium** is optimal — it's stable, not necessarily best for everyone (prisoner's dilemma).
- Ignoring **repeated-game** dynamics — one-shot logic (defect) is wrong for ongoing relationships.
- Assuming perfectly **rational** players — real humans have bounded rationality, emotions, and fairness norms.
- Designing **incentives** without game-theoretic thinking → people game the system (unintended equilibria); align incentives with desired behavior.
- Over-modeling — game theory gives insight/framing, not always precise predictions for messy real situations.
