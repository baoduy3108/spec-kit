---
name: discrete-math-and-set-theory
description: Discrete mathematics and set theory (advanced math/CS) — sets and operations, relations and functions, the pigeonhole principle, basic combinatorics, modular arithmetic, and mathematical structures. Use for discrete math, set theory, relations and functions, or the mathematical foundations of computer science.
category: knowledge
keywords_vi: toán rời rạc và lý thuyết tập hợp, tập hợp và các phép toán, quan hệ và ánh xạ hàm số, nguyên lý chuồng bồ câu dirichlet, tổ hợp cơ bản, số học đồng dư, cấu trúc toán học nền tảng tin học
---

# Discrete Mathematics & Set Theory

Discrete mathematics studies **countable, distinct structures** (as opposed to continuous ones) — sets, logic, relations, graphs, and combinatorics. It's the mathematical foundation of computer science and a bridge across competition math topics. Set theory provides its basic language.

## Sets & Operations

- A **set** — an unordered collection of distinct objects (elements). Notation: {1, 2, 3}, or defined by a rule {x : x is even}.
- **Membership** (∈), **subset** (⊆), **empty set** (∅), **universal set**.
- **Operations** — **union** (A ∪ B, in either), **intersection** (A ∩ B, in both), **difference** (A − B), **complement** (Aᶜ, not in A). Visualized with **Venn diagrams**.
- **Cardinality** — the size |A|; **inclusion-exclusion** for |A ∪ B| = |A| + |B| − |A ∩ B| (see combinatorics).
- **Power set** — the set of all subsets (2ⁿ of them for n elements).

## Relations

- A **relation** — a set of ordered pairs relating elements (e.g. "less than," "divides").
- **Properties** — reflexive, symmetric, transitive. A relation with all three is an **equivalence relation**, partitioning a set into classes (e.g. congruence mod n).
- **Partial orders** — reflexive, antisymmetric, transitive (e.g. subset, divisibility) — structure hierarchies.

## Functions (Mappings)

- A **function** f: A → B maps each element of the domain A to exactly one in the codomain B (see calculus's function concept, but here discrete).
- **Injective** (one-to-one — distinct inputs → distinct outputs), **surjective** (onto — covers all of B), **bijective** (both — a perfect pairing, invertible).
- Bijections prove two sets have the **same size** — key in combinatorics (see combinatorics-and-counting) and infinity/countability.

## The Pigeonhole Principle

- If n+1 objects go into n boxes, some box has ≥2 (see combinatorics/mathematical-induction). A simple but powerful **existence** tool, pervasive in discrete math and competition proofs.

## Modular Arithmetic

- **Congruence** — a ≡ b (mod n) when n divides (a − b); "clock arithmetic" (see number-theory-and-divisibility). Central to cryptography, hashing, and CS.
- Arithmetic with remainders; equivalence classes mod n.

## Mathematical Structures & CS Connection

- **Combinatorics** (counting), **graph theory** (networks — see graph-theory-and-invariants), **Boolean algebra** and **logic** (see formal-logic — the basis of digital circuits and programming), **recursion**, and **algorithms** all live in discrete math.
- **Why it matters for CS** — computers are discrete; data structures (sets, graphs, trees), logic, complexity, and correctness proofs all rest on discrete math. It's the theoretical backbone of computing.

Master discrete math via **sets and operations** (union, intersection, complement, cardinality, power sets), **relations** (equivalence relations partitioning sets, partial orders), **functions** (injective/surjective/bijective, using bijections to compare sizes), the **pigeonhole principle** (existence proofs), **modular arithmetic** (congruences), and the **structures connecting to CS** (combinatorics, graphs, logic, Boolean algebra). This mathematics of discrete, countable structures is both a competition-math foundation and the theoretical bedrock of computer science.
