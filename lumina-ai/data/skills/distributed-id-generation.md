---
name: distributed-id-generation
description: Generating unique IDs across many machines without a central bottleneck — the tradeoffs between auto-increment, UUID, and Snowflake-style IDs, and why time-ordered (roughly sortable) 64-bit IDs (timestamp + machine/worker id + per-ms sequence) are popular for sharded systems. Covers clock-skew/rollback hazards, sequence exhaustion, coordination-free generation, and index locality. Use to choose an ID scheme at scale, understand Snowflake IDs, or design sortable distributed identifiers.
category: system-design
keywords_vi: sinh id duy nhất phân tán, snowflake id timestamp máy sequence, id sắp xếp được theo thời gian, tránh nút cổ chai id trung tâm, so sánh auto-increment uuid snowflake, sinh id không cần điều phối, lệch đồng hồ và cạn sequence
---

# Distributed Unique ID Generation

Every large system needs to mint **unique identifiers** — for rows, orders, messages, events — and once data is **sharded across many machines**, the naive answer (a single database's auto-increment) becomes a **bottleneck and single point of failure**. Distributed ID generation is about producing IDs that are **unique, generated without central coordination, and ideally roughly time-ordered**, so they index well and can be created anywhere (see how-uuids-work, database-sharding if present, event-sourcing-cqrs, how-database-indexes-work).

## The Three Common Schemes (and their tradeoffs)

**Auto-increment (single DB counter).**
- ✅ Compact, monotonic, perfectly sortable.
- ❌ **Central bottleneck**, SPOF, doesn't work across shards; leaks volume (competitors can read your order count).

**UUID (random, 128-bit).**
- ✅ **Coordination-free** — any node generates one locally, effectively no collision.
- ❌ **Large** (128-bit), and random UUIDs (v4) have **poor index locality** — inserts scatter across a B-tree, hurting write throughput and cache. (UUID v7 fixes this by being time-ordered.)

**Snowflake-style (time-ordered 64-bit).** The popular middle ground for sharded systems.

## How Snowflake IDs Work

Pack a 64-bit integer from three parts:
- **Timestamp** (high bits) — milliseconds since a custom epoch. Because it's the most significant part, IDs are **roughly sortable by creation time**.
- **Machine / worker ID** (middle bits) — which node generated it, so different nodes never collide **without talking to each other**.
- **Sequence** (low bits) — a per-millisecond counter on that node, so a single node can mint many IDs within the same millisecond.
The result: **64-bit** (half a UUID), **coordination-free**, **time-sortable** (great index locality — new IDs append to the right of the B-tree), and decodable back into its timestamp. This is why it's a default for high-scale ID services.

## The Hazards

- **Clock skew / rollback** — the scheme *trusts the clock*. If a node's clock **jumps backward** (NTP correction), it can regenerate a timestamp range it already used → **duplicate IDs**. Mitigate: refuse to generate (wait) until the clock catches up to the last-seen timestamp; use monotonic clocks.
- **Sequence exhaustion** — if a node mints more IDs in one millisecond than the sequence bits allow, it must **wait** for the next millisecond (or you've under-sized the sequence field).
- **Worker-ID assignment** — two nodes with the **same worker ID** will collide; assigning unique worker IDs (via coordination service or config) is a real operational concern.
- **Bit budgeting** — you trade bits between timestamp range (how many years until epoch overflow), node count, and per-ms throughput. Size them for your scale.

## Design Guidance

- **Avoid a central counter** at scale — it's a bottleneck and SPOF.
- **Prefer time-ordered IDs** (Snowflake / UUIDv7) when you index on the ID — locality matters for write throughput.
- **Guard the clock** — never generate on a backward clock jump; wait it out.
- **Assign unique worker IDs** reliably; a duplicate worker id = duplicate IDs.
- **Budget the bits** for your required lifespan, node count, and per-ms rate.
- **Don't leak business volume** — sequential DB IDs expose counts; opaque IDs don't.

## Pitfalls (in understanding/using)

- Using a **single DB auto-increment** across shards → bottleneck, SPOF, can't scale writes.
- **Random UUIDs as a clustered primary key** → index fragmentation, slow inserts (use v7 / Snowflake).
- Trusting the wall clock blindly → **clock rollback = duplicate IDs**.
- **Duplicate worker IDs** from sloppy assignment → collisions across nodes.
- Under-sizing the **sequence** → throttling under burst within a millisecond.
- Assuming Snowflake IDs are **strictly** monotonic globally — they're *roughly* time-ordered, not a global total order.
