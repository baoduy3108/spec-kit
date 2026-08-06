---
name: clock-synchronization-and-hybrid-logical-clocks
description: How distributed databases order events using time you can't fully trust — the limits of NTP clock sync, Google's TrueTime (bounded uncertainty + commit-wait), and Hybrid Logical Clocks (HLC) that fuse physical time with a logical counter. Use to understand why physical clocks alone can't order distributed events, how CockroachDB/Spanner-style systems get causal + near-real timestamps, and clock-skew safety.
category: distributed-systems
keywords_vi: hybrid logical clock hlc, truetime commit-wait, đồng bộ đồng hồ vật lý ntp, lệch đồng hồ clock skew, sắp thứ tự sự kiện phân tán, dấu thời gian vừa nhân quả vừa gần thời gian thực
---

# Clock Synchronization & Hybrid Logical Clocks

Purely **logical** clocks (Lamport, vector) capture causality but their numbers mean nothing in wall-clock terms — you can't ask "what did the DB look like at 09:00?". Purely **physical** clocks are human-meaningful but **skewed**: NTP keeps machines within milliseconds, usually, but not always, and skew silently breaks event ordering. Modern distributed databases need timestamps that are **both** causally correct **and** close to real time. This skill covers how they get there (see vector-clocks-and-causality, how-ntp-time-sync-works, mvcc-and-snapshot-isolation).

## The Limits of NTP

**NTP** disciplines a machine's clock toward a reference over the network, but there's always **uncertainty** (network delay asymmetry, drift between syncs, occasional large corrections). Two machines can read timestamps that disagree by more than the true gap between their events — so `t_A < t_B` does **not** reliably mean A happened before B. Ordering distributed events by raw physical time is unsafe.

## TrueTime (Google Spanner)

Spanner's insight: **expose the uncertainty**. `TrueTime.now()` returns an **interval** `[earliest, latest]` guaranteed to contain the true time, with the bound kept small (a few ms) using GPS + atomic clocks in every datacenter. To make timestamps safely ordered, Spanner uses **commit-wait**: after picking a commit timestamp `t`, a transaction **waits until `t` is definitely in the past** (`t < TrueTime.now().earliest`) before releasing results. This guarantees that any transaction that *starts later in real time* gets a *larger* timestamp — **external consistency**. The cost: you pay a small wait proportional to clock uncertainty on every commit, so **tighter clocks = faster commits**.

## Hybrid Logical Clocks (HLC)

Not everyone has atomic clocks. **HLC** gives most of the benefit with commodity NTP by **fusing** physical and logical time into one timestamp `(physical_time, logical_counter)`:
- On a local event, set physical part to `max(local_physical, wall_clock)`; if physical didn't advance, bump the **logical counter**.
- On receiving a message, take the `max` of local and incoming physical parts, then bump the logical counter to stay strictly greater than both — preserving causality.

Result: HLC timestamps are **monotonic**, respect **happens-before** (like a logical clock), and stay **within NTP error of real time** (like a physical clock) — so they're human-interpretable *and* causally sound. Used by **CockroachDB** and others for MVCC timestamps and causal consistency without specialized hardware.

## Design Guidance

- **Never order distributed events by raw wall-clock** — account for skew or use HLC/TrueTime.
- **HLC** is the pragmatic default: causal + near-real, no special hardware.
- **TrueTime-style commit-wait** buys external consistency but needs tight, *bounded* clock uncertainty — invest in good time sync.
- **Keep clocks well-synced** — even HLC degrades (logical counter runs ahead) if physical clocks drift far apart; monitor skew.
- Pair timestamps with **MVCC** so a read "as of time T" is meaningful and consistent.

## Pitfalls (in understanding/using)

- Assuming NTP makes clocks **exactly** equal → residual skew still misorders events.
- Using bare `System.currentTimeMillis()` to order writes across nodes → last-write-wins bugs from skew.
- Ignoring TrueTime's **commit-wait cost** — sloppy clocks widen uncertainty and slow every commit.
- Forgetting HLC still needs reasonable physical sync — huge drift inflates the logical counter and warps timestamps.
- Treating a timestamp as proof of real-time order without knowing the clock model behind it.
