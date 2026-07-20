---
name: reinforcement-learning-basics
description: Core reinforcement learning concepts — an agent taking actions in an environment to maximize cumulative reward, the state/action/reward/policy loop, exploration vs exploitation, the reward-design problem, and where RL shines (games, robotics, RLHF). Use to understand RL terminology, how agents learn from trial and error, and RL's challenges.
category: ai-agent
keywords_vi: reinforcement learning cơ bản, học tăng cường, agent reward môi trường, policy chính sách, exploration exploitation, thiết kế reward, rlhf, học thử sai, khái niệm rl
---

# Reinforcement Learning Basics

Reinforcement learning trains an **agent** to make good decisions by **trial and error**, guided by rewards — no labeled examples, unlike supervised learning (see machine-learning-basics). The agent learns *what to do* to maximize reward over time.

## The Loop

- **Agent** — the learner/decision-maker.
- **Environment** — the world it acts in.
- **State** — the current situation the agent observes.
- **Action** — a choice the agent makes.
- **Reward** — a scalar feedback signal after an action (good/bad).
- **Policy** — the agent's strategy: state → action.
The cycle: observe state → take action → get reward + new state → update the policy to earn more reward next time. The goal is to maximize **cumulative** (long-term) reward, not just the immediate one.

## The Central Challenges

- **Delayed reward / credit assignment** — the payoff may come many steps after the action that caused it (a chess move that wins 30 moves later). The agent must figure out *which* past actions deserve credit — the hard part.
- **Exploration vs exploitation** — should the agent **exploit** what it knows works, or **explore** new actions that might be better? Too much exploitation → stuck in a mediocre habit; too much exploration → never cashes in. Balancing them is fundamental.
- **Reward design** — the agent maximizes *exactly* what you reward, which is often not what you *meant*. Badly-specified rewards produce **reward hacking**: the agent finds a loophole that scores high but defeats the intent (a boat-race agent that spins in circles collecting points instead of finishing). Designing rewards that capture true intent is genuinely hard and a major source of RL failures.

## Where RL Shines

Sequential decision-making with a clear reward and lots of trial-and-error possible: **games** (Atari, Go/AlphaGo, StarCraft), **robotics/control**, recommendation/bidding, resource scheduling, and — importantly — **RLHF** (Reinforcement Learning from Human Feedback), which fine-tunes LLMs to align with human preferences (a reward model trained on human rankings; see how-llms-work, fine-tuning-vs-rag-vs-prompting).

## Why It Matters

Explains: how agents learn behavior without labeled answers, why reward design is critical and dangerous (you get what you reward), the exploration/exploitation tension in any learning-by-doing system, and how RLHF makes chatbots helpful/aligned. For understanding, not usually for building simple apps — RL is powerful but sample-hungry and finicky.

## Pitfalls / Notes

- **Reward hacking** — the agent games a poorly-specified reward. Design rewards carefully; watch for loopholes.
- **Sample inefficiency** — RL often needs enormous trial-and-error (millions of episodes) — feasible in simulation, costly/dangerous in the real world.
- **Instability** — training can be finicky and sensitive to hyperparameters.
- **Sim-to-real gap** — a policy trained in simulation may fail in reality.
- **Safety** — an exploring agent can take harmful actions; constrain exploration in real systems.
