---
name: how-gradient-descent-works
description: How gradient descent optimizes models — following the negative gradient downhill to minimize a loss, the learning rate, batch/stochastic/mini-batch variants, momentum and adaptive optimizers (Adam), and pitfalls like local minima and bad learning rates. Use to understand gradient descent, learning rate, SGD, Adam, or how models are optimized.
category: ai-agent
keywords_vi: gradient descent, tối ưu mô hình, đi xuống dốc giảm loss, learning rate tốc độ học, sgd stochastic mini-batch, momentum adam optimizer, local minima
---

# How Gradient Descent Works

Gradient descent is the optimization algorithm that actually **trains** most machine-learning models — it iteratively adjusts parameters to minimize a loss function. Backprop (see how-backpropagation-works) computes the gradients; gradient descent uses them to take steps.

## The Core Idea: Roll Downhill

Imagine the loss as a landscape where height = error and position = the model's parameters. You want the lowest point. Gradient descent:
1. Computes the **gradient** — the direction of steepest *increase* in loss.
2. Takes a small step in the **opposite** direction (steepest decrease).
3. Repeats.
Like walking downhill in fog by always stepping in the steepest downward direction. Over many steps the loss decreases and the model improves.

## The Learning Rate (the critical dial)

Each step's size is the **learning rate**:
- **Too large** → you overshoot the minimum, bounce around, or diverge (loss explodes).
- **Too small** → training is painfully slow and may stall.
Choosing/scheduling the learning rate is one of the most important tuning decisions. **Learning-rate schedules** (decay over time, warmup) help — big steps early, fine steps later.

## Batch, Stochastic, Mini-Batch

How much data to use per step?
- **Batch GD** — use the *entire* dataset for each step: accurate gradient, but slow and memory-heavy.
- **Stochastic GD (SGD)** — one example per step: fast, noisy (the noise can even help escape bad spots), but erratic.
- **Mini-batch** (the standard) — a small batch (e.g. 32–512) per step: a practical balance of speed, stability, and hardware efficiency (GPUs love batches). This is what nearly everyone uses.

## Momentum & Adaptive Optimizers

Plain SGD can be slow in ravines and get stuck. Improvements:
- **Momentum** — accumulate a velocity from past gradients, so consistent directions build speed and oscillations cancel (like a ball rolling downhill).
- **Adaptive optimizers (Adam, RMSProp)** — adjust the effective learning rate **per parameter** based on gradient history. **Adam** is the popular default — robust and fast to get going, combining momentum and per-parameter scaling.

## Local Minima & Saddle Points

The loss landscape isn't a simple bowl — it has **local minima**, **saddle points**, and flat regions. In high-dimensional deep networks, true bad local minima are rarer than feared (most are saddle points, and many minima are "good enough"), and SGD's noise + momentum usually escape them. Still, initialization and optimizer choice matter.

## Pitfalls (in understanding/using)

- **Bad learning rate** — the #1 failure: too high diverges, too low stalls. Tune it first.
- Expecting a smooth, monotonic loss curve — mini-batch noise makes it jagged (watch the trend, not each step).
- Forgetting to **normalize/scale inputs** — skewed feature scales make the landscape hard to descend.
- Using batch GD on big data (too slow) — use mini-batch.
- Blindly trusting Adam everywhere — well-tuned SGD+momentum sometimes generalizes better; both are valid.
- Confusing gradient descent (uses gradients) with backprop (computes them) — they work together.
