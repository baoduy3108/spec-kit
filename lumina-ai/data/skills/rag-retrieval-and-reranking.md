---
name: rag-retrieval-and-reranking
description: How to improve RAG retrieval quality — hybrid search (vector + keyword/BM25), query expansion, the retrieve-then-rerank pattern with a cross-encoder, tuning top-k, and metadata filtering. Use to improve RAG relevance, understand hybrid search and reranking, or fix RAG retrieving the wrong passages.
category: ai-agent
keywords_vi: rag retrieval reranking, cải thiện truy xuất rag, hybrid search vector keyword bm25, query expansion, retrieve then rerank cross-encoder, top-k, metadata filtering
---

# RAG Retrieval & Reranking

Retrieval is the heart of RAG (see rag-fundamentals): if you retrieve the wrong passages, the LLM answers from wrong context — "garbage in, garbage out." Beyond basic vector search, several techniques markedly improve **which** passages you feed the model.

## Vector Search Isn't Enough Alone

Pure **semantic (vector) search** (see how-vector-databases-work) captures meaning but can **miss exact terms** — specific IDs, names, codes, rare keywords, exact phrases — because embeddings blur precise tokens. Pure **keyword search (BM25)** nails exact terms but misses paraphrases/synonyms. Each fails where the other succeeds.

## Hybrid Search

Combine both: run **vector search** (semantic) and **keyword/BM25** (lexical) and **fuse** the results (e.g. reciprocal rank fusion). You get semantic recall **and** exact-term precision — the best of both. Hybrid search is a reliable quality boost for most real corpora (docs full of product names, codes, and jargon that pure vectors fumble).

## Query Transformation

Improve the query before retrieving:
- **Query expansion** — add synonyms/related terms, or generate multiple query variants and retrieve for each (more recall).
- **HyDE** (hypothetical document embeddings) — have the LLM draft a hypothetical answer, embed *that*, and search — often matches real documents better than the terse question.
- **Sub-question decomposition** — split a complex query into parts (see agentic-rag).

## Retrieve-Then-Rerank (the big win)

A two-stage pattern that dramatically improves relevance:
1. **Retrieve** a **larger** candidate set (say top-50) cheaply with vector/hybrid search — optimize for **recall** (get the relevant ones *somewhere* in the set).
2. **Rerank** those candidates with a **cross-encoder** — a model that scores each (query, passage) **pair together** for relevance. Cross-encoders are far more accurate than the bi-encoder embeddings used for initial retrieval (they attend to query and passage jointly), but too slow to run over the whole corpus — so you only run them on the ~50 candidates.
Then feed the **top few reranked** passages to the LLM. This "cast a wide net, then precisely rank" pattern fixes most "relevant doc was retrieved but ranked too low to include" problems.

## Tuning top-k & Filtering

- **top-k** (how many chunks to send the LLM) — too few misses context; too many adds noise and cost and can bury the answer ("lost in the middle" — models attend less to mid-context). Tune it; reranking lets you send fewer, better chunks.
- **Metadata filtering** — pre-filter by source/date/type/permissions before/with the vector search (see how-vector-databases-work) — both for relevance and access control.

## Pitfalls (in understanding/using)

- **Vector-only** search missing exact terms (IDs, names, codes) → use **hybrid** (add BM25).
- **No reranking** — relevant passages retrieved but ranked below the cutoff; add a cross-encoder rerank.
- **top-k too high** → noise, cost, and "lost in the middle"; **too low** → missing context. Tune (reranking helps send fewer/better).
- Sending **raw retrieval** to the LLM without relevance filtering → wrong-context answers.
- Ignoring **query transformation** for poorly-phrased or complex queries.
- Skipping **metadata filtering** (freshness, permissions) → stale or unauthorized context.
- Not **measuring** retrieval quality (recall@k, relevance) — optimize blind (see rag-evaluation).
