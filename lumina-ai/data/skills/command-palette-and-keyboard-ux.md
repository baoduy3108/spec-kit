---
name: command-palette-and-keyboard-ux
description: Command palette and keyboard-driven UX — a searchable action launcher (Cmd/Ctrl-K), fuzzy command search, keyboard shortcuts and discoverability, focus management, shortcut conflicts and consistency, and power-user efficiency without hurting novices. Use when adding a command palette, keyboard shortcuts, or making an app fast for keyboard users.
category: design
keywords_vi: bảng lệnh command palette cmd ctrl k, khởi chạy hành động tìm kiếm mờ fuzzy, phím tắt keyboard shortcut và khám phá, quản lý tiêu điểm focus bàn phím, xung đột phím tắt nhất quán, hiệu quả cho power user không hại người mới, điều khiển app bằng bàn phím
---

# Command Palette & Keyboard UX

Keyboard-driven interfaces make an app *fast* for people who use it a lot. The command palette — a searchable launcher opened with **Cmd/Ctrl-K** — has become the gold standard because it gives power without cluttering the UI or demanding users memorize dozens of shortcuts.

## The Command Palette

A single overlay where the user types to find and run **any** action:
- **One entry point** (Cmd/Ctrl-K) surfaces the whole app's capabilities — no hunting through menus.
- **Fuzzy search** over command names so partial/out-of-order typing works ("newdoc" → "Create New Document"). Rank by relevance and **recency/frequency** — the user's common actions float up.
- **Show the shortcut** next to each command. The palette becomes a *teaching tool*: users discover that "Archive" has a shortcut and gradually graduate to it.
- **More than commands** — modern palettes also jump to pages, search content, and switch context, becoming universal navigation.
- **Keyboard-complete** — arrow to select, Enter to run, Esc to close; never require the mouse inside it.

The palette's magic: it scales infinitely (thousands of actions) while staying invisible until summoned, so it helps experts without burdening novices.

## Shortcuts: Discoverable & Consistent

Raw shortcuts are faster still, but only if learnable:
- **Follow platform conventions** — Cmd/Ctrl-C/V/Z/S/F mean what users expect; don't override them. Respect Mac (Cmd) vs Windows/Linux (Ctrl).
- **Discoverability** — show shortcuts in menus and tooltips, offer a **"?" shortcuts cheat sheet**, and hint them in the palette. A shortcut nobody can find might as well not exist.
- **Mnemonics** — tie keys to meaning (**N**ew, **F**ind) so they're memorable.
- **Consistency** — the same key does the same thing everywhere in the app; a shortcut that changes meaning by screen is worse than none.
- **Avoid conflicts** — with the browser, the OS, and screen readers; test that your bindings don't clobber accessibility shortcuts.

## Focus Management

Keyboard UX lives or dies on focus:
- **Visible focus indicator** always — keyboard users must see where they are (never `outline: none` without a replacement).
- **Logical tab order** matching visual/reading order; group and skip appropriately.
- **Focus trapping** in modals/palettes (Tab cycles within, Esc exits, focus returns to the trigger on close).
- **Roving focus** in lists/menus (arrow keys move, Tab exits the group).

## Serve Both Audiences

The principle: **keyboard as an accelerator, not a requirement.** Every action reachable by mouse; power users can also do it by key. Novices never need to know a shortcut exists; experts fly. The command palette is the bridge — it makes the whole surface keyboard-reachable and *teaches* the shortcuts along the way.

Done right, keyboard UX is the difference between an app that feels sluggish and one that feels like an extension of the user's hands.
