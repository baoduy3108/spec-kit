---
name: rust-ownership
description: Rust's core model — ownership, borrowing, and lifetimes that guarantee memory safety without a garbage collector; move semantics, references (&T / &mut T) and the borrow-checker rules, plus Result/Option error handling and when to use clone/Rc/Arc. Use when writing or debugging Rust, especially borrow-checker errors.
category: engineering
keywords_vi: rust ownership, borrow checker, mượn tham chiếu borrowing, lifetime, move semantics, an toàn bộ nhớ không gc, result option rust, lỗi borrow rust
---

# Rust Ownership & Borrowing

Rust guarantees memory safety **at compile time, without a garbage collector**, through ownership. This is Rust's defining idea — and the source of most beginner friction (fighting the borrow checker). Understanding the rules turns that fight into a guide.

## Ownership

Every value has a single **owner** (a variable). When the owner goes out of scope, the value is **dropped** (freed) — deterministic cleanup, no GC. **Move semantics**: assigning or passing a non-`Copy` value *moves* ownership (the old binding is invalidated) — preventing double-frees and use-after-move. Small `Copy` types (integers, bools) are copied instead.

## Borrowing (references)

Instead of moving, you **borrow** with references:
- **`&T`** — a shared/immutable borrow (read-only). You can have **many** at once.
- **`&mut T`** — a mutable/exclusive borrow. You can have **exactly one**, and no shared borrows at the same time.
The rule: **either many readers OR one writer, never both simultaneously**. This compile-time rule prevents data races (see concurrency-and-parallelism) and aliasing bugs *by construction* — the same guarantee other languages need a GC or locks (and hope) to approximate. Most borrow-checker errors are it enforcing this.

## Lifetimes

References must not outlive the data they point to (no dangling pointers). The **lifetime** system tracks this; usually inferred, sometimes annotated (`'a`) when the compiler can't prove a reference stays valid. A "borrowed value does not live long enough" error means a reference would outlast its owner.

## Working With It (not against it)

- **Restructure ownership** rather than cloning everywhere — pass references, return owned values, split borrows.
- **`clone()`** when you genuinely need an independent copy (a pragmatic escape, not free — don't spam it to silence the borrow checker).
- **`Rc<T>` / `Arc<T>`** — reference-counted shared ownership when a value needs multiple owners (`Arc` is thread-safe atomic). `RefCell`/`Mutex` for interior mutability (checked at runtime / with locks).
- Prefer owning data in one place and lending it out.

## Error Handling

No exceptions — Rust uses **`Result<T, E>`** (success/error) and **`Option<T>`** (some/none) as return types, forcing callers to handle both (see error-handling-patterns). The **`?` operator** propagates errors concisely. `unwrap()`/`expect()` panic on failure — fine for prototypes/truly-impossible cases, risky in production.

## Pitfalls

- **Fighting the borrow checker** by cloning everywhere → restructure ownership instead.
- **`unwrap()` in production** → panics; handle `Result`/`Option`.
- Trying to keep a `&mut` and `&` alive together (the rule violation).
- Returning references to local data (lifetime error).
- Overusing `Rc<RefCell<>>` to emulate other languages instead of embracing ownership.
- Not reading the (excellent, specific) compiler error — it usually tells you the fix.
