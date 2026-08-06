---
name: how-mixture-of-experts-works
description: How Mixture-of-Experts (MoE) models work — replacing a dense layer with many "expert" sub-networks and a router that activates only a few per token, giving huge parameter counts with far less compute per token; plus load balancing and the trade-offs. Use to understand MoE, sparse models, why some big models are cheap to run, expert routing, or Mixtral-style architectures.
category: ai-agent
keywords_vi: mixture of experts, moe router, mixtral, sparse model, nhiều expert sub-network, chỉ kích hoạt vài expert mỗi token, tham số lớn compute ít, load balancing
---

# How Mixture-of-Experts Works

Mixture-of-Experts (MoE) is an architecture that lets a model have a **huge number of parameters** while only using a **small fraction** of them for any given input — decoupling model *size* from *compute cost per token*. It's why some very large models (Mixtral, and many frontier models) are surprisingly efficient to run.

## The Core Idea: Many Experts, Few Active

In a normal ("dense") transformer, **every** parameter processes **every** token (see how-transformers-work) — so bigger = proportionally more compute. MoE changes this: it replaces a dense feed-forward layer with **many parallel "expert" sub-networks** plus a **router (gating network)**. For each token, the router **selects only a few experts** (e.g. 2 of 8) to actually run; the rest are skipped. So:
- **Total parameters** are large (all the experts exist and store knowledge).
- **Active parameters per token** are small (only the chosen few run).
This is **sparse** activation — you get the capacity of a giant model at the compute of a much smaller one per token.

## The Router

For each token, a small **gating network** scores the experts and picks the **top-k** (usually 1–2) to process that token, weighting their outputs. Different tokens go to different experts — the router learns to send tokens to the experts best suited to them (experts implicitly specialize). The router is trained jointly with the rest of the model.

## Load Balancing (the key challenge)

A naive router might send **most tokens to a few favorite experts**, leaving others unused — wasting capacity and creating bottlenecks. So MoE training adds a **load-balancing loss** that encourages the router to distribute tokens **evenly** across experts. Getting experts utilized roughly equally is essential for MoE to work — imbalanced routing is a classic failure mode.

## The Trade-offs

MoE gives cheaper compute per token, but not for free:
- **Memory** — **all** experts must be **loaded** even though only a few run per token, so MoE models use a lot of **memory/VRAM** despite low compute (you store the huge parameter count — see how-gpus-work, model-quantization).
- **Complexity** — routing, load balancing, and distributed training/serving across experts add engineering complexity.
- **Communication** — in distributed serving, tokens routed to experts on other devices incur communication overhead.
- **Training instability** — routing can be tricky to train stably.
So MoE trades **memory and complexity** for **compute efficiency and capacity** — great when you have the memory and want more capability per FLOP.

## Why It Matters

MoE lets models scale to enormous parameter counts (more knowledge/capability) while keeping inference compute (and cost/latency) manageable — a major lever behind efficient frontier models. "Total params" (big) and "active params" (small) are different numbers for MoE models.

## Pitfalls (in understanding/using)

- Confusing **total** parameters with **active** parameters — an MoE "56B" model may only run ~12B per token (cheap compute) but still needs memory for all 56B.
- Expecting MoE to be cheap on **memory** — it isn't; all experts are loaded (memory-heavy).
- **Load imbalance** — a poorly-trained router overloading a few experts (wasted capacity, bottlenecks).
- Assuming experts specialize by human-interpretable topics — specialization is emergent and often not intuitive.
- Underestimating **serving complexity** (routing, distributing experts).
- Comparing MoE and dense models by parameter count alone (misleading — compare active params for compute, total for memory).
