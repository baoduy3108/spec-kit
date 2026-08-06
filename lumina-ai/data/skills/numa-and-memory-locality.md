---
name: numa-and-memory-locality
description: Why on a multi-socket server, memory is not uniformly fast — NUMA (Non-Uniform Memory Access) — and how accessing a remote node's RAM costs more than local. Use to understand NUMA nodes, local vs remote memory latency, first-touch allocation, why pinning threads and memory to the same node matters, and how ignoring NUMA silently halves performance.
category: systems-internals
keywords_vi: truy cập bộ nhớ không đồng nhất numa trên máy nhiều socket, bộ nhớ node xa chậm hơn node cục bộ, node numa mỗi cpu có ram gần riêng, cấp phát theo lần chạm đầu first-touch, ghim luồng và bộ nhớ cùng một node, bỏ qua numa làm giảm hiệu năng âm thầm
---

# NUMA & Memory Locality

On a laptop, all RAM is equally fast from the CPU. On a **multi-socket server** (2+ physical CPUs), that stops being true. Each CPU has its **own** bank of RAM attached directly to it, and reaching **another** CPU's RAM means crossing the inter-socket interconnect — **slower and lower-bandwidth**. This is **NUMA (Non-Uniform Memory Access)**, and code written as if all memory is uniform can run at **half speed or worse** on big servers without any obvious bug (see how-cpu-caches-work, false-sharing-and-cache-line-contention, context-switching-cost).

## NUMA Nodes: Local vs Remote

The machine is divided into **NUMA nodes**, each = a CPU (its cores) + the RAM directly attached to it. A core accessing:
- **Local memory** (its own node's RAM) → **fast** (lower latency, full bandwidth).
- **Remote memory** (another node's RAM) → **slower** — the request traverses the interconnect (UPI/Infinity Fabric). Remote access can be **1.5–2×+** the latency and share limited cross-socket bandwidth.

So *where a thread runs* and *where its data lives* now interact. If a thread on node 0 keeps hammering memory physically on node 1, every access pays the remote penalty.

## First-Touch Allocation (the surprise)

Here's the subtle part: `malloc` doesn't decide which node a page lives on — **the first write does**. Under the default **first-touch** policy, a physical page is placed on the NUMA node of **whichever core first touches it**, not whoever allocated it. Consequence: if one thread allocates and initializes a big array (touching all pages), **all** those pages land on **its** node — and worker threads on other nodes then suffer remote access. The classic fix is **parallel first-touch**: have each worker initialize the portion of memory it will later use, so each region lands on the right node.

## Keeping Things Local

- **Thread + memory affinity** — pin (bind) a thread to a node and allocate its data on that node (`numactl`, `libnuma`, `mbind`, `set_mempolicy`), so its working set is local.
- **Partition by node** — shard data structures per NUMA node; avoid a single global structure hammered by all sockets (that also causes cache-coherence traffic).
- **Interleave** memory across nodes (`numactl --interleave`) for bandwidth-bound workloads that can't be neatly partitioned — averages out remote cost instead of concentrating it.
- **Let the scheduler help** — modern kernels do NUMA balancing (migrate pages/threads toward locality), but explicit affinity beats guessing for latency-critical apps.

## Where It Bites

Databases, JVMs with huge heaps, high-performance servers, and ML data loaders all care: a mis-placed heap or a cross-node thread migration can tank throughput. This is a top item in tuning big-iron performance.

## Design Guidance (for understanding/using)

- **On multi-socket boxes, treat NUMA as real** — measure local vs remote; don't assume uniform memory.
- **Use parallel first-touch** — initialize memory from the thread/node that will use it, so pages land locally.
- **Pin threads and their data to the same node** for latency-sensitive work; partition per node.
- **Interleave** for bandwidth-bound workloads that can't partition cleanly.
- **Avoid needless thread migration** across nodes — it strands a thread away from its warm caches and local memory.

## Pitfalls (in understanding/using)

- Assuming all RAM is **equally fast** on servers → remote NUMA access silently halves performance.
- Letting **one thread initialize** all memory → first-touch puts it all on one node; remote access for everyone else.
- Allowing threads to **migrate** freely across sockets → they drift away from their local memory and caches.
- A single global data structure pounded by all sockets → remote access + cache-coherence storms.
- Tuning on a laptop/single-socket box → NUMA effects don't appear until you deploy on multi-socket hardware.
