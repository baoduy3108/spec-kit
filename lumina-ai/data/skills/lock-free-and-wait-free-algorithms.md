---
name: lock-free-and-wait-free-algorithms
description: How concurrent data structures make progress without mutexes — atomic compare-and-swap (CAS), the ABA problem, and the guarantees behind lock-free vs wait-free vs obstruction-free. Use to understand why lock-free code avoids deadlock/priority-inversion, how a CAS retry loop works, why ABA corrupts naive lock-free stacks, and when lock-free is worth its complexity.
category: systems-internals
keywords_vi: thuật toán không khoá lock-free và wait-free, atomic compare-and-swap cas vòng lặp thử lại, vấn đề aba con trỏ tái sử dụng, tránh deadlock và đảo ưu tiên không dùng mutex, đảm bảo tiến triển toàn hệ so với từng luồng, khi nào lock-free đáng độ phức tạp
---

# Lock-Free & Wait-Free Algorithms

Locks are simple but have ugly failure modes: a thread holding a lock can be **preempted** (or crash) and block everyone; locks cause **deadlock**, **priority inversion**, and **convoying**. **Lock-free** algorithms coordinate threads using **atomic instructions** instead of mutexes, so the *system as a whole always makes progress* even if individual threads stall (see memory-models-and-happens-before, false-sharing-and-cache-line-contention, how-cpu-caches-work).

## Progress Guarantees (know the ladder)

- **Obstruction-free** — a thread makes progress *if it runs alone* (no contention).
- **Lock-free** — *at least one* thread always makes progress system-wide; individual threads may retry forever (starvation possible), but the system never fully stalls.
- **Wait-free** — *every* thread finishes in a **bounded** number of steps. Strongest, hardest, rarest.

Most practical "lock-free" structures are lock-free, not wait-free. Wait-free matters for hard real-time.

## The Core Tool: Compare-And-Swap (CAS)

`CAS(addr, expected, new)` atomically: *if* `*addr == expected`, set `*addr = new` and return success; else fail. The universal pattern is a **retry loop**:

```
do:
  old = load(addr)
  new = f(old)            # compute the update
while not CAS(addr, old, new)
```

If another thread changed `addr` in between, CAS fails and you **retry** with the fresh value. No lock is held; a stalled thread just means others' CAS succeed. CAS (and LL/SC on some CPUs) is the atomic primitive everything builds on.

## The ABA Problem

CAS checks that the value is *still* `expected` — but "same value" doesn't mean "unchanged". A pointer could go **A → B → A**: thread 1 reads A, sleeps; thread 2 pops A, pushes B, frees A, then reuses the freed memory and pushes A again; thread 1 wakes, sees A, CAS **succeeds** — but the structure underneath changed, corrupting it. This is **ABA**. Fixes:
- **Tagged pointers / version counters** — pack a monotonically-increasing tag with the pointer so A-with-tag-1 ≠ A-with-tag-3 (double-width CAS).
- **Hazard pointers** or **epoch-based reclamation** — don't free memory another thread might still reference (safe memory reclamation is the *real* hard part of lock-free structures).
- **RCU** for read-mostly cases (see rcu-read-copy-update).

## Design Guidance

- **Reach for lock-free only when you've proven locks are the bottleneck** — it's dramatically harder to get right and to test.
- **Safe memory reclamation is the crux** — "when can I free this node?" is harder than the algorithm itself; use hazard pointers/epochs, don't hand-roll.
- **Prefer proven libraries** (concurrent queues/maps in your stdlib/runtime) over writing your own.
- **Beware live-lock/starvation** — lock-free ≠ fair; heavy contention can starve a thread.
- **Measure** — under low contention a good lock often beats a lock-free structure due to cache effects.

## Pitfalls (in understanding/using)

- Assuming CAS success means "nothing changed" → **ABA** silently corrupts.
- Ignoring memory reclamation → use-after-free / double-free in lock-free structures.
- Equating lock-free with wait-free → lock-free can still starve individual threads.
- Rolling your own lock-free container → almost always buggy; reuse vetted ones.
- Using lock-free everywhere for "speed" → complexity explodes; locks are fine for most code.
