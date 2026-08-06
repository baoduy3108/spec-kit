---
name: how-backpropagation-works
description: How backpropagation trains neural networks — the forward pass, a loss function measuring error, the chain rule propagating gradients backward layer by layer, and updating weights. Explains automatic differentiation and why it's efficient. Use to understand backpropagation, how neural networks learn, gradients, or the chain rule in deep learning.
category: ai-agent
keywords_vi: backpropagation, lan truyền ngược, huấn luyện mạng nơ ron, hàm mất mát loss, chain rule đạo hàm, gradient cập nhật trọng số, automatic differentiation
---

# How Backpropagation Works

Backpropagation is the algorithm that lets neural networks **learn** — it computes how to adjust each of the millions of weights to reduce the network's error. It's the engine under every deep-learning framework, paired with gradient descent (see how-gradient-descent-works).

## The Setup

A neural network (see how-neural-networks-work) is a stack of layers, each transforming its input via weights and a nonlinearity. Training means finding weights that make the network's outputs match the desired outputs. Backprop answers: *for the current error, how should each weight change?*

## 1. Forward Pass

Run an input through the network to get a prediction, and compute a **loss** — a number measuring how wrong the prediction is versus the true answer (e.g. cross-entropy for classification, squared error for regression). Lower loss = better. The whole goal is to **minimize the loss**.

## 2. Backward Pass: the Chain Rule

We want the **gradient** of the loss with respect to every weight — i.e. "if I nudge this weight up a little, does the loss go up or down, and how steeply?" Computing this naively for millions of weights would be impossibly expensive. Backprop uses the calculus **chain rule** to do it efficiently:
- Start at the output, where the gradient of the loss is easy.
- Propagate the gradient **backward** layer by layer. Each layer, using the chain rule, converts the gradient of its output into the gradient of its input and of its own weights — reusing the downstream computation.
Because it reuses intermediate results (dynamic-programming-style), backprop computes **all** gradients in roughly one backward sweep — as cheap as the forward pass. This efficiency is what makes training deep networks feasible.

## 3. Update the Weights

Each weight's gradient says which direction increases the loss. So nudge each weight a small step in the **opposite** direction (scaled by the learning rate) — that's gradient descent. Repeat over many batches of data, and the loss steadily drops as the network's weights improve.

## Automatic Differentiation

Modern frameworks (PyTorch, TensorFlow, JAX) implement backprop as **automatic differentiation**: as you build the forward computation, they record the operations (a computation graph), then automatically apply the chain rule backward. You write the forward pass; the gradients come for free. This is why you rarely compute derivatives by hand anymore.

## Pitfalls (in understanding/using)

- **Vanishing/exploding gradients** — in deep networks, gradients can shrink to nothing or blow up as they propagate back (mitigated by good activations like ReLU, normalization, residual connections, careful init).
- Confusing the **loss** (what you minimize) with the **metric** you care about (accuracy) — they're related but not identical.
- Forgetting backprop only gives the **direction** — the learning rate and optimizer (see how-gradient-descent-works) determine the actual steps.
- Thinking backprop "understands" — it's pure calculus minimizing a number; intelligence emerges from architecture, data, and scale.
- Bugs from not zeroing gradients between steps (they accumulate in frameworks like PyTorch).
