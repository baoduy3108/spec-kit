---
name: how-encryption-at-rest-works
description: How data-at-rest encryption works — symmetric encryption (AES), key hierarchies (data keys wrapped by a master/KEK), envelope encryption, key management (KMS/HSM), full-disk vs field-level vs application-level encryption, and key rotation. Use to understand or design encryption for stored data.
category: engineering
keywords_vi: mã hóa dữ liệu lưu trữ, encryption at rest, aes symmetric, envelope encryption, key management kms, xoay khóa key rotation, mã hóa cột field level
---

# How Encryption at Rest Works

Encryption at rest protects stored data (databases, files, backups, disks) so that stealing the storage yields ciphertext, not secrets. Complements encryption in transit (TLS). The engineering challenge is less the cipher and more **key management**.

## Symmetric Encryption (the workhorse)

Data at rest is encrypted with **symmetric** crypto — the same key encrypts and decrypts, and it's fast enough for bulk data. **AES** (AES-256, typically GCM mode for authenticated encryption) is the standard. GCM/authenticated modes also detect tampering (integrity), not just secrecy. (Asymmetric crypto is too slow for bulk data — it's used to *protect keys*, not the data itself; see how-encryption-works if present, or how-tls-works.)

## The Key Problem → Key Hierarchies & Envelope Encryption

If you encrypt data with a key, where do you keep the key? **Envelope encryption** solves this:
- A **Data Encryption Key (DEK)** encrypts the actual data.
- The DEK is itself encrypted ("wrapped") by a **Key Encryption Key (KEK) / master key** held in a secure service.
- You store the *wrapped* DEK next to the data; to read, you ask the key service to unwrap it.

This means the master key never touches disk with the data, you can have many DEKs (per record/tenant/file) cheaply, and rotating the master key only requires re-wrapping DEKs, not re-encrypting all data.

## Key Management (the hard part)

- **KMS (Key Management Service)** — cloud services (AWS KMS, GCP KMS, Vault) that store master keys, do wrap/unwrap, enforce access policies, and audit. The master key ideally never leaves an **HSM** (hardware security module).
- **Access control & audit** — encryption is only as good as who can call "decrypt." Restrict and log key usage (see secrets-management, authentication-and-authorization).
- **Key rotation** — rotate keys periodically and after suspected compromise; envelope encryption makes master-key rotation cheap.

## Layers — Where to Encrypt

- **Full-disk / storage-level** — transparent, protects against physical theft of the disk, but data is plaintext to anyone with DB/app access (weakest boundary). Cheap, always worth having.
- **Database-level (TDE)** — DB encrypts files transparently; similar boundary to disk.
- **Field/column-level** — encrypt specific sensitive columns (SSNs, tokens) in the app before storing → protects even if the DB is fully compromised, and enables per-field access control. More work (breaks indexing/search on those fields).
- **Application-level / end-to-end** — strongest: server never sees plaintext. Highest complexity.
Choose by threat model (see threat-modeling): higher layers protect against more, at more cost.

## Pitfalls

- **Managing keys badly** — storing the key next to the data unencrypted defeats the purpose.
- **Encrypting the disk but leaving the app the plaintext boundary** and calling it done (defends only physical theft).
- **No rotation / no audit** on key access.
- **Rolling your own crypto** or using ECB mode / non-authenticated encryption (use AES-GCM via a vetted library).
- Forgetting **backups and logs** contain the same sensitive data (encrypt those too; don't log secrets).
- Losing keys → losing data permanently (key backup/escrow matters as much as secrecy).
