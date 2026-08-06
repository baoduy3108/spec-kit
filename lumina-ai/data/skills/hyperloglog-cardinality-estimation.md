---
name: hyperloglog-cardinality-estimation
description: How to count the number of DISTINCT items in a huge stream using kilobytes instead of gigabytes — HyperLogLog. It estimates cardinality from the maximum run of leading zeros in item hashes, trading a few percent error for enormous memory savings, and merges across shards. Use to understand approximate distinct counting (unique visitors/IPs), the intuition behind it, mergeability, and when approximate beats exact COUNT DISTINCT.
category: systems-internals
keywords_vi: hyperloglog đếm số phần tử phân biệt distinct trong luồng lớn bằng vài kilobyte, ước lượng lực lượng cardinality từ số bit 0 dẫn đầu tối đa trong hash, đổi vài phần trăm sai số lấy tiết kiệm bộ nhớ khổng lồ, gộp merge nhiều shard cộng dồn, đếm khách truy cập duy nhất unique và ip, count distinct chính xác quá tốn bộ nhớ
---

# HyperLogLog: Cardinality Estimation

"How many **distinct** users visited today?" over billions of events is deceptively expensive: exact `COUNT DISTINCT` requires remembering **every** unique item seen (a giant hash set) — gigabytes of memory for high-cardinality data. **HyperLogLog (HLL)** answers it using a few **kilobytes**, with typically **~1–2% error**, by a clever statistical trick on hash values. It's the standard for unique counts in Redis, Presto, BigQuery, Druid, and analytics systems (see count-min-sketch, how-bloom-filters-work, cardinality-estimation-and-statistics).

## The Intuition: Rare Patterns Reveal Scale

Hash each item to a uniform random bit string. In random bits, a run of **k leading zeros** occurs with probability `1/2^k`. So:
- Seeing a hash with **1** leading zero is common.
- Seeing one with **10** leading zeros is rare — you'd expect it only after ~2¹⁰ ≈ 1000 distinct items.

So the **maximum number of leading zeros** you've observed is a (noisy) estimate of `log₂(distinct count)`: if the longest run seen is `k`, there were probably ~`2^k` distinct items. Crucially this depends only on **distinct** values — seeing the same item a million times doesn't change its hash or its leading-zero count, so duplicates are automatically ignored.

## From Noisy Guess to Accurate Estimate

One max-leading-zeros value is very noisy (one lucky hash throws it off). HLL reduces variance by **splitting into many "buckets"** (registers): use the first few hash bits to pick a bucket, track the max leading-zeros in each, then **combine** all buckets with a bias-corrected **harmonic mean**. With `m` registers the error is ~**1.04/√m**, so a few thousand tiny registers (a few KB total) gives ~1–2% error for cardinalities up to billions. Constant memory, independent of how many items you count.

## The Superpower: Mergeability

HLL sketches are **mergeable**: to combine two sketches (e.g. per-shard, per-day, per-server), take the **element-wise max** of their registers — the union's estimate, with **no double-counting** and no re-scanning raw data. This makes HLL ideal for **distributed** and **rollup** analytics: compute per-partition sketches, merge for any combination (this hour ∪ that hour, these servers ∪ those) cheaply. Exact distinct counts can't be merged like this.

## Design Guidance (for understanding/using)

- **Use HLL when exact distinct-count is too memory-heavy** and ~1–2% error is fine — unique visitors, unique IPs, distinct keys at scale.
- **Exploit mergeability** — store per-shard/per-time-bucket sketches and union them for any rollup without rescanning.
- **Size registers for your error target** — more registers = less error, still tiny memory.
- **Use exact counting for small/critical cardinalities** — HLL's error and small-range bias make it wrong for tiny sets (implementations add small-range correction / use sparse mode).
- **It answers "how many distinct", not "is X present" or "how many times X"** — that's Bloom / Count-Min.

## Pitfalls (in understanding/using)

- Expecting **exact** distinct counts → HLL is approximate (~1–2%); don't use it where exactness is required (billing).
- Using it for **membership** or **frequency** → wrong tool; that's Bloom filters / Count-Min Sketch.
- Trusting it on **very small** cardinalities → biased there; use exact or the sparse/corrected mode.
- Trying to **subtract** or intersect HLLs → only **union** (max-merge) is well-supported; set differences are unreliable.
- Assuming duplicates affect the count → they don't; that's the whole point (distinct only).
