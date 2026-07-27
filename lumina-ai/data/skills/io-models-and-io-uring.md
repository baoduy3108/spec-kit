---
name: io-models-and-io-uring
description: The evolution of how programs wait for I/O without blocking — blocking, non-blocking, readiness-based (select/poll/epoll), and completion-based (io_uring, IOCP). Use to understand the C10k problem, why one thread per connection doesn't scale, readiness vs completion models, why epoll beat select/poll, and how io_uring cuts syscall overhead with shared ring buffers.
category: systems-internals
keywords_vi: mô hình vào ra io blocking và non-blocking, sẵn sàng readiness select poll epoll so với hoàn tất completion io_uring iocp, vấn đề c10k một luồng mỗi kết nối không mở rộng, epoll vượt select poll nhờ theo dõi nhiều fd hiệu quả, io_uring giảm chi phí syscall bằng vòng đệm chia sẻ, chờ io mà không chặn luồng
---

# I/O Models & io_uring

A server handling thousands of connections can't afford a thread blocked on each one — blocked threads waste memory and context-switch overhead. The history of high-performance servers is the history of **how to wait for I/O efficiently**, from one-thread-per-connection up to **io_uring**. Understanding the models explains why Node/Nginx/Redis are single-threaded-and-fast, and why modern Linux I/O looks like ring buffers (see io_uring's neighbors context-switching-cost, zero-copy-io, event-loop-and-async-io).

## The Models (in order of scalability)

**1. Blocking I/O** — call `read()`, the thread **sleeps** until data arrives. Simple, but one thread per connection. The famous **C10k problem**: 10,000 connections = 10,000 threads = too much memory and scheduling overhead. Doesn't scale.

**2. Non-blocking + busy-poll** — set sockets non-blocking; `read()` returns `EAGAIN` if no data. But looping over all sockets asking "ready yet?" **burns CPU**. Need a way to be *told* when they're ready.

**3. Readiness-based (select → poll → epoll)** — ask the kernel "which of these fds are ready?" and block until at least one is, then service those. One thread handles thousands of connections.
- **select/poll** — you pass the **entire** fd set every call, and the kernel scans **all** of them → **O(N)** per call. Painful at scale.
- **epoll** (Linux) / **kqueue** (BSD) — you **register** fds once; the kernel maintains the interest set and returns only the **ready** ones → **O(ready)**, not O(N). This is what powers Nginx, Redis, Node's libuv. Readiness model: kernel says "ready", *you* then do the `read`/`write`.

**4. Completion-based (io_uring, Windows IOCP)** — instead of "tell me when it's ready so I can do the I/O", you say "**do this I/O and tell me when it's done**". You submit operations and later collect completions. The kernel performs the actual read/write.

## Why io_uring Is a Leap

`io_uring` (Linux 5.1+) uses **two shared ring buffers** between user space and kernel — a **submission queue** (you post I/O requests) and a **completion queue** (kernel posts results). Wins:
- **Batching** — submit many operations with **one** (or zero) syscall, drastically cutting per-op syscall overhead (which matters more since Spectre/Meltdown mitigations made syscalls costlier).
- **Async everything** — not just sockets: files, `fsync`, `accept`, even in "polled" modes with **no syscalls** in the hot path.
- **True completion model** — no separate "readiness then read" step; the kernel does the I/O.

It generalizes the epoll idea into a batched, completion-based, low-syscall interface — the current state of the art for high-throughput I/O on Linux.

## Design Guidance (for understanding/using)

- **Don't use thread-per-connection** for high fan-out servers — use an event loop (epoll/kqueue) or io_uring.
- **Prefer epoll/kqueue over select/poll** — O(ready) beats O(N); select also caps fds.
- **Reach for io_uring** when syscall overhead or file+socket async I/O throughput is the bottleneck (databases, proxies).
- **Match the model to the runtime** — most languages give you an async runtime (libuv, Tokio, asyncio) that already wraps epoll/io_uring; use it rather than raw syscalls.
- **Mind complexity** — io_uring is powerful but lower-level and has had a churny security history; use a vetted wrapper.

## Pitfalls (in understanding/using)

- One thread per connection at scale → memory/scheduling blowup (C10k).
- Using **select/poll** for thousands of fds → O(N) scans dominate; use epoll/kqueue.
- Busy-polling non-blocking sockets → 100% CPU for nothing.
- Confusing **readiness** (epoll: kernel says ready, you do I/O) with **completion** (io_uring: kernel does I/O) — different programming models.
- Hand-rolling io_uring without understanding its ring/lifetime rules → subtle bugs; prefer a library.
