---
name: floating-point-arithmetic
description: How floating-point numbers work (IEEE 754) — representing reals with a sign/exponent/mantissa, why 0.1 + 0.2 ≠ 0.3, rounding error and precision limits, special values (NaN, infinity), and safe practices (epsilon comparison, integers/decimals for money). Use to understand floating-point, rounding errors, why decimals are imprecise, NaN, or handling money and precise numbers.
category: engineering
keywords_vi: floating point arithmetic, số thực dấu phẩy động, ieee 754, tại sao 0.1 + 0.2 khác 0.3, sai số làm tròn precision, nan infinity, so sánh epsilon, tiền dùng decimal
---

# Floating-Point Arithmetic

Floating-point is how computers represent real numbers (fractions, decimals) — and it's **approximate**, which causes a whole class of subtle bugs. Understanding why `0.1 + 0.2` isn't exactly `0.3` prevents real mistakes, especially with money and comparisons.

## How Floats Represent Numbers (IEEE 754)

A floating-point number (the standard is **IEEE 754**) stores three parts, like scientific notation in **binary**:
- **Sign** — positive/negative.
- **Exponent** — the scale (where the "binary point" goes).
- **Mantissa (significand)** — the significant digits.
This gives a huge range with a **fixed number of significant bits** (~15–17 decimal digits for 64-bit `double`). The catch: only numbers expressible as a finite **binary** fraction are exact.

## Why 0.1 + 0.2 ≠ 0.3

`0.1` in binary is a **repeating** fraction (like `1/3` in decimal) — it can't be stored exactly, only rounded to the nearest representable value. So `0.1` and `0.2` are each slightly off, and their sum is `0.30000000000000004`. This isn't a bug — it's the fundamental consequence of representing decimal fractions in finite binary. Most languages show this.

## Rounding Error & Precision

Every operation can introduce tiny **rounding errors**, and they can **accumulate** over many operations (summing millions of floats, iterative algorithms) or **catastrophically cancel** when subtracting nearly-equal large numbers (losing significant digits). Precision is finite: beyond ~15–17 significant digits, `double` can't distinguish values; adding a tiny number to a huge one may do **nothing** (the small one rounds away).

## Special Values

IEEE 754 defines:
- **Infinity** — overflow or `1.0/0.0`.
- **NaN** (Not a Number) — undefined results like `0.0/0.0` or `sqrt(-1)`. **NaN is not equal to anything, including itself** (`NaN != NaN`) — use `isnan()` to detect it. NaN propagates through arithmetic, so one bad value can poison a whole computation.
- **Signed zero** (`+0.0`, `-0.0`).

## Safe Practices

- **Don't test floats for exact equality** (`a == b`) — compare within a small tolerance (**epsilon**): `abs(a - b) < 1e-9`.
- **Never use floats for money** — rounding errors mean lost/created cents. Use **integer** cents/smallest units, or a **decimal**/BigDecimal type (exact base-10). This is the single most important floating-point rule in business code.
- Be wary of **accumulation** (sum with care; Kahan summation for precision) and **cancellation** (reformulate subtractions of near-equal values).
- Use higher precision (`double` over `float`) when errors matter; know your language's default.

## Pitfalls (in understanding/using)

- **Money in floats** → wrong totals, rounding drift; use integer minor units or decimals.
- **Exact `==` comparison** of computed floats → fails unexpectedly; use epsilon tolerance.
- Assuming `0.1 + 0.2 == 0.3` (or that displayed values are exact) — they're rounded approximations.
- Forgetting **NaN != NaN**, and that NaN/Infinity silently propagate — check for them.
- **Accumulating** many operations without regard to error growth or catastrophic cancellation.
- Confusing `float` (32-bit, ~7 digits) with `double` (64-bit, ~15–17) — pick enough precision.
