---
name: how-text-rendering-works
description: How text rendering works — glyphs and fonts (vector outlines), the pipeline from characters to pixels, shaping (mapping characters to glyphs, ligatures, complex scripts), rasterization, hinting, anti-aliasing and subpixel rendering. Use to understand font rendering, why text looks the way it does, glyph shaping, or complex-script/emoji rendering.
category: engineering
keywords_vi: text rendering hoạt động thế nào, hiển thị chữ font, glyph, shaping ligature, rasterization, hinting, anti-aliasing khử răng cưa, subpixel, vẽ chữ lên màn hình
---

# How Text Rendering Works

Turning a string of characters into pixels on a screen is surprisingly deep — it involves fonts, language rules, and pixel-level geometry. It's why the same text can look crisp or fuzzy, and why some scripts and emoji are hard to render correctly.

## Characters vs Glyphs (the key distinction)

- A **character** is an abstract unit of text (a Unicode code point, e.g. "a" or "ب"); see how-image-formats-work / encoding-and-unicode for how characters are stored.
- A **glyph** is a *visual shape* in a font. The mapping is **not** one-to-one: one character may need different glyphs by context, several characters may combine into one glyph (**ligatures**, like "fi"), and one character may be built from multiple glyphs. Text rendering is the process of choosing and placing the right glyphs.

## Fonts — vector outlines

Modern fonts (TrueType/OpenType) store each glyph as a **vector outline** (Bézier curves), not pixels — so they scale to any size. The font also carries metrics (advance width, kerning pairs) and tables for features (ligatures, alternates, hinting).

## The Pipeline

1. **Itemization** — split the text into runs of the same script/direction/font.
2. **Shaping** — the hard part: map characters → **positioned glyphs**, applying the font's rules. For Latin this is mostly 1:1 + kerning + ligatures. For **complex scripts** (Arabic letters change shape by position and join; Indic scripts reorder and form conjuncts; Thai stacks marks) shaping is essential and intricate — done by engines like HarfBuzz. **Bidirectional** text (Arabic/Hebrew mixed with Latin) also gets reordered here.
3. **Layout** — position glyphs into lines, break lines at allowed points, handle justification.
4. **Rasterization** — convert the vector outlines at the target size into a pixel coverage bitmap.

## Making Glyphs Look Good at Small Sizes

At screen resolutions, thin outlines fall between pixel boundaries and look jagged or blurry. Techniques fix this:
- **Anti-aliasing** — use gray levels to represent partial pixel coverage, smoothing edges (trades sharpness for smoothness).
- **Subpixel rendering** (ClearType) — exploit the R/G/B subpixel stripes of an LCD to triple horizontal resolution for text (colored fringing if misconfigured).
- **Hinting** — instructions (or an autohinter) that snap outlines to the pixel grid at small sizes for crispness. Less critical on high-DPI/Retina screens, where more pixels make hinting/subpixel tricks largely unnecessary.

## Color & Emoji

Emoji and colored glyphs use special font formats (color layers or embedded bitmaps/SVG), and a single emoji may be a **sequence** of code points joined by zero-width joiners (e.g. family emoji) that shaping must combine into one glyph — which is why unsupported combinations render as several separate emoji.

## Pitfalls (in understanding/using)

- Assuming **one character = one glyph** — breaks for ligatures, complex scripts, and emoji sequences (never index/reverse strings by bytes for display).
- Treating text width as `char_count × fixed_width` — real width needs shaping/kerning/font metrics.
- Ignoring **bidi and complex-script** shaping (mojibake, wrong joins) — use a real shaping engine, not naive glyph lookup.
- Blaming the font for blur that's really missing hinting/anti-aliasing config or a non-integer position.
- Forgetting fallback fonts — a glyph missing in one font must come from another (else the "tofu" □ box).
