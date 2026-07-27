---
name: quantile-sketches-and-approximate-percentiles
description: Why computing p99 latency exactly over a stream is expensive and how quantile sketches (t-digest, DDSketch, GK) estimate percentiles in tiny memory with bounded error — and are mergeable across shards. Use to understand why you can't average percentiles, why monitoring systems use sketches, the accuracy-at-the-tail design of t-digest, relative vs rank error, and merging histograms correctly.
category: systems-internals
keywords_vi: sketch phân vị và percentile xấp xỉ p99 p999 trong bộ nhớ nhỏ, tính percentile chính xác trên luồng rất tốn bộ nhớ, t-digest ddsketch gk sai số có chặn, không được lấy trung bình của percentile, gộp merge nhiều shard cộng dồn đúng, độ chính xác cao ở đuôi phân phối tail
---

# Quantile Sketches & Approximate Percentiles

Latency dashboards live and die on **percentiles** — p50, p95, **p99**, p99.9 — because the tail is what users feel (see tail-latency-and-hedged-requests). But computing an exact percentile requires **sorting all the values**, i.e. storing every data point — impossible for a high-throughput stream of billions of measurements. **Quantile sketches** (t-digest, DDSketch, GK) estimate any percentile in **kilobytes** with **bounded error**, and — crucially — they **merge** across servers and time windows. This is how Prometheus, Datadog, and Elastic report percentiles (see hyperloglog-cardinality-estimation, count-min-sketch, stream-processing).

## Two Traps First

**1. You cannot average percentiles.** The average of each server's p99 is **not** the fleet p99 — percentiles are not linear. `avg(p99_serverA, p99_serverB)` is statistically meaningless and often very wrong. To get a correct global percentile you must combine the underlying **distributions**, not the summary numbers. This is the #1 monitoring mistake.

**2. Exact percentiles don't scale.** The p99 is "the value greater than 99% of samples" — finding it exactly needs all samples ranked. Over an unbounded stream that's unbounded memory. So real systems **approximate**.

## How Sketches Work (and t-digest's clever bit)

A quantile sketch keeps a **compact summary** of the value distribution — a set of **centroids** (clusters of nearby values with counts) or bucketed counts — from which any quantile can be estimated:
- **t-digest** — clusters values into centroids, but deliberately keeps centroids **tiny near the tails** (0th/100th percentile) and **larger in the middle**. So it's **very accurate for extreme quantiles** (p99, p99.9) — exactly where you care — and coarser at p50. It gives good **relative accuracy at the tails** in a small, fixed footprint.
- **DDSketch** — uses exponentially-sized buckets to guarantee a **relative error** bound on the *value* (e.g. the estimated p99 is within 1% of the true p99's value) — a strong, predictable guarantee that t-digest doesn't strictly give.
- **GK (Greenwald-Khanna)** — guarantees a **rank** error bound (the returned value's true rank is within ε·N of the target).

The trade you're making: a few percent error in the percentile value in exchange for **fixed tiny memory** and streaming updates.

## Mergeability (the reason they're everywhere)

Like HyperLogLog, these sketches are **mergeable**: combine per-shard/per-minute sketches into one that estimates the **global** distribution — *correctly*, unlike averaging percentiles. So each server emits a small sketch, and the monitoring backend merges them to answer "p99 across the whole fleet for the last hour" without shipping raw samples. Mergeability is what makes distributed percentile monitoring feasible.

## Design Guidance (for understanding/using)

- **Never average percentiles** — merge sketches (or histograms) and read the quantile from the combined distribution.
- **Emit sketches, not pre-computed percentiles**, from each shard so they can be merged for any rollup.
- **Pick the sketch for your guarantee** — DDSketch for a strict relative-value error bound; t-digest for great tail accuracy in tiny space; GK for rank-error bounds.
- **Care about the tail** — choose a sketch (t-digest/DDSketch) accurate at p99/p99.9, not just the median.
- **Watch histogram bucket boundaries** — fixed-bucket histograms (Prometheus) estimate percentiles only as well as their buckets allow; align buckets to your SLO thresholds.

## Pitfalls (in understanding/using)

- **Averaging** per-host percentiles → statistically wrong; merge the distributions instead.
- Storing all samples for **exact** percentiles → doesn't scale on a stream; use a sketch.
- Using a **median-accurate** sketch/histogram for **p99.9** → poor tail accuracy where it matters most.
- Coarse or misplaced **histogram buckets** → percentile estimates snap to bucket edges; align to SLOs.
- Assuming approximate = unreliable → sketches have **bounded** error; know whether it's rank error or relative-value error.
