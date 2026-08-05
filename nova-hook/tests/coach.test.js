import test from 'node:test';
import assert from 'node:assert/strict';

import { Coach, TUTORIAL_SAFE_UNTIL } from '../src/game/coach.js';
import { Level } from '../src/game/level.js';
import { World } from '../src/game/world.js';
import { makeRng } from '../src/core/rng.js';

/** Stand-in for the parts of World the coach reads. */
function stubWorld(tether = null, sweet = 0) {
  return { tether, sweetInfo: () => (tether ? { angle: sweet } : null) };
}

test('the intro waits for the first press instead of running away', () => {
  const coach = new Coach();
  coach.start();
  assert.ok(coach.active);
  assert.match(coach.text, /HOLD/);
  assert.ok(coach.emphasising, 'the first anchor is highlighted');

  // Not hooked yet: the world crawls, however long the player takes.
  for (let i = 0; i < 600; i++) {
    assert.ok(coach.update(stubWorld(null), 1 / 60) < 0.4);
  }
  assert.match(coach.text, /HOLD/, 'and it keeps asking');

  coach.onEvent('hook', {});
  coach.update(stubWorld({ angle: 0 }), 1 / 60);
  assert.match(coach.text, /LET GO/);
  assert.ok(!coach.emphasising);
});

test('the release step slows down as the swing enters the window', () => {
  const coach = new Coach();
  coach.start();
  coach.onEvent('hook', {});
  coach.update(stubWorld({ angle: 3 }, 0), 1 / 60); // advance to 'release'

  const far = coach.update(stubWorld({ angle: 3 }, 0), 1 / 60);
  const near = coach.update(stubWorld({ angle: 0.02 }, 0), 1 / 60);
  assert.ok(near < far, 'bullet time near the green arc');
  assert.ok(near > 0.2 && far <= 0.8);
});

test('the wording adapts to whether the first release landed', () => {
  const missed = new Coach();
  missed.start();
  missed.onEvent('hook', {});
  missed.update(stubWorld({ angle: 0 }), 0.1);
  missed.onEvent('release', {});
  missed.update(stubWorld(null), 0.1);
  assert.match(missed.text, /Missed/);

  const nailed = new Coach();
  nailed.start();
  nailed.onEvent('hook', {});
  nailed.update(stubWorld({ angle: 0 }), 0.1);
  nailed.onEvent('perfect', { combo: 1 });
  nailed.update(stubWorld(null), 0.1);
  assert.match(nailed.text, /PERFECT/);
});

test('the intro ends on its own and never slows the game afterwards', () => {
  const coach = new Coach();
  coach.start();
  coach.onEvent('hook', {});
  coach.onEvent('perfect', { combo: 1 });
  let scale = 1;
  for (let i = 0; i < 60 * 40 && coach.active; i++) {
    scale = coach.update(stubWorld(null), 1 / 60);
  }
  assert.equal(coach.active, false, 'it finishes without being dismissed');
  assert.equal(coach.text, '');
  assert.equal(coach.update(stubWorld(null), 1 / 60), 1);
  assert.equal(scale, 1);
});

test('a finished intro stays finished until it is restarted', () => {
  const coach = new Coach();
  assert.equal(coach.active, false);
  assert.equal(coach.update(stubWorld(null), 1), 1);
  coach.onEvent('hook', {});
  assert.equal(coach.counts.hooks, 0, 'events are ignored while inactive');
});

test('the intro run spawns nothing dangerous until the player is climbing', () => {
  const level = new Level(makeRng(7), TUTORIAL_SAFE_UNTIL);
  level.ensure(TUTORIAL_SAFE_UNTIL + 4000);
  assert.ok(level.hazards.length > 0, 'hazards do start eventually');
  for (const h of level.hazards) {
    assert.ok(h.y >= TUTORIAL_SAFE_UNTIL, `hazard at ${h.y | 0} is inside the safe zone`);
  }
  const safeAnchors = level.anchors.filter((a) => a.y < TUTORIAL_SAFE_UNTIL);
  assert.ok(safeAnchors.length > 4);
  assert.ok(
    safeAnchors.every((a) => a.type === 'std'),
    'no frail anchors before the player has released once or twice',
  );
});

test('the intro run also pushes the void further back', () => {
  const plain = new World();
  plain.reset(5, 'endless');
  const intro = new World();
  intro.reset(5, 'endless', { safeUntil: TUTORIAL_SAFE_UNTIL });
  assert.ok(intro.voidY < plain.voidY - 500);
});
