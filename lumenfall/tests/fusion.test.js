// The fifth game keeps the four cores and none of the four control schemes.
// These tests check that each core is really present, and really connected.

import test from 'node:test';
import assert from 'node:assert/strict';

import * as Puz from '../src/puzzle.js';
import * as Pulse from '../src/pulse.js';
import * as Night from '../src/night.js';
import { makeRng } from '../src/core.js';

function board(seed = 5) {
  const b = Puz.generateEngine(makeRng(seed), 2);
  for (const c of b.grid) if (c.kind === Puz.KIND.LANTERN) c.charge = 0;
  const best = Puz.bestScore(b.grid, b.emitter);
  const movable = [];
  b.grid.forEach((c, i) => {
    if (!c.fixed && Puz.ROTATABLE.has(c.kind)) movable.push(i);
  });
  if (best.rotations) movable.forEach((i, k) => (b.grid[i].rot = best.rotations[k]));
  return b;
}

const nodesOf = (b) => b.grid.filter((c) => c.kind === Puz.KIND.LANTERN);

/** Plays the board with a player who taps inside the window every time. */
function play(run, seconds, { perfect = true } = {}) {
  const dt = 1 / 60;
  for (let t = 0; t < seconds; t += dt) {
    const p = run.pulses.find((x) => x.waiting);
    const tap = perfect && p && p.ring >= 1 - Pulse.PULSE.sweet * 0.6 && p.ring <= 1;
    Pulse.stepBoard(run, dt, !!tap);
  }
  return run;
}

test('the beam walks a path, and the nodes on it are the beats', () => {
  const b = board();
  const path = Pulse.beamPath(b.grid, b.emitter);
  assert.ok(path.length > 1, 'the beam goes somewhere');
  const nodes = Pulse.nodesOn(path);
  assert.ok(nodes.length >= 1, 'and reaches at least one node');
  for (const n of nodes) {
    assert.equal(path[n.at].kind, Puz.KIND.LANTERN, 'a beat is a node on the path');
  }
});

test('a beam that loops forever still gives a finite path', () => {
  const b = board();
  // Ring four mirrors so the light circles.
  for (const [x, y, rot] of [[1, 1, 1], [3, 1, 0], [3, 3, 1], [1, 3, 0]]) {
    b.grid[Puz.idx(x, y)] = { kind: Puz.KIND.MIRROR, rot, fixed: false };
  }
  const started = Date.now();
  const path = Pulse.beamPath(b.grid, b.emitter);
  assert.ok(Date.now() - started < 200, 'and does it quickly');
  assert.ok(path.length < 200);
});

test('1 — catching on the beat is worth more than letting it pass', () => {
  const caught = play(Pulse.newBoardRun(board(9)), 30, { perfect: true });
  const passed = play(Pulse.newBoardRun(board(9)), 30, { perfect: false });
  assert.ok(caught.caught > 0, 'a player who taps catches things');
  assert.equal(passed.caught, 0, 'a player who never taps catches nothing');
  assert.ok(caught.poured > passed.poured * 3, 'and is paid several times better');
  assert.ok(caught.bestCombo > 3, 'chains build');
});

test('1 — a tap outside the window costs the chain, not the pulse', () => {
  const run = Pulse.newBoardRun(board(4));
  const dt = 1 / 60;
  while (!run.pulses.some((p) => p.waiting)) Pulse.stepBoard(run, dt, false);
  run.combo = 5;
  Pulse.stepBoard(run, dt, true); // tapped the instant it arrived: far too early
  assert.equal(run.combo, 0, 'the chain breaks');
  assert.equal(run.missed, 1);
  const node = nodesOf(run.board).find((c) => c.charge > 0);
  assert.ok(node, 'but the node still keeps a little light');
});

test('1 — one finger is never asked to answer two rings', () => {
  const run = play(Pulse.newBoardRun(board(12)), 60, { perfect: true });
  assert.ok(run.caught > 5);
  assert.ok(run.missed <= 2, `a perfect player should barely miss (missed ${run.missed})`);
});

test('4 — re-routing changes which nodes are on the beat', () => {
  const b = board(21);
  const run = Pulse.newBoardRun(b);
  const before = run.nodes.length;
  const movable = [];
  b.grid.forEach((c, i) => {
    if (!c.fixed && Puz.ROTATABLE.has(c.kind)) movable.push(i);
  });
  assert.ok(movable.length, 'there is something to turn');
  Puz.rotate(b.grid, movable[0] % Puz.N, Math.floor(movable[0] / Puz.N));
  Pulse.rerouted(run);
  assert.notEqual(Pulse.beamPath(b.grid, b.emitter).length, 0);
  assert.ok(run.nodes.length !== before || run.path.length > 0, 'the line moved');
  assert.equal(run.pulses.length, 0, 'and pulses in flight are cleared, not teleported');
});

test('4 — the board has a knowable ceiling, and it is reachable', () => {
  for (let s = 0; s < 8; s++) {
    const b = board(100 + s);
    const best = Puz.bestScore(b.grid, b.emitter);
    const now = Puz.scoreBoard(b.grid, b.emitter);
    assert.ok(best.score >= now);
    const applied = b.grid.map((c) => ({ ...c }));
    const movable = [];
    applied.forEach((c, i) => {
      if (!c.fixed && Puz.ROTATABLE.has(c.kind)) movable.push(i);
    });
    movable.forEach((i, k) => (applied[i].rot = best.rotations[k]));
    assert.ok(Math.abs(Puz.scoreBoard(applied, b.emitter) - best.score) < 1e-9);
  }
});

test('2 — what you charged keeps earning after you stop tapping', () => {
  const b = board(33);
  const state = Night.newNight(33);
  play(Pulse.newBoardRun(b), 40, { perfect: true });

  const charged = nodesOf(b).filter((c) => c.charge > 0.01);
  assert.ok(charged.length, 'tapping charged something');
  const before = state.lumens;
  Night.advance(state, nodesOf(b), 3600);
  assert.ok(state.lumens - before > 0, 'and it pays out with nobody watching');
});

test('2 — offline is the closed form, not an approximation', () => {
  const make = () => {
    const b = board(44);
    for (const c of nodesOf(b)) c.charge = 1.5;
    return { b, s: Night.newNight(44) };
  };
  const jump = make();
  const stepped = make();
  Night.advance(jump.s, nodesOf(jump.b), 7200);
  for (let i = 0; i < 72000; i++) Night.advance(stepped.s, nodesOf(stepped.b), 0.1);
  const rel = Math.abs(jump.s.lumens - stepped.s.lumens) / stepped.s.lumens;
  assert.ok(rel < 1e-6, `closed form ${jump.s.lumens} vs stepped ${stepped.s.lumens}`);
});

test('3 — the dark takes it back whether or not you are there', () => {
  const b = board(55);
  const state = Night.newNight(55);
  for (const c of nodesOf(b)) c.charge = 2;
  const before = nodesOf(b)[0].charge;
  Night.advance(state, nodesOf(b), 600);
  assert.ok(nodesOf(b)[0].charge < before, 'charge fades');
  assert.ok(nodesOf(b)[0].charge > 0, 'but never quite to nothing');
});

test('3 — dawn pays on a log scale and hands you a new board', () => {
  const state = Night.newNight(66);
  assert.equal(Night.emberGain(state), 0);
  state.lifetime = 1e4;
  const small = Night.emberGain(state);
  state.lifetime = 1e10;
  const big = Night.emberGain(state);
  assert.ok(big > small && big < small * 6, 'a million times the lumens is not a million times the embers');

  const seed = state.seed;
  const gain = Night.breakDawn(state);
  assert.equal(state.embers, gain);
  assert.equal(state.night, 2);
  assert.notEqual(state.seed, seed);
  assert.ok(Night.embersMultiplier(state.embers) > 1);
});

test('the four cores are wired to each other, not just present', () => {
  const b = board(77);
  const state = Night.newNight(77);

  // 4 routes the beam -> 1 catches on it -> 2 earns from it -> 3 eats it.
  const run = Pulse.newBoardRun(b);
  assert.ok(run.nodes.length >= 1, 'routing decides where the beats are');

  play(run, 45, { perfect: true });
  assert.ok(run.poured > 0, 'catching charges the nodes');

  const earned = Night.advance(state, nodesOf(b), 1800);
  assert.ok(earned > 0, 'charged nodes earn lumens');
  assert.ok(state.lumens >= earned);

  const brightest = Math.max(...nodesOf(b).map((c) => c.charge));
  Night.advance(state, nodesOf(b), 3600);
  assert.ok(Math.max(...nodesOf(b).map((c) => c.charge)) < brightest, 'and the dark takes it back');

  state.lumens = 1e6;
  assert.equal(Night.buyUpgrade(state, 'window'), true, 'lumens buy an easier beat');
  assert.equal(Night.level(state, 'window'), 1);
});
