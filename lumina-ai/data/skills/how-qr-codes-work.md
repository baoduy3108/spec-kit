---
name: how-qr-codes-work
description: How QR codes work — a 2D matrix barcode encoding data in black/white modules, finder/alignment patterns for orientation, error-correction (Reed-Solomon) that lets damaged codes still scan, and capacity/versions. Use to understand QR codes, why they scan when partly damaged, and their data limits.
category: engineering
keywords_vi: qr code hoạt động thế nào, mã qr, barcode 2d, module đen trắng, finder pattern, sửa lỗi reed-solomon, quét được khi bị hỏng, hiểu qr code
---

# How QR Codes Work

A QR code is a **2D matrix barcode**: a grid of black and white squares (**modules**) encoding data that a camera can read from any angle, fast.

## The Structure

- **Finder patterns** — the three big squares in the corners. The scanner detects these first to **locate and orient** the code (they let it work rotated or skewed). A smaller **alignment pattern** corrects for perspective distortion.
- **Timing patterns** — alternating lines that tell the scanner the module grid size.
- **Format/version info** — encodes the error-correction level and the version (size).
- **Data + error-correction modules** — the rest of the grid holds the actual encoded data plus its recovery codes.

## Encoding

Data (a URL, text, Wi-Fi credentials, a payment string) is converted to bits, arranged into modules in a defined zigzag pattern, then masked (XORed with a pattern) to avoid large blank areas that confuse scanners. QR supports numeric, alphanumeric, byte, and Kanji modes; **capacity depends on the version** (1–40, larger = more modules = more data, up to a few thousand characters).

## Error Correction (why it's robust)

QR codes use **Reed-Solomon error correction**, adding redundant data so the code still reads even if part is **dirty, damaged, or covered** — up to ~7%, 15%, 25%, or 30% depending on the chosen level (L/M/Q/H). This is why a QR code with a logo pasted in the middle, or a scratched one, still scans, and why higher error correction is used for codes likely to be damaged (at the cost of holding less data). The scanner reconstructs the missing/wrong modules from the redundancy — the same math family that protects CDs, storage, and deep-space transmissions.

## Why It Matters

Explains: why QR scans instantly from any angle (finder patterns), why a partly-damaged or logo-branded code still works (error correction), the trade-off between data capacity and robustness (version + EC level), and why a tiny code can't hold a huge payload (capacity limits — long data → bigger, denser code). Security note: a QR code is just data — it can encode a malicious URL, so treat scanned links with the same caution as any link.

## Pitfalls / Notes

- **Too much data + high error correction** → a dense code that's hard to scan on small/low-res displays; keep payloads short (a short URL, not a huge blob).
- **Insufficient quiet zone** (white border) around the code → scanners fail to find it.
- **Low contrast / distortion / tiny size** → unreadable; ensure size and contrast fit the scan distance.
- QR codes are **not secure/encrypted** by themselves — anyone can generate one pointing anywhere.
