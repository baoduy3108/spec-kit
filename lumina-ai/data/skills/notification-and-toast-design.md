---
name: notification-and-toast-design
description: Notification and toast design — transient toasts vs persistent alerts vs inline messages, severity levels, placement and timing, auto-dismiss vs manual, actionable notifications with undo, avoiding notification overload/fatigue, and accessibility (screen-reader announcements). Use when designing toasts, snackbars, alerts, banners, or a notification system.
category: design
keywords_vi: thiết kế thông báo toast snackbar, thông báo thoáng qua so với cảnh báo dai dẳng, mức độ nghiêm trọng severity, vị trí và thời gian hiển thị, tự ẩn hay đóng tay, thông báo có nút hoàn tác undo, tránh quá tải thông báo notification fatigue
---

# Notification & Toast Design

Notifications tell the user something happened without derailing them. The art is matching the *importance* of the message to how *interrupting* the delivery is — and respecting the user's attention so alerts stay meaningful.

## Match Delivery to Importance

There's a spectrum from quiet to blocking; pick the least intrusive that does the job:
- **Toast / snackbar** — brief, transient, non-blocking; auto-dismisses. For **confirmations and low-stakes info** ("Saved", "Copied"). Appears, informs, fades — the user doesn't have to act.
- **Inline message** — attached to the relevant element (a field error, a section warning). For feedback **tied to a specific place**; it's the clearest because it's *where the issue is*.
- **Banner / persistent alert** — stays until dismissed or resolved. For **ongoing, important context** ("You're offline", "Trial ends in 2 days").
- **Modal / dialog** — blocks everything. Reserve for **critical, must-decide-now** cases (destructive confirmation, required choice). Overusing modals trains users to dismiss reflexively.

The failure mode is mismatch: a toast for a critical error (missed and gone), or a modal for a trivial confirmation (needlessly blocking).

## Severity, Communicated Redundantly

Info / success / warning / error should be distinguishable by **icon + wording + color** — never color alone (colorblind users, and it reads as decoration). Errors especially must say what happened and what to do next (see error-messages-and-recovery).

## Timing & Placement

- **Auto-dismiss** duration scales with reading time — a short toast ~4–6s; never auto-dismiss something **actionable** before the user can react (or the "Undo" vanishes).
- **Consistent placement** (commonly top-right or bottom-center) so users know where to look.
- **Stack, don't overlap** multiple toasts; cap the visible count and queue the rest.
- **Pause on hover / focus** so a user reading it isn't cut off.

## Make Them Actionable

The best notifications offer a next step:
- **Undo** on a snackbar turns a scary destructive action into a safe, reversible one ("Item deleted — Undo") — often better UX than an "Are you sure?" modal beforehand.
- A "View" / "Retry" / "Fix" action links straight to resolution.

## Avoid Notification Fatigue

Every alert spends the user's attention; overspend and they tune out (or disable) *all* of them — including the important ones:
- **Don't notify for the expected.** Silence success that the user already sees happen.
- **Batch and summarize** instead of firing many small alerts.
- Give **granular controls** — let users choose what's worth interrupting them for, and respect quiet hours / do-not-disturb.
- **Prioritize** — reserve interrupting channels (push, modal) for genuinely time-sensitive things.

## Accessibility

Toasts appear and vanish without focus, so screen-reader users miss them unless announced. Use a **live region** (`aria-live`: `polite` for info, `assertive` for errors) so assistive tech reads the message. Ensure notifications are keyboard-dismissible and don't rely on hover alone.

Well-designed notifications feel like a considerate assistant: they speak up exactly when it matters, in proportion to how much it matters, and never cry wolf.
