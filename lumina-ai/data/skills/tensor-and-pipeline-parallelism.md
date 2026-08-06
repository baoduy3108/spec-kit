---
name: tensor-and-pipeline-parallelism
description: How models too big for one GPU are split across many — the parallelism strategies. Data parallelism (replicate model, split batch), tensor parallelism (split individual layers' matrices across GPUs), pipeline parallelism (put different layers on different GPUs), and sharded data parallel (FSDP/ZeRO). Use to understand when to use each, the communication cost of each, pipeline bubbles, and how they combine (3D parallelism).
category: ai-ml-internals
keywords_vi: song song hoá mô hình quá lớn cho một gpu, song song dữ liệu data parallel chia batch, song song tensor chia ma trận trong một tầng, song song đường ống pipeline, phân mảnh trạng thái fsdp zero, bong bóng pipeline bubble
---

# Tensor & Pipeline Parallelism

A frontier model's weights, gradients, and optimizer state can be **hundreds of gigabytes** — far more than a single GPU's memory, and too slow to train on one device anyway. So training and serving large models **splits the work across many GPUs**, and there are several distinct ways to split, each with different **communication costs**. Choosing and combining them ("3D parallelism") is central to large-model systems (see how-mixture-of-experts-works, flash-attention, paged-attention-and-kv-cache-memory).

## The Four Strategies

**1. Data parallelism (DP)** — **replicate the whole model** on each GPU; split the **batch** across them. Each GPU computes gradients on its shard, then all GPUs **all-reduce** gradients to stay in sync. Simple and scalable *if the model fits on one GPU*. Communication = gradient sync each step. Doesn't help when the model itself is too big.

**2. Tensor parallelism (TP)** — split **individual layers' matrices** across GPUs. A big matmul `Y = XW` is partitioned so each GPU holds a slice of `W` and computes part of `Y`, then GPUs **combine** results (all-reduce/all-gather) **within each layer**. Lets a single layer exceed one GPU's memory. Cost: **heavy communication every layer**, so it needs **fast interconnect (NVLink)** and is usually kept **within one node**.

**3. Pipeline parallelism (PP)** — put **different layers on different GPUs** (GPU 0 = layers 1–8, GPU 1 = layers 9–16…). Activations flow forward GPU→GPU like an assembly line. Low communication (only activations at stage boundaries), works **across nodes**. Problem: the **pipeline bubble** — while GPU 0 does the first layers, later GPUs sit **idle**; fixed by splitting the batch into **micro-batches** so all stages stay busy (still some bubble).

**4. Sharded data parallel (FSDP / ZeRO)** — like DP but **shard** the model's parameters, gradients, and optimizer state across GPUs instead of replicating them, gathering each layer's params just-in-time for its forward/backward, then releasing them. Gets DP's simplicity while fitting far bigger models; ZeRO stages 1/2/3 shard progressively more state.

## Combining Them (3D Parallelism)

Real large-scale training **stacks** these: **TP within a node** (fast NVLink for the chatty per-layer comms), **PP across nodes** (cheap activation passing), and **DP/FSDP across replicas** (gradient sync). Each axis addresses a different limit — layer size (TP), model depth/memory (PP), throughput (DP).

## Design Guidance (for understanding/using)

- **Fits on one GPU?** → plain **data parallel** (or FSDP) for speed; don't over-complicate.
- **A single layer too big?** → **tensor parallelism**, kept within a fast-interconnect node.
- **Whole model too big / very deep?** → **pipeline parallelism** across nodes, with **micro-batching** to shrink the bubble.
- **Want DP simplicity but bigger models?** → **FSDP/ZeRO** to shard optimizer/gradient/param state.
- **Match split to interconnect** — put the communication-heavy axis (TP) on the fastest links.

## Pitfalls (in understanding/using)

- Using **tensor parallelism across slow links** (Ethernet, cross-node) → communication dominates; keep TP on NVLink.
- Ignoring the **pipeline bubble** → GPUs idle; use micro-batches.
- Assuming **data parallelism** helps when the model doesn't fit → it replicates, so it can't; you need TP/PP/FSDP.
- Forgetting **optimizer state** memory (Adam ~2× params) → OOM even when weights fit; shard with ZeRO/FSDP.
- Over-engineering 3D parallelism for a model that fits simply → needless complexity and slowdown.
