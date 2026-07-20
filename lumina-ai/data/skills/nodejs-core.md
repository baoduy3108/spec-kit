---
name: nodejs-core
description: Contributing to and debugging Node.js core — nodejs/node commit and PR conventions, native crashes, V8 performance, node-gyp builds, N-API bindings, and libuv issues. Use when drafting/reviewing a Node.js core commit or PR, or diagnosing C++ addons, binding.gyp failures, segfaults, native leaks, V8 deoptimizations, and event-loop internals.
category: engineering
keywords_vi: node.js core, node core internals, c++ addon node, v8 deopt, libuv event loop, native crash segfault, segfault, node-gyp build, đóng góp nodejs node
---

# Node.js Core Development

Deep Node.js engine expertise: C++ addon development, V8 debugging, libuv event-loop concerns, build-system problems, and commit/PR review for the `nodejs/node` repository.

## Critical Build Requirement

After modifying files in `src/` or `lib/`, **rebuild before testing**. The build embeds JavaScript files into the binary at compile time — testing without rebuilding runs stale code and produces meaningless results.

Sequence: `edit → make -j$(nproc) → make lint → test`

## Core Expertise Areas

- **Architecture** — module implementations, V8 garbage collection and JIT, libuv event-loop mechanics, thread-pool behaviour, startup sequence.
- **Native development** — N-API, node-addon-api, handle management, memory safety, native debugging.
- **Build systems** — node-gyp, gyp, ninja, make, cross-platform compilation, linker diagnostics.
- **Performance & debugging** — event-loop profiling, memory-leak detection, CPU flame graphs, optimization/deoptimization tracing.

## Quick Diagnostics

**V8 optimization analysis**
```bash
node --trace-opt --trace-deopt script.js
node --prof script.js && node --prof-process isolate-*.log > processed.txt
```

**Event-loop visibility**
```bash
node --trace-event-categories v8,node,node.async_hooks script.js
```

**Native addon debugging**
```bash
gdb --args node --napi-modules ./build/Release/addon.node
```

**Memory-leak detection**
```bash
node --inspect script.js          # chrome://inspect for heap snapshots
valgrind --leak-check=full node addon_test.js
```

## Commit / PR Conventions

Follow nodejs/node subsystem-prefixed commit style (`subsystem: imperative summary`), keep the summary ≤ 50 chars where possible, reference issues/PRs in metadata footers, and match the measured, technical tone of the project's review culture.
