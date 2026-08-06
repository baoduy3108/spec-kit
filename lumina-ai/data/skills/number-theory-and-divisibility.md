---
name: number-theory-and-divisibility
description: Number theory for competition math (thi chuyên/olympiad) — divisibility, primes and the fundamental theorem of arithmetic, GCD/LCM and the Euclidean algorithm, modular arithmetic and congruences, Fermat's little theorem, Diophantine equations, and problem-solving techniques. Use for olympiad/gifted-exam number theory, divisibility proofs, or advanced integer problems.
category: knowledge
keywords_vi: số học và chia hết thi chuyên olympiad, tính chia hết và ước bội, số nguyên tố và phân tích thừa số, ước chung lớn nhất bội chung nhỏ nhất euclid, số học đồng dư modulo, định lý fermat nhỏ, phương trình nghiệm nguyên diophantine, kỹ thuật giải toán số học
---

# Number Theory & Divisibility (Competition Math)

Number theory — the study of integers — is a pillar of math olympiads and gifted-school exams (thi chuyên). Its problems need few prerequisites but deep cleverness. Mastering the core tools (divisibility, primes, modular arithmetic) and problem-solving techniques is essential for scoring at the top level.

## Divisibility

- **a | b** ("a divides b") means b = a·k for some integer k. Core properties: if a|b and a|c then a|(bx+cy) for any integers x,y (linear combinations); transitivity; if a|b and b|a then a=±b.
- **Divisibility rules** and manipulation (factoring, a^n − b^n divisibility patterns) are basic tools.
- Many problems reduce to *showing something is divisible* — build expressions you can factor.

## Primes & Fundamental Theorem

- **Primes** — integers >1 divisible only by 1 and themselves; the building blocks.
- **Fundamental Theorem of Arithmetic** — every integer >1 factors *uniquely* into primes. This is the bedrock: analyzing a number via its **prime factorization** (exponents of each prime) unlocks divisor counts, GCD/LCM, perfect squares, and more.
- **Infinitude of primes** (Euclid's proof), and prime-related counting are common themes.

## GCD, LCM & the Euclidean Algorithm

- **GCD** (greatest common divisor) and **LCM** (least common multiple); **gcd(a,b)·lcm(a,b) = a·b**.
- **Euclidean algorithm** — gcd(a,b) = gcd(b, a mod b), repeated — computes GCD fast and underlies **Bézout's identity** (gcd(a,b) = ax+by for some integers x,y), a powerful proof tool.
- **Coprime** (gcd = 1) numbers have special, exploitable properties.

## Modular Arithmetic (The Key Technique)

Working with **remainders** ("clock arithmetic") is the number-theorist's sharpest tool:
- **a ≡ b (mod n)** means n | (a−b) — a and b have the same remainder mod n. Congruences add, subtract, and multiply like equations.
- **Powerful for**: checking divisibility, last digits (mod 10), remainders, and proving *impossibility* (if an equation is unsolvable mod some n, it's unsolvable — the "look mod n" technique cracks many problems).
- **Fermat's Little Theorem** — if p is prime and gcd(a,p)=1, then a^(p−1) ≡ 1 (mod p). Plus Euler's theorem, Wilson's theorem, and the Chinese Remainder Theorem (solving simultaneous congruences).

## Diophantine Equations

**Integer-solution equations** (a competition staple):
- **Linear**: ax + by = c has solutions iff gcd(a,b) | c (found via Bézout).
- **Techniques**: factoring (Simon's Favorite Factoring Trick), bounding (show variables are limited), infinite descent, and modular constraints (show no solutions mod n).
- Famous forms: Pythagorean triples, Pell's equation. The art is finding the right constraint.

## Problem-Solving Techniques

The heart of competition number theory:
- **Look at it mod n** — choose a clever modulus to expose structure or impossibility.
- **Prime factorization analysis** — reason about exponents of each prime.
- **Bounding and extremal** — squeeze variables between limits; consider smallest/largest.
- **Factoring cleverly** — rewrite to expose divisibility.
- **Infinite descent / contradiction** — assume a minimal counterexample, derive a smaller one.
- **Invariants and parity** (odd/even) — simple but powerful.

Master competition number theory via **divisibility** (properties, factoring), **primes and unique factorization** (the structural foundation), **GCD/LCM with the Euclidean algorithm and Bézout**, and above all **modular arithmetic** (congruences, Fermat's little theorem, the "look mod n" technique) and **Diophantine equation** methods — deployed through techniques like modular constraints, bounding, clever factoring, and descent. These tools, from basics to advanced, are what let you crack the hardest thi-chuyên/olympiad integer problems.
