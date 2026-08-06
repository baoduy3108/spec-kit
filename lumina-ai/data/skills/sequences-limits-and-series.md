---
name: sequences-limits-and-series
description: Sequences, limits, and series (thi chuyên/advanced math) — arithmetic/geometric progressions, recurrence relations, limits of sequences, convergence, infinite series and summation techniques, and telescoping. Use for high-school/olympiad sequences and series, limits of sequences, recurrences, or summation.
category: knowledge
keywords_vi: dãy số giới hạn và chuỗi thi chuyên toán, cấp số cộng và cấp số nhân, công thức truy hồi, giới hạn của dãy số, sự hội tụ, chuỗi vô hạn và tổng, kỹ thuật khử liên tiếp telescoping
---

# Sequences, Limits & Series

Sequences (ordered lists of numbers) and series (their sums) are core to THPT and olympiad/thi-chuyên math, and the gateway to calculus. Problems involve finding patterns, closed forms, limits, and clever summations. The recurring skill is spotting structure — a recurrence, a telescoping cancellation, or a convergence.

## Arithmetic & Geometric Progressions

- **Arithmetic (cấp số cộng)** — constant difference d: aₙ = a₁ + (n−1)d; sum Sₙ = n(a₁+aₙ)/2.
- **Geometric (cấp số nhân)** — constant ratio r: aₙ = a₁·rⁿ⁻¹; sum Sₙ = a₁(rⁿ−1)/(r−1).
- **Infinite geometric series** — if |r| < 1, it **converges** to S = a₁/(1−r) (else diverges). A key result.
- Recognizing AP/GP structure (or mixed) is often the first step.

## Recurrence Relations

- A **recurrence** defines each term from previous ones (aₙ = f(aₙ₋₁, ...)). Examples: Fibonacci (aₙ = aₙ₋₁ + aₙ₋₂), linear recurrences.
- **Solving** — find a **closed form**: for linear recurrences use the characteristic equation; for others, spot patterns, telescope, or transform.
- Common olympiad task: prove a property of a recursively-defined sequence (often by induction — see mathematical-induction-and-proof), or find its limit.

## Limits of Sequences

- A sequence **converges** to L if terms get arbitrarily close to L as n → ∞ (the ε–N definition); otherwise it diverges.
- **Techniques** — squeeze/sandwich theorem, monotone convergence (a bounded monotonic sequence converges), algebraic limit laws, dividing by the dominant term.
- **Monotone + bounded ⟹ convergent** — a powerful existence tool; find the limit by solving L = f(L) for a recurrence (if it converges).
- Limits of sequences underpin the definition of limits and calculus (see calculus-intuition, limits-and-continuity).

## Infinite Series & Convergence

- A **series** is the sum of a sequence's terms (Σaₙ). It converges if its partial sums approach a limit.
- **Convergence tests** — a series can only converge if aₙ → 0 (necessary, not sufficient — the harmonic series Σ1/n diverges despite 1/n → 0). Comparison, ratio, and integral tests decide convergence.
- **Geometric and p-series** are benchmarks (Σ1/nᵖ converges iff p > 1).

## Summation Techniques

- **Telescoping** — rewrite terms so consecutive parts cancel (e.g. 1/(n(n+1)) = 1/n − 1/(n+1)), collapsing the sum. A favorite competition trick.
- **Partial fractions** to set up telescoping.
- **Known formulas** — Σk = n(n+1)/2, Σk² = n(n+1)(2n+1)/6, Σk³ = (Σk)².
- **Manipulating series** — shifting indices, differencing, generating functions (advanced — see combinatorics).

Master sequences and series via **arithmetic/geometric progressions** (formulas, convergent infinite geometric), **recurrence relations** (closed forms, characteristic equations), **limits of sequences** (squeeze theorem, monotone-bounded convergence, L = f(L) for recurrences), **series convergence** (aₙ → 0 necessary, comparison/ratio tests, geometric/p-series benchmarks), and **summation techniques** (especially telescoping via partial fractions, and known power-sum formulas). Spotting the underlying structure — a pattern, a cancellation, a convergence — is the key skill for thi-chuyên sequence and series problems.
