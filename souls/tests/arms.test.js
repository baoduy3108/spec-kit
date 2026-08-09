// A hundred and fifty weapons, and the one claim that makes a list that size
// worth having: none of the fifteen classes is a strictly worse version of
// another. Big weapon lists usually fail this quietly — forty entries, six of
// them viable — so it is checked here across all the pairs rather than
// asserted in a design document nobody reads.

import test from 'node:test';
import assert from 'node:assert/strict';

import { AREAS } from '../src/world.js';
import { BOSS_IDS } from '../src/bosses.js';
import {
  CLASS_IDS,
  CLASS_LORE,
  WEAPONS,
  WEAPON_IDS,
  classStats,
  describeWeapon,
  dominates,
  sourceKind,
  weaponsOfClass,
} from '../src/arms.js';

test('there are a hundred and fifty of them, spread across fifteen classes', () => {
  assert.equal(WEAPON_IDS.length, 150, `a hundred and fifty (${WEAPON_IDS.length})`);
  assert.equal(CLASS_IDS.length, 15, 'fifteen classes');
  assert.equal(new Set(WEAPON_IDS).size, 150, 'no duplicate ids');
  for (const cls of CLASS_IDS) {
    assert.ok(weaponsOfClass(cls).length >= 8, `${cls} is under-served (${weaponsOfClass(cls).length})`);
    assert.ok(CLASS_LORE[cls], `${cls} has no write-up`);
  }
  assert.equal(Object.keys(CLASS_LORE).length, 15, 'nothing written up that does not exist');
});

test('no class is a strictly worse version of another', () => {
  const traps = [];
  for (const a of CLASS_IDS) {
    for (const b of CLASS_IDS) {
      if (a !== b && dominates(b, a)) traps.push(`${a} is strictly worse than ${b}`);
    }
  }
  assert.deepEqual(traps, [], 'a dominated class is a trap, not a choice');
});

test('no two classes are the same class wearing a different name', () => {
  // Fifteen entries are only fifteen choices if they feel different in the
  // hand. Near-duplicates are how a list gets long without getting deep.
  const axes = ['damage', 'reach', 'poise', 'windup', 'recover', 'stamina'];
  for (const a of CLASS_IDS) {
    for (const b of CLASS_IDS) {
      if (a >= b) continue;
      const A = classStats(a);
      const B = classStats(b);
      const widest = Math.max(...axes.map((k) => Math.abs(A[k] - B[k]) / Math.max(A[k], B[k])));
      assert.ok(widest > 0.12, `${a} and ${b} differ by only ${Math.round(widest * 100)}% at their widest`);
    }
  }
});

// Deliberately NOT asserted: that every class is the best answer under some
// weighting of the six axes. It was tried, and it fails for the straight
// sword, the axe and the flame tool — correctly. The straight sword's own
// write-up says nothing is best about it and nothing is wrong with it, which
// is a real design position and the reason most people finish holding one.
// The flame tool's edge is that it burns, which no weighting of damage, reach,
// poise, wind-up, recovery and stamina can see. Forcing that test to pass
// would mean flattening fifteen classes into six extremes. What is asserted
// instead is the pair above: nothing is dominated, and nothing is a duplicate.

test('every weapon comes from somewhere that exists', () => {
  const areas = new Set(AREAS.map((a) => a.id));
  for (const id of WEAPON_IDS) {
    const kind = sourceKind(WEAPONS[id].from);
    assert.ok(kind, `${id} comes from ${WEAPONS[id].from}, which is nowhere`);
    if (kind === 'area') assert.ok(areas.has(WEAPONS[id].from));
    else assert.ok(BOSS_IDS.includes(WEAPONS[id].from));
  }
  // Every boss leaves something behind. A boss with no drop is a fight the
  // world forgets you won.
  const dropped = new Set(WEAPON_IDS.map((id) => WEAPONS[id].from));
  const bossless = BOSS_IDS.filter((b) => !dropped.has(b));
  assert.deepEqual(bossless, [], 'these bosses leave nothing behind');
});

test('nothing player-facing carries markup, and both languages are written', () => {
  for (const id of WEAPON_IDS) {
    const it = WEAPONS[id];
    for (const pair of [it.name, it.line]) {
      assert.ok(pair.en && pair.vi, `${id} is missing a language`);
      for (const text of [pair.en, pair.vi]) {
        assert.ok(!/[*_`]|<[a-z/]/i.test(text), `${id} has markup in a player-facing string`);
      }
    }
    assert.ok(it.line.en.length > 25 && it.line.vi.length > 25, `${id}'s line is too thin`);
  }
  for (const cls of CLASS_IDS) {
    for (const field of ['name', 'line', 'feel', 'against']) {
      const pair = CLASS_LORE[cls][field];
      assert.ok(pair.en && pair.vi, `${cls}.${field} is missing a language`);
      assert.ok(!/[*_`]|<[a-z/]/i.test(pair.en + pair.vi), `${cls}.${field} has markup`);
    }
  }
});

test('a higher tier of the same class hits harder and costs the same', () => {
  for (const cls of CLASS_IDS) {
    const sorted = weaponsOfClass(cls)
      .map((id) => WEAPONS[id])
      .sort((a, b) => a.tier - b.tier);
    const low = sorted[0];
    const high = sorted[sorted.length - 1];
    assert.ok(high.damage > low.damage, `${cls} does not improve with tier`);
    // Tier buys damage and nothing else. A late weapon that also got faster
    // and longer would quietly delete the class it belongs to.
    for (const key of ['windup', 'recover', 'reach', 'stamina', 'poise']) {
      assert.equal(high[key], low[key], `${cls} tier changed ${key}, which is not tier's job`);
    }
  }
});

test('a weapon reads out complete in either language', () => {
  for (const lang of ['en', 'vi']) {
    for (const id of WEAPON_IDS) {
      const entry = describeWeapon(id, lang);
      for (const field of ['name', 'line', 'className', 'feel', 'against', 'kind']) {
        assert.ok(entry[field], `${id}.${field} is empty in ${lang}`);
      }
    }
  }
});

test('the light classes really are light and the heavy ones really are heavy', () => {
  const fist = classStats('fist');
  const hammer = classStats('great-hammer');
  const whip = classStats('whip');
  assert.ok(CLASS_IDS.every((c) => classStats(c).stamina >= fist.stamina), 'fists are the cheapest');
  assert.ok(CLASS_IDS.every((c) => classStats(c).poise <= hammer.poise), 'the hammer breaks the most');
  assert.ok(CLASS_IDS.every((c) => classStats(c).reach <= whip.reach), 'the whip reaches furthest');
  assert.ok(hammer.damage > fist.damage * 4, 'and the spread is worth having');
});
