---
name: error-messages-and-recovery
description: Error message and recovery design — human-readable messages that say what happened and how to fix it, no blame or jargon/codes, inline placement near the cause, preventing errors over scolding, preserving user input, graceful degradation, and turning failures into recoverable moments. Use when writing error messages, validation, or designing failure and recovery flows.
category: design
keywords_vi: thông báo lỗi và khôi phục, nói lỗi gì và cách sửa, không đổ lỗi cho người dùng, không mã khó hiểu jargon, đặt lỗi cạnh nguyên nhân inline, ngăn lỗi thay vì mắng, giữ lại dữ liệu đã nhập, phần lỗi không làm sập cả trang, có đường thử lại retry
---

# Error Messages & Recovery

Errors are inevitable; how a product handles them defines how trustworthy it feels. A good error message turns a moment of failure into a quick recovery. A bad one — cryptic, blaming, or dead-ended — makes users feel stupid and abandon the task.

## Anatomy of a Good Error

Every error message should answer three things, in plain language:
1. **What happened** — clearly, without jargon or raw codes ("We couldn't save your changes", not "Error 0x8004").
2. **Why / what's wrong** — enough to orient ("Your session expired", "That email is already registered").
3. **How to fix it** — a concrete next step or action ("Log in again to continue", with a button).

If the user can't tell what to *do* next, the message has failed at its only job.

## Tone: Helpful, Never Blaming

- **Don't blame the user.** Avoid "You entered an invalid…", "Illegal input". Frame neutrally: "That date is in the past — please pick a future date."
- **No jargon, no scary tech.** Stack traces, error codes, and "null pointer" belong in logs, not in the user's face. (Offer a reference ID for support if needed, tucked away.)
- **Match the stakes** — light and reassuring for small issues; calm and clear for big ones. Never cute about data loss.

## Place It Where the Problem Is

- **Inline, next to the cause** — a form field error belongs under that field, not in a summary at the top the user has to map back. Highlight the field; keep valid fields untouched.
- **Timing** — validate at the right moment: on blur / on submit for most fields (not angry-red while the user is still typing the first character). Confirm success too.
- Match delivery to severity (inline vs toast vs banner vs modal — see notification-and-toast-design).

## Prevent Over Scold

The best error is the one that never happens:
- **Constrain input** so mistakes are impossible (date pickers, dropdowns, input masks, disabling invalid options).
- **Format as they type**, show requirements up front (password rules *before* they submit), and give real-time hints.
- **Confirm destructive actions** and prefer **undo** over prevention nags.

## Preserve the User's Work

A cardinal sin: an error that **wipes what the user typed**. On a failed submit, **keep all their input** and just flag what needs fixing. Losing a long form to one bad field is infuriating and erodes trust instantly. Never make a user redo work because of an error.

## Recover Gracefully

- **Graceful degradation** — when part fails, keep the rest working. A failed widget shouldn't take down the page; show a small "couldn't load — retry" in its place.
- **Retry paths** — transient failures (network) get a clear "Try again", ideally with auto-retry/backoff behind the scenes.
- **Safe fallbacks** — offline states, cached data, or a reduced mode beat a blank error screen.
- **Never dead-end** — every error offers a way forward (retry, go back, contact support, alternative action).

Handled well, errors become almost invisible: the user hits a snag, immediately understands it, fixes it in one step, and keeps going — with their trust in the product intact.
