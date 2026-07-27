---
name: numerical-stability-and-cancellation
description: Why mathematically correct formulas give wildly wrong answers in floating point — numerical stability and catastrophic cancellation. Subtracting two nearly-equal numbers annihilates significant digits; errors accumulate and amplify. Use to understand why the naive variance/quadratic formula fails, how to reformulate for stability (log-sum-exp, Welford, Kahan summation), and why "it's the right math" isn't enough.
category: systems-internals
keywords_vi: ổn định số học và triệt tiêu thảm hoạ catastrophic cancellation, trừ hai số gần bằng nhau mất hết chữ số có nghĩa, sai số tích luỹ và khuếch đại trong dấu phẩy động, công thức phương sai và nghiệm bậc hai naive sai, tái công thức ổn định log-sum-exp welford kahan summation, đúng toán chưa đủ phải ổn định số
---

# Numerical Stability & Cancellation

A formula can be **algebraically perfect** and still produce **garbage** when run in floating point. Because floats have finite precision (~15–16 significant decimal digits for double), certain operations destroy accuracy — and the worst offender is **catastrophic cancellation**: subtracting two nearly-equal numbers. Understanding this is the difference between code that quietly returns wrong numbers and code that's robust (see floating-point-arithmetic, mixed-precision-training, how-fourier-transform-works).

## Catastrophic Cancellation

When you subtract two close numbers, the leading (agreeing) digits cancel, and the result is left with only the **trailing digits — which are mostly rounding error**. Example: `1.0000001 − 1.0000000` — you started with ~8 good digits each, but the result `0.0000001` has almost **no** reliable digits; the error that was tiny relative to the inputs is now **huge** relative to the answer. The precision didn't vanish gradually — it collapsed in one subtraction. Any later multiply/divide then **amplifies** that error.

## Classic Failures and Their Fixes

- **Sample variance** — the "computational" formula `E[x²] − E[x]²` subtracts two large, nearly-equal sums → catastrophic cancellation, sometimes even a **negative** variance. Fix: **Welford's online algorithm**, which updates mean and variance incrementally without the killer subtraction.
- **Quadratic formula** — when `b² ≫ 4ac`, `−b + √(b²−4ac)` cancels catastrophically for one root. Fix: compute the well-conditioned root first, then get the other via `x₁x₂ = c/a`.
- **Summing many floats** — adding a tiny number to a huge running sum **loses** the tiny one (absorption); millions of such adds drift. Fix: **Kahan (compensated) summation**, which tracks the lost low-order bits, or sum in sorted/pairwise order.
- **softmax / probabilities** — `exp` of large logits **overflows**; naive products of many small probabilities **underflow** to zero. Fix: the **log-sum-exp** trick (subtract the max before `exp`) and work in **log space**.

## Conditioning vs Stability

Two distinct ideas:
- **Conditioning** — a property of the **problem**: an ill-conditioned problem amplifies *any* input error (e.g. inverting a near-singular matrix). No algorithm saves you.
- **Stability** — a property of the **algorithm**: a stable algorithm doesn't introduce *extra* error beyond what the conditioning forces. You choose stable algorithms; you can't fix an ill-conditioned problem by better code, only by reformulating it.

## Design Guidance (for understanding/using)

- **Avoid subtracting nearly-equal quantities** — reformulate to keep the cancellation from happening (algebraic rearrangement, multiply by conjugate, etc.).
- **Use known-stable algorithms** — Welford for variance, log-sum-exp for softmax, Kahan/pairwise for big sums, stable quadratic-root ordering.
- **Work in log space** for products of many probabilities (avoids underflow) — ubiquitous in ML/stats.
- **Prefer library functions** (`log1p`, `expm1`, `hypot`, `numpy`'s stable reductions) built to avoid these traps.
- **Test with adversarial inputs** — large/small magnitudes, near-equal values, extreme ranges — not just friendly numbers.

## Pitfalls (in understanding/using)

- Assuming **correct algebra** ⇒ correct floating-point result → cancellation/overflow say otherwise.
- The `E[x²] − E[x]²` variance formula → cancellation, even negative variances; use Welford.
- Naively multiplying many probabilities → underflow to 0; use **log space**.
- `sum()` over millions of floats without compensation → accumulated drift; Kahan/pairwise.
- Blaming the library when the **problem** is ill-conditioned → reformulate the problem, not just the code.
