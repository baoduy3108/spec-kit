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
    /* Tăng theo LÃI KÉP từng năm một. Trước đây luỹ thừa chỉ số với một tỉ lệ
       bốc lại mỗi vòng nên hai cột liền nhau có thể bằng nhau, thậm chí tụt
       xuống — nhìn như biểu đồ vẽ sai. */
    const ds = []; let sl = R.nguyen(30, 60);
    nam.forEach((n, i) => { if (i) sl = T(sl * (1 + R.nguyen(4, 12) / 100), 1); ds.push({ ten: String(n), v: sl }); });
    if (new Set(ds.map(x => x.v)).size < ds.length) return null;
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

{ ma: 'ly-hinh-mach', chuong: 'Lớp 10 – 11', muc: 3, dang: 'tln', duong: true,
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

/* ============================================================
   BỔ SUNG — SÁU MẪU CÓ HÌNH NỮA
   Sáu mẫu đầu là quá ít so với 877 mẫu của cả app: đo ra trung bình
   một phiên Luyện Công 30 câu chỉ gặp 0,3–0,55 câu có hình, còn đề
   Độ Kiếp thì gần như không bao giờ. Thêm mẫu để hình thành chuyện
   bình thường chứ không phải của hiếm.
   ============================================================ */
(function () {
const S = TD.soVN, T = TD.lamTron, D = TD.dapSo;
const MC = (R, de, it, meo) => {
  const opts = TD.xaoR(R, [it.d].concat(it.s));
  return { q: de, opts: opts, ans: opts.indexOf(it.d),
    giai: `Đáp án đúng: ${it.d}\n${it.v}\n\nVì sao các phương án còn lại bị loại:\n`
      + TD.khoiLoai(opts, it.d, it.sv, 'không đọc đúng thông tin trên hình.'),
    meo: meo };
};
/* Lọc lấy đúng ba nhiễu khác đáp án và khác nhau; không đủ thì trả null để
   đổi hạt giống, chứ không để câu hỏi có hai phương án y hệt. */
const baNhieu = (dung, ung) => {
  const ra = [];
  for (const x of ung) if (x !== dung && ra.indexOf(x) < 0) ra.push(x);
  return ra.length >= 3 ? ra.slice(0, 3) : null;
};

TD.GEN.toan = (TD.GEN.toan || []).concat([

/* --- Đồ thị hàm trùng phương --- */
{ ma: 'toan-hinh-dothi4', chuong: 'Đạo hàm – Khảo sát', muc: 2, dang: 'mc',
  tao(R) {
    const a = R.chon([1, -1]);
    const b = R.nguyen(1, 3);                    /* y = a(x⁴ − 2b·x²) + c, cực trị tại 0 và ±√b */
    const c = R.nguyen(-2, 2);
    const f = x => a * (x * x * x * x - 2 * b * x * x) + c;
    const r = Math.sqrt(b);
    const yBien = T(f(r), 2), yGiua = c;
    const hinh = TD.hinhDoThi(f, {
      xMin: -r - 1.3, xMax: r + 1.3,
      yMin: Math.min(yBien, yGiua) - 2, yMax: Math.max(yBien, yGiua) + 2.5
    });
    const hoi = R.chon(['cuctri', 'hesoa']);
    if (hoi === 'cuctri')
      return MC(R, `Cho hàm số y = ax⁴ + bx² + c có đồ thị như hình vẽ.${hinh}Hàm số đã cho có bao nhiêu điểm cực trị?`,
        { d: '3', s: ['1', '2', '0'],
          sv: { '1': 'chỉ đúng khi đồ thị có đúng một "đáy" hoặc một "đỉnh"; hình này có ba chỗ đổi chiều',
                '2': 'hàm trùng phương chỉ có 1 hoặc 3 cực trị, không bao giờ có 2',
                '0': 'đồ thị rõ ràng có chỗ đổi chiều' },
          v: `Đếm số lần đồ thị ĐỔI CHIỀU trên hình: có ba chỗ (hai bên và một ở giữa) ⇒ 3 điểm cực trị.\n`
            + `Với hàm trùng phương, ba cực trị xảy ra khi a·b < 0; hình dạng "chữ W" (hoặc "chữ M" lộn ngược) là dấu hiệu nhận biết.` },
        'Hàm trùng phương chỉ có thể có 1 hoặc 3 điểm cực trị — không bao giờ 2. Thấy phương án "2 điểm" là loại được ngay.');
    return MC(R, `Cho hàm số y = ax⁴ + bx² + c có đồ thị như hình vẽ.${hinh}Khẳng định nào sau đây đúng?`,
      { d: a > 0 ? 'a > 0 và b < 0' : 'a < 0 và b > 0',
        s: a > 0 ? ['a > 0 và b > 0', 'a < 0 và b < 0', 'a < 0 và b > 0'] : ['a < 0 và b < 0', 'a > 0 và b > 0', 'a > 0 và b < 0'],
        v: `Hai bước đọc hình:\n`
          + `① Nhánh ngoài cùng bên phải đi ${a > 0 ? 'LÊN ⇒ a > 0' : 'XUỐNG ⇒ a < 0'}.\n`
          + `② Đồ thị có BA cực trị ⇒ a·b < 0 ⇒ b ${a > 0 ? '< 0' : '> 0'}.` },
      'Với hàm trùng phương: nhánh phải quyết định dấu a · số cực trị quyết định dấu tích a·b (ba cực trị ⇔ a·b < 0).');
  } },

/* --- Đồ thị hàm phân thức: đọc tiệm cận --- */
{ ma: 'toan-hinh-tiemcan', chuong: 'Đạo hàm – Khảo sát', muc: 2, dang: 'mc',
  tao(R) {
    const doc = R.chon([-2, -1, 1, 2]), ngang = R.chon([-2, -1, 1, 2]);
    const k = R.chon([1, 2, -1, -2]);
    const f = x => ngang + k / (x - doc);
    const hinh = TD.hinhDoThi(f, {
      xMin: doc - 3.5, xMax: doc + 3.5, yMin: ngang - 4, yMax: ngang + 4,
      tiemCan: [{ doc: doc }, { ngang: ngang }]
    });
    const dungPA = `x = ${TD.so(doc)} và y = ${TD.so(ngang)}`;
    const nhieu = baNhieu(dungPA, [
      `x = ${TD.so(ngang)} và y = ${TD.so(doc)}`,
      `x = ${TD.so(-doc)} và y = ${TD.so(ngang)}`,
      `x = ${TD.so(doc)} và y = ${TD.so(-ngang)}`,
      `x = ${TD.so(-ngang)} và y = ${TD.so(-doc)}`,
      `x = ${TD.so(doc + 1)} và y = ${TD.so(ngang)}`
    ]);
    if (!nhieu) return null;
    return MC(R, `Cho hàm số y = f(x) có đồ thị như hình vẽ (hai đường nét đứt là tiệm cận).${hinh}Đồ thị hàm số có tiệm cận đứng và tiệm cận ngang lần lượt là gì?`,
      { d: dungPA, s: nhieu,
        sv: { [`x = ${TD.so(ngang)} và y = ${TD.so(doc)}`]: 'đảo vai trò hai đường: tiệm cận ĐỨNG là đường thẳng song song trục Oy, phải có dạng x = …',
              [`x = ${TD.so(-doc)} và y = ${TD.so(ngang)}`]: 'đọc sai dấu của giao điểm đường đứng với trục hoành',
              [`x = ${TD.so(doc)} và y = ${TD.so(-ngang)}`]: 'đọc sai dấu của giao điểm đường ngang với trục tung' },
        v: `Tiệm cận ĐỨNG là đường nét đứt THẲNG ĐỨNG — nó cắt trục hoành tại ${TD.so(doc)} nên phương trình là x = ${TD.so(doc)}.\n`
          + `Tiệm cận NGANG là đường nét đứt NẰM NGANG — nó cắt trục tung tại ${TD.so(ngang)} nên phương trình là y = ${TD.so(ngang)}.` },
      'Đường thẳng đứng luôn viết x = số · đường nằm ngang luôn viết y = số. Nhớ được điều này thì loại ngay hai phương án đảo vai trò.');
  } }

]);

TD.GEN.ly = (TD.GEN.ly || []).concat([

/* --- Đồ thị p–V: nhận dạng đẳng quá trình --- */
{ ma: 'ly-hinh-pv', chuong: 'Khí lí tưởng', muc: 3, dang: 'mc',
  tao(R) {
    const loai = R.chon(['nhiet', 'tich', 'ap']);
    const p1 = R.nguyen(2, 4), V1 = R.nguyen(1, 2), he = p1 * V1;
    /* Đẳng tích = đường thẳng ĐỨNG tại V = V₁. Trước đây cố nặn nó ra từ
       hàm f(v) nên chỉ vẽ được một gạch ngang cụt vài pixel — nhìn không ra
       cái gì, mà đáp án lại bắt nhận diện đúng đường thẳng đứng. */
    const f = loai === 'nhiet' ? (v => he / v)
            : loai === 'tich' ? (() => NaN)
            : (() => p1);
    const hinh = TD.hinhDoThi(f, { xMin: 0.2, xMax: 5, yMin: 0, yMax: 6, tenX: 'V', tenY: 'p',
      duongDung: loai === 'tich' ? [V1] : [] });
    const ten = { nhiet: 'đẳng nhiệt', tich: 'đẳng tích', ap: 'đẳng áp' };
    const dung = { nhiet: 'Quá trình đẳng nhiệt (T không đổi)', tich: 'Quá trình đẳng tích (V không đổi)', ap: 'Quá trình đẳng áp (p không đổi)' };
    const moTa = { nhiet: 'đường cong hypebol, p giảm khi V tăng sao cho tích p·V không đổi',
                   tich: 'đường thẳng ĐỨNG, V giữ nguyên khi p thay đổi',
                   ap: 'đường thẳng NẰM NGANG, p giữ nguyên khi V thay đổi' };
    const khac = Object.keys(dung).filter(x => x !== loai);
    return MC(R, `Trong hệ toạ độ (V; p), một lượng khí lí tưởng biến đổi theo đồ thị sau (trục hoành là V, trục tung là p).${hinh}Đồ thị trên mô tả quá trình nào?`,
      { d: dung[loai], s: khac.map(x => dung[x]).concat(['Quá trình đoạn nhiệt (không trao đổi nhiệt)']),
        sv: Object.fromEntries(khac.map(x => [dung[x], `quá trình đó cho ${moTa[x]}, không khớp với hình`])
          .concat([['Quá trình đoạn nhiệt (không trao đổi nhiệt)', 'không nằm trong ba đẳng quá trình của chương trình phổ thông']])),
        v: `Trong hệ (V; p), mỗi đẳng quá trình có một dáng riêng:\n`
          + `· đẳng nhiệt — đường cong hypebol (p·V = hằng số)\n`
          + `· đẳng tích — đường thẳng ĐỨNG\n`
          + `· đẳng áp — đường thẳng NẰM NGANG\n`
          + `Hình đã cho là ${moTa[loai]} ⇒ ${ten[loai]}.` },
      'Nhìn DÁNG đường là ra ngay, không cần tính: cong hypebol ⇒ đẳng nhiệt · thẳng đứng ⇒ đẳng tích · thẳng ngang ⇒ đẳng áp. '
      + 'Nhớ kiểm trục nào là p, trục nào là V trước — đổi trục thì dáng cũng đổi.');
  } }

]);

TD.GEN.hoa = (TD.GEN.hoa || []).concat([

/* --- Đồ thị sục CO₂ vào dung dịch Ca(OH)₂ --- */
{ ma: 'hoa-hinh-co2', chuong: 'IA – IIA – Nhôm', muc: 4, dang: 'tln',
  tao(R) {
    const a = R.nguyen(2, 20) * 0.05;                  /* mol Ca(OH)₂ */
    const ty = R.chon([0.3, 0.4, 0.5, 0.6, 0.7, 0.8]);
    const x = T(a * ty, 4);                            /* mol kết tủa ở nhánh xuống */
    const b = T(2 * a - x, 4);
    const hinh = TD.hinhTamGiac(a, 2 * a, a,
      { x: 'n(CO₂)', y: 'n(CaCO₃)', dinh: 'a', het: '2a' }, [{ x: b, y: x, ten: 'b' }]);
    return {
      q: `Sục từ từ khí CO₂ vào dung dịch chứa ${S(a, 2)} mol Ca(OH)₂. Số mol kết tủa CaCO₃ biến thiên theo `
        + `số mol CO₂ như đồ thị sau (a = ${S(a, 2)} mol):${hinh}`
        + `Tại thời điểm số mol CO₂ bằng b, lượng kết tủa còn lại là ${S(x, 4)} mol. Giá trị của b là bao nhiêu? `
        + `(làm tròn đến hàng phần trăm)`,
      ans: D(b, 2),
      giai: `Bước 1 — đọc hình: điểm b nằm ở NHÁNH ĐI XUỐNG, tức CO₂ đã dư và đang hoà tan bớt kết tủa.\n`
        + `Bước 2 — hai giai đoạn của phản ứng:\n`
        + `  · Giai đoạn 1 — CO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O. Kết tủa cực đại bằng a = ${S(a, 2)} mol khi n(CO₂) = a.\n`
        + `  · Giai đoạn 2 — CO₂ + CaCO₃ + H₂O → Ca(HCO₃)₂. Kết tủa tan dần, hết sạch khi n(CO₂) = 2a = ${S(2 * a, 3)} mol.\n`
        + `Bước 3 — công thức cho nhánh xuống: n(kết tủa) = 2a − n(CO₂)\n`
        + `  ⇒ b = 2a − n(kết tủa) = 2×${S(a, 2)} − ${S(x, 4)} = ${D(b, 2)} mol.`,
      meo: 'Phân biệt hai đồ thị hình tam giác hay bị lẫn: sục CO₂ vào Ca(OH)₂ thì đỉnh ở a và về 0 tại 2a; '
        + 'còn nhỏ NaOH vào AlCl₃ thì đỉnh ở 3a và về 0 tại 4a. Nhìn nhãn trên trục hoành để biết mình đang ở bài nào.'
    };
  } }

]);

TD.GEN.sinh = (TD.GEN.sinh || []).concat([

/* --- Phả hệ gen lặn trên X: dạng hay ra nhất --- */
{ ma: 'sinh-hinh-phahe-x', chuong: 'Di truyền người', muc: 4, dang: 'mc',
  tao(R) {
    /* Bố (1) bình thường × mẹ (2) bình thường sinh con TRAI (5) bị bệnh;
       con gái (6) bình thường lấy (7) bình thường sinh con trai (9) bị bệnh.
       Không có nữ nào bị bệnh ⇒ dấu hiệu điển hình của gen lặn trên X. */
    const nguoi = [
      { id: '1', doi: 1, x: 1, nam: true, benh: false },
      { id: '2', doi: 1, x: 2, nam: false, benh: false },
      { id: '3', doi: 1, x: 4.2, nam: true, benh: false },
      { id: '4', doi: 1, x: 5.2, nam: false, benh: false },
      { id: '5', doi: 2, x: 0.8, nam: true, benh: true },
      { id: '6', doi: 2, x: 2.2, nam: false, benh: false },
      { id: '7', doi: 2, x: 3.6, nam: true, benh: false },
      { id: '8', doi: 2, x: 5.4, nam: false, benh: false },
      { id: '9', doi: 3, x: 2.4, nam: true, benh: true },
      { id: '10', doi: 3, x: 3.6, nam: false, benh: false }
    ];
    const hinh = TD.hinhPhaHe(nguoi, [['1', '2'], ['3', '4'], ['6', '7']],
      [{ cha: '1', me: '2', ds: ['5', '6'] }, { cha: '3', me: '4', ds: ['7', '8'] }, { cha: '6', me: '7', ds: ['9', '10'] }]);
    const hoi = R.chon(['viTri', 'xacSuat', 'conTrai', 'mangGen']);
    if (hoi === 'viTri')
      return MC(R, `Cho sơ đồ phả hệ về một bệnh ở người:${hinh}Bệnh trên nhiều khả năng do loại gen nào quy định?`,
        { d: 'Gen lặn nằm trên vùng không tương đồng của nhiễm sắc thể X',
          s: ['Gen lặn nằm trên nhiễm sắc thể thường', 'Gen trội nằm trên nhiễm sắc thể thường', 'Gen trội nằm trên vùng không tương đồng của nhiễm sắc thể X'],
          sv: { 'Gen lặn nằm trên nhiễm sắc thể thường': 'nếu nằm trên NST thường thì bệnh xuất hiện đều ở hai giới; ở đây CẢ HAI người bệnh đều là nam, và cả phả hệ không có nữ nào bị bệnh',
                'Gen trội nằm trên nhiễm sắc thể thường': 'gen trội thì người bệnh phải có bố hoặc mẹ bị bệnh — cặp (1)×(2) đều bình thường mà sinh con (5) bị bệnh',
                'Gen trội nằm trên vùng không tương đồng của nhiễm sắc thể X': 'nếu trội trên X thì bố bị bệnh sẽ truyền cho TẤT CẢ con gái; hơn nữa bố mẹ bình thường không thể sinh con bệnh' },
          v: `Suy luận hai bước:\n`
            + `① Cặp (1) × (2) đều bình thường mà sinh con (5) bị bệnh ⇒ bệnh do gen LẶN.\n`
            + `② Cả hai người bệnh (5) và (9) đều là NAM, không có nữ nào bị bệnh ⇒ dấu hiệu của gen lặn nằm trên NST giới tính X. `
            + `Nam chỉ có một X nên chỉ cần một allele lặn là biểu hiện bệnh; nữ phải có cả hai X đều lặn nên hiếm hơn nhiều.\n`
            + `Vậy bệnh do gen lặn trên vùng không tương đồng của X.` },
        'Hai phả hệ trông giống nhau nhưng khác một chi tiết sống còn: có nữ bị bệnh mà bố bình thường ⇒ gen trên NST THƯỜNG; '
        + 'chỉ toàn nam bị bệnh ⇒ nghĩ ngay tới gen lặn trên X.');
    if (hoi === 'conTrai')
      return MC(R, `Cho sơ đồ phả hệ về một bệnh do gen lặn nằm trên vùng không tương đồng của nhiễm sắc thể X quy định:${hinh}Cặp vợ chồng (6) × (7) sinh thêm một người con TRAI. Xác suất người con trai đó bị bệnh là bao nhiêu?`,
        { d: '50%', s: ['25%', '75%', '100%'],
          sv: { '25%': 'đây là xác suất sinh con trai bị bệnh khi tính trên TỔNG số con; đề đã cho biết là con trai nên không nhân thêm 1/2 nữa',
                '75%': 'đây là xác suất con KHÔNG bị bệnh của phép lai trên NST thường, không áp dụng ở đây',
                '100%': 'mẹ chỉ dị hợp XᴬXᵃ nên một nửa số con trai vẫn nhận được Xᴬ và bình thường' },
          v: `Bước 1 — con trai (9) bị bệnh nên mẹ (6) chắc chắn là XᴬXᵃ; bố (7) bình thường nên là XᴬY.\n`
            + `Bước 2 — phép lai XᴬXᵃ × XᴬY cho đời con: XᴬXᴬ, XᴬXᵃ, XᴬY, XᵃY.\n`
            + `Bước 3 — đề đã CHO BIẾT đứa con là con trai, nên chỉ xét hai kiểu gen con trai XᴬY và XᵃY ⇒ xác suất bị bệnh là 1/2 = 50%.` },
        'Đọc kĩ đề hỏi "sinh một người con" hay "sinh một người con TRAI". Nếu đã biết là con trai thì không nhân thêm 1/2 giới tính nữa — '
        + 'đây là chỗ hai đáp án 25% và 50% được đặt cạnh nhau để bẫy.');
    if (hoi === 'mangGen')
      return MC(R, `Cho sơ đồ phả hệ về một bệnh do gen lặn nằm trên vùng không tương đồng của nhiễm sắc thể X quy định:${hinh}Người phụ nữ (2) có kiểu gen như thế nào?`,
        { d: 'Chắc chắn là XᴬXᵃ', s: ['Chắc chắn là XᴬXᴬ', 'Có thể là XᴬXᴬ hoặc XᴬXᵃ', 'Chắc chắn là XᵃXᵃ'],
          sv: { 'Chắc chắn là XᴬXᴬ': 'nếu vậy con trai (5) chỉ nhận Xᴬ từ mẹ và không thể bị bệnh',
                'Có thể là XᴬXᴬ hoặc XᴬXᵃ': 'con trai (5) bị bệnh đã loại hẳn khả năng XᴬXᴬ',
                'Chắc chắn là XᵃXᵃ': 'nếu vậy chính (2) đã bị bệnh, nhưng trên hình (2) bình thường' },
          v: `Con trai (5) bị bệnh nên mang XᵃY. Allele Xᵃ chỉ có thể đến từ MẸ vì bố truyền Y cho con trai.\n`
            + `Mẹ (2) bình thường nên không thể là XᵃXᵃ ⇒ kiểu gen của (2) là XᴬXᵃ.` },
        'Con trai nhận X từ mẹ, Y từ bố. Nên gặp con trai bị bệnh do gen trên X là truy ngược lên MẸ, bố hoàn toàn vô can.');
    return MC(R, `Cho sơ đồ phả hệ về một bệnh do gen lặn nằm trên vùng không tương đồng của nhiễm sắc thể X quy định:${hinh}Người phụ nữ (6) có kiểu gen như thế nào?`,
      { d: 'Chắc chắn là XᴬXᵃ', s: ['Chắc chắn là XᴬXᴬ', 'Có thể là XᴬXᴬ hoặc XᴬXᵃ', 'Chắc chắn là XᵃXᵃ'],
        sv: { 'Chắc chắn là XᴬXᴬ': 'nếu vậy thì con trai (9) chỉ nhận được Xᴬ từ mẹ và không thể bị bệnh',
              'Có thể là XᴬXᴬ hoặc XᴬXᴬ hoặc XᴬXᵃ': 'không còn nghi ngờ nữa vì con trai bị bệnh đã chốt kiểu gen của mẹ',
              'Có thể là XᴬXᴬ hoặc XᴬXᵃ': 'con trai (9) bị bệnh đã loại hẳn khả năng XᴬXᴬ',
              'Chắc chắn là XᵃXᵃ': 'nếu vậy thì chính (6) đã bị bệnh, nhưng trên hình (6) bình thường' },
        v: `Con trai (9) bị bệnh nên có kiểu gen XᵃY. Con trai chỉ nhận Y từ bố và nhận X từ MẸ ⇒ Xᵃ chắc chắn đến từ mẹ (6).\n`
          + `Mà (6) không bị bệnh nên không thể là XᵃXᵃ ⇒ kiểu gen của (6) là XᴬXᵃ, tức người mang gen bệnh.` },
      'Nguyên tắc vàng của gen trên X: con trai nhận X từ MẸ và Y từ BỐ. Nên con trai bệnh thì truy ngược lên mẹ, không truy bố.');
  } }

]);

TD.GEN.dia = (TD.GEN.dia || []).concat([

/* --- Biểu đồ tròn: đọc cơ cấu --- */
{ ma: 'dia-hinh-tron', chuong: 'Kỹ năng', muc: 2, dang: 'mc',
  tao(R) {
    const nn = R.nguyen(8, 18), cn = R.nguyen(33, 42), dv = 100 - nn - cn;
    if (dv < 40 || dv > 58) return null;
    const hinh = TD.hinhTron([
      { ten: 'Nông – lâm – thuỷ sản', v: nn },
      { ten: 'Công nghiệp – xây dựng', v: cn },
      { ten: 'Dịch vụ', v: dv }
    ]);
    const hoi = R.chon(['lonNhat', 'chenh']);
    if (hoi === 'lonNhat') {
      const ds = [['Nông – lâm – thuỷ sản', nn], ['Công nghiệp – xây dựng', cn], ['Dịch vụ', dv]];
      const max = ds.slice().sort((a, b) => b[1] - a[1])[0][0];
      return MC(R, `Cho biểu đồ cơ cấu GDP phân theo khu vực kinh tế của nước ta:${hinh}Khu vực nào chiếm tỉ trọng lớn nhất?`,
        { d: max, s: ds.map(x => x[0]).filter(x => x !== max).concat(['Ba khu vực chiếm tỉ trọng ngang nhau']),
          v: `Đọc số phần trăm ghi trong chú giải: nông – lâm – thuỷ sản ${nn}%, công nghiệp – xây dựng ${cn}%, dịch vụ ${dv}%.\n`
            + `Lớn nhất là ${max}.` },
        'Đọc số trong chú giải chứ đừng ước lượng độ rộng hình quạt bằng mắt — hai phần chênh nhau vài phần trăm nhìn gần như nhau.');
    }
    const dungPA2 = S(dv - nn) + '%';
    const nhieu2 = baNhieu(dungPA2, [S(dv + nn) + '%', S(T(dv / nn, 1), 1) + '%', S(100 - dv) + '%', S(cn - nn) + '%', S(dv - cn) + '%']);
    if (!nhieu2) return null;
    return MC(R, `Cho biểu đồ cơ cấu GDP phân theo khu vực kinh tế của nước ta:${hinh}Tỉ trọng khu vực dịch vụ lớn hơn khu vực nông – lâm – thuỷ sản bao nhiêu phần trăm?`,
      { d: dungPA2, s: nhieu2,
        sv: { [S(dv + nn) + '%']: 'đây là tổng hai khu vực, không phải chênh lệch',
              [S(T(dv / nn, 1), 1) + '%']: 'đây là số LẦN, câu hỏi hỏi chênh bao nhiêu phần trăm',
              [S(100 - dv) + '%']: 'đây là tỉ trọng của hai khu vực còn lại cộng lại' },
        v: `Chênh lệch = ${dv}% − ${nn}% = ${S(dv - nn)}%.\n`
          + `Lưu ý: với biểu đồ cơ cấu, "lớn hơn bao nhiêu phần trăm" là lấy HIỆU hai tỉ trọng, còn "gấp bao nhiêu lần" mới lấy thương.` },
      'Ba cách hỏi hay bị lẫn: "lớn hơn bao nhiêu %" lấy hiệu · "gấp mấy lần" lấy thương · "tăng bao nhiêu %" lấy thương rồi trừ 100.');
  } }

]);
})();

/* Đánh dấu mọi mẫu trong file này là mẫu CÓ HÌNH, để bộ dựng đề cấp phát
   chỗ riêng cho chúng thay vì thả chung rổ rồi hi vọng bốc trúng. */
(function () {
  const MA_HINH = ['toan-hinh-dothi3', 'toan-hinh-bbt', 'toan-hinh-dothi4', 'toan-hinh-tiemcan',
                   'sinh-hinh-phahe', 'sinh-hinh-phahe-x', 'hoa-hinh-kettua', 'hoa-hinh-co2',
                   'dia-hinh-cot', 'dia-hinh-tron', 'ly-hinh-mach', 'ly-hinh-pv'];
  for (const mon of Object.keys(TD.GEN))
    for (const t of TD.GEN[mon]) if (MA_HINH.indexOf(t.ma) >= 0) t._hinh = true;
})();
