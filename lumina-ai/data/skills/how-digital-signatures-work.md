---
name: how-digital-signatures-work
description: How digital signatures work — signing a message's hash with a private key, verifying with the public key, what they guarantee (authenticity, integrity, non-repudiation), and how they differ from encryption. Use to understand digital signatures, code signing, how software updates/JWTs are verified, or signing vs encryption.
category: engineering
keywords_vi: digital signature hoạt động thế nào, chữ ký số, ký bằng khóa riêng, xác minh khóa công khai, tính toàn vẹn xác thực, non-repudiation, ký vs mã hóa
---

# How Digital Signatures Work

A digital signature proves that a message came from a specific sender and wasn't altered — the digital equivalent of a tamper-evident wax seal, but unforgeable. They underpin code signing, software updates, TLS certificates, JWTs, blockchains, and signed documents.

## The Mechanism

Digital signatures use **asymmetric (public-key) cryptography** (see how-public-key-crypto-works), but *in reverse* of encryption:
1. **Sign:** the sender computes a **hash** of the message (see how-hash-tables-work for hashing basics — here a *cryptographic* hash), then encrypts/transforms that hash with their **private key**. The result is the signature, attached to the message.
2. **Verify:** anyone with the sender's **public key** transforms the signature back to the hash, independently hashes the received message, and checks the two hashes **match**.

If they match: the message is unchanged **and** was signed by the holder of the private key. Only the private-key holder could have produced a signature that verifies against their public key.

## Why Hash First?

Asymmetric operations are slow and size-limited, and messages are large. Hashing reduces any message to a fixed small digest, so you sign the digest, not the whole message. The **collision resistance** of the cryptographic hash (SHA-256, etc.) is what makes it safe: you can't find a different message with the same hash to swap in.

## What It Guarantees

- **Integrity** — any change to the message changes its hash → signature fails to verify.
- **Authenticity** — it was signed by the private-key holder (identity).
- **Non-repudiation** — the signer can't later deny it; only they have the private key. (Symmetric MACs give integrity+authenticity but *not* non-repudiation, since both parties share the key.)

## Signing vs Encryption (a common confusion)

- **Encryption** hides content: encrypt with the recipient's **public** key → only they (private key) can read.
- **Signing** proves origin/integrity: sign with your **private** key → anyone (your public key) can verify. It does **not** hide the message — signed data is still readable.
You can do both (sign then encrypt) for confidential + authenticated messages.

## Where You See Them

- **TLS certificates** — a CA signs your cert; browsers verify the chain (see how-certificate-authorities-work).
- **Code/software signing** — verify an app/update really came from the vendor, unmodified.
- **JWTs** — the server signs the token; it verifies the signature to trust the claims (see how-jwt-works).
- **Git commit signing, package signing, blockchains** — same principle.

## Pitfalls (in understanding/using)

- Thinking a signature **encrypts** — it doesn't hide the message, only authenticates it.
- Trusting a valid signature without trusting the **key's owner** — you must know the public key genuinely belongs to who you think (that's the job of PKI/CAs, see how-certificate-authorities-work).
- Using a broken hash (MD5/SHA-1) → forgeable; use SHA-256+.
- Leaking/reusing the private key → anyone can forge as you (see secrets-management).
- Verifying the signature but not that it covers **all** the relevant data (partial coverage attacks).
