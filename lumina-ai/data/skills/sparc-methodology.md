---
name: sparc-methodology
description: The SPARC development methodology — a five-phase flow (Specification → Pseudocode → Architecture → Refinement → Completion) with a quality gate between phases, forcing you to specify and design before coding and to verify before declaring done. Use for structured feature/system development when you want rigor from requirements through delivery.
category: ai-agent
keywords_vi: sparc, quy trình phát triển 5 pha, specification pseudocode architecture refinement completion, quality gate, thiết kế trước khi code, phương pháp phát triển có kiểm soát
---

# SPARC Methodology

SPARC is a structured, phase-gated way to build software: think and design deliberately *before* coding, and verify *before* calling it done. The five phases each have a clear output and a gate you must pass to proceed.

## The Five Phases

1. **Specification** — clarify *what* and *why* before anything else: the problem, goals and non-goals, requirements, constraints, and acceptance criteria. Ambiguity resolved here is a bug not written later. Gate: is the spec clear and agreed, with testable success criteria?
2. **Pseudocode** — sketch the *logic* in plain language/steps before real code: the algorithm, data flow, edge cases, and the tests you'll need. This exposes flawed thinking cheaply, on paper, not in a debugger. Gate: does the logic hold up against the edge cases?
3. **Architecture** — decide *structure*: components, interfaces/contracts, data model, dependencies, and how pieces fit (see clean-architecture, system-design-fundamentals). Design the seams before filling them in. Gate: does the architecture satisfy the spec and handle the non-functional requirements (scale, security)?
4. **Refinement** — *implement iteratively*, in small verified increments (see incremental-implementation / TDD), improving as you learn. Not a single big-bang build — write, test, refine. Gate: does each increment pass its tests and meet the spec?
5. **Completion** — *finish for real*: full verification (all tests green — see verification-before-completion), documentation, and a check against every acceptance criterion from phase 1. Gate: is it genuinely done, evidenced, and handed over?

## The Point: Gates Prevent Rework

The discipline is the **quality gate between phases** — you don't jump to code before the spec and design are sound, and you don't declare "done" without evidence. Most project pain comes from skipping straight from a vague idea to code, then discovering the requirements or design were wrong deep into implementation (the most expensive place to find out). SPARC front-loads the cheap thinking.

## Applying It Pragmatically

Match the ceremony to the stakes. A tiny change doesn't need five formal phases — but even then, spending 30 seconds on "what exactly am I doing and how will I know it works?" is SPARC in miniature. For a substantial feature or system, the full flow pays off. The phases can loop (refinement reveals a spec gap → revisit).

## Pitfalls

- **Skipping specification** → building the wrong thing correctly.
- **Coding before architecture** → a structure you must tear out later.
- **No gates** → phases blur, unclear thinking flows into code.
- **Big-bang refinement** instead of small verified increments → hard-to-debug integration at the end.
- **Declaring done without verification** → "done" that isn't (see verification-before-completion).
- **Over-formalizing** trivial work — scale the rigor to the risk.
