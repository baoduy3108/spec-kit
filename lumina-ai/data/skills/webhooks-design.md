---
name: webhooks-design
description: Design reliable webhooks (outgoing and incoming) — event delivery with retries and backoff, signing/verifying payloads (HMAC), idempotent receivers, at-least-once semantics, ordering, replay protection, and dead-lettering. Use when building a system that sends webhooks or consuming a third-party webhook.
category: engineering
keywords_vi: webhook, thiết kế webhook, gửi sự kiện http callback, ký hmac webhook, xác thực webhook, retry giao webhook, nhận webhook idempotent, replay
---

# Webhooks Design

A webhook is a server-to-server HTTP callback: when an event happens, the provider POSTs it to a URL the consumer registered. Getting reliability and security right is the whole job.

## Sending Webhooks (provider side)

- **At-least-once delivery + retries** — the receiver may be down or slow, so retry failed deliveries with **exponential backoff + jitter** over minutes/hours. Because retries mean the same event can arrive more than once, tell consumers to be idempotent.
- **Sign every payload** — compute an **HMAC** (e.g. SHA-256) of the raw body with a shared secret and send it in a header. This lets the receiver verify the request truly came from you and wasn't tampered with. Include a **timestamp** in the signed data and reject old ones to prevent **replay**.
- **Stable event IDs** — give each event a unique id so receivers can dedupe.
- **Deliver fast, retry smart** — treat any non-2xx (or timeout) as failure; give up after N attempts and **dead-letter** (store for manual replay + alert). Offer a way to re-send.
- **Don't block on the receiver** — send asynchronously from a queue; a slow consumer shouldn't stall your main flow.

## Receiving Webhooks (consumer side)

- **Verify the signature first** — recompute the HMAC over the **raw** body (not re-serialized JSON) and constant-time compare; reject if it doesn't match. Never trust an unsigned/unverified webhook.
- **Be idempotent** — you *will* get duplicates. Record processed event ids and skip repeats (dedup table / idempotency key), or make the effect naturally idempotent (upsert).
- **Respond 2xx fast, process async** — acknowledge quickly (queue the work) so the provider doesn't time out and retry; do the heavy work in the background. A slow handler causes duplicate deliveries.
- **Don't assume order** — events can arrive out of order or delayed; use timestamps/versions and tolerate it, or fetch current state from the provider's API rather than trusting event order.
- **Return the right status** — 2xx = accepted (don't retry); 4xx = permanently bad (don't retry); 5xx/timeout = retry.

## Pitfalls

- **Verifying against re-serialized JSON** instead of the raw bytes → signatures never match.
- **Non-idempotent receiver** → duplicate side effects (charged twice, double emails).
- **Doing slow work synchronously** → provider times out → more retries → more duplicates.
- **No replay protection** → captured requests replayed later.
- **Assuming exactly-once or in-order** — neither is guaranteed.
