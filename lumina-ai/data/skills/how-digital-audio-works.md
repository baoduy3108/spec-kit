---
name: how-digital-audio-works
description: How digital audio works — representing a continuous sound wave as numbers via sampling (sample rate) and quantization (bit depth), PCM, dynamic range, and why these parameters determine quality and file size. Use to understand digital audio, sample rate vs bit depth, PCM, why 44.1kHz/16-bit, or audio quality vs size.
category: engineering
keywords_vi: âm thanh số hoạt động thế nào, biểu diễn sóng âm liên tục bằng số, sample rate tần số lấy mẫu, bit depth độ sâu bit, pcm, dải động, chất lượng vs kích thước
---

# How Digital Audio Works

Digital audio is the representation of a **continuous sound wave as a stream of numbers**. Sound is a continuous pressure wave; a computer can only store discrete numbers — so we **sample** the wave's amplitude at regular intervals and **round** each sample to a number. Two parameters — **sample rate** and **bit depth** — define the fidelity and the file size (see how-sampling-and-aliasing-works, how-audio-codecs-work).

## From Wave to Numbers: Sampling + Quantization

- **Sampling** — measure the wave's amplitude at a fixed rate (the **sample rate**, in Hz). CD audio = **44,100 samples/second** (44.1 kHz). Each sample is a snapshot of the wave's height at that instant.
- **Quantization** — each sampled amplitude is **rounded** to one of a fixed set of levels, determined by the **bit depth**. 16-bit = 2¹⁶ = 65,536 possible levels per sample.
The raw result — a sequence of amplitude numbers — is **PCM (Pulse-Code Modulation)**, the uncompressed foundation all audio formats build on.

## Sample Rate: How Often

Sample rate sets the **highest frequency** you can capture. By the Nyquist theorem (see how-sampling-and-aliasing-works), you can only represent frequencies up to **half** the sample rate. Human hearing tops out ~20 kHz, so **44.1 kHz** (Nyquist ~22 kHz) covers it — that's why CDs use it. Higher rates (48/96/192 kHz) are used in production for headroom, not because humans hear more.

## Bit Depth: How Precisely

Bit depth sets the **precision** of each sample and thus the **dynamic range** (quietest to loudest):
- More bits = finer amplitude steps = lower **quantization noise** (the error from rounding).
- Each bit ≈ **6 dB** of dynamic range: **16-bit** ≈ 96 dB (CD quality), **24-bit** ≈ 144 dB (studio, more headroom to avoid clipping while mixing).
Too few bits → audible quantization noise/graininess, especially in quiet passages.

## Quality vs File Size

Uncompressed size = **sample rate × bit depth × channels × duration**. CD stereo = 44100 × 16 × 2 ≈ **1.4 Mbit/s** (~10 MB/min). This is why **compression** (codecs — see how-audio-codecs-work) exists: MP3/AAC (lossy) throw away inaudible detail for ~10× smaller; FLAC (lossless) packs it smaller with no loss. The trade-off is always fidelity vs size.

## Design Guidance

- **44.1/48 kHz, 16-bit** is plenty for **delivery/listening**; higher is for **production headroom**.
- **Record/produce at 24-bit** to leave headroom (avoid clipping); deliver at 16-bit.
- **Avoid clipping** — samples exceeding the max level are hard-limited to the ceiling → harsh distortion (irreversible).
- **Match sample rates** across a project to avoid resampling artifacts.
- **Uncompressed (PCM/WAV)** for editing; **lossy** only for final delivery (don't re-encode lossy repeatedly — generation loss).

## Pitfalls (in understanding/using)

- Thinking **higher sample rate = audibly better** for listening → beyond ~48 kHz, humans can't hear the difference; it's for production.
- **Clipping** by exceeding 0 dBFS → permanent harsh distortion; leave headroom.
- Confusing **sample rate** (frequency range) with **bit depth** (dynamic range/precision) — different axes.
- Re-encoding **lossy→lossy** repeatedly → cumulative generation loss.
- Ignoring **quantization noise** at low bit depths (dithering helps mask it).
- Forgetting **channels** double the data (stereo = 2× mono).
