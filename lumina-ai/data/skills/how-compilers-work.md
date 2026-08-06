---
name: how-compilers-work
description: How compilers and interpreters process code — lexing (tokens), parsing (AST), semantic analysis, and then either interpreting the AST/bytecode or generating machine code, plus JIT compilation and the interpreter-vs-compiler trade-off. Use to understand how source code runs, what a syntax vs runtime error is, and how languages are implemented.
category: engineering
keywords_vi: compiler hoạt động thế nào, interpreter thông dịch, lexer parser ast, bytecode, jit compile, code chạy ra sao, ngôn ngữ lập trình hoạt động, hiểu compiler
---

# How Compilers & Interpreters Work

Both turn source text into behavior; they share a front end and differ at the back.

## Front End (shared)

1. **Lexing (tokenizing)** — the character stream becomes a list of **tokens** (`if`, `(`, identifier `x`, `>`, number `5`). A stray character here is a *lexical* error.
2. **Parsing** — tokens are assembled, per the grammar, into an **Abstract Syntax Tree (AST)** — a tree that captures structure (this `if` has this condition and this body). A malformed structure is a *syntax* error. Operator precedence lives here (why `2 + 3 * 4` groups the multiply first).
3. **Semantic analysis** — the AST is checked for meaning: types, scopes, declared-before-use, etc. Type errors surface here. A symbol table tracks names.

## Back End (the fork)

- **Interpreter** — walks the AST (or a compiled **bytecode**) and executes it directly. No separate build step; slower per operation; great for flexibility and fast iteration (Python, Ruby, JS reference impls). Errors can appear at runtime because code isn't fully checked ahead.
- **Compiler** — generates lower-level code: an **intermediate representation** is optimized, then **machine code** (or bytecode) is emitted. A separate build step; runs fast; catches many errors before running (C, Rust, Go).
- **Bytecode VM** — compile to portable bytecode, then interpret/JIT it on a virtual machine (JVM, CPython, .NET). Portability + speed middle ground.
- **JIT** — a runtime that starts interpreting, profiles hot paths, and compiles them to machine code on the fly (V8, JVM HotSpot) — combining fast startup with near-native steady-state speed.

## Why This Matters

- **Syntax error vs type error vs runtime error** map directly to parse / semantic-analysis / execution phases.
- **Optimization** (constant folding, inlining, dead-code elimination) happens on the IR — which is why compiled code can differ from a naive reading.
- **Compiled vs interpreted** is a spectrum, not a binary — most modern languages mix compilation, bytecode, and JIT. The AST is the pivot everything hangs on (which is also how linters, formatters, and codemods work — they operate on the AST).
