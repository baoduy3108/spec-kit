import test from 'node:test';
import assert from 'node:assert/strict';

import {
  CFG,
  addPlayer,
  averageLight,
  createWorld,
  nearestBeacon,
  regionIndex,
  removePlayer,
  setInput,
  snapshotFor,
  step,
} from '../server/world.js';

const run = (world, seconds, dt = 1 / 20) => {
  const events = [];
  for (let t = 0; t < seconds; t += dt) events.push(...step(world, dt));
  return events;
};

test('a fresh world is dark, seeded and reproducible', () => {
  const a = createWorld(42);
  const b = createWorld(42);
  assert.equal(a.beacons.length, CFG.BEACON_COUNT);
  assert.deepEqual(
    a.beacons.map((x) => [x.x, x.y]),
    b.beacons.map((x) => [x.x, x.y]),
  );
  assert.ok(averageLight(a) < 0.2, 'night starts dark');
  assert.ok(a.motes.size > 100, 'but not empty');

  const c = createWorld(43);
  assert.notDeepEqual(
    a.beacons.map((x) => [x.x, x.y]),
    c.beacons.map((x) => [x.x, x.y]),
  );
});

test('regions cover the map and nothing falls off the edge', () => {
  assert.equal(regionIndex(0, 0), 0);
  assert.equal(regionIndex(CFG.W, CFG.H), CFG.REGIONS * CFG.REGIONS - 1);
  assert.equal(regionIndex(-500, -500), 0, 'out of bounds clamps in');
  assert.equal(regionIndex(CFG.W * 2, CFG.H * 2), CFG.REGIONS * CFG.REGIONS - 1);
});

test('players spawn at a beacon and move where they are told', () => {
  const world = createWorld(7);
  const p = addPlayer(world, 'a', 'tester');
  const home = nearestBeacon(world, p.x, p.y);
  assert.ok(Math.hypot(p.x - home.x, p.y - home.y) < 200, 'spawns on safe ground');

  setInput(world, 'a', 1, 0);
  const x0 = p.x;
  step(world, 1);
  assert.ok(p.x > x0, 'moves right');
  assert.ok(Math.abs(p.x - x0 - CFG.PLAYER_SPEED) < 2, 'at the speed the server owns');

  setInput(world, 'a', 0, 0);
  const x1 = p.x;
  step(world, 1);
  assert.equal(p.x, x1, 'and stops when told');
});

test('input is normalised, so diagonals are not faster', () => {
  const world = createWorld(7);
  const p = addPlayer(world, 'a');
  setInput(world, 'a', 99, 99);
  assert.ok(Math.abs(Math.hypot(p.dx, p.dy) - 1) < 1e-9);
  setInput(world, 'a', Number.NaN, 5);
  assert.equal(p.dx, 0);
  assert.equal(p.dy, 0);
});

test('a player cannot leave the map', () => {
  const world = createWorld(7);
  addPlayer(world, 'a');
  setInput(world, 'a', -1, -1);
  run(world, 60);
  const p = world.players.get('a');
  assert.ok(p.x >= 0 && p.y >= 0);
  setInput(world, 'a', 1, 1);
  run(world, 120);
  assert.ok(p.x <= CFG.W && p.y <= CFG.H);
});

test('touching a mote picks it up, up to the carry cap', () => {
  const world = createWorld(3);
  const p = addPlayer(world, 'a');
  world.motes.clear();
  for (let i = 0; i < CFG.CARRY_CAP + 10; i++) {
    world.motes.set(1000 + i, { id: 1000 + i, x: p.x, y: p.y });
  }
  step(world, 1 / 20);
  assert.equal(p.carry, CFG.CARRY_CAP, 'hands are full');
  assert.equal(world.motes.size, 10, 'and the rest are still there');
});

test('depositing at a beacon turns motes into light', () => {
  const world = createWorld(5);
  const p = addPlayer(world, 'a');
  const beacon = world.beacons[0];
  p.x = beacon.x;
  p.y = beacon.y;
  p.carry = 20;
  const before = beacon.charge;

  const events = step(world, 1 / 20);
  assert.equal(p.carry, 0);
  assert.equal(p.banked, 20);
  assert.ok(beacon.charge > before);
  const deposit = events.find((e) => e.type === 'deposit');
  assert.equal(deposit.motes, 20);
  assert.equal(deposit.coop, 1, 'alone is the baseline');
  assert.equal(world.contributions.get('a'), 20);
});

test('banking together is worth more than banking alone', () => {
  const world = createWorld(5);
  const beacon = world.beacons[0];
  for (const id of ['a', 'b', 'c']) {
    const p = addPlayer(world, id);
    p.x = beacon.x;
    p.y = beacon.y;
    p.carry = 10;
  }
  const events = step(world, 1 / 20);
  const coops = events.filter((e) => e.type === 'deposit').map((e) => e.coop);
  assert.equal(coops.length, 3);
  assert.ok(Math.max(...coops) > 1, 'a crowd multiplies the deposit');
  assert.ok(coops[coops.length - 1] > coops[0], 'and the bonus builds as people arrive');
});

test('light spreads from charged beacons and decays everywhere else', () => {
  const world = createWorld(11);
  const beacon = world.beacons[0];
  beacon.charge = 2;
  const idx = regionIndex(beacon.x, beacon.y);
  const far = regionIndex(
    (beacon.x + CFG.W / 2) % CFG.W,
    (beacon.y + CFG.H / 2) % CFG.H,
  );
  const farBefore = world.light[far];
  run(world, 20);
  assert.ok(world.light[idx] > 0.5, 'the beacon lights its own ground');
  assert.ok(world.light[far] < farBefore, 'and the dark creeps back elsewhere');
});

test('an untended world goes dark', () => {
  const world = createWorld(13);
  run(world, 60);
  assert.ok(averageLight(world) < 0.12, 'nobody tending means night wins');
});

test('shades hunt, catch, and cost you what you were carrying', () => {
  const world = createWorld(17);
  const p = addPlayer(world, 'a');
  p.invuln = 0;
  p.carry = 12;
  p.x = 2000;
  p.y = 2000;
  world.light[regionIndex(p.x, p.y)] = 0;
  world.shades.set(9001, { id: 9001, x: p.x + 300, y: p.y, vx: 0, vy: 0, target: 0 });

  const events = run(world, 6);
  const caught = events.find((e) => e.type === 'caught');
  assert.ok(caught, 'the shade should have closed the gap');
  assert.equal(caught.motes, 12);
  assert.equal(p.carry, 0);
  assert.ok(p.invuln > 0, 'and you get a moment to breathe');
  const home = world.beacons[caught.beacon];
  assert.ok(Math.hypot(p.x - home.x, p.y - home.y) < 200, 'you wake at a beacon');
});

test('shades cannot touch you while you are invulnerable', () => {
  const world = createWorld(17);
  const p = addPlayer(world, 'a');
  // Out in the open, well away from any beacon (a beacon would bank the motes).
  p.x = 60;
  p.y = 60;
  p.carry = 5;
  p.invuln = 99;
  world.shades.set(9002, { id: 9002, x: p.x, y: p.y, vx: 0, vy: 0, target: 0 });
  const events = run(world, 2);
  assert.equal(events.filter((e) => e.type === 'caught').length, 0);
  assert.equal(p.carry, 5);
});

test('bright ground burns shades away', () => {
  const world = createWorld(19);
  // Bright enough to burn (>0.72), dim enough not to trigger dawn (<0.8).
  world.light.fill(0.78);
  world.shades.set(9003, { id: 9003, x: 1000, y: 1000, vx: 0, vy: 0, target: 0 });
  const events = run(world, 1);
  assert.ok(events.some((e) => e.type === 'burn'));
  assert.equal(world.shades.size, 0);
});

test('darkness breeds shades; light breeds motes', () => {
  const dark = createWorld(23);
  dark.motes.clear();
  run(dark, 30);
  const darkShades = dark.shades.size;

  const bright = createWorld(23);
  bright.motes.clear();
  bright.light.fill(0.78); // just under the dawn threshold
  run(bright, 30);

  assert.ok(darkShades > bright.shades.size, 'the dark is where they come from');
  assert.ok(bright.motes.size > dark.motes.size, 'and the light is where food grows');
});

test('dawn credits everyone, then night falls somewhere new', () => {
  const world = createWorld(29);
  const p = addPlayer(world, 'a', 'lamplighter');
  world.contributions.set('a', 400);
  p.carry = 3;
  const beaconsBefore = world.beacons.map((b) => [b.x, b.y]);
  world.light.fill(1);

  const events = run(world, 0.2);
  const dawn = events.find((e) => e.type === 'dawn');
  assert.ok(dawn, 'a fully lit world should break into dawn');
  assert.equal(dawn.night, 1);
  assert.equal(dawn.board[0].name, 'lamplighter');
  assert.equal(dawn.board[0].motes, 400);

  assert.equal(world.night, 2);
  assert.ok(averageLight(world) < 0.2, 'and it is night again');
  assert.equal(world.contributions.size, 0);
  assert.equal(p.carry, 0);
  assert.notDeepEqual(
    world.beacons.map((b) => [b.x, b.y]),
    beaconsBefore,
    'in a different landscape',
  );
});

test('snapshots only contain what a player could see', () => {
  const world = createWorld(31);
  const me = addPlayer(world, 'a');
  const near = addPlayer(world, 'b');
  const far = addPlayer(world, 'c');
  near.x = me.x + 200;
  near.y = me.y;
  far.x = (me.x + 3000) % CFG.W;
  far.y = (me.y + 3000) % CFG.H;

  world.motes.clear();
  world.motes.set(1, { id: 1, x: me.x + 100, y: me.y });
  world.motes.set(2, { id: 2, x: far.x, y: far.y });

  const snap = snapshotFor(world, 'a', 1000);
  const ids = snap.players.map((p) => p[0]);
  assert.ok(ids.includes('b'));
  assert.ok(!ids.includes('c'), 'the far player is culled');
  assert.ok(!ids.includes('a'), 'you are not in your own player list');
  assert.deepEqual(
    snap.motes.map((m) => m[0]),
    [1],
  );
  assert.equal(snap.beacons.length, CFG.BEACON_COUNT, 'beacons are always known');
  assert.equal(snap.light.length, CFG.REGIONS * CFG.REGIONS);
  assert.equal(snap.online, 3);
  assert.equal(snapshotFor(world, 'nobody'), null);
});

test('a snapshot stays small even in a crowded world', () => {
  const world = createWorld(37);
  for (let i = 0; i < 200; i++) {
    const p = addPlayer(world, `p${i}`);
    p.x = (i * 137) % CFG.W;
    p.y = (i * 311) % CFG.H;
  }
  run(world, 5);
  const bytes = JSON.stringify(snapshotFor(world, 'p0')).length;
  assert.ok(bytes < 24000, `snapshot was ${bytes} bytes`);
});

test('leaving removes you from the world', () => {
  const world = createWorld(41);
  addPlayer(world, 'a');
  addPlayer(world, 'b');
  removePlayer(world, 'a');
  assert.equal(world.players.size, 1);
  assert.equal(snapshotFor(world, 'a'), null);
  step(world, 1 / 20);
});

test('two hundred players for a minute stays stable and quick', () => {
  const world = createWorld(43);
  for (let i = 0; i < 200; i++) {
    addPlayer(world, `p${i}`);
    setInput(world, `p${i}`, Math.cos(i), Math.sin(i));
  }
  const started = Date.now();
  run(world, 60);
  const elapsed = Date.now() - started;

  for (const p of world.players.values()) {
    assert.ok(Number.isFinite(p.x) && Number.isFinite(p.y));
    assert.ok(p.carry >= 0 && p.carry <= CFG.CARRY_CAP);
  }
  assert.ok(world.motes.size <= CFG.MOTE_MAX);
  assert.ok(world.shades.size <= CFG.SHADE_MAX);
  assert.ok(elapsed < 8000, `a minute of 200-player world took ${elapsed}ms`);
});
