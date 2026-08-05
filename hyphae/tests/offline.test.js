// Offline progress is the promise of the genre: if this is wrong, the game is
// wrong. These tests pin down the cap, the efficiency and the exactness.

import test from 'node:test';
import assert from 'node:assert/strict';

import * as E from '../src/game/engine.js';
import { OFFLINE } from '../src/game/config.js';
import { D } from '../src/core/decimal.js';

function grown(biomass = 1e10, tiers = 5) {
  const s = E.newState();
  s.biomass = D(biomass);
  for (let i = 0; i < tiers; i++) E.buy(s, i, 25 - i * 3);
  return s;
}

test('a short absence changes nothing', () => {
  const s = grown();
  const before = s.biomass;
  const r = E.applyOffline(s, 0);
  assert.equal(r.simulated, 0);
  assert.ok(r.gained.isZero());
  assert.ok(s.biomass.eq(before));
});

test('offline time is capped and taxed, and says so', () => {
  const s = grown();
  const { capSeconds, efficiency } = E.offlineLimits(s);
  assert.equal(capSeconds, OFFLINE.baseCapHours * 3600);
  assert.equal(efficiency, OFFLINE.baseEfficiency);

  const r = E.applyOffline(s, 48 * 3600);
  assert.equal(r.capped, true);
  assert.equal(r.simulated, capSeconds * efficiency);
  assert.equal(r.away, 48 * 3600);
  assert.ok(r.gained.gt(0));
});

test('Night Shift buys both a longer cap and a better rate', () => {
  const s = grown();
  const base = E.offlineLimits(s);
  s.mutations.offline = 3;
  const better = E.offlineLimits(s);
  assert.ok(better.capSeconds > base.capSeconds);
  assert.ok(better.efficiency > base.efficiency);
  assert.ok(better.efficiency <= 1, 'efficiency never exceeds real time');

  s.mutations.offline = 99;
  assert.equal(E.offlineLimits(s).efficiency, 1);
});

test('without automation, offline is exactly the same as playing idle', () => {
  const away = grown();
  const idle = grown();
  const r = E.applyOffline(away, 3600);
  E.advance(idle, r.simulated);
  assert.ok(Math.abs(away.biomass.log10() - idle.biomass.log10()) < 1e-9);
});

test('automation keeps buying while you are away', () => {
  const manual = grown();
  const auto = grown();
  auto.mutations.auto1 = 1;
  auto.mutations.auto2 = 1;

  const rManual = E.applyOffline(manual, 4 * 3600);
  const rAuto = E.applyOffline(auto, 4 * 3600);

  assert.equal(rManual.bought, 0);
  assert.ok(rAuto.bought > 0, 'reflexes should have spent something');
  assert.ok(auto.tiers[0].bought > manual.tiers[0].bought);
  assert.ok(rAuto.gained.gt(rManual.gained), 'and that should have paid off');
});

test('the away summary reports what actually happened', () => {
  const s = grown();
  const before = s.totalEarned;
  const r = E.applyOffline(s, 2 * 3600);
  assert.ok(r.gained.eq(s.totalEarned.sub(before)));
  assert.equal(r.away, 7200);
  assert.equal(r.capped, false);
  assert.equal(s.stats.bestOffline, 7200);
});

test('best offline only ever goes up', () => {
  const s = grown();
  E.applyOffline(s, 5 * 3600);
  E.applyOffline(s, 60);
  assert.equal(s.stats.bestOffline, 5 * 3600);
});

test('a day away is worth more than an hour away', () => {
  const hour = grown();
  const day = grown();
  hour.mutations.offline = 6;
  day.mutations.offline = 6;
  const a = E.applyOffline(hour, 3600);
  const b = E.applyOffline(day, 24 * 3600);
  assert.ok(b.gained.gt(a.gained));
});
