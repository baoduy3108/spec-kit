import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { ROOMS, AREAS, FOES } from '../src/world.js';
import { KNIGHT, ARENA } from '../src/rules.js';
import { HERO } from '../src/hero.js';
import { build, UNITS_PER_METRE } from '../tools/godot.js';
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
  // the arena is 820 sim units and a room is 24 metres; the hero is drawn 68
  // units for a figure the sheet calls 2.0m. All of that only holds at 34.
  const fromArena = (ARENA.hi - ARENA.lo) / UNITS_PER_METRE;
  assert.ok(Math.abs(fromArena - ROOM_M) < 0.5, `arena is ${fromArena.toFixed(2)}m, room is ${ROOM_M}m`);
  assert.equal(read('rules.json').room_width, Math.round(ROOM_M * UNITS_PER_METRE));
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
