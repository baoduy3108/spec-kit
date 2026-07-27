---
name: vector-index-algorithms
description: How vector databases find nearest neighbors fast — approximate nearest neighbor (ANN) indexes like HNSW (navigable small-world graphs) and IVF (inverted file / clustering), plus product quantization for compression — and the fundamental recall-vs-speed-vs-memory trade-off vs brute-force exact search. Use to choose/tune a vector index, understand HNSW/IVF/ANN, or why vector search is approximate.
category: ai-ml-internals
keywords_vi: thuật toán index vector, hnsw ivf tìm lân cận gần đúng ann, đánh đổi recall và tốc độ bộ nhớ, đồ thị điều hướng small-world, phân cụm inverted file, product quantization nén vector
---

# Vector Index Algorithms (ANN)

RAG and semantic search need to find the vectors **closest** to a query vector among millions. **Brute force** (compare the query to every vector) is exact but O(N) per query — too slow at scale. So vector databases use **Approximate Nearest Neighbor (ANN)** indexes that return *almost always* the right neighbors, **orders of magnitude faster**, by trading a little **recall** for a lot of **speed** (see vector-embeddings, rag-retrieval-and-reranking, how-database-indexes-work).

## The Core Trade-off

Every ANN index balances three things you can't max simultaneously:
- **Recall** — fraction of the true nearest neighbors it actually returns (quality).
- **Speed** — queries per second / latency.
- **Memory** — RAM the index occupies.
Tuning knobs move you along these axes; "approximate" means you accept <100% recall to win speed/memory. For most retrieval, 95–99% recall is plenty and unnoticeable.

## HNSW (graph-based) — the popular default

**Hierarchical Navigable Small World** builds a **multi-layer graph** where each vector links to nearby vectors; upper layers are sparse "highways", lower layers dense "local roads". A search **greedily hops** from an entry point toward the query, descending layers — reaching the neighborhood in a few hops instead of scanning everything.
- ✅ Excellent recall/speed, great for high-dimensional embeddings; the go-to for many vector DBs.
- ⚙️ Knobs: `M` (links per node — higher = better recall, more memory), `efConstruction` (build quality), `efSearch` (search breadth — higher = better recall, slower).
- ❌ **Memory-heavy** (graph in RAM), slower/awkward to update-heavy or persist to disk.

## IVF (clustering-based)

**Inverted File**: cluster all vectors (k-means) into `nlist` buckets; at query time only search the `nprobe` **nearest clusters**, not all data.
- ✅ Lower memory, fast when data partitions well; scales to huge sets.
- ⚙️ Knobs: `nlist` (number of clusters), `nprobe` (clusters searched — higher = better recall, slower).
- ❌ Recall depends on clustering; boundary vectors can be missed (raise `nprobe`).

## Product Quantization (compression)

**PQ** compresses each vector into a short code (splits it into sub-vectors, quantizes each to a codebook), so millions of vectors fit in memory and distance is computed on codes — huge memory savings at some recall cost. Often **combined** (IVF+PQ) for billion-scale search.

## Design Guidance

- **Small data / need exact** → brute force (flat) is fine; don't over-engineer.
- **General high-recall retrieval** → **HNSW** (tune `efSearch` for the recall you need).
- **Very large / memory-constrained** → **IVF (+PQ)**; raise `nprobe` for recall.
- **Measure recall** against a brute-force ground truth on a sample; tune knobs to your target.
- **Match the metric** (cosine/dot/L2) to how your embeddings were trained; **normalize** if using cosine.
- **Plan for updates** — HNSW dislikes heavy churn; consider periodic rebuilds.

## Pitfalls (in understanding/using)

- Expecting **exact** results from ANN → it's approximate by design; verify recall.
- Cranking `efSearch`/`nprobe` blindly → slower with diminishing recall gains; tune to target.
- Ignoring **memory** of HNSW → OOM at scale; consider IVF/PQ.
- **Metric mismatch** (L2 index on cosine embeddings) → wrong neighbors.
- Forgetting to **normalize** vectors for cosine similarity.
- Never measuring recall → silent quality loss you can't see.
