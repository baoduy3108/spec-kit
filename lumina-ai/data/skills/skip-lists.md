---
name: skip-lists
description: How skip lists work — a probabilistic, layered linked list giving O(log n) search/insert/delete by adding express lanes, why they're simpler than balanced trees, and where they're used (Redis sorted sets, concurrent structures). Use to understand skip lists, probabilistic data structures, an alternative to balanced trees, or Redis sorted-set internals.
category: engineering
keywords_vi: skip list, danh sách bỏ qua, linked list nhiều tầng, xác suất probabilistic, o(log n) tìm chèn, đơn giản hơn cây cân bằng, redis sorted set
---

# Skip Lists

A skip list is a clever, **probabilistic** data structure that gives `O(log n)` search, insertion, and deletion — like a balanced tree — but is far **simpler to implement** and naturally supports ordered operations. It's built entirely from linked lists with "express lanes."

## The Core Idea: Express Lanes

Start with a sorted **linked list** — search is `O(n)` (walk one by one). Skip lists add **multiple layers** on top:
- The bottom layer holds **all** elements (a normal sorted list).
- Each higher layer is a **sparser** express lane — it skips over many elements, containing a subset.
Think of a subway: the local line stops everywhere (bottom), express lines skip most stops (upper layers). To search, you ride the highest express lane until you'd overshoot, then **drop down** a level and continue — zooming close, then refining. With ~half the elements promoted to each higher level, there are `O(log n)` levels and each level advances you a lot → `O(log n)` search.

## Why Probabilistic?

When inserting an element, you randomly decide **how many levels** it appears in — typically "flip a coin: keep promoting to the next level while heads." So each element is in level 1 always, level 2 with prob ½, level 3 with prob ¼, etc. This randomization keeps the layers **balanced on average** without any explicit rebalancing logic. There's no worst-case guarantee (a terrible run of coin flips is possible) but it's `O(log n)` with **overwhelming probability** — and in practice reliably fast.

## Why Use It Over a Balanced Tree?

- **Simplicity** — no complex rotation/rebalancing code like red-black or AVL trees (see how-b-trees-work for the on-disk analog). Insert/delete just relink pointers across a few levels. Much easier to get right.
- **Ordered operations** — naturally supports range queries, "next/previous," and ordered iteration (it's a sorted list underneath).
- **Concurrency** — easier to make lock-free/concurrent than balanced trees (localized pointer updates), which is why concurrent skip lists exist (Java's `ConcurrentSkipListMap`).

## Where It's Used

- **Redis sorted sets (ZSET)** — implemented with a skip list (plus a hash) for ordered, range-queryable scores.
- **Concurrent maps** (Java's `ConcurrentSkipListMap`).
- **LevelDB/other databases** — memtables sometimes use skip lists.
Anywhere you want ordered `O(log n)` operations with simple, concurrency-friendly code.

## Pitfalls (in understanding/using)

- Expecting a **worst-case** guarantee — it's `O(log n)` *expected/with high probability*, not guaranteed (a bad random run is theoretically possible, practically negligible).
- Using more **memory** than a plain list (extra level pointers) — a space/speed trade-off.
- Reaching for a skip list when a **hash table** suffices — hashes give `O(1)` unordered lookup; skip lists shine when you need **ordering/range** queries.
- Poor random level generation (bad promotion probability) skews performance.
- Reimplementing when your language/DB already offers an ordered structure (balanced tree map, Redis ZSET).
