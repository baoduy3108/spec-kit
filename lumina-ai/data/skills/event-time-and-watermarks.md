---
name: event-time-and-watermarks
description: How stream processors compute correct time-based results when events arrive late and out of order — event-time vs processing-time, and watermarks that estimate "we've probably seen all events up to time T". Use to understand why processing-time aggregations are wrong under delay, how watermarks trigger windows, the allowed-lateness / completeness-vs-latency trade-off, and late-data handling.
category: data-engineering
keywords_vi: thời gian sự kiện event-time và thời gian xử lý processing-time, sự kiện đến trễ và không đúng thứ tự, watermark ước lượng đã thấy hết sự kiện tới mốc t, watermark kích hoạt đóng cửa sổ window, đánh đổi độ trễ và độ đầy đủ completeness, xử lý dữ liệu trễ allowed lateness
---

# Event-Time & Watermarks

Real-time analytics constantly asks time-bucketed questions: "clicks per minute", "revenue this hour". The trap is **which clock you use**. **Processing-time** = when the event *reaches the processor*. **Event-time** = when the event *actually happened* (a timestamp in the event). These diverge because events are **delayed and reordered**: a mobile user goes through a tunnel and their 9:59 click arrives at 10:03, after 10:00–10:02 events. Bucketing by *processing-time* would count that click in the wrong minute — your "9:59" total is wrong (see windowing-in-stream-processing, stream-processing, exactly-once-stream-processing).

## Why Event-Time Is Harder (but correct)

Processing-time is trivial (use the wall clock) but **wrong** under delay, and **non-reproducible** (reprocessing the same data later gives different buckets). Event-time gives the **correct, deterministic** answer — the 9:59 click lands in the 9:59 window no matter when it arrives — but forces a hard question: **when is a time window "done"?** You can't wait forever for stragglers, and you can't close early or you miss late events.

## Watermarks

A **watermark** is the stream processor's assertion: *"I believe I have now seen all events with event-time ≤ T."* It's a moving marker that flows through the pipeline, **estimating completeness** of event-time progress. When the watermark passes the **end** of a window, the processor decides that window is complete and **emits its result** (fires the window).

Watermarks are **heuristic** — you choose how far behind the newest event-time to set them (e.g. "watermark = max event-time seen − 30s"), which encodes your assumption about maximum lateness:
- **Watermark too tight** (small lag) → windows fire fast (low latency) but **late events miss** their window (incomplete results).
- **Watermark too loose** (large lag) → results are more **complete** but arrive **later**.

This is the fundamental **latency vs completeness** trade-off, and watermarks are the knob.

## Late Data (past the watermark)

Events later than the watermark are **late**. Options:
- **Drop** them (simple, lossy).
- **Allowed lateness** — keep window state a while longer and **update** the result when late events trickle in (emit a correction/retraction).
- **Side output** late events to a separate stream for special handling.

## Design Guidance (for understanding/using)

- **Use event-time** for anything that must be correct and reproducible; reserve processing-time for coarse "current rate" dashboards where wrongness is acceptable.
- **Set watermark lag from real observed lateness** — measure your data's delay distribution; don't guess.
- **Decide a late-data policy explicitly** — drop, allowed-lateness update, or side-output; silence means silent data loss.
- **Expect corrections** if you allow lateness — downstream consumers must handle updated/retracted results.
- **Watermarks are estimates** — they trade completeness for latency; there's no perfect setting, only the right one for your SLA.

## Pitfalls (in understanding/using)

- Bucketing by **processing-time** and calling it "per-minute" → wrong counts under delay, non-reproducible on replay.
- Watermark lag too small → late events silently dropped, undercounting.
- Watermark lag too large → stale, high-latency results.
- Ignoring late data policy → default drop loses events you didn't know you were losing.
- Assuming reprocessing gives identical results with processing-time → only **event-time** is deterministic on replay.
