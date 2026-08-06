---
name: how-push-notifications-work
description: How mobile push notifications work — the app registers for a device token, your server sends payloads through the platform push service (APNs/FCM) which delivers to the device, plus reliability, best-effort delivery, and good notification practices. Use to understand push notifications, APNs/FCM, device tokens, or delivering server-initiated messages to mobile.
category: engineering
keywords_vi: push notification, thông báo đẩy di động, đăng ký device token, gửi qua apns fcm, dịch vụ đẩy của nền tảng giao tới thiết bị, best-effort không đảm bảo, thực hành thông báo tốt
---

# How Push Notifications Work

Push notifications let your **server send a message to a user's device** even when your app isn't running. You can't just connect to a phone whenever you like — instead you go through the **platform's push service** (Apple's **APNs**, Google's **FCM**), which maintains the persistent connection to devices and delivers on your behalf. Understanding this flow explains tokens, reliability limits, and why notifications sometimes don't arrive (see mobile-app-architecture, battery-and-network-efficiency).

## The Problem: You Can't Reach a Sleeping Phone

A mobile device isn't a server — it has no fixed address, is often asleep to save battery, and can't hold open connections to every app's backend. So an app's server **cannot** directly push to it. The OS solves this: the platform maintains **one** battery-efficient persistent connection to its push service, and **all** apps' notifications flow through that single channel.

## The Core Flow

1. **Register** — the app asks the OS to register for push; the OS (via APNs/FCM) returns a unique **device token** (an address for *this app on this device*).
2. **Store the token** — the app sends the token to **your server**, which saves it (per user/device).
3. **Send** — when your server wants to notify a user, it sends a **payload** (message + metadata) to the **push service** (APNs/FCM), authenticated and addressed with the device token.
4. **Deliver** — the push service pushes it over its persistent connection to the device; the OS wakes the app / shows the notification.

Your server never talks to the device directly — it always goes **server → push service → device**.

## Foreground vs Background

- **Foreground** — your app is open; it can handle the notification data directly (often suppressing the banner and updating UI).
- **Background / closed** — the OS displays the notification; tapping it launches/opens your app (often via a deep link — see how-deep-linking-works).
- **Silent / data pushes** — a payload with no visible alert that wakes the app to fetch data / sync in the background (rate-limited by the OS to save battery).

## Reliability: Best-Effort

Push delivery is **best-effort, not guaranteed**:
- If the device is off/offline, the push service **queues** it but may only keep the **latest** (APNs collapses/replaces) and drops it after a while.
- Tokens **change/expire** (reinstall, restore, OS updates) — you must handle **invalid token** feedback and prune dead tokens.
- Users can **revoke** notification permission anytime.
So never rely on a push as the *only* way critical data reaches the app — treat it as a **hint to sync**, with the app pulling the source of truth on open.

## Design Guidance

- **Handle token refresh/invalidation** — update your server when tokens change; remove tokens the push service reports as invalid.
- **Notifications are hints** — on tap/receipt, **fetch** the real data; don't assume the payload is complete or that it always arrived.
- **Respect the user** — ask for permission at a meaningful moment (not on first launch), let users control categories, and don't spam (over-notifying gets you muted/uninstalled).
- **Deep link** the tap to the right in-app screen (see how-deep-linking-works).
- **Localize and time** notifications sensibly (timezones, quiet hours).

## Pitfalls (in understanding/using)

- Assuming delivery is **guaranteed** → it's best-effort; use pushes as sync triggers, not the sole channel.
- Not pruning **invalid/expired tokens** → wasted sends and errors.
- Requesting permission **too early** (first launch) → users decline; ask in context.
- **Over-notifying** → users disable notifications or uninstall.
- Putting **sensitive data** in the payload → it passes through the platform service and shows on the lock screen.
- Forgetting the **tap → deep link** so users land on the relevant screen, not a cold home screen.
- Ignoring **silent-push rate limits** and battery rules → the OS throttles or drops them.
