import test from 'node:test';
import assert from 'node:assert/strict';

import { D, Decimal, ONE, ZERO } from '../src/core/decimal.js';

const close = (a, b, tol = 1e-9) => {
  const av = a instanceof Decimal ? a.toNumber() : a;
  assert.ok(Math.abs(av - b) <= tol * Math.max(1, Math.abs(b)), `${av} != ${b}`);
};

test('round trips plain numbers', () => {
  for (const n of [0, 1, 7, 12.5, 1e6, 1.234e30, 9.999e99, 5e-8]) {
    close(D(n), n);
  }
  assert.equal(D(0).isZero(), true);
  assert.equal(D(0).sign, 0);
});

test('mantissa is always normalised', () => {
  for (const n of [1, 9.99, 1e5, 3.3e-4, 6.02e23]) {
    const d = D(n);
    assert.ok(Math.abs(d.m) >= 1 && Math.abs(d.m) < 10, `${d} not normalised`);
  }
  assert.equal(D(1000).m, 1);
  assert.equal(D(1000).e, 3);
});

test('addition matches doubles in range, and ignores negligible terms', () => {
  close(D(2).add(3), 5);
  close(D(1e20).add(D(5e19)), 1.5e20);
  close(D(7).add(0), 7);
  close(D(0).add(7), 7);
  // 1e100 + 1 is still 1e100
  assert.equal(D(1e100).add(1).log10(), 100);
});

test('subtraction, including down to zero', () => {
  close(D(10).sub(3), 7);
  close(D(1e30).sub(D(1e30)), 0);
  assert.ok(D(3).sub(5).sign < 0);
});

test('multiplication and division survive far past 1e308', () => {
  const big = D(1e300).mul(D(1e300));
  assert.equal(big.log10(), 600);
  const huge = D('1e5000').mul(D('1e5000'));
  assert.equal(huge.log10(), 10000);
  close(D(1e300).mul(D(1e300)).div(D(1e300)), 1e300, 1e-9);
  assert.equal(D(5).div(0).isZero(), true);
});

test('pow works with huge and fractional exponents', () => {
  close(D(2).pow(10), 1024, 1e-12);
  assert.equal(D(10).pow(500).log10(), 500);
  close(D(1e10).pow(0.4), Math.pow(1e10, 0.4), 1e-9);
  assert.equal(D(1.5).pow(2000).log10() > 350, true, 'must exceed the double range');
  assert.equal(D(7).pow(0).eq(ONE), true);
  assert.equal(D(0).pow(3).isZero(), true);
});

test('log10 agrees with Math.log10 inside the double range', () => {
  for (const n of [1, 2, 1234, 9.87e15]) {
    assert.ok(Math.abs(D(n).log10() - Math.log10(n)) < 1e-12);
  }
  assert.equal(D(0).log10(), -Infinity);
});

test('comparison is total and sign-aware', () => {
  assert.ok(D(1e50).gt(D(1e49)));
  assert.ok(D(2).lt(D(3)));
  assert.ok(D(3).gte(D(3)));
  assert.ok(D(-5).lt(D(1)));
  assert.ok(D(-5).lt(D(-1)));
  assert.equal(D(42).cmp(D(42)), 0);
  assert.ok(D(0).lt(D(1e-30)));
  assert.equal(D(1e20).max(D(1e21)).log10(), 21);
  assert.equal(D(1e20).min(D(1e21)).log10(), 20);
});

test('serialises and restores exactly', () => {
  for (const n of ['1e5000', '3.3e-40', '1', '0']) {
    const d = D(n);
    const back = Decimal.fromJSON(JSON.parse(JSON.stringify(d.toJSON())));
    assert.equal(back.m, d.m);
    assert.equal(back.e, d.e);
  }
  assert.equal(Decimal.fromJSON(null).isZero(), true);
});

test('a hundred thousand compounding multiplies stay stable', () => {
  let v = ONE;
  for (let i = 0; i < 100000; i++) v = v.mul(1.0001);
  // (1.0001)^100000 = e^10 in log10 terms
  assert.ok(Math.abs(v.log10() - 100000 * Math.log10(1.0001)) < 1e-6);
  assert.ok(Math.abs(v.m) >= 1 && Math.abs(v.m) < 10);
});

test('zero and identity behave', () => {
  assert.ok(ZERO.isZero());
  assert.ok(ONE.eq(D(1)));
  assert.ok(ZERO.mul(D('1e900')).isZero());
  assert.ok(ZERO.add(ZERO).isZero());
});
