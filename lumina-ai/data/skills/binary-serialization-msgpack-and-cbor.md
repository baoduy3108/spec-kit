---
name: binary-serialization-msgpack-and-cbor
description: How to get JSON's flexibility in a smaller, faster binary form WITHOUT a schema — self-describing binary formats like MessagePack and CBOR. Covers why they beat JSON on size/speed, how they tag types compactly, schema-less vs schema-based (protobuf) trade-offs, CBOR's standardization/extensibility, and when binary JSON is the right middle ground. Use to choose between JSON, MessagePack/CBOR, and protobuf.
category: systems-internals
keywords_vi: tuần tự hoá nhị phân tự mô tả không cần schema messagepack cbor, nhỏ và nhanh hơn json mà vẫn linh hoạt, gắn nhãn kiểu dữ liệu gọn trong byte đầu, so sánh schema-less với schema-based protobuf, cbor chuẩn hoá và mở rộng, json nhị phân là điểm trung gian
---

# Binary Serialization: MessagePack & CBOR

There's a middle ground between text **JSON** (universal, human-readable, but bulky and slow to parse) and **protobuf** (tiny and fast, but requires a pre-shared schema). **Self-describing binary formats** — **MessagePack** and **CBOR** — give you JSON's exact data model (objects, arrays, strings, numbers, bools, null) in a **compact binary encoding** that needs **no schema**. You serialize any JSON-like structure and the receiver can decode it standalone (see how-json-serialization-works, protobuf-and-wire-format, varint-and-zigzag-encoding).

## Why They Beat JSON

JSON pays a text tax: numbers are ASCII digits, every string is quoted, structural characters (`{`, `:`, `,`) repeat, and keys are spelled out every time. Binary formats fix this:
- **Numbers** are stored as actual bytes (a compact int/float), not decimal text.
- **Type + length** are packed into a small **prefix byte** (the "format/major type"), so a short string is `[tag+len][bytes]` with no quotes/escaping.
- **No whitespace, no delimiters** to parse.
Result: **smaller payloads and faster encode/decode** than JSON, while keeping the **same flexible, schema-less data model** — you can still send arbitrary/dynamic structures.

## Self-Describing: The Key Difference from Protobuf

Because the **types are on the wire** (each value carries its type tag), MessagePack/CBOR are **self-describing**: a decoder needs nothing but the bytes — no `.proto`, no registry. Contrast:
- **Protobuf/Avro (schema-based)** — smallest and fastest, but both sides need the **schema**; great for stable, high-volume internal APIs.
- **MessagePack/CBOR (schema-less binary)** — a bit larger (type tags + field-name strings still travel), but **flexible and standalone** — great when data is dynamic, you can't share schemas, or you want a drop-in JSON replacement.
- **JSON (schema-less text)** — largest/slowest but human-readable and universally debuggable.

So the axis is: **JSON → MessagePack/CBOR → protobuf** trades human-readability and flexibility for size and speed.

## CBOR vs MessagePack

Both encode the JSON model in binary and are very similar. Practical differences:
- **CBOR** (RFC 8949) is an **IETF standard** with a defined **extensibility** mechanism (tags for dates, big ints, custom types), used in **IoT/constrained devices** (COSE/CWT, WebAuthn, DNS), and designed for deterministic encoding. Prefer when you want a **standard** with a spec and extension tags.
- **MessagePack** is slightly older, extremely widely implemented, very compact, popular in **Redis, caching, and app RPC**. Prefer for ubiquity and minimal size.
Both keep binary strings, integers, floats, maps, arrays; both are far smaller than JSON.

## Design Guidance (for understanding/using)

- **Use JSON** for public APIs, config, and anything humans read/debug — readability wins.
- **Use MessagePack/CBOR** as a **drop-in binary JSON** when you want smaller/faster payloads but still schema-less/dynamic data (mobile, IoT, caches, internal RPC without shared schemas).
- **Use protobuf/Avro** when both sides share a schema and you need the **smallest/fastest** with evolution guarantees.
- **Prefer CBOR** for standards-based/constrained-device work with extension tags; **MessagePack** for max ubiquity/compactness.
- **They still send field-name strings** — for maximum size savings on stable schemas, protobuf's numbered fields win.

## Pitfalls (in understanding/using)

- Expecting MessagePack/CBOR to be as **small as protobuf** → they still carry type tags and key strings (self-describing costs bytes).
- Treating them as **human-readable** → they're binary; you need a decoder to inspect.
- Assuming **no schema** means no compatibility care → you still must handle missing/extra fields in application code.
- Ignoring **number precision/type** differences (int vs float, big integers) across languages → subtle decode mismatches; CBOR tags help.
- Using a schema-based format (protobuf) for **dynamic/unknown** structures → painful; a self-describing format fits better.
