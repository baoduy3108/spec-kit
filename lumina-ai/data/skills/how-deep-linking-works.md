---
name: how-deep-linking-works
description: How mobile deep linking works — URI schemes and universal/app links that open a specific screen in an app instead of a browser, deferred deep linking for not-yet-installed apps, and routing the link to in-app state. Use to understand deep links, universal/app links, opening app screens from URLs, or deferred deep linking.
category: engineering
keywords_vi: deep linking, liên kết sâu mở màn hình app, uri scheme universal link app link, mở app thay vì trình duyệt, deferred deep link chưa cài app, định tuyến link tới trạng thái trong app
---

# How Deep Linking Works

A deep link is a URL that opens a **specific screen inside a mobile app** — not just launching the app to its home screen, and not opening a web page. Tap a link to a product, and it opens that product **in the app**. This powers notifications, sharing, marketing campaigns, and app-to-app flows. Doing it well involves several mechanisms with important reliability differences (see how-push-notifications-work, mobile-navigation-patterns).

## The Problem: Links Default to the Browser

A normal `https://` link opens a **web browser**. But you often want it to open the **app** at the right place — a shared post, a "reset password" email, a notification tap, an ad. Deep linking bridges the web/URL world to specific in-app destinations.

## The Mechanisms

- **Custom URI scheme** (`myapp://product/123`) — the app registers a custom scheme; tapping such a link opens the app and passes the URL. **Simple**, but flawed: if the app **isn't installed**, the link **fails** (error/nothing), and any app can claim a scheme (not unique/secure). Largely superseded for public links.
- **Universal Links (iOS) / App Links (Android)** — use **regular `https://` URLs** that the OS routes to the app **if installed**, else opens the **website**. The OS verifies ownership via a file the domain hosts (Apple `apple-app-site-association`, Android `assetlinks.json`), so it's **secure** and **degrades gracefully** to the web. This is the **recommended** approach: one URL works whether or not the app is installed.

## Deferred Deep Linking

A tricky case: the user taps a deep link but **doesn't have the app installed**. You want them to install the app **and then** land on the intended screen — not a generic home screen after install. **Deferred deep linking** solves this: capture the intended destination before install, send the user to the store, and after install+first launch, **route them to the original target**. This usually needs a **deep-linking service** (Branch, Adjust, Firebase Dynamic Links) or fingerprint/clipboard matching, because the OS doesn't natively carry the destination across an install.

## Routing the Link In-App

Once the app opens with a link, it must **parse** the URL and **navigate** to the right screen with the right state:
- Extract the path/params (`/product/123` → product screen, id 123).
- Build the correct **navigation stack** so the **back button** behaves sensibly (e.g. back goes to a logical parent, not out of the app).
- Handle **auth** — if the target needs login, gate it and continue to the destination after sign-in.
- Handle **invalid/expired** links gracefully.

## Design Guidance

- **Prefer Universal/App Links** (verified `https://`) over custom schemes — secure and web-fallback graceful.
- **Host the verification files** correctly (association files) or links silently fall back to the browser.
- **Deferred deep linking** for post-install routing (via a service) so acquisition campaigns land users on the right screen.
- **Build a sensible back stack** so deep-linked screens integrate with navigation (see mobile-navigation-patterns).
- **Validate and auth-gate** the destination; handle missing content gracefully.
- **One link, both worlds** — the same URL should work on web and open the app when installed.

## Pitfalls (in understanding/using)

- Relying on **custom URI schemes** for public links → fails when the app isn't installed and isn't secure.
- **Association files misconfigured** → the OS won't route to the app; links open the browser instead (a very common, silent failure).
- Ignoring the **not-installed** case → tapping a link is a dead end instead of an install-then-land flow.
- Deep link that **breaks the back stack** → back button exits the app abruptly or goes somewhere confusing.
- Not **auth-gating** a protected destination → crash or leak when an unauthenticated user deep-links in.
- Assuming deferred deep linking works **natively** → it generally needs a service to carry the destination across install.
