import test from 'node:test';
import assert from 'node:assert/strict';

import {
  attach,
  chooseAnchor,
  isPerfect,
  releaseAngleFor,
  releaseVelocity,
  stepSwing,
  sweetAngle,
  swingPosition,
  tangentAt,
  wallLimit,
} from '../src/game/physics.js';
import { PLAYER, SWEET_HALF, VIEW, WALL } from '../src/game/config.js';
import { TAU, angleDiff } from '../src/core/mathx.js';

const player = (x, y, vx, vy) => ({ x, y, vx, vy });

test('chooseAnchor ignores anchors out of range, behind, or broken', () => {
  const p = player(100, 100, 0, 300);
  const ahead = { x: 110, y: 320, broken: false };
  const behind = { x: 100, y: -80, broken: false };
  const far = { x: 100, y: 900, broken: false };
  const dead = { x: 105, y: 200, broken: true };
  assert.equal(chooseAnchor(p, [ahead, behind, far, dead]), ahead);
  assert.equal(chooseAnchor(p, [behind, far, dead]), null);
});

test('chooseAnchor prefers what we are flying towards', () => {
  const p = player(270, 100, 0, 300);
  const straight = { x: 275, y: 300, broken: false };
  const sideways = { x: 130, y: 130, broken: false };
  assert.equal(chooseAnchor(p, [sideways, straight]), straight);
});

test('chooseAnchor skips anchors still cooling down after a release', () => {
  const p = player(270, 100, 0, 300);
  const hot = { x: 272, y: 290, broken: false, cool: 0.4 };
  const cold = { x: 250, y: 300, broken: false, cool: 0 };
  assert.equal(chooseAnchor(p, [hot]), null, 'no instant re-grab');
  assert.equal(chooseAnchor(p, [hot, cold]), cold);
});

test('attach spins the way the player is already moving', () => {
  const anchor = { x: 270, y: 0 };
  // to the right of the anchor, moving up => counter-clockwise
  const ccw = attach(player(370, 0, 0, 300), anchor);
  assert.equal(ccw.dir, 1);
  // to the right of the anchor, moving down => clockwise
  const cw = attach(player(370, 0, 0, -300), anchor);
  assert.equal(cw.dir, -1);
  assert.ok(Math.abs(ccw.radius - 100) < 1e-9);
});

test('attach clamps the rope length', () => {
  const anchor = { x: 270, y: 0 };
  const tooClose = attach(player(273, 0, 0, 300), anchor);
  const tooFar = attach(player(5000, 0, 0, 300), anchor);
  assert.equal(tooClose.radius, PLAYER.minRadius);
  assert.equal(tooFar.radius, PLAYER.maxRadius);
});

test('the rope can never swing you through a wall', () => {
  for (let x = WALL + 100; x <= VIEW.W - WALL - 100; x += 13) {
    const anchor = { x, y: 500 };
    const t = attach(player(x + 5000, 500, 0, 300), anchor);
    assert.ok(t.radius <= Math.max(PLAYER.minRadius, wallLimit(anchor)) + 1e-9);
    // the orbit itself stays clear of both walls
    assert.ok(x - t.radius >= WALL + PLAYER.r || t.radius === PLAYER.minRadius);
    assert.ok(x + t.radius <= VIEW.W - WALL - PLAYER.r || t.radius === PLAYER.minRadius);
  }
});

test('releaseAngleFor fires the player from the orbit into the target', () => {
  const anchor = { x: 270, y: 400 };
  for (const radius of [60, 120, 210]) {
    for (const dir of [1, -1]) {
      for (const target of [
        { x: 300, y: 800 },
        { x: 140, y: 760 },
        { x: 430, y: 690 },
      ]) {
        const a = releaseAngleFor(anchor, radius, dir, target.x, target.y);
        const px = anchor.x + Math.cos(a) * radius;
        const py = anchor.y + Math.sin(a) * radius;
        const t = tangentAt(a, dir);
        const toTarget = Math.hypot(target.x - px, target.y - py);
        const dot = (t.x * (target.x - px) + t.y * (target.y - py)) / toTarget;
        assert.ok(dot > 0.999, `release should point at the target (dot ${dot})`);
      }
    }
  }
});

test('releaseAngleFor falls back when the target sits inside the orbit', () => {
  const anchor = { x: 270, y: 400 };
  const a = releaseAngleFor(anchor, 200, 1, 300, 420);
  assert.ok(Number.isFinite(a));
});

test('tangent is perpendicular to the rope and unit length', () => {
  for (let a = -3; a < 3; a += 0.37) {
    for (const dir of [1, -1]) {
      const t = tangentAt(a, dir);
      assert.ok(Math.abs(Math.hypot(t.x, t.y) - 1) < 1e-12);
      assert.ok(Math.abs(Math.cos(a) * t.x + Math.sin(a) * t.y) < 1e-12);
    }
  }
});

test('sweetAngle points the release straight at the target', () => {
  for (const dir of [1, -1]) {
    for (const [tx, ty] of [
      [0, 1],
      [1, 1],
      [-3, 5],
      [2, -1],
    ]) {
      const a = sweetAngle(tx, ty, dir);
      const t = tangentAt(a, dir);
      const want = Math.atan2(ty, tx);
      assert.ok(Math.abs(angleDiff(Math.atan2(t.y, t.x), want)) < 1e-9);
    }
  }
});

test('isPerfect only accepts the window around the sweet angle', () => {
  const sweet = 1.0;
  assert.ok(isPerfect(sweet, sweet));
  assert.ok(isPerfect(sweet + SWEET_HALF * 0.9, sweet));
  assert.ok(!isPerfect(sweet + SWEET_HALF * 1.4, sweet));
  // wrap-around still counts
  assert.ok(isPerfect(-Math.PI + 0.05, Math.PI - 0.05));
});

test('a swing keeps constant speed and reels in over time', () => {
  const anchor = { x: 270, y: 0 };
  let t = attach(player(470, 0, 0, 300), anchor);
  const start = t.radius;
  for (let i = 0; i < 60; i++) t = stepSwing(t, 300, 1 / 60, true);
  assert.ok(t.radius < start, 'rope should shorten while held');
  assert.ok(t.radius >= PLAYER.minRadius);
  const v = releaseVelocity(t, 300);
  assert.ok(Math.abs(Math.hypot(v.vx, v.vy) - 300) < 1e-9);
});

test('holding past the overwind limit snaps the rope', () => {
  const anchor = { x: 270, y: 0 };
  let t = attach(player(390, 0, 0, 300), anchor);
  let snapped = false;
  for (let i = 0; i < 2000 && !snapped; i++) {
    t = stepSwing(t, 320, 1 / 120, false);
    snapped = !!t.snapped;
  }
  assert.ok(snapped, 'rope must snap eventually');
  assert.ok(t.turns >= PLAYER.maxTurns);
  assert.ok(t.turns < PLAYER.maxTurns + 0.05, 'and snap right at the limit');
});

test('swingPosition stays on the circle', () => {
  const anchor = { x: 240, y: -25 };
  let t = attach(player(340, -25, 0, 300), anchor);
  for (let i = 0; i < 40; i++) {
    t = stepSwing(t, 300, 1 / 120, i % 2 === 0);
    const p = swingPosition(t);
    assert.ok(Math.abs(Math.hypot(p.x - anchor.x, p.y - anchor.y) - t.radius) < 1e-9);
  }
  assert.ok(t.angle > -TAU && t.angle <= TAU);
});
