---
name: posting-list-compression
description: How search indexes stay small and fast despite billions of entries — posting-list compression. Doc-id postings are sorted, so store gaps (delta) instead of ids, then bit-pack them with schemes like variable-byte, Frame-of-Reference, PForDelta, Simple-9, or SIMD-friendly codecs. Use to understand why sorted postings compress so well, the decode-speed-vs-ratio trade, skip pointers, and why index compression improves query speed (less I/O).
category: databases
keywords_vi: nén danh sách postings chỉ mục tìm kiếm, postings sắp xếp theo doc id lưu khoảng cách gap delta, bit-packing variable-byte frame-of-reference pfordelta, đánh đổi tốc độ giải mã và tỉ lệ nén, con trỏ nhảy skip pointer, nén chỉ mục tăng tốc truy vấn nhờ ít i/o
---

# Posting-List Compression

An inverted index for a large corpus has **postings lists** with billions of document ids. Stored naively (a 4-byte int per doc id), the index would be enormous — too big for RAM, slow to read from disk. But posting lists have a beautiful property that makes them extremely compressible, and compressing them **speeds up** queries (less data to read/decode). This is a core reason Lucene/Elasticsearch scale (see inverted-index-and-full-text-search, run-length-and-delta-encoding, how-columnar-storage-works).

## The Key: Sorted Doc-Ids → Small Gaps

Postings are stored **sorted by document id**: `[7, 12, 50, 51, 99, 312, ...]`. Since they're increasing, you don't need the absolute ids — store the **gaps (deltas)** between consecutive ids: `[7, 5, 38, 1, 48, 213, ...]` (**d-gaps**). For a **common** term appearing in many documents, the gaps are **small** (documents are dense), and small numbers need far fewer bits than 32-bit ids. This delta transform is what makes postings compress dramatically — then you **bit-pack** the small gaps.

## The Bit-Packing Schemes (ratio vs decode speed)

The gaps are encoded with integer codecs trading **compression ratio** against **decode speed** (decode speed matters because you decompress on every query):
- **Variable-byte (VByte)** — use as many bytes as a number needs, 7 bits payload + 1 continuation bit. Simple, byte-aligned, fast; decent ratio. Common default.
- **Frame-of-Reference (FOR) / bit-packing** — for a block of values, find the max, and pack **all** with just enough bits (e.g. all fit in 9 bits). Great when values in a block are similar-sized.
- **PForDelta (Patched FOR)** — bit-pack most values at a small width and store the rare **outliers** ("exceptions") separately, so a few large gaps don't force everyone wide. Excellent ratio + speed; widely used.
- **Simple-9/16, Elias/Golomb** — other classic integer codecs.
- **SIMD codecs (e.g. StreamVByte, SIMD-BP128)** — designed so **vectorized** CPU instructions decode many integers per cycle — decode speed is often the real bottleneck, so these win in practice.

Real engines (Lucene) combine block-based bit-packing with skip structures.

## Skip Pointers: Don't Decode What You Skip

Query processing intersects postings lists, often needing to **jump ahead** to a target doc id. **Skip pointers** (a sparse index over the postings, e.g. every 128 entries) let the engine **skip whole compressed blocks** without decoding them — turning intersection from linear into near-logarithmic jumps. Compression is done **per block** precisely so blocks can be skipped and decoded independently.

## Compression Makes Queries Faster (not just smaller)

Counter-intuitively, compressing the index **speeds up** search: the index fits in **RAM/cache**, and **less data is read from disk** per query. As long as decode is fast (hence SIMD codecs), the I/O saved dwarfs the decode cost. Smaller index = fewer cache misses = faster queries. This is the same "I/O-bound, so trade cheap CPU for less data" logic seen across systems.

## Design Guidance (for understanding/using)

- **Store d-gaps, not absolute ids** — sorting + delta is the foundation of postings compression.
- **Pick a codec for your decode-speed need** — PForDelta / SIMD codecs when query throughput matters; VByte for simplicity.
- **Keep skip pointers** so intersections skip compressed blocks instead of decoding everything.
- **Expect compression to *help* latency** — a RAM-resident, less-I/O index is faster, not slower, given fast decode.
- **Rely on the engine** (Lucene) for this — understand it to reason about index size/speed, not to reimplement it.

## Pitfalls (in understanding/using)

- Storing **absolute** doc ids → far larger index; delta-gaps are the whole trick.
- Choosing a high-ratio but **slow-to-decode** codec → decode becomes the query bottleneck; balance with SIMD/PFor.
- Compressing in a way that **breaks skipping** → intersections must decode everything; keep block boundaries + skip lists.
- Assuming compression **slows** search → for I/O-bound indexes it usually speeds it up.
- Not accounting for **outliers** (a few huge gaps) → naive FOR widens the whole block; use patched/PForDelta.
