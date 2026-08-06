---
name: how-quic-and-http3-work
description: How QUIC and HTTP/3 work — moving transport onto UDP to fix TCP's limits, eliminating head-of-line blocking with independent streams, faster (0-RTT/1-RTT) connection setup with built-in TLS 1.3, and connection migration. Use to understand QUIC, HTTP/3, why HTTP/3 uses UDP, head-of-line blocking, or modern web transport.
category: engineering
keywords_vi: quic, http3, transport trên udp, head of line blocking, 0-rtt, stream độc lập, tls 1.3 tích hợp, connection migration
---

# How QUIC & HTTP/3 Work

QUIC is a modern transport protocol that HTTP/3 runs on. It was created to fix long-standing limits of TCP (see how-tcp-works) that slow down the web — especially on mobile and lossy networks. It rebuilds reliable, secure, multiplexed transport **on top of UDP**.

## Why Not Just TCP? Head-of-Line Blocking

HTTP/2 multiplexes many requests over **one TCP connection**. But TCP delivers a single ordered byte stream — if one packet is lost, **everything behind it waits** for the retransmission, even data for unrelated requests. This is **head-of-line (HOL) blocking**: one lost packet stalls all the multiplexed streams. TCP can't fix this because it doesn't know about the separate streams above it.

## QUIC's Solution: Independent Streams over UDP

QUIC runs over **UDP** (which is connectionless and lets QUIC implement its own logic in user space, evolving without OS/kernel changes) and provides **multiple independent streams** within one connection. Each stream is reliably, ordered-delivered **on its own** — a lost packet only stalls **its** stream, not the others. So one dropped packet no longer blocks unrelated requests. QUIC re-implements TCP's reliability (acks, retransmission, congestion control) but per-stream.

## Faster Connection Setup

TCP + TLS traditionally needs multiple round trips (TCP handshake, then TLS handshake) before any data flows. QUIC **integrates TLS 1.3** into its handshake, so establishing a secure connection takes **one round trip (1-RTT)**, and for resumed connections, **0-RTT** — sending application data in the very first packet. Encryption isn't optional — QUIC is **always encrypted** (even most headers), improving both speed and privacy. This latency reduction is a big real-world win.

## Connection Migration

A TCP connection is tied to the 4-tuple (source/dest IP+port) — change your IP (Wi-Fi → cellular) and the connection **breaks**. QUIC identifies connections by a **connection ID**, not the IP/port, so it can **migrate** across network changes without dropping — your download/call survives switching networks. Great for mobile.

## HTTP/3

**HTTP/3** is simply HTTP semantics (same methods, headers, status codes) mapped onto QUIC instead of TCP. Browsers discover HTTP/3 support (via Alt-Svc) and upgrade. You get HTTP/2's multiplexing **without** its TCP HOL-blocking, plus faster setup and migration.

## Pitfalls (in understanding/using)

- Thinking UDP means "unreliable" here — QUIC **adds** reliability per-stream on top of UDP; it's not fire-and-forget.
- Assuming HTTP/3 is a new HTTP syntax — it's the **same HTTP semantics** over a new transport (QUIC).
- Network gear/firewalls sometimes **block or throttle UDP** → QUIC fails and falls back to TCP/HTTP2 (allow UDP 443).
- Expecting huge gains on fast, low-loss wired links — QUIC's benefits shine most on **lossy/mobile** networks and connection setup latency.
- Debugging is harder (encrypted headers, UDP) — needs QUIC-aware tooling.
- 0-RTT data has replay-attack caveats — don't use it for non-idempotent requests (see idempotency).
