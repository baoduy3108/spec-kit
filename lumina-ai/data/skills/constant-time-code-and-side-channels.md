---
name: constant-time-code-and-side-channels
description: How secrets leak even from correct crypto — side channels — and how constant-time programming defends against them. Timing, cache, branch, and power/EM channels reveal secret-dependent behavior; comparing a MAC with early-exit `==` or branching on a secret leaks it. Use to understand timing attacks, why `hmac.compare_digest` exists, constant-time comparison, and avoiding secret-dependent branches/indexing.
category: security
keywords_vi: kênh phụ side-channel rò rỉ bí mật dù crypto đúng, tấn công thời gian timing attack so sánh mac thoát sớm, lập trình thời gian hằng số constant-time không rẽ nhánh theo bí mật, so sánh an toàn compare_digest chống đo thời gian, kênh cache và nhánh và điện năng, không truy cập bộ nhớ theo chỉ số bí mật
---

# Constant-Time Code & Side Channels

A cryptographic algorithm can be mathematically unbreakable and *still* leak its secrets — because attackers don't only see inputs and outputs. They can measure **how** the computation runs: how **long** it takes, which **cache lines** it touches, which **branches** it takes, how much **power** it draws. These are **side channels**, and if any of them depends on a **secret**, the secret leaks. Defending against them is **constant-time programming**: making execution independent of secret values (see authenticated-encryption-aead, password-hashing-and-storage, how-cpu-caches-work).

## The Classic: Timing Attack on Comparison

The textbook bug is comparing a secret (a MAC, a token, a password hash) with `==` or `memcmp`, which **returns as soon as the first differing byte** is found. That means a correct-prefix guess takes *slightly longer* than a wrong-first-byte guess. An attacker measures response times, learns the secret **one byte at a time**, and forges a valid tag with a few thousand requests instead of astronomically many. The fix: **constant-time comparison** that always examines **all** bytes and combines results (e.g. OR-ing XOR differences), taking the **same time regardless of where/whether they differ** — `hmac.compare_digest` (Python), `crypto.timingSafeEqual` (Node), `subtle.ConstantTimeCompare` (Go), `CRYPTO_memcmp` (OpenSSL).

## The Side-Channel Families

- **Timing** — total execution time depends on secret (early-exit compares, secret-dependent loops, non-constant-time bignum/modexp).
- **Cache** — secret-dependent **memory access patterns** (e.g. AES table lookups indexed by key bytes) leak via cache-hit/miss timing observable even by another process (Flush+Reload, Prime+Probe).
- **Branch** — secret-dependent **`if`** changes timing/branch-predictor state.
- **Power / EM** — physical measurement of a device (smartcards, HSMs) reveals per-operation secrets (differential power analysis).

## The Rules of Constant-Time Code

To make code secret-independent:
- **No branches on secrets** — don't `if (secret_bit)`; use branchless selects/masks.
- **No secret-dependent memory indexing** — don't use a secret as an array index (cache channel); use constant-time table lookups or bit-slicing.
- **No secret-dependent loop bounds / early exit** — always run the full length.
- **Use constant-time primitives** — vetted comparison, constant-time modular arithmetic (crypto libraries provide these).

## Design Guidance (for understanding/using)

- **Compare secrets with a constant-time function** — never `==`/`memcmp` on MACs, tokens, hashes.
- **Don't branch or index on secret data** — restructure to be data-oblivious.
- **Use vetted crypto libraries** — they implement constant-time AES/curve/bignum; don't hand-roll.
- **Prefer AEAD & high-level APIs** that handle these details, over assembling primitives yourself.
- **Know your threat model** — remote timing is real for web services; power/EM matters mainly for physical devices/smartcards.

## Pitfalls (in understanding/using)

- Comparing a token/MAC with `==` (early exit) → remote **timing attack** recovers it byte-by-byte.
- Using a secret as an **array index** (naive AES tables) → **cache** side channel.
- Branching on a secret bit → timing/branch-predictor leak.
- Assuming "it's fast and correct, so it's fine" → correctness ≠ side-channel resistance.
- Hand-writing modular exponentiation / curve math → almost certainly not constant-time; use a library.
