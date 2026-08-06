---
name: functional-equations
description: Functional equations for competition math (thi chuyên/olympiad) — finding all functions satisfying an equation, standard techniques (substitution, symmetry, injectivity/surjectivity, fixed points), Cauchy's equation, and rigor (proving no other solutions). Use for olympiad/gifted-exam functional equations or advanced function problems.
category: knowledge
keywords_vi: phương trình hàm thi chuyên olympiad, tìm tất cả hàm số thỏa mãn, kỹ thuật thế giá trị đặc biệt, tính đơn ánh toàn ánh song ánh, điểm bất động, phương trình cauchy, chứng minh chặt không còn nghiệm khác
---

# Functional Equations (Competition Math)

Functional equations ask you to **find all functions f satisfying a given equation** (e.g. f(x+y) = f(x) + f(y) for all x, y). They're a distinctive olympiad/thi-chuyên topic testing creativity and rigor — you must both *find* the solutions and *prove* there are no others.

## The Goal & Mindset

- Find **every** function satisfying the equation over the given domain — usually you guess the answer (often linear f(x) = x, or constant) and then prove it's the *only* one.
- **Rigor is essential** — showing a function works is half; proving *no other* function works is the harder, graded half. Both directions required.

## Core Techniques

**Substitution** is the primary weapon — plug in clever values:
- **f(0), f(1)** — substitute x = 0, y = 0 to find key values.
- **x = y**, **y = −x**, or swapping x and y (exploit **symmetry**) to derive relations.
- Substitute expressions to build toward the answer.

Other key techniques:
- **Injectivity / surjectivity** — prove f is one-to-one (if f(a)=f(b) ⟹ a=b) or onto; these are powerful constraints that pin down f. (E.g. injectivity lets you "cancel" f from both sides.)
- **Fixed points** — values with f(a) = a often reveal structure.
- **Finding f is monotonic / continuous** (if given or provable) drastically narrows solutions.
- **Setting up a recursion** — for functions on integers, compute f(n) iteratively.

## Cauchy's Functional Equation

The archetypal FE: **f(x + y) = f(x) + f(y)**.
- Over the rationals (or with continuity/monotonicity/boundedness on reals), the only solutions are **f(x) = cx** (linear). Without a regularity condition, pathological solutions exist (rarely relevant in competition).
- Related standard forms: f(x+y) = f(x)f(y) → exponential; f(xy) = f(x)+f(y) → logarithmic; f(x)f(y) = f(xy) → power. Recognizing a Cauchy-type equation is often the key insight.

## Rigor: Proving Uniqueness

- After finding candidate solution(s), **verify** they satisfy the equation.
- **Prove no others** — use the derived constraints (injectivity, values at specific points, monotonicity) to show f *must* have the found form. Systematically eliminate alternatives.
- **Watch the domain/codomain** (ℕ, ℤ, ℚ, ℝ, ℝ⁺) — it changes what's provable and which pathological solutions exist.

## Strategy

1. Try small substitutions (0, 1, x=y) to gather information and find f at key points.
2. Guess the solution from the pattern.
3. Establish structural properties (injective? surjective? monotonic?).
4. Use them to prove the guess is the only solution.
5. Verify and write up rigorously.

Master competition functional equations via the **substitution technique** (plug in 0, 1, x=y, symmetric swaps to extract information), proving **injectivity/surjectivity** and finding **fixed points** to constrain f, recognizing **Cauchy-type equations** and their standard solutions, and above all **rigor** — verifying the found solution *and* proving no others exist over the given domain. The art is choosing the right substitutions to corner the function into its unique form.
