---
name: minhash-and-locality-sensitive-hashing
description: How to find similar items among billions of pairs without comparing them all — MinHash (estimate Jaccard set similarity from tiny signatures) and Locality-Sensitive Hashing (LSH, hash similar items into the same bucket). Use to understand near-duplicate detection, why hashing similar things together beats O(N²) comparison, the recall-vs-precision knob (bands/rows), and applications like dedup, plagiarism, and recommendation.
category: systems-internals
keywords_vi: minhash ước lượng độ tương đồng jaccard của tập từ chữ ký nhỏ, locality-sensitive hashing lsh băm item giống nhau vào cùng thùng, tìm gần trùng near-duplicate không so sánh mọi cặp o n bình phương, đánh đổi recall và precision qua số band và row, khử trùng dedup phát hiện đạo văn gợi ý, hàm băm cố ý gây va chạm cho item giống nhau
---

# MinHash & Locality-Sensitive Hashing

Finding **similar** items — near-duplicate documents, similar users, plagiarized text — seems to require comparing every pair, which is **O(N²)**: impossible for billions of items. **MinHash** and **Locality-Sensitive Hashing (LSH)** make it feasible by (1) compressing each item into a tiny **signature** whose comparison **estimates** true similarity, and (2) using **hash functions deliberately designed to collide** for similar items, so you only compare things that landed in the same bucket (see how-cryptographic-hashing-works, vector-index-algorithms, semantic-caching-for-llms).

## MinHash: Estimate Jaccard Cheaply

Represent each item as a **set** (a document → its set of shingles/word-n-grams). Similarity = **Jaccard** = `|A ∩ B| / |A ∪ B|`. Computing Jaccard on huge sets is expensive, so MinHash approximates it:
- Apply a hash function to every element and keep the **minimum** hash value.
- Key theorem: the probability that two sets have the **same** MinHash equals their **Jaccard similarity**.
- Use `k` independent hash functions → a **signature** of `k` min-values. The **fraction** of matching positions between two signatures **estimates** their Jaccard.

So a set of millions of elements collapses to a fixed-size signature (say 128 numbers), and comparing signatures estimates similarity in constant time. More hashes = more accurate estimate.

## LSH: Only Compare Likely-Similar Pairs

MinHash shrinks each item, but comparing all signature **pairs** is still O(N²). **LSH** removes that: hash signatures so that **similar items collide (same bucket) with high probability, dissimilar ones rarely do**. Then you only compare items **within the same bucket** — a tiny fraction of all pairs.

The standard scheme (banding): split each MinHash signature into **`b` bands of `r` rows**; hash each band separately; two items are **candidates** if they match in **any** band. Tuning `b` and `r` shapes the **S-curve** probability of becoming candidates:
- More rows per band (`r` ↑) → stricter (fewer false positives, may miss some true pairs → lower recall).
- More bands (`b` ↑) → looser (higher recall, more false positives to verify).

You pick `b`, `r` to set the **similarity threshold** where the S-curve turns on. Candidates are then **verified** with the actual similarity to drop false positives.

## What It's For

- **Near-duplicate detection / dedup** — web crawl dedup, dataset cleaning (dedup training data), storage.
- **Plagiarism / content matching**, **spam clustering**.
- **Recommendation / similar-users**, **entity resolution**.
- The set-similarity analogue of ANN vector search (which does the same for **embeddings**; SimHash/random-projection LSH handles cosine similarity).

## Design Guidance (for understanding/using)

- **Use MinHash+LSH for large-scale set/near-duplicate similarity** — avoids O(N²) by bucketing likely matches.
- **Shingle appropriately** — the set representation (word n-grams, k-shingles) defines what "similar" means; choose k for your content.
- **Tune bands/rows to your threshold** — set the S-curve so pairs above your target similarity become candidates; verify candidates exactly.
- **Match the LSH family to the metric** — MinHash for Jaccard (sets); SimHash/random hyperplanes for cosine (vectors).
- **Trade recall vs cost** — looser LSH finds more true pairs but generates more candidates to verify.

## Pitfalls (in understanding/using)

- Comparing all pairs "just to be safe" → O(N²); LSH exists precisely to avoid that.
- Treating MinHash similarity as **exact** → it's an estimate; use enough hashes and **verify** candidates.
- Mis-tuned bands/rows → either floods you with false-positive candidates or misses true near-duplicates (bad recall).
- Using **Jaccard/MinHash** for **cosine/embedding** similarity → wrong LSH family; use SimHash/ANN for vectors.
- Poor shingling (too large k → nothing matches; too small → everything matches) → meaningless similarity.
