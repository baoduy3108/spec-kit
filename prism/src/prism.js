// PRISM — the whole game, as pure functions over a grid.
//
// A beam leaves the emitter and travels in straight lines until it meets a
// piece. Mirrors turn it, splitters halve it into two, blockers eat it. Light
// every lantern to win.
//
// Everything here is deterministic and DOM-free, which is what lets the
// generator hand each puzzle to a solver and refuse to ship one that cannot
// be solved.

export const N = 7;

export const DIR = {
  U: 0,
  R: 1,
  D: 2,
  L: 3,
};
const DX = [0, 1, 0, -1];
const DY = [-1, 0, 1, 0];

/** Piece kinds. `rot` is 0..3 for pieces that have an orientation. */
export const KIND = {
  EMPTY: 0,
  MIRROR: 1, // reflects: rot 0 = "/", rot 1 = "\"
  SPLITTER: 2, // passes straight through *and* reflects
  BLOCKER: 3,
  LANTERN: 4,
  EMITTER: 5,
};

export const ROTATABLE = new Set([KIND.MIRROR, KIND.SPLITTER]);

export function idx(x, y) {
  return y * N + x;
}

export function inside(x, y) {
  return x >= 0 && y >= 0 && x < N && y < N;
}

export function createGrid() {
  return Array.from({ length: N * N }, () => ({ kind: KIND.EMPTY, rot: 0, fixed: false }));
}

export function cloneGrid(grid) {
  return grid.map((c) => ({ ...c }));
}

/**
 * Where a beam goes when it hits a piece.
 * @returns array of outgoing directions (empty = absorbed)
 */
export function bounce(kind, rot, dir) {
  if (kind === KIND.BLOCKER) return [];
  if (kind === KIND.LANTERN) return [dir]; // lanterns glow but do not block
  if (kind === KIND.EMPTY || kind === KIND.EMITTER) return [dir];

  // A "/" mirror maps U<->R and D<->L; "\" maps U<->L and D<->R.
  const slash = rot % 2 === 0;
  const reflect = slash
    ? { [DIR.U]: DIR.R, [DIR.R]: DIR.U, [DIR.D]: DIR.L, [DIR.L]: DIR.D }
    : { [DIR.U]: DIR.L, [DIR.L]: DIR.U, [DIR.D]: DIR.R, [DIR.R]: DIR.D };

  if (kind === KIND.MIRROR) return [reflect[dir]];
  if (kind === KIND.SPLITTER) return [reflect[dir], dir];
  return [dir];
}

/**
 * Trace every beam from the emitter.
 * @returns {{lit: Set<number>, segments: Array, litLanterns: number, lanterns: number}}
 */
export function trace(grid, emitter) {
  const lit = new Set();
  const segments = [];
  const seen = new Set();
  const queue = [{ x: emitter.x, y: emitter.y, dir: emitter.dir }];
  let guard = 0;

  while (queue.length && guard++ < 4000) {
    const beam = queue.shift();
    const key = `${beam.x},${beam.y},${beam.dir}`;
    if (seen.has(key)) continue; // a loop: light travels it once
    seen.add(key);

    let { x, y, dir } = beam;
    let steps = 0;
    while (steps++ < N * N * 4) {
      const nx = x + DX[dir];
      const ny = y + DY[dir];
      if (!inside(nx, ny)) {
        segments.push({ x1: x, y1: y, x2: nx, y2: ny });
        break;
      }
      segments.push({ x1: x, y1: y, x2: nx, y2: ny });
      lit.add(idx(nx, ny));

      const cell = grid[idx(nx, ny)];
      const outs = bounce(cell.kind, cell.rot, dir);
      if (outs.length === 0) break;
      if (outs.length === 1 && outs[0] === dir && cell.kind !== KIND.SPLITTER) {
        x = nx;
        y = ny;
        continue; // straight through, keep the same segment walk going
      }
      // A turn or a split: queue each outgoing beam from this cell.
      for (const out of outs) {
        const k = `${nx},${ny},${out}`;
        if (!seen.has(k)) queue.push({ x: nx, y: ny, dir: out });
      }
      break;
    }
  }

  let lanterns = 0;
  let litLanterns = 0;
  grid.forEach((cell, i) => {
    if (cell.kind !== KIND.LANTERN) return;
    lanterns++;
    if (lit.has(i)) litLanterns++;
  });

  return { lit, segments, lanterns, litLanterns };
}

export function isSolved(grid, emitter) {
  const result = trace(grid, emitter);
  return result.lanterns > 0 && result.litLanterns === result.lanterns;
}

// --- player moves ---------------------------------------------------------

/** Rotating is the only verb. Fixed pieces are part of the puzzle. */
export function rotate(grid, x, y, by = 1) {
  if (!inside(x, y)) return false;
  const cell = grid[idx(x, y)];
  if (cell.fixed || !ROTATABLE.has(cell.kind)) return false;
  cell.rot = (cell.rot + by + 4) % 4;
  return true;
}

// --- solver ---------------------------------------------------------------

/**
 * Brute force over every rotation of every movable piece.
 *
 * The search space is 2^movable (mirrors and splitters only have two
 * meaningful orientations), which stays tiny for the puzzle sizes we ship —
 * and being exhaustive is the point: it can prove a puzzle *unsolvable*, not
 * just fail to find an answer.
 *
 * @returns {{solved: boolean, moves: number, rotations: number[]}|null}
 */
export function solve(grid, emitter, maxMovable = 16) {
  const movable = [];
  grid.forEach((cell, i) => {
    if (!cell.fixed && ROTATABLE.has(cell.kind)) movable.push(i);
  });
  if (movable.length > maxMovable) return null; // refuse rather than hang

  const work = cloneGrid(grid);
  // Count turns against the board as the player found it. Comparing against
  // `work` instead is a bug that silently makes every par wrong, because the
  // previous mask has already rotated the pieces.
  const start = movable.map((i) => grid[i].rot % 2);
  const total = 1 << movable.length;
  let best = null;

  for (let mask = 0; mask < total; mask++) {
    let moves = 0;
    for (let b = 0; b < movable.length; b++) {
      const want = (mask >> b) & 1;
      if (start[b] !== want) moves++;
      work[movable[b]].rot = want;
    }
    if (isSolved(work, emitter)) {
      if (!best || moves < best.moves) {
        best = { solved: true, moves, rotations: movable.map((i) => work[i].rot) };
      }
      if (best.moves === 0) break;
    }
  }
  return best;
}

// --- generator ------------------------------------------------------------

/**
 * Build a puzzle by construction: lay a beam path down, put the pieces that
 * make that path in place, then scramble their rotations. Every puzzle is
 * born from a working solution, and then the solver double-checks it.
 */
export function generate(rng, { difficulty = 1 } = {}) {
  for (let attempt = 0; attempt < 60; attempt++) {
    const puzzle = attemptGenerate(rng, difficulty);
    if (!puzzle) continue;
    const answer = solve(puzzle.grid, puzzle.emitter);
    if (!answer || !answer.solved) continue;
    // A puzzle you are already standing on the answer to is not a puzzle.
    if (answer.moves < 1) continue;
    return { ...puzzle, par: answer.moves };
  }
  return null;
}

function attemptGenerate(rng, difficulty) {
  const grid = createGrid();
  const bounces = Math.min(6, 1 + Math.floor(difficulty));
  const lanternCount = difficulty >= 4 ? 2 : 1;

  // Start on an edge, pointing inwards.
  const side = rng.int(0, 3);
  const along = rng.int(1, N - 2);
  const start =
    side === 0
      ? { x: along, y: 0, dir: DIR.D }
      : side === 1
        ? { x: N - 1, y: along, dir: DIR.L }
        : side === 2
          ? { x: along, y: N - 1, dir: DIR.U }
          : { x: 0, y: along, dir: DIR.R };

  const emitter = { ...start };
  grid[idx(start.x, start.y)] = { kind: KIND.EMITTER, rot: 0, fixed: true };

  let { x, y, dir } = start;
  const placed = [];
  const path = new Set([idx(x, y)]);

  for (let b = 0; b < bounces; b++) {
    const run = rng.int(1, 3);
    for (let s = 0; s < run; s++) {
      const nx = x + DX[dir];
      const ny = y + DY[dir];
      if (!inside(nx, ny)) break;
      x = nx;
      y = ny;
      path.add(idx(x, y));
    }
    if (!inside(x + DX[dir], y + DY[dir])) break;
    if (grid[idx(x, y)].kind !== KIND.EMPTY) break;

    // Turn here.
    const rot = rng.int(0, 1);
    const kind = difficulty >= 3 && rng.chance(0.25) ? KIND.SPLITTER : KIND.MIRROR;
    grid[idx(x, y)] = { kind, rot, fixed: false };
    placed.push({ x, y });
    dir = bounce(kind, rot, dir)[0];
  }

  // Walk on a little further and drop the lantern where the beam ends up.
  for (let s = 0; s < rng.int(1, 3); s++) {
    const nx = x + DX[dir];
    const ny = y + DY[dir];
    if (!inside(nx, ny)) break;
    x = nx;
    y = ny;
  }
  if (grid[idx(x, y)].kind !== KIND.EMPTY) return null;
  grid[idx(x, y)] = { kind: KIND.LANTERN, rot: 0, fixed: true };

  if (placed.length < 1) return null;
  if (!isSolved(grid, emitter)) return null; // the built solution must work

  // Extra lanterns for harder puzzles: only where the beam already goes.
  if (lanternCount > 1) {
    const litCells = [...trace(grid, emitter).lit].filter(
      (i) => grid[i].kind === KIND.EMPTY,
    );
    if (litCells.length) {
      grid[rng.pick(litCells)] = { kind: KIND.LANTERN, rot: 0, fixed: true };
    }
  }

  // Decoy pieces make the board read like a puzzle rather than a solution.
  const decoys = Math.min(4, Math.floor(difficulty));
  for (let d = 0; d < decoys; d++) {
    const free = [];
    grid.forEach((c, i) => {
      if (c.kind === KIND.EMPTY && !path.has(i)) free.push(i);
    });
    if (!free.length) break;
    const spot = rng.pick(free);
    grid[spot] = {
      kind: rng.chance(0.25) ? KIND.BLOCKER : KIND.MIRROR,
      rot: rng.int(0, 1),
      fixed: rng.chance(0.3),
    };
  }

  // Scramble the real pieces so the player has something to do.
  let scrambled = false;
  for (const p of placed) {
    if (rng.chance(0.8)) {
      grid[idx(p.x, p.y)].rot = (grid[idx(p.x, p.y)].rot + 1) % 2;
      scrambled = true;
    }
  }
  if (!scrambled) grid[idx(placed[0].x, placed[0].y)].rot ^= 1;
  if (isSolved(grid, emitter)) return null; // scrambling must actually break it

  return { grid, emitter, difficulty };
}

/** Difficulty for a given puzzle number: gentle for the first few. */
export function difficultyFor(level) {
  return Math.min(6, 1 + Math.floor(level / 3));
}

export function serialise(state) {
  return {
    level: state.level,
    moves: state.moves,
    par: state.par,
    emitter: state.emitter,
    grid: state.grid.map((c) => [c.kind, c.rot, c.fixed ? 1 : 0]),
  };
}

export function deserialise(raw) {
  if (!raw || !Array.isArray(raw.grid) || raw.grid.length !== N * N) return null;
  return {
    level: Number(raw.level) || 1,
    moves: Number(raw.moves) || 0,
    par: Number(raw.par) || 1,
    emitter: raw.emitter,
    grid: raw.grid.map(([kind, rot, fixed]) => ({ kind, rot, fixed: !!fixed })),
  };
}
