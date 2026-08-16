// tools/terrain.js — the shape of a room, and what the player can do with it.
//
// Split out of draw.js because links.js needs the same geometry to decide where
// a door can go. Having the renderer and the link graph import each other was a
// cycle that only worked because the call happened to be deferred to runtime;
// the first top-level use of a const across it would have died in the temporal
// dead zone with an error nobody would enjoy reading.

import { KNIGHT } from '../src/rules.js';

export const UNITS_PER_METRE = 34;

export const ROOM_M = 48;
export const ROOM_H_M = 20;

export function rngFor(seed) {
  let h = 2166136261;
  for (const c of String(seed)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return () => { h += 0x6d2b79f5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

const text = (x, y, s, { size = 11, fill = INK.text, anchor = 'start', mono = false, weight = 400, ls = 0 } = {}) =>

export const STEP_M = 0.5;
export function squareOff(pts) {
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

export function profile(room) {
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
export function platforms(room) {
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
export function gaps(P) {
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
export function spots(layout, count) {
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
export const furnitureOf = (room) => FURNITURE[room.key] || FURNITURE_BY_KIND[room.kind] || [];


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

// Only when run directly. Guarding on process.argv[2] alone meant that
// importing this file as a library ran its CLI as a side effect — links.js
// asking draw.js for a profile rendered a whole sheet to disk.
const RUN = import.meta.url === `file://${process.argv[1]}`;
const asked = process.argv[2];
if (RUN && asked) {
  if (asked === 'all') {
    const all = drawAll();
    console.log(`${all.length} khu · ${all.reduce((a, r) => a + r.rooms, 0)} phòng -> dist/blockout-*.svg`);
  } else {
    const r = drawArea(asked);
    console.log(`${asked}: ${r.rooms} phòng -> dist/blockout-${asked}.svg (${W}x${r.height})`);
  }
