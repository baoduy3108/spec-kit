---
name: how-dns-works
description: How DNS resolves a domain name to an IP — the recursive resolver, the root/TLD/authoritative hierarchy, record types (A/AAAA/CNAME/MX/TXT/NS), TTL and multi-level caching, and why propagation takes time. Use to understand domain resolution, DNS records, caching/propagation delays, and DNS-related failures.
category: engineering
keywords_vi: dns hoạt động thế nào, phân giải tên miền, recursive resolver, bản ghi a cname mx txt, ttl cache dns, propagation lan truyền dns, đổi dns lâu, hiểu dns
---

# How DNS Works

DNS is the phone book of the internet: it translates a human name (`example.com`) into an IP address a machine can connect to. It's a distributed, cached, hierarchical lookup.

## The Resolution Journey

When you request `www.example.com` and it's not cached:
1. Your machine asks a **recursive resolver** (your ISP's or e.g. 8.8.8.8) to do the work.
2. The resolver asks a **root** server → which points to the **.com TLD** servers.
3. The TLD servers point to `example.com`'s **authoritative** name servers.
4. The authoritative server returns the **A record** (the IP).
5. The resolver caches the answer and returns it; your machine connects.

This hierarchy (root → TLD → authoritative) is why DNS scales globally and has no single owner — each level delegates down.

## Record Types

- **A / AAAA** — name → IPv4 / IPv6 address.
- **CNAME** — an alias pointing one name to another name (not an IP).
- **MX** — mail servers for the domain.
- **TXT** — arbitrary text (SPF/DKIM email auth, domain verification).
- **NS** — which name servers are authoritative.
- **CAA, SRV, PTR** (reverse) and others for specific needs.

## TTL, Caching & Propagation

Every record has a **TTL** (time-to-live) telling resolvers how long to cache it. Caching happens at many levels (browser, OS, resolver), which makes DNS fast and resilient — but means a change isn't instant. When you update a record, old cached copies live until their **TTL expires** — that's "DNS propagation" (really cache expiry). Lower the TTL *before* a planned change so the switch is quick; expect up to the old TTL for stragglers. There's no push/invalidation — it's pull-based expiry.

## Why It Matters

- **"Site works for me but not them"** — often a caching/propagation timing difference after a change.
- **Can't resolve host** — DNS failure (record missing, name server down, typo), distinct from the server being unreachable.
- **Slow first connection** — an uncached DNS lookup adds round-trips before the TCP/TLS handshake even starts (why DNS prefetch/caching helps).
- Email deliverability depends on correct **MX/TXT (SPF/DKIM/DMARC)** records.
- DNS is also a load-balancing/failover tool (multiple A records, geo-routing, low-TTL failover).
