---
name: how-spreadsheet-engines-work
description: How spreadsheet engines work — the grid of cells, formulas and the dependency graph, recalculation via topological order, handling circular references, and lazy/incremental recalculation. Use to understand how spreadsheets (Excel/Sheets) recalculate, formula dependency graphs, building a spreadsheet/reactive calc engine, or dependency-based computation.
category: engineering
keywords_vi: how spreadsheet engines work, spreadsheet excel hoạt động thế nào, lưới ô cell, công thức đồ thị phụ thuộc, tính lại theo topological order, tham chiếu vòng, lazy incremental recalc
---

# How Spreadsheet Engines Work

A spreadsheet is a grid of **cells**, where cells can contain values or **formulas** that reference other cells — and when one cell changes, everything that depends on it updates automatically. That automatic, correct recalculation is the whole engineering problem, and it's a beautiful example of **dependency-graph computation** (the same idea behind reactive UIs — see state-management-patterns, virtual-dom-and-reconciliation).

## Cells, Formulas & References

Each cell holds either a literal value or a **formula** (`=A1 + B2 * 2`) that computes from **other cells' values**. A formula's cell references create a **dependency**: this cell **depends on** the cells it references. The engine's job: when any cell changes, recompute all cells that (directly or transitively) depend on it — and only those — correctly.

## The Dependency Graph

The engine models the sheet as a **directed dependency graph**: each cell is a node, and an edge goes from a cell to the cells it depends on (or the reverse — from a cell to its dependents). This graph is the heart of the engine. When cell A changes, its **dependents** (cells referencing A), and their dependents, and so on, must recalculate. The graph captures exactly what needs updating and in what order.

## Recalculation in the Right Order

You can't recompute cells in random order — a cell must be recalculated **after** the cells it depends on (so it uses updated inputs). The correct order is a **topological sort** of the dependency graph (see topological-sort): process cells so every cell comes after its dependencies. This guarantees each formula sees fresh inputs. Get the order wrong and you compute with stale values (one recalc "pass" isn't enough, or gives wrong results).

## Incremental / Lazy Recalculation

Recomputing the **entire** sheet on every edit is wasteful for large sheets. Efficient engines recompute **only what changed and its dependents** (the "dirty" subgraph):
- Mark the edited cell and everything downstream as **dirty**.
- Recalculate the dirty cells in topological order.
- Leave untouched cells alone.
This **incremental** recalculation is what keeps big spreadsheets responsive. (This is the same principle as reactive frameworks recomputing only affected values.)

## Circular References

What if A depends on B and B depends on A? That's a **cycle** in the dependency graph — you can't topologically order it, and naive recalculation would loop forever. Spreadsheet engines **detect cycles** (a cycle-detection pass — see graph-traversal) and either **report an error** (the usual behavior) or, if the user enables **iterative calculation**, recompute the cycle a bounded number of times hoping it converges (used for intentional iterative models). Detecting and handling circular references is a required part of a correct engine.

## Pitfalls (in understanding/using)

- **Recalculating in the wrong order** → cells compute with stale inputs; use topological order.
- **Full recalculation** of the whole sheet on every change → slow for large sheets; recompute only the dirty subgraph.
- Not **detecting circular references** → infinite loops or wrong values; detect cycles and error (or iterate deliberately).
- Rebuilding the **dependency graph** from scratch each time instead of updating it incrementally when formulas change.
- Ignoring that a single edit can cascade to **many** dependents (or none) — the graph, not the cell count, drives work.
- Volatile functions (NOW, RAND) that must recalc every time complicating the dirty-tracking.
- Assuming one recalc pass suffices for chains of dependencies (it doesn't without proper ordering).
