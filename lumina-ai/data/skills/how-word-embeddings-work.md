---
name: how-word-embeddings-work
description: How word embeddings work — representing words as dense vectors where meaning maps to geometry, learned from context (word2vec/GloVe), the distributional hypothesis, vector arithmetic on meaning, and their evolution into contextual embeddings. Use to understand word embeddings, word2vec, why words become vectors, semantic vector space, or the basis of embeddings/search.
category: ai-agent
keywords_vi: word embedding, word2vec, glove, từ thành vector dày đặc, nghĩa ánh xạ hình học, distributional hypothesis, số học vector nghĩa, contextual embedding
---

# How Word Embeddings Work

Word embeddings represent words as **dense vectors of numbers** where **semantic meaning maps to geometric position** — similar words are close together, and relationships between words become directions in the space. This idea — turning meaning into geometry — is foundational to modern NLP, semantic search, and RAG (see vector-embeddings, how-vector-databases-work, nlp-basics).

## The Problem: Words Aren't Numbers

Models work with numbers, but words are discrete symbols. A naive encoding (one-hot: each word a unique index) treats every word as **equally unrelated** to every other — "cat" is as different from "dog" as from "airplane," and the vectors are huge and sparse. That throws away all meaning. Embeddings fix this by placing words in a **continuous space where distance reflects similarity**.

## The Core Idea: Meaning From Context

The insight (the **distributional hypothesis**): *"a word is characterized by the company it keeps"* — words appearing in **similar contexts** have **similar meanings**. "cat" and "dog" show up around similar words (pet, feed, vet), so they should be near each other. Embedding methods **learn** vectors by predicting context:
- **word2vec** — train a small network to predict a word from its neighbors (CBOW) or its neighbors from the word (skip-gram). The learned hidden vectors become the embeddings.
- **GloVe** — factorize a word co-occurrence matrix.
Both learn, from massive text, dense vectors (~100–300 dims) where words used in similar contexts land close together — meaning emerges from usage statistics, no human labeling.

## Meaning as Geometry (vector arithmetic)

The famous result: relationships become **consistent directions**. The classic example: **king − man + woman ≈ queen** — the "royalty" and "gender" relationships are encoded as directions you can add/subtract. Similarly, capital-country, plural-singular, and tense relationships appear as vector offsets. This shows the space captures **real semantic structure**, not just "similar words are close." Similarity is measured by **cosine similarity** (angle between vectors — see how-vector-databases-work).

## From Static to Contextual Embeddings

Classic word embeddings (word2vec) are **static** — one fixed vector per word, so "bank" (river vs money) gets **one** blended vector, losing that words have context-dependent meaning. Modern models produce **contextual embeddings** — the vector for a word **depends on its sentence** (via transformers — see how-transformers-work), so "bank" gets different vectors in "river bank" vs "bank account." Sentence/document embeddings (used in RAG and semantic search — see vector-embeddings, rag-retrieval-and-reranking) extend this to whole passages. The core idea — meaning as position in a learned vector space — carries through.

## Why It Matters

Embeddings are the bridge from text to math, powering: **semantic search** (find by meaning, not keywords — see how-vector-databases-work), **RAG** retrieval, clustering/classification, recommendation, and as the **input layer** of language models (tokens → embeddings — see how-tokenizers-work). Turning meaning into vectors is what makes all of this possible.

## Pitfalls (in understanding/using)

- Expecting **static** embeddings (word2vec) to handle **polysemy** (multiple meanings) — one vector per word blends senses; use contextual embeddings.
- Assuming any two embedding sets are **comparable** — vectors from different models live in different spaces; use the **same model** for query and documents (see how-vector-databases-work).
- Over-reading vector arithmetic — "king−man+woman=queen" is a striking pattern, not perfectly reliable for all relationships.
- Confusing **word** embeddings with **sentence/document** embeddings (different granularity for different uses).
- Ignoring **bias** — embeddings learn societal biases present in the training text (they encode usage, warts and all).
- Forgetting the metric — similarity is usually **cosine**, not raw distance (see how-vector-databases-work).
