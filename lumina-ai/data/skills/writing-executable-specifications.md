---
name: writing-executable-specifications
description: How to write specifications precise and complete enough to generate implementations — focusing on what and why (not how), user scenarios and acceptance criteria, removing ambiguity, and making specs the source of truth. Use to write a spec for a feature, an executable specification for AI-driven development, or requirements precise enough to build (or generate) from.
category: engineering
keywords_vi: executable specification, viết đặc tả spec, what và why không phải how, acceptance criteria, kịch bản người dùng, loại bỏ mơ hồ, spec nguồn sự thật
---

# Writing Executable Specifications

In spec-driven development (see spec-driven-development), the **specification** — not the code — is the primary artifact: a precise description of **what** to build and **why**, complete enough that an implementation (increasingly, an AI-generated one) can be produced from it. Writing such specs well is the core skill, because the spec becomes the **source of truth** that drives everything downstream.

## What, Not How

The cardinal rule: a spec describes **what** the system should do and **why** — the requirements, behavior, and outcomes — **not how** to implement it (that's the plan's job — see technical-planning-from-specs). Mixing implementation into the spec prematurely constrains solutions and couples the "what" to a "how" that may change. Keep the spec at the level of **intent and behavior** (see intent-driven-development): the problem, the user needs, the required behavior — leaving the technical *how* to planning.

## Make It Precise and Complete

The value (and difficulty) of an executable spec is **removing ambiguity**. A human implementer fills gaps with judgment/assumptions; a precise spec (and an AI agent) needs the gaps closed:
- **User scenarios / stories** — concrete descriptions of who does what and what happens, covering the **main flows and edge cases** (what happens when input is invalid? empty? at limits?).
- **Acceptance criteria** — testable conditions defining "done" for each requirement ("given X, when Y, then Z"). These make the spec verifiable and double as test cases (see test-driven-development).
- **Explicit behavior** for edge cases, errors, and boundaries — the places under-specified specs go wrong.
- **Constraints and non-functionals** — performance, security, accessibility requirements (within the constitution — see writing-a-project-constitution).
The goal: someone (or something) could build the right thing from the spec **without guessing**.

## Surface and Resolve Ambiguity

You can't remove all ambiguity in one pass — so **flag** unknowns explicitly (mark under-specified areas rather than silently assuming) and resolve them before planning/building (see spec-clarification-and-ambiguity-resolution). An honest "this is undecided" beats a hidden assumption that produces the wrong thing.

## The Spec as Source of Truth

Because plans, tasks, and implementation flow **from** the spec, it must be **kept current** — when requirements change, change the **spec first**, then propagate. If code diverges from the spec, the spec (the intent) governs — update code to match, or consciously update the spec. A stale spec breaks the whole model (the source of truth lies).

## Pitfalls (in understanding/using)

- **Mixing in implementation** ("how") — over-constrains solutions; keep specs to what/why.
- **Vague/ambiguous** requirements → wrong builds; a human guesses, an AI agent guesses worse. Be precise, cover edge cases.
- **Missing acceptance criteria** — no testable definition of "done" → unverifiable, disputable.
- **Silent assumptions** for unknowns instead of flagging them (see spec-clarification-and-ambiguity-resolution).
- **Only the happy path** — under-specifying errors/edge cases/boundaries (where bugs live).
- **Stale spec** — letting code drift from the spec so the "source of truth" lies.
- Over-specifying trivial detail while under-specifying the hard/ambiguous parts.
- Forgetting the spec serves **communication and generation** — write it for the reader/agent, clearly.
