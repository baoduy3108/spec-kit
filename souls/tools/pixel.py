#!/usr/bin/env python3
"""Render the sheet the way Dead Cells renders its sprites.

Motion Twin's pipeline is not "draw smooth art". Their characters are about
fifty pixels tall in game, and the models are rendered *very small and without
smoothing* by a purpose-built renderer, with a normal map exported beside every
frame so the game can shade volume with a toon shader.

That is why a 240-pixel smooth vector figure does not look like Dead Cells no
matter how much surface detail goes on it. The look is the resolution and the
hard edges, not the detail.

So this takes the rendered sheet and does the same three things:

  1. resolve down, so a figure lands near the size theirs are
  2. quantise to a small palette, because pixel art is a palette discipline
  3. resolve back up with nearest-neighbour, so every edge is hard

The label bands are left alone — pixelating type just breaks it.

    python3 tools/pixel.py dist/area-undercroft.png dist/area-undercroft-px.png
"""

import sys
import numpy as np
from PIL import Image, ImageFilter

# panel geometry, matching tools/draw.js
W, PANEL, HEAD, MARGIN = 1240, 430, 150, 40
ART_H = PANEL - 66
FACTOR = 4          # 240px figure -> 60px, near Dead Cells' ~50
COLOURS = 64        # a real pixel-art palette is small, but not this small


def pixelate(region: Image.Image) -> Image.Image:
    w, h = max(1, region.width // FACTOR), max(1, region.height // FACTOR)

    # Averaging down destroys anything small and bright — the first pass at
    # this lost every glowing eye and the core of the fire, which were the two
    # best things on the sheet. A four-pixel eye becomes one pixel, then the
    # palette merges that pixel into the body it sits on.
    #
    # So two reductions: the average, which is the picture, and a maximum,
    # which is where the light was. Dead Cells gets the equivalent for free by
    # exporting a normal map beside every frame and letting a toon shader put
    # the highlights back. This is the cheap version of the same idea.
    average = region.resize((w, h), Image.BOX).convert("RGB")
    brightest = region.filter(ImageFilter.MaxFilter(5)).resize((w, h), Image.BOX).convert("RGB")

    quantised = average.quantize(colors=COLOURS, method=Image.MEDIANCUT, dither=Image.NONE).convert("RGB")

    a = np.asarray(quantised).astype(np.int16)
    b = np.asarray(brightest).astype(np.int16)
    lum = lambda x: 0.2126 * x[..., 0] + 0.7152 * x[..., 1] + 0.0722 * x[..., 2]
    # where the neighbourhood was much brighter than the average, the light was
    # a highlight and it belongs on the sprite
    keep = (lum(b) - lum(a)) > 26
    out = np.where(keep[..., None], b, a).astype(np.uint8)

    return Image.fromarray(out).resize(region.size, Image.NEAREST)


def main(src: str, dst: str) -> None:
    sheet = Image.open(src).convert("RGB")
    rooms = (sheet.height - HEAD - 40) // PANEL
    for i in range(rooms):
        top = HEAD + i * PANEL
        box = (MARGIN, top, W - MARGIN, top + ART_H)
        sheet.paste(pixelate(sheet.crop(box)), box)
    sheet.save(dst)
    print(f"{rooms} panels pixelated at 1/{FACTOR} with {COLOURS} colours -> {dst}")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
