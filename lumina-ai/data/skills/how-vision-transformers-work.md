---
name: how-vision-transformers-work
description: How Vision Transformers (ViT) work — splitting an image into patches, embedding each as a token, and applying transformer self-attention to "see" globally instead of locally like CNNs, plus the trade-offs vs convolutional networks. Use to understand Vision Transformers, ViT, applying transformers to images, image patches as tokens, or ViT vs CNN.
category: ai-agent
keywords_vi: vision transformer, patch token, chia ảnh thành patch, self attention nhìn toàn cục, vit vs cnn, transformer cho ảnh, patch embedding
---

# How Vision Transformers Work

Vision Transformers (ViT) apply the **transformer architecture** — originally built for text — to **images**, by treating an image as a sequence of patches. They showed that the same self-attention mechanism powering LLMs can match or beat convolutional networks (CNNs) at vision, and they're the vision backbone in most modern multimodal models (see how-transformers-work, how-multimodal-models-work).

## The Problem: Transformers Expect Sequences, Images Are Grids

Transformers operate on a **sequence of tokens** (see how-transformers-work), but an image is a 2D grid of pixels. You can't feed raw pixels as tokens — an image has far too many pixels (a 224×224 image = ~50k pixels), and attention cost grows quadratically. CNNs (see how-cnns-work) handle images with local convolution filters, but they build understanding **locally** and only see globally in deep layers. ViT asks: can we just turn an image into a reasonable-length sequence and use a plain transformer?

## The Core Idea: Patches as Tokens

The ViT recipe is elegantly simple:
1. **Split the image into fixed-size patches** (e.g. 16×16 pixels) — a 224×224 image becomes a grid of 196 patches.
2. **Flatten and linearly embed** each patch into a vector — now each patch is a "token," just like a word embedding (see how-word-embeddings-work).
3. **Add positional encodings** (see how-positional-encoding-works) so the model knows where each patch sits in the image (attention is order-blind).
4. **Feed the patch sequence through a standard transformer** — self-attention lets **every patch attend to every other patch** from the very first layer.
5. A special **[CLS] token** (or pooling) aggregates the whole image into one representation for classification.

That's it — an image becomes a short sentence of patches, and the transformer reasons over it.

## The Key Difference From CNNs: Global From the Start

The defining advantage: **self-attention is global**. In a ViT, patch 1 (top-left) can directly attend to patch 196 (bottom-right) in the **first** layer — the model relates distant parts of the image immediately. A CNN, by contrast, has a **local receptive field** that only grows with depth, so long-range relationships take many layers to form. This global view helps ViTs capture overall structure and context well.

## The Trade-off: Data Hunger

The catch: CNNs have a built-in **inductive bias** — locality and translation-invariance are baked into convolution, so they learn efficiently from **less** data. ViTs have **weaker** built-in assumptions, so they must **learn** spatial structure from scratch, which means they need **large datasets** (or heavy pretraining) to shine. On small datasets, CNNs often win; with big data / pretraining, ViTs match or exceed them. Hybrid approaches and better training (data augmentation, distillation) have narrowed this gap.

## Why It Matters

ViTs unified vision and language under **one architecture** (the transformer), which is a big deal: it means the same tooling, scaling laws, and — crucially — the ability to plug vision straight into language models. Modern **multimodal** models (see how-multimodal-models-work) use a ViT-style encoder to turn images into tokens the LLM can read. Understanding ViT is understanding how today's AI "sees."

## Pitfalls (in understanding/using)

- Expecting a ViT to work well on **small datasets** without pretraining — they're data-hungry; a CNN may be the better choice there.
- Forgetting **positional encodings** — without them the model can't tell where patches are (attention is order-blind).
- Ignoring **patch size** trade-offs — smaller patches = more tokens = finer detail but higher compute (quadratic attention cost).
- Assuming ViTs always beat CNNs — it depends on data scale and compute; CNNs remain strong and efficient, and hybrids are common.
- Losing **fine detail** — patchifying can miss small features (tiny text, thin lines); relevant to multimodal models reading images.
- Confusing the ViT **encoder** (understanding images) with **generative** image models like diffusion (see how-diffusion-models-work) — different jobs.
