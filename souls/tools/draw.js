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

/**
 * A mass: irregular fill plus a contour drawn in several short overlapping
 * strokes of varying width, which is what a pen actually leaves behind and
 * what a single even-width outline never looks like.
 */
function mass(pts, fill, ink, rng, { inkWidth = 3, opacity = 1, contour = true } = {}) {
  const shape = wobble(pts, 5, rng);
  put(`<path d="${through(shape)}" fill="${fill}" fill-opacity="${opacity}"/>`);
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
const ramp = (base, light, lo, hi, t) => {
  const away = base + (base < light ? -46 : 46);
  const hue = t < 0.5 ? away + (base - away) * (t / 0.5) : base + (light - base) * ((t - 0.5) / 0.5) * 0.75;
  return hsl(hue, 0.22 + 0.44 * Math.sin(Math.PI * Math.min(1, Math.max(0, t))), lo + (hi - lo) * t);
};
const MOOD = {
  dark: { base: 218, light: 190, lo: 0.08, hi: 0.62 },
  dim: { base: 224, light: 200, lo: 0.1, hi: 0.66 },
  grey: { base: 205, light: 186, lo: 0.14, hi: 0.74 },
  pale: { base: 196, light: 176, lo: 0.2, hi: 0.82 },
  warm: { base: 18, light: 38, lo: 0.09, hi: 0.68 },
  gold: { base: 34, light: 46, lo: 0.13, hi: 0.78 },
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
    accent: hsl(m.base + 168, 0.46, Math.min(0.6, m.hi * 0.8)),
  };
}
const FIRE = { core: '#fff6d8', mid: '#ffb04a', low: '#f2702a', deep: '#a8300f' };

// --- the room, built in value groups --------------------------------------

/** A ragged horizon: the far group, drawn as one shape and left alone. */
function distance(x, y, w, h, p, rng, floorY) {
  const pts = [[x, floorY]];
  for (let i = 0; i <= 12; i++) {
    const t = i / 12;
    pts.push([x + t * w, y + h * 0.24 + Math.sin(t * 5.2) * 46 + rng() * 40]);
  }
  pts.push([x + w, floorY]);
  mass(pts, p.far, p.far, rng, { contour: false });
  hatch(x, y + h * 0.2, w, h * 0.35, p.mid, rng, 40, 1.1);

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

/** The midground: what the room is made of, in its narrow band. */
function walls(x, y, w, h, p, rng, floorY) {
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

/** The floor: broken, and the near group starts here. */
function ground(x, y, w, h, p, rng, floorY) {
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
  for (let i = 0; i < 22; i++) {
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

// --- one panel ------------------------------------------------------------
function panel(room, top) {
  const p = P[room.light] || P.dim;
  const rng = rngFor(room.id);
  const x = M;
  const y = top;
  const w = W - M * 2;
  const h = ART;
  const floorY = y + h * 0.76;
  const cid = room.id.replace(':', '-');

  put(`<clipPath id="c-${cid}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3"/></clipPath>`);
  put(`<g clip-path="url(#c-${cid})">`);
  put(`<path d="${through([[x, y], [x + w, y], [x + w, y + h], [x, y + h]])}" fill="${p.dark}"/>`);

  distance(x, y, w, h, p, rng, floorY);
  walls(x, y, w, h, p, rng, floorY);
  ground(x, y, w, h, p, rng, floorY);

  if (room.kind === 'bonfire') {
    const fx = x + w * 0.36;
    put(`<ellipse cx="${n(fx)}" cy="${n(floorY)}" rx="240" ry="70" fill="url(#glow)"/>`);
    for (const [spread, tall, lean, fill] of [
      [40, 120, -8, FIRE.deep], [28, 96, 10, FIRE.low], [17, 70, -5, FIRE.mid], [8, 42, 4, FIRE.core],
    ]) {
      mass(
        [[fx - spread, floorY], [fx - spread * 0.5, floorY - tall * 0.5], [fx + lean, floorY - tall], [fx + spread * 0.6, floorY - tall * 0.45], [fx + spread, floorY]],
        fill, fill, rng, { contour: false },
      );
    }
    for (let i = 0; i < 16; i++)
      put(`<circle cx="${n(fx - 30 + rng() * 60)}" cy="${n(floorY - 60 - rng() * 130)}" r="${n(1 + rng() * 2.6)}" fill="${FIRE.mid}" fill-opacity="${n(0.3 + rng() * 0.6)}"/>`);
  }

  const spots = positions(room.layout, room.foes.length, x, w);
  room.foes.forEach((id, i) => {
    const at = spots[i] || spots[spots.length - 1];
    creature(id, at.x, floorY, at.s * 1.15, at.f, p, rngFor(`${room.id}-${i}`), room);
  });

  nearMass(x, y, w, h, p, rng);

  // value blocking last, over everything, as its own visible step
  put(`<linearGradient id="v-${cid}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${p.lit}" stop-opacity="0.2"/>
    <stop offset="46%" stop-color="${p.lit}" stop-opacity="0.04"/>
    <stop offset="70%" stop-color="${p.ink}" stop-opacity="0.3"/>
    <stop offset="100%" stop-color="${p.ink}" stop-opacity="0.9"/>
  </linearGradient>`);
  put(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#v-${cid})"/>`);
  put(`<linearGradient id="s-${cid}" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="${p.ink}" stop-opacity="0.85"/>
    <stop offset="16%" stop-color="${p.ink}" stop-opacity="0"/>
    <stop offset="84%" stop-color="${p.ink}" stop-opacity="0"/>
    <stop offset="100%" stop-color="${p.ink}" stop-opacity="0.85"/>
  </linearGradient>`);
  put(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#s-${cid})"/>`);
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
