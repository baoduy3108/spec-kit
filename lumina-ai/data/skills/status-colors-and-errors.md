---
name: status-colors-and-errors
description: Minimal semantic color sets and error message design — red/orange/green/blue mapping, error message structure (what/why/next), prevention over recovery, severity levels. Use when designing error states, status colors, or error messages for a UI.
category: design
keywords_vi: màu trạng thái, màu báo lỗi, màu lỗi, error message design, thông báo lỗi, status color, thiết kế thông báo lỗi
---

# Status Colours and Error Design

## Core Principles

Use minimal semantic colour sets to reduce cognitive load:

- **Red** = Error/failure/destructive
- **Orange/Amber** = Warning (requires attention)
- **Green** = Success/positive
- **Blue** = Info/neutral status

Key rule: each colour maps to exactly one meaning across the entire product.

## Error Message Design

Every error should answer three questions:
1. What went wrong (plain language, no codes)
2. Why it happened (if known)
3. What to do next (specific action)

Poor example: "Error 500". Better: "We couldn't save your changes. Check your connection and try again."

## Prevention Over Recovery

Design should prevent major failures rather than handle them afterward:
- Confirm before irreversible actions
- Disable unavailable actions
- Use autosave and optimistic UI with rollback
- State consequences before the user acts, using plain language next to controls

## Severity Levels

Match visual weight to problem severity:
- Blocking error → full-page or modal
- Inline error → red text below field
- Toast → temporary dismissible notification
- Alert banner → persistent contextual bar
- Empty state → opportunity for guidance

## Review Checklist

Consistent colour usage, orange reserved for warnings only, transient errors with retry options, confirmation for destructive actions, avoid multiple simultaneous error states.
