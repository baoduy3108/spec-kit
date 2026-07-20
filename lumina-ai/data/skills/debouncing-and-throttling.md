---
name: debouncing-and-throttling
description: How debouncing and throttling control how often a function runs in response to rapid events — debounce waits for a pause, throttle caps the rate — plus their use cases (search-as-you-type, scroll/resize, autosave) and the key difference. Use to understand debounce vs throttle, rate-limiting event handlers, or optimizing frequent events like typing/scrolling.
category: engineering
keywords_vi: debounce, throttle, giới hạn tần suất gọi hàm, scroll resize, chờ ngừng vs giới hạn tốc độ, search as you type, autosave, sự kiện dồn dập
---

# Debouncing & Throttling

Debouncing and throttling are two techniques to **limit how often a function runs** in response to rapidly-firing events (keystrokes, scroll, resize, mouse move). Without them, a handler can fire hundreds of times a second, causing lag, wasted work, or API spam. They're related but solve it differently — mixing them up is a common bug.

## The Problem

Events like `keyup`, `scroll`, `resize`, and `mousemove` fire **very frequently**. If each triggers an expensive operation — an API call, a re-layout, a heavy computation — you get janky UI and excessive requests. You want the *effect* without running it on every single event.

## Debounce: Wait for a Pause

**Debouncing** delays running the function until the events **stop** for a specified quiet period. Each new event **resets the timer**; the function runs only after there's been no event for, say, 300ms.
- **Mental model:** "wait until the user is done."
- **Search-as-you-type** — don't search on every keystroke; wait until they **pause typing**, then fire one search. Saves a request per letter and avoids flickering results.
- **Autosave** — save after the user stops editing for a moment.
- **Resize** — recompute layout after resizing **finishes**, not continuously.
Key property: if events never pause, the function **never runs** until they do — you only get the final state.

## Throttle: Cap the Rate

**Throttling** runs the function at most **once per interval**, no matter how many events fire — e.g. at most once every 200ms. It doesn't wait for a pause; it **guarantees regular execution** during continuous activity.
- **Mental model:** "run at a steady maximum rate."
- **Scroll handlers** — update a scroll indicator / lazy-load check every ~100ms **while** scrolling (you want ongoing updates, not just when scrolling stops).
- **Mouse move / drag** — update a position at a bounded rate.
- **Rate-limiting** button spam or continuous actions.
Key property: with continuous events, the function **keeps running** at the capped rate (unlike debounce, which waits for the end).

## The Key Difference

- **Debounce** — fires **once, after** the burst ends. "Do it when they're done." (search, autosave, resize-end)
- **Throttle** — fires **regularly, during** the burst. "Do it at most every N ms." (scroll, drag, live updates)
Choose by whether you need the **final** result after activity stops (debounce) or **ongoing** results during activity (throttle).

## Notes

- Libraries (lodash `debounce`/`throttle`) handle edge cases (leading/trailing calls, cancel, max wait). Rolling your own is fine but mind the trailing call and cleanup.
- In React, keep the debounced/throttled function stable across renders (useRef/useMemo) or it resets each render.
- Pick the **delay** by feel: too short = little benefit; too long = sluggish. ~150–300ms is common for input.

## Pitfalls (in understanding/using)

- **Confusing the two** — using debounce for a scroll indicator (it won't update while scrolling) or throttle for search (fires mid-typing, wasteful). Match to "after" vs "during."
- Recreating the debounced function **every render** (React) → the timer resets constantly and it never fires.
- Forgetting to **cancel/cleanup** on unmount → stale calls, memory leaks.
- Too-long delays making the UI feel unresponsive.
- Missing the **trailing** call → the final input is dropped (e.g. last keystroke never searched).
- Using them to mask a genuinely slow handler instead of also optimizing the handler itself.
