// Hand-drawn. Written from nothing after the old renderer was deleted.
//
// The old one was vector/flat by construction — rectangles, perfect arcs, solid
// fills — and that is a named art style whose description is "clean shapes,
// solid colours, minimal texture and shading". It is also, word for word, the
// description of what kept reading as empty. No amount of detail fixes being
// in the wrong style; Dead Cells and Hollow Knight are not better vector art,
// they are a different thing entirely.
//
// So there is no rectangle in this file and no perfect curve. Everything is
// built from three primitives:
//
//   wobble()  every point drifts, so no edge is ever mechanical
//   mass()    an irregular filled shape carrying its own varying ink contour
//   hatch()   shading by strokes, the way a hand shades, not by opacity
//
// And it is built in the order the workflow actually uses: value groups first,
// then light, then detail — not detail first with the values patched in after,
// which is what every previous pass did.

import { mkdirSync, writeFileSync } from 'node:fs';
import { AREAS, FOES, ROOMS } from '../src/world.js';
import { LORE } from '../src/lore.js';
import { BESTIARY } from '../src/bosses.js';

const W = 1240;
const PANEL = 760;
const HEAD = 150;
const M = 40;
const ART = PANEL - 66;

// --- seeded noise ---------------------------------------------------------
function rngFor(seed) {
  let h = 2166136261;
  for (const ch of String(seed)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const out = [];
const put = (s) => out.push(s);
const n = (v) => Number(v).toFixed(1);

// --- the three primitives -------------------------------------------------

/** Every point drifts. This is the whole difference between drawn and plotted. */
const wobble = (pts, amt, rng) =>
  pts.map(([x, y]) => [x + (rng() - 0.5) * amt, y + (rng() - 0.5) * amt]);

/** Points -> a path that curves through them rather than cornering at them. */
function through(pts, close = true) {
  let d = `M ${n(pts[0][0])} ${n(pts[0][1])}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1];
    const [cx, cy] = pts[i];
    d += ` Q ${n((px + cx) / 2)} ${n((py + cy) / 2)} ${n(cx)} ${n(cy)}`;
  }
  return close ? `${d} Z` : d;
}

// --- form: the one thing every previous version of this file was missing ----
// A flat fill is a silhouette. What makes a shape read as solid is that the
// side facing the light is a different colour from the side that is not — and
// not merely a lighter one: the shadow shifts away from the light's hue and
// the lit side shifts toward it. That is hue shifting, and doing it inside the
// fill primitive means every stone in the room obeys the same lamp for free.
const rgbOf = (hex) => [
  parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16),
];
const hexOf = (c) =>
  `#${c.map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('')}`;
/** Into shadow: down, and cooler — blue survives the fall better than red. */
const darker = (hex, k) => {
  const [r, g, b] = rgbOf(hex);
  return hexOf([r * (1 - k), g * (1 - k * 0.9), b * (1 - k * 0.66)]);
};
/** Into light: up, and warmer, because the only lamp in this game is a fire. */
const lighter = (hex, k) => {
  const [r, g, b] = rgbOf(hex);
  return hexOf([r + (255 - r) * k, g + (255 - g) * k * 0.82, b + (255 - b) * k * 0.5]);
};

/** Where the light in this panel is standing. Set once per room. */
let LIGHT = { x: 0, y: 0 };
let gradN = 0;

/**
 * A mass: a fill that is lit from the room's own light source, plus a contour
 * drawn in several short overlapping strokes of varying width, which is what a
 * pen actually leaves behind and what a single even-width outline never does.
 */
function mass(pts, fill, ink, rng, { inkWidth = 3, opacity = 1, contour = true, form = true } = {}) {
  const shape = wobble(pts, 5, rng);
  let paint = fill;
  let x0 = Infinity; let y0 = Infinity; let x1 = -Infinity; let y1 = -Infinity;
  for (const [px, py] of shape) {
    if (px < x0) x0 = px; if (px > x1) x1 = px;
    if (py < y0) y0 = py; if (py > y1) y1 = py;
  }
  const big = x1 - x0 > 34 || y1 - y0 > 34;
  if (form && big) {
    // the gradient runs from the light, through the shape, and out the far side
    const cx0 = (x0 + x1) / 2;
    const cy0 = (y0 + y1) / 2;
    let vx = cx0 - LIGHT.x;
    let vy = cy0 - LIGHT.y;
    const len = Math.hypot(vx, vy) || 1;
    vx /= len; vy /= len;
    const r = Math.hypot(x1 - x0, y1 - y0) / 2 || 1;
    const id = `f${gradN++}`;
    put(
      `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${n(cx0 - vx * r)}" y1="${n(cy0 - vy * r)}" x2="${n(cx0 + vx * r)}" y2="${n(cy0 + vy * r)}">` +
        `<stop offset="0" stop-color="${lighter(fill, 0.32)}"/>` +
        `<stop offset="0.5" stop-color="${fill}"/>` +
        `<stop offset="1" stop-color="${darker(fill, 0.34)}"/>` +
      `</linearGradient>`,
    );
    paint = `url(#${id})`;
  }
  put(`<path d="${through(shape)}" fill="${paint}" fill-opacity="${opacity}"/>`);
  if (!contour) return;
  for (let i = 1; i < shape.length; i++) {
    if (rng() < 0.18) continue; // a hand lifts off; the line breaks
    const a = shape[i - 1];
    const b = shape[i];
    put(
      `<path d="${through([a, b], false)}" fill="none" stroke="${ink}" stroke-width="${n(inkWidth * (0.5 + rng()))}" stroke-opacity="${n(0.45 + rng() * 0.5)}" stroke-linecap="round"/>`,
    );
  }
}

/** Shading by strokes. Opacity washes are how a program shades; this is not. */
function hatch(x, y, w, h, ink, rng, density = 26, angle = 0.6) {
  for (let i = 0; i < density; i++) {
    const sx = x + rng() * w;
    const sy = y + rng() * h;
    const len = 14 + rng() * 60;
    put(
      `<path d="M ${n(sx)} ${n(sy)} q ${n(len * 0.5)} ${n((rng() - 0.5) * 10)} ${n(Math.cos(angle) * len)} ${n(Math.sin(angle) * len)}" fill="none" stroke="${ink}" stroke-width="${n(0.8 + rng() * 1.8)}" stroke-opacity="${n(0.06 + rng() * 0.16)}" stroke-linecap="round"/>`,
    );
  }
}

// --- palette: hue-shifted ramps, kept from the old file because it worked ---
const hsl = (hh, s2, l) => {
  hh = ((hh % 360) + 360) % 360;
  const a = s2 * Math.min(l, 1 - l);
  const f = (k0) => {
    const k = (k0 + hh / 30) % 12;
    const c = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(255 * c).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};
/** Hue lerp the short way round. Going 246 to 30 the long way passes through
 *  150, which is green, and that is exactly what turned the ash pit's walls
 *  teal the moment the warm rooms were given a cool base. */
const lerpHue = (a, b, t) => {
  let d = ((b - a + 540) % 360) - 180;
  return a + d * t;
};
const ramp = (base, light, lo, hi, t) => {
  const away = base + (base < light ? -40 : 40);
  const hue =
    t < 0.5 ? lerpHue(away, base, t / 0.5) : lerpHue(base, light, ((t - 0.5) / 0.5) * 0.8);
  // Saturation belongs to the light, not to the room. The dark end of the ramp
  // is nearly neutral; colour arrives as the value comes up. The previous curve
  // peaked at 0.66 in the midtones and that is exactly what turned the ash pit
  // into a nightclub — a saturated dominant leaves the accent nothing to be.
  const sat = 0.09 + 0.28 * Math.min(1, Math.max(0, t));
  return hsl(hue, sat, lo + (hi - lo) * t);
};
const MOOD = {
  dark: { base: 216, light: 194, lo: 0.05, hi: 0.5 },
  dim: { base: 220, light: 200, lo: 0.06, hi: 0.55 },
  grey: { base: 205, light: 188, lo: 0.1, hi: 0.62 },
  pale: { base: 198, light: 178, lo: 0.14, hi: 0.72 },
  // A fire room is still a cold room. The warmth is the fire's own gradient and
  // the accent props, laid over a cool ramp — never mixed into the ramp itself.
  // Lerping the ramp toward the flame's hue put 214 and 34 exactly 180 apart,
  // which has no short way round, so it went through green and painted the ash
  // pit the colour of a swimming pool.
  warm: { base: 216, light: 196, lo: 0.06, hi: 0.5 },
  gold: { base: 210, light: 192, lo: 0.08, hi: 0.54 },
};
const P = {};
for (const [k, m] of Object.entries(MOOD)) {
  const r = (t) => ramp(m.base, m.light, m.lo, m.hi, t);
  P[k] = {
    // four value groups, declared as groups rather than discovered later
    near: r(0.04),
    dark: r(0.2),
    mid: r(0.42),
    far: r(0.72),
    lit: r(0.93),
    ink: r(0.02),
    // one warm accent, per the sheet. Rust and old rope, not a colour wheel's
    // opposite — the complement of a slate blue is a bright orange nobody paints.
    accent: hsl(28, 0.34, Math.min(0.52, m.hi * 0.86)),
  };
}
const FIRE = { core: '#fff6d8', mid: '#ffb04a', low: '#f2702a', deep: '#a8300f' };

// --- the room, built in value groups --------------------------------------

/** A ragged horizon: the far group, drawn as one shape and left alone. */
function distance(x, y, w, h, p, rng, floorY, kind) {
  const pts = [[x, floorY]];
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    pts.push([x + t * w, y + h * 0.24 + Math.sin(t * 5.2) * 46 + rng() * 40]);
  }
  pts.push([x + w, floorY]);
  mass(pts, p.far, p.far, rng, { contour: false });
  hatch(x, y + h * 0.2, w, h * 0.35, p.mid, rng, 40, 1.1);

  // A cave's distance is more cave. A fog room's distance is the fog. Neither
  // gets the skyline of standing towers that a built area gets.
  if (kind === 'cave' || kind === 'fog') {
    for (let i = 0; i < 6; i++) {
      const cx = x + rng() * w;
      put(`<ellipse cx="${n(cx)}" cy="${n(y + h * (0.24 + rng() * 0.22))}" rx="${n(90 + rng() * 170)}" ry="${n(40 + rng() * 70)}" fill="${p.mid}" fill-opacity="${n(0.12 + rng() * 0.14)}"/>`);
    }
    return;
  }

  // shapes standing in it, softened by their own distance
  for (let i = 0; i < 5; i++) {
    const cx = x + 60 + rng() * (w - 120);
    const th = 120 + rng() * 220;
    const tw = 46 + rng() * 70;
    mass(
      [
        [cx - tw / 2, floorY],
        [cx - tw / 2 + rng() * 12, floorY - th * 0.5],
        [cx - tw * 0.2, floorY - th],
        [cx + tw * 0.2, floorY - th - rng() * 30],
        [cx + tw / 2, floorY - th * 0.4],
        [cx + tw / 2, floorY],
      ],
      p.mid,
      p.mid,
      rng,
      { opacity: 0.55, contour: false },
    );
  }
}

/** MIDGROUND · hall: a vault on piers. A building still trying to be one. */
function vault(x, y, w, h, p, rng, floorY) {
  // the vault, sagging, drawn as a mass and not as a curve
  const arch = [[x, y + h * 0.02]];
  for (let i = 0; i <= 14; i++) {
    const t = i / 14;
    arch.push([x + t * w, y + h * 0.15 - Math.sin(t * Math.PI) * h * 0.1 + (rng() - 0.5) * 18]);
  }
  arch.push([x + w, y]);
  mass(arch, p.dark, p.ink, rng, { inkWidth: 4 });

  // piers: leaning, swelling, chewed
  const cols = [0.13 + rng() * 0.08, 0.46 + rng() * 0.1, 0.82 + rng() * 0.07];
  for (const f of cols) {
    const cx = x + w * f;
    const broken = rng() < 0.4;
    const topY = broken ? floorY - 120 - rng() * 220 : y + h * 0.14;
    const left = [];
    const right = [];
    for (let k = 0; k <= 7; k++) {
      const t = k / 7;
      const yy = topY + (floorY - topY) * t;
      const swell = 20 + Math.sin(t * Math.PI) * 8 + rng() * 6;
      left.push([cx - swell, yy]);
      right.unshift([cx + swell + (rng() - 0.5) * 8, yy]);
    }
    mass([...left, ...right], p.mid, p.ink, rng, { inkWidth: 3.4 });
    hatch(cx - 26, topY, 52, floorY - topY, p.ink, rng, 22, 1.4);
  }

  // the wall behind, hatched rather than tiled
  hatch(x, y + h * 0.2, w, floorY - y - h * 0.2, p.ink, rng, 90, 1.45);
  hatch(x, y + h * 0.3, w, floorY - y - h * 0.3, p.near, rng, 40, 0.4);
}

/** MIDGROUND · bonfire: not a hall. A corner that stayed up, and the rubble
 *  of everything that did not. You rest here because the roof is gone and you
 *  can see what is coming. */
function shelter(x, y, w, h, p, rng, floorY) {
  const brk = x + w * (0.56 + rng() * 0.12);
  const top = [[x, y]];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    top.push([x + t * (brk - x), y + h * (0.17 + t * 0.07) + (rng() - 0.5) * 20]);
  }
  let fy = y + h * 0.24;
  for (let k = 0; k < 6; k++) {
    fy += (floorY - fy) * 0.34;
    top.push([brk + (rng() - 0.5) * 46 + k * 8, fy]);
  }
  top.push([brk + 40, y]);
  mass(top, p.dark, p.ink, rng, { inkWidth: 4 });
  hatch(x, y + h * 0.2, brk - x, floorY - y - h * 0.2, p.ink, rng, 54, 1.4);

  // the bank of fallen stone under the break
  mass(
    [[brk - 110, floorY], [brk - 40, floorY - 54 - rng() * 40], [brk + 40, floorY - 92 - rng() * 46],
     [brk + 150, floorY - 34], [brk + 220, floorY]],
    p.mid, p.ink, rng, { inkWidth: 3.2 },
  );
  for (let i = 0; i < 9; i++) {
    const bx = brk - 90 + rng() * 280;
    mass([[bx, floorY], [bx + 16 + rng() * 26, floorY - 12 - rng() * 34], [bx + 40, floorY - 4]],
         p.mid, p.ink, rng, { inkWidth: 2.4, opacity: 0.9 });
  }

  // one pier still standing, half buried in its own building
  const cx = x + w * (0.14 + rng() * 0.06);
  mass([[cx - 26, floorY], [cx - 21, floorY - 150], [cx - 27, floorY - 232],
        [cx + 23, floorY - 238], [cx + 19, floorY - 140], [cx + 26, floorY]],
       p.mid, p.ink, rng, { inkWidth: 3.4 });
  hatch(cx - 27, floorY - 238, 53, 238, p.ink, rng, 20, 1.4);
}

/** MIDGROUND · bridge: a barrel-vaulted cut, going back in rings. Water runs
 *  down the middle of it, and in one room in this game it runs the wrong way. */
function channel(x, y, w, h, p, rng, floorY) {
  const cx = x + w * (0.48 + (rng() - 0.5) * 0.1);
  // the side walls above the mouth, in courses
  hatch(x, y + h * 0.06, w, floorY - y - h * 0.06, p.ink, rng, 74, 1.45);
  for (let i = 0; i < 6; i++) {
    const cy = y + h * 0.1 + i * h * 0.1;
    put(`<path d="${through([[x, cy], [x + w, cy + (rng() - 0.5) * 12]], false)}" fill="none" stroke="${p.ink}" stroke-width="2.4" stroke-opacity="0.5"/>`);
  }
  // the mouth: nested round arches, each one further away and darker
  for (let r = 0; r < 5; r++) {
    const k = 1 - r * 0.15;
    const aw = w * 0.3 * k;
    const ah = h * 0.46 * k;
    const pts = [[cx - aw, floorY + 20]];
    for (let i = 0; i <= 12; i++) {
      const t = i / 12;
      pts.push([cx - aw + t * 2 * aw, floorY + 20 - Math.sin(t * Math.PI) * ah + (rng() - 0.5) * 8]);
    }
    pts.push([cx + aw, floorY + 20]);
    mass(pts, r === 0 ? p.mid : r === 4 ? p.ink : p.dark, p.ink, rng, { inkWidth: r === 0 ? 3.6 : 2.2 });
  }
  // the voussoirs of the near arch, so it reads as built and not as a hole
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    const aw = w * 0.3;
    const ah = h * 0.46;
    const bx = cx - aw + t * 2 * aw;
    const by = floorY + 20 - Math.sin(t * Math.PI) * ah;
    put(`<path d="${through([[bx, by], [bx + (bx - cx) * 0.08, by - 22 + Math.abs(bx - cx) * 0.03]], false)}" fill="none" stroke="${p.ink}" stroke-width="3" stroke-opacity="0.7"/>`);
  }
}

/** MIDGROUND · cave: no masonry anywhere. Nobody built this. */
function rock(x, y, w, h, p, rng, floorY) {
  const lip = y + h * 0.2;
  const ceil = [[x, y]];
  for (let i = 0; i <= 16; i++) {
    const t = i / 16;
    ceil.push([x + t * w, lip + Math.sin(t * 7.3) * 34 + rng() * 46]);
  }
  ceil.push([x + w, y]);
  mass(ceil, p.dark, p.ink, rng, { inkWidth: 4 });
  // teeth down
  for (let i = 0; i < 15; i++) {
    const sx = x + rng() * w;
    const L = 26 + rng() * 130;
    const t2 = 9 + rng() * 22;
    mass([[sx - t2, lip + 10], [sx - t2 * 0.3, lip + 10 + L * 0.6], [sx, lip + 10 + L],
          [sx + t2 * 0.4, lip + 10 + L * 0.5], [sx + t2, lip + 6]],
         p.dark, p.ink, rng, { inkWidth: 2.4 });
  }
  // walls closing in as lobes, both sides
  for (const side of [-1, 1]) {
    const ex = side < 0 ? x : x + w;
    const pts = [[ex, y]];
    for (let i = 0; i <= 7; i++) {
      const t = i / 7;
      pts.push([ex - side * (60 + Math.sin(t * 4.2) * 70 + rng() * 40), lip + t * (floorY - lip)]);
    }
    pts.push([ex, floorY + 20]);
    mass(pts, p.mid, p.ink, rng, { inkWidth: 3.4, opacity: 0.92 });
  }
  // hatching that follows the rock instead of standing up straight
  hatch(x, lip, w, floorY - lip, p.ink, rng, 60, 0.25);
  hatch(x, lip + 40, w, floorY - lip - 40, p.near, rng, 26, -0.4);
  // teeth up
  for (let i = 0; i < 9; i++) {
    const sx = x + rng() * w;
    const L = 20 + rng() * 70;
    mass([[sx - 16, floorY + 6], [sx - 5, floorY - L * 0.6], [sx + 2, floorY - L],
          [sx + 10, floorY - L * 0.4], [sx + 18, floorY + 6]],
         p.mid, p.ink, rng, { inkWidth: 2.4 });
  }
}

/** MIDGROUND · stair: a flight with the middle of it gone. */
function flight(x, y, w, h, p, rng, floorY) {
  hatch(x, y + h * 0.08, w, floorY - y, p.ink, rng, 80, 1.45);
  // the vault over it, following the slope
  const rake = [[x, y]];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    rake.push([x + t * w, y + h * (0.3 - t * 0.2) + (rng() - 0.5) * 18]);
  }
  rake.push([x + w, y]);
  mass(rake, p.dark, p.ink, rng, { inkWidth: 4 });

  const N = 13;
  const gapFrom = 4 + Math.floor(rng() * 3);
  const gapTo = gapFrom + 2 + Math.floor(rng() * 2);
  const sw = (w * 0.86) / N;
  const rise = (h * 0.34) / N;
  for (let i = 0; i < N; i++) {
    const sx = x + w * 0.07 + i * sw;
    const sy = floorY + h * 0.04 - i * rise;
    if (i >= gapFrom && i <= gapTo) {
      // what is left of the tread: the stringer's stub
      mass([[sx, sy + rise], [sx + sw * 0.3, sy + rise + 6], [sx + sw * 0.24, sy + rise + 26], [sx - 4, sy + rise + 20]],
           p.ink, p.ink, rng, { contour: false });
      continue;
    }
    // the riser: the face you would walk into, turned away from any light
    mass([[sx, sy + 6], [sx + sw * 1.18, sy + 3], [sx + sw * 1.18, sy + rise + 14], [sx, sy + rise + 16]],
         p.dark, p.ink, rng, { inkWidth: 3 });
    // the tread: the face you would stand on, and the only one that catches it
    mass([[sx - 6, sy + 6], [sx + sw * 1.24, sy + 2], [sx + sw * 1.18, sy - 8], [sx - 2, sy - 4]],
         p.mid, p.ink, rng, { inkWidth: 2.6 });
    put(`<path d="${through([[sx - 2, sy - 3], [sx + sw * 1.18, sy - 7]], false)}" fill="none" stroke="${p.lit}" stroke-width="2" stroke-opacity="0.3"/>`);
  }
  // the drop the gap opens onto: a ragged bite, not a rectangle
  const gx0 = x + w * 0.07 + gapFrom * sw;
  const gx1 = x + w * 0.07 + (gapTo + 1) * sw;
  const bite = [[gx0, floorY + h * 0.04 - gapFrom * rise + rise]];
  for (let i = 1; i <= 6; i++) {
    const t = i / 6;
    bite.push([gx0 + t * (gx1 - gx0), floorY + h * 0.04 - (gapFrom + t * (gapTo - gapFrom)) * rise + rise + (rng() - 0.5) * 26]);
  }
  bite.push([gx1 + 10, y + h], [gx0 - 10, y + h]);
  mass(bite, p.ink, p.ink, rng, { contour: false, form: false });
}

/** MIDGROUND · yard: no roof. The frame's top half is weather. */
function openYard(x, y, w, h, p, rng, floorY) {
  const wallTop = y + h * (0.34 + rng() * 0.08);
  const line = [[x, wallTop]];
  for (let i = 0; i <= 14; i++) {
    const t = i / 14;
    const merlon = Math.floor(t * 9) % 2 ? -22 : 0;
    line.push([x + t * w, wallTop + merlon + (rng() - 0.5) * 16]);
  }
  line.push([x + w, floorY + 20], [x, floorY + 20]);
  mass(line, p.dark, p.ink, rng, { inkWidth: 4 });
  hatch(x, wallTop, w, floorY - wallTop, p.ink, rng, 70, 1.45);
  for (let i = 0; i < 5; i++) {
    const cy = wallTop + 30 + i * (floorY - wallTop) / 5;
    put(`<path d="${through([[x, cy], [x + w, cy + (rng() - 0.5) * 14]], false)}" fill="none" stroke="${p.ink}" stroke-width="2.2" stroke-opacity="0.45"/>`);
  }
  // the sky, such as it is: bands, no stars
  for (let i = 0; i < 7; i++)
    put(`<ellipse cx="${n(x + rng() * w)}" cy="${n(y + rng() * (wallTop - y))}" rx="${n(120 + rng() * 200)}" ry="${n(14 + rng() * 26)}" fill="${p.mid}" fill-opacity="${n(0.06 + rng() * 0.1)}"/>`);
}

/** MIDGROUND · fog: the building is in there. You get about nine metres of it. */
function veil(x, y, w, h, p, rng, floorY) {
  for (let i = 0; i < 6; i++) {
    const cx = x + 80 + rng() * (w - 160);
    const fade = 0.34 - i * 0.04;
    mass([[cx - 26, floorY], [cx - 22, y + h * 0.2], [cx + 22, y + h * 0.2], [cx + 26, floorY]],
         p.mid, p.mid, rng, { opacity: Math.max(0.08, fade), contour: false });
  }
  for (let i = 0; i < 9; i++)
    put(`<ellipse cx="${n(x + rng() * w)}" cy="${n(y + h * 0.3 + rng() * h * 0.5)}" rx="${n(180 + rng() * 240)}" ry="${n(40 + rng() * 60)}" fill="${p.near}" fill-opacity="${n(0.05 + rng() * 0.07)}"/>`);
}

export const ARCH = { hall: vault, bonfire: shelter, bridge: channel, cave: rock, stair: flight, yard: openYard, fog: veil };
function architecture(room, x, y, w, h, p, rng, floorY) {
  (ARCH[room.kind] || vault)(x, y, w, h, p, rng, floorY);
}

/** The floor: broken, and the near group starts here. */
function ground(x, y, w, h, p, rng, floorY, kind) {
  // A drain has two ledges and a cut between them; a stair has no floor at all,
  // only the treads the flight already drew.
  if (kind === 'bridge') {
    for (const side of [-1, 1]) {
      const ex = side < 0 ? x : x + w;
      mass([[ex, floorY - 6], [ex - side * w * 0.34, floorY + 4], [ex - side * w * 0.3, y + h], [ex, y + h]],
           p.dark, p.ink, rng, { inkWidth: 3.2 });
      hatch(Math.min(ex, ex - side * w * 0.34), floorY, w * 0.34, y + h - floorY, p.ink, rng, 30, 0.3);
    }
    return;
  }
  if (kind === 'stair') {
    hatch(x, floorY + 40, w, y + h - floorY - 40, p.ink, rng, 40, 0.3);
    return;
  }

  const line = [[x, floorY]];
  for (let i = 1; i <= 20; i++) {
    const t = i / 20;
    let yy = floorY + Math.sin(i * 1.7) * 5 + (rng() - 0.5) * 10;
    if (rng() < 0.18) yy += (rng() - 0.5) * 30;
    line.push([x + t * w, yy]);
  }
  mass([...line, [x + w, y + h], [x, y + h]], p.dark, p.ink, rng, { inkWidth: 3 });
  hatch(x, floorY, w, y + h - floorY, p.ink, rng, 70, 0.25);

  // things growing at the joint, drawn as leaves rather than strokes
  for (let i = 0; i < (kind === 'cave' ? 6 : 22); i++) {
    const gx = x + rng() * w;
    const gh = 10 + rng() * 30;
    mass(
      [
        [gx, floorY + 4],
        [gx - 4 - rng() * 5, floorY - gh * 0.6],
        [gx + (rng() - 0.5) * 10, floorY - gh],
        [gx + 4 + rng() * 5, floorY - gh * 0.5],
      ],
      p.accent,
      p.ink,
      rng,
      { opacity: 0.5, contour: false },
    );
  }
}

/** The near group: a mass across the front of the shot, nearly black. */
function nearMass(x, y, w, h, p, rng) {
  const side = rng() < 0.5 ? -1 : 1;
  const ex = side < 0 ? x : x + w;
  const reach = 150 + rng() * 130;
  const pts = [[ex, y]];
  for (let i = 0; i <= 8; i++) {
    const t = i / 8;
    pts.push([ex - side * (40 + Math.sin(t * 3.4) * reach * 0.5 + rng() * 40), y + t * h]);
  }
  pts.push([ex, y + h]);
  mass(pts, p.ink, p.ink, rng, { contour: false });

  // and a branch of it reaching across the top of the frame
  const arm = [[x, y]];
  for (let i = 0; i <= 8; i++) {
    const t = i / 8;
    arm.push([x + t * w, y + 20 + Math.sin(t * 4.1) * 34 + rng() * 20]);
  }
  arm.push([x + w, y]);
  mass(arm, p.ink, p.ink, rng, { opacity: 0.95, contour: false });
}

// --- the inhabitants, drawn the same way -----------------------------------
export const marks = [];

/**
 * One creature. Built from masses, not from limbs made of line segments — a
 * stroke of even width is the thing that made every previous figure look
 * assembled rather than drawn.
 */
function creature(id, x, g, s, f, p, rng, room) {
  const foe = FOES[id];
  const fam = foe.family;
  const ink = p.ink;
  const body = p.mid;

  marks.push({
    room: room.id,
    foe: id,
    family: fam,
    box: { x: Math.round(x - 58 * s), y: Math.round(g - 122 * s), w: Math.round(116 * s), h: Math.round(126 * s) },
  });

  if (fam === 'hound') {
    mass(
      [
        [x - 46 * s, g - 26 * s], [x - 20 * s, g - 44 * s], [x + 18 * s, g - 42 * s],
        [x + 40 * s, g - 30 * s], [x + 58 * s, g - 22 * s], [x + 44 * s, g - 8 * s],
        [x + 6 * s, g - 4 * s], [x - 40 * s, g - 8 * s],
      ],
      body, ink, rng, { inkWidth: 3.2 },
    );
    for (const lx of [-30, -12, 20, 36]) {
      mass([[x + lx * s, g - 20 * s], [x + (lx + 5) * s, g - 10 * s], [x + (lx + 3) * s, g], [x + (lx - 4) * s, g]], body, ink, rng, { inkWidth: 2.4 });
    }
    put(`<circle cx="${n(x + 44 * s)}" cy="${n(g - 30 * s)}" r="${n(3 * s)}" fill="${FIRE.low}"/>`);
    hatch(x - 40 * s, g - 44 * s, 90 * s, 40 * s, ink, rng, 12, 0.9);
    return;
  }

  // upright: a hooded, hollow thing
  const hip = g - 46 * s;
  const sh = g - 92 * s;
  mass([[x - 13 * s, hip], [x - 17 * s, g - 22 * s], [x - 14 * s, g], [x - 4 * s, g], [x - 3 * s, hip]], body, ink, rng, { inkWidth: 2.6 });
  mass([[x + 4 * s, hip], [x + 15 * s, g - 22 * s], [x + 18 * s, g], [x + 7 * s, g], [x + 3 * s, hip]], body, ink, rng, { inkWidth: 2.6 });
  mass(
    [
      [x - 16 * s, sh + 4 * s], [x - 20 * s, sh + 34 * s], [x - 14 * s, hip + 6 * s],
      [x + 14 * s, hip + 6 * s], [x + 20 * s, sh + 32 * s], [x + 16 * s, sh + 2 * s],
      [x, sh - 4 * s],
    ],
    body, ink, rng, { inkWidth: 3.4 },
  );
  // the ember where the chest was
  put(`<ellipse cx="${n(x)}" cy="${n(sh + 26 * s)}" rx="${n(20 * s)}" ry="${n(22 * s)}" fill="url(#ember)"/>`);
  mass([[x - 7 * s, sh + 18 * s], [x - 4 * s, sh + 32 * s], [x + 5 * s, sh + 34 * s], [x + 7 * s, sh + 20 * s]], FIRE.low, FIRE.mid, rng, { inkWidth: 2 });
  // arms, hanging
  mass([[x - 16 * s, sh + 8 * s], [x - 24 * s, sh + 34 * s], [x - 19 * s, sh + 52 * s], [x - 13 * s, sh + 50 * s], [x - 10 * s, sh + 30 * s]], body, ink, rng, { inkWidth: 2.4 });
  mass([[x + 16 * s, sh + 6 * s], [x + 25 * s, sh + 32 * s], [x + 21 * s, sh + 50 * s], [x + 14 * s, sh + 48 * s], [x + 11 * s, sh + 28 * s]], body, ink, rng, { inkWidth: 2.4 });
  // head: a hood with nothing in it
  mass([[x - 12 * s, sh + 2 * s], [x - 13 * s, sh - 14 * s], [x + 2 * s * f, sh - 24 * s], [x + 13 * s, sh - 12 * s], [x + 11 * s, sh + 3 * s]], p.dark, ink, rng, { inkWidth: 3 });
  for (const o of [-4.5, 4.5]) {
    put(`<circle cx="${n(x + o * s + 2 * s * f)}" cy="${n(sh - 11 * s)}" r="${n(4.2 * s)}" fill="${FIRE.mid}" fill-opacity="0.3"/>`);
    put(`<circle cx="${n(x + o * s + 2 * s * f)}" cy="${n(sh - 11 * s)}" r="${n(1.8 * s)}" fill="${FIRE.core}"/>`);
  }
  hatch(x - 20 * s, sh, 40 * s, 60 * s, ink, rng, 14, 1.3);

  if (id.endsWith('-torch')) {
    const tx = x + 24 * s * f;
    mass([[tx, sh + 44 * s], [tx + 3 * s, sh - 6 * s], [tx - 3 * s, sh - 6 * s]], '#4a3524', ink, rng, { inkWidth: 2 });
    mass([[tx - 8 * s, sh - 6 * s], [tx - 3 * s, sh - 34 * s], [tx + 4 * s, sh - 44 * s], [tx + 8 * s, sh - 8 * s]], FIRE.mid, FIRE.core, rng, { inkWidth: 2 });
    put(`<ellipse cx="${n(tx)}" cy="${n(sh - 20 * s)}" rx="${n(90 * s)}" ry="${n(84 * s)}" fill="url(#glow)"/>`);
  }
  if (id.endsWith('-spear')) {
    mass([[x + 16 * s * f, g - 4 * s], [x + 20 * s * f, g - 4 * s], [x + 44 * s * f, sh - 26 * s], [x + 38 * s * f, sh - 26 * s]], '#4a3524', ink, rng, { inkWidth: 2 });
  }
}

// --- staging --------------------------------------------------------------
function positions(layout, count, x, w) {
  const out2 = [];
  if (layout === 'single' || count === 1) out2.push({ x: x + w * 0.6, s: 1, f: -1 });
  else if (layout === 'spread')
    for (let i = 0; i < count; i++) out2.push({ x: x + w * (0.28 + (i * 0.48) / Math.max(1, count - 1)), s: 1 - i * 0.05, f: -1 });
  else if (layout === 'pack')
    for (let i = 0; i < count; i++) out2.push({ x: x + w * 0.58 + (i - (count - 1) / 2) * 110, s: 0.95 + (i % 2) * 0.1, f: -1 });
  else if (layout === 'ring')
    for (let i = 0; i < count; i++) {
      const a = -0.5 + (i / Math.max(1, count - 1)) * 1;
      out2.push({ x: x + w * 0.56 + Math.sin(a) * w * 0.28, s: 1 - Math.abs(a) * 0.16, f: Math.sin(a) > 0 ? -1 : 1 });
    }
  else {
    out2.push({ x: x + w * 0.55, s: 1, f: -1 });
    for (let i = 1; i < count; i++) out2.push({ x: x + w * (0.13 + i * 0.05), s: 0.84, f: 1 });
  }
  return out2;
}

// --- one panel: six layers, in order ---------------------------------------
//
// The brief this follows, and it is the most useful one this file has had:
//
//   BACKGROUND   far walls, distant architecture, silhouettes
//   MIDGROUND    columns, chains, doors, machinery
//   GAMEPLAY     the floor you stand on, and what stands on it
//   FOREGROUND   stone, chain, rubble crossing the camera
//   LIGHTING     source -> lit -> falloff -> dark, in that order
//   VFX          dust, embers, shafts
//
// And the rule that goes with it: do not try to fill the frame. A small set of
// parts repeated with control, layered, and lit beats drawing every square
// inch. What was missing was never quantity — it was layers, a landmark, dirt
// on the floor, light that eats into the room, and a room that says what
// happened in it.

// --- the kit -------------------------------------------------------------
// Three wall textures, two column types, three lamps, chains, doors, cracks,
// decals. A small set repeated with control makes a richer room than drawing
// every square inch, which is the note the template ends on.

/** BACKGROUND: an arched window, the deep kind you can see nothing through. */
function bgWindow(cx, cy, r, p, rng) {
  const lip = (k) => [
    [cx - r * k, cy + r * 0.9], [cx - r * k, cy - r * 0.2], [cx - r * 0.6 * k, cy - r * k],
    [cx, cy - r * 1.15 * k], [cx + r * 0.6 * k, cy - r * k], [cx + r * k, cy - r * 0.2],
    [cx + r * k, cy + r * 0.9],
  ];
  // the reveal: the thickness of the wall the hole goes through
  mass(lip(1.16), p.mid, p.ink, rng, { inkWidth: 3 });
  mass(lip(1), p.ink, p.ink, rng, { opacity: 0.92, contour: false, form: false });
  // the sill, and what has run down off it
  mass([[cx - r * 1.2, cy + r * 0.88], [cx + r * 1.2, cy + r * 0.86], [cx + r * 1.14, cy + r * 1.04],
        [cx - r * 1.14, cy + r * 1.06]], p.mid, p.ink, rng, { inkWidth: 2.6 });
  for (let i = 0; i < 3; i++) {
    const sx = cx - r * 0.8 + rng() * r * 1.6;
    put(`<path d="${through([[sx, cy + r * 1.02], [sx + (rng() - 0.5) * 12, cy + r * 1.02 + 30 + rng() * 60]], false)}" fill="none" stroke="${p.ink}" stroke-width="${n(3 + rng() * 5)}" stroke-opacity="0.3"/>`);
  }
  // tracery: two mullions and a wheel, at background contrast
  for (const o of [-r * 0.34, r * 0.34])
    put(`<path d="${through([[cx + o, cy + r * 0.85], [cx + o, cy - r * 0.75]], false)}" fill="none" stroke="${p.mid}" stroke-width="4" stroke-opacity="0.5"/>`);
  put(`<circle cx="${n(cx)}" cy="${n(cy - r * 0.35)}" r="${n(r * 0.3)}" fill="none" stroke="${p.mid}" stroke-width="4" stroke-opacity="0.5"/>`);
}

/** MIDGROUND: a hanging cage, empty, still swinging as far as anyone knows. */
function cage(cx, topY, p, rng) {
  const drop = 90 + rng() * 110;
  for (let i = 0; i < Math.floor(drop / 16); i++)
    put(`<ellipse cx="${n(cx + Math.sin(i) * 3)}" cy="${n(topY + i * 16)}" rx="4.5" ry="7.5" fill="none" stroke="${p.ink}" stroke-width="3"/>`);
  const cy = topY + drop;
  mass([[cx - 22, cy], [cx - 26, cy + 46], [cx, cy + 58], [cx + 26, cy + 46], [cx + 22, cy]], p.dark, p.ink, rng, { inkWidth: 3 });
  for (const o of [-12, 0, 12])
    put(`<path d="${through([[cx + o, cy + 2], [cx + o * 1.2, cy + 50]], false)}" fill="none" stroke="${p.ink}" stroke-width="3.4"/>`);
}

/** MIDGROUND: a torn banner. One warm accent in a dark room, per the sheet. */
function banner(cx, topY, p, rng) {
  const len = 150 + rng() * 150;
  const wd = 22 + rng() * 10;
  // cloth hangs: both edges wander, and the bottom is torn into tongues
  const left = [];
  const right = [];
  for (let i = 0; i <= 7; i++) {
    const t = i / 7;
    const sway = Math.sin(t * 3.1 + cx) * 9 * t;
    left.push([cx - wd + sway + (rng() - 0.5) * 4, topY + t * len]);
    right.unshift([cx + wd + sway * 1.2 + (rng() - 0.5) * 4, topY + t * len * (0.94 - rng() * 0.1)]);
  }
  const tongues = [];
  for (let i = 0; i < 4; i++)
    tongues.push([cx - wd + (i * 2 * wd) / 3.4, topY + len + (i % 2 ? -30 - rng() * 20 : 6 + rng() * 10)]);
  mass([...left, ...tongues, ...right], p.accent, p.ink, rng, { opacity: 0.42, inkWidth: 2.2 });
  // folds, which is the only reason cloth reads as cloth
  for (let i = 0; i < 4; i++) {
    const o = -wd + rng() * wd * 2;
    put(`<path d="${through([[cx + o, topY + 8], [cx + o + 6, topY + len * 0.5], [cx + o + 2, topY + len * 0.9]], false)}" fill="none" stroke="${p.ink}" stroke-width="${n(1.6 + rng() * 2)}" stroke-opacity="0.34"/>`);
  }
  // the pole it hangs off, and the shadow that says it is attached to a wall
  put(`<path d="${through([[cx - 34, topY - 6], [cx + 34, topY - 2]], false)}" fill="none" stroke="${p.ink}" stroke-width="7"/>`);
  put(`<ellipse cx="${n(cx + 40)}" cy="${n(topY + len * 0.4)}" rx="${n(wd * 1.5)}" ry="${n(len * 0.4)}" fill="${p.ink}" fill-opacity="0.16"/>`);
}

/** GAMEPLAY: a standing lamp, unlit. The list in the coat is full of these. */
function lamp(cx, floorY, p, rng) {
  mass([[cx - 5, floorY], [cx - 3, floorY - 96], [cx + 3, floorY - 96], [cx + 5, floorY]], p.ink, p.ink, rng, { contour: false });
  mass([[cx - 15, floorY - 96], [cx - 12, floorY - 132], [cx, floorY - 144], [cx + 12, floorY - 132], [cx + 15, floorY - 96]], p.dark, p.ink, rng, { inkWidth: 2.6 });
  put(`<ellipse cx="${n(cx)}" cy="${n(floorY - 118)}" r="0" rx="7" ry="10" fill="${FIRE.deep}" fill-opacity="0.5"/>`);
}

/** FOREGROUND: bones, a broken column, grass. Small, dark, close. */
function nearProps(x, w, floorY, bottom, p, rng) {
  for (let i = 0; i < 9; i++) {
    const bx = x + rng() * w;
    const by = floorY + 24 + rng() * (bottom - floorY - 30);
    if (rng() < 0.5)
      mass([[bx, by], [bx + 26 + rng() * 20, by - 5], [bx + 28, by + 4], [bx + 2, by + 6]], p.ink, p.ink, rng, { contour: false });
    else
      for (let k = 0; k < 4; k++)
        mass([[bx + k * 5, by], [bx + k * 5 - 3, by - 14 - rng() * 16], [bx + k * 5 + 3, by - 10]], p.ink, p.ink, rng, { contour: false });
  }
}

/** Rooms whose own written line already gives them something to look at. */
const OWN_LANDMARK = new Set(['cell', 'undergate', 'lamplighters-rest']);

/** Something the eye can remember. A room without one is a corridor. */
function landmark(room, x, w, floorY, p, rng) {
  const cx = x + w * (0.52 + (rng() - 0.5) * 0.16);
  // Rooms that were written with their own focal point keep it. A great shut
  // door behind the two open ones would only argue with the room's own joke.
  if (OWN_LANDMARK.has(room.key)) return;
  if (room.kind === 'bridge' || room.kind === 'stair') return; // the cut and the flight are the landmark
  if (room.kind === 'yard') {
    // a tower that came down, kept upright by the wall it fell against
    const th = 320 + rng() * 90;
    mass([[cx - 60, floorY], [cx - 48, floorY - th * 0.6], [cx - 26, floorY - th], [cx + 34, floorY - th * 0.92],
          [cx + 30, floorY - th * 0.5], [cx + 62, floorY]], p.dark, p.ink, rng, { inkWidth: 4 });
    for (let i = 0; i < 4; i++)
      put(`<path d="${through([[cx - 54, floorY - 60 - i * th * 0.22], [cx + 52, floorY - 66 - i * th * 0.21]], false)}" fill="none" stroke="${p.ink}" stroke-width="3" stroke-opacity="0.6"/>`);
    hatch(cx - 62, floorY - th, 124, th, p.ink, rng, 24, 1.4);
    return;
  }
  if (room.kind === 'fog') return;
  if (room.kind === 'bonfire') {
    // a chained statue behind the fire: now the room has a story in it
    const th = 300 + rng() * 90;
    mass(
      [[cx - 54, floorY], [cx - 46, floorY - th * 0.5], [cx - 30, floorY - th * 0.82],
       [cx - 34, floorY - th], [cx + 30, floorY - th * 0.98], [cx + 26, floorY - th * 0.8],
       [cx + 44, floorY - th * 0.45], [cx + 52, floorY]],
      p.dark, p.ink, rng, { inkWidth: 4 },
    );
    // the head is gone, and the neck is a break
    mass([[cx - 30, floorY - th], [cx - 12, floorY - th - 26], [cx + 14, floorY - th - 14], [cx + 28, floorY - th]], p.mid, p.ink, rng, { inkWidth: 3 });
    // chains, from the ceiling into its shoulders
    for (const ax of [cx - 40, cx + 38]) {
      for (let i = 0; i < 16; i++) {
        const yy = floorY - th * 0.85 - i * 17;
        put(`<ellipse cx="${n(ax + Math.sin(i * 0.9) * 4)}" cy="${n(yy)}" rx="5" ry="8.5" fill="none" stroke="${p.ink}" stroke-width="3.4" stroke-opacity="0.9"/>`);
      }
    }
    hatch(cx - 60, floorY - th, 120, th, p.ink, rng, 26, 1.4);
    return;
  }
  if (room.kind === 'cave') {
    for (let i = 0; i < 7; i++) {
      const bx = cx - 110 + rng() * 220;
      mass([[bx, floorY], [bx - 8, floorY - 16 - rng() * 30], [bx + 5, floorY - 40 - rng() * 40], [bx + 14, floorY - 12]], p.mid, p.ink, rng, { inkWidth: 2.4, opacity: 0.9 });
    }
    return;
  }
  // a great door, shut
  const dh = 250 + rng() * 90;
  mass([[cx - 66, floorY], [cx - 70, floorY - dh * 0.7], [cx - 34, floorY - dh], [cx + 34, floorY - dh], [cx + 70, floorY - dh * 0.68], [cx + 66, floorY]], p.ink, p.ink, rng, { contour: false });
  mass([[cx - 54, floorY], [cx - 58, floorY - dh * 0.68], [cx - 28, floorY - dh * 0.92], [cx + 28, floorY - dh * 0.92], [cx + 58, floorY - dh * 0.66], [cx + 54, floorY]], p.mid, p.ink, rng, { inkWidth: 3.6 });
  for (let i = 0; i < 4; i++)
    put(`<path d="${through([[cx - 50, floorY - 40 - i * dh * 0.2], [cx + 50, floorY - 44 - i * dh * 0.2]], false)}" fill="none" stroke="${p.ink}" stroke-width="5" stroke-opacity="0.75"/>`);
}

/** Dirt. A clean floor is what makes a room read as a prototype. */
function decals(x, w, floorY, bottom, p, rng) {
  for (let i = 0; i < 16; i++) {
    const dx = x + rng() * w;
    const dy = floorY + 10 + rng() * (bottom - floorY - 20);
    const kind = rng();
    if (kind < 0.3) {
      // rubble
      mass([[dx, dy], [dx + 9 + rng() * 12, dy - 4 - rng() * 6], [dx + 18 + rng() * 14, dy + 2]], p.ink, p.ink, rng, { opacity: 0.55, contour: false });
    } else if (kind < 0.55) {
      // a crack running away
      let d = `M ${n(dx)} ${n(dy)}`;
      let px2 = dx;
      let py2 = dy;
      for (let k = 0; k < 3; k++) { px2 += (rng() - 0.5) * 50; py2 += rng() * 14; d += ` L ${n(px2)} ${n(py2)}`; }
      put(`<path d="${d}" fill="none" stroke="${p.ink}" stroke-width="${n(1 + rng() * 1.6)}" stroke-opacity="0.5"/>`);
    } else if (kind < 0.8) {
      // ash, or a stain
      put(`<ellipse cx="${n(dx)}" cy="${n(dy)}" rx="${n(14 + rng() * 34)}" ry="${n(4 + rng() * 7)}" fill="${p.ink}" fill-opacity="${n(0.1 + rng() * 0.16)}"/>`);
    } else {
      // something somebody dropped and did not come back for
      mass([[dx, dy], [dx + 22, dy - 3], [dx + 24, dy + 4], [dx + 2, dy + 5]], p.mid, p.ink, rng, { opacity: 0.7, inkWidth: 2 });
    }
  }
}

// --- what happened here ----------------------------------------------------
// The template's last note is visual storytelling: every room was written a
// line before it was drawn, and the line names objects. A cell has straw and a
// drain. A kennel has chains with collars at the end of them. If the drawing
// does not put those things in the room, the line is decoration and the room
// is a corridor with a caption.

/** A rusted grate set into the floor. */
function grate(cx, cy, p, rng, wd = 70) {
  mass([[cx - wd / 2, cy], [cx + wd / 2, cy - 4], [cx + wd / 2 + 6, cy + 16], [cx - wd / 2 + 4, cy + 20]],
       p.ink, p.ink, rng, { contour: false });
  for (let i = 1; i < 6; i++)
    put(`<path d="${through([[cx - wd / 2 + (i * wd) / 6, cy - 1], [cx - wd / 2 + (i * wd) / 6 + 3, cy + 18]], false)}" fill="none" stroke="${p.mid}" stroke-width="2.6" stroke-opacity="0.7"/>`);
}

/** Straw, in the corners it got kicked into. */
function straw(cx, floorY, p, rng, n2 = 30) {
  for (let i = 0; i < n2; i++) {
    const sx = cx + (rng() - 0.5) * 300;
    const sy = floorY + (rng() - 0.5) * 26;
    const L = 12 + rng() * 26;
    const a = rng() * Math.PI;
    put(`<path d="${through([[sx, sy], [sx + Math.cos(a) * L, sy + Math.sin(a) * L * 0.4]], false)}" fill="none" stroke="${p.accent}" stroke-width="${n(1 + rng())}" stroke-opacity="${n(0.3 + rng() * 0.35)}"/>`);
  }
}

/** A door, open, hanging on the one hinge that held. */
function openDoor(cx, floorY, p, rng, hgt = 190) {
  put(`<path d="${through([[cx - 60, floorY], [cx - 62, floorY - hgt], [cx + 60, floorY - hgt], [cx + 60, floorY]])}" fill="${p.ink}" fill-opacity="0.95"/>`);
  // the leaf, swung in and seen edge-on
  mass([[cx + 40, floorY], [cx + 30, floorY - hgt * 0.96], [cx + 96, floorY - hgt * 0.86], [cx + 104, floorY + 8]],
       p.mid, p.ink, rng, { inkWidth: 3.2 });
  for (let i = 0; i < 5; i++)
    put(`<path d="${through([[cx + 34, floorY - 20 - i * hgt * 0.18], [cx + 100, floorY - 14 - i * hgt * 0.17]], false)}" fill="none" stroke="${p.ink}" stroke-width="3" stroke-opacity="0.7"/>`);
  for (const hy of [floorY - hgt * 0.8, floorY - hgt * 0.3])
    mass([[cx + 28, hy], [cx + 52, hy - 4], [cx + 52, hy + 10], [cx + 28, hy + 12]], p.lit, p.ink, rng, { opacity: 0.5, contour: false });
}

/** Chain bolted to a wall with a collar on the end of it, and nothing in it. */
function collar(cx, anchorY, floorY, p, rng) {
  let px2 = cx;
  let py2 = anchorY;
  const drop = floorY - anchorY;
  for (let i = 0; i < 12; i++) {
    const t = i / 11;
    const nx = cx + t * (34 + rng() * 20);
    const ny = anchorY + Math.sin(t * 1.9) * drop * 0.4 + t * drop * 0.86;
    put(`<ellipse cx="${n((px2 + nx) / 2)}" cy="${n((py2 + ny) / 2)}" rx="4.4" ry="7" fill="none" stroke="${p.ink}" stroke-width="3"/>`);
    px2 = nx; py2 = ny;
  }
  put(`<ellipse cx="${n(px2)}" cy="${n(py2)}" rx="17" ry="9" fill="none" stroke="${p.ink}" stroke-width="5"/>`);
  mass([[cx - 8, anchorY - 8], [cx + 8, anchorY - 10], [cx + 9, anchorY + 8], [cx - 9, anchorY + 8]], p.mid, p.ink, rng, { inkWidth: 2.4 });
}

/** A lantern on its side. Still lit, which is the part that is wrong. */
function droppedLamp(cx, floorY, p, rng) {
  mass([[cx - 26, floorY], [cx - 30, floorY - 26], [cx - 10, floorY - 36], [cx + 16, floorY - 30], [cx + 20, floorY - 2]],
       p.dark, p.ink, rng, { inkWidth: 2.8 });
  put(`<ellipse cx="${n(cx - 6)}" cy="${n(floorY - 18)}" rx="10" ry="12" fill="${FIRE.mid}" fill-opacity="0.75"/>`);
  put(`<ellipse cx="${n(cx - 6)}" cy="${n(floorY - 18)}" rx="4" ry="5" fill="${FIRE.core}" fill-opacity="0.9"/>`);
  put(`<path d="${through([[cx - 28, floorY - 30], [cx - 40, floorY - 54], [cx - 18, floorY - 62]], false)}" fill="none" stroke="${p.ink}" stroke-width="3"/>`);
}

/** Somebody who sat down against the wall. The coat is still on them. */
function slumped(cx, floorY, p, rng) {
  mass([[cx - 42, floorY + 6], [cx - 46, floorY - 60], [cx - 26, floorY - 96], [cx + 6, floorY - 92],
        [cx + 22, floorY - 40], [cx + 58, floorY - 10], [cx + 60, floorY + 8]],
       p.ink, p.ink, rng, { inkWidth: 3, opacity: 0.96 });
  // the head, fallen forward; no face, and none needed
  mass([[cx - 24, floorY - 92], [cx - 18, floorY - 118], [cx + 6, floorY - 120], [cx + 12, floorY - 94]],
       p.dark, p.ink, rng, { inkWidth: 2.6 });
  // the lamps still hung on them
  for (const o of [-30, -6, 20])
    put(`<ellipse cx="${n(cx + o)}" cy="${n(floorY - 44 + Math.abs(o) * 0.2)}" rx="7" ry="10" fill="none" stroke="${p.mid}" stroke-width="2.6" stroke-opacity="0.8"/>`);
}

/** Two ways on, drawn the same, because that is the joke the room makes. */
function twoGates(x, w, floorY, p, rng) {
  for (const f of [0.22, 0.74]) {
    const cx = x + w * f;
    const hgt = 210 + rng() * 40;
    mass([[cx - 62, floorY], [cx - 66, floorY - hgt * 0.7], [cx - 30, floorY - hgt], [cx + 30, floorY - hgt],
          [cx + 66, floorY - hgt * 0.7], [cx + 62, floorY]], p.ink, p.ink, rng, { contour: false });
    mass([[cx - 78, floorY], [cx - 82, floorY - hgt * 0.72], [cx - 34, floorY - hgt - 16], [cx + 34, floorY - hgt - 16],
          [cx + 82, floorY - hgt * 0.72], [cx + 78, floorY]], p.mid, p.ink, rng, { inkWidth: 3.4, opacity: 0.0 });
    // the jamb, so the hole reads as a doorway
    for (const s of [-1, 1])
      mass([[cx + s * 62, floorY], [cx + s * 66, floorY - hgt * 0.7], [cx + s * 84, floorY - hgt * 0.68], [cx + s * 80, floorY]],
           p.mid, p.ink, rng, { inkWidth: 3 });
  }
}

/** Water in the channel, and which way it is going. */
function water(x, w, floorY, p, rng, backwards) {
  const top = floorY + 26;
  put(`<path d="${through([[x, top], [x + w, top + 6], [x + w, floorY + 150], [x, floorY + 150]])}" fill="${p.ink}" fill-opacity="0.85"/>`);
  for (let i = 0; i < 14; i++) {
    const wy = top + 10 + rng() * 110;
    const wx = x + rng() * w;
    const L = 40 + rng() * 130;
    put(`<path d="${through([[wx, wy], [wx + L, wy + (rng() - 0.5) * 5]], false)}" fill="none" stroke="${p.lit}" stroke-width="${n(1.2 + rng() * 1.8)}" stroke-opacity="${n(0.12 + rng() * 0.2)}"/>`);
  }
  // chevrons: the current. In the long drain they point back up the pipe.
  const dir = backwards ? -1 : 1;
  for (let i = 0; i < 9; i++) {
    const wx = x + 60 + rng() * (w - 120);
    const wy = top + 24 + rng() * 90;
    put(`<path d="${through([[wx - dir * 16, wy - 8], [wx, wy], [wx - dir * 16, wy + 8]], false)}" fill="none" stroke="${p.lit}" stroke-width="2.4" stroke-opacity="0.3"/>`);
  }
}

/** Barrels, crates, a table: the furniture of somewhere people worked. */
function stores(x, w, floorY, p, rng, count = 4) {
  for (let i = 0; i < count; i++) {
    const cx = x + 60 + rng() * (w - 120);
    // Contact shadow first: it is the single thing that stops an object from
    // looking like a card laid on top of the picture.
    put(`<ellipse cx="${n(cx + 6)}" cy="${n(floorY + 4)}" rx="${n(52 + rng() * 20)}" ry="9" fill="${p.ink}" fill-opacity="0.4"/>`);
    if (rng() < 0.5) {
      const hh = 54 + rng() * 30;
      // a barrel: belly, staves, and two hoops that follow the belly
      mass([[cx - 26, floorY], [cx - 33, floorY - hh * 0.5], [cx - 25, floorY - hh], [cx + 25, floorY - hh],
            [cx + 33, floorY - hh * 0.5], [cx + 26, floorY]], p.mid, p.ink, rng, { inkWidth: 3 });
      for (const o of [-16, 0, 16])
        put(`<path d="${through([[cx + o, floorY - 4], [cx + o * 1.28, floorY - hh * 0.5], [cx + o, floorY - hh + 4]], false)}" fill="none" stroke="${p.ink}" stroke-width="2" stroke-opacity="0.4"/>`);
      for (const hy of [floorY - hh * 0.78, floorY - hh * 0.26])
        put(`<path d="${through([[cx - 31, hy], [cx, hy + 5], [cx + 31, hy]], false)}" fill="none" stroke="${p.ink}" stroke-width="3.6" stroke-opacity="0.8"/>`);
      // the lid, seen slightly from above, which is what gives it a top at all
      mass([[cx - 25, floorY - hh], [cx, floorY - hh - 9], [cx + 25, floorY - hh], [cx, floorY - hh + 7]],
           p.far, p.ink, rng, { inkWidth: 2.2 });
    } else {
      // a crate: three faces at three values, because that is what a box is
      const s = 34 + rng() * 20;
      const dz = s * 0.42;
      mass([[cx - s, floorY], [cx - s, floorY - s * 1.05], [cx + s * 0.2, floorY - s * 1.05], [cx + s * 0.2, floorY]],
           p.dark, p.ink, rng, { inkWidth: 3 });
      mass([[cx + s * 0.2, floorY], [cx + s * 0.2, floorY - s * 1.05], [cx + s + dz, floorY - s * 1.05 - dz * 0.5],
            [cx + s + dz, floorY - dz * 0.5]], p.near, p.ink, rng, { inkWidth: 2.6 });
      mass([[cx - s, floorY - s * 1.05], [cx - s + dz, floorY - s * 1.05 - dz * 0.5],
            [cx + s + dz, floorY - s * 1.05 - dz * 0.5], [cx + s * 0.2, floorY - s * 1.05]],
           p.mid, p.ink, rng, { inkWidth: 2.6 });
      // planks, on the face you can see best
      for (let k = 1; k < 3; k++)
        put(`<path d="${through([[cx - s, floorY - k * s * 0.35], [cx + s * 0.2, floorY - k * s * 0.35 - 2]], false)}" fill="none" stroke="${p.ink}" stroke-width="2" stroke-opacity="0.5"/>`);
    }
  }
}

/** Bones, in the quantity that says something lives here and is fed. */
function boneyard(x, w, floorY, p, rng, count = 16) {
  for (let i = 0; i < count; i++) {
    const bx = x + rng() * w;
    const by = floorY + (rng() - 0.4) * 40;
    if (rng() < 0.3) {
      // a skull, three quarters, no jaw
      mass([[bx - 14, by], [bx - 16, by - 16], [bx - 4, by - 24], [bx + 12, by - 20], [bx + 14, by - 4], [bx + 4, by + 4]],
           p.lit, p.ink, rng, { opacity: 0.55, inkWidth: 2 });
      put(`<ellipse cx="${n(bx - 6)}" cy="${n(by - 12)}" rx="4.5" ry="5.5" fill="${p.ink}"/>`);
      put(`<ellipse cx="${n(bx + 6)}" cy="${n(by - 11)}" rx="4" ry="5" fill="${p.ink}"/>`);
    } else {
      const L = 26 + rng() * 40;
      const a = rng() * Math.PI;
      const ex = bx + Math.cos(a) * L;
      const ey = by + Math.sin(a) * L * 0.35;
      mass([[bx, by], [bx + (ex - bx) * 0.5, by + (ey - by) * 0.5 - 4], [ex, ey], [ex, ey + 5], [bx, by + 5]],
           p.lit, p.ink, rng, { opacity: 0.45, contour: false });
    }
  }
}

export const PROPS = {
  cell(x, w, floorY, bottom, p, rng) {
    straw(x + w * 0.34, floorY + 20, p, rng, 44);
    grate(x + w * (0.6 + rng() * 0.08), floorY + 56, p, rng, 84);
    openDoor(x + w * 0.16, floorY, p, rng, 200);
    for (let i = 0; i < 4; i++) {
      const sx = x + w * (0.42 + rng() * 0.3);
      for (let k = 0; k < 5; k++)
        put(`<path d="${through([[sx + k * 7, floorY - 120 - rng() * 40], [sx + k * 7 + 3, floorY - 78]], false)}" fill="none" stroke="${p.lit}" stroke-width="2" stroke-opacity="0.22"/>`);
    }
  },
  'ash-pit'(x, w, floorY, bottom, p, rng) {
    for (let i = 0; i < 5; i++) {
      const cx = x + 80 + rng() * (w - 160);
      mass([[cx - 70, floorY + 10], [cx - 30, floorY - 16 - rng() * 20], [cx + 30, floorY - 10 - rng() * 22], [cx + 76, floorY + 12]],
           p.mid, p.mid, rng, { opacity: 0.5, contour: false });
    }
    // the rake somebody left in it
    const rx = x + w * 0.7;
    put(`<path d="${through([[rx, floorY], [rx + 40, floorY - 150]], false)}" fill="none" stroke="${p.ink}" stroke-width="5"/>`);
    put(`<path d="${through([[rx - 12, floorY + 4], [rx + 18, floorY - 6]], false)}" fill="none" stroke="${p.ink}" stroke-width="7"/>`);
    stores(x, w, floorY, p, rng, 2);
  },
  'long-drain'(x, w, floorY, bottom, p, rng) {
    water(x, w, floorY, p, rng, true);
    for (const f of [0.12, 0.88]) grate(x + w * f, floorY - 150, p, rng, 60);
    // debris riding the current the wrong way
    for (let i = 0; i < 5; i++) {
      const dx = x + 60 + rng() * (w - 120);
      mass([[dx, floorY + 44 + rng() * 60], [dx + 30, floorY + 40 + rng() * 60], [dx + 28, floorY + 52], [dx - 2, floorY + 54]],
           p.mid, p.ink, rng, { opacity: 0.7, contour: false });
    }
  },
  kennel(x, w, floorY, bottom, p, rng) {
    for (const f of [0.14, 0.36, 0.66, 0.88]) collar(x + w * f, floorY - 210 - rng() * 60, floorY, p, rng);
    boneyard(x, w, floorY, p, rng, 22);
    // the trough
    const tx = x + w * 0.52;
    mass([[tx - 90, floorY], [tx - 80, floorY - 26], [tx + 80, floorY - 28], [tx + 90, floorY + 2]], p.dark, p.ink, rng, { inkWidth: 3 });
    // claw marks, at the height of the thing that made them
    for (let i = 0; i < 7; i++) {
      const cx = x + rng() * w;
      const cy = floorY - 60 - rng() * 90;
      for (let k = 0; k < 4; k++)
        put(`<path d="${through([[cx + k * 9, cy], [cx + k * 9 + 12, cy + 46 + rng() * 20]], false)}" fill="none" stroke="${p.lit}" stroke-width="2" stroke-opacity="0.22"/>`);
    }
  },
  'broken-stair'(x, w, floorY, bottom, p, rng) {
    for (let i = 0; i < 6; i++) {
      const bx = x + w * (0.3 + rng() * 0.4);
      mass([[bx, floorY + 30 + rng() * 40], [bx + 60 + rng() * 40, floorY + 24 + rng() * 40], [bx + 58, floorY + 52], [bx - 4, floorY + 58]],
           p.mid, p.ink, rng, { inkWidth: 2.6, opacity: 0.85 });
    }
    // a rope where a rail used to be: it sags, and it is the colour of old rope
    const ry = floorY - 150;
    const sag = [];
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      sag.push([x + w * (0.1 + t * 0.7), ry - t * 90 + Math.sin(t * Math.PI) * 70 + (rng() - 0.5) * 4]);
    }
    put(`<path d="${through(sag, false)}" fill="none" stroke="${p.ink}" stroke-width="6" stroke-linecap="round"/>`);
    put(`<path d="${through(sag.map(([px2, py2]) => [px2, py2 - 1.6]), false)}" fill="none" stroke="${p.accent}" stroke-width="2" stroke-opacity="0.45"/>`);
    for (const [px2, py2] of sag.slice(1, -1))
      if (rng() < 0.5) put(`<path d="${through([[px2, py2], [px2 + 4, py2 + 8 + rng() * 8]], false)}" fill="none" stroke="${p.ink}" stroke-width="2"/>`);
  },
  'lamplighters-rest'(x, w, floorY, bottom, p, rng) {
    slumped(x + w * 0.3, floorY, p, rng);
    droppedLamp(x + w * 0.42, floorY + 10, p, rng);
    // the rest of the round, hung up and never collected
    // The backlog, hung up and never collected. Nothing about a backlog is
    // evenly spaced; the last version read as a row of icons because it was.
    let lx = x + w * 0.58;
    for (let i = 0; i < 6; i++) {
      lx += 22 + rng() * 40;
      const top = floorY - 250 - rng() * 40;
      const hang = top + 50 + rng() * 60;
      put(`<path d="${through([[lx, top], [lx + (rng() - 0.5) * 8, hang]], false)}" fill="none" stroke="${p.ink}" stroke-width="2.6"/>`);
      mass([[lx - 11, hang], [lx - 8, hang + 30], [lx + 8, hang + 30], [lx + 11, hang]], p.dark, p.ink, rng, { inkWidth: 2.2 });
      // the glass, unlit; one of them is not, and that is the whole errand
      put(`<ellipse cx="${n(lx)}" cy="${n(hang + 15)}" rx="5" ry="7" fill="${i === 2 ? FIRE.low : p.ink}" fill-opacity="${i === 2 ? 0.5 : 0.8}"/>`);
    }
    stores(x, w, floorY, p, rng, 2);
  },
  undergate(x, w, floorY, bottom, p, rng) {
    twoGates(x, w, floorY, p, rng);
    // somebody scratched a choice into the wall between them
    const mx = x + w * 0.48;
    for (let i = 0; i < 5; i++)
      put(`<path d="${through([[mx + i * 11, floorY - 150], [mx + i * 11 + (rng() - 0.5) * 10, floorY - 100]], false)}" fill="none" stroke="${p.lit}" stroke-width="2.2" stroke-opacity="0.3"/>`);
    stores(x, w, floorY, p, rng, 3);
  },
};

export const KIND_PROPS = {
  hall: (x, w, floorY, b, p, rng) => stores(x, w, floorY, p, rng, 4),
  bonfire: (x, w, floorY, b, p, rng) => stores(x, w, floorY, p, rng, 3),
  bridge: (x, w, floorY, b, p, rng) => water(x, w, floorY, p, rng, false),
  cave: (x, w, floorY, b, p, rng) => boneyard(x, w, floorY, p, rng, 14),
  stair: (x, w, floorY, b, p, rng) => boneyard(x, w, floorY, p, rng, 6),
  yard: (x, w, floorY, b, p, rng) => stores(x, w, floorY, p, rng, 3),
  fog: () => {},
};

/** Put in the room the things its own line says are in it. */
function props(room, x, w, floorY, bottom, p, rng) {
  const own = PROPS[room.key];
  if (own) { own(x, w, floorY, bottom, p, rng); return; }
  (KIND_PROPS[room.kind] || KIND_PROPS.hall)(x, w, floorY, bottom, p, rng);
}

function panel(room, top) {
  const p = P[room.light] || P.dim;
  const rng = rngFor(room.id);
  const x = M;
  const y = top;
  const w = W - M * 2;
  const h = ART;
  const floorY = y + h * 0.76;
  const cid = room.id.replace(':', '-');
  // Where the light comes from. A bonfire is a bonfire; a warm room that is not
  // one is lit by whatever somebody dropped there, which is smaller and lower.
  const fire =
    room.kind === 'bonfire' ? x + w * 0.36 : room.light === 'warm' ? x + w * 0.42 : null;
  const fireScale = room.kind === 'bonfire' ? 1 : 0.34;
  const roofed = room.kind !== 'yard';

  // Everything in this room is lit by the same thing. In a room with no fire
  // the light is whatever is leaking in from above the frame, up and to the left.
  LIGHT = fire !== null ? { x: fire, y: floorY - 110 * fireScale } : { x: x + w * 0.3, y: y - h * 0.5 };

  put(`<clipPath id="c-${cid}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/></clipPath>`);
  put(`<g clip-path="url(#c-${cid})">`);
  put(`<path d="${through([[x, y], [x + w, y], [x + w, y + h], [x, y + h]])}" fill="${p.dark}"/>`);

  // 1 BACKGROUND
  distance(x, y, w, h, p, rng, floorY, room.kind);
  // 2 MIDGROUND — the room is built from its own kind, not from one hall
  architecture(room, x, y, w, h, p, rng, floorY);
  // Windows are holes in masonry, which means they are cut after the wall is
  // built. Drawn before it they float in front of the room like stickers.
  if (room.kind !== 'cave' && room.kind !== 'fog') {
    bgWindow(x + w * (0.2 + rng() * 0.12), y + h * 0.3, 70 + rng() * 40, p, rng);
    bgWindow(x + w * (0.72 + rng() * 0.12), y + h * 0.32, 60 + rng() * 40, p, rng);
  }
  landmark(room, x, w, floorY, p, rng);
  // Things hang from ceilings. A yard has none and a cave has nothing to bolt to.
  if (roofed && room.kind !== 'cave' && rng() < 0.7) cage(x + w * (0.16 + rng() * 0.1), y + 10, p, rng);
  if (room.kind !== 'cave' && rng() < 0.6) banner(x + w * (0.76 + rng() * 0.12), y + h * 0.2, p, rng);
  // 3 GAMEPLAY
  ground(x, y, w, h, p, rng, floorY, room.kind);
  props(room, x, w, floorY, y + h, p, rng);
  decals(x, w, floorY, y + h, p, rng);
  if (room.kind !== 'cave' && room.kind !== 'bridge') lamp(x + w * (0.82 + rng() * 0.08), floorY, p, rng);

  if (fire !== null) {
    // the wood it is burning, first, so the flame sits in something
    for (let i = 0; i < 5; i++) {
      const a = -0.4 - i * 0.4 + rng() * 0.2;
      const L = (60 + rng() * 50) * (0.6 + fireScale * 0.6);
      mass(
        [[fire - Math.cos(a) * L, floorY + 4], [fire + Math.cos(a) * L * 0.2, floorY - Math.sin(a) * L],
         [fire + Math.cos(a) * L * 0.3, floorY - Math.sin(a) * L + 12], [fire - Math.cos(a) * L + 8, floorY + 12]],
        p.dark, p.ink, rng, { inkWidth: 2.4 },
      );
    }
    // a flame is a stack of tongues that do not agree with each other
    for (const [s0, t0, lean, fill] of [
      [64, 200, -12, FIRE.deep], [46, 158, 16, FIRE.low], [28, 116, -8, FIRE.mid], [13, 68, 6, FIRE.core],
    ]) {
      const spread = s0 * fireScale;
      const tall = t0 * fireScale;
      const lick = [[fire - spread, floorY]];
      for (let k = 1; k <= 7; k++) {
        const t = k / 8;
        // the edge wanders, and the tip leans wherever the last one did not
        const wag = Math.sin(t * 6.4 + s0) * spread * 0.34 + (rng() - 0.5) * spread * 0.3;
        lick.push([fire - spread * (1 - t) + wag, floorY - tall * t * (0.6 + t * 0.4)]);
      }
      lick.push([fire + lean * fireScale, floorY - tall]);
      for (let k = 6; k >= 1; k--) {
        const t = k / 8;
        const wag = Math.cos(t * 5.1 + t0) * spread * 0.3 + (rng() - 0.5) * spread * 0.3;
        lick.push([fire + spread * (1 - t) + wag, floorY - tall * t * (0.55 + t * 0.45)]);
      }
      lick.push([fire + spread, floorY]);
      mass(lick, fill, fill, rng, { contour: false, form: false });
    }
  }

  const spots = positions(room.layout, room.foes.length, x, w);
  room.foes.forEach((id, i) => {
    const at = spots[i] || spots[spots.length - 1];
    creature(id, at.x, floorY, at.s * 1.15, at.f, p, rngFor(`${room.id}-${i}`), room);
  });

  // 4 FOREGROUND
  nearProps(x, w, floorY, y + h, p, rng);
  nearMass(x, y, w, h, p, rng);

  // 5 LIGHTING: source, lit pool, falloff, dark. In that order and no other.
  if (fire !== null) {
    put(`<radialGradient id="l-${cid}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${FIRE.core}" stop-opacity="0.5"/>
      <stop offset="26%" stop-color="${FIRE.mid}" stop-opacity="0.26"/>
      <stop offset="62%" stop-color="${FIRE.low}" stop-opacity="0.09"/>
      <stop offset="100%" stop-color="${FIRE.deep}" stop-opacity="0"/>
    </radialGradient>`);
    put(`<ellipse cx="${n(fire)}" cy="${n(floorY - 90 * fireScale)}" rx="${n(w * (0.3 + 0.3 * fireScale))}" ry="${n(h * (0.28 + 0.27 * fireScale))}" fill="url(#l-${cid})"/>`);
    put(`<radialGradient id="p-${cid}" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${FIRE.mid}" stop-opacity="0.3"/>
      <stop offset="55%" stop-color="${FIRE.low}" stop-opacity="0.11"/>
      <stop offset="100%" stop-color="${FIRE.deep}" stop-opacity="0"/>
    </radialGradient>`);
    put(`<ellipse cx="${n(fire)}" cy="${n(floorY + 10)}" rx="${n(200 + 190 * fireScale)}" ry="${n(40 + 34 * fireScale)}" fill="url(#p-${cid})"/>`);
  }
  put(`<radialGradient id="d-${cid}" cx="${fire !== null ? n(((fire - x) / w) * 100) : 50}%" cy="62%" r="72%">
    <stop offset="42%" stop-color="${p.ink}" stop-opacity="0"/>
    <stop offset="100%" stop-color="${p.ink}" stop-opacity="0.8"/>
  </radialGradient>`);
  put(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#d-${cid})"/>`);

  // 6 VFX
  const air = rngFor(`${room.id}-air`);
  for (let i = 0; i < 46; i++) {
    const ax = x + air() * w;
    const ay = y + air() * h * 0.92;
    const near = fire !== null && Math.abs(ax - fire) < 260;
    put(`<circle cx="${n(ax)}" cy="${n(ay)}" r="${n(0.8 + air() * 2.2)}" fill="${near ? FIRE.mid : p.lit}" fill-opacity="${n(0.08 + air() * 0.3)}"/>`);
  }
  if (fire !== null)
    for (let i = 0; i < 22; i++)
      put(`<circle cx="${n(fire - 60 + air() * 120)}" cy="${n(floorY - 60 - air() * 260)}" r="${n(1 + air() * 2.4)}" fill="${FIRE.mid}" fill-opacity="${n(0.3 + air() * 0.6)}"/>`);
  put(`</g>`);

  const ty = y + h + 26;
  put(`<text x="${x}" y="${ty}" font-size="22" fill="#e8dcc8">${room.name.vi}</text>`);
  put(`<text x="${x + room.name.vi.length * 12 + 16}" y="${ty}" font-size="14" fill="#8b98a6">${room.name.en}</text>`);
  put(`<text x="${x + w}" y="${ty}" text-anchor="end" font-size="12" fill="#5f6b78" font-family="ui-monospace,monospace">${room.id} · ${room.kind} · ${room.light} · ${room.layout}</text>`);
  put(`<text x="${x}" y="${ty + 22}" font-size="15" fill="#a9b6c4">${room.line.vi}</text>`);
}

// --- the sheet ------------------------------------------------------------
export function drawArea(areaId) {
  const spot = AREAS.find((a) => a.id === areaId);
  const rooms = ROOMS.filter((r) => r.area === areaId);
  const H = HEAD + rooms.length * PANEL + 40;
  out.length = 0;
  marks.length = 0;

  put(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Georgia,serif">`);
  put(`<defs>
    <radialGradient id="ember" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffb04a" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#a8300f" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ffb04a" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="#f2702a" stop-opacity="0"/>
    </radialGradient>
  </defs>`);
  put(`<rect width="${W}" height="${H}" fill="#080a0e"/>`);
  put(`<text x="40" y="62" font-size="34" fill="#e8dcc8" letter-spacing="2">${areaId.toUpperCase()}</text>`);
  put(`<text x="40" y="92" font-size="15" fill="#8b98a6">${rooms.length} phòng · tier ${spot.tier}${spot.boss ? ` · boss: ${BESTIARY[spot.boss].name.vi}` : ''} · vẽ tay</text>`);
  const kinds = [...new Set(rooms.flatMap((r) => r.foes).map((id) => LORE[FOES[id].family].name.vi))];
  put(`<text x="40" y="116" font-size="13" fill="#6a7684">${kinds.join(' · ')}</text>`);

  rooms.forEach((room, i) => panel(room, HEAD + i * PANEL));
  put(`</svg>`);

  mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });
  writeFileSync(new URL(`../dist/area-${areaId}.svg`, import.meta.url), out.join('\n'));
  writeFileSync(new URL(`../dist/area-${areaId}.marks.json`, import.meta.url), JSON.stringify(marks, null, 2));
  return { rooms: rooms.length, height: H };
}

const asked = process.argv[2];
if (asked) {
  const r = drawArea(asked);
  console.log(`${asked}: ${r.rooms} phòng -> dist/area-${asked}.svg (${W}x${r.height})`);
}
