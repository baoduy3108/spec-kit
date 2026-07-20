---
name: datetime-and-timezones
description: Handle dates, times, and timezones without the classic bugs — store and compute in UTC, convert to local only for display, understand offsets vs named timezones and DST, use timezone-aware types, and avoid naive-datetime and DST-gap pitfalls. Use when storing timestamps, scheduling, computing durations, or debugging "wrong time" bugs.
category: engineering
keywords_vi: xử lý thời gian, timezone, múi giờ, utc, datetime, dst giờ mùa hè, lưu thời gian sai, chuyển múi giờ, tính khoảng thời gian
---

# Dates, Times & Timezones

Time handling is a top source of subtle bugs. Almost all of them are avoided by one rule: **store and compute in UTC, convert to local only at display**.

## The Golden Rules

1. **Store timestamps in UTC** (e.g. `timestamptz`, or an ISO-8601 string with offset). Never store a local time without its zone — it's ambiguous.
2. **Convert to the user's timezone only for display**, at the last moment, using their zone.
3. **Use timezone-aware types**, never naive datetimes. A naive datetime ("2026-03-14 09:00" with no zone) is a bug waiting to happen — you can't correctly compare or convert it.
4. **Do arithmetic in UTC** — durations and comparisons are correct in UTC; doing them in local time breaks across DST.

## Offset vs Named Timezone

- An **offset** (`+07:00`) is a fixed number — fine for a single instant, but it doesn't know about DST.
- A **named timezone** (`Asia/Ho_Chi_Minh`, `America/New_York`) encodes the *rules*, including DST transitions and historical changes. **Store the user's named zone** if you need to compute future local times (e.g. "9am every day") — an offset alone will be wrong after a DST change.

## DST Pitfalls

- **Spring forward** — some local times don't exist (the clock skips 2:00–3:00); scheduling "2:30am" that day is ambiguous/invalid.
- **Fall back** — some local times happen twice.
- A "1 day later" is **not** always "+24 hours" across a DST boundary — add calendar days with a timezone-aware library, not by adding 86400 seconds.
- The server's local timezone must never leak into logic — set processes to UTC and be explicit.

## Practical

- Use a real datetime library (Python `datetime` with `zoneinfo`, JS `Temporal`/`date-fns-tz`/Luxon) — never hand-roll timezone math or parse dates with string slicing.
- Format for display with the user's locale and zone; parse input knowing its zone.
- For "date only" (birthdays, holidays) use a date type without time/zone — attaching midnight-in-some-zone causes off-by-one-day bugs.
- Test around DST transitions, year boundaries, and leap years/seconds.
