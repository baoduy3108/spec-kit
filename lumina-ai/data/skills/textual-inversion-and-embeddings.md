---
name: textual-inversion-and-embeddings
description: How textual inversion works — teaching an image model a new concept (a specific style, object, or person) by learning a new "word" embedding from a few example images, without changing the model weights, and how it compares to LoRA/DreamBooth. Use to understand textual inversion, embeddings for image models, custom concepts/styles, or textual inversion vs LoRA.
category: engineering
keywords_vi: textual inversion và embedding cho vẽ ảnh, dạy model khái niệm mới bằng vài ảnh, học một từ mới embedding không đổi trọng số, so với lora dreambooth, phong cách nhân vật riêng
---

# Textual Inversion and Embeddings (Image Models)

Textual inversion is a lightweight way to teach an image model a **new concept** — a particular art style, object, or person — from just a **few example images**, by learning a new "word" (embedding) rather than retraining the model. It's one of several **customization** techniques (alongside LoRA and DreamBooth) for making a model generate *your* specific thing (see how-diffusion-models-work, how-lora-fine-tuning-works).

## The Problem: The Model Doesn't Know Your Specific Thing

A base image model knows general concepts but not **your** character, **your** product, or a **specific** niche style. You want to reference it in prompts and have the model reproduce it consistently. Retraining the whole model is expensive; you need a cheap way to add a concept.

## The Core Idea: Learn a New "Word", Not New Weights

Recall that a prompt is turned into **embeddings** (vectors) before conditioning the model (see how-word-embeddings-work, how-diffusion-models-work). Textual inversion **freezes the entire model** and instead **learns a new embedding vector** — a new pseudo-word (like `<my-style>`) — that, when placed in a prompt, points the model at the concept from your example images:
1. Provide a few images of the concept (a style, object, subject).
2. **Optimize only the new embedding** so that generating with that pseudo-word reproduces the concept — the model weights **never change**.
3. Now use `<my-style>` in any prompt: "a castle in the style of `<my-style>`".

Because you're only learning a tiny vector (a few KB), textual inversion files are **very small** and portable, and you can stack several in one prompt.

## Textual Inversion vs LoRA vs DreamBooth

Three common ways to customize, trading size/power:
- **Textual inversion** — learns a **new embedding** only (model frozen). **Tiny** (KB), fast, composable — but **limited capacity**: great for **styles** and simple concepts, weaker at complex/novel subjects the model can't already almost-represent.
- **LoRA** — learns small **low-rank weight adapters** (see how-lora-fine-tuning-works). **Bigger** (MBs) and more **powerful** — captures subjects/styles/characters more faithfully; the popular middle ground.
- **DreamBooth** — **fine-tunes the model weights** on your concept. **Most powerful/faithful** but **large** (GBs) and heavier to train, and can overfit / degrade other capabilities.
Rough rule: **textual inversion for styles and light concepts, LoRA for most custom subjects/characters, DreamBooth when you need maximum fidelity** and can afford the cost.

## Design Guidance

- **Textual inversion for styles / simple concepts** — cheap, tiny, stackable.
- **LoRA for characters/subjects** needing more fidelity (see how-lora-fine-tuning-works).
- **Curate training images** — consistent, varied examples of just the concept (background/lighting variety helps generalization).
- **Don't over-train** — overfitting makes the concept rigid or leaks training-image artifacts.
- **Stack** an embedding + LoRA + prompt for combined control.
- **Match the base model** — an embedding/LoRA trained for one base model won't work well on another.

## Pitfalls (in understanding/using)

- Expecting textual inversion to capture **complex novel subjects** as well as LoRA/DreamBooth → it has limited capacity (best for styles).
- **Poor/inconsistent** training images → a muddy or unreliable concept.
- **Over-training** → overfitting, rigid outputs, or leaked artifacts from the training set.
- Using an embedding/LoRA on the **wrong base model** → it doesn't reproduce the concept.
- Confusing the three: **textual inversion** (new word), **LoRA** (weight adapters), **DreamBooth** (full fine-tune) — different size/power.
- Thinking it **changes the model** — textual inversion leaves weights untouched (only a new embedding).
