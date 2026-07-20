---
name: password-hashing-and-storage
description: How to store user passwords safely — never plaintext or fast hashes, use a slow adaptive password hash (bcrypt/scrypt/Argon2) with a per-user salt, why salting and slowness matter, and peppering. Use to store passwords securely, choose bcrypt/Argon2, understand salting/slow hashing, or fix insecure password storage.
category: engineering
keywords_vi: băm và lưu mật khẩu, không lưu plaintext hay hash nhanh, hàm băm mật khẩu chậm bcrypt scrypt argon2, salt mỗi người dùng, tại sao salting và chậm quan trọng, pepper
---

# Password Hashing and Storage

Storing user passwords is a security-critical task with **clear right and wrong answers** — get it wrong and a database breach hands attackers everyone's passwords. The rules: **never store plaintext**, **never use fast/general hashes**, use a **slow, adaptive password-hashing function** with a **per-user salt** (see how-cryptographic-hashing-works, security-and-hardening).

## Rule 1: Never Store Plaintext

Storing passwords **as-is** means a database leak (or a curious admin) exposes every password directly — and since people **reuse** passwords, you've compromised their other accounts too. Never store, log, or email plaintext passwords. You should never even be *able* to see a user's password.

## Rule 2: Hash — But Not With a Fast Hash

Store a **hash** of the password, not the password. But **which** hash matters enormously:
- **Don't use fast general-purpose hashes** (MD5, SHA-256) — they're designed to be **fast**, which means an attacker with a stolen hash database can compute **billions of guesses per second** on a GPU, cracking common/weak passwords quickly. SHA-256 is great for integrity, **wrong** for passwords.
- **Use a slow, adaptive password-hashing function** — **bcrypt**, **scrypt**, or **Argon2** (Argon2id is the current recommendation). These are **deliberately slow** and **tunable** ("work factor"/cost), so each guess is expensive — turning billions/sec into thousands/sec and making brute force impractical. As hardware improves, you **increase the cost factor** to stay ahead (that's the "adaptive" part).

## Rule 3: Salt (per user, unique)

A **salt** is a unique random value added to each password before hashing, stored alongside the hash:
- **Prevents rainbow-table attacks** — precomputed hash lookups don't work when every password has a unique salt (the attacker can't precompute for unknown salts).
- **Makes identical passwords hash differently** — two users with the same password get **different** hashes, so a breach doesn't reveal who shares passwords, and cracking one doesn't crack the others.
Salts don't need to be secret (they're stored with the hash) — they need to be **unique per user** and random. Modern password hashers (bcrypt/Argon2) **generate and embed the salt for you**.

## Rule 4 (optional): Pepper

A **pepper** is an additional secret value (the **same** for all users) mixed in, but stored **separately** from the database (e.g. in a KMS/config, not the DB). If only the database leaks (not the pepper), the hashes are much harder to crack. It's defense-in-depth on top of salting.

## Verifying and Upgrading

- **Verify** by hashing the submitted password (with the stored salt/params) and comparing — password hashers provide a `verify` that handles this and uses **constant-time** comparison (avoiding timing attacks).
- **Upgrade over time** — when a user logs in, if their hash used old/weaker parameters, **re-hash** with the current cost/algorithm and update it. This migrates your stored hashes forward.

## Design Guidance

- **Argon2id** (or bcrypt/scrypt) with a sensible, tuned **cost factor** — never MD5/SHA for passwords.
- **Unique per-user salt** (the hasher handles it) — never a shared or no salt.
- **Consider a pepper** stored outside the DB for extra protection.
- **Use the library's verify** (constant-time); don't compare hashes yourself naively.
- **Re-hash on login** when parameters are outdated.
- **Rate-limit** login attempts and support **MFA** — hashing protects the stored data, not against online guessing.
- **Never log** passwords or full hashes.

## Pitfalls (in understanding/using)

- **Plaintext** storage → catastrophic on breach (and password reuse spreads the damage).
- **Fast hashes** (MD5/SHA-256) for passwords → GPU-crackable at billions/sec.
- **No salt** or a **shared** salt → rainbow tables and identical-password leakage.
- **Rolling your own** scheme (hash-then-hash, secret sauce) → weaker than vetted password hashers.
- **Never increasing** the cost factor as hardware improves → protection erodes over time.
- Non-constant-time **comparison** → timing side channels.
- Thinking hashing alone stops **online guessing** → also rate-limit and offer MFA.
