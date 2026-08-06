---
name: crdts-and-local-first-sync
description: Conflict-free Replicated Data Types (CRDTs) and local-first software — data structures (via Yjs/Automerge) that let multiple devices edit offline and merge automatically without conflicts or a central server as the source of truth, always converging to the same state. Covers the local-first principles, why CRDTs beat last-write-wins/OT for merge, and their costs (metadata growth, no global invariants). Use to understand CRDTs, local-first sync, real-time collaboration, or offline-editable apps.
category: distributed-systems
keywords_vi: crdt hợp nhất không xung đột, local-first đồng bộ nhiều thiết bị, yjs automerge, chỉnh sửa offline tự merge, hội tụ cùng một trạng thái, cộng tác thời gian thực không cần server làm chủ
---

# CRDTs & Local-First Sync

Most apps make the **server the source of truth**: you're offline → you can't work; two people edit at once → conflicts or "last write wins" clobbers data. **Local-first software** flips this: **your device holds the real data**, works fully **offline**, and syncs **peer-to-peer or through a relay** whenever connected — and **CRDTs** are the data structures that make the merge **automatic and conflict-free** (see offline-first-mobile-sync, distributed-systems-fundamentals, how-git-works).

## The Core Guarantee

A **CRDT (Conflict-free Replicated Data Type)** is a data structure where **concurrent edits from any replicas merge deterministically to the same result**, regardless of order or how many times a change is applied. Formally the merge is commutative, associative, and idempotent → all replicas **converge** (strong eventual consistency) with **no central coordinator and no manual conflict resolution**. Libraries like **Yjs** and **Automerge** implement CRDTs for text, lists, maps — the backbone of Google-Docs-style collaboration that also works offline.

## Why CRDTs Beat the Alternatives

- **vs last-write-wins** — LWW silently **loses** the other edit; a CRDT keeps both intents (e.g. two inserts into a list both survive, ordered deterministically).
- **vs Operational Transform (OT)** — OT (classic Google Docs) needs a **central server** to transform operations and is notoriously hard to get right; CRDTs merge **peer-to-peer** without that server, with simpler correctness.
- **vs manual conflict UI** — no "resolve conflict" dialog; merge just works.

## Local-First Principles (the "why")

- **Fast** — reads/writes are local, no network round-trip.
- **Offline-capable** — full functionality with no connection; sync later.
- **Multi-device & collaborative** — edits from phone + laptop + a teammate all converge.
- **Ownership/longevity** — data lives with the user, not locked in one server; survives the vendor.
- **Sync is a background detail**, not a blocking operation.

## The Costs (be honest)

- **Metadata growth** — CRDTs track history/tombstones; documents can accumulate overhead (mitigated by GC/compaction, but real).
- **No global invariants** — because any replica can act independently, you **can't enforce cross-entity constraints** like "unique username" or "balance ≥ 0" purely with a CRDT; those still need a coordinating authority.
- **Merge is syntactic, not semantic** — it converges to *a* consistent state, but not necessarily the one a human would call "correct" (two people editing the same sentence merge to valid-but-maybe-odd text).
- **Not for everything** — great for documents/notes/whiteboards; wrong for money/inventory needing strong invariants.

## Design Guidance

- **Reach for a CRDT lib (Yjs/Automerge)** for collaborative/offline docs — don't hand-roll.
- **Local-first**: treat the device store as primary, sync in the background.
- **Use a relay/sync server** for discovery/persistence, but not as the *authority* on merge.
- **Keep strong-invariant data (payments, uniqueness) server-authoritative**, not in a CRDT.
- **Plan for metadata/GC** on long-lived documents.
- **Design UX for eventual convergence** — show presence/awareness, expect brief divergence.

## Pitfalls (in understanding/using)

- Using **last-write-wins** and calling it "sync" → silent data loss.
- Expecting a CRDT to enforce **global invariants** (unique/limits) → it can't; needs an authority.
- Assuming merge is **semantically perfect** → it's conflict-*free*, not intent-perfect.
- Ignoring **metadata growth** → bloated documents over time.
- Hand-rolling CRDT algorithms → subtle bugs; use battle-tested libraries.
- Forcing CRDTs onto **transactional** domains (money/stock) → wrong tool.
