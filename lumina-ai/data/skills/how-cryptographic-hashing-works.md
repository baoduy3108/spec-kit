---
name: how-cryptographic-hashing-works
description: How cryptographic hash functions work — mapping any input to a fixed-size digest with properties (deterministic, one-way, collision-resistant, avalanche), uses (integrity, passwords, signatures, dedup), why SHA-256 not MD5, and password hashing (bcrypt/argon2 + salt). Use to understand cryptographic hashes, SHA-256, password hashing, salting, or hash integrity checks.
category: engineering
keywords_vi: cryptographic hash hoạt động thế nào, hàm băm mật mã, sha-256 md5, một chiều one-way, chống va chạm collision, avalanche, băm mật khẩu salt bcrypt argon2
---

# How Cryptographic Hashing Works

A cryptographic hash function maps **any input** (a file, a password, a message) to a **fixed-size digest** (e.g. 256 bits) in a way that's practically impossible to reverse or forge. It's distinct from hash-table hashing (see how-hash-tables-work) — the bar is much higher: it must resist adversaries.

## The Key Properties

A good cryptographic hash (SHA-256, SHA-3, BLAKE2/3) guarantees:
- **Deterministic** — same input always gives the same digest.
- **Fixed size** — any input length → fixed output (256 bits for SHA-256).
- **One-way (preimage resistant)** — given a digest, you can't feasibly find an input that produces it. You can hash forward, never backward.
- **Collision resistant** — you can't feasibly find **two different inputs** with the **same** digest.
- **Avalanche effect** — changing one bit of input changes ~half the output bits — outputs look random and reveal nothing about similarity of inputs.
These make the digest a trustworthy, tamper-evident fingerprint.

## What It's Used For

- **Integrity** — publish a file's hash; anyone can re-hash the downloaded file and verify it wasn't altered (any change → totally different hash).
- **Digital signatures** — sign the hash of a message, not the whole message (see how-digital-signatures-work).
- **Password storage** — store the hash, not the password (below).
- **Deduplication / content addressing** — identify content by its hash (Git commits, IPFS, blockchains — see how-git-works-internally, how-blockchain-works).
- **Proof of work** — find inputs whose hash meets a target (Bitcoin mining).

## Password Hashing (a special case)

Passwords need extra care — fast general hashes (SHA-256) are the **wrong** tool because attackers can guess billions/sec:
- **Salt** — add a unique random value per password before hashing, so identical passwords get different hashes and precomputed **rainbow tables** don't work.
- **Slow, memory-hard functions** — use **bcrypt, scrypt, or argon2** (not raw SHA/MD5). They're deliberately **slow and resource-intensive**, making brute-force guessing expensive. Tune the work factor upward over time.
- **Never store plaintext** or fast-hashed passwords (see security-and-hardening, owasp-top-10).

## Why Not MD5/SHA-1

**MD5** and **SHA-1** are **broken** — practical collision attacks exist (you can craft two files with the same hash). Never use them for security (signatures, integrity against adversaries). Use **SHA-256/SHA-3/BLAKE2+**. (MD5 is still fine for non-adversarial checksums like detecting accidental corruption.)

## Pitfalls (in understanding/using)

- Using **MD5/SHA-1** for security → forgeable; use SHA-256+.
- **Fast-hashing passwords** (SHA-256) → crackable; use bcrypt/scrypt/argon2 with a salt.
- Forgetting the **salt** (or reusing one) → rainbow-table attacks, identical hashes for identical passwords.
- Thinking a hash **encrypts** — it's one-way, not reversible; it hides nothing you can decrypt (there's no key).
- Assuming "same hash = same file" is only *probabilistically* true — but with a strong hash, collisions are infeasible, so it's safe in practice.
- Confusing cryptographic hashes (security) with hash-table hashes (speed) — different requirements.
