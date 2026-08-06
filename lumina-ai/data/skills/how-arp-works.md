---
name: how-arp-works
description: How ARP (Address Resolution Protocol) works — mapping an IP address to a MAC address on a local network via broadcast request/reply, the ARP cache, and the security risk of ARP spoofing. Use to understand ARP, MAC vs IP addresses, how devices find each other on a LAN, or ARP spoofing/man-in-the-middle on local networks.
category: engineering
keywords_vi: arp hoạt động thế nào, address resolution protocol, ánh xạ ip sang mac, địa chỉ mac vs ip, broadcast request reply, arp cache, arp spoofing tấn công lan
---

# How ARP Works

ARP (Address Resolution Protocol) answers a simple but essential local-network question: *"I know the IP address I want to reach on my LAN — but what's its hardware (MAC) address so I can actually deliver the frame?"* It bridges the gap between **IP addresses** (logical, layer 3) and **MAC addresses** (physical, layer 2).

## Two Kinds of Address

- **IP address** — logical, routable across networks; used to identify a host globally (see how-internet-routing-works).
- **MAC address** — a hardware identifier burned into a network interface, used to deliver frames on the **local** link (see how-network-switches-work).
On a local network, actual delivery happens by MAC address. So before a device can send an IP packet to a neighbor (or to its gateway), it must learn that neighbor's MAC. ARP does the lookup.

## The Request/Reply Dance

When host A wants to reach IP `192.168.1.20` on its LAN:
1. A checks its **ARP cache** (a table of recently-learned IP→MAC mappings). If present, done.
2. If not, A **broadcasts** an ARP request to the whole LAN: *"Who has 192.168.1.20? Tell 192.168.1.10."* Every device sees it.
3. Only the device that owns that IP **replies** (unicast): *"192.168.1.20 is at MAC aa:bb:cc:dd:ee:ff."*
4. A caches the mapping and sends its frame to that MAC. Future packets skip the broadcast.
For destinations **outside** the LAN, A doesn't ARP for the remote IP — it ARPs for its **default gateway's** MAC and sends the packet there to be routed onward.

## The ARP Cache

Mappings are cached with a timeout (entries expire so changes are picked up). This avoids broadcasting for every packet. You can inspect it (`arp -a`) — it shows which neighbors your machine has recently talked to.

## Security: ARP Spoofing

ARP has **no authentication** — a device simply believes ARP replies. So an attacker on the same LAN can send **forged** replies ("the gateway's IP is at *my* MAC"), poisoning victims' caches so their traffic flows through the attacker — a classic **man-in-the-middle** attack (ARP spoofing/poisoning), enabling eavesdropping or tampering. This is why **local network security matters** and why end-to-end encryption (HTTPS/TLS) protects you even on a hostile LAN (see how-https-tls-works). Defenses: dynamic ARP inspection on switches, static entries for critical hosts, and network segmentation.

## Pitfalls (in understanding/using)

- Confusing **MAC** (local delivery, layer 2) with **IP** (global routing, layer 3) — ARP is the bridge between them.
- Assuming ARP crosses routers — it's **link-local only**; you ARP for the gateway to reach remote networks.
- Trusting a LAN as safe — ARP spoofing makes local networks a real MITM risk; rely on TLS end-to-end.
- Stale/poisoned ARP cache causing connectivity issues (flush the cache to diagnose).
- Forgetting ARP is **IPv4**; IPv6 uses **NDP** (Neighbor Discovery) for the same job.
