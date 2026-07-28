---
name: protobuf-and-wire-format
description: How Protocol Buffers encode structured data into compact, fast, schema-driven binary — the protobuf wire format. Covers field tags + wire types (tag-length-value), why field NUMBERS (not names) are on the wire, varint encoding, and the forward/backward-compatibility rules (never reuse/renumber fields, unknown fields are skipped). Use to understand protobuf vs JSON, schema evolution, and why field numbers are sacred.
category: systems-internals
keywords_vi: protocol buffers protobuf mã hoá dữ liệu có cấu trúc thành nhị phân nhỏ gọn, định dạng wire tag-length-value theo số hiệu trường không phải tên, số hiệu field number nằm trên wire nên đổi tên vô hại, varint mã hoá số nguyên, quy tắc tương thích tiến lùi không tái dùng hay đổi số field, trường lạ unknown field được bỏ qua
---

# Protocol Buffers & the Wire Format

Protocol Buffers (protobuf) is Google's schema-driven binary serialization — far **smaller and faster** than JSON, and the default payload for gRPC. Its power and its footguns both come from **how it lays bytes on the wire**: it encodes **field numbers**, not names, as compact tag-length-value records. Understanding the wire format explains protobuf's speed, its compatibility rules, and why "just renumber that field" can silently corrupt data (see how-grpc-works, varint-and-zigzag-encoding, avro-and-schema-registry).

## Schema-Driven: The Names Aren't on the Wire

You define messages in a `.proto` file with **field numbers**:
```
message User { string name = 1; int32 age = 2; }
```
The compiler generates code for each language. Crucially, the serialized bytes contain the **field number (1, 2)**, a **wire type**, and the value — **not** the field name `name`. This is why protobuf is compact (no repeated key strings like JSON) and why **renaming a field is free** (the number is unchanged) but **renumbering is catastrophic** (the meaning of the bytes changes).

## The Wire Format: Tag-Length-Value

Each field is encoded as:
- A **tag** = `(field_number << 3) | wire_type` — a single varint packing the field number and its type.
- The **value**, encoded per wire type:
  - **Varint (0)** — ints/bools/enums, variable-length (see varint skill).
  - **64-bit (1)** / **32-bit (5)** — fixed-width floats/fixed ints.
  - **Length-delimited (2)** — a varint length followed by the bytes: strings, `bytes`, embedded messages, packed repeated fields.
So a message is a flat stream of these records. There's no framing beyond the fields themselves — a message doesn't even record its own length unless embedded.

## The Compatibility Superpower: Unknown Fields

Because each field is self-describing by number+type, a decoder that meets a field number it **doesn't know** can **skip** it (it knows the wire type, hence the length). This is the basis of protobuf's **forward/backward compatibility**: new senders can add fields that old readers ignore, and old senders omit fields new readers treat as defaults. This lets services evolve independently — the whole point of a schema registry-free evolution model.

## The Sacred Rules of Field Numbers

Evolution safety depends on treating field numbers as **permanent identifiers**:
- **Never reuse** a field number for a different field — old data with that number will be misread as the new type → silent corruption.
- **Never change a field's type** incompatibly (e.g. int32↔string) — the wire type/interpretation breaks.
- **Renaming is fine** (names aren't on the wire); **renumbering is not**.
- **Reserve** removed field numbers/names (`reserved 3;`) so no one accidentally reuses them.
- Missing fields decode to **defaults** (0/""/empty), so you can't distinguish "unset" from "zero" for scalars (proto3) without `optional`/wrappers.

## Design Guidance (for understanding/using)

- **Treat field numbers as immutable IDs** — assign once, never reuse/renumber; `reserved` retired ones.
- **Add, don't mutate** — evolve by adding new fields with new numbers; old readers skip them safely.
- **Rename freely, retype never** — names are cosmetic; wire type must stay compatible.
- **Use protobuf for high-volume/internal RPC** where size/speed/schema matter; JSON where human-readability/debuggability wins.
- **Remember default-vs-unset** — proto3 scalars can't tell 0 from unset without `optional`; design accordingly.

## Pitfalls (in understanding/using)

- **Reusing/renumbering** a field number → old data misinterpreted; silent corruption. Reserve instead.
- Assuming field **names** are on the wire → they're not; renaming is safe, renumbering is not.
- Expecting to distinguish **unset vs zero** for proto3 scalars → you can't without `optional`/wrappers.
- Changing a field's **type** incompatibly → wire-type mismatch garbles decoding.
- Treating protobuf as self-describing like JSON → you **need the schema** to interpret the bytes.
