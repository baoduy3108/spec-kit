// Cosmetics only. Skins change colour, never speed, hitbox or scoring —
// paying players and free players play the exact same game.

export const SKINS = [
  {
    id: 'ion',
    name: 'Ion',
    cost: 0,
    tagline: 'Standard issue.',
    palette: { hull: '#0f1030', glow: '#6ef0ff', trail: '#6ef0ff', shard: '#ffd66e' },
  },
  {
    id: 'ember',
    name: 'Ember',
    cost: 250,
    tagline: 'Burns the dark.',
    palette: { hull: '#2a0a10', glow: '#ff8a3d', trail: '#ff5a2b', shard: '#ffd66e' },
  },
  {
    id: 'orchid',
    name: 'Orchid',
    cost: 600,
    tagline: 'Bloom in the void.',
    palette: { hull: '#22062e', glow: '#ff5ad8', trail: '#c05bff', shard: '#8ef6ff' },
  },
  {
    id: 'venom',
    name: 'Venom',
    cost: 1200,
    tagline: 'Acid green, zero chill.',
    palette: { hull: '#08210f', glow: '#7dff5a', trail: '#c9ff3d', shard: '#7dff5a' },
  },
  {
    id: 'glacier',
    name: 'Glacier',
    cost: 2200,
    tagline: 'Cold, clean lines.',
    palette: { hull: '#08243a', glow: '#c9f4ff', trail: '#7fd8ff', shard: '#ffffff' },
  },
  {
    id: 'solaris',
    name: 'Solaris',
    cost: 4000,
    tagline: 'For people who chain twenty.',
    palette: { hull: '#3a2100', glow: '#ffd166', trail: '#ff9f1c', shard: '#fff3c4' },
  },
];

export function skinById(id) {
  return SKINS.find((s) => s.id === id) || SKINS[0];
}

/** Shards earned by a run convert 1:1 into coins, with a combo kicker. */
export function coinsForRun(summary) {
  return Math.floor(summary.shards + summary.score / 100 + summary.combo * 2);
}
