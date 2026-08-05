// The fusion is only real if the four loops actually feed each other. These
// tests check the seams, not the parts.

import test from 'node:test';
import assert from 'node:assert/strict';

import * as S from '../src/sim.js';
import * as N from '../src/night.js';
import * as P from '../src/puzzle.js';
import { makeRng, angleDiff } from '../src/core.js';

const shaft = (seed = 7) => S.buildShaft(seed, 20);

/** Plays the run with a bot that releases inside the sweet window. */
function climb(run, seconds, { onLock } = {}) {
  const dt = 1 / 120;
  for (let t = 0; t < seconds && !run.dead; t += dt) {
    if (run.picking) {
      if (onLock) onLock(run.picking);
      else S.abandonLock(run);
      continue;
    }
    let held = true;
    if (run.tether) {
      const l = run.tether.lantern;
      const sweet = S.releaseAngleFor(l, run.tether.radius, run.tether.dir, l.nextX, l.nextY);
      held = Math.abs(angleDiff(run.tether.angle, sweet)) > 0.15;
    }
    N.recordInput(run, held);
    S.stepRun(run, dt, held);
  }
  return run;
}

test('a perfect release pours what you carry into the lantern', () => {
  const lanterns = shaft();
  lanterns[1].sealed = false;
  const run = S.newRun(lanterns, []);
  run.carry = 10;
  run.tether = S.attach(run.player, lanterns[1]);
  const before = lanterns[1].charge;

  // Put the swing exactly on the sweet angle, then let go.
  const l = lanterns[1];
  run.tether.angle = S.releaseAngleFor(l, run.tether.radius, run.tether.dir, l.nextX, l.nextY);
  const events = S.stepRun(run, 1 / 120, false);

  const bank = events.find((e) => e.type === 'bank');
  assert.ok(bank, 'a perfect release should bank');
  assert.equal(bank.motes, 10);
  assert.ok(lanterns[1].charge > before, 'and the lantern is brighter for it');
  assert.equal(run.carry, 0);
  assert.equal(run.banked, 10);
});

test('a sloppy release keeps your motes and costs your chain', () => {
  const lanterns = shaft();
  lanterns[1].sealed = false;
  const run = S.newRun(lanterns, []);
  run.carry = 8;
  run.combo = 4;
  run.tether = S.attach(run.player, lanterns[1]);
  const l = lanterns[1];
  run.tether.angle =
    S.releaseAngleFor(l, run.tether.radius, run.tether.dir, l.nextX, l.nextY) + Math.PI;

  S.stepRun(run, 1 / 120, false);
  assert.equal(run.carry, 8, 'you keep what you were carrying');
  assert.equal(run.combo, 2, 'but the chain is halved');
  assert.equal(lanterns[1].charge, 0, 'and nothing was poured in');
});

test('a sealed lantern stops the climb until its lock is picked', () => {
  const lanterns = shaft();
  const run = S.newRun(lanterns, []);
  const sealed = lanterns[3];
  assert.equal(sealed.sealed, true);

  run.player.x = sealed.x;
  run.player.y = sealed.y - 100;
  run.player.vx = 0;
  run.player.vy = 300;
  S.stepRun(run, 1 / 120, true);

  assert.equal(run.picking, sealed, 'hooking a sealed lantern opens its lock');
  assert.equal(run.tether, null, 'and does not attach');

  const frozen = { ...run.player };
  S.stepRun(run, 1 / 120, true);
  assert.deepEqual({ ...run.player }, frozen, 'the run is frozen while the lock is open');

  S.unseal(run, sealed);
  assert.equal(sealed.sealed, false);
  assert.ok(sealed.charge > 0, 'an unsealed lantern starts with a flicker');
  assert.equal(run.picking, null);
  S.stepRun(run, 1 / 120, false);
  assert.notEqual(run.player.y, frozen.y, 'and then the climb continues');
});

test('every lock the game can hand you is solvable', () => {
  const lanterns = shaft(20260805);
  for (const l of lanterns) {
    const puzzle = P.generate(makeRng(l.lock), {
      difficulty: 1 + Math.min(3, Math.floor(l.id / 8)),
    });
    assert.ok(puzzle, `lantern ${l.id} produced no lock`);
    assert.equal(P.isSolved(puzzle.grid, puzzle.emitter), false, `lock ${l.id} starts open`);
    const answer = P.solve(puzzle.grid, puzzle.emitter);
    assert.ok(answer && answer.solved, `lock ${l.id} cannot be picked`);
    assert.ok(answer.moves >= 1 && answer.moves <= 5, `lock ${l.id} par ${answer.moves}`);
  }
});

test('lanterns lit by climbing are the ones that earn while you are away', () => {
  const lanterns = shaft(3);
  const state = N.newNight(3);

  // The shaft you are handed has one lantern already burning; put it out so
  // this measures what climbing added, not what the night started with.
  for (const l of lanterns) l.charge = 0;
  const idle = N.applyOffline(state, lanterns, 3600);
  assert.equal(idle.earned, 0, 'a dark shaft earns nothing at all');

  // Light a few by hand, the way a good run would.
  for (const i of [1, 2, 3]) {
    lanterns[i].sealed = false;
    lanterns[i].charge = 1;
  }
  const after = N.applyOffline(state, lanterns, 3600);
  assert.ok(after.earned > 100, `a lit shaft earns (got ${after.earned})`);
  assert.ok(lanterns[1].charge < 1, 'and the dark ate some of it meanwhile');
});

test('offline is the closed form, not an approximation', () => {
  const build = () => {
    const l = shaft(11);
    l.forEach((x, i) => (x.charge = i < 6 ? 1.5 : 0));
    return { l, s: N.newNight(11) };
  };
  const jump = build();
  const stepped = build();

  N.advance(jump.s, jump.l, 7200);
  for (let i = 0; i < 72000; i++) N.advance(stepped.s, stepped.l, 0.1);

  const rel = Math.abs(jump.s.lumens - stepped.s.lumens) / stepped.s.lumens;
  assert.ok(rel < 1e-6, `closed form ${jump.s.lumens} vs stepped ${stepped.s.lumens}`);
  assert.ok(Math.abs(jump.l[0].charge - stepped.l[0].charge) < 1e-9);
});

test('offline is capped and taxed, and Night Watch improves both', () => {
  const state = N.newNight(1);
  const base = N.offlineLimits(state);
  state.upgrades.night = 3;
  const better = N.offlineLimits(state);
  assert.ok(better.capSeconds > base.capSeconds);
  assert.ok(better.efficiency > base.efficiency && better.efficiency <= 1);

  const lanterns = shaft();
  lanterns.forEach((l) => (l.charge = 1));
  const r = N.applyOffline(state, lanterns, 40 * 3600);
  assert.equal(r.capped, true);
  assert.equal(r.simulated, better.capSeconds * better.efficiency);
});

test('dawn pays on a log scale and hands you a new shaft', () => {
  const state = N.newNight(5);
  assert.equal(N.emberGain(state), 0, 'no free embers');

  state.lifetime = 1e4;
  const small = N.emberGain(state);
  state.lifetime = 1e10;
  const big = N.emberGain(state);
  assert.ok(big > small);
  assert.ok(big < small * 6, 'a million times the lumens is not a million times the embers');

  const seed = state.seed;
  const gain = N.breakDawn(state);
  assert.equal(state.embers, gain);
  assert.equal(state.night, 2);
  assert.equal(state.lumens, 0);
  assert.notEqual(state.seed, seed, 'a different shaft tomorrow night');
  assert.ok(N.embersMultiplier(state.embers) > 1, 'and everything burns brighter');
});

test('upgrades cost more each level and stop at their cap', () => {
  const state = N.newNight(1);
  state.lumens = 1e12;
  for (const u of N.UPGRADES) {
    let last = 0;
    while (N.buyUpgrade(state, u.id)) {
      const cost = N.upgradeCost(state, u.id);
      if (cost !== null) {
        assert.ok(cost > last, `${u.id} must get pricier`);
        last = cost;
      }
    }
    assert.equal(N.level(state, u.id), u.levels);
    assert.equal(N.upgradeCost(state, u.id), null);
  }
});

test('an echo replays the same climb it recorded', () => {
  const first = climb(S.newRun(shaft(42), S.seedMotes(shaft(42), 42)), 25);
  const echo = N.makeEcho(first, S.runSummary(first));
  assert.ok(echo, 'a climb should be recordable');
  assert.ok(echo.inputs.length > 2, 'and have something in it');
  assert.ok(JSON.stringify(echo).length < 6000, 'a whole ghost is a few hundred bytes');

  // Replaying the echo against a fresh shaft must retrace the same path.
  const replay = (e) => {
    const run = S.newRun(shaft(42), []);
    const dt = 1 / 120;
    for (let t = 0; t < 15 && !run.dead; t += dt) {
      if (run.picking) S.abandonLock(run);
      S.stepRun(run, dt, N.echoHeld(e, run.time));
    }
    return [Math.round(run.player.x), Math.round(run.player.y)];
  };
  assert.deepEqual(replay(echo), replay(echo), 'a replay is deterministic');
});

test('a climb with the locks picked lights the shaft and the shaft pays out', () => {
  const lanterns = shaft(99);
  const state = N.newNight(99);
  const run = S.newRun(lanterns, S.seedMotes(lanterns, 99));
  run.locksPicked = 0;

  climb(run, 90, {
    onLock: (lantern) => {
      // Pick the lock the way the UI does: solve it, then unseal.
      const puzzle = P.generate(makeRng(lantern.lock), { difficulty: 1 });
      const answer = puzzle && P.solve(puzzle.grid, puzzle.emitter);
      assert.ok(answer, 'every lock must be pickable');
      S.unseal(run, lantern);
      run.locksPicked++;
    },
  });

  const summary = S.runSummary(run);
  assert.ok(summary.depth > 30, `the bot should climb (got ${summary.depth}m)`);
  assert.ok(run.locksPicked > 0, 'and meet at least one lock');
  const lit = lanterns.filter((l) => l.charge > 0.01);
  assert.ok(lit.length > 1, 'and leave lanterns burning behind it');

  const earned = N.advance(state, lanterns, 3600);
  assert.ok(earned > 0, 'which then earn on their own');
  assert.ok(N.dawnProgress(lanterns) > 0, 'and move the night towards dawn');
});

test('2x4 — a lantern earns at the rate its board is routed', () => {
  const lanterns = shaft(5);
  const state = N.newNight(5);
  for (const l of lanterns) l.charge = 0;
  lanterns[1].charge = 1;
  lanterns[1].sealed = false;

  const plain = N.shaftRate(state, lanterns);
  lanterns[1].yieldMult = 2.5;
  const routed = N.shaftRate(state, lanterns);
  assert.ok(Math.abs(routed / plain - 2.5) < 1e-9, 'routing multiplies the output directly');

  const before = state.lumens;
  N.advance(state, lanterns, 600);
  assert.ok(state.lumens - before > 0, 'and it pays out over time');
});

test('2x4 — a board can always be scored, and its ceiling is knowable', () => {
  for (let i = 0; i < 12; i++) {
    const board = P.generateEngine(makeRng(i * 977 + 5), 2);
    assert.ok(board, `board ${i} failed to generate`);
    const now = P.scoreBoard(board.grid, board.emitter);
    const best = P.bestScore(board.grid, board.emitter);
    assert.ok(now >= 1, 'a board never earns less than the lantern alone');
    assert.ok(best.score >= now, `best ${best.score} must be at least current ${now}`);
    assert.ok(best.score <= 1 + 5 * P.COLLECTOR_WORTH + 60 * P.LENGTH_WORTH, 'and be bounded');

    // Applying the best rotations really does reach the ceiling.
    const applied = board.grid.map((c) => ({ ...c }));
    const movable = [];
    applied.forEach((c, k) => {
      if (!c.fixed && P.ROTATABLE.has(c.kind)) movable.push(k);
    });
    movable.forEach((k, j) => (applied[k].rot = best.rotations[j]));
    assert.ok(
      Math.abs(P.scoreBoard(applied, board.emitter) - best.score) < 1e-9,
      `board ${i} cannot actually reach its own ceiling`,
    );
  }
});

test('4x1 — the dark keeps rising while a lock is open', () => {
  const lanterns = shaft(8);
  const run = S.newRun(lanterns, []);
  run.picking = lanterns[3];
  const darkBefore = run.darkY;
  const playerBefore = { ...run.player };

  for (let i = 0; i < 120; i++) S.stepRun(run, 1 / 120, false);

  assert.ok(run.darkY > darkBefore, 'the dark does not wait for you to think');
  assert.deepEqual({ ...run.player }, playerBefore, 'but you hang still while you do');
  assert.ok(run.time > 0.9, 'and the clock runs');
});

test('4x1 — thinking too long about a lock is fatal', () => {
  const lanterns = shaft(8);
  const run = S.newRun(lanterns, []);
  run.picking = lanterns[3];
  run.darkY = run.player.y - 20;
  for (let i = 0; i < 240 && !run.dead; i++) S.stepRun(run, 1 / 120, false);
  assert.equal(run.dead, true, 'the dark reaches you mid-puzzle');
  assert.equal(run.cause, 'dark');
});
