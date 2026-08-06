---
name: running-llms-locally
description: Run open-weight LLMs on your own machine — tools (Ollama, llama.cpp, LM Studio, Jan), the GGUF format, quantization levels and the quality/size trade-off, estimating VRAM/RAM, context length cost, CPU vs GPU offload, and choosing a model size for your hardware. Use when someone wants to run an LLM locally or asks which model/quant fits their machine.
category: ai-agent
keywords_vi: chạy llm, chạy llm local, chạy ai trên máy, ollama, llama.cpp, gguf, quantization gguf, model chạy máy yếu, vram cho llm, offload gpu
---

# Running LLMs Locally

Open-weight models can run on your own hardware — private, offline, and free per token — if you match the model and quantization to your machine.

## Tools

- **Ollama** — simplest: `ollama run <model>`, manages downloads and serving with an OpenAI-compatible API. Great default.
- **llama.cpp** — the underlying C++ engine most tools use; runs GGUF models efficiently on CPU and GPU, maximum control.
- **LM Studio / Jan** — desktop GUIs for browsing, downloading, and chatting with local models; Jan is open-source.
- **vLLM / TGI** — for serving at scale/throughput on GPUs (see llm-inference-optimization), not single-user desktop.

## GGUF & Quantization (the key concept)

Local models are usually distributed as **GGUF** files at a chosen **quantization** — weights compressed from 16-bit to fewer bits to shrink size and memory:
- **Q8** ≈ near-full quality, largest.
- **Q5/Q4** — the sweet spot: ~4–5 bits, big size cut, small quality loss. **Q4_K_M is the common default.**
- **Q3/Q2** — fit bigger models on small hardware, but noticeable quality degradation.
Rule: **a larger model at lower quant usually beats a smaller model at high quant** — until the quant gets too aggressive (Q2). Prefer the biggest model whose Q4/Q5 fits your memory.

## Will It Fit? (rough sizing)

Memory needed ≈ model file size + context overhead. A 7B model at Q4 is ~4–5 GB; 13B ~8 GB; 70B at Q4 ~40 GB. You need that much **VRAM** to run fully on GPU (fast), or **RAM** to run on CPU (slower). Partial **GPU offload** puts as many layers as fit on the GPU and the rest on CPU. Longer **context** costs extra memory (KV cache grows with context length) and slows generation.

## Choosing for Your Hardware

- **8–16 GB RAM, no/weak GPU** → 7–8B model at Q4 on CPU (usable, not fast).
- **8–12 GB VRAM GPU** → 7–13B at Q4/Q5 on GPU (fast).
- **24 GB+ VRAM** → up to ~34B, or 70B with offload/low quant.
Start small, confirm it runs, then size up. Match the model to the task — a small model is fine for simple chat/formatting; reasoning/coding wants a larger one.

Local models trade some quality and speed for privacy, offline use, and zero per-token cost — exactly why LUMINA supports an Ollama fallback engine.
