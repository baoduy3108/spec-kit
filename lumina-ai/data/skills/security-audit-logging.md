---
name: security-audit-logging
description: Designing security audit logs — an append-only, tamper-evident record of who did what and when (auth, access, admin, sensitive actions), what to capture, protecting the logs, and using them for forensics and compliance. Use to design audit trails, log security-relevant events, meet compliance logging, or investigate incidents.
category: engineering
keywords_vi: nhật ký kiểm toán bảo mật, audit log ai làm gì khi nào, append-only chống giả mạo, ghi sự kiện đăng nhập truy cập quản trị, bảo vệ log, điều tra forensics tuân thủ
---

# Security Audit Logging

An audit log is a **tamper-evident record of who did what, when** — the security-relevant events (logins, permission changes, access to sensitive data, admin actions) that let you **detect misuse, investigate incidents, and prove compliance**. It's distinct from ordinary application/debug logging: audit logs are about **accountability**, must be **trustworthy**, and are often **legally required** (see observability-and-instrumentation, pii-handling-and-minimization).

## Audit Log vs Application Log

- **Application/debug logs** — for developers to diagnose behavior; verbose, ephemeral, not trusted as evidence.
- **Audit logs** — for **security and compliance**: a durable, trustworthy record of **who** performed **what** action on **what** resource, **when**, and the **outcome**. Different retention, protection, and integrity requirements. Don't conflate them.

## What to Log

Capture **security-significant** events with enough context to answer "who did what":
- **Authentication** — logins (success **and** failure), logouts, MFA events, password/credential changes, lockouts.
- **Authorization** — permission/role changes, privilege escalations, access-denied events.
- **Sensitive data access** — who read/exported PII or confidential records (see pii-handling-and-minimization).
- **Administrative actions** — config changes, user creation/deletion, key operations, data deletion.
- **Security events** — suspicious activity, rate-limit triggers.

For each event record: **who** (actor/identity), **what** (action + target resource), **when** (accurate, synced timestamp), **where** (source IP/device/session), and the **result** (success/failure). Enough to reconstruct events for forensics.

## What NOT to Log

- **Never log secrets/credentials** — passwords, tokens, keys, full card numbers (see pii-handling-and-minimization). Log that an action happened, not the sensitive values.
- **Minimize PII** in logs — reference IDs, not full personal data, where possible (audit logs are themselves sensitive and long-retained).

## Integrity: Append-Only and Tamper-Evident

An audit log is only useful if it can be **trusted** — an attacker who breaches your system will try to **delete or alter** logs to cover their tracks. So audit logs must be **tamper-evident**:
- **Append-only** — no updates or deletes; new events only.
- **Separate/isolated storage** — ship logs to a **separate system** (or write-once storage / a SIEM) the application/attacker can't rewrite, ideally in real time.
- **Tamper-evidence** — techniques like **hash chaining** (each entry includes a hash of the previous, so alteration is detectable) or cryptographic signing.
- **Restrict access** — few people can read (they're sensitive) and **no one** can quietly modify them.

## Using Audit Logs

- **Forensics/incident response** — reconstruct what happened during a breach.
- **Detection** — feed a **SIEM**/alerting to spot anomalies (impossible-travel logins, mass data export) in near real time.
- **Compliance** — many regulations (SOC 2, HIPAA, PCI, GDPR) **require** audit trails and retention.
- **Non-repudiation** — prove a specific user performed an action.

## Design Guidance

- **Separate** audit logs from debug logs; treat them as evidence.
- **Log who/what/when/where/result** for security events; enough to reconstruct.
- **Append-only, isolated, tamper-evident** storage (ship off-box, hash-chain/sign).
- **Never log secrets**; minimize PII.
- **Accurate synced clocks** (NTP) — timestamps must be reliable across systems.
- **Retention** per compliance needs; protect and eventually expire per policy.
- **Monitor/alert** on the audit stream, don't just archive it.

## Pitfalls (in understanding/using)

- **Mutable/deletable** logs on the same box → an attacker erases their tracks; use append-only, off-box storage.
- **Logging secrets/PII** into audit logs → the audit trail itself becomes a breach target.
- Conflating **debug** and **audit** logs → security events buried in noise, wrong retention/protection.
- Missing **who/what/when** context → logs that can't actually answer forensic questions.
- **Unsynced clocks** → can't correlate events across systems during an investigation.
- **Archive-and-forget** → no real-time detection of ongoing abuse.
- Logging **failures only** or **successes only** → you need both (failed logins *and* successful access tell different stories).
