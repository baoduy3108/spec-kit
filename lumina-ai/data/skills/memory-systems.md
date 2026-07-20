---
name: memory-systems
description: Building memory architectures that allow AI agents to retain knowledge across sessions — memory layer hierarchy, framework selection, escalation path. Use when discussing how to give an AI agent persistent memory across sessions/conversations.
category: engineering
keywords_vi: memory system, bộ nhớ agent, persistent memory, long-term memory ai, kiến trúc trí nhớ agent, agent nhớ được, ghi nhớ nhiều phiên
---

# Memory Systems for Agent Persistence

This skill guides building memory architectures that allow agents to retain knowledge across sessions. Start simple and add complexity only when retrieval quality degrades.

## Key Decision Framework

**Memory Layer Hierarchy** (simplest to most complex):
- Working memory (context window only)
- Short-term (session-scoped files/cache)
- Long-term (key-value or graph stores)
- Entity registries (consistent identity tracking)
- Temporal knowledge graphs (timestamped facts with validity windows)

## Framework Selection

Match frameworks to retrieval patterns:

- **Mem0**: Vector stores with graph layers; best for multi-tenant systems
- **Zep/Graphiti**: Temporal knowledge graphs tracking when events occurred and when they were recorded
- **Letta**: Self-editing memory with deep introspection capabilities
- **Cognee**: Multi-layer semantic graphs with customizable extraction pipelines
- **LangMem**: Purpose-built for LangGraph workflows
- **File-system**: Simple prototyping approach

## Practical Escalation Path

1. Start with filesystem JSON storage and timestamps
2. Move to vector stores (Mem0) when semantic search is needed
3. Add temporal knowledge graphs when relationship traversal or time-travel queries become necessary
4. Adopt full frameworks (Letta/Cognee) only when agents need self-management capabilities

## Core Principles

- Start with file-system memory; add complexity only when retrieval quality demands it
- Use hybrid retrieval combining semantic, keyword, and graph approaches for best accuracy
- Implement periodic consolidation to prevent unbounded growth while preserving historical context
- Place retrieved memories in attention-favored positions within context windows
- Always design graceful fallbacks when memory lookups fail

Avoid over-engineering early, ignoring temporal validity, and loading entire memory stores into context at once.
