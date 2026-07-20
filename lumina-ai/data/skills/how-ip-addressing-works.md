---
name: how-ip-addressing-works
description: How IP addressing and subnetting work — IPv4 vs IPv6, the network/host split, subnet masks and CIDR notation, private vs public ranges, how a device decides local vs remote destinations, and why IPv6 exists. Use to understand IP addresses, subnets, CIDR, subnet masks, private IP ranges, or IPv4 vs IPv6.
category: engineering
keywords_vi: địa chỉ ip subnet hoạt động thế nào, ipv4 ipv6, chia mạng network host, subnet mask cidr, ip riêng public private, cạn địa chỉ ipv4, local vs remote
---

# How IP Addressing & Subnetting Work

An IP address identifies a device on a network and lets packets be routed to it. Understanding how addresses are structured — split into network and host parts — explains subnets, CIDR, and why your phone and laptop can talk directly while reaching the internet goes through a gateway.

## IPv4 and IPv6

- **IPv4** — 32-bit addresses written as four octets (`192.168.1.10`). Only ~4.3 billion exist — **not enough** for today's devices, which is why we have NAT (see how-nat-works) and private ranges.
- **IPv6** — 128-bit addresses (`2001:db8::1`) — an astronomically larger space, enough to give every device a unique public address (often removing the need for NAT). Adoption is ongoing; both coexist.

## Network Part vs Host Part

An IP address has two parts:
- The **network prefix** — identifies which network the address belongs to.
- The **host portion** — identifies the specific device within that network.
The **subnet mask** (or CIDR suffix) defines where the split is. In **CIDR notation** `192.168.1.0/24`, the `/24` means the first 24 bits are the network → the network is `192.168.1.x`, leaving 8 bits (256 addresses, ~254 usable) for hosts. `/16` would give a bigger network (65k hosts); `/30` a tiny one (2 usable, for point-to-point links). Smaller number after the slash = bigger network.

## Local vs Remote: the Core Decision

When a device sends a packet, it uses the subnet mask to decide: is the destination **on my subnet** (same network prefix) or **elsewhere**?
- **Same subnet** → deliver directly on the local link (resolve the MAC via ARP and send — see how-arp-works).
- **Different subnet** → send to the **default gateway** (router), which forwards it toward the destination (see how-internet-routing-works).
This is why the subnet mask matters as much as the IP: it determines who's "local."

## Private vs Public Addresses

Certain IPv4 ranges are **private** (not routable on the public internet): `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`. Home/office networks use these internally and share one public IP via NAT. **Public** addresses are globally unique and internet-routable. Special ranges exist too (`127.0.0.1` loopback, `169.254.x.x` link-local).

## Pitfalls (in understanding/using)

- Getting the **subnet mask wrong** → devices think the wrong hosts are local/remote → can't communicate or route incorrectly.
- Confusing **private** IPs (need NAT to reach the internet) with public/routable ones.
- Misreading CIDR — remember **smaller /n = larger network** (`/24` is bigger than `/28`).
- Overlapping subnets (e.g. VPN both ends using `192.168.1.0/24`) → routing conflicts.
- Assuming an IP is a permanent identity — DHCP can reassign it (see how-dhcp-works).
- Ignoring IPv6 — dual-stack issues arise when one path works and the other doesn't.
