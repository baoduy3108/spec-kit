---
name: streaming-ux-for-ai-chat
description: Streaming UX for AI chat apps — token streaming over SSE, rendering partial/incomplete markdown safely, stop and regenerate controls, thinking/tool-status indicators, auto-scroll behavior, and graceful error/disconnect handling. Use when building a chat UI that streams LLM tokens, showing live responses, handling stop/regenerate, or rendering streaming markdown.
category: frontend
keywords_vi: streaming ux chat ai, token streaming, sse token, render markdown chưa hoàn chỉnh, stop regenerate, chỉ báo đang suy nghĩ, tự cuộn theo phản hồi, mất kết nối giữa chừng stream, trải nghiệm chat sinh dần, time to first token
---

# Streaming UX for AI Chat

LLMs generate token-by-token, so a good chat UI **shows the answer as it's produced** — words appearing live — instead of spinning for 10 seconds then dumping a wall of text. Streaming is the single biggest perceived-speed and feel win for an AI chat (see websockets-and-realtime, building-an-llm-api-product).

## Transport: SSE Token Streaming

- **Server-Sent Events (SSE)** is the standard: the server sends `data: {chunk}` lines and a final `[DONE]`; the client appends each token as it arrives. Simpler than WebSockets for one-way streaming and works over plain HTTP.
- The client accumulates deltas into the growing message; render on each chunk (or batch a few for fewer reflows).
- **Time-to-first-token (TTFT)** is what users feel — get *something* on screen fast, even a thinking indicator, then stream.

## Rendering Partial Markdown Safely

- The stream is **incomplete markdown** at every moment — an unclosed ` ``` ` code fence, a half-written `**bold`, a dangling list item. Naively re-parsing each chunk flickers or breaks layout.
- **Strategies**: tolerate incompleteness (a lenient/streaming markdown parser), or **auto-close** open constructs for rendering (temporarily close the code fence/bold) and re-render cleanly on the next chunk. Keep code blocks monospace immediately so code doesn't reflow as prose.
- **Sanitize** rendered HTML (the model's output is untrusted) — escape/scrub to prevent injection (see prompt-injection-defense for the input side).

## Controls: Stop & Regenerate

- **Stop** — a visible button to abort mid-stream. It must **cancel the request** (close the SSE / `AbortController`) *and* tell the server to stop generating (to save tokens/cost). Keep the partial text.
- **Regenerate** — re-run the last turn for a different answer; **edit & resend** for the user's message.
- **Copy / retry on error** per message.

## Status Indicators

- Show **state**: idle → "thinking" (before first token) → streaming → done. A subtle animated indicator during TTFT reassures the user it's working.
- **Thinking / reasoning** and **tool/search status** ("🔍 searching…", "🧩 applying skill…") surface what the agent is doing mid-response — honest, engaging, and covers latency (LUMINA emits exactly these events).

## Scroll, Errors & Disconnects

- **Auto-scroll** to follow the stream **only if** the user is already at the bottom; if they scrolled up to read, **don't yank them down** — show a "jump to latest" affordance instead.
- **Disconnects** — network drops mid-stream happen. Detect the broken stream, keep the partial message, and offer **retry/continue**; don't lose what arrived or hang forever. Time out a stalled stream.
- **Errors** — render a clean inline error (with retry), not a stack trace; distinguish rate-limit/quota (offer upgrade/backoff) from real failures.

Build streaming chat UX around **SSE token streaming** with fast **time-to-first-token**, **safely rendering incomplete markdown** (auto-close open constructs, sanitize output), and first-class **stop/regenerate** controls that actually cancel server generation. Surface **thinking/tool status**, **auto-scroll only when the user is at the bottom**, and handle **disconnects/errors** by preserving partial text and offering retry — turning token-by-token generation into a responsive, trustworthy conversation.
