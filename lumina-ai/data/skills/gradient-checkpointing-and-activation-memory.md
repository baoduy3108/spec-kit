---
name: gradient-checkpointing-and-activation-memory
description: Why training memory is dominated by ACTIVATIONS (not weights) and how gradient/activation checkpointing trades compute for memory — storing only a few activations and recomputing the rest during backprop. Use to understand why long sequences/big batches OOM, the memory-vs-recompute trade, how checkpointing enables larger models/batches, and its relation to FlashAttention's recomputation.
category: ai-ml-internals
keywords_vi: bộ nhớ huấn luyện bị chi phối bởi activation không phải trọng số, checkpointing gradient đánh đổi tính toán lấy bộ nhớ, chỉ lưu vài activation rồi tính lại phần còn lại khi backprop, chuỗi dài và batch lớn gây tràn bộ nhớ oom, cho phép mô hình và batch lớn hơn, tính lại recomputation ở lượt truyền ngược
---

# Gradient Checkpointing & Activation Memory

A common surprise when training deep nets: you have plenty of memory for the **weights**, yet training OOMs. The culprit is **activations** — the intermediate outputs of every layer computed in the forward pass. Backpropagation needs them to compute gradients, so by default they're **all kept in memory** until the backward pass reaches them. For deep models, long sequences, or big batches, **activation memory dwarfs weight memory** and becomes the real limit. **Gradient (activation) checkpointing** trades a bit of extra compute to slash this cost (see tensor-and-pipeline-parallelism, flash-attention, how-neural-networks-learn).

## Why Activations Dominate

Activation memory scales with **(batch size × sequence length × hidden size × number of layers)**. Weights are fixed regardless of batch/sequence, but activations **grow** with them. Train a Transformer with a long context and a large batch and the stored activations across all layers can be many times the size of the model itself. That's why "reduce the batch size" or "shorten the sequence" are the usual OOM fixes — they cut activation memory.

## The Trick: Store Little, Recompute the Rest

Normal backprop = **store all** activations (fast, memory-hungry). The other extreme = **store none**, recompute everything (tiny memory, huge compute). **Gradient checkpointing** picks a middle point: save activations only at a **few checkpoint boundaries** (e.g. every k layers, or each Transformer block's input). During the backward pass, when it needs the un-saved intermediate activations, it **recomputes them** on the fly by re-running the forward pass **from the nearest checkpoint**.

The classic result: for an N-layer network, saving checkpoints every √N layers cuts activation memory from **O(N)** to about **O(√N)**, at the cost of roughly **one extra forward pass** (~33% more compute). You buy a large memory reduction for a modest compute increase.

## The Trade-off

- **Memory ↓ a lot** — fit bigger models, longer sequences, or larger batches on the same GPU.
- **Compute ↑ a bit** — the recomputation adds forward-pass work (typically ~20–33% slower).

Use it when you're **memory-bound** (OOM, or want a bigger batch/context) and can spare the compute. Skip it when you're compute-bound and memory is fine. **FlashAttention** applies exactly this idea *specifically* to the attention matrix (recompute in backward instead of storing it).

## Design Guidance (for understanding/using)

- **Reach for checkpointing when activation memory OOMs** — it often lets you keep a useful batch size or context length you'd otherwise have to cut.
- **Checkpoint at natural boundaries** — per Transformer block is the common, effective granularity.
- **Combine with other savers** — mixed precision (see mixed-precision-training), FSDP/ZeRO for weights/optimizer, FlashAttention for attention memory.
- **Measure the compute hit** — expect ~20–33% slower; worth it to fit the model, not worth it if memory is already fine.
- **Framework support is one flag** — `torch.utils.checkpoint`, `gradient_checkpointing_enable()`; enable, don't hand-roll.

## Pitfalls (in understanding/using)

- Blaming **weights** for training OOM → it's usually **activations** (scale with batch × sequence × depth).
- Enabling checkpointing when you're **compute**-bound and memory is fine → pure slowdown for no benefit.
- Checkpointing **too aggressively** (every layer) → excessive recomputation, big slowdown.
- Expecting it to reduce **inference** memory → it's a **training** technique (backprop needs activations); inference doesn't store them the same way.
- Forgetting it stacks with mixed precision / FSDP / FlashAttention — combine for the biggest models.
