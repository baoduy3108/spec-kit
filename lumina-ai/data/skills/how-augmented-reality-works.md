---
name: how-augmented-reality-works
description: How augmented reality works — tracking the device's position in the real world (SLAM, visual-inertial odometry), understanding the environment (plane/depth detection), and rendering virtual content registered to reality; plus occlusion, anchors, and the challenges. Use to understand AR, SLAM, ARKit/ARCore, placing virtual objects in the real world, or spatial tracking.
category: engineering
keywords_vi: augmented reality, ar slam, visual inertial, theo dõi vị trí thiết bị, thực tế tăng cường, hiểu môi trường plane depth, render ảo khớp thực, occlusion anchor
---

# How Augmented Reality Works

Augmented Reality (AR) overlays **virtual content onto the real world**, aligned so it appears to belong there — a virtual object sitting on your real table, staying put as you move. Making virtual content look **anchored to reality** requires the device to understand where it is and what's around it in real time.

## The Core Challenge: Registration

The magic (and difficulty) of AR is **registration** — keeping virtual content **precisely aligned** with the real world as the camera moves. If a virtual object drifts, jitters, or lags when you move the phone, the illusion breaks instantly. Achieving stable registration needs three things working together in real time: **tracking** the device's motion, **understanding** the environment, and **rendering** correctly.

## 1. Tracking: Where Is the Device?

AR must know the device's **position and orientation** in 3D space, updated continuously. It uses:
- **Visual-Inertial Odometry (VIO)** — fuse the **camera** (visual features tracked across frames — see computer-vision-basics) with the **IMU** (accelerometer/gyroscope — motion sensors). The camera gives accurate position but is slow/can lose features; the IMU is fast but drifts. Fusing them gives robust, low-latency 6-degrees-of-freedom tracking (see how-gps-works for a different positioning approach — GPS is far too coarse for AR).
- **SLAM (Simultaneous Localization and Mapping)** — build a **map** of the environment (feature points) **while** tracking the device's position within it. The device figures out both "where am I" and "what does the space look like" at once. This is what lets virtual content stay anchored.

## 2. Understanding the Environment

To place content believably, AR detects real-world structure:
- **Plane detection** — find flat surfaces (floors, tables, walls) to place objects on.
- **Depth / geometry** — estimate distances and shape (via depth sensors, LiDAR, or inference) for occlusion and physics.
- **Anchors** — fix virtual content to a real-world point so it stays there as the device moves and the map refines.
- **Lighting estimation** — match the virtual object's lighting to the real scene for realism.

## 3. Rendering (registered to reality)

Render the virtual content from the **device's current viewpoint** so it aligns with the camera feed, with:
- **Occlusion** — real objects should hide virtual ones that are behind them (a virtual ball rolling behind a real couch). Hard without good depth; poor occlusion (virtual objects floating in front of everything) is a giveaway.
- **Consistent lighting/shadows** — so it looks placed, not pasted.
- **Low latency** — all of this per frame, fast, or it lags/jitters.

## Frameworks & Hardware

ARKit (iOS), ARCore (Android), and headset platforms handle the tracking/SLAM/environment layers so apps focus on content. LiDAR/depth sensors improve depth/occlusion; headsets add stereo displays and hand/eye tracking.

## Pitfalls (in understanding/using)

- **Drift/jitter** — virtual content sliding or shaking when moving → broken illusion; robust VIO/SLAM and anchors are essential.
- **Poor occlusion** — virtual objects floating in front of real ones (no depth understanding) → obviously fake.
- **Tracking loss** — featureless/dark/reflective surfaces or fast motion break visual tracking; the map is lost.
- **Mismatched lighting** — virtual objects that don't match scene lighting look pasted-on.
- Expecting **GPS-level** positioning to suffice — AR needs centimeter-level, hence VIO/SLAM.
- **Latency** — rendering that lags the camera causes swimming/discomfort.
- Ignoring **environment understanding** (planes/depth) — content that can't be placed or occluded properly.
