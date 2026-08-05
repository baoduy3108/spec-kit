// Headless play-through: a bot flies the real World for thousands of steps.
// This is the closest thing to a playtest we can run in CI.

import test from 'node:test';
import assert from 'node:assert/strict';

import { World } from '../src/game/world.js';
import { PLAYER, SWEET_HALF, VIEW, WALL } from '../src/game/config.js';
import { angleDiff } from '../src/core/mathx.js';

const STEP = 1 / 120;

/** Minimal stand-in for core/input.js. */
function fakeInput() {
  return { held: false, pressed: false, released: false, clear() {} };
}

/**
 * Autopilot: hold to grab whatever is in range, let go when the swing angle
 * enters the perfect window. Deliberately dumb — it exercises the real code
 * paths without any knowledge of the level layout.
 */
function bot(world, input) {
  const info = world.sweetInfo();
  if (!info) {
    input.held = true;
    return;
  }
  const off = Math.abs(angleDiff(world.tether.angle, info.angle));
  input.held = off > SWEET_HALF * 0.45;
}

function play(seed, steps, events = null) {
  const world = new World((type, e) => events && events.push([type, e && e.combo]));
  world.reset(seed, 'endless');
  const input = fakeInput();
  for (let i = 0; i < steps && !world.dead; i++) {
    bot(world, input);
    world.update(STEP, input);
  }
  return world;
}

test('a run advances, scores and stays inside the shaft', () => {
  const events = [];
  const world = play(20260804, 120 * 60, events);
  assert.ok(world.run.altitude > 1500, `bot should climb (got ${world.run.altitude | 0})`);
  assert.ok(world.run.score > 0);
  assert.ok(world.player.x >= WALL - 1 && world.player.x <= VIEW.W - WALL + 1);
  assert.ok(Number.isFinite(world.player.x) && Number.isFinite(world.player.y));
  assert.ok(events.some(([t]) => t === 'hook'), 'the bot hooked at least once');
  assert.ok(events.some(([t]) => t === 'perfect'), 'and landed perfect releases');
});

test('the same seed replays identically', () => {
  const a = play(4242, 6000);
  const b = play(4242, 6000);
  assert.equal(a.run.score, b.run.score);
  assert.equal(a.run.altitude, b.run.altitude);
  assert.equal(a.player.x, b.player.x);
  assert.equal(a.player.y, b.player.y);
  const c = play(4243, 6000);
  assert.notEqual(a.run.score, c.run.score);
});

test('a passive player is eventually eaten by the void', () => {
  const world = new World();
  world.reset(11, 'endless');
  const input = fakeInput(); // never presses
  let steps = 0;
  while (!world.dead && steps < 120 * 120) {
    world.update(STEP, input);
    steps++;
  }
  assert.ok(world.dead, 'doing nothing must eventually end the run');
  assert.ok(['void', 'wall', 'mine', 'spinner', 'pulsar'].includes(world.deathCause));
});

test('death stops the simulation and revive restarts it', () => {
  const world = new World();
  world.reset(3, 'endless');
  const input = fakeInput();
  world.die('void');
  const frozen = { ...world.player };
  world.update(STEP, input);
  assert.deepEqual({ ...world.player }, frozen, 'a dead world does not move');

  const voidBefore = world.voidY;
  world.revive();
  assert.equal(world.dead, false);
  assert.ok(world.voidY < voidBefore, 'the void is pushed back down');
  assert.ok(world.invuln > 0);
  assert.equal(world.run.revives, 1);
  world.update(STEP, input);
  assert.notEqual(world.player.y, frozen.y, 'and the player moves again');
});

test('nova surge makes the player briefly untouchable', () => {
  const world = new World();
  world.reset(8, 'endless');
  world.invuln = 0;
  world.run.novaTimer = 2;
  const hazard = {
    kind: 'mine',
    x: world.player.x,
    y: world.player.y,
    r: 15,
    drift: 0,
    homeX: world.player.x,
    phase: 0,
    dead: false,
  };
  world.level.hazards.push(hazard);
  world.update(STEP, fakeInput());
  assert.equal(world.dead, false);
  assert.equal(hazard.dead, true, 'the surge destroys what it touches');
});

test('the camera keeps the player on screen', () => {
  const world = play(99, 120 * 45);
  const screenY = world.player.y - world.cam.y;
  assert.ok(screenY > -PLAYER.r && screenY < VIEW.H, `player off screen at ${screenY | 0}`);
});

test('difficulty lands in a sane band for a bot that never dodges', () => {
  const times = [];
  for (let seed = 1; seed <= 12; seed++) {
    const world = play(seed, 120 * 240);
    assert.ok(world.dead, `seed ${seed} must end within four minutes`);
    times.push(world.time);
  }
  times.sort((a, b) => a - b);
  const median = times[times.length >> 1];
  // The bot flies the perfect line but ignores every hazard, so it is a
  // reasonable floor for a competent player: runs should be worth restarting,
  // not endless.
  assert.ok(median > 8, `runs are too short (median ${median.toFixed(1)}s)`);
  assert.ok(median < 90, `runs drag on (median ${median.toFixed(1)}s)`);
});
