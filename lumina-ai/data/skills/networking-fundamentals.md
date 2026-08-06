---
name: networking-fundamentals
description: How the web's network stack works — TCP/IP, DNS resolution, HTTP/HTTPS request lifecycle, TLS handshake and certificates, ports, latency vs bandwidth, and diagnosing connectivity issues (timeouts, DNS failures, cert errors, CORS vs network errors). Use when debugging a network problem or reasoning about how a request travels.
category: engineering
keywords_vi: mạng máy tính, tcp ip, dns, https tls, chứng chỉ ssl, request không kết nối được, port, debug lỗi mạng, timeout kết nối
---

# Networking Fundamentals

A request crosses several layers; knowing which layer fails narrows the fix instantly.

## The Journey of a Request

1. **DNS** — the domain name resolves to an IP (cached at several levels; TTL controls staleness). DNS failure = "can't resolve host."
2. **TCP** — a connection is established (three-way handshake: SYN/SYN-ACK/ACK). Reliable, ordered byte stream. A hang here = firewall/port/host-unreachable.
3. **TLS** (for HTTPS) — handshake negotiates encryption and validates the server's **certificate** (must be valid, unexpired, chain to a trusted CA, and match the hostname). Cert errors happen here.
4. **HTTP** — the actual request/response (method, headers, body; status code). A 4xx/5xx means you connected fine — it's an application-layer response, not a network failure.

## Key Concepts

- **Ports** — a host has one IP but many ports (80 HTTP, 443 HTTPS, 22 SSH, 5432 Postgres…). "Connection refused" often means nothing is listening on that port.
- **Latency vs bandwidth** — latency is round-trip time (distance/hops); bandwidth is throughput. Many small requests are latency-bound (batch them / keep-alive / HTTP/2 multiplexing); large transfers are bandwidth-bound.
- **Stateless HTTP** — each request is independent; state is carried via cookies/tokens.
- **Idempotency & methods** — GET/PUT/DELETE idempotent, POST not; matters for retries.

## Diagnosing

- **Can't resolve host** → DNS: check the name, try `nslookup`/`dig`, try a known IP.
- **Connection timed out** → TCP: firewall, wrong port, host down, or network route; `ping`/`traceroute`, `curl -v`.
- **Connection refused** → reached the host but no service on that port.
- **Certificate / SSL error** → expired cert, hostname mismatch, or untrusted/incomplete chain.
- **HTTP 4xx/5xx** → you connected — it's an application problem, not networking.
- **CORS error** (browser) → the request *succeeded* at the network level; the browser blocked the *response* due to missing CORS headers. This is not a network failure — fix the server's `Access-Control-Allow-*` headers, not connectivity.

Use `curl -v` to see the whole sequence (DNS → connect → TLS → request → response) and spot exactly which step fails.
