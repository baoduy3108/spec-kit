---
name: three-js-and-web-3d
description: Three.js and web 3D — the scene graph (scene/mesh/geometry/material), cameras, lights, loading GLTF models, the render loop, the AnimationMixer for clip playback, controls, and performance (draw calls, instancing, disposal). Use when building 3D on the web, using three.js, loading/animating 3D models in the browser, or rendering interactive 3D scenes.
category: engineering
keywords_vi: three.js và web 3d, đồ thị cảnh scene mesh geometry material, camera và đèn light, tải mô hình gltf glb, vòng lặp render loop, phát animation clip animationmixer, điều khiển orbit controls, hiệu năng draw call instancing giải phóng dispose
---

# Three.js & Web 3D

Three.js is the standard library for 3D in the browser — a friendly layer over raw WebGL (see webgl-and-shader-fundamentals). It handles the boilerplate (shaders, matrices, buffers) so you work with intuitive objects: a scene, meshes, cameras, and lights. Understanding its structure lets you build anything from a product viewer to a full 3D game on the web.

## The Scene Graph

Three.js organizes everything as a **tree** of objects (Object3D) with parent-child transforms:
- **Scene** — the root container.
- **Mesh** = **Geometry** (the shape: vertices/faces — box, sphere, or loaded model) + **Material** (how it looks: color, texture, how it responds to light — `MeshStandardMaterial` for PBR).
- **Group** — an empty node to transform children together.
- **Camera** — `PerspectiveCamera` (realistic, most common) or `OrthographicCamera` (no perspective, for isometric/CAD).
- **Lights** — ambient (flat fill), directional (sun), point, spot. PBR materials need lights to be visible.

Child transforms compose with parents (a wheel parented to a car moves with it) — same idea as any scene graph.

## The Render Loop

Nothing draws until you render each frame:
```js
function animate() {
  requestAnimationFrame(animate);
  // update objects, controls, mixer
  renderer.render(scene, camera);
}
```
Drive animation and physics inside this loop, ideally scaled by a **delta time** (from `THREE.Clock`) so motion is framerate-independent (see game-loop-and-fixed-timestep).

## Loading Models

Real content comes as **GLTF/GLB** (the "JPEG of 3D") via `GLTFLoader`. A loaded GLTF brings its meshes, materials, textures, and often **animations** (clips). Draco/Meshopt compression shrinks them. Add the loaded `scene` to yours and it appears.

## Animation: The AnimationMixer

Three.js plays **AnimationClips** (baked keyframe tracks, e.g. a character's "run" from Blender/GLTF) through an **AnimationMixer**:
- Create a mixer per animated model; get **AnimationActions** from clips.
- `action.play()`, and call `mixer.update(delta)` every frame.
- **Crossfade** between actions for smooth transitions (idle → run) — `action.crossFadeTo()`. This is skeletal animation playback (see skeletal-animation-and-skinning).

For procedural motion, just tween object properties in the loop (or with a tween lib) — position, rotation, scale, material values.

## Controls & Interaction

`OrbitControls` (drag to orbit) is the quick default; `PointerLockControls` for FPS. **Raycasting** turns a mouse position into a ray to detect which object was clicked/hovered — the basis of all 3D picking and interaction.

## Performance

Web 3D is easy to make slow:
- **Draw calls** dominate — each mesh/material is a call. **Merge** static geometry and use **InstancedMesh** for many copies (trees, crowds) to batch thousands into one call.
- **Textures & materials** — reuse, size sensibly, share materials.
- **Dispose** geometries/materials/textures you remove (`.dispose()`) — three.js won't GC GPU memory for you; leaks crash long sessions.
- **Lights & shadows** are expensive — limit shadow-casting lights, bake where possible.
- **Pixel ratio** — cap `renderer.setPixelRatio` on hi-DPI/mobile to avoid rendering 4× the pixels.
- **Frustum culling** is automatic; LOD (level of detail) swaps simpler meshes at distance.

## Ecosystem

For React apps, **react-three-fiber** expresses the scene graph declaratively as components (with **drei** helpers). Physics via cannon/rapier, post-processing via EffectComposer (see shader-effects-and-post-processing). But the core mental model — scene graph + render loop + mixer — is the same everywhere.

The winning approach: build the scene tree, load GLTF assets, drive an AnimationMixer + your logic from a delta-timed render loop, and guard performance with instancing and disposal. That's a production web-3D app.
