---
name: multi-agent-patterns
description: When and how to distribute work across multiple language models for tasks exceeding single-agent capacity: supervisor/orchestrator, peer-to-peer/swarm, and hierarchical patterns. Use when discussing multi-agent AI system architecture or whether a task needs multiple agents.
category: engineering
keywords_vi: multi-agent, kiến trúc nhiều agent, orchestrator agent, swarm agent, nhiều agent phối hợp, nhiều ai agent
---

# Multi-Agent Architecture Patterns: Summary

This skill guide addresses when and how to distribute work across multiple language models for tasks exceeding single-agent capacity.

## Core Purpose

Multi-agent systems exist primarily to **isolate context**, not to mirror organizational hierarchies. Each agent operates in a clean context window focused on its subtask, avoiding the "telephone game problem" where information degrades through repeated summarization.

## Three Dominant Patterns

1. **Supervisor/Orchestrator** — Central coordinator delegates to specialists; best for clear decomposition and human oversight
2. **Peer-to-Peer/Swarm** — Flexible direct communication; best for dynamic requirements and exploration
3. **Hierarchical** — Layered abstraction (strategy → planning → execution); best for large-scale projects

## When to Activate

- Single-agent context limits constrain task complexity
- Tasks decompose into parallel subtasks
- Different subtasks need distinct tools or system prompts
- Scaling capabilities beyond single-context limits

## Critical Warnings

**Token Economics Reality**: Multi-agent systems cost much higher than baseline compared to single-agent chat. Measure against single-agent baselines rather than assuming extra agents help — budget 15x baseline token cost.

**Key Failure Modes**:
- Supervisor bottleneck at 5+ workers (use tiered supervisors instead)
- Token cost underestimation
- Sycophantic consensus (agents agree to be agreeable, not accurate)
- Error propagation cascades (hallucinations spread downstream)
- Over-decomposition (coordination overhead exceeds work savings)

## Design Principles

- Use weighted voting over simple majority voting
- Implement explicit handoff protocols with state passing
- Add validation checkpoints between agents
- Set time-to-live limits to prevent infinite loops
- Default to instruction passing; escalate to file system memory for complex shared state

Model quality improvements often outperform raw token increases — treat model selection and architecture as complementary strategies.
