---
name: how-cpu-scheduling-works
description: How OS process/thread scheduling works — time slicing and context switches, preemptive multitasking, scheduling goals (throughput vs latency vs fairness), common algorithms (round-robin, priority, CFS/fair scheduling), I/O-bound vs CPU-bound, and priority inversion. Use to understand how the OS runs many processes on few cores, context switches, or scheduling latency.
category: engineering
keywords_vi: cpu scheduling hoạt động thế nào, lập lịch tiến trình, time slice context switch, đa nhiệm preemptive, round robin priority, cfs fair scheduler, i/o bound cpu bound
---

# How CPU Scheduling Works

A computer has a few CPU cores but runs hundreds of processes/threads "at once." The OS **scheduler** creates that illusion by rapidly switching cores between tasks, deciding **who runs next and for how long**. It's a constant balancing act between competing goals.

## Time Slicing & Context Switches

Each runnable thread gets a small **time slice** (quantum, ~ms). When it expires (or the thread blocks), the scheduler performs a **context switch**: save the current thread's registers/state, load the next thread's, and resume it. Do this fast enough and every task appears to run continuously. Context switches aren't free — they cost cycles and **pollute CPU caches** (see how-cpu-caches-work), so switching too often hurts throughput.

## Preemptive Multitasking

Modern OSes are **preemptive**: a timer interrupt lets the OS forcibly take the CPU back from a thread, so one runaway thread can't hog the machine (unlike old cooperative multitasking, where a stuck program froze everything). Preemption is what keeps the UI responsive while background work runs.

## The Competing Goals

No scheduler optimizes everything at once; it trades off:
- **Throughput** — total useful work done.
- **Latency/responsiveness** — how quickly interactive tasks react (you want your keystroke handled *now*).
- **Fairness** — every task gets a reasonable share; no starvation.
- **Priority** — important work runs preferentially.
A batch server favors throughput; a desktop favors responsiveness.

## I/O-Bound vs CPU-Bound

- **CPU-bound** tasks want long slices to crunch numbers.
- **I/O-bound** tasks (waiting on disk/network) use the CPU briefly then block. Schedulers **favor I/O-bound/interactive tasks** with quick turnaround (boost their priority) because they'll soon block anyway — this keeps interactive apps snappy while CPU-bound work fills the gaps.

## Common Algorithms

- **Round-robin** — each ready task gets a fixed slice in turn (simple, fair).
- **Priority scheduling** — higher-priority tasks run first (risk: **starvation** of low-priority tasks; mitigated by **aging** — raising priority over waiting time).
- **Fair schedulers (Linux CFS)** — track how much CPU each task has received and run the one that's "furthest behind" its fair share → good fairness + interactivity without fixed slices. Newer Linux uses EEVDF in a similar spirit.
- **Multilevel feedback queues** — adjust a task's priority based on observed behavior (interactive vs CPU-hungry).

## Priority Inversion (a famous gotcha)

A high-priority task waits on a lock held by a low-priority task, which never gets scheduled because a medium-priority task keeps running — the high-priority task is effectively blocked by a lower one. Fixed with **priority inheritance** (temporarily boost the lock holder). Famously hit the Mars Pathfinder.

## Pitfalls (in understanding/using)

- Creating **far more threads than cores** expecting linear speedup — you just add context-switch overhead and contention (see concurrency-and-parallelism).
- Busy-waiting/spinning instead of blocking → wastes slices the scheduler could give others.
- Assuming your thread runs continuously — it's interleaved; don't rely on timing.
- Ignoring that context switches trash caches (batch work, reduce switching in hot paths).
- Relying on thread priorities for correctness (they bias scheduling, they don't guarantee ordering).
