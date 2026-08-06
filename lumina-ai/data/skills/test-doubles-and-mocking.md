---
name: test-doubles-and-mocking
description: How test doubles work — the types (dummy, stub, spy, mock, fake) and when to use each, mocking dependencies to isolate the unit under test, the state-vs-interaction testing distinction, and the common trap of over-mocking. Use to understand mocks/stubs/fakes, isolating tests, mocking dependencies, or why over-mocking makes tests brittle.
category: engineering
keywords_vi: test double, mocking, giả lập phụ thuộc, stub mock fake spy, cô lập unit test, over-mocking test giòn, mock dependency, state vs interaction testing
---

# Test Doubles & Mocking

A **test double** is a stand-in for a real dependency during testing — like a stunt double for a component. They let you **isolate** the code under test from slow, unreliable, or hard-to-control dependencies (databases, network, time, external APIs). Used well they make tests fast and focused; overused they make tests brittle and meaningless.

## Why Use Doubles

To unit-test a piece of code, you often need to replace its collaborators:
- **Speed/reliability** — avoid hitting a real database/network (slow, flaky).
- **Control** — force specific scenarios (an API returning an error, a timeout, a specific time/date).
- **Isolation** — test *this* unit's logic, not its dependencies (a failing test points at the unit, not a downstream service).

## The Types (Meszaros' taxonomy)

Not all doubles are "mocks" — the precise vocabulary matters:
- **Dummy** — a placeholder passed but never used (just to fill a parameter).
- **Stub** — returns **canned answers** to calls (e.g. `getUser()` always returns a fixed user). Provides indirect *input*. Used for **state**-based tests.
- **Spy** — a stub that also **records** how it was called (so you can assert on it afterward).
- **Mock** — pre-programmed with **expectations** about how it should be called; the test **fails if the interactions don't match**. Used for **interaction**-based tests.
- **Fake** — a **working but simplified** implementation (an in-memory database, a fake payment gateway). Real behavior, not production-suitable. Often the most robust choice.
Colloquially everyone says "mock," but knowing the distinctions clarifies what you're actually testing.

## State vs Interaction Testing

- **State-based** (with stubs/fakes) — call the code, then **assert on the resulting state/output**. Tests *what* happened. Generally more robust — it doesn't care *how* the result was produced.
- **Interaction-based** (with mocks) — **assert that specific calls were made** to collaborators. Tests *how* the code collaborates. Useful when the interaction *is* the behavior (e.g. "an email was sent"), but couples the test to the implementation.

## The Over-Mocking Trap

The biggest pitfall: mocking **too much**. When you mock everything:
- Tests become tightly **coupled to implementation details** — refactoring the internals (without changing behavior) breaks the tests. Brittle tests that fail for the wrong reasons discourage refactoring.
- Tests can pass while the real integration is **broken** (you tested against your assumptions/mocks, not reality) — false confidence.
Prefer testing **real objects** where cheap, use **fakes** (in-memory DB) over intricate mock setups, and mock mainly at **boundaries** (external services, I/O, nondeterminism). Reserve interaction/mock assertions for when the interaction is the actual thing you're verifying.

## Pitfalls (in understanding/using)

- **Over-mocking** → brittle tests coupled to implementation; refactoring breaks them and they don't prove real behavior works.
- **Mocking what you don't own** (third-party libraries) → your mock can drift from their real behavior; wrap them and mock your wrapper, or use a fake.
- **Interaction tests everywhere** (asserting call sequences) instead of state/output → tests that fail on harmless refactors.
- Confusing the double **types** → asserting on a stub, or building elaborate mocks where a simple fake/stub suffices.
- Mocks that **always agree** with the code → passing tests that prove nothing (false confidence); complement with integration/contract tests (see contract-testing).
- Not testing the **real integration** at all — some end-to-end/integration coverage is still needed (see testing-strategy).
