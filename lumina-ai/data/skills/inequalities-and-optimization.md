---
name: inequalities-and-optimization
description: Inequalities for competition math (thi chuyên/olympiad) — AM-GM, Cauchy-Schwarz, the rearrangement and power-mean inequalities, Jensen/convexity, substitution and normalization, SOS (sum of squares), and proof techniques. Use for olympiad/gifted-exam inequality problems, proving/optimizing expressions, or advanced algebra inequalities.
category: knowledge
keywords_vi: bất đẳng thức và cực trị thi chuyên olympiad, bất đẳng thức am gm cosi, cauchy schwarz bunhiacopxki, trung bình lũy thừa và sắp xếp lại, jensen và tính lồi, kỹ thuật đổi biến chuẩn hóa, tổng bình phương sos, dấu bằng và chứng minh bất đẳng thức
---

# Inequalities & Optimization (Competition Math)

Inequalities are among the most beautiful and challenging olympiad/thi-chuyên topics — proving one expression is always ≥ another, or finding extreme values. Success needs a toolkit of classical inequalities plus the *artistry* of knowing which to apply and how to manipulate expressions toward them. This is often where top scores are won or lost.

## AM-GM (The Workhorse)

**Arithmetic Mean ≥ Geometric Mean**: for non-negative reals, (a₁+...+aₙ)/n ≥ ⁿ√(a₁···aₙ), with **equality iff all equal**.
- The single most-used inequality. Applications: bounding sums/products, proving a₁+1/a₁ ≥ 2, optimizing (minimize a sum given a fixed product, or vice versa).
- **Key skill**: split/group terms so AM-GM gives exactly the bound you want, and so equality is *achievable* (matching when variables are equal).

## Cauchy-Schwarz (Bunyakovsky)

**(Σaᵢbᵢ)² ≤ (Σaᵢ²)(Σbᵢ²)** — extremely versatile:
- **Engel form / Titu's lemma**: Σ(aᵢ²/bᵢ) ≥ (Σaᵢ)²/(Σbᵢ) — superb for sums of fractions (a very common competition pattern).
- Used for bounding sums, products, and fraction-heavy expressions. Second only to AM-GM in utility.

## Other Classical Inequalities

- **Power Mean** — orders the means (quadratic ≥ arithmetic ≥ geometric ≥ harmonic); generalizes AM-GM.
- **Rearrangement** — sums aᵢbᵢ are maximized when both sorted the same way, minimized when opposite. Underlies many others (including Chebyshev's sum inequality).
- **Jensen's inequality** — for a **convex** function, f(mean) ≤ mean of f (reversed for concave). Powerful when a function's convexity is exploitable (see calculus for second-derivative convexity tests).
- **Triangle inequality, Schur, Muirhead, Holder** — more advanced tools for the hardest problems.

## Key Techniques

The *art* is manipulation:
- **Normalization** — since many inequalities are homogeneous, assume a convenient constraint (e.g. a+b+c = 1 or abc = 1) to simplify without loss of generality.
- **Substitution** — clever variable changes (e.g. a = x+y, b = y+z, c = z+x for triangle sides; trig substitution) transform hard forms into standard ones.
- **SOS (Sum of Squares)** — rewrite (LHS − RHS) as a sum of squares, which is manifestly ≥ 0. A systematic, powerful method.
- **Tangent line trick, smoothing/mixing variables** — for symmetric inequalities.
- **Symmetry and WLOG** — assume an ordering (a ≥ b ≥ c) to reduce cases.

## Equality Cases (Critical)

Always find **when equality holds** — it guides which inequality/grouping to use and verifies the bound is tight. If your AM-GM equality condition can't be met by the constraint, you've bounded too loosely (or wrongly). Tracking equality is both a check and a compass.

## Optimization

Finding max/min of expressions:
- Apply the right inequality to bound the expression, then show the bound is *achieved* (equality case) — that proves it's the extreme value.
- Or use calculus (derivatives = 0 for critical points — see calculus-intuition) for functions, but competition style prefers elegant inequality proofs.

Master competition inequalities via the core arsenal — **AM-GM** (equal-variable equality), **Cauchy-Schwarz** (especially Titu's form for fractions), **power-mean, rearrangement, and Jensen/convexity** — deployed through **normalization, substitution, SOS, and symmetry** techniques, always **tracking the equality case** to aim the bound precisely. Knowing not just the inequalities but *when and how* to apply and manipulate toward them is the skill that cracks thi-chuyên/olympiad inequality problems.
