import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ROOMS } from '../src/world.js';
import { ARCH, PROPS, KIND_PROPS, drawArea } from '../tools/draw.js';

// The renderer once lost its per-kind architecture and drew the cell, the drain
// and the kennel as the same hall. These are the checks that would have caught
// it, written after the fact because that is when it was caught.

test('every kind a room can be has a building of its own', () => {
  const kinds = [...new Set(ROOMS.map((r) => r.kind))];
  for (const k of kinds) {
    assert.ok(ARCH[k], `no architecture for kind ${k}`);
    assert.ok(KIND_PROPS[k], `no fallback props for kind ${k}`);
  }
  // and no dead entries pointing at kinds the world does not contain
  for (const k of Object.keys(ARCH)) assert.ok(kinds.includes(k), `ARCH has unused kind ${k}`);
});

test('every hand-written prop set belongs to a room that exists', () => {
  const keys = new Set(ROOMS.map((r) => r.key).filter(Boolean));
  for (const k of Object.keys(PROPS)) assert.ok(keys.has(k), `PROPS has unknown room key ${k}`);
});

test('the architecture builders are distinct functions', () => {
  const fns = Object.values(ARCH);
  assert.equal(new Set(fns).size, fns.length, 'two kinds share one builder');
});

test('rooms of different kinds do not render the same drawing', () => {
  drawArea('undercroft');
  const svg = readFileSync(new URL('../dist/area-undercroft.svg', import.meta.url), 'utf8');
  const panels = svg.split('<clipPath').slice(1);
  const rooms = ROOMS.filter((r) => r.area === 'undercroft');
  assert.equal(panels.length, rooms.length);

  // A panel's shape is its path data. Two rooms built the same way produce the
  // same number of paths to within a hair; the whole bug was that they did.
  const shape = panels.map((s) => (s.match(/<path/g) || []).length);
  const byKind = {};
  rooms.forEach((r, i) => { (byKind[r.kind] ||= []).push(shape[i]); });
  const kinds = Object.keys(byKind);
  for (let i = 0; i < kinds.length; i++)
    for (let j = i + 1; j < kinds.length; j++) {
      const a = byKind[kinds[i]][0];
      const b = byKind[kinds[j]][0];
      assert.ok(Math.abs(a - b) > 8, `${kinds[i]} and ${kinds[j]} render alike (${a} vs ${b} paths)`);
    }
});

test('a room with a hand-written line gets the things the line names', () => {
  // the seven rooms of area one were each written a line before being drawn
  for (const r of ROOMS.filter((x) => x.area === 'undercroft'))
    assert.ok(PROPS[r.key], `${r.key} has a written line but nothing drawn from it`);
});
