// The hall: input, the fixed-step loop, and everything that is not the fight.
//
// The rules module runs at a fixed 60 steps a second no matter what the
// screen is doing, so a phone that drops to 40fps plays exactly the same
// fight as a desktop at 144 — in a game that is entirely about timing, a
// variable timestep would quietly change the difficulty per device.

import {
  ARENA,
  KNIGHT,
  STEP,
  UPGRADES,
  WARDEN,
  buy,
  endFight,
  flaskCount,
  maxHp,
  maxStamina,
  newFight,
  newRun,
  priceOf,
  step,
  telegraph,
} from './rules.js';
import { GROUND, PALETTE, drawBackdrop, drawKnight, drawTell, drawWarden } from './art.js';
import { LABEL, langNow, nextLang, setLang, t } from './text.js';

const SAVE_KEY = 'warden.run.v1';
const LANG_KEY = 'warden.lang';
const VIEW = { w: 960, h: 540 };

const el = (id) => document.getElementById(id);
const stage = el('stage');
const dpr = Math.min(2, devicePixelRatio || 1);
stage.width = VIEW.w * dpr;
stage.height = VIEW.h * dpr;
const g = stage.getContext('2d');
g.scale(dpr, dpr);

const game = {
  run: newRun(),
  fight: null,
  /** The last attempt's outcome, so the shop can redraw without losing it. */
  lastResult: null,
  phase: 'rest', // 'rest' | 'fight' | 'over'
  motes: [],
  sparks: [],
  time: 0,
  taught: new Set(),
  toastUntil: 0,
};

for (let i = 0; i < 46; i++) {
  game.motes.push({
    x: Math.random() * VIEW.w,
    y: Math.random() * GROUND,
    r: Math.random() * 1.6 + 0.5,
    vy: -(Math.random() * 12 + 4),
    vx: (Math.random() - 0.5) * 8,
  });
}

// --- what carries between deaths ------------------------------------------

function keep() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(game.run));
  } catch (_) {
    /* nothing carries today */
  }
}

function recall() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) Object.assign(game.run, JSON.parse(raw));
  } catch (_) {
    /* start fresh */
  }
}

// --- input ----------------------------------------------------------------

const held = { left: false, right: false, block: false };
const queued = { attack: false, roll: false, drink: false };

const KEYS = {
  a: 'left',
  arrowleft: 'left',
  d: 'right',
  arrowright: 'right',
  k: 'block',
  shift: 'block',
};
const ONCE = { ' ': 'roll', j: 'attack', l: 'drink', arrowup: 'roll' };

addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (game.phase !== 'fight') {
    if (key === 'enter' || key === ' ') {
      e.preventDefault();
      el('v-go').click();
    }
    return;
  }
  if (KEYS[key]) {
    held[KEYS[key]] = true;
    e.preventDefault();
  }
  if (ONCE[key] && !e.repeat) {
    queued[ONCE[key]] = true;
    e.preventDefault();
  }
});
addEventListener('keyup', (e) => {
  const key = e.key.toLowerCase();
  if (KEYS[key]) held[KEYS[key]] = false;
});

for (const button of document.querySelectorAll('#pad button')) {
  const kind = button.dataset.k;
  const down = (e) => {
    e.preventDefault();
    button.classList.add('held');
    if (kind in held) held[kind] = true;
    else queued[kind] = true;
  };
  const up = (e) => {
    e.preventDefault();
    button.classList.remove('held');
    if (kind in held) held[kind] = false;
  };
  button.addEventListener('pointerdown', down);
  button.addEventListener('pointerup', up);
  button.addEventListener('pointercancel', up);
  button.addEventListener('pointerleave', up);
}

stage.addEventListener('pointerdown', (e) => {
  if (game.phase !== 'fight') return;
  e.preventDefault();
  queued.attack = true;
});

// --- the loop -------------------------------------------------------------

let previous = 0;
let carry = 0;

function frame(now) {
  requestAnimationFrame(frame);
  if (document.hidden) {
    previous = now;
    return;
  }
  const dt = Math.min(0.08, (now - previous) / 1000 || 0);
  previous = now;
  game.time += dt;

  if (game.phase === 'fight') {
    carry += dt;
    // Fixed steps only. Leftover time waits for the next frame rather than
    // stretching one, so the timings can never drift with the frame rate.
    let steps = 0;
    while (carry >= STEP && steps < 6 && game.phase === 'fight') {
      carry -= STEP;
      steps++;
      const input = {
        left: held.left,
        right: held.right,
        block: held.block,
        attack: queued.attack,
        roll: queued.roll,
        drink: queued.drink,
      };
      queued.attack = queued.roll = queued.drink = false;
      react(step(game.fight, input, STEP));
      if (game.fight.over) finish();
    }
    coach();
    hud();
  }

  motes(dt);
  paint(dt);
}

function react(events) {
  const fight = game.fight;
  for (const e of events) {
    if (e.type === 'hit') {
      burst(e.x, GROUND - (e.on === 'knight' ? 46 : 90), e.on === 'knight' ? '#d4564d' : '#ffe6b0', 16);
    }
    if (e.type === 'block') burst(e.x, GROUND - 46, '#cfe0ff', 10);
    if (e.type === 'guardbreak') burst(e.x, GROUND - 46, '#ffffff', 22);
    if (e.type === 'dodge') burst(fight.knight.x, GROUND - 8, '#8fb4e8', 8);
    if (e.type === 'roll') burst(fight.knight.x, GROUND - 4, '#6b7484', 7);
    if (e.type === 'stagger') burst(fight.warden.x, GROUND - 120, '#ffb347', 20);
    if (e.type === 'recover') tell('tip.essence');
    if (e.type === 'phase') {
      burst(fight.warden.x, GROUND - 130, '#ff8a3c', 40);
      tell('tip.phase', true);
    }
  }
}

function coach() {
  const fight = game.fight;
  const w = fight.warden;
  const k = fight.knight;
  const warning = telegraph(fight);
  if (warning) {
    once('tip.tell');
    if (warning.move === 'lunge') once('tip.lunge');
  }
  if (w.state === 'attack' && w.time > w.move.windup + w.move.active) once('tip.punish');
  if (k.stamina < 12) once('tip.stam');
}

function once(key) {
  if (game.taught.has(key)) return;
  game.taught.add(key);
  tell(key);
}

function tell(key, urgent = false) {
  const box = el('toast');
  box.textContent = t(key);
  box.classList.add('on');
  game.toastUntil = game.time + (urgent ? 3.4 : 4.4);
}

// --- drawing --------------------------------------------------------------

function burst(x, y, colour, count) {
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const speed = 40 + Math.random() * 190;
    game.sparks.push({
      x,
      y,
      vx: Math.cos(a) * speed,
      vy: Math.sin(a) * speed - 40,
      life: 0.3 + Math.random() * 0.5,
      age: 0,
      colour,
      r: Math.random() * 2 + 1,
    });
  }
}

function motes(dt) {
  for (const m of game.motes) {
    m.y += m.vy * dt;
    m.x += m.vx * dt;
    if (m.y < -10) {
      m.y = GROUND + 10;
      m.x = Math.random() * VIEW.w;
    }
  }
  for (let i = game.sparks.length - 1; i >= 0; i--) {
    const s = game.sparks[i];
    s.age += dt;
    if (s.age >= s.life) {
      game.sparks.splice(i, 1);
      continue;
    }
    s.x += s.vx * dt;
    s.y += s.vy * dt;
    s.vy += 420 * dt;
  }
}

function paint(dt) {
  const fight = game.fight;
  const phase = fight ? fight.warden.phase : 1;
  g.clearRect(0, 0, VIEW.w, VIEW.h);
  g.save();
  if (fight && fight.shake > 0.2) {
    g.translate((Math.random() - 0.5) * fight.shake, (Math.random() - 0.5) * fight.shake);
  }

  drawBackdrop(g, VIEW.w, VIEW.h, game.time, phase);

  for (const m of game.motes) {
    g.fillStyle = `rgba(255,190,120,${0.06 + m.r * 0.06})`;
    g.beginPath();
    g.arc(m.x, m.y, m.r, 0, Math.PI * 2);
    g.fill();
  }

  if (fight) {
    if (fight.pickup) {
      const pulse = 0.6 + Math.sin(game.time * 4) * 0.4;
      const grad = g.createRadialGradient(fight.pickup.x, GROUND - 10, 2, fight.pickup.x, GROUND - 10, 46);
      grad.addColorStop(0, `rgba(255,220,140,${0.5 * pulse})`);
      grad.addColorStop(1, 'rgba(255,190,90,0)');
      g.fillStyle = grad;
      g.fillRect(fight.pickup.x - 50, GROUND - 60, 100, 70);
    }
    drawTell(g, telegraph(fight));
    // draw the further one first so the nearer overlaps correctly
    if (fight.warden.x < fight.knight.x) {
      drawWarden(g, fight.warden, game.time);
      drawKnight(g, fight.knight, game.time);
    } else {
      drawKnight(g, fight.knight, game.time);
      drawWarden(g, fight.warden, game.time);
    }
  }

  for (const s of game.sparks) {
    g.globalAlpha = 1 - s.age / s.life;
    g.fillStyle = s.colour;
    g.fillRect(s.x - s.r / 2, s.y - s.r / 2, s.r, s.r);
    g.globalAlpha = 1;
  }
  g.restore();

  // vignette, last, over everything
  const vig = g.createRadialGradient(VIEW.w / 2, VIEW.h / 2, VIEW.h * 0.35, VIEW.w / 2, VIEW.h / 2, VIEW.h);
  vig.addColorStop(0, 'rgba(0,0,0,0)');
  vig.addColorStop(1, 'rgba(0,0,0,.72)');
  g.fillStyle = vig;
  g.fillRect(0, 0, VIEW.w, VIEW.h);

  if (game.toastUntil && game.time > game.toastUntil) {
    el('toast').classList.remove('on');
    game.toastUntil = 0;
  }
}

// --- the panels -----------------------------------------------------------

function hud() {
  const fight = game.fight;
  const k = fight.knight;
  el('hp').style.width = `${(k.hp / maxHp(game.run)) * 100}%`;
  el('hp-text').textContent = `${Math.ceil(k.hp)} / ${maxHp(game.run)}`;
  el('st').style.width = `${(k.stamina / maxStamina(game.run)) * 100}%`;
  el('boss-hp').style.width = `${(fight.warden.hp / WARDEN.hp) * 100}%`;
  el('essence').textContent = String(game.run.essence + fight.earned);

  const flasks = el('flasks');
  if (flasks.children.length !== flaskCount(game.run)) {
    flasks.innerHTML = '';
    for (let i = 0; i < flaskCount(game.run); i++) flasks.appendChild(document.createElement('span'));
  }
  [...flasks.children].forEach((pip, i) => pip.classList.toggle('spent', i >= k.flasks));
}

function begin() {
  game.fight = newFight(game.run, (Date.now() % 100000) + game.run.attempts * 7);
  game.phase = 'fight';
  el('veil').classList.add('hidden');
  el('bossbar').classList.remove('hidden');
  el('boss-name').textContent = t('boss');
  if (game.fight.pickup) tell('tip.essence');
  hud();
}

function finish() {
  const result = endFight(game.fight);
  game.lastResult = result;
  game.phase = 'over';
  keep();
  el('bossbar').classList.add('hidden');
  showVeil(result);
}

function showVeil(result) {
  const run = game.run;
  el('v-kicker').textContent = result
    ? result.won
      ? t('victory')
      : t('attempt', { n: run.attempts })
    : t('title');
  el('v-title').textContent = result ? (result.won ? t('victory') : t('fallen')) : t('rest');
  el('v-body').textContent = result
    ? result.won
      ? t('body.won')
      : t('body.lost')
    : t('body.rest');
  el('v-go').textContent = result ? t('retry') : t('enter');
  el('v-stats').textContent =
    `${t('stat.attempts')} ${run.attempts}  ·  ${t('stat.best')} ${Math.round(run.best * 100)}%  ·  ` +
    `${t('essence')} ${run.essence}` +
    (run.lost ? `  ·  +${run.lost.amount} ${t('dropped')}` : '');

  // The controls, but only until they have been used once.
  const hints = el('hints');
  hints.innerHTML = '';
  if (run.attempts === 0) {
    for (const key of ['hint.move', 'hint.attack', 'hint.roll', 'hint.block', 'hint.drink']) {
      const li = document.createElement('li');
      li.textContent = t(key);
      hints.appendChild(li);
    }
  }
  drawShop();
  el('veil').classList.remove('hidden');
}

function drawShop() {
  const shop = el('shop');
  shop.innerHTML = '';
  for (const key of Object.keys(UPGRADES)) {
    const level = game.run.levels[key];
    const price = priceOf(game.run, key);
    const button = document.createElement('button');
    button.disabled = price === null || game.run.essence < price;

    const name = document.createElement('span');
    name.textContent = t(key);
    const pips = document.createElement('span');
    pips.className = 'pips';
    pips.textContent = '◆'.repeat(level) + '◇'.repeat(UPGRADES[key].max - level);
    const price$ = document.createElement('span');
    price$.className = 'price';
    price$.textContent = price === null ? t('max') : t('cost', { n: price });

    button.append(name, pips, price$);
    button.addEventListener('click', () => {
      if (buy(game.run, key)) {
        keep();
        showVeil(game.lastResult);
      }
    });
    shop.appendChild(button);
  }
}

el('v-go').addEventListener('click', begin);

el('lang').addEventListener('click', () => {
  setLang(nextLang());
  try {
    localStorage.setItem(LANG_KEY, langNow());
  } catch (_) {}
  relabel();
});

function relabel() {
  document.documentElement.lang = langNow();
  document.title = t('title');
  el('lang').textContent = LABEL[nextLang()];
  el('l-essence').textContent = t('essence');
  el('boss-name').textContent = t('boss');
  if (game.phase !== 'fight') showVeil(game.lastResult);
}

// --- start ----------------------------------------------------------------

try {
  setLang(localStorage.getItem(LANG_KEY) || (navigator.language || '').slice(0, 2));
} catch (_) {
  setLang((navigator.language || '').slice(0, 2));
}
recall();
showVeil(null);
relabel();
requestAnimationFrame(frame);

window.warden = { game, begin, held, queued };

addEventListener('keydown', (e) => {
  if (e.key === 'R' && e.shiftKey) {
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch (_) {}
    location.reload();
  }
});
