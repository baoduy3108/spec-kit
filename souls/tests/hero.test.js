// The hero replaced the knight, and the only thing worth testing about a
// character write-up is that it stayed inside the world that already existed.

import test from 'node:test';
import assert from 'node:assert/strict';

import { HERO, HERO_FIELDS } from '../src/hero.js';
import { ABILITIES } from '../src/abilities.js';
import { BESTIARY } from '../src/bosses.js';

test('both languages, no markup, and nothing thin', () => {
  for (const f of HERO_FIELDS) {
    const pair = HERO[f];
    assert.ok(pair.en && pair.vi, `${f} is missing a language`);
    for (const t of [pair.en, pair.vi]) {
      assert.ok(!/[*_`]|<[a-z/]/i.test(t), `${f} has markup`);
      assert.ok(t.length > 60, `${f} is too thin`);
    }
  }
  assert.ok(HERO.name.en && HERO.name.vi);
  assert.ok(HERO.silhouette.length >= 4, 'the drawing needs something to be checked against');
});

test('it is not a knight, and it says what it is instead', () => {
  assert.match(HERO.line.en, /not a knight/i);
  assert.match(HERO.look.en, /lantern/i, 'the lanterns are the silhouette');
  assert.match(HERO.arm.en, /kiln|clay|mould/i, 'the arm ties it to the world');
});

test('it lands on the ending the world already had', () => {
  // story.js ends on the Warden: somebody has to carry it, and nobody said the
  // carrier gets to put it down. The hero's ending has to arrive at that line,
  // not at one of its own.
  const warden = BESTIARY['the-lantern-warden'].line.en;
  assert.ok(
    HERO.ending.en.includes('Somebody has to carry it'),
    'the hero has to end where the Warden already stood',
  );
  assert.match(warden, /Somebody has to carry it/);
});

test('the abilities still describe this character', () => {
  // kindle lights the lantern off its own cracks — that only makes sense with
  // the arm, so the two files have to agree.
  assert.match(ABILITIES.kindle.line.en, /cracks|chest/i);
  assert.match(HERO.arm.en, /cracks/i);
});
