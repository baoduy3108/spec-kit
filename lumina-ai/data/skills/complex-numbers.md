---
name: complex-numbers
description: Complex numbers (thi chuyên/advanced math) — the imaginary unit and arithmetic, the complex plane, modulus and argument, polar/exponential form, De Moivre's theorem, roots of unity, and applications to geometry and trigonometry. Use for high-school/olympiad complex numbers, the complex plane, roots of unity, or complex-number techniques.
category: knowledge
keywords_vi: số phức thi chuyên toán nâng cao, đơn vị ảo i và phép toán, mặt phẳng phức, mô đun và acgumen, dạng lượng giác và mũ, định lý moivre, căn bậc n của đơn vị, ứng dụng hình học và lượng giác
---

# Complex Numbers

Complex numbers extend the reals with **i = √(−1)**, creating a system where every polynomial has roots (the fundamental theorem of algebra) and where algebra, geometry, and trigonometry unify beautifully. They're a THPT topic and a powerful olympiad/thi-chuyên tool.

## Definition & Arithmetic

- **z = a + bi**, where a is the real part, b the imaginary part, and **i² = −1**.
- **Add/subtract** componentwise; **multiply** using i² = −1 (distribute). **Conjugate** z̄ = a − bi (flips the imaginary part).
- **Division** — multiply top and bottom by the conjugate of the denominator to rationalize.
- **z·z̄ = a² + b² = |z|²** (real and non-negative) — a key identity.

## The Complex Plane

- Represent z = a + bi as the **point (a, b)** (or a vector) in the plane — the **Argand diagram**. Real axis horizontal, imaginary axis vertical.
- This geometric view is the source of complex numbers' power: **algebraic operations become geometric transformations**.

## Modulus & Argument

- **Modulus** |z| = √(a² + b²) — distance from the origin (magnitude).
- **Argument** arg(z) = angle from the positive real axis (θ = arctan(b/a), with quadrant care).
- Together (r, θ) are **polar coordinates** of z.

## Polar & Exponential Form

- **Polar form**: z = r(cos θ + i sin θ). **Euler's formula**: **e^(iθ) = cos θ + i sin θ**, so **z = r·e^(iθ)** — the elegant exponential form.
- **Multiplication in polar form** — moduli multiply, arguments **add**: multiplying by z rotates by arg(z) and scales by |z|. This is why complex numbers encode rotations. Division: moduli divide, arguments subtract.

## De Moivre's Theorem

**(cos θ + i sin θ)ⁿ = cos(nθ) + i sin(nθ)** — raising to a power multiplies the argument by n.
- **Powers** of complex numbers become easy in polar form.
- **Deriving trig identities** — expand (cos θ + i sin θ)ⁿ to get formulas for cos(nθ), sin(nθ) in terms of cos θ, sin θ (a classic technique).

## Roots of Unity

- The **nth roots of unity** — solutions to zⁿ = 1 — are n equally-spaced points on the unit circle: e^(2πik/n), k = 0,...,n−1. They form a regular n-gon.
- **Properties** — they sum to zero (for n>1), and are central to problems in number theory, combinatorics (roots-of-unity filter), and geometry.
- General **nth roots** of any complex number: n equally-spaced points on a circle of radius |z|^(1/n).

## Applications

- **Geometry** — rotations (multiply by e^(iθ)), representing points/transformations; many olympiad geometry problems yield to complex-coordinate bashing (points as complex numbers).
- **Trigonometry** — deriving identities via De Moivre and Euler's formula (converting products/powers).
- **Polynomials** — complex roots explain factorization (see polynomials-and-roots); roots of unity solve zⁿ = 1.

Master complex numbers via **arithmetic and the conjugate** (i² = −1, |z|² = zz̄), the **complex plane** (algebra as geometry), **modulus and argument**, **polar/exponential form** (Euler's formula, multiplication = rotate-and-scale), **De Moivre's theorem** (powers and trig identities), and **roots of unity** (regular polygons, summing to zero). The unifying insight — complex multiplication is rotation-and-scaling — makes them a powerful bridge between algebra, geometry, and trigonometry for THPT and thi-chuyên.
