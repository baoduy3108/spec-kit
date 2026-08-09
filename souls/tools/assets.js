// The asset plan: every sprite sheet this game needs, written in the
// vocabulary agent-sprite-forge expects, with the art prompt for each one
// already composed.
//
// Why this file exists in this shape. agent-sprite-forge is a Codex skill
// pack, and its central rule is explicit:
//
//   "Do not create raw sprite art with Three.js, Canvas, SVG, HTML/CSS
//    drawing, PIL shape drawing, procedural geometry, placeholder primitives,
//    or code-rendered screenshots ... requested sprite art must originate
//    from built-in `image_gen`."
//
// So the hand-drawn SVG sheets are exactly what that skill forbids, and it is
// right to forbid them. But the skill needs a built-in image generator, and
// this session does not have one. What it does have is everything the
// generator would need to be told — sixteen `look` briefs, eighteen bosses
// with three tells each, a hundred and fifty weapons, thirty-six areas — all
// written already. So this emits the plan and the prompts, and the raw art
// gets generated wherever `image_gen` actually lives.
//
// The rules encoded here are the skill's own, not invented:
//   - solid #FF00FF background, no gradients, no text anywhere
//   - never a single-row 1xN grid for a body that has to stay centred
//   - subject inside the central 60-70%, consistent scale across cells
//   - a stable feet line for anything grounded
//   - one scale profile per multi-action bundle, taken from the idle
//   - wide FX split out of body sheets rather than shrinking the body
//   - long props never go in square packs; they get strips or wide cells
//
//   node tools/assets.js  ->  dist/asset-plan.json + dist/asset-plan.md

import { mkdirSync, writeFileSync } from 'node:fs';
import { AREAS, FOES, ROOMS } from '../src/world.js';
import { LORE, CARRY } from '../src/lore.js';
import { BESTIARY, BOSS_IDS } from '../src/bosses.js';
import { BOSS_LORE } from '../src/bosslore.js';
import { CLASS_IDS, CLASS_LORE, WEAPONS, classStats, weaponsOfClass } from '../src/arms.js';

/** The skill's containment contract, appended to every body prompt. */
const BODY_RULES = [
  'Background is 100% solid flat magenta (#FF00FF), no gradients, no shadow plate under the subject.',
  'NO text, NO labels, NO words, NO letters, NO UI anywhere.',
  'Exactly equal cells, no borders, no lines, no frames between cells.',
  'Subject stays centred in every cell, full body inside the central 65% safe area.',
  'Identical body scale in every cell, stable feet line, nothing crossing a cell edge.',
].join(' ');

const PROP_RULES = [
  'Background is 100% solid flat magenta (#FF00FF), no gradients.',
  'NO text, NO labels, NO letters, NO UI.',
  'Equal cells, no borders or dividing lines, one prop per cell, consistent scale.',
  'Each prop fully inside its cell with even margin.',
].join(' ');

/** frames -> grid, following the skill's multi-row rule. Never 1xN for a body. */
const GRID = { 4: '2x2', 6: '2x3', 8: '2x4', 9: '3x3', 12: '3x4', 16: '4x4' };

const ACTION_FRAMES = { idle: 4, walk: 8, run: 8, attack: 6, combat: 8, hurt: 4, death: 6, cast: 6 };

const sheets = [];
const add = (s) => sheets.push(s);

const bodySheet = ({ id, source, kind, action, prompt, style = 'pixel_art', view = 'side' }) => {
  const frames = ACTION_FRAMES[action];
  add({
    id,
    skill: 'generate2dsprite',
    source,
    asset_type: kind,
    action,
    view,
    sheet: GRID[frames],
    frames,
    anchor: 'feet',
    align: 'feet',
    art_style: style,
    scale_strategy: action === 'attack' ? 'preserve' : 'fit',
    prompt: `${prompt} ${BODY_RULES}`,
  });
};

// --- the knight -----------------------------------------------------------
// One scale profile, taken from the idle, applied to every other action. The
// roll is the only move with invulnerability frames, so it is drawn as its
// own action rather than folded into a combat sheet.
const KNIGHT =
  'A lone knight in worn plate and a hooded surcoat, mid-sized human proportions, ' +
  'side view for a 2D souls-like duel. Dark iron, one straight sword, a small round shield ' +
  'on the off arm, no cape, no glow, no magic. Grim, tired, functional.';

for (const action of ['idle', 'run', 'attack', 'hurt', 'death']) {
  bodySheet({
    id: `knight-${action}`,
    source: { kind: 'player', id: 'knight' },
    kind: 'player',
    action,
    prompt: `${KNIGHT} Action: ${action}.`,
  });
}
add({
  id: 'knight-roll',
  skill: 'generate2dsprite',
  source: { kind: 'player', id: 'knight' },
  asset_type: 'player',
  action: 'jump',
  view: 'side',
  sheet: '2x3',
  frames: 6,
  anchor: 'center',
  align: 'center',
  art_style: 'pixel_art',
  scale_strategy: 'preserve',
  note: 'airborne mid-roll, so a grounded feet gate does not apply — the skill says not to use a feet anchor for airborne motion',
  prompt: `${KNIGHT} Action: a full forward combat roll, tuck to recovery, ending on one knee. ${BODY_RULES}`,
});

// --- the sixteen families -------------------------------------------------
// The art prompt is the `look` field, which was written as a drawing brief
// before any of this existed, plus the `tell` for the attack sheet — because
// the tell is the only frame in the animation a player has to read.
for (const family of Object.keys(LORE)) {
  const l = LORE[family];
  const base = `${l.name.en}. ${l.look.en} ${l.line.en}`;
  for (const action of ['idle', 'walk', 'combat']) {
    bodySheet({
      id: `foe-${family}-${action}`,
      source: { kind: 'family', id: family },
      kind: 'creature',
      action,
      prompt:
        action === 'combat'
          ? `${base} Wind-up must read as: ${l.tell.en} Then the strike, then the recovery.`
          : `${base} Action: ${action}.`,
    });
  }
}

// --- what they carry ------------------------------------------------------
// Carried things are overlays, not families, so they are one prop pack rather
// than five re-draws of every creature.
add({
  id: 'carry-pack',
  skill: 'generate2dsprite',
  source: { kind: 'carry', id: 'all' },
  asset_type: 'prop',
  action: 'single',
  view: 'side',
  sheet: '2x2',
  frames: 4,
  anchor: 'center',
  art_style: 'pixel_art',
  prompt:
    `Four separate held items for a dark fantasy 2D game, one per cell: ` +
    `1) a crude spear, ${CARRY['-spear'].line.en} ` +
    `2) a burning torch, ${CARRY['-torch'].line.en} ` +
    `3) a battered shield and shoulder plate, ${CARRY['-heavy'].line.en} ` +
    `4) a bare clenched hand. ${PROP_RULES}`,
});
add({
  id: 'carry-torch-flame',
  skill: 'generate2dsprite',
  source: { kind: 'carry', id: '-torch' },
  asset_type: 'fx',
  action: 'idle',
  view: 'side',
  sheet: '2x3',
  frames: 6,
  anchor: 'center',
  art_style: 'pixel_art',
  note: 'split out of the body sheets: the skill forbids baking wide FX into a body cell',
  prompt: `A looping torch flame only, no torch handle, no character. Warm orange core, dark red edge, small sparks rising. ${BODY_RULES}`,
});

// --- the eighteen ---------------------------------------------------------
// One idle, one sheet per move, one death. Each move prompt carries that
// move's own tell, because the tell is the contract with the player and it is
// the same sentence the fight already uses.
for (const id of BOSS_IDS) {
  const b = BESTIARY[id];
  const lore = BOSS_LORE[id];
  const base = `${b.name.en}, a boss for a 2D souls-like. ${lore.look.en} ${b.line.en} Arena: ${lore.arena.en}`;
  bodySheet({
    id: `boss-${id}-idle`,
    source: { kind: 'boss', id },
    kind: 'creature',
    action: 'idle',
    style: 'clean_hd',
    prompt: `${base} Action: idle. Weight settles through the torso; do not sway the whole body sideways.`,
  });
  for (const move of b.moves) {
    bodySheet({
      id: `boss-${id}-${move.id}`,
      source: { kind: 'boss', id, move: move.id },
      kind: 'creature',
      action: 'attack',
      style: 'clean_hd',
      prompt:
        `${base} Action: the attack called ${move.id}. The wind-up must read as: ${move.tell}. ` +
        `Wind-up ${move.windup}s, strike ${move.active}s, recovery ${move.recover}s — the recovery is longer than the strike and must look like it.`,
    });
  }
  bodySheet({
    id: `boss-${id}-death`,
    source: { kind: 'boss', id },
    kind: 'creature',
    action: 'death',
    style: 'clean_hd',
    prompt: `${base} Action: death. It ends with: ${lore.after.en}`,
  });
}

// --- a hundred and fifty weapons -----------------------------------------
// Grouped into one pack per class. Long weapons never go in a square pack —
// that is the skill's rule, and a halberd in a 3x3 cell comes out as a stick.
for (const cls of CLASS_IDS) {
  const stats = classStats(cls);
  const long = stats.reach >= 90;
  const ids = weaponsOfClass(cls);
  const lore = CLASS_LORE[cls];
  const each = ids
    .map((id, i) => `${i + 1}) ${WEAPONS[id].name.en} — ${WEAPONS[id].line.en}`)
    .join(' ');
  add({
    id: `weapons-${cls}`,
    skill: 'generate2dsprite',
    source: { kind: 'weapon-class', id: cls, weapons: ids },
    asset_type: 'prop',
    action: 'single',
    view: 'side',
    sheet: long ? 'strip_1x4' : '3x3',
    frames: long ? 4 : 9,
    passes: long ? Math.ceil(ids.length / 4) : Math.ceil(ids.length / 9),
    anchor: 'center',
    art_style: 'clean_hd',
    note: long
      ? 'long prop: strips or wide cells only, never a square pack'
      : 'compact prop: a square pack is allowed',
    prompt:
      `Dark fantasy ${lore.name.en.toLowerCase()} weapons, one per cell, side view, laid flat, no hands, no characters. ` +
      `${lore.line.en} ${each} ${PROP_RULES}`,
  });
}

// --- thirty-six areas -----------------------------------------------------
// generate2dmap, not generate2dsprite: a ground-only base with no tall
// collidable objects, plus the props as a separate transparent pack, which is
// what the layered map contract requires.
for (const area of AREAS) {
  const rooms = ROOMS.filter((r) => r.area === area.id);
  const feel = rooms.map((r) => r.line.en).join(' ');
  add({
    id: `map-${area.id}-base`,
    skill: 'generate2dmap',
    source: { kind: 'area', id: area.id },
    layer: 'base',
    art_style: 'clean_hd',
    prompt:
      `A BASE GROUND MAP ONLY for the area called ${area.id}, tier ${area.tier} of 11 in a dark souls-like. ${feel} ` +
      `Terrain, floor materials, ground markings and flat anchor pads only. ` +
      `Do not include tall collidable objects: no walls, gates, columns, lanterns, trees, props, actors, UI or text.`,
  });
  add({
    id: `map-${area.id}-props`,
    skill: 'generate2dmap',
    source: { kind: 'area', id: area.id },
    layer: 'props',
    art_style: 'clean_hd',
    sheet: 'custom_grid',
    prompt:
      `Transparent prop pack for ${area.id}: the tall collidable objects the base map deliberately leaves out. ` +
      `Drawn from the rooms themselves — ${rooms.map((r) => r.name.en).join(', ')}. ${PROP_RULES}`,
  });
}

export const SHEETS = sheets;

if (import.meta.url === `file://${process.argv[1]}`) {
  mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });
  writeFileSync(new URL('../dist/asset-plan.json', import.meta.url), JSON.stringify(sheets, null, 2));

  const bySkill = {};
  for (const s of sheets) (bySkill[s.skill] ??= []).push(s);
  let md = `# Asset plan\n\n${sheets.length} sheets.\n\n`;
  md += `Generated by \`tools/assets.js\`. Vocabulary and containment rules are\n`;
  md += `agent-sprite-forge's. Raw art must come from a built-in image generator —\n`;
  md += `nothing in this repo may draw it.\n\n`;
  for (const skill of Object.keys(bySkill)) {
    md += `## ${skill} — ${bySkill[skill].length}\n\n`;
    for (const s of bySkill[skill]) {
      md += `### ${s.id}\n\n`;
      md += `\`${[s.asset_type || s.layer, s.action, s.sheet, s.frames && `${s.frames}f`, s.anchor, s.art_style].filter(Boolean).join(' · ')}\`\n\n`;
      if (s.note) md += `> ${s.note}\n\n`;
      md += `${s.prompt}\n\n`;
    }
  }
  writeFileSync(new URL('../dist/asset-plan.md', import.meta.url), md);
  console.log(`${sheets.length} sheets -> dist/asset-plan.json, dist/asset-plan.md`);
  const counts = {};
  for (const s of sheets) counts[s.source.kind] = (counts[s.source.kind] || 0) + 1;
  console.log(counts);
}
