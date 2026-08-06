---
name: probability-and-bayes
description: Practical probability — independent vs conditional probability, expected value for decisions, Bayes' theorem and updating on evidence, why base rates dominate rare-event tests (false positives), and common fallacies (gambler's fallacy, base-rate neglect, conjunction). Use when reasoning about uncertainty, risk, odds, diagnostic/test results, or expected outcomes.
category: engineering
keywords_vi: xác suất, probability, xác suất có điều kiện, bayes, cập nhật niềm tin theo bằng chứng, kỳ vọng expected value, base rate dương tính giả, ngụy biện xác suất
---

# Probability & Bayes

Enough probability to reason about uncertainty and avoid the intuition traps that fool almost everyone.

## Basics

- Probability is a number 0–1. **Independent** events: `P(A and B) = P(A)·P(B)` (two coin flips). **Mutually exclusive**: `P(A or B) = P(A) + P(B)`.
- **Conditional probability** `P(A | B)` — probability of A *given* B happened. Most real-world probability is conditional, and `P(A|B) ≠ P(B|A)` (confusing the two is a core error — the "prosecutor's fallacy").

## Expected Value (for decisions)

`EV = Σ (outcome value × its probability)`. It's the long-run average and the rational basis for decisions under uncertainty: a 10% chance of +$100 and 90% chance of −$5 has EV = +$5.50 → worth it repeatedly. Use EV to compare risky options — but also weigh **variance** and ruin (a positive-EV bet that can bankrupt you is still bad; you don't get the "long run" if you're wiped out).

## Bayes' Theorem — updating on evidence

`P(H | E) = P(E | H) · P(H) / P(E)` — update your belief in a hypothesis H after seeing evidence E. In words: **posterior ∝ prior × likelihood**. Start with a prior belief, see evidence, revise. This is the correct way to combine new data with what you already knew — and the mental model behind spam filters, diagnostics, and good judgment.

## The Base-Rate Trap (the famous one)

A test is "99% accurate" for a disease that affects 1 in 10,000. You test positive. Your chance of actually having it is **not 99% — it's about 1%.** Because the disease is rare (low **base rate/prior**), the few true positives are swamped by false positives from the huge healthy population. Ignoring the base rate (**base-rate neglect**) is the single most common probability error — in medicine, security alerts, fraud detection, and reading any "99% accurate" claim. Always ask: how rare is the thing being tested for?

## Common Fallacies

- **Gambler's fallacy** — "red is due" after many blacks. Independent events have no memory; past flips don't change the next.
- **Base-rate neglect** — ignoring priors (above).
- **Conjunction fallacy** — thinking a specific, detailed scenario ("bank teller AND activist") is more likely than a general one ("bank teller"). Adding conditions can only lower probability.
- **Confusing `P(A|B)` with `P(B|A)`** — "most sick people tested positive" ≠ "most positives are sick."
- **Survivorship / selection** — computing probabilities from a filtered sample.

## Practical Habit

For any "how likely" question: What's the **base rate/prior**? Am I confusing `P(A|B)` with `P(B|A)`? Are these events actually **independent**? What's the **expected value** *and* the downside variance? Rare-event tests especially demand you start from the base rate.
