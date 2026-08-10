// A render gate for the drawing tool.
//
// The idea is img2threejs's, and it is the answer to "is there no repo that
// can draw well": that skill builds its models in code and does not generate
// any art at all. What makes its output good is that a deterministic
// evaluator scores every render before a human is asked to look, hard gates
// route straight to a fix, and the correction loop is bounded so it cannot
// burn forever. That machinery needs no image generator, so it is the one
// piece of all these repositories that works in this environment today.
//
// So: three defects got past me into the first undercroft sheet — hounds that
// were invisible against a dark cave, figures at a third of the size the
// rooms needed, and a forearm drawn across the chest. I found them by eye,
// on the second and third look. This finds them on the first, every time.
//
// Zero dependencies, including the PNG decode: node has zlib, and a PNG is a
// zlib stream plus five filter modes.
//
//   node tools/eye.js dist/area-undercroft.png undercroft

import { existsSync, readFileSync } from 'node:fs';
import { inflateSync } from 'node:zlib';
import { AREAS, ROOMS } from '../src/world.js';

// --- the smallest PNG reader that can read a screenshot -------------------
export function readPng(path) {
  const buf = readFileSync(path);
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error(`${path} is not a PNG`);
  let pos = 8;
  let head = null;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const body = buf.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      head = {
        width: body.readUInt32BE(0),
        height: body.readUInt32BE(4),
        depth: body[8],
        colour: body[9],
        interlace: body[12],
      };
    } else if (type === 'IDAT') idat.push(body);
    else if (type === 'IEND') break;
    pos += 12 + len;
  }
  if (head.depth !== 8) throw new Error(`only 8-bit PNGs (got ${head.depth})`);
  if (head.interlace) throw new Error('interlaced PNGs are not supported');
  const channels = { 0: 1, 2: 3, 4: 2, 6: 4 }[head.colour];
  if (!channels) throw new Error(`unsupported colour type ${head.colour}`);

  const raw = inflateSync(Buffer.concat(idat));
  const stride = head.width * channels;
  const out = Buffer.alloc(stride * head.height);
  let prev = Buffer.alloc(stride);
  for (let y = 0; y < head.height; y++) {
    const filter = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const cur = Buffer.from(line);
    for (let i = 0; i < stride; i++) {
      const a = i >= channels ? cur[i - channels] : 0;
      const b = prev[i];
      const c = i >= channels ? prev[i - channels] : 0;
      if (filter === 1) cur[i] = (cur[i] + a) & 255;
      else if (filter === 2) cur[i] = (cur[i] + b) & 255;
      else if (filter === 3) cur[i] = (cur[i] + ((a + b) >> 1)) & 255;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        cur[i] = (cur[i] + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 255;
      }
    }
    cur.copy(out, y * stride);
    prev = cur;
  }
  return { width: head.width, height: head.height, channels, data: out };
}

const luma = (img, x, y) => {
  const i = (y * img.width + x) * img.channels;
  return 0.2126 * img.data[i] + 0.7152 * img.data[i + 1] + 0.0722 * img.data[i + 2];
};

// --- the panel geometry the drawing tool uses -----------------------------
const W = 1240;
const PANEL = 430;
const HEAD = 150;
const MARGIN = 40;
const ART_H = PANEL - 66;

/**
 * Per-figure signals. The first version of this averaged a whole panel, and
 * it passed the very render it was written to catch: two hounds drawn in the
 * colour of the cave took the kennel from 6.9% ink to 2.2% and the gate said
 * ok, because two vanished creatures barely move a mean over 200,000 pixels.
 *
 * So it measures each figure inside the box the renderer says it drew it in,
 * against a ring just outside that box. That is img2threejs's rule about
 * visible footprints: score the thing where it actually is, not across a
 * frame that dilutes it.
 */
export function measureFigure(img, mark) {
  const { x, y, w, h } = mark.box;
  const inside = [];
  const ring = [];
  const lo = { x: Math.max(0, x), y: Math.max(0, y) };
  const hi = { x: Math.min(img.width - 1, x + w), y: Math.min(img.height - 1, y + h) };
  for (let py = lo.y; py < hi.y; py++) {
    for (let px = lo.x; px < hi.x; px++) inside.push(luma(img, px, py));
  }
  const pad = 26;
  for (let py = Math.max(0, y - pad); py < Math.min(img.height - 1, y + h + pad); py++) {
    for (let px = Math.max(0, x - pad); px < Math.min(img.width - 1, x + w + pad); px++) {
      if (px >= x && px < x + w && py >= y && py < y + h) continue;
      ring.push(luma(img, px, py));
    }
  }
  const mean = (a) => a.reduce((s, v) => s + v, 0) / Math.max(1, a.length);
  const bg = mean(ring);
  // ink = pixels inside the box that differ from the surrounding room
  const ink = inside.filter((v) => Math.abs(v - bg) > 12).length / Math.max(1, inside.length);
  // and how far the figure's own extreme goes from that room
  const far = inside.reduce((best, v) => Math.max(best, Math.abs(v - bg)), 0);
  return {
    room: mark.room,
    foe: mark.foe,
    ink: Number(ink.toFixed(4)),
    contrast: Number(far.toFixed(1)),
  };
}

/**
 * Hard gate: local contrast, and only that.
 *
 * Ink was tried first and thrown out on measurement. Both renders were scored
 * figure by figure, and the accepted sheet's weakest figure — a husk in a warm
 * hall — sits at 2.1% ink, while the broken sheet's invisible hounds sit at
 * 5.1%. Ink ranks the bug above the thing that is fine, because it is partly
 * measuring the halo the renderer paints behind a figure in a dark room, not
 * the figure. A signal that inverts on the one case it exists for is not a
 * signal, so it is reported and never gated on.
 *
 * Contrast separates properly:
 *
 *     accepted sheet   46.5  52.7  54.5  108  112  113  122  212
 *     bug reintroduced   36   36.7  40.7  45.5 46.5 46.5 55.1 212
 *
 * The invisible hounds are the 36s. The line goes at 42: below every accepted
 * figure by 10%, above the real failure by 14%. That is a narrower margin than
 * I would like and it is stated rather than hidden — if it starts firing on
 * good sheets the answer is a better instrument, not a lower line.
 */
export function gateFigure(m) {
  const bad = [];
  if (m.contrast < 42) {
    bad.push(`HARD ${m.foe} does not separate from the room (contrast ${m.contrast}, floor 42)`);
  }
  const soft = [];
  if (m.ink < 0.06) soft.push(`soft ${m.foe} covers little of its box (${(m.ink * 100).toFixed(1)}%)`);
  return { bad, soft };
}

export function review(pngPath, areaId, marksPath) {
  const img = readPng(pngPath);
  const path = marksPath || pngPath.replace(/\.png$/, '').replace(/^(.*)$/, `$1.marks.json`);
  const file = existsSync(path) ? path : `dist/area-${areaId}.marks.json`;
  const marks = JSON.parse(readFileSync(file, 'utf8'));
  const rooms = ROOMS.filter((r) => r.area === areaId);
  const figures = marks.map((mk) => {
    const m = measureFigure(img, mk);
    return { ...m, ...gateFigure(m) };
  });
  // a room that says it holds creatures and drew none is its own failure
  const missing = rooms
    .filter((r) => r.foes.length && !marks.some((mk) => mk.room === r.id))
    .map((r) => ({ room: r.id, foe: '-', ink: 0, contrast: 0, bad: ['HARD room holds foes and drew none'], soft: [] }));
  return [...figures, ...missing];
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [png, areaId] = process.argv.slice(2);
  if (!png || !AREAS.some((a) => a.id === areaId)) {
    console.error('usage: node tools/eye.js <render.png> <area-id>');
    process.exit(2);
  }
  const rows = review(png, areaId);
  let failed = 0;
  for (const r of rows) {
    const flag = r.bad.length ? 'FAIL' : r.soft.length ? 'warn' : ' ok ';
    console.log(
      `${flag}  ${r.room.padEnd(15)}${String(r.foe).padEnd(13)}contrast ${String(r.contrast).padStart(6)}   ink ${(r.ink * 100).toFixed(1).padStart(5)}%`,
    );
    for (const b of r.bad) console.log(`        ${b}`);
    for (const s of r.soft) console.log(`        ${s}`);
    if (r.bad.length) failed++;
  }
  console.log(`\n${rows.length - failed}/${rows.length} figures pass`);
  process.exit(failed ? 1 : 0);
}
