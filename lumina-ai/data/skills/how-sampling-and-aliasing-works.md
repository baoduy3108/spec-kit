---
name: how-sampling-and-aliasing-works
description: How sampling and aliasing work — the Nyquist theorem (sample at 2× the highest frequency), what aliasing is (high frequencies masquerading as low ones when undersampled), and anti-aliasing filters. Use to understand the Nyquist rate, aliasing, why sample rate matters, anti-aliasing filters, or sampling artifacts in audio/graphics.
category: engineering
keywords_vi: lấy mẫu và aliasing hoạt động thế nào, định lý nyquist gấp đôi tần số cao nhất, aliasing tần số cao giả dạng tần số thấp, khi lấy mẫu thiếu, bộ lọc chống aliasing
---

# How Sampling and Aliasing Work

When you convert a continuous signal (sound, light) into discrete samples, there's a hard limit on what you can capture — and violating it causes **aliasing**, where high frequencies **masquerade as false low frequencies**, corrupting the signal irreversibly. The **Nyquist theorem** defines the rule, and **anti-aliasing filters** enforce it (see how-digital-audio-works, how-fourier-transform-works).

## The Nyquist Theorem: Sample at 2× the Highest Frequency

To faithfully capture a signal containing frequencies up to **F**, you must sample at a rate of **at least 2F** (the **Nyquist rate**). Equivalently, a given sample rate can only represent frequencies up to **half** of it (the **Nyquist frequency**). Example: to capture audio up to 20 kHz (human hearing limit), you need ≥40 kHz sampling — hence CD's **44.1 kHz** (Nyquist ~22 kHz). Below the Nyquist rate, the samples **don't contain enough information** to reconstruct the wave — and worse, they actively lie.

## Aliasing: High Frequencies Pretending to Be Low

If a signal contains frequencies **above** the Nyquist frequency and you sample anyway, those too-high frequencies don't just disappear — they **"fold" back** and appear as **lower** frequencies that weren't there. The classic visual: a car wheel spinning fast appears to spin **slowly or backward** on film (the frame rate undersamples the rotation) — that's aliasing. In audio, an ultrasonic tone sampled too slowly produces an audible false tone. The damage is **irreversible**: once aliased, the true and false frequencies are indistinguishable in the samples; you can't remove it afterward.

## Anti-Aliasing Filters: Remove Before Sampling

Since aliasing can't be fixed after sampling, you must **prevent** it: apply a **low-pass anti-aliasing filter** *before* the sampler to remove frequencies above the Nyquist frequency. Then whatever's left is safely within the limit. This is why every analog-to-digital converter has an anti-aliasing filter in front of it. The filter can't be perfect (infinitely steep), which is part of why sample rates leave a little margin (44.1 kHz for 20 kHz audio gives room for the filter to roll off).

## Beyond Audio

Aliasing appears anywhere sampling happens:
- **Graphics** — jagged edges ("jaggies") and moiré patterns are spatial aliasing; **anti-aliasing** (supersampling, MSAA) smooths them by sampling/filtering.
- **Images/photography** — moiré on fine patterns; cameras use optical low-pass filters.
- **Video** — the wagon-wheel effect; temporal aliasing.
The principle is universal: **filter out detail finer than your sampling can represent, before you sample.**

## Design Guidance

- **Sample at ≥2× the highest frequency** of interest (with margin for the filter).
- **Always anti-alias filter before sampling/downsampling** — you can't fix aliasing later.
- When **downsampling** (reducing rate), low-pass filter first to the new Nyquist limit.
- In graphics, **anti-alias** (supersample/MSAA/FXAA) to avoid jaggies/moiré.
- Leave **headroom** — real filters aren't infinitely steep.

## Pitfalls (in understanding/using)

- **Undersampling** (below Nyquist) → aliasing that's **permanent** and unfixable.
- **Downsampling without pre-filtering** → introduces aliasing (a very common bug).
- Believing you can **remove aliasing after** the fact → you can't; true and false frequencies are merged.
- Thinking a **higher sample rate alone** fixes it → you still need the anti-alias filter (and content must be band-limited).
- Ignoring **spatial/temporal** aliasing in images/video (moiré, wagon-wheel).
- Forgetting margin for the **non-ideal filter** (why 44.1 kHz, not exactly 40 kHz).
