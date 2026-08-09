// The eighteen write-ups, checked against the eighteen stat blocks.
//
// The important one here is the punish. Every boss is supposed to obey the
// same law — the attack that can kill you outright is also the attack that
// pays you the most for reading it — and each write-up names the move it
// believes that is. Naming it in prose is worthless unless the prose is
// checked, so it is checked for all eighteen, twice: heaviest damage, and
// longest recovery.

import test from 'node:test';
import assert from 'node:assert/strict';

import { BESTIARY, BOSS_IDS } from '../src/bosses.js';
import { AREAS, ROOMS } from '../src/world.js';
import { BOSS_LORE, LORE_IDS, describeBoss, lairOf, punishOf } from '../src/bosslore.js';

const heaviest = (id) => BESTIARY[id].moves.reduce((a, b) => (b.damage > a.damage ? b : a));
const slowestToRecover = (id) => BESTIARY[id].moves.reduce((a, b) => (b.recover > a.recover ? b : a));

test('all eighteen are written up, and nothing is written up that does not exist', () => {
  assert.equal(LORE_IDS.length, BOSS_IDS.length, 'eighteen bosses, eighteen write-ups');
  for (const id of BOSS_IDS) assert.ok(BOSS_LORE[id], `${id} has no write-up`);
  for (const id of LORE_IDS) assert.ok(BESTIARY[id], `${id} is written up but does not exist`);
});

test('nothing player-facing carries markup, and both languages are written', () => {
  for (const id of LORE_IDS) {
    for (const field of ['look', 'arena', 'fight', 'turn', 'after']) {
      const pair = BOSS_LORE[id][field];
      assert.ok(pair && pair.en && pair.vi, `${id}.${field} is missing a language`);
      for (const text of [pair.en, pair.vi]) {
        assert.ok(!/[*_`]|<[a-z/]/i.test(text), `${id}.${field} has markup in it`);
        assert.ok(text.length > 30, `${id}.${field} is too thin to be a description`);
      }
    }
  }
});

test('the punish each write-up names is the move that actually pays', () => {
  for (const id of LORE_IDS) {
    const move = punishOf(id);
    assert.ok(move, `${id} names a punish that is not one of its moves`);
    assert.equal(move.id, heaviest(id).id, `${id}'s punish is not its heaviest move`);
    assert.equal(move.id, slowestToRecover(id).id, `${id}'s punish is not its longest recovery`);
    // and the law the whole game rests on, restated per boss
    assert.ok(move.recover > move.active, `${id}'s ${move.id} is not punishable at all`);
    assert.ok(move.windup >= 0.35, `${id}'s ${move.id} is not readable`);
  }
});

test('phase two takes away time to react, never time to read', () => {
  for (const id of BOSS_IDS) {
    const { phase2 } = BESTIARY[id];
    assert.ok(phase2.recoverScale < 1, `${id} phase two has to change something`);
    // The design law: recovery shrinks, wind-up does not. A windupScale here
    // would let a boss get harder by getting less honest, and the write-ups
    // promise in five languages that it never does.
    assert.equal(phase2.windupScale, undefined, `${id} phase two shortens its own tell`);
    assert.ok(phase2.change.en && phase2.change.vi, `${id} does not say what changed`);
  }
});

test('every boss stands somewhere the map agrees with', () => {
  for (const id of BOSS_IDS) {
    const lair = lairOf(id);
    assert.ok(lair, `${id} has no room`);
    assert.equal(lair.area, BESTIARY[id].area, `${id} thinks it lives in the wrong area`);
    assert.equal(lair.kind, 'fog', `${id} is not behind fog`);
    assert.ok(AREAS.some((a) => a.id === lair.area), `${lair.area} is not a real area`);
  }
  const lairs = ROOMS.filter((r) => r.boss);
  assert.equal(lairs.length, BOSS_IDS.length, 'one lair each, no spares');
});

test('a write-up reads out complete in either language', () => {
  for (const lang of ['en', 'vi']) {
    for (const id of BOSS_IDS) {
      const entry = describeBoss(id, lang);
      for (const field of ['name', 'line', 'look', 'arena', 'fight', 'turn', 'after', 'where']) {
        assert.ok(entry[field], `${id}.${field} is empty in ${lang}`);
      }
      assert.ok(entry.order >= 1 && entry.order <= 18, `${id} has no place in the order`);
    }
  }
});

test('the difficulty curve the write-ups assume is the curve the numbers draw', () => {
  const ordered = BOSS_IDS.map((id) => BESTIARY[id]);
  const early = ordered.filter((b) => b.tier <= 4);
  const late = ordered.filter((b) => b.tier >= 8);
  assert.ok(early.length >= 4 && late.length >= 4, 'there is an early game and a late one');
  const mean = (list, key) => list.reduce((s, b) => s + b[key], 0) / list.length;
  assert.ok(mean(late, 'hp') > mean(early, 'hp') * 1.5, 'the late ones take much more killing');
  assert.ok(mean(late, 'poise') > mean(early, 'poise') * 1.5, 'and much more moving');
});

test('the warden never uses the hand that is holding the lantern', () => {
  // Caught by reading a generated art prompt out loud: the slam tell said
  // "both hands overhead" while the write-up said it fights one-handed the
  // entire fight and never considers letting go. The one-handed line is the
  // ending of the game, so the tell was the thing that was wrong.
  const warden = BESTIARY['the-lantern-warden'];
  assert.match(BOSS_LORE['the-lantern-warden'].look.en, /one-handed/);
  for (const move of warden.moves) {
    assert.ok(
      !/both hands|two hands|overhead with both/i.test(move.tell),
      `${move.id} uses a hand the warden does not have free`,
    );
  }
});
