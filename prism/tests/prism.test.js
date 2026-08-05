import test from 'node:test';
import assert from 'node:assert/strict';

import {
  DIR,
  KIND,
  N,
  bounce,
  createGrid,
  deserialise,
  difficultyFor,
  generate,
  idx,
  isSolved,
  rotate,
  serialise,
  solve,
  trace,
} from '../src/prism.js';
import { makeRng } from '../src/rng.js';

function board(pieces = {}) {
  const grid = createGrid();
  for (const [at, cell] of Object.entries(pieces)) {
    const [x, y] = at.split(',').map(Number);
    grid[idx(x, y)] = { kind: cell.kind, rot: cell.rot || 0, fixed: !!cell.fixed };
  }
  return grid;
}

test('a beam with nothing in the way leaves the board', () => {
  const grid = board();
  const result = trace(grid, { x: 0, y: 3, dir: DIR.R });
  assert.equal(result.lanterns, 0);
  assert.ok(result.lit.has(idx(N - 1, 3)), 'it should reach the far wall');
  assert.ok(!result.lit.has(idx(3, 4)), 'and not wander off its row');
});

test('mirrors turn the beam the way they are drawn', () => {
  // "/" sends a beam travelling right upwards
  assert.deepEqual(bounce(KIND.MIRROR, 0, DIR.R), [DIR.U]);
  assert.deepEqual(bounce(KIND.MIRROR, 0, DIR.D), [DIR.L]);
  // "\" sends the same beam down
  assert.deepEqual(bounce(KIND.MIRROR, 1, DIR.R), [DIR.D]);
  assert.deepEqual(bounce(KIND.MIRROR, 1, DIR.U), [DIR.L]);
});

test('splitters do both, blockers do neither', () => {
  const split = bounce(KIND.SPLITTER, 0, DIR.R);
  assert.equal(split.length, 2);
  assert.ok(split.includes(DIR.R) && split.includes(DIR.U));
  assert.deepEqual(bounce(KIND.BLOCKER, 0, DIR.R), []);
  assert.deepEqual(bounce(KIND.LANTERN, 0, DIR.R), [DIR.R], 'a lantern glows but passes light');
});

test('a lantern in the beam is lit, one beside it is not', () => {
  const grid = board({
    '4,3': { kind: KIND.LANTERN, fixed: true },
    '4,5': { kind: KIND.LANTERN, fixed: true },
  });
  const emitter = { x: 0, y: 3, dir: DIR.R };
  const result = trace(grid, emitter);
  assert.equal(result.lanterns, 2);
  assert.equal(result.litLanterns, 1);
  assert.equal(isSolved(grid, emitter), false);
});

test('turning a mirror can finish a puzzle', () => {
  const grid = board({
    '3,3': { kind: KIND.MIRROR, rot: 1 },
    '3,0': { kind: KIND.LANTERN, fixed: true },
  });
  const emitter = { x: 0, y: 3, dir: DIR.R };
  assert.equal(isSolved(grid, emitter), false, 'the wrong way round to start');
  assert.equal(rotate(grid, 3, 3), true);
  assert.equal(isSolved(grid, emitter), true, 'and now the beam goes up into the lantern');
});

test('fixed pieces and empty cells cannot be turned', () => {
  const grid = board({
    '2,2': { kind: KIND.MIRROR, rot: 0, fixed: true },
    '4,4': { kind: KIND.BLOCKER },
  });
  assert.equal(rotate(grid, 2, 2), false, 'fixed');
  assert.equal(rotate(grid, 4, 4), false, 'not rotatable');
  assert.equal(rotate(grid, 6, 6), false, 'empty');
  assert.equal(rotate(grid, -1, 0), false, 'off the board');
});

test('a beam that loops does not hang the tracer', () => {
  // Four mirrors in a square send the beam round forever.
  const grid = board({
    '1,1': { kind: KIND.MIRROR, rot: 1 },
    '4,1': { kind: KIND.MIRROR, rot: 0 },
    '4,4': { kind: KIND.MIRROR, rot: 1 },
    '1,4': { kind: KIND.MIRROR, rot: 0 },
  });
  const started = Date.now();
  const result = trace(grid, { x: 0, y: 1, dir: DIR.R });
  assert.ok(Date.now() - started < 500, 'the loop must terminate');
  assert.ok(result.segments.length > 0);
});

test('the solver finds the answer and counts the turns honestly', () => {
  const grid = board({
    '3,3': { kind: KIND.MIRROR, rot: 1 },
    '3,0': { kind: KIND.LANTERN, fixed: true },
  });
  const emitter = { x: 0, y: 3, dir: DIR.R };
  const answer = solve(grid, emitter);
  assert.ok(answer && answer.solved);
  assert.equal(answer.moves, 1, 'exactly one turn is needed');
});

test('the solver can prove a puzzle impossible', () => {
  const grid = board({
    '3,3': { kind: KIND.MIRROR, rot: 0 },
    '6,6': { kind: KIND.LANTERN, fixed: true },
    '5,6': { kind: KIND.BLOCKER, fixed: true },
    '6,5': { kind: KIND.BLOCKER, fixed: true },
  });
  const answer = solve(grid, { x: 0, y: 3, dir: DIR.R });
  assert.equal(answer, null, 'walled in behind blockers, there is no answer');
});

test('the solver refuses rather than hangs on a huge board', () => {
  const grid = createGrid();
  for (let i = 0; i < 40; i++) grid[i] = { kind: KIND.MIRROR, rot: 0, fixed: false };
  assert.equal(solve(grid, { x: 0, y: 0, dir: DIR.R }, 16), null);
});

test('every generated puzzle is solvable, and none starts solved', () => {
  const rng = makeRng(20260805);
  let made = 0;
  for (let level = 1; level <= 40; level++) {
    const puzzle = generate(rng, { difficulty: difficultyFor(level) });
    assert.ok(puzzle, `level ${level} failed to generate`);
    made++;

    assert.equal(isSolved(puzzle.grid, puzzle.emitter), false, `level ${level} starts solved`);
    const answer = solve(puzzle.grid, puzzle.emitter);
    assert.ok(answer && answer.solved, `level ${level} has no solution`);
    assert.equal(answer.moves, puzzle.par, `level ${level} par is wrong`);
    assert.ok(puzzle.par >= 1 && puzzle.par <= 8, `level ${level} par ${puzzle.par} is silly`);

    const lanterns = puzzle.grid.filter((c) => c.kind === KIND.LANTERN).length;
    assert.ok(lanterns >= 1, `level ${level} has nothing to light`);
    const emitters = puzzle.grid.filter((c) => c.kind === KIND.EMITTER).length;
    assert.equal(emitters, 1, `level ${level} needs exactly one emitter`);
  }
  assert.equal(made, 40);
});

test('the same seed always builds the same puzzle', () => {
  const a = generate(makeRng(777), { difficulty: 3 });
  const b = generate(makeRng(777), { difficulty: 3 });
  assert.deepEqual(a.grid, b.grid);
  assert.deepEqual(a.emitter, b.emitter);
  assert.equal(a.par, b.par);
});

test('harder levels ask for more work', () => {
  const rng = makeRng(4242);
  const easy = [];
  const hard = [];
  for (let i = 0; i < 12; i++) {
    easy.push(generate(rng, { difficulty: 1 }).par);
    hard.push(generate(rng, { difficulty: 5 }).par);
  }
  const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length;
  assert.ok(mean(hard) >= mean(easy), `hard ${mean(hard)} vs easy ${mean(easy)}`);
  assert.ok(difficultyFor(30) > difficultyFor(1));
  assert.ok(difficultyFor(999) <= 6, 'difficulty plateaus');
});

test('a puzzle survives being saved and loaded', () => {
  const puzzle = generate(makeRng(99), { difficulty: 4 });
  const state = { ...puzzle, level: 12, moves: 3 };
  const back = deserialise(JSON.parse(JSON.stringify(serialise(state))));
  assert.equal(back.level, 12);
  assert.equal(back.moves, 3);
  assert.deepEqual(back.grid, puzzle.grid);
  assert.equal(isSolved(back.grid, back.emitter), false);
  assert.equal(deserialise(null), null);
  assert.equal(deserialise({ grid: 'nonsense' }), null);
});

test('the solver returns the rotations it counted, so hints point at the right pieces', () => {
  const rng = makeRng(31337);
  for (let level = 1; level <= 25; level++) {
    const puzzle = generate(rng, { difficulty: difficultyFor(level) });
    const answer = solve(puzzle.grid, puzzle.emitter);
    assert.ok(answer);

    const movable = [];
    puzzle.grid.forEach((c, i) => {
      if (!c.fixed && (c.kind === KIND.MIRROR || c.kind === KIND.SPLITTER)) movable.push(i);
    });
    assert.equal(answer.rotations.length, movable.length, `level ${level} rotation count`);

    // The pieces a hint would highlight must be exactly `moves` many...
    const wrong = movable.filter((i, k) => puzzle.grid[i].rot % 2 !== answer.rotations[k]);
    assert.equal(wrong.length, answer.moves, `level ${level} hint would name the wrong pieces`);

    // ...and turning exactly those must finish the puzzle.
    const applied = puzzle.grid.map((c) => ({ ...c }));
    movable.forEach((i, k) => (applied[i].rot = answer.rotations[k]));
    assert.ok(isSolved(applied, puzzle.emitter), `level ${level} answer does not solve it`);
  }
});
