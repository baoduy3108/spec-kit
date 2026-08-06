---
name: text-analysis-tokenization-and-stemming
description: The text-processing pipeline that decides what a search engine can match — analysis — turning raw text into index terms via tokenization, normalization (lowercase, accents), stemming/lemmatization, stop-word and synonym handling. Use to understand why index-time and query-time analysis must match, why over/under-stemming hurts, language-specific tokenization (CJK), and why "my search doesn't find obvious matches" is usually an analysis bug.
category: databases
keywords_vi: phân tích văn bản tokenization tách token và stemming cho tìm kiếm, chuẩn hoá lowercase bỏ dấu accent hợp nhất dạng tương đương, stemming và lemmatization đưa từ về gốc, xử lý stop-word và từ đồng nghĩa synonym, phân tích lúc lập chỉ mục và lúc truy vấn phải khớp, tách từ ngôn ngữ cjk không có khoảng trắng
---

# Text Analysis: Tokenization & Stemming

Between raw text and a searchable index sits **analysis** — the pipeline that converts a string into the **terms** that actually get indexed and matched. Analysis quietly decides *everything* about what a search can find: get it wrong and obvious matches silently fail; get it right and users find what they mean. It's the most common source of "why doesn't my search work?" bugs (see inverted-index-and-full-text-search, tf-idf-and-bm25-ranking, how-tokenizers-work).

## The Pipeline

Analysis is a sequence of transforms applied to text:
1. **Character filtering** — strip HTML, normalize Unicode (NFC), map characters.
2. **Tokenization** — split the stream into **tokens** (usually words). Harder than it looks: hyphens, apostrophes (`don't`), URLs/emails, numbers, and especially **languages without spaces** (Chinese/Japanese/Korean/Thai need dictionary- or model-based segmentation, not whitespace splitting).
3. **Normalization** — **lowercase**, **remove accents/diacritics** (`Café`→`cafe`), fold equivalent forms so cosmetic differences don't block matches.
4. **Stop-word handling** — optionally drop ultra-common words (`the`, `is`, `of`) that add little and bloat postings — though modern BM25 handles them via low IDF, so aggressive removal is less common now.
5. **Stemming / Lemmatization** — reduce words to a root so variants match:
   - **Stemming** (Porter/Snowball) — crude rule-based truncation: `running/runs/ran`→`run`, `fishing/fisher`→`fish`. Fast, language-specific, sometimes wrong.
   - **Lemmatization** — dictionary/POS-based reduction to the real base form (`better`→`good`, `mice`→`mouse`). More accurate, more expensive.
6. **Synonyms** — optionally expand (`car`↔`automobile`) at index or query time.

The tokens that survive this pipeline are what live in the inverted index.

## The Cardinal Rule: Index-Time and Query-Time Analysis Must Match

The **same** analysis (or deliberately compatible analysis) must run when **indexing** documents and when **parsing the query**. If documents are lowercased and stemmed but the query isn't, `Running` won't find indexed `run`. The vast majority of "search misses obvious matches" bugs are an **analyzer mismatch** — a different tokenizer, a stemmer on one side only, or accent folding applied inconsistently. (Deliberate asymmetry exists — e.g. synonym expansion at query time only — but it must be intentional.)

## Over- and Under-Stemming

Stemming trades precision for recall, and both extremes hurt:
- **Over-stemming** — merges words that **shouldn't** match (`university` and `universe` → `univers`), so searches return irrelevant results (**precision** drops).
- **Under-stemming** — fails to merge words that **should** match (`ran` not reduced to `run`), so relevant docs are missed (**recall** drops).
Tuning the stemmer/lemmatizer per language and domain is a real relevance lever.

## Design Guidance (for understanding/using)

- **Use the same analyzer at index and query time** (unless intentionally asymmetric) — the #1 correctness rule.
- **Pick language-appropriate analysis** — CJK needs real segmentation; each language needs its own stemmer/stop-words.
- **Choose stemming vs lemmatization** by need — stemming for speed/recall, lemmatization for precision.
- **Normalize consistently** — lowercase + accent folding so cosmetic differences don't block matches.
- **Test recall AND precision** — verify obvious matches are found *and* that stemming isn't over-merging.

## Pitfalls (in understanding/using)

- **Mismatched** index vs query analyzers → obvious matches silently fail (the classic bug).
- Whitespace tokenization for **CJK/Thai** → wrong or no tokens; needs segmentation.
- **Over-stemming** → irrelevant results (`universe`≈`university`); **under-stemming** → missed matches.
- Forgetting **accent/case** normalization → `Café` ≠ `cafe`.
- Assuming the LLM/tokenizer sense of "tokenization" applies → **search** analysis (stemming, stop-words, language rules) is a different pipeline than subword LLM tokenization.
