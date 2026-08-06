---
name: shader-graphs-and-node-based-materials
description: Node-based shader authoring — Unity Shader Graph, Unreal Material Editor, and Godot visual shaders. Covers the vertex/fragment split as nodes, common node patterns (UV, time, noise, Fresnel, lerp, panner), PBR material outputs, driving materials from code via exposed properties, and performance of node graphs. Use when building shaders visually, authoring materials, or creating effects like dissolve, water, holograms, and glow without writing raw GLSL/HLSL.
category: game-dev
keywords_vi: shader graph, node material, visual shader, tạo shader bằng node, unity shader graph, unreal material editor, godot visual shader, fresnel dissolve panner node, hiệu ứng nước hologram glow, thuộc tính material lộ ra code
---

# Shader Graphs & Node-Based Materials

Modern engines let you author shaders **visually** — wiring nodes instead of writing GLSL/HLSL. **Unity Shader Graph**, **Unreal's Material Editor**, and **Godot's Visual Shaders** all follow the same model, generating the underlying shader code for you (see webgl-and-shader-fundamentals for the code underneath, shader-effects-and-post-processing for post FX).

## The Node Model

- A material graph is a **flow of nodes** from inputs → operations → a **master/output node** (Base Color, Metallic, Roughness, Normal, Emission, Opacity — the PBR surface).
- Two stages appear as node contexts: **vertex** (move/deform geometry — waves, wind, bulge) and **fragment/pixel** (per-pixel color/lighting).
- You think in **data flowing through nodes** rather than lines of code; the engine compiles the graph to an optimized shader.

## Common Nodes & Patterns

- **UV** — texture coordinates; manipulate them to scroll/tile/distort. **Panner** scrolls UVs over **Time** (flowing water, conveyor, energy).
- **Time** — drives all animation (`sin(Time)` pulses, panners, rotations).
- **Noise** (Perlin/Simplex/Voronoi) — procedural variation for dissolve, clouds, terrain blends.
- **Lerp (mix)** — blend two values/colors by a factor; the workhorse for masks and transitions.
- **Fresnel** — edge glow based on view angle (rim light, holograms, force fields, shields).
- **Dot/Normal/Step/Smoothstep** — lighting terms, hard/soft masks, toon banding.
- **Texture Sample** — feed maps into color/normal/mask inputs.

## Classic Effects (recipes)

- **Dissolve** — sample noise, `Step`/`Smoothstep` against a threshold you animate → clip pixels below it; add an emissive edge from the threshold band.
- **Water** — panner-scrolled normal maps + Fresnel reflection + depth-based color; vertex sine waves for the surface.
- **Hologram** — Fresnel rim + scrolling scanlines (UV + Time) + emission + partial opacity.
- **Toon/cel** — quantize the lighting dot product with `Step` into bands.

## Exposing to Code & Performance

- **Exposed properties** (Shader Graph "Blackboard" / Unreal material **parameters**) become material fields the game sets at runtime: `material.SetFloat("_Dissolve", t)`, or a **Material Instance** in Unreal. Animate effects from gameplay without touching the graph.
- **Performance** — every node is math the GPU runs **per pixel**. Watch **texture samples** (bandwidth), heavy **noise**, and long dependency chains. Move constant work to the vertex stage or precompute; use `Material Instances` instead of many unique materials (batching). Profile with the engine's shader/GPU tools (see game-performance-optimization-and-profiling).

Author materials visually with **node graphs** — flowing UV/Time/Noise/Fresnel/Lerp nodes into PBR outputs across vertex and fragment stages — to build dissolve, water, hologram, and toon effects **without raw shader code**. Expose graph **properties/parameters** so gameplay drives effects at runtime, and keep an eye on per-pixel cost (texture samples, noise, chain length), using material instances for batching.
