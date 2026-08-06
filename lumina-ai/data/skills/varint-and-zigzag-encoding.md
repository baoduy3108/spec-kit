---
name: varint-and-zigzag-encoding
description: How binary formats store integers in as few bytes as possible — variable-length integers (varints) — and how zigzag encoding makes negative numbers small too. Covers the 7-bits-per-byte + continuation-bit scheme, why small numbers take one byte, why naive varints make negatives huge (all bytes), and zigzag's interleaving of positive/negative. Use to understand protobuf/LEB128 integer encoding and its trade-offs.
category: systems-internals
keywords_vi: số nguyên độ dài biến đổi varint lưu số bằng ít byte nhất, bảy bit mỗi byte cộng bit tiếp diễn continuation bit, số nhỏ tốn một byte số lớn nhiều byte, số âm naive varint tốn hết byte, zigzag đan xen số dương và âm để số âm nhỏ vẫn ngắn, mã hoá leb128 protobuf
---

# Varint & Zigzag Encoding

Most integers in real data are **small** — counts, ids, lengths, ages — yet a fixed `int32` always spends 4 bytes and `int64` spends 8, even for the number 3. **Variable-length integers (varints)** fix this waste by using **only as many bytes as a number needs**: tiny numbers take one byte, huge numbers take more. It's the integer encoding behind Protocol Buffers, LEB128 (DWARF/WebAssembly), and many binary formats — and **zigzag** is the companion trick that keeps *negative* numbers small too (see protobuf-and-wire-format, run-length-and-delta-encoding, binary-serialization-msgpack-and-cbor).

## How Varints Work: 7 Bits + a Continuation Bit

A varint stores a number **7 bits at a time**, little-endian, using each byte's **high bit (MSB) as a continuation flag**:
- **MSB = 1** → "more bytes follow".
- **MSB = 0** → "this is the last byte".
The low 7 bits of each byte carry the actual value. So:
- `1` → `0000_0001` (1 byte).
- `300` → needs 9 bits → two bytes (`1010_1100 0000_0010`).
Numbers 0–127 fit in **1 byte**, 128–16383 in **2 bytes**, and so on. Since most integers in practice are small, varints shrink data dramatically versus fixed-width — especially combined with **delta encoding** (small deltas → tiny varints), which is why sorted ids/timestamps compress so well.

## The Negative-Number Problem

Varints assume the value is (mostly) small and non-negative. A **negative** number in two's-complement has all its high bits set to 1 — so `-1` as a raw 64-bit value is `0xFFFFFFFFFFFFFFFF`, and encoding that as a varint takes the **maximum 10 bytes**. Every negative number becomes worst-case huge. (This is exactly why protobuf's `int32`/`int64` are *terrible* for negative values.)

## Zigzag: Make Small Negatives Small Again

**Zigzag encoding** maps signed integers to unsigned ones so that numbers with **small absolute value** (positive *or* negative) get **small** encodings, by **interleaving**:
```
0→0, -1→1, 1→2, -2→3, 2→4, -3→5, ...
```
Formula: `zigzag(n) = (n << 1) ^ (n >> 31)` (for 32-bit; `>> 63` for 64-bit) — a shift and XOR. Now `-1` encodes as `1` (one byte) instead of ten. The decoder reverses it. This is what protobuf's **`sint32`/`sint64`** use — you should pick them whenever a field can be negative, or pay the 10-byte tax.

## Design Guidance (for understanding/using)

- **Use varints for integers that are usually small** — ids, counts, lengths; they cut size versus fixed-width.
- **Use zigzag (`sint32`/`sint64` in protobuf) for values that can be negative** — otherwise negatives blow up to max bytes.
- **Use fixed-width (`fixed32`/`sfixed64`) for values that are usually large or random** (hashes, big ids) — varints would be *bigger* there.
- **Combine varint with delta encoding** — deltas of sorted sequences are small → single-byte varints (columnar/index compression).
- **Beware the worst case** — a varint of a large 64-bit value can be **10 bytes** (bigger than fixed 8); match the encoding to the value distribution.

## Pitfalls (in understanding/using)

- Using plain varints (`int32`/`int64`) for **negative** numbers → every negative takes the max ~10 bytes; use zigzag.
- Varint-encoding **large/random** integers → they can exceed fixed-width size; use `fixed*` there.
- Assuming varints are always smaller → only for small magnitudes; big values cost more than fixed.
- Forgetting the **continuation bit** limits each byte to 7 payload bits → off-by-one when hand-decoding.
- Mixing up encodings across encoder/decoder (varint vs zigzag vs fixed) → garbage values.
