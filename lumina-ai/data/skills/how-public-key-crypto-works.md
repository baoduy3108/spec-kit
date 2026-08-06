---
name: how-public-key-crypto-works
description: How asymmetric (public-key) cryptography works — key pairs, encrypting with the public key / decrypting with the private, digital signatures (sign with private, verify with public), key exchange, and how it underpins TLS, signing, and PKI. Use to understand public/private keys, digital signatures, and why you never share a private key.
category: engineering
keywords_vi: public key crypto hoạt động thế nào, mã hóa bất đối xứng, khóa công khai riêng tư, chữ ký số digital signature, rsa ecc, trao đổi khóa, pki, hiểu mã hóa khóa công khai
---

# How Public-Key Cryptography Works

Public-key (asymmetric) crypto solves a problem symmetric crypto can't: letting two parties who've never met communicate securely, and proving who signed something — using a mathematically linked **key pair**.

## Key Pairs

Each party has a **public key** (shared freely) and a **private key** (kept absolutely secret). They're linked by a hard math problem (factoring for RSA, discrete log on elliptic curves for ECC) such that you can't derive the private key from the public one. The two keys undo each other's operations.

## Two Uses (don't confuse them)

**1. Confidentiality — encrypt to someone:**
Anyone encrypts a message with the recipient's **public** key; only the holder of the matching **private** key can decrypt it. So you can receive secrets without ever sharing a secret first. (In practice, asymmetric crypto is slow, so it's used to exchange a fast **symmetric** key — exactly what TLS does.)

**2. Authenticity — digital signatures:**
The signer computes a signature over a message (really over its hash) using their **private** key; anyone verifies it with the signer's **public** key. A valid signature proves (a) it came from the private-key holder and (b) the message wasn't altered. Note this is the **reverse** direction — private to sign, public to verify. Signatures give authentication, integrity, and non-repudiation.

## Key Exchange

Protocols like **Diffie-Hellman (ECDHE)** let two parties derive a shared secret over a public channel without ever transmitting it — the basis of a TLS session key. Forward secrecy comes from using ephemeral keys so a later private-key compromise can't decrypt past sessions.

## Where It's Used

- **TLS/HTTPS** — server proves identity via a signed certificate; key exchange establishes a session key (see how-https-tls-works).
- **Signing** — software/package signatures, Git commit signing, JWTs (asymmetric variants), blockchain transactions.
- **SSH** — public-key auth (your public key on the server, private key on your machine).
- **PKI / certificates** — CAs sign certs, binding an identity to a public key; trust chains up to root CAs.

## The Cardinal Rules & Pitfalls

- **Never share or transmit a private key.** Its secrecy is the entire security model; a leaked private key means impersonation and decryption of everything. Store it protected, rotate on compromise.
- **Public keys are meant to be public** — sharing them is safe and required.
- **Trust distribution is the hard part** — knowing a public key *really* belongs to who you think (solved by CAs/PKI, web of trust, or key pinning) — otherwise a man-in-the-middle swaps in their own key.
- **Don't roll your own crypto** — use vetted libraries; subtle mistakes (bad randomness, padding, reuse) break otherwise-strong math.
