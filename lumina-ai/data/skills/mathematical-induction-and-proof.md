---
name: mathematical-induction-and-proof
description: Mathematical proof techniques (thi chuyên/olympiad) — mathematical induction (weak/strong), proof by contradiction, contrapositive, direct proof, the extremal principle, invariants and monovariants, and pigeonhole. Use for olympiad/gifted-exam proofs, induction problems, or learning rigorous proof techniques.
category: knowledge
keywords_vi: quy nạp toán học và phương pháp chứng minh thi chuyên, quy nạp yếu và mạnh, chứng minh phản chứng, chứng minh phản đảo, chứng minh trực tiếp, nguyên lý cực hạn, bất biến và đơn biến, phản ví dụ và chuồng bồ câu
---

# Mathematical Induction & Proof Techniques

Rigorous **proof** is the essence of olympiad/thi-chuyên mathematics — not just getting an answer but demonstrating it's *necessarily* true. Beyond computation, you need a repertoire of proof methods and the judgment to choose the right one. These techniques apply across all of competition math.

## Mathematical Induction

The premier tool for statements about all natural numbers:
- **Weak induction** — prove the **base case** (n = 1 or n = 0), then the **inductive step** (assume true for n = k, prove for n = k+1). Like dominoes: if the first falls and each knocks the next, all fall.
- **Strong induction** — assume the statement holds for *all* values up to k (not just k) to prove k+1. Useful when a term depends on several previous ones (recurrences, prime factorization).
- **Common pitfalls** — always verify the base case; ensure the inductive step genuinely uses the hypothesis; watch that the base case matches where the claim starts.
- Used for sums/formulas, divisibility, inequalities, recurrences, and combinatorial claims.

## Direct Proof, Contrapositive & Contradiction

- **Direct proof** — assume the hypothesis, deduce the conclusion step by step.
- **Contrapositive** — to prove "if P then Q", prove "if not-Q then not-P" (logically equivalent, sometimes easier).
- **Proof by contradiction** — assume the statement is *false*, derive an absurdity, concluding it must be true. Powerful for irrationality (√2), infinitude of primes, and "no such object exists" claims.

## The Extremal Principle

Consider the **largest or smallest** object in a set (the extreme case). Assuming a minimal counterexample and deriving a smaller one (**infinite descent**) proves impossibility. Choosing the extreme element often exposes a contradiction or forces structure — a favorite olympiad technique.

## Invariants & Monovariants

- **Invariant** — a quantity that *never changes* under the allowed moves/operations. If the start and target differ in an invariant, the transformation is impossible. (Classic: parity, coloring, sums mod n.) Superb for "can you reach state B from state A?" problems.
- **Monovariant** — a quantity that only ever *increases* (or only decreases). It bounds the process and proves termination or limits.
- **Coloring arguments** — assign colors (like a checkerboard) so a move preserves some color-count invariant.

## Pigeonhole Principle

If more objects than boxes, some box holds ≥2 (see combinatorics-and-counting). A simple but powerful **existence** proof — choosing the right pigeons/holes is the art.

## Choosing & Writing Proofs

- **Match the method** — universal claims → induction; "no such object" / irrationality → contradiction; reachability → invariants; existence → pigeonhole/extremal.
- **Rigor** — every step must follow logically; state assumptions; handle all cases; don't hand-wave.
- **Clarity** — a proof must *communicate* the argument, not just reach the answer. Graders reward complete, well-organized reasoning.

Master proof via **mathematical induction** (weak and strong — base case + inductive step for claims over ℕ), the classic methods (**direct, contrapositive, contradiction**), the **extremal principle and infinite descent** (minimal counterexamples), **invariants and monovariants** (impossibility and termination via unchanging/monotone quantities), and **pigeonhole** (existence). Choosing the right technique and writing it rigorously is the core skill that distinguishes top thi-chuyên/olympiad performers.
