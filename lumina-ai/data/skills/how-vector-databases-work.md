---
name: how-vector-databases-work
description: How vector databases work — storing embeddings and searching by similarity (nearest neighbor) instead of exact match, why brute-force doesn't scale, approximate nearest neighbor indexes (HNSW, IVF), distance metrics, and their role in RAG/semantic search. Use to understand vector databases, similarity search, ANN, HNSW, or the storage layer behind RAG.
category: ai-agent
keywords_vi: vector database, cơ sở dữ liệu vector, tìm kiếm tương đồng, nearest neighbor lân cận, approximate ann hnsw ivf, khoảng cách cosine, semantic search, lưu embedding cho rag
---

# How Vector Databases Work

A vector database stores **embeddings** (see vector-embeddings) — high-dimensional vectors representing the *meaning* of text/images — and finds items by **similarity** rather than exact match. It's the storage/retrieval engine behind semantic search and RAG (see rag-fundamentals).

## The Problem: Search by Meaning

Traditional databases find exact or keyword matches. But "how do I reset my password" and "forgot my login credentials" share no keywords yet mean the same thing. If you embed both into vectors, they land **close together** in vector space. So the query becomes: *given a query vector, find the stored vectors nearest to it* — **nearest-neighbor search**. Closeness in the space ≈ similarity in meaning.

## Distance Metrics

"Nearest" needs a distance measure:
- **Cosine similarity** — angle between vectors (most common for text embeddings; magnitude-independent).
- **Euclidean (L2)** — straight-line distance.
- **Dot product** — related, used when magnitude matters.
Use the metric the embedding model was trained for (usually cosine). This defines what "similar" means.

## Why Brute Force Doesn't Scale

Computing the distance from the query to **every** stored vector (exact search) is `O(n)` per query — fine for thousands, hopeless for millions/billions of vectors in high dimensions. And high-dimensional exact search is fundamentally hard (the "curse of dimensionality"). So vector DBs trade a little accuracy for huge speed.

## Approximate Nearest Neighbor (ANN)

The key technology is **ANN** indexes that find *almost* the nearest neighbors far faster:
- **HNSW (Hierarchical Navigable Small World)** — builds a multi-layer graph you can traverse to home in on close vectors quickly; excellent speed/recall, the popular default.
- **IVF (inverted file / clustering)** — partition vectors into clusters; search only the nearest few clusters.
- **PQ (product quantization)** — compress vectors to save memory and speed up distance computation.
These give sub-linear search at the cost of occasionally missing a true nearest neighbor (tunable **recall vs speed**). That trade-off is the heart of vector search.

## Beyond Search

Real vector DBs (Pinecone, Weaviate, Milvus, Qdrant, pgvector) add **metadata filtering** (search vectors *where* category = X), updates/deletes, persistence, and scaling. **Hybrid search** combines vector similarity with keyword/BM25 for the best of both (semantic + exact term matching).

## Role in RAG

In RAG, you embed your documents, store them in a vector DB, then at query time embed the user's question, retrieve the top-k most similar chunks, and feed them to the LLM as context. The vector DB is what makes "find the relevant passages by meaning" fast (see rag-fundamentals).

## Pitfalls (in understanding/using)

- Expecting **exact** results — ANN is approximate; tune recall vs latency (and verify recall meets your needs).
- Mismatched **distance metric** vs what the embedding model expects → poor results.
- Ignoring **metadata filtering** and hybrid search — pure vector search misses exact terms (IDs, names, codes).
- Poor **chunking** of source documents → retrieving irrelevant or truncated context (a RAG-quality issue).
- Forgetting embeddings must come from the **same model** for query and documents (different models aren't comparable).
- Underestimating memory — millions of high-dim vectors are large; use quantization/compression.
