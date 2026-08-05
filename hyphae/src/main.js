// Boot and glue: the loop, the DOM, and the bridge between them.

import { fmt, fmtInt, fmtTime } from './core/format.js';
import { ACHIEVEMENTS, BLOOM, MUTATIONS, TIERS } from './game/config.js';
import * as E from './game/engine.js';
import { buildNetwork } from './game/network.js';
import { Renderer } from './game/render.js';
import * as store from './meta/save.js';

const $ = (sel) => document.querySelector(sel);
const TICK = 1 / 20; // simulation step, seconds
const SAVE_EVERY = 10; // seconds

const loaded = store.load();
let state = loaded.state;
const settings = {
  reduceMotion:
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  showNetwork: true,
};

const canvas = $('#net');
const renderer = new Renderer(canvas, buildNetwork(7));
renderer.reduceMotion = settings.reduceMotion;

let buyMode = 'max';
let tab = 'grow';
let acc = 0;
let sinceSave = 0;
let last = performance.now();
let pulseDebt = 0;

// --- offline catch-up -----------------------------------------------------

if (loaded.raw && loaded.raw.lastSeen) {
  const away = (Date.now() - loaded.raw.lastSeen) / 1000;
  if (away > 60) {
    const result = E.applyOffline(state, away);
    if (result.gained.gt(0)) showAway(result);
  }
}

function showAway(result) {
  $('#away-time').textContent = `You were gone ${fmtTime(result.away)}. The network ran for ${fmtTime(
    result.simulated,
  )}.`;
  $('#away-gain').textContent = fmt(result.gained);
  const notes = [];
  if (result.capped) notes.push('Night Shift extends how long it keeps running.');
  if (result.efficiency < 1) notes.push(`Offline efficiency ${Math.round(result.efficiency * 100)}%.`);
  if (result.bought > 0) notes.push(`Your reflexes bought ${fmtInt(result.bought)} things.`);
  $('#away-note').textContent = notes.join(' ');
  $('#away').classList.remove('hidden');
}

// --- loop -----------------------------------------------------------------

function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min((now - last) / 1000, 1);
  last = now;

  acc += dt;
  let steps = 0;
  while (acc >= TICK && steps < 20) {
    step(TICK);
    acc -= TICK;
    steps++;
  }

  renderer.update(dt);
  if (settings.showNetwork) renderer.draw(state);
  paint();

  sinceSave += dt;
  if (sinceSave > SAVE_EVERY) {
    sinceSave = 0;
    store.save(state);
  }
}

function step(dt) {
  E.advance(state, dt);
  E.runAutomation(state);
  const fresh = E.checkAchievements(state);
  if (fresh.length) toast(`RECORD — ${fresh[0].name}`);

  // One pulse of light per "meaningful" chunk of income.
  pulseDebt += dt * 3;
  while (pulseDebt >= 1) {
    pulseDebt -= 1;
    if (!state.biomass.isZero() && E.biomassRate(state).gt(0)) renderer.emitPulse();
  }
}

// --- painting -------------------------------------------------------------

const cache = {};

function paint() {
  set('#biomass', fmt(state.biomass));
  set('#rate', fmt(E.biomassRate(state)) + '/s');
  set('#spores', fmt(state.spores));
  set('#mult', 'x' + fmt(E.globalMultiplier(state)));
  set('#forage-value', '+' + fmt(E.forageValue(state)));

  const gain = E.bloomGain(state);
  const bloomBtn = $('#bloom');
  const ready = gain.gte(1);
  bloomBtn.disabled = !ready;
  bloomBtn.classList.toggle('ready', ready);
  set(
    '#bloom-value',
    ready ? `+${fmt(gain)} spores` : `needs ${fmt(BLOOM.threshold)} earned this cycle`,
  );

  const affordableMutation = MUTATIONS.some((m) => {
    const cost = E.mutationCost(state, m.id);
    return cost && state.spores.gte(cost);
  });
  $('#mut-dot').classList.toggle('hidden', !affordableMutation);

  if (tab === 'grow') paintTiers();
  else if (tab === 'mutate') paintMutations();
  else if (tab === 'records') paintRecords();
}

function set(sel, value) {
  if (cache[sel] === value) return;
  cache[sel] = value;
  const el = $(sel);
  if (el) el.textContent = value;
}

function buyCount(i) {
  if (buyMode === 'max') return Math.max(1, E.affordable(state, i));
  return Number(buyMode);
}

let tierEls = null;

function paintTiers() {
  const list = $('#tier-list');
  if (!tierEls) {
    list.innerHTML = '';
    tierEls = TIERS.map((tier, i) => {
      const row = document.createElement('div');
      row.className = 'row-card';
      row.innerHTML = `
        <div>
          <div class="name">${tier.name} <i data-owned></i></div>
          <div class="meta" data-meta></div>
          <div class="blurb">${tier.blurb}</div>
        </div>
        <button class="buy" data-i="${i}"><span data-label>BUY</span><em data-cost></em></button>`;
      row.querySelector('button').addEventListener('click', () => {
        const n = E.buy(state, i, buyCount(i));
        if (n > 0) {
          E.checkAchievements(state);
          renderer.emitPulse();
        }
      });
      list.appendChild(row);
      return {
        row,
        owned: row.querySelector('[data-owned]'),
        meta: row.querySelector('[data-meta]'),
        cost: row.querySelector('[data-cost]'),
        label: row.querySelector('[data-label]'),
        button: row.querySelector('button'),
      };
    });
  }

  const global = E.globalMultiplier(state);
  const every = E.boostEvery(state);
  for (let i = 0; i < TIERS.length; i++) {
    const el = tierEls[i];
    const t = state.tiers[i];
    const n = buyCount(i);
    const price = E.costOfMany(state, i, n);
    const can = E.affordable(state, i) >= (buyMode === 'max' ? 1 : n);
    const unlocked = t.bought > 0 || i === 0 || state.tiers[i - 1].bought > 0;

    el.row.classList.toggle('locked', !unlocked && !can);
    el.row.classList.toggle('ready', can);
    el.owned.textContent = t.count.isZero() ? '' : fmtInt(t.count);
    const target = i === 0 ? 'biomass' : TIERS[i - 1].name.toLowerCase();
    const toBoost = every - (t.bought % every);
    el.meta.textContent = t.count.isZero()
      ? `makes ${target}`
      : `${fmt(E.tierOutput(state, i, global))} ${target}/s · ${toBoost} to x2`;
    el.label.textContent = can ? `BUY ×${fmtInt(n)}` : 'BUY';
    el.cost.textContent = fmt(price);
    el.button.disabled = !can;
  }
}

let mutationEls = null;

function paintMutations() {
  const list = $('#mutation-list');
  if (!mutationEls) {
    list.innerHTML = '';
    mutationEls = MUTATIONS.map((m) => {
      const row = document.createElement('div');
      row.className = 'row-card';
      row.innerHTML = `
        <div>
          <div class="name">${m.name} <i data-level></i></div>
          <div class="blurb">${m.blurb}</div>
        </div>
        <button class="buy">BUY<em data-cost></em></button>`;
      row.querySelector('button').addEventListener('click', () => {
        if (E.buyMutation(state, m.id)) {
          toast(`${m.name} grown`);
          store.save(state);
        }
      });
      list.appendChild(row);
      return {
        row,
        level: row.querySelector('[data-level]'),
        cost: row.querySelector('[data-cost]'),
        button: row.querySelector('button'),
      };
    });
  }

  MUTATIONS.forEach((m, k) => {
    const el = mutationEls[k];
    const level = E.mutationLevel(state, m.id);
    const cost = E.mutationCost(state, m.id);
    el.level.textContent = m.levels > 1 ? `${level}/${m.levels}` : level ? 'grown' : '';
    if (!cost) {
      el.cost.textContent = 'maxed';
      el.button.disabled = true;
      el.row.classList.add('locked');
    } else {
      const can = state.spores.gte(cost);
      el.cost.textContent = `${fmt(cost)} spores`;
      el.button.disabled = !can;
      el.row.classList.toggle('ready', can);
      el.row.classList.toggle('locked', !can);
    }
  });
}

let recordEls = null;

function paintRecords() {
  if (!recordEls) {
    $('#achievement-list').innerHTML = ACHIEVEMENTS.map(
      (a) => `<div class="award" data-id="${a.id}"><b>${a.name}</b><span>${a.blurb}</span></div>`,
    ).join('');
    $('#stat-grid').innerHTML = `
      <div><b data-stat="blooms">0</b><span>BLOOMS</span></div>
      <div><b data-stat="spores">0</b><span>SPORES EARNED</span></div>
      <div><b data-stat="time">0s</b><span>TIME GROWING</span></div>
      <div><b data-stat="earned">0</b><span>BIOMASS ALL TIME</span></div>`;
    recordEls = true;
  }
  for (const a of ACHIEVEMENTS) {
    const el = $(`.award[data-id="${a.id}"]`);
    if (el) el.classList.toggle('got', state.achievements.includes(a.id));
  }
  $('[data-stat="blooms"]').textContent = fmtInt(state.blooms);
  $('[data-stat="spores"]').textContent = fmt(state.totalSpores);
  $('[data-stat="time"]').textContent = fmtTime(state.stats.playTime);
  $('[data-stat="earned"]').textContent = fmt(state.totalEarned);
}

// --- interaction ----------------------------------------------------------

function toast(message, ms = 2200) {
  const el = $('#toast');
  el.textContent = message;
  el.classList.remove('hidden');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.add('hidden'), ms);
}

$('#forage').addEventListener('click', () => {
  E.forage(state);
  E.checkAchievements(state);
  renderer.emitPulse();
});

$('#bloom').addEventListener('click', () => {
  const gain = E.bloomGain(state);
  if (gain.lt(1)) return;
  if (!confirm(`Bloom for ${fmt(gain)} spores?\n\nThe network resets. Spores and mutations stay.`)) {
    return;
  }
  E.bloom(state);
  E.checkAchievements(state);
  store.save(state);
  toast(`+${fmt(gain)} spores on the wind`);
  renderer.grown = 0;
});

for (const btn of document.querySelectorAll('[data-buy]')) {
  btn.addEventListener('click', () => {
    buyMode = btn.dataset.buy;
    for (const other of document.querySelectorAll('[data-buy]')) {
      other.classList.toggle('on', other === btn);
    }
  });
}

for (const btn of document.querySelectorAll('[data-tab]')) {
  btn.addEventListener('click', () => {
    tab = btn.dataset.tab;
    for (const other of document.querySelectorAll('[data-tab]')) {
      other.classList.toggle('on', other === btn);
    }
    for (const name of ['grow', 'mutate', 'records', 'settings']) {
      $(`#p-${name}`).classList.toggle('hidden', name !== tab);
    }
    paint();
  });
}

document.addEventListener('change', (ev) => {
  const key = ev.target?.dataset?.setting;
  if (!key) return;
  settings[key] = ev.target.checked;
  renderer.reduceMotion = settings.reduceMotion;
  if (!settings.showNetwork) {
    const g = canvas.getContext('2d');
    g.clearRect(0, 0, canvas.width, canvas.height);
  }
});

document.addEventListener('click', async (ev) => {
  const action = ev.target.closest('[data-action]')?.dataset.action;
  if (!action) return;
  if (action === 'close-away') $('#away').classList.add('hidden');
  if (action === 'export') {
    const code = store.exportSave(state);
    $('#save-code').value = code;
    try {
      await navigator.clipboard.writeText(code);
      toast('Save copied to clipboard');
    } catch (_) {
      toast('Save code is in the box — copy it');
    }
  }
  if (action === 'import') {
    const next = store.importSave($('#save-code').value);
    if (!next) return toast('That code did not parse');
    state = next;
    store.save(state);
    tierEls = mutationEls = recordEls = null;
    toast('Save loaded');
  }
  if (action === 'wipe') {
    if (!confirm('Start over? Spores, mutations and records are all lost.')) return;
    store.wipe();
    state = E.newState();
    tierEls = mutationEls = recordEls = null;
    renderer.grown = 0;
    toast('A new forest floor');
  }
});

window.addEventListener('resize', () => renderer.resize());
window.addEventListener('beforeunload', () => store.save(state));

// A backgrounded tab stops getting animation frames, so time spent there has
// to be caught up the same way a closed tab is — otherwise minimising the
// window for an hour quietly costs you the hour.
let hiddenAt = 0;
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    hiddenAt = Date.now();
    store.save(state);
    return;
  }
  last = performance.now();
  acc = 0;
  const away = hiddenAt ? (Date.now() - hiddenAt) / 1000 : 0;
  hiddenAt = 0;
  if (away > 60) {
    const result = E.applyOffline(state, away);
    if (result.gained.gt(0)) showAway(result);
  }
});

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}

// Debug handle, also used by the browser smoke test.
window.__hyphae = { get state() {
  return state;
}, E, renderer, store };

renderer.resize();
paintTiers();
paint();
requestAnimationFrame(frame);
