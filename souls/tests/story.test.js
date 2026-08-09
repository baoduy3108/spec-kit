// The story is not told, it is earned, so the thing to test is not the prose
// — it is that every beat is reachable by actually playing, that none of them
// can fire early, and that no beat points at a boss, area or weapon that does
// not exist. A beat gated on something unreachable is a piece of writing no
// player will ever see, which is the same as not having written it.

import test from 'node:test';
import assert from 'node:assert/strict';

import { ROOMS, newWorld } from '../src/world.js';
import { BOSS_IDS } from '../src/bosses.js';
import {
  BEATS,
  CHAPTERS,
  ENDINGS,
  KNOWN,
  endingFor,
  referencesOf,
  storySoFar,
} from '../src/story.js';

/** A world that has done everything: every room walked, every boss down. */
const finished = (holds = []) => ({
  ...newWorld(),
  seen: ROOMS.map((r) => r.id),
  felled: [...BOSS_IDS],
  holds,
});

test('every condition points at something that exists', () => {
  for (const b of BEATS) {
    for (const [kind, id] of referencesOf(b.when)) {
      assert.ok(KNOWN[kind].has(id), `${b.id} waits on a ${kind} called ${id}, which is nowhere`);
    }
    assert.ok(
      CHAPTERS.some((c) => c.id === b.chapter),
      `${b.id} is in an act that does not exist (${b.chapter})`,
    );
    assert.ok(Object.keys(b.when).length > 0, `${b.id} is gated on nothing and would fire at once`);
  }
  for (const key of Object.keys(ENDINGS)) {
    for (const [kind, id] of referencesOf(ENDINGS[key].when)) {
      assert.ok(KNOWN[kind].has(id), `ending ${key} waits on a ${kind} called ${id}`);
    }
  }
});

test('nothing has been written that no player can ever see', () => {
  const seen = storySoFar(finished(['the-open-lantern', 'a-piece-of-the-flame']));
  assert.equal(seen.length, BEATS.length, 'every beat is reachable by playing');
  assert.equal(new Set(BEATS.map((b) => b.id)).size, BEATS.length, 'no duplicate beats');
  for (const c of CHAPTERS) {
    assert.ok(BEATS.some((b) => b.chapter === c.id), `${c.id} is an empty act`);
  }
});

test('a fresh world knows nothing yet', () => {
  const world = { ...newWorld(), holds: [] };
  const opening = storySoFar(world);
  assert.ok(opening.length <= 1, `you start knowing nothing (${opening.length} beats)`);
  assert.equal(endingFor(world), null, 'and you are certainly not at an ending');
});

test('the acts come in order, and a late act cannot fire during an early one', () => {
  const order = CHAPTERS.map((c) => c.id);
  const told = storySoFar(finished(['the-open-lantern']));
  const positions = told.map((b) => order.indexOf(b.chapter));
  for (let i = 1; i < positions.length; i++) {
    assert.ok(positions[i] >= positions[i - 1], 'storySoFar has to return the acts in order');
  }
  // The last two acts are locked behind the last two bosses. Nothing about the
  // carrier or the choice is knowable before the top of the mountain.
  const nearlyDone = {
    ...newWorld(),
    seen: ROOMS.map((r) => r.id),
    felled: BOSS_IDS.filter((b) => b !== 'the-first-flame' && b !== 'the-lantern-warden'),
    holds: [],
  };
  const early = storySoFar(nearlyDone).filter((b) => b.chapter === 'the-choice');
  assert.deepEqual(early, [], 'the choice cannot be known before either final boss is down');
});

test('both endings need the last two bosses, and they are told apart by your hands', () => {
  const bothDown = finished([]);
  assert.equal(endingFor(bothDown), null, 'an ending needs something in your hands');
  assert.equal(endingFor(finished(['the-open-lantern'])), 'carry');
  assert.equal(endingFor(finished(['a-piece-of-the-flame'])), 'let');
  for (const key of Object.keys(ENDINGS)) {
    const need = ENDINGS[key].when.felled;
    assert.ok(need.includes('the-first-flame') && need.includes('the-lantern-warden'), `${key} is cheap`);
  }
  // and neither is available one boss early
  const oneLeft = {
    ...finished(['the-open-lantern', 'a-piece-of-the-flame']),
    felled: BOSS_IDS.filter((b) => b !== 'the-lantern-warden'),
  };
  assert.equal(endingFor(oneLeft), null, 'no ending with the warden still standing');
});

test('nothing player-facing carries markup, and both languages are written', () => {
  const strings = [
    ...BEATS.map((b) => b.text),
    ...CHAPTERS.map((c) => c.name),
    ...Object.values(ENDINGS).map((e) => e.name),
    ...Object.values(ENDINGS).map((e) => e.text),
  ];
  for (const pair of strings) {
    assert.ok(pair.en && pair.vi, 'a beat is missing a language');
    for (const text of [pair.en, pair.vi]) {
      assert.ok(!/[*_`]|<[a-z/]/i.test(text), `markup in a player-facing string: ${text.slice(0, 40)}`);
    }
  }
  for (const b of BEATS) {
    assert.ok(b.text.en.length > 40 && b.text.vi.length > 40, `${b.id} is too thin to be a beat`);
  }
});

test('the story is told in a different order by a different route', () => {
  // Two players who fight different bosses first should not be handed the same
  // opening. If they are, the gating is decoration.
  const gardenerFirst = { ...newWorld(), seen: ROOMS.map((r) => r.id), felled: ['the-gardener'], holds: [] };
  const smithFirst = { ...newWorld(), seen: ROOMS.map((r) => r.id), felled: ['the-smith'], holds: [] };
  const a = storySoFar(gardenerFirst).map((b) => b.id);
  const b = storySoFar(smithFirst).map((b) => b.id);
  assert.notDeepEqual(a, b, 'who you kill first has to change what you are told');
});
