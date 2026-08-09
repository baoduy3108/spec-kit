// The bestiary's adjectives, checked against the bestiary's arithmetic.
//
// A description is the easiest thing in a game to let rot: the stat block
// gets tuned, the sentence keeps saying "fastest", and nobody notices until a
// player does. So every claim strong enough to be wrong is asserted here.
// Writing these caught the chorister — it was described as hitting harder
// than any common foe, and the colossus hits harder.

import test from 'node:test';
import assert from 'node:assert/strict';

import { FAMILY_STATS, FOES } from '../src/world.js';
import {
  CARRY,
  FAMILY_IDS,
  LORE,
  areasOf,
  describeFoe,
  medianSpeed,
  variantsOf,
} from '../src/lore.js';

const stat = (id) => FAMILY_STATS.find((f) => f.id === id);
const best = (key) => FAMILY_STATS.reduce((a, b) => (b[key] > a[key] ? b : a));

test('every family is described, and nothing is described that does not exist', () => {
  assert.equal(FAMILY_IDS.length, FAMILY_STATS.length, 'sixteen families, sixteen entries');
  for (const family of FAMILY_STATS) assert.ok(LORE[family.id], `${family.id} has no entry`);
  for (const id of FAMILY_IDS) assert.ok(stat(id), `${id} is described but does not exist`);
});

test('every carried thing is described, and every foe resolves to one', () => {
  for (const id of Object.keys(FOES)) {
    const suffix = id.slice(FOES[id].family.length);
    assert.ok(CARRY[suffix] !== undefined, `${id} carries an undescribed ${suffix || 'nothing'}`);
    const entry = describeFoe(id, 'vi');
    assert.ok(entry.name && entry.line && entry.tell && entry.fight && entry.carry);
  }
  assert.equal(Object.keys(FOES).length, 75, 'seventy-five concrete foes');
});

test('nothing player-facing carries markup, and both languages are written', () => {
  const fields = ['name', 'line', 'look', 'tell', 'fight'];
  for (const id of FAMILY_IDS) {
    for (const field of fields) {
      const pair = LORE[id][field];
      assert.ok(pair && pair.en && pair.vi, `${id}.${field} is missing a language`);
      for (const text of [pair.en, pair.vi]) {
        // These are drawn onto a canvas. An asterisk shows up as an asterisk.
        assert.ok(!/[*_`]|<[a-z/]/i.test(text), `${id}.${field} has markup in it`);
        // `name` is two words by design; the floor is for the prose fields.
        if (field !== 'name') {
          assert.ok(text.length > 12, `${id}.${field} is too thin to be a description`);
        }
      }
    }
  }
  for (const suffix of Object.keys(CARRY)) {
    for (const text of [CARRY[suffix].line.en, CARRY[suffix].line.vi]) {
      assert.ok(!/[*_`]|<[a-z/]/i.test(text), `carry ${suffix} has markup in it`);
    }
  }
});

test('a family called fast is fast, and a family called slow is slow', () => {
  const middle = medianSpeed();
  for (const id of FAMILY_IDS) {
    const { speed } = stat(id);
    const pace = LORE[id].pace;
    if (pace === 'fast') assert.ok(speed > middle, `${id} is called fast at ${speed} (median ${middle})`);
    else if (pace === 'slow') assert.ok(speed < middle, `${id} is called slow at ${speed} (median ${middle})`);
    else {
      assert.equal(pace, 'even', `${id} has an unknown pace (${pace})`);
      assert.ok(
        Math.abs(speed - middle) <= middle * 0.2,
        `${id} is called even at ${speed}, which is nowhere near ${middle}`,
      );
    }
  }
});

test('a family called armoured has the poise to back it up', () => {
  for (const id of FAMILY_IDS) {
    const { poise } = stat(id);
    if (LORE[id].armour) assert.ok(poise >= 40, `${id} claims armour on ${poise} poise`);
    else assert.ok(poise < 40, `${id} is a heavy thing that nobody said was armoured (${poise})`);
  }
});

test('the superlatives are true', () => {
  assert.equal(best('speed').id, 'wisp', 'the wisp is called the fastest thing in the world');
  assert.equal(best('poise').id, 'colossus', 'the colossus is the thing you cannot argue with');
  assert.equal(best('windup').id, 'colossus', 'and it is readable a room away');
  const lightest = FAMILY_STATS.reduce((a, b) => (b.hp < a.hp ? b : a));
  assert.equal(lightest.id, 'hound', 'two hits kill a hound because it has the least health');
  assert.equal(FAMILY_STATS[0].id, 'husk', 'the husk is the first thing in the world');

  // The chorister's claim is bounded: heaviest and longest-winding of what you
  // have met *by then*, not of everything. That bound is the fix for a line
  // that was simply false when it said "any common foe".
  const met = FAMILY_STATS.filter((f) => f.tier <= stat('chorister').tier);
  assert.equal(met.reduce((a, b) => (b.damage > a.damage ? b : a)).id, 'chorister');
  assert.equal(met.reduce((a, b) => (b.windup > a.windup ? b : a)).id, 'chorister');
});

test('what a carry does matches what the carry note says it does', () => {
  // The husk is the one family that carries all five, so it is the fair test.
  const bare = FOES.husk;
  assert.equal(FOES['husk-spear'].reach, 1.4, 'reach longer by two fifths');
  assert.ok(FOES['husk-spear'].windup > bare.windup, 'and slower to bring round');
  assert.ok(FOES['husk-torch'].burns, 'a torch burns');
  assert.ok(FOES['husk-torch'].speed > bare.speed && FOES['husk-torch'].damage < bare.damage);
  assert.ok(FOES['husk-heavy'].hp > bare.hp && FOES['husk-heavy'].poise > bare.poise);
  assert.ok(FOES['husk-heavy'].speed < bare.speed, 'plate is not free');
  assert.ok(FOES['husk-swift'].speed > bare.speed && FOES['husk-swift'].hp < bare.hp);
});

test('every family lives somewhere, and the map is what says so', () => {
  for (const id of FAMILY_IDS) {
    const where = areasOf(id);
    assert.ok(where.length > 0, `${id} is described but lives nowhere`);
    assert.ok(variantsOf(id).length >= 3, `${id} has too few carries to be a family`);
  }
  // The wisp is a piece of the lantern that got loose, so it had better be
  // findable in the lantern.
  assert.ok(areasOf('wisp').includes('the-lantern'), 'the wisp comes from the lantern');
  // And the kiln-fired are made in the kiln.
  assert.ok(areasOf('kiln').includes('kiln'), 'the kiln-fired are made in the kiln');
});
