---
name: how-network-switches-work
description: How network switches work — layer-2 forwarding by MAC address, learning the MAC address table, why switches beat hubs (no shared collision domain), broadcast domains, and VLANs for segmentation. Use to understand network switches, MAC address tables, switches vs hubs vs routers, or VLANs.
category: engineering
keywords_vi: switch mạng, chuyển mạch layer 2, forward theo mac, mac address table, switch vs hub vs router, broadcast domain, vlan
---

# How Network Switches Work

A network switch connects devices on a **local network (LAN)** and forwards frames between them efficiently. It operates at **layer 2** (the data-link layer), making decisions based on **MAC addresses** — unlike a router, which works at layer 3 with IP addresses (see how-internet-routing-works).

## Forwarding by MAC Address

Every frame on a LAN carries a source and destination **MAC address** (a hardware identifier — see how-arp-works). A switch's job: receive a frame on one port and send it out **only the port** where the destination device lives — not to everyone. To do this it keeps a **MAC address table** mapping `MAC → port`.

## Learning the MAC Table

The switch builds this table automatically by observing traffic:
1. When a frame arrives, the switch notes its **source MAC** and the **port** it came in on → records "this MAC is reachable via port N."
2. To forward, it looks up the **destination MAC**:
   - **Known** → send out only that one port (unicast — efficient).
   - **Unknown** (not yet learned) → **flood** it out all ports except the source (so it reaches the destination, which will then reply and get learned).
   - **Broadcast** (destination FF:FF:FF:FF:FF:FF) → send out all ports.
Over time the table fills in and flooding becomes rare. This self-learning is why switches are plug-and-play.

## Why Switches Beat Hubs

An old **hub** was dumb — it repeated every frame to **all** ports, so all devices shared one **collision domain**: only one could talk at a time, and traffic was visible to everyone (a security and performance problem). A **switch** gives each port its own collision domain and forwards selectively, so many pairs of devices communicate **simultaneously** at full speed, and traffic isn't needlessly broadcast. This is why switches replaced hubs entirely.

## Broadcast Domains & VLANs

A switch still forwards **broadcasts** to all ports — so all devices on a switch share one **broadcast domain**. On a large network, excessive broadcast traffic wastes bandwidth, and everyone can reach everyone (flat, less secure). **VLANs (Virtual LANs)** solve this: they logically split one physical switch into multiple isolated networks — ports in different VLANs can't directly communicate (traffic between them must go through a **router/layer-3** device). VLANs segment for **security** (isolate guest/IoT/finance networks) and **broadcast containment** without separate hardware.

## Switch vs Router (the distinction)

- **Switch** — connects devices *within* a LAN, forwards by MAC (layer 2), fast/simple.
- **Router** — connects *different* networks, forwards by IP (layer 3), makes routing decisions.
Home "routers" combine both (a switch + router + Wi-Fi AP + NAT + DHCP in one box).

## Pitfalls (in understanding/using)

- Confusing **layer 2** (switch, MAC, one LAN) with **layer 3** (router, IP, between networks).
- Assuming a switch isolates broadcast traffic — it doesn't without **VLANs** (one broadcast domain).
- Creating a **switching loop** (cabling switches in a cycle without spanning-tree) → broadcast storm that takes down the LAN.
- Expecting a switch to route between subnets — that needs a router / layer-3 switch.
- Relying on a flat LAN for security — use VLANs to segment (see how-firewalls-work, threat-modeling).
- Forgetting MAC-table entries age out (a moved device is relearned).
