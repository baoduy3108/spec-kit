---
name: combinatorics-and-counting
description: Combinatorics for competition math (thi chuyên/olympiad) — counting principles, permutations/combinations, the binomial theorem, inclusion-exclusion, bijections, pigeonhole, recursion, generating-function intuition, and counting techniques. Use for olympiad/gifted-exam combinatorics, advanced counting, or arrangement/selection problems.
category: knowledge
keywords_vi: tổ hợp và đếm thi chuyên olympiad, quy tắc cộng và nhân đếm, chỉnh hợp hoán vị tổ hợp, nhị thức newton, nguyên lý bù trừ, song ánh đếm bijection, nguyên lý dirichlet chuồng bồ câu, truy hồi và hàm sinh
---

# Combinatorics & Counting (Competition Math)

Combinatorics — the art of counting — is a core olympiad/thi-chuyên subject where cleverness beats formulas. Problems ask "how many ways?" and reward finding the *right way to count*. The tools are simple; the challenge is modeling the problem correctly and choosing an elegant counting strategy.

## Fundamental Counting Principles

- **Rule of product** (multiplication) — if a task has independent stages with m and n choices, there are m×n total. The foundation of counting.
- **Rule of sum** (addition) — mutually exclusive cases add.
- **Casework** — split into disjoint cases, count each, sum. Careful case management (no overlaps, no omissions) is essential.

## Permutations & Combinations

- **Permutations** — ordered arrangements: n! total; P(n,k) = n!/(n−k)! for k of n.
- **Combinations** — unordered selections: **C(n,k) = n!/(k!(n−k)!)** ("n choose k"). The central object.
- **With repetition, circular permutations, indistinguishable objects** (divide by symmetries), stars-and-bars (distributing identical items). Knowing which model fits is the key skill.

## The Binomial Theorem

- **(x+y)ⁿ = Σ C(n,k) xⁿ⁻ᵏ yᵏ** — the binomial coefficients C(n,k) are Pascal's triangle.
- **Combinatorial identities** — C(n,k) = C(n,n−k), Pascal's rule C(n,k) = C(n−1,k−1)+C(n−1,k), the hockey-stick identity, ΣC(n,k) = 2ⁿ. Proving identities **combinatorially** (both sides count the same thing) is elegant and expected.

## Inclusion-Exclusion

**|A∪B∪C| = Σ|A| − Σ|A∩B| + |A∩B∩C|** — count things satisfying *at least one* condition by adding singles, subtracting overlaps, adding back triple-overlaps, etc. Essential for "count arrangements avoiding X" problems (derangements, surjections, coprime counts).

## Bijections (The Elegant Technique)

**Set up a one-to-one correspondence** between the set you want to count and one you *can* count. If you build a bijection to a known set, they have equal size. Bijective proofs are the most beautiful combinatorial arguments — turning a hard count into an easy one by re-encoding the objects.

## Pigeonhole Principle

**If n+1 objects go into n boxes, some box has ≥2.** Deceptively simple, surprisingly powerful for *existence* proofs ("show two of these must share a property"). Generalized: n objects in k boxes force some box with ≥⌈n/k⌉. Choosing the right "pigeons" and "holes" is the art.

## Recursion & Generating Functions

- **Recursion** — express the count for n in terms of smaller cases (Fibonacci, Catalan numbers, tilings). Set up a recurrence, then solve or compute.
- **Generating functions** — encode a counting sequence as coefficients of a power series; algebra on the series solves counting/partition problems. An advanced but powerful tool.
- **Double counting** — count the same quantity two ways to derive an identity or equation.

## Problem-Solving Approach

- **Model precisely** — what exactly is being counted, ordered or not, with/without repetition?
- **Find the right technique** — direct count, complementary counting (count the opposite, subtract), bijection, casework, inclusion-exclusion, or recursion.
- **Complementary counting** — often "count what you don't want and subtract" is far easier.
- **Check small cases** to validate your reasoning.

Master competition combinatorics via the **product/sum principles and casework**, **permutations/combinations** (choosing the right model), the **binomial theorem and combinatorial identities**, **inclusion-exclusion**, **bijections** (re-encode to count), the **pigeonhole principle** (existence proofs), and **recursion/double-counting/generating functions**. The essence isn't memorizing formulas — it's *modeling the problem* and choosing the elegant way to count, which is exactly what thi-chuyên/olympiad combinatorics rewards.
