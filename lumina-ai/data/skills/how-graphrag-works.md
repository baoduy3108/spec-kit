---
name: how-graphrag-works
description: How GraphRAG works — building a knowledge graph from documents (LLM entity/relationship extraction), clustering it into communities and summarizing them, then answering with global (whole-corpus themes) vs local (specific-entity) search, unlike flat vector RAG. Use to understand GraphRAG, knowledge-graph RAG, global vs local search, or answering big-picture questions vector RAG can't.
category: ai-agent
keywords_vi: graphrag, knowledge graph rag, global local search, community summarization, trích entity quan hệ bằng llm, khác vector rag phẳng, rag dựa đồ thị tri thức, gom cụm community
---

# How GraphRAG Works

GraphRAG (from Microsoft Research) is an approach to retrieval-augmented generation that **builds a knowledge graph** from your documents and reasons over its **structure**, instead of only doing flat semantic-similarity lookups like standard vector RAG. Its superpower is answering **big-picture, whole-corpus questions** ("what are the main themes across all these documents?") that vector RAG fundamentally can't (see rag-fundamentals, rag-retrieval-and-reranking, agentic-rag).

## The Problem: Vector RAG Can't See the Whole Picture

Standard RAG chunks documents, embeds them, and retrieves the top-k chunks **most similar** to the query (see rag-fundamentals). This works for **local** questions ("what does the contract say about X?") — but fails at **global** ones ("what are the overarching themes?", "how do these entities relate across the whole dataset?"). Why? Similarity search retrieves a handful of **isolated chunks**; it has no notion of the **connections** between facts scattered across many documents, and no way to **summarize an entire corpus**. The answer to a global question isn't in any single chunk — it's in the **structure** of the whole. GraphRAG adds that structure.

## The Core Idea: Build and Reason Over a Knowledge Graph

GraphRAG's indexing pipeline transforms unstructured text into a structured graph:
1. **Entity & relationship extraction** — an **LLM reads the documents** and extracts **entities** (people, organizations, concepts) and the **relationships** between them, turning prose into a **knowledge graph** (nodes = entities, edges = relationships). This is the key step vector RAG skips.
2. **Community detection** — a graph algorithm (e.g. Leiden) clusters the graph into **communities** — groups of densely-connected entities that represent **themes/topics**. This creates a **hierarchy** (communities of communities).
3. **Community summarization** — the LLM writes a **summary for each community** at each level, so you have pre-computed, structured summaries of the corpus's themes — bottom-up, from entities to high-level topics.
Now the corpus is a **navigable graph with summaries**, not a flat pile of chunks.

## Global vs Local Search

GraphRAG answers two very different kinds of question with two strategies:
- **Global search** — for **broad, whole-dataset** questions ("what are the main themes?"). It uses the **community summaries** (map-reduce over them) to synthesize an answer covering the entire corpus — impossible with top-k chunk retrieval.
- **Local search** — for **specific-entity** questions ("tell me about entity X and its connections"). It starts from the relevant entities and **traverses the graph** (neighbors, relationships, associated text) to gather connected context — richer than similarity alone because it follows **relationships**, not just semantic closeness.
Choosing global vs local by question type is central to using GraphRAG.

## The Trade-offs

- **Powerful for global/connected questions** and multi-hop reasoning across documents — GraphRAG's real advantage.
- **Expensive to index** — running an LLM over the whole corpus to extract entities/relationships and summarize communities costs **a lot of tokens/time** up front (far more than embedding chunks). Requires **prompt tuning** for your domain to extract good entities.
- **Not always needed** — for purely local "find the relevant passage" Q&A, **vector RAG is cheaper and sufficient**. GraphRAG earns its cost when you need global understanding or relationship-heavy reasoning.
Often the two are **combined** (graph for structure/global, vectors for local passages).

## Design Guidance

- **Use GraphRAG for global/connected questions** (themes, relationships across a corpus) that vector RAG can't answer.
- **Use vector RAG for local lookups** where a few relevant chunks suffice — don't pay GraphRAG's indexing cost needlessly.
- **Pick global vs local search** by whether the question spans the whole corpus or a specific entity.
- **Budget for expensive indexing** and **tune extraction prompts** to your domain (garbage entities → garbage graph).
- **Consider hybrid** — graph structure + vector retrieval together.
- **Re-index** when documents change materially (the graph/summaries go stale).

## Pitfalls (in understanding/using)

- Using GraphRAG for **simple local Q&A** → paying heavy indexing cost where vector RAG suffices.
- Expecting **vector RAG** to answer **global/whole-corpus** questions → it retrieves isolated chunks; it structurally can't.
- Underestimating **indexing cost** (LLM over the whole corpus) → surprise token bills and latency.
- Poor **entity-extraction prompts** → a noisy/wrong graph → bad answers (garbage in, garbage out).
- Confusing **global** (community summaries, whole corpus) with **local** (entity traversal) search — using the wrong one for the question.
- Letting the graph/summaries go **stale** as documents change.
