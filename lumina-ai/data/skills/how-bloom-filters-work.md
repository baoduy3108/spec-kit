---
name: how-bloom-filters-work
description: How a Bloom filter works — a compact probabilistic structure that answers "is this item possibly in the set?" with no false negatives but tunable false positives, using multiple hash functions over a bit array. Covers the trade-offs and when to use it (dedup, cache-miss avoidance, membership pre-checks). Use to understand Bloom filters and space-efficient membership testing.
category: engineering
keywords_vi: bloom filter hoạt động thế nào, cấu trúc xác suất membership, kiểm tra tồn tại tiết kiệm bộ nhớ, false positive không false negative, nhiều hàm băm bit array, hiểu bloom filter
---

# How Bloom Filters Work

A Bloom filter answers "**is this item in the set?**" using a tiny fraction of the memory a real set would need — at the cost of occasional false positives. It's the go-to when you have huge sets and can tolerate "maybe."

## The Mechanism

A Bloom filter is a **bit array** (all zeros initially) plus **k hash functions**:
- **Add(x)** — hash x with all k functions to get k positions; **set those bits to 1**.
- **Query(x)** — hash x the same way; if **all k bits are 1**, x is *possibly* present; if **any bit is 0**, x is *definitely not* present.

## The Guarantee (asymmetric)

- **No false negatives** — if it says "not present," it's truly absent (you set those bits on add; a missing bit means it was never added).
- **False positives are possible** — all k bits could be 1 by coincidence from *other* items, so "possibly present" might be wrong. The false-positive rate rises as the filter fills and is **tunable** by choosing the bit-array size and number of hash functions for your expected item count. You never remove items (a standard Bloom filter can't delete — that would risk false negatives; use a counting Bloom filter variant if you must).

## When to Use It

Use it as a **cheap pre-check** in front of an expensive operation, exploiting the "definitely not present" answer:
- **Avoid pointless expensive lookups** — before a slow disk/DB/network read, check the Bloom filter; if it says "not present," skip the read entirely (databases like Cassandra use this to skip SSTables; it's the fix for cache **penetration** — see caching-strategies).
- **Deduplication at scale** — "have I seen this URL/item before?" without storing all of them (web crawlers).
- **Membership pre-filter** — quickly rule out non-members before a precise check.
The precise (slow) check only runs on the "possibly present" cases, so a small false-positive rate just means a few unnecessary precise checks — not wrong results, if you always confirm positives.

## Trade-offs

- **Massive space savings** vs a hash set (bits, not full keys) — the whole point.
- **Probabilistic** — you must be OK with false positives (and confirm them downstream if correctness requires).
- **No deletion** and **no iteration/retrieval** — it only answers membership, not "what's in it."
- Tune size/hash-count to your data; too small → high false-positive rate.

## Related Structures

Cousins for other approximate questions: **HyperLogLog** (approximate distinct count in tiny space), **Count-Min Sketch** (approximate frequencies), **Cuckoo filter** (Bloom-like but supports deletion). All trade a little accuracy for huge space savings — reach for them when exactness is too expensive at scale.
