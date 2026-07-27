---
name: layout-preserving-document-translation
description: Translating a PDF/document into another language while keeping the original layout — columns, tables, figures, page breaks — and NOT translating formulas, code, or identifiers. Covers extracting text with position/structure (OCR for scans), segmenting into translatable vs protected spans, translating with terminology consistency, and re-rendering translated text back into the original layout (handling text-expansion overflow). Use to translate a PDF keeping formatting, protect math/code during translation, or build a layout-aware document translator.
category: nlp
keywords_vi: dịch pdf, giữ nguyên bố cục, bảo toàn công thức, ocr trích xuất kèm vị trí, phân đoạn phần dịch và phần giữ nguyên, tái dựng bản dịch vào layout gốc, tràn chữ khi dịch
---

# Layout-Preserving Document Translation

Naively translating a PDF ("extract all text → translate → dump") destroys the thing that made it a document: the **columns, tables, figures, headings, and page layout** vanish, and it happily mistranslates **formulas, code, and identifiers** into garbage. Layout-preserving translation keeps the document **looking like itself** in the new language and **protects the content that must not change** (see how-machine-translation-works, document-parsing-for-rag, i18n-and-localization).

## Two Non-Negotiables

1. **Preserve layout** — the reader should get the same document, just in another language: same two-column flow, same table cells, same figure captions, same page structure.
2. **Protect the un-translatable** — **math formulas**, **code blocks**, **variable/identifier names**, URLs, and often proper nouns must pass through **untouched**. Translating `for i in range(n)` or `E = mc²` corrupts meaning.

## The Pipeline

**1. Extract with structure (not just text).** Pull text **with its position and role** — bounding boxes, reading order, block type (heading/paragraph/table cell/caption). Digital PDFs expose this; **scanned** pages need **OCR**, which adds noise you must **normalize** (dehyphenate line-wrapped words, fix broken ligatures, rejoin paragraphs split across lines/columns). Getting reading order and block roles right here is the foundation — everything downstream depends on it.

**2. Segment: translatable vs protected.** Classify spans. **Prose** → translate. **Formulas / code / identifiers / URLs** → mark **protected** and replace with **placeholders** so the translator never sees them as words. Getting this boundary right is the core correctness problem — over-protect and you leave prose untranslated; under-protect and you corrupt code/math.

**3. Translate with consistency.** Translate the prose segments, enforcing **terminology consistency** (a glossary so the same term maps the same way throughout — critical in technical docs) and passing the placeholders through verbatim.

**4. Re-render into the original layout.** Put translated text **back into the same blocks/boxes**, restore the protected spans, and **handle text expansion**: translations are often longer (e.g. EN→DE/VI can grow 20–40%), so text can **overflow** its box — reflow, shrink, or expand the region rather than let it clip. Rebuild tables/columns/figures in place.

## Why Each Step Is Hard

- **Extraction** — reading order across columns and table structure is where most tools fail silently.
- **OCR noise** — scanned inputs need cleanup or you translate garbage.
- **Segmentation** — the translatable/protected boundary is subtle (inline code in a sentence, a variable named like a real word).
- **Re-rendering + expansion** — fitting longer text back into fixed layout without clipping is the visible-quality step.

## Design Guidance

- **Extract structure, not a text blob** — capture position, reading order, block roles.
- **OCR + normalize** for scans before anything else.
- **Placeholder-protect** formulas/code/identifiers/URLs so they survive translation.
- **Enforce a glossary** for consistent terminology across the whole document.
- **Plan for text expansion** — reflow/resize so translated text doesn't clip.
- **Re-render into original blocks** — tables, columns, captions in place.
- **Human-review** technical/legal output — layout-perfect ≠ meaning-perfect.

## Pitfalls (in understanding/using)

- **Flatten to plain text** → layout, tables, and figures are lost.
- **Translating formulas/code/identifiers** → corrupted math and broken code.
- Ignoring **reading order** in multi-column pages → scrambled sentences.
- Skipping **OCR normalization** → hyphenated/split words mistranslated.
- No **terminology control** → the same term rendered five different ways.
- Forgetting **text expansion** → translated text overflows/clips its boxes.
