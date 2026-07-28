---
name: flatbuffers-and-zero-copy-deserialization
description: How some formats let you READ structured data without a parse/decode step — zero-copy serialization like FlatBuffers and Cap'n Proto. The serialized bytes are already laid out so fields are accessed by offset directly in the buffer (mmap and read), avoiding allocation and a parse pass. Use to understand the parse-cost problem, access-by-offset via vtables, the size-vs-access trade vs protobuf, and when zero-copy matters (games, mmap, huge messages).
category: systems-internals
keywords_vi: giải tuần tự không sao chép zero-copy flatbuffers capnproto, đọc dữ liệu thẳng trong buffer không cần bước parse giải mã, truy cập trường theo offset qua bảng vtable, tránh cấp phát và một lượt phân tích, đánh đổi kích thước và tốc độ truy cập so với protobuf, dùng cho game mmap và message rất lớn
---

# FlatBuffers & Zero-Copy Deserialization

Most serialization formats — JSON, protobuf, MessagePack — require a **decode step**: read the bytes, allocate objects, and populate fields before you can touch the data. For big messages or hot paths, that parse-and-allocate cost dominates. **Zero-copy** formats — **FlatBuffers** and **Cap'n Proto** — eliminate it: the serialized bytes are **already arranged** so you can read any field **directly from the buffer by offset**, with **no parsing and no allocation**. You `mmap` a file or receive a packet and start reading fields immediately (see protobuf-and-wire-format, page-cache-and-memory-mapped-files, binary-serialization-msgpack-and-cbor).

## The Problem They Solve: Parsing Costs

With protobuf/JSON, `parse(bytes) → objects` walks the whole payload, allocates language objects, and copies values — even if you only need **one** field. For a 10MB message where you read three fields, you paid to decode all 10MB. In games (load a level every frame), mobile (battery), and huge-message pipelines, that parse+allocate is the bottleneck. Zero-copy formats make **deserialization essentially free**.

## How Zero-Copy Access Works

The encoder writes data in a layout that mirrors how it will be read:
- Objects are stored with a **vtable** (offset table): to read field X, look up its offset in the vtable and read the value at that position in the buffer. No field is "parsed" — it's **addressed**.
- Nested objects and vectors are referenced by **relative offsets** within the same buffer.
- So `getField()` is a couple of pointer/offset reads into the raw bytes — O(1), no allocation, no copy. You can access a deeply nested field of a giant buffer without touching the rest.

Because the buffer *is* the object graph, you can `mmap` a multi-gigabyte FlatBuffer and read pieces on demand (the OS pages in only what you touch — see page cache/mmap).

## The Trade-offs vs Protobuf

Zero-copy isn't free of costs; you trade for read speed:
- ❌ **Larger on the wire** — the offset tables/alignment/padding make FlatBuffers **bigger** than protobuf's tightly-packed varints. You spend bytes to enable direct access.
- ❌ **More awkward to build** — constructing a FlatBuffer is more rigid (often built back-to-front); mutation is limited.
- ✅ **Near-zero read cost** — no parse, no allocation; huge win when you read more than you write, or access few fields of big messages.
- **Cap'n Proto** is similar (its author also wrote protobuf v2), adds an RPC system, and can compress the padding on the wire ("packed" encoding).

So the choice is **read-time cost vs wire size / build ergonomics**: protobuf for compact transmission with a cheap-enough parse; FlatBuffers/Cap'n Proto for **latency-critical reads, memory-mapped access, or messages far larger than the fields you use**.

## Design Guidance (for understanding/using)

- **Use zero-copy (FlatBuffers/Cap'n Proto)** when **read latency** dominates: game assets/levels, per-frame data, mmap'd large files, high-throughput read paths where parse cost hurts.
- **Use protobuf** when **wire size** and build simplicity matter more and a small parse is acceptable (typical RPC).
- **Exploit mmap** — zero-copy + memory-mapped files lets you access huge datasets without loading them fully.
- **Read few fields of big messages?** → zero-copy shines (you skip decoding everything).
- **Write-heavy / need easy mutation?** → protobuf/JSON are friendlier to construct and modify.

## Pitfalls (in understanding/using)

- Expecting FlatBuffers to be **smaller** than protobuf → it's usually **larger** (offset tables/padding); you trade size for read speed.
- Using zero-copy where **wire size** is the constraint (bandwidth-bound) → protobuf/compression may win.
- Trying to freely **mutate** a FlatBuffer in place → building/mutation is constrained; it's optimized for reads.
- Ignoring **alignment** requirements → zero-copy access needs correctly aligned buffers.
- Assuming the parse cost is negligible everywhere → for small messages the zero-copy advantage may not justify the size/ergonomics cost.
