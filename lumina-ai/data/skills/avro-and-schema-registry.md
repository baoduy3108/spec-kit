---
name: avro-and-schema-registry
description: How data pipelines (especially Kafka) serialize records compactly AND evolve schemas safely — Apache Avro plus a Schema Registry. Avro stores no field tags inline (schema drives layout), so the reader needs the writer's schema; a registry stores schemas by id and enforces compatibility. Use to understand writer vs reader schema, schema resolution, backward/forward/full compatibility rules, and why the schema id travels with each message.
category: data-engineering
keywords_vi: apache avro tuần tự hoá bản ghi nhỏ gọn và tiến hoá schema an toàn, avro không gắn tag trường inline schema quyết định bố cục, người đọc cần schema của người ghi writer reader schema, schema registry lưu schema theo id và ép tương thích, độ tương thích backward forward full, id schema đi kèm mỗi message kafka
---

# Avro & Schema Registry

Streaming platforms like **Kafka** move billions of records; they need serialization that is **compact** *and* lets producers and consumers **evolve independently** without coordinated deploys. **Apache Avro** + a **Schema Registry** is the standard answer. Avro is unusual: unlike protobuf, it stores **no field identifiers inline** — the schema itself defines the byte layout — so the reader must have the writer's schema. The registry makes that practical and enforces safe evolution (see data-contracts-and-schema-evolution, protobuf-and-wire-format, exactly-once-stream-processing).

## Avro: Schema *Is* the Format

An Avro record is serialized as a bare stream of field values **in schema order**, with **no tags, no field names, no lengths per field** — just the values, back to back (ints as varints, strings as length+bytes, etc.). This is **extremely compact** (even smaller than protobuf, which carries field-number tags). But it means the bytes are **meaningless without the schema** — you cannot decode a record unless you know exactly which schema wrote it.

## Writer Schema vs Reader Schema (Schema Resolution)

Avro's evolution model uses **two** schemas at read time:
- The **writer's schema** — what was used to serialize the bytes (needed to parse them at all).
- The **reader's schema** — what the consumer *expects*.
Avro performs **schema resolution**: it reads with the writer's schema and **projects** onto the reader's schema, applying rules — fill missing fields with **defaults**, ignore fields the reader doesn't have, match by **name**. This is how a consumer on an old schema reads new data (and vice versa) — as long as the change is compatible.

## The Schema Registry

Since the reader needs the writer's schema, you don't ship the whole schema with every message (that would erase the compactness). Instead:
- Schemas are stored in a central **Schema Registry** under an **id**.
- Each message carries a tiny **schema id** (a few bytes) prefix; the consumer fetches (and caches) that schema by id to decode.
- On **register**, the registry **checks compatibility** against existing versions and **rejects** incompatible schemas — turning "don't break consumers" from a hope into an enforced gate.

## Compatibility Modes

The registry enforces one of:
- **Backward** — new schema can read **old** data (safe to upgrade **consumers** first). Allowed: delete a field, add a field **with a default**.
- **Forward** — old schema can read **new** data (safe to upgrade **producers** first). Allowed: add a field, delete a field **with a default**.
- **Full** — both backward and forward.
- **None** — no checks (dangerous).
The recurring rule: **adding/removing fields is only safe if they have defaults**, so the missing side has something to fill in. Renames and type changes generally break compatibility.

## Design Guidance (for understanding/using)

- **Use Avro + Schema Registry for Kafka/streaming** — compact records plus enforced evolution across independent producers/consumers.
- **Always give new/removed fields defaults** — it's what makes add/remove backward/forward compatible.
- **Pick a compatibility mode deliberately** (usually **backward** or **full**) — it dictates deploy order (consumers-first vs producers-first).
- **Let the registry gate schema changes** — treat a rejected registration as a real breaking change to fix, not a nuisance.
- **Cache schemas by id** on consumers — don't refetch per message.

## Pitfalls (in understanding/using)

- Trying to decode Avro **without the writer's schema** → impossible; the bytes have no inline field info.
- Adding/removing a field **without a default** → breaks backward/forward compatibility; consumers or producers fail.
- **Renaming** fields or **changing types** → usually incompatible; treat like remove+add with care/aliases.
- Ignoring the **compatibility mode → deploy order** link → upgrading the wrong side first breaks consumers.
- Assuming protobuf-style **field tags** exist in Avro → they don't; order and names (via schema) matter.
