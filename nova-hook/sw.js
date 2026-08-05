// Cache-first service worker: after the first visit the game is fully
// playable offline, which is what makes the PWA install worth doing.

const CACHE = 'nova-hook-v1';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './manifest.webmanifest',
  './icon.svg',
  './src/main.js',
  './src/core/art.js',
  './src/core/audio.js',
  './src/core/fx.js',
  './src/core/input.js',
  './src/core/loop.js',
  './src/core/mathx.js',
  './src/core/rng.js',
  './src/game/coach.js',
  './src/game/config.js',
  './src/game/level.js',
  './src/game/physics.js',
  './src/game/render.js',
  './src/game/scoring.js',
  './src/game/world.js',
  './src/meta/missions.js',
  './src/meta/save.js',
  './src/meta/skins.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((hit) => {
      if (hit) return hit;
      return fetch(event.request)
        .then((res) => {
          if (res && res.ok && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(event.request, copy));
          }
          return res;
        })
        .catch(() => caches.match('./index.html'));
    }),
  );
});
