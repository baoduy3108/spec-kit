---
name: hot-reload-and-fast-feedback
description: Why the speed of the edit-see-result loop dominates developer productivity, and how tools make it fast — hot reload / hot module replacement, incremental compilation, and preserving state across edits. Covers the difference between full reload, live reload, and HMR, why fast feedback changes how you work, and the trade-offs. Use to understand dev-server tooling (Vite/webpack HMR), watch modes, and to optimize your own feedback loop.
category: devops
keywords_vi: tốc độ vòng lặp sửa-thấy-kết-quả quyết định năng suất lập trình, hot reload thay module nóng hot module replacement biên dịch tăng dần giữ nguyên trạng thái khi sửa, khác biệt full reload live reload và hmr, phản hồi nhanh thay đổi cách làm việc, chế độ watch dev server vite webpack, đánh đổi
---

# Hot Reload & Fast Feedback

The single biggest lever on day-to-day developer productivity isn't typing speed or the language — it's the **latency of the feedback loop**: how long from "I changed something" to "I see the result." A 10-minute rebuild kills flow and forces context-switching; a sub-second update lets you iterate in a tight, exploratory loop. Modern dev tooling invests enormously in shrinking this loop via **hot reload**, **incremental compilation**, and **state preservation** (see incremental-and-hermetic-builds, game-loop-and-fixed-timestep, iterative-development-with-agents).

## The Three Levels of "Reload"

- **Full rebuild + restart** — recompile everything, restart the app/server, reload the page from scratch. Slowest; you lose all runtime state (scroll position, form input, which screen you were on). The baseline to escape.
- **Live reload** — a watcher detects a file change and **reloads the whole page/app** automatically (no manual refresh). Faster than manual, but still a **full page reload** → you lose in-app state and start over each time.
- **Hot Module Replacement (HMR)** — the surgical version: swap **only the changed module** into the **already-running** app **without a full reload**, and **preserve state**. Edit a component, see it update in place with your form still filled and your route unchanged. This is the gold standard (Vite, webpack HMR, React Fast Refresh) and what makes UI development feel live.

## Why State Preservation Matters

The magic of HMR is **keeping runtime state across edits**. Without it, every change resets you to the app's initial state, and to test a change three screens deep you re-navigate every time — brutal for complex UIs. HMR patches the running program so your **exact current state persists** while the code updates. This is technically hard (the framework must know how to swap a module and reconcile state), which is why HMR support is framework/tool-specific and sometimes falls back to a full reload when it can't safely hot-swap.

## Incremental Compilation Underneath

Fast reload needs fast **rebuilds**: recompile only what changed, not the whole project (see incremental-and-hermetic-builds). Tools achieve this with **watch modes** (persistent process holding a warm cache/module graph), incremental type-checking, and native-speed bundlers (esbuild/SWC/Vite's on-demand ESM). The dev build is deliberately different from the production build — optimized for **speed of iteration**, not output size.

## Why It Changes How You Work

Fast feedback isn't just "nicer" — it changes behavior. When the loop is sub-second you **experiment more**, make smaller changes, and stay in flow; when it's minutes you batch changes, guess more, and lose context. The same principle drives TDD (fast test feedback), REPLs, and live coding. **Optimizing your feedback loop is one of the highest-ROI things a team can do.**

## Design Guidance (for understanding/using)

- **Treat feedback-loop latency as a first-class metric** — measure and shrink edit→result time; it compounds all day.
- **Use HMR/Fast Refresh** for UI work — preserve state across edits; don't settle for full live-reload if HMR is available.
- **Keep a warm watch process / incremental build** — avoid cold full rebuilds during development.
- **Separate dev and prod builds** — dev optimizes for iteration speed, prod for size/perf.
- **Expect HMR to fall back** sometimes (state that can't be preserved) — that's normal; the win is the common case.

## Pitfalls (in understanding/using)

- Tolerating a **slow rebuild loop** → constant context-switching, lost flow, fewer experiments.
- Settling for **full live-reload** when **HMR** is available → losing app state on every edit.
- Using the **production build** in development → slow iteration for no benefit; use the fast dev pipeline.
- Cold rebuilds instead of a **watch/incremental** process → paying full compile cost per change.
- Assuming HMR preserves **all** state → some changes force a reload; design components to be HMR-friendly.
