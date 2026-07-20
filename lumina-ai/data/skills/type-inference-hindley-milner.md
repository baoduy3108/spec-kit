---
name: type-inference-hindley-milner
description: How type inference works — deducing types without annotations by generating constraints from usage and solving them via unification (Hindley-Milner), plus let-polymorphism and why inference sometimes needs annotations. Use to understand type inference, Hindley-Milner, unification, why languages like ML/Haskell/Rust infer types, or type-inference limits.
category: engineering
keywords_vi: type inference suy luận kiểu, hindley milner, suy ra kiểu không cần khai báo, sinh ràng buộc từ cách dùng, hợp nhất unification, let-polymorphism, vì sao đôi khi cần annotation
---

# Type Inference (Hindley-Milner)

Type inference lets a compiler **figure out the types of your code without you writing them** — you write `let x = 5` and it knows `x` is an `int`, or write a generic function and it infers the most general type. The classic algorithm behind ML, Haskell, and (in part) Rust/Swift/TypeScript is **Hindley-Milner (HM)**, which infers types by **generating constraints from how values are used** and **solving them by unification** (see how-type-checkers-work, how-compilers-work).

## The Goal: Static Types Without the Annotations

Static typing catches errors early (see how-type-checkers-work) but writing type annotations everywhere is tedious. Type inference gives you the **safety of static types with the brevity of dynamic languages** — the compiler **deduces** the types. HM is powerful enough to infer types for a whole program with **few or no** annotations, and it finds the **most general** (most polymorphic) type.

## The Core Idea: Constraints + Unification

HM works in two conceptual steps:
1. **Generate constraints** — walk the code and, from each usage, emit **equations between types**. Assign unknown expressions **type variables** (α, β, ...). Examples: if you call `f(x)`, then `f`'s type must be `typeof(x) → β` and the call's type is `β`; if you write `x + 1`, then `x` must be a number; if a branch returns `x` and another returns `y`, their types must be **equal**.
2. **Solve by unification** — **unification** is the algorithm that solves these type equations: it tries to make two type expressions **equal** by finding substitutions for the type variables. Unifying `α → int` with `bool → β` forces `α = bool` and `β = int`. Solving all constraints yields a concrete type for every expression — or a **contradiction**, which is a **type error** (e.g. trying to unify `int` with `string`).

So inference = "collect equations from usage, then solve them." The solved substitution *is* the inferred types.

## Let-Polymorphism (generalization)

HM's power comes from **let-polymorphism**: when you bind a value with `let`, HM **generalizes** its type over any remaining free type variables, giving it a **polymorphic** (generic) type. So `let id = fun x -> x` gets type `∀a. a → a` — usable at `int → int`, `string → string`, etc. This is how HM infers **generics** automatically. (Function parameters, by contrast, are monomorphic within the function — the "let vs lambda" distinction.)

## Why Inference Sometimes Needs Help

Full inference has limits:
- **Ambiguity** — sometimes usage doesn't pin down a unique type (numeric literals, overloading), so you must **annotate**.
- **Advanced features** — higher-rank polymorphism, some GADTs, and certain patterns are **undecidable** or ambiguous to infer, requiring annotations.
- **Global inference is fragile** — a type error can surface **far** from its cause (the constraints connect distant code), producing confusing error messages. Annotations localize errors.
- Languages like Rust/Swift use **local** inference (infer within a function, require signatures at boundaries) partly for better errors and modularity.

## Pitfalls (in understanding/using)

- Expecting inference to read your **intent** — it infers from **usage**; ambiguous usage needs an annotation.
- **Confusing error locations** — an inferred type error can point far from the real mistake; add annotations to localize.
- Assuming **full** program-wide inference everywhere — many languages only do local inference and need signatures at function boundaries.
- Thinking inference makes the language **dynamically** typed — it's fully static; the types are just deduced, not absent.
- Over-relying on inference for **public APIs** — explicit signatures document intent and stabilize the interface.
- Not realizing **let-polymorphism** is what gives you generics for free (and why lambda params differ).
