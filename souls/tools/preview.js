// tools/preview.js — what Godot will build, drawn without Godot.
//
// Godot is not installed in this environment, so the claim "the export is
// correct" was unverified. This file verifies it the only way available: it
// reads godot/data/*.json and NOTHING ELSE — not src/, not draw.js — and
// reconstructs the scene exactly as scripts/Room.gd and scripts/Game.gd
// construct it, node for node, colour for colour, through the same camera.
//
// If this picture is wrong, the export is wrong. That is the whole point: it
// is a check on the pipeline, not a second renderer.
//
//   node tools/preview.js undercroft 1

import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';

const data = (f) => JSON.parse(readFileSync(new URL(`../godot/data/${f}.json`, import.meta.url), 'utf8'));
const RULES = data('rules');
const WORLD = data('world');
const FOES = data('foes');

// Game.gd: viewport, camera position and zoom — read, not restated
const [VW, VH] = RULES.camera.viewport;
const ZOOM = RULES.camera.zoom;

const n = (v) => Number(v).toFixed(1);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
/** Godot Color(r,g,b) is linear 0..1; write it the way a browser wants it. */
const col = (r, g, b, a = 1) =>
  `rgba(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)},${a})`;
const lerp = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);

/** Room.gd.floor_at — how high the ground is at x, NaN over a hole. */
export function floorAt(terrain, x) {
  for (const run of runs(terrain)) {
    if (x < run[0][0] || x > run[run.length - 1][0]) continue;
    let prev = run[0];
    for (const p of run) {
      if (p[0] >= x) return prev[1];
      prev = p;
    }
    return run[run.length - 1][1];
  }
  return NaN;
}

/** Room.gd.standing_x — the nearest x to `from` with floor, either direction. */
export function standingX(terrain, from, width) {
  if (!Number.isNaN(floorAt(terrain, from))) return from;
  for (let step = 4; step < width; step += 4) {
    if (from - step > 0 && !Number.isNaN(floorAt(terrain, from - step))) return from - step;
    if (from + step < width && !Number.isNaN(floorAt(terrain, from + step))) return from + step;
  }
  return from;
}

/** Room.gd._runs — split the profile at its holes. */
export function runs(terrain) {
  const out = [];
  let cur = [];
  for (const p of terrain) {
    if (p === null) { if (cur.length >= 2) out.push(cur); cur = []; continue; }
    cur.push(p);
  }
  if (cur.length >= 2) out.push(cur);
  return out;
}

export function preview(areaId, index) {
  const rooms = WORLD.rooms.filter((r) => r.area === areaId);
  const room = rooms[index];
  if (!room) throw new Error(`${areaId} has no room ${index}`);

  const W = RULES.room_width;
  const UPM = RULES.units_per_metre;
  const out = [];
  const put = (s) => out.push(s);

  // Game.gd._light
  const lit = RULES.light_levels[room.light];
  const bg = lerp([0.04, 0.05, 0.07], [0.10, 0.12, 0.16], lit);

  const px0 = standingX(room.terrain, UPM * 2.2, W);
  const px = px0;
  // Game.gd parents the camera to the player and clamps it to the room
  const half = VW / ZOOM / 2;
  const camX = Math.min(Math.max(px, half), Math.max(half, W - half));
  const camY = RULES.camera.y * 0.4;
  const sx = (wx) => (wx - camX) * ZOOM + VW / 2;
  const sy = (wy) => (wy - camY) * ZOOM + VH / 2;

  put(`<svg xmlns="http://www.w3.org/2000/svg" width="${VW}" height="${VH}" viewBox="0 0 ${VW} ${VH}" font-family="ui-monospace,Menlo,monospace">`);
  put(`<rect width="${VW}" height="${VH}" fill="${col(...bg)}"/>`);

  // --- Room.gd._solid: Polygon2D + Line2D per run of unbroken floor --------
  const DEPTH = 260;
  for (const run of runs(room.terrain)) {
    const pts = [...run, [run[run.length - 1][0], DEPTH], [run[0][0], DEPTH]];
    put(`<polygon points="${pts.map(([px, py]) => `${n(sx(px))},${n(sy(py))}`).join(' ')}" fill="${col(0.12, 0.15, 0.20)}"/>`);
    put(`<polyline points="${run.map(([px, py]) => `${n(sx(px))},${n(sy(py))}`).join(' ')}" fill="none" stroke="${col(0.33, 0.40, 0.50)}" stroke-width="${n(3 * ZOOM)}"/>`);
  }
  // --- Room.gd._ledge ------------------------------------------------------
  for (const [lx0, lx1, ly] of room.ledges || []) {
    put(`<rect x="${n(sx(lx0))}" y="${n(sy(ly))}" width="${n((lx1 - lx0) * ZOOM)}" height="${n(14 * ZOOM)}" fill="${col(0.14, 0.17, 0.22)}"/>`);
    put(`<path d="M ${n(sx(lx0))} ${n(sy(ly))} L ${n(sx(lx1))} ${n(sy(ly))}" stroke="${col(0.36, 0.44, 0.55)}" stroke-width="${n(2.5 * ZOOM)}" fill="none"/>`);
  }

  // --- Room.gd._walls ------------------------------------------------------
  for (const wx of [-8, W + 8])
    put(`<rect x="${n(sx(wx - 8))}" y="${n(sy(-320))}" width="${n(16 * ZOOM)}" height="${n(640 * ZOOM)}" fill="${col(0.12, 0.15, 0.20)}" fill-opacity="0.9"/>`);

  // --- Game.gd._spawn_foes -------------------------------------------------
  const at = RULES.placement_by_kind[room.kind] || RULES.placement[room.layout];
  room.foes.forEach((id, i) => {
    const f = FOES[id];
    const tall = f.family === 'hound' ? 34 : 58;
    const fx = standingX(room.terrain, at[i % at.length] * UPM, W);
    const fy = floorAt(room.terrain, fx);
    put(`<rect x="${n(sx(fx - 13))}" y="${n(sy(fy - tall))}" width="${n(26 * ZOOM)}" height="${n(tall * ZOOM)}" fill="${col(0.78, 0.33, 0.25, 0.85)}"/>`);
    put(`<text x="${n(sx(fx))}" y="${n(sy(fy) + 16)}" font-size="11" fill="${col(0.78, 0.45, 0.38)}" text-anchor="middle">${esc(id)}</text>`);
    put(`<text x="${n(sx(fx))}" y="${n(sy(fy) + 30)}" font-size="10" fill="${col(0.5, 0.5, 0.55)}" text-anchor="middle">${f.hp}hp ${f.damage}dmg ${f.windup}s</text>`);
  });

  // --- Game.gd._spawn_player ----------------------------------------------
  const py = floorAt(room.terrain, px);
  put(`<rect x="${n(sx(px - 14))}" y="${n(sy(py - 68))}" width="${n(28 * ZOOM)}" height="${n(68 * ZOOM)}" fill="${col(0.49, 0.83, 0.91, 0.9)}"/>`);
  put(`<text x="${n(sx(px))}" y="${n(sy(py) + 18)}" font-size="11" fill="${col(0.49, 0.83, 0.91)}" text-anchor="middle">Người Thắp Đèn</text>`);

  // --- Game.gd._build_hud (CanvasLayer: screen space, no camera) -----------
  put(`<rect x="24" y="22" width="260" height="14" fill="${col(0.1, 0.05, 0.05)}"/>`);
  put(`<rect x="24" y="22" width="260" height="14" fill="${col(0.72, 0.24, 0.2)}"/>`);
  put(`<rect x="24" y="42" width="200" height="9" fill="${col(0.06, 0.09, 0.07)}"/>`);
  put(`<rect x="24" y="42" width="200" height="9" fill="${col(0.52, 0.68, 0.4)}"/>`);
  const cap = `${room.name ? room.name.vi : room.id} — ${room.line ? room.line.vi : ''}`;
  put(`<text x="24" y="674" font-size="15" fill="${col(0.78, 0.82, 0.88)}">${esc(cap)}</text>`);
  put(`<text x="${VW - 24}" y="40" font-size="11" fill="${col(0.42, 0.47, 0.55)}" text-anchor="end">${esc(room.id)} · ${room.kind} · ${room.light} · ${room.layout}</text>`);
  put(`<text x="${VW - 24}" y="56" font-size="10" fill="${col(0.34, 0.38, 0.45)}" text-anchor="end">preview dựng từ godot/data — không phải Godot chạy</text>`);
  put(`</svg>`);

  mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });
  const path = new URL(`../dist/godot-${areaId}-${index}.svg`, import.meta.url);
  writeFileSync(path, out.join('\n'));
  return { room: room.id, name: room.name ? room.name.vi : room.id, foes: room.foes.length, path: `dist/godot-${areaId}-${index}.svg` };
}

const area = process.argv[2];
if (area) {
  const which = process.argv[3];
  const rooms = WORLD.rooms.filter((r) => r.area === area);
  const list = which === undefined || which === 'all' ? rooms.map((_, i) => i) : [Number(which)];
  for (const i of list) {
    const r = preview(area, i);
    console.log(`${r.room} ${r.name} · ${r.foes} quái -> ${r.path}`);
  }
}
