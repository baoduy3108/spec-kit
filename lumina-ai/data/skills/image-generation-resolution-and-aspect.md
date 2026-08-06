---
name: image-generation-resolution-and-aspect
description: How resolution and aspect ratio affect image generation — why diffusion models work best near their trained resolution, why generating too large causes duplicated/deformed subjects, aspect-ratio effects on composition, and the generate-small-then-upscale workflow. Use to understand image generation resolution limits, why subjects duplicate at high res, aspect ratio choice, or the base-resolution-plus-upscale approach.
category: engineering
keywords_vi: độ phân giải và tỉ lệ khung ảnh khi vẽ, model diffusion chạy tốt quanh độ phân giải huấn luyện, vẽ quá lớn gây nhân đôi biến dạng chủ thể, tỉ lệ khung ảnh hưởng bố cục, vẽ nhỏ rồi upscale
---

# Resolution and Aspect Ratio in Image Generation

The resolution and aspect ratio you generate at have big, sometimes surprising effects on image models — including the notorious problem where generating too large produces **duplicated or deformed subjects** (two heads, extra limbs, repeated objects). Understanding *why* leads to the standard **generate near base resolution, then upscale** workflow (see how-diffusion-models-work, image-upscaling-methods).

## Models Have a Native Resolution

A diffusion model is **trained on images of a specific size** (e.g. SD 1.5 around 512×512, SDXL around 1024×1024). It learns what a well-composed image looks like **at that size**. Generate near it → best results. Stray far from it → the model is out of its comfort zone.

## Why Too-Large Generation Duplicates Subjects

Here's the key phenomenon: if you generate at a resolution **much larger** than the model was trained on, you often get **duplicated or deformed content** — two suns, a person with two heads, repeated buildings. Why? The model composes based on its trained-resolution "sense of scale." A canvas far larger than that looks, to the model, like it should contain **more than one** subject-sized region, so it **fills the extra space by repeating** the subject. It doesn't understand "one big subject filling a huge frame." That's why cranking resolution directly is a trap.

## The Standard Workflow: Generate Small, Then Upscale

The fix: **generate at (or near) the model's base resolution**, get a good, coherent composition, **then upscale** to the final large size (see image-upscaling-methods):
- **Hires fix / latent upscale** — generate at base res, then upscale + run more diffusion steps at higher res to add coherent detail without introducing duplication.
- **Dedicated upscalers** (ESRGAN, etc.) — enlarge the finished image.
This gives large, detailed images **without** the duplicated-subject artifacts, and is why generation tools default to base resolution with an upscale pass.

## Aspect Ratio Affects Composition

The **shape** of the canvas influences what the model generates, not just the size:
- **Square** (1:1) — balanced, common default.
- **Portrait** (e.g. 2:3, 9:16) — favors standing figures, faces, phone wallpapers.
- **Landscape** (3:2, 16:9) — favors scenery, wide scenes, cinematic shots.
The model composes to fit the frame, so aspect ratio is a **compositional choice** — a portrait prompt in a wide frame may add unwanted scenery or extra subjects to fill the width. Match aspect ratio to your subject. Extreme/unusual ratios (very wide panoramas) can again push the model out of distribution and cause repetition.

## Design Guidance

- **Generate near the model's base resolution** for coherent composition.
- **Upscale afterward** (hires fix / upscaler) for large final images — don't generate huge directly.
- **Choose aspect ratio for the subject** — portrait for figures, landscape for scenes.
- **Avoid extreme resolutions/ratios** in the initial generation (duplication risk); reach them via upscaling/outpainting.
- **SDXL vs SD1.5** — use resolutions appropriate to the model (≈1024 vs ≈512).
- For panoramas, consider **outpainting** (extend the canvas — see controllable-image-generation) rather than generating ultra-wide at once.

## Pitfalls (in understanding/using)

- Generating **much larger** than base resolution → duplicated/deformed subjects (two heads, repeated objects).
- Assuming **bigger generation = more detail** → it causes artifacts; upscale instead.
- **Mismatched aspect ratio** (portrait subject in wide frame) → the model fills space with extra content.
- Using **SD 1.5 resolutions on SDXL** (or vice versa) → suboptimal results.
- **Extreme panoramic** ratios in one pass → repetition; use outpainting.
- Forgetting the **generate-small-then-upscale** workflow and fighting artifacts at high res directly.
