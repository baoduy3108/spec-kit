---
name: how-uuids-work
description: How UUIDs work — 128-bit unique identifiers generated without coordination, the versions (v4 random, v1/v7 time-based), why they're practically collision-free, and the trade-offs vs sequential IDs (database index locality, sortability). Use to understand UUIDs, GUIDs, generating unique IDs, UUIDv4 vs v7, or choosing IDs for a distributed system/database.
category: engineering
keywords_vi: uuid, guid, 128 bit, v4 v7, định danh không cần phối hợp, gần như không trùng, so với id tuần tự, index locality sortable
---

# How UUIDs Work

A UUID (Universally Unique Identifier, aka GUID) is a **128-bit identifier** that can be generated **anywhere, by anyone, without coordination**, and still be practically guaranteed unique. This "generate a unique ID with no central authority" property makes them essential for distributed systems (see how-distributed-consensus-works) — no single sequence generator to bottleneck or coordinate.

## The Core Idea: Uniqueness Without Coordination

Traditional unique IDs (a database auto-increment) need a **central** authority to hand out the next number — a coordination point and bottleneck, impossible across independent machines/services generating IDs simultaneously. UUIDs solve this: each generator produces a 128-bit value with enough randomness/entropy that **collisions are astronomically unlikely**, so no coordination is needed. Two services, two databases, offline clients — all can mint IDs independently that won't clash.

## Why 128 Bits Is Enough

128 bits is a **huge** space (~3.4×10³⁸ values). For random UUIDs (v4), the probability of ever generating a duplicate is so tiny (you'd need to generate billions per second for billions of years) that collisions are ignored in practice — the "birthday paradox" math still leaves the risk negligible at any realistic scale. That's why "unique without checking" works.

## The Versions

UUIDs come in versions with different generation strategies:
- **v4 (random)** — almost entirely random bits. The most common; simple, no info leaked, unpredictable. Downside: **not sortable** and bad for database index locality (below).
- **v1 (time + MAC)** — based on timestamp + node identifier. Sortable-ish but leaks the MAC/time (privacy) — less used now.
- **v7 (time-ordered, newer)** — a timestamp prefix + randomness. Combines uniqueness with **sortability and index-friendliness** (below) while not leaking hardware info — increasingly recommended for database keys.
A few bits encode the version and variant.

## The Database Trade-off (important)

UUIDs aren't free as database primary keys:
- **Index locality** — random UUIDs (v4) scatter inserts all over the B-tree index (see how-b-trees-work), causing page splits and poor cache locality → slower inserts and bigger indexes than **sequential** IDs, which append in order. This is a real performance issue at scale.
- **Sortability** — v4 UUIDs don't sort by creation time; sequential IDs and **v7** do.
- **Size** — 128 bits vs a 64-bit integer (bigger keys, bigger indexes).
- **Readability** — long and opaque vs a small number.
**v7** (time-ordered) was designed to fix the locality/sortability problems while keeping distributed generation — often the best of both. Choose UUIDs for distributed/uncoordinated generation and non-guessability; use v7 (or similar) when they're database keys.

## Pitfalls (in understanding/using)

- Using **random (v4)** UUIDs as database primary keys at scale → poor index locality, slow inserts, bloated indexes; prefer **v7**/time-ordered or a sequential scheme.
- Assuming UUIDs are **guaranteed** unique (they're *practically* unique — collisions are negligible, not impossible) — fine in practice.
- Treating UUIDs as **secret/secure** — v4 is unguessable, but don't rely on a UUID as an auth token (see webauthn-and-passkeys, secrets-management).
- **v1** leaking MAC address/timestamp (privacy) — avoid where that matters.
- Storing UUIDs as **strings** (36 chars) instead of 16-byte binary → wasted space/index size.
- Over-using UUIDs where a simple sequential ID would do (no distributed generation need).
