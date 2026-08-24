/* ============================================================
   TOÁN — MẪU ĐỀ TỰ SINH
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {};

(function () {
const S = TD.soVN, T = TD.lamTron;
/* ước chung lớn nhất, dùng để rút gọn phân số */
const ucln = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a || 1; };
const phanSo = (t, m) => { const g = ucln(t, m); const tt = t / g, mm = m / g; return mm === 1 ? String(tt) : tt + '/' + mm; };

TD.GEN.toan = [
{ ma: 'toan-daoham-cuctri', chuong: 'Khảo sát hàm số', muc: 2, dang: 'tln',
  tao(R) {
    const a = R.chon([1, 2, -1, -2]);
    const p = R.nguyen(1, 6);                       /* hai nghiệm của y' là ±p hoặc p và q */
    const q = R.nguyen(1, 6);
    if (p === q) return null;
    /* y' = 3a(x−p)(x−q) ⇒ y = a x³ − 3a(p+q)/2 x² + 3apq x + d */
    const b2 = -3 * a * (p + q) / 2;
    if (!Number.isInteger(b2)) return null;
    const c2 = 3 * a * p * q;
    const d = R.nguyen(-5, 5);
    const ct = `y = ${a === 1 ? '' : a === -1 ? '−' : S(a)}x³ ${b2 >= 0 ? '+ ' + S(b2) : '− ' + S(-b2)}x² ${c2 >= 0 ? '+ ' + S(c2) : '− ' + S(-c2)}x ${d >= 0 ? '+ ' + d : '− ' + (-d)}`;
    return {
      q: `Cho hàm số ${ct}. Hàm số có bao nhiêu điểm cực trị?`,
      ans: '2',
      giai: `y′ = ${S(3 * a)}x² ${2 * b2 >= 0 ? '+ ' + S(2 * b2) : '− ' + S(-2 * b2)}x ${c2 >= 0 ? '+ ' + S(c2) : '− ' + S(-c2)}\n`
          + `Phân tích: y′ = ${S(3 * a)}(x − ${p})(x − ${q})\n`
          + `y′ = 0 ⇔ x = ${p} hoặc x = ${q} — hai nghiệm phân biệt.\n`
          + `y′ đổi dấu khi đi qua cả hai nghiệm ⇒ hàm số có 2 điểm cực trị.`,
      meo: 'Hàm bậc ba có 2 cực trị ⇔ y′ = 0 có 2 nghiệm phân biệt ⇔ Δ(y′) > 0.'
    };
  } },

{ ma: 'toan-tiemcan', chuong: 'Khảo sát hàm số', muc: 2, dang: 'tln',
  tao(R) {
    const a = R.chon([1, 2, 3, -1, -2]), b = R.nguyen(-6, 6);
    const c = R.chon([1, 2]), d = R.nguyen(-6, 6);
    if (a * d - b * c === 0) return null;
    const tcd = T(-d / c, 3), tcn = T(a / c, 3);
    const hoiDung = R() < 0.5;
    return {
      q: `Cho hàm số y = (${TD.daThuc([[a, 'x'], [b, '']])}) / (${TD.daThuc([[c, 'x'], [d, '']])}). `
       + `Tìm ${hoiDung ? 'hoành độ của tiệm cận đứng' : 'tung độ của tiệm cận ngang'} của đồ thị hàm số.`,
      ans: S(hoiDung ? tcd : tcn),
      giai: hoiDung
        ? `Tiệm cận đứng là nghiệm của mẫu: ${TD.daThuc([[c, 'x'], [d, '']])} = 0 ⇒ x = ${S(tcd)}.\n`
          + `(Kiểm tra tử tại x = ${S(tcd)} khác 0 nên đây đúng là tiệm cận đứng.)`
        : `Tiệm cận ngang: y = a/c = ${TD.so(a)}/${c} = ${S(tcn)}.\n`
          + `Vì bậc tử bằng bậc mẫu nên giới hạn khi x → ±∞ bằng tỉ số hai hệ số bậc nhất.`,
      meo: 'Hàm (ax+b)/(cx+d): tiệm cận đứng x = −d/c, tiệm cận ngang y = a/c.'
    };
  } },

{ ma: 'toan-logarit', chuong: 'Mũ – Logarit', muc: 2, dang: 'tln',
  tao(R) {
    const a = R.chon([2, 3, 5, 10]);
    const m = R.nguyen(1, 5), n = R.nguyen(1, 4);
    const x = Math.pow(a, m + n), y = Math.pow(a, n);
    if (x > 1e7) return null;
    return {
      q: `Tính giá trị của biểu thức log<sub>${a}</sub>${x} − log<sub>${a}</sub>${y}.`,
      ans: String(m),
      giai: `log_${a}${x} − log_${a}${y} = log_${a}(${x}/${y}) = log_${a}${x / y}\n`
          + `Vì ${x / y} = ${m === 1 ? String(a) : a + '<sup>' + m + '</sup>'} nên log<sub>${a}</sub>${x / y} = ${m}.`,
      meo: 'Hiệu hai logarit cùng cơ số bằng logarit của THƯƠNG, không phải thương hai logarit.'
    };
  } },

{ ma: 'toan-laikep', chuong: 'Mũ – Logarit', muc: 3, dang: 'tln',
  tao(R) {
    const P = R.nguyen(5, 50) * 10;                 /* triệu đồng */
    const r = R.chon([4, 5, 6, 7, 8]) / 100;
    const n = R.nguyen(2, 10);
    const A = T(P * Math.pow(1 + r, n), 2);
    return {
      q: `Một người gửi tiết kiệm ${P} triệu đồng với lãi suất ${S(r * 100)}%/năm theo hình thức lãi kép. `
       + `Sau ${n} năm, tổng số tiền cả gốc lẫn lãi là bao nhiêu triệu đồng? (làm tròn đến hàng phần trăm)`,
      ans: S(A),
      giai: `Công thức lãi kép: A = P(1 + r)ⁿ\n`
          + `A = ${P}·(1 + ${S(r)})^${n} = ${P}·${S(T(Math.pow(1 + r, n), 6))} = ${S(A)} triệu đồng.\n`
          + `(Nếu là lãi ĐƠN thì chỉ được ${S(T(P * (1 + r * n), 2))} triệu — luôn nhỏ hơn.)`,
      meo: 'Lãi kép dùng LUỸ THỪA (1+r)ⁿ; lãi đơn chỉ nhân (1 + rn).'
    };
  } },

{ ma: 'toan-tichphan', chuong: 'Nguyên hàm – Tích phân', muc: 3, dang: 'tln',
  tao(R) {
    const a = R.nguyen(1, 5), b = R.nguyen(0, 5), c = R.nguyen(0, 5);
    const t = R.nguyen(1, 4);                       /* cận trên */
    /* ∫₀ᵗ (a x² + b x + c) dx = a t³/3 + b t²/2 + c t */
    const val = a * Math.pow(t, 3) / 3 + b * t * t / 2 + c * t;
    const tu = 2 * a * Math.pow(t, 3) + 3 * b * t * t + 6 * c * t;   /* val = tu/6 */
    return {
      q: `Tính tích phân I = ∫ từ 0 đến ${t} của (${TD.daThuc([[a, 'x²'], [b, 'x'], [c, '']])})dx. `
       + `Viết kết quả dưới dạng phân số tối giản a/b (nếu là số nguyên thì ghi số nguyên).`,
      ans: phanSo(tu, 6),
      giai: `Nguyên hàm: F(x) = ${TD.daThuc([[a, 'x³/3'], [b, 'x²/2'], [c, 'x']])}\n`
          + `I = F(${t}) − F(0) = ${TD.daThuc([[a * Math.pow(t, 3), '/3'], [b * t * t, '/2'], [c * t, '']]).replace(/(\d)\/(\d)/g, '$1/$2')}\n`
          + `= ${S(T(val, 6))} = ${phanSo(tu, 6)}.`,
      meo: '∫xⁿdx = xⁿ⁺¹/(n+1) + C, áp dụng cho từng hạng tử rồi thay cận.'
    };
  } },

{ ma: 'toan-dientich', chuong: 'Ứng dụng tích phân', muc: 3, dang: 'tln',
  tao(R) {
    /* Parabol y = x² và đường thẳng cắt nó tại hai hoành độ nguyên p < q.
       Khi đó x² − (p+q)x + pq = 0 ⇒ đường thẳng là y = (p+q)x − pq
       và diện tích hình phẳng bằng (q − p)³/6. */
    const p = R.nguyen(-6, 5);
    const q = p + R.nguyen(1, 7);
    const a = p + q, b = -p * q;
    const tu = Math.pow(q - p, 3);
    const duong = TD.daThuc([[a, 'x'], [b, '']]);
    return {
      q: `Tính diện tích hình phẳng giới hạn bởi parabol y = x² và đường thẳng y = ${duong}. `
       + `Viết kết quả dưới dạng phân số tối giản a/b (nếu là số nguyên thì ghi số nguyên).`,
      ans: phanSo(tu, 6),
      giai: `Hoành độ giao điểm: x² = ${duong} ⇔ ${TD.daThuc([[1, 'x²'], [-a, 'x'], [-b, '']])} = 0\n`
          + `⇔ ${TD.nhanTu(p)}${TD.nhanTu(q)} = 0 ⇒ x = ${TD.so(p)} hoặc x = ${TD.so(q)}.\n`
          + `Trên đoạn [${TD.so(p)}; ${TD.so(q)}] đường thẳng nằm phía trên parabol.\n`
          + `S = ∫ từ ${TD.so(p)} đến ${TD.so(q)} của [(${duong}) − x²]dx = (${TD.so(q)} − (${TD.so(p)}))³/6 = ${tu}/6 = ${phanSo(tu, 6)}.`,
      meo: 'Mẹo: diện tích giữa parabol y = x² và một đường thẳng cắt nó tại x = p, q luôn bằng (q − p)³/6.'
    };
  } },

{ ma: 'toan-oxyz-kc', chuong: 'Oxyz', muc: 3, dang: 'tln',
  tao(R) {
    /* chọn (A;B;C) có độ dài nguyên để đáp án đẹp */
    const n = R.chon([[1, 2, 2], [2, 3, 6], [1, 2, -2], [2, -3, 6], [3, 4, 0], [0, 3, 4], [1, -2, 2]]);
    const do_dai = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
    const M = [R.nguyen(-5, 5), R.nguyen(-5, 5), R.nguyen(-5, 5)];
    const D = R.nguyen(-8, 8);
    const tu = Math.abs(n[0] * M[0] + n[1] * M[1] + n[2] * M[2] + D);
    if (tu === 0) return null;
    const d = T(tu / do_dai, 4);
    const pt = TD.daThuc([[n[0], 'x'], [n[1], 'y'], [n[2], 'z'], [D, '']]) + ' = 0';
    return {
      q: `Trong không gian Oxyz, tính khoảng cách từ điểm M(${TD.so(M[0])}; ${TD.so(M[1])}; ${TD.so(M[2])}) đến mặt phẳng (P): ${pt}. `
       + `(làm tròn đến hàng phần trăm nếu không phải số nguyên)`,
      ans: S(d),
      giai: `d(M,(P)) = |Ax₀ + By₀ + Cz₀ + D| / √(A² + B² + C²)\n`
          + `Tử: |${TD.so(n[0])}·(${TD.so(M[0])}) + ${TD.so(n[1])}·(${TD.so(M[1])}) + ${TD.so(n[2])}·(${TD.so(M[2])}) + (${TD.so(D)})| = ${tu}\n`
          + `Mẫu: √(${n[0]}² + ${n[1]}² + ${n[2]}²) = √${n[0] * n[0] + n[1] * n[1] + n[2] * n[2]} = ${S(do_dai)}\n`
          + `d = ${tu} / ${S(do_dai)} = ${S(d)}.`,
      meo: 'Nhớ lấy TRỊ TUYỆT ĐỐI ở tử và căn tổng bình phương ba hệ số ở mẫu.'
    };
  } },

{ ma: 'toan-oxyz-mc', chuong: 'Oxyz', muc: 3, dang: 'tln',
  tao(R) {
    const a = R.nguyen(-5, 5), b = R.nguyen(-5, 5), c = R.nguyen(-5, 5);
    const Rb = R.nguyen(1, 7);
    const d = a * a + b * b + c * c - Rb * Rb;
    return {
      q: `Trong không gian Oxyz, cho mặt cầu (S): ${TD.daThuc([[1, 'x²'], [1, 'y²'], [1, 'z²'],
            [-2 * a, 'x'], [-2 * b, 'y'], [-2 * c, 'z'], [d, '']])} = 0. `
       + `Bán kính của mặt cầu bằng bao nhiêu?`,
      ans: String(Rb),
      giai: `Dạng x²+y²+z²−2ax−2by−2cz+d = 0 có tâm I(a; b; c) và R = √(a²+b²+c²−d).\n`
          + `So sánh hệ số: a = ${TD.so(a)}, b = ${TD.so(b)}, c = ${TD.so(c)}, d = ${TD.so(d)}\n`
          + `R = √(${a * a} + ${b * b} + ${c * c} − (${TD.so(d)})) = √${Rb * Rb} = ${Rb}.`,
      meo: 'Hệ số của x là −2a nên a = −(hệ số)/2. Điều kiện tồn tại mặt cầu: a²+b²+c²−d > 0.'
    };
  } },

{ ma: 'toan-capso-cong', chuong: 'Cấp số cộng & cấp số nhân', muc: 2, dang: 'tln',
  tao(R) {
    const u1 = R.nguyen(-10, 15), d = R.nguyen(-8, 9);
    if (d === 0) return null;
    const n = R.nguyen(5, 20);
    const Sn = n * (2 * u1 + (n - 1) * d) / 2;
    if (!Number.isInteger(Sn)) return null;
    return {
      q: `Cho cấp số cộng (uₙ) có u₁ = ${TD.so(u1)} và công sai d = ${TD.so(d)}. Tính tổng ${n} số hạng đầu tiên S<sub>${n}</sub>.`,
      ans: String(Sn),
      giai: `Sₙ = n[2u₁ + (n − 1)d]/2\n`
          + `S_${n} = ${n}·[2·${u1} + ${n - 1}·${d}]/2 = ${n}·[${2 * u1} + ${(n - 1) * d}]/2 = ${n}·${2 * u1 + (n - 1) * d}/2 = ${Sn}.`,
      meo: 'Có thể dùng Sₙ = n(u₁ + uₙ)/2 với uₙ = u₁ + (n−1)d — hai công thức tương đương.'
    };
  } },

{ ma: 'toan-capso-nhan', chuong: 'Cấp số cộng & cấp số nhân', muc: 3, dang: 'tln',
  tao(R) {
    const u1 = R.nguyen(1, 6), q = R.chon([2, 3, -2]);
    const n = R.nguyen(4, 9);
    const Sn = u1 * (1 - Math.pow(q, n)) / (1 - q);
    if (!Number.isInteger(Sn) || Math.abs(Sn) > 1e7) return null;
    return {
      q: `Cho cấp số nhân (uₙ) có u₁ = ${u1} và công bội q = ${TD.so(q)}. Tính tổng ${n} số hạng đầu tiên S<sub>${n}</sub>.`,
      ans: String(Sn),
      giai: `Sₙ = u₁(1 − qⁿ)/(1 − q) (áp dụng được vì q ≠ 1)\n`
          + `S<sub>${n}</sub> = ${u1}·(1 − (${TD.so(q)})<sup>${n}</sup>) / (1 − (${TD.so(q)}))\n`
          + `= ${u1}·(1 − ${TD.so(Math.pow(q, n))}) / ${1 - q} = ${TD.so(Sn)}.`,
      meo: 'Công thức này chỉ dùng khi q ≠ 1. Nếu q = 1 thì Sₙ = n·u₁.'
    };
  } },

{ ma: 'toan-thongke-tb', chuong: 'Thống kê ghép nhóm', muc: 3, dang: 'tln',
  tao(R) {
    const dau = R.chon([0, 10, 20]);
    const rong = R.chon([5, 10]);
    const soNhom = R.nguyen(3, 5);
    const tan = []; for (let i = 0; i < soNhom; i++) tan.push(R.nguyen(2, 12));
    const n = tan.reduce((a, b) => a + b, 0);
    const dai = tan.map((_, i) => dau + rong * i + rong / 2);
    const tong = tan.reduce((s2, t, i) => s2 + t * dai[i], 0);
    const tb = T(tong / n, 3);
    const bang = tan.map((t, i) => `[${dau + rong * i}; ${dau + rong * (i + 1)}): ${t}`).join(' · ');
    return {
      q: `Cho mẫu số liệu ghép nhóm với các nhóm và tần số như sau — ${bang}. `
       + `Tính số trung bình của mẫu số liệu này. (làm tròn đến hàng phần trăm nếu cần)`,
      ans: S(tb),
      giai: `Giá trị đại diện mỗi nhóm là trung điểm: ${dai.map(x => S(x)).join(' ; ')}\n`
          + `Tổng tần số: n = ${tan.join(' + ')} = ${n}\n`
          + `Σ(nᵢcᵢ) = ${tan.map((t, i) => t + '·' + S(dai[i])).join(' + ')} = ${S(tong)}\n`
          + `x̄ = ${S(tong)} / ${n} = ${S(tb)}.`,
      meo: 'Với mẫu ghép nhóm, mọi phép tính đều dùng TRUNG ĐIỂM nhóm làm giá trị đại diện.'
    };
  } },

/* Bayes hai hộp chỉ là thay số vào một công thức ⇒ đây là VẬN DỤNG, không phải
   vận dụng cao. Câu VDC của chuyên đề này là toan-vdc-bayes3 (ba nguồn, có sàng lọc). */
{ ma: 'toan-bayes', chuong: 'Xác suất có điều kiện', muc: 3, dang: 'tln',
  tao(R) {
    const d1 = R.nguyen(1, 6), x1 = R.nguyen(1, 6);
    const d2 = R.nguyen(1, 6), x2 = R.nguyen(1, 6);
    const n1 = d1 + x1, n2 = d2 + x2;
    /* P(hộp1 | đỏ) = (½·d1/n1) / (½·d1/n1 + ½·d2/n2) = d1·n2 / (d1·n2 + d2·n1) */
    const tu = d1 * n2, mau = d1 * n2 + d2 * n1;
    if (mau === 0) return null;
    return {
      q: `Hộp I có ${d1} bi đỏ và ${x1} bi xanh. Hộp II có ${d2} bi đỏ và ${x2} bi xanh. `
       + `Chọn ngẫu nhiên một hộp rồi lấy ngẫu nhiên một viên bi từ hộp đó. Biết viên bi lấy được màu đỏ, `
       + `tính xác suất viên bi đó được lấy từ hộp I. Viết dưới dạng phân số tối giản a/b.`,
      ans: phanSo(tu, mau),
      giai: `Gọi A: "chọn hộp I", B: "lấy được bi đỏ". P(A) = P(Ā) = 1/2.\n`
          + `P(B|A) = ${d1}/${n1} ; P(B|Ā) = ${d2}/${n2}\n`
          + `Xác suất toàn phần: P(B) = ½·${d1}/${n1} + ½·${d2}/${n2} = ${S(T(0.5 * d1 / n1 + 0.5 * d2 / n2, 6))}\n`
          + `Bayes: P(A|B) = [½·${d1}/${n1}] / P(B) = ${phanSo(tu, mau)}.`,
      meo: 'Vẽ sơ đồ hình cây: nhân dọc theo nhánh, rồi lấy nhánh mong muốn chia tổng các nhánh cho cùng kết quả.'
    };
  } },

{ ma: 'toan-tohop', chuong: 'Tổ hợp – Xác suất', muc: 2, dang: 'tln',
  tao(R) {
    const n = R.nguyen(6, 15), k = R.nguyen(2, 4);
    if (k >= n) return null;
    let C = 1; for (let i = 0; i < k; i++) C = C * (n - i) / (i + 1);
    C = Math.round(C);
    const coThuTu = R() < 0.5;
    let A = 1; for (let i = 0; i < k; i++) A *= (n - i);
    return {
      q: coThuTu
        ? `Một tổ có ${n} học sinh. Có bao nhiêu cách chọn ${k} học sinh và xếp vào ${k} vị trí khác nhau (có phân biệt thứ tự)?`
        : `Một tổ có ${n} học sinh. Có bao nhiêu cách chọn ra ${k} học sinh để lập một nhóm (không phân biệt thứ tự)?`,
      ans: String(coThuTu ? A : C),
      giai: coThuTu
        ? `Có phân biệt thứ tự ⇒ dùng CHỈNH HỢP.\nA(${k},${n}) = ${n}·${n - 1}${k > 2 ? '·' + (n - 2) : ''}${k > 3 ? '·' + (n - 3) : ''} = ${A}.`
        : `Không phân biệt thứ tự ⇒ dùng TỔ HỢP.\nC(${k},${n}) = ${n}!/[${k}!·${n - k}!] = ${C}.`,
      meo: 'Có thứ tự ⇒ chỉnh hợp A. Không thứ tự ⇒ tổ hợp C. Đọc kỹ chữ "xếp" hay "chọn".'
    };
  } },

{ ma: 'toan-the-tich-chop', chuong: 'Hình không gian', muc: 3, dang: 'tln',
  tao(R) {
    const loai = R.chon(['vuong', 'chunhat', 'tamgiacvuong']);
    const h = R.nguyen(2, 12);
    let Sd, mo;
    if (loai === 'vuong') { const a = R.nguyen(2, 10); Sd = a * a; mo = `đáy là hình vuông cạnh ${a}`; }
    else if (loai === 'chunhat') { const a = R.nguyen(2, 9), b = R.nguyen(2, 9); Sd = a * b; mo = `đáy là hình chữ nhật có hai cạnh ${a} và ${b}`; }
    else { const a = R.nguyen(2, 9), b = R.nguyen(2, 9); Sd = a * b / 2; mo = `đáy là tam giác vuông có hai cạnh góc vuông ${a} và ${b}`; }
    const V = T(Sd * h / 3, 4);
    return {
      q: `Cho khối chóp có ${mo} và chiều cao bằng ${h}. Tính thể tích khối chóp. (làm tròn đến hàng phần trăm nếu cần)`,
      ans: S(V),
      giai: `Diện tích đáy: S = ${S(Sd)}\n`
          + `V = (1/3)·S·h = (1/3)·${S(Sd)}·${h} = ${S(V)}.`,
      meo: 'Khối chóp có hệ số 1/3; khối lăng trụ thì KHÔNG có hệ số này.'
    };
  } },

{ ma: 'toan-tron-non-cau', chuong: 'Khối tròn xoay', muc: 2, dang: 'tln',
  tao(R) {
    /* Bốn dạng cũ chỉ đẻ ra hơn bốn chục đề khác nhau vì hai dạng nón dùng
       chung năm bộ Pythagore. Thêm thể tích nón, thể tích cầu, diện tích toàn
       phần trụ và mở rộng bộ ba số cho đủ biến thể. */
    const loai = R.chon(['tru-V', 'tru-Stp', 'non-l', 'non-Sxq', 'non-V', 'cau-S', 'cau-V']);
    if (loai === 'cau-S') {
      const Rb = R.nguyen(1, 14);
      return { q: `Tính diện tích mặt cầu bán kính R = ${Rb}. Kết quả có dạng kπ, hãy tìm k.`,
        ans: String(4 * Rb * Rb),
        giai: `S = 4πR² = 4π·${Rb}² = ${4 * Rb * Rb}π ⇒ k = ${4 * Rb * Rb}.`,
        meo: 'Mặt cầu: S = 4πR², V = (4/3)πR³. Đừng nhầm với diện tích hình tròn πR².' };
    }
    if (loai === 'cau-V') {
      const Rb = R.chon([3, 6, 9, 12, 15]);          /* chia hết cho 3 để k nguyên */
      const k = 4 * Rb * Rb * Rb / 3;
      return { q: `Tính thể tích khối cầu bán kính R = ${Rb}. Kết quả có dạng kπ, hãy tìm k.`,
        ans: String(k),
        giai: `V = (4/3)πR³ = (4/3)π·${Rb}³ = (4·${Rb * Rb * Rb}/3)π = ${k}π ⇒ k = ${k}.`,
        meo: 'Thể tích cầu có hệ số 4/3 và mũ BA; diện tích mặt cầu hệ số 4 và mũ HAI.' };
    }
    if (loai === 'tru-Stp') {
      const r = R.nguyen(1, 9), h = R.nguyen(2, 14);
      const k = 2 * r * (h + r);
      return { q: `Tính diện tích toàn phần của hình trụ có bán kính đáy r = ${r} và chiều cao h = ${h}. Kết quả có dạng kπ, hãy tìm k.`,
        ans: String(k),
        giai: `S_tp = S_xq + 2·S_đáy = 2πrh + 2πr² = 2πr(h + r)\n`
            + `  = 2π·${r}·(${h} + ${r}) = ${k}π ⇒ k = ${k}.`,
        meo: 'Trụ có HAI mặt đáy nên phải cộng 2πr², nón chỉ có một đáy.' };
    }
    if (loai === 'tru-V') {
      const r = R.nguyen(1, 8), h = R.nguyen(2, 12);
      return { q: `Tính thể tích khối trụ có bán kính đáy r = ${r} và chiều cao h = ${h}. Kết quả có dạng kπ, hãy tìm k.`,
        ans: String(r * r * h),
        giai: `V = πr²h = π·${r}²·${h} = ${r * r * h}π ⇒ k = ${r * r * h}.`,
        meo: 'Khối trụ V = πr²h; khối nón có thêm hệ số 1/3.' };
    }
    const bo = R.chon([[3, 4, 5], [6, 8, 10], [9, 12, 15], [12, 16, 20], [15, 20, 25],
                       [5, 12, 13], [10, 24, 26], [8, 15, 17], [16, 30, 34],
                       [7, 24, 25], [20, 21, 29], [9, 40, 41], [12, 35, 37]]);
    const [r, h, l] = bo;
    if (loai === 'non-V') {
      /* r²h phải chia hết cho 3 mới ra k nguyên */
      if ((r * r * h) % 3) return null;
      const k = r * r * h / 3;
      return { q: `Tính thể tích khối nón có bán kính đáy r = ${r} và chiều cao h = ${h}. Kết quả có dạng kπ, hãy tìm k.`,
        ans: String(k),
        giai: `V = (1/3)πr²h = (1/3)π·${r}²·${h} = ${k}π ⇒ k = ${k}.`,
        meo: 'Nón dùng CHIỀU CAO h cho thể tích, dùng ĐƯỜNG SINH l cho diện tích xung quanh.' };
    }
    if (loai === 'non-l') {
      return { q: `Một hình nón có bán kính đáy r = ${r} và chiều cao h = ${h}. Tính độ dài đường sinh l.`,
        ans: String(l),
        giai: `l² = r² + h² = ${r}² + ${h}² = ${r * r} + ${h * h} = ${l * l}\n⇒ l = ${l}.`,
        meo: 'Đường sinh l là cạnh huyền của tam giác vuông tạo bởi r và h.' };
    }
    return { q: `Một hình nón có bán kính đáy r = ${r} và chiều cao h = ${h}. Tính diện tích xung quanh. Kết quả có dạng kπ, hãy tìm k.`,
      ans: String(r * l),
      giai: `Đường sinh: l = √(r² + h²) = √(${r * r} + ${h * h}) = ${l}\n`
          + `S_xq = πrl = π·${r}·${l} = ${r * l}π ⇒ k = ${r * l}.`,
      meo: 'Diện tích xung quanh nón dùng ĐƯỜNG SINH l, còn thể tích mới dùng chiều cao h.' };
  } },

{ ma: 'toan-gtln', chuong: 'GTLN – GTNN', muc: 3, dang: 'tln',
  tao(R) {
    const S0 = R.nguyen(4, 120) * 2;                 /* chu vi/2 = S0, tìm max của x(S0−x) */
    const x = S0 / 2, max = x * x;
    return {
      q: `Trong tất cả các hình chữ nhật có chu vi bằng ${2 * S0}, tìm diện tích lớn nhất.`,
      ans: String(max),
      giai: `Gọi hai cạnh là x và y với x + y = ${2 * S0}/2 = ${S0}.\n`
          + `Diện tích S = x·y = x(${S0} − x) = −x² + ${S0}x\n`
          + `S′ = −2x + ${S0} = 0 ⇒ x = ${x}\n`
          + `Lập bảng biến thiên: S đạt cực đại tại x = ${x} ⇒ S_max = ${x}·${S0 - x} = ${max}.\n`
          + `(Hình chữ nhật đó chính là hình vuông cạnh ${x}.)`,
      meo: 'Trong các hình chữ nhật cùng chu vi, HÌNH VUÔNG có diện tích lớn nhất — nhớ kết quả này để kiểm tra nhanh.'
    };
  } },

{ ma: 'toan-tieptuyen', chuong: 'Tiếp tuyến', muc: 3, dang: 'tln',
  tao(R) {
    const a = R.nguyen(1, 4), b = R.nguyen(-5, 5), c = R.nguyen(-5, 5);
    const x0 = R.nguyen(-3, 4);
    const k = 2 * a * x0 + b;                        /* y' = 2ax + b */
    return {
      q: `Cho hàm số y = ${TD.daThuc([[a, 'x²'], [b, 'x'], [c, '']])}. `
       + `Tính hệ số góc của tiếp tuyến với đồ thị hàm số tại điểm có hoành độ x₀ = ${TD.so(x0)}.`,
      ans: String(k),
      giai: `y′ = ${TD.daThuc([[2 * a, 'x'], [b, '']])}\n`
          + `Hệ số góc tiếp tuyến tại x₀ chính là y′(x₀):\n`
          + `k = y′(${TD.so(x0)}) = ${2 * a}·(${TD.so(x0)})${b === 0 ? '' : (b > 0 ? ' + ' + b : ' − ' + (-b))} = ${TD.so(k)}.`,
      meo: 'Hệ số góc tiếp tuyến = đạo hàm tại tiếp điểm. Phương trình: y = f′(x₀)(x − x₀) + y₀.'
    };
  } },

{ ma: 'toan-mu-pt', chuong: 'Mũ – Logarit', muc: 2, dang: 'tln',
  tao(R) {
    const a = R.chon([2, 3, 5]);
    const m = R.nguyen(1, 4), p = R.nguyen(1, 5), q = R.nguyen(-4, 4);
    /* a^(p x + q) = a^m  ⇒ x = (m − q)/p */
    const tu = m - q;
    if (tu % p !== 0) return null;
    const x = tu / p;
    return {
      q: `Giải phương trình ${a}<sup>${TD.daThuc([[p, 'x'], [q, '']])}</sup> = ${Math.pow(a, m)}. Nghiệm x bằng bao nhiêu?`,
      ans: String(x),
      giai: `Đưa hai vế về cùng cơ số ${a}: ${Math.pow(a, m)} = ${a}<sup>${m}</sup>\n`
          + `${a}<sup>${TD.daThuc([[p, 'x'], [q, '']])}</sup> = ${a}<sup>${m}</sup>\n`
          + `⇒ ${TD.daThuc([[p, 'x'], [q, '']])} = ${m} ⇒ x = ${TD.so(x)}.`,
      meo: 'Cùng cơ số thì bằng số mũ. Nhớ điều kiện 0 < a ≠ 1.'
    };
  } },

{ ma: 'toan-vecto', chuong: 'Oxyz', muc: 2, dang: 'tln',
  tao(R) {
    const A = [R.nguyen(-6, 6), R.nguyen(-6, 6), R.nguyen(-6, 6)];
    const B = [R.nguyen(-6, 6), R.nguyen(-6, 6), R.nguyen(-6, 6)];
    const v = [B[0] - A[0], B[1] - A[1], B[2] - A[2]];
    const d2 = v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
    if (d2 === 0) return null;
    const d = T(Math.sqrt(d2), 4);
    return {
      q: `Trong không gian Oxyz, cho hai điểm A(${A.join('; ')}) và B(${B.join('; ')}). Tính độ dài đoạn thẳng AB. `
       + `(làm tròn đến hàng phần trăm nếu cần)`,
      ans: S(d),
      giai: `AB⃗ = (${v.join('; ')})\n`
          + `AB = √(${v[0]}² + ${v[1]}² + ${v[2]}²) = √(${v[0] * v[0]} + ${v[1] * v[1]} + ${v[2] * v[2]}) = √${d2} = ${S(d)}.`,
      meo: 'Toạ độ vectơ AB⃗ = toạ độ B trừ toạ độ A. Nhớ thứ tự "ngọn trừ gốc".'
    };
  } },

{ ma: 'toan-phuongsai', chuong: 'Thống kê', muc: 3, dang: 'tln',
  tao(R) {
    const n = R.nguyen(4, 6);
    /* dựng số liệu quanh một trung bình nguyên cho trước, tổng độ lệch bằng 0 */
    const tb = R.nguyen(6, 16);
    const lech = []; let cong = 0;
    for (let i = 0; i < n - 1; i++) { const e = R.nguyen(-5, 5); lech.push(e); cong += e; }
    lech.push(-cong);
    const ds = lech.map(e => tb + e);
    if (ds.some(x => x < 1)) return null;
    const S2 = T(ds.reduce((s2, x) => s2 + (x - tb) * (x - tb), 0) / n, 4);
    return {
      q: `Cho mẫu số liệu: ${ds.join('; ')}. Tính phương sai của mẫu. (làm tròn đến hàng phần trăm nếu cần)`,
      ans: S(S2),
      giai: `Số trung bình: x̄ = (${ds.join(' + ')})/${n} = ${S(tb)}\n`
          + `Các độ lệch bình phương: ${ds.map(x => `(${x} − ${S(tb)})² = ${S((x - tb) * (x - tb))}`).join(' ; ')}\n`
          + `S² = tổng/${n} = ${S(T(ds.reduce((s2, x) => s2 + (x - tb) * (x - tb), 0), 4))}/${n} = ${S(S2)}.\n`
          + `(Độ lệch chuẩn S = √S² = ${S(T(Math.sqrt(S2), 3))}.)`,
      meo: 'Phương sai luôn KHÔNG ÂM. Độ lệch chuẩn là căn bậc hai của phương sai và cùng đơn vị với số liệu.'
    };
  } }
];
})();
