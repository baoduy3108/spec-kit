---
name: ac-circuits-and-impedance
description: AC circuits (advanced/chuyên physics) — alternating current, RMS values, resistors/capacitors/inductors in AC, reactance and impedance, phasors, RLC series circuits, resonance, and power in AC. Use for advanced/gifted-exam AC electricity, impedance, RLC circuits, resonance, or điện xoay chiều.
category: knowledge
keywords_vi: mạch điện xoay chiều chuyên lý, dòng điện xoay chiều và giá trị hiệu dụng rms, điện trở tụ điện cuộn cảm trong mạch ac, dung kháng cảm kháng và tổng trở, giản đồ vector phasor, mạch rlc nối tiếp, hiện tượng cộng hưởng, công suất điện xoay chiều
---

# AC Circuits & Impedance (Advanced Physics)

Alternating current (AC) circuits — where voltage and current oscillate sinusoidally — are a major, quantitative topic in advanced/gifted-exam (chuyên) physics (điện xoay chiều). Unlike DC, capacitors and inductors behave frequency-dependently, and current and voltage can be out of phase, making the analysis richer.

## Alternating Current & RMS

- **AC** — voltage/current vary sinusoidally: u = U₀cos(ωt + φ), with **angular frequency ω = 2πf**.
- **RMS (root-mean-square)** values — the effective values that deliver the same power as DC: **U = U₀/√2**, I = I₀/√2. Meters read RMS; power calculations use RMS. A key concept.

## Components in AC

Each component responds differently:
- **Resistor** — current in phase with voltage; opposition = resistance R.
- **Capacitor** — current **leads** voltage by 90°; opposition = **capacitive reactance** X_C = 1/(ωC) (blocks low frequencies/DC, passes high).
- **Inductor** — current **lags** voltage by 90°; opposition = **inductive reactance** X_L = ωL (blocks high frequencies, passes low/DC).

The phase shifts and frequency-dependent reactances are what make AC distinct.

## Impedance & Phasors

- **Impedance (Z)** — total opposition in AC, combining resistance and reactance: for a series RLC, **Z = √(R² + (X_L − X_C)²)**. Ohm's law generalizes: U = I·Z.
- **Phasors** — represent sinusoidal quantities as rotating vectors; voltages across R, L, C add *as vectors* (accounting for phase), which is why they combine via the Pythagorean-like formula, not simple addition.
- **Phase angle** — tan φ = (X_L − X_C)/R gives the phase between current and total voltage.

## RLC Series Circuits

Combining R, L, C in series:
- Total impedance Z = √(R² + (X_L − X_C)²); current I = U/Z; voltages across each component add as phasors.
- The interplay of X_L (rising with f) and X_C (falling with f) determines whether the circuit is inductive or capacitive at a given frequency.

## Resonance

The signature phenomenon:
- **Resonance** occurs when **X_L = X_C**, i.e. at **ω₀ = 1/√(LC)**. Then impedance is minimized (Z = R), current is **maximized**, and voltage and current are in phase.
- At resonance the circuit responds most strongly to that frequency — the basis of radio tuning, filters, and oscillators (see oscillations-and-waves for the resonance concept). A heavily-tested topic.

## Power in AC

- **Average power** P = U·I·cos φ, where **cos φ** is the **power factor**. Only the resistive part dissipates power; pure reactance (L, C) stores and returns energy without net dissipation.
- Maximizing power transfer relates to the power factor and resonance.

Master AC circuits via **alternating current and RMS values** (effective quantities), the **frequency-dependent behavior of R, L, C** (reactances X_L = ωL, X_C = 1/ωC, and their ±90° phase shifts), **impedance and phasors** (Z = √(R²+(X_L−X_C)²), vector addition of voltages), **RLC series analysis**, **resonance** (X_L = X_C at ω₀ = 1/√(LC), maximum current), and **AC power** (P = UIcos φ, power factor). The core insight — reactance and phase make AC frequency-dependent — is exactly the depth gifted-exam physics demands.
