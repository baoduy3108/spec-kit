import test from 'node:test';
import assert from 'node:assert/strict';

import { SCORE, difficultyAt, multiplierFor } from '../src/game/config.js';
import {
  addAltitude,
  applyRelease,
  collectShard,
  newRun,
  novaActive,
  summary,
  tickNova,
  tryStartNova,
} from '../src/game/scoring.js';
import { allDone, applyRun, dailyMissions } from '../src/meta/missions.js';
import { SKINS, coinsForRun, skinById } from '../src/meta/skins.js';

test('difficulty only ever ramps up', () => {
  let prev = difficultyAt(0);
  for (let alt = 100; alt <= 60000; alt += 100) {
    const d = difficultyAt(alt);
    assert.ok(d.speed >= prev.speed);
    assert.ok(d.voidSpeed >= prev.voidSpeed);
    assert.ok(d.hazard >= prev.hazard && d.hazard <= 0.62);
    assert.ok(d.extraHazard >= prev.extraHazard && d.extraHazard <= 0.72);
    assert.ok(d.frail < 1);
    assert.ok(d.gapMin < d.gapMax);
    prev = d;
  }
});

test('speed plateaus so the controls stay readable, density does not', () => {
  const mid = difficultyAt(12000);
  const far = difficultyAt(90000);
  assert.equal(far.speed, mid.speed, 'top speed is capped');
  assert.equal(far.hazard, mid.hazard);
  assert.ok(far.extraHazard > mid.extraHazard, 'but the shaft keeps filling up');
  assert.deepEqual(difficultyAt(42000), difficultyAt(90000), 'the creep itself caps out');
});

test('the void never outruns the player at the same altitude', () => {
  // Climbing is worth ~55% of raw speed once weaving is accounted for.
  for (let alt = 0; alt <= 90000; alt += 250) {
    const d = difficultyAt(alt);
    assert.ok(d.voidSpeed < d.speed * 0.55, `void too fast at ${alt}`);
  }
});

test('perfect releases chain, sloppy ones cost half the chain', () => {
  const run = newRun();
  for (let i = 0; i < 5; i++) applyRelease(run, 'perfect');
  assert.equal(run.combo, 5);
  assert.equal(run.perfects, 5);
  applyRelease(run, 'ok');
  assert.equal(run.combo, 2);
  applyRelease(run, 'snap');
  assert.equal(run.combo, 0);
  assert.equal(run.bestCombo, 5);
});

test('multiplier is capped', () => {
  assert.equal(multiplierFor(0), 1);
  assert.ok(multiplierFor(4) > multiplierFor(2));
  assert.equal(multiplierFor(1000), SCORE.maxMultiplier);
});

test('altitude only scores upward movement', () => {
  const run = newRun();
  addAltitude(run, 1000);
  const afterClimb = run.score;
  assert.ok(afterClimb > 0);
  addAltitude(run, -500);
  assert.equal(run.score, afterClimb);
  assert.equal(run.altitude, 1000);
});

test('score scales with the combo multiplier', () => {
  const plain = newRun();
  addAltitude(plain, 1000);

  const chained = newRun();
  for (let i = 0; i < 6; i++) applyRelease(chained, 'perfect');
  const bonusOnly = chained.score;
  addAltitude(chained, 1000);
  assert.ok(chained.score - bonusOnly > plain.score);
});

test('nova charges on perfects, fires once, then drains', () => {
  const run = newRun();
  assert.equal(tryStartNova(run), false);
  for (let i = 0; i < 6; i++) applyRelease(run, 'perfect');
  assert.equal(run.novaCharge, 1);
  assert.equal(tryStartNova(run), true);
  assert.equal(tryStartNova(run), false, 'no double surge');
  assert.ok(novaActive(run));
  // charging is disabled mid-surge
  collectShard(run);
  assert.equal(run.novaCharge, 0);
  for (let i = 0; i < 400; i++) tickNova(run, 1 / 60);
  assert.ok(!novaActive(run));
  assert.equal(run.novaCount, 1);
});

test('summary reports honest numbers', () => {
  const run = newRun(1);
  addAltitude(run, 5000);
  applyRelease(run, 'perfect');
  applyRelease(run, 'ok');
  collectShard(run);
  const s = summary(run);
  assert.equal(s.depth, 500);
  assert.equal(s.shards, 1);
  assert.equal(s.perfects, 1);
  assert.ok(Math.abs(s.accuracy - 0.5) < 1e-9);
  assert.ok(Number.isInteger(s.score));
});

test('daily missions are deterministic, distinct and rewarded', () => {
  const a = dailyMissions(12345);
  const b = dailyMissions(12345);
  assert.deepEqual(a, b);
  assert.equal(a.length, 3);
  assert.equal(new Set(a.map((m) => m.id)).size, 3);
  for (const m of a) {
    assert.ok(m.goal > 0 && m.reward > 0 && m.progress === 0 && !m.done);
  }
  assert.notDeepEqual(
    dailyMissions(1).map((m) => m.id),
    dailyMissions(999).map((m) => m.id),
  );
});

test('cumulative missions add up, per-run missions take the best', () => {
  const missions = [
    { id: 'shards', stat: 'shards', cumulative: true, goal: 10, progress: 0, done: false, reward: 60, text: '' },
    { id: 'depth', stat: 'depth', cumulative: false, goal: 100, progress: 0, done: false, reward: 60, text: '' },
  ];
  let state = applyRun(missions, { shards: 6, depth: 40, runs: 1 });
  assert.equal(state.earned, 0);
  assert.equal(state.missions[0].progress, 6);
  assert.equal(state.missions[1].progress, 40);

  state = applyRun(state.missions, { shards: 6, depth: 20, runs: 1 });
  assert.equal(state.missions[0].done, true, 'shards accumulate across runs');
  assert.equal(state.missions[1].progress, 40, 'depth keeps the best run');
  assert.equal(state.earned, 60);

  state = applyRun(state.missions, { shards: 99, depth: 120, runs: 1 });
  assert.equal(state.earned, 60, 'a finished mission never pays twice');
  assert.ok(allDone(state.missions));
});

test('skins are cosmetic and priced in a rising curve', () => {
  let prev = -1;
  for (const s of SKINS) {
    assert.ok(s.cost > prev);
    prev = s.cost;
    assert.ok(s.palette.hull && s.palette.glow && s.palette.trail);
    assert.deepEqual(Object.keys(s).sort(), ['cost', 'id', 'name', 'palette', 'tagline']);
  }
  assert.equal(SKINS[0].cost, 0, 'the default skin is free');
  assert.equal(skinById('nope').id, SKINS[0].id, 'unknown ids fall back safely');
});

test('run payout rewards depth, shards and chains', () => {
  const small = coinsForRun({ shards: 5, score: 200, combo: 1 });
  const big = coinsForRun({ shards: 40, score: 4000, combo: 12 });
  assert.ok(big > small * 5);
  assert.ok(Number.isInteger(big));
});
