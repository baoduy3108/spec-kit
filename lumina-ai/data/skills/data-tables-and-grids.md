---
name: data-tables-and-grids
description: Data table and grid UX — scannable rows, column alignment (numbers right, text left), sorting and filtering, sticky headers, pagination vs infinite scroll vs virtualization, row selection and bulk actions, inline editing, and responsive strategies for tables on small screens. Use when designing tables, data grids, admin lists, or displaying tabular data.
category: design
keywords_vi: bảng dữ liệu data table, căn cột số phải chữ trái, sắp xếp và lọc cột, tiêu đề dính sticky, phân trang vô hạn, ảo hóa hàng virtualization, chọn hàng hành động hàng loạt bulk, sửa tại chỗ inline edit, bảng responsive màn nhỏ
---

# Data Tables & Grids

Tables are how we present structured, comparable data — and they're deceptively hard to do well. A good table is instantly scannable; a bad one is a wall of text users can't parse. The whole goal is letting the eye compare values down a column effortlessly.

## Scannability First

- **Alignment carries meaning**: **numbers right-aligned** (so digits line up for magnitude comparison), **text left-aligned**, headers matching their column. Right-aligning numbers is the single biggest readability win.
- **Consistent number formatting** — same decimals, thousands separators, aligned units; use tabular (monospaced) figures so columns don't jitter.
- **Restrained lines** — heavy gridlines create a busy cage. Prefer generous row spacing, subtle row separators (or zebra striping for very wide tables), and whitespace. Let the data, not the borders, define structure.
- **Row height & density** — offer comfortable vs compact; power users scanning thousands of rows want density, casual users want breathing room.

## Interaction

- **Sort** by clicking a column header, with a clear indicator (arrow) of column and direction. Multi-sort for power tools.
- **Filter / search** above the table; show active filters and result count (see search-and-filter-ux).
- **Sticky header** (and sometimes sticky first column) so context never scrolls away on long/wide tables.
- **Column controls** — resize, reorder, show/hide columns for user-tailored views.

## Selection & Bulk Actions

For actionable tables (admin lists): **row checkboxes** with a header "select all", a persistent bar showing "N selected" and available **bulk actions** (delete, export, tag). Make selection survive pagination if it must span pages, and be explicit about it. Always confirm destructive bulk actions and offer undo.

## Inline Editing

Editing in place beats a modal per row for data-entry tools: click a cell to edit, Tab to the next, Enter to commit, Esc to cancel. Validate inline, show save state, and keep keyboard flow tight — spreadsheet muscle memory is the standard users expect.

## Handling Volume

Large datasets need a loading strategy:
- **Pagination** — predictable, bookmarkable, good when users navigate to specific pages; shows total count.
- **Infinite scroll** — fluid for browsing/feeds, but bad for "find that row later" and buries any footer.
- **Virtualization (windowing)** — render only visible rows, recycle the rest; keeps a 100k-row grid at 60fps. Often combined with server-side sort/filter so the client never holds everything.

Choose by task: pagination for reference/navigation, virtualization for large interactive grids.

## Responsive Tables

Tables and small screens fight. Options, worst-to-best by case: horizontal scroll (keep the table, wrap in an overflow container — never let it break the page layout), **priority columns** (hide low-value columns on narrow screens), or **collapse each row into a card** (label: value pairs) for mobile. Pick per data — a comparison table needs its columns; a list of records reads fine as cards.

A great table disappears: users compare, sort, and act on their data without ever thinking about the table itself.
