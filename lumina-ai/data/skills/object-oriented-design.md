---
name: object-oriented-design
description: Design maintainable object-oriented code — the SOLID principles, composition over inheritance, encapsulation, programming to interfaces, cohesion/coupling, and a few core design patterns (strategy, factory, adapter, observer) with when each applies. Use when structuring classes and objects or reviewing an OO design for rigidity/duplication.
category: engineering
keywords_vi: thiết kế hướng đối tượng, oop, solid, design pattern, composition over inheritance, đóng gói encapsulation, coupling cohesion, kế thừa vs kết hợp
---

# Object-Oriented Design

Good OO minimizes coupling and maximizes cohesion so changes stay local. The goal is code that's easy to change, not clever hierarchies.

## SOLID

- **S — Single Responsibility** — a class has one reason to change. A class doing persistence + validation + formatting will churn constantly; split it.
- **O — Open/Closed** — open for extension, closed for modification. Add behavior via new types/strategies rather than editing a growing `switch`.
- **L — Liskov Substitution** — a subtype must be usable anywhere its base is, without surprises. If a subclass throws on a method the base supports (Square/Rectangle), the hierarchy is wrong.
- **I — Interface Segregation** — many small focused interfaces over one fat one; clients shouldn't depend on methods they don't use.
- **D — Dependency Inversion** — depend on abstractions, not concretions. High-level policy shouldn't import low-level detail; inject dependencies via interfaces (also what makes testing easy).

## Composition Over Inheritance

Inheritance is tight coupling and a rigid "is-a" that's hard to change; deep hierarchies become brittle. Prefer **composition** ("has-a"): assemble behavior from smaller objects/strategies you can swap. Use inheritance only for genuine substitutable is-a relationships, kept shallow.

## Encapsulation & Interfaces

- Hide internals; expose a small, intentional public surface. Callers depend on *what*, not *how* — so you can change the how.
- **Program to an interface**, not an implementation, so implementations are swappable and mockable.
- **High cohesion** (a class's parts belong together) + **low coupling** (few, narrow dependencies between classes) is the target for every design.

## Core Patterns (use when the shape fits, not preemptively)

- **Strategy** — swap an algorithm at runtime via a common interface (payment methods, sort orders). The OCP tool.
- **Factory** — centralize/abstract object creation when it's complex or must vary by type.
- **Adapter** — wrap an incompatible interface to fit what your code expects (integrating a third-party lib).
- **Observer** — notify many dependents when a subject changes (events, pub/sub).

Don't force patterns — a pattern applied where it isn't needed adds indirection without benefit. Reach for one when you feel the specific pain it solves.
