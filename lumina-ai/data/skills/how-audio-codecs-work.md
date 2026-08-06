---
name: how-audio-codecs-work
description: How audio codecs work — sampling and PCM, lossless vs lossy compression, psychoacoustic models (masking, removing inaudible sound), transform coding, bitrate vs quality, and common codecs (MP3/AAC/Opus/FLAC). Use to understand audio compression, sample rate/bit depth, lossy vs lossless, bitrate, or how MP3/Opus work.
category: engineering
keywords_vi: audio codec hoạt động thế nào, nén âm thanh, sampling pcm, lossless lossy, psychoacoustic masking, transform coding, bitrate chất lượng, mp3 aac opus flac
---

# How Audio Codecs Work

An audio codec **co**des and **dec**odes sound — compressing raw audio so it's small enough to stream/store, then reconstructing it for playback. The magic of lossy audio is discarding sound you **can't hear** while keeping what you can.

## From Sound to Numbers: Sampling

Sound is a continuous wave; computers need discrete numbers. **Sampling** measures the wave's amplitude many times per second:
- **Sample rate** — samples per second (44.1 kHz for CD, 48 kHz for video). By the **Nyquist theorem**, you must sample at ≥2× the highest frequency you want to capture (humans hear up to ~20 kHz → ~44 kHz).
- **Bit depth** — bits per sample (16-bit CD, 24-bit studio) — sets dynamic range/precision.
The raw result is **PCM** (uncompressed) — accurate but large (~1.4 Mbps for CD stereo). Codecs compress from here.

## Lossless vs Lossy

- **Lossless** (FLAC, ALAC) — compress so the **exact** original PCM is recovered, using prediction + entropy coding (like zip for audio). ~50–60% size reduction; perfect fidelity. For archiving/audiophiles.
- **Lossy** (MP3, AAC, Opus, Vorbis) — **discard** information to get far smaller files (~10× or more). The discarded data is chosen to be **least audible** — the original is *not* recoverable, but ideally you can't tell.

## The Psychoacoustic Model (why lossy works)

Lossy codecs exploit the limits of human hearing:
- **Frequency masking** — a loud tone makes nearby quieter frequencies inaudible → don't waste bits encoding them.
- **Temporal masking** — a loud sound masks quiet sounds just before/after it.
- **Absolute threshold** — we can't hear very quiet or very high/low frequencies at all.
The encoder models what your ear will actually perceive and **allocates bits to audible detail, drops the inaudible**. This is the core idea — it's compression tuned to human perception, not just math.

## Transform Coding

Codecs convert short windows of audio from the time domain to the **frequency domain** (via MDCT/FFT-like transforms), because masking and importance are easiest to reason about per-frequency. They quantize frequency components coarsely where the ear won't notice (guided by the psychoacoustic model), then entropy-code the result. Decoding reverses it.

## Bitrate vs Quality

**Bitrate** (kbps) is the bits-per-second budget — the main quality/size dial. Higher bitrate = less discarded = better quality, bigger file. Modern codecs (**Opus**, **AAC**) sound transparent at much lower bitrates than old **MP3** thanks to better models. **Opus** is the current all-rounder (great from low-bitrate speech to music, low latency — used in calls/streaming); AAC dominates Apple/streaming; MP3 is legacy-ubiquitous; FLAC for lossless.

## Pitfalls (in understanding/using)

- **Re-encoding lossy → lossy** (transcoding) compounds loss — each generation discards more (never edit/re-save MP3s repeatedly; keep a lossless master).
- Thinking higher **sample rate** always means better audible quality — beyond ~48 kHz there's little perceptual gain for playback.
- Confusing **bit depth/sample rate** (PCM resolution) with **bitrate** (compression budget).
- Assuming lossless and lossy are interchangeable — only lossless preserves the exact signal.
- Choosing an outdated codec (MP3) when Opus/AAC gives the same quality at lower bitrate.
