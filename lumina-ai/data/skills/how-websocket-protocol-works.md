---
name: how-websocket-protocol-works
description: How the WebSocket protocol works at the wire level — the HTTP Upgrade handshake, switching to a persistent full-duplex TCP connection, message framing, ping/pong keepalives, and how it differs from HTTP request/response. Use to understand the WebSocket handshake, framing, how WebSockets keep a connection open, or WebSocket vs HTTP at the protocol level.
category: engineering
keywords_vi: websocket protocol hoạt động thế nào, upgrade handshake http, kết nối tcp bền song công, full-duplex, framing khung tin nhắn, ping pong keepalive, websocket vs http
---

# How the WebSocket Protocol Works

WebSocket provides a **persistent, two-way (full-duplex)** connection between client and server over a single TCP connection — so both sides can send messages anytime, with low overhead. It's the protocol behind chat, live collaboration, multiplayer games, and trading dashboards. (For usage patterns see websockets-and-realtime; this covers the wire protocol.)

## Why Not Just HTTP?

Plain HTTP is **request/response**: the client asks, the server answers, done. The server can't spontaneously push, and each exchange re-incurs connection/header overhead. Workarounds (polling, long-polling) are inefficient or high-latency. WebSocket keeps **one connection open** over which either side sends messages freely — real-time, low-overhead, bidirectional.

## The Upgrade Handshake (starts as HTTP)

A WebSocket connection **begins as an ordinary HTTP request** with special headers asking to switch protocols:
```
GET /chat HTTP/1.1
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: <random base64>
```
If the server supports it, it replies:
```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Sec-WebSocket-Accept: <hash of the key>
```
After this **101 Switching Protocols**, the same TCP connection stops speaking HTTP and becomes a **bidirectional WebSocket** channel. Starting as HTTP means WebSockets work over ports 80/443 and pass through most proxies/firewalls, and can use TLS (`wss://`). The `Sec-WebSocket-Accept` (a hash of the client's key) proves the server understood the handshake.

## Message Framing

Once open, data flows in **frames** — a lightweight binary framing with a few bytes of header (vs HTTP's large text headers per request). Frames carry:
- **Text** or **binary** payloads (WebSocket natively supports both, unlike SSE's text-only).
- **Control frames** — **ping/pong** (keepalive/liveness checks) and **close** (graceful shutdown).
Messages can be split across frames (fragmentation). Client→server frames are **masked** (XOR with a random key) — a security measure to prevent certain proxy cache-poisoning attacks.

## Keepalive & Lifecycle

The connection stays open until either side closes it (or the network drops). **Ping/pong** frames detect dead connections and keep intermediaries from timing out idle connections. Because connections are long-lived and stateful, servers must manage many open sockets (memory/FD limits) and handle reconnection on the client.

## WebSocket vs HTTP vs SSE

- **WebSocket** — full-duplex, text+binary, low per-message overhead; best when the **client also streams** (chat, games, collaboration). More complex (stateful connections, scaling).
- **SSE** (see how-server-sent-events-work) — server→client only, over plain HTTP, auto-reconnect; simpler for one-way streams.
- **HTTP** — request/response; use for normal APIs.

## Pitfalls (in understanding/using)

- Using WebSockets where **one-way** streaming suffices — SSE is simpler (auto-reconnect, plain HTTP).
- Forgetting WebSockets are **stateful/long-lived** — scaling needs sticky sessions or a shared pub/sub backplane across servers; many connections strain resources.
- No **reconnection/backoff** logic on the client — connections drop; you must reconnect and resync state.
- Missing **ping/pong keepalives** → idle connections killed by proxies/load balancers.
- Assuming proxies/load balancers pass WebSockets — some need explicit Upgrade support/config.
- Not authenticating/authorizing the handshake (and per-message) — the open channel needs security like any endpoint.
