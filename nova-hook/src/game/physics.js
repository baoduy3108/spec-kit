// The entire game is one verb: attach, swing, release. This module owns the
// maths for that verb and stays free of rendering / DOM so it can be tested.

import { PLAYER, SWEET_HALF, VIEW, WALL } from './config.js';
import { TAU, angleDiff, clamp, norm, sign, wrapAngle } from '../core/mathx.js';

/**
 * Pick the anchor to grab. Prefers anchors the player is heading towards:
 * cheap "aim assist" that makes one-thumb play feel generous without
 * removing the timing skill. Anchors that are broken, or still cooling down
 * from a release, are skipped — otherwise holding the button would let you
 * farm perfect releases off a single anchor forever.
 *
 * @returns the chosen anchor or null.
 */
export function chooseAnchor(player, anchors, range = PLAYER.hookRange) {
  let best = null;
  let bestCost = Infinity;
  const dir = norm(player.vx, player.vy);
  for (const a of anchors) {
    if (a.broken || a.cool > 0) continue;
    const dx = a.x - player.x;
    const dy = a.y - player.y;
    const d = Math.hypot(dx, dy);
    if (d > range || d < 12) continue;
    const nd = norm(dx, dy);
    const facing = nd.x * dir.x + nd.y * dir.y; // 1 = dead ahead
    if (facing < -0.35) continue; // behind us: ignore
    const cost = d * (1.55 - facing * 0.55);
    if (cost < bestCost) {
      bestCost = cost;
      best = a;
    }
  }
  return best;
}

/**
 * Longest rope that keeps the whole orbit inside the shaft. Without this a
 * far grab near a wall would swing you straight through it.
 */
export function wallLimit(anchor) {
  const margin = PLAYER.r + 4;
  return Math.min(anchor.x - (WALL + margin), VIEW.W - WALL - margin - anchor.x);
}

/**
 * Build the tether state for a fresh attachment. Swing direction is whichever
 * way the player is already travelling, so grabbing never jerks you backwards.
 */
export function attach(player, anchor) {
  const dx = player.x - anchor.x;
  const dy = player.y - anchor.y;
  const max = Math.max(PLAYER.minRadius, Math.min(PLAYER.maxRadius, wallLimit(anchor)));
  const radius = clamp(Math.hypot(dx, dy), PLAYER.minRadius, max);
  const angle = Math.atan2(dy, dx);
  // cross(radial, velocity) > 0 => counter-clockwise
  const cross = dx * player.vy - dy * player.vx;
  return { anchor, radius, angle, dir: sign(cross), turns: 0 };
}

/** Unit tangent at `angle` for a swing spinning in `dir`. */
export function tangentAt(angle, dir) {
  return { x: -Math.sin(angle) * dir, y: Math.cos(angle) * dir };
}

/**
 * The angle whose release tangent points along `target`.
 * Only used as a fallback when the target sits inside the orbit.
 */
export function sweetAngle(targetX, targetY, dir) {
  const t = norm(targetX, targetY);
  // tangent(a) = (-sin a, cos a) * dir  =>  a = atan2(t.x * -dir, t.y * dir)
  return Math.atan2(-t.x * dir, t.y * dir);
}

/**
 * The release angle that fires the player *from the orbit* straight into
 * (tx, ty) — i.e. the tangent point of the line from the target to the swing
 * circle. Aiming from the anchor instead would miss by up to a rope length,
 * so this is what makes a PERFECT actually land on the next anchor.
 */
export function releaseAngleFor(anchor, radius, dir, tx, ty) {
  const dx = tx - anchor.x;
  const dy = ty - anchor.y;
  const d = Math.hypot(dx, dy);
  if (d <= radius + 1e-6) return sweetAngle(dx, dy, dir);

  const phi = Math.atan2(dy, dx);
  const alpha = Math.acos(clamp(radius / d, -1, 1));
  let best = phi + alpha;
  let bestDot = -Infinity;
  // Two tangent points; take the one the swing is actually travelling towards.
  for (const th of [phi + alpha, phi - alpha]) {
    const px = anchor.x + Math.cos(th) * radius;
    const py = anchor.y + Math.sin(th) * radius;
    const t = tangentAt(th, dir);
    const dot = t.x * (tx - px) + t.y * (ty - py);
    if (dot > bestDot) {
      bestDot = dot;
      best = th;
    }
  }
  return wrapAngle(best);
}

export function isPerfect(angle, sweet, half = SWEET_HALF) {
  return Math.abs(angleDiff(angle, sweet)) <= half;
}

/**
 * Advance one swing step. Constant linear speed, so a tighter rope spins
 * faster — reeling in is the risk/reward dial.
 *
 * Mutates nothing: returns the next tether state plus a `snapped` flag set
 * when the anchor overwinds.
 */
export function stepSwing(tether, speed, dt, reel = true) {
  const radius = reel
    ? Math.max(PLAYER.minRadius, tether.radius - PLAYER.reelRate * dt)
    : tether.radius;
  const omega = (speed / radius) * tether.dir;
  const angle = wrapAngle(tether.angle + omega * dt);
  const turns = tether.turns + Math.abs(omega * dt) / TAU;
  return {
    anchor: tether.anchor,
    radius,
    angle,
    dir: tether.dir,
    turns,
    snapped: turns >= PLAYER.maxTurns,
  };
}

/** World position of the player for a given tether state. */
export function swingPosition(tether) {
  return {
    x: tether.anchor.x + Math.cos(tether.angle) * tether.radius,
    y: tether.anchor.y + Math.sin(tether.angle) * tether.radius,
  };
}

/** Velocity the player leaves with when the tether lets go. */
export function releaseVelocity(tether, speed) {
  const t = tangentAt(tether.angle, tether.dir);
  return { vx: t.x * speed, vy: t.y * speed };
}
