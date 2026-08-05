// Procedural level generation.
//
// The shaft is an endless chain of anchors that alternate sides, so the
// player is always weaving. Shards are laid along the ideal line between two
// anchors (they teach the optimal path), hazards are pushed off to the side
// of that line so a clean run is always physically possible.

import { VIEW, WALL, difficultyAt } from './config.js';
import { TAU, clamp, lerp, norm } from '../core/mathx.js';

export const HAZARDS = ['mine', 'spinner', 'pulsar'];

/** Minimum distance from an anchor to a wall. */
export const ANCHOR_WALL_CLEARANCE = 100;

export function firstAnchor() {
  return {
    id: 0,
    x: VIEW.W / 2,
    y: 340,
    r: 16,
    type: 'std',
    broken: false,
    /** Seconds until this anchor can be grabbed again after a release. */
    cool: 0,
    phase: 0,
    side: 1,
    nextX: VIEW.W / 2,
    nextY: 340 + 380,
  };
}

/**
 * Generate the next link of the chain.
 * Pure: same rng state + prev + difficulty => same segment.
 */
export function genSegment(rng, prev, diff) {
  const side = -prev.side;
  const centre = VIEW.W / 2;
  // Anchors keep 100px clear of the walls so a swing around one always fits
  // inside the shaft (see physics.attach).
  const halfSpan = VIEW.W / 2 - WALL - ANCHOR_WALL_CLEARANCE;
  const off = rng.range(halfSpan * 0.35, halfSpan);
  const x = clamp(
    centre + side * off,
    WALL + ANCHOR_WALL_CLEARANCE,
    VIEW.W - WALL - ANCHOR_WALL_CLEARANCE,
  );
  const y = prev.y + rng.range(diff.gapMin, diff.gapMax);

  const anchor = {
    id: prev.id + 1,
    x,
    y,
    r: 16,
    type: rng.chance(diff.frail) ? 'frail' : 'std',
    broken: false,
    cool: 0,
    phase: rng.range(0, TAU),
    side,
    // Filled in by the *next* segment; until then aim straight up.
    nextX: x,
    nextY: y + diff.gapMax,
  };

  const shards = [];
  const shardCount = rng.chance(0.35) ? 4 : 3;
  for (let i = 1; i <= shardCount; i++) {
    const t = i / (shardCount + 1);
    shards.push({
      x: clamp(lerp(prev.x, x, t) + rng.range(-24, 24), WALL + 24, VIEW.W - WALL - 24),
      y: lerp(prev.y, y, t),
      taken: false,
      phase: rng.range(0, TAU),
    });
  }

  const hazards = [];
  if (rng.chance(diff.hazard)) {
    hazards.push(makeHazard(rng, prev, anchor, diff));
  }
  if (diff.extraHazard && rng.chance(diff.extraHazard)) {
    hazards.push(makeHazard(rng, prev, anchor, diff));
  }

  return { anchor, shards, hazards };
}

function makeHazard(rng, prev, anchor, diff) {
  const mx = lerp(prev.x, anchor.x, 0.5);
  const my = lerp(prev.y, anchor.y, 0.5);
  const gap = anchor.y - prev.y;

  // Pulsars need a bit of room to inflate into.
  const pool = gap > 330 && diff.t > 0.18 ? HAZARDS : ['mine', 'spinner'];
  const kind = rng.pick(pool);

  // Push the hazard perpendicular to the ideal line, i.e. beside the path.
  // Reach (spinner arms, pulsar bloom) is added on top of that clearance, so
  // the ideal line is never blocked — only the sloppy lines around it are.
  const arm = lerp(52, 78, diff.t);
  const rMax = lerp(66, 104, diff.t);
  const clear =
    kind === 'spinner' ? arm + 62 : kind === 'pulsar' ? rMax + 54 : 76;
  const dir = norm(anchor.x - prev.x, anchor.y - prev.y);
  const perp = { x: -dir.y, y: dir.x };
  const s = rng.chance(0.5) ? 1 : -1;
  const push = rng.range(clear, clear + 54) * s;
  const hx = clamp(mx + perp.x * push, WALL + 44, VIEW.W - WALL - 44);
  const hy = my + perp.y * push;

  if (kind === 'spinner') {
    return {
      kind: 'spinner',
      x: hx,
      y: hy,
      r: 12,
      arm,
      spin: rng.range(0.9, 1.7) * (rng.chance(0.5) ? 1 : -1),
      phase: rng.range(0, TAU),
      dead: false,
    };
  }

  if (kind === 'pulsar') {
    return {
      kind: 'pulsar',
      x: hx,
      y: hy,
      r: 13,
      rMax,
      period: rng.range(1.7, 2.6),
      offset: rng.next(),
      phase: 0,
      dead: false,
    };
  }

  return {
    kind: 'mine',
    x: hx,
    y: hy,
    r: 15,
    drift: rng.range(14, 34) * (rng.chance(0.5) ? 1 : -1),
    homeX: hx,
    phase: rng.range(0, TAU),
    dead: false,
  };
}

/**
 * Streaming level: keeps a window of entities alive around the camera.
 * Deterministic for a given seed because segments are always generated in
 * order, starting from segment 0.
 */
export class Level {
  constructor(rng, safeUntil = 0) {
    this.rng = rng;
    /** Below this altitude nothing dangerous spawns (used by the intro run). */
    this.safeUntil = safeUntil;
    this.anchors = [];
    this.shards = [];
    this.hazards = [];
    const first = firstAnchor();
    this.anchors.push(first);
    this.last = first;
  }

  /** Generate until the chain reaches `topY` world units. */
  ensure(topY) {
    let guard = 0;
    while (this.last.y < topY && guard++ < 200) {
      const diff = difficultyAt(this.last.y);
      if (this.last.y < this.safeUntil) {
        diff.hazard = 0;
        diff.extraHazard = 0;
        diff.frail = 0;
      }
      const seg = genSegment(this.rng, this.last, diff);
      // Now that we know where the chain goes, aim the previous sweet spot.
      this.last.nextX = seg.anchor.x;
      this.last.nextY = seg.anchor.y;
      this.anchors.push(seg.anchor);
      for (const s of seg.shards) this.shards.push(s);
      for (const h of seg.hazards) this.hazards.push(h);
      this.last = seg.anchor;
    }
  }

  /** Drop everything below `minY` so memory stays flat on long runs. */
  prune(minY, keep = null) {
    this.anchors = this.anchors.filter((a) => a.y > minY || a === this.last || a === keep);
    this.shards = this.shards.filter((s) => s.y > minY && !s.taken);
    this.hazards = this.hazards.filter((h) => h.y > minY && !h.dead);
  }
}

/**
 * Deadly radius of a pulsar right now: it inflates over most of its cycle,
 * then collapses to nothing. Telegraphed, so passing it is a timing choice.
 */
export function pulsarRadius(h) {
  const cyc = ((h.phase / h.period + h.offset) % 1 + 1) % 1;
  if (cyc >= 0.75) return 0;
  return h.rMax * Math.pow(cyc / 0.75, 1.5);
}
