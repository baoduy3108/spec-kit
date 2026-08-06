---
name: how-consistent-hashing-works
description: How consistent hashing distributes keys across nodes so that adding/removing a node moves only a small fraction of keys — the hash ring, virtual nodes for balance, and why plain modulo hashing reshuffles everything. Use to understand distributed caches, sharding, and how systems scale nodes without mass data movement.
category: engineering
keywords_vi: consistent hashing hoạt động thế nào, băm nhất quán, phân phối key qua node, hash ring vòng băm, virtual node, thêm bớt node ít xáo trộn, sharding phân tán, hiểu consistent hashing
---

# How Consistent Hashing Works

Consistent hashing solves a specific distributed-systems problem: how to spread keys across N servers so that when N changes (a node added/removed), you move as **few keys as possible**.

## The Problem With Plain Modulo

The naive approach — `node = hash(key) % N` — works until N changes. Add or remove one server and **almost every key** maps to a different node (because the modulus changed), forcing a massive reshuffle: caches all miss at once, data must be moved en masse. This makes scaling a distributed cache/shard painful.

## The Hash Ring

Consistent hashing maps both **keys and nodes onto the same circular hash space** (a "ring," e.g. 0 to 2³²−1):
- Each **node** is placed at `hash(node)` positions on the ring.
- Each **key** is placed at `hash(key)`, and is owned by the **first node clockwise** from it.

When you **remove a node**, only the keys that belonged to *that* node move — to the next node clockwise; every other key stays put. When you **add a node**, it takes over only the keys in the arc between it and the previous node. So a change affects roughly **1/N of the keys**, not all of them. That's the whole win.

## Virtual Nodes (for balance)

With few nodes, the ring is uneven — one node can own a huge arc (load imbalance), and removing it dumps all its keys on one neighbor. The fix: give each physical node **many "virtual" positions** on the ring (hash `node#1`, `node#2`, … `node#k`). This spreads each node's ownership into many small arcs scattered around the ring, so load is even and, when a node leaves, its keys redistribute across *many* nodes rather than piling onto one. Virtual nodes also let you weight bigger machines (more virtual nodes = more keys).

## Where It's Used

- **Distributed caches** (Memcached clients, CDNs) — add/remove cache servers without invalidating the whole cache.
- **Distributed databases / sharding** (Cassandra, DynamoDB, Riak) — partition data across nodes and rebalance smoothly as the cluster grows/shrinks.
- **Load balancing** with session/cache affinity — route the same key to the same server, stably across membership changes.

## Why It Matters

It's the reason distributed caches and databases can scale nodes elastically without a global reshuffle or cache stampede. Understanding it explains how systems add capacity gracefully and why "just use modulo" doesn't survive a resize.

## Pitfalls / Notes

- **Without virtual nodes**, load skews and a departing node overloads one neighbor.
- **Hotspots** — a few extremely popular keys still concentrate on one node regardless (consistent hashing balances *keys*, not per-key traffic); handle hot keys separately.
- Choosing a good hash and enough virtual nodes matters for uniformity.
