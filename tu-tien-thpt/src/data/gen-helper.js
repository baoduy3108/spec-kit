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
/* chienThuat: đoạn kết thêm vào lời giải, nói cách xử lí gọn cả bốn ý cùng lúc.
   Câu đúng/sai 4 ý là câu phân hoá, giải xong bốn ý rời rạc vẫn chưa đủ — học sinh
   cần biết cách dựng MỘT bảng/sơ đồ rồi soi cả bốn ý vào đó. */
TD.dsTu = function (R, de, kho, meo, chienThuat) {
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
    giai: c.map((x, i) => `Ý ${'abcd'[i]}) ${x.a ? 'ĐÚNG' : 'SAI'} — ${x.v}`).join('\n')
        + (chienThuat ? '\n\n' + chienThuat : ''),
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

/* ============================================================
   ĐỊNH DẠNG BIỂU THỨC TOÁN CHO GIỐNG ĐỀ THẬT
   Đề thi không bao giờ in "0x + 3y", "x² − 1x − 12" hay "(x − -3)".
   Mấy hàm dưới đây lo hết chuyện dấu và hệ số 0/1 để mẫu đề chỉ
   việc đưa số vào.
   ============================================================ */

/* Số âm phải dùng dấu trừ thật (−, U+2212) chứ không phải gạch nối ASCII */
TD.so = function (n) {
  return String(n).replace(/^-/, '−').replace('.', ',');
};

/* Một hạng tử a·<biến>, trả về '' khi hệ số bằng 0.
   dau = true ⇒ luôn in dấu ở đầu (dùng cho hạng tử thứ hai trở đi). */
TD.hangTu = function (a, bien, dau) {
  if (!a) return '';
  const am = a < 0, t = Math.abs(a);
  let so = (t === 1 && bien) ? '' : String(t).replace('.', ',');
  const than = so + (bien || '');
  if (dau) return (am ? ' − ' : ' + ') + than;
  return (am ? '−' : '') + than;
};

/* Dựng chuỗi đa thức từ danh sách [hệ số, 'biến'].
   TD.daThuc([[1,'x²'], [-1,'x'], [-12,'']]) ⇒ 'x² − x − 12'
   Toàn 0 thì trả về '0'. */
TD.daThuc = function (ds) {
  let ra = '';
  for (const [a, bien] of ds) {
    if (!a) continue;
    ra += ra ? TD.hangTu(a, bien, true) : TD.hangTu(a, bien, false);
  }
  return ra || '0';
};

/* Nhân tử (x − r): r âm thì đổi thành (x + |r|) */
TD.nhanTu = function (r, an) {
  const x = an || 'x';
  if (r === 0) return x;
  return r > 0 ? `(${x} − ${String(r).replace('.', ',')})`
               : `(${x} + ${String(-r).replace('.', ',')})`;
};

/* Cộng hai số có dấu: TD.cong(5, -3) ⇒ '5 − 3' */
TD.cong = function (a, b) {
  return TD.so(a) + (b < 0 ? ' − ' + String(-b).replace('.', ',') : ' + ' + String(b).replace('.', ','));
};

/* ============================================================
   KHỐI "VÌ SAO PHƯƠNG ÁN CÒN LẠI BỊ LOẠI"
   Trước đây mỗi phương án chiếm hai dòng, dòng dưới thụt vào sau mũi
   tên. Trên màn hình điện thoại ba phương án thành sáu dòng ngoằn
   ngoèo, rất khó soi. Lí do NGẮN thì gộp thẳng vào một dòng, chỉ lí
   do dài mới xuống dòng.
   ============================================================ */
TD.khoiLoai = function (opts, dung, sv, macDinh) {
  return opts.filter(x => x !== dung).map(x => {
    const ly = (sv && sv[x]) || (typeof macDinh === 'function' ? macDinh(x) : macDinh)
      || 'không thoả yêu cầu của đề.';
    /* đo và so trên phần chữ thật, bỏ thẻ HTML ra ngoài */
    const tho = String(ly).replace(/<[^>]+>/g, '');
    /* Lời giải MỞ ĐẦU bằng thẻ in đậm là loại tự mang nhãn — nó đã nêu mặt
       tiếng Anh ngay đầu dòng rồi, in thêm phương án nữa là lặp. Nhờ vậy câu
       từ vựng ra đúng kiểu tra từ điển:
         · lifelong learning (n): học tập suốt đời
       Chỉ nhận dấu hiệu <b> ở đầu chứ không so chuỗi con, vì lí do viết tay
       hay nhắc lại phương án giữa câu (ví dụ 'It was … that …' có chữ "that")
       và khớp chuỗi con sẽ nuốt mất nhãn của dòng đó. */
    if (/^\s*<b>/.test(String(ly))) return `· ${ly}`;
    return (tho.length <= 58 && tho.indexOf('\n') < 0)
      ? `· ${x} — ${ly}`
      : `· ${x}\n  → ${ly}`;
  }).join('\n');
};
