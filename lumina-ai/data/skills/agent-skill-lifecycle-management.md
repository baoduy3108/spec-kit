---
name: agent-skill-lifecycle-management
description: Managing the lifecycle of an AI agent's skill library at scale — evaluating each skill by real task outcomes (not descriptions), evolving skills under control (fix/derive/capture with validation before promotion), a local-first skill hub for discovery, and a harness that records execution evidence. Use to manage a large skill library, evaluate skill quality, evolve skills safely, or build a self-improving agent.
category: ai-agent
keywords_vi: vòng đời kỹ năng agent, đánh giá chất lượng skill theo kết quả thực tế, tiến hóa skill có kiểm soát, skill hub local-first, quản lý thư viện kỹ năng lớn, agent tự cải thiện, ghi bằng chứng thực thi
---

# Agent Skill Lifecycle Management

When an AI agent's **skill library grows large**, two problems appear that a flat pile of skill documents can't solve: **which skill to pick** for a task, and **whether a skill actually works**. Selection gets noisy (many skills sound relevant); quality is invisible (a skill's description says nothing about whether it reliably *completes* real tasks). Managing the **lifecycle** of skills — evaluate, evolve, organize, record — turns a static library into one that improves with use (see multi-agent-patterns, context-engineering, memory-systems).

## The Core Problem: Descriptions Lie, Outcomes Don't

A skill's frontmatter describes what it *claims* to do. But the only trustworthy signal of quality is **what happened when the agent used it**: was it selected, applied, did the task **complete**, or did the agent **fall back** to something else? Lifecycle management treats **real task outcomes as the evidence** — not the skill's own description — creating a feedback loop where experience improves future selection.

## Four Layers

**1. Quality evaluation.** Track outcomes per skill across real tasks: selection rate, application success, completion, fallback frequency. A skill that's often selected but rarely completes tasks is *low quality* regardless of how good its description reads. This turns "quality" from a guess into a measured property.

**2. Controlled evolution.** Skills improve through **structured, validated changes**, not ad-hoc edits:
- **FIX** — repair a skill that's failing on observed cases.
- **DERIVED** — spin a new specialized skill off an existing one for a recurring sub-case.
- **CAPTURED** — turn a successful ad-hoc solution into a reusable skill.
Every change is **validated before promotion** from *provisional* → *trusted*. Unproven skills stay quarantined so a bad edit can't silently degrade the agent.

**3. Local-first skill hub.** Organize shared/cloud skills into **discoverable packages**, but keep **execution local** — skills are **explicitly imported** before reuse, so the agent's active set is deliberate and auditable, not an uncontrolled global namespace.

**4. Quality-recording harness.** Run the agent in a way that **captures execution evidence** (what was tried, what worked) as structured records — the raw material that feeds evaluation and evolution back at layer 1.

## Why It Works

- **Evidence over claims** — quality is measured from outcomes, so the library reflects reality.
- **Safe improvement** — validation gates + provisional/trusted tiers prevent regressions.
- **Scales selection** — a curated, quality-scored, explicitly-imported set beats a giant flat pile.
- **Closes the loop** — the harness → evaluation → evolution cycle makes the agent genuinely self-improving.

## Design Guidance

- **Instrument outcomes** — record select/apply/complete/fallback per skill; that's your quality signal.
- **Gate evolution** — validate every FIX/DERIVED/CAPTURED change on held-out cases before trusting it.
- **Tier skills** — provisional vs trusted; only trusted ones are auto-applied.
- **Import explicitly** — keep the active skill set deliberate and local, not a global grab-bag.
- **Keep the loop running** — evidence feeds evaluation feeds controlled evolution.

## Pitfalls (in understanding/using)

- Judging skills by **descriptions** instead of outcomes → high-sounding, low-performing skills survive.
- **Uncontrolled edits** → a well-meaning change silently breaks a skill; gate and validate.
- Promoting to *trusted* **without validation** → regressions leak into production.
- A **flat global** skill set → selection noise; curate and import explicitly.
- Recording nothing → no evidence, so no evaluation and no real evolution.
- Confusing **evolution** (validated, tiered) with **churn** (random rewrites).
