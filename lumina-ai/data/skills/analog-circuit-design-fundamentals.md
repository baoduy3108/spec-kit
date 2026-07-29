---
name: analog-circuit-design-fundamentals
description: Analog circuit fundamentals — Ohm's and Kirchhoff's laws, voltage dividers, RC/RL circuits and time constants, impedance and filters, diodes and transistors, and op-amps (amplifiers, feedback). Use when analyzing or designing analog electronic circuits, understanding electronics basics, or reasoning about voltage, current, and signals.
category: knowledge
keywords_vi: mạch điện tử tương tự, định luật ohm và kirchhoff, chia áp voltage divider, mạch rc rl, hằng số thời gian, trở kháng và bộ lọc, diode và transistor, khuếch đại thuật toán op-amp
---

# Analog Circuit Design Fundamentals

Analog electronics deals with **continuous signals** — voltages and currents that vary smoothly (vs digital's discrete 0/1). Understanding the core laws and components lets you analyze and design circuits that sense, amplify, filter, and process real-world signals. These fundamentals underlie all electronics.

## The Foundational Laws

- **Ohm's Law** — **V = I × R** (voltage = current × resistance). The single most-used relation; governs how voltage, current, and resistance relate in any resistive element.
- **Kirchhoff's Current Law (KCL)** — the sum of currents into a node equals the sum out (charge conserved).
- **Kirchhoff's Voltage Law (KVL)** — the sum of voltage drops around any closed loop is zero (energy conserved).
- **Power** — **P = V × I = I²R**. Governs heating and component ratings.

KCL, KVL, and Ohm's law together let you solve any resistive network. They're the bedrock of circuit analysis.

## Voltage Dividers & Basic Networks

- **Voltage divider** — two series resistors split voltage proportionally (Vout = Vin × R2/(R1+R2)). Ubiquitous for setting reference voltages, scaling signals, biasing.
- **Series vs parallel** — series resistances add; parallel combine as reciprocals (1/Rtotal = 1/R1 + 1/R2). Knowing how to reduce networks is core skill.
- **Thevenin/Norton equivalents** — any linear network reduces to a simple source + resistance, simplifying analysis.

## RC/RL Circuits & Time Constants

Capacitors and inductors introduce **time and frequency dependence**:
- **Capacitors** store charge (resist voltage change); **inductors** store magnetic energy (resist current change).
- **RC time constant** τ = R×C — the characteristic time for charging/discharging (~63% per τ, ~5τ to settle). Governs timing, smoothing, and transient response.
- These reactive elements make circuits respond differently to different **frequencies** — the basis of filtering.

## Impedance & Filters

- **Impedance (Z)** — the AC generalization of resistance, frequency-dependent and complex (capacitors/inductors have reactance that varies with frequency).
- **Filters** — circuits that pass some frequencies and block others:
  - **Low-pass** (passes low frequencies — smoothing, anti-aliasing), **high-pass** (passes high — blocking DC), **band-pass**, **band-stop**.
  - A simple RC low-pass has a **cutoff frequency** f = 1/(2πRC). Filtering is fundamental to signal conditioning (see signal-processing).

## Semiconductors: Diodes & Transistors

- **Diodes** — one-way current valves (rectification AC→DC, protection, LEDs, voltage references/Zeners).
- **Transistors (BJT, MOSFET)** — the workhorses: act as **switches** (digital, power) or **amplifiers** (small signal controls large). Understanding biasing (setting the operating point) and the switch/amplify modes is central to active circuit design.

## Op-Amps (Operational Amplifiers)

The versatile building block of analog design:
- **Ideal op-amp** — infinite gain, infinite input impedance, zero output impedance. Real ones approximate this.
- **Negative feedback** — feeding output back to the inverting input creates predictable, stable behavior. The two "golden rules" (no current into inputs; inputs driven equal by feedback) let you analyze most op-amp circuits by inspection.
- **Configurations** — inverting/non-inverting amplifiers (set gain by resistor ratios), buffers (unity-gain isolation), summers, integrators, differentiators, comparators, and active filters.
- **Feedback** (a theme across engineering — see control-systems) tames gain into precise, stable function.

Analyze and design analog circuits using **Ohm's and Kirchhoff's laws** as the foundation, **voltage dividers** and network reduction, **RC/RL time constants** for timing and transients, **impedance and filters** for frequency behavior, **diodes and transistors** as valves/switches/amplifiers, and **op-amps with negative feedback** as the versatile precision building block. Master these and you can reason about the continuous-signal circuits underlying all electronics.
