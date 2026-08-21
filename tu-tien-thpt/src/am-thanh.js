/* ============================================================
   ÂM THANH — TỔNG HỢP BẰNG WEB AUDIO, KHÔNG DÙNG FILE NGOÀI
   Ứng dụng phải chạy được khi mở thẳng file HTML lúc không có
   mạng, và bản artifact thì chặn mọi tài nguyên từ host khác.
   Nên mọi tiếng ở đây đều được dựng từ dao động ký tại chỗ:
   chuông đồng, mõ gỗ, tiếng sấm của lôi kiếp, hợp âm đột phá.
   Trình duyệt cấm phát tiếng trước khi người dùng chạm vào
   trang, nên AudioContext chỉ được đánh thức ở lần chạm đầu.
   ============================================================ */
window.TD = window.TD || {};

(function () {
let AC = null, master = null, daMo = false;

const batMay = () => {
  if (AC) return AC;
  const Ctor = window.AudioContext || window.webkitAudioContext;
  if (!Ctor) return null;
  try {
    AC = new Ctor();
    master = AC.createGain();
    master.gain.value = 0.5;
    master.connect(AC.destination);
  } catch (e) { AC = null; }
  return AC;
};

/* Người dùng chạm lần đầu thì mở máy và gỡ bỏ luôn cái chốt */
const moChot = () => {
  if (daMo) return;
  daMo = true;
  const a = batMay();
  if (a && a.state === 'suspended') a.resume();
};
if (typeof window.addEventListener === 'function')
  ['pointerdown', 'keydown', 'touchstart'].forEach(e =>
    window.addEventListener(e, moChot, { passive: true }));

TD.AM = {
  bat: true,          /* TD.tai() sẽ ghi đè bằng giá trị đã lưu */
  am_luong: 0.5
};

const song = (loai, tan, batDau, dai, to, tanCuoi) => {
  const o = AC.createOscillator(), g = AC.createGain();
  o.type = loai;
  const t0 = AC.currentTime + batDau;
  o.frequency.setValueAtTime(tan, t0);
  if (tanCuoi) o.frequency.exponentialRampToValueAtTime(Math.max(20, tanCuoi), t0 + dai);
  /* bao hình đơn giản: lên nhanh, tắt dần theo hàm mũ cho giống tiếng gõ */
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(Math.max(0.0002, to), t0 + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dai);
  o.connect(g); g.connect(master);
  o.start(t0); o.stop(t0 + dai + 0.02);
};

/* Nhiễu trắng lọc qua bộ lọc — dùng cho tiếng sấm và tiếng gió */
const nhieu = (batDau, dai, to, cat, loaiLoc, quet) => {
  const n = Math.floor(AC.sampleRate * dai);
  const bo = AC.createBuffer(1, n, AC.sampleRate);
  const d = bo.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
  const s = AC.createBufferSource(); s.buffer = bo;
  const f = AC.createBiquadFilter();
  f.type = loaiLoc || 'lowpass';
  const t0 = AC.currentTime + batDau;
  f.frequency.setValueAtTime(cat, t0);
  if (quet) f.frequency.exponentialRampToValueAtTime(Math.max(40, quet), t0 + dai);
  const g = AC.createGain();
  g.gain.setValueAtTime(to, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dai);
  s.connect(f); f.connect(g); g.connect(master);
  s.start(t0); s.stop(t0 + dai);
};

/* Chuông đồng: một tần số gốc cộng các hoạ âm lệch, nghe kim loại hơn sin thuần */
const chuong = (tan, dai, to, tre) => {
  song('sine', tan, tre || 0, dai, to);
  song('sine', tan * 2.76, tre || 0, dai * 0.6, to * 0.32);
  song('sine', tan * 5.4, tre || 0, dai * 0.35, to * 0.14);
};

const NOT = { do: 261.63, re: 293.66, mi: 329.63, fa: 349.23, sol: 392.0, la: 440.0, si: 493.88 };

/* Bảng tiếng. Mỗi tiếng là một hàm dựng, chỉ chạy khi thật sự cần. */
const TIENG = {
  /* trả lời đúng — chuông trong, cao dần theo chuỗi đang có */
  dung(chuoi) {
    const b = Math.min(8, Math.max(0, chuoi || 0));
    const tan = NOT.sol * Math.pow(2, b / 12);      /* mỗi câu đúng liên tiếp nhích lên nửa cung */
    chuong(tan, 0.55, 0.30);
    chuong(tan * 1.5, 0.40, 0.13, 0.055);
  },
  /* trả lời sai — mõ gỗ trầm, một tiếng gọn, không chói tai */
  sai() {
    song('triangle', 196, 0, 0.20, 0.26, 110);
    nhieu(0, 0.10, 0.05, 900);
  },
  /* đúng một phần (câu Đúng/Sai được 1–3 ý) */
  vua() {
    chuong(NOT.mi, 0.30, 0.20);
    chuong(NOT.do, 0.34, 0.14, 0.09);
  },
  /* chuỗi 5, 10, 15… — quãng năm đi lên nghe như reo */
  chuoi() {
    [NOT.do, NOT.sol, NOT.do * 2].forEach((f, i) => chuong(f, 0.42, 0.22, i * 0.075));
  },
  /* đột phá cảnh giới — hợp âm rải đi lên rồi ngân dài */
  dotpha() {
    [NOT.do, NOT.mi, NOT.sol, NOT.do * 2, NOT.mi * 2].forEach((f, i) => chuong(f, 1.5 - i * 0.12, 0.26, i * 0.11));
    nhieu(0.1, 1.4, 0.05, 5200, 'highpass', 900);
  },
  /* dùng pháp bảo — tiếng vút của linh khí */
  phapbao() {
    song('sine', 700, 0, 0.26, 0.16, 2100);
    nhieu(0, 0.22, 0.055, 1400, 'bandpass', 3600);
  },
  /* bắt đầu độ kiếp — sấm rền */
  sam() {
    nhieu(0, 1.5, 0.42, 320, 'lowpass', 70);
    song('sine', 62, 0, 1.1, 0.22, 34);
    nhieu(0.22, 0.9, 0.16, 900, 'lowpass', 120);
  },
  /* vượt kiếp thành công */
  thangkiep() {
    [NOT.do, NOT.mi, NOT.sol].forEach((f, i) => chuong(f, 1.1, 0.24, i * 0.09));
    chuong(NOT.do * 2, 1.6, 0.26, 0.30);
  },
  /* độ kiếp thất bại — hợp âm đi xuống */
  batkiep() {
    [NOT.sol, NOT.mi, NOT.do].forEach((f, i) => song('triangle', f * 0.5, i * 0.14, 0.5, 0.18));
    nhieu(0, 0.7, 0.10, 500);
  },
  /* đồng hồ sắp hết giờ */
  tich() { song('square', 1400, 0, 0.05, 0.10); },
  /* chuyển màn, bấm nút phụ — rất khẽ, chỉ để có phản hồi */
  cham() { song('sine', 520, 0, 0.07, 0.06); },
  /* khắc cốt ghi tâm một thẻ Tàng Kinh Các */
  khac() { chuong(NOT.la, 0.5, 0.20); chuong(NOT.mi * 2, 0.34, 0.11, 0.07); },
  /* nhận vật phẩm, lên linh thạch */
  thuong() { [NOT.mi, NOT.sol, NOT.si].forEach((f, i) => chuong(f * 2, 0.3, 0.15, i * 0.06)); }
};

/* Điểm gọi duy nhất của cả ứng dụng: TD.keu('dung', chuoi) */
TD.keu = function (ten, tham) {
  if (!TD.AM.bat) return;
  const a = batMay();
  if (!a) return;
  if (a.state === 'suspended') { a.resume(); return; }   /* chưa chạm trang thì bỏ qua, không xếp hàng */
  const f = TIENG[ten];
  if (!f) return;
  master.gain.value = TD.AM.am_luong;
  try { f(tham); } catch (e) {}
};

/* Nghe thử trong màn Cài đặt */
TD.ngheThu = function () {
  TD.keu('dung', 3);
  setTimeout(() => TD.keu('phapbao'), 420);
  setTimeout(() => TD.keu('dotpha'), 820);
};

TD.datAmThanh = function (bat, amLuong) {
  if (bat !== undefined) TD.AM.bat = !!bat;
  if (amLuong !== undefined) TD.AM.am_luong = Math.max(0, Math.min(1, amLuong));
  TD.S.am_thanh = TD.AM.bat;
  TD.S.am_luong = TD.AM.am_luong;
  if (master) master.gain.value = TD.AM.am_luong;
  TD.luu();
};
})();
