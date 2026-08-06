---
name: gdpr-and-data-privacy
description: Data privacy principles and GDPR basics for builders — lawful basis, data minimization, purpose limitation, user rights (access/erasure/portability), privacy by design, and what counts as personal data. Use to understand GDPR/privacy obligations, design privacy-respecting systems, handle user data rights, or reason about lawful data processing.
category: engineering
keywords_vi: gdpr, quyền riêng tư dữ liệu, cơ sở pháp lý, quyền xóa dữ liệu, giới hạn mục đích, quyền người dùng truy cập mang đi, privacy by design, dữ liệu cá nhân là gì
---

# GDPR and Data Privacy

Data privacy regulations — GDPR (EU) being the most influential, with CCPA and others following — govern how you **collect, use, and store personal data**. This is a "know enough to build responsibly and know when to consult a lawyer" area: the goal is to internalize the **principles** so you design privacy-respecting systems, not to become a legal expert (see pii-handling-and-minimization, consent-management, data-retention-and-deletion).

## What Counts as Personal Data

**Personal data** is any information relating to an **identifiable person** — obvious things (name, email, address, ID numbers) but also **less obvious** ones: IP addresses, device IDs, cookies, location, and combinations of data that together identify someone. **Special categories** (health, biometrics, race, religion, sexual orientation, political views) get **extra** protection. If data can be tied to a person, privacy rules apply — this is broader than people expect.

## The Core Principles

GDPR's principles are the design guide even outside the EU:
- **Lawful basis** — you need a **legal reason** to process personal data: **consent**, **contract** (needed to provide the service), **legal obligation**, **legitimate interest**, etc. No lawful basis = you can't process it.
- **Purpose limitation** — collect data for a **specific, stated purpose**; don't repurpose it for something else later without a new basis.
- **Data minimization** — collect **only what you need** for that purpose, not "everything just in case" (see pii-handling-and-minimization).
- **Accuracy** — keep it correct and up to date.
- **Storage limitation** — don't keep it **longer than needed**; delete when the purpose ends (see data-retention-and-deletion).
- **Integrity/confidentiality (security)** — protect it (encryption, access control).
- **Accountability** — be able to **demonstrate** compliance (records, policies).

## User Rights

GDPR grants individuals rights your system must be able to honor:
- **Access** — a person can request a copy of their data (Data Subject Access Request).
- **Erasure** ("right to be forgotten") — request deletion of their data.
- **Rectification** — correct inaccurate data.
- **Portability** — receive their data in a portable, machine-readable format.
- **Object / restrict** — opt out of certain processing (e.g. marketing).
Your architecture must make these **feasible** — you have to be able to **find, export, and delete** all of a user's data, which is hard if it's scattered/duplicated everywhere.

## Privacy by Design

Build privacy in from the start, not bolted on:
- **Minimize** collection and retention by default.
- **Default to the most private** settings.
- **Encrypt** and **access-control** personal data (see how-encryption-at-rest-works).
- **Anonymize/pseudonymize** where possible (see data-anonymization-and-pseudonymization).
- **Track where personal data lives** (a data map) so you can fulfill rights and breaches.
- **Breach readiness** — GDPR requires notifying regulators (often within 72 hours) of qualifying breaches.

## Design Guidance

- **Establish a lawful basis** before collecting; document it.
- **Minimize** — don't collect data you don't need; it's the cheapest way to reduce risk.
- **Make user rights operable** — you must locate, export, and erase a user's data on request.
- **Retention policies** with automatic deletion (see data-retention-and-deletion).
- **Map your data** — know every place personal data flows and rests.
- **Vendor/processor** contracts — third parties processing data on your behalf need agreements.
- **Consult a professional** for actual compliance — this is legal territory.

## Pitfalls (in understanding/using)

- Collecting **"everything just in case"** → violates minimization and multiplies risk/liability.
- No **lawful basis** for processing → unlawful, regardless of good intentions.
- Data **scattered** everywhere → can't fulfill access/erasure requests (a compliance failure and a real engineering problem).
- Treating only obvious fields as personal data → **IPs, cookies, device IDs** count too.
- **Repurposing** data beyond its stated purpose without a new basis.
- Ignoring **retention** — keeping data forever violates storage limitation.
- Assuming it's **only an EU** concern → GDPR applies to EU residents' data wherever you are, and similar laws are spreading.
