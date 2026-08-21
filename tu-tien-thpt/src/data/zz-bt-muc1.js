/* ============================================================
   BÀI TẬP MỨC 1 (BIẾT) — TOÁN · LÝ · HOÁ · SINH
   Trước file này, Luyện Công mức 1 của Toán và Sinh có ĐÚNG 0 mẫu
   bài tập: toàn bộ là câu "phát biểu nào sau đây đúng về…" sinh ra
   từ kho mệnh đề. Đề thi thật không như vậy — câu mức 1 của khối tự
   nhiên vẫn là một phép tính, chỉ khác ở chỗ áp thẳng một công thức
   trong một bước chứ không phải suy luận nhiều tầng.
   Mỗi mẫu ở đây đều là trắc nghiệm Phần I: đáp án nhiễu dựng từ
   những lỗi sai kinh điển (quên chia 2, nhầm n−1 với n, đổi sai đơn
   vị) chứ không phải số bịa cho có.
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {};

(function () {
const S = TD.soVN;

/* Dựng câu trắc nghiệm từ đáp số đúng và danh sách đáp số nhiễu.
   fmt biến số thành chuỗi hiển thị; trùng nhau sau khi định dạng thì
   bỏ mẫu này đi cho lần gieo sau, thà mất một biến thể còn hơn ra đề
   có hai phương án giống hệt nhau. */
const MC = (R, de, dung, sai, giai, meo, fmt) => {
  const f = fmt || (x => S(x));
  const cDung = f(dung);
  const cSai = [];
  for (const x of sai) {
    const c = f(x);
    if (c !== cDung && cSai.indexOf(c) < 0) cSai.push(c);
    if (cSai.length === 3) break;
  }
  if (cSai.length < 3) return null;
  const opts = TD.xaoR(R, [cDung].concat(cSai));
  return { q: de, opts: opts, ans: opts.indexOf(cDung), giai: giai, meo: meo };
};

/* ============================================================
   TOÁN — 10 mẫu
   ============================================================ */
TD.GEN.toan = (TD.GEN.toan || []).concat([

{ ma: 'toan-m1-capso-un', chuong: 'Cấp số cộng & cấp số nhân', muc: 1, dang: 'mc',
  tao(R) {
    const u1 = R.nguyen(-9, 12), d = R.nguyen(-7, 8), n = R.nguyen(6, 20);
    if (!d) return null;
    const un = u1 + (n - 1) * d;
    return MC(R, `Cho cấp số cộng (uₙ) có u₁ = ${TD.so(u1)} và công sai d = ${TD.so(d)}. Số hạng thứ ${n} bằng bao nhiêu?`,
      un, [u1 + n * d, u1 + (n - 1) * d + d * 2, u1 * d, un - d * 2],
      `uₙ = u₁ + (n − 1)d\n`
      + `u<sub>${n}</sub> = ${TD.so(u1)} + (${n} − 1)·${TD.so(d)} = ${TD.so(u1)} + ${TD.so((n - 1) * d)} = ${TD.so(un)}.`,
      'Nhớ là (n − 1)d chứ không phải nd — u₁ đã là số hạng đầu rồi nên chỉ cộng thêm d đúng n − 1 lần.');
  } },

{ ma: 'toan-m1-daoham', chuong: 'Khảo sát hàm số', muc: 1, dang: 'mc',
  tao(R) {
    const a = R.chon([1, 2, 3, -1, -2]), b = R.nguyen(-6, 6), c = R.nguyen(-9, 9);
    const x0 = R.nguyen(-3, 3);
    const y = 3 * a * x0 * x0 + 2 * b * x0 + c;
    const ct = TD.daThuc([[a, 'x³'], [b, 'x²'], [c, 'x'], [R.nguyen(-5, 5), '']]);
    return MC(R, `Cho hàm số y = ${ct}. Tính y′(${TD.so(x0)}).`,
      y, [3 * a * x0 * x0 + b * x0 + c, a * x0 * x0 + 2 * b * x0 + c, 3 * a * x0 * x0 + 2 * b * x0, y + c],
      `y′ = ${TD.daThuc([[3 * a, 'x²'], [2 * b, 'x'], [c, '']])}\n`
      + `Thay x = ${TD.so(x0)}: y′(${TD.so(x0)}) = ${TD.so(3 * a)}·${TD.so(x0 * x0)} + ${TD.so(2 * b)}·(${TD.so(x0)}) + ${TD.so(c)} = ${TD.so(y)}.`,
      'Đạo hàm hạ bậc: (xⁿ)′ = n·xⁿ⁻¹. Hằng số tự do biến mất, đây là chỗ hay quên nhất.',
      x => TD.so(x));
  } },

{ ma: 'toan-m1-tiemcan-ngang', chuong: 'Khảo sát hàm số', muc: 1, dang: 'mc',
  tao(R) {
    const a = R.chon([1, 2, 3, 4, -1, -2, -3]), b = R.nguyen(-6, 6);
    const c = R.chon([1, 2, 4]), d = R.nguyen(-6, 6);
    if (a * d - b * c === 0) return null;
    const y0 = a / c;
    return MC(R, `Đường tiệm cận ngang của đồ thị hàm số y = (${TD.daThuc([[a, 'x'], [b, '']])})/(${TD.daThuc([[c, 'x'], [d, '']])}) là đường nào?`,
      y0, [c / a, -d / c, -y0, y0 + 1, a - c],
      `Với hàm phân thức bậc nhất trên bậc nhất, tiệm cận ngang là y = (hệ số của x ở tử)/(hệ số của x ở mẫu).\n`
      + `y = ${TD.so(a)}/${TD.so(c)} = ${S(y0)}.`,
      'Tiệm cận NGANG lấy hệ số x của tử chia hệ số x của mẫu; tiệm cận ĐỨNG là nghiệm của mẫu. Hai cái này rất hay bị đảo cho nhau.',
      x => 'y = ' + S(x));
  } },

{ ma: 'toan-m1-vecto', chuong: 'Oxyz', muc: 1, dang: 'mc',
  tao(R) {
    const A = [R.nguyen(-6, 6), R.nguyen(-6, 6), R.nguyen(-6, 6)];
    const B = [R.nguyen(-6, 6), R.nguyen(-6, 6), R.nguyen(-6, 6)];
    const v = [B[0] - A[0], B[1] - A[1], B[2] - A[2]];
    if (!v[0] && !v[1] && !v[2]) return null;
    const bo = t => `(${t.map(x => TD.so(x)).join('; ')})`;
    return MC(R, `Trong không gian Oxyz cho A${bo(A)} và B${bo(B)}. Toạ độ vectơ AB→ là gì?`,
      v, [[A[0] - B[0], A[1] - B[1], A[2] - B[2]], [A[0] + B[0], A[1] + B[1], A[2] + B[2]],
          [v[0], -v[1], v[2]], [B[0], B[1], B[2]]],
      `AB→ = (x_B − x_A; y_B − y_A; z_B − z_A)\n`
      + `= (${TD.so(B[0])} − ${TD.so(A[0])}; ${TD.so(B[1])} − ${TD.so(A[1])}; ${TD.so(B[2])} − ${TD.so(A[2])}) = ${bo(v)}.`,
      'Luôn là ĐIỂM NGỌN trừ ĐIỂM GỐC. Đảo thứ tự là ra vectơ ngược dấu, một lỗi mất điểm rất lãng phí.',
      bo);
  } },

{ ma: 'toan-m1-nguyenham', chuong: 'Nguyên hàm – Tích phân', muc: 1, dang: 'mc',
  tao(R) {
    const n = R.nguyen(2, 6);
    const he = R.nguyen(1, 5);
    const a = he * (n + 1);          /* chọn ngược từ hệ số nguyên hàm để hệ số luôn đẹp */
    return MC(R, `Họ nguyên hàm của hàm số f(x) = ${TD.hangTu(a, 'x<sup>' + n + '</sup>')} là gì?`,
      [he, n + 1], [[a * n, n - 1], [a, n + 1], [a / n, n], [he, n]],
      `∫xⁿ dx = xⁿ⁺¹/(n + 1) + C\n`
      + `∫${TD.hangTu(a, 'x<sup>' + n + '</sup>')} dx = ${TD.so(a)}·x<sup>${n + 1}</sup>/${n + 1} + C = ${TD.hangTu(he, 'x<sup>' + (n + 1) + '</sup>')} + C.`,
      'Nguyên hàm thì TĂNG bậc rồi chia cho bậc mới; đạo hàm mới là hạ bậc rồi nhân. Nhớ ngược là mất điểm ngay câu dễ.',
      t => TD.hangTu(t[0], 'x<sup>' + t[1] + '</sup>') + ' + C');
  } },

{ ma: 'toan-m1-logarit', chuong: 'Mũ – Logarit', muc: 1, dang: 'mc',
  tao(R) {
    const co = R.chon([2, 3, 5, 10]), k = R.nguyen(2, 6);
    const x = Math.pow(co, k);
    if (x > 1e6) return null;
    return MC(R, `Tính giá trị của log<sub>${co}</sub>${S(x)}.`,
      k, [k + 1, k - 1, x / co, co * k],
      `Đặt log<sub>${co}</sub>${S(x)} = t ⇒ ${co}<sup>t</sup> = ${S(x)}.\n`
      + `Mà ${S(x)} = ${co}<sup>${k}</sup> nên t = ${k}.`,
      'Đưa số trong log về luỹ thừa của cơ số là xong. Máy tính bấm log rồi chia cũng ra, nhưng nhìn luỹ thừa thì nhanh hơn.');
  } },

{ ma: 'toan-m1-thetich-hop', chuong: 'Hình không gian', muc: 1, dang: 'mc',
  tao(R) {
    const a = R.nguyen(2, 9), b = R.nguyen(2, 9), c = R.nguyen(2, 9);
    const V = a * b * c;
    return MC(R, `Một khối hộp chữ nhật có ba kích thước ${a} cm, ${b} cm và ${c} cm. Thể tích của khối hộp bằng bao nhiêu?`,
      V, [V / 3, 2 * (a * b + b * c + c * a), a + b + c, a * b],
      `V = dài × rộng × cao = ${a}·${b}·${c} = ${V} (cm³).`,
      'Chia 3 chỉ dành cho khối CHÓP và khối NÓN. Khối hộp, khối lăng trụ, khối trụ thì lấy nguyên diện tích đáy nhân chiều cao.',
      x => S(x) + ' cm³');
  } },

{ ma: 'toan-m1-trungbinh', chuong: 'Thống kê', muc: 1, dang: 'mc',
  tao(R) {
    const n = R.nguyen(5, 8);
    const ds = [];
    for (let i = 0; i < n; i++) ds.push(R.nguyen(2, 20));
    const tong = ds.reduce((a, b) => a + b, 0);
    const tb = tong / n;
    return MC(R, `Điểm kiểm tra của một nhóm ${n} học sinh lần lượt là: ${ds.join('; ')}. Số trung bình của mẫu số liệu này bằng bao nhiêu?`,
      tb, [tong / (n - 1), tong, tb + 1, Math.max.apply(null, ds)],
      `x̄ = (tổng các giá trị)/(số giá trị)\n`
      + `Tổng = ${ds.join(' + ')} = ${tong}\n`
      + `x̄ = ${tong}/${n} = ${S(tb)}.`,
      'Mẫu số là SỐ GIÁ TRỊ n, không phải n − 1. Chỉ phương sai mẫu hiệu chỉnh mới chia n − 1.');
  } },

{ ma: 'toan-m1-xacsuat', chuong: 'Tổ hợp – Xác suất', muc: 1, dang: 'mc',
  tao(R) {
    const d = R.nguyen(3, 9), x = R.nguyen(3, 9);
    const t = d + x;
    const p = d / t;
    return MC(R, `Một hộp có ${d} viên bi đỏ và ${x} viên bi xanh, các viên bi khác nhau về màu nhưng cùng kích thước. Lấy ngẫu nhiên một viên. Xác suất lấy được bi đỏ bằng bao nhiêu?`,
      p, [x / t, d / x, x / d, 1 / t],
      `Không gian mẫu: n(Ω) = ${d} + ${x} = ${t} cách lấy.\n`
      + `Biến cố A "lấy được bi đỏ": n(A) = ${d}.\n`
      + `P(A) = ${d}/${t} = ${S(p, 3)}.`,
      'Mẫu số luôn là TỔNG số phần tử, đừng lấy nhầm số bi màu còn lại làm mẫu số.',
      v => S(v, 3));
  } },

{ ma: 'toan-m1-tichphan', chuong: 'Nguyên hàm – Tích phân', muc: 1, dang: 'mc',
  tao(R) {
    const a = R.chon([1, 2, 3]), b = R.nguyen(-5, 5);
    const c1 = R.nguyen(1, 3), c2 = c1 + R.nguyen(1, 3);
    const F = t => a * t * t / 2 + b * t;
    const I = F(c2) - F(c1);
    if (!I) return null;
    return MC(R, `Tính tích phân I = ∫ từ ${c1} đến ${c2} của (${TD.daThuc([[a, 'x'], [b, '']])}) dx.`,
      I, [F(c2), F(c1) - F(c2), F(c2) + F(c1), I / 2, I + F(c1)],
      `Nguyên hàm: F(x) = ${TD.daThuc([[a / 2, 'x²'], [b, 'x']])}\n`
      + `I = F(${c2}) − F(${c1}) = ${S(F(c2))} − ${S(F(c1))} = ${S(I)}.`,
      'Luôn là F(cận trên) − F(cận dưới). Cận dưới bằng 0 vẫn phải viết ra, kẻo quen tay rồi gặp cận dưới khác 0 lại quên trừ.');
  } }

]);

/* ============================================================
   LÝ — 4 mẫu
   ============================================================ */
TD.GEN.ly = (TD.GEN.ly || []).concat([

{ ma: 'ly-m1-doinhietdo', chuong: 'Vật lí nhiệt', muc: 1, dang: 'mc',
  tao(R) {
    const t = R.nguyen(-40, 120);
    const K = t + 273;
    return MC(R, `Một vật có nhiệt độ ${TD.so(t)} °C. Nhiệt độ của vật trong thang Kelvin bằng bao nhiêu?`,
      K, [t - 273, 273 - t, t, t + 100],
      `T(K) = t(°C) + 273\n`
      + `T = ${TD.so(t)} + 273 = ${TD.so(K)} K.`,
      'Đổi độ C sang K chỉ CỘNG 273, không nhân chia gì cả. Độ chênh lệch nhiệt độ Δt thì hai thang bằng nhau.',
      x => TD.so(x) + ' K');
  } },

{ ma: 'ly-m1-nhietluong', chuong: 'Vật lí nhiệt', muc: 1, dang: 'mc',
  tao(R) {
    const m = R.chon([0.5, 1, 1.5, 2, 2.5, 3]);
    const c = R.chon([880, 460, 4200, 380]);
    const dt = R.nguyen(10, 60);
    const Q = m * c * dt;
    return MC(R, `Cung cấp nhiệt cho ${S(m)} kg một chất có nhiệt dung riêng ${c} J/(kg·K) thì nhiệt độ của nó tăng thêm ${dt} K. Nhiệt lượng đã cung cấp bằng bao nhiêu?`,
      Q, [c * dt, m * c, m * dt, Q / 1000],
      `Q = m·c·Δt\n`
      + `Q = ${S(m)}·${c}·${dt} = ${S(Q)} J.`,
      'Nhớ đổi khối lượng về kg trước khi thay vào, vì đơn vị của c đã gắn với kg rồi.',
      x => S(x) + ' J');
  } },

{ ma: 'ly-m1-tuthong', chuong: 'Từ trường', muc: 1, dang: 'mc',
  tao(R) {
    const B = R.chon([0.02, 0.05, 0.1, 0.2, 0.5]);
    const S1 = R.chon([0.01, 0.02, 0.04, 0.05, 0.1]);
    const N = R.chon([1, 10, 20, 50]);
    const phi = N * B * S1;
    return MC(R, `Một khung dây phẳng gồm ${N} vòng, mỗi vòng có diện tích ${S(S1, 3)} m², đặt trong từ trường đều B = ${S(B, 3)} T sao cho vectơ pháp tuyến của khung song song cùng chiều với B. Từ thông qua khung bằng bao nhiêu?`,
      phi, [B * S1, N * B / S1, phi * 2, B / S1],
      `Φ = N·B·S·cosα, ở đây α = 0 nên cosα = 1.\n`
      + `Φ = ${N}·${S(B, 3)}·${S(S1, 3)} = ${S(phi, 4)} Wb.`,
      'α là góc giữa PHÁP TUYẾN của mặt phẳng khung và vectơ B, không phải góc giữa B với mặt phẳng khung. Nhầm hai góc này là lệch nhau đúng 90°.',
      x => S(x, 4) + ' Wb');
  } },

{ ma: 'ly-m1-hatnhan-kihieu', chuong: 'Hạt nhân', muc: 1, dang: 'mc',
  tao(R) {
    const ds = [['U', 92, 238], ['U', 92, 235], ['Po', 84, 210], ['Ra', 88, 226],
                ['C', 6, 14], ['Na', 11, 24], ['Co', 27, 60], ['Pu', 94, 239]];
    const it = R.chon(ds);
    const Z = it[1], A = it[2], N = A - Z;
    const hoi = R.chon(['nơtron', 'proton', 'nuclôn']);
    const dung = hoi === 'nơtron' ? N : hoi === 'proton' ? Z : A;
    return MC(R, `Hạt nhân <sup>${A}</sup><sub>${Z}</sub>${it[0]} có bao nhiêu ${hoi}?`,
      dung, [A, Z, N, A + Z],
      `Kí hiệu <sup>A</sup><sub>Z</sub>X: Z là số proton, A là số nuclôn, số nơtron N = A − Z.\n`
      + `Ở đây Z = ${Z}, A = ${A} nên N = ${A} − ${Z} = ${N}.\n`
      + `Số ${hoi} cần tìm là ${dung}.`,
      'Số dưới là proton, số trên là tổng nuclôn. Số nơtron không được ghi sẵn, phải trừ ra.');
  } }

]);

/* ============================================================
   HOÁ — 3 mẫu
   ============================================================ */
TD.GEN.hoa = (TD.GEN.hoa || []).concat([

{ ma: 'hoa-m1-mol', chuong: 'Đại cương', muc: 1, dang: 'mc',
  tao(R) {
    const ds = [['NaCl', 58.5], ['CaCO<sub>3</sub>', 100], ['H<sub>2</sub>SO<sub>4</sub>', 98],
                ['NaOH', 40], ['CuSO<sub>4</sub>', 160], ['KMnO<sub>4</sub>', 158],
                ['Fe<sub>2</sub>O<sub>3</sub>', 160], ['glucose C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>', 180]];
    const it = R.chon(ds);
    const n = R.chon([0.1, 0.2, 0.25, 0.5, 1, 1.5, 2]);
    const m = n * it[1];
    return MC(R, `Số mol có trong ${S(m)} gam ${it[0]} (M = ${S(it[1])} g/mol) bằng bao nhiêu?`,
      n, [it[1] / m, m * it[1], n * 2, n / 2],
      `n = m/M\n`
      + `n = ${S(m)}/${S(it[1])} = ${S(n, 3)} mol.`,
      'Khối lượng chia phân tử khối. Đảo ngược thành M/m là ra một số vô nghĩa — cứ nhìn đơn vị gam chia g/mol thì còn lại mol là biết đúng chiều.',
      x => S(x, 3) + ' mol');
  } },

{ ma: 'hoa-m1-nongdo', chuong: 'Đại cương', muc: 1, dang: 'mc',
  tao(R) {
    const n = R.chon([0.1, 0.2, 0.3, 0.5, 0.6, 1, 1.2]);
    const V = R.chon([0.1, 0.2, 0.25, 0.5, 2]);
    const C = n / V;
    if (C > 6) return null;
    return MC(R, `Hoà tan ${S(n, 2)} mol chất tan vào nước thu được ${S(V * 1000)} mL dung dịch. Nồng độ mol của dung dịch bằng bao nhiêu?`,
      C, [n * V, V / n, n / (V * 1000), C / 1000],
      `C<sub>M</sub> = n/V với V tính bằng LÍT.\n`
      + `V = ${S(V * 1000)} mL = ${S(V, 3)} L\n`
      + `C<sub>M</sub> = ${S(n, 2)}/${S(V, 3)} = ${S(C, 3)} M.`,
      'Đề luôn cho thể tích bằng mL để bẫy — phải đổi sang lít trước khi chia, quên là lệch đúng 1000 lần.',
      x => S(x, 3) + ' M');
  } },

{ ma: 'hoa-m1-thetichkhi', chuong: 'Đại cương', muc: 1, dang: 'mc',
  tao(R) {
    const n = R.chon([0.1, 0.2, 0.25, 0.5, 1, 1.5, 2]);
    const V = n * 24.79;
    return MC(R, `Ở điều kiện chuẩn (25 °C, 1 bar), ${S(n, 2)} mol khí chiếm thể tích bằng bao nhiêu?`,
      V, [n * 22.4, n / 24.79, 24.79 / n, V * 2],
      `Ở điều kiện chuẩn, 1 mol khí bất kì chiếm 24,79 L.\n`
      + `V = n·24,79 = ${S(n, 2)}·24,79 = ${S(V, 3)} L.`,
      'Chương trình 2018 dùng ĐIỀU KIỆN CHUẨN 24,79 L/mol chứ không còn 22,4 L/mol của điều kiện tiêu chuẩn cũ. Đây là chỗ sách cũ và sách mới lệch nhau, để ý kẻo dùng nhầm số.',
      x => S(x, 3) + ' L');
  } }

]);

/* ============================================================
   SINH — 6 mẫu
   ============================================================ */
TD.GEN.sinh = (TD.GEN.sinh || []).concat([

{ ma: 'sinh-m1-sonu', chuong: 'Cơ sở phân tử', muc: 1, dang: 'mc',
  tao(R) {
    const N = R.nguyen(30, 300) * 10;
    const L = N / 2 * 3.4;
    return MC(R, `Một đoạn phân tử ADN có chiều dài ${S(L, 1)} Å. Tổng số nuclêôtit của đoạn ADN đó bằng bao nhiêu?`,
      N, [N / 2, N * 2, Math.round(L / 3.4 * 2 / 3), N / 4],
      `L = (N/2)·3,4 Å ⇒ N = 2L/3,4\n`
      + `N = 2·${S(L, 1)}/3,4 = ${N} nuclêôtit.`,
      'ADN có HAI mạch nên chiều dài tính theo N/2 nuclêôtit của một mạch, mỗi nuclêôtit dài 3,4 Å. Quên nhân 2 là ra đúng một nửa.',
      x => S(x) + ' nuclêôtit');
  } },

{ ma: 'sinh-m1-bosung', chuong: 'Cơ sở phân tử', muc: 1, dang: 'mc',
  tao(R) {
    const N = R.nguyen(60, 300) * 10;
    const pA = R.chon([10, 15, 20, 25, 30, 35]);
    const A = Math.round(N * pA / 100);
    const G = N / 2 - A;
    if (G <= 0) return null;
    return MC(R, `Một phân tử ADN có tổng số ${N} nuclêôtit, trong đó ađênin chiếm ${pA}% tổng số nuclêôtit. Số nuclêôtit loại guanin của phân tử này bằng bao nhiêu?`,
      G, [N / 2 + A, A, N - A, Math.round(N * (100 - pA) / 100)],
      `Theo nguyên tắc bổ sung: A = T, G = X và A + G = N/2.\n`
      + `A = ${pA}%·${N} = ${A}\n`
      + `G = N/2 − A = ${N / 2} − ${A} = ${G}.`,
      'Chốt chặn là A + G = N/2 chứ không phải A + G = N — hai loại kia (T và X) đã chiếm nửa còn lại rồi.',
      x => S(x));
  } },

{ ma: 'sinh-m1-lienkethidro', chuong: 'Cơ sở phân tử', muc: 1, dang: 'mc',
  tao(R) {
    const A = R.nguyen(20, 150) * 10, G = R.nguyen(20, 150) * 10;
    const H = 2 * A + 3 * G;
    return MC(R, `Một phân tử ADN có ${A} nuclêôtit loại A và ${G} nuclêôtit loại G. Số liên kết hiđrô của phân tử ADN này bằng bao nhiêu?`,
      H, [3 * A + 2 * G, A + G, 2 * (A + G), 3 * (A + G)],
      `Cặp A – T có 2 liên kết hiđrô, cặp G – X có 3 liên kết hiđrô.\n`
      + `H = 2A + 3G = 2·${A} + 3·${G} = ${2 * A} + ${3 * G} = ${H}.`,
      'A đi với 2, G đi với 3 — nhớ theo thứ tự bảng chữ cái là không đảo: A trước nên số nhỏ hơn.',
      x => S(x));
  } },

{ ma: 'sinh-m1-axitamin', chuong: 'Cơ sở phân tử', muc: 1, dang: 'mc',
  tao(R) {
    const aa = R.nguyen(98, 498);
    const N = (aa + 1) * 6;
    return MC(R, `Một gen ở sinh vật nhân sơ có tổng số ${N} nuclêôtit. Chuỗi pôlipeptit hoàn chỉnh do gen này mã hoá có bao nhiêu axit amin?`,
      aa, [aa + 1, aa + 2, N / 3, N / 6],
      `Số bộ ba trên mạch mã gốc = N/6 = ${N}/6 = ${N / 6}.\n`
      + `Trừ 1 bộ ba kết thúc (không mã hoá axit amin) ⇒ chuỗi pôlipeptit sơ khai có ${N / 6 - 1} axit amin.\n`
      + `Chuỗi HOÀN CHỈNH bị cắt tiếp axit amin mở đầu ⇒ còn ${aa} axit amin.`,
      'Đọc kĩ chữ "hoàn chỉnh": chuỗi sơ khai trừ 1 bộ ba kết thúc, chuỗi hoàn chỉnh trừ thêm axit amin mở đầu nữa, tức trừ tất cả 2.',
      x => S(x) + ' axit amin');
  } },

{ ma: 'sinh-m1-giaotu', chuong: 'Quy luật di truyền', muc: 1, dang: 'mc',
  tao(R) {
    const n = R.nguyen(2, 5);
    const kg = ['Aa', 'Bb', 'Dd', 'Ee', 'Gg'].slice(0, n).join('');
    const so = Math.pow(2, n);
    return MC(R, `Một cơ thể có kiểu gen ${kg}, các cặp gen phân li độc lập. Cơ thể này cho tối đa bao nhiêu loại giao tử?`,
      so, [2 * n, Math.pow(2, n + 1), Math.pow(3, n), n],
      `Mỗi cặp gen dị hợp cho 2 loại giao tử, các cặp phân li độc lập nên nhân lại với nhau.\n`
      + `Có ${n} cặp dị hợp ⇒ số loại giao tử = 2<sup>${n}</sup> = ${so}.`,
      'Đếm số cặp DỊ HỢP thôi — cặp đồng hợp như AA hay aa chỉ cho 1 loại giao tử nên không làm tăng số loại.',
      x => S(x) + ' loại');
  } },

{ ma: 'sinh-m1-tyle-f2', chuong: 'Quy luật di truyền', muc: 1, dang: 'mc',
  tao(R) {
    const ds = [
      { p: 'Aa × Aa', kh: '3 trội : 1 lặn', kg: '1 : 2 : 1', v: 'Aa × Aa cho đời con 1AA : 2Aa : 1aa, trong đó AA và Aa đều biểu hiện tính trạng trội.' },
      { p: 'Aa × aa', kh: '1 trội : 1 lặn', kg: '1 : 1', v: 'Aa × aa (phép lai phân tích) cho 1Aa : 1aa, tỉ lệ kiểu gen trùng tỉ lệ kiểu hình.' },
      { p: 'AA × aa', kh: '100% trội', kg: '100% Aa', v: 'AA × aa cho toàn bộ đời con là Aa, đồng loạt biểu hiện tính trạng trội.' },
      { p: 'AA × Aa', kh: '100% trội', kg: '1 : 1', v: 'AA × Aa cho 1AA : 1Aa, cả hai kiểu gen đều biểu hiện tính trạng trội.' }
    ];
    const it = R.chon(ds);
    const con = ds.filter(x => x.kh !== it.kh).map(x => x.kh);
    return MC(R, `Cho phép lai ${it.p} (gen A trội hoàn toàn so với gen a, một gen quy định một tính trạng). Tỉ lệ kiểu hình ở đời con là bao nhiêu?`,
      it.kh, con.concat(['9 : 3 : 3 : 1', '1 : 2 : 1', '3 : 1 : 3 : 1']),
      `${it.v}\n`
      + `Tỉ lệ kiểu gen: ${it.kg}\n`
      + `Tỉ lệ kiểu hình: ${it.kh}.`,
      'Kẻ khung Punnett hai dòng hai cột là thấy ngay, đừng học vẹt tỉ lệ vì đề hay đổi phép lai. Nhớ phân biệt tỉ lệ KIỂU GEN với tỉ lệ KIỂU HÌNH.',
      x => String(x));
  } }

]);

})();
