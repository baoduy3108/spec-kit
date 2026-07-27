---
name: agent-communication-protocols
description: How autonomous AI agents talk to tools and to each other through standardized protocols — MCP (agent↔tools/data), Agent-to-Agent / A2A (peer agents delegating tasks and exchanging results), and Agent Network Protocol / ANP (discovery + identity across an open network of agents). Covers capability discovery, message/task schemas, identity/trust, and why standard protocols beat ad-hoc glue. Use to understand multi-agent communication, MCP vs A2A vs ANP, or designing interoperable agents.
category: ai-agent
keywords_vi: giao thức giao tiếp giữa các agent, a2a agent-to-agent ủy thác tác vụ, anp agent network protocol khám phá danh tính, mcp kết nối công cụ dữ liệu, giao thức chuẩn cho agent liên thông, phối hợp nhiều agent qua giao thức
---

# Agent Communication Protocols (MCP · A2A · ANP)

As AI agents proliferate, the hard problem shifts from "make one agent smart" to "let agents **talk** — to tools, to data, and to each other — without bespoke glue for every pairing." Standardized **protocols** solve this the way HTTP/TCP did for machines: a common contract so any compliant agent/tool interoperates. Three complementary layers have emerged (see multi-agent-patterns, giving-agents-external-reach, tool-design, agent-skill-lifecycle-management).

## The Three Layers (different jobs)

**MCP — agent ↔ tools/data.** The Model Context Protocol standardizes how a single agent connects to **external tools, data sources, and context** (a filesystem, a database, an API) through a uniform interface. Instead of hardcoding each integration, an agent speaks MCP to any MCP server. This is the *vertical* connection: model reaching **down** to capabilities.

**A2A — agent ↔ agent.** Agent-to-Agent protocols let **peer agents** collaborate: one agent **delegates** a task to another, they exchange **structured messages/tasks and results**, negotiate, and combine outputs — even if built by different teams/frameworks. This is the *horizontal* connection: agents reaching **across** to each other as autonomous services (a "specialist" agent answers a "coordinator" agent).

**ANP — the open network.** Agent Network Protocol targets an **open web of agents**: **discovery** (how do I find an agent that can do X?), **identity** (who is this agent, can I trust it?), and **interop** at internet scale — the "DNS + TLS + directory" layer so agents from anywhere can find and safely engage each other.

## Common Building Blocks

Whatever the layer, the protocol must define:
- **Capability discovery** — advertise "what I can do" (tools/skills/schemas) so a caller knows how to use you.
- **Message / task schema** — a typed envelope: the request, parameters, streaming/partial results, completion, errors.
- **Identity & trust** — who is calling, are they authorized, is the response authentic (signing/auth) — critical once agents are remote/third-party.
- **Long-running & async** — real agent tasks take time; protocols support task state, progress, and callbacks, not just request→reply.

## Why Standard Protocols Win

- **N+M instead of N×M** — every agent/tool implements the protocol once, not a custom adapter per partner.
- **Interoperability across frameworks/vendors** — agents built independently can cooperate.
- **Composability** — complex systems assembled from discoverable specialist agents + tools.
- **Security surface is explicit** — identity/trust/authorization are first-class, not afterthoughts (essential when agents call untrusted peers).

## Design Guidance

- **Pick the layer for the job** — MCP for tools/data; A2A for delegating to peer agents; ANP for open discovery/identity.
- **Advertise capabilities** with machine-readable schemas so callers can auto-use you.
- **Treat peer output as untrusted** — validate, guard against prompt injection from other agents (see giving-agents-external-reach).
- **Authenticate & authorize** every cross-agent call; verify identity before trusting results.
- **Support async/streaming** task state — don't assume instant replies.
- **Prefer standards over bespoke glue** when you expect >a couple of integrations.

## Pitfalls (in understanding/using)

- Conflating the layers — **MCP is not A2A**: tools-access vs peer-delegation are different problems.
- **Ad-hoc integrations** everywhere → N×M glue that rots; adopt a protocol once past a few links.
- Trusting a **peer agent's output** blindly → injection/incorrect-result propagation; validate.
- No **identity/trust** in an open network → impersonation, unauthorized actions.
- Assuming **request→reply** → real agent tasks are long-running/async; model task state.
- Over-standardizing a **single-agent** app that will never federate — protocols add overhead; use when interop is real.
