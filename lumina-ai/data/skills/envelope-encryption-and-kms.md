---
name: envelope-encryption-and-kms
description: How large systems encrypt lots of data without exposing the master key — envelope encryption. Data is encrypted with a per-object data key (DEK); the DEK is itself encrypted by a key-encryption key (KEK) held in a KMS/HSM. Use to understand DEK/KEK, why the master key never leaves the KMS, cheap key rotation, why you store the wrapped DEK next to the ciphertext, and how cloud KMS (AWS/GCP/Azure) works.
category: security
keywords_vi: mã hoá phong bì envelope encryption khoá dữ liệu và khoá bọc, data key dek mã hoá dữ liệu kek bọc lại dek, khoá gốc không bao giờ rời kms hsm, xoay khoá rẻ chỉ bọc lại dek, lưu dek đã bọc cạnh ciphertext, kms đám mây aws gcp azure quản lý khoá
---

# Envelope Encryption & KMS

You need to encrypt millions of objects (files, DB rows, backups). Two naive approaches both fail: encrypting everything with **one master key** means that key is used everywhere and, if leaked, exposes all data; but calling a central key service to encrypt **every byte** is a performance and availability nightmare. **Envelope encryption** solves both with a two-level key hierarchy — the standard pattern behind every cloud **KMS** (see how-encryption-at-rest-works, key-derivation-functions, cryptographic-agility-and-algorithm-migration).

## DEK and KEK

- **Data Encryption Key (DEK)** — a fresh, random symmetric key generated **per object** (or per file/chunk/tenant). The actual data is encrypted locally with the DEK using AEAD (fast, no network per byte).
- **Key Encryption Key (KEK)** — a **master key** that lives inside a **KMS/HSM** and **never leaves it**. Its only job is to **encrypt (wrap) DEKs**.

The flow to encrypt an object:
1. Generate a random **DEK**.
2. Encrypt the data with the DEK (AES-GCM) locally.
3. Ask the KMS to **wrap** (encrypt) the DEK with the KEK.
4. **Store the wrapped DEK alongside the ciphertext**, and **discard the plaintext DEK** from memory.

To decrypt: send the wrapped DEK to the KMS to **unwrap** it (the KEK never leaves), get the plaintext DEK back, decrypt the data locally, discard the DEK. The KMS does tiny wrap/unwrap operations, not bulk data — cheap and scalable.

## Why This Is Good

- **The master key never leaves the KMS/HSM** — the highest-value secret has the smallest attack surface; the app never sees the KEK.
- **Cheap key rotation** — to rotate the master key, you only **re-wrap the DEKs** (small) with the new KEK; you don't have to **re-encrypt the data** (huge). This makes rotation practical.
- **Fine-grained access + audit** — the KMS logs every unwrap, enforces IAM policy, and can revoke access centrally.
- **Blast-radius control** — a leaked DEK exposes only its one object, not everything.

## Cloud KMS

AWS KMS, GCP Cloud KMS, Azure Key Vault, and HashiCorp Vault all implement this: `GenerateDataKey` returns a plaintext DEK **and** its wrapped form; you use the plaintext to encrypt, store the wrapped copy, and throw the plaintext away. Envelope encryption is also how client-side encryption and "bring your own key" work.

## Design Guidance (for understanding/using)

- **Never store a plaintext DEK at rest** — persist only the **wrapped** DEK next to the ciphertext.
- **Discard plaintext DEKs from memory** as soon as the operation completes.
- **Rotate by re-wrapping DEKs**, not re-encrypting data — that's the whole point.
- **Scope KEKs** (per tenant/env/purpose) and enforce least-privilege IAM on unwrap; monitor the audit log.
- **Add context/AAD** to wrap operations (KMS encryption context) to bind a DEK to its object.

## Pitfalls (in understanding/using)

- Storing the **plaintext** data key next to the ciphertext → defeats the whole scheme.
- Using **one master key directly** on all data → single catastrophic leak, and no cheap rotation.
- Calling the KMS to encrypt **bulk data** instead of just wrapping DEKs → latency, cost, throttling.
- Keeping the plaintext DEK in memory/logs longer than needed → widened exposure.
- Assuming rotation re-encrypts data → it re-wraps DEKs; old data stays under old DEKs unless you choose to re-encrypt.
