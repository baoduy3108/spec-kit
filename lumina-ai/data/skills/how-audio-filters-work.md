---
name: how-audio-filters-work
description: How audio filters and EQ work — boosting or cutting frequency ranges (low-pass, high-pass, band-pass, shelving, peaking), filters as frequency-domain shaping, and the time/frequency view via convolution. Use to understand EQ, audio filters, low-pass vs high-pass, cutoff and resonance, or how frequencies are shaped.
category: engineering
keywords_vi: bộ lọc âm thanh và eq hoạt động thế nào, tăng giảm dải tần, low-pass high-pass band-pass, shelving peaking, định hình miền tần số, cutoff resonance, convolution
---

# How Audio Filters and EQ Work

A filter shapes a sound by **boosting or attenuating certain frequency ranges** while leaving others alone. Equalization (EQ) is just a set of filters. Understanding filters means understanding audio in the **frequency domain** (see how-fourier-transform-works) — you're sculpting the spectrum (see how-digital-audio-works, how-reverb-and-effects-work).

## The Idea: Shape the Spectrum

Any sound is a mix of frequencies (see how-fourier-transform-works). A filter selectively changes **how much of each frequency** passes through — turning some up, some down, some off. This is done to remove unwanted content (rumble, hiss), fix tonal balance (too boomy/harsh), or creatively shape timbre. The filter's **frequency response** — a curve of gain vs frequency — *is* the filter.

## The Common Filter Types

- **Low-pass** — lets **low** frequencies through, attenuates **highs** above a **cutoff** frequency. Removes hiss/brightness, muffles. (A subwoofer feed is low-passed.)
- **High-pass** — lets **highs** through, cuts **lows** below the cutoff. Removes rumble/mud (a "low cut" on vocals).
- **Band-pass** — passes a **band** in the middle, cuts above and below (telephone/radio sound).
- **Band-stop / notch** — cuts a **narrow** band, passes the rest (kill 60 Hz hum).
- **Shelving** — boosts/cuts everything **above** (high shelf) or **below** (low shelf) a frequency by a fixed amount (bass/treble knobs).
- **Peaking / bell** — boosts or cuts a **band around a center** frequency (the mid bands of a parametric EQ).

## Cutoff, Slope, Q

- **Cutoff frequency** — where the filter starts acting (defined at the −3 dB point).
- **Slope / order** — how **steeply** it rolls off (dB per octave: 12/24 dB/oct). Steeper = more surgical but more phase disturbance.
- **Q (resonance)** — the **width** of a peaking/band filter (high Q = narrow, surgical; low Q = wide, musical). Resonant filters can also **emphasize** the cutoff region (the classic synth filter sweep).

## How Filters Actually Work (time vs frequency)

Two equivalent views (Fourier duality):
- **Frequency domain** — multiply the signal's spectrum by the filter's frequency response.
- **Time domain** — **convolve** the signal with the filter's impulse response. **FIR** filters use a finite impulse response (stable, linear phase, more compute); **IIR** filters use feedback (efficient, like analog, but can distort phase). This is why filtering and convolution are the same operation seen two ways.

A side effect: filters introduce **phase shift** (delaying some frequencies), which can matter when combining signals.

## Design Guidance

- **High-pass to clean up** — remove sub-bass rumble from most non-bass tracks.
- **Cut before boost** — attenuating problem frequencies often sounds cleaner than boosting.
- **Watch Q** — narrow cuts are surgical; wide, gentle moves are more musical.
- **Mind phase** — steep filters and combining filtered signals can cause phase cancellation.
- **Linear-phase (FIR)** when phase must be preserved (mastering); **minimal/IIR** when efficiency matters.

## Pitfalls (in understanding/using)

- **Over-EQing** (huge boosts) → unnatural, phasey sound; subtractive cuts are often better.
- Ignoring **phase shift** from filters → cancellation when mixing filtered signals.
- Confusing **cutoff** (where it acts) with **slope** (how steeply) and **Q** (how wide).
- Boosting to fix a problem that's really a **resonance** to cut.
- Expecting a filter to **add** frequencies that aren't there → it can only shape existing content.
- Very high **resonance** near cutoff → self-oscillation / harshness.
