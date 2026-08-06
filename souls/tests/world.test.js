// The map's claim: it folds back on itself, and it can never strand you.

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  FOES,
  LINKS,
  ROOMS,
  clearRoom,
  depths,
  exitsFrom,
  foesIn,
  fullyConnected,
  moveTo,
  newWorld,
  openShortcut,
  reachable,
  roomOf,
  routeBetween,
  shortcutValue,
  strandedRooms,
  threatOf,
} from '../src/world.js';

test('every room exists, is reachable, and nothing points at nowhere', () => {
  const ids = new Set(ROOMS.map((r) => r.id));
  assert.equal(ids.size, ROOMS.length, 'no duplicate room ids');
  for (const edge of LINKS) {
    assert.ok(ids.has(edge.a), `${edge.a} is not a room`);
    assert.ok(ids.has(edge.b), `${edge.b} is not a room`);
  }
  assert.ok(fullyConnected(), 'the whole map has to be one place');
});

test('the long way round is walkable before any shortcut is open', () => {
  const world = newWorld();
  const route = routeBetween(world, 'fire', 'lantern');
  assert.ok(route, 'you can always reach the boss the hard way');
  assert.equal(route[0], 'fire');
  assert.equal(route[route.length - 1], 'lantern');
  assert.ok(route.length >= 8, `the first walk should be long (${route.length} rooms)`);
});

test('no room can strand you away from every fire', () => {
  assert.deepEqual(strandedRooms(), [], 'a room you cannot leave is a lost save');
});

test('a shortcut only opens from the far side, and only once', () => {
  const world = newWorld();
  assert.equal(openShortcut(world, 'crypt-ladder'), false, 'not from the fire');
  world.at = 'crypt';
  assert.equal(openShortcut(world, 'crypt-ladder'), true);
  assert.equal(openShortcut(world, 'crypt-ladder'), false, 'and not twice');
  assert.ok(exitsFrom(world, 'yard').includes('crypt'), 'now it works both ways');
});

test('every shortcut actually shortens something', () => {
  const shortcuts = LINKS.filter((l) => l.shortcut).map((l) => l.shortcut);
  assert.ok(shortcuts.length >= 4, 'a world this size needs several folds');
  for (const name of shortcuts) {
    const fromFire = shortcutValue(name, 'fire', 'lantern');
    const fromAshes = shortcutValue(name, 'ashes', 'lantern');
    assert.ok(
      fromFire > 0 || fromAshes > 0,
      `${name} saves nothing from any fire — it is scenery, not a shortcut`,
    );
  }
});

test('opening everything makes the world small, which is the point', () => {
  const shut = newWorld();
  const open = newWorld();
  open.opened = LINKS.filter((l) => l.shortcut).map((l) => l.shortcut);
  const before = routeBetween(shut, 'fire', 'lantern').length;
  const after = routeBetween(open, 'fire', 'lantern').length;
  assert.ok(after < before, `the map has to shrink as you learn it (${before} → ${after})`);
});

test('walking is one room at a time, and sitting at a fire moves your respawn', () => {
  const world = newWorld();
  assert.equal(moveTo(world, 'crypt'), false, 'no teleporting across the map');
  assert.equal(moveTo(world, 'yard'), true);
  assert.equal(world.at, 'yard');
  assert.ok(world.seen.includes('yard'));

  const route = routeBetween(world, 'yard', 'ossuary');
  for (const id of route.slice(1)) assert.equal(moveTo(world, id), true, `walk to ${id}`);
  assert.equal(world.fire, 'ossuary', 'the last fire you sat at is where you come back');
});

test('rooms hold real foes, and clearing one empties it', () => {
  const world = newWorld();
  const packed = ROOMS.filter((r) => r.foes && r.foes.length);
  assert.ok(packed.length >= 8, 'a map to explore needs things living in it');
  for (const room of packed) {
    for (const kind of room.foes) assert.ok(FOES[kind], `${kind} has no stat block`);
  }
  assert.ok(foesIn(world, 'yard').length > 0);
  clearRoom(world, 'yard');
  assert.equal(foesIn(world, 'yard').length, 0);
});

test('it gets more dangerous the further in you go', () => {
  const deep = depths();
  const near = ROOMS.filter((r) => deep.get(r.id) <= 3 && r.foes);
  const far = ROOMS.filter((r) => deep.get(r.id) >= 6 && r.foes);
  assert.ok(near.length && far.length, 'the map needs a near half and a far half');

  const mean = (rooms) => rooms.reduce((s, r) => s + threatOf(r.id), 0) / rooms.length;
  assert.ok(
    mean(far) > mean(near) * 1.5,
    `the far rooms have to bite harder (${Math.round(mean(near))} vs ${Math.round(mean(far))})`,
  );
  for (const room of ROOMS) assert.ok(deep.has(room.id), `${room.id} is off the map`);
});

test('there is a fire before each boss, and bosses sit behind fog', () => {
  const world = newWorld();
  for (const boss of ROOMS.filter((r) => r.boss)) {
    assert.equal(roomOf(boss.id).kind, 'fog');
    const fires = ROOMS.filter((r) => r.kind === 'bonfire');
    const nearest = Math.min(
      ...fires.map((f) => (routeBetween(world, f.id, boss.id) || { length: 99 }).length),
    );
    assert.ok(nearest <= 4, `${boss.id} is ${nearest} rooms from the nearest fire — too far to retry`);
  }
});

test('reachability grows as you open the world, never shrinks', () => {
  const world = newWorld();
  let previous = reachable(world).size;
  for (const name of ['crypt-ladder', 'gallery-lift', 'belfry-rope', 'rampart-drop']) {
    world.opened.push(name);
    const now = reachable(world).size;
    assert.ok(now >= previous, 'opening a door can never close another');
    previous = now;
  }
});
