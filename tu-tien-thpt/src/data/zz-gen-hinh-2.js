/* ============================================================
   CÂU HỎI CÓ HÌNH — ĐỢT 2: LẤP CÁC MỨC CÒN TRỐNG
   Đợt 1 có 12 mẫu nhưng dồn cục: Toán chỉ có ở thông hiểu, Sinh và
   Hoá chỉ có ở vận dụng cao, 13 trên 24 ô (môn × mức) hoàn toàn
   trống. Người học bấm vào một mức bất kỳ là có thể không gặp hình
   nào — đúng như phản ánh "chơi vận dụng cao mãi không thấy".
   File này lấp đủ mọi ô, đồng thời bổ sung những dạng hình mà đề
   thật hay ra nhưng app còn thiếu hẳn: đồ thị y = f′(x), khối chóp
   và lăng trụ, đồ thị nhiệt độ – thời gian, đường cong phóng xạ,
   giản đồ enthalpy, lưới thức ăn, tháp sinh thái, biểu đồ miền,
   biểu đồ đường và biểu đồ kết hợp.
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {};

(function () {
const S = TD.soVN, T = TD.lamTron, D = TD.dapSo;
const MC = (R, de, it, meo) => {
  const opts = TD.xaoR(R, [it.d].concat(it.s));
  return { q: de, opts: opts, ans: opts.indexOf(it.d),
    giai: `Đáp án đúng: ${it.d}\n${it.v}\n\nVì sao các phương án còn lại bị loại:\n`
      + TD.khoiLoai(opts, it.d, it.sv, 'không đọc đúng thông tin trên hình.'),
    meo: meo };
};
const baNhieu = (dung, ung) => {
  const ra = [];
  for (const x of ung) if (x !== dung && ra.indexOf(x) < 0) ra.push(x);
  return ra.length >= 3 ? ra.slice(0, 3) : null;
};

/* ============================================================
   TOÁN
   ============================================================ */
TD.GEN.toan = (TD.GEN.toan || []).concat([

/* --- mức 1: nhận biết khối đa diện --- */
{ ma: 'toan-hinh-khoi', chuong: 'Hình không gian', muc: 1, dang: 'mc',
  tao(R) {
    const chop = R() < 0.5;
    const hinh = TD.hinhKhoi(chop ? 'chop' : 'lang');
    if (chop) {
      const hoi = R.chon(['soCanh', 'soMat', 'vuongGoc']);
      if (hoi === 'soCanh')
        return MC(R, `Cho hình chóp S.ABCD như hình vẽ.${hinh}Hình chóp này có bao nhiêu cạnh?`,
          { d: '8', s: ['4', '5', '6'],
            sv: { '4': 'mới đếm bốn cạnh đáy AB, BC, CD, DA', '5': 'đếm nhầm sang số MẶT của hình chóp tứ giác',
                  '6': 'đây là số cạnh của hình chóp TAM giác S.ABC' },
            v: `Hình chóp tứ giác S.ABCD gồm hai nhóm cạnh:\n`
              + `· 4 cạnh đáy: AB, BC, CD, DA\n`
              + `· 4 cạnh bên: SA, SB, SC, SD\n`
              + `Tổng cộng 4 + 4 = 8 cạnh.` },
          'Hình chóp có đáy n cạnh thì luôn có 2n cạnh, n + 1 mặt và n + 1 đỉnh. Nhớ công thức này là đếm không bao giờ sót.');
      if (hoi === 'soMat')
        return MC(R, `Cho hình chóp S.ABCD như hình vẽ.${hinh}Hình chóp này có bao nhiêu mặt?`,
          { d: '5', s: ['4', '6', '8'],
            sv: { '4': 'mới đếm bốn mặt bên, quên mất mặt đáy ABCD', '6': 'đây là số mặt của hình hộp chữ nhật',
                  '8': 'đây là số CẠNH chứ không phải số mặt' },
            v: `Bốn mặt bên SAB, SBC, SCD, SDA cộng với một mặt đáy ABCD ⇒ 5 mặt.` },
          'Chóp đáy n cạnh có n + 1 mặt: n mặt bên và 1 mặt đáy. Người ta hay quên mặt đáy.');
      return MC(R, `Cho hình chóp S.ABCD có SA vuông góc với mặt phẳng đáy (kí hiệu góc vuông trên hình).${hinh}Đường thẳng SA vuông góc với đường thẳng nào sau đây?`,
        { d: 'AB', s: ['SB', 'SC', 'SD'],
          sv: { 'SB': 'SB cùng đi qua S nên cắt SA, không thể vuông góc với SA theo giả thiết này',
                'SC': 'SC là cạnh bên, không nằm trong mặt phẳng đáy',
                'SD': 'SD cũng là cạnh bên, không nằm trong mặt phẳng đáy' },
          v: `SA ⊥ (ABCD) nghĩa là SA vuông góc với MỌI đường thẳng nằm trong mặt phẳng đáy.\n`
            + `Trong bốn phương án, chỉ AB nằm trong mặt phẳng đáy ABCD ⇒ SA ⊥ AB.` },
        'Đường thẳng vuông góc với một mặt phẳng thì vuông góc với TẤT CẢ đường nằm trong mặt phẳng đó — kể cả đường không đi qua chân đường vuông góc.');
    }
    return MC(R, `Cho hình lăng trụ đứng tam giác ABC.A′B′C′ như hình vẽ.${hinh}Hình lăng trụ này có bao nhiêu cạnh?`,
      { d: '9', s: ['6', '8', '12'],
        sv: { '6': 'mới đếm hai đáy, quên ba cạnh bên', '8': 'đây là số cạnh của hình chóp tứ giác',
              '12': 'đây là số cạnh của hình hộp chữ nhật (lăng trụ đáy TỨ giác)' },
        v: `Lăng trụ tam giác gồm: 3 cạnh đáy dưới + 3 cạnh đáy trên + 3 cạnh bên = 9 cạnh.` },
      'Lăng trụ đáy n cạnh có 3n cạnh, n + 2 mặt và 2n đỉnh.');
  } },

/* --- mức 4: đọc đồ thị y = f′(x), dạng phân hoá kinh điển --- */
{ ma: 'toan-hinh-daoham', chuong: 'Đạo hàm – Khảo sát', muc: 4, dang: 'mc',
  tao(R) {
    /* f′(x) = a(x − p)(x − q) — parabol cắt trục hoành tại p và q */
    const a = R.chon([1, -1]);
    const p = R.nguyen(-3, 0), q = p + R.nguyen(2, 4);
    const g = x => a * (x - p) * (x - q);
    const hinh = TD.hinhDoThi(g, {
      xMin: p - 2, xMax: q + 2,
      yMin: -Math.max(6, Math.abs(g((p + q) / 2)) + 2), yMax: Math.max(6, Math.abs(g((p + q) / 2)) + 2)
    });
    /* f′ > 0 ⇒ f đồng biến. a>0: f′>0 ngoài [p;q]; a<0: f′>0 trong (p;q) */
    const db = a > 0 ? `(${TD.so(q)}; +∞)` : `(${TD.so(p)}; ${TD.so(q)})`;
    const nb = a > 0 ? `(${TD.so(p)}; ${TD.so(q)})` : `(${TD.so(q)}; +∞)`;
    if (db === nb) return null;
    const hoi = R.chon(['dongBien', 'cucDai']);
    if (hoi === 'dongBien')
      return MC(R, `Cho hàm số y = f(x) có đạo hàm f′(x) liên tục trên ℝ. Đồ thị của hàm số <b>y = f′(x)</b> như hình vẽ.${hinh}Hàm số <b>y = f(x)</b> đồng biến trên khoảng nào sau đây?`,
        { d: db, s: baNhieu(db, [nb, `(−∞; ${TD.so(p)})`, `(${TD.so(q)}; ${TD.so(q + 2)})`,
            `(−∞; ${TD.so(q)})`, `(${TD.so(p - 2)}; ${TD.so(p)})`]) || [],
          v: `Đây là đồ thị của f′(x) chứ KHÔNG phải của f(x) — đọc nhầm là mất điểm ngay.\n`
            + `Quy tắc: f đồng biến ở đâu thì f′(x) > 0 ở đó, tức phần đồ thị nằm PHÍA TRÊN trục hoành.\n`
            + `Trên hình, đồ thị f′ cắt trục hoành tại x = ${TD.so(p)} và x = ${TD.so(q)}; phần nằm trên trục hoành ứng với khoảng ${db}.\n`
            + `Vậy f(x) đồng biến trên ${db}.` },
        'Ba chữ phải khoanh trong đề: "đồ thị của hàm số y = f′(x)". Thấy chữ f′ là đổi cách đọc — '
        + 'trên trục hoành ⇒ f tăng · dưới trục hoành ⇒ f giảm · cắt trục hoành và ĐỔI DẤU ⇒ f có cực trị.');
    const cd = a > 0 ? TD.so(p) : TD.so(q);
    const ct = a > 0 ? TD.so(q) : TD.so(p);
    return MC(R, `Cho hàm số y = f(x) có đạo hàm f′(x) liên tục trên ℝ. Đồ thị của hàm số <b>y = f′(x)</b> như hình vẽ.${hinh}Hàm số <b>y = f(x)</b> đạt cực đại tại điểm nào?`,
      { d: `x = ${cd}`, s: baNhieu(`x = ${cd}`, [`x = ${ct}`, `x = ${TD.so(a > 0 ? q + 1 : p - 1)}`,
          `x = ${TD.so(p - 1)}`, `x = ${TD.so(q + 2)}`, 'x = 0']) || [],
        sv: { [`x = ${ct}`]: 'tại đó f′ đổi dấu từ ÂM sang DƯƠNG nên là điểm cực TIỂU',
              'x = 0': 'x = 0 chỉ đặc biệt với đồ thị f, không phải nghiệm của f′ trên hình này' },
        v: `f đạt cực ĐẠI tại điểm mà f′ đổi dấu từ DƯƠNG sang ÂM (đồ thị f′ cắt trục hoành theo chiều đi xuống).\n`
          + `Trên hình, tại x = ${cd} đồ thị f′ đi từ trên trục hoành xuống dưới ⇒ đó là điểm cực đại của f.` },
      'Cực đại ⇔ f′ đổi dấu + sang − (đồ thị f′ đi từ trên xuống). Cực tiểu thì ngược lại. '
      + 'Chỉ CHẠM trục hoành mà không đổi dấu thì KHÔNG phải cực trị.');
  } }

]);

/* ============================================================
   LÝ
   ============================================================ */
TD.GEN.ly = (TD.GEN.ly || []).concat([

/* --- mức 1: đọc đồ thị nhiệt độ – thời gian --- */
{ ma: 'ly-hinh-nhietdo', chuong: 'Vật lí nhiệt', muc: 1, dang: 'mc',
  tao(R) {
    const t1 = R.nguyen(2, 5), t2 = t1 + R.nguyen(3, 6), t3 = t2 + R.nguyen(2, 4);
    const nc = 0;                                    /* nóng chảy ở 0 °C */
    const cuoi = R.nguyen(20, 60);
    const f = x => x <= t1 ? -20 + (nc + 20) * x / t1
                 : x <= t2 ? nc
                 : nc + (cuoi - nc) * (x - t2) / (t3 - t2);
    const hinh = TD.hinhDoThi(f, { xMin: 0, xMax: t3 + 1, yMin: -25, yMax: cuoi + 10, rong: 330, cao: 240, tenX: 't', tenY: 'T (°C)' });
    return MC(R, `Đồ thị sau biểu diễn nhiệt độ của một khối nước đá theo thời gian khi được đun nóng liên tục (trục hoành là thời gian, trục tung là nhiệt độ tính bằng °C).${hinh}Đoạn nằm ngang trên đồ thị ứng với quá trình nào?`,
      { d: 'Nước đá đang nóng chảy, nhiệt độ không đổi dù vẫn nhận nhiệt',
        s: ['Nước đang sôi và hoá hơi hoàn toàn', 'Khối nước đá ngừng nhận nhiệt từ bên ngoài',
            'Nhiệt lượng cung cấp bị hao phí hết ra môi trường'],
        sv: { 'Nước đang sôi và hoá hơi hoàn toàn': 'sôi xảy ra ở 100 °C, còn đoạn nằm ngang trên hình ở 0 °C',
              'Khối nước đá ngừng nhận nhiệt từ bên ngoài': 'đề nói rõ đun nóng LIÊN TỤC nên vẫn nhận nhiệt suốt quá trình',
              'Nhiệt lượng cung cấp bị hao phí hết ra môi trường': 'nhiệt không mất đi, nó được dùng để phá vỡ liên kết trong mạng tinh thể' },
        v: `Đoạn nằm ngang ở 0 °C là giai đoạn NÓNG CHẢY.\n`
          + `Trong suốt quá trình chuyển thể, nhiệt lượng nhận vào dùng để phá vỡ liên kết giữa các phân tử chứ không làm tăng động năng của chúng, `
          + `nên nhiệt độ giữ nguyên. Nhiệt lượng này tính bằng Q = λm (λ là nhiệt nóng chảy riêng).` },
      'Đồ thị nhiệt độ – thời gian: đoạn DỐC là đang nóng lên (Q = mcΔt) · đoạn NGANG là đang chuyển thể (Q = λm hoặc Q = Lm). '
      + 'Nhìn giá trị nhiệt độ của đoạn ngang để biết là nóng chảy (0 °C) hay sôi (100 °C).');
  } },

/* --- mức 2: đọc đồ thị p–V ra công --- */
{ ma: 'ly-hinh-dangap', chuong: 'Khí lí tưởng', muc: 2, dang: 'tln', duong: true,
  tao(R) {
    const p = R.nguyen(1, 5) * 20000;                /* Pa */
    const V1 = R.nguyen(1, 4), V2 = V1 + R.nguyen(1, 5);   /* lít */
    const A = T(p * (V2 - V1) / 1000, 2);            /* J */
    const f = () => p / 20000;
    const hinh = TD.hinhDoThi(f, { xMin: 0, xMax: V2 + 2, yMin: 0, yMax: 7, rong: 320, cao: 220, tenX: 'V', tenY: 'p',
      diem: [{ x: V1, y: p / 20000, ten: '1' }, { x: V2, y: p / 20000, ten: '2' }] });
    return {
      q: `Một lượng khí lí tưởng giãn nở đẳng áp từ trạng thái 1 sang trạng thái 2 theo đồ thị sau `
        + `(trục hoành là thể tích tính bằng lít, trục tung là áp suất, mỗi vạch trên trục tung ứng với 20 000 Pa).${hinh}`
        + `Biết áp suất của khí là ${S(p)} Pa, thể tích tăng từ ${V1} lít lên ${V2} lít. `
        + `Công mà khí thực hiện bằng bao nhiêu jun? (làm tròn đến hàng phần trăm)`,
      ans: D(A, 2),
      giai: `Bước 1 — đọc hình: đường biểu diễn NẰM NGANG nên áp suất không đổi, đây là quá trình đẳng áp.\n`
        + `Bước 2 — công thức công trong quá trình đẳng áp: A = p·ΔV.\n`
        + `Bước 3 — đổi đơn vị thể tích về mét khối trước khi thay số:\n`
        + `  ΔV = ${V2} − ${V1} = ${V2 - V1} lít = ${S((V2 - V1) / 1000, 4)} m³\n`
        + `Bước 4 — thay số: A = ${S(p)} × ${S((V2 - V1) / 1000, 4)} = ${D(A, 2)} J.\n`
        + `Bước 5 — về mặt hình học, công chính là DIỆN TÍCH hình chữ nhật nằm dưới đường biểu diễn trên đồ thị p–V.`,
      meo: 'Công trong quá trình đẳng áp bằng diện tích hình dưới đường biểu diễn trên đồ thị p–V. '
        + 'Bẫy chết người là đơn vị: 1 lít = 10⁻³ m³, quên đổi là lệch đúng 1000 lần.'
    };
  } },

/* --- mức 4: đường cong phóng xạ --- */
{ ma: 'ly-hinh-phongxa', chuong: 'Vật lí hạt nhân', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const T2 = R.chon([2, 4, 5, 8, 10]);             /* chu kì bán rã, ngày */
    const soT = R.nguyen(2, 4);
    /* N₀ phải chia hết cho 2ⁿ, không thì số hạt nhân còn lại ra số lẻ vô lí */
    const N0 = Math.pow(2, soT) * R.nguyen(8, 60) * 10;
    const t = T2 * soT;
    const conLai = N0 / Math.pow(2, soT);
    const f = x => N0 * Math.pow(0.5, x / T2) / (N0 / 4);   /* thu nhỏ cho vừa khung */
    const hinh = TD.hinhDoThi(f, { xMin: 0, xMax: T2 * 4.4, yMin: 0, yMax: 4.6, rong: 330, cao: 235, tenX: 't', tenY: 'N',
      diem: [{ x: T2, y: 2, ten: '' }, { x: 2 * T2, y: 1, ten: '' }] });
    return {
      q: `Đồ thị sau biểu diễn số hạt nhân còn lại N của một mẫu chất phóng xạ theo thời gian t (ngày). `
        + `Trục tung được chia sao cho giá trị ban đầu N₀ ứng với vạch cao nhất.${hinh}`
        + `Biết chu kì bán rã của chất này là ${T2} ngày và ban đầu mẫu có ${S(N0)} hạt nhân. `
        + `Sau ${t} ngày, số hạt nhân đã bị phân rã là bao nhiêu?`,
      ans: S(N0 - conLai),
      giai: `Bước 1 — đọc hình: đường cong giảm theo quy luật hàm mũ, cứ sau mỗi chu kì bán rã thì số hạt nhân còn lại giảm một nửa.\n`
        + `Bước 2 — đếm số chu kì đã trôi qua: t/T = ${t}/${T2} = ${soT} chu kì.\n`
        + `Bước 3 — số hạt nhân CÒN LẠI: N = N₀/2ⁿ = ${S(N0)}/2^${soT} = ${S(conLai)} hạt.\n`
        + `Bước 4 — đề hỏi số hạt ĐÃ PHÂN RÃ, tức phần mất đi:\n`
        + `  ΔN = N₀ − N = ${S(N0)} − ${S(conLai)} = ${S(N0 - conLai)} hạt.`,
      meo: 'Đọc kĩ đề hỏi "còn lại" hay "đã phân rã" — hai đáp án này luôn được đặt cạnh nhau để bẫy. '
        + 'Còn lại là N₀/2ⁿ, đã phân rã là N₀(1 − 1/2ⁿ). Trên đồ thị, phần còn lại là tung độ, phần phân rã là khoảng cách từ đường cong lên tới N₀.'
    };
  } }

]);

/* ============================================================
   HOÁ
   ============================================================ */
/* Giản đồ enthalpy trong SGK Hoá 10 luôn gắn với MỘT phản ứng cụ thể, có công
   thức chất ở hai mức và giá trị ΔrH kèm theo — chứ không phải hai vạch trống
   ghi "chất đầu / sản phẩm". Bảng dưới lấy enthalpy tạo thành chuẩn ΔfH°298
   (kJ/mol) của từng chất, mức năng lượng mỗi bên là TỔNG có nhân hệ số, nên số
   trên hình và số trong lời giải luôn khớp nhau. */
const PU_NHIET = [
  { cd: [[1, 'CaCO₃(s)', -1206.9]], sp: [[1, 'CaO(s)', -635.1], [1, 'CO₂(g)', -393.5]],
    ten: 'nhiệt phân đá vôi' },
  { cd: [[1, 'CH₄(g)', -74.8], [2, 'O₂(g)', 0]], sp: [[1, 'CO₂(g)', -393.5], [2, 'H₂O(l)', -285.8]],
    ten: 'đốt cháy khí methane' },
  { cd: [[2, 'H₂(g)', 0], [1, 'O₂(g)', 0]], sp: [[2, 'H₂O(l)', -285.8]],
    ten: 'đốt cháy khí hydrogen' },
  { cd: [[1, 'C(graphite)', 0], [1, 'O₂(g)', 0]], sp: [[1, 'CO₂(g)', -393.5]],
    ten: 'đốt cháy than' },
  { cd: [[1, 'N₂(g)', 0], [3, 'H₂(g)', 0]], sp: [[2, 'NH₃(g)', -45.9]],
    ten: 'tổng hợp ammonia' },
  { cd: [[2, 'NH₃(g)', -45.9]], sp: [[1, 'N₂(g)', 0], [3, 'H₂(g)', 0]],
    ten: 'phân huỷ ammonia' },
  { cd: [[1, 'N₂(g)', 0], [1, 'O₂(g)', 0]], sp: [[2, 'NO(g)', 90.3]],
    ten: 'nitrogen cháy trong không khí ở nhiệt độ cao' },
  { cd: [[1, 'H₂(g)', 0], [1, 'Cl₂(g)', 0]], sp: [[2, 'HCl(g)', -92.31]],
    ten: 'hydrogen tác dụng với chlorine' },
  { cd: [[1, 'S(s)', 0], [1, 'O₂(g)', 0]], sp: [[1, 'SO₂(g)', -296.8]],
    ten: 'đốt cháy lưu huỳnh' },
  { cd: [[2, 'Al(s)', 0], [1, 'Fe₂O₃(s)', -825.5]], sp: [[1, 'Al₂O₃(s)', -1675.7], [2, 'Fe(s)', 0]],
    ten: 'phản ứng nhiệt nhôm' },
  { cd: [[1, 'C₂H₅OH(l)', -277.63], [3, 'O₂(g)', 0]],
    sp: [[2, 'CO₂(g)', -393.5], [3, 'H₂O(l)', -285.8]], ten: 'đốt cháy ethanol' }
];
const ve = ds => ds.map(([h, t]) => (h > 1 ? String(h) : '') + t).join(' + ');
/* đề thi in enthalpy dương kèm dấu cộng: ΔrH°₂₉₈ = +178,49 kJ */
const soKy = v => (v > 0 ? '+' : '') + TD.so(v);
const tong = ds => ds.reduce((z, [h, , v]) => z + h * v, 0);
const lam1 = v => Math.round(v * 100) / 100;
/* hệ số 1 thì không viết ra, đề thi không bao giờ in "1 × (−74,8)" hay "1x" */
const hs1 = h => h === 1 ? '' : h + ' ';
const nhan = (h, v) => h === 1 ? `(${TD.so(v)})` : `${h} × (${TD.so(v)})`;
const MEO_ENTHALPY = 'Ba chỗ mất điểm của dạng này: ① lấy chất đầu trừ sản phẩm (ngược dấu) ② quên nhân hệ '
  + 'số của phương trình ③ trừ một số âm mà không đổi thành cộng. Đơn chất bền (O₂, H₂, N₂, C graphite, kim '
  + 'loại) có ΔfH°₂₉₈ = 0, đừng đi tìm số cho chúng.';

TD.GEN.hoa = (TD.GEN.hoa || []).concat([

/* --- mức 1: đọc giản đồ toả nhiệt / thu nhiệt --- */
{ ma: 'hoa-hinh-toanhiet', chuong: 'Nhiệt động – Tốc độ – Cân bằng', muc: 1, dang: 'mc',
  tao(R) {
    const P = R.chon(PU_NHIET);
    const hDau = lam1(tong(P.cd)), hCuoi = lam1(tong(P.sp));
    const dH = lam1(hCuoi - hDau), toa = dH < 0;
    const hinh = TD.hinhGianDo(hDau, hCuoi, ve(P.cd), ve(P.sp),
      `Δ<tspan font-size="8" dy="2">r</tspan><tspan dy="-2">H° = ${soKy(dH)} kJ</tspan>`);
    return MC(R, `Cho sơ đồ biểu diễn biến thiên enthalpy của phản ứng ${ve(P.cd)} → ${ve(P.sp)}:${hinh}`
      + `Phát biểu nào sau đây đúng?`,
      { d: toa ? 'Phản ứng toả nhiệt, ΔrH°₂₉₈ < 0' : 'Phản ứng thu nhiệt, ΔrH°₂₉₈ > 0',
        s: toa ? ['Phản ứng thu nhiệt, ΔrH°₂₉₈ > 0', 'Phản ứng toả nhiệt, ΔrH°₂₉₈ > 0',
                  'Phản ứng không kèm biến đổi năng lượng, ΔrH°₂₉₈ = 0']
               : ['Phản ứng toả nhiệt, ΔrH°₂₉₈ < 0', 'Phản ứng thu nhiệt, ΔrH°₂₉₈ < 0',
                  'Phản ứng không kèm biến đổi năng lượng, ΔrH°₂₉₈ = 0'],
        v: `Trên sơ đồ, mức năng lượng của sản phẩm ${ve(P.sp)} nằm ${toa ? 'THẤP HƠN' : 'CAO HƠN'} `
          + `mức của chất đầu ${ve(P.cd)}, mũi tên ΔrH chỉ ${toa ? 'XUỐNG' : 'LÊN'}.\n`
          + `ΔrH°₂₉₈ = ΣΔfH°₂₉₈(sản phẩm) − ΣΔfH°₂₉₈(chất đầu) = ${TD.so(hCuoi)} − (${TD.so(hDau)}) = ${TD.so(dH)} kJ `
          + `${toa ? '< 0 ⇒ phản ứng TOẢ nhiệt, hệ nhả năng lượng ra môi trường'
                   : '> 0 ⇒ phản ứng THU nhiệt, hệ lấy năng lượng từ môi trường'}.\n`
          + `Đây là phản ứng ${P.ten}.` },
      'Nhìn mũi tên ΔrH trên giản đồ: chỉ XUỐNG (sản phẩm thấp hơn) là toả nhiệt, ΔrH mang dấu ÂM · chỉ LÊN '
      + 'là thu nhiệt, ΔrH mang dấu DƯƠNG. Nhớ mẹo "toả thì âm" vì hệ mất năng lượng. Phản ứng cháy và phản '
      + 'ứng trung hoà luôn toả nhiệt; phản ứng nhiệt phân luôn thu nhiệt.');
  } },

/* --- mức 3: tính ΔrH từ giản đồ có số liệu enthalpy tạo thành --- */
{ ma: 'hoa-hinh-enthalpy', chuong: 'Nhiệt động – Tốc độ – Cân bằng', muc: 3, dang: 'tln',
  tao(R) {
    const P = R.chon(PU_NHIET);
    const hDau = lam1(tong(P.cd)), hCuoi = lam1(tong(P.sp));
    const dH = lam1(hCuoi - hDau);
    const bang = ds => ds.filter(([, , v]) => v !== 0)
      .map(([, t, v]) => `ΔfH°₂₉₈(${t}) = ${TD.so(v)} kJ/mol`).join(' · ');
    const dHtxt = t => `Δ<tspan font-size="8" dy="2">r</tspan><tspan dy="-2">H° = ${t}</tspan>`;
    const kieu = R.chon(['dH', 'nhiet', 'nguoc']);

    /* ① hỏi thẳng ΔrH — dạng gốc trong SGK */
    if (kieu === 'dH') {
      const hinh = TD.hinhGianDo(hDau, hCuoi, ve(P.cd), ve(P.sp), dHtxt('?'));
      const moc = [bang(P.cd), bang(P.sp)].filter(Boolean).join(' · ');
      return {
        q: `Cho phản ứng ${P.ten}: ${ve(P.cd)} → ${ve(P.sp)}${hinh}`
          + `Biết ${moc}; các đơn chất bền ở điều kiện chuẩn có ΔfH°₂₉₈ = 0.<br>`
          + `Biến thiên enthalpy chuẩn ΔrH°₂₉₈ của phản ứng bằng bao nhiêu kJ?`,
        ans: TD.dapSo(dH, 2),
        giai: `Bước 1 — công thức: ΔrH°₂₉₈ = ΣΔfH°₂₉₈(sản phẩm) − ΣΔfH°₂₉₈(chất đầu), nhớ NHÂN HỆ SỐ.\n`
          + `Bước 2 — tổng của chất đầu: ${P.cd.map(([h, t, v]) => nhan(h, v)).join(' + ')} = ${TD.so(hDau)} kJ.\n`
          + `Bước 3 — tổng của sản phẩm: ${P.sp.map(([h, t, v]) => nhan(h, v)).join(' + ')} = ${TD.so(hCuoi)} kJ.\n`
          + `Bước 4 — thay số: ΔrH°₂₉₈ = ${TD.so(hCuoi)} − (${TD.so(hDau)}) = ${TD.dapSo(dH, 2)} kJ.\n`
          + `Bước 5 — soi lại hình: mức sản phẩm nằm ${dH < 0 ? 'THẤP hơn' : 'CAO hơn'} mức chất đầu nên ΔrH phải `
          + `${dH < 0 ? 'ÂM' : 'DƯƠNG'} — khớp. Vậy phản ứng ${dH < 0 ? 'TOẢ' : 'THU'} nhiệt.`,
        meo: MEO_ENTHALPY
      };
    }

    /* ② từ giản đồ suy ra nhiệt lượng cho một lượng chất cụ thể */
    if (kieu === 'nhiet') {
      const [heSo, tenX] = P.cd[0];
      const soMol = lam1(heSo * R.chon([0.5, 1.5, 2, 2.5, 3, 4]));
      const Q = lam1(Math.abs(dH) * soMol / heSo);
      const hinh = TD.hinhGianDo(hDau, hCuoi, ve(P.cd), ve(P.sp), dHtxt(soKy(dH) + ' kJ'));
      return {
        q: `Sơ đồ sau biểu diễn biến thiên enthalpy của phản ứng ${P.ten}:${hinh}`
          + `Nhiệt lượng ${dH < 0 ? 'toả ra' : 'cần cung cấp'} khi có ${TD.so(soMol)} mol ${tenX} phản ứng `
          + `là bao nhiêu kJ?`,
        ans: TD.dapSo(Q, 2),
        giai: `Bước 1 — đọc hình: ΔrH°₂₉₈ = ${TD.so(dH)} kJ ứng với ĐÚNG phương trình đã cho, tức là ứng với `
          + `${heSo} mol ${tenX}.\n`
          + `Bước 2 — lập tỉ lệ: ${heSo === 1 ? '' : heSo + ' '}mol ${tenX} ứng với ${TD.so(Math.abs(dH))} kJ, `
          + `vậy ${TD.so(soMol)} mol ứng với ${TD.so(Math.abs(dH))} × ${TD.so(soMol)}`
          + `${heSo === 1 ? '' : ' ÷ ' + heSo}.\n`
          + `Bước 3 — tính: Q = ${TD.dapSo(Q, 2)} kJ.\n`
          + `Bước 4 — kết luận: phản ứng ${dH < 0 ? 'TOẢ nhiệt (ΔrH < 0) nên đây là nhiệt lượng nhả ra môi trường'
             : 'THU nhiệt (ΔrH > 0) nên đây là nhiệt lượng phải cung cấp'}.`,
        meo: 'Nhiệt lượng hỏi trong đề luôn là SỐ DƯƠNG (bao nhiêu kJ toả ra / cần cung cấp), còn ΔrH mới mang '
          + 'dấu. Và ΔrH ứng với đúng hệ số của phương trình — có 2 mol thì phải chia 2 trước khi nhân.'
      };
    }

    /* ③ ngược lại: biết ΔrH, tìm ΔfH của một chất trong phương trình */
    const ben = P.sp.filter(([, , v]) => v !== 0).length ? P.sp : P.cd;
    const an = ben.filter(([, , v]) => v !== 0)[0];
    const laSP = ben === P.sp;
    const conLai = (laSP ? P.sp : P.cd).filter(x => x !== an);
    const tongConLai = lam1(tong(conLai));
    const hinh = TD.hinhGianDo(hDau, hCuoi, ve(P.cd), ve(P.sp), dHtxt(soKy(dH) + ' kJ'));
    const moc2 = [bang(laSP ? P.cd : P.sp), bang(conLai)].filter(Boolean).join(' · ');
    return {
      q: `Cho phản ứng ${P.ten}: ${ve(P.cd)} → ${ve(P.sp)}${hinh}`
        + `Biết ΔrH°₂₉₈ = ${soKy(dH)} kJ${moc2 ? ' và ' + moc2 : ''}; các đơn chất bền có ΔfH°₂₉₈ = 0.<br>`
        + `Enthalpy tạo thành chuẩn ΔfH°₂₉₈ của ${an[1]} bằng bao nhiêu kJ/mol?`,
      ans: TD.dapSo(an[2], 2),
      giai: `Bước 1 — công thức: ΔrH°₂₉₈ = ΣΔfH°₂₉₈(sp) − ΣΔfH°₂₉₈(cđ).\n`
        + `Bước 2 — gọi x = ΔfH°₂₉₈(${an[1]}). Thay vào:\n`
        + `   ${TD.so(dH)} = ${laSP ? `[${an[0]}x + (${TD.so(tongConLai)})] − (${TD.so(tong(P.cd))})`
              : `(${TD.so(tong(P.sp))}) − [${hs1(an[0])}x + (${TD.so(tongConLai)})]`}\n`
        + `Bước 3 — giải ra: ${hs1(an[0])}x = ${TD.so(lam1(an[0] * an[2]))} ⇒ x = ${TD.dapSo(an[2], 2)} kJ/mol.\n`
        + `Bước 4 — kiểm tra bằng hình: mức ${laSP ? 'sản phẩm' : 'chất đầu'} phải ra ${TD.so(laSP ? hCuoi : hDau)} kJ — khớp.`,
      meo: 'Dạng ngược này chỉ là giải phương trình bậc nhất. Đặt ẩn x cho chất chưa biết, viết đủ hệ số, rồi '
        + 'chuyển vế. Sai nhiều nhất là quên rằng ẩn cũng phải nhân hệ số.'
    };
  } },

/* --- mức 2: biểu đồ cột về độ tan --- */
{ ma: 'hoa-hinh-dotan', chuong: 'Đại cương', muc: 2, dang: 'mc',
  tao(R) {
    const nhiet = [20, 40, 60, 80];
    /* Cộng DỒN từng nấc chứ không nhân bước với chỉ số: mỗi lần gọi R.nguyen
       cho một bước khác nhau nên nhân với i có thể ra hai cột bằng nhau, mà độ
       tan của muối rắn thì phải tăng đều theo nhiệt độ. */
    const ds = []; let dt = R.nguyen(20, 40);
    nhiet.forEach((n, i) => { if (i) dt += R.nguyen(8, 20); ds.push({ ten: n + '°C', v: dt }); });
    const hinh = TD.hinhCot(ds, 'g/100 g nước');
    const dau = ds[0].v, cuoi = ds[3].v;
    const dungPA = S(T(cuoi - dau, 1), 1) + ' g';
    const nhieu = baNhieu(dungPA, [S(T(cuoi + dau, 1), 1) + ' g', S(T(cuoi / dau, 2), 2) + ' g',
      S(T(ds[2].v - ds[1].v, 1), 1) + ' g', S(cuoi, 1) + ' g']);
    if (!nhieu) return null;
    return MC(R, `Biểu đồ sau biểu diễn độ tan của một muối trong nước ở các nhiệt độ khác nhau.${hinh}Khi tăng nhiệt độ từ 20 °C lên 80 °C, độ tan của muối này tăng thêm bao nhiêu gam trên 100 gam nước?`,
      { d: dungPA, s: nhieu,
        sv: { [S(T(cuoi + dau, 1), 1) + ' g']: 'đây là tổng hai giá trị, không phải phần tăng thêm',
              [S(T(cuoi / dau, 2), 2) + ' g']: 'đây là số LẦN tăng, đề hỏi tăng thêm bao nhiêu gam',
              [S(cuoi, 1) + ' g']: 'đây là độ tan ở 80 °C, chưa trừ đi giá trị ban đầu' },
        v: `Đọc số ghi trên đầu cột: ở 20 °C độ tan là ${S(dau, 1)} g, ở 80 °C là ${S(cuoi, 1)} g.\n`
          + `Phần tăng thêm = ${S(cuoi, 1)} − ${S(dau, 1)} = ${S(T(cuoi - dau, 1), 1)} g.` },
      'Độ tan của hầu hết muối rắn TĂNG khi nhiệt độ tăng, còn độ tan của CHẤT KHÍ thì ngược lại — giảm khi nóng lên. '
      + 'Đọc số trên đầu cột thay vì ước lượng bằng mắt.');
  } }

]);

/* ============================================================
   SINH
   ============================================================ */
TD.GEN.sinh = (TD.GEN.sinh || []).concat([

/* --- mức 1: đường cong tăng trưởng quần thể --- */
{ ma: 'sinh-hinh-tangtruong', chuong: 'Sinh thái học', muc: 1, dang: 'mc',
  tao(R) {
    const chuS = R() < 0.5;
    const K = R.nguyen(3, 5);
    const f = chuS ? (x => K / (1 + 12 * Math.exp(-1.1 * x))) : (x => 0.12 * Math.exp(0.62 * x));
    const hinh = TD.hinhDoThi(f, { xMin: 0, xMax: 6, yMin: 0, yMax: K + 1.4, rong: 330, cao: 235, tenX: 't', tenY: 'N',
      duongNgang: chuS ? [K] : [] });
    return MC(R, `Đồ thị sau biểu diễn sự tăng trưởng số lượng cá thể của một quần thể theo thời gian.${hinh}Đồ thị trên mô tả kiểu tăng trưởng nào?`,
      { d: chuS ? 'Tăng trưởng theo đường cong chữ S, trong điều kiện môi trường bị giới hạn'
                : 'Tăng trưởng theo đường cong chữ J, trong điều kiện môi trường lí tưởng',
        s: chuS ? ['Tăng trưởng theo đường cong chữ J, trong điều kiện môi trường lí tưởng',
                   'Quần thể đang suy giảm số lượng liên tục',
                   'Số lượng cá thể không thay đổi theo thời gian']
                : ['Tăng trưởng theo đường cong chữ S, trong điều kiện môi trường bị giới hạn',
                   'Quần thể đang suy giảm số lượng liên tục',
                   'Số lượng cá thể không thay đổi theo thời gian'],
        v: chuS
          ? `Đường cong tăng nhanh ở giữa rồi CHỮNG LẠI, tiệm cận đường nằm ngang (đường nét đứt) — đó là sức chứa K của môi trường.\n`
            + `Dáng chữ S xuất hiện khi nguồn sống bị giới hạn: cạnh tranh cùng loài tăng dần, tỉ lệ sinh giảm và tỉ lệ tử tăng cho tới khi cân bằng.`
          : `Đường cong đi lên càng lúc càng dốc, không có dấu hiệu chững lại — đó là dáng chữ J.\n`
            + `Kiểu này chỉ xảy ra khi nguồn sống dồi dào vô hạn, không có kẻ thù và không có cạnh tranh, tức điều kiện lí tưởng và chỉ duy trì được trong thời gian ngắn.` },
      'Nhìn phần ĐUÔI của đường cong: chững lại và nằm ngang ⇒ chữ S (môi trường giới hạn, có sức chứa K) · '
      + 'vẫn dốc lên mãi ⇒ chữ J (môi trường lí tưởng). Trong tự nhiên hầu hết quần thể tăng theo chữ S.');
  } },

/* --- mức 2: tháp sinh thái --- */
{ ma: 'sinh-hinh-thap', chuong: 'Sinh thái học', muc: 2, dang: 'mc',
  tao(R) {
    const E0 = R.nguyen(20, 60) * 1000;
    const h1 = R.chon([8, 10, 12]), h2 = R.chon([9, 10, 12]);
    const E1 = Math.round(E0 * h1 / 100), E2 = Math.round(E1 * h2 / 100);
    const hinh = TD.hinhThap([
      { ten: 'Sinh vật sản xuất', v: E0 },
      { ten: 'Tiêu thụ bậc 1', v: E1 },
      { ten: 'Tiêu thụ bậc 2', v: E2 }
    ], 'kcal/m²/năm');
    const hs = T(E1 / E0 * 100, 1);
    const dungPA = S(hs, 1) + '%';
    const nhieu = baNhieu(dungPA, [S(T(E0 / E1 * 100, 1), 1) + '%', S(T(E2 / E1 * 100, 1), 1) + '%',
      S(T(E2 / E0 * 100, 2), 2) + '%', S(T(hs * 2, 1), 1) + '%']);
    if (!nhieu) return null;
    return MC(R, `Tháp sinh thái sau biểu diễn năng lượng tích luỹ ở các bậc dinh dưỡng của một hệ sinh thái.${hinh}Hiệu suất sinh thái của sinh vật tiêu thụ bậc 1 so với sinh vật sản xuất là bao nhiêu?`,
      { d: dungPA, s: nhieu,
        sv: { [S(T(E0 / E1 * 100, 1), 1) + '%']: 'chia ngược: hiệu suất lấy bậc TRÊN chia bậc DƯỚI',
              [S(T(E2 / E1 * 100, 1), 1) + '%']: 'đây là hiệu suất của bậc 2 so với bậc 1',
              [S(T(E2 / E0 * 100, 2), 2) + '%']: 'đây là hiệu suất của bậc 2 so với sinh vật sản xuất' },
        v: `Hiệu suất sinh thái = (năng lượng bậc trên / năng lượng bậc dưới) × 100%.\n`
          + `Đọc số trên tháp: sinh vật sản xuất ${S(E0)} kcal, tiêu thụ bậc 1 ${S(E1)} kcal.\n`
          + `H = ${S(E1)}/${S(E0)} × 100% = ${S(hs, 1)}%.` },
      'Tháp năng lượng luôn có đáy rộng đỉnh hẹp và KHÔNG BAO GIỜ lộn ngược, vì năng lượng chỉ mất đi qua mỗi bậc. '
      + 'Tháp số lượng và tháp sinh khối thì có thể lộn ngược.');
  } },

/* --- mức 3: lưới thức ăn có hình --- */
{ ma: 'sinh-hinh-luoi', chuong: 'Sinh thái học', muc: 3, dang: 'mc',
  tao(R) {
    const nut = [
      { id: 'co', ten: 'Cỏ', x: 1.2, h: 0 },
      { id: 'cc', ten: 'Châu chấu', x: 0.4, h: 1 },
      { id: 'th', ten: 'Thỏ', x: 2, h: 1 },
      { id: 'ec', ten: 'Ếch', x: 0.4, h: 2 },
      { id: 'ra', ten: 'Rắn', x: 1.3, h: 3 },
      { id: 'db', ten: 'Đại bàng', x: 2.6, h: 3 }
    ];
    const cung = [['co', 'cc'], ['co', 'th'], ['cc', 'ec'], ['ec', 'ra'], ['th', 'db'], ['ra', 'db']];
    const hinh = TD.hinhLuoi(nut, cung);
    const hoi = R.chon(['soChuoi', 'bacDb', 'mat']);
    if (hoi === 'soChuoi')
      return MC(R, `Cho lưới thức ăn như hình vẽ (mũi tên chỉ chiều dòng năng lượng).${hinh}Lưới thức ăn trên có bao nhiêu chuỗi thức ăn?`,
        { d: '2', s: ['1', '3', '4'],
          sv: { '1': 'đếm sót: có hai đường đi khác nhau từ Cỏ tới Đại bàng',
                '3': 'đếm thừa: mỗi chuỗi phải đi liên tục từ sinh vật sản xuất tới mắt xích cuối, không được cắt ngang',
                '4': 'đếm thừa nhiều, lưới này chỉ có hai nhánh' },
          v: `Mỗi chuỗi thức ăn là một đường đi liên tục từ sinh vật sản xuất (Cỏ) tới mắt xích cuối cùng (Đại bàng).\n`
            + `· Chuỗi 1: Cỏ → Châu chấu → Ếch → Rắn → Đại bàng\n`
            + `· Chuỗi 2: Cỏ → Thỏ → Đại bàng\n`
            + `Vậy có 2 chuỗi thức ăn.` },
        'Đếm chuỗi thức ăn là đếm số ĐƯỜNG ĐI từ sinh vật sản xuất tới mắt xích cuối, đi liên tục theo chiều mũi tên. '
        + 'Vẽ lại lưới ra nháp rồi lần từng đường, đừng nhẩm trong đầu.');
    if (hoi === 'bacDb')
      return MC(R, `Cho lưới thức ăn như hình vẽ (mũi tên chỉ chiều dòng năng lượng).${hinh}Đại bàng thuộc những bậc dinh dưỡng nào?`,
        { d: 'Bậc dinh dưỡng cấp 5 và cấp 3', s: ['Chỉ bậc dinh dưỡng cấp 5', 'Chỉ bậc dinh dưỡng cấp 3', 'Bậc dinh dưỡng cấp 4 và cấp 2'],
          sv: { 'Chỉ bậc dinh dưỡng cấp 5': 'bỏ sót chuỗi ngắn Cỏ → Thỏ → Đại bàng',
                'Chỉ bậc dinh dưỡng cấp 3': 'bỏ sót chuỗi dài qua Châu chấu, Ếch và Rắn',
                'Bậc dinh dưỡng cấp 4 và cấp 2': 'đếm thiếu một bậc ở cả hai chuỗi — bậc dinh dưỡng cấp 1 là sinh vật SẢN XUẤT' },
          v: `Một loài tham gia nhiều chuỗi thì thuộc nhiều bậc dinh dưỡng khác nhau.\n`
            + `· Trong chuỗi Cỏ → Châu chấu → Ếch → Rắn → Đại bàng, đại bàng đứng thứ năm ⇒ bậc dinh dưỡng cấp 5.\n`
            + `· Trong chuỗi Cỏ → Thỏ → Đại bàng, đại bàng đứng thứ ba ⇒ bậc dinh dưỡng cấp 3.` },
        'Bậc dinh dưỡng cấp 1 luôn là sinh vật SẢN XUẤT. Sinh vật tiêu thụ bậc 1 tương ứng bậc dinh dưỡng cấp 2 — lệch nhau đúng một đơn vị.');
    return MC(R, `Cho lưới thức ăn như hình vẽ (mũi tên chỉ chiều dòng năng lượng).${hinh}Nếu số lượng ếch trong hệ giảm mạnh thì hệ quả trực tiếp nào sau đây có khả năng xảy ra nhất?`,
      { d: 'Châu chấu tăng số lượng, còn rắn giảm vì mất nguồn thức ăn',
        s: ['Thỏ tăng mạnh vì được giải phóng khỏi cạnh tranh', 'Cỏ phát triển tốt hơn do ít bị ăn',
            'Đại bàng tăng số lượng vì có thêm thức ăn'],
        sv: { 'Thỏ tăng mạnh vì được giải phóng khỏi cạnh tranh': 'thỏ và ếch không dùng chung nguồn thức ăn nên không cạnh tranh nhau',
              'Cỏ phát triển tốt hơn do ít bị ăn': 'ngược lại — châu chấu mất thiên địch sẽ tăng lên và ăn cỏ nhiều hơn',
              'Đại bàng tăng số lượng vì có thêm thức ăn': 'ếch giảm làm rắn giảm, mà rắn là một nguồn thức ăn của đại bàng' },
        v: `Đọc mũi tên quanh Ếch: ếch ăn châu chấu, và ếch bị rắn ăn.\n`
          + `· Mất thiên địch ⇒ châu chấu bùng phát.\n`
          + `· Mất nguồn thức ăn ⇒ rắn giảm, kéo theo đại bàng cũng bị ảnh hưởng.` },
      'Loài nào biến động thì xét hai chiều mũi tên quanh nó: mũi tên ĐI VÀO là nguồn thức ăn của nó, mũi tên ĐI RA là loài ăn nó.');
  } }

]);

/* ============================================================
   ĐỊA LÍ
   ============================================================ */
TD.GEN.dia = (TD.GEN.dia || []).concat([

/* --- mức 1: nhận dạng dạng biểu đồ cần vẽ --- */
{ ma: 'dia-hinh-duong', chuong: 'Kỹ năng', muc: 1, dang: 'mc',
  tao(R) {
    const nam = ['2015', '2018', '2020', '2022', '2024'];
    const a = R.nguyen(100, 140), b = R.nguyen(100, 140);
    const d1 = nam.map((n, i) => T(a * Math.pow(1 + R.nguyen(3, 9) / 100, i) / a * 100, 1));
    const d2 = nam.map((n, i) => T(b * Math.pow(1 + R.nguyen(2, 12) / 100, i) / b * 100, 1));
    const hinh = TD.hinhDuong([{ ten: 'Công nghiệp', v: d1 }, { ten: 'Dịch vụ', v: d2 }], nam, '%');
    return MC(R, `Cho biểu đồ sau về tốc độ tăng trưởng của hai ngành kinh tế nước ta (lấy năm 2015 = 100%).${hinh}Biểu đồ trên thuộc dạng biểu đồ nào?`,
      { d: 'Biểu đồ đường', s: ['Biểu đồ cột', 'Biểu đồ miền', 'Biểu đồ tròn'],
        sv: { 'Biểu đồ cột': 'biểu đồ cột dùng hình chữ nhật đứng, còn hình này dùng đường gấp khúc nối các điểm',
              'Biểu đồ miền': 'biểu đồ miền tô kín các dải chồng lên nhau và tổng luôn bằng 100%',
              'Biểu đồ tròn': 'biểu đồ tròn chỉ thể hiện cơ cấu tại một thời điểm, không có trục thời gian' },
        v: `Biểu đồ dùng ĐƯỜNG gấp khúc nối các điểm theo thời gian, đơn vị là % với năm gốc bằng 100 — đó là biểu đồ ĐƯỜNG.\n`
          + `Dạng này dùng khi thể hiện TỐC ĐỘ TĂNG TRƯỞNG của nhiều đối tượng qua nhiều năm.` },
      'Từ khoá quyết định dạng biểu đồ: "tốc độ tăng trưởng" ⇒ ĐƯỜNG · "cơ cấu" từ 4 năm ⇒ MIỀN · "cơ cấu" 1–3 năm ⇒ TRÒN · '
      + '"tình hình, so sánh" ⇒ CỘT · hai đối tượng khác đơn vị ⇒ KẾT HỢP.');
  } },

/* --- mức 3: đọc biểu đồ miền --- */
{ ma: 'dia-hinh-mien', chuong: 'Kỹ năng', muc: 3, dang: 'mc',
  tao(R) {
    const nam = ['2010', '2015', '2020', '2024'];
    /* Cộng dồn từng nấc: nhân bước với chỉ số thì dãy có thể quay ngược chiều
       (giảm rồi lại tăng), trong khi đề đang nói về một xu hướng chuyển dịch. */
    const day = (dau, buoc, chieu) => {
      const ra = [dau]; let v = dau;
      for (let i = 1; i < nam.length; i++) { v = T(v + chieu * buoc(), 1); ra.push(v); }
      return ra;
    };
    const nn = day(22, () => R.nguyen(2, 4), -1);
    if (nn[3] < 5) return null;
    const cn = day(34, () => R.nguyen(1, 3), 1);
    const dv = nam.map((n, i) => T(100 - nn[i] - cn[i], 1));
    if (dv.some(x => x < 30 || x > 60)) return null;
    const hinh = TD.hinhMien([
      { ten: 'Nông – lâm – thuỷ sản', v: nn },
      { ten: 'Công nghiệp – xây dựng', v: cn },
      { ten: 'Dịch vụ', v: dv }
    ], nam);
    const giam = T(nn[0] - nn[3], 1);
    const dungPA = S(giam, 1) + '%';
    const nhieu = baNhieu(dungPA, [S(T(nn[0] + nn[3], 1), 1) + '%', S(nn[3], 1) + '%',
      S(T(cn[3] - cn[0], 1), 1) + '%', S(T(giam * 2, 1), 1) + '%']);
    if (!nhieu) return null;
    return MC(R, `Cho biểu đồ cơ cấu GDP phân theo khu vực kinh tế của nước ta giai đoạn ${nam[0]} – ${nam[3]}.${hinh}Tỉ trọng khu vực nông – lâm – thuỷ sản đã giảm bao nhiêu phần trăm trong giai đoạn trên?`,
      { d: dungPA, s: nhieu,
        sv: { [S(T(nn[0] + nn[3], 1), 1) + '%']: 'đây là tổng hai giá trị đầu và cuối, không phải mức giảm',
              [S(nn[3], 1) + '%']: 'đây là tỉ trọng năm cuối, chưa trừ đi năm đầu',
              [S(T(cn[3] - cn[0], 1), 1) + '%']: 'đây là mức thay đổi của khu vực công nghiệp – xây dựng' },
        v: `Biểu đồ miền đọc theo ĐỘ DÀY của mỗi dải, không đọc theo vị trí đường ranh giới.\n`
          + `Dải nông – lâm – thuỷ sản: năm ${nam[0]} dày ${S(nn[0], 1)}%, năm ${nam[3]} dày ${S(nn[3], 1)}%.\n`
          + `Mức giảm = ${S(nn[0], 1)} − ${S(nn[3], 1)} = ${S(giam, 1)}%.` },
      'Biểu đồ miền: mỗi năm tổng luôn bằng 100%. Đọc ĐỘ DÀY của dải chứ đừng đọc vị trí đường ranh giới — '
      + 'dải thứ hai và thứ ba bị đẩy lên bởi dải dưới nên nhìn vị trí là sai ngay.');
  } },

/* --- mức 4: biểu đồ kết hợp --- */
{ ma: 'dia-hinh-kethop', chuong: 'Kỹ năng', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const nam = ['2018', '2020', '2022', '2024'];
    const dt = nam.map((n, i) => T(R.nguyen(70, 78) + i * R.chon([-1, 0, 1]) * 0.6, 1));   /* nghìn ha */
    const sl = nam.map((n, i) => T(dt[i] * (R.nguyen(48, 62) / 10), 1));                   /* nghìn tấn */
    const hinh = TD.hinhKetHop(dt, sl, nam, 'nghìn ha', 'nghìn tấn');
    const k = R.nguyen(0, 3);
    const ns = T(sl[k] * 10 / dt[k], 2);                       /* tạ/ha */
    return {
      q: `Cho biểu đồ về diện tích (cột, đơn vị nghìn ha) và sản lượng (đường, đơn vị nghìn tấn) một loại cây trồng của nước ta.${hinh}`
        + `Năng suất cây trồng này năm ${nam[k]} là bao nhiêu tạ/ha? (làm tròn đến hàng phần trăm)`,
      ans: D(ns, 2),
      giai: `Bước 1 — đọc hình cho đúng trục: CỘT gắn với trục trái (diện tích, nghìn ha), ĐƯỜNG gắn với trục phải (sản lượng, nghìn tấn). `
        + `Đây là chỗ sai nhiều nhất của biểu đồ kết hợp.\n`
        + `Bước 2 — lấy số liệu năm ${nam[k]}: diện tích ${S(dt[k], 1)} nghìn ha, sản lượng ${S(sl[k], 1)} nghìn tấn.\n`
        + `Bước 3 — công thức: năng suất = sản lượng / diện tích.\n`
        + `Bước 4 — thống nhất đơn vị. Năng suất tính bằng tạ/ha, mà 1 tấn = 10 tạ nên:\n`
        + `  năng suất = ${S(sl[k], 1)} × 10 / ${S(dt[k], 1)} = ${S(ns, 4)} ≈ ${D(ns, 2)} tạ/ha.\n`
        + `Bước 5 — kiểm tra tính hợp lí: năng suất cây lương thực ở nước ta thường nằm trong khoảng 40 – 70 tạ/ha, kết quả nằm trong khoảng đó nên hợp lí.`,
      meo: 'Biểu đồ kết hợp có HAI trục tung khác đơn vị — luôn xác định cột đọc trục nào, đường đọc trục nào trước khi lấy số. '
        + 'Năng suất = sản lượng / diện tích, nhớ đổi tấn sang tạ bằng cách nhân 10.'
    };
  } }

]);

/* ============================================================
   GDKT & PHÁP LUẬT
   ============================================================ */
TD.GEN.gdkt = (TD.GEN.gdkt || []).concat([

{ ma: 'gdkt-hinh-tangtruong', chuong: 'Tăng trưởng – Phát triển', muc: 2, dang: 'mc',
  tao(R) {
    const nam = ['2020', '2021', '2022', '2023', '2024'];
    const v = nam.map(() => T(R.nguyen(20, 80) / 10, 1));
    /* Hai năm bằng nhau thì câu "năm nào cao nhất" mất nghĩa — đổi hạt giống. */
    if (new Set(v).size < v.length) return null;
    const hinh = TD.hinhCot(nam.map((n, i) => ({ ten: n, v: v[i] })), '%');
    const max = Math.max(...v), min = Math.min(...v);
    const namMax = nam[v.indexOf(max)], namMin = nam[v.indexOf(min)];
    if (namMax === namMin) return null;
    return MC(R, `Cho biểu đồ tốc độ tăng trưởng GDP của một quốc gia giai đoạn ${nam[0]} – ${nam[4]}.${hinh}Năm nào có tốc độ tăng trưởng GDP cao nhất và năm nào thấp nhất?`,
      { d: `Cao nhất năm ${namMax}, thấp nhất năm ${namMin}`,
        /* Nhiễu ghép từ MỌI cặp năm khác, nên dù năm cao nhất rơi vào đầu hay
           cuối giai đoạn vẫn luôn đủ ba phương án khác nhau. */
        s: baNhieu(`Cao nhất năm ${namMax}, thấp nhất năm ${namMin}`,
            [`Cao nhất năm ${namMin}, thấp nhất năm ${namMax}`].concat(
              nam.flatMap(a => nam.map(b => a === b ? null : `Cao nhất năm ${a}, thấp nhất năm ${b}`))
                 .filter(Boolean).slice(0, 8),
              [`Tốc độ tăng trưởng các năm là như nhau`])) || [],
        v: `Đọc số ghi trên đầu mỗi cột: ${nam.map((n, i) => n + ' là ' + S(v[i], 1) + '%').join(', ')}.\n`
          + `Cao nhất là năm ${namMax} với ${S(max, 1)}%, thấp nhất là năm ${namMin} với ${S(min, 1)}%.` },
      'Tốc độ tăng trưởng GDP DƯƠNG nghĩa là nền kinh tế vẫn lớn lên, chỉ là nhanh hay chậm. '
      + 'Chỉ khi giá trị ÂM thì quy mô nền kinh tế mới thực sự thu hẹp.');
  } },

{ ma: 'gdkt-hinh-lamphat', chuong: 'Tăng trưởng – Phát triển', muc: 3, dang: 'tln', duong: true,
  tao(R) {
    const nam = ['2021', '2022', '2023', '2024'];
    const cpi = [100];
    for (let i = 1; i < 4; i++) cpi.push(T(cpi[i - 1] * (1 + R.nguyen(15, 55) / 1000), 1));
    const hinh = TD.hinhDuong([{ ten: 'Chỉ số giá tiêu dùng (CPI)', v: cpi }], nam, 'điểm', { khongTuGoc: true, ghiSo: true });
    const k = R.nguyen(1, 3);
    const lp = T((cpi[k] - cpi[k - 1]) / cpi[k - 1] * 100, 2);
    return {
      q: `Cho biểu đồ chỉ số giá tiêu dùng (CPI) của một quốc gia, lấy năm ${nam[0]} làm gốc bằng 100 điểm.${hinh}`
        + `Tỉ lệ lạm phát của năm ${nam[k]} so với năm ${nam[k - 1]} là bao nhiêu phần trăm? (làm tròn đến hàng phần trăm)`,
      ans: D(lp, 2),
      giai: `Bước 1 — đọc hai giá trị trên đồ thị: CPI năm ${nam[k - 1]} là ${S(cpi[k - 1], 1)} điểm, năm ${nam[k]} là ${S(cpi[k], 1)} điểm.\n`
        + `Bước 2 — công thức tỉ lệ lạm phát:\n`
        + `  lạm phát = (CPI năm sau − CPI năm trước) / CPI năm trước × 100%\n`
        + `Bước 3 — thay số:\n`
        + `  = (${S(cpi[k], 1)} − ${S(cpi[k - 1], 1)}) / ${S(cpi[k - 1], 1)} × 100% = ${D(lp, 2)}%.\n`
        + `Bước 4 — đọc ý nghĩa: mức lạm phát ${lp < 10 ? 'dưới 10% là lạm phát VỪA PHẢI, nền kinh tế vẫn ổn định' : 'từ 10% trở lên đã là lạm phát phi mã, ảnh hưởng xấu tới đời sống'}.`,
      meo: 'Mẫu số luôn là năm TRƯỚC. CPI tăng không có nghĩa lạm phát tăng — CPI tăng CHẬM LẠI thì lạm phát đang giảm, '
        + 'đây là chỗ đề rất hay hỏi ngược để phân loại.'
    };
  } }

]);

/* --- GDKT mức 1: đọc cơ cấu chi tiêu --- */
TD.GEN.gdkt = (TD.GEN.gdkt || []).concat([

{ ma: 'gdkt-hinh-cocau', chuong: 'Quản lí thu chi', muc: 1, dang: 'mc',
  tao(R) {
    const an = R.nguyen(28, 40), o = R.nguyen(18, 26), hoc = R.nguyen(10, 18);
    const tk = R.nguyen(10, 20);
    const khac = 100 - an - o - hoc - tk;
    if (khac < 6 || khac > 22) return null;
    const ds = [{ ten: 'Ăn uống', v: an }, { ten: 'Nhà ở, điện nước', v: o },
                { ten: 'Học tập', v: hoc }, { ten: 'Tiết kiệm', v: tk }, { ten: 'Khác', v: khac }];
    const hinh = TD.hinhTron(ds);
    const max = ds.slice().sort((a, b) => b.v - a.v)[0];
    if (ds.filter(x => x.v === max.v).length > 1) return null;
    return MC(R, `Biểu đồ sau thể hiện cơ cấu sử dụng thu nhập hằng tháng của một gia đình.${hinh}Khoản nào chiếm tỉ trọng lớn nhất?`,
      { d: max.ten, s: baNhieu(max.ten, ds.map(x => x.ten).concat(['Vay nợ'])) || [],
        v: `Tiết kiệm KHÔNG phải một khoản chi tiêu, nên biểu đồ này là cơ cấu SỬ DỤNG THU NHẬP chứ không phải cơ cấu chi tiêu.\nĐọc số phần trăm trong phần chú giải bên phải: ${ds.map(x => x.ten + ' ' + x.v + '%').join(', ')}.
`
          + `Lớn nhất là ${max.ten} với ${max.v}%.` },
      'Nguyên tắc lập kế hoạch thu chi: khoản TIẾT KIỆM phải được trích ra NGAY khi có thu nhập, '
      + 'chứ không phải chi hết rồi thừa bao nhiêu mới để dành.');
  } },

{ ma: 'gdkt-hinh-tietkiem', chuong: 'Quản lí thu chi', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    const thang = ['T1', 'T2', 'T3', 'T4'];
    const thu = thang.map(() => R.nguyen(14, 26));
    const chi = thu.map(x => T(x * R.nguyen(62, 88) / 100, 1));
    const hinh = TD.hinhKetHop(thu, chi, thang, 'triệu đồng', '', { chungThang: true });
    const tongThu = T(thu.reduce((a, b) => a + b, 0), 1);
    const tongChi = T(chi.reduce((a, b) => a + b, 0), 1);
    const ty = T((tongThu - tongChi) / tongThu * 100, 2);
    return {
      q: `Biểu đồ sau thể hiện thu nhập (cột) và chi tiêu (đường) của một gia đình trong bốn tháng, đơn vị triệu đồng.${hinh}`
        + `Tính tỉ lệ tiết kiệm của cả bốn tháng so với tổng thu nhập, theo phần trăm. (làm tròn đến hàng phần trăm)`,
      ans: D(ty, 2),
      giai: `Bước 1 — đọc hình cho đúng trục: CỘT là thu nhập (trục trái), ĐƯỜNG là chi tiêu (trục phải).
`
        + `Bước 2 — cộng tổng thu bốn tháng: ${thu.map(x => S(x)).join(' + ')} = ${S(tongThu, 1)} triệu.
`
        + `Bước 3 — cộng tổng chi bốn tháng: ${chi.map(x => S(x, 1)).join(' + ')} = ${S(tongChi, 1)} triệu.
`
        + `Bước 4 — số tiền tiết kiệm được = tổng thu − tổng chi = ${S(tongThu, 1)} − ${S(tongChi, 1)} = ${S(T(tongThu - tongChi, 1), 1)} triệu.
`
        + `Bước 5 — tỉ lệ tiết kiệm = tiết kiệm / TỔNG THU × 100% = ${S(T(tongThu - tongChi, 1), 1)}/${S(tongThu, 1)} × 100% = ${D(ty, 2)}%.
`
        + `Bước 6 — đối chiếu chuẩn: chuyên gia tài chính khuyên tiết kiệm tối thiểu 10 – 20% thu nhập, `
        + `mức ${D(ty, 2)}% ${ty >= 20 ? 'là rất tốt' : ty >= 10 ? 'đạt mức khuyến nghị' : 'còn thấp hơn khuyến nghị'}.`,
      meo: 'Tỉ lệ tiết kiệm luôn chia cho TỔNG THU, không chia cho tổng chi. '
        + 'Với biểu đồ kết hợp, xác định cột đọc trục nào và đường đọc trục nào trước khi lấy số.'
    };
  } }

]);

/* Đánh dấu toàn bộ mẫu trong file này là mẫu CÓ HÌNH */
(function () {
  const MA = ['toan-hinh-khoi', 'toan-hinh-daoham', 'ly-hinh-nhietdo', 'ly-hinh-dangap', 'ly-hinh-phongxa',
              'hoa-hinh-toanhiet', 'hoa-hinh-enthalpy', 'hoa-hinh-dotan',
              'sinh-hinh-tangtruong', 'sinh-hinh-thap', 'sinh-hinh-luoi',
              'dia-hinh-duong', 'dia-hinh-mien', 'dia-hinh-kethop',
              'gdkt-hinh-tangtruong', 'gdkt-hinh-lamphat', 'gdkt-hinh-cocau', 'gdkt-hinh-tietkiem'];
  for (const mon of Object.keys(TD.GEN))
    for (const t of TD.GEN[mon]) if (MA.indexOf(t.ma) >= 0) t._hinh = true;
})();
})();
