---
name: web-image-optimization
description: How to optimize images for the web — choosing formats (WebP/AVIF vs JPEG/PNG/SVG), responsive images (srcset/sizes), compression and quality, lazy loading, dimensions to prevent layout shift, and CDNs. Use to understand image optimization, WebP/AVIF, responsive images, lazy loading, or reducing image weight for performance.
category: engineering
keywords_vi: web image optimization, tối ưu ảnh web, chọn định dạng webp avif jpeg png svg, responsive images srcset sizes, nén chất lượng, lazy loading, layout shift, cdn ảnh
---

# Web Image Optimization

Images are usually the **largest part of a web page's weight**, so optimizing them is the highest-leverage performance win (see performance-web-vitals). The goal: deliver images that look good but download fast, at the right size for each device.

## Choose the Right Format

- **AVIF** — best compression (smallest files at good quality), modern; use where supported.
- **WebP** — great compression, widely supported; a strong default over JPEG/PNG.
- **JPEG** — photos (lossy); fine but larger than WebP/AVIF.
- **PNG** — images needing transparency or sharp edges/text (lossless); large — avoid for photos.
- **SVG** — **vector** graphics (logos, icons, illustrations) — scales to any size, tiny, crisp. Use for anything non-photographic and geometric.
Serve modern formats (AVIF/WebP) with fallbacks (`<picture>`). Right format first, then compress.

## Responsive Images (serve the right size)

The biggest waste: sending a 3000px image to a 400px-wide phone. **Responsive images** serve an appropriately-sized version per device:
- **`srcset`** — provide multiple resolutions; the browser picks the best for the screen/DPR.
- **`sizes`** — tell the browser how big the image will display so it chooses correctly.
- **`<picture>`** — art-direction (different crops) and format fallbacks.
Don't ship desktop-sized images to mobile; match image dimensions to display size × device pixel ratio.

## Compress

Images have a **quality vs size** dial. For most web photos, ~75–85% quality is visually indistinguishable from 100% but far smaller. Use build-time tools or an image CDN to compress; strip metadata (EXIF). Lossless for graphics, lossy for photos.

## Lazy Loading

Don't download images the user hasn't scrolled to. `loading="lazy"` (native) defers off-screen images until near the viewport, speeding up initial load and saving bandwidth. Keep **above-the-fold/LCP** images eager (`loading="eager"`, even `fetchpriority="high"`) — lazy-loading the hero image *hurts* your Largest Contentful Paint.

## Prevent Layout Shift

Always specify **width and height** (or aspect-ratio) so the browser reserves space before the image loads — otherwise content jumps as images arrive (bad **Cumulative Layout Shift** — see performance-web-vitals). A cheap, important fix.

## Delivery: CDN & Caching

Serve images from a **CDN** (see how-cdns-work) close to users, with long **cache headers** (see how-http-caching-works) since images rarely change. **Image CDNs** (Cloudinary, imgix, or framework image components like Next.js `<Image>`) can auto-format, resize, and compress on the fly per request — the easiest way to do all the above.

## Pitfalls (in understanding/using)

- **Serving full-size images** to all devices — huge mobile waste; use `srcset`/responsive images.
- Using **PNG/JPEG** where **WebP/AVIF** (photos) or **SVG** (graphics) would be far smaller.
- **Lazy-loading the hero/LCP image** → worse LCP; keep above-the-fold images eager.
- **No width/height** → layout shift (CLS) as images load.
- Shipping **uncompressed** or metadata-heavy images.
- No CDN / short cache on images → slow, repeated downloads.
- Over-compressing to visible artifacts — find the quality sweet spot.
