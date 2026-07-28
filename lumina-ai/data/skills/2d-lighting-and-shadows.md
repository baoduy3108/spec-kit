---
name: 2d-lighting-and-shadows
description: 2D dynamic lighting and shadows — light maps and additive blending, radial/spot falloff, normal maps for faked depth, shadow casting from occluders (ray/shadow volumes), and day-night ambient tinting. Use when adding atmosphere, mood lighting, or dynamic shadows to a 2D game or scene.
category: engineering
keywords_vi: ánh sáng 2d động, đổ bóng shadow từ vật cản, light map trộn cộng additive, độ suy giảm sáng radial spot falloff, normal map giả chiều sâu 2d, ám màu ngày đêm ambient, không khí mood ánh sáng game 2d
---

# 2D Lighting & Shadows

Dynamic lighting transforms a flat 2D scene into something atmospheric — a torch flickering in a cave, a spotlight sweeping, a warm sunset. Unlike 3D, there's no real geometry, so 2D lighting is a set of clever 2D compositing tricks.

## The Light Map

The core technique: render lights into a separate **light map** texture, then multiply (or add) it over the scene.
1. Clear the light buffer to the **ambient color** (dark blue night, warm dusk, near-white day).
2. For each light, draw a **radial gradient** (bright center → transparent edge) with **additive blending** so overlapping lights accumulate.
3. Composite: `finalPixel = scenePixel * lightMap` (multiply darkens unlit areas; add for glow bloom on top).

This is cheap and scales to many lights. The gradient's falloff curve controls the mood — a sharp falloff is a harsh spotlight, a soft one is ambient glow.

## Falloff & Light Types

- **Point/radial** — intensity ∝ `1 - (dist/radius)`, or physically-ish `1/(1 + k·d²)`. Clamp to a max radius so it's bounded.
- **Spot** — a point light masked by a cone (angle test on direction).
- **Directional** — uniform angle (sunlight); mostly just tints ambient.
- **Color & flicker** — animate intensity/position with noise for fire; lerp ambient over a day-night cycle.

## Faking Depth: Normal Maps

Flat sprites lit uniformly look flat. A **normal map** stores each pixel's surface direction (RGB = XYZ normal). In the shader, `brightness = max(0, dot(normal, lightDir))` — now a "round" rock catches light on the side facing the lamp and shades the other. This gives 2D art a convincing 3D feel with no extra geometry, and is the backbone of "2.5D" lit pixel art.

## Shadows from Occluders

To make lights **cast shadows** off walls/objects:
- **Ray-based** — for each occluder edge, project its endpoints away from the light to build a **shadow volume** (a dark quad) and draw it into the light buffer, subtracting light behind the object.
- **1D shadow maps** — for many lights, render distances to occluders around each light into a small texture, then sample it to test "is this pixel in shadow?" — far faster for lots of dynamic lights.

Soft shadow edges (penumbra) come from a light with area: blur the shadow or sample multiple offset rays.

## Practical Pitfalls

- **Banding** in gradients on 8-bit buffers — add tiny dithering.
- **Over-brightening** with additive — tone-map or clamp so highlights don't blow out to white.
- **Performance** — a light map at half resolution then upscaled is usually indistinguishable and much cheaper.

Lighting is one of the highest mood-per-effort wins in 2D: the same scene reads as cozy, tense, or eerie purely by ambient color and light placement.
