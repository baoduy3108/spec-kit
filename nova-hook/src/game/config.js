// Every tuning number lives here. Balance changes should never require
// touching simulation code.

import { clamp, lerp } from '../core/mathx.js';

/** Virtual resolution. The canvas is letterboxed to this aspect. */
export const VIEW = { W: 540, H: 960 };

/** Deadly neon walls on both sides of the shaft. */
export const WALL = 22;

export const PLAYER = {
  r: 11,
  /** How close an anchor must be before the hook can catch it. */
  hookRange: 230,
  minRadius: 52,
  maxRadius: 230,
  /** How fast the tether reels in while you hold. Tighter rope = faster spin. */
  reelRate: 150,
  /** Holding past this many turns overwinds the anchor and it snaps. */
  maxTurns: 1.1,
  /** An anchor you just let go of cannot be re-grabbed for this long. */
  regrabDelay: 0.9,
  reviveGrace: 1.8,
};

/** Half width of the "perfect release" arc, in radians (~19 degrees). */
export const SWEET_HALF = 0.33;

export const NOVA = {
  gainPerfect: 0.2,
  gainShard: 0.012,
  duration: 3.6,
  speedMul: 1.5,
  magnet: 190,
};

export const SCORE = {
  /** 1 score point per 10 world px climbed, times the combo multiplier. */
  pxPerPoint: 10,
  perfectBonus: 25,
  shardBonus: 5,
  maxMultiplier: 8,
};

/**
 * Difficulty as a function of altitude climbed (world px).
 *
 * `t` is the main ramp over the first ~12k (about half a minute of good
 * play). `late` is a slow endless creep after that: speed stops rising so the
 * controls stay readable, but the shaft keeps getting busier, which is what
 * eventually ends an expert run.
 */
export function difficultyAt(altitude) {
  const t = clamp(altitude / 12000, 0, 1);
  const late = clamp((altitude - 12000) / 30000, 0, 1);
  return {
    t,
    late,
    speed: lerp(300, 468, t),
    voidSpeed: lerp(38, 132, t * t) + late * 58,
    /** Chance a segment spawns a hazard. */
    hazard: lerp(0.1, 0.62, t),
    /** Chance that segment spawns a *second* one. */
    extraHazard: late * 0.72,
    /** Chance an anchor is frail (one swing only). */
    frail: lerp(0, 0.34, t * t) + late * 0.18,
    gapMin: lerp(230, 300, t),
    gapMax: lerp(300, 420, t),
  };
}

/** Combo -> score multiplier. */
export function multiplierFor(combo) {
  return clamp(1 + combo * 0.35, 1, SCORE.maxMultiplier);
}

export const VOID = {
  /** The void never trails the player's best altitude by more than this. */
  maxLag: 560,
  /** Extra catch-up speed applied per px of lag beyond maxLag. */
  catchUp: 0.9,
  /** How far the void is pushed back down on revive. */
  revivePush: 620,
};
