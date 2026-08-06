---
name: test-data-management
description: How to manage test data — factories/builders for constructing test objects, fixtures, isolation and cleanup between tests, avoiding shared mutable data, and creating realistic-but-safe data without brittleness. Use to design test data, use factories/builders, isolate test state, or avoid brittle shared fixtures.
category: engineering
keywords_vi: quản lý dữ liệu test, factory builder tạo đối tượng test, fixture, cô lập và dọn dẹp giữa các test, tránh dữ liệu chung thay đổi được, dữ liệu thực tế nhưng an toàn không giòn
---

# Test Data Management

Good tests need the **right data** in the **right state**, created **cleanly** and **isolated** from other tests. How you construct and manage test data hugely affects whether your suite is readable, maintainable, and reliable — or brittle and flaky. The core techniques are **factories/builders**, proper **isolation**, and **cleanup** (see flaky-test-diagnosis, testing-strategy).

## The Problem: Test Setup Sprawl and Coupling

Every test needs some data (a user, an order, a config). Done badly:
- **Duplicated setup** — the same 20 lines of object construction copy-pasted across tests; change a required field and every test breaks.
- **Giant shared fixtures** — one big dataset all tests use; tests become coupled to its exact contents, and any change breaks many tests (brittle).
- **Over-specified data** — tests set every field even when irrelevant, obscuring what the test actually cares about.
- **Shared mutable state** — tests mutate common data and interfere (a top cause of flakiness — see flaky-test-diagnosis).
Good test-data practices avoid all this.

## Factories and Builders

The best tool: **factories** (or the **builder** pattern) that construct test objects with **sensible defaults**, letting each test **override only the fields it cares about**:
- `createUser()` → a valid user with all required fields defaulted.
- `createUser({ role: "admin" })` → same, but the test specifies *only* the relevant detail.
Benefits:
- **DRY** — construction logic lives in one place; add a required field once.
- **Readable intent** — the test shows only what matters ("an admin user"), not boilerplate.
- **Valid by default** — objects are always constructible/valid, so tests don't break on unrelated schema changes.
Libraries (Factory Bot, Faker, test data builders) formalize this. **Randomized-but-valid** data (Faker) can surface assumptions, but keep it **deterministic** (fixed seed) to avoid flakiness.

## Isolation and Cleanup

Each test must start from a **known, clean state** and not leak into others (see flaky-test-diagnosis):
- **Fresh data per test** — build what you need in setup; don't rely on data from other tests or run order.
- **Cleanup / teardown** — reset after each test. For databases, **wrap each test in a transaction and roll back**, or truncate/reset between tests — fast and reliable.
- **Unique keys** — generate unique IDs/emails per test so parallel tests don't collide.
- **No shared mutable fixtures** — shared **read-only** reference data is okay; shared **mutable** data causes interference.

## The "Realistic but Safe" Balance

- **Realistic enough** — data should resemble production shapes to catch real bugs (edge cases, encodings, sizes).
- **Safe** — never use **real production data with PII** in tests (privacy/leak risk — see pii-handling-and-minimization); use synthetic or **anonymized** data (see data-anonymization-and-pseudonymization).
- **Minimal** — include only what the test needs; extra data is noise and coupling.

## Design Guidance

- **Use factories/builders** with sensible defaults; override only the relevant fields per test.
- **Isolate every test** — fresh data, own setup/teardown, transaction-rollback for DBs, unique keys.
- **Avoid giant shared mutable fixtures** — they couple and break tests.
- **Deterministic** data (fix seeds) even when using fakers/random generators.
- **Synthetic or anonymized** data — never real PII in tests.
- **Show intent** — the test should reveal what data matters to it, hiding boilerplate.

## Pitfalls (in understanding/using)

- **Duplicated setup** everywhere → a schema change breaks every test; centralize in factories.
- **Giant shared fixtures** → brittle coupling; a change breaks unrelated tests.
- **Shared mutable data** between tests → interference and flakiness (especially in parallel).
- **Over-specifying** irrelevant fields → obscures the test's intent and adds coupling.
- **Non-deterministic** random data → flaky tests; fix the seed.
- Using **real production/PII** data in tests → privacy leak and legal risk.
- No **cleanup** → state bleeds across tests; order-dependent failures.
