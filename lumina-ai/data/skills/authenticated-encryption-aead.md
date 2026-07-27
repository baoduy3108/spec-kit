---
name: authenticated-encryption-aead
description: Why encryption alone is not enough and you almost always want AEAD — Authenticated Encryption with Associated Data. It provides confidentiality AND integrity/authenticity in one primitive (AES-GCM, ChaCha20-Poly1305), so an attacker can't tamper with ciphertext undetected. Use to understand why encrypt-then-MAC, why unauthenticated modes (raw AES-CBC) are dangerous, and how associated data binds context.
category: security
keywords_vi: mã hoá có xác thực aead vừa bảo mật vừa toàn vẹn, mã hoá không đủ cần chống giả mạo ciphertext, aes-gcm và chacha20-poly1305 một primitive, encrypt-then-mac đúng thứ tự, chế độ không xác thực aes-cbc nguy hiểm, dữ liệu liên kết associated data ràng buộc ngữ cảnh
---

# Authenticated Encryption (AEAD)

A common and dangerous misconception: "I encrypted the data, so it's secure." Encryption alone gives **confidentiality** (an attacker can't *read* it) but **not integrity** (an attacker can *modify* it). With an unauthenticated mode like raw AES-CBC or AES-CTR, an attacker who can't decrypt can still **flip bits** in the ciphertext to flip bits in the plaintext, truncate it, or replay it — and the receiver decrypts the tampered result as if genuine. This has caused real breaks (padding-oracle attacks, bit-flipping cookies). **AEAD** fixes it by providing **confidentiality AND authenticity together** (see symmetric-vs-asymmetric-encryption, nonce-and-iv-management, constant-time-code-and-side-channels).

## What AEAD Guarantees

An AEAD primitive takes `(key, nonce, plaintext, associated_data)` → `(ciphertext, auth_tag)`. On decryption it **verifies the tag first**; if the ciphertext (or associated data, or nonce) was altered at all, verification **fails** and it returns an error instead of garbage plaintext. So you get:
- **Confidentiality** — the plaintext is hidden.
- **Integrity + authenticity** — any tampering is detected; only someone with the key could have produced a valid tag.

The standard, safe modern choices: **AES-GCM** (hardware-accelerated on most CPUs) and **ChaCha20-Poly1305** (fast in software, great on mobile). Prefer these over hand-assembling encryption + a separate MAC.

## Associated Data (the "AD")

AEAD lets you authenticate **but not encrypt** extra context — the **associated data**: headers, a message type, a sequence number, the recipient id, a version. It's not hidden, but it's **bound** to the ciphertext: if an attacker moves a valid ciphertext to a different context (different header/recipient), tag verification fails. Use AD to bind a ciphertext to *where and how* it's supposed to be used.

## Encrypt-then-MAC (if you must combine manually)

If you ever compose encryption and a MAC yourself (you usually shouldn't — use AEAD), the **only** safe order is **Encrypt-then-MAC**: encrypt the plaintext, then MAC the *ciphertext*, and **verify the MAC before decrypting**. MAC-then-Encrypt and Encrypt-and-MAC have led to real vulnerabilities (padding oracles). But the right answer in almost all cases is: **just use a vetted AEAD.**

## Design Guidance (for understanding/using)

- **Default to AEAD** (AES-GCM / ChaCha20-Poly1305) for any symmetric encryption — never ship raw CBC/CTR without authentication.
- **Verify the tag before using plaintext** — decryption failure must be a hard error, not "decrypt anyway".
- **Use associated data** to bind ciphertext to its context (recipient, purpose, version).
- **Never reuse a nonce** with the same key — catastrophic for GCM (see nonce-and-iv-management).
- **Don't roll your own** — use a maintained library's AEAD; composing primitives is where people get breached.

## Pitfalls (in understanding/using)

- "It's encrypted, so it's safe" → without authentication, ciphertext is **malleable/tamperable**.
- Using raw **AES-CBC/CTR** with no MAC → bit-flipping and padding-oracle attacks.
- **MAC-then-Encrypt** or decrypting before verifying → padding-oracle class bugs.
- Ignoring the auth **tag** on decrypt (or truncating it too short) → tampering goes undetected.
- Putting secret data in **associated data** thinking it's hidden → AD is authenticated but **not encrypted**.
