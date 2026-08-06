---
name: go-concurrency
description: Go's concurrency model — goroutines (cheap concurrent functions), channels for communication ("share memory by communicating"), select, sync primitives, context for cancellation, and avoiding leaks/races. Plus idiomatic Go error handling. Use when writing concurrent Go or debugging goroutine leaks, deadlocks, or races.
category: engineering
keywords_vi: go concurrency, goroutine channel, share memory by communicating, select context cancellation, goroutine leak, sync mutex waitgroup, xử lý lỗi go, golang đồng thời
---

# Go Concurrency

Go makes concurrency a first-class, simple primitive. Its philosophy: **"Don't communicate by sharing memory; share memory by communicating"** — prefer passing data through channels over locking shared state.

## Goroutines

A **goroutine** is a lightweight concurrent function — `go doWork()` starts one. They're cheap (thousands are fine; the runtime multiplexes them onto OS threads), so you use them liberally for concurrent I/O. But a goroutine that blocks forever (waiting on a channel no one sends to) **leaks** — it never exits, holding memory. Always ensure goroutines have a way to finish.

## Channels

**Channels** pass typed values between goroutines, synchronizing them:
```go
ch := make(chan int)      // unbuffered: send blocks until received
go func() { ch <- 42 }()  // send
v := <-ch                  // receive
```
- **Unbuffered** channels synchronize (send waits for receive) — a handoff.
- **Buffered** channels (`make(chan int, 10)`) decouple up to the buffer size.
- **Close** a channel to signal "no more values"; receivers can range over it (`for v := range ch`).
- **`select`** waits on multiple channel operations (whichever is ready), enabling timeouts and multiplexing.

## Cancellation with context

Use **`context.Context`** to signal cancellation/deadlines across goroutines and API boundaries. A parent cancels the context → all goroutines watching `ctx.Done()` stop. This is how you avoid leaking goroutines on request cancellation/timeout — pass `ctx` down and respect it. Essential for servers.

## sync Primitives (when channels don't fit)

For simple shared-state protection, channels can be overkill — use `sync.Mutex` (lock/unlock a critical section), `sync.WaitGroup` (wait for N goroutines to finish), `sync.Once` (run-once init), atomics. Channels for *communication/ownership transfer*; mutexes for *guarding a small shared value*. Use whichever is clearer for the case — Go supports both.

## Races & the Race Detector

Unsynchronized concurrent access to shared memory (at least one write) is a **data race** — undefined behavior, intermittent bugs (see concurrency-and-parallelism). Run tests/binaries with **`-race`** — Go's race detector finds these reliably; use it. Prefer channel ownership or a mutex to eliminate races.

## Idiomatic Error Handling

Go returns errors as values (`val, err := f()`) — check `if err != nil` explicitly (no exceptions). Wrap with context (`fmt.Errorf("...: %w", err)`), handle at the right level (see error-handling-patterns). Verbose but explicit.

## Pitfalls

- **Goroutine leaks** — a goroutine blocked forever on a channel; ensure exit paths (context, closing channels).
- **Deadlock** — all goroutines blocked (e.g. unbuffered send with no receiver) → runtime panic.
- **Data races** — unguarded shared state; run `-race`.
- **Ignoring `context` cancellation** → work continues after the request is gone.
- **Closing a channel from the receiver** or double-closing → panic (sender closes).
- Overusing channels where a mutex is simpler (or vice versa).
