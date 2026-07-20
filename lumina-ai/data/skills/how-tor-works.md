---
name: how-tor-works
description: How the Tor anonymity network works — onion routing, layered encryption through three relays (guard, middle, exit), circuits, hidden/onion services, and what Tor does and doesn't protect against. Use to understand anonymity networks, onion routing, or the privacy/threat trade-offs of Tor.
category: engineering
keywords_vi: tor hoạt động thế nào, onion routing, mạng ẩn danh, relay guard exit, mã hóa nhiều lớp, hidden service onion, ẩn danh internet
---

# How Tor Works

Tor (The Onion Router) is an anonymity network that hides *who is talking to whom* by routing traffic through volunteer relays with layered encryption. Understanding it clarifies both what anonymity systems can do and their real limits.

## Onion Routing — the core idea

Instead of connecting directly to a destination (which reveals your IP), your Tor client builds a **circuit** through **three relays**:
1. **Guard (entry) node** — knows your IP, but not your destination.
2. **Middle node** — knows neither end (just passes cells between guard and exit).
3. **Exit node** — knows the destination, but not your IP.

No single relay knows both who you are and what you're accessing. That separation is the whole point.

## Layered Encryption ("onion")

Your client encrypts the data in **nested layers** — one per relay, using keys negotiated with each. Each relay **peels off one layer** (decrypts its layer) to learn only the next hop, then forwards. The guard sees an onion it can only unwrap one layer of; the exit unwraps the last layer and sends plaintext to the destination. Like peeling an onion — hence the name.

## Circuits

Circuits are built through a telescoping handshake (extend one hop at a time, so each key is known only to the client and that relay). Tor **rotates circuits** periodically and uses different circuits for different destinations, limiting how much any observer can link together. The guard is kept stable (rotating it too often would expose you to more potential adversaries).

## Onion (Hidden) Services

A `.onion` service is reachable **only through Tor**, and hides the *server's* location too (not just the client's). Client and service meet at a **rendezvous point** via introduction points — neither learns the other's IP. This provides end-to-end anonymity and, because the address is derived from the service's public key, authenticated encryption to the right server.

## What Tor Does & Doesn't Protect

- **Protects:** your IP/location from the destination and from network observers; the linkage of source↔destination.
- **Does NOT automatically protect:** the **content** if you use plain HTTP — the **exit node sees your traffic** (use HTTPS/end-to-end encryption). It doesn't stop you **deanonymizing yourself** (logging into a real account, browser fingerprinting, leaking identity). A global adversary who can watch both ends may **correlate traffic timing/volume** (a known limitation). Malware, JS exploits, and misconfiguration bypass it.

## Pitfalls (in understanding/using)

- Thinking Tor encrypts content end-to-end — the **exit sees plaintext**; you still need HTTPS.
- Believing it makes you perfectly anonymous — **you** are usually the weak link (logins, fingerprints).
- Ignoring **traffic-correlation** attacks by powerful adversaries watching both ends.
- Assuming speed like a normal connection (three relays add latency by design).
- Confusing anonymity (Tor) with content secrecy (encryption) — they're different properties.
