---
name: how-beam-search-works
description: How beam search works — a decoding strategy that keeps the top-k most probable partial sequences at each step instead of greedily taking the single best token, balancing quality and compute; plus its trade-offs vs greedy and sampling. Use to understand beam search, sequence decoding, greedy vs beam vs sampling, or generating high-probability text/translations.
category: ai-agent
keywords_vi: how beam search works, beam search hoạt động thế nào, giữ top-k chuỗi một phần mỗi bước, thay vì greedy chọn token tốt nhất, cân bằng chất lượng compute, greedy vs beam vs sampling, dịch máy
---

# How Beam Search Works

Beam search is a **decoding strategy** for generating sequences (text, translations) from a model — deciding which tokens to actually output given the model's probabilities at each step. It sits between naive greedy decoding and full search, keeping several candidate sequences alive to find higher-quality output (see how-llms-work, how-llm-sampling-works).

## The Decoding Problem

At each step, a model gives a **probability distribution** over the next token (see how-llms-work). To generate a full sequence, you must choose tokens step by step. The naive approaches:
- **Greedy decoding** — always take the **single most probable** next token. Fast, but **short-sighted**: the locally-best token can lead to a globally-worse sequence (a slightly-lower first choice might enable a much better continuation). Greedy can't recover from that.
- **Exhaustive search** — consider *all* possible sequences to find the truly most-probable one. **Impossible** — the number of sequences explodes exponentially.
Beam search is the practical middle ground.

## The Beam Search Idea: Keep the Top-k

Beam search keeps the **k most promising partial sequences** ("beams") alive at each step (k = beam width):
1. Start with the k best first tokens.
2. At each step, for **each** of the k beams, consider its possible next tokens, giving k × vocabulary candidate continuations.
3. Score each candidate by its **cumulative probability**, and keep only the **top k** overall.
4. Repeat until sequences complete.
5. Return the highest-scoring completed sequence.
By keeping several candidates, beam search can recover from a locally-suboptimal choice that leads to a better overall sequence — exploring more of the space than greedy, without the explosion of exhaustive search. **k=1 is just greedy**; larger k explores more (better quality) at more compute.

## Trade-offs

- **k (beam width)** — bigger k = more thorough search, higher-probability output, but more compute/memory. Diminishing returns past a point.
- **Length bias** — cumulative probability shrinks with each token (multiplying probabilities <1), so beam search **favors shorter sequences** unless you apply **length normalization** — a common necessary fix.

## Beam Search vs Sampling (a key choice)

Beam search finds **high-probability** output — great for tasks with a **correct/precise** answer: **machine translation** (see how-machine-translation-works), summarization, structured output. But for **open-ended creative** generation (stories, chat), always picking the most-probable text is **bland, repetitive, and generic** — high-probability text is boring. There, **sampling** methods (temperature, top-k, top-p — see how-llm-sampling-works) that inject controlled randomness produce more diverse, natural, interesting output. So:
- **Beam search / greedy** → tasks wanting the single best/most-likely answer (translation, factual, structured).
- **Sampling** → creative, conversational, diverse generation.
Modern chat LLMs mostly **sample**; beam search remains common in translation/structured tasks.

## Pitfalls (in understanding/using)

- Using **greedy** and getting stuck in locally-optimal but globally-worse output — beam search explores alternatives.
- Using **beam search for open-ended creative** text → bland, repetitive, generic results; use sampling instead.
- Forgetting **length normalization** → beam search biased toward short outputs.
- Setting **k too high** — diminishing quality gains for growing compute/memory; or too low (≈greedy).
- Expecting beam search to guarantee the **globally** best sequence — it's a heuristic (approximate), not exhaustive.
- Confusing decoding **strategy** (how you pick tokens) with the **model** (which gives the probabilities) — same model, different decoding gives very different output.
