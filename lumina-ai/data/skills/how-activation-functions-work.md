---
name: how-activation-functions-work
description: How activation functions work — the nonlinear functions (ReLU, sigmoid, tanh, GELU, SwiGLU) that let neural networks learn complex patterns, why nonlinearity is essential, and how the choice affects training. Use to understand ReLU, activation functions, why networks need nonlinearity, or vanishing gradients from saturating activations.
category: ai-agent
keywords_vi: relu, gelu, hàm kích hoạt, sigmoid tanh, phi tuyến để học mẫu phức tạp, mạng cần phi tuyến, vanishing gradient hàm bão hòa, swiglu
---

# How Activation Functions Work

Activation functions are the **nonlinear functions** applied to each neuron's output that give neural networks their power to learn **complex patterns**. Without them, a deep network — no matter how many layers — would collapse into a simple linear model. They're a small piece with an outsized effect (see how-neural-networks-work).

## Why Nonlinearity Is Essential

Each layer of a network computes a **linear** operation (weighted sum). Here's the key fact: **stacking linear layers is still linear** — any number of matrix multiplications composes into a single matrix, so a purely linear deep network can only represent a straight-line relationship, no matter how deep. Real data (images, language, everything interesting) is **nonlinear**. Inserting a **nonlinear** activation function between layers is what lets the network **bend and fold** the input space to represent complex, curved decision boundaries. Nonlinearity is what makes "deep" learning actually powerful.

## The Common Activation Functions

- **ReLU** (Rectified Linear Unit) — `max(0, x)`: pass positives through, zero out negatives. Simple, fast, and doesn't saturate for positive values (helping gradients flow) — it became the default for deep networks and largely solved the vanishing-gradient problem of earlier functions.
- **Sigmoid** — squashes to (0,1); historically popular, good for probabilities at the **output**, but **saturates** (flattens) at the extremes → tiny gradients → **vanishing gradients** in deep nets. Rarely used in hidden layers now.
- **Tanh** — squashes to (−1,1); zero-centered (better than sigmoid) but still saturates.
- **GELU / SiLU (Swish)** — smooth, modern activations that work well in transformers; GELU is standard in many LLMs.
- **SwiGLU / gated variants** — gated activations used in the feed-forward blocks of many recent LLMs for better quality.

## The Vanishing Gradient Connection

A big reason activation choice matters: **saturating** functions (sigmoid, tanh) have near-zero slope at their extremes, so during backpropagation (see how-backpropagation-works) the gradient gets multiplied by tiny numbers layer after layer and **vanishes** — early layers stop learning. **ReLU** (and its variants) don't saturate for positive inputs, keeping gradients healthy, which is a major reason very deep networks became trainable. This is a concrete example of how a "small" design choice unlocks whole capabilities.

## Choosing an Activation

- **Hidden layers, general** — **ReLU** (or Leaky ReLU / GELU) is a safe, strong default.
- **Transformers / LLMs** — **GELU, SiLU, or SwiGLU** (smooth/gated) are standard.
- **Output layer** — depends on the task: **sigmoid** for binary probability, **softmax** for multi-class (see how-llms-work), **linear** (none) for regression.
- **Dying ReLU** issue (neurons stuck at zero) → use **Leaky ReLU / GELU** variants.

## Pitfalls (in understanding/using)

- Building a deep network with **no activation** (or only linear ones) — it collapses to a single linear model; nonlinearity is the whole point.
- Using **sigmoid/tanh in deep hidden layers** → vanishing gradients; prefer ReLU/GELU.
- **Dying ReLU** — neurons that always output zero (large negative bias) stop learning; use a leaky variant.
- Using the wrong **output** activation for the task (e.g. sigmoid where you needed softmax, or an activation where you needed a raw linear output).
- Assuming a fancier activation always beats ReLU — for many tasks ReLU is competitive and cheaper; gains from GELU/SwiGLU are modest and context-dependent.
- Confusing the **output** activation (task-specific) with **hidden-layer** activations (about trainability/nonlinearity).
