---
name: osint-fundamentals
description: The fundamentals of open-source intelligence (OSINT) — gathering and analyzing publicly available information ethically and rigorously; source types, the intelligence cycle (planning, collection, processing, analysis, dissemination), verification, and legal/ethical limits. Use to understand OSINT, researching from public sources, monitoring, or investigating using open data responsibly.
category: engineering
keywords_vi: osint, tình báo nguồn mở, thu thập thông tin công khai, chu trình tình báo, xác minh nguồn, phân tích dữ liệu mở, giới hạn pháp lý đạo đức, điều tra công khai
---

# OSINT Fundamentals

OSINT (Open-Source Intelligence) is the practice of collecting and analyzing **publicly available information** to answer a question or monitor a situation — news, social media, public records, websites, data feeds. It's how journalists, analysts, and monitoring systems build a picture of events from open data, rigorously and ethically.

## What Counts as Open Source

Publicly accessible information: news and media, social media posts, government/public records, company filings, academic papers, websites and blogs, public APIs and datasets, maps/satellite imagery, forums. The defining trait is **public availability** — OSINT does **not** mean hacking, accessing private accounts, or deception to obtain non-public data. Staying within genuinely public sources is both the definition and the ethical line.

## The Intelligence Cycle

Good OSINT follows a disciplined cycle rather than random searching:
1. **Planning/direction** — define the **question** precisely. What do you actually need to know, and why? A sharp question focuses collection (vague goals → drowning in noise).
2. **Collection** — gather relevant information from appropriate sources, systematically.
3. **Processing** — organize, translate, de-duplicate, structure the raw material.
4. **Analysis** — turn information into **insight**: corroborate, find patterns, assess what it means, note gaps and uncertainty. This is the real value-add (data ≠ intelligence).
5. **Dissemination** — communicate findings clearly to whoever needs them, with confidence levels and caveats.
Then it loops — new findings raise new questions.

## Verification Is Everything

The core discipline: **don't trust a single source.** Corroborate claims across **multiple independent** sources, assess each source's **reliability** (see data-source-reliability) and possible bias/agenda, check timestamps and provenance, and be alert to **misinformation/disinformation** (deliberately false), manipulated media, and coordinated campaigns. Distinguish what you **know** (verified) from what's **reported/claimed** (unverified). State confidence honestly. In fast-moving events, initial reports are often wrong.

## Legal & Ethical Limits

OSINT power comes with responsibility:
- **Legality** — respect terms of service, copyright, privacy laws (GDPR and similar), and computer-misuse laws. Public availability ≠ unlimited permission to scrape/store/republish (see web-scraping-fundamentals).
- **Ethics** — avoid harm; be careful with personal data and individuals' privacy; don't enable harassment or doxxing. Just because data is findable doesn't mean aggregating it is harmless.
- **Objectivity** — guard against confirmation bias (seeking only what fits your hypothesis) and analytic traps (see critical-thinking).

## Pitfalls (in understanding/using)

- **Single-source trust** — believing one post/report without corroboration; verify across independent sources.
- **No clear question** — collecting endlessly with no focus → noise, not intelligence.
- Confusing **information with intelligence** — raw data needs analysis, corroboration, and context to be useful.
- **Confirmation bias** — cherry-picking evidence for a preferred conclusion.
- Crossing legal/ethical lines (private data, ToS/laws) under the "it's public" excuse.
- Ignoring **disinformation** and manipulated media in fast events; treat early reports skeptically.
- Not tracking **provenance/timestamps** — old or out-of-context content misread as current.
