/* ============================================================
   VẬN DỤNG CAO — BÙ ĐÚNG NHỮNG CHUYÊN ĐỀ CÒN TRỐNG
   Đo lại độ phủ mức 4 theo từng chuyên đề thì thấy: khối xã hội
   đủ 100% (vì kho mệnh đề có mức 4), nhưng khối tự nhiên bị chặn
   trần mức 3 ở phần lý thuyết nên mức 4 phải do bộ sinh gánh —
   và đúng những chỗ đề thật hay ra câu 9–10 thì lại trống:
     · Hoá — peptide · kim loại + HNO₃ · nhiệt động ΔrH ·
             polymer lưu hoá · đồ thị kết tủa nhôm
     · Sinh — sinh thái học (hiệu suất, lưới thức ăn)
     · Toán — cấp số trong bài toán thực tế
   Thiếu mấy dạng này thì luyện mãi vẫn chỉ tới 9,0 chứ không lên
   được 9,5. File này lấp đúng chỗ đó.
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {};

(function () {
const S = TD.soVN, T = TD.lamTron, D = TD.dapSo;

/* ============================================================
   HOÁ HỌC
   ============================================================ */
TD.GEN.hoa = (TD.GEN.hoa || []).concat([

/* --- Thuỷ phân peptide bằng kiềm: bảo toàn khối lượng --- */
{ ma: 'hoa-vdc-peptide', chuong: 'Amine – Amino acid – Peptide', muc: 4, dang: 'tln',
  tao(R) {
    const soGly = R.nguyen(1, 4), soAla = R.nguyen(1, 3);
    const n = soGly + soAla;                       /* số mắt xích */
    if (n < 2 || n > 6) return null;
    const Mp = 75 * soGly + 89 * soAla - 18 * (n - 1);
    const x = R.chon([0.05, 0.1, 0.15, 0.2, 0.25, 0.3]);
    const mP = T(Mp * x, 4);
    const nNaOH = n * x;
    const mMuoi = T(mP + 40 * nNaOH - 18 * x, 4);
    const ten = n === 2 ? 'đipeptit' : n === 3 ? 'tripeptit' : n === 4 ? 'tetrapeptit' : n + ' mắt xích';
    return {
      q: `Peptit X mạch hở được tạo thành từ ${soGly} gốc glycine và ${soAla} gốc alanine. `
        + `Thuỷ phân hoàn toàn ${S(mP, 4)} gam X trong dung dịch NaOH vừa đủ, thu được m gam hỗn hợp muối. `
        + `Giá trị của m là bao nhiêu? (Gly = 75; Ala = 89; NaOH = 40; H₂O = 18; làm tròn đến hàng phần trăm)`,
      ans: D(mMuoi, 2),
      giai: `Bước 1 — X là ${ten}, phân tử khối tính theo công thức peptit:\n`
        + `  M(X) = 75×${soGly} + 89×${soAla} − 18×(${n} − 1) = ${S(75 * soGly)} + ${S(89 * soAla)} − ${S(18 * (n - 1))} = ${S(Mp)}.\n`
        + `Bước 2 — số mol X: n(X) = ${S(mP, 4)}/${S(Mp)} = ${S(x, 3)} mol.\n`
        + `Bước 3 — phương trình thuỷ phân bằng kiềm: X + ${n}NaOH → muối + H₂O.\n`
        + `  Một mol peptit ${n} mắt xích cần đúng ${n} mol NaOH và chỉ sinh ra 1 mol H₂O (không phải ${n} mol).\n`
        + `  n(NaOH) = ${n}×${S(x, 3)} = ${S(nNaOH, 3)} mol · n(H₂O) = ${S(x, 3)} mol.\n`
        + `Bước 4 — bảo toàn khối lượng cho cả phản ứng:\n`
        + `  m(muối) = m(X) + m(NaOH) − m(H₂O) = ${S(mP, 4)} + 40×${S(nNaOH, 3)} − 18×${S(x, 3)}\n`
        + `  = ${S(mP, 4)} + ${S(40 * nNaOH, 3)} − ${S(18 * x, 3)} = ${D(mMuoi, 2)} gam.`,
      meo: 'Chỗ chết người của dạng này là số mol nước. Thuỷ phân bằng KIỀM chỉ sinh 1 mol H₂O cho mỗi mol peptit, '
        + 'còn thuỷ phân bằng ACID hoặc thuỷ phân hoàn toàn trong nước mới sinh (n − 1) mol H₂O. Nhớ sai một chỗ này là lệch hẳn đáp số.'
    };
  } },

/* --- Hỗn hợp kim loại tác dụng HNO₃ loãng: bảo toàn electron --- */
{ ma: 'hoa-vdc-kimloai-hno3', chuong: 'Đại cương kim loại', muc: 4, dang: 'tln',
  tao(R) {
    const nMg = R.nguyen(1, 8) * 0.05, nAl = R.nguyen(1, 8) * 0.05;
    const m = T(24 * nMg + 27 * nAl, 3);
    const ne = 2 * nMg + 3 * nAl;
    const nNO = ne / 3;
    const V = T(nNO * 24.79, 4);
    return {
      q: `Hoà tan hoàn toàn ${S(m, 3)} gam hỗn hợp gồm ${S(nMg, 2)} mol Mg và ${S(nAl, 2)} mol Al `
        + `bằng dung dịch HNO₃ loãng dư, thu được V lít khí NO (sản phẩm khử duy nhất, ở điều kiện chuẩn). `
        + `Giá trị của V là bao nhiêu? (Mg = 24; Al = 27; 1 mol khí chiếm 24,79 L; làm tròn đến hàng phần trăm)`,
      ans: D(V, 2),
      giai: `Bước 1 — xác định số oxi hoá thay đổi. Mg → Mg²⁺ nhường 2 electron, Al → Al³⁺ nhường 3 electron.\n`
        + `  Bên nhận: N⁺⁵ trong HNO₃ → N⁺² trong NO, tức mỗi phân tử NO nhận 3 electron.\n`
        + `Bước 2 — tổng số mol electron kim loại nhường:\n`
        + `  n(e cho) = 2×${S(nMg, 2)} + 3×${S(nAl, 2)} = ${S(2 * nMg, 2)} + ${S(3 * nAl, 2)} = ${S(ne, 3)} mol.\n`
        + `Bước 3 — bảo toàn electron: n(e cho) = n(e nhận) = 3×n(NO).\n`
        + `  n(NO) = ${S(ne, 3)}/3 = ${S(nNO, 4)} mol.\n`
        + `Bước 4 — quy về thể tích ở điều kiện chuẩn:\n`
        + `  V = ${S(nNO, 4)} × 24,79 = ${D(V, 2)} lít.`,
      meo: 'Bảo toàn electron cho phép bỏ qua toàn bộ phương trình phản ứng — chỉ cần biết mỗi kim loại nhường mấy electron '
        + 'và sản phẩm khử nhận mấy electron. Nhớ bảng: NO nhận 3e · NO₂ nhận 1e · N₂O nhận 8e · N₂ nhận 10e · NH₄NO₃ nhận 8e.'
    };
  } },

/* --- Biến thiên enthalpy chuẩn của phản ứng --- */
{ ma: 'hoa-vdc-nhietdong', chuong: 'Nhiệt động – Tốc độ – Cân bằng', muc: 4, dang: 'tln',
  tao(R) {
    const PU = [
      { pt: 'CH₄(g) + 2O₂(g) → CO₂(g) + 2H₂O(l)', sp: [['CO₂(g)', 1, -393.5], ['H₂O(l)', 2, -285.8]],
        cd: [['CH₄(g)', 1, -74.6], ['O₂(g)', 2, 0]] },
      { pt: 'C₂H₆(g) + 7/2 O₂(g) → 2CO₂(g) + 3H₂O(l)', sp: [['CO₂(g)', 2, -393.5], ['H₂O(l)', 3, -285.8]],
        cd: [['C₂H₆(g)', 1, -84.0], ['O₂(g)', 3.5, 0]] },
      { pt: 'C₂H₄(g) + 3O₂(g) → 2CO₂(g) + 2H₂O(l)', sp: [['CO₂(g)', 2, -393.5], ['H₂O(l)', 2, -285.8]],
        cd: [['C₂H₄(g)', 1, 52.4], ['O₂(g)', 3, 0]] },
      { pt: 'C₂H₂(g) + 5/2 O₂(g) → 2CO₂(g) + H₂O(l)', sp: [['CO₂(g)', 2, -393.5], ['H₂O(l)', 1, -285.8]],
        cd: [['C₂H₂(g)', 1, 227.4], ['O₂(g)', 2.5, 0]] },
      { pt: 'CaCO₃(s) → CaO(s) + CO₂(g)', sp: [['CaO(s)', 1, -635.1], ['CO₂(g)', 1, -393.5]],
        cd: [['CaCO₃(s)', 1, -1207.6]] },
      { pt: '2SO₂(g) + O₂(g) → 2SO₃(g)', sp: [['SO₃(g)', 2, -395.7]],
        cd: [['SO₂(g)', 2, -296.8], ['O₂(g)', 1, 0]] },
      { pt: 'N₂(g) + O₂(g) → 2NO(g)', sp: [['NO(g)', 2, 91.3]],
        cd: [['N₂(g)', 1, 0], ['O₂(g)', 1, 0]] },
      { pt: '4NH₃(g) + 5O₂(g) → 4NO(g) + 6H₂O(g)', sp: [['NO(g)', 4, 91.3], ['H₂O(g)', 6, -241.8]],
        cd: [['NH₃(g)', 4, -45.9], ['O₂(g)', 5, 0]] },
      { pt: '2NO(g) + O₂(g) → 2NO₂(g)', sp: [['NO₂(g)', 2, 33.2]],
        cd: [['NO(g)', 2, 91.3], ['O₂(g)', 1, 0]] },
      { pt: 'C₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(l)', sp: [['CO₂(g)', 3, -393.5], ['H₂O(l)', 4, -285.8]],
        cd: [['C₃H₈(g)', 1, -105.0], ['O₂(g)', 5, 0]] },
      { pt: 'C₂H₅OH(l) + 3O₂(g) → 2CO₂(g) + 3H₂O(l)', sp: [['CO₂(g)', 2, -393.5], ['H₂O(l)', 3, -285.8]],
        cd: [['C₂H₅OH(l)', 1, -277.6], ['O₂(g)', 3, 0]] },
      { pt: '2H₂(g) + O₂(g) → 2H₂O(l)', sp: [['H₂O(l)', 2, -285.8]],
        cd: [['H₂(g)', 2, 0], ['O₂(g)', 1, 0]] },
      { pt: 'Fe₂O₃(s) + 3CO(g) → 2Fe(s) + 3CO₂(g)', sp: [['Fe(s)', 2, 0], ['CO₂(g)', 3, -393.5]],
        cd: [['Fe₂O₃(s)', 1, -825.5], ['CO(g)', 3, -110.5]] }
    ];
    const it = R.chon(PU);
    const tong = ds => ds.reduce((a, b) => a + b[1] * b[2], 0);
    const dH1 = T(tong(it.sp) - tong(it.cd), 2);
    const boi = R.chon([1, 1, 2, 2.5, 3, 4, 5]);        /* hỏi cho bội số của phương trình cho sẵn */
    const dH = T(dH1 * boi, 2);
    const bang = ds => ds.filter(x => x[2] !== 0)
      .map(x => `ΔfH°₂₉₈[${x[0]}] = ${TD.so(x[2])} kJ/mol`).join(' · ');
    const doiSo = ds => ds.map(x => `${x[1] === 1 ? '' : S(x[1]) + '×'}(${TD.so(x[2])})`).join(' + ');
    return {
      q: `Cho phản ứng: ${it.pt}\nBiết ${bang(it.sp.concat(it.cd))}; enthalpy tạo thành của đơn chất bền bằng 0. `
        + (boi === 1
            ? `Tính biến thiên enthalpy chuẩn ΔrH°₂₉₈ của phản ứng trên theo kJ. (làm tròn đến hàng phần chục)`
            : `Tính nhiệt lượng kèm theo khi phản ứng xảy ra với lượng chất gấp ${S(boi, 1)} lần hệ số trong phương trình trên, theo kJ. (làm tròn đến hàng phần chục)`),
      ans: D(dH, 1),
      giai: `Bước 1 — công thức: ΔrH°₂₉₈ = Σ ΔfH°₂₉₈(sản phẩm) − Σ ΔfH°₂₉₈(chất đầu), mỗi số hạng nhân với hệ số trong phương trình.\n`
        + `Bước 2 — tổng phía sản phẩm:\n  ${doiSo(it.sp)} = ${TD.so(T(tong(it.sp), 2))} kJ.\n`
        + `Bước 3 — tổng phía chất đầu (đơn chất bền như O₂, N₂ có ΔfH°₂₉₈ = 0 nên bỏ qua):\n`
        + `  ${doiSo(it.cd)} = ${TD.so(T(tong(it.cd), 2))} kJ.\n`
        + `Bước 4 — lấy hiệu:\n  ΔrH°₂₉₈ = ${TD.so(T(tong(it.sp), 2))} − (${TD.so(T(tong(it.cd), 2))}) = ${D(dH1, 1)} kJ cho đúng phương trình đã cho.\n`
        + (boi === 1 ? '' : `Bước 5 — nhiệt lượng tỉ lệ thuận với lượng chất phản ứng:\n  Q = ${D(dH1, 1)} × ${S(boi, 1)} = ${D(dH, 1)} kJ.\n`)
        + `Bước ${boi === 1 ? 5 : 6} — kết luận: giá trị ${dH < 0 ? 'ÂM nên phản ứng TOẢ nhiệt' : 'DƯƠNG nên phản ứng THU nhiệt'}.`,
      meo: 'Ba điều hay sai: ① quên nhân hệ số cân bằng vào từng chất ② quên đổi dấu khi trừ tổng chất đầu (trừ một số âm là cộng) '
        + '③ gán ΔfH khác 0 cho đơn chất bền — O₂, N₂, H₂, C(graphite), kim loại ở dạng bền đều bằng 0 theo quy ước.'
    };
  } },

/* --- Cao su lưu hoá: tìm số mắt xích ứng với một cầu disulfide --- */
{ ma: 'hoa-vdc-polymer-luuhoa', chuong: 'Polymer', muc: 4, dang: 'tln',
  tao(R) {
    const loai = R.chon([{ ten: 'cao su isopren', M: 68, ct: 'C₅H₈' }, { ten: 'cao su buna', M: 54, ct: 'C₄H₆' }]);
    const k = R.nguyen(12, 60);
    const pS = 64 / (loai.M * k + 64) * 100;
    if (pS < 1.5 || pS > 8) return null;
    return {
      q: `Lưu hoá ${loai.ten} thu được sản phẩm chứa ${S(pS, 2)}% lưu huỳnh về khối lượng. `
        + `Giả thiết cứ k mắt xích ${loai.ct} thì có một cầu nối −S−S−. Giá trị của k là bao nhiêu? `
        + `(${loai.ct} = ${loai.M}; S = 32)`,
      ans: String(k),
      giai: `Bước 1 — dựng đơn vị lặp lại của cao su đã lưu hoá: gồm k mắt xích ${loai.ct} cộng một cầu −S−S− (hai nguyên tử S).\n`
        + `  Khối lượng phần cao su: ${loai.M}k · khối lượng phần lưu huỳnh: 2×32 = 64.\n`
        + `Bước 2 — lập biểu thức phần trăm lưu huỳnh:\n`
        + `  %S = 64/(${loai.M}k + 64) × 100 = ${S(pS, 2)}\n`
        + `Bước 3 — giải phương trình theo k:\n`
        + `  ${loai.M}k + 64 = 64×100/${S(pS, 2)} = ${S(T(64 * 100 / pS, 2), 2)}\n`
        + `  ${loai.M}k = ${S(T(64 * 100 / pS - 64, 2), 2)} ⇒ k = ${k}.\n`
        + `Bước 4 — kiểm lại: 64/(${loai.M}×${k} + 64) × 100 = ${S(pS, 2)}% đúng bằng dữ kiện đề cho.`,
      meo: 'Cầu nối −S−S− có HAI nguyên tử lưu huỳnh nên khối lượng là 64 chứ không phải 32 — đây là chỗ mất điểm phổ biến nhất. '
        + 'Cũng đừng nhầm phân tử khối mắt xích: isopren C₅H₈ là 68, còn buta-1,3-đien C₄H₆ là 54.'
    };
  } },

/* --- Đồ thị kết tủa nhôm: hai giá trị OH⁻ cho cùng lượng kết tủa --- */
{ ma: 'hoa-vdc-al-naoh', chuong: 'IA – IIA – Nhôm', muc: 4, dang: 'tln',
  tao(R) {
    const a = R.nguyen(2, 16) * 0.05;            /* mol AlCl₃ */
    const tyLe = R.chon([0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8]);
    const x = T(a * tyLe, 4);                    /* mol kết tủa thu được */
    const bMax = T(4 * a - x, 4);
    const bMin = T(3 * x, 4);
    if (bMax <= bMin) return null;
    const mKT = T(78 * x, 3);
    const hoi = R.chon(['max', 'min', 'tong']);
    const dap = hoi === 'max' ? bMax : hoi === 'min' ? bMin : T(bMax + bMin, 4);
    const chuHoi = hoi === 'max' ? 'có thể nhận giá trị LỚN NHẤT là bao nhiêu'
      : hoi === 'min' ? 'có thể nhận giá trị NHỎ NHẤT là bao nhiêu'
      : 'có hai giá trị thoả mãn; tổng của hai giá trị đó bằng bao nhiêu';
    return {
      q: `Cho từ từ dung dịch NaOH vào dung dịch chứa ${S(a, 2)} mol AlCl₃, thu được ${S(mKT, 3)} gam kết tủa. `
        + `Số mol NaOH đã dùng ${chuHoi}? (Al = 27; O = 16; H = 1; làm tròn đến hàng phần trăm)`,
      ans: D(dap, 2),
      giai: `Bước 1 — đổi khối lượng kết tủa Al(OH)₃ (M = 78) ra số mol:\n`
        + `  n[Al(OH)₃] = ${S(mKT, 3)}/78 = ${S(x, 4)} mol, nhỏ hơn ${S(a, 2)} mol Al³⁺ ban đầu.\n`
        + `Bước 2 — kết tủa chưa cực đại nên bài toán có HAI nghiệm, ứng với hai nhánh của đồ thị:\n`
        + `  · Nhánh đi lên — NaOH thiếu, chỉ mới tạo kết tủa: Al³⁺ + 3OH⁻ → Al(OH)₃\n`
        + `    n(NaOH) = 3×${S(x, 4)} = ${S(bMin, 4)} mol.\n`
        + `  · Nhánh đi xuống — NaOH dư, kết tủa cực đại rồi bị hoà tan bớt: Al(OH)₃ + OH⁻ → AlO₂⁻ + 2H₂O\n`
        + `    n(NaOH) = 4×n(Al³⁺) − n(kết tủa) = 4×${S(a, 2)} − ${S(x, 4)} = ${S(bMax, 4)} mol.\n`
        + (hoi === 'max' ? `Bước 3 — đề hỏi giá trị LỚN NHẤT nên lấy nghiệm ở nhánh đi xuống: ${D(bMax, 2)} mol.`
           : hoi === 'min' ? `Bước 3 — đề hỏi giá trị NHỎ NHẤT nên lấy nghiệm ở nhánh đi lên: ${D(bMin, 2)} mol.`
           : `Bước 3 — đề hỏi TỔNG hai giá trị: ${S(bMin, 4)} + ${S(bMax, 4)} = ${D(dap, 2)} mol.`),
      meo: 'Vẽ nhanh đồ thị hình tam giác lệch: đi lên tới đỉnh tại n(OH⁻) = 3a rồi đi xuống về 0 tại n(OH⁻) = 4a. '
        + 'Hễ lượng kết tủa nhỏ hơn cực đại là chắc chắn có hai nghiệm — đọc kĩ đề hỏi "lớn nhất", "nhỏ nhất" hay "tổng hai giá trị".'
    };
  } }

]);

/* ============================================================
   SINH HỌC — SINH THÁI
   ============================================================ */
TD.GEN.sinh = (TD.GEN.sinh || []).concat([

{ ma: 'sinh-vdc-hieusuat', chuong: 'Sinh thái học', muc: 4, dang: 'tln',
  tao(R) {
    const E0 = R.nguyen(5, 30) * Math.pow(10, 6);
    const h1 = R.chon([8, 10, 12, 12.5, 15]);
    const h2 = R.chon([8, 10, 11, 12, 14]);
    const h3 = R.chon([9, 10, 12, 15]);
    const E3 = E0 * h1 / 100 * h2 / 100 * h3 / 100;
    if (E3 < 100) return null;
    return {
      q: `Trong một hệ sinh thái, sinh vật sản xuất tích luỹ được ${S(E0 / 1e6)}×10⁶ kcal. `
        + `Hiệu suất sinh thái của sinh vật tiêu thụ bậc 1 so với sinh vật sản xuất là ${S(h1, 1)}%, `
        + `của bậc 2 so với bậc 1 là ${S(h2, 1)}%, của bậc 3 so với bậc 2 là ${S(h3, 1)}%. `
        + `Năng lượng tích luỹ ở sinh vật tiêu thụ bậc 3 bằng bao nhiêu kcal? (làm tròn đến hàng đơn vị)`,
      ans: D(E3, 0),
      giai: `Bước 1 — hiểu đúng định nghĩa: hiệu suất sinh thái là tỉ lệ phần trăm năng lượng được CHUYỂN LÊN bậc dinh dưỡng liền kề phía trên, `
        + `phần còn lại mất đi do hô hấp, bài tiết và chất thải.\n`
        + `Bước 2 — năng lượng ở sinh vật tiêu thụ bậc 1:\n`
        + `  E₁ = ${S(E0 / 1e6)}×10⁶ × ${S(h1, 1)}% = ${S(T(E0 * h1 / 100, 0))} kcal.\n`
        + `Bước 3 — năng lượng ở bậc 2:\n`
        + `  E₂ = ${S(T(E0 * h1 / 100, 0))} × ${S(h2, 1)}% = ${S(T(E0 * h1 / 100 * h2 / 100, 0))} kcal.\n`
        + `Bước 4 — năng lượng ở bậc 3:\n`
        + `  E₃ = ${S(T(E0 * h1 / 100 * h2 / 100, 0))} × ${S(h3, 1)}% = ${D(E3, 0)} kcal.\n`
        + `Bước 5 — có thể tính gộp một lần cho nhanh: E₃ = E₀ × ${S(h1, 1)}% × ${S(h2, 1)}% × ${S(h3, 1)}% = ${D(E3, 0)} kcal.`,
      meo: 'Hiệu suất luôn tính so với bậc LIỀN KỀ phía dưới, không phải so với sinh vật sản xuất — trừ khi đề nói rõ như vậy. '
        + 'Vì nhân liên tiếp mấy lần 10% nên năng lượng rơi rất nhanh, đó là lí do chuỗi thức ăn hiếm khi dài quá 4 – 5 bậc.'
    };
  } },

{ ma: 'sinh-vdc-luoithucan', chuong: 'Sinh thái học', muc: 4, dang: 'mc',
  tao(R) {
    const ds = [
      { mo: 'Cỏ → Châu chấu → Ếch → Rắn → Đại bàng; Cỏ → Thỏ → Đại bàng; Cỏ → Thỏ → Cáo',
        hoi: 'Trong lưới thức ăn trên, đại bàng thuộc những bậc dinh dưỡng nào?',
        d: 'Bậc dinh dưỡng cấp 5 và cấp 3',
        s: ['Chỉ bậc dinh dưỡng cấp 5', 'Chỉ bậc dinh dưỡng cấp 3', 'Bậc dinh dưỡng cấp 4 và cấp 2'],
        v: 'Ở chuỗi Cỏ → Châu chấu → Ếch → Rắn → Đại bàng, đại bàng đứng thứ năm nên là bậc dinh dưỡng cấp 5. '
          + 'Ở chuỗi Cỏ → Thỏ → Đại bàng, đại bàng đứng thứ ba nên là bậc dinh dưỡng cấp 3. Một loài tham gia nhiều chuỗi thì thuộc nhiều bậc dinh dưỡng khác nhau.' },
      { mo: 'Cỏ → Châu chấu → Ếch → Rắn; Cỏ → Châu chấu → Chim sâu → Rắn; Cỏ → Sâu → Chim sâu → Rắn',
        hoi: 'Lưới thức ăn trên có bao nhiêu chuỗi thức ăn?',
        d: '3 chuỗi', s: ['2 chuỗi', '4 chuỗi', '5 chuỗi'],
        v: 'Mỗi chuỗi thức ăn là một đường đi liên tục từ sinh vật sản xuất tới mắt xích cuối cùng. '
          + 'Ở đây có đúng ba đường: qua Ếch, qua Châu chấu – Chim sâu, và qua Sâu – Chim sâu.' },
      { mo: 'Tảo → Giáp xác → Cá nhỏ → Cá lớn → Chim bói cá',
        hoi: 'Nếu năng lượng thất thoát qua mỗi bậc dinh dưỡng là khoảng 90% thì phát biểu nào sau đây đúng?',
        d: 'Chim bói cá chỉ tích luỹ được khoảng 0,01% năng lượng của tảo',
        s: ['Chim bói cá tích luỹ được khoảng 10% năng lượng của tảo',
            'Chim bói cá tích luỹ được khoảng 1% năng lượng của tảo',
            'Năng lượng ở mỗi bậc dinh dưỡng là như nhau'],
        v: 'Từ tảo lên chim bói cá phải qua bốn lần chuyển bậc, mỗi lần chỉ còn 10%: 10% × 10% × 10% × 10% = 0,01%. '
          + 'Đây chính là lí do tháp năng lượng luôn có đáy rộng đỉnh hẹp và không bao giờ bị lộn ngược.' },
      { mo: 'Cây ngô → Sâu đục thân → Ong mắt đỏ; Cây ngô → Chuột → Rắn → Diều hâu',
        hoi: 'Nếu tiêu diệt hoàn toàn rắn thì hệ quả trực tiếp nào sau đây có khả năng xảy ra nhất?',
        d: 'Số lượng chuột tăng mạnh, cây ngô bị phá hại nhiều hơn và diều hâu giảm nguồn thức ăn',
        s: ['Số lượng sâu đục thân tăng mạnh vì mất kẻ thù',
            'Ong mắt đỏ tăng số lượng do được giải phóng khỏi cạnh tranh',
            'Cây ngô phát triển tốt hơn vì lưới thức ăn đơn giản đi'],
        v: 'Rắn ăn chuột và bị diều hâu ăn. Mất rắn thì chuột mất thiên địch nên bùng phát, cây ngô bị hại nặng hơn, '
          + 'đồng thời diều hâu mất một nguồn thức ăn. Nhánh sâu đục thân – ong mắt đỏ không liên quan tới rắn nên không bị ảnh hưởng trực tiếp.' },
      { mo: 'Thực vật phù du → Động vật phù du → Cá trích → Cá thu → Cá mập',
        hoi: 'Chất độc DDT khó phân huỷ thải vào vùng biển này sẽ tích tụ nhiều nhất ở đâu?',
        d: 'Cá mập, vì chất độc được khuếch đại sinh học dồn lên bậc dinh dưỡng cao nhất',
        s: ['Thực vật phù du, vì chúng hấp thụ trực tiếp chất độc từ nước',
            'Động vật phù du, vì chúng có số lượng cá thể lớn nhất',
            'Phân bố đều ở mọi bậc dinh dưỡng vì cùng sống trong một vùng biển'],
        v: 'Chất độc bền vững không bị đào thải sẽ đi theo thức ăn và cộng dồn qua từng bậc — hiện tượng khuếch đại sinh học. '
          + 'Sinh vật ở bậc dinh dưỡng càng cao thì nồng độ chất độc trong cơ thể càng lớn, dù nồng độ trong nước rất thấp.' },
      { mo: 'Cỏ → Thỏ → Cáo; Cỏ → Thỏ → Đại bàng; Cỏ → Gà rừng → Cáo; Cỏ → Gà rừng → Đại bàng',
        hoi: 'Trong lưới thức ăn trên, cáo và đại bàng có mối quan hệ sinh thái nào?',
        d: 'Cạnh tranh, vì cùng sử dụng thỏ và gà rừng làm thức ăn',
        s: ['Vật ăn thịt – con mồi, vì đại bàng có thể bắt cáo',
            'Cộng sinh, vì cùng sống trong một hệ sinh thái',
            'Hội sinh, vì cáo được lợi còn đại bàng không bị ảnh hưởng'],
        v: 'Cáo và đại bàng đều đứng ở bậc dinh dưỡng cấp 3 và cùng khai thác hai nguồn thức ăn giống hệt nhau là thỏ và gà rừng. '
          + 'Hai loài dùng chung nguồn sống có giới hạn thì quan hệ giữa chúng là cạnh tranh khác loài.' }
    ];
    const it = R.chon(ds);
    const opts = TD.xaoR(R, [it.d].concat(it.s));
    const loai = opts.filter(x => x !== it.d).map(x => `· ${x}`).join('\n');
    return {
      q: `Cho lưới thức ăn sau:\n${it.mo}\n\n${it.hoi}`,
      opts: opts, ans: opts.indexOf(it.d),
      giai: `Đáp án đúng: ${it.d}\n${it.v}\n\nCách làm chung cho dạng lưới thức ăn:\n`
        + `Bước 1 — vẽ lại lưới ra nháp thành sơ đồ mũi tên, mũi tên luôn chỉ theo chiều dòng NĂNG LƯỢNG (con mồi → vật ăn thịt).\n`
        + `Bước 2 — tách lưới thành từng chuỗi thức ăn riêng, mỗi chuỗi bắt đầu từ sinh vật sản xuất.\n`
        + `Bước 3 — đánh số bậc dinh dưỡng trên từng chuỗi; một loài nằm ở nhiều chuỗi thì thuộc nhiều bậc khác nhau.\n`
        + `Bước 4 — đối chiếu câu hỏi với sơ đồ vừa vẽ.\n\nCác phương án bị loại:\n${loai}`,
      meo: 'Bậc dinh dưỡng cấp 1 luôn là sinh vật SẢN XUẤT, không phải sinh vật tiêu thụ bậc 1. '
        + 'Sinh vật tiêu thụ bậc 1 tương ứng với bậc dinh dưỡng cấp 2 — lệch nhau đúng một đơn vị, đề rất hay dùng chỗ này để gài.'
    };
  } }

]);

/* ============================================================
   TOÁN — CẤP SỐ TRONG BÀI TOÁN THỰC TẾ
   ============================================================ */
TD.GEN.toan = (TD.GEN.toan || []).concat([

{ ma: 'toan-vdc-capso-thuc', chuong: 'Dãy số – Cấp số', muc: 4, dang: 'tln',
  tao(R) {
    const u1 = R.nguyen(4, 15) * 10;              /* sản lượng năm đầu */
    const pt = R.chon([6, 7, 8, 10, 12, 15]);     /* tăng bao nhiêu phần trăm mỗi năm */
    const q = 1 + pt / 100;
    const nguong = u1 * R.chon([2, 2.5, 3, 4]);
    /* năm thứ n có u_n = u1·q^(n−1); tìm n nhỏ nhất để u_n ≥ ngưỡng */
    const n = Math.ceil(Math.log(nguong / u1) / Math.log(q)) + 1;
    if (n < 4 || n > 40) return null;
    const uN = u1 * Math.pow(q, n - 1);
    const uTruoc = u1 * Math.pow(q, n - 2);
    return {
      q: `Một nhà máy năm đầu tiên sản xuất được ${S(u1)} nghìn sản phẩm. Từ năm thứ hai trở đi, mỗi năm sản lượng `
        + `tăng thêm ${S(pt)}% so với năm liền trước. Hỏi bắt đầu từ năm thứ mấy thì sản lượng của nhà máy trong năm đó `
        + `đạt ít nhất ${S(nguong)} nghìn sản phẩm?`,
      ans: String(n),
      giai: `Bước 1 — nhận dạng: sản lượng mỗi năm bằng năm trước nhân với một hệ số cố định, nên đây là cấp số nhân\n`
        + `  với u₁ = ${S(u1)} và công bội q = 1 + ${S(pt)}% = ${S(q, 4)}.\n`
        + `Bước 2 — công thức số hạng tổng quát: uₙ = u₁·q<sup>n−1</sup> (số mũ là n − 1 chứ không phải n, vì năm đầu chưa tăng lần nào).\n`
        + `Bước 3 — lập bất phương trình: ${S(u1)}·${S(q, 4)}<sup>n−1</sup> ≥ ${S(nguong)}\n`
        + `  ⇔ ${S(q, 4)}<sup>n−1</sup> ≥ ${S(T(nguong / u1, 4))}\n`
        + `Bước 4 — lấy logarit hai vế (cơ số lớn hơn 1 nên giữ nguyên chiều bất đẳng thức):\n`
        + `  n − 1 ≥ log<sub>${S(q, 4)}</sub>${S(T(nguong / u1, 4))} = ${S(T(Math.log(nguong / u1) / Math.log(q), 4))}\n`
        + `  ⇒ n ≥ ${S(T(Math.log(nguong / u1) / Math.log(q) + 1, 4))}, mà n nguyên nên n nhỏ nhất bằng ${n}.\n`
        + `Bước 5 — kiểm lại: năm thứ ${n - 1} đạt ${S(T(uTruoc, 2))} nghìn (chưa tới ngưỡng), `
        + `năm thứ ${n} đạt ${S(T(uN, 2))} nghìn (đã vượt). Vậy đáp số là năm thứ ${n}.`,
      meo: 'Hai chỗ mất điểm: ① dùng nhầm số mũ n thay vì n − 1 ② quên làm tròn LÊN. '
        + 'Bài hỏi "ít nhất", "vượt quá" thì nghiệm phải lấy trần chứ không phải làm tròn thông thường. '
        + 'Bấm máy: dùng TABLE với f(x) = u₁·q^(x−1) rồi dò cột giá trị là ra ngay mà không cần logarit.'
    };
  } }

]);

})();
