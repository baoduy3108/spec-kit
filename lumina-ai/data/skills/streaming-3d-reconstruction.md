---
name: streaming-3d-reconstruction
description: Reconstructing 3D scene geometry (point clouds/depth) in real time from a stream of images or video frames using a feed-forward foundation model — no per-scene optimization. Covers the online setting (frames arrive one at a time), coordinate grounding and drift correction across a long trajectory, anchor/trajectory memory, and efficient streaming inference (paged KV-cache attention) at interactive frame rates. Use to understand real-time 3D reconstruction from video, feed-forward geometry models, or streaming SLAM-style pipelines.
category: computer-vision
keywords_vi: tái tạo cảnh 3d thời gian thực từ video, mô hình feed-forward dựng hình 3d, point cloud từ luồng ảnh, sửa trôi tọa độ theo quỹ đạo, suy luận streaming paged kv cache, dựng 3d online không tối ưu từng cảnh
---

# Streaming 3D Reconstruction

Reconstructing 3D geometry from images has classically meant **per-scene optimization** — bundle adjustment / NeRF / Gaussian-splat fitting that grinds on a fixed set of photos for minutes or hours. **Streaming reconstruction** is a different regime: frames arrive **one at a time** (a live video), and you must produce updated 3D geometry **immediately and continuously**, at interactive frame rates. The enabling shift is a **feed-forward foundation model** that *predicts* geometry in a single forward pass instead of optimizing it (see how-3d-rendering-works, 3d-scene-representation, how-neural-networks-learn, kv-cache-and-attention-optimization).

## Offline Optimization vs Online Feed-Forward

- **Offline / optimization-based** — see all frames, iteratively solve for camera poses + geometry. Accurate but **slow** and **batch** (can't run live).
- **Online / feed-forward** — a trained model maps the incoming frame(s), plus memory of what's been seen, directly to 3D output in **one pass**. No per-scene training; it **generalizes** from large-scale pretraining. This is what makes ~real-time (interactive FPS) reconstruction possible.

## The Two Hard Problems of "Streaming"

**1. Coordinate grounding.** Each new frame must be placed in a **consistent global frame** — where is this frame relative to everything seen so far? Without grounding, each frame's geometry floats in its own coordinates.

**2. Drift.** Over a long trajectory, small per-frame errors **accumulate**, so the reconstruction slowly bends/warps (classic SLAM drift). A streaming model needs **explicit drift correction** — reconciling new observations against accumulated structure — or a 10,000-frame sequence degrades badly.

The architectural answer is a **geometric context transformer** that unifies coordinate grounding, geometric cues, and drift correction in one streaming pass, using **anchor context** (stable reference structure) and **trajectory memory** (a running summary of the path) so each new frame is grounded against a coherent history rather than only the previous frame.

## Efficient Streaming Inference

Real-time means you can't recompute the whole history per frame. The trick mirrors LLM decoding: **cache** what's been processed and attend to it incrementally. A **paged KV-cache attention** scheme keeps the growing trajectory memory addressable at bounded cost, letting the model attend over a long history while sustaining interactive frame rates (e.g. tens of FPS at modest resolution) even on sequences of many thousands of frames.

## Design Guidance

- **Pick regime by need** — live/interactive → feed-forward streaming; max-accuracy offline map → optimization-based.
- **Ground every frame** to a global coordinate frame; don't let frames float.
- **Correct drift explicitly** — anchor context + trajectory memory, not just frame-to-frame.
- **Cache the history** (paged KV) so per-frame cost stays bounded as the sequence grows.
- **Match resolution to the FPS budget** — interactive rates trade off input size.
- **Expect a foundation model** — the generalization comes from large-scale pretraining, not per-scene fitting.

## Pitfalls (in understanding/using)

- Assuming feed-forward = **less accurate everywhere** — for live use it's the only option; offline still wins on final map quality.
- **Ignoring drift** → long trajectories warp; you need explicit correction, not just odometry.
- **Frame-to-frame only** memory → loses global consistency; keep anchor/trajectory context.
- **Recomputing full history** per frame → kills the frame rate; cache incrementally.
- Confusing this with **per-scene NeRF/splatting** — those optimize offline; this predicts online.
- Feeding **too-high resolution** for the FPS target → drops below real-time.
