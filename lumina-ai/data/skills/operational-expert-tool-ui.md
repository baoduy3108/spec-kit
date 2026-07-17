---
name: operational-expert-tool-ui
description: Operational expert tools — used by domain specialists for hours every day — require a different design approach than consumer or occasional-use software. Information density, workflow linearity, and at-a-glance status take priority over whitespace and discoverability. Use when designing dispatch tools, warehouse management, logistics, scheduling, or any B2B tool whose primary users are trained specialists.
category: design
keywords_vi: công cụ cho chuyên gia, giao diện mật độ cao b2b, tool điều phối kho vận, power user tool, bảng dữ liệu dày đặc, tool cho người dùng chuyên nghiệp, dispatch warehouse ui
---

# Operational Expert Tool UI

An operational expert tool is software used by trained domain specialists — warehouse operators, dispatchers, planners, analysts — as their primary work surface, often for the entire working day. These users are not beginners discovering a product; they are professionals executing a defined job with the tool as their instrument.

This is a fundamentally different design context from consumer software or occasional-use SaaS. The design priorities are reversed: density and speed of action take precedence over discoverability and visual spaciousness.

## Primary Design Principles

### 1. Information over whitespace
An expert user does not need breathing room to orient themselves — they know the tool. Every pixel of empty space is a missed opportunity to show data they need.

- Use compact row heights (28–36px) for data tables
- Show secondary attributes (status, type, date) inline, not on hover or in a detail panel
- Prefer text labels over icons alone — experts read fast, icon-only UIs slow them down

### 2. Workflow linearity
Expert tools complete a defined task sequence, not browsing. Design the layout to reflect the workflow order — left to right, or top to bottom — matching the mental model of the task.

```
[Step 1: Select items]  →  [Step 2: Configure]  →  [Step 3: Execute]
```

The next step should be obvious at every point, without hiding it behind menus or requiring navigation away from the current context.

### 3. Persistent state
Filters, column widths, view modes, and open/closed panels are part of the operator's work context. They should survive page reloads and be consistent between sessions unless the user explicitly resets them.

## Hierarchical Accordion Tables

Many operational domains have naturally hierarchical data: an order contains lines; a route contains stops; a project contains tasks. The right pattern is an in-place accordion, not a drill-down to a separate page.

```
▶ Order #1042   ACME Corp    3 lines    Pending
▼ Order #1089   Globex       2 lines    Ready
    ├─ Line 1   Widget A    Qty: 12    ✓ In stock
    └─ Line 2   Widget B    Qty:  4    ✗ No stock
▶ Order #1091   Initech      5 lines    Pending
```

Context is preserved (the operator sees multiple orders at once), status across siblings is visible without navigating back, and keyboard navigation keeps hands on the keyboard. Per-row inclusion toggles (checkbox/toggle) should be **always visible**, not hidden on hover.

## At-a-Glance Status Indicators

Operators make decisions based on status. Status should be visible without interaction.

| Good | Avoid |
|---|---|
| Coloured dot or pill always visible in the row | Status only visible on hover or in a tooltip |
| 2–3 status states with distinct colours | More than 5 status colours (hard to memorise) |
| Status label beside colour for accessibility | Colour alone as the only indicator |
| Consistent colour semantics across the whole tool | Same colour meaning different things in different tables |

## Workflow-State Filters vs. Search Filters

Two distinct filter types that should be treated differently:

- **Workflow-state filters** narrow the dataset to the operator's current work scope. They persist, they are broad, they represent a decision. Place these in a permanent filter bar or sidebar, always visible.
- **Search filters** find a specific item within the current scope. They are transient. Place these in a search input that can be cleared quickly.

Do not merge these into a single filter UI — the operator switches mental mode between "what scope am I working in?" and "where is that specific item?"

## Keyboard Navigation

Expert users learn keyboard shortcuts. Not required, but they dramatically increase throughput.

- Arrow keys navigate rows; Space/Enter expands an accordion row; Escape closes a panel or dialog
- Common actions have discoverable shortcuts (shown in tooltips: `Delete [Del]`, `Include [Space]`)
- Do not rely on right-click context menus as the only path to actions

## Action Feedback at Scale

When an operation affects many items, feedback must be proportional:
- Fewer than ~10 items: inline confirmation
- 10–100 items: a toast with count ("42 orders updated")
- 100+ items: a progress indicator during the operation, then a summary on completion

Never silently complete a bulk operation with no feedback.

## Review Checklist

- [ ] Is the information density appropriate for trained daily users (compact rows, inline status)?
- [ ] Does the layout reflect the workflow sequence?
- [ ] Are filters, view modes, and open panels persisted across sessions?
- [ ] Is hierarchical data shown as in-place accordions, not separate pages?
- [ ] Are per-row inclusion controls always visible, not hidden on hover?
- [ ] Are status indicators always visible without interaction?
- [ ] Are workflow-state filters separated from transient search filters?
- [ ] Are common actions accessible via keyboard?
- [ ] Does bulk operation feedback scale with the number of affected items?
