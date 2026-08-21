/* ============================================================
   SINH CÂU VẬN DỤNG CAO DẠNG TRẮC NGHIỆM CHO MÔN TỰ NHIÊN
   Toán, Lí, Hoá, Sinh có hàng chục mẫu vận dụng cao nhưng TOÀN BỘ
   đều là dạng trả lời ngắn. Phần I của bốn môn này (12–18 câu trắc
   nghiệm) vì thế không thể có câu mức 4 nào, trần mức 4 của cả đề
   chỉ đạt 25–32% — thấp hơn mục tiêu 37% của Cửu Trọng Lôi Kiếp.
   Hệ quả: đề "học sinh giỏi" bị engine vét đầy câu mức 1 và mức 3.
   Đề thật thì Phần I vẫn có câu phân hoá ở cuối (câu 16–18).

   File này dựng bản SONG SINH dạng trắc nghiệm cho mỗi mẫu vận dụng
   cao dạng trả lời ngắn. Phương án nhiễu KHÔNG lấy ngẫu nhiên mà rút
   từ chính các KẾT QUẢ TRUNG GIAN trong lời giải — đó đúng là những
   con số học sinh hay dừng lại ở đó rồi tô nhầm, nên nhiễu vừa hợp lí
   vừa đánh trúng cái bẫy thật của bài.
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {};

(function () {

/* Đọc số kiểu Việt Nam ("1.234,56" hoặc "12,5") thành số thực */
const doSo = t => {
  const s = String(t).replace(/[−–—]/g, '-').replace(/\./g, '').replace(',', '.');
  const v = parseFloat(s);
  return isFinite(v) ? v : NaN;
};
/* Số chữ số thập phân của đáp án, để mọi phương án cùng độ chính xác */
const soLe = t => { const i = String(t).indexOf(','); return i < 0 ? 0 : String(t).length - i - 1; };
const inSo = (v, n) => (n ? v.toFixed(n) : String(Math.round(v))).replace('.', ',');

/* Rút các con số trung gian trong lời giải làm phương án nhiễu */
const nhieuTuLoiGiai = (giai, dap, n, deBai) => {
  const goc = doSo(dap);
  if (!isFinite(goc) || goc === 0) return [];
  const ra = [], daCo = { [inSo(goc, n)]: 1 };
  /* Số đã có sẵn trong ĐỀ BÀI thì không dùng làm nhiễu: học sinh nhận ra ngay
     đó là dữ kiện chép lại, phương án đó thành vô dụng. */
  (String(deBai || '').replace(/<[^>]+>/g, '').match(/-?\d[\d.]*(?:,\d+)?/g) || [])
    .forEach(x => { const v = doSo(x); if (isFinite(v)) daCo[inSo(v, n)] = 1; });
  const ung = String(giai).replace(/<[^>]+>/g, '').match(/-?\d[\d.]*(?:,\d+)?/g) || [];
  for (const x of ung) {
    const v = doSo(x);
    if (!isFinite(v) || v === 0) continue;
    if (goc > 0 && v < 0) continue;                  /* đáp án dương thì nhiễu cũng phải dương */
    const ti = Math.abs(v / goc);
    /* Chỉ nhận số CÙNG BẬC ĐỘ LỚN với đáp án. Kết quả trung gian ở đơn vị khác
       (số mol so với kilôgam chẳng hạn) lệch cả chục lần thì ai nhìn cũng loại được,
       lấy làm nhiễu chỉ tổ biến câu bốn lựa chọn thành câu hai lựa chọn. */
    if (ti < 0.25 || ti > 4 || (ti > 0.98 && ti < 1.02)) continue;
    const k = inSo(v, n);
    if (daCo[k]) continue;
    daCo[k] = 1; ra.push(v);
    if (ra.length >= 12) break;
  }
  /* Nhiễu càng gần đáp án càng khó loại. Xếp theo khoảng cách tỉ lệ tăng dần
     rồi mới lấy — nếu không, phương án lệch mười lần sẽ lọt vào và ai cũng gạt được. */
  return ra.sort((a, b) => Math.abs(Math.log(Math.abs(a / goc))) - Math.abs(Math.log(Math.abs(b / goc))));
};

/* Nhiễu dự phòng: nhân đôi, chia đôi, lệch 10% — mô phỏng các lỗi hay gặp */
const nhieuDuPhong = (goc, coSan, n) => {
  const ra = [], daCo = { [inSo(goc, n)]: 1 };
  coSan.forEach(v => daCo[inSo(v, n)] = 1);
  for (const he of [2, 0.5, 1.1, 0.9, 1.5, 3, 1 / 3, 0.25, 4]) {
    const v = goc * he;
    const k = inSo(v, n);
    if (daCo[k] || !isFinite(v) || v === 0) continue;
    daCo[k] = 1; ra.push(v);
    if (ra.length >= 4) break;
  }
  return ra;
};

TD.mcTuTln = function (mau) {
  return {
    ma: mau.ma + '-mc', chuong: mau.chuong, muc: mau.muc, dang: 'mc',
    _song: true,                                  /* bản song sinh — Tà Đạo bài tập bỏ qua để khỏi lặp */
    tao(R) {
      const o = mau.tao(R);
      if (!o || o.ans === undefined || o.opts) return null;
      const dap = String(o.ans);
      if (dap.indexOf(';') >= 0 || dap.indexOf('/') >= 0) return null;   /* đáp án nhiều phần hoặc phân số: bỏ */
      const goc = doSo(dap);
      if (!isFinite(goc) || goc === 0) return null;
      const n = soLe(dap);

      let bo = nhieuTuLoiGiai(o.giai, dap, n, o.q).slice(0, 3);
      if (bo.length < 3) bo = bo.concat(nhieuDuPhong(goc, bo, n)).slice(0, 3);
      if (bo.length < 3) return null;

      const dv = (String(o.q).match(/\(đơn vị[^)]*\)/i) || [''])[0];
      const opts = TD.xaoR(R, [goc].concat(bo)).map(v => inSo(v, n));
      if (new Set(opts).size !== 4) return null;

      /* bỏ chỉ dẫn làm tròn vì phương án đã cho sẵn độ chính xác */
      /* Bỏ chỉ dẫn làm tròn vì phương án đã cho sẵn độ chính xác.
         Phải giữ nguyên dấu ngoặc bao ngoài: chỉ dẫn này thường nằm lẫn trong
         ngoặc dữ kiện "(Ca = 40; Mg = 24; làm tròn đến hàng phần nghìn)". */
      const de = String(o.q)
        .replace(/[;,]?\s*làm tròn đến hàng [^).;]*/gi, '')      /* nằm trong ngoặc dữ kiện */
        .replace(/\s*\(\s*\)/g, '')                            /* ngoặc rỗng còn lại */
        .replace(/\(\s*([;,])\s*/g, '(')                        /* ngoặc mở thừa dấu phẩy */
        .replace(/\s*([;,])\s*\)/g, ')')                        /* dấu phẩy sát ngoặc đóng */
        .replace(/\s{2,}/g, ' ')
        .replace(/\s+([.?])/g, '$1')
        .trim();

      return {
        q: de + (de.endsWith('?') ? '' : '') ,
        opts: opts,
        ans: opts.indexOf(inSo(goc, n)),
        giai: o.giai + '\n\nCác phương án nhiễu đều là KẾT QUẢ TRUNG GIAN của chính bài này — '
            + 'dừng sớm ở bước nào là tô trúng đáp án sai ở đó. Tính xong luôn hỏi lại: '
            + 'đã đi hết các bước chưa, đơn vị đã đúng chưa.' + dv,
        meo: o.meo
      };
    }
  };
};

/* Đăng ký bản song sinh cho các mẫu vận dụng cao dạng trả lời ngắn của bốn môn tự nhiên.
   Chỉ giữ lại mẫu nào thật sự dựng được câu hợp lệ. */
TD.dangKyVdcMc = function () {
  if (TD._daDangKyVdcMc) return;
  TD._daDangKyVdcMc = true;
  for (const mon of ['toan', 'ly', 'hoa', 'sinh']) {
    const goc = (TD.GEN[mon] || []).filter(t => t.muc === 4 && t.dang === 'tln' && !t._song);
    const them = [];
    for (const t of goc) {
      const st = TD.mcTuTln(t);
      /* thử 30 hạt giống, đạt quá nửa mới nhận — mẫu nào kén quá thì bỏ */
      let ok = 0;
      for (let k = 0; k < 30; k++) if (st.tao(TD.rng((Math.random() * 4294967295) >>> 0))) ok++;
      if (ok >= 18) them.push(st);
    }
    TD.GEN[mon] = (TD.GEN[mon] || []).concat(them);
  }
};

})();
