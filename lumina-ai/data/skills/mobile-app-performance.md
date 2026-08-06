---
name: mobile-app-performance
description: Optimizing mobile app performance — fast startup (cold vs warm), smooth 60fps scrolling by avoiding main-thread jank, memory efficiency to avoid low-memory kills, efficient lists, and image handling. Use to fix slow app startup, janky scrolling, high memory use, or optimize mobile UI performance.
category: engineering
keywords_vi: hiệu năng app di động, cold start, cuộn mượt 60fps, jank luồng chính, khởi động nhanh, tiết kiệm bộ nhớ tránh bị kill, recycle danh sách, xử lý ảnh mobile
---

# Mobile App Performance

Mobile performance is judged on three things users feel immediately: **how fast the app starts**, **how smoothly it scrolls/animates**, and **whether it stays responsive without being killed** for using too much memory. Phones have far less headroom than servers — limited CPU, memory, and battery — so efficiency is a first-class concern (see how-browser-rendering-works, battery-and-network-efficiency).

## Startup Time

First impressions are startup:
- **Cold start** — the app process isn't running; the OS creates it, initializes, and draws the first frame. The slowest and most important to optimize.
- **Warm/hot start** — the process/app is partly alive; faster.
Keep cold start fast by **deferring work**: don't do heavy initialization (network calls, large parsing, loading everything) on the startup path. Show the first meaningful screen ASAP, then lazy-load the rest. Heavy synchronous work in app/screen initialization is the classic startup killer.

## Smooth Scrolling and 60fps

The UI thread must produce a frame every ~16ms (60fps) — overrun and the app **janks** (stutters). The rules mirror browser rendering (see how-browser-rendering-works):
- **Keep the main/UI thread free** — never do disk/network/heavy computation on it; offload to background threads.
- **Efficient lists** — long lists must **recycle** views (RecyclerView / UITableView / FlatList) and only render what's visible; never build a giant list of all items at once.
- **Cheap layouts** — deep/complex view hierarchies are expensive to measure and draw; flatten them.
- **Avoid overdraw** — drawing the same pixel many times (stacked opaque backgrounds) wastes GPU.
- **Image handling** — decode/resize images **off** the main thread and to the **display size** (not full resolution); cache decoded bitmaps.

## Memory and Low-Memory Kills

Mobile OSes **kill** background (and sometimes foreground) apps that use too much memory. Efficiency keeps you alive and fast:
- **Right-size images** — bitmaps are the #1 memory hog; load at display resolution, not original.
- **Avoid leaks** — holding references to destroyed screens/contexts leaks memory and eventually crashes (a top mobile bug). Watch listeners, static references, and long-lived callbacks pinning views.
- **Release** heavy resources when backgrounded.
- **Paginate** data instead of loading huge sets into memory.

## Battery and Network (see battery-and-network-efficiency)

Performance includes not draining the battery — batch network calls, avoid wakeful polling, and defer background work. Covered in depth in battery-and-network-efficiency.

## Design Guidance

- **Measure on real, low-end devices** — not just the latest flagship or an emulator; the slow phone is your true target.
- **Defer startup work** — first frame fast, everything else lazy.
- **Recycle list views** and render only visible items.
- **Off-main-thread** all I/O and heavy compute.
- **Right-size and cache images**; decode off the main thread.
- **Profile** (systrace/Instruments/profilers) to find the actual bottleneck rather than guessing.
- **Fix leaks** — use leak detectors; released screens must be garbage-collectable.

## Pitfalls (in understanding/using)

- Heavy work on the **main thread** (I/O, parsing, image decode) → jank and ANRs/frozen UI.
- **Non-recycling** lists that build all items at once → memory spikes and scroll jank.
- Loading **full-resolution images** into memory → OOM kills and slowness.
- **Memory leaks** from retained destroyed screens/contexts → crashes over time.
- Doing everything on **startup** → slow cold start; defer it.
- Testing only on a **high-end device** → shipping an app that's unusable on the phones most users actually have.
- Optimizing by **guess** instead of profiling → effort wasted on non-bottlenecks.
