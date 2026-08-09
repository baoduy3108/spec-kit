// History and character, checked the only way either can be checked: against
// the world they claim to explain.
//
// Every age names the evidence it rests on, and every piece of evidence has
// to be a real area, a real boss or a real weapon. An age whose evidence does
// not resolve is a paragraph in a wiki. An age whose evidence resolves is the
// reason a room looks the way it does.

import test from 'node:test';
import assert from 'node:assert/strict';

import { FIRES, ROOMS, START, newWorld, roomOf } from '../src/world.js';
import { BOSS_IDS } from '../src/bosses.js';
import { WEAPONS } from '../src/arms.js';
import {
  AGES,
  SELF,
  evidenceKind,
  firstFire,
  mouldRacks,
  selfSoFar,
} from '../src/chronicle.js';

const everything = (holds = []) => ({
  ...newWorld(),
  seen: ROOMS.map((r) => r.id),
  felled: [...BOSS_IDS],
  holds,
});

test('the ages run in order with no gaps', () => {
  assert.equal(AGES.length, 6, 'six ages');
  AGES.forEach((age, i) => assert.equal(age.n, i + 1, `${age.id} is out of order`));
  assert.equal(new Set(AGES.map((a) => a.id)).size, AGES.length, 'no duplicate ages');
});

test('every age rests on evidence you can actually walk to', () => {
  for (const age of AGES) {
    assert.ok(age.evidence.length >= 3, `${age.id} rests on too little (${age.evidence.length})`);
    for (const id of age.evidence) {
      assert.ok(evidenceKind(id), `${age.id} cites ${id}, which is not a place, a boss or a thing`);
    }
    // Every age has to be anchored somewhere you can stand. Bosses and
    // weapons alone would let an age float free of the map.
    assert.ok(
      age.evidence.some((id) => evidenceKind(id) === 'area'),
      `${age.id} cites nowhere you can stand`,
    );
  }
});

test('the specific claims the ages make are true of the actual map', () => {
  // Age two: the firing chamber is bricked from outside, so the kiln holds the
  // first flame and it is behind fog.
  const chamber = ROOMS.find((r) => r.boss === 'the-first-flame');
  assert.equal(chamber.area, 'kiln');
  assert.equal(chamber.kind, 'fog');

  // Age six: a fresh kiln-fired one still standing beside the mould racks,
  // four tiers below what guards it.
  const racks = mouldRacks();
  assert.ok(racks, 'the mould racks are a real room');
  assert.equal(racks.area, 'kiln');
  assert.ok(racks.foes.includes('kiln'), 'with a fresh one standing in it');

  // Age four: the carriers came up the winding stair, and it reaches the top.
  assert.ok(ROOMS.some((r) => r.area === 'winding-stair'), 'the stair is real');
  assert.ok(ROOMS.some((r) => r.boss === 'the-lantern-warden'), 'and somebody is holding it');
});

test('what the character believes about fire matches how fire works', () => {
  // "Fire is where you were made, and a thing goes back to where it was made"
  // is only worth writing if the game really does return you to a fire, and
  // if the place you start really is one.
  assert.ok(FIRES.includes(START), 'you start at a fire');
  assert.equal(firstFire(), START);
  assert.equal(roomOf(START).kind, 'bonfire');
  assert.ok(FIRES.length >= 10, 'and there are enough of them to come back to');
  assert.equal(newWorld().fire, START, 'a fresh world respawns you at one');
});

test('nothing about yourself is knowable before you have seen it', () => {
  const fresh = { ...newWorld(), holds: [] };
  const known = selfSoFar(fresh);
  assert.ok(known.length <= 2, `you begin knowing almost nothing (${known.length})`);
  for (const n of known) assert.ok(!n.when.felled && !n.when.holds, 'and nothing that needs a kill');

  // The reveal needs the kiln. Everything up to it is deniable.
  const noKiln = {
    ...everything([]),
    seen: ROOMS.filter((r) => r.area !== 'kiln').map((r) => r.id),
  };
  const reveals = selfSoFar(noKiln).map((n) => n.id);
  assert.ok(!reveals.includes('third-shelf'), 'the racks cannot be known without the kiln');
  assert.ok(!reveals.includes('fired-not-forged'), 'nor what you are made of');
});

test('all of it is reachable by playing, and the last note needs the lantern', () => {
  const done = selfSoFar(everything(['the-standing-blade', 'the-open-lantern']));
  assert.equal(done.length, SELF.length, 'nothing written that no player can see');
  const withoutLantern = selfSoFar(everything(['the-standing-blade']));
  assert.ok(
    !withoutLantern.some((n) => n.id === 'the-worn-spot'),
    'the worn spot only fits once you are the one holding it',
  );
});

test('nothing player-facing carries markup, and both languages are written', () => {
  const pairs = [];
  for (const age of AGES) pairs.push(age.name, age.what, age.remains);
  for (const n of SELF) pairs.push(n.text);
  for (const pair of pairs) {
    assert.ok(pair.en && pair.vi, 'something is missing a language');
    for (const text of [pair.en, pair.vi]) {
      assert.ok(!/[*_`]|<[a-z/]/i.test(text), `markup: ${text.slice(0, 40)}`);
    }
  }
  for (const age of AGES) {
    assert.ok(age.what.en.length > 120 && age.what.vi.length > 120, `${age.id} is too thin`);
  }
  for (const n of SELF) assert.ok(n.text.en.length > 60 && n.text.vi.length > 60, `${n.id} is too thin`);
});

test('the weapons the history leans on are the ones that exist', () => {
  for (const id of ['the-plain-sword', 'the-standing-blade', 'the-free-hand', 'a-piece-of-the-flame']) {
    assert.ok(WEAPONS[id], `${id} is cited by the history and does not exist`);
  }
  assert.equal(WEAPONS['the-standing-blade'].from, 'kiln', 'fired, not forged, in the kiln');
  assert.equal(WEAPONS['the-free-hand'].from, 'the-lantern-warden', 'the hand it was not using');
});
