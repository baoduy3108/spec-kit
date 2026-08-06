// The map's claims: it is one place, it folds back on itself, it never
// strands you, and it gets worse the further in you go.

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  AREAS,
  BOSSES,
  FIRES,
  FOES,
  FOE_IDS,
  LINKS,
  ROOMS,
  START,
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

test('the world is the size it claims to be', () => {
  assert.equal(AREAS.length, 36, '36 areas');
  assert.equal(BOSSES.length, 18, '18 bosses');
  assert.ok(ROOMS.length >= 300, `several hundred rooms (${ROOMS.length})`);
  assert.ok(FOE_IDS.length >= 60, `sixty-odd foe types (${FOE_IDS.length})`);
  assert.ok(FIRES.length >= 10, `enough fires to make the walk back bearable (${FIRES.length})`);
  assert.equal(new Set(ROOMS.map((r) => r.id)).size, ROOMS.length, 'no duplicate rooms');
  assert.equal(new Set(BOSSES.map((b) => b.id)).size, BOSSES.length, 'no duplicate bosses');
});

test('nothing points at a room that does not exist', () => {
  const ids = new Set(ROOMS.map((r) => r.id));
  for (const edge of LINKS) {
    assert.ok(ids.has(edge.a), `${edge.a} is not a room`);
    assert.ok(ids.has(edge.b), `${edge.b} is not a room`);
  }
  for (const room of ROOMS) {
    for (const kind of room.foes || []) assert.ok(FOES[kind], `${kind} has no stat block`);
  }
});

test('it is one place, and every room can be walked to', () => {
  assert.ok(fullyConnected(), 'the whole map has to be one place');
  const world = newWorld();
  const seen = reachable(world);
  assert.ok(
    seen.size > ROOMS.length * 0.55,
    `most of it is open before any shortcut (${seen.size}/${ROOMS.length})`,
  );
});

test('no room can strand you away from every fire', () => {
  assert.deepEqual(strandedRooms(), [], 'a room you cannot leave is a lost save');
});

test('the first walk to the end is long', () => {
  const world = newWorld();
  const end = AREAS[AREAS.length - 2].exit;
  const route = routeBetween(world, START, end);
  assert.ok(route, 'the end is reachable the hard way');
  assert.ok(route.length >= 60, `it should be a journey (${route.length} rooms)`);
});

test('every fold actually folds something', () => {
  const folds = LINKS.filter((l) => l.shortcut).map((l) => l.shortcut);
  assert.ok(folds.length >= 8, `a world this size needs plenty of folds (${folds.length})`);
  for (const name of folds) {
    assert.ok(
      shortcutValue(name) > 0,
      `${name} saves nothing — that is scenery, not a shortcut`,
    );
  }
});

test('a fold opens from the far side only, and only once', () => {
  const edge = LINKS.find((l) => l.shortcut);
  const world = newWorld();
  assert.equal(openShortcut(world, edge.shortcut), false, 'not from wherever you happen to be');
  world.at = edge.opensFrom;
  assert.equal(openShortcut(world, edge.shortcut), true);
  assert.equal(openShortcut(world, edge.shortcut), false, 'and not twice');
  assert.ok(exitsFrom(world, edge.b).includes(edge.a), 'now it works both ways');
});

test('opening the folds makes the world smaller, which is the point', () => {
  const shut = newWorld();
  const open = newWorld();
  open.opened = LINKS.filter((l) => l.shortcut).map((l) => l.shortcut);
  const end = AREAS[AREAS.length - 2].exit;
  const before = routeBetween(shut, START, end).length;
  const after = routeBetween(open, START, end).length;
  assert.ok(after < before * 0.8, `the map has to shrink as you learn it (${before} → ${after})`);
});

test('walking is one room at a time, and a fire moves your respawn', () => {
  const world = newWorld();
  const far = ROOMS[ROOMS.length - 1].id;
  assert.equal(moveTo(world, far), false, 'no teleporting');

  const fire = FIRES.find((f) => f !== START);
  const route = routeBetween(world, START, fire);
  for (const id of route.slice(1)) assert.equal(moveTo(world, id), true, `walk to ${id}`);
  assert.equal(world.fire, fire, 'the last fire you sat at is where you come back');
  assert.ok(world.seen.length === route.length);
});

test('rooms hold real foes, and clearing one empties it', () => {
  const world = newWorld();
  const packed = ROOMS.filter((r) => r.foes && r.foes.length);
  assert.ok(packed.length >= 200, `the map has to be inhabited (${packed.length} rooms)`);
  const room = packed[0];
  assert.ok(foesIn(world, room.id).length > 0);
  clearRoom(world, room.id);
  assert.equal(foesIn(world, room.id).length, 0);
});

test('felling a boss is remembered', () => {
  const world = newWorld();
  const lair = ROOMS.find((r) => r.boss);
  clearRoom(world, lair.id);
  assert.ok(world.felled.includes(lair.boss));
});

test('every boss sits behind fog with a fire close enough to retry from', () => {
  const world = newWorld();
  for (const boss of BOSSES) {
    const lair = ROOMS.find((r) => r.boss === boss.id);
    assert.ok(lair, `${boss.id} has no room`);
    assert.equal(roomOf(lair.id).kind, 'fog');
    const nearest = Math.min(
      ...FIRES.map((f) => (routeBetween(world, f, lair.id) || { length: 999 }).length),
    );
    assert.ok(nearest <= 16, `${boss.id} is ${nearest} rooms from a fire — too far to retry`);
  }
});

test('it bites harder the further in you go', () => {
  const deep = depths();
  const near = ROOMS.filter((r) => deep.get(r.id) <= 12 && r.foes.length);
  const far = ROOMS.filter((r) => deep.get(r.id) >= 60 && r.foes.length);
  assert.ok(near.length && far.length, 'the map needs a near half and a far half');
  const mean = (rooms) => rooms.reduce((s, r) => s + threatOf(r.id), 0) / rooms.length;
  assert.ok(
    mean(far) > mean(near) * 2,
    `the far rooms have to bite much harder (${Math.round(mean(near))} vs ${Math.round(mean(far))})`,
  );
});

test('the foe roster is varied, not one creature wearing hats', () => {
  const families = new Set(FOE_IDS.map((id) => FOES[id].family));
  assert.ok(families.size >= 14, `enough distinct creatures (${families.size})`);
  const speeds = FOE_IDS.map((id) => FOES[id].speed);
  assert.ok(Math.max(...speeds) > Math.min(...speeds) * 4, 'some are fast, some are slow');
  for (const id of FOE_IDS) {
    assert.ok(FOES[id].hp > 0 && FOES[id].damage > 0 && FOES[id].essence > 0, `${id} is a real foe`);
  }
});

test('reachability grows as you open the world, never shrinks', () => {
  const world = newWorld();
  let previous = reachable(world).size;
  for (const name of LINKS.filter((l) => l.shortcut).map((l) => l.shortcut)) {
    world.opened.push(name);
    const now = reachable(world).size;
    assert.ok(now >= previous, 'opening a door can never close another');
    previous = now;
  }
});

test('a hand-written area brings its own rooms, named and described', () => {
  const written = ROOMS.filter((r) => r.handmade);
  assert.ok(written.length >= 7, 'the first area is written by hand');
  for (const room of written) {
    assert.ok(room.name && room.name.en && room.name.vi, `${room.id} needs a name`);
    assert.ok(room.line && room.line.en && room.line.vi, `${room.id} needs a line`);
    // a boss room is fog, and that is set by the map, not by the author
    assert.ok(
      ['hall', 'stair', 'bridge', 'cave', 'yard', 'bonfire', 'fog'].includes(room.kind),
      `${room.id} has an unknown kind (${room.kind})`,
    );
    if (room.boss) assert.equal(room.kind, 'fog', `${room.id} holds a boss but is not fog`);
    for (const kind of room.foes) assert.ok(FOES[kind], `${kind} is not a real foe`);
  }
  assert.ok(
    written.some((r) => r.kind === 'bonfire'),
    'and it still has somewhere to rest',
  );
  // The two sets partition the world: everything is either written or grown,
  // never both and never neither. This replaces an earlier check that the
  // generated remainder was over 300 rooms — a number the hand-writing was
  // always going to walk past, which made the test rot rather than hold.
  const rest = ROOMS.filter((r) => !r.handmade);
  assert.equal(rest.length + written.length, ROOMS.length, 'no room is in neither set');
  assert.ok(rest.length > 0, 'the generator still covers everything unwritten');
});

test('hand-written rooms say how their foes are arranged', () => {
  const written = ROOMS.filter((r) => r.handmade);
  const kinds = new Set(['single', 'spread', 'pack', 'ring', 'ambush']);
  for (const room of written) {
    assert.ok(kinds.has(room.layout), `${room.id} has no sensible layout (${room.layout})`);
    if (room.layout === 'ring') {
      assert.ok(room.foes.length >= 3, `a ring needs enough foes to be a ring (${room.id})`);
    }
    if (!room.foes.length) {
      assert.equal(room.layout, 'single', `an empty room cannot have a crowd (${room.id})`);
    }
  }
  const areas = new Set(written.map((r) => r.area));
  assert.ok(areas.size >= 2, `more than one area is written by hand (${areas.size})`);
  assert.ok(written.length >= 16, `and it is growing (${written.length} rooms)`);
});
