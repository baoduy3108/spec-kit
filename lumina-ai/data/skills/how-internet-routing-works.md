---
name: how-internet-routing-works
description: How packets find their way across the internet — routers and routing tables, autonomous systems (AS), BGP advertising routes between networks, longest-prefix matching, and why the internet has no central map. Use to understand internet routing, BGP, autonomous systems, how packets reach a destination, or routing outages.
category: engineering
keywords_vi: định tuyến internet, bgp, autonomous system, router bảng định tuyến, longest prefix match, gói tin tìm đường, không có bản đồ trung tâm
---

# How Internet Routing Works

The internet is a network of networks with **no central controller and no master map**, yet a packet from your laptop reaches a server across the world in milliseconds. Routing is the distributed process that makes this work — each router making local decisions that collectively deliver packets.

## Routers & Routing Tables

A **router** connects networks and forwards packets toward their destination. It doesn't know the full path — only the **next hop**: it consults a **routing table** mapping destination IP ranges (prefixes) to "send via this neighbor." Each router along the way forwards one hop closer, like passing a letter through post offices that each only know the next sorting center. The packet's destination IP stays constant; each router independently decides where to send it next.

## Longest-Prefix Matching

Routing tables hold IP **prefixes** (e.g. `203.0.113.0/24`) of varying specificity. A destination may match several; the router picks the **most specific** (longest prefix) match — `/24` beats `/16` beats the default route `0.0.0.0/0`. This lets networks aggregate routes (one entry for a big block) while still allowing specific overrides. The default route is the "send everything else this way" catch-all toward the wider internet.

## Autonomous Systems & BGP

The internet is divided into ~tens of thousands of **Autonomous Systems (AS)** — independently operated networks (an ISP, a big company, a cloud provider), each with an AS number. Within an AS, interior protocols (OSPF/IS-IS) handle routing. **Between** ASes, the **Border Gateway Protocol (BGP)** is how the internet glues together:
- Each AS **advertises** to its neighbors which IP prefixes it can reach (its own and those it'll transit).
- Routes propagate AS-to-AS, so every network learns paths (as sequences of ASes) to every prefix.
- BGP chooses routes by policy (business relationships, path length, preferences) — not just shortest path. Routing is as much about **economics and policy** as topology.
This decentralized advertising is why the internet has no central map — reachability is discovered by neighbors telling neighbors.

## Fragility: BGP Has Little Built-in Security

BGP largely operates on **trust** — historically it accepts advertisements without strong verification. So a misconfiguration or malicious AS advertising prefixes it doesn't own causes **route hijacks/leaks** — traffic gets misdirected or blackholed (real outages have taken down major sites this way). RPKI and route filtering are gradually adding validation.

## Pitfalls (in understanding/using)

- Thinking there's a central "internet map" — routing is fully distributed via BGP advertisements.
- Assuming routes are **shortest-path** — BGP follows **policy/economics**, so paths can be indirect.
- Ignoring that routing is **asymmetric** — packets may take a different path back than out.
- Underestimating BGP's fragility — a single bad advertisement can misroute large chunks of traffic (route hijack/leak).
- Confusing routing (between networks, by IP prefix) with switching (within a LAN, by MAC — see how-network-switches-work) or DNS (names→IPs, see how-dns-works).
- Forgetting the default route — without it, a router only reaches explicitly-known prefixes.
