// A night at the listening post, and what carries over to the next one.
//
// The loop: sweep the band, find the voice that speaks in pairs, count the
// blips, write down the two digits. The digits are where they will be
// tomorrow. Get them right and you keep the thread; get them wrong and they
// are gone, and tomorrow you start from nothing with a busier sky.

import { HZ, buildSky, drift, sample, sayableMark, rngFor, strengthAt } from './sky.js';
import { markOf } from './code.js';

/** Seconds before dawn takes the band. */
export const NIGHT = 90;
/** How much carrier it takes to leave a pencil mark on the dial. */
export const NOTICE = 0.34;
/** How many samples the paper roll holds. */
export const TRACE = 150;

export function newStation() {
  return {
    night: 1,
    /** Where they are tonight. Null on the first night: you have to sweep. */
    target: null,
    /** Consecutive nights you have kept them. */
    thread: 0,
    found: 0,
    missed: 0,
    /** How much of what they have been saying you have earned. */
    story: 0,
    /** What you wrote down last night, which is where to start tonight. */
    expect: null,
    /** The book itself: one line per night, kept so you can see the run. */
    log: [],
  };
}

export function startNight(station, seed) {
  const rng = rngFor(seed ^ (station.night * 2654435761));
  const target = station.target ?? sayableMark(rng);
  let next = sayableMark(rng);
  while (next === target) next = sayableMark(rng);

  const sky = buildSky(seed + station.night * 7919, station.night, target, next);
  return {
    sky,
    dial: station.expect ?? 50,
    tick: 0,
    elapsed: 0,
    /** Marks on the dial where you heard something. Your own pencil. */
    noticed: new Set(),
    /** The paper roll: what you have heard, newest last. */
    trace: [],
    logged: null,
    over: null, // 'logged' | 'dawn'
  };
}

/** Advance the night. Returns the samples produced, oldest first. */
export function listen(run, seconds) {
  if (run.over) return [];
  run.elapsed += seconds;
  drift(run.sky, seconds);

  const produced = [];
  const want = Math.floor(run.elapsed * HZ);
  // Never spend more than a handful of ticks in one frame: a stalled tab
  // must not fast-forward the whole night on the frame it comes back.
  const limit = Math.min(want, run.tick + 12);
  while (run.tick < limit) {
    const shot = sample(run.sky, run.dial, run.tick);
    shot.tick = run.tick;
    run.trace.push(shot);
    produced.push(shot);
    run.tick++;
  }
  if (run.trace.length > TRACE) run.trace.splice(0, run.trace.length - TRACE);

  if (strengthAt(run.sky, run.dial) >= NOTICE) run.noticed.add(Math.round(run.dial));
  if (run.elapsed >= NIGHT && !run.over) run.over = 'dawn';
  return produced;
}

export function tune(run, dial, band = { lo: 0, hi: 99 }) {
  run.dial = Math.min(band.hi, Math.max(band.lo, Math.round(dial * 4) / 4));
  return run.dial;
}

/** Write two digits in the log and close the night. */
export function logGuess(run, digits) {
  if (run.over) return run.logged;
  run.logged = {
    digits: [...digits],
    mark: markOf(digits),
    right: markOf(digits) === run.sky.next,
  };
  run.over = 'logged';
  return run.logged;
}

/**
 * Fold the night into the station's record.
 *
 * Getting it right is not a score, it is a *place to stand tomorrow*. Getting
 * it wrong costs you that, and nothing else: the sky gets busier either way,
 * so a bad night is a lost thread rather than a punishment.
 */
export function closeNight(station, run) {
  const right = !!(run.logged && run.logged.right);
  if (right) {
    station.found++;
    station.thread++;
    station.story++;
    station.target = run.sky.next;
    station.expect = run.sky.next;
  } else {
    station.missed++;
    station.thread = 0;
    // They moved anyway. You simply do not know where.
    station.target = null;
    station.expect = null;
  }
  if (!station.log) station.log = [];
  station.log.push({
    night: station.night,
    said: run.logged ? run.logged.mark : null,
    truth: run.sky.next,
    at: Math.round(run.sky.target),
    right,
  });
  if (station.log.length > 40) station.log.shift();

  station.night++;
  return { right, was: run.sky.next, at: run.sky.target };
}
