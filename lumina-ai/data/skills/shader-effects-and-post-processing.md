---
name: shader-effects-and-post-processing
description: Shader effects and post-processing — the full-screen effect pipeline (render to texture, then process), bloom, tone mapping/HDR, color grading, vignette, chromatic aberration, blur/DOF, CRT/retro filters, and screen-space effects. Use when adding visual polish, glow, retro looks, or post-processing to a game or graphics app.
category: engineering
keywords_vi: hiệu ứng shader, hậu xử lý post-processing, render ra texture rồi xử lý, bloom quầng sáng, tone mapping hdr, chỉnh màu color grading, vignette tối viền, quang sai màu chromatic aberration, bộ lọc crt retro, screen-space effect
---

# Shader Effects & Post-Processing

Post-processing is the layer of visual polish applied to the **whole rendered frame** after the scene is drawn — bloom, color grading, vignette, retro CRT looks. It's where a lot of a game's "mood" and production value comes from, and it's mostly full-screen fragment shaders.

## The Pipeline

The core idea: **render the scene into a texture** (a framebuffer) instead of directly to screen, then run one or more **full-screen shader passes** that read that texture, process every pixel, and output the result. Chain passes (scene → bloom → tone-map → grade → vignette → screen). This "render-to-texture then process" is the backbone of every effect below.

## Bloom (Glow)

The most impactful effect. Bright areas bleed light into their surroundings:
1. **Extract** pixels above a brightness threshold.
2. **Blur** them (usually a multi-pass Gaussian, often downsampled for cheap wide blur).
3. **Add** the blurred bright pass back over the original.

Bloom makes lights, emissive surfaces, and highlights feel genuinely *bright* — essential for neon, magic, sci-fi, and HDR looks. Overdone, it washes everything out; tune the threshold and intensity.

## HDR & Tone Mapping

Render in **high dynamic range** (values >1.0 for bright lights), then **tone-map** down to displayable range with a curve (ACES, Reinhard, Uncharted2). Tone mapping is what makes bright scenes look natural instead of blowing out to flat white, and it's the foundation of a modern lit look. Pair with **exposure** (auto or manual) for eye-adaptation.

## Color Grading

Remap colors for mood — teal-orange blockbuster, desaturated horror, warm nostalgia. Implemented efficiently with a **LUT** (a lookup texture that maps input color → graded color); artists design the grade in a photo tool and the shader just samples it. One LUT swap can completely change a game's emotional tone.

## The Effect Toolbox

- **Vignette** — darken edges to focus the eye (see 2d-lighting-and-shadows).
- **Chromatic aberration** — split RGB channels slightly at screen edges; adds a lens/glitch feel (subtle, or it nauseates).
- **Blur / depth of field** — blur by distance for cinematic focus; radial/motion blur for speed.
- **CRT / retro** — scanlines, curvature, phosphor glow, palette quantization for authentic retro looks.
- **Screen-space effects** — SSAO (contact shadows), screen-space reflections — approximate expensive effects using only the framebuffer + depth.
- **Distortion** — heat haze, shockwaves, underwater ripple via UV-offset shaders.
- **Transitions & damage feedback** — full-screen flashes, desaturation on low health, dithered dissolves.

## Performance & Taste

- Post passes cost **fill-rate**; do wide blurs at **half/quarter resolution** and upscale — usually indistinguishable, far cheaper.
- **Combine passes** where possible (grade + vignette + aberration in one shader) to save framebuffer round-trips.
- **Restraint wins** — effects should serve mood and readability, not bury the game. The best post-processing is felt, not noticed: the scene simply looks rich, cohesive, and intentional.

Post-processing is the cheapest large jump in perceived quality — the same scene with good bloom, tone mapping, and a grade looks a generation better than the raw render.
