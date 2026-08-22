/* ============================================================
   VẬN DỤNG CAO KHỐI XÃ HỘI — ĐÚNG BA DẠNG ĐỀ THẬT HAY RA
   Trước đây mức 4 của Sử – Địa – GDKT gần như chỉ là câu "phát biểu
   nào đúng", tức vẫn là nhận biết một mệnh đề. Đề thật thì khác:
     · Lịch sử  — cho một đoạn TƯ LIỆU rồi hỏi rút ra được điều gì
     · Địa lí   — cho BẢNG SỐ LIỆU, phải tính rồi mới nhận xét được,
                  hoặc hỏi dạng biểu đồ thích hợp nhất
     · GDKT&PL  — TÌNH HUỐNG nhiều chủ thể, phải xác định ai vi phạm
   Ba dạng này bắt xử lí thông tin mới chứ không nhớ lại kiến thức cũ.
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {};

(function () {
const S = TD.soVN;
const T = TD.lamTron;
const D = TD.dapSo;
/* Khuôn trắc nghiệm dùng chung của khối xã hội: một phương án đúng + ba nhiễu đã soạn sẵn */
const MC = (R, de, it, meo) => {
  const opts = TD.xaoR(R, [it.d].concat(it.s));
  const loai = TD.khoiLoai(opts, it.d, it.sv, 'không phù hợp với dữ kiện đề đưa ra.');
  return { q: de, opts: opts, ans: opts.indexOf(it.d),
    giai: `Đáp án đúng: ${it.d}\n${it.v}\n\nVì sao các phương án còn lại bị loại:\n${loai}`,
    meo: meo };
};

/* ==========================================================
   LỊCH SỬ — ĐỌC TƯ LIỆU RÚT RA NHẬN ĐỊNH
   ========================================================== */
const TU_LIEU = [
  { cd: 'Cách mạng tháng Tám',
    tl: '"Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thật đã thành một nước tự do độc lập. '
      + 'Toàn thể dân tộc Việt Nam quyết đem tất cả tinh thần và lực lượng, tính mạng và của cải để giữ vững quyền tự do, độc lập ấy."',
    ng: '(Hồ Chí Minh, <i>Tuyên ngôn Độc lập</i>, 2 – 9 – 1945)',
    d: 'Khẳng định nền độc lập là kết quả tất yếu của lịch sử, đồng thời tuyên bố quyết tâm bảo vệ nền độc lập ấy',
    s: ['Kêu gọi các nước lớn công nhận Việt Nam là thành viên của Liên hợp quốc',
        'Xác định con đường đi lên chủ nghĩa xã hội ở miền Bắc sau năm 1954',
        'Tuyên bố xoá bỏ hoàn toàn chế độ phong kiến và chia lại ruộng đất cho nông dân',
        'Mở đầu cuộc kháng chiến chống thực dân Pháp trên phạm vi cả nước'],
    v: 'Câu "sự thật đã thành một nước tự do độc lập" khẳng định độc lập là một THỰC TẾ đã giành được, '
      + 'còn vế sau là lời tuyên bố quyết tâm GIỮ VỮNG nền độc lập đó. Hai vế gộp lại chính là tư tưởng cốt lõi của bản Tuyên ngôn.' },

  { cd: 'Kháng chiến chống Pháp',
    tl: '"Chúng ta muốn hoà bình, chúng ta phải nhân nhượng. Nhưng chúng ta càng nhân nhượng, thực dân Pháp càng lấn tới, '
      + 'vì chúng quyết tâm cướp nước ta lần nữa! Không! Chúng ta thà hi sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ."',
    ng: '(Hồ Chí Minh, <i>Lời kêu gọi toàn quốc kháng chiến</i>, 19 – 12 – 1946)',
    d: 'Kháng chiến là lựa chọn bắt buộc sau khi mọi nỗ lực hoà bình đã bị phía Pháp khước từ',
    s: ['Ta chủ trương dùng bạo lực cách mạng ngay từ đầu để giành chính quyền',
        'Việt Nam từ chối mọi hình thức thương lượng với các nước phương Tây',
        'Cuộc kháng chiến bùng nổ do sức ép của phong trào giải phóng dân tộc thế giới',
        'Ta phát động kháng chiến để hưởng ứng lời kêu gọi của Liên hợp quốc'],
    v: 'Trình tự lập luận trong tư liệu rất rõ: muốn hoà bình → đã nhân nhượng → Pháp lấn tới → buộc phải đứng lên. '
      + 'Đó là cách khẳng định tính CHÍNH NGHĨA và tính BẤT ĐẮC DĨ của cuộc kháng chiến.' },

  { cd: 'Công cuộc Đổi mới',
    tl: '"Đảng phải luôn luôn xuất phát từ thực tế, tôn trọng và hành động theo quy luật khách quan. '
      + 'Năng lực nhận thức và hành động theo quy luật là điều kiện bảo đảm sự lãnh đạo đúng đắn của Đảng."',
    ng: '(Văn kiện Đại hội đại biểu toàn quốc lần thứ VI của Đảng, 12 – 1986)',
    d: 'Thừa nhận sai lầm chủ quan, duy ý chí trước đó và xác lập nguyên tắc nhìn thẳng vào sự thật khi hoạch định đường lối',
    s: ['Chủ trương xoá bỏ vai trò lãnh đạo của Đảng đối với nền kinh tế',
        'Quyết định chuyển hẳn sang nền kinh tế thị trường tự do không có quản lí của Nhà nước',
        'Đặt mục tiêu hoàn thành công nghiệp hoá ngay trong kế hoạch 5 năm 1986 – 1990',
        'Khẳng định ưu tiên phát triển công nghiệp nặng làm khâu đột phá'],
    v: 'Cụm "xuất phát từ thực tế", "theo quy luật khách quan" là lời phê phán gián tiếp bệnh chủ quan, duy ý chí — '
      + 'nguyên nhân của khủng hoảng kinh tế – xã hội trước Đổi mới. Đây chính là bài học đầu tiên mà Đại hội VI rút ra.' },

  { cd: 'Liên hợp quốc',
    tl: '"Mọi thành viên giải quyết các tranh chấp quốc tế của họ bằng biện pháp hoà bình, sao cho không tổn hại đến hoà bình, '
      + 'an ninh quốc tế và công lí."',
    ng: '(Trích Điều 2, <i>Hiến chương Liên hợp quốc</i>, 1945)',
    d: 'Xác lập giải quyết tranh chấp bằng biện pháp hoà bình thành một nguyên tắc bắt buộc của quan hệ quốc tế',
    s: ['Cho phép các nước lớn can thiệp vào công việc nội bộ của nước nhỏ khi cần giữ hoà bình',
        'Trao cho Đại hội đồng quyền quyết định mọi vấn đề an ninh quốc tế',
        'Quy định các nước thành viên phải từ bỏ hoàn toàn lực lượng vũ trang',
        'Thừa nhận chiến tranh là công cụ hợp pháp để thay đổi biên giới quốc gia'],
    v: 'Đây là một trong các nguyên tắc hoạt động cơ bản của Liên hợp quốc. '
      + 'Nó biến việc "giải quyết hoà bình" từ mong muốn đạo đức thành nghĩa vụ pháp lí của quốc gia thành viên — '
      + 'cũng chính là cơ sở để Việt Nam đấu tranh bảo vệ chủ quyền ở Biển Đông bằng luật pháp quốc tế.' },

  { cd: 'ASEAN',
    tl: '"Các quốc gia thành viên tôn trọng độc lập, chủ quyền, bình đẳng, toàn vẹn lãnh thổ và bản sắc dân tộc của tất cả các quốc gia; '
      + 'không can thiệp vào công việc nội bộ của nhau; giải quyết bất đồng bằng biện pháp hoà bình."',
    ng: '(Trích <i>Hiệp ước Bali</i> – Hiệp ước Thân thiện và Hợp tác ở Đông Nam Á, 1976)',
    d: 'Đặt nền tảng pháp lí cho quan hệ giữa các nước Đông Nam Á, mở đường cho ASEAN phát triển thành tổ chức khu vực vững mạnh',
    s: ['Thành lập một liên minh quân sự chung của các nước Đông Nam Á',
        'Chấm dứt hoàn toàn ảnh hưởng của các nước lớn tại khu vực Đông Nam Á',
        'Kết nạp ngay lập tức toàn bộ mười nước Đông Nam Á vào tổ chức ASEAN',
        'Thống nhất đồng tiền chung và xoá bỏ hàng rào thuế quan trong khu vực'],
    v: 'Hiệp ước Bali 1976 xác lập các nguyên tắc cơ bản trong quan hệ giữa các nước ASEAN. '
      + 'Nhờ có bộ nguyên tắc này mà ASEAN từ chỗ còn nghi kị nhau đã trở thành tổ chức hợp tác toàn diện; '
      + 'ba trụ cột của Cộng đồng ASEAN 2015 đều kế thừa tinh thần đó.' },

  { cd: 'Kháng chiến chống Mỹ',
    tl: '"Hoa Kỳ và các nước khác tôn trọng độc lập, chủ quyền, thống nhất, toàn vẹn lãnh thổ của nước Việt Nam. '
      + 'Hoa Kỳ rút hết quân đội của mình và quân các nước đồng minh… ra khỏi miền Nam Việt Nam."',
    ng: '(Trích <i>Hiệp định Pari về chấm dứt chiến tranh, lập lại hoà bình ở Việt Nam</i>, 27 – 1 – 1973)',
    d: 'Tạo ra thời cơ chiến lược khi so sánh lực lượng trên chiến trường thay đổi có lợi cho cách mạng miền Nam',
    s: ['Chấm dứt ngay lập tức sự tồn tại của chính quyền Sài Gòn',
        'Thống nhất đất nước về mặt nhà nước ngay trong năm 1973',
        'Buộc Hoa Kỳ bồi thường toàn bộ thiệt hại chiến tranh cho Việt Nam',
        'Quy định tổ chức tổng tuyển cử tự do trên cả nước dưới sự giám sát của Liên hợp quốc'],
    v: 'Hiệp định Pari buộc Mỹ rút quân nhưng KHÔNG xoá bỏ chính quyền Sài Gòn. '
      + 'Vì thế ý nghĩa lớn nhất của nó là làm thay đổi tương quan lực lượng — "Mỹ cút" mở đường cho "nguỵ nhào" — '
      + 'tạo thời cơ để ta tiến hành Tổng tiến công mùa Xuân 1975.' }
];

TD.GEN.su = (TD.GEN.su || []).concat([

{ ma: 'su-vdc-tulieu', chuong: 'Tư liệu lịch sử', muc: 4, dang: 'mc',
  tao(R) {
    const x = R.chon(TU_LIEU);
    const q = MC(R, `Đọc đoạn tư liệu sau:<br><div class="giai" style="font-style:italic">${x.tl}<br>`
      + `<span style="font-style:normal;font-size:12.6px;color:var(--chu3)">${x.ng}</span></div>`
      + `Nội dung nào sau đây <b>phản ánh đúng nhất</b> ý nghĩa của đoạn tư liệu trên?`,
      { d: x.d, s: R.chonNhieu(x.s, 3), v: x.v },
      'Dạng câu tư liệu: KHÔNG được chọn theo trí nhớ về sự kiện, phải bám vào chính chữ trong đoạn trích. '
      + 'Phương án sai thường đúng về lịch sử nhưng KHÔNG có trong tư liệu — đó là bẫy phổ biến nhất.');
    return q ? Object.assign(q, { chuong: x.cd }) : null;
  } },

{ ma: 'su-vdc-tulieu-ds', chuong: 'Tư liệu lịch sử', muc: 4, dang: 'ds',
  tao(R) {
    const x = R.chon(TU_LIEU);
    const khac = TU_LIEU.filter(y => y.cd !== x.cd);
    if (khac.length < 2) return null;
    const y1 = R.chon(khac);
    const ta = [
      { t: `Đoạn tư liệu trên ${x.d.charAt(0).toLowerCase() + x.d.slice(1)}.`, a: true,
        v: x.v },
      { t: `Nội dung tư liệu cho thấy ${R.chon(x.s).charAt(0).toLowerCase() + R.chon(x.s).slice(1)}.`, a: false,
        v: 'Nội dung này không hề xuất hiện trong đoạn trích — đây là kiểu phương án "đúng ở đâu đó nhưng sai ở đây".' },
      { t: `Đoạn tư liệu này gắn với chủ đề <b>${x.cd}</b> trong chương trình Lịch sử 12.`, a: true,
        v: `Xuất xứ ${x.ng.replace(/[()]/g, '')} cho biết tư liệu thuộc chủ đề ${x.cd}.` },
      { t: `Đoạn tư liệu này được trích từ ${y1.ng.replace(/[()]/g, '').split(',')[0].replace('Trích ', '')}.`, a: false,
        v: `Sai xuất xứ. Tư liệu đúng là ${x.ng.replace(/[()]/g, '')}.` }
    ];
    const t = TD.xaoR(R, ta);
    return {
      chuong: x.cd,
      q: `Đọc đoạn tư liệu sau:<br><div class="giai" style="font-style:italic">${x.tl}<br>`
        + `<span style="font-style:normal;font-size:12.6px;color:var(--chu3)">${x.ng}</span></div>`
        + `Xét tính đúng/sai của từng nhận định:`,
      items: t.map(z => ({ t: z.t, a: z.a })),
      giai: t.map((z, i) => `Ý ${'abcd'[i]}) ${z.a ? 'ĐÚNG' : 'SAI'} — ${z.v}`).join('\n'),
      meo: 'Câu đúng/sai về tư liệu luôn có ít nhất một ý sai về XUẤT XỨ và một ý sai vì "nói điều tư liệu không nói". '
        + 'Đọc tư liệu hai lần trước khi xét bất kì ý nào.'
    };
  } }

]);

/* ==========================================================
   ĐỊA LÍ — BẢNG SỐ LIỆU: tính rồi mới nhận xét được
   ========================================================== */
const BANG = [
  { ten: 'Giá trị xuất khẩu một số mặt hàng của nước ta', dv: 'triệu USD',
    doi: ['Hàng dệt may', 'Giày dép', 'Thuỷ sản', 'Gỗ và sản phẩm gỗ'], min: 2000, max: 40000 },
  { ten: 'Sản lượng một số cây công nghiệp lâu năm của nước ta', dv: 'nghìn tấn',
    doi: ['Cà phê', 'Cao su', 'Hồ tiêu', 'Điều'], min: 100, max: 2000 },
  { ten: 'Số dân thành thị của một số vùng', dv: 'nghìn người',
    doi: ['Đồng bằng sông Hồng', 'Đông Nam Bộ', 'Đồng bằng sông Cửu Long', 'Bắc Trung Bộ'], min: 2000, max: 12000 },
  { ten: 'Sản lượng điện phân theo nguồn của nước ta', dv: 'triệu kWh',
    doi: ['Thuỷ điện', 'Nhiệt điện than', 'Điện khí', 'Năng lượng tái tạo'], min: 5000, max: 130000 },
  { ten: 'Giá trị sản xuất một số ngành công nghiệp', dv: 'tỉ đồng',
    doi: ['Khai khoáng', 'Chế biến – chế tạo', 'Sản xuất điện', 'Cấp nước – xử lí rác'], min: 20000, max: 900000 }
];

TD.GEN.dia = (TD.GEN.dia || []).concat([

{ ma: 'dia-vdc-bangsolieu', chuong: 'Kỹ năng', muc: 4, dang: 'tln',
  tao(R) {
    const b = R.chon(BANG);
    const n1 = R.nguyen(2010, 2016), n2 = n1 + R.chon([5, 6, 7, 8]);
    const buoc = Math.max(1, Math.round((b.max - b.min) / 40));
    const a = b.doi.map(() => R.nguyen(Math.round(b.min / buoc), Math.round(b.max / buoc)) * buoc);
    const tang = b.doi.map((_, i) => T(a[i] * (1 + R.nguyen(-25, 160) / 100), 0));
    if (tang.some((v, i) => v <= 0 || v === a[i])) return null;
    /* hỏi tốc độ tăng trưởng của một đối tượng, lấy năm đầu = 100% */
    const k = R.nguyen(0, b.doi.length - 1);
    const td = T(tang[k] / a[k] * 100, 2);
    const bang = `<div class="cuon-ngang"><table class="kq">
      <tr><th>Đối tượng</th><th>Năm ${n1}</th><th>Năm ${n2}</th></tr>`
      + b.doi.map((d, i) => `<tr><td>${d}</td><td>${S(a[i])}</td><td>${S(tang[i])}</td></tr>`).join('')
      + `</table></div>`;
    return {
      q: `Cho bảng số liệu: <b>${b.ten}</b> <i>(Đơn vị: ${b.dv})</i>${bang}`
        + `Lấy năm ${n1} = 100%, tính tốc độ tăng trưởng của <b>${b.doi[k]}</b> năm ${n2}. `
        + `(đơn vị %, làm tròn đến hàng phần trăm)`,
      ans: D(td, 2),
      giai: `Bước 1 — công thức tốc độ tăng trưởng khi lấy năm gốc = 100%:\n`
        + `  Tốc độ tăng trưởng (%) = (giá trị năm sau ÷ giá trị năm gốc) × 100\n`
        + `Bước 2 — thay số cho ${b.doi[k]}:\n`
        + `  = ${S(tang[k])} ÷ ${S(a[k])} × 100 = ${D(td, 2)}%\n`
        + `Bước 3 — đọc kết quả: ${td > 100
            ? `lớn hơn 100% nên ${b.doi[k]} TĂNG ${S(T(td - 100, 2))}% so với năm ${n1}.`
            : `nhỏ hơn 100% nên ${b.doi[k]} GIẢM ${S(T(100 - td, 2))}% so với năm ${n1}.`}\n`
        + `Đối chiếu cả bảng: ${b.doi.map((d, i) => `${d} ${S(T(tang[i] / a[i] * 100, 1))}%`).join(' · ')}`,
      meo: 'Phân biệt hai con số dễ nhầm: TỐC ĐỘ TĂNG TRƯỞNG lấy năm gốc = 100% (kết quả 145% nghĩa là tăng 45%), '
        + 'còn TỐC ĐỘ TĂNG lấy năm gốc = 0% (kết quả 45%). Đề hỏi kiểu nào thì trả lời kiểu đó. '
        + 'Bấm nhanh trên Casio: nhập giá trị năm sau ÷ giá trị năm gốc × 100 = , rồi dùng phím ▲ sửa số cho các dòng còn lại.'
    };
  } },

{ ma: 'dia-vdc-chonbieudo', chuong: 'Kỹ năng', muc: 4, dang: 'mc',
  tao(R) {
    const b = R.chon(BANG);
    const n = R.chon([[2, 'hai'], [3, 'ba'], [4, 'bốn']]);
    const nam = []; let y = R.nguyen(2010, 2015);
    for (let i = 0; i < n[0]; i++) { nam.push(y); y += R.chon([2, 3, 5]); }
    const yeuCau = R.chon([
      { t: 'thể hiện <b>quy mô và cơ cấu</b>', d: nam.length <= 3 ? 'Biểu đồ tròn' : 'Biểu đồ miền',
        v: 'Đề yêu cầu QUY MÔ và CƠ CẤU, lại chỉ có ' + nam.length + ' mốc thời gian ⇒ '
          + (nam.length <= 3 ? 'biểu đồ TRÒN (mỗi năm một hình tròn, bán kính khác nhau thể hiện quy mô).'
                             : 'biểu đồ MIỀN vì từ 4 mốc trở lên tròn sẽ rối.') },
      { t: 'thể hiện <b>sự chuyển dịch cơ cấu</b>', d: 'Biểu đồ miền',
        v: 'Từ khoá CHUYỂN DỊCH CƠ CẤU qua nhiều năm ⇒ biểu đồ MIỀN. Nếu chỉ có 1–3 năm mới dùng tròn.' },
      { t: 'thể hiện <b>tốc độ tăng trưởng</b>', d: 'Biểu đồ đường',
        v: 'Từ khoá TỐC ĐỘ TĂNG TRƯỞNG ⇒ biểu đồ ĐƯỜNG, số liệu phải quy về % với năm gốc = 100%.' },
      { t: 'so sánh <b>giá trị tuyệt đối</b> giữa các đối tượng', d: 'Biểu đồ cột',
        v: 'So sánh độ lớn giữa các đối tượng qua vài mốc năm ⇒ biểu đồ CỘT (cột ghép).' }
    ]);
    const VISAO = {
      'Biểu đồ tròn': 'chỉ dùng khi thể hiện cơ cấu ở 1–3 mốc thời gian; nhiều mốc hơn thì hình tròn chồng chất, không đọc được xu hướng',
      'Biểu đồ miền': 'dành riêng cho SỰ CHUYỂN DỊCH cơ cấu qua nhiều năm (từ 4 mốc trở lên), tổng luôn quy về 100%',
      'Biểu đồ đường': 'dành cho TỐC ĐỘ TĂNG TRƯỞNG hoặc diễn biến theo thời gian, số liệu phải quy về % với năm gốc = 100%',
      'Biểu đồ cột': 'dùng để SO SÁNH độ lớn giữa các đối tượng, không thể hiện được cơ cấu hay tỉ trọng',
      'Biểu đồ kết hợp cột và đường': 'chỉ dùng khi bảng có HAI đơn vị đo khác nhau cần vẽ chung một hệ trục'
    };
    const moi = ['Biểu đồ tròn', 'Biểu đồ miền', 'Biểu đồ đường', 'Biểu đồ cột', 'Biểu đồ kết hợp cột và đường']
      .filter(x => x !== yeuCau.d);
    return Object.assign(
      MC(R, `Cho bảng số liệu về <b>${b.ten}</b> của nước ta trong ${n[1]} năm ${nam.join(', ')} `
        + `<i>(Đơn vị: ${b.dv})</i>, gồm các đối tượng: ${b.doi.join(', ')}.<br>`
        + `Theo bảng số liệu, để ${yeuCau.t} ${b.ten.toLowerCase()} giai đoạn ${nam[0]} – ${nam[nam.length - 1]}, `
        + `dạng biểu đồ nào sau đây là <b>thích hợp nhất</b>?`,
        { d: yeuCau.d, s: R.chonNhieu(moi, 3), v: yeuCau.v, sv: VISAO },
        'Câu chọn biểu đồ ăn điểm bằng TỪ KHOÁ, không cần nhìn số: '
        + '"cơ cấu / tỉ trọng" + 1–3 năm → TRÒN · "chuyển dịch cơ cấu" nhiều năm → MIỀN · '
        + '"tốc độ tăng trưởng / tốc độ phát triển" → ĐƯỜNG · "so sánh / tình hình" → CỘT · '
        + 'hai đơn vị khác nhau → KẾT HỢP.'),
      { chuong: 'Kỹ năng' });
  } }

]);

/* ==========================================================
   GDKT & PHÁP LUẬT — TÌNH HUỐNG NHIỀU CHỦ THỂ
   ========================================================== */
const TINH_HUONG = [
  { cd: 'Quyền & nghĩa vụ',
    mo: 'Anh K là chủ một cửa hàng điện máy. Nghi ngờ chị H lấy trộm hàng, anh K giữ chị H trong kho suốt ba giờ để tra hỏi. '
      + 'Bà M là mẹ chị H biết chuyện liền đến chửi bới và đập vỡ tủ kính cửa hàng. Anh P là bảo vệ đứng nhìn, không can ngăn.',
    hoi: 'Những ai sau đây <b>vừa vi phạm quyền bất khả xâm phạm về thân thể, vừa phải chịu trách nhiệm pháp lí</b>?',
    d: 'Chỉ anh K',
    s: ['Anh K và bà M', 'Anh K, bà M và anh P', 'Bà M và anh P', 'Chỉ bà M'],
    v: 'Chỉ anh K giữ người trái pháp luật ⇒ xâm phạm quyền bất khả xâm phạm về thân thể của chị H. '
      + 'Bà M có vi phạm nhưng là xâm phạm TÀI SẢN (đập vỡ tủ kính) chứ không phải thân thể. '
      + 'Anh P không hành động nên không phải chủ thể vi phạm quyền này.' },

  { cd: 'Quyền & nghĩa vụ',
    mo: 'Chị T thuê nhà của ông S. Do chị T chậm trả tiền thuê một tháng, ông S tự ý mở khoá vào nhà, chuyển hết đồ đạc của chị T ra sân '
      + 'và thay ổ khoá mới. Chị T nhờ anh D là em trai đến, anh D đã đe doạ đánh ông S nếu không mở cửa.',
    hoi: 'Trong tình huống trên, hành vi của ông S <b>trực tiếp xâm phạm</b> quyền nào sau đây của công dân?',
    d: 'Quyền bất khả xâm phạm về chỗ ở',
    s: ['Quyền bất khả xâm phạm về thân thể', 'Quyền được pháp luật bảo hộ về tính mạng, sức khoẻ',
        'Quyền tự do ngôn luận', 'Quyền được bảo đảm an toàn và bí mật thư tín'],
    v: 'Ông S tự ý vào nhà đang cho thuê và thay khoá ⇒ xâm phạm quyền bất khả xâm phạm về CHỖ Ở. '
      + 'Tranh chấp hợp đồng thuê phải giải quyết bằng con đường dân sự, không được tự xử. '
      + 'Anh D đe doạ là hành vi vi phạm riêng, không làm thay đổi bản chất vi phạm của ông S.' },

  { cd: 'Doanh nghiệp – Thuế',
    mo: 'Công ty X kê khai doanh thu thấp hơn thực tế để giảm số thuế phải nộp. Kế toán trưởng là chị N biết nhưng vẫn kí xác nhận. '
      + 'Anh V, nhân viên công ty, phát hiện và tố giác với cơ quan thuế.',
    hoi: 'Hành vi của Công ty X và chị N thể hiện điều gì?',
    d: 'Vi phạm nghĩa vụ nộp thuế của người nộp thuế và phải chịu trách nhiệm pháp lí',
    s: ['Chỉ là vi phạm đạo đức kinh doanh, không bị xử lí theo pháp luật',
        'Quyền tự chủ trong kê khai tài chính của doanh nghiệp',
        'Hành vi hợp pháp vì doanh nghiệp được quyền tối ưu hoá chi phí thuế',
        'Vi phạm hợp đồng lao động giữa công ty và người lao động'],
    v: 'Kê khai sai để giảm thuế là hành vi TRỐN THUẾ — vi phạm nghĩa vụ nộp thuế đầy đủ, đúng hạn. '
      + 'Cần phân biệt với việc tối ưu thuế hợp pháp (áp dụng đúng ưu đãi, khấu trừ). '
      + 'Anh V thực hiện quyền tố cáo, được pháp luật bảo vệ.' },

  { cd: 'Bảo hiểm – An sinh',
    mo: 'Anh Q làm việc theo hợp đồng lao động 24 tháng tại công ty Y nhưng công ty không đóng bảo hiểm xã hội cho anh với lí do '
      + '"anh Q đã có bảo hiểm y tế hộ gia đình". Anh Q khiếu nại lên ban giám đốc nhưng không được giải quyết.',
    hoi: 'Nhận định nào sau đây là <b>đúng</b> về tình huống trên?',
    d: 'Công ty Y vi phạm pháp luật vì bảo hiểm xã hội bắt buộc áp dụng với hợp đồng lao động từ đủ 1 tháng trở lên',
    s: ['Công ty Y làm đúng vì người lao động chỉ cần một loại bảo hiểm',
        'Anh Q phải tự đóng bảo hiểm xã hội vì đó là quyền lợi cá nhân',
        'Bảo hiểm xã hội chỉ bắt buộc với hợp đồng không xác định thời hạn',
        'Việc đóng bảo hiểm xã hội do hai bên tự thoả thuận trong hợp đồng'],
    v: 'Bảo hiểm xã hội bắt buộc là NGHĨA VỤ của cả người sử dụng lao động lẫn người lao động, không phải thoả thuận. '
      + 'Bảo hiểm y tế hộ gia đình là loại hình khác, không thay thế được. '
      + 'Anh Q có quyền khiếu nại tiếp lên cơ quan quản lí lao động hoặc khởi kiện.' },

  { cd: 'Quản lí thu chi',
    mo: 'Gia đình anh B có thu nhập 25 triệu đồng/tháng. Anh B vay tiêu dùng để mua ô tô, mỗi tháng phải trả góp 12 triệu đồng, '
      + 'chi phí sinh hoạt cố định 10 triệu đồng. Anh B không lập quỹ dự phòng vì cho rằng thu nhập ổn định.',
    hoi: 'Rủi ro lớn nhất trong kế hoạch tài chính của gia đình anh B là gì?',
    d: 'Tỉ lệ trả nợ chiếm gần một nửa thu nhập và không có quỹ dự phòng nên mất khả năng chi trả khi thu nhập gián đoạn',
    s: ['Mua ô tô là quyết định sai vì tài sản này luôn mất giá',
        'Chi phí sinh hoạt 10 triệu đồng là quá cao so với thu nhập',
        'Gia đình chưa tham gia bất kì kênh đầu tư sinh lời nào',
        'Vay tiêu dùng luôn là hành vi trái với nguyên tắc quản lí tài chính'],
    v: 'Tính ra: 12 + 10 = 22 triệu, chỉ còn dư 3 triệu/tháng, tức tỉ lệ trả nợ 48% thu nhập (khuyến nghị dưới 30–35%). '
      + 'Nguy hiểm nhất là KHÔNG có quỹ dự phòng — chuẩn mực là 3–6 tháng chi phí thiết yếu. '
      + 'Chỉ cần mất thu nhập một tháng là kế hoạch đổ vỡ.' },

  { cd: 'Tăng trưởng – Phát triển',
    mo: 'Tỉnh Z có tốc độ tăng GDP 9%/năm nhờ mở rộng khai thác khoáng sản và xây dựng nhiều khu công nghiệp. '
      + 'Cùng lúc đó, diện tích rừng giảm 12%, ba con sông trong tỉnh bị ô nhiễm nặng, và khoảng cách thu nhập giữa nhóm giàu nhất '
      + 'với nhóm nghèo nhất tăng gấp đôi trong 5 năm.',
    hoi: 'Nhận định nào sau đây <b>đúng nhất</b> về tình hình của tỉnh Z?',
    d: 'Tỉnh Z có tăng trưởng kinh tế nhưng chưa đạt phát triển bền vững vì thiếu cả trụ cột xã hội lẫn môi trường',
    s: ['Tỉnh Z đã đạt phát triển bền vững vì GDP tăng liên tục ở mức cao',
        'Tăng trưởng kinh tế và phát triển bền vững là hai khái niệm đồng nhất nên tỉnh Z đã phát triển',
        'Tỉnh Z chỉ cần khắc phục vấn đề môi trường là đạt phát triển bền vững',
        'Bất bình đẳng thu nhập là hệ quả tất yếu nên không ảnh hưởng tới đánh giá phát triển'],
    v: 'Phát triển bền vững đứng trên BA trụ cột: kinh tế – xã hội – môi trường. '
      + 'Tỉnh Z chỉ đạt trụ cột kinh tế; rừng giảm và sông ô nhiễm là hỏng trụ cột môi trường, '
      + 'khoảng cách giàu nghèo tăng gấp đôi là hỏng trụ cột xã hội. '
      + 'Tăng trưởng chỉ là điều kiện CẦN, không phải điều kiện ĐỦ của phát triển.' }
];

TD.GEN.gdkt = (TD.GEN.gdkt || []).concat([

{ ma: 'gdkt-vdc-tinhhuong-nhieu', chuong: 'Tình huống pháp luật', muc: 4, dang: 'mc',
  tao(R) {
    const x = R.chon(TINH_HUONG);
    const q = MC(R, `<div class="giai" style="font-style:normal">${x.mo}</div>${x.hoi}`,
      { d: x.d, s: R.chonNhieu(x.s, 3), v: x.v },
      'Câu tình huống nhiều chủ thể: gạch chân TỪNG NGƯỜI và hành vi của họ ra nháp trước, '
      + 'rồi mới đối chiếu với câu hỏi. Đề luôn cài thêm người có vi phạm nhưng vi phạm quyền KHÁC '
      + 'với quyền mà câu hỏi đang nhắc tới.');
    return q ? Object.assign(q, { chuong: x.cd }) : null;
  } }

]);

})();
