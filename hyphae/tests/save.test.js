import test from 'node:test';
import assert from 'node:assert/strict';

import { deserialise, exportSave, importSave, serialise } from '../src/meta/save.js';
import * as E from '../src/game/engine.js';
import { D } from '../src/core/decimal.js';
import { fmt, fmtInt, fmtTime } from '../src/core/format.js';

function loadedState() {
  const s = E.newState(1000);
  s.biomass = D('4.2e918');
  s.totalEarned = D('9.1e1200');
  s.spores = D(4321);
  s.totalSpores = D('1.5e40');
  s.blooms = 17;
  s.mutations = { roots: 4, auto1: 1 };
  s.achievements = ['first', 'ten'];
  s.tiers[0].count = D('7.7e300');
  s.tiers[0].bought = 412;
  s.stats.bestSpores = D(999);
  s.stats.playTime = 12345;
  return s;
}

test('a save survives numbers no JSON number could hold', () => {
  const before = loadedState();
  const after = deserialise(JSON.parse(JSON.stringify(serialise(before))));
  assert.equal(after.biomass.log10().toFixed(6), before.biomass.log10().toFixed(6));
  assert.equal(after.totalEarned.log10().toFixed(6), before.totalEarned.log10().toFixed(6));
  assert.equal(after.tiers[0].count.log10().toFixed(6), before.tiers[0].count.log10().toFixed(6));
  assert.equal(after.tiers[0].bought, 412);
  assert.equal(after.blooms, 17);
  assert.deepEqual(after.mutations, before.mutations);
  assert.deepEqual(after.achievements, before.achievements);
  assert.equal(after.stats.playTime, 12345);
  assert.ok(after.stats.bestSpores.eq(999));
});

test('export and import round trip through a paste-able code', () => {
  const before = loadedState();
  const code = exportSave(before);
  assert.equal(typeof code, 'string');
  assert.ok(code.length > 20);
  const after = importSave(code);
  assert.ok(after.spores.eq(4321));
  assert.equal(after.blooms, 17);
});

test('junk never crashes the loader, it just starts a new forest', () => {
  for (const junk of ['', 'nonsense', '{]', 'aGVsbG8=']) {
    assert.equal(importSave(junk), null);
  }
  const fresh = deserialise({ biomass: 'not a number', tiers: 'nope', stats: null });
  assert.ok(Number.isFinite(fresh.biomass.log10()));
  assert.equal(fresh.tiers.length, E.newState().tiers.length);
  assert.ok(fresh.biomass.gt(0), 'and it is playable');
});

test('a save from nothing is a playable new game', () => {
  const s = deserialise(null);
  assert.ok(s.biomass.gte(1));
  assert.equal(E.affordable(s, 0), 1);
});

test('number formatting stays readable across the whole range', () => {
  assert.equal(fmt(0), '0');
  assert.equal(fmt(12), '12');
  assert.equal(fmt(1234), '1.23K');
  assert.equal(fmt(1.5e6), '1.5M');
  assert.equal(fmt(D('1e33')), '1Dc');
  assert.match(fmt(D('4.2e918')), /^4\.2e918$/);
  assert.equal(fmtInt(D(42)), '42');
  assert.equal(fmtTime(45), '45s');
  assert.equal(fmtTime(3700), '1h 1m');
  assert.equal(fmtTime(90000), '1d 1h');
  assert.equal(fmtTime(-1), '—');
});
