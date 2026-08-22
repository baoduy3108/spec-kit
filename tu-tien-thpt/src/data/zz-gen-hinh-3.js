/* ============================================================
   CÂU HỎI CÓ HÌNH — ĐỢT 3: NỐT NHỮNG DẠNG CÒN THIẾU
   Tám dạng hình mà đề thật có nhưng app còn trống hẳn: hệ trục
   Oxyz, miền phẳng giới hạn bởi đồ thị, đường sức từ, bộ dụng cụ
   thí nghiệm, đường chuẩn độ pH, nhân đôi – phiên mã – dịch mã, và
   đột biến cấu trúc nhiễm sắc thể.
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
   TOÁN — HỆ TRỤC Oxyz VÀ MIỀN PHẲNG
   ============================================================ */
TD.GEN.toan = (TD.GEN.toan || []).concat([

{ ma: 'toan-hinh-oxyz', chuong: 'Oxyz', muc: 2, dang: 'mc',
  tao(R) {
    const a = R.nguyen(1, 3), b = R.nguyen(2, 4), c = R.nguyen(1, 3);
    const hinh = TD.hinhOxyz(null, { a: a, b: b, c: c });
    const hoi = R.chon(['toaDo', 'vecto']);
    if (hoi === 'toaDo') {
      const bo = t => `(${t.join('; ')})`;
      const dung = bo([a, b, c]);
      const nhieu = baNhieu(dung, [bo([b, a, c]), bo([a, c, b]), bo([c, b, a]), bo([a, b, 0]), bo([0, b, c])]);
      if (!nhieu) return null;
      return MC(R, `Trong không gian Oxyz cho hình hộp chữ nhật OABC.O′A′B′C′ có OA = ${a} nằm trên tia Ox, `
        + `OC = ${b} nằm trên tia Oy và OO′ = ${c} nằm trên tia Oz (như hình vẽ).${hinh}Toạ độ của điểm B′ là gì?`,
        { d: dung, s: nhieu,
          sv: { [bo([b, a, c])]: 'đảo hoành độ với tung độ — OA nằm trên Ox nên hoành độ phải là ' + a,
                [bo([a, b, 0])]: 'đây là toạ độ điểm B nằm trên mặt đáy, chưa nâng lên độ cao ' + c,
                [bo([0, b, c])]: 'đây là toạ độ điểm C′, thiếu phần trên trục Ox' },
          v: `B′ là đỉnh đối diện với O qua tâm hình hộp, nên cả ba toạ độ đều khác 0.\n`
            + `· Hình chiếu trên Ox bằng OA = ${a}\n· Hình chiếu trên Oy bằng OC = ${b}\n· Hình chiếu trên Oz bằng OO′ = ${c}\n`
            + `Vậy B′${dung}.` },
        'Toạ độ một đỉnh của hình hộp đặt tại gốc O chính là ba kích thước theo đúng thứ tự Ox, Oy, Oz. '
        + 'Đỉnh nào nằm trên mặt đáy thì cao độ z bằng 0, đỉnh nào nằm trên mặt bên chứa O thì có một toạ độ bằng 0.');
    }
    const bo = t => `(${t.join('; ')})`;
    const dung = bo([-a, b, c]);
    const nhieu = baNhieu(dung, [bo([a, b, c]), bo([a, -b, c]), bo([-a, -b, -c]), bo([b, -a, c])]);
    if (!nhieu) return null;
    return MC(R, `Trong không gian Oxyz cho hình hộp chữ nhật OABC.O′A′B′C′ như hình vẽ, với OA = ${a} trên tia Ox, `
      + `OC = ${b} trên tia Oy, OO′ = ${c} trên tia Oz.${hinh}Toạ độ của vectơ AC′ là gì?`,
      { d: dung, s: nhieu,
        sv: { [bo([a, b, c])]: 'đây là vectơ OB′, không phải AC′',
              [bo([-a, -b, -c])]: 'sai dấu hai toạ độ sau: C′ có tung độ và cao độ DƯƠNG' },
        v: `Xác định toạ độ hai đầu mút trước:\n· A(${a}; 0; 0) vì A nằm trên tia Ox\n· C′(0; ${b}; ${c}) vì C′ nằm trên mặt phẳng Oyz\n`
          + `AC′ = (x_C′ − x_A; y_C′ − y_A; z_C′ − z_A) = (0 − ${a}; ${b} − 0; ${c} − 0) = ${dung}.` },
      'Vectơ luôn là ĐIỂM NGỌN trừ ĐIỂM GỐC. Với hình hộp đặt ở gốc toạ độ, cứ đọc từng đỉnh ra toạ độ trước rồi mới trừ, đừng nhẩm tắt.');
  } },

{ ma: 'toan-hinh-dientich', chuong: 'Ứng dụng tích phân', muc: 4, dang: 'tln',
  tao(R) {
    /* miền giữa parabol y = k − a(x − m)² và đường thẳng y = n */
    const a = R.chon([1, 2]), m = R.nguyen(0, 2), r = R.nguyen(1, 3);
    const n = R.nguyen(0, 3);
    const k = n + a * r * r;                        /* hai giao điểm tại m ± r */
    const f = x => k - a * (x - m) * (x - m);
    const g = () => n;
    const tu = m - r, den = m + r;
    const dt = T(4 * a * r * r * r / 3, 4);         /* ∫(f − g) = 4ar³/3 */
    const hinh = TD.hinhMienPhang(f, g, tu, den,
      { xMin: tu - 1.6, xMax: den + 1.6, yMin: Math.min(0, n) - 1, yMax: k + 1.6 });
    return {
      q: `Tính diện tích hình phẳng được tô đậm trong hình vẽ, giới hạn bởi parabol `
        + `y = ${TD.daThuc([[-a, '(x − ' + TD.so(m) + ')²']])} + ${TD.so(k)} và đường thẳng y = ${TD.so(n)}.${hinh}`
        + `(làm tròn đến hàng phần trăm)`,
      ans: D(dt, 2),
      giai: `Bước 1 — đọc hình: miền tô nằm giữa parabol (đường cong) ở TRÊN và đường thẳng ở DƯỚI, `
        + `hai cận là hoành độ hai giao điểm, trên hình là x = ${TD.so(tu)} và x = ${TD.so(den)}.\n`
        + `Bước 2 — tìm cận bằng cách giải phương trình hoành độ giao điểm:\n`
        + `  ${TD.so(k)} − ${TD.so(a)}(x − ${TD.so(m)})² = ${TD.so(n)} ⇔ (x − ${TD.so(m)})² = ${TD.so(r * r)} ⇔ x = ${TD.so(tu)} hoặc x = ${TD.so(den)}.\n`
        + `Bước 3 — công thức diện tích: S = ∫ từ ${TD.so(tu)} đến ${TD.so(den)} của |f(x) − g(x)| dx.\n`
        + `  Vì trên đoạn này parabol nằm TRÊN đường thẳng nên bỏ được dấu giá trị tuyệt đối:\n`
        + `  f(x) − g(x) = ${TD.so(a * r * r)} − ${TD.so(a)}(x − ${TD.so(m)})²\n`
        + `Bước 4 — tính tích phân:\n`
        + `  S = 4·${TD.so(a)}·${TD.so(r)}³/3 = ${D(dt, 2)}.`,
      meo: 'Nhìn hình để biết đường nào nằm TRÊN rồi lấy trên trừ dưới — làm vậy thì bỏ được dấu giá trị tuyệt đối. '
        + 'Nếu hai đồ thị cắt nhau nhiều lần thì phải chia đoạn, mỗi đoạn xét lại xem đường nào ở trên.'
    };
  } }

]);

/* ============================================================
   LÝ — ĐƯỜNG SỨC TỪ
   ============================================================ */
TD.GEN.ly = (TD.GEN.ly || []).concat([

{ ma: 'ly-hinh-tutruong', chuong: 'Từ trường', muc: 2, dang: 'mc',
  tao(R) {
    const kieu = R.chon(['namcham', 'daythang', 'ongday']);
    const hinh = TD.hinhTuTruong(kieu);
    if (kieu === 'namcham')
      return MC(R, `Hình vẽ mô tả đường sức từ của một nam châm thẳng.${hinh}Phát biểu nào sau đây đúng?`,
        { d: 'Bên ngoài nam châm, đường sức từ đi ra từ cực Bắc và đi vào cực Nam',
          s: ['Bên ngoài nam châm, đường sức từ đi ra từ cực Nam và đi vào cực Bắc',
              'Đường sức từ xuất phát từ cực Bắc rồi kết thúc lơ lửng trong không gian',
              'Hai đường sức từ có thể cắt nhau tại điểm nằm giữa hai cực'],
          sv: { 'Bên ngoài nam châm, đường sức từ đi ra từ cực Nam và đi vào cực Bắc': 'ngược chiều mũi tên trên hình',
                'Đường sức từ xuất phát từ cực Bắc rồi kết thúc lơ lửng trong không gian': 'đường sức từ luôn KHÉP KÍN, đi vào cực Nam rồi xuyên qua lòng nam châm về cực Bắc',
                'Hai đường sức từ có thể cắt nhau tại điểm nằm giữa hai cực': 'nếu cắt nhau thì tại giao điểm có hai hướng của B, vô lí — đường sức từ không bao giờ cắt nhau' },
          v: `Nhìn chiều mũi tên trên hình: các đường sức đi RA từ đầu N (cực Bắc), vòng ra ngoài rồi đi VÀO đầu S (cực Nam).\n`
            + `Trong lòng nam châm, chúng tiếp tục đi từ S sang N để khép kín — đó là lí do đường sức từ luôn là đường cong khép kín, khác hẳn đường sức điện.` },
        'Ba tính chất phải nhớ: ① đường sức từ luôn KHÉP KÍN ② bên ngoài nam châm đi từ N sang S, bên trong thì ngược lại '
        + '③ không bao giờ cắt nhau, và chỗ nào dày hơn thì từ trường mạnh hơn.');
    if (kieu === 'daythang')
      return MC(R, `Hình vẽ mô tả đường sức từ của dòng điện chạy trong dây dẫn thẳng dài (mũi tên trên dây là chiều dòng điện).${hinh}Đường sức từ trong trường hợp này có dạng gì?`,
        { d: 'Những đường tròn đồng tâm nằm trong mặt phẳng vuông góc với dây, tâm nằm trên dây',
          s: ['Những đường thẳng song song với dây dẫn',
              'Những đường tròn có tâm nằm ngoài dây dẫn',
              'Những đường thẳng hướng thẳng ra xa dây theo mọi phía'],
          sv: { 'Những đường thẳng song song với dây dẫn': 'đó là dạng đường sức trong lòng ống dây, không phải quanh dây thẳng',
                'Những đường tròn có tâm nằm ngoài dây dẫn': 'tâm của các đường tròn luôn nằm ĐÚNG trên dây dẫn',
                'Những đường thẳng hướng thẳng ra xa dây theo mọi phía': 'đó là dạng đường sức ĐIỆN của điện tích điểm, không phải từ trường' },
          v: `Trên hình, các đường sức là những đường tròn bao quanh dây, tâm nằm trên dây và mặt phẳng chứa chúng vuông góc với dây.\n`
            + `Chiều xác định bằng quy tắc nắm tay phải: ngón cái chỉ chiều dòng điện, bốn ngón còn lại khum theo chiều đường sức.\n`
            + `Độ lớn cảm ứng từ: B = 2·10⁻⁷·I/r — càng xa dây thì càng yếu, nên trên hình các vòng ngoài thưa hơn.` },
        'Quy tắc nắm tay phải cho dây thẳng: ngón CÁI theo chiều dòng điện, bốn ngón khum lại chỉ chiều đường sức. '
        + 'Với ống dây thì ngược lại — bốn ngón theo chiều dòng điện, ngón cái chỉ chiều B trong lòng ống.');
    return MC(R, `Hình vẽ mô tả từ trường bên trong một ống dây có dòng điện chạy qua.${hinh}Từ trường trong lòng ống dây có đặc điểm gì?`,
      { d: 'Là từ trường đều, các đường sức song song và cách đều nhau',
        s: ['Từ trường mạnh nhất ở sát thành ống và yếu dần vào giữa',
            'Các đường sức là những đường tròn đồng tâm quanh trục ống',
            'Từ trường bên trong bằng không, chỉ tồn tại bên ngoài ống'],
        sv: { 'Từ trường mạnh nhất ở sát thành ống và yếu dần vào giữa': 'trong lòng ống dây dài, cảm ứng từ gần như như nhau ở mọi điểm',
              'Các đường sức là những đường tròn đồng tâm quanh trục ống': 'đó là dạng đường sức của DÂY THẲNG, không phải trong lòng ống dây',
              'Từ trường bên trong bằng không, chỉ tồn tại bên ngoài ống': 'ngược lại — trong lòng ống dây từ trường mạnh và đều, bên ngoài mới yếu' },
        v: `Trên hình, các đường sức trong lòng ống là những đường thẳng song song và cách đều — đó chính là dấu hiệu của TỪ TRƯỜNG ĐỀU.\n`
          + `Cảm ứng từ trong lòng ống dây: B = 4π·10⁻⁷·n·I với n là số vòng dây trên một mét chiều dài.` },
      'Từ trường ĐỀU là từ trường có đường sức song song, cùng chiều và cách đều nhau. '
      + 'Hai nơi tạo được từ trường đều trong chương trình: lòng ống dây dài có dòng điện và khoảng giữa hai cực của nam châm chữ U.');
  } }

]);

/* ============================================================
   HOÁ — DỤNG CỤ THÍ NGHIỆM VÀ CHUẨN ĐỘ
   ============================================================ */
TD.GEN.hoa = (TD.GEN.hoa || []).concat([

{ ma: 'hoa-hinh-thunghiem', chuong: 'Phi kim – Vô cơ', muc: 3, dang: 'mc',
  tao(R) {
    const ds = [
      { khi: 'O₂', M: 32, tan: false, cach: 'daynuoc',
        v: 'O₂ tan rất ít trong nước nên thu được bằng cách đẩy nước; cách này còn cho khí sạch hơn vì hơi nước cuốn theo tạp chất tan.' },
      { khi: 'H₂', M: 2, tan: false, cach: 'daynuoc',
        v: 'H₂ hầu như không tan trong nước nên thu bằng cách đẩy nước. Nếu thu bằng đẩy không khí thì phải ÚP NGƯỢC bình vì H₂ nhẹ hơn không khí rất nhiều.' },
      { khi: 'CO₂', M: 44, tan: true, cach: 'xuoi',
        v: 'CO₂ tan được trong nước nên không thu bằng đẩy nước. M = 44 > 29 nên nặng hơn không khí, phải đặt ĐỨNG bình để khí chìm xuống đáy.' },
      { khi: 'NH₃', M: 17, tan: true, cach: 'nguoc',
        v: 'NH₃ tan rất nhiều trong nước (1 lít nước hoà tan tới hàng trăm lít khí) nên tuyệt đối không thu bằng đẩy nước. M = 17 < 29 nên nhẹ hơn không khí, phải ÚP NGƯỢC bình.' },
      { khi: 'HCl', M: 36.5, tan: true, cach: 'xuoi',
        v: 'HCl tan rất mạnh trong nước nên không thu bằng đẩy nước. M = 36,5 > 29 nên nặng hơn không khí, đặt đứng bình.' },
      { khi: 'Cl₂', M: 71, tan: true, cach: 'xuoi',
        v: 'Cl₂ tan được trong nước và còn phản ứng với nước. M = 71 > 29 nên nặng hơn không khí, thu bằng cách đẩy không khí với bình đặt đứng.' }
    ];
    const it = R.chon(ds);
    const hinh = TD.hinhThiNghiem(it.cach, it.khi);
    const dung = it.cach === 'daynuoc' ? 'Đẩy nước'
      : it.cach === 'nguoc' ? 'Đẩy không khí, úp ngược bình' : 'Đẩy không khí, đặt đứng bình';
    return MC(R, `Hình vẽ mô tả bộ dụng cụ điều chế và thu khí <b>${it.khi}</b> trong phòng thí nghiệm.${hinh}`
      + `Vì sao khí ${it.khi} được thu theo cách như hình vẽ?`,
      { d: dung === 'Đẩy nước'
            ? `Vì ${it.khi} tan rất ít trong nước`
            : (it.M > 29 ? `Vì ${it.khi} nặng hơn không khí và tan được trong nước` : `Vì ${it.khi} nhẹ hơn không khí và tan nhiều trong nước`),
        s: baNhieu(dung === 'Đẩy nước'
            ? `Vì ${it.khi} tan rất ít trong nước`
            : (it.M > 29 ? `Vì ${it.khi} nặng hơn không khí và tan được trong nước` : `Vì ${it.khi} nhẹ hơn không khí và tan nhiều trong nước`),
          [`Vì ${it.khi} tan rất ít trong nước`,
           `Vì ${it.khi} nặng hơn không khí và tan được trong nước`,
           `Vì ${it.khi} nhẹ hơn không khí và tan nhiều trong nước`,
           `Vì ${it.khi} phản ứng mạnh với thuỷ tinh nên phải dùng bình kín`,
           `Vì ${it.khi} chỉ tồn tại ở nhiệt độ rất thấp`]) || [],
        v: `${it.v}\n\nHai câu hỏi quyết định cách thu khí:\n`
          + `① Khí có tan trong nước không? Không tan ⇒ thu bằng ĐẨY NƯỚC (sạch nhất).\n`
          + `② Nếu tan thì so phân tử khối với 29 (khối lượng mol trung bình của không khí): nặng hơn ⇒ đặt ĐỨNG bình, nhẹ hơn ⇒ ÚP NGƯỢC bình.\n`
          + `Ở đây M(${it.khi}) = ${S(it.M)} ${it.M > 29 ? '> 29 nên nặng hơn không khí' : '< 29 nên nhẹ hơn không khí'}.` },
      'Con số 29 là mốc phải thuộc — đó là khối lượng mol trung bình của không khí. '
      + 'Nhóm khí nhẹ hơn 29 hay hỏi: H₂ (2), He (4), CH₄ (16), NH₃ (17), N₂ (28) — mấy khí này thu bằng cách úp ngược bình.');
  } },

{ ma: 'hoa-hinh-chuando', chuong: 'Phi kim – Vô cơ', muc: 4, dang: 'tln',
  tao(R) {
    const Cb = R.chon([0.05, 0.1, 0.2]);            /* nồng độ NaOH chuẩn */
    const Va = R.chon([10, 20, 25]);                /* thể tích acid lấy để chuẩn độ */
    const Vb = R.nguyen(8, 30);                     /* thể tích tại điểm tương đương */
    const Ca = T(Cb * Vb / Va, 4);
    if (Ca < 0.01 || Ca > 0.6) return null;
    const hinh = TD.hinhChuanDo(1.5, 7, Vb);
    return {
      q: `Chuẩn độ ${Va} mL dung dịch HCl chưa biết nồng độ bằng dung dịch NaOH ${S(Cb, 2)} M. `
        + `Đường chuẩn độ thu được như hình vẽ.${hinh}`
        + `Dựa vào đồ thị, xác định nồng độ mol của dung dịch HCl. (làm tròn đến hàng phần nghìn)`,
      ans: D(Ca, 3),
      giai: `Bước 1 — đọc hình: pH tăng vọt tại thời điểm thêm ${S(Vb)} mL NaOH, đó là ĐIỂM TƯƠNG ĐƯƠNG. `
        + `Với phản ứng acid mạnh và base mạnh, điểm tương đương có pH = 7.\n`
        + `Bước 2 — tại điểm tương đương, số mol acid và base phản ứng vừa hết nhau theo tỉ lệ 1 : 1:\n`
        + `  HCl + NaOH → NaCl + H₂O\n  n(HCl) = n(NaOH)\n`
        + `Bước 3 — tính số mol NaOH đã dùng:\n`
        + `  n(NaOH) = ${S(Cb, 2)} × ${S(Vb / 1000, 4)} = ${S(T(Cb * Vb / 1000, 5), 5)} mol\n`
        + `Bước 4 — suy ra nồng độ acid:\n`
        + `  C(HCl) = n/V = ${S(T(Cb * Vb / 1000, 5), 5)}/${S(Va / 1000, 4)} = ${D(Ca, 3)} M.\n`
        + `Bước 5 — có thể dùng thẳng công thức rút gọn cho tỉ lệ 1 : 1: C_a·V_a = C_b·V_b.`,
      meo: 'Điểm tương đương là chỗ đồ thị DỰNG ĐỨNG, đọc hoành độ tại đó chứ đừng đọc chỗ pH = 7 nếu acid hoặc base yếu. '
        + 'Acid mạnh + base mạnh thì điểm tương đương ở pH = 7; acid yếu + base mạnh thì pH > 7; acid mạnh + base yếu thì pH < 7.'
    };
  } }

]);

/* ============================================================
   SINH — CƠ CHẾ PHÂN TỬ VÀ ĐỘT BIẾN NST
   ============================================================ */
TD.GEN.sinh = (TD.GEN.sinh || []).concat([

{ ma: 'sinh-hinh-cochephantu', chuong: 'Di truyền phân tử', muc: 3, dang: 'mc',
  tao(R) {
    const kieu = R.chon(['nhandoi', 'phienma', 'dichma']);
    const hinh = TD.hinhDNA(kieu);
    if (kieu === 'nhandoi')
      return MC(R, `Hình vẽ mô tả một chạc chữ Y trong quá trình nhân đôi DNA.${hinh}Vì sao một mạch mới được tổng hợp liên tục còn mạch kia lại tổng hợp thành từng đoạn ngắn?`,
        { d: 'Vì enzyme DNA polymerase chỉ tổng hợp mạch mới theo chiều 5′ → 3′, mà hai mạch khuôn ngược chiều nhau',
          s: ['Vì hai mạch khuôn có số lượng nuclêôtit khác nhau',
              'Vì chỉ một mạch khuôn mang thông tin di truyền, mạch kia thì không',
              'Vì enzyme DNA polymerase hoạt động lúc nhanh lúc chậm một cách ngẫu nhiên'],
          sv: { 'Vì hai mạch khuôn có số lượng nuclêôtit khác nhau': 'hai mạch của DNA luôn dài bằng nhau vì liên kết bổ sung từng cặp',
                'Vì chỉ một mạch khuôn mang thông tin di truyền, mạch kia thì không': 'trong nhân đôi, CẢ HAI mạch đều làm khuôn; chuyện chỉ một mạch làm khuôn là ở PHIÊN MÃ',
                'Vì enzyme DNA polymerase hoạt động lúc nhanh lúc chậm một cách ngẫu nhiên': 'đây không phải hiện tượng ngẫu nhiên mà là hệ quả tất yếu của chiều tổng hợp' },
          v: `Hai mạch của DNA ngược chiều nhau (một mạch 3′ → 5′, mạch kia 5′ → 3′), trong khi DNA polymerase CHỈ có thể kéo dài mạch mới theo chiều 5′ → 3′.\n`
            + `· Trên mạch khuôn 3′ → 5′: chiều tổng hợp trùng với chiều chạc mở ra ⇒ mạch mới được kéo dài LIÊN TỤC.\n`
            + `· Trên mạch khuôn còn lại: chiều tổng hợp ngược với chiều chạc mở ⇒ phải tổng hợp thành từng đoạn ngắn (đoạn Okazaki), sau đó enzyme ligase nối lại.` },
        'Mọi thắc mắc về mạch liên tục và mạch gián đoạn đều quy về một câu: DNA polymerase chỉ chạy được theo chiều 5′ → 3′. '
        + 'Nhớ thêm hai enzyme: ligase nối các đoạn Okazaki, còn helicase mới là enzyme tháo xoắn.');
    if (kieu === 'phienma')
      return MC(R, `Hình vẽ mô tả quá trình phiên mã ở sinh vật nhân sơ.${hinh}Phát biểu nào sau đây đúng về quá trình này?`,
        { d: 'Chỉ mạch có chiều 3′ → 5′ được dùng làm mạch mã gốc, phân tử RNA được tổng hợp theo chiều 5′ → 3′',
          s: ['Cả hai mạch của gen đều được dùng làm khuôn để tổng hợp RNA',
              'Phân tử RNA được tổng hợp theo chiều 3′ → 5′',
              'Enzyme DNA polymerase là enzyme trực tiếp tổng hợp phân tử RNA'],
          sv: { 'Cả hai mạch của gen đều được dùng làm khuôn để tổng hợp RNA': 'chuyện cả hai mạch làm khuôn là ở NHÂN ĐÔI; phiên mã chỉ dùng một mạch mã gốc',
                'Phân tử RNA được tổng hợp theo chiều 3′ → 5′': 'ngược chiều — mọi mạch axit nuclêic mới đều được kéo dài theo chiều 5′ → 3′',
                'Enzyme DNA polymerase là enzyme trực tiếp tổng hợp phân tử RNA': 'enzyme của phiên mã là RNA polymerase, nó vừa tháo xoắn vừa tổng hợp' },
          v: `Trên hình, RNA polymerase trượt dọc mạch mã gốc có chiều 3′ → 5′ và tổng hợp phân tử mRNA theo chiều 5′ → 3′.\n`
            + `Mạch còn lại gọi là mạch bổ sung, có trình tự giống hệt mRNA (chỉ khác T thay bằng U) nên KHÔNG dùng làm khuôn.` },
        'Nhớ cặp đối lập: nhân đôi dùng CẢ HAI mạch làm khuôn, phiên mã chỉ dùng MỘT. '
        + 'Trình tự mRNA giống mạch BỔ SUNG (chỉ đổi T thành U) chứ không giống mạch mã gốc — đây là chỗ hay nhầm khi đề cho một mạch rồi bắt viết mRNA.');
    return MC(R, `Hình vẽ mô tả quá trình dịch mã trên phân tử mRNA.${hinh}Chuỗi pôlipeptit hoàn chỉnh do phân tử mRNA này tổng hợp có bao nhiêu axit amin?`,
      { d: '3', s: ['2', '4', '5'],
        sv: { '2': 'trừ nhầm hai lần: bộ ba kết thúc vốn đã không mã hoá axit amin nào, chỉ trừ thêm axit amin mở đầu',
              '4': 'chưa cắt bỏ axit amin mở đầu — đó mới là chuỗi SƠ KHAI',
              '5': 'đây là tổng số bộ ba trên mRNA, kể cả bộ ba kết thúc' },
        v: `Đếm trên hình: mRNA có 5 bộ ba là AUG · GXU · AAA · XGU · UAA.\n`
          + `· Bộ ba UAA ở cuối là bộ ba KẾT THÚC, không mã hoá axit amin nào ⇒ còn 4 bộ ba mã hoá.\n`
          + `· Chuỗi pôlipeptit SƠ KHAI có 4 axit amin.\n`
          + `· Chuỗi HOÀN CHỈNH bị cắt bỏ axit amin mở đầu (do AUG mã hoá) ⇒ còn 3 axit amin.` },
      'Ba con số phải phân biệt: số bộ ba trên mRNA · số axit amin của chuỗi SƠ KHAI (trừ 1 bộ ba kết thúc) · '
      + 'số axit amin của chuỗi HOÀN CHỈNH (trừ tiếp axit amin mở đầu). Đề hỏi cái nào phải đọc kĩ.');
  } },

{ ma: 'sinh-hinh-dotbien-nst', chuong: 'Di truyền NST', muc: 3, dang: 'mc',
  tao(R) {
    const ds = [
      { goc: ['A', 'B', 'C', 'D', 'E'], sau: ['A', 'B', 'D', 'E', '·'], ten: 'Mất đoạn C',
        d: 'Mất đoạn', v: 'Đoạn C biến mất khỏi nhiễm sắc thể, chiều dài nhiễm sắc thể ngắn lại.',
        hq: 'Mất đoạn thường gây hậu quả nặng nhất vì làm giảm số lượng gen, ở người gây hội chứng tiếng mèo kêu (mất đoạn NST số 5).' },
      { goc: ['A', 'B', 'C', 'D', 'E'], sau: ['A', 'B', 'C', 'C', 'D'], ten: 'Lặp đoạn C',
        d: 'Lặp đoạn', v: 'Đoạn C xuất hiện hai lần liên tiếp, nhiễm sắc thể dài thêm ra.',
        hq: 'Lặp đoạn làm tăng số bản sao của gen, thường ít gây hại hơn mất đoạn và là nguyên liệu quan trọng cho tiến hoá vì tạo ra gen mới.' },
      { goc: ['A', 'B', 'C', 'D', 'E'], sau: ['A', 'D', 'C', 'B', 'E'], ten: 'Đảo đoạn BCD',
        d: 'Đảo đoạn', v: 'Đoạn BCD bị đứt ra, quay ngược 180° rồi nối lại nên thứ tự thành DCB.',
        hq: 'Đảo đoạn không làm thay đổi số lượng gen mà chỉ đổi VỊ TRÍ, nên thường ít ảnh hưởng tới sức sống; nó góp phần cách li sinh sản và hình thành loài mới.' },
      { goc: ['A', 'B', 'C', 'D', 'E'], sau: ['A', 'B', 'M', 'N', 'E'], ten: 'Chuyển đoạn',
        d: 'Chuyển đoạn', v: 'Đoạn CD được thay bằng đoạn MN vốn thuộc một nhiễm sắc thể khác.',
        hq: 'Chuyển đoạn làm thay đổi nhóm gen liên kết, thường làm giảm khả năng sinh sản; ở người chuyển đoạn giữa NST 22 và 9 gây bệnh ung thư máu ác tính.' }
    ];
    const it = R.chon(ds);
    const hinh = TD.hinhNST(it.goc, it.sau, '');
    return MC(R, `Hình vẽ mô tả một nhiễm sắc thể trước và sau khi xảy ra đột biến (mỗi ô là một đoạn mang gen).${hinh}Đây là dạng đột biến cấu trúc nhiễm sắc thể nào?`,
      { d: it.d, s: baNhieu(it.d, ds.map(x => x.d).concat(['Đột biến lệch bội', 'Đột biến đa bội'])) || [],
        sv: Object.fromEntries(ds.filter(x => x.d !== it.d).map(x => [x.d, `dạng đó phải cho kết quả kiểu ${x.sau.filter(c => c !== '·').join('')}, không khớp với hình`])
          .concat([['Đột biến lệch bội', 'lệch bội là thay đổi SỐ LƯỢNG nhiễm sắc thể, không phải cấu trúc bên trong một nhiễm sắc thể'],
                   ['Đột biến đa bội', 'đa bội là tăng nguyên lần bộ nhiễm sắc thể, cũng thuộc nhóm số lượng chứ không phải cấu trúc']])),
        v: `So hai hàng trên hình: ${it.goc.join('')} → ${it.sau.filter(c => c !== '·').join('')}.\n`
          + `${it.v}\n\n${it.hq}` },
      'Bốn dạng đột biến cấu trúc nhận ra bằng cách so trình tự trước và sau: '
      + 'thiếu hẳn một đoạn ⇒ MẤT · một đoạn xuất hiện hai lần ⇒ LẶP · một đoạn quay ngược thứ tự ⇒ ĐẢO · xuất hiện đoạn lạ từ NST khác ⇒ CHUYỂN.');
  } }

]);

/* Đánh dấu mẫu có hình */
(function () {
  const MA = ['toan-hinh-oxyz', 'toan-hinh-dientich', 'ly-hinh-tutruong',
              'hoa-hinh-thunghiem', 'hoa-hinh-chuando',
              'sinh-hinh-cochephantu', 'sinh-hinh-dotbien-nst'];
  for (const mon of Object.keys(TD.GEN))
    for (const t of TD.GEN[mon]) if (MA.indexOf(t.ma) >= 0) t._hinh = true;
})();
})();
