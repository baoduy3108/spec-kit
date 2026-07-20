---
name: vector-embeddings
description: Embeddings and vector search — turning text/images into vectors where distance means semantic similarity, cosine vs euclidean, approximate nearest-neighbor (ANN) indexes (HNSW, IVF) and vector databases, and uses (semantic search, RAG, recommendations, clustering, dedup). Use when working with embeddings, semantic search, or choosing a vector store/similarity metric.
category: ai-agent
keywords_vi: embedding vector, vector search, tìm kiếm ngữ nghĩa semantic, cosine similarity, vector database, ann hnsw, nearest neighbor, biểu diễn vector, gợi ý clustering
---

# Vector Embeddings & Search

An **embedding** maps a piece of content (text, image, audio) to a fixed-length vector of numbers such that **semantically similar things land close together** in that space. This turns "meaning" into geometry you can search.

## The Core Idea

A model (e.g. a sentence-embedding model) reads text and outputs a vector (say 384–1536 dimensions). "dog" and "puppy" end up near each other; "dog" and "database" far apart — even with no shared words. So you can find things by **meaning**, not keyword overlap: query "how to reset my password" matches a doc titled "account recovery steps." This is what powers semantic search and RAG retrieval.

## Similarity Metrics

- **Cosine similarity** — the angle between vectors (direction, ignoring magnitude). The usual default for text embeddings; normalize vectors and it's equivalent to dot product.
- **Euclidean (L2) distance** — straight-line distance.
- **Dot product** — used by some models. Match the metric your embedding model was trained for.

## Finding Nearest Neighbors at Scale

Comparing a query to millions of vectors exactly (brute force) is O(n·d) — too slow. **Approximate Nearest Neighbor (ANN)** indexes trade a tiny bit of accuracy for huge speed:
- **HNSW** — a navigable small-world graph; fast, high recall, memory-heavy. The common default.
- **IVF / IVF-PQ** — cluster vectors, search only nearby clusters; product quantization compresses vectors to save memory.
**Vector databases** (Pinecone, Qdrant, Weaviate, pgvector, FAISS) implement these plus filtering, metadata, and persistence. Choose based on scale, whether you need metadata filtering, and self-host vs managed.

## Uses

- **Semantic search** and **RAG retrieval** (the big ones).
- **Recommendations** — items near a user's liked items.
- **Clustering / topic discovery**, **deduplication / near-duplicate detection**, **classification** (nearest labeled example), **anomaly detection** (far from everything).

## Practical Notes & Pitfalls

- **Use the same model** for indexing and querying — embeddings from different models aren't comparable.
- **Metric mismatch** — using euclidean on vectors meant for cosine gives wrong rankings; normalize as the model expects.
- **Embeddings miss exact tokens** — IDs, rare names, exact codes may not embed well; combine with keyword search (**hybrid**).
- **Chunk size** (for text) affects what "similarity" even means — see rag-fundamentals.
- **Dimensionality/cost** — bigger vectors = better quality but more storage/compute; pick per need.
- **Re-embed on model change** — upgrading the embedding model requires reindexing everything.
