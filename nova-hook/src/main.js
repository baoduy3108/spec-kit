// Boot + glue: canvas, screens, meta progression, and the mapping from
// gameplay events to sound, particles and haptics.

import { Art } from './core/art.js';
import { Audio } from './core/audio.js';
import { Fx } from './core/fx.js';
import { Input } from './core/input.js';
import { Loop } from './core/loop.js';
import { dailySeed, dayKey, makeRng } from './core/rng.js';
import { clamp } from './core/mathx.js';
import { NOVA, VIEW, multiplierFor } from './game/config.js';
import { Renderer } from './game/render.js';
import { summary } from './game/scoring.js';
import { World } from './game/world.js';
import { allDone, applyRun, dailyMissions } from './meta/missions.js';
import * as store from './meta/save.js';
import { SKINS, coinsForRun, skinById } from './meta/skins.js';

const $ = (sel) => document.querySelector(sel);
const canvas = $('#game');
const ctx = canvas.getContext('2d', { alpha: false });

let data = store.load();
const audio = new Audio();
const fx = new Fx();
const input = new Input(canvas);
const art = new Art(makeRng(20260804));
const world = new World(onGameEvent);
const renderer = new Renderer(ctx, art);
const loop = new Loop({ update, render });

let phase = 'title'; // title | play | over | menu
let mode = 'endless';
let deathTimer = 0;
let lastHud = {};

// --- canvas sizing --------------------------------------------------------

function resize() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
  // The virtual width is fixed at 540 so the shaft is always the same
  // difficulty; the virtual height stretches to fit the device, so a tall
  // phone simply sees further ahead instead of getting letterboxed.
  const aspect = rect.height / Math.max(1, rect.width);
  VIEW.H = Math.round(clamp(VIEW.W * aspect, 860, 1320));
  const scale = (rect.width * dpr) / VIEW.W;
  canvas.width = Math.round(VIEW.W * scale);
  canvas.height = Math.round(VIEW.H * scale);
  renderer.scale = scale;
}

window.addEventListener('resize', resize);
window.addEventListener('orientationchange', () => setTimeout(resize, 120));

// --- meta -----------------------------------------------------------------

function ensureToday() {
  const day = dayKey();
  if (data.missions.day !== day) {
    data.missions = { day, list: dailyMissions(dailySeed()), claimed: false };
  }
  if (data.daily.day !== day) {
    data.daily = { day, best: 0, runs: 0, done: false };
  }
  store.save(data);
}

function applySkin() {
  art.setPalette(skinById(data.skin).palette);
}

function persist() {
  store.save(data);
}

// --- screens --------------------------------------------------------------

const SCREENS = ['s-title', 's-over', 's-shop', 's-missions', 's-settings'];

function show(id) {
  for (const s of SCREENS) $('#' + s).classList.toggle('hidden', s !== id);
  if (id) $('#' + id).classList.remove('hidden');
}

function hideAll() {
  for (const s of SCREENS) $('#' + s).classList.add('hidden');
}

function toast(msg, ms = 1800) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.add('hidden'), ms);
}

function goTitle() {
  phase = 'title';
  mode = 'endless';
  $('#hud').classList.add('hidden');
  refreshTitle();
  show('s-title');
}

function refreshTitle() {
  ensureToday();
  $('#t-best').textContent = data.best.toLocaleString();
  $('#t-depth').textContent = data.bestDepth + 'm';
  $('#t-coins').textContent = data.coins.toLocaleString();
  $('#t-daily').textContent = data.daily.runs
    ? `today's best ${data.daily.best.toLocaleString()}`
    : 'fresh seed, same for everyone';
  const pending = data.missions.list.some((m) => !m.done);
  $('#t-mission-dot').classList.toggle('hidden', !pending);
}

// --- run lifecycle --------------------------------------------------------

function startRun(nextMode) {
  ensureToday();
  mode = nextMode;
  const seed = mode === 'daily' ? dailySeed() : (Math.random() * 0x7fffffff) | 0;
  world.reset(seed, mode);
  fx.clear();
  fx.reduceMotion = data.settings.reduceMotion;
  input.reset();
  phase = 'play';
  deathTimer = 0;
  hideAll();
  $('#hud').classList.remove('hidden');
  $('#hud-hint').style.opacity = data.runs < 3 ? '1' : '0';
  audio.unlock();
  if (data.settings.music) audio.startMusic();
}

function endRun() {
  phase = 'over';
  const sum = summary(world.run);
  const earnedCoins = coinsForRun(sum);
  const missionResult = applyRun(data.missions.list, { ...sum, runs: 1 });

  data.missions.list = missionResult.missions;
  data.coins += earnedCoins + missionResult.earned;
  data.runs += 1;
  data.totalShards += sum.shards;

  const isBest = sum.score > data.best;
  data.best = Math.max(data.best, sum.score);
  data.bestDepth = Math.max(data.bestDepth, sum.depth);
  data.bestCombo = Math.max(data.bestCombo, sum.combo);
  if (mode === 'daily') {
    data.daily.runs += 1;
    data.daily.best = Math.max(data.daily.best, sum.score);
  }
  persist();

  $('#o-cause').textContent = causeText(world.deathCause);
  $('#o-score').textContent = sum.score.toLocaleString();
  $('#o-note').textContent = isBest
    ? 'NEW PERSONAL BEST'
    : `best ${data.best.toLocaleString()} · +${(earnedCoins + missionResult.earned).toLocaleString()} shards`;
  $('#o-depth').textContent = sum.depth + 'm';
  $('#o-chain').textContent = sum.combo;
  $('#o-shards').textContent = sum.shards;
  $('#o-acc').textContent = Math.round(sum.accuracy * 100) + '%';

  $('#o-missions').innerHTML = data.missions.list
    .map(
      (m) =>
        `<div class="${m.done ? 'done' : ''}">${m.done ? '✓' : '•'} ${m.text} — ${Math.min(
          m.progress,
          m.goal,
        )}/${m.goal}</div>`,
    )
    .join('');

  $('#o-revive').classList.toggle('hidden', world.run.revives >= 1);
  $('#hud').classList.add('hidden');
  show('s-over');
  if (missionResult.earned > 0) toast(`+${missionResult.earned} shards from missions`);
  else if (allDone(data.missions.list)) toast('All daily missions cleared');
  refreshTitle();
}

function causeText(cause) {
  switch (cause) {
    case 'wall':
      return 'CLIPPED THE WALL';
    case 'mine':
      return 'MINED';
    case 'spinner':
      return 'SHREDDED';
    case 'pulsar':
      return 'CAUGHT IN THE BLOOM';
    default:
      return 'SWALLOWED BY THE VOID';
  }
}

function revive() {
  world.revive();
  phase = 'play';
  hideAll();
  $('#hud').classList.remove('hidden');
  input.reset();
}

// --- gameplay events ------------------------------------------------------

function buzz(ms) {
  if (data.settings.haptics && navigator.vibrate) {
    try {
      navigator.vibrate(ms);
    } catch (_) {
      /* unsupported */
    }
  }
}

function onGameEvent(type, e) {
  const pal = art.palette;
  switch (type) {
    case 'hook':
      fx.ring(e.x, e.y, { r0: 6, r1: 46, life: 0.3, color: pal.glow, width: 3 });
      fx.burst(e.x, e.y, { count: 8, speed: 120, color: pal.glow, size: 2.4, life: 0.35 });
      audio.hook();
      buzz(8);
      break;
    case 'release':
      fx.burst(e.x, e.y, { count: 8, speed: 150, color: pal.trail, size: 2.2, life: 0.3 });
      audio.release();
      break;
    case 'perfect': {
      const combo = e.combo;
      fx.ring(e.x, e.y, { r0: 10, r1: 120, life: 0.45, color: '#7dff9c', width: 6 });
      fx.burst(e.x, e.y, { count: 22, speed: 260, color: '#7dff9c', size: 3.2, life: 0.6 });
      fx.text(e.x, e.y + 24, combo > 1 ? `PERFECT x${combo}` : 'PERFECT', {
        color: '#7dff9c',
        size: 26 + Math.min(combo, 10),
      });
      fx.slowmo(0.6, 0.07);
      fx.screenFlash(0.28, [125, 255, 156]);
      fx.shake(0.16 + Math.min(combo, 8) * 0.012);
      audio.perfect(combo);
      buzz(14);
      break;
    }
    case 'snap':
      fx.burst(e.x, e.y, { count: 26, speed: 300, color: '#ff4d7d', size: 3, life: 0.7 });
      fx.text(e.x, e.y + 20, 'ROPE SNAPPED', { color: '#ff4d7d', size: 22 });
      fx.shake(0.4);
      audio.snap();
      buzz([12, 40, 12]);
      break;
    case 'break':
      fx.burst(e.x, e.y, { count: 16, speed: 190, color: '#ff8bd2', size: 2.6, life: 0.6 });
      break;
    case 'shard':
      fx.burst(e.x, e.y, { count: 7, speed: 130, color: pal.shard, size: 2.2, life: 0.35 });
      audio.shard();
      break;
    case 'nova':
      fx.ring(e.x, e.y, { r0: 20, r1: 320, life: 0.7, color: '#ffd166', width: 10 });
      fx.burst(e.x, e.y, { count: 46, speed: 420, color: '#ffd166', size: 3.6, life: 0.9 });
      fx.text(e.x, e.y + 40, 'NOVA SURGE', { color: '#ffd166', size: 34, life: 1.2 });
      fx.screenFlash(0.65, [255, 209, 102]);
      fx.shake(0.55);
      fx.slowmo(0.35, 0.18);
      audio.nova();
      buzz([20, 30, 60]);
      break;
    case 'smash':
      fx.burst(e.x, e.y, { count: 14, speed: 220, color: '#ffd166', size: 2.8, life: 0.5 });
      fx.shake(0.12);
      break;
    case 'nearmiss':
      fx.slowmo(0.7, 0.07);
      break;
    case 'revive':
      fx.ring(e.x, e.y, { r0: 10, r1: 220, life: 0.6, color: '#ffd166', width: 8 });
      fx.screenFlash(0.4, [255, 209, 102]);
      audio.nova();
      break;
    case 'death':
      fx.burst(e.x, e.y, { count: 60, speed: 380, color: '#ff4d7d', size: 3.4, life: 1.1 });
      fx.ring(e.x, e.y, { r0: 8, r1: 260, life: 0.7, color: '#ff4d7d', width: 8 });
      fx.screenFlash(0.7, [255, 61, 127]);
      fx.shake(0.9);
      fx.slowmo(0.3, 0.35);
      audio.death();
      buzz([30, 60, 120]);
      deathTimer = 0.85;
      break;
    default:
      break;
  }
}

// --- loop -----------------------------------------------------------------

function update(dt) {
  fx.update(dt);
  if (phase === 'play') world.update(dt, input);
  else if (phase !== 'over') world.idle(dt);
  input.clear();
}

function render(raw) {
  // Screen shake, hit-stop and the death hand-off all run on real time so
  // slow motion never stretches the wait for the results screen.
  fx.updateRealtime(raw);
  loop.timeScale = fx.timeScale;
  renderer.draw(world, fx, raw);
  if (phase === 'play') {
    hud();
    if (world.dead) {
      deathTimer -= raw;
      if (deathTimer <= 0) endRun();
    }
  }
}

function hud() {
  const run = world.run;
  const score = Math.floor(run.score);
  if (score !== lastHud.score) {
    $('#hud-score').textContent = score.toLocaleString();
    lastHud.score = score;
  }
  const depth = Math.floor(run.altitude / 10);
  if (depth !== lastHud.depth) {
    $('#hud-depth').textContent = depth + 'm';
    lastHud.depth = depth;
  }
  if (run.combo !== lastHud.combo) {
    const el = $('#hud-combo');
    $('#combo-mult').textContent = 'x' + multiplierFor(run.combo).toFixed(1);
    $('#combo-chain').textContent = 'CHAIN ' + run.combo;
    el.classList.toggle('on', run.combo > 0);
    if (run.combo > (lastHud.combo || 0)) {
      el.classList.remove('pop');
      void el.offsetWidth;
      el.classList.add('pop');
    }
    lastHud.combo = run.combo;
  }
  const charge = run.novaTimer > 0 ? 1 - run.novaTimer / NOVA.duration : run.novaCharge;
  const pct = Math.round(charge * 100);
  if (pct !== lastHud.nova) {
    $('#nova-bar').style.width = pct + '%';
    $('#nova-wrap').classList.toggle('full', run.novaCharge >= 1 || run.novaTimer > 0);
    lastHud.nova = pct;
  }
  if (data.runs >= 3 || run.perfects > 0) $('#hud-hint').style.opacity = '0';
}

// --- shop / missions / settings ------------------------------------------

function renderShop() {
  $('#shop-coins').textContent = data.coins.toLocaleString();
  const list = $('#shop-list');
  list.innerHTML = '';
  for (const skin of SKINS) {
    const owned = data.owned.includes(skin.id);
    const active = data.skin === skin.id;
    const btn = document.createElement('button');
    btn.className = `card ${owned ? 'owned' : data.coins >= skin.cost ? '' : 'locked'} ${
      active ? 'active' : ''
    }`;
    btn.innerHTML = `
      <span class="swatch" style="background:${skin.palette.glow};color:${skin.palette.glow}"></span>
      <span class="meta"><b>${skin.name}</b><span>${skin.tagline}</span></span>
      <span class="price">${owned ? (active ? 'EQUIPPED' : 'EQUIP') : skin.cost + ' ◆'}</span>`;
    btn.addEventListener('click', () => {
      audio.ui();
      if (owned) {
        data.skin = skin.id;
        applySkin();
        persist();
        renderShop();
      } else if (data.coins >= skin.cost) {
        data.coins -= skin.cost;
        data.owned.push(skin.id);
        data.skin = skin.id;
        applySkin();
        persist();
        renderShop();
        toast(`${skin.name} unlocked`);
      } else {
        toast(`${(skin.cost - data.coins).toLocaleString()} more shards needed`);
      }
    });
    list.appendChild(btn);
  }
}

function renderMissions() {
  ensureToday();
  const list = $('#mission-list');
  list.innerHTML = '';
  for (const m of data.missions.list) {
    const row = document.createElement('div');
    row.className = `card ${m.done ? 'active' : ''}`;
    const pct = Math.round((Math.min(m.progress, m.goal) / m.goal) * 100);
    row.innerHTML = `
      <span class="meta">
        <b>${m.text}</b>
        <span>${Math.min(m.progress, m.goal)} / ${m.goal} · +${m.reward} ◆</span>
        <span class="bar"><i style="width:${pct}%"></i></span>
      </span>
      <span class="price">${m.done ? 'DONE' : pct + '%'}</span>`;
    list.appendChild(row);
  }
}

function renderSettings() {
  for (const el of document.querySelectorAll('[data-setting]')) {
    el.checked = !!data.settings[el.dataset.setting];
  }
}

document.addEventListener('change', (ev) => {
  const key = ev.target && ev.target.dataset && ev.target.dataset.setting;
  if (!key) return;
  data.settings[key] = ev.target.checked;
  persist();
  if (key === 'sfx') audio.setSfx(ev.target.checked);
  if (key === 'music') audio.setMusic(ev.target.checked);
  if (key === 'reduceMotion') fx.reduceMotion = ev.target.checked;
});

async function share() {
  const sum = summary(world.run);
  const text = `NOVA HOOK — ${sum.score.toLocaleString()} pts, ${sum.depth}m, best chain x${sum.combo}. Try to beat it.`;
  const url = location.href.split('#')[0];
  try {
    if (navigator.share) {
      await navigator.share({ title: 'NOVA HOOK', text, url });
      return;
    }
    await navigator.clipboard.writeText(`${text} ${url}`);
    toast('Result copied to clipboard');
  } catch (_) {
    toast('Sharing not available here');
  }
}

// --- buttons --------------------------------------------------------------

document.addEventListener('click', (ev) => {
  const btn = ev.target.closest('[data-action]');
  if (!btn) return;
  const action = btn.dataset.action;
  audio.unlock();
  if (action !== 'play' && action !== 'retry' && action !== 'daily') audio.ui();

  switch (action) {
    case 'play':
      startRun('endless');
      break;
    case 'daily':
      startRun('daily');
      toast("Daily run — same level for everyone today");
      break;
    case 'retry':
      startRun(mode);
      break;
    case 'revive':
      revive();
      break;
    case 'share':
      share();
      break;
    case 'shop':
      phase = 'menu';
      renderShop();
      show('s-shop');
      break;
    case 'missions':
      phase = 'menu';
      renderMissions();
      show('s-missions');
      break;
    case 'settings':
      phase = 'menu';
      renderSettings();
      show('s-settings');
      break;
    case 'wipe':
      if (confirm('Erase local progress, skins and records?')) {
        data = store.reset();
        applySkin();
        ensureToday();
        toast('Local data erased');
        goTitle();
      }
      break;
    case 'home':
      goTitle();
      break;
    default:
      break;
  }
});

// Screen taps must not also fire a hook.
$('#screens').addEventListener('pointerdown', (ev) => ev.stopPropagation());

// --- lifecycle ------------------------------------------------------------

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    loop.stop();
    audio.stopMusic();
  } else {
    input.reset();
    if (phase === 'play') world.invuln = Math.max(world.invuln, 0.8);
    loop.start();
    if (data.settings.music) audio.startMusic();
  }
});

input.onFirstInteraction(() => {
  audio.unlock();
  audio.setSfx(data.settings.sfx);
  audio.setMusic(data.settings.music);
});

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      /* offline support is a bonus, not a requirement */
    });
  });
}

// Handy while debugging, and how the browser smoke test drives the game.
window.__novaHook = {
  world,
  fx,
  input,
  audio,
  art,
  get phase() {
    return phase;
  },
};

ensureToday();
applySkin();
fx.reduceMotion =
  data.settings.reduceMotion ||
  (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
resize();
goTitle();
loop.start();
