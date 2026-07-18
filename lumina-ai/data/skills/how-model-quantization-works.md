---
name: how-model-quantization-works
description: How model quantization works — shrinking neural networks by storing weights in lower precision (FP16/INT8/INT4 instead of FP32), why it saves memory and speeds inference, post-training vs quantization-aware training, and the accuracy trade-off. Use to understand quantization, running LLMs on less hardware, INT8/INT4, or model compression for inference.
category: ai-agent
keywords_vi: quantization mô hình, lượng tử hóa, giảm độ chính xác fp32 fp16 int8 int4, tiết kiệm bộ nhớ tăng tốc inference, post-training quantization aware, nén mô hình chạy llm nhẹ
---

# How Model Quantization Works

Quantization shrinks a neural network by storing its numbers in **lower precision** — trading a little accuracy for big savings in memory and speed. It's the key technique that lets large models (especially LLMs) run on modest hardware (see running-llms-locally, llm-inference-optimization).

## The Idea: Fewer Bits per Number

A trained model is millions/billions of **weights**, normally stored as 32-bit floats (**FP32**). But that precision is often overkill for **inference**. Quantization represents each weight with fewer bits:
- **FP16 / BF16** — 16-bit floats: half the memory, widely used, minimal accuracy loss.
- **INT8** — 8-bit integers: 4× smaller than FP32, big speedups, small accuracy loss with care.
- **INT4** (and lower) — 4-bit: 8× smaller, enables running large LLMs on consumer GPUs, but more accuracy risk.
Fewer bits = less memory to store and move, and integer math is faster and more energy-efficient on supported hardware.

## How Values Are Mapped

Quantization maps a range of floating-point values onto a small set of integer levels using a **scale** (and zero-point): `real ≈ scale × int`. You calibrate the scale to the actual range of the weights/activations so the limited levels cover the important values. Because ranges differ across layers/channels, **per-channel** scales preserve more accuracy than one global scale. The rounding introduces small **quantization error** — the source of any accuracy drop.

## Post-Training vs Quantization-Aware

- **Post-training quantization (PTQ)** — quantize an already-trained model directly (optionally with a small calibration dataset to set scales). Fast, no retraining; good enough for FP16/INT8 in many cases.
- **Quantization-aware training (QAT)** — simulate quantization **during training** so the model learns weights robust to the precision loss. More work, but recovers more accuracy — important for aggressive (INT4) quantization.
For LLMs, specialized methods (GPTQ, AWQ, GGUF k-quants) push to 4-bit with clever per-group scaling and outlier handling while limiting quality loss.

## Why It Matters (especially for LLMs)

Memory is the bottleneck for large models. A 70B-parameter model needs ~140 GB in FP16 but ~35–40 GB in 4-bit — the difference between needing a data-center GPU and fitting on one consumer card. Quantization also **speeds up inference** (less data movement, faster integer ops) and cuts energy — enabling on-device and cheaper serving.

## The Trade-off

Lower precision → smaller/faster but **potentially less accurate**. FP16/INT8 are usually near-lossless; INT4 and below can noticeably degrade quality (more on hard tasks), though modern methods narrow the gap. Always **measure** quality after quantizing on your actual tasks — the impact is model- and task-dependent.

## Pitfalls (in understanding/using)

- Assuming quantization is free — verify accuracy on **your** tasks; aggressive (4-bit) can degrade reasoning/edge cases.
- Quantizing **training** — quantization is mainly for **inference**; training generally needs higher precision.
- Ignoring **hardware support** — INT8/INT4 speedups need compatible hardware/kernels; otherwise you save memory but not always time.
- Using one global scale for everything (worse accuracy) vs per-channel/per-group.
- Comparing model sizes without noting precision (a "7B model" is very different at FP16 vs INT4).
- Stacking lossy steps (quantize + prune + distill) without measuring the combined quality hit.
