---
name: how-json-serialization-works
description: How data serialization works — turning in-memory objects into bytes for storage/transmission and back (deserialization), text formats (JSON) vs binary (Protobuf/MessagePack/Avro), schema evolution, and trade-offs of size/speed/readability/compatibility. Use to understand serialization, JSON vs Protobuf, wire formats, schema evolution, or why APIs use particular data formats.
category: engineering
keywords_vi: serialization, tuần tự hóa dữ liệu, json vs binary, protobuf messagepack avro, deserialize, schema evolution tương thích, kích thước tốc độ định dạng
---

# How Data Serialization Works

Serialization converts in-memory data structures (objects, structs) into a **byte sequence** that can be stored in a file or sent over a network; **deserialization** reconstructs the object on the other side. Every API call, saved file, and message queue relies on it. The choice of format trades readability, size, speed, and compatibility.

## Why It's Needed

In memory, data is pointers, objects, and layouts specific to a language/machine. To **persist** it or send it **between processes/machines/languages**, you must flatten it into a portable, self-contained byte stream both sides agree on. That agreed encoding is the serialization format.

## Text Formats: JSON (and friends)

**JSON** is the ubiquitous text format for web APIs:
- **Human-readable**, easy to debug, universally supported, schema-flexible.
- **But**: verbose (field names repeated in every record, numbers as text) → larger payloads and slower parsing; limited types (no native dates/binary/int64 precision); no enforced schema (a source of bugs).
XML (older, heavier) and YAML/TOML (config-oriented, readable) are relatives. Great when human-readability and interoperability matter more than efficiency.

## Binary Formats: Protobuf, MessagePack, Avro

For efficiency and strong contracts, **binary** formats:
- **Protocol Buffers** (see how-grpc-works) — schema-defined, field numbers instead of names, compact, fast, strongly typed, codegen. Excellent for internal service-to-service.
- **MessagePack** — "binary JSON": same flexible model as JSON but compact binary (no schema needed).
- **Avro** — schema-based, common in big-data/Kafka; stores/负 the schema for robust evolution.
These are **smaller and faster** to encode/parse than JSON but **not human-readable** and often need tooling/schemas.

## Schema Evolution (the compatibility problem)

Systems change; producers and consumers get updated at different times. A good format supports **evolving the schema without breaking** old/new peers:
- Add fields safely (old readers ignore unknown fields; new readers use defaults for missing ones).
- **Backward compatibility** (new code reads old data) and **forward compatibility** (old code reads new data).
- **Never reuse/renumber** Protobuf field numbers; never change a field's meaning.
JSON's looseness helps here (add keys freely) but offers no enforcement; Avro/Protobuf handle it with explicit rules. Ignoring schema evolution is a top cause of production breakage in distributed systems.

## Choosing a Format

- **JSON** — public/web APIs, config, debuggability, broad compatibility.
- **Protobuf/binary** — internal high-throughput services, mobile bandwidth, strict contracts.
- **Avro** — data pipelines/streaming with strong schema management.
Match the format to size/speed vs readability/interop needs.

## Pitfalls (in understanding/using)

- Assuming JSON is "free" — it's verbose and slow at scale; consider binary for high-volume internal traffic.
- **Breaking schema compatibility** (renaming/renumbering fields, changing types) → old clients crash or misread.
- Trusting deserialized data — **insecure deserialization** of untrusted input is a real vulnerability (see owasp-top-10); validate, don't deserialize arbitrary types.
- Floating-point/precision loss (JSON numbers, large int64) — encode big/precise numbers as strings or use a typed format.
- Not versioning your messages/APIs — plan for evolution from day one.
- Human-readability where you don't need it (wasting bandwidth) — or binary where you need to debug by eye.
