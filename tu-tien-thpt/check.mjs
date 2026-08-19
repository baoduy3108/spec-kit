/* Kiểm tra cú pháp + thống kê ngân hàng câu hỏi, mô phỏng môi trường trình duyệt */
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const ctx = vm.createContext({ console });
ctx.window = ctx;            // window === globalThis, giống trình duyệt
ctx.globalThis = ctx;
ctx.document = { addEventListener() {}, getElementById: () => null, querySelectorAll: () => [], body: {} };
ctx.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };

const files = process.argv.slice(2);
for (const f of files) {
  const src = fs.readFileSync(path.resolve(ROOT, f), 'utf8');
  try { vm.runInContext(src, ctx, { filename: f }); }
  catch (e) { console.error(`✗ ${f}: ${e.message}`); process.exit(1); }
  console.log(`✓ ${f}`);
}

const TD = ctx.TD || {};
const K = TD.KHO || {};
let tongKQ = 0, tongCH = 0;
for (const [k, v] of Object.entries(K)) {
  if (!Array.isArray(v)) continue;
  const n = v.length;
  if (k.endsWith('_kq')) tongKQ += n; else tongCH += n;
  console.log(`   ${k.padEnd(16)} ${String(n).padStart(4)} mục`);
}
console.log(`\n   TỔNG: ${tongKQ} khẩu quyết · ${tongCH} câu hỏi/thẻ khác`);

/* Kiểm tra tính hợp lệ của câu hỏi */
let loi = 0;
for (const [k, v] of Object.entries(K)) {
  if (!Array.isArray(v) || k.endsWith('_kq')) continue;
  v.forEach((q, i) => {
    const nhan = `${k}[${i}]`;
    if (!q.dang) return;                       // thẻ lý thuyết, bỏ qua
    if (q.dang === 'mc') {
      if (!Array.isArray(q.opts) || q.opts.length !== 4) { console.error(`✗ ${nhan}: cần đúng 4 phương án`); loi++; }
      if (typeof q.ans !== 'number' || q.ans < 0 || q.ans > 3) { console.error(`✗ ${nhan}: ans phải là 0..3`); loi++; }
    } else if (q.dang === 'ds') {
      if (!Array.isArray(q.items) || q.items.length !== 4) { console.error(`✗ ${nhan}: câu đúng/sai cần đúng 4 ý`); loi++; }
      else q.items.forEach((it, j) => { if (typeof it.a !== 'boolean') { console.error(`✗ ${nhan} ý ${j}: thiếu a:true/false`); loi++; } });
    } else if (q.dang === 'tln') {
      if (q.ans === undefined || q.ans === null || String(q.ans).trim() === '') { console.error(`✗ ${nhan}: thiếu đáp án trả lời ngắn`); loi++; }
      /* Đáp án phải xuất hiện trong lời giải — bắt lỗi lệch giữa ans và giải */
      else if (q.giai) {
        const canhan = String(q.ans).split(';').map(s => s.trim()).filter(Boolean);
        /* bỏ khoảng trắng phân nhóm nghìn (21 000) để so khớp */
        const giaiPhang = q.giai.replace(/(\d)[\s\u00A0](?=\d)/g, '$1');
        const thieu = canhan.filter(v => !giaiPhang.includes(v) && !giaiPhang.includes(v.replace(',', '.')));
        if (thieu.length) { console.error(`✗ ${nhan}: đáp án "${thieu.join(', ')}" không xuất hiện trong lời giải`); loi++; }
      }
    } else { console.error(`✗ ${nhan}: dạng lạ "${q.dang}"`); loi++; }
    if (!q.muc || q.muc < 1 || q.muc > 4) { console.error(`✗ ${nhan}: muc phải 1..4`); loi++; }
    if (!q.q) { console.error(`✗ ${nhan}: thiếu đề bài`); loi++; }
  });
}
console.log(loi ? `\n✗ ${loi} lỗi dữ liệu` : '\n✓ Dữ liệu hợp lệ');
process.exit(loi ? 1 : 0);
