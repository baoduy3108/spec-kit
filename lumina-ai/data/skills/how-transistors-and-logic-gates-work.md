---
name: how-transistors-and-logic-gates-work
description: How computers are built from the ground up — transistors as electrical switches, combining them into logic gates (AND/OR/NOT/NAND), gates into adders and memory (flip-flops), and up to CPUs. Explains why everything is binary. Use to understand transistors, logic gates, how hardware computes, or the physical basis of computing.
category: engineering
keywords_vi: transistor logic gate hoạt động thế nào, cổng logic, công tắc điện, and or not nand, mạch cộng adder, flip-flop bộ nhớ, tại sao máy tính dùng nhị phân
---

# How Transistors & Logic Gates Work

Everything a computer does — arithmetic, memory, running programs — is built up from one humble component: the **transistor**, a tiny electrical switch. Understanding the bottom layer demystifies why computers are binary and how "just switches" become computation.

## The Transistor: a Switch

A transistor is a switch with no moving parts: a small voltage on its **control** terminal turns the flow of current between its other two terminals **on or off**. That's it. Because a switch has two states (on/off, current/no-current), it naturally represents **one bit** — 1 or 0. This is why computers are **binary**: it's the most reliable thing to build from switches (two clearly distinguishable states resist noise). Modern chips pack **billions** of these switches.

## Logic Gates: Combining Switches

Wire transistors together and you get **logic gates** — circuits that compute a boolean function of their inputs:
- **NOT** (inverter) — output is the opposite of the input.
- **AND** — output 1 only if both inputs are 1.
- **OR** — output 1 if either input is 1.
- **NAND / NOR / XOR** — other combinations.
Remarkably, **NAND (or NOR) alone is universal** — any logic function can be built from NAND gates. So the entire logical capability of a computer reduces to wiring one kind of gate.

## From Gates to Arithmetic

Combine gates and you get useful circuits:
- An **adder** — XOR gives the sum bit, AND gives the carry; chain **full adders** to add multi-bit numbers. Now switches do arithmetic.
- **Multiplexers, comparators, shifters** — selection and comparison.
Assemble these into an **ALU** (Arithmetic Logic Unit), the part of a CPU that computes (see how-cpus-work).

## From Gates to Memory

Feed a gate's output back into its input and you can build a circuit that **holds a state** — a **latch/flip-flop** stores one bit stably until told to change. Arrays of these make **registers** and SRAM (see how-dram-works for the capacitor-based alternative). So the same building blocks give both computation *and* memory.

## The Layers of Abstraction

The whole tower stands on this base: transistors → gates → adders/registers → CPU datapath → machine instructions → assembly → high-level languages → applications. Each layer hides the one below. This is the central idea of computing — **abstraction** — and why a programmer never thinks about transistors, yet every line of code ultimately flips billions of them.

## Pitfalls (in understanding/using)

- Thinking binary is arbitrary — it's the natural, noise-resistant encoding for two-state switches.
- Confusing logic gates (combinational, no memory) with flip-flops (sequential, hold state).
- Missing that memory and computation come from the **same** primitive (feedback vs feed-forward wiring).
- Believing higher abstraction layers escape the base — performance ultimately maps down to real gates/clock cycles (see how-cpus-work).
- Overlooking that "universal gate" (NAND) means all complexity is built from one simple, repeated element.
