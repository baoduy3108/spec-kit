---
name: how-type-checkers-work
description: How type checkers work — walking the AST to assign and verify types against typing rules, catching errors before runtime, plus static vs dynamic, nominal vs structural, soundness vs completeness, and gradual typing. Use to understand type checking, static analysis of types, why type errors are caught at compile time, or type-system trade-offs.
category: engineering
keywords_vi: type checker hoạt động thế nào, kiểm tra kiểu tĩnh, duyệt ast gán và xác minh kiểu, luật kiểu, static vs dynamic, nominal vs structural, soundness completeness, gradual typing
---

# How Type Checkers Work

A type checker is the part of a compiler/tool that **verifies your program uses types consistently** — catching whole classes of bugs (calling a method that doesn't exist, passing a string where a number is needed) **before the program runs**. It works by assigning a **type** to every expression and checking those types against the language's **typing rules** (see how-compilers-work, how-parsers-work, type-inference-hindley-milner).

## What It Does: Assign and Check Types

After parsing produces an AST (see how-parsers-work), the type checker walks the tree and, for each expression, determines its **type** and checks it against the rules:
- A literal `42` has type `int`; `"hi"` has type `string`.
- A function call checks the **argument types** match the parameter types, and gives the call the function's **return type**.
- An operation like `a + b` checks that `+` is defined for the operand types.
- Assignments check the value's type is compatible with the variable's type.
If a rule is violated (add a number to a function, call a missing method), it's a **type error** — reported at **compile time**, before the code ever runs. This is the value: catching errors early, as a proof that certain bugs **can't** happen at runtime.

## Static vs Dynamic Typing

- **Static typing** (Java, Rust, TypeScript, Haskell) — types are checked **before running**, at compile time. Catches type errors early, enables tooling/autocomplete, documents intent — at the cost of more upfront annotation/ceremony.
- **Dynamic typing** (Python, JavaScript, Ruby) — types are checked **at runtime** as values flow; a type error surfaces only when that line executes. More flexible/terse, but bugs hide until hit.
Type checkers are the machinery of static typing (and of optional static analyzers like mypy/TypeScript bolted onto dynamic languages).

## Nominal vs Structural

How does the checker decide two types are "the same/compatible"?
- **Nominal** (Java, C#) — by **name/declaration**: `Dog` and `Cat` are different even with identical fields; compatibility follows the declared hierarchy.
- **Structural** (TypeScript, Go interfaces) — by **shape**: if a value has the required fields/methods, it's compatible, regardless of name ("duck typing" checked statically). More flexible.

## Soundness vs Completeness

A key theoretical trade-off:
- **Sound** — the checker **never** accepts a program that would have a type error at runtime (no false negatives). If it type-checks, it's type-safe.
- **Complete** — the checker **never rejects** a valid program (no false positives).
By a fundamental limit, a checker generally can't be both perfectly sound and complete for a rich language, so designers choose. Most practical checkers lean **sound-ish** but pragmatic; some (TypeScript) deliberately allow **unsound** escapes (`any`, casts) for flexibility. Knowing your checker's soundness tells you how much to trust it.

## Gradual Typing

**Gradual typing** (TypeScript, Python type hints, Sorbet) lets you **mix** typed and untyped code — annotate incrementally, with an `any`/dynamic escape hatch. You get static checking where you've annotated and dynamic flexibility elsewhere, easing migration of large dynamic codebases. The trade-off: the `any` holes make it **unsound** at the boundaries.

## Pitfalls (in understanding/using)

- Assuming a checker catches **all** bugs — it catches **type** errors, not logic errors; and unsound escapes (`any`, casts) create blind spots.
- Overusing **`any`/casts** → you opt out of checking exactly where bugs hide; defeats the point.
- Confusing **nominal** and **structural** compatibility → surprises about what's assignable.
- Expecting **runtime** type safety from a checker that erases types (TypeScript types vanish at runtime; validate external data separately).
- Thinking static typing replaces **tests** — it rules out type errors, not incorrect behavior.
- Fighting a **sound** checker's rejections instead of understanding the real unsafety it's flagging.
