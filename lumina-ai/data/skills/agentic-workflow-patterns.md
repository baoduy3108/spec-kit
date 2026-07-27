---
name: agentic-workflow-patterns
description: The building-block patterns for LLM applications — prompt chaining, routing, parallelization (sectioning/voting), orchestrator-workers, and evaluator-optimizer loops — plus when a predictable "workflow" (fixed code paths) beats a fully autonomous "agent" (the model decides its own steps). Emphasizes starting simple and adding agency only when it earns its cost. Use to design an LLM/agent pipeline, choose a workflow pattern, or decide workflow vs agent.
category: ai-agent
keywords_vi: mẫu workflow agent, prompt chaining nối chuỗi bước, routing định tuyến theo loại, parallelization song song bỏ phiếu, orchestrator workers điều phối, evaluator optimizer vòng lặp cải thiện, workflow hay agent tự chủ
---

# Agentic Workflow Patterns

Most "AI agent" needs are met not by a fully autonomous agent but by **composable workflow patterns** — predictable structures where LLM calls are wired together with code. The key distinction: a **workflow** has **fixed code paths** orchestrating LLM steps (predictable, testable, cheap); an **agent** lets the **model dynamically decide** its own steps and tool use (flexible, but costlier and less predictable). Start with the simplest thing that works and add autonomy only when the task truly needs it (see agent-planning-patterns, multi-agent-patterns, prompt-engineering).

## The Five Building Blocks

**1. Prompt chaining** — decompose a task into a **fixed sequence** of LLM calls, each using the previous output (draft → critique → revise). Add a **gate/check** between steps to catch failures early. Best when the task splits cleanly into ordered subtasks; trades latency for accuracy.

**2. Routing** — a first LLM (or classifier) **classifies** the input and sends it to a **specialized** prompt/model/tool (billing question → billing flow; code → code prompt; simple → cheap model). Separates concerns and lets you use cheaper models for easy cases.

**3. Parallelization** — run LLM calls **concurrently** and aggregate:
- *Sectioning* — split a task into independent subtasks run in parallel (analyze 10 files at once), then combine.
- *Voting* — run the **same** prompt several times and take a majority/threshold (self-consistency) to raise reliability.

**4. Orchestrator-workers** — a central **orchestrator LLM** dynamically **breaks a task into subtasks**, dispatches them to **worker** LLMs, and synthesizes results. Unlike fixed parallelization, the subtasks aren't known in advance — good for complex tasks whose shape depends on the input (e.g. "change X across an unknown set of files").

**5. Evaluator-optimizer** — one LLM **generates**, another **evaluates/critiques** against criteria, and the generator **revises** in a loop until the evaluator is satisfied. Best when you have clear evaluation criteria and iteration measurably helps (translation, complex writing, code that must pass checks).

## Workflow vs Agent

- **Workflow** (fixed paths) — predictable, cheaper, easier to test/debug. Use for well-understood tasks.
- **Agent** (model-driven loop with tools) — handles open-ended tasks where steps can't be predicted, at the cost of latency, tokens, and less predictability. Use when flexibility is genuinely required.
Guiding principle: **don't add agency/complexity that doesn't earn its keep** — many production wins are a single well-crafted prompt or a small workflow, not an autonomous agent.

## Design Guidance

- **Start simple** — one prompt → workflow → agent, escalating only when needed.
- **Prompt chaining** for clean sequential subtasks; add gates between steps.
- **Routing** to specialize and to send easy inputs to cheap models.
- **Parallelize** independent subtasks (sectioning) or vote for reliability.
- **Orchestrator-workers** when subtasks are dynamic/unknown up front.
- **Evaluator-optimizer** when you have clear criteria and iteration helps.
- **Make steps observable & testable** (see agent-observability-and-tracing).

## Pitfalls (in understanding/using)

- Reaching for an **autonomous agent** when a **workflow** (or one prompt) suffices → cost, latency, flakiness.
- **Prompt chaining** without gates → a bad early step corrupts the whole chain silently.
- **Parallel voting** without independence → correlated errors don't cancel.
- **Orchestrator-workers** for a **fixed** decomposition → unnecessary; use plain parallelization.
- Endless **evaluator-optimizer** loops with vague criteria → burns tokens, never "done".
- Not measuring whether added **agency** improves outcomes vs a simpler pipeline.
