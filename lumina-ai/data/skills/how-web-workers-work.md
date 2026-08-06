---
name: how-web-workers-work
description: How web workers work — running JavaScript on a background thread separate from the UI so heavy computation doesn't freeze the page, communicating via message passing, and their no-shared-DOM constraints. Use to understand web workers, offloading heavy JS off the main thread, keeping the UI responsive, or background threads in the browser.
category: engineering
keywords_vi: web workers, luồng nền javascript, tách khỏi luồng ui, tính toán nặng không đơ trang, giao tiếp message passing, không truy cập dom trực tiếp, giữ giao diện mượt
---

# How Web Workers Work

Web workers let JavaScript run on a **background thread**, separate from the main UI thread — so **heavy computation doesn't freeze the page**. Since JS in the browser is otherwise single-threaded, a long-running task on the main thread blocks everything (rendering, clicks, scrolling); workers are the escape hatch (see how-browser-rendering-works, concurrency-and-parallelism).

## The Problem: One Thread for Everything

The browser's main thread does **everything**: running your JavaScript, handling events, computing layout, and painting (see how-browser-rendering-works). Because it's **single-threaded**, a heavy synchronous task — parsing a big file, image processing, a complex calculation — **blocks** the whole thread. The page becomes unresponsive: clicks don't register, scrolling stutters, animations freeze (the dreaded "page frozen"). You can't just "run it in the background" with normal JS. Web workers give you a real separate thread.

## The Core Idea: A Separate Thread With Message Passing

A web worker runs a script on its **own thread**, in parallel with the main thread:
- You create a worker from a script file; it runs independently.
- The main thread and worker **cannot share memory directly** (mostly) — they communicate by **message passing**: `postMessage(data)` to send, and an `onmessage` handler to receive. Data is **copied** (structured clone) between them, not shared.
- Heavy work runs in the worker; when done, it posts the **result** back, and the main thread stays **responsive** the whole time.

This is the actor-style model: isolated threads, no shared mutable state, communicating by messages — which sidesteps most data-race problems (see concurrency-and-parallelism).

## The Key Constraint: No DOM Access

A worker **cannot touch the DOM** — no `document`, no manipulating the page directly. It has no access to the UI. This is by design (DOM access isn't thread-safe). So the pattern is:
- **Main thread** — owns the DOM/UI; sends work to the worker; receives results and updates the DOM.
- **Worker** — does pure computation (no UI), posts results back.
Workers **do** have access to many APIs (fetch, IndexedDB, WebSockets, timers), just not the DOM.

## Types

- **Dedicated workers** — tied to one page/script (the common case).
- **Shared workers** — shared across multiple tabs/scripts of the same origin.
- **Service workers** — a special worker for network proxying/offline/caching (different purpose — see how-service-workers-work).

## When to Use (and Not)

- **Use** for CPU-heavy work: parsing/processing large data, image/video manipulation, cryptography, complex calculations, anything that would block the UI.
- **Don't** use for trivial tasks — there's **overhead** (spinning up a thread, copying data back and forth). For small work the messaging cost outweighs the benefit.
- **Don't** expect them to solve I/O waiting — `async`/`await` already keeps the main thread free during network waits; workers are for **CPU-bound** work, not I/O.

## Design Guidance

- **Offload CPU-bound work** to keep the main thread free for rendering/interaction.
- **Minimize message size/frequency** — data is copied; passing huge objects back and forth is costly (use **transferable objects** / `SharedArrayBuffer` for large binary data to avoid copies).
- **Keep the DOM on the main thread** — workers compute, the main thread renders.
- **Handle worker lifecycle** — terminate workers you no longer need.

## Pitfalls (in understanding/using)

- Trying to touch the **DOM** from a worker → not possible; do UI updates on the main thread.
- Using a worker for **I/O waiting** (network) → pointless; `async` already frees the main thread. Workers are for CPU work.
- Passing **huge objects** via `postMessage` repeatedly → copy overhead; use transferables/shared buffers.
- Spinning up workers for **trivial** tasks → the setup/messaging overhead exceeds the gain.
- Expecting **shared mutable state** — workers are isolated; communicate by messages (or explicit shared buffers).
- Confusing **web workers** (background compute) with **service workers** (network proxy/offline) — different tools.
