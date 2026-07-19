---
name: how-model-context-protocol-works
description: How the Model Context Protocol (MCP) works — an open standard that lets AI assistants connect to external tools and data through a uniform client-server interface exposing tools, resources, and prompts, so integrations become plug-and-play. Use to understand MCP, connecting LLMs to tools/data, MCP servers and clients, or standardizing AI tool integrations.
category: ai-agent
keywords_vi: model context protocol, tools resources prompts, chuẩn mở kết nối ai với công cụ dữ liệu, giao thức mcp, tích hợp cắm là chạy, mcp client server
---

# How the Model Context Protocol (MCP) Works

The Model Context Protocol (MCP) is an **open standard for connecting AI assistants to external tools and data**. It solves the "N×M integration problem" — instead of every AI app writing custom code for every data source, MCP defines **one uniform interface** so any MCP-compatible AI can talk to any MCP server (see how-ai-agents-work, function-calling-and-tools).

## The Problem: Every Integration Is Custom

An AI assistant is far more useful when it can reach real tools and data — files, databases, APIs, your codebase, a ticketing system. But without a standard, **each** connection is bespoke: M AI applications × N data sources = M×N custom integrations, each reinvented separately. This doesn't scale and locks integrations to specific apps. MCP standardizes the connection so you build a server **once** and every MCP client can use it.

## The Core Idea: A Client-Server Protocol for Context

MCP borrows the client-server model:
- An **MCP server** wraps a specific system (e.g. a GitHub server, a filesystem server, a database server) and exposes its capabilities in a standard way.
- An **MCP client** lives inside the AI application (the "host" — e.g. a desktop assistant or IDE) and connects to servers.
- They communicate over a defined protocol (JSON-RPC based) so any client understands any server.

The AI can then **discover** what a server offers and use it — without the app hard-coding that integration. Add a new server, and the assistant instantly gains those capabilities.

## The Three Primitives

MCP servers expose three kinds of things:
- **Tools** — actions the model can **call** (functions with typed inputs/outputs): "create issue," "run query," "search files." This is how the model *does* things (see function-calling-and-tools) — the model decides when to invoke them.
- **Resources** — **data** the client can read to put into context: file contents, database records, documents. Read-only context, typically chosen by the application/user.
- **Prompts** — reusable, parameterized **prompt templates** a server offers (e.g. a "summarize this PR" template) that users can invoke.

This separation — model-invoked tools vs application-supplied resources vs user-invoked prompts — keeps control clear about *who* decides to use each capability.

## The Flow

1. The host app starts and **connects** its client to configured MCP servers.
2. It **discovers** each server's tools, resources, and prompts.
3. During a conversation, the model is told which tools exist; when it wants one, it emits a **tool call**, the client routes it to the server, the server executes and returns a result, and the result goes back into the model's context (see how-ai-agents-work for the agent loop).
4. Resources/prompts are pulled in as needed to enrich context.

## Why It Matters

MCP is becoming the **USB-C of AI integrations** — a common port so tools and assistants interoperate. It decouples "what an AI can do" from "which app you're using," lets an ecosystem of reusable servers grow, and is the plumbing behind assistants that can actually touch your systems. Building an MCP server is the standard way to give AI access to a new system safely and reusably.

## Pitfalls (in understanding/using)

- Confusing MCP with the **model** — MCP is a **protocol** for connecting tools/data; it doesn't make the model smarter, it gives it reach.
- Mixing up the primitives — **tools** are model-invoked actions, **resources** are app-supplied read-only data, **prompts** are user-invoked templates.
- Ignoring **security/permissions** — exposing tools means the AI can take real actions; servers must enforce auth, scoping, and human approval for sensitive operations.
- Expecting MCP to give the model taste about **when** to use a tool — that's the model/agent's job; MCP only standardizes the interface.
- Over-exposing capabilities — too many tools/resources bloat context and confuse tool selection; expose a focused set.
- Assuming it replaces function-calling — MCP **builds on** tool/function calling; it standardizes how those tools are discovered and connected.
