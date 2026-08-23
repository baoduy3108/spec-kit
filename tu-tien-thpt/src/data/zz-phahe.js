/* ============================================================
   SINH — PHẢ HỆ DỰNG NGẪU NHIÊN
   Ba mẫu phả hệ cũ dùng đúng MỘT sơ đồ cố định, đo ra 800 lượt bốc chỉ
   sinh được 1 hình. Học sinh làm vài lần là thuộc lòng "cặp (6)×(7) ra
   75%" chứ không còn phải đọc hình. Ở đây dựng lại sơ đồ mỗi lần một
   khác: số con mỗi đời, ai bị bệnh, ai kết hôn, giới tính đều bốc lại,
   nhưng vẫn giữ nguyên logic di truyền để suy luận luôn đúng.
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {};

(function () {
const MC = (R, de, it, meo) => {
  const opts = TD.xaoR(R, [it.d].concat(it.s));
  return { q: de, opts: opts, ans: opts.indexOf(it.d),
    giai: `Đáp án đúng: ${it.d}\n${it.v}\n\nVì sao các phương án còn lại bị loại:\n`
      + TD.khoiLoai(opts, it.d, it.sv, 'không khớp với sơ đồ phả hệ.'),
    meo: meo };
};

/* kieu = 'thuong' (gen lặn trên NST thường) · 'x' (gen lặn trên X) */
const dungPhaHe = (R, kieu) => {
  const k1 = R.nguyen(2, 3), k2 = R.nguyen(2, 3), k3 = R.nguyen(2, 3);
  const nguoi = [], cap = [], con = [];
  let dem = 0;
  const them = (doi, x, nam, benh) => {
    const id = String(++dem);
    nguoi.push({ id: id, doi: doi, x: x, nam: nam, benh: benh });
    return id;
  };
  /* ĐỜI I — hai cặp ông bà */
  const a1 = them(1, 1, true, false), a2 = them(1, 2, false, false);
  const b1 = them(1, 4.6, true, false), b2 = them(1, 5.6, false, false);
  cap.push([a1, a2], [b1, b2]);

  /* ĐỜI II — con cặp A. Người kết hôn luôn là con ÚT (đứng sát bên phải)
     để đường nối vợ chồng không cắt ngang các anh chị em. */
  const iBenh = R.nguyen(0, k1 - 2);
  const conA = [];
  for (let i = 0; i < k1; i++) {
    const benh = i === iBenh;
    const cuoi = i === k1 - 1;
    /* thường: người bệnh là NỮ (để loại được giả thiết nằm trên X)
       trên X: người bệnh là NAM (cả phả hệ không có nữ nào bị bệnh) */
    const nam = benh ? (kieu === 'x') : (cuoi ? false : R.chon([true, false]));
    conA.push(them(2, 0.6 + i * 1.0, nam, benh));
  }
  const conB = [];
  for (let i = 0; i < k2; i++) conB.push(them(2, 3.8 + i * 1.0, i === 0 ? true : R.chon([true, false]), false));
  con.push({ cha: a1, me: a2, ds: conA }, { cha: b1, me: b2, ds: conB });
  const me2 = conA[k1 - 1], cha2 = conB[0];
  cap.push([cha2, me2]);

  /* ĐỜI III — con của cặp vừa lập, có đúng một người bị bệnh */
  const jBenh = R.nguyen(0, k3 - 1);
  const conC = [];
  for (let j = 0; j < k3; j++) {
    const benh = j === jBenh;
    const nam = benh ? (kieu === 'x' ? true : R.chon([true, false])) : R.chon([true, false]);
    conC.push(them(3, 3.2 + (j - (k3 - 1) / 2) * 1.1, nam, benh));
  }
  con.push({ cha: cha2, me: me2, ds: conC });

  return {
    hinh: TD.hinhPhaHe(nguoi, cap, con),
    nguoi: nguoi,
    ong: a1, ba: a2, ongB: b1, baB: b2,
    benh2: conA[iBenh], benh3: conC[jBenh],
    cha2: cha2, me2: me2,
    /* in tên cặp vợ chồng theo thứ tự số nhỏ trước cho dễ dò trên hình */
    capA: (+cha2 < +me2 ? cha2 : me2), capB: (+cha2 < +me2 ? me2 : cha2),
    namBenh2: kieu === 'x'
  };
};
const t = id => `(${id})`;

/* gỡ ba mẫu phả hệ cố định cũ, thay bằng bản dựng ngẫu nhiên */
const BO = ['sinh-hinh-phahe', 'sinh-hinh-phahe-x', 'sinh-hinh-phahe-ds'];
TD.GEN.sinh = (TD.GEN.sinh || []).filter(x => BO.indexOf(x.ma) < 0);

TD.GEN.sinh = TD.GEN.sinh.concat([

/* ---------- gen lặn trên NST thường ---------- */
{ ma: 'sinh-hinh-phahe', chuong: 'Di truyền người', muc: 4, dang: 'mc',
  tao(R) {
    const p = dungPhaHe(R, 'thuong');
    const hoi = R.chon(['viTri', 'diHop', 'xacSuat']);
    if (hoi === 'viTri')
      return MC(R, `Cho sơ đồ phả hệ về một bệnh ở người, hình tô đậm là người bị bệnh:${p.hinh}`
        + `Bệnh trên do loại gen nào quy định?`,
        { d: 'Gen lặn nằm trên nhiễm sắc thể thường',
          s: ['Gen trội nằm trên nhiễm sắc thể thường', 'Gen lặn nằm trên vùng không tương đồng của nhiễm sắc thể X', 'Gen trội nằm trên vùng không tương đồng của nhiễm sắc thể X'],
          sv: { 'Gen trội nằm trên nhiễm sắc thể thường': `nếu là gen trội thì người bệnh phải có ít nhất một bố hoặc mẹ bị bệnh — cặp ${t(p.ong)} × ${t(p.ba)} đều bình thường mà sinh con ${t(p.benh2)} bị bệnh`,
                'Gen lặn nằm trên vùng không tương đồng của nhiễm sắc thể X': `người bệnh ${t(p.benh2)} là NỮ nên phải nhận allele bệnh từ cả bố lẫn mẹ; bố ${t(p.ong)} sẽ phải bị bệnh, nhưng trên hình bố bình thường`,
                'Gen trội nằm trên vùng không tương đồng của nhiễm sắc thể X': 'vừa mâu thuẫn với việc bố mẹ bình thường sinh con bệnh, vừa mâu thuẫn với giới tính của người bệnh' },
          v: `Hai căn cứ dùng lần lượt:\n`
            + `① Cặp ${t(p.ong)} × ${t(p.ba)} đều BÌNH THƯỜNG mà sinh con ${t(p.benh2)} BỊ BỆNH ⇒ bệnh do gen LẶN.\n`
            + `② Người bệnh ${t(p.benh2)} là NỮ. Nếu gen lặn nằm trên X thì cô ấy phải nhận một allele bệnh từ bố ⇒ bố ${t(p.ong)} phải bị bệnh. `
            + `Nhưng ${t(p.ong)} bình thường ⇒ loại giả thiết nằm trên X.\n`
            + `Vậy gen gây bệnh là gen lặn nằm trên nhiễm sắc thể THƯỜNG.` },
        'Quy trình đọc phả hệ không đổi: ① bố mẹ bình thường sinh con bệnh ⇒ gen LẶN '
        + '② tìm một người NỮ bị bệnh — nếu bố cô ấy bình thường thì loại ngay giả thiết nằm trên X.');
    if (hoi === 'diHop')
      return MC(R, `Cho sơ đồ phả hệ về một bệnh do gen lặn nằm trên nhiễm sắc thể thường quy định:${p.hinh}`
        + `Có bao nhiêu người trong phả hệ chắc chắn có kiểu gen dị hợp?`,
        { d: '4', s: ['2', '3', '5'],
          sv: { '2': 'đếm sót: không chỉ cặp ông bà đời I mà cả cặp vợ chồng đời II sinh con bệnh cũng đều dị hợp',
                '3': 'đếm sót một người trong cặp vợ chồng đời II — cả hai đều phải mang allele lặn',
                '5': 'đếm thừa: người bị bệnh mang hai allele lặn nên là ĐỒNG hợp, không phải dị hợp' },
          v: `Chắc chắn dị hợp là những người BÌNH THƯỜNG mà sinh ra con ĐỒNG HỢP LẶN:\n`
            + `· ${t(p.ong)} và ${t(p.ba)} bình thường, sinh con ${t(p.benh2)} bị bệnh ⇒ mỗi người cho một allele lặn ⇒ cả hai dị hợp.\n`
            + `· ${t(p.cha2)} và ${t(p.me2)} bình thường, sinh con ${t(p.benh3)} bị bệnh ⇒ cả hai cũng dị hợp.\n`
            + `Tổng cộng 4 người. Hai người bị bệnh là đồng hợp lặn nên không tính; những người bình thường còn lại `
            + `có thể đồng hợp trội hoặc dị hợp nên không xác định chắc chắn được.` },
        'Chỉ hai nguồn cho kiểu gen CHẮC CHẮN: người bị bệnh luôn đồng hợp lặn, còn bố mẹ bình thường của họ luôn dị hợp. '
        + 'Mọi người bình thường khác đều là ẩn số.');
    return MC(R, `Cho sơ đồ phả hệ về một bệnh do gen lặn nằm trên nhiễm sắc thể thường quy định:${p.hinh}`
      + `Cặp vợ chồng ${t(p.capA)} × ${t(p.capB)} dự định sinh thêm một người con. Xác suất người con đó không bị bệnh là bao nhiêu?`,
      { d: '75%', s: ['25%', '50%', '100%'],
        sv: { '25%': 'đây là xác suất con BỊ bệnh, đề hỏi ngược lại',
              '50%': 'chỉ đúng với phép lai giữa một cơ thể dị hợp và một cơ thể đồng hợp lặn, không phải trường hợp này',
              '100%': 'cả hai bố mẹ đều mang allele lặn nên vẫn có khả năng sinh con bị bệnh' },
        v: `Bước 1 — cặp ${t(p.capA)} × ${t(p.capB)} đều bình thường mà đã sinh con ${t(p.benh3)} bị bệnh ⇒ kiểu gen cả hai đều dị hợp.\n`
          + `Bước 2 — phép lai giữa hai cơ thể dị hợp cho đời con theo tỉ lệ 1 đồng hợp trội : 2 dị hợp : 1 đồng hợp lặn.\n`
          + `Bước 3 — không bị bệnh gồm đồng hợp trội và dị hợp, chiếm 3/4 tức 75%.` },
      'Đọc kĩ đề hỏi "bị bệnh" hay "KHÔNG bị bệnh" — hai đáp án 25% và 75% luôn được đặt cạnh nhau để bẫy.');
  } },

/* ---------- gen lặn trên nhiễm sắc thể X ---------- */
{ ma: 'sinh-hinh-phahe-x', chuong: 'Di truyền người', muc: 4, dang: 'mc',
  tao(R) {
    const p = dungPhaHe(R, 'x');
    const hoi = R.chon(['viTri', 'conTrai', 'mangGen']);
    if (hoi === 'viTri')
      return MC(R, `Cho sơ đồ phả hệ về một bệnh ở người, hình tô đậm là người bị bệnh:${p.hinh}`
        + `Bệnh trên nhiều khả năng do loại gen nào quy định?`,
        { d: 'Gen lặn nằm trên vùng không tương đồng của nhiễm sắc thể X',
          s: ['Gen lặn nằm trên nhiễm sắc thể thường', 'Gen trội nằm trên nhiễm sắc thể thường', 'Gen trội nằm trên vùng không tương đồng của nhiễm sắc thể X'],
          sv: { 'Gen lặn nằm trên nhiễm sắc thể thường': 'nằm trên nhiễm sắc thể thường thì bệnh xuất hiện đều ở hai giới; trên hình cả hai người bệnh đều là NAM và không có nữ nào bị bệnh',
                'Gen trội nằm trên nhiễm sắc thể thường': `gen trội thì người bệnh phải có bố hoặc mẹ bị bệnh — cặp ${t(p.ong)} × ${t(p.ba)} đều bình thường mà sinh con ${t(p.benh2)} bị bệnh`,
                'Gen trội nằm trên vùng không tương đồng của nhiễm sắc thể X': 'trội trên X thì bố bị bệnh truyền cho tất cả con gái, và bố mẹ bình thường không thể sinh con bệnh' },
          v: `Suy luận hai bước:\n`
            + `① Cặp ${t(p.ong)} × ${t(p.ba)} đều bình thường mà sinh con ${t(p.benh2)} bị bệnh ⇒ bệnh do gen LẶN.\n`
            + `② Cả hai người bệnh ${t(p.benh2)} và ${t(p.benh3)} đều là NAM, cả phả hệ không có nữ nào bị bệnh ⇒ dấu hiệu của gen lặn nằm trên X. `
            + `Nam chỉ có một nhiễm sắc thể X nên chỉ cần một allele lặn đã biểu hiện bệnh, còn nữ phải có cả hai X đều lặn nên hiếm hơn nhiều.` },
        'Hai phả hệ trông rất giống nhau nhưng khác một chi tiết sống còn: có NỮ bị bệnh mà bố bình thường ⇒ gen trên nhiễm sắc thể THƯỜNG; '
        + 'chỉ toàn NAM bị bệnh ⇒ nghĩ ngay tới gen lặn trên X.');
    if (hoi === 'conTrai')
      return MC(R, `Cho sơ đồ phả hệ về một bệnh do gen lặn nằm trên vùng không tương đồng của nhiễm sắc thể X quy định:${p.hinh}`
        + `Cặp vợ chồng ${t(p.capA)} × ${t(p.capB)} sinh thêm một người con TRAI. Xác suất người con trai đó bị bệnh là bao nhiêu?`,
        { d: '50%', s: ['25%', '75%', '100%'],
          sv: { '25%': 'đây là xác suất sinh được một người con vừa là trai vừa bị bệnh tính trên TỔNG số con; đề đã cho biết là con trai nên không nhân thêm một nửa nữa',
                '75%': 'đây là tỉ lệ của phép lai giữa hai cơ thể dị hợp trên nhiễm sắc thể thường, không áp dụng cho gen trên X',
                '100%': 'người mẹ chỉ dị hợp nên vẫn có một nửa số con trai nhận được X mang allele bình thường' },
          v: `Bước 1 — người mẹ ${t(p.me2)} bình thường mà sinh con trai ${t(p.benh3)} bị bệnh ⇒ mẹ mang allele lặn ở một trong hai nhiễm sắc thể X.\n`
            + `Bước 2 — con trai luôn nhận nhiễm sắc thể Y từ bố và một X từ mẹ.\n`
            + `Bước 3 — mẹ có hai loại X với tỉ lệ ngang nhau, trong đó một loại mang allele bệnh ⇒ xác suất con trai bị bệnh là 50%.` },
        'Bệnh trên X thì bố KHÔNG truyền cho con trai — con trai chỉ nhận X từ mẹ. '
        + 'Vì thế mọi bài dạng này chỉ cần xét kiểu gen của MẸ.');
    return MC(R, `Cho sơ đồ phả hệ về một bệnh do gen lặn nằm trên vùng không tương đồng của nhiễm sắc thể X quy định:${p.hinh}`
      + `Người phụ nữ nào sau đây chắc chắn mang allele gây bệnh?`,
      { d: `${t(p.ba)} và ${t(p.me2)}`,
        s: [`chỉ ${t(p.ba)}`, `chỉ ${t(p.me2)}`, `${t(p.ba)} và ${t(p.baB)}`],
        sv: { [`chỉ ${t(p.ba)}`]: `sót người mẹ ${t(p.me2)} — bà cũng sinh ra một người con trai bị bệnh`,
              [`chỉ ${t(p.me2)}`]: `sót người bà ${t(p.ba)} — bà cũng sinh ra một người con trai bị bệnh`,
              [`${t(p.ba)} và ${t(p.baB)}`]: `${t(p.baB)} thuộc gia đình bên kia, trong nhánh đó không có ai bị bệnh nên không thể khẳng định` },
        v: `Con trai nhận nhiễm sắc thể X duy nhất của mình từ MẸ, nên hễ có con trai bị bệnh thì mẹ chắc chắn mang allele lặn.\n`
          + `· ${t(p.ba)} sinh ra ${t(p.benh2)} bị bệnh ⇒ ${t(p.ba)} mang allele bệnh.\n`
          + `· ${t(p.me2)} sinh ra ${t(p.benh3)} bị bệnh ⇒ ${t(p.me2)} mang allele bệnh.\n`
          + `Những phụ nữ còn lại trong phả hệ không có con trai bị bệnh nên không khẳng định được.` },
      'Với gen lặn trên X, đường truyền luôn là: bà ngoại → mẹ → cháu trai. '
      + 'Cứ thấy một nam bị bệnh là truy ngược lên mẹ anh ta, chắc chắn mẹ mang gen.');
  } },

/* ---------- dạng đúng/sai bốn ý ---------- */
{ ma: 'sinh-hinh-phahe-ds', chuong: 'Di truyền người', muc: 3, dang: 'ds',
  tao(R) {
    const p = dungPhaHe(R, 'thuong');
    const xs = R.chon(['25%', '50%', '75%']);
    const kho = [
      { t: 'Bệnh trên do một gen lặn nằm trên nhiễm sắc thể thường quy định.', a: true,
        v: `cặp ${t(p.ong)} × ${t(p.ba)} đều bình thường mà sinh con ${t(p.benh2)} bị bệnh ⇒ gen LẶN; `
          + `mà ${t(p.benh2)} lại là NỮ trong khi bố ${t(p.ong)} bình thường ⇒ gen nằm trên nhiễm sắc thể THƯỜNG.` },
      { t: 'Bệnh trên do gen lặn nằm trên vùng không tương đồng của nhiễm sắc thể X quy định.', a: false,
        v: `nếu vậy thì người nữ ${t(p.benh2)} bị bệnh phải nhận một allele bệnh từ bố, tức bố ${t(p.ong)} cũng phải bị bệnh — trái với phả hệ.` },
      { t: `Người số ${t(p.benh3)} chắc chắn có kiểu gen đồng hợp lặn.`, a: true,
        v: `${t(p.benh3)} biểu hiện bệnh mà bệnh do gen lặn quy định nên chỉ có thể mang hai allele lặn.` },
      { t: `Cả hai người số ${t(p.ong)} và số ${t(p.ba)} đều có kiểu gen dị hợp.`, a: true,
        v: `hai người bình thường sinh ra con ${t(p.benh2)} đồng hợp lặn, nên mỗi người phải cho một allele lặn mà bản thân vẫn không biểu hiện bệnh.` },
      { t: `Người số ${t(p.ongB)} chắc chắn có kiểu gen dị hợp.`, a: false,
        v: `${t(p.ongB)} thuộc nhánh gia đình chưa có ai biểu hiện bệnh nên có thể đồng hợp trội hoặc dị hợp — không xác định chắc chắn được.` },
      { t: `Nếu cặp vợ chồng ${t(p.capA)} × ${t(p.capB)} sinh thêm một người con thì xác suất người con đó bị bệnh là ${xs}.`, a: xs === '25%',
        v: `hai người đều bình thường mà đã sinh con ${t(p.benh3)} bị bệnh nên cả hai đều dị hợp; phép lai giữa hai cơ thể dị hợp cho một phần tư `
          + `số con đồng hợp lặn ⇒ xác suất bị bệnh là 25%${xs === '25%' ? '' : ` chứ không phải ${xs}`}.` },
      { t: `Người số ${t(p.benh2)} và người số ${t(p.benh3)} có cùng kiểu gen về gen gây bệnh.`, a: true,
        v: `cả hai đều biểu hiện bệnh do gen lặn nên đều mang hai allele lặn.` }
    ];
    let y = null;
    for (let lan = 0; lan < 30 && !y; lan++) {
      const thu = TD.xaoR(R, kho).slice(0, 4);
      const d = thu.filter(x => x.a).length;
      if (d >= 1 && d <= 3) y = thu;
    }
    if (!y) return null;
    return { q: `Cho sơ đồ phả hệ về một bệnh ở người, hình tô đậm là người bị bệnh:${p.hinh}Xét các phát biểu sau:`,
      items: y,
      giai: y.map((x, k) => `Ý ${'abcd'[k]} ${x.a ? 'ĐÚNG' : 'SAI'}: ${x.v}`).join('\n'),
      meo: 'Trình tự đọc phả hệ không bao giờ đổi: ① bố mẹ bình thường sinh con bệnh ⇒ gen LẶN '
        + '② có nữ bị bệnh mà bố bình thường ⇒ gen trên nhiễm sắc thể THƯỜNG '
        + '③ người bệnh luôn đồng hợp lặn, bố mẹ bình thường của họ luôn dị hợp.' };
  } }

]);

/* đánh dấu lại là mẫu có hình */
(function () {
  for (const t2 of TD.GEN.sinh) if (BO.indexOf(t2.ma) >= 0) t2._hinh = true;
})();
})();
