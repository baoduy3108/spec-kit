---
name: how-emulators-work
description: How emulators and virtual machines execute code — interpreting a guest instruction set with an emulated CPU/registers/memory/devices, the fetch-decode-execute loop over guest opcodes, cycle accuracy, and speeding it up with dynamic recompilation (JIT). Use to understand emulators, bytecode VMs, and how one machine runs software built for another.
category: engineering
keywords_vi: emulator hoạt động thế nào, giả lập máy, virtual machine bytecode, thông dịch opcode, fetch decode execute guest, dynamic recompilation jit, hiểu emulator
---

# How Emulators & VMs Work

An emulator is a program that pretends to be another machine — it models that machine's CPU, memory, and devices in software so it can run the other machine's programs.

## The Core: Interpret the Guest's Instructions

The emulator holds the **guest state** in software: emulated **registers** (variables), an emulated **memory** (a big array), and a program counter. Then it runs a loop mirroring a real CPU:
1. **Fetch** the next guest instruction (opcode) from emulated memory at the PC.
2. **Decode** it — a big switch on the opcode determines the operation.
3. **Execute** — modify the emulated registers/memory to match what the real hardware would do (add, load, jump, etc.).
4. Advance (or jump) the PC; repeat.

This is the same fetch-decode-execute cycle a real CPU runs, but implemented in software over data structures. A **bytecode VM** (JVM, CPython, WASM runtime) is exactly this pattern for a *designed* instruction set rather than a physical chip.

## Emulating the Rest of the Machine

A full system emulator also models **devices** — the display (draw the emulated framebuffer to a window), input (map host keys to guest buttons), timers, sound, and memory-mapped I/O (reads/writes to certain addresses trigger device behavior). **Cycle accuracy** — matching the real hardware's exact timing — is what separates a "runs the ROM" emulator from a "runs it *correctly*, including timing-dependent tricks" one; it's the hard part for game console emulation.

## Making It Fast

Naive interpretation (a switch per instruction) can be 10–100× slower than native. **Dynamic recompilation / JIT** translates blocks of guest instructions into host machine code once, then runs the compiled block directly on repeat — the same JIT idea that speeds up language VMs. Modern emulators and VMs lean on this to reach near-native speed.

## Why It Matters

The pattern — model state + interpret an instruction set + optionally JIT hot paths — underlies retro-console emulators, the JVM/.NET/Python VMs, WebAssembly runtimes, and even CPU virtualization. Understanding it demystifies "how can this machine run software made for a totally different one."
