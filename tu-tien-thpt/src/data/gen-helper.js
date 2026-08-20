/* ============================================================
   TIỆN ÍCH DỰNG MẪU ĐỀ
   Hai khuôn dùng lại được nhiều nhất:
   - TD.mcTu : chọn 1 phương án đúng từ kho đúng + 3 phương án nhiễu từ kho sai
   - TD.dsTu : chọn 4 mệnh đề bất kỳ từ kho mệnh đề đã biết đúng/sai
   Kho 40 mệnh đề ⇒ hơn 90 000 câu đúng/sai khác nhau.
   ============================================================ */
window.TD = window.TD || {};

/* Mỗi phần tử kho: { t: 'nội dung', v: 'vì sao' } */
TD.mcTu = function (R, de, khoDung, khoSai, meo) {
  const d = R.chon(khoDung);
  const s = R.chonNhieu(khoSai.filter(x => x.t !== d.t), 3);
  const opts = TD.xaoR(R, [d].concat(s));
  return {
    q: de,
    opts: opts.map(x => x.t),
    ans: opts.indexOf(d),
    giai: `Đáp án đúng: ${d.t}\n${d.v || ''}\n\nVì sao các phương án còn lại sai:\n`
        + s.map(x => `· ${x.t} — ${x.v || 'không thoả yêu cầu đề bài.'}`).join('\n'),
    meo: meo
  };
};

/* Mỗi phần tử kho: { t: 'mệnh đề', a: true/false, v: 'giải thích' } */
TD.dsTu = function (R, de, kho, meo) {
  /* cố gắng lấy cả ý đúng lẫn ý sai cho cân, nhưng vẫn ngẫu nhiên */
  const dung = kho.filter(x => x.a), sai = kho.filter(x => !x.a);
  let c;
  if (dung.length >= 1 && sai.length >= 1) {
    const nDung = Math.min(dung.length, Math.max(1, Math.min(3, R.nguyen(1, 3))));
    const nSai = Math.min(sai.length, 4 - nDung);
    c = TD.xaoR(R, R.chonNhieu(dung, nDung).concat(R.chonNhieu(sai, nSai)));
    while (c.length < 4) {                       /* thiếu thì bù từ kho còn lại */
      const bu = kho.find(x => c.indexOf(x) < 0);
      if (!bu) break; c.push(bu);
    }
  } else c = R.chonNhieu(kho, 4);
  return {
    q: de,
    items: c.map(x => ({ t: x.t, a: x.a })),
    giai: c.map((x, i) => `Ý ${'abcd'[i]}) ${x.a ? 'ĐÚNG' : 'SAI'} — ${x.v}`).join('\n'),
    meo: meo
  };
};

/* Sinh 4 phương án số quanh đáp án đúng (dùng cho câu tính toán dạng trắc nghiệm) */
TD.mcSo = function (R, de, dapAn, nhieu, giai, meo, donVi) {
  const ds = TD.xaoR(R, [dapAn].concat(nhieu));
  const dv = donVi ? ' ' + donVi : '';
  return {
    q: de,
    opts: ds.map(x => TD.soVN(x) + dv),
    ans: ds.indexOf(dapAn),
    giai: giai, meo: meo
  };
};
