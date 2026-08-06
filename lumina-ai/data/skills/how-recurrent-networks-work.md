---
name: how-recurrent-networks-work
description: How recurrent neural networks (RNNs) and LSTMs work — processing sequences step by step with a hidden state that carries memory, the vanishing-gradient problem, how LSTM/GRU gates fix long-term memory, and why transformers largely replaced them. Use to understand RNNs, LSTMs, sequence models, hidden state, or the predecessors to transformers.
category: ai-agent
keywords_vi: rnn, recurrent neural network, mạng hồi quy, xử lý chuỗi tuần tự, hidden state trạng thái ẩn, lstm gru cổng, vanishing gradient, tại sao transformer thay thế
---

# How Recurrent Neural Networks Work

Recurrent Neural Networks (RNNs) process **sequences** — text, time series, audio — by reading them one element at a time while maintaining a **memory** of what came before. They were the dominant sequence model before transformers (see how-transformers-work), and understanding them clarifies why transformers won.

## The Core Idea: a Loop with Memory

Unlike a feed-forward network, an RNN has a **hidden state** that it carries forward. At each step it:
1. Takes the current input (e.g. the next word) **and** the previous hidden state.
2. Combines them to produce a new hidden state (its updated "memory").
3. Optionally emits an output.
The same weights are applied at every step (weight sharing over time). So the hidden state is a running summary of the sequence so far — this is how an RNN uses context (the meaning of a word depends on earlier words). It naturally handles **variable-length** sequences.

## The Vanishing Gradient Problem

Training RNNs uses backpropagation **through time** (unrolling the loop, see how-backpropagation-works). But over long sequences, gradients get multiplied many times and tend to **vanish** (shrink to nothing) or explode. Vanishing gradients mean the network **can't learn long-range dependencies** — information from far back fades, so a plain RNN struggles to connect "The **cat** ... [many words] ... **it** was hungry." This was the central limitation.

## LSTM & GRU: Gates for Long-Term Memory

**LSTM** (Long Short-Term Memory) and **GRU** networks fix this with **gates** — small learned components that control information flow:
- A **cell state** acts as a memory conveyor belt that information can travel along largely unchanged.
- **Gates** (input/forget/output in LSTM) decide what to **add**, what to **forget**, and what to **output** at each step.
By learning to keep relevant information and discard the rest, and by providing a gradient "highway" through the cell state, LSTMs/GRUs capture much longer dependencies than vanilla RNNs. They powered machine translation, speech recognition, and more for years.

## Why Transformers Replaced Them

Two fundamental RNN limits remained:
- **Sequential processing** — must go step by step, can't parallelize across the sequence → slow to train on modern hardware (see how-gpus-work).
- **Still-limited long-range** memory despite gates.
Transformers process the whole sequence in parallel and let any token attend directly to any other (no fading through many steps), solving both — which is why they took over NLP. RNNs/LSTMs still appear in streaming, low-resource, or strictly-sequential settings.

## Pitfalls (in understanding/using)

- Using a **vanilla RNN** for long dependencies — vanishing gradients cripple it; use LSTM/GRU or a transformer.
- Expecting RNNs to **parallelize** across time — they're inherently sequential (slow training).
- Exploding gradients — clip gradients to stabilize.
- Assuming the hidden state remembers everything — capacity is limited; distant details still fade.
- Reaching for RNNs by default today — transformers usually win unless you specifically need streaming/sequential/low-compute.
