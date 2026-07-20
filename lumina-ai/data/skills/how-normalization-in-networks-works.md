---
name: how-normalization-in-networks-works
description: How normalization layers work in neural networks — batch norm and layer norm rescale activations to stabilize and speed up training, why deep networks need it, and why transformers use layer norm. Use to understand batch normalization, layer normalization, why normalization helps training, or stabilizing deep networks.
category: ai-agent
keywords_vi: batch norm, layer norm, chuẩn hóa trong mạng nơ ron, tái tỉ lệ activation ổn định huấn luyện, mạng sâu cần chuẩn hóa, rmsnorm
---

# How Normalization in Networks Works

Normalization layers **rescale the activations** flowing through a neural network to keep them in a stable, well-behaved range — which makes deep networks **train faster and more reliably**. They're a quiet but essential ingredient in almost every modern deep model (see how-neural-networks-work, how-transformers-work).

## The Problem: Shifting, Exploding, Vanishing Activations

As data flows through many layers, the **distribution of activations drifts** — values can grow huge, shrink toward zero, or shift around as earlier layers update during training (sometimes called "internal covariate shift"). This makes training **unstable and slow**: gradients explode or vanish (see how-backpropagation-works), and you must use tiny learning rates. Deep networks were hard to train before normalization made them well-conditioned.

## The Core Idea: Standardize the Activations

Normalization takes a set of activation values and **rescales them to a standard range** — typically zero mean and unit variance — then applies a **learned scale and shift** (so the network can undo the normalization if it needs to). By keeping activations in a consistent range at every layer:
- Gradients stay well-behaved (less exploding/vanishing).
- You can use **higher learning rates** → faster training.
- Training is more **stable** and less sensitive to initialization.
It smooths the optimization landscape so the network learns more easily.

## Batch Norm vs Layer Norm (the key choice)

The main variants differ in **what set of values** they normalize over:

- **Batch Normalization** — normalizes each feature **across the batch** (using the mean/variance of that feature over all examples in the mini-batch). Very effective in CNNs/vision. But it **depends on batch statistics**, which causes problems: it behaves differently at training vs inference (needs running averages), struggles with **small batches**, and is awkward for **variable-length sequences**.
- **Layer Normalization** — normalizes **across the features** of a **single example** (independent of other examples in the batch). Because it doesn't depend on batch statistics, it works with any batch size, behaves identically at train/inference, and handles sequences well — which is why **transformers use layer norm** (and variants like RMSNorm).

That's the practical rule of thumb: **batch norm for CNNs/vision, layer norm for transformers/sequences.**

## Placement and Variants

- **Pre-norm vs post-norm** — whether normalization goes before or after the sub-layer; pre-norm (common in modern transformers) tends to train more stably for very deep stacks.
- **RMSNorm** — a simpler, cheaper layer-norm variant (skips the mean-centering) used in many recent LLMs.
- **Residual connections** (see how-transformers-work) work **together** with normalization to enable very deep networks.

## Pitfalls (in understanding/using)

- Using **batch norm with tiny batches** → noisy, unreliable statistics; use layer/group norm instead.
- Forgetting batch norm behaves **differently** at train vs inference (uses running averages) — a classic bug when switching to eval mode.
- Applying **batch norm to sequences/transformers** where layer norm is the right choice (batch statistics are ill-defined across variable lengths).
- Thinking normalization is optional for deep networks — without it, very deep models are hard or impossible to train stably.
- Confusing **which axis** is normalized (across-batch vs across-features) — that distinction *is* the difference between batch and layer norm.
- Ignoring **placement** (pre- vs post-norm) — it affects training stability of deep stacks.
