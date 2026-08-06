---
name: coding-agent-architecture
description: How an autonomous coding agent (OpenHands/SWE-agent/Claude-Code-style) is structured — the observe-think-act loop over a sandboxed workspace, the tool set (read/edit files, run commands, run tests), memory/context management, and the stop conditions. Use to understand how AI software engineers actually work end to end, why they need a real execution environment, and how to design or reason about one.
category: ai-ml-internals
keywords_vi: kiến trúc agent lập trình tự động coding agent, vòng lặp quan sát suy nghĩ hành động observe-think-act trên workspace sandbox, bộ công cụ đọc sửa file chạy lệnh chạy test, quản lý bộ nhớ và ngữ cảnh cho agent, điều kiện dừng của vòng lặp agent, ai kỹ sư phần mềm cần môi trường thực thi thật swe-agent openhands
---

# Coding Agent Architecture

An autonomous **coding agent** (OpenHands, SWE-agent, Claude Code, Devin-style) turns "fix this bug / build this feature" into a sequence of concrete actions on a real codebase. Unlike a chatbot that only outputs text, a coding agent **acts** — it edits files, runs commands, executes tests, reads the results, and iterates until the task is done or it gives up. Understanding its architecture explains why these systems need real infrastructure and how they differ from plain LLM chat (see agent-computer-interface, sandboxed-code-execution-for-agents, agent-file-editing-and-diffs).

## The Core Loop: Observe → Think → Act

At its heart a coding agent runs a loop:
1. **Observe** — read the current state: the task, files, previous command output, test results, errors.
2. **Think** — the LLM reasons about the next step (plan, or the single next action) given the observations.
3. **Act** — execute a **tool call** (edit a file, run a shell command, run tests, search the repo).
4. Feed the action's **result back** as the next observation, and repeat.

This is the **ReAct**/agent loop applied to software: the model doesn't produce the whole solution in one shot; it takes one grounded step, sees what happened, and adjusts. The **feedback from real execution** (a failing test, a stack trace, a compile error) is what makes agents far more reliable than one-shot code generation — they can *notice* they were wrong and fix it.

## The Required Pieces

- **A sandboxed workspace** — a real environment (usually a Docker container/VM) with the repo, a shell, and the language toolchain, isolated from the host (see sandboxed-code-execution-for-agents). Without a place to *run* things, there's no observe step.
- **A tool set (the action space)** — the concrete actions the agent can take: read file, edit file (see agent-file-editing-and-diffs), run a bash command, run tests, search code, maybe browse the web. Designing these *for the model* is the Agent-Computer Interface problem.
- **Context/memory management** — the loop generates a lot of history (commands, outputs, diffs); the agent must keep the relevant context in the LLM's window (summarize old steps, keep the task + recent results, retrieve relevant files) or it loses the plot on long tasks.
- **Stop conditions** — done (tests pass / task satisfied), stuck (repeating actions, no progress), budget exceeded (steps/tokens/time), or needs human input. Good agents detect being stuck and escalate rather than looping forever.

## Why It Can't Be a Pure Chat App

A coding agent fundamentally needs to **execute** — run the code, see the error, try again. A system that only calls an LLM and returns text can *suggest* code but cannot *close the loop* (it never observes whether its change worked). That execution environment (sandbox + tools + orchestration) is the hard, infrastructure-heavy part; the LLM is "just" the reasoning core inside the loop.

## Design Guidance (for understanding/using)

- **Ground every step in real feedback** — run tests/commands and feed results back; don't trust the model's belief that its edit worked.
- **Design a small, reliable tool set** (the action space) around what the model can use well — fewer, well-specified tools beat many fuzzy ones.
- **Manage context aggressively** — summarize/truncate history, retrieve only relevant files; long tasks blow the window otherwise.
- **Build in stop/escalation conditions** — detect loops/no-progress, cap budget, ask a human when stuck.
- **Sandbox execution** — never run agent-generated commands on the host; isolate (Docker/VM) with least privilege.

## Pitfalls (in understanding/using)

- Expecting a **chat-only** system to be a coding agent → without an execution loop it can't verify its own work.
- One-shot generation with **no feedback** → errors go undetected; the value is in observe-and-correct.
- Letting the loop run **without stop conditions** → infinite loops, runaway cost.
- Ignoring **context growth** → the agent forgets the task/plan on long runs.
- Running agent commands **unsandboxed** → destructive/security risk on the host.
