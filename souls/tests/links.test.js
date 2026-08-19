import test from 'node:test';
import assert from 'node:assert/strict';
import { AREAS, ROOMS } from '../src/world.js';
import { linksOf, allLinks, reachable } from '../tools/links.js';
import { profile, platforms, gated, gaps, JUMP_UP } from '../tools/draw.js';

const byId = Object.fromEntries(ROOMS.map((r) => [r.id, r]));

test('every room in every area is on the spine', () => {
  for (const area of AREAS) {
    const seen = reachable(area.id);
    const missing = area.roomIds.filter((id) => !seen.has(id));
    assert.deepEqual(missing, [], `${area.id} strands ${missing.length} rooms`);
  }
});

test('the way out of an area is reachable from the way in', () => {
  for (const area of AREAS)
    assert.ok(reachable(area.id).has(area.exit),
      `${area.id}: cannot get from ${area.entrance} to ${area.exit}`);
});

test('the spine is never gated behind the pole', () => {
  // The whole discipline of a traversal unlock: it opens routes, not progress.
  // A climb link onto a pole-only ledge would put the way through behind it.
  for (const area of AREAS)
    for (const l of linksOf(area.id)) {
      if (l.dir !== 'up' || l.kind !== 'spine') continue;
      const room = byId[l.from];
      const locked = gated(room);
      const onLocked = locked.some(([a, b]) => l.at >= a - 0.6 && l.at <= b + 0.6);
      assert.ok(!onLocked, `${l.from}: the way on sits on a ledge only the pole reaches`);
    }
});

test('a door down is an actual hole, and a door up is an actual ledge', () => {
  for (const area of AREAS)
    for (const l of linksOf(area.id)) {
      if (l.dir === 'down') {
        const holes = gaps(profile(byId[l.from]));
        assert.ok(holes.some(([a, b]) => l.at >= a && l.at <= b),
          `${l.from}: a drop at ${l.at}m with solid floor under it`);
      }
      if (l.dir === 'up') {
        const high = platforms(byId[l.from]).filter((p) => p[2] >= JUMP_UP * 1.5);
        assert.ok(high.some(([a, b]) => l.at >= a - 0.6 && l.at <= b + 0.6),
          `${l.from}: a climb at ${l.at}m with nothing to climb onto`);
      }
    }
});

test('shortcuts lead to a fire, open from the far side, and are never required', () => {
  const all = allLinks();
  let cuts = 0;
  for (const area of AREAS) {
    const links = all[area.id];
    for (const l of links.filter((x) => x.kind === 'shortcut')) {
      cuts++;
      assert.equal(byId[l.to].kind, 'bonfire', `${l.from} shortcuts to something that is not a fire`);
      assert.equal(l.opens, 'far', 'a shortcut you can open from the near side is just a door');
      // it must lead BACKWARDS, or it is progress wearing a shortcut's name
      assert.ok(area.roomIds.indexOf(l.to) < area.roomIds.indexOf(l.from),
        `${l.from} -> ${l.to} is a shortcut that goes forwards`);
    }
    // and with every shortcut deleted, the area is still completable
    const spineOnly = links.filter((x) => x.kind === 'spine');
    const seen = new Set([area.entrance]);
    let grew = true;
    while (grew) {
      grew = false;
      for (const l of spineOnly)
        if (seen.has(l.from) && !seen.has(l.to)) { seen.add(l.to); grew = true; }
    }
    assert.ok(seen.has(area.exit), `${area.id} cannot be finished without a shortcut`);
  }
  assert.ok(cuts >= 30, `only ${cuts} shortcuts in ${AREAS.length} areas — dying still costs the whole walk`);
});

test('the map is not one long horizontal line any more', () => {
  const all = Object.values(allLinks()).flat();
  const spine = all.filter((l) => l.kind === 'spine');
  const vertical = spine.filter((l) => l.dir === 'up' || l.dir === 'down');
  const share = vertical.length / spine.length;
  assert.ok(share > 0.15,
    `only ${(share * 100).toFixed(0)}% of the way through is vertical — it still reads as a corridor`);
  assert.ok(share < 0.6,
    `${(share * 100).toFixed(0)}% vertical — the player never walks anywhere`);
});

test('a climb link carries the height Godot needs to fire it', () => {
  // Shipped without at_y once: Godot compared against a height that was never
  // exported, so every climb exit in the game was inert and the only way on was
  // still walking right.
  for (const area of AREAS)
    for (const l of linksOf(area.id)) {
      if (l.dir !== 'up') continue;
      assert.ok(typeof l.at_y === 'number' && l.at_y > 0, `${l.from}: climb link has no height`);
      const on = platforms(byId[l.from]).some(([a, b, y]) =>
        l.at >= a - 0.6 && l.at <= b + 0.6 && Math.abs(y - l.at_y) < 0.01);
      assert.ok(on, `${l.from}: climb link at ${l.at}m/${l.at_y}m matches no ledge`);
    }
});
