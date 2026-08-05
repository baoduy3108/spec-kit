import test from 'node:test';
import assert from 'node:assert/strict';

import * as E from '../src/game/engine.js';
import { BLOOM, MUTATIONS, TIERS } from '../src/game/config.js';
import { D } from '../src/core/decimal.js';

const rich = (biomass = 1e12) => {
  const s = E.newState();
  s.biomass = D(biomass);
  return s;
};

test('a fresh state can afford exactly one Hypha', () => {
  const s = E.newState();
  assert.equal(E.affordable(s, 0), 1);
  assert.equal(E.buy(s, 0, 1), 1);
  assert.equal(s.tiers[0].bought, 1);
  assert.ok(s.tiers[0].count.eq(1));
  assert.equal(E.affordable(s, 0), 0, 'and then it is broke');
});

test('affordable() closed form matches buying one at a time', () => {
  for (const i of [0, 2, 5]) {
    for (const money of [1e3, 1e7, 1e15, 1e40]) {
      const closed = E.affordable(rich(money), i);
      const slow = rich(money);
      let n = 0;
      while (E.buy(slow, i, 1) === 1 && n < 10000) n++;
      assert.equal(closed, n, `tier ${i} with ${money}`);
    }
  }
});

test('buying n at once costs the same as buying n one at a time', () => {
  const a = rich(1e18);
  const b = rich(1e18);
  E.buy(a, 1, 25);
  for (let k = 0; k < 25; k++) E.buy(b, 1, 1);
  assert.ok(Math.abs(a.biomass.log10() - b.biomass.log10()) < 1e-9);
  assert.equal(a.tiers[1].bought, b.tiers[1].bought);
});

test('every tenth purchase doubles the tier output', () => {
  const s = rich(1e30);
  const before = E.unitRate(s, 0);
  E.buy(s, 0, 9);
  assert.ok(E.unitRate(s, 0).eq(before), '9 is not yet a boost');
  E.buy(s, 0, 1);
  assert.ok(Math.abs(E.unitRate(s, 0).div(before).toNumber() - 2) < 1e-9);
  E.buy(s, 0, 10);
  assert.ok(Math.abs(E.unitRate(s, 0).div(before).toNumber() - 4) < 1e-9);
});

test('the closed-form advance matches fine-grained integration', () => {
  const build = () => {
    const s = rich(1e14);
    for (let i = 0; i < 6; i++) E.buy(s, i, 30 - i * 3);
    s.biomass = D(0);
    return s;
  };
  const exact = build();
  const stepped = build();
  E.advance(exact, 900);
  for (let k = 0; k < 90000; k++) E.advance(stepped, 0.01);

  const relative = Math.abs(exact.biomass.log10() - stepped.biomass.log10());
  assert.ok(relative < 1e-6, `closed form ${exact.biomass} vs stepped ${stepped.biomass}`);
  for (let i = 0; i < TIERS.length; i++) {
    if (exact.tiers[i].count.isZero()) continue;
    assert.ok(Math.abs(exact.tiers[i].count.log10() - stepped.tiers[i].count.log10()) < 1e-6);
  }
});

test('advancing in one jump equals advancing in pieces', () => {
  const one = rich(1e12);
  const many = rich(1e12);
  for (const s of [one, many]) for (let i = 0; i < 5; i++) E.buy(s, i, 20);
  E.advance(one, 600);
  for (let k = 0; k < 600; k++) E.advance(many, 1);
  assert.ok(Math.abs(one.biomass.log10() - many.biomass.log10()) < 1e-9);
});

test('time only ever adds biomass', () => {
  const s = E.newState();
  E.buy(s, 0, 1);
  const before = s.biomass;
  const gained = E.advance(s, 60);
  assert.ok(gained.gt(0));
  assert.ok(s.biomass.gt(before));
  assert.ok(s.earned.gte(gained));
  assert.equal(s.stats.playTime, 60);
});

test('nothing grows from nothing', () => {
  const s = E.newState();
  const before = s.biomass;
  E.advance(s, 3600);
  assert.ok(s.biomass.eq(before), 'an empty network is not a perpetual motion machine');
});

test('foraging is worth seconds of income, never a multiple of prestige', () => {
  // Regression: scaling the manual button with total spores turned every
  // bloom into a one-click restart and collapsed the whole prestige loop.
  const poor = E.newState();
  const spored = E.newState();
  spored.totalSpores = D(1e30);
  assert.ok(
    E.forageValue(spored).lte(E.forageValue(poor).mul(10)),
    'spores must not inflate the click',
  );

  const grown = rich(1e9);
  E.buy(grown, 0, 40);
  const click = E.forageValue(grown);
  const perSecond = E.biomassRate(grown);
  assert.ok(click.gte(perSecond) && click.lte(perSecond.mul(4)));
});

test('bloom pays on a log scale and resets the network', () => {
  const s = E.newState();
  assert.ok(E.bloomGain(s).isZero(), 'no free spores');
  s.earned = D(BLOOM.threshold).mul(0.9);
  assert.ok(E.bloomGain(s).isZero(), 'and none below the threshold');

  s.earned = D(BLOOM.threshold).mul(1e6);
  const small = E.bloomGain(s);
  s.earned = D(BLOOM.threshold).mul(1e12);
  const big = E.bloomGain(s);
  assert.ok(big.gt(small));
  assert.ok(
    big.lt(small.mul(3)),
    'a million times the biomass must not pay a million times the spores',
  );

  E.buy(s, 0, 5);
  const gain = E.bloom(s);
  assert.ok(gain.gte(1));
  assert.ok(s.spores.eq(gain));
  assert.ok(s.totalSpores.eq(gain));
  assert.equal(s.blooms, 1);
  assert.ok(s.earned.isZero());
  assert.ok(s.tiers[0].count.isZero());
  assert.equal(s.tiers[0].bought, 0);
});

test('Spore Wind keeps a slice of the network through a bloom', () => {
  const s = rich(1e30);
  s.mutations.wind = 2; // keep 20%
  E.buy(s, 0, 50);
  s.earned = D(BLOOM.threshold).mul(1e9);
  E.bloom(s);
  assert.equal(s.tiers[0].bought, 10);
  assert.ok(s.tiers[0].count.eq(10));
});

test('mutations cost more each level and stop at their cap', () => {
  const s = E.newState();
  s.spores = D('1e40'); // enough that the cap, not the budget, is the limit
  for (const m of MUTATIONS) {
    let level = 0;
    let previous = 0;
    while (E.buyMutation(s, m.id)) {
      const cost = E.mutationCost(s, m.id);
      if (cost) {
        assert.ok(cost.toNumber() > previous, `${m.id} must get pricier`);
        previous = cost.toNumber();
      }
      level++;
      assert.ok(level <= m.levels + 1, `${m.id} ran past its cap`);
    }
    assert.equal(E.mutationLevel(s, m.id), m.levels);
    assert.equal(E.mutationCost(s, m.id), null);
  }
});

test('a mutation you cannot afford changes nothing', () => {
  const s = E.newState();
  assert.equal(E.buyMutation(s, 'roots'), false);
  assert.equal(E.mutationLevel(s, 'roots'), 0);
  assert.ok(s.spores.isZero());
  assert.equal(E.buyMutation(s, 'not-a-real-mutation'), false);
});

test('automation only touches the tiers it was bought for', () => {
  const s = rich(1e30);
  assert.deepEqual(E.automatedTiers(s), []);
  assert.equal(E.runAutomation(s), 0);

  s.mutations.auto1 = 1;
  assert.deepEqual(E.automatedTiers(s), [0, 1]);
  E.runAutomation(s);
  assert.ok(s.tiers[0].bought > 0 && s.tiers[1].bought > 0);
  assert.equal(s.tiers[2].bought, 0, 'tier 3 is not automated yet');

  s.mutations.auto3 = 1;
  E.runAutomation(s);
  assert.ok(s.tiers[7].bought > 0, 'the canopy reflex reaches the top tier');
});

test('automation spends on the deepest tier first', () => {
  const s = rich(1e14);
  s.mutations.auto1 = 1;
  s.mutations.auto2 = 1;
  E.runAutomation(s);
  // Fruiting Bodies are the most expensive automated tier at this budget.
  assert.ok(s.tiers[3].bought > 0, 'it should reach for the top of its range');
});

test('achievements unlock once and only once', () => {
  const s = E.newState();
  E.buy(s, 0, 1);
  const first = E.checkAchievements(s);
  assert.ok(first.some((a) => a.id === 'first'));
  const second = E.checkAchievements(s);
  assert.equal(second.length, 0);
  assert.equal(new Set(s.achievements).size, s.achievements.length);
});

test('records make the whole network slightly better', () => {
  const bare = E.newState();
  const decorated = E.newState();
  decorated.achievements = ['first', 'ten', 'node'];
  assert.ok(E.globalMultiplier(decorated).gt(E.globalMultiplier(bare)));
});
