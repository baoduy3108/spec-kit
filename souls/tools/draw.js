// Draws one area as a sheet of room panels: architecture, light, and the
// things standing in it, posed from the same data the game reads.
//
// Nothing here is generic. Each room kind gets its own architecture, each
// light level its own palette, and each of the sixteen families its own
// silhouette built from the `look` field in `lore.js` — the drawing brief was
// written first on purpose, so this is a build rather than an invention.
//
//   node tools/draw.js undercroft   ->  dist/area-undercroft.svg
//
// One SVG element gets one `opacity` attribute and never two. Two aborts the
// parse and silently loses every label on the sheet, which is how the world
// map lost its legend the first time.

import { mkdirSync, writeFileSync } from 'node:fs';
import { AREAS, FOES, ROOMS } from '../src/world.js';
import { LORE } from '../src/lore.js';
import { BESTIARY } from '../src/bosses.js';

const W = 1240;
const PANEL = 780;
const HEAD = 150;

// --- palettes -------------------------------------------------------------
// Six light levels, each a full scene palette rather than a tint. `far` is the
// wall behind everything, `air` the haze between, `floor` what you stand on,
// `edge` the line work, `glow` whatever is burning.
// Palettes are generated from a rule now, not picked by hand.
//
// The rule is hue shifting, and it is the thing every hand-picked palette here
// was missing: a ramp does not darken one hue, it moves. Shadows shift *away*
// from the light source, towards blue and purple; midtones carry the base hue
// and hold the most saturation; highlights shift *towards* the light. Taking
// one colour and multiplying it down is what makes a scene read as flat and
// muddy no matter how much detail goes on top of it.
//
// So each light level is now declared as what it actually is — a base hue, the
// hue of whatever is lighting it, and how bright the room gets — and the six
// scene colours are derived. Changing a room's mood is two numbers.

const hsl = (h, s2, l) => {
  h = ((h % 360) + 360) % 360;
  const a = s2 * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(255 * c)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

/**
 * One step of a hue-shifted ramp. `t` runs 0 (deepest shadow) to 1 (highlight).
 * Saturation peaks in the midtones and falls off at both ends, which is what
 * keeps the darks from turning into flat black and the lights from turning
 * into paper.
 */
function ramp(baseHue, lightHue, lo, hi, t) {
  const away = baseHue + (baseHue < lightHue ? -46 : 46); // shadows run from the light
  const hue = t < 0.5 ? away + (baseHue - away) * (t / 0.5) : baseHue + (lightHue - baseHue) * ((t - 0.5) / 0.5) * 0.75;
  const sat = 0.2 + 0.42 * Math.sin(Math.PI * Math.min(1, Math.max(0, t)));
  return hsl(hue, sat, lo + (hi - lo) * t);
}

/** base hue, the hue of the light in the room, and the room's brightness band. */
const MOOD = {
  dark: { base: 218, light: 190, shadow: 268, lo: 0.1, hi: 0.5 },
  dim: { base: 224, light: 200, shadow: 274, lo: 0.13, hi: 0.56 },
  grey: { base: 205, light: 186, shadow: 250, lo: 0.2, hi: 0.66 },
  pale: { base: 196, light: 176, shadow: 236, lo: 0.28, hi: 0.76 },
  // warm rooms get a cold shadow, which is the whole reason a fire reads as a
  // fire: the eye needs the other temperature to measure it against
  warm: { base: 20, light: 38, shadow: 214, lo: 0.12, hi: 0.58 },
  gold: { base: 34, light: 46, shadow: 222, lo: 0.18, hi: 0.68 },
};

/** The cool end of the shadow zone, and the saturated complement. Three named
 *  hues per room instead of one, which is what the colour scripts do. */
const SHADOW = {};
for (const [key, r] of Object.entries(MOOD)) {
  SHADOW[key] = hsl(r.shadow, 0.55, Math.max(0.34, r.lo + 0.26));
}

const LIGHT = {};
for (const [key, r] of Object.entries(MOOD)) {
  LIGHT[key] = {
    far: ramp(r.base, r.light, r.lo, r.hi, 0.16),
    mid: ramp(r.base, r.light, r.lo, r.hi, 0.36),
    air: ramp(r.base, r.light, r.lo, r.hi, 0.26),
    floor: ramp(r.base, r.light, r.lo, r.hi, 0.46),
    edge: ramp(r.base, r.light, r.lo, r.hi, 0.74),
    ink: ramp(r.base, r.light, r.lo, r.hi, 0.94),
    glow: ramp(r.light, r.light, r.lo, r.hi, 0.86),
  };
}

// The distance dissolves into the light, not into black.
const FIRE = { core: '#fff3c4', mid: '#ffb24a', low: '#ff7a2f', deep: '#c03c14' };

// Rim light is the single biggest thing separating a flat scene from a lit
// one, and it is what makes a Dead Cells silhouette read at a glance: a bright
// edge on the side facing the light, and nothing else on the body. Each light
// level gets the colour its rim should be.
// The colour the distance dissolves into. Atmospheric perspective is the
// whole trick the hand-painted souls-likes use for depth — Hollow Knight,
// Nine Sols, Ender Lilies all do it — and it is not a filter: far layers lose
// contrast, lose saturation, and shift towards this colour, while near layers
// keep theirs. The sheet was doing the opposite, with a dark far wall and
// bright figures in front of it, which flattens everything.
const AIRCOL = {
  dark: '#2f5c86',
  dim: '#3a6d9c',
  grey: '#6d8ba6',
  pale: '#9db8cc',
  warm: '#8a4a1e',
  gold: '#b07a24',
};

/**
 * The complement. Measured against the eight indie screens this was compared
 * to, the difference was not linework: 95% of this sheet sat in the darkest
 * 30% of the value range and carried one or two hue families, where theirs
 * carry three to five and have real bright areas. A palette needs an opposed
 * hue to put on the ornament, or every room is one colour with the lights
 * turned down.
 */
const ACCENT = {
  dark: '#3fbfa8',
  dim: '#54c9a2',
  grey: '#7ad0b0',
  pale: '#9fe0c8',
  warm: '#5fb6d6',
  gold: '#7fd0e8',
};

const RIM = {
  dark: '#6f9fd0',
  dim: '#8ab4e0',
  grey: '#c3d6e8',
  pale: '#e2eef8',
  warm: '#ffb765',
  gold: '#ffd98a',
};

/** Where the light in this room is coming from, in panel coordinates. */
function lightAt(room, x, w) {
  if (room.kind === 'bonfire') return x + w * 0.34;
  const torch = room.foes.findIndex((id) => id.endsWith('-torch'));
  if (torch >= 0) return null; // the torch carrier lights itself, handled per figure
  return x + w * (room.light === 'warm' || room.light === 'gold' ? 0.2 : 0.5);
}

// --- helpers --------------------------------------------------------------
const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Seeded noise so a room's texture is the same every time it is drawn. */
function rngFor(seed) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// The sheet is resolved down by four before anybody sees it, so anything
// thinner than four units in this space does not exist in the output. It was
// drawn at 240 and shown at 60, which is why the ribs, the moss and the hairline
// cracks all turned into speckle: they were sub-pixel detail at the size that
// ships. Everything now lands on the grid it will be seen on.
// Two modes, because they want opposite things. The pixel mode snaps
// everything to the grid the output will be seen on; the painted mode wants
// curves and round joints. Drawing on the grid and then rendering smooth is
// what turned the moss into green bricks and the arms into planks.
const PIXEL = process.env.PIXEL === '1';
const PX = 4;
const q = PIXEL ? (v) => Math.round(v / PX) * PX : (v) => Number(v.toFixed(1));
const thick = PIXEL ? (w) => Math.max(PX, Math.round(w / PX) * PX) : (w) => Number(w.toFixed(1));
const CAP = PIXEL ? 'butt' : 'round';

const parts = [];
const put = (s) => parts.push(s);

/** Where each figure was actually drawn, for tools/eye.js to look at. */
export const marks = [];

// --- architecture ---------------------------------------------------------

/** Layered stone: a far wall, blocks picked out, and a floor line. */
function backdrop(x, y, w, h, p, rng) {
  put(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${p.far}"/>`);
  // block courses on the far wall, irregular so it reads as cut by hand
  const floorY = y + h * 0.8;
  for (let row = 0; row < 12; row++) {
    const by = y + 14 + row * ((floorY - y - 14) / 12);
    let bx = x + (row % 2 ? -22 : 0);
    while (bx < x + w) {
      const bw = 64 + rng() * 54;
      put(
        `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${((floorY - y - 14) / 7 - 3).toFixed(1)}" fill="${p.mid}" fill-opacity="${(0.25 + rng() * 0.4).toFixed(2)}"/>`,
      );
      bx += bw + 3;
    }
  }
  // haze between you and the wall
  put(`<rect x="${x}" y="${y}" width="${w}" height="${h * 0.8}" fill="${p.air}" fill-opacity="0.45"/>`);
  // The floor, broken. A straight line across the frame is the single most
  // programmer-art thing in the picture, and it was the first thing the eye
  // hit in every room.
  {
    let d = `M ${x} ${y + h} L ${x} ${floorY.toFixed(1)}`;
    let fy = floorY;
    for (let i = 0; i <= 26; i++) {
      const fx = x + (i / 26) * w;
      fy = floorY + Math.sin(i * 1.9) * 3 + (rng() - 0.5) * 7;
      d += ` L ${fx.toFixed(1)} ${fy.toFixed(1)}`;
      // a slab that has dropped or lifted
      if (rng() < 0.16) {
        const step = (rng() - 0.5) * 22;
        d += ` L ${(fx + 6).toFixed(1)} ${(fy + step).toFixed(1)} L ${(fx + 26).toFixed(1)} ${(fy + step).toFixed(1)}`;
      }
    }
    d += ` L ${x + w} ${y + h} Z`;
    put(`<path d="${d}" fill="${p.floor}" stroke="${p.edge}" stroke-width="2.2"/>`);
  }

  // things growing out of the join between floor and wall, which is where
  // anything alive in a ruin actually lives
  for (let i = 0; i < 26; i++) {
    const gx = x + rng() * w;
    const gh = 8 + rng() * 26;
    let d = `M ${gx.toFixed(1)} ${floorY.toFixed(1)}`;
    let px2 = gx;
    let py2 = floorY;
    for (let k = 0; k < 3; k++) {
      px2 += (rng() - 0.5) * 14;
      py2 -= gh / 3;
      d += ` Q ${(px2 + (rng() - 0.5) * 10).toFixed(1)} ${(py2 + gh / 6).toFixed(1)} ${px2.toFixed(1)} ${py2.toFixed(1)}`;
    }
    put(`<path d="${d}" fill="none" stroke="#3d5a34" stroke-width="${(1.4 + rng() * 2).toFixed(1)}" stroke-opacity="${(0.3 + rng() * 0.4).toFixed(2)}" stroke-linecap="round"/>`);
  }
  // a level below this one, seen over the edge — the frame now has height to
  // spend and a floor that is simply the bottom of the picture wastes it
  put(`<rect x="${x}" y="${floorY + (y + h - floorY) * 0.55}" width="${w}" height="${((y + h - floorY) * 0.45).toFixed(1)}" fill="${p.far}"/>`);
  put(`<line x1="${x}" y1="${(floorY + (y + h - floorY) * 0.55).toFixed(1)}" x2="${x + w}" y2="${(floorY + (y + h - floorY) * 0.55).toFixed(1)}" stroke="${p.edge}" stroke-width="2" stroke-opacity="0.6"/>`);

  // flagstones running away from you
  for (let i = 0; i < 16; i++) {
    const fx = x + (i / 16) * w + rng() * 20;
    put(
      `<line x1="${fx.toFixed(1)}" y1="${floorY}" x2="${(x + w / 2 + (fx - x - w / 2) * 2.1).toFixed(1)}" y2="${y + h}" stroke="${p.edge}" stroke-width="1" stroke-opacity="0.35"/>`,
    );
  }
  return floorY;
}

/**
 * What makes stone look like stone: cracks that run, damp that pools at the
 * bottom, and moss where the damp is. Flat blocks read as a placeholder no
 * matter how good the palette is.
 */
function texture(x, y, w, h, p, rng, floorY, moss = '#3d5a34', cold = '#2a3b52') {
  // A crack a pixel wide is gone after a resolve, so in pixel mode it is a
  // stack of four-wide blocks. Rendered smooth, that stack is a black post
  // standing in the room — which is exactly what the courtyard came out with.
  // Painted mode gets a line that wanders instead.
  for (let i = 0; i < 6; i++) {
    let cx = q(x + rng() * w);
    let cy = q(y + 40 + rng() * (floorY - y - 70));
    if (PIXEL) {
      for (let k = 0; k < 4; k++) {
        const len = q(20 + rng() * 40);
        put(`<rect x="${cx}" y="${cy}" width="${PX}" height="${len}" fill="#000" fill-opacity="0.3"/>`);
        cy += len;
        cx += q((rng() - 0.5) * 24);
      }
    } else {
      let d = `M ${cx} ${cy}`;
      for (let k = 0; k < 5; k++) {
        cx += (rng() - 0.5) * 30;
        cy += 16 + rng() * 26;
        d += ` L ${cx.toFixed(1)} ${cy.toFixed(1)}`;
      }
      put(
        `<path d="${d}" fill="none" stroke="#000" stroke-width="${(1 + rng() * 1.6).toFixed(1)}" stroke-opacity="${(0.16 + rng() * 0.22).toFixed(2)}" stroke-linecap="round"/>`,
      );
    }
  }
  // damp as stains down the wall, stopping where the wall does
  const wall = Math.max(0, floorY - y - 30);
  for (let i = 0; i < 5; i++) {
    const dh = Math.min(wall, 70 + rng() * 150);
    put(
      `<rect x="${q(x + rng() * w)}" y="${q(y + 30)}" width="${q(34 + rng() * 60)}" height="${q(dh)}" fill="${cold}" fill-opacity="${(0.16 + rng() * 0.14).toFixed(2)}"/>`,
    );
  }
  // moss along the waterline
  for (let i = 0; i < (PIXEL ? 16 : 34); i++) {
    const mx = q(x + rng() * w);
    const my = q(floorY - (PIXEL ? PX * (1 + Math.floor(rng() * 3)) : rng() * 12));
    const bw = q(12 + rng() * 30);
    if (PIXEL) {
      put(`<rect x="${mx}" y="${my}" width="${bw}" height="${PX * 2}" fill="#3d5a34" fill-opacity="${(0.22 + rng() * 0.3).toFixed(2)}"/>`);
      if (rng() < 0.6) put(`<rect x="${mx + PX}" y="${my - PX * 2}" width="${q(bw * 0.5)}" height="${PX * 2}" fill="#3d5a34" fill-opacity="0.2"/>`);
    } else {
      put(
        `<ellipse cx="${mx}" cy="${my}" rx="${(bw * 0.5).toFixed(1)}" ry="${(2 + rng() * 5).toFixed(1)}" fill="#3d5a34" fill-opacity="${(0.16 + rng() * 0.26).toFixed(2)}"/>`,
      );
    }
  }
  // what has fallen off the ceiling over the years
  for (let i = 0; i < (PIXEL ? 14 : 40); i++) {
    const rx = q(x + rng() * w);
    const ry = q(floorY + 8 + rng() * (y + h - floorY - 20));
    if (PIXEL) {
      put(`<rect x="${rx}" y="${ry}" width="${q(8 + rng() * 14)}" height="${PX * 2}" fill="#000" fill-opacity="${(0.2 + rng() * 0.25).toFixed(2)}"/>`);
    } else {
      put(
        `<ellipse cx="${rx}" cy="${ry}" rx="${(3 + rng() * 9).toFixed(1)}" ry="${(1.4 + rng() * 3).toFixed(1)}" fill="#000" fill-opacity="${(0.16 + rng() * 0.3).toFixed(2)}"/>`,
      );
    }
  }
}

/**
 * Haze. Everything behind the figures loses contrast and drifts towards the
 * room's ambient colour, strongest at the back of the shot and gone by the
 * floor. One rectangle, and it does more for depth than any amount of detail.
 */
function haze(x, y, w, h, room, floorY) {
  const id = `haze-${room.id.replace(':', '-')}`;
  const col = AIRCOL[room.light] || AIRCOL.dim;
  put(`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${col}" stop-opacity="0.5"/>
    <stop offset="55%" stop-color="${col}" stop-opacity="0.26"/>
    <stop offset="100%" stop-color="${col}" stop-opacity="0.04"/>
  </linearGradient>`);
  put(`<rect x="${x}" y="${y}" width="${w}" height="${floorY - y}" fill="url(#${id})"/>`);
}

/**
 * Light coming through the room in beams. A shaft is the difference between a
 * lit room and a room with a bright object in it.
 */
function shaft(room, x, y, w, floorY, colour, rng) {
  // only a real source throws a beam
  const lit =
    room.kind === 'bonfire' ? x + w * 0.34 : room.foes.some((f) => f.endsWith('-torch')) ? null : null;
  const sky = room.kind === 'yard' || room.kind === 'stair';
  if (lit === null && !sky) return;

  const id = `shaft-${room.id.replace(':', '-')}`;
  put(`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${colour}" stop-opacity="0.14"/>
    <stop offset="70%" stop-color="${colour}" stop-opacity="0.05"/>
    <stop offset="100%" stop-color="${colour}" stop-opacity="0"/>
  </linearGradient>`);

  if (sky) {
    // daylight coming in from above, wide and soft, landing on the floor
    for (let i = 0; i < 3; i++) {
      const top = x + w * (0.24 + i * 0.2) + rng() * 40;
      const wide = 90 + rng() * 90;
      put(
        `<path d="M ${top.toFixed(1)} ${y} L ${(top + wide).toFixed(1)} ${y} L ${(top + wide + 130).toFixed(1)} ${floorY.toFixed(1)} L ${(top + 96).toFixed(1)} ${floorY.toFixed(1)} Z" fill="url(#${id})"/>`,
      );
    }
    return;
  }
  for (let i = 0; i < 4; i++) {
    const spread = 60 + i * 50 + rng() * 30;
    const lean = (i - 1.5) * 54;
    put(
      `<path d="M ${(lit - 16).toFixed(1)} ${(floorY - 90).toFixed(1)}
        L ${(lit + lean - spread).toFixed(1)} ${y}
        L ${(lit + lean - spread + 70).toFixed(1)} ${y}
        L ${(lit + 16).toFixed(1)} ${(floorY - 90).toFixed(1)} Z" fill="url(#${id})"/>`,
    );
  }
}

/**
 * Paint grain. Flat vector fills are the thing that most reads as "made by a
 * program"; a little tooth across the whole panel is what a painted layer has
 * and a fill does not.
 */
function grain(x, y, w, h, rng) {
  for (let i = 0; i < 320; i++) {
    const gx = x + rng() * w;
    const gy = y + rng() * h;
    put(
      `<rect x="${gx.toFixed(1)}" y="${gy.toFixed(1)}" width="${(2 + rng() * 7).toFixed(1)}" height="${(1 + rng() * 2).toFixed(1)}" fill="${rng() < 0.5 ? '#ffffff' : '#000000'}" fill-opacity="${(0.012 + rng() * 0.03).toFixed(3)}"/>`,
    );
  }
}

/** Dust in the air, lit by whatever is burning. Cheap, and it sells depth. */
function motes(x, y, w, h, rng, colour) {
  for (let i = 0; i < 22; i++) {
    put(
      `<rect x="${q(x + rng() * w)}" y="${q(y + rng() * h * 0.8)}" width="${PX}" height="${PX}" fill="${colour}" fill-opacity="${(0.1 + rng() * 0.25).toFixed(2)}"/>`,
    );
  }
}

/**
 * A near-black slab of architecture across the front of the shot. Depth in a
 * flat scene comes from having something between the camera and the room, and
 * it costs one shape.
 */
function foreground(x, y, w, h, rng) {
  if (rng() < 0.42) return; // not every shot needs one
  const side = rng() < 0.5 ? -1 : 1;
  const edge = side < 0 ? x : x + w;
  const wide = 58 + rng() * 34;
  const inner = edge + side * -wide;
  // a pier flush to the frame, wider at the base, with the arch springing off
  // it — we are looking past a piece of the building, not at a bar
  put(
    `<path d="M ${edge} ${y} L ${inner} ${y} L ${(inner - side * 10).toFixed(1)} ${(y + h * 0.34).toFixed(1)} L ${inner} ${y + h} L ${edge} ${y + h} Z" fill="#05070a" fill-opacity="0.94"/>`,
  );
  put(
    `<path d="M ${inner} ${(y + h * 0.2).toFixed(1)} q ${(side * 74).toFixed(1)} ${(-h * 0.1).toFixed(1)} ${(side * 150).toFixed(1)} ${(h * 0.06).toFixed(1)}" fill="none" stroke="#05070a" stroke-width="22" stroke-linecap="round"/>`,
  );
  if (rng() < 0.6) {
    const hx = inner - side * (18 + rng() * 40);
    for (let i = 0; i < 14; i++) {
      put(`<ellipse cx="${(hx + Math.sin(i * 0.8) * 3).toFixed(1)}" cy="${(y + 8 + i * 16).toFixed(1)}" rx="4.5" ry="7.5" fill="none" stroke="#05070a" stroke-width="3.6"/>`);
    }
  }
}

/** A barrel vault with columns — the default indoor room. */
function hall(x, y, w, h, p, rng, a = '#54c9a2', cold = '#3a6d9c') {
  const floorY = backdrop(x, y, w, h, p, rng);
  const top = y + 10;

  // The vault, sprung off-centre and broken open on one side. Three columns at
  // even spacing under a symmetrical arch is the composition a program picks;
  // it is also the reason every room looked like the last one.
  const crown = x + w * (0.34 + rng() * 0.3);
  const gap = rng() < 0.45; // a section that has come down
  put(
    `<path d="M ${x} ${top + 96} Q ${crown.toFixed(1)} ${top - 54} ${x + w} ${top + 84} L ${x + w} ${top} L ${x} ${top} Z" fill="${p.far}"/>`,
  );
  put(
    `<path d="M ${x} ${top + 96} Q ${crown.toFixed(1)} ${top - 54} ${x + w} ${top + 84}" fill="none" stroke="${p.edge}" stroke-width="2.5"/>`,
  );
  if (gap) {
    // a hole through to whatever is above, with the ends of the broken ribs
    const hx = x + w * (0.2 + rng() * 0.55);
    put(`<path d="M ${(hx - 70).toFixed(1)} ${top + 40} q ${70} ${-46} ${140} ${-8} l ${-14} ${44} q ${-58} ${-26} ${-112} ${6} Z" fill="#05070a"/>`);
    for (let i = 0; i < 5; i++) {
      const bx = hx - 60 + i * 30 + rng() * 12;
      put(`<path d="M ${bx.toFixed(1)} ${(top + 34).toFixed(1)} l ${(4 + rng() * 7).toFixed(1)} ${(10 + rng() * 16).toFixed(1)} l ${-6} ${-2} Z" fill="${p.mid}"/>`);
    }
  }

  // columns at irregular spacing, one of them broken off short
  const stumps = rng() < 0.5 ? 1 : 2;
  const cols = [0.1 + rng() * 0.1, 0.42 + rng() * 0.14, 0.78 + rng() * 0.12];
  cols.forEach((f, i) => {
    const cx = x + w * f;
    const broken = i === stumps;
    const headY = broken ? floorY - 60 - rng() * 90 : top + 56;
    put(`<rect x="${(cx - 18).toFixed(1)}" y="${headY.toFixed(1)}" width="36" height="${(floorY - headY).toFixed(1)}" fill="${p.mid}"/>`);
    if (broken) {
      // a snapped top, not a flat one
      put(
        `<path d="M ${(cx - 18).toFixed(1)} ${headY.toFixed(1)} l 9 ${-9 - rng() * 10} l 10 ${8 + rng() * 8} l 9 ${-12 - rng() * 8} l 8 ${13} Z" fill="${p.mid}"/>`,
      );
    } else {
      put(`<rect x="${(cx - 24).toFixed(1)}" y="${(top + 46).toFixed(1)}" width="48" height="13" fill="${p.mid}"/>`);
    }
    put(`<rect x="${(cx - 22).toFixed(1)}" y="${(floorY - 15).toFixed(1)}" width="44" height="15" fill="${p.mid}"/>`);
    put(
      `<line x1="${(cx - 18).toFixed(1)}" y1="${(headY + 6).toFixed(1)}" x2="${(cx - 18).toFixed(1)}" y2="${(floorY - 15).toFixed(1)}" stroke="${p.edge}" stroke-width="1.5" stroke-opacity="0.7"/>`,
    );
  });

  // PLANE 1 — distance. An arcade receding behind the wall, hazier and
  // lighter the further back it goes, so the room opens instead of stopping.
  for (let d = 3; d >= 1; d--) {
    const inset = d * 46;
    const top2 = top + 40 + d * 26;
    const base = floorY - d * 16;
    put(
      `<rect x="${(x + inset).toFixed(1)}" y="${top2.toFixed(1)}" width="${(w - inset * 2).toFixed(1)}" height="${(base - top2).toFixed(1)}" fill="${p.far}" fill-opacity="${(0.5 - d * 0.1).toFixed(2)}"/>`,
    );
    for (let i = 0; i < 4; i++) {
      const ax = x + inset + 60 + i * ((w - inset * 2 - 120) / 3);
      put(
        `<path d="M ${(ax - 34).toFixed(1)} ${base.toFixed(1)} L ${(ax - 34).toFixed(1)} ${(top2 + 70).toFixed(1)} q ${34} ${-46} ${68} 0 L ${(ax + 34).toFixed(1)} ${base.toFixed(1)} Z" fill="#05070a" fill-opacity="${(0.4 - d * 0.08).toFixed(2)}"/>`,
      );
    }
  }

  // PLANE 2 — an upper gallery, so the height has something standing in it
  {
    const gy = top + 150 + rng() * 70;
    put(`<rect x="${x}" y="${gy.toFixed(1)}" width="${w}" height="18" fill="${p.mid}"/>`);
    put(`<rect x="${x}" y="${(gy + 18).toFixed(1)}" width="${w}" height="7" fill="#05070a" fill-opacity="0.45"/>`);
    for (let i = 0; i < 9; i++) {
      const bx2 = x + 40 + i * ((w - 80) / 8);
      put(`<rect x="${bx2.toFixed(1)}" y="${(gy - 42).toFixed(1)}" width="9" height="42" fill="${p.mid}"/>`);
    }
    put(`<rect x="${x}" y="${(gy - 48).toFixed(1)}" width="${w}" height="8" fill="${p.mid}"/>`);
    // and a stretch of it fallen away
    const brk = x + w * (0.3 + rng() * 0.35);
    put(`<rect x="${brk.toFixed(1)}" y="${(gy - 50).toFixed(1)}" width="${(90 + rng() * 70).toFixed(1)}" height="80" fill="${p.far}"/>`);
  }

  // A passage at the back, lit by something the other temperature. This is
  // the room's second hue and it arrives as one shape, because that is how
  // the eye counts colour.
  {
    const dx = x + w * (0.56 + rng() * 0.22);
    const dw = 74 + rng() * 34;
    const dh2 = Math.min(210, floorY - (top + 120));
    const dy = floorY - dh2;
    put(`<rect x="${(dx - dw / 2).toFixed(1)}" y="${dy.toFixed(1)}" width="${dw.toFixed(1)}" height="${dh2.toFixed(1)}" fill="#05070a"/>`);
    put(
      `<path d="M ${(dx - dw / 2).toFixed(1)} ${dy.toFixed(1)} q ${(dw / 2).toFixed(1)} ${-46} ${dw.toFixed(1)} 0 Z" fill="#05070a"/>`,
    );
    put(`<linearGradient id="pass-${Math.round(dx)}" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="${cold}" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="${cold}" stop-opacity="0.15"/>
    </linearGradient>`);
    put(
      `<rect x="${(dx - dw / 2 + 8).toFixed(1)}" y="${(dy + 8).toFixed(1)}" width="${(dw - 16).toFixed(1)}" height="${(dh2 - 10).toFixed(1)}" fill="url(#pass-${Math.round(dx)})"/>`,
    );
    // light spilling out of it onto the floor
    put(
      `<ellipse cx="${dx.toFixed(1)}" cy="${(floorY + 6).toFixed(1)}" rx="${(dw * 0.8).toFixed(1)}" ry="16" fill="${cold}" fill-opacity="0.3"/>`,
    );
  }

  // Corbels under the springing of the arch. Their screens are dense: pipes,
  // brackets, banners, hanging lamps. Three columns in an empty box is not a
  // style, it is an unfinished room.
  for (const f of [0.16, 0.5, 0.84]) {
    const bx = x + w * f;
    // A stepped bracket with a shadow where it meets the wall. The first two
    // attempts read as a UI marker and then as a hanging blade, both for the
    // same reason: nothing showed it was attached to anything.
    put(`<rect x="${(bx - 36).toFixed(1)}" y="${(top + 62).toFixed(1)}" width="72" height="10" fill="${p.mid}"/>`);
    put(`<rect x="${(bx - 30).toFixed(1)}" y="${(top + 72).toFixed(1)}" width="60" height="9" fill="${p.mid}"/>`);
    put(`<rect x="${(bx - 23).toFixed(1)}" y="${(top + 81).toFixed(1)}" width="46" height="9" fill="${p.mid}"/>`);
    // the scroll that carries the load down onto the wall
    put(
      `<path d="M ${(bx - 16).toFixed(1)} ${(top + 90).toFixed(1)} l 32 0 q ${-4} ${16} ${-16} ${22} q ${-12} ${-6} ${-16} ${-22} Z" fill="${p.mid}"/>`,
    );
    // contact shadow — the thing that says "fixed to the wall" rather than
    // "floating in front of it"
    put(`<rect x="${(bx - 36).toFixed(1)}" y="${(top + 72).toFixed(1)}" width="72" height="6" fill="#000" fill-opacity="0.32"/>`);
    put(`<rect x="${(bx - 36).toFixed(1)}" y="${(top + 62).toFixed(1)}" width="72" height="3" fill="${a}" fill-opacity="0.4"/>`);
  }

  // a lamp hanging off one of them, long dead
  if (rng() < 0.7) {
    const lx = x + w * (rng() < 0.5 ? 0.5 : 0.84);
    const ly = top + 104;
    const drop = 40 + rng() * 70;
    for (let i = 0; i < Math.floor(drop / 14); i++) {
      put(`<ellipse cx="${lx.toFixed(1)}" cy="${(ly + i * 14).toFixed(1)}" rx="4" ry="7" fill="none" stroke="${p.edge}" stroke-width="2.6"/>`);
    }
    const by2 = ly + drop;
    put(`<path d="M ${(lx - 13).toFixed(1)} ${by2.toFixed(1)} l 26 0 l 4 30 l -34 0 Z" fill="#05070a" stroke="${p.edge}" stroke-width="2.4"/>`);
    put(`<path d="M ${(lx - 16).toFixed(1)} ${by2.toFixed(1)} l 32 0 l -5 -7 l -22 0 Z" fill="${p.edge}"/>`);
    put(`<ellipse cx="${lx.toFixed(1)}" cy="${(by2 + 15).toFixed(1)}" rx="7" ry="9" fill="${a}" fill-opacity="0.28"/>`);
  }

  // torn banners on the wall, in the accent, because a room needs one thing
  // in it that is not the colour of stone
  for (let i = 0; i < 2; i++) {
    if (rng() > 0.55) continue;
    const bx = x + w * (0.2 + rng() * 0.6);
    const bh = 90 + rng() * 90;
    // Cloth: a pole across the top with finials, drape shading down the folds,
    // and a torn bottom with two tails. As a plain tapered slab the eye had no
    // idea what it was looking at.
    const bw = 46;
    put(`<rect x="${(bx - bw / 2 - 10).toFixed(1)}" y="${(top + 92).toFixed(1)}" width="${bw + 20}" height="7" fill="${p.mid}"/>`);
    put(`<circle cx="${(bx - bw / 2 - 10).toFixed(1)}" cy="${(top + 95).toFixed(1)}" r="5" fill="${p.mid}"/>`);
    put(`<circle cx="${(bx + bw / 2 + 10).toFixed(1)}" cy="${(top + 95).toFixed(1)}" r="5" fill="${p.mid}"/>`);
    const tear = 22 + rng() * 16;
    put(
      `<path d="M ${(bx - bw / 2).toFixed(1)} ${(top + 99).toFixed(1)}
        l ${bw} 0
        l 0 ${bh.toFixed(1)}
        l ${(-bw * 0.28).toFixed(1)} ${(-tear).toFixed(1)}
        l ${(-bw * 0.2).toFixed(1)} ${(tear * 0.7).toFixed(1)}
        l ${(-bw * 0.24).toFixed(1)} ${(-tear * 0.85).toFixed(1)}
        l ${(-bw * 0.28).toFixed(1)} ${(tear * 0.5).toFixed(1)} Z"
        fill="${a}" fill-opacity="0.42"/>`,
    );
    // folds: the light does not hit a hanging cloth evenly
    for (let f2 = 0; f2 < 3; f2++) {
      put(
        `<rect x="${(bx - bw / 2 + 6 + f2 * 14).toFixed(1)}" y="${(top + 99).toFixed(1)}" width="5" height="${(bh - tear).toFixed(1)}" fill="#000" fill-opacity="${(0.1 + (f2 % 2) * 0.09).toFixed(2)}"/>`,
      );
    }
    put(`<rect x="${(bx - bw / 2).toFixed(1)}" y="${(top + 99).toFixed(1)}" width="${bw}" height="5" fill="#000" fill-opacity="0.3"/>`);
  }

  // one side of the floor a step higher, so the ground is not a single line
  if (rng() < 0.55) {
    const side = rng() < 0.5;
    const lw = w * (0.24 + rng() * 0.2);
    const lx = side ? x : x + w - lw;
    const rise = 20 + rng() * 22;
    put(`<rect x="${lx.toFixed(1)}" y="${(floorY - rise).toFixed(1)}" width="${lw.toFixed(1)}" height="${(y + h - floorY + rise).toFixed(1)}" fill="${p.floor}"/>`);
    put(
      `<line x1="${lx.toFixed(1)}" y1="${(floorY - rise).toFixed(1)}" x2="${(lx + lw).toFixed(1)}" y2="${(floorY - rise).toFixed(1)}" stroke="${p.edge}" stroke-width="2"/>`,
    );
    put(
      `<line x1="${side ? (lx + lw).toFixed(1) : lx.toFixed(1)}" y1="${(floorY - rise).toFixed(1)}" x2="${side ? (lx + lw).toFixed(1) : lx.toFixed(1)}" y2="${(y + h).toFixed(1)}" stroke="${p.edge}" stroke-width="2"/>`,
    );
  }
  return floorY;
}

/** A channel of water crossed by a walkway. */
function bridge(x, y, w, h, p, rng) {
  const floorY = backdrop(x, y, w, h, p, rng);
  const wy = floorY + 34;
  put(`<rect x="${x}" y="${wy}" width="${w}" height="${y + h - wy}" fill="${p.far}"/>`);
  put(`<rect x="${x}" y="${wy}" width="${w}" height="${y + h - wy}" fill="${p.glow}" fill-opacity="0.13"/>`);
  for (let i = 0; i < 26; i++) {
    const ly = wy + 8 + rng() * (y + h - wy - 14);
    const lx = x + rng() * w * 0.8;
    put(
      `<line x1="${lx.toFixed(1)}" y1="${ly.toFixed(1)}" x2="${(lx + 30 + rng() * 90).toFixed(1)}" y2="${ly.toFixed(1)}" stroke="${p.glow}" stroke-width="1.6" stroke-opacity="${(0.15 + rng() * 0.4).toFixed(2)}"/>`,
    );
  }
  put(`<rect x="${x}" y="${floorY}" width="${w}" height="34" fill="${p.floor}"/>`);
  put(`<line x1="${x}" y1="${floorY + 34}" x2="${x + w}" y2="${floorY + 34}" stroke="${p.edge}" stroke-width="2"/>`);
  return floorY;
}

/** Rough rock: no courses, a ragged ceiling, teeth. */
function cave(x, y, w, h, p, rng) {
  put(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${p.far}"/>`);
  const floorY = y + h * 0.8;
  let d = `M ${x} ${y}`;
  for (let i = 0; i <= 18; i++) {
    d += ` L ${(x + (i / 18) * w).toFixed(1)} ${(y + 40 + Math.sin(i * 1.7) * 22 + rng() * 26).toFixed(1)}`;
  }
  d += ` L ${x + w} ${y} Z`;
  put(`<path d="${d}" fill="${p.mid}"/>`);
  for (let i = 0; i < 13; i++) {
    const tx = x + 30 + rng() * (w - 60);
    const ty = y + 52 + rng() * 26;
    const len = 18 + rng() * 46;
    put(`<path d="M ${tx - 9} ${ty} L ${tx + 9} ${ty} L ${tx} ${ty + len} Z" fill="${p.mid}"/>`);
  }
  put(`<rect x="${x}" y="${y}" width="${w}" height="${floorY - y}" fill="${p.air}" fill-opacity="0.4"/>`);
  let f = `M ${x} ${y + h} L ${x} ${floorY}`;
  for (let i = 0; i <= 16; i++) {
    f += ` L ${(x + (i / 16) * w).toFixed(1)} ${(floorY + Math.sin(i * 2.3) * 7 + rng() * 9).toFixed(1)}`;
  }
  f += ` L ${x + w} ${y + h} Z`;
  put(`<path d="${f}" fill="${p.floor}" stroke="${p.edge}" stroke-width="2"/>`);
  return floorY + 6;
}

/** Steps climbing away, with the middle of the flight missing. */
function stair(x, y, w, h, p, rng) {
  const floorY = backdrop(x, y, w, h, p, rng);
  const steps = 11;
  for (let i = 0; i < steps; i++) {
    const sw = w * 0.62 - i * 22;
    const sx = x + w * 0.2 + i * 11;
    const sy = floorY - i * 21;
    if (i > 3 && i < 7) continue; // the missing treads
    put(`<rect x="${sx.toFixed(1)}" y="${(sy - 16).toFixed(1)}" width="${sw.toFixed(1)}" height="16" fill="${p.mid}"/>`);
    put(
      `<line x1="${sx.toFixed(1)}" y1="${(sy - 16).toFixed(1)}" x2="${(sx + sw).toFixed(1)}" y2="${(sy - 16).toFixed(1)}" stroke="${p.edge}" stroke-width="1.6"/>`,
    );
  }
  // the gap, with rubble at the bottom of it
  for (let i = 0; i < 9; i++) {
    const rx = x + w * 0.3 + rng() * w * 0.3;
    put(
      `<rect x="${rx.toFixed(1)}" y="${(floorY - 6 - rng() * 10).toFixed(1)}" width="${(8 + rng() * 16).toFixed(1)}" height="${(5 + rng() * 8).toFixed(1)}" fill="${p.mid}" transform="rotate(${(rng() * 40 - 20).toFixed(1)} ${rx.toFixed(1)} ${floorY.toFixed(1)})"/>`,
    );
  }
  return floorY;
}

/** Open to weather: sky instead of a vault. */
function yard(x, y, w, h, p, rng) {
  put(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${p.air}"/>`);
  for (let i = 0; i < 5; i++) {
    put(
      `<ellipse cx="${(x + rng() * w).toFixed(1)}" cy="${(y + 40 + rng() * 60).toFixed(1)}" rx="${(90 + rng() * 130).toFixed(1)}" ry="${(18 + rng() * 16).toFixed(1)}" fill="${p.mid}" fill-opacity="0.5"/>`,
    );
  }
  const floorY = y + h * 0.8;
  put(`<rect x="${x}" y="${floorY - 60}" width="${w}" height="62" fill="${p.far}"/>`);
  put(`<rect x="${x}" y="${floorY}" width="${w}" height="${y + h - floorY}" fill="${p.floor}"/>`);
  put(`<line x1="${x}" y1="${floorY}" x2="${x + w}" y2="${floorY}" stroke="${p.edge}" stroke-width="2"/>`);
  return floorY;
}

/** A fog gate: a doorway you can see nothing through. */
function fogRoom(x, y, w, h, p, rng) {
  const floorY = hall(x, y, w, h, p, rng);
  const gx = x + w / 2;
  put(`<rect x="${gx - 92}" y="${floorY - 250}" width="184" height="250" fill="#0a0d12"/>`);
  put(
    `<path d="M ${gx - 92} ${floorY - 250} Q ${gx} ${floorY - 330} ${gx + 92} ${floorY - 250}" fill="#0a0d12" stroke="${p.edge}" stroke-width="3"/>`,
  );
  for (let i = 0; i < 22; i++) {
    put(
      `<ellipse cx="${(gx - 80 + rng() * 160).toFixed(1)}" cy="${(floorY - 20 - rng() * 220).toFixed(1)}" rx="${(30 + rng() * 54).toFixed(1)}" ry="${(14 + rng() * 26).toFixed(1)}" fill="#cfe0ee" fill-opacity="${(0.05 + rng() * 0.09).toFixed(3)}"/>`,
    );
  }
  return floorY;
}

const ARCH = { hall, bridge, cave, stair, yard, fog: fogRoom, bonfire: hall };

/**
 * Hand-placed things, keyed off the key the room's author gave it — not off
 * an index, which shifts the moment an area changes length. A room's line
 * promises straw, a drain and an open door, so the picture owes you all three.
 */
const PROPS = {
  cell(x, w, floorY, p, rng) {
    // straw
    for (let i = 0; i < 90; i++) {
      const sx = x + w * 0.55 + (rng() - 0.5) * w * 0.42;
      const sy = floorY + 4 + rng() * 44;
      const a = rng() * Math.PI;
      put(`<line x1="${sx.toFixed(1)}" y1="${sy.toFixed(1)}" x2="${(sx + Math.cos(a) * 16).toFixed(1)}" y2="${(sy + Math.sin(a) * 4).toFixed(1)}" stroke="#7a6a45" stroke-width="1.3" stroke-opacity="${(0.25 + rng() * 0.45).toFixed(2)}"/>`);
    }
    // the drain
    put(`<ellipse cx="${x + w * 0.22}" cy="${floorY + 40}" rx="34" ry="11" fill="#05080b"/>`);
    for (let i = -2; i <= 2; i++)
      put(`<line x1="${x + w * 0.22 + i * 11}" y1="${floorY + 31}" x2="${x + w * 0.22 + i * 11}" y2="${floorY + 49}" stroke="${p.edge}" stroke-width="2.4"/>`);
    // the door somebody left open a long time ago
    put(`<rect x="${x + w * 0.79}" y="${floorY - 150}" width="86" height="150" fill="#05070a"/>`);
    put(`<path d="M ${x + w * 0.79} ${floorY - 150} l 86 0" stroke="${p.edge}" stroke-width="2.5"/>`);
    put(`<path d="M ${x + w * 0.79 - 60} ${floorY - 146} l 54 -10 l 0 148 l -54 -14 Z" fill="${p.mid}" stroke="${p.edge}" stroke-width="2"/>`);
    for (let i = 0; i < 3; i++)
      put(`<rect x="${x + w * 0.79 - 58}" y="${floorY - 128 + i * 46}" width="50" height="7" fill="${p.edge}" fill-opacity="0.6"/>`);
  },
  kennel(x, w, floorY, p, rng) {
    for (let i = 0; i < 26; i++) {
      const bx = x + w * 0.2 + rng() * w * 0.66;
      const by = floorY + 6 + rng() * 46;
      const len = 10 + rng() * 24;
      const a = rng() * 0.8 - 0.4;
      put(`<g transform="rotate(${(a * 57).toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)})"><rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${len.toFixed(1)}" height="3" rx="1.5" fill="#8d8672" fill-opacity="0.5"/><circle cx="${bx.toFixed(1)}" cy="${(by + 1.5).toFixed(1)}" r="3" fill="#8d8672" fill-opacity="0.5"/><circle cx="${(bx + len).toFixed(1)}" cy="${(by + 1.5).toFixed(1)}" r="3" fill="#8d8672" fill-opacity="0.5"/></g>`);
    }
  },
  'long-drain'(x, w, floorY, p) {
    // the water runs the wrong way, so the arrows disagree with the slope
    for (let i = 0; i < 5; i++) {
      const ax = x + w * (0.16 + i * 0.16);
      put(`<path d="M ${ax} ${floorY + 62} l 26 7 l -26 7" fill="none" stroke="${p.glow}" stroke-width="2" stroke-opacity="0.5"/>`);
    }
  },
  'lamplighters-rest'(x, w, floorY, p) {
    // somebody sat here with a lantern and did not get up
    const lx = x + w * 0.26;
    put(`<rect x="${lx - 15}" y="${floorY - 34}" width="30" height="30" rx="3" fill="${p.mid}" stroke="${p.edge}" stroke-width="2"/>`);
    put(`<rect x="${lx - 9}" y="${floorY - 28}" width="18" height="19" fill="#1a120a"/>`);
    put(`<path d="M ${lx - 15} ${floorY - 34} l 15 -12 l 15 12 Z" fill="${p.mid}" stroke="${p.edge}" stroke-width="2"/>`);
    put(`<ellipse cx="${lx}" cy="${floorY - 2}" rx="42" ry="10" fill="#000" fill-opacity="0.35"/>`);
  },
  undergate(x, w, floorY, p) {
    for (const cx of [x + w * 0.2, x + w * 0.8]) {
      put(`<path d="M ${cx - 52} ${floorY} l 0 -104 q 52 -46 104 0 l 0 104 Z" fill="#05070a"/>`);
      put(`<path d="M ${cx - 52} ${floorY - 104} q 52 -46 104 0" fill="none" stroke="${p.edge}" stroke-width="3"/>`);
    }
  },
};

// --- the fire -------------------------------------------------------------
function bonfire(x, floorY, scale, rng) {
  const s = scale;
  put(`<ellipse cx="${x}" cy="${floorY + 2}" rx="${74 * s}" ry="${16 * s}" fill="${FIRE.deep}" fill-opacity="0.28"/>`);
  // a ring of blades stuck in the ash, which is what a bonfire is here
  for (let i = -3; i <= 3; i++) {
    const bx = x + i * 15 * s;
    const lean = i * 3;
    put(
      `<path d="M ${bx} ${floorY} l ${lean} ${-40 * s} l ${3 * s} ${-6 * s} l ${3 * s} ${6 * s} Z" fill="#5a6472"/>`,
    );
  }
  for (let i = 0; i < 16; i++) {
    const ax = x - 44 * s + rng() * 88 * s;
    put(`<ellipse cx="${ax.toFixed(1)}" cy="${(floorY - 2 - rng() * 6).toFixed(1)}" rx="${(6 + rng() * 12).toFixed(1)}" ry="${(3 + rng() * 4).toFixed(1)}" fill="#3a3128"/>`);
  }
  const tongue = (spread, tall, lean, fill, op) => {
    const t = floorY - tall;
    put(
      `<path d="M ${(x - spread).toFixed(1)} ${floorY}
        C ${(x - spread * 0.75).toFixed(1)} ${(floorY - tall * 0.45).toFixed(1)}
          ${(x + lean - spread * 0.5).toFixed(1)} ${(floorY - tall * 0.62).toFixed(1)}
          ${(x + lean).toFixed(1)} ${t.toFixed(1)}
        C ${(x + lean + spread * 0.55).toFixed(1)} ${(floorY - tall * 0.6).toFixed(1)}
          ${(x + spread * 0.7).toFixed(1)} ${(floorY - tall * 0.4).toFixed(1)}
          ${(x + spread).toFixed(1)} ${floorY} Z"
       fill="${fill}" fill-opacity="${op}"/>`,
    );
  };
  tongue(38 * s, 104 * s, -7 * s, FIRE.deep, 0.8);
  tongue(27 * s, 84 * s, 9 * s, FIRE.low, 0.95);
  tongue(17 * s, 62 * s, -4 * s, FIRE.mid, 1);
  tongue(8 * s, 38 * s, 3 * s, FIRE.core, 1);
  // a torn-off tongue riding above the rest, which is what makes it read as
  // burning rather than as a shape
  tongue(6 * s, 22 * s, 12 * s, FIRE.mid, 0.7);
  for (let i = 0; i < 14; i++) {
    put(
      `<circle cx="${(x - 30 * s + rng() * 60 * s).toFixed(1)}" cy="${(floorY - 40 * s - rng() * 110 * s).toFixed(1)}" r="${(1 + rng() * 2.4).toFixed(1)}" fill="${FIRE.mid}" fill-opacity="${(0.3 + rng() * 0.6).toFixed(2)}"/>`,
    );
  }
}

/** Light thrown onto the floor by anything burning. */
function pool(x, floorY, r, colour, strength) {
  put(
    `<ellipse cx="${x}" cy="${floorY + 4}" rx="${r}" ry="${r * 0.26}" fill="${colour}" fill-opacity="${strength}"/>`,
  );
}

// --- the sixteen ----------------------------------------------------------
// Each of these is built from the `look` field in `lore.js`. The husk's arms
// swing from the elbow and never the shoulder, so its elbows are the only
// joint that moves. The hound runs on three good legs out of four, so one is
// short. Nothing here is a generic humanoid with a hat on.

// A silhouette has to separate from the floor it is standing on. In a lit
// hall that means going darker than the stone; in a dark cave the stone is
// already almost black, so the figure has to come up to meet it instead.
// Drawing the kennel with a flat dark body produced two hounds nobody could
// see, which is how this ended up being computed per room.
const BODY = { dark: '#0e1319', mid: '#1b232d', rim: '#4a5b6d', wet: '#2a3b46' };

function bodyFor(light) {
  if (light === 'dark' || light === 'dim') {
    return { dark: '#2f3d4c', mid: '#3d4d5e', rim: '#93a6bb', wet: '#35505e', halo: '#7fa6c8', up: true };
  }
  return { dark: '#0e1319', mid: '#1b232d', rim: '#4a5b6d', wet: '#2a3b46', halo: '#000000', up: false };
}

/** Lift a figure off the wall behind it: a soft halo, the other way round in
 *  a lit room, where the figure is darker than everything and needs shadow. */
function halo(x, floorY, s, up) {
  put(`<ellipse cx="${x}" cy="${(floorY - 46 * s).toFixed(1)}" rx="${(64 * s).toFixed(1)}" ry="${(74 * s).toFixed(1)}" fill="url(#${up ? 'haloD' : 'haloL'})"/>`);
}

const limb = (x1, y1, x2, y2, wdt, col) =>
  put(
    `<line x1="${q(x1)}" y1="${q(y1)}" x2="${q(x2)}" y2="${q(y2)}" stroke="${col}" stroke-width="${thick(wdt)}" stroke-linecap="${CAP}"/>`,
  );

function torch(x, y, s, f) {
  const t = x + 14 * s * f;
  limb(x, y + 6 * s, t, y - 30 * s, 3.4 * s, '#4a3a24');
  put(`<path d="M ${t - 9 * s} ${y - 28 * s} q ${-4 * s} ${-22 * s} ${9 * s} ${-40 * s} q ${13 * s} ${19 * s} ${9 * s} ${40 * s} Z" fill="${FIRE.deep}" fill-opacity="0.8"/>`);
  put(`<path d="M ${t - 6 * s} ${y - 30 * s} q ${-2 * s} ${-16 * s} ${6 * s} ${-30 * s} q ${9 * s} ${14 * s} ${6 * s} ${30 * s} Z" fill="${FIRE.mid}"/>`);
  put(`<circle cx="${t}" cy="${y - 46 * s}" r="${5.5 * s}" fill="${FIRE.core}" fill-opacity="0.9"/>`);
}

function spear(x, y, s, f) {
  const hand = x + 20 * s * f;
  limb(hand - 26 * s * f, y + 34 * s, hand + 54 * s * f, y - 16 * s, 3.2 * s, '#4a3a24');
  put(`<path d="M ${hand + 54 * s * f} ${y - 16 * s} l ${15 * s * f} ${-7 * s} l ${-12 * s * f} ${-8 * s} Z" fill="#8a97a5"/>`);
}

function shield(x, y, s, f) {
  put(`<path d="M ${x + 20 * s * f} ${y - 8 * s} q ${16 * s * f} ${4 * s} ${15 * s * f} ${22 * s} q ${-1 * s * f} ${20 * s} ${-15 * s * f} ${28 * s} q ${-14 * s * f} ${-8 * s} ${-15 * s * f} ${-28 * s} q ${1 * s * f} ${-18 * s} ${15 * s * f} ${-22 * s} Z" fill="${BODY.mid}" stroke="${BODY.rim}" stroke-width="${1.6 * s}"/>`);
}

const CREATURE = {
  husk(x, g, s, f) {
    const hip = g - 44 * s;
    const sh = g - 82 * s;
    // stance: weight back, knees never quite straight
    limb(x - 2 * s, hip, x - 10 * s, g - 3 * s, 7 * s, BODY.mid);
    limb(x - 10 * s, g - 3 * s, x - 13 * s, g, 6 * s, BODY.mid);
    limb(x + 3 * s, hip, x + 9 * s, g - 4 * s, 7 * s, BODY.mid);
    limb(x + 9 * s, g - 4 * s, x + 13 * s, g, 6 * s, BODY.mid);
    put(`<ellipse cx="${(x - 14 * s).toFixed(1)}" cy="${(g - 1 * s).toFixed(1)}" rx="${(7 * s).toFixed(1)}" ry="${(3 * s).toFixed(1)}" fill="${BODY.dark}"/>`);
    put(`<ellipse cx="${(x + 15 * s).toFixed(1)}" cy="${(g - 1 * s).toFixed(1)}" rx="${(7.5 * s).toFixed(1)}" ry="${(3 * s).toFixed(1)}" fill="${BODY.mid}"/>`);
    // torso, tapered, with the chest cavity cut out of the silhouette itself
    put(`<path d="M ${x - 13 * s} ${sh + 2 * s}
      q ${5 * s} ${-5 * s} ${11 * s} ${-4 * s}
      q ${3 * s} ${9 * s} ${1 * s} ${16 * s}
      q ${-4 * s} ${6 * s} ${1 * s} ${13 * s}
      q ${4 * s} ${5 * s} ${10 * s} ${3 * s}
      l ${-2 * s} ${18 * s}
      q ${-9 * s} ${5 * s} ${-19 * s} ${1 * s} Z" fill="${BODY.dark}"/>`);
    put(`<path d="M ${x + 12 * s} ${sh - 2 * s}
      q ${4 * s} ${16 * s} ${1 * s} ${30 * s}
      l ${-2 * s} ${16 * s}
      q ${-6 * s} ${3 * s} ${-12 * s} ${2 * s}
      l ${2 * s} ${-46 * s} Z" fill="${BODY.mid}"/>`);
    // The ember it was lit from, still burning in the hole where its chest
    // used to be. Every torch in this world came off one flame, and a husk is
    // what is left of somebody who carried one — so it keeps the fire, and in
    // a dark room the ember is what you see before the body.
    put(`<ellipse cx="${(x + 1 * s).toFixed(1)}" cy="${(sh + 22 * s).toFixed(1)}" rx="${(22 * s).toFixed(1)}" ry="${(24 * s).toFixed(1)}" fill="url(#ember)"/>`);
    put(`<ellipse cx="${(x + 1 * s).toFixed(1)}" cy="${(sh + 22 * s).toFixed(1)}" rx="${(6 * s).toFixed(1)}" ry="${(8 * s).toFixed(1)}" fill="${FIRE.low}" fill-opacity="0.9"/>`);
    put(`<ellipse cx="${(x + 1 * s).toFixed(1)}" cy="${(sh + 21 * s).toFixed(1)}" rx="${(2.6 * s).toFixed(1)}" ry="${(4 * s).toFixed(1)}" fill="${FIRE.core}"/>`);
    // arms: the shoulder never moves, the elbow does all of it
    limb(x - 12 * s, sh + 4 * s, x - 15 * s, sh + 30 * s, 5 * s, BODY.mid);
    limb(x - 15 * s, sh + 30 * s, x - 19 * s + 4 * s * f, sh + 50 * s, 4.2 * s, BODY.mid);
    limb(x + 12 * s, sh + 3 * s, x + 16 * s, sh + 30 * s, 5 * s, BODY.mid);
    limb(x + 16 * s, sh + 30 * s, x + 21 * s + 5 * s * f, sh + 48 * s, 4.2 * s, BODY.mid);
    // neck and head, hung forward of the shoulders
    limb(x + 2 * s, sh + 2 * s, x + 7 * s * f, sh - 6 * s, 5 * s, BODY.mid);
    put(`<path d="M ${x + 2 * s * f} ${sh - 6 * s}
      q ${9 * s * f} ${-4 * s} ${13 * s * f} ${4 * s}
      q ${2 * s * f} ${9 * s} ${-6 * s * f} ${11 * s}
      q ${-9 * s * f} ${0} ${-11 * s * f} ${-7 * s} Z" fill="${BODY.dark}"/>`);
    put(`<line x1="${x - 13 * s}" y1="${sh + 2 * s}" x2="${x + 13 * s}" y2="${sh}" stroke="${BODY.rim}" stroke-width="${1.3 * s}" stroke-opacity="0.75"/>`);
    for (let i = 0; i < 3; i++) {
      if (PIXEL) {
        put(
          `<rect x="${q(x - 9 * s)}" y="${q(sh + 12 * s + i * 8 * s)}" width="${q(18 * s)}" height="${PX}" fill="${BODY.rim}" fill-opacity="0.45"/>`,
        );
      } else {
        put(
          `<path d="M ${(x - 9 * s).toFixed(1)} ${(sh + 13 * s + i * 8 * s).toFixed(1)} q ${(9 * s).toFixed(1)} ${(4 * s).toFixed(1)} ${(18 * s).toFixed(1)} 0" fill="none" stroke="${BODY.rim}" stroke-width="${(2 * s).toFixed(1)}" stroke-opacity="0.4"/>`,
        );
      }
    }
    // a rag still wrapped over one shoulder, and a torn hem
    put(
      `<path d="M ${(x - 14 * s).toFixed(1)} ${(sh + 3 * s).toFixed(1)} q ${(14 * s).toFixed(1)} ${(9 * s).toFixed(1)} ${(27 * s).toFixed(1)} ${(2 * s).toFixed(1)} l ${(-3 * s).toFixed(1)} ${(9 * s).toFixed(1)} q ${(-13 * s).toFixed(1)} ${(6 * s).toFixed(1)} ${(-25 * s).toFixed(1)} ${(-1 * s).toFixed(1)} Z" fill="#4a3a2e" fill-opacity="0.55"/>`,
    );
    // a torn hem, stepped rather than jagged
    for (let i = 0; i < 5; i++) {
      put(
        `<rect x="${q(x - 12 * s + i * 6 * s)}" y="${q(sh + 44 * s)}" width="${q(6 * s)}" height="${q((3 + (i % 3) * 3) * s)}" fill="#4a3a2e" fill-opacity="0.55"/>`,
      );
    }
  },
  hound(x, g, s, f) {
    const back = g - 40 * s;
    // deep chest at the front, nothing behind the ribs
    put(`<path d="M ${x + 30 * s * f} ${back - 4 * s}
      q ${-14 * s * f} ${-9 * s} ${-30 * s * f} ${-3 * s}
      q ${-18 * s * f} ${7 * s} ${-30 * s * f} ${4 * s}
      q ${4 * s * f} ${10 * s} ${6 * s * f} ${17 * s}
      q ${20 * s * f} ${7 * s} ${44 * s * f} ${2 * s}
      q ${8 * s * f} ${-6 * s} ${10 * s * f} ${-20 * s} Z" fill="${BODY.dark}"/>`);
    // front legs long, back legs short and staggered — one is no good
    limb(x + 20 * s * f, back + 8 * s, x + 24 * s * f, g, 4.6 * s, BODY.mid);
    limb(x + 12 * s * f, back + 11 * s, x + 8 * s * f, g, 4.2 * s, BODY.mid);
    limb(x - 22 * s * f, back + 12 * s, x - 28 * s * f, g, 4.4 * s, BODY.mid);
    limb(x - 13 * s * f, back + 14 * s, x - 11 * s * f, g - 9 * s, 3.4 * s, BODY.mid);
    // head low and forward, snout, ear laid back
    limb(x + 28 * s * f, back - 2 * s, x + 40 * s * f, back + 6 * s, 6 * s, BODY.dark);
    put(`<path d="M ${x + 38 * s * f} ${back + 1 * s}
      q ${10 * s * f} ${-2 * s} ${16 * s * f} ${4 * s}
      q ${-5 * s * f} ${6 * s} ${-16 * s * f} ${5 * s} Z" fill="${BODY.dark}"/>`);
    put(`<path d="M ${x + 34 * s * f} ${back - 1 * s} l ${-7 * s * f} ${-9 * s} l ${9 * s * f} ${2 * s} Z" fill="${BODY.dark}"/>`);
    // it came out of the same kiln, and the seams never closed
    for (let i = 0; i < 4; i++) {
      const gx = x + (18 - i * 13) * s * f;
      put(
        `<path d="M ${gx.toFixed(1)} ${(back - 5 * s).toFixed(1)} l ${(3 * s * f).toFixed(1)} ${(7 * s).toFixed(1)}" fill="none" stroke="${FIRE.low}" stroke-width="${(2.2 * s).toFixed(1)}" stroke-opacity="0.75"/>`,
      );
    }
    put(`<ellipse cx="${(x + 4 * s * f).toFixed(1)}" cy="${(back + 1 * s).toFixed(1)}" rx="${(30 * s).toFixed(1)}" ry="${(15 * s).toFixed(1)}" fill="url(#ember)"/>`);
    // ribs under the hide — bars in pixel mode, and a line that follows the
    // barrel of the chest when painted. Left as bars, they read as three white
    // sticks laid on a dog.
    for (let i = 0; i < 3; i++) {
      const rx = x + (2 - i * 10) * s * f;
      if (PIXEL) {
        put(`<rect x="${q(rx)}" y="${q(back + 4 * s)}" width="${PX}" height="${q(14 * s)}" fill="${BODY.rim}" fill-opacity="0.4"/>`);
      } else {
        put(
          `<path d="M ${rx.toFixed(1)} ${(back + 3 * s).toFixed(1)} q ${(3 * s * f).toFixed(1)} ${(7 * s).toFixed(1)} ${(-1 * s * f).toFixed(1)} ${(14 * s).toFixed(1)}" fill="none" stroke="${BODY.rim}" stroke-width="${(1.8 * s).toFixed(1)}" stroke-opacity="0.28"/>`,
        );
      }
    }
    put(
      `<path d="M ${(x + 24 * s * f).toFixed(1)} ${(back - 4 * s).toFixed(1)} q ${(3 * s * f).toFixed(1)} ${(11 * s).toFixed(1)} ${(-2 * s * f).toFixed(1)} ${(19 * s).toFixed(1)}" fill="none" stroke="#4a3a2e" stroke-width="${(4 * s).toFixed(1)}" stroke-opacity="0.8"/>`,
    );
    // tail down
    put(`<path d="M ${x - 30 * s * f} ${back + 8 * s} q ${-12 * s * f} ${4 * s} ${-14 * s * f} ${16 * s}" fill="none" stroke="${BODY.mid}" stroke-width="${3 * s}" stroke-linecap="round"/>`);
  },
  crawler(x, g, s, f) {
    put(`<path d="M ${x - 30 * s * f} ${g - 4 * s} q ${18 * s * f} ${-8 * s} ${40 * s * f} ${-16 * s} l ${8 * s * f} ${14 * s} q ${-24 * s * f} ${10 * s} ${-48 * s * f} ${8 * s} Z" fill="${BODY.dark}"/>`);
    limb(x + 22 * s * f, g - 22 * s, x + 34 * s * f, g, 7 * s, BODY.mid);
    limb(x + 10 * s * f, g - 20 * s, x + 22 * s * f, g, 7 * s, BODY.mid);
    limb(x - 26 * s * f, g - 4 * s, x - 52 * s * f, g, 4.5 * s, BODY.mid);
    limb(x - 26 * s * f, g - 2 * s, x - 48 * s * f, g + 2 * s, 4 * s, BODY.mid);
    put(`<ellipse cx="${x + 34 * s * f}" cy="${g - 26 * s}" rx="${9 * s}" ry="${8 * s}" fill="${BODY.dark}"/>`);
  },
  acolyte(x, g, s) {
    put(`<path d="M ${x - 20 * s} ${g} q ${4 * s} ${-52 * s} ${20 * s} ${-64 * s} q ${16 * s} ${12 * s} ${20 * s} ${64 * s} Z" fill="${BODY.dark}"/>`);
    put(`<path d="M ${x - 12 * s} ${g - 66 * s} q ${12 * s} ${-16 * s} ${24 * s} 0 q ${-12 * s} ${8 * s} ${-24 * s} 0 Z" fill="${BODY.mid}"/>`);
    put(`<ellipse cx="${x}" cy="${g - 74 * s}" rx="${11 * s}" ry="${13 * s}" fill="${BODY.dark}"/>`);
    put(`<ellipse cx="${x}" cy="${g - 72 * s}" rx="${6 * s}" ry="${8 * s}" fill="#000" fill-opacity="0.7"/>`);
    limb(x - 3 * s, g - 52 * s, x + 3 * s, g - 52 * s, 7 * s, BODY.mid); // hands together
  },
  knightling(x, g, s, f) {
    const sh = g - 60 * s;
    limb(x - 5 * s, g - 30 * s, x - 8 * s, g, 6 * s, BODY.mid);
    limb(x + 5 * s, g - 30 * s, x + 8 * s, g, 6 * s, BODY.mid);
    put(`<path d="M ${x - 13 * s} ${sh} q ${13 * s} ${7 * s} ${26 * s} 0 l ${-3 * s} ${32 * s} q ${-10 * s} ${5 * s} ${-20 * s} 0 Z" fill="${BODY.mid}"/>`);
    for (let i = 0; i < 4; i++)
      put(`<line x1="${x - 12 * s}" y1="${sh + 6 * s + i * 7 * s}" x2="${x + 12 * s}" y2="${sh + 6 * s + i * 7 * s}" stroke="${BODY.rim}" stroke-width="${1 * s}" stroke-opacity="0.6"/>`);
    put(`<ellipse cx="${x}" cy="${sh - 10 * s}" rx="${9 * s}" ry="${10 * s}" fill="${BODY.dark}"/>`);
    limb(x - 13 * s * f, sh + 6 * s, x - 26 * s * f, sh + 24 * s, 4.5 * s, BODY.mid);
    shield(x, sh + 4 * s, s, -f);
  },
  ghoul(x, g, s, f) {
    limb(x - 6 * s, g - 34 * s, x - 12 * s, g, 5 * s, BODY.mid);
    limb(x + 6 * s, g - 34 * s, x + 11 * s, g, 5 * s, BODY.mid);
    put(`<path d="M ${x - 10 * s} ${g - 60 * s} q ${10 * s} ${6 * s} ${20 * s} 0 l ${-5 * s} ${28 * s} q ${-5 * s} ${4 * s} ${-10 * s} 0 Z" fill="${BODY.dark}"/>`);
    limb(x - 10 * s, g - 58 * s, x - 30 * s * f, g - 34 * s, 4 * s, BODY.mid);
    limb(x - 30 * s * f, g - 34 * s, x - 30 * s * f - 15 * s, g - 46 * s, 3.4 * s, BODY.mid);
    limb(x + 10 * s, g - 58 * s, x + 30 * s * f, g - 40 * s, 4 * s, BODY.mid);
    limb(x + 30 * s * f, g - 40 * s, x + 46 * s * f, g - 30 * s, 3.4 * s, BODY.mid);
    put(`<ellipse cx="${x + 3 * s * f}" cy="${g - 68 * s}" rx="${8 * s}" ry="${8 * s}" fill="${BODY.dark}"/>`);
  },
  stonemask(x, g, s, f) {
    limb(x - 7 * s, g - 40 * s, x - 12 * s, g, 8 * s, BODY.mid);
    limb(x + 7 * s, g - 40 * s, x + 12 * s, g, 8 * s, BODY.mid);
    put(`<path d="M ${x - 15 * s} ${g - 68 * s} q ${15 * s} ${8 * s} ${30 * s} 0 l ${-6 * s} ${34 * s} q ${-9 * s} ${5 * s} ${-18 * s} 0 Z" fill="${BODY.dark}"/>`);
    limb(x - 15 * s, g - 62 * s, x - 24 * s * f, g - 34 * s, 5 * s, BODY.mid);
    limb(x + 15 * s, g - 62 * s, x + 24 * s * f, g - 34 * s, 5 * s, BODY.mid);
    // heavy at the head: the mask is the biggest thing on it
    put(`<path d="M ${x - 16 * s} ${g - 74 * s} q ${16 * s} ${-16 * s} ${32 * s} 0 q ${-2 * s} ${26 * s} ${-16 * s} ${28 * s} q ${-14 * s} ${-2 * s} ${-16 * s} ${-28 * s} Z" fill="#6b6152" stroke="${BODY.rim}" stroke-width="${1.4 * s}"/>`);
    put(`<circle cx="${x - 6 * s}" cy="${g - 74 * s}" r="${2.6 * s}" fill="#000"/>`);
    put(`<circle cx="${x + 6 * s}" cy="${g - 74 * s}" r="${2.6 * s}" fill="#000"/>`);
  },
  moth(x, g, s, f) {
    const y = g - 74 * s;
    put(`<path d="M ${x} ${y} q ${-40 * s * f} ${-34 * s} ${-52 * s * f} ${-4 * s} q ${8 * s * f} ${24 * s} ${52 * s * f} ${16 * s} Z" fill="${BODY.mid}" fill-opacity="0.85"/>`);
    put(`<path d="M ${x} ${y} q ${34 * s * f} ${-38 * s} ${50 * s * f} ${-8 * s} q ${-10 * s * f} ${26 * s} ${-50 * s * f} ${18 * s} Z" fill="${BODY.mid}" fill-opacity="0.85"/>`);
    put(`<ellipse cx="${x}" cy="${y + 6 * s}" rx="${5 * s}" ry="${15 * s}" fill="${BODY.dark}"/>`);
    limb(x, y - 10 * s, x - 8 * s * f, y - 22 * s, 1.6 * s, BODY.rim);
    limb(x, y - 10 * s, x + 6 * s * f, y - 23 * s, 1.6 * s, BODY.rim);
  },
  warder(x, g, s, f) {
    limb(x - 12 * s, g - 44 * s, x - 20 * s, g, 9 * s, BODY.mid);
    limb(x + 12 * s, g - 44 * s, x + 20 * s, g, 9 * s, BODY.mid);
    put(`<path d="M ${x - 22 * s} ${g - 74 * s} l ${44 * s} 0 l ${-5 * s} ${36 * s} l ${-34 * s} 0 Z" fill="${BODY.mid}"/>`);
    for (let i = 0; i < 5; i++)
      put(`<rect x="${x - 20 * s}" y="${g - 70 * s + i * 7 * s}" width="${40 * s}" height="${4.5 * s}" fill="${BODY.dark}" fill-opacity="0.7"/>`);
    put(`<rect x="${x - 9 * s}" y="${g - 90 * s}" width="${18 * s}" height="${17 * s}" rx="${3 * s}" fill="${BODY.dark}"/>`);
    put(`<rect x="${x - 7 * s}" y="${g - 84 * s}" width="${14 * s}" height="${2.4 * s}" fill="#000"/>`);
    limb(x + 22 * s * f, g - 68 * s, x + 34 * s * f, g - 36 * s, 5.5 * s, BODY.mid);
  },
  kiln(x, g, s, f) {
    limb(x - 7 * s, g - 40 * s, x - 12 * s, g, 8 * s, '#5a3a2a');
    limb(x + 7 * s, g - 40 * s, x + 12 * s, g, 8 * s, '#5a3a2a');
    put(`<path d="M ${x - 15 * s} ${g - 70 * s} q ${15 * s} ${8 * s} ${30 * s} 0 l ${-5 * s} ${32 * s} q ${-10 * s} ${5 * s} ${-20 * s} 0 Z" fill="#6b4230"/>`);
    put(`<ellipse cx="${x}" cy="${g - 80 * s}" rx="${10 * s}" ry="${11 * s}" fill="#6b4230"/>`);
    for (const [a, b, c, d] of [[-8, -60, 4, -44], [6, -66, -2, -50], [0, -44, 9, -30], [-10, -76, -3, -66]])
      limb(x + a * s, g + b * s, x + c * s, g + d * s, 2.2 * s, FIRE.low);
    limb(x + 15 * s * f, g - 62 * s, x + 30 * s * f, g - 40 * s, 5 * s, '#6b4230');
    pool(x, g, 40 * s, FIRE.low, 0.16);
  },
  drowned(x, g, s, f) {
    limb(x - 9 * s, g - 44 * s, x - 15 * s, g, 10 * s, BODY.wet);
    limb(x + 9 * s, g - 44 * s, x + 15 * s, g, 10 * s, BODY.wet);
    put(`<path d="M ${x - 19 * s} ${g - 74 * s} q ${19 * s} ${10 * s} ${38 * s} 0 l ${-6 * s} ${36 * s} q ${-13 * s} ${6 * s} ${-26 * s} 0 Z" fill="${BODY.wet}"/>`);
    // arms drifting as if still buoyed
    limb(x - 19 * s, g - 68 * s, x - 38 * s, g - 76 * s, 5 * s, BODY.wet);
    limb(x + 19 * s, g - 68 * s, x + 38 * s, g - 78 * s, 5 * s, BODY.wet);
    put(`<ellipse cx="${x}" cy="${g - 84 * s}" rx="${11 * s}" ry="${11 * s}" fill="${BODY.wet}"/>`);
    for (let i = -3; i <= 3; i++)
      limb(x + i * 3 * s, g - 92 * s, x + i * 5 * s, g - 106 * s - Math.abs(i) * 2 * s, 1.6 * s, BODY.rim);
  },
  chorister(x, g, s) {
    put(`<path d="M ${x - 18 * s} ${g} q ${5 * s} ${-54 * s} ${18 * s} ${-64 * s} q ${13 * s} ${10 * s} ${18 * s} ${64 * s} Z" fill="${BODY.dark}"/>`);
    put(`<ellipse cx="${x + 2 * s}" cy="${g - 74 * s}" rx="${10 * s}" ry="${12 * s}" fill="${BODY.mid}" transform="rotate(-24 ${x} ${g - 74 * s})"/>`);
    put(`<ellipse cx="${x + 5 * s}" cy="${g - 70 * s}" rx="${4 * s}" ry="${6 * s}" fill="#000" fill-opacity="0.75" transform="rotate(-24 ${x} ${g - 74 * s})"/>`);
    limb(x - 14 * s, g - 56 * s, x - 20 * s, g - 26 * s, 4.5 * s, BODY.mid);
    limb(x + 14 * s, g - 56 * s, x + 20 * s, g - 26 * s, 4.5 * s, BODY.mid);
    for (let i = 1; i <= 3; i++)
      put(`<path d="M ${x + 10 * s} ${g - 78 * s} q ${i * 16 * s} ${-i * 6 * s} ${i * 30 * s} ${-i * 2 * s}" fill="none" stroke="${BODY.rim}" stroke-width="${1.2 * s}" stroke-opacity="${0.5 / i}"/>`);
  },
  ironclad(x, g, s, f) {
    limb(x - 12 * s, g - 46 * s, x - 18 * s, g, 12 * s, '#39434f');
    limb(x + 12 * s, g - 46 * s, x + 18 * s, g, 12 * s, '#39434f');
    put(`<path d="M ${x - 24 * s} ${g - 80 * s} q ${24 * s} ${-8 * s} ${48 * s} 0 l ${-7 * s} ${42 * s} q ${-17 * s} ${7 * s} ${-34 * s} 0 Z" fill="#39434f"/>`);
    put(`<path d="M ${x - 24 * s} ${g - 80 * s} q ${24 * s} ${-8 * s} ${48 * s} 0" fill="none" stroke="${BODY.rim}" stroke-width="${2 * s}"/>`);
    put(`<path d="M ${x - 11 * s} ${g - 96 * s} q ${11 * s} ${-9 * s} ${22 * s} 0 l ${-2 * s} ${17 * s} l ${-18 * s} 0 Z" fill="#2b333d"/>`);
    limb(x + 24 * s * f, g - 74 * s, x + 40 * s * f, g - 40 * s, 7 * s, '#39434f');
  },
  wisp(x, g, s, f) {
    const y = g - 80 * s;
    for (let i = 6; i >= 1; i--)
      put(`<circle cx="${x - i * 13 * s * f}" cy="${y + i * 3 * s}" r="${(9 - i) * s}" fill="${FIRE.mid}" fill-opacity="${(0.1 * i).toFixed(2)}"/>`);
    put(`<circle cx="${x}" cy="${y}" r="${13 * s}" fill="${FIRE.low}" fill-opacity="0.35"/>`);
    put(`<circle cx="${x}" cy="${y}" r="${7 * s}" fill="${FIRE.mid}"/>`);
    put(`<circle cx="${x}" cy="${y}" r="${3.4 * s}" fill="#fff"/>`);
    pool(x, g, 46 * s, FIRE.mid, 0.13);
  },
  colossus(x, g, s, f) {
    const k = s * 1.7;
    limb(x - 18 * k, g - 60 * k, x - 26 * k, g, 15 * k, BODY.mid);
    limb(x + 18 * k, g - 60 * k, x + 26 * k, g, 15 * k, BODY.mid);
    put(`<path d="M ${x - 32 * k} ${g - 104 * k} q ${32 * k} ${-10 * k} ${64 * k} 0 l ${-9 * k} ${52 * k} q ${-23 * k} ${9 * k} ${-46 * k} 0 Z" fill="${BODY.dark}"/>`);
    put(`<ellipse cx="${x}" cy="${g - 112 * k}" rx="${10 * k}" ry="${9 * k}" fill="${BODY.dark}"/>`);
    limb(x + 32 * k * f, g - 96 * k, x + 52 * k * f, g - 40 * k, 10 * k, BODY.mid);
    limb(x - 32 * k * f, g - 96 * k, x - 46 * k * f, g - 44 * k, 10 * k, BODY.mid);
  },
  shade(x, g, s, f) {
    // Never re-coloured by the room. Nothing about a shade catches light.
    const sh = g - 74 * s;
    limb(x - 7 * s, g - 40 * s, x - 12 * s, g, 7 * s, '#0a0c10');
    limb(x + 7 * s, g - 40 * s, x + 12 * s, g, 7 * s, '#0a0c10');
    put(`<path d="M ${x - 15 * s} ${sh} q ${15 * s} ${8 * s} ${30 * s} 0 l ${-5 * s} ${36 * s} q ${-10 * s} ${5 * s} ${-20 * s} 0 Z" fill="#0a0c10"/>`);
    put(`<ellipse cx="${x}" cy="${sh - 11 * s}" rx="${9 * s}" ry="${11 * s}" fill="#0a0c10"/>`);
    limb(x + 15 * s * f, sh + 6 * s, x + 30 * s * f, sh + 20 * s, 5 * s, '#0a0c10');
    limb(x + 30 * s * f, sh + 20 * s, x + 58 * s * f, sh - 4 * s, 3 * s, '#39434f'); // your sword
    put(`<ellipse cx="${x}" cy="${g + 2 * s}" rx="${26 * s}" ry="${6 * s}" fill="#000" fill-opacity="0.5"/>`);
  },
};

/**
 * Where a family's eyes sit, in body units above the floor. Two lit points in
 * a dark silhouette do more for reading a creature than any amount of surface
 * detail, and they are the thing this sheet was most obviously missing.
 */
const EYES = {
  husk: { dy: -86, dx: 8, r: 1.4, colour: '#ffb24a' },
  hound: { dy: -41, dx: 42, r: 1.5, colour: '#ff7a2f' },
  crawler: { dy: -26, dx: 34, r: 1.8, colour: '#ffd27a' },
  acolyte: { dy: -72, dx: 0, r: 2.0, colour: '#9fe0ff' },
  knightling: { dy: -70, dx: 2, r: 1.7, colour: '#ffd27a' },
  ghoul: { dy: -68, dx: 3, r: 1.9, colour: '#b8ff9a' },
  stonemask: { dy: -74, dx: 0, r: 2.2, colour: '#ff6b52' },
  moth: { dy: -84, dx: 0, r: 1.6, colour: '#e6d5ff' },
  warder: { dy: -82, dx: 0, r: 1.8, colour: '#ffd27a' },
  kiln: { dy: -80, dx: 0, r: 2.3, colour: '#ffb24a' },
  drowned: { dy: -84, dx: 0, r: 2.0, colour: '#7fe0d0' },
  chorister: { dy: -74, dx: 4, r: 1.9, colour: '#ffe9a8' },
  ironclad: { dy: -90, dx: 0, r: 1.8, colour: '#ff6b52' },
  wisp: null,
  colossus: { dy: -112, dx: 0, r: 2.6, colour: '#ff8a5c' },
  shade: { dy: -85, dx: 0, r: 2.0, colour: '#cfe0ee' },
};

function eyes(family, x, floorY, s, f) {
  const e = EYES[family];
  if (!e) return;
  const ex = x + e.dx * s * (f < 0 ? 1 : -1);
  const ey = floorY + e.dy * s;
  // the recess they sit in, so they read as inside a face and not stuck on it
  put(
    `<ellipse cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" rx="${(9 * s).toFixed(1)}" ry="${(5 * s).toFixed(1)}" fill="#05070a" fill-opacity="0.85"/>`,
  );
  for (const off of [-3.2, 3.2]) {
    put(`<circle cx="${(ex + off * s).toFixed(1)}" cy="${ey.toFixed(1)}" r="${(e.r * s * 2.2).toFixed(1)}" fill="${e.colour}" fill-opacity="0.22"/>`);
    put(`<circle cx="${(ex + off * s).toFixed(1)}" cy="${ey.toFixed(1)}" r="${(e.r * s).toFixed(1)}" fill="${e.colour}"/>`);
  }
}

/** Draw one concrete foe: family shape, then whatever it is carrying. */
function creature(id, x, floorY, scale, facing, room, lightX, roomLight) {
  const foe = FOES[id];
  const draw = CREATURE[foe.family];
  if (!draw) return;
  const s = scale * (foe.family === 'colossus' ? 0.85 : 1);
  // Rim light, done the cheap way that actually works: draw the whole
  // silhouette once in the light's colour, shifted two pixels towards the
  // light, then draw the real one on top. What is left showing is an edge.
  if (lightX !== null && lightX !== undefined) {
    const toward = Math.sign(lightX - x) || -1;
    const keep = { ...BODY };
    // In a warm room the rim runs cold and in a cold room it runs warm. A rim
    // the same temperature as the room does not separate anything.
    const warmRoom = roomLight === 'warm' || roomLight === 'gold';
    const rimCol = warmRoom ? SHADOW[roomLight] : RIM[roomLight] || '#8ab4e0';
    Object.assign(BODY, { dark: rimCol, mid: rimCol, rim: rimCol, wet: rimCol });
    put(`<g opacity="0.34">`);
    draw(x + toward * PX / 2, floorY, s, facing);
    put(`</g>`);
    Object.assign(BODY, keep);
    // and the side that turns away from it
    Object.assign(BODY, { dark: '#05070a', mid: '#05070a', rim: '#05070a', wet: '#05070a' });
    put(`<g opacity="0.3">`);
    draw(x - toward * PX / 2, floorY, s, facing);
    put(`</g>`);
    Object.assign(BODY, keep);
  }
  // A generous box around the silhouette: tall families reach ~110 units up,
  // low ones spread ~50 wide either side. The gate measures inside this and
  // in a ring just outside it.
  marks.push({
    room: room.id,
    foe: id,
    family: foe.family,
    box: {
      x: Math.round(x - 60 * s),
      y: Math.round(floorY - 120 * s),
      w: Math.round(120 * s),
      h: Math.round(124 * s),
    },
  });
  draw(x, floorY, s, facing);
  const carry = id.slice(foe.family.length);
  const sh = floorY - 60 * s;
  if (carry === '-torch') {
    torch(x + 16 * s * facing, sh + 20 * s, s, facing);
    put(`<ellipse cx="${(x + 16 * s * facing).toFixed(1)}" cy="${(sh - 20 * s).toFixed(1)}" rx="${(90 * s).toFixed(1)}" ry="${(80 * s).toFixed(1)}" fill="url(#glow)"/>`);
    pool(x, floorY, 78 * s, FIRE.mid, 0.14);
  }
  eyes(foe.family, x, floorY, s, facing);
  if (carry === '-spear') spear(x, sh + 14 * s, s, facing);
  if (carry === '-heavy') shield(x, sh + 8 * s, s, facing);
}

// --- staging --------------------------------------------------------------
// Where things stand is `layout`, which the writing already decided. A ring
// surrounds you, an ambush puts one in front and the rest behind you, a pack
// arrives together. Reading it off the data means the picture cannot disagree
// with the room.
function positions(layout, n, x, w) {
  const out = [];
  if (layout === 'single' || n === 1) {
    out.push({ x: x + w * 0.63, s: 1, f: -1 });
  } else if (layout === 'spread') {
    for (let i = 0; i < n; i++) out.push({ x: x + w * (0.3 + (i * 0.5) / Math.max(1, n - 1)), s: 1 - i * 0.06, f: -1 });
  } else if (layout === 'pack') {
    for (let i = 0; i < n; i++) out.push({ x: x + w * 0.58 + (i - (n - 1) / 2) * 132, s: 0.94 + (i % 2) * 0.12, f: -1 });
  } else if (layout === 'ring') {
    for (let i = 0; i < n; i++) {
      const a = -0.5 + (i / Math.max(1, n - 1)) * 1.0;
      out.push({ x: x + w * 0.58 + Math.sin(a) * w * 0.3, s: 1 - Math.abs(a) * 0.18, f: Math.sin(a) > 0 ? -1 : 1 });
    }
  } else {
    // ambush: one in the open, the rest waiting behind the entrance
    out.push({ x: x + w * 0.55, s: 1, f: -1 });
    for (let i = 1; i < n; i++) out.push({ x: x + w * (0.12 + i * 0.06), s: 0.82, f: 1 });
  }
  return out;
}

// --- one panel ------------------------------------------------------------
function panel(room, y) {
  const p = LIGHT[room.light] || LIGHT.dim;
  const rng = rngFor(room.id);
  const x = 40;
  const w = W - 80;
  const h = PANEL - 66;

  put(`<g>`);
  put(`<clipPath id="clip-${room.id.replace(':', '-')}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/></clipPath>`);
  put(`<g clip-path="url(#clip-${room.id.replace(':', '-')})">`);

  const arch = ARCH[room.kind] || hall;
  const floorY = arch(x, y, w, h, p, rng, ACCENT[room.light] || ACCENT.dim, SHADOW[room.light] || SHADOW.dim);
  texture(x, y, w, h, p, rng, floorY, ACCENT[room.light] || ACCENT.dim, SHADOW[room.light] || SHADOW.dim);
  // everything above is distance, and distance is hazy
  haze(x, y, w, h, room, floorY);

  const prop = PROPS[room.key];
  if (prop) prop(x, w, floorY, p, rngFor(`${room.id}-props`));

  if (room.kind === 'bonfire') {
    bonfire(x + w * 0.34, floorY, 1.25, rng);
    pool(x + w * 0.34, floorY, 210, FIRE.mid, 0.16);
    pool(x + w * 0.34, floorY, 120, FIRE.core, 0.1);
  }

  const skin = bodyFor(room.light);
  Object.assign(BODY, skin);
  const lightX = lightAt(room, x, w);
  const spots = positions(room.layout, room.foes.length, x, w);
  room.foes.forEach((id, i) => {
    const at = spots[i] || spots[spots.length - 1];
    halo(at.x, floorY, at.s * 1.12, skin.up);
    creature(id, at.x, floorY, at.s * 1.12, at.f, room, lightX, room.light);
  });

  if (room.boss) {
    const b = BESTIARY[room.boss];
    put(`<text x="${x + w / 2}" y="${floorY - 128}" text-anchor="middle" font-family="Georgia,serif" font-size="21" fill="#cfe0ee" fill-opacity="0.5" letter-spacing="5">${esc(b.name.vi.toUpperCase())}</text>`);
  }

  shaft(room, x, y, w, floorY, RIM[room.light] || '#8ab4e0', rngFor(`${room.id}-shaft`));
  motes(x, y, w, h, rngFor(`${room.id}-air`), RIM[room.light] || '#8ab4e0');
  grain(x, y, w, h, rngFor(`${room.id}-grain`));
  {
    // the soffit of an arch we are standing under, cropped by the frame
    const fr = rngFor(`${room.id}-soffit`);
    const dip = 40 + fr() * 40;
    put(
      `<path d="M ${x} ${y} L ${x + w} ${y} L ${x + w} ${(y + dip * 0.5).toFixed(1)} Q ${(x + w / 2).toFixed(1)} ${(y + dip * 1.9).toFixed(1)} ${x} ${(y + dip * 0.5).toFixed(1)} Z" fill="#05070a" fill-opacity="0.95"/>`,
    );
  }
  foreground(x, y, w, h, rngFor(`${room.id}-fg`));
  // vignette, so the eye lands in the middle of the room
  put(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#vig)"/>`);
  put(`</g>`);
  put(`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="none" stroke="${p.edge}" stroke-width="1.5" stroke-opacity="0.8"/>`);

  // --- the label block, outside the picture
  const ty = y + h + 24;
  put(`<text x="${x}" y="${ty}" font-family="Georgia,serif" font-size="21" fill="#e8dcc8">${esc(room.name.vi)}</text>`);
  const vw = room.name.vi.length * 11 + 16;
  put(`<text x="${x + vw}" y="${ty}" font-family="Georgia,serif" font-size="14" fill="#8b98a6">${esc(room.name.en)}</text>`);
  put(`<text x="${x + w}" y="${ty}" text-anchor="end" font-family="ui-monospace,monospace" font-size="12" fill="#5f6b78">${esc(room.id)} · ${esc(room.kind)} · ${esc(room.light)} · ${esc(room.layout)}</text>`);
  put(`<text x="${x}" y="${ty + 21}" font-family="Georgia,serif" font-size="14.5" fill="#a9b6c4">${esc(room.line.vi)}</text>`);
  if (room.note) {
    put(`<text x="${x + w}" y="${ty + 21}" text-anchor="end" font-family="Georgia,serif" font-size="12" fill="#6a7684" font-style="italic">${esc(room.note)}</text>`);
  }
  put(`</g>`);
}

// --- the sheet ------------------------------------------------------------
export function drawArea(areaId) {
  const spot = AREAS.find((a) => a.id === areaId);
  if (!spot) throw new Error(`no area called ${areaId}`);
  const rooms = ROOMS.filter((r) => r.area === areaId);
  const H = HEAD + rooms.length * PANEL + 40;

  parts.length = 0;
  marks.length = 0;
  put(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Georgia,serif">`);
  put(`<defs>
    <radialGradient id="ember" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffb24a" stop-opacity="0.55"/>
      <stop offset="45%" stop-color="#ff7a2f" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#c03c14" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffb24a" stop-opacity="0.34"/>
      <stop offset="60%" stop-color="#ff7a2f" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#ff7a2f" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="haloD" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#05080c" stop-opacity="0.34"/>
      <stop offset="55%" stop-color="#05080c" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#05080c" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="haloL" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#000" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vig" cx="50%" cy="52%" r="72%">
      <stop offset="55%" stop-color="#000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.62"/>
    </radialGradient>
  </defs>`);
  put(`<rect width="${W}" height="${H}" fill="#0a0c10"/>`);

  put(`<text x="40" y="62" font-family="Georgia,serif" font-size="34" fill="#e8dcc8" letter-spacing="2">${esc(areaId.toUpperCase())}</text>`);
  put(`<text x="40" y="92" font-family="Georgia,serif" font-size="15" fill="#8b98a6">${rooms.length} phòng · tier ${spot.tier}${spot.boss ? ` · boss: ${esc(BESTIARY[spot.boss].name.vi)}` : ''}${spot.fold ? ` · lối tắt về ${esc(spot.fold)}` : ''}</text>`);
  const kinds = [...new Set(rooms.flatMap((r) => r.foes))].map((id) => LORE[FOES[id].family].name.vi);
  put(`<text x="40" y="116" font-family="Georgia,serif" font-size="13" fill="#6a7684">${esc([...new Set(kinds)].join(' · '))}</text>`);
  put(`<line x1="40" y1="132" x2="${W - 40}" y2="132" stroke="#2c3a4a" stroke-width="1"/>`);

  rooms.forEach((room, i) => panel(room, HEAD + i * PANEL));
  put(`</svg>`);

  mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });
  const out = new URL(`../dist/area-${areaId}.svg`, import.meta.url);
  writeFileSync(out, parts.join('\n'));
  writeFileSync(
    new URL(`../dist/area-${areaId}.marks.json`, import.meta.url),
    JSON.stringify(marks, null, 2),
  );
  return { file: out.pathname, rooms: rooms.length, height: H, figures: marks.length };
}

const asked = process.argv[2];
if (asked) {
  const r = drawArea(asked);
  console.log(`${asked}: ${r.rooms} rooms -> ${r.file} (${W}x${r.height})`);
}
