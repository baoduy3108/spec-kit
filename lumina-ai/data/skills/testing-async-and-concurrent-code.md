---
name: testing-async-and-concurrent-code
description: How to test asynchronous and concurrent code reliably — awaiting instead of sleeping, controlling time with fake clocks, deterministically triggering race conditions, and why concurrency bugs are hard to test. Use to test async code, avoid flaky timing tests, test concurrent/threaded code, or control time in tests.
category: engineering
keywords_vi: test async, test đồng thời, fake clock test, race detector, kiểm thử code bất đồng bộ, await thay vì sleep, kích hoạt race condition tất định, bug đồng thời khó test
---

# Testing Async and Concurrent Code

Asynchronous and concurrent code is **hard to test reliably** because its behavior depends on **timing** — and timing varies between runs, which is exactly what makes tests flaky (see flaky-test-diagnosis, memory-models-and-happens-before). The keys are: **wait for events, not time**; **control the clock**; and, for concurrency bugs, **force the interleavings** deterministically.

## Why It's Hard

- **Async operations complete "later"** — if a test checks a result before the async work finishes, it fails intermittently.
- **Concurrency bugs are timing-dependent** — a data race manifests only under a specific interleaving of threads, which may occur one run in a thousand. A test that "passes" proves little; the bug hides.
- **Nondeterminism** is the enemy of tests, which need **deterministic** pass/fail.
So naive approaches (`sleep` and hope) produce flaky tests, and real concurrency bugs slip through.

## Testing Async Code

- **Await the operation, don't sleep** — the cardinal rule. Never `sleep(500ms)` hoping the async work is done; **await** the promise/future, or **poll for the actual condition** (with a timeout) that signals completion. Fixed sleeps are flaky (too short → fails under load; too long → slow suite).
- **Use the framework's async support** — `async/await` tests, `await`ing the result, or test utilities that wait for conditions (`waitFor`).
- **Wait for the observable effect** — assert on the state/event that indicates completion, not a guessed delay.

## Controlling Time (fake clocks)

Code that uses **timers, delays, timeouts, or the current time** is painful to test in real time (a 30-second timeout shouldn't make the test take 30 seconds). Use a **fake/mock clock**:
- Replace the real clock/timers with a **controllable** one you can **advance manually** ("advance time by 60s").
- Test a timeout/retry/scheduled job **instantly and deterministically** by fast-forwarding virtual time.
- Also fixes tests that depend on the **current date/time** (freeze it — see flaky-test-diagnosis).
Fake timers make time-dependent logic deterministic and fast.

## Testing Concurrency Bugs

Genuine concurrency bugs (data races, deadlocks) are the hardest:
- **You can't reliably reproduce** a race by running the normal test (the bad interleaving is rare). Passing tests don't prove thread-safety.
- **Force interleavings** — inject synchronization points / hooks that let the test **control the order** of concurrent operations, deterministically triggering the race (e.g. block thread A at the critical moment, let B proceed, then resume A).
- **Stress / loop** — run the concurrent operation many times with many threads to raise the odds of hitting the bug (probabilistic, not guaranteed).
- **Race detectors** — the most effective tool: run tests under a **thread sanitizer** (Go `-race`, TSan) that detects data races even when they don't crash (see memory-models-and-happens-before).

## Design Guidance

- **Await/poll for conditions**, never `sleep()` — the single biggest fix for flaky async tests.
- **Use fake clocks/timers** to test delays, timeouts, retries, scheduling instantly and deterministically.
- **Run concurrency tests under a race detector** (TSan/`-race`) — it finds races reliably where tests can't.
- **Force interleavings** with synchronization hooks to deterministically test race conditions.
- **Prefer testable designs** — inject the clock and dependencies; keep concurrency behind well-defined boundaries.
- **Make everything deterministic** — control time, order, and randomness.

## Pitfalls (in understanding/using)

- **`sleep()`-and-hope** for async completion → flaky (fails under load, or slow); await the condition.
- Believing a **passing** concurrency test proves **thread-safety** → the bad interleaving is rare; use a race detector.
- **Real-time** timeouts making tests slow → use fake timers to advance virtual time.
- Depending on **wall-clock time** → freeze/inject the clock.
- Not using a **race detector** → data races ship undetected (they often don't crash — see memory-models-and-happens-before).
- Un-forced **interleavings** → the race almost never reproduces in the test.
