---
name: flaky-test-diagnosis
description: How to diagnose and fix flaky tests — tests that pass and fail nondeterministically on the same code, their common causes (timing/async, order dependence, shared state, time/randomness, network), and why flakiness destroys trust in a suite. Use to fix flaky tests, understand nondeterministic test failures, or stop random CI failures.
category: engineering
keywords_vi: test flaky, flaky test, đậu rớt ngẫu nhiên cùng code, chẩn đoán sửa test flaky, nguyên nhân timing phụ thuộc thứ tự trạng thái chung, flaky phá niềm tin bộ test, ci đỏ ngẫu nhiên
---

# Flaky Test Diagnosis

A flaky test **passes and fails nondeterministically on the same code** — green one run, red the next, with no code change. Flaky tests are corrosive: they **destroy trust** in the whole suite. Once people see random failures, they start **ignoring red builds** ("just re-run it") — and then a *real* failure gets ignored too. Fixing flakiness is about finding the source of **nondeterminism** (see testing-strategy, memory-models-and-happens-before).

## Why Flakiness Is So Damaging

A test suite's value is that **red means broken**. Flaky tests break that contract: red **sometimes** means broken, sometimes means nothing. The rational response becomes "re-run until green," which **trains the team to ignore failures** — so the suite stops catching real regressions. A few flaky tests can render an entire suite untrustworthy. That's why flakiness is a first-class problem, not a minor annoyance.

## The Common Causes

Flakiness comes from **nondeterminism** — something that varies between runs:
- **Timing / async / races** — the #1 cause. Tests that `sleep(500ms)` hoping an async operation finished, or assert before a promise resolves. If the operation is sometimes slower, the test fails. **Fix:** wait for the actual **condition/event**, not a fixed time; use proper async awaits/polling.
- **Test-order dependence** — a test relies on state left by another; passes when run after it, fails when run alone or in a different order (or in parallel). **Fix:** each test sets up/tears down its own state; no dependence on order.
- **Shared mutable state** — tests share a database, global variable, singleton, or file and interfere (especially in **parallel** runs). **Fix:** isolate state per test (fresh fixtures, transactions rolled back, unique keys).
- **Time and randomness** — tests depending on the current date/time (fails at midnight, month boundaries, DST) or on random values/seeds. **Fix:** inject/freeze the clock; fix random seeds.
- **External dependencies** — real network calls, third-party APIs, DNS — flaky by nature. **Fix:** mock/stub them (see test-doubles-and-mocking).
- **Concurrency in the code under test** — genuine data races (see memory-models-and-happens-before) surfacing intermittently.
- **Resource/environment** — port conflicts, insufficient memory, CI machine load causing timeouts.

## How to Diagnose

- **Reproduce** — run the test many times (loop it), run it **in isolation** and in **different orders**, run under **parallelism**, and under **load** — to surface the pattern.
- **Bisect the cause** — does it fail only after another test (order/state)? only in parallel (shared state)? only at certain times (clock)? only in CI (environment/timing)?
- **Quarantine** — move known-flaky tests out of the blocking suite (tracked, not deleted) so they stop eroding trust while you fix them — but **fix them**, don't leave them quarantined forever.
- **Detect flakiness** — CI that re-runs and flags tests with inconsistent results.

## Design Guidance

- **Wait for conditions, not fixed times** — never `sleep()` and hope; poll/await the real signal.
- **Isolate every test** — own setup/teardown, no shared mutable state, no order dependence, parallel-safe.
- **Control time and randomness** — inject a clock, fix seeds.
- **Mock external dependencies** — no real network in unit tests.
- **Make tests deterministic** — same input, same result, every time, any order.
- **Take flakiness seriously** — track, quarantine, and **fix** flaky tests; don't normalize "re-run it".

## Pitfalls (in understanding/using)

- **`sleep()`-based** waiting for async → flaky by construction; wait for the condition.
- **Order-dependent** tests / shared state → fail under isolation or parallelism.
- Depending on **real time/date or randomness** → fails at boundaries or intermittently; freeze them.
- **Real network/external** calls in tests → inherently flaky; mock them.
- Normalizing **"just re-run it"** → trains the team to ignore failures; the suite loses its value.
- **Deleting** flaky tests instead of fixing → losing the coverage they (imperfectly) provided.
- Leaving tests **quarantined forever** → the gap persists; quarantine is temporary triage, not a fix.
