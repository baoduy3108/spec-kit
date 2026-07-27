---
name: windowing-in-stream-processing
description: How to aggregate an unbounded stream into finite chunks — windowing. Tumbling (fixed non-overlapping), sliding/hopping (overlapping), and session (activity-gap) windows, plus how triggers decide when to emit and how state is retained. Use to choose a window type, understand overlap and double-counting, session gaps, and why windowing + event-time + watermarks work together.
category: data-engineering
keywords_vi: cửa sổ hoá stream windowing gom luồng vô hạn thành khối hữu hạn, cửa sổ cố định không chồng lấn tumbling, cửa sổ trượt chồng lấn sliding hopping, cửa sổ phiên theo khoảng ngừng hoạt động session window, trigger quyết định khi nào phát kết quả, giữ trạng thái state cho từng cửa sổ
---

# Windowing in Stream Processing

A stream is **unbounded** — it never ends — but almost every useful aggregation ("count", "sum", "average") needs a **finite** set of records to compute over. **Windowing** is how you slice the endless stream into bounded chunks you can aggregate: "clicks per 1-minute window", "5-minute moving average", "events per user session". Choosing the window **type** is a modeling decision that changes what your metric *means* (see event-time-and-watermarks, stream-processing, exactly-once-stream-processing).

## The Window Types

**Tumbling (fixed) windows** — fixed size, **non-overlapping**, back-to-back. `[10:00–10:01), [10:01–10:02), …`. Every event belongs to **exactly one** window. Use for straightforward periodic aggregates ("hits per minute"). Simple, no double-counting.

**Sliding / hopping windows** — fixed size that **advances by a smaller step**, so windows **overlap**. E.g. a 5-minute window every 1 minute → each event falls into up to 5 windows. Use for **moving averages** and smoothed rolling metrics. Cost: overlap means each event is processed by multiple windows (more state/compute), and you must **not** sum overlapping windows as if disjoint (double-counting).

**Session windows** — **data-driven**, no fixed size: a window stays open while events keep arriving and **closes after a gap of inactivity** (e.g. 30 minutes of silence ends the session). Window length varies per key. Use for **user sessions**, bursts of activity, "how long was this device active". Two events merge into one session if closer than the gap; a long pause splits them.

## Triggers and State

- **Triggers** decide **when** a window emits: normally when the **watermark** passes the window end (event-time completeness), but you can also fire **early** (speculative partial results) or **late** (updates when late data arrives). Same window, different emit policy.
- **Windowed state** — the processor holds per-window accumulators (per key). This state must be **retained** until the window fires *and* any allowed-lateness period ends, then **cleaned up** — unbounded window state is a classic memory leak. Session windows especially can grow if gaps never occur.

## How It Fits Together

Windowing answers **"which bucket"**, event-time answers **"by which clock"**, and watermarks answer **"when is the bucket done"**. You almost always use all three: event-time windows fired by watermarks, with a lateness policy for stragglers.

## Design Guidance (for understanding/using)

- **Match window type to the question** — periodic totals → tumbling; smoothed trend → sliding; per-activity/user → session.
- **Beware double-counting with sliding windows** — overlapping windows share events; don't aggregate them as disjoint.
- **Bound state** — set retention/lateness so window state is cleaned up; watch session windows for unbounded growth.
- **Pick the trigger deliberately** — early firing for low-latency dashboards, on-watermark for correctness, late updates if you accept corrections.
- **Key first** — most windows are **per-key** (per user/device); ensure your partitioning keeps a key's events together.

## Pitfalls (in understanding/using)

- Summing **overlapping** sliding windows as if independent → double-counting.
- Never cleaning up window state → memory blowup (especially session windows).
- Using tumbling windows for a "moving average" → jumpy, boundary-sensitive results; use sliding.
- Session gap set wrong → sessions merge (gap too big) or fragment (gap too small).
- Forgetting windowing depends on **event-time + watermarks** for correctness under out-of-order data.
