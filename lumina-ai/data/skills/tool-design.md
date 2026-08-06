---
name: tool-design
description: Designing tools as unambiguous contracts between deterministic systems and non-deterministic agents — agents infer intent from descriptions alone, so every ambiguity becomes a failure mode. Use when writing tool/function descriptions for an AI agent, debugging incorrect tool selection, or designing an MCP server's tool schemas.
category: engineering
keywords_vi: tool design, thiết kế tool cho agent, function calling, mcp tool schema, mô tả công cụ ai, mô tả tool, viết mô tả tool
---

# Tool Design for Agents: Core Summary

This skill guides designing tools as unambiguous contracts between deterministic systems and non-deterministic agents. The key principle: **agents infer intent from descriptions alone**, so every ambiguity becomes a failure mode.

## Primary Activation Triggers

- Writing new tool descriptions, schemas, or response formats
- Debugging incorrect tool selection by agents
- Consolidating overlapping tool catalogs
- Designing error messages for agent self-correction
- Establishing consistent naming conventions

## Core Principle: Consolidation

"If a human engineer cannot definitively say which tool should be used in a given situation, an agent cannot be expected to do better." Build single comprehensive tools rather than multiple narrow, overlapping ones. This reduces selection ambiguity, shrinks context consumption, and improves outcomes.

## Tool Description Engineering

Every description must answer four questions:

1. **What does it do?** — Exact accomplishment, not vague language
2. **When use it?** — Specific triggers and indirect signals
3. **What inputs?** — Types, constraints, defaults, format examples
4. **What returns?** — Output structure, examples, error conditions

Write tool descriptions knowing they load directly into agent context and collectively steer behavior.

## Key Design Practices

- **Verb-noun naming**: Use patterns like `get_customer`, `create_order`
- **Consistent parameters**: Always use `customer_id`, never mix with `id` or `identifier`
- **Actionable errors**: Every error must state what went wrong and how to correct it
- **Response formats**: Offer concise vs. detailed modes for token efficiency
- **MCP namespacing**: Use fully qualified names like `ServerName:tool_name`
