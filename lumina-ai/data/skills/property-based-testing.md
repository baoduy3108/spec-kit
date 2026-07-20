---
name: property-based-testing
description: How property-based testing works — instead of hand-written examples, specify properties that must always hold and let the tool generate hundreds of random inputs to try to falsify them, with shrinking to minimal failing cases. Use to understand property-based testing, QuickCheck/Hypothesis, finding edge cases automatically, or testing invariants.
category: engineering
keywords_vi: property-based testing, kiểm thử theo thuộc tính, sinh input ngẫu nhiên, thuộc tính luôn đúng invariant, quickcheck hypothesis, shrinking ca lỗi tối thiểu, tìm edge case tự động
---

# Property-Based Testing

Property-based testing flips how you write tests: instead of hand-crafting specific input→output **examples**, you describe **properties** that must hold for *all* valid inputs, and the tool **generates hundreds of random inputs** trying to break them. It excels at finding the edge cases you'd never think to write.

## Example-Based vs Property-Based

- **Example-based (traditional)** — you write `assert reverse([1,2,3]) == [3,2,1]`. Tests only the cases you thought of; misses the empty list, huge lists, duplicates, unicode, the weird input that breaks it.
- **Property-based** — you state a **property** true for *any* input, and the framework throws many generated inputs at it. For reverse: "reversing twice gives the original" (`reverse(reverse(xs)) == xs`) — tested against hundreds of random lists. You test the **rule**, not examples.

## Thinking in Properties

The skill is identifying **invariants** that hold for all inputs. Common patterns:
- **Round-trip** — `decode(encode(x)) == x` (serialize/parse, compress/decompress).
- **Invariants** — a sort's output is always sorted and a permutation of the input; a balanced tree stays balanced.
- **Idempotence** — `f(f(x)) == f(x)` (e.g. normalizing, deduping).
- **Oracle / cross-check** — the result matches a simpler (slower) reference implementation.
- **Commutativity / consistency** — `add(a,b) == add(b,a)`; the fast path agrees with the slow path.
Stating good properties forces you to understand what your code *actually guarantees*.

## Generation & Shrinking (the magic)

- The framework **generates** many random valid inputs (integers, strings, lists, custom types) — including nasty ones (empty, zero, negative, huge, unicode, boundary values) you'd rarely write by hand. This surfaces edge cases automatically.
- When it finds a **failing** input, **shrinking** kicks in: it automatically **reduces** the failing case to the **smallest/simplest** input that still fails (e.g. from a 500-element list to `[0, 0]`). This tiny counterexample makes debugging vastly easier — you see the essence of the bug, not a giant random blob.
Tools: **QuickCheck** (Haskell, origin), **Hypothesis** (Python), **fast-check** (JS), jqwik (Java), proptest (Rust).

## Where It Shines (and doesn't)

- **Great for** — parsers/serializers, data-structure invariants, numeric/algorithmic code, anything with clear mathematical properties or a reference implementation.
- **Less suited** — code where properties are hard to articulate (complex UI, side-effect-heavy glue), where example tests are clearer. It **complements** example-based tests, not replaces them (see testing-strategy).

## Pitfalls (in understanding/using)

- **Weak/tautological properties** — a property that's trivially true tests nothing; find meaningful invariants.
- Restating the **implementation** as the property (then a bug in the code is a bug in the test) — prefer independent properties (round-trip, oracle).
- **Poor generators** — if generated inputs don't cover the real input space (or generate only invalid data), you miss bugs; tune the generators.
- Expecting it to **replace** example tests — use both; examples document intent, properties find edge cases.
- **Flaky** failures from randomness that are hard to reproduce — good frameworks record the seed and shrink; save failing cases as regression tests.
- Non-deterministic code under test (time, randomness, I/O) breaking properties — control those inputs.
