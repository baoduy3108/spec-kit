---
name: testing-strategy
description: Decide what and how much to test — the test pyramid (many unit, fewer integration, few E2E), testing behavior not implementation, what deserves a test vs what doesn't, meaningful coverage vs coverage theater, and keeping tests fast, isolated, and non-flaky. Use when planning a testing approach or deciding whether/what to test. (For test-first workflow see test-driven-development; for pitfalls see testing-anti-patterns.)
category: engineering
keywords_vi: chiến lược test, test pyramid, nên test cái gì, unit integration e2e, độ phủ test coverage, test hành vi, viết test cho dự án, mức độ test
---

# Testing Strategy

The goal of tests is confidence to change code safely — not a coverage number. Test the things that would hurt if they broke, at the cheapest level that gives real confidence.

## The Test Pyramid

- **Many unit tests** — fast, isolated, test one function/module's logic. The base; run in milliseconds, pinpoint failures.
- **Fewer integration tests** — verify components work together (code + DB, service + service, module boundaries). Slower, catch wiring bugs units miss.
- **Few end-to-end tests** — drive the whole system as a user. Highest confidence, but slow, brittle, and flaky — keep them to critical happy paths (login, checkout), not every case.

Inverting this (mostly slow E2E, few units — the "ice cream cone") gives slow, flaky suites that people stop trusting. Push tests **down** to the lowest level that can catch the bug.

## Test Behavior, Not Implementation

Assert on **observable behavior and outputs**, not internal details. A test coupled to implementation (private methods, exact call sequences, over-mocking) breaks on every harmless refactor and tests nothing real. Good tests survive refactors and fail on real regressions. If you can't refactor without rewriting tests, they're testing the wrong thing.

## What to Test (and Not)

- **Do test**: business logic, edge cases (empty, null, boundary, huge, unicode), error paths, bug regressions (a test that reproduces the bug), and public contracts/APIs.
- **Don't bother**: trivial getters, framework/library internals, generated code, or third-party code (test your *usage* of it, not it).
- **Prioritize by risk** — the complex, high-traffic, easy-to-break, expensive-if-wrong parts get the most tests.

## Coverage: Signal, Not Target

Coverage shows what's *un*tested (useful) but high coverage ≠ good tests — you can execute a line with no meaningful assertion (coverage theater). Chasing 100% wastes effort on trivia and encourages hollow tests. Aim for meaningful coverage of important paths; treat a low number as a smell, not the high number as a goal.

## Keep Tests Trustworthy

Fast (slow suites don't get run), **isolated** (no shared state or order dependence; each sets up its own data), **deterministic** (a flaky test that passes on retry is a bug — fix it, don't ignore it), and readable (a failing test should tell you what broke). Mock external/slow dependencies you don't own; never mock the thing under test.
