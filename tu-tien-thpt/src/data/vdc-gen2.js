/* ============================================================
   VẬN DỤNG CAO — BỔ SUNG CHO CÁC CHUYÊN ĐỀ CÒN HỞ
   Rà lại toàn bộ mẫu đề thấy vài chuyên đề chỉ dừng ở mức thông
   hiểu: Khối tròn xoay (Toán), Dung dịch và Cân bằng trong dung
   dịch (Hoá), Đột biến NST và Nguyên phân – Giảm phân (Sinh).
   Đây là những chỗ đề thật hay đặt câu khó, nên bù mẫu mức 4.
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {};

(function () {
const S = TD.soVN;
const T = TD.lamTron;
const D = TD.dapSo;

/* ==========================================================
   TOÁN — KHỐI TRÒN XOAY: bài toán tối ưu vật liệu
   ========================================================== */
TD.GEN.toan = (TD.GEN.toan || []).concat([

{ ma: 'toan-vdc-lonsua', chuong: 'Khối tròn xoay', muc: 4, dang: 'tln',
  tao(R) {
    const V = R.chon([180, 200, 240, 250, 270, 300, 330, 360, 400, 450,
                      500, 540, 600, 660, 700, 750, 800, 900, 1000, 1200, 1250, 1500]);
    const kin = R.chon([true, false]);
    const doVat = R.chon([
      { ten: 'lon nước ngọt', vl: 'hợp kim nhôm' },
      { ten: 'hộp sữa đặc', vl: 'thép tráng thiếc' },
      { ten: 'thùng sơn nhỏ', vl: 'tôn mạ kẽm' }
    ]);
    /* kín hai đáy: S = 2πr² + 2V/r ⇒ r³ = V/(2π) · hở một đáy: S = πr² + 2V/r ⇒ r³ = V/π */
    const heSo = kin ? 2 : 1;
    const r = Math.cbrt(V / (heSo * Math.PI));
    const h = V / (Math.PI * r * r);
    const Stp = heSo * Math.PI * r * r + 2 * V / r;
    const hoiR = R.chon([true, false]);
    const dapAn = hoiR ? r : h;
    return {
      q: `Một nhà máy cần dập ${doVat.ten} dạng <b>hình trụ ${kin ? 'kín hai đáy' : 'hở miệng (chỉ có một đáy)'}</b> `
        + `có thể tích ${S(V)} cm³. Vỏ làm từ cùng một loại ${doVat.vl} nên chi phí tỉ lệ thuận với diện tích phần vật liệu. `
        + `Hỏi ${hoiR ? '<b>bán kính đáy</b>' : '<b>chiều cao</b>'} bằng bao nhiêu xentimét thì tốn ít vật liệu nhất? `
        + `(làm tròn đến hàng phần trăm)`,
      ans: D(dapAn, 2),
      giai: `Bước 1 — đặt bán kính đáy là r, chiều cao h. Ràng buộc thể tích:\n`
        + `  πr²h = ${S(V)} ⇒ h = ${S(V)}/(πr²)\n`
        + `Bước 2 — diện tích vật liệu (${kin ? 'thân + 2 đáy' : 'thân + 1 đáy'}) chỉ còn phụ thuộc r:\n`
        + `  S(r) = ${heSo}πr² + 2πrh = ${heSo}πr² + ${S(2 * V)}/r\n`
        + `Bước 3 — đạo hàm rồi cho bằng 0:\n`
        + `  S′(r) = ${2 * heSo}πr − ${S(2 * V)}/r² = 0 ⇒ r³ = ${S(V)}/(${heSo === 1 ? '' : heSo}π)\n`
        + `  r = ${S(r, 4)} cm ⇒ h = ${S(V)}/(π·r²) = ${S(h, 4)} cm\n`
        + `Bước 4 — S″(r) = ${2 * heSo}π + ${S(4 * V)}/r³ > 0 nên đây là cực TIỂU, đúng là chỗ tốn ít vật liệu nhất.\n`
        + `Đáp số: ${hoiR ? 'r' : 'h'} ≈ ${D(dapAn, 2)} cm (khi đó S = ${S(Stp, 1)} cm²).\n`
        + `Kiểm chứng nhanh: h/r = ${S(h / r, 2)} — đúng bằng ${kin ? '2' : '1'} như lí thuyết.`,
      meo: 'Nhớ luôn hai kết quả đẹp này: hình trụ KÍN hai đáy tốn ít vật liệu nhất khi <b>h = 2r</b> '
        + '(chiều cao bằng đường kính); hình trụ HỞ một đáy thì <b>h = r</b>. Thuộc rồi thì thay thẳng vào V = πr²h ra r ngay, khỏi đạo hàm. '
        + 'Bấm ∛ trên Casio: SHIFT + x³ (570VN Plus) hoặc phím ∛☐ trong bảng mẫu (580VN X).'
    };
  } }

]);

/* ==========================================================
   HOÁ — DUNG DỊCH & CÂN BẰNG TRONG DUNG DỊCH
   ========================================================== */
TD.GEN.hoa = (TD.GEN.hoa || []).concat([

/* --- Pha loãng acid yếu rồi tính pH: phải thấy Ka không đổi --- */
{ ma: 'hoa-vdc-phaloang-ph', chuong: 'Cân bằng trong dung dịch', muc: 4, dang: 'tln',
  tao(R) {
    const c = R.chon([0.1, 0.2, 0.4, 0.5, 1]);
    const V1 = R.chon([20, 25, 40, 50]);
    const k = R.chon([2, 4, 5, 10]);
    const V2 = V1 * k;
    const Ka = 1.75e-5;
    const c2 = c * V1 / V2;
    const H = Math.sqrt(Ka * c2);
    const pH = -Math.log10(H);
    return {
      q: `Acetic acid là acid yếu có K<sub>a</sub> = 1,75·10⁻⁵ ở 25 °C. `
        + `Lấy ${S(V1)} mL dung dịch CH₃COOH ${S(c)} M rồi thêm nước cất cho tới khi thu được ${S(V2)} mL dung dịch. `
        + `Tính pH của dung dịch sau khi pha loãng. (làm tròn đến hàng phần trăm)`,
      ans: D(pH, 2),
      giai: `Bước 1 — pha loãng KHÔNG làm đổi số mol chất tan, chỉ đổi nồng độ:\n`
        + `  C₂ = C₁·V₁/V₂ = ${S(c)} × ${S(V1)}/${S(V2)} = ${S(c2, 4)} M\n`
        + `Bước 2 — acid yếu, dùng cân bằng CH₃COOH ⇌ H⁺ + CH₃COO⁻:\n`
        + `  K<sub>a</sub> = x²/(C₂ − x) ≈ x²/C₂ (vì x ≪ C₂)\n`
        + `  x = [H⁺] = √(K<sub>a</sub>·C₂) = √(1,75·10⁻⁵ × ${S(c2, 4)}) = ${H.toExponential(3).replace('.', ',')} M\n`
        + `Bước 3 — pH = −log[H⁺] = ${D(pH, 2)}.\n`
        + `Nhận xét: pha loãng ${S(k)} lần chỉ làm pH tăng khoảng ${S(0.5 * Math.log10(k), 2)} đơn vị, `
        + `chứ KHÔNG tăng đúng log${S(k)} như acid mạnh — vì acid yếu điện li mạnh hơn khi loãng.`,
      meo: 'Acid MẠNH pha loãng 10 lần thì pH tăng đúng 1; acid YẾU pha loãng 10 lần pH chỉ tăng ≈ 0,5 '
        + 'vì [H⁺] = √(Ka·C) chỉ tỉ lệ với căn của C. Thấy đề cho Ka là biết ngay phải dùng công thức căn.'
    };
  } },

/* --- Pha dung dịch từ acid đặc, đi ngược từ pH --- */
{ ma: 'hoa-vdc-pha-h2so4', chuong: 'Dung dịch', muc: 4, dang: 'tln',
  tao(R) {
    const A = R.chon([
      { ten: 'sulfuric acid', ct: 'H₂SO₄', M: 98, pc: 98, D: 1.84, nac: 2, ion: 'H₂SO₄ → 2H⁺ + SO₄²⁻', ngto: 'H = 1; S = 32; O = 16' },
      { ten: 'hydrochloric acid', ct: 'HCl', M: 36.5, pc: 36.5, D: 1.18, nac: 1, ion: 'HCl → H⁺ + Cl⁻', ngto: 'H = 1; Cl = 35,5' },
      { ten: 'nitric acid', ct: 'HNO₃', M: 63, pc: 63, D: 1.40, nac: 1, ion: 'HNO₃ → H⁺ + NO₃⁻', ngto: 'H = 1; N = 14; O = 16' }
    ]);
    const pH = R.chon([0.5, 1, 1.5, 2, 2.5]);
    const V = R.chon([250, 500, 750, 1000, 1500, 2000, 2500, 5000]);
    const H = Math.pow(10, -pH);
    const cA = H / A.nac;
    const n = cA * V / 1000;
    const mCt = A.M * n;
    const mDd = mCt / (A.pc / 100);
    const Vdac = mDd / A.D;
    const mu = x => x.toExponential(3).replace('.', ',');
    return {
      q: `Trong phòng thí nghiệm có ${A.ten} đặc nồng độ ${S(A.pc)}% (khối lượng riêng D = ${S(A.D, 2)} g/mL). `
        + `Cần lấy bao nhiêu mililít acid đặc này để pha thành ${S(V)} mL dung dịch ${A.ct} có pH = ${S(pH)}? `
        + `(coi ${A.ct} điện li hoàn toàn; ${A.ngto}; làm tròn đến hàng phần trăm)`,
      ans: D(Vdac, 2),
      giai: `Bước 1 — từ pH suy ra nồng độ H⁺:\n`
        + `  [H⁺] = 10^(−${S(pH)}) = ${mu(H)} M\n`
        + `Bước 2 — ${A.ion} nên 1 mol acid cho ${S(A.nac)} mol H⁺:\n`
        + `  C(${A.ct}) = ${mu(H)}/${S(A.nac)} = ${mu(cA)} M\n`
        + `Bước 3 — số mol và khối lượng acid nguyên chất cần có:\n`
        + `  n = ${mu(cA)} × ${S(V / 1000, 3)} = ${S(n, 5)} mol\n`
        + `  m(${A.ct}) = ${S(A.M, 1)} × ${S(n, 5)} = ${S(mCt, 4)} g\n`
        + `Bước 4 — quy về khối lượng dung dịch đặc rồi đổi sang thể tích:\n`
        + `  m(dd đặc) = ${S(mCt, 4)}/${S(A.pc / 100, 3)} = ${S(mDd, 4)} g\n`
        + `  V(dd đặc) = ${S(mDd, 4)}/${S(A.D, 2)} = ${D(Vdac, 2)} mL.`,
      meo: 'Bẫy kinh điển: acid ĐA NẤC như H₂SO₄ cho 2 H⁺, nếu lấy luôn [H⁺] làm nồng độ acid là sai gấp đôi. '
        + 'Chuỗi biến đổi cần thuộc: pH → [H⁺] → C(acid) → n → m chất tan → m dung dịch (chia C%) → V (chia D). '
        + 'Và luôn nhớ quy tắc an toàn: rót acid đặc VÀO nước, tuyệt đối không đổ nước vào acid đặc.'
    };
  } }

]);

/* ==========================================================
   SINH — ĐỘT BIẾN NST & NGUYÊN PHÂN – GIẢM PHÂN
   ========================================================== */
TD.GEN.sinh = (TD.GEN.sinh || []).concat([

/* --- Lai cây thể ba: phải lập được tỉ lệ giao tử của 2n+1 --- */
{ ma: 'sinh-vdc-lechboi-lai', chuong: 'Đột biến NST', muc: 4, dang: 'tln',
  tao(R) {
    const bo = R.chon(['AAa', 'Aaa']);
    const me = R.chon(['Aa', 'aa']);
    const n2 = R.chon([14, 18, 20, 24, 32, 38]);
    const TT = R.chon([
      { loai: 'thực vật', troi: 'hoa đỏ', lan: 'hoa trắng' },
      { loai: 'thực vật', troi: 'quả tròn', lan: 'quả dài' },
      { loai: 'thực vật', troi: 'thân cao', lan: 'thân thấp' },
      { loai: 'thực vật', troi: 'hạt vàng', lan: 'hạt xanh' }
    ]);
    const hoiLan = R.chon([true, false]);
    /* giao tử của thể ba: 3 NST ⇒ 3 cách lấy 1 chiếc (n) + 3 cách lấy 2 chiếc (n+1), đều 1/6 */
    const gt = bo === 'AAa'
      ? { mo: 'A (1/6 + 1/6 = 2/6), a (1/6), AA (1/6), Aa (1/6 + 1/6 = 2/6)', khongA: 1 / 6 }
      : { mo: 'A (1/6), a (1/6 + 1/6 = 2/6), Aa (1/6 + 1/6 = 2/6), aa (1/6)', khongA: 3 / 6 };
    const p2 = me === 'Aa' ? 0.5 : 1;
    const lan = gt.khongA * p2 * 100;
    const dapAn = hoiLan ? lan : 100 - lan;
    return {
      q: `Ở một loài ${TT.loai} lưỡng bội 2n = ${S(n2)}, allele A quy định ${TT.troi} trội hoàn toàn so với allele a quy định ${TT.lan}. `
        + `Người ta lấy một cây <b>thể ba</b> (2n + 1) ở cặp NST mang gene này, kiểu gene <b>${bo}</b>, `
        + `đem lai với một cây lưỡng bội bình thường kiểu gene <b>${me}</b>. `
        + `Biết mọi loại giao tử đều được tạo ra với xác suất như nhau và đều có khả năng thụ tinh, `
        + `không xảy ra đột biến mới. Theo lí thuyết, ở đời con tỉ lệ cây <b>${hoiLan ? TT.lan : TT.troi}</b> chiếm bao nhiêu phần trăm? `
        + `(làm tròn đến hàng phần trăm)`,
      ans: D(dapAn, 2),
      giai: `Bước 1 — cây thể ba ${bo} mang 3 chiếc NST của cặp đó. Khi giảm phân, 3 chiếc này chia ngẫu nhiên `
        + `thành một bên 1 chiếc, một bên 2 chiếc ⇒ có 3 cách lấy 1 chiếc và 3 cách lấy 2 chiếc, tổng 6 khả năng bằng nhau:\n`
        + `  ${gt.mo}\n`
        + `Bước 2 — kiểu hình ${TT.lan} chỉ xuất hiện khi hợp tử KHÔNG nhận allele A nào. Xác suất giao tử của cây ${bo} không chứa A:\n`
        + `  P₁ = ${S(gt.khongA * 6)}/6 = ${S(gt.khongA, 4)}\n`
        + `Bước 3 — cây ${me} cho giao tử a với xác suất P₂ = ${S(p2, 2)}.\n`
        + `Bước 4 — tỉ lệ ${TT.lan} = P₁ × P₂ = ${S(gt.khongA, 4)} × ${S(p2, 2)} = ${S(lan / 100, 4)} = ${S(lan, 2)}%.\n`
        + (hoiLan ? `Đáp số: ${D(dapAn, 2)}%.`
                  : `Bước 5 — đề hỏi ${TT.troi} nên lấy phần bù: 100% − ${S(lan, 2)}% = ${D(dapAn, 2)}%.`),
      meo: 'Chìa khoá là tỉ lệ giao tử của thể ba: KHÔNG phải 1:1 mà phải đếm theo tổ hợp chập 1 và chập 2 của 3 chiếc NST '
        + '⇒ luôn có mẫu số 6. Nhớ nhanh: Aaa → 1A : 2a : 2Aa : 1aa; AAa → 2A : 1a : 1AA : 2Aa. '
        + 'Kiểu hình lặn thì chỉ cần đếm giao tử KHÔNG mang A, nhanh hơn kẻ bảng 4×4; hỏi kiểu hình trội thì lấy 100% trừ đi.'
    };
  } },

/* --- Nguyên phân nối tiếp giảm phân: tổng NST môi trường cung cấp --- */
{ ma: 'sinh-vdc-nst-moitruong', chuong: 'Nguyên phân – Giảm phân', muc: 4, dang: 'tln',
  tao(R) {
    const n2 = R.chon([8, 14, 24, 38, 40, 44]);
    const a = R.nguyen(2, 6);
    const k = R.nguyen(3, 6);
    const tbCon = a * Math.pow(2, k);
    const np = a * n2 * (Math.pow(2, k) - 1);
    const gp = tbCon * n2;
    const tong = np + gp;
    return {
      q: `Ở một loài động vật có bộ NST lưỡng bội 2n = ${S(n2)}. Có ${S(a)} tế bào sinh dục sơ khai đực `
        + `nguyên phân liên tiếp ${S(k)} lần, toàn bộ tế bào con tạo ra đều bước vào giảm phân tạo tinh trùng. `
        + `Tính TỔNG số NST đơn mà môi trường nội bào phải cung cấp cho cả quá trình nguyên phân và giảm phân nói trên.`,
      ans: D(tong, 0),
      giai: `Bước 1 — giai đoạn nguyên phân ${S(k)} lần:\n`
        + `  Số tế bào con = ${S(a)} × 2^${S(k)} = ${S(tbCon)} tế bào\n`
        + `  NST môi trường cấp = ${S(a)} × ${S(n2)} × (2^${S(k)} − 1) = ${S(a)} × ${S(n2)} × ${S(Math.pow(2, k) - 1)} = ${S(np)}\n`
        + `Bước 2 — giai đoạn giảm phân: mỗi tế bào con phải nhân đôi NST đúng MỘT lần trước khi giảm phân, `
        + `nên mỗi tế bào cần thêm ${S(n2)} NST đơn:\n`
        + `  NST môi trường cấp = ${S(tbCon)} × ${S(n2)} = ${S(gp)}\n`
        + `Bước 3 — tổng cộng = ${S(np)} + ${S(gp)} = ${S(tong)} NST đơn.\n`
        + `Gộp lại thành một công thức: a·2n·(2^(k+1) − 1) = ${S(a)} × ${S(n2)} × ${S(Math.pow(2, k + 1) - 1)} = ${S(tong)}.`,
      meo: 'Đừng quên giảm phân cũng có kì trung gian nhân đôi NST — rất nhiều bạn chỉ tính phần nguyên phân rồi mất điểm. '
        + 'Công thức gộp đáng thuộc: <b>a·2n·(2^(k+1) − 1)</b>. Số tinh trùng tạo ra là a·2^k·4, còn trứng thì chỉ a·2^k·1.'
    };
  } }

]);

})();

/* ==========================================================
   TOÁN — TỔ HỢP & XÁC SUẤT: bài toán đếm có ràng buộc
   Chuyên đề này trước chỉ có câu đếm tổ hợp mức thông hiểu,
   trong khi đề thật hay đặt câu khó ở dạng đếm có điều kiện.
   ========================================================== */
(function () {
const S = TD.soVN;
const ucln = (a, b) => b ? ucln(b, a % b) : a;
const toHop = (n, k) => { if (k < 0 || k > n) return 0; let r = 1; for (let i = 1; i <= k; i++) r = r * (n - k + i) / i; return Math.round(r); };

TD.GEN.toan = (TD.GEN.toan || []).concat([

{ ma: 'toan-vdc-tohop-rangbuoc', chuong: 'Tổ hợp – Xác suất', muc: 4, dang: 'tln',
  tao(R) {
    const nam = R.nguyen(5, 9), nu = R.nguyen(4, 8);
    const chon = R.nguyen(4, 5);
    const tong = nam + nu;
    if (chon >= tong - 1) return null;
    const kieu = R.chon(['itNhat1Nu', 'caHaiPhai', 'itNhat2Nam']);
    const tongCach = toHop(tong, chon);
    let thuan, mo, buoc;
    if (kieu === 'itNhat1Nu') {
      thuan = tongCach - toHop(nam, chon);
      mo = 'có <b>ít nhất 1 học sinh nữ</b>';
      buoc = `Dùng phần bù: biến cố đối là "chọn toàn nam".\n`
           + `  Số cách chọn toàn nam = C(${nam}, ${chon}) = ${S(toHop(nam, chon))}\n`
           + `  Số cách thuận lợi = ${S(tongCach)} − ${S(toHop(nam, chon))} = ${S(thuan)}`;
    } else if (kieu === 'caHaiPhai') {
      thuan = tongCach - toHop(nam, chon) - toHop(nu, chon);
      mo = 'có <b>cả nam lẫn nữ</b>';
      buoc = `Dùng phần bù: biến cố đối là "toàn nam" HOẶC "toàn nữ" (hai trường hợp rời nhau).\n`
           + `  Toàn nam = C(${nam}, ${chon}) = ${S(toHop(nam, chon))}\n`
           + `  Toàn nữ  = C(${nu}, ${chon}) = ${S(toHop(nu, chon))}\n`
           + `  Số cách thuận lợi = ${S(tongCach)} − ${S(toHop(nam, chon))} − ${S(toHop(nu, chon))} = ${S(thuan)}`;
    } else {
      thuan = tongCach - toHop(nu, chon) - nam * toHop(nu, chon - 1);
      mo = 'có <b>ít nhất 2 học sinh nam</b>';
      buoc = `Dùng phần bù: biến cố đối là "không có nam nào" hoặc "đúng 1 nam".\n`
           + `  Không có nam = C(${nu}, ${chon}) = ${S(toHop(nu, chon))}\n`
           + `  Đúng 1 nam   = C(${nam}, 1)·C(${nu}, ${chon - 1}) = ${nam}·${S(toHop(nu, chon - 1))} = ${S(nam * toHop(nu, chon - 1))}\n`
           + `  Số cách thuận lợi = ${S(tongCach)} − ${S(toHop(nu, chon))} − ${S(nam * toHop(nu, chon - 1))} = ${S(thuan)}`;
    }
    if (thuan <= 0 || thuan === tongCach) return null;
    const g = ucln(thuan, tongCach);
    return {
      q: `Một lớp có ${S(nam)} học sinh nam và ${S(nu)} học sinh nữ. Giáo viên chọn ngẫu nhiên ${S(chon)} học sinh `
        + `để lập một đội tham gia hoạt động ngoại khoá. Tính xác suất để đội được chọn ${mo}. `
        + `Viết kết quả dưới dạng phân số tối giản a/b.`,
      ans: (thuan / g) + '/' + (tongCach / g),
      giai: `Bước 1 — không gian mẫu: chọn ${S(chon)} bạn bất kì trong ${S(tong)} bạn.\n`
        + `  n(Ω) = C(${tong}, ${chon}) = ${S(tongCach)}\n`
        + `Bước 2 — đếm số cách thuận lợi.\n${buoc}\n`
        + `Bước 3 — P = ${S(thuan)}/${S(tongCach)} = ${(thuan / g)}/${(tongCach / g)}.`
        + `\nBước 4 — kiểm chứng: xác suất phải nằm trong khoảng (0; 1) và tử số phải nhỏ hơn n(Ω).\nChỗ dễ sai: ① dùng chỉnh hợp A thay vì tổ hợp C khi việc chọn KHÔNG phân biệt thứ tự ② đếm trùng khi chia trường hợp (một cách chọn bị đếm hai lần ở hai trường hợp khác nhau) — đây chính là lí do nên dùng phần bù thay vì liệt kê.`,
      meo: 'Thấy chữ "ít nhất" hoặc "có cả… lẫn…" thì gần như chắc chắn phải dùng PHẦN BÙ — '
        + 'đếm biến cố đối rồi lấy tổng trừ đi, nhanh hơn nhiều so với chia trường hợp. '
        + 'Casio 570VN Plus và 580VN X bấm tổ hợp bằng SHIFT + ÷ (nCr): gõ 12 SHIFT ÷ 5 = ra C(12;5).'
    };
  } }

]);
})();
