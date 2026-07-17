---
name: how-compression-works
description: How data compression works — lossless (Huffman coding, dictionary/LZ methods behind gzip/zip) vs lossy (JPEG/MP3/video, discarding imperceptible detail), why some data compresses and some doesn't (entropy), and picking a format/level. Use to understand gzip/zip, image/audio/video formats, and compression trade-offs.
category: engineering
keywords_vi: nén dữ liệu hoạt động thế nào, compression, lossless lossy, huffman lz gzip, nén ảnh jpeg mp3, entropy, chọn định dạng nén, hiểu nén dữ liệu
---

# How Compression Works

Compression shrinks data by removing **redundancy**. There are two fundamentally different kinds, and the split matters.

## Lossless (exact reconstruction)

The decompressed data is **bit-for-bit identical** to the original — mandatory for text, code, executables, archives. Two core techniques (often combined, as in DEFLATE/gzip/zip):
- **Entropy coding (Huffman/arithmetic)** — give **frequent symbols shorter codes** and rare symbols longer ones (instead of fixed 8-bit bytes). Text where "e" is common compresses well this way.
- **Dictionary / LZ methods (LZ77/LZ78)** — replace **repeated sequences** with short back-references ("copy 12 bytes from 400 back"). This is why repetitive data (logs, HTML with repeated tags) compresses dramatically.
gzip/zlib = LZ77 + Huffman; modern **zstd/brotli** improve ratio and speed and are common for web assets.

## Lossy (throw away imperceptible detail)

For media, an **approximation** is fine if humans can't tell — so lossy codecs **discard information** for much higher compression:
- **JPEG** — transforms the image to frequency space and drops high-frequency detail the eye barely notices (quantization); quality slider trades size vs artifacts.
- **MP3/AAC** — psychoacoustic models drop sounds you can't hear (masked by louder ones).
- **Video (H.264/H.265/AV1)** — plus **temporal** compression: store one full frame, then only the *differences* between frames (most of a video barely changes frame to frame).
Lossy is irreversible — re-encoding repeatedly (generation loss) degrades quality.

## Why Some Data Won't Compress

Compression exploits redundancy/predictability (**low entropy**). **Already-compressed or random data has high entropy** — little redundancy left — so it won't shrink further (zipping a JPEG or an encrypted file gains almost nothing, sometimes grows it slightly from overhead). There's a hard limit set by the data's information content.

## Choosing

- **Text/code/data** → lossless (gzip/brotli/zstd). For web, enable gzip/brotli on responses — big wins on HTML/CSS/JS/JSON.
- **Photos** → JPEG/WebP/AVIF (lossy); **graphics with flat colors/transparency** → PNG (lossless) or WebP; **audio** → AAC/Opus; **video** → H.264/AV1.
- **Level/quality** trades CPU/size (higher gzip level = smaller but slower; lower JPEG quality = smaller but more artifacts). Pick per use.

## Pitfalls

- **Double-compressing** (gzipping a JPEG/zip) — wasted CPU, no gain.
- **Re-encoding lossy repeatedly** — cumulative quality loss; keep a lossless master.
- Wrong format (PNG for photos = huge; JPEG for line art = ugly artifacts).
- Compressing tiny payloads where the overhead exceeds the savings.
