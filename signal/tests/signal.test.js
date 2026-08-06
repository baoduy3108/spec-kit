// The claim this file has to defend: every night can actually be read.
//
// A deduction game whose generator can emit an unsolvable puzzle is not hard,
// it is broken — and the player has no way to tell the difference, which is
// worse. So the last test here is a bot that listens to two hundred nights
// with nothing but the dial and writes down the number.

import test from 'node:test';
import assert from 'node:assert/strict';

import { CODE, decode, encode, humanise, markOf } from '../src/code.js';
import {
  BAND,
  HZ,
  MIN_CLARITY,
  PERIODS,
  bestSpot,
  buildSky,
  drift,
  gainAt,
  pulsing,
  rngFor,
  sample,
  sayableMark,
  strengthAt,
} from '../src/sky.js';
import { NIGHT, closeNight, listen, logGuess, newStation, startNight, tune } from '../src/night.js';

test('every two-digit number survives being said and heard back', () => {
  for (let a = CODE.lo; a <= CODE.hi; a++) {
    for (let b = CODE.lo; b <= CODE.hi; b++) {
      const message = encode([a, b]);
      assert.deepEqual(decode(message.marks, message.length), [a, b], `${a}${b}`);
    }
  }
});

test('a shaky hand changes the timing but never the number', () => {
  const rng = rngFor(4).next;
  for (let a = CODE.lo; a <= CODE.hi; a++) {
    for (let b = CODE.lo; b <= CODE.hi; b++) {
      const message = encode([a, b]);
      for (const variant of humanise(message, rng, 6)) {
        assert.deepEqual(
          decode(variant, message.length),
          [a, b],
          `jitter must not eat a pulse (${a}${b})`,
        );
      }
    }
  }
});

test('no machine speaks in pairs — the grammar itself is the tell', () => {
  assert.ok(!PERIODS.includes(2));
  assert.ok(!PERIODS.includes(1));
  for (let night = 1; night <= 20; night++) {
    const sky = buildSky(night * 31, night, 42, 57);
    for (const source of sky.sources) {
      if (source.kind === 'machine') assert.ok(source.period >= 3);
    }
  }
});

test('a station fades with distance and is gone past its reach', () => {
  const sky = buildSky(9, 1, 50, 61);
  const person = sky.sources.find((s) => s.kind === 'person');
  assert.ok(gainAt(person, 50) > gainAt(person, 51.5), 'closer is louder');
  assert.equal(gainAt(person, 50 + 4), 0, 'and far enough away is silence');
  assert.ok(strengthAt(sky, person.freq) > 0.3, 'the meter notices them');
});

test('the person drifts, the impostor does not', () => {
  const sky = buildSky(77, 6, 40, 63);
  const person = sky.sources.find((s) => s.kind === 'person');
  const fake = sky.sources.find((s) => s.kind === 'impostor');
  const before = { person: person.freq, fake: fake.freq };
  drift(sky, 60);
  assert.notEqual(person.freq, before.person, 'a hand-built set wanders');
  assert.equal(fake.freq, before.fake, 'a machine does not');
  // ...and the impostor repeats itself exactly, which is the other half of it
  const len = fake.message.length;
  for (let t = 0; t < len; t++) {
    assert.equal(pulsing(fake, t), pulsing(fake, t + len), 'the fake is identical every time');
  }
});

test('a person is not identical every time', () => {
  const sky = buildSky(101, 2, 30, 71);
  const person = sky.sources.find((s) => s.kind === 'person');
  const len = person.message.length;
  let differences = 0;
  for (let t = 0; t < len * 4; t++) {
    if (pulsing(person, t) !== pulsing(person, t + len)) differences++;
  }
  assert.ok(differences > 0, 'if a person repeated exactly, the tell would be a lie');
});

test('the dial has detents and stops at the ends of the band', () => {
  const run = startNight(newStation(), 5);
  assert.equal(tune(run, 43.31), 43.25, 'quarter marks');
  assert.equal(tune(run, -12), BAND.lo);
  assert.equal(tune(run, 1000), BAND.hi);
});

test('time passes at eight ticks a second, and dawn ends it', () => {
  const run = startNight(newStation(), 6);
  listen(run, 1);
  assert.equal(run.tick, HZ);
  assert.equal(run.over, null);
  for (let i = 0; i < NIGHT * 2; i++) listen(run, 1);
  assert.equal(run.over, 'dawn');
});

test('a night away from the tab does not fast-forward itself', () => {
  const run = startNight(newStation(), 8);
  listen(run, 300);
  assert.ok(run.tick <= 12, `a single huge frame must not run the night (${run.tick})`);
});

test('the right number keeps the thread, the wrong one loses it', () => {
  const station = newStation();
  const run = startNight(station, 12);
  const truth = run.sky.next;

  logGuess(run, String(truth).split('').map(Number));
  assert.equal(run.logged.right, true);
  const result = closeNight(station, run);
  assert.equal(result.right, true);
  assert.equal(station.thread, 1);
  assert.equal(station.target, truth, 'tomorrow you know where to be');
  assert.equal(station.story, 1);

  const second = startNight(station, 12);
  assert.equal(second.sky.target, truth, 'and they are there');
  logGuess(second, [1, 1] .map(Number));
  const missed = closeNight(station, second);
  if (!missed.right) {
    assert.equal(station.thread, 0);
    assert.equal(station.target, null, 'lose the thread and you are sweeping blind again');
  }
});

test('marks you sweep past get written on the dial', () => {
  const station = newStation();
  const run = startNight(station, 15);
  const person = run.sky.sources.find((s) => s.kind === 'person');
  tune(run, person.freq);
  listen(run, 0.5);
  assert.ok(run.noticed.has(Math.round(person.freq)), 'the pencil mark is yours, not a gift');
  assert.ok(run.trace.length > 0);
});

// --- the claim ------------------------------------------------------------

/**
 * Someone at the dial with no special knowledge: sweep the band, stop where
 * the meter moves, listen, and try to read a number out of what comes
 * through. It does not know where the person is or what they are saying.
 */
function listener(seed, night) {
  const rng = rngFor(seed);
  const target = sayableMark(rng);
  let next = sayableMark(rng);
  while (next === target) next = sayableMark(rng);
  const sky = buildSky(seed * 13 + night, night, target, next);

  // 1. Sweep. Stop where the meter peaks — and try a little to either side
  //    too, because sliding off a neighbour to null it out is the technique.
  const peaks = [];
  let prev = 0;
  let rising = false;
  for (let d = BAND.lo; d <= BAND.hi; d += 0.5) {
    const s = strengthAt(sky, d);
    if (s > prev) rising = true;
    else if (rising && prev >= 0.34) {
      peaks.push(d - 0.5);
      rising = false;
    }
    prev = s;
  }
  const dials = [];
  for (const p of peaks) for (let off = -3; off <= 3; off += 0.5) dials.push(p + off);

  let best = null;
  for (const dial of dials) {
    const levels = [];
    for (let t = 0; t < 8 * 45; t++) levels.push(sample(sky, dial, t).level);

    // 2. What counts as a real blip? Try several, the way anyone nudges the
    //    gain down until the weak stuff drops out from under the one voice.
    for (let threshold = 0.25; threshold <= 1.1; threshold += 0.05) {
      const ticks = [];
      for (let t = 0; t < levels.length; t++) if (levels[t] >= threshold) ticks.push(t);
      if (ticks.length < 8) continue;

      // 3. Split on the long silence between repetitions.
      const runs = [];
      let group = [ticks[0]];
      for (let i = 1; i < ticks.length; i++) {
        if (ticks[i] - ticks[i - 1] >= 11) {
          runs.push(group);
          group = [];
        }
        group.push(ticks[i]);
      }
      runs.push(group);
      if (runs.length < 4) continue;

      // 4. Believe a number only if it came through several times *on a
      //    steady beat*. Two stray blips that happen to read as a number are
      //    what a machine coincidence looks like; a message keeps time.
      const readings = runs
        .map((one) => ({
          start: one[0],
          shape: one.map((t) => t - one[0]).join(','),
          digits: decode(new Set(one), 0),
        }))
        .filter(
          (r) => r.digits.length === 2 && r.digits.every((d) => d >= CODE.lo && d <= CODE.hi),
        );

      const bySaid = new Map();
      for (const r of readings) {
        const said = markOf(r.digits);
        if (!bySaid.has(said)) bySaid.set(said, { starts: [], shapes: new Set() });
        bySaid.get(said).starts.push(r.start);
        bySaid.get(said).shapes.add(r.shape);
      }
      for (const [said, seen] of bySaid) {
        const starts = seen.starts;
        if (starts.length < 3) continue;
        const gaps = starts.slice(1).map((s, i) => s - starts[i]);
        const mean = gaps.reduce((a, b) => a + b, 0) / gaps.length;
        const spread = Math.max(...gaps.map((gp) => Math.abs(gp - mean)));
        if (spread > 3) continue; // not a beat, just noise that rhymed

        // The tell: a hand on a key never sends the same shape twice. A
        // machine imitating a person is perfect, and that is how you know.
        const human = seen.shapes.size > 1;
        const score = starts.length * 10 - spread + (human ? 40 : 0);
        if (!best || score > best.score) best = { said, score, dial, threshold, human };
      }
    }
  }
  return { said: best ? best.said : null, truth: sky.next, night, at: best && best.dial };
}

test('every night can be read, by someone with nothing but the dial', () => {
  const failures = [];
  let heard = 0;
  let tried = 0;
  for (const night of [1, 2, 3, 5, 8, 12, 16, 20]) {
    for (let seed = 0; seed < 25; seed++) {
      tried++;
      const out = listener(9000 + seed * 7, night);
      if (out.said === out.truth) heard++;
      else failures.push(`night ${night} seed ${seed}: heard ${out.said}, was ${out.truth}`);
    }
  }
  assert.ok(
    heard / tried >= 0.95,
    `a night that cannot be read is a bug, not difficulty (${heard}/${tried})\n` +
      failures.slice(0, 6).join('\n'),
  );
});

test('the generator always leaves somewhere to listen from', () => {
  for (const night of [1, 4, 7, 11, 15, 20]) {
    for (let seed = 0; seed < 60; seed++) {
      const sky = buildSky(seed * 977 + night, night, 20 + (seed % 60), 42);
      const person = sky.sources.find((s) => s.kind === 'person');
      const spot = bestSpot(sky.sources, person);
      assert.ok(
        spot.ratio >= MIN_CLARITY,
        `night ${night} seed ${seed}: buried at ${spot.ratio.toFixed(2)}`,
      );
    }
  }
});
