---
name: how-pitch-and-time-work
description: How pitch shifting and time stretching work — changing pitch without changing speed (or vice versa) by separating a sound's frequency content from its timing, via phase vocoder or granular methods, and why artifacts appear. Use to understand pitch shifting, time stretching, autotune, why speeding audio raises pitch, or phase vocoder/granular.
category: engineering
keywords_vi: pitch shift, time stretch, phase vocoder, đổi cao độ, kéo giãn thời gian, formant preservation, đổi pitch không đổi tốc độ, autotune
---

# How Pitch Shifting and Time Stretching Work

Two closely related audio tricks: **time stretching** changes a sound's **duration** without changing its **pitch**, and **pitch shifting** changes its **pitch** without changing its **duration**. These feel like they should be simple but are genuinely hard, because in a raw recording **pitch and time are entangled** (see how-fourier-transform-works, how-digital-audio-works).

## Why It's Hard: Pitch and Time Are Coupled

The naive way to change speed is to **play samples faster or slower** — but that changes **both** at once (like a vinyl record or tape: speed it up and it plays faster *and* higher, the "chipmunk" effect). That's because playing samples faster compresses every wave cycle, raising frequency. To change **one without the other**, you must **decouple** the sound's **frequency content** (what determines pitch/timbre) from its **timing** (how it evolves) — and that requires analyzing and rebuilding the signal, not just resampling it.

## The Core Approaches

**Phase vocoder (frequency-domain):**
1. Break the audio into overlapping short windows and run an **FFT** on each (see how-fourier-transform-works) → a series of spectral "frames" describing the frequencies present over time.
2. To **time-stretch**, **space the frames further apart** (or interpolate more of them) when resynthesizing — the frequency content is preserved, only the timing spreads out. To **pitch-shift**, time-stretch then **resample** (or shift the frequency bins).
3. Carefully manage the **phase** between frames so the reconstructed waves line up (this is the hard part — bad phase handling causes the tell-tale "phasey/smeared" artifacts).

**Granular (time-domain):**
- Chop the audio into tiny **grains** and **repeat or skip** grains to stretch/compress time, or **respace** them. Simpler, but can sound grainy/warbly. Related to granular synthesis (see how-audio-synthesis-works).

**Resampling** — just changing pitch *and* time together (the simple case), used when you *want* both to move.

## Why Artifacts Appear

Because you're **inventing information** that wasn't in the original (stretching creates time that didn't exist; the algorithm guesses), artifacts are inherent — especially at **extreme** ratios:
- **Transient smearing** — sharp attacks (drum hits, consonants) get blurred because windowed analysis spreads them in time.
- **Phasiness / metallic** artifacts — imperfect phase coherence in the phase vocoder.
- **Warbling** — granular repetition.
Good algorithms (transient preservation, formant handling) reduce these, but there's no free lunch: the more you stretch/shift, the worse it gets.

## Applications

- **Music production** — fit a loop to tempo (time-stretch), harmonize/transpose (pitch-shift).
- **Autotune / pitch correction** — detect the sung pitch and shift it to the nearest note.
- **Formant preservation** — shifting pitch naively also shifts **formants** (vocal resonances), making voices sound chipmunk/monster; good pitch-shifters preserve formants for natural voices.
- **Speed listening** — podcasts at 1.5× without chipmunk pitch.

## Pitfalls (in understanding/using)

- Expecting to change pitch **or** time cleanly by just **resampling** → that changes **both** (chipmunk effect).
- **Extreme** stretch/shift ratios → smeared transients, phasiness, warble; artifacts scale with the amount.
- Pitch-shifting voices **without formant preservation** → unnatural chipmunk/monster timbre.
- Blurred **transients** (drums, consonants) → mushy attacks; use transient-aware algorithms.
- Assuming it's **lossless** → you're synthesizing data that wasn't there; quality always degrades somewhat.
- Confusing **time-stretch** (duration, pitch fixed) with **pitch-shift** (pitch, duration fixed) with **resample** (both).
