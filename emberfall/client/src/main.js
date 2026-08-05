// Client glue: input, prediction, the frame loop, and the screens.

import { Net, blendEntities } from './net.js';
import { Renderer } from './render.js';

const $ = (sel) => document.querySelector(sel);
const PLAYER_SPEED = 235; // must match the server; prediction lives or dies on it
const CARRY_CAP = 25;

const url = `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}`;
const net = new Net(url);
const canvas = $('#view');
let renderer = null;

/** Where we think we are, between corrections. */
const me = { x: 0, y: 0, carry: 0, banked: 0, invuln: 0, name: '' };
const input = { dx: 0, dy: 0, keys: new Set(), pointer: null };
let started = false;
let last = performance.now();
let sinceInput = 0;

net.onStatus = (text) => {
  $('#status').textContent = text;
  $('#play').disabled = !net.connected;
};

net.onEvent = (event) => {
  if (event.type === 'joined') {
    started = true;
    me.name = net.name;
    $('#join').classList.add('hidden');
    $('#hud').classList.remove('hidden');
    renderer = new Renderer(canvas, net.world);
    renderer.resize();
    toast(`night ${event.night} — find a beacon`);
    setTimeout(() => ($('#hint').style.opacity = '0'), 14000);
  }
  if (event.type === 'caught') {
    renderer.shake = 1;
    renderer.flash = 1;
    toast(event.motes > 0 ? `a shade took ${event.motes} motes` : 'a shade caught you');
  }
  if (event.type === 'deposit') {
    const bonus = event.coop > 1 ? ` ×${event.coop.toFixed(2)} together` : '';
    toast(`banked ${event.motes}${bonus}`);
  }
  if (event.type === 'dawn') showDawn(event);
};

// --- input ----------------------------------------------------------------

const keyMap = {
  KeyW: [0, -1], ArrowUp: [0, -1],
  KeyS: [0, 1], ArrowDown: [0, 1],
  KeyA: [-1, 0], ArrowLeft: [-1, 0],
  KeyD: [1, 0], ArrowRight: [1, 0],
};

window.addEventListener('keydown', (e) => {
  if (keyMap[e.code]) {
    input.keys.add(e.code);
    e.preventDefault();
  }
});
window.addEventListener('keyup', (e) => input.keys.delete(e.code));
window.addEventListener('blur', () => {
  input.keys.clear();
  input.pointer = null;
});

const setPointer = (e) => {
  input.pointer = { x: e.clientX, y: e.clientY };
};
canvas.addEventListener('pointerdown', setPointer);
canvas.addEventListener('pointermove', (e) => {
  if (e.buttons || e.pointerType === 'touch') setPointer(e);
});
canvas.addEventListener('pointerup', () => (input.pointer = null));
canvas.addEventListener('pointercancel', () => (input.pointer = null));

function readInput() {
  let dx = 0;
  let dy = 0;
  for (const code of input.keys) {
    dx += keyMap[code][0];
    dy += keyMap[code][1];
  }
  if (!dx && !dy && input.pointer) {
    const vx = input.pointer.x - window.innerWidth / 2;
    const vy = input.pointer.y - window.innerHeight / 2;
    // A small dead zone in the middle so you can stop by holding still.
    if (Math.hypot(vx, vy) > 26) {
      dx = vx;
      dy = vy;
    }
  }
  const len = Math.hypot(dx, dy);
  return len > 0 ? { dx: dx / len, dy: dy / len } : { dx: 0, dy: 0 };
}

// --- prediction -----------------------------------------------------------

function predict(dt) {
  const { dx, dy } = readInput();
  input.dx = dx;
  input.dy = dy;

  const load = 1 - 0.3 * (me.carry / CARRY_CAP);
  me.x = clamp(me.x + dx * PLAYER_SPEED * load * dt, 0, net.world.w);
  me.y = clamp(me.y + dy * PLAYER_SPEED * load * dt, 0, net.world.h);

  sinceInput += dt;
  if (sinceInput >= 1 / 20) {
    sinceInput = 0;
    net.sendInput(dx, dy, dt);
  }
}

/**
 * Fold in the server's opinion. Small disagreements are eased away so the
 * ember never twitches; a big one means we were wrong (caught by a shade,
 * teleported at dawn) and is applied at once.
 */
function reconcile() {
  const snap = net.latest;
  if (!snap) return;
  const [sxRaw, syRaw, carry, banked, invuln] = snap.me;
  me.carry = carry;
  me.banked = banked;
  me.invuln = invuln;

  const gap = Math.hypot(me.x - sxRaw, me.y - syRaw);
  if (gap > 220) {
    me.x = sxRaw;
    me.y = syRaw;
    return;
  }
  const pull = Math.min(1, gap / 220) * 0.35;
  me.x += (sxRaw - me.x) * pull;
  me.y += (syRaw - me.y) * pull;
}

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

// --- frame ----------------------------------------------------------------

function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min((now - last) / 1000, 0.1);
  last = now;
  if (!started || !renderer) return;

  predict(dt);
  reconcile();
  renderer.update(dt);

  const view = buildView(now);
  renderer.draw(view);
  renderer.drawMinimap($('#map'), view);
  paintHud(view);
}

function buildView(now) {
  const frames = net.interpolated(now);
  const snap = net.latest;
  const beacons = net.beacons.map((b) => ({
    ...b,
    charge: snap?.beacons?.find((x) => x[0] === b.id)?.[1] || 0,
  }));

  let players = [];
  let motes = [];
  let shades = [];
  if (frames) {
    players = blendEntities(frames.a.players, frames.b.players, frames.t);
    motes = frames.b.motes;
    shades = blendEntities(frames.a.shades, frames.b.shades, frames.t);
  } else if (snap) {
    players = snap.players;
    motes = snap.motes;
    shades = snap.shades;
  }
  for (const p of players) p.name = p[5] || '';

  return {
    me,
    players,
    motes,
    shades,
    beacons,
    light: snap?.light,
    night: snap?.night || 1,
    dawn: (snap?.dawn || 0) / 1000,
    online: snap?.online || 1,
  };
}

const hud = {};

function paintHud(view) {
  set('#carry', `${me.carry}/${CARRY_CAP}`);
  set('#banked', String(me.banked));
  set('#online', String(view.online));
  const pct = Math.min(100, Math.round((view.dawn / 0.8) * 100));
  if (hud.pct !== pct) {
    hud.pct = pct;
    $('#dawn-fill').style.width = `${pct}%`;
    $('#dawn-label').textContent = `NIGHT ${view.night} · ${pct}% TO DAWN`;
  }
}

function set(sel, value) {
  if (hud[sel] === value) return;
  hud[sel] = value;
  $(sel).textContent = value;
}

// --- screens --------------------------------------------------------------

function toast(text, ms = 2600) {
  const el = $('#toast');
  el.textContent = text;
  el.classList.remove('hidden');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.add('hidden'), ms);
}

function showDawn(event) {
  $('#dawn-night').textContent = `night ${event.night} is over`;
  $('#board').innerHTML = event.board.length
    ? event.board
        .map((row) => `<li>${escapeHtml(row.name)}<span>${row.motes}</span></li>`)
        .join('')
    : '<li>nobody banked a thing<span>0</span></li>';
  $('#dawn').classList.remove('hidden');
}

function escapeHtml(text) {
  return String(text).replace(/[<>&"]/g, (c) => `&#${c.charCodeAt(0)};`);
}

$('#dawn-close').addEventListener('click', () => $('#dawn').classList.add('hidden'));

$('#play').addEventListener('click', () => {
  const name = $('#name').value.trim() || 'ember';
  net.join(name);
  $('#play').disabled = true;
  $('#status').textContent = 'stepping into the dark…';
});

$('#name').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') $('#play').click();
});

window.addEventListener('resize', () => renderer && renderer.resize());

// Debug handle, also how the automated multiplayer test drives a client.
window.__ember = { net, me, input, get view() {
  return buildView(performance.now());
} };

net.connect();
requestAnimationFrame(frame);
