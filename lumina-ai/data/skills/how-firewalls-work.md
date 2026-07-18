---
name: how-firewalls-work
description: How firewalls work — filtering traffic by rules on IP/port/protocol, stateless vs stateful inspection, default-deny policy, application-layer/next-gen firewalls, and where firewalls sit (network vs host). Use to understand firewalls, packet filtering, stateful inspection, security groups, or network access control.
category: engineering
keywords_vi: firewall hoạt động thế nào, tường lửa, lọc gói tin theo luật, ip port protocol, stateless stateful inspection, default deny, security group, kiểm soát truy cập mạng
---

# How Firewalls Work

A firewall controls which network traffic is allowed to pass, based on rules — the primary gatekeeper between networks of different trust levels (your machine and the internet, or a private subnet and the public one). It enforces *policy* on packets.

## Rule-Based Filtering

At its core, a firewall inspects each packet's attributes and matches them against an ordered **rule set**:
- **Source/destination IP** (or ranges/CIDR)
- **Port** (which service — 443 for HTTPS, 22 for SSH)
- **Protocol** (TCP/UDP/ICMP)
- **Direction** (inbound/outbound)
Each rule says **allow** or **deny**. Rules are evaluated in order; the first match wins. A packet with no matching allow rule hits the default.

## Default-Deny (the golden rule)

Secure firewalls use **default-deny**: block everything, then explicitly allow only what's needed ("allow inbound 443 and 22, deny the rest"). This is far safer than default-allow (block known-bad), because you can't enumerate every threat — you *can* enumerate what you legitimately need. Minimize the open surface (see security-and-hardening, threat-modeling).

## Stateless vs Stateful

- **Stateless (packet filter)** — judges each packet in isolation by its headers. Fast, but can't tell a legitimate reply from an unsolicited packet, so rules must be broad.
- **Stateful inspection** — tracks **connection state** (a table of established flows). It remembers that your machine initiated a connection, so it automatically allows the **replies** without a separate rule, and blocks unsolicited inbound. This is the modern standard: you allow *outbound* connections and their return traffic flows back naturally, while unexpected inbound is dropped. (NAT does something similar as a side effect — see how-nat-works.)

## Application-Layer & Next-Gen Firewalls

Basic firewalls only see IP/port/protocol — they can't tell *what* is inside an allowed connection. **Application-layer / next-gen firewalls (NGFW)** and **WAFs** (web application firewalls) inspect deeper: HTTP contents, TLS SNI, detecting SQL injection/XSS (see owasp-top-10), malware, or blocking specific apps. More power, more cost/latency.

## Where Firewalls Live

- **Network firewalls** — at the perimeter/between subnets (hardware appliances, cloud **security groups**/NACLs). Segment the network so a breach in one zone can't freely reach others.
- **Host firewalls** — on each machine (iptables/nftables, Windows Firewall) — defense in depth, protecting the host even inside a trusted network.
Use both (layered defense); don't rely on the perimeter alone (see the "assume breach" idea).

## Pitfalls (in understanding/using)

- **Default-allow** rule sets (block-known-bad) — you'll always miss something; use default-deny.
- Overly **broad rules** (allow all from 0.0.0.0/0, or open management ports like SSH/RDP to the whole internet) — a top breach cause.
- Assuming a firewall inspects **content** — a basic one only sees IP/port; an allowed port can carry anything (need app-layer/WAF for that).
- Relying only on the **perimeter** firewall (nothing stops lateral movement once inside) — segment internally.
- Rule-order mistakes (a broad allow above a specific deny) — order matters; first match wins.
- Forgetting **outbound** filtering (limits exfiltration and C2 — see SSRF in owasp-top-10).
