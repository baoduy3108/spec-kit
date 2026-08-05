// LUMENFALL — one board, one finger.
//
// The pulse walks the line you routed. Tap when the ring closes on a node.
// The nodes you charge keep earning after you close the tab, and the dark
// takes it back the whole time.

import { TAU, clamp, fmt, fmtTime, makeRng } from './core.js';
import * as Puz from './puzzle.js';
import * as Pulse from './pulse.js';
import * as Night from './night.js';

const $ = (s) => document.querySelector(s);
const canvas = $('#view');
const g = canvas.getContext('2d', { alpha: false });
const KEY = 'lumenfall.save.v2';

let state = null;
let board = null;
let run = null;
let tapped = false;
let last = performance.now();
let t = 0;
let flash = 0;
const parts = [];

const nodes = () => board.grid.filter((c) => c.kind === Puz.KIND.LANTERN);

// --- board ----------------------------------------------------------------

function makeBoard(seed, extraNodes = 0) {
  const rng = makeRng(seed);
  const b = Puz.generateEngine(rng, 2 + Math.min(3, extraNodes)) || Puz.generate(rng, { difficulty: 2 });
  for (const c of b.grid) if (c.kind === Puz.KIND.LANTERN) c.charge = 0;
  const empties = [];
  b.grid.forEach((c, i) => {
    if (c.kind === Puz.KIND.EMPTY) empties.push(i);
  });
  for (let k = 0; k < extraNodes && empties.length; k++) {
    const at = empties.splice(rng.int(0, empties.length - 1), 1)[0];
    b.grid[at] = { kind: Puz.KIND.LANTERN, rot: 0, fixed: true, charge: 0 };
  }

  // The board is generated as a puzzle, which means it starts *broken*. For a
  // game you tap along to, that is nine seconds of nothing happening. So open
  // on the best routing the solver can find, then knock one mirror out of
  // true: something works immediately, and there is visibly better to find.
  const best = Puz.bestScore(b.grid, b.emitter);
  const movable = [];
  b.grid.forEach((c, i) => {
    if (!c.fixed && Puz.ROTATABLE.has(c.kind)) movable.push(i);
  });
  if (best.rotations) {
    movable.forEach((i, k) => (b.grid[i].rot = best.rotations[k]));
    for (const i of movable) {
      const was = b.grid[i].rot;
      b.grid[i].rot = (was + 1) % 2;
      if (Puz.trace(b.grid, b.emitter).litLanterns >= 1) break; // still playable
      b.grid[i].rot = was;
    }
  }
  b.best = Puz.bestScore(b.grid, b.emitter).score;
  return b;
}

function boot() {
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem(KEY));
  } catch (_) {
    saved = null;
  }

  state = saved?.state || Night.newNight((Math.random() * 0x7fffffff) | 0);
  board = makeBoard(state.seed, Night.level(state, 'nodes'));
  if (saved?.grid && saved.grid.length === board.grid.length) {
    saved.grid.forEach(([kind, rot, fixed, charge], i) => {
      board.grid[i] = { kind, rot, fixed: !!fixed, charge: charge || 0 };
    });
  }
  run = Pulse.newBoardRun(board);
  applyAllUpgrades();

  const away = saved ? (Date.now() - (state.lastSeen || Date.now())) / 1000 : 0;
  if (away > 90) {
    const r = Night.applyOffline(state, nodes(), away);
    if (r.earned > 0.5) showAway(r);
  }
  paintHud();
  paintTend();
  paintRoute();
}

function save() {
  try {
    state.lastSeen = Date.now();
    localStorage.setItem(
      KEY,
      JSON.stringify({
        state,
        grid: board.grid.map((c) => [c.kind, c.rot, c.fixed ? 1 : 0, Number((c.charge || 0).toFixed(4))]),
      }),
    );
  } catch (_) {
    /* private mode */
  }
}

// --- loop -----------------------------------------------------------------

function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min((now - last) / 1000, 0.25);
  last = now;
  t += dt;
  flash = Math.max(0, flash - dt * 2.4);
  if (document.hidden) return;

  for (const e of Pulse.stepBoard(run, dt, tapped)) onEvent(e);
  tapped = false;

  // The night runs wherever you are looking.
  Night.advance(state, nodes(), dt);

  for (let i = parts.length - 1; i >= 0; i--) {
    const p = parts[i];
    p.life -= dt;
    if (p.life <= 0) parts.splice(i, 1);
    else {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vx *= 0.94;
      p.vy *= 0.94;
    }
  }

  draw();
  if (Math.floor(t * 4) % 2 === 0) paintHud();
}

function onEvent(e) {
  if (e.type === 'catch') {
    flash = 0.5;
    burst(e.x, e.y, 14, '#ffe3a3');
    if (e.combo > 1) toast(`chain ${e.combo}`, 1000);
  } else if (e.type === 'miss') {
    burst(e.x, e.y, 5, 'rgba(160,140,200,.8)');
  }
}

function burst(gx, gy, n, colour) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * TAU;
    const s = 0.6 + Math.random() * 1.8;
    parts.push({ x: gx, y: gy, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0.5, colour });
  }
}

// --- drawing --------------------------------------------------------------

let W = 540;
let H = 960;
let scale = 1;

function resize() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
  W = 540;
  H = Math.round(clamp((540 * rect.height) / Math.max(1, rect.width), 860, 1320));
  scale = (rect.width * dpr) / W;
  canvas.width = Math.round(W * scale);
  canvas.height = Math.round(H * scale);
}

function boardBox() {
  const size = Math.min(W * 0.9, H * 0.56);
  return { x: (W - size) / 2, y: H * 0.2, size, cell: size / Puz.N };
}

function draw() {
  if (!scale) resize();
  g.setTransform(scale, 0, 0, scale, 0, 0);
  const grad = g.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#070a14');
  grad.addColorStop(1, '#120a18');
  g.fillStyle = grad;
  g.fillRect(0, 0, W, H);

  const box = boardBox();
  const px = (gx) => box.x + (gx + 0.5) * box.cell;
  const py = (gy) => box.y + (gy + 0.5) * box.cell;

  board.grid.forEach((c, i) => {
    if (c.kind !== Puz.KIND.LANTERN || !(c.charge > 0.01)) return;
    const x = px(i % Puz.N);
    const y = py(Math.floor(i / Puz.N));
    const r = box.cell * (0.7 + Math.min(1.4, c.charge));
    const halo = g.createRadialGradient(x, y, 0, x, y, r);
    halo.addColorStop(0, `rgba(255,200,120,${Math.min(0.5, 0.12 + c.charge * 0.2)})`);
    halo.addColorStop(1, 'rgba(255,200,120,0)');
    g.fillStyle = halo;
    g.fillRect(x - r, y - r, r * 2, r * 2);
  });

  g.strokeStyle = 'rgba(120,150,210,.08)';
  g.lineWidth = 1;
  for (let i = 0; i <= Puz.N; i++) {
    g.beginPath();
    g.moveTo(box.x + i * box.cell, box.y);
    g.lineTo(box.x + i * box.cell, box.y + box.size);
    g.moveTo(box.x, box.y + i * box.cell);
    g.lineTo(box.x + box.size, box.y + i * box.cell);
    g.stroke();
  }

  g.save();
  g.globalCompositeOperation = 'lighter';
  g.strokeStyle = 'rgba(255,200,120,.32)';
  g.lineWidth = 4;
  g.lineCap = 'round';
  g.beginPath();
  g.moveTo(px(board.emitter.x), py(board.emitter.y));
  for (const cell of run.path) g.lineTo(px(cell.x), py(cell.y));
  g.stroke();
  g.restore();

  board.grid.forEach((c, i) => {
    const x = px(i % Puz.N);
    const y = py(Math.floor(i / Puz.N));
    const r = box.cell * 0.3;
    if (c.kind === Puz.KIND.MIRROR || c.kind === Puz.KIND.SPLITTER) {
      const slash = c.rot % 2 === 0;
      g.strokeStyle = c.fixed ? 'rgba(160,170,200,.5)' : '#dceaff';
      g.lineWidth = c.kind === Puz.KIND.SPLITTER ? 3 : 5;
      if (c.kind === Puz.KIND.SPLITTER) g.setLineDash([6, 5]);
      g.beginPath();
      g.moveTo(x - r, y + (slash ? r : -r));
      g.lineTo(x + r, y + (slash ? -r : r));
      g.stroke();
      g.setLineDash([]);
    } else if (c.kind === Puz.KIND.BLOCKER) {
      g.fillStyle = 'rgba(40,46,74,.95)';
      g.fillRect(x - r, y - r, r * 2, r * 2);
    } else if (c.kind === Puz.KIND.EMITTER) {
      g.fillStyle = '#6fe4ff';
      g.beginPath();
      g.arc(x, y, r * 0.55, 0, TAU);
      g.fill();
    } else if (c.kind === Puz.KIND.LANTERN) {
      const lit = c.charge > 0.01;
      g.strokeStyle = lit ? '#ffd98a' : 'rgba(160,180,220,.4)';
      g.lineWidth = 3;
      g.beginPath();
      g.arc(x, y, r * 0.8, 0, TAU);
      g.stroke();
      g.fillStyle = lit ? '#fff3cf' : 'rgba(120,140,180,.2)';
      g.beginPath();
      g.arc(x, y, r * (0.3 + Math.min(0.35, (c.charge || 0) * 0.2)), 0, TAU);
      g.fill();
    }
  });

  for (const p of run.pulses) {
    const at = Pulse.pulseAt(run, p);
    const x = px(at.x);
    const y = py(at.y);
    if (p.waiting) {
      const closing = clamp(p.ring, 0, 1.1);
      g.strokeStyle = 'rgba(141,255,168,.45)';
      g.lineWidth = 5;
      g.beginPath();
      g.arc(x, y, box.cell * 0.46, -Math.PI / 2, -Math.PI / 2 + TAU * Pulse.PULSE.sweet);
      g.stroke();
      g.strokeStyle = closing >= 1 - Pulse.PULSE.sweet ? '#8dffa8' : '#ffd98a';
      g.lineWidth = 3;
      g.beginPath();
      g.arc(x, y, box.cell * 0.46 * (1.7 - closing * 0.7), 0, TAU);
      g.stroke();
    }
    const r = 7 + p.strength * 3;
    const halo = g.createRadialGradient(x, y, 0, x, y, r * 4);
    halo.addColorStop(0, 'rgba(255,240,200,.9)');
    halo.addColorStop(1, 'rgba(255,200,120,0)');
    g.fillStyle = halo;
    g.fillRect(x - r * 4, y - r * 4, r * 8, r * 8);
    g.fillStyle = '#fff8e6';
    g.beginPath();
    g.arc(x, y, r, 0, TAU);
    g.fill();
  }

  for (const p of parts) {
    g.globalAlpha = clamp(p.life * 2, 0, 1);
    g.fillStyle = p.colour;
    g.beginPath();
    g.arc(px(p.x), py(p.y), 3, 0, TAU);
    g.fill();
  }
  g.globalAlpha = 1;

  if (flash > 0) {
    g.fillStyle = `rgba(255,220,150,${flash * 0.16})`;
    g.fillRect(0, 0, W, H);
  }
}

// --- hud ------------------------------------------------------------------

const cache = {};
function set(sel, v) {
  if (cache[sel] === v) return;
  cache[sel] = v;
  const el = $(sel);
  if (el) el.textContent = v;
}

function paintHud() {
  set('#h-depth', fmt(state.lumens));
  set('#h-carry', fmt(Night.shaftRate(state, nodes())) + '/s');
  set('#h-combo', run.combo > 0 ? '×' + run.combo : '—');
  const pct = Math.round(Night.dawnProgress(nodes()) * 100);
  if (cache.pct !== pct) {
    cache.pct = pct;
    $('#t-dawnfill').style.width = pct + '%';
    $('#t-dawnlabel').textContent = `NIGHT ${state.night} · ${pct}% TO DAWN`;
    $('#t-dawnbtn').classList.toggle('hidden', !Night.canDawn(nodes()));
  }
}

function paintRoute() {
  $('#t-echo').textContent = `the beam reaches ${run.nodes.length} of ${nodes().length} nodes · tap a mirror to re-route`;
}

function showAway(r) {
  $('#a-time').textContent = `Away ${fmtTime(r.away)} · the board burned for ${fmtTime(r.simulated)}`;
  $('#a-gain').textContent = fmt(r.earned) + ' lumens';
  $('#a-note').textContent = `Offline runs at ${Math.round(r.efficiency * 100)}%. The dark was eating the whole time.`;
  $('#away').classList.remove('hidden');
}

function toast(text, ms = 1600) {
  const el = $('#toast');
  el.textContent = text;
  el.classList.remove('hidden');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.classList.add('hidden'), ms);
}

// --- input: one finger ----------------------------------------------------

canvas.addEventListener('pointerdown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const vx = ((e.clientX - rect.left) / rect.width) * W;
  const vy = ((e.clientY - rect.top) / rect.height) * H;
  const box = boardBox();
  const gx = Math.floor((vx - box.x) / box.cell);
  const gy = Math.floor((vy - box.y) / box.cell);

  // A tap on a mirror re-routes the line; a tap anywhere else catches a pulse.
  if (gx >= 0 && gy >= 0 && gx < Puz.N && gy < Puz.N) {
    const cell = board.grid[Puz.idx(gx, gy)];
    if (!cell.fixed && Puz.ROTATABLE.has(cell.kind)) {
      Puz.rotate(board.grid, gx, gy);
      Pulse.rerouted(run);
      paintRoute();
      save();
      return;
    }
  }
  tapped = true;
});

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !e.repeat) {
    e.preventDefault();
    tapped = true;
  }
});

// --- screens --------------------------------------------------------------

document.addEventListener('click', (e) => {
  const a = e.target.closest('[data-a]')?.dataset.a;
  if (!a) return;
  if (a === 'close-away') $('#away').classList.add('hidden');
  if (a === 'tend') {
    $('#s-tend').classList.remove('hidden');
    paintTend();
  }
  if (a === 'home') {
    $('#s-tend').classList.add('hidden');
    $('#s-dawn').classList.add('hidden');
  }
  if (a === 'dawn') {
    const gain = Night.breakDawn(state);
    board = makeBoard(state.seed, Night.level(state, 'nodes'));
    run = Pulse.newBoardRun(board);
    $('#w-line').textContent =
      `+${gain} embers · everything burns ×${Night.embersMultiplier(state.embers).toFixed(2)} from now on`;
    $('#s-dawn').classList.remove('hidden');
    paintRoute();
    save();
  }
});

function paintTend() {
  $('#d-lumens').textContent = fmt(state.lumens);
  $('#d-rate').textContent = fmt(Night.shaftRate(state, nodes())) + '/s';
  $('#d-lit').textContent = nodes().filter((c) => c.charge > 0.01).length;
  const list = $('#upgrades');
  if (!list) return;
  list.innerHTML = '';
  for (const u of Night.UPGRADES) {
    const lvl = Night.level(state, u.id);
    const cost = Night.upgradeCost(state, u.id);
    const can = cost !== null && state.lumens >= cost;
    const row = document.createElement('div');
    row.className = `card ${cost === null ? 'maxed' : can ? 'ready' : ''}`;
    row.innerHTML = `<div><b>${u.name} <span>${lvl}/${u.levels}</span></b><span>${u.blurb}</span></div>
      <button ${can ? '' : 'disabled'}>${cost === null ? 'MAXED' : fmt(cost)}</button>`;
    row.querySelector('button').addEventListener('click', () => {
      if (!Night.buyUpgrade(state, u.id)) return;
      applyUpgrade(u.id);
      toast(`${u.name} ${Night.level(state, u.id)}`);
      save();
      paintTend();
      paintRoute();
    });
    list.appendChild(row);
  }
}

function applyAllUpgrades() {
  applyUpgrade('window');
  applyUpgrade('tempo');
}

function applyUpgrade(id) {
  if (id === 'window') {
    Pulse.PULSE.sweet = Math.min(0.72, 0.3 + 0.07 * Night.level(state, 'window'));
  }
  if (id === 'tempo') {
    Pulse.PULSE.every = Math.max(0.6, 1.6 - 0.14 * Night.level(state, 'tempo'));
  }
  if (id === 'nodes') {
    const empties = [];
    board.grid.forEach((c, i) => {
      if (c.kind === Puz.KIND.EMPTY) empties.push(i);
    });
    if (empties.length) {
      board.grid[empties[Math.floor(Math.random() * empties.length)]] = {
        kind: Puz.KIND.LANTERN,
        rot: 0,
        fixed: true,
        charge: 0,
      };
      Pulse.rerouted(run);
    }
  }
}

window.addEventListener('resize', resize);
window.addEventListener('beforeunload', save);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) save();
  else last = performance.now();
});
setInterval(save, 15000);

window.__lumenfall = {
  get state() { return state; },
  get board() { return board; },
  get run() { return run; },
  Puz, Pulse, Night,
  tap: () => (tapped = true),
};

resize();
boot();
requestAnimationFrame(frame);
