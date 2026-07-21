---
name: mutation-testing
description: How mutation testing works — deliberately introducing small bugs (mutants) into code and checking whether your tests catch them, measuring test-suite QUALITY (not just coverage), and why surviving mutants reveal weak tests. Use to understand mutation testing, test effectiveness, why coverage isn't enough, or measuring test-suite quality.
category: engineering
keywords_vi: mutation testing, mutant, mutation score, kiểm thử đột biến, cố tình chèn lỗi vào code xem test bắt được, đo chất lượng bộ test không chỉ độ phủ, mutant sống sót lộ test yếu
---

# Mutation Testing

Mutation testing answers a question coverage can't: **"are my tests actually any good?"** It works by **deliberately introducing small bugs** ("mutants") into your code and checking whether your test suite **catches** them. If a bug can be introduced and all tests still pass, those tests aren't really verifying that behavior — they just *execute* the code (coverage) without *checking* it (see testing-strategy, coverage-metrics-and-limits).

## The Problem: Coverage Lies About Quality

Code coverage tells you which lines **ran** during tests — but not whether the tests would **catch a bug** in those lines. You can have 100% coverage with tests that assert nothing meaningful ("coverage theater"). A line can be executed by a test that would pass even if the line were wrong. Coverage measures **execution**, not **verification**. Mutation testing measures the thing that actually matters: **fault-detection ability**.

## The Core Idea: Introduce Bugs, See If Tests Notice

A mutation testing tool automatically makes tiny, targeted changes to your code — each a plausible bug (a **mutant**):
- Change `>` to `>=`, `+` to `-`, `&&` to `||`.
- Replace a return value with a constant, remove a statement, negate a condition.
For each mutant, it **runs your test suite**:
- **Killed mutant** — a test **fails** → good, your tests caught the injected bug.
- **Surviving mutant** — all tests **still pass** → bad, your tests **didn't notice** the bug. This exposes a gap: that behavior isn't truly tested.
The **mutation score** = killed mutants / total mutants — a measure of test-suite **effectiveness**, far more meaningful than coverage. Surviving mutants are a **to-do list** of weak spots: either add/strengthen a test, or the code was untested/dead.

## What Surviving Mutants Tell You

- **Missing assertions** — the code runs in a test but nothing checks its result.
- **Weak assertions** — tests too loose to catch the change.
- **Untested edge cases** — the mutated boundary (`>` vs `>=`) has no test.
- **Dead/equivalent code** — sometimes a mutant is **equivalent** (produces identical behavior), so no test *can* catch it — a false positive to recognize.

## The Trade-off: Cost

Mutation testing is **expensive**: it runs the whole (relevant) test suite **once per mutant**, and there can be thousands of mutants → very slow. Mitigations: run only on **changed** code (incremental), sample mutants, run in CI nightly rather than per-commit, and use tools that select tests covering each mutant. It's a **quality audit**, not something you run constantly.

## Design Guidance

- **Use it to audit test quality** where correctness matters (core logic, libraries), not everywhere.
- **Treat surviving mutants as a checklist** — add assertions/edge-case tests to kill them.
- **Run incrementally** (on diffs) or nightly to manage cost.
- **Recognize equivalent mutants** — some can't be killed; don't chase 100%.
- **Combine with coverage** — coverage finds unexecuted code; mutation finds unverified code.
- Aim for a **high mutation score on critical code**, not a blanket target.

## Pitfalls (in understanding/using)

- Trusting **coverage** as a quality measure → it shows execution, not verification; mutation shows the gap.
- Running mutation testing **on everything every commit** → far too slow; scope it (diffs/nightly/critical code).
- Chasing **100% mutation score** → equivalent mutants make it unreachable; diminishing returns.
- Ignoring **surviving mutants** → they're precisely your weakest, most bug-prone tests.
- Thinking a killed mutant means the test is **perfect** → it means that specific fault is caught, not all faults.
- Not recognizing **equivalent mutants** → wasted effort on unkillable ones.
