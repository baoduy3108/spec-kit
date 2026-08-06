---
name: lz77-and-dictionary-compression
description: How compressors shrink data by replacing repeated sequences with back-references — LZ77/LZ78 dictionary compression, the "find repeats" half of gzip/zstd/LZ4. Covers the sliding window, (distance,length) matches, why bigger windows find more repeats but cost memory/speed, preset dictionaries for many small files, and how LZ pairs with entropy coding. Use to understand DEFLATE, zstd, and the speed/ratio trade.
category: systems-internals
keywords_vi: nén từ điển lz77 lz78, thay chuỗi lặp bằng tham chiếu ngược, cửa sổ trượt sliding window, tham chiếu khoảng cách và độ dài distance length, từ điển nạp sẵn preset dictionary, lz kết hợp mã entropy huffman gzip zstd lz4
---

# LZ77 & Dictionary Compression

There are two independent ways data is redundant: **skewed symbol frequencies** (handled by entropy coding) and **repeated sequences** (the word "the" appears thousands of times; a log line's prefix repeats every entry). **Dictionary compression** — the **LZ** family (LZ77/LZ78 and descendants) — handles the second: it replaces a repeated sequence with a short **reference to an earlier occurrence**. This is the "find repeats" engine inside gzip/DEFLATE, zstd, LZ4, and Snappy (see huffman-and-entropy-coding, how-compression-works, prompt-caching-and-context-reuse).

## LZ77: The Sliding Window

LZ77 keeps a **sliding window** over recently-seen data (the "dictionary" = the last N bytes). As it scans forward, at each position it looks for the **longest match** between the upcoming bytes and something already in the window. When it finds a repeat, it emits a **back-reference**:

> `(distance, length)` — "copy `length` bytes starting `distance` bytes back"

plus literals for bytes with no useful match. Decoding just replays: copy literals, and for each reference copy from earlier in the already-decoded output. So `"abcabcabc"` becomes `abc` + a reference, and long repeated blocks collapse to a few bytes. LZ78/LZW instead build an explicit **dictionary of phrases** with indices (used by GIF/old `compress`), but the idea is the same: name repeats instead of repeating them.

## The Window-Size Trade-off

The **window size** determines how far back a repeat can be found:
- **Bigger window** → finds matches across more distance (great for large files with far-apart repeats) → **better ratio**, but more **memory** and **slower** search.
- **Smaller window** → faster, less memory, but misses distant repeats.

This is a core tuning axis (zstd's levels/`--long` mode, gzip's fixed 32KB window). LZ4/Snappy deliberately use fast, limited matching for **speed** over ratio; zstd offers a wide range.

## Preset Dictionaries (the small-file problem)

LZ needs to have **seen** data before it can reference it — so the **start** of a file (and **small** files) compress poorly, because the window is empty. **Preset/trained dictionaries** fix this: prime the window with a **shared dictionary** of common patterns (e.g. common JSON keys, HTTP headers) so even the first bytes of many small files find matches. zstd's dictionary training and Brotli's built-in web dictionary do exactly this — a big win for lots of small, similar payloads.

## LZ + Entropy Coding = Real Compressors

LZ finds repeats but its output (literals + references) still has skewed statistics. So real formats **pipeline** LZ **then** entropy coding: **DEFLATE/gzip** = LZ77 + Huffman; **zstd/Brotli** = LZ + entropy (FSE/ANS + Huffman). The two attack different redundancy; together they beat either alone.

## Design Guidance (for understanding/using)

- **Pick the algorithm for your speed/ratio need** — LZ4/Snappy for speed (logs, RPC), zstd for a great ratio/speed balance, gzip for ubiquity, xz/Brotli for max ratio.
- **Use a bigger window / higher level** for large files with distant repetition; expect more CPU/memory.
- **Train a dictionary** for many small similar payloads (zstd `--train`) — huge gains where per-file windows are empty.
- **Don't compress the incompressible** — random/encrypted/already-compressed data has no repeats to find.
- **Remember it's LZ + entropy** — the ratio comes from both stages.

## Pitfalls (in understanding/using)

- Expecting good ratios on **small files** without a preset dictionary → the window starts empty; little to reference.
- Maxing the window/level blindly → big CPU/memory cost for diminishing ratio gains.
- Compressing already-compressed data → no repeats left; wasted work.
- Confusing LZ (repeats) with Huffman (symbol skew) → they're complementary, used together.
- Assuming all "gzip-like" tools are equal → LZ4 vs zstd vs xz trade speed and ratio very differently.
