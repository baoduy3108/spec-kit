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
    /* điểm mục tiêu của tổ hợp; app.js đọc TD.S.muc_tieu để tô màu ô ước lượng điểm */
    muc_tieu: TD.MAC_DINH.muc_tieu,
    so_cau_phien: 30,           /* độ dài mỗi phiên Luyện Công */
    bat_dau: TD.ngayBatDauGoiY(),
    /* thống kê: thong_ke[mon][muc] = {dung, tong} */
    thong_ke: {},
    /* thống kê theo chuyên đề: thong_ke_cd[mon][chuyên đề] = {dung, tong} */
    thong_ke_cd: {},
    /* thời gian làm bài theo chuyên đề: gio_cd[mon][cd] = {giay, cau} */
    gio_cd: {},
    /* mục từ vựng đã được hỏi ít nhất một lần */
    tu_da_hoi: {},
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
    /* số câu còn lại đang được Ngộ Đạo Trà nhân đôi linh khí */
    ngo_dao_con: 0,
    /* cấp lôi kiếp người chơi tự chọn; null = theo cảnh giới hiện tại */
    kiep_chon: null,
    /* âm thanh: bật/tắt và âm lượng 0–1 */
    am_thanh: true,
    am_luong: 0.5,
    /* số biến thể đề Ngữ văn đã làm của từng ngữ liệu */
    van_lam: {},
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
  /* túi pháp bảo là object lồng: bản lưu cũ chỉ có thien_co nên phải bù
     từng khoá con, nếu không mấy pháp bảo mới thêm sẽ không hiện ra */
  s.tui = Object.assign({}, md.tui, s.tui || {});
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
    /* Trả lời sai thì thẻ đến hạn NGAY, không hoãn 10 phút. Màn Tâm Ma Kiếp tự
       nói "trả lời sai thì nó quay lại ngay" và thông báo sau mỗi câu sai cũng
       bảo vào đó trấn áp — mà hoãn 10 phút thì vào chỉ thấy "tâm cảnh thanh
       tịnh", tức là ứng dụng nói dối người học. */
    t.han = Date.now() + (t.khoang > 0 ? t.khoang * 86400000 : 0);
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
TD.ghiNhan = function (mon, muc, dung, khongTinh, chuyenDe) {
  const h = TD.homNay();
  TD.S.nhat_ky[h] = (TD.S.nhat_ky[h] || 0) + 1;
  TD.diemDanh();

  /* câu đã soi Truy Hồn Kính: vẫn tính là có học, nhưng không đụng vào
     thống kê độ chính xác lẫn chuỗi liên kích cho khỏi ảo điểm */
  if (khongTinh) return;

  TD.S.thong_ke[mon] = TD.S.thong_ke[mon] || {};
  const o = TD.S.thong_ke[mon][muc] = TD.S.thong_ke[mon][muc] || { dung: 0, tong: 0 };
  o.tong++; if (dung) o.dung++;

  /* Thống kê theo CHUYÊN ĐỀ: biết mình yếu chỗ nào mới ôn trúng chỗ đó.
     Thống kê theo mức chỉ nói được "mình kém câu vận dụng", không nói được
     "kém ở Oxyz hay ở tích phân". */
  if (chuyenDe) {
    TD.S.thong_ke_cd = TD.S.thong_ke_cd || {};
    TD.S.thong_ke_cd[mon] = TD.S.thong_ke_cd[mon] || {};
    const z = TD.S.thong_ke_cd[mon][chuyenDe] = TD.S.thong_ke_cd[mon][chuyenDe] || { dung: 0, tong: 0 };
    z.tong++; if (dung) z.dung++;
  }

  if (dung) {
    TD.S.chuoi++;
    if (TD.S.chuoi > TD.S.chuoi_max) TD.S.chuoi_max = TD.S.chuoi;
  } else if (TD.S.tui.hoi_xuan > 0 && TD.S.chuoi >= 1) {
    TD.S.tui.hoi_xuan--;                       /* Hồi Xuân Đan tự động giữ chuỗi */
    TD.bao('💊 Hồi Xuân Đan đã giữ lại chuỗi liên kích ' + TD.S.chuoi + '! (còn ' + TD.S.tui.hoi_xuan + ' viên)', 'kim');
  } else TD.S.chuoi = 0;
};

/* Bảng chuyên đề của một môn, xếp từ yếu tới mạnh.
   Chuyên đề chưa làm đủ 4 câu thì chưa đủ căn cứ nên xếp riêng. */
TD.bangChuyenDe = function (mon) {
  const tk = (TD.S.thong_ke_cd || {})[mon] || {};
  const cds = [...new Set((TD.KHO_LT[mon] || []).map(x => x.cd).filter(Boolean))];
  (TD.GEN[mon] || []).forEach(t => {
    const cd = TD.chuDeCuaThe(mon, { nhom: t.chuong });
    if (cd && cds.indexOf(cd) < 0) cds.push(cd);
  });
  const ra = cds.map(cd => {
    const o = tk[cd] || { dung: 0, tong: 0 };
    return { cd: cd, dung: o.dung, tong: o.tong,
      pt: o.tong ? Math.round((o.dung / o.tong) * 100) : null,
      duCan: o.tong >= 4 };
  });
  /* yếu nhất lên đầu; chưa làm đủ căn cứ thì xuống cuối */
  ra.sort((a, b) => {
    if (a.duCan !== b.duCan) return a.duCan ? -1 : 1;
    if (a.pt === null && b.pt === null) return b.tong - a.tong;
    if (a.pt === null) return 1;
    if (b.pt === null) return -1;
    return a.pt - b.pt;
  });
  return ra;
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

/* Lộ trình dài 20 tuần = 140 ngày. Neo nó vào NGÀY THI chứ không vào ngày
   mở app: mở app sớm 10 tháng mà bắt đầu đếm tuần ngay thì tuần 20 kết thúc
   từ nửa năm trước kỳ thi, bảng lộ trình thành vô nghĩa. */
TD.SO_NGAY_LO_TRINH = 140;
TD.ngayBatDauGoiY = function (ngayThi) {
  const t = new Date((ngayThi || TD.MAC_DINH.ngay_thi) + 'T00:00:00');
  const bd = new Date(t.getTime() - TD.SO_NGAY_LO_TRINH * 86400000);
  const h = new Date(TD.homNay() + 'T00:00:00');
  /* đã trễ hơn mốc gợi ý thì bắt đầu ngay hôm nay */
  return (bd < h ? h : bd).toISOString().slice(0, 10);
};

/* Lộ trình đang ở trạng thái nào so với hôm nay */
TD.trangThaiLoTrinh = function () {
  const bd = new Date(TD.S.bat_dau + 'T00:00:00');
  const h = new Date(TD.homNay() + 'T00:00:00');
  const con = TD.ngayConLai();
  if (con < 0) return { ma: 'daThi', chu: 'Kỳ thi đã qua — đặt lại ngày thi ở Cài Đặt nếu bạn ôn cho kỳ sau.' };
  const ngay = Math.round((h - bd) / 86400000);
  if (ngay < 0) return { ma: 'chuaToi', soNgay: -ngay,
    chu: `Lộ trình 20 tuần sẽ khởi động sau ${-ngay} ngày nữa (${TD.S.bat_dau}). Từ giờ tới đó cứ Luyện Công và Tà Đạo để xây nền.` };
  if (ngay >= TD.SO_NGAY_LO_TRINH) return { ma: 'daXong', du: con,
    chu: `Đã đi hết 20 tuần lộ trình mà còn ${con} ngày tới kỳ thi. Giai đoạn này nên lặp lại tuần 17–20: Độ Kiếp đều tay và soi lại câu sai.` };
  return { ma: 'dangChay', chu: '' };
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
/* Định dạng số kiểu Việt Nam (dấu phẩy thập phân).
   KHÔNG được tự làm tròn về 2 chữ số khi gọi không kèm độ chính xác: khắp nơi
   trong bộ sinh đề viết S(T(v, 4)) — đã cố ý làm tròn 4 chữ số rồi mới đưa vào
   S. Nếu S lại cắt xuống 2 chữ số thì lời giải in ra một đằng, đáp án tính một
   nẻo, học sinh bấm máy theo từng bước sẽ không ra kết quả. Nên khi không nói
   rõ, chỉ dọn nhiễu dấu phẩy động (làm tròn 6 chữ số) và bỏ số 0 thừa. */
TD.soVN = function (x, n) {
  if (n === undefined) {
    /* Trần 4 chữ số: đủ giữ nguyên mọi giá trị đã cố ý làm tròn bằng T(v, 4)
       — mức sâu nhất mà bộ sinh đề dùng — mà không để lọt số lẻ 6 chữ số kiểu
       "0,095238" vốn không đề thi nào in ra. */
    return String(TD.lamTron(x, 4)).replace('.', ',');
  }
  return String(TD.lamTron(x, n)).replace('.', ',');
};

/* Đáp án số cho câu trả lời ngắn: làm tròn ĐÚNG số chữ số thập phân mà đề yêu cầu,
   giữ cả chữ số 0 ở cuối để học sinh biết mức chính xác cần ghi. */
TD.dapSo = function (x, n) {
  const v = TD.lamTron(x, n || 0);
  return (n ? v.toFixed(n) : String(Math.round(v))).replace('.', ',');
};

/* ============================================================
   GHÉP THẺ TÀNG KINH CÁC ↔ CHỦ ĐỀ TRONG KHO MỆNH ĐỀ
   Thẻ có thể tự khai bằng trường `cd`. Không khai thì so khớp theo từ khoá.
   Không khớp thì trả về null — thà KHÔNG hiện nút Kiểm tra ngay còn hơn
   ném cho người học một mớ câu hỏi lạc chuyên đề.
   ============================================================ */
const CHI_SO = { '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4', '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9',
                 '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9' };
TD.khongDau = function (t) {
  return String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    /* CO₂, HNO₃, Fe³⁺ … phải quy về co2, hno3, fe3 thì bảng từ khoá mới bắt được */
    .replace(/[₀-₉⁰-⁹¹²³]/g, c => CHI_SO[c] || c)
    .toLowerCase();
};

const BO_QUA = ['va', 'voi', 'cua', 'trong', 'cac', 'nhung', 'mot', 'cho', 'tren', 'theo'];

TD.tuKhoa = function (t) {
  return TD.khongDau(t)
    .replace(/^[ivxlcdm]+\s*[.\-–]\s*/i, '')       /* bỏ "I. ", "IV. " */
    .replace(/^[a-z]\s*[.\-–]\s*/i, '')            /* bỏ "A. ", "B. " */
    .replace(/^\d+\s*[.\-–]\s*/, '')              /* bỏ "1. " */
    .split(/[^a-z0-9]+/)
    .filter(w => w.length >= 3 && BO_QUA.indexOf(w) < 0);
};

/* Bảng từ khoá → chủ đề. Nhiều thẻ đặt tên theo KỸ THUẬT ("Bảo toàn", "Quy đổi")
   chứ không theo chương, so chuỗi thuần không thể ghép được nên phải khai ra ở đây.
   Thứ tự quan trọng: luật hẹp đặt trước luật rộng. */
TD.BAN_DO_CD = {
  hoa: [
    /* "Năng lượng hoá học" là tên chương của bộ sinh nhiệt phản ứng — nó thuộc
       chuyên đề nhiệt động, không thì bộ này không vào Luyện Công chỗ nào. */
    [/nang luong hoa hoc|nhiet phan ung|enthalpy|nang luong lien ket/, 'Nhiệt động – Tốc độ – Cân bằng'],
    [/ester|este |xa phong|chat beo|lipid|triolein|tristearin|glycerol/, 'Ester – Lipid'],
    [/glucose|fructose|saccharose|tinh bot|cellulose|carbohydrate|trang bac|maltose/, 'Carbohydrate'],
    [/amine|amino acid|peptide|protein|glycine|alanine|anilin|lysine|glutamic|muoi amoni/, 'Amine – Amino acid – Peptide'],
    [/polymer|cao su|trung hop|trung ngung|nhua |to nilon|to capron|to tam/, 'Polymer'],
    [/dien phan|pin dien|galvani|an mon|faraday|the dien cuc|ma dien|nhien lieu pin/, 'Điện phân – Pin điện'],
    [/\bsat\b|fe2|fe3|feo|crom|\bcr\b|gang|thep|quy doi hon hop/, 'Sắt – Crom'],
    [/nhom|al2o3|kiem tho|nuoc cung|thach cao|boxit|natri|kali|canxi|magnesium|\bco2\b|\bso2\b/, 'IA – IIA – Nhôm'],
    [/dan xuat halogen|halogenoalkane|zaitsev|bromobutane|chloropropane/, 'Dẫn xuất halogen'],
    [/cau hinh electron|bang tuan hoan|cau tao nguyen tu|dong vi|so khoi|do am dien|nguyen tu khoi trung binh/, 'Cấu tạo nguyên tử – Bảng tuần hoàn'],
    [/hno3|h2so4|nh3|nito|phosphor|photpho|luu huynh|halogen|\bclo\b|phan bon|\bph\b|acid|base|phi kim/, 'Phi kim – Vô cơ'],
    [/phuc chat|phoi tu|so phoi tri|cau noi|cau ngoai/, 'Phức chất'],
    [/enthalpy|nhiet phan ung|toc do phan ung|can bang hoa hoc|le chatelier|hang so can bang/, 'Nhiệt động – Tốc độ – Cân bằng'],
    [/dung dich|can bang trong dung dich|chuan do|nong do/, 'Phi kim – Vô cơ'],
    [/kim loai|dien hoa|hop kim|dieu che|bao toan electron|tang giam khoi luong/, 'Đại cương kim loại'],
    [/huu co|dong phan|danh phap|cong thuc phan tu|bat bao hoa|hydrocarbon|alkane|alkene|alkyne|arene|benzen|alcohol|phenol|aldehyde|ketone|carboxylic|\bir\b|pho khoi|dot chay/, 'Đại cương hữu cơ']
  ],
  /* Từ khoá phải có ranh giới từ: "tho" không gắn \b sẽ khớp luôn "thời gian",
     kéo thẻ về bảng phân bổ thời gian sang nhóm nghị luận văn học. */
  van: [
    [/cau truc de|phan bo thoi gian|tieu chi cham|ban do de thi|ma tran de/, 'Cấu trúc đề'],
    [/nghi luan xa hoi|doan van 200|hien tuong doi song|tu tuong dao li/, 'Nghị luận xã hội'],
    [/nghi luan van hoc|phan tich nhan vat|doan trich|van xuoi/, 'Nghị luận văn học'],
    [/doc hieu|bien phap tu tu|phuong thuc bieu dat|phep lien ket|nghia ham an|the tho/, 'Đọc hiểu'],
    [/tieng viet|tu loai|nghia cua tu|phong cach ngon ngu|loi dien dat|thanh ngu/, 'Tiếng Việt']
  ],
  toan: [
    [/luong giac|cung goc|radian/, 'Lượng giác'],
    [/gioi han|lien tuc|vo dinh/, 'Giới hạn – Liên tục'],
    /* "Vectơ trong không gian" là bài mở đầu của Oxyz lớp 12, không phải
       vectơ hình phẳng lớp 10. Luật hẹp phải đứng trước luật rộng, không
       thì thẻ Oxyz bị xếp nhầm sang hệ thức lượng trong tam giác. */
    [/vecto trong khong gian|toa do trong khong gian|oxyz|tich co huong/, 'Oxyz'],
    [/vecto|he thuc luong|dinh li cosin|dinh li sin|trung tuyen|tich vo huong/, 'Vecto và hệ thức lượng'],
    /* Mũ – logarit đứng TRƯỚC bất phương trình: thẻ "phương trình & bất
       phương trình mũ – log" mà để dòng bất phương trình bắt trước thì bị
       xếp nhầm sang tam thức bậc hai. */
    [/logarit|\bmu\b|lai kep/, 'Mũ – Logarit'],
    [/bat phuong trinh|tam thuc|xet dau|viete|mien nghiem|toi uu tuyen tinh/, 'Bất phương trình bậc hai'],
    [/thong ke|xac suat|ghep nhom|trung vi|tu phan vi|phuong sai|do lech chuan|bayes|to hop|chinh hop|hoan vi|nhi thuc/, 'Thống kê – Xác suất'],
    [/tich phan|nguyen ham|dien tich hinh phang|the tich tron xoay|ung dung tich phan/, 'Nguyên hàm – Tích phân'],
    [/oxyz|mat phang|mat cau|vecto|toa do/, 'Oxyz'],
    [/luong giac|he thuc luong|tam giac|khoi chop|khoi lang tru|hinh khong gian|khoi tron xoay|non|tru|cau|goc|khoang cach/, 'Hình không gian'],
    [/logarit|\bmu\b|lai kep|tang truong/, 'Mũ – Logarit'],
    [/day so|cap so cong|cap so nhan|cap so|gioi han|lien tuc/, 'Dãy số – Cấp số'],
    [/dao ham|khao sat|don dieu|cuc tri|tiem can|tuong giao|gtln|gtnn|bang bien thien|tiep tuyen|ham so/, 'Đạo hàm – Khảo sát']
  ],
  dia: [
    [/bien dao|kinh te bien|dao va quan dao|dau khi|thuy san|cang bien/, 'Kinh tế biển đảo'],
    [/bieu do|so lieu|atlat|tinh toan|nhan xet|xu li/, 'Kỹ năng'],
    [/khi hau|gio mua|bao|mua |nhiet do/, 'Khí hậu'],
    [/dan cu|do thi|lao dong|dan so/, 'Dân cư'],
    [/vung |dong bang|tay nguyen|trung du|duyen hai|dong nam bo/, 'Vùng kinh tế'],
    [/nganh|cong nghiep|nong nghiep|dich vu|giao thong|chuyen dich/, 'Ngành kinh tế'],
    [/phan hoa|dai cao|thien nhien/, 'Phân hoá thiên nhiên'],
    [/vi tri|lanh tho|bien dong/, 'Vị trí địa lí']
  ],
  gdkt: [
    [/ke hoach kinh doanh|swot|diem hoa von|y tuong kinh doanh|khach hang muc tieu/, 'Lập kế hoạch kinh doanh'],
    [/trach nhiem xa hoi/, 'Trách nhiệm xã hội của doanh nghiệp'],
    [/thue|doanh nghiep|kinh doanh/, 'Doanh nghiệp – Thuế'],
    [/bao hiem|an sinh/, 'Bảo hiểm – An sinh'],
    [/thu chi|tai chinh ca nhan|tiet kiem|ke hoach chi tieu/, 'Quản lí thu chi'],
    [/hoi nhap|quoc te|fta|wto/, 'Hội nhập quốc tế'],
    [/quyen|nghia vu|vi pham|trach nhiem phap li|khieu nai|to cao|hon nhan|bau cu/, 'Quyền & nghĩa vụ'],
    [/cong uoc|luat bien|unclos|lanh hai|dac quyen kinh te/, 'Pháp luật quốc tế'],
    [/tang truong|phat trien|gdp|gni|cpi|lam phat|chi tieu kinh te/, 'Tăng trưởng – Phát triển']
  ],
  ly: [
    /* "Nhiệt hạch" có chữ "nhiet" nên nếu dòng Vật lí nhiệt đứng trước thì
       thẻ phân hạch – nhiệt hạch bị lôi sang chuyên đề nhiệt. Hạt nhân lên đầu. */
    [/hat nhan|phong xa|phan hach|nhiet hach|lien ket rieng|hut khoi|chu ki ban ra|einstein/, 'Vật lí hạt nhân'],
    [/khi li tuong|dang nhiet|dang tich|dang ap|boyle|charles|clapeyron|phan tu khi|so mol|so phan tu|dong hoc phan tu/, 'Khí lí tưởng'],
    [/nhiet|noi nang|nhiet dong luc|chuyen the|nong chay|hoa hoi|nhiet dung|carnot|dong co nhiet/, 'Vật lí nhiệt'],
    [/tu truong|cam ung|tu thong|luc tu|lorentz|bien ap|truyen tai|xoay chieu/, 'Từ trường'],
    /* Hai chuyên đề riêng phải đứng TRƯỚC dòng gom "Lớp 10 – 11", nếu không thì
       từ khoá "song" và "dien truong" trong dòng gom nuốt hết. */
    [/\bsong\b|buoc song|song dung|song co|song dien tu|song ngang|song doc|giao thoa|dao dong dieu hoa|con lac/, 'Sóng'],
    [/dien truong|dien tich|duong suc dien|dien the|hieu dien the|coulomb/, 'Điện trường'],
    [/dao dong|con lac|song|am|dong dien|tu dien|quang dien|khuc xa|luong tu/, 'Lớp 10 – 11']
  ],
  sinh: [
    [/dna|adn|arn|rna|gene|phien ma|dich ma|nhan doi|codon|nucleotide|dot bien gene|ma di truyen/, 'Di truyền phân tử'],
    [/mendel|hoan vi|lien ket gene|nhiem sac the|\bnst\b|gioi tinh|tuong tac gene|pha he|kieu gen/, 'Di truyền NST'],
    [/di truyen nguoi|pha he|hoi chung down|turner|klinefelter|tu van di truyen|benh di truyen/, 'Di truyền người'],
    [/cong nghe gene|cong nghe te bao|plasmid|the truyen|nhan ban vo tinh|cay truyen phoi|nuoi cay mo|bien doi gene/, 'Công nghệ di truyền'],
    [/quan the|hardy|weinberg|tan so allele|tu thu|ngau phoi/, 'Di truyền quần thể'],
    [/tien hoa|chon loc|hinh thanh loai|nhan to tien hoa|di nhap gen/, 'Tiến hoá'],
    [/sinh thai|quan xa|he sinh thai|chuoi thuc an|thap sinh thai|dien the|hieu suat sinh thai/, 'Sinh thái học'],
    [/nguyen phan|giam phan|quang hop|ho hap|tuan hoan|noi moi|te bao|thuc vat|dong vat/, 'Sinh 10 – 11']
  ],
  anh: [
    [/word form|tu loai|hau to|tien to|duoi tu/, 'Từ loại'],
    /* "Hoàn thành đoạn văn" là một trong bốn dạng bài của đề 2025, phải nằm
       trong chuyên đề dạng bài chứ không rơi ra ngoài mọi chuyên đề. */
    [/dang bai|chien thuat 2025|sap xep cau|chen cau|tom tat|doc hieu|hoan thanh doan van|dien tu vao van ban/, 'Dạng bài & chiến thuật 2025'],
    [/dieu kien|conditional|wish/, 'Câu điều kiện'],
    [/bi dong|tuong thuat|passive|reported/, 'Bị động – Tường thuật'],
    [/menh de quan he|relative/, 'Mệnh đề quan hệ'],
    [/\bthi\b|tense|thi dong tu/, 'Thì động từ'],
    [/doc hieu|chien thuat|cau truc de|sap xep|dien tu/, 'Cấu trúc – Chiến thuật']
  ]
};

TD.chuDeCuaThe = function (mon, x) {
  const kho = TD.KHO_LT[mon] || [];
  const dsCD = [];
  kho.forEach(z => { if (z.cd && dsCD.indexOf(z.cd) < 0) dsCD.push(z.cd); });
  if (!dsCD.length) return null;
  /* ① thẻ tự khai chủ đề thì tin tuyệt đối */
  if (x.cd && dsCD.indexOf(x.cd) >= 0) return x.cd;
  if (x.cd === '*') return null;                 /* thẻ khai rõ là kỹ thuật xuyên suốt */

  const van = TD.khongDau((x.nhom || '') + ' ' + (x.ten || '') + ' ' + (x.chu_de || ''));
  /* ② bảng từ khoá */
  for (const [re, cd] of (TD.BAN_DO_CD[mon] || []))
    if (re.test(van) && dsCD.indexOf(cd) >= 0) return cd;

  /* ③ so trùng từ khoá với tên chủ đề */
  const nguon = TD.tuKhoa((x.nhom || '') + ' ' + (x.ten || x.chu_de || ''));
  if (!nguon.length) return null;
  let tot = null, diemTot = 0;
  for (const cd of dsCD) {
    /* Bỏ từ lặp trong tên chuyên đề: "Điện phân – Pin điện" có chữ "điện" hai
       lần, khớp trúng một chữ đó thôi đã được 2/4 điểm và lọt ngưỡng — thẻ
       "Bảo toàn điện tích" bị gán nhầm sang đó vì vậy. */
    const dich = TD.tuKhoa(cd).filter((w, i, a) => a.indexOf(w) === i);
    if (!dich.length) continue;
    let trung = 0;
    for (const w of dich) if (nguon.indexOf(w) >= 0) trung++;
    const diem = trung / dich.length;
    if (diem > diemTot) { diemTot = diem; tot = cd; }
  }
  /* ④ dưới ngưỡng ⇒ null. Thà kiểm tra tổng hợp cả môn còn hơn gắn nhãn sai chuyên đề. */
  return diemTot >= 0.5 ? tot : null;
};

TD.SO_CAU_KIEM_TRA = 50;

/* Bộ đề kiểm tra một chuyên đề: chỉ lấy mệnh đề đúng chủ đề đó và bài tập
   thuộc đúng chương đó. cd = null ⇒ kiểm tra tổng hợp cả môn.
   Thứ tự: hỏi hết mệnh đề → thêm bài tập tính toán → bù bằng câu đúng/sai 4 ý
   (mỗi câu là một tổ hợp 4 mệnh đề khác nhau nên không lặp lại). */
TD.deChuyenDe = function (mon, cd, soCau) {
  const kho = TD.KHO_LT[mon] || [];
  const n = soCau || TD.SO_CAU_KIEM_TRA;
  const chiSo = [];
  kho.forEach((z, i) => { if (!cd || (z.cd || '') === cd) chiSo.push(i); });
  if (chiSo.length < 4) return [];
  const ds = [];

  /* ① mỗi mệnh đề một câu: đúng thì hỏi "chọn phát biểu ĐÚNG", sai thì hỏi "chọn phát biểu SAI" */
  TD.xao(chiSo).slice(0, n).forEach(i => ds.push({ mon: mon, lt: i,
    c: kho[i].a ? 'd' : 's', s: (Math.random() * 4294967295) >>> 0 }));

  /* ② bài tập tính toán thuộc đúng chương đó (nếu môn có bộ sinh đề) */
  const mau = (TD.GEN[mon] || []).filter(t =>
    !t._tuLT && (!cd
      || TD.chuDeCuaThe(mon, { nhom: t.chuong }) === cd
      /* bộ sinh khai _cdHoTro là bộ dùng chung cho nhiều chuyên đề — nó sẽ tự
         lọc nội dung theo chuyên đề được truyền vào, nên vẫn đúng phạm vi */
      || (t._cdHoTro && t._cdHoTro.indexOf(cd) >= 0)));
  if (mau.length) {
    const soBT = Math.min(Math.round(n * 0.3), n - ds.length);
    /* Chuyên đề chỉ có một hai bộ sinh mà phải rút mười lăm câu thì rất dễ bốc
       trúng hai lần cùng một bài — phải so NỘI DUNG đã sinh chứ không chỉ đổi
       hạt giống cho có. */
    const daRa = new Set(), demMau = {};
    /* Trần cho MỖI bộ sinh. Chuyên đề chỉ có một bộ mà rút đủ 15 câu thì cả
       lượt kiểm tra thành 15 lần cùng một dạng bài chỉ đổi số — thà ít bài tập
       hơn rồi bù bằng câu lý thuyết và câu đúng/sai 4 ý. */
    const tranMau = Math.max(3, Math.round(n * 0.12));
    let vt = 0, quay = TD.xao(mau);
    for (let k = 0, thu = 0; k < soBT && thu < soBT * 12; thu++) {
      if (vt >= quay.length) { quay = TD.xao(mau); vt = 0; }
      const t = quay[vt++];
      if ((demMau[t.ma] || 0) >= tranMau) continue;
      const seed = (Math.random() * 4294967295) >>> 0;
      const q = TD.sinhCau(t, seed, cd);
      if (!q) continue;
      const vtay = TD.vanTayCau(q);
      if (daRa.has(vtay)) continue;
      daRa.add(vtay);
      demMau[t.ma] = (demMau[t.ma] || 0) + 1;
      ds.push({ mon: mon, g: t.ma, s: seed, cd: cd }); k++;
    }
  }

  /* ③ bù cho đủ số câu bằng câu đúng/sai 4 ý, không trùng tổ hợp */
  const daDung = {}, cdDS = cd || kho[chiSo[0]].cd;
  let thu = 0;
  while (ds.length < n && thu++ < n * 60) {
    const bo = TD.xao(chiSo).slice(0, 4).sort((a, b) => a - b), khoa = bo.join('-');
    if (daDung[khoa]) continue;
    daDung[khoa] = 1;
    ds.push({ mon: mon, dsy: bo, cd: cdDS, s: (Math.random() * 4294967295) >>> 0 });
  }
  return TD.xao(ds).slice(0, n);
};

/* ============================================================
   PHẠM VI CỦA MỘT THẺ TÀNG KINH CÁC
   Đọc xong thẻ "Dãy điện hoá" mà bị hỏi về điều chế kim loại hay ăn mòn thì
   người học thấy lạc đề ngay — đúng như phản ánh. Chuyên đề là cái RỔ (Đại
   cương kim loại), còn thẻ là một MỤC trong rổ đó. Vì vậy phải chấm điểm độ
   sát giữa từng mệnh đề với chính nội dung thẻ, ưu tiên hỏi phần sát trước
   rồi mới nới ra cả chuyên đề khi đã cạn.
   ============================================================ */
TD.NGUONG_SAT_THE = 4;

TD.tuKhoaThe = function (the) {
  const ten = String((the && (the.chu_de || the.ten || the.nhom)) || '');
  const phu = String((the && (the.hoi || the.khi)) || '');
  return {
    cum: TD.khongDau(ten).replace(/[^a-z0-9]+/g, ' ').trim(),
    chinh: TD.tuKhoa(ten),
    phu: TD.tuKhoa(phu).slice(0, 14)
  };
};

/* Điểm càng cao thì mệnh đề càng nói đúng thứ mà thẻ dạy.
   Trùng NGUYÊN CỤM tên thẻ ăn 5 điểm — đây mới là tín hiệu chắc; từ lẻ chỉ
   tính thêm cho đủ độ mịn vì "hoá" hay "điện" xuất hiện ở khắp nơi. */
TD.diemSatThe = function (tk, van) {
  const v = ' ' + TD.khongDau(String(van || '')).replace(/[^a-z0-9]+/g, ' ') + ' ';
  let d = 0;
  if (tk.cum.length >= 6 && v.indexOf(' ' + tk.cum + ' ') >= 0) d += 5;
  tk.chinh.forEach(w => { if (v.indexOf(' ' + w + ' ') >= 0) d += 1; });
  tk.phu.forEach(w => { if (v.indexOf(' ' + w + ' ') >= 0) d += 0.35; });
  return d;
};

/* Trả về phạm vi kiểm tra của một thẻ, KHÔNG dựng câu — dùng để đặt tên nút. */
TD.phamViThe = function (mon, the) {
  const cd = TD.chuDeCuaThe(mon, the);
  const kho = TD.KHO_LT[mon] || [];
  const ten = String((the && (the.chu_de || the.ten)) || '').replace(/^\d+[.\s-]*/, '').trim();
  const chiSo = [];
  kho.forEach((z, i) => { if (cd && (z.cd || '') === cd) chiSo.push(i); });
  if (!cd || chiSo.length < 4) return { cd: cd, ten: ten, nong: [], mau: [], rieng: false };
  const tk = TD.tuKhoaThe(the);
  const nong = chiSo.filter(i => TD.diemSatThe(tk, (kho[i].t || '') + ' ' + (kho[i].v || '')) >= TD.NGUONG_SAT_THE);
  /* Bộ sinh đề khai thẳng tên thẻ ở trường chuong thì chắc chắn là của thẻ đó */
  const goc = TD.khongDau(ten);
  const mau = (TD.GEN[mon] || []).filter(t => !t._tuLT && goc && TD.khongDau(t.chuong || '') === goc);
  /* Dưới bốn mệnh đề sát thẻ và cũng không có bộ sinh riêng thì không dựng nổi
     một lượt riêng, đành hỏi cả chuyên đề — lúc đó nút phải ghi đúng tên chuyên
     đề để khỏi hứa hão. */
  /* Ngưỡng 6 mệnh đề (hoặc 2 bộ sinh riêng) mới đủ dựng trọn phần đầu lượt kiểm
     tra bằng câu của chính thẻ. Ít hơn thế mà vẫn ghi tên thẻ lên nút thì chỉ
     vài câu đầu là đúng, phần sau lạc sang chuyên đề — đúng cái người học kêu. */
  return { cd: cd, ten: ten, nong: nong, mau: mau,
           rieng: !!ten && ten !== cd && nong.length >= 6 };
};

TD.timMau = function (mon, ma) {
  return (TD.GEN[mon] || []).find(t => t.ma === ma);
};

/* Dựng một câu hỏi cụ thể từ mẫu đề + hạt giống */
/* ---------- CHUẨN HOÁ CÁCH TRÌNH BÀY BIỂU THỨC ----------
   Đề thi in số âm bằng dấu trừ thật (−) chứ không phải gạch nối ASCII,
   và không bao giờ để "+ -3" hay "− -3". Chuẩn hoá ở một chỗ cho chắc,
   khỏi phải nhớ trong từng mẫu đề.
   Chỉ đụng vào phần HIỂN THỊ — đáp án để nguyên vì còn phải so khớp
   với những gì học sinh gõ vào. */
/* ============================================================
   CHUẨN HOÁ CHỮ TRƯỚC KHI ĐƯA LÊN MÀN HÌNH
   Ba thứ đã làm hỏng bảng công thức trên máy thật:

   ① Dấu ngăn giữa hai công thức trước đây là "•" (hoặc "·"), mà "·" lại
      chính là dấu NHÂN. Đọc "n · xⁿ⁻¹ • (√x)′ = …" không biết chấm nào
      là nhân, chấm nào là hết công thức. Nay mỗi công thức xuống một dòng.
   ② Mũi tên vectơ viết bằng dấu ghép U+20D7 (u⃗). Font của khá nhiều máy
      Android không có glyph này, và khi thiếu thì nó nuốt luôn cả chữ cái
      đứng trước — "u⃗·v⃗ = |u⃗||v⃗|" hiện ra thành "· = ||||". Nay vẽ mũi
      tên bằng CSS, chữ cái nằm nguyên trong DOM.
   ③ Chỉ số dưới viết bằng ký tự Unicode ₁ ₂ (U+2080…) cũng bị nuốt trên
      chính những máy đó: x₁x₂ hiện ra "xx". Nay đổi sang thẻ <sub>.

   Chỉ chạy ở tầng HIỂN THỊ. Dữ liệu gốc giữ nguyên để còn so khớp đáp án,
   và mọi đoạn <svg> được chừa ra vì trong SVG không có <sub> với <span>.
   ============================================================ */
const CS_DUOI = '₀₁₂₃₄₅₆₇₈₉';
const CS_TREN = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
  '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9',
  'ⁿ': 'n', '⁺': '+', '⁻': '−',
  /* mấy chữ cái mũ nhỏ cũng hay thiếu font y như chỉ số dưới */
  'ˣ': 'x', 'ʸ': 'y', 'ᵃ': 'a', 'ᵇ': 'b', 'ᶜ': 'c', 'ᵏ': 'k', 'ᵐ': 'm', 'ᵗ': 't' };
TD.chuanChu = function (t) {
  if (typeof t !== 'string' || !t) return t;
  if (t.indexOf('<svg') >= 0)
    return t.split(/(<svg[\s\S]*?<\/svg>)/i)
      .map(x => (/^<svg/i.test(x) ? x : TD.chuanChu(x))).join('');
  let r = t;
  /* ① dấu ngăn công thức → xuống dòng.
     Khoảng trắng quanh dấu ngăn trong dữ liệu là &nbsp; chứ không phải dấu
     cách thường, nên phải bắt cả hai kiểu. */
  const TRONG = '(?:&nbsp;|\\s)';
  r = r.replace(new RegExp(TRONG + '*•' + TRONG + '*', 'g'), '<br>');
  /* Dấu "·" có hai vai: ngăn hai công thức, và dấu NHÂN. Chỉ khi mọi mảnh
     tách ra đều là một đẳng thức thì nó mới là dấu ngăn. */
  const NGAN = new RegExp(TRONG + '+·' + TRONG + '+');
  const NGAN_G = new RegExp(TRONG + '+·' + TRONG + '+', 'g');
  r = r.split('<br>').map(dong => {
    if (!NGAN.test(dong)) return dong;
    const manh = dong.split(NGAN_G);
    if (manh.length < 2) return dong;
    return manh.every(x => /[=⇔]/.test(x)) ? manh.join('<br>') : dong;
  }).join('<br>');
  /* ①b Dấu nhân phải chỉ có MỘT kiểu. Trước đây lời giải trộn cả hai:
     "2·n(E) = 2×1,06 + 1,06 − 2×1,4" — cùng một dòng hai ký hiệu nhân, nhìn
     rất rát. Nay tách bạch: dấu NHÂN luôn là ×, còn · chỉ còn một nghĩa là
     dấu NGĂN giữa các ý. Nhận ra dấu nhân ở chỗ nó dính liền hai toán hạng,
     không có dấu cách — dấu ngăn thì luôn có cách ở hai bên.
     Nhưng KHÔNG được đụng tới dấu chấm giữa trong ĐƠN VỊ đo (N·m, J/(kg·K)) —
     đó là ký hiệu chuẩn quốc tế. Phân biệt: dấu nhân luôn có ít nhất một bên
     là CHỮ SỐ, còn đơn vị thì hai bên đều là chữ. */
  r = r.replace(/([\d)\]])·(?=[\dA-Za-zÀ-ỹΔΣπ√(])/g, '$1×')     /* 2·n(E) · 62·n(CO₂) */
       .replace(/(\S)·(?=\d)/g, '$1×');                          /* 4π·5² */
  /* ② mũi tên vectơ */
  r = r.replace(/([A-Za-zÀ-ỹ]{1,3})⃗/g, '<span class="vt">$1</span>');
  r = r.replace(/⃗/g, '');
  /* ③ chỉ số trên – dưới bằng ký tự lạ → thẻ HTML */
  r = r.replace(new RegExp('[' + CS_DUOI + ']+', 'g'),
    m => '<sub>' + [...m].map(c => CS_DUOI.indexOf(c)).join('') + '</sub>');
  r = r.replace(/[⁰¹²³⁴-⁹ⁿ⁺⁻ˣʸᵃᵇᶜᵏᵐᵗ]+/g,
    m => '<sup>' + [...m].map(c => CS_TREN[c]).join('') + '</sup>');
  /* <sub>2</sub><sub>3</sub> liền nhau thì gộp cho khỏi hở chữ */
  return r.replace(/<\/sub><sub>/g, '').replace(/<\/sup><sup>/g, '');
};

TD.chuanDau = function (t) {
  if (typeof t !== 'string') return t;
  /* Trong hình vẽ SVG, dấu trừ ASCII là CÚ PHÁP toạ độ (d="M 52 176 q 10 -16 20 0").
     Đổi nó sang dấu trừ kiểu chữ in thì trình duyệt không đọc được đường path nữa
     và hình mất hẳn — nên phải chừa nguyên mọi đoạn <svg>…</svg> ra. */
  if (t.indexOf('<svg') >= 0)
    return t.split(/(<svg[\s\S]*?<\/svg>)/i)
      .map(x => (/^<svg/i.test(x) ? x : TD.chuanDau(x))).join('');
  return t
    .replace(/([+−])\s*-(\d)/g, (m, d, n) => (d === '+' ? '− ' : '+ ') + n)   /* + -3 → − 3 */
    .replace(/(^|[=(:;,[\s])-(\d)/g, '$1−$2');                                /* = -3 → = −3 */
};

TD.sinhCau = function (mau, seed, cd) {
  const R = TD.rng(seed);
  let o;
  try { o = mau.tao(R, cd); } catch (e) { console.warn('Mẫu đề lỗi:', mau.ma, e); return null; }
  if (!o) return null;
  ['q', 'giai', 'meo', 'ans'].forEach(k => { if (o[k]) o[k] = TD.chuanDau(o[k]); });
  if (o.opts) o.opts = o.opts.map(TD.chuanDau);
  if (o.items) o.items = o.items.map(y => Object.assign({}, y, { t: TD.chuanDau(y.t) }));
  return Object.assign({
    chuong: mau.chuong, muc: mau.muc, dang: mau.dang, _ma: mau.ma, _sinh: true
  }, o);
};

/* Lấy câu hỏi từ một mục trong danh sách phiên.
   Mục tĩnh: {mon, i} · Mục sinh: {mon, g: mã mẫu, s: hạt giống} */
TD.layCau = function (it) {
  if (!it) return null;
  if (it.cau) return it.cau;          /* câu đã dựng sẵn (kiểm tra từ vựng theo phạm vi) */
  if (it.dsy) return TD.cauDsTuMenhDe(it.mon, it.dsy, it.cd, it.s, it.nhan);
  if (it.lt !== undefined) return TD.cauTuMenhDe(it.mon, it.lt, it.c, it.s, it.nhan, it.loc);
  if (it.g) {
    const mau = TD.timMau(it.mon, it.g);
    /* Có bộ sinh phục vụ NHIỀU chuyên đề (trục thời gian Sử, đoạn tư liệu):
       phải nói cho nó biết đang luyện chuyên đề nào, không thì nó bốc ngẫu
       nhiên và ra câu lạc hẳn khỏi chuyên đề người học đang mở. */
    return mau ? TD.sinhCau(mau, it.s, it.cd) : null;
  }
  return (TD.KHO[it.mon] || [])[it.i];
};

/* Khoá thẻ ôn giãn cách.
   Với câu sinh tự động, thẻ gắn với MẪU ĐỀ chứ không phải số liệu cụ thể
   — nên khi tâm ma quay lại, bạn gặp một biến thể MỚI của cùng dạng bài. */
TD.idThe = function (it) {
  /* câu dựng sẵn cho một MỤC TỪ VỰNG cụ thể: thẻ ôn phải gắn với đúng từ đó,
     không gắn với mẫu đề, để tâm ma trả lại đúng từ mình đã sai. */
  if (it.cau) return it.mon + '~' + (it.khoaTu || String(it.cau.q).slice(0, 60));
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
/* Tỉ lệ tối thiểu câu BÀI TẬP (không phải câu nhận định lý thuyết) trong một
   phiên Luyện Công. Phải khớp với bản chất từng môn:
   · Tiếng Anh — đề thi không có lấy một câu "phát biểu nào sau đây đúng"; toàn bộ
     là câu tiếng Anh phải điền, phải chọn, phải đọc. Học ngoại ngữ bằng cách đọc
     nhận định về ngữ pháp thì không ra kỹ năng, nên đặt cao nhất.
   · Toán – Lí – Hoá – Sinh — Phần I của đề thật có cả câu lý thuyết nên chia đôi.
   · Sử – Địa – GDKT – Văn — bản thân đề đã là câu nhận định, không cần ràng buộc. */
TD.TY_LE_BAI_TAP = { anh: 0.85, toan: 0.6, ly: 0.55, hoa: 0.55, sinh: 0.55 };

TD.sinhNhieu = function (mon, muc, n) {
  const mau = (TD.GEN[mon] || []).filter(t => !muc || t.muc === muc);
  if (!mau.length) return [];

  /* Rút n mục từ một danh sách mẫu: xáo rồi duyệt vòng nên mỗi dạng bài đều
     được chạm tới trước khi lặp lại dạng nào. */
  const rutTu = (bo, can) => {
    const ra = [];
    if (!bo.length || can <= 0) return ra;
    let ds = TD.xao(bo), vt = 0;
    for (let thu = 0; ra.length < can && thu < can * 6; thu++) {
      if (vt >= ds.length) { ds = TD.xao(bo); vt = 0; }
      const t = ds[vt++];
      const seed = (Math.random() * 4294967295) >>> 0;
      if (TD.sinhCau(t, seed)) ra.push({ mon: mon, g: t.ma, s: seed });
    }
    return ra;
  };

  /* Giữ sẵn một phần chỗ cho câu CÓ HÌNH, vì mẫu có hình rất ít so với
     tổng số mẫu nên bốc ngẫu nhiên thì gần như không bao giờ ra. */
  const mauHinh = mau.filter(t => t._hinh);
  const canHinh = mauHinh.length ? Math.min(Math.round(n * (TD.TY_LE_HINH || 0.18)), mauHinh.length * 3) : 0;
  const phanHinh = canHinh ? rutTu(mauHinh, canHinh) : [];
  const conLai = Math.max(0, n - phanHinh.length);

  const tyLe = TD.TY_LE_BAI_TAP[mon];
  if (tyLe) {
    const baiTap = mau.filter(t => !t._tuLT && !t._hinh);
    const lyThuyet = mau.filter(t => t._tuLT);
    if (baiTap.length) {
      const canBT = Math.round(conLai * tyLe);
      const bt = rutTu(baiTap, canBT);
      const lt = rutTu(lyThuyet, conLai - bt.length);
      const ra = phanHinh.concat(bt, lt);
      /* thiếu thì bù nốt bằng bài tập, không bù bằng câu lý thuyết */
      if (ra.length < n) ra.push.apply(ra, rutTu(baiTap, n - ra.length));
      return TD.xao(ra);
    }
  }
  return TD.xao(phanHinh.concat(rutTu(mau.filter(t => !t._hinh), conLai)));
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

/* Dấu vân tay của một câu hỏi: gồm cả câu dẫn LẪN phương án.
   Chỉ so câu dẫn là sai, vì hàng loạt câu sinh từ mệnh đề dùng chung một câu
   dẫn ("Phát biểu nào sau đây đúng về X?") mà bốn phương án khác hẳn nhau. */
TD.vanTayCau = function (q) {
  if (!q) return '';
  return (String(q.q || '')
    + '\u00A7' + (q.opts ? q.opts.join('\u00A6') : '')
    + (q.items ? q.items.map(x => x.t).join('\u00A6') : '')
    + '\u00A7' + String(q.ans)).replace(/\s+/g, ' ').trim();
};

/* Dựng một bộ đề Tà Đạo. so = 1..20 · loai = 'lythuyet' | 'baitap' */
TD.deTaDao = function (mon, so, loai) {
  const R = TD.rng(TD.bam(mon + '|' + loai + '|' + so));
  const N = TD.SO_CAU_TA_DAO;

  if (loai === 'baitap') {
    const mau = (TD.GEN[mon] || []).filter(t => !t._tuLT && !t._song);   /* chỉ bài tập tính toán, bỏ bản song sinh cho khỏi lặp */
    if (!mau.length) return [];
    const ra = [];
    /* Rải đều các dạng bài rồi mới xáo, để đề nào cũng phủ hết dạng.
       Một số mẫu đề từ chối vài hạt giống (số liệu ra không đẹp), nên phải
       đổi hạt giống cho tới khi dựng được câu hợp lệ — đề không được có câu trống. */
    /* Mẫu đề ít biến thể mà phải sinh 120 câu thì rất dễ ra hai câu y hệt nhau,
       nên phải so nội dung đã sinh chứ không chỉ đổi hạt giống cho có. */
    const daRa = new Set();
    const thu = (t, khoaSeed) => {
      let seed = TD.bam(khoaSeed);
      for (let lan = 0; lan < 60; lan++) {
        const q = TD.sinhCau(t, seed);
        if (q) {
          const vt = TD.vanTayCau(q);
          if (!daRa.has(vt)) { daRa.add(vt); return seed; }
        }
        seed = TD.bam(khoaSeed + '#' + lan);
      }
      return null;
    };
    for (let k = 0; k < N; k++) {
      const t = mau[k % mau.length];
      const seed = thu(t, mon + so + t.ma + k);
      if (seed !== null) ra.push({ mon: mon, g: t.ma, s: seed });
    }
    /* nếu vẫn thiếu (mẫu đề quá kén hoặc đã cạn biến thể), bù bằng dạng khác */
    for (let k = 0; ra.length && ra.length < N && k < N * 6; k++) {
      const t = mau[k % mau.length];
      const seed = thu(t, mon + so + t.ma + 'bu' + k);
      if (seed !== null) ra.push({ mon: mon, g: t.ma, s: seed });
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

/* ---------- TRẦN MỨC CHO CÂU LÝ THUYẾT ----------
   Ở Toán – Lý – Hoá – Sinh, vận dụng cao là BÀI TẬP nhiều bước, không phải
   câu nhận định. Nếu để mệnh đề mức 4 sinh câu trắc nghiệm thì mức "Vận dụng
   cao" ở Luyện Công, Tà Đạo và Độ Kiếp đều ra câu một dòng — đúng như học
   sinh phàn nàn "sao lời giải ngắn thế".
   Môn xã hội thì ngược lại: nhận định – so sánh – đánh giá CHÍNH LÀ vận dụng
   cao, nên giữ nguyên mức 4.
   Đặt ở đây để mọi nơi dựng câu đều dùng chung một quy ước. */
TD.TRAN_MUC_LT = { toan: 3, ly: 3, hoa: 3, sinh: 3 };
TD.mucLT = function (mon, m) {
  return Math.min(TD.TRAN_MUC_LT[mon] || 4, m || 2);
};

/* Dựng câu Đúng/Sai 4 ý từ bốn mệnh đề trong kho */
TD.cauDsTuMenhDe = function (mon, chiSos, cd, seed, nhan) {
  const kho = TD.KHO_LT[mon] || [];
  const y = chiSos.map(i => kho[i]);
  if (y.some(x => !x)) return null;
  const R = TD.rng(seed >>> 0);
  const t = TD.xaoR(R, y);
  return {
    chuong: cd || 'Lý thuyết trọng điểm',
    /* Mức của câu 4 ý là mức TRUNG BÌNH của bốn ý, không phải ý khó nhất:
       thang điểm 0,1 – 0,25 – 0,5 – 1,0 chấm từng ý một nên độ khó thực tế
       của câu là bình quân, và như vậy mới khớp với hạn ngạch mà đề đã cấp phát. */
    muc: TD.mucLT(mon, Math.round(t.reduce((s2, x) => s2 + (x.m || 2), 0) / t.length)),
    dang: 'ds',
    _lt: true,
    q: `Về chủ đề <b>${nhan || cd}</b>, xét tính đúng/sai của từng phát biểu sau:`,
    items: t.map(x => ({ t: x.t, a: !!x.a })),
    giai: t.map((x, i) => `Ý ${'abcd'[i]}) ${x.a ? 'ĐÚNG' : 'SAI'} — ${x.v}`).join('\n'),
    meo: 'Xét từng ý ĐỘC LẬP với nhau. Đừng nghĩ "chắc phải có 2 đúng 2 sai" — cả 4 ý cùng đúng là hoàn toàn có thể.'
  };
};

/* Dựng câu hỏi trắc nghiệm từ một mệnh đề trong kho */
TD.cauTuMenhDe = function (mon, chiSo, chieu, seed, nhan, loc) {
  const kho = TD.KHO_LT[mon] || [];
  const goc = kho[chiSo];
  if (!goc) return null;
  /* đáp án phải cùng chiều với mệnh đề: hỏi "đúng" thì mệnh đề phải đúng */
  if ((chieu === 'd') !== !!goc.a) return null;

  const R = TD.rng(seed >>> 0);
  const nguoc = kho.filter(x => !!x.a !== !!goc.a);
  if (nguoc.length < 3) return null;
  /* Khi câu được dựng cho MỘT THẺ cụ thể (loc là danh sách mệnh đề sát thẻ đó),
     phương án nhiễu cũng phải nằm trong phạm vi ấy — nếu không thì đề ghi tên
     thẻ mà ba phương án còn lại nói chuyện khác, thành ra tự lộ đáp án. */
  const trongThe = loc ? nguoc.filter((x, i) => loc.indexOf(kho.indexOf(x)) >= 0) : [];
  const cungCD = nguoc.filter(x => x.cd === goc.cd);
  const nguon = trongThe.length >= 3 ? trongThe : (cungCD.length >= 3 ? cungCD : nguoc);
  const nhieu = R.chonNhieu(nguon, 3);

  const opts = TD.xaoR(R, [goc].concat(nhieu));

  /* Đề thật không hỏi trống trơn "Phát biểu nào sau đây đúng?" hai mươi câu liền —
     câu hỏi luôn khoanh vùng chủ đề. Chỉ nêu tên chủ đề khi CẢ BỐN phương án cùng
     thuộc chủ đề đó, nếu không thì tên chủ đề lại thành gợi ý loại trừ. */
  const cungChuDe = nhieu.every(x => x.cd === goc.cd) && goc.cd;
  /* Chỉ nêu tên thẻ khi CẢ BỐN phương án đều lấy trong phạm vi thẻ đó */
  const tenCD = (nhan && loc && nhieu.every(x => loc.indexOf(kho.indexOf(x)) >= 0)) ? nhan : goc.cd;
  const MAU_HOI = {
    d: cungChuDe
      ? [`Nội dung nào sau đây <b>phản ánh đúng</b> về <b>${tenCD}</b>?`,
         `Nhận định nào sau đây về <b>${tenCD}</b> là <b>đúng</b>?`,
         `Phát biểu nào sau đây <b>đúng</b> khi nói về <b>${tenCD}</b>?`,
         `Khi tìm hiểu về <b>${tenCD}</b>, nội dung nào sau đây là <b>chính xác</b>?`]
      : ['Phát biểu nào sau đây <b>đúng</b>?',
         'Nội dung nào sau đây <b>phản ánh đúng</b> thực tế?',
         'Nhận định nào sau đây là <b>đúng</b>?'],
    s: cungChuDe
      ? [`Nội dung nào sau đây <b>không đúng</b> về <b>${tenCD}</b>?`,
         `Nhận định nào sau đây về <b>${tenCD}</b> là <b>sai</b>?`,
         `Phát biểu nào sau đây <b>sai</b> khi nói về <b>${tenCD}</b>?`,
         `Khi tìm hiểu về <b>${tenCD}</b>, nội dung nào sau đây <b>không chính xác</b>?`]
      : ['Phát biểu nào sau đây <b>sai</b>?',
         'Nội dung nào sau đây <b>không đúng</b>?',
         'Nhận định nào sau đây là <b>sai</b>?']
  };

  return {
    chuong: goc.cd || 'Lý thuyết trọng điểm',
    muc: TD.mucLT(mon, goc.m),
    dang: 'mc',
    _lt: true,
    q: R.chon(MAU_HOI[chieu === 'd' ? 'd' : 's']),
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

  /* Với môn tự nhiên, một câu HỎI LÝ THUYẾT không thể là vận dụng cao:
     vận dụng cao ở Toán – Lý – Hoá – Sinh là bài tập nhiều bước, phải ghép
     nhiều mảng kiến thức. Nếu để mệnh đề mức 4 sinh câu trắc nghiệm thì
     màn "Vận dụng cao" của Luyện Công sẽ toàn câu nhận định một dòng.
     ⇒ Ở bốn môn này, câu từ mệnh đề bị chặn trần ở mức 3.
     Môn xã hội thì ngược lại: vận dụng cao chính là nhận định, so sánh,
     đánh giá — nên giữ nguyên mức 4. */
  for (const mon of Object.keys(TD.KHO_LT)) {
    const kho = TD.KHO_LT[mon];
    if (!Array.isArray(kho) || kho.length < 8) continue;
    const tran = TD.TRAN_MUC_LT[mon] || 4;
    const gDung = kho.filter(x => x.a).length, gSai = kho.length - gDung;

    const theoCD = {};
    kho.forEach((x, i2) => { const c = x.cd || 'Khác'; (theoCD[c] = theoCD[c] || []).push(i2); });

    TD.GEN[mon] = TD.GEN[mon] || [];
    for (const cd of Object.keys(theoCD)) {
      const idx = theoCD[cd];
      const ma = slug(cd);

      /* Đăng ký RIÊNG cho từng mức độ — nếu gộp lại rồi lấy mức trung bình
         thì mức 1 và mức 4 sẽ trống, người học không luyện riêng được. */
      for (let muc = 1; muc <= tran; muc++) {
        /* mệnh đề vượt trần thì dồn vào mức trần chứ không bỏ đi */
        const hop = i2 => TD.mucLT(mon, kho[i2].m) === muc;
        const dungM = idx.filter(i2 => kho[i2].a && hop(i2));
        const saiM = idx.filter(i2 => !kho[i2].a && hop(i2));

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
        const mucDS = Math.min(tran, Math.max.apply(null, idx.map(i2 => kho[i2].m || 2)));
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
    .replace(/[−–—]/g, '-')                    /* mọi kiểu dấu trừ đều quy về một */
    .replace(/\s+/g, '').replace(/\./g, ',').replace(/,+$/, '');
  const a = chuan(nhap), b = chuan(dung);
  if (a === b) return true;
  /* so sánh dạng số, cho phép sai số làm tròn nhỏ */
  const so = s => parseFloat(String(s).replace(/[−–—]/g, '-').replace(/\s/g, '').replace(',', '.'));
  const x = so(a), y = so(b);
  if (!isNaN(x) && !isNaN(y) && b.indexOf(';') < 0) return Math.abs(x - y) < 1e-6;
  return false;
};

/* ============================================================
   ĐỘ KIẾP — DỰNG ĐỀ THI THỬ ĐÚNG CẤU TRÚC CHÍNH THỨC
   Bản cũ chỉ rút từ TD.KHO (câu cố định) cộng mỗi mẫu đề đúng một
   câu, nên môn nào cũng hụt: Sinh 2/18 câu Phần I, Anh 27/40…
   Bản này gộp cả ba nguồn — câu cố định · mẫu đề tự sinh · kho
   mệnh đề trọng điểm — nên môn nào cũng đủ p1 + p2 + p3 câu,
   và chia mức độ đúng chỗ:
     Phần I  (nhiều lựa chọn) nghiêng về nhận biết – thông hiểu
     Phần II (đúng/sai 4 ý)   thông hiểu – vận dụng
     Phần III(trả lời ngắn)   toàn bộ là vận dụng & vận dụng cao
   ============================================================ */

TD.deThiThat = function (mon, seed, cap) {
  const M = TD.MON[mon];
  if (!M) return { p1: [], p2: [], p3: [], ds: [] };
  /* cấp lôi kiếp quyết định đề nặng hay nhẹ; không truyền thì lấy theo cảnh giới */
  const K = (TD.KIEP || []).find(k => k.cap === cap) || TD.kiepTheoCanhGioi(TD.S ? TD.S.exp : 0);
  const R = TD.rng(seed === undefined ? (Math.random() * 4294967295) >>> 0 : (seed >>> 0));
  const kho = TD.KHO[mon] || [], lt = TD.KHO_LT[mon] || [];
  /* _tuLT là mẫu đề sinh ra TỪ kho mệnh đề — bỏ ra kẻo trùng với nguồn mệnh đề bên dưới */
  /* _luyen: bộ sinh chỉ dùng để LUYỆN, không được vào đề thật. Cụ thể là các
     bộ câu ngữ pháp tiếng Anh dạng câu rời — đề tốt nghiệp từ 2025 không còn
     một câu nào như vậy, mọi kiến thức ngôn ngữ đều nằm trong văn bản. */
  const gen = (TD.GEN[mon] || []).filter(t => !t._tuLT && !t._luyen);

  /* ---- gom bể câu theo dạng, mỗi mục kèm mức độ để chia cho đúng ---- */
  const be = { mc: [], ds: [], tln: [] };
  /* khoá chống trùng phải tự khai báo: mục đúng/sai lúc này chưa chọn 4 ý
     nên TD.idThe chưa đọc ra được chủ đề, để nó tự đoán là cả bể dính chung một khoá. */
  kho.forEach((q, i) => { if (be[q.dang]) be[q.dang].push({ khoa: mon + '#' + i, muc: q.muc || 2, it: { mon: mon, i: i } }); });
  gen.forEach(t => { if (be[t.dang]) be[t.dang].push({ khoa: mon + '@' + t.ma, muc: t.muc || 2, it: { mon: mon, g: t.ma, s: 0 } }); });
  lt.forEach((x, i) => be.mc.push({ khoa: mon + '$' + i, muc: TD.mucLT(mon, x.m),
    it: { mon: mon, lt: i, c: x.a ? 'd' : 's', s: 0 } }));

  const theoCD = {};
  lt.forEach((x, i) => { const c = x.cd || 'Khác'; (theoCD[c] = theoCD[c] || []).push(i); });
  Object.keys(theoCD).forEach(c => {
    if (theoCD[c].length < 4) return;
    /* Mức của câu 4 ý lấy theo mức TRUNG BÌNH của chủ đề chứ không phải ý khó nhất:
       bốn ý được bốc ngẫu nhiên nên lấy ý khó nhất làm đại diện sẽ đẩy cả Phần II
       lên mức vận dụng, khiến đề nặng hơn tỉ lệ 4:3:3 mà Bộ quy định. */
    const ds4 = theoCD[c].map(i => lt[i].m || 2);
    const m = TD.mucLT(mon, Math.round(ds4.reduce((a, b) => a + b, 0) / ds4.length));
    be.ds.push({ khoa: mon + '\u00A7' + c, muc: m, it: { mon: mon, dsy: null, cd: c, s: 0 } });
  });

  /* ---- HẠN NGẠCH MỨC ĐỘ CHO CẢ ĐỀ ----
     Bộ GD&ĐT quy định tỉ lệ cấp độ tư duy tính trên TOÀN BỘ đề, không phải riêng Phần I.
     Phần II và Phần III bản chất đã là câu khó, nên phải cấp phát cho hai phần đó trước,
     Phần I nhận phần hạn ngạch còn lại. Làm ngược lại thì cả đề lệch nặng về phía khó —
     đúng lỗi mà bản trước mắc phải (đề "đúng đề thật" của Toán ra tới 57% câu vận dụng
     trong khi đề thật chỉ có 30%). */
  const tongCau = M.p1 + M.p2 + M.p3;
  const quota = {}; let daCap = 0;
  for (const m of [1, 2, 3, 4]) { quota[m] = Math.floor(tongCau * (K.tong[m] || 0)); daCap += quota[m]; }
  for (let k = 0; daCap < tongCau; k++, daCap++) quota[[2, 3, 1, 4][k % 4]]++;

  const daDung = {};
  /* Mẫu đề TỰ SINH dùng lại lần thứ hai vẫn ra một bài KHÁC (hạt giống khác ⇒ số liệu
     khác), nên khi hạn ngạch câu khó không đủ thì cho phép lấy lại — đúng như đề thật
     vẫn có hai câu cùng một chuyên đề. Câu dựng thẳng từ một mệnh đề thì KHÔNG, vì
     lấy lại là ra y hệt câu cũ. */
  const choLapLai = it => !!(it.g || it.dsy !== undefined);

  /* thuTu: thứ tự ưu tiên tiêu hạn ngạch. Phần III lấy câu khó trước, Phần I lấy câu dễ trước. */
  const rut = (bo, n, thuTu) => {
    const ra = [];
    if (!n || !bo.length) return ra;
    const them = (x, tran) => {
      const da = daDung[x.khoa] || 0;
      const toiDa = (tran === 2 && choLapLai(x.it)) ? 2 : 1;
      if (da >= toiDa) return false;
      daDung[x.khoa] = da + 1; ra.push(x.it); return true;
    };
    const theoMuc = { 1: [], 2: [], 3: [], 4: [] };
    TD.xaoR(R, bo).forEach(x => (theoMuc[x.muc] || theoMuc[2]).push(x));

    for (const m of thuTu)
      for (const x of theoMuc[m]) {
        if (ra.length >= n || quota[m] <= 0) break;
        if (them(x)) quota[m]--;
      }
    /* Hết hạn ngạch mà vẫn thiếu câu thì phải vét tiếp, nhưng vét theo đúng khuynh hướng
       của cấp lôi kiếp: đề cấp cao thiếu câu khó thì vét câu khó, không được vét câu dễ
       nhất trước. Trước đây Phần I luôn vét từ mức 1 nên đề "học sinh giỏi" bị nhét đầy
       câu nhận biết ở cuối. */
    if (ra.length < n) {
      const uuTienVet = [1, 2, 3, 4].sort((a, b) => (K.tong[b] || 0) - (K.tong[a] || 0));
      /* Vòng 1: cố lấp bằng mẫu chưa dùng, theo đúng khuynh hướng của cấp lôi kiếp.
         Vòng 2: chấp nhận lấy lại mẫu tự sinh lần thứ hai — vẫn ra bài khác. */
      for (const tran of [1, 2])
        for (const m of uuTienVet)
          for (const x of theoMuc[m]) {
            if (ra.length >= n) break;
            if (them(x, tran)) quota[m] = Math.max(0, quota[m] - 1);
          }
    }
    return ra;
  };

  /* ---- chốt hạt giống ----
     Mẫu đề nào từ chối hạt giống thì đổi hạt giống, chịu thua thì bỏ.
     Quan trọng hơn: một mẫu được phép lấy hai lần trong cùng đề, mà mẫu ít
     biến thể (mấy bộ ngữ pháp tiếng Anh chỉ có hơn chục câu gốc) thì hai lần
     rút rất dễ ra y hệt nhau. Nên phải so NỘI DUNG câu đã sinh chứ không chỉ
     so mã mẫu, và so chung cho cả ba phần của đề. */
  const daRa = new Set();
  const vanTay = TD.vanTayCau;

  const chot = ds => {
    const ra = [];
    for (const it0 of ds) {
      const it = Object.assign({}, it0);
      let duoc = false;
      /* thử tối đa 40 hạt giống: vừa để mẫu sinh được, vừa để không đụng câu đã có */
      for (let l = 0; l < 40; l++) {
        if (it.dsy === null || (l && it0.dsy === null)) it.dsy = R.chonNhieu(theoCD[it.cd], 4);
        if (it.s !== undefined) it.s = R.nguyen(1, 2147483646) >>> 0;
        const q = TD.layCau(it);
        if (q) {
          const vt = vanTay(q);
          if (!daRa.has(vt)) { daRa.add(vt); duoc = true; break; }
        }
        if (it.s === undefined && it0.dsy !== null) break;   /* câu cố định: đổi hạt giống cũng vô ích */
      }
      if (duoc) ra.push(it);
    }
    return ra;
  };

  /* ---- CẤP CHỖ RIÊNG CHO CÂU CÓ HÌNH ----
     Đề thật luôn có mấy câu đồ thị, bảng biến thiên, phả hệ, mạch điện.
     Thả mẫu có hình chung rổ với hơn tám trăm mẫu khác thì xác suất bốc
     trúng gần bằng không (đo được 0,01 câu mỗi đề môn Toán), nên phải giữ
     sẵn chỗ cho chúng trước khi rút phần còn lại. */
  /* ---- BỐ CỤC CỐ ĐỊNH CỦA ĐỀ TIẾNG ANH ----
     Bốn mươi câu tiếng Anh không phải bốc ngẫu nhiên: đề chia cứng
     12 câu điền từ vào văn bản · 5 câu sắp xếp · 5 câu hoàn thành đoạn văn ·
     18 câu đọc hiểu (hai bài 8 và 10 câu). Rút đúng theo hạn ngạch đó. */
  /* Vì bố cục này do Bộ quy định nên môn Anh KHÔNG chạy theo cấp lôi kiếp:
     không thể vừa giữ 12/5/5/18 vừa nhồi 55% câu vận dụng cao. Cấp lôi kiếp
     ở môn Anh chỉ đổi bộ văn bản và bộ câu hỏi, không đổi bố cục. */
  const BO_CUC_ANH = [['anh-that-dienvb', 12], ['anh-sapxep', 5],
                      ['anh-that-hoanthanh', 5], ['anh-that-dochieu', 18]];

  const canHinh = (TD.SO_CAU_HINH || {})[mon] || 0;
  const maHinh = {};
  gen.forEach(t => { if (t._hinh) maHinh[mon + '@' + t.ma] = t.dang; });
  const rutHinh = (bo, n, mucToiThieu) => {
    const ra = [];
    if (!n) return ra;
    for (const x of TD.xaoR(R, bo.filter(y => maHinh[y.khoa] && (!mucToiThieu || y.muc >= mucToiThieu)))) {
      if (ra.length >= n) break;
      if ((daDung[x.khoa] || 0) >= 1) continue;
      daDung[x.khoa] = 1;
      quota[x.muc] = Math.max(0, (quota[x.muc] || 0) - 1);
      ra.push(x.it);
    }
    return ra;
  };
  /* Chia hạn ngạch hình theo số mẫu THỰC CÓ của từng dạng, không chia cứng
     theo tỉ lệ: môn Lý chỉ có một mẫu hình dạng trắc nghiệm nên chia cứng
     70% cho Phần I là hụt mất một câu. */
  const coMc = Object.values(maHinh).filter(d => d === 'mc').length;
  const coTln = Object.values(maHinh).filter(d => d === 'tln').length;
  const coDs = Object.values(maHinh).filter(d => d === 'ds').length;
  /* Phần II đáng giá tới 1,0đ một câu và đề thật rất hay đặt hình ở đây,
     nên giữ trước đúng một chỗ cho câu đúng/sai có hình nếu môn đó có mẫu. */
  const soHinhDs = Math.min(coDs ? 1 : 0, canHinh, M.p2);
  const hinhDs = chot(rutHinh(be.ds, soHinhDs));
  const soHinhMc = Math.min(canHinh - hinhDs.length, coMc, M.p1);
  const hinhMc = chot(rutHinh(be.mc, soHinhMc));
  /* Phần III của đề thật chỉ có câu vận dụng trở lên, nên câu hình đưa vào
     đây cũng phải từ mức 3 — không được vì muốn đủ hạn ngạch mà nhét câu dễ. */
  const soHinhTln = Math.min(canHinh - hinhDs.length - hinhMc.length, coTln, M.p3);
  const hinhTln = chot(rutHinh(be.tln, soHinhTln, 3));

  /* Rút theo đúng thứ tự: Phần III (khó nhất) → Phần II → Phần I nhận phần còn lại */
  const p3 = hinhTln.concat(chot(rut(be.tln, M.p3 - hinhTln.length, [4, 3, 2, 1])));
  const p2 = hinhDs.concat(chot(rut(be.ds, M.p2 - hinhDs.length, [2, 3, 4, 1])));
  let p1 = hinhMc.concat(chot(rut(be.mc, M.p1 - hinhMc.length, [1, 2, 3, 4])));
  /* Tiếng Anh: thay Phần I bốc ngẫu nhiên bằng đúng bố cục bốn dạng của đề.
     Mỗi dạng có thể lấy lại nhiều lần vì mỗi lần rút ra một văn bản khác. */
  if (mon === 'anh') {
    const theoMa = {};
    (TD.GEN.anh || []).forEach(t => { theoMa[t.ma] = t; });
    const raA = [];
    for (const [ma, soCau] of BO_CUC_ANH) {
      if (!theoMa[ma]) continue;
      for (let i = 0; i < soCau; i++) {
        /* Bố cục cứng thì mức độ cũng phải cân bằng tay: mỗi dạng chứa câu ở
           nhiều mức khác nhau, nên ưu tiên hạt giống nào cho ra câu thuộc mức
           còn hạn ngạch, hết mới lấy đại. Không làm thế thì cả đề tiếng Anh
           dồn về một mức và lệch hẳn tỉ lệ 4:3:3. */
        let them = null, du = null;
        for (let l = 0; l < 60 && !them; l++) {
          const it = { mon: 'anh', g: ma, s: R.nguyen(1, 2147483646) >>> 0 };
          const q = TD.layCau(it);
          if (!q) continue;
          const vt = vanTay(q);
          if (daRa.has(vt)) continue;
          const m = q.muc || 2;
          if (quota[m] > 0) { daRa.add(vt); quota[m]--; them = it; }
          else if (!du) du = { it: it, vt: vt, m: m };
        }
        if (!them && du) { daRa.add(du.vt); quota[du.m] = Math.max(0, quota[du.m] - 1); them = du.it; }
        if (them) raA.push(them);
      }
    }
    /* thiếu bao nhiêu thì vét nốt từ bể chung để đề vẫn đủ 40 câu */
    if (raA.length < M.p1) p1 = raA.concat(p1.slice(0, M.p1 - raA.length));
    else p1 = raA.slice(0, M.p1);
  }
  /* thứ tự làm bài khuyến nghị: Phần I → Phần III → Phần II */
  return { p1: p1, p2: p2, p3: p3, ds: p1.concat(p3, p2), kiep: K };
};
