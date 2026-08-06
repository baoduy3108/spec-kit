---
name: technical-planning-from-specs
description: How to turn a spec into a technical implementation plan — choosing architecture and tech, mapping requirements to components, sequencing, addressing non-functionals and risks, and keeping the plan traceable to the spec and constitution. Use to create a technical plan from requirements, translate a spec into an implementation approach, or the /plan step of spec-driven development.
category: engineering
keywords_vi: technical planning, kế hoạch kỹ thuật, kiến trúc từ đặc tả, planning from specs, chọn công nghệ, ánh xạ yêu cầu sang thành phần, non-functional rủi ro, truy vết về spec
---

# Technical Planning from Specs

Once a spec defines **what** to build (see writing-executable-specifications), the technical plan defines **how**: the architecture, technologies, components, and approach to realize it. This is the bridge from intent to implementation (spec-kit's `/plan`), and it's where technical judgment lives — the spec is deliberately how-agnostic, so the plan makes the engineering decisions.

## What a Plan Covers

- **Architecture** — the overall structure: components/modules, their responsibilities and boundaries, how they interact (see codebase-design, clean-architecture, system-design-fundamentals). How the pieces fit.
- **Technology choices** — languages, frameworks, databases, services — chosen to fit the requirements **and the constitution's constraints** (see writing-a-project-constitution). Justify choices against needs, not fashion.
- **Requirement → component mapping** — trace each spec requirement to where/how it's satisfied. Every requirement should have a home; every component should trace to a requirement (no gold-plating).
- **Data model & interfaces** — schemas, APIs, contracts (see database-schema-design, api-and-interface-design).
- **Non-functionals** — how the plan meets performance, security, scale, and reliability requirements (see security-and-hardening, capacity-planning) — often the hard part the spec only states as targets.
- **Sequencing & dependencies** — the order to build things (foundations first), enabling the task breakdown (see task-decomposition-for-implementation).
- **Risks & unknowns** — technical risks, spikes needed, and mitigation (see project-risk-management).

## Keep It Traceable & Conformant

- **Trace to the spec** — the plan must satisfy **all** the spec's requirements (nothing missed) and shouldn't add scope the spec doesn't call for (no over-engineering — see below).
- **Conform to the constitution** — honor the project's principles and constraints; the plan is where they get applied to real decisions.
- **Right-size it** — enough detail to guide implementation and task breakdown, not so much it becomes a second implementation. Match plan depth to the work's size and risk (small feature = light plan; complex system = thorough plan).

## Guard Against Over-Engineering

A crucial check (especially with eager AI agents — see preventing-agent-over-engineering): plans tend to accrete unnecessary complexity, abstraction, and "just in case" features. Before finalizing, **cross-check for over-engineering** — is every component/abstraction/technology **justified** by an actual requirement? Cut speculative generality (see anti-over-engineering, YAGNI). The simplest plan that meets the spec (and constitution) wins.

## Validate the Plan

Review the plan **before** building (see reviewing-ai-generated-code for the agent case): does it fully cover the spec? Conform to the constitution? Contain over-engineered or unjustified parts? Have unaddressed risks? Catching plan problems now is far cheaper than after implementation.

## Pitfalls (in understanding/using)

- **Missing requirements** — the plan doesn't cover part of the spec → gaps discovered during/after implementation.
- **Over-engineering** — speculative components/abstractions/tech not justified by the spec (a top AI-agent failure); cut to the simplest sufficient design.
- **Ignoring the constitution's constraints** in technical decisions.
- **Untraceable** — components with no requirement (gold-plating) or requirements with no home (gaps).
- **Under-addressing non-functionals** (security/perf/scale) that the spec required as targets but the plan doesn't concretely meet.
- **Too much or too little detail** for the work's size/risk.
- **Not validating** the plan before building — carrying flaws into expensive implementation.
- Choosing tech by **fashion** rather than fit to requirements/constraints.
