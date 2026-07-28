---
name: insecure-deserialization-and-gadget-chains
description: Why turning untrusted bytes back into objects can execute code — insecure deserialization — and how gadget chains turn a deserialize call into remote code execution. Covers native/binary serializers (Java, Python pickle, PHP, .NET) as the danger, why signed/allowlisted or plain-data formats (JSON) are safer, and integrity/type restrictions. Use to safely handle serialized data, sessions, caches, and message payloads.
category: security
keywords_vi: giải tuần tự không an toàn insecure deserialization, biến byte không tin cậy thành đối tượng có thể chạy mã, chuỗi gadget chain thực thi mã từ xa rce, serializer nhị phân java pickle php .net nguy hiểm, định dạng dữ liệu thuần json an toàn hơn, ký và allowlist kiểu deserialize
---

# Insecure Deserialization & Gadget Chains

**Serialization** turns objects into bytes to store or transmit; **deserialization** reconstructs them. The danger: some serializers don't just rebuild *data* — they reconstruct **live objects**, invoking constructors, setters, and magic methods (`__reduce__`, `readObject`, `__wakeup__`) **during** deserialization. If an attacker controls the bytes, they control **what objects get created and what code runs while creating them**. This is **insecure deserialization**, and via **gadget chains** it escalates to **remote code execution** — one of the most severe web vulnerabilities (Java, Python `pickle`, PHP `unserialize`, .NET `BinaryFormatter` have all been hit) (see how-json-serialization-works, sql-injection-and-parameterized-queries, protobuf-and-wire-format).

## Why It Leads to Code Execution: Gadget Chains

The attacker usually can't directly say "run this command." Instead they craft a payload that, when deserialized, instantiates a **chain of existing classes** ("gadgets") already present in the app or its libraries, whose combined side effects during construction/cleanup end in something dangerous (spawn a process, write a file, make a network call). Tools like **ysoserial** assemble these chains from common libraries. So the vulnerability lives in the **deserializer + available classes on the classpath**, not necessarily in your own code — merely calling `deserialize(untrusted)` with a rich native serializer is the bug.

## The Rule: Never Deserialize Untrusted Data with an Object Serializer

- **Native/binary object serializers are the danger**: Java `ObjectInputStream`, Python **`pickle`/`yaml.load`**, PHP `unserialize`, Ruby `Marshal`, .NET `BinaryFormatter`. These are designed to reconstruct arbitrary object graphs and should **never** touch attacker-controlled bytes.
- **Prefer plain-data formats**: **JSON** (and MessagePack/Protobuf) describe **data**, not code/types, so parsing them can't instantiate arbitrary classes or run methods. Deserialize into **known, explicit types** you control, validating fields.

Untrusted sources include: cookies/sessions, request bodies, query params, cache entries, message-queue payloads, uploaded files, inter-service messages — anywhere bytes cross a trust boundary.

## If You Must Use a Rich Serializer

- **Integrity-protect it** — sign the serialized blob (HMAC) and **verify before deserializing**, so only your own data round-trips (common for signed session cookies). Reject anything failing the MAC.
- **Type allowlisting** — restrict which classes may be deserialized (Java `ObjectInputFilter`, safe-loaders); deny everything not explicitly allowed.
- **Use safe modes** — `yaml.safe_load` not `yaml.load`, avoid `pickle` for anything external, prefer `BinaryFormatter`-free APIs (.NET deprecated it for this reason).

## Design Guidance (for understanding/using)

- **Never feed untrusted bytes to a native object serializer** (pickle/ObjectInputStream/unserialize/BinaryFormatter).
- **Use JSON/plain-data formats** and deserialize into **explicit, validated types** — data in, not code.
- **Sign-and-verify** any serialized blob that must round-trip through the client (sessions, tokens), and check the MAC **before** parsing.
- **Allowlist deserializable types** when a rich serializer is unavoidable; deny by default.
- **Treat all cross-boundary bytes as untrusted** — caches, queues, cookies, uploads — not just obvious request bodies.

## Pitfalls (in understanding/using)

- Calling `pickle.loads` / `ObjectInputStream` / `unserialize` on **user-controlled** data → RCE via gadget chains.
- `yaml.load` (unsafe) on external input → arbitrary object construction; use `safe_load`.
- Assuming "no dangerous classes in *my* code" → gadget chains come from **library** classes on the classpath.
- Storing a serialized object in a **cookie/cache** without signing → attacker tampers → deserialization attack.
- Believing obfuscation/encoding of the blob helps → it's still deserialized; integrity + safe formats are the fix.
