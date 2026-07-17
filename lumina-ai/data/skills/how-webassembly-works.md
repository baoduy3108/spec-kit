---
name: how-webassembly-works
description: How WebAssembly (Wasm) works — a compact binary instruction format run by a fast stack-based VM in the browser (and beyond), near-native speed in a sandbox, compiling C/C++/Rust/Go to Wasm, and how it complements (not replaces) JavaScript. Use to understand Wasm, when to use it, and running non-JS languages on the web.
category: engineering
keywords_vi: webassembly wasm hoạt động thế nào, chạy code tốc độ cao trên web, compile c++ rust sang wasm, vm stack sandbox, wasm vs javascript, hiểu webassembly
---

# How WebAssembly Works

WebAssembly (Wasm) is a **compact binary instruction format** that runs in a fast, sandboxed virtual machine — bringing near-native performance and non-JavaScript languages to the browser (and increasingly the server/edge).

## What It Is

Instead of shipping JavaScript source to be parsed and JIT-compiled, you compile a language (C, C++, Rust, Go, and others) to a **`.wasm` binary** of low-level instructions. The browser's Wasm engine — a **stack-based virtual machine** — validates and compiles it to machine code very quickly (it's designed to decode and compile far faster than parsing JS). The result runs at **near-native speed** because the instructions are already low-level and typed, close to what the CPU wants.

## The Sandbox

Wasm runs in the same secure **sandbox** as JavaScript: it has **no direct access** to the DOM, filesystem, or network. It operates on its own linear memory (a big typed array) and can only interact with the outside world through functions **explicitly imported** from the host (JS). This capability-based isolation is why it's safe to run untrusted compiled code in the browser — and, with **WASI**, on servers.

## Wasm + JavaScript (complement, not replace)

Wasm doesn't replace JS — they work together. JS handles the DOM, events, and glue; you call into Wasm for the **compute-heavy** parts. Data crosses the JS↔Wasm boundary via the shared linear memory (there's a cost to the boundary, so you batch, not call it per pixel).

## When to Use It

- **CPU-intensive work** in the browser: image/video/audio processing, codecs, games and 3D engines, physics, cryptography, compression, data science, PDF rendering, CAD.
- **Porting existing C/C++/Rust libraries** to the web without rewriting them in JS.
- **Consistent performance** where JS's JIT is unpredictable.
- Beyond the browser: fast, secure, portable sandboxes on **edge/serverless** platforms and as a plugin format.
Don't use it for DOM-heavy UI or simple logic — JS is simpler there and the boundary cost isn't worth it.

## Why It Matters

Wasm makes the web a real compilation target for any language, unlocks near-native performance for heavy workloads, and provides a portable, secure sandbox that's spreading beyond browsers. It's the answer to "how do I run this fast C++/Rust code in a browser safely?"

## Pitfalls / Notes

- **Boundary overhead** — frequent tiny JS↔Wasm calls or big data copies can erase the speed gain; keep the hot loop inside Wasm.
- **No direct DOM/OS access** — you still need JS glue (or WASI on servers).
- **Bundle size / startup** — the binary + glue adds weight; worth it only for genuinely heavy compute.
- Not a fit for typical UI code — reach for it for the compute core, not the whole app.
