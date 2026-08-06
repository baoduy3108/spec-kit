---
name: image-model-samplers-and-schedulers
description: How samplers and schedulers work in diffusion image generation — the sampler is the algorithm that steps through denoising (Euler, DPM++, DDIM, etc.), the scheduler sets the noise level per step, and how step count, sampler choice, and CFG interact with quality and speed. Use to understand diffusion samplers, schedulers, step count, Euler vs DPM++, or tuning generation quality vs speed.
category: engineering
keywords_vi: sampler diffusion, scheduler ảnh, dpm++, euler ddim, karras, số bước steps khử nhiễu, ancestral vs deterministic sampler, sampler vẽ ảnh
---

# Samplers and Schedulers (Diffusion Image Generation)

When a diffusion model generates an image, it **iteratively removes noise** over a number of steps (see how-diffusion-models-work). The **sampler** is the algorithm that decides *how* to take each denoising step, and the **scheduler** decides *how much* noise to remove at each step. These choices — plus the **step count** — significantly affect image quality, style, and speed, which is why generation UIs expose them (see node-based-image-workflows, negative-prompts-and-cfg).

## Sampler vs Scheduler (the distinction)

- **Sampler** — the numerical method that solves the denoising process step by step (they're solvers for the underlying differential equation). Different samplers converge differently, giving different looks and speeds. Examples: **Euler / Euler a**, **DPM++ 2M / DPM++ SDE**, **DDIM**, **UniPC**, **LMS**, **Heun**.
- **Scheduler / noise schedule** — determines the **sequence of noise levels** across the steps (how noise decreases from start to finish): e.g. **Karras**, **normal**, **exponential**. The Karras schedule, for instance, spends steps where they help most, often improving quality at low step counts.
Together they define the denoising trajectory. (Some UIs bundle them; ComfyUI separates sampler and scheduler explicitly.)

## Step Count: The Quality/Speed Dial

Each step is one denoising pass — more steps = more refinement but more compute/time:
- **Too few** steps → noisy, unfinished, or unstable images.
- **Enough** steps → the image "converges" (clean, detailed). Many modern samplers converge in **~20–30 steps**.
- **Too many** → diminishing returns (little improvement, wasted time); some samplers even drift.
The right step count **depends on the sampler**: efficient ones (DPM++ 2M Karras) look great at ~20 steps; others need more.

## Ancestral vs Deterministic Samplers

A key behavioral split:
- **Deterministic** (Euler, DPM++ 2M, DDIM) — with a fixed seed, they **converge** to a stable image; more steps refine the *same* image. Reproducible and predictable.
- **Ancestral** ("a" variants like Euler a, and SDE types) — **inject fresh noise** each step, so the image keeps **changing** with step count and doesn't fully converge. More varied/creative, but less predictable and not stable vs steps.
Choose deterministic for control/reproducibility, ancestral for variety.

## How They Interact

- **Sampler + scheduler + steps** jointly set quality and look — and interact with **CFG scale** (see negative-prompts-and-cfg): high CFG may need more steps or a robust sampler to avoid artifacts.
- **Seed** fixes the starting noise (see seed-and-reproducibility-image-gen); with a deterministic sampler, same seed + params = same image.
- There's **no single "best"** — samplers have aesthetic differences; people pick favorites per model/style.

## Design Guidance

- **Start with a strong default** — e.g. DPM++ 2M Karras at ~20–25 steps is a common quality/speed sweet spot.
- **Deterministic samplers** for iterating (stable vs seed); **ancestral** for exploration/variety.
- **Match steps to the sampler** — don't blindly crank steps; efficient samplers need few.
- **Change one variable at a time** (fix seed) to learn each sampler's look.
- **Watch CFG interaction** — reduce CFG or add steps if you see burn/artifacts.

## Pitfalls (in understanding/using)

- Assuming **more steps = always better** → diminishing returns; efficient samplers converge early.
- Using an **ancestral** sampler and expecting stability vs steps → it keeps changing (adds noise each step).
- Ignoring the **scheduler** — the noise schedule (Karras vs normal) noticeably affects low-step quality.
- Thinking there's **one best sampler** → they differ aesthetically; it's model/taste dependent.
- Cranking **steps** to fix a problem that's really **CFG** or prompt-related.
- Comparing samplers **without fixing the seed** → you can't isolate the sampler's effect.
