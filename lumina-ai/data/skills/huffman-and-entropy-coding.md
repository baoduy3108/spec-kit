---
name: huffman-and-entropy-coding
description: How lossless compression assigns short codes to common symbols and long codes to rare ones — entropy coding, the core of Huffman coding. Covers Shannon entropy as the compression limit, prefix-free codes, why frequency-based variable-length coding beats fixed-width, and where Huffman sits vs arithmetic coding. Use to understand why text compresses, the theoretical limit, and how gzip/JPEG use Huffman.
category: systems-internals
keywords_vi: mã hoá entropy gán mã ngắn cho ký hiệu hay gặp mã dài cho hiếm, mã huffman xây cây theo tần suất, entropy shannon là giới hạn nén lý thuyết, mã tiền tố prefix-free giải mã không nhập nhằng, mã độ dài biến đổi thắng mã cố định, gzip jpeg dùng huffman
---

# Huffman & Entropy Coding

Why does text compress but random noise doesn't? Because real data is **not uniformly random** — some symbols appear far more often than others (in English, `e` and space dwarf `z` and `q`). **Entropy coding** exploits this by giving **frequent symbols short codes and rare symbols long codes**, so the *average* code length shrinks. **Huffman coding** is the classic algorithm that builds the optimal such code, and it's a building block inside gzip, PNG, JPEG, and MP3 (see how-compression-works, lz77-and-dictionary-compression, arithmetic-and-range-coding).

## The Limit: Shannon Entropy

Information theory says there's a hard floor. The **entropy** `H = −Σ pᵢ log₂ pᵢ` (bits per symbol) is the **minimum average bits** needed to encode symbols with probabilities `pᵢ`. A predictable source (skewed probabilities) has **low** entropy → compresses a lot; a uniform-random source has **maximum** entropy → **can't** be compressed (this is why already-compressed/encrypted data won't shrink further). Entropy coders aim to reach this limit; you can't beat it losslessly.

## Prefix-Free (Instantaneous) Codes

Variable-length codes need one property to be decodable: **no code is a prefix of another** (prefix-free / prefix code). Then a decoder reading a bit stream always knows where one symbol ends — no delimiters needed, no ambiguity. E.g. if `e`=`0`, no other symbol's code may start with `0`. Prefix-free codes correspond to leaves of a binary tree, which is exactly what Huffman builds.

## How Huffman Builds the Optimal Tree

1. Count symbol **frequencies**.
2. Put each symbol as a leaf node with its frequency.
3. Repeatedly **merge the two lowest-frequency** nodes into a parent whose frequency is their sum (a greedy step).
4. Continue until one tree remains. Left/right edges = bit `0`/`1`; each symbol's code = the path from root to its leaf.

The greedy merge guarantees the **shortest average code length** for a symbol-by-symbol code. Frequent symbols end up near the root (short codes), rare ones deep (long codes). The decoder walks the same tree bit by bit.

## Huffman's Limit (and why arithmetic coding exists)

Huffman assigns each symbol a **whole number of bits** — but the ideal length is `−log₂ p`, often **fractional**. If a symbol has probability 0.9, its ideal code is ~0.15 bits, yet Huffman must spend at least **1** bit. So Huffman is optimal *among integer-length codes* but leaves efficiency on the table for highly skewed distributions. **Arithmetic/range coding** (and modern **ANS**) encode fractional bits and get closer to entropy — at more complexity (see arithmetic-and-range-coding). Real formats often combine LZ (find repeats) + Huffman/entropy coding (compress the symbols).

## Design Guidance (for understanding/using)

- **Entropy is the floor** — you can't losslessly compress below it; don't expect random/encrypted/already-compressed data to shrink.
- **Compression works because data is skewed/redundant** — the more predictable, the smaller.
- **Huffman is great and simple**; for maximum ratio on skewed data, arithmetic/ANS coding does better (fractional bits).
- **Combine techniques** — LZ77 for repeats then Huffman for symbols (DEFLATE/gzip) is the workhorse.
- **Don't double-compress** — compressing already-compressed data wastes CPU for ~nothing (entropy is already near max).

## Pitfalls (in understanding/using)

- Expecting **any** data to compress → high-entropy data (random/encrypted) can't shrink losslessly.
- Thinking Huffman is always optimal → it's optimal among **integer-bit** codes; loses to arithmetic coding on skewed data.
- Forgetting codes must be **prefix-free** → otherwise the stream is ambiguous to decode.
- Re-compressing compressed files → near-zero gain, wasted CPU.
- Confusing entropy coding (skew) with LZ (repeats) — real compressors use **both**.
