// The set itself: a scale you drag, a paper roll that draws what comes
// through, and a log book with room for two digits.
//
// The one deliberate omission: there is no display of the whole band at once.
// A panorama would hand you every station for free and there would be nothing
// left to do but read. The meter tells you *something is here*; only sitting
// on it and listening tells you *what*. That gap is the game.

import { BAND, HZ, REACH, gainAt, nearby, strengthAt } from './sky.js';
import { NIGHT, TRACE, closeNight, listen, logGuess, newStation, startNight, tune } from './night.js';
import { blip, enableSound, muteSound, soundOn } from './audio.js';
import { langNow, otherLang, setLang, storyLine, t } from './text.js';

const SAVE_KEY = 'signal.station.v1';
const LANG_KEY = 'signal.lang';

const el = (id) => document.getElementById(id);
const scaleCv = el('scale');
const rollCv = el('roll');
const dpr = Math.min(2, devicePixelRatio || 1);

/**
 * Canvases are measured, not assumed: the roll is told by the layout how much
 * paper it gets, and re-measures when the window changes.
 */
function fit(canvas, view) {
  const w = canvas.clientWidth || canvas.width;
  const h = canvas.clientHeight || canvas.height;
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const g = canvas.getContext('2d');
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  if (view) {
    view.g = g;
    view.w = w;
    view.h = h;
    return view;
  }
  return { g, w, h };
}
const S = fit(scaleCv);
const R = fit(rollCv);
addEventListener('resize', () => {
  fit(scaleCv, S);
  fit(rollCv, R);
});

const AMBER = '#f0a848';
const DIM = '#8a6432';
const CREAM = '#f2e6d0';
const HOT = '#e2583f';

const app = {
  station: newStation(),
  run: null,
  phase: 'play',
  digits: [],
  tips: [],
  taught: new Set(),
  contact: 0,
  last: null,
};

// --- keeping the thread ---------------------------------------------------

function save() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(app.station));
  } catch (_) {
    /* private mode: tonight is all there is */
  }
}

function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return false;
    Object.assign(app.station, JSON.parse(raw));
    return true;
  } catch (_) {
    return false;
  }
}

// --- the scale ------------------------------------------------------------

const PAD = 26;
const xOf = (mark) => PAD + ((mark - BAND.lo) / (BAND.hi - BAND.lo)) * (S.w - PAD * 2);
const markOfX = (x) => BAND.lo + ((x - PAD) / (S.w - PAD * 2)) * (BAND.hi - BAND.lo);

function drawScale() {
  const g = S.g;
  const run = app.run;
  g.clearRect(0, 0, S.w, S.h);

  // the engraved band
  g.strokeStyle = 'rgba(242,230,208,.22)';
  g.lineWidth = 1;
  g.beginPath();
  g.moveTo(PAD, 30.5);
  g.lineTo(S.w - PAD, 30.5);
  g.stroke();

  g.textAlign = 'center';
  g.textBaseline = 'top';
  for (let mark = 0; mark <= 99; mark += 2) {
    const x = xOf(mark);
    const major = mark % 10 === 0;
    g.strokeStyle = major ? 'rgba(242,230,208,.5)' : 'rgba(242,230,208,.2)';
    g.beginPath();
    g.moveTo(x, 30.5);
    g.lineTo(x, major ? 18 : 25);
    g.stroke();
    if (major) {
      g.fillStyle = DIM;
      g.font = '9px ui-monospace, monospace';
      g.fillText(String(mark), x, 4);
    }
  }

  // your own pencil marks: where the meter moved while you were there
  for (const mark of run.noticed) {
    const x = xOf(mark);
    g.strokeStyle = 'rgba(240,168,72,.75)';
    g.lineWidth = 1.5;
    g.beginPath();
    g.moveTo(x, 34);
    g.lineTo(x, 44);
    g.stroke();
  }

  // last night's number, if you earned it
  if (app.station.expect !== null && app.station.expect !== undefined) {
    const x = xOf(app.station.expect);
    g.strokeStyle = 'rgba(242,230,208,.5)';
    g.setLineDash([2, 3]);
    g.beginPath();
    g.moveTo(x, 12);
    g.lineTo(x, 48);
    g.stroke();
    g.setLineDash([]);
  }

  // the needle
  const nx = xOf(run.dial);
  g.strokeStyle = HOT;
  g.lineWidth = 1.5;
  g.beginPath();
  g.moveTo(nx, 10);
  g.lineTo(nx, 52);
  g.stroke();
  g.fillStyle = HOT;
  g.beginPath();
  g.moveTo(nx - 5, 52);
  g.lineTo(nx + 5, 52);
  g.lineTo(nx, 45);
  g.closePath();
  g.fill();

  // how much is out there, right here — presence only, never pattern
  const near = nearby(run.sky, run.dial);
  g.fillStyle = 'rgba(240,168,72,.16)';
  for (const { source, gain } of near) {
    const x = xOf(source.freq);
    const w = (REACH / (BAND.hi - BAND.lo)) * (S.w - PAD * 2);
    g.globalAlpha = Math.min(0.5, gain);
    g.fillRect(x - w, 56, w * 2, 6);
    g.globalAlpha = 1;
  }

  // the night burning down
  const left = Math.max(0, 1 - run.elapsed / NIGHT);
  g.fillStyle = 'rgba(242,230,208,.1)';
  g.fillRect(PAD, S.h - 8, S.w - PAD * 2, 3);
  g.fillStyle = left < 0.2 ? HOT : DIM;
  g.fillRect(PAD, S.h - 8, (S.w - PAD * 2) * left, 3);
}

// --- the paper roll -------------------------------------------------------

function drawRoll() {
  const g = R.g;
  const run = app.run;
  g.clearRect(0, 0, R.w, R.h);

  const base = R.h - 14;
  const span = R.h - 34;
  const step = (R.w - 8) / TRACE;

  // the paper
  g.strokeStyle = 'rgba(242,230,208,.13)';
  g.lineWidth = 1;
  g.beginPath();
  g.moveTo(4, base + 0.5);
  g.lineTo(R.w - 4, base + 0.5);
  g.stroke();

  // Newest at the right, always: the paper feeds out under the pen, so the
  // gap you are counting stays in the same place instead of marching away.
  const trace = run.trace;
  const shown = Math.min(TRACE, trace.length);
  const start = trace.length - shown;
  const right = R.w - 4;
  for (let i = 0; i < shown; i++) {
    const shot = trace[start + i];
    const x = right - (shown - i) * step;
    // Headroom above a lone voice, so two voices on one tick read as taller.
    const h = Math.min(1, shot.level / 1.3) * span;
    const real = shot.level > 0.16;
    g.fillStyle = real
      ? `rgba(240,168,72,${Math.min(1, 0.5 + shot.level * 0.5)})`
      : 'rgba(242,230,208,.15)';
    g.fillRect(x, base - h, Math.max(1.5, step - 1.3), h);
  }

  // the pen
  g.fillStyle = 'rgba(226,88,63,.55)';
  g.fillRect(right, base - span, 1.5, span + 4);
}

// --- chrome ---------------------------------------------------------------

function say(key, params) {
  if (app.tips.some((tip) => tip.key === key)) return;
  app.tips.push({ key, params });
  if (app.tips.length > 3) app.tips.shift();
  drawTips();
}

function once(key, params) {
  if (app.taught.has(key)) return;
  app.taught.add(key);
  say(key, params);
}

function drawTips() {
  const box = el('notes');
  box.innerHTML = '';
  for (const tip of app.tips) {
    const div = document.createElement('div');
    div.textContent = t(tip.key, tip.params);
    box.appendChild(div);
  }
}

/** The book: what you wrote each night, and whether it was true. */
function drawBook() {
  const box = el('book');
  box.innerHTML = '';
  const log = app.station.log || [];
  for (const row of log.slice(-8)) {
    const line = document.createElement('div');
    if (!row.right) line.className = 'miss';
    const night = document.createElement('i');
    night.textContent = t('book.night', { night: row.night });
    const said = document.createElement('b');
    said.textContent = row.said === null ? '— —' : String(row.said);
    const truth = document.createElement('span');
    truth.textContent = row.right ? '✓' : `✗ ${row.truth}`;
    line.append(night, said, truth);
    box.appendChild(line);
  }
}

function refresh() {
  const run = app.run;
  const state = run.over === 'dawn' ? 'dawn' : run.over ? 'done' : 'listening';
  el('sub').textContent = t('sub', { night: app.station.night, state: t(state) });
  el('thread').textContent = String(app.station.thread);
  el('found').textContent = String(app.station.found);
  el('mark').textContent = run.dial.toFixed(2);
  el('bar').style.width = `${Math.round(strengthAt(run.sky, run.dial) * 100)}%`;
  el('slots').textContent = `${app.digits[0] ?? '—'} ${app.digits[1] ?? '—'}`;
  drawBook();
}

function relabel() {
  document.documentElement.lang = langNow();
  el('h-title').textContent = t('title');
  el('l-thread').textContent = t('thread');
  el('l-found').textContent = t('found');
  el('l-dial').textContent = t('dial');
  el('clear').textContent = t('clear');
  el('commit').textContent = t('log');
  el('again').textContent = t('again');
  el('legend').textContent = t('legend');
  el('lang').textContent = otherLang().toUpperCase();
  document.title = t('title');
  drawTips();
  showResult();
  refresh();
}

// --- a night --------------------------------------------------------------

function openNight() {
  el('modal').classList.add('hidden');
  app.run = startNight(app.station, seedOf());
  app.digits = [];
  app.tips = [];
  app.phase = 'play';
  app.contact = 0;

  if (app.station.expect !== null && app.station.expect !== undefined) {
    tune(app.run, app.station.expect);
    say('expect', { mark: app.station.expect });
  } else {
    say('blind');
  }
  if (app.station.night === 1) say('tip.first');
  if (app.station.night === 3) once('tip.jammer');
  if (app.station.night === 5) once('tip.impostor');
  drawTips();
  refresh();
}

function seedOf() {
  try {
    let seed = Number(localStorage.getItem('signal.seed'));
    if (!seed) {
      seed = (Date.now() % 1000000) | 0;
      localStorage.setItem('signal.seed', String(seed));
    }
    return seed;
  } catch (_) {
    return 20260806;
  }
}

/** The teaching moments, each fired the first time it is actually true. */
function coach() {
  const run = app.run;
  const person = run.sky.sources.find((s) => s.kind === 'person');
  const heard = gainAt(person, run.dial);

  if (strengthAt(run.sky, run.dial) >= 0.5) {
    once('tip.heard', { mark: Math.round(run.dial) });
  }
  if (heard > 0.4) {
    app.contact += 1;
    if (app.contact > HZ * 2) {
      once('tip.grammar');
      once('tip.count');
      once('tip.meaning');
    }
    if (Math.abs(person.freq - person.mark) > 1.1) once('tip.drift');
    if (nearby(run.sky, run.dial).length > 1) once('tip.nudge');
  }
}

function finish() {
  app.phase = 'over';
  const truth = app.run.sky.next;
  const at = app.run.sky.target;
  const logged = app.run.logged;
  const outcome = closeNight(app.station, app.run);
  save();

  app.last = {
    right: outcome.right,
    dawn: !logged,
    said: logged ? logged.mark : null,
    mark: truth,
    at: Math.round(at),
    story: outcome.right ? app.station.story : 0,
    thread: app.station.thread,
  };
  refresh();
  showResult();
  el('modal').classList.remove('hidden');
}

function showResult() {
  const r = app.last;
  if (!r) return;
  const state = r.dawn ? 'dawn' : r.right ? 'right' : 'wrong';
  el('m-kicker').textContent = t(`end.${r.dawn ? 'dawn' : r.right ? 'right' : 'wrong'}`);
  el('m-title').textContent = String(r.mark);
  el('m-body').textContent = `${t(`body.${state}`, r)}  ${
    r.right ? t(r.thread === 1 ? 'body.kept1' : 'body.kept', r) : t('body.lost')
  }`;
  el('m-story').textContent = r.right ? storyLine(r.story) || '' : '';
}

// --- the loop -------------------------------------------------------------

let previous = 0;
function frame(now) {
  requestAnimationFrame(frame);
  if (document.hidden) {
    previous = now;
    return;
  }
  const dt = Math.min(0.05, (now - previous) / 1000 || 0);
  previous = now;

  if (app.phase === 'play') {
    const made = listen(app.run, dt);
    if (made.length) {
      blip(made[made.length - 1].level, strengthAt(app.run.sky, app.run.dial));
      coach();
      refresh();
    }
    if (app.run.over) finish();
  }
  drawScale();
  drawRoll();
}

// --- input ----------------------------------------------------------------

function setDial(mark) {
  if (app.phase !== 'play') return;
  tune(app.run, mark, BAND);
  refresh();
}

let dragging = false;
const dialFromEvent = (e) => {
  const rect = scaleCv.getBoundingClientRect();
  return markOfX(((e.clientX - rect.left) / rect.width) * S.w);
};
scaleCv.addEventListener('pointerdown', (e) => {
  dragging = true;
  scaleCv.setPointerCapture(e.pointerId);
  setDial(dialFromEvent(e));
});
scaleCv.addEventListener('pointermove', (e) => {
  if (dragging) setDial(dialFromEvent(e));
});
scaleCv.addEventListener('pointerup', () => {
  dragging = false;
});
scaleCv.addEventListener(
  'wheel',
  (e) => {
    e.preventDefault();
    setDial(app.run.dial + Math.sign(e.deltaY) * 0.25);
  },
  { passive: false },
);

function pushDigit(d) {
  if (app.phase !== 'play' || app.digits.length >= 2) return;
  app.digits.push(d);
  refresh();
}

function commit() {
  if (app.phase !== 'play') return;
  if (app.digits.length < 2) {
    say('tip.needTwo');
    return;
  }
  logGuess(app.run, app.digits);
  finish();
}

for (const button of document.querySelectorAll('#pad button')) {
  button.addEventListener('click', () => pushDigit(Number(button.dataset.d)));
}
el('clear').addEventListener('click', () => {
  app.digits = [];
  refresh();
});
el('commit').addEventListener('click', commit);
el('again').addEventListener('click', openNight);

el('sound').addEventListener('click', () => {
  if (soundOn()) muteSound();
  else enableSound();
  el('sound').classList.toggle('on', soundOn());
});

el('lang').addEventListener('click', () => {
  setLang(otherLang());
  try {
    localStorage.setItem(LANG_KEY, langNow());
  } catch (_) {}
  relabel();
});

addEventListener('keydown', (e) => {
  if (app.phase === 'over') {
    if (e.key === 'Enter' || e.key === ' ') openNight();
    return;
  }
  const d = Number(e.key);
  if (d >= 1 && d <= 9) return pushDigit(d);
  if (e.key === 'Backspace') {
    app.digits = [];
    return refresh();
  }
  if (e.key === 'Enter') return commit();
  const fine = e.shiftKey ? 1 : 0.25;
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    setDial(app.run.dial - fine);
  }
  if (e.key === 'ArrowRight') {
    e.preventDefault();
    setDial(app.run.dial + fine);
  }
});

// --- start ----------------------------------------------------------------

try {
  setLang(localStorage.getItem(LANG_KEY) || (navigator.language || '').slice(0, 2));
} catch (_) {
  setLang((navigator.language || '').slice(0, 2));
}
load();
openNight();
relabel();
requestAnimationFrame(frame);

// For playtesting from the console, and for the headless bot.
window.signal = { app, setDial, pushDigit, commit, openNight };

addEventListener('keydown', (e) => {
  if (e.key === 'R' && e.shiftKey) {
    try {
      localStorage.removeItem(SAVE_KEY);
      localStorage.removeItem('signal.seed');
    } catch (_) {}
    location.reload();
  }
});
