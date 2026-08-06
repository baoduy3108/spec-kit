---
name: how-tokenizers-work
description: How LLM tokenizers work — splitting text into tokens (subword units), why subword (BPE/WordPiece) beats word- or character-level, how vocabulary is learned, token↔ID mapping, and practical effects (context limits, cost, why models miscount characters). Use to understand tokenization, tokens, BPE, why LLMs charge per token, or why models struggle with spelling/counting.
category: ai-agent
keywords_vi: tokenizer, token hóa văn bản, subword bpe wordpiece, từ vựng vocabulary, token id, giới hạn context tính phí token, tại sao llm đếm ký tự sai
---

# How Tokenizers Work

Before an LLM can process text, the text must become **tokens** — the discrete units the model actually reads. Tokenization shapes context limits, cost, and several surprising model behaviors (bad spelling/counting). Every LLM has a tokenizer (see how-llms-work).

## Why Not Just Words or Characters?

- **Word-level** — huge vocabulary, can't handle unseen/misspelled words or many languages, wastes capacity on rare words.
- **Character-level** — tiny vocabulary but sequences get very long (every letter a token) → expensive, and the model must relearn word structure from scratch.
**Subword tokenization** is the sweet spot: common words become single tokens, rare/complex words split into meaningful pieces. "unhappiness" → `un` + `happi` + `ness`. This handles any word (even novel ones) with a manageable vocabulary.

## Learning the Vocabulary: BPE

The dominant method, **Byte-Pair Encoding (BPE)** (and relatives WordPiece, Unigram), *learns* the vocabulary from a big corpus:
1. Start with characters/bytes as the base units.
2. Repeatedly find the **most frequent adjacent pair** and merge it into a new token.
3. Repeat until you reach the target vocabulary size (e.g. ~50k–100k tokens).
Result: frequent sequences (common words, word parts) become single tokens; rare things stay split into smaller pieces. Frequency drives the granularity. Byte-level BPE guarantees *any* text can be encoded (falls back to bytes), handling emoji and all languages.

## Tokens ↔ IDs

Each token in the vocabulary maps to an integer **ID**. Tokenizing produces a list of IDs; the model works with these (embedding each ID into a vector — see vector-embeddings). Decoding maps IDs back to text. So "tokens" the model sees are integers, not words.

## Practical Consequences (why this matters to you)

- **Context limits are in tokens**, not words — a token averages ~0.75 English words (fewer for code, other languages, or rare text). Non-English and code often use **more tokens** per character → less fits in the window and costs more.
- **Pricing is per token** — that's the unit APIs bill.
- **Spelling/counting weirdness** — because the model sees chunks, not letters, it can't easily "see" individual characters. This is why LLMs miscount letters ("how many r's in strawberry"), struggle with reversing strings, or fumble character-level edits — the token hides the letters.
- **Tokenization boundaries** affect behavior (a number split oddly, a word broken mid-stem).

## Pitfalls (in understanding/using)

- Estimating context/cost in **words or characters** instead of tokens — measure actual tokens (especially for code/non-English, which tokenize denser).
- Expecting reliable **character-level** operations (counting/spelling/reversing) — the model doesn't see characters cleanly.
- Assuming one tokenizer across models — vocabularies differ; token counts vary by model.
- Forgetting whitespace/formatting also consumes tokens.
- Confusing tokens with embeddings — tokenizing splits text into IDs; embedding turns IDs into vectors (a later step).
