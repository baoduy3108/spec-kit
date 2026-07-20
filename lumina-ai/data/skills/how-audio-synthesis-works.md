---
name: how-audio-synthesis-works
description: How audio synthesis works — generating sound from scratch with oscillators (waveforms), shaping it with envelopes (ADSR) and filters, and the main methods (subtractive, additive, FM, wavetable, granular). Use to understand synthesizers, oscillators, ADSR envelopes, FM/subtractive synthesis, or how electronic sounds are made.
category: engineering
keywords_vi: tổng hợp âm thanh hoạt động thế nào, tạo âm từ đầu bằng oscillator dạng sóng, định hình bằng envelope adsr và filter, subtractive additive fm wavetable granular, synthesizer
---

# How Audio Synthesis Works

Synthesis is **generating sound from scratch** — creating waveforms electronically rather than recording them. A synthesizer builds a sound from **oscillators** (raw tone), shaped by **filters** (timbre) and **envelopes** (how it evolves over time). Understanding the building blocks explains every synth from a simple app to a modular rig (see how-audio-filters-work, how-digital-audio-works).

## The Building Blocks

- **Oscillator** — generates a repeating **waveform** at a pitch (frequency). Basic shapes have distinct timbres from their harmonic content (see how-fourier-transform-works):
  - **Sine** — pure, single frequency, no harmonics (soft).
  - **Sawtooth** — all harmonics, bright/buzzy (strings, brass, bass).
  - **Square/pulse** — odd harmonics, hollow/reedy (classic chiptune).
  - **Triangle** — few harmonics, mellow.
- **Filter** — shapes the timbre by cutting/emphasizing frequencies (see how-audio-filters-work); a resonant **low-pass** is the heart of most synth sounds.
- **Envelope (ADSR)** — controls how a parameter changes over a note's life: **Attack** (rise to peak), **Decay** (fall to sustain), **Sustain** (held level), **Release** (fade after key-up). Applied to **amplitude** (loudness contour — a pluck vs a pad) and often to the **filter** (brightness contour).
- **LFO (Low-Frequency Oscillator)** — a slow oscillator that **modulates** other parameters for movement: pitch (vibrato), amplitude (tremolo), filter (wah/wobble).

The signal flow is typically: **oscillator → filter → amplifier**, with **envelopes and LFOs modulating** along the way.

## The Main Synthesis Methods

- **Subtractive** — start with a **harmonically rich** waveform (saw/square) and **filter away** what you don't want. The classic analog approach; intuitive, warm. Most synths are subtractive at heart.
- **Additive** — build a sound by **adding many sine waves** (harmonics), controlling each — the direct inverse of Fourier analysis. Precise but complex.
- **FM (Frequency Modulation)** — one oscillator **modulates the frequency** of another, creating rich, complex, often metallic/bell-like harmonics from few oscillators (the DX7 sound). Powerful but unintuitive to program.
- **Wavetable** — scan through a **table of waveforms**, morphing timbre over time (modern digital synths).
- **Granular** — build sound from tiny **grains** of audio (often from samples), enabling clouds, textures, and time-stretching (see how-pitch-and-time-work).
- **Physical modeling** — simulate the **physics** of a real instrument (string, tube) mathematically.

## Design Guidance

- **Start subtractive** — saw/square + resonant low-pass + ADSR gets most classic sounds.
- **Envelope the filter**, not just amplitude, for expressive timbral movement (plucks, sweeps).
- **Waveform choice sets the harmonic starting point** — pick by the harmonics you want.
- **LFO for motion** — subtle modulation makes static synth sounds feel alive.
- **FM for metallic/bell/electric-piano** timbres subtractive struggles with.
- **Watch levels** — summing oscillators/harmonics can clip (see how-digital-audio-works).

## Pitfalls (in understanding/using)

- Expecting a **sine** oscillator to sound rich → it has no harmonics; start with saw/square for subtractive shaping.
- Only enveloping **amplitude** → static timbre; envelope the **filter** for life.
- Trying to program **FM** like subtractive → it's non-intuitive (modulator ratios/index), a different mental model.
- Over-stacking oscillators/harmonics → clipping and mud; manage gain.
- Forgetting **release** → notes cut off abruptly (or ring too long).
- Confusing **additive** (build from sines) with **subtractive** (filter down from rich waves).
