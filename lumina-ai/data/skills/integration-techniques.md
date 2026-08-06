---
name: integration-techniques
description: Integration techniques (THPT/advanced calculus) — antiderivatives, the fundamental theorem, definite integrals, substitution, integration by parts, partial fractions, and applications (area, volume). Use for calculus integration, computing integrals, antiderivatives, tích phân, or area/volume applications.
category: knowledge
keywords_vi: kỹ thuật tích phân giải tích thpt, nguyên hàm, định lý cơ bản giải tích, tích phân xác định, phương pháp đổi biến, tích phân từng phần, tích phân hàm phân thức, ứng dụng tính diện tích và thể tích
---

# Integration Techniques (THPT/Advanced Calculus)

Integration — the reverse of differentiation — computes **accumulation and area** (see calculus-intuition). Beyond the concept, real problems need *techniques* to actually evaluate integrals. This is a major THPT topic (tích phân) and essential for physics and engineering.

## Antiderivatives & the Fundamental Theorem

- **Antiderivative (indefinite integral)** — F is an antiderivative of f if F' = f; written ∫f dx = F + C (the "+C" for the arbitrary constant).
- **Basic antiderivatives** — reverse the differentiation rules: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C, ∫eˣ = eˣ, ∫1/x = ln|x|, ∫cos = sin, etc.
- **Fundamental Theorem of Calculus** — links the two halves: the **definite integral** ∫ₐᵇ f dx = F(b) − F(a) (evaluate the antiderivative at the endpoints). This is how we compute exact areas.

## The Definite Integral

- **∫ₐᵇ f(x) dx** — the (signed) area under f between a and b; positive above the axis, negative below.
- **Properties** — linearity, additivity over intervals, and reversing limits flips the sign.

## Substitution (u-substitution)

The reverse of the chain rule — the most-used technique:
- Substitute **u = g(x)**, du = g'(x)dx, to transform a complicated integral into a simple one. Look for a function *and its derivative* present.
- For definite integrals, change the limits to u-values (or convert back). Essential and heavily tested.

## Integration by Parts

The reverse of the product rule — for products of functions:
- **∫u dv = uv − ∫v du.** Choose u (to differentiate) and dv (to integrate) wisely (the "LIATE" heuristic — Logarithmic, Inverse trig, Algebraic, Trig, Exponential — for picking u).
- Used for ∫x·eˣ, ∫x·sin x, ∫ln x, and products generally. Sometimes applied repeatedly.

## Partial Fractions & Other Techniques

- **Partial fractions** — decompose a rational function (ratio of polynomials) into simpler fractions that integrate to logs/arctangents. Reverse of adding fractions.
- **Trigonometric substitution and identities** — for integrals with √(a²−x²) etc., or products of trig functions.
- **Recognizing standard forms** — matching to a table of known integrals.

## Applications

- **Area** — between a curve and the axis, or between two curves (∫ of the top minus bottom).
- **Volume** — of solids of revolution (disk/washer/shell methods — rotating a region gives ∫πr²dx).
- **Physics** — accumulating a rate gives a total: integrate velocity → displacement, force → work, density → mass (see calculus applications).
- **Average value** of a function, arc length, and more.

Master integration via **antiderivatives** (reversing differentiation, +C) and the **Fundamental Theorem** (definite integral = F(b) − F(a)), the core techniques — **substitution** (reverse chain rule, the workhorse), **integration by parts** (reverse product rule, LIATE), and **partial fractions** (for rational functions) — plus **applications** (area between curves, volumes of revolution, and accumulating physical rates). Knowing which technique fits an integral, and executing it cleanly, is the practical skill at the heart of THPT and advanced calculus integration.
