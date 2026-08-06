---
name: encoding-and-unicode
description: Understand text encoding and Unicode to fix mojibake and length/comparison bugs — bytes vs characters, UTF-8 as the default, decode-at-input/encode-at-output, code points vs grapheme clusters, normalization (NFC/NFD), and base64 vs encoding. Use when text shows as garbage (Ã©, ), string length/emoji is wrong, or handling files/bytes/URLs.
category: engineering
keywords_vi: encoding, unicode, utf-8, mojibake, chữ bị lỗi font, ký tự lạ, mã hóa ký tự, độ dài chuỗi emoji sai, base64, giải mã văn bản
---

# Encoding & Unicode

Text is characters; storage/transmission is bytes. An **encoding** is the map between them. Almost every "garbage characters" bug is an encoding mismatch.

## The Model

- A **character set** (Unicode) assigns a number (code point) to each character. An **encoding** (UTF-8, UTF-16, Latin-1) turns code points into bytes.
- **UTF-8** is the default for the web and interchange: ASCII-compatible, variable width (1–4 bytes), handles every character. Use it everywhere unless forced otherwise.
- **Mojibake** (`Ã©` instead of `é`, `` boxes) = bytes decoded with the wrong encoding. The fix is to decode with the encoding they were actually *encoded* with.

## The One Rule

**Decode bytes → text at input; work in text; encode text → bytes at output.** Never guess halfway. Declare the encoding explicitly at every boundary: file `open(..., encoding="utf-8")`, HTTP `Content-Type: …; charset=utf-8`, database/column charset (`utf8mb4` in MySQL — plain `utf8` there is *not* full UTF-8), and your terminal/locale. A bug usually means one boundary assumed a different encoding.

## Length & Iteration Traps

- **Code point ≠ visible character.** An emoji or accented letter can be multiple code points (a "grapheme cluster"); `"👨‍👩‍👧".length` is not 1. Don't slice strings by byte/code-unit index if you might cut a character in half.
- **UTF-16 surrogate pairs** (JS/Java) make `.length` count code units, not characters — emoji count as 2. Iterate by code point (`for...of` in JS) or use a grapheme library for user-facing counts.
- **Normalization** — `é` can be one code point (NFC) or `e` + combining accent (NFD). Two visually identical strings can be unequal byte-wise. **Normalize (usually NFC) before comparing, hashing, or storing** — critical for search, dedup, and usernames.

## Related

- **Base64 is not encryption or a charset** — it's a way to represent arbitrary bytes in ASCII-safe text (email, data URIs, JSON binary). It grows data ~33%.
- **URL/percent-encoding** and **HTML entities** are separate escaping layers — decode/encode at the right layer; double-encoding (`%2520`) is a common bug.
- When in doubt, inspect the raw bytes (hex) to see what you actually have versus what you expected.
