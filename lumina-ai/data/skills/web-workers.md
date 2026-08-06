---
name: web-workers
description: How Web Workers move heavy work off the main thread — running JavaScript in a background thread to keep the UI responsive, message-passing communication, no DOM access, and the types (dedicated/shared/service workers). Use to understand Web Workers, offloading CPU-heavy work, keeping the UI from freezing, or background threads in the browser.
category: engineering
keywords_vi: web worker, luồng nền, offload việc nặng, postmessage, giữ ui mượt không đơ, background thread, message passing, không truy cập dom, dedicated shared worker
---

# Web Workers

Web Workers let JavaScript run in a **background thread**, so heavy computation doesn't freeze the UI. The browser's main thread handles rendering **and** your JS — so a long-running JS task **blocks everything**, including scrolling, clicks, and animation. Workers move that work off the main thread.

## The Problem: a Single Main Thread

JavaScript in the browser runs on **one main thread** that also does layout, painting, and event handling (see how-browsers-work, how-async-await-works). If you run an expensive synchronous task (parsing a huge file, image processing, a big computation), the main thread is **busy** and the page **freezes** — no scrolling, no clicks, janky animation — until it finishes. `async/await` doesn't help here: it's for *waiting* on I/O, not for *offloading CPU work* (an async function still runs its CPU-heavy body on the main thread).

## The Solution: Background Threads

A **Web Worker** runs a separate JavaScript file on its **own thread**, in parallel with the main thread (real parallelism — see concurrency-and-parallelism). You offload the heavy work to it, and the main thread stays free to keep the UI smooth. The worker does its computation and sends the result back.

## Communication: Message Passing

Workers **don't share memory** with the main thread (by default) — they communicate by **passing messages** (`postMessage` / `onmessage`). You send data in, the worker processes it, and posts the result back. Data is **copied** (structured clone) when passed — or **transferred** (ownership moved, zero-copy) for large buffers via Transferable objects (ArrayBuffers) to avoid the copy cost. This message-passing isolation avoids the data races of shared-memory threading (see go-concurrency's "share by communicating" idea). (SharedArrayBuffer enables true shared memory for advanced cases, with care.)

## Key Constraint: No DOM Access

A worker **cannot touch the DOM** or many `window` APIs — it has no access to the page's UI. It can do computation, `fetch`, use many Web APIs, and message results back to the main thread, which then updates the DOM. So the pattern is: **main thread orchestrates UI; worker does the heavy lifting; results flow back via messages.**

## Types of Workers

- **Dedicated Worker** — a background thread for one page/script. The common case for offloading CPU work.
- **Shared Worker** — shared across multiple tabs/windows of the same origin.
- **Service Worker** — a special worker acting as a network proxy for offline/caching/push (a different purpose — see how-service-workers-work).

## When to Use

Offload to a worker when you have **CPU-heavy, main-thread-blocking** work: parsing/processing large data (CSV/JSON, images, video frames), cryptography, compression, complex calculations, data transforms, or anything causing jank. For simple/quick work, the message-passing overhead isn't worth it — workers shine for genuinely heavy tasks.

## Pitfalls (in understanding/using)

- Expecting **`async/await`** to fix a frozen UI from CPU work — it doesn't offload CPU; use a **worker**.
- Trying to **access the DOM** from a worker (impossible) — do UI updates on the main thread with the worker's results.
- Offloading **trivial** work → the postMessage/copy overhead outweighs the benefit.
- **Copying huge data** back and forth (structured clone cost) → use Transferable objects (ArrayBuffer) or SharedArrayBuffer.
- Forgetting to **terminate** workers you no longer need (resource leak).
- Complex state sync between threads (message-passing only) — design clear message protocols; don't fight the isolation.
- Assuming workers give you unlimited parallelism — they're OS threads; too many contend (see how-cpu-scheduling-works).
