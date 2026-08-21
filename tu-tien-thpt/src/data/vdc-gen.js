/* ============================================================
   VẬN DỤNG CAO — MẪU ĐỀ NHIỀU BƯỚC, GẮN BỐI CẢNH THỰC TIỄN
   Bám định hướng CT GDPT 2018: câu mức 4 không nặng tính toán
   thuần tuý mà bắt phải hiểu bản chất, ghép nhiều mảng kiến thức
   và xử lí bối cảnh đời sống — sản xuất, năng lượng, môi trường.
   Mỗi mẫu tự random số liệu, tự tính đáp án và tự viết lời giải.
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {};

(function () {
const S = TD.soVN;
const T = TD.lamTron;
const D = TD.dapSo;          /* đáp án số: đúng số chữ số thập phân đề yêu cầu */

/* ==========================================================
   HOÁ HỌC — VẬN DỤNG CAO
   ========================================================== */
TD.GEN.hoa = (TD.GEN.hoa || []).concat([

/* --- Làm mềm nước cứng: đổi mg/L → mol, cộng hai cation --- */
{ ma: 'hoa-vdc-lammem', chuong: 'Phi kim – Vô cơ', muc: 4, dang: 'tln',
  tao(R) {
    const a = R.nguyen(1, 7) * 40;          /* mg/L Ca²⁺ */
    const b = R.nguyen(1, 5) * 24;          /* mg/L Mg²⁺ */
    const V = R.chon([1, 2, 4, 5, 10]);     /* m³ nước */
    const nCa = V * a / 40, nMg = V * b / 24;   /* mol trong V m³ */
    const m = T(106 * (nCa + nMg) / 1000, 3);   /* kg */
    return {
      q: `Một nhà máy xử lí nước sinh hoạt phân tích được mẫu nước cứng chứa `
        + `${S(a)} mg/L ion Ca²⁺ và ${S(b)} mg/L ion Mg²⁺. Để làm mềm ${S(V)} m³ nước này bằng `
        + `sodium carbonate (Na₂CO₃), cần dùng bao nhiêu kilôgam Na₂CO₃? `
        + `(Ca = 40; Mg = 24; Na₂CO₃ có M = 106; làm tròn đến hàng phần nghìn)`,
      ans: D(m, 3),
      giai: `Bước 1 — quy về mol trong ${S(V)} m³ = ${S(V * 1000)} lít nước:\n`
        + `  m(Ca²⁺) = ${S(a)} mg/L × ${S(V * 1000)} L = ${S(a * V)} g ⇒ n(Ca²⁺) = ${S(a * V)}/40 = ${S(nCa, 3)} mol\n`
        + `  m(Mg²⁺) = ${S(b)} mg/L × ${S(V * 1000)} L = ${S(b * V)} g ⇒ n(Mg²⁺) = ${S(b * V)}/24 = ${S(nMg, 3)} mol\n`
        + `Bước 2 — mỗi ion Ca²⁺ hoặc Mg²⁺ cần 1 ion CO₃²⁻ để kết tủa:\n`
        + `  Ca²⁺ + CO₃²⁻ → CaCO₃↓ ; Mg²⁺ + CO₃²⁻ → MgCO₃↓\n`
        + `  n(Na₂CO₃) = ${S(nCa, 3)} + ${S(nMg, 3)} = ${S(nCa + nMg, 3)} mol\n`
        + `Bước 3 — m = ${S(nCa + nMg, 3)} × 106 = ${S(106 * (nCa + nMg), 2)} g = ${D(m, 3)} kg.`,
      meo: 'Na₂CO₃ xử lí được cả nước cứng tạm thời lẫn vĩnh cửu vì nó hạ trực tiếp nồng độ Ca²⁺, Mg²⁺. '
        + 'Đun nóng chỉ trị được nước cứng tạm thời (chứa HCO₃⁻).'
    };
  } },

/* --- Quang hợp: nối nhiệt hoá học với sinh học, có hiệu suất --- */
{ ma: 'hoa-vdc-quanghop', chuong: 'Carbohydrate', muc: 4, dang: 'tln',
  tao(R) {
    const m = R.nguyen(1, 12) * 18;         /* gam glucose */
    const H = R.chon([10, 15, 20, 25, 30, 40, 50]);
    const n = m / 180;
    const E = T(n * 2803 / (H / 100), 1);
    return {
      q: `Phản ứng quang hợp 6CO₂(g) + 6H₂O(l) → C₆H₁₂O₆(s) + 6O₂(g) có Δ<sub>r</sub>H°₂₉₈ = +2803 kJ/mol. `
        + `Một cây xanh chuyển hoá được ${S(H)}% năng lượng ánh sáng hấp thụ thành năng lượng hoá học. `
        + `Để tạo ra ${S(m)} gam glucose, cây cần hấp thụ bao nhiêu kJ năng lượng ánh sáng? `
        + `(C = 12; H = 1; O = 16; làm tròn đến hàng phần mười)`,
      ans: D(E, 1),
      giai: `Bước 1 — n(glucose) = ${S(m)}/180 = ${S(n, 4)} mol.\n`
        + `Bước 2 — năng lượng hoá học tích luỹ được (phản ứng thu nhiệt nên cần cấp vào):\n`
        + `  Q<sub>ích</sub> = ${S(n, 4)} × 2803 = ${S(n * 2803, 2)} kJ\n`
        + `Bước 3 — hiệu suất ${S(H)}% ⇒ năng lượng ánh sáng phải hấp thụ:\n`
        + `  E = ${S(n * 2803, 2)} ÷ ${S(H / 100)} = ${D(E, 1)} kJ.`,
      meo: 'Δ<sub>r</sub>H > 0 nghĩa là phản ứng THU nhiệt — quang hợp tích trữ năng lượng. '
        + 'Hiệu suất luôn nằm ở MẪU khi tính lượng đầu vào, ở TỬ khi tính lượng đầu ra.'
    };
  } },

/* --- Đốt nhiên liệu đun nước: ghép nhiệt hoá học với nhiệt lượng --- */
{ ma: 'hoa-vdc-nhienlieu', chuong: 'Đại cương hữu cơ', muc: 4, dang: 'tln',
  tao(R) {
    const nl = R.chon([
      { t: 'khí methane CH₄', M: 16, dH: 890.3, khi: true },
      { t: 'ethanol C₂H₅OH (lỏng)', M: 46, dH: 1366.9, khi: false },
      { t: 'khí propane C₃H₈', M: 44, dH: 2220.0, khi: true }
    ]);
    const V = R.chon([2, 3, 4, 5, 10]);     /* lít nước */
    const t1 = R.chon([20, 25, 30]);
    const H = R.chon([50, 60, 70, 80, 90]);
    const Q = V * 4200 * (100 - t1) / 1000;             /* kJ cần cho nước */
    const n = Q / (nl.dH * H / 100);                    /* mol nhiên liệu */
    const dv = nl.khi ? 'lít (đkc, 24,79 L/mol)' : 'gam';
    const kq = T(nl.khi ? n * 24.79 : n * nl.M, 2);
    return {
      q: `Đốt cháy hoàn toàn ${nl.t} toả ra ${S(nl.dH)} kJ/mol. Dùng nhiên liệu này đun `
        + `${S(V)} lít nước từ ${S(t1)} °C lên 100 °C trên một bếp có hiệu suất ${S(H)}%. `
        + `Cần bao nhiêu ${dv} nhiên liệu? `
        + `(nước: D = 1 g/mL, c = 4200 J/(kg·K); làm tròn đến hàng phần trăm)`,
      ans: D(kq, 2),
      giai: `Bước 1 — nhiệt lượng nước cần nhận:\n`
        + `  Q = m·c·Δt = ${S(V)} × 4200 × (100 − ${S(t1)}) = ${S(V * 4200 * (100 - t1))} J = ${S(Q, 2)} kJ\n`
        + `Bước 2 — bếp chỉ đạt hiệu suất ${S(H)}% nên nhiệt do nhiên liệu toả ra phải lớn hơn:\n`
        + `  Q<sub>toả</sub> = ${S(Q, 2)} ÷ ${S(H / 100)} = ${S(Q / (H / 100), 2)} kJ\n`
        + `Bước 3 — n(nhiên liệu) = ${S(Q / (H / 100), 2)} ÷ ${S(nl.dH)} = ${S(n, 4)} mol\n`
        + `Bước 4 — ${nl.khi
            ? `V = ${S(n, 4)} × 24,79 = ${D(kq, 2)} lít.`
            : `m = ${S(n, 4)} × ${S(nl.M)} = ${D(kq, 2)} gam.`}`,
      meo: 'Chương trình mới dùng điều kiện chuẩn 25 °C, 1 bar ⇒ 1 mol khí chiếm 24,79 lít, KHÔNG phải 22,4 lít. '
        + 'Đây là bẫy chuyển tiếp giữa hai chương trình.'
    };
  } },

/* --- Điện phân hai giai đoạn: catot hết Cu²⁺ rồi mới sinh H₂ --- */
{ ma: 'hoa-vdc-dp2gd', chuong: 'Điện phân – Pin điện', muc: 4, dang: 'tln',
  tao(R) {
    const a = R.nguyen(1, 6) * 0.05;                 /* mol CuSO₄ */
    const I = R.chon([1, 2, 5, 10]);
    const k = R.nguyen(1, 40);
    const t = 965 * k;
    const ne = T(0.01 * I * k, 4);                   /* mol electron */
    if (ne < 0.02 || ne > 1.2) return null;
    const hai = ne > 2 * a;                          /* đã sang giai đoạn 2 chưa */
    const nCu = hai ? a : ne / 2;
    const nH2 = hai ? (ne - 2 * a) / 2 : 0;
    const nO2 = ne / 4;
    const dm = T(64 * nCu + 2 * nH2 + 32 * nO2, 3);
    return {
      q: `Điện phân 500 mL dung dịch CuSO₄ ${S(T(a / 0.5, 2))}M (điện cực trơ) với cường độ dòng điện `
        + `${S(I)} A trong ${S(t)} giây. Khối lượng dung dịch giảm bao nhiêu gam? `
        + `(F = 96500 C/mol; Cu = 64; O = 16; H = 1; làm tròn đến hàng phần nghìn)`,
      ans: D(dm, 3),
      giai: `Bước 1 — số mol electron trao đổi: n<sub>e</sub> = I·t/F = ${S(I)}×${S(t)}/96500 = ${S(ne, 4)} mol.\n`
        + `Bước 2 — n(CuSO₄) = ${S(a, 2)} mol, cần ${S(2 * a, 2)} mol electron để khử hết Cu²⁺.\n`
        + (hai
            ? `  Vì ${S(ne, 4)} > ${S(2 * a, 2)} nên Cu²⁺ bị khử HẾT rồi nước tiếp tục bị điện phân ở catot:\n`
              + `  Cu = ${S(a, 2)} mol; H₂ = (${S(ne, 4)} − ${S(2 * a, 2)})/2 = ${S(nH2, 4)} mol\n`
            : `  Vì ${S(ne, 4)} ≤ ${S(2 * a, 2)} nên catot mới chỉ có Cu bám ra:\n`
              + `  Cu = ${S(ne, 4)}/2 = ${S(nCu, 4)} mol; chưa có H₂\n`)
        + `Bước 3 — anot luôn là nước bị oxi hoá: O₂ = n<sub>e</sub>/4 = ${S(nO2, 4)} mol.\n`
        + `Bước 4 — khối lượng dung dịch giảm = khối lượng chất rời khỏi dung dịch:\n`
        + `  Δm = 64×${S(nCu, 4)} + 2×${S(nH2, 4)} + 32×${S(nO2, 4)} = ${D(dm, 3)} gam.`,
      meo: 'Luôn so n(electron) với 2·n(Cu²⁺) TRƯỚC. Vượt ngưỡng là bài đổi hẳn sang giai đoạn hai — '
        + 'đây chính là chỗ đề gài để phân loại điểm 9–10.'
    };
  } },

/* --- Mạ điện: hình học → khối lượng → Faraday --- */
{ ma: 'hoa-vdc-madien', chuong: 'Điện phân – Pin điện', muc: 4, dang: 'tln',
  tao(R) {
    const kl = R.chon([
      { t: 'nickel', kh: 'Ni', M: 58.7, n: 2, D: 8.9 },
      { t: 'chromium', kh: 'Cr', M: 52, n: 3, D: 7.2 },
      { t: 'copper', kh: 'Cu', M: 64, n: 2, D: 8.96 },
      { t: 'silver', kh: 'Ag', M: 108, n: 1, D: 10.5 }
    ]);
    const Scm = R.nguyen(2, 20) * 25;        /* cm² */
    const d = R.chon([5, 10, 15, 20, 25, 30]);  /* μm */
    const I = R.chon([1.5, 2, 2.5, 4, 5]);
    const H = R.chon([80, 85, 90, 95]);
    const m = Scm * d * 1e-4 * kl.D;         /* gam */
    const ne = m / kl.M * kl.n;
    const t = T(ne * 96500 / (I * H / 100), 0);
    return {
      q: `Mạ một lớp ${kl.t} dày ${S(d)} μm lên bề mặt kim loại có diện tích ${S(Scm)} cm² bằng phương pháp `
        + `điện phân với cường độ dòng điện ${S(I)} A, hiệu suất dòng điện ${S(H)}%. `
        + `Thời gian mạ là bao nhiêu giây? `
        + `(${kl.kh}: M = ${S(kl.M)}, khối lượng riêng ${S(kl.D)} g/cm³; F = 96500 C/mol; làm tròn đến hàng đơn vị)`,
      ans: D(t, 0),
      giai: `Bước 1 — thể tích lớp mạ: V = S·d = ${S(Scm)} cm² × ${S(d)}×10⁻⁴ cm = ${S(Scm * d * 1e-4, 5)} cm³.\n`
        + `Bước 2 — khối lượng ${kl.kh} cần bám: m = V·D = ${S(Scm * d * 1e-4, 5)} × ${S(kl.D)} = ${S(m, 4)} gam.\n`
        + `Bước 3 — ${kl.kh}<sup>${kl.n}+</sup> + ${kl.n}e → ${kl.kh}:\n`
        + `  n<sub>e</sub> = (${S(m, 4)}/${S(kl.M)}) × ${S(kl.n)} = ${S(ne, 5)} mol\n`
        + `Bước 4 — t = n<sub>e</sub>·F/(I·H) = ${S(ne, 5)}×96500/(${S(I)}×${S(H / 100)}) = ${D(t, 0)} giây.`,
      meo: '1 μm = 10⁻⁴ cm. Đổi sai đơn vị bề dày là lệch cả vạn lần — kiểm tra lại trước khi tô đáp án.'
    };
  } },

/* --- Chuẩn độ có pha loãng: hệ số pha loãng là chỗ gài --- */
{ ma: 'hoa-vdc-chuando', chuong: 'Đại cương hữu cơ', muc: 4, dang: 'tln',
  tao(R) {
    const Vg = R.chon([5, 10, 20, 25]);        /* mL giấm lấy ra */
    const Vb = R.chon([100, 200, 250]);        /* pha loãng thành */
    const Vh = R.chon([10, 20, 25]);           /* thể tích hút đi chuẩn độ */
    const C = R.chon([0.05, 0.1, 0.2]);
    const Vn = R.nguyen(40, 240) / 10;         /* mL NaOH */
    const Dg = 1.01;   /* khối lượng riêng của giấm; đặt tên khác D để không che hàm định dạng đáp án */
    const nPhan = C * Vn / 1000;
    const nTong = nPhan * (Vb / Vh);
    const pct = T(nTong * 60 / (Vg * Dg) * 100, 2);
    if (pct < 1 || pct > 15) return null;      /* giữ trong khoảng giấm ăn thật */
    return {
      q: `Để xác định hàm lượng acetic acid trong một mẫu giấm ăn, người ta lấy ${S(Vg)} mL giấm rồi pha loãng `
        + `thành ${S(Vb)} mL. Hút ${S(Vh)} mL dung dịch sau pha loãng đem chuẩn độ bằng dung dịch NaOH `
        + `${S(C)}M thì hết ${S(Vn, 1)} mL. Tính nồng độ phần trăm của CH₃COOH trong mẫu giấm ban đầu. `
        + `(giấm có D = 1,01 g/mL; CH₃COOH có M = 60; làm tròn đến hàng phần trăm)`,
      ans: D(pct, 2),
      giai: `Bước 1 — CH₃COOH + NaOH → CH₃COONa + H₂O, tỉ lệ 1 : 1.\n`
        + `  n(CH₃COOH) trong ${S(Vh)} mL = n(NaOH) = ${S(C)} × ${S(Vn / 1000, 4)} = ${S(nPhan, 5)} mol\n`
        + `Bước 2 — quy về toàn bộ ${S(Vb)} mL dung dịch loãng (hệ số pha loãng ${S(Vb)}/${S(Vh)} = ${S(Vb / Vh, 2)}):\n`
        + `  n(CH₃COOH) tổng = ${S(nPhan, 5)} × ${S(Vb / Vh, 2)} = ${S(nTong, 5)} mol\n`
        + `Bước 3 — khối lượng acid = ${S(nTong, 5)} × 60 = ${S(nTong * 60, 4)} gam;\n`
        + `  khối lượng giấm lấy ra = ${S(Vg)} × 1,01 = ${S(Vg * Dg, 2)} gam\n`
        + `Bước 4 — C% = ${S(nTong * 60, 4)}/${S(Vg * Dg, 2)} × 100 = ${D(pct, 2)}%.`,
      meo: 'Quên nhân hệ số pha loãng là lỗi mất trọn câu. Cứ thấy "pha loãng thành V mL rồi hút V′ mL" là phải nhân V/V′.'
    };
  } },

/* --- Độ dinh dưỡng phân bón: khái niệm dễ nhầm --- */
{ ma: 'hoa-vdc-phanbon', chuong: 'Phi kim – Vô cơ', muc: 4, dang: 'tln',
  tao(R) {
    const p = R.chon([
      { t: 'phân urea (NH₂)₂CO', M: 60, ngto: 'N', he: 28 / 60, dd: '%N' },
      { t: 'phân ammonium nitrate NH₄NO₃', M: 80, ngto: 'N', he: 28 / 80, dd: '%N' },
      { t: 'phân ammonium sulfate (NH₄)₂SO₄', M: 132, ngto: 'N', he: 28 / 132, dd: '%N' },
      { t: 'phân potassium chloride KCl', M: 74.5, ngto: 'K₂O', he: 94 / 149, dd: '%K₂O' }
    ]);
    const dt = R.nguyen(1, 20) * 5;        /* kg dưỡng chất cần cho ruộng */
    const tc = R.chon([90, 92, 95, 97, 98]);  /* độ tinh khiết của phân thương phẩm */
    const m = T(dt / (p.he * tc / 100), 2);
    return {
      q: `Một thửa ruộng cần bón ${S(dt)} kg ${p.ngto}. Trên thị trường có ${p.t} với độ tinh khiết ${S(tc)}%. `
        + `Cần mua bao nhiêu kilôgam phân này? `
        + `(N = 14; H = 1; C = 12; O = 16; S = 32; K = 39; Cl = 35,5; làm tròn đến hàng phần trăm)`,
      ans: D(m, 2),
      giai: `Bước 1 — độ dinh dưỡng (${p.dd}) của ${p.t} nguyên chất:\n`
        + `  ${S(p.he * 100, 2)}% — tức 100 kg phân nguyên chất chứa ${S(p.he * 100, 2)} kg ${p.ngto}.\n`
        + `Bước 2 — khối lượng phân NGUYÊN CHẤT cần: ${S(dt)} ÷ ${S(p.he, 4)} = ${S(dt / p.he, 2)} kg\n`
        + `Bước 3 — phân thương phẩm chỉ đạt ${S(tc)}% tinh khiết:\n`
        + `  m = ${S(dt / p.he, 2)} ÷ ${S(tc / 100)} = ${D(m, 2)} kg.`,
      meo: 'Độ dinh dưỡng đạm quy về %N, lân quy về %P₂O₅, kali quy về %K₂O — không phải phần trăm của cả phân tử muối.'
    };
  } },

/* --- Đốt cháy hỗn hợp ester no đơn hở: dùng bảo toàn nguyên tố O --- */
{ ma: 'hoa-vdc-dotester', chuong: 'Ester – Lipid', muc: 4, dang: 'tln',
  tao(R) {
    const n = R.nguyen(2, 5);
    const x = R.nguyen(2, 12) / 100, y = R.nguyen(2, 12) / 100;
    const nCO2 = T(x * n + y * (n + 1), 4);
    const nO2 = T(x * (3 * n - 2) / 2 + y * (3 * (n + 1) - 2) / 2, 4);
    const m = T(62 * nCO2 - 32 * nO2, 3);
    if (m <= 0) return null;
    return {
      q: `Đốt cháy hoàn toàn m gam hỗn hợp E gồm hai ester no, đơn chức, mạch hở là đồng đẳng kế tiếp, `
        + `cần vừa đủ ${S(nO2, 4)} mol O₂, thu được ${S(nCO2, 4)} mol CO₂. Giá trị của m là bao nhiêu? `
        + `(C = 12; H = 1; O = 16; làm tròn đến hàng phần nghìn)`,
      ans: D(m, 3),
      giai: `Bước 1 — ester no, đơn chức, mạch hở có dạng C<sub>n</sub>H<sub>2n</sub>O₂ ⇒ khi cháy `
        + `n(H₂O) = n(CO₂) = ${S(nCO2, 4)} mol.\n`
        + `Bước 2 — bảo toàn nguyên tố O:\n`
        + `  2·n(E) + 2·n(O₂) = 2·n(CO₂) + n(H₂O)\n`
        + `  2·n(E) = 2×${S(nCO2, 4)} + ${S(nCO2, 4)} − 2×${S(nO2, 4)} = ${S(3 * nCO2 - 2 * nO2, 4)}\n`
        + `  ⇒ n(E) = ${S((3 * nCO2 - 2 * nO2) / 2, 4)} mol\n`
        + `Bước 3 — bảo toàn khối lượng theo nguyên tố:\n`
        + `  m = 12·n(C) + 2·n(H₂O)·1 + 16·n(O trong E)\n`
        + `  m = 12×${S(nCO2, 4)} + 2×${S(nCO2, 4)} + 32×${S((3 * nCO2 - 2 * nO2) / 2, 4)} = ${D(m, 3)} gam.\n`
        + `Cách nhẩm nhanh: với ester no đơn hở luôn có m = 62·n(CO₂) − 32·n(O₂).`,
      meo: 'Ghi nhớ công thức tắt m = 62·n(CO₂) − 32·n(O₂) cho ester no đơn chức mạch hở — '
        + 'suy ra từ bảo toàn O, tiết kiệm được cả phút trong phòng thi.'
    };
  } },

/* --- Câu đúng/sai vận dụng cao: pin điện & ăn mòn --- */
{ ma: 'hoa-vdc-ds-pin', chuong: 'Điện phân – Pin điện', muc: 4, dang: 'ds',
  tao(R) {
    const c = R.chon([
      { a: 'Zn', ea: -0.76, b: 'Cu', eb: 0.34 },
      { a: 'Zn', ea: -0.76, b: 'Ag', eb: 0.80 },
      { a: 'Fe', ea: -0.44, b: 'Cu', eb: 0.34 },
      { a: 'Mg', ea: -2.37, b: 'Zn', eb: -0.76 },
      { a: 'Fe', ea: -0.44, b: 'Ag', eb: 0.80 }
    ]);
    const E = T(c.eb - c.ea, 2);
    const kho = [
      { t: `Sức điện động chuẩn của pin bằng ${S(E)} V.`, a: true,
        v: `E°<sub>pin</sub> = E°(catot) − E°(anot) = ${S(c.eb)} − (${S(c.ea)}) = ${S(E)} V.` },
      { t: `Điện cực ${c.a} là cực âm và bị ăn mòn dần trong quá trình pin hoạt động.`, a: true,
        v: `${c.a} có thế điện cực nhỏ hơn nên đóng vai trò anot, bị oxi hoá: ${c.a} → ${c.a}²⁺ + 2e.` },
      { t: `Electron đi từ điện cực ${c.b} sang điện cực ${c.a} qua dây dẫn ngoài.`, a: false,
        v: `Ngược chiều. Electron luôn đi từ anot (${c.a}, cực âm) sang catot (${c.b}, cực dương).` },
      { t: `Khối lượng điện cực ${c.b} tăng lên khi pin phóng điện.`, a: true,
        v: `Tại catot ${c.b} xảy ra sự khử ion ${c.b}ⁿ⁺ thành kim loại bám vào điện cực.` },
      { t: `Nếu nối trực tiếp hai thanh ${c.a} và ${c.b} rồi nhúng vào dung dịch chất điện li thì ${c.b} bị ăn mòn trước.`, a: false,
        v: `Trong ăn mòn điện hoá, kim loại HOẠT ĐỘNG HƠN (${c.a}) mới bị ăn mòn trước. Đây là nguyên lí bảo vệ vỏ tàu bằng khối kẽm.` },
      { t: `Sức điện động chuẩn của pin dương chứng tỏ phản ứng trong pin tự xảy ra.`, a: true,
        v: `E°<sub>pin</sub> > 0 ⇔ ΔG° < 0 ⇔ phản ứng tự diễn biến theo chiều đã viết.` },
      { t: `Cầu muối trong pin có tác dụng dẫn electron giữa hai nửa pin.`, a: false,
        v: `Cầu muối dẫn ION để trung hoà điện tích, không dẫn electron. Electron chỉ đi qua dây dẫn ngoài.` },
      { t: `Nếu thay ${c.b} bằng một kim loại có thế điện cực chuẩn lớn hơn thì sức điện động của pin tăng.`, a: true,
        v: `E°<sub>pin</sub> = E°(catot) − E°(anot); tăng E° của catot thì hiệu số tăng.` }
    ];
    return TD.dsTu(R, `Thiết lập pin Galvani ${c.a}–${c.b} ở điều kiện chuẩn, biết `
      + `E°(${c.a}<sup>n+</sup>/${c.a}) = ${S(c.ea)} V và E°(${c.b}<sup>n+</sup>/${c.b}) = ${S(c.eb)} V. `
      + `Xét tính đúng/sai của các phát biểu sau:`, kho,
      'Nhớ một câu: "Anot Âm — Oxi hoá; Catot dương — Khử". Đúng cho pin điện; điện phân thì dấu điện cực ngược lại.');
  } }

]);

/* ==========================================================
   VẬT LÍ — VẬN DỤNG CAO
   ========================================================== */
TD.GEN.ly = (TD.GEN.ly || []).concat([

/* --- Làm lạnh nước thành đá: ba chặng nhiệt + công suất --- */
{ ma: 'ly-vdc-lamlanh', chuong: 'Vật lí nhiệt', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const m = R.chon([0.5, 1, 1.5, 2, 2.5, 3]);
    const t1 = R.chon([15, 20, 25, 30]);
    const t2 = R.chon([5, 10, 15, 18, 20]);
    const tau = R.chon([30, 45, 60, 70, 90, 120]);   /* phút */
    const Q1 = m * 4200 * t1, Q2 = m * 3.34e5, Q3 = m * 2100 * t2;
    const P = T((Q1 + Q2 + Q3) / (tau * 60), 1);
    return {
      q: `Một tủ lạnh làm ${S(m)} kg nước ở ${S(t1)} °C đông thành nước đá ở −${S(t2)} °C trong ${S(tau)} phút. `
        + `Coi toàn bộ nhiệt lượng lấy ra chỉ dùng cho lượng nước này. Công suất làm lạnh của tủ bằng bao nhiêu watt? `
        + `(nước: c = 4200 J/(kg·K); nước đá: c = 2100 J/(kg·K); nhiệt nóng chảy riêng của nước đá `
        + `λ = 3,34·10⁵ J/kg; làm tròn đến hàng phần mười)`,
      ans: D(P, 1),
      giai: `Chia làm ba chặng — vẽ trục nhiệt độ ra là thấy ngay:\n`
        + `  ① Hạ nước từ ${S(t1)} °C xuống 0 °C: Q₁ = m·c·Δt = ${S(m)}×4200×${S(t1)} = ${S(Q1)} J\n`
        + `  ② Nước đông đặc ở 0 °C (nhiệt độ KHÔNG đổi): Q₂ = λ·m = 3,34·10⁵×${S(m)} = ${S(Q2)} J\n`
        + `  ③ Hạ nước đá từ 0 °C xuống −${S(t2)} °C: Q₃ = m·c<sub>đá</sub>·Δt = ${S(m)}×2100×${S(t2)} = ${S(Q3)} J\n`
        + `Tổng nhiệt phải lấy đi: Q = ${S(Q1 + Q2 + Q3)} J.\n`
        + `Công suất: P = Q/t = ${S(Q1 + Q2 + Q3)} / (${S(tau)}×60) = ${D(P, 1)} W.`,
      meo: 'Bỏ sót chặng đông đặc (λm) là lỗi phổ biến nhất — mà chặng đó thường chiếm phần lớn nhiệt lượng. '
        + 'Cứ thấy đề vượt qua mốc 0 °C hoặc 100 °C là phải chèn thêm một chặng chuyển thể.'
    };
  } },

/* --- Ấm điện: đun sôi rồi hoá hơi một phần --- */
{ ma: 'ly-vdc-amdien', chuong: 'Vật lí nhiệt', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const P = R.chon([1000, 1200, 1500, 1800, 2000, 2200]);
    const m = R.chon([0.5, 1, 1.5, 2, 2.5]);
    const t1 = R.chon([20, 25, 30]);
    const x = R.chon([0.05, 0.1, 0.15, 0.2]);      /* kg nước hoá hơi */
    const H = R.chon([70, 80, 85, 90]);
    const Q = m * 4200 * (100 - t1) + x * 2.26e6;
    const t = T(Q / (P * H / 100), 1);
    return {
      q: `Một ấm điện công suất ${S(P)} W có hiệu suất ${S(H)}% được dùng để đun ${S(m)} kg nước từ ${S(t1)} °C `
        + `đến khi sôi và làm bay hơi ${S(x)} kg nước. Thời gian đun là bao nhiêu giây? `
        + `(c<sub>nước</sub> = 4200 J/(kg·K); nhiệt hoá hơi riêng L = 2,26·10⁶ J/kg; làm tròn đến hàng phần mười)`,
      ans: D(t, 1),
      giai: `Bước 1 — đun nóng tới 100 °C: Q₁ = ${S(m)}×4200×(100 − ${S(t1)}) = ${S(m * 4200 * (100 - t1))} J\n`
        + `Bước 2 — hoá hơi ${S(x)} kg ở 100 °C: Q₂ = L·x = 2,26·10⁶×${S(x)} = ${S(x * 2.26e6)} J\n`
        + `Bước 3 — tổng nhiệt CÓ ÍCH: Q = ${S(Q)} J\n`
        + `Bước 4 — ấm chỉ đạt hiệu suất ${S(H)}% nên công suất có ích là ${S(P)}×${S(H / 100)} = ${S(P * H / 100)} W\n`
        + `  t = ${S(Q)} / ${S(P * H / 100)} = ${D(t, 1)} giây.`,
      meo: 'Nhiệt hoá hơi riêng của nước lớn gấp gần 7 lần nhiệt nóng chảy — chỉ bay hơi vài lạng nước '
        + 'đã tốn nhiều năng lượng hơn cả việc đun cả ấm từ nguội tới sôi.'
    };
  } },

/* --- Bình khí rò rỉ: dùng pV = nRT hai lần --- */
{ ma: 'ly-vdc-binhkhi', chuong: 'Khí lí tưởng', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const p1 = R.nguyen(6, 20);              /* bar */
    const t1 = R.chon([17, 27, 37, 47]);
    const p2 = R.nguyen(2, p1 - 2);
    const t2 = R.chon([7, 17, 27, 37, 57]);
    const T1 = t1 + 273, T2 = t2 + 273;
    const ti = (p2 / T2) / (p1 / T1);
    if (ti >= 1) return null;
    const pct = T((1 - ti) * 100, 2);
    return {
      q: `Một bình thép dung tích không đổi chứa khí ở áp suất ${S(p1)} bar, nhiệt độ ${S(t1)} °C. `
        + `Sau một thời gian bình bị rò rỉ, áp suất còn ${S(p2)} bar và nhiệt độ lúc này là ${S(t2)} °C. `
        + `Bao nhiêu phần trăm khối lượng khí đã thoát ra khỏi bình? (làm tròn đến hàng phần trăm)`,
      ans: D(pct, 2),
      giai: `Bước 1 — thể tích bình không đổi, dùng pV = nRT ⇒ n = pV/(RT), tức n ∝ p/T.\n`
        + `  Đổi Kelvin: T₁ = ${S(t1)} + 273 = ${S(T1)} K; T₂ = ${S(t2)} + 273 = ${S(T2)} K\n`
        + `Bước 2 — tỉ lệ khí còn lại:\n`
        + `  n₂/n₁ = (p₂/T₂)/(p₁/T₁) = (${S(p2)}/${S(T2)}) ÷ (${S(p1)}/${S(T1)}) = ${S(ti, 4)}\n`
        + `Bước 3 — phần trăm khí đã thoát:\n`
        + `  (1 − ${S(ti, 4)}) × 100 = ${D(pct, 2)}%.`,
      meo: 'Bài rò rỉ khí thì SỐ MOL thay đổi nên không được dùng p₁V₁/T₁ = p₂V₂/T₂ (công thức đó chỉ đúng khi n không đổi). '
        + 'Phải quay về pV = nRT.'
    };
  } },

/* --- Định tuổi bằng đồng vị phóng xạ --- */
{ ma: 'ly-vdc-dinhtuoi', chuong: 'Vật lí hạt nhân', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const dv = R.chon([
      { t: '¹⁴C', T: 5730, dv: 'năm', vat: 'mẫu gỗ khảo cổ' },
      { t: '²³⁸U', T: 4.5e9, dv: 'năm', vat: 'mẫu quặng' },
      { t: '⁴⁰K', T: 1.3e9, dv: 'năm', vat: 'mẫu đá núi lửa' }
    ]);
    const kieu = R.nguyen(0, 1);
    const pc = R.nguyen(10, 90);                    /* % còn lại */
    const tiCon = R.nguyen(1, 30) / 10;             /* hạt con / hạt mẹ */
    let de, ti, buoc;
    if (kieu === 0) {
      ti = pc / 100;
      de = `Độ phóng xạ của ${dv.vat} chỉ còn ${S(pc)}% so với một mẫu cùng loại còn sống (hoặc mới hình thành).`;
      buoc = `  Độ phóng xạ H tỉ lệ với số hạt nhân N, nên N/N₀ = ${S(pc)}% = ${S(ti, 4)}.\n`;
    } else {
      ti = 1 / (1 + tiCon);
      de = `Trong ${dv.vat}, tỉ lệ số hạt nhân con sinh ra so với số hạt nhân ${dv.t} còn lại là ${S(tiCon, 1)}.`;
      buoc = `  Cứ 1 hạt mẹ phân rã thì sinh 1 hạt con ⇒ N₀ = N + N<sub>con</sub> = N(1 + ${S(tiCon, 1)}).\n`
           + `  Vậy N/N₀ = 1/(1 + ${S(tiCon, 1)}) = ${S(ti, 4)}.\n`;
    }
    const tuoi = dv.T * Math.log(1 / ti) / Math.LN2;
    const kq = dv.T > 1e6 ? T(tuoi / 1e9, 3) : T(tuoi, 0);
    const donvi = dv.T > 1e6 ? 'tỉ năm' : 'năm';
    return {
      q: `${dv.t} có chu kì bán rã T = ${dv.T > 1e6 ? S(dv.T / 1e9) + '·10⁹' : S(dv.T)} năm. ${de} `
        + `Tuổi của mẫu vật là bao nhiêu ${donvi}? (làm tròn đến hàng ${dv.T > 1e6 ? 'phần nghìn' : 'đơn vị'})`,
      ans: D(kq, dv.T > 1e6 ? 3 : 0),
      giai: `Bước 1 — lập tỉ số hạt nhân còn lại:\n${buoc}`
        + `Bước 2 — định luật phóng xạ N = N₀·2^(−t/T) ⇒ 2^(−t/T) = ${S(ti, 4)}\n`
        + `  ⇒ t = T·log₂(1/${S(ti, 4)}) = ${dv.T > 1e6 ? S(dv.T / 1e9) + '·10⁹' : S(dv.T)} × ${S(Math.log(1 / ti) / Math.LN2, 4)}\n`
        + `Bước 3 — t ≈ ${D(kq, dv.T > 1e6 ? 3 : 0)} ${donvi}.`,
      meo: 'Tỉ số hạt CON trên hạt MẸ bằng 2^(t/T) − 1, không phải 2^(t/T). Nhớ trừ 1 là qua được bẫy quen nhất của dạng này.'
    };
  } },

/* --- Nhà máy điện hạt nhân: MeV → J → khối lượng nhiên liệu --- */
{ ma: 'ly-vdc-nhamayhn', chuong: 'Vật lí hạt nhân', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const P = R.chon([100, 200, 400, 500, 600, 1000]);   /* MW điện */
    const H = R.chon([25, 30, 32, 35, 40]);
    const ngay = R.chon([1, 7, 30, 100, 365]);
    const Q = P * 1e6 * ngay * 86400 / (H / 100);        /* J nhiệt cần */
    const E1 = 200 * 1.6e-13;                            /* J mỗi phân hạch */
    const soHat = Q / E1;
    const m = T(soHat / 6.022e23 * 235 / 1000, 3);       /* kg */
    return {
      q: `Một nhà máy điện hạt nhân có công suất điện ${S(P)} MW, hiệu suất chuyển hoá nhiệt thành điện ${S(H)}%. `
        + `Mỗi phân hạch ²³⁵U toả ra 200 MeV. Trong ${S(ngay)} ngày hoạt động liên tục, nhà máy tiêu thụ bao nhiêu `
        + `kilôgam ²³⁵U? (1 MeV = 1,6·10⁻¹³ J; N<sub>A</sub> = 6,022·10²³; làm tròn đến hàng phần nghìn)`,
      ans: D(m, 3),
      giai: `Bước 1 — điện năng sản ra: A = P·t = ${S(P)}·10⁶ × ${S(ngay)} × 86400 = ${S(P * 1e6 * ngay * 86400, 0)} J\n`
        + `Bước 2 — hiệu suất ${S(H)}% ⇒ nhiệt lượng phân hạch phải cung cấp:\n`
        + `  Q = A ÷ ${S(H / 100)} = ${S(Q, 0)} J\n`
        + `Bước 3 — năng lượng mỗi phân hạch: 200 MeV = 200 × 1,6·10⁻¹³ = 3,2·10⁻¹¹ J\n`
        + `  Số hạt ²³⁵U đã phân hạch: N = ${S(Q, 0)} ÷ 3,2·10⁻¹¹ = ${S(soHat, 0)}\n`
        + `Bước 4 — m = (N/N<sub>A</sub>)·235 = ${S(soHat / 6.022e23, 4)} mol × 235 = ${S(soHat / 6.022e23 * 235, 2)} g = ${D(m, 3)} kg.`,
      meo: 'So sánh cho thấm: 1 kg ²³⁵U cho năng lượng tương đương khoảng 2 500 tấn than. '
        + 'Đó là lí do năng lượng hạt nhân có mật độ năng lượng vượt trội.'
    };
  } },

/* --- Truyền tải điện năng: hai trạng thái điện áp --- */
{ ma: 'ly-vdc-truyentai', chuong: 'Từ trường', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const P = R.chon([100, 200, 500, 1000, 2000]);   /* kW */
    const U1 = R.chon([2, 5, 10, 20]);               /* kV */
    const H1 = R.chon([80, 85, 90, 92]);             /* % hiệu suất ban đầu */
    const H2 = R.chon([95, 96, 97, 98, 99]);
    if (H2 <= H1) return null;
    /* ΔP = P²R/U² ⇒ (1−H) ∝ 1/U² ⇒ U2 = U1·√((1−H1)/(1−H2)) */
    const U2 = T(U1 * Math.sqrt((1 - H1 / 100) / (1 - H2 / 100)), 3);
    return {
      q: `Điện năng ${S(P)} kW được truyền đi xa bằng đường dây có điện trở không đổi, hệ số công suất bằng 1. `
        + `Khi điện áp nơi phát là ${S(U1)} kV thì hiệu suất truyền tải đạt ${S(H1)}%. `
        + `Muốn hiệu suất truyền tải đạt ${S(H2)}% thì điện áp nơi phát phải bằng bao nhiêu kV? `
        + `(làm tròn đến hàng phần nghìn)`,
      ans: D(U2, 3),
      giai: `Bước 1 — công suất hao phí ΔP = P²R/(U²cos²φ), với P, R, cosφ không đổi ⇒ ΔP ∝ 1/U².\n`
        + `Bước 2 — hiệu suất H = 1 − ΔP/P ⇒ phần hao phí (1 − H) cũng tỉ lệ nghịch với U²:\n`
        + `  (1 − H₁)/(1 − H₂) = U₂²/U₁²\n`
        + `Bước 3 — thay số: (1 − ${S(H1 / 100)})/(1 − ${S(H2 / 100)}) = ${S((1 - H1 / 100) / (1 - H2 / 100), 4)}\n`
        + `  U₂ = ${S(U1)} × √${S((1 - H1 / 100) / (1 - H2 / 100), 4)} = ${D(U2, 3)} kV.`,
      meo: 'Đừng lập tỉ lệ với H mà phải lập tỉ lệ với (1 − H) — chính phần HAO PHÍ mới tỉ lệ nghịch với U². '
        + 'Nhầm chỗ này là ra đáp án sai mà vẫn thấy "hợp lí".'
    };
  } },

/* --- Năng lượng phản ứng hạt nhân từ năng lượng liên kết riêng --- */
{ ma: 'ly-vdc-nlpu', chuong: 'Vật lí hạt nhân', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const A1 = R.nguyen(2, 4), e1 = R.nguyen(10, 40) / 10;      /* hạt nhẹ tham gia */
    const A2 = R.nguyen(2, 4), e2 = R.nguyen(10, 40) / 10;
    const A3 = A1 + A2 - 1, e3 = R.nguyen(60, 88) / 10;         /* sản phẩm bền hơn */
    if (A3 < 3) return null;
    const dE = T(A3 * e3 - (A1 * e1 + A2 * e2), 3);
    if (dE <= 0) return null;
    return {
      q: `Xét phản ứng hạt nhân X + Y → Z + n, trong đó X có số khối ${S(A1)} và năng lượng liên kết riêng `
        + `${S(e1, 1)} MeV/nucleon; Y có số khối ${S(A2)} và năng lượng liên kết riêng ${S(e2, 1)} MeV/nucleon; `
        + `Z có số khối ${S(A3)} và năng lượng liên kết riêng ${S(e3, 1)} MeV/nucleon. Hạt neutron có năng lượng `
        + `liên kết bằng 0. Phản ứng toả ra bao nhiêu MeV? (làm tròn đến hàng phần nghìn)`,
      ans: D(dE, 3),
      giai: `Bước 1 — năng lượng liên kết của một hạt nhân = ε × A:\n`
        + `  W(X) = ${S(A1)} × ${S(e1, 1)} = ${S(A1 * e1, 2)} MeV\n`
        + `  W(Y) = ${S(A2)} × ${S(e2, 1)} = ${S(A2 * e2, 2)} MeV\n`
        + `  W(Z) = ${S(A3)} × ${S(e3, 1)} = ${S(A3 * e3, 2)} MeV; W(n) = 0\n`
        + `Bước 2 — năng lượng toả ra = tổng năng lượng liên kết SAU trừ TRƯỚC:\n`
        + `  ΔE = ${S(A3 * e3, 2)} − (${S(A1 * e1, 2)} + ${S(A2 * e2, 2)}) = ${D(dE, 3)} MeV.\n`
        + `Kết quả dương ⇒ phản ứng toả năng lượng, sản phẩm bền vững hơn các hạt ban đầu.`,
      meo: 'Với năng lượng LIÊN KẾT thì lấy sau trừ trước; với KHỐI LƯỢNG thì lấy trước trừ sau. '
        + 'Hai công thức ngược chiều nhau nhưng cùng cho một kết quả.'
    };
  } },

/* --- Thả kim loại nóng vào nước đá: hai kịch bản --- */
{ ma: 'ly-vdc-thakimloai', chuong: 'Vật lí nhiệt', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const kl = R.chon([
      { t: 'đồng', c: 380 }, { t: 'nhôm', c: 880 }, { t: 'sắt', c: 460 }, { t: 'chì', c: 130 }
    ]);
    const mk = R.nguyen(2, 10) / 10;          /* kg kim loại */
    const tk = R.chon([100, 150, 200, 250, 300]);
    const md = R.nguyen(1, 8) / 10;           /* kg nước đá ở 0 °C */
    const Qtoa = mk * kl.c * tk;              /* toả khi hạ về 0 °C */
    const Qtan = md * 3.34e5;                 /* cần để tan hết đá */
    if (Qtoa >= Qtan) return null;            /* giữ kịch bản đá chưa tan hết */
    const mTan = T(Qtoa / 3.34e5, 4);
    return {
      q: `Thả một miếng ${kl.t} khối lượng ${S(mk)} kg đang ở ${S(tk)} °C vào một bình chứa ${S(md)} kg `
        + `nước đá ở 0 °C. Bỏ qua hao phí nhiệt ra môi trường và nhiệt dung của bình. `
        + `Khối lượng nước đá đã tan là bao nhiêu kilôgam? `
        + `(c<sub>${kl.t}</sub> = ${S(kl.c)} J/(kg·K); λ = 3,34·10⁵ J/kg; làm tròn đến hàng phần vạn)`,
      ans: D(mTan, 4),
      giai: `Bước 1 — kiểm tra kịch bản trước đã. Nhiệt lượng miếng ${kl.t} toả ra khi hạ xuống 0 °C:\n`
        + `  Q<sub>toả</sub> = m·c·Δt = ${S(mk)}×${S(kl.c)}×${S(tk)} = ${S(Qtoa)} J\n`
        + `  Nhiệt cần để tan HẾT ${S(md)} kg đá: Q<sub>tan hết</sub> = λ·m = 3,34·10⁵×${S(md)} = ${S(Qtan)} J\n`
        + `Bước 2 — vì ${S(Qtoa)} J < ${S(Qtan)} J nên đá CHƯA tan hết. Hỗn hợp dừng ở 0 °C, `
        + `toàn bộ nhiệt do kim loại toả ra chỉ dùng để làm tan đá.\n`
        + `Bước 3 — m<sub>tan</sub> = Q<sub>toả</sub>/λ = ${S(Qtoa)} / 3,34·10⁵ = ${D(mTan, 4)} kg.`,
      meo: 'Luôn SO SÁNH trước khi lập phương trình cân bằng nhiệt. Nếu đá chưa tan hết thì nhiệt độ cuối là 0 °C '
        + '— viết phương trình m₁c₁(t₁−t) = m₂c₂(t−t₂) ở đây là sai ngay từ đầu.'
    };
  } },

/* --- Câu đúng/sai vận dụng cao: đồ thị đun nóng chất --- */
{ ma: 'ly-vdc-ds-nhiet', chuong: 'Vật lí nhiệt', muc: 4, dang: 'ds',
  tao(R) {
    const P = R.chon([500, 800, 1000, 1200]);
    const m = R.chon([0.2, 0.5, 1]);
    const t1 = R.nguyen(2, 8) * 60;                /* giây đoạn nghiêng đầu */
    const t2 = R.nguyen(5, 15) * 60;              /* giây đoạn nằm ngang */
    const c = T(P * t1 / (m * 100), 0);           /* J/(kg·K) nếu tăng 100 K */
    const L = T(P * t2 / m, 0);
    const kho = [
      { t: `Đoạn nằm ngang của đồ thị ứng với giai đoạn chất đang chuyển thể.`, a: true,
        v: `Nhiệt độ không đổi dù vẫn nhận nhiệt — toàn bộ nhiệt lượng dùng để phá vỡ liên kết giữa các phân tử.` },
      { t: `Trong đoạn nằm ngang, chất không nhận thêm nhiệt lượng nào từ nguồn.`, a: false,
        v: `Vẫn nhận nhiệt đều đặn ${S(P)} J mỗi giây; nhiệt đó chuyển thành thế năng tương tác chứ không thành động năng phân tử.` },
      { t: `Nhiệt dung riêng của chất trong giai đoạn đầu bằng ${S(c)} J/(kg·K).`, a: true,
        v: `c = P·t/(m·Δt) = ${S(P)}×${S(t1)}/(${S(m)}×100) = ${S(c)} J/(kg·K).` },
      { t: `Nhiệt chuyển thể riêng của chất bằng ${S(L)} J/kg.`, a: true,
        v: `L = P·t/m = ${S(P)}×${S(t2)}/${S(m)} = ${S(L)} J/kg.` },
      { t: `Nếu tăng gấp đôi khối lượng chất mà giữ nguyên công suất thì đoạn nằm ngang dài gấp đôi.`, a: true,
        v: `Q = L·m tăng gấp đôi trong khi công suất không đổi nên thời gian tăng gấp đôi.` },
      { t: `Nếu dùng nguồn có công suất lớn hơn thì nhiệt độ chuyển thể của chất sẽ cao hơn.`, a: false,
        v: `Nhiệt độ chuyển thể là hằng số của chất ở áp suất cho trước, không phụ thuộc công suất nguồn. Chỉ có thời gian chuyển thể ngắn lại.` },
      { t: `Độ dốc của đồ thị trong giai đoạn đầu càng lớn thì nhiệt dung riêng của chất càng nhỏ.`, a: true,
        v: `Độ dốc Δt/Δτ = P/(m·c); c nhỏ thì độ dốc lớn — chất nóng lên nhanh hơn.` },
      { t: `Nội năng của chất không đổi trong suốt đoạn nằm ngang vì nhiệt độ không đổi.`, a: false,
        v: `Nội năng vẫn TĂNG: phần thế năng tương tác phân tử tăng lên dù động năng (ứng với nhiệt độ) giữ nguyên.` }
    ];
    return TD.dsTu(R, `Dùng một nguồn nhiệt công suất không đổi ${S(P)} W đun ${S(m)} kg một chất. `
      + `Đồ thị nhiệt độ theo thời gian gồm một đoạn đi lên (chất tăng thêm 100 °C trong ${S(t1)} giây), `
      + `rồi một đoạn nằm ngang kéo dài ${S(t2)} giây. Bỏ qua mọi hao phí. Xét các phát biểu sau:`, kho,
      'Đồ thị nhiệt độ – thời gian: đoạn NGHIÊNG là mcΔt, đoạn NGANG là λm hoặc Lm. '
      + 'Đọc được hai đoạn đó là giải được mọi câu của dạng này.');
  } }

]);

/* ==========================================================
   TOÁN — VẬN DỤNG CAO
   Bám đúng kiểu phần III đề thật: lời dẫn dài, gắn bối cảnh,
   phải qua 3–4 bước mới ra đáp số.
   ========================================================== */
TD.GEN.toan = (TD.GEN.toan || []).concat([

{ ma: 'toan-vdc-hop', chuong: 'GTLN – GTNN', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const a = R.nguyen(10, 30) * 2, b = a + R.nguyen(0, 20) * 2;
    /* V(x) = x(a−2x)(b−2x); V'(x) = 12x² − 4(a+b)x + ab = 0 */
    const x = ((a + b) - Math.sqrt(a * a - a * b + b * b)) / 6;
    const V = T(x * (a - 2 * x) * (b - 2 * x), 2);
    return {
      q: `Từ một tấm tôn hình chữ nhật kích thước ${S(a)} cm × ${S(b)} cm, người thợ cắt bỏ bốn hình vuông `
        + `bằng nhau ở bốn góc rồi gấp các mép lên để được một chiếc hộp không nắp. `
        + `Thể tích lớn nhất của chiếc hộp là bao nhiêu cm³? (làm tròn đến hàng phần trăm)`,
      ans: D(V, 2),
      giai: `Bước 1 — gọi cạnh hình vuông cắt đi là x (0 < x < ${S(a / 2)}). `
        + `Hộp có đáy (${S(a)} − 2x) × (${S(b)} − 2x), chiều cao x:\n`
        + `  V(x) = x(${S(a)} − 2x)(${S(b)} − 2x)\n`
        + `Bước 2 — đạo hàm: V′(x) = 12x² − 4·${S(a + b)}·x + ${S(a * b)}\n`
        + `Bước 3 — giải V′(x) = 0, lấy nghiệm thoả 0 < x < ${S(a / 2)}:\n`
        + `  x = [(${S(a)} + ${S(b)}) − √(${S(a)}² − ${S(a)}·${S(b)} + ${S(b)}²)]/6 = ${S(x, 4)} cm\n`
        + `Bước 4 — thay lại: V = ${S(x, 4)} × ${S(a - 2 * x, 4)} × ${S(b - 2 * x, 4)} = ${D(V, 2)} cm³.`,
      meo: 'Dạng tối ưu thực tế: ① đặt ẩn kèm ĐIỀU KIỆN ② lập hàm ③ đạo hàm ④ loại nghiệm ngoài điều kiện. '
        + 'Bước ④ hay bị quên — phương trình bậc hai luôn cho hai nghiệm mà chỉ một nghiệm dùng được.'
    };
  } },

{ ma: 'toan-vdc-betru', chuong: 'GTLN – GTNN', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const V = R.nguyen(5, 60) / 10;
    const r = Math.pow(V / Math.PI, 1 / 3);
    const hoiR = R.nguyen(0, 1);
    const Smin = 3 * Math.PI * r * r;
    return {
      q: `Một xưởng cần làm chiếc thùng hình trụ KHÔNG NẮP bằng tôn, thể tích ${S(V, 1)} m³. `
        + `Để tốn ít tôn nhất thì ${hoiR ? 'bán kính đáy' : 'diện tích tôn cần dùng'} bằng bao nhiêu `
        + `${hoiR ? 'mét' : 'mét vuông'}? (làm tròn đến hàng phần nghìn)`,
      ans: D(hoiR ? r : Smin, 3),
      giai: `Bước 1 — gọi bán kính đáy r, chiều cao h. Thể tích πr²h = ${S(V, 1)} ⇒ h = ${S(V, 1)}/(πr²).\n`
        + `Bước 2 — thùng KHÔNG nắp nên chỉ có một đáy và mặt xung quanh:\n`
        + `  S = πr² + 2πrh = πr² + 2·${S(V, 1)}/r\n`
        + `Bước 3 — S′ = 2πr − 2·${S(V, 1)}/r² = 0 ⇒ r³ = ${S(V, 1)}/π ⇒ r = ${S(r, 5)} m\n`
        + `Bước 4 — khi đó h = r và S<sub>min</sub> = 3πr² = ${S(Smin, 4)} m²\n`
        + `Đáp án: ${D(hoiR ? r : Smin, 3)} ${hoiR ? 'm' : 'm²'}.`,
      meo: 'Kết quả đẹp cần nhớ: thùng trụ KHÔNG nắp tốn ít vật liệu nhất khi h = r, khi đó S = 3πr². '
        + 'Thùng CÓ nắp thì h = 2r. Nhớ hai kết quả này để kiểm tra lại ngay.'
    };
  } },

{ ma: 'toan-vdc-tragop', chuong: 'Mũ – Logarit', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const P = R.nguyen(3, 20) * 100;
    const nam = R.chon([1, 2, 3, 5]);
    const n = nam * 12;
    const r = R.chon([0.6, 0.7, 0.8, 0.9, 1.0]) / 100;
    const m = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    return {
      q: `Anh Nam vay ngân hàng ${S(P)} triệu đồng, lãi suất ${S(r * 100, 1)}%/tháng theo hình thức lãi kép, `
        + `trả góp đều đặn vào cuối mỗi tháng trong ${S(nam)} năm thì hết nợ. `
        + `Mỗi tháng anh phải trả bao nhiêu triệu đồng? (làm tròn đến hàng phần nghìn)`,
      ans: D(m, 3),
      giai: `Bước 1 — đổi thời hạn ra tháng: n = ${S(nam)} × 12 = ${S(n)} tháng.\n`
        + `Bước 2 — công thức trả góp đều: m = P·r·(1+r)ⁿ / [(1+r)ⁿ − 1]\n`
        + `Bước 3 — (1 + ${S(r, 3)})^${S(n)} = ${S(Math.pow(1 + r, n), 6)}\n`
        + `Bước 4 — m = ${S(P)} × ${S(r, 3)} × ${S(Math.pow(1 + r, n), 6)} / (${S(Math.pow(1 + r, n), 6)} − 1) = ${D(m, 3)} triệu đồng.\n`
        + `Tổng phải trả sau ${S(nam)} năm là ${S(m * n, 2)} triệu, tức tiền lãi ${S(m * n - P, 2)} triệu.`,
      meo: 'Ba công thức khác nhau: GỬI một lần A = P(1+r)ⁿ · GỬI GÓP đều · TRẢ GÓP đều. '
        + 'Đề luôn cho lãi theo THÁNG còn thời hạn theo NĂM — nhớ đổi n ra tháng.'
    };
  } },

{ ma: 'toan-vdc-bayes3', chuong: 'Xác suất có điều kiện', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const p1 = R.nguyen(2, 5) * 10, p2 = R.nguyen(2, 5) * 10;
    const p3 = 100 - p1 - p2;
    if (p3 < 10) return null;
    const d1 = R.nguyen(1, 6), d2 = R.nguyen(1, 6), d3 = R.nguyen(1, 6);
    if (d1 === d2 && d2 === d3) return null;
    const P = (p1 * d1 + p2 * d2 + p3 * d3) / 10000;
    const hau = (p1 * d1 / 10000) / P;
    return {
      q: `Một cửa hàng nhập bóng đèn từ ba nhà máy A, B, C với tỉ lệ lần lượt ${S(p1)}%, ${S(p2)}%, ${S(p3)}%. `
        + `Tỉ lệ bóng hỏng của ba nhà máy lần lượt là ${S(d1)}%, ${S(d2)}%, ${S(d3)}%. `
        + `Lấy ngẫu nhiên một bóng thì thấy nó bị hỏng. Xác suất bóng đó do nhà máy A sản xuất là bao nhiêu? `
        + `(làm tròn đến hàng phần vạn)`,
      ans: D(hau, 4),
      giai: `Bước 1 — xác suất toàn phần lấy được bóng hỏng:\n`
        + `  P(H) = ${S(p1 / 100, 2)}×${S(d1 / 100, 2)} + ${S(p2 / 100, 2)}×${S(d2 / 100, 2)} + ${S(p3 / 100, 2)}×${S(d3 / 100, 2)} = ${S(P, 6)}\n`
        + `Bước 2 — xác suất bóng vừa do A sản xuất vừa hỏng:\n`
        + `  P(A ∩ H) = ${S(p1 / 100, 2)} × ${S(d1 / 100, 2)} = ${S(p1 * d1 / 10000, 6)}\n`
        + `Bước 3 — Bayes: P(A|H) = P(A ∩ H)/P(H) = ${S(p1 * d1 / 10000, 6)} / ${S(P, 6)} = ${D(hau, 4)}.`,
      meo: 'Vẽ SƠ ĐỒ HÌNH CÂY: nhánh 1 là nguyên nhân (nhà máy), nhánh 2 là kết quả (hỏng hay không). '
        + 'Bayes chính là đi NGƯỢC cây: biết kết quả, hỏi nguyên nhân.'
    };
  } },

{ ma: 'toan-vdc-phuongsai-ghep', chuong: 'Thống kê ghép nhóm', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const dau = R.nguyen(2, 6) * 5, h = R.chon([5, 10]);
    const f = [R.nguyen(3, 12), R.nguyen(5, 20), R.nguyen(8, 25), R.nguyen(4, 15), R.nguyen(2, 10)];
    const n = f.reduce((u, v) => u + v, 0);
    const c = f.map((_, k) => dau + h * k + h / 2);
    const tong = c.reduce((u, v, k) => u + v * f[k], 0);
    const tb = tong / n;
    const s2 = c.reduce((u, v, k) => u + f[k] * (v - tb) * (v - tb), 0) / n;
    const sd = Math.sqrt(s2);
    const bang = f.map((v, k) => `[${S(dau + h * k)}; ${S(dau + h * (k + 1))}): ${S(v)}`).join(' · ');
    return {
      q: `Khảo sát thời gian tự học mỗi tuần (giờ) của ${S(n)} học sinh, kết quả ghi trong bảng ghép nhóm:\n`
        + `${bang}\n`
        + `Tính độ lệch chuẩn của mẫu số liệu này. (làm tròn đến hàng phần trăm)`,
      ans: D(sd, 2),
      giai: `Bước 1 — giá trị đại diện mỗi nhóm là TRUNG ĐIỂM: ${c.map(v => S(v, 1)).join(' · ')}\n`
        + `Bước 2 — số trung bình: x̄ = Σnᵢcᵢ/n = ${S(tong, 1)}/${S(n)} = ${S(tb, 4)}\n`
        + `Bước 3 — phương sai: s² = Σnᵢ(cᵢ − x̄)²/n = ${S(s2, 4)}\n`
        + `Bước 4 — độ lệch chuẩn: s = √${S(s2, 4)} = ${D(sd, 2)} giờ.`,
      meo: 'Giá trị đại diện là TRUNG ĐIỂM nhóm, không phải đầu mút trái — sai bước này là hỏng cả bài. '
        + 'Độ lệch chuẩn cùng đơn vị với số liệu, phương sai thì không.'
    };
  } },

{ ma: 'toan-vdc-oxyz-macau', chuong: 'Oxyz', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const n = R.chon([[1, 2, 2], [2, 3, 6], [1, 2, -2], [2, -3, 6], [0, 3, 4]]);
    const dai = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
    const I = [R.nguyen(-8, 8), R.nguyen(-8, 8), R.nguyen(-8, 8)];
    const Rb = R.nguyen(1, 4);
    const Dp = R.nguyen(-12, 12);
    const d = Math.abs(n[0] * I[0] + n[1] * I[1] + n[2] * I[2] + Dp) / dai;
    if (d <= Rb + 0.2) return null;
    const he = (k, b) => (k === 0 ? '' : (k > 0 ? ' + ' : ' − ') + (Math.abs(k) === 1 ? '' : Math.abs(k)) + b);
    const pt = `${n[0] === 1 ? 'x' : n[0] === -1 ? '−x' : n[0] === 0 ? '' : n[0] + 'x'}${he(n[1], 'y')}${he(n[2], 'z')}${Dp >= 0 ? ' + ' + Dp : ' − ' + (-Dp)} = 0`;
    const xa = T(d + Rb, 3);
    return {
      q: `Trong không gian Oxyz cho mặt cầu (S) tâm I(${S(I[0])}; ${S(I[1])}; ${S(I[2])}) bán kính ${S(Rb)} `
        + `và mặt phẳng (P): ${pt}. Điểm M chạy trên (S). Tìm khoảng cách LỚN NHẤT từ M đến (P). `
        + `(làm tròn đến hàng phần nghìn)`,
      ans: D(xa, 3),
      giai: `Bước 1 — khoảng cách từ tâm tới mặt phẳng:\n`
        + `  d(I,(P)) = |A·x₀ + B·y₀ + C·z₀ + D| / √(A²+B²+C²) = ${S(d, 5)}\n`
        + `Bước 2 — vì ${S(d, 3)} > R = ${S(Rb)} nên mặt cầu nằm hẳn một phía, không cắt (P).\n`
        + `Bước 3 — M chạy trên mặt cầu nên khoảng cách tới (P) nằm trong đoạn [d − R; d + R]:\n`
        + `  lớn nhất = d + R = ${S(d, 5)} + ${S(Rb)} = ${D(xa, 3)}.`,
      meo: 'Điểm xa nhất và gần nhất đều nằm trên đường thẳng qua I và VUÔNG GÓC với (P). '
        + 'Xa nhất d + R, gần nhất |d − R|. Nếu d < R thì mặt cầu cắt (P) và khoảng cách nhỏ nhất bằng 0.'
    };
  } },

{ ma: 'toan-vdc-quangduong', chuong: 'Ứng dụng tích phân', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const p = R.nguyen(1, 6), q = p + R.nguyen(1, 4);
    const Tc = q + R.nguyen(1, 5);
    const F = t => t * t * t / 3 - (p + q) * t * t / 2 + p * q * t;
    const s = Math.abs(F(p) - F(0)) + Math.abs(F(q) - F(p)) + Math.abs(F(Tc) - F(q));
    const kq = T(s, 3);
    return {
      q: `Một vật chuyển động trên đường thẳng với vận tốc v(t) = t² − ${S(p + q)}t + ${S(p * q)} (m/s), `
        + `t tính bằng giây. Tính QUÃNG ĐƯỜNG vật đi được trong ${S(Tc)} giây đầu tiên. `
        + `(làm tròn đến hàng phần nghìn)`,
      ans: D(kq, 3),
      giai: `Bước 1 — quãng đường là ∫|v(t)|dt nên phải tìm chỗ v ĐỔI DẤU trước:\n`
        + `  v(t) = (t − ${S(p)})(t − ${S(q)}) = 0 ⇒ t = ${S(p)} và t = ${S(q)}\n`
        + `Bước 2 — chia [0; ${S(Tc)}] thành ba đoạn, tính riêng rồi lấy trị tuyệt đối:\n`
        + `  |∫₀^${S(p)} v dt| = ${S(Math.abs(F(p) - F(0)), 4)} m\n`
        + `  |∫_${S(p)}^${S(q)} v dt| = ${S(Math.abs(F(q) - F(p)), 4)} m\n`
        + `  |∫_${S(q)}^${S(Tc)} v dt| = ${S(Math.abs(F(Tc) - F(q)), 4)} m\n`
        + `Bước 3 — cộng lại: s = ${D(kq, 3)} m.`,
      meo: 'QUÃNG ĐƯỜNG dùng ∫|v|dt, ĐỘ DỊCH CHUYỂN dùng ∫v dt (có thể âm). '
        + 'Không tách tại nghiệm của v là mất phần vật đi ngược, kết quả nhỏ hơn thực tế.'
    };
  } },

{ ma: 'toan-vdc-danso', chuong: 'Mũ – Logarit', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const N0 = R.nguyen(20, 90) / 10;
    const nam1 = R.nguyen(10, 25);
    const k = R.nguyen(8, 25) / 1000;
    const N1 = N0 * Math.exp(k * nam1);
    const nguong = T(N1 * R.nguyen(11, 18) / 10, 2);
    const kq = T(Math.log(nguong / N0) / k, 2);
    return {
      q: `Dân số một quốc gia tăng theo mô hình N = N₀·e^(kt), t tính bằng năm kể từ năm gốc. `
        + `Năm gốc dân số là ${S(N0, 1)} triệu người, sau ${S(nam1)} năm đạt ${S(N1, 4)} triệu người. `
        + `Sau bao nhiêu năm kể từ năm gốc thì dân số đạt ${S(nguong, 2)} triệu người? `
        + `(làm tròn đến hàng phần trăm)`,
      ans: D(kq, 2),
      giai: `Bước 1 — tìm k từ hai mốc đã biết:\n`
        + `  ${S(N1, 4)} = ${S(N0, 1)}·e^(k·${S(nam1)}) ⇒ k = ln(${S(N1, 4)}/${S(N0, 1)}) ÷ ${S(nam1)} = ${S(k, 5)}\n`
        + `Bước 2 — thay k vừa tìm vào để giải t:\n`
        + `  ${S(nguong, 2)} = ${S(N0, 1)}·e^(${S(k, 5)}·t) ⇒ t = ln(${S(nguong, 2)}/${S(N0, 1)}) ÷ ${S(k, 5)} = ${D(kq, 2)} năm.`,
      meo: 'Dạng hai bước: dùng dữ kiện thứ nhất TÌM HẰNG SỐ, rồi mới dùng hằng số đó trả lời câu hỏi. '
        + 'Lao vào giải ngay câu hỏi khi chưa có k là bế tắc.'
    };
  } },

{ ma: 'toan-vdc-ds-khaosat', chuong: 'Khảo sát hàm số', muc: 4, dang: 'ds',
  tao(R) {
    const a = R.chon([1, 2, -1, -2]);
    const p = R.nguyen(-3, 1), q = p + R.nguyen(2, 4);
    const cd = a > 0 ? p : q, ct = a > 0 ? q : p;
    const kho = [
      { t: `Hàm số có đúng hai điểm cực trị.`, a: true,
        v: `y′ = ${S(3 * a)}(x − ${S(p)})(x − ${S(q)}) có hai nghiệm phân biệt và đổi dấu qua cả hai ⇒ hai điểm cực trị.` },
      { t: `Hàm số đạt cực đại tại x = ${S(cd)}.`, a: true,
        v: `a = ${S(a)} ${a > 0 ? '> 0 nên y′ đổi dấu + → − tại nghiệm NHỎ hơn' : '< 0 nên y′ đổi dấu + → − tại nghiệm LỚN hơn'} ⇒ cực đại tại x = ${S(cd)}.` },
      { t: `Hàm số đạt cực tiểu tại x = ${S(cd)}.`, a: false,
        v: `x = ${S(cd)} là điểm cực ĐẠI; cực tiểu nằm tại x = ${S(ct)}.` },
      { t: `Hàm số nghịch biến trên khoảng (${S(p)}; ${S(q)}).`, a: a > 0,
        v: a > 0 ? `a > 0 nên y′ < 0 giữa hai nghiệm ⇒ nghịch biến trên (${S(p)}; ${S(q)}).`
                 : `a < 0 nên y′ > 0 giữa hai nghiệm ⇒ ĐỒNG biến trên (${S(p)}; ${S(q)}), không phải nghịch biến.` },
      { t: `Hàm số đồng biến trên khoảng (${S(q)}; +∞).`, a: a > 0,
        v: a > 0 ? `Ngoài đoạn hai nghiệm, y′ cùng dấu với a > 0 ⇒ đồng biến.`
                 : `a < 0 nên ngoài đoạn hai nghiệm y′ < 0 ⇒ NGHỊCH biến trên (${S(q)}; +∞).` },
      { t: `Phương trình y′ = 0 có nghiệm kép.`, a: false,
        v: `y′ có hai nghiệm PHÂN BIỆT x = ${S(p)} và x = ${S(q)}.` },
      { t: `Đồ thị hàm số nhận điểm uốn có hoành độ x = ${S((p + q) / 2, 1)} làm tâm đối xứng.`, a: true,
        v: `Hàm bậc ba luôn nhận điểm uốn làm tâm đối xứng; hoành độ điểm uốn là trung bình cộng hai điểm cực trị: (${S(p)} + ${S(q)})/2 = ${S((p + q) / 2, 1)}.` },
      { t: `Hàm số không có giá trị lớn nhất trên ℝ.`, a: true,
        v: `Hàm bậc ba có giới hạn ±∞ ở hai đầu nên không có GTLN cũng như GTNN trên toàn ℝ, chỉ có cực trị địa phương.` }
    ];
    return TD.dsTu(R, `Cho hàm số bậc ba y = f(x) có đạo hàm f′(x) = ${S(3 * a)}(x − ${S(p)})(x − ${S(q)}). `
      + `Xét tính đúng/sai của các phát biểu sau:`, kho,
      'Đọc DẤU của a trước: a > 0 thì y′ "âm ở giữa, dương hai bên"; a < 0 thì ngược lại. '
      + 'Mọi kết luận về đồng biến, nghịch biến, cực đại, cực tiểu đều suy ra từ đó.');
  } }

]);

/* ==========================================================
   SINH HỌC — VẬN DỤNG CAO
   ========================================================== */
TD.GEN.sinh = (TD.GEN.sinh || []).concat([

{ ma: 'sinh-vdc-phahe', chuong: 'Di truyền NST', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const soCon = R.nguyen(2, 3);
    const q = R.nguyen(1, 9) / 20;                  /* tần số allele bệnh 0,05 – 0,45 */
    const p = 1 - q;
    const pAa = 2 * p * q / (p * p + 2 * p * q);    /* người bình thường trong quần thể là Aa */
    const W = (2 / 3) * pAa;                        /* xác suất CẢ HAI vợ chồng đều Aa */
    const nCr = (n, k) => { let r = 1; for (let t = 0; t < k; t++) r = r * (n - t) / (t + 1); return Math.round(r); };
    const hoi = R.chon([
      { t: `ĐỀU bị bệnh`, v: W * Math.pow(0.25, soCon),
        b: `Chỉ khi cả hai đều Aa thì con mới có thể bị bệnh, mỗi con bệnh với xác suất 1/4:\n`
         + `  P = ${S(W, 5)} × (1/4)^${S(soCon)}` },
      { t: `ĐỀU bình thường`, v: W * Math.pow(0.75, soCon) + (1 - W),
        b: `Phải xét HAI trường hợp:\n`
         + `  · Cả hai đều Aa (xác suất ${S(W, 5)}): mỗi con bình thường với xác suất 3/4\n`
         + `  · Không phải cả hai đều Aa (xác suất ${S(1 - W, 5)}): mọi con đều bình thường\n`
         + `  P = ${S(W, 5)}×(3/4)^${S(soCon)} + ${S(1 - W, 5)}` },
      { t: `có ĐÚNG MỘT người con bị bệnh`, v: W * nCr(soCon, 1) * 0.25 * Math.pow(0.75, soCon - 1),
        b: `Chọn vị trí người con bị bệnh trong ${S(soCon)} người con:\n`
         + `  P = ${S(W, 5)} × C¹<sub>${S(soCon)}</sub> × (1/4) × (3/4)^${S(soCon - 1)}` }
    ]);
    const kq = T(hoi.v, 5);
    return {
      q: `Một bệnh do allele lặn nằm trên nhiễm sắc thể thường quy định. Một cặp vợ chồng bình thường sinh được `
        + `một người con bị bệnh và một người con gái bình thường. Người con gái này lớn lên lấy chồng là một `
        + `người bình thường thuộc quần thể đang cân bằng di truyền có tần số allele gây bệnh bằng ${S(q, 2)}. `
        + `Xác suất để cặp vợ chồng mới sinh ${S(soCon)} người con ${hoi.t} là bao nhiêu? `
        + `(làm tròn đến hàng phần trăm nghìn)`,
      ans: D(kq, 5),
      giai: `Bước 1 — bố mẹ bình thường sinh con bệnh (aa) ⇒ cả hai đều là Aa.\n`
        + `  Người con gái BÌNH THƯỜNG nên đã loại kiểu gene aa ⇒ xác suất cô ấy là Aa bằng 2/3.\n`
        + `Bước 2 — quần thể cân bằng với q = ${S(q, 2)}, p = ${S(p, 2)}. Trong nhóm người bình thường:\n`
        + `  P(Aa | bình thường) = 2pq/(p² + 2pq) = ${S(pAa, 5)}\n`
        + `  ⇒ xác suất CẢ HAI vợ chồng đều Aa = (2/3) × ${S(pAa, 5)} = ${S(W, 5)}\n`
        + `Bước 3 — ${hoi.b} = ${D(kq, 5)}.`,
      meo: 'Ba bẫy chồng lên nhau: ① người bình thường đã LOẠI aa nên mẫu số đổi từ 4 thành 3 '
        + '② trong quần thể cũng loại aa nên tỉ lệ Aa là 2pq/(p² + 2pq) ③ câu "đều bình thường" phải cộng '
        + 'thêm trường hợp bố mẹ KHÔNG cùng dị hợp — quên vế này là thiếu phần lớn xác suất.'
    };
  } },

{ ma: 'sinh-vdc-hoanvi', chuong: 'Hoán vị gene', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const f = R.nguyen(4, 24) * 2 / 100;
    const abGT = (1 - f) / 2;
    const lan = abGT * abGT;
    const hoi = R.chon([
      { t: 'mang cả hai tính trạng trội (A-B-)', v: 0.5 + lan, ct: 'A-B- = 0,5 + aabb' },
      { t: 'mang tính trạng trội A và lặn b (A-bb)', v: 0.25 - lan, ct: 'A-bb = 0,25 − aabb' },
      { t: 'mang cả hai tính trạng lặn (aabb)', v: lan, ct: 'aabb = (giao tử ab)²' }
    ]);
    const kq = T(hoi.v * 100, 2);
    return {
      q: `Ở một loài thực vật, hai gene cùng nằm trên một cặp nhiễm sắc thể thường. Đem lai phân tích cây dị hợp `
        + `tử đều về hai cặp gene, đời con thu được ${S(f * 100)}% số cây mang kiểu hình tái tổ hợp. `
        + `Cho chính cây dị hợp tử đều đó tự thụ phấn, hoán vị xảy ra ở cả hai giới với cùng tần số. `
        + `Theo lí thuyết, đời con có bao nhiêu phần trăm cây ${hoi.t}? `
        + `(làm tròn đến hàng phần trăm)`,
      ans: D(kq, 2),
      giai: `Bước 1 — lai phân tích cho tỉ lệ tái tổ hợp bằng đúng TẦN SỐ HOÁN VỊ: f = ${S(f * 100)}%.\n`
        + `Bước 2 — cây dị hợp tử ĐỀU (AB/ab) cho bốn loại giao tử:\n`
        + `  liên kết AB = ab = (1 − ${S(f, 2)})/2 = ${S(abGT, 4)}\n`
        + `  hoán vị Ab = aB = ${S(f, 2)}/2 = ${S(f / 2, 4)}\n`
        + `Bước 3 — kiểu hình lặn cả hai tính trạng: aabb = ${S(abGT, 4)}² = ${S(lan, 5)}\n`
        + `Bước 4 — dùng công thức ${hoi.ct} ⇒ ${S(hoi.v, 5)} = ${D(kq, 2)}%.`,
      meo: 'Thuộc bộ công thức: A-B- = 0,5 + aabb · A-bb = aaB- = 0,25 − aabb. '
        + 'Chỉ cần tính aabb là suy ra cả bốn kiểu hình, khỏi lập bảng 16 ô.'
    };
  } },

{ ma: 'sinh-vdc-quanthe', chuong: 'Di truyền quần thể', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const AA = R.nguyen(10, 50), Aa = R.nguyen(20, 60);
    const aa = 100 - AA - Aa;
    if (aa < 5) return null;
    const p = (AA + Aa / 2) / 100, q = 1 - p;
    const troi = p * p + 2 * p * q;
    const kq = T(p * p / troi, 4);
    return {
      q: `Một quần thể thực vật có cấu trúc di truyền ban đầu ${S(AA)}% AA : ${S(Aa)}% Aa : ${S(aa)}% aa, `
        + `trải qua một thế hệ ngẫu phối. Chọn ngẫu nhiên một cây mang kiểu hình TRỘI ở thế hệ sau, `
        + `xác suất cây đó thuần chủng là bao nhiêu? (làm tròn đến hàng phần vạn)`,
      ans: D(kq, 4),
      giai: `Bước 1 — ngẫu phối không làm đổi tần số allele:\n`
        + `  p(A) = ${S(AA / 100, 2)} + ${S(Aa / 100, 2)}/2 = ${S(p, 4)} ; q(a) = ${S(q, 4)}\n`
        + `Bước 2 — sau một thế hệ ngẫu phối, quần thể đạt cân bằng Hardy–Weinberg:\n`
        + `  AA = p² = ${S(p * p, 5)} · Aa = 2pq = ${S(2 * p * q, 5)} · aa = q² = ${S(q * q, 5)}\n`
        + `Bước 3 — nhóm kiểu hình TRỘI gồm AA và Aa: ${S(p * p, 5)} + ${S(2 * p * q, 5)} = ${S(troi, 5)}\n`
        + `Bước 4 — xác suất có điều kiện: P(AA | trội) = ${S(p * p, 5)} / ${S(troi, 5)} = ${D(kq, 4)}.`,
      meo: 'Ngẫu phối KHÔNG đổi tần số allele, chỉ đưa quần thể về cân bằng sau đúng MỘT thế hệ. '
        + '"Chọn một cây trội" là xác suất CÓ ĐIỀU KIỆN — mẫu số chỉ là nhóm trội, không phải cả quần thể.'
    };
  } },

{ ma: 'sinh-vdc-nhandoi', chuong: 'Nhân đôi DNA', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const N = R.nguyen(60, 300) * 10;
    const ptA = R.nguyen(15, 35);
    const A = Math.round(N * ptA / 100);
    const G = N / 2 - A;
    if (G <= 0) return null;
    const k = R.nguyen(2, 5);
    const H = 2 * A + 3 * G;
    const hoi = R.nguyen(0, 1);
    const he = Math.pow(2, k) - 1;
    return {
      q: `Một gene có ${S(N)} nucleotide, trong đó adenine chiếm ${S(ptA)}% tổng số nucleotide. `
        + `Gene này nhân đôi liên tiếp ${S(k)} lần. `
        + (hoi === 0
            ? `Môi trường nội bào phải cung cấp bao nhiêu nucleotide loại adenine?`
            : `Tổng số liên kết hydrogen bị phá vỡ trong toàn bộ quá trình nhân đôi là bao nhiêu?`),
      ans: D(hoi === 0 ? A * he : H * he, 0),
      giai: `Bước 1 — số nucleotide từng loại:\n`
        + `  A = T = ${S(N)} × ${S(ptA)}% = ${S(A)}\n`
        + `  G = X = ${S(N)}/2 − ${S(A)} = ${S(G)} (vì A + G = 50% tổng số nucleotide)\n`
        + `Bước 2 — số liên kết hydrogen của gene: H = 2A + 3G = 2×${S(A)} + 3×${S(G)} = ${S(H)}\n`
        + `Bước 3 — nhân đôi ${S(k)} lần tạo 2^${S(k)} = ${S(Math.pow(2, k))} gene con, hệ số cần dùng là 2^k − 1 = ${S(he)}:\n`
        + (hoi === 0
            ? `  A môi trường cung cấp = ${S(A)} × ${S(he)} = ${D(A * he, 0)}`
            : `  Liên kết hydrogen bị phá vỡ = ${S(H)} × ${S(he)} = ${D(H * he, 0)}`),
      meo: 'Hệ số luôn là (2^k − 1) chứ không phải 2^k, vì hai mạch của gene mẹ ban đầu không do môi trường cung cấp. '
        + 'Nhớ A + G = 50% để suy G từ A trong DNA mạch kép.'
    };
  } },

{ ma: 'sinh-vdc-nangluong', chuong: 'Sinh thái học', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const E0 = R.nguyen(1, 9) * 1e6;
    const hs = [R.nguyen(8, 15), R.nguyen(8, 15), R.nguyen(8, 15)];
    const bac = R.nguyen(2, 4);
    let E = E0;
    for (let i = 0; i < bac - 1; i++) E = E * hs[i] / 100;
    const kq = T(E, 2);
    let buoc = `Bậc dinh dưỡng cấp 1 chính là sinh vật sản xuất: ${S(E0)} kcal.\n`;
    let tam = E0;
    for (let i = 0; i < bac - 1; i++) {
      const sau = tam * hs[i] / 100;
      buoc += `  Cấp ${i + 2} = ${S(tam, 2)} × ${S(hs[i])}% = ${S(sau, 2)} kcal\n`;
      tam = sau;
    }
    return {
      q: `Trong một chuỗi thức ăn, sinh vật sản xuất tích luỹ được ${S(E0 / 1e6)}·10⁶ kcal. `
        + `Hiệu suất sinh thái giữa các bậc dinh dưỡng liên tiếp lần lượt là ${S(hs[0])}%, ${S(hs[1])}%, ${S(hs[2])}%. `
        + `Năng lượng tích luỹ ở bậc dinh dưỡng cấp ${S(bac)} là bao nhiêu kcal? (làm tròn đến hàng phần trăm)`,
      ans: D(kq, 2),
      giai: buoc + `Đáp án: ${D(kq, 2)} kcal.`,
      meo: 'Bậc dinh dưỡng cấp 1 là sinh vật SẢN XUẤT, không phải sinh vật tiêu thụ bậc 1. '
        + 'Đếm lệch một bậc là nhân thừa hoặc thiếu một lần hiệu suất, sai gấp khoảng mười lần.'
    };
  } },

{ ma: 'sinh-vdc-ds-ditruyen', chuong: 'Hoán vị gene', muc: 4, dang: 'ds',
  tao(R) {
    const f = R.nguyen(5, 20) * 2;
    const abGT = (100 - f) / 200;
    const aabb = abGT * abGT;
    const kho = [
      { t: `Tần số hoán vị gene bằng ${S(f)}%.`, a: true,
        v: `Trong lai phân tích, tổng tỉ lệ hai kiểu hình tái tổ hợp đúng bằng tần số hoán vị.` },
      { t: `Cơ thể dị hợp tử đều tạo bốn loại giao tử tỉ lệ ${S(abGT * 100, 1)}% : ${S(abGT * 100, 1)}% : ${S(f / 2, 1)}% : ${S(f / 2, 1)}%.`, a: true,
        v: `Giao tử liên kết mỗi loại (100 − ${S(f)})/2 = ${S(abGT * 100, 1)}%; giao tử hoán vị mỗi loại ${S(f)}/2 = ${S(f / 2, 1)}%.` },
      { t: `Tần số hoán vị gene có thể lớn hơn 50%.`, a: false,
        v: `Tần số hoán vị tối đa là 50%. Vượt quá nghĩa là đã nhầm nhóm tái tổ hợp với nhóm liên kết.` },
      { t: `Hai gene nằm càng xa nhau trên nhiễm sắc thể thì tần số hoán vị càng lớn.`, a: true,
        v: `Khoảng cách càng lớn thì khả năng trao đổi chéo giữa chúng càng cao. 1% hoán vị tương ứng 1 cM.` },
      { t: `Hoán vị gene xảy ra ở kì giữa của giảm phân I.`, a: false,
        v: `Trao đổi chéo xảy ra ở kì ĐẦU giảm phân I, giữa hai chromatid khác nguồn của cặp tương đồng.` },
      { t: `Cho cơ thể dị hợp tử đều tự thụ phấn thì đời con có ${S(aabb * 100, 2)}% cá thể mang kiểu hình lặn về cả hai tính trạng.`, a: true,
        v: `aabb = (giao tử ab)² = ${S(abGT, 4)}² = ${S(aabb, 5)} = ${S(aabb * 100, 2)}%.` },
      { t: `Liên kết gene hoàn toàn làm tăng biến dị tổ hợp so với phân li độc lập.`, a: false,
        v: `Liên kết hoàn toàn LÀM GIẢM biến dị tổ hợp vì các gene di truyền cùng nhau thành nhóm. Chính hoán vị gene mới làm tăng biến dị tổ hợp.` },
      { t: `Ở ruồi giấm đực và tằm cái không xảy ra hoán vị gene.`, a: true,
        v: `Hai ngoại lệ kinh điển, đề rất hay dùng để gài trong bài lai.` }
    ];
    return TD.dsTu(R, `Đem lai phân tích một cơ thể dị hợp tử đều về hai cặp gene cùng nằm trên một cặp nhiễm sắc `
      + `thể thường, đời con thu được ${S(f)}% cá thể mang kiểu hình tái tổ hợp. Xét các phát biểu sau:`, kho,
      'Trục xương của mọi bài hoán vị: ① lai phân tích ⇒ tỉ lệ tái tổ hợp = f ② giao tử liên kết (1−f)/2, '
      + 'hoán vị f/2 ③ aabb = (ab)² ④ A-B- = 0,5 + aabb.');
  } }

]);

/* ==========================================================
   SỬ – ĐỊA – GDKT&PL — VẬN DỤNG CAO
   Khối này không tính toán nhiều nên "vận dụng cao" nằm ở chỗ
   SO SÁNH, LÍ GIẢI NGUYÊN NHÂN và RÚT RA BÀI HỌC — đúng kiểu
   câu phân loại của đề thật.
   ========================================================== */
const MC2 = (R, de, it, meo) => {
  const opts = TD.xaoR(R, [it.d].concat(it.s));
  return { q: de, opts: opts, ans: opts.indexOf(it.d),
    giai: `Đáp án: ${it.d}\n${it.v}`, meo: meo };
};

TD.GEN.su = (TD.GEN.su || []).concat([

{ ma: 'su-vdc-nhanxet', chuong: 'Kháng chiến chống Mỹ', muc: 4, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { q: 'Nhận xét nào sau đây ĐÚNG về nguyên nhân quyết định thắng lợi của cuộc kháng chiến chống Mỹ, cứu nước?',
        d: 'Sự lãnh đạo đúng đắn của Đảng với đường lối kháng chiến độc lập, tự chủ và sáng tạo',
        v: 'Nguyên nhân QUYẾT ĐỊNH luôn thuộc về nhân tố CHỦ QUAN. Sự giúp đỡ quốc tế và mâu thuẫn trong lòng nước Mỹ là điều kiện thuận lợi khách quan, quan trọng nhưng không quyết định.',
        s: ['Sự giúp đỡ to lớn của Liên Xô và Trung Quốc',
            'Phong trào phản chiến dâng cao ngay trong lòng nước Mỹ',
            'Sự ủng hộ của nhân dân tiến bộ trên toàn thế giới'] },
      { q: 'Điểm KHÁC BIỆT căn bản của chiến lược "Chiến tranh cục bộ" so với "Chiến tranh đặc biệt" là gì?',
        d: 'Quân viễn chinh Mỹ trực tiếp tham chiến và giữ vai trò quan trọng trên chiến trường',
        v: 'Chiến tranh đặc biệt dùng quân đội Sài Gòn làm nòng cốt dưới sự chỉ huy của cố vấn Mỹ; Chiến tranh cục bộ đưa quân viễn chinh Mỹ vào trực tiếp chiến đấu — đó là bước leo thang về BẢN CHẤT lực lượng.',
        s: ['Vẫn dựa hoàn toàn vào quân đội Sài Gòn làm lực lượng chủ yếu',
            'Chỉ tiến hành ở miền Nam, không mở rộng ra miền Bắc',
            'Sử dụng vũ khí và phương tiện chiến tranh do Mỹ viện trợ'] },
      { q: 'Ý nghĩa QUAN TRỌNG NHẤT của Hiệp định Paris năm 1973 đối với cách mạng Việt Nam là gì?',
        d: 'Buộc Mỹ phải rút hết quân về nước, tạo thời cơ để nhân dân ta tiến lên giải phóng miền Nam',
        v: 'Hiệp định làm thay đổi HẲN so sánh lực lượng trên chiến trường: quân Mỹ và đồng minh rút đi, quân ta vẫn ở lại miền Nam. Đó là tiền đề trực tiếp cho Đại thắng mùa Xuân 1975.',
        s: ['Mỹ công nhận các quyền dân tộc cơ bản của nhân dân Việt Nam',
            'Chấm dứt hoàn toàn ách thống trị của chủ nghĩa thực dân mới',
            'Hoàn thành thống nhất đất nước về mặt nhà nước'] },
      { q: 'Nhận xét nào ĐÚNG về vai trò của hậu phương miền Bắc trong kháng chiến chống Mỹ?',
        d: 'Là hậu phương lớn chi viện sức người, sức của cho tiền tuyến miền Nam đồng thời trực tiếp chiến đấu chống chiến tranh phá hoại',
        v: 'Miền Bắc giữ vai trò KÉP: vừa là hậu phương chi viện, vừa là chiến trường trực tiếp đánh trả hai lần chiến tranh phá hoại của Mỹ.',
        s: ['Chỉ làm nhiệm vụ sản xuất, không tham gia chiến đấu',
            'Chỉ tập trung xây dựng chủ nghĩa xã hội, tách rời cuộc chiến ở miền Nam',
            'Là nơi tiếp nhận viện trợ rồi chuyển toàn bộ vào miền Nam'] },
      { q: 'Bài học kinh nghiệm nào từ Cách mạng tháng Tám năm 1945 vẫn còn nguyên giá trị trong công cuộc xây dựng đất nước hiện nay?',
        d: 'Phát huy sức mạnh đại đoàn kết toàn dân tộc và nắm bắt đúng thời cơ',
        v: 'Thắng lợi 1945 là kết quả của việc tập hợp mọi lực lượng trong Mặt trận Việt Minh và chớp đúng thời cơ khi Nhật đầu hàng Đồng minh. Bài học về đoàn kết và thời cơ mang tính phổ quát, vận dụng được vào phát triển kinh tế – xã hội hôm nay.',
        s: ['Dựa hẳn vào sự giúp đỡ của lực lượng bên ngoài',
            'Tập trung toàn bộ nguồn lực cho lĩnh vực quân sự',
            'Duy trì cơ chế kinh tế tập trung bao cấp'] },
      { q: 'Nhận xét nào ĐÚNG về công cuộc Đổi mới từ năm 1986?',
        d: 'Đổi mới toàn diện nhưng trọng tâm là đổi mới kinh tế, đồng thời giữ vững định hướng xã hội chủ nghĩa',
        v: 'Đại hội VI xác định đổi mới phải TOÀN DIỆN và ĐỒNG BỘ, song trọng tâm là kinh tế; đổi mới không phải là thay đổi mục tiêu mà là tìm hình thức, bước đi phù hợp.',
        s: ['Chỉ đổi mới về kinh tế, giữ nguyên mọi mặt khác',
            'Từ bỏ mục tiêu chủ nghĩa xã hội để chuyển hẳn sang kinh tế thị trường tự do',
            'Ưu tiên đổi mới chính trị trước rồi mới đổi mới kinh tế'] }
    ]);
    return MC2(R, it.q, it,
      'Câu nhận xét, so sánh, đánh giá là phần phân loại của đề Sử. Bám ba trục: '
      + 'nguyên nhân QUYẾT ĐỊNH luôn là chủ quan · điểm KHÁC BIỆT phải nằm ở bản chất chứ không ở hình thức · '
      + 'ý nghĩa LỚN NHẤT gắn với bước ngoặt.');
  } },

{ ma: 'su-vdc-ds-sosanh', chuong: 'Chiến tranh lạnh', muc: 4, dang: 'ds',
  tao(R) {
    const kho = [
      { t: 'Trật tự thế giới hai cực Ianta được hình thành ngay sau khi Chiến tranh thế giới thứ hai kết thúc.', a: true,
        v: 'Hội nghị Ianta (2/1945) và các thoả thuận sau đó đã đặt khuôn khổ cho trật tự hai cực do Liên Xô và Mỹ đứng đầu.' },
      { t: 'Chiến tranh lạnh chấm dứt cùng lúc với sự sụp đổ của trật tự hai cực Ianta.', a: false,
        v: 'Hai mốc KHÁC nhau: Chiến tranh lạnh chấm dứt năm 1989 (cuộc gặp Manta), còn trật tự hai cực chỉ sụp đổ hoàn toàn khi Liên Xô tan rã năm 1991.' },
      { t: 'Chiến tranh lạnh là cuộc đối đầu căng thẳng nhưng hai siêu cường không trực tiếp giao chiến với nhau.', a: true,
        v: 'Đối đầu diễn ra trên mọi lĩnh vực và qua các cuộc chiến tranh cục bộ, nhưng Mỹ và Liên Xô luôn tránh đụng độ quân sự trực tiếp.' },
      { t: 'NATO và Tổ chức Hiệp ước Vacsava đều là liên minh quân sự, ra đời cùng một năm.', a: false,
        v: 'NATO thành lập năm 1949, Vacsava mãi năm 1955 mới ra đời để đối trọng. Cách nhau 6 năm.' },
      { t: 'Chiến tranh lạnh đã tác động trực tiếp đến cuộc kháng chiến chống Mỹ của nhân dân Việt Nam.', a: true,
        v: 'Việt Nam trở thành nơi đụng độ gián tiếp giữa hai phe; đó cũng là lí do ta nhận được sự giúp đỡ của Liên Xô, Trung Quốc.' },
      { t: 'Sau Chiến tranh lạnh, thế giới chuyển ngay sang trật tự đơn cực do Mỹ hoàn toàn chi phối.', a: false,
        v: 'Thế giới chuyển sang thời kì quá độ, hình thành xu thế ĐA CỰC với sự vươn lên của EU, Nhật Bản, Trung Quốc, Nga. Mỹ có ưu thế nhưng không chi phối tuyệt đối.' },
      { t: 'Xu thế chủ đạo của thế giới sau Chiến tranh lạnh là hoà bình, hợp tác và phát triển.', a: true,
        v: 'Các nước điều chỉnh chiến lược, lấy phát triển kinh tế làm trọng tâm; tuy vậy xung đột khu vực và khủng bố vẫn tồn tại.' },
      { t: 'Việc Việt Nam gia nhập ASEAN năm 1995 là hệ quả trực tiếp của xu thế hoà hoãn sau Chiến tranh lạnh.', a: true,
        v: 'Chiến tranh lạnh kết thúc làm giảm đối đầu ý thức hệ trong khu vực, mở đường cho Việt Nam phá thế bao vây cấm vận và hội nhập.' }
    ];
    return TD.dsTu(R, 'Về Chiến tranh lạnh và trật tự thế giới sau Chiến tranh thế giới thứ hai, '
      + 'xét tính đúng/sai của các phát biểu sau:', kho,
      'Ba mốc phải tách bạch: 1947 mở đầu Chiến tranh lạnh · 1989 chấm dứt Chiến tranh lạnh · '
      + '1991 sụp đổ trật tự hai cực. Đề rất hay gộp ba mốc này làm một để gài.');
  } }

]);

TD.GEN.dia = (TD.GEN.dia || []).concat([

{ ma: 'dia-vdc-binhquan2nam', chuong: 'Kỹ năng', muc: 4, dang: 'tln',
  tao(R) {
    const sl1 = R.nguyen(300, 420) / 10, dan1 = R.nguyen(800, 900) / 10;
    const sl2 = T(sl1 * R.nguyen(102, 130) / 100, 1), dan2 = T(dan1 * R.nguyen(103, 115) / 100, 1);
    const bq1 = sl1 * 1e6 * 1000 / (dan1 * 1e6);
    const bq2 = sl2 * 1e6 * 1000 / (dan2 * 1e6);
    const chenh = T(bq2 - bq1, 2);
    return {
      q: `Cho bảng số liệu về sản lượng lương thực và số dân của một quốc gia:\n`
        + `· Năm thứ nhất: sản lượng ${S(sl1, 1)} triệu tấn, số dân ${S(dan1, 1)} triệu người\n`
        + `· Năm thứ hai: sản lượng ${S(sl2, 1)} triệu tấn, số dân ${S(dan2, 1)} triệu người\n`
        + `Bình quân lương thực theo đầu người năm thứ hai đã thay đổi bao nhiêu kg/người so với năm thứ nhất? `
        + `(ghi cả dấu; làm tròn đến hàng phần trăm)`,
      ans: D(chenh, 2),
      giai: `Bước 1 — bình quân năm thứ nhất:\n`
        + `  ${S(sl1, 1)}·10⁶ tấn × 1 000 kg ÷ ${S(dan1, 1)}·10⁶ người = ${S(bq1, 3)} kg/người\n`
        + `Bước 2 — bình quân năm thứ hai:\n`
        + `  ${S(sl2, 1)}·10⁶ × 1 000 ÷ ${S(dan2, 1)}·10⁶ = ${S(bq2, 3)} kg/người\n`
        + `Bước 3 — mức thay đổi = ${S(bq2, 3)} − ${S(bq1, 3)} = ${D(chenh, 2)} kg/người `
        + `(${chenh > 0 ? 'TĂNG' : 'GIẢM'}).\n`
        + `Lưu ý: sản lượng tăng nhưng nếu dân số tăng NHANH HƠN thì bình quân vẫn giảm.`,
      meo: 'Dạng hai bước kinh điển của Địa: phải tính chỉ tiêu cho CẢ HAI năm rồi mới so sánh. '
        + 'Nhìn riêng sản lượng tăng mà kết luận bình quân tăng là mắc bẫy.'
    };
  } },

{ ma: 'dia-vdc-giaithich', chuong: 'Khí hậu', muc: 4, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { q: 'Vì sao vào đầu mùa hạ, vùng ven biển Bắc Trung Bộ và Nam Tây Bắc lại khô nóng gay gắt?',
        d: 'Khối khí từ vịnh Bengal vượt dãy Trường Sơn, trút mưa ở sườn Tây rồi bị biến tính khô nóng khi xuống sườn Đông',
        v: 'Đây là hiệu ứng phơn: không khí lên cao giảm nhiệt và gây mưa, khi xuống thấp bị nén đoạn nhiệt nên nóng và khô.',
        s: ['Do gió mùa Đông Bắc suy yếu và bị biến tính khi đi qua biển',
            'Do vùng này nằm sâu trong nội địa, xa ảnh hưởng điều hoà của biển',
            'Do địa hình thấp trũng nên tích tụ nhiệt vào mùa hạ'] },
      { q: 'Vì sao miền Nam nước ta có biên độ nhiệt độ trung bình năm nhỏ hơn miền Bắc?',
        d: 'Miền Nam nằm gần Xích đạo, không chịu ảnh hưởng của gió mùa Đông Bắc nên nóng đều quanh năm',
        v: 'Biên độ nhiệt phụ thuộc chênh lệch giữa tháng nóng nhất và lạnh nhất. Miền Bắc có mùa đông lạnh do gió mùa Đông Bắc nên chênh lệch lớn; miền Nam nóng quanh năm nên chênh lệch nhỏ.',
        s: ['Miền Nam có lượng mưa lớn hơn nên nhiệt độ được điều hoà',
            'Miền Nam có địa hình thấp và bằng phẳng hơn miền Bắc',
            'Miền Nam có diện tích rừng che phủ lớn hơn miền Bắc'] },
      { q: 'Vì sao Trung Bộ nước ta có mùa mưa lệch hẳn về thu đông?',
        d: 'Do gió Đông Bắc gặp dãy Trường Sơn chắn ngang, kết hợp với bão, dải hội tụ nhiệt đới và áp thấp hoạt động mạnh vào thời gian này',
        v: 'Trong khi cả nước mưa vào mùa hạ thì Trung Bộ lại khô nóng do phơn; đến thu đông các nhân tố gây mưa mới hội tụ tại đây.',
        s: ['Do gió mùa Tây Nam hoạt động mạnh nhất vào thu đông',
            'Do Trung Bộ nằm trong vùng khí hậu cận nhiệt đới gió mùa',
            'Do dãy Trường Sơn chắn toàn bộ hơi ẩm từ Biển Đông quanh năm'] },
      { q: 'Vì sao Tây Nguyên là vùng chuyên canh cây công nghiệp lâu năm lớn của nước ta nhưng vấn đề thuỷ lợi lại đặc biệt cấp thiết?',
        d: 'Vì vùng có mùa khô kéo dài sâu sắc, mực nước ngầm hạ thấp gây thiếu nước nghiêm trọng cho cây trồng',
        v: 'Đất badan màu mỡ và khí hậu cận xích đạo thuận lợi cho cây lâu năm, nhưng mùa khô 4–5 tháng khiến thuỷ lợi trở thành điều kiện sống còn.',
        s: ['Vì vùng có lượng mưa cả năm rất thấp, dưới 800 mm',
            'Vì đất badan giữ nước kém nên phải tưới liên tục quanh năm',
            'Vì vùng thường xuyên chịu ảnh hưởng của bão và lũ quét'] },
      { q: 'Vì sao Đồng bằng sông Cửu Long tuy là vựa lúa lớn nhất cả nước nhưng lại dễ tổn thương trước biến đổi khí hậu?',
        d: 'Vì địa hình thấp, chịu tác động trực tiếp của nước biển dâng và xâm nhập mặn vào mùa khô',
        v: 'Phần lớn diện tích chỉ cao 1–2 m so với mực nước biển; nước biển dâng cùng việc giảm lượng nước ngọt từ thượng nguồn làm mặn xâm nhập ngày càng sâu.',
        s: ['Vì vùng có mùa đông lạnh làm giảm năng suất lúa',
            'Vì vùng thiếu lao động có kinh nghiệm trồng lúa nước',
            'Vì đất phù sa của vùng ngày càng bạc màu do không được bồi đắp'] }
    ]);
    return MC2(R, it.q, it,
      'Câu "vì sao" của Địa luôn giải bằng chuỗi NHÂN – QUẢ từ ba nhóm nhân tố: vị trí – địa hình – hoàn lưu khí quyển. '
      + 'Phương án nào chỉ mô tả hiện tượng mà không nêu cơ chế thì thường là nhiễu.');
  } },

{ ma: 'dia-vdc-ds-vung', chuong: 'Vùng kinh tế', muc: 4, dang: 'ds',
  tao(R) {
    const v = R.chon([
      { t: 'Đồng bằng sông Cửu Long', kho: [
        { t: 'Đây là vùng trọng điểm lương thực, thực phẩm lớn nhất cả nước.', a: true, v: 'Vùng dẫn đầu về sản lượng lúa, thuỷ sản và cây ăn quả.' },
        { t: 'Khó khăn lớn nhất của vùng vào mùa khô là xâm nhập mặn và thiếu nước ngọt.', a: true, v: 'Địa hình thấp cộng với nước biển dâng làm mặn xâm nhập ngày càng sâu.' },
        { t: 'Vùng có mùa đông lạnh nên trồng được cây cận nhiệt.', a: false, v: 'Vùng có khí hậu cận xích đạo, nóng quanh năm, KHÔNG có mùa đông lạnh.' },
        { t: 'Vùng dẫn đầu cả nước về giá trị sản xuất công nghiệp.', a: false, v: 'Đông Nam Bộ mới dẫn đầu về công nghiệp; thế mạnh của Đồng bằng sông Cửu Long là nông – thuỷ sản.' },
        { t: 'Chuyển đổi cơ cấu mùa vụ và mô hình lúa – tôm là hướng thích ứng với xâm nhập mặn.', a: true, v: 'Đây là giải pháp thích ứng chứ không chống lại tự nhiên, đang được nhân rộng.' }
      ] },
      { t: 'Tây Nguyên', kho: [
        { t: 'Vùng có diện tích đất badan lớn nhất cả nước, thuận lợi cho cây công nghiệp lâu năm.', a: true, v: 'Đất badan màu mỡ, tầng phong hoá sâu, phân bố trên các cao nguyên xếp tầng.' },
        { t: 'Mùa khô kéo dài khiến thuỷ lợi trở thành vấn đề hàng đầu của vùng.', a: true, v: 'Mùa khô 4–5 tháng, mực nước ngầm hạ thấp, ảnh hưởng trực tiếp tới cà phê, hồ tiêu.' },
        { t: 'Đây là vùng có mật độ dân số cao nhất cả nước.', a: false, v: 'Tây Nguyên là vùng THƯA DÂN nhất; Đồng bằng sông Hồng mới có mật độ cao nhất.' },
        { t: 'Vùng giáp biển nên có thế mạnh về khai thác thuỷ sản.', a: false, v: 'Tây Nguyên là vùng DUY NHẤT không giáp biển của nước ta.' },
        { t: 'Vùng có tiềm năng thuỷ điện lớn trên các hệ thống sông Xê Xan, Xrê Pôk và Đồng Nai.', a: true, v: 'Địa hình cao nguyên xếp tầng tạo độ dốc lớn, thuận lợi cho thuỷ điện.' }
      ] },
      { t: 'Đông Nam Bộ', kho: [
        { t: 'Đây là vùng dẫn đầu cả nước về thu hút vốn đầu tư nước ngoài.', a: true, v: 'Nhờ cơ sở hạ tầng, lao động kĩ thuật và vị trí đầu mối giao thông.' },
        { t: 'Vùng có GRDP bình quân đầu người cao nhất cả nước.', a: true, v: 'Cơ cấu kinh tế nghiêng hẳn về công nghiệp và dịch vụ.' },
        { t: 'Dầu khí ở thềm lục địa là thế mạnh nổi bật của vùng.', a: true, v: 'Các mỏ Bạch Hổ, Rồng, Đại Hùng nằm ở thềm lục địa phía Nam.' },
        { t: 'Vùng không gặp khó khăn nào về tài nguyên nước và môi trường.', a: false, v: 'Vùng thiếu nước vào mùa khô và chịu sức ép ô nhiễm lớn do công nghiệp, đô thị hoá nhanh.' },
        { t: 'Vùng có diện tích rừng ngập mặn lớn nhất cả nước.', a: false, v: 'Rừng ngập mặn lớn nhất nằm ở Đồng bằng sông Cửu Long (Cà Mau).' }
      ] },
      { t: 'Trung du và miền núi Bắc Bộ', kho: [
        { t: 'Vùng giàu khoáng sản bậc nhất cả nước với than, sắt, thiếc, apatit.', a: true, v: 'Than tập trung ở Quảng Ninh, apatit ở Lào Cai, thiếc ở Cao Bằng, Tĩnh Túc.' },
        { t: 'Vùng có thế mạnh về cây công nghiệp cận nhiệt và ôn đới như chè, hồi, quế.', a: true, v: 'Do có mùa đông lạnh nhất cả nước và địa hình phân hoá theo độ cao.' },
        { t: 'Đây là vùng có trữ năng thuỷ điện lớn nhất cả nước.', a: true, v: 'Hệ thống sông Hồng, đặc biệt sông Đà, chiếm phần lớn trữ năng thuỷ điện quốc gia.' },
        { t: 'Thế mạnh nổi bật nhất của vùng là nuôi trồng thuỷ sản nước lợ.', a: false, v: 'Thuỷ sản nước lợ là thế mạnh của các vùng đồng bằng ven biển, không phải của vùng núi này.' },
        { t: 'Vùng có mật độ dân số và trình độ đô thị hoá cao nhất cả nước.', a: false, v: 'Đây là vùng thưa dân, đô thị hoá thấp; mật độ cao nhất thuộc về Đồng bằng sông Hồng.' }
      ] }
    ]);
    return TD.dsTu(R, `Về vùng ${v.t}, xét tính đúng/sai của các phát biểu sau:`, v.kho,
      'Mỗi vùng nhớ theo ba trục: THẾ MẠNH nổi bật · HẠN CHẾ lớn nhất · HƯỚNG giải quyết. '
      + 'Phương án sai thường là thế mạnh của vùng KHÁC bị gán nhầm sang.');
  } }

]);

TD.GEN.gdkt = (TD.GEN.gdkt || []).concat([

{ ma: 'gdkt-vdc-thue-giamtru', chuong: 'Doanh nghiệp – Thuế', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const luong = R.nguyen(20, 45);              /* triệu đồng/tháng */
    const phuThuoc = R.nguyen(0, 3);
    const bh = luong * 0.105;                    /* bảo hiểm bắt buộc 10,5% */
    const giamTru = 11 + 4.4 * phuThuoc;
    const tnTinhThue = Math.max(0, luong - bh - giamTru);
    let thue = 0;
    const b1 = Math.min(tnTinhThue, 5); thue += b1 * 0.05;
    const b2 = Math.min(Math.max(tnTinhThue - 5, 0), 5); thue += b2 * 0.10;
    const b3 = Math.min(Math.max(tnTinhThue - 10, 0), 8); thue += b3 * 0.15;
    const b4 = Math.max(tnTinhThue - 18, 0); thue += b4 * 0.20;
    const kq = T(thue, 3);
    if (kq <= 0) return null;
    return {
      q: `Anh Bình có tiền lương ${S(luong)} triệu đồng/tháng, phải đóng bảo hiểm bắt buộc bằng 10,5% tiền lương. `
        + `Anh được giảm trừ gia cảnh 11 triệu đồng cho bản thân và 4,4 triệu đồng cho mỗi người phụ thuộc; `
        + `anh có ${S(phuThuoc)} người phụ thuộc. Biểu thuế luỹ tiến từng phần: đến 5 triệu chịu 5%, `
        + `trên 5 đến 10 triệu chịu 10%, trên 10 đến 18 triệu chịu 15%, trên 18 đến 32 triệu chịu 20%. `
        + `Mỗi tháng anh Bình phải nộp bao nhiêu triệu đồng thuế thu nhập cá nhân? `
        + `(làm tròn đến hàng phần nghìn)`,
      ans: D(kq, 3),
      giai: `Bước 1 — các khoản được trừ trước khi tính thuế:\n`
        + `  Bảo hiểm bắt buộc = ${S(luong)} × 10,5% = ${S(bh, 4)} triệu\n`
        + `  Giảm trừ gia cảnh = 11 + 4,4 × ${S(phuThuoc)} = ${S(giamTru, 1)} triệu\n`
        + `Bước 2 — thu nhập TÍNH THUẾ (không phải thu nhập chịu thuế):\n`
        + `  ${S(luong)} − ${S(bh, 4)} − ${S(giamTru, 1)} = ${S(tnTinhThue, 4)} triệu\n`
        + `Bước 3 — áp biểu luỹ tiến TỪNG PHẦN:\n`
        + `  Bậc 1: ${S(b1, 3)} × 5% = ${S(b1 * 0.05, 4)}\n`
        + (b2 > 0 ? `  Bậc 2: ${S(b2, 3)} × 10% = ${S(b2 * 0.10, 4)}\n` : '')
        + (b3 > 0 ? `  Bậc 3: ${S(b3, 3)} × 15% = ${S(b3 * 0.15, 4)}\n` : '')
        + (b4 > 0 ? `  Bậc 4: ${S(b4, 3)} × 20% = ${S(b4 * 0.20, 4)}\n` : '')
        + `  Tổng thuế = ${D(kq, 3)} triệu đồng/tháng.`,
      meo: 'Ba bước không được bỏ: TRỪ bảo hiểm → TRỪ giảm trừ gia cảnh → mới áp biểu thuế. '
        + 'Lấy thẳng lương nhân thuế suất là sai hoàn toàn về bản chất.'
    };
  } },

{ ma: 'gdkt-vdc-ds-tinhhuong', chuong: 'Quyền & nghĩa vụ', muc: 4, dang: 'ds',
  tao(R) {
    const kho = [
      { t: 'Mọi công dân đều bình đẳng trước pháp luật về quyền, nghĩa vụ và trách nhiệm pháp lí.', a: true,
        v: 'Bình đẳng trước pháp luật gồm đủ cả BA mặt, không phân biệt dân tộc, giới tính, tôn giáo, địa vị xã hội.' },
      { t: 'Người có địa vị xã hội cao thì được giảm nhẹ trách nhiệm pháp lí khi vi phạm.', a: false,
        v: 'Trái hẳn nguyên tắc bình đẳng. Địa vị xã hội không phải là tình tiết giảm nhẹ theo pháp luật.' },
      { t: 'Một hành vi vi phạm có thể đồng thời làm phát sinh nhiều loại trách nhiệm pháp lí.', a: true,
        v: 'Ví dụ gây tai nạn giao thông nghiêm trọng vừa chịu trách nhiệm hình sự vừa phải bồi thường dân sự.' },
      { t: 'Chỉ người từ đủ 18 tuổi trở lên mới phải chịu trách nhiệm hình sự.', a: false,
        v: 'Người từ đủ 14 đến dưới 16 tuổi phải chịu trách nhiệm hình sự về tội rất nghiêm trọng và đặc biệt nghiêm trọng; từ đủ 16 tuổi chịu trách nhiệm về mọi tội phạm.' },
      { t: 'Công dân có quyền tố cáo mọi hành vi vi phạm pháp luật mà mình biết, kể cả khi mình không bị thiệt hại.', a: true,
        v: 'Khác với khiếu nại (chỉ người bị ảnh hưởng trực tiếp mới thực hiện), quyền tố cáo thuộc về MỌI công dân.' },
      { t: 'Người sử dụng lao động có quyền đơn phương chấm dứt hợp đồng bất cứ lúc nào mà không cần lí do.', a: false,
        v: 'Việc chấm dứt hợp đồng phải theo đúng căn cứ và trình tự luật định, kèm nghĩa vụ báo trước.' },
      { t: 'Nộp thuế đầy đủ và đúng hạn vừa là nghĩa vụ pháp lí vừa thể hiện trách nhiệm công dân.', a: true,
        v: 'Thuế là nguồn thu chủ yếu của ngân sách, dùng để chi cho giáo dục, y tế, quốc phòng và an sinh xã hội.' },
      { t: 'Bắt người phạm tội quả tang là hành vi vi phạm quyền bất khả xâm phạm về thân thể.', a: false,
        v: 'Phạm tội QUẢ TANG và người đang bị truy nã là hai ngoại lệ mà bất kì ai cũng có quyền bắt rồi giải ngay đến cơ quan có thẩm quyền.' }
    ];
    return TD.dsTu(R, 'Về quyền, nghĩa vụ và trách nhiệm pháp lí của công dân, '
      + 'xét tính đúng/sai của các phát biểu sau:', kho,
      'Câu tình huống pháp luật giải bằng ba câu hỏi: hành vi xâm phạm QUAN HỆ nào · '
      + 'mức độ đã đến ngưỡng TỘI PHẠM chưa · chủ thể đã đủ TUỔI chịu trách nhiệm chưa.');
  } }

]);

/* ==========================================================
   VĂN – ANH — VẬN DỤNG CAO
   ========================================================== */
TD.GEN.van = (TD.GEN.van || []).concat([

{ ma: 'van-vdc-phantich', chuong: 'Nghị luận văn học', muc: 4, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { q: 'Khi phân tích một đoạn thơ, thao tác nào sau đây thể hiện đúng yêu cầu của bài nghị luận văn học?',
        d: 'Bám vào từ ngữ, hình ảnh, nhịp điệu và biện pháp tu từ cụ thể để làm sáng tỏ nội dung và tình cảm',
        v: 'Nghị luận văn học đòi hỏi phân tích CHẤT LIỆU nghệ thuật. Diễn xuôi ý thơ là lỗi làm mất nhiều điểm nhất.',
        s: ['Kể lại nội dung đoạn thơ bằng lời văn xuôi cho dễ hiểu',
            'Giới thiệu thật dài về tiểu sử tác giả và hoàn cảnh sáng tác',
            'Trích dẫn nhiều nhận định của các nhà phê bình thay cho phân tích'] },
      { q: 'Điều gì tạo nên khác biệt giữa một bài nghị luận văn học đạt điểm khá và một bài đạt điểm giỏi?',
        d: 'Bài điểm giỏi có phần đánh giá, mở rộng, liên hệ và chỉ ra được đóng góp riêng của tác giả',
        v: 'Phân tích đúng mới chỉ đạt yêu cầu cơ bản. Tầng đánh giá – khái quát mới cho thấy chiều sâu tư duy.',
        s: ['Bài điểm giỏi dài hơn và trích dẫn nhiều thơ hơn',
            'Bài điểm giỏi dùng nhiều từ Hán Việt và câu văn phức tạp',
            'Bài điểm giỏi mở bài dài và công phu hơn'] },
      { q: 'Với đề so sánh hai đoạn trích, tầng lập luận nào là cao nhất mà bài viết cần đạt tới?',
        d: 'Lí giải NGUYÊN NHÂN của sự khác biệt từ hoàn cảnh sáng tác, phong cách tác giả và đặc trưng thể loại',
        v: 'Chỉ ra giống và khác mới là mô tả. Lí giải vì sao khác nhau mới là tư duy so sánh thực sự.',
        s: ['Liệt kê thật nhiều điểm giống nhau giữa hai đoạn trích',
            'Khẳng định đoạn trích nào hay hơn đoạn trích nào',
            'Tóm tắt lại nội dung của cả hai tác phẩm'] },
      { q: 'Khi đề yêu cầu viết đoạn văn 200 chữ nghị luận về một khía cạnh của tác phẩm, cách làm nào đúng?',
        d: 'Tập trung phân tích đúng khía cạnh được hỏi, chọn một vài dẫn chứng tiêu biểu và viết liền mạch không xuống dòng',
        v: 'Dung lượng nhỏ nên phải chọn lọc. Xuống dòng chia ba phần là biến đoạn thành bài, bị trừ điểm hình thức.',
        s: ['Tóm tắt toàn bộ tác phẩm rồi mới đi vào khía cạnh được hỏi',
            'Chia thành ba đoạn mở – thân – kết cho rõ bố cục',
            'Nêu càng nhiều dẫn chứng càng tốt để chứng tỏ thuộc bài'] },
      { q: 'Trong bài nghị luận xã hội, phần nào thường quyết định việc bài viết có vượt lên mức trung bình khá hay không?',
        d: 'Phần bàn luận mở rộng: lật ngược vấn đề, phê phán biểu hiện trái chiều và rút ra bài học nhận thức, hành động',
        v: 'Bài chỉ khẳng định một chiều thường dừng ở mức trung bình khá vì thiếu tư duy phản biện.',
        s: ['Phần mở bài dẫn dắt thật ấn tượng',
            'Phần giải thích khái niệm thật chi tiết và dài',
            'Phần kể dẫn chứng thật nhiều và thật cụ thể'] }
    ]);
    return MC2(R, it.q, it,
      'Điểm phần Viết chấm theo năm tiêu chí: cấu trúc · xác định đúng vấn đề · triển khai nội dung · '
      + 'chính tả và diễn đạt · sáng tạo. Hai tiêu chí cuối chiếm khoảng 0,5 điểm, đủ đổi một bậc điểm.');
  } },

{ ma: 'van-vdc-doc', chuong: 'Đọc hiểu', muc: 4, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { ng: 'Không có gì tự đến đâu con / Quả muốn ngọt phải tháng ngày tích nhựa / Hoa sẽ thơm khi đã qua nắng lửa',
        q: 'Thông điệp chính mà tác giả gửi gắm là gì?',
        d: 'Mọi thành quả tốt đẹp đều phải đánh đổi bằng quá trình tích luỹ và thử thách bền bỉ',
        v: 'Hai hình ảnh "quả tích nhựa" và "hoa qua nắng lửa" đều là ẩn dụ cho quá trình rèn giũa; câu đầu nêu trực tiếp chủ đề.',
        s: ['Con người nên biết chờ đợi may mắn đến với mình',
            'Thiên nhiên luôn vận động theo quy luật riêng của nó',
            'Cha mẹ luôn mong con cái sống một cuộc đời êm ả'] },
      { ng: 'Ta hay chê cuộc đời méo mó / Sao ta không tròn ngay tự trong tâm',
        q: 'Hai câu thơ thể hiện quan niệm sống nào?',
        d: 'Thay vì trách hoàn cảnh, mỗi người cần tự hoàn thiện chính mình từ bên trong',
        v: 'Phép đối "méo mó" – "tròn" đặt cuộc đời bên ngoài đối lập với cái tâm bên trong, hàm ý chuyển hướng nỗ lực vào bản thân.',
        s: ['Cuộc đời vốn không hoàn hảo nên con người phải chấp nhận buông xuôi',
            'Con người nên tránh xa những điều tiêu cực của xã hội',
            'Phê phán những người hay than vãn nhưng không đưa ra giải pháp'] },
      { ng: 'Nếu là con chim, chiếc lá / Thì con chim phải hót, chiếc lá phải xanh / Lẽ nào vay mà không có trả / Sống là cho, đâu chỉ nhận riêng mình',
        q: 'Biện pháp tu từ nổi bật và tác dụng của nó trong đoạn thơ là gì?',
        d: 'Điệp cấu trúc kết hợp câu hỏi tu từ, nhấn mạnh lẽ sống cống hiến và buộc người đọc tự vấn',
        v: 'Mô hình "Nếu là… thì… phải…" lặp lại tạo nhịp khẳng định; câu "Lẽ nào vay mà không có trả" là câu hỏi tu từ, không nhằm hỏi mà nhằm khẳng định.',
        s: ['Nhân hoá, khiến hình ảnh chim và lá trở nên có hồn',
            'Nói quá, nhằm phóng đại vai trò của mỗi cá nhân',
            'So sánh, đối chiếu con người với thiên nhiên'] },
      { ng: 'Quê hương mỗi người chỉ một / Như là chỉ một mẹ thôi',
        q: 'Biện pháp tu từ được sử dụng và hiệu quả của nó là gì?',
        d: 'So sánh, đặt quê hương ngang với mẹ để nhấn mạnh sự duy nhất và thiêng liêng không gì thay thế',
        v: 'Từ so sánh "như" nối hai vế; chọn hình ảnh "mẹ" — thứ duy nhất và thiêng liêng nhất với mỗi người — làm chuẩn so sánh.',
        s: ['Ẩn dụ, ngầm ví quê hương với người mẹ mà không dùng từ so sánh',
            'Hoán dụ, lấy hình ảnh mẹ để chỉ toàn thể gia đình',
            'Điệp ngữ, lặp lại từ "chỉ một" để nhấn mạnh số lượng'] }
    ]);
    return MC2(R, `Đọc ngữ liệu sau và trả lời câu hỏi:\n\n"${it.ng}"\n\n${it.q}`, it,
      'Câu vận dụng của phần Đọc hiểu luôn đòi hỏi ĐỌC CẢ ĐOẠN chứ không bắt từ khoá lẻ. '
      + 'Phương án nhiễu thường đúng một phần rồi bẻ lái sang ý khác.');
  } }

]);

TD.GEN.anh = (TD.GEN.anh || []).concat([

{ ma: 'anh-vdc-cloze', chuong: 'Cấu trúc – Chiến thuật', muc: 4, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { q: 'Many students find it hard to concentrate in class. ____, schools are now limiting the use of phones during lessons.',
        d: 'Therefore', s: ['However', 'Although', 'Despite'],
        v: 'Hai câu có quan hệ NGUYÊN NHÂN – KẾT QUẢ nên dùng "Therefore". "However" chỉ tương phản; "Although" và "Despite" không đứng đầu câu độc lập theo cách này.' },
      { q: 'Solar power is clean and renewable. ____, the cost of installing panels remains high for many households.',
        d: 'However', s: ['Therefore', 'Moreover', 'As a result'],
        v: 'Vế sau nêu điều TRÁI với ưu điểm ở vế trước ⇒ từ nối tương phản "However".' },
      { q: 'Reading widens your vocabulary. ____, it improves your ability to think critically.',
        d: 'Moreover', s: ['However', 'Nevertheless', 'On the contrary'],
        v: 'Vế sau BỔ SUNG thêm một lợi ích nữa cùng chiều ⇒ dùng "Moreover".' },
      { q: 'The factory released untreated waste into the river. ____, thousands of fish died within a week.',
        d: 'As a result', s: ['In contrast', 'Nevertheless', 'Otherwise'],
        v: 'Vế sau là HẬU QUẢ trực tiếp của vế trước ⇒ "As a result".' },
      { q: 'You should book your ticket early. ____, you may not get a seat during the holiday.',
        d: 'Otherwise', s: ['Therefore', 'Moreover', 'Similarly'],
        v: '"Otherwise" = nếu không thì; vế sau nêu hậu quả của việc KHÔNG làm điều ở vế trước.' },
      { q: 'City life offers more job opportunities. ____, it also brings pollution and high living costs.',
        d: 'On the other hand', s: ['As a result', 'For example', 'In addition'],
        v: 'Vế sau nêu MẶT KHÁC, đối lập với lợi ích ở vế trước ⇒ "On the other hand".' }
    ]);
    return MC2(R, `Chọn từ nối phù hợp nhất để điền vào chỗ trống:\n\n${it.q}`, it,
      'Bài điền từ đoạn văn phần lớn là TỪ NỐI. Xác định quan hệ giữa hai câu trước: '
      + 'cùng chiều (moreover, in addition) · trái chiều (however, on the other hand) · '
      + 'nhân quả (therefore, as a result) · điều kiện phủ định (otherwise).');
  } },

{ ma: 'anh-vdc-doanvan', chuong: 'Cấu trúc – Chiến thuật', muc: 4, dang: 'mc',
  tao(R) {
    const bai = {
      t: 'Urban farming is gaining popularity in many big cities. People grow vegetables on rooftops, balconies and '
       + 'even in abandoned lots. Supporters say it shortens the distance food travels, cuts transport emissions and '
       + 'gives city dwellers fresh produce. Critics, however, point out that urban soil is often contaminated and that '
       + 'the yields are far too small to feed a whole city. Most experts agree that urban farming will not replace '
       + 'traditional agriculture, but it can make city life greener and reconnect people with the food they eat.'
    };
    const it = R.chon([
      { q: 'What is the main idea of the passage?',
        d: 'Urban farming has real benefits and real limits, and works best as a complement to traditional agriculture',
        v: 'Đoạn văn nêu cả ưu điểm lẫn phê phán rồi chốt bằng câu cuối: nó không thay thế được nông nghiệp truyền thống nhưng làm thành phố xanh hơn — đó chính là ý bao trùm.',
        s: ['Urban farming will soon replace traditional agriculture in big cities',
            'Growing vegetables on rooftops is the cheapest way to produce food',
            'City soil is too polluted for any kind of farming to succeed'] },
      { q: 'According to the passage, which is a benefit of urban farming?',
        d: 'It reduces the emissions produced by transporting food',
        v: 'Câu thứ ba nêu rõ "cuts transport emissions" — rút ngắn quãng đường vận chuyển thực phẩm.',
        s: ['It produces enough food to feed an entire city',
            'It completely removes contamination from urban soil',
            'It lowers the price of land in the city centre'] },
      { q: 'The word "yields" in the passage is closest in meaning to ____.',
        d: 'amounts of crops produced',
        v: '"Yield" ở đây là danh từ chỉ SẢN LƯỢNG thu hoạch; ngữ cảnh "far too small to feed a whole city" xác nhận nghĩa này.',
        s: ['profits from selling land', 'numbers of people involved', 'kinds of vegetables grown'] },
      { q: 'What can be inferred about the author\'s attitude?',
        d: 'Balanced — the author presents both support and criticism without taking an extreme side',
        v: 'Tác giả dùng "Supporters say…" rồi "Critics, however, point out…" và kết bằng "Most experts agree" — giọng điệu trung lập, cân bằng.',
        s: ['Strongly opposed to urban farming',
            'Completely convinced that urban farming solves food shortages',
            'Uninterested in the topic and merely listing facts'] },
      { q: 'Which of the following is NOT mentioned as a place for urban farming?',
        d: 'School playgrounds',
        v: 'Đoạn văn nhắc tới rooftops, balconies và abandoned lots. "School playgrounds" không hề xuất hiện.',
        s: ['Rooftops', 'Balconies', 'Abandoned lots'] }
    ]);
    return MC2(R, `Read the passage and answer the question.\n\n${bai.t}\n\n${it.q}`, it,
      'Bài đọc hiểu: ① câu ý chính phải KHÁI QUÁT cả bài, phương án quá chi tiết là bẫy '
      + '② câu "NOT mentioned" phải đối chiếu từng phương án với bài ③ câu từ vựng phải đoán theo NGỮ CẢNH '
      + 'chứ không theo nghĩa quen thuộc nhất của từ.');
  } }

]);

})();
