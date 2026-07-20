---
name: data-source-reliability
description: How to assess the reliability of information sources — evaluating credibility, bias, and track record; primary vs secondary sources; corroboration; the admiralty/NATO reliability-credibility grading; and weighting sources in aggregation/monitoring. Use to judge source trustworthiness, rate sources, filter low-quality data, or weight sources in a monitoring system.
category: engineering
keywords_vi: data source reliability, độ tin cậy nguồn tin, đánh giá uy tín thiên kiến, nguồn sơ cấp thứ cấp, đối chiếu corroboration, thang đánh giá độ tin, xếp trọng số nguồn
---

# Data Source Reliability

Not all sources are equal. Whether you're doing OSINT (see osint-fundamentals), aggregating news (see news-aggregation-and-rss), or building a monitoring system, **assessing and weighting source reliability** is what separates signal from rumor. A confident claim from an unreliable source is worth little.

## Why It Matters

Treating every source as equally trustworthy means propagating misinformation, false alarms, and manipulation. Assigning **reliability** to sources lets you weight, filter, and corroborate — trusting established, accurate sources more and unverified/low-track-record ones less. This is core to any credible information system.

## Dimensions of Reliability

Evaluate a source along several axes:
- **Track record / accuracy** — how often has it been right? Reputable outlets with editorial standards and corrections vs anonymous/unaccountable ones.
- **Primary vs secondary** — a **primary** source (direct witness, original document, official statement) is stronger than a **secondary** one (reporting on the primary), which can distort. Get as close to the source as possible.
- **Bias / agenda** — does the source have a slant, incentive, or interest that shapes what it reports? Bias doesn't mean false, but factor it in (and read across the spectrum).
- **Transparency** — does it cite evidence, name authors, show its work? Verifiable claims beat unsourced assertions.
- **Expertise / authority** — is the source knowledgeable/positioned to know?
- **Recency & provenance** — is it current, and can you trace where the info originated (not recycled old/out-of-context content)?

## A Grading Framework

Intelligence practice (the **Admiralty/NATO system**) grades information on **two separate** axes:
- **Source reliability** (A–F: reliable → unreliable).
- **Information credibility** (1–6: confirmed → improbable).
Separating *who said it* from *how well it's corroborated* is a useful habit — a reliable source can report an unconfirmed rumor, and an unreliable source can occasionally be right. Rate both.

## Corroboration Is the Multiplier

The strongest signal isn't one great source — it's **multiple independent** sources agreeing (independent meaning not all copying one origin). Corroboration across independent sources raises credibility sharply; a claim from a single source (however reputable) stays "reported, unconfirmed." Beware **circular reporting** (many outlets citing the same single origin — that's one source, not many).

## Weighting in Systems

In an aggregation/monitoring pipeline, encode reliability as a **weight/score** per source: rank and filter content by it, require higher corroboration for low-trust sources before alerting (see event-detection-and-alerting), and surface source ratings to users. Continuously update ratings as track records evolve.

## Pitfalls (in understanding/using)

- Treating all sources as **equally credible** → amplifying rumors and misinformation.
- **Circular reporting** mistaken for corroboration — many outlets repeating one unverified origin is still one source.
- Confusing **reliability** (source track record) with **credibility** (how corroborated the specific claim is) — rate both.
- Trusting **secondary** reporting over available **primary** sources (distortion, telephone-game errors).
- Ignoring **bias/agenda** (or, conversely, dismissing a source entirely for bias when its facts check out).
- Not accounting for **manipulation** — fake/coordinated sources designed to look credible (see osint-fundamentals).
- Static ratings — a once-reliable source can decline (and vice versa); update over time.
