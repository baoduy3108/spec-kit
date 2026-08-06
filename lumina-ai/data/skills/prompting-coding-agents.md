---
name: prompting-coding-agents
description: How to write effective instructions for AI coding agents — stating clear intent and constraints, providing context and examples, specifying done criteria, breaking down large asks, and iterating; plus common prompt failure modes. Use to prompt an AI coding agent well, write coding instructions for AI, or get better code generation from an agent.
category: engineering
keywords_vi: prompting coding agents, viết chỉ thị cho agent lập trình, intent ràng buộc rõ ràng, cung cấp context ví dụ, tiêu chí hoàn thành, chia nhỏ yêu cầu lớn, lặp, lỗi prompt thường gặp
---

# Prompting Coding Agents

How you **instruct** an AI coding agent hugely affects what you get. It's a specialization of prompt engineering (see prompt-engineering) for the coding-agent context, focused on communicating **intent, constraints, and context** precisely enough that a fast-but-literal collaborator builds the right thing (see working-with-ai-coding-agents).

## State Clear Intent and Constraints

The agent builds what you specify — so specify well:
- **What and why** — the goal and its purpose (the "why" helps it make good choices when details are underspecified). Precise beats vague ("add pagination to the users endpoint, cursor-based, 20 per page" not "improve the users endpoint").
- **Constraints** — the rules it must follow: conventions, allowed/forbidden approaches, the project's principles (see writing-a-project-constitution), performance/security needs, "don't touch X." Constraints prevent the agent wandering into unwanted solutions or over-engineering.
- **Done criteria** — how you'll know it's correct (tie to tests/acceptance criteria — see writing-executable-specifications). Ambiguous "done" → the agent decides, often wrongly.

## Provide Context and Examples

The agent only knows what it can see:
- **Relevant code/files** — the code it must integrate with, extend, or match (see context-for-coding-agents). It can't match patterns it hasn't seen.
- **Conventions/examples** — show an example of the pattern/style you want ("do it like this existing module"). Examples communicate faster and more precisely than descriptions.
- **The constraints doc / constitution** — so it follows project rules.
Missing context is the #1 cause of off-target output.

## Break Down Large Asks

Don't prompt "build the whole feature" in one shot for anything non-trivial. **Decompose** into scoped steps (see task-decomposition-for-implementation) and prompt them in sequence, reviewing each. Large vague prompts produce sprawling, hard-to-verify output that's often off-track; small clear prompts produce reviewable increments (see incremental-implementation).

## Guard Against Known Failure Modes

Prompt defensively against agent tendencies:
- **Over-eagerness** — explicitly say "keep it simple, don't add features I didn't ask for, don't over-abstract" (see preventing-agent-over-engineering). Agents love to gold-plate.
- **Assumptions** — say "if anything is ambiguous, ask before implementing" so it clarifies rather than guessing (see spec-clarification-and-ambiguity-resolution).
- **Scope drift** — bound what it should and shouldn't touch.

## Iterate With Feedback

First output is a **draft**. Give **specific** feedback on what's wrong and why ("this doesn't handle the empty case," "use the existing X helper instead") and redirect — don't just say "no, try again." Precise feedback converges fast (see iterative-development-with-agents).

## Pitfalls (in understanding/using)

- **Vague intent** — the top failure; be specific about what, why, constraints, and done criteria.
- **No context/examples** → output that doesn't fit your codebase/conventions.
- **Giant one-shot prompts** for complex work → sprawling, off-track, unreviewable output; decompose.
- **No done criteria** → the agent decides "done" (often wrong/incomplete).
- Not telling it to **ask when unsure** → it silently assumes.
- Not curbing **over-engineering** in the prompt → gold-plated solutions.
- **Vague feedback** ("that's wrong, try again") instead of specific, actionable redirection.
- Assuming it remembers everything across a long session (context can be lost — restate key constraints).
