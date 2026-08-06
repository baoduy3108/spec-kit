---
name: working-with-ai-coding-agents
description: How to collaborate effectively with AI coding agents — what they're good and bad at, giving clear intent and context, scoping work into verifiable units, reviewing output, staying in control, and treating the agent as a fast but fallible collaborator. Use to work productively with an AI coding agent, delegate coding to AI, or set up an effective human-AI development workflow.
category: engineering
keywords_vi: working with ai coding agents, làm việc với agent lập trình ai, giỏi và dở ở đâu, đưa intent context rõ, chia việc kiểm chứng được, review đầu ra, giữ kiểm soát, cộng tác nhanh nhưng sai được
---

# Working with AI Coding Agents

AI coding agents can write, refactor, and debug code fast — but they're **fast, capable, and fallible collaborators**, not autonomous replacements. Getting great results is a skill: give clear intent and context, scope work well, review everything, and stay in control. This is the human-AI workflow that spec-driven development is built around (see spec-driven-development).

## Know Their Strengths and Weaknesses

- **Good at** — writing boilerplate/routine code fast, applying known patterns, exploring options, refactoring, drafting tests, working across a large surface quickly, recalling APIs.
- **Bad at / risky** — **over-engineering** (adding unrequested complexity — see preventing-agent-over-engineering), silently making wrong assumptions on ambiguous specs, **hallucinating** APIs/facts (see hallucination-mitigation), subtle bugs that look plausible, losing the big picture on large tasks, and going confidently in the wrong direction. They don't truly "understand" — they pattern-match plausibly.
Work *with* the strengths and *guard against* the weaknesses.

## Give Clear Intent and Context

An agent produces what you (under)specify. The two biggest levers:
- **Clear intent** — say **what** you want and **why**, precisely, including constraints and done criteria (this is why specs matter — see writing-executable-specifications, prompting-coding-agents). Vague requests → vague or wrong output; the agent fills gaps with assumptions.
- **Relevant context** — give it the constitution/conventions, relevant code, and constraints it needs (see context-for-coding-agents). It can't follow rules it doesn't have or match patterns it can't see.
Most agent failures trace to under-specified intent or missing context.

## Scope Work into Verifiable Units

Don't hand an agent a giant vague task ("build the app"). Break work into **well-scoped tasks with clear done criteria** (see task-decomposition-for-implementation) that you can **verify** individually. Agents do far better on bounded, clear tasks than sprawling ones, and small units let you catch a wrong direction early instead of after a huge diff (see incremental-implementation).

## Review Everything — Stay in Control

**You are responsible for the output.** Never merge agent code you haven't reviewed and understood (see reviewing-ai-generated-code) — it can contain subtle bugs, security issues, over-engineering, or plausible-but-wrong logic. Treat agent output like a **junior developer's PR**: helpful, fast, but requires review and often correction. **Verify** it works (run it, test it — see verification-before-completion), not just that it looks right. Keep humans deciding the important things (see human-in-the-loop-development).

## Iterate

Working with an agent is a **loop**: instruct → review → correct/refine → repeat (see iterative-development-with-agents). Give feedback on what's wrong, redirect, and converge. Expect to iterate; the first output is a draft, not a deliverable.

## Pitfalls (in understanding/using)

- Treating the agent as **autonomous/infallible** — it's a fast, fallible collaborator; you own the result.
- **Vague intent / missing context** → wrong or generic output (the top failure).
- **Giant vague tasks** instead of scoped, verifiable units → sprawling, hard-to-review, off-track work.
- **Merging unreviewed** code → subtle bugs, security holes, over-engineering shipped.
- Not **verifying** it actually works (looks-right ≠ works — see verification-before-completion).
- Letting it **over-engineer** unchecked (see preventing-agent-over-engineering).
- Not **iterating** — accepting the first draft, or failing to redirect when it's off.
- Abdicating **judgment/decisions** to the agent (keep humans in the loop — see human-in-the-loop-development).
