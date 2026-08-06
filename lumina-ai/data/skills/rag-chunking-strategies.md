---
name: rag-chunking-strategies
description: How to chunk documents for RAG — why chunk size and boundaries make or break retrieval, fixed vs recursive vs semantic chunking, overlap, respecting structure (headings/tables/code), metadata, and matching chunking to the embedding model. Use to improve RAG retrieval quality, choose a chunking strategy, or fix RAG returning irrelevant/truncated context.
category: ai-agent
keywords_vi: rag chunking, chia nhỏ tài liệu cho rag, kích thước chunk ranh giới, fixed recursive semantic chunking, overlap chồng lấn, tôn trọng cấu trúc heading table, metadata, chất lượng truy xuất
---

# RAG Chunking Strategies

In RAG (see rag-fundamentals), you split documents into **chunks**, embed each, and retrieve the most relevant ones for a query. **How you chunk is one of the biggest levers on RAG quality** — poor chunking means retrieving irrelevant, truncated, or context-less passages, no matter how good your model is.

## Why Chunk Size Matters

There's a fundamental tension:
- **Chunks too large** — each embedding blurs many topics together, so retrieval is imprecise (a chunk matches loosely), and you waste context-window space on irrelevant surrounding text.
- **Chunks too small** — each is precise but lacks **context**; a fragment retrieved without its surrounding meaning is unusable ("the rate increased" — what rate?), and the answer may span multiple tiny chunks that don't all get retrieved.
The sweet spot balances **retrieval precision** against **enough self-contained context** — often a few hundred tokens, but it depends on content and the embedding model's optimal input size.

## Chunking Approaches

- **Fixed-size** — split every N tokens/characters. Simple, but blindly cuts mid-sentence/mid-idea, destroying meaning at boundaries.
- **Recursive / structure-aware** — split along natural boundaries in order (paragraphs → sentences), keeping chunks under a size limit without cutting mid-thought. A strong default.
- **Semantic chunking** — split where the **topic shifts** (using embedding similarity between sentences), so each chunk is one coherent idea. Higher quality, more compute.
- **Document-structure-aware** — respect the document's real structure: keep **headings** with their sections, don't split **tables/lists/code blocks**, keep Q&A pairs together. Structure carries meaning — preserve it.

## Overlap

Add **overlap** between adjacent chunks (e.g. repeat the last sentence or two of the previous chunk at the start of the next) so an idea straddling a boundary isn't lost from both chunks. A little overlap markedly improves recall; too much bloats the index redundantly.

## Metadata & Context

Attach **metadata** to each chunk (source, title, section heading, page, date) — used for filtering (see how-vector-databases-work), citations (see hallucination-mitigation), and freshness. Some systems **prepend context** to each chunk (the doc title/section, or an LLM-generated summary of where it sits) so a retrieved fragment carries its context — big quality gains ("contextual retrieval").

## Match the Model

Chunk with your **embedding model's** ideal input length in mind (models have optimal/max token ranges), and evaluate on **your** data (see rag-evaluation) — there's no universal best; the right chunking depends on document type (dense prose vs code vs tables vs chat logs).

## Pitfalls (in understanding/using)

- **Fixed-size splitting** cutting mid-sentence/idea → meaningless chunk boundaries; use recursive/structure-aware.
- **Chunks too big** (imprecise retrieval) or **too small** (no context) — tune to your content and model.
- **No overlap** → ideas spanning boundaries lost.
- **Ignoring document structure** — splitting tables/code/lists or orphaning content from its heading.
- **No metadata** → can't filter, cite, or judge freshness.
- Retrieved fragments **lacking context** — prepend section/title context or use larger retrieval + smaller embedding units.
- **Not evaluating** — assuming a default works; measure retrieval quality on your data (see rag-evaluation).
