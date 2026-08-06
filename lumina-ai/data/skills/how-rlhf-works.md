---
name: how-rlhf-works
description: How RLHF (reinforcement learning from human feedback) aligns LLMs — the pipeline of supervised fine-tuning, training a reward model from human preference comparisons, then RL (PPO) to optimize the policy, plus alternatives like DPO. Use to understand RLHF, LLM alignment, reward models, why models are "helpful/harmless", or DPO vs RLHF.
category: ai-agent
keywords_vi: rlhf, reward model, ppo, dpo, how rlhf works, học tăng cường từ phản hồi con người, so sánh sở thích human preference, căn chỉnh alignment llm
---

# How RLHF Works

RLHF (Reinforcement Learning from Human Feedback) is how a raw language model — which just predicts likely text (see how-llms-work) — is turned into a **helpful, harmless, honest assistant** that follows instructions and matches human preferences. It's the alignment step that made modern chat models useful and safe.

## Why It's Needed

A base LLM trained only to predict internet text isn't an assistant — it will complete text, produce unhelpful or harmful continuations, and doesn't reliably follow instructions or human values. There's no simple loss function for "be helpful and safe" — those are fuzzy human judgments. RLHF's insight: **learn human preferences from human feedback**, then optimize the model toward them.

## The Three-Stage Pipeline

1. **Supervised fine-tuning (SFT)** — start from the base model and fine-tune on high-quality **example conversations** (humans writing good responses to prompts). This teaches the format and basic instruction-following — a decent assistant, but limited by how many examples you can write.
2. **Train a reward model** — the clever part. Collect human **preference comparisons**: show people two model responses to the same prompt and ask **which is better**. Ranking is far easier and more consistent for humans than writing perfect responses. Train a **reward model** to predict these human preferences — it learns to output a score for "how much would a human prefer this response." Now you have a **learned proxy for human judgment** you can query millions of times.
3. **Reinforcement learning (PPO)** — use RL (typically **PPO** — see reinforcement-learning-basics) to optimize the LLM (the "policy") to **maximize the reward model's score**, while a penalty (KL divergence from the SFT model) keeps it from drifting too far into gibberish that games the reward. The model learns to produce responses humans prefer.

## The Result

The model becomes **aligned** — helpful, following instructions, refusing harmful requests, and matching the tone/values in the feedback. RLHF is a big reason ChatGPT-style models feel so different from raw base models.

## DPO and Alternatives

RLHF's RL stage (PPO) is complex and unstable. **DPO (Direct Preference Optimization)** achieves similar alignment **without** a separate reward model or RL loop — it directly optimizes the model on preference pairs with a simpler supervised-style objective. It's easier and popular. Other variants (RLAIF — using AI feedback instead of human; Constitutional AI) reduce the human-labeling cost. The core idea (align to preferences) is shared.

## Limitations

- **Reward hacking** — the model can exploit flaws in the reward model (game the proxy) rather than genuinely improving; the KL penalty and good reward models limit this.
- **Sycophancy** — RLHF can teach the model to tell people what they want to hear (preferred ≠ true — see building-an-ai-tutor).
- **Preference quality** — the model is only as aligned as the feedback; biased/inconsistent labels → biased alignment.
- It aligns to **average labeler preferences**, which may not match every user or context.

## Pitfalls (in understanding/using)

- Thinking a base model is "the assistant" — the assistant behavior comes from **alignment** (SFT + RLHF/DPO), not pretraining.
- **Reward hacking** — optimizing a proxy (reward model) can diverge from true goals; monitor for it.
- **Sycophancy** — preferences reward agreeable answers, even wrong ones.
- Assuming RLHF makes a model **truthful** — it makes it *preferred*, which correlates with but isn't the same as correct (see hallucination-mitigation).
- Underestimating **human-labeling cost/consistency** — the bottleneck and quality driver (hence RLAIF/DPO).
- Confusing **RLHF** (with a reward model + RL) and **DPO** (direct, no RL) — same goal, different mechanism.
