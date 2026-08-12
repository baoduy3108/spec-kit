// tools/draw.js — the blockout sheet.
//
// This file used to try to be concept art and it lost that argument. Painted
// concept art now exists for area one and it is better than anything a vector
// renderer was going to produce, so this file does the job a vector renderer is
// actually the right tool for: a measured, reproducible level-design blockout
// of all 368 rooms, drawn straight off the same data the game runs on.
//
// What that buys, which no concept painting can:
//   - it is derived, so it cannot disagree with world.js
//   - it is measured in metres against the player's real speed, reach and roll
//   - it covers every room in the game in a couple of seconds
//   - it is under test
//
// The aesthetic is a technical drawing, not a painting: hairline grid, exact
// distances, one accent colour, and every number on it read out of src/.

import { mkdirSync, writeFileSync } from 'node:fs';
import { AREAS, ROOMS, FOES } from '../src/world.js';
import { BESTIARY } from '../src/bosses.js';
import { LORE } from '../src/lore.js';
import { HERO } from '../src/hero.js';
import { KNIGHT } from '../src/rules.js';

// --- scale ----------------------------------------------------------------
// One metre is PX pixels. The hero is HERO_M metres tall, and every other
// length on the sheet is derived from the game's own numbers through that.
const PX = 30;
const HERO_M = 2.0;
const m = (v) => v * PX;
const ROOM_M = 24;
const ROOM_H_M = 8;
const W = 1180;
const PANEL = 318;
const HEAD = 132;
const PAD = 34;
const BOX_W = m(ROOM_M);
const BOX_H = m(ROOM_H_M);

const INK = {
  paper: '#0b0e14',
  panel: '#0f131b',
  grid: '#1b2230',
  grid5: '#263143',
  rule: '#3d4b60',
  solid: '#1f2733',
  solidEdge: '#55677f',
  text: '#c8d2df',
  dim: '#6c7a8c',
  faint: '#44515f',
  hero: '#7fd4e8',
  foe: '#e0684f',
  light: '#ffb04a',
  hazard: '#c8493c',
  note: '#9aa96e',
};

const out = [];
const put = (s) => out.push(s);
const n = (v) => Number(v).toFixed(1);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function rngFor(seed) {
  let h = 2166136261;
  for (const c of String(seed)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return () => { h += 0x6d2b79f5; let t = h; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

const text = (x, y, s, { size = 11, fill = INK.text, anchor = 'start', mono = false, weight = 400, ls = 0 } = {}) =>
  put(`<text x="${n(x)}" y="${n(y)}" font-size="${size}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}" letter-spacing="${ls}"${mono ? ' font-family="ui-monospace,SFMono-Regular,Menlo,monospace"' : ''}>${esc(s)}</text>`);

const line = (x1, y1, x2, y2, stroke, width = 1, opacity = 1, dash = null) =>
  put(`<path d="M ${n(x1)} ${n(y1)} L ${n(x2)} ${n(y2)}" stroke="${stroke}" stroke-width="${width}" stroke-opacity="${opacity}"${dash ? ` stroke-dasharray="${dash}"` : ''} fill="none"/>`);

// --- terrain: the surface the player actually stands on --------------------
// Each kind returns a profile in metres: [x, y] with y measured up from the
// room's floor line. This is the part a blockout exists for — it is the thing
// the level is, before anything is drawn on it.

function profile(room) {
  const rng = rngFor(room.id);
  const P = [];
  const step = (x, y) => P.push([x, y]);
  switch (room.kind) {
    case 'stair': {
      // a flight with the middle of it gone
      // "Half the steps are gone" is several holes, not one chasm. The first
      // version cut three consecutive treads and the blockout measured the
      // result at 4.6m against a 2.2m roll — the room could not be crossed.
      const steps = 13;
      const tread = (ROOM_M - 4) / steps;
      // Bounded: an unbounded retry loop hangs outright, because there are
      // reachable states with no legal tread left to remove ({3,6,9} has none).
      const missing = new Set();
      for (let tries = 0; tries < 60 && missing.size < 4; tries++) {
        const k = 2 + Math.floor(rng() * (steps - 4));
        if (!missing.has(k) && !missing.has(k - 1) && !missing.has(k + 1)) missing.add(k);
      }
      // The tread edges are computed once and reused. Deriving the same point
      // two ways (i*tread here, x0+tread there) puts them a float ulp apart and
      // the profile appears to run backwards by 1e-15 of a metre.
      const xs = Array.from({ length: steps + 1 }, (_, i) => 2 + i * tread);
      step(0, 0);
      for (let i = 0; i < steps; i++) {
        const y = (i * 3.4) / steps;
        if (missing.has(i)) { step(xs[i], null); continue; }
        step(xs[i], y); step(xs[i + 1], y);
      }
      step(ROOM_M, 3.4);
      break;
    }
    case 'bridge': {
      // Two ledges with the channel cut between them — but the channel has a
      // floor. The blockout said 7.2m, uncrossable, and it was right to: the
      // first version made the trough a void, and the room's own line says the
      // two of them are STANDING in it. Water you wade through, not a pit.
      step(0, 0.9); step(8.4, 0.9); step(8.6, 0); step(15.4, 0);
      step(15.6, 0.9); step(ROOM_M, 0.9);
      break;
    }
    case 'cave': {
      step(0, 0);
      for (let i = 1; i <= 10; i++) step((i * ROOM_M) / 10, Math.abs(Math.sin(i * 1.9)) * 0.7 + rng() * 0.3);
      break;
    }
    case 'bonfire': {
      // flat, with the bank of fallen stone the collapse left
      step(0, 0); step(ROOM_M * 0.6, 0);
      step(ROOM_M * 0.72, 1.1); step(ROOM_M * 0.86, 1.4); step(ROOM_M, 1.4);
      break;
    }
    case 'yard': {
      step(0, 0); step(9, 0); step(9.4, 1.2); step(15, 1.2); step(15.4, 0); step(ROOM_M, 0);
      break;
    }
    default:
      step(0, 0); step(ROOM_M, 0);
  }
  return P;
}

/** Every hole in the profile, in metres, so the sheet can measure the jumps. */
function gaps(P) {
  const g = [];
  for (let i = 0; i < P.length; i++) {
    if (P[i][1] !== null) continue;
    const from = P[i][0];
    let j = i;
    while (j < P.length && P[j][1] === null) j++;
    g.push([from, (P[j] || [ROOM_M])[0]]);
    i = j;
  }
  return g;
}

/** Where a foe stands, in metres, from the room's own layout tag. */
function spots(layout, count) {
  const at = {
    single: [13],
    spread: [7, 17.5, 12],
    pack: [10, 13.5, 16.5, 7.5],
    ambush: [18.5, 20.5, 15],
    ring: [9, 15, 12, 18],
  }[layout] || [13];
  return Array.from({ length: count }, (_, i) => at[i % at.length] + (i >= at.length ? 1.6 : 0));
}

// --- what is standing in the room -----------------------------------------
// A blockout that shows only terrain is a grid. Where the crates are is level
// design: it decides sightlines, cover, and whether a room has a place to
// stand. These come off the room's own written line, same as the drawings did.

/** [metres from the left, width, height, label]. */
const FURNITURE = {
  cell: [[3.4, 1.1, 2.1, 'cửa mở'], [13.5, 1.6, 0.15, 'cống'], [8, 3.4, 0.1, 'rơm']],
  'ash-pit': [[9, 1.4, 0.9, 'lửa'], [10.8, 1.2, 3.2, 'tượng bị xích'], [18.5, 1.6, 1.1, 'thùng']],
  'long-drain': [[12, 7.2, 2.6, 'miệng cống'], [2.5, 0.8, 0.8, 'lưới'], [21.5, 0.8, 0.8, 'lưới']],
  kennel: [[12, 3.4, 0.5, 'máng ăn'], [4, 0.3, 1.8, 'xích+vòng cổ'], [20, 0.3, 1.8, 'xích+vòng cổ']],
  'broken-stair': [[6, 1.4, 0.4, 'bậc rơi'], [12, 9, 0.05, 'dây võng']],
  'lamplighters-rest': [[7, 1, 1.1, 'người ngồi'], [8.6, 0.5, 0.4, 'đèn rơi'], [15, 4.2, 0.6, 'dãy đèn treo']],
  undergate: [[5.3, 2.2, 2.4, 'cửa A'], [17.8, 2.2, 2.4, 'cửa B'], [11.5, 0.6, 0.9, 'vạch đếm']],
};
const FURNITURE_BY_KIND = {
  hall: [[8, 1.4, 1.1, 'thùng'], [16, 1.2, 1, 'thùng']],
  bonfire: [[9, 1.4, 0.9, 'lửa'], [17, 1.4, 1.1, 'thùng']],
  bridge: [[12, 7.2, 2.6, 'miệng cống']],
  cave: [[12, 2.6, 0.6, 'đá lớn']],
  stair: [[6, 1.2, 0.4, 'đá rơi']],
  yard: [[12, 1.4, 1.2, 'cột gãy']],
  fog: [],
};
const furnitureOf = (room) => FURNITURE[room.key] || FURNITURE_BY_KIND[room.kind] || [];

// --- the figures: outlines at true scale, not portraits ---------------------

/** The Lamplighter, at 2.0m, obeying its own five silhouette rules. */
function hero(gx, gy, facing = 1) {
  const s = m(HERO_M) / 68;
  put(`<g transform="translate(${n(gx)} ${n(gy)}) scale(${n(facing * s)} ${n(s)})">`);
  // stooped, and the pole is longer than the figure is tall
  put(`<path d="M -14 0 L -6 -30 L -10 -46 L -2 -58 L 8 -56 L 6 -40 L 12 -28 L 10 0 Z" fill="${INK.hero}" fill-opacity="0.16" stroke="${INK.hero}" stroke-width="1.6"/>`);
  put(`<path d="M -3 -58 q -8 -6 -1 -11 q 10 -3 9 5 l -1 6 Z" fill="${INK.hero}" fill-opacity="0.3" stroke="${INK.hero}" stroke-width="1.4"/>`);
  // the coat reads as a cluster of hanging shapes
  for (const [ox, oy] of [[-9, -34], [-4, -22], [4, -29], [8, -18]])
    put(`<rect x="${ox - 2}" y="${oy}" width="4" height="5" fill="none" stroke="${INK.hero}" stroke-width="1.1" stroke-opacity="0.8"/>`);
  // one arm glows at the joints; the other does not
  put(`<path d="M 2 -44 L 12 -32" stroke="${INK.light}" stroke-width="2.4" stroke-linecap="round"/>`);
  // the pole
  put(`<path d="M -18 -12 L 44 -56" stroke="${INK.hero}" stroke-width="1.8"/>`);
  put(`<circle cx="45" cy="-57" r="3" fill="none" stroke="${INK.light}" stroke-width="1.4"/>`);
  put(`</g>`);
}

/** A foe outline, sized off its family and its own reach. */
function foeMark(id, gx, gy, facing = -1) {
  const foe = FOES[id];
  const fam = foe.family;
  const tall = fam === 'hound' ? 0.95 : 1.75;
  const s = m(tall) / 46;
  put(`<g transform="translate(${n(gx)} ${n(gy)}) scale(${n(facing * s)} ${n(s)})">`);
  if (fam === 'hound') {
    // low, long, all shoulder and no hip
    put(`<path d="M -26 0 L -22 -18 L -6 -26 L 14 -24 L 24 -14 L 22 -2 L 16 0 L 14 -12 L -4 -14 L -10 -2 Z" fill="${INK.foe}" fill-opacity="0.18" stroke="${INK.foe}" stroke-width="1.5"/>`);
  } else {
    // upright, hollow at the chest, head hung forward of the shoulders
    put(`<path d="M -8 0 L -6 -22 L -10 -34 L -4 -44 L 6 -42 L 4 -30 L 8 -20 L 8 0 Z" fill="${INK.foe}" fill-opacity="0.18" stroke="${INK.foe}" stroke-width="1.5"/>`);
    put(`<path d="M -5 -44 l 8 -1 l 1 -7 l -8 0 Z" fill="${INK.foe}" fill-opacity="0.3" stroke="${INK.foe}" stroke-width="1.2"/>`);
  }
  put(`</g>`);
}

// --- one room -------------------------------------------------------------

function panel(room, top) {
  const rng = rngFor(`${room.id}-b`);
  const x = PAD;
  const y = top;
  const bx = x;
  const by = y + 34;
  const floor = by + BOX_H;
  const cid = room.id.replace(':', '-');
  const P = profile(room);
  const hole = gaps(P);
  const yAt = (mx) => {
    let last = 0;
    for (const [px, py] of P) { if (px > mx) break; if (py !== null) last = py; }
    return floor - m(last);
  };

  put(`<g>`);
  // --- the box and its grid ------------------------------------------------
  put(`<rect x="${n(bx)}" y="${n(by)}" width="${n(BOX_W)}" height="${n(BOX_H)}" fill="${INK.panel}" stroke="${INK.rule}" stroke-width="1"/>`);
  put(`<clipPath id="k-${cid}"><rect x="${n(bx)}" y="${n(by)}" width="${n(BOX_W)}" height="${n(BOX_H)}"/></clipPath>`);
  put(`<g clip-path="url(#k-${cid})">`);
  for (let i = 1; i < ROOM_M; i++)
    line(bx + m(i), by, bx + m(i), floor, i % 5 ? INK.grid : INK.grid5, 1);
  for (let j = 1; j < ROOM_H_M; j++)
    line(bx, floor - m(j), bx + BOX_W, floor - m(j), j % 5 ? INK.grid : INK.grid5, 1);

  // --- the solid: everything the player cannot walk through ----------------
  let d = `M ${n(bx)} ${n(floor + 40)}`;
  let open = false;
  for (const [px, py] of P) {
    if (py === null) { if (!open) { d += ` L ${n(bx + m(px))} ${n(floor + 40)}`; open = true; } continue; }
    if (open) { d += ` M ${n(bx + m(px))} ${n(floor + 40)}`; open = false; }
    d += ` L ${n(bx + m(px))} ${n(floor - m(py))}`;
  }
  d += ` L ${n(bx + BOX_W)} ${n(floor + 40)} Z`;
  put(`<path d="${d}" fill="${INK.solid}" stroke="${INK.solidEdge}" stroke-width="2"/>`);
  // the ceiling, except where there is none
  if (room.kind !== 'yard') {
    const ch = room.kind === 'cave' ? 1.1 : 0.6;
    let cd = `M ${n(bx)} ${n(by - 10)}`;
    for (let i = 0; i <= 12; i++)
      cd += ` L ${n(bx + (i * BOX_W) / 12)} ${n(by + m(ch) + Math.sin(i * 1.7) * (room.kind === 'cave' ? 12 : 4))}`;
    cd += ` L ${n(bx + BOX_W)} ${n(by - 10)} Z`;
    put(`<path d="${cd}" fill="${INK.solid}" stroke="${INK.solidEdge}" stroke-width="1.6"/>`);
  } else {
    line(bx, by + 12, bx + BOX_W, by + 12, INK.faint, 1, 0.7, '3 5');
    text(bx + BOX_W - 6, by + 24, 'no ceiling', { size: 9, fill: INK.faint, anchor: 'end', mono: true });
  }

  // --- furniture: footprint and height, because both are collision ---------
  for (const [fx0, fw, fh, label] of furnitureOf(room)) {
    const px0 = bx + m(fx0 - fw / 2);
    const base = yAt(fx0);
    put(`<rect x="${n(px0)}" y="${n(base - m(fh))}" width="${n(m(fw))}" height="${n(m(fh))}" fill="${INK.faint}" fill-opacity="0.12" stroke="${INK.faint}" stroke-width="1" stroke-dasharray="3 3"/>`);
    text(px0 + m(fw / 2), base - m(fh) - 5, label, { size: 8.5, fill: INK.faint, anchor: 'middle' });
  }

  // --- hazards: every hole, measured against the roll the player has -------
  const rollM = (KNIGHT.roll.speed * KNIGHT.roll.time) / 100;
  hole.forEach(([g0, g1], hi) => {
    const w0 = bx + m(g0);
    const w1 = bx + m(g1);
    put(`<rect x="${n(w0)}" y="${n(floor - m(0.2))}" width="${n(w1 - w0)}" height="${n(m(1.4))}" fill="${INK.hazard}" fill-opacity="0.1"/>`);
    for (let hx = w0; hx < w1; hx += 9)
      line(hx, floor + m(1.2), hx + 7, floor - m(0.1), INK.hazard, 1.2, 0.5);
    const span = g1 - g0;
    const ly = floor - m(1.9) - (hi % 2) * 15;
    line(w0, ly, w1, ly, INK.hazard, 1, 0.9);
    for (const e of [w0, w1]) line(e, ly - 3, e, ly + 3, INK.hazard, 1, 0.9);
    text((w0 + w1) / 2, ly - 5, `${span.toFixed(1)}m${span <= rollM ? '' : ' · KHÔNG QUA ĐƯỢC'}`,
         { size: 9, fill: span <= rollM ? INK.note : INK.hazard, anchor: 'middle', mono: true });
  });

  // --- light: where it is and how far it reaches ---------------------------
  const lightM = { dark: 0, dim: 3.2, grey: 5, pale: 7, warm: 6.5, gold: 8 }[room.light] ?? 3;
  const lightAt = room.kind === 'bonfire' ? 9 : room.light === 'warm' ? 11 : 6;
  if (lightM > 0) {
    const lcx = bx + m(lightAt);
    const lcy = yAt(lightAt) - m(0.8);
    put(`<radialGradient id="lg-${cid}"><stop offset="0" stop-color="${INK.light}" stop-opacity="0.13"/><stop offset="0.6" stop-color="${INK.light}" stop-opacity="0.04"/><stop offset="1" stop-color="${INK.light}" stop-opacity="0"/></radialGradient>`);
    put(`<circle cx="${n(lcx)}" cy="${n(lcy)}" r="${n(m(lightM))}" fill="url(#lg-${cid})"/>`);
    put(`<circle cx="${n(lcx)}" cy="${n(lcy)}" r="${n(m(lightM))}" fill="none" stroke="${INK.light}" stroke-width="0.9" stroke-opacity="0.3" stroke-dasharray="3 7"/>`);
    put(`<circle cx="${n(lcx)}" cy="${n(lcy)}" r="3.4" fill="${INK.light}"/>`);
    line(lcx, lcy, lcx + m(lightM), lcy, INK.light, 0.9, 0.45);
    text(lcx + m(lightM) - 4, lcy - 5, `${lightM}m`, { size: 8.5, fill: INK.light, anchor: 'end', mono: true });
  }

  // --- the player, at true scale, where they come in -----------------------
  const startM = 2.2;
  hero(bx + m(startM), yAt(startM), 1);
  put(`<circle cx="${n(bx + m(startM))}" cy="${n(yAt(startM))}" r="4" fill="none" stroke="${INK.hero}" stroke-width="1.6"/>`);
  text(bx + m(startM), floor + 14, 'VÀO', { size: 9, fill: INK.hero, anchor: 'middle', mono: true });
  // the reach the player has, so the room can be judged against it
  const reachM = KNIGHT.swings[1].reach[1] / 100;
  line(bx + m(startM), floor - m(1.1), bx + m(startM + reachM), floor - m(1.1), INK.hero, 1, 0.55, '2 3');
  text(bx + m(startM + reachM) + 4, floor - m(1.05), `tầm ${reachM.toFixed(1)}m`, { size: 8.5, fill: INK.hero, mono: true });

  // --- the foes ------------------------------------------------------------
  const at = spots(room.layout, room.foes.length);
  room.foes.forEach((id, i) => {
    const fm = at[i];
    const fx = bx + m(fm);
    const fy = yAt(fm);
    const foe = FOES[id];
    // patrol, from its own speed: how far it covers in two seconds
    const patrol = (foe.speed / 100) * 2;
    line(fx - m(patrol / 2), fy + 6, fx + m(patrol / 2), fy + 6, INK.foe, 1, 0.4);
    for (const e of [-1, 1]) line(fx + e * m(patrol / 2), fy + 2, fx + e * m(patrol / 2), fy + 10, INK.foe, 1, 0.4);
    // its own reach, which is the number that decides whether a room is fair
    line(fx, fy - m(0.7), fx - m(foe.reach), fy - m(0.7), INK.foe, 1.2, 0.8);
    foeMark(id, fx, fy, -1);
    text(fx, fy + 22, `${id}`, { size: 9, fill: INK.foe, anchor: 'middle', mono: true });
    text(fx, fy + 32, `${foe.hp}hp ${foe.damage}dmg ${foe.windup}s`, { size: 8, fill: INK.dim, anchor: 'middle', mono: true });
  });

  // --- exits ---------------------------------------------------------------
  for (const [ex, lab] of [[0.5, '←'], [ROOM_M - 0.5, '→']]) {
    put(`<rect x="${n(bx + m(ex) - 9)}" y="${n(yAt(ex) - m(2.1))}" width="18" height="${n(m(2.1))}" fill="${INK.paper}" stroke="${INK.rule}" stroke-width="1"/>`);
    text(bx + m(ex), yAt(ex) - m(0.9), lab, { size: 12, fill: INK.dim, anchor: 'middle' });
  }
  // --- what fits on screen at once -----------------------------------------
  const camM = 14.4;
  line(bx + m(startM), by + 8, bx + m(startM + camM), by + 8, INK.dim, 1, 0.5, '5 4');
  for (const e of [0, camM]) line(bx + m(startM + e), by + 4, bx + m(startM + e), by + 12, INK.dim, 1, 0.5);
  text(bx + m(startM + camM / 2), by + 20, `khung hình ${camM}m`, { size: 8.5, fill: INK.dim, anchor: 'middle', mono: true });
  put(`</g>`);

  // --- the scale bar, outside the box --------------------------------------
  line(bx, floor + 24, bx + m(5), floor + 24, INK.rule, 1.4);
  for (let i = 0; i <= 5; i++) line(bx + m(i), floor + 21, bx + m(i), floor + 27, INK.rule, 1);
  text(bx + m(5) + 6, floor + 28, '5m', { size: 9, fill: INK.dim, mono: true });
  text(bx + BOX_W, floor + 28, `${ROOM_M} × ${ROOM_H_M} m`, { size: 9, fill: INK.faint, anchor: 'end', mono: true });

  // --- the strip on the right ----------------------------------------------
  const sx = bx + BOX_W + 26;
  text(sx, y + 14, room.name.vi, { size: 15, fill: INK.text });
  text(sx, y + 30, room.name.en, { size: 10, fill: INK.dim });
  line(sx, y + 38, W - PAD, y + 38, INK.rule, 1, 0.6);
  text(sx, y + 54, `${room.id}`, { size: 9.5, fill: INK.faint, mono: true });
  text(sx, y + 68, `${room.kind} · ${room.light} · ${room.layout}`, { size: 9.5, fill: INK.dim, mono: true });

  const hp = room.foes.reduce((a, id) => a + FOES[id].hp, 0);
  const dmg = room.foes.reduce((a, id) => Math.max(a, FOES[id].damage), 0);
  const fastest = room.foes.reduce((a, id) => Math.min(a, FOES[id].windup), 9);
  const rows = [
    ['quái', room.foes.length ? `${room.foes.length}` : '—'],
    ['tổng hp', hp || '—'],
    ['đòn nặng nhất', dmg ? `${dmg} (${Math.ceil(KNIGHT.hp / dmg)} đòn chết)` : '—'],
    ['báo ngắn nhất', room.foes.length ? `${fastest.toFixed(2)}s` : '—'],
    ['hụt chân', hole.length ? hole.map(([a, b]) => `${(b - a).toFixed(1)}m`).join(', ') : 'không'],
  ];
  rows.forEach(([k, v], i) => {
    text(sx, y + 88 + i * 14, k, { size: 9.5, fill: INK.faint, mono: true });
    text(W - PAD, y + 88 + i * 14, String(v), { size: 9.5, fill: INK.text, anchor: 'end', mono: true });
  });

  // the line the room was written with, which is what it is all for
  const wrapped = wrap(room.line.vi, 40);
  wrapped.forEach((ln, i) => text(sx, y + 176 + i * 14, ln, { size: 10.5, fill: INK.note }));
  if (room.note) wrap(`ghi chú: ${room.note}`, 42).forEach((ln, i) =>
    text(sx, y + 176 + wrapped.length * 14 + 10 + i * 13, ln, { size: 9.5, fill: INK.dim }));
  put(`</g>`);
}

function wrap(s, cols) {
  const words = String(s).split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > cols) { lines.push(cur.trim()); cur = w; }
    else cur += ' ' + w;
  }
  if (cur.trim()) lines.push(cur.trim());
  return lines;
}

// --- the sheet ------------------------------------------------------------

export function drawArea(areaId) {
  const spot = AREAS.find((a) => a.id === areaId);
  if (!spot) throw new Error(`no such area: ${areaId}`);
  const rooms = ROOMS.filter((r) => r.area === areaId);
  const H = HEAD + rooms.length * PANEL + 56;
  out.length = 0;

  put(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Inter,Helvetica,Arial,sans-serif">`);
  put(`<rect width="${W}" height="${H}" fill="${INK.paper}"/>`);

  text(PAD, 46, areaId.toUpperCase(), { size: 26, fill: INK.text, ls: 3 });
  text(PAD, 66, 'BLOCKOUT · mặt cắt ngang · vẽ từ src/world.js', { size: 11, fill: INK.dim });
  const kinds = [...new Set(rooms.flatMap((r) => r.foes).map((id) => LORE[FOES[id].family].name.vi))];
  text(PAD, 86, `${rooms.length} phòng · tier ${spot.tier}${spot.boss ? ` · boss ${BESTIARY[spot.boss].name.vi}` : ''}${kinds.length ? ` · ${kinds.join(', ')}` : ''}`,
       { size: 11, fill: INK.faint });

  // the legend, so the sheet reads without being explained
  const lx = W - PAD - 460;
  const legend = [
    [INK.hero, `${HERO.name.vi} · ${HERO_M.toFixed(1)}m`],
    [INK.foe, 'quái · vạch dưới = tầm tuần, vạch trên = tầm với'],
    [INK.light, 'nguồn sáng · vòng nét đứt = bán kính'],
    [INK.hazard, 'hụt chân · đo theo cú lăn thật của người chơi'],
  ];
  legend.forEach(([c, s], i) => {
    put(`<rect x="${lx}" y="${34 + i * 15}" width="9" height="9" fill="${c}" fill-opacity="0.3" stroke="${c}" stroke-width="1"/>`);
    text(lx + 15, 42 + i * 15, s, { size: 9.5, fill: INK.dim });
  });
  line(PAD, HEAD - 22, W - PAD, HEAD - 22, INK.rule, 1, 0.5);

  rooms.forEach((room, i) => panel(room, HEAD + i * PANEL));

  const rollM = (KNIGHT.roll.speed * KNIGHT.roll.time) / 100;
  text(PAD, H - 24, `người chơi: ${KNIGHT.hp}hp · lăn ${rollM.toFixed(1)}m trong ${KNIGHT.roll.time}s · tầm đánh ${(KNIGHT.swings[1].reach[1] / 100).toFixed(2)}m · bất tử ${KNIGHT.roll.iFrom}–${KNIGHT.roll.iTo}s`,
       { size: 9.5, fill: INK.faint, mono: true });
  put(`</svg>`);

  mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });
  writeFileSync(new URL(`../dist/blockout-${areaId}.svg`, import.meta.url), out.join('\n'));
  return { rooms: rooms.length, height: H };
}

/** The furthest the player can carry themselves across a hole, in metres. */
export const ROLL_M = (KNIGHT.roll.speed * KNIGHT.roll.time) / 100;

/** Every gap in a room that the player cannot cross. A room with one of these
 *  in it cannot be walked through, and no amount of art will fix that. */
export function impassable(room) {
  return gaps(profile(room)).filter(([a, b]) => b - a > ROLL_M);
}

export function drawAll() {
  return AREAS.map((a) => ({ id: a.id, ...drawArea(a.id) }));
}

export { profile, gaps, spots, PX, HERO_M, ROOM_M };

const asked = process.argv[2];
if (asked) {
  if (asked === 'all') {
    const all = drawAll();
    console.log(`${all.length} khu · ${all.reduce((a, r) => a + r.rooms, 0)} phòng -> dist/blockout-*.svg`);
  } else {
    const r = drawArea(asked);
    console.log(`${asked}: ${r.rooms} phòng -> dist/blockout-${asked}.svg (${W}x${r.height})`);
  }
}
