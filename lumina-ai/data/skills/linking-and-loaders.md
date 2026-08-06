---
name: linking-and-loaders
description: How separately compiled code becomes one runnable program — linking and loaders. Covers static vs dynamic linking, symbol resolution, the trade-offs (binary size, updates/security patching, "DLL hell"), how shared libraries are found at load time (rpath/LD_LIBRARY_PATH), position-independent code, and why a "symbol not found" error happens. Use to understand build/deploy of native code, container packaging, and linker errors.
category: systems-internals
keywords_vi: liên kết linking và loader biến các mã biên dịch riêng thành một chương trình chạy được, liên kết tĩnh static và động dynamic, phân giải ký hiệu symbol resolution, đánh đổi kích thước binary cập nhật vá bảo mật dll hell, tìm thư viện chia sẻ lúc nạp rpath ld_library_path, mã độc lập vị trí pic, lỗi symbol not found
---

# Linking & Loaders

You compile source files into object files, and you use libraries someone else compiled — but a CPU runs **one** program image. **Linking** is the step that stitches all that separately-compiled code into a runnable whole by **resolving symbols** (matching each "call `foo`" to the actual `foo`), and a **loader** brings the image (and any shared libraries) into memory to run. The big decision — **static vs dynamic** linking — shapes binary size, security patching, and deployment (see how-compilers-work, incremental-and-hermetic-builds, page-cache-and-memory-mapped-files).

## Symbol Resolution

Compiled code refers to functions/variables by **symbols** (names). An object file has **defined** symbols (things it provides) and **undefined** symbols (things it needs from elsewhere). The linker matches every undefined symbol to a definition across all object files and libraries. If a needed symbol is **missing**, you get the classic **"undefined reference" / "symbol not found"** error; if two libraries define the **same** symbol, you get a **duplicate symbol** / ODR-violation error. This matching is the linker's core job.

## Static vs Dynamic Linking (the central trade-off)

**Static linking** — copy the library's machine code **into** your executable at build time.
- ✅ **Self-contained**: one binary with no external runtime dependencies; deploys anywhere, no "missing library" at runtime; often faster startup (no load-time resolution).
- ❌ **Bigger binaries**; every program bundles its own copy of shared code; a **security fix in a library requires rebuilding and redeploying every** program that statically linked it.

**Dynamic linking** — reference a **shared library** (`.so`/`.dll`/`.dylib`) that's loaded at **runtime**.
- ✅ **Smaller binaries**; many programs **share one** in-memory copy (saves RAM/disk); a library security patch fixes **all** programs at once (just update the `.so`).
- ❌ Runtime dependency on the library being **present and compatible** → the failure modes: **"library not found"** at launch, or **"DLL hell"** — a program breaks because the shared library on the system is the wrong version (see dependency-hell). Slight load-time overhead.

The modern container/static-binary trend (Go static binaries, musl, distroless) often favors static/self-contained deployment for **reproducibility and easy packaging**, accepting bigger images to avoid runtime "it's not on this machine" surprises.

## How Shared Libraries Are Found (and PIC)

At load time the **dynamic loader** searches for each needed `.so`: via **rpath/runpath** baked into the binary, the `LD_LIBRARY_PATH` env var, the system cache (`ldconfig`), and standard dirs — a common source of "works here, not there" bugs. Shared libraries are compiled as **Position-Independent Code (PIC)** so they can be **loaded at any address** (and mapped/shared across processes via the page cache), which is also foundational for **ASLR** security.

## Design Guidance (for understanding/using)

- **Choose static for self-contained, reproducible deploys** (containers, single-binary tools) — no runtime "missing library" surprises; accept larger size.
- **Choose dynamic to share memory and patch a library once** for many programs (system packages, plugins) — but manage version compatibility.
- **Read linker errors precisely** — "undefined reference" = a symbol/library wasn't provided at link time; "not found at runtime" = the loader can't locate the `.so`.
- **Control library search** deliberately (rpath, not fragile `LD_LIBRARY_PATH`) so binaries find their deps predictably.
- **For security**, remember statically-linked libs need **every** dependent rebuilt to patch a CVE; track what's bundled.

## Pitfalls (in understanding/using)

- Confusing a **link-time** "undefined reference" (missing at build) with a **runtime** "library not found" (loader can't locate the `.so`) — different fixes.
- **DLL/shared-library hell** — a program breaks because the system's shared lib is the wrong version.
- Assuming a **statically-linked** binary is patched when you update the system library → it isn't; rebuild it.
- Relying on **`LD_LIBRARY_PATH`** hacks → fragile; bake correct rpath or link statically.
- Duplicate-symbol errors from linking a library **twice** (or two libs defining the same symbol).
