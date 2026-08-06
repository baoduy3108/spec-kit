---
name: how-multimodal-models-work
description: How multimodal models work — combining images, text, audio into one model by encoding each modality into a shared representation space so a language model can reason over them together, and how vision-language models "see". Use to understand multimodal AI, vision-language models, how models process images and text together, or shared embedding spaces across modalities.
category: ai-agent
keywords_vi: multimodal, đa phương thức, vision language, kết hợp ảnh văn bản âm thanh, mã hóa vào không gian biểu diễn chung, không gian embedding chia sẻ, clip
---

# How Multimodal Models Work

Multimodal models process **more than one type of input** — images, text, audio, video — in a single model, letting them reason across modalities (describe an image, answer questions about a chart, transcribe and understand speech). The core trick is to convert every modality into a **common representation** the model can operate on uniformly (see how-transformers-work, how-word-embeddings-work).

## The Problem: Different Data, One Brain

Text is discrete tokens; images are grids of pixels; audio is waveforms. These are fundamentally different data types. A language model only understands **sequences of embedding vectors** (see how-word-embeddings-work). So to let one model handle images and text together, you must **translate every modality into that same vector language** — a shared embedding space where an image patch and a word can live side by side.

## The Core Idea: Encode Each Modality into a Shared Space

The general recipe:
1. **Modality-specific encoders** — each input type has its own encoder that turns it into embeddings: a **vision encoder** (often a Vision Transformer — see how-vision-transformers-work) turns an image into a sequence of patch embeddings; an **audio encoder** turns sound into embeddings; text uses normal token embeddings.
2. **Projection into a common space** — a small "adapter"/projection layer maps each encoder's output into the **same embedding space** the language model expects, so image/audio tokens look like extra "words" to the model.
3. **A shared model reasons over the combined sequence** — the language model (transformer) attends over the concatenated text + image + audio tokens together, so it can relate them ("the object *in the image* that the *question* asks about").

So a vision-language model literally treats an image as a **sequence of tokens** prepended to the text, and attention does the rest — the same mechanism that relates words now relates words to image patches.

## Aligning the Spaces (contrastive training)

A key idea for getting modalities to "line up" is **contrastive learning** (e.g. CLIP): train on huge sets of image–caption pairs so that a matching image and text land **close together** in the shared space, and mismatched pairs land far apart. This produces aligned image/text embeddings — the foundation for image search, zero-shot classification, and feeding vision into LLMs. Text-to-image generators (see how-diffusion-models-work) use the same aligned space in reverse (text guides image generation).

## Fusion Strategies

- **Early fusion** — combine modalities at the input (concatenate tokens), letting the model attend across them from the start (common in modern vision-language LLMs).
- **Late fusion** — process each modality separately and combine at the end.
- **Cross-attention** — let the language model attend into image features via dedicated cross-attention layers.
Modern large multimodal models mostly lean toward early fusion / treating images as tokens.

## Why It Matters

Multimodality is where AI is heading: assistants that see screenshots, read documents with layout, answer questions about photos and charts, and combine vision + language + audio. The unifying principle — **everything becomes embeddings in a shared space, then a transformer reasons over them** — is what makes it all one model rather than bolted-together pieces.

## Pitfalls (in understanding/using)

- Thinking the model "sees" pixels like a human — it sees **patch embeddings**; fine detail (small text, precise counts) can be lost by the encoder.
- Assuming perfect **alignment** — image/text spaces are only approximately aligned; models still make cross-modal mistakes and hallucinate about images.
- Ignoring **resolution/tokenization** limits — images become a limited number of tokens; very high-detail or high-resolution content may be under-represented.
- Expecting equal quality across modalities — a model may be strong in text but weaker in audio/video depending on training data.
- Confusing **understanding** (image → text, like VQA) with **generation** (text → image, diffusion) — different directions, sometimes different models.
- Over-trusting OCR-like reading of images — dense text in images is a known weak spot for many vision-language models.
