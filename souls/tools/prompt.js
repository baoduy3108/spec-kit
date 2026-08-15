// tools/prompt.js — the paste-into-an-image-model prompt for every room.
//
// There is no image generation in this toolchain, so the paint has to be made
// somewhere else. What this file guarantees is that whoever paints it cannot
// paint the wrong thing: the geometry, the foe positions, the light and the
// palette in the prompt are the same numbers the blockout draws and the Godot
// project runs on, because they are read out of the same modules.
//
//   npm run prompt drainage          one file per area, printed and written
//   npm run prompt drainage 2        just that room, to the terminal
//
// Hand-written briefs drift the moment a number changes. These do not.

import { mkdirSync, writeFileSync } from 'node:fs';
import { AREAS, ROOMS, FOES } from '../src/world.js';
import { LORE } from '../src/lore.js';
import { BESTIARY } from '../src/bosses.js';
import { profile, gaps, spots, furnitureOf, ROOM_M } from './draw.js';

/** The palette a mood resolves to. Duplicating the ramp would be the drift this
 *  file exists to prevent, so it is recomputed from the same constants. */
const hsl = (hh, s, l) => {
  hh = ((hh % 360) + 360) % 360;
  const a = s * Math.min(l, 1 - l);
  const f = (k0) => {
    const k = (k0 + hh / 30) % 12;
    return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)))).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};
const lerpHue = (a, b, t) => a + (((b - a + 540) % 360) - 180) * t;
const ramp = (base, light, lo, hi, t) => {
  const away = base + (base < light ? -40 : 40);
  const hue = t < 0.5 ? lerpHue(away, base, t / 0.5) : lerpHue(base, light, ((t - 0.5) / 0.5) * 0.8);
  return hsl(hue, 0.09 + 0.28 * Math.min(1, Math.max(0, t)), lo + (hi - lo) * t);
};
const MOOD = {
  dark: [216, 194, 0.05, 0.5], dim: [220, 200, 0.06, 0.55], grey: [205, 188, 0.1, 0.62],
  pale: [198, 178, 0.14, 0.72], warm: [216, 196, 0.06, 0.5], gold: [210, 192, 0.08, 0.54],
};
function palette(light) {
  const [b, l, lo, hi] = MOOD[light] || MOOD.dim;
  const r = (t) => ramp(b, l, lo, hi, t);
  return { ink: r(0.02), dark: r(0.2), mid: r(0.42), far: r(0.72), lit: r(0.93), accent: hsl(28, 0.34, Math.min(0.52, hi * 0.86)) };
}

/** What each kind of room is built out of. The renderer draws these; this says
 *  them in words, so the painting and the blockout describe one building. */
const ARCHITECTURE = {
  hall: 'A stone vaulted hall on piers. The vault sags in the middle — it is not a clean arc. Three piers, leaning, swollen at mid-height, one of them broken off short of the ceiling. Coursed masonry behind, many small stones of nearly the same value, never a high-contrast brick pattern.',
  bonfire: 'NOT a hall. One corner of a building still standing, broken off at head height, open to the dark on the other side where the roof came down. A bank of fallen stone under the break. One pier left, half buried in the rubble of its own building. You rest here because the roof is gone and you can see what is coming.',
  bridge: 'A crossing: a walking ledge each side and lower ground between them, which you go down into and up out of. WHICH crossing is in the room\'s own line above — a barrel-vaulted drain mouth seen head-on (five round arches nested inside each other, each further and darker, the innermost solid black, voussoirs showing on the near one so it reads as built), or a narrow span over fast water, or a ledge with a drop beside it. The line wins.',
  cave: 'No masonry anywhere. Nobody built this. Rough lobed rock ceiling, stalactites of uneven length, walls closing in as rounded lobes, stalagmites from the floor. Hatching follows the grain of the rock, never vertical like a wall.',
  stair: 'A stone flight running up to the right, with treads missing. Every step has two faces: a riser turned away from the light and a tread that catches it. The gaps are ragged bites, not rectangles, and you can see the drop through them.',
  yard: 'Open to the sky — NO ceiling. A battlemented wall line crosses at about a third of the frame height, merlons broken in places. Above it: low flat cloud in horizontal bands. No sun, no stars, no god-rays from a sky. A fallen tower held upright by the wall it came down against.',
  fog: 'Almost nothing is visible. A few uprights fading out at about nine metres, heavy ambient veils, no far detail at all. The room is defined by what you cannot see.',
};

const wrap = (s) => s.replace(/\s+/g, ' ').trim();

/** One room, as a prompt. Everything numeric in here is read, not typed. */
export function promptFor(room) {
  const p = palette(room.light);
  const P = profile(room);
  const holes = gaps(P);
  const at = spots(room.layout, room.foes.length);
  const props = furnitureOf(room);
  const heights = [...new Set(P.filter(([, y]) => y !== null).map(([, y]) => y))];
  const lightAt = room.kind === 'bonfire' ? 9 : room.light === 'warm' ? 11 : 6;
  const lightM = { dark: 0, dim: 3.2, grey: 5, pale: 7, warm: 6.5, gold: 8 }[room.light] ?? 3;

  const lines = [];
  const say = (s) => lines.push(s);

  say(`## ${room.name.vi} · ${room.name.en}  \`${room.id}\``);
  say('');
  say('```');
  say('2D side-scrolling souls-like game background, hand-painted, single screen.');
  say(`The room is exactly ${ROOM_M} metres wide and 8 metres tall and the whole of it is on screen at once — nothing scrolls. Draw it flat-on from the side, like a stage set. A 2.0m human figure would stand ${(2 / 8 * 100).toFixed(0)}% of the frame height.`);
  say('');
  say(`WHAT THIS ROOM IS: ${room.line.en}`);
  say('');
  say(`ARCHITECTURE (kind: ${room.kind}) — ${ARCHITECTURE[room.kind] || ARCHITECTURE.hall}`);
  say('Where this generic description and the room\'s own line disagree, THE LINE WINS. The kind says how the room is built; the line says what it is.');
  say('');
  say('GROUND — ' + (holes.length
    ? `broken. ${holes.length} hole${holes.length > 1 ? 's' : ''} in the floor at ${holes.map(([a, b]) => `${a.toFixed(1)}–${b.toFixed(1)}m`).join(', ')} measured from the left wall. Each is a real drop you can see into.`
    : heights.length > 1
      ? `uneven, rising from the left to about ${Math.max(...heights).toFixed(1)}m above the entrance.`
      : 'one level, unbroken, but never clean — cracks, rubble, stains, something somebody dropped and did not come back for.'));
  say('');
  if (props.length) {
    say('MUST CONTAIN, at these positions measured from the left wall:');
    for (const [x, w, h, label, en] of props)
      say(`  - ${label}${en ? ` (${en})` : ''} — at ${x}m, about ${w}m wide and ${h}m tall`);
    say('');
  }
  if (room.foes.length) {
    say(`FIGURES — ${room.foes.length} in the room, standing at ${at.map((x) => `${x}m`).join(', ')} from the left wall:`);
    for (let i = 0; i < room.foes.length; i++) {
      const f = FOES[room.foes[i]];
      const l = LORE[f.family];
      say(`  - ${room.foes[i]} at ${at[i]}m — ${wrap(l.look.en)} ${wrap(l.tell.en)}`);
    }
    say('  Draw them as silhouettes with readable shapes, not as detailed portraits. They must be legible against the wall behind them.');
    say('');
  } else {
    say('FIGURES — none. This room is empty of living things, and that is the point of it.');
    say('');
  }
  // A foe carrying a torch is a light source standing in the room, and five
  // rooms in this game are tagged `dark` while holding one. Saying "there is no
  // light here" next to a figure with a burning brand is a prompt that
  // contradicts itself, and the painter has to resolve it by guessing.
  const carriers = room.foes.map((id, i) => [id, at[i]]).filter(([id]) => FOES[id].burns);
  const carried = carriers.length
    ? ` The only light in the room is carried: ${carriers.map(([id, x]) => `${id} at ${x}m`).join(', ')}. It moves with them, it is small and low, and everything it touches is warm while everything it does not is not.`
    : '';
  say('LIGHT — ' + (lightM === 0
    ? `there is no fixed light source in this room.${carried || ' Only enough to read silhouettes and the shine of an eye. This is the darkest kind of room in the game; do not brighten it to be legible.'}`
    : `one fixed source, at ${lightAt}m from the left wall, reaching about ${lightM}m. Source, then a lit pool, then falloff, then dark — in that order and no other. Every shadow in the room points away from it. Ninety per cent of the frame sits below 15% brightness.${carried}`));
  say('');
  say(`PALETTE — dominant cool desaturated slate: ink ${p.ink}, dark ${p.dark}, mid ${p.mid}, far ${p.far}, lit ${p.lit}. Near-neutral in the darks; saturation rises only with brightness. EXACTLY ONE warm accent: rust ${p.accent}${lightM > 0 ? ', and firelight #a8300f -> #ffb04a -> #fff6d8' : ''}. Shadows shift cooler, lit faces shift warmer. Never let the walls go purple or green.`);
  say('');
  say('LAYERS, back to front: 1 far background losing contrast and saturation. 2 the architecture above. 3 the floor and objects, kept readable. 4 a near-black foreground mass cropping the frame edge. 5 the single light. 6 dust in the air, embers only near fire.');
  say('');
  say('DO NOT: flat single-colour background; no landmark for the eye to hold; a clean floor; even lighting with no single source; straight lines and geometric primitives; filling every square inch — deliberate empty space is the breathing.');
  say('```');
  say('');
  return lines.join('\n');
}

/**
 * The same room, written for an image model instead of a person.
 *
 * These are not the same document. A painter reads headings, metre marks and a
 * DO NOT list and uses all three. An image model drops the coordinates, treats
 * the negatives as things to draw, and does better with one flowing paragraph
 * than with a form. This was found by actually running one through Canva's
 * generator rather than by assuming it would behave like the human brief.
 */
export function imagePromptFor(room) {
  const p = palette(room.light);
  const P = profile(room);
  const holes = gaps(P);
  const props = furnitureOf(room);
  const at = spots(room.layout, room.foes.length);
  const carriers = room.foes.map((id, i) => [id, at[i]]).filter(([id]) => FOES[id].burns);
  const lightM = { dark: 0, dim: 3.2, grey: 5, pale: 7, warm: 6.5, gold: 8 }[room.light] ?? 3;

  const bits = [];
  bits.push('A dark, hand-painted 2D side-scrolling video game background — a wide stage-set view, seen flat-on from the side, like a theatre set.');
  bits.push(wrap(room.line.en));
  bits.push(wrap((ARCHITECTURE[room.kind] || ARCHITECTURE.hall)
    .replace(/^NOT a hall\. /, 'Not a hall — ')
    // instructions about how to draw with strokes are for the vector renderer;
    // to an image model they are noise at best
    .replace(/Hatching follows[^.]*\./, '')
    .replace(/, many small stones of nearly the same value, never a high-contrast brick pattern/, ' of many small stones of nearly the same colour')
    .replace(/ WHICH crossing is in the room's own line above[^]*?The line wins\./, '')));
  if (holes.length) bits.push(`The floor is broken by ${holes.length} real gap${holes.length > 1 ? 's' : ''} you can see down into.`);
  if (props.length) {
    // English, and counted rather than repeated: the first version listed the
    // Vietnamese label twice — "xích+vòng cổ, xích+vòng cổ" — to a model that
    // reads neither Vietnamese nor repetition as emphasis.
    const seen = new Map();
    for (const [, , , vi, en] of props) {
      const label = en || vi;
      seen.set(label, (seen.get(label) || 0) + 1);
    }
    const listed = [...seen].map(([label, k]) => (k > 1 ? `${label} (${k} of them)` : label));
    bits.push(`In the room: ${listed.join('; ')}.`);
  }
  bits.push(lightM === 0
    ? (carriers.length
      ? 'The only light is carried by a figure holding a burning brand — small, low, and moving; everything it touches is warm and everything else is not.'
      : 'There is no light source at all here — only just enough to read shapes and the wet shine on stone. This is among the darkest pictures in the game; do not brighten it to make it readable.')
    : 'One light source only, with a small lit pool around it falling off quickly into dark. Ninety per cent of the frame sits in deep shadow, and every shadow points away from that one light.');
  bits.push(`Colour: dominant cool desaturated slate blue-grey, almost neutral in the shadows (${p.ink}, ${p.dark}, ${p.mid}, ${p.far}), with exactly one warm accent — rust ${p.accent}${lightM > 0 || carriers.length ? ', and firelight #a8300f through #ffb04a to #fff6d8' : ''}. Shadows shift cooler, lit surfaces shift warmer. Never let the walls go purple or green.`);
  bits.push('Painterly, atmospheric, abandoned, high contrast between the small lit area and the dark, dust in the air. Deliberate empty space — do not fill every corner. Broken, dirty, irregular; no straight lines or clean geometry.');
  bits.push('No text, no people, no characters, no UI, no logo. Wide horizontal composition.');
  return bits.join(' ');
}

export function promptsFor(areaId) {
  const area = AREAS.find((a) => a.id === areaId);
  if (!area) throw new Error(`no such area: ${areaId}`);
  const rooms = ROOMS.filter((r) => r.area === areaId);
  const foeIds = [...new Set(rooms.flatMap((r) => r.foes))];

  const head = [];
  head.push(`# ${areaId.toUpperCase()} — prompt để dán vào GPT`);
  head.push('');
  head.push(`${rooms.length} phòng · tier ${area.tier}${area.boss ? ` · boss: ${BESTIARY[area.boss].name.vi}` : ' · không boss'} · nối sang ${area.to.join(', ')}`);
  head.push('');
  head.push('> Sinh từ `src/world.js` bằng `npm run prompt`. Mọi con số trong đây —');
  head.push('> kích thước phòng, vị trí hố, chỗ đứng của quái, bán kính sáng, mã màu —');
  head.push('> là đúng con số blockout vẽ và Godot chạy. Đừng sửa tay: sửa `src/` rồi sinh lại.');
  head.push('');
  head.push('**Cách dùng:** dán nguyên khối ``` của một phòng vào GPT. Mỗi phòng một lần.');
  head.push('');
  if (foeIds.length) {
    head.push('## Quái trong khu này');
    head.push('');
    head.push('| id | hp | dmg | báo đòn | tốc độ | tầm |');
    head.push('|---|---|---|---|---|---|');
    for (const id of foeIds) {
      const f = FOES[id];
      head.push(`| \`${id}\` | ${f.hp} | ${f.damage} | ${f.windup}s | ${f.speed} | ${f.reach} |`);
    }
    head.push('');
  }
  head.push('---');
  head.push('');

  const body = rooms.map((r) => `${promptFor(r)}\n**Dạng cho model ảnh** (Canva / Midjourney / DALL·E — một đoạn liền, không toạ độ):\n\n\`\`\`\n${imagePromptFor(r)}\n\`\`\`\n`).join('\n---\n\n');
  const doc = `${head.join('\n')}${body}`;
  mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });
  writeFileSync(new URL(`../dist/prompt-${areaId}.md`, import.meta.url), doc);
  return { rooms: rooms.length, doc, path: `dist/prompt-${areaId}.md` };
}

const area = process.argv[2];
if (area) {
  if (area === 'all') {
    let total = 0;
    for (const a of AREAS) total += promptsFor(a.id).rooms;
    console.log(`${AREAS.length} khu · ${total} phòng -> dist/prompt-*.md`);
  } else if (process.argv[3] !== undefined) {
    const rooms = ROOMS.filter((r) => r.area === area);
    const room = rooms[Number(process.argv[3])];
    process.stdout.write(process.argv[4] === '--image' ? `${imagePromptFor(room)}\n` : promptFor(room));
  } else {
    const r = promptsFor(area);
    console.log(`${area}: ${r.rooms} phòng -> ${r.path}`);
  }
}
