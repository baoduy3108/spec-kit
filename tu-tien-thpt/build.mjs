/* Gộp toàn bộ game thành MỘT file HTML tự chứa — mở được offline, gửi qua Zalo/USB đều chạy. */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const doc = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

let html = doc('index.html');

/* nhúng CSS */
html = html.replace(/<link rel="stylesheet" href="([^"]+)">/g,
  (_, href) => `<style>\n${doc(href)}\n</style>`);

/* nhúng JS theo đúng thứ tự khai báo */
html = html.replace(/<script src="([^"]+)"><\/script>/g,
  (_, src) => `<script>\n${doc(src)}\n</script>`);

const ra = path.join(ROOT, 'thien-dao-lo.html');
fs.writeFileSync(ra, html, 'utf8');

const kb = (fs.statSync(ra).size / 1024).toFixed(0);
console.log(`✓ Đã dựng: thien-dao-lo.html (${kb} KB)`);
if (/<script src=|<link rel="stylesheet" href=/.test(html))
  { console.error('✗ Vẫn còn tài nguyên ngoài chưa nhúng!'); process.exit(1); }

/* ---- Bản dành cho Artifact: chỉ phần thân, không doctype/html/head/body ---- */
const lay = (re) => { const m = html.match(re); return m ? m[1] : ''; };
const tieuDe = lay(/<title>([\s\S]*?)<\/title>/);
const css    = lay(/<style>([\s\S]*?)<\/style>/);
const than   = lay(/<body>([\s\S]*?)<\/body>/);

const artifact = `<title>${tieuDe}</title>\n<style>\n${css}\n</style>\n${than}\n`;
const raA = path.join(ROOT, 'thien-dao-lo.artifact.html');
fs.writeFileSync(raA, artifact, 'utf8');
if (/<!DOCTYPE|<html|<head|<body/i.test(artifact)) { console.error('✗ Bản artifact còn thẻ khung!'); process.exit(1); }
console.log(`✓ Đã dựng: thien-dao-lo.artifact.html (${(fs.statSync(raA).size / 1024).toFixed(0)} KB)`);

/* ============================================================
   BẢN PWA — cài được lên màn hình chính điện thoại, chạy offline
   Khác bản một file ở ba thứ: có manifest, có service worker
   giữ sẵn toàn bộ game trong máy, và có bộ icon.
   Service worker chỉ chạy trên http/https nên bản file:// vẫn
   dùng bình thường, không đụng gì tới nhau.
   ============================================================ */
import crypto from 'node:crypto';

const PWA = path.join(ROOT, 'pwa');
fs.mkdirSync(path.join(PWA, 'icons'), { recursive: true });

/* Mã bản dựng đổi theo nội dung ⇒ máy người dùng biết có bản mới mà tải lại. */
const ma = crypto.createHash('sha1').update(html).digest('hex').slice(0, 10);

const manifest = {
  name: 'Thiên Đạo Lộ — Ôn thi THPT',
  short_name: 'Thiên Đạo Lộ',
  description: 'Game tu tiên hoá thành lộ trình ôn thi tốt nghiệp THPT 9 môn, chạy hoàn toàn offline.',
  lang: 'vi',
  start_url: './',
  scope: './',
  id: '/thien-dao-lo/',
  display: 'standalone',
  display_override: ['standalone', 'fullscreen', 'minimal-ui'],
  orientation: 'portrait',
  background_color: '#0d1117',
  theme_color: '#0d1117',
  categories: ['education'],
  icons: [
    { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: 'icons/maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
    { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
  ]
};
fs.writeFileSync(path.join(PWA, 'manifest.webmanifest'), JSON.stringify(manifest, null, 2), 'utf8');

const TAI_SAN = ['./', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png',
  './icons/maskable-192.png', './icons/maskable-512.png',
  './icons/apple-touch-icon.png', './icons/favicon-32.png'];

const sw = `/* Service worker Thiên Đạo Lộ — bản dựng ${ma}
   Giữ nguyên game trong máy: lần đầu vào có mạng là xong, sau đó
   tắt mạng vẫn mở được, kể cả khi đã cài ra màn hình chính. */
const KHO = 'thien-dao-lo-${ma}';
const TAI_SAN = ${JSON.stringify(TAI_SAN, null, 2)};

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
`;
fs.writeFileSync(path.join(PWA, 'sw.js'), sw, 'utf8');

/* Chèn phần PWA vào bản HTML một file: manifest, icon, và đoạn đăng ký sw. */
const dauHead = `<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icons/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="Thiên Đạo Lộ">
</head>`;

const dangKy = `<script>
/* Chỉ đăng ký khi chạy qua http/https — mở thẳng bằng file:// thì trình
   duyệt không cho phép service worker, mà bản đó vốn đã offline sẵn. */
(function () {
  if (!('serviceWorker' in navigator)) return;
  if (!/^https?:$/.test(location.protocol)) return;
  var daNhac = false;
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js', { scope: './' }).then(function (dk) {
      dk.addEventListener('updatefound', function () {
        var moi = dk.installing; if (!moi) return;
        moi.addEventListener('statechange', function () {
          /* có controller nghĩa là bản cũ đang chạy ⇒ đây là BẢN CẬP NHẬT,
             không phải lần cài đầu tiên. */
          if (moi.state === 'installed' && navigator.serviceWorker.controller && !daNhac) {
            daNhac = true;
            if (window.TD && TD.bao) TD.bao('Đã có bản mới — đóng rồi mở lại app để dùng.', 'kim');
          }
        });
      });
    }).catch(function () { /* không đăng ký được thì game vẫn chạy như thường */ });
  });
})();
</script>
</body>`;

const htmlPwa = html.replace('</head>', dauHead).replace('</body>', dangKy);
if (htmlPwa === html) { console.error('✗ Không chèn được phần PWA!'); process.exit(1); }
fs.writeFileSync(path.join(PWA, 'index.html'), htmlPwa, 'utf8');

/* .nojekyll để GitHub Pages không nuốt thư mục bắt đầu bằng dấu gạch dưới */
fs.writeFileSync(path.join(PWA, '.nojekyll'), '', 'utf8');

const thieu = TAI_SAN.filter(u => u !== './' && !fs.existsSync(path.join(PWA, u.replace('./', ''))));
if (thieu.length) { console.error('✗ Thiếu tài sản PWA: ' + thieu.join(', ')); process.exit(1); }
console.log(`✓ Đã dựng: pwa/ (index.html ${(fs.statSync(path.join(PWA, 'index.html')).size / 1024).toFixed(0)} KB, bản ${ma})`);
