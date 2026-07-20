---
name: how-spam-filters-work
description: How spam filters work — from keyword rules to Bayesian probability (learning spammy vs ham words) to modern ML classifiers, plus signals beyond content (sender reputation, authentication SPF/DKIM/DMARC, blocklists, user feedback) and the adversarial arms race. Use to understand spam/content filtering, email deliverability, and why messages get flagged.
category: ai-agent
keywords_vi: bộ lọc spam hoạt động thế nào, spam filter, phân loại thư rác, bayesian spam, sender reputation, spf dkim dmarc, email vào spam, hiểu spam filter
---

# How Spam Filters Work

A spam filter is a **classifier** deciding "spam or not (ham)?" for each message. It evolved from crude rules to learning systems, and it's an ongoing arms race against adversaries.

## From Rules to Learning

- **Keyword/rule filters** (old) — flag messages with "spammy" words/patterns. Easily evaded (spammers change words: "v1agra") and cause false positives.
- **Bayesian filtering** (a classic breakthrough) — learn from examples: from a corpus of spam and ham, compute how much each word **shifts the probability** toward spam ("free", "viagra", "winner" → spammy; a friend's name → hammy). For a new message, combine the per-word probabilities (naive Bayes) to get an overall spam probability (see probability-and-bayes). It **learns and personalizes** (your spam looks different from mine) and adapts as you mark messages. Simple, effective, self-improving.
- **Modern ML** — richer classifiers and neural models over many features, continuously trained on massive labeled data (and your "mark as spam" clicks).

## Signals Beyond Content

Content is only part of it. Big providers weigh:
- **Sender reputation** — the sending IP/domain's history; a domain that blasts spam gets a bad reputation and lands in spam (see email-marketing).
- **Authentication** — **SPF, DKIM, DMARC** verify the sender is who they claim; failing these is a strong spam/phishing signal. (Setting these up correctly is essential for *your* email to reach inboxes.)
- **Blocklists (RBLs)** — known-bad IPs/domains.
- **Engagement signals** — do recipients open, reply, or delete-without-reading / mark-spam? Low engagement and many spam-marks tank deliverability.
- **Structural signals** — spammy links, image-only emails, mismatched headers, urgency/phishing patterns.

## The Arms Race

Spammers adapt to every filter (obfuscated words, image text, hijacked reputable accounts, personalization), so filters must keep learning — it's **adversarial** and never "solved." User feedback (marking spam/not-spam) continuously retrains the system.

## Why It Matters

Explains both sides: **why messages get flagged** (content probability + poor sender reputation + failed auth + low engagement), and — critically for anyone sending email — **how to stay out of spam**: authenticate (SPF/DKIM/DMARC), build sender reputation, avoid spammy content/patterns, keep engagement high, honor unsubscribes, and never use bought lists (see email-marketing). The same classifier ideas power broader content moderation and phishing detection.

## Pitfalls / Notes

- **False positives** — legitimate mail flagged (why important senders get whitelisted, and why aggressive filtering annoys users).
- **Sending mail without SPF/DKIM/DMARC** → straight to spam.
- **Poor sender reputation** (spammy history, complaints) is hard to recover.
- Adversaries evolving → no permanent solution; filters must keep learning.
- Over-reliance on keywords → easily evaded and error-prone.
