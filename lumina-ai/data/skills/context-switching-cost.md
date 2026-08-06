---
name: context-switching-cost
description: Why having more threads than cores can make a program SLOWER — the hidden cost of context switching. Covers the direct cost (save/restore registers, kernel entry) and the larger indirect cost (cold caches and TLB after a switch), plus thundering herds, oversubscription, and why async/green threads and thread pools exist. Use to understand scheduler overhead, cache pollution, and right-sizing concurrency.
category: systems-internals
keywords_vi: chi phí chuyển ngữ cảnh context switch giữa luồng, nhiều luồng hơn số nhân làm chậm chương trình, chi phí trực tiếp lưu và khôi phục thanh ghi vào kernel, chi phí gián tiếp cache và tlb nguội sau khi chuyển, quá tải luồng oversubscription và thundering herd, async và green thread và thread pool giảm chuyển ngữ cảnh
---

# Context-Switching Cost

Intuition says "more threads = more work done in parallel". But a CPU core runs **one** thread at a time; to run more threads than cores, the OS **rapidly switches** between them, and each switch has a cost. Past a point, adding threads makes a program **slower**, not faster, because the machine spends its time *switching* instead of *computing*. Understanding this cost explains thread pools, async I/O, and why "just add threads" backfires (see io-models-and-io-uring, how-cpu-caches-work, numa-and-memory-locality).

## Two Costs: Direct and Indirect

**Direct cost (small, visible).** On a switch the kernel must: save the outgoing thread's registers and program state, enter the scheduler, pick the next thread, restore its registers, and return to user mode. That's on the order of a **microsecond** — small, but it adds up at high switch rates.

**Indirect cost (large, hidden).** This is the real killer: a thread runs fast because its data is warm in the **CPU caches** (L1/L2/L3) and its address translations are cached in the **TLB**. After a context switch, the new thread runs with **caches and TLB full of the *old* thread's data** — so it suffers a burst of **cache misses and TLB misses**, each costing many cycles, until its working set is re-warmed. If threads keep getting swapped before their data warms up, the CPU thrashes. This indirect cost often **dwarfs** the direct one, and it's invisible in a naive "switch takes 1µs" estimate.

## Oversubscription and Thrashing

Running **many more runnable threads than cores** ("oversubscription") means constant switching, cold caches, and scheduler overhead — throughput drops even though CPUs look "100% busy" (busy switching, not working). Related pathologies:
- **Thundering herd** — many threads wake at once for one event and stampede the scheduler/lock; only one proceeds, the rest switch back to sleep.
- **Lock convoying** — threads pile up switching in and out around a contended lock.

## Why Async, Green Threads, and Pools Exist

The fixes all aim to **reduce switching and keep caches warm**:
- **Thread pools** — a **bounded** number of OS threads (≈ number of cores for CPU-bound work) reused across tasks, so you don't oversubscribe.
- **Async / event loops** (epoll/io_uring) — handle thousands of connections on **a few** threads without a thread blocked (and switching) per connection — the answer to C10k.
- **Green threads / coroutines / fibers** (Go goroutines, virtual threads, async/await) — user-space scheduling that multiplexes huge numbers of logical tasks onto few OS threads, switching **cheaply in user space** without full kernel context switches, and yielding cooperatively so caches stay warmer.

## Design Guidance (for understanding/using)

- **Size CPU-bound thread pools ≈ core count** — more threads just add switching, not throughput.
- **Use async/event loops or green threads for I/O-bound concurrency** — don't spawn a blocking OS thread per connection.
- **Reduce needless wakeups/switches** — batch work, avoid thundering herds (wake one, not all), cut lock contention.
- **Keep work on the same core** where it helps (affinity) so caches/TLB stay warm; avoid gratuitous migration.
- **Measure "involuntary context switches"** — a high rate signals oversubscription/contention, not healthy parallelism.

## Pitfalls (in understanding/using)

- "More threads = faster" → beyond core count you mostly buy switching overhead and cold caches.
- Estimating switch cost as only the **direct** save/restore → the **cache/TLB** pollution is usually bigger.
- Thread-per-connection for high concurrency → oversubscription and thrash; use async/green threads.
- Seeing **100% CPU** and assuming full utilization → it may be busy **switching**, not computing.
- Ignoring thread migration across cores/NUMA nodes → repeated cache re-warming kills performance.
