---
name: differential-equations-intro
description: Introduction to differential equations (advanced calculus) — what a differential equation is, first-order separable and linear equations, initial conditions, exponential growth/decay models, and simple second-order equations. Use for differential equations, modeling change, growth/decay ODEs, or solving basic differential equations.
category: knowledge
keywords_vi: phương trình vi phân nhập môn giải tích nâng cao, phương trình vi phân là gì, phương trình cấp một tách biến và tuyến tính, điều kiện đầu, mô hình tăng trưởng và phân rã theo hàm mũ, phương trình vi phân cấp hai đơn giản
---

# Introduction to Differential Equations

A **differential equation** relates a function to its **derivatives** — describing how a quantity *changes* rather than its value directly. They're the language of science and engineering (physics, biology, economics), since most natural laws describe rates of change. This intro covers the basic types and how to solve them (building on calculus — see integration-techniques).

## What Is a Differential Equation?

- An equation involving an unknown **function and its derivatives**, e.g. **dy/dx = ky** ("the rate of change of y is proportional to y").
- **Solving** means finding the function y(x) that satisfies it — usually by **integrating**.
- **Order** — the highest derivative present (first-order: y'; second-order: y'').
- **General solution** — a family of solutions (with arbitrary constants); a **particular solution** is pinned down by **initial conditions**.

## First-Order: Separable Equations

The most basic solvable type:
- **Separable** — can be written as g(y)dy = f(x)dx (variables separated). **Solve by integrating both sides.**
- Example: dy/dx = ky → dy/y = k dx → ln|y| = kx + C → **y = Ae^(kx)** (exponential — see exponentials-and-logarithms).

## First-Order: Linear Equations

- **Linear first-order** — dy/dx + P(x)y = Q(x). Solved using an **integrating factor** (multiply through by e^∫P dx to make the left side a perfect derivative), then integrate.
- A systematic method for a broad, important class.

## Initial Conditions

- An **initial condition** (e.g. y(0) = y₀) determines the arbitrary constant, giving the unique **particular solution** — the specific curve through a known starting point. An "initial value problem."

## Exponential Growth & Decay (Key Models)

The most important application:
- **dy/dt = ky** → **y = y₀e^(kt)** — exponential growth (k > 0) or decay (k < 0).
- Models: **population growth**, **radioactive decay** (see nuclear physics), **compound interest**, cooling (Newton's law of cooling), and drug elimination. Ubiquitous because "rate proportional to amount" is so common.
- **Logistic growth** — dy/dt = ky(1 − y/K) — growth that levels off at a carrying capacity (see ecology), a more realistic model.

## Simple Second-Order Equations

- **y'' + ω²y = 0** — gives sinusoidal solutions y = A·cos(ωt + φ), describing **simple harmonic motion** and oscillations (see oscillations-and-waves). A bridge to physics.
- Solved via the **characteristic equation** for linear constant-coefficient equations.

Master introductory differential equations by understanding them as **equations relating a function to its rates of change** (solved by integration), the first-order methods — **separable** (separate variables and integrate) and **linear** (integrating factor) — the role of **initial conditions** (picking the particular solution), the central **exponential growth/decay models** (dy/dt = ky → y₀e^(kt), governing populations, decay, interest), and **simple second-order** equations (oscillations). Differential equations turn the calculus of change into a tool for modeling how the world evolves over time.
