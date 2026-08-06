---
name: monte-carlo-methods
description: How to solve problems that are hard to compute exactly by using RANDOM sampling — Monte Carlo methods. Estimate quantities (integrals, probabilities, expected values) by averaging over many random samples; error shrinks as 1/√N regardless of dimensions. Use to understand why Monte Carlo beats grids in high dimensions, the slow √N convergence, variance reduction, and its use in finance, physics, rendering, and ML.
category: systems-internals
keywords_vi: phương pháp monte carlo giải bằng lấy mẫu ngẫu nhiên, ước lượng tích phân xác suất kỳ vọng bằng trung bình nhiều mẫu, sai số giảm theo một trên căn n bất kể số chiều, thắng lưới grid ở không gian nhiều chiều, giảm phương sai variance reduction, dùng trong tài chính vật lý dựng ảnh và học máy
---

# Monte Carlo Methods

Some quantities are too hard to compute exactly: a 50-dimensional integral, the probability of a complex event, the value of an exotic option, the light in a rendered scene. **Monte Carlo methods** sidestep the exact computation by **random sampling** — draw many random samples, evaluate the thing for each, and **average**. By the law of large numbers, the average **converges** to the true value. It's one of the most broadly useful computational ideas, powering physics simulation, quantitative finance, ray-traced rendering, Bayesian inference, and RL (see monte-carlo's relatives reservoir-sampling, how-random-number-generation-works, numerical-stability-and-cancellation).

## The Core Idea: Expectation = Average of Samples

Anything expressible as an **expectation** `E[f(X)]` (and integrals/probabilities/areas can be) can be **estimated** by:
1. Draw `N` random samples `x₁…x_N` from the right distribution.
2. Compute `f` for each.
3. Average: `(1/N) Σ f(xᵢ)` → the estimate.

Classic toy example: estimate π by throwing random darts at a square with an inscribed circle — the fraction landing inside the circle ≈ area ratio ≈ π/4. No calculus, just counting random hits.

## The Killer Feature: Dimension-Independent Convergence

A grid/quadrature method needs points **exponential** in the number of dimensions (the **curse of dimensionality**): a grid of 10 points per axis is 10⁵⁰ points in 50-D — impossible. Monte Carlo's error shrinks as **O(1/√N)** **regardless of dimension**. So in high dimensions, random sampling is often the *only* feasible approach — this is why it dominates finance, particle physics, and graphics. The cost: **slow convergence** — to cut error by 10× you need **100×** more samples. Monte Carlo gets you a rough answer fast and a precise answer slowly.

## Variance Reduction (getting more accuracy per sample)

Since error ∝ √(variance/N), you can improve accuracy either by more samples (expensive) or by **lowering variance**:
- **Importance sampling** — sample more where `f` is large/matters, then reweight. Huge wins when the integrand is concentrated.
- **Antithetic variates / control variates / stratified sampling** — structured sampling that cancels variance.
- **Quasi-Monte Carlo** — low-discrepancy sequences (Sobol/Halton) that cover space more evenly than pure random, improving convergence toward O(1/N) for smooth problems.
- **MCMC (Markov Chain Monte Carlo)** — sample from hard distributions you can't sample directly (Bayesian posteriors) by constructing a Markov chain whose stationary distribution is the target.

## Design Guidance (for understanding/using)

- **Reach for Monte Carlo when exact computation is intractable** — high-dimensional integrals, complex probabilities, simulations.
- **Expect √N convergence** — budget samples accordingly; 4× samples ≈ 2× accuracy. Report **confidence intervals**, not just the point estimate.
- **Use variance reduction** (importance/stratified sampling, QMC) before brute-forcing more samples — often 10–100× cheaper for the same accuracy.
- **Mind the RNG quality and seeding** — reproducibility and independence matter (see randomness skill).
- **Use MCMC for sampling hard distributions** (Bayesian inference); watch convergence/mixing diagnostics.

## Pitfalls (in understanding/using)

- Expecting **fast** convergence → it's O(1/√N); precise answers need many samples.
- Reporting a Monte Carlo estimate **without error bars** → you don't know if it's converged.
- Using a grid in **high dimensions** → curse of dimensionality; Monte Carlo is the escape.
- Ignoring **variance reduction** → paying 100× more samples for accuracy you could get structurally.
- Poor/correlated RNG or bad MCMC mixing → biased estimates that look converged but aren't.
