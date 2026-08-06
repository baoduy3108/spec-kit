---
name: how-source-maps-work
description: How source maps work — a mapping file that lets debuggers translate minified/transpiled/bundled production code back to the original source, so you debug readable code and get meaningful stack traces. Use to understand source maps, debug minified code, map production errors to original source, or why stack traces point to bundled files.
category: engineering
keywords_vi: source map, bản đồ nguồn, ánh xạ code minified về source gốc, debug code đã nén, stack trace về đúng dòng gốc, transpile bundle, gỡ lỗi production
---

# How Source Maps Work

A source map is a file that **maps compiled/minified/bundled code back to the original source**, so that when you debug production code or read an error stack trace, you see your **readable original code** — correct file names, line numbers, and even original variable names — instead of an unreadable minified blob. It's the bridge that makes debugging transformed code possible (see web-build-tools-and-bundlers).

## The Problem: Production Code Isn't What You Wrote

Before shipping, front-end code is **transformed**: TypeScript/JSX is **transpiled** to JavaScript, many files are **bundled** into one, and everything is **minified** (whitespace stripped, variables renamed to single letters, code mangled) for size. The result — `a.b=function(c){return c.d}` in one giant `bundle.min.js` — is what runs in the browser, but it's **unreadable** and bears no obvious relation to your source. So a production error stack trace points to `bundle.min.js:1:45123` — useless for debugging. Source maps solve this.

## The Core Idea: A Mapping From Generated to Original

A source map (`.map` file) is a JSON document containing a **mapping** between positions in the **generated** code and positions in the **original** source:
- For a given line/column in the minified output, it records the **original file, line, and column** (and sometimes the original variable name).
- The mappings are stored compactly using **VLQ-encoded** segments (a space-efficient encoding of the position deltas), which is why a source map isn't human-readable itself.

When a **debugger or browser dev tools** loads the minified code, it also loads the source map and uses it to **display the original source** and translate positions — so you set breakpoints and read stack traces in **your** code, even though the browser is actually running the minified version.

## How It's Linked

The generated file references its map, usually via a comment at the end:
`//# sourceMappingURL=bundle.min.js.map`
The browser fetches the map when dev tools are open. Build tools (webpack, Vite, esbuild, TypeScript) generate these maps automatically.

## Uses

- **Debugging in dev tools** — breakpoints, stepping, and variable inspection in original source.
- **Meaningful production error tracking** — error-monitoring services (Sentry, etc.) use uploaded source maps to **symbolicate** minified stack traces back to your real code, so a production crash shows the actual file and line.

## Security Consideration

A source map effectively **contains your original source code**. If you publicly serve `.map` files, anyone can reconstruct your un-minified source. Options:
- **Don't publish** source maps publicly (generate them, but restrict access or upload only to your error tracker).
- Or accept it (for open-source / non-sensitive front-end code).
Never let source maps **leak secrets** — but secrets shouldn't be in front-end code anyway.

## Pitfalls (in understanding/using)

- **Not generating** source maps for production → error trackers show useless minified stack traces.
- **Publicly serving** `.map` files unintentionally → exposes your original source code.
- **Stale/mismatched** maps (map doesn't match the deployed bundle) → debugger points to the wrong lines; version them with the build.
- Forgetting to **upload** maps to your error-monitoring service → no symbolication of production errors.
- Assuming source maps affect **runtime** — they don't; they're only loaded by dev tools / error tooling, not by normal page execution.
- Putting **secrets** in front-end code and worrying about the map — the code itself is already public; the map just makes it readable.
