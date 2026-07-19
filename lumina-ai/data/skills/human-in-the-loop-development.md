---
name: human-in-the-loop-development
description: How to structure human-AI collaboration in development — deciding what humans own (intent, decisions, judgment, review) vs what agents execute, checkpoints and approval gates for consequential actions, and staying accountable. Use to design a human-AI dev workflow, decide where humans must stay in control, or set checkpoints for AI agents.
category: engineering
keywords_vi: human in the loop, con người quyết định, checkpoint agent, con người trong vòng lặp phát triển, review vs agent thực thi, hành động hệ trọng, cổng phê duyệt, chịu trách nhiệm
---

# Human-in-the-Loop Development

As AI agents take on more coding, the key design question is **where humans stay in control**. "Human-in-the-loop" means structuring the workflow so people own the **decisions and judgment** while agents handle **execution** — with checkpoints on consequential actions. Getting this division right is what makes AI-assisted development both fast and safe (see working-with-ai-coding-agents).

## What Humans Should Own

Some things should **not** be fully delegated to an agent, because they require judgment, accountability, or bear real consequences:
- **Intent and requirements** — deciding *what* to build and *why* (the spec — see writing-executable-specifications). The agent shouldn't invent the goal.
- **Key decisions** — architecture, tech choices, trade-offs, anything hard to reverse or with lasting impact (see decision-making-frameworks). The human decides; the agent can propose options.
- **Judgment calls** — ambiguity resolution, priorities, taste, "is this good enough / the right approach."
- **Review and acceptance** — verifying and approving output (see reviewing-ai-generated-code). You're accountable for what ships.
- **Consequential/irreversible actions** — deploying, deleting data, spending money, anything hard to undo (see the checkpoint idea below).
The human provides direction and judgment; the agent provides speed and execution within that frame.

## What Agents Can Execute

Within human-set intent, constraints, and review, agents can **execute** a lot autonomously: writing routine code, applying patterns, refactoring, drafting tests, exploring, and doing well-scoped tasks (see task-decomposition-for-implementation). The more bounded, verifiable, and reversible the work, the more you can let the agent run — reviewing the result.

## Checkpoints & Approval Gates

The mechanism for staying in the loop without micromanaging: **checkpoints** at the right moments —
- **Before consequential actions** — require human approval before deploying, deleting, sending, spending, or anything irreversible (an agent shouldn't do these unsupervised — see prompt-injection-defense, llm-guardrails-and-safety).
- **At decision points** — pause for the human when a real decision (not just execution) arises; have the agent **ask** rather than assume (see spec-clarification-and-ambiguity-resolution).
- **At review gates** — review increments before they're merged/built on (see iterative-development-with-agents).
Calibrate gate frequency to **risk and reversibility**: tight gates for high-stakes/irreversible actions, looser for low-risk reversible ones. Too many gates = no speedup; too few = losing control.

## Accountability Stays Human

However much the agent does, **the human remains accountable** for the result. "The AI wrote it" is not an excuse for a bug, a security hole, or a bad decision that ships. This accountability is *why* humans must stay in the loop on judgment, review, and consequential actions — not as bureaucracy, but because someone responsible must be behind what goes out.

## Pitfalls (in understanding/using)

- **Over-delegating judgment** — letting the agent decide intent, architecture, or trade-offs it shouldn't own.
- **No checkpoints on consequential/irreversible actions** (deploy, delete, spend) — an agent doing these unsupervised is dangerous.
- **Under-delegating** — micromanaging every line so there's no speed benefit; let agents execute bounded, reversible, reviewed work.
- **Gates miscalibrated** — too many (no speedup) or too few for the risk (lost control).
- **Abdicating accountability** ("the AI did it") — you own the result; review and stay responsible.
- Letting the agent **assume** on decisions instead of pausing to ask.
- Not adjusting the loop as **trust/track-record** and **stakes** change (more autonomy for low-risk, proven areas; tight control for high-stakes).
