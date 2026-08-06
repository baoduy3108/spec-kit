---
name: document-parsing-for-rag
description: How to parse and prepare documents for RAG/LLM ingestion — extracting clean text from PDFs/Office/HTML, handling tables, layout, images/OCR, and preserving structure; why messy extraction wrecks retrieval. Use to ingest documents into RAG, extract text from PDFs, handle tables/layout, or build a document-processing pipeline for an LLM.
category: ai-agent
keywords_vi: document parsing rag, phân tích tài liệu cho rag, trích xuất text pdf office html, xử lý bảng layout, ocr ảnh, giữ cấu trúc, ingest tài liệu vào llm
---

# Document Parsing for RAG

Before you can chunk, embed, and retrieve documents (see rag-fundamentals, rag-chunking-strategies), you must **extract clean, structured text** from them. This ingestion step is unglamorous but **make-or-break**: garbage extraction (jumbled text, lost tables, missing content) means garbage retrieval, no matter how good the rest of the pipeline is.

## Why It's Hard

Real documents are messy and diverse: **PDFs** (the worst — often just visually-positioned text with no logical structure, or scanned images), **Office** files (Word/Excel/PowerPoint), **HTML** (with nav/ads/boilerplate to strip), scanned images, and more. Extracting the **meaningful content** in the **right reading order** with **structure preserved** is genuinely difficult, especially for complex layouts.

## Key Challenges

- **PDFs** — text may extract out of order (multi-column read as one column), with broken words, or not at all (scanned/image PDFs need OCR). PDF is a *presentation* format, not a data format — there's often no reliable structure to recover.
- **Tables** — the hardest. Naive extraction turns a table into a jumble of numbers with no row/column relationships, making it meaningless (and un-retrievable for questions about specific cells). Tables need dedicated table-extraction that preserves structure (or converts to markdown/HTML the LLM can read).
- **Layout & reading order** — headers, footers, columns, sidebars, captions — get the logical flow right, and separate real content from repeated boilerplate.
- **Images/diagrams** — extract via **OCR** (scanned text) or describe with a vision model (charts/diagrams — see multimodal ideas). Alt text/captions matter.
- **Structure** — preserve **headings, sections, lists** so downstream chunking can respect them (see rag-chunking-strategies) and so citations can point to a section/page.
- **Encoding & cleanup** — fix character encoding (see encoding-and-unicode), de-hyphenate line breaks, remove artifacts.

## Approaches

- **Text extractors** (pdfplumber, PyMuPDF, Apache Tika, unstructured) — extract text/structure; quality varies by document.
- **Layout-aware / ML parsers** — models that understand document layout (tables, reading order) for complex/scanned docs — more accurate, more compute.
- **OCR** (Tesseract, cloud OCR) — for scanned/image content.
- **Vision-language models** — increasingly used to "read" complex pages (tables, diagrams) directly.
- **Preserve metadata** — capture source, page, section for each extracted piece (for chunking, filtering, and citations — see hallucination-mitigation).

## Garbage In, Garbage Out

The whole RAG pipeline rests on this step. Invest in extraction quality and **inspect the extracted text** on your real documents — bad ingestion is a top (and often overlooked) cause of poor RAG results. Match the parser to your document types, and evaluate.

## Pitfalls (in understanding/using)

- **Naive PDF text extraction** → jumbled reading order, broken words, lost content (especially multi-column/scanned) — use layout-aware parsing/OCR.
- **Destroying tables** into meaningless number soup → un-retrievable tabular data; use table-aware extraction (markdown/HTML tables).
- **Missing scanned/image** content (no OCR) → whole documents silently empty.
- **Keeping boilerplate** (headers/footers/nav/ads) → noise pollutes embeddings and retrieval.
- **Losing structure** (headings/sections) → worse chunking and no citation granularity.
- **Not inspecting** extracted output — assuming ingestion "just works"; it often doesn't. Verify on real docs.
- Encoding artifacts (mojibake, hyphenation) degrading text quality.
