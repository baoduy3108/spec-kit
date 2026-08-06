// The house's memory of *you*.
//
// This is the whole game. Guards do not get smarter in general — they get
// smarter about the specific person who keeps robbing them. Every adaptation
// is aimed at something you actually did, and is announced in plain words, so
// the house is always teaching you what habit it just took away.
//
// The design consequence: any fixed strategy decays. A bot that plays its
// best policy every night is exactly the player this house is built to catch.

import { DIRS, TILE, W, at, inside } from './house.js';

export function newMemory() {
  return {
    /** How often you have stood on each tile, across every attempt. */
    tiles: new Map(),
    /** How often you have come in through each door. */
    doors: new Map(),
    /** How often you have used each shadow to hide. */
    shadows: new Map(),
    attempts: 0,
    escapes: 0,
    caught: 0,
    /** Turn counts of your finished heists, to learn your tempo. */
    lengths: [],
  };
}

const bump = (map, key, by = 1) => map.set(key, (map.get(key) || 0) + by);

/** Fold one finished attempt into what the house knows. */
export function remember(memory, heist) {
  memory.attempts++;
  if (heist.over === 'escaped') memory.escapes++;
  if (heist.over === 'caught') memory.caught++;
  memory.lengths.push(heist.turn);
  bump(memory.doors, heist.doorUsed);

  for (const stepTaken of heist.trail) {
    const key = `${stepTaken.x},${stepTaken.y}`;
    bump(memory.tiles, key);
    if (heist.house.tiles[at(stepTaken.x, stepTaken.y)] === TILE.SHADOW) {
      bump(memory.shadows, key);
    }
  }
  return memory;
}

function topOf(map, n = 1) {
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
}

const parse = (key) => {
  const [x, y] = key.split(',').map(Number);
  return { x, y };
};

/**
 * Change the house so that whatever you did last time works less well.
 *
 * Returns structured notes — { id, ...facts }, never sentences. Order matters: the cheapest, most
 * legible countermeasure first, so early nights teach rather than punish.
 */
export function adapt(house, memory, rng) {
  const notes = [];

  // 1. A lamp where you like to hide. The most direct answer to a habit.
  const [favouriteShadow] = topOf(memory.shadows);
  if (favouriteShadow && favouriteShadow[1] >= 2) {
    const spot = parse(favouriteShadow[0]);
    if (house.tiles[at(spot.x, spot.y)] === TILE.SHADOW) {
      house.tiles[at(spot.x, spot.y)] = TILE.FLOOR;
      house.lamps.push(`${spot.x},${spot.y}`);
      memory.shadows.delete(favouriteShadow[0]);
      notes.push({ id: 'lamp', x: spot.x, y: spot.y });
    }
  }

  // 2. A lock on the door you always use — but never the last one. A house
  // that bolts every door does not get harder, it stops being a game, so a
  // new lock releases the oldest one. The choice of way in must survive.
  const [favouriteDoor] = topOf(memory.doors);
  if (favouriteDoor && favouriteDoor[1] >= 3) {
    const door = house.doors.find((d) => d.key === favouriteDoor[0]);
    const key = door && `${door.x},${door.y}`;
    if (door && !house.locked.includes(key)) {
      house.locked.push(key);
      memory.doors.delete(favouriteDoor[0]);
      const note = { id: 'lock', door: door.key };
      const cap = Math.max(1, house.doors.length - 2);
      while (house.locked.length > cap) {
        const released = house.locked.shift();
        const old = house.doors.find((d) => `${d.x},${d.y}` === released);
        if (old) {
          note.id = 'lockSwap';
          note.freed = old.key;
        }
      }
      notes.push(note);
    }
  }

  // 3. A guard is re-routed through the corridor you wear out.
  const worn = topOf(memory.tiles, 6).filter(([key]) => {
    const p = parse(key);
    return house.tiles[at(p.x, p.y)] !== TILE.WALL;
  });
  if (worn.length) {
    const target = parse(rng ? rng.pick(worn.slice(0, 3))[0] : worn[0][0]);
    const guard = house.guards.reduce((best, g) =>
      dist(g, target) < dist(best, target) ? g : best,
    );
    guard.route.splice(guard.leg, 0, { x: target.x, y: target.y });
    if (guard.route.length > 6) guard.route.pop();
    notes.push({ id: 'route', x: target.x, y: target.y });
  }

  // 4. If you are always quick, someone starts their round earlier.
  const typical = median(memory.lengths);
  if (memory.attempts >= 3 && typical > 0 && typical <= 14 && house.guards.length) {
    const guard = house.guards[memory.attempts % house.guards.length];
    guard.leg = (guard.leg + 1) % guard.route.length;
    notes.push({ id: 'hour' });
  }

  // 5. Eventually, another pair of eyes.
  if (memory.escapes >= 2 && house.guards.length < 4 && memory.escapes % 2 === 0) {
    const spots = openTiles(house);
    const home = rng ? rng.pick(spots) : spots[0];
    house.guards.push({
      id: house.guards.length,
      x: home.x,
      y: home.y,
      dir: 0,
      route: [home, rng ? rng.pick(spots) : spots[spots.length - 1], { ...house.vault, y: house.vault.y + 1 }],
      leg: 0,
      patience: 0,
    });
    notes.push({ id: 'hire' });
  }

  house.notes = notes;
  return notes;
}

function dist(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function median(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[sorted.length >> 1];
}

function openTiles(house) {
  const out = [];
  for (let y = 1; y < 10; y++) {
    for (let x = 1; x < W - 1; x++) {
      if (house.tiles[at(x, y)] === TILE.FLOOR) out.push({ x, y });
    }
  }
  return out;
}

/**
 * How predictable you have been, 0..1. Shown to the player as pressure: the
 * higher it is, the more the house has to work with next time.
 */
export function predictability(memory) {
  const counts = [...memory.tiles.values()];
  if (counts.length < 4 || memory.attempts < 2) return 0;
  const total = counts.reduce((s, v) => s + v, 0);
  const top = counts.sort((a, b) => b - a).slice(0, 8).reduce((s, v) => s + v, 0);
  return Math.min(1, (top / total) * (memory.attempts >= 3 ? 1.15 : 0.9));
}

/** Tiles the house currently considers "yours" — drawn as worn carpet. */
export function wornTiles(memory, n = 10) {
  return topOf(memory.tiles, n)
    .filter(([, count]) => count >= 2)
    .map(([key, count]) => ({ ...parse(key), count }));
}
