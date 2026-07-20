---
name: mobile-state-restoration
description: Handling mobile app state across lifecycle events — configuration changes (rotation), backgrounding, and OS-initiated process death, so users return to exactly where they were, using saved instance state and lifecycle-aware state holders. Use to preserve UI state on rotation/backgrounding, survive process death, or restore where the user left off.
category: engineering
keywords_vi: khôi phục trạng thái, process death, instance state, xoay màn hình config change, os giết app nền, holder trạng thái theo vòng đời, trở lại đúng chỗ, restoration
---

# Mobile State Restoration

A subtle but crucial mobile skill: making sure the user **returns to exactly where they were** after the OS interrupts the app — a screen rotation, backgrounding to take a call, or the OS **silently killing** the app to reclaim memory. Handle this wrong and users lose their form input, scroll position, or navigation state — a maddening experience (see mobile-app-architecture, responsive-vs-adaptive-mobile).

## The Three Interruptions (and their differences)

- **Configuration change** (rotation, fold, theme/locale change, window resize) — on some platforms the OS **destroys and recreates** the current screen. Transient view state (scroll, text-in-progress) is lost unless preserved. Frequent and immediate.
- **Backgrounding** — the user leaves the app (home button, app switch, incoming call). The app is **paused** but usually **still in memory**; returning is fine — unless the OS later kills it.
- **Process death** — while your app is in the background, the OS **kills your process** to free memory. When the user returns (even much later), the OS **recreates the app** and expects it to **restore** as if it never left — but all in-memory state is **gone**. This is the one developers most often forget, and it doesn't happen on the dev's fast phone with lots of RAM, so it ships broken.

## The Core Idea: Persist Enough to Rebuild the UI

You must **save the minimal state** needed to reconstruct the screen, and **restore** it on recreation:
- **Transient UI state** (scroll position, text field contents, selected tab, expanded/collapsed) → save to a **saved-instance-state** bundle (survives config change **and** process death) or a lifecycle-aware **state holder** (ViewModel survives config change but **not** process death — so also persist critical bits).
- **Important/durable state** (a draft the user typed, form progress) → persist to **disk/database** so even process death can't lose it.
- **Navigation state** — where the user was in the nav stack should restore, so they land back on the right screen.

The rule of thumb: **config change** → in-memory holder is enough; **process death** → must have persisted to a bundle or disk.

## What to Save (and not)

- **Save**: UI/navigation state (scroll, selection, input, current screen) and user-entered data that isn't yet committed.
- **Don't save** large objects or data you can **re-fetch/rederive** — save an **ID or key**, then reload the data on restore. Saved-state bundles are **small** by design; stuffing big data in them fails.
- **Re-fetch** server data on restore rather than serializing it.

## Design Guidance

- **Test process death explicitly** — use the "don't keep activities" developer option / background-then-kill; it won't reproduce by itself on a good device.
- **Hold UI state in a lifecycle-aware holder** (ViewModel) for config changes, **and** persist critical state for process death.
- **Save IDs, reload data** — keep saved state small; rehydrate from the source of truth.
- **Restore navigation** so users return to the right screen and back stack.
- **Persist drafts** immediately (autosave) so nothing typed is ever lost.
- **Restore gracefully** — if restoration data is stale/invalid, degrade sensibly rather than crash.

## Pitfalls (in understanding/using)

- **Forgetting process death** → app looks fine in dev but users lose everything when they return after the OS killed it (the #1 miss).
- Relying **only on a ViewModel** for state → survives rotation but **not** process death; persist critical state too.
- Stuffing **large data** into the saved-state bundle → crashes/limits; save keys and re-fetch.
- Losing **unsaved input** (form/draft) on interruption → autosave it.
- Not restoring **navigation/scroll** → user dumped on the home screen or top of a list.
- **Never testing** rotation and background-kill → shipping broken restoration.
- Crashing on **stale** restored state (referring to data that changed) → validate on restore.
