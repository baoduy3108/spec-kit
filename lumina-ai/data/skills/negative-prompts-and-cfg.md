---
name: negative-prompts-and-cfg
description: How negative prompts and CFG (classifier-free guidance) scale work in image generation — the negative prompt says what to avoid, CFG controls how strictly the model follows the prompt, and the trade-off between prompt adherence and image quality/diversity. Use to understand negative prompts, CFG/guidance scale, why images look "fried" or ignore the prompt, or tuning adherence vs quality.
category: engineering
keywords_vi: negative prompt, cfg, guidance scale, ảnh bị cháy fried, prompt phủ định điều cần tránh, cfg bám prompt chặt tới đâu, đánh đổi bám prompt vs chất lượng
---

# Negative Prompts and CFG (Guidance Scale)

Two of the most important dials in image generation control **what to avoid** and **how hard to follow the prompt**: the **negative prompt** and the **CFG (classifier-free guidance) scale**. Getting them right is the difference between an image that ignores your prompt, one that nails it, and one that's "fried" and over-cooked (see how-diffusion-models-work, prompting-for-image-models, image-model-samplers-and-schedulers).

## Negative Prompts: What to Avoid

A **negative prompt** lists concepts you want the model to **steer away from**. During generation, the model is guided **toward** the positive prompt and **away** from the negative one:
- **Fix common flaws** — negatives like "blurry, low quality, deformed, extra fingers, watermark, text" push the model away from typical failure modes.
- **Exclude content/style** — "cartoon" (to keep it photoreal), a color you don't want, an object that keeps appearing.
It's not a magic filter — it **biases** the result away from those concepts, not a hard guarantee. Overloading the negative prompt with everything can also constrain the model oddly. Newer models need less negative prompting than older SD versions.

## CFG Scale: How Strictly to Follow the Prompt

**Classifier-free guidance (CFG)** scale controls **how strongly the generation is pushed toward your prompt** versus letting the model do its own thing. It's essentially the "prompt adherence" knob:
- **Low CFG** (~1–4) — the model **loosely** follows the prompt; more creative/varied, softer, but may **ignore** parts of your prompt.
- **Medium CFG** (~6–9) — a common **sweet spot**: follows the prompt well while keeping natural quality.
- **High CFG** (>12–15) — follows the prompt **very strictly**, but pushes too hard → **oversaturated, high-contrast, "fried"/burnt** images with artifacts and reduced diversity.

## The Core Trade-off

CFG embodies a fundamental tension: **prompt adherence vs image quality/naturalness**.
- Too **low** → beautiful but off-prompt (ignores your instructions).
- Too **high** → on-prompt but over-cooked, harsh, distorted.
- The **middle** balances them. The ideal value depends on the **model** (some newer/distilled models want low CFG, e.g. ~1–2; classic SD ~7) and the **sampler/steps** (high CFG may need more steps to avoid artifacts).

## Design Guidance

- **Start CFG in the model's recommended range** (~7 for classic SD; much lower for some newer/turbo models) and adjust.
- **Lower CFG** if images look burnt/oversaturated or too rigid; **raise** if the model ignores your prompt.
- **Use negatives for known failure modes** (anatomy, quality, unwanted content) — but don't dump everything in.
- **Tune CFG and steps together** — high CFG often needs more steps or a robust sampler (see image-model-samplers-and-schedulers).
- **Fix the seed** while tuning CFG so you isolate its effect (see seed-and-reproducibility-image-gen).
- **Model-specific** — CFG norms differ; don't carry one model's value to another.

## Pitfalls (in understanding/using)

- **CFG too high** → "fried", oversaturated, artifact-heavy images (the classic mistake).
- **CFG too low** → the model ignores your prompt.
- Treating the **negative prompt as a hard filter** → it biases, doesn't guarantee.
- **Overloading** the negative prompt → over-constrains, unnatural results.
- Using **classic-SD CFG (~7)** on **turbo/distilled** models that want ~1–2 → burnt output.
- Tuning CFG **without fixing the seed** → can't tell what changed.
- Raising CFG to force adherence when the real fix is a **clearer prompt** or **ControlNet** for structure.
