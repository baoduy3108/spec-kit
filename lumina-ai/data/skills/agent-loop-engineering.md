---
name: agent-loop-engineering
description: Agent loop engineering — designing the control loop that repeatedly prompts and coordinates AI agents over time instead of one-off prompting. Covers loop patterns (plan-act-observe, critic/reviewer, budget-guarded, scheduled), stopping conditions, cost/step budgets, state between iterations, and auditing loops. Use when building an autonomous agent loop, an orchestration control system, a self-checking iteration, or a scheduled agent that runs repeatedly.
category: ai-agent
keywords_vi: kỹ thuật vòng lặp agent, thiết kế vòng điều khiển lặp lại cho agent, plan act observe, vòng lặp có bộ phê bình reviewer, ngân sách bước và chi phí cho vòng lặp, điều kiện dừng vòng lặp, trạng thái giữa các vòng, agent chạy lặp theo lịch, kiểm toán vòng lặp agent
---

# Agent Loop Engineering

Most agent work isn't one prompt — it's a **loop**: the agent acts, observes the result, and decides the next step, repeatedly, until done. **Loop engineering** is designing that control loop deliberately — its steps, budgets, stopping conditions, and guardrails — instead of leaving it to a naive "keep calling the model" while-loop (see ai-agent-architecture, prompting-coding-agents, llm-fallback-and-reliability).

## Why the Loop Is the System

- A single prompt is stateless; real tasks need **iteration** — try, check, correct.
- The loop is where **cost, safety, and reliability** are actually controlled. A bad loop burns money, spins forever, or drifts off task.
- Treat the loop as a **designed control system**, not an afterthought: explicit states, transitions, and exit criteria.

## Core Loop Patterns

- **Plan → Act → Observe** — the agent plans a step, executes a tool, observes the result, and re-plans. The backbone of most agent loops.
- **Critic / Reviewer loop** — a second pass (or second agent) reviews the output against a rubric and sends it back for revision until it passes (see requesting-code-review). Improves quality, costs extra turns.
- **Budget-guarded loop** — every iteration decrements a **step/token/time/cost budget**; hitting zero forces a stop with the best result so far (see llm-cost-and-latency-optimization).
- **Scheduled / recurring loop** — the agent runs on a timer (cron), each firing a fresh iteration over changing state (a queue, a feed, a repo). Needs idempotency and change detection.
- **Escalation loop** — try a cheap model/approach first; escalate to a stronger one only if the cheap attempt fails a check.

## Stopping Conditions (the most important part)

A loop without a solid exit is a bug. Combine several:
- **Goal met** — an explicit success check passes (tests green, metric hit, validator OK).
- **Budget exhausted** — max steps/tokens/time/cost reached.
- **No progress** — the same error or state repeats N times → stop (don't spin).
- **Human gate** — pause for approval on risky/irreversible actions.
Always return the **best partial result** and a clear reason for stopping, never a silent hang.

## State Between Iterations

- Carry forward a **compact working state** (goal, plan, what's been tried, key findings) — not the whole raw history (see context-engineering). Summarize/prune each turn to fit the window.
- Make steps **idempotent** where possible so a retry doesn't double-apply side effects.
- Persist state for **scheduled loops** so a later run continues rather than restarts.

## Observability & Auditing

- **Log every iteration** — the decision, tool call, result, cost, and why it continued or stopped. A loop you can't audit, you can't trust or debug.
- Track **cost per run** and **steps-to-completion** as health metrics; alert on runaway loops.
- **Kill switch** — a way to halt a misbehaving loop immediately.

Engineer agent loops as **deliberate control systems**: pick a pattern (plan-act-observe, critic, budget-guarded, scheduled), enforce **multiple stopping conditions** (goal, budget, no-progress, human gate), carry a **compact idempotent state** between iterations, and **log/audit every step** with a kill switch. The loop — not the single prompt — is where an agent becomes reliable, affordable, and safe.
