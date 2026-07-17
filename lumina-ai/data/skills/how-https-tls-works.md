---
name: how-https-tls-works
description: How HTTPS/TLS secures a connection — the TLS handshake, asymmetric crypto to exchange a key then fast symmetric encryption, certificates and the chain of trust (CAs), what HTTPS does and doesn't protect, and common cert errors. Use to understand HTTPS, certificates, TLS handshakes, and why cert errors happen.
category: engineering
keywords_vi: https tls hoạt động thế nào, mã hóa https, tls handshake, chứng chỉ ssl certificate, ca chain of trust, đối xứng bất đối xứng, lỗi chứng chỉ, hiểu https
---

# How HTTPS/TLS Works

HTTPS is HTTP over **TLS**, which gives three guarantees: **encryption** (eavesdroppers can't read it), **integrity** (it can't be tampered with undetected), and **authentication** (you're really talking to the site you think).

## The Handshake: Two Kinds of Crypto

TLS cleverly combines both crypto types:
- **Asymmetric (public/private key)** — slow, but lets two strangers agree on a secret over an open channel. Used only at the start.
- **Symmetric (shared key)** — fast, used for the actual data once a shared key exists.

The handshake: the client and server negotiate a cipher, the server presents its **certificate** (containing its public key), they perform a key exchange (e.g. ECDHE) so both derive the same **session key** without ever sending it in the clear, and then all traffic is encrypted with fast **symmetric** encryption using that session key. TLS 1.3 streamlined this to one round-trip (with 0-RTT resumption). This is why the handshake adds latency on top of TCP — a reason to reuse connections.

## Certificates & the Chain of Trust

How do you know the server's public key really belongs to `example.com` and not an impostor? A **Certificate Authority (CA)** that your OS/browser trusts has **signed** the site's certificate. Your browser verifies the signature up a **chain**: site cert → intermediate CA → root CA (pre-installed and trusted). If the chain is valid, unexpired, and the certificate's name matches the hostname, it's trusted. This is **PKI** (public key infrastructure) — trust delegated from a small set of root CAs.

## Common Certificate Errors (and what they mean)

- **Expired** — the cert's validity period ended (auto-renewal failed).
- **Name mismatch** — the cert is for a different hostname than the one you visited.
- **Untrusted / incomplete chain** — self-signed, or the server didn't send the intermediate cert, so the browser can't build the chain to a root.
- **Revoked** — the CA marked it invalid.
Each maps to a specific misconfiguration, not "the internet is broken."

## What HTTPS Does and Doesn't Protect

- **Protects**: the request/response **contents**, from eavesdropping and tampering, and authenticates the server.
- **Does NOT hide**: which **domain** you're visiting (DNS and SNI leak the hostname), the fact that you connected, or roughly how much data. It also doesn't make a site *trustworthy* — a phishing site can have a valid cert. HTTPS secures the *pipe*, not the *intentions* of the other end.

The takeaway: asymmetric crypto bootstraps a symmetric session key, certificates + CA chains authenticate the server, and the result is an encrypted, integrity-protected channel — with the handshake explaining latency and the chain explaining cert errors.
