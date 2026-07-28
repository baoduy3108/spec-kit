---
name: json-schema-and-validation
description: How to define, document, and enforce the shape of JSON data — JSON Schema. Covers declaring types/required fields/constraints, validating at trust boundaries, why additionalProperties matters, schema composition (allOf/oneOf/$ref), and using one schema to validate, generate code, docs, and forms. Use to understand API request validation, config validation, contract-first design, and common validation pitfalls.
category: databases
keywords_vi: json schema định nghĩa mô tả và ép kiểu dữ liệu json, khai báo kiểu trường bắt buộc và ràng buộc, kiểm định ở ranh giới tin cậy validate boundary, additionalproperties kiểm soát trường thừa, ghép schema allof oneof và tham chiếu ref, một schema dùng để kiểm định sinh mã tài liệu và form
---

# JSON Schema & Validation

JSON is flexible, which is also its danger: any producer can send any shape, and a service that trusts unvalidated JSON is one malformed payload away from a crash or a security hole. **JSON Schema** is a declarative language for describing **what valid JSON looks like** — types, required fields, ranges, patterns — so you can **validate** data at trust boundaries and use one schema as the single source of truth for docs, code generation, and forms (see how-json-serialization-works, api-and-interface-design, avro-and-schema-registry).

## What a Schema Declares

A JSON Schema is itself JSON that constrains a document:
```
{ "type":"object",
  "required":["email","age"],
  "properties":{
    "email":{"type":"string","format":"email"},
    "age":{"type":"integer","minimum":0,"maximum":130},
    "role":{"enum":["user","admin"]} },
  "additionalProperties": false }
```
It expresses **types**, **required** fields, **constraints** (`minimum`, `maxLength`, `pattern`, `format`, `enum`), and how to handle **extra** fields. A validator checks any document against it and reports precisely what failed.

## Validate at the Boundary

The core practice: **validate untrusted input at the edge** — incoming API requests, webhook payloads, config files, message-queue records — **before** your code touches it. This turns "malformed data crashes something deep inside" into a clean, early **400 with a clear error**. It's defense-in-depth: even with typed languages, the JSON crossing the wire is untyped until validated. Validate **inputs** strictly; be more lenient about **outputs** (Postel's law, applied with care).

## `additionalProperties` — the Security-Relevant Knob

By default JSON Schema **allows unknown fields**. Setting `additionalProperties: false` **rejects** any field not in the schema. This matters:
- **Security** — blocks mass-assignment / parameter-pollution (a client sneaking `"isAdmin":true`).
- **Typo detection** — a client sending `"emial"` gets rejected instead of silently ignored.
But it also **tightens compatibility** — adding a field later requires updating the schema. Choose deliberately: strict for security-sensitive inputs, lenient where forward-compatibility matters.

## Composition and Reuse

JSON Schema composes:
- **`$ref`** — reference/reuse sub-schemas (define `Address` once, use it everywhere) — DRY, like types.
- **`allOf`** (must satisfy all — intersection/inheritance), **anyOf** (at least one), **oneOf** (exactly one — great for tagged unions/discriminated types).
- **`if/then/else`** — conditional constraints.
One schema then drives **many artifacts**: request validation, **code generation** (types/models), **API docs** (OpenAPI embeds JSON Schema), and **auto-generated forms/UI** — contract-first development from a single definition.

## Design Guidance (for understanding/using)

- **Validate all untrusted JSON at the boundary** — reject early with clear errors; never trust wire data as typed.
- **Set `additionalProperties: false` for security-sensitive inputs** — stops mass-assignment and catches typos.
- **Reuse with `$ref`, model unions with `oneOf` + a discriminator** — keep schemas DRY and precise.
- **Make the schema the single source of truth** — generate types/docs/forms from it (contract-first), don't hand-maintain parallel copies.
- **Pin the schema `$schema`/draft version** — validators differ across drafts; be explicit.

## Pitfalls (in understanding/using)

- Trusting JSON **without validation** → deep crashes, injection, and mass-assignment vulnerabilities.
- Leaving `additionalProperties` **default (allowed)** on sensitive inputs → unexpected fields (`isAdmin`) and silent typos slip through.
- Confusing **`oneOf`** (exactly one) with **`anyOf`** (at least one) → wrong union semantics.
- Over-strict output validation breaking clients → validate inputs strictly, evolve outputs carefully.
- Maintaining types, docs, and validation **separately** → they drift; generate them from one schema.
