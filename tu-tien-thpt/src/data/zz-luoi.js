/* ============================================================
   SINH — LƯỚI THỨC ĂN DỰNG NGẪU NHIÊN
   Mẫu cũ dùng đúng một lưới cố định (Cỏ – Châu chấu – Thỏ – Ếch – Rắn –
   Đại bàng) nên 800 lượt bốc chỉ ra một hình. Ở đây vừa đổi hệ sinh thái
   vừa đổi CÁCH NỐI, rồi TỰ DÒ các chuỗi thức ăn từ chính lưới vừa dựng —
   nhờ vậy đáp án luôn khớp với hình chứ không phải chép sẵn.
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

/* Sáu vai cố định: sản xuất · hai loài ăn thực vật · một loài ăn thịt bậc
   thấp · một loài ăn thịt bậc cao · một loài đầu bảng. */
const HE = [
  { ten: 'đồng cỏ',  v: ['Cỏ', 'Châu chấu', 'Thỏ', 'Ếch', 'Rắn', 'Đại bàng'] },
  { ten: 'ruộng lúa', v: ['Lúa', 'Sâu hại lúa', 'Chuột đồng', 'Nhái', 'Rắn nước', 'Diều hâu'] },
  { ten: 'ao hồ',    v: ['Tảo', 'Giáp xác', 'Ốc', 'Cá nhỏ', 'Cá lớn', 'Chim bói cá'] },
  { ten: 'rừng',     v: ['Cây gỗ', 'Sâu ăn lá', 'Sóc', 'Chim sâu', 'Rắn', 'Đại bàng'] },
  { ten: 'ven biển', v: ['Rong biển', 'Cầu gai', 'Cua nhỏ', 'Cá bống', 'Cá mú', 'Rái cá'] }
];
/* Bốn cách nối, viết theo chỉ số vai: 0 sản xuất · 1,2 ăn thực vật ·
   3 ăn thịt · 4 ăn thịt bậc cao · 5 đầu bảng. */
const KIEU = [
  [[0, 1], [0, 2], [1, 3], [3, 4], [4, 5], [2, 5]],
  [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [4, 5]],
  [[0, 1], [0, 2], [1, 3], [3, 4], [4, 5], [2, 4]],
  [[0, 1], [0, 2], [1, 3], [2, 3], [1, 4], [3, 4], [4, 5]]
];

/* dò mọi chuỗi thức ăn: đường đi liên tục từ sinh vật sản xuất tới loài
   không còn ai ăn nó nữa */
const doChuoi = (cung, n) => {
  const raKhoi = i => cung.filter(c => c[0] === i).map(c => c[1]);
  const ra = [];
  const di = (i, duong) => {
    const tiep = raKhoi(i);
    if (!tiep.length) { ra.push(duong.slice()); return; }
    tiep.forEach(j => { duong.push(j); di(j, duong); duong.pop(); });
  };
  di(0, [0]);
  return ra;
};

TD.GEN.sinh = (TD.GEN.sinh || []).filter(x => x.ma !== 'sinh-hinh-luoi').concat([

{ ma: 'sinh-hinh-luoi', chuong: 'Sinh thái học', muc: 3, dang: 'mc',
  tao(R) {
    const he = R.chon(HE), ten = he.v;
    const cung = R.chon(KIEU);
    const chuoi = doChuoi(cung, 6);
    if (chuoi.length < 2) return null;
    /* độ cao mỗi loài trên hình = chuỗi dài nhất dẫn tới nó */
    const cao = [0, 0, 0, 0, 0, 0];
    for (let lan = 0; lan < 8; lan++)
      cung.forEach(([a, b]) => { if (cao[a] + 1 > cao[b]) cao[b] = cao[a] + 1; });
    const dem = {};
    const nut = ten.map((t, i) => {
      const h = cao[i];
      dem[h] = (dem[h] || 0) + 1;
      return { id: 's' + i, ten: t, h: h, x: 0 };
    });
    /* rải ngang theo từng tầng cho khỏi chồng nhau */
    const viTri = {};
    nut.forEach(z => { viTri[z.h] = (viTri[z.h] || 0); z.x = viTri[z.h] + (3 - dem[z.h]) * 0.5; viTri[z.h]++; });
    const hinh = TD.hinhLuoi(nut, cung.map(([a, b]) => ['s' + a, 's' + b]));
    const veChuoi = c => c.map(i => ten[i]).join(' → ');
    const dinh = ten[5];

    const hoi = R.chon(['soChuoi', 'bac', 'hequa']);
    if (hoi === 'soChuoi') {
      const dung = String(chuoi.length);
      const nhieu = baNhieu(dung, ['1', '2', '3', '4', '5'].filter(x => x !== dung));
      if (!nhieu) return null;
      return MC(R, `Cho lưới thức ăn của một hệ sinh thái ${he.ten} như hình vẽ (mũi tên chỉ chiều dòng năng lượng).${hinh}`
        + `Lưới thức ăn trên có bao nhiêu chuỗi thức ăn?`,
        { d: dung, s: nhieu,
          sv: { [String(chuoi.length - 1)]: 'đếm sót một đường đi — phải lần đủ mọi nhánh xuất phát từ sinh vật sản xuất',
                [String(chuoi.length + 1)]: 'đếm thừa: mỗi chuỗi phải đi LIÊN TỤC theo chiều mũi tên, không được nhảy ngang giữa hai nhánh' },
          v: `Mỗi chuỗi thức ăn là một đường đi liên tục từ sinh vật sản xuất tới loài cuối cùng không bị loài nào ăn nữa.\n`
            + chuoi.map((c, k) => `· Chuỗi ${k + 1}: ${veChuoi(c)}`).join('\n')
            + `\nVậy lưới có ${chuoi.length} chuỗi thức ăn.` },
        'Đếm chuỗi thức ăn là đếm số ĐƯỜNG ĐI từ sinh vật sản xuất tới mắt xích cuối, đi liên tục theo chiều mũi tên. '
        + 'Vẽ lại lưới ra nháp rồi lần từng nhánh, đừng nhẩm trong đầu.');
    }
    if (hoi === 'bac') {
      const bac = [...new Set(chuoi.filter(c => c[c.length - 1] === 5).map(c => c.length))].sort((a, b) => a - b);
      if (!bac.length) return null;
      const noi = b => b.length === 1 ? `Chỉ bậc dinh dưỡng cấp ${b[0]}`
                                      : 'Bậc dinh dưỡng cấp ' + b.slice().reverse().join(' và cấp ');
      const dung = noi(bac);
      const nhieu = baNhieu(dung, [noi([bac[0]]), noi([bac[bac.length - 1]]),
        noi(bac.map(x => x - 1)), noi(bac.map(x => x + 1))]);
      if (!nhieu) return null;
      return MC(R, `Cho lưới thức ăn của một hệ sinh thái ${he.ten} như hình vẽ (mũi tên chỉ chiều dòng năng lượng).${hinh}`
        + `${dinh} thuộc những bậc dinh dưỡng nào?`,
        { d: dung, s: nhieu,
          sv: { [noi(bac.map(x => x - 1))]: 'đếm thiếu một bậc: bậc dinh dưỡng cấp 1 là chính SINH VẬT SẢN XUẤT chứ không phải loài ăn nó',
                [noi([bac[0]])]: 'mới kể một chuỗi, còn chuỗi khác dẫn tới cùng loài này thì bỏ sót' },
          v: `Một loài tham gia nhiều chuỗi thì thuộc nhiều bậc dinh dưỡng khác nhau. Đếm vị trí của ${dinh} trong từng chuỗi:\n`
            + chuoi.filter(c => c[c.length - 1] === 5).map(c => `· ${veChuoi(c)} — đứng thứ ${c.length} ⇒ bậc dinh dưỡng cấp ${c.length}`).join('\n') },
        'Bậc dinh dưỡng cấp 1 luôn là sinh vật SẢN XUẤT, nên sinh vật tiêu thụ bậc 1 ứng với bậc dinh dưỡng cấp 2 — lệch nhau đúng một đơn vị.');
    }
    /* hệ quả khi một mắt xích giữa giảm mạnh */
    const giua = 3;
    const moi = cung.filter(c => c[1] === giua).map(c => c[0]);
    const anNo = cung.filter(c => c[0] === giua).map(c => c[1]);
    if (!moi.length || !anNo.length) return null;
    const dung = `${ten[moi[0]]} tăng số lượng, còn ${ten[anNo[0]]} giảm vì mất nguồn thức ăn`;
    const khac = [0, 1, 2, 4, 5].filter(i => moi.indexOf(i) < 0 && anNo.indexOf(i) < 0 && i !== 0);
    const nhieu = baNhieu(dung, [
      `${ten[anNo[0]]} tăng số lượng vì có thêm thức ăn`,
      `${ten[0]} phát triển tốt hơn do ít bị ăn`,
      khac.length ? `${ten[khac[0]]} tăng mạnh vì được giải phóng khỏi cạnh tranh` : null,
      `${ten[moi[0]]} cũng giảm theo vì mất nguồn thức ăn`
    ].filter(Boolean));
    if (!nhieu) return null;
    return MC(R, `Cho lưới thức ăn của một hệ sinh thái ${he.ten} như hình vẽ (mũi tên chỉ chiều dòng năng lượng).${hinh}`
      + `Nếu số lượng ${ten[giua].toLowerCase()} trong hệ giảm mạnh thì hệ quả trực tiếp nào sau đây có khả năng xảy ra nhất?`,
      { d: dung, s: nhieu,
        sv: { [`${ten[anNo[0]]} tăng số lượng vì có thêm thức ăn`]: `${ten[anNo[0]]} ăn ${ten[giua].toLowerCase()}, con mồi giảm thì nó phải giảm theo chứ không tăng`,
              [`${ten[0]} phát triển tốt hơn do ít bị ăn`]: `ngược lại — ${ten[moi[0]].toLowerCase()} mất thiên địch sẽ bùng phát và ăn nhiều hơn`,
              [`${ten[moi[0]]} cũng giảm theo vì mất nguồn thức ăn`]: `${ten[moi[0]]} là CON MỒI chứ không phải kẻ ăn thịt của ${ten[giua].toLowerCase()}, mất thiên địch thì nó tăng lên` },
        v: `Đọc hai chiều mũi tên quanh ${ten[giua].toLowerCase()}:\n`
          + `· Mũi tên ĐI VÀO từ ${moi.map(i => ten[i].toLowerCase()).join(', ')} ⇒ đó là nguồn thức ăn của nó. Mất thiên địch nên ${ten[moi[0]].toLowerCase()} bùng phát.\n`
          + `· Mũi tên ĐI RA tới ${anNo.map(i => ten[i].toLowerCase()).join(', ')} ⇒ đó là loài ăn nó. Mất nguồn thức ăn nên ${ten[anNo[0]].toLowerCase()} giảm.` },
      'Loài nào biến động thì xét hai chiều mũi tên quanh nó: mũi tên ĐI VÀO là nguồn thức ăn của nó, mũi tên ĐI RA là loài ăn nó. '
      + 'Con mồi mất thiên địch thì tăng, kẻ ăn thịt mất con mồi thì giảm.');
  }, _hinh: true }

]);
})();
