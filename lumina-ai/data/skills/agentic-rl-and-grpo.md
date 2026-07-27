---
name: agentic-rl-and-grpo
description: Training agents/LLMs to reason and act via reinforcement learning on task OUTCOMES — the SFT→RL pipeline and GRPO (Group Relative Policy Optimization), which drops the separate value/critic model by sampling a GROUP of answers per prompt and using their relative rewards as the advantage. Covers verifiable/rule-based rewards, why RL on outcomes teaches reasoning that imitation can't, and reward hacking. Use to understand agentic RL, GRPO vs PPO, RLVR, or how reasoning models are trained.
category: ai-ml-internals
keywords_vi: agentic rl huấn luyện agent bằng reinforcement learning, grpo group relative policy optimization, nhóm câu trả lời làm advantage bỏ value model, phần thưởng theo kết quả tác vụ verifiable, sft rồi rl dạy suy luận, reward hacking
---

# Agentic RL & GRPO

There are two ways to make an LLM/agent better at a task. **Imitation (SFT)** copies example answers — great for format and style, but it can only reproduce what's demonstrated. **Reinforcement learning on outcomes** lets the model **try, get rewarded for what actually works, and discover strategies no one demonstrated** — which is how modern "reasoning" models and capable agents are trained. **GRPO** is a simple, popular RL algorithm that makes this cheap (see how-rlhf-works, reinforcement-learning-basics, how-neural-networks-learn, agent-planning-patterns).

## The Pipeline: SFT → RL

1. **SFT (supervised fine-tune)** — teach the base model the *format* and basic behavior from demonstrations (how to use tools, lay out reasoning). This gives a competent starting policy.
2. **RL on outcomes** — now let the model **generate** attempts, **score** them by whether the *result* is correct/useful, and **update** toward higher-reward behavior. The model learns *reasoning that leads to right answers*, not just imitation of surface form. This is what "agentic RL" means: rewarding the agent for **completing tasks**, over multi-step trajectories (tool calls, reasoning).

## Rewards: Verifiable Beats Learned

The reward signal is everything. **Verifiable / rule-based rewards (RLVR)** — did the code pass tests? is the math answer exactly right? did the agent reach the goal state? — are **cheap, objective, and hard to game** compared to a learned reward model (which can be exploited). Where an outcome is checkable by a rule, use it. This is why RL shines on **math, code, and tool-use agents**: success is programmatically verifiable.

## GRPO: RL Without a Critic

Classic policy-gradient RL (PPO) needs a separate **value/critic model** to estimate a baseline (the "advantage") — extra memory, extra training, extra fragility. **GRPO (Group Relative Policy Optimization)** removes it with a simple idea:
- For each prompt, **sample a GROUP** of answers (say 8) from the current policy.
- Score all of them; the **group's mean reward is the baseline**. An answer's **advantage = how much better/worse than its group's average**.
- Push the policy toward the above-average answers, away from below-average ones.
No value network needed — the group *is* the baseline. This makes RL for reasoning **much cheaper and more stable to run**, which is a big reason it powers recent open reasoning models.

## Why It Teaches What SFT Can't

- **Exploration** — the model tries many approaches and keeps what *works*, discovering strategies absent from any demonstration set.
- **Outcome-aligned** — optimizes the thing you actually care about (task success), not token-level mimicry.
- **Scales with verifiable tasks** — more checkable problems → more free reward signal.

## Design Guidance

- **SFT first for format, then RL for capability** — RL from a cold base is hard; warm-start with demonstrations.
- **Prefer verifiable rewards** (tests, exact-match, goal reached) over a learned reward model where possible.
- **Use GRPO** to avoid a critic model — sample a group, use relative reward as advantage.
- **Reward the outcome, over the whole trajectory** (agentic tasks span multiple steps).
- **Watch reward hacking** — models optimize the *metric*; if the reward is gameable, they'll game it (Goodhart). Harden the checker.
- **Keep a KL leash** to the reference model so the policy doesn't drift into gibberish while chasing reward.

## Pitfalls (in understanding/using)

- Thinking **SFT alone** yields reasoning — it imitates; RL on outcomes is what discovers strategy.
- A **gameable reward** → reward hacking (passes the check, wrong in spirit); prefer robust verifiable rewards.
- Believing GRPO **needs a value model** — its whole point is replacing the critic with a **group baseline**.
- **No KL constraint** → policy collapses/degenerates while maximizing reward.
- Using a **learned reward model** where a **rule** would do → costlier and more exploitable.
- Confusing **RLHF** (align to human *preferences*) with **agentic RL/RLVR** (optimize task *outcomes*) — related but different reward sources.
