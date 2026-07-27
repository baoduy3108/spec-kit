---
name: nonce-and-iv-management
description: Why the "number used once" is the most dangerous parameter in symmetric crypto — nonce/IV management. Reusing a nonce with the same key catastrophically breaks AES-GCM (recovers the auth key and leaks plaintext XOR) and CTR modes. Use to understand nonce vs IV, random vs counter nonces, the 96-bit GCM limit and birthday bound, misuse-resistant modes (XChaCha, AES-GCM-SIV), and safe generation.
category: security
keywords_vi: quản lý nonce và iv số dùng một lần trong crypto đối xứng, tái dùng nonce cùng khoá phá vỡ aes-gcm nghiêm trọng, lộ khoá xác thực và xor plaintext khi trùng nonce, nonce ngẫu nhiên hay bộ đếm counter, giới hạn 96-bit gcm và ngưỡng sinh nhật birthday bound, chế độ chống lạm dụng xchacha aes-gcm-siv
---

# Nonce & IV Management

In symmetric encryption the key gets all the attention, but the **nonce** (Number used ONCE) / **IV** (Initialization Vector) is where systems actually break. Its rule is in the name: **for a given key, a nonce must never repeat.** Violate that and modern AEAD modes don't degrade gracefully — they **shatter**. Nonce reuse has caused real-world catastrophes (WEP, PS3, and countless custom protocols), so managing nonces correctly is a core operational skill (see authenticated-encryption-aead, cryptographically-secure-randomness, key-derivation-functions).

## Why Reuse Is Catastrophic (not just weak)

- **CTR / GCM keystream reuse** — these modes XOR plaintext with a keystream derived from `(key, nonce)`. Same key + same nonce = **same keystream**. An attacker who gets two ciphertexts with the same nonce computes `C1 XOR C2 = P1 XOR P2`, leaking relationships between plaintexts (and full recovery with known/guessable content).
- **GCM auth-key recovery** — worse, a single nonce reuse in **AES-GCM** lets an attacker recover the **authentication subkey (H)**, after which they can **forge valid tags** for *arbitrary* messages. One mistake destroys integrity for the whole key. This is why GCM is called "brittle".

So a nonce isn't a tuning detail — a repeat is a total break of confidentiality *and* forgeability.

## Nonce vs IV, Random vs Counter

- **Nonce** must be *unique* per (key, message); it need **not** be secret or unpredictable. **IV** in some modes (CBC) additionally must be *unpredictable*. Know which your mode demands.
- **Counter nonces** — a monotonic counter guarantees uniqueness and is ideal when a **single** sender owns the key (just never let it wrap or reset). Persist it carefully; a reset/rollback (VM snapshot, restart) reintroduces reuse.
- **Random nonces** — fine if large enough. **AES-GCM's 96-bit nonce** is only ~2⁹⁶; with random nonces the **birthday bound** means collisions become likely after ~2³² messages under one key — so rotate keys or cap message counts. ChaCha20-Poly1305 also uses 96-bit.

## Misuse-Resistant Modes

When you can't guarantee uniqueness (distributed senders, no reliable counter), use **nonce-misuse-resistant** AEAD:
- **AES-GCM-SIV** — a repeated nonce only leaks whether two identical messages were sent (not the auth key), degrading gracefully.
- **XChaCha20-Poly1305** — a **192-bit** nonce, large enough that **random** nonces essentially never collide — the easy safe default for random nonces.

## Design Guidance (for understanding/using)

- **Never reuse a (key, nonce) pair** — treat it as an absolute invariant.
- **Prefer a large random nonce (XChaCha20's 192-bit)** when using random generation; for 96-bit GCM, use a **counter** or cap messages/rotate keys before the birthday bound.
- **Beware state rollback** — snapshots/restarts can reset a counter; derive nonces so a reset can't repeat one, or use SIV modes.
- **Use misuse-resistant AEAD** (AES-GCM-SIV / XChaCha) when uniqueness is hard to guarantee.
- **Let the library manage nonces** where it offers to; don't hand-pick constants.

## Pitfalls (in understanding/using)

- Hardcoding a **fixed** nonce/IV (e.g. all zeros) → instant catastrophic reuse.
- Random 96-bit GCM nonces at **high volume** under one key → birthday collision → break; rotate keys.
- Counter nonce that **resets** on restart/snapshot → reuse; persist/derive safely.
- Thinking nonce reuse just "weakens" GCM → it **recovers the auth key** and enables forgery.
- Assuming a nonce must be secret → it must be **unique** (and for CBC, unpredictable), not secret.
