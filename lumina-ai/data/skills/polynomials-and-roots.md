---
name: polynomials-and-roots
description: Polynomials for competition math (thi chuyên) — factor and remainder theorems, Vieta's formulas relating roots and coefficients, the fundamental theorem of algebra, symmetric functions, root manipulation, and polynomial identities/techniques. Use for olympiad/gifted-exam polynomial problems, roots and coefficients, or advanced algebra.
category: knowledge
keywords_vi: đa thức và nghiệm thi chuyên, định lý bezout phần dư và nghiệm, định lý viet liên hệ nghiệm và hệ số, định lý cơ bản đại số, hàm đối xứng của nghiệm, biến đổi tổng và tích nghiệm, hằng đẳng thức đa thức
---

# Polynomials & Roots (Competition Math)

Polynomials are central to competition algebra — problems about their roots, coefficients, factorizations, and identities. The key relationships (Vieta's formulas, the factor theorem) let you connect a polynomial's *coefficients* to its *roots* without solving it, which is the crux of most problems.

## Basics: Factor & Remainder Theorems

- **Remainder theorem** — the remainder when P(x) is divided by (x − a) is **P(a)**.
- **Factor theorem** — (x − a) is a factor iff **P(a) = 0** (a is a root). The bridge between roots and factorization.
- **Polynomial division** and the Euclidean algorithm for polynomials (GCD of polynomials).
- **Fundamental Theorem of Algebra** — a degree-n polynomial has exactly n roots (counting multiplicity) over the complex numbers (see complex-numbers).

## Vieta's Formulas (The Core Tool)

Relate the **roots to the coefficients** directly:
- For ax² + bx + c: sum of roots = −b/a, product = c/a.
- For a cubic/general polynomial: the sum of roots, sum of products of pairs, ..., and product of all roots equal (±) ratios of coefficients (aₙ₋₁/aₙ, etc.).
- **Why it matters** — you can compute symmetric expressions of the roots (sum, product, sum of squares) *without finding the roots*. This solves a vast class of problems.

## Symmetric Functions of Roots

- **Elementary symmetric polynomials** (from Vieta) and **power sums** (Σrᵢᵏ) are linked by **Newton's identities**.
- Any *symmetric* expression in the roots can be written in terms of the coefficients. Computing Σrᵢ², Σ1/rᵢ, Σrᵢ³, etc., from Vieta is a staple technique.

## Root Manipulation & Techniques

- **Constructing polynomials with transformed roots** — if r is a root of P, find the polynomial whose roots are 2r, r+1, 1/r, r² (substitution tricks).
- **Rational root theorem** — any rational root p/q of an integer-coefficient polynomial has p | constant term, q | leading coefficient. Narrows the search.
- **Complex/irrational conjugate roots** come in pairs (for real coefficients).
- **Multiplicity** — repeated roots satisfy P(a) = P'(a) = 0 (using the derivative).

## Identities & Special Polynomials

- **Polynomial identities** — two polynomials equal for enough points (more than their degree) are identical. Used to prove identities and interpolate.
- **Factoring techniques** — sum/difference of powers, symmetric/cyclic factoring, the factor theorem.
- **Chebyshev, cyclotomic** polynomials and roots of unity (see complex-numbers) appear in advanced problems.
- **Lagrange interpolation** — reconstruct a polynomial from its values.

Master competition polynomials via the **factor/remainder theorems** (roots ↔ factors), **Vieta's formulas** (the essential link between roots and coefficients, computing symmetric expressions without solving), **symmetric functions and Newton's identities**, **root-manipulation techniques** (rational root theorem, transformed roots, conjugate pairs, multiplicity via derivatives), and **polynomial identities/factoring**. The recurring insight: use Vieta to reason about roots through coefficients — that's what unlocks thi-chuyên/olympiad polynomial problems.
