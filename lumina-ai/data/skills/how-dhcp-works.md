---
name: how-dhcp-works
description: How DHCP works — automatically assigning IP addresses and network config to devices via the DORA exchange (Discover, Offer, Request, Acknowledge), leases and renewal, and what a device receives (IP, subnet, gateway, DNS). Use to understand DHCP, how devices get IP addresses automatically, IP leases, or network auto-configuration.
category: engineering
keywords_vi: dhcp hoạt động thế nào, cấp phát ip tự động, dora discover offer request acknowledge, lease thuê ip, gateway dns subnet, tự động cấu hình mạng
---

# How DHCP Works

DHCP (Dynamic Host Configuration Protocol) automatically hands out IP addresses and network settings to devices when they join a network — so you never manually configure an IP to get online. It's the "plug in and it just works" of networking.

## What a Device Needs (and Gets)

To communicate on an IP network, a device needs more than just an IP:
- An **IP address** (unique on the network)
- A **subnet mask** (which addresses are local vs remote — see how-ip-addressing-works)
- A **default gateway** (the router to reach other networks — see how-internet-routing-works)
- **DNS servers** (to resolve names — see how-dns-works)
DHCP delivers all of these in one exchange, from a **DHCP server** (usually your router) that manages a **pool** of addresses.

## The DORA Exchange

A new device (client) and the DHCP server go through four steps — **DORA**:
1. **Discover** — the client broadcasts "Is there a DHCP server? I need an address." (It has no IP yet, so it must broadcast.)
2. **Offer** — a DHCP server responds with an available IP and settings it's offering.
3. **Request** — the client broadcasts that it accepts a specific offer (important if multiple servers offered — it picks one, and others reclaim their offers).
4. **Acknowledge** — the server confirms, finalizing the assignment and its lease. The client configures itself and is online.

## Leases & Renewal

An address isn't given forever — it's a **lease** with an expiry. This lets the finite address pool be **reused** as devices come and go (a phone that leaves frees its address). Before the lease expires, the client **renews** (typically at ~50% of the lease time) to keep its address; if it leaves without renewing, the lease eventually expires and the address returns to the pool. **Reservations** can pin a specific device (by MAC) to a fixed IP while still using DHCP.

## Why It Matters

- **No manual config** — devices self-configure; scales to networks with thousands of transient devices (offices, campuses, Wi-Fi hotspots).
- **Centralized control** — change the DNS/gateway for everyone from one place.
- **Address reuse** — leases keep a limited pool serving many devices over time.

## Pitfalls (in understanding/using)

- **IP conflicts** — a statically-assigned IP inside the DHCP pool's range can collide with a leased one; reserve or exclude it.
- **Pool exhaustion** — too many devices for the address range → new devices can't get an IP (enlarge the pool/subnet).
- Assuming your IP is permanent — it can change on lease renewal/reconnect (use reservations/static for servers).
- A **rogue DHCP server** on the LAN handing out bad settings (gateway/DNS) → an attack or a misconfigured router causing outages.
- Forgetting DHCP also supplies **DNS/gateway** — wrong values there break connectivity even with a valid IP.
- Confusing DHCP (assigns IPs) with DNS (resolves names) or NAT (shares an IP) — different jobs.
