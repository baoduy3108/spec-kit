// The sheet: everything the player actually touches.
//
// The house is drawn as a surveyor's plan, because that is what the game is —
// you are reading a floor plan and deciding where to be. Two things are drawn
// that most stealth games hide: the cone each guard will look down *next*
// turn, and the tiles the house has noticed you wearing out. Neither is a
// hint. They are the whole negotiation: the house shows you what it has
// learned about you, and dares you to keep doing it.

import {
  DAWN,
  DIRS,
  H,
  TILE,
  W,
  at,
  buildHouse,
  isHidden,
  makeRng,
  newHeist,
  previewGuard,
  sightOf,
  step,
} from './house.js';
import { adapt, newMemory, predictability, remember, wornTiles } from './memory.js';
import { langNow, noteText, otherLang, setLang, t } from './text.js';

const SAVE_KEY = 'thief.house.v2';
const LANG_KEY = 'thief.lang';
const SIZE = 620;
const MARGIN = 16;
const CELL = (SIZE - MARGIN * 2) / W;

const ink = '#dce9f5';
const dim = '#6d8ba8';
const hot = '#ff6b5e';
const gold = '#e8c37a';

const el = (id) => document.getElementById(id);
const plan = el('plan');
// Drawn at a fixed 620×620 grid and scaled by CSS; on a dense screen the
// backing store is enlarged once, here, so the thin ink lines stay thin.
const scale = Math.min(2, devicePixelRatio || 1);
plan.width = SIZE * scale;
plan.height = SIZE * scale;
const g = plan.getContext('2d');
g.scale(scale, scale);

// --- state ----------------------------------------------------------------

const game = {
  house: null,
  memory: null,
  heist: null,
  night: 1,
  phase: 'choose', // 'choose' | 'play' | 'over'
  rng: makeRng(Date.now() & 0xffff),
  tips: [],
  /** Smoothed positions, so a turn reads as a step rather than a teleport. */
  view: { px: 0, py: 0, guards: [] },
  time: 0,
  shake: 0,
  /** The last finished night, kept so switching language redraws the card. */
  last: null,
};

function freshHouse(seed) {
  game.house = buildHouse(seed);
  game.memory = newMemory();
  game.night = 1;
}

// --- persistence ----------------------------------------------------------
// A house that forgets you overnight is not the game. Everything it has
// learned survives the tab closing.

function save() {
  const h = game.house;
  const m = game.memory;
  try {
    localStorage.setItem(
      SAVE_KEY,
      JSON.stringify({
        seed: h.seed,
        tiles: [...h.tiles],
        doors: h.doors,
        vault: h.vault,
        guards: h.guards,
        lamps: h.lamps,
        locked: h.locked,
        night: game.night,
        memory: {
          tiles: [...m.tiles],
          doors: [...m.doors],
          shadows: [...m.shadows],
          attempts: m.attempts,
          escapes: m.escapes,
          caught: m.caught,
          lengths: m.lengths,
        },
      }),
    );
  } catch (_) {
    /* private mode: the house just has a short memory today */
  }
}

function load() {
  let raw = null;
  try {
    raw = localStorage.getItem(SAVE_KEY);
  } catch (_) {
    return false;
  }
  if (!raw) return false;
  try {
    const s = JSON.parse(raw);
    game.house = {
      seed: s.seed,
      tiles: s.tiles,
      doors: s.doors,
      vault: s.vault,
      guards: s.guards,
      lamps: s.lamps || [],
      locked: s.locked || [],
      notes: [],
    };
    const m = newMemory();
    m.tiles = new Map(s.memory.tiles);
    m.doors = new Map(s.memory.doors);
    m.shadows = new Map(s.memory.shadows);
    m.attempts = s.memory.attempts;
    m.escapes = s.memory.escapes;
    m.caught = s.memory.caught;
    m.lengths = s.memory.lengths;
    game.memory = m;
    game.night = s.night || 1;
    return true;
  } catch (_) {
    return false;
  }
}

// --- the static layer -----------------------------------------------------
// Walls, shadows, doors, the vault, the lamps and the worn carpet only change
// between nights, so they are drawn once onto their own canvas.

const paper = document.createElement('canvas');
paper.width = paper.height = SIZE;
const pg = paper.getContext('2d');

const hatchTile = document.createElement('canvas');
hatchTile.width = hatchTile.height = 8;
{
  const c = hatchTile.getContext('2d');
  c.strokeStyle = 'rgba(220,233,245,.30)';
  c.lineWidth = 1;
  c.beginPath();
  c.moveTo(-2, 6);
  c.lineTo(6, -2);
  c.moveTo(2, 10);
  c.lineTo(10, 2);
  c.stroke();
}
const hatch = pg.createPattern(hatchTile, 'repeat');

const cx = (x) => MARGIN + x * CELL;
const cy = (y) => MARGIN + y * CELL;
const mid = (v) => MARGIN + v * CELL + CELL / 2;

function restage() {
  const house = game.house;
  pg.clearRect(0, 0, SIZE, SIZE);

  // walls
  pg.fillStyle = hatch;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (house.tiles[at(x, y)] !== TILE.WALL) continue;
      pg.fillRect(cx(x), cy(y), CELL, CELL);
    }
  }
  // ...outlined only where they meet open floor, so the plan reads as rooms
  pg.strokeStyle = 'rgba(220,233,245,.55)';
  pg.lineWidth = 1.4;
  pg.beginPath();
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (house.tiles[at(x, y)] !== TILE.WALL) continue;
      for (const d of DIRS) {
        const nx = x + d.dx;
        const ny = y + d.dy;
        const outside = nx < 0 || ny < 0 || nx >= W || ny >= H;
        if (!outside && house.tiles[at(nx, ny)] === TILE.WALL) continue;
        if (outside) continue;
        const x0 = cx(x) + (d.dx > 0 ? CELL : 0) + (d.dy ? 0 : 0);
        const y0 = cy(y) + (d.dy > 0 ? CELL : 0);
        if (d.dy) {
          pg.moveTo(cx(x), y0);
          pg.lineTo(cx(x) + CELL, y0);
        } else {
          pg.moveTo(x0, cy(y));
          pg.lineTo(x0, cy(y) + CELL);
        }
      }
    }
  }
  pg.stroke();

  // shadows: stippled, the way a draughtsman shades
  pg.fillStyle = 'rgba(109,139,168,.55)';
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (house.tiles[at(x, y)] !== TILE.SHADOW) continue;
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          const px = cx(x) + 7 + i * 8 + ((j % 2) * 4);
          const py = cy(y) + 8 + j * 8;
          pg.fillRect(px, py, 1.5, 1.5);
        }
      }
    }
  }

  // worn carpet: the tiles the house has noticed under your feet
  for (const tile of wornTiles(game.memory, 12)) {
    const a = Math.min(0.4, 0.08 + tile.count * 0.05);
    pg.strokeStyle = `rgba(232,195,122,${a})`;
    pg.lineWidth = 1;
    pg.setLineDash([2, 3]);
    pg.strokeRect(cx(tile.x) + 5, cy(tile.y) + 5, CELL - 10, CELL - 10);
    pg.setLineDash([]);
  }

  // lamps
  for (const key of house.lamps) {
    const [lx, ly] = key.split(',').map(Number);
    pg.strokeStyle = 'rgba(232,195,122,.75)';
    pg.lineWidth = 1.2;
    pg.beginPath();
    pg.arc(mid(lx), mid(ly), 7, 0, Math.PI * 2);
    pg.stroke();
    pg.beginPath();
    for (let k = 0; k < 8; k++) {
      const a = (k / 8) * Math.PI * 2;
      pg.moveTo(mid(lx) + Math.cos(a) * 10, mid(ly) + Math.sin(a) * 10);
      pg.lineTo(mid(lx) + Math.cos(a) * 14, mid(ly) + Math.sin(a) * 14);
    }
    pg.stroke();
  }

  // the vault
  const v = house.vault;
  pg.strokeStyle = gold;
  pg.lineWidth = 1.6;
  pg.strokeRect(cx(v.x) + 6, cy(v.y) + 6, CELL - 12, CELL - 12);
  pg.beginPath();
  pg.arc(mid(v.x), mid(v.y), CELL * 0.2, 0, Math.PI * 2);
  pg.stroke();
  pg.beginPath();
  pg.moveTo(mid(v.x), mid(v.y));
  pg.lineTo(mid(v.x) + CELL * 0.2, mid(v.y) - CELL * 0.1);
  pg.stroke();

  // doors, with their swing
  for (const d of house.doors) {
    const locked = house.locked.includes(`${d.x},${d.y}`);
    pg.strokeStyle = locked ? hot : ink;
    pg.lineWidth = 1.6;
    pg.beginPath();
    pg.arc(mid(d.x), mid(d.y), CELL * 0.36, 0, Math.PI * 2);
    pg.stroke();
    if (locked) {
      pg.beginPath();
      pg.moveTo(mid(d.x) - 8, mid(d.y) - 8);
      pg.lineTo(mid(d.x) + 8, mid(d.y) + 8);
      pg.moveTo(mid(d.x) + 8, mid(d.y) - 8);
      pg.lineTo(mid(d.x) - 8, mid(d.y) + 8);
      pg.stroke();
    }
  }
}

// --- the moving layer -----------------------------------------------------

function coneOf(house, guard, ghost) {
  return { now: sightOf(house, guard), next: sightOf(house, ghost) };
}

function paintCone(cells, fill, dash) {
  g.fillStyle = fill;
  g.strokeStyle = fill;
  g.lineWidth = 1;
  g.setLineDash(dash);
  for (const c of cells) {
    g.fillRect(cx(c.x) + 1, cy(c.y) + 1, CELL - 2, CELL - 2);
    g.strokeRect(cx(c.x) + 1.5, cy(c.y) + 1.5, CELL - 3, CELL - 3);
  }
  g.setLineDash([]);
}

function draw() {
  const house = game.house;
  g.clearRect(0, 0, SIZE, SIZE);
  g.save();
  if (game.shake > 0) {
    g.translate((Math.random() - 0.5) * game.shake, (Math.random() - 0.5) * game.shake);
  }
  g.drawImage(paper, 0, 0);

  // where they are looking, and where they will look
  for (let i = 0; i < house.guards.length; i++) {
    const guard = house.guards[i];
    const ghost = previewGuard(house, guard);
    const cone = coneOf(house, guard, ghost);
    paintCone(cone.next, 'rgba(255,107,94,.07)', [2, 4]);
    paintCone(cone.now, 'rgba(255,107,94,.16)', []);
    const v = game.view.guards[i] || { x: guard.x, y: guard.y };

    // the guard: a filled block with a tick for the way they face
    const gx = MARGIN + v.x * CELL + CELL / 2;
    const gy = MARGIN + v.y * CELL + CELL / 2;
    g.fillStyle = hot;
    g.fillRect(gx - CELL * 0.19, gy - CELL * 0.19, CELL * 0.38, CELL * 0.38);
    const d = DIRS[guard.dir];
    g.strokeStyle = hot;
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(gx + d.dx * CELL * 0.19, gy + d.dy * CELL * 0.19);
    g.lineTo(gx + d.dx * CELL * 0.36, gy + d.dy * CELL * 0.36);
    g.stroke();

    // the step they are about to take
    if (ghost.x !== guard.x || ghost.y !== guard.y) {
      g.strokeStyle = 'rgba(255,107,94,.5)';
      g.lineWidth = 1;
      g.setLineDash([2, 3]);
      g.strokeRect(cx(ghost.x) + CELL * 0.3, cy(ghost.y) + CELL * 0.3, CELL * 0.4, CELL * 0.4);
      g.setLineDash([]);
    }
  }

  if (game.phase === 'choose') {
    drawDoorChoice();
    g.restore();
    return;
  }

  // the way you have come tonight
  const heist = game.heist;
  if (heist && heist.trail.length > 1) {
    g.strokeStyle = 'rgba(220,233,245,.28)';
    g.lineWidth = 1.4;
    g.setLineDash([3, 4]);
    g.beginPath();
    heist.trail.forEach((p, i) => {
      const px = mid(p.x);
      const py = mid(p.y);
      if (i === 0) g.moveTo(px, py);
      else g.lineTo(px, py);
    });
    g.stroke();
    g.setLineDash([]);
  }

  // you
  const px = MARGIN + game.view.px * CELL + CELL / 2;
  const py = MARGIN + game.view.py * CELL + CELL / 2;
  const hidden = heist && isHidden(house, heist.x, heist.y);
  g.strokeStyle = ink;
  g.lineWidth = 2;
  g.beginPath();
  g.arc(px, py, CELL * 0.26, 0, Math.PI * 2);
  g.stroke();
  g.fillStyle = ink;
  g.beginPath();
  g.arc(px, py, CELL * 0.1, 0, Math.PI * 2);
  g.fill();
  if (hidden) {
    // in shadow you are a dotted outline: present, unseen
    g.strokeStyle = 'rgba(220,233,245,.4)';
    g.setLineDash([2, 3]);
    g.beginPath();
    g.arc(px, py, CELL * 0.38, 0, Math.PI * 2);
    g.stroke();
    g.setLineDash([]);
  }
  if (heist && heist.carrying) {
    g.fillStyle = gold;
    g.fillRect(px - 4, py - 4, 8, 8);
  }
  g.restore();
}

function drawDoorChoice() {
  const pulse = 0.5 + 0.5 * Math.sin(game.time * 3);
  game.house.doors.forEach((d, i) => {
    const locked = game.house.locked.includes(`${d.x},${d.y}`);
    g.strokeStyle = locked ? 'rgba(255,107,94,.5)' : ink;
    g.lineWidth = locked ? 1 : 1.5 + pulse;
    g.beginPath();
    g.arc(mid(d.x), mid(d.y), CELL * (0.5 + pulse * 0.12), 0, Math.PI * 2);
    g.stroke();
    g.fillStyle = locked ? 'rgba(255,107,94,.5)' : ink;
    g.font = 'bold 15px ui-monospace, monospace';
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    const inward = { x: d.x === 0 ? 1 : d.x === W - 1 ? -1 : 0, y: d.y === 0 ? 1 : -1 };
    g.fillText(String(i + 1), mid(d.x) + inward.x * CELL * 0.9, mid(d.y) + inward.y * CELL * 0.9);
  });
}

// --- the loop -------------------------------------------------------------

let last = 0;
function frame(now) {
  requestAnimationFrame(frame);
  if (document.hidden) return;
  const dt = Math.min(0.05, (now - last) / 1000 || 0);
  last = now;
  game.time += dt;
  game.shake = Math.max(0, game.shake - dt * 22);

  // ease everything towards where it really is
  const k = 1 - Math.exp(-dt * 18);
  if (game.heist) {
    game.view.px += (game.heist.x - game.view.px) * k;
    game.view.py += (game.heist.y - game.view.py) * k;
  }
  game.house.guards.forEach((guard, i) => {
    const v = game.view.guards[i] || (game.view.guards[i] = { x: guard.x, y: guard.y });
    v.x += (guard.x - v.x) * k;
    v.y += (guard.y - v.y) * k;
  });
  draw();
}

// --- turns ----------------------------------------------------------------

function play(move) {
  if (game.phase !== 'play') return;
  const events = step(game.heist, move);
  for (const e of events) {
    if (e.type === 'blocked') {
      game.shake = 3;
      say('tip.blocked');
    }
    if (e.type === 'took') say('tip.took');
    if (e.type === 'caught') game.shake = 12;
    if (e.type === 'dawn') game.shake = 6;
  }
  if (game.heist.over) endNight();
  else tick();
  refresh();
}

function tick() {
  const heist = game.heist;
  const house = game.house;
  if (game.night === 1 && heist.turn === 1) {
    say('tip.vault');
  }
  if (house.tiles[at(heist.x, heist.y)] === TILE.DOOR) {
    once('tip.door');
  }
  if (house.tiles[at(heist.x, heist.y)] === TILE.SHADOW) {
    once('tip.shadow');
  }
}

const taught = new Set();
/** A thing worth saying exactly once, ever. Repeating it is nagging. */
function once(key, params) {
  if (taught.has(key)) return;
  taught.add(key);
  say(key, params);
}

function endNight() {
  const heist = game.heist;
  game.phase = 'over';
  remember(game.memory, heist);
  const notes = adapt(game.house, game.memory, game.rng);
  game.night++;
  restage();
  save();

  const won = heist.over === 'escaped';
  game.last = {
    won,
    dawn: heist.turn >= DAWN && !won,
    night: game.night - 1,
    turn: heist.turn,
    door: heist.doorUsed,
    notes: notes.length ? notes : [{ id: 'none' }],
  };
  showResult();
  el('modal').classList.remove('hidden');
}

/** Paint the night-just-ended card. Called again whenever language changes. */
function showResult() {
  const r = game.last;
  if (!r) return;
  const state = r.won ? 'escaped' : r.dawn ? 'dawn' : 'caught';
  el('m-kicker').textContent = r.won
    ? t('kick.night', { night: r.night })
    : t(r.dawn ? 'kick.dawn' : 'kick.caught');
  el('m-title').textContent = t(`head.${state}`);
  el('m-body').textContent = t(`body.${state}`, { turn: r.turn, door: r.door, dawn: DAWN });
  const list = el('m-notes');
  list.innerHTML = '';
  for (const note of r.notes) {
    const li = document.createElement('li');
    li.textContent = noteText(note);
    list.appendChild(li);
  }
}

function beginNight() {
  el('modal').classList.add('hidden');
  game.phase = 'choose';
  game.heist = null;
  restage();
  refresh();
  const open = game.house.doors.filter((d) => !game.house.locked.includes(`${d.x},${d.y}`));
  if (game.night === 1) {
    say('tip.choose');
    say('tip.cone');
  } else {
    say('tip.chooseN', { open: open.length });
  }
}

function enterBy(door) {
  if (game.house.locked.includes(`${door.x},${door.y}`)) {
    say('tip.locked', { door: door.key });
    return;
  }
  game.heist = newHeist(game.house, door);
  game.view.px = door.x;
  game.view.py = door.y;
  game.phase = 'play';
  say('tip.enter', { door: door.key });
  refresh();
}

// --- chrome ---------------------------------------------------------------

/** Tips are kept as { key, params }, so the language button rewrites them. */
function say(key, params) {
  // Never repeat something already on screen: three lines of the same warning
  // is nagging, not teaching.
  if (game.tips.some((tip) => tip.key === key)) return;
  game.tips.push({ key, params });
  if (game.tips.length > 3) game.tips.shift();
  drawTips();
}

function drawTips() {
  const box = el('notes');
  box.innerHTML = '';
  for (const tip of game.tips) {
    const div = document.createElement('div');
    div.textContent = t(tip.key, tip.params);
    box.appendChild(div);
  }
}

function refresh() {
  el('sub').textContent = t('sub', {
    seed: game.house.seed,
    night: game.night,
    turn: game.heist ? t('turnOf', { turn: game.heist.turn, dawn: DAWN }) : t('notIn'),
  });
  el('loot').textContent = String(game.memory.escapes);
  el('caught').textContent = String(game.memory.caught);
  el('pred').textContent = `${Math.round(predictability(game.memory) * 100)}%`;
}

/** Every word on the page, re-read in whichever language is on now. */
function relabel() {
  document.documentElement.lang = langNow();
  el('h-title').textContent = t('title');
  el('l-loot').textContent = t('loot');
  el('l-caught').textContent = t('caught');
  el('l-pred').textContent = t('pred');
  el('legend').textContent = t('legend');
  el('again').textContent = t('again');
  el('lang').textContent = otherLang().toUpperCase();
  document.title = t('title');
  drawTips();
  showResult();
  refresh();
}

el('lang').addEventListener('click', () => {
  setLang(otherLang());
  try {
    localStorage.setItem(LANG_KEY, langNow());
  } catch (_) {}
  relabel();
});

// --- input ----------------------------------------------------------------

const KEYS = {
  ArrowUp: 'north',
  ArrowDown: 'south',
  ArrowLeft: 'west',
  ArrowRight: 'east',
  w: 'north',
  s: 'south',
  a: 'west',
  d: 'east',
  ' ': 'wait',
  '.': 'wait',
};

addEventListener('keydown', (e) => {
  if (game.phase === 'over') {
    if (e.key === 'Enter' || e.key === ' ') beginNight();
    return;
  }
  if (game.phase === 'choose') {
    const n = Number(e.key);
    if (n >= 1 && n <= 3) enterBy(game.house.doors[n - 1]);
    return;
  }
  const move = KEYS[e.key] || KEYS[e.key.toLowerCase?.()];
  if (!move) return;
  e.preventDefault();
  play(move);
});

for (const button of document.querySelectorAll('#pad button')) {
  button.addEventListener('click', () => play(button.dataset.move));
}
document.querySelector('[data-act="again"]').addEventListener('click', beginNight);

plan.addEventListener('click', (e) => {
  const rect = plan.getBoundingClientRect();
  const gx = Math.floor((((e.clientX - rect.left) / rect.width) * SIZE - MARGIN) / CELL);
  const gy = Math.floor((((e.clientY - rect.top) / rect.height) * SIZE - MARGIN) / CELL);

  if (game.phase === 'choose') {
    const door = game.house.doors.find(
      (d) => Math.abs(d.x - gx) + Math.abs(d.y - gy) <= 1,
    );
    if (door) enterBy(door);
    return;
  }
  if (game.phase !== 'play') return;
  const dx = gx - game.heist.x;
  const dy = gy - game.heist.y;
  if (dx === 0 && dy === 0) return play('wait');
  const dir = DIRS.find((d) => d.dx === dx && d.dy === dy);
  if (dir) play(dir.name);
});

// --- start ----------------------------------------------------------------

// The language the player last chose, or the browser's own preference.
try {
  setLang(localStorage.getItem(LANG_KEY) || (navigator.language || '').slice(0, 2));
} catch (_) {
  setLang((navigator.language || '').slice(0, 2));
}

if (!load()) freshHouse((Date.now() % 100000) | 0);
// A house with no way in is a bug the player would blame themselves for.
if (game.house.doors.every((d) => game.house.locked.includes(`${d.x},${d.y}`))) {
  game.house.locked.length = 0;
}
game.view.guards = game.house.guards.map((guard) => ({ x: guard.x, y: guard.y }));
restage();
beginNight();
if (game.night === 1) say('tip.first');
relabel();
requestAnimationFrame(frame);

// Handy for playtesting from the console, and for the headless bot.
window.thief = { game, play, enterBy, beginNight };

// One safety valve, because the house never forgets on purpose.
addEventListener('keydown', (e) => {
  if (e.key === 'R' && e.shiftKey) {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch (_) {}
    location.reload();
  }
});

