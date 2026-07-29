---
name: combinatorial-probability
description: Combinatorial probability (THPT/competition math) — sample spaces and events, counting-based probability, conditional probability and independence, the addition and multiplication rules, complementary counting, and expected value. Use for probability problems, computing chances by counting, conditional probability, or THPT/olympiad probability.
category: knowledge
keywords_vi: xác suất tổ hợp thi chuyên thpt, không gian mẫu và biến cố, xác suất bằng cách đếm, xác suất có điều kiện và độc lập, quy tắc cộng và nhân xác suất, đếm phần bù bài toán ít nhất một, kỳ vọng và biến ngẫu nhiên
---

# Combinatorial Probability (THPT/Competition Math)

Probability quantifies **chance** — how likely an event is. At the THPT and competition level, it's tightly linked to **counting** (see combinatorics-and-counting): most probabilities are computed by counting favorable outcomes over total outcomes. (For the Bayesian/statistical view, see probability-and-bayes.)

## Sample Space & Events

- **Sample space (Ω)** — the set of all possible outcomes of an experiment (e.g. rolling a die: {1,2,3,4,5,6}).
- **Event** — a subset of outcomes (e.g. "even" = {2,4,6}).
- **Probability of an event** — for *equally likely* outcomes: **P(E) = (favorable outcomes)/(total outcomes)**. Always between 0 and 1; P(Ω) = 1.

## Counting-Based Probability

The core THPT technique — probability *is* a counting problem:
- Count the **total** outcomes (the sample space) and the **favorable** ones using combinatorics (permutations, combinations — see combinatorics-and-counting).
- Example: probability of drawing 2 aces from a deck = C(4,2)/C(52,2). The whole difficulty is *counting correctly*.

## Addition & Multiplication Rules

- **Addition rule** — P(A or B) = P(A) + P(B) − P(A and B) (subtract the overlap; for **mutually exclusive** events, the overlap is 0). Mirrors inclusion-exclusion.
- **Multiplication rule** — P(A and B) = P(A)·P(B|A). For **independent** events (one doesn't affect the other), P(A and B) = P(A)·P(B).

## Conditional Probability & Independence

- **Conditional probability** — **P(A|B) = P(A and B)/P(B)** — the probability of A *given that* B occurred (updating on information; the sample space shrinks to B).
- **Independence** — A and B are independent if P(A|B) = P(A) (B tells you nothing about A). Distinguish from mutually exclusive (which are actually *dependent*).
- **Bayes' theorem** (see probability-and-bayes) reverses conditionals.

## Complementary Counting

- **P(not A) = 1 − P(A).** Often it's far easier to compute the probability of what you *don't* want and subtract — especially for "at least one" problems (P(at least one) = 1 − P(none)). A key competition trick.

## Expected Value

- **Expected value E[X]** — the long-run average of a random variable: **Σ(value × probability)**. E.g. the expected roll of a die = (1+2+...+6)/6 = 3.5.
- **Linearity of expectation** — E[X+Y] = E[X] + E[Y], *even for dependent variables* — a surprisingly powerful tool for hard counting/probability problems.

Master combinatorial probability via **sample spaces and events** (favorable/total outcomes), **counting-based probability** (compute chances with combinatorics), the **addition and multiplication rules** (with mutually-exclusive and independent special cases), **conditional probability and independence** (P(A|B), updating on information), **complementary counting** ("at least one" via 1 − P(none)), and **expected value** (Σ value×probability, with the powerful linearity of expectation). Probability at this level is largely careful counting plus these combining rules — exactly the analytical skill THPT and competition probability reward.
