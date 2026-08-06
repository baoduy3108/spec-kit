---
name: lottie-and-dotlottie-animation
description: Lottie and dotLottie animation — the Lottie JSON format, exporting from After Effects (Bodymovin), playing Lottie on web/mobile, the compact dotLottie (.lottie) format, interactivity and control, and optimization. Use for Lottie animations, JSON/dotLottie export, playing vector animations on web/app, or lightweight motion graphics.
category: frontend
keywords_vi: hoạt ảnh lottie và dotlottie, định dạng lottie json, xuất từ after effects bodymovin, phát lottie trên web và di động, định dạng dotlottie nhỏ gọn, tương tác và điều khiển lottie, tối ưu hoạt ảnh
---

# Lottie & dotLottie Animation

Lottie is a format and library ecosystem for shipping **rich vector animations** as small, scalable, code-driven assets — instead of heavy GIFs or videos. Designed at Airbnb, it renders animations exported from After Effects natively on web, iOS, and Android, staying crisp at any size.

## What Lottie Is

- **Lottie JSON** — a JSON file describing a vector animation (shapes, paths, transforms, keyframes) exported from After Effects. It's *data*, not pixels — so it's tiny, scalable, and manipulable by code.
- **Why** — vector animations that would be huge as video/GIF become a few KB of JSON, render sharply at any resolution, and can be controlled programmatically (play, pause, seek, change colors).

## Exporting (After Effects → Bodymovin)

- **Bodymovin / LottieFiles plugin** — the After Effects plugin that exports a composition to Lottie JSON.
- **Design constraints** — Lottie supports shape layers, masks, mattes, and many effects, but *not* everything (some AE effects, expressions, and raster content don't translate). Design within supported features for clean export.
- **LottieFiles** — a marketplace/toolset for finding, editing, testing, and converting Lottie animations.

## Playing Lottie

- **Web** — `lottie-web` or the `<lottie-player>`/`dotlottie-player` web component renders the JSON on canvas/SVG/HTML. Load the JSON, attach to a container, control playback.
- **Mobile** — native Lottie libraries for iOS (Swift) and Android (Kotlin), and React Native — same JSON, native rendering.
- **Renderers** — SVG (crisp, DOM-heavy), Canvas (faster for complex), or HTML. Choose by complexity/performance.

## dotLottie (.lottie)

- **dotLottie** — a newer **compressed, bundled** format: a ZIP containing the Lottie JSON plus assets (images, multiple animations, themes, config). Much **smaller** than raw JSON (often 80%+ reduction) and self-contained.
- Use `.lottie` for production to cut payload; the `dotlottie-player`/`@lottiefiles/dotlottie-web` plays it. The modern default for shipping Lottie.

## Interactivity & Control

- **Programmatic control** — play/pause/stop, seek to a frame, set speed and direction, loop, and play segments.
- **Interactive triggers** — react to scroll, hover, click, or state (e.g. a play button animating on tap, a scroll-driven scrubbed animation — see gsap-scrolltrigger). `@lottiefiles/lottie-interactivity` and dotLottie's state machines enable this.
- **Dynamic theming** — recolor shapes at runtime (change stroke/fill) to match themes without re-exporting.

## Optimization

- **Reduce complexity** — fewer layers, simpler paths, avoid unsupported effects that bloat the JSON.
- **Use dotLottie** to compress; lazy-load animations; limit simultaneously-playing animations (each costs render time).
- **Renderer choice and frame rate** — canvas for heavy scenes, cap FPS if needed. Respect `prefers-reduced-motion`.

Master Lottie via the **Lottie JSON format** (vector animation as tiny code-driven data), **exporting from After Effects** (Bodymovin, within supported features), **playing it** across web (lottie-web / players) and native mobile, the compact **dotLottie (.lottie)** bundled format for production, **interactivity and control** (programmatic playback, scroll/hover triggers, runtime theming), and **optimization** (simplify, compress, respect reduced-motion). Lottie is the standard for shipping premium vector motion graphics that stay small, sharp, and fully controllable — from JSON/dotLottie export to interactive playback.
