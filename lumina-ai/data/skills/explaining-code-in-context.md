---
name: explaining-code-in-context
description: Deep-dive explanation of a specific file, function, class, or module in its architectural context — identify its layer and role, map incoming/outgoing connections (imports, calls, depends-on), trace data flow (inputs → processing → outputs), and explain clearly for a reader who may not know the language. Use when asked to explain what a piece of code does and how it fits the wider system.
category: engineering
keywords_vi: giải thích code trong ngữ cảnh, giải thích hàm này làm gì, deep dive một file, code này thuộc tầng nào, hàm này liên kết với gì, giải thích module cho người mới, đọc hiểu đoạn code này
---

# Explaining Code in Context

Explaining a component well means placing it in the system, not just paraphrasing its lines. Build a small mental "knowledge graph" of the target and its neighbourhood, then explain from that.

## Mental Model

Think of the codebase as nodes and edges:
- **Nodes** — files, functions, classes, modules, configs, endpoints, tables, and higher-level *concepts*. Each has a role and a rough complexity.
- **Edges** — how nodes connect: `imports`, `calls`, `contains`, `depends_on`, `configures`, `documents`. Following edges reveals dependency chains and blast radius.
- **Layers** — architectural bands (e.g. UI → application → domain → data/infra). Every node belongs to one; the layer explains *why the node exists*.

## Method

1. **Locate the target.** From the code the user pasted/attached, find the exact file/function/class and note its type, a one-line summary, and its complexity.
2. **Map the neighbourhood.**
   - *Outgoing* — what it imports, calls, or depends on (what it needs to work).
   - *Incoming* — what calls or imports it (who breaks if it changes).
   Follow these one or two hops — enough for context, not the whole graph.
3. **Identify the layer** and state the component's role within it.
4. **Trace the data flow** through the component: inputs → transformation/logic → outputs and side effects.
5. **Explain in context**, covering:
   - Its role in the architecture (which layer, why it exists).
   - Internal structure (functions/classes it contains).
   - External connections (what it uses, what uses it, what it depends on).
   - Data flow and any notable patterns, idioms, or complexity.
   - Written so a reader who may not know the language can follow — name the language's idioms explicitly rather than assuming them.

## Read Efficiently

When working from a large body of pasted code, don't dump everything into the explanation. Search for the relevant symbol first; read only the sections needed; names and short summaries carry most of the understanding, and edges (imports/calls) carry the rest. Ask the user to paste any referenced-but-missing file rather than guessing its contents.

## Anti-Patterns

- Line-by-line paraphrase with no architectural placement — restates the code without adding understanding.
- Explaining a function as if isolated when its behaviour depends on callers/config.
- Assuming language-specific idioms are obvious to the reader.
- Inventing the contents of a file you were not shown — ask for it instead.
