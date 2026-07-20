---
name: data-contracts-and-schema-evolution
description: How data contracts and schema evolution work — treating the schema/semantics of shared data as an explicit, versioned agreement between producers and consumers, backward/forward compatibility rules, and preventing silent breakage in pipelines. Use to understand data contracts, schema evolution, backward-compatible changes, preventing pipeline breakage, or producer-consumer data agreements.
category: engineering
keywords_vi: data contract, schema evolution, tương thích ngược, thỏa thuận producer consumer, schema là hợp đồng có phiên bản, chống vỡ pipeline âm thầm, breaking change dữ liệu
---

# Data Contracts and Schema Evolution

In data systems, a **producer** emits data (events, tables) that many **consumers** (pipelines, dashboards, models) depend on. When the producer changes the data's shape or meaning **without warning**, it **silently breaks** everything downstream. **Data contracts** make the schema and semantics an **explicit, versioned agreement**, and **schema evolution** rules define what changes are safe (see data-pipelines-etl, delivery-semantics).

## The Problem: Silent Breakage

Downstream consumers build on the **structure and meaning** of upstream data. But upstream teams change things — rename a column, change a unit (dollars → cents), drop a field, alter what a status value means — often **unaware** of who depends on it. The result: pipelines fail, or worse, keep running and produce **wrong** numbers (the dangerous silent kind). Data is an **interface**, but historically an **undocumented, unenforced** one. That's the gap data contracts close.

## The Core Idea: Data as a Versioned Contract

A **data contract** treats a dataset/event like an **API**: an explicit agreement between producer and consumer specifying:
- **Schema** — field names, types, nullability, structure.
- **Semantics** — what each field *means*, units, allowed values, invariants.
- **Guarantees** — freshness/SLA, quality expectations, ownership.
- **Change policy** — how changes are versioned and communicated.
Once explicit, the contract can be **enforced** (validated in CI/at write time) and **versioned**, so producers can't unknowingly break consumers, and changes are deliberate.

## Schema Evolution: Which Changes Are Safe

Schemas *must* change over time; the question is doing it **compatibly**. Compatibility types (from schema registries like Avro/Protobuf):
- **Backward-compatible** — new **consumers** can read **old** data. Safe changes: **adding an optional field** (with a default), **removing a field readers can ignore**. Consumers upgrade first.
- **Forward-compatible** — old **consumers** can read **new** data. Safe: adding fields old readers ignore. Producers upgrade first.
- **Full compatibility** — both directions.
- **Breaking changes** — renaming a field, changing a type, removing a required field, changing units/meaning. These require **versioning** and a coordinated migration, never a silent in-place change.
The golden rules: **additive, optional changes are safe; renames/type-changes/semantic-changes are breaking.** Never **repurpose** an existing field's meaning (the worst silent break).

## Enforcement Mechanisms

- **Schema registry** (Confluent/Avro/Protobuf) — validates that new schemas are compatible before they're allowed; consumers fetch schemas to deserialize.
- **Contract tests in CI** — fail the producer's build if a change violates the contract.
- **Validation at ingestion** — reject or quarantine data that doesn't match the contract (feeds a DLQ — see dead-letter-queues).
- **Ownership & discovery** — a catalog so consumers are known and notified.

## Design Guidance

- **Make schemas explicit and versioned** — treat shared data like a public API.
- **Prefer additive, optional changes**; give new fields **defaults**.
- **Never rename or repurpose** a field in place — add a new one and deprecate the old.
- **Choose a compatibility mode** (backward is common) and enforce it with a registry/CI.
- **Version breaking changes** and migrate consumers deliberately (like API versioning — see deprecation-and-migration).
- **Validate at boundaries** — catch bad/contract-violating data early, quarantine it.
- **Assign ownership** — someone is responsible for each dataset's contract.

## Pitfalls (in understanding/using)

- Changing schemas **in place** without a contract → silent downstream breakage or wrong results.
- **Repurposing** a field's meaning/units → the most dangerous silent break (data looks fine, is wrong).
- Renaming/type-changing fields as if **safe** → they're breaking; version them.
- New **required** fields with no default → breaks old data/consumers.
- No **enforcement** (registry/CI) → contracts become docs everyone ignores.
- Not knowing **who consumes** the data → can't assess the blast radius of a change.
- Treating data pipelines as **private** when their outputs are a de-facto public interface.
