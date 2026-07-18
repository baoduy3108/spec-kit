---
name: react-native-patterns
description: Build React Native apps well — reusing React knowledge for native, core components vs web HTML, styling with StyleSheet/Flexbox, navigation, platform-specific code, the bridge/performance model (avoid heavy JS-thread work, use FlatList), and native modules. Use when building or reviewing a React Native mobile app.
category: engineering
keywords_vi: react native, ứng dụng di động react, core component view text, stylesheet flexbox, navigation react navigation, platform specific ios android, flatList, native module
---

# React Native Patterns

React Native builds native iOS/Android apps with React and JavaScript. Your React knowledge (components, hooks, props/state — see react-patterns) transfers directly; the differences are the platform and performance model.

## Native Components, Not HTML

Instead of `div`/`span`, you use core components that map to **real native views**: `<View>` (container), `<Text>` (all text must be inside Text), `<Image>`, `<ScrollView>`, `<TextInput>`, `<Pressable>`/`<TouchableOpacity>`. There's no HTML/DOM — it's actual native UI. Text can't be a bare child of a View; wrap it in `<Text>`.

## Styling

Style with JS objects via **`StyleSheet.create`** (not CSS files) — a subset of CSS in camelCase. **Layout is Flexbox** (the default, `flexDirection: 'column'` by default, unlike web). No cascade, no media queries — use dimensions/platform APIs for responsiveness. Keep styles in StyleSheet for performance and reuse.

## Navigation

Use **React Navigation** (the standard) for stacks, tabs, and drawers — there's no URL/router like the web. Structure screens and pass params through the navigator.

## Platform-Specific Code

Handle iOS/Android differences with `Platform.OS`/`Platform.select`, or platform-specific file extensions (`Button.ios.js` / `Button.android.js`). Most code is shared; branch only where platforms genuinely differ (design guidelines, permissions, native features).

## Performance Model

RN runs your JS on a separate thread and communicates with native. Keep it smooth:
- **Use `FlatList`/`SectionList`** for long lists (virtualized — renders only visible rows), never `.map` over a huge array in a ScrollView (renders everything → jank/memory).
- **Avoid heavy work on the JS thread** — it blocks UI/gestures; offload or memoize.
- Optimize re-renders (memo, stable callbacks — same as React), optimize images, and use the new architecture (Fabric/JSI) where available. Animations: use the native driver / Reanimated so they run off the JS thread.

## Native Modules

When you need something JS can't do (specific native APIs, heavy native SDKs), use existing community packages or write a **native module** (Swift/Kotlin bridged to JS). Prefer well-maintained libraries over rolling your own.

## Pitfalls

- **`.map` over big lists** in ScrollView instead of `FlatList` → jank/OOM.
- **Text not wrapped in `<Text>`** → error.
- **Blocking the JS thread** with heavy work → dropped frames, laggy gestures.
- **Web/CSS assumptions** (cascade, media queries, `div`) that don't exist.
- **Non-native-driver animations** → janky.
- Not handling platform differences / permissions.
