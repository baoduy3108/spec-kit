// The render gate, tested against the two renders it was calibrated on.
//
// The pictures themselves cannot live in the repo (dist is build output, and
// rasterising needs a browser), so what is kept here is the measurement: every
// figure's contrast on the accepted undercroft sheet, and on the same sheet
// with the body-colour bug put back. The gate has to pass all of the first and
// fail the invisible hounds in the second. If someone lowers the line to make
// a warning go away, this says so.

import test from 'node:test';
import assert from 'node:assert/strict';

import { gateFigure } from '../tools/eye.js';

// contrast, ink — measured, not invented
const ACCEPTED = [
  ['husk', 122.1, 0.169],
  ['husk-torch', 212.6, 0.467],
  ['hound', 52.7, 0.318],
  ['hound-swift', 54.5, 0.18],
  ['husk-spear', 108.1, 0.412],
  ['husk', 46.5, 0.021],
  ['husk', 113.8, 0.311],
  ['husk', 112.9, 0.317],
];

const BUG_REINTRODUCED = [
  ['husk', 55.1, 0.111],
  ['husk-torch', 212.2, 0.274],
  ['hound', 36.0, 0.051], // the two that nobody could see
  ['hound-swift', 36.7, 0.053],
  ['husk-spear', 40.7, 0.134],
  ['husk', 46.5, 0.021],
  ['husk', 46.5, 0.138],
  ['husk', 45.5, 0.166],
];

const judge = ([foe, contrast, ink]) => gateFigure({ foe, contrast, ink });

test('the accepted sheet passes every figure', () => {
  for (const row of ACCEPTED) {
    assert.deepEqual(judge(row).bad, [], `${row[0]} at contrast ${row[1]} should pass`);
  }
});

test('the invisible hounds fail', () => {
  const hounds = BUG_REINTRODUCED.filter((r) => r[0].startsWith('hound'));
  for (const row of hounds) {
    assert.ok(judge(row).bad.length, `${row[0]} at contrast ${row[1]} slipped through`);
  }
});

test('the line sits between the two distributions, with the margin stated', () => {
  const worstGood = Math.min(...ACCEPTED.map((r) => r[1]));
  const worstBug = Math.min(...BUG_REINTRODUCED.map((r) => r[1]));
  assert.ok(worstBug < worstGood, 'the bug has to be measurably worse than the worst good figure');
  // 42 is the line. Keep it strictly between, so neither side can drift into it
  // without this failing.
  assert.ok(judge(['x', worstGood, 0.2]).bad.length === 0, `worst accepted figure (${worstGood}) must pass`);
  assert.ok(judge(['x', worstBug, 0.05]).bad.length > 0, `worst broken figure (${worstBug}) must fail`);
});

test('ink is never a hard gate, because measurement showed it inverts', () => {
  // On the accepted sheet a perfectly visible husk in a warm hall covers 2.1%
  // of its box; on the broken sheet the invisible hounds cover 5.1%. Any hard
  // gate on ink ranks the bug above the thing that is fine.
  const goodThin = judge(['husk', 46.5, 0.021]);
  const badFatter = judge(['hound', 36.0, 0.051]);
  assert.deepEqual(goodThin.bad, [], 'a thin but visible figure is not a failure');
  assert.ok(badFatter.bad.length, 'and a fatter invisible one still is');
  assert.ok(goodThin.soft.length, 'thinness is worth saying out loud, though');
});
