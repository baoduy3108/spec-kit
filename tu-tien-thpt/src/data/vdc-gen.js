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

})();
