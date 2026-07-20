---
name: calling-conventions-and-abi
description: How calling conventions and the ABI work — the low-level contract for how functions pass arguments (registers/stack), return values, who saves registers, and stack frame layout, plus why the ABI matters for linking, FFI, and binary compatibility. Use to understand calling conventions, ABI, stack frames, FFI/interop, or why binaries must agree on the interface.
category: engineering
keywords_vi: calling convention và abi, hợp đồng gọi hàm mức thấp, truyền tham số qua thanh ghi hay stack, giá trị trả về, ai lưu thanh ghi, bố cục stack frame, ffi tương thích nhị phân
---

# Calling Conventions and the ABI

When one function calls another at the machine level, both sides must **agree exactly** on how arguments are passed, where the return value goes, and who is responsible for what. That agreement is the **calling convention**, part of the broader **ABI (Application Binary Interface)**. It's invisible in high-level code but essential to understand for **FFI/interop, linking, debugging crashes, and binary compatibility** (see how-compilers-work, how-cpu-caches-work).

## What a Calling Convention Specifies

At the CPU level, a function call is just a jump — there are no "parameters." The calling convention defines the **contract** that makes it work:
- **Argument passing** — which arguments go in which **CPU registers** (fast), and which spill onto the **stack** (when there are too many). E.g. the x86-64 System V ABI passes the first several integer args in specific registers (rdi, rsi, rdx, ...).
- **Return value** — which register holds the result (e.g. rax).
- **Register saving** — who preserves registers across the call:
  - **Caller-saved (volatile)** — the caller must save these if it needs them after the call (the callee may clobber them).
  - **Callee-saved (non-volatile)** — the callee must restore these to their original values before returning.
  This split avoids saving *everything* on every call.
- **Stack management** — how the stack frame is set up/torn down and who cleans up the arguments.

## The Stack Frame

Each function call gets a **stack frame** — a region of the call stack holding its local variables, saved registers, the **return address** (where to resume in the caller), and spilled arguments. Frames stack up as calls nest and pop as they return (LIFO). Key elements:
- **Return address** — pushed by the call so the callee knows where to go back. **Overwriting it** (buffer overflow) is the basis of classic stack-smashing exploits.
- **Frame/base pointer and stack pointer** — track the current frame; how the debugger reconstructs a **backtrace**.
- **Stack grows** (usually downward) with each call; unbounded recursion → **stack overflow**.

## The ABI: The Bigger Contract

The **ABI** is the full binary-level interface, of which the calling convention is one part. It also fixes:
- **Data type sizes and alignment** (how big is a `long`, how are structs laid out/padded).
- **Name mangling** (how symbol names are encoded, notably for C++ overloading).
- **Object file / executable format** and how symbols link.
Two pieces of compiled code can only interoperate if they share the **same ABI**. This is why:
- **FFI / interop** — calling C from Python/Rust/Go works because everyone agrees on the **C ABI** (the lingua franca of interop).
- **Linking** — separately compiled objects link only if their ABIs match.
- **Binary compatibility** — changing a struct layout or function signature can **break the ABI**, so existing binaries/plugins crash even without source changes ("ABI break").

## Why It Matters

- **FFI** — to call across languages, you conform to a shared calling convention/ABI (usually C's).
- **Debugging** — stack traces, core dumps, and crash analysis rely on understanding frames and conventions.
- **Security** — stack-smashing exploits target the return address in the frame; mitigations (stack canaries, ASLR, shadow stacks) protect it.
- **Library versioning** — maintainers guard the ABI carefully so updates don't break dependents.

## Pitfalls (in understanding/using)

- **Mismatched calling conventions/ABIs** across compiled units → crashes, corrupted arguments, or link errors (a classic FFI bug).
- Assuming languages interop directly → you must go through a **shared ABI** (usually C) and marshal data.
- Breaking the **ABI** (reordering struct fields, changing a signature) → existing binaries/plugins break even though source "looks compatible."
- Ignoring **struct layout/alignment/padding** differences across platforms/compilers in FFI.
- Not respecting **callee-saved** registers in hand-written assembly → subtle corruption.
- Confusing **API** (source-level compatibility) with **ABI** (binary-level compatibility) — you can keep one while breaking the other.
