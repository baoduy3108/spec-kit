// tools/godot.js — export the game to Godot 4.
//
// The rule this file exists to enforce: src/ is the only source of truth. The
// design lives in world.js, rules.js, arms.js and bosses.js, it is guarded by
// 114 tests, and none of that survives being retyped into GDScript by hand.
// So nothing is retyped. Godot reads JSON that is generated from src/, and a
// test checks that what Godot reads still matches what the sim runs on.
//
//   npm run godot        write godot/data/*.json
//
// The Godot side is under godot/. It has no hand-entered numbers in it.

import { mkdirSync, writeFileSync } from 'node:fs';
import { AREAS, ROOMS, FOES } from '../src/world.js';
import { BESTIARY } from '../src/bosses.js';
import { LORE } from '../src/lore.js';
import { HERO } from '../src/hero.js';
import { ABILITIES, SKILLS } from '../src/abilities.js';
import { KNIGHT, WARDEN, ARENA, UPGRADES } from '../src/rules.js';
import { profile, spots, ROOM_M } from './draw.js';

/** How many sim units make a metre. The arena is 820 units and a room is 24
 *  metres, and the hero art has always been drawn about 68 units tall for a
 *  figure the sheet calls 2.0m. All three agree on 34, so 34 it is. */
export const UNITS_PER_METRE = 34;

const dir = new URL('../godot/data/', import.meta.url);

/** Terrain, in Godot's own coordinates: x right, y down, floor at zero. */
function terrain(room) {
  return profile(room).map(([mx, my]) => (my === null
    ? null
    : [Math.round(mx * UNITS_PER_METRE), Math.round(-my * UNITS_PER_METRE)]));
}

export function build() {
  mkdirSync(dir, { recursive: true });

  // Two tables that were briefly written out by hand on the Godot side, which
  // is exactly the drift this exporter exists to prevent. Foe placement already
  // had one home in draw.js and now has only that one; room brightness is new
  // design data and so it lives here, in JS, with everything else.
  const LIGHT_LEVELS = { dark: 0.16, dim: 0.3, grey: 0.46, pale: 0.62, warm: 0.42, gold: 0.58 };
  const layouts = [...new Set(ROOMS.map((r) => r.layout))];
  const placement = Object.fromEntries(layouts.map((l) => [l, spots(l, 4)]));

  // Some kinds decide where a fight happens regardless of the layout tag. A
  // drain's interesting ground is the channel, not the ledges either side of
  // it — the room's own line says the two of them are standing IN it, and the
  // preview showed them standing politely on the kerb.
  const placement_by_kind = {
    bridge: [10.5, 13.5, 12.0, 14.5],
  };

  // Both tables must cover every tag the world actually uses, because the
  // Godot side reads them without a fallback. A default there would swallow a
  // missing tag silently and the room would just quietly be the wrong dark.
  for (const tag of new Set(ROOMS.map((r) => r.light)))
    if (!(tag in LIGHT_LEVELS)) throw new Error(`light tag "${tag}" has no level`);
  for (const tag of layouts)
    if (!placement[tag].length) throw new Error(`layout "${tag}" has no placement`);

  const rules = {
    units_per_metre: UNITS_PER_METRE,
    room_width: Math.round(ROOM_M * UNITS_PER_METRE),
    arena: ARENA,
    player: KNIGHT,
    warden: WARDEN,
    upgrades: UPGRADES,
    light_levels: LIGHT_LEVELS,
    placement,
    placement_by_kind,
    // Sim units per second squared. The sim is a flat arena and never needed
    // this; a room with a stair and a drain in it does. Tuned against the
    // player's own scale: a 2m fall lands in about 0.4s, which is a step down,
    // not a plummet.
    gravity: 1700,
    // The camera. A souls room is one arena you cannot walk out of the side of
    // — which is what rules.js has always been, an 820-unit arena — so the
    // whole room is on screen and nothing scrolls. The blockout used to claim
    // a 14.4m frame; it reads these now instead of asserting its own number.
    camera: { viewport: [1280, 720], zoom: 1.35, y: -180 },
  };

  const world = {
    areas: AREAS.map((a) => ({
      id: a.id, tier: a.tier, size: a.size, to: a.to, boss: a.boss ?? null,
      entrance: a.entrance, exit: a.exit, roomIds: a.roomIds,
    })),
    rooms: ROOMS.map((r) => ({
      id: r.id, area: r.area, key: r.key ?? null, kind: r.kind, light: r.light,
      layout: r.layout, tier: r.tier, foes: r.foes,
      name: r.name ?? null, line: r.line ?? null, note: r.note ?? null,
      terrain: terrain(r),
    })),
  };

  const foes = Object.fromEntries(Object.entries(FOES).map(([id, f]) => [id, {
    ...f,
    display: LORE[f.family] ? LORE[f.family].name : { en: f.family, vi: f.family },
    tell: LORE[f.family] ? LORE[f.family].tell : null,
  }]));

  const files = {
    'rules.json': rules,
    'world.json': world,
    'foes.json': foes,
    'bosses.json': BESTIARY,
    'hero.json': HERO,
    'abilities.json': { abilities: ABILITIES, skills: SKILLS },
  };
  for (const [name, data] of Object.entries(files))
    writeFileSync(new URL(name, dir), `${JSON.stringify(data, null, 1)}\n`);

  return {
    areas: world.areas.length,
    rooms: world.rooms.length,
    foes: Object.keys(foes).length,
    files: Object.keys(files),
  };
}

if (process.argv[2] !== '--quiet' && import.meta.url === `file://${process.argv[1]}`) {
  const r = build();
  console.log(`godot/data: ${r.areas} khu · ${r.rooms} phòng · ${r.foes} loại quái · ${r.files.join(', ')}`);
}
