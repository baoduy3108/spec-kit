---
name: how-text-editors-work
description: How a text editor stores and edits text efficiently — why a plain string is too slow, the gap buffer and rope/piece-table data structures, cursor and selection handling, undo/redo with a command history, and syntax highlighting. Use to understand editor internals and why editing huge files stays fast.
category: engineering
keywords_vi: text editor hoạt động thế nào, trình soạn thảo, gap buffer rope, piece table, undo redo, cấu trúc lưu văn bản, con trỏ cursor, hiểu editor
---

# How Text Editors Work

Editing text seems trivial until the file is large and edits are frequent — then the data structure that holds the text is everything.

## Why Not Just a String?

Storing the document as one big string/array makes inserting or deleting a character in the middle **O(n)** — every following character must shift. For a big file with a typing user, that's unacceptable. Editors use structures that make local edits cheap.

## The Key Data Structures

- **Gap buffer** — keep the text in an array with a **gap** (empty space) at the cursor. Typing fills the gap; moving the cursor shifts the gap. Insertions/deletions **at the cursor** are O(1); only moving the cursor far costs. Simple and cache-friendly — used by Emacs. Great because edits cluster around the cursor.
- **Rope** — a balanced tree of string chunks. Insert/delete/index are O(log n); excellent for very large files and concurrent edits, at the cost of complexity. Used where huge documents matter.
- **Piece table** — keep the original file read-only plus an "add" buffer, and represent the document as a list of **pieces** (spans pointing into either buffer). Edits just add pieces; the original is never mutated, which makes undo and large-file handling elegant. Used by VS Code.

Each trades simplicity vs performance vs undo-friendliness; the right choice depends on file size and edit patterns.

## Cursor, Selection, Undo

- **Cursor/selection** are positions/ranges into the structure; multiple cursors are just multiple positions.
- **Undo/redo** — record edits as **commands** (or snapshots/diffs) on a history stack; undo pops and inverts, redo replays. The command pattern makes this clean and is why undo can be unlimited.

## Rendering & Highlighting

The editor only renders the **visible viewport**, not the whole file (virtualized rendering) — how it opens a 100MB file instantly. **Syntax highlighting** tokenizes/parses the visible text (increasingly with incremental parsers/tree-sitter) to color it, re-parsing only what changed on edit.

The lesson generalizes: when a naive structure makes the common operation O(n), pick a structure that makes it cheap — the same instinct behind choosing the right data structure anywhere.
