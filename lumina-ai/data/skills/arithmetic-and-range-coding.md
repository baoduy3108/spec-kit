---
name: arithmetic-and-range-coding
description: How compressors encode symbols in FRACTIONAL bits to beat Huffman's whole-bit limit — arithmetic coding, range coding, and modern ANS. Covers representing a whole message as one number in [0,1) subdivided by symbol probabilities, why it approaches entropy exactly, the role of the probability model, and why ANS (zstd) gives arithmetic-level ratios at Huffman-level speed. Use to understand state-of-the-art entropy coding.
category: systems-internals
keywords_vi: mã hoá số học arithmetic coding mã hoá bằng số bit phân số, vượt giới hạn số bit nguyên của huffman, biểu diễn cả thông điệp thành một số trong khoảng chia theo xác suất, tiệm cận entropy chính xác nhất, mô hình xác suất dẫn động bộ mã, ans asymmetric numeral systems zstd nhanh như huffman
---

# Arithmetic & Range Coding

Huffman coding is optimal *among codes that spend a whole number of bits per symbol* — but the information-theoretic ideal is `−log₂ p` bits, which is usually **fractional**. For a symbol with probability 0.9, Huffman must spend ≥1 bit where the ideal is ~0.15. **Arithmetic coding** (and its practical cousin **range coding**, and the modern **ANS**) break the whole-bit barrier by encoding symbols in **fractional bits**, approaching the entropy limit almost exactly — the basis of the highest-ratio compressors and codecs (see huffman-and-entropy-coding, lz77-and-dictionary-compression, how-compression-works).

## The Core Idea: One Number for the Whole Message

Instead of a code per symbol, arithmetic coding represents the **entire message as a single number** in the interval **[0, 1)**:
1. Start with the interval `[0, 1)`.
2. Subdivide it into sub-intervals whose **widths equal the symbols' probabilities**.
3. The first symbol **selects** its sub-interval; that becomes the new current interval.
4. Recurse: subdivide the *current* interval by the probabilities for the next symbol, select again.
5. After all symbols, output any number inside the final (tiny) interval.

A more probable symbol keeps the interval **wide** (cheap — few bits to specify), a rare symbol shrinks it sharply (expensive). The number of bits to pin down the final interval ≈ `Σ −log₂ pᵢ` = the message entropy. So the **average cost per symbol reaches the fractional ideal**, which Huffman cannot. **Range coding** is a practically equivalent integer-arithmetic reformulation that avoids infinite precision and patent issues.

## The Model Matters as Much as the Coder

Arithmetic coding just turns **probabilities into bits** optimally — the compression ratio depends on the **probability model** feeding it. A better predictor (context model, adaptive counts, PPM, or a neural model) gives sharper probabilities → smaller output. This decoupling — **model** (predict the next symbol) + **coder** (encode it in ideal bits) — is why the best compressors (PAQ, cmix) pair strong models with arithmetic coding, and why LLMs-as-predictors can compress text remarkably well.

## ANS: The Modern Winner

Classic arithmetic coding is **slow** (per-symbol multiply/renormalize), which historically pushed people back to Huffman for speed. **Asymmetric Numeral Systems (ANS)** (Duda, ~2014) achieves **arithmetic-coding-level ratios at Huffman-level speed** by encoding into a single evolving integer **state** with table-driven operations. This is why **zstd** (FSE = table ANS), **Brotli**, LZFSE, and modern codecs adopted ANS — you no longer trade ratio for speed. It's arguably the most important compression advance of the last decade.

## Design Guidance (for understanding/using)

- **Use arithmetic/ANS-based tools** (zstd, Brotli, xz) when you want ratios close to the entropy limit; they beat pure-Huffman formats.
- **Improve the model to improve compression** — the coder is optimal; sharper predictions shrink output.
- **Reach for ANS (zstd/FSE)** when you want top ratio *and* speed — the old ratio-vs-speed trade is largely gone.
- **Combine with LZ** — LZ removes repeats, then arithmetic/ANS optimally codes the residual symbols.
- **Entropy is still the floor** — better coding approaches it but can't beat it without a better model.

## Pitfalls (in understanding/using)

- Thinking Huffman is "good enough always" → on skewed data, arithmetic/ANS meaningfully beats it (fractional bits).
- Ignoring the **probability model** → a great coder with a weak model still compresses poorly.
- Assuming arithmetic coding is too slow to use → **ANS** removed that trade-off (zstd proves it).
- Expecting it to beat **entropy** → it approaches the limit; the model, not the coder, is where remaining gains live.
- Rolling your own arithmetic coder → subtle renormalization/precision bugs; use a vetted library.
