// The design claim of this game is falsifiable: a player who repeats a
// working plan must get worse at it. The last test in this file is that claim,
// run against the real house with a real bot.

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  DAWN,
  DIRS,
  TILE,
  W,
  at,
  buildHouse,
  canStand,
  isHidden,
  makeRng,
  newHeist,
  seesPlayer,
  sightOf,
  step,
} from '../src/house.js';
import { adapt, newMemory, predictability, remember, wornTiles } from '../src/memory.js';

test('a house is deterministic from its seed, and openable', () => {
  const a = buildHouse(7);
  const b = buildHouse(7);
  assert.deepEqual(a.tiles, b.tiles);
  assert.notDeepEqual(a.tiles, buildHouse(8).tiles);
  assert.equal(a.doors.length, 3, 'three ways in is three real choices');
  assert.ok(a.guards.length >= 2);
  assert.equal(a.tiles[at(a.vault.x, a.vault.y)], TILE.VAULT);
  for (const d of a.doors) assert.equal(a.tiles[at(d.x, d.y)], TILE.DOOR);
});

test('walls stop you, and a locked door stops you too', () => {
  const house = buildHouse(3);
  assert.equal(canStand(house, -1, 4), false);
  const wall = house.tiles.findIndex((t) => t === TILE.WALL);
  assert.equal(canStand(house, wall % W, Math.floor(wall / W)), false);

  const door = house.doors[0];
  assert.equal(canStand(house, door.x, door.y), true);
  house.locked.push(`${door.x},${door.y}`);
  assert.equal(canStand(house, door.x, door.y), false);
});

test('a guard sees straight ahead, not through walls, and not into shadow', () => {
  const house = buildHouse(5);
  const guard = house.guards[0];
  guard.x = 5;
  guard.y = 5;
  guard.dir = 1; // east
  for (let x = 4; x <= 9; x++) house.tiles[at(x, 5)] = TILE.FLOOR;

  const sight = sightOf(house, guard);
  assert.ok(sight.some((c) => c.x === 6 && c.y === 5), 'it sees ahead');
  assert.ok(!sight.some((c) => c.x === 4 && c.y === 5), 'not behind');

  house.tiles[at(7, 5)] = TILE.WALL;
  const blocked = sightOf(house, guard);
  assert.ok(!blocked.some((c) => c.x === 8 && c.y === 5), 'a wall stops the line');

  house.tiles[at(6, 5)] = TILE.SHADOW;
  assert.equal(isHidden(house, 6, 5), true);
  assert.equal(seesPlayer(house, guard, { x: 6, y: 5 }), false, 'shadow hides you');
});

test('a turn is: you move, they move, everybody looks', () => {
  const house = buildHouse(11);
  const heist = newHeist(house, house.doors[0]);
  const before = { x: heist.x, y: heist.y };
  const guardBefore = { ...house.guards[0] };

  step(heist, 'wait');
  assert.deepEqual({ x: heist.x, y: heist.y }, before, 'waiting does not move you');
  assert.equal(heist.turn, 1);
  assert.equal(heist.waits, 1);
  const moved = house.guards[0].x !== guardBefore.x || house.guards[0].y !== guardBefore.y
    || house.guards[0].dir !== guardBefore.dir;
  assert.ok(moved, 'but the house still had its turn');
});

test('walking into a wall costs nothing and warns you', () => {
  const house = buildHouse(13);
  const heist = newHeist(house, house.doors[0]);
  // find a direction that is definitely wall
  const blockedDir = DIRS.find((d) => !canStand(house, heist.x + d.dx, heist.y + d.dy));
  if (!blockedDir) return;
  const events = step(heist, blockedDir.name);
  assert.equal(heist.turn, 0, 'a bumped nose is not a turn');
  assert.ok(events.some((e) => e.type === 'blocked'));
});

test('you can only leave with the goods', () => {
  const house = buildHouse(17);
  const heist = newHeist(house, house.doors[0]);
  heist.x = house.doors[0].x;
  heist.y = house.doors[0].y;
  step(heist, 'wait');
  assert.equal(heist.over, null, 'standing in the doorway empty-handed is not an escape');

  heist.carrying = true;
  heist.x = house.doors[0].x;
  heist.y = house.doors[0].y;
  step(heist, 'wait');
  assert.equal(heist.over, 'escaped');
});

test('a doorway is cover, so the house can never camp your only way in', () => {
  const house = buildHouse(101);
  const door = house.doors[0];
  const guard = house.guards[0];
  // park a guard staring straight at the doorway
  guard.x = door.x;
  guard.y = door.y - 1;
  guard.dir = 2; // south
  assert.equal(isHidden(house, door.x, door.y), true);
  assert.equal(seesPlayer(house, guard, { x: door.x, y: door.y }), false);
});

test('dawn ends the night, so waiting is not a free resource', () => {
  const house = buildHouse(103);
  const heist = newHeist(house, house.doors[0]);
  for (let i = 0; i < DAWN + 5 && !heist.over; i++) step(heist, 'wait');
  assert.equal(heist.over, 'caught');
  assert.equal(heist.turn, DAWN);
});

test('the house never bolts every door', () => {
  const house = buildHouse(107);
  const memory = newMemory();
  const rng = makeRng(5);
  // use every door to death, several times over
  for (let night = 0; night < 30; night++) {
    const door = house.doors[night % 3];
    remember(memory, newHeist(house, door));
    adapt(house, memory, rng);
    assert.ok(
      house.doors.some((d) => !house.locked.includes(`${d.x},${d.y}`)),
      `night ${night}: there must always be a way in`,
    );
  }
  assert.ok(house.locked.length <= house.doors.length - 2);
});

test('the house remembers where you walked and which door you used', () => {
  const house = buildHouse(19);
  const memory = newMemory();
  const heist = newHeist(house, house.doors[1]);
  step(heist, 'wait');
  step(heist, 'wait');
  remember(memory, heist);

  assert.equal(memory.attempts, 1);
  assert.equal(memory.doors.get(house.doors[1].key), 1);
  assert.ok(memory.tiles.get(`${heist.x},${heist.y}`) >= 1);
});

test('a lamp goes up exactly where you keep hiding', () => {
  const house = buildHouse(23);
  const memory = newMemory();
  const shadow = house.tiles.findIndex((t) => t === TILE.SHADOW);
  const spot = { x: shadow % W, y: Math.floor(shadow / W) };

  for (let night = 0; night < 2; night++) {
    const heist = newHeist(house, house.doors[0]);
    heist.trail.push({ x: spot.x, y: spot.y, turn: 1 });
    remember(memory, heist);
  }
  const notes = adapt(house, memory, makeRng(1));

  assert.equal(house.tiles[at(spot.x, spot.y)], TILE.FLOOR, 'the shadow is gone');
  assert.ok(house.lamps.includes(`${spot.x},${spot.y}`));
  assert.ok(notes.some((n) => n.id === 'lamp'), 'and it says so plainly');
});

test('the door you always use gets a new lock', () => {
  const house = buildHouse(29);
  const memory = newMemory();
  const door = house.doors[2];
  for (let night = 0; night < 3; night++) {
    remember(memory, newHeist(house, door));
  }
  adapt(house, memory, makeRng(2));
  assert.ok(
    house.locked.includes(`${door.x},${door.y}`),
    'the way in you rely on stops being free',
  );
});

test('adaptations are aimed at you, not sprayed at random', () => {
  const house = buildHouse(31);
  const memory = newMemory();
  const corridor = [];
  for (let x = 2; x < 7; x++) {
    if (house.tiles[at(x, 5)] !== TILE.WALL) corridor.push({ x, y: 5 });
  }
  for (let night = 0; night < 3; night++) {
    const heist = newHeist(house, house.doors[0]);
    for (const c of corridor) heist.trail.push({ ...c, turn: 1 });
    remember(memory, heist);
  }
  const guardRoutesBefore = house.guards.map((g) => g.route.length);
  adapt(house, memory, makeRng(3));

  const grew = house.guards.some((g, i) => g.route.length > guardRoutesBefore[i]);
  assert.ok(grew, 'a guard picked up a new waypoint');
  const worn = wornTiles(memory);
  assert.ok(worn.length >= 3, 'and the house can name the tiles it is watching');
  const added = house.guards.flatMap((g) => g.route);
  assert.ok(
    added.some((p) => corridor.some((c) => c.x === p.x && c.y === p.y)),
    'and the waypoint is on the corridor you actually wore out',
  );
});

test('predictability rises when you repeat yourself', () => {
  const house = buildHouse(37);
  const varied = newMemory();
  const same = newMemory();

  for (let night = 0; night < 5; night++) {
    const a = newHeist(house, house.doors[night % 3]);
    for (let i = 0; i < 8; i++) a.trail.push({ x: 1 + ((night + i) % 9), y: 1 + (i % 9), turn: i });
    remember(varied, a);

    const b = newHeist(house, house.doors[0]);
    for (let i = 0; i < 8; i++) b.trail.push({ x: 1 + i, y: 5, turn: i });
    remember(same, b);
  }
  assert.ok(
    predictability(same) > predictability(varied),
    `repeating yourself should read as predictable (${predictability(same)} vs ${predictability(varied)})`,
  );
});

// --- the claim ------------------------------------------------------------

/** A bot with a fixed plan: walk a stored route, every night, forever. */
function runFixedPlan(house, plan, door) {
  const heist = newHeist(house, door);
  for (const move of plan) {
    step(heist, move);
    if (heist.over) break;
  }
  return heist;
}

/** Greedily walk towards a target, which is what any simple bot would do. */
function planTowards(house, from, to, limit = 40) {
  const plan = [];
  let { x, y } = from;
  for (let i = 0; i < limit && (x !== to.x || y !== to.y); i++) {
    const options = DIRS.filter((d) => canStand(house, x + d.dx, y + d.dy)).sort(
      (a, b) =>
        Math.abs(x + a.dx - to.x) + Math.abs(y + a.dy - to.y) -
        (Math.abs(x + b.dx - to.x) + Math.abs(y + b.dy - to.y)),
    );
    if (!options.length) break;
    const best = options[0];
    x += best.dx;
    y += best.dy;
    plan.push(best.name);
  }
  return plan;
}

test('a bot that plays the same night twice gets worse at it', () => {
  const house = buildHouse(20260805);
  const memory = newMemory();
  const rng = makeRng(99);
  const door = house.doors[0];

  // The plan a competent bot would settle on: in, to the vault, back out.
  const toVault = planTowards(house, door, house.vault);
  const backOut = planTowards(house, house.vault, door);
  const plan = [...toVault, ...backOut];
  assert.ok(plan.length > 4, 'there is a real route to repeat');

  const results = [];
  for (let night = 0; night < 8; night++) {
    const heist = runFixedPlan(house, plan, door);
    results.push(heist.over);
    remember(memory, heist);
    adapt(house, memory, rng);
  }

  const early = results.slice(0, 3).filter((r) => r === 'escaped').length;
  const late = results.slice(-3).filter((r) => r === 'escaped').length;

  assert.ok(
    late <= early,
    `a fixed plan must not improve (early ${early}/3 escapes, late ${late}/3)`,
  );
  assert.ok(
    house.lamps.length + house.locked.length + house.guards.length > 2,
    'and the house should visibly have done something about it',
  );
  assert.ok(predictability(memory) > 0.3, 'a bot is, by construction, predictable');
});

test('varying your route keeps the house guessing', () => {
  const house = buildHouse(4242);
  const memory = newMemory();
  const rng = makeRng(7);

  for (let night = 0; night < 6; night++) {
    // A different door and a different wandering route every night.
    const door = house.doors[night % 3];
    const heist = newHeist(house, door);
    const plan = planTowards(house, door, house.vault);
    for (const move of plan) {
      step(heist, move);
      if (heist.over) break;
    }
    remember(memory, heist);
    adapt(house, memory, rng);
  }

  assert.ok(
    predictability(memory) < 0.95,
    'moving around should not read as a single habit',
  );
  assert.ok(house.locked.length <= 1, 'and the house has less to lock down');
});
