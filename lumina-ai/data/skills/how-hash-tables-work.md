---
name: how-hash-tables-work
description: How hash tables (dict/map/set) achieve O(1) lookup — the hash function mapping keys to buckets, collision handling (chaining vs open addressing), load factor and dynamic resizing, and why worst-case is O(n). Use to understand dictionaries/maps/sets, why they're fast, and their gotchas (bad hashes, mutable keys, iteration order).
category: engineering
keywords_vi: hash table, bảng băm, hàm băm, dict map set, hash function, va chạm collision, load factor, resize hashmap, o(1) lookup
---

# How Hash Tables Work

A hash table (dict/map/set) gives average **O(1)** insert, lookup, and delete — the workhorse behind most "have I seen this?", counting, and keyed-storage code.

## The Core Idea

A **hash function** turns a key into an integer, which is reduced (mod the array size) to a **bucket index**. To store `key→value`, compute the hash, go to that bucket, put it there. To look up, hash the key again and go straight to the bucket — no scanning. That direct addressing is where O(1) comes from.

## Collisions (unavoidable)

Two different keys can hash to the same bucket. Two strategies handle this:
- **Separate chaining** — each bucket holds a small list (or tree) of entries; on collision, append and scan the short list. Simple, degrades gracefully.
- **Open addressing** — on collision, probe for the next open slot (linear/quadratic probing, or Robin Hood). Cache-friendly, no per-entry list, but clustering and deletion are trickier.
Within a bucket you still compare keys with `==` (the hash narrows it down; equality confirms the match).

## Load Factor & Resizing

The **load factor** = entries ÷ buckets. As it rises, collisions and probe lengths grow, degrading toward O(n). So the table **resizes** (typically doubles) when it passes a threshold (~0.7), **rehashing** all entries into a bigger array. Resizing is O(n) but amortized O(1) per insert. This is why: dict insertion is *usually* fast but occasionally has a hiccup (a resize), and why preallocating capacity helps when you know the size.

## Why Worst Case Is O(n)

If the hash function is poor (or an attacker crafts colliding keys — a **hash-DoS**), everything lands in one bucket and lookups become a linear scan. Good hash functions distribute keys uniformly; languages use randomized seeds to resist deliberate collision attacks.

## Practical Gotchas

- **Keys must be hashable and immutable** — mutating a key after insertion changes its hash, and you'll never find it again. This is why lists can't be dict keys in Python (tuples can).
- **`hash` and `equals` must agree** — equal keys must have equal hashes (a classic bug in custom key objects: overriding equality but not hashing).
- **Iteration order** — historically unordered (don't rely on it); some languages now preserve insertion order (Python 3.7+), but that's a property, not a guarantee to lean on for logic.
- **No efficient range/sorted queries** — hash tables give point lookups only; for ordered/range queries use a tree/sorted structure.

Knowing this explains dict performance, why membership tests turn O(n²) loops into O(n), the occasional resize cost, and the "unhashable"/mutable-key errors.
