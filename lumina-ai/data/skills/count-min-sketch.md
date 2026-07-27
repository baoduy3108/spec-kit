---
name: count-min-sketch
description: How to count frequencies of billions of distinct items in tiny fixed memory — the Count-Min Sketch. A probabilistic structure using several hash functions and a 2D counter array that estimates any item's count with bounded over-estimation error, never under-counting. Use to understand approximate frequency counting, heavy-hitters/top-K, the space-vs-accuracy trade, collisions causing overestimates, and when approximate counts beat exact ones.
category: systems-internals
keywords_vi: count-min sketch đếm tần suất tỉ item trong bộ nhớ cố định nhỏ, cấu trúc xác suất nhiều hàm băm và mảng đếm hai chiều, ước lượng có sai số chỉ đếm dư không đếm thiếu never undercount, tìm phần tử nổi trội heavy hitters top-k, đánh đổi không gian và độ chính xác, va chạm hash gây đếm dư overestimate
---

# Count-Min Sketch

Suppose you must answer "how many times has item X appeared?" over a **massive, unbounded stream** — billions of distinct URLs, IPs, search terms — where storing an exact counter per item won't fit in memory. The **Count-Min Sketch (CMS)** does it in **fixed, tiny memory** by accepting a small, **one-sided** error: it may **over**-count (never under-count), and you control how much. It's the frequency-estimation cousin of the Bloom filter (see how-bloom-filters-work, hyperloglog-cardinality-estimation, stream-processing).

## The Structure

A CMS is a 2D array of counters: `d` rows × `w` columns, with `d` independent hash functions (one per row). To **add** item X (increment its count):
- For each row `i`, hash X to a column `hᵢ(X)` and **increment** `count[i][hᵢ(X)]`.

To **query** X's estimated count:
- For each row, read `count[i][hᵢ(X)]`, and return the **minimum** across all rows.

That's it — a handful of hashes and increments per update, constant memory regardless of how many distinct items you see.

## Why "Min", and Why It Only Over-Counts

Each counter is shared by all items that hash to it, so **collisions** add other items' counts on top of X's — every cell is `X's true count + noise ≥ true count`. So every row gives an **over**-estimate. Taking the **minimum** across rows picks the row with the **least collision noise**, giving the tightest over-estimate. It can **never under-count** (X always incremented each of its cells), which is the key guarantee: the answer is between the true count and true count + bounded error. More rows (`d`) → lower probability of a bad estimate; more columns (`w`) → smaller error magnitude. You size `w`, `d` for your error/confidence target.

## What It's Great For: Heavy Hitters / Top-K

CMS shines for finding **heavy hitters** — the most frequent items (top search queries, hottest keys, DDoS source IPs, trending hashtags). The over-count bias barely matters for **big** counts (the noise is small relative to a huge true count), and rare items don't matter for top-K anyway. Combined with a small heap of candidate top items, CMS gives approximate top-K in tiny memory over an infinite stream.

## Design Guidance (for understanding/using)

- **Use CMS when exact per-item counts don't fit** and a bounded over-estimate is acceptable — heavy hitters, rate/frequency tracking, streaming analytics.
- **Size `w` (width) for error, `d` (depth) for confidence** — error ∝ 1/`w`, failure probability ∝ 1/2^`d`.
- **Trust it most for frequent items** — over-count noise is negligible against large counts; be wary of estimates for rare items.
- **Pair with a heap** for top-K; CMS estimates counts, the heap tracks the leaders.
- **Pick good independent hash functions** — correlated hashes break the error bounds.

## Pitfalls (in understanding/using)

- Expecting **exact** counts → CMS **over**-estimates; only the never-undercount guarantee is exact.
- Trusting estimates for **rare** items → collision noise can dwarf a small true count.
- Undersizing width `w` → large over-estimates; the error is proportional to total counts / `w`.
- Using it to test **membership** or count **distinct** items → that's Bloom filters / HyperLogLog, not CMS.
- Weak or correlated hash functions → violated error bounds, biased estimates.
