---
name: python-best-practices
description: Write idiomatic, robust Python — Pythonic constructs (comprehensions, context managers, enumerate/zip, unpacking), the common footguns (mutable default arguments, late-binding closures, `is` vs `==`), virtual environments and dependency pinning, type hints, dataclasses, generators for memory, and clean error handling. Use when writing or reviewing Python code.
category: engineering
keywords_vi: python best practices, viết python chuẩn, pythonic, mutable default argument, type hint python, virtualenv, lỗi python thường gặp, code python sạch
---

# Python Best Practices

Write code that reads as Python, and sidestep the language's well-known traps.

## Pythonic Constructs

- **Comprehensions** over manual loops for building lists/dicts/sets: `[f(x) for x in xs if p(x)]` — but don't nest them into unreadability.
- **Context managers** (`with open(...) as f:`) for anything that must be released (files, locks, connections) — guarantees cleanup even on exception.
- **`enumerate`** instead of `range(len(...))`; **`zip`** to iterate pairs; **unpacking** (`a, b = pair`, `first, *rest = xs`).
- **f-strings** for formatting; **`pathlib`** over string path munging; **`collections`** (`defaultdict`, `Counter`, `deque`) and **`itertools`** for common patterns.
- **EAFP** ("easier to ask forgiveness") — `try/except` is Pythonic where a check would race; but use `if` for simple control flow.

## The Classic Footguns

- **Mutable default arguments** — `def f(x, items=[])` shares ONE list across all calls. Use `items=None` then `items = items or []` inside.
- **Late-binding closures** — `[lambda: i for i in range(3)]` all return 2; capture with `lambda i=i: i`.
- **`is` vs `==`** — `is` tests identity, `==` tests equality. Use `is` only for `None`/singletons; `== ` for values. (`a is b` for small ints "works" by accident — don't rely on it.)
- **Integer/float and money** — use `decimal.Decimal` for money; floats aren't exact.
- **Modifying a list while iterating it** — iterate a copy or build a new list.

## Structure & Tooling

- **Virtual environments always** (`venv`/`uv`/`poetry`); pin dependencies (lockfile); never install into system Python.
- **Type hints** on public functions + a checker (mypy/pyright) — they document intent and catch bugs; use `dataclasses`/`pydantic` for structured data.
- **Generators** (`yield`) for large/streaming data — process without loading everything into memory.
- **Specific exceptions** — catch `except ValueError`, not bare `except:` (which swallows `KeyboardInterrupt`/`SystemExit`); never silence errors with a bare `pass`.
- Follow **PEP 8** (a formatter like `black`/`ruff` makes it automatic); clear names over comments explaining bad ones.

## Performance Notes

Prefer built-ins and standard-library C implementations (`sum`, `sorted`, `set` membership) over hand-rolled loops. For CPU-bound parallelism, use processes (the GIL serializes threads); for I/O-bound, use `asyncio` or threads.
