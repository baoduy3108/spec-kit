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
