---
name: agent-planning-patterns
description: How LLM agents plan and reason to accomplish multi-step tasks — ReAct (reason+act loops), plan-and-execute, reflection/self-critique, decomposition, and the control loop with tools; plus failure modes (loops, drift) and when agents beat a single prompt. Use to understand agent reasoning, ReAct, planning agents, or building an agent that completes multi-step tasks.
category: ai-agent
keywords_vi: agent planning patterns, agent lập kế hoạch lập luận, react reason act loop, plan and execute, reflection tự phê bình, phân rã nhiệm vụ, vòng điều khiển công cụ, khi nào cần agent
---

# Agent Planning Patterns

An LLM **agent** tackles tasks that need multiple steps and actions — not one prompt→answer, but **reason → act → observe → repeat** until done. The planning/reasoning patterns below are how agents decompose goals, use tools (see llm-function-calling), and self-correct. Understanding them clarifies what agents can (and can't) reliably do (see multi-agent-patterns, tool-design).

## The Core Loop: ReAct

The foundational pattern is **ReAct** (Reason + Act): the agent interleaves **thinking** and **doing** in a loop:
1. **Reason** — think about the goal and what to do next (chain-of-thought).
2. **Act** — take an action (call a tool: search, query, calculate — see llm-function-calling).
3. **Observe** — read the tool's result.
4. **Repeat** — reason about the new information, act again, until the task is complete, then answer.
Interleaving reasoning with real actions lets the agent adapt to what it finds (unlike a fixed script). This loop is the backbone of most tool-using agents.

## Plan-and-Execute

For complex tasks, **plan first, then execute**: the agent creates an explicit **multi-step plan** upfront, then carries out each step (possibly re-planning if reality diverges). Benefits: a coherent overall strategy (vs greedy step-by-step ReAct that can wander), and the plan is inspectable. Trade-off: rigid plans can break when steps fail — so combine with re-planning. Good for tasks with clear structure.

## Decomposition

Break a big goal into **sub-tasks** (see planning-and-task-breakdown, recursive-decomposition), solve each (possibly with sub-agents — see multi-agent-patterns), and combine. Essential for anything non-trivial — LLMs handle a series of focused sub-problems far better than one giant vague task.

## Reflection / Self-Critique

Add a **reflection** step: after producing a result (or a step), the agent **critiques its own work** ("Is this correct? Did I miss anything? Does this actually satisfy the goal?") and revises. This self-correction catches errors and markedly improves quality on hard tasks — the model reviewing its output often spots what it got wrong the first time (see verification-before-completion). Costs extra calls; worth it for quality-critical work.

## The Control Loop & Guardrails

An agent runs in a loop your code controls: you cap **max iterations** (prevent infinite loops), track state/history, validate each tool call (see prompt-injection-defense), and detect being **stuck** (no progress). The LLM decides *what* to do; your harness enforces limits and safety.

## When to Use an Agent (and Not)

- **Use** — genuinely multi-step tasks needing tools, adaptation, or exploration (research, complex Q&A over tools, workflows).
- **Don't** — tasks a single well-crafted prompt (or simple RAG) handles. Agents add latency, cost, complexity, and failure modes; **agentic loops are overkill for simple tasks** (see anti-over-engineering). Reach for the simplest thing that works.

## Pitfalls (in understanding/using)

- **Runaway loops** — the agent iterating without converging (repeating actions, no progress); cap iterations, detect stagnation.
- **Drift / losing the goal** over many steps — keep the objective in context; re-anchor.
- **Over-agentifying** simple tasks → slow, costly, brittle vs a single prompt/RAG.
- **Compounding errors** — a mistake early cascades; add reflection/verification and validate steps.
- **Unvalidated tool calls** → injection/damage (see llm-function-calling, prompt-injection-defense).
- **No iteration cap / cost control** — agents can rack up many expensive calls (see llm-cost-and-latency-optimization).
- Expecting reliable **long-horizon autonomy** — current agents are best on bounded, verifiable, few-step tasks; the longer/vaguer the task, the more they fail.
