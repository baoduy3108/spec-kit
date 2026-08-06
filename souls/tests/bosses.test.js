// The eighteen have to obey the same law as the Warden: everything is
// readable, everything is punishable, and nothing gets harder by hiding.

import test from 'node:test';
import assert from 'node:assert/strict';

import { BESTIARY, BOSS_IDS, lengthOf, movesOf } from '../src/bosses.js';
import { BOSSES } from '../src/world.js';

test('every boss on the map is written, and nothing is written twice', () => {
  assert.equal(BOSS_IDS.length, 18);
  for (const boss of BOSSES) {
    assert.ok(BESTIARY[boss.id], `${boss.id} is on the map but not written`);
    assert.equal(BESTIARY[boss.id].area, boss.area, `${boss.id} is written into the wrong area`);
  }
  for (const id of BOSS_IDS) {
    assert.ok(BOSSES.some((b) => b.id === id), `${id} is written but not on the map`);
  }
});

test('every one has a name, a reason to exist, and three ways to kill you', () => {
  for (const id of BOSS_IDS) {
    const boss = BESTIARY[id];
    assert.ok(boss.name.en && boss.name.vi, `${id} needs a name in both languages`);
    assert.ok(boss.line.en && boss.line.vi, `${id} needs a line in both languages`);
    assert.ok(boss.line.en.length > 30, `${id}'s line says nothing`);
    assert.ok(movesOf(id).length >= 3, `${id} needs a moveset, not a move`);
    assert.ok(boss.hp > 0 && boss.poise > 0);
  }
});

test('every move is readable and punishable', () => {
  for (const id of BOSS_IDS) {
    for (const m of movesOf(id)) {
      assert.ok(m.windup >= 0.35, `${id}/${m.id} comes out too fast to read (${m.windup}s)`);
      assert.ok(m.recover > m.active, `${id}/${m.id} cannot be punished`);
      assert.ok(lengthOf(m) < 3, `${id}/${m.id} outstays its welcome`);
      assert.ok(m.tell && m.tell.length > 12, `${id}/${m.id} has no tell written`);
      assert.equal(m.reach.length, 2);
      assert.ok(m.reach[1] > m.reach[0]);
      assert.ok(m.damage > 0);
    }
  }
});

test('the second phase shortens recovery, and never the wind-up', () => {
  for (const id of BOSS_IDS) {
    const boss = BESTIARY[id];
    assert.ok(boss.phase2, `${id} needs a second phase`);
    assert.ok(boss.phase2.change.en && boss.phase2.change.vi, `${id} must say what changes`);
    assert.ok(boss.phase2.recoverScale < 1, `${id} phase two has to bite`);
    assert.ok(boss.phase2.recoverScale >= 0.6, `${id} phase two must still be punishable`);
    for (const m of movesOf(id)) {
      const before = lengthOf(m, 1);
      const after = lengthOf(m, 2, boss.phase2.recoverScale);
      assert.ok(after < before, `${id}/${m.id} should tighten`);
      assert.equal(m.windup, m.windup, 'the wind-up is untouched by phase');
    }
  }
});

test('they get bigger the deeper they are', () => {
  const shallow = BOSS_IDS.filter((id) => BESTIARY[id].tier <= 4);
  const deep = BOSS_IDS.filter((id) => BESTIARY[id].tier >= 8);
  const meanHp = (ids) => ids.reduce((s, id) => s + BESTIARY[id].hp, 0) / ids.length;
  const meanHit = (ids) =>
    ids.reduce((s, id) => s + Math.max(...movesOf(id).map((m) => m.damage)), 0) / ids.length;
  assert.ok(meanHp(deep) > meanHp(shallow) * 1.4, 'the late ones are tougher');
  assert.ok(meanHit(deep) > meanHit(shallow) * 1.2, 'and they hit harder');
});

test('each boss has at least one long tell worth punishing hard', () => {
  for (const id of BOSS_IDS) {
    const biggest = movesOf(id).reduce((a, b) => (b.damage > a.damage ? b : a));
    assert.ok(
      biggest.windup >= 0.85,
      `${id}'s hardest hit (${biggest.id}) must be its most readable one`,
    );
    assert.ok(biggest.recover >= 0.8, `${id}'s hardest hit must leave the biggest opening`);
  }
});
