// The world.
//
// 36 areas, 18 bosses, a few hundred rooms. The area graph is authored by
// hand — that is the part that decides whether a world feels like a place —
// and the rooms inside each area are grown from it deterministically, so the
// two can never disagree and there is no 400-line table to keep in sync.
//
// The property that makes a souls map a place rather than a level select is
// that it *folds back on itself*: you walk a long dangerous way out, open a
// lift, and suddenly you are thirty seconds from the fire you started at. So
// folding is measured here, not asserted. `shortcutValue()` reports how many
// rooms each fold actually saves, and a shortcut that saves nothing fails the
// tests, because that is scenery wearing a shortcut's clothes.

// --- what lives here ------------------------------------------------------
//
// Sixteen families, each with a few variants, the way Dark Souls counts its
// roughly seventy "types": a hollow with a spear and a hollow with a torch
// are the same creature with different intentions.

const FAMILIES = [
  { id: 'husk', hp: 34, damage: 9, speed: 62, poise: 12, windup: 0.55, tier: 0 },
  { id: 'hound', hp: 22, damage: 12, speed: 148, poise: 6, windup: 0.34, tier: 0 },
  { id: 'crawler', hp: 46, damage: 14, speed: 48, poise: 20, windup: 0.7, tier: 1 },
  { id: 'acolyte', hp: 40, damage: 16, speed: 74, poise: 14, windup: 0.62, tier: 1 },
  { id: 'knightling', hp: 62, damage: 18, speed: 96, poise: 28, windup: 0.6, tier: 2 },
  { id: 'ghoul', hp: 38, damage: 15, speed: 118, poise: 10, windup: 0.4, tier: 2 },
  { id: 'stonemask', hp: 88, damage: 21, speed: 58, poise: 44, windup: 0.85, tier: 3 },
  { id: 'moth', hp: 30, damage: 13, speed: 165, poise: 4, windup: 0.3, tier: 3 },
  { id: 'warder', hp: 104, damage: 24, speed: 84, poise: 52, windup: 0.72, tier: 4 },
  { id: 'kiln', hp: 72, damage: 27, speed: 90, poise: 30, windup: 0.55, tier: 4 },
  { id: 'drowned', hp: 96, damage: 22, speed: 66, poise: 40, windup: 0.8, tier: 5 },
  { id: 'chorister', hp: 68, damage: 30, speed: 78, poise: 24, windup: 0.9, tier: 5 },
  { id: 'ironclad', hp: 148, damage: 32, speed: 70, poise: 76, windup: 0.78, tier: 6 },
  { id: 'wisp', hp: 44, damage: 26, speed: 190, poise: 2, windup: 0.28, tier: 6 },
  { id: 'colossus', hp: 210, damage: 38, speed: 52, poise: 110, windup: 1.0, tier: 7 },
  { id: 'shade', hp: 120, damage: 35, speed: 130, poise: 34, windup: 0.42, tier: 7 },
];

/** What a family can be carrying. The numbers bend, the creature does not. */
const VARIANTS = [
  { suffix: '', hp: 1, damage: 1, speed: 1, windup: 1 },
  { suffix: '-spear', hp: 1.05, damage: 1.18, speed: 0.94, windup: 1.15, reach: 1.4 },
  { suffix: '-torch', hp: 0.92, damage: 0.86, speed: 1.08, windup: 0.88, burns: true },
  { suffix: '-heavy', hp: 1.45, damage: 1.35, speed: 0.8, windup: 1.3, poise: 1.6 },
  { suffix: '-swift', hp: 0.78, damage: 0.9, speed: 1.4, windup: 0.75 },
];

/** Every concrete foe: family × variant, flattened. */
export const FOES = {};
for (const family of FAMILIES) {
  for (const variant of VARIANTS) {
    // Not every family carries every thing — the fast ones do not lug shields.
    if (variant.suffix === '-heavy' && family.speed > 140) continue;
    if (variant.suffix === '-spear' && family.poise < 6) continue;
    FOES[family.id + variant.suffix] = {
      family: family.id,
      tier: family.tier,
      hp: Math.round(family.hp * variant.hp),
      damage: Math.round(family.damage * variant.damage),
      speed: Math.round(family.speed * variant.speed),
      poise: Math.round(family.poise * (variant.poise || 1)),
      windup: Number((family.windup * variant.windup).toFixed(2)),
      reach: variant.reach || 1,
      burns: !!variant.burns,
      essence: Math.round(family.hp * variant.hp * 0.55 + family.damage * variant.damage * 1.4),
    };
  }
}

export const FOE_IDS = Object.keys(FOES);
/**
 * Areas run to tier 11 but there are only eight tiers of creature, so an
 * area's tier is mapped onto the roster rather than indexed into it. Without
 * this the deepest third of the map picked foes out of an empty list and
 * filled its rooms with `undefined`.
 */
const byTier = (areaTier) => {
  const want = Math.min(7, Math.round((areaTier * 7) / 11));
  const pool = FOE_IDS.filter((id) => Math.abs(FOES[id].tier - want) <= 1);
  return pool.length ? pool : FOE_IDS;
};

// --- the areas ------------------------------------------------------------
//
// `to` is the way onward. `fold` is a shortcut back to somewhere you have
// already been, and it only ever opens from this side.

const area = (id, tier, size, extra = {}) => ({ id, tier, size, ...extra });

export const AREAS = [
  area('undercroft', 0, 7, { to: ['courtyard', 'drainage'], fires: 1 }),
  area('courtyard', 0, 9, { to: ['gatehouse'] }),
  area('drainage', 1, 8, { to: ['cistern'], boss: 'the-bloated' }),
  area('gatehouse', 1, 10, { to: ['ramparts', 'chapelyard'], fires: 1 }),
  area('cistern', 1, 9, { to: ['chapelyard'], fold: 'undercroft' }),
  area('ramparts', 2, 11, { to: ['bellfry'], boss: 'the-watchman' }),
  area('chapelyard', 2, 10, { to: ['ossuary'], fires: 1 }),
  area('bellfry', 2, 8, { to: ['upper-ward'], fold: 'courtyard' }),
  area('ossuary', 3, 12, { to: ['catacombs'], boss: 'the-chanter', fires: 1 }),
  area('upper-ward', 3, 9, { to: ['solarium'] }),
  area('catacombs', 3, 13, { to: ['deep-vault', 'marsh'] }),
  area('solarium', 4, 8, { to: ['aviary'], boss: 'the-gilded', fold: 'gatehouse' }),
  area('deep-vault', 4, 11, { to: ['forge'], fires: 1 }),
  area('marsh', 4, 12, { to: ['sunken-road'], boss: 'the-drowned-king' }),
  area('aviary', 5, 9, { to: ['spire'] }),
  area('forge', 5, 10, { to: ['ashlands'], boss: 'the-smith', fires: 1 }),
  area('sunken-road', 5, 11, { to: ['pale-wood'], fold: 'chapelyard' }),
  area('spire', 6, 8, { to: ['observatory'], boss: 'the-keeper' }),
  area('ashlands', 6, 13, { to: ['cinder-gate'], fires: 1 }),
  area('pale-wood', 6, 12, { to: ['hollow-tree'], boss: 'the-shepherd' }),
  area('observatory', 7, 9, { to: ['star-well'], fold: 'upper-ward' }),
  area('cinder-gate', 7, 10, { to: ['furnace'], boss: 'the-ember-knight' }),
  area('hollow-tree', 7, 11, { to: ['root-deep'], fires: 1 }),
  area('star-well', 8, 8, { to: ['vault-of-hours'], boss: 'the-astronomer' }),
  area('furnace', 8, 12, { to: ['slag'], fold: 'forge' }),
  area('root-deep', 8, 13, { to: ['heartwood'], boss: 'the-old-root', fires: 1 }),
  area('vault-of-hours', 9, 9, { to: ['clockwork'] }),
  area('slag', 9, 11, { to: ['crucible'], boss: 'the-slagborn' }),
  area('heartwood', 9, 10, { to: ['crucible'], fold: 'pale-wood' }),
  area('clockwork', 10, 12, { to: ['the-lantern'], boss: 'the-hourwright', fires: 1 }),
  area('crucible', 10, 13, { to: ['the-lantern'], boss: 'the-crucible-twins' }),
  area('drowned-city', 6, 14, { to: ['sunken-road'], boss: 'the-tide', fires: 1 }),
  area('bone-orchard', 5, 10, { to: ['drowned-city'], boss: 'the-gardener' }),
  area('winding-stair', 4, 9, { to: ['bone-orchard'], fold: 'ossuary' }),
  area('the-lantern', 11, 8, { to: [], boss: 'the-lantern-warden', fires: 1 }),
  area('kiln', 11, 9, { to: ['the-lantern'], boss: 'the-first-flame', fold: 'undercroft' }),
];

// `catacombs` also drops into the side branch, and the kiln hides behind it
AREAS.find((a) => a.id === 'catacombs').to.push('winding-stair');
AREAS.find((a) => a.id === 'crucible').to.push('kiln');

// --- growing the rooms ----------------------------------------------------

function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const hash = (text) => {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

export const ROOMS = [];
export const LINKS = [];

const push = (a, b, extra = {}) => LINKS.push({ a, b, ...extra });

for (const spot of AREAS) {
  const rng = seeded(hash(spot.id));
  const ids = [];

  for (let i = 0; i < spot.size; i++) {
    const id = `${spot.id}:${i}`;
    const last = i === spot.size - 1;
    // Every area gets a fire, and a boss always has one in the room before
    // it. The walk back after dying is a tax on learning, and a 35-room walk
    // is not difficulty — it is a reason to stop playing.
    const isFire = i === 1 || (spot.boss && i === spot.size - 2);
    const isBoss = last && spot.boss;

    const pool = byTier(spot.tier);
    const count = isFire || isBoss ? 0 : 1 + Math.floor(rng() * 3);
    const foes = [];
    for (let f = 0; f < count; f++) foes.push(pool[Math.floor(rng() * pool.length)]);

    ROOMS.push({
      id,
      area: spot.id,
      tier: spot.tier,
      kind: isBoss ? 'fog' : isFire ? 'bonfire' : ['hall', 'stair', 'bridge', 'cave', 'yard'][Math.floor(rng() * 5)],
      boss: isBoss ? spot.boss : undefined,
      foes,
    });
    ids.push(id);
  }

  // A spine with the occasional loop, so an area is not a corridor.
  for (let i = 1; i < ids.length; i++) push(ids[i - 1], ids[i]);
  for (let i = 2; i < ids.length - 1; i++) {
    if (rng() < 0.3) push(ids[i - 2], ids[i]);
  }
  spot.entrance = ids[0];
  spot.exit = ids[ids.length - 1];
  spot.roomIds = ids;
}

const areaById = (id) => AREAS.find((a) => a.id === id);

for (const spot of AREAS) {
  for (const next of spot.to) {
    const target = areaById(next);
    if (target) push(spot.exit, target.entrance, { gate: `${spot.id}>${next}` });
  }
  if (spot.fold) {
    const target = areaById(spot.fold);
    // The fold lands you near the *start* of somewhere old — that is the
    // whole feeling: the world you struggled through becomes a corridor.
    push(spot.roomIds[Math.max(0, spot.roomIds.length - 2)], target.roomIds[1], {
      shortcut: `${spot.id}-fold`,
      shut: true,
      opensFrom: spot.roomIds[Math.max(0, spot.roomIds.length - 2)],
    });
  }
}

export const START = AREAS[0].roomIds[1];

// --- moving through it ----------------------------------------------------

export function newWorld() {
  return {
    at: START,
    /** The last fire you sat at: where you come back. */
    fire: START,
    opened: [],
    cleared: [],
    felled: [],
    seen: [START],
  };
}

const roomIndex = new Map(ROOMS.map((r) => [r.id, r]));
export const roomOf = (id) => roomIndex.get(id);

export function exitsFrom(world, id) {
  const out = [];
  for (const edge of LINKS) {
    if (edge.shut && !world.opened.includes(edge.shortcut)) continue;
    if (edge.a === id) out.push(edge.b);
    if (edge.b === id) out.push(edge.a);
  }
  return out;
}

export function reachable(world, from = world.at) {
  const seen = new Set([from]);
  const queue = [from];
  while (queue.length) {
    for (const next of exitsFrom(world, queue.shift())) {
      if (seen.has(next)) continue;
      seen.add(next);
      queue.push(next);
    }
  }
  return seen;
}

export function routeBetween(world, from, to) {
  if (from === to) return [from];
  const previous = new Map([[from, null]]);
  const queue = [from];
  while (queue.length) {
    const here = queue.shift();
    for (const next of exitsFrom(world, here)) {
      if (previous.has(next)) continue;
      previous.set(next, here);
      if (next === to) {
        const path = [next];
        let step = here;
        while (step !== null) {
          path.unshift(step);
          step = previous.get(step);
        }
        return path;
      }
      queue.push(next);
    }
  }
  return null;
}

export function moveTo(world, id) {
  if (!exitsFrom(world, world.at).includes(id)) return false;
  world.at = id;
  if (!world.seen.includes(id)) world.seen.push(id);
  if (roomOf(id).kind === 'bonfire') world.fire = id;
  return true;
}

/** A fold has to be earned from the long way round, or it is just a door. */
export function openShortcut(world, name) {
  const edge = LINKS.find((l) => l.shortcut === name);
  if (!edge || world.opened.includes(name)) return false;
  if (world.at !== edge.opensFrom) return false;
  world.opened.push(name);
  return true;
}

export function clearRoom(world, id) {
  if (!world.cleared.includes(id)) world.cleared.push(id);
  const room = roomOf(id);
  if (room.boss && !world.felled.includes(room.boss)) world.felled.push(room.boss);
  return world;
}

export function foesIn(world, id) {
  if (world.cleared.includes(id)) return [];
  return (roomOf(id).foes || []).map((kind) => ({ kind, ...FOES[kind] }));
}

// --- the measurements the design has to survive ---------------------------

export function depths() {
  const shut = { opened: [] };
  const out = new Map([[START, 0]]);
  const queue = [START];
  while (queue.length) {
    const here = queue.shift();
    for (const next of exitsFrom(shut, here)) {
      if (out.has(next)) continue;
      out.set(next, out.get(here) + 1);
      queue.push(next);
    }
  }
  return out;
}

export function threatOf(id) {
  return (roomOf(id).foes || []).reduce((sum, kind) => sum + FOES[kind].hp * FOES[kind].damage, 0);
}

export const BOSSES = AREAS.filter((a) => a.boss).map((a) => ({ id: a.boss, area: a.id, tier: a.tier }));
export const FIRES = ROOMS.filter((r) => r.kind === 'bonfire').map((r) => r.id);

/** How many rooms a fold saves off the walk from the nearest fire to the end. */
export function shortcutValue(name, target = AREAS[AREAS.length - 2].exit) {
  const shut = newWorld();
  const open = newWorld();
  open.opened = [name];
  let best = 0;
  for (const fire of FIRES) {
    const before = routeBetween(shut, fire, target);
    const after = routeBetween(open, fire, target);
    if (!before || !after) continue;
    best = Math.max(best, before.length - after.length);
  }
  return best;
}

export function fullyConnected() {
  const everything = { opened: LINKS.map((l) => l.shortcut).filter(Boolean) };
  return reachable(everything, START).size === ROOMS.length;
}

/** A room you can enter but never leave is not difficulty, it is a lost save. */
export function strandedRooms() {
  const shut = newWorld();
  return ROOMS.filter((room) => !FIRES.some((fire) => routeBetween(shut, room.id, fire))).map(
    (r) => r.id,
  );
}
