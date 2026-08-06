---
name: how-diffusion-models-work
description: How diffusion models generate images — training by adding noise then learning to reverse it, iterative denoising from random noise into an image, text conditioning (CLIP/cross-attention), latent diffusion for efficiency, and guidance scale. Use to understand diffusion models, how Stable Diffusion/DALL·E/Midjourney work, text-to-image generation, or denoising.
category: ai-agent
keywords_vi: diffusion model, sinh ảnh generative, thêm nhiễu rồi khử nhiễu, denoising lặp, text to image, điều kiện text clip, latent diffusion, guidance scale
---

# How Diffusion Models Work

Diffusion models are the technology behind modern AI image generators (Stable Diffusion, DALL·E, Midjourney, Imagen). They create images by starting from pure random noise and **gradually refining it into a coherent picture** — a surprising but powerful idea.

## The Core Insight: Learn to Reverse Noise

Training has two conceptual directions:
- **Forward process** — take a real image and add a little **random noise**, repeatedly, over many steps, until it's indistinguishable from pure static. This is easy and needs no learning.
- **Reverse process** — train a neural network (a U-Net or transformer) to **undo one step of noising**: given a noisy image, predict the noise that was added (equivalently, a slightly cleaner image). Do this at every noise level.
Because the model learns to remove noise at any level, at generation time you can **start from pure noise and run the reverse process repeatedly**, denoising step by step until a clean, novel image emerges. The model "hallucinates" structure out of noise, guided by what it learned real images look like.

## Iterative Denoising (generation)

To generate: sample random noise, then apply the trained denoiser **many times** (tens of steps), each step removing a bit of noise and adding detail, until an image forms. More steps generally = more refined (with diminishing returns). This iterative nature is why diffusion generation is slower than a single forward pass, and why "sampling steps" is a knob.

## Text Conditioning (text-to-image)

To make it follow a **prompt**, the denoiser is **conditioned** on the text. The prompt is encoded (e.g. by a text encoder like CLIP) into embeddings, and injected into the denoising network via **cross-attention** (see how-transformers-work) so each denoising step is steered toward matching the text. The model learned image↔caption pairs, so "a red fox in snow" biases the denoising toward that content.

## Latent Diffusion (the efficiency trick)

Denoising full-resolution pixels is expensive. **Latent diffusion** (Stable Diffusion) runs the whole process in a compressed **latent space**: an autoencoder maps images to a much smaller latent representation, diffusion happens there (far cheaper), and a decoder turns the final latent back into a full image. This is what made high-quality image generation run on consumer GPUs.

## Guidance Scale

**Classifier-free guidance** controls how strongly the image adheres to the prompt: higher guidance = more literal/prompt-faithful but can look oversaturated/rigid; lower = more creative/loose but may drift from the prompt. A key quality/creativity dial.

## Pitfalls (in understanding/using)

- Expecting one-shot generation — it's **iterative** denoising (many steps); step count trades speed vs quality.
- Setting **guidance** too high (artifacts, rigidity) or too low (ignores the prompt).
- Assuming pixel-space — most practical models use **latent** diffusion (compressed space) for speed.
- Thinking it "copies" images — it learns a distribution and samples novel ones (though it can memorize/reproduce training data in edge cases — a real concern).
- Prompt sensitivity — wording, weighting, and negative prompts strongly affect output (see prompt-engineering ideas).
- Confusing diffusion with GANs (see how-gans-work) — different mechanisms for generation.
