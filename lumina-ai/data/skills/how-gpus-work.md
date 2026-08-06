---
name: how-gpus-work
description: How GPUs work — massively parallel throughput architecture (thousands of simple cores, SIMT), why they suit graphics and ML but not general code, memory bandwidth, warps/occupancy, and CPU vs GPU trade-offs. Use to understand GPUs, why GPUs accelerate ML/graphics, GPU vs CPU, parallel throughput computing, or CUDA-style programming.
category: engineering
keywords_vi: gpu, simt, warp occupancy, xử lý song song lớn, nhiều nhân đơn giản, băng thông bộ nhớ, cpu vs gpu, tăng tốc ml graphics
---

# How GPUs Work

A GPU (Graphics Processing Unit) is a **throughput** machine: instead of a few fast cores like a CPU, it has **thousands of simple cores** doing the same operation on huge amounts of data at once. This design — built for drawing millions of pixels — turns out to be exactly what deep learning needs.

## Latency vs Throughput (CPU vs GPU)

- A **CPU** optimizes **latency**: a few powerful cores with big caches, branch prediction, and out-of-order execution to finish *any one* task as fast as possible. Great for sequential, branchy, general-purpose code.
- A **GPU** optimizes **throughput**: thousands of small cores that together crunch enormous *parallel* workloads. Any single thread is slow, but you run millions of them. It hides memory latency by having so many threads ready that while some wait on memory, others compute.
Different tools: CPU for control-heavy sequential work; GPU for data-parallel number crunching.

## SIMT: Same Instruction, Many Threads

GPUs execute in **SIMT** style — groups of threads (**warps**, ~32) run the **same instruction in lockstep** on different data. This is efficient *only when threads do the same thing*. If threads in a warp take different branches (**divergence**), the GPU runs each path serially with others idle — killing performance. So GPUs love **uniform, branch-light, data-parallel** work (add these million numbers, multiply these matrices) and hate irregular, branchy control flow.

## Why GPUs Accelerate ML & Graphics

Both are drenched in the same operation: **massive matrix/vector math**.
- **Graphics** — transform millions of vertices, shade millions of pixels, all independently (see how-3d-rendering-works).
- **Deep learning** — neural networks are giant **matrix multiplications** (see how-neural-networks-work); training/inference is embarrassingly parallel. Modern GPUs even add **tensor cores** dedicated to matrix multiply.
A task that's inherently parallel maps perfectly onto thousands of cores → 10–100× speedups over a CPU.

## Memory Bandwidth Matters

Feeding thousands of cores needs enormous **memory bandwidth**; GPUs use very wide, fast memory (GDDR/HBM). Many GPU workloads are **memory-bandwidth-bound**, not compute-bound — so **data layout and reuse** (coalesced access, keeping data in fast on-chip memory) often matter more than raw FLOPs. **Occupancy** (keeping enough warps in flight to hide latency) is a key tuning concept.

## The Cost: Data Movement & Suitability

Getting data to/from the GPU over PCIe has overhead, so GPUs pay off when there's **enough parallel work** to amortize the transfer. Small or sequential tasks are often faster on the CPU. Programming them (CUDA, ROCm, shaders) means thinking in parallel and about the memory hierarchy.

## Pitfalls (in understanding/using)

- Expecting GPU speedup for **sequential/branchy** code — it needs massive data parallelism.
- **Warp divergence** (threads branching differently) silently serializing your kernel.
- Ignoring **data-transfer** overhead (CPU↔GPU) — it can dwarf the compute for small jobs.
- Being **memory-bandwidth-bound** but optimizing compute — profile; fix data layout/reuse.
- Assuming more cores = proportional speedup regardless of the problem (Amdahl's law; the parallel fraction limits it — see concurrency-and-parallelism).
- Treating a GPU as a faster CPU — it's a different model requiring parallel algorithms.
