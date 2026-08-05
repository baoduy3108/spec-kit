// PRISM client: draw the grid, take taps, animate the beam.

import { KIND, N, ROTATABLE, difficultyFor, generate, idx, isSolved, rotate, solve, trace } from './prism.js';
import { makeRng } from './rng.js';

const $ = (s) => document.querySelector(s);
const canvas = $('#board');
const g = canvas.getContext('2d');
const KEY = 'prism.save.v1';

let state = load() || newGame(1);
let t = 0;
let flash = 0;
let hintCells = null;

function newGame(level) {
  const rng = makeRng(0x9e37 ^ (level * 2654435761));
  const puzzle = generate(rng, { difficulty: difficultyFor(level) });
  return { level, moves: 0, par: puzzle.par, grid: puzzle.grid, emitter: puzzle.emitter, best: null };
}

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (!raw || !Array.isArray(raw.grid)) return null;
    return {
      level: raw.level,
      moves: raw.moves,
      par: raw.par,
      emitter: raw.emitter,
      grid: raw.grid.map(([kind, rot, fixed]) => ({ kind, rot, fixed: !!fixed })),
      best: raw.best || null,
    };
  } catch (_) {
    return null;
  }
}

function save() {
  try {
    localStorage.setItem(
      KEY,
      JSON.stringify({
        level: state.level,
        moves: state.moves,
        par: state.par,
        emitter: state.emitter,
        best: state.best,
        grid: state.grid.map((c) => [c.kind, c.rot, c.fixed ? 1 : 0]),
      }),
    );
  } catch (_) {
    /* private mode: play on without saving */
  }
}

// --- drawing --------------------------------------------------------------

function resize() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  canvas.dpr = dpr;
  canvas.size = rect.width;
}

function draw() {
  if (!canvas.size) resize();
  const size = canvas.size;
  const cell = size / N;
  g.setTransform(canvas.dpr, 0, 0, canvas.dpr, 0, 0);
  g.clearRect(0, 0, size, size);

  const result = trace(state.grid, state.emitter);

  // grid
  g.strokeStyle = 'rgba(120,150,210,.09)';
  g.lineWidth = 1;
  for (let i = 1; i < N; i++) {
    g.beginPath();
    g.moveTo(i * cell, 0);
    g.lineTo(i * cell, size);
    g.moveTo(0, i * cell);
    g.lineTo(size, i * cell);
    g.stroke();
  }

  // beam
  g.save();
  g.globalCompositeOperation = 'lighter';
  g.lineCap = 'round';
  for (const s of result.segments) {
    const grad = g.createLinearGradient(
      (s.x1 + 0.5) * cell, (s.y1 + 0.5) * cell,
      (s.x2 + 0.5) * cell, (s.y2 + 0.5) * cell,
    );
    grad.addColorStop(0, 'rgba(255,217,138,.75)');
    grad.addColorStop(1, 'rgba(255,180,90,.75)');
    g.strokeStyle = grad;
    g.lineWidth = 6 + Math.sin(t * 4) * 1.2;
    g.beginPath();
    g.moveTo((s.x1 + 0.5) * cell, (s.y1 + 0.5) * cell);
    g.lineTo((s.x2 + 0.5) * cell, (s.y2 + 0.5) * cell);
    g.stroke();
  }
  g.restore();

  // pieces
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const c = state.grid[idx(x, y)];
      const cx = (x + 0.5) * cell;
      const cy = (y + 0.5) * cell;
      const r = cell * 0.32;
      const hinted = hintCells && hintCells.has(idx(x, y));

      if (hinted) {
        g.strokeStyle = `rgba(111,228,255,${0.35 + Math.sin(t * 6) * 0.25})`;
        g.lineWidth = 2;
        g.strokeRect(x * cell + 3, y * cell + 3, cell - 6, cell - 6);
      }

      if (c.kind === KIND.MIRROR || c.kind === KIND.SPLITTER) {
        const slash = c.rot % 2 === 0;
        g.strokeStyle = c.fixed ? 'rgba(150,170,210,.6)' : '#cfe6ff';
        g.lineWidth = c.kind === KIND.SPLITTER ? 3 : 5;
        g.lineCap = 'round';
        if (c.kind === KIND.SPLITTER) g.setLineDash([7, 6]);
        g.beginPath();
        g.moveTo(cx - r * (slash ? 1 : 1), cy + r * (slash ? 1 : -1));
        g.lineTo(cx + r, cy + r * (slash ? -1 : 1));
        g.stroke();
        g.setLineDash([]);
        if (c.fixed) {
          g.fillStyle = 'rgba(150,170,210,.5)';
          g.beginPath();
          g.arc(cx, cy, 2.5, 0, Math.PI * 2);
          g.fill();
        }
      } else if (c.kind === KIND.BLOCKER) {
        g.fillStyle = 'rgba(40,50,80,.95)';
        g.strokeStyle = 'rgba(120,140,190,.5)';
        g.lineWidth = 2;
        g.beginPath();
        g.roundRect(cx - r, cy - r, r * 2, r * 2, 4);
        g.fill();
        g.stroke();
      } else if (c.kind === KIND.EMITTER) {
        g.fillStyle = '#6fe4ff';
        g.beginPath();
        g.arc(cx, cy, r * 0.7, 0, Math.PI * 2);
        g.fill();
        halo(cx, cy, cell, 'rgba(111,228,255,.5)');
      } else if (c.kind === KIND.LANTERN) {
        const lit = result.lit.has(idx(x, y));
        if (lit) halo(cx, cy, cell * 1.4, 'rgba(255,217,138,.75)');
        g.strokeStyle = lit ? '#ffd98a' : 'rgba(160,180,220,.45)';
        g.lineWidth = 3;
        g.beginPath();
        g.arc(cx, cy, r * 0.85, 0, Math.PI * 2);
        g.stroke();
        g.fillStyle = lit ? '#fff3cf' : 'rgba(120,140,180,.25)';
        g.beginPath();
        g.arc(cx, cy, r * 0.4, 0, Math.PI * 2);
        g.fill();
      }
    }
  }

  if (flash > 0) {
    g.fillStyle = `rgba(255,217,138,${flash * 0.25})`;
    g.fillRect(0, 0, size, size);
  }
}

function halo(cx, cy, radius, colour) {
  const grad = g.createRadialGradient(cx, cy, 0, cx, cy, radius);
  grad.addColorStop(0, colour);
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
}

// --- interaction ----------------------------------------------------------

canvas.addEventListener('pointerdown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const cell = rect.width / N;
  const x = Math.floor((e.clientX - rect.left) / cell);
  const y = Math.floor((e.clientY - rect.top) / cell);
  if (!rotate(state.grid, x, y)) return;
  state.moves++;
  hintCells = null;
  save();
  paint();
  if (isSolved(state.grid, state.emitter)) win();
});

function win() {
  flash = 1;
  const par = state.par;
  const verdict =
    state.moves === par ? 'perfect — nobody could do it in fewer' :
    state.moves <= par + 2 ? 'clean work' : 'lit, if the long way round';
  $('#win-line').textContent = `${state.moves} turns · best known ${par} — ${verdict}`;
  state.best = Math.min(state.best ?? Infinity, state.moves);
  $('#win').classList.remove('hidden');
  save();
}

document.addEventListener('click', (e) => {
  const action = e.target.closest('[data-action]')?.dataset.action;
  if (!action) return;
  if (action === 'next') {
    state = newGame(state.level + 1);
    $('#win').classList.add('hidden');
  }
  if (action === 'skip') state = newGame(state.level + 1);
  if (action === 'reset') state = newGame(state.level);
  if (action === 'hint') {
    const answer = solve(state.grid, state.emitter);
    if (!answer) {
      $('#status').textContent = 'no solution from here — reset the puzzle';
      return;
    }
    // Show which pieces are in the wrong orientation, not the answer itself.
    hintCells = new Set();
    let k = 0;
    state.grid.forEach((c, i) => {
      if (c.fixed || !ROTATABLE.has(c.kind)) return;
      if (c.rot % 2 !== answer.rotations[k]) hintCells.add(i);
      k++;
    });
    $('#status').textContent = `${hintCells.size} piece${hintCells.size === 1 ? '' : 's'} to turn`;
  }
  hintCells = action === 'hint' ? hintCells : null;
  save();
  paint();
});

function paint() {
  $('#level').textContent = state.level;
  $('#moves').textContent = state.moves;
  $('#par').textContent = state.par;
  if ($('#status').textContent && !hintCells) $('#status').textContent = '';
  draw();
}

function frame(now) {
  requestAnimationFrame(frame);
  t = now / 1000;
  flash = Math.max(0, flash - 0.02);
  draw();
}

window.addEventListener('resize', () => {
  resize();
  paint();
});

window.__prism = { get state() { return state; }, solve, isSolved, newGame: (l) => (state = newGame(l)) };

resize();
paint();
requestAnimationFrame(frame);
