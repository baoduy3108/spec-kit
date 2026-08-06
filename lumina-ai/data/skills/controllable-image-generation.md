---
name: controllable-image-generation
description: How to control image generation beyond text prompts — image-to-image, ControlNet (pose/depth/edge/scribble conditioning), inpainting/outpainting, reference/identity conditioning (IP-Adapter, LoRA), and combining controls. Use to understand ControlNet, controlling composition/pose/structure in image AI, inpainting, consistent characters, or precise generative control.
category: ai-agent
keywords_vi: controllable image generation, điều khiển sinh ảnh, image to image, controlnet pose depth edge scribble, inpainting outpainting, reference identity ip-adapter lora, kết hợp control
---

# Controllable Image Generation

Text prompts alone give **loose** control over generated images (see prompt-engineering-for-visual-media) — you can't precisely dictate a pose, composition, or a specific character's identity with words. **Controllable generation** techniques add **structural and reference conditioning** on top of diffusion (see how-diffusion-models-work) so you can steer *exactly* what you want.

## Why Text Isn't Enough

"A person in a dynamic pose" leaves the exact pose to chance; "the same character in a new scene" is near-impossible from text (the model has no memory of your character). For real production — matching a layout, a specific pose, a consistent character across images — you need to **condition on visual inputs**, not just words.

## Image-to-Image

Start from an **input image** instead of pure noise: the model transforms it, guided by a prompt, keeping some of the input's structure (controlled by a "strength"/denoise parameter — low = close to the input, high = more freedom). Great for restyling, variations, and refining. The simplest form of visual control.

## ControlNet (structural conditioning)

The key technique for **precise structural control**: **ControlNet** conditions generation on a **control map** extracted from a reference:
- **Pose** (OpenPose skeleton) — generate a person in an **exact pose** you specify (from a stick figure or extracted pose — see motion-capture-and-pose-estimation).
- **Depth** map — match a specific 3D layout/composition.
- **Edges / Canny / lineart** — follow specific outlines (great for turning a sketch into a render).
- **Scribble** — a rough doodle guides the composition.
- **Segmentation** — control which regions contain what.
So you provide the **structure** (pose/depth/edges) and the prompt provides the **content/style** — decoupling *what it looks like* from *how it's arranged*. This is how you get generation to obey a precise composition/pose.

## Inpainting & Outpainting

- **Inpainting** — regenerate a **masked region** of an image while keeping the rest (fix a hand, replace an object, remove something, edit locally).
- **Outpainting** — extend an image **beyond its borders** (expand the canvas, generate what's around it).
Essential for editing and compositing rather than regenerating whole images.

## Reference & Identity Conditioning (consistency)

The hard problem of **consistent characters/styles** across images:
- **IP-Adapter / reference conditioning** — feed a **reference image** so the output matches its style, subject, or face.
- **LoRA / fine-tuning / textual inversion** — train a lightweight add-on to teach the model a **specific character, style, or object** so you can generate it reliably in new contexts (see model-quantization for LoRA's efficiency idea).
- **Face/identity adapters** — preserve a specific person's likeness.
This is what enables consistent characters across a series (crucial for storytelling/media — see generative-media-pipeline).

## Combining Controls

Real workflows **stack** these: a ControlNet pose + a character LoRA + a style reference + inpainting for fixes — precise structure, consistent identity, chosen style, local edits. Layering controls is how professionals get exactly the image they want from generative AI.

## Pitfalls (in understanding/using)

- Expecting **text prompts** to give precise pose/composition/identity — use ControlNet/references.
- **Conflicting controls** (a pose map fighting the prompt, over-strong conditioning) → artifacts; balance them.
- Image-to-image **strength** wrong — too low (no change) or too high (loses the input's structure).
- Expecting **consistent characters** from prompts alone — needs LoRA/IP-Adapter/reference conditioning.
- **Inpainting** with a bad mask/mismatched context → visible seams; blend carefully.
- Over-controlling → rigid, artifact-prone output; under-controlling → not enough precision. Tune the balance.
- Assuming these are automatic — controllable generation is a **workflow** of layered tools, not one button.
