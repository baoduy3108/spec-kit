/* ============================================================
   SINH — LƯỚI THỨC ĂN
   Bản trước cho máy tự bốc CÁCH NỐI các loài theo vai trò rồi lắp tên
   vào. Hậu quả: sinh ra mũi tên "Sâu ăn lá → Rắn" — rắn không ăn sâu.
   Đa dạng kiểu đó là đa dạng bậy. Nay mỗi hệ sinh thái được viết tay
   trọn vẹn, TỪNG MŨI TÊN một đều là quan hệ ăn – bị ăn có thật; máy chỉ
   bốc xem dùng hệ nào và hỏi câu gì, còn các chuỗi thức ăn thì tự dò
   ra từ chính lưới đó nên đáp án luôn khớp hình.
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {};

(function () {
const MC = (R, de, it, meo) => {
  const opts = TD.xaoR(R, [it.d].concat(it.s));
  return { q: de, opts: opts, ans: opts.indexOf(it.d),
    giai: `Đáp án đúng: ${it.d}\n${it.v}\n\nVì sao các phương án còn lại bị loại:\n`
      + TD.khoiLoai(opts, it.d, it.sv, 'không khớp với lưới thức ăn trên hình.'),
    meo: meo };
};
const baNhieu = (dung, ung) => {
  const ra = [];
  for (const x of ung) if (x !== dung && ra.indexOf(x) < 0) ra.push(x);
  return ra.length >= 3 ? ra.slice(0, 3) : null;
};

/* Mỗi lưới viết tay và soi từng cạnh. Ghi chú bên cạnh là căn cứ sinh học. */
const HE = [
  /* Lưới kinh điển của SGK. Đã bỏ hai lưới đợt trước (rừng ngập mặn, thảo
     nguyên) vì có cạnh không chắc: chim ưng biển ăn CÁ chứ không ăn cò, còn
     báo ăn cáo thì không phải quan hệ điển hình. Thà ít lưới mà đúng. */
  { ten: 'đồng cỏ',
    v: ['Cỏ', 'Châu chấu', 'Thỏ', 'Ếch', 'Rắn', 'Đại bàng'],
    c: [[0, 1], [0, 2],          /* châu chấu và thỏ đều ăn cỏ */
        [1, 3],                  /* ếch bắt côn trùng */
        [3, 4],                  /* rắn ăn ếch */
        [4, 5], [2, 5]],         /* đại bàng ăn rắn và ăn thỏ */
    o: [[1.15, 0], [0.3, 1], [2.2, 1], [0.3, 2], [0.3, 3], [1.6, 4]] },

  { ten: 'ruộng lúa',
    v: ['Lúa', 'Sâu hại lúa', 'Chuột đồng', 'Nhái', 'Rắn', 'Diều hâu'],
    c: [[0, 1], [0, 2],
        [1, 3],                  /* nhái bắt sâu */
        [3, 4], [2, 4],          /* rắn ăn nhái và ăn chuột */
        [4, 5], [2, 5]],         /* diều hâu ăn rắn và ăn chuột */
    o: [[1.15, 0], [0.3, 1], [2.2, 1], [0.3, 2], [1.0, 3], [2.2, 4]] },

  { ten: 'rừng',
    v: ['Cây gỗ', 'Sâu ăn lá', 'Sóc', 'Chim sâu', 'Rắn', 'Đại bàng'],
    c: [[0, 1], [0, 2],
        [1, 3],                  /* chim sâu bắt sâu ăn lá */
        [3, 4],                  /* rắn ăn chim sâu và trứng chim */
        [4, 5], [2, 5]],         /* đại bàng ăn rắn và ăn sóc */
    o: [[1.15, 0], [0.3, 1], [2.2, 1], [0.3, 2], [0.3, 3], [1.6, 4]] },

  { ten: 'ao hồ',
    v: ['Tảo', 'Giáp xác', 'Ốc', 'Cá chép', 'Cá quả', 'Rái cá'],
    c: [[0, 1], [0, 2],          /* giáp xác và ốc đều ăn tảo */
        [1, 3], [2, 3],          /* cá chép ăn giáp xác và nghiền được vỏ ốc */
        [3, 4],                  /* cá quả ăn cá nhỏ hơn */
        [4, 5]],                 /* rái cá bắt cá quả */
    o: [[1.15, 0], [0.3, 1], [2.1, 1], [1.15, 2], [1.15, 3], [1.15, 4]] },

  { ten: 'vườn rau',
    v: ['Rau cải', 'Sâu xanh', 'Rệp', 'Bọ rùa', 'Chim sâu', 'Rắn'],
    c: [[0, 1], [0, 2],          /* sâu xanh và rệp đều ăn rau */
        [2, 3],                  /* bọ rùa là thiên địch của rệp */
        [1, 4],                  /* chim sâu bắt sâu xanh */
        [4, 5]],                 /* rắn ăn chim sâu và trứng chim */
    o: [[1.15, 0], [0.3, 1], [2.1, 1], [2.1, 2], [0.3, 2], [0.3, 3]] }
];

/* dò mọi chuỗi thức ăn: đường đi liên tục từ sinh vật sản xuất tới loài
   không còn loài nào ăn nó nữa */
const doChuoi = cung => {
  const ra = [];
  const di = (i, duong) => {
    const tiep = cung.filter(c => c[0] === i).map(c => c[1]);
    if (!tiep.length) { ra.push(duong.slice()); return; }
    tiep.forEach(j => { duong.push(j); di(j, duong); duong.pop(); });
  };
  di(0, [0]);
  return ra;
};

TD.GEN.sinh = (TD.GEN.sinh || []).filter(x => x.ma !== 'sinh-hinh-luoi').concat([

{ ma: 'sinh-hinh-luoi', chuong: 'Sinh thái học', muc: 3, dang: 'mc',
  tao(R) {
    const he = R.chon(HE), ten = he.v, cung = he.c;
    const chuoi = doChuoi(cung);
    if (chuoi.length < 2) return null;
    /* Vị trí từng loài đặt sẵn theo lưới, không xếp tự động: có vậy mũi tên mới
       vừa THẲNG vừa không quét ngang qua ô của loài khác. */
    const nut = ten.map((t2, i) => ({ id: 's' + i, ten: t2, x: he.o[i][0], h: he.o[i][1] }));
    const hinh = TD.hinhLuoi(nut, cung.map(([a, b]) => ['s' + a, 's' + b]));
    const veChuoi = c => c.map(i => ten[i]).join(' → ');
    const dinh = chuoi[0][chuoi[0].length - 1];

    const hoi = R.chon(['soChuoi', 'bac', 'hequa']);
    if (hoi === 'soChuoi') {
      const dung = String(chuoi.length);
      const nhieu = baNhieu(dung, ['2', '3', '4', '5', '6'].filter(x => x !== dung));
      if (!nhieu) return null;
      return MC(R, `Cho lưới thức ăn của một hệ sinh thái ${he.ten} như hình vẽ (mũi tên chỉ chiều dòng năng lượng).${hinh}`
        + `Lưới thức ăn trên có bao nhiêu chuỗi thức ăn?`,
        { d: dung, s: nhieu,
          sv: { [String(chuoi.length - 1)]: 'đếm sót một đường đi — phải lần đủ mọi nhánh xuất phát từ sinh vật sản xuất',
                [String(chuoi.length + 1)]: 'đếm thừa: mỗi chuỗi phải đi LIÊN TỤC theo chiều mũi tên, không được nhảy ngang từ nhánh này sang nhánh kia' },
          v: `Mỗi chuỗi thức ăn là một đường đi liên tục từ sinh vật sản xuất tới loài cuối cùng không bị loài nào ăn nữa.\n`
            + chuoi.map((c, k) => `· Chuỗi ${k + 1}: ${veChuoi(c)}`).join('\n')
            + `\nVậy lưới có ${chuoi.length} chuỗi thức ăn.` },
        'Đếm chuỗi thức ăn là đếm số ĐƯỜNG ĐI từ sinh vật sản xuất tới mắt xích cuối, đi liên tục theo chiều mũi tên. '
        + 'Vẽ lại lưới ra nháp rồi lần từng nhánh, đừng nhẩm trong đầu.');
    }
    if (hoi === 'bac') {
      const ds = chuoi.filter(c => c[c.length - 1] === dinh);
      const bac = [...new Set(ds.map(c => c.length))].sort((a, b) => a - b);
      const noi = b => b.length === 1 ? `Chỉ bậc dinh dưỡng cấp ${b[0]}`
                                      : 'Bậc dinh dưỡng cấp ' + b.slice().reverse().join(' và cấp ');
      const dung = noi(bac);
      const nhieu = baNhieu(dung, [noi([bac[0]]), noi([bac[bac.length - 1]]),
        noi(bac.map(x => x - 1)), noi(bac.map(x => x + 1))]);
      if (!nhieu) return null;
      return MC(R, `Cho lưới thức ăn của một hệ sinh thái ${he.ten} như hình vẽ (mũi tên chỉ chiều dòng năng lượng).${hinh}`
        + `${ten[dinh]} thuộc những bậc dinh dưỡng nào?`,
        { d: dung, s: nhieu,
          sv: { [noi(bac.map(x => x - 1))]: 'đếm thiếu một bậc: bậc dinh dưỡng cấp 1 là chính SINH VẬT SẢN XUẤT chứ không phải loài ăn nó',
                [noi([bac[0]])]: 'mới kể một chuỗi mà bỏ sót chuỗi khác cũng dẫn tới loài này' },
          v: `Một loài tham gia nhiều chuỗi thì thuộc nhiều bậc dinh dưỡng khác nhau. Đếm vị trí của ${ten[dinh].toLowerCase()} trong từng chuỗi:\n`
            + ds.map(c => `· ${veChuoi(c)} — đứng thứ ${c.length} ⇒ bậc dinh dưỡng cấp ${c.length}`).join('\n') },
        'Bậc dinh dưỡng cấp 1 luôn là sinh vật SẢN XUẤT, nên sinh vật tiêu thụ bậc 1 ứng với bậc dinh dưỡng cấp 2 — lệch nhau đúng một đơn vị.');
    }
    /* hệ quả khi một mắt xích giữa giảm mạnh: chỉ chọn loài vừa ăn loài khác
       vừa bị loài khác ăn, và phải có ít nhất một con mồi cùng một kẻ săn */
    const giua = TD.xaoR(R, ten.map((t2, i) => i))
      .find(i => i !== 0 && cung.some(c => c[1] === i) && cung.some(c => c[0] === i));
    if (giua === undefined) return null;
    const moi = cung.filter(c => c[1] === giua).map(c => c[0]);
    const anNo = cung.filter(c => c[0] === giua).map(c => c[1]);
    const dung = `${ten[moi[0]]} tăng số lượng, còn ${ten[anNo[0]]} giảm vì mất nguồn thức ăn`;
    const nhieu = baNhieu(dung, [
      `${ten[anNo[0]]} tăng số lượng vì có thêm thức ăn`,
      `${ten[0]} phát triển tốt hơn do ít bị ăn`,
      `${ten[moi[0]]} cũng giảm theo vì mất nguồn thức ăn`,
      `Số lượng các loài còn lại trong lưới đều không thay đổi`
    ]);
    if (!nhieu) return null;
    return MC(R, `Cho lưới thức ăn của một hệ sinh thái ${he.ten} như hình vẽ (mũi tên chỉ chiều dòng năng lượng).${hinh}`
      + `Nếu số lượng ${ten[giua].toLowerCase()} trong hệ giảm mạnh thì hệ quả trực tiếp nào sau đây có khả năng xảy ra nhất?`,
      { d: dung, s: nhieu,
        sv: { [`${ten[anNo[0]]} tăng số lượng vì có thêm thức ăn`]: `${ten[anNo[0]].toLowerCase()} ĂN ${ten[giua].toLowerCase()}, con mồi giảm thì nó phải giảm theo chứ không tăng`,
              [`${ten[0]} phát triển tốt hơn do ít bị ăn`]: `ngược lại — ${ten[moi[0]].toLowerCase()} mất thiên địch sẽ bùng phát và ăn nhiều hơn`,
              [`${ten[moi[0]]} cũng giảm theo vì mất nguồn thức ăn`]: `${ten[moi[0]].toLowerCase()} là CON MỒI của ${ten[giua].toLowerCase()} chứ không phải kẻ ăn thịt; mất thiên địch thì nó tăng lên`,
              'Số lượng các loài còn lại trong lưới đều không thay đổi': 'trong một lưới thức ăn, mọi mắt xích đều liên hệ với nhau nên một loài biến động sẽ kéo theo cả các loài liền kề' },
        v: `Đọc hai chiều mũi tên quanh ${ten[giua].toLowerCase()}:\n`
          + `· Mũi tên ĐI VÀO từ ${moi.map(i => ten[i].toLowerCase()).join(', ')} ⇒ đó là nguồn thức ăn của nó. Mất thiên địch nên ${ten[moi[0]].toLowerCase()} bùng phát.\n`
          + `· Mũi tên ĐI RA tới ${anNo.map(i => ten[i].toLowerCase()).join(', ')} ⇒ đó là loài ăn nó. Mất nguồn thức ăn nên ${ten[anNo[0]].toLowerCase()} giảm.` },
      'Loài nào biến động thì xét hai chiều mũi tên quanh nó: mũi tên ĐI VÀO là nguồn thức ăn của nó, mũi tên ĐI RA là loài ăn nó. '
      + 'Con mồi mất thiên địch thì tăng, kẻ ăn thịt mất con mồi thì giảm.');
  }, _hinh: true }

]);
})();
