---
name: email-deliverability
description: Email deliverability — getting mail into the inbox instead of spam via sender reputation, authentication, IP/domain warm-up, list hygiene, engagement signals, and avoiding spam triggers. Use to fix emails going to spam, improve inbox placement, warm up a sending domain/IP, or understand deliverability.
category: engineering
keywords_vi: email deliverability, khả năng vào inbox, danh tiếng người gửi reputation, warm-up ip domain, vệ sinh danh sách list hygiene, tín hiệu tương tác, tránh vào spam
---

# Email Deliverability

Deliverability is the art of getting your email into the **inbox** rather than the **spam folder** (or blocked entirely). Sending an email is easy; getting it *delivered and seen* is not — mailbox providers (Gmail, Outlook) run aggressive filters, and your **reputation** decides your fate. This is a reputation-and-engagement game, not just a technical one (see how-spf-dkim-dmarc-work, how-email-works).

## Deliverability ≠ Delivered

A message can be "accepted" by the receiving server yet silently **filtered into spam** — that's a deliverability failure even though sending "succeeded." The goal is **inbox placement**, which mailbox providers grant based on whether they **trust you** and whether recipients **want** your mail.

## The Pillars

- **Authentication** — SPF, DKIM, and DMARC (see how-spf-dkim-dmarc-work) are table stakes. Unauthenticated mail is heavily penalized; Gmail/Yahoo now *require* it for bulk senders.
- **Sender reputation** — providers score your **sending domain and IP** based on history: spam complaints, bounces, spam-trap hits, and engagement. Good reputation → inbox; bad → spam/block. Reputation is the single biggest factor.
- **Engagement** — modern filters watch whether recipients **open, reply, and don't delete-without-reading** or mark spam. High engagement signals "wanted mail" → inbox. Low engagement drags you down.
- **List hygiene** — sending to **invalid, stale, or unconsented** addresses generates bounces and spam-trap hits that wreck reputation. Clean your list.
- **Content** — spammy patterns (misleading subjects, all-caps, link shorteners, image-only mail, bad HTML) trigger filters.
- **Infrastructure** — dedicated vs shared IP, proper reverse DNS, consistent sending domain.

## IP / Domain Warm-up

A **brand-new** sending IP or domain has **no reputation** — blasting high volume from it looks exactly like a spammer and gets you filtered/blocked. **Warm-up**: start with **low volume to your most engaged recipients**, then **gradually increase** over days/weeks. This builds a positive sending history so providers learn to trust you. Skipping warm-up is a classic way to tank a new domain.

## List Hygiene and Consent

- **Permission** — only mail people who **opted in** (double opt-in is safest). Unsolicited mail generates complaints that poison reputation.
- **Remove bounces** — hard bounces (invalid addresses) must be suppressed immediately; repeatedly hitting them signals a bad list.
- **Prune the unengaged** — recipients who never open in months hurt engagement metrics; sunset or re-permission them.
- **Avoid spam traps** — recycled/pristine trap addresses on old or purchased lists are reputation poison. Never buy lists.
- **Easy unsubscribe** — a working one-click unsubscribe; people marking spam because they can't unsubscribe is far worse than a lost subscriber.

## Design Guidance

- **Authenticate** (SPF/DKIM/DMARC) before anything else.
- **Warm up** new IPs/domains gradually.
- **Separate streams** — send transactional (high-trust) and marketing mail from different subdomains so marketing issues don't poison transactional deliverability.
- **Monitor** — track bounce rate, complaint rate, and use Google Postmaster Tools / feedback loops.
- **Honor unsubscribes** instantly and make them easy.
- **Send wanted mail** — the best deliverability strategy is content people actually engage with.

## Pitfalls (in understanding/using)

- Thinking "the send succeeded" means **delivered** → it may be in spam; measure inbox placement.
- **No warm-up** on a new IP/domain → high volume from a cold sender gets filtered/blocked.
- **Buying/scraping lists** → spam traps and complaints destroy reputation fast.
- Ignoring **bounces/complaints** → repeatedly mailing bad addresses tanks your score.
- Mixing **marketing and transactional** on one domain → a marketing complaint spike hurts your password-reset emails.
- Missing **authentication** → bulk mail to Gmail/Yahoo now gets rejected outright.
- Chasing "spam word" myths while ignoring **reputation and engagement**, which matter far more than trigger words.
