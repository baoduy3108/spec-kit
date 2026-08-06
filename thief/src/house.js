// The house: a small turn-based mansion you are trying to rob.
//
// Everything is deterministic and DOM-free. One player move, then every guard
// moves, then everyone looks. No reflexes, no timers — the whole game is
// deciding where to be.

export const W = 11;
export const H = 11;

export const TILE = {
  FLOOR: 0,
  WALL: 1,
  /** You cannot be seen while standing in shadow. Lamps remove it. */
  SHADOW: 2,
  VAULT: 3,
  DOOR: 4,
};

export const DIRS = [
  { dx: 0, dy: -1, name: 'north' },
  { dx: 1, dy: 0, name: 'east' },
  { dx: 0, dy: 1, name: 'south' },
  { dx: -1, dy: 0, name: 'west' },
];

export const at = (x, y) => y * W + x;
export const inside = (x, y) => x >= 0 && y >= 0 && x < W && y < H;

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function makeRng(seed) {
  const next = mulberry32(seed);
  return {
    next,
    int: (a, b) => a + Math.floor(next() * (b - a + 1)),
    pick: (arr) => arr[Math.floor(next() * arr.length) % arr.length],
    chance: (p) => next() < p,
  };
}

/**
 * A house is rooms carved out of solid wall, three ways in, one vault, and
 * guards walking loops. Deterministic from the seed so a house can be
 * described by a number.
 */
export function buildHouse(seed = 1) {
  const rng = makeRng(seed);
  const tiles = new Array(W * H).fill(TILE.WALL);

  // Carve a lattice of rooms with corridors between them.
  for (let ry = 1; ry < H - 1; ry++) {
    for (let rx = 1; rx < W - 1; rx++) {
      const inRoom = rx % 4 !== 0 && ry % 4 !== 0;
      const onCorridor = rx % 2 === 1 || ry % 2 === 1;
      if (inRoom || onCorridor) tiles[at(rx, ry)] = TILE.FLOOR;
    }
  }

  // Shadows: corners of rooms, where a thief would actually stand.
  for (let y = 2; y < H - 2; y++) {
    for (let x = 2; x < W - 2; x++) {
      if (tiles[at(x, y)] !== TILE.FLOOR) continue;
      if (rng.chance(0.13)) tiles[at(x, y)] = TILE.SHADOW;
    }
  }

  // Three ways in, on three different walls: the choice of door matters.
  // Doors carry an id, not a name — the words are chosen at drawing time so
  // the language button can rewrite twenty nights of history at once.
  const doors = [
    { x: rng.int(2, W - 3), y: H - 1, key: 'garden' },
    { x: 0, y: rng.int(2, H - 3), key: 'chute' },
    { x: W - 1, y: rng.int(2, H - 3), key: 'stair' },
  ];
  for (const d of doors) {
    tiles[at(d.x, d.y)] = TILE.DOOR;
    // make sure the door opens onto something
    const inx = d.x === 0 ? 1 : d.x === W - 1 ? W - 2 : d.x;
    const iny = d.y === 0 ? 1 : d.y === H - 1 ? H - 2 : d.y;
    tiles[at(inx, iny)] = TILE.FLOOR;
  }

  const vault = { x: Math.floor(W / 2), y: 1 };
  tiles[at(vault.x, vault.y)] = TILE.VAULT;
  tiles[at(vault.x, vault.y + 1)] = TILE.FLOOR;

  const guards = [];
  for (let i = 0; i < 2; i++) {
    guards.push(makeGuard(rng, tiles, i));
  }

  return { seed, tiles, doors, vault, guards, lamps: [], locked: [], notes: [] };
}

function makeGuard(rng, tiles, id) {
  const spots = [];
  for (let y = 1; y < H - 1; y++) {
    for (let x = 1; x < W - 1; x++) {
      if (tiles[at(x, y)] === TILE.FLOOR) spots.push({ x, y });
    }
  }
  const route = [];
  for (let k = 0; k < 3; k++) route.push(rng.pick(spots));
  return { id, x: route[0].x, y: route[0].y, dir: 0, route, leg: 0, patience: 0 };
}

// --- looking --------------------------------------------------------------

/** Tiles a guard can see: straight ahead until a wall, plus the two beside. */
export function sightOf(house, guard, range = 4) {
  const seen = [];
  const d = DIRS[guard.dir];
  for (let step = 1; step <= range; step++) {
    const x = guard.x + d.dx * step;
    const y = guard.y + d.dy * step;
    if (!inside(x, y) || house.tiles[at(x, y)] === TILE.WALL) break;
    seen.push({ x, y });
    // peripheral vision: one tile either side, but only close up
    if (step <= 2) {
      for (const side of [-1, 1]) {
        const sx = x + d.dy * side;
        const sy = y - d.dx * side;
        if (inside(sx, sy) && house.tiles[at(sx, sy)] !== TILE.WALL) seen.push({ x: sx, y: sy });
      }
    }
  }
  return seen;
}

/** Turns in a night. Waiting is free; waiting forever is not. */
export const DAWN = 45;

/**
 * Shadow hides you — and so does a doorway, because you are half out of it
 * already. That second rule exists so the house can never park a guard on the
 * only way in and win before you have made a decision.
 */
export function isHidden(house, x, y) {
  const t = house.tiles[at(x, y)];
  return t === TILE.SHADOW || t === TILE.DOOR;
}

export function seesPlayer(house, guard, player) {
  if (isHidden(house, player.x, player.y)) return false;
  return sightOf(house, guard).some((c) => c.x === player.x && c.y === player.y);
}

// --- a heist --------------------------------------------------------------

export function newHeist(house, door) {
  return {
    house,
    door,
    x: door.x,
    y: door.y,
    turn: 0,
    carrying: false,
    over: null, // 'caught' | 'escaped'
    /** Everything the house will remember afterwards. */
    trail: [{ x: door.x, y: door.y, turn: 0 }],
    doorUsed: door.key,
    waits: 0,
    events: [],
  };
}

export function canStand(house, x, y) {
  if (!inside(x, y)) return false;
  const t = house.tiles[at(x, y)];
  if (t === TILE.WALL) return false;
  if (t === TILE.DOOR && house.locked.includes(`${x},${y}`)) return false;
  return true;
}

/**
 * One turn: you move (or wait), then the guards walk their loop, then
 * everybody looks.
 * @param move 'north'|'east'|'south'|'west'|'wait'
 */
export function step(heist, move) {
  const house = heist.house;
  heist.events.length = 0;
  if (heist.over) return heist.events;

  if (move === 'wait') {
    heist.waits++;
  } else {
    const dir = DIRS.find((d) => d.name === move);
    if (!dir) return heist.events;
    const nx = heist.x + dir.dx;
    const ny = heist.y + dir.dy;
    if (!canStand(house, nx, ny)) {
      heist.events.push({ type: 'blocked', x: nx, y: ny });
      return heist.events;
    }
    heist.x = nx;
    heist.y = ny;
  }

  heist.turn++;
  heist.trail.push({ x: heist.x, y: heist.y, turn: heist.turn });

  if (house.tiles[at(heist.x, heist.y)] === TILE.VAULT && !heist.carrying) {
    heist.carrying = true;
    heist.events.push({ type: 'took' });
  }

  for (const guard of house.guards) walkGuard(house, guard);

  for (const guard of house.guards) {
    if (seesPlayer(house, guard, heist)) {
      heist.over = 'caught';
      heist.events.push({ type: 'caught', guard: guard.id });
      return heist.events;
    }
  }

  const onDoor = house.tiles[at(heist.x, heist.y)] === TILE.DOOR;
  if (onDoor && heist.carrying && heist.turn > 1) {
    heist.over = 'escaped';
    heist.events.push({ type: 'escaped' });
    return heist.events;
  }

  if (heist.turn >= DAWN) {
    heist.over = 'caught';
    heist.events.push({ type: 'dawn' });
  }
  return heist.events;
}

/**
 * Where a guard will be — and what they will be looking at — if you spend one
 * more turn. Pure: the real guard is untouched.
 *
 * Turn-based stealth is only fair when you can see the next beat coming, so
 * the game draws this cone faintly ahead of the guard. Guessing is not tension.
 */
export function previewGuard(house, guard) {
  const ghost = { ...guard, route: guard.route.map((p) => ({ ...p })) };
  walkGuard(house, ghost);
  return ghost;
}

function walkGuard(house, guard) {
  let target = guard.route[guard.leg];
  if (guard.x === target.x && guard.y === target.y) {
    // Arriving is not a turn spent standing still: pick the next waypoint and
    // keep walking, or a guard on a short route stalls forever.
    guard.leg = (guard.leg + 1) % guard.route.length;
    target = guard.route[guard.leg];
    if (guard.x === target.x && guard.y === target.y) {
      guard.dir = (guard.dir + 1) % 4;
      return;
    }
  }
  // Step towards the waypoint, preferring whichever axis is further off.
  const dx = Math.sign(target.x - guard.x);
  const dy = Math.sign(target.y - guard.y);
  const tryOrder =
    Math.abs(target.x - guard.x) >= Math.abs(target.y - guard.y)
      ? [
          { dx, dy: 0 },
          { dx: 0, dy },
        ]
      : [
          { dx: 0, dy },
          { dx, dy: 0 },
        ];
  for (const t of tryOrder) {
    if (!t.dx && !t.dy) continue;
    const nx = guard.x + t.dx;
    const ny = guard.y + t.dy;
    if (!inside(nx, ny) || house.tiles[at(nx, ny)] === TILE.WALL) continue;
    guard.x = nx;
    guard.y = ny;
    guard.dir = DIRS.findIndex((d) => d.dx === t.dx && d.dy === t.dy);
    return;
  }
  // Boxed in: turn on the spot rather than stand blind.
  guard.dir = (guard.dir + 1) % 4;
}
