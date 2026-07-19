---
name: living-documentation
description: How to keep documentation alive and trustworthy — docs that stay in sync with the system via automation, co-location with code, generation from source, executable specs/tests as docs, and treating docs-as-code; plus why stale docs are worse than none. Use to keep docs up to date, prevent documentation rot, docs-as-code, or making specs/docs a reliable source of truth.
category: engineering
keywords_vi: living documentation, tài liệu sống luôn cập nhật, đồng bộ với hệ thống tự động, đặt cạnh code, sinh từ nguồn, spec test làm tài liệu, docs-as-code, tài liệu lỗi thời tệ hơn không có
---

# Living Documentation

"Living documentation" is documentation that **stays accurate as the system changes** — as opposed to the usual fate of docs: written once, then rotting into misleading uselessness. Keeping docs alive matters especially when docs/specs are the **source of truth** driving development (see writing-executable-specifications, intent-driven-development) — a stale source of truth is a lie that misleads everyone.

## The Problem: Docs Rot

Documentation naturally **drifts** from reality: the system changes, the docs don't, and over time they become **wrong**. And **wrong docs are worse than no docs** — no docs makes you check the code; wrong docs make you confidently do the wrong thing (see technical-writing). The reason docs rot is that updating them is separate, manual, easily-skipped work that falls behind under deadline pressure. Living documentation attacks this by **coupling docs to the system** so they can't drift as easily.

## Strategies to Keep Docs Alive

- **Docs-as-code** — keep docs **in the repo, next to the code**, versioned and reviewed in the same pull requests (see git-workflow-and-versioning). A change and its doc update travel together and are reviewed together, so drift is caught in review. Co-location + review is the foundation.
- **Generate from source** — derive docs from the code/config where possible: API docs from the code/schema (OpenAPI — see api-and-interface-design), type docs from types, config docs from the config definition. Generated docs **can't** drift because they *are* the source. Automate the generation in CI (see ci-cd-and-automation).
- **Tests/specs as documentation** — executable specs and tests describe behavior **and are verified to be true** (a passing test is a doc that can't lie about behavior — see test-driven-development, writing-executable-specifications). Acceptance criteria double as living behavioral docs.
- **Automate checks** — CI that fails when docs are out of date (broken links, examples that don't run, generated docs not regenerated) — so drift is caught automatically.
- **Single source of truth** — document each thing **once**, in one authoritative place, and reference it — duplicated docs drift independently (see the DRY idea).

## Keep It Current by Design

The meta-principle: make keeping docs updated the **path of least resistance** rather than extra work. Co-locate, generate, test, and review docs **with** the code so updating them is part of the change, not a separate chore that gets skipped. If keeping a doc current is manual and detached, it **will** rot — so either automate its currency or question whether it should exist.

## What to Document (and Not)

Living documentation is easier to sustain if you're **selective**: document the **stable, high-value** things (architecture/why — see documentation-and-adrs, public APIs, how to run/build, key decisions and their rationale) and avoid documenting **volatile implementation detail** that changes constantly (that's what the code is for, and it'll rot fastest). Prefer generated/tested docs for anything that changes.

## Pitfalls (in understanding/using)

- **Stale docs** presented as current — worse than none; they mislead confidently. Keep them alive or remove them.
- **Detached, manual** docs (separate from code, updated by hand) → guaranteed drift; co-locate and review with code.
- **Not generating** docs derivable from source (hand-maintaining API/config/type docs that fall behind).
- Documenting **volatile implementation detail** that rots immediately (the code is that doc).
- **Duplicated** docs that drift apart — single source of truth, reference it.
- Docs whose **examples don't run** / links break (automate checks in CI).
- Treating docs as a **one-time** deliverable rather than an ongoing, coupled-to-code practice.
- Over-documenting (burdensome to maintain) — be selective; sustainable beats comprehensive-but-rotting.
