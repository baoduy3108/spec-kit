---
name: agentic-rag
description: How agentic RAG improves on basic RAG — an LLM agent that reasons about retrieval: reformulating queries, deciding when and what to retrieve, doing multi-step/iterative retrieval, using multiple sources/tools, and self-correcting. Use to understand agentic RAG, improving RAG quality, multi-hop retrieval, or when basic retrieval isn't enough.
category: ai-agent
keywords_vi: agentic rag, rag có tác tử, agent lập luận về truy xuất, reformulate query, truy xuất nhiều bước multi-hop, nhiều nguồn công cụ, tự sửa self-correct
---

# Agentic RAG

Basic RAG (see rag-fundamentals) does one thing: embed the question, retrieve top-k chunks, stuff them into the prompt, answer. **Agentic RAG** makes the LLM an **active agent** that *reasons about* retrieval — deciding when, what, and how to retrieve, iterating until it has what it needs. It fixes the failure modes of naive one-shot retrieval.

## Why Basic RAG Falls Short

Single-shot retrieval breaks on:
- **Poorly-phrased questions** — the user's wording doesn't match the documents' wording; a literal embed-and-retrieve misses relevant content.
- **Multi-hop questions** — "What's the revenue of the company that acquired X?" needs two retrievals (find who acquired X, then their revenue) — one retrieval can't.
- **Ambiguous or broad questions** — one retrieval grabs a shallow slice.
- **Wrong source** — the answer is in a different corpus/tool than the one searched.
- **No retrieval needed** — some questions are answerable directly; retrieving adds noise.

## What the Agent Adds

Agentic RAG wraps retrieval in **LLM reasoning** (see agent-planning-patterns):
- **Query reformulation** — the agent rewrites the user's question into better search queries (expand, disambiguate, split into sub-questions) before retrieving.
- **Decide whether to retrieve** — for a question it can answer directly or that needs a tool instead, skip or redirect retrieval.
- **Multi-step / iterative retrieval** — retrieve, read, realize it needs more, retrieve again (multi-hop), building up the answer. Loop until sufficient.
- **Route across sources/tools** — choose the right corpus, database, API, or web search per sub-question (retrieval as one tool among many — see llm-function-calling).
- **Self-critique / correction** — assess whether retrieved context actually answers the question; if not, try a different query or source. Grade relevance, re-retrieve on failure (corrective RAG).

## The Trade-off

Agentic RAG is **more accurate and robust** on hard/multi-step questions — but **slower and costlier** (multiple LLM calls and retrievals per answer) and more complex. Use it where quality on complex queries matters; keep simple RAG for straightforward lookups. Often a hybrid: try simple retrieval, escalate to agentic only when needed.

## Pitfalls (in understanding/using)

- Using **basic RAG** for multi-hop/ambiguous questions it structurally can't answer — add agentic reasoning.
- **Over-engineering** simple lookups into multi-step agent loops → slow, expensive, no benefit; match complexity to the query.
- **Runaway loops** — the agent retrieving endlessly without converging; cap iterations and require progress.
- **No relevance grading** — feeding irrelevant retrieved chunks to the answer step (garbage in) — grade/filter context.
- Ignoring **latency/cost** blowup from many LLM+retrieval round trips.
- Poor underlying **retrieval quality** (bad chunking/embeddings — see rag-chunking-strategies) — agentic reasoning can't fully rescue a bad index.
- Losing **grounding/citations** across multi-step retrieval (track which source each fact came from — see hallucination-mitigation).
