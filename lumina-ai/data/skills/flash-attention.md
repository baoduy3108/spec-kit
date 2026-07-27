---
name: flash-attention
description: Why standard attention is memory-bound and how FlashAttention makes it fast — an IO-aware, exact attention algorithm that tiles the computation and never materializes the full N×N attention matrix in slow GPU memory. Use to understand the memory wall of attention, why it's O(N²) memory naively, tiling + online softmax, recomputation in the backward pass, and how it enables longer contexts.
category: ai-ml-internals
keywords_vi: flash attention chú ý nhận biết io nhanh và tiết kiệm bộ nhớ, chú ý chuẩn bị nghẽn bộ nhớ đọc ghi hbm, không tạo ma trận chú ý n bình phương đầy đủ, chia ô tiling và softmax trực tuyến online, tính lại recomputation ở lượt truyền ngược, cho phép ngữ cảnh dài hơn
---

# FlashAttention

The attention mechanism is the compute heart of a Transformer, and naively it has a nasty property: for a sequence of length **N**, it forms an **N×N** attention-score matrix. That's **O(N²) memory**, and — more importantly — the algorithm spends most of its time **reading and writing that giant matrix to slow GPU memory (HBM)**, not doing math. Attention is **memory-bandwidth-bound**, not compute-bound. **FlashAttention** computes the *exact same result* far faster by being **IO-aware**: it minimizes trips to slow memory (see how-kv-cache-works, flash-attention's siblings paged-attention-and-kv-cache-memory, how-cpu-caches-work for the memory-hierarchy intuition).

## The Real Bottleneck: The Memory Hierarchy

A GPU has a **memory hierarchy**: tiny, blazing-fast **SRAM** (on-chip, per-SM) and large, much slower **HBM** (main GPU memory). Standard attention:
1. Computes scores `S = QKᵀ` → writes the **whole N×N matrix** to HBM.
2. Reads it back to compute `softmax(S)` → writes it back.
3. Reads it again to multiply by `V`.

Each step shuttles the enormous matrix to and from HBM. The **FLOPs are cheap; the memory traffic is the cost.** So the win isn't fewer computations — it's **fewer memory round-trips**.

## The Trick: Tiling + Online Softmax

FlashAttention **never materializes** the full attention matrix. It splits Q, K, V into **blocks (tiles)** that fit in fast **SRAM**, and processes attention block-by-block in a single fused kernel:
- Load a tile of Q and a tile of K/V into SRAM.
- Compute that block's partial scores and partial output **on-chip**.
- Combine with running results using an **online (streaming) softmax** — maintaining running max and sum so it can normalize correctly **without** ever seeing all scores at once.

Because everything stays in SRAM and only the final output goes to HBM, memory traffic drops from O(N²) to roughly O(N), giving large **speedups** and **O(N) memory** — and the result is **exact**, not an approximation.

## Backward Pass: Recompute Instead of Store

Training needs the attention matrix again for gradients. Rather than store the huge matrix from the forward pass, FlashAttention **recomputes** the needed blocks on the fly during the backward pass. Recomputation costs extra FLOPs but **saves the memory traffic**, which is the bottleneck — a favorable trade (a targeted form of gradient/activation checkpointing; see gradient-checkpointing-and-activation-memory).

## Why It Matters

- **Longer contexts** — O(N) memory (not O(N²)) makes long-context training/inference feasible.
- **Faster training and inference** — big wall-clock speedups from cutting HBM traffic.
- **Exact** — unlike sparse/approximate attention, same numbers, just computed smarter. Now a default building block (FlashAttention-2/3).

## Design Guidance (for understanding/using)

- **Use a FlashAttention kernel** (built into modern frameworks) — you rarely implement it, but enabling it is a large free speedup/memory saving.
- **Think IO, not FLOPs** for attention performance — the memory hierarchy is the lens.
- **It enables long context** — combine with paged KV cache for long-sequence serving.
- **Ensure your dtype/hardware are supported** — kernels are specialized (fp16/bf16, specific GPUs); fall back gracefully.
- **Don't confuse it with sparse/linear attention** — FlashAttention is **exact**; the others change the math.

## Pitfalls (in understanding/using)

- Believing attention is **compute**-bound → it's memory-bandwidth-bound; that's why FlashAttention wins.
- Expecting FlashAttention to change results → it's **exact**; only the computation path differs.
- Materializing the N×N matrix in custom code → O(N²) memory wall on long sequences.
- Assuming it removes the O(N²) **compute** → compute is still quadratic; it removes the O(N²) **memory** and the traffic.
- Forgetting the backward pass **recomputes** → slightly more FLOPs, big memory savings; expected, not a bug.
