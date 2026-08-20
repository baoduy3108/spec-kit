/* ============================================================
   TRẠNG THÁI & LƯU TIẾN ĐỘ (localStorage) + THUẬT TOÁN ÔN GIÃN CÁCH
   ============================================================ */
window.TD = window.TD || {};

TD.KHOA = 'thien-dao-lo-v1';

TD.macDinhTrangThai = function () {
  return {
    ten: 'Đạo hữu',
    exp: 0,
    linh_thach: 100,
    ngay_thi: TD.MAC_DINH.ngay_thi,
    to_hop: TD.MAC_DINH.to_hop.slice(),
    chi_tieu_ngay: TD.MAC_DINH.chi_tieu_ngay,
    so_cau_phien: 30,           /* độ dài mỗi phiên Luyện Công */
    bat_dau: TD.homNay(),
    /* thống kê: thong_ke[mon][muc] = {dung, tong} */
    thong_ke: {},
    /* nhật ký theo ngày: nhat_ky['2026-08-19'] = số câu đã làm */
    nhat_ky: {},
    /* thẻ ôn giãn cách: the[id] = {lan, khoang, de, han, sai} */
    the: {},
    /* khẩu quyết đã "khắc cốt" */
    da_khac: {},
    /* kết quả độ kiếp: do_kiep[mon] = [{ngay, diem}] */
    do_kiep: {},
    /* kết quả Tà Đạo: ta_dao['mon|loai|so'] = {pt, dung, tong, ngay} */
    ta_dao: {},
    /* tiến độ đang dở của bộ đề Tà Đạo */
    ta_dao_tien: {},
    tui: { thien_co: 2, hoi_xuan: 1, ngo_dao: 0, truy_hon: 1 },
    chuoi: 0, chuoi_max: 0,
    ngay_lien_tiep: 0, ngay_cuoi: null
  };
};

TD.homNay = function () {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
};

TD.tai = function () {
  let s;
  try { s = JSON.parse(localStorage.getItem(TD.KHOA) || 'null'); } catch (e) { s = null; }
  const md = TD.macDinhTrangThai();
  if (!s) return md;
  /* bổ sung khoá mới khi nâng cấp phiên bản */
  for (const k in md) if (!(k in s)) s[k] = md[k];
  return s;
};

TD.luu = function () {
  try { localStorage.setItem(TD.KHOA, JSON.stringify(TD.S)); }
  catch (e) { console.warn('Không lưu được tiến độ:', e); }
};

TD.xoaHet = function () {
  try { localStorage.removeItem(TD.KHOA); } catch (e) {}
  TD.S = TD.macDinhTrangThai();
};

/* ---------- CẢNH GIỚI ---------- */
TD.canhGioi = function (exp) {
  let cg = TD.CANH_GIOI[0];
  for (const c of TD.CANH_GIOI) if (exp >= c.exp) cg = c;
  return cg;
};

TD.canhGioiSau = function (exp) {
  for (const c of TD.CANH_GIOI) if (exp < c.exp) return c;
  return null;
};

/* Tỉ lệ % tiến độ tới cảnh giới kế tiếp */
TD.tienDoCanhGioi = function (exp) {
  const nay = TD.canhGioi(exp), sau = TD.canhGioiSau(exp);
  if (!sau) return 100;
  const khoang = sau.exp - nay.exp;
  return khoang <= 0 ? 100 : Math.min(100, Math.round(((exp - nay.exp) / khoang) * 100));
};

/* ---------- CỘNG LINH KHÍ ---------- */
TD.themExp = function (n) {
  const truoc = TD.canhGioi(TD.S.exp);
  TD.S.exp += n;
  const sau = TD.canhGioi(TD.S.exp);
  if (sau.id !== truoc.id) TD.moDotPha(sau);
  return sau.id !== truoc.id;
};

/* ---------- ĐIỂM DANH NGÀY ---------- */
TD.diemDanh = function () {
  const h = TD.homNay();
  if (TD.S.ngay_cuoi === h) return;
  if (TD.S.ngay_cuoi) {
    const cach = Math.round((new Date(h) - new Date(TD.S.ngay_cuoi)) / 86400000);
    TD.S.ngay_lien_tiep = cach === 1 ? TD.S.ngay_lien_tiep + 1 : 1;
  } else TD.S.ngay_lien_tiep = 1;
  TD.S.ngay_cuoi = h;
};

/* ---------- THUẬT TOÁN ÔN GIÃN CÁCH (biến thể SM-2) ----------
   Mỗi thẻ: lan (số lần đúng liên tiếp), khoang (ngày), de (hệ số dễ), han (mốc ôn lại) */
TD.SRS = {
  moi: function () { return { lan: 0, khoang: 0, de: 2.5, han: Date.now(), sai: 0 }; },

  /* dung=true: trả lời đúng · false: sai */
  capNhat: function (id, dung) {
    const t = TD.S.the[id] || TD.SRS.moi();
    if (dung) {
      t.lan += 1;
      if (t.lan === 1) t.khoang = 1;
      else if (t.lan === 2) t.khoang = 3;
      else t.khoang = Math.round(t.khoang * t.de);
      t.de = Math.min(2.8, t.de + 0.08);
    } else {
      t.lan = 0;
      t.khoang = 0;              /* ôn lại ngay trong phiên */
      t.de = Math.max(1.3, t.de - 0.22);
      t.sai = (t.sai || 0) + 1;
    }
    t.han = Date.now() + (t.khoang > 0 ? t.khoang * 86400000 : 10 * 60000);
    TD.S.the[id] = t;
    return t;
  },

  denHan: function () {
    const bay = Date.now();
    return Object.keys(TD.S.the).filter(id => TD.S.the[id].han <= bay);
  },

  /* Số thẻ sẽ đến hạn trong n ngày tới */
  sapToi: function (ngay) {
    const moc = Date.now() + ngay * 86400000;
    return Object.keys(TD.S.the).filter(id => {
      const h = TD.S.the[id].han;
      return h > Date.now() && h <= moc;
    }).length;
  }
};

/* ---------- THỐNG KÊ ---------- */
TD.ghiNhan = function (mon, muc, dung) {
  TD.S.thong_ke[mon] = TD.S.thong_ke[mon] || {};
  const o = TD.S.thong_ke[mon][muc] = TD.S.thong_ke[mon][muc] || { dung: 0, tong: 0 };
  o.tong++; if (dung) o.dung++;

  const h = TD.homNay();
  TD.S.nhat_ky[h] = (TD.S.nhat_ky[h] || 0) + 1;

  if (dung) {
    TD.S.chuoi++;
    if (TD.S.chuoi > TD.S.chuoi_max) TD.S.chuoi_max = TD.S.chuoi;
  } else if (TD.S.tui.hoi_xuan > 0 && TD.S.chuoi >= 5) {
    TD.S.tui.hoi_xuan--;                       /* Hồi Xuân Đan tự động giữ chuỗi */
    TD.bao('💊 Hồi Xuân Đan đã giữ lại chuỗi liên kích ' + TD.S.chuoi + '!', 'kim');
  } else TD.S.chuoi = 0;

  TD.diemDanh();
};

/* Độ chính xác tổng của một môn (0–100) */
TD.doChinhXac = function (mon) {
  const t = TD.S.thong_ke[mon]; if (!t) return null;
  let d = 0, n = 0;
  for (const m in t) { d += t[m].dung; n += t[m].tong; }
  return n ? Math.round((d / n) * 100) : null;
};

TD.soCauDaLam = function (mon) {
  const t = TD.S.thong_ke[mon]; if (!t) return 0;
  let n = 0; for (const m in t) n += t[m].tong;
  return n;
};

/* ---------- ƯỚC LƯỢNG ĐIỂM THI ----------
   Lấy độ chính xác từng mức độ nhân trọng số theo cấu trúc đề.
   Mức chưa làm câu nào thì coi như chưa có dữ liệu và bị chiết khấu. */
TD.uocLuongDiem = function (mon) {
  const t = TD.S.thong_ke[mon];
  if (!t) return null;
  let tong = 0, trongSoCo = 0;
  for (const m of [1, 2, 3, 4]) {
    const w = TD.TRONG_SO_MUC[m];
    const o = t[m];
    if (o && o.tong >= 3) { tong += (o.dung / o.tong) * w; trongSoCo += w; }
  }
  if (trongSoCo < 0.5) return null;             /* chưa đủ dữ liệu để ước lượng */
  const tyLe = tong / trongSoCo;
  /* chiết khấu theo phần trọng số chưa có dữ liệu (tránh ảo tưởng điểm cao) */
  return Math.round(tyLe * 10 * (0.75 + 0.25 * trongSoCo) * 10) / 10;
};

TD.tongDiemToHop = function () {
  let tong = 0, du = true;
  for (const m of TD.S.to_hop) {
    const d = TD.uocLuongDiem(m);
    if (d === null) du = false; else tong += d;
  }
  return { tong: Math.round(tong * 10) / 10, du: du };
};

/* ---------- NGÀY CÒN LẠI ---------- */
TD.ngayConLai = function () {
  const t = new Date(TD.S.ngay_thi + 'T00:00:00');
  const h = new Date(TD.homNay() + 'T00:00:00');
  return Math.round((t - h) / 86400000);
};

/* Tuần hiện tại trong lộ trình 20 tuần, tính từ ngày bắt đầu */
TD.tuanHienTai = function () {
  const bd = new Date(TD.S.bat_dau + 'T00:00:00');
  const h = new Date(TD.homNay() + 'T00:00:00');
  const ngay = Math.max(0, Math.round((h - bd) / 86400000));
  return Math.min(20, Math.floor(ngay / 7) + 1);
};

/* ============================================================
   BỘ SINH ĐỀ — mỗi "mẫu đề" là một dạng bài tự random số liệu,
   tự tính đáp án và tự viết lời giải theo đúng số liệu đó.
   ⇒ một mẫu = vô hạn câu, đáp án không thể sai.
   ============================================================ */
TD.GEN = {};                      /* TD.GEN[mon] = [mau, ...] */

/* Bộ sinh số giả ngẫu nhiên có hạt giống (mulberry32) — cùng seed cho cùng đề */
TD.rng = function (seed) {
  let a = (seed >>> 0) || 1;
  const r = function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  /* tiện ích dùng trong mẫu đề */
  r.nguyen = (min, max) => min + Math.floor(r() * (max - min + 1));
  r.chon = arr => arr[Math.floor(r() * arr.length)];
  /* chọn k phần tử khác nhau */
  r.chonNhieu = (arr, k) => {
    const b = arr.slice();
    for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; }
    return b.slice(0, k);
  };
  return r;
};

/* Làm tròn và định dạng số kiểu Việt Nam (dấu phẩy thập phân) */
TD.lamTron = function (x, n) {
  const m = Math.pow(10, n === undefined ? 2 : n);
  return Math.round(x * m) / m;
};
TD.soVN = function (x, n) {
  const v = TD.lamTron(x, n);
  return String(v).replace('.', ',');
};

TD.timMau = function (mon, ma) {
  return (TD.GEN[mon] || []).find(t => t.ma === ma);
};

/* Dựng một câu hỏi cụ thể từ mẫu đề + hạt giống */
TD.sinhCau = function (mau, seed) {
  const R = TD.rng(seed);
  let o;
  try { o = mau.tao(R); } catch (e) { console.warn('Mẫu đề lỗi:', mau.ma, e); return null; }
  if (!o) return null;
  return Object.assign({
    chuong: mau.chuong, muc: mau.muc, dang: mau.dang, _ma: mau.ma, _sinh: true
  }, o);
};

/* Lấy câu hỏi từ một mục trong danh sách phiên.
   Mục tĩnh: {mon, i} · Mục sinh: {mon, g: mã mẫu, s: hạt giống} */
TD.layCau = function (it) {
  if (!it) return null;
  if (it.dsy) return TD.cauDsTuMenhDe(it.mon, it.dsy, it.cd, it.s);
  if (it.lt !== undefined) return TD.cauTuMenhDe(it.mon, it.lt, it.c, it.s);
  if (it.g) {
    const mau = TD.timMau(it.mon, it.g);
    return mau ? TD.sinhCau(mau, it.s) : null;
  }
  return (TD.KHO[it.mon] || [])[it.i];
};

/* Khoá thẻ ôn giãn cách.
   Với câu sinh tự động, thẻ gắn với MẪU ĐỀ chứ không phải số liệu cụ thể
   — nên khi tâm ma quay lại, bạn gặp một biến thể MỚI của cùng dạng bài. */
TD.idThe = function (it) {
  if (it.dsy) return it.mon + '\u00A7' + it.cd;
  if (it.lt !== undefined) return it.mon + '$' + it.lt;
  return it.g ? it.mon + '@' + it.g : it.mon + '#' + it.i;
};

/* Đọc ngược khoá thẻ thành mục danh sách (hạt giống mới mỗi lần ôn) */
TD.theThanhMuc = function (id) {
  if (id.indexOf('\u00A7') > 0) {
    const [mon, cd] = id.split('\u00A7');
    const kho = TD.KHO_LT[mon] || [];
    const nhom = [];
    kho.forEach((x, i) => { if ((x.cd || 'Khác') === cd) nhom.push(i); });
    if (nhom.length < 4) return null;
    const R = TD.rng((Math.random() * 4294967295) >>> 0);
    return { mon: mon, dsy: R.chonNhieu(nhom, 4), cd: cd, s: (Math.random() * 4294967295) >>> 0 };
  }
  if (id.indexOf('$') > 0) {
    const [mon, i] = id.split('$');
    const goc = (TD.KHO_LT[mon] || [])[+i];
    if (!goc) return null;
    return { mon: mon, lt: +i, c: goc.a ? 'd' : 's', s: (Math.random() * 4294967295) >>> 0 };
  }
  if (id.indexOf('@') > 0) {
    const [mon, ma] = id.split('@');
    if (!TD.timMau(mon, ma)) return null;
    return { mon: mon, g: ma, s: (Date.now() ^ Math.floor(Math.random() * 1e9)) >>> 0 };
  }
  const [mon, i] = id.split('#');
  if (!TD.KHO[mon] || !TD.KHO[mon][+i]) return null;
  return { mon: mon, i: +i };
};

/* Sinh n mục câu hỏi tự động cho một môn, lọc theo mức độ nếu có */
TD.sinhNhieu = function (mon, muc, n) {
  const mau = (TD.GEN[mon] || []).filter(t => !muc || t.muc === muc);
  if (!mau.length) return [];
  /* Xáo danh sách mẫu rồi duyệt vòng — mỗi dạng bài đều được chạm tới
     trước khi lặp lại dạng nào, nên phiên luyện phủ đều chứ không dồn cục. */
  let dsMau = TD.xao(mau), vt = 0;
  const ra = [];
  for (let thu = 0; ra.length < n && thu < n * 6; thu++) {
    if (vt >= dsMau.length) { dsMau = TD.xao(mau); vt = 0; }
    const t = dsMau[vt++];
    const seed = (Math.random() * 4294967295) >>> 0;
    if (TD.sinhCau(t, seed)) ra.push({ mon: mon, g: t.ma, s: seed });
  }
  return TD.xao(ra);
};

/* Đếm số mẫu đề của một môn */
TD.soMau = function (mon, muc) {
  return (TD.GEN[mon] || []).filter(t => !muc || t.muc === muc).length;
};

/* ============================================================
   TÀ ĐẠO — bộ đề lý thuyết & bài tập trọng điểm
   Đề được LẮP từ kho mệnh đề đã thẩm định, theo hạt giống cố định
   ⇒ "đề số 7 môn Hoá" lúc nào cũng là đúng đề đó, mở lại vẫn thế.
   Mỗi mệnh đề được hỏi cả hai chiều:
     chiều 'd' — chọn phát biểu ĐÚNG (đáp án là mệnh đề đúng)
     chiều 's' — chọn phát biểu SAI  (đáp án là mệnh đề sai)
   ============================================================ */
TD.KHO_LT = TD.KHO_LT || {};        /* TD.KHO_LT[mon] = [{t, a, v, cd}, ...] */

TD.SO_DE_TA_DAO = 20;
TD.SO_CAU_TA_DAO = 120;

/* Băm chuỗi thành hạt giống ổn định */
TD.bam = function (chuoi) {
  let h = 2166136261;
  for (let i = 0; i < chuoi.length; i++) { h ^= chuoi.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
};

/* Dựng một bộ đề Tà Đạo. so = 1..20 · loai = 'lythuyet' | 'baitap' */
TD.deTaDao = function (mon, so, loai) {
  const R = TD.rng(TD.bam(mon + '|' + loai + '|' + so));
  const N = TD.SO_CAU_TA_DAO;

  if (loai === 'baitap') {
    const mau = (TD.GEN[mon] || []).filter(t => !t._tuLT);   /* chỉ bài tập tính toán */
    if (!mau.length) return [];
    const ra = [];
    /* Rải đều các dạng bài rồi mới xáo, để đề nào cũng phủ hết dạng.
       Một số mẫu đề từ chối vài hạt giống (số liệu ra không đẹp), nên phải
       đổi hạt giống cho tới khi dựng được câu hợp lệ — đề không được có câu trống. */
    for (let k = 0; k < N; k++) {
      const t = mau[k % mau.length];
      let seed = TD.bam(mon + so + t.ma + k), duoc = false;
      for (let lan = 0; lan < 40; lan++) {
        if (TD.sinhCau(t, seed)) { duoc = true; break; }
        seed = TD.bam(mon + so + t.ma + k + '#' + lan);
      }
      if (duoc) ra.push({ mon: mon, g: t.ma, s: seed });
    }
    /* nếu vẫn thiếu (mẫu đề quá kén), bù thêm biến thể của các dạng đã dựng được */
    for (let k = 0; ra.length && ra.length < N && k < N * 4; k++) {
      const goc = ra[k % ra.length];
      const t = TD.timMau(mon, goc.g);
      const seed = TD.bam(mon + so + goc.g + 'bu' + k);
      if (t && TD.sinhCau(t, seed)) ra.push({ mon: mon, g: goc.g, s: seed });
    }
    return TD.xaoR(R, ra);
  }

  const kho = TD.KHO_LT[mon] || [];
  if (kho.length < 8) return [];
  const dung = [], sai = [];
  kho.forEach((x, i) => (x.a ? dung : sai).push(i));
  if (dung.length < 4 || sai.length < 4) return [];

  /* Phần I — mỗi mệnh đề đúng cho 1 câu "chọn phát biểu ĐÚNG",
     mỗi mệnh đề sai cho 1 câu "chọn phát biểu SAI" ⇒ phủ hết kho, không lặp. */
  const von = TD.xaoR(R, dung.map(i => ({ lt: i, c: 'd' })).concat(sai.map(i => ({ lt: i, c: 's' }))));
  const soMC = Math.min(von.length, Math.round(N * 0.75));
  const ra = von.slice(0, soMC).map((v, k) =>
    ({ mon: mon, lt: v.lt, c: v.c, s: TD.bam(mon + so + v.lt + v.c + k) }));

  /* Phần II — câu đúng/sai 4 ý, mỗi câu gom 4 mệnh đề cùng một chủ đề.
     Kho vài trăm mệnh đề cho số tổ hợp khổng lồ nên không lo trùng. */
  const theoCD = {};
  kho.forEach((x, i) => { const c = x.cd || 'Khác'; (theoCD[c] = theoCD[c] || []).push(i); });
  const cdDung = Object.keys(theoCD).filter(c => theoCD[c].length >= 4);
  let k2 = 0;
  while (ra.length < N && cdDung.length) {
    const cd = cdDung[k2 % cdDung.length];
    const chon = R.chonNhieu(theoCD[cd], 4);
    ra.push({ mon: mon, dsy: chon, cd: cd, s: TD.bam(mon + so + cd + k2) });
    k2++;
    if (k2 > N * 3) break;                    /* chốt chặn an toàn */
  }
  return TD.xaoR(R, ra);
};

/* Dựng câu Đúng/Sai 4 ý từ bốn mệnh đề trong kho */
TD.cauDsTuMenhDe = function (mon, chiSos, cd, seed) {
  const kho = TD.KHO_LT[mon] || [];
  const y = chiSos.map(i => kho[i]);
  if (y.some(x => !x)) return null;
  const R = TD.rng(seed >>> 0);
  const t = TD.xaoR(R, y);
  return {
    chuong: cd || 'Lý thuyết trọng điểm',
    muc: Math.max.apply(null, t.map(x => x.m || 2)),
    dang: 'ds',
    _lt: true,
    q: `Về chủ đề <b>${cd}</b>, xét tính đúng/sai của từng phát biểu sau:`,
    items: t.map(x => ({ t: x.t, a: !!x.a })),
    giai: t.map((x, i) => `Ý ${'abcd'[i]}) ${x.a ? 'ĐÚNG' : 'SAI'} — ${x.v}`).join('\n'),
    meo: 'Xét từng ý ĐỘC LẬP với nhau. Đừng nghĩ "chắc phải có 2 đúng 2 sai" — cả 4 ý cùng đúng là hoàn toàn có thể.'
  };
};

/* Dựng câu hỏi trắc nghiệm từ một mệnh đề trong kho */
TD.cauTuMenhDe = function (mon, chiSo, chieu, seed) {
  const kho = TD.KHO_LT[mon] || [];
  const goc = kho[chiSo];
  if (!goc) return null;
  /* đáp án phải cùng chiều với mệnh đề: hỏi "đúng" thì mệnh đề phải đúng */
  if ((chieu === 'd') !== !!goc.a) return null;

  const R = TD.rng(seed >>> 0);
  const nguoc = kho.filter(x => !!x.a !== !!goc.a);
  if (nguoc.length < 3) return null;
  /* ưu tiên phương án nhiễu cùng chủ đề cho câu hỏi có sức nặng */
  const cungCD = nguoc.filter(x => x.cd === goc.cd);
  const nguon = cungCD.length >= 3 ? cungCD : nguoc;
  const nhieu = R.chonNhieu(nguon, 3);

  const opts = TD.xaoR(R, [goc].concat(nhieu));
  return {
    chuong: goc.cd || 'Lý thuyết trọng điểm',
    muc: goc.m || 2,
    dang: 'mc',
    _lt: true,
    q: chieu === 'd' ? 'Phát biểu nào sau đây <b>đúng</b>?' : 'Phát biểu nào sau đây <b>sai</b>?',
    opts: opts.map(x => x.t),
    ans: opts.indexOf(goc),
    giai: `Đáp án: ${goc.t}\n→ ${goc.v}\n\nCác phát biểu còn lại:\n`
        + nhieu.map(x => `· ${x.t}\n  → ${x.v}`).join('\n'),
    meo: goc.meo
  };
};

/* Đếm số câu hỏi lý thuyết khả dụng của một môn */
TD.soMenhDe = function (mon) { return (TD.KHO_LT[mon] || []).length; };

/* Bộ đề Tà Đạo có dùng được không */
TD.taDaoSan = function (mon, loai) {
  if (loai === 'baitap') return (TD.GEN[mon] || []).filter(t => !t._tuLT).length >= 3;
  const kho = TD.KHO_LT[mon] || [];
  return kho.filter(x => x.a).length >= 4 && kho.filter(x => !x.a).length >= 4;
};

/* Ghi nhận kết quả một bộ đề Tà Đạo */
TD.ghiTaDao = function (mon, so, loai, dung, tong) {
  TD.S.ta_dao = TD.S.ta_dao || {};
  const k = mon + '|' + loai + '|' + so;
  const cu = TD.S.ta_dao[k];
  const pt = Math.round((dung / tong) * 100);
  if (!cu || pt > cu.pt) TD.S.ta_dao[k] = { pt: pt, dung: dung, tong: tong, ngay: TD.homNay() };
};

TD.ketQuaTaDao = function (mon, so, loai) {
  return (TD.S.ta_dao || {})[mon + '|' + loai + '|' + so] || null;
};

/* ============================================================
   TỰ ĐĂNG KÝ MẪU ĐỀ TỪ KHO MỆNH ĐỀ
   Mọi môn đều có kho mệnh đề trọng điểm, nên mọi môn đều phải có
   đề tự sinh ở Luyện Công — kể cả Sử, Địa, GDKT&PL, Văn, Anh.
   Mỗi CHỦ ĐỀ sinh ra 3 dạng bài:
     · chọn phát biểu ĐÚNG  · chọn phát biểu SAI  · đúng/sai 4 ý
   Đánh dấu _tuLT để Tà Đạo Bài tập không lấy nhầm — phần đó chỉ
   dành cho bài tập tính toán.
   ============================================================ */
TD.dangKyMauTuMenhDe = function () {
  if (TD._daDangKyLT) return;                 /* chỉ chạy một lần */
  TD._daDangKyLT = true;

  const slug = t => String(t).normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd').replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-|-$/g, '').toLowerCase().slice(0, 26);

  for (const mon of Object.keys(TD.KHO_LT)) {
    const kho = TD.KHO_LT[mon];
    if (!Array.isArray(kho) || kho.length < 8) continue;
    const gDung = kho.filter(x => x.a).length, gSai = kho.length - gDung;

    const theoCD = {};
    kho.forEach((x, i2) => { const c = x.cd || 'Khác'; (theoCD[c] = theoCD[c] || []).push(i2); });

    TD.GEN[mon] = TD.GEN[mon] || [];
    for (const cd of Object.keys(theoCD)) {
      const idx = theoCD[cd];
      const ma = slug(cd);

      /* Đăng ký RIÊNG cho từng mức độ — nếu gộp lại rồi lấy mức trung bình
         thì mức 1 và mức 4 sẽ trống, người học không luyện riêng được. */
      for (let muc = 1; muc <= 4; muc++) {
        const dungM = idx.filter(i2 => kho[i2].a && (kho[i2].m || 2) === muc);
        const saiM = idx.filter(i2 => !kho[i2].a && (kho[i2].m || 2) === muc);

        if (dungM.length >= 1 && gSai >= 3) TD.GEN[mon].push({
          ma: mon + '-ltd' + muc + '-' + ma, chuong: cd, muc: muc, dang: 'mc', _tuLT: true,
          tao(R) { return TD.cauTuMenhDe(mon, R.chon(dungM), 'd', (R() * 4294967295) >>> 0); }
        });
        if (saiM.length >= 1 && gDung >= 3) TD.GEN[mon].push({
          ma: mon + '-lts' + muc + '-' + ma, chuong: cd, muc: muc, dang: 'mc', _tuLT: true,
          tao(R) { return TD.cauTuMenhDe(mon, R.chon(saiM), 's', (R() * 4294967295) >>> 0); }
        });
      }

      /* Câu đúng/sai 4 ý xếp ở mức cao nhất trong chủ đề — phải soi 4 ý một lúc */
      if (idx.length >= 6) {
        const mucDS = Math.min(4, Math.max.apply(null, idx.map(i2 => kho[i2].m || 2)));
        TD.GEN[mon].push({
          ma: mon + '-ltds-' + ma, chuong: cd, muc: mucDS, dang: 'ds', _tuLT: true,
          tao(R) { return TD.cauDsTuMenhDe(mon, R.chonNhieu(idx, 4), cd, (R() * 4294967295) >>> 0); }
        });
      }
    }
  }
};

/* ---------- ƯỚC LƯỢNG SỐ CÂU KHÁC NHAU CÓ THỂ SINH ----------
   Đếm thật theo tổ hợp, không phải con số quảng cáo:
   · câu nhiều lựa chọn = (số mệnh đề làm đáp án) × (số bộ 3 phương án nhiễu)
   · câu đúng/sai       = số cách chọn 4 mệnh đề trong cùng chủ đề
   · dạng bài tính toán = lấy 200 biến thể/dạng (mức đã đo được ở check-gen) */
const toHop = (n, k) => {
  if (n < k) return 0;
  let r = 1; for (let i = 0; i < k; i++) r = r * (n - i) / (i + 1);
  return Math.round(r);
};

TD.soCauKhaDung = function (mon, muc) {
  let tong = TD.layCauHoi(mon, muc || null).length;

  const kho = TD.KHO_LT[mon] || [];
  if (kho.length >= 8) {
    const gDung = kho.filter(x => x.a).length, gSai = kho.length - gDung;
    const theoCD = {};
    kho.forEach((x, i) => { const c = x.cd || 'Khác'; (theoCD[c] = theoCD[c] || []).push(i); });
    for (const cd of Object.keys(theoCD)) {
      const idx = theoCD[cd];
      const d = idx.filter(i => kho[i].a).length, s2 = idx.length - d;
      const nhieuSai = s2 >= 3 ? s2 : gSai;      /* nhiễu ưu tiên cùng chủ đề */
      const nhieuDung = d >= 3 ? d : gDung;
      /* đếm theo đúng cách đăng ký: từng mức độ một */
      const dM = muc ? idx.filter(i => kho[i].a && (kho[i].m || 2) === muc).length : d;
      const sM = muc ? idx.filter(i => !kho[i].a && (kho[i].m || 2) === muc).length : s2;
      tong += dM * toHop(nhieuSai, 3);           /* câu "chọn phát biểu đúng" */
      tong += sM * toHop(nhieuDung, 3);          /* câu "chọn phát biểu sai"  */
      if (idx.length >= 6) {
        const mucDS = Math.min(4, Math.max.apply(null, idx.map(i => kho[i].m || 2)));
        if (!muc || mucDS === muc) tong += toHop(idx.length, 4);   /* câu đúng/sai 4 ý */
      }
    }
  }

  const mauSo = (TD.GEN[mon] || []).filter(t => !t._tuLT && (!muc || t.muc === muc)).length;
  tong += mauSo * 200;
  return tong;
};

/* ---------- KHO CÂU HỎI ---------- */
TD.layCauHoi = function (mon, locMuc) {
  const kho = (TD.KHO[mon] || []).slice();
  return locMuc ? kho.filter(c => c.muc === locMuc) : kho;
};

/* id ổn định cho một câu hỏi (dùng làm khoá SRS) */
TD.idCau = function (mon, c) {
  const i = (TD.KHO[mon] || []).indexOf(c);
  return mon + '#' + i;
};

TD.trichCau = function (mon, c) {
  const i = typeof c === 'number' ? c : (TD.KHO[mon] || []).indexOf(c);
  return (TD.KHO[mon] || [])[i];
};

/* Xáo mảng bằng bộ ngẫu nhiên CÓ HẠT GIỐNG — cùng seed cho cùng thứ tự */
TD.xaoR = function (R, a) {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(R() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};

/* Xáo trộn mảng (Fisher–Yates) */
TD.xao = function (a) {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};

/* So khớp đáp án trả lời ngắn: bỏ qua dấu cách, chấp nhận cả dấu , và . */
TD.khopTLN = function (nhap, dung) {
  const chuan = s => String(s).trim().toLowerCase()
    .replace(/\s+/g, '').replace(/\./g, ',').replace(/,+$/, '');
  const a = chuan(nhap), b = chuan(dung);
  if (a === b) return true;
  /* so sánh dạng số, cho phép sai số làm tròn nhỏ */
  const so = s => parseFloat(String(s).replace(/\s/g, '').replace(',', '.'));
  const x = so(a), y = so(b);
  if (!isNaN(x) && !isNaN(y) && b.indexOf(';') < 0) return Math.abs(x - y) < 1e-6;
  return false;
};
