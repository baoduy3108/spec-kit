---
name: limits-and-continuity
description: Limits and continuity (THPT/advanced calculus) — the limit concept, one-sided and infinite limits, limit laws and evaluation techniques, indeterminate forms, continuity, and the intermediate/extreme value theorems. Use for calculus limits, evaluating limits, continuity of functions, or the foundation of calculus.
category: knowledge
keywords_vi: giới hạn và tính liên tục giải tích thpt, khái niệm giới hạn hàm số, giới hạn một bên và giới hạn vô cực, các định lý và kỹ thuật tính giới hạn, dạng vô định, tính liên tục của hàm số, định lý giá trị trung gian
---

# Limits & Continuity (Calculus Foundation)

Limits are the **foundation of calculus** — the rigorous idea of a value a function *approaches*. Continuity describes functions with no breaks. Together they underlie derivatives and integrals (see calculus-intuition) and are a THPT and early-university topic.

## The Limit Concept

- **lim(x→a) f(x) = L** means: as x gets arbitrarily *close* to a, f(x) gets arbitrarily close to L — regardless of what happens *at* a itself.
- The function need not even be defined at a; the limit is about the *approach*. This handles "0/0" situations and instantaneous rates that direct substitution can't.

## One-Sided & Infinite Limits

- **One-sided limits** — approaching from the left (x→a⁻) or right (x→a⁺). The two-sided limit exists only if both sides agree.
- **Infinite limits** — f(x) → ±∞ (a vertical asymptote); **limits at infinity** — behavior as x → ±∞ (horizontal asymptotes, end behavior).

## Evaluating Limits

- **Direct substitution** — if f is continuous at a, just plug in.
- **Indeterminate forms** (0/0, ∞/∞, ∞−∞, 0·∞) — need work:
  - **Factor and cancel** (for 0/0 rational functions).
  - **Rationalize** (multiply by conjugate for roots).
  - **Divide by the highest power** (for limits at infinity of rational functions).
  - **L'Hôpital's rule** (advanced) — for 0/0 or ∞/∞, take derivatives of top and bottom.
  - **Squeeze theorem** — trap a function between two with the same limit (used for lim(sin x/x) = 1 as x→0, a key special limit).

## Continuity

- A function is **continuous at a** if: f(a) is defined, the limit exists, and **lim(x→a) f(x) = f(a)** — no gaps, jumps, or holes.
- **Types of discontinuity** — removable (a hole), jump, and infinite (asymptote).
- **Continuous on an interval** — continuous at every point; you can "draw it without lifting the pen."
- Polynomials are continuous everywhere; rational/trig/etc. are continuous on their domains.

## Key Theorems

For continuous functions on closed intervals:
- **Intermediate Value Theorem** — a continuous function takes every value between f(a) and f(b) — so if f(a) and f(b) have opposite signs, there's a **root** between them (proves solutions exist; basis of bisection).
- **Extreme Value Theorem** — a continuous function on a closed interval attains a maximum and minimum (guarantees optimization has answers).

Master limits and continuity via the **limit concept** (the value approached, not attained), **one-sided and infinite limits**, **evaluation techniques** (substitution, factoring, rationalizing, dividing by highest power, squeeze theorem, L'Hôpital for indeterminate forms), **continuity** (limit equals value, no breaks; types of discontinuity), and the **IVT and EVT** (roots exist; extrema exist). Limits make precise the "approaching" idea on which all of calculus — derivatives and integrals — is built.
