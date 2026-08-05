import test from 'node:test';
import assert from 'node:assert/strict';

import { Level, firstAnchor, genSegment } from '../src/game/level.js';
import { VIEW, WALL, difficultyAt } from '../src/game/config.js';
import { makeRng } from '../src/core/rng.js';
import { pulsarRadius } from '../src/game/level.js';

test('segments alternate sides and stay inside the shaft', () => {
  const rng = makeRng(4242);
  let prev = firstAnchor();
  for (let i = 0; i < 400; i++) {
    const diff = difficultyAt(prev.y);
    const seg = genSegment(rng, prev, diff);
    const a = seg.anchor;
    assert.equal(a.side, -prev.side, 'the chain must weave');
    assert.ok(a.x > WALL && a.x < VIEW.W - WALL, `anchor x ${a.x} inside walls`);
    assert.ok(a.y - prev.y >= diff.gapMin - 1e-9);
    assert.ok(a.y - prev.y <= diff.gapMax + 1e-9);
    assert.ok(['std', 'frail'].includes(a.type));
    for (const s of seg.shards) {
      assert.ok(s.x > WALL && s.x < VIEW.W - WALL);
      assert.ok(s.y > prev.y && s.y < a.y);
    }
    prev = a;
  }
});

test('hazards sit beside the ideal line, never on top of an anchor', () => {
  const rng = makeRng(99);
  let prev = firstAnchor();
  let seen = 0;
  for (let i = 0; i < 600; i++) {
    const diff = difficultyAt(prev.y);
    const seg = genSegment(rng, prev, diff);
    for (const h of seg.hazards) {
      seen++;
      assert.ok(h.x > WALL && h.x < VIEW.W - WALL);
      const dNext = Math.hypot(h.x - seg.anchor.x, h.y - seg.anchor.y);
      const dPrev = Math.hypot(h.x - prev.x, h.y - prev.y);
      assert.ok(dNext > 60 && dPrev > 60, 'hazards keep clear of the anchors');

      // Nothing may reach the straight line between the two anchors: the
      // clean route through a segment is always survivable.
      const reach = h.kind === 'spinner' ? h.arm : h.kind === 'pulsar' ? h.rMax : h.r;
      const toLine = pointLineDist(h.x, h.y, prev.x, prev.y, seg.anchor.x, seg.anchor.y);
      assert.ok(toLine > reach + 20, `${h.kind} crowds the ideal line (${toLine | 0})`);

      if (h.kind === 'pulsar') {
        let peak = 0;
        for (let s2 = 0; s2 < 400; s2++) {
          h.phase = s2 * 0.01;
          peak = Math.max(peak, pulsarRadius(h));
          assert.ok(pulsarRadius(h) <= h.rMax + 1e-9);
        }
        assert.ok(peak > h.rMax * 0.9, 'a pulsar actually inflates');
        h.phase = 0;
      }
    }
    prev = seg.anchor;
  }
  assert.ok(seen > 50, `expected hazards to appear (saw ${seen})`);
});

function pointLineDist(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const l = Math.hypot(dx, dy) || 1;
  return Math.abs((px - ax) * dy - (py - ay) * dx) / l;
}

test('the same seed always builds the same shaft', () => {
  const build = () => {
    const level = new Level(makeRng(777));
    level.ensure(9000);
    return level.anchors.map((a) => [a.x, a.y, a.type]);
  };
  assert.deepEqual(build(), build());
  const other = new Level(makeRng(778));
  other.ensure(9000);
  assert.notDeepEqual(
    build(),
    other.anchors.map((a) => [a.x, a.y, a.type]),
  );
});

test('every anchor aims at the next one', () => {
  const level = new Level(makeRng(31337));
  level.ensure(6000);
  for (let i = 0; i < level.anchors.length - 1; i++) {
    assert.equal(level.anchors[i].nextX, level.anchors[i + 1].x);
    assert.equal(level.anchors[i].nextY, level.anchors[i + 1].y);
  }
});

test('streaming keeps memory flat and never drops the anchor in use', () => {
  const level = new Level(makeRng(5));
  let peak = 0;
  let held = null;
  for (let camY = 0; camY < 60000; camY += 400) {
    level.ensure(camY + 2400);
    held = level.anchors.find((a) => a.y > camY + 200) || held;
    level.prune(camY - 900, held);
    peak = Math.max(peak, level.anchors.length + level.shards.length + level.hazards.length);
    assert.ok(level.anchors.includes(held), 'the tethered anchor survives pruning');
  }
  assert.ok(peak < 220, `entity window should stay small, saw ${peak}`);
});
