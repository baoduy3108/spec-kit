---
name: download-manager-reliability
description: What separates a robust download manager from a naive fetch loop — retry with backoff on transient failures, connection reuse, integrity verification, atomic finalize (temp file + rename), disk-space and partial-state persistence so downloads survive app restarts. Use to build reliable large-file downloading, queue management, and to avoid the classic corruption/half-file bugs.
category: networking
keywords_vi: độ tin cậy trình quản lý tải xuống khác với vòng lặp fetch ngây thơ, thử lại với backoff khi lỗi tạm thời, tái dùng kết nối, kiểm tra toàn vẹn checksum, hoàn tất nguyên tử ghi tệp tạm rồi đổi tên, kiểm tra dung lượng đĩa, lưu trạng thái phần đã tải để sống sót qua khởi động lại app, quản lý hàng đợi
---

# Download Manager Reliability

Downloading a file "for real" is more than one `GET` to a file handle. Networks drop, servers hiccup, disks fill, apps get killed mid-transfer — and a naive downloader responds by leaving **corrupt half-files** that look complete. A reliable download manager is defined by how it handles all the ways a transfer can go wrong (see resumable-downloads-and-range-requests, segmented-parallel-downloading, load-shedding-and-graceful-degradation).

## Retry With Backoff (distinguish transient from permanent)

Transient failures — connection reset, timeout, `503`, `429`, DNS blip — should be **retried**, not surfaced as fatal. Use **exponential backoff with jitter** (see retries-timeouts-and-heartbeats), a max attempt count, and **honor `Retry-After`** on `429`/`503`. Crucially, separate **retryable** errors (network/5xx/429) from **permanent** ones (`404`, `401/403`, `410`) — retrying a `404` forever is pointless. On resumable transfers, a retry **resumes from the last offset** rather than restarting.

## Atomic Finalize (never expose a half file)

The classic bug: writing directly to `movie.mp4` and crashing halfway leaves a truncated file that downstream code treats as done. The fix is **atomic finalize**:
1. Download into a **temporary file** (`movie.mp4.part` / a temp path).
2. Only after the transfer **completes and verifies**, **rename** it to the final name.
`rename` within the same filesystem is atomic, so observers see either **no file** or the **complete** file, never a partial. The `.part` file also marks in-progress state for resume.

## Integrity Verification

Bytes can corrupt in transit, on disk, or via a bad resume. **Verify** before declaring success: size equals `Content-Length`, and a **checksum** (server-provided `Digest`/`Content-MD5`, a `.sha256` sidecar, or a known hash) matches. This is what catches silent corruption that a size check misses.

## Persist State to Survive Restarts

A good manager keeps **durable state** (a small DB / sidecar file) per download: URL, target path, total size, bytes done, per-segment offsets, ETag/validator, status. So if the app is closed or crashes, it **resumes** on next launch instead of losing progress. This state is also what powers a **download queue** (pause/resume, concurrency limits, priorities).

## Other Robustness Musts

- **Check disk space** before/while downloading (and pre-allocate) — running out mid-write corrupts or aborts.
- **Reuse connections** (keep-alive / connection pool) instead of a new TCP+TLS handshake per request — big speedup for many small fetches.
- **Timeouts** (connect and read) so a hung server doesn't stall a slot forever.
- **Bound concurrency** and be a polite client (see bandwidth-throttling-and-download-scheduling).

## Design Guidance (for understanding/using)

- **Download to a temp file, verify, then atomic-rename** — never write the final path directly.
- **Retry transient errors with backoff + jitter**, honor `Retry-After`, and don't retry permanent 4xx.
- **Verify size + checksum** before marking complete.
- **Persist per-download state** (offset, validator) so restarts resume, not restart.
- **Pre-check disk space, reuse connections, set timeouts** — the unglamorous reliability details.

## Pitfalls (in understanding/using)

- Writing directly to the **final filename** → crash leaves a corrupt "complete" file; use temp + rename.
- Retrying **permanent** errors (`404`/`403`) → wasted effort; only retry transient/5xx/429.
- Declaring success on **size match alone** → misses corruption; checksum it.
- No **persisted state** → an app restart loses all progress instead of resuming.
- Ignoring **disk space / timeouts** → mid-transfer OOM-on-disk or hung, stuck downloads.
