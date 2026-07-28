---
name: resumable-downloads-and-range-requests
description: How a download continues from where it left off after an interruption — resumable downloads built on HTTP Range requests and validators. Covers requesting bytes from the last saved offset, using If-Range / ETag / Last-Modified to detect that the file changed (so you must restart, not append corrupt data), 206 vs 200 handling, and integrity checks. Use to implement reliable resume in downloaders and large transfers.
category: networking
keywords_vi: tải tiếp resumable download tiếp tục từ chỗ đã dừng sau khi gián đoạn, http range request tải từ offset đã lưu, if-range etag last-modified phát hiện tệp đã thay đổi để khởi động lại không nối dữ liệu hỏng, xử lý 206 và 200, kiểm tra toàn vẹn sau khi tải, tải lớn tin cậy qua mạng chập chờn
---

# Resumable Downloads & Range Requests

Downloading a large file over a flaky connection shouldn't mean starting over every time it drops. **Resumable downloads** let a transfer **continue from the last byte received**, using the same HTTP **Range** mechanism as parallel downloading — but with an extra concern: making sure the file on the server **hasn't changed** since you started, or you'd append new bytes onto stale ones and silently corrupt the result (see segmented-parallel-downloading, download-manager-reliability, how-http-caching-works).

## The Basic Resume Flow

1. You've saved `N` bytes to disk before the connection died.
2. On retry, request the **rest** starting at your offset:
   ```
   Range: bytes=1048576-        # give me everything from byte N onward
   ```
3. The server replies **`206 Partial Content`** with the remaining bytes; you **append** them at offset `N`.
4. Repeat on each interruption until `Content-Length` bytes total are received.

This turns "restart from zero" into "resume from N" — essential for big files, slow links, and mobile.

## The Critical Safety: Detect That the File Changed

The danger: between your first attempt and the resume, the **server's file may have changed** (a new build replaced it). If you blindly append the new file's bytes after your old partial bytes, you get a **corrupt Frankenstein file** that passes the size check but is garbage. HTTP provides **validators** to prevent this:
- **`If-Range`** — send `If-Range: <ETag-or-Last-Modified>` **together with** your `Range`. The server returns **`206`** (append is safe — the resource is unchanged) **only if** the validator still matches; if it changed, the server returns **`200`** with the **whole** new file, signaling "restart from scratch."
- **`ETag` / `Last-Modified`** — capture these from the *first* response and reuse them as the `If-Range` value. An ETag (content fingerprint) is stronger than a timestamp.
So the resume request is: `Range: bytes=N-` **plus** `If-Range: <saved-etag>`. Then branch on the status:
- **`206`** → append at offset N (safe resume).
- **`200`** → discard the partial, **restart** (the file changed or the server ignored the range).

## Integrity After the Fact

Resumption stitches together bytes from multiple sessions, so **verify the finished file**: check the total size equals `Content-Length`, and if the server provides a checksum (`Content-MD5`, a `.sha256` sidecar, `Digest` header) or the platform provides one, validate it. Never trust "size matches" alone.

## Design Guidance (for understanding/using)

- **Save the offset *and* the validator** (`ETag`/`Last-Modified`) from the first response; you need both to resume safely.
- **Send `Range` + `If-Range`** on resume; treat a `200` response as "restart", a `206` as "append".
- **Never append across a changed resource** — that's exactly what `If-Range` guards; honor it.
- **Verify the completed file** (size + checksum when available) — resumption can hide corruption.
- **Fall back to a full re-download** when the server lacks `Accept-Ranges` or returns `200` — don't corrupt the partial.

## Pitfalls (in understanding/using)

- Resuming with `Range` but **no `If-Range`** → appending bytes from a changed file → silent corruption.
- Treating a `200` response to a resume as a `206` → you overwrite/misalign; branch on the status code.
- Trusting **size match** as integrity → mismatched-version resumes can match size but be garbage; checksum it.
- Assuming all servers support ranges → without `Accept-Ranges: bytes`, resume is impossible; restart.
- Using a **timestamp** validator when an **ETag** is available → weaker change detection.
