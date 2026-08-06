---
name: openapi-and-api-contracts
description: How OpenAPI and API contracts work — a machine-readable specification of an API's endpoints, inputs, and outputs that serves as a single source of truth for docs, client/server codegen, validation, and mocking, plus contract-first design. Use to understand OpenAPI/Swagger, API contracts, contract-first design, API codegen, or spec-driven APIs.
category: engineering
keywords_vi: openapi, swagger, hợp đồng api, contract-first, sinh code client server, đặc tả máy đọc được endpoint, nguồn sự thật duy nhất docs mock, api contract
---

# OpenAPI and API Contracts

An **API contract** is a **machine-readable specification** of exactly what an API offers — its endpoints, request/response shapes, parameters, status codes, and auth. **OpenAPI** (formerly Swagger) is the dominant standard for describing REST APIs this way. The power of a contract is that it's a **single source of truth** many tools consume: documentation, code generation, validation, testing, and mocking all derive from the same spec (see rest-api-design-principles, data-contracts-and-schema-evolution).

## The Problem: The API's "Truth" Is Scattered

Without a contract, an API's behavior lives in **code, someone's head, and out-of-date docs** — and they disagree. Frontend and backend teams guess at each other's shapes; docs drift from reality; clients break on undocumented changes. You want **one authoritative, machine-readable definition** that everyone and every tool agrees on.

## OpenAPI: The Machine-Readable Spec

An **OpenAPI document** (YAML/JSON) formally describes the API:
- **Paths/endpoints** — `/users/{id}`, and which methods they support.
- **Parameters** — path/query/header params, types, required-ness.
- **Request/response schemas** — the exact shape of bodies (via JSON Schema), per status code.
- **Auth** — security schemes.
- **Metadata** — descriptions, examples.
Because it's structured data (not prose), **tools** can read it.

## What the Contract Unlocks (one spec, many tools)

The single source of truth drives an ecosystem:
- **Documentation** — auto-generate interactive API docs (Swagger UI / Redoc) that are always in sync with the spec.
- **Code generation** — generate **client SDKs** (in many languages) and **server stubs** from the spec, so nobody hand-writes boilerplate or gets shapes wrong.
- **Request/response validation** — validate incoming requests and outgoing responses **against** the spec automatically (a gateway or middleware rejects non-conforming traffic).
- **Mock servers** — spin up a fake API from the spec so frontend can develop **before** the backend exists.
- **Contract testing** — verify the implementation actually matches the spec (see contract-testing).
Change the spec → all of these update from one place.

## Contract-First (design-first) vs Code-First

Two workflows:
- **Contract-first (design-first)** — write the **OpenAPI spec first**, agree on it across teams, then generate stubs/clients and implement to match. Great for **parallel** frontend/backend work (both code against the agreed contract), and forces deliberate API design up front.
- **Code-first** — write the code with annotations and **generate** the spec from it. Less upfront design; the spec can lag or leak implementation details, but lower ceremony.
Contract-first is powerful for teams and public APIs (the contract is the agreement); code-first is convenient for small/internal APIs.

## Design Guidance

- **Maintain an OpenAPI spec** as the single source of truth for the API.
- **Consider contract-first** for multi-team/public APIs — agree on the contract, then implement to it (parallel work, deliberate design).
- **Generate** docs, clients, and server stubs from the spec — don't hand-maintain them.
- **Validate** requests/responses against the spec (catch drift automatically).
- **Version the spec** alongside the API (see api-versioning-strategies).
- **Keep the spec in sync** — a stale contract is worse than none; make it part of CI (fail if code and spec diverge — see contract-testing).
- **Mock from the spec** to unblock frontend development.

## Pitfalls (in understanding/using)

- **Spec drifts from reality** (docs say one thing, API does another) → worse than no contract; enforce sync in CI.
- **Code-first** specs that leak implementation details or lag the code.
- Hand-writing **clients/docs** instead of generating them → boilerplate and mismatches.
- Not **validating** against the spec → the contract is decorative, not enforced.
- Treating the spec as **write-once** → it must evolve with the API and stay authoritative.
- Over-detailed or **inconsistent** schemas → hard-to-use generated clients.
- Forgetting the contract is also a **compatibility** tool — check changes for breaking-ness (see api-versioning-strategies).
