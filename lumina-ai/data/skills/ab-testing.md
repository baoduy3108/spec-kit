---
name: ab-testing
description: Run trustworthy A/B tests — form a hypothesis, pick one primary metric, size the sample and run for full business cycles, randomize correctly, avoid peeking/p-hacking, watch for novelty and Simpson's paradox, and interpret results honestly (including flat/negative). Use when designing or analyzing an experiment or online test.
category: design
keywords_vi: a/b testing, thử nghiệm ab, thí nghiệm online, so sánh hai phiên bản, ý nghĩa thống kê, sample size, p-hacking, tối ưu chuyển đổi bằng test
---

# A/B Testing

An A/B test causally attributes a metric change to a change you made, by randomly splitting users between variants. Done sloppily it produces confident false wins.

## Before You Start

- **One hypothesis, one primary metric.** "Changing the CTA to X will increase signup conversion." Pick the *primary* success metric in advance; track guardrail metrics (revenue, churn, latency) so a "win" on one thing isn't a loss elsewhere.
- **Sample size up front** — use a calculator from your baseline rate and the smallest effect worth detecting. Underpowered tests can't detect real effects; you must know the required n *before* starting, not stop when it looks good.
- **Randomize at the right unit** (usually the user, consistently across sessions) so a person always sees the same variant. Splitting by request/page contaminates results.

## Running It

- **Run for full business cycles** — at least one to two full weeks to cover weekday/weekend and different user segments. Don't stop after a good Tuesday.
- **Don't peek and stop early.** Checking repeatedly and stopping when it's significant massively inflates false positives (the peeking problem). Decide the duration/sample in advance and wait — or use a method designed for sequential testing.
- **Only test one change at a time** per variant (or use a proper multivariate design) so you know *what* caused the effect.

## Interpreting

- **Statistical vs practical significance** — a significant 0.1% lift may not be worth shipping; a big lift that's not significant may be noise. Look at the confidence interval, not just the p-value.
- **Novelty & primacy effects** — regulars react to *any* change at first; the early bump can fade. Longer runs and new-user segments help.
- **Simpson's paradox** — an aggregate result can reverse within segments; check key segments before concluding.
- **A flat or negative result is a real result** — it saved you from shipping something useless or harmful. Don't torture the data (slice until something's "significant") to manufacture a win — that's p-hacking.

## When A/B Testing Doesn't Fit

Low traffic (can't reach significance in reasonable time), big infrequent decisions, or brand/long-term effects a short test can't capture — use judgment, qualitative research, or holdout/quasi-experiments instead. Not everything should be A/B tested.
