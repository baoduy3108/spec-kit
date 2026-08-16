// tools/draw.js — the blockout sheet.
//
// This file used to try to be concept art and it lost that argument. Painted
// concept art now exists for area one and it is better than anything a vector
// renderer was going to produce, so this file does the job a vector renderer is
// actually the right tool for: a measured, reproducible level-design blockout
// of all 368 rooms, drawn straight off the same data the game runs on.
//
// What that buys, which no concept painting can:
//   - it is derived, so it cannot disagree with world.js
//   - it is measured in metres against the player's real speed, reach and roll
//   - it covers every room in the game in a couple of seconds
//   - it is under test
//
// The aesthetic is a technical drawing, not a painting: hairline grid, exact
// distances, one accent colour, and every number on it read out of src/.

import { mkdirSync, writeFileSync } from 'node:fs';
import { AREAS, ROOMS, FOES } from '../src/world.js';
import { BESTIARY } from '../src/bosses.js';
import { LORE } from '../src/lore.js';
import { HERO } from '../src/hero.js';
import { KNIGHT } from '../src/rules.js';
import { linksOf, useGeometry } from './links.js';
// The blockout must not invent a scale or a camera; both belong to the game.
export const UNITS_PER_METRE = 34;
const CAMERA = { viewport: [1280, 720], zoom: 1.35 };

// --- scale ----------------------------------------------------------------
// One metre is PX pixels. The hero is HERO_M metres tall, and every other
// length on the sheet is derived from the game's own numbers through that.
const PX = 19;
const HERO_M = 2.0;
const m = (v) => v * PX;
const ROOM_M = 48;
const ROOM_H_M = 20;
const W = 1500;
const PANEL = 476;
const HEAD = 132;
const PAD = 34;
const BOX_W = m(ROOM_M);
const BOX_H = m(ROOM_H_M);

const INK = {
  paper: '#0b0e14',
  panel: '#0f131b',
  grid: '#1b2230',
  grid5: '#263143',
  rule: '#3d4b60',
  solid: '#1f2733',
  solidEdge: '#55677f',
  text: '#c8d2df',
  dim: '#6c7a8c',
  faint: '#44515f',
  hero: '#7fd4e8',
  foe: '#e0684f',
  light: '#ffb04a',
  hazard: '#c8493c',
  note: '#9aa96e',
};

const out = [];
const put = (s) => out.push(s);
/** The links of the area being drawn. Set by drawArea before any panel. */
let LINKS = [];
const n = (v) => Number(v).toFixed(1);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function rngFor(seed) {
  let h = 2166136261;
  for (const c of String(seed)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return () => { h += 0x6d2b79f5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

const text = (x, y, s, { size = 11, fill = INK.text, anchor = 'start', mono = false, weight = 400, ls = 0 } = {}) =>
  put(`<text x="${n(x)}" y="${n(y)}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}" letter-spacing="${ls}"${mono ? ' font-family="ui-monospace,SFMono-Regular,Menlo,monospace"' : ''}>${esc(s)}</text>`);

const line = (x1, y1, x2, y2, stroke, width = 1, opacity = 1, dash = null) =>
  put(`<path d="M ${n(x1)} ${n(y1)} L ${n(x2)} ${n(y2)}" stroke="${stroke}" stroke-width="${width}" stroke-opacity="${opacity}"${dash ? ` stroke-dasharray="${dash}"` : ''} fill="none"/>`);

// --- terrain: the surface the player actually stands on --------------------
// Each kind returns a profile in metres: [x, y] with y measured up from the
// room's floor line. This is the part a blockout exists for — it is the thing
// the level is, before anything is drawn on it.

/**
 * Square every profile off into right angles.
 *
 * Hollow Knight's terrain collision is rectangles at 90 degrees — no slopes and
 * no curves anywhere in the game — and that is deliberate, not a shortcut. Two
 * things fall out of it. Predictable geometry makes a traversal system reliable:
 * a jump onto a flat edge lands the same way every time and there is no
 * ambiguous surface to slide off. And it is what lets terrain be a lock at all,
 * because you cannot walk up a step the way you stroll up a ramp — a high ledge
 * is only a gate if there is no diagonal beside it.
 *
 * This file was generating 48% of its ground as slopes, 1025 of them in caves.
 * Every height change is a vertical face at one x now, snapped to a grid so
 * that "one jump" and "one jump plus the pole" are exact answers.
 */
const STEP_M = 0.5;
function squareOff(pts) {
  const out = [];
  let prevY = null;
  for (const [x, y] of pts) {
    if (y === null) { out.push([x, null]); prevY = null; continue; }
    const q = Math.round(y / STEP_M) * STEP_M;
    if (prevY !== null && Math.abs(q - prevY) > 1e-9) out.push([x, prevY]); // the riser
    out.push([x, q]);
    prevY = q;
  }
  return out;
}

function profile(room) {
  const rng = rngFor(room.id);
  const P = [];
  const step = (x, y) => P.push([x, y]);
  switch (room.kind) {
    case 'stair': {
      // a flight with the middle of it gone
      // "Half the steps are gone" is several holes, not one chasm. The first
      // version cut three consecutive treads and the blockout measured the
      // result at 4.6m against a 2.2m roll — the room could not be crossed.
      const steps = 22;
      const tread = (ROOM_M - 4) / steps;
      // Bounded: an unbounded retry loop hangs outright, because there are
      // reachable states with no legal tread left to remove ({3,6,9} has none).
      const missing = new Set();
      for (let tries = 0; tries < 90 && missing.size < 7; tries++) {
        const k = 2 + Math.floor(rng() * (steps - 4));
        if (!missing.has(k) && !missing.has(k - 1) && !missing.has(k + 1)) missing.add(k);
      }
      // The tread edges are computed once and reused. Deriving the same point
      // two ways (i*tread here, x0+tread there) puts them a float ulp apart and
      // the profile appears to run backwards by 1e-15 of a metre.
      const xs = Array.from({ length: steps + 1 }, (_, i) => 2 + i * tread);
      step(0, 0);
      for (let i = 0; i < steps; i++) {
        const y = (i * 6.5) / steps;
        if (missing.has(i)) { step(xs[i], null); continue; }
        step(xs[i], y); step(xs[i + 1], y);
      }
      step(ROOM_M, 6.5);
      break;
    }
    case 'bridge': {
      // Two ledges with the channel cut between them — but the channel has a
      // floor. The blockout said 7.2m, uncrossable, and it was right to: the
      // first version made the trough a void, and the room's own line says the
      // two of them are STANDING in it. Water you wade through, not a pit.
      step(0, 0.9); step(16.8, 0.9); step(17.2, 0); step(30.8, 0);
      step(31.2, 0.9); step(ROOM_M, 0.9);
      break;
    }
    case 'cave': {
      step(0, 0);
      // blocky rock shelves rather than a sine wave: a cave floor you can read
      for (let i = 1; i <= 12; i++)
        step((i * ROOM_M) / 12, Math.abs(Math.sin(i * 1.9)) * 1.4 + rng() * 0.4);
      break;
    }
    case 'bonfire': {
      // flat, with the bank of fallen stone the collapse left
      step(0, 0); step(ROOM_M * 0.6, 0);
      step(ROOM_M * 0.72, 1.1); step(ROOM_M * 0.86, 1.8); step(ROOM_M, 1.8);
      break;
    }
    case 'yard': {
      step(0, 0); step(18, 0); step(18.8, 1.4); step(30, 1.4); step(30.8, 0); step(ROOM_M, 0);
      break;
    }
    default:
      step(0, 0); step(ROOM_M, 0);
  }
  return squareOff(P);
}

/** What the player can do with the jump the sim gives them, in metres. Read,
 *  never typed: the geometry is checked against the mechanic, not a guess. */
export const JUMP_UP = (KNIGHT.jump.speed ** 2) / (2 * KNIGHT.gravity) / UNITS_PER_METRE;
export const JUMP_ACROSS = ((2 * KNIGHT.jump.speed) / KNIGHT.gravity) * KNIGHT.speed / UNITS_PER_METRE;
/** What a tapped jump clears. The button is variable now, so the geometry has
 *  two heights to ask about instead of one, and a room that only ever uses the
 *  full arc is a room that throws the mechanic away. */
export const HOOK_UP = KNIGHT.hook.reach;
export const JUMP_TAP = ((KNIGHT.jump.speed * KNIGHT.jump.cut) ** 2) / (2 * KNIGHT.gravity) / UNITS_PER_METRE;

/**
 * Ledges above the floor. A room 14 metres tall with one walkable surface is a
 * corridor with a lot of wasted paint, and that is what every room in this game
 * was until the sim got a jump.
 *
 * Returns [x0, x1, y] in metres. Every one of them is placed within a jump of
 * something — the test that walks all 368 rooms fails otherwise.
 */
function platforms(room) {
  const rng = rngFor(`${room.id}-plat`);
  const P = profile(room);
  const groundAt = (x) => {
    let last = 0;
    for (const [px, py] of P) { if (px > x) break; if (py !== null) last = py; }
    return last;
  };
  const out = [];
  const span = JUMP_ACROSS * 0.75;
  // Two rises, not one. A step you hop onto and a shelf you have to commit to.
  const HOP = Math.max(0.8, JUMP_TAP * 1.5);
  const FULL = JUMP_UP * 0.82;          // headroom: a jump at its apex is not a landing

  const put2 = (x0, w, y) => {
    if (y > ROOM_H_M - 2.5 || x0 < 3 || x0 + w > ROOM_M - 3) return null;
    if (out.some((p) => Math.abs(p[2] - y) < 1.4 && x0 < p[1] + 1.5 && x0 + w > p[0] - 1.5)) return null;
    const rec = [Math.round(x0 * 10) / 10, Math.round((x0 + w) * 10) / 10, Math.round(y * 10) / 10];
    out.push(rec);
    return rec;
  };

  const tiers = { hall: 2, bonfire: 1, bridge: 2, cave: 2, stair: 1, yard: 2, fog: 1 }[room.kind] ?? 1;

  // Tier one hangs a jump above the floor under it.
  const first = [];
  for (let i = 0; i < 4; i++) {
    const w = 3.5 + rng() * 4.5;
    const x0 = 4 + rng() * (ROOM_M - 10 - w);
    // roughly a third of them are a hop, the rest a committed jump
    const rise = rng() < 0.35 ? HOP : FULL;
    const rec = put2(x0, w, groundAt(x0 + w / 2) + rise);
    if (rec) first.push(rec);
  }
  // Tier two grows OUT OF tier one — a jump up and within a jump sideways of a
  // ledge that already exists. Placing it a fixed height above the floor and
  // then checking left 86 rooms with a shelf nobody could ever stand on.
  const second = [];
  if (tiers > 1) {
    for (let i = 0; i < 2 && first.length; i++) {
      const anchor = first[Math.floor(rng() * first.length)];
      const w = 3 + rng() * 4;
      const side = rng() < 0.5 ? -1 : 1;
      const x0 = side < 0 ? anchor[0] - w - rng() * span : anchor[1] + rng() * span;
      const rec = put2(x0, w, anchor[2] + (rng() < 0.3 ? HOP : FULL));
      if (rec) second.push(rec);
    }
  }
  // The high shelf: out of reach of a jump, in reach of the pole. The room is
  // taller than the player currently is, on purpose, from the first time they
  // walk through it — which is how Dead Cells does its vertical shafts.
  const anchors = second.length ? second : first;
  if (anchors.length && rng() < 0.75) {
    const anchor = anchors[Math.floor(rng() * anchors.length)];
    const w = 3 + rng() * 3.5;
    const side = rng() < 0.5 ? -1 : 1;
    const x0 = side < 0 ? anchor[0] - w - rng() * span * 0.6 : anchor[1] + rng() * span * 0.6;
    put2(x0, w, anchor[2] + FULL + HOOK_UP * 0.7);
  }
  return out.sort((a, b) => a[2] - b[2] || a[0] - b[0]);
}

/** A ledge is only content if it can be got onto. */
export function unreachable(room) {
  const P = profile(room);
  const groundAt = (x) => {
    let last = 0;
    for (const [px, py] of P) { if (px > x) break; if (py !== null) last = py; }
    return last;
  };
  const bad = [];
  const plats = platforms(room);
  for (const [x0, x1, y] of plats) {
    const below = Math.max(groundAt(x0), groundAt((x0 + x1) / 2), groundAt(x1));
    // either a jump up from the floor beneath it, or a hop across from another
    // ledge no more than a jump below and a jump away
    const reach = (up) => (y - below <= up) || plats.some(([a, b, py]) =>
      py < y && y - py <= up && x0 - b <= JUMP_ACROSS && a - x1 <= JUMP_ACROSS);
    if (!reach(JUMP_UP + HOOK_UP)) bad.push([x0, x1, y]);
  }
  return bad;
}

/**
 * The ledges you cannot get onto without the pole.
 *
 * These are ROUTES, never PROGRESS: a test walks all 368 rooms and fails if a
 * room's way out is ever behind one. That is the whole discipline of a
 * traversal unlock — it opens what you walked past, it never stops the run.
 */
export function gated(room) {
  const P = profile(room);
  const groundAt = (x) => {
    let last = 0;
    for (const [px, py] of P) { if (px > x) break; if (py !== null) last = py; }
    return last;
  };
  const plats = platforms(room);
  const byJump = new Set();
  // walk up from the floor as far as plain jumping goes, repeatedly
  for (let pass = 0; pass < 4; pass++) {
    for (const p of plats) {
      const [x0, x1, y] = p;
      if (byJump.has(p)) continue;
      const below = Math.max(groundAt(x0), groundAt((x0 + x1) / 2), groundAt(x1));
      if (y - below <= JUMP_UP) { byJump.add(p); continue; }
      if (plats.some((q) => byJump.has(q) && q[2] < y && y - q[2] <= JUMP_UP
        && x0 - q[1] <= JUMP_ACROSS && q[0] - x1 <= JUMP_ACROSS)) byJump.add(p);
    }
  }
  return plats.filter((p) => !byJump.has(p));
}

/** Every hole in the profile, in metres, so the sheet can measure the jumps. */
function gaps(P) {
  const g = [];
  for (let i = 0; i < P.length; i++) {
    if (P[i][1] !== null) continue;
    const from = P[i][0];
    let j = i;
    while (j < P.length && P[j][1] === null) j++;
    g.push([from, (P[j] || [ROOM_M])[0]]);
    i = j;
  }
  return g;
}

/** How close two foes of a given layout are allowed to stand, in metres. A
 *  pack is supposed to arrive together; a spread is not. */
const MIN_APART = { single: 5.0, spread: 8.0, pack: 3.5, ambush: 3.5, ring: 5.0 };

/**
 * Where a foe stands, in metres, from the room's own layout tag.
 *
 * The wrapped indices used to take a flat +1.6m, which meant `single` with
 * three foes returned 13.0, 14.6, 14.6 — two of them standing inside each
 * other — and `spread` with four put two 1.6m apart, which is a pack. Positions
 * are pushed apart to the layout's own minimum now, and the test that says a
 * spread room is not secretly a pack is what found it.
 */
function spots(layout, count) {
  const at = {
    single: [13],
    // 7/12/17.5 left 5m between neighbours, which is inside a foe's 7.6m
    // notice radius — so every room written "pull them one at a time" pulled
    // all of them. A spread has to actually spread.
    spread: [8, 12, 20],
    pack: [20, 13.5, 16.5, 7.5],
    ambush: [37, 20.5, 15],
    ring: [18, 15, 12, 18],
  }[layout] || [26];
  const min = MIN_APART[layout] ?? 2.5;

  const placed = [];
  const free = (x) => x >= 2 && x <= ROOM_M - 2 && placed.every((p) => Math.abs(p - x) >= min);
  for (let i = 0; i < count; i++) {
    const want = at[i % at.length];
    let x = want;
    if (!free(x)) {
      // Scan outward for the nearest free standing place. Pushing off the
      // nearest neighbour instead oscillates between two of them and lands on
      // a duplicate, which is what put two foes inside each other.
      let found = false;
      for (let d = min; d <= ROOM_M && !found; d += 0.25) {
        if (free(want - d)) { x = want - d; found = true; }
        else if (free(want + d)) { x = want + d; found = true; }
      }
      // A spread base wide enough to satisfy `min` three times can have no room
      // left for a fourth. Falling back to `want` there put two foes in the
      // same place all over again, so instead take the middle of the widest
      // gap: the most separated place that exists, whatever `min` wanted.
      if (!found) {
        const edges = [2, ...placed, ROOM_M - 2].sort((a, b) => a - b);
        let best = 0;
        for (let k = 1; k < edges.length; k++)
          if (edges[k] - edges[k - 1] > edges[best + 1] - edges[best]) best = k - 1;
        x = (edges[best] + edges[best + 1]) / 2;
      }
    }
    placed.push(Math.round(x * 10) / 10);
  }
  return placed;
}

// --- what is standing in the room -----------------------------------------
// A blockout that shows only terrain is a grid. Where the crates are is level
// design: it decides sightlines, cover, and whether a room has a place to
// stand. These come off the room's own written line, same as the drawings did.

/** [metres from the left, width, height, label]. */
const FURNITURE = {
  cell: [[6.8, 1.1, 2.1, 'cửa mở', 'a heavy wooden door standing open on one hinge'], [27, 1.6, 0.15, 'cống', 'a rusted iron grate set into the floor'], [16, 3.4, 0.1, 'rơm', 'scattered straw']],
  'ash-pit': [[18, 1.4, 0.9, 'lửa', 'a low campfire'], [21.6, 1.2, 3.2, 'tượng bị xích', 'a tall headless stone statue wrapped in heavy chains hanging from above'], [37, 1.6, 1.1, 'thùng', 'a wooden barrel']],
  'long-drain': [[24, 7.2, 2.6, 'miệng cống', 'a barrel-vaulted drain mouth'], [5, 0.8, 0.8, 'lưới', 'an iron grille high on the wall'], [43, 0.8, 0.8, 'lưới', 'an iron grille high on the wall']],
  kennel: [[24, 3.4, 0.5, 'máng ăn', 'a long stone feeding trough'], [8, 0.3, 1.8, 'xích+vòng cổ', 'chains bolted to the wall ending in open empty iron collars'], [40, 0.3, 1.8, 'xích+vòng cổ', 'chains bolted to the wall ending in open empty iron collars']],
  'broken-stair': [[12, 1.4, 0.4, 'bậc rơi', 'fallen stair treads broken on the ground'], [24, 9, 0.05, 'dây võng', 'a sagging rope where a handrail used to be']],
  'lamplighters-rest': [[14, 1, 1.1, 'người ngồi', 'a body slumped against the wall, still in its coat'], [17.2, 0.5, 0.4, 'đèn rơi', 'a lantern lying on its side, still lit'], [30, 4.2, 0.6, 'dãy đèn treo', 'a row of unlit lanterns hung on hooks at uneven heights']],
  undergate: [[10.6, 2.2, 2.4, 'cửa A', 'a dark doorway'], [35.6, 2.2, 2.4, 'cửa B', 'a second dark doorway, identical to the first'], [23, 0.6, 0.9, 'vạch đếm', 'tally marks scratched into the wall']],
};
const FURNITURE_BY_KIND = {
  hall: [[16, 1.4, 1.1, 'thùng', 'a wooden crate'], [32, 1.2, 1, 'thùng', 'a wooden barrel']],
  bonfire: [[18, 1.4, 0.9, 'lửa', 'a low campfire'], [34, 1.4, 1.1, 'thùng', 'a wooden barrel']],
  bridge: [[24, 7.2, 2.6, 'miệng cống', 'a barrel-vaulted drain mouth']],
  cave: [[24, 2.6, 0.6, 'đá lớn', 'a cluster of large boulders']],
  stair: [[12, 1.2, 0.4, 'đá rơi', 'fallen rubble']],
  yard: [[24, 1.4, 1.2, 'cột gãy', 'a fallen tower held up by the wall it came down against']],
  fog: [],
};
const furnitureOf = (room) => FURNITURE[room.key] || FURNITURE_BY_KIND[room.kind] || [];

// --- the figures: outlines at true scale, not portraits ---------------------

/** The Lamplighter, at 2.0m, obeying its own five silhouette rules. */
function hero(gx, gy, facing = 1) {
  const s = m(HERO_M) / 68;
  put(`<g transform="translate(${n(gx)} ${n(gy)}) scale(${n(facing * s)} ${n(s)})">`);
  // stooped, and the pole is longer than the figure is tall
  put(`<path d="M -14 0 L -6 -30 L -10 -46 L -2 -58 L 8 -56 L 6 -40 L 12 -28 L 10 0 Z" fill="${INK.hero}" fill-opacity="0.16" stroke="${INK.hero}" stroke-width="1.6"/>`);
  put(`<path d="M -3 -58 q -8 -6 -1 -11 q 10 -3 9 5 l -1 6 Z" fill="${INK.hero}" fill-opacity="0.3" stroke="${INK.hero}" stroke-width="1.4"/>`);
  // the coat reads as a cluster of hanging shapes
  for (const [ox, oy] of [[-9, -34], [-4, -22], [4, -29], [8, -18]])
    put(`<rect x="${ox - 2}" y="${oy}" width="4" height="5" fill="none" stroke="${INK.hero}" stroke-width="1.1" stroke-opacity="0.8"/>`);
  // one arm glows at the joints; the other does not
  put(`<path d="M 2 -44 L 12 -32" stroke="${INK.light}" stroke-width="2.4" stroke-linecap="round"/>`);
  // the pole
  put(`<path d="M -18 -12 L 44 -56" stroke="${INK.hero}" stroke-width="1.8"/>`);
  put(`<circle cx="45" cy="-57" r="3" fill="none" stroke="${INK.light}" stroke-width="1.4"/>`);
  put(`</g>`);
}

/** A foe outline, sized off its family and its own reach. */
function foeMark(id, gx, gy, facing = -1) {
  const foe = FOES[id];
  const fam = foe.family;
  const tall = fam === 'hound' ? 0.95 : 1.75;
  const s = m(tall) / 46;
  put(`<g transform="translate(${n(gx)} ${n(gy)}) scale(${n(facing * s)} ${n(s)})">`);
  if (fam === 'hound') {
    // low, long, all shoulder and no hip
    put(`<path d="M -26 0 L -22 -18 L -6 -26 L 14 -24 L 24 -14 L 22 -2 L 16 0 L 14 -12 L -4 -14 L -10 -2 Z" fill="${INK.foe}" fill-opacity="0.18" stroke="${INK.foe}" stroke-width="1.5"/>`);
  } else {
    // upright, hollow at the chest, head hung forward of the shoulders
    put(`<path d="M -8 0 L -6 -22 L -10 -34 L -4 -44 L 6 -42 L 4 -30 L 8 -20 L 8 0 Z" fill="${INK.foe}" fill-opacity="0.18" stroke="${INK.foe}" stroke-width="1.5"/>`);
    put(`<path d="M -5 -44 l 8 -1 l 1 -7 l -8 0 Z" fill="${INK.foe}" fill-opacity="0.3" stroke="${INK.foe}" stroke-width="1.2"/>`);
  }
  put(`</g>`);
}

// --- one room -------------------------------------------------------------

function panel(room, top) {
  const rng = rngFor(`${room.id}-b`);
  const x = PAD;
  const y = top;
  const bx = x;
  const by = y + 34;
  const floor = by + BOX_H;
  const cid = room.id.replace(':', '-');
  const P = profile(room);
  const hole = gaps(P);
  const yAt = (mx) => {
    let last = 0;
    for (const [px, py] of P) { if (px > mx) break; if (py !== null) last = py; }
    return floor - m(last);
  };

  put(`<g>`);
  // --- the box and its grid ------------------------------------------------
  put(`<rect x="${n(bx)}" y="${n(by)}" width="${n(BOX_W)}" height="${n(BOX_H)}" fill="${INK.panel}" stroke="${INK.rule}" stroke-width="1"/>`);
  put(`<clipPath id="k-${cid}"><rect x="${n(bx)}" y="${n(by)}" width="${n(BOX_W)}" height="${n(BOX_H)}"/></clipPath>`);
  put(`<g clip-path="url(#k-${cid})">`);
  for (let i = 1; i < ROOM_M; i++)
    line(bx + m(i), by, bx + m(i), floor, i % 5 ? INK.grid : INK.grid5, 1);
  for (let j = 1; j < ROOM_H_M; j++)
    line(bx, floor - m(j), bx + BOX_W, floor - m(j), j % 5 ? INK.grid : INK.grid5, 1);

  // --- the solid: everything the player cannot walk through ----------------
  let d = `M ${n(bx)} ${n(floor + 40)}`;
  let open = false;
  for (const [px, py] of P) {
    if (py === null) { if (!open) { d += ` L ${n(bx + m(px))} ${n(floor + 40)}`; open = true; } continue; }
    if (open) { d += ` M ${n(bx + m(px))} ${n(floor + 40)}`; open = false; }
    d += ` L ${n(bx + m(px))} ${n(floor - m(py))}`;
  }
  d += ` L ${n(bx + BOX_W)} ${n(floor + 40)} Z`;
  put(`<path d="${d}" fill="${INK.solid}" stroke="${INK.solidEdge}" stroke-width="2"/>`);
  // the ceiling, except where there is none
  if (room.kind !== 'yard') {
    const ch = room.kind === 'cave' ? 1.1 : 0.6;
    let cd = `M ${n(bx)} ${n(by - 10)}`;
    for (let i = 0; i <= 12; i++)
      cd += ` L ${n(bx + (i * BOX_W) / 12)} ${n(by + m(ch) + Math.sin(i * 1.7) * (room.kind === 'cave' ? 12 : 4))}`;
    cd += ` L ${n(bx + BOX_W)} ${n(by - 10)} Z`;
    put(`<path d="${cd}" fill="${INK.solid}" stroke="${INK.solidEdge}" stroke-width="1.6"/>`);
  } else {
    line(bx, by + 12, bx + BOX_W, by + 12, INK.faint, 1, 0.7, '3 5');
    text(bx + BOX_W - 6, by + 24, 'no ceiling', { size: 9, fill: INK.faint, anchor: 'end', mono: true });
  }

  // --- the ledges, and how you get onto them -------------------------------
  const gate = gated(room);
  for (const [px0, px1, py] of platforms(room)) {
    const a = bx + m(px0);
    const b = bx + m(px1);
    const yy = floor - m(py);
    const needsPole = gate.some((g) => g[0] === px0 && g[2] === py);
    put(`<rect x="${n(a)}" y="${n(yy)}" width="${n(b - a)}" height="${n(m(0.4))}" fill="${INK.solid}" stroke="${needsPole ? INK.note : INK.solidEdge}" stroke-width="1.6"${needsPole ? ' stroke-dasharray="5 3"' : ''}/>`);
    if (needsPole) text(a + (b - a) / 2, yy - 14, 'cần sào', { size: 8, fill: INK.note, anchor: 'middle', mono: true });
    put(`<path d="${`M ${n(a)} ${n(yy + m(0.4))} L ${n(b)} ${n(yy + m(0.4))}`}" stroke="${INK.faint}" stroke-width="1" stroke-opacity="0.5" stroke-dasharray="2 4" fill="none"/>`);
    text(a + (b - a) / 2, yy - 4, `${py}m`, { size: 8, fill: INK.faint, anchor: 'middle', mono: true });
  }
  // --- furniture: footprint and height, because both are collision ---------
  for (const [fx0, fw, fh, label] of furnitureOf(room)) {
    const px0 = bx + m(fx0 - fw / 2);
    const base = yAt(fx0);
    put(`<rect x="${n(px0)}" y="${n(base - m(fh))}" width="${n(m(fw))}" height="${n(m(fh))}" fill="${INK.faint}" fill-opacity="0.12" stroke="${INK.faint}" stroke-width="1" stroke-dasharray="3 3"/>`);
    text(px0 + m(fw / 2), base - m(fh) - 5, label, { size: 8.5, fill: INK.faint, anchor: 'middle' });
  }

  // --- hazards: every hole, measured against the roll the player has -------
  const rollM = (KNIGHT.roll.speed * KNIGHT.roll.time) / 100;
  hole.forEach(([g0, g1], hi) => {
    const w0 = bx + m(g0);
    const w1 = bx + m(g1);
    put(`<rect x="${n(w0)}" y="${n(floor - m(0.2))}" width="${n(w1 - w0)}" height="${n(m(1.4))}" fill="${INK.hazard}" fill-opacity="0.1"/>`);
    for (let hx = w0; hx < w1; hx += 9)
      line(hx, floor + m(1.2), hx + 7, floor - m(0.1), INK.hazard, 1.2, 0.5);
    const span = g1 - g0;
    const ly = floor - m(1.9) - (hi % 2) * 15;
    line(w0, ly, w1, ly, INK.hazard, 1, 0.9);
    for (const e of [w0, w1]) line(e, ly - 3, e, ly + 3, INK.hazard, 1, 0.9);
    text((w0 + w1) / 2, ly - 5, `${span.toFixed(1)}m${span <= rollM ? '' : ' · KHÔNG QUA ĐƯỢC'}`,
         { size: 9, fill: span <= rollM ? INK.note : INK.hazard, anchor: 'middle', mono: true });
  });

  // --- light: where it is and how far it reaches ---------------------------
  const lightM = { dark: 0, dim: 4.5, grey: 7, pale: 10, warm: 9, gold: 11 }[room.light] ?? 4.5;
  const lightAt = room.kind === 'bonfire' ? 18 : room.light === 'warm' ? 22 : 12;
  if (lightM > 0) {
    const lcx = bx + m(lightAt);
    const lcy = yAt(lightAt) - m(0.8);
    put(`<radialGradient id="lg-${cid}"><stop offset="0" stop-color="${INK.light}" stop-opacity="0.13"/><stop offset="0.6" stop-color="${INK.light}" stop-opacity="0.04"/><stop offset="1" stop-color="${INK.light}" stop-opacity="0"/></radialGradient>`);
    put(`<circle cx="${n(lcx)}" cy="${n(lcy)}" r="${n(m(lightM))}" fill="url(#lg-${cid})"/>`);
    put(`<circle cx="${n(lcx)}" cy="${n(lcy)}" r="${n(m(lightM))}" fill="none" stroke="${INK.light}" stroke-width="0.9" stroke-opacity="0.3" stroke-dasharray="3 7"/>`);
    put(`<circle cx="${n(lcx)}" cy="${n(lcy)}" r="3.4" fill="${INK.light}"/>`);
    line(lcx, lcy, lcx + m(lightM), lcy, INK.light, 0.9, 0.45);
    text(lcx + m(lightM) - 4, lcy - 5, `${lightM}m`, { size: 8.5, fill: INK.light, anchor: 'end', mono: true });
  }

  // --- the player, at true scale, where they come in -----------------------
  const startM = 2.2;
  hero(bx + m(startM), yAt(startM), 1);
  put(`<circle cx="${n(bx + m(startM))}" cy="${n(yAt(startM))}" r="4" fill="none" stroke="${INK.hero}" stroke-width="1.6"/>`);
  text(bx + m(startM), floor + 14, 'VÀO', { size: 9, fill: INK.hero, anchor: 'middle', mono: true });
  // the reach the player has, so the room can be judged against it
  const reachM = KNIGHT.swings[1].reach[1] / 100;
  line(bx + m(startM), floor - m(1.1), bx + m(startM + reachM), floor - m(1.1), INK.hero, 1, 0.55, '2 3');
  text(bx + m(startM + reachM) + 4, floor - m(1.05), `tầm ${reachM.toFixed(1)}m`, { size: 8.5, fill: INK.hero, mono: true });

  // one jump, drawn to scale, so the sheet shows what the mechanic can actually
  // reach — every ledge above is placed against these two numbers
  const jx = bx + m(startM + 2.5);
  const jy = yAt(startM + 2.5);
  let arc = `M ${n(jx)} ${n(jy)}`;
  for (let s = 1; s <= 12; s++) {
    const t = s / 12;
    arc += ` L ${n(jx + m(JUMP_ACROSS * t))} ${n(jy - m(4 * JUMP_UP * t * (1 - t)))}`;
  }
  put(`<path d="${arc}" fill="none" stroke="${INK.hero}" stroke-width="1.2" stroke-opacity="0.5" stroke-dasharray="3 3"/>`);
  // and the tapped arc, because the button is variable and the level uses both
  let tap = `M ${n(jx)} ${n(jy)}`;
  const tapAcross = JUMP_ACROSS * 0.55;
  for (let s = 1; s <= 10; s++) {
    const t = s / 10;
    tap += ` L ${n(jx + m(tapAcross * t))} ${n(jy - m(4 * JUMP_TAP * t * (1 - t)))}`;
  }
  put(`<path d="${tap}" fill="none" stroke="${INK.hero}" stroke-width="1" stroke-opacity="0.3" stroke-dasharray="2 3"/>`);
  text(jx + m(JUMP_ACROSS / 2), jy - m(JUMP_UP) - 5, `nhảy ${JUMP_TAP.toFixed(1)}m (chạm) → ${JUMP_UP.toFixed(1)}m (giữ) × ${JUMP_ACROSS.toFixed(1)}m`,
       { size: 8.5, fill: INK.hero, anchor: 'middle', mono: true });

  // --- the foes ------------------------------------------------------------
  const at = spots(room.layout, room.foes.length);
  room.foes.forEach((id, i) => {
    const fm = at[i];
    const fx = bx + m(fm);
    const fy = yAt(fm);
    const foe = FOES[id];
    // patrol, from its own speed: how far it covers in two seconds
    const patrol = (foe.speed / 100) * 2;
    line(fx - m(patrol / 2), fy + 6, fx + m(patrol / 2), fy + 6, INK.foe, 1, 0.4);
    for (const e of [-1, 1]) line(fx + e * m(patrol / 2), fy + 2, fx + e * m(patrol / 2), fy + 10, INK.foe, 1, 0.4);
    // its own reach, which is the number that decides whether a room is fair
    line(fx, fy - m(0.7), fx - m(foe.reach), fy - m(0.7), INK.foe, 1.2, 0.8);
    foeMark(id, fx, fy, -1);
    text(fx, fy + 22, `${id}`, { size: 9, fill: INK.foe, anchor: 'middle', mono: true });
    text(fx, fy + 32, `${foe.hp}hp ${foe.damage}dmg ${foe.windup}s`, { size: 8, fill: INK.dim, anchor: 'middle', mono: true });
  });

  // --- exits: the real ones, off the link graph ----------------------------
  // Every room used to be drawn with a door at each end, because that was the
  // only way the game connected. Some of them are holes in the floor and ledges
  // at the ceiling now, and the sheet has to say which.
  const ways = LINKS.filter((l) => l.from === room.id);
  const side = ways.filter((l) => l.dir === 'right').length;
  for (const [ex, lab, show] of [[0.5, '←', true], [ROOM_M - 0.5, '→', side > 0]]) {
    if (!show) continue;
    put(`<rect x="${n(bx + m(ex) - 9)}" y="${n(yAt(ex) - m(2.1))}" width="18" height="${n(m(2.1))}" fill="${INK.paper}" stroke="${INK.rule}" stroke-width="1"/>`);
    text(bx + m(ex), yAt(ex) - m(0.9), lab, { size: 12, fill: INK.dim, anchor: 'middle' });
  }
  for (const l of ways) {
    const colour = l.kind === 'shortcut' ? INK.note : INK.hero;
    const to = l.to.split(':')[1];
    if (l.dir === 'down') {
      const dx = bx + m(l.at);
      put(`<path d="M ${n(dx - 11)} ${n(floor + 8)} L ${n(dx + 11)} ${n(floor + 8)} L ${n(dx)} ${n(floor + 30)} Z" fill="${colour}" fill-opacity="0.8"/>`);
      text(dx, floor + 44, `xuống ${to}`, { size: 8.5, fill: colour, anchor: 'middle', mono: true });
    } else if (l.dir === 'up') {
      const dx = bx + m(l.at);
      const ly = floor - m(JUMP_UP * 1.5) - 26;
      put(`<path d="M ${n(dx - 11)} ${n(ly)} L ${n(dx + 11)} ${n(ly)} L ${n(dx)} ${n(ly - 22)} Z" fill="${colour}" fill-opacity="0.8"/>`);
      text(dx, ly - 28, `lên ${to}`, { size: 8.5, fill: colour, anchor: 'middle', mono: true });
    } else if (l.kind === 'shortcut') {
      const dx = bx + m(l.at);
      put(`<rect x="${n(dx - 13)}" y="${n(yAt(l.at) - m(2.4))}" width="26" height="${n(m(2.4))}" fill="none" stroke="${colour}" stroke-width="1.8" stroke-dasharray="4 3"/>`);
      text(dx, yAt(l.at) + 15, `tắt → ${to}`, { size: 8.5, fill: colour, anchor: 'middle', mono: true });
    }
  }
  // --- what fits on screen at once -----------------------------------------
  // what the camera actually shows, from the viewport and zoom the game uses
  const camM = CAMERA.viewport[0] / CAMERA.zoom / UNITS_PER_METRE;
  // The room is wider than the camera now, so this is a window that travels
  // with the player rather than a frame the whole room sits inside.
  const c0 = 0;
  line(bx + m(c0), by + 8, bx + m(c0 + camM), by + 8, INK.dim, 1, 0.5, '5 4');
  for (const e of [0, camM]) line(bx + m(c0 + e), by + 4, bx + m(c0 + e), by + 12, INK.dim, 1, 0.5);
  put(`<path d="M ${n(bx + m(camM) + 6)} ${n(by + 8)} l 9 -4 v 8 Z" fill="${INK.dim}" fill-opacity="0.6"/>`);
  text(bx + m(camM / 2), by + 20, `khung hình ${camM.toFixed(1)}m — cuộn theo người chơi`, { size: 8.5, fill: INK.dim, anchor: 'middle', mono: true });
  put(`</g>`);

  // --- the scale bar, outside the box --------------------------------------
  line(bx, floor + 24, bx + m(5), floor + 24, INK.rule, 1.4);
  for (let i = 0; i <= 5; i++) line(bx + m(i), floor + 21, bx + m(i), floor + 27, INK.rule, 1);
  text(bx + m(5) + 6, floor + 28, '5m', { size: 9, fill: INK.dim, mono: true });
  text(bx + BOX_W, floor + 28, `${ROOM_M} × ${ROOM_H_M} m`, { size: 9, fill: INK.faint, anchor: 'end', mono: true });

  // --- the strip on the right ----------------------------------------------
  const sx = bx + BOX_W + 26;
  text(sx, y + 14, room.name.vi, { size: 15, fill: INK.text });
  text(sx, y + 30, room.name.en, { size: 10, fill: INK.dim });
  line(sx, y + 38, W - PAD, y + 38, INK.rule, 1, 0.6);
  text(sx, y + 54, `${room.id}`, { size: 9.5, fill: INK.faint, mono: true });
  text(sx, y + 68, `${room.kind} · ${room.light} · ${room.layout}`, { size: 9.5, fill: INK.dim, mono: true });

  const hp = room.foes.reduce((a, id) => a + FOES[id].hp, 0);
  const dmg = room.foes.reduce((a, id) => Math.max(a, FOES[id].damage), 0);
  const fastest = room.foes.reduce((a, id) => Math.min(a, FOES[id].windup), 9);
  const rows = [
    ['quái', room.foes.length ? `${room.foes.length}` : '—'],
    ['tổng hp', hp || '—'],
    ['đòn nặng nhất', dmg ? `${dmg} (${Math.ceil(KNIGHT.hp / dmg)} đòn chết)` : '—'],
    ['báo ngắn nhất', room.foes.length ? `${fastest.toFixed(2)}s` : '—'],
    ['hụt chân', hole.length ? hole.map(([a, b]) => `${(b - a).toFixed(1)}m`).join(', ') : 'không'],
    ['bệ trên cao', platforms(room).length ? `${platforms(room).length}${gated(room).length ? ` (${gated(room).length} cần sào)` : ''}` : '—'],
    ['băng qua', `${(ROOM_M * UNITS_PER_METRE / KNIGHT.speed).toFixed(1)}s`],
    ['lối ra', LINKS.filter((l) => l.from === room.id).map((l) => (l.kind === 'shortcut' ? 'tắt' : l.dir)).join(', ') || 'cuối khu'],
  ];
  rows.forEach(([k, v], i) => {
    text(sx, y + 88 + i * 14, k, { size: 9.5, fill: INK.faint, mono: true });
    text(W - PAD, y + 88 + i * 14, String(v), { size: 9.5, fill: INK.text, anchor: 'end', mono: true });
  });

  // the line the room was written with, which is what it is all for
  const wrapped = wrap(room.line.vi, 40);
  wrapped.forEach((ln, i) => text(sx, y + 210 + i * 14, ln, { size: 10.5, fill: INK.note }));
  if (room.note) wrap(`ghi chú: ${room.note}`, 42).forEach((ln, i) =>
    text(sx, y + 210 + wrapped.length * 14 + 10 + i * 13, ln, { size: 9.5, fill: INK.dim }));
  put(`</g>`);
}

function wrap(s, cols) {
  const words = String(s).split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > cols) { lines.push(cur.trim()); cur = w; }
    else cur += ' ' + w;
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}

// --- the sheet ------------------------------------------------------------

export function drawArea(areaId) {
  const spot = AREAS.find((a) => a.id === areaId);
  if (!spot) throw new Error(`no such area: ${areaId}`);
  const rooms = ROOMS.filter((r) => r.area === areaId);
  const H = HEAD + rooms.length * PANEL + 56;
  out.length = 0;

  put(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Inter,Helvetica,Arial,sans-serif">`);
  put(`<rect width="${W}" height="${H}" fill="${INK.paper}"/>`);

  text(PAD, 46, areaId.toUpperCase(), { size: 26, fill: INK.text, ls: 3 });
  text(PAD, 66, 'BLOCKOUT · mặt cắt ngang · vẽ từ src/world.js', { size: 11, fill: INK.dim });
  const kinds = [...new Set(rooms.flatMap((r) => r.foes).map((id) => LORE[FOES[id].family].name.vi))];
  text(PAD, 86, `${rooms.length} phòng · tier ${spot.tier}${spot.boss ? ` · boss ${BESTIARY[spot.boss].name.vi}` : ''}${kinds.length ? ` · ${kinds.join(', ')}` : ''}`,
       { size: 11, fill: INK.faint });

  // the legend, so the sheet reads without being explained
  const lx = W - PAD - 460;
  const legend = [
    [INK.hero, `${HERO.name.vi} · ${HERO_M.toFixed(1)}m`],
    [INK.foe, 'quái · vạch dưới = tầm tuần, vạch trên = tầm với'],
    [INK.light, 'nguồn sáng · vòng nét đứt = bán kính'],
    [INK.hazard, 'hụt chân · đo theo cú lăn thật của người chơi'],
  ];
  legend.forEach(([c, s], i) => {
    put(`<rect x="${lx}" y="${34 + i * 15}" width="9" height="9" fill="${c}" fill-opacity="0.3" stroke="${c}" stroke-width="1"/>`);
    text(lx + 15, 42 + i * 15, s, { size: 9.5, fill: INK.dim });
  });
  line(PAD, HEAD - 22, W - PAD, HEAD - 22, INK.rule, 1, 0.5);

  LINKS = linksOf(areaId);
  rooms.forEach((room, i) => panel(room, HEAD + i * PANEL));

  const rollM = (KNIGHT.roll.speed * KNIGHT.roll.time) / 100;
  text(PAD, H - 24, `người chơi: ${KNIGHT.hp}hp · lăn ${rollM.toFixed(1)}m trong ${KNIGHT.roll.time}s · tầm đánh ${(KNIGHT.swings[1].reach[1] / 100).toFixed(2)}m · bất tử ${KNIGHT.roll.iFrom}–${KNIGHT.roll.iTo}s`,
       { size: 9.5, fill: INK.faint, mono: true });
  put(`</svg>`);

  mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });
  writeFileSync(new URL(`../dist/blockout-${areaId}.svg`, import.meta.url), out.join('\n'));
  return { rooms: rooms.length, height: H };
}

/** The furthest the player can carry themselves across a hole, in metres. */
export const ROLL_M = (KNIGHT.roll.speed * KNIGHT.roll.time) / 100;

/** Every gap in a room that the player cannot cross. A room with one of these
 *  in it cannot be walked through, and no amount of art will fix that. */
export function impassable(room) {
  return gaps(profile(room)).filter(([a, b]) => b - a > ROLL_M);
}

export function drawAll() {
  return AREAS.map((a) => ({ id: a.id, ...drawArea(a.id) }));
}

export { profile, platforms, gaps, spots, furnitureOf, PX, HERO_M, ROOM_M, ROOM_H_M };

// --- wiring ---------------------------------------------------------------
// links.js decides where doors go and needs the shape of a room to do it. It is
// handed the geometry rather than importing it, so the dependency runs one way:
// draw -> links, never back.
//
// At the bottom of the file on purpose. Placed at the top it reaches ROOM_M and
// JUMP_UP before their declarations and dies in the temporal dead zone — which
// is the exact failure the comment in links.js warns about, and is how it was
// found. Anything that wants links imports this module and gets it wired.
useGeometry({ profile, platforms, gated, gaps, JUMP_UP, ROOM_M });

const asked = process.argv[2];
if (asked) {
  if (asked === 'all') {
    const all = drawAll();
    console.log(`${all.length} khu · ${all.reduce((a, r) => a + r.rooms, 0)} phòng -> dist/blockout-*.svg`);
  } else {
    const r = drawArea(asked);
    console.log(`${asked}: ${r.rooms} phòng -> dist/blockout-${asked}.svg (${W}x${r.height})`);
  }
}
