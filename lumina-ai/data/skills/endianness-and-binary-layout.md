---
name: endianness-and-binary-layout
description: Why the same bytes mean different numbers on different machines, and how struct layout works in memory — endianness (byte order) plus alignment and padding. Covers big-endian vs little-endian, network byte order, why you must fix byte order in file/network formats, struct padding for alignment, and why field order affects struct size. Use to understand binary protocols, cross-platform file formats, and struct memory layout.
category: systems-internals
keywords_vi: thứ tự byte endianness big-endian và little-endian cùng byte khác số, network byte order big-endian cho mạng, phải cố định thứ tự byte trong định dạng tệp và mạng, bố cục struct trong bộ nhớ căn chỉnh alignment và đệm padding, thứ tự trường ảnh hưởng kích thước struct, giao thức nhị phân đa nền tảng
---

# Endianness & Binary Layout

When you write a multi-byte number to a file, a socket, or shared memory, you're making assumptions about **how bytes are ordered** and **how fields are laid out** — assumptions that differ across CPUs and compilers. Getting them wrong means a file that reads fine on your laptop produces garbage on another machine, or a struct that's mysteriously bigger than the sum of its fields. Two concepts govern this: **endianness** (byte order) and **alignment/padding** (struct layout) (see varint-and-zigzag-encoding, how-cpu-caches-work, protobuf-and-wire-format).

## Endianness: Byte Order

A 32-bit number like `0x12345678` occupies 4 bytes — but in which order?
- **Big-endian** — most-significant byte first: `12 34 56 78`. "Natural" reading order; used by network protocols.
- **Little-endian** — least-significant byte first: `78 56 34 12`. Used by x86 and ARM (the vast majority of machines today).
The **same four bytes** decode to different numbers depending on which convention the reader assumes. Within one program this never matters (everything agrees), but the moment bytes **leave** the machine — a file, a network packet, shared memory between heterogeneous systems — order must be **explicit and agreed**.

## Network Byte Order

Because hosts disagree, network protocols standardized on **big-endian = "network byte order."** That's why C has `htons`/`htonl` (host-to-network) and `ntohs`/`ntohl` (network-to-host): you **convert** multi-byte fields to a fixed order before sending and back after receiving. Any binary **file format or wire protocol must pick a byte order** and every implementation must honor it — this is a classic source of cross-platform bugs.

## Alignment and Padding: Struct Layout

The other half is how a compiler places struct fields in memory. CPUs access aligned data faster (or require alignment), so the compiler **aligns** each field to its size and inserts **padding** bytes to satisfy that. Consequence: **struct size depends on field order.**
```
struct A { char a; int b; char c; };  // often 12 bytes: a + 3 pad + b + c + 3 pad
struct B { int b; char a; char c; };  // often 8 bytes: b + a + c + 2 pad
```
Same fields, different size, because reordering reduces padding. This means:
- You **can't assume** a struct's byte size equals the sum of its fields.
- You **can't memcpy a struct to disk/wire and read it elsewhere** safely — padding, alignment, *and* endianness may all differ. Define an explicit serialization instead of dumping raw struct bytes.

## Design Guidance (for understanding/using)

- **Pick an explicit byte order** for any file/network format (big-endian/network order is the convention) and convert on both ends — never rely on the host's native order.
- **Don't serialize by dumping raw struct bytes** — padding/alignment/endianness make it non-portable; write each field explicitly.
- **Order struct fields largest-to-smallest** to minimize padding when struct size/memory matters (hot data, cache lines).
- **Use fixed-width types** (`uint32_t`, not `int`/`long`) in binary formats — sizes vary across platforms.
- **Use a serialization library** (protobuf, etc.) for cross-platform data — it handles byte order and layout for you.

## Pitfalls (in understanding/using)

- Assuming byte order is universal → a file/packet written little-endian reads as garbage where big-endian is assumed.
- `memcpy`-ing a struct to disk/socket → padding + alignment + endianness make it unreadable elsewhere.
- Assuming `sizeof(struct) == Σ field sizes` → **padding** makes it larger; field order changes it.
- Using platform-dependent types (`int`, `long`) in a wire format → different widths across platforms.
- Forgetting `htonl`/`ntohl` (or equivalent) on multi-byte network fields → silent corruption between hosts.
