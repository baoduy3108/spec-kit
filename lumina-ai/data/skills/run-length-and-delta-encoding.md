---
name: run-length-and-delta-encoding
description: Two simple, high-impact preprocessing transforms that make data far more compressible — run-length encoding (replace runs of a repeated value with value+count) and delta/frame-of-reference encoding (store differences between consecutive values). Use to understand why sorted/columnar data compresses so well, RLE in bitmaps/images, delta+zigzag for integers/timestamps, and why transforming data before a general compressor beats compressing it raw.
category: systems-internals
keywords_vi: mã hoá độ dài chạy run-length thay chuỗi giá trị lặp bằng giá trị và số đếm, mã hoá delta lưu hiệu giữa các giá trị liên tiếp, dữ liệu đã sắp xếp và dạng cột nén rất tốt, rle trong bitmap và ảnh, delta cộng zigzag cho số nguyên và dấu thời gian, biến đổi dữ liệu trước khi nén tổng quát
---

# Run-Length & Delta Encoding

Before reaching for a heavy general-purpose compressor, two trivially simple transforms often deliver the biggest wins — because they **reshape the data** into something far more compressible. **Run-length encoding (RLE)** collapses repeated values; **delta encoding** stores differences instead of absolute values. They're everywhere in columnar databases, time-series stores, images, and file formats, usually as a **preprocessing** step before a general compressor (see lz77-and-dictionary-compression, how-columnar-storage-works, how-time-series-databases-work).

## Run-Length Encoding (RLE)

Replace a **run** of the same value with the **value + a count**: `AAAAAAAA` → `(A, 8)`. Dramatic when data has long runs:
- **Bitmaps / bitmap indexes** — long stretches of 0s/1s compress hugely (roaring bitmaps, indexes).
- **Images with flat regions** — icons, screenshots, fax (the basis of simple image compression).
- **Sorted or low-cardinality columns** — a column sorted by `status` becomes long runs of each value → RLE crushes it.

RLE is nearly free to encode/decode and can turn megabytes into kilobytes on the right data — but on data **without** runs it can slightly *expand* the data (each single value now carries a count), so it's applied selectively.

## Delta (Differential) Encoding

Store the **difference** between each value and the previous one instead of absolute values: `1000, 1002, 1005, 1009` → `1000, +2, +3, +4`. When consecutive values are **close** (sorted ids, timestamps, sensor readings, monotonically increasing sequences), the deltas are **small numbers** that need **few bits** — and small numbers compress far better than large ones. Variants:
- **Frame-of-reference (FOR)** — subtract a base value from a block so all values become small offsets.
- **Delta-of-delta** — for near-constant intervals (regular timestamps), encode the change *in* the delta → often zero (Gorilla/Prometheus TSDB use this for timestamps).
- **Zigzag encoding** — maps signed deltas to unsigned (`0,-1,1,-2 → 0,1,2,3`) so small negatives also encode in few bits (Protobuf varints, columnar stores).

## Why Preprocessing Beats Raw Compression

A general compressor (LZ+entropy) works on whatever bytes you give it. If you first **delta-encode** sorted timestamps, you've converted large distinct numbers into a stream of tiny, repetitive deltas — which then RLE/entropy-code down to almost nothing. The transform exposes the structure (monotonicity, runs) that a byte-level compressor couldn't see. This is exactly why **columnar formats** (Parquet/ORC) apply RLE + dictionary + delta **per column** before general compression — same-type, often-sorted column data is ideal for these transforms.

## Design Guidance (for understanding/using)

- **Sort/cluster data** so similar values are adjacent → RLE gets long runs, delta gets small differences.
- **Delta-encode monotonic sequences** (ids, timestamps, offsets); use **delta-of-delta** for regular intervals, **zigzag** for signed.
- **RLE low-cardinality / sorted columns and bitmaps** — huge, cheap wins.
- **Transform, then compress** — apply these before a general compressor; columnar engines do this automatically per column.
- **Apply selectively** — RLE on run-less data can expand it; match the transform to the data's structure.

## Pitfalls (in understanding/using)

- RLE on data **without runs** → can expand it (value+count per singleton); use only where runs exist.
- Delta-encoding **unsorted/random** values → deltas are as large/random as the originals; no gain.
- Forgetting **zigzag** for signed deltas → negatives become huge unsigned numbers, hurting varint/bit-packing.
- Compressing **raw** what you could transform first → leaves big wins (sorted timestamps/ids) on the table.
- Delta chains that break on **random access** — you may need block boundaries/bases to decode a value without replaying from the start.
