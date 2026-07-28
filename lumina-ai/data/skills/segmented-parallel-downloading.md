---
name: segmented-parallel-downloading
description: How download accelerators (IDM/aria2-style) make a single file download faster — split it into byte ranges fetched over multiple parallel connections. Covers HTTP Range requests, why parallelism helps (per-connection throttling, latency), writing segments to correct file offsets without a merge step, and the diminishing returns / server-limit trade-offs. Use to understand multi-connection downloading and build a download accelerator.
category: networking
keywords_vi: tải phân đoạn song song tăng tốc download chia tệp thành nhiều dải byte tải qua nhiều kết nối, http range request tải từng khoảng byte, vì sao song song nhanh hơn do giới hạn mỗi kết nối và độ trễ, ghi mỗi đoạn vào đúng offset trong tệp không cần bước gộp merge, lợi ích giảm dần và giới hạn kết nối của máy chủ
---

# Segmented Parallel Downloading

A single HTTP download often runs slower than your connection can handle — the **server throttles per-connection** bandwidth, TCP takes time to ramp up (see tcp-congestion-control), and high latency limits a single stream. **Download accelerators** (IDM, aria2, DownThemAll) fix this by splitting **one file into byte ranges** and fetching them **in parallel over multiple connections**, then assembling them into the final file. Understanding this is how you build or reason about any download manager (see resumable-downloads-and-range-requests, download-manager-reliability, hls-dash-segment-downloading).

## The Enabling Mechanism: HTTP Range Requests

The whole technique rests on the server supporting **partial content**. A client sends a **`Range` header**:
```
GET /big.iso HTTP/1.1
Range: bytes=0-1048575          # ask for just the first 1 MiB
```
A compliant server replies **`206 Partial Content`** with a `Content-Range` header and only those bytes. So you can request **arbitrary slices** of a file. The server advertises support with **`Accept-Ranges: bytes`** (and a known `Content-Length` lets you plan the splits). If the server returns `200` with the whole body instead of `206`, it **doesn't support ranges** and you can't segment — fall back to a single stream.

## The Strategy

1. **Probe** — a `HEAD` (or ranged GET) to learn `Content-Length` and confirm `Accept-Ranges: bytes`.
2. **Split** — divide `[0, length)` into N contiguous ranges (e.g. 8 segments), one per connection.
3. **Fetch in parallel** — open N connections, each requesting its range.
4. **Write to offsets** — each segment writes its bytes **directly to its position** in the output file (`seek(offset)` / positioned write / pre-allocated sparse file). Because each connection knows its absolute file offset, there's **no separate merge/concatenation step** — the file is assembled in place as segments arrive.

## Why Parallelism Helps (and its limits)

- **Bypasses per-connection throttling** — many servers/CDNs cap *each* connection; N connections can each hit that cap, multiplying throughput.
- **Amortizes latency / slow-start** — several streams fill the pipe better than one ramping stream, especially on high-latency links.
- **Diminishing returns** — beyond a handful of connections gains flatten; too many add overhead and can trigger server limits.
- **Server/etiquette limits** — servers may cap concurrent connections per client (or ban abusers); respect `429`/limits. Dynamic downloads, no `Content-Length`, or `Accept-Ranges: none` make segmenting impossible.

## Design Guidance (for understanding/using)

- **Check `Accept-Ranges: bytes` and a real `Content-Length`** before segmenting; otherwise single-stream.
- **Write each segment to its file offset** (pre-allocate / sparse file) — no post-download merge needed.
- **Use a modest connection count** (≈4–8) — respect diminishing returns and server limits; make it configurable.
- **Validate the whole file** afterward (size, and a checksum if provided) — parallel writes must reassemble exactly.
- **Handle a `200` fallback** gracefully — if the server ignores `Range`, don't corrupt the file; download once.

## Pitfalls (in understanding/using)

- Assuming every server supports ranges → a `200` (not `206`) means no segmenting; detect and fall back.
- Opening **too many** connections → diminishing returns, server throttling/bans (`429`), and overhead.
- Merging segments as a **separate concat step** → unnecessary; write to offsets directly.
- Segmenting **dynamic/streamed** responses without a fixed `Content-Length` → ranges are meaningless.
- Skipping final **integrity verification** → a mis-offset write silently corrupts the file.
