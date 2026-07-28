---
name: search-and-filter-ux
description: Search and filter UX — instant vs submitted search, autocomplete/suggestions, forgiving queries (typos, synonyms), faceted filtering, showing active filters and result counts, empty and zero-result states, and keeping filters in the URL. Use when designing search bars, filter panels, or making large datasets findable.
category: design
keywords_vi: tìm kiếm và lọc search filter ux, gợi ý tự động hoàn thành autocomplete, truy vấn khoan dung lỗi chính tả đồng nghĩa, lọc theo nhiều tiêu chí faceted, hiển thị bộ lọc đang bật số kết quả, trạng thái không có kết quả zero result, lưu bộ lọc vào url
---

# Search & Filter UX

When there's more content than a user can browse, search and filter become the primary navigation. Done well, they make a huge catalog feel small and findable. Done poorly, they hide everything behind a query the user can't get right.

## Search: Forgiving by Default

Users type imperfectly and expect the search to meet them halfway:
- **Tolerate typos** (fuzzy match), **synonyms** ("laptop" ↔ "notebook"), plurals, and case. A search that only does exact substring match feels broken.
- **Autocomplete / suggestions** as they type — surface likely queries, categories, and direct results. This guides phrasing and shortcuts to the answer.
- **Instant vs submitted** — instant (search-as-you-type) feels magical for fast local data; for expensive/backend search, debounce and consider requiring Enter to avoid hammering the server and flickering results.
- **Highlight matches** in results so the user sees *why* something matched.
- **Scope clarity** — show what's being searched (this folder? everything?) and let the user widen/narrow.

## Zero Results: A Design Surface, Not a Dead End

"No results" is where users bounce. Never show a bare empty page:
- Confirm the query, suggest **"did you mean…"**, relax the query (drop the most restrictive filter), or show popular/related items.
- Explain *why* (a filter is too narrow) and offer a one-click way to broaden or clear.

## Filtering: Faceted Navigation

Facets are filters drawn from the data's attributes (price, brand, size, color):
- **Show counts** next to each option ("Red (42)") so users know what's available before clicking — and never lead them to a zero-result dead end.
- **Multi-select within a facet** (OR), **AND across facets** — the common mental model.
- **Disable or hide** options that would yield zero results given current selections.
- **Sensible controls**: checkboxes for multi-select, ranges/sliders for numeric, but sliders are imprecise — pair with input fields.

## Show State Clearly

- **Active filters** as removable chips at the top ("Brand: Nike ✕, Under $100 ✕") with a **"Clear all"**. Users must always see what's constraining their results and undo it in one click.
- **Result count** updates live ("128 results").
- **Preserve state in the URL** — filters and query as query-params so results are **shareable, bookmarkable, and survive refresh/back**. Losing filters on a page reload is a top frustration.

## Sorting & Defaults

Offer relevant sorts (relevance, price, newest, rating) with a sensible default (usually relevance). Keep search and sort independent from filters. Persist the user's choices within a session.

Great search/filter UX gives users **control and feedback at every step**: they always know what they searched, what's filtering, how many results exist, and how to change it — so a giant dataset feels navigable instead of overwhelming.
