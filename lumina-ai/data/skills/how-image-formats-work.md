---
name: how-image-formats-work
description: How image formats differ — raster vs vector, lossy (JPEG/WebP/AVIF) vs lossless (PNG/GIF), transparency, animation, and choosing the right format + compression for photos vs graphics vs icons for quality and file size. Use when picking an image format, optimizing images for the web, or understanding why an image looks bad or is huge.
category: engineering
keywords_vi: định dạng ảnh, image format, jpeg png webp svg gif, raster vector, ảnh trong suốt transparency, chọn định dạng ảnh, tối ưu ảnh web, ảnh nặng hay vỡ
---

# How Image Formats Work

Choosing the right image format is a quality-vs-size trade-off that depends on *what kind* of image it is. The wrong format makes files huge or images ugly.

## Raster vs Vector

- **Raster** (JPEG, PNG, WebP, GIF) — a grid of pixels. Fixed resolution; enlarging past its size looks blurry/pixelated. For **photos** and anything with continuous detail.
- **Vector** (SVG) — shapes defined by math (paths, curves). **Scales to any size with no quality loss** and tiny files for simple graphics. For **logos, icons, illustrations, line art**. Can't represent a photograph.

## Lossy vs Lossless (raster)

- **Lossy** (JPEG, WebP, AVIF) — discards detail humans barely notice for **much smaller files**; quality slider trades size vs artifacts (see how-compression-works). Best for **photos**. Re-saving repeatedly degrades it (generation loss).
- **Lossless** (PNG, GIF, WebP-lossless) — exact pixels preserved. For **graphics with sharp edges, text, flat colors, transparency**, and where every pixel matters. JPEG on line art/text produces ugly ringing artifacts.

## The Common Formats

- **JPEG** — lossy, photos, no transparency. The default for photographs; small files.
- **PNG** — lossless, transparency (alpha), sharp graphics/screenshots/icons. Bigger than JPEG for photos — don't use it for photos.
- **WebP** — modern, does **both** lossy and lossless + transparency + animation, ~25–35% smaller than JPEG/PNG at similar quality. Great web default now.
- **AVIF** — newer, even better compression than WebP; growing support.
- **SVG** — vector; logos/icons; also styleable/animatable with CSS; tiny for simple art.
- **GIF** — 256 colors, lossless, animation, transparency — but obsolete for photos/animation (huge); use WebP/AVIF/video instead.

## Choosing (quick guide)

- **Photograph** → JPEG or (better) WebP/AVIF, lossy.
- **Logo / icon / illustration** → SVG (vector) if possible; else PNG.
- **Screenshot / image with text or flat colors** → PNG or lossless WebP (JPEG blurs the text).
- **Needs transparency** → PNG, WebP, or AVIF (not JPEG).
- **Animation** → WebP/AVIF or a real video (H.264), not GIF.

## Web Optimization

- **Compress and resize** to the actual displayed size (don't ship a 4000px image into a 400px slot).
- **Serve modern formats** (WebP/AVIF) with fallbacks; use responsive images (`srcset`) for different screens.
- **Lazy-load** offscreen images (see performance-web-vitals).

## Pitfalls

- **JPEG for text/line art** → ugly artifacts; use PNG/WebP-lossless.
- **PNG for photos** → needlessly huge; use JPEG/WebP.
- **Shipping oversized images** (biggest real-world web weight problem).
- **Re-saving JPEGs** repeatedly → cumulative quality loss.
- **Raster logo** that pixelates when scaled → use SVG.
- **GIF** for anything but tiny simple animations → bloated.
