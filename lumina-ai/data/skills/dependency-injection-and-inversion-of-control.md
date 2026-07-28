---
name: dependency-injection-and-inversion-of-control
description: How to build loosely-coupled, testable code by not letting objects create their own dependencies — dependency injection (DI) and inversion of control (IoC). Covers passing dependencies in (constructor injection) vs constructing them inside, coding to interfaces, why DI makes testing/mocking trivial, DI containers and their trade-offs, and over-abstraction pitfalls. Use to design decoupled architectures and understand IoC frameworks.
category: software-design
keywords_vi: tiêm phụ thuộc dependency injection và đảo ngược điều khiển inversion of control ioc, không để đối tượng tự tạo phụ thuộc mà truyền vào constructor injection, lập trình theo giao diện interface, di giúp test và mock dễ dàng, di container và đánh đổi, cặp lỏng loosely coupled dễ kiểm thử, lạm dụng trừu tượng
---

# Dependency Injection & Inversion of Control

A class that **creates its own dependencies** (`this.db = new PostgresConnection(...)` inside the constructor) is **tightly coupled** to those concrete choices — you can't swap the database, you can't test it without a real Postgres, and changing the dependency ripples everywhere. **Dependency Injection (DI)** flips this: an object **receives** its dependencies from the outside instead of constructing them. It's the most common form of the broader principle **Inversion of Control (IoC)**, and it's the backbone of testable, modular design (see agent-computer-interface for a related "design the seams" idea, and testing skills that rely on it).

## The Core Idea: Depend on Abstractions, Receive Them

Two moves together:
1. **Code to an interface, not a concrete class** — a `UserService` depends on an `EmailSender` **interface**, not `SmtpEmailSender`.
2. **Inject the concrete implementation from outside** — the caller/framework passes in *which* `EmailSender` to use.

The most common and recommended form is **constructor injection** — dependencies are parameters of the constructor:
```
class UserService {
  constructor(private emailSender: EmailSender, private repo: UserRepo) {}
}
```
Now `UserService` neither knows nor cares *which* email sender it got. Other forms: **setter injection** (set after construction) and **method injection** (pass per-call) — constructor injection is preferred because it makes dependencies **explicit and mandatory** (you can't construct the object without them).

## Why This Matters

- **Testability** — the headline benefit. In tests you inject a **fake/mock** `EmailSender` (records what it "sent") instead of hitting a real SMTP server. DI is what makes unit testing with test doubles clean (see test-doubles-and-mocking).
- **Loose coupling / swappability** — change the database, HTTP client, or logger by injecting a different implementation; the consumer code doesn't change.
- **Explicit dependencies** — a constructor signature **documents** exactly what a class needs; hidden `new`s and global singletons obscure this.
- **Separation of concerns** — "what to do" (business logic) is separated from "how to wire it up" (composition).

## Inversion of Control & Containers

**IoC** names the general reversal: instead of your code controlling the flow and creating collaborators, a **framework/container** controls creation and hands your objects what they need ("don't call us, we'll call you"). A **DI container** (Spring, .NET's built-in DI, NestJS, Guice) automates wiring: you **register** which implementation satisfies which interface, and it **constructs the whole object graph** for you, resolving dependencies transitively. Handy at scale — but it adds **magic** (harder to trace, runtime-resolution errors, startup cost). For small/medium apps, **manual DI** (just pass dependencies in `main`/composition root) is often clearer than a container.

## Don't Over-Abstract

DI is powerful enough to be over-applied: an **interface for every class**, a container for a tiny app, layers of indirection that obscure what actually runs. Add an interface when you have (or clearly foresee) **multiple implementations** or a **test seam** — not reflexively. YAGNI applies: inject what varies, hardcode what doesn't.

## Design Guidance (for understanding/using)

- **Prefer constructor injection** — dependencies explicit, mandatory, immutable.
- **Depend on interfaces for the things that vary or need faking** (I/O, external services), not for everything.
- **Use DI to make testing trivial** — inject fakes/mocks instead of real infrastructure.
- **Manual DI (composition root) is fine and often clearer** than a container for small/medium apps; reach for a container when the object graph gets large.
- **Avoid over-abstraction** — interfaces/DI where there's real variation or a test seam, not by reflex.

## Pitfalls (in understanding/using)

- Classes **`new`-ing their own** dependencies → tight coupling; can't swap or test without the real thing.
- **Interface-for-everything** and containers on a tiny app → indirection and magic for no benefit.
- **Service locator / hidden globals** instead of explicit injection → dependencies invisible in the signature.
- DI container **runtime wiring errors** and startup cost → prefer explicit wiring when the graph is small.
- Injecting so much that **what actually runs** is impossible to trace → keep the composition understandable.
