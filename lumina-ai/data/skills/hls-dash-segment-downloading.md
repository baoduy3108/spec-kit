---
name: hls-dash-segment-downloading
description: How adaptive streaming works and how to download/record it — HLS (m3u8) and MPEG-DASH deliver video as a manifest listing many small segments at multiple bitrates. Covers the master/media playlist structure, downloading segments and concatenating (or remuxing) into one file, live vs VOD playlists, and encrypted-segment handling. Use to understand adaptive bitrate streaming and build a stream downloader/recorder. Respect content rights and platform terms.
category: networking
keywords_vi: phát trực tuyến thích ứng hls m3u8 và mpeg-dash chia video thành nhiều segment nhỏ nhiều bitrate, manifest playlist master và media liệt kê các đoạn, tải các segment rồi ghép hoặc remux thành một tệp, playlist trực tiếp live và vod, xử lý segment mã hoá, xây trình tải ghi luồng tôn trọng bản quyền điều khoản nền tảng
---

# HLS & DASH Segment Downloading

Modern video rarely ships as one big file. **Adaptive bitrate streaming** — **HLS** (Apple, `.m3u8` playlists) and **MPEG-DASH** (`.mpd` manifests) — splits a video into many small **segments** (typically 2–10s each), offered at **multiple bitrates**, so a player can switch quality on the fly as bandwidth changes. Downloading or recording such a stream means understanding the manifest and reassembling the pieces (see segmented-parallel-downloading, download-manager-reliability, how-video-streaming-works). *Only download content you have the right to, and honor each platform's terms of service and copyright.*

## The Manifest Structure

- **HLS** uses nested **M3U8 playlists**: a **master playlist** lists the available **variants** (each bitrate/resolution) and points to a **media playlist** per variant; the media playlist lists the actual **segment URLs** (`.ts` or fragmented-MP4) in order, with durations.
- **DASH** uses a single **MPD** (XML): describes **adaptation sets** (video/audio/subtitles), **representations** (bitrates), and how to derive **segment** URLs (segment templates/timelines).
The pattern is the same: **a manifest that enumerates segments across quality levels.**

## Downloading a VOD Stream

1. **Fetch the manifest**, parse it. Pick a **variant** (usually the highest bitrate for best quality, or a target resolution).
2. **Enumerate the media segments** in order from that variant's playlist.
3. **Download all segments** — this is exactly the parallel-download problem (many small files); fetch with bounded concurrency, retries, and connection reuse.
4. **Assemble** — for MPEG-TS (`.ts`) segments you can often **concatenate** them into one `.ts`, but to get a clean, seekable **MP4** you **remux** (container rewrite, no re-encode) with a tool like ffmpeg (`-c copy`). Audio may be a **separate** track/variant that must be muxed with the video.

## Live vs VOD

- **VOD playlist** — ends with `#EXT-X-ENDLIST`; the full segment list is known → download all and stop.
- **Live playlist** — no endlist; the media playlist is a **sliding window** that the server **updates** over time. To **record** a live stream you must **poll** the playlist repeatedly, appending **new** segments as they appear, until you decide to stop. This is stream *recording*, not a one-shot download.

## Encryption

HLS segments can be **AES-128 encrypted**: the media playlist has `#EXT-X-KEY` pointing to a key URI and IV. If you're authorized to access it, you fetch the key and **decrypt each segment** before muxing. Note: **DRM** (Widevine/FairPlay/PlayReady) is a different, protected system — not the simple AES-128 case — and circumventing DRM is generally illegal; don't.

## Design Guidance (for understanding/using)

- **Parse the manifest, pick a variant, then fetch segments in order** — treat segment download as a bounded-concurrency, retrying batch.
- **Remux (`-c copy`), don't re-encode**, to assemble segments losslessly and fast; mux separate audio.
- **For live, poll the sliding-window playlist** and append new segments; watch for discontinuities (`#EXT-X-DISCONTINUITY`).
- **Handle AES-128 keys** only when authorized; **never** attempt DRM circumvention.
- **Respect ToS/copyright** — download only content you're permitted to save.

## Pitfalls (in understanding/using)

- Grabbing the **master** playlist as if it were segments → it lists *variants*; descend to the media playlist.
- **Concatenating** `.ts` naively and expecting a perfect MP4 → remux for a seekable container; mux missing audio.
- Treating a **live** playlist as fixed → you'll miss segments; poll and append until done.
- Ignoring **discontinuity/ad markers** → glitches at segment boundaries.
- Assuming all encryption is breakable → **DRM** is protected by law; only handle plain AES-128 you're authorized for.
