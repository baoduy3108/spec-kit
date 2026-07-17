---
name: how-video-streaming-works
description: How video streaming works — codecs and compression, segmenting video into chunks, adaptive bitrate streaming (HLS/DASH) that switches quality to match bandwidth, buffering, and CDN delivery. Use to understand streaming (YouTube/Netflix-style), why quality changes, buffering, and adaptive bitrate.
category: engineering
keywords_vi: video streaming hoạt động thế nào, phát video trực tuyến, adaptive bitrate hls dash, codec nén video, buffering, chất lượng tự đổi, cdn video, hiểu streaming
---

# How Video Streaming Works

Streaming plays video as it downloads (rather than waiting for the whole file), adapting quality to your connection so it keeps playing smoothly.

## Compression: Codecs

Raw video is enormous, so it's compressed with a **codec** (H.264, H.265/HEVC, AV1). Video compression exploits that consecutive frames barely change: store occasional full **keyframes** and, between them, only the **differences** from the previous frame (temporal compression) — plus spatial compression within each frame (see how-compression-works). This is lossy — quality vs bitrate is the trade-off.

## Segmentation + Multiple Renditions

The provider pre-encodes the video at **several quality levels** (e.g. 240p, 480p, 720p, 1080p, 4K), each chopped into small **segments** (2–10 seconds) — plus a **manifest/playlist** listing them all.

## Adaptive Bitrate Streaming (the key idea)

Protocols **HLS** (Apple) and **DASH** (open standard) let the player **switch quality per segment** based on current conditions:
1. The player downloads the manifest, then requests segments one at a time.
2. It measures download speed and buffer level, and for the **next segment picks the highest quality that will arrive in time**.
3. If your bandwidth drops, it drops to a lower rendition (you see quality dip but no stall); if it improves, it steps up.
This is why quality auto-adjusts and why a good connection ramps up to HD after a few seconds. The **buffer** (a few seconds of pre-downloaded video) absorbs short network hiccups; **buffering/spinning** happens when the buffer empties faster than segments arrive.

## Delivery: CDN

Segments are served from a **CDN** (see how-cdns-work) so they come from an edge server near you — essential for latency and for handling millions of concurrent viewers. Live streaming uses the same chunk-based approach with lower latency variants (LL-HLS).

## Why It Matters

Explains: adaptive quality changes, the initial low-then-HD ramp, buffering (buffer underrun), why seeking is fast (jump to a segment), why live has some delay (segment + buffer), and why streaming scales (pre-encoded segments + CDN caching, not real-time transcoding per viewer). DRM adds encryption + licensing on top for paid content.

## Pitfalls / Notes

- **Latency vs smoothness** trade-off (bigger buffer = smoother but more delay — bad for live/interactive).
- **Codec support** varies by device (why providers encode multiple codecs).
- Constant HD on a weak/expensive connection burns bandwidth — adaptive streaming balances it, but respect data caps.
- Real-time/interactive (video calls) use different low-latency protocols (WebRTC), not HLS/DASH.
