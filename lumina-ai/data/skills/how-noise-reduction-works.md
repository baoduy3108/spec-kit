---
name: how-noise-reduction-works
description: How audio noise reduction works — profiling steady background noise and subtracting it in the frequency domain (spectral subtraction/gating), the noise-vs-detail trade-off producing artifacts, and modern ML denoisers. Use to understand noise reduction, denoising, spectral subtraction, removing background hiss/hum, or why denoising adds artifacts.
category: engineering
keywords_vi: khử nhiễu âm thanh hoạt động thế nào, lập hồ sơ nhiễu nền ổn định, trừ trong miền tần số spectral subtraction, đánh đổi nhiễu vs chi tiết gây artifact, khử hiss hum, ml denoiser
---

# How Audio Noise Reduction Works

Noise reduction removes unwanted background sound — **hiss, hum, air-conditioning drone, room tone** — while trying to keep the **wanted** signal (voice, music) intact. The classic technique works in the **frequency domain**: figure out what the noise looks like, then **subtract** it. The eternal challenge is that noise and signal **share frequencies**, so removing one damages the other (see how-fourier-transform-works, how-audio-filters-work).

## The Classic Method: Profile, Then Subtract

Most traditional noise reduction assumes the noise is **relatively steady** (constant hiss/hum) and does:
1. **Learn a noise profile** — take a segment of **noise only** (a silent gap where just the background is present) and run an **FFT** (see how-fourier-transform-works) to measure **how much energy the noise has at each frequency** — its spectral fingerprint.
2. **Spectral subtraction** — for the whole recording, transform to the frequency domain and **subtract the noise profile** from each frame: wherever a frequency's energy is near the noise level, attenuate it (it's probably noise); where it's well above, keep it (it's probably signal). Then transform back to audio.
This is essentially a **frequency-dependent gate**: each frequency band is turned down when it's quiet enough to be "just noise."

## The Fundamental Trade-off: Noise vs Detail

Here's the catch: **noise and signal often occupy the same frequencies**. Subtracting noise inevitably removes some real signal too, and imperfect subtraction leaves residue. The trade-off:
- **Aggressive** reduction → cleaner background but **artifacts**: the notorious **"musical noise"** (random warbling tones), a **watery/underwater** timbre, and a **thin, robotic** voice (removed detail).
- **Gentle** reduction → natural sound but audible remaining noise.
There's no perfect separation — you're always balancing "how much noise to kill" against "how much the signal degrades." A little residual noise usually sounds better than heavy artifacts.

## Related Techniques

- **Noise gate** — simpler: silence the signal **below** a threshold (removes noise **between** phrases, but does nothing *during* speech). Good for gaps, not for noise riding along with the voice.
- **Adaptive filtering** — when you have a **reference** of the noise (e.g. a second mic capturing mostly noise), subtract the correlated part — the basis of active noise cancellation.
- **De-hum/notch** — for tonal noise (50/60 Hz mains hum), a **notch filter** (see how-audio-filters-work) removes the exact frequency and its harmonics.

## Modern ML Denoisers

Recent noise reduction uses **machine-learning models** (trained on paired noisy/clean audio) that **learn** to separate speech from noise far better than spectral subtraction — handling **non-stationary** noise (traffic, chatter, keyboard) and producing more natural results (RTX Voice, Krisp, etc.). They're the state of the art for real-time voice denoising, though they can still hallucinate/smear at extremes.

## Design Guidance

- **Capture a clean noise profile** (a second of noise-only) for spectral methods.
- **Reduce gently** — a little residual noise beats heavy musical-noise artifacts.
- **Fix the source first** — better mic/room/gain beats any denoiser (garbage in, garbage out).
- **Notch for tonal hum**, broadband reduction for hiss, **gate** for between-phrase silence.
- **ML denoisers** for tough non-stationary noise / real-time voice.
- **Listen critically** — check for watery/robotic artifacts on the wanted signal, not just the background.

## Pitfalls (in understanding/using)

- **Over-reduction** → musical noise, watery/robotic voice (removed real detail).
- Expecting to remove noise **sharing frequencies** with the signal cleanly → impossible; it's a trade-off.
- Using a **bad/short noise profile** → subtracts the wrong thing, damaging the signal.
- Relying on a **gate** for noise *during* speech → it only helps in the gaps.
- Thinking denoising is **lossless** → it always costs some signal fidelity.
- Fixing in post instead of **at the source** (mic/room) → far more effort, worse result.
