// The look: silhouettes against a cold window, drawn as jointed figures so
// every state of the fight reads at a glance from across the room.
//
// Nothing here is a sprite sheet — the knight and the Warden are skeletons of
// a dozen line segments each, posed from the same state and timer the rules
// module is already tracking. That means an animation can never disagree with
// what the game thinks is happening, which is the usual source of a fight
// feeling "off".

import { KNIGHT } from './rules.js';

/** The floor line. High enough that the button row never hides anyone's feet. */
export const GROUND = 374;

export const PALETTE = {
  sky0: '#0d1016',
  sky1: '#171d27',
  glass: '#3a4a63',
  stone: '#0a0c11',
  floor: '#12151c',
  // The Lamplighter. A works hand in a coat, not a figure in plate — so the
  // body is the dull colour of wet canvas and the only bright thing on it is
  // the arm the kiln took, which has not gone out.
  coat: '#4a4b52',
  coatDark: '#2b2c33',
  canvas: '#6d6a63',
  clay: '#8d4a2c',
  crack: '#ff7a2f',
  crackHot: '#ffd9a0',
  brass: '#8a7245',
  cloak: '#3c3d45',
  warden: '#080a0e',
  wardenRim: '#4a5568',
  lantern: '#ffb347',
  warn: '#e0433a',
  heavy: '#ff7a2f',
  fire: '#ffb347',
};

const TAU = Math.PI * 2;

function limb(g, x1, y1, x2, y2, w, colour) {
  g.strokeStyle = colour;
  g.lineWidth = w;
  g.lineCap = 'round';
  g.beginPath();
  g.moveTo(x1, y1);
  g.lineTo(x2, y2);
  g.stroke();
}

// --- the room -------------------------------------------------------------

export function drawBackdrop(g, W, H, time, phase) {
  const sky = g.createLinearGradient(0, 0, 0, GROUND);
  sky.addColorStop(0, PALETTE.sky0);
  sky.addColorStop(1, PALETTE.sky1);
  g.fillStyle = sky;
  g.fillRect(0, 0, W, GROUND);

  // the window behind everything: the only real light in the room
  const cx = W * 0.5;
  const glow = g.createRadialGradient(cx, 150, 20, cx, 170, 300);
  glow.addColorStop(0, phase >= 2 ? 'rgba(255,150,80,.30)' : 'rgba(120,150,200,.22)');
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = glow;
  g.fillRect(0, 0, W, GROUND);

  g.fillStyle = phase >= 2 ? 'rgba(255,150,80,.13)' : 'rgba(120,150,200,.1)';
  for (let i = -1; i <= 1; i++) {
    const x = cx + i * 130;
    g.beginPath();
    g.moveTo(x - 42, 300);
    g.lineTo(x - 42, 120);
    g.quadraticCurveTo(x, 30, x + 42, 120);
    g.lineTo(x + 42, 300);
    g.closePath();
    g.fill();
  }

  // pillars, two ranks, the far ones paler — depth without a 3D engine
  for (const [depth, alpha] of [[0.55, 0.5], [1, 1]]) {
    g.fillStyle = depth < 1 ? 'rgba(10,12,17,.55)' : PALETTE.stone;
    const count = depth < 1 ? 7 : 5;
    for (let i = 0; i < count; i++) {
      const x = ((i + 0.5) / count) * W + (depth < 1 ? 40 : 0);
      const w = 26 * depth + 14;
      const top = 40 + (1 - depth) * 60;
      g.globalAlpha = alpha;
      g.fillRect(x - w / 2, top, w, GROUND - top);
      g.fillRect(x - w * 0.8, top, w * 1.6, 16);
      g.globalAlpha = 1;
    }
  }

  // floor
  g.fillStyle = PALETTE.floor;
  g.fillRect(0, GROUND, W, H - GROUND);
  g.strokeStyle = 'rgba(255,255,255,.045)';
  g.lineWidth = 1;
  for (let i = 0; i <= 14; i++) {
    const x = (i / 14) * W;
    g.beginPath();
    g.moveTo(x, GROUND);
    g.lineTo(x + (x - W / 2) * 0.5, H);
    g.stroke();
  }
  g.beginPath();
  g.moveTo(0, GROUND + 0.5);
  g.lineTo(W, GROUND + 0.5);
  g.strokeStyle = 'rgba(255,255,255,.12)';
  g.stroke();

  // ground fog
  const fog = g.createLinearGradient(0, GROUND - 40, 0, GROUND + 40);
  fog.addColorStop(0, 'rgba(120,140,170,0)');
  fog.addColorStop(0.5, 'rgba(120,140,170,.10)');
  fog.addColorStop(1, 'rgba(120,140,170,0)');
  g.fillStyle = fog;
  g.fillRect(0, GROUND - 40, W, 80);
}

/** A soft shadow so the figures are standing on the floor, not floating. */
function shadow(g, x, width, strength = 0.5) {
  g.save();
  g.translate(x, GROUND);
  g.scale(1, 0.18);
  const grad = g.createRadialGradient(0, 0, 2, 0, 0, width);
  grad.addColorStop(0, `rgba(0,0,0,${strength})`);
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.beginPath();
  g.arc(0, 0, width, 0, TAU);
  g.fill();
  g.restore();
}

// --- the Lamplighter ------------------------------------------------------
// Five rules, and the figure is wrong the moment it breaks one of them:
// taller than the frame wants and stooped; the coat reads as a cluster of
// hanging shapes rather than as cloth; one arm glows at the joints and the
// other does not; the pole is longer than the figure is tall; and nothing
// about it is symmetrical.

/** The lanterns hung off the coat. They are a backlog, not trophies, and they
 *  knock together when it walks, which is how a dark room knows it is coming. */
function lanterns(g, time, swing) {
  // deliberately uneven: an even row of them reads as a row of icons
  const hung = [
    [-13, -40, 5.5, 0.9], [-7, -25, 4, 1.7], [4, -34, 5, 0.4],
    [11, -22, 3.4, 2.3], [-17, -18, 4.4, 1.2], [9, -44, 3.8, 2.9],
  ];
  for (const [ox, oy, r, phase] of hung) {
    const sway = Math.sin(time * 3.1 + phase) * swing;
    g.strokeStyle = PALETTE.brass;
    g.lineWidth = 1.2;
    g.beginPath();
    g.moveTo(ox, oy - r * 2.4);
    g.lineTo(ox + sway, oy - r);
    g.stroke();
    g.fillStyle = PALETTE.coatDark;
    g.fillRect(ox + sway - r, oy - r, r * 2, r * 2.2);
    g.strokeStyle = PALETTE.brass;
    g.lineWidth = 1;
    g.strokeRect(ox + sway - r, oy - r, r * 2, r * 2.2);
  }
}

/** The arm the kiln kept. Fired clay from the elbow down, and the cracks in it
 *  are the only light the figure carries that it cannot put down. */
function clayArm(g, x1, y1, x2, y2, time, heat) {
  limb(g, x1, y1, x2, y2, 7, PALETTE.clay);
  const glow = 0.55 + Math.sin(time * 3.6) * 0.12 + heat * 0.4;
  g.strokeStyle = PALETTE.crack;
  g.globalAlpha = Math.min(1, glow);
  g.lineWidth = 2;
  g.beginPath();
  for (let i = 0; i < 4; i++) {
    const t0 = 0.1 + i * 0.22;
    const t1 = t0 + 0.14;
    g.moveTo(x1 + (x2 - x1) * t0, y1 + (y2 - y1) * t0 + (i % 2 ? 2 : -2));
    g.lineTo(x1 + (x2 - x1) * t1, y1 + (y2 - y1) * t1 + (i % 2 ? -1 : 1));
  }
  g.stroke();
  g.globalAlpha = 1;
  // the hand, and the heat sitting in the palm
  g.fillStyle = PALETTE.clay;
  g.beginPath();
  g.arc(x2, y2, 4.4, 0, TAU);
  g.fill();
  g.fillStyle = PALETTE.crackHot;
  g.globalAlpha = 0.4 + heat * 0.5;
  g.beginPath();
  g.arc(x2, y2, 2.4, 0, TAU);
  g.fill();
  g.globalAlpha = 1;
}

export function drawLamplighter(g, k, time) {
  const f = k.facing;
  const s = k.state;
  shadow(g, k.x, 34, 0.5);

  g.save();
  g.translate(k.x, GROUND);
  g.scale(f, 1);

  // stooped as a resting state, not only when it is doing something
  let lean = 0.16;
  let crouch = 0;
  let poleAngle = -1.15;
  let arc = 0;
  let heat = 0;
  const breathe = Math.sin(time * 2.2) * 1.2;
  let swing = 1.4;

  if (s === 'walk') { lean = 0.26; crouch = Math.abs(Math.sin(time * 9)) * 3; swing = 4.5; }
  if (s === 'hurt') { lean = -0.34; crouch = 6; swing = 6; }
  if (s === 'stagger') { lean = -0.5; crouch = 10; swing = 8; }
  if (s === 'block') { crouch = 4; lean = 0.3; poleAngle = -0.1; }

  if (s === 'roll') {
    // it does not tuck into a ball; it goes down and the coat comes over it
    const p = Math.min(1, k.time / KNIGHT.roll.time);
    g.translate(p * 14, -14 - Math.sin(p * Math.PI) * 10);
    g.rotate(Math.sin(p * Math.PI) * 0.9);
    g.fillStyle = PALETTE.cloak;
    g.beginPath();
    g.ellipse(0, 0, 24, 15, 0, 0, TAU);
    g.fill();
    g.fillStyle = PALETTE.coat;
    g.beginPath();
    g.ellipse(-4, -2, 15, 10, 0, 0, TAU);
    g.fill();
    lanterns(g, time, 7);
    g.restore();
    return;
  }

  if (s === 'attack') {
    const sw = KNIGHT.swings[k.swing];
    const p = k.time / (sw.windup + sw.active + sw.recover);
    const wind = k.time < sw.windup ? k.time / sw.windup : 1;
    if (k.time < sw.windup) {
      // the pole goes back and up, and it takes its time, because it is long
      poleAngle = -1.15 - wind * 1.5;
      lean = 0.16 - 0.3 * wind;
      heat = wind * 0.5;
    } else {
      const after = (k.time - sw.windup) / (sw.active + sw.recover);
      poleAngle = -2.65 + after * 3.1;
      lean = 0.42 - after * 0.24;
      crouch = 3;
      heat = 1 - after * 0.7;
    }
    arc = p;
    swing = 6;
  }

  if (s === 'drink') { poleAngle = -0.4; crouch = 5; lean = 0.34; }

  // taller than the knight was: hips and shoulders both sit higher
  const hipY = -33 + crouch;
  const shoulderY = -62 + crouch;
  const headY = -76 + crouch + breathe * 0.3;

  // the coat: one long ragged shape, hanging past the knees
  g.save();
  g.rotate(lean * 0.4);
  g.fillStyle = PALETTE.cloak;
  g.beginPath();
  g.moveTo(-3, shoulderY);
  g.quadraticCurveTo(-26 - Math.sin(time * 2.6) * 5, hipY - 4, -17, 1);
  g.lineTo(-8, -5);
  g.lineTo(-2, 1);
  g.lineTo(5, -6);
  g.lineTo(11, 0);
  g.quadraticCurveTo(13, hipY, 6, shoulderY);
  g.closePath();
  g.fill();
  g.restore();

  // legs — long, and the stride is uneven
  const stride = s === 'walk' ? Math.sin(time * 9) * 10 : 3;
  limb(g, 0, hipY, -stride, 0, 6.5, PALETTE.coatDark);
  limb(g, 1, hipY, stride * 0.86, 0, 6.5, PALETTE.coat);

  g.save();
  g.rotate(lean);

  // body
  limb(g, 0, hipY, 0, shoulderY, 12, PALETTE.coat);
  // the list, in the breast of the coat
  g.fillStyle = PALETTE.canvas;
  g.fillRect(-6, shoulderY + 10, 7, 9);

  // head: hooded, hung forward of the shoulders, no face given
  g.fillStyle = PALETTE.coatDark;
  g.beginPath();
  g.moveTo(-6, shoulderY + 2);
  g.quadraticCurveTo(-10, headY - 4, -1, headY - 9);
  g.quadraticCurveTo(9, headY - 6, 8, shoulderY + 1);
  g.closePath();
  g.fill();
  g.fillStyle = PALETTE.stone;
  g.beginPath();
  g.ellipse(3, headY + 1, 4.6, 5.2, 0.2, 0, TAU);
  g.fill();

  lanterns(g, time, swing);

  // the good hand, and the arm that is not a hand any more
  if (s === 'block') {
    g.fillStyle = PALETTE.coatDark;
    g.beginPath();
    g.moveTo(9, shoulderY - 10);
    g.quadraticCurveTo(24, shoulderY + 4, 9, shoulderY + 20);
    g.closePath();
    g.fill();
  }
  clayArm(g, 1, shoulderY + 6, 13, shoulderY + 20, time, heat);

  // the pole: longer than the figure is tall, held in the good hand
  g.save();
  g.translate(-1, shoulderY + 4);
  g.rotate(poleAngle);
  limb(g, 0, 0, 14, 0, 5, PALETTE.coat);
  g.strokeStyle = PALETTE.brass;
  g.lineWidth = 3;
  g.beginPath();
  g.moveTo(-34, 0);
  g.lineTo(92, 0);
  g.stroke();
  // the wick hook and the little cage at the far end
  g.strokeStyle = PALETTE.brass;
  g.lineWidth = 2;
  g.beginPath();
  g.arc(96, 0, 5, -1.6, 1.6);
  g.stroke();
  g.fillStyle = PALETTE.crack;
  g.globalAlpha = 0.35 + heat * 0.6;
  g.beginPath();
  g.arc(96, 0, 2.6, 0, TAU);
  g.fill();
  g.globalAlpha = 1;
  g.restore();

  if (s === 'drink') {
    g.fillStyle = PALETTE.lantern;
    g.beginPath();
    g.arc(12, shoulderY - 8, 5, 0, TAU);
    g.fill();
  }
  g.restore();
  g.restore();

  // the arc the pole leaves: wide and slow, because the weapon is a long stick
  if (s === 'attack' && arc > 0.16 && arc < 0.62) {
    const a = (arc - 0.16) / 0.46;
    g.save();
    g.translate(k.x, GROUND - 58);
    g.scale(f, 1);
    g.strokeStyle = `rgba(255,180,110,${0.5 * (1 - a)})`;
    g.lineWidth = 6 * (1 - a) + 1;
    g.beginPath();
    g.arc(0, 0, 88, -2.4 + a * 2.2, -1.8 + a * 2.6);
    g.stroke();
    g.restore();
  }
}

/** The sim still calls its player body the knight. It is not one any more. */
export const drawKnight = drawLamplighter;

// --- the Warden -----------------------------------------------------------

export function drawWarden(g, w, time) {
  const f = w.facing;
  shadow(g, w.x, 74, 0.6);

  let hunch = 0;
  let armSwing = -0.9;
  let lift = 0;
  const breathe = Math.sin(time * 1.4) * 3;

  if (w.state === 'attack' && w.move) {
    const m = w.move;
    if (w.time < m.windup) {
      const p = w.time / m.windup;
      // wind up: the arm goes back, the body coils
      if (m.id === 'slam') {
        armSwing = -0.9 - p * 2.0;
        lift = -p * 14;
      } else if (m.id === 'lunge') {
        armSwing = -0.4 - p * 0.6;
        hunch = p * 16;
      } else if (m.id === 'ember') {
        armSwing = -1.6 - p * 0.8;
        lift = -p * 8;
      } else {
        armSwing = -0.9 - p * 1.5;
        hunch = p * 8;
      }
    } else {
      const after = Math.min(1, (w.time - m.windup) / (m.active + m.recover));
      armSwing = (m.id === 'backhand' ? -2.4 + after * 3.4 : -2.6 + after * 3.9);
      hunch = 14 * (1 - after) + 6;
    }
  }
  if (w.state === 'stagger') {
    hunch = 26;
    armSwing = 0.5;
  }
  if (w.state === 'roar') {
    hunch = -10;
    armSwing = -2.4;
  }

  g.save();
  g.translate(w.x, GROUND + lift);
  g.scale(f, 1);

  const hipY = -74 + hunch;
  const shoulderY = -150 + hunch + breathe * 0.4;

  // The arm goes down first, so it hangs behind the body instead of being
  // drawn across the mask.
  drawArm(g, w, time, shoulderY, armSwing);

  // robe: one big silhouette, which is most of why it reads as huge
  g.fillStyle = PALETTE.warden;
  g.beginPath();
  g.moveTo(-52, 0);
  g.quadraticCurveTo(-34, hipY, -30, shoulderY + 12);
  g.quadraticCurveTo(0, shoulderY - 2, 34, shoulderY + 12);
  g.quadraticCurveTo(40, hipY, 58, 0);
  g.closePath();
  g.fill();

  // torn hem
  g.beginPath();
  g.moveTo(-52, 0);
  for (let i = 0; i <= 10; i++) {
    const x = -52 + (i / 10) * 110;
    g.lineTo(x, -8 - ((i % 2) * 9 + Math.sin(i + time) * 3));
    g.lineTo(x + 4.9, 0);
  }
  g.closePath();
  g.fill();

  // rim light down the leading edge, so it separates from the pillars
  g.strokeStyle = PALETTE.wardenRim;
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(34, shoulderY + 12);
  g.quadraticCurveTo(40, hipY, 58, 0);
  g.stroke();

  // head: a smooth mask with two lit slits
  g.fillStyle = PALETTE.warden;
  g.beginPath();
  g.ellipse(4, shoulderY - 14, 22, 27, -0.1, 0, TAU);
  g.fill();
  g.strokeStyle = PALETTE.wardenRim;
  g.lineWidth = 1.6;
  g.stroke();
  g.fillStyle = w.phase >= 2 ? '#ff8a3c' : '#8fb4e8';
  g.fillRect(8, shoulderY - 22, 13, 3.4);
  g.fillRect(6, shoulderY - 13, 11, 2.6);

  g.restore();
}

/** The long arm and the lantern on its chain, drawn behind the robe. */
function drawArm(g, w, time, shoulderY, armSwing) {
  g.save();
  g.translate(16, shoulderY + 14);
  g.rotate(armSwing);
  limb(g, 0, 0, 96, 0, 17, PALETTE.warden);
  limb(g, 0, 0, 96, 0, 9, 'rgba(74,85,104,.45)');

  const swing = Math.sin(time * 2.2) * 0.25;
  g.translate(96, 0);
  g.rotate(swing - armSwing);
  g.strokeStyle = PALETTE.wardenRim;
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(0, 0);
  g.lineTo(0, 26);
  g.stroke();

  const open = w.phase >= 2 ? 1 : 0.45;
  const flare = g.createRadialGradient(0, 36, 2, 0, 36, 60 * open);
  flare.addColorStop(0, `rgba(255,190,110,${0.8 * open})`);
  flare.addColorStop(1, 'rgba(255,150,60,0)');
  g.fillStyle = flare;
  g.beginPath();
  g.arc(0, 36, 60 * open, 0, TAU);
  g.fill();
  g.fillStyle = PALETTE.warden;
  g.strokeStyle = PALETTE.lantern;
  g.lineWidth = 2;
  g.beginPath();
  g.rect(-9, 26, 18, 22);
  g.fill();
  g.stroke();
  g.fillStyle = PALETTE.lantern;
  g.fillRect(-5, 30, 10, 14);
  g.restore();
}

// --- the warning ----------------------------------------------------------

/** The danger zone, painted on the floor while there is still time to move. */
export function drawTell(g, tell) {
  if (!tell) return;
  const [a, b] = tell.span;
  const colour = PALETTE[tell.colour] || PALETTE.warn;
  const p = Math.min(1, tell.ready);

  g.save();
  g.globalAlpha = 0.16 + p * 0.24;
  g.fillStyle = colour;
  g.beginPath();
  g.ellipse((a + b) / 2, GROUND + 4, (b - a) / 2, 15, 0, 0, TAU);
  g.fill();

  // a bar that fills as the swing gets closer: the "when", not just the "where"
  g.globalAlpha = 0.85;
  g.fillStyle = colour;
  g.fillRect(a, GROUND + 20, (b - a) * p, 3.5);
  g.globalAlpha = 0.3;
  g.fillRect(a, GROUND + 20, b - a, 3.5);

  g.globalAlpha = 0.5 + p * 0.5;
  g.strokeStyle = colour;
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(a, GROUND - 8);
  g.lineTo(a, GROUND + 14);
  g.moveTo(b, GROUND - 8);
  g.lineTo(b, GROUND + 14);
  g.stroke();
  g.restore();
}
