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
