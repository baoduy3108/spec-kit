// LUMENFALL — the glue. Loop, canvas, screens, save.

import { TAU, clamp, fmt, fmtTime, makeRng, angleDiff } from './core.js';
import * as Sim from './sim.js';
import * as Night from './night.js';
import * as Puz from './puzzle.js';

const $ = (s) => document.querySelector(s);
const canvas = $('#view');
const g = canvas.getContext('2d', { alpha: false });
const KEY = 'lumenfall.save.v1';
const STEP = 1 / 120;

let state = null;
let lanterns = [];
let run = null;
let lock = null; // { grid, emitter, par, lantern, moves }
let echoRun = null;
let phase = 'title';
let held = false;
let acc = 0;
let last = performance.now();
let t = 0;
let shake = 0;
let flash = 0;
const parts = [];

// --- save -----------------------------------------------------------------

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY));
    if (!raw || !raw.state) return null;
    return raw;
  } catch (_) {
    return null;
  }
}

function save() {
  try {
    state.lastSeen = Date.now();
    localStorage.setItem(
      KEY,
      JSON.stringify({
        state,
        charges: lanterns.map((l) => [Number(l.charge.toFixed(4)), l.sealed ? 1 : 0]),
      }),
    );
  } catch (_) {
    /* private mode */
  }
}

function boot() {
  const saved = load();
  state = saved?.state || Night.newNight((Math.random() * 0x7fffffff) | 0);
  lanterns = Sim.buildShaft(state.seed);
  if (saved?.charges) {
    saved.charges.forEach(([charge, sealed], i) => {
      if (!lanterns[i]) return;
      lanterns[i].charge = charge;
      lanterns[i].sealed = !!sealed;
    });
  }
  const away = saved ? (Date.now() - (state.lastSeen || Date.now())) / 1000 : 0;
  if (away > 90) {
    const r = Night.applyOffline(state, lanterns, away);
    if (r.earned > 0.5) showAway(r);
  }
  goTitle();
}

// --- screens --------------------------------------------------------------

const SCREENS = ['s-title', 's-tend', 's-over', 's-dawn'];
function show(id) {
  for (const s of SCREENS) $('#' + s).classList.toggle('hidden', s !== id);
  $('#hud').classList.toggle('hidden', id !== null);
}

function goTitle() {
  phase = 'title';
  run = null;
  lock = null;
  show('s-title');
  $('#hud').classList.add('hidden');
  paintTitle();
  save();
}

function paintTitle() {
  const lit = lanterns.filter((l) => l.charge > 0.01).length;
  $('#t-lumens').textContent = fmt(state.lumens);
  $('#t-rate').textContent =
    fmt(lanterns.reduce((s, l) => s + l.charge, 0) * Night.yieldRate(state)) + '/s';
  $('#t-embers').textContent = fmt(state.embers);
  $('#t-night').textContent = state.night;
  const pct = Math.round(Night.dawnProgress(lanterns) * 100);
  $('#t-dawnfill').style.width = pct + '%';
  $('#t-dawnlabel').textContent = `${pct}% TO DAWN · ${lit} LANTERNS LIT`;
  $('#t-dawnbtn').classList.toggle('hidden', !Night.canDawn(lanterns));
  const affordable = Night.UPGRADES.some((u) => {
    const c = Night.upgradeCost(state, u.id);
    return c !== null && state.lumens >= c;
  });
  $('#t-afford').textContent = affordable ? 'something is affordable' : '';
  $('#t-echo').textContent = state.echo
    ? `an echo of your last climb (${state.echo.depth}m) will climb beside you`
    : 'your next climb will be remembered as an echo';
}

function showAway(r) {
  $('#a-time').textContent = `Away ${fmtTime(r.away)} · the shaft burned for ${fmtTime(r.simulated)}`;
  $('#a-gain').textContent = fmt(r.earned) + ' lumens';
  $('#a-note').textContent = [
    r.capped ? 'Night Watch keeps it burning longer.' : '',
    `Offline runs at ${Math.round(r.efficiency * 100)}%.`,
    'The dark was eating the whole time — that is why it is not more.',
  ].join(' ');
  $('#away').classList.remove('hidden');
}

function toast(text, ms = 2400) {
  const el = $('#toast');
  el.textContent = text;
  el.classList.remove('hidden');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.classList.add('hidden'), ms);
}

// --- the climb ------------------------------------------------------------

function startRun() {
  const motes = Sim.seedMotes(lanterns, state.seed ^ (state.runs * 7919));
  run = Sim.newRun(lanterns, motes, Night.runBonuses(state));
  run.locksPicked = 0;
  echoRun = state.echo
    ? Sim.newRun(lanterns, [], { ...Night.runBonuses(state), embersMult: 1 })
    : null;
  phase = 'climb';
  held = false;
  show(null);
  $('#hud').classList.remove('hidden');
  $('#h-hint').style.opacity = state.runs < 3 ? '1' : '0';
}

function endRun() {
  phase = 'over';
  const sum = Sim.runSummary(run);
  state.runs++;
  state.bestDepth = Math.max(state.bestDepth, sum.depth);
  const echo = Night.makeEcho(run, sum);
  if (echo && (!state.echo || echo.banked >= state.echo.banked)) state.echo = echo;

  $('#o-cause').textContent = sum.cause === 'wall' ? 'YOU CLIPPED THE WALL' : 'THE DARK TOOK YOU';
  $('#o-depth').textContent = sum.depth + 'm';
  $('#o-banked').textContent = sum.banked;
  $('#o-chain').textContent = sum.combo;
  $('#o-locks').textContent = run.locksPicked;
  $('#o-acc').textContent = Math.round(sum.accuracy * 100) + '%';
  const lit = lanterns.filter((l) => l.charge > 0.01).length;
  $('#o-note').textContent = `${lit} lanterns are burning now — they will earn while you are gone.`;
  show('s-over');
  $('#hud').classList.add('hidden');
  save();
}

function openLock(lantern) {
  const rng = makeRng(lantern.lock);
  const puzzle = Puz.generateEngine(rng, 1 + Math.min(3, Math.floor(lantern.id / 8)));
  if (!puzzle) {
    Sim.unseal(run, lantern);
    return;
  }
  // Skeleton Key: start some pieces already correct.
  const help = Night.level(state, 'pick');
  if (help > 0) {
    const answer = Puz.solve(puzzle.grid, puzzle.emitter);
    if (answer) {
      const movable = [];
      puzzle.grid.forEach((c, i) => {
        if (!c.fixed && Puz.ROTATABLE.has(c.kind)) movable.push(i);
      });
      movable.slice(0, help).forEach((i, k) => (puzzle.grid[i].rot = answer.rotations[k]));
    }
  }
  lock = { ...puzzle, lantern, moves: 0, mode: 'lock' };
}

function tapLock(px, py) {
  const box = lockBox();
  const cell = box.size / Puz.N;
  const x = Math.floor((px - box.x) / cell);
  const y = Math.floor((py - box.y) / cell);
  if (x < 0 || y < 0 || x >= Puz.N || y >= Puz.N) {
    if (lock.mode === 'tune') {
      save();
      lock = null;
      paintTend();
      return;
    }
    Sim.abandonLock(run);
    lock = null;
    toast('left it sealed — the dark kept climbing');
    return;
  }
  if (!Puz.rotate(lock.grid, x, y)) return;
  lock.moves++;
  if (lock.mode === 'tune') {
    // 2x4 — tuning is live: the yield is whatever the beam is doing now.
    applyBoard(lock.lantern, lock);
    return;
  }
  if (Puz.isSolved(lock.grid, lock.emitter)) {
    Sim.unseal(run, lock.lantern);
    applyBoard(lock.lantern, lock);
    run.locksPicked++;
    flash = 1;
    burst(lock.lantern.x, lock.lantern.y, 26, '#ffe3a3');
    toast(`picked in ${lock.moves} · now earning ×${lock.lantern.yieldMult.toFixed(2)}`);
    lock = null;
  }
}

/**
 * A lantern keeps the board it was unlocked with, and how well that board is
 * routed *is* its output per second. You do not buy a better lantern here —
 * you route it better.
 */
function applyBoard(lantern, board) {
  lantern.board = { grid: board.grid.map((c) => ({ ...c })), emitter: board.emitter };
  lantern.yieldMult = Puz.scoreBoard(board.grid, board.emitter);
  lantern.yieldBest = board.best || Puz.bestScore(board.grid, board.emitter).score;
}

function openTuner(lantern) {
  if (!lantern.board) {
    const puzzle = Puz.generateEngine(makeRng(lantern.lock), 2);
    if (!puzzle) return;
    applyBoard(lantern, puzzle);
  }
  lock = {
    grid: lantern.board.grid,
    emitter: lantern.board.emitter,
    best: lantern.yieldBest,
    lantern,
    moves: 0,
    mode: 'tune',
  };
}

function lockBox() {
  const size = Math.min(VIEWW * 0.78, VIEWH * 0.44);
  return { x: (VIEWW - size) / 2, y: VIEWH * 0.26, size };
}

// --- loop -----------------------------------------------------------------

function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min((now - last) / 1000, 0.25);
  last = now;
  t += dt;
  shake = Math.max(0, shake - dt * 2.5);
  flash = Math.max(0, flash - dt * 2);

  if (document.hidden) return;

  if (phase === 'climb' && !lock) {
    acc += dt;
    let steps = 0;
    while (acc >= STEP && steps++ < 8) {
      acc -= STEP;
      Night.recordInput(run, held);
      for (const e of Sim.stepRun(run, STEP, held)) onEvent(e);
      if (echoRun && !echoRun.dead) {
        const eh = Night.echoHeld(state.echo, echoRun.time);
        for (const e of Sim.stepRun(echoRun, STEP, eh)) onEchoEvent(e);
      }
      if (run.picking) openLock(run.picking);
      if (run.dead) {
        endRun();
        break;
      }
    }
  } else {
    acc = 0;
    // Lanterns burn and decay in real time, wherever you are in the menus.
    Night.advance(state, lanterns, dt);
  }

  for (let i = parts.length - 1; i >= 0; i--) {
    const p = parts[i];
    p.life -= dt;
    if (p.life <= 0) {
      parts.splice(i, 1);
      continue;
    }
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vx *= 0.97;
    p.vy *= 0.97;
  }

  draw();
  if (phase === 'climb') paintHud();
  else if (phase === 'title' && Math.floor(t * 2) % 2 === 0) paintTitle();
}

function onEvent(e) {
  if (e.type === 'bank') {
    flash = 0.6;
    shake = 0.35;
    burst(e.x, e.y, 20, '#ffe3a3');
    toast(`+${e.motes} into the lantern${e.combo > 1 ? ` ·  chain ${e.combo}` : ''}`, 1400);
  } else if (e.type === 'perfect') burst(e.x, e.y, 8, '#8dffa8');
  else if (e.type === 'snap') {
    shake = 0.6;
    burst(e.x, e.y, 16, '#ff8f9b');
  } else if (e.type === 'mote') burst(e.x, e.y, 4, '#ffd98a');
  else if (e.type === 'death') {
    shake = 1;
    flash = 1;
    burst(run.player.x, run.player.y, 40, '#ff8f9b');
  }
}

function onEchoEvent(e) {
  // An echo's work counts, at half weight: it is a memory, not a person.
  if (e.type === 'bank') {
    const l = lanterns[e.lantern];
    if (l) l.charge = Math.min(4, l.charge + e.charge * Night.ECHO_WEIGHT);
    burst(e.x, e.y, 6, 'rgba(150,190,255,.8)');
  }
}

function burst(x, y, n, colour) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * TAU;
    const s = 60 + Math.random() * 180;
    parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 0.5 + Math.random() * 0.4, colour });
  }
}

function paintHud() {
  $('#h-depth').textContent = Math.floor(run.altitude / 10) + 'm';
  $('#h-carry').textContent = `${run.carry}/${Sim.CFG.carryCap + run.carryBonus}`;
  $('#h-combo').textContent = run.combo > 0 ? '×' + run.combo : '—';
  if (run.perfects > 0) $('#h-hint').style.opacity = '0';
}

// --- drawing --------------------------------------------------------------

let VIEWW = 540;
let VIEWH = 960;
let scale = 1;

function resize() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
  VIEWW = Sim.VIEW.W;
  VIEWH = Math.round(clamp((Sim.VIEW.W * rect.height) / Math.max(1, rect.width), 860, 1320));
  scale = (rect.width * dpr) / VIEWW;
  canvas.width = Math.round(VIEWW * scale);
  canvas.height = Math.round(VIEWH * scale);
}

function draw() {
  if (!scale) resize();
  g.setTransform(scale, 0, 0, scale, 0, 0);

  const cam = run && phase === 'climb' ? clamp(run.player.y - VIEWH * 0.4, run.darkY - 40, 1e9) : cameraIdle();
  const sy = (wy) => VIEWH - (wy - cam);

  const grad = g.createLinearGradient(0, 0, 0, VIEWH);
  grad.addColorStop(0, '#070a14');
  grad.addColorStop(1, '#120a18');
  g.fillStyle = grad;
  g.fillRect(0, 0, VIEWW, VIEWH);

  g.save();
  if (shake > 0) g.translate((Math.random() - 0.5) * shake * 16, (Math.random() - 0.5) * shake * 16);

  // walls
  for (const x of [0, VIEWW - Sim.WALL]) {
    const wg = g.createLinearGradient(x, 0, x + Sim.WALL, 0);
    const inner = x === 0 ? 1 : 0;
    wg.addColorStop(inner, 'rgba(255,140,90,.5)');
    wg.addColorStop(1 - inner, 'rgba(255,140,90,.03)');
    g.fillStyle = wg;
    g.fillRect(x, 0, Sim.WALL, VIEWH);
  }

  // lanterns
  for (const l of lanterns) {
    const y = sy(l.y);
    if (y < -220 || y > VIEWH + 220) continue;
    const lit = l.charge;
    if (lit > 0.01) {
      const r = 60 + lit * 90;
      const halo = g.createRadialGradient(l.x, y, 0, l.x, y, r);
      halo.addColorStop(0, `rgba(255,200,120,${Math.min(0.5, 0.16 + lit * 0.2)})`);
      halo.addColorStop(1, 'rgba(255,200,120,0)');
      g.fillStyle = halo;
      g.fillRect(l.x - r, y - r, r * 2, r * 2);
    }
    g.strokeStyle = l.sealed ? 'rgba(150,160,200,.5)' : `rgba(255,217,138,${0.45 + Math.min(0.5, lit * 0.4)})`;
    g.lineWidth = 3;
    g.beginPath();
    g.arc(l.x, y, 16, 0, TAU);
    g.stroke();
    if (l.sealed) {
      g.strokeStyle = 'rgba(150,160,200,.7)';
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(l.x - 7, y);
      g.lineTo(l.x + 7, y);
      g.moveTo(l.x, y - 7);
      g.lineTo(l.x, y + 7);
      g.stroke();
    } else {
      g.fillStyle = `rgba(255,243,207,${0.35 + Math.min(0.65, lit * 0.5)})`;
      g.beginPath();
      g.arc(l.x, y, 6 + Math.min(6, lit * 4), 0, TAU);
      g.fill();
    }
    if (run && run.candidate === l && !run.tether) {
      g.strokeStyle = `rgba(255,255,255,${0.4 + Math.sin(t * 9) * 0.25})`;
      g.lineWidth = 2;
      g.beginPath();
      g.arc(l.x, y, 26, 0, TAU);
      g.stroke();
    }
  }

  if (run && phase === 'climb') {
    for (const m of run.motes) {
      if (m.taken) continue;
      const y = sy(m.y);
      if (y < -20 || y > VIEWH + 20) continue;
      g.fillStyle = '#ffe9b8';
      g.beginPath();
      g.arc(m.x, y + Math.sin(t * 3 + m.id) * 2, 3.4, 0, TAU);
      g.fill();
    }

    if (echoRun && !echoRun.dead) {
      g.fillStyle = 'rgba(150,190,255,.5)';
      g.beginPath();
      g.arc(echoRun.player.x, sy(echoRun.player.y), 8, 0, TAU);
      g.fill();
    }

    if (run.tether) {
      const l = run.tether.lantern;
      const ly = sy(l.y);
      g.strokeStyle = 'rgba(255,217,138,.85)';
      g.lineWidth = 2.5;
      g.beginPath();
      g.moveTo(l.x, ly);
      g.lineTo(run.player.x, sy(run.player.y));
      g.stroke();
      g.strokeStyle = 'rgba(255,255,255,.12)';
      g.lineWidth = 1.5;
      g.beginPath();
      g.arc(l.x, ly, run.tether.radius, 0, TAU);
      g.stroke();

      const sweet = Sim.releaseAngleFor(l, run.tether.radius, run.tether.dir, l.nextX, l.nextY);
      arc(l.x, ly, run.tether.radius, sweet - Sim.CFG.sweetHalf, sweet + Sim.CFG.sweetHalf, '#8dffa8', 7);
      const frac = clamp(run.tether.turns / Sim.CFG.player.maxTurns, 0, 1);
      arc(l.x, ly, run.tether.radius + 12, run.tether.angle, run.tether.angle + TAU * (1 - frac),
        frac > 0.75 ? '#ff8f9b' : 'rgba(255,255,255,.45)', 3);
    }

    // player
    const py = sy(run.player.y);
    const load = run.carry / (Sim.CFG.carryCap + run.carryBonus);
    const r = 9 + load * 6;
    const halo = g.createRadialGradient(run.player.x, py, 0, run.player.x, py, 40 + load * 60);
    halo.addColorStop(0, `rgba(255,200,120,${0.4 + load * 0.4})`);
    halo.addColorStop(1, 'rgba(255,150,60,0)');
    g.fillStyle = halo;
    const rr = 40 + load * 60;
    g.fillRect(run.player.x - rr, py - rr, rr * 2, rr * 2);
    g.fillStyle = '#fff6df';
    g.beginPath();
    g.arc(run.player.x, py, r, 0, TAU);
    g.fill();

    // the dark
    const dy = sy(run.darkY);
    if (dy < VIEWH + 60) {
      const dg = g.createLinearGradient(0, dy - 70, 0, VIEWH);
      dg.addColorStop(0, 'rgba(20,0,30,0)');
      dg.addColorStop(0.3, 'rgba(30,0,40,.7)');
      dg.addColorStop(1, 'rgba(10,0,16,.99)');
      g.fillStyle = dg;
      g.fillRect(0, dy - 70, VIEWW, VIEWH - dy + 70);
      g.strokeStyle = 'rgba(160,110,255,.5)';
      g.lineWidth = 2;
      g.beginPath();
      for (let x = 0; x <= VIEWW; x += 20) {
        const wy = dy + Math.sin(x * 0.05 + t * 4) * 5;
        x === 0 ? g.moveTo(x, wy) : g.lineTo(x, wy);
      }
      g.stroke();
    }
  }

  for (const p of parts) {
    g.globalAlpha = clamp(p.life, 0, 1);
    g.fillStyle = p.colour;
    g.beginPath();
    g.arc(p.x, sy(p.y), 2.6, 0, TAU);
    g.fill();
  }
  g.globalAlpha = 1;
  g.restore();

  if (lock) drawLock();

  if (flash > 0) {
    g.fillStyle = `rgba(255,220,150,${flash * 0.3})`;
    g.fillRect(0, 0, VIEWW, VIEWH);
  }
  const vig = g.createRadialGradient(VIEWW / 2, VIEWH / 2, VIEWH * 0.3, VIEWW / 2, VIEWH / 2, VIEWH * 0.78);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(0,0,0,.6)');
  g.fillStyle = vig;
  g.fillRect(0, 0, VIEWW, VIEWH);
}

function cameraIdle() {
  const lit = lanterns.filter((l) => l.charge > 0.01);
  const focus = lit.length ? lit[lit.length - 1] : lanterns[0];
  return focus.y - VIEWH * 0.5 + Math.sin(t * 0.3) * 40;
}

function arc(cx, cy, r, a0, a1, colour, width) {
  g.save();
  g.strokeStyle = colour;
  g.lineWidth = width;
  g.lineCap = 'round';
  g.beginPath();
  for (let i = 0; i <= 24; i++) {
    const a = a0 + ((a1 - a0) * i) / 24;
    const x = cx + Math.cos(a) * r;
    const y = cy - Math.sin(a) * r;
    i === 0 ? g.moveTo(x, y) : g.lineTo(x, y);
  }
  g.stroke();
  g.restore();
}

function drawLock() {
  const box = lockBox();
  const cell = box.size / Puz.N;
  g.fillStyle = 'rgba(4,6,14,.9)';
  g.fillRect(0, 0, VIEWW, VIEWH);

  const tuning = lock.mode === 'tune';
  g.fillStyle = '#ffe3a3';
  g.font = '800 15px system-ui, sans-serif';
  g.textAlign = 'center';
  g.fillText(tuning ? 'ROUTE THE LANTERN' : 'THE LANTERN IS SEALED', VIEWW / 2, box.y - 46);
  g.fillStyle = 'rgba(240,236,221,.6)';
  g.font = '400 12px system-ui, sans-serif';
  if (tuning) {
    const now = Puz.scoreBoard(lock.grid, lock.emitter);
    g.fillText(
      `earning ×${now.toFixed(2)} per second · best routing found is ×${(lock.best || now).toFixed(2)}`,
      VIEWW / 2, box.y - 24,
    );
    g.fillText('tap outside when you are happy with it', VIEWW / 2, box.y + box.size + 28);
  } else {
    g.fillText(`light the lantern to unseal it · ${lock.par} turns is enough`, VIEWW / 2, box.y - 24);
    g.fillStyle = 'rgba(255,150,150,.75)';
    g.fillText('the dark is still rising while you think', VIEWW / 2, box.y + box.size + 28);
  }

  g.strokeStyle = 'rgba(255,196,107,.25)';
  g.lineWidth = 1;
  g.strokeRect(box.x, box.y, box.size, box.size);

  const result = Puz.trace(lock.grid, lock.emitter);
  g.save();
  g.globalCompositeOperation = 'lighter';
  g.strokeStyle = 'rgba(255,210,130,.8)';
  g.lineWidth = 5;
  g.lineCap = 'round';
  for (const s of result.segments) {
    g.beginPath();
    g.moveTo(box.x + (s.x1 + 0.5) * cell, box.y + (s.y1 + 0.5) * cell);
    g.lineTo(box.x + (s.x2 + 0.5) * cell, box.y + (s.y2 + 0.5) * cell);
    g.stroke();
  }
  g.restore();

  for (let y = 0; y < Puz.N; y++) {
    for (let x = 0; x < Puz.N; x++) {
      const c = lock.grid[Puz.idx(x, y)];
      const cx = box.x + (x + 0.5) * cell;
      const cy = box.y + (y + 0.5) * cell;
      const r = cell * 0.3;
      if (c.kind === Puz.KIND.MIRROR || c.kind === Puz.KIND.SPLITTER) {
        const slash = c.rot % 2 === 0;
        g.strokeStyle = c.fixed ? 'rgba(160,170,200,.55)' : '#dceaff';
        g.lineWidth = c.kind === Puz.KIND.SPLITTER ? 3 : 5;
        if (c.kind === Puz.KIND.SPLITTER) g.setLineDash([6, 5]);
        g.beginPath();
        g.moveTo(cx - r, cy + (slash ? r : -r));
        g.lineTo(cx + r, cy + (slash ? -r : r));
        g.stroke();
        g.setLineDash([]);
      } else if (c.kind === Puz.KIND.BLOCKER) {
        g.fillStyle = 'rgba(40,46,74,.95)';
        g.fillRect(cx - r, cy - r, r * 2, r * 2);
      } else if (c.kind === Puz.KIND.EMITTER) {
        g.fillStyle = '#6fe4ff';
        g.beginPath();
        g.arc(cx, cy, r * 0.6, 0, TAU);
        g.fill();
      } else if (c.kind === Puz.KIND.LANTERN) {
        const litCell = result.lit.has(Puz.idx(x, y));
        g.strokeStyle = litCell ? '#ffd98a' : 'rgba(160,180,220,.4)';
        g.lineWidth = 3;
        g.beginPath();
        g.arc(cx, cy, r * 0.8, 0, TAU);
        g.stroke();
        if (litCell) {
          g.fillStyle = '#fff3cf';
          g.beginPath();
          g.arc(cx, cy, r * 0.4, 0, TAU);
          g.fill();
        }
      }
    }
  }
}

// --- input ----------------------------------------------------------------

function toView(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((e.clientX - rect.left) / rect.width) * VIEWW,
    y: ((e.clientY - rect.top) / rect.height) * VIEWH,
  };
}

canvas.addEventListener('pointerdown', (e) => {
  if (lock) {
    const p = toView(e);
    tapLock(p.x, p.y);
    return;
  }
  held = true;
});
window.addEventListener('pointerup', () => (held = false));
window.addEventListener('pointercancel', () => (held = false));
window.addEventListener('blur', () => (held = false));
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !e.repeat) {
    e.preventDefault();
    held = true;
  }
});
window.addEventListener('keyup', (e) => {
  if (e.code === 'Space') held = false;
});

// --- buttons --------------------------------------------------------------

document.addEventListener('click', (e) => {
  const a = e.target.closest('[data-a]')?.dataset.a;
  if (!a) return;
  if (a === 'climb') startRun();
  if (a === 'home') goTitle();
  if (a === 'close-away') $('#away').classList.add('hidden');
  if (a === 'tend') {
    phase = 'tend';
    show('s-tend');
    $('#hud').classList.add('hidden');
    paintTend();
  }
  if (a === 'dawn') {
    const gain = Night.breakDawn(state);
    lanterns = Sim.buildShaft(state.seed);
    $('#w-line').textContent =
      `night ${state.night - 1} is over · +${gain} embers · everything burns ×${Night.embersMultiplier(state.embers).toFixed(2)} from now on`;
    show('s-dawn');
    save();
  }
});

function paintTend() {
  $('#d-lumens').textContent = fmt(state.lumens);
  $('#d-rate').textContent = fmt(Night.shaftRate(state, lanterns)) + '/s';
  $('#d-lit').textContent = lanterns.filter((l) => l.charge > 0.01).length;
  const list = $('#upgrades');
  list.innerHTML = '';

  const machines = lanterns.filter((l) => !l.sealed && l.charge > 0.01);
  if (machines.length) {
    const head = document.createElement('p');
    head.className = 'tag';
    head.textContent = 'YOUR LANTERNS — tap one to re-route its beam';
    list.appendChild(head);
    for (const l of machines.slice(0, 12)) {
      const gap = (l.yieldBest || 1) - (l.yieldMult || 1);
      const row = document.createElement('div');
      row.className = `card ${gap > 0.05 ? 'ready' : ''}`;
      row.innerHTML = `<div><b>Lantern ${l.id}</b><span>charge ${l.charge.toFixed(2)} · routed ×${(
        l.yieldMult || 1
      ).toFixed(2)}${gap > 0.05 ? ` · ×${l.yieldBest.toFixed(2)} is possible` : ' · best known'}</span></div>
        <button>ROUTE</button>`;
      row.querySelector('button').addEventListener('click', () => {
        openTuner(l);
      });
      list.appendChild(row);
    }
    const head2 = document.createElement('p');
    head2.className = 'tag';
    head2.textContent = 'UPGRADES';
    list.appendChild(head2);
  }
  for (const u of Night.UPGRADES) {
    const lvl = Night.level(state, u.id);
    const cost = Night.upgradeCost(state, u.id);
    const can = cost !== null && state.lumens >= cost;
    const row = document.createElement('div');
    row.className = `card ${cost === null ? 'maxed' : can ? 'ready' : ''}`;
    row.innerHTML = `<div><b>${u.name} <span>${lvl}/${u.levels}</span></b><span>${u.blurb}</span></div>
      <button ${can ? '' : 'disabled'}>${cost === null ? 'MAXED' : fmt(cost)}</button>`;
    row.querySelector('button').addEventListener('click', () => {
      if (Night.buyUpgrade(state, u.id)) {
        toast(`${u.name} ${Night.level(state, u.id)}`);
        save();
        paintTend();
      }
    });
    list.appendChild(row);
  }
}

window.addEventListener('resize', resize);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) save();
  else last = performance.now();
});
window.addEventListener('beforeunload', save);
setInterval(save, 15000);

window.__lumenfall = {
  get state() { return state; },
  get run() { return run; },
  get lock() { return lock; },
  get lanterns() { return lanterns; },
  Sim, Night, Puz,
  S: Sim, N: Night, P: Puz,
  setHeld: (v) => (held = v),
};

resize();
boot();
requestAnimationFrame(frame);
