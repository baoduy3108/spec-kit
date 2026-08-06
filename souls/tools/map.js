// Draws the world as an SVG: one dot per room, one line per door, areas
// laid out by how deep in they are. Not decoration — it is how you see at a
// glance whether the map folds back on itself or just runs in a line.

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { AREAS, BOSSES, FIRES, LINKS, ROOMS, START, depths, roomOf } from '../src/world.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const W = 1800;
const H = 1150;

// Areas sit in bands by tier; rooms spiral gently inside their area so a
// thirteen-room area reads as a place rather than a queue.
const deep = depths();
const tiers = [...new Set(AREAS.map((a) => a.tier))].sort((a, b) => a - b);
const byTierCount = new Map();
const place = new Map();

for (const spot of AREAS) {
  const row = tiers.indexOf(spot.tier);
  const seat = byTierCount.get(spot.tier) || 0;
  byTierCount.set(spot.tier, seat + 1);
  const wide = AREAS.filter((a) => a.tier === spot.tier).length;
  spot.cx = ((seat + 0.5) / wide) * (W - 180) + 90;
  spot.cy = 74 + (row / Math.max(1, tiers.length - 1)) * (H - 200);

  spot.roomIds.forEach((id, i) => {
    const angle = (i / spot.size) * Math.PI * 1.75 - 0.5;
    const radius = 12 + (i / spot.size) * 30;
    place.set(id, { x: spot.cx + Math.cos(angle) * radius, y: spot.cy + Math.sin(angle) * radius * 0.62 });
  });
}

const parts = [];
parts.push(
  `<rect width="${W}" height="${H}" fill="#0a0c11"/>`,
  `<text x="40" y="46" fill="#ffb347" font-family="ui-monospace,monospace" font-size="19" letter-spacing="6">THE LANTERN — ${AREAS.length} AREAS · ${ROOMS.length} ROOMS · ${BOSSES.length} BOSSES · ${FIRES.length} FIRES</text>`,
);

for (const edge of LINKS) {
  const a = place.get(edge.a);
  const b = place.get(edge.b);
  if (!a || !b) continue;
  if (edge.shortcut) {
    parts.push(
      `<path d="M${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${((a.x + b.x) / 2 + 60).toFixed(1)} ${((a.y + b.y) / 2).toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}" fill="none" stroke="#ffb347" stroke-width="2" stroke-dasharray="7 5" opacity=".85"/>`,
    );
  } else {
    const colour = edge.gate ? 'rgba(232,228,218,.42)' : 'rgba(232,228,218,.16)';
    parts.push(
      `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="${colour}" stroke-width="${edge.gate ? 1.6 : 1}"/>`,
    );
  }
}

for (const room of ROOMS) {
  const p = place.get(room.id);
  const isStart = room.id === START;
  if (room.boss) {
    parts.push(
      `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="9" fill="#e2583f" stroke="#0a0c11" stroke-width="2"/>`,
    );
  } else if (room.kind === 'bonfire') {
    parts.push(
      `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="6" fill="#ffb347"/>`,
      `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="13" fill="none" stroke="#ffb347" opacity=".3"/>`,
    );
  } else {
    const heat = Math.min(1, (room.foes.length || 0) / 3);
    parts.push(
      `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3.2" fill="rgba(232,228,218,${(0.3 + heat * 0.5).toFixed(2)})"/>`,
    );
  }
  if (isStart) {
    parts.push(
      `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="19" fill="none" stroke="#e8e4da" stroke-width="1.5"/>`,
    );
  }
}

for (const spot of AREAS) {
  const label = spot.id.replace(/-/g, ' ');
  parts.push(
    `<text x="${spot.cx.toFixed(1)}" y="${(spot.cy - 26).toFixed(1)}" fill="${spot.boss ? '#e2583f' : '#7c8598'}" font-family="ui-monospace,monospace" font-size="10.5" text-anchor="middle" letter-spacing="1.4">${label}</text>`,
  );
  if (spot.boss) {
    parts.push(
      `<text x="${spot.cx.toFixed(1)}" y="${(spot.cy + 52).toFixed(1)}" fill="#8a4a4a" font-family="ui-monospace,monospace" font-size="9" text-anchor="middle">${spot.boss.replace(/-/g, ' ')}</text>`,
    );
  }
}

const key = [
  ['#e2583f', 'boss behind fog'],
  ['#ffb347', 'bonfire'],
  ['rgba(232,228,218,.7)', 'room'],
];
key.forEach(([colour, text], i) => {
  const y = H - 58 + i * 18;
  parts.push(
    `<circle cx="48" cy="${y - 4}" r="5" fill="${colour}"/>`,
    `<text x="64" y="${y}" fill="#7c8598" font-family="ui-monospace,monospace" font-size="11">${text}</text>`,
  );
});
parts.push(
  `<line x1="240" y1="${H - 62}" x2="285" y2="${H - 62}" stroke="#ffb347" stroke-width="2" stroke-dasharray="7 5"/>`,
  `<text x="296" y="${H - 58}" fill="#7c8598" font-family="ui-monospace,monospace" font-size="11">shortcut — opens from the far side only</text>`,
  `<text x="${W - 40}" y="${H - 24}" fill="#4a5568" font-family="ui-monospace,monospace" font-size="10" text-anchor="end">deepest room: ${Math.max(...deep.values())} rooms from the first fire</text>`,
);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${parts.join('')}</svg>`;
mkdirSync(join(root, 'dist'), { recursive: true });
const out = join(root, 'dist/map.svg');
writeFileSync(out, svg);
console.log(`drew ${out} — ${ROOMS.length} rooms, ${LINKS.length} doors`);
