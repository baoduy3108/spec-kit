---
name: slowly-changing-dimensions
description: Slowly changing dimensions (SCD) in data warehousing — strategies for handling attributes that change over time (Type 1 overwrite, Type 2 versioned history, Type 3 previous-value), so historical facts stay tied to the correct point-in-time attribute values. Use to handle dimension changes over time, preserve historical accuracy, or choose an SCD type.
category: engineering
keywords_vi: slowly changing dimensions scd, chiều thay đổi chậm, thuộc tính thay đổi theo thời gian, type 1 ghi đè, type 2 lưu lịch sử phiên bản, type 3 giá trị trước, giữ chính xác lịch sử
---

# Slowly Changing Dimensions (SCD)

Slowly changing dimensions are a data-warehousing concept for **handling attributes that change over time** — a customer's address, a product's category, a salesperson's region. The challenge: when a dimension attribute changes, do you **overwrite** it (losing history) or **preserve** the old value so historical facts still reflect what was true **at the time**? SCD "types" are the standard strategies (see how-data-warehouses-work).

## The Problem: History vs Current Value

In a warehouse, **fact** records (sales, events) reference **dimension** records (customer, product) — see how-data-warehouses-work. Dimensions change slowly: a customer moves to a new city, a product is recategorized. Now a question arises: a sale made **last year** — should it be attributed to the customer's **old** city (where they lived then) or their **new** city? The answer depends on the analysis, and how you **store** dimension changes determines what's even possible. SCD types formalize the choices.

## The Common Types

- **Type 0 — Retain original** — the attribute **never changes** (e.g. original signup date). Ignore updates.
- **Type 1 — Overwrite** — **replace** the old value with the new; **no history kept**. Simple, but **destroys** the past: all historical facts now appear associated with the *current* value (last year's sale shows the new city). Use when history doesn't matter (correcting an error, or the attribute isn't analytically time-sensitive).
- **Type 2 — Add a new row (versioned history)** — the **most important**. When an attribute changes, insert a **new dimension row** for the same entity with a **new surrogate key**, and mark validity with **effective-from / effective-to dates** (and often a "current" flag). Old facts point to the old row (old value), new facts to the new row. This **preserves full history** — you can always see what was true at any point in time. The cost: the dimension grows, and you need surrogate keys + date ranges.
- **Type 3 — Add a column (previous value)** — keep a **"previous value" column** alongside the current, capturing **one** prior state. Limited (only the last change), used when you need to compare current vs a single previous value.

There are hybrids (Type 4 history tables, Type 6 = 1+2+3), but **Type 1 and Type 2 cover most needs**.

## Type 2 in Practice (the key one)

- Each entity can have **multiple rows** over time, each with a unique **surrogate key** (not the natural/business key).
- **Effective-from / effective-to** timestamps (and a `is_current` flag) define each version's validity window.
- **Facts join on the surrogate key**, so each fact is tied to the dimension version that was current **when the fact occurred** → historically accurate reporting.
- Loading logic: on a change, **close** the old row (set effective-to) and **insert** the new current row.

## Choosing

- **Type 1** — you only care about the **current** value; history is irrelevant or the change is a correction.
- **Type 2** — you need **historical accuracy** (point-in-time truth) — the default for anything time-sensitive in analytics.
- **Type 3** — you need **current vs one prior** value comparison, nothing more.

## Pitfalls (in understanding/using)

- Using **Type 1 (overwrite)** where history matters → past facts silently re-attribute to current values, corrupting historical analysis.
- Type 2 keyed on the **natural key** instead of a **surrogate key** → you can't have multiple versions; use surrogate keys.
- Forgetting **effective-date / current-flag** management in Type 2 → overlapping or gapped validity windows, ambiguous joins.
- Facts joining to the **current** dimension row instead of the point-in-time version → defeats Type 2's purpose.
- Applying Type 2 to **fast-changing** attributes → the dimension explodes (that's a "rapidly changing" dimension, handled differently, e.g. mini-dimensions).
- Over-engineering with Type 6 when **Type 1 or 2** would suffice.
