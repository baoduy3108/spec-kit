---
name: how-email-works
description: How email works — SMTP for sending, IMAP/POP for retrieval, the hop from sender's server through DNS MX lookup to the recipient's server, and authentication (SPF/DKIM/DMARC) that fights spoofing. Use to understand email delivery, why mail lands in spam, and email infrastructure.
category: engineering
keywords_vi: email hoạt động thế nào, smtp imap pop, gửi nhận email, mx record dns, spf dkim dmarc, email vào spam, hạ tầng email, hiểu email
---

# How Email Works

Sending an email involves several servers and protocols cooperating — understanding them explains delivery, spam, and spoofing.

## The Protocols

- **SMTP** (Simple Mail Transfer Protocol) — for **sending** and **relaying** mail between servers. Your client hands the message to your outgoing (SMTP) server, which relays it toward the recipient's server.
- **IMAP** — for **reading** mail, keeping it **on the server** and syncing across devices (read on phone → shows read on laptop). The modern default.
- **POP3** — older retrieval protocol that **downloads and (usually) deletes** from the server; single-device, mostly legacy.

## The Journey of a Message

1. You send → your **SMTP server** accepts it.
2. It looks up the recipient domain's **MX record** in DNS (see how-dns-works) to find *which server* receives mail for `example.com`.
3. It connects (SMTP) to that server and delivers the message.
4. The recipient's server stores it in their mailbox; their client fetches it via **IMAP/POP**.
Along the way, servers may relay, queue, and retry (mail delivery is store-and-forward and can be delayed).

## Authentication (the anti-spoofing layer)

Plain SMTP lets anyone claim to be anyone (email was designed without authentication), so three DNS-based standards fight spoofing/phishing — and getting them right is essential for your mail to reach inboxes (see how-spam-filters-work, email-marketing):
- **SPF** — a DNS record listing which servers are allowed to send mail for your domain. The receiver checks the sending IP against it.
- **DKIM** — the sending server **cryptographically signs** the message; the receiver verifies the signature against a public key in your DNS. Proves the mail wasn't altered and came from an authorized signer.
- **DMARC** — ties SPF/DKIM together, tells receivers what to do if they fail (reject/quarantine), and sends you reports. Publishing DMARC protects your domain from being spoofed.

## Why It Matters

Explains: why sending mail from a new domain without SPF/DKIM/DMARC lands in spam; why MX records control mail delivery (change them to switch providers); the difference between IMAP (synced, server-kept) and POP (downloaded); why email can be delayed (queue/retry) or spoofed (weak/absent auth); and why deliverability is an infrastructure discipline, not just writing a good message.

## Pitfalls / Notes

- **No SPF/DKIM/DMARC** → spoofable domain + your legit mail flagged as spam.
- **Wrong/missing MX records** → mail can't be delivered to you.
- **Open relay** (misconfigured SMTP) → abused by spammers, blacklisted.
- **POP deleting server copies** → lost mail if a device dies.
- Email is **not private/encrypted by default** in transit end-to-end (TLS protects hops, but not like E2E encryption) — sensitive content needs additional encryption.
