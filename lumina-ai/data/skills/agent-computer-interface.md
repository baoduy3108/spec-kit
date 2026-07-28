---
name: agent-computer-interface
description: Why tools built for HUMANS often fail LLM agents, and how to design an Agent-Computer Interface (ACI) — the action/observation surface tuned for models. Covers concise, model-friendly tool outputs, guardrails that prevent common agent mistakes, feedback on every action, and why small ACI changes can outperform a smarter model. Use to design agent tools/action spaces that agents actually use well.
category: ai-ml-internals
keywords_vi: giao diện agent-máy tính aci thiết kế bộ công cụ và quan sát cho model không phải cho người, công cụ dành cho con người thường làm agent thất bại, đầu ra công cụ ngắn gọn thân thiện model, lan can guardrail chặn lỗi agent thường gặp, phản hồi sau mỗi hành động, cải thiện aci hơn cả đổi model thông minh hơn
---

# Agent-Computer Interface (ACI)

A powerful insight from building coding agents (SWE-agent, OpenHands): **the interface between the agent and the computer matters as much as the model.** Humans use editors, shells, and search tools designed for *human* perception and habits. An LLM agent perceives only **text**, has a limited context window, can't scroll or glance, and makes systematic mistakes. Feeding it human tools verbatim wastes its ability. The **Agent-Computer Interface (ACI)** is the deliberately-designed action/observation surface tuned **for the model** — and improving it often beats swapping in a bigger model (see coding-agent-architecture, tool-design, agent-file-editing-and-diffs).

## Why Human Tools Fail Agents

- **Verbose output** — a raw command dumping 10,000 lines blows the context window and buries the signal. Humans scroll; the agent just drowns.
- **No spatial perception** — a human sees a file's structure at a glance; the agent sees a flat stream and loses track of line numbers/positions.
- **Silent success/failure** — a tool that "just works" for a human gives the agent no confirmation, so it can't tell if its action landed.
- **Fuzzy, powerful commands** — a Swiss-army tool with 40 flags invites the agent to misuse it; the failure modes are subtle.

## Principles of a Good ACI

- **Concise, structured observations** — tools should return **compact, relevant** output (paginated file views with line numbers, a diff instead of the whole file, an error summary), not raw firehoses. Cap output length.
- **Feedback on every action** — after an edit, **show the result** (the applied diff, "3 lines changed", a lint error) so the agent grounds its next step. After a command, return exit code + trimmed output.
- **Guardrails that prevent common mistakes** — e.g. an edit tool that **rejects** an edit that doesn't apply cleanly (instead of silently corrupting), or that lints the result and reports errors. Catch the agent's typical errors at the tool boundary and hand back a clear, correctable message.
- **Few, well-specified actions** — a **small** action space with crisp semantics beats many overlapping fuzzy tools. Each action should do one thing the model can reason about.
- **Model-shaped ergonomics** — design for how the model works (text, limited memory), not how a human works (GUI, scrolling, intuition).

## Why This Beats a Smarter Model (often)

Research and practice repeatedly show that **ACI improvements — better file-viewing, an edit tool with built-in validation, concise outputs — raise task success more than upgrading the underlying model.** The model is the reasoning engine; the ACI determines whether it can *apply* that reasoning without tripping. It's the highest-leverage, most overlooked part of agent building.

## Design Guidance (for understanding/using)

- **Design tools for the model, not the human** — text-first, concise, structured; assume no scrolling/glancing.
- **Return feedback on every action** — show the effect (diff, exit code, error) so the agent can self-correct.
- **Bake guardrails into tools** — reject/validate risky operations at the boundary and return a correctable error, not silent corruption.
- **Keep the action space small and crisp** — fewer, sharper tools; cap output size (paginate, summarize).
- **Iterate on the ACI first** — before reaching for a bigger model, fix the interface where the agent stumbles.

## Pitfalls (in understanding/using)

- Exposing **raw human tools** (unbounded output, no line numbers) → context overflow and lost-place errors.
- Tools that **silently** succeed/fail → the agent can't tell if its action worked.
- A **huge, fuzzy** action space → the model misuses tools in subtle ways.
- Blaming the **model** for failures that are really **interface** problems → fix the ACI first.
- No validation/guardrails in edit tools → silent file corruption the agent doesn't notice.
