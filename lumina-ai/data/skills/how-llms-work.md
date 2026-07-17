---
name: how-llms-work
description: How large language models work — tokenization, embeddings, the transformer and self-attention, next-token prediction and autoregressive generation, temperature/sampling, context windows and the KV cache, plus what training (pretraining + fine-tuning/RLHF) does. Use to understand LLM behavior, why they hallucinate, context limits, and inference cost.
category: ai-agent
keywords_vi: llm, mô hình ngôn ngữ, transformer, self-attention, token embedding, dự đoán token, temperature sampling, context window kv cache, vì sao ai bịa
---

# How LLMs Work

A large language model is a huge neural network trained to predict the next token; everything it does emerges from that one objective at scale.

## Tokens & Embeddings

Text is split into **tokens** (sub-word chunks — roughly ¾ of a word in English, often 1 char in some other scripts). Each token maps to an **embedding**, a high-dimensional vector; similar meanings end up near each other in that space. This is why costs and limits are counted in tokens, not characters, and why non-English text can cost more tokens.

## The Transformer & Attention

The core is the **transformer**. Its key mechanism is **self-attention**: for each token, the model computes how much to "attend to" every other token in the context, letting it weigh relevant words regardless of distance ("it" → which noun?). Stacked attention + feed-forward layers build up meaning. Attention over the whole context is why compute grows with context length.

## Generation = Next-Token Prediction

The model outputs a **probability distribution over the next token**, given all previous tokens. It picks one, appends it, and repeats — **autoregressive** generation, one token at a time. Sampling controls this:
- **Temperature** — low = pick high-probability tokens (focused, deterministic); high = more random/creative.
- **top-p / top-k** — restrict sampling to the most likely tokens.

Because it predicts *plausible* text, not *true* text, it can produce fluent, confident, wrong answers — **hallucination** is next-token prediction with no grounding, not a bug you can fully prompt away. It has no built-in fact database — only patterns learned in the weights (plus whatever you put in the context).

## Context Window & KV Cache

The **context window** is the max tokens it can attend to at once (prompt + output). Everything relevant must fit; beyond it, earlier tokens are dropped/summarized. During generation, the **KV cache** stores the attention keys/values of prior tokens so each new token doesn't recompute the whole sequence — the main memory cost of inference and why long contexts are expensive.

## Training

- **Pretraining** — predict the next token over a huge corpus; this instills language, facts, and reasoning patterns into the weights (frozen at a knowledge cutoff).
- **Fine-tuning / instruction tuning / RLHF** — further training to follow instructions and align with human preferences, turning a raw predictor into a helpful assistant.

Knowing this explains: the knowledge cutoff, why context (RAG, pasted docs) beats "memory," why token limits and cost exist, why sampling changes creativity vs reliability, and why grounding + verification matter for factual tasks.
