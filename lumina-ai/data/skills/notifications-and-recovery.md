---
name: notifications-and-recovery
description: Patterns for communicating state changes and enabling user recovery when errors occur — toast notifications, inline errors, alert banners, retry/undo/autosave, notification center design. Use when designing notification/error-recovery UX.
category: design
keywords_vi: toast notification, thông báo lỗi ui, undo redo ui, autosave, notification center
---

# Notifications and Recovery

Patterns for communicating state changes and enabling user recovery when errors occur.

## Key Patterns

**Toast Notifications** appear bottom-center/right for transient feedback (4–6s for success, persistent for errors). They should never stack; queue them instead.

**Inline Errors** display adjacent to problematic fields with red borders and `aria-describedby` associations. Validate on blur and submit, not during typing.

**Alert Banners** persist at the top of affected sections for ongoing issues like service degradation or subscription reminders.

## Recovery Actions Required

Every error must offer a path forward:
- **Retry** for transient failures (network, timeouts)
- **Undo** for destructive actions (persist 5–10s)
- **Autosave** every 30–60s with local storage fallback
- **Graceful degradation** when partial features fail

## Loading States

Use skeleton screens for content-heavy pages and spinners for targeted actions. Never show a blank screen while loading.

## Notification Center Design

Keep controls coarse (1–3 categories maximum) with simple levels: Off, Minimal, All. Minimize reading time by grouping by category and using recognizable icons.

## Accessibility

Errors require `role="alert"` for immediate announcement; status updates use `role="status"` for polite announcement. Close buttons must remain keyboard-accessible.
