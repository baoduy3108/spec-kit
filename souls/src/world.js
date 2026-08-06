// The world, as a graph.
//
// The thing that makes a Dark Souls map feel like a place rather than a level
// select is not its size — it is that it *folds back on itself*. You walk a
// long dangerous way out, and then a lift or a ladder drops you thirty
// seconds from the fire you started at, and the world quietly gets smaller.
//
// So the map is authored as a graph and the folding is a measurable property,
// not a vibe: `shortcutValue()` says how many rooms each shortcut saves, and
// the tests fail if one of them saves nothing. Same instrument as everywhere
// else in this repo — the design claim is a number a bot can check.

/** A door between two rooms. `locked` opens from one side only, once. */
const link = (a, b, extra = {}) => ({ a, b, ...extra });

export const ROOMS = [
  { id: 'fire', kind: 'bonfire' },
  { id: 'yard', kind: 'field', foes: ['husk', 'husk'] },
  { id: 'gate', kind: 'field', foes: ['husk', 'hound'] },
  { id: 'cloister', kind: 'field', foes: ['husk', 'husk', 'hound'] },
  { id: 'well', kind: 'shaft', foes: ['hound'] },
  { id: 'crypt', kind: 'dark', foes: ['husk', 'crawler', 'crawler'] },
  { id: 'ossuary', kind: 'bonfire' },
  { id: 'gallery', kind: 'field', foes: ['knightling', 'hound'] },
  { id: 'belfry', kind: 'shaft', foes: ['crawler', 'knightling'] },
  { id: 'chapel', kind: 'fog', boss: 'chanter' },
  { id: 'ashes', kind: 'bonfire' },
  { id: 'rampart', kind: 'field', foes: ['knightling', 'knightling', 'hound'] },
  { id: 'lantern', kind: 'fog', boss: 'warden' },
];

export const LINKS = [
  link('fire', 'yard'),
  link('fire', 'gate'),
  link('yard', 'cloister'),
  link('gate', 'cloister'),
  link('cloister', 'well'),
  link('well', 'crypt'),
  link('crypt', 'ossuary'),
  link('ossuary', 'gallery'),
  link('gallery', 'belfry'),
  link('belfry', 'chapel'),
  link('chapel', 'ashes'),
  link('ashes', 'rampart'),
  link('rampart', 'lantern'),

  // The folds. Each starts shut and opens from the far side only — which is
  // exactly why finding one feels like being handed the map back.
  link('crypt', 'yard', { shortcut: 'crypt-ladder', shut: true, opensFrom: 'crypt' }),
  link('gallery', 'gate', { shortcut: 'gallery-lift', shut: true, opensFrom: 'gallery' }),
  link('rampart', 'cloister', { shortcut: 'rampart-drop', shut: true, opensFrom: 'rampart' }),
  link('belfry', 'well', { shortcut: 'belfry-rope', shut: true, opensFrom: 'belfry' }),
];

export const FOES = {
  husk: { hp: 34, damage: 9, speed: 62, poise: 12, essence: 18, windup: 0.55 },
  hound: { hp: 22, damage: 12, speed: 145, poise: 6, essence: 22, windup: 0.34 },
  crawler: { hp: 46, damage: 14, speed: 48, poise: 20, essence: 30, windup: 0.7 },
  knightling: { hp: 62, damage: 18, speed: 96, poise: 28, essence: 46, windup: 0.6 },
};

/**
 * How many rooms in each one is, measured from the first fire with every
 * shortcut still shut. Derived, never authored: a hand-written depth beside a
 * hand-written graph is two sources of truth for one fact, and they drifted
 * apart the first time this map was edited.
 */
export function depths() {
  const shut = { opened: [] };
  const out = new Map([['fire', 0]]);
  const queue = ['fire'];
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

/** Roughly how dangerous a room is, for checking the curve goes up. */
export function threatOf(id) {
  return (roomOf(id).foes || []).reduce((sum, kind) => {
    const foe = FOES[kind];
    return sum + foe.hp * foe.damage;
  }, 0);
}

export function newWorld() {
  return {
    at: 'fire',
    /** The last fire you sat at: where you respawn. */
    fire: 'fire',
    opened: [],
    cleared: [],
    /** Rooms you have set foot in, for the map screen. */
    seen: ['fire'],
  };
}

const roomById = (id) => ROOMS.find((r) => r.id === id);
export const roomOf = roomById;

/** Every room you can walk to from here right now, in one step. */
export function exitsFrom(world, id) {
  const out = [];
  for (const edge of LINKS) {
    const open = !edge.shut || world.opened.includes(edge.shortcut);
    if (!open) continue;
    if (edge.a === id) out.push(edge.b);
    if (edge.b === id) out.push(edge.a);
  }
  return out;
}

/** Rooms reachable from a starting room, given what is currently open. */
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

/** Shortest route between two rooms, or null if there is no way through. */
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

/** Walking one room. Refuses to walk through a wall — the caller is wrong. */
export function moveTo(world, id) {
  if (!exitsFrom(world, world.at).includes(id)) return false;
  world.at = id;
  if (!world.seen.includes(id)) world.seen.push(id);
  if (roomById(id).kind === 'bonfire') world.fire = id;
  return true;
}

/**
 * Open a shortcut. Only from the far side: a fold in the map has to be
 * *earned* from the long way round, or it is just a door.
 */
export function openShortcut(world, name) {
  const edge = LINKS.find((l) => l.shortcut === name);
  if (!edge || world.opened.includes(name)) return false;
  if (world.at !== edge.opensFrom) return false;
  world.opened.push(name);
  return true;
}

export function clearRoom(world, id) {
  if (!world.cleared.includes(id)) world.cleared.push(id);
  return world;
}

/** Foes still standing in a room. Bonfires and cleared rooms are empty. */
export function foesIn(world, id) {
  if (world.cleared.includes(id)) return [];
  return (roomById(id).foes || []).map((kind) => ({ kind, ...FOES[kind] }));
}

/**
 * How many rooms a shortcut saves on the walk from your fire to the boss.
 *
 * This is the number that says whether a fold is worth building. A shortcut
 * that saves nothing is scenery, and the tests treat that as a bug.
 */
export function shortcutValue(name, fire = 'ashes', target = 'lantern') {
  const shut = newWorld();
  const open = newWorld();
  open.opened = [name];
  const before = routeBetween(shut, fire, target);
  const after = routeBetween(open, fire, target);
  if (!before || !after) return 0;
  return before.length - after.length;
}

/** The whole map, ignoring locks — used to prove nothing is stranded. */
export function fullyConnected() {
  const everything = { opened: LINKS.map((l) => l.shortcut).filter(Boolean) };
  return reachable(everything, 'fire').size === ROOMS.length;
}

/**
 * Could a player ever end up unable to reach any fire? In a game whose whole
 * loop is "die, walk back", a room you can enter but never leave is not
 * difficulty, it is a lost save.
 */
export function strandedRooms() {
  const shut = newWorld();
  return ROOMS.filter((room) => {
    const fires = ROOMS.filter((r) => r.kind === 'bonfire');
    return !fires.some((fire) => routeBetween(shut, room.id, fire.id));
  }).map((r) => r.id);
}
