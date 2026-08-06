---
name: key-derivation-functions
description: How to turn one secret into many strong, purpose-specific keys — Key Derivation Functions (KDFs) like HKDF, and the separate family of slow password KDFs (Argon2/scrypt/PBKDF2). Covers extract-then-expand, why you never use a raw shared secret or password directly as a key, domain separation via context/info, and salts. Use to derive keys safely, understand HKDF vs password hashing, and per-purpose key separation.
category: security
keywords_vi: hàm dẫn xuất khoá kdf biến một bí mật thành nhiều khoá, hkdf trích rồi mở rộng extract-then-expand, không dùng thẳng shared secret hay mật khẩu làm khoá, tách miền domain separation bằng context info, kdf mật khẩu chậm argon2 scrypt pbkdf2, muối salt cho mỗi khoá
---

# Key Derivation Functions (KDFs)

You often have **one** secret — a Diffie-Hellman shared secret, a master key, a password — and need **cryptographic keys** from it. Using that secret **directly** is a mistake: a DH output isn't uniformly random, a password has low entropy, and reusing one key for multiple purposes creates cross-protocol attacks. A **Key Derivation Function** safely turns input keying material into one or more strong, independent, purpose-bound keys (see how-cryptographic-hashing-works, password-hashing-and-storage, forward-secrecy-and-key-exchange).

## Two Different Families (don't confuse them)

**1. KDFs for high-entropy inputs — HKDF.** When the input is already secret and high-entropy (a DH/ECDH shared secret, a random master key), use **HKDF** (HMAC-based KDF). It's **fast** and works in two steps:
- **Extract** — concentrate the input's entropy into a uniformly-random pseudorandom key (`PRK = HMAC(salt, input)`).
- **Expand** — stretch the PRK into as many output keys as you need, each tagged with an **`info`/context** label (`HKDF-Expand(PRK, "encryption key v2", L)`).

**2. KDFs for low-entropy inputs — password KDFs.** When the input is a **password** (low entropy, guessable), you need a **deliberately slow, memory-hard** function to resist brute force: **Argon2** (preferred), **scrypt**, or **PBKDF2** (legacy). These are the same tools used for password *storage* — slowness is the point (see password-hashing-and-storage). **Never** use fast HKDF on a raw password, and never use a fast hash for password-derived keys.

## Domain Separation (the `info` / context)

Derive a **separate** key for each purpose — encryption vs MAC, client vs server, v1 vs v2 — by giving each a distinct **context string** in HKDF-Expand. This is **domain separation**: even if one key leaks, others stay safe, and a ciphertext from one context can't be reused in another. Reusing a single key for encryption *and* authentication *and* signing is a classic footgun.

## Salts and Nonces in KDFs

- **Salt** (HKDF-Extract) — a non-secret random value that de-correlates outputs and strengthens extraction; use a fresh salt where you can.
- For password KDFs, a **unique per-user salt** is mandatory (defeats rainbow tables), plus tuned cost parameters.

## Design Guidance (for understanding/using)

- **Match the KDF to the input**: high-entropy secret → **HKDF**; password → **Argon2/scrypt/PBKDF2**.
- **Never use a raw secret/password as a key directly** — always derive.
- **One key per purpose** via distinct HKDF `info` labels (domain separation).
- **Use unique salts**; store password-KDF parameters so you can raise cost over time.
- **Don't invent your own KDF** (e.g. `sha256(secret + purpose)`) — use HKDF/Argon2 from a real library.

## Pitfalls (in understanding/using)

- Using a **DH shared secret** directly as an AES key → not uniform; run it through HKDF first.
- Running a **password** through fast HKDF/SHA-256 → trivially brute-forced; use a slow memory-hard KDF.
- **Reusing one derived key** for encryption + MAC + other uses → cross-purpose attacks; separate by context.
- Omitting the **`info`/context** → no domain separation between keys.
- Rolling a homemade KDF by concatenating and hashing → subtle length-extension / separation bugs.
