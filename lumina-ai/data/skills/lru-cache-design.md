---
name: lru-cache-design
description: How to design an LRU cache with O(1) operations — combining a hash map (fast lookup) with a doubly-linked list (fast recency reordering/eviction), plus eviction policies (LRU/LFU/FIFO) and TTL. Use when implementing a cache, the classic LRU cache interview problem, or choosing a cache eviction policy.
category: engineering
keywords_vi: lru cache, thiết kế cache o(1), hash map cộng doubly linked list, đuổi phần tử eviction, lru lfu fifo, ttl hết hạn, bài toán cache phỏng vấn
---

# LRU Cache Design

An LRU (Least Recently Used) cache keeps a bounded number of items and, when full, **evicts the least recently used** one. It's a classic interview problem and a real building block (see caching-strategies). The challenge: make **both** `get` and `put` run in **O(1)**.

## The Requirements

- **`get(key)`** — return the value if present (and mark it as recently used), else miss.
- **`put(key, value)`** — insert/update, and if over capacity, **evict the least-recently-used** item.
- Both in **`O(1)`**.
The tension: you need **fast lookup** by key **and** fast tracking of **recency order** (to know what to evict). Neither a plain hash map (no order) nor a plain list (slow lookup) alone gives both.

## The Solution: Hash Map + Doubly-Linked List

Combine two structures:
- A **hash map** `key → node` for **O(1) lookup**.
- A **doubly-linked list** ordering nodes by **recency** — most-recently-used at the front, least-recently-used at the back.
Operations:
- **`get`** — hash-map lookup (O(1)); then **move that node to the front** of the list (mark as recently used) — O(1) with a doubly-linked list (splice out and relink using the node's prev/next pointers).
- **`put`** — insert at the front and add to the map; if over capacity, **remove the tail node** (LRU) and delete it from the map — O(1).
The **doubly**-linked list is essential: it lets you remove/move any node in O(1) given a pointer to it (which the hash map provides). A singly-linked list can't unlink a node in O(1). Many languages have a ready-made structure (Python's `OrderedDict` / `collections`, Java's `LinkedHashMap`) that implements exactly this.

## Eviction Policies (beyond LRU)

LRU is one policy; pick by access pattern:
- **LRU** — evict least-recently-used. Good general default; exploits temporal locality.
- **LFU (Least Frequently Used)** — evict the least-often-accessed. Better when some items are persistently hot regardless of recency, but more complex and can keep stale "once-popular" items.
- **FIFO** — evict oldest inserted (simple, ignores usage).
- **TTL / expiry** — evict by age regardless of use (freshness-driven — see how-http-caching-works).
Real caches often combine (LRU + TTL), and advanced ones (ARC, W-TinyLFU) balance recency and frequency.

## Pitfalls (in understanding/using)

- Using a **singly**-linked list → can't remove a node in O(1); use a **doubly**-linked list.
- Forgetting to **update recency on `get`** (not just `put`) → wrong eviction (it's *used*, so it's now recent).
- Forgetting to remove the evicted key from the **hash map** too → memory leak / stale entries.
- Reimplementing when the stdlib (`OrderedDict`/`LinkedHashMap`) already does it — use it unless you need custom behavior.
- Choosing **LRU** when access is frequency-driven (LFU may fit) — match policy to the pattern.
- Ignoring **thread safety** in a concurrent cache (needs locking or a concurrent design).
