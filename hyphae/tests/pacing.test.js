// The balance guard. An idle game lives or dies on its curve, so the curve is
// pinned by a test: a reference player plays the real engine for an hour and
// the milestones have to land in a human band.
//
// This is the test that caught the two design bugs that mattered — a manual
// button that scaled with prestige currency, and a power-law prestige payout
// that made the whole economy doubly exponential.

import test from 'node:test';
import assert from 'node:assert/strict';

import * as E from '../src/game/engine.js';
import { TIERS } from '../src/game/config.js';

const SPEND_ORDER = [
  'auto1',
  'roots',
  'auto2',
  'offline',
  'roots',
  'bloomier',
  'auto3',
  'roots',
  'cheap',
  'symbiosis',
];

/** Buys the deepest tier it can afford, forages while poor, blooms sensibly. */
function playFor(seconds) {
  const s = E.newState();
  const blooms = [];
  let lastBloom = 0;

  for (let t = 0; t < seconds; t++) {
    E.advance(s, 1);
    if (t % 2 === 0 && s.biomass.lt(1e4)) E.forage(s);
    for (let pass = 0; pass < 3; pass++) {
      for (let i = TIERS.length - 1; i >= 0; i--) {
        const n = E.affordable(s, i);
        if (n >= 1) {
          E.buy(s, i, Math.min(n, 10));
          break;
        }
      }
    }
    E.runAutomation(s);
    E.checkAchievements(s);

    const gain = E.bloomGain(s);
    // A real player blooms when the haul is a meaningful slice of the total.
    if (gain.gte(1) && gain.gte(s.totalSpores.mul(0.3))) {
      blooms.push({ at: t, cycle: t - lastBloom, gain: gain.toNumber() });
      lastBloom = t;
      E.bloom(s);
      for (const id of SPEND_ORDER) while (E.buyMutation(s, id)) {}
    }
  }
  return { state: s, blooms };
}

test('the first ten minutes have something happening every minute', () => {
  const { state } = playFor(600);
  assert.ok(state.tiers[0].bought >= 20, 'hyphae should be flowing');
  assert.ok(state.tiers[2].bought >= 1, 'and the third tier should be in reach');
  assert.ok(state.totalEarned.gte(1e6), `earned only ${state.totalEarned}`);
  assert.ok(state.achievements.length >= 4, 'records should be landing');
});

test('the first bloom lands in the first half hour', () => {
  const { blooms } = playFor(35 * 60);
  assert.ok(blooms.length >= 1, 'a player should reach prestige inside 35 minutes');
  const first = blooms[0].at / 60;
  assert.ok(first > 5, `first bloom at ${first.toFixed(1)}m is suspiciously early`);
  assert.ok(first < 25, `first bloom at ${first.toFixed(1)}m is too far away`);
});

test('an hour in, the game has opened up but is not finished', () => {
  const { state, blooms } = playFor(3600);
  const spores = state.totalSpores.toNumber();

  assert.ok(spores >= 10, `only ${spores} spores in an hour`);
  assert.ok(spores <= 5000, `${spores} spores in an hour means the loop is running away`);
  assert.ok(blooms.length >= 4 && blooms.length <= 40, `${blooms.length} blooms in an hour`);
  assert.ok(E.mutationLevel(state, 'auto1') > 0, 'automation should be affordable within the hour');

  const unmaxed = ['roots', 'cheap', 'bloomier'].filter(
    (id) => E.mutationCost(state, id) !== null,
  );
  assert.equal(unmaxed.length, 3, 'the upgrade tree must still have room after an hour');
});

test('bloom cycles stay in minutes, never seconds', () => {
  const { blooms } = playFor(3600);
  const later = blooms.slice(2);
  assert.ok(later.length > 0);
  for (const b of later) {
    assert.ok(b.cycle >= 30, `a ${b.cycle}s cycle is a slot machine, not a prestige loop`);
  }
});

test('the prestige loop converges instead of exploding', () => {
  const { blooms } = playFor(3600);
  // Later blooms may pay more, but never orders of magnitude more per cycle.
  for (let i = 1; i < blooms.length; i++) {
    const ratio = blooms[i].gain / Math.max(1, blooms[i - 1].gain);
    assert.ok(ratio < 4, `bloom #${i + 1} paid ${ratio.toFixed(1)}x the one before it`);
  }
});

test('an idle player still progresses, just slower', () => {
  const active = playFor(1800).state;

  const idle = E.newState();
  E.buy(idle, 0, 1);
  for (let t = 0; t < 1800; t++) {
    E.advance(idle, 1);
    E.runAutomation(idle);
  }
  assert.ok(idle.totalEarned.gt(0), 'the network grows on its own');
  assert.ok(
    active.totalEarned.gt(idle.totalEarned),
    'but playing should beat leaving it alone',
  );
});
