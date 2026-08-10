// The knight, drawn once and properly, in every state the fight actually has.
//
// The poses are not invented — each one is a state in `rules.js`, and the
// frame counts under each pose are that state's real timings at 60fps. So the
// sheet is a picture of the simulation rather than a picture next to it, and
// if someone retunes a swing the caption moves with it.
//
// Two things came out of reading how published 2D souls-like knight sheets
// are built (Fallen Knight, Ocean Knight, 2D Soulslike Knight): the attack is
// always the frame-heavy one — 21 to 27 frames for a combo where an idle gets
// 4 to 12 — and the swing does not snap back. The arm travels past the strike,
// slows, and returns. That is the same law this fight already runs on, where
// recovery is longer than the active frames for every attack in the game, so
// the poses are drawn with the follow-through rather than the impact as the
// biggest shape.
//
//   node tools/knight.js  ->  dist/knight.svg

import { mkdirSync, writeFileSync } from 'node:fs';
import { KNIGHT } from '../src/rules.js';

const CELL = 300;
const COLS = 4;
const GROUND = 250;

const P = {
  bg: '#0a0c10',
  cell: '#12171e',
  edge: '#2c3a4a',
  // fired clay, not plate. "The sword was fired, not forged. So were you."
  clay: '#6b4a38',
  clayDark: '#412a20',
  clayLit: '#8a5f45',
  cloth: '#2f3b46',
  clothDark: '#1e262e',
  steel: '#9aa8b6',
  steelDim: '#6b7885',
  ink: '#c7d2dd',
  dim: '#7b8794',
  gold: '#d8a34a',
  ember: '#ff7a2f',
  emberCore: '#ffd39a',
  blood: '#8d3b34',
};

// A generic knight in grey plate is every game's knight. This one has two
// things nothing else has, and both were already written down: it is a fired
// body with the kiln still showing through its cracks, and it carries an
// unlit lantern it has come all this way to light. The lantern is also the
// guard — it never goes down, which is the whole ending in one prop.
const P_plate = P.clay;

const out = [];
const put = (s) => out.push(s);
const N = (v) => Number(v).toFixed(1);

const bone = (x1, y1, x2, y2, w, col) =>
  put(`<line x1="${N(x1)}" y1="${N(y1)}" x2="${N(x2)}" y2="${N(y2)}" stroke="${col}" stroke-width="${N(w)}" stroke-linecap="round"/>`);

/**
 * One knight. Everything is driven off a small pose object so a state is a
 * set of numbers rather than a separate drawing — the same reason the game's
 * renderer poses from the rules' own timers.
 */
function knight(cx, ground, pose, cell) {
  const s = 1;
  const {
    lean = 0, // torso tilt, degrees
    crouch = 0, // how far the hips drop
    frontArm = -35, // shoulder angle of the sword arm, degrees from vertical
    elbow = 40, // elbow bend
    backArm = 25, // shield arm
    stride = 0, // feet apart
    swordTip = null, // override: draw the blade towards a point
    shield = true,
    head = 0, // head tilt
    fade = 1,
    flaskMain = false, // a flask in the sword hand, so the lantern arm is free
    dropped = false, // the sword on the floor instead of in the hand
  } = pose;

  const hipY = ground - 78 + crouch;
  const shY = hipY - 46;
  const rad = (d) => (d * Math.PI) / 180;
  const hipX = cx + Math.sin(rad(lean)) * 6;
  const shX = cx + Math.sin(rad(lean)) * 26;

  put(`<g opacity="${fade}">`);
  // shadow
  put(`<ellipse cx="${N(cx)}" cy="${N(ground + 3)}" rx="${N(34 - crouch * 0.2)}" ry="7" fill="#000" fill-opacity="0.45"/>`);

  // back leg then front leg, so the front reads nearer
  bone(hipX - 4, hipY, hipX - 10 - stride, ground - 22, 13, P.clayDark);
  bone(hipX - 10 - stride, ground - 22, hipX - 13 - stride, ground, 11, P.clayDark);
  bone(hipX + 4, hipY, hipX + 8 + stride, ground - 22, 14, P.clay);
  bone(hipX + 8 + stride, ground - 22, hipX + 12 + stride, ground, 12, P.clay);
  // sabatons
  put(`<path d="M ${N(hipX + 6 + stride)} ${N(ground)} l 26 0 l -3 -7 l -21 0 Z" fill="${P.clay}"/>`);
  put(`<path d="M ${N(hipX - 19 - stride)} ${N(ground)} l 24 0 l -2 -6 l -20 0 Z" fill="${P.clayDark}"/>`);

  // surcoat, hanging from the hip, tilted with the torso
  put(
    `<path d="M ${N(hipX - 17)} ${N(hipY - 6)} q ${N(17)} ${N(8)} ${N(34)} 0 l ${N(6)} ${N(34)} q ${N(-23)} ${N(9)} ${N(-46)} 0 Z" fill="${P.cloth}"/>`,
  );
  put(
    `<path d="M ${N(hipX + 2)} ${N(hipY - 4)} l ${N(15)} ${N(2)} l ${N(6)} ${N(34)} q ${N(-11)} ${N(4)} ${N(-22)} ${N(4)} Z" fill="${P.clothDark}"/>`,
  );

  // torso: a cuirass, narrower at the waist
  put(
    `<path d="M ${N(shX - 20)} ${N(shY + 2)} q ${N(20)} ${N(-9)} ${N(40)} 0 l ${N(-5)} ${N(30)} q ${N(-2)} ${N(9)} ${N(-15)} ${N(12)} q ${N(-13)} ${N(-3)} ${N(-15)} ${N(-12)} Z" fill="${P.clay}"/>`,
  );
  put(
    `<path d="M ${N(shX + 6)} ${N(shY - 2)} q ${N(10)} ${N(2)} ${N(14)} ${N(4)} l ${N(-5)} ${N(30)} q ${N(-2)} ${N(9)} ${N(-13)} ${N(12)} Z" fill="${P.clayDark}"/>`,
  );
  // the kiln still showing through
  for (const [ax, ay, bx2, by2] of [
    [-10, 6, -3, 20],
    [-3, 20, 6, 28],
    [8, 4, 3, 16],
    [4, 30, 12, 40],
  ]) {
    bone(shX + ax, shY + ay, shX + bx2, shY + by2, 2.2, P.ember);
  }
  put(`<ellipse cx="${N(shX + 1)}" cy="${N(shY + 22)}" rx="22" ry="26" fill="${P.ember}" fill-opacity="0.1"/>`);

  // shield arm
  const ba = rad(backArm + lean);
  const bx = shX - 17 + Math.sin(ba) * 22;
  const by = shY + 10 + Math.cos(ba) * 22;
  bone(shX - 17, shY + 8, bx, by, 11, P.clayDark);
  if (shield) {
    // the lantern. It is not lit — lighting it is the entire journey — and it
    // is what you guard with, because the carrier never puts it down.
    const sx = bx - 11;
    const sy = by + 6;
    bone(bx, by, sx, sy - 22, 8, P.clay); // the hand on the ring
    put(`<path d="M ${N(sx)} ${N(sy - 26)} q 9 4 9 11" fill="none" stroke="${P.steelDim}" stroke-width="2.4"/>`);
    put(`<path d="M ${N(sx - 11)} ${N(sy - 15)} l 22 0 l 3 26 l -28 0 Z" fill="#0a0d12" stroke="${P.steelDim}" stroke-width="2.4"/>`);
    put(`<path d="M ${N(sx - 13)} ${N(sy - 15)} l 26 0 l -4 -6 l -18 0 Z" fill="${P.steelDim}"/>`);
    put(`<rect x="${N(sx - 12)}" y="${N(sy + 11)}" width="26" height="5" fill="${P.steelDim}"/>`);
    put(`<line x1="${N(sx)}" y1="${N(sy - 15)}" x2="${N(sx + 1)}" y2="${N(sy + 11)}" stroke="${P.steelDim}" stroke-width="1.6"/>`);
  }

  // sword arm: shoulder, elbow, then the blade
  const fa = rad(frontArm + lean);
  const ex = shX + 16 + Math.sin(fa) * 26;
  const ey = shY + 8 + Math.cos(fa) * 26;
  const ha = rad(frontArm + elbow + lean);
  const hx = ex + Math.sin(ha) * 24;
  const hy = ey + Math.cos(ha) * 24;
  bone(shX + 16, shY + 6, ex, ey, 12, P.clay);
  bone(ex, ey, hx, hy, 10, P.clay);

  if (dropped) {
    // fallen, point away, where the essence stays
    put(`<path d="M ${N(cx + 6)} ${N(ground - 5)} L ${N(cx + 74)} ${N(ground - 11)} L ${N(cx + 80)} ${N(ground - 8)} L ${N(cx + 74)} ${N(ground - 4)} L ${N(cx + 6)} ${N(ground - 1)} Z" fill="${P.steel}"/>`);
    put(`<rect x="${N(cx + 2)}" y="${N(ground - 11)}" width="5" height="13" fill="${P.steelDim}"/>`);
    put(`</g>`);
    return;
  }
  if (flaskMain) {
    put(`<path d="M ${N(hx - 7)} ${N(hy - 5)} l 14 0 l 4 18 q -11 6 -21 0 Z" fill="${P.clothDark}" stroke="${P.gold}" stroke-width="2"/>`);
    put(`<rect x="${N(hx - 3)}" y="${N(hy - 14)}" width="6" height="10" fill="${P.steelDim}"/>`);
    put(`</g>`);
    return;
  }
  let tip = swordTip || { x: hx + Math.sin(ha) * 60, y: hy + Math.cos(ha) * 60 };
  if (cell) {
    // shorten the blade rather than move the hand: the pose is the truth, the
    // blade length is the thing that can give
    const pad = 12;
    const lo = { x: cell.x + pad, y: cell.y + pad };
    const hi = { x: cell.x + cell.w - pad, y: cell.y + cell.h - pad };
    let k = 1;
    for (const [v, min, max, h] of [
      [tip.x, lo.x, hi.x, hx],
      [tip.y, lo.y, hi.y, hy],
    ]) {
      if (v < min) k = Math.min(k, (min - h) / (v - h));
      if (v > max) k = Math.min(k, (max - h) / (v - h));
    }
    if (k < 1) tip = { x: hx + (tip.x - hx) * k, y: hy + (tip.y - hy) * k };
  }
  // crossguard, grip, blade
  const dx = tip.x - hx;
  const dy = tip.y - hy;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  bone(hx - nx * 11, hy - ny * 11, hx + nx * 11, hy + ny * 11, 5, P.steelDim);
  // a blade with a width at the guard and a short taper at the point, rather
  // than a triangle that comes to nothing
  const bt = { x: tip.x - (dx / len) * 11, y: tip.y - (dy / len) * 11 };
  put(
    `<path d="M ${N(hx + nx * 6)} ${N(hy + ny * 6)} L ${N(bt.x + nx * 4.5)} ${N(bt.y + ny * 4.5)} L ${N(tip.x)} ${N(tip.y)} L ${N(bt.x - nx * 4.5)} ${N(bt.y - ny * 4.5)} L ${N(hx - nx * 6)} ${N(hy - ny * 6)} Z" fill="${P.steel}"/>`,
  );
  bone(hx, hy, bt.x, bt.y, 1.2, '#dfe8f0');
  bone(hx, hy, hx - (dx / len) * 16, hy - (dy / len) * 16, 6, '#3a2f27');

  // head: a bucket helm, hung slightly forward, with a sight slit
  const hdx = shX + Math.sin(rad(lean + head)) * 12;
  const hdy = shY - 16;
  // a deep hood with nothing in it but two coals
  put(
    `<path d="M ${N(hdx - 16)} ${N(hdy + 15)} q ${N(-5)} ${N(-30)} ${N(16)} ${N(-33)} q ${N(21)} ${N(3)} ${N(16)} ${N(33)} q ${N(-16)} ${N(7)} ${N(-32)} 0 Z" fill="${P.cloth}"/>`,
  );
  put(`<path d="M ${N(hdx - 11)} ${N(hdy + 8)} q ${N(-2)} ${N(-19)} ${N(11)} ${N(-21)} q ${N(13)} ${N(2)} ${N(11)} ${N(21)} q ${N(-11)} ${N(5)} ${N(-22)} 0 Z" fill="#05070a"/>`);
  for (const off of [-4.5, 4.5]) {
    put(`<circle cx="${N(hdx + off)}" cy="${N(hdy - 1)}" r="4.6" fill="${P.ember}" fill-opacity="0.3"/>`);
    put(`<circle cx="${N(hdx + off)}" cy="${N(hdy - 1)}" r="1.9" fill="${P.emberCore}"/>`);
  }
  // the hood falls to the shoulders behind
  put(`<path d="M ${N(hdx - 15)} ${N(hdy + 6)} q ${N(-12)} ${N(18)} ${N(1)} ${N(26)} l ${N(12)} ${N(-6)} Z" fill="${P.clothDark}"/>`);
  put(`</g>`);
}

const frames = (seconds) => Math.max(1, Math.round(seconds * 60));

// Every pose is a state the fight has, with its real numbers under it.
const POSES = [
  {
    id: 'idle',
    name: { en: 'Idle', vi: 'Thủ thế' },
    note: 'guard low, weight back',
    frames: 4,
    detail: 'a 4-frame breath, the cheapest loop in the sheet',
    pose: { frontArm: -20, elbow: 55, backArm: 22, stride: 3, head: 4 },
  },
  {
    id: 'walk',
    name: { en: 'Walk', vi: 'Bước' },
    note: `${KNIGHT.speed} units/s`,
    frames: 6,
    detail: 'six frames, the published sheets all land on six for locomotion',
    pose: { frontArm: -14, elbow: 62, backArm: 30, stride: 15, lean: 4 },
  },
  {
    id: 'swing1-windup',
    name: { en: 'Swing 1 · wind-up', vi: 'Chém 1 · lấy đà' },
    note: `${KNIGHT.swings[0].windup}s`,
    frames: frames(KNIGHT.swings[0].windup),
    detail: 'blade back and up; this is the frame the Warden gets to read',
    pose: { frontArm: -150, elbow: -20, backArm: 10, lean: -8, stride: 8, head: -4 },
  },
  {
    id: 'swing1-active',
    name: { en: 'Swing 1 · live', vi: 'Chém 1 · trúng' },
    note: `${KNIGHT.swings[0].active}s · ${KNIGHT.swings[0].damage} dmg`,
    frames: frames(KNIGHT.swings[0].active),
    detail: 'the shortest pose in the whole sheet, and the only one that hurts',
    pose: { frontArm: 62, elbow: 18, backArm: 40, lean: 12, stride: 18 },
  },
  {
    id: 'swing1-recover',
    name: { en: 'Swing 1 · recovery', vi: 'Chém 1 · thu đòn' },
    note: `${KNIGHT.swings[0].recover}s`,
    frames: frames(KNIGHT.swings[0].recover),
    detail: 'travels past the strike, slows, returns — twice the live frames',
    pose: { frontArm: 96, elbow: 30, backArm: 34, lean: 16, stride: 12, head: 8 },
  },
  {
    id: 'swing2-active',
    name: { en: 'Swing 2 · live', vi: 'Chém 2 · trúng' },
    note: `${KNIGHT.swings[1].active}s · ${KNIGHT.swings[1].damage} dmg`,
    frames: frames(KNIGHT.swings[1].active),
    detail: 'the committing one: more damage, and a recovery you cannot cancel',
    pose: { frontArm: 78, elbow: 8, backArm: 52, lean: 18, stride: 24, head: 6 },
  },
  {
    id: 'roll',
    name: { en: 'Roll', vi: 'Lăn' },
    note: `${KNIGHT.roll.time}s · i-frames ${KNIGHT.roll.iFrom}–${KNIGHT.roll.iTo}s`,
    frames: frames(KNIGHT.roll.time),
    detail: 'invulnerable for the middle 0.25s, vulnerable either side of it',
    pose: { crouch: 62, lean: 62, frontArm: 150, elbow: 70, backArm: 150, stride: -4, head: 34, shield: true },
  },
  {
    id: 'block',
    name: { en: 'Block', vi: 'Đỡ' },
    note: `parry window ${KNIGHT.parry.window}s`,
    frames: 10,
    detail: 'the first 0.3s of this pose is a parry, and nothing else is',
    pose: { frontArm: -6, elbow: 74, backArm: -14, stride: 10, lean: -6, crouch: 6 },
  },
  {
    id: 'drink',
    name: { en: 'Drink', vi: 'Uống' },
    note: `${KNIGHT.drink.time}s · +${KNIGHT.drink.heal} hp`,
    frames: frames(KNIGHT.drink.time),
    detail: 'nearly a second standing still, which is the whole cost of healing',
    pose: { frontArm: -150, elbow: 60, backArm: 20, stride: 6, head: -12, lean: -4, flaskMain: true },
  },
  {
    id: 'hurt',
    name: { en: 'Hurt', vi: 'Trúng đòn' },
    note: `${KNIGHT.hurt}s`,
    frames: frames(KNIGHT.hurt),
    detail: 'short, because a long flinch would make crowds unsurvivable',
    pose: { lean: -22, frontArm: -70, elbow: 30, backArm: -40, stride: 8, head: -16 },
  },
  {
    id: 'stagger',
    name: { en: 'Guard broken', vi: 'Vỡ thế thủ' },
    note: `${KNIGHT.stagger}s`,
    frames: frames(KNIGHT.stagger),
    detail: 'the price of hiding behind the shield with no stamina left',
    pose: { lean: -34, crouch: 26, frontArm: -100, elbow: 10, backArm: -70, stride: 20, head: -26 },
  },
  {
    id: 'death',
    name: { en: 'Death', vi: 'Chết' },
    note: 'and the essence stays where you fell',
    frames: 16,
    detail: 'the longest animation in the sheet, because you will see it most',
    // The sword falls. The lantern does not — still in the off hand, unlit,
    // the one thing this figure has never let go of.
    pose: { lean: -46, crouch: 66, frontArm: 118, elbow: 46, backArm: -50, stride: 26, head: -44, fade: 0.85, dropped: true },
  },
];

const rows = Math.ceil(POSES.length / COLS);
const W = COLS * CELL + 60;
const H = rows * CELL + 190;

put(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Georgia,serif">`);
put(`<rect width="${W}" height="${H}" fill="${P.bg}"/>`);
put(`<text x="30" y="58" font-size="32" fill="#e8dcc8" letter-spacing="2">NGƯỜI CẦM ĐÈN</text>`);
put(`<text x="30" y="86" font-size="14" fill="${P.dim}">The knight — every state the fight has, posed from its own numbers at 60fps</text>`);
put(`<text x="30" y="108" font-size="12.5" fill="#5f6b78">Recovery is longer than the live frames in both swings. That is the law the whole game runs on, and it is visible here as a pose.</text>`);
put(`<line x1="30" y1="126" x2="${W - 30}" y2="126" stroke="${P.edge}"/>`);

POSES.forEach((p, i) => {
  const x = 30 + (i % COLS) * CELL;
  const y = 150 + Math.floor(i / COLS) * CELL;
  put(`<rect x="${x}" y="${y}" width="${CELL - 16}" height="${CELL - 26}" rx="4" fill="${P.cell}" stroke="${P.edge}"/>`);
  put(`<line x1="${x + 20}" y1="${y + GROUND - 46}" x2="${x + CELL - 36}" y2="${y + GROUND - 46}" stroke="${P.edge}" stroke-width="1.5" stroke-opacity="0.7"/>`);
  knight(x + (CELL - 16) / 2, y + GROUND - 46, p.pose, { x, y: y + 52, w: CELL - 16, h: CELL - 100 });
  put(`<text x="${x + 14}" y="${y + 26}" font-size="15.5" fill="${P.ink}">${p.name.vi}</text>`);
  put(`<text x="${x + CELL - 30}" y="${y + 26}" text-anchor="end" font-size="11" fill="${P.gold}" font-family="ui-monospace,monospace">${p.frames}f</text>`);
  put(`<text x="${x + 14}" y="${y + 44}" font-size="11.5" fill="${P.dim}">${p.name.en} · ${p.note}</text>`);
  const words = p.detail.split(' ');
  const lines = [''];
  for (const word of words) {
    const line = lines[lines.length - 1];
    if ((line + ' ' + word).trim().length > 44) lines.push(word);
    else lines[lines.length - 1] = (line + ' ' + word).trim();
  }
  lines.forEach((line, n) => {
    put(`<text x="${x + 14}" y="${y + CELL - 52 + n * 14}" font-size="11" fill="#6a7684" font-style="italic">${line}</text>`);
  });
});

put(`</svg>`);

mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });
writeFileSync(new URL('../dist/knight.svg', import.meta.url), out.join('\n'));
console.log(`knight: ${POSES.length} poses -> dist/knight.svg (${W}x${H})`);
console.log(
  `swing 1: windup ${frames(KNIGHT.swings[0].windup)}f · live ${frames(KNIGHT.swings[0].active)}f · recover ${frames(KNIGHT.swings[0].recover)}f`,
);
