---
name: how-server-sent-events-work
description: How Server-Sent Events (SSE) work — a simple one-way server→client streaming channel over a long-lived HTTP response, the text/event-stream format, automatic reconnection with Last-Event-ID, and when to use SSE vs WebSockets vs polling. Use to understand SSE, streaming updates to the browser, EventSource, or SSE vs WebSockets.
category: engineering
keywords_vi: server-sent events sse, streaming một chiều server tới client, text/event-stream, eventsource, tự động kết nối lại last-event-id, sse vs websocket, cập nhật realtime
---

# How Server-Sent Events Work

Server-Sent Events (SSE) is a simple, standardized way for a server to **push a stream of updates to the browser** over a single long-lived HTTP connection. It's the lightweight choice for **one-way** real-time data (notifications, live feeds, progress, LLM token streaming) when you don't need the client to also stream back.

## The Core Idea: a Never-Ending HTTP Response

Normally an HTTP response completes and closes. With SSE, the server responds with `Content-Type: text/event-stream` and **keeps the connection open**, writing events as they occur. The browser reads them incrementally as a stream. It's just HTTP — no protocol upgrade — so it works through proxies, CDNs, and firewalls that already handle HTTP, and benefits from HTTP/2 multiplexing.

## The Client: EventSource

The browser API is trivially simple:
```js
const es = new EventSource('/updates');
es.onmessage = (e) => console.log(e.data);
```
The browser handles the connection, parsing, and **reconnection** for you.

## The Wire Format

Events are plain text, one field per line, separated by blank lines:
```
data: hello

event: price
data: {"symbol":"ABC","price":42}
id: 1234
retry: 3000
```
- **`data:`** — the payload (can span multiple lines).
- **`event:`** — a named event type (client listens with `addEventListener`).
- **`id:`** — an event ID (used for resuming).
- **`retry:`** — reconnection delay hint.
Simple and human-readable.

## Automatic Reconnection (a built-in strength)

If the connection drops, the browser **automatically reconnects** — and sends the last received event ID in a **`Last-Event-ID`** header, so the server can **resume** from where it left off (replaying missed events). You get resilient streaming without writing reconnection logic. This robustness is a key SSE advantage.

## SSE vs WebSockets vs Polling

- **SSE** — **one-way** (server→client), text only, over plain HTTP, auto-reconnect, dead-simple. Perfect for feeds, notifications, dashboards, streaming AI responses.
- **WebSockets** (see websockets-and-realtime) — **bidirectional**, binary-capable, lower overhead per message, but a separate protocol needing its own handling. Use when the **client must also stream** to the server (chat, games, collaborative editing).
- **Polling / long-polling** — simplest, but higher latency/overhead; fine for infrequent updates.
Pick SSE for one-way streaming; WebSockets for true two-way real-time.

## Pitfalls (in understanding/using)

- Using SSE where you need the **client to send** a continuous stream too — that's WebSockets' job (SSE is server→client only).
- **Connection limits** — browsers cap concurrent connections per domain over HTTP/1.1 (~6); many SSE streams exhaust them. HTTP/2 multiplexing largely fixes this — serve SSE over HTTP/2.
- Buffering proxies/servers that **hold** the response instead of flushing → events don't arrive live; disable buffering (e.g. `X-Accel-Buffering: no`) and flush.
- Forgetting to send **event IDs** → can't resume reliably after reconnect.
- SSE carries **text** only — base64/encode binary if needed.
- Not sending periodic keep-alive comments → idle intermediaries may drop the connection.
