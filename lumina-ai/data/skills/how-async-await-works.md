---
name: how-async-await-works
description: How async/await and the event loop work under the hood — the single-threaded event loop, the call stack, the task/microtask queues, how promises/futures and coroutines suspend and resume, and why await doesn't block the thread. Use to understand async code, why blocking calls freeze it, and event-loop behavior in JS/Python.
category: engineering
keywords_vi: async await hoạt động thế nào, event loop, promise future coroutine, microtask queue, bất đồng bộ không chặn luồng, tại sao await không block, hiểu async
---

# How async/await Works

async/await lets a single thread handle thousands of concurrent operations without blocking — by *suspending* a function while it waits, and doing other work meanwhile, instead of sitting idle.

## The Event Loop

At the core is a single-threaded **event loop**: a loop that repeatedly takes the next ready task, runs it until it yields, then takes the next. When code does I/O (network, file, timer), it doesn't wait — it registers a **callback** and returns control to the loop, which runs other tasks. When the I/O completes, the callback is queued to resume. One thread, many in-flight operations — because most time is spent *waiting*, not computing.

## Call Stack + Queues

- **Call stack** — synchronous code runs here, top to bottom; the loop can't move on until the stack is empty.
- **Task (macrotask) queue** — timers, I/O callbacks, events wait here.
- **Microtask queue** — resolved promises/`await` continuations; drained **fully after each task, before the next macrotask** (higher priority). This is why a chain of resolved promises runs before a `setTimeout(…, 0)`.
The loop: run a task to completion → drain all microtasks → render (browser) → next task.

## await = suspend, don't block

`await` on a promise/future **suspends** the async function and returns control to the event loop — the thread is free to run other tasks. When the awaited operation resolves, the function's continuation is queued (as a microtask) and resumes right where it left off, with the result. `async/await` is syntactic sugar over promises/coroutines: a state machine that pauses and resumes. Crucially, **await does not block the thread** — it releases it. This is why one server thread can serve thousands of slow requests concurrently.

## The Cardinal Rule: Don't Block the Loop

Because it's **one thread**, any **synchronous** long-running work (a heavy CPU loop, a blocking/synchronous I/O call, `time.sleep` instead of `await asyncio.sleep`) **freezes everything** — no other task, callback, or render runs until it finishes. Async is for **I/O-bound** concurrency, not CPU parallelism. For CPU work, offload to worker threads/processes (JS Web Workers, Python multiprocessing) so the loop stays responsive. `async ≠ parallel` — it's concurrency on one thread.

## Pitfalls

- **Blocking the event loop** with sync CPU work or blocking calls → the whole app hangs (the #1 async bug).
- **Forgetting `await`** → you get a pending promise/coroutine object, not the value; the work may not run or errors get swallowed.
- **Mixing blocking and async** — one sync DB driver call stalls all concurrent requests.
- Expecting parallelism from async on CPU-bound work (it won't speed it up — one thread).
- Unhandled promise rejections vanishing silently.
