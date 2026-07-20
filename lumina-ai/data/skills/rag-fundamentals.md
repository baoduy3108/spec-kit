---
name: rag-fundamentals
description: Retrieval-Augmented Generation — ground an LLM's answers in retrieved documents instead of its parametric memory. Covers chunking, embedding + vector search, retrieval, reranking, stuffing context, and citing sources, plus why RAG reduces hallucination and handles fresh/private data. Use when building a chatbot/assistant over your own documents or reasoning about grounding LLM answers.
category: ai-agent
keywords_vi: rag, retrieval augmented generation, chatbot trên tài liệu, grounding llm, chunking embedding vector search, giảm bịa hallucination, trích dẫn nguồn, hỏi đáp tài liệu riêng
---

# RAG Fundamentals

Retrieval-Augmented Generation feeds an LLM relevant retrieved text at query time so it answers from **grounded sources** rather than only its trained-in (and possibly stale or hallucinated) memory. It's the standard way to build assistants over private or up-to-date documents.

## Why RAG

An LLM's knowledge is frozen at its training cutoff and it can't know your private data. RAG solves both by **retrieving** the relevant passages and putting them in the prompt: the model answers from what's in front of it. Benefits: fresh/private knowledge without retraining, **reduced hallucination** (grounded in real text), and **citations** (you know which source each claim came from). It's usually cheaper and faster to update than fine-tuning.

## The Pipeline

**Indexing (offline):**
1. **Chunk** documents into passages (a few hundred tokens; split on semantic boundaries — headings/paragraphs — not mid-sentence; some overlap preserves context).
2. **Embed** each chunk into a vector (see vector-embeddings) capturing its meaning.
3. **Store** vectors in a vector database/index.

**Querying (online):**
4. **Embed the query** and **retrieve** the top-k most similar chunks (nearest-neighbor search).
5. Optionally **rerank** the candidates with a stronger model for precision.
6. **Stuff** the retrieved chunks into the prompt with instructions to answer *only* from them and **cite** sources.
7. The LLM generates a grounded, cited answer.

## What Makes or Breaks It

- **Chunking** — too big dilutes relevance and wastes context; too small loses context. This is the most impactful knob.
- **Retrieval quality** — garbage retrieved → garbage answer. **Hybrid search** (keyword/BM25 + vector) beats vector-alone for exact terms/names; **reranking** boosts precision.
- **Grounding instructions** — tell the model to say "I don't know" if the context doesn't contain the answer, rather than filling gaps from memory.
- **Context limits** — you can only stuff so much; retrieve tightly and rank well rather than dumping everything.

## Pitfalls

- **Bad chunking** (mid-sentence, no overlap, wrong size) → poor retrieval.
- **Vector-only search missing exact matches** (names, IDs, code) → add keyword/hybrid.
- **No "answer only from context" instruction** → the model blends in ungrounded memory and still hallucinates.
- **No citations** → users can't verify; you can't debug wrong answers.
- **Stale index** — documents changed but embeddings weren't re-indexed.
- Retrieving too much low-relevance text → the real answer gets lost (the "lost in the middle" effect).
