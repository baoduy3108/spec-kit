/* Sinh hàng loạt biến thể của mỗi mẫu đề rồi soi lại tính đúng đắn. */
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';

const ROOT = path.dirname(new URL(import.meta.url).pathname);
const ctx = vm.createContext({ console, Math, Date, JSON, String, Number, Object, Array, parseFloat, isNaN });
ctx.window = ctx; ctx.globalThis = ctx;
ctx.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };

const THU_TU_INDEX = [...fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8')
  .matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]).filter(f => f !== 'src/app.js');   /* app.js là giao diện, không phải dữ liệu */
for (const f of (process.argv.length > 2 ? process.argv.slice(2) : THU_TU_INDEX))
  vm.runInContext(fs.readFileSync(path.resolve(ROOT, f), 'utf8'), ctx, { filename: f });

const TD = ctx.TD;
const LAN = 400;                       /* số biến thể thử mỗi mẫu */
let loi = 0, tongSinh = 0, tongBienThe = 0;

const bao = (ma, msg, q) => {
  loi++;
  console.error(`✗ [${ma}] ${msg}`);
  if (q) console.error(`   đề: ${String(q.q).slice(0, 110)}\n   ans: ${JSON.stringify(q.ans)}`);
};

for (const mon of Object.keys(TD.GEN)) {
  console.log(`\n── ${mon.toUpperCase()} — ${TD.GEN[mon].length} mẫu đề`);
  for (const mau of TD.GEN[mon]) {
    let ok = 0, rong = 0;
    const deKhac = new Set();
    for (let k = 0; k < LAN; k++) {
      let q;
      try { q = mau.tao(TD.rng((k * 2654435761 + 12345) >>> 0)); }
      catch (e) { bao(mau.ma, `ném lỗi khi sinh đề: ${e.message}`); break; }
      if (q) q = TD.sinhCau(mau, (k * 2654435761 + 12345) >>> 0);
      if (!q) { rong++; continue; }
      tongSinh++;
      const chuoi = JSON.stringify(q);

      if (/NaN|undefined|Infinity/.test(chuoi)) { bao(mau.ma, 'có NaN/undefined/Infinity', q); break; }
      if (!q.q || !q.giai) { bao(mau.ma, 'thiếu đề hoặc lời giải', q); break; }
      if (q.muc < 1 || q.muc > 4) { bao(mau.ma, 'mức độ không hợp lệ'); break; }

      if (q.dang === 'tln') {
        if (q.ans === undefined || String(q.ans).trim() === '') { bao(mau.ma, 'đáp án rỗng', q); break; }
        /* đáp án phải xuất hiện nguyên vẹn trong lời giải */
        const phang = q.giai.replace(/(\d)[\s ](?=\d)/g, '$1');
        const canhan = String(q.ans).split(';').map(s => s.trim());
        const thieu = canhan.filter(v => !phang.includes(v));
        if (thieu.length) { bao(mau.ma, `đáp án "${thieu.join(',')}" không có trong lời giải`, q); break; }
        /* đáp án không được là số âm hoặc 0 với các đại lượng vật chất */
        /* Chỉ đại lượng vật chất mới bắt buộc dương. Toán, Lí có đáp án âm hợp lệ
           (tổng cấp số, hệ số góc, nghiệm phương trình, độ biến thiên nội năng...). */
        const phaiDuong = mau.duong !== undefined ? mau.duong : (mon === 'hoa' && !mau.chapNhanKhong);
        const so = parseFloat(String(q.ans).replace(',', '.'));
        if (phaiDuong && !isNaN(so) && so <= 0) { bao(mau.ma, `đáp án không dương: ${q.ans}`, q); break; }
        /* Đề đã ghi rõ làm tròn tới hàng nào thì đáp án phải ghi đúng bấy nhiêu chữ số thập phân.
           Thiếu chữ số là học sinh tính đúng vẫn bị chấm sai — lỗi này lời giải không lộ ra. */
        const BAC = { 'đơn vị': 0, 'phần mười': 1, 'phần trăm': 2, 'phần nghìn': 3, 'phần vạn': 4, 'phần trăm nghìn': 5 };
        const yc = String(q.q).match(/làm tròn đến hàng (phần trăm nghìn|đơn vị|phần mười|phần trăm|phần nghìn|phần vạn)(?! nếu)/);
        if (yc && String(q.ans).indexOf(';') < 0 && !isNaN(so)) {
          const can = BAC[yc[1]];
          const day = so.toFixed(can);                       /* dạng đủ chữ số */
          const gon = can ? day.replace(/0+$/, '').replace(/\.$/, '') : day;
          const dap = String(q.ans).replace(',', '.');
          /* Chấp nhận cả dạng đủ (2,50) lẫn dạng đã cắt số 0 cuối (2,5);
             mọi dạng khác nghĩa là đáp án sai độ chính xác so với yêu cầu của đề. */
          if (dap !== day && dap !== gon) {
            bao(mau.ma, `đề yêu cầu làm tròn đến hàng ${yc[1]} nhưng đáp án là "${q.ans}" (đúng phải là "${day.replace('.', ',')}")`, q);
            break;
          }
        }
      } else if (q.dang === 'mc') {
        if (!Array.isArray(q.opts) || q.opts.length !== 4) { bao(mau.ma, 'không đủ 4 phương án', q); break; }
        if (new Set(q.opts).size !== 4) { bao(mau.ma, 'có phương án trùng nhau', q); break; }
        if (typeof q.ans !== 'number' || q.ans < 0 || q.ans > 3) { bao(mau.ma, 'chỉ số đáp án sai', q); break; }
      } else if (q.dang === 'ds') {
        if (!Array.isArray(q.items) || q.items.length !== 4) { bao(mau.ma, 'câu đúng/sai không đủ 4 ý', q); break; }
        if (q.items.some(x => typeof x.a !== 'boolean' || !x.t)) { bao(mau.ma, 'ý thiếu nội dung hoặc thiếu đúng/sai', q); break; }
        if (new Set(q.items.map(x => x.t)).size !== 4) { bao(mau.ma, 'có ý trùng nhau', q); break; }
      }
      deKhac.add(String(q.q) + '|' + JSON.stringify(q.ans) + JSON.stringify(q.opts || q.items || ''));
      ok++;
    }
    const tiLeRong = Math.round((rong / LAN) * 100);
    const canh = tiLeRong > 40 ? `  ⚠ ${tiLeRong}% lượt sinh bị bỏ` : '';
    console.log(`   ${mau.ma.padEnd(22)} ${String(ok).padStart(3)}/${LAN} đạt · ${String(deKhac.size).padStart(3)} đề khác nhau${canh}`);
    const SAN = mau.toiThieu || 50;          /* mỗi mẫu phải đẻ được ít nhất 50 đề khác nhau */
    if (ok === 0) bao(mau.ma, 'không sinh được câu nào — mẫu đề hỏng hoặc điều kiện lọc quá chặt');
    if (ok > 100 && deKhac.size < SAN) bao(mau.ma, `quá ít biến thể: chỉ ${deKhac.size} đề khác nhau (cần ≥ ${SAN})`);
    tongBienThe += deKhac.size;
  }
}

console.log(`\nĐã sinh và soi ${tongSinh.toLocaleString('vi-VN')} câu.`);
console.log(`Quan sát được ${tongBienThe.toLocaleString('vi-VN')} đề KHÁC NHAU chỉ trong ${LAN} lượt lấy mẫu mỗi mẫu đề`);
console.log(`— không gian đề thật sự lớn hơn con số này nhiều lần.`);
console.log(loi ? `✗ ${loi} lỗi` : '✓ Không có lỗi');
process.exit(loi ? 1 : 0);
