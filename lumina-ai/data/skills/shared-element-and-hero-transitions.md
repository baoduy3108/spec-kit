---
name: shared-element-and-hero-transitions
description: Shared-element and hero transitions — animating an element as it moves between two screens/states so the UI feels continuous, the FLIP technique, the View Transitions API, Flutter Hero animations, and maintaining spatial continuity and context. Use when animating navigation between screens, expanding a thumbnail to a detail view, or making transitions feel connected.
category: design
keywords_vi: chuyển cảnh phần tử dùng chung shared element, hero transition thumbnail nở ra chi tiết, kỹ thuật flip first last invert play, view transitions api trình duyệt, hero animation flutter, giữ liên tục không gian và ngữ cảnh, điều hướng giữa màn hình mượt
---

# Shared-Element & Hero Transitions

A shared-element (or "hero") transition animates a single element **continuously as it moves between two states or screens** — a thumbnail growing into a full detail view, a list row expanding into a page. Instead of one screen abruptly replacing another, the shared element visually *carries* the user across, preserving spatial context and making navigation feel like one connected space.

## Why It Matters

Abrupt screen swaps make users momentarily reorient ("where did that come from? where am I?"). A shared-element transition answers those questions *through motion*: the photo they tapped is the same photo now filling the screen. This **spatial continuity** reduces cognitive load, communicates hierarchy (this detail came from that item), and makes an app feel polished and physical rather than a stack of disconnected pages.

## The FLIP Technique

The core web implementation trick — **FLIP** = First, Last, Invert, Play — animates cheaply even across layout changes:
1. **First** — measure the element's starting position/size (`getBoundingClientRect`).
2. **Last** — move it to its final state (change DOM/layout), measure again.
3. **Invert** — apply a `transform` that makes it *look* like it's still in the First position (translate/scale back).
4. **Play** — transition the transform to `none`, so it animates smoothly from First to Last.

FLIP animates only `transform` (GPU-cheap, see css-animations-and-transitions) even though the underlying layout jumped instantly — giving smooth 60fps motion across DOM changes that would otherwise be impossible to tween.

## The View Transitions API

Modern browsers offer the **View Transitions API** — wrap a DOM update in `document.startViewTransition(() => update())` and the browser snapshots before/after and crossfades automatically. Tag elements with `view-transition-name` and matching names animate *between* states as shared elements — hero transitions with far less manual FLIP code, even across full page navigations (MPA).

## Flutter Hero Animations

Flutter's **Hero** widget is the same concept made declarative: wrap the source and destination widgets in `Hero` with the *same tag*, and Flutter automatically flies the element between routes on navigation, interpolating its position and size. It's the canonical example of the pattern — you declare "these two are the same thing", the framework animates the bridge. Native platforms (iOS/Android shared element transitions) work analogously.

## Doing It Well

- **Match identity** — the shared element must be visually the *same* thing (same image/title), or the illusion breaks.
- **Keep it fast** — 250–350ms; a hero transition that lingers annoys on repeat navigation.
- **Animate what continues; fade the rest** — the hero moves/scales, while surrounding content of both screens crossfades in/out so only the connective element draws the eye.
- **Reverse gracefully** — going back should reverse the transition (detail collapses back to the thumbnail).
- **Handle interruption & missing targets** — if the destination element doesn't exist yet, fall back to a plain transition rather than a broken jump.
- **Respect reduced-motion** — offer a simple crossfade alternative.

## When to Use

Great for: thumbnail → detail, list item → full page, tab/card expansion, image galleries. Overused, it's dizzying — reserve it for genuine parent→child navigations where continuity aids understanding, not every transition.

The essence: identify the element that persists across two states, and animate *it* smoothly between them (via FLIP, View Transitions, or Hero) while everything else fades — turning a jarring screen swap into a continuous, legible journey.
