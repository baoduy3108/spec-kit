// Combo / score / Nova bookkeeping. Pure reducers over a plain run object so
// the rules can be tested and tweaked without launching a browser.

import { NOVA, SCORE, multiplierFor } from './config.js';
import { clamp } from '../core/mathx.js';

export function newRun(seed = 0, mode = 'endless') {
  return {
    seed,
    mode,
    score: 0,
    combo: 0,
    bestCombo: 0,
    shards: 0,
    perfects: 0,
    releases: 0,
    novaCharge: 0,
    novaTimer: 0,
    novaCount: 0,
    altitude: 0,
    time: 0,
    revives: 0,
    dead: false,
  };
}

export function multiplier(run) {
  return multiplierFor(run.combo);
}

/** Score earned by climbing. Called every simulation step. */
export function addAltitude(run, deltaPx) {
  if (deltaPx <= 0) return 0;
  run.altitude += deltaPx;
  const gained = (deltaPx / SCORE.pxPerPoint) * multiplier(run);
  run.score += gained;
  return gained;
}

/**
 * Resolve a release.
 * quality: 'perfect' | 'ok' | 'snap' (overwound the anchor)
 */
export function applyRelease(run, quality) {
  run.releases++;
  if (quality === 'perfect') {
    run.combo++;
    run.perfects++;
    run.bestCombo = Math.max(run.bestCombo, run.combo);
    run.score += SCORE.perfectBonus * multiplier(run);
    chargeNova(run, NOVA.gainPerfect);
  } else if (quality === 'snap') {
    run.combo = 0;
  } else {
    // A sloppy but survivable release costs you half the chain.
    run.combo = Math.floor(run.combo / 2);
  }
  return run.combo;
}

export function collectShard(run) {
  run.shards++;
  run.score += SCORE.shardBonus * multiplier(run);
  chargeNova(run, NOVA.gainShard);
}

function chargeNova(run, amount) {
  if (run.novaTimer > 0) return; // no stacking mid-surge
  run.novaCharge = clamp(run.novaCharge + amount, 0, 1);
}

/** @returns true when a surge just started this call. */
export function tryStartNova(run) {
  if (run.novaCharge < 1 || run.novaTimer > 0) return false;
  run.novaCharge = 0;
  run.novaTimer = NOVA.duration;
  run.novaCount++;
  return true;
}

export function tickNova(run, dt) {
  if (run.novaTimer > 0) {
    run.novaTimer = Math.max(0, run.novaTimer - dt);
    return true;
  }
  return false;
}

export function novaActive(run) {
  return run.novaTimer > 0;
}

/** Public-facing numbers for the HUD / results screen. */
export function summary(run) {
  return {
    score: Math.floor(run.score),
    depth: Math.floor(run.altitude / 10),
    combo: run.bestCombo,
    shards: run.shards,
    perfects: run.perfects,
    novas: run.novaCount,
    time: run.time,
    accuracy: run.releases ? run.perfects / run.releases : 0,
  };
}
