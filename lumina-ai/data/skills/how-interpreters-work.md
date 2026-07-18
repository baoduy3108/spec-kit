---
name: how-interpreters-work
description: How interpreters work — tokenizing and parsing source into an AST, tree-walking vs bytecode interpretation, a virtual machine executing bytecode, the read-eval loop, and how JIT compilation bridges to native speed. Use to understand interpreters, how languages like Python/JS run, bytecode VMs, or interpreter vs compiler.
category: engineering
keywords_vi: interpreter, trình thông dịch, thông dịch, bytecode máy ảo, máy ảo vm, tree walking, jit compilation, thông dịch vs biên dịch
---

# How Interpreters Work

An interpreter executes source code **directly**, without first producing a standalone native binary. It's how Python, Ruby, JavaScript, and many others run. Understanding it demystifies "what happens when I run my script" and clarifies the interpreter-vs-compiler distinction.

## The Front End (shared with compilers)

First, source text becomes a structure the machine can execute (see how-compilers-work):
1. **Lexing/tokenizing** — split characters into tokens (`x`, `=`, `10`, `+`).
2. **Parsing** — build an **Abstract Syntax Tree (AST)** capturing structure (this `+` has these two operands), enforcing grammar.
The difference from a compiler is what happens *next*: an interpreter *runs* this representation instead of emitting machine code.

## Tree-Walking Interpreter (simplest)

Directly **recurse over the AST**, evaluating each node: to evaluate `a + b`, evaluate `a`, evaluate `b`, add. Simple to write and great for understanding, but **slow** — every operation involves pointer-chasing the tree and dispatching on node type repeatedly.

## Bytecode + Virtual Machine (what real interpreters do)

Most production interpreters **compile the AST to bytecode** — a compact, linear sequence of instructions for a **virtual machine** (a made-up simple "CPU"), e.g. `LOAD a`, `LOAD b`, `ADD`, `STORE c`. A **VM** then loops:
```
while True:
    op = bytecode[pc]; pc += 1
    dispatch(op)     # a big switch on opcode
```
This is far faster than tree-walking (linear, cache-friendly, cheaper dispatch) and portable (the same bytecode runs anywhere the VM runs). CPython, the JVM, and V8's baseline all work this way. Often the VM is a **stack machine** (operands on a stack) for simplicity.

## The REPL / Eval Loop

An interactive interpreter is a **Read-Eval-Print Loop**: read a line, parse+compile it, evaluate in the current environment, print the result — the same pipeline, incrementally.

## JIT — Bridging to Native Speed

Pure interpretation has overhead per instruction. A **Just-In-Time compiler** watches which code runs **hot** (loops, frequent functions) and compiles *those* to native machine code at runtime, using observed types for optimization. This is how V8 (JS) and PyPy get near-native speed — interpret cold code, JIT-compile hot code. The trade-off: warm-up time and complexity.

## Interpreter vs Compiler

Not a hard line — most "interpreted" languages compile to bytecode first, and JITs compile to native at runtime. The real spectrum is *when* and *to what* you translate. Compiled-to-native (C, Rust) → fastest, no runtime translation; interpreted → more flexible/portable, easier dynamic features, slower per-op.

## Pitfalls (in understanding/using)

- Thinking "interpreted = no compilation" — most interpret **bytecode** they compiled from source.
- Blaming the interpreter for slowness that's really per-operation overhead in a hot loop (vectorize, use native libraries, or a JIT).
- Confusing the AST (structure) with bytecode (executable instructions).
- Expecting a REPL's incremental state to match a fresh script run (leftover bindings).
- Ignoring that dynamic typing costs the VM extra work per op (types checked at runtime).
