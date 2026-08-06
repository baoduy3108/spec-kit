---
name: how-proxies-work
description: How proxies work — an intermediary that forwards traffic; forward proxies (acting for clients) vs reverse proxies (acting for servers), what they enable (caching, load balancing, TLS termination, filtering, anonymity), and how they differ from VPNs/NAT. Use to understand proxies, forward vs reverse proxy, reverse proxies like nginx, or API gateways.
category: engineering
keywords_vi: proxy hoạt động thế nào, máy chủ trung gian, forward proxy reverse proxy, nginx, tls termination, cache load balancing, api gateway, ẩn danh lọc
---

# How Proxies Work

A proxy is an **intermediary** that sits between a client and a server, forwarding requests and responses. Because all traffic flows through it, a proxy is a natural place to add caching, security, load balancing, and control. The key distinction is *whose side* it acts on.

## Forward Proxy (acts for the client)

A **forward proxy** sits in front of **clients** and forwards their outbound requests to the internet. The destination server sees the request as coming from the proxy, not the real client. Uses:
- **Corporate/school egress control** — filter/log what users access, block sites.
- **Caching** shared content for many users.
- **Anonymity** — hide the client's IP from destinations.
- **Bypassing geo/network restrictions**.
The client is (usually) configured to use it. (This is the "proxy" in browser settings.)

## Reverse Proxy (acts for the server)

A **reverse proxy** sits in front of **servers** and receives requests from the internet on their behalf, forwarding them to backend servers. Clients think they're talking to the reverse proxy — they never see the real backends. This is the workhorse of web infrastructure (nginx, HAProxy, Envoy, cloud LBs). Uses:
- **Load balancing** — distribute requests across many backend instances (see how-load-balancers-work).
- **TLS termination** — handle HTTPS/decryption centrally so backends serve plain HTTP internally.
- **Caching & compression** — serve cached/compressed responses, offloading backends.
- **Security** — a single choke point for a WAF, rate limiting, and hiding backend topology (see how-firewalls-work).
- **Routing / API gateway** — route paths to different services, aggregate microservices.

## Forward vs Reverse (the mental model)

- **Forward proxy** = "for the client, hiding clients from servers" (you configure it to reach out).
- **Reverse proxy** = "for the server, hiding servers from clients" (the operator puts it in front of their services).
Same mechanism (intermediary that forwards), opposite side of the conversation.

## Proxy vs VPN vs NAT

- A **proxy** typically works per-application/protocol (e.g. HTTP) at the app layer.
- A **VPN** tunnels *all* your traffic encrypted at the network layer (see how-vpns-work).
- **NAT** rewrites addresses to share an IP (see how-nat-works) — related but about addressing, not application forwarding.

## Pitfalls (in understanding/using)

- Confusing **forward** and **reverse** proxies — they serve opposite parties.
- Assuming a proxy encrypts your traffic — a plain HTTP proxy may not; use HTTPS/VPN for confidentiality (the proxy itself can see unencrypted traffic).
- Forgetting the reverse proxy must pass the real client IP downstream (`X-Forwarded-For`) or backends log/limit the proxy's IP.
- Making the reverse proxy a **single point of failure** without redundancy.
- TLS-terminating at the proxy but leaving the proxy↔backend hop unencrypted in an untrusted network.
- Cache misconfiguration serving stale or user-specific content to the wrong users.
