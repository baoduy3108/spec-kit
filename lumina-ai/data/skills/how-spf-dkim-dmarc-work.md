---
name: how-spf-dkim-dmarc-work
description: How email authentication works — SPF (which servers may send for a domain), DKIM (cryptographic signature proving the message wasn't forged), and DMARC (policy tying them together plus reporting), and why all three are needed to stop spoofing. Use to understand SPF/DKIM/DMARC, stop email spoofing, fix emails landing in spam, or set up domain email authentication.
category: engineering
keywords_vi: spf dkim dmarc, xác thực email, server nào được gửi thay domain, chữ ký mật mã chống giả mạo, chính sách và báo cáo, chống spoofing giả mạo email, email vào spam
---

# How SPF, DKIM, and DMARC Work

SPF, DKIM, and DMARC are three DNS-based standards that together **authenticate email** — proving a message genuinely came from the domain it claims, so receivers can reject **spoofed/forged** mail. Because email (SMTP) has **no built-in authentication**, anyone can forge the "From" address; these three layers close that hole. Getting all three right is also what keeps your legitimate mail **out of the spam folder** (see how-email-works, email-deliverability).

## The Problem: SMTP Trusts the Sender

The original email protocol lets a sender claim **any** "From" address — there's no verification. That's why phishing and spoofing are trivial: a scammer can send mail that *appears* to be from your bank or your domain. SPF/DKIM/DMARC add the missing authentication, each answering a different question.

## SPF — Which Servers May Send

**SPF (Sender Policy Framework)** answers: *"Is this sending server **authorized** to send for this domain?"* The domain owner publishes a DNS TXT record **listing the IPs/servers allowed** to send mail for the domain. The receiver checks the sending server's IP against that list.
- Validates the **envelope sender** (the SMTP-level `MAIL FROM`), **not** the visible "From" header.
- **Breaks on forwarding** — a forwarded message comes from a different server not in the original SPF list, so SPF fails. (This is why DKIM is also needed.)

## DKIM — A Cryptographic Signature

**DKIM (DomainKeys Identified Mail)** answers: *"Was this message actually signed by the domain, and unaltered in transit?"* The sender **signs** each message with a **private key**; the matching **public key** is published in DNS. The receiver verifies the signature.
- Proves the message is **authentic** and **unmodified** (tamper-evident), tied to the domain.
- **Survives forwarding** (the signature travels with the message) — complementing SPF's weakness.
- Doesn't itself say what to do on failure — that's DMARC's job.

## DMARC — Policy + Alignment + Reporting

**DMARC** ties SPF and DKIM to the **visible "From" domain** and tells receivers **what to do** when authentication fails. Its key contributions:
- **Alignment** — requires that the SPF/DKIM-validated domain **matches the "From" header** domain (stopping a valid signature from an *unrelated* domain from passing as you). At least one of SPF or DKIM must **pass *and* align**.
- **Policy** — the domain owner publishes what receivers should do with failing mail: `p=none` (monitor only), `p=quarantine` (spam folder), or `p=reject` (block).
- **Reporting** — receivers send **aggregate reports** back, so you can see who's sending as your domain (legit and abusive) before tightening policy.

The recommended rollout: publish DMARC at `p=none`, read the reports to ensure all your legit senders pass SPF/DKIM, then ramp to `quarantine` and finally `reject`.

## Why All Three

They're complementary: **SPF** (authorized servers) fails on forwarding; **DKIM** (signature) survives forwarding but needs a policy; **DMARC** (alignment + policy + reporting) ties them to the visible From and decides enforcement. Together they make spoofing your domain very hard — and mailbox providers **reward** properly-authenticated domains with inbox placement.

## Pitfalls (in understanding/using)

- Relying on **SPF alone** → breaks on forwarding and doesn't protect the visible "From"; you need DKIM + DMARC.
- Jumping straight to **`p=reject`** without monitoring → you block your *own* legitimate mail (forgotten senders/services).
- Forgetting a **third-party sender** (your CRM, ticketing, marketing tool) in SPF/DKIM → their mail fails authentication.
- Confusing the **envelope sender** (SPF) with the **From header** (DMARC alignment) — they can differ.
- **SPF too many DNS lookups** (>10) → SPF permerror; flatten/consolidate includes.
- Assuming authentication guarantees the mail is **safe** — it proves *origin*, not that the content is benign (a compromised legit domain still passes).
