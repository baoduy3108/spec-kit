---
name: how-tcp-works
description: How TCP provides reliable ordered delivery over an unreliable network — the three-way handshake, sequence/ack numbers and retransmission, flow control (sliding window) and congestion control, and TCP vs UDP. Use to understand reliable networking, why connections have setup cost, and when to choose UDP.
category: engineering
keywords_vi: tcp hoạt động thế nào, giao thức tcp, three-way handshake, sequence ack retransmit, flow control congestion, tcp vs udp, mạng đáng tin cậy, hiểu tcp
---

# How TCP Works

IP delivers packets best-effort — they can be lost, duplicated, delayed, or reordered. **TCP** builds a reliable, ordered byte-stream on top of that mess.

## Connection Setup: Three-Way Handshake

Before data flows, both sides synchronize with **SYN → SYN-ACK → ACK**, agreeing on initial sequence numbers. This is why a TCP connection has a round-trip of setup cost (and why keep-alive/connection reuse matters, and why TLS adds *more* round-trips on top). Teardown uses a FIN handshake.

## Reliability: Sequences, Acks, Retransmission

Every byte has a **sequence number**; the receiver sends **acknowledgements** for what it got. If the sender doesn't get an ack within a timeout (or sees duplicate acks), it **retransmits**. The receiver uses sequence numbers to **reorder** out-of-order packets and **discard duplicates**, delivering a clean, in-order stream to the app. This is the machinery that turns lossy IP into "the bytes arrive, in order, exactly once."

## Flow Control (don't overwhelm the receiver)

The receiver advertises a **window** — how much it can currently buffer. The sender never has more unacknowledged data in flight than the window. A slow receiver shrinks the window; the sender slows down. This is per-connection back-pressure.

## Congestion Control (don't overwhelm the network)

Separately, TCP probes how much the *network* can handle: **slow start** ramps up, and on packet loss (a congestion signal) it **backs off** (multiplicative decrease), then grows again. This is why throughput ramps up over a connection's life and why loss tanks it — and why many small connections underperform one reused connection that has "warmed up" its congestion window.

## TCP vs UDP

- **TCP** — reliable, ordered, connection-oriented, flow/congestion controlled. Use when you need every byte correct and in order (web, APIs, file transfer, databases).
- **UDP** — fire-and-forget datagrams: no handshake, no retransmit, no ordering, no congestion control. Lower latency and overhead. Use for real-time where a late packet is worthless (live video/voice, gaming, DNS) — the app handles any loss it cares about. (QUIC/HTTP-3 builds reliability *on UDP* to avoid TCP's head-of-line blocking.)

## Why It Matters

TCP's guarantees explain connection setup latency (handshakes), why TLS-on-TCP is round-trip heavy, why loss devastates throughput (congestion control), and head-of-line blocking (one lost packet stalls everything behind it — the problem QUIC solves). Choosing UDP means accepting unreliability for latency.
