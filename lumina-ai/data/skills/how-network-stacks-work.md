---
name: how-network-stacks-work
description: How a network stack works — the layered model (link, internet/IP, transport/TCP-UDP, application), encapsulation as data passes down and up the layers, headers per layer, and why layering makes networking modular. Use to understand the network stack, OSI/TCP-IP layers, encapsulation, how a packet is built, or building a network stack.
category: engineering
keywords_vi: network stack, phân tầng link ip tcp, encapsulation, mô hình phân tầng application, đóng gói header mỗi tầng, phân tầng module hóa
---

# How Network Stacks Work

A network stack is the **layered software** that turns your app's data into signals on a wire and back — the machinery behind every network call. It's organized as **layers**, each handling one concern and building on the one below. Understanding the stack ties together TCP, IP, and the rest (see how-tcp-works, how-ip-addressing-works, how-http-works).

## The Layered Model

Networking is split into layers so each solves one problem and can evolve independently (the TCP/IP model, roughly mapping to OSI):
- **Link layer** (Ethernet, Wi-Fi) — moving frames between directly-connected devices on the local network, using MAC addresses (see how-network-switches-work, how-arp-works, how-wifi-works). The physical/local hop.
- **Internet layer** (IP) — routing packets across networks by IP address, host to host, worldwide (see how-ip-addressing-works, how-internet-routing-works). Gets data to the right *machine*, possibly across the globe — but unreliably (packets can be lost/reordered).
- **Transport layer** (TCP, UDP) — delivering data to the right *program* (via ports) and adding reliability if needed: **TCP** gives ordered, reliable, connection-based streams (see how-tcp-works); **UDP** is fast, connectionless, best-effort (see how-quic-and-http3-work). Turns unreliable packets into a usable channel.
- **Application layer** (HTTP, DNS, SMTP...) — the protocols your app speaks (see how-http-works, how-dns-works). The actual meaning of the data.

## Encapsulation (the key mechanism)

Data travels **down** the stack on send and **up** on receive, with each layer **wrapping** the layer above:
- Your app produces data (e.g. an HTTP request).
- **Transport** adds a header (TCP/UDP: ports, sequence numbers) → a **segment**.
- **Internet** adds an IP header (source/dest IP) → a **packet**.
- **Link** adds a frame header/trailer (MAC addresses, checksum) → a **frame** sent on the wire.
Each layer treats the layer above's output as opaque **payload** and adds its own header (encapsulation). On the receiving side, each layer **strips its header** and passes the payload up (decapsulation), until the app gets its data. Every layer only cares about its own header — it doesn't need to understand the others.

## Why Layering Matters

- **Modularity** — each layer is independent; you can swap Wi-Fi for Ethernet (link) or TCP for UDP (transport) without changing the others. HTTP works the same over any lower layers.
- **Separation of concerns** — routing (IP), reliability (TCP), and application meaning (HTTP) are separate problems solved separately.
- **Interoperability** — standardized layers let any devices/software interoperate.
The stack is why a browser, an OS, a router, and a switch — built by different vendors — all cooperate to deliver your request.

## Pitfalls (in understanding/using)

- Confusing the **layers' jobs** — IP routes to a *host*, ports (transport) route to a *program*, MAC (link) is the *local hop*.
- Assuming **IP is reliable** — it's best-effort; reliability comes from TCP (transport).
- Thinking data is sent "as-is" — it's **encapsulated** with a header per layer (and MTU limits can fragment it).
- Mixing up **MAC** (local, link layer) and **IP** (global, internet layer) addressing (see how-arp-works).
- Expecting layers to know about each other — each only handles its own header (that's the point).
- Ignoring that overhead accumulates (each header adds bytes) — matters for small packets/efficiency.
