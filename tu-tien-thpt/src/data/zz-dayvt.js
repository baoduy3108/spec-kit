/* ============================================================
   HOÁ — DÃY ĐIỆN HOÁ: TRẮC NGHIỆM TRÍ NHỚ ĐÚNG NGHĨA
   Thẻ "Dãy điện hoá" trong Tàng Kinh Các trước đây không có câu hỏi nào
   thật sự hỏi về dãy điện hoá, nên bấm "Kiểm tra ngay" là ra câu của cả
   chuyên đề Đại cương kim loại — đọc một đằng kiểm tra một nẻo.
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {}; TD.KHO_LT = TD.KHO_LT || {};

(function () {
const MC = (R, de, it, meo) => {
  const opts = TD.xaoR(R, [it.d].concat(it.s));
  return { q: de, opts: opts, ans: opts.indexOf(it.d),
    giai: `Đáp án đúng: ${it.d}\n${it.v}\n\nVì sao các phương án còn lại bị loại:\n`
      + TD.khoiLoai(opts, it.d, it.sv, 'không thoả yêu cầu của đề.'),
    meo: meo };
};
const baNhieu = (dung, ung) => {
  const ra = [];
  for (const x of ung) if (x !== dung && ra.indexOf(x) < 0) ra.push(x);
  return ra.length >= 3 ? ra.slice(0, 3) : null;
};

/* Dãy điện hoá theo thế điện cực chuẩn tăng dần (trái sang phải).
   Tính khử của kim loại GIẢM dần, tính oxi hoá của ion TĂNG dần. */
const DAY = [
  { kl: 'K',  ion: 'K⁺',   nuoc: true },
  { kl: 'Ba', ion: 'Ba²⁺', nuoc: true },
  { kl: 'Ca', ion: 'Ca²⁺', nuoc: true },
  { kl: 'Na', ion: 'Na⁺',  nuoc: true },
  { kl: 'Mg', ion: 'Mg²⁺' },
  { kl: 'Al', ion: 'Al³⁺' },
  { kl: 'Mn', ion: 'Mn²⁺' },
  { kl: 'Zn', ion: 'Zn²⁺' },
  { kl: 'Cr', ion: 'Cr³⁺' },
  { kl: 'Fe', ion: 'Fe²⁺' },
  { kl: 'Ni', ion: 'Ni²⁺' },
  { kl: 'Sn', ion: 'Sn²⁺' },
  { kl: 'Pb', ion: 'Pb²⁺' },
  { kl: 'H',  ion: 'H⁺', moc: true },
  { kl: 'Cu', ion: 'Cu²⁺' },
  { kl: 'Ag', ion: 'Ag⁺' },
  { kl: 'Hg', ion: 'Hg²⁺' },
  { kl: 'Pt', ion: 'Pt²⁺' },
  { kl: 'Au', ion: 'Au³⁺' }
];
const viTri = {}; DAY.forEach((x, i) => { viTri[x.kl] = i; });
const MOC_H = viTri['H'];
const KL = DAY.filter(x => !x.moc);                       /* bỏ mốc hydrogen */
const truocH = KL.filter(x => viTri[x.kl] < MOC_H);
const sauH = KL.filter(x => viTri[x.kl] > MOC_H);
/* kim loại đẩy được ion khác ra khỏi dung dịch muối: phải không tan trong nước */
const dayDuoc = KL.filter(x => !x.nuoc);
const ds = a => a.join(' → ');

TD.GEN.hoa = (TD.GEN.hoa || []).concat([

/* ---------- mức 1: đứng trước hay đứng sau hydrogen ---------- */
{ ma: 'hoa-dayvt-moc', chuong: 'Dãy điện hoá', muc: 1, dang: 'mc',
  tao(R) {
    const sau = R.chon(sauH).kl;
    const truoc = R.chonNhieu(truocH, 3).map(x => x.kl);
    if (R.chon([0, 1])) {
      return MC(R, `Kim loại nào sau đây <b>không</b> tan trong dung dịch HCl loãng?`,
        { d: sau, s: truoc,
          sv: Object.fromEntries(truoc.map(k => [k, `${k} đứng TRƯỚC hydrogen trong dãy điện hoá nên khử được ion H⁺, tức là tan và giải phóng khí hydrogen`])),
          v: `Kim loại chỉ đẩy được hydrogen ra khỏi dung dịch acid loãng khi nó đứng TRƯỚC hydrogen trong dãy điện hoá.\n`
            + `${sau} đứng SAU hydrogen ⇒ không khử được ion H⁺ ⇒ không tan trong HCl loãng.` },
        'Cột mốc quan trọng nhất của dãy điện hoá là hydrogen. Đứng trước H thì tan trong HCl và H₂SO₄ loãng, '
        + 'đứng sau H thì không. Nhóm đứng sau H cần thuộc lòng: Cu, Ag, Hg, Pt, Au.');
    }
    const t = R.chon(truocH).kl;
    const nhieu = R.chonNhieu(sauH, 3).map(x => x.kl);
    return MC(R, `Kim loại nào sau đây tan được trong dung dịch H₂SO₄ loãng và giải phóng khí H₂?`,
      { d: t, s: nhieu,
        sv: Object.fromEntries(nhieu.map(k => [k, `${k} đứng SAU hydrogen trong dãy điện hoá nên không khử được ion H⁺`])),
        v: `${t} đứng TRƯỚC hydrogen trong dãy điện hoá nên khử được ion H⁺ thành khí hydrogen.` },
      'Vẫn là cột mốc hydrogen: trước H thì tan trong acid loãng, sau H thì chịu. '
      + 'Với acid có tính oxi hoá mạnh như HNO₃ thì luật này KHÔNG áp dụng — Cu và Ag vẫn tan.');
  } },

/* ---------- mức 1: so tính khử, tính oxi hoá ---------- */
{ ma: 'hoa-dayvt-so', chuong: 'Dãy điện hoá', muc: 1, dang: 'mc',
  tao(R) {
    const bo = R.chonNhieu(KL, 4).sort((a, b) => viTri[a.kl] - viTri[b.kl]);
    const ten = bo.map(x => x.kl);
    const hoi = R.chon(['khuManh', 'khuYeu', 'oxhManh']);
    if (hoi === 'khuManh')
      return MC(R, `Cho các kim loại: ${ten.join(', ')}. Kim loại nào có tính khử <b>mạnh nhất</b>?`,
        { d: bo[0].kl, s: ten.slice(1),
          sv: Object.fromEntries(bo.slice(1).map(x => [x.kl, `${x.kl} đứng SAU ${bo[0].kl} trong dãy điện hoá nên tính khử yếu hơn`])),
          v: `Trong dãy điện hoá, đi từ trái sang phải thì tính khử của kim loại GIẢM dần.\n`
            + `Thứ tự của bốn kim loại trên trong dãy là ${ds(ten)} ⇒ đứng đầu là ${bo[0].kl} nên có tính khử mạnh nhất.` },
        'Một câu thần chú cho cả dãy: sang PHẢI thì kim loại yếu đi (tính khử giảm), còn ion mạnh lên (tính oxi hoá tăng).');
    if (hoi === 'khuYeu')
      return MC(R, `Cho các kim loại: ${ten.join(', ')}. Kim loại nào có tính khử <b>yếu nhất</b>?`,
        { d: bo[3].kl, s: ten.slice(0, 3),
          sv: Object.fromEntries(bo.slice(0, 3).map(x => [x.kl, `${x.kl} đứng TRƯỚC ${bo[3].kl} trong dãy điện hoá nên tính khử mạnh hơn`])),
          v: `Tính khử giảm dần khi đi sang phải. Thứ tự trong dãy là ${ds(ten)} ⇒ đứng cuối là ${bo[3].kl}.` },
        'Kim loại đứng càng về cuối dãy thì càng "quý" và càng lười nhường electron — vàng và bạch kim ở tận cùng.');
    const ion = bo.map(x => x.ion);
    return MC(R, `Cho các ion kim loại: ${ion.join(', ')}. Ion nào có tính oxi hoá <b>mạnh nhất</b>?`,
      { d: bo[3].ion, s: ion.slice(0, 3),
        sv: Object.fromEntries(bo.slice(0, 3).map(x => [x.ion, `${x.ion} nằm bên TRÁI ${bo[3].ion} trong dãy điện hoá nên tính oxi hoá yếu hơn`])),
        v: `Hàng ion trong dãy điện hoá có tính oxi hoá TĂNG dần từ trái sang phải — ngược chiều với hàng kim loại.\n`
          + `Thứ tự các ion đã cho là ${ds(ion)} ⇒ mạnh nhất là ${bo[3].ion}.` },
      'Hai hàng của dãy điện hoá đọc NGƯỢC chiều nhau: kim loại mạnh dần khi sang trái, ion mạnh dần khi sang phải. '
      + 'Đề hay đổi từ hỏi kim loại sang hỏi ion để bẫy.');
  } },

/* ---------- mức 2: sắp thứ tự ---------- */
{ ma: 'hoa-dayvt-sapxep', chuong: 'Dãy điện hoá', muc: 2, dang: 'mc',
  tao(R) {
    const bo = R.chonNhieu(KL, 3).sort((a, b) => viTri[a.kl] - viTri[b.kl]).map(x => x.kl);
    const giam = R.chon([true, false]);
    const dung = ds(giam ? bo : bo.slice().reverse());
    const hv = [[bo[1], bo[0], bo[2]], [bo[0], bo[2], bo[1]], [bo[2], bo[1], bo[0]], [bo[1], bo[2], bo[0]]];
    const nhieu = baNhieu(dung, hv.map(ds));
    if (!nhieu) return null;
    return MC(R, `Dãy nào sau đây sắp xếp các kim loại theo chiều tính khử <b>${giam ? 'giảm' : 'tăng'} dần</b>?`,
      { d: dung, s: nhieu,
        sv: { [ds(giam ? bo.slice().reverse() : bo)]: `đây đúng là ba kim loại đó nhưng xếp NGƯỢC chiều — đề hỏi ${giam ? 'giảm' : 'tăng'} dần` },
        v: `Vị trí ba kim loại trong dãy điện hoá theo thứ tự trái sang phải là ${ds(bo)}.\n`
          + `Sang phải thì tính khử giảm, nên chiều ${giam ? 'GIẢM' : 'TĂNG'} dần là ${dung}.` },
      'Bước một: xếp lại đúng vị trí trong dãy. Bước hai: đọc kỹ đề hỏi TĂNG hay GIẢM. '
      + 'Phương án nhiễu nặng nhất luôn là dãy đúng nhưng đảo chiều.');
  } },

/* ---------- mức 2: quy tắc alpha ---------- */
{ ma: 'hoa-dayvt-alpha', chuong: 'Dãy điện hoá', muc: 2, dang: 'mc',
  tao(R) {
    /* kim loại X đẩy được ion Y⁺ khi X đứng TRƯỚC Y và X không tan trong nước */
    const y = R.chon(KL.filter(x => viTri[x.kl] > viTri['Zn']));
    const truoc = dayDuoc.filter(x => viTri[x.kl] < viTri[y.kl]);
    const sau = dayDuoc.filter(x => viTri[x.kl] > viTri[y.kl]);
    if (!truoc.length || sau.length < 3) return null;
    const dung = R.chon(truoc).kl;
    const nhieu = R.chonNhieu(sau, 3).map(x => x.kl);
    return MC(R, `Kim loại nào sau đây đẩy được ${y.kl} ra khỏi dung dịch muối ${y.ion.replace(/[⁺²³]/g, '')} tương ứng?`,
      { d: dung, s: nhieu,
        sv: Object.fromEntries(nhieu.map(k => [k, `${k} đứng SAU ${y.kl} trong dãy điện hoá nên tính khử yếu hơn, không khử nổi ion ${y.ion}`])),
        v: `Quy tắc alpha: chất khử mạnh cộng chất oxi hoá mạnh cho chất khử yếu và chất oxi hoá yếu.\n`
          + `${dung} đứng TRƯỚC ${y.kl} trong dãy điện hoá nên có tính khử mạnh hơn ⇒ khử được ion ${y.ion} thành ${y.kl}.` },
      'Quy tắc alpha vẽ thành chữ α: kim loại ở góc dưới bên TRÁI đẩy được ion ở góc trên bên PHẢI. '
      + 'Nhưng nhớ loại trừ K, Ba, Ca, Na — mấy kim loại này gặp nước là phản ứng ngay chứ không đẩy được kim loại nào ra khỏi dung dịch muối.');
  } },

/* ---------- mức 2: kim loại tan trong nước ---------- */
{ ma: 'hoa-dayvt-nuoc', chuong: 'Dãy điện hoá', muc: 2, dang: 'mc',
  tao(R) {
    const dung = R.chon(DAY.filter(x => x.nuoc)).kl;
    const nhieu = R.chonNhieu(KL.filter(x => !x.nuoc && viTri[x.kl] < MOC_H), 3).map(x => x.kl);
    return MC(R, `Cho kim loại X vào lượng dư dung dịch CuSO₄, thấy có khí thoát ra và thu được kết tủa. Kim loại X là chất nào sau đây?`,
      { d: dung, s: nhieu,
        sv: Object.fromEntries(nhieu.map(k => [k, `${k} không phản ứng với nước ở điều kiện thường nên chỉ đẩy đồng ra khỏi muối, không có khí thoát ra`])),
        v: `Bốn kim loại đứng đầu dãy điện hoá là K, Ba, Ca, Na phản ứng ngay với NƯỚC trong dung dịch chứ không đẩy được kim loại ra khỏi muối.\n`
          + `${dung} + nước cho base tan và khí hydrogen; base sinh ra tiếp tục tạo kết tủa Cu(OH)₂ với muối.\n`
          + `Vậy hiện tượng vừa có khí vừa có kết tủa ứng với ${dung}.` },
      'Đây là bẫy kinh điển của quy tắc alpha: K, Ba, Ca, Na tuy đứng đầu dãy nhưng KHÔNG dùng để đẩy kim loại ra khỏi dung dịch muối, '
      + 'vì chúng phản ứng với nước trước. Dấu hiệu nhận ra trong đề: vừa có khí thoát ra vừa có kết tủa.');
  } }

]);

TD.KHO_LT.hoa = (TD.KHO_LT.hoa || []).concat([
{ cd: 'Đại cương kim loại', m: 1, a: true,  t: 'Trong dãy điện hoá, đi từ trái sang phải thì tính khử của kim loại giảm dần.', v: 'Đồng thời tính oxi hoá của ion kim loại tương ứng tăng dần — hai hàng đọc ngược chiều nhau.' },
{ cd: 'Đại cương kim loại', m: 1, a: false, t: 'Trong dãy điện hoá, đi từ trái sang phải thì tính khử của kim loại tăng dần.', v: 'Ngược lại — tính khử GIẢM dần. Kim loại càng về cuối dãy càng khó nhường electron.' },
{ cd: 'Đại cương kim loại', m: 1, a: true,  t: 'Trong dãy điện hoá, tính oxi hoá của các ion kim loại tăng dần từ trái sang phải.', v: 'Vì thế ion Au³⁺ ở cuối dãy có tính oxi hoá mạnh nhất, còn K⁺ ở đầu dãy yếu nhất.' },
{ cd: 'Đại cương kim loại', m: 2, a: true,  t: 'Kim loại đứng trước hydrogen trong dãy điện hoá thì khử được ion H⁺ của dung dịch HCl và H₂SO₄ loãng.', v: 'Đây là ý nghĩa của cột mốc hydrogen giữa dãy.' },
{ cd: 'Đại cương kim loại', m: 2, a: false, t: 'Mọi kim loại trong dãy điện hoá đều tan được trong dung dịch HCl loãng.', v: 'Chỉ kim loại đứng trước hydrogen mới tan. Cu, Ag, Hg, Pt, Au đứng sau H nên không tan.' },
{ cd: 'Đại cương kim loại', m: 2, a: true,  t: 'Theo quy tắc alpha, kim loại đứng trước đẩy được kim loại đứng sau ra khỏi dung dịch muối của nó.', v: 'Chất khử mạnh cộng chất oxi hoá mạnh cho chất khử yếu và chất oxi hoá yếu.' },
{ cd: 'Đại cương kim loại', m: 3, a: false, t: 'Có thể dùng Na để đẩy Cu ra khỏi dung dịch CuSO₄ vì Na đứng trước Cu trong dãy điện hoá.', v: 'Na phản ứng với NƯỚC trước, tạo NaOH rồi mới tạo kết tủa Cu(OH)₂ — không thu được Cu kim loại. Quy tắc alpha loại trừ K, Ba, Ca, Na.' },
{ cd: 'Đại cương kim loại', m: 3, a: true,  t: 'Bốn kim loại K, Ba, Ca, Na đứng đầu dãy điện hoá không dùng để đẩy kim loại khác ra khỏi dung dịch muối.', v: 'Vì chúng khử nước ngay ở điều kiện thường, sinh khí hydrogen và base tan.' },
{ cd: 'Đại cương kim loại', m: 2, a: true,  t: 'Trong dãy điện hoá, cặp Ag⁺/Ag đứng trước cặp Hg²⁺/Hg.', v: 'Theo thế điện cực chuẩn: Ag⁺/Ag bằng +0,80 V còn Hg²⁺/Hg bằng +0,85 V.' },
{ cd: 'Đại cương kim loại', m: 3, a: true,  t: 'Cặp Fe³⁺/Fe²⁺ nằm giữa cặp Cu²⁺/Cu và cặp Ag⁺/Ag trong dãy điện hoá.', v: 'Nhờ vậy Cu khử được Fe³⁺ thành Fe²⁺, còn Ag⁺ lại oxi hoá được Fe²⁺ thành Fe³⁺.' },
{ cd: 'Đại cương kim loại', m: 3, a: true,  t: 'Kim loại đứng sau hydrogen trong dãy điện hoá vẫn có thể tan trong dung dịch HNO₃ loãng.', v: 'Vì chất oxi hoá lúc này là ion nitrate trong môi trường acid chứ không phải ion H⁺.' },
{ cd: 'Đại cương kim loại', m: 2, a: false, t: 'Trong dãy điện hoá, kim loại đứng càng về sau thì càng dễ bị ăn mòn.', v: 'Ngược lại — càng về sau càng kém hoạt động nên càng bền. Trong ăn mòn điện hoá, kim loại đứng TRƯỚC bị ăn mòn.' }
]);
})();
