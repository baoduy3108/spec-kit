---
name: reservoir-sampling
description: How reservoir sampling works — selecting a uniform random sample of k items from a stream of unknown/huge size in one pass with O(k) memory, the replacement probability, and uses (sampling logs, big data, random pick from a stream). Use when you need a uniform random sample from a stream or list too big to hold in memory, or must pick k items in one pass.
category: engineering
keywords_vi: reservoir sampling, lấy mẫu ngẫu nhiên từ luồng, k phần tử một lần duyệt, kích thước không biết trước, bộ nhớ o(k), xác suất thay thế, sampling log dữ liệu lớn
---

# Reservoir Sampling

Reservoir sampling picks a **uniform random sample of k items** from a stream whose **length you don't know in advance** (or that's too big to fit in memory) — in a **single pass** using only `O(k)` memory. It's the elegant answer to "randomly sample from a firehose."

## The Problem

You can't just "pick k random indices" if you don't know the total count `n` (streaming logs, a huge file, a live feed), and you can't load everything into memory to shuffle. You need every item to have an **equal probability** `k/n` of being in the final sample, even though `n` is unknown until the stream ends. Reservoir sampling achieves exactly this in one pass.

## The Algorithm (k=1, then general)

**Pick one item uniformly:**
- Keep the current candidate. For the **i-th** item (1-indexed), replace the candidate with probability **1/i**.
- After processing all n items, each has probability exactly **1/n** of being the one kept. (Item i is kept if it's picked (1/i) and never replaced later.)

**General k:**
1. Put the **first k** items into the "reservoir."
2. For each subsequent item `i` (i > k): pick a random number in `[1, i]`; if it's ≤ k, **replace** that slot in the reservoir with the new item (otherwise skip it).
After the stream ends, the reservoir holds a uniform random k-sample. The magic: the replacement probability decreases just right so that early and late items end up **equally likely** — provably uniform.

## Why It Works (intuition)

As the stream grows, each new item has a **smaller** chance of entering the reservoir (1/i or k/i), which exactly compensates for the fact that early items had **more chances to be evicted**. The two effects balance so every item finishes with probability k/n. One pass, `O(k)` memory, no need to know n.

## Where It's Used

- **Sampling logs/events** — keep a representative random subset of a high-volume stream for analysis.
- **Big data** — sample rows from a dataset too large to shuffle in memory.
- **Random selection from a linked list / stream** of unknown length.
- **A/B and telemetry** sampling, load testing sample capture.
- Distributed/weighted variants (algorithm A-Res) handle weighted sampling.

## Pitfalls (in understanding/using)

- Trying to **count first, then sample** on an unknown/huge/streaming source — reservoir sampling avoids the two-pass/known-n requirement.
- Getting the **probability wrong** (replacing with a fixed probability instead of 1/i or k/i) → biased, non-uniform sample.
- Using a weak RNG where fairness matters, or the same seed producing correlated samples (see how-random-number-generation-works).
- Assuming it gives **weighted** sampling — basic reservoir is uniform; weighted needs a variant (A-Res).
- Not needing it — if the data fits in memory and n is known, a simple shuffle/`random.sample` is clearer.
- Off-by-one in the index probability (1-indexed vs 0-indexed) — a common bug.
