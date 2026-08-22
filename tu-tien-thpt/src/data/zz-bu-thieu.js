/* ============================================================
   BÙ NỐT NHỮNG MẢNG CÒN TRỐNG SO VỚI ĐỀ CƯƠNG 2025
   Rà lại kho theo từng chuyên đề của chương trình 2018 thì còn
   bốn chỗ hụt thật sự:
     · Toán — đường thẳng trong không gian Oxyz (0 bộ sinh)
     · Lí   — sóng và điện trường (chỉ có mệnh đề, 0 bộ sinh)
     · Hoá  — dẫn xuất halogen (trống hẳn)
     · Hoá  — cấu tạo nguyên tử & bảng tuần hoàn (1 mệnh đề)
   Nạp sau các file lt-*.js và *-gen.js nên chỉ NỐI THÊM.
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {}; TD.KHO_LT = TD.KHO_LT || {};

(function () {
const S = TD.soVN, T = TD.lamTron, D = TD.dapSo;
const sn = v => String(v).replace('-', '−');
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
const bu = (mon, ds) => { TD.KHO_LT[mon] = (TD.KHO_LT[mon] || []).concat(ds); };

/* ============================================================
   TOÁN — ĐƯỜNG THẲNG TRONG KHÔNG GIAN Oxyz
   ============================================================ */
const bo3 = t => `(${t.map(sn).join('; ')})`;
/* hai vectơ có cùng phương không — dùng để loại phương án nhiễu vô tình đúng */
const cungPhuong = (a, b) => {
  const t = [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  return t[0] === 0 && t[1] === 0 && t[2] === 0;
};
/* phương trình chính tắc, các thành phần của VTCP đều khác 0 */
const ptCT = (A, u) => {
  const ve = (bien, a, m) => {
    const tu = a === 0 ? bien : `(${bien} ${a > 0 ? '−' : '+'} ${Math.abs(a)})`;
    return `${tu}/${sn(m)}`;
  };
  return `${ve('x', A[0], u[0])} = ${ve('y', A[1], u[1])} = ${ve('z', A[2], u[2])}`;
};
const VTCP = [[2, -1, 3], [1, 2, -2], [3, 1, -1], [-1, 2, 4], [2, 3, -1],
              [1, -3, 2], [-2, 1, 2], [3, -2, 1], [1, 1, -2], [2, -3, -1]];

TD.GEN.toan = (TD.GEN.toan || []).concat([

/* --- mức 1: đọc thẳng vectơ chỉ phương / điểm đi qua --- */
{ ma: 'toan-oxyz-dt-doc', chuong: 'Oxyz', muc: 1, dang: 'mc',
  tao(R) {
    const u = R.chon(VTCP);
    const A = [R.nguyen(-4, 4), R.nguyen(-4, 4), R.nguyen(-4, 4)];
    const pt = ptCT(A, u);
    if (R.chon([0, 1])) {
      const dung = bo3(u);
      const ung = [bo3(A), bo3([u[1], u[0], u[2]]), bo3([u[0], u[2], u[1]]), bo3(A.map(x => -x))]
        .filter((x, i) => i !== 1 || !cungPhuong([u[1], u[0], u[2]], u));
      const nhieu = baNhieu(dung, ung);
      if (!nhieu) return null;
      return MC(R, `Trong không gian Oxyz, cho đường thẳng d: ${pt}. Vectơ nào sau đây là một vectơ chỉ phương của d?`,
        { d: dung, s: nhieu,
          sv: { [bo3(A)]: 'đây là toạ độ điểm mà d đi qua, đọc ở TỬ số chứ không phải mẫu số',
                [bo3(A.map(x => -x))]: 'đây là toạ độ điểm đi qua nhưng còn đổi dấu, không liên quan tới phương của d' },
          v: `Ở dạng chính tắc, ba MẪU số chính là ba toạ độ của vectơ chỉ phương, `
            + `còn ba số trừ ở TỬ số cho biết điểm mà đường thẳng đi qua.\nVậy d có vectơ chỉ phương ${bo3(u)}.` },
        'Dạng chính tắc đọc như sau: mẫu số ⇒ vectơ chỉ phương · số trừ ở tử ⇒ điểm đi qua. '
        + 'Đổi dấu cả ba mẫu vẫn là một vectơ chỉ phương hợp lệ vì hai vectơ cùng phương.');
    }
    const dung = bo3(A);
    const nhieu = baNhieu(dung, [bo3(u), bo3(A.map(x => -x)), bo3([A[1], A[0], A[2]]), bo3(A.map((x, i) => x + u[i]))]);
    if (!nhieu) return null;
    return MC(R, `Trong không gian Oxyz, cho đường thẳng d: ${pt}. Điểm nào sau đây thuộc d?`,
      { d: dung, s: nhieu,
        sv: { [bo3(u)]: 'đây là vectơ chỉ phương đọc từ mẫu số, không phải một điểm của d',
              [bo3(A.map(x => -x))]: 'quên đổi dấu: ở tử số ghi x − a thì hoành độ điểm đi qua là a chứ không phải −a' },
        v: `Thay toạ độ điểm vào phương trình, cả ba phân số phải bằng nhau. Với ${bo3(A)} thì cả ba tử số đều bằng 0 `
          + `nên ba phân số cùng bằng 0 ⇒ điểm này thuộc d.` },
      'Điểm đi qua nhìn thẳng ở tử số: (x − a)/… ⇒ hoành độ là a. Dấu trừ trong ngoặc là bẫy quen thuộc nhất.');
  } },

/* --- mức 2: viết phương trình đường thẳng qua hai điểm --- */
{ ma: 'toan-oxyz-dt-quahaidiem', chuong: 'Oxyz', muc: 2, dang: 'mc',
  tao(R) {
    const A = [R.nguyen(-4, 4), R.nguyen(-4, 4), R.nguyen(-4, 4)];
    const u = R.chon(VTCP);
    const k = R.chon([1, 2]);
    const B = A.map((x, i) => x + k * u[i]);
    const AB = B.map((x, i) => x - A[i]);
    const dung = bo3(u);
    const ung = [bo3(A.map((x, i) => x + B[i])), bo3(A), bo3(B), bo3([AB[1], AB[0], AB[2]])]
      .filter(x => x !== dung);
    const nhieu = baNhieu(dung, ung.filter((x, i) => !(i === 3 && cungPhuong([AB[1], AB[0], AB[2]], u))));
    if (!nhieu) return null;
    return MC(R, `Trong không gian Oxyz, cho hai điểm A${bo3(A)} và B${bo3(B)}. `
      + `Đường thẳng AB có một vectơ chỉ phương là gì?`,
      { d: dung, s: nhieu,
        sv: { [bo3(A.map((x, i) => x + B[i]))]: 'đây là tổng toạ độ hai điểm, không mang ý nghĩa hình học nào ở đây',
              [bo3(A)]: 'đây là toạ độ điểm A, tức vectơ OA→ chứ không phải AB→',
              [bo3(B)]: 'đây là toạ độ điểm B, tức vectơ OB→ chứ không phải AB→' },
        v: `AB→ = (x_B − x_A; y_B − y_A; z_B − z_A) = ${bo3(AB)}.\n`
          + (k === 1 ? '' : `Rút gọn cho ${k} được ${bo3(u)} — hai vectơ này cùng phương nên đều là vectơ chỉ phương của AB.\n`)
          + `Vậy chọn ${bo3(u)}.` },
      'Vectơ chỉ phương lấy hiệu ĐIỂM CUỐI trừ ĐIỂM ĐẦU, rồi rút gọn cho ước chung để số nhỏ lại. '
      + 'Rút gọn hay đổi dấu đều không làm mất tính chỉ phương.');
  } },

/* --- mức 3: giao điểm của đường thẳng và mặt phẳng --- */
{ ma: 'toan-oxyz-dt-giao', chuong: 'Oxyz', muc: 3, dang: 'tln',
  tao(R) {
    const u = R.chon(VTCP);
    const n = R.chon([[1, 1, 1], [1, -2, 1], [2, 1, -1], [1, 2, 2], [3, -1, 2], [1, -1, 3]]);
    const tich = n[0] * u[0] + n[1] * u[1] + n[2] * u[2];
    if (tich === 0) return null;                       /* d song song hoặc nằm trong (P) */
    const t0 = R.chon([1, 2, -1, -2]);
    /* giao điểm không được có toạ độ 0: dòng "tổng ba toạ độ 0 + 0 + 0" đọc
       như đề in hỏng, mà toạ độ khác 0 cũng bắt học sinh tính thật */
    const M = [R.chon([-3, -2, -1, 1, 2, 3]), R.chon([-3, -2, -1, 1, 2, 3]), R.chon([-3, -2, -1, 1, 2, 3])];
    const A = M.map((x, i) => x - t0 * u[i]);
    const Dm = -(n[0] * M[0] + n[1] * M[1] + n[2] * M[2]);
    const tong = M[0] + M[1] + M[2];
    const ptP = TD.daThuc([[n[0], 'x'], [n[1], 'y'], [n[2], 'z'], [Dm, '']]) + ' = 0';
    /* n·A + D = −t₀·(n·u) nên bước giải luôn khớp khi tính lại */
    const nA = n[0] * A[0] + n[1] * A[1] + n[2] * A[2] + Dm;
    return {
      q: `Trong không gian Oxyz, cho đường thẳng d: ${ptCT(A, u)} và mặt phẳng (P): ${ptP}. `
        + `Gọi M là giao điểm của d và (P). Tính tổng x_M + y_M + z_M.`,
      ans: D(tong),
      giai: `Bước 1 — viết d ở dạng tham số từ dạng chính tắc:\n`
        + `  x = ${sn(A[0])} + ${sn(u[0])}t · y = ${sn(A[1])} + ${sn(u[1])}t · z = ${sn(A[2])} + ${sn(u[2])}t\n`
        + `Bước 2 — thay vào phương trình mặt phẳng rồi gom theo t:\n`
        + `  hệ số của t là ${sn(n[0])}·${sn(u[0])} + ${sn(n[1])}·${sn(u[1])} + ${sn(n[2])}·${sn(u[2])} = ${sn(tich)}\n`
        + `  phần tự do là ${sn(n[0])}·${sn(A[0])} + ${sn(n[1])}·${sn(A[1])} + ${sn(n[2])}·${sn(A[2])} + (${sn(Dm)}) = ${sn(nA)}\n`
        + `Bước 3 — giải ${sn(tich)}t + (${sn(nA)}) = 0 ⇒ t = ${sn(t0)}.\n`
        + `Bước 4 — thay t = ${sn(t0)} ngược lại vào phương trình tham số được M${bo3(M)}.\n`
        + `Bước 5 — tổng ba toạ độ: ${sn(M[0])} + ${sn(M[1])} + ${sn(M[2])} = ${D(tong)}.`,
      meo: 'Quy trình cố định cho mọi bài giao điểm: đưa d về THAM SỐ ⇒ thay cả ba biểu thức vào (P) ⇒ '
        + 'ra một phương trình bậc nhất theo t ⇒ có t rồi mới thay ngược lại. '
        + 'Nếu hệ số của t bằng 0 thì d song song với (P) hoặc nằm trong (P), không có giao điểm duy nhất.'
    };
  } }

]);

bu('toan', [
{ cd: 'Oxyz', m: 1, a: true,  t: 'Trong phương trình chính tắc của đường thẳng, ba mẫu số là toạ độ của một vectơ chỉ phương.', v: 'Còn ba số bị trừ ở tử số cho biết toạ độ một điểm mà đường thẳng đi qua.' },
{ cd: 'Oxyz', m: 1, a: false, t: 'Trong phương trình chính tắc của đường thẳng, ba mẫu số là toạ độ điểm mà đường thẳng đi qua.', v: 'Ngược lại: mẫu số là vectơ chỉ phương, còn điểm đi qua đọc ở tử số.' },
{ cd: 'Oxyz', m: 2, a: true,  t: 'Một đường thẳng có vô số vectơ chỉ phương, và hai vectơ chỉ phương bất kỳ của nó luôn cùng phương.', v: 'Nhân một vectơ chỉ phương với số thực khác 0 vẫn được vectơ chỉ phương.' },
{ cd: 'Oxyz', m: 2, a: true,  t: 'Đường thẳng đi qua hai điểm A và B nhận vectơ AB→ làm một vectơ chỉ phương.', v: 'AB→ lấy toạ độ điểm cuối trừ toạ độ điểm đầu.' },
{ cd: 'Oxyz', m: 2, a: true,  t: 'Đường thẳng vuông góc với mặt phẳng (P) nhận vectơ pháp tuyến của (P) làm vectơ chỉ phương.', v: 'Đây là cách viết nhanh phương trình đường vuông góc hạ từ một điểm xuống mặt phẳng.' },
{ cd: 'Oxyz', m: 2, a: false, t: 'Đường thẳng song song với mặt phẳng (P) nhận vectơ pháp tuyến của (P) làm vectơ chỉ phương.', v: 'Song song thì vectơ chỉ phương VUÔNG GÓC với pháp tuyến, tức tích vô hướng của chúng bằng 0.' },
{ cd: 'Oxyz', m: 3, a: true,  t: 'Đường thẳng d song song với mặt phẳng (P) khi tích vô hướng của vectơ chỉ phương với vectơ pháp tuyến bằng 0 và có một điểm của d không thuộc (P).', v: 'Thiếu điều kiện thứ hai thì d có thể nằm hẳn trong (P).' },
{ cd: 'Oxyz', m: 3, a: false, t: 'Nếu vectơ chỉ phương của d vuông góc với vectơ pháp tuyến của (P) thì chắc chắn d song song với (P).', v: 'Còn khả năng d NẰM TRONG (P). Phải kiểm tra thêm một điểm của d có thuộc (P) hay không.' },
{ cd: 'Oxyz', m: 3, a: true,  t: 'Để tìm giao điểm của đường thẳng với mặt phẳng, ta đưa đường thẳng về dạng tham số rồi thay vào phương trình mặt phẳng.', v: 'Kết quả là một phương trình bậc nhất theo tham số t.' },
{ cd: 'Oxyz', m: 3, a: true,  t: 'Góc giữa đường thẳng và mặt phẳng được tính bằng công thức sin φ = |u→ · n→| / (|u→| · |n→|).', v: 'Chú ý là SIN chứ không phải cos — khác với góc giữa hai đường thẳng hoặc giữa hai mặt phẳng.' },
{ cd: 'Oxyz', m: 3, a: false, t: 'Góc giữa đường thẳng và mặt phẳng được tính bằng cos φ = |u→ · n→| / (|u→| · |n→|).', v: 'Công thức đó cho góc giữa hai đường thẳng. Với đường thẳng và mặt phẳng thì vế trái là SIN φ.' },
{ cd: 'Oxyz', m: 3, a: true,  t: 'Hai đường thẳng chéo nhau khi hai vectơ chỉ phương của chúng không cùng phương và chúng không có điểm chung.', v: 'Không cùng phương mà vẫn cắt nhau thì là hai đường thẳng cắt nhau, không phải chéo nhau.' }
]);

/* ============================================================
   VẬT LÍ — SÓNG VÀ ĐIỆN TRƯỜNG (phần lớp 11 trong đề)
   ============================================================ */
TD.GEN.ly = (TD.GEN.ly || []).concat([

{ ma: 'ly-song-lamda', chuong: 'Sóng', muc: 1, dang: 'mc',
  tao(R) {
    const lam = R.nguyen(2, 12) * 5;                 /* cm */
    const f = R.chon([10, 20, 25, 40, 50]);          /* Hz */
    const v = TD.lamTron(lam / 100 * f, 4);          /* m/s */
    const dv = x => S(x, 2) + ' m/s';
    const dung = dv(v);
    const nhieu = baNhieu(dung, [dv(TD.lamTron(lam * f, 4)), dv(TD.lamTron(f / (lam / 100), 4)),
      dv(TD.lamTron(lam / 100 / f, 4)), dv(TD.lamTron(v * 2, 4))]);
    if (!nhieu) return null;
    return MC(R, `Một sóng cơ lan truyền trên mặt nước có bước sóng ${lam} cm và tần số ${f} Hz. `
      + `Tốc độ truyền sóng bằng bao nhiêu?`,
      { d: dung, s: nhieu,
        sv: { [dv(TD.lamTron(lam * f, 4))]: 'quên đổi bước sóng từ centimet sang mét — sai đúng 100 lần',
              [dv(TD.lamTron(f / (lam / 100), 4))]: 'chia ngược: công thức là bước sóng NHÂN tần số',
              [dv(TD.lamTron(lam / 100 / f, 4))]: 'chia thay vì nhân' },
        v: `Công thức liên hệ: v = λ·f.\n`
          + `Đổi đơn vị trước: λ = ${lam} cm = ${S(lam / 100, 2)} m.\n`
          + `v = ${S(lam / 100, 2)} · ${f} = ${S(v, 2)} m/s.` },
      'Ba đại lượng v, λ, f gắn với nhau bằng đúng một công thức v = λf. '
      + 'Sai lầm hay gặp nhất không phải ở công thức mà ở ĐƠN VỊ: bước sóng thường cho bằng cm, phải đổi ra mét trước khi nhân.');
  } },

{ ma: 'ly-song-tinh', chuong: 'Sóng', muc: 2, dang: 'tln', duong: true,
  tao(R) {
    /* tốc độ lấy bội của 20 để mọi chu kì trong danh sách đều cho bước sóng nguyên */
    const v = R.nguyen(1, 20) * 20;                  /* cm/s */
    const T0 = R.chon([0.1, 0.2, 0.25, 0.4, 0.5]);   /* s */
    const lam = TD.lamTron(v * T0, 4);
    if (!Number.isInteger(lam)) return null;
    return {
      q: `Một sóng cơ truyền dọc theo một sợi dây với tốc độ ${v} cm/s. Chu kì dao động của mỗi phần tử trên dây là `
        + `${S(T0, 2)} s. Bước sóng của sóng này bằng bao nhiêu centimet?`,
      ans: D(lam),
      giai: `Bước 1 — nhớ ý nghĩa của bước sóng: đó là quãng đường sóng truyền được trong đúng MỘT chu kì.\n`
        + `Bước 2 — từ đó suy ra λ = v·T.\n`
        + `Bước 3 — thay số: λ = ${v} · ${S(T0, 2)} = ${D(lam)} cm.\n`
        + `Bước 4 — kiểm tra đơn vị: tốc độ tính bằng cm/s nhân với thời gian tính bằng s ⇒ kết quả có đơn vị cm, khớp với câu hỏi.`,
      meo: 'λ = v·T = v/f. Nhớ theo nghĩa chứ đừng học vẹt: bước sóng là quãng đường sóng đi trong một chu kì, '
        + 'nên nó chính là công thức quãng đường quen thuộc s = v·t với t = T.'
    };
  } },

{ ma: 'ly-song-dung', chuong: 'Sóng', muc: 3, dang: 'tln', duong: true,
  tao(R) {
    /* Dựng ngược từ bước sóng cho mọi con số đều tròn: chọn λ chẵn rồi mới suy
       chiều dài dây, chọn tần số rồi mới suy tốc độ. Làm xuôi thì hơn hai phần
       ba số lần bốc bị loại vì chia không hết. */
    const lam = R.chon([10, 20, 30, 40, 50, 60]);    /* cm */
    const k = R.nguyen(2, 5);                        /* số bụng sóng */
    const l = k * lam / 2;                           /* cm, dây hai đầu cố định */
    const f = R.chon([10, 20, 25, 40, 50]);          /* Hz */
    const v = lam * f;                               /* cm/s */
    return {
      q: `Trên một sợi dây dài ${l} cm với hai đầu cố định đang có sóng dừng với ${k} bụng sóng. `
        + `Tốc độ truyền sóng trên dây là ${v} cm/s. Tần số của sóng bằng bao nhiêu Hz?`,
      ans: D(f),
      giai: `Bước 1 — điều kiện sóng dừng trên dây HAI ĐẦU CỐ ĐỊNH: chiều dài dây bằng một số nguyên lần nửa bước sóng, `
        + `và số nguyên đó chính bằng số bụng sóng.\n`
        + `Bước 2 — viết ra: ${l} = ${k} · λ/2.\n`
        + `Bước 3 — rút bước sóng: λ = 2 · ${l} / ${k} = ${D(lam)} cm.\n`
        + `Bước 4 — dùng v = λ·f để rút tần số: f = ${v} / ${D(lam)} = ${D(f)} Hz.\n`
        + `Bước 5 — đối chiếu: dây có ${k} bụng thì có ${k + 1} nút, hai nút ở đúng hai đầu cố định.`,
      meo: 'Phân biệt hai điều kiện sóng dừng: hai đầu cố định thì l = k·λ/2 (k là SỐ BỤNG, số nút là k + 1); '
        + 'một đầu tự do thì l = (2k + 1)·λ/4. Đọc kỹ đề xem đầu dây gắn cố định hay để tự do.'
    };
  } },

{ ma: 'ly-dientruong', chuong: 'Điện trường', muc: 2, dang: 'tln', duong: true,
  tao(R) {
    if (R.chon([0, 1])) {
      const q = R.nguyen(1, 9);                      /* μC */
      const E = R.nguyen(1, 9) * 1000;               /* V/m */
      const F = TD.lamTron(q * 1e-6 * E * 1000, 4);  /* mN */
      return {
        q: `Một điện tích điểm q = ${q}·10⁻⁶ C được đặt tại một điểm trong điện trường đều có cường độ điện trường `
          + `E = ${S(E)} V/m. Độ lớn lực điện tác dụng lên điện tích bằng bao nhiêu miliniutơn?`,
        ans: D(F),
        giai: `Bước 1 — công thức định nghĩa cường độ điện trường: E = F/q, suy ra F = q·E.\n`
          + `Bước 2 — thay số theo đơn vị chuẩn: F = ${q}·10⁻⁶ · ${S(E)} = ${S(TD.lamTron(q * E / 1000000, 6))} N.\n`
          + `Bước 3 — đổi sang miliniutơn: nhân với 1000 được ${D(F)} mN.\n`
          + `Bước 4 — nhận xét: lực điện tỉ lệ THUẬN với độ lớn điện tích, còn cường độ điện trường tại một điểm `
          + `thì không phụ thuộc điện tích thử đặt vào đó.`,
        meo: 'E = F/q là ĐỊNH NGHĨA của cường độ điện trường, đúng cho mọi điện trường. '
          + 'Đừng lẫn với E = kQ/r² — đó là công thức riêng cho điện trường do một điện tích điểm Q gây ra.'
      };
    }
    const U = R.nguyen(2, 30) * 10;                  /* V */
    const d = R.chon([2, 4, 5, 10, 20]);             /* cm */
    const E = TD.lamTron(U / (d / 100), 4);
    if (!Number.isInteger(E)) return null;
    return {
      q: `Hai bản kim loại phẳng song song đặt cách nhau ${d} cm, giữa hai bản có hiệu điện thế ${U} V. `
        + `Cường độ điện trường đều giữa hai bản bằng bao nhiêu V/m?`,
      ans: D(E),
      giai: `Bước 1 — với điện trường ĐỀU giữa hai bản song song: U = E·d, suy ra E = U/d.\n`
        + `Bước 2 — đổi khoảng cách sang mét: d = ${d} cm = ${S(d / 100, 2)} m.\n`
        + `Bước 3 — thay số: E = ${U} / ${S(d / 100, 2)} = ${D(E)} V/m.\n`
        + `Bước 4 — kiểm tra đơn vị: vôn chia mét cho ra V/m, đúng đơn vị của cường độ điện trường.`,
      meo: 'Công thức U = E·d chỉ đúng cho điện trường ĐỀU và d là khoảng cách đo DỌC THEO đường sức. '
        + 'Đơn vị V/m và N/C là một, vì 1 V = 1 J/C và 1 J = 1 N·m.'
    };
  } }

]);

bu('ly', [
{ cd: 'Điện trường', m: 1, a: true,  t: 'Cường độ điện trường tại một điểm được định nghĩa bằng thương của lực điện tác dụng lên một điện tích thử với độ lớn điện tích thử đó.', v: 'Công thức E = F/q, đơn vị V/m hoặc N/C.' },
{ cd: 'Điện trường', m: 2, a: true,  t: 'Cường độ điện trường tại một điểm không phụ thuộc vào độ lớn của điện tích thử đặt tại điểm đó.', v: 'Điện tích thử tăng thì lực tăng theo đúng tỉ lệ, nên thương F/q giữ nguyên.' },
{ cd: 'Điện trường', m: 2, a: false, t: 'Đặt một điện tích thử lớn hơn vào cùng một điểm thì cường độ điện trường tại đó tăng lên.', v: 'Cường độ điện trường là đặc trưng của chính điện trường tại điểm đó, không phụ thuộc điện tích thử.' },
{ cd: 'Điện trường', m: 2, a: true,  t: 'Trong điện trường đều giữa hai bản kim loại song song, hiệu điện thế liên hệ với cường độ điện trường theo công thức U = E·d.', v: 'd là khoảng cách giữa hai bản đo dọc theo đường sức.' },
{ cd: 'Điện trường', m: 3, a: true,  t: 'Cường độ điện trường do một điện tích điểm gây ra tỉ lệ nghịch với bình phương khoảng cách tới điện tích đó.', v: 'E = kQ/r², nên khoảng cách tăng gấp đôi thì cường độ giảm bốn lần.' },
{ cd: 'Điện trường', m: 3, a: false, t: 'Cường độ điện trường do một điện tích điểm gây ra tỉ lệ nghịch với khoảng cách tới điện tích đó.', v: 'Tỉ lệ nghịch với BÌNH PHƯƠNG khoảng cách, không phải với khoảng cách.' },
{ cd: 'Sóng', m: 2, a: true,  t: 'Bước sóng là quãng đường mà sóng truyền được trong một chu kì dao động.', v: 'Từ đó có λ = v·T = v/f.' },
{ cd: 'Sóng', m: 2, a: false, t: 'Bước sóng là quãng đường mà một phần tử của môi trường đi được trong một chu kì.', v: 'Phần tử môi trường chỉ dao động tại chỗ; bước sóng là quãng đường SÓNG truyền đi, không phải quãng đường phần tử đi.' },
{ cd: 'Sóng', m: 3, a: true,  t: 'Trên sợi dây có sóng dừng với hai đầu cố định, chiều dài dây bằng một số nguyên lần nửa bước sóng.', v: 'l = k·λ/2, trong đó k là số bụng sóng và số nút là k + 1.' },
{ cd: 'Sóng', m: 3, a: false, t: 'Trên sợi dây có sóng dừng với hai đầu cố định, số nút sóng bằng đúng số bụng sóng.', v: 'Số nút luôn nhiều hơn số bụng đúng một, vì hai đầu cố định đều là nút.' },
{ cd: 'Sóng', m: 3, a: true,  t: 'Khi sóng truyền từ môi trường này sang môi trường khác, tần số của sóng không đổi còn bước sóng thì thay đổi.', v: 'Tần số do nguồn quyết định; tốc độ truyền phụ thuộc môi trường nên λ = v/f đổi theo.' }
]);

/* ============================================================
   HOÁ — DẪN XUẤT HALOGEN VÀ CẤU TẠO NGUYÊN TỬ
   ============================================================ */
const DX = [
  { ten: '2-bromobutane', chinh: 'but-2-ene', phu: 'but-1-ene',
    v: 'nguyên tử bromine gắn ở C số 2, tách HBr thì H bị lấy từ C số 1 hoặc C số 3 — cả hai carbon này đều có hydrogen. '
      + 'Theo quy tắc Zaitsev, hydrogen bị tách ra từ carbon bên cạnh có ÍT hydrogen hơn, tạo alkene nhiều nhánh hơn ⇒ sản phẩm chính là but-2-ene.' },
  { ten: '2-chloropropane', chinh: 'propene', phu: 'propane',
    v: 'chloropropane bậc hai chỉ tách được một alkene duy nhất là propene, vì hai carbon bên cạnh đều là carbon số 1 và số 3 giống nhau.' },
  { ten: '2-bromo-2-methylbutane', chinh: '2-methylbut-2-ene', phu: '2-methylbut-1-ene',
    v: 'carbon mang bromine là carbon bậc ba. Tách hydrogen từ carbon số 3 (chỉ có hai hydrogen) cho alkene có ba nhóm thế ⇒ đó là sản phẩm chính theo Zaitsev.' },
  { ten: '3-bromopentane', chinh: 'pent-2-ene', phu: 'pent-1-ene',
    v: 'bromine ở carbon số 3, hai bên đều là carbon số 2 và số 4 tương đương nhau nên chỉ cho một alkene là pent-2-ene.' }
];

TD.GEN.hoa = (TD.GEN.hoa || []).concat([

{ ma: 'hoa-dxhalogen', chuong: 'Dẫn xuất halogen', muc: 2, dang: 'mc',
  tao(R) {
    const x = R.chon(DX);
    const nhieu = baNhieu(x.chinh, [x.phu, 'butane', 'ethylene', 'acetylene', 'propyne']
      .filter(t => t !== x.chinh).concat(DX.map(y => y.chinh).filter(t => t !== x.chinh)));
    if (!nhieu) return null;
    return MC(R, `Đun nóng ${x.ten} với dung dịch KOH trong ethanol, thu được sản phẩm hữu cơ chính là chất nào?`,
      { d: x.chinh, s: nhieu,
        sv: { [x.phu]: 'đây là sản phẩm PHỤ — nó sinh ra khi tách hydrogen từ carbon bên cạnh có nhiều hydrogen hơn, trái quy tắc Zaitsev' },
        v: `KOH trong ethanol là điều kiện của phản ứng TÁCH (loại HX) chứ không phải phản ứng thế.\n${x.v}` },
      'Hai điều kiện phải phân biệt cho bằng được: KOH trong NƯỚC ⇒ phản ứng THẾ, tạo alcohol. '
      + 'KOH trong ETHANOL, đun nóng ⇒ phản ứng TÁCH, tạo alkene. '
      + 'Khi tách có nhiều hướng thì áp dụng quy tắc Zaitsev: hydrogen bị tách khỏi carbon bên cạnh có ít hydrogen hơn.');
  } }

]);

/* Bảng nguyên tố cho câu cấu hình — chỉ lấy những nguyên tố chương trình yêu cầu,
   kể cả hai trường hợp bất thường Cr và Cu. */
const NT = [
  { z: 11, ten: 'sodium (Na)', ch: '1s²2s²2p⁶3s¹', ck: 3, nhom: 'IA', loai: 'kim loại' },
  { z: 12, ten: 'magnesium (Mg)', ch: '1s²2s²2p⁶3s²', ck: 3, nhom: 'IIA', loai: 'kim loại' },
  { z: 13, ten: 'aluminium (Al)', ch: '1s²2s²2p⁶3s²3p¹', ck: 3, nhom: 'IIIA', loai: 'kim loại' },
  { z: 15, ten: 'phosphorus (P)', ch: '1s²2s²2p⁶3s²3p³', ck: 3, nhom: 'VA', loai: 'phi kim' },
  { z: 16, ten: 'sulfur (S)', ch: '1s²2s²2p⁶3s²3p⁴', ck: 3, nhom: 'VIA', loai: 'phi kim' },
  { z: 17, ten: 'chlorine (Cl)', ch: '1s²2s²2p⁶3s²3p⁵', ck: 3, nhom: 'VIIA', loai: 'phi kim' },
  { z: 19, ten: 'potassium (K)', ch: '1s²2s²2p⁶3s²3p⁶4s¹', ck: 4, nhom: 'IA', loai: 'kim loại' },
  { z: 20, ten: 'calcium (Ca)', ch: '1s²2s²2p⁶3s²3p⁶4s²', ck: 4, nhom: 'IIA', loai: 'kim loại' },
  { z: 26, ten: 'iron (Fe)', ch: '1s²2s²2p⁶3s²3p⁶3d⁶4s²', ck: 4, nhom: 'VIIIB', loai: 'kim loại chuyển tiếp' },
  { z: 29, ten: 'copper (Cu)', ch: '1s²2s²2p⁶3s²3p⁶3d¹⁰4s¹', ck: 4, nhom: 'IB', loai: 'kim loại chuyển tiếp' },
  { z: 30, ten: 'zinc (Zn)', ch: '1s²2s²2p⁶3s²3p⁶3d¹⁰4s²', ck: 4, nhom: 'IIB', loai: 'kim loại chuyển tiếp' }
];

TD.GEN.hoa = (TD.GEN.hoa || []).concat([

{ ma: 'hoa-cauhinh', chuong: 'Cấu tạo nguyên tử – Bảng tuần hoàn', muc: 1, dang: 'mc',
  tao(R) {
    const x = R.chon(NT);
    if (R.chon([0, 1])) {
      const dung = `Chu kì ${x.ck}, nhóm ${x.nhom}`;
      const nhieu = baNhieu(dung, NT.map(y => `Chu kì ${y.ck}, nhóm ${y.nhom}`)
        .concat([`Chu kì ${x.ck + 1}, nhóm ${x.nhom}`, `Chu kì ${x.ck}, nhóm ${x.nhom === 'IA' ? 'IIA' : 'IA'}`]));
      if (!nhieu) return null;
      return MC(R, `Nguyên tử của nguyên tố X có cấu hình electron ${x.ch}. Nguyên tố X nằm ở vị trí nào trong bảng tuần hoàn?`,
        { d: dung, s: nhieu,
          v: `Đọc vị trí thẳng từ cấu hình:\n`
            + `· Số thứ tự chu kì = số lớp electron, tức là con số lớn nhất đứng trước chữ cái phân lớp. Ở đây là ${x.ck}.\n`
            + `· Nhóm ${x.nhom}: ${x.nhom.indexOf('B') >= 0
                ? 'electron cuối cùng điền vào phân lớp d nên X thuộc nhóm B — các nguyên tố chuyển tiếp'
                : 'electron cuối cùng điền vào phân lớp s hoặc p nên X thuộc nhóm A, và số thứ tự nhóm bằng tổng số electron ở lớp ngoài cùng'}.\n`
            + `Vậy X là ${x.ten}, số hiệu nguyên tử Z = ${x.z}.` },
        'Ba thứ đọc thẳng từ cấu hình, không cần tra bảng: SỐ LỚP ⇒ chu kì · phân lớp cuối là s hay p ⇒ nhóm A '
        + '(số nhóm bằng số electron lớp ngoài cùng) · phân lớp cuối là d ⇒ nhóm B.');
    }
    const dung = x.loai;
    const nhieu = baNhieu(dung, ['kim loại', 'phi kim', 'khí hiếm', 'kim loại chuyển tiếp'].filter(t => t !== dung));
    if (!nhieu) return null;
    return MC(R, `Nguyên tử của nguyên tố X có cấu hình electron ${x.ch}. X thuộc loại nguyên tố nào?`,
      { d: dung, s: nhieu,
        sv: { 'khí hiếm': 'khí hiếm có lớp ngoài cùng bão hoà 8 electron (riêng helium là 2), cấu hình của X không như vậy' },
        v: `Nhìn số electron lớp ngoài cùng và phân lớp đang được điền:\n`
          + (x.loai === 'kim loại chuyển tiếp'
              ? `· Electron cuối cùng điền vào phân lớp 3d ⇒ X là kim loại chuyển tiếp thuộc nhóm B.`
              : x.loai === 'kim loại'
                ? `· Lớp ngoài cùng chỉ có ít electron nên nguyên tử dễ NHƯỜNG electron ⇒ X là kim loại.`
                : `· Lớp ngoài cùng có nhiều electron nên nguyên tử dễ NHẬN thêm electron cho đủ tám ⇒ X là phi kim.`)
          + `\nVậy X là ${x.ten}.` },
      'Quy tắc nhanh theo số electron lớp ngoài cùng của nguyên tố nhóm A: 1, 2 hoặc 3 electron ⇒ kim loại · '
      + '5, 6 hoặc 7 electron ⇒ phi kim · 8 electron ⇒ khí hiếm. Riêng 4 electron thì phải xét thêm chu kì.');
  } }

]);

bu('hoa', [
{ cd: 'Dẫn xuất halogen', m: 1, a: true,  t: 'Dẫn xuất halogen của hydrocarbon là hợp chất thu được khi thay thế nguyên tử hydrogen trong phân tử hydrocarbon bằng nguyên tử halogen.', v: 'Ví dụ CH₃Cl, C₂H₅Br, CHCl₃.' },
{ cd: 'Dẫn xuất halogen', m: 2, a: true,  t: 'Đun dẫn xuất halogen với dung dịch kiềm trong nước thu được alcohol.', v: 'Đây là phản ứng THẾ nguyên tử halogen bằng nhóm hydroxy.' },
{ cd: 'Dẫn xuất halogen', m: 2, a: true,  t: 'Đun dẫn xuất halogen với dung dịch kiềm trong ethanol thu được alkene.', v: 'Đây là phản ứng TÁCH hydrogen halide. Chỉ khác dung môi mà sản phẩm đã khác hẳn.' },
{ cd: 'Dẫn xuất halogen', m: 2, a: false, t: 'Đun dẫn xuất halogen với dung dịch kiềm trong ethanol thu được alcohol.', v: 'Trong ethanol thì xảy ra phản ứng tách tạo alkene; muốn ra alcohol phải dùng kiềm trong NƯỚC.' },
{ cd: 'Dẫn xuất halogen', m: 3, a: true,  t: 'Theo quy tắc Zaitsev, khi tách hydrogen halide, nguyên tử hydrogen bị tách ra từ nguyên tử carbon bên cạnh có bậc cao hơn.', v: 'Nói cách khác là carbon có ít hydrogen hơn, cho alkene nhiều nhóm thế hơn và bền hơn.' },
{ cd: 'Dẫn xuất halogen', m: 3, a: false, t: 'Theo quy tắc Zaitsev, nguyên tử hydrogen bị tách ra từ nguyên tử carbon bên cạnh có nhiều hydrogen nhất.', v: 'Ngược lại — tách từ carbon có ÍT hydrogen hơn. Nhớ theo câu "giàu càng giàu, nghèo càng nghèo".' },
{ cd: 'Dẫn xuất halogen', m: 2, a: true,  t: 'Các dẫn xuất halogen hầu như không tan trong nước nhưng tan tốt trong dung môi hữu cơ.', v: 'Phân tử ít phân cực nên không tạo được liên kết hydrogen với nước.' },
{ cd: 'Cấu tạo nguyên tử – Bảng tuần hoàn', m: 1, a: true,  t: 'Số thứ tự chu kì của một nguyên tố bằng số lớp electron trong nguyên tử của nguyên tố đó.', v: 'Đọc thẳng từ cấu hình: con số lớn nhất đứng trước chữ cái phân lớp chính là số lớp.' },
{ cd: 'Cấu tạo nguyên tử – Bảng tuần hoàn', m: 2, a: true,  t: 'Với nguyên tố nhóm A, số thứ tự nhóm bằng số electron ở lớp ngoài cùng.', v: 'Nguyên tố nhóm A là nguyên tố có electron cuối cùng điền vào phân lớp s hoặc p.' },
{ cd: 'Cấu tạo nguyên tử – Bảng tuần hoàn', m: 2, a: false, t: 'Với mọi nguyên tố, số thứ tự nhóm luôn bằng số electron ở lớp ngoài cùng.', v: 'Chỉ đúng cho nhóm A. Nguyên tố nhóm B tính theo tổng số electron của phân lớp d và phân lớp s ngoài cùng.' },
{ cd: 'Cấu tạo nguyên tử – Bảng tuần hoàn', m: 2, a: true,  t: 'Số hiệu nguyên tử bằng số proton trong hạt nhân và cũng bằng số electron của nguyên tử trung hoà.', v: 'Số hiệu nguyên tử cũng chính là số thứ tự ô trong bảng tuần hoàn.' },
{ cd: 'Cấu tạo nguyên tử – Bảng tuần hoàn', m: 3, a: true,  t: 'Trong một chu kì, theo chiều tăng của điện tích hạt nhân, bán kính nguyên tử giảm dần còn độ âm điện tăng dần.', v: 'Cùng số lớp mà hạt nhân hút mạnh hơn nên nguyên tử co lại.' },
{ cd: 'Cấu tạo nguyên tử – Bảng tuần hoàn', m: 3, a: false, t: 'Trong một chu kì, theo chiều tăng của điện tích hạt nhân, bán kính nguyên tử tăng dần.', v: 'Bán kính GIẢM dần trong một chu kì; nó chỉ tăng khi đi xuống trong cùng một nhóm vì thêm lớp electron.' }
]);


/* ============================================================
   THẺ TÀNG KINH CÁC CHO BỐN CHUYÊN ĐỀ VỪA THÊM
   Mỗi chuyên đề phải có thẻ riêng, nếu không thì nút "Kiểm tra ngay"
   không biết bám vào đâu.
   ============================================================ */
const them = (khoa, ds) => { TD.KHO[khoa] = (TD.KHO[khoa] || []).concat(ds); };

them('hoa_ct', [
{ nhom: 'Hữu cơ', cd: 'Dẫn xuất halogen', ten: 'Dẫn xuất halogen — thế hay tách là do DUNG MÔI', cap: 2,
  ct: '<b>Định nghĩa:</b> thay một hay nhiều nguyên tử hydrogen của hydrocarbon bằng halogen. '
    + 'Ví dụ CH₃Cl, C₂H₅Br, CHCl₃, CF₂Cl₂.<br>'
    + '<b>Hai phản ứng phải phân biệt bằng được:</b><br>'
    + '· <b>KOH trong NƯỚC</b>, đun nóng ⇒ phản ứng <b>THẾ</b>: R–X + KOH → R–OH + KX (ra alcohol)<br>'
    + '· <b>KOH trong ETHANOL</b>, đun nóng ⇒ phản ứng <b>TÁCH</b>: R–X + KOH → alkene + KX + H₂O<br>'
    + '<b>Quy tắc Zaitsev:</b> khi tách HX mà có nhiều hướng, nguyên tử hydrogen bị tách khỏi carbon bên cạnh '
    + 'có <b>ÍT hydrogen hơn</b> (carbon bậc cao hơn) ⇒ cho alkene nhiều nhóm thế hơn, bền hơn.<br>'
    + '<b>Tính chất vật lí:</b> hầu như không tan trong nước, tan tốt trong dung môi hữu cơ.',
  khi: 'Đề cho một dẫn xuất halogen kèm điều kiện phản ứng rồi hỏi sản phẩm chính.',
  vd: '2-bromobutane + KOH/ethanol, t° → sản phẩm chính là but-2-ene (không phải but-1-ene).',
  bay: 'Chỉ khác nhau ở chữ "trong nước" hay "trong ethanol" mà sản phẩm đã khác hẳn loại chất. '
     + 'Đọc điều kiện trước, viết phương trình sau.' },

{ nhom: 'Nền tảng', cd: 'Cấu tạo nguyên tử – Bảng tuần hoàn', ten: 'Từ cấu hình electron đọc thẳng ra vị trí', cap: 1,
  ct: '<b>Ba thứ đọc thẳng từ cấu hình, không cần tra bảng:</b><br>'
    + '· <b>Chu kì</b> = số lớp electron = con số lớn nhất đứng trước chữ cái phân lớp.<br>'
    + '· <b>Nhóm A</b> khi electron cuối cùng điền vào phân lớp s hoặc p; số thứ tự nhóm = số electron lớp ngoài cùng.<br>'
    + '· <b>Nhóm B</b> khi electron cuối cùng điền vào phân lớp d.<br>'
    + '<b>Loại nguyên tố theo số electron lớp ngoài cùng (nhóm A):</b> 1–3 ⇒ kim loại · 5–7 ⇒ phi kim · '
    + '8 ⇒ khí hiếm · 4 ⇒ còn tuỳ chu kì.<br>'
    + '<b>Quy luật trong một chu kì</b> (trái sang phải): bán kính GIẢM · độ âm điện TĂNG · tính kim loại GIẢM.<br>'
    + '<b>Quy luật trong một nhóm A</b> (trên xuống dưới): bán kính TĂNG · độ âm điện GIẢM · tính kim loại TĂNG.<br>'
    + '<b>Hai ngoại lệ phải nhớ:</b> Cr là 3d⁵4s¹ và Cu là 3d¹⁰4s¹ — nửa bão hoà và bão hoà thì bền hơn.',
  khi: 'Câu nhận biết mở đầu đề Hoá: cho Z hoặc cho cấu hình rồi hỏi vị trí, loại nguyên tố.',
  vd: 'Z = 26 (Fe): 1s²2s²2p⁶3s²3p⁶3d⁶4s² ⇒ 4 lớp ⇒ chu kì 4; electron cuối vào 3d ⇒ nhóm B.',
  bay: 'Viết cấu hình theo mức năng lượng (4s trước 3d) nhưng SẮP XẾP lại theo lớp khi ghi ra. '
     + 'Số thứ tự nhóm bằng số electron lớp ngoài cùng chỉ đúng cho nhóm A.' }
]);

them('ly_ct', [
{ nhom: 'V. Lớp 10–11', cd: 'Sóng', ten: 'Sóng cơ — bước sóng và điều kiện sóng dừng', cap: 2,
  ct: '<b>Bước sóng</b> λ là quãng đường sóng truyền được trong đúng một chu kì: <b>λ = v·T = v/f</b>.<br>'
    + '<b>Đơn vị</b> là chỗ sai nhiều nhất: đề hay cho λ bằng cm mà hỏi v bằng m/s.<br>'
    + '<b>Khi sóng truyền sang môi trường khác:</b> tần số f KHÔNG đổi (do nguồn quyết định), tốc độ v đổi '
    + 'theo môi trường, nên bước sóng λ đổi theo.<br>'
    + '<b>Sóng dừng — hai đầu cố định:</b> l = k·λ/2 với k là <b>số bụng</b>; số nút = k + 1.<br>'
    + '<b>Sóng dừng — một đầu cố định một đầu tự do:</b> l = (2k + 1)·λ/4; đầu tự do luôn là bụng.<br>'
    + '<b>Khoảng cách:</b> hai nút liên tiếp hoặc hai bụng liên tiếp cách nhau λ/2; nút và bụng liền kề cách nhau λ/4.',
  khi: 'Bài tính bước sóng, tần số, tốc độ truyền, hoặc đếm số nút số bụng trên dây.',
  vd: 'Dây dài 60 cm hai đầu cố định có 3 bụng ⇒ λ = 2·60/3 = 40 cm; nếu v = 800 cm/s thì f = 20 Hz.',
  bay: 'Phần tử môi trường chỉ dao động TẠI CHỖ; bước sóng là quãng đường SÓNG truyền, không phải quãng đường '
     + 'phần tử đi được. Số nút luôn nhiều hơn số bụng đúng một.' },

{ nhom: 'V. Lớp 10–11', cd: 'Điện trường', ten: 'Điện trường — định nghĩa và điện trường đều', cap: 2,
  ct: '<b>Định nghĩa:</b> E = F/q, đơn vị V/m (cũng chính là N/C). Suy ra lực điện <b>F = q·E</b>.<br>'
    + '<b>Cường độ điện trường tại một điểm KHÔNG phụ thuộc điện tích thử</b> đặt vào đó — đổi điện tích thử thì '
    + 'lực đổi theo đúng tỉ lệ, thương F/q giữ nguyên.<br>'
    + '<b>Điện trường của một điện tích điểm:</b> E = k·|Q|/r² với k = 9·10⁹ N·m²/C². '
    + 'Tỉ lệ nghịch với BÌNH PHƯƠNG khoảng cách — xa gấp đôi thì yếu đi bốn lần.<br>'
    + '<b>Điện trường đều</b> giữa hai bản kim loại song song: <b>U = E·d</b>, đường sức là những đường thẳng '
    + 'song song cách đều, d đo dọc theo đường sức.<br>'
    + '<b>Công của lực điện:</b> A = q·U, không phụ thuộc hình dạng đường đi.',
  khi: 'Bài tính lực điện, cường độ điện trường, hiệu điện thế giữa hai bản.',
  vd: 'Hai bản cách nhau 5 cm, U = 100 V ⇒ E = 100/0,05 = 2000 V/m.',
  bay: 'Đừng lẫn hai công thức: E = F/q là ĐỊNH NGHĨA, đúng cho mọi điện trường; E = kQ/r² chỉ dành cho điện '
     + 'trường do MỘT ĐIỆN TÍCH ĐIỂM gây ra. Đổi khoảng cách sang mét trước khi thay vào U = E·d.' }
]);

/* Kho mệnh đề Dẫn xuất halogen phải đủ dày để nút "Kiểm tra ngay" dựng nổi
   một lượt 50 câu như các chuyên đề khác. */
bu('hoa', [
{ cd: 'Dẫn xuất halogen', m: 1, a: true,  t: 'Trong phân tử dẫn xuất halogen, liên kết giữa carbon và halogen là liên kết cộng hoá trị phân cực.', v: 'Halogen có độ âm điện lớn hơn carbon nên hút electron về phía mình.' },
{ cd: 'Dẫn xuất halogen', m: 1, a: false, t: 'Dẫn xuất halogen tan tốt trong nước vì phân tử phân cực mạnh.', v: 'Chúng hầu như KHÔNG tan trong nước, chỉ tan trong dung môi hữu cơ.' },
{ cd: 'Dẫn xuất halogen', m: 2, a: true,  t: 'Bậc của dẫn xuất halogen được tính bằng bậc của nguyên tử carbon liên kết trực tiếp với halogen.', v: 'Ví dụ 2-bromobutane là dẫn xuất halogen bậc hai.' },
{ cd: 'Dẫn xuất halogen', m: 2, a: true,  t: 'Sản phẩm của phản ứng thế nguyên tử halogen bằng nhóm hydroxy là alcohol có cùng số nguyên tử carbon với chất đầu.', v: 'Chỉ thay X bằng OH nên mạch carbon giữ nguyên.' },
{ cd: 'Dẫn xuất halogen', m: 2, a: false, t: 'Phản ứng tách hydrogen halide làm giảm số nguyên tử carbon trong phân tử.', v: 'Chỉ mất đi H và X, mạch carbon không đổi; sản phẩm là alkene cùng số carbon.' },
{ cd: 'Dẫn xuất halogen', m: 3, a: true,  t: 'Dẫn xuất halogen bậc một chỉ tách được một alkene duy nhất khi chỉ có một carbon bên cạnh mang hydrogen.', v: 'Khi đó không cần dùng tới quy tắc Zaitsev.' },
{ cd: 'Dẫn xuất halogen', m: 3, a: true,  t: 'Trong cùng điều kiện, dẫn xuất halogen bậc ba dễ tham gia phản ứng tách hơn dẫn xuất halogen bậc một.', v: 'Carbon bậc ba có nhiều carbon bên cạnh mang hydrogen và cho alkene bền hơn.' },
{ cd: 'Dẫn xuất halogen', m: 2, a: true,  t: 'Các hợp chất chlorofluorocarbon là dẫn xuất halogen bị hạn chế sử dụng vì phá huỷ tầng ozone.', v: 'Đây là nội dung liên hệ thực tiễn mà đề hay hỏi ở câu nhận biết.' }
]);

/* Mỗi chuyên đề cần ÍT NHẤT hai thẻ mới đủ để học và để dựng bài kiểm tra */
them('hoa_ct', [
{ nhom: 'Hữu cơ', cd: 'Dẫn xuất halogen', ten: 'Dẫn xuất halogen — bậc, danh pháp và ứng dụng', cap: 1,
  ct: '<b>Bậc của dẫn xuất halogen</b> = bậc của carbon mang halogen (số carbon khác gắn vào carbon đó). '
    + 'CH₃CH₂Br bậc một · CH₃CHBrCH₃ bậc hai · (CH₃)₃CBr bậc ba.<br>'
    + '<b>Gọi tên thay thế:</b> số chỉ vị trí halogen + tên halogen dạng tiền tố (fluoro, chloro, bromo, iodo) '
    + '+ tên hydrocarbon. Đánh số mạch sao cho vị trí nhóm thế nhỏ nhất.<br>'
    + '<b>Một số chất quen thuộc:</b> CHCl₃ chloroform (dung môi) · CF₂Cl₂ freon (từng dùng làm chất sinh hàn) · '
    + 'CH₂=CHCl vinyl chloride (nguyên liệu sản xuất PVC) · CF₂=CF₂ tạo teflon.<br>'
    + '<b>Nhiệt độ sôi</b> tăng theo khối lượng phân tử và theo số nguyên tử halogen.',
  khi: 'Câu nhận biết về bậc, tên gọi hoặc ứng dụng thực tiễn.',
  vd: '(CH₃)₂CHCH₂Br là 1-bromo-2-methylpropane, dẫn xuất halogen bậc MỘT (carbon mang Br chỉ nối với một carbon khác).',
  bay: 'Bậc tính theo carbon MANG halogen, không phải theo mạch dài hay ngắn. '
     + 'Nhiều bạn nhìn nhánh methyl rồi vội kết luận bậc hai.' },

{ nhom: 'Nền tảng', cd: 'Cấu tạo nguyên tử – Bảng tuần hoàn', ten: 'Đồng vị và nguyên tử khối trung bình', cap: 2,
  ct: '<b>Hạt nhân</b> gồm proton (điện tích +1, khối lượng ≈ 1 amu) và neutron (không mang điện, ≈ 1 amu). '
    + 'Electron mang điện −1, khối lượng nhỏ hơn khoảng 1836 lần nên coi như không đáng kể.<br>'
    + '<b>Số khối</b> A = Z + N. <b>Số hiệu nguyên tử</b> Z = số proton = số electron của nguyên tử trung hoà '
    + '= số thứ tự ô trong bảng tuần hoàn.<br>'
    + '<b>Đồng vị</b> là các nguyên tử cùng số proton nhưng khác số neutron ⇒ cùng ô, khác số khối.<br>'
    + '<b>Nguyên tử khối trung bình:</b> M = (A₁·x₁ + A₂·x₂ + …)/100 với x là phần trăm số nguyên tử.<br>'
    + '<b>Thứ tự mức năng lượng:</b> 1s 2s 2p 3s 3p <b>4s 3d</b> 4p 5s 4d 5p — 4s điền TRƯỚC 3d, '
    + 'nhưng khi ghi cấu hình thì sắp lại theo lớp.',
  khi: 'Câu tính nguyên tử khối trung bình hoặc xác định số hạt trong nguyên tử.',
  vd: 'Chlorine có hai đồng vị ³⁵Cl chiếm 75% và ³⁷Cl chiếm 25% ⇒ M = (35·75 + 37·25)/100 = 35,5.',
  bay: 'Phần trăm trong công thức là phần trăm SỐ NGUYÊN TỬ, không phải phần trăm khối lượng. '
     + 'Và nhớ 4s điền trước 3d nhưng viết sau 3p rồi mới tới 3d khi sắp theo lớp.' }
]);

them('ly_ct', [
{ nhom: 'V. Lớp 10–11', cd: 'Sóng', ten: 'Sóng — phân loại và các đại lượng đặc trưng', cap: 1,
  ct: '<b>Sóng cơ</b> là dao động lan truyền trong môi trường vật chất. Phần tử môi trường chỉ dao động '
    + 'quanh vị trí cân bằng, KHÔNG bị sóng mang đi.<br>'
    + '<b>Sóng ngang:</b> phần tử dao động vuông góc với phương truyền (sóng trên mặt nước, sóng trên dây). '
    + '<b>Sóng dọc:</b> dao động cùng phương truyền (sóng âm trong không khí).<br>'
    + '<b>Sóng cơ không truyền được trong chân không;</b> sóng điện từ thì truyền được, trong chân không đi với '
    + 'tốc độ c = 3·10⁸ m/s.<br>'
    + '<b>Các đại lượng:</b> biên độ A · chu kì T · tần số f = 1/T · tốc độ truyền v · bước sóng λ = v·T.<br>'
    + '<b>Tốc độ truyền sóng cơ</b> phụ thuộc MÔI TRƯỜNG: rắn > lỏng > khí.<br>'
    + '<b>Độ lệch pha</b> giữa hai điểm cách nhau d trên phương truyền: Δφ = 2πd/λ. '
    + 'Cùng pha khi d = kλ, ngược pha khi d = (k + 0,5)λ.',
  khi: 'Câu nhận biết phân loại sóng, so sánh tốc độ truyền, hoặc tính độ lệch pha.',
  vd: 'Sóng âm là sóng dọc, truyền trong thép nhanh hơn trong nước và nhanh hơn nhiều so với trong không khí.',
  bay: 'Tần số do NGUỒN quyết định nên không đổi khi sang môi trường khác; tốc độ và bước sóng thì đổi. '
     + 'Đề rất hay hỏi ngược câu này.' },

{ nhom: 'V. Lớp 10–11', cd: 'Điện trường', ten: 'Đường sức điện, điện thế và hiệu điện thế', cap: 2,
  ct: '<b>Đường sức điện</b> là đường mà tiếp tuyến tại mỗi điểm trùng với hướng của vectơ cường độ điện trường. '
    + 'Đường sức xuất phát từ điện tích DƯƠNG và kết thúc ở điện tích ÂM, không bao giờ cắt nhau.<br>'
    + '<b>Nơi đường sức mau thì điện trường mạnh</b>, nơi thưa thì yếu. Điện trường đều có các đường sức '
    + 'song song cách đều nhau.<br>'
    + '<b>Công của lực điện</b> A = q·U, chỉ phụ thuộc vị trí đầu và cuối, KHÔNG phụ thuộc hình dạng đường đi — '
    + 'lực điện là lực thế, giống trọng lực.<br>'
    + '<b>Hiệu điện thế</b> U = V₁ − V₂ = A/q, đơn vị vôn.<br>'
    + '<b>Trong điện trường đều:</b> U = E·d với d là khoảng cách giữa hai điểm đo DỌC THEO đường sức.',
  khi: 'Câu lí thuyết về đường sức, hoặc bài tính công của lực điện.',
  vd: 'Electron bay từ bản âm sang bản dương, U = 200 V ⇒ công của lực điện A = 1,6·10⁻¹⁹ · 200 = 3,2·10⁻¹⁷ J.',
  bay: 'Đường sức KHÔNG cắt nhau — nếu cắt thì tại giao điểm điện trường có hai hướng, vô lí. '
     + 'Trong U = E·d, d phải đo dọc theo đường sức chứ không phải quãng đường thực đi.' }
]);

bu('hoa', [
{ cd: 'Cấu tạo nguyên tử – Bảng tuần hoàn', m: 1, a: true,  t: 'Hạt nhân nguyên tử gồm proton mang điện tích dương và neutron không mang điện.', v: 'Electron mang điện âm và chuyển động quanh hạt nhân.' },
{ cd: 'Cấu tạo nguyên tử – Bảng tuần hoàn', m: 1, a: false, t: 'Hạt nhân nguyên tử gồm proton và electron.', v: 'Electron nằm ở lớp vỏ, không nằm trong hạt nhân. Hạt nhân chỉ có proton và neutron.' },
{ cd: 'Cấu tạo nguyên tử – Bảng tuần hoàn', m: 2, a: true,  t: 'Các đồng vị của cùng một nguyên tố có cùng số proton nhưng khác số neutron.', v: 'Vì vậy chúng cùng một ô trong bảng tuần hoàn nhưng khác số khối.' },
{ cd: 'Cấu tạo nguyên tử – Bảng tuần hoàn', m: 2, a: false, t: 'Các đồng vị của cùng một nguyên tố có cùng số khối nhưng khác số proton.', v: 'Ngược lại: cùng số PROTON, khác số neutron nên khác số khối.' },
{ cd: 'Cấu tạo nguyên tử – Bảng tuần hoàn', m: 2, a: true,  t: 'Số khối của nguyên tử bằng tổng số proton và số neutron trong hạt nhân.', v: 'A = Z + N. Electron không được tính vì khối lượng quá nhỏ.' },
{ cd: 'Cấu tạo nguyên tử – Bảng tuần hoàn', m: 3, a: true,  t: 'Khi viết cấu hình electron, phân lớp 4s được điền trước phân lớp 3d.', v: 'Vì mức năng lượng của 4s thấp hơn 3d, dù số lớp lớn hơn.' },
{ cd: 'Cấu tạo nguyên tử – Bảng tuần hoàn', m: 3, a: true,  t: 'Nguyên tử chromium có cấu hình electron bất thường là 3d⁵4s¹ thay vì 3d⁴4s².', v: 'Phân lớp d nửa bão hoà bền hơn nên một electron của 4s chuyển sang 3d. Copper cũng tương tự với 3d¹⁰4s¹.' },
{ cd: 'Cấu tạo nguyên tử – Bảng tuần hoàn', m: 3, a: true,  t: 'Trong một nhóm A, theo chiều từ trên xuống dưới, tính kim loại tăng dần và tính phi kim giảm dần.', v: 'Bán kính nguyên tử tăng nên electron lớp ngoài cùng bị giữ yếu hơn, dễ nhường hơn.' },
{ cd: 'Cấu tạo nguyên tử – Bảng tuần hoàn', m: 2, a: false, t: 'Nguyên tử khối trung bình được tính theo phần trăm khối lượng của các đồng vị.', v: 'Tính theo phần trăm SỐ NGUYÊN TỬ của mỗi đồng vị.' }
]);

bu('ly', [
{ cd: 'Điện trường', m: 1, a: true,  t: 'Đơn vị của cường độ điện trường là vôn trên mét, cũng chính là niutơn trên culông.', v: '1 V/m = 1 N/C vì 1 V = 1 J/C và 1 J = 1 N·m.' },
{ cd: 'Điện trường', m: 1, a: true,  t: 'Đường sức điện xuất phát từ điện tích dương và kết thúc ở điện tích âm.', v: 'Với một điện tích điểm dương đứng riêng, đường sức đi ra xa vô tận.' },
{ cd: 'Điện trường', m: 2, a: true,  t: 'Hai đường sức điện không bao giờ cắt nhau.', v: 'Nếu cắt nhau thì tại giao điểm điện trường có hai hướng khác nhau, điều đó vô lí.' },
{ cd: 'Điện trường', m: 2, a: false, t: 'Hai đường sức điện có thể cắt nhau tại những điểm điện trường mạnh.', v: 'Không bao giờ cắt nhau, vì mỗi điểm chỉ có một vectơ cường độ điện trường duy nhất.' },
{ cd: 'Điện trường', m: 2, a: true,  t: 'Nơi các đường sức điện vẽ mau hơn thì cường độ điện trường ở đó lớn hơn.', v: 'Mật độ đường sức biểu diễn độ mạnh yếu của điện trường.' },
{ cd: 'Điện trường', m: 2, a: true,  t: 'Trong điện trường đều, các đường sức là những đường thẳng song song và cách đều nhau.', v: 'Vì cường độ điện trường giống nhau về cả hướng lẫn độ lớn tại mọi điểm.' },
{ cd: 'Điện trường', m: 3, a: true,  t: 'Công của lực điện khi dịch chuyển một điện tích chỉ phụ thuộc vị trí điểm đầu và điểm cuối, không phụ thuộc hình dạng đường đi.', v: 'A = qU. Lực điện là lực thế, giống như trọng lực.' },
{ cd: 'Điện trường', m: 3, a: false, t: 'Công của lực điện phụ thuộc vào hình dạng đường đi của điện tích.', v: 'Không phụ thuộc — đây là dấu hiệu nhận biết lực thế. Công chỉ phụ thuộc hiệu điện thế giữa hai đầu.' },
{ cd: 'Điện trường', m: 2, a: true,  t: 'Hiệu điện thế giữa hai điểm bằng thương của công lực điện với độ lớn điện tích dịch chuyển giữa hai điểm đó.', v: 'U = A/q, đơn vị vôn.' },
{ cd: 'Điện trường', m: 3, a: true,  t: 'Vectơ cường độ điện trường do một điện tích điểm dương gây ra luôn hướng ra xa điện tích đó.', v: 'Với điện tích âm thì vectơ hướng vào phía điện tích.' },
{ cd: 'Điện trường', m: 3, a: false, t: 'Vectơ cường độ điện trường do một điện tích điểm âm gây ra luôn hướng ra xa điện tích đó.', v: 'Ngược lại — hướng VÀO phía điện tích âm.' },
{ cd: 'Điện trường', m: 3, a: true,  t: 'Khi có nhiều điện tích cùng gây ra điện trường tại một điểm, cường độ điện trường tổng hợp bằng tổng các vectơ thành phần.', v: 'Cộng theo quy tắc hình bình hành, không cộng số học các độ lớn.' }
]);

bu('ly', [
{ cd: 'Sóng', m: 1, a: true,  t: 'Sóng cơ là dao động lan truyền trong một môi trường vật chất.', v: 'Vì cần môi trường nên sóng cơ không truyền được trong chân không.' },
{ cd: 'Sóng', m: 1, a: false, t: 'Sóng cơ truyền được trong chân không.', v: 'Sóng cơ cần môi trường vật chất; chỉ sóng điện từ mới truyền được trong chân không.' },
{ cd: 'Sóng', m: 2, a: true,  t: 'Trong sóng ngang, các phần tử của môi trường dao động theo phương vuông góc với phương truyền sóng.', v: 'Sóng trên mặt nước và sóng trên dây là sóng ngang.' },
{ cd: 'Sóng', m: 2, a: true,  t: 'Sóng âm truyền trong không khí là sóng dọc.', v: 'Các phần tử không khí dao động dọc theo phương truyền, tạo ra các lớp nén và dãn.' },
{ cd: 'Sóng', m: 2, a: false, t: 'Sóng âm truyền trong không khí là sóng ngang.', v: 'Chất khí không có tính đàn hồi về hình dạng nên chỉ truyền được sóng DỌC.' },
{ cd: 'Sóng', m: 2, a: true,  t: 'Tốc độ truyền sóng cơ trong chất rắn lớn hơn trong chất lỏng và lớn hơn nhiều so với trong chất khí.', v: 'Liên kết giữa các phần tử càng chặt thì dao động truyền đi càng nhanh.' },
{ cd: 'Sóng', m: 2, a: true,  t: 'Trên phương truyền sóng, hai điểm cách nhau một số nguyên lần bước sóng thì dao động cùng pha.', v: 'Ngược lại, cách nhau một số lẻ lần nửa bước sóng thì dao động ngược pha.' },
{ cd: 'Sóng', m: 3, a: true,  t: 'Trong hiện tượng sóng dừng, khoảng cách giữa hai nút sóng liên tiếp bằng nửa bước sóng.', v: 'Còn khoảng cách từ một nút tới bụng liền kề bằng một phần tư bước sóng.' },
{ cd: 'Sóng', m: 3, a: false, t: 'Trong hiện tượng sóng dừng, khoảng cách giữa hai nút sóng liên tiếp bằng một bước sóng.', v: 'Bằng NỬA bước sóng. Đây là chỗ hay nhầm nhất của dạng sóng dừng.' },
{ cd: 'Sóng', m: 3, a: true,  t: 'Trên sợi dây có một đầu cố định và một đầu tự do, chiều dài dây bằng một số lẻ lần một phần tư bước sóng.', v: 'l = (2k + 1)·λ/4, đầu tự do luôn là một bụng sóng.' },
{ cd: 'Sóng', m: 3, a: true,  t: 'Sóng dừng là kết quả giao thoa của sóng tới và sóng phản xạ trên cùng một phương truyền.', v: 'Những điểm luôn đứng yên là nút, những điểm dao động mạnh nhất là bụng.' },
{ cd: 'Sóng', m: 2, a: false, t: 'Khi sóng truyền đi, các phần tử của môi trường bị sóng mang theo về phía trước.', v: 'Phần tử chỉ dao động quanh vị trí cân bằng của nó; cái lan truyền đi là dao động và năng lượng, không phải vật chất.' }
]);
})();
