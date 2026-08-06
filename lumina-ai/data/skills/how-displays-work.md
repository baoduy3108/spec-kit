---
name: how-displays-work
description: How screens work — pixels and subpixels (RGB), how LCDs use a backlight + liquid crystals + filters vs OLED's self-emitting pixels, refresh rate and response time, resolution and PPI, and why OLED has true blacks. Use to understand displays, LCD vs OLED, refresh rate, resolution/PPI, HDR, or screen quality trade-offs.
category: engineering
keywords_vi: màn hình lcd oled, lcd, oled, pixel subpixel rgb, đèn nền tinh thể lỏng, oled tự phát sáng, refresh rate hz, độ phân giải ppi, đen tuyệt đối hdr
---

# How Displays Work

A screen creates images from millions of tiny colored dots — **pixels** — updated fast enough to look continuous. The two dominant technologies, **LCD** and **OLED**, produce light differently, which explains their strengths (blacks, brightness, burn-in, cost).

## Pixels & Subpixels

Each **pixel** is made of **subpixels** — typically red, green, and blue. By varying each subpixel's brightness, additive color mixing produces any color (bright R+G+B = white, all off = black; see color-expert). At normal viewing distance the subpixels blur into one perceived color. **Resolution** (e.g. 1920×1080) is the pixel count; **PPI** (pixels per inch) — resolution relative to physical size — determines sharpness (higher PPI = you can't see individual pixels).

## LCD (Liquid Crystal Display)

LCDs **don't emit light** — they filter a **backlight**:
1. A **backlight** (LED panel) shines white light from behind, always on.
2. **Liquid crystals** at each subpixel twist to let more or less light through when voltage is applied (acting as a light valve).
3. **Color filters** tint the passing light red/green/blue.
Because the backlight is always on, LCDs can't make a pixel truly black — "black" is the backlight partially leaking through → **grayish blacks** and limited contrast. **Local dimming** (dimming backlight zones) helps but is imperfect. LCDs are cheap, bright, and long-lived. Variants (IPS, VA, TN) trade viewing angles, contrast, and response time.

## OLED (Organic LED)

In OLED, **each subpixel emits its own light** — no backlight. This gives:
- **True blacks & infinite contrast** — a black pixel is simply **off** (no light at all) → perfect blacks, huge contrast, deep HDR.
- **Thinner, flexible** panels; excellent viewing angles; fast response.
Trade-offs: susceptible to **burn-in** (static elements can permanently age those pixels), typically lower peak full-screen brightness, and higher cost. Great for phones, premium TVs.

## Refresh Rate & Response Time

- **Refresh rate (Hz)** — how many times per second the image updates (60 Hz, 120 Hz, 144 Hz). Higher = smoother motion and lower input lag (noticeable in scrolling/gaming).
- **Response time** — how fast a pixel changes color; slow response causes **ghosting/motion blur** (LCDs historically slower than OLED).
- **Variable refresh** (G-Sync/FreeSync) syncs refresh to the source to avoid tearing/stutter.
These are separate from resolution — a sharp 60 Hz screen can feel less smooth than a lower-res 120 Hz one in motion.

## Pitfalls (in understanding/using)

- Judging a screen by **resolution alone** — contrast (LCD vs OLED), refresh rate, color accuracy, and brightness matter as much.
- Expecting deep blacks/HDR from a basic LCD (backlight leaks; needs local dimming/OLED).
- Ignoring **burn-in** risk on OLED with static UI over long periods.
- Confusing refresh rate (updates/sec) with response time (pixel switch speed) — both affect motion.
- Assuming higher PPI always helps — beyond what the eye resolves at your distance, it mainly costs power/GPU.
- Overlooking that "black bars"/contrast and viewing angle differ by LCD panel type (TN vs IPS vs VA).
