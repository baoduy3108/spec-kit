---
name: game-networking-and-netcode
description: How multiplayer netcode works — the authoritative server model, client-side prediction and server reconciliation to hide latency, entity interpolation for smooth remote players, and lockstep vs rollback for deterministic games. Use to design multiplayer netcode, hide network latency, choose client prediction vs rollback, or understand lag compensation.
category: engineering
keywords_vi: netcode multiplayer, mạng game nhiều người, server có thẩm quyền authoritative, client prediction dự đoán, server reconciliation, entity interpolation mượt, lockstep rollback, bù trễ lag
---

# Game Networking and Netcode

"Netcode" is how a multiplayer game keeps players **in sync** across a network **despite latency** — the fundamental challenge being that the internet has **delay and packet loss**, but games must feel **instant and fair**. The techniques (authoritative server, client prediction, interpolation, rollback) all exist to **hide latency** while preventing cheating (see how-websocket-protocol-works, delivery-semantics).

## The Core Tension: Latency vs Responsiveness vs Fairness

- **Latency** — it takes tens to hundreds of milliseconds for input to reach a server and back.
- **Responsiveness** — players expect their input to feel **instant**.
- **Fairness / anti-cheat** — you can't just trust each client (they'd cheat).
Netcode reconciles these. The dominant model for action games is an **authoritative server** with **client-side prediction**.

## Authoritative Server + Client Prediction + Reconciliation

- **Authoritative server** — the server holds the **true game state** and validates all actions. Clients can't be trusted (anti-cheat), so the server has final say.
- **The problem** — if the client waited for the server to confirm every move, movement would feel laggy (input → server → back before you move).
- **Client-side prediction** — the client **immediately** applies your input locally (you move now, no wait), *predicting* what the server will do.
- **Server reconciliation** — the server processes your input and sends back the authoritative result. If the client's prediction was **right**, nothing visible happens. If **wrong** (server disagreed), the client **corrects** — snapping/smoothing to the authoritative state and **replaying** any inputs made since. This gives instant response **and** server authority.

## Entity Interpolation (smooth remote players)

Your **own** character is predicted, but **other** players' positions arrive as **discrete, delayed** snapshots (say 20/sec). Rendering them the instant each arrives looks **jittery/teleporty**. **Entity interpolation** fixes this: render other entities **slightly in the past** (a small buffer), smoothly **interpolating between** the last two received snapshots. Remote players move fluidly, at the cost of seeing them a fraction of a second behind reality. (**Extrapolation** — predicting ahead — is the alternative but mispredicts on sudden changes.)

## Lag Compensation

For hit detection (shooters), the server does **lag compensation**: when you fire, it **rewinds** the world to the state **you saw** (accounting for your latency) to judge the hit fairly — so shooting what was on your screen counts, even though it's slightly in the past on the server.

## Lockstep vs Rollback (deterministic games)

A different model, common in RTS and fighting games:
- **Deterministic lockstep** — every client runs the **same simulation** and only exchanges **inputs** (tiny bandwidth, great for RTS with hundreds of units). But all clients must **wait** for everyone's input each step → the game runs at the **slowest** player's latency, and any non-determinism desyncs everyone.
- **Rollback netcode** — (fighting games) predict the opponent's input, simulate ahead immediately (responsive), and if the real input differs, **roll back** and re-simulate. Superb feel for fast fighting games; requires a fully deterministic, rewindable simulation.

## Design Guidance

- **Never trust the client** — server-authoritative for anything that matters (anti-cheat).
- **Predict locally** for your own actions; **reconcile** with the server.
- **Interpolate** remote entities for smoothness (render slightly in the past).
- **Send inputs/state efficiently** — delta-compress, prioritize, tolerate packet loss (usually UDP-based, not TCP, to avoid head-of-line blocking).
- **Design for determinism** if using lockstep/rollback — no undefined float/order behavior.
- **Handle packet loss/reordering** — never assume reliable, in-order delivery.

## Pitfalls (in understanding/using)

- **Trusting the client** → rampant cheating; the server must be authoritative.
- **No client prediction** → laggy, unresponsive controls (waiting for the round trip).
- **No interpolation** for remote players → jittery, teleporting opponents.
- Using **TCP** for fast-paced action → head-of-line blocking stalls everything on one lost packet; prefer UDP with your own reliability where needed.
- **Non-deterministic** simulation with lockstep/rollback → desyncs that are brutal to debug.
- Ignoring **lag compensation** → "I clearly hit them!" feels broken in shooters.
- Assuming a **LAN-quality** network → real internet has jitter, loss, and reordering; design for it.
