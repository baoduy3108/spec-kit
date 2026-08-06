---
name: nodejs-typescript
description: Building robust Node.js applications with TypeScript — type stripping (Node 22.6+, run TypeScript without a build step), async patterns, error handling, streams, graceful shutdown, flaky-test diagnosis, caching, logging, and env config. Use when writing or debugging a Node.js service in TypeScript.
category: engineering
keywords_vi: node.js typescript, type stripping, chạy typescript không build, graceful shutdown node, xử lý stream node, node async pattern, xử lý lỗi node
---

# Node.js Development with TypeScript

Comprehensive guidance for robust Node.js applications in TypeScript.

## Type Stripping (Node 22.6+)

Run TypeScript directly without build tools by removing type annotations at runtime. Requirements:
- Use `import type` for type-only imports.
- Avoid `enum`; prefer `const` objects (`as const`).
- Include the `.ts` extension in relative imports.

## Key Workflows

**Graceful shutdown** — register signal handlers (SIGTERM/SIGINT) → stop accepting new work → drain in-flight requests → close DB/connection pools → exit. Never `process.exit()` before draining.

**Error handling** — define a base error class → classify errors (operational vs programmer) → add async error handlers → propagate typed errors rather than throwing raw strings.

**Flaky-test diagnosis** — isolate with `--test-only` → check shared state and fake timers → inspect teardown (unclosed handles/timers) → fix the root cause, not the symptom.

**Stuck process** — run with explicit timeouts → inspect open handles (`process._getActiveHandles()` / why-is-node-running) → patch deterministic teardown.

## Streams & Large Data (CSV / ETL / large files)

- Use `await pipeline(...)` from `node:stream/promises` — it wires error propagation and cleanup correctly.
- Implement transforms as `async function*` generators.
- Manage backpressure explicitly; don't buffer whole files in memory.
- Choose caching deliberately: `lru-cache` for bounded caches, `async-cache-dedupe` to collapse concurrent identical requests.

## Principles

- Prefer built-in `node:` modules and the standard test runner (`node:test`) over heavy dependencies.
- Type imports separately from value imports.
- Make teardown deterministic so tests and shutdown are reliable.
- Propagate typed, classified errors; log with structured context.
