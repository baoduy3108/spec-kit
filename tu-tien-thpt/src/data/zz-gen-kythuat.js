/* ============================================================
   HOÁ — BA KỸ THUẬT GIẢI KHÔNG HỎI LÝ THUYẾT ĐƯỢC
   Ba thẻ "Bảo toàn điện tích", "Quy đổi hỗn hợp", "Tăng – giảm khối lượng"
   không phải kiến thức để hỏi trắc nghiệm mà là CÁCH GIẢI. Hỏi "bảo toàn điện
   tích là gì" thì vô nghĩa; phải cho bài tập áp thẳng công thức đó.
   Trường chuong đặt đúng bằng tên thẻ nên nút "Kiểm tra thẻ này" nhận ra ngay.
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {};

(function () {
const S = TD.soVN, T = TD.lamTron;

TD.GEN.hoa = (TD.GEN.hoa || []).concat([

/* ---------- ① BẢO TOÀN ĐIỆN TÍCH ---------- */
{ ma: 'hoa-btdt-anion', chuong: 'Bảo toàn điện tích (BTĐT)', muc: 2, dang: 'tln',
  tao(R) {
    /* Dung dịch bốn ion, giấu một anion. Tổng điện tích dương phải bằng tổng
       điện tích âm, thay số là ra ngay. */
    const cation = R.chonNhieu([
      { t: 'Na⁺', d: 1, M: 23 }, { t: 'K⁺', d: 1, M: 39 },
      { t: 'Mg²⁺', d: 2, M: 24 }, { t: 'Ca²⁺', d: 2, M: 40 },
      { t: 'Al³⁺', d: 3, M: 27 }, { t: 'NH₄⁺', d: 1, M: 18 }
    ], 2);
    const anion = R.chonNhieu([
      { t: 'Cl⁻', d: 1, M: 35.5 }, { t: 'NO₃⁻', d: 1, M: 62 },
      { t: 'SO₄²⁻', d: 2, M: 96 }, { t: 'CO₃²⁻', d: 2, M: 60 }
    ], 2);
    const a = [T(R.nguyen(10, 40) / 100, 2), T(R.nguyen(10, 40) / 100, 2)];
    const duong = cation[0].d * a[0] + cation[1].d * a[1];
    const b0 = T(R.nguyen(5, Math.floor(duong / anion[0].d * 100) - 3) / 100, 2);
    const conLai = duong - anion[0].d * b0;
    const b1 = T(conLai / anion[1].d, 3);
    if (b1 <= 0.001) return null;
    return {
      q: `Dung dịch X chứa ${S(a[0])} mol ${cation[0].t}, ${S(a[1])} mol ${cation[1].t}, `
        + `${S(b0)} mol ${anion[0].t} và x mol ${anion[1].t}. Giá trị của x là bao nhiêu?`,
      ans: TD.dapSo(b1, 3),
      giai: `Bước 1 — trong một dung dịch, tổng điện tích dương luôn bằng tổng điện tích âm:\n`
        + `   ${cation[0].d === 1 ? '' : cation[0].d}n(${cation[0].t}) + ${cation[1].d === 1 ? '' : cation[1].d}n(${cation[1].t}) `
        + `= ${anion[0].d === 1 ? '' : anion[0].d}n(${anion[0].t}) + ${anion[1].d === 1 ? '' : anion[1].d}·x\n`
        + `Bước 2 — tổng điện tích dương: ${cation[0].d} × ${S(a[0])} + ${cation[1].d} × ${S(a[1])} = ${S(T(duong, 3))}.\n`
        + `Bước 3 — phần điện tích âm đã biết: ${anion[0].d} × ${S(b0)} = ${S(T(anion[0].d * b0, 3))}.\n`
        + `Bước 4 — phần còn lại chia cho điện tích của ${anion[1].t}: `
        + `x = (${S(T(duong, 3))} − ${S(T(anion[0].d * b0, 3))}) / ${anion[1].d} = ${TD.dapSo(b1, 3)} mol.`,
      meo: 'Nhớ NHÂN ĐIỆN TÍCH của ion, đừng cộng suông số mol. Ion hai điện tích như SO₄²⁻ hay Mg²⁺ '
        + 'đếm gấp đôi. Đây là chỗ sai nhiều nhất của dạng này.'
    };
  } },

{ ma: 'hoa-btdt-muoikhan', chuong: 'Bảo toàn điện tích (BTĐT)', muc: 3, dang: 'tln',
  tao(R) {
    /* Cô cạn dung dịch: khối lượng muối khan = tổng khối lượng các ion. */
    const c1 = R.chon([{ t: 'Na⁺', d: 1, M: 23 }, { t: 'K⁺', d: 1, M: 39 }]);
    const c2 = R.chon([{ t: 'Mg²⁺', d: 2, M: 24 }, { t: 'Ca²⁺', d: 2, M: 40 }]);
    const an = R.chon([{ t: 'Cl⁻', d: 1, M: 35.5 }, { t: 'NO₃⁻', d: 1, M: 62 }]);
    const an2 = { t: 'SO₄²⁻', d: 2, M: 96 };
    const a1 = T(R.nguyen(10, 30) / 100, 2), a2 = T(R.nguyen(10, 30) / 100, 2);
    const duong = a1 + 2 * a2;
    const b1 = T(R.nguyen(5, Math.floor(duong * 100) - 5) / 100, 2);
    const b2 = T((duong - b1) / 2, 3);
    if (b2 <= 0.001) return null;
    const m = T(a1 * c1.M + a2 * c2.M + b1 * an.M + b2 * an2.M, 3);
    return {
      q: `Dung dịch Y chứa ${S(a1)} mol ${c1.t}, ${S(a2)} mol ${c2.t}, ${S(b1)} mol ${an.t} và `
        + `${S(b2)} mol ${an2.t}. Cô cạn cẩn thận dung dịch Y thu được bao nhiêu gam muối khan?`,
      ans: TD.dapSo(m, 3),
      giai: `Bước 1 — kiểm tra bảo toàn điện tích cho chắc số liệu:\n`
        + `   dương = ${S(a1)} + 2 × ${S(a2)} = ${S(T(duong, 3))} · âm = ${S(b1)} + 2 × ${S(b2)} = ${S(T(b1 + 2 * b2, 3))} ⇒ khớp.\n`
        + `Bước 2 — muối khan chính là toàn bộ các ion gộp lại, nên chỉ việc cộng khối lượng từng ion:\n`
        + `   m = ${S(a1)}×${S(c1.M)} + ${S(a2)}×${S(c2.M)} + ${S(b1)}×${S(an.M)} + ${S(b2)}×${S(an2.M)}\n`
        + `Bước 3 — thay số: m = ${TD.dapSo(m, 3)} gam.`,
      meo: 'Cô cạn dung dịch muối thì KHÔNG cần viết phương trình, cứ cộng khối lượng ion là xong. '
        + 'Chỉ lưu ý dung dịch có HCO₃⁻ thì khi cô cạn nó phân huỷ thành CO₃²⁻, phải xử lí riêng.'
    };
  } },

/* ---------- ② QUY ĐỔI HỖN HỢP ---------- */
{ ma: 'hoa-quydoi-feo', chuong: 'Quy đổi hỗn hợp', muc: 3, dang: 'tln',
  tao(R) {
    /* Hỗn hợp Fe, FeO, Fe₂O₃, Fe₃O₄ quy về {Fe: a mol; O: b mol}.
       Cho khối lượng và số mol Fe, hỏi số mol O — hoặc ngược lại. */
    const a = T(R.nguyen(10, 40) / 100, 2);
    const b = T(R.nguyen(10, 50) / 100, 2);
    const m = T(56 * a + 16 * b, 3);
    const hoi = R.chon(['O', 'Fe']);
    if (hoi === 'O')
      return {
        q: `Hỗn hợp X gồm Fe, FeO, Fe₂O₃ và Fe₃O₄ có khối lượng ${S(m)} gam, trong đó số mol nguyên tố `
          + `Fe là ${S(a)} mol. Số mol nguyên tố O trong X là bao nhiêu?`,
        ans: TD.dapSo(b, 3),
        giai: `Bước 1 — bốn chất trong X đều chỉ gồm hai nguyên tố Fe và O, nên quy cả hỗn hợp về `
          + `{Fe: a mol · O: b mol}. Quy đổi giữ nguyên khối lượng và số mol mỗi nguyên tố.\n`
          + `Bước 2 — khối lượng hỗn hợp chính là khối lượng hai nguyên tố cộng lại:\n`
          + `   56a + 16b = ${S(m)}\n`
          + `Bước 3 — thay a = ${S(a)}: 56 × ${S(a)} = ${S(T(56 * a, 3))} gam Fe.\n`
          + `Bước 4 — phần còn lại là oxygen: 16b = ${S(m)} − ${S(T(56 * a, 3))} = ${S(T(16 * b, 3))}\n`
          + `   ⇒ b = ${TD.dapSo(b, 3)} mol.`,
        meo: 'Quy đổi hợp lệ vì phép biến đổi không làm thay đổi tổng khối lượng lẫn số mol nguyên tố. '
          + 'Đừng đi tìm số mol từng oxide — bài không đủ dữ kiện cho việc đó và cũng không cần.'
      };
    return {
      q: `Hỗn hợp X gồm Fe, FeO, Fe₂O₃ và Fe₃O₄ có khối lượng ${S(m)} gam, trong đó số mol nguyên tố `
        + `O là ${S(b)} mol. Số mol nguyên tố Fe trong X là bao nhiêu?`,
      ans: TD.dapSo(a, 3),
      giai: `Bước 1 — quy cả hỗn hợp về {Fe: a mol · O: b mol}, giữ nguyên khối lượng và số mol nguyên tố.\n`
        + `Bước 2 — 56a + 16b = ${S(m)}.\n`
        + `Bước 3 — thay b = ${S(b)}: 16 × ${S(b)} = ${S(T(16 * b, 3))} gam O.\n`
        + `Bước 4 — 56a = ${S(m)} − ${S(T(16 * b, 3))} = ${S(T(56 * a, 3))} ⇒ a = ${TD.dapSo(a, 3)} mol.`,
      meo: 'Bài quy đổi luôn có hai ẩn a và b, nên luôn cần hai dữ kiện. Một là khối lượng, hai thường '
        + 'là số mol electron trao đổi hoặc số mol một nguyên tố.'
    };
  } },

{ ma: 'hoa-quydoi-hno3', chuong: 'Quy đổi hỗn hợp', muc: 4, dang: 'tln',
  tao(R) {
    /* Quy đổi kèm bảo toàn electron: Fe → Fe³⁺ nhường 3e, O nhận 2e,
       N⁺⁵ trong HNO₃ nhận 3e để thành NO. */
    const a = T(R.nguyen(12, 30) / 100, 2);
    const b = T(R.nguyen(5, Math.floor(a * 3 / 2 * 100) - 6) / 100, 2);
    const eNO = 3 * a - 2 * b;
    const nNO = T(eNO / 3, 3);
    if (nNO <= 0.005) return null;
    const m = T(56 * a + 16 * b, 3);
    const V = T(nNO * 24.79, 3);
    return {
      q: `Hoà tan hoàn toàn ${S(m)} gam hỗn hợp X gồm Fe, FeO, Fe₂O₃ và Fe₃O₄ (số mol nguyên tố Fe là `
        + `${S(a)} mol) trong dung dịch HNO₃ loãng dư, thu được V lít khí NO (sản phẩm khử duy nhất, `
        + `điều kiện chuẩn). Giá trị của V là bao nhiêu?`,
      ans: TD.dapSo(V, 3),
      giai: `Bước 1 — quy X về {Fe: ${S(a)} mol · O: b mol}. Từ khối lượng: 56 × ${S(a)} + 16b = ${S(m)} `
        + `⇒ 16b = ${S(T(16 * b, 3))} ⇒ b = ${S(b)} mol.\n`
        + `Bước 2 — kiểm kê electron. Chất NHƯỜNG là Fe: Fe⁰ → Fe³⁺ + 3e ⇒ n(e nhường) = 3 × ${S(a)} = ${S(T(3 * a, 3))}.\n`
        + `Bước 3 — chất NHẬN gồm O trong hỗn hợp và N⁺⁵ của HNO₃:\n`
        + `   O⁰ + 2e → O²⁻ ⇒ nhận 2 × ${S(b)} = ${S(T(2 * b, 3))} mol e\n`
        + `   N⁺⁵ + 3e → N⁺² (NO) ⇒ nhận 3·n(NO)\n`
        + `Bước 4 — cân bằng: 3 × ${S(a)} = 2 × ${S(b)} + 3·n(NO) ⇒ n(NO) = ${TD.dapSo(nNO, 3)} mol.\n`
        + `Bước 5 — V = n × 24,79 = ${S(nNO)} × 24,79 = ${TD.dapSo(V, 3)} lít.`,
      meo: 'Điểm mấu chốt: oxygen trong hỗn hợp CŨNG là chất nhận electron, quên nó là sai ngay. '
        + 'Ở điều kiện chuẩn dùng 24,79 L/mol chứ không phải 22,4 — chương trình mới đổi rồi.'
    };
  } },

/* ---------- ③ TĂNG – GIẢM KHỐI LƯỢNG ---------- */
{ ma: 'hoa-tanggiam-thanh', chuong: 'Tăng – giảm khối lượng', muc: 3, dang: 'tln',
  tao(R) {
    /* Nhúng thanh kim loại vào dung dịch muối. Mỗi mol kim loại tan ra thì có
       một lượng kim loại khác bám vào, chênh lệch M chính là Δm mỗi mol. */
    const c = R.chon([
      { A: 'Fe', MA: 56, B: 'Cu', MB: 64, mu: 'CuSO₄', he: 1 },
      { A: 'Fe', MA: 56, B: 'Ag', MB: 108, mu: 'AgNO₃', he: 2 },
      { A: 'Zn', MA: 65, B: 'Cu', MB: 64, mu: 'CuSO₄', he: 1 },
      { A: 'Mg', MA: 24, B: 'Fe', MB: 56, mu: 'FeSO₄', he: 1 },
      { A: 'Cu', MA: 64, B: 'Ag', MB: 108, mu: 'AgNO₃', he: 2 }
    ]);
    /* mỗi mol A tan ra sinh he mol B bám vào */
    const d = c.he * c.MB - c.MA;
    const n = T(R.nguyen(4, 25) / 100, 2);
    const dm = T(Math.abs(d) * n, 3);
    const tang = d > 0;
    return {
      q: `Nhúng một thanh ${c.A} vào dung dịch ${c.mu} dư. Sau một thời gian lấy thanh kim loại ra, `
        + `rửa sạch, sấy khô thì thấy khối lượng thanh ${tang ? 'TĂNG' : 'GIẢM'} ${S(dm)} gam. `
        + `Số mol ${c.A} đã phản ứng là bao nhiêu?`,
      ans: TD.dapSo(n, 3),
      giai: `Bước 1 — viết phương trình: ${c.A} + ${c.he === 1 ? '' : c.he}${c.mu} → muối của ${c.A} `
        + `+ ${c.he === 1 ? '' : c.he}${c.B}↓\n`
        + `Bước 2 — cứ 1 mol ${c.A} tan ra thì có ${c.he} mol ${c.B} bám lên thanh. Khối lượng thanh đổi:\n`
        + `   Δm mỗi mol = ${c.he === 1 ? '' : c.he + ' × '}${S(c.MB)} − ${S(c.MA)} = ${S(d)} gam `
        + `${tang ? '(dương nên thanh nặng lên)' : '(âm nên thanh nhẹ đi)'}\n`
        + `Bước 3 — lập tỉ lệ: n = Δm thực tế / |Δm mỗi mol| = ${S(dm)} / ${S(Math.abs(d))} = ${TD.dapSo(n, 3)} mol.`,
      meo: 'Đừng tính khối lượng thanh trước và sau — đề không cho. Chỉ cần ĐỘ CHÊNH khối lượng mol '
        + 'giữa chất bám vào và chất tan ra. Nhớ nhân hệ số: 1 mol Fe đẩy ra tới 2 mol Ag.'
    };
  } },

{ ma: 'hoa-tanggiam-muoi', chuong: 'Tăng – giảm khối lượng', muc: 3, dang: 'tln',
  tao(R) {
    /* Muối carbonate + HCl → muối chloride: mỗi mol CO₃²⁻ (60) đổi thành 2 Cl⁻ (71),
       khối lượng muối tăng 11 gam mỗi mol khí CO₂ thoát ra. */
    const n = T(R.nguyen(5, 30) / 100, 2);
    const mMuoi = T(R.nguyen(200, 600) / 10, 2);
    const mSau = T(mMuoi + 11 * n, 3);
    const V = T(n * 24.79, 3);
    return {
      q: `Hoà tan hoàn toàn ${S(mMuoi)} gam hỗn hợp muối carbonate của kim loại hoá trị II bằng dung dịch `
        + `HCl vừa đủ, thu được dung dịch chứa ${S(mSau)} gam muối chloride và V lít khí CO₂ `
        + `(điều kiện chuẩn). Giá trị của V là bao nhiêu?`,
      ans: TD.dapSo(V, 3),
      giai: `Bước 1 — phương trình: MCO₃ + 2HCl → MCl₂ + CO₂↑ + H₂O.\n`
        + `Bước 2 — nhìn vào sự thay đổi gốc acid: mỗi mol muối mất một gốc CO₃²⁻ (60) và nhận hai gốc `
        + `Cl⁻ (2 × 35,5 = 71). Vậy mỗi mol muối phản ứng thì khối lượng muối TĂNG 71 − 60 = 11 gam, `
        + `mà mỗi mol muối cũng cho đúng 1 mol CO₂.\n`
        + `Bước 3 — độ tăng thực tế: ${S(mSau)} − ${S(mMuoi)} = ${S(T(11 * n, 3))} gam.\n`
        + `Bước 4 — n(CO₂) = ${S(T(11 * n, 3))} / 11 = ${S(n)} mol.\n`
        + `Bước 5 — V = ${S(n)} × 24,79 = ${TD.dapSo(V, 3)} lít.`,
      meo: 'Con số 11 gam mỗi mol là chìa khoá của dạng carbonate + HCl, thuộc luôn cho nhanh. '
        + 'Với muối hoá trị I thì mỗi mol CO₃²⁻ đổi lấy 2 Cl⁻ cho 2 kim loại, độ tăng vẫn 11 gam mỗi mol CO₂.'
    };
  } }

]);
})();
