---
name: error-handling-patterns
description: Handle errors robustly — exceptions vs result/error-return types, fail fast vs graceful degradation, distinguishing operational from programmer errors, propagating with context, avoiding swallowed errors, and boundary handling. Use when designing how a system reports and recovers from failures.
category: engineering
keywords_vi: xử lý lỗi, error handling, exception vs result, fail fast, nuốt lỗi silent, propagate lỗi, phân loại lỗi, thiết kế xử lý lỗi
---

# Error Handling Patterns

Good error handling makes failures visible, actionable, and recoverable — bad handling hides bugs until they explode in production.

## Exceptions vs Result Types

- **Exceptions** — separate the happy path from error handling; propagate automatically until caught. Clean for truly exceptional cases, but easy to forget to handle and can hide control flow.
- **Result/Either types** (`Result<T, E>`, Go's `(val, err)`) — errors are values in the return type; the compiler/reader sees every fallible call must be handled. Explicit but verbose.
Use exceptions for genuinely exceptional conditions; use result types (or checked returns) for expected failures that callers must decide about. Be consistent within a codebase.

## Classify: Operational vs Programmer Errors

- **Operational errors** — expected runtime failures the program should handle: network timeout, file not found, invalid user input, rate limited. Handle these — retry, fall back, return a clear message.
- **Programmer errors (bugs)** — null deref, wrong type, failed invariant. Don't "handle" these by swallowing; let them crash loudly (or fail the request) so they get fixed. Catching everything hides bugs.

## Core Principles

- **Fail fast** — validate inputs and preconditions early; don't let bad state propagate deep before erroring where the cause is unclear.
- **Never swallow errors** — an empty `catch {}` or bare `except: pass` is how bugs vanish. If you catch, handle it, log it with context, or rethrow — never silently drop.
- **Add context as you propagate** — wrap/annotate errors with what you were doing ("failed to load user 42: <cause>") so the final message is a trail, not just "null." Preserve the original cause.
- **Handle at the right boundary** — catch where you can actually do something (retry, user message, fallback), not everywhere. A top-level boundary (per request/job) turns uncaught errors into a logged failure + clean response instead of a crash.
- **Clean up on failure** — release resources (files, locks, connections) with `finally`/`defer`/context managers so an error doesn't leak them.

## User-Facing vs Internal

Show users clear, non-technical, actionable messages; log the full technical detail + stack internally. Never leak stack traces, secrets, or internal paths to users (a security and UX failure). Map internal errors to appropriate status codes (400 vs 500).

## Pitfalls

- Swallowed/over-broad catches hiding real bugs.
- Losing the original cause when wrapping (chain it).
- Catching and logging the *same* error at every layer (log once, at the boundary).
- Using exceptions for normal control flow (slow and confusing).
- No timeout on external calls → errors become hangs.
