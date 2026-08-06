---
name: how-transformers-work
description: How the transformer architecture works — self-attention letting every token weigh every other token, queries/keys/values, multi-head attention, positional encodings, why transformers replaced RNNs (parallelism + long-range context), and how they underpin LLMs. Use to understand transformers, self-attention, the architecture behind LLMs, or why attention matters.
category: ai-agent
keywords_vi: transformer, self-attention, cơ chế attention, query key value, multi-head, positional encoding, kiến trúc llm, tại sao thay thế rnn
---

# How Transformers Work

The transformer is the neural network architecture behind virtually all modern large language models (see how-llms-work) and much of modern AI. Its key innovation — **self-attention** — lets a model relate every part of an input to every other part directly, and do it in parallel.

## The Problem It Solved

Earlier sequence models (RNNs/LSTMs — see how-recurrent-networks-work) processed tokens **one at a time**, carrying a hidden state forward. This made them slow (inherently sequential, hard to parallelize) and weak at **long-range dependencies** (information from far back faded). Transformers process the whole sequence **at once** and let any token attend directly to any other, no matter the distance.

## Self-Attention (the core)

For each token, attention asks: *"which other tokens are relevant to me, and how much?"* Mechanically, each token produces three vectors:
- **Query (Q)** — what this token is looking for.
- **Key (K)** — what each token offers.
- **Value (V)** — the content each token carries.
A token's output is a **weighted sum of all tokens' Values**, where the weights come from how well its Query matches each Key (dot-product → softmax). So "it" can learn to attend strongly to the noun it refers to; a verb can attend to its subject. Every token's representation becomes a context-aware blend of the whole sequence. This dynamic, content-based weighting is what makes transformers powerful.

## Multi-Head Attention

Instead of one attention, transformers run **several in parallel** ("heads"), each learning different relationships (one head tracks syntax, another coreference, another position). Their outputs combine — richer than any single attention pattern.

## Positional Encoding

Attention itself is **order-agnostic** (it's a weighted set operation — "the cat sat" and "sat the cat" look the same to raw attention). So transformers add **positional encodings** to token embeddings, injecting *where* each token is. This restores word order, which meaning depends on.

## The Full Block & Scale

A transformer stacks many layers, each with multi-head attention + a feed-forward network (plus residual connections and normalization). Stacking lets the model build increasingly abstract representations. Because attention is parallelizable, transformers train efficiently on GPUs (see how-gpus-work) over massive data — which is exactly why scaling them up produced LLMs.

## Pitfalls (in understanding/using)

- Thinking attention "understands" — it's learned weighted mixing; capability emerges from scale + data, not explicit reasoning rules.
- Ignoring the **quadratic cost** of attention — every token attends to every token, so compute/memory grow with sequence length² (the core reason context windows are limited/expensive).
- Forgetting **positional encoding** — without it, order is lost.
- Assuming more heads/layers always help — returns diminish; architecture and data quality matter.
- Confusing the transformer (architecture) with the LLM (a large transformer trained on text — see how-llms-work).
