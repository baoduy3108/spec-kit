---
name: coverage-metrics-and-limits
description: How code coverage metrics work — line, branch/condition, and path coverage, what each measures, why 100% coverage doesn't mean well-tested (coverage measures execution not verification), and how to use coverage without gaming it. Use to understand code coverage types, line vs branch coverage, why 100% is misleading, or using coverage meaningfully.
category: engineering
keywords_vi: chỉ số độ phủ code và giới hạn, line branch condition path coverage, mỗi loại đo gì, vì sao 100 phần trăm không có nghĩa test tốt, độ phủ đo thực thi không phải xác minh
---

# Coverage Metrics and Their Limits

Code coverage measures **how much of your code is executed by your tests**. It's a useful tool for finding **untested** code — but a **dangerous target**, because it measures **execution**, not **verification**. Understanding the coverage types, and coverage's fundamental limits, is what separates using it well from chasing a misleading number (see testing-strategy, mutation-testing).

## The Coverage Types (what each measures)

Coverage comes in increasingly strict flavors:
- **Line (statement) coverage** — what % of **lines** ran during tests. The most common and **weakest**: a line running doesn't mean its logic was tested.
- **Branch coverage** — what % of **branches** (each side of every `if`/`else`, each `case`) were taken. Stronger: 100% line coverage can miss a branch (an `if` with no `else` where the false path is never exercised). Branch coverage catches that.
- **Condition / decision coverage** — whether each **boolean sub-condition** in a compound expression (`a && b`) was evaluated both true and false. Even stricter — catches logic missed by branch coverage.
- **Path coverage** — whether every **combination of branches** (execution path) was taken. Strongest, but the number of paths explodes combinatorially — usually impractical to fully achieve.
The rule: **line < branch < condition < path** in strictness. Branch coverage is a good practical target; line coverage alone is weak.

## The Fundamental Limit: Execution ≠ Verification

Here's the crucial insight: **coverage measures whether code *ran*, not whether it was *checked*.** A test can execute a line (counting toward coverage) while **asserting nothing** about its result — "coverage theater." So:
- **100% coverage does not mean well-tested** — you can have full coverage with tests that would pass even if the code were wrong.
- Coverage tells you what's **definitely untested** (uncovered lines have **zero** tests — a real red flag), but **not** whether covered code is **correctly** tested.
Coverage is good at finding the **absence** of tests, useless at confirming their **quality**. (For test *quality*, use **mutation testing** — see mutation-testing.)

## Why 100% Is the Wrong Goal

- **Diminishing returns** — the last few percent (error handlers, defensive branches, trivial getters) often cost far more than they're worth.
- **Gaming** — mandating 100% pushes people to write assertion-free tests just to hit the number → coverage theater, worse than honest lower coverage.
- **False confidence** — a green 100% badge can hide a suite that verifies little.
- Some code (generated, trivial, unreachable-by-design) isn't worth testing.
Better: aim for **meaningful coverage of important code**, use uncovered spots as a **checklist**, and don't worship the number.

## Design Guidance

- **Use coverage to find untested code** (uncovered = definitely no test) — its genuine strength.
- **Prefer branch coverage** over line coverage as a target — it's meaningfully stronger.
- **Don't target 100%** — set a sensible threshold and focus coverage on **critical logic**.
- **Never write assertion-free tests to hit a number** — that's coverage theater; the metric becomes a lie.
- **Pair with mutation testing** to measure test *quality* (does the suite catch bugs?), which coverage can't.
- **Treat coverage as a guide, not a goal** (Goodhart's law — when a measure becomes a target, it stops being a good measure).

## Pitfalls (in understanding/using)

- Believing **100% coverage = well-tested** → coverage is execution, not verification; assertion-free tests inflate it.
- Targeting **line coverage** only → misses untaken branches; use branch coverage.
- **Mandating 100%** → incentivizes coverage theater (tests that assert nothing).
- Using coverage to judge **test quality** → it can't; use mutation testing for that.
- Chasing the last few percent of **trivial/defensive** code → poor ROI.
- Trusting a high coverage **badge** → false confidence; look at whether tests actually assert.
- Forgetting **uncovered code is the real signal** — that part has *no* tests at all.
