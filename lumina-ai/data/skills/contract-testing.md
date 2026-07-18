---
name: contract-testing
description: How contract testing works — verifying that a service consumer and provider agree on their API contract without slow end-to-end integration tests, consumer-driven contracts (Pact), and how it catches breaking API changes early. Use to understand contract testing, testing microservice APIs, consumer-driven contracts, or preventing breaking changes between services.
category: engineering
keywords_vi: contract testing, kiểm thử hợp đồng api, consumer provider đồng thuận, consumer-driven contract pact, phát hiện breaking change, kiểm thử microservice, thay thế integration test chậm
---

# Contract Testing

Contract testing verifies that two services — a **consumer** (the caller) and a **provider** (the API) — agree on the **contract** between them (request/response shapes, status codes), catching breaking changes **without** running slow, brittle full end-to-end integration tests. It's the sweet spot for testing service-to-service APIs.

## The Problem It Solves

In a microservices system, Service A calls Service B's API. How do you know a change to B won't break A?
- **Unit tests** — test each service in isolation, but miss integration mismatches (B changed a field name; A's tests still pass).
- **End-to-end tests** — spin up *both* (and their dependencies) and test them together. Accurate but **slow, flaky, expensive**, and hard to maintain as services multiply.
Contract testing sits between: it verifies the **interface agreement** cheaply, without deploying everything together.

## The Contract

The **contract** is the shared agreement: for a given request, what response (structure, fields, types, status) does the consumer expect and the provider promise? Contract tests check that **both sides honor it** — independently, fast, without a live integration.

## Consumer-Driven Contracts (Pact)

The most common approach (tools like **Pact**):
1. The **consumer** defines what it actually needs from the provider (it writes a test using a **mock** of the provider, and that interaction is recorded as a **contract/pact** — "when I send this request, I expect this response shape").
2. That contract is shared with the **provider**.
3. The **provider** runs the contract against its real implementation to **verify** it still satisfies every consumer's expectations.
"Consumer-driven" means the contract reflects what consumers **truly use** (not the provider's full spec) — so the provider knows exactly what it can and can't change without breaking someone. If the provider changes something a consumer depends on, its contract verification **fails** — catching the breaking change **before** deploy, in fast isolated tests.

## Why It's Valuable

- **Fast & reliable** — each side tests independently against the contract; no fragile full-stack setup.
- **Catches breaking API changes early** — the provider learns immediately if a change violates a consumer's expectations.
- **Documents real usage** — the contracts show exactly what each consumer needs.
- **Scales** — works well as the number of services grows, where end-to-end tests become unmanageable.

## Where It Fits

Contract testing complements, not replaces, the test pyramid (see testing-strategy): unit tests for logic, contract tests for service interfaces, a **few** end-to-end tests for critical happy paths. It's especially valuable for internal microservices and public API providers with many consumers.

## Pitfalls (in understanding/using)

- Confusing it with **end-to-end** testing — contract testing checks the **interface agreement**, not full business flows through live systems.
- **Provider not verifying** consumer contracts (only the consumer side runs) → the whole point (catching provider breakage) is lost; both sides must participate.
- **Contracts drifting** from reality — keep them generated from real consumer usage and in CI (see ci-cd-and-automation).
- Testing **too much** in contracts (exact values, unrelated fields) → brittle; assert only what the consumer actually depends on.
- Skipping it and relying only on slow **E2E** tests → flaky, slow feedback that catches breaks late.
- Forgetting **semantic** compatibility (a field's meaning changed but shape didn't) — contracts check structure, not intent.
