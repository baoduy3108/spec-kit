---
name: server-authoritative-multiplayer
description: Designing an online multiplayer game/world where the server owns all authoritative state and validates every action — clients only send intents and render what the server confirms — so cheating is structurally hard. Covers the authoritative server loop, client-side prediction + reconciliation to hide latency, interest management, and the principle that AI agents and human players go through the exact same protocol (no privileged backdoor). Use to design server-authoritative games, prevent client cheating, or expose a world equally to bots and humans.
category: game-dev
keywords_vi: server giữ trạng thái thẩm quyền, kiến trúc multiplayer chống gian lận, client chỉ gửi ý định server xác nhận, dự đoán phía client và hòa giải, agent và người chơi cùng một giao thức, quản lý vùng quan tâm interest management
---

# Server-Authoritative Multiplayer

The foundational rule of any online game that must resist cheating: **the server is the single source of truth**, and the **client is never trusted**. Clients send **intents** ("I want to move here", "I attack that target"); the server **validates** each against the rules and current state, updates the **authoritative state**, and tells clients what actually happened. The client only **predicts and renders** — it never *decides* outcomes. If a design lets the client report "I hit you for 100 damage," it's already broken (see how-multiplayer-game-networking-works if present, distributed-systems-fundamentals, api-and-interface-design).

## Why "Never Trust the Client"

Anything running on the player's machine can be **modified**: memory editors, packet tampering, custom clients. If the client is authoritative over position, damage, loot, or currency, cheating is trivial (speed hacks, teleport, infinite gold). Making the **server** compute and validate everything means a tampered client can only send *intents* the server will **reject** if illegal — cheating becomes structurally hard, not just discouraged.

## The Authoritative Loop

1. Client captures input → sends **intent** (small, declarative: *what* it wants, not *what happened*).
2. Server **validates**: is this action legal given the rules, cooldowns, position, resources?
3. Server **mutates authoritative state** and computes results (damage, movement, drops).
4. Server **broadcasts** the resulting state (or deltas) to relevant clients.
5. Clients **render** the confirmed state.
The server tick runs this at a fixed rate; the client's job is presentation, not truth.

## Hiding Latency: Prediction + Reconciliation

If the client waited for the round-trip before moving, the game would feel laggy. So the client **predicts** locally (move immediately as if the intent will be accepted), then **reconciles** when the authoritative update arrives: if the server agrees, nothing visible happens; if it disagrees (rejected/corrected), the client **snaps/interpolates** to the authoritative state. This gives responsiveness **without** ceding authority — prediction is a display trick, not a source of truth.

## Interest Management (Scale)

You can't send every entity to every client (bandwidth, and it leaks info for cheating). **Interest management** sends each client only what's **relevant** to it — entities near it / in its region (spatial partitioning, area-of-interest). This bounds bandwidth and is also an **anti-cheat** measure (a client that never receives distant players' data can't wallhack them).

## Agents and Humans on the Same Protocol

A powerful design principle (esp. for worlds meant to host **AI agents** alongside people): agents get **no privileged API** and **no backdoor** — they connect through the **exact same protocol** as human clients, sending the same intents and receiving the same state. Benefits: the server's validation protects against misbehaving *bots* the same way it protects against cheating *humans*; agents can't gain unfair capabilities; and one authoritative rule set governs everyone. Parity keeps the world fair and the security model singular.

## Design Guidance

- **Server owns state; validate every action** — clients send intents, never outcomes.
- **Predict + reconcile** on the client to hide latency without giving up authority.
- **Interest-manage** — send each client only what's relevant (bandwidth + anti-cheat).
- **Same protocol for bots and humans** — no privileged agent backdoor.
- **Send deltas**, tick at a fixed rate, keep intents small and declarative.
- **Assume a hostile client** — anything it can compute, it can fake.

## Pitfalls (in understanding/using)

- **Client-authoritative** damage/position/currency → trivial cheating.
- Treating client-side prediction as **truth** rather than display → desync and exploits.
- **Broadcasting everything** to everyone → bandwidth blowout and wallhack data leaks.
- Giving agents a **privileged API** → fairness and security holes; use protocol parity.
- Trusting client-reported **outcomes** ("I picked up the item") instead of validating intents.
- No **reconciliation** → rubber-banding or letting mispredictions become real state.
