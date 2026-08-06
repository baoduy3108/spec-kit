---
name: entity-resolution-and-deduplication
description: How to detect and merge duplicate or matching records/content — exact vs fuzzy matching, blocking to scale, similarity metrics (edit distance, token/embedding similarity), entity resolution across sources, and clustering related items (e.g. news stories). Use to dedupe records/articles, match entities across datasets, or cluster near-duplicate content.
category: engineering
keywords_vi: entity resolution deduplication, khử trùng lặp, ghép bản ghi trùng, exact vs fuzzy matching, blocking, edit distance token embedding similarity, gộp entity, gom cụm tin trùng
---

# Entity Resolution & Deduplication

Entity resolution (record linkage/dedup) is figuring out when **different records or pieces of content refer to the same thing** — the same person across databases, the same news story from many outlets, duplicate customer records — and merging them. It's essential wherever data comes from multiple sources (see news-aggregation-and-rss, media-monitoring-and-social-listening).

## The Problem

The "same" entity appears in **inconsistent** forms: "Bob Smith" vs "Robert Smith" vs "B. Smith"; the same event reported by 20 outlets with different headlines; a company listed as "Acme Inc." and "ACME Incorporated." Naive exact-matching misses these, leaving duplicates that inflate counts, clutter feeds, and fragment data. Entity resolution reconciles them.

## Matching: Exact vs Fuzzy

- **Exact matching** — same ID/URL/normalized key. Fast and certain when a reliable key exists (canonical URL, government ID). Always use it first where possible.
- **Fuzzy matching** — when there's no clean key, measure **similarity** and match above a threshold. Needed for messy real-world data. Similarity metrics:
  - **Edit distance** (Levenshtein) — character-level closeness (typos, spelling variants).
  - **Token/set similarity** (Jaccard, cosine over TF-IDF) — word overlap (reordered/partial names, article text).
  - **Phonetic** (Soundex/Metaphone) — names that sound alike.
  - **Semantic similarity** (embeddings — see vector-embeddings) — meaning-level match (two headlines about the same event with no shared words). Powerful for content dedup/clustering.

## Scaling: Blocking

Comparing every record to every other is **O(n²)** — infeasible for large data. **Blocking** (indexing) makes it tractable: group records into **blocks** by a cheap key (first letter, zip code, a hash/LSH bucket, a coarse token) so you only compare records **within** the same block — where matches are plausible. This slashes comparisons from billions to manageable. Good blocking (high recall, small blocks) is the key to scaling ER.

## Deciding & Merging

For candidate pairs, **decide** match/no-match: combine multiple field similarities into a score (rules or a trained classifier), with a threshold — and often a **review band** for uncertain cases. Then **merge**: link records into a single entity / cluster duplicates into one canonical item, keeping provenance (which sources contributed). For content, this is **clustering** related items into one "story" (see how-clustering-works).

## Where It's Used

- **News/content dedup** — collapse the same story from many sources into one (see news-aggregation-and-rss).
- **Data integration** — merge customer/product records across systems (a "golden record").
- **OSINT/monitoring** — recognize the same person/place/org across sources.
- Cleaning datasets before analysis.

## Pitfalls (in understanding/using)

- **Exact-only matching** on messy data → misses obvious duplicates (typos, variants).
- **No blocking** on large data → O(n²) blowup; block/index first.
- **Threshold too loose** → false merges (distinct entities combined — hard to undo); **too tight** → missed duplicates. Tune to error costs; keep a review band.
- Over-trusting a **single field** — combine multiple signals (name + location + context).
- **Losing provenance** when merging — track which sources/records fed each entity.
- Ignoring **transitivity** issues (A~B, B~C, but A≁C) — cluster carefully.
- Cultural/format variance in names/addresses/dates not normalized before matching.
