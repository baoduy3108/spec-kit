---
name: context-for-coding-agents
description: How to give AI coding agents the right context — persistent instruction files (CLAUDE.md/AGENTS.md), conventions and constraints, relevant code, and managing limited context windows; what to include and what to leave out. Use to set up context for an AI coding agent, write an AGENTS.md/CLAUDE.md, or improve agent output by managing what it can see.
category: engineering
keywords_vi: context for coding agents, cung cấp ngữ cảnh cho agent lập trình, file chỉ thị claude.md agents.md, quy ước ràng buộc, code liên quan, quản lý cửa sổ ngữ cảnh, gồm gì bỏ gì
---

# Context for Coding Agents

An AI coding agent can only act on **what it can see** — its context. Managing that context (persistent instructions, conventions, relevant code, constraints) is one of the highest-leverage ways to improve agent output, because most agent failures come from **missing or wrong context** (see working-with-ai-coding-agents, context-engineering).

## The Agent Only Knows Its Context

The agent has no inherent knowledge of *your* project — your conventions, architecture, constraints, or the specific code it must fit into. Whatever isn't in its context, it **can't follow or match** — so it guesses (often wrongly, or in a generic style that doesn't fit). Giving it the right context is how you get output that follows your rules and integrates cleanly. Conversely, **irrelevant** context wastes the limited window and can distract it.

## Persistent Instruction Files (CLAUDE.md / AGENTS.md)

Modern agents read a **project instruction file** (e.g. `AGENTS.md`, `CLAUDE.md`) that's automatically included as context — the durable "how we work here" the agent always sees. Put in it:
- **Project overview** — what it is, key architecture (see codebase-design).
- **Conventions** — code style, naming, patterns, structure to follow.
- **Constraints / principles** — the constitution's rules, do's and don'ts (see writing-a-project-constitution).
- **How to build/test/run** — commands the agent needs.
- **Gotchas** — non-obvious things to know.
Keep it **concise and high-signal** — a bloated instruction file wastes context and buries the important rules. It's the standing context; per-task context is added on top.

## Per-Task Context

For a given task, include the **relevant** code and information:
- The **files/modules** it must edit, extend, integrate with, or match.
- **Examples** of the pattern/style you want (see prompting-coding-agents).
- The **spec/requirements** for the task (see writing-executable-specifications).
Include what's **relevant**; don't dump the whole codebase — irrelevant context dilutes attention and hits limits.

## Manage the Limited Window

Context windows are **finite** (see how-tokenizers-work) and attention degrades with too much (see context-degradation). So:
- **Prioritize high-signal** context; cut noise.
- **Restate key constraints** on long tasks (early context can get lost/deprioritized — see context-optimization).
- Point the agent to where to **find** things (let it retrieve) rather than pasting everything.
- Keep the instruction file lean.
More context isn't always better — the *right* context is.

## Pitfalls (in understanding/using)

- **Missing context** — expecting the agent to follow conventions/constraints or fit code it can't see (the top failure).
- **No persistent instruction file** → the agent re-guesses your conventions every session.
- **Bloated instruction file / context dump** → wastes the window, buries the important rules, degrades attention.
- **Irrelevant context** distracting the agent from the task.
- Forgetting the window is **finite** — overflowing it or letting key constraints scroll out on long tasks (restate them).
- **Stale** instruction files that no longer match the project.
- Not pointing the agent to **where to find** info (making it work blind).
- Assuming the agent **remembers** across sessions (context resets — persist important things in files).
