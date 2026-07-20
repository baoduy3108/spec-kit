---
name: how-neural-networks-work
description: How a neural network learns — neurons as weighted sums plus a nonlinear activation, layers composing features, the forward pass, a loss function measuring error, backpropagation computing gradients, and gradient descent updating weights. Use to understand deep learning fundamentals, training, and terms like weights, activation, loss, and gradient.
category: ai-agent
keywords_vi: neural network hoạt động thế nào, mạng nơ-ron, backpropagation, gradient descent, hàm kích hoạt activation, loss function, học sâu deep learning, hiểu neural network
---

# How Neural Networks Work

A neural network is a stack of simple functions whose parameters are tuned, by trial and error over data, to map inputs to outputs.

## A Neuron

A neuron computes a **weighted sum** of its inputs plus a bias, then applies a **nonlinear activation** (ReLU, sigmoid, tanh). The nonlinearity is essential — without it, any stack of layers collapses into a single linear function and can't model complex patterns. Weights are the knobs the network learns.

## Layers = Composed Features

Neurons are organized in **layers**; each layer transforms the previous layer's output. Early layers learn simple features (edges, tokens), later layers combine them into complex ones (shapes, meaning). "Deep" learning just means many layers. The **forward pass** runs an input through all layers to produce a prediction.

## Learning: Loss, Backprop, Gradient Descent

1. **Loss function** — measures how wrong the prediction is versus the true label (e.g. cross-entropy for classification, MSE for regression). Training = minimizing average loss over data.
2. **Backpropagation** — using the chain rule of calculus, compute the **gradient** of the loss with respect to every weight: "how much does nudging this weight change the error?" It propagates the error signal backward through the layers efficiently.
3. **Gradient descent** — nudge each weight a small step (the **learning rate**) in the direction that reduces loss. Repeat over many **batches** and **epochs**; the weights gradually settle into a configuration that maps inputs to outputs well.

## Key Ideas & Pitfalls

- **Learning rate** too high → diverges/oscillates; too low → crawls. It's the most important knob.
- **Overfitting** — the network memorizes training data and fails on new data; fight it with more data, regularization (dropout, weight decay), and a held-out validation set to know when to stop.
- **Generalization** is the real goal — low *test* loss, not low training loss.
- Modern architectures (CNNs for images, transformers with attention for sequences/LLMs) are specialized versions of this same learn-by-gradient-descent core. An LLM is a very large network trained to predict the next token; the learning mechanism is exactly the above at scale.
