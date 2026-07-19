---
name: how-llm-sampling-works
description: How LLM sampling controls generation — temperature (randomness), top-k and top-p (nucleus) truncation, repetition penalties, and how these dials trade determinism/coherence for diversity/creativity. Use to understand temperature/top-p/top-k, tuning LLM output randomness, why output varies, or controlling creativity vs consistency in generation.
category: ai-agent
keywords_vi: how llm sampling works, tham số sinh llm, temperature nhiệt độ ngẫu nhiên, top-k top-p nucleus, repetition penalty, đánh đổi xác định vs đa dạng sáng tạo, tại sao output khác nhau
---

# How LLM Sampling Works

At each step, an LLM outputs a **probability distribution** over the next token (see how-llms-work). **Sampling** is how you turn that distribution into an actual chosen token — and the sampling parameters (temperature, top-k, top-p) are your main dials for controlling whether output is **deterministic and safe** or **diverse and creative**. Getting these right matters for every generation task.

## Why Not Always Pick the Most Probable?

Always taking the highest-probability token (greedy — see how-beam-search-works) gives **bland, repetitive, generic** text and identical output every time. Real language has variety; injecting **controlled randomness** by *sampling* from the distribution produces more natural, diverse, interesting output. But too much randomness → incoherent nonsense. The parameters below tune this balance.

## Temperature (the main dial)

**Temperature** reshapes the probability distribution before sampling:
- **Low temperature** (→0) — sharpens toward the most-probable tokens; output is **focused, deterministic, consistent** (approaching greedy). Use for **factual, precise, structured** tasks where you want the likely, safe answer (see hallucination-mitigation — lower temp reduces drift).
- **High temperature** (>1) — flattens the distribution, giving lower-probability tokens more chance; output is **diverse, creative, surprising** — but too high → **incoherent**.
- **~0.7–1.0** — a common balance for conversational/creative tasks.
Temperature is the single most important sampling knob: low = safe/repeatable, high = creative/varied.

## Top-k and Top-p (truncation)

These **restrict which tokens** can be sampled, cutting off the unlikely tail (preventing weird picks):
- **Top-k** — only sample from the **k most probable** tokens (e.g. k=40); ignore the rest. Simple, but a fixed k is sometimes too restrictive or too loose.
- **Top-p (nucleus sampling)** — sample from the **smallest set of tokens whose cumulative probability ≥ p** (e.g. p=0.9). **Adaptive**: when the model is confident (one token dominates), the set is tiny; when uncertain (many plausible tokens), it grows. This adaptivity makes top-p the popular default.
Often combined with temperature: truncate the tail (top-p/k) *and* reshape (temperature).

## Repetition Controls

LLMs can get stuck repeating phrases. **Repetition/frequency/presence penalties** reduce the probability of tokens already used, discouraging loops and encouraging variety. Useful for longer generation.

## Choosing Settings by Task

- **Factual / code / structured / deterministic** — **low temperature** (near 0), maybe greedy; you want the likely, correct, repeatable answer.
- **Creative / brainstorming / conversational** — **higher temperature** + top-p (~0.9); you want diversity and natural variation.
- **Reproducibility** — low temperature + a fixed seed (where supported) for repeatable output.

## Pitfalls (in understanding/using)

- **Temperature too high** on factual/code tasks → incoherent or wrong output; use low temp for precision.
- **Temperature too low** on creative tasks → bland, repetitive, generic text.
- Not truncating the tail (no **top-p/top-k**) → occasional bizarre/nonsensical token picks.
- Expecting **deterministic** output while sampling with temperature > 0 (output varies each run — by design; use temp 0 + seed for reproducibility).
- Confusing **temperature** (reshapes probabilities) with **top-p/k** (truncates the set) — different things that combine.
- Cranking randomness to seem "more creative" at the cost of coherence — find the balance for the task.
- Forgetting repetition penalties for long generations that loop.
