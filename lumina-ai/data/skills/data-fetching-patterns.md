---
name: data-fetching-patterns
description: How to fetch and manage server data in frontend apps — caching and revalidation (stale-while-revalidate), loading/error/empty states, optimistic updates, deduplication, pagination/infinite scroll, and avoiding waterfalls. Use to understand data fetching, React Query/SWR, caching server state, optimistic UI, or loading states.
category: engineering
keywords_vi: data fetching, react query swr, optimistic update, loading error empty state, lấy dữ liệu frontend, revalidation stale-while-revalidate, dedup, request waterfall
---

# Data Fetching Patterns

Fetching data from a server and showing it in the UI sounds simple but is full of subtleties: caching, loading/error states, staleness, race conditions, and performance. Modern data-fetching libraries (React Query/TanStack Query, SWR, RTK Query) encode these patterns — knowing them prevents a lot of buggy, janky UIs (see state-management-patterns for why server state is special).

## Server State Is Not Client State

Fetched data is a **cached copy** of the server's truth, with its own concerns: it can go **stale**, needs **refetching**, must handle **loading/error**, and is shared across components. Treating it like local state (manual `useEffect` + `useState` everywhere) leads to duplicated fetches, stale data, and race bugs. Dedicated tools manage this cache for you.

## Caching & Revalidation

- **Cache responses** by a key (the query/URL + params) so multiple components asking for the same data share one fetch (**deduplication**) and re-renders don't refetch.
- **Stale-while-revalidate** — show cached (possibly stale) data **instantly**, then refetch in the background and update when fresh arrives. Fast perceived performance + eventual freshness (see how-http-caching-works).
- **Invalidation** — after a mutation (create/update), invalidate the relevant cached queries so they refetch and the UI reflects the change.
- Configure staleness/refetch triggers (on focus, on reconnect, on interval).

## Handle All States

Every fetch has more than a happy path. Always handle:
- **Loading** — a skeleton/spinner (see loading-states-perceived-performance).
- **Error** — a clear message + retry, not a blank screen or crash.
- **Empty** — a meaningful "no results" state (not a confusing blank).
- **Success** — the data.
Forgetting error/empty states is the most common data-fetching UI bug.

## Optimistic Updates

For snappy UX on mutations (like/favorite/edit), **update the UI immediately** as if the server succeeded, then reconcile: if the server confirms, keep it; if it fails, **roll back** and show an error. Feels instant. Requires careful rollback logic and is best via a library that supports it. Use for high-confidence, low-stakes actions; be more conservative for critical ones.

## Performance: Avoid Waterfalls

A **request waterfall** is fetching sequentially when you could fetch in parallel — component A fetches, then renders B which fetches, then C — each waiting on the last, stacking latency. Fix by **parallelizing** independent requests, **prefetching** data you'll need (on hover/route change), and fetching at the right level. Also use **pagination/infinite scroll** for large lists (don't fetch thousands of rows — see api-pagination-and-filtering) and cancel stale in-flight requests (race conditions: an older response arriving after a newer one).

## Pitfalls (in understanding/using)

- **Hand-rolling** fetch logic everywhere (`useEffect` soup) → duplicated requests, stale data, race conditions; use a server-state library.
- **Missing loading/error/empty** states → blank screens, crashes, confusion.
- **Race conditions** — a slow earlier request overwriting a newer one; cancel/ignore stale responses.
- **Request waterfalls** — sequential fetches that could be parallel; prefetch and parallelize.
- **Over-fetching** (huge payloads, no pagination) or **under-fetching** (many round trips).
- **Not invalidating** caches after mutations → UI shows stale data.
- Optimistic updates **without rollback** → UI lies when the server fails.
