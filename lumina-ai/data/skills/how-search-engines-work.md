---
name: how-search-engines-work
description: How a search engine works — crawling, building an inverted index, tokenization/normalization, and ranking with TF-IDF/BM25 plus signals like links and freshness. Use to understand full-text search, why an inverted index is fast, and how relevance ranking works (applies to web search and to search inside an app with Elasticsearch/Lucene).
category: engineering
keywords_vi: search engine hoạt động thế nào, công cụ tìm kiếm, inverted index, tf-idf bm25, xếp hạng relevance, full-text search, elasticsearch lucene, hiểu tìm kiếm sâu
---

# How Search Engines Work

Search is two problems: find documents containing the terms fast, and rank them by relevance.

## Crawling & Indexing

- **Crawl/ingest** — gather documents (web crawler following links, or your app's records).
- **Tokenize & normalize** — split text into terms, lowercase, remove/stem variants (running → run), drop stop words. The same pipeline runs on documents *and* queries so they match.
- **Inverted index** — the key data structure: a map from **term → list of documents (postings) containing it** (plus positions/frequencies). This is the inverse of "document → its words," and it's why search is fast: to find docs with "cat" you read one postings list, not scan every document. Intersecting postings lists answers multi-term queries.

## Ranking (relevance)

Matching isn't enough — you must order results:
- **TF-IDF** — a term matters more if it's *frequent in this document* (term frequency) but *rare across all documents* (inverse document frequency). A common word like "the" gets ~zero weight; a distinctive term ranks the docs that feature it.
- **BM25** — the modern refinement of TF-IDF (with saturation and length normalization) used by Lucene/Elasticsearch; the practical default.
- **Additional signals** — for web search, link authority (PageRank-style), freshness, click behavior, location; for app search, business rules and recency. Final ranking blends the text score with these signals.

## Beyond Keywords

- **Phrase/proximity** search uses stored term **positions**.
- **Semantic/vector search** embeds text into vectors and finds nearest neighbors by meaning (handles synonyms/paraphrase) — increasingly combined with keyword search ("hybrid") for the best of both.
- **Facets/filters** narrow within results; **autocomplete** uses prefix indexes.

Understanding the inverted index explains why search scales, why analysis (tokenization/stemming) settings make or break recall, and why relevance tuning (BM25 params, boosting fields) is its own craft.
