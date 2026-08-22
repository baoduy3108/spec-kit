/* ============================================================
   SỬ · ĐỊA · GDKT&PL · VĂN · ANH — MẪU ĐỀ BÀI TẬP TỰ SINH
   Khối xã hội vẫn có "bài tập": Địa tính toán từ bảng số liệu,
   GDKT tính thuế – lãi – chỉ tiêu kinh tế, Sử xử lí mốc thời gian,
   Văn nhận diện trên ngữ liệu, Anh là bài tập ngữ pháp.
   Nhờ vậy Tà Đạo bản BÀI TẬP mở được cho cả 9 môn.
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {};

(function () {
const S = TD.soVN;
const T = TD.lamTron;
const D = TD.dapSo;

/* Khuôn trắc nghiệm 1 đúng + 3 nhiễu riêng của từng câu */
/* Khuôn trắc nghiệm khối xã hội.
   Lời giải phải nêu CẢ phương án đúng lẫn lí do loại từng phương án còn lại —
   câu vận dụng cao mà chỉ ghi "đáp án là A" thì học sinh không học được gì.
   it.sv (nếu có) là lí do riêng cho từng phương án nhiễu. */
const MC = (R, de, it, meo) => {
  const opts = TD.xaoR(R, [it.d].concat(it.s));
  const loai = TD.khoiLoai(opts, it.d, it.sv, 'không phù hợp với dữ kiện đề đưa ra.');
  return { q: de, opts: opts, ans: opts.indexOf(it.d),
    giai: `Đáp án đúng: ${it.d}\n${it.v}\n\nVì sao các phương án còn lại bị loại:\n${loai}`,
    meo: meo };
};

/* ==========================================================
   ĐỊA LÍ — tính toán từ bảng số liệu
   ========================================================== */
TD.GEN.dia = (TD.GEN.dia || []).concat([

{ ma: 'dia-matdo', chuong: 'Dân cư', muc: 2, dang: 'tln', duong: true,
  tao(R) {
    /* Không gắn số liệu tự sinh vào tên vùng có thật — học sinh sẽ nhớ nhầm
       số liệu sai. Dùng cách nói phiếm chỉ đúng như đề thi vẫn ra. */
    const v = { t: R.chon(['Một vùng kinh tế', 'Một tỉnh', 'Một thành phố trực thuộc trung ương',
                           'Một địa phương', 'Một quốc gia']), dt: R.nguyen(200, 9600) * 10 };
    const dan = R.nguyen(15, 220) / 10;                 /* triệu người */
    const md = T(dan * 1e6 / v.dt, 0);
    return {
      q: `${v.t} có diện tích ${S(v.dt)} km² và số dân ${S(dan, 1)} triệu người. `
        + `Tính mật độ dân số (người/km², làm tròn đến hàng đơn vị).`,
      ans: D(md, 0),
      giai: `Mật độ dân số = Số dân ÷ Diện tích\n`
        + `= ${S(dan, 1)}·10⁶ ÷ ${S(v.dt)} = ${D(md, 0)} người/km².`,
      meo: 'Nhớ đổi "triệu người" ra người trước khi chia. Mật độ cả nước hiện khoảng 300 người/km² — '
        + 'ra số lệch xa quá thì phải soát lại đơn vị.'
    };
  } },

{ ma: 'dia-giatang', chuong: 'Dân cư', muc: 2, dang: 'tln', duong: true,
  tao(R) {
    const sinh = R.nguyen(120, 220) / 10, tu = R.nguyen(50, 90) / 10;   /* ‰ */
    const gt = T((sinh - tu) / 10, 2);
    return {
      q: `Một địa phương có tỉ suất sinh thô ${S(sinh, 1)}‰ và tỉ suất tử thô ${S(tu, 1)}‰. `
        + `Tỉ lệ gia tăng dân số tự nhiên của địa phương đó là bao nhiêu phần trăm? `
        + `(làm tròn đến hàng phần trăm)`,
      ans: D(gt, 2),
      giai: `Tỉ lệ gia tăng tự nhiên (%) = (Tỉ suất sinh − Tỉ suất tử) ÷ 10\n`
        + `= (${S(sinh, 1)} − ${S(tu, 1)}) ÷ 10 = ${D(gt, 2)}%.`,
      meo: 'Hai tỉ suất cho theo ‰ (phần nghìn) mà đề hỏi % (phần trăm) nên phải CHIA 10. '
        + 'Quên bước này là lệch đúng 10 lần.'
    };
  } },

{ ma: 'dia-nangsuat', chuong: 'Ngành kinh tế', muc: 2, dang: 'tln', duong: true,
  tao(R) {
    const cay = R.chon(['lúa cả năm', 'ngô', 'cà phê nhân', 'cao su', 'mía']);
    const dt = R.nguyen(200, 7500) / 10;             /* nghìn ha */
    const sl = T(dt * R.nguyen(20, 80) / 10, 1);     /* nghìn tấn */
    const ns = T(sl * 10000 / (dt * 1000), 2);       /* tạ/ha */
    return {
      q: `Diện tích gieo trồng ${cay} của một tỉnh là ${S(dt, 1)} nghìn ha, sản lượng đạt `
        + `${S(sl, 1)} nghìn tấn. Năng suất ${cay} của tỉnh là bao nhiêu tạ/ha? `
        + `(làm tròn đến hàng phần trăm)`,
      ans: D(ns, 2),
      giai: `Năng suất = Sản lượng ÷ Diện tích\n`
        + `1 nghìn tấn = 10 000 tạ; 1 nghìn ha = 1 000 ha\n`
        + `= (${S(sl, 1)} × 10 000) ÷ (${S(dt, 1)} × 1 000) = ${D(ns, 2)} tạ/ha.`,
      meo: 'Năng suất lúa cả năm của nước ta hiện khoảng 60 tạ/ha. Kết quả ra vài trăm hay vài phần mười '
        + 'là chắc chắn sai đơn vị.'
    };
  } },

{ ma: 'dia-binhquan', chuong: 'Ngành kinh tế', muc: 2, dang: 'tln', duong: true,
  tao(R) {
    const sl = R.nguyen(200, 500) / 10;      /* triệu tấn lương thực */
    const dan = R.nguyen(850, 1050) / 10;    /* triệu người */
    const bq = T(sl * 1e6 * 1000 / (dan * 1e6), 1);
    return {
      q: `Một quốc gia có sản lượng lương thực ${S(sl, 1)} triệu tấn và số dân ${S(dan, 1)} triệu người. `
        + `Bình quân lương thực theo đầu người là bao nhiêu kg/người? (làm tròn đến hàng phần mười)`,
      ans: D(bq, 1),
      giai: `Bình quân lương thực = Sản lượng (kg) ÷ Số dân\n`
        + `= (${S(sl, 1)}·10⁶ tấn × 1 000 kg) ÷ ${S(dan, 1)}·10⁶ người = ${D(bq, 1)} kg/người.`,
      meo: 'Mẹo nhẩm: triệu tấn ÷ triệu người = tấn/người, nhân 1 000 ra kg/người. '
        + 'Nước ta hiện khoảng 500 kg/người.'
    };
  } },

{ ma: 'dia-cocau', chuong: 'Ngành kinh tế', muc: 1, dang: 'tln', duong: true,
  tao(R) {
    const a = R.nguyen(80, 400), b = R.nguyen(200, 900), c = R.nguyen(150, 800);
    const hoi = R.chon([['nông – lâm – thuỷ sản', a], ['công nghiệp – xây dựng', b], ['dịch vụ', c]]);
    const pct = T(hoi[1] / (a + b + c) * 100, 2);
    return {
      q: `Cơ cấu GDP của một quốc gia (đơn vị: nghìn tỉ đồng) gồm nông – lâm – thuỷ sản ${S(a)}, `
        + `công nghiệp – xây dựng ${S(b)}, dịch vụ ${S(c)}. Tính tỉ trọng của khu vực ${hoi[0]} `
        + `trong cơ cấu GDP (%, làm tròn đến hàng phần trăm).`,
      ans: D(pct, 2),
      giai: `Tổng GDP = ${S(a)} + ${S(b)} + ${S(c)} = ${S(a + b + c)} nghìn tỉ đồng\n`
        + `Tỉ trọng = ${S(hoi[1])} ÷ ${S(a + b + c)} × 100 = ${D(pct, 2)}%.`,
      meo: 'Ba tỉ trọng cộng lại phải bằng 100%. Tính xong cả ba mà không tròn 100 là đã sai ở đâu đó.'
    };
  } },

{ ma: 'dia-tocdo', chuong: 'Kỹ năng', muc: 3, dang: 'tln', duong: true,
  tao(R) {
    const goc = R.nguyen(150, 900) / 10;
    const sau = T(goc * R.nguyen(105, 260) / 100, 1);
    const td = T(sau / goc * 100, 2);
    const nam1 = R.nguyen(2005, 2015), nam2 = nam1 + R.chon([5, 10, 15]);
    return {
      q: `Giá trị xuất khẩu của một mặt hàng năm ${nam1} là ${S(goc, 1)} tỉ USD, năm ${nam2} là `
        + `${S(sau, 1)} tỉ USD. Lấy năm ${nam1} = 100%, tốc độ tăng trưởng năm ${nam2} là bao nhiêu phần trăm? `
        + `(làm tròn đến hàng phần trăm)`,
      ans: D(td, 2),
      giai: `Tốc độ tăng trưởng = Giá trị năm sau ÷ Giá trị năm gốc × 100\n`
        + `= ${S(sau, 1)} ÷ ${S(goc, 1)} × 100 = ${D(td, 2)}%\n`
        + `Nghĩa là so với năm ${nam1}, giá trị đã TĂNG THÊM ${D(td - 100, 2)}%.`,
      meo: 'Phân biệt "tốc độ tăng trưởng bằng 130%" với "tăng 130%". Đề hỏi TĂNG bao nhiêu thì phải trừ 100.'
    };
  } },

{ ma: 'dia-xnk', chuong: 'Ngành kinh tế', muc: 2, dang: 'tln',
  tao(R) {
    const xk = R.nguyen(1500, 4000) / 10, nk = R.nguyen(1500, 4000) / 10;
    if (Math.abs(xk - nk) < 1) return null;
    const cc = T(xk - nk, 1);
    return {
      q: `Năm nay một quốc gia xuất khẩu ${S(xk, 1)} tỉ USD và nhập khẩu ${S(nk, 1)} tỉ USD. `
        + `Cán cân xuất nhập khẩu của quốc gia đó là bao nhiêu tỉ USD? `
        + `(ghi cả dấu; làm tròn đến hàng phần mười)`,
      ans: D(cc, 1),
      giai: `Cán cân xuất nhập khẩu = Xuất khẩu − Nhập khẩu\n`
        + `= ${S(xk, 1)} − ${S(nk, 1)} = ${D(cc, 1)} tỉ USD\n`
        + `Giá trị ${cc > 0 ? 'DƯƠNG ⇒ quốc gia XUẤT SIÊU' : 'ÂM ⇒ quốc gia NHẬP SIÊU'}.`,
      meo: 'Dương là xuất siêu, âm là nhập siêu. Đề hay hỏi ngược lại: cho cán cân, tìm giá trị còn thiếu.'
    };
  } },

{ ma: 'dia-chephu', chuong: 'Ngành kinh tế', muc: 1, dang: 'tln', duong: true,
  tao(R) {
    const dt = R.nguyen(50, 990) * 10;          /* nghìn ha diện tích tự nhiên */
    const rung = T(dt * R.nguyen(25, 75) / 100, 1);
    const pct = T(rung / dt * 100, 2);
    return {
      q: `Một tỉnh có diện tích tự nhiên ${S(dt)} nghìn ha, trong đó diện tích rừng là ${S(rung, 1)} nghìn ha. `
        + `Độ che phủ rừng của tỉnh là bao nhiêu phần trăm? (làm tròn đến hàng phần trăm)`,
      ans: D(pct, 2),
      giai: `Độ che phủ rừng = Diện tích rừng ÷ Diện tích tự nhiên × 100\n`
        + `= ${S(rung, 1)} ÷ ${S(dt)} × 100 = ${D(pct, 2)}%.`,
      meo: 'Độ che phủ rừng cả nước hiện khoảng 42%. Con số vượt 100% là chắc chắn nhầm tử với mẫu.'
    };
  } },

{ ma: 'dia-biendo', chuong: 'Khí hậu', muc: 1, dang: 'tln', duong: true,
  tao(R) {
    const tp = R.chon([
      { t: 'Hà Nội', c: R.nguyen(285, 300) / 10, l: R.nguyen(160, 175) / 10 },
      { t: 'Huế', c: R.nguyen(290, 300) / 10, l: R.nguyen(195, 205) / 10 },
      { t: 'TP Hồ Chí Minh', c: R.nguyen(285, 295) / 10, l: R.nguyen(255, 265) / 10 },
      { t: 'Lạng Sơn', c: R.nguyen(270, 285) / 10, l: R.nguyen(125, 140) / 10 }
    ]);
    const bd = T(tp.c - tp.l, 1);
    return {
      q: `Tại trạm khí tượng ${tp.t}, nhiệt độ trung bình tháng cao nhất là ${S(tp.c, 1)} °C, `
        + `tháng thấp nhất là ${S(tp.l, 1)} °C. Biên độ nhiệt độ trung bình năm là bao nhiêu °C? `
        + `(làm tròn đến hàng phần mười)`,
      ans: D(bd, 1),
      giai: `Biên độ nhiệt năm = Nhiệt độ tháng cao nhất − Nhiệt độ tháng thấp nhất\n`
        + `= ${S(tp.c, 1)} − ${S(tp.l, 1)} = ${D(bd, 1)} °C.`,
      meo: 'Càng vào Nam biên độ nhiệt năm càng NHỎ (do không còn mùa đông lạnh). '
        + 'Biên độ Hà Nội khoảng 12–13 °C, TP.HCM chỉ 3–4 °C.'
    };
  } },

{ ma: 'dia-bankinh', chuong: 'Kỹ năng', muc: 3, dang: 'tln', duong: true,
  tao(R) {
    const t1 = R.nguyen(100, 400), k = R.nguyen(12, 40) / 10;
    const t2 = T(t1 * k, 0);
    const R1 = R.chon([1, 1.5, 2]);
    const R2 = T(R1 * Math.sqrt(t2 / t1), 2);
    return {
      q: `Vẽ hai biểu đồ tròn thể hiện cơ cấu của hai năm có tổng giá trị lần lượt là ${S(t1)} và ${S(t2)} `
        + `nghìn tỉ đồng. Nếu lấy bán kính hình tròn năm đầu bằng ${S(R1)} đơn vị thì bán kính hình tròn `
        + `năm sau bằng bao nhiêu đơn vị? (làm tròn đến hàng phần trăm)`,
      ans: D(R2, 2),
      giai: `Diện tích hình tròn tỉ lệ với bình phương bán kính, mà diện tích phải tỉ lệ với tổng giá trị:\n`
        + `R₂/R₁ = √(Tổng₂ / Tổng₁) = √(${S(t2)} / ${S(t1)}) = ${S(Math.sqrt(t2 / t1), 4)}\n`
        + `R₂ = ${S(R1)} × ${S(Math.sqrt(t2 / t1), 4)} = ${D(R2, 2)} đơn vị.`,
      meo: 'Lấy tỉ lệ thẳng (không khai căn) là lỗi kinh điển — hình tròn sẽ to sai hẳn so với quy mô thật.'
    };
  } },

{ ma: 'dia-chonbieudo', chuong: 'Kỹ năng', muc: 2, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { d: 'Biểu đồ đường', v: 'Yêu cầu thể hiện TỐC ĐỘ TĂNG TRƯỞNG qua nhiều năm ⇒ biểu đồ đường (xử lí số liệu về % với năm gốc = 100%).',
        y: 'thể hiện tốc độ tăng trưởng của ba nhóm hàng giai đoạn 2010 – 2023', s: ['Biểu đồ tròn', 'Biểu đồ miền', 'Biểu đồ cột chồng'] },
      { d: 'Biểu đồ miền', v: 'Yêu cầu thể hiện SỰ CHUYỂN DỊCH CƠ CẤU qua từ 4 năm trở lên ⇒ biểu đồ miền.',
        y: 'thể hiện sự chuyển dịch cơ cấu GDP giai đoạn 2010 – 2023 (6 năm)', s: ['Biểu đồ tròn', 'Biểu đồ đường', 'Biểu đồ cột ghép'] },
      { d: 'Biểu đồ tròn', v: 'Chỉ có 2 năm và yêu cầu thể hiện QUY MÔ và CƠ CẤU ⇒ biểu đồ tròn có bán kính khác nhau.',
        y: 'thể hiện quy mô và cơ cấu lao động theo khu vực kinh tế của hai năm 2015 và 2023', s: ['Biểu đồ miền', 'Biểu đồ đường', 'Biểu đồ cột chồng'] },
      { d: 'Biểu đồ cột ghép', v: 'So sánh GIÁ TRỊ tuyệt đối của nhiều đối tượng qua vài năm ⇒ biểu đồ cột ghép.',
        y: 'so sánh sản lượng thuỷ sản khai thác và nuôi trồng của bốn năm', s: ['Biểu đồ tròn', 'Biểu đồ miền', 'Biểu đồ đường'] },
      { d: 'Biểu đồ kết hợp cột và đường', v: 'Hai đại lượng KHÁC ĐƠN VỊ trên cùng một biểu đồ ⇒ kết hợp cột (giá trị) và đường (tỉ lệ hoặc năng suất).',
        y: 'thể hiện diện tích (nghìn ha) và năng suất lúa (tạ/ha) giai đoạn 2010 – 2023', s: ['Biểu đồ tròn', 'Biểu đồ miền', 'Biểu đồ cột chồng'] }
    ]);
    return MC(R, `Cho bảng số liệu và yêu cầu ${it.y}. Dạng biểu đồ thích hợp nhất là gì?`, it,
      'Đọc kỹ ĐỘNG TỪ trong yêu cầu: "tốc độ tăng trưởng" ⇒ đường · "chuyển dịch cơ cấu" nhiều năm ⇒ miền · '
      + '"quy mô và cơ cấu" 2–3 năm ⇒ tròn · "so sánh" giá trị ⇒ cột · hai đơn vị khác nhau ⇒ kết hợp.');
  } },

{ ma: 'dia-dothi', chuong: 'Dân cư', muc: 2, dang: 'tln', duong: true,
  tao(R) {
    const dan = R.nguyen(850, 1050) / 10;             /* triệu người */
    const tt = T(dan * R.nguyen(300, 450) / 1000, 2); /* triệu người thành thị */
    const pct = T(tt / dan * 100, 2);
    return {
      q: `Một quốc gia có ${S(dan, 1)} triệu dân, trong đó dân thành thị là ${S(tt, 2)} triệu người. `
        + `Tỉ lệ dân thành thị là bao nhiêu phần trăm? (làm tròn đến hàng phần trăm)`,
      ans: D(pct, 2),
      giai: `Tỉ lệ dân thành thị = Dân thành thị ÷ Tổng số dân × 100\n`
        + `= ${S(tt, 2)} ÷ ${S(dan, 1)} × 100 = ${D(pct, 2)}%.`,
      meo: 'Tỉ lệ dân thành thị nước ta hiện khoảng 38–40%, thấp hơn mức trung bình thế giới — '
        + 'dấu hiệu đô thị hoá còn chưa tương xứng với công nghiệp hoá.'
    };
  } }

]);

/* ==========================================================
   GDKT & PHÁP LUẬT — tính toán kinh tế và tình huống pháp luật
   ========================================================== */
TD.GEN.gdkt = (TD.GEN.gdkt || []).concat([

{ ma: 'gdkt-gdpnguoi', chuong: 'Tăng trưởng – Phát triển', muc: 2, dang: 'tln', duong: true,
  tao(R) {
    const gdp = R.nguyen(2000, 9000) / 10;    /* tỉ USD */
    const dan = R.nguyen(200, 1400) / 10;     /* triệu người */
    const bq = T(gdp * 1e9 / (dan * 1e6), 0);
    return {
      q: `Một quốc gia có GDP đạt ${S(gdp, 1)} tỉ USD với số dân ${S(dan, 1)} triệu người. `
        + `GDP bình quân đầu người của quốc gia đó là bao nhiêu USD? (làm tròn đến hàng đơn vị)`,
      ans: D(bq, 0),
      giai: `GDP bình quân đầu người = GDP ÷ Số dân\n`
        + `= ${S(gdp, 1)}·10⁹ USD ÷ ${S(dan, 1)}·10⁶ người = ${D(bq, 0)} USD/người.`,
      meo: 'Mẹo nhẩm: tỉ USD ÷ triệu người = nghìn USD/người. Việt Nam hiện khoảng 4 500 USD/người.'
    };
  } },

{ ma: 'gdkt-tocdogdp', chuong: 'Tăng trưởng – Phát triển', muc: 2, dang: 'tln',
  tao(R) {
    const a = R.nguyen(3000, 9000) / 10;
    const b = T(a * R.nguyen(96, 112) / 100, 1);
    const td = T((b - a) / a * 100, 2);
    if (Math.abs(td) < 0.1) return null;
    return {
      q: `GDP của một quốc gia năm trước là ${S(a, 1)} tỉ USD, năm nay là ${S(b, 1)} tỉ USD. `
        + `Tốc độ tăng trưởng GDP năm nay là bao nhiêu phần trăm? (ghi cả dấu; làm tròn đến hàng phần trăm)`,
      ans: D(td, 2),
      giai: `Tốc độ tăng trưởng = (GDP năm nay − GDP năm trước) ÷ GDP năm trước × 100\n`
        + `= (${S(b, 1)} − ${S(a, 1)}) ÷ ${S(a, 1)} × 100 = ${D(td, 2)}%\n`
        + `${td > 0 ? 'Giá trị dương ⇒ nền kinh tế tăng trưởng.' : 'Giá trị âm ⇒ nền kinh tế suy giảm (tăng trưởng âm).'}`,
      meo: 'Công thức này lấy PHẦN CHÊNH chia cho năm gốc, khác với "chỉ số phát triển" là lấy nguyên năm sau chia năm gốc.'
    };
  } },

{ ma: 'gdkt-cpi', chuong: 'Tăng trưởng – Phát triển', muc: 3, dang: 'tln', duong: true,
  tao(R) {
    const goc = R.nguyen(2000, 5000) / 10;
    const nay = T(goc * R.nguyen(101, 135) / 100, 1);
    const cpi = T(nay / goc * 100, 2);
    return {
      q: `Chi phí mua một rổ hàng hoá cố định năm gốc là ${S(goc, 1)} nghìn đồng, năm nay là `
        + `${S(nay, 1)} nghìn đồng. Chỉ số giá tiêu dùng (CPI) năm nay là bao nhiêu? `
        + `(làm tròn đến hàng phần trăm)`,
      ans: D(cpi, 2),
      giai: `CPI = Chi phí rổ hàng năm nay ÷ Chi phí rổ hàng năm gốc × 100\n`
        + `= ${S(nay, 1)} ÷ ${S(goc, 1)} × 100 = ${D(cpi, 2)}\n`
        + `Tỉ lệ lạm phát so với năm gốc = ${D(cpi - 100, 2)}%.`,
      meo: 'CPI là CHỈ SỐ (năm gốc = 100), còn tỉ lệ lạm phát là phần vượt trên 100. Đừng lẫn hai con số.'
    };
  } },

{ ma: 'gdkt-laikep', chuong: 'Quản lí thu chi', muc: 3, dang: 'tln', duong: true,
  tao(R) {
    const P = R.nguyen(10, 200) * 10;      /* triệu đồng */
    const r = R.chon([4.5, 5, 5.5, 6, 6.5, 7]) / 100;
    const n = R.nguyen(2, 10);
    const A = T(P * Math.pow(1 + r, n), 2);
    return {
      q: `Gửi tiết kiệm ${S(P)} triệu đồng với lãi suất ${S(r * 100, 1)}%/năm theo thể thức lãi kép, `
        + `không rút gốc lẫn lãi. Sau ${S(n)} năm số tiền cả gốc lẫn lãi là bao nhiêu triệu đồng? `
        + `(làm tròn đến hàng phần trăm)`,
      ans: D(A, 2),
      giai: `Công thức lãi kép: A = P(1 + r)ⁿ\n`
        + `A = ${S(P)} × (1 + ${S(r, 3)})^${S(n)} = ${S(P)} × ${S(Math.pow(1 + r, n), 6)} = ${D(A, 2)} triệu đồng\n`
        + `Riêng tiền lãi = ${D(A - P, 2)} triệu đồng.`,
      meo: 'Lãi kép khác lãi đơn ở chỗ lãi năm trước được nhập vào gốc. '
        + 'Bấm máy: nhập P × (1 + r) rồi bấm mũ n, đừng nhân tay từng năm.'
    };
  } },

{ ma: 'gdkt-thuetncn', chuong: 'Doanh nghiệp – Thuế', muc: 4, dang: 'tln', duong: true,
  tao(R) {
    /* biểu thuế luỹ tiến từng phần: bậc 1 5% đến 5 tr, bậc 2 10% đến 10 tr, bậc 3 15% đến 18 tr */
    const tn = R.nguyen(60, 180) / 10;    /* triệu đồng thu nhập TÍNH THUẾ mỗi tháng */
    let thue = 0;
    const b1 = Math.min(tn, 5); thue += b1 * 0.05;
    const b2 = Math.min(Math.max(tn - 5, 0), 5); thue += b2 * 0.10;
    const b3 = Math.max(tn - 10, 0); thue += b3 * 0.15;
    const kq = T(thue, 3);
    return {
      q: `Thuế thu nhập cá nhân áp dụng biểu thuế luỹ tiến từng phần: đến 5 triệu đồng chịu 5%, `
        + `phần trên 5 đến 10 triệu chịu 10%, phần trên 10 đến 18 triệu chịu 15%. `
        + `Một người có thu nhập tính thuế ${S(tn, 1)} triệu đồng/tháng thì phải nộp bao nhiêu triệu đồng `
        + `tiền thuế mỗi tháng? (làm tròn đến hàng phần nghìn)`,
      ans: D(kq, 3),
      giai: `Luỹ tiến TỪNG PHẦN nghĩa là mỗi bậc chỉ đánh thuế trên phần thu nhập nằm trong bậc đó:\n`
        + `  Bậc 1: ${S(b1, 1)} × 5% = ${S(b1 * 0.05, 4)} triệu\n`
        + (b2 > 0 ? `  Bậc 2: ${S(b2, 1)} × 10% = ${S(b2 * 0.10, 4)} triệu\n` : '')
        + (b3 > 0 ? `  Bậc 3: ${S(b3, 1)} × 15% = ${S(b3 * 0.15, 4)} triệu\n` : '')
        + `  Tổng thuế = ${D(kq, 3)} triệu đồng.`
        + `\nBước cuối — kiểm chứng: số thuế phải nộp luôn nhỏ hơn phần thu nhập tính thuế, và thuế suất thực tế phải nằm giữa bậc thấp nhất và bậc cao nhất đã dùng.\nChỗ dễ sai: thuế thu nhập cá nhân tính theo BẬC LUỸ TIẾN TỪNG PHẦN — chỉ phần thu nhập vượt ngưỡng mới chịu thuế suất cao hơn, không phải lấy toàn bộ thu nhập nhân với thuế suất của bậc cao nhất.`,
      meo: 'Bẫy lớn nhất: lấy TOÀN BỘ thu nhập nhân với thuế suất của bậc cao nhất. '
        + 'Luỹ tiến TỪNG PHẦN chỉ đánh thuế phần vượt vào mỗi bậc.'
    };
  } },

{ ma: 'gdkt-bhxh', chuong: 'Bảo hiểm – An sinh', muc: 3, dang: 'tln', duong: true,
  tao(R) {
    const luong = R.nguyen(60, 300) / 10;      /* triệu đồng */
    const ai = R.chon([
      { t: 'người lao động', p: 10.5, v: 'Người lao động đóng 8% BHXH + 1,5% BHYT + 1% BHTN = 10,5%.' },
      { t: 'người sử dụng lao động', p: 21.5, v: 'Người sử dụng lao động đóng 17,5% BHXH + 3% BHYT + 1% BHTN = 21,5%.' }
    ]);
    const kq = T(luong * ai.p / 100, 4);
    return {
      q: `Tiền lương tháng làm căn cứ đóng bảo hiểm của một người là ${S(luong, 1)} triệu đồng. `
        + `Biết ${ai.t} phải đóng tổng cộng ${S(ai.p, 1)}% tiền lương cho các loại bảo hiểm bắt buộc. `
        + `Số tiền ${ai.t} phải đóng mỗi tháng là bao nhiêu triệu đồng? (làm tròn đến hàng phần vạn)`,
      ans: D(kq, 4),
      giai: `${ai.v}\n`
        + `Số tiền đóng = ${S(luong, 1)} × ${S(ai.p, 1)}% = ${D(kq, 4)} triệu đồng.`,
      meo: 'Nhớ tách hai vế: người lao động 10,5%, người sử dụng lao động 21,5%. '
        + 'Tổng quỹ bảo hiểm bắt buộc là 32% tiền lương.'
    };
  } },

{ ma: 'gdkt-vat', chuong: 'Doanh nghiệp – Thuế', muc: 2, dang: 'tln', duong: true,
  tao(R) {
    const gia = R.nguyen(50, 900) * 10;    /* nghìn đồng, chưa thuế */
    const suat = R.chon([5, 8, 10]);
    const hoi = R.nguyen(0, 1);
    const thue = T(gia * suat / 100, 2);
    const tong = T(gia + thue, 2);
    return {
      q: hoi === 0
        ? `Một sản phẩm có giá chưa thuế là ${S(gia)} nghìn đồng, thuế suất giá trị gia tăng ${S(suat)}%. `
          + `Người mua phải trả tổng cộng bao nhiêu nghìn đồng? (làm tròn đến hàng phần trăm)`
        : `Một sản phẩm có giá chưa thuế là ${S(gia)} nghìn đồng, thuế suất giá trị gia tăng ${S(suat)}%. `
          + `Tiền thuế giá trị gia tăng của sản phẩm là bao nhiêu nghìn đồng? (làm tròn đến hàng phần trăm)`,
      ans: hoi === 0 ? D(tong, 2) : D(thue, 2),
      giai: `Thuế GTGT = Giá chưa thuế × Thuế suất = ${S(gia)} × ${S(suat)}% = ${D(thue, 2)} nghìn đồng\n`
        + `Giá thanh toán = ${S(gia)} + ${D(thue, 2)} = ${D(tong, 2)} nghìn đồng\n`
        + `Đáp án cần tìm: ${hoi === 0 ? D(tong, 2) : D(thue, 2)} nghìn đồng.`,
      meo: 'VAT là thuế GIÁN THU: doanh nghiệp thu hộ rồi nộp cho Nhà nước, người tiêu dùng cuối cùng mới là người chịu thuế.'
    };
  } },

{ ma: 'gdkt-chitieu', chuong: 'Quản lí thu chi', muc: 2, dang: 'tln', duong: true,
  tao(R) {
    const tn = R.nguyen(60, 300) / 10;
    const nhom = R.chon([
      { t: 'chi thiết yếu', p: 50 }, { t: 'chi linh hoạt', p: 30 }, { t: 'tiết kiệm và đầu tư', p: 20 }
    ]);
    const kq = T(tn * nhom.p / 100, 3);
    return {
      q: `Áp dụng quy tắc quản lí tài chính cá nhân 50/30/20 (50% chi thiết yếu, 30% chi linh hoạt, `
        + `20% tiết kiệm và đầu tư) cho mức thu nhập ${S(tn, 1)} triệu đồng/tháng. `
        + `Khoản dành cho ${nhom.t} là bao nhiêu triệu đồng? (làm tròn đến hàng phần nghìn)`,
      ans: D(kq, 3),
      giai: `Khoản ${nhom.t} chiếm ${S(nhom.p)}% thu nhập:\n`
        + `= ${S(tn, 1)} × ${S(nhom.p)}% = ${D(kq, 3)} triệu đồng.`,
      meo: 'Nguyên tắc "trả cho mình trước": trích khoản tiết kiệm 20% ngay khi nhận thu nhập, '
        + 'đừng đợi cuối tháng còn dư mới để dành.'
    };
  } },

{ ma: 'gdkt-vipham', chuong: 'Quyền & nghĩa vụ', muc: 3, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { y: 'Anh A điều khiển xe máy vượt đèn đỏ và bị cảnh sát giao thông lập biên bản xử phạt',
        d: 'Vi phạm hành chính', v: 'Hành vi xâm phạm quy tắc quản lí nhà nước về trật tự an toàn giao thông, mức độ chưa đến mức tội phạm ⇒ vi phạm hành chính.',
        s: ['Vi phạm hình sự', 'Vi phạm dân sự', 'Vi phạm kỉ luật'] },
      { y: 'Chị B mượn xe của bạn nhưng quá hạn không trả và làm hỏng xe',
        d: 'Vi phạm dân sự', v: 'Xâm phạm quan hệ tài sản, phát sinh nghĩa vụ bồi thường ⇒ vi phạm dân sự.',
        s: ['Vi phạm hành chính', 'Vi phạm hình sự', 'Vi phạm kỉ luật'] },
      { y: 'Ông C là nhân viên công ty, tự ý nghỉ việc nhiều ngày không có lí do',
        d: 'Vi phạm kỉ luật', v: 'Xâm phạm quy định nội bộ của cơ quan, tổ chức về lao động ⇒ vi phạm kỉ luật.',
        s: ['Vi phạm hành chính', 'Vi phạm dân sự', 'Vi phạm hình sự'] },
      { y: 'Anh D dùng vũ lực cướp tài sản của người đi đường, gây thương tích nặng',
        d: 'Vi phạm hình sự', v: 'Hành vi nguy hiểm cho xã hội được Bộ luật Hình sự quy định là tội phạm ⇒ vi phạm hình sự.',
        s: ['Vi phạm hành chính', 'Vi phạm dân sự', 'Vi phạm kỉ luật'] },
      { y: 'Doanh nghiệp E xả nước thải chưa xử lí ra sông, mức độ chưa đến ngưỡng truy cứu hình sự',
        d: 'Vi phạm hành chính', v: 'Xâm phạm quy tắc quản lí nhà nước về bảo vệ môi trường, chưa đến mức tội phạm ⇒ vi phạm hành chính (kèm trách nhiệm dân sự bồi thường thiệt hại).',
        s: ['Vi phạm hình sự', 'Vi phạm kỉ luật', 'Không vi phạm pháp luật'] }
    ]);
    return MC(R, `Tình huống: ${it.y}. Hành vi trên thuộc loại vi phạm pháp luật nào?`, it,
      'Bốn loại: HÌNH SỰ (tội phạm) · HÀNH CHÍNH (quy tắc quản lí nhà nước) · '
      + 'DÂN SỰ (quan hệ tài sản, nhân thân) · KỈ LUẬT (nội quy cơ quan, tổ chức). '
      + 'Một hành vi có thể kéo theo nhiều loại trách nhiệm cùng lúc.');
  } },

{ ma: 'gdkt-quyen', chuong: 'Quyền & nghĩa vụ', muc: 3, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { y: 'Anh K tự ý mở và đọc thư của em trai mình rồi kể lại nội dung cho người khác',
        d: 'Quyền được bảo đảm an toàn và bí mật thư tín, điện thoại, điện tín',
        v: 'Không ai được tự ý bóc mở, thu giữ, tiêu huỷ thư tín của người khác, kể cả người thân trong gia đình.',
        s: ['Quyền bất khả xâm phạm về chỗ ở', 'Quyền bất khả xâm phạm về thân thể', 'Quyền tự do ngôn luận'] },
      { y: 'Nghi ngờ nhà hàng xóm giấu con gà bị mất, ông M xông vào lục soát khi chủ nhà vắng mặt',
        d: 'Quyền bất khả xâm phạm về chỗ ở',
        v: 'Chỉ được khám xét chỗ ở khi có quyết định của cơ quan có thẩm quyền và theo đúng trình tự luật định. Nghi ngờ thì phải trình báo.',
        s: ['Quyền được bảo hộ về danh dự, nhân phẩm', 'Quyền bất khả xâm phạm về thân thể', 'Quyền khiếu nại, tố cáo'] },
      { y: 'Bà N tung tin bịa đặt trên mạng xã hội làm ảnh hưởng nghiêm trọng uy tín của người khác',
        d: 'Quyền được pháp luật bảo hộ về danh dự và nhân phẩm',
        v: 'Không ai được xúc phạm, bịa đặt nhằm hạ uy tín người khác; hành vi này có thể bị xử phạt hành chính hoặc truy cứu hình sự.',
        s: ['Quyền tự do ngôn luận', 'Quyền bất khả xâm phạm về chỗ ở', 'Quyền bí mật thư tín'] },
      { y: 'Anh P bị bảo vệ tổ dân phố giữ lại hơn một ngày mà không có quyết định của cơ quan có thẩm quyền',
        d: 'Quyền bất khả xâm phạm về thân thể',
        v: 'Không ai bị bắt nếu không có quyết định của Toà án, quyết định hoặc phê chuẩn của Viện kiểm sát, trừ trường hợp phạm tội quả tang.',
        s: ['Quyền bất khả xâm phạm về chỗ ở', 'Quyền bí mật thư tín', 'Quyền được bảo hộ về danh dự'] }
    ]);
    return MC(R, `Tình huống: ${it.y}. Hành vi đó xâm phạm quyền nào của công dân?`, it,
      'Đọc kỹ ĐỐI TƯỢNG bị xâm phạm: thư từ ⇒ bí mật thư tín · nhà ở ⇒ bất khả xâm phạm chỗ ở · '
      + 'bắt giữ người ⇒ bất khả xâm phạm thân thể · nói xấu, bịa đặt ⇒ danh dự nhân phẩm.');
  } }

]);

/* ==========================================================
   LỊCH SỬ — xử lí mốc thời gian, trình tự, ghép sự kiện
   ========================================================== */
/* Chuyên đề của một sự kiện suy ra từ mốc thời gian và nội dung — mẫu đề
   bốc sự kiện ngẫu nhiên nên KHÔNG được gắn nhãn chuyên đề cố định,
   nếu không màn Luyện Công sẽ xếp câu ASEAN vào "Cách mạng tháng Tám". */
const cdSuKien = (sk) => {
  const t = sk.t;
  if (/ASEAN|Đông Nam Á/i.test(t)) return 'ASEAN';
  if (/Liên hợp quốc|Ianta/i.test(t)) return 'Liên hợp quốc';
  if (/Chiến tranh lạnh|NATO|Vacsava|Berlin|Liên Xô tan rã|Sputnik|Liên minh châu Âu|EU/i.test(t)) return 'Chiến tranh lạnh';
  if (/Đổi mới|WTO|gia nhập|bình thường hoá|APEC|Hiến pháp/i.test(t)) return 'Công cuộc Đổi mới';
  if (/Biển Đông|UNCLOS|Hoàng Sa|Trường Sa/i.test(t)) return 'Biển Đông';
  if (/Hồ Chí Minh|Nguyễn Ái Quốc|Luận cương/i.test(t)) return 'Hồ Chí Minh';
  if (sk.n <= 1945) return 'Cách mạng tháng Tám';
  if (sk.n <= 1954) return 'Kháng chiến chống Pháp';
  if (sk.n <= 1975) return 'Kháng chiến chống Mỹ';
  if (sk.n <= 1979) return 'Bảo vệ Tổ quốc sau 1975';
  return 'Công cuộc Đổi mới';
};

const SU_KIEN = [
  { n: 1930, t: 'Đảng Cộng sản Việt Nam ra đời', y: 'chấm dứt khủng hoảng về đường lối và giai cấp lãnh đạo cách mạng Việt Nam' },
  { n: 1941, t: 'Mặt trận Việt Minh được thành lập', y: 'tập hợp lực lượng toàn dân tộc, chuẩn bị trực tiếp cho Tổng khởi nghĩa' },
  { n: 1945, t: 'Cách mạng tháng Tám thành công và nước Việt Nam Dân chủ Cộng hoà ra đời', y: 'mở ra kỉ nguyên độc lập, tự do và nhân dân làm chủ đất nước' },
  { n: 1946, t: 'Toàn quốc kháng chiến bùng nổ', y: 'mở đầu cuộc kháng chiến chống thực dân Pháp trên phạm vi cả nước' },
  { n: 1954, t: 'Chiến thắng Điện Biên Phủ và Hiệp định Genève', y: 'buộc Pháp chấm dứt chiến tranh, công nhận độc lập của ba nước Đông Dương' },
  { n: 1959, t: 'Đường Trường Sơn – đường Hồ Chí Minh được mở', y: 'nối hậu phương miền Bắc với tiền tuyến miền Nam' },
  { n: 1968, t: 'Cuộc Tổng tiến công và nổi dậy Xuân Mậu Thân', y: 'buộc Mỹ phải xuống thang chiến tranh và ngồi vào bàn đàm phán Paris' },
  { n: 1972, t: 'Chiến thắng "Điện Biên Phủ trên không"', y: 'buộc Mỹ phải trở lại kí Hiệp định Paris' },
  { n: 1973, t: 'Hiệp định Paris được kí kết', y: 'buộc Mỹ rút hết quân, tạo thời cơ để giải phóng hoàn toàn miền Nam' },
  { n: 1975, t: 'Đại thắng mùa Xuân, giải phóng hoàn toàn miền Nam', y: 'kết thúc kháng chiến chống Mỹ, mở ra kỉ nguyên độc lập, thống nhất và đi lên chủ nghĩa xã hội' },
  { n: 1976, t: 'Nước Cộng hoà xã hội chủ nghĩa Việt Nam được thành lập', y: 'hoàn thành thống nhất đất nước về mặt nhà nước' },
  { n: 1986, t: 'Đại hội VI của Đảng mở đầu công cuộc Đổi mới', y: 'chuyển nền kinh tế từ tập trung bao cấp sang kinh tế thị trường định hướng xã hội chủ nghĩa' },
  { n: 1995, t: 'Việt Nam gia nhập ASEAN và bình thường hoá quan hệ với Hoa Kỳ', y: 'phá thế bao vây cấm vận, mở đầu thời kì hội nhập khu vực và quốc tế' },
  { n: 2007, t: 'Việt Nam gia nhập Tổ chức Thương mại Thế giới (WTO)', y: 'đưa nền kinh tế hội nhập đầy đủ vào hệ thống thương mại toàn cầu' },
  { n: 1945, t: 'Liên hợp quốc được thành lập', y: 'duy trì hoà bình và an ninh quốc tế sau Chiến tranh thế giới thứ hai' },
  { n: 1947, t: 'Học thuyết Truman ra đời', y: 'mở đầu cuộc Chiến tranh lạnh giữa hai phe' },
  { n: 1949, t: 'Khối quân sự NATO được thành lập', y: 'liên minh quân sự của các nước tư bản phương Tây do Mỹ đứng đầu' },
  { n: 1967, t: 'Hiệp hội các quốc gia Đông Nam Á (ASEAN) ra đời', y: 'hợp tác phát triển kinh tế – văn hoá giữa các nước trong khu vực' },
  { n: 1989, t: 'Chiến tranh lạnh chấm dứt', y: 'hai siêu cường tuyên bố chấm dứt đối đầu tại cuộc gặp Manta' },
  { n: 1991, t: 'Liên Xô tan rã', y: 'trật tự thế giới hai cực Ianta sụp đổ hoàn toàn' },
  { n: 1993, t: 'Liên minh châu Âu (EU) được thành lập', y: 'liên kết khu vực chặt chẽ nhất thế giới về kinh tế và chính trị' },
  { n: 2015, t: 'Cộng đồng ASEAN chính thức hình thành', y: 'nâng hợp tác khu vực lên tầm cộng đồng với ba trụ cột' },
  { n: 1911, t: 'Nguyễn Tất Thành ra đi tìm đường cứu nước', y: 'mở đầu hành trình tìm con đường giải phóng dân tộc theo hướng mới' },
  { n: 1920, t: 'Nguyễn Ái Quốc đọc Luận cương của Lênin và bỏ phiếu tán thành Quốc tế Cộng sản', y: 'đánh dấu bước chuyển từ chủ nghĩa yêu nước sang chủ nghĩa cộng sản của Nguyễn Ái Quốc' },
  { n: 1925, t: 'Hội Việt Nam Cách mạng Thanh niên được thành lập', y: 'tổ chức tiền thân truyền bá chủ nghĩa Mác – Lênin vào Việt Nam' },
  { n: 1929, t: 'Ba tổ chức cộng sản lần lượt ra đời ở Việt Nam', y: 'phản ánh bước phát triển mạnh của phong trào công nhân nhưng gây chia rẽ, đòi hỏi phải hợp nhất' },
  { n: 1936, t: 'Phong trào dân chủ 1936 – 1939 bùng nổ', y: 'cuộc tập dượt thứ hai chuẩn bị cho Cách mạng tháng Tám' },
  { n: 1940, t: 'Nhật vào Đông Dương', y: 'nhân dân ta chịu ách một cổ hai tròng Nhật – Pháp' },
  { n: 1944, t: 'Đội Việt Nam Tuyên truyền Giải phóng quân được thành lập', y: 'tiền thân của Quân đội nhân dân Việt Nam' },
  { n: 1947, t: 'Chiến dịch Việt Bắc thu – đông', y: 'làm phá sản chiến lược đánh nhanh thắng nhanh của thực dân Pháp' },
  { n: 1950, t: 'Chiến dịch Biên giới thu – đông', y: 'khai thông biên giới, ta giành được thế chủ động trên chiến trường chính Bắc Bộ' },
  { n: 1951, t: 'Đại hội đại biểu lần thứ II của Đảng', y: 'đưa Đảng ra hoạt động công khai với tên Đảng Lao động Việt Nam' },
  { n: 1960, t: 'Phong trào Đồng khởi và Mặt trận Dân tộc Giải phóng miền Nam ra đời', y: 'chuyển cách mạng miền Nam từ thế giữ gìn lực lượng sang thế tiến công' },
  { n: 1961, t: 'Mỹ tiến hành chiến lược Chiến tranh đặc biệt ở miền Nam', y: 'dùng quân đội Sài Gòn làm nòng cốt dưới sự chỉ huy của cố vấn Mỹ' },
  { n: 1965, t: 'Mỹ tiến hành chiến lược Chiến tranh cục bộ và đưa quân viễn chinh vào miền Nam', y: 'đánh dấu bước leo thang chiến tranh cao nhất của Mỹ ở Việt Nam' },
  { n: 1969, t: 'Chủ tịch Hồ Chí Minh qua đời và để lại bản Di chúc', y: 'kết tinh tư tưởng về đoàn kết, về Đảng và về chăm lo cho nhân dân' },
  { n: 1974, t: 'Trung Quốc dùng vũ lực chiếm đóng trái phép quần đảo Hoàng Sa', y: 'hành động xâm phạm chủ quyền Việt Nam, không tạo ra bất kì cơ sở pháp lí nào' },
  { n: 1979, t: 'Chiến tranh bảo vệ biên giới phía Bắc', y: 'quân dân ta bảo vệ vững chắc chủ quyền lãnh thổ biên giới phía Bắc' },
  { n: 1982, t: 'Công ước Liên hợp quốc về Luật Biển (UNCLOS) được thông qua', y: 'cơ sở pháp lí quốc tế xác định các vùng biển và giải quyết tranh chấp trên biển' },
  { n: 1988, t: 'Sự kiện Gạc Ma ở quần đảo Trường Sa', y: 'sự hi sinh của các chiến sĩ hải quân khẳng định ý chí bảo vệ chủ quyền biển đảo' },
  { n: 1994, t: 'Công ước Luật Biển 1982 chính thức có hiệu lực', y: 'trở thành "hiến pháp của đại dương", Việt Nam phê chuẩn cùng năm' },
  { n: 1998, t: 'Việt Nam gia nhập Diễn đàn Hợp tác kinh tế châu Á – Thái Bình Dương (APEC)', y: 'mở rộng hội nhập kinh tế ra khu vực châu Á – Thái Bình Dương' },
  { n: 2002, t: 'ASEAN và Trung Quốc kí Tuyên bố về ứng xử của các bên ở Biển Đông (DOC)', y: 'cam kết kiềm chế, giải quyết tranh chấp bằng biện pháp hoà bình' },
  { n: 2008, t: 'Việt Nam lần đầu làm Uỷ viên không thường trực Hội đồng Bảo an Liên hợp quốc', y: 'khẳng định vị thế và uy tín quốc tế của Việt Nam' },
  { n: 2019, t: 'Việt Nam lần thứ hai làm Uỷ viên không thường trực Hội đồng Bảo an Liên hợp quốc', y: 'tiếp tục đóng góp vào việc duy trì hoà bình và an ninh quốc tế' },
  { n: 1917, t: 'Cách mạng tháng Mười Nga thành công', y: 'mở ra thời kì mới trong lịch sử thế giới, cổ vũ phong trào giải phóng dân tộc' },
  { n: 1939, t: 'Chiến tranh thế giới thứ hai bùng nổ', y: 'cuộc chiến tàn khốc nhất lịch sử nhân loại, làm thay đổi trật tự thế giới' },
  { n: 1955, t: 'Tổ chức Hiệp ước Vacsava được thành lập', y: 'liên minh quân sự của các nước xã hội chủ nghĩa ở châu Âu, đối trọng với NATO' },
  { n: 1957, t: 'Liên Xô phóng vệ tinh nhân tạo đầu tiên Sputnik', y: 'mở đầu kỉ nguyên chinh phục vũ trụ của loài người' },
  { n: 1972, t: 'Mỹ và Liên Xô kí Hiệp ước ABM và SALT-1', y: 'bước hoà hoãn Đông – Tây đầu tiên trong Chiến tranh lạnh' },
  { n: 1978, t: 'Trung Quốc bắt đầu công cuộc cải cách mở cửa', y: 'đưa Trung Quốc trở thành nền kinh tế lớn thứ hai thế giới' },
  { n: 1990, t: 'Nước Đức tái thống nhất', y: 'kết quả trực tiếp của việc bức tường Berlin sụp đổ năm 1989' },
  { n: 1997, t: 'Lào và Myanmar gia nhập ASEAN', y: 'đưa ASEAN tiến gần tới mục tiêu bao gồm toàn bộ mười nước Đông Nam Á' },
  { n: 1999, t: 'Campuchia gia nhập ASEAN', y: 'hoàn tất ASEAN gồm mười nước thành viên' },
  { n: 2016, t: 'Toà Trọng tài thường trực ra phán quyết về vụ kiện Biển Đông', y: 'bác bỏ yêu sách "đường chín đoạn" vì không có cơ sở pháp lí theo UNCLOS' },
  { n: 1945, t: 'Hội nghị Ianta được triệu tập', y: 'hình thành khuôn khổ trật tự thế giới hai cực Ianta sau chiến tranh' },
  { n: 1986, t: 'Việt Nam bắt đầu chuyển sang nền kinh tế nhiều thành phần', y: 'thừa nhận sự tồn tại lâu dài của nhiều hình thức sở hữu và thành phần kinh tế' }
];

TD.GEN.su = (TD.GEN.su || []).concat([

{ ma: 'su-nam', chuong: 'Cách mạng tháng Tám', muc: 1, dang: 'tln', duong: true,
  tao(R) {
    const sk = R.chon(SU_KIEN);
    return {
      chuong: cdSuKien(sk),
      q: `Sự kiện "${sk.t}" diễn ra vào năm nào?`,
      ans: String(sk.n),
      giai: `Năm ${sk.n}: ${sk.t}.\nÝ nghĩa: ${sk.y}.`,
      meo: 'Học mốc theo CHUỖI nhân quả chứ đừng học rời: 1930 có Đảng → 1941 có Việt Minh → '
        + '1945 giành chính quyền → 1946 toàn quốc kháng chiến.'
    };
  } },

{ ma: 'su-khoangcach', chuong: 'Kháng chiến chống Mỹ', muc: 2, dang: 'tln', duong: true,
  tao(R) {
    const bo = R.chonNhieu(SU_KIEN, 2);
    const a = bo[0], b = bo[1];
    if (a.n === b.n) return null;
    const truoc = a.n < b.n ? a : b, sau = a.n < b.n ? b : a;
    return {
      chuong: cdSuKien(sau),
      q: `Tính khoảng cách thời gian (số năm) giữa hai sự kiện: "${truoc.t}" và "${sau.t}".`,
      ans: String(sau.n - truoc.n),
      giai: `${truoc.t} — năm ${truoc.n}\n${sau.t} — năm ${sau.n}\n`
        + `Khoảng cách = ${sau.n} − ${truoc.n} = ${sau.n - truoc.n} năm.`,
      meo: 'Vẽ trục thời gian ra nháp ngay khi vào phòng thi. Dạng câu "bao nhiêu năm sau" và '
        + '"sự kiện nào diễn ra trước" đều giải được trong 5 giây nếu có trục.'
    };
  } },

{ ma: 'su-trinhtu', chuong: 'Kháng chiến chống Pháp', muc: 2, dang: 'mc',
  tao(R) {
    const bo = R.chonNhieu(SU_KIEN.filter(x => x.n >= 1930), 4);
    if (new Set(bo.map(x => x.n)).size < 4) return null;
    const sapXep = bo.slice().sort((a, b) => a.n - b.n);
    const dung = sapXep[0];
    return Object.assign({ chuong: cdSuKien(dung) },
      MC(R, `Trong các sự kiện sau, sự kiện nào diễn ra SỚM NHẤT?`,
      { d: dung.t, s: sapXep.slice(1).map(x => x.t),
        v: sapXep.map(x => `${x.n} — ${x.t}`).join('\n') },
      'Câu sắp xếp trình tự chỉ cần nhớ NĂM, không cần nhớ nội dung. Đây là câu dễ ăn điểm nhất của đề Sử.'));
  } },

{ ma: 'su-ynghia', chuong: 'Công cuộc Đổi mới', muc: 3, dang: 'mc',
  tao(R) {
    const bo = R.chonNhieu(SU_KIEN, 4);
    if (new Set(bo.map(x => x.y)).size < 4) return null;
    const dung = bo[0];
    return Object.assign({ chuong: cdSuKien(dung) },
      MC(R, `Sự kiện "${dung.t}" (năm ${dung.n}) có ý nghĩa lịch sử nào sau đây?`,
      { d: dung.y.charAt(0).toUpperCase() + dung.y.slice(1),
        s: bo.slice(1).map(x => x.y.charAt(0).toUpperCase() + x.y.slice(1)),
        v: `Năm ${dung.n}: ${dung.t} — ${dung.y}.` },
      'Câu hỏi ý nghĩa thường có một phương án đúng nhưng thuộc về SỰ KIỆN KHÁC. '
      + 'Đọc kỹ xem ý nghĩa đó gắn với mốc nào.'));
  } },

{ ma: 'su-thapnien', chuong: 'Chiến tranh lạnh', muc: 2, dang: 'tln', duong: true,
  tao(R) {
    const sk = R.chon(SU_KIEN);
    const tk = Math.floor(sk.n / 10) * 10;
    return {
      chuong: cdSuKien(sk),
      q: `Sự kiện "${sk.t}" diễn ra vào thập niên nào của thế kỉ ${sk.n < 2000 ? 'XX' : 'XXI'}? `
        + `(ghi năm mở đầu thập niên, ví dụ 1940)`,
      ans: String(tk),
      giai: `Sự kiện diễn ra năm ${sk.n} ⇒ thuộc thập niên ${tk} (từ ${tk} đến ${tk + 9}).`,
      meo: 'Thập niên lấy theo chữ số hàng chục: 1954 thuộc thập niên 1950, 1968 thuộc thập niên 1960.'
    };
  } }

]);

/* ==========================================================
   NGỮ VĂN — nhận diện trên ngữ liệu
   ========================================================== */
TD.GEN.van = (TD.GEN.van || []).concat([

{ ma: 'van-bienphap', chuong: 'Biện pháp tu từ', muc: 2, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { q: 'Mặt trời của bắp thì nằm trên đồi / Mặt trời của mẹ, em nằm trên lưng', d: 'Ẩn dụ',
        v: '"Mặt trời" thứ hai chỉ đứa con — gọi tên sự vật này bằng tên sự vật khác có nét tương đồng (con là nguồn sống, nguồn ấm áp của mẹ).',
        s: ['Hoán dụ', 'So sánh', 'Nhân hoá'] },
      { q: 'Áo chàm đưa buổi phân li / Cầm tay nhau biết nói gì hôm nay', d: 'Hoán dụ',
        v: '"Áo chàm" là dấu hiệu để chỉ người dân Việt Bắc — lấy dấu hiệu của sự vật để gọi sự vật, đó là hoán dụ.',
        s: ['Ẩn dụ', 'So sánh', 'Nói quá'] },
      { q: 'Sóng gợn tràng giang buồn điệp điệp / Con thuyền xuôi mái nước song song', d: 'Từ láy kết hợp điệp cấu trúc',
        v: 'Hai từ láy "điệp điệp – song song" đặt ở cuối hai dòng theo cùng một mô hình cú pháp, tạo nhịp điệu miên man và nỗi buồn dàn trải.',
        s: ['Ẩn dụ', 'Hoán dụ', 'Nói giảm nói tránh'] },
      { q: 'Bác đã đi rồi sao, Bác ơi!', d: 'Nói giảm nói tránh',
        v: 'Dùng từ "đi" thay cho "mất" để làm dịu nỗi đau và thể hiện sự kính trọng.',
        s: ['Nói quá', 'Ẩn dụ', 'Điệp ngữ'] },
      { q: 'Bàn tay ta làm nên tất cả / Có sức người sỏi đá cũng thành cơm', d: 'Nói quá kết hợp hoán dụ',
        v: '"Sỏi đá cũng thành cơm" là nói quá để khẳng định sức lao động; "bàn tay ta" là hoán dụ chỉ con người lao động.',
        s: ['Nói giảm nói tránh', 'So sánh', 'Nhân hoá'] },
      { q: 'Trâu ơi ta bảo trâu này / Trâu ra ngoài ruộng trâu cày với ta', d: 'Nhân hoá',
        v: 'Gọi và trò chuyện với con trâu như với người, khiến vật vô tri trở nên gần gũi có tình.',
        s: ['Ẩn dụ', 'Hoán dụ', 'Nói quá'] },
      { q: 'Người ta là hoa đất', d: 'So sánh',
        v: 'Dùng từ "là" để đối chiếu con người với hoa đất — quan hệ so sánh ngang bằng.',
        s: ['Ẩn dụ', 'Hoán dụ', 'Nhân hoá'] },
      { q: 'Một cây làm chẳng nên non / Ba cây chụm lại nên hòn núi cao', d: 'Ẩn dụ',
        v: '"Một cây", "ba cây" ẩn dụ cho cá nhân đơn lẻ và tập thể đoàn kết.',
        s: ['Hoán dụ', 'Nói giảm nói tránh', 'Nhân hoá'] }
    ]);
    return MC(R, `Xác định biện pháp tu từ NỔI BẬT trong ngữ liệu sau:\n\n"${it.q}"`, it,
      'Phân biệt ẩn dụ với hoán dụ: ẩn dụ dựa trên nét TƯƠNG ĐỒNG (giống nhau), '
      + 'hoán dụ dựa trên quan hệ GẦN GŨI (bộ phận – toàn thể, dấu hiệu – sự vật, vật chứa – vật bị chứa).');
  } },

{ ma: 'van-thetho', chuong: 'Thể loại', muc: 1, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { y: 'mỗi dòng 6 chữ xen kẽ dòng 8 chữ, gieo vần chân và vần lưng', d: 'Lục bát',
        v: 'Lục bát: dòng sáu chữ nối dòng tám chữ; tiếng thứ 6 của câu lục vần với tiếng thứ 6 của câu bát.',
        s: ['Song thất lục bát', 'Thất ngôn bát cú', 'Tự do'] },
      { y: 'mỗi dòng 7 chữ, toàn bài 8 dòng, có niêm luật và đối ở hai cặp câu giữa', d: 'Thất ngôn bát cú Đường luật',
        v: 'Bố cục đề – thực – luận – kết, đối ở cặp 3–4 và 5–6, gieo vần ở các câu 1, 2, 4, 6, 8.',
        s: ['Thất ngôn tứ tuyệt', 'Lục bát', 'Ngũ ngôn'] },
      { y: 'mỗi dòng 7 chữ, toàn bài chỉ 4 dòng', d: 'Thất ngôn tứ tuyệt',
        v: 'Bốn dòng bảy chữ, cô đọng, thường gieo vần ở câu 1, 2, 4.',
        s: ['Thất ngôn bát cú Đường luật', 'Ngũ ngôn tứ tuyệt', 'Tự do'] },
      { y: 'số chữ mỗi dòng không đều nhau, số dòng mỗi khổ cũng không cố định, không theo niêm luật', d: 'Thơ tự do',
        v: 'Thơ tự do không bị ràng buộc số chữ, số dòng, vần và nhịp cố định; nhịp điệu đi theo cảm xúc.',
        s: ['Lục bát', 'Thất ngôn bát cú', 'Song thất lục bát'] },
      { y: 'hai dòng bảy chữ rồi tới một dòng sáu chữ và một dòng tám chữ, lặp lại theo khổ', d: 'Song thất lục bát',
        v: 'Mỗi khổ gồm hai câu bảy chữ + một cặp lục bát; thể thơ thuần Việt, hợp với giọng ngâm ngợi tâm trạng.',
        s: ['Lục bát', 'Thất ngôn bát cú', 'Tự do'] },
      { y: 'mỗi dòng 5 chữ, các khổ đều nhau, nhịp ngắn gọn', d: 'Thơ năm chữ (ngũ ngôn)',
        v: 'Mỗi dòng năm tiếng, nhịp 2/3 hoặc 3/2, thường dùng để kể và tả.',
        s: ['Thơ bốn chữ', 'Lục bát', 'Thất ngôn tứ tuyệt'] }
    ]);
    return MC(R, `Một văn bản thơ có đặc điểm: ${it.y}. Văn bản đó thuộc thể thơ nào?`, it,
      'Câu nhận diện thể thơ là câu số 1 của phần Đọc hiểu — chỉ cần ĐẾM SỐ CHỮ mỗi dòng là xong, '
      + 'không được bỏ trống.');
  } },

{ ma: 'van-phuongthuc', chuong: 'Đọc hiểu', muc: 1, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { y: 'kể lại diễn biến một chuỗi sự việc có nhân vật, có mở đầu và kết thúc', d: 'Tự sự',
        v: 'Tự sự là trình bày chuỗi sự việc, sự việc này dẫn đến sự việc kia rồi đi tới kết thúc.',
        s: ['Miêu tả', 'Biểu cảm', 'Nghị luận'] },
      { y: 'dùng ngôn ngữ tái hiện hình dáng, màu sắc, âm thanh để người đọc hình dung được đối tượng', d: 'Miêu tả',
        v: 'Miêu tả giúp người đọc "nhìn thấy" sự vật, con người, cảnh vật qua chi tiết cụ thể.',
        s: ['Tự sự', 'Thuyết minh', 'Nghị luận'] },
      { y: 'trực tiếp bộc lộ tình cảm, cảm xúc của người viết trước một đối tượng', d: 'Biểu cảm',
        v: 'Biểu cảm nhằm bày tỏ tình cảm, cảm xúc, thái độ chứ không nhằm kể hay tả.',
        s: ['Tự sự', 'Miêu tả', 'Thuyết minh'] },
      { y: 'nêu luận điểm rồi dùng lí lẽ và dẫn chứng để thuyết phục người đọc về một quan điểm', d: 'Nghị luận',
        v: 'Nghị luận dùng lí lẽ và bằng chứng để làm sáng tỏ một vấn đề và thuyết phục người đọc.',
        s: ['Thuyết minh', 'Biểu cảm', 'Tự sự'] },
      { y: 'cung cấp tri thức khách quan về đặc điểm, cấu tạo, công dụng của một sự vật, hiện tượng', d: 'Thuyết minh',
        v: 'Thuyết minh giới thiệu tri thức chính xác, khách quan, không bộc lộ cảm xúc cá nhân.',
        s: ['Nghị luận', 'Miêu tả', 'Biểu cảm'] }
    ]);
    return MC(R, `Một đoạn trích ${it.y}. Đoạn trích sử dụng phương thức biểu đạt chính nào?`, it,
      'Sáu phương thức: tự sự · miêu tả · biểu cảm · nghị luận · thuyết minh · hành chính công vụ. '
      + 'Đề chỉ hỏi phương thức CHÍNH nên chọn cái chiếm dung lượng lớn nhất.');
  } },

{ ma: 'van-lienket', chuong: 'Tiếng Việt', muc: 2, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { y: 'Lan rất chăm học. Cô bé luôn làm hết bài tập trước khi đến lớp.', d: 'Phép thế',
        v: '"Cô bé" ở câu sau thay thế cho "Lan" ở câu trước — dùng từ ngữ khác thay cho từ đã có để tránh lặp.',
        s: ['Phép lặp', 'Phép nối', 'Phép liên tưởng'] },
      { y: 'Sách mở ra cho ta chân trời mới. Sách là người bạn không bao giờ phản bội.', d: 'Phép lặp',
        v: 'Từ "sách" được lặp lại ở đầu cả hai câu, vừa liên kết vừa nhấn mạnh đối tượng bàn luận.',
        s: ['Phép thế', 'Phép nối', 'Phép liên tưởng'] },
      { y: 'Trời mưa rất to. Tuy nhiên, buổi lễ vẫn diễn ra đúng giờ.', d: 'Phép nối',
        v: '"Tuy nhiên" là từ nối biểu thị quan hệ tương phản giữa hai câu.',
        s: ['Phép thế', 'Phép lặp', 'Phép liên tưởng'] },
      { y: 'Cả cánh đồng vàng rực. Lúa trĩu bông, bờ ruộng thơm mùi rơm mới.', d: 'Phép liên tưởng',
        v: '"Cánh đồng – lúa – bờ ruộng – rơm" cùng một trường nghĩa nên móc nối các câu lại với nhau.',
        s: ['Phép thế', 'Phép nối', 'Phép lặp'] }
    ]);
    return MC(R, `Xác định phép liên kết được dùng giữa hai câu sau:\n\n"${it.y}"`, it,
      'Bốn phép liên kết hình thức: LẶP (giữ nguyên từ) · THẾ (thay bằng từ khác) · '
      + 'NỐI (dùng quan hệ từ) · LIÊN TƯỞNG (dùng từ cùng trường nghĩa).');
  } },

{ ma: 'van-phongcach', chuong: 'Đọc hiểu', muc: 2, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { y: 'một bài báo đưa tin về tình hình xuất khẩu gạo, có số liệu và trích lời chuyên gia', d: 'Phong cách ngôn ngữ báo chí',
        v: 'Báo chí: thông tin thời sự, ngắn gọn, sinh động, có tính hấp dẫn và xác thực.',
        s: ['Phong cách ngôn ngữ khoa học', 'Phong cách ngôn ngữ nghệ thuật', 'Phong cách ngôn ngữ hành chính'] },
      { y: 'một đoạn trong truyện ngắn tả cảnh chiều tà với nhiều hình ảnh giàu sức gợi', d: 'Phong cách ngôn ngữ nghệ thuật',
        v: 'Nghệ thuật: tính hình tượng, tính truyền cảm và tính cá thể hoá trong cách dùng từ.',
        s: ['Phong cách ngôn ngữ báo chí', 'Phong cách ngôn ngữ chính luận', 'Phong cách ngôn ngữ sinh hoạt'] },
      { y: 'một đoạn trong bài phát biểu kêu gọi thanh niên sống có lí tưởng, lập luận chặt chẽ', d: 'Phong cách ngôn ngữ chính luận',
        v: 'Chính luận: công khai bày tỏ quan điểm chính trị – xã hội, lập luận chặt chẽ, giàu sức thuyết phục.',
        s: ['Phong cách ngôn ngữ nghệ thuật', 'Phong cách ngôn ngữ khoa học', 'Phong cách ngôn ngữ sinh hoạt'] },
      { y: 'một đoạn giải thích cơ chế quang hợp của cây xanh, dùng thuật ngữ chính xác', d: 'Phong cách ngôn ngữ khoa học',
        v: 'Khoa học: tính trừu tượng khái quát, tính lí trí logic và tính khách quan phi cá thể.',
        s: ['Phong cách ngôn ngữ báo chí', 'Phong cách ngôn ngữ chính luận', 'Phong cách ngôn ngữ nghệ thuật'] },
      { y: 'một đoạn nhật kí ghi lại tâm sự trong ngày, dùng nhiều khẩu ngữ', d: 'Phong cách ngôn ngữ sinh hoạt',
        v: 'Sinh hoạt: tính cụ thể, tính cảm xúc và tính cá thể; dùng nhiều từ ngữ đời thường.',
        s: ['Phong cách ngôn ngữ nghệ thuật', 'Phong cách ngôn ngữ báo chí', 'Phong cách ngôn ngữ hành chính'] }
    ]);
    return MC(R, `Ngữ liệu là ${it.y}. Ngữ liệu thuộc phong cách ngôn ngữ nào?`, it,
      'Sáu phong cách: sinh hoạt · nghệ thuật · báo chí · chính luận · khoa học · hành chính. '
      + 'Nhận diện qua MỤC ĐÍCH giao tiếp và lớp từ ngữ được dùng.');
  } },

{ ma: 'van-thanhngu', chuong: 'Tiếng Việt', muc: 2, dang: 'mc',
  tao(R) {
    const it = R.chon([
      { y: 'Nước đổ lá khoai', d: 'Khuyên bảo mà người nghe không tiếp thu, mọi lời nói đều vô ích',
        v: 'Nước rơi trên lá khoai thì trôi tuột đi, không thấm — ví lời khuyên không lọt tai người nghe.',
        s: ['Làm việc gì cũng phải kiên trì mới thành công', 'Của cải làm ra dễ dàng thì cũng mất nhanh', 'Người hiền lành thường bị bắt nạt'] },
      { y: 'Ăn cây nào rào cây ấy', d: 'Hưởng lợi từ đâu thì phải có trách nhiệm giữ gìn, bảo vệ nơi đó',
        v: 'Đề cao lòng biết ơn và tinh thần trách nhiệm với nơi mình gắn bó.',
        s: ['Sống ích kỉ chỉ lo cho bản thân', 'Làm việc gì cũng phải có kế hoạch', 'Đoàn kết thì tạo nên sức mạnh'] },
      { y: 'Góp gió thành bão', d: 'Những cái nhỏ tích lại lâu ngày sẽ tạo nên sức mạnh lớn',
        v: 'Đề cao sự tích luỹ bền bỉ và sức mạnh của tập thể.',
        s: ['Làm việc lớn thì không cần chú ý tiểu tiết', 'Nói nhiều mà làm ít', 'Gặp may mắn bất ngờ'] },
      { y: 'Đứng núi này trông núi nọ', d: 'Không bằng lòng với cái mình đang có, luôn dòm ngó nơi khác',
        v: 'Phê phán thái độ thiếu kiên định, thiếu chuyên tâm.',
        s: ['Có tầm nhìn xa trông rộng', 'Biết vươn lên trong cuộc sống', 'Sống chan hoà với mọi người'] },
      { y: 'Uống nước nhớ nguồn', d: 'Được hưởng thành quả thì phải nhớ ơn người tạo ra thành quả đó',
        v: 'Truyền thống đạo lí về lòng biết ơn của dân tộc Việt Nam.',
        s: ['Phải biết tiết kiệm nước sạch', 'Làm việc gì cũng cần tìm hiểu kỹ', 'Sống phải có chí tiến thủ'] }
    ]);
    return MC(R, `Thành ngữ, tục ngữ "${it.y}" có nghĩa là gì?`, it,
      'Câu giải nghĩa thành ngữ hay xuất hiện ở phần Đọc hiểu. Bám vào NGHĨA BÓNG (bài học rút ra), '
      + 'đừng giải theo nghĩa đen của từng chữ.');
  } }

]);

})();
