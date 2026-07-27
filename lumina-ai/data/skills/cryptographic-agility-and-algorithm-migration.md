---
name: cryptographic-agility-and-algorithm-migration
description: How to build systems that can SWAP cryptographic algorithms without re-architecting — cryptographic agility — because every algorithm eventually weakens (MD5, SHA-1, RSA-1024, DES) and quantum threatens today's public-key crypto. Use to understand versioned/self-describing ciphertext, algorithm identifiers, dual-verify migrations, why hardcoding an algorithm is a liability, and planning post-quantum transitions.
category: security
keywords_vi: linh hoạt mật mã cryptographic agility đổi thuật toán không phải xây lại, mọi thuật toán rồi cũng yếu md5 sha-1 rsa-1024 des, ciphertext tự mô tả có mã định danh thuật toán và phiên bản, di trú thuật toán dual-verify chấp nhận cũ và mới, hardcode thuật toán là gánh nặng, chuyển đổi hậu lượng tử post-quantum
---

# Cryptographic Agility & Algorithm Migration

Every cryptographic algorithm has a **shelf life**. MD5 and SHA-1 were once standard and are now broken; DES gave way to AES; RSA-1024 is deprecated; and quantum computers threaten to break **all** widely-deployed public-key crypto (RSA, ECDH, ECDSA) via Shor's algorithm. So the question isn't *whether* you'll need to change algorithms — it's *whether your system can*. **Cryptographic agility** is the design property that lets you **swap algorithms without re-architecting or breaking existing data** (see authenticated-encryption-aead, forward-secrecy-and-key-exchange, cryptographically-secure-randomness).

## The Core Enabler: Self-Describing, Versioned Crypto

The single most important practice: **never assume "the algorithm" is fixed and implicit.** Instead, make every ciphertext, token, or signature **self-describing** by prefixing an **algorithm/version identifier**:

```
v2:AES-256-GCM:<nonce>:<ciphertext>:<tag>
```

Now the decryptor reads the tag and knows exactly how to process it. To migrate, you **add** a new version (`v3:...`) for new writes while **still supporting** old versions for reads. Without this, algorithm identity is baked into code and data, and a change means a painful, error-prone data migration or a hard flag day. (This is why JWTs have an `alg` header, PHC password hashes encode `$argon2id$...`, and TLS negotiates cipher suites — though note `alg`-confusion attacks: **validate** the algorithm against an allow-list, don't blindly trust it.)

## Migration Patterns

- **Encryption at rest** — envelope encryption (see envelope-encryption-and-kms) makes rotation cheap; tag each DEK/blob with its algorithm; **lazily re-encrypt** on next write, or bulk re-wrap.
- **Password hashes** — store the algorithm+params in the hash string; on successful login, **transparently re-hash** with the new algorithm/cost ("upgrade on login").
- **Signatures / verification** — **dual-verify**: accept both old and new algorithms during a transition window, sign with the new one, then retire the old once all consumers upgrade.
- **Protocols** — negotiate the algorithm (like TLS cipher suites) rather than hardcode, so endpoints can prefer the strongest mutually-supported option.

## Post-Quantum Context

"**Harvest now, decrypt later**" makes agility urgent for **long-lived confidentiality**: adversaries record encrypted traffic today to decrypt once quantum computers arrive. The transition uses **hybrid** schemes (classical ECDHE **combined with** a post-quantum KEM like ML-KEM) so you're safe if *either* holds. Agile systems can adopt these by adding a new negotiated/identified algorithm; rigid ones can't.

## Design Guidance (for understanding/using)

- **Tag everything with algorithm + version** — self-describing ciphertext/tokens/hashes are the foundation of agility.
- **Support read of old, write of new** — never require a big-bang flag day; migrate incrementally.
- **Validate the declared algorithm against an allow-list** — reject downgrade/`alg`-confusion (e.g. `alg:none`).
- **Abstract crypto behind an interface** — call "encrypt/decrypt", not a specific cipher, so swaps are localized.
- **Plan post-quantum now** for data that must stay secret for years; adopt hybrid KEMs when available.
- **Upgrade-on-use** — re-hash passwords on login, re-encrypt on write, to drain old algorithms over time.

## Pitfalls (in understanding/using)

- **Hardcoding** the algorithm in code/data → a future break forces a painful migration you didn't design for.
- Ciphertext with **no version/algorithm marker** → you can't tell how to decrypt old data after a change.
- **Trusting** a self-declared `alg` field → downgrade / `alg:none` / confusion attacks; always allow-list.
- Assuming today's algorithms are "forever" → MD5/SHA-1/RSA-1024 all seemed fine once.
- Ignoring **harvest-now-decrypt-later** for long-lived secrets → recorded traffic becomes readable post-quantum.
