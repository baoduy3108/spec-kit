---
name: how-certificate-authorities-work
description: How the public-key infrastructure (PKI) and certificate authorities work — certificates binding a public key to an identity, the chain of trust from root CAs, how browsers validate TLS certs, revocation (CRL/OCSP), and Let's Encrypt/ACME. Use to understand PKI, TLS certificates, certificate authorities, the chain of trust, or why a site shows "not secure".
category: engineering
keywords_vi: certificate authority, pki, chứng chỉ ssl tls, chain of trust, chuỗi tin cậy, root ca, revocation ocsp, let's encrypt
---

# How Certificate Authorities Work

A digital signature proves a message came from a given **public key** — but how do you know that public key really belongs to `bank.com` and not an attacker? That's the job of **Public Key Infrastructure (PKI)** and **Certificate Authorities (CAs)**: binding public keys to real-world identities you can trust.

## Certificates — a signed identity claim

A **certificate** is a document that says "this public key belongs to `bank.com`," **digitally signed by a CA** (see how-digital-signatures-work). It contains the subject's identity, their public key, validity dates, and the CA's signature. When you connect to a site over HTTPS, it presents its certificate; your browser checks the CA's signature to decide whether to trust the key (see how-https-tls-works).

## The Chain of Trust

You don't trust every CA directly — trust is **hierarchical**:
- Your OS/browser ships with a set of **root CA** certificates (the **trust store**) — a few dozen highly-vetted authorities. Their private keys are guarded intensely (offline, in HSMs).
- Roots sign **intermediate CA** certificates; intermediates sign end-entity (leaf) certificates for websites. This keeps the precious root key offline and limits damage if an intermediate is compromised.
- A site sends its leaf cert **+ intermediates**; the browser verifies each signature up the chain until it reaches a **root it already trusts**. If the chain validates and the hostname matches and it's unexpired → trusted. Any broken link → "not secure" warning.

## How Validation Works (browser side)

1. Signature chain valid up to a trusted root.
2. Hostname matches the cert's subject/SAN.
3. Not expired, not yet valid → fail if outside dates.
4. Not revoked (see below).
5. Correct usage (it's a server-auth cert).
Only then is the padlock shown and the TLS handshake trusted.

## Revocation

If a private key is compromised, the cert must be **revoked** before expiry:
- **CRL** — Certificate Revocation Lists (published lists of revoked serials).
- **OCSP** — an online query "is this cert still valid?"; **OCSP stapling** has the server attach a fresh signed status so the browser needn't ask the CA (better privacy/latency).
Revocation checking is historically weak — short-lived certs (below) reduce reliance on it.

## Let's Encrypt & ACME

Certificates used to be manual and paid. **Let's Encrypt** (a free CA) plus the **ACME protocol** automate issuance: prove you control the domain (e.g. serve a challenge file / DNS record), and get a cert issued programmatically, auto-renewed every ~90 days. This is why HTTPS is now ~universal.

## Pitfalls (in understanding/using)

- Not sending the **intermediate** certs → "incomplete chain" errors on some clients (server misconfig).
- Letting certs **expire** — a classic outage; automate renewal (ACME).
- Trusting a cert because it's "valid" without checking the **hostname** matches (a valid cert for another domain proves nothing about this one).
- Installing untrusted **root CAs** (e.g. corporate/MITM proxies) — they can then impersonate any site to you.
- Confusing "encrypted" (TLS) with "trustworthy site" — a valid cert proves domain control, not that the operator is honest.
- Ignoring revocation / using long-lived certs with compromised keys.
