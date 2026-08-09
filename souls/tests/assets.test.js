// The asset plan has to obey agent-sprite-forge's rules, because the sheets
// it describes will be generated against them. The two that bite hardest are
// the single-row ban and the long-prop-in-a-square-pack ban: both produce art
// that looks fine on its own and is unusable in an engine.

import test from 'node:test';
import assert from 'node:assert/strict';

import { AREAS } from '../src/world.js';
import { LORE } from '../src/lore.js';
import { BESTIARY, BOSS_IDS } from '../src/bosses.js';
import { CLASS_IDS, WEAPON_IDS, classStats } from '../src/arms.js';
import { SHEETS } from '../tools/assets.js';

const bodies = SHEETS.filter((s) => ['player', 'creature'].includes(s.asset_type));

test('every sheet points at something in the game', () => {
  assert.equal(new Set(SHEETS.map((s) => s.id)).size, SHEETS.length, 'no duplicate sheet ids');
  for (const s of SHEETS) {
    const { kind, id } = s.source;
    if (kind === 'family') assert.ok(LORE[id], `${s.id} names a family that does not exist`);
    if (kind === 'boss') assert.ok(BOSS_IDS.includes(id), `${s.id} names a boss that does not exist`);
    if (kind === 'area') assert.ok(AREAS.some((a) => a.id === id), `${s.id} names a missing area`);
    if (kind === 'weapon-class') {
      assert.ok(CLASS_IDS.includes(id), `${s.id} names a missing class`);
      for (const w of s.source.weapons) assert.ok(WEAPON_IDS.includes(w), `${w} is not a weapon`);
    }
  }
});

test('nothing in the game is left without art', () => {
  for (const family of Object.keys(LORE)) {
    assert.ok(SHEETS.some((s) => s.source.kind === 'family' && s.source.id === family), `${family} has no sheet`);
  }
  for (const boss of BOSS_IDS) {
    const mine = SHEETS.filter((s) => s.source.kind === 'boss' && s.source.id === boss);
    assert.ok(mine.some((s) => s.action === 'idle'), `${boss} has no idle`);
    assert.ok(mine.some((s) => s.action === 'death'), `${boss} never dies on screen`);
    assert.ok(mine.filter((s) => s.action === 'attack').length === 3, `${boss} needs one sheet per move`);
  }
  const planned = new Set(SHEETS.flatMap((s) => s.source.weapons || []));
  assert.equal(planned.size, WEAPON_IDS.length, `${WEAPON_IDS.length - planned.size} weapons have no art`);
  for (const area of AREAS) {
    const mine = SHEETS.filter((s) => s.source.kind === 'area' && s.source.id === area.id);
    assert.ok(mine.some((s) => s.layer === 'base'), `${area.id} has no ground`);
    assert.ok(mine.some((s) => s.layer === 'props'), `${area.id} has no props`);
  }
});

test('no body is asked for as a single row', () => {
  // The skill's reason: a 1xN raw generation drifts horizontally and crops
  // inconsistently, and a body that must stay centred cannot survive it.
  for (const s of bodies) {
    assert.ok(s.sheet, `${s.id} has no grid`);
    assert.ok(!/^strip_1x|^1x/.test(s.sheet), `${s.id} is a single row and holds a body`);
    const [rows] = s.sheet.split('x').map(Number);
    assert.ok(rows >= 2, `${s.id} has only ${rows} row`);
  }
});

test('long props never go into a square pack', () => {
  for (const s of SHEETS.filter((s) => s.source.kind === 'weapon-class')) {
    const long = classStats(s.source.id).reach >= 90;
    const square = /^\d+x\d+$/.test(s.sheet) && s.sheet.split('x')[0] === s.sheet.split('x')[1];
    if (long) assert.ok(!square, `${s.id} is a long weapon in a square pack`);
  }
});

test('every prompt carries the magenta and no-text contract', () => {
  for (const s of SHEETS) {
    if (s.skill === 'generate2dmap' && s.layer === 'base') continue; // a ground map has no chroma key
    assert.match(s.prompt, /#FF00FF/, `${s.id} does not pin the background colour`);
    assert.match(s.prompt, /NO text/i, `${s.id} does not forbid text in the image`);
  }
  for (const s of bodies) {
    assert.match(s.prompt, /safe area/, `${s.id} does not state the safe area`);
    assert.match(s.prompt, /cell edge/, `${s.id} does not forbid crossing a cell edge`);
  }
});

test('grounded bodies anchor to the feet, and airborne ones do not', () => {
  for (const s of bodies) {
    if (s.action === 'jump') assert.notEqual(s.anchor, 'feet', `${s.id} is airborne and gated on feet`);
    else assert.equal(s.anchor, 'feet', `${s.id} is grounded and needs a feet line`);
  }
});

test('a boss attack sheet carries the tell that move already promises', () => {
  for (const s of SHEETS.filter((s) => s.source.kind === 'boss' && s.source.move)) {
    const move = BESTIARY[s.source.id].moves.find((m) => m.id === s.source.move);
    assert.ok(s.prompt.includes(move.tell), `${s.id} does not carry its own tell into the art`);
  }
});
