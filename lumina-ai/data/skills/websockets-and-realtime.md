---
name: websockets-and-realtime
description: Build real-time features and choose the right transport — WebSockets vs Server-Sent Events vs long/short polling, connection lifecycle, reconnection with backoff, heartbeats, scaling stateful connections (sticky sessions, pub/sub fan-out), and delivery/ordering concerns. Use when adding live updates, chat, notifications, or streaming and deciding how to transport them.
category: engineering
keywords_vi: websocket, realtime thời gian thực, server-sent events sse, polling, chat realtime, kết nối lâu dài, reconnect, đẩy dữ liệu realtime, live update
---

# WebSockets & Real-Time

Pick the simplest transport that meets the need; real-time adds stateful connections and scaling complexity.

## Choosing the Transport

- **Short polling** — client asks every N seconds. Dead simple, works everywhere, but wasteful and laggy. Fine for low-frequency, non-critical updates.
- **Long polling** — request held open until data or timeout, then re-issued. Better latency than short polling, still HTTP; a reasonable fallback.
- **Server-Sent Events (SSE)** — one-way server→client stream over plain HTTP; auto-reconnect built in, simple, proxy-friendly. Ideal for **server push only** (live feeds, notifications, progress, streaming LLM tokens).
- **WebSockets** — full-duplex, low-latency, both directions over one persistent connection. Use when the client also sends frequently (chat, multiplayer, collaborative editing, live trading). More infra overhead.

Rule of thumb: **need server→client only → SSE**; **need bidirectional/low-latency → WebSockets**; **occasional updates → polling**.

## Connection Lifecycle

- **Reconnect with exponential backoff + jitter** — networks drop; the client must transparently reconnect and resume (SSE's `Last-Event-ID`, or an app-level cursor). Never hammer reconnects in a tight loop.
- **Heartbeats/pings** — detect dead connections that TCP hasn't noticed; close and reconnect stale ones. Intermediaries also drop idle connections — heartbeats keep them alive.
- **Auth** — authenticate on connect (token in the handshake); re-check on token expiry; you can't rely on cookies alone for WS in all setups.

## Scaling Stateful Connections

Persistent connections are **stateful** — the hard part.
- **Many connections per server** — each holds memory; plan capacity (tens of thousands per node is realistic with the right stack).
- **Horizontal scaling** — a message must reach whichever server holds the target connection. Use a **pub/sub backplane** (Redis pub/sub, a message broker) so any server can broadcast to connections on other servers. With sticky sessions, a user stays on one server; without, any server must be able to route.
- **Fan-out** — broadcasting to many subscribers (a busy room) is the load hotspot; batch and rate-limit outbound.

## Delivery Concerns

Don't assume every message arrives or in order across reconnects. For anything important, add sequence numbers/cursors and let clients request missed messages, or persist state so a reconnecting client re-syncs. Real-time push is best-effort transport over a durable source of truth, not the source of truth itself.
