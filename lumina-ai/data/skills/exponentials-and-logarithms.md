---
name: exponentials-and-logarithms
description: Exponentials and logarithms (THPT math) — exponential growth/decay, the number e, logarithm definition and laws, solving exponential/log equations, graphs, and applications (compound interest, half-life, pH). Use for high-school exponentials and logarithms, growth/decay problems, or the THPT math exam.
category: knowledge
keywords_vi: mũ và logarit thpt, hàm số mũ tăng giảm theo cấp số nhân, số e cơ số tự nhiên, định nghĩa và tính chất logarit, giải phương trình mũ và logarit, đồ thị hàm mũ logarit, ứng dụng lãi kép chu kỳ bán rã ph
---

# Exponentials & Logarithms (THPT Math)

Exponential and logarithmic functions describe **multiplicative change** — growth and decay that compound. They're a core THPT math topic and appear everywhere: compound interest, population, radioactive decay, sound, pH, and algorithms. Crucially, **logarithms are the inverse of exponentials** — they undo each other.

## Exponential Functions

- **y = aˣ** (a > 0, a ≠ 1) — the variable is in the *exponent*. If a > 1, it **grows** ever-faster (exponential growth); if 0 < a < 1, it **decays** toward zero.
- **Explosive growth** — exponential growth quickly outpaces any polynomial; small rates compound to huge numbers over time (the "power of compounding").
- **The number e** (≈2.718) — the natural base, arising from continuous compounding. **eˣ** is the natural exponential, uniquely its own derivative (central to calculus).
- **Exponent laws**: aᵐ·aⁿ = aᵐ⁺ⁿ, (aᵐ)ⁿ = aᵐⁿ, a⁰ = 1, a⁻ⁿ = 1/aⁿ, a^(1/n) = ⁿ√a.

## Logarithms

A **logarithm answers "what exponent?"**: **log_a(x) = y means aʸ = x**. It's the **inverse** of exponentiation:
- **log₁₀** (common log), **ln** (natural log, base e), **log₂** (base 2, common in computing).
- Intuition: log is the *exponent* you raise the base to. log₂(8) = 3 because 2³ = 8. Logs turn multiplicative scale into additive (each +1 in log = ×base).

**Logarithm laws** (mirrors of exponent laws — essential):
- log(xy) = log x + log y (product → sum)
- log(x/y) = log x − log y (quotient → difference)
- log(xⁿ) = n·log x (power → coefficient)
- **Change of base**: log_a(x) = log(x)/log(a).

These turn hard multiplications into easy additions (historically why logs were invented) and are heavily tested.

## Solving Equations

- **Exponential equations** (aˣ = b) — take the log of both sides to bring the variable down: x = log_a(b) = ln b / ln a.
- **Logarithmic equations** — exponentiate both sides (raise the base to each side) to undo the log; watch the **domain** (log is only defined for positive arguments — check for extraneous solutions).
- The exp↔log inverse relationship is the key tool: use logs to solve for exponents, use exponentials to solve for logs.

## Graphs

- **y = aˣ** — passes through (0,1), rises steeply (a>1) or falls (a<1), with the x-axis as a horizontal asymptote (never reaches 0).
- **y = log_a(x)** — the *reflection* of the exponential across y = x (inverse), passes through (1,0), with the y-axis as a vertical asymptote (undefined for x ≤ 0), rising slowly.
- Their mirror-image relationship visualizes the inverse.

## Applications

- **Compound interest** — A = P(1 + r/n)^(nt), or continuous A = Pe^(rt). Money grows exponentially.
- **Radioactive decay / half-life** — N = N₀·(½)^(t/T), exponential decay (see nuclear physics).
- **pH** = −log[H⁺] (chemistry — logarithmic acidity, see chemical-bonding).
- **Richter scale, decibels, information (bits)** — logarithmic scales compress huge ranges.

Master THPT exponentials/logs via **exponential functions** (growth/decay, e, exponent laws), **logarithms** as the *inverse* ("what exponent?") with their **laws** (product→sum, power→coefficient, change of base), **solving equations** (take logs to free exponents, mind the domain), **graphs** (mirror images across y=x), and **applications** (compound interest, half-life, pH). The unifying idea: exponentials and logarithms are inverse tools for multiplicative, compounding change.
