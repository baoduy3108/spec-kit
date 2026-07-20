---
name: keyframe-animation-and-interpolation
description: How keyframe animation works — defining key poses at specific times and interpolating (tweening) the frames between, easing/timing curves, the animation principles that make motion feel alive, and how it applies to code/UI and AI video. Use to understand keyframes, tweening/interpolation, easing curves, animation timing, or in-betweening in generative video.
category: design
keywords_vi: keyframe animation interpolation, hoạt hình khung chính, nội suy tween in-between, easing timing curve, nguyên tắc animation sống động, áp dụng ui code video ai
---

# Keyframe Animation & Interpolation

Keyframe animation is the foundation of nearly all motion — from hand-drawn cartoons to CSS transitions to AI video. You define the **important moments** (keyframes) and the system **fills in the frames between** (interpolation/tweening). Understanding it explains easing, timing, and how smooth motion is produced (see gsap-animation, motion-and-storytelling).

## Keyframes & In-Betweens

- **Keyframes** — the **defining poses/states** at specific times: the start, the end, and any critical moments (a ball at the top and bottom of a bounce). The animator/designer sets these.
- **In-betweens (tweens)** — the frames **generated between** keyframes to create smooth motion. Historically drawn by hand ("inbetweeners"); now **interpolated** automatically by software.
So you specify *what* happens at key moments, and interpolation produces the continuous motion connecting them. This is far more efficient than defining every frame.

## Interpolation & Easing (why motion feels alive)

The **way** you interpolate between keyframes is what makes motion feel natural or robotic:
- **Linear interpolation** — constant speed between keyframes. Looks **mechanical/lifeless** — nothing in the real world moves at perfectly constant speed.
- **Easing (timing curves)** — vary the speed: **ease-in** (start slow, accelerate), **ease-out** (decelerate to a stop), **ease-in-out** (both). Real objects accelerate and decelerate, so easing makes motion feel **physical and alive**. Defined by curves (cubic-bezier in CSS, spline curves in animation tools).
- **Overshoot/anticipation/bounce** — curves that overshoot and settle add life and weight.
Getting the **timing and easing** right matters more than the keyframes themselves for how motion *feels*.

## Animation Principles

Classic principles (Disney's 12) make motion believable — key ones:
- **Timing & spacing** — how fast, and how frames are distributed (close spacing = slow, wide = fast).
- **Ease in/out** — acceleration/deceleration (above).
- **Anticipation** — a small opposite move before an action (wind-up).
- **Squash and stretch** — deformation conveying weight/force.
- **Follow-through** — parts continuing after the main motion stops.
These apply to characters, UI micro-interactions (see micro-interactions), and any motion design.

## Where It Applies

- **Traditional/3D animation** — pose keyframes, software in-betweens.
- **UI/web** — CSS `@keyframes`, transitions with easing, JS animation libraries (see gsap-animation) — same concept for interface motion.
- **AI/generative video** — generating frames **between** a start and end keyframe (interpolation), or using keyframes to control a generated clip's important moments (see image-to-video-and-animation, generative-media-pipeline) — a way to steer AI video.
- **Motion graphics, games, data-viz transitions.**

## Pitfalls (in understanding/using)

- **Linear interpolation** everywhere → lifeless, robotic motion; use **easing**.
- Wrong **timing** — too fast (jarring), too slow (sluggish); timing is most of the feel.
- **Too many keyframes** (over-specifying) losing the efficiency, or **too few** (motion misses key moments).
- Ignoring **animation principles** (anticipation, follow-through, squash/stretch) that make motion believable.
- **Overusing** motion/animation → distracting, tiring (see motion-and-storytelling, accessibility: respect reduced-motion).
- For AI video: expecting interpolation between distant keyframes to be perfect — big gaps → drift (see how-video-generation-works).
