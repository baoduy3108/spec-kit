---
name: inverted-index-and-full-text-search
description: The data structure behind every search engine — the inverted index — mapping each term to the list of documents containing it (postings), so a query looks up terms instead of scanning documents. Covers the text-analysis pipeline (tokenize, normalize, stem), postings lists with positions, boolean/phrase queries via list intersection, and why this makes search fast. Use to understand Lucene/Elasticsearch, full-text search, and why LIKE '%x%' doesn't scale.
category: databases
keywords_vi: chỉ mục ngược inverted index ánh xạ mỗi từ tới danh sách tài liệu chứa nó, danh sách postings tra từ thay vì quét tài liệu, đường ống phân tích văn bản tokenize chuẩn hoá stemming, truy vấn boolean và cụm từ bằng giao danh sách postings, vị trí position cho tìm cụm từ, like phần trăm không mở rộng lucene elasticsearch
---

# Inverted Index & Full-Text Search

Searching text by scanning every document (`WHERE body LIKE '%term%'`) is **O(total text)** per query — hopeless at scale. Search engines invert the problem with an **inverted index**: instead of "document → its words", they store "**word → the documents that contain it**". A query then becomes a few **lookups**, not a scan. This one structure powers Lucene, Elasticsearch, Solr, and every web search engine (see how-search-engines-work, tf-idf-and-bm25-ranking, text-analysis-tokenization-and-stemming).

## The Structure

For each **term**, the index stores a **postings list** — the ids of documents containing that term (often with extra data):
```
"database" → [doc3, doc7, doc12, doc50, ...]
"index"    → [doc7, doc12, doc99, ...]
```
Terms are kept in a sorted **dictionary/term index** (often an FST or B-tree) for fast lookup. Postings frequently also store, per document, the **term frequency** (how many times it appears — for ranking) and **positions** (where it appears — for phrase queries), plus offsets for highlighting.

## Building It: The Analysis Pipeline

Raw text isn't indexed directly; it goes through **analysis** first (both at index time and query time, and they must **match**):
1. **Tokenize** — split text into terms (words), handling punctuation, CJK, etc.
2. **Normalize** — lowercase, strip accents, unify equivalents so `Café` matches `cafe`.
3. **Stem / lemmatize** — reduce to root forms so `running`/`ran`/`runs` all match `run`.
4. **Stop-word / synonym handling** — optionally drop ultra-common words or expand synonyms.

The output terms are what actually go into the index (see the analysis skill for detail). Mismatched index-time vs query-time analysis is a classic "why doesn't my search match?" bug.

## Answering Queries by Intersecting Lists

- **Boolean AND** (`database AND index`) → **intersect** the two postings lists (both sorted, so a linear merge) → docs in both. **OR** → union; **NOT** → difference.
- **Phrase query** (`"database index"`) → intersect docs, then check the stored **positions** are adjacent/in order.
- Because postings are **sorted by doc id**, intersection/union is a fast merge, and skip pointers let you jump ahead — sublinear in practice.

The matching set is then **ranked** (TF-IDF/BM25) so the best documents surface first — retrieval and ranking are separate stages.

## Why It Scales (and LIKE doesn't)

The inverted index turns "find documents containing X" into a **dictionary lookup + list merge**, independent of the total corpus size for the terms not queried. `LIKE '%x%'` can't use a normal index (leading wildcard) and scans everything. This is also why full-text search is a **separate system/index** from your row store, and the conceptual cousin of how vector search enables semantic retrieval.

## Design Guidance (for understanding/using)

- **Use a real full-text engine/index** (Lucene/Elasticsearch/Postgres `tsvector`/SQLite FTS) for text search — not `LIKE`.
- **Keep index-time and query-time analysis consistent** — same tokenizer/normalizer/stemmer, or matches silently fail.
- **Store positions only if you need phrase/proximity** — they enlarge the index.
- **Separate retrieval from ranking** — the index finds candidates; a ranking function (BM25) orders them.
- **Design analysis for your language/domain** — stemming, synonyms, and stop words hugely affect recall/precision.

## Pitfalls (in understanding/using)

- Using `LIKE '%term%'` for search → full scans; doesn't scale and can't rank.
- **Mismatched analysis** between indexing and querying → correct docs don't match (e.g. one stems, the other doesn't).
- Forgetting **positions** yet expecting **phrase** queries to work.
- Treating retrieval as ranking → an inverted index finds matches; you still need BM25/TF-IDF to order them.
- Over-aggressive stemming/stop-words → hurts precision (matches too much) or recall (drops meaningful terms).
