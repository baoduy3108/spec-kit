---
name: how-nat-works
description: How Network Address Translation (NAT) works — sharing one public IP among many private devices, the translation table mapping internal address:port to external, why it (accidentally) acts as a firewall, and the pain it causes for peer-to-peer (needing STUN/TURN/hole punching). Use to understand NAT, private vs public IPs, port forwarding, or why P2P connections are hard.
category: engineering
keywords_vi: nat hoạt động thế nào, network address translation, chia sẻ ip công cộng, địa chỉ ip riêng private, bảng dịch địa chỉ port, port forwarding, tại sao p2p khó, hole punching
---

# How NAT Works

Network Address Translation lets many devices on a private network share a **single public IP address**. It's why your home has dozens of gadgets but one internet-facing address, and it's a workaround for IPv4's limited address space (see how-ip-addressing-works).

## The Problem It Solves

There aren't enough IPv4 addresses for every device. So networks use **private IP ranges** (192.168.x.x, 10.x.x.x) internally, and NAT — usually in your router — translates between these private addresses and the one public address your ISP gave you.

## The Translation Table

When an internal device sends a packet to the internet:
1. The router **rewrites the source** from `192.168.1.5:51000` to `<public IP>:<new port>`.
2. It records this mapping in a **translation table**: `(public IP:port) ↔ (192.168.1.5:51000)`.
3. The reply comes back to `<public IP>:<new port>`; the router looks up the table and **rewrites the destination** back to the internal device, forwarding it inward.
Because it multiplexes many internal connections onto one public IP using **different ports**, this is often called **PAT** (Port Address Translation) or "NAT overload." The port number is the key that disambiguates which internal device a reply belongs to.

## NAT as an Accidental Firewall

A side effect: **unsolicited inbound** packets have no table entry (no internal device initiated them), so the router doesn't know where to send them and **drops** them. This means internal devices aren't directly reachable from the internet by default — a crude but real security benefit. To deliberately expose an internal service you configure **port forwarding** (a static table entry: "traffic to public port 8080 → 192.168.1.5:80").

## Why P2P Is Hard Behind NAT

The flip side: two devices *both* behind NAT can't easily connect to each other, because neither has a directly reachable public address and each NAT drops unsolicited inbound. This breaks peer-to-peer (video calls, gaming, file sharing). Workarounds:
- **STUN** — a device asks a public server "what's my external IP:port?" to discover its NAT mapping.
- **Hole punching** — both peers send outbound packets simultaneously so each NAT creates a table entry, letting the other's packets through.
- **TURN** — when hole punching fails (strict/symmetric NATs), relay all traffic through a public server (reliable but costs bandwidth).
This is exactly the machinery WebRTC uses (see how-webrtc-works).

## Pitfalls (in understanding/using)

- Thinking a private IP (192.168.x) is internet-reachable — it isn't; NAT/port-forwarding is needed to expose services.
- Treating NAT as **real security** — it's not a substitute for a firewall (it blocks unsolicited inbound as a side effect, not by policy).
- Being surprised P2P/self-hosting is hard behind NAT (needs STUN/TURN/port forwarding).
- **CGNAT** (carrier-grade NAT) — your ISP also NATs you, so you may not even have a usable public IP for port forwarding.
- Forgetting NAT breaks protocols that embed IPs in payloads (needs ALGs) or assume end-to-end addressing.
- Confusing NAT with IPv6, which has enough addresses to often avoid NAT entirely.
