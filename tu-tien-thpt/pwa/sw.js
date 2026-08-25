/* Service worker Thiên Đạo Lộ — bản dựng 68252fb45f
   Giữ nguyên game trong máy: lần đầu vào có mạng là xong, sau đó
   tắt mạng vẫn mở được, kể cả khi đã cài ra màn hình chính. */
const KHO = 'thien-dao-lo-68252fb45f';
const TAI_SAN = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-192.png",
  "./icons/maskable-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png"
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(KHO);
    /* addAll hỏng cả mẻ nếu một file lỗi ⇒ tải từng cái, thiếu icon
       cũng không được phép làm hỏng việc cài đặt. */
    await Promise.all(TAI_SAN.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => {})));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const ten = await caches.keys();
    await Promise.all(ten.filter(t => t !== KHO && t.startsWith('thien-dao-lo-')).map(t => caches.delete(t)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', e => { if (e.data === 'thay-ngay') self.skipWaiting(); });

self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin !== self.location.origin) return;

  /* Mở app: ưu tiên bản trong máy cho nhanh, đồng thời lặng lẽ tải bản
     mới về để lần sau có ngay. Mất mạng vẫn trả được trang. */
  if (r.mode === 'navigate') {
    e.respondWith((async () => {
      const c = await caches.open(KHO);
      const cu = await c.match('./index.html');
      const moi = fetch(r).then(res => { if (res && res.ok) c.put('./index.html', res.clone()); return res; })
                          .catch(() => null);
      return cu || (await moi) || new Response('<h1>Chưa tải được</h1>', { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    })());
    return;
  }

  e.respondWith((async () => {
    const c = await caches.open(KHO);
    const cu = await c.match(r);
    if (cu) return cu;
    try {
      const res = await fetch(r);
      if (res && res.ok && res.type === 'basic') c.put(r, res.clone());
      return res;
    } catch (loi) {
      return cu || Response.error();
    }
  })());
});
