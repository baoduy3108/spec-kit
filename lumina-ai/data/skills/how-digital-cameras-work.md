---
name: how-digital-cameras-work
description: How digital cameras work — the image sensor (CMOS) converting light to charge, the Bayer color filter and demosaicing, exposure (aperture, shutter, ISO), the image signal processor pipeline, RAW vs JPEG, and why sensor size and pixels matter. Use to understand digital cameras, image sensors, RAW vs JPEG, exposure, or smartphone camera processing.
category: engineering
keywords_vi: máy ảnh số, cảm biến ảnh, sensor cmos, bayer, demosaic, phơi sáng khẩu độ iso, image signal processor, raw jpeg, kích thước cảm biến
---

# How Digital Cameras Work

A digital camera turns light into a digital image. From smartphone to DSLR, the core pipeline is the same: focus light onto a sensor, measure it per-pixel, reconstruct color, and process it into a final image. Understanding it clarifies RAW vs JPEG, why sensor size matters, and how phones "cheat" with software.

## The Image Sensor

Light passes through a **lens** and lands on an **image sensor** (almost always **CMOS** today) — a grid of millions of **photosites** (one per pixel). Each photosite is essentially a light bucket: photons knock loose electrons, accumulating **charge proportional to the light** hitting it during the exposure. The charge is read out and digitized (ADC) into a number per pixel. More/larger photosites gather more light → less noise, better low-light and dynamic range — which is why **sensor size often matters more than megapixel count**.

## Getting Color: Bayer Filter & Demosaicing

Photosites measure **brightness, not color**. To capture color, a **Bayer color filter array** is placed over the sensor — a mosaic where each photosite sees only **red, green, or blue** (with twice as many green, matching the eye's sensitivity). So each pixel records just one color channel. **Demosaicing** then interpolates the missing two channels for every pixel from its neighbors, reconstructing a full-color image. This is why raw sensor data isn't directly a picture — it needs processing.

## Exposure: Aperture, Shutter, ISO

Three controls set how much light forms the image (the **exposure triangle**):
- **Aperture** — how wide the lens opening is (controls light *and* depth of field/background blur).
- **Shutter speed** — how long the sensor collects light (controls motion blur; long = brighter but blurs movement).
- **ISO** — how much the signal is amplified (higher = brighter in low light but more **noise**).
Balancing these trades brightness against blur, depth of field, and noise.

## The Image Signal Processor (ISP)

Raw sensor readings go through an **ISP** pipeline: demosaicing, white balance (making whites look white under different lighting), noise reduction, sharpening, tone/color mapping, lens-distortion correction, and compression. On phones, this is where **computational photography** lives — stacking multiple frames for HDR and low-light, portrait-mode depth blur, night mode — often making the *software* the biggest differentiator, not the small sensor.

## RAW vs JPEG

- **JPEG** — the ISP's finished, compressed image: smaller, ready to share, but "baked in" (limited room to fix exposure/white balance later; lossy).
- **RAW** — the (nearly) unprocessed sensor data: large, needs developing, but preserves maximum information → far more latitude to adjust exposure, white balance, and recover highlights/shadows in editing. Pros shoot RAW for flexibility; JPEG for convenience.

## Pitfalls (in understanding/using)

- Equating **megapixels** with quality — sensor size, pixel size, lens, and processing matter more; tiny high-MP sensors can be noisier.
- Expecting to "fix" a badly exposed **JPEG** like a RAW — much information is already discarded.
- Pushing **ISO** high and being surprised by noise (it amplifies signal *and* noise).
- Forgetting that the picture is **reconstructed** (demosaiced/processed), not a direct sensor dump.
- Judging phone cameras by hardware alone — computational photography (software) is often decisive.
- Ignoring depth-of-field effects of aperture (wide aperture blurs background, narrows focus).
