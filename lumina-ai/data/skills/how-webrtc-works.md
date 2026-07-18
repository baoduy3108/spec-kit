---
name: how-webrtc-works
description: How WebRTC enables real-time browser-to-browser audio/video/data — peer-to-peer connections, signaling, NAT traversal with STUN/TURN/ICE, and why a relay is sometimes needed. Use to understand video calls, live streaming, and peer-to-peer web communication.
category: engineering
keywords_vi: webrtc, gọi video trình duyệt, real-time p2p, signaling, stun turn ice, nat traversal, video call peer to peer, hiểu webrtc
---

# How WebRTC Works

WebRTC lets browsers exchange **audio, video, and data directly peer-to-peer** in real time — powering video calls, live audio, and low-latency data channels without plugins.

## Peer-to-Peer, Low Latency

Unlike normal web traffic (client ↔ server), WebRTC connects two browsers **directly** so media flows peer-to-peer with minimal latency — essential for real-time calls (a server relay adds delay). It uses UDP-based transport (SRTP for media) because for live media a late packet is worthless (see how-tcp-works — this is why not TCP).

## Signaling (the setup handshake)

Before two peers can connect, they must exchange connection info (media formats, network candidates) — but they have no direct channel yet. So you need a **signaling server** (WebSocket, etc.) that relays these setup messages between them. **WebRTC does not define signaling** — you build it (or use a service). Signaling is only for *setup*; once connected, media flows peer-to-peer, not through the signaling server.

## NAT Traversal (the hard part): STUN, TURN, ICE

Most devices are behind **NAT/firewalls** with private IPs, so peers can't just connect to each other's addresses. WebRTC solves this with:
- **STUN** — a lightweight server that tells a peer "here's how the public internet sees your address/port." With this, two peers behind typical NATs can often connect directly (hole punching).
- **TURN** — when direct connection is impossible (strict/symmetric NATs, corporate firewalls), a **relay** server forwards the media between peers. This costs bandwidth and adds latency but guarantees connectivity — the fallback.
- **ICE** — the framework that **gathers all possible connection candidates** (local, STUN-derived, TURN relay) and finds the best working path between the peers.

So the flow: signaling exchanges offers/answers + ICE candidates → ICE tries direct (STUN) → falls back to relay (TURN) if needed → media flows.

## Data Channels

Beyond audio/video, WebRTC offers **data channels** — peer-to-peer arbitrary data (game state, file transfer, chat) with configurable reliability/ordering — useful for low-latency multiplayer and P2P file sharing.

## Why It Matters

Explains: how browser video calls work without plugins, why they need a signaling server *and* STUN/TURN infrastructure (a common surprise cost — you must run/pay for TURN for reliability), why some calls fail or degrade behind strict firewalls (fall back to TURN relay), and the peer-to-peer vs relayed trade-off. For scale (many participants), pure P2P doesn't work (mesh explodes); you add an SFU/media server.

## Pitfalls / Notes

- **Forgetting TURN** → calls fail for users behind strict NAT/firewalls (works "on my network," fails for others).
- **No signaling server** — WebRTC can't bootstrap connections by itself.
- **Mesh P2P for many participants** → doesn't scale; use an SFU.
- Media is UDP/best-effort — expect adaptation to network conditions.
- Privacy: STUN can reveal IPs (the "WebRTC leak" relevant to VPNs — see how-vpns-work).
