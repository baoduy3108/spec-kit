// The world, drawn properly.
//
// Not a node graph with labels — a map. Every area is an inked landmass
// coloured by what it is made of, every room is a glyph that says what kind
// of space it is, every door is a corridor, and every shortcut is a gold
// thread folding the far side of the world back onto the near side.
//
// It is generated from src/world.js, so the map cannot drift from the game.
// If a room is added, it appears here; if a shortcut stops folding anything,
// the tests fail before this ever gets drawn.

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { AREAS, BOSSES, FIRES, FOES, LINKS, ROOMS, START, depths, roomOf } from '../src/world.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const W = 2560;
const H = 1760;

// --- what each place is made of -------------------------------------------

const BIOMES = {
  stone: { ink: '#8794a8', fill: '#161c26', deep: '#0e131b', glow: '#4a5c78' },
  water: { ink: '#5fa3c4', fill: '#0f1e28', deep: '#091419', glow: '#2d6a8a' },
  ash: { ink: '#c98a56', fill: '#231a13', deep: '#17100b', glow: '#8a5228' },
  wood: { ink: '#7fae6b', fill: '#141d12', deep: '#0d140c', glow: '#3f6b34' },
  bone: { ink: '#cfc0a0', fill: '#221f18', deep: '#16140f', glow: '#8a7f60' },
  gold: { ink: '#e6b652', fill: '#241d0f', deep: '#181209', glow: '#a37a24' },
  fire: { ink: '#e2603a', fill: '#2a1510', deep: '#1a0d0a', glow: '#a03418' },
  void: { ink: '#a58ad0', fill: '#1c1628', deep: '#120e1a', glow: '#5f4a8a' },
};

const BIOME_OF = {
  undercroft: 'stone', courtyard: 'stone', drainage: 'water', gatehouse: 'stone',
  cistern: 'water', ramparts: 'stone', chapelyard: 'bone', bellfry: 'stone',
  ossuary: 'bone', 'upper-ward': 'stone', catacombs: 'bone', solarium: 'gold',
  'deep-vault': 'stone', marsh: 'water', aviary: 'wood', forge: 'fire',
  'sunken-road': 'water', spire: 'void', ashlands: 'ash', 'pale-wood': 'wood',
  observatory: 'void', 'cinder-gate': 'fire', 'hollow-tree': 'wood',
  'star-well': 'void', furnace: 'fire', 'root-deep': 'wood',
  'vault-of-hours': 'void', slag: 'ash', heartwood: 'wood', clockwork: 'gold',
  crucible: 'fire', 'drowned-city': 'water', 'bone-orchard': 'bone',
  'winding-stair': 'stone', 'the-lantern': 'gold', kiln: 'fire',
};

const seeded = (seed) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
const hash = (text) => {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};
const n = (v) => Number(v).toFixed(1);

// --- laying the land out ---------------------------------------------------

const deep = depths();
const tiers = [...new Set(AREAS.map((a) => a.tier))].sort((a, b) => a - b);
const place = new Map();
const seats = new Map();

for (const spot of AREAS) {
  const rng = seeded(hash(spot.id + 'lay'));
  const row = tiers.indexOf(spot.tier);
  const wide = AREAS.filter((a) => a.tier === spot.tier).length;
  const seat = seats.get(spot.tier) || 0;
  seats.set(spot.tier, seat + 1);

  spot.cx = ((seat + 0.5) / wide) * (W - 340) + 170 + (rng() - 0.5) * 40;
  spot.cy = 150 + (row / (tiers.length - 1)) * (H - 400) + (rng() - 0.5) * 30;
  spot.biome = BIOMES[BIOME_OF[spot.id] || 'stone'];
  spot.radius = 34 + spot.size * 2.6;

  // rooms sit in an organic cluster, not a queue
  spot.roomIds.forEach((id, i) => {
    const turn = (i / spot.size) * Math.PI * 2.4 + rng() * 0.25;
    const reach = 10 + (i / spot.size) * (spot.radius - 20) + (rng() - 0.5) * 9;
    place.set(id, {
      x: spot.cx + Math.cos(turn) * reach,
      y: spot.cy + Math.sin(turn) * reach * 0.66,
    });
  });
}

const parts = [];

// --- the paper -------------------------------------------------------------

parts.push(`<defs>
<radialGradient id="vig" cx="50%" cy="46%" r="72%">
  <stop offset="0%" stop-color="#0d1219"/><stop offset="100%" stop-color="#05070a"/>
</radialGradient>
<filter id="soft"><feGaussianBlur stdDeviation="9"/></filter>
<filter id="mist"><feGaussianBlur stdDeviation="26"/></filter>
</defs>`);
parts.push(`<rect width="${W}" height="${H}" fill="url(#vig)"/>`);

// star-field grit, so the paper is not a flat colour
const grit = seeded(99);
let dust = '';
for (let i = 0; i < 900; i++) {
  const x = grit() * W;
  const y = grit() * H;
  const r = grit() * 1.1 + 0.2;
  dust += `<circle cx="${n(x)}" cy="${n(y)}" r="${n(r)}" fill="rgba(232,228,218,${(grit() * 0.05 + 0.01).toFixed(3)})"/>`;
}
parts.push(dust);

// --- the landmasses --------------------------------------------------------

for (const spot of AREAS) {
  const rng = seeded(hash(spot.id + 'blob'));
  const points = [];
  const steps = 22;
  for (let i = 0; i < steps; i++) {
    const angle = (i / steps) * Math.PI * 2;
    const wobble = 0.82 + rng() * 0.36;
    points.push([
      spot.cx + Math.cos(angle) * spot.radius * wobble,
      spot.cy + Math.sin(angle) * spot.radius * 0.72 * wobble,
    ]);
  }
  let path = `M${n(points[0][0])} ${n(points[0][1])}`;
  for (let i = 1; i <= steps; i++) {
    const a = points[i % steps];
    const b = points[(i + 1) % steps];
    path += ` Q${n(a[0])} ${n(a[1])} ${n((a[0] + b[0]) / 2)} ${n((a[1] + b[1]) / 2)}`;
  }
  path += 'Z';

  parts.push(
    `<ellipse cx="${n(spot.cx)}" cy="${n(spot.cy)}" rx="${n(spot.radius * 1.5)}" ry="${n(spot.radius)}" fill="${spot.biome.glow}" opacity=".13" filter="url(#mist)"/>`,
    `<path d="${path}" fill="${spot.biome.fill}" stroke="${spot.biome.ink}" stroke-width="1.6" opacity=".95"/>`,
    `<path d="${path}" fill="none" stroke="${spot.biome.ink}" stroke-width="4" opacity=".12" filter="url(#soft)"/>`,
  );
}

// --- corridors -------------------------------------------------------------

for (const edge of LINKS) {
  const a = place.get(edge.a);
  const b = place.get(edge.b);
  if (!a || !b) continue;
  if (edge.shortcut) continue; // drawn last, on top of everything
  if (edge.gate) {
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    parts.push(
      `<path d="M${n(a.x)} ${n(a.y)} Q${n(mx)} ${n(my - 26)} ${n(b.x)} ${n(b.y)}" fill="none" stroke="rgba(232,228,218,.34)" stroke-width="2.2"/>`,
      `<circle cx="${n(mx)}" cy="${n(my - 13)}" r="3.4" fill="none" stroke="rgba(232,228,218,.5)" stroke-width="1.2"/>`,
    );
  } else {
    parts.push(
      `<line x1="${n(a.x)}" y1="${n(a.y)}" x2="${n(b.x)}" y2="${n(b.y)}" stroke="rgba(232,228,218,.2)" stroke-width="1.1"/>`,
    );
  }
}

// --- rooms, one glyph each -------------------------------------------------

function glyph(room, p, biome) {
  const c = biome.ink;
  const heat = Math.min(1, room.foes.length / 3);
  const op = (0.4 + heat * 0.5).toFixed(2);
  switch (room.kind) {
    case 'stair':
      return `<path d="M${n(p.x - 5)} ${n(p.y + 4)}h3.5v-3h3.5v-3h3.5" fill="none" stroke="${c}" stroke-width="1.5" opacity="${op}"/>`;
    case 'bridge':
      return `<path d="M${n(p.x - 6)} ${n(p.y - 2)}h12M${n(p.x - 6)} ${n(p.y + 2)}h12" stroke="${c}" stroke-width="1.4" opacity="${op}"/>`;
    case 'cave':
      return `<path d="M${n(p.x - 5)} ${n(p.y + 4)}a5 5.5 0 0 1 10 0z" fill="none" stroke="${c}" stroke-width="1.4" opacity="${op}"/>`;
    case 'yard':
      return `<circle cx="${n(p.x)}" cy="${n(p.y)}" r="4.4" fill="none" stroke="${c}" stroke-width="1.3" opacity="${op}"/>`;
    default:
      return `<rect x="${n(p.x - 4)}" y="${n(p.y - 3.4)}" width="8" height="6.8" fill="none" stroke="${c}" stroke-width="1.3" opacity="${op}"/>`;
  }
}

for (const spot of AREAS) {
  for (const id of spot.roomIds) {
    const room = roomOf(id);
    const p = place.get(id);

    if (room.boss) {
      parts.push(
        `<circle cx="${n(p.x)}" cy="${n(p.y)}" r="22" fill="#e2583f" opacity=".16" filter="url(#soft)"/>`,
        `<circle cx="${n(p.x)}" cy="${n(p.y)}" r="11" fill="#1a0d0c" stroke="#e2583f" stroke-width="2"/>`,
        // a crude sigil: two eyes and a crown notch
        `<path d="M${n(p.x - 4.5)} ${n(p.y - 1)}h3M${n(p.x + 1.5)} ${n(p.y - 1)}h3" stroke="#e2583f" stroke-width="1.8"/>`,
        `<path d="M${n(p.x - 5)} ${n(p.y + 4)}l2.5-2.5 2.5 2.5 2.5-2.5 2.5 2.5" fill="none" stroke="#e2583f" stroke-width="1.2" opacity=".8"/>`,
      );
      continue;
    }
    if (room.kind === 'bonfire') {
      parts.push(
        `<circle cx="${n(p.x)}" cy="${n(p.y)}" r="16" fill="#ffb347" opacity=".18" filter="url(#soft)"/>`,
        `<path d="M${n(p.x)} ${n(p.y - 7)}c4 4 3 7 0 9-3-2-4-5 0-9z" fill="#ffb347"/>`,
        `<path d="M${n(p.x - 6)} ${n(p.y + 5)}l12-3M${n(p.x - 6)} ${n(p.y + 2)}l12 3" stroke="#c98a56" stroke-width="1.4"/>`,
      );
      continue;
    }
    parts.push(glyph(room, p, spot.biome));
  }
}

// --- the folds, on top -----------------------------------------------------

for (const edge of LINKS) {
  if (!edge.shortcut) continue;
  const a = place.get(edge.a);
  const b = place.get(edge.b);
  if (!a || !b) continue;
  const bow = (b.y - a.y) * 0.28 + 90;
  const mx = (a.x + b.x) / 2 + bow * 0.5;
  const my = (a.y + b.y) / 2;
  parts.push(
    `<path d="M${n(a.x)} ${n(a.y)} Q${n(mx)} ${n(my)} ${n(b.x)} ${n(b.y)}" fill="none" stroke="#ffb347" stroke-width="6" opacity=".1" filter="url(#soft)"/>`,
    `<path d="M${n(a.x)} ${n(a.y)} Q${n(mx)} ${n(my)} ${n(b.x)} ${n(b.y)}" fill="none" stroke="#ffb347" stroke-width="2" stroke-dasharray="9 6" opacity=".9"/>`,
    `<circle cx="${n(b.x)}" cy="${n(b.y)}" r="6" fill="none" stroke="#ffb347" stroke-width="1.6" opacity=".9"/>`,
  );
}

// --- names -----------------------------------------------------------------

for (const spot of AREAS) {
  const label = spot.id.replace(/-/g, ' ').toUpperCase();
  const y = spot.cy + spot.radius * 0.72 + 26;
  const width = label.length * 8.4 + 26;
  parts.push(
    `<rect x="${n(spot.cx - width / 2)}" y="${n(y - 13)}" width="${n(width)}" height="19" fill="#05070a" fill-opacity=".85" stroke="${spot.biome.ink}" stroke-width=".8" stroke-opacity=".9"/>`,
    `<text x="${n(spot.cx)}" y="${n(y)}" fill="${spot.biome.ink}" font-family="ui-monospace,monospace" font-size="11" letter-spacing="2.4" text-anchor="middle">${label}</text>`,
  );
  if (spot.boss) {
    parts.push(
      `<text x="${n(spot.cx)}" y="${n(y + 17)}" fill="#e2583f" font-family="ui-monospace,monospace" font-size="10" letter-spacing="1.2" text-anchor="middle" opacity=".9">✝ ${spot.boss.replace(/-/g, ' ')}</text>`,
    );
  }
  const tierMark = `${spot.size} rooms · tier ${spot.tier}`;
  parts.push(
    `<text x="${n(spot.cx)}" y="${n(spot.cy - spot.radius * 0.72 - 12)}" fill="${spot.biome.ink}" opacity=".45" font-family="ui-monospace,monospace" font-size="9" text-anchor="middle">${tierMark}</text>`,
  );
}

// where you wake up
const startAt = place.get(START);
parts.push(
  `<circle cx="${n(startAt.x)}" cy="${n(startAt.y)}" r="30" fill="none" stroke="#e8e4da" stroke-width="1.4" opacity=".85"/>`,
  `<circle cx="${n(startAt.x)}" cy="${n(startAt.y)}" r="36" fill="none" stroke="#e8e4da" stroke-width=".8" opacity=".4"/>`,
  `<text x="${n(startAt.x)}" y="${n(startAt.y - 44)}" fill="#e8e4da" font-family="ui-monospace,monospace" font-size="10" letter-spacing="3" text-anchor="middle">YOU WAKE HERE</text>`,
);

// --- the frame -------------------------------------------------------------

const families = new Set(Object.values(FOES).map((f) => f.family));
parts.push(
  `<text x="60" y="72" fill="#e8e4da" font-family="ui-serif,Georgia,serif" font-size="34" letter-spacing="10">THE LANTERN</text>`,
  `<text x="62" y="98" fill="#7c8598" font-family="ui-monospace,monospace" font-size="12" letter-spacing="3.4">${AREAS.length} AREAS · ${ROOMS.length} ROOMS · ${BOSSES.length} BOSSES · ${FIRES.length} FIRES · ${Object.keys(FOES).length} FOE TYPES FROM ${families.size} FAMILIES</text>`,
  `<line x1="60" y1="112" x2="${W - 60}" y2="112" stroke="rgba(232,228,218,.16)"/>`,
  `<line x1="60" y1="${H - 128}" x2="${W - 60}" y2="${H - 128}" stroke="rgba(232,228,218,.16)"/>`,
);

const keyItems = [
  ['boss', '#e2583f', 'boss behind fog'],
  ['fire', '#ffb347', 'bonfire — respawn point'],
  ['hall', '#8794a8', 'hall'],
  ['stair', '#8794a8', 'stair'],
  ['bridge', '#8794a8', 'bridge'],
  ['cave', '#8794a8', 'cave'],
  ['yard', '#8794a8', 'yard'],
];
keyItems.forEach(([kind, colour, text], i) => {
  const x = 70 + i * 250;
  const y = H - 92;
  const p = { x: x + 8, y: y - 4 };
  if (kind === 'boss') {
    parts.push(`<circle cx="${n(p.x)}" cy="${n(p.y)}" r="8" fill="#1a0d0c" stroke="${colour}" stroke-width="2"/>`);
  } else if (kind === 'fire') {
    parts.push(`<path d="M${n(p.x)} ${n(p.y - 7)}c4 4 3 7 0 9-3-2-4-5 0-9z" fill="${colour}"/>`);
  } else {
    parts.push(glyph({ kind, foes: [1, 2, 3] }, p, { ink: colour }));
  }
  parts.push(
    `<text x="${n(x + 26)}" y="${n(y)}" fill="#7c8598" font-family="ui-monospace,monospace" font-size="12">${text}</text>`,
  );
});

parts.push(
  `<line x1="70" y1="${H - 56}" x2="120" y2="${H - 56}" stroke="#ffb347" stroke-width="2" stroke-dasharray="9 6"/>`,
  `<text x="132" y="${H - 52}" fill="#7c8598" font-family="ui-monospace,monospace" font-size="12">shortcut — opens from the far side only, and folds the world back on itself</text>`,
  `<text x="${W - 60}" y="${H - 52}" fill="#4a5568" font-family="ui-monospace,monospace" font-size="11" text-anchor="end">deepest room: ${Math.max(...deep.values())} rooms from the first fire · drawn from src/world.js, never by hand</text>`,
);

// biome key down the right edge
const usedBiomes = [...new Set(AREAS.map((a) => BIOME_OF[a.id] || 'stone'))];
usedBiomes.forEach((name, i) => {
  const y = 150 + i * 22;
  parts.push(
    `<rect x="${W - 150}" y="${y - 9}" width="12" height="12" fill="${BIOMES[name].fill}" stroke="${BIOMES[name].ink}"/>`,
    `<text x="${W - 132}" y="${y + 1}" fill="${BIOMES[name].ink}" font-family="ui-monospace,monospace" font-size="11" opacity=".8">${name}</text>`,
  );
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${parts.join('')}</svg>`;
mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist/map.svg'), svg);
console.log(`drew dist/map.svg — ${AREAS.length} areas, ${ROOMS.length} rooms, ${LINKS.length} doors`);
