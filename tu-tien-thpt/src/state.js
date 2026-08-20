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
  return it.g ? it.mon + '@' + it.g : it.mon + '#' + it.i;
};

/* Đọc ngược khoá thẻ thành mục danh sách (hạt giống mới mỗi lần ôn) */
TD.theThanhMuc = function (id) {
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
  const ra = [];
  for (let k = 0; k < n; k++) {
    const t = mau[k % mau.length];
    ra.push({ mon: mon, g: t.ma, s: (Math.random() * 4294967295) >>> 0 });
  }
  return TD.xao(ra);
};

/* Đếm số mẫu đề của một môn */
TD.soMau = function (mon, muc) {
  return (TD.GEN[mon] || []).filter(t => !muc || t.muc === muc).length;
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
