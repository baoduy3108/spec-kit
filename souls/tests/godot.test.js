import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { ROOMS, AREAS, FOES } from '../src/world.js';
import { KNIGHT, ARENA } from '../src/rules.js';
import { HERO } from '../src/hero.js';
import { build, UNITS_PER_METRE } from '../tools/godot.js';
import { floorAt, standingX } from '../tools/preview.js';
import { ROOM_M, impassable } from '../tools/draw.js';

const read = (f) => JSON.parse(readFileSync(new URL(`../godot/data/${f}`, import.meta.url), 'utf8'));
const gd = (f) => readFileSync(new URL(`../godot/scripts/${f}`, import.meta.url), 'utf8');

test('the export covers the whole game', () => {
  const r = build();
  assert.equal(r.rooms, ROOMS.length);
  assert.equal(r.areas, AREAS.length);
  assert.equal(r.foes, Object.keys(FOES).length);
});

test('what Godot reads is exactly what the sim runs on', () => {
  build();
  const rules = read('rules.json');
  // not "close to" — the same object. A port that rounds a number is a port
  // that balances a different game from the one the tests guard.
  assert.deepEqual(rules.player, JSON.parse(JSON.stringify(KNIGHT)));
  assert.deepEqual(rules.arena, JSON.parse(JSON.stringify(ARENA)));
  const foes = read('foes.json');
  for (const [id, f] of Object.entries(FOES))
    for (const k of ['hp', 'damage', 'speed', 'poise', 'windup', 'reach', 'essence'])
      assert.equal(foes[id][k], f[k], `${id}.${k} drifted`);
});

test('the three scales agree on what a metre is', () => {
  build();
  const rules = read('rules.json');
  // The arena in rules.js is a BOSS space — a single screen you cannot walk out
  // of the side of — and a traversal room is twice that and scrolls. Asserting
  // they were the same width was only true while every room was one flat screen.
  const arenaM = (ARENA.hi - ARENA.lo) / UNITS_PER_METRE;
  const windowM = rules.camera.viewport[0] / rules.camera.zoom / UNITS_PER_METRE;
  assert.ok(arenaM <= windowM,
    `a boss arena is ${arenaM.toFixed(1)}m and the camera shows ${windowM.toFixed(1)}m — you would fight off screen`);
  assert.ok(ROOM_M > windowM,
    `a room is ${ROOM_M}m and the camera shows ${windowM.toFixed(1)}m — nothing would ever scroll`);
  assert.equal(rules.room_width, Math.round(ROOM_M * UNITS_PER_METRE));
});

test('every room Godot loads has a floor and reachable foe ids', () => {
  build();
  const world = read('world.json');
  const foes = read('foes.json');
  for (const r of world.rooms) {
    assert.ok(Array.isArray(r.terrain) && r.terrain.length >= 2, `${r.id} has no terrain`);
    assert.ok(r.terrain.some((p) => p !== null), `${r.id} is all hole`);
    for (const id of r.foes) assert.ok(foes[id], `${r.id} spawns unknown foe ${id}`);
  }
});

test('no room exported to Godot is impossible to cross', () => {
  assert.deepEqual(ROOMS.filter((r) => impassable(r).length).map((r) => r.id), []);
});

test('the Godot scripts read the design instead of restating it', () => {
  // First attempt at this test blacklisted the balance numbers as bare
  // literals anywhere in the file. It earned its keep twice — it caught the
  // foe placement table copied out of draw.js, and a silent light-level
  // fallback that would have made a room quietly the wrong dark — and then it
  // started failing on a 16-pixel wall and a 0.3 default, because 16 and 0.3
  // are not distinctive numbers. Matching digits cannot tell a wall from a
  // sword. So: forbid only the numbers no one would type by accident, and
  // check positively that every balance-bearing value is read through Data.
  const distinctive = [
    [String(KNIGHT.speed), 'player speed'],
    [String(KNIGHT.roll.speed), 'roll speed'],
    [String(KNIGHT.roll.time), 'roll time'],
    [String(KNIGHT.swings[1].reach[1]), 'heavy reach'],
  ];
  for (const file of readdirSync(new URL('../godot/scripts/', import.meta.url))) {
    const src = gd(file);
    for (const [lit, what] of distinctive)
      assert.ok(!new RegExp(`(^|[^\\w.])${lit}([^\\w]|$)`).test(src),
        `${file} hard-codes ${what} (${lit}) instead of reading it from Data`);
  }
});

test('the player and the foes get every number through the data', () => {
  const player = gd('Player.gd');
  for (const path of ['K.roll', 'K.swings', 'K.speed', 'K.block', 'K.parry', 'K.hp', 'K.stamina'])
    assert.ok(player.includes(path), `Player.gd never reads ${path}`);
  assert.ok(/K\s*=\s*Data\.player\(\)/.test(player), 'Player.gd does not take its block from Data');

  const foe = gd('Foe.gd');
  for (const path of ['F.hp', 'F.damage', 'F.speed', 'F.poise', 'F.windup', 'F.reach'])
    assert.ok(foe.includes(path), `Foe.gd never reads ${path}`);
  assert.ok(/F\s*=\s*Data\.foes\[/.test(foe), 'Foe.gd does not take its row from Data');

  const game = gd('Game.gd');
  for (const path of ['Data.rules.placement', 'Data.rules.light_levels', 'Data.units_per_metre', 'Data.room_width'])
    assert.ok(game.includes(path), `Game.gd never reads ${path}`);
});

test('the Godot project points at scripts that exist', () => {
  const proj = readFileSync(new URL('../godot/project.godot', import.meta.url), 'utf8');
  assert.match(proj, /run\/main_scene="res:\/\/scenes\/Main\.tscn"/);
  assert.match(proj, /Data="\*res:\/\/scripts\/Data\.gd"/);
  const scene = readFileSync(new URL('../godot/scenes/Main.tscn', import.meta.url), 'utf8');
  assert.match(scene, /res:\/\/scripts\/Game\.gd/);
  for (const f of ['Data.gd', 'Game.gd', 'Player.gd', 'Foe.gd', 'Room.gd']) gd(f);
});

test('GDScript indents with tabs throughout', () => {
  for (const file of readdirSync(new URL('../godot/scripts/', import.meta.url))) {
    const lines = gd(file).split('\n');
    const spaced = lines.map((l, i) => [l, i + 1]).filter(([l]) => /^ +\S/.test(l));
    assert.deepEqual(spaced.map(([, i]) => i), [], `${file} mixes spaces into GDScript indentation`);
  }
});

test('the hero in Godot is the Lamplighter, not the knight', () => {
  build();
  const hero = read('hero.json');
  assert.equal(hero.name.vi, HERO.name.vi);
  assert.ok(!/knight/i.test(JSON.stringify(hero.look)), 'the hero is described as a knight');
});

test('no foe in the game is spawned over a hole', () => {
  // The preview caught two placement bugs by eye — a player hanging in the air
  // and two husks standing on the kerb of the drain they are written as being
  // in. This is the same check over all 368 rooms, and it tests the position
  // the game actually uses, after Room.standing_x snaps it onto real ground.
  build();
  const rules = read('rules.json');
  const world = read('world.json');
  const W = rules.room_width;

  const bad = [];
  const moved = [];
  for (const r of world.rooms) {
    if (!r.foes.length) continue;
    const at = rules.placement_by_kind[r.kind] || rules.placement[r.layout];
    r.foes.forEach((id, i) => {
      const want = at[i % at.length] * rules.units_per_metre;
      const got = standingX(r.terrain, want, W);
      if (Number.isNaN(floorAt(r.terrain, got))) bad.push(`${r.id} ${id}`);
      if (got <= 0 || got >= W) bad.push(`${r.id} ${id} snapped out of the room`);
      // snapping is a repair, not a redesign: it must not relocate the fight
      const drift = Math.abs(got - want) / rules.units_per_metre;
      if (drift > 2.0) moved.push(`${r.id} ${id} moved ${drift.toFixed(1)}m`);
    });
  }
  assert.deepEqual(bad, [], 'these foes have no ground under them');
  assert.deepEqual(moved, [], 'snapping moved these fights somewhere else');
});

test('a drain puts its foes in the water, as the room says it does', () => {
  build();
  const rules = read('rules.json');
  const drain = read('world.json').rooms.find((r) => r.key === 'long-drain');
  const at = rules.placement_by_kind[drain.kind];
  // the channel is the stretch of terrain at the lowest level in the room
  const low = Math.max(...drain.terrain.filter((p) => p !== null).map((p) => p[1]));
  const inWater = drain.terrain.filter((p) => p !== null && p[1] === low).map((p) => p[0]);
  const [c0, c1] = [Math.min(...inWater), Math.max(...inWater)];
  for (let i = 0; i < drain.foes.length; i++) {
    const x = at[i] * rules.units_per_metre;
    assert.ok(x >= c0 && x <= c1, `${drain.foes[i]} stands at ${x}, outside the channel ${c0}..${c1}`);
  }
});

test('a room written to teach pulling actually lets you pull', () => {
  // world.js carries design notes in prose. A note is a claim about how the
  // room plays, and a claim nothing checks is a wish. This checks the one the
  // courtyard makes: if the note says one at a time, the foes have to stand
  // further apart than a foe can see.
  build();
  const rules = read('rules.json');
  const world = read('world.json');
  const aggro = rules.aggro;

  // Only where spacing is the mechanism. ramparts:5 is also written "one at a
  // time" but its note says they *arrive* one at a time from below — that is a
  // sequenced spawn, which this game does not have yet. It is listed at the
  // bottom of this test as an unkept promise rather than silently exempted.
  const claims = world.rooms.filter(
    (r) => r.layout === 'spread' && r.note && /one at a time|pull/i.test(r.note),
  );
  assert.ok(claims.length > 0, 'no room makes this claim any more — has the note been dropped?');
  for (const r of claims) {
    const at = rules.placement_by_kind[r.kind] || rules.placement[r.layout];
    const xs = r.foes.map((_, i) => at[i % at.length] * rules.units_per_metre).sort((a, b) => a - b);
    // The claim is not about where the player starts — they walk. It is that
    // baiting the first foe must not bring the second one with it.
    assert.ok(xs.length >= 2, `${r.id} claims a pull but has one foe`);
    assert.ok(xs[1] - xs[0] > aggro,
      `${r.id}: foes are ${Math.round(xs[1] - xs[0])} apart and aggro is ${aggro} — the pull brings both`);
  }

  // Rooms that promise sequenced arrival, which nothing in the game delivers.
  // Not a failure — a debt, recorded where it cannot be forgotten.
  const sequenced = world.rooms.filter(
    (r) => r.layout !== 'spread' && r.note && /one at a time/i.test(r.note),
  );
  assert.deepEqual(sequenced.map((r) => r.id), ['ramparts:5'],
    'the list of rooms promising a spawn mechanic that does not exist has changed');
});

test('the foes of a room stand far enough apart to be fought in turn', () => {
  // Not a law for every room — a pack is supposed to arrive together. But a
  // room tagged `spread` says in its own tag that it is not a pack.
  build();
  const rules = read('rules.json');
  const world = read('world.json');
  const tight = [];
  for (const r of world.rooms) {
    if (r.layout !== 'spread' || r.foes.length < 2) continue;
    // a kind that owns its fighting ground has overruled the layout tag, and
    // the drain is meant to have both of them standing in the same water
    if (rules.placement_by_kind[r.kind]) continue;
    const at = rules.placement[r.layout];
    const xs = r.foes.map((_, i) => at[i % at.length] * rules.units_per_metre).sort((a, b) => a - b);
    for (let i = 1; i < xs.length; i++)
      if (xs[i] - xs[i - 1] < rules.aggro * 0.5) tight.push(`${r.id} ${Math.round(xs[i] - xs[i - 1])}u apart`);
  }
  assert.deepEqual(tight, [], 'these `spread` rooms are packs wearing a spread tag');
});
