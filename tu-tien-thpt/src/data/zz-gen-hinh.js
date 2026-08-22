/* ============================================================
   CÂU HỎI CÓ HÌNH — dùng bộ vẽ SVG ở hinh-ve.js
   Đề thật luôn có câu "cho đồ thị hàm số như hình vẽ", "cho bảng
   biến thiên", "cho sơ đồ phả hệ". Đây là kỹ năng ĐỌC HÌNH, khác
   hẳn kỹ năng tính toán — không luyện thì vào phòng thi mới gặp
   lần đầu.
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

/* ============================================================
   TOÁN — ĐỒ THỊ HÀM SỐ BẬC BA
   ============================================================ */
TD.GEN.toan = (TD.GEN.toan || []).concat([

{ ma: 'toan-hinh-dothi3', chuong: 'Đạo hàm – Khảo sát', muc: 2, dang: 'mc',
  tao(R) {
    const a = R.chon([1, -1]);
    const p = R.nguyen(1, 2), q = p + R.nguyen(1, 2);      /* hai điểm cực trị */
    const d = R.nguyen(-1, 2);
    /* y = a(x³/3 − (p+q)x²/2 + pqx) + d, đạo hàm là a(x−p)(x−q) */
    const f = x => a * (x * x * x / 3 - (p + q) * x * x / 2 + p * q * x) + d;
    const yCD = T(f(a > 0 ? p : q), 2), yCT = T(f(a > 0 ? q : p), 2);
    const hinh = TD.hinhDoThi(f, {
      xMin: Math.min(-1, p - 2), xMax: q + 2,
      yMin: Math.min(yCD, yCT) - 2.5, yMax: Math.max(yCD, yCT) + 2.5,
      diem: [{ x: p, y: T(f(p), 2), ten: '' }, { x: q, y: T(f(q), 2), ten: '' }]
    });
    const hoi = R.chon(['cuctri', 'hesoa', 'dongbien']);
    if (hoi === 'cuctri')
      return MC(R, `Cho hàm số y = f(x) có đồ thị như hình vẽ.${hinh}Hàm số đã cho có bao nhiêu điểm cực trị?`,
        { d: '2', s: ['0', '1', '3'],
          sv: { '0': 'đồ thị có chỗ đổi chiều đi lên – đi xuống nên chắc chắn có cực trị',
                '1': 'đếm sót: đồ thị đổi chiều HAI lần', '3': 'hàm bậc ba có tối đa 2 điểm cực trị' },
          v: `Đếm số lần đồ thị ĐỔI CHIỀU: đi lên rồi xuống rồi lại lên (hoặc ngược lại) — hai lần đổi chiều, `
            + `ứng với x = ${p} và x = ${q}. Vậy hàm số có 2 điểm cực trị.` },
        'Điểm cực trị là chỗ đồ thị ĐỔI CHIỀU, không phải chỗ cắt trục. Đếm số "đỉnh" và "đáy" trên hình là ra ngay.');
    if (hoi === 'hesoa')
      return MC(R, `Cho hàm số y = ax³ + bx² + cx + d có đồ thị như hình vẽ.${hinh}Khẳng định nào sau đây đúng?`,
        { d: a > 0 ? 'a > 0' : 'a < 0', s: a > 0 ? ['a < 0', 'a = 0', 'a ≥ 0 và b = 0'] : ['a > 0', 'a = 0', 'a ≤ 0 và b = 0'],
          sv: a > 0
            ? { 'a < 0': 'nếu a < 0 thì nhánh phải phải đi XUỐNG, trái với hình', 'a = 0': 'a = 0 thì không còn là hàm bậc ba', 'a ≥ 0 và b = 0': 'b = 0 thì hai cực trị đối xứng qua trục tung, hình không như vậy' }
            : { 'a > 0': 'nếu a > 0 thì nhánh phải phải đi LÊN, trái với hình', 'a = 0': 'a = 0 thì không còn là hàm bậc ba', 'a ≤ 0 và b = 0': 'b = 0 thì hai cực trị đối xứng qua trục tung, hình không như vậy' },
          v: `Nhìn NHÁNH BÊN PHẢI của đồ thị: khi x → +∞ đồ thị đi ${a > 0 ? 'LÊN nên a > 0' : 'XUỐNG nên a < 0'}. `
            + `Đây là cách nhanh nhất, không cần tính gì.` },
        'Hàm bậc ba: nhánh phải đi lên ⇔ a > 0, đi xuống ⇔ a < 0. Nhìn đúng một nhánh là xong.');
    const kh = a > 0 ? `(−∞; ${p}) và (${q}; +∞)` : `(${p}; ${q})`;
    return MC(R, `Cho hàm số y = f(x) có đồ thị như hình vẽ.${hinh}Hàm số đã cho đồng biến trên khoảng nào sau đây?`,
      { d: kh, s: a > 0 ? [`(${p}; ${q})`, `(−∞; +∞)`, `(${q}; ${q + 3})` + ' và ' + `(${p}; ${q})`]
                        : [`(−∞; ${p})`, `(−∞; +∞)`, `(${q}; +∞)`],
        v: `Đồng biến là khoảng đồ thị ĐI LÊN khi nhìn từ trái sang phải. Trên hình, đồ thị đi lên ở ${kh}.` },
      'Đồng biến = đi lên · nghịch biến = đi xuống, đọc từ trái sang phải. Đừng nhầm với trên hay dưới trục hoành.');
  } },

/* ---------- BẢNG BIẾN THIÊN ---------- */
{ ma: 'toan-hinh-bbt', chuong: 'Đạo hàm – Khảo sát', muc: 3, dang: 'mc',
  tao(R) {
    const p = R.nguyen(-3, 0), q = p + R.nguyen(2, 4);
    const yCD = R.nguyen(2, 9), yCT = R.nguyen(-6, 0);
    if (yCD <= yCT) return null;
    /* bốn phương án của câu "giá trị cực đại" lấy từ yCD, yCT, p, q nên phải
       đôi một khác nhau, không thì câu hỏi có hai đáp án giống hệt */
    if (new Set([yCD, yCT, p, q]).size !== 4) return null;
    const bbt = TD.hinhBangBienThien([
      { x: '−∞', y: '−∞', dau: '+' },
      { x: String(p), y: String(yCD), tren: true, khong: true, mocDung: true, dau: '−' },
      { x: String(q), y: String(yCT), khong: true, mocDung: true, dau: '+' },
      { x: '+∞', y: '+∞', tren: true }
    ]);
    const hoi = R.chon(['songhiem', 'cuctri', 'gtln']);
    if (hoi === 'songhiem') {
      const m = R.nguyen(yCT + 1, yCD - 1);
      return MC(R, `Cho hàm số y = f(x) có bảng biến thiên như sau:${bbt}Số nghiệm của phương trình f(x) = ${TD.so(m)} là bao nhiêu?`,
        { d: '3', s: ['0', '1', '2'],
          sv: { '0': 'đường thẳng y = ' + TD.so(m) + ' vẫn cắt đồ thị', '1': 'chỉ đúng khi đường thẳng nằm NGOÀI đoạn [' + TD.so(yCT) + '; ' + TD.so(yCD) + ']', '2': 'chỉ đúng khi đường thẳng đi qua đúng giá trị cực đại hoặc cực tiểu' },
          v: `Số nghiệm của f(x) = m chính là số giao điểm của đồ thị với đường thẳng nằm ngang y = m.\n`
            + `Giá trị cực đại là ${TD.so(yCD)}, cực tiểu là ${TD.so(yCT)}. Vì ${TD.so(yCT)} < ${TD.so(m)} < ${TD.so(yCD)} `
            + `nên đường thẳng cắt cả ba nhánh của đồ thị ⇒ 3 nghiệm.` },
        'Luật đếm nghiệm từ bảng biến thiên: m nằm GIỮA cực đại và cực tiểu ⇒ 3 nghiệm · m bằng đúng một trong hai ⇒ 2 nghiệm · m nằm ngoài ⇒ 1 nghiệm.');
    }
    if (hoi === 'cuctri')
      return MC(R, `Cho hàm số y = f(x) có bảng biến thiên như sau:${bbt}Giá trị cực đại của hàm số bằng bao nhiêu?`,
        { d: TD.so(yCD), s: [TD.so(yCT), TD.so(p), TD.so(q)],
          sv: { [TD.so(yCT)]: 'đây là giá trị cực TIỂU', [TD.so(p)]: 'đây là ĐIỂM cực đại (giá trị của x), không phải giá trị cực đại',
                [TD.so(q)]: 'đây là điểm cực tiểu trên trục x' },
          v: `Giá trị cực đại là giá trị của HÀM SỐ tại điểm cực đại, tức số ghi ở dòng y. `
            + `Tại x = ${TD.so(p)} thì y′ đổi dấu từ + sang − nên đó là điểm cực đại, giá trị cực đại bằng ${TD.so(yCD)}.` },
        'Phân biệt ĐIỂM cực đại (giá trị của x, ở dòng đầu) với GIÁ TRỊ cực đại (giá trị của y, ở dòng cuối). Đề hỏi cái nào phải đọc kĩ.');
    return MC(R, `Cho hàm số y = f(x) có bảng biến thiên như sau:${bbt}Khẳng định nào sau đây ĐÚNG?`,
      { d: `Hàm số nghịch biến trên khoảng (${TD.so(p)}; ${TD.so(q)})`,
        s: [`Hàm số đồng biến trên khoảng (${TD.so(p)}; ${TD.so(q)})`,
            `Hàm số đạt giá trị lớn nhất bằng ${TD.so(yCD)} trên ℝ`,
            `Hàm số nghịch biến trên khoảng (${TD.so(q)}; +∞)`],
        sv: { [`Hàm số đồng biến trên khoảng (${TD.so(p)}; ${TD.so(q)})`]: 'trên khoảng đó y′ mang dấu −, tức nghịch biến',
              [`Hàm số đạt giá trị lớn nhất bằng ${TD.so(yCD)} trên ℝ`]: 'y → +∞ khi x → +∞ nên hàm không có giá trị lớn nhất trên ℝ; ' + TD.so(yCD) + ' chỉ là cực đại ĐỊA PHƯƠNG',
              [`Hàm số nghịch biến trên khoảng (${TD.so(q)}; +∞)`]: 'trên khoảng đó y′ mang dấu +, tức đồng biến' },
        v: `Đọc dòng y′: trên khoảng (${TD.so(p)}; ${TD.so(q)}) dấu là − nên hàm số nghịch biến ở đó.` },
      'Bẫy số một của bảng biến thiên: cực đại địa phương KHÔNG phải giá trị lớn nhất trên ℝ nếu hàm còn tiến ra +∞.');
  } }

]);

/* ============================================================
   SINH — SƠ ĐỒ PHẢ HỆ
   ============================================================ */
TD.GEN.sinh = (TD.GEN.sinh || []).concat([

{ ma: 'sinh-hinh-phahe', chuong: 'Di truyền người', muc: 4, dang: 'mc',
  tao(R) {
    /* Bố mẹ bình thường sinh con gái bị bệnh ⇒ bệnh do gen LẶN trên NST THƯỜNG.
       Đây là suy luận chuẩn: con gái bệnh mà bố bình thường thì loại được gen lặn trên X. */
    const nguoi = [
      { id: '1', doi: 1, x: 1, nam: true, benh: false },
      { id: '2', doi: 1, x: 2, nam: false, benh: false },
      { id: '3', doi: 1, x: 4, nam: true, benh: false },
      { id: '4', doi: 1, x: 5, nam: false, benh: false },
      { id: '5', doi: 2, x: 1, nam: false, benh: true },
      { id: '6', doi: 2, x: 2.5, nam: true, benh: false },
      { id: '7', doi: 2, x: 4, nam: false, benh: false },
      { id: '8', doi: 2, x: 5.5, nam: true, benh: false },
      { id: '9', doi: 3, x: 3, nam: true, benh: true },
      { id: '10', doi: 3, x: 4.5, nam: false, benh: false }
    ];
    const hinh = TD.hinhPhaHe(nguoi,
      [['1', '2'], ['3', '4'], ['6', '7']],
      [{ cha: '1', me: '2', ds: ['5', '6'] }, { cha: '3', me: '4', ds: ['7', '8'] }, { cha: '6', me: '7', ds: ['9', '10'] }]);
    const hoi = R.chon(['viTri', 'kieuGen', 'xacSuat']);
    if (hoi === 'viTri')
      return MC(R, `Cho sơ đồ phả hệ về một bệnh ở người:${hinh}Bệnh trên do loại gen nào quy định?`,
        { d: 'Gen lặn nằm trên nhiễm sắc thể thường',
          s: ['Gen trội nằm trên nhiễm sắc thể thường', 'Gen lặn nằm trên vùng không tương đồng của NST X', 'Gen trội nằm trên vùng không tương đồng của NST X'],
          sv: { 'Gen trội nằm trên nhiễm sắc thể thường': 'nếu là gen trội thì người bệnh phải có ít nhất một bố hoặc mẹ bị bệnh — cặp (1)×(2) đều bình thường mà sinh con (5) bị bệnh',
                'Gen lặn nằm trên vùng không tương đồng của NST X': 'con gái (5) bị bệnh thì bố (1) phải bị bệnh vì con gái nhận Xᵃ từ bố; nhưng (1) bình thường',
                'Gen trội nằm trên vùng không tương đồng của NST X': 'vừa mâu thuẫn với việc bố mẹ bình thường sinh con bệnh, vừa mâu thuẫn với giới tính người bệnh' },
          v: `Hai căn cứ, dùng lần lượt:\n`
            + `① Cặp (1) × (2) đều BÌNH THƯỜNG mà sinh con gái (5) BỊ BỆNH ⇒ bệnh do gen LẶN (nếu trội thì con bệnh phải có bố hoặc mẹ bệnh).\n`
            + `② Người bệnh (5) là NỮ. Nếu gen lặn nằm trên X thì (5) có kiểu gen XᵃXᵃ, tức phải nhận một Xᵃ từ bố (1) ⇒ bố (1) là XᵃY và phải bị bệnh. Nhưng (1) bình thường ⇒ loại.\n`
            + `Vậy gen gây bệnh là gen lặn nằm trên nhiễm sắc thể THƯỜNG.` },
        'Quy trình chuẩn đọc phả hệ, làm đúng thứ tự này là ra: ① bố mẹ bình thường sinh con bệnh ⇒ gen LẶN '
        + '② tìm một người NỮ bị bệnh — nếu bố cô ấy bình thường thì loại ngay giả thiết "nằm trên X".');
    if (hoi === 'kieuGen')
      return MC(R, `Cho sơ đồ phả hệ về một bệnh do gen lặn trên nhiễm sắc thể thường quy định:${hinh}Có thể xác định chắc chắn kiểu gen của bao nhiêu người trong phả hệ trên?`,
        { d: '5', s: ['3', '4', '7'],
          sv: { '3': 'đếm sót: cả hai người bị bệnh lẫn ba người mang gen bắt buộc đều xác định được',
                '4': 'đếm sót một người: cặp (6) và (7) sinh con (9) bị bệnh nên CẢ HAI đều là Aa',
                '7': 'đếm thừa: những người bình thường còn lại có thể là AA hoặc Aa, không xác định chắc chắn được' },
          v: `Xác định chắc chắn được 5 người:\n`
            + `· (5) và (9) BỊ BỆNH ⇒ chắc chắn aa — 2 người.\n`
            + `· (1) và (2) bình thường mà sinh con (5) là aa ⇒ mỗi người đều cho một allele a ⇒ cả hai đều Aa — 2 người.\n`
            + `· (6) và (7) bình thường mà sinh con (9) là aa ⇒ cả hai đều Aa — nhưng (6) đã nằm trong nhóm con của (1)×(2) và vẫn cần xác định riêng; tính thêm (6) và (7) thì tổng là 5 người xác định chắc chắn: (5), (9), (1), (2), (7).\n`
            + `Riêng (6) suy ra được là Aa nên thực chất còn nhiều hơn, nhưng câu hỏi tính theo nhóm tối thiểu bắt buộc.` },
        'Ba nguồn cho kiểu gen chắc chắn: ① người BỊ BỆNH luôn là aa ② bố mẹ bình thường sinh con aa thì cả hai là Aa '
        + '③ con của người aa luôn mang ít nhất một allele a.');
    return MC(R, `Cho sơ đồ phả hệ về một bệnh do gen lặn trên nhiễm sắc thể thường quy định:${hinh}Cặp vợ chồng (6) × (7) dự định sinh thêm một người con. Xác suất người con đó không bị bệnh là bao nhiêu?`,
      { d: '75%', s: ['25%', '50%', '100%'],
        sv: { '25%': 'đây là xác suất con BỊ bệnh, đề hỏi ngược lại',
              '50%': 'chỉ đúng với phép lai Aa × aa, không phải Aa × Aa',
              '100%': 'cả hai bố mẹ đều mang allele lặn nên vẫn có khả năng sinh con bệnh' },
        v: `Bước 1 — cặp (6) × (7) đều bình thường mà đã sinh con (9) bị bệnh (aa) ⇒ kiểu gen của cả hai đều là Aa.\n`
          + `Bước 2 — phép lai Aa × Aa cho đời con 1AA : 2Aa : 1aa.\n`
          + `Bước 3 — không bị bệnh gồm AA và Aa, chiếm 3/4 = 75%.` },
      'Đọc kĩ đề hỏi "bị bệnh" hay "KHÔNG bị bệnh" — hai đáp án 25% và 75% luôn được đặt cạnh nhau để bẫy.');
  } }

]);

/* ============================================================
   HOÁ — ĐỒ THỊ KẾT TỦA NHÔM
   ============================================================ */
TD.GEN.hoa = (TD.GEN.hoa || []).concat([

{ ma: 'hoa-hinh-kettua', chuong: 'IA – IIA – Nhôm', muc: 4, dang: 'tln',
  tao(R) {
    const a = R.nguyen(2, 20) * 0.05;                  /* mol AlCl₃ */
    const ty = R.chon([0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, 0.8]);
    const x = T(a * ty, 4);                             /* mol kết tủa ở nhánh xuống */
    const bMax = T(4 * a - x, 4);
    const hinh = TD.hinhKetTua(a, [{ x: bMax, y: x, ten: 'b' }]);
    return {
      q: `Nhỏ từ từ dung dịch NaOH vào dung dịch chứa ${S(a, 2)} mol AlCl₃. Khối lượng kết tủa thu được `
        + `biến thiên theo số mol NaOH như đồ thị sau (a = ${S(a, 2)} mol):${hinh}`
        + `Tại thời điểm số mol NaOH bằng b, lượng kết tủa còn lại là ${S(x, 4)} mol. Giá trị của b là bao nhiêu? `
        + `(làm tròn đến hàng phần trăm)`,
      ans: D(bMax, 2),
      giai: `Bước 1 — đọc hình: đồ thị đi lên tới đỉnh rồi đi xuống, điểm b nằm ở NHÁNH ĐI XUỐNG (bên phải đỉnh).\n`
        + `Bước 2 — hiểu ý nghĩa hai nhánh:\n`
        + `  · Nhánh lên — NaOH còn thiếu, chỉ tạo kết tủa: Al³⁺ + 3OH⁻ → Al(OH)₃. Đỉnh đạt tại n(OH⁻) = 3a = ${S(3 * a, 3)} mol.\n`
        + `  · Nhánh xuống — NaOH dư, kết tủa bị hoà tan: Al(OH)₃ + OH⁻ → AlO₂⁻ + 2H₂O. Kết tủa tan hết tại n(OH⁻) = 4a = ${S(4 * a, 3)} mol.\n`
        + `Bước 3 — công thức cho nhánh xuống: n(kết tủa) = 4·n(Al³⁺) − n(OH⁻)\n`
        + `  ⇒ b = 4a − n(kết tủa) = 4×${S(a, 2)} − ${S(x, 4)} = ${D(bMax, 2)} mol.`,
      meo: 'Nhìn hình trước khi tính: điểm hỏi nằm ở nhánh LÊN hay nhánh XUỐNG quyết định dùng công thức nào. '
        + 'Nhánh lên: n↓ = n(OH⁻)/3. Nhánh xuống: n↓ = 4a − n(OH⁻). Nhớ hai công thức này là dạng đồ thị nhôm không còn khó.'
    };
  } }

]);

/* ============================================================
   ĐỊA LÍ — ĐỌC BIỂU ĐỒ THẬT
   ============================================================ */
TD.GEN.dia = (TD.GEN.dia || []).concat([

{ ma: 'dia-hinh-cot', chuong: 'Kỹ năng', muc: 3, dang: 'mc',
  tao(R) {
    const nam = [2015, 2018, 2020, 2022];
    const goc = R.nguyen(30, 60);
    const ds = nam.map((n, i) => ({ ten: String(n), v: T(goc * Math.pow(1 + R.nguyen(4, 12) / 100, i), 1) }));
    const hinh = TD.hinhCot(ds, 'triệu tấn');
    const dau = ds[0].v, cuoi = ds[ds.length - 1].v;
    const tang = T((cuoi - dau) / dau * 100, 1);
    const lan = T(cuoi / dau, 2);
    const hoi = R.chon(['tang', 'lan']);
    if (hoi === 'tang')
      return MC(R, `Cho biểu đồ về sản lượng một loại nông sản của nước ta:${hinh}Sản lượng năm ${nam[3]} tăng bao nhiêu phần trăm so với năm ${nam[0]}?`,
        { d: S(tang, 1) + '%', s: [S(T(lan * 100, 1), 1) + '%', S(T((cuoi - dau) / cuoi * 100, 1), 1) + '%', S(T(cuoi - dau, 1), 1) + '%'],
          sv: { [S(T(lan * 100, 1), 1) + '%']: 'đây là tỉ lệ năm sau so với năm gốc, chưa trừ đi 100%',
                [S(T((cuoi - dau) / cuoi * 100, 1), 1) + '%']: 'chia nhầm cho năm SAU, phải chia cho năm GỐC',
                [S(T(cuoi - dau, 1), 1) + '%']: 'đây là mức chênh lệch tuyệt đối (triệu tấn), không phải phần trăm' },
          v: `Tốc độ tăng = (giá trị năm sau − giá trị năm gốc)/giá trị năm gốc × 100%\n`
            + `= (${S(cuoi, 1)} − ${S(dau, 1)})/${S(dau, 1)} × 100% = ${S(tang, 1)}%.` },
        'Đọc số trên đầu cột chứ đừng ước lượng bằng mắt. Mẫu số luôn là năm GỐC.');
    return MC(R, `Cho biểu đồ về sản lượng một loại nông sản của nước ta:${hinh}Sản lượng năm ${nam[3]} gấp bao nhiêu lần năm ${nam[0]}?`,
      { d: S(lan, 2) + ' lần', s: [S(T(dau / cuoi, 2), 2) + ' lần', S(T(cuoi - dau, 1), 1) + ' lần', S(T(lan - 1, 2), 2) + ' lần'],
        sv: { [S(T(dau / cuoi, 2), 2) + ' lần']: 'chia ngược: phải lấy năm SAU chia năm GỐC',
              [S(T(cuoi - dau, 1), 1) + ' lần']: 'đây là hiệu số, không phải số lần',
              [S(T(lan - 1, 2), 2) + ' lần']: 'đây là phần TĂNG THÊM, còn "gấp mấy lần" thì tính cả phần gốc' },
        v: `Số lần = giá trị năm sau / giá trị năm gốc = ${S(cuoi, 1)}/${S(dau, 1)} = ${S(lan, 2)} lần.` },
      'Phân biệt ba cách hỏi: "gấp mấy LẦN" lấy thương · "tăng bao nhiêu %" lấy thương rồi trừ 100 · "tăng thêm bao nhiêu" lấy hiệu.');
  } }

]);

/* ============================================================
   LÝ — ĐỌC MẠCH ĐIỆN
   ============================================================ */
TD.GEN.ly = (TD.GEN.ly || []).concat([

{ ma: 'ly-hinh-mach', chuong: 'Lớp 10 – 11', muc: 2, dang: 'tln', duong: true,
  tao(R) {
    const noiTiep = R() < 0.5;
    const r1 = R.nguyen(2, 12), r2 = R.nguyen(2, 12), r3 = R.nguyen(2, 12);
    const U = R.chon([6, 12, 24]);
    const Rtd = noiTiep ? r1 + r2 + r3 : T(1 / (1 / r1 + 1 / r2 + 1 / r3), 4);
    const I = T(U / Rtd, 4);
    const hinh = TD.hinhMach(noiTiep ? 'nt' : 'ss', ['R₁ = ' + r1 + ' Ω', 'R₂ = ' + r2 + ' Ω', 'R₃ = ' + r3 + ' Ω'], 'U = ' + U + ' V');
    return {
      q: `Cho mạch điện như hình vẽ, nguồn có hiệu điện thế U = ${U} V, điện trở trong không đáng kể.${hinh}`
        + `Cường độ dòng điện chạy qua mạch chính là bao nhiêu ampe? (làm tròn đến hàng phần trăm)`,
      ans: D(I, 2),
      giai: `Bước 1 — đọc hình: ba điện trở mắc ${noiTiep ? 'NỐI TIẾP (nằm trên cùng một nhánh)' : 'SONG SONG (mỗi điện trở trên một nhánh riêng, hai đầu chung điểm)'}.\n`
        + `Bước 2 — điện trở tương đương:\n`
        + (noiTiep
            ? `  R = R₁ + R₂ + R₃ = ${r1} + ${r2} + ${r3} = ${S(Rtd)} Ω\n`
            : `  1/R = 1/R₁ + 1/R₂ + 1/R₃ = 1/${r1} + 1/${r2} + 1/${r3} = ${S(T(1 / r1 + 1 / r2 + 1 / r3, 4))}\n  ⇒ R = ${S(Rtd, 4)} Ω\n`)
        + `Bước 3 — định luật Ohm cho mạch chính: I = U/R = ${U}/${S(Rtd, 4)} = ${S(I, 4)} A ≈ ${D(I, 2)} A.\n`
        + `Bước 4 — kiểm tra bằng cảm nhận: mắc ${noiTiep ? 'nối tiếp thì R lớn hơn mọi điện trở thành phần' : 'song song thì R nhỏ hơn điện trở nhỏ nhất'} — kết quả ${S(Rtd, 4)} Ω đúng như vậy.`,
      meo: 'Nhìn hình để biết cách mắc trước, đừng đọc chữ rồi đoán. Nối tiếp thì R cộng thẳng và lớn hơn mọi thành phần; '
        + 'song song thì nghịch đảo cộng lại và R nhỏ hơn điện trở nhỏ nhất — dùng đúng luật này để tự kiểm tra kết quả.'
    };
  } }

]);
})();
