---
name: head-of-line-blocking
description: Why one stuck item can stall everything queued behind it — head-of-line (HOL) blocking — and how it appears at every layer: a lost TCP segment freezing all HTTP/2 streams on a connection, HTTP/1.1 pipelining, switch buffers, and worker queues. Use to understand why HTTP/2 still stalled on packet loss, why HTTP/3 moved to QUIC/UDP, and how per-stream independence or multiple queues fix it.
category: networking
keywords_vi: chặn đầu hàng head-of-line blocking, một mục kẹt làm nghẽn cả hàng, segment tcp mất làm đơ mọi luồng http2, http3 chuyển sang quic udp, nhiều hàng đợi riêng thay vì một hàng chung, luồng độc lập per-stream
---

# Head-of-Line (HOL) Blocking

**Head-of-line blocking** is a deceptively simple failure: when items must be processed **in order** from a single queue, one slow or stuck item at the **front** blocks *everything* behind it — even work that was ready and independent. It's a recurring villain across networking and systems, and understanding it explains a chain of protocol design decisions up to HTTP/3 (see how-tcp-works, tcp-congestion-control, how-quic-and-http3-work).

## The Core Shape

A single FIFO queue + in-order processing + one blocked front element = the whole queue stalls. The blocked item isn't necessarily broken — it's just **waiting** (for a retransmit, a slow handler, a busy destination), and strict ordering forbids serving anyone behind it. The fix is always some form of **breaking the single-ordered-queue assumption**: multiple independent queues, or removing the ordering requirement.

## Where It Bites

- **HTTP/1.1 pipelining** — responses must return **in request order**; a slow first response blocks all the others on the connection. (Why browsers avoided pipelining and opened many connections instead.)
- **TCP itself** — TCP delivers bytes **in order**. If one segment is lost, later segments that *already arrived* sit in the kernel buffer, undeliverable to the app until the gap is retransmitted. Everything on that connection waits.
- **HTTP/2's big surprise** — HTTP/2 multiplexes many logical streams over **one TCP connection** to fix HTTP/1.1's HOL blocking *at the application layer*. But because it still rides **one TCP connection**, a single lost packet triggers **TCP-level** HOL blocking that freezes **all** the multiplexed streams at once — HOL blocking moved down a layer, not gone.
- **HTTP/3 / QUIC** — runs over **UDP** and implements **independent, per-stream** delivery: a lost packet stalls only *its* stream, not the others. That's the primary reason HTTP/3 exists.
- **Network switches** — input-buffered switches: a packet destined for a busy output port blocks packets behind it headed for **idle** ports (fixed via virtual output queues).
- **Worker/task queues** — one slow job at the head of a single worker's queue delays all its queued jobs (fixed via multiple queues, work stealing, or priority lanes).

## The General Fixes

- **Independent streams/queues** — give unrelated work its own lane (QUIC streams, virtual output queues, per-priority queues).
- **Drop the ordering requirement** where correctness allows — out-of-order delivery/processing.
- **Multiple connections** — the blunt HTTP/1.1-era workaround.
- **Bounded head timeouts** — evict/skip a stuck head so it can't block forever (with care for correctness).

## Design Guidance (for understanding/using)

- **Ask "does this need strict ordering?"** — if not, independent lanes eliminate HOL blocking.
- **Know HTTP/2 ≠ immune** — on lossy networks HTTP/3 (QUIC) can markedly beat HTTP/2 precisely because of TCP HOL blocking.
- **Separate slow work** — put slow/variable tasks on their own queue so they don't stall fast ones (relates to tail-latency and load-shedding).
- **Watch shared single-connection multiplexing** — one stalled stream can imply a shared-transport stall.

## Pitfalls (in understanding/using)

- Believing HTTP/2 multiplexing fully solved HOL blocking → **TCP-level** blocking remains on packet loss.
- Putting fast and slow requests in **one** ordered queue → the slow head starves the fast.
- Assuming reordering is free → out-of-order delivery needs the app/protocol to tolerate gaps.
- Adding more threads but keeping **one shared queue** → the head still blocks; you need multiple queues or work stealing.
- Confusing HOL blocking (ordering stall) with simple overload (not enough capacity) — different fixes.
