import test from 'node:test';
import assert from 'node:assert/strict';

import { angleDiff, damp, pointSegmentDist, wrapAngle, clamp, TAU } from '../src/core/mathx.js';
import { dailySeed, dayKey, hashString, makeRng, mulberry32 } from '../src/core/rng.js';

test('wrapAngle lands in (-PI, PI]', () => {
  for (const a of [0, 3, -3, 7, -7, 100, -100]) {
    const w = wrapAngle(a);
    assert.ok(w > -Math.PI - 1e-9 && w <= Math.PI + 1e-9, `${a} -> ${w}`);
    assert.ok(Math.abs(Math.cos(w) - Math.cos(a)) < 1e-9);
    assert.ok(Math.abs(Math.sin(w) - Math.sin(a)) < 1e-9);
  }
});

test('angleDiff takes the short way around', () => {
  assert.ok(Math.abs(angleDiff(0.1, TAU - 0.1) - 0.2) < 1e-9);
  assert.ok(Math.abs(angleDiff(-3.1, 3.1) - (TAU - 6.2)) < 1e-9);
});

test('pointSegmentDist clamps to the segment ends', () => {
  assert.equal(pointSegmentDist(0, 5, -10, 0, 10, 0), 5);
  assert.equal(pointSegmentDist(20, 0, -10, 0, 10, 0), 10);
  assert.equal(pointSegmentDist(0, 0, 0, 0, 0, 0), 0);
});

test('damp converges without overshooting', () => {
  let v = 0;
  for (let i = 0; i < 200; i++) v = damp(v, 10, 6, 1 / 60);
  assert.ok(v > 9.9 && v <= 10);
});

test('clamp respects bounds', () => {
  assert.equal(clamp(5, 0, 1), 1);
  assert.equal(clamp(-5, 0, 1), 0);
  assert.equal(clamp(0.5, 0, 1), 0.5);
});

test('mulberry32 is deterministic and in range', () => {
  const a = mulberry32(1234);
  const b = mulberry32(1234);
  for (let i = 0; i < 500; i++) {
    const v = a();
    assert.equal(v, b());
    assert.ok(v >= 0 && v < 1);
  }
});

test('different seeds diverge', () => {
  const a = makeRng('alpha');
  const b = makeRng('beta');
  assert.notEqual(a.next(), b.next());
});

test('rng helpers stay inside their bounds', () => {
  const r = makeRng(7);
  for (let i = 0; i < 300; i++) {
    const v = r.range(-3, 9);
    assert.ok(v >= -3 && v < 9);
    const n = r.int(2, 5);
    assert.ok(n >= 2 && n <= 5 && Number.isInteger(n));
    assert.ok(['a', 'b', 'c'].includes(r.pick(['a', 'b', 'c'])));
  }
});

test('hashString is stable and unsigned', () => {
  assert.equal(hashString('nova'), hashString('nova'));
  assert.ok(hashString('nova') >= 0);
  assert.notEqual(hashString('nova'), hashString('novb'));
});

test('daily seed is one per calendar day', () => {
  const d1 = new Date(2026, 7, 4, 1, 0, 0);
  const d2 = new Date(2026, 7, 4, 23, 59, 0);
  const d3 = new Date(2026, 7, 5, 12, 0, 0);
  assert.equal(dayKey(d1), '2026-08-04');
  assert.equal(dailySeed(d1), dailySeed(d2));
  assert.notEqual(dailySeed(d1), dailySeed(d3));
});
