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
  knight: '#e8e4da',
  knightDark: '#9aa0ab',
  cloak: '#8f3b3b',
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

// --- the knight -----------------------------------------------------------

export function drawKnight(g, k, time) {
  const f = k.facing;
  const s = k.state;
  shadow(g, k.x, 34, 0.5);

  g.save();
  g.translate(k.x, GROUND);
  g.scale(f, 1);

  let lean = 0;
  let crouch = 0;
  let armAngle = -0.5;
  let bladeSpin = 0;
  const breathe = Math.sin(time * 2.4) * 1.4;

  if (s === 'walk') {
    lean = 0.12;
    crouch = Math.abs(Math.sin(time * 11)) * 3;
  }
  if (s === 'hurt') {
    lean = -0.4;
    crouch = 6;
  }
  if (s === 'stagger') {
    lean = -0.55;
    crouch = 10;
  }
  if (s === 'block') {
    crouch = 4;
    lean = 0.16;
  }

  if (s === 'roll') {
    // A ball: the whole figure tucks and spins, which is why it cannot be hit.
    const p = Math.min(1, k.time / KNIGHT.roll.time);
    g.translate(0, -22);
    g.rotate(p * TAU);
    g.fillStyle = PALETTE.cloak;
    g.beginPath();
    g.arc(0, 0, 20, 0, TAU);
    g.fill();
    g.fillStyle = PALETTE.knight;
    g.beginPath();
    g.arc(0, 0, 14, -0.6, 2.2);
    g.fill();
    limb(g, -16, -6, 18, 8, 4, PALETTE.knightDark);
    g.restore();
    return;
  }

  if (s === 'attack') {
    const sw = KNIGHT.swings[k.swing];
    const p = k.time / (sw.windup + sw.active + sw.recover);
    const wind = k.time < sw.windup ? k.time / sw.windup : 1;
    if (k.time < sw.windup) {
      armAngle = -0.5 - wind * 2.2;
      lean = -0.18 * wind;
    } else {
      const after = (k.time - sw.windup) / (sw.active + sw.recover);
      armAngle = -2.7 + after * 3.6;
      lean = 0.3 - after * 0.28;
      crouch = 3;
    }
    bladeSpin = p;
  }

  if (s === 'drink') {
    armAngle = -2.4;
    crouch = 5;
  }

  const hipY = -30 + crouch;
  const shoulderY = -54 + crouch;
  const headY = -66 + crouch + breathe * 0.3;

  // cloak: a trailing shape, so movement has weight
  g.save();
  g.rotate(lean * 0.5);
  g.fillStyle = PALETTE.cloak;
  g.beginPath();
  g.moveTo(-2, shoulderY);
  g.quadraticCurveTo(-24 - Math.sin(time * 3) * 4, hipY - 6, -14, -2);
  g.lineTo(4, -2);
  g.quadraticCurveTo(8, hipY, 4, shoulderY);
  g.closePath();
  g.fill();
  g.restore();

  // legs
  const stride = s === 'walk' ? Math.sin(time * 11) * 9 : 3;
  limb(g, 0, hipY, -stride, 0, 7, PALETTE.knightDark);
  limb(g, 0, hipY, stride, 0, 7, PALETTE.knight);

  // body
  g.save();
  g.rotate(lean);
  limb(g, 0, hipY, 0, shoulderY, 13, PALETTE.knight);

  // head with a crest
  g.fillStyle = PALETTE.knight;
  g.beginPath();
  g.arc(1, headY - hipY + hipY, 8, 0, TAU);
  g.fill();
  g.fillStyle = PALETTE.cloak;
  g.beginPath();
  g.moveTo(-1, headY - 7);
  g.quadraticCurveTo(-12, headY - 12, -14, headY + 2);
  g.quadraticCurveTo(-6, headY - 3, -1, headY - 3);
  g.fill();
  g.fillStyle = PALETTE.stone;
  g.fillRect(4, headY - 3, 6, 2.5);

  // shield arm
  if (s === 'block') {
    g.fillStyle = PALETTE.knightDark;
    g.beginPath();
    g.moveTo(10, shoulderY - 12);
    g.quadraticCurveTo(26, shoulderY + 2, 10, shoulderY + 20);
    g.closePath();
    g.fill();
  } else {
    limb(g, 0, shoulderY + 2, 9, shoulderY + 16, 5, PALETTE.knightDark);
  }

  // sword arm
  g.save();
  g.translate(2, shoulderY + 3);
  g.rotate(armAngle);
  limb(g, 0, 0, 20, 0, 5, PALETTE.knight);
  g.strokeStyle = PALETTE.knight;
  g.lineWidth = 3.5;
  g.beginPath();
  g.moveTo(20, 0);
  g.lineTo(66, 0);
  g.stroke();
  g.lineWidth = 6;
  g.strokeStyle = PALETTE.knightDark;
  g.beginPath();
  g.moveTo(18, -5);
  g.lineTo(18, 5);
  g.stroke();
  g.restore();

  // flask
  if (s === 'drink') {
    g.fillStyle = PALETTE.lantern;
    g.beginPath();
    g.arc(12, shoulderY - 8, 5, 0, TAU);
    g.fill();
  }
  g.restore();
  g.restore();

  // the arc of the blade, drawn in world space so it reads as a slash
  if (s === 'attack' && bladeSpin > 0.16 && bladeSpin < 0.62) {
    const a = (bladeSpin - 0.16) / 0.46;
    g.save();
    g.translate(k.x, GROUND - 51);
    g.scale(f, 1);
    g.strokeStyle = `rgba(255,255,255,${0.55 * (1 - a)})`;
    g.lineWidth = 7 * (1 - a) + 1;
    g.beginPath();
    g.arc(0, 0, 62, -2.3 + a * 2.2, -1.7 + a * 2.6);
    g.stroke();
    g.restore();
  }
}

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
