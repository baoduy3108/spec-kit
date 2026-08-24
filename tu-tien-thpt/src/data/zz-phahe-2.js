/* ============================================================
   SINH — PHẢ HỆ: BA KIỂU DI TRUYỀN CÒN THIẾU
   Kho cũ chỉ có gen LẶN trên NST thường và gen LẶN trên X. Đề lại rất
   hay hỏi "xác định quy luật di truyền", mà muốn loại được phương án
   thì phải từng nhìn thấy cả bốn kiểu còn lại. Bổ sung:
     · gen TRỘI trên NST thường
     · gen TRỘI trên vùng không tương đồng của X
     · gen nằm trên vùng không tương đồng của Y (di truyền thẳng)
   Mỗi phả hệ dựng sao cho DẤU HIỆU LOẠI TRỪ hiện rõ trên hình, không
   phải đoán: có đủ dữ kiện để bác ba giả thiết còn lại.
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
const t = id => `(${id})`;
/* liệt kê danh sách người cho xuôi tai: (3), (5) và (6) */
const ke = ds => ds.length < 2 ? ds.map(t).join('')
  : ds.slice(0, -1).map(t).join(', ') + ' và ' + t(ds[ds.length - 1]);

/* Bộ khung ba đời dùng chung.
   cf.b1    = [ông có bệnh?, bà có bệnh?]
   cf.gioi  = giới tính bốn người con đời II (true = nam), NGƯỜI CUỐI luôn là
              người lập gia đình riêng — chọn sẵn sao cho đời III hợp quy luật.
   cf.benh2 = (i, nam) → người con đời II thứ i có bệnh không
   cf.gioi3 / cf.benh3 = tương tự cho đời III.
   Ràng buộc bắt buộc: người con đời II ĐỨNG CUỐI phải là người mang được gen
   gây bệnh xuống đời III, nếu không thì hình vẽ tự mâu thuẫn với đáp án. */
const dung = (R, cf) => {
  const nguoi = [], cap = [], con = [];
  let dem = 0;
  const them = (doi, x, nam, benh) => {
    const id = String(++dem);
    nguoi.push({ id: id, doi: doi, x: x, nam: nam, benh: benh });
    return id;
  };
  const gioi = cf.gioi, k2 = gioi.length;
  const gioi3 = cf.gioi3, k3 = gioi3.length;

  /* ĐỜI I — một cặp ông bà, đặt giữa hàng con cho cân */
  const a1 = them(1, 1.3, true, cf.b1[0]), a2 = them(1, 2.85, false, cf.b1[1]);
  cap.push([a1, a2]);

  /* ĐỜI II — có cả trai lẫn gái để lộ dấu hiệu liên kết giới tính */
  const conA = [];
  for (let i = 0; i < k2; i++)
    conA.push(them(2, 0.5 + i * 1.05, gioi[i], cf.benh2(i, gioi[i])));
  con.push({ cha: a1, me: a2, ds: conA });

  /* người con đứng cuối lấy vợ hoặc chồng từ ngoài phả hệ, người này BÌNH THƯỜNG */
  const trongCuoc = conA[k2 - 1], namTC = gioi[k2 - 1];
  const xTC = 0.5 + (k2 - 1) * 1.05, xBD = xTC + 1.05;
  const banDoi = them(2, xBD, !namTC, false);
  cap.push(namTC ? [trongCuoc, banDoi] : [banDoi, trongCuoc]);

  /* ĐỜI III — canh giữa ngay dưới cặp vợ chồng vừa lập */
  const giua = (xTC + xBD) / 2, conC = [];
  for (let j = 0; j < k3; j++)
    conC.push(them(3, giua + (j - (k3 - 1) / 2) * 1.15, gioi3[j], cf.benh3(j, gioi3[j])));
  con.push({ cha: namTC ? trongCuoc : banDoi, me: namTC ? banDoi : trongCuoc, ds: conC });

  const loc = (ds, gi, muon) => ds.filter((x, i) => gi[i] === muon);
  return {
    hinh: TD.hinhPhaHe(nguoi, cap, con),
    ong: a1, ba: a2, conA: conA, gioi: gioi,
    trongCuoc: trongCuoc, namTC: namTC, banDoi: banDoi, conC: conC, gioi3: gioi3,
    gaiDoi2: loc(conA, gioi, false), traiDoi2: loc(conA, gioi, true),
    traiDoi3: loc(conC, gioi3, true), gaiDoi3: loc(conC, gioi3, false),
    benhDoi2: conA.filter((x, i) => cf.benh2(i, gioi[i])),
    lanhGai2: conA.filter((x, i) => !gioi[i] && !cf.benh2(i, gioi[i]))
  };
};

const BON = [
  'Gen lặn nằm trên nhiễm sắc thể thường',
  'Gen trội nằm trên nhiễm sắc thể thường',
  'Gen lặn nằm trên vùng không tương đồng của nhiễm sắc thể X',
  'Gen trội nằm trên vùng không tương đồng của nhiễm sắc thể X',
  'Gen nằm trên vùng không tương đồng của nhiễm sắc thể Y'
];
const khac = d => BON.filter(x => x !== d);

TD.GEN.sinh = (TD.GEN.sinh || []).concat([


/* ---------- ① GEN TRỘI TRÊN NST THƯỜNG ---------- */
{ ma: 'sinh-phahe-troi-thuong', chuong: 'Di truyền người', muc: 3, dang: 'mc',
  tao(R) {
    /* Dựng để LOẠI được cả ba giả thiết còn lại, không phải đoán:
       · ông BỆNH × bà BỆNH mà sinh con LÀNH ⇒ chắc chắn gen TRỘI
         (nếu lặn thì aa × aa, mọi con đều aa và đều bệnh)
       · trong đám con lành có một người con GÁI ⇒ loại trội trên X
         (bố XᴬY thì mọi con gái đều nhận Xᴬ và đều phải bệnh)
       · có người NỮ bị bệnh ⇒ loại gen trên Y                         */
    const k3 = R.nguyen(2, 3);
    /* thứ tự trai – gái đổi mỗi lần cho hình không lặp lại y hệt, nhưng luôn
       còn ít nhất một con GÁI đứng trước người con út */
    const gioi = R.chon([[false, true, false, true], [true, false, false, true],
                         [false, false, true, true], [true, false, true, false]]);
    const iGaiLanh = gioi.findIndex((nam, i) => !nam && i < gioi.length - 1);
    const tuDo = gioi.map(() => R.chon([true, false]));
    const p = dung(R, {
      b1: [true, true],
      benh2: (i) => i === gioi.length - 1 ? true : (i === iGaiLanh ? false : tuDo[i]),
      gioi: gioi,
      gioi3: k3 === 2 ? [true, false] : [true, false, true],
      benh3: j => j === 0
    });
    const gaiLanh = p.conA[iGaiLanh];
    const nuBenh = p.gaiDoi2.filter(id => p.benhDoi2.indexOf(id) >= 0);
    const keNuBenh = nuBenh.length
      ? `${t(p.ba)}, ${ke(nuBenh)}` : t(p.ba);
    const d = BON[1];
    return MC(R, `Cho sơ đồ phả hệ về một bệnh ở người, hình tô đậm là người bị bệnh:${p.hinh}`
      + `Bệnh trên do loại gen nào quy định?`,
      { d: d, s: R.chonNhieu(khac(d), 3),
        sv: {
          [BON[0]]: `nếu gen gây bệnh là gen LẶN trên NST thường thì cặp bố mẹ ${t(p.ong)} × ${t(p.ba)} đều bị `
            + `bệnh nên đều có kiểu gen aa, mọi người con đều phải nhận aa và đều bị bệnh; nhưng ${t(gaiLanh)} `
            + `là con của họ và hoàn toàn bình thường`,
          [BON[2]]: `gen lặn trên X cũng vướng đúng chỗ đó: ${t(p.ong)} bệnh là XᵃY, ${t(p.ba)} bệnh là XᵃXᵃ, `
            + `con gái nhận Xᵃ từ cả bố lẫn mẹ nên con gái nào cũng phải bị bệnh — mà ${t(gaiLanh)} thì không`,
          [BON[3]]: `nếu gen TRỘI nằm trên X thì bố bệnh ${t(p.ong)} có kiểu gen XᴬY, con gái luôn nhận X của `
            + `bố nên MỌI con gái đều mang Xᴬ và đều bị bệnh; trên hình ${t(gaiLanh)} là con gái ông và bình thường`,
          [BON[4]]: `gen nằm trên Y thì chỉ nam giới mới mắc bệnh, trong khi phả hệ có người NỮ bị bệnh là `
            + keNuBenh
        },
        v: `Đọc hình theo hai bước:\n`
          + `① Bố ${t(p.ong)} và mẹ ${t(p.ba)} ĐỀU bị bệnh nhưng sinh ra ${t(gaiLanh)} bình thường. Nếu bệnh do `
          + `gen lặn thì bố mẹ bệnh đều là đồng hợp lặn, con bắt buộc nhận đồng hợp lặn và bắt buộc bị bệnh. `
          + `Có con lành ⇒ gen gây bệnh là gen TRỘI, và bố mẹ đều dị hợp.\n`
          + `② Người con lành ${t(gaiLanh)} là con GÁI. Con gái luôn nhận một X từ bố. Nếu gen trội nằm trên X `
          + `thì bố XᴬY sẽ truyền Xᴬ cho tất cả con gái ⇒ không thể có con gái lành. Vậy gen không nằm trên X. `
          + `Phả hệ lại có nữ bị bệnh nên cũng không nằm trên Y.\n`
          + `Kết luận: gen gây bệnh là gen TRỘI nằm trên NST THƯỜNG.\n`
          + `Kiểu gen (A: bệnh, a: bình thường): ${t(p.ong)} Aa · ${t(p.ba)} Aa · ${t(gaiLanh)} aa · những người `
          + `bị bệnh ở đời II và III đều là Aa hoặc AA, riêng người bệnh có bố hoặc mẹ mang kiểu gen aa thì `
          + `chắc chắn là Aa.`,
        },
      'Quy trình bốn bước dùng cho mọi phả hệ: ① bố mẹ BỆNH sinh con LÀNH ⇒ gen TRỘI; bố mẹ LÀNH sinh con '
      + 'BỆNH ⇒ gen LẶN ② nếu TRỘI, tìm một người bố bị bệnh — có con gái lành thì loại ngay trội trên X '
      + '③ nếu LẶN, tìm một người nữ bị bệnh — bố cô ấy bình thường thì loại lặn trên X ④ chỉ khi không có '
      + 'nữ nào bệnh và bố bệnh truyền cho toàn bộ con trai mới nghĩ tới Y.');
  } },

/* ---------- ② GEN TRỘI TRÊN X ---------- */
{ ma: 'sinh-phahe-troi-x', chuong: 'Di truyền người', muc: 4, dang: 'mc',
  tao(R) {
    /* Ông XᴬY bệnh × bà XᴬXᵃ bệnh:
       · con GÁI luôn nhận Xᴬ của bố ⇒ 100% con gái bị bệnh — dấu hiệu đặc trưng
       · con TRAI nhận X của mẹ ⇒ có người bệnh, có người lành; đứa con trai LÀNH
         này loại sạch cả hai giả thiết gen lặn (bố mẹ bệnh mà sinh con lành)
       · đời III: mẹ bệnh × bố ngoài phả hệ LÀNH vẫn sinh con gái bệnh ⇒ loại
         lặn trên X lần nữa (lặn trên X thì con gái bệnh phải có bố bệnh)      */
    const k3 = R.nguyen(2, 3);
    /* người con út BẮT BUỘC là con gái bị bệnh — chính cô ấy mang gen xuống đời III */
    const gioi = R.chon([[true, false, true, false], [true, true, false, false],
                         [false, true, true, false], [true, false, false, false]]);
    const iTraiLanh = gioi.indexOf(true);
    const tuDo = gioi.map(() => R.chon([true, false]));
    const p = dung(R, {
      b1: [true, true],
      benh2: (i, nam) => !nam || (i === iTraiLanh ? false : tuDo[i]),
      gioi: gioi,
      gioi3: k3 === 2 ? [false, true] : [false, true, false],
      benh3: j => j === 0
    });
    const traiLanh = p.conA[iTraiLanh], meBenh = p.trongCuoc, boNgoai = p.banDoi;
    const gaiBenh3 = p.conC[0];
    const dsGai = ke(p.gaiDoi2);
    const d = BON[3];
    return MC(R, `Cho sơ đồ phả hệ về một bệnh ở người, hình tô đậm là người bị bệnh:${p.hinh}`
      + `Bệnh trên do loại gen nào quy định?`,
      { d: d, s: R.chonNhieu(khac(d), 3),
        sv: {
          [BON[0]]: `gen lặn trên NST thường thì bố mẹ bệnh ${t(p.ong)} × ${t(p.ba)} đều là aa, mọi con đều `
            + `phải bị bệnh; nhưng ${t(traiLanh)} là con của họ và bình thường`,
          [BON[1]]: `gen trội trên NST thường thì con trai và con gái có xác suất mắc như nhau và không có lí `
            + `do gì để TOÀN BỘ con gái ${dsGai} đều bệnh trong khi có con trai lành — sự lệch hẳn theo giới `
            + `tính này chỉ giải thích được khi gen nằm trên X`,
          [BON[2]]: `gen lặn trên X thì con gái bị bệnh phải là XᵃXᵃ, tức là BỐ của cô ấy cũng phải bị bệnh; `
            + `ở đời III, ${t(gaiBenh3)} bị bệnh mà bố ${t(boNgoai)} hoàn toàn bình thường`,
          [BON[4]]: `gen trên Y chỉ truyền cho nam và chỉ nam mới mắc bệnh; ở đây phần lớn người bệnh lại là NỮ`
        },
        v: `Ba dữ kiện trên hình khoá chặt đáp án:\n`
          + `① Bố ${t(p.ong)} và mẹ ${t(p.ba)} đều bệnh mà sinh được ${t(traiLanh)} bình thường ⇒ gen gây bệnh `
          + `là gen TRỘI (nếu lặn thì bố mẹ bệnh là đồng hợp lặn, con không thể lành).\n`
          + `② TẤT CẢ con gái của ông ${t(p.ong)} là ${dsGai} đều bị bệnh, trong khi con trai có người lành. `
          + `Con gái luôn nhận X từ bố: bố XᴬY truyền Xᴬ cho mọi con gái ⇒ mọi con gái đều bệnh. Con trai chỉ `
          + `nhận Y của bố và X của mẹ XᴬXᵃ nên có người bệnh có người lành. Đúng khớp với hình.\n`
          + `③ Đời III: mẹ ${t(meBenh)} bệnh, bố ${t(boNgoai)} bình thường mà vẫn sinh con gái ${t(gaiBenh3)} `
          + `bị bệnh — điều này không thể xảy ra với gen lặn trên X.\n`
          + `Vậy gen gây bệnh là gen TRỘI nằm trên vùng không tương đồng của NST X.\n`
          + `Kiểu gen: ${t(p.ong)} XᴬY · ${t(p.ba)} XᴬXᵃ · ${t(traiLanh)} XᵃY · con gái bệnh XᴬXᵃ · `
          + `${t(boNgoai)} XᵃY · ${t(gaiBenh3)} XᴬXᵃ.`,
        },
      'Bốn dấu hiệu nhận ra gen TRỘI TRÊN X: ① bố bệnh thì 100% con gái bệnh ② mẹ bệnh dị hợp thì 50% con mỗi '
      + 'giới bệnh ③ bệnh gặp ở nữ nhiều hơn nam ④ bệnh không bao giờ truyền thẳng bố → con trai. Thấy "bố '
      + 'bệnh mà có con gái lành" là loại ngay giả thiết này. Bệnh thật hay gặp: còi xương kháng vitamin D.');
  } },

/* ---------- ③ GEN TRÊN NST Y — DI TRUYỀN THẲNG ---------- */
{ ma: 'sinh-phahe-y', chuong: 'Di truyền người', muc: 3, dang: 'mc',
  tao(R) {
    /* Suốt ba đời KHÔNG một người nữ nào bị bệnh, còn bố bệnh thì truyền cho
       TOÀN BỘ con trai và cháu trai. Đó là di truyền thẳng, chỉ gen trên vùng
       không tương đồng của Y mới cho ra bức tranh này. */
    const k3 = R.nguyen(2, 3);
    /* người con út BẮT BUỘC là con trai bị bệnh — bệnh phải đi tiếp xuống đời III */
    const p = dung(R, {
      b1: [true, false],
      gioi: R.chon([[false, true, false, true], [true, false, false, true],
                    [false, false, true, true], [false, true, true, true]]),
      benh2: (i, nam) => nam,                    /* mọi con trai bệnh, mọi con gái lành */
      gioi3: k3 === 2 ? [true, false] : [true, false, true],
      benh3: (j, nam) => nam
    });
    const dsTrai = ke(p.traiDoi2);
    const dsGai = ke(p.gaiDoi2);
    const chauTrai = ke(p.traiDoi3);
    const d = BON[4];
    return MC(R, `Cho sơ đồ phả hệ về một bệnh ở người, hình tô đậm là người bị bệnh:${p.hinh}`
      + `Bệnh trên do loại gen nào quy định?`,
      { d: d, s: R.chonNhieu(khac(d), 3),
        sv: {
          [BON[0]]: `gen lặn trên NST thường thì nam và nữ mắc bệnh với tỉ lệ ngang nhau; ở đây suốt ba đời `
            + `không một người NỮ nào bị bệnh, còn con trai thì bệnh 100%`,
          [BON[1]]: `gen trội trên NST thường thì con gái của người bệnh cũng có 50% khả năng mắc; thực tế `
            + `mọi con gái ${dsGai} đều bình thường`,
          [BON[2]]: `gen lặn trên X đúng là gặp ở nam nhiều hơn, nhưng khi đó nam bệnh XᵃY nhận Xᵃ từ MẸ chứ `
            + `không phải từ bố, nên bố bệnh KHÔNG truyền bệnh cho con trai; ở đây bố bệnh truyền cho toàn bộ `
            + `con trai qua hai đời liên tiếp`,
          [BON[3]]: `gen trội trên X thì bố bệnh truyền Xᴬ cho toàn bộ con GÁI nên con gái phải bệnh hết — `
            + `ngược hẳn với hình, ở đây con gái lành hết còn con trai bệnh hết`
        },
        v: `Ba dấu hiệu cùng chỉ về một hướng:\n`
          + `① Toàn bộ người bệnh trong phả hệ đều là NAM, không một người nữ nào mắc bệnh.\n`
          + `② Ông ${t(p.ong)} bị bệnh truyền bệnh cho TẤT CẢ con trai (${dsTrai}); đến lượt ${t(p.trongCuoc)} `
          + `lại truyền cho tất cả cháu trai (${chauTrai}). Bệnh đi thẳng một mạch bố → con trai → cháu trai.\n`
          + `③ Con gái ${dsGai} không ai bị bệnh và cũng không mang gen để truyền tiếp.\n`
          + `Đó chính là DI TRUYỀN THẲNG: gen nằm trên vùng không tương đồng của NST Y, đi theo đúng dòng nam `
          + `và không bao giờ rẽ sang nữ.\n`
          + `Kiểu gen: người bệnh là XYᴬ (allele gây bệnh nằm trên Y, kí hiệu Yᴬ) · người nam bình thường là `
          + `XY · người nữ trong phả hệ không mang gen này nên kiểu gen là XX.`,
        },
      'Gen trên Y là kiểu dễ nhận nhất: chỉ cần thấy ① 100% người bệnh là nam ② bố bệnh thì mọi con trai đều '
      + 'bệnh ③ không người nữ nào bệnh. Thiếu một trong ba thì phải nghĩ sang lặn trên X. Ví dụ thực tế: '
      + 'tật dính ngón tay số 2 và 3, tật có túm lông ở vành tai.');
  } }

]);
})();
