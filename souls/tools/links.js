// tools/links.js — how the rooms of an area actually connect.
//
// Until now they did not, really: world.js lists roomIds in order and everything
// downstream assumed room[i] joins room[i+1] left to right. That one assumption
// is why the map reads as a single horizontal line no matter how tall the rooms
// get. Dead Cells' room templates carry vertical door positions; Castlevania's
// map connects on four sides. This gives this game the same, derived from the
// same data so nothing has to be hand-maintained.
//
// Two kinds of link:
//
//   spine     — the way through. Every room is on it, all of it walkable with
//               the jump alone, never behind the pole.
//   shortcut  — a way BACK, opened from the far side, ending at a bonfire.
//               Convenience only: a test fails if progress ever needs one.
//
// The geometry is HANDED IN rather than imported. draw.js owns the shape of a
// room and this file decides where a door goes in it, so importing from there
// was the obvious move — but draw.js then needs linksOf to draw those doors,
// and two modules importing each other is a cycle. It happened to work, because
// every call was deferred to runtime; the first top-level `const x = ROOM_M * 2`
// added here would have died in the temporal dead zone. One direction only.

import { AREAS, ROOMS } from '../src/world.js';

let GEOM = null;
/** Called once by whoever owns the geometry. See the bottom of tools/draw.js. */
export function useGeometry(g) { GEOM = g; }
function geom() {
  if (!GEOM) throw new Error('links: useGeometry() has not been called');
  return GEOM;
}

function rngFor(seed) {
  let h = 2166136261;
  for (const c of String(seed)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return () => { h += 0x6d2b79f5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

const round = (v) => Math.round(v * 10) / 10;
const roomById = Object.fromEntries(ROOMS.map((r) => [r.id, r]));

/** A hole in the floor is a door downwards. It was already there; it was only
 *  ever being read as a hazard. */
function dropPoints(room) {
  const g = geom();
  return g.gaps(g.profile(room)).map(([a, b]) => (a + b) / 2);
}

/** A ledge near the top that you can reach WITHOUT the pole is a door up. A
 *  pole-gated one would put the way through behind an unlock. */
function climbPoints(room) {
  const g = geom();
  const locked = g.gated(room);
  return g.platforms(room)
    .filter((p) => !locked.some((q) => q[0] === p[0] && q[2] === p[2]))
    .filter((p) => p[2] >= g.JUMP_UP * 1.5)
    .map(([a, b]) => (a + b) / 2);
}

/**
 * The links of one area.
 *
 * The spine follows world.js's room order. That order is the author's — the
 * prose and the difficulty curve were written against it — so it is not
 * rearranged. What changes is HOW each step is taken: where the geometry of
 * both rooms allows, a step becomes a drop or a climb instead of a walk.
 */
export function linksOf(areaId) {
  const g = geom();
  const area = AREAS.find((a) => a.id === areaId);
  if (!area) throw new Error(`no such area: ${areaId}`);
  const ids = area.roomIds;
  const rng = rngFor(`${areaId}-links`);
  const out = [];

  for (let i = 0; i < ids.length - 1; i++) {
    const from = roomById[ids[i]];
    const to = roomById[ids[i + 1]];
    const roll = rng();
    const drops = dropPoints(from);
    const climbs = climbPoints(from);

    if (roll < 0.22 && drops.length) {
      out.push({ from: from.id, to: to.id, dir: 'down', at: round(drops[Math.floor(rng() * drops.length)]), kind: 'spine' });
      continue;
    }
    if (roll < 0.4 && climbs.length) {
      out.push({ from: from.id, to: to.id, dir: 'up', at: round(climbs[Math.floor(rng() * climbs.length)]), kind: 'spine' });
      continue;
    }
    out.push({ from: from.id, to: to.id, dir: 'right', at: g.ROOM_M - 0.5, kind: 'spine' });
  }

  // --- the way back --------------------------------------------------------
  // A bonfire you can only reach by walking the whole area again is a bonfire
  // that punishes you for having used it. Souls-likes open a door from the far
  // side; this places one from the last room meaningfully past the fire.
  const fire = ids.map((id) => roomById[id]).find((r) => r.kind === 'bonfire');
  if (fire) {
    const fireAt = ids.indexOf(fire.id);
    for (let i = ids.length - 1; i > fireAt + 1; i--) {
      if (roomById[ids[i]].kind === 'bonfire') continue;
      out.push({
        from: ids[i], to: fire.id, dir: 'shortcut', at: round(2 + rng() * 4),
        kind: 'shortcut', opens: 'far',
      });
      break;
    }
  }
  return out;
}

export function allLinks() {
  return Object.fromEntries(AREAS.map((a) => [a.id, linksOf(a.id)]));
}

/** Walk the spine from the entrance and report what you can get to. */
export function reachable(areaId) {
  const area = AREAS.find((a) => a.id === areaId);
  const links = linksOf(areaId).filter((l) => l.kind === 'spine');
  const seen = new Set([area.entrance]);
  let grew = true;
  while (grew) {
    grew = false;
    for (const l of links)
      if (seen.has(l.from) && !seen.has(l.to)) { seen.add(l.to); grew = true; }
  }
  return seen;
}
