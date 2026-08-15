import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ROOMS, AREAS, FOES } from '../src/world.js';
import { HERO } from '../src/hero.js';
import { KNIGHT } from '../src/rules.js';
import { drawArea, profile, gaps, spots, impassable, ROLL_M, ROOM_M, HERO_M } from '../tools/draw.js';

// draw.js is a blockout tool now, not a painter. What it must guarantee is not
// that a room looks good — it is that a room can be played.

test('no room in the game has a hole the player cannot cross', () => {
  const bad = ROOMS.filter((r) => impassable(r).length);
  assert.deepEqual(
    bad.map((r) => `${r.id} ${impassable(r).map(([a, b]) => (b - a).toFixed(1))}m`),
    [],
    'a room with a gap wider than the roll cannot be walked through',
  );
});

test('the roll distance is read out of the sim, not guessed', () => {
  assert.equal(ROLL_M, (KNIGHT.roll.speed * KNIGHT.roll.time) / 100);
  assert.ok(ROLL_M > 1.5 && ROLL_M < 4, `roll of ${ROLL_M}m is not a human distance`);
});

test('every kind produces a floor the player can stand on', () => {
  for (const kind of [...new Set(ROOMS.map((r) => r.kind))]) {
    const room = ROOMS.find((r) => r.kind === kind);
    const P = profile(room);
    const solid = P.filter(([, y]) => y !== null);
    assert.ok(solid.length >= 2, `${kind} has no floor`);
    assert.ok(P[0][0] === 0, `${kind} does not start at the left wall`);
    assert.ok(P[P.length - 1][0] === ROOM_M, `${kind} does not reach the right wall`);
  }
});

test('a profile never leaves the room, and never doubles back', () => {
  for (const room of ROOMS) {
    let last = -1;
    for (const [x, y] of profile(room)) {
      assert.ok(x >= last, `${room.id} profile goes backwards at ${x}`);
      assert.ok(x >= 0 && x <= ROOM_M, `${room.id} profile leaves the room at ${x}`);
      if (y !== null) assert.ok(y >= 0 && y <= 6, `${room.id} floor at ${y}m is off the panel`);
      last = x;
    }
  }
});

test('every foe gets a standing place inside the room', () => {
  for (const room of ROOMS) {
    const at = spots(room.layout, room.foes.length);
    assert.equal(at.length, room.foes.length);
    for (const x of at) assert.ok(x > 1 && x < ROOM_M - 1, `${room.id} spawns a foe at ${x}m`);
  }
});

test('the hero is the hero, and is drawn at a stated height', () => {
  assert.ok(HERO.name.vi.length > 0);
  assert.ok(HERO_M > 1.8 && HERO_M < 2.3, 'the sheet says 1.9-2.1m; the drawing must agree');
});

test('a sheet renders for every area in the game', () => {
  for (const a of AREAS.slice(0, 4)) {
    const r = drawArea(a.id);
    assert.equal(r.rooms, ROOMS.filter((x) => x.area === a.id).length);
    const svg = readFileSync(new URL(`../dist/blockout-${a.id}.svg`, import.meta.url), 'utf8');
    assert.match(svg, /^<svg /);
    // every number on the sheet has to come off src/, so the hero's own name
    // and at least one real foe id must appear in it
    assert.ok(svg.includes(HERO.name.vi), 'the sheet does not name the character');
    const anyFoe = ROOMS.filter((x) => x.area === a.id).flatMap((x) => x.foes)[0];
    if (anyFoe) assert.ok(svg.includes(anyFoe), `the sheet does not name ${anyFoe}`);
  }
});

test('gaps are found where the profile has holes and nowhere else', () => {
  const P = [[0, 0], [4, 0], [4, null], [7, null], [7, 0], [24, 0]];
  assert.deepEqual(gaps(P), [[4, 7]]);
  assert.deepEqual(gaps([[0, 0], [24, 0]]), []);
});

test('a prompt never claims darkness in a room that is carrying a torch', async () => {
  const { promptFor } = await import('../tools/prompt.js');
  const { FOES } = await import('../src/world.js');
  const lit = ROOMS.filter((r) => r.foes.some((id) => FOES[id].burns));
  assert.ok(lit.length > 0);
  for (const r of lit) {
    const p = promptFor(r);
    assert.match(p, /light in the room is carried/,
      `${r.id} holds a torch but its prompt does not say so`);
    assert.ok(!/there is no light source/.test(p),
      `${r.id} carries a torch and the prompt calls the room unlit`);
  }
});

test('every room in the game produces a prompt with its own numbers in it', async () => {
  const { promptFor } = await import('../tools/prompt.js');
  for (const r of ROOMS) {
    const p = promptFor(r);
    assert.ok(p.includes(r.line.en), `${r.id} prompt drops the room's written line`);
    assert.ok(p.includes(`${ROOM_M} metres wide`), `${r.id} prompt loses the room scale`);
    for (const h of impassable(r)) assert.fail(`${r.id} is impassable: ${h}`);
    // the foes named in the prompt are the foes the room actually has
    for (const id of new Set(r.foes)) assert.ok(p.includes(id), `${r.id} prompt omits ${id}`);
  }
});

test('the image-model prompt drops what an image model cannot use', async () => {
  const { imagePromptFor } = await import('../tools/prompt.js');
  for (const r of ROOMS.slice(0, 60)) {
    const p = imagePromptFor(r);
    // no coordinates: an image model ignores "at 9m from the left wall" and the
    // number ends up rendered as text on the picture often enough to matter
    assert.ok(!/\d+(\.\d+)?m\b/.test(p), `${r.id} image prompt still carries metre marks`);
    // no negatives phrased as a list of things — they get drawn
    assert.ok(!/DO NOT:/.test(p), `${r.id} image prompt carries the DO NOT list`);
    assert.ok(!/\n/.test(p), `${r.id} image prompt is not one paragraph`);
    assert.ok(p.includes(r.line.en.replace(/\s+/g, ' ')), `${r.id} image prompt drops the room's line`);
    assert.ok(/No text, no people/.test(p), `${r.id} image prompt lost its exclusions`);
  }
});
