---
name: how-lora-fine-tuning-works
description: How LoRA (Low-Rank Adaptation) fine-tunes large models cheaply — freezing the base weights and training small low-rank adapter matrices, why it needs far less memory, merging/swapping adapters, and QLoRA. Use to understand LoRA, parameter-efficient fine-tuning (PEFT), cheaply customizing an LLM, adapters, or QLoRA.
category: ai-agent
keywords_vi: lora fine-tuning, qlora, peft, low-rank adapter, đóng băng base weight huấn luyện adapter, parameter-efficient fine-tuning, merge swap adapter, lora adapter
---

# How LoRA Fine-Tuning Works

LoRA (Low-Rank Adaptation) is the dominant technique for **cheaply customizing** large models. Full fine-tuning of a big LLM requires updating **all** its billions of weights — needing enormous GPU memory and producing a full-size copy per task. LoRA achieves similar customization by training **tiny add-on matrices** instead, making fine-tuning accessible on modest hardware.

## The Problem: Full Fine-Tuning Is Expensive

Fully fine-tuning an LLM means computing and storing gradients and optimizer state for **every** parameter — many times the model's size in memory (often needing multiple high-end GPUs), and you get a **whole new copy** of the model per fine-tuned task (huge storage). For most customization this is overkill and out of reach.

## The Core Idea: Low-Rank Adapters

LoRA's insight: the **change** a fine-tune makes to the weights has **low intrinsic rank** — it can be well-approximated by a small, low-rank update rather than modifying the full weight matrix. So LoRA:
- **Freezes** the original (pretrained) weights entirely — they don't change.
- For chosen layers, adds a small **low-rank adapter**: instead of updating the big weight matrix `W`, it learns two small matrices `A` and `B` (with a small rank `r`) whose product `B·A` is the *update*. The effective weight becomes `W + B·A`.
- **Only `A` and `B` are trained** — a tiny fraction of the parameters (often <1%).
Because you train only these small matrices, memory and compute drop dramatically, and the base model is untouched.

## Why It's So Much Cheaper

- **Memory** — you only compute gradients/optimizer state for the tiny adapters, not the frozen billions → fine-tune on a single consumer GPU.
- **Storage** — a LoRA adapter is **megabytes**, not gigabytes. You store many task-specific adapters cheaply and keep **one** base model.
- **Speed** — fewer trainable parameters = faster training.
It's the main **parameter-efficient fine-tuning (PEFT)** method for exactly these reasons.

## Merging & Swapping Adapters

- **Swap** — because the base is frozen and the adapter is separate, you can **hot-swap** different LoRA adapters on the same base model to switch behaviors/tasks, or serve many fine-tunes from one base (efficient multi-tenant serving).
- **Merge** — you can **fold** the adapter into the base weights (`W ← W + B·A`) to get a standalone fine-tuned model with **no inference overhead** (the addition is baked in).

## QLoRA

**QLoRA** combines LoRA with **quantization** (see model-quantization): load the frozen base model in 4-bit (tiny memory) and train LoRA adapters on top in higher precision. This lets you fine-tune very large models on a single GPU — a huge accessibility win. The base is quantized-and-frozen; only the small adapters train.

## When to Use (and Not)

- **Use LoRA** — customizing an LLM's style/behavior/domain on limited hardware, many task-specific variants, personalization. The default for most fine-tuning today.
- **Consider full fine-tuning** — when you need the model to deeply learn a lot of new capability and have the resources (LoRA's low-rank update has limited capacity for very large behavior changes).
- **Consider RAG or prompting instead** — often you don't need fine-tuning at all; retrieval or good prompts suffice and are cheaper/more flexible (see fine-tuning-vs-rag-vs-prompting).

## Pitfalls (in understanding/using)

- Reaching for fine-tuning when **RAG/prompting** would do (see fine-tuning-vs-rag-vs-prompting) — fine-tuning (even LoRA) is often unnecessary.
- Expecting LoRA to teach **large amounts of new knowledge/capability** — its low-rank update has limited capacity; big changes may need full fine-tuning.
- Setting the **rank `r`** wrong — too low (underfits the adaptation) or needlessly high (loses efficiency).
- Forgetting the base must be **available/consistent** — an adapter is meaningless without its exact base model.
- Overfitting on a small fine-tune dataset (quality/quantity matter).
- Not merging when you want **zero** inference overhead (or merging when you wanted swappable adapters).
