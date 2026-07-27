---
name: skill-optimization-as-training
description: Optimizing a natural-language skill/prompt document as if training a model — treating the skill text as the trainable parameters and applying epochs, mini-batches, validation gates, and trajectory-driven edits, while the model weights stay frozen. An optimizer analyzes scored rollouts and makes bounded add/delete/replace edits, accepted only if they improve a held-out test set. Use to systematically improve a skill or prompt, or optimize agent instructions without fine-tuning.
category: ai-agent
keywords_vi: tối ưu skill như huấn luyện, validation gate cho prompt, chỉnh sửa theo trajectory rollout, tối ưu prompt không đụng trọng số, coi văn bản skill là tham số huấn luyện, cải thiện chỉ dẫn agent có kiểm chứng
---

# Skill Optimization as Training

You can improve an agent's behavior in two ways: change the **model weights** (fine-tuning — expensive, needs a training cluster) or change the **instructions** you give it (the skill/prompt document — cheap, zero inference overhead). Skill optimization borrows the **rigor of training** and applies it to the *text*: treat the skill document as the **trainable parameter**, and improve it with **epochs, mini-batches, validation gates, and a learning signal** — without ever touching the weights (see prompt-engineering, fine-tuning-vs-rag-vs-prompting, agent-skill-lifecycle-management).

## The Idea: The Prompt Is the Parameter

Instead of hand-tweaking a prompt and hoping, formalize it like a training loop:
- **Parameter** = the skill/prompt document (a few hundred to a couple thousand tokens).
- **Forward pass** = run the agent on a batch of tasks with the current skill.
- **Loss/reward** = how well those rollouts scored (task success, judge score).
- **Gradient step** = an **optimizer model** reads the **scored trajectories**, sees where the skill led the agent astray, and proposes **bounded text edits** (add / delete / replace a passage).
- **Validation** = the candidate edit is accepted **only if it improves a held-out test set** — not the batch it was tuned on.
Repeat over **epochs** and **mini-batches**, and the skill converges to something that reliably works — while the **target model stays frozen**, so deployment adds **zero inference cost** (it's just a better document).

## Why Trajectory-Driven Edits

Generic "make this prompt better" edits are blind. The signal here is **execution trajectories**: you see *what the agent actually did* and *where it failed*, so edits are **targeted** at real failure modes ("it kept skipping the validation step" → add an explicit gate). Editing from evidence, not intuition, is what makes it training-like rather than guesswork.

## Why Validation Gates Matter

An edit that helps the current batch may **overfit** — it memorizes those tasks and hurts others (Goodhart). Requiring every edit to **improve a separate held-out set** before acceptance keeps improvements **genuine and general**, exactly like a validation split guards against overfitting in real training.

## Design Guidance

- **Fix the model, evolve the text** — no weight changes; the deliverable is a compact `best_skill.md`.
- **Score real rollouts** — your reward signal is task outcomes, not the prompt's looks.
- **Edit from trajectories** — target the observed failure, make **bounded** add/delete/replace changes.
- **Gate on held-out tasks** — accept an edit only if it generalizes; reject overfit gains.
- **Iterate in epochs/batches** — many small validated steps, not one big rewrite.
- **Keep it compact** — a tight skill (hundreds–low-thousands of tokens) that works beats a bloated one.

## Pitfalls (in understanding/using)

- **Tuning on the same tasks you measure** → overfitting; always hold out a validation set.
- **Unbounded rewrites** → you lose what worked; make small, reversible edits.
- Editing from **intuition** instead of trajectories → blind changes that don't fix the real failure.
- Chasing a **judge/metric** that's gameable → optimize the number, harm real behavior (Goodhart).
- Assuming it **replaces fine-tuning** — it optimizes *instructions*; some capabilities still need weight training.
- Letting the skill **bloat** every epoch → longer, costlier, not better; prune as you go.
