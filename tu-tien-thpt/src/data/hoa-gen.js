/* ============================================================
   HOÁ HỌC — MẪU ĐỀ TỰ SINH
   Mỗi mẫu tự random số liệu rồi tự tính đáp án và viết lời giải
   theo đúng số liệu đó ⇒ vô hạn biến thể, đáp án không thể lệch.
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {};

(function () {
const S = TD.soVN;              /* định dạng số kiểu Việt Nam */
const T = TD.lamTron;

TD.GEN.hoa = [

/* ---------- NỀN TẢNG ---------- */
/* Tính số mol là kỹ năng nền của mọi chuyên đề, nhưng ĐÃ THỬ cho nó vào Luyện
   Công của mọi chuyên đề thì hỏng: đang đọc thẻ Dãy điện hoá lại nhận câu
   "tính số mol của 22,4 gam CuSO₄" — đúng kiểu lạc chuyên đề mà người học kêu.
   Thà thiếu ở Luyện Công còn hơn hỏi lạc; nó vẫn vào Tà Đạo và đề Độ Kiếp. */
{ ma: 'hoa-mol', chuong: 'Tính toán hoá học', muc: 1, dang: 'tln',
  tao(R) {
    const c = R.chon([
      { t: 'NaOH', M: 40 }, { t: 'CaCO₃', M: 100 }, { t: 'Fe₂O₃', M: 160 },
      { t: 'CuSO₄', M: 160 }, { t: 'NaCl', M: 58.5 }, { t: 'KOH', M: 56 },
      { t: 'Al₂O₃', M: 102 }, { t: 'MgO', M: 40 }, { t: 'H₂SO₄', M: 98 }
    ]);
    const n = T(R.nguyen(5, 80) / 100, 2);
    const m = T(n * c.M, 3);
    return {
      q: `Tính số mol của ${S(m)} gam ${c.t}. (M = ${S(c.M)})`,
      ans: S(n),
      giai: `n = m / M = ${S(m)} / ${S(c.M)} = ${S(n)} mol.`,
      meo: 'Công thức gốc: n = m/M. Phải thuộc nguyên tử khối để tính M nhanh.'
    };
  } },

{ ma: 'hoa-k', chuong: 'Đại cương hữu cơ', muc: 2, dang: 'tln', chapNhanKhong: true,
  tao(R) {
    const so = n2 => String(n2).split('').map(d => '₀₁₂₃₄₅₆₇₈₉'[+d]).join('');
    const C = R.nguyen(2, 9), N = R.nguyen(0, 1), O = R.nguyen(0, 2);
    const k = R.nguyen(0, 4);
    const H = 2 * C + 2 + N - 2 * k;
    if (H <= 0) return null;
    const c = { C: C, H: H, N: N,
      t: 'C' + so(C) + 'H' + so(H) + (O ? 'O' + (O > 1 ? so(O) : '') : '') + (N ? 'N' : '') };
    return {
      q: `Tính độ bất bão hoà (k) của hợp chất có công thức phân tử ${c.t}.`,
      ans: S(k),
      giai: `k = (2C + 2 + N − H)/2 = (2·${c.C} + 2 + ${c.N} − ${c.H})/2 = ${S(k)}.\n`
          + `k = ${S(k)} nghĩa là phân tử có tổng ${S(k)} liên kết π và vòng.`,
      meo: 'Nguyên tử O KHÔNG xuất hiện trong công thức tính k.'
    };
  } },

{ ma: 'hoa-nongdo', chuong: 'Dung dịch', muc: 2, dang: 'tln',
  tao(R) {
    const ct = R.chon([{ t: 'NaOH', M: 40 }, { t: 'NaCl', M: 58.5 }, { t: 'KOH', M: 56 }, { t: 'CuSO₄', M: 160 }]);
    const n = T(R.nguyen(5, 60) / 100, 2);
    const V = R.chon([50, 100, 125, 200, 250, 400, 500, 800, 1000]);
    const CM = T(n / (V / 1000), 3);
    return {
      q: `Hoà tan ${S(T(n * ct.M, 3))} gam ${ct.t} (M = ${S(ct.M)}) vào nước được ${V} ml dung dịch. Tính nồng độ mol của dung dịch thu được.`,
      ans: S(CM),
      giai: `n = ${S(T(n * ct.M, 3))} / ${S(ct.M)} = ${S(n)} mol\n`
          + `V = ${V} ml = ${S(V / 1000)} L\n`
          + `C_M = n/V = ${S(n)} / ${S(V / 1000)} = ${S(CM)} mol/L.`,
      meo: 'Đổi ml sang lít trước khi chia — quên bước này là sai 1000 lần.'
    };
  } },

{ ma: 'hoa-ph', chuong: 'Cân bằng trong dung dịch', muc: 2, dang: 'tln',
  tao(R) {
    const dang = R.nguyen(1, 3);

    if (dang === 1) {                                  /* acid/base mạnh → pH */
      const acid = R.chon(['HCl', 'HNO₃', 'HBr', 'HI']);
      const base = R.chon(['NaOH', 'KOH']);
      const mu = R.nguyen(1, 4);
      const C = Math.pow(10, -mu);
      const laBase = R() < 0.5;
      const pH = laBase ? 14 - mu : mu;
      return {
        q: `Tính pH của dung dịch ${laBase ? base : acid} có nồng độ ${C} M (coi chất tan phân li hoàn toàn).`,
        ans: S(pH),
        giai: laBase
          ? `${base} → cation + OH⁻ ⇒ [OH⁻] = ${C} M = 10⁻${mu}\n`
            + `pOH = −log[OH⁻] = ${mu}\npH = 14 − pOH = 14 − ${mu} = ${pH}.`
          : `${acid} → H⁺ + anion ⇒ [H⁺] = ${C} M = 10⁻${mu}\npH = −log[H⁺] = ${pH}.`,
        meo: 'Base mạnh phải qua pOH rồi mới lấy 14 trừ đi — đừng lấy thẳng −log C.'
      };
    }

    if (dang === 2) {                                  /* pha loãng dung dịch acid */
      const acid = R.chon(['HCl', 'HNO₃', 'H₂SO₄ loãng', 'HBr']);
      const pH0 = R.nguyen(1, 4);
      const k = R.nguyen(1, 3);
      const lan = Math.pow(10, k);
      const pH1 = pH0 + k;
      return {
        q: `Dung dịch ${acid} có pH = ${pH0}. Pha loãng dung dịch này bằng nước ${lan} lần. `
         + `pH của dung dịch sau khi pha loãng bằng bao nhiêu?`,
        ans: S(pH1),
        giai: `pH = ${pH0} ⇒ [H⁺] ban đầu = 10⁻${pH0} M\n`
            + `Pha loãng ${lan} lần thì nồng độ giảm ${lan} lần:\n`
            + `[H⁺] mới = 10⁻${pH0} / 10${k > 1 ? '^' + k : ''} = 10⁻${pH1} M\n`
            + `⇒ pH mới = ${pH1}.`,
        meo: 'Pha loãng acid 10^k lần thì pH TĂNG thêm k đơn vị (nhưng không bao giờ vượt quá 7).'
      };
    }

    /* dang 3: từ pH suy ra nồng độ ion */
    const pH = R.nguyen(1, 13);
    const hoiOH = R() < 0.5;
    const mu = hoiOH ? 14 - pH : pH;
    return {
      q: `Một dung dịch có pH = ${pH}. Nồng độ ion ${hoiOH ? 'OH⁻' : 'H⁺'} trong dung dịch là 10⁻ˣ M. Tìm x.`,
      ans: S(mu),
      giai: hoiOH
        ? `pH = ${pH} ⇒ pOH = 14 − ${pH} = ${mu}\n[OH⁻] = 10⁻${mu} M ⇒ x = ${mu}.`
        : `pH = −log[H⁺] = ${pH} ⇒ [H⁺] = 10⁻${pH} M ⇒ x = ${mu}.`,
      meo: 'Luôn nhớ [H⁺]·[OH⁻] = 10⁻¹⁴ và pH + pOH = 14.'
    };
  } },

/* ---------- KIM LOẠI + ACID ---------- */
{ ma: 'hoa-muoi-clorua', chuong: 'Kim loại + acid', muc: 3, dang: 'tln',
  tao(R) {
    const nH2 = R.chon([0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4]);
    const mKL = T(R.nguyen(50, 200) / 10, 1);
    const V = T(nH2 * 22.4, 3);
    const m = T(mKL + 71 * nH2, 3);
    return {
      q: `Hoà tan hoàn toàn ${S(mKL)} gam hỗn hợp kim loại trong dung dịch HCl dư, thu được ${S(V)} lít khí H₂ (đktc). `
       + `Cô cạn dung dịch sau phản ứng thu được bao nhiêu gam muối khan?`,
      ans: S(m),
      giai: `n(H₂) = ${S(V)} / 22,4 = ${S(nH2)} mol\n`
          + `Kim loại + HCl: n(Cl⁻ vào muối) = n(HCl) = 2·n(H₂) = ${S(2 * nH2)} mol\n`
          + `Bảo toàn khối lượng: m(muối) = m(kim loại) + m(Cl⁻)\n`
          + `= ${S(mKL)} + ${S(2 * nH2)}·35,5 = ${S(mKL)} + ${S(T(71 * nH2, 3))} = ${S(m)} gam.`,
      meo: 'Công thức tủ: m(muối clorua) = m(KL) + 71·n(H₂).'
    };
  } },

{ ma: 'hoa-muoi-sunfat', chuong: 'Kim loại + acid', muc: 3, dang: 'tln',
  tao(R) {
    const nH2 = R.chon([0.1, 0.15, 0.2, 0.25, 0.3, 0.4]);
    const mKL = T(R.nguyen(50, 200) / 10, 1);
    const V = T(nH2 * 22.4, 3);
    const m = T(mKL + 96 * nH2, 3);
    return {
      q: `Hoà tan hoàn toàn ${S(mKL)} gam hỗn hợp kim loại trong dung dịch H₂SO₄ loãng dư, thu được ${S(V)} lít khí H₂ (đktc). `
       + `Khối lượng muối sunfat khan thu được là bao nhiêu gam?`,
      ans: S(m),
      giai: `n(H₂) = ${S(V)} / 22,4 = ${S(nH2)} mol\n`
          + `n(SO₄²⁻ vào muối) = n(H₂SO₄) = n(H₂) = ${S(nH2)} mol\n`
          + `m(muối) = m(KL) + 96·n(SO₄²⁻) = ${S(mKL)} + ${S(T(96 * nH2, 3))} = ${S(m)} gam.`,
      meo: 'm(muối sunfat) = m(KL) + 96·n(H₂). So với clorua là 71·n(H₂) — đừng lẫn hai hệ số.'
    };
  } },

{ ma: 'hoa-hno3-muoi', chuong: 'Kim loại + HNO₃', muc: 3, dang: 'tln',
  tao(R) {
    const nNO = R.chon([0.05, 0.1, 0.15, 0.2, 0.25]);
    const mKL = T(R.nguyen(60, 250) / 10, 1);
    const V = T(nNO * 22.4, 3);
    const ne = T(3 * nNO, 3);
    const m = T(mKL + 62 * ne, 3);
    return {
      q: `Hoà tan hoàn toàn ${S(mKL)} gam hỗn hợp kim loại trong dung dịch HNO₃ loãng dư, thu được ${S(V)} lít khí NO `
       + `(đktc, sản phẩm khử duy nhất). Khối lượng muối nitrat khan thu được là bao nhiêu gam?`,
      ans: S(m),
      giai: `n(NO) = ${S(V)} / 22,4 = ${S(nNO)} mol\n`
          + `Bảo toàn electron: n(e) = 3·n(NO) = ${S(ne)} mol\n`
          + `Trong muối nitrat, n(NO₃⁻) = n(e) = ${S(ne)} mol\n`
          + `m(muối) = m(KL) + 62·n(NO₃⁻) = ${S(mKL)} + ${S(T(62 * ne, 3))} = ${S(m)} gam.`,
      meo: 'm(muối nitrat) = m(KL) + 62·n(e). Nhớ kiểm tra có NH₄NO₃ không khi kim loại mạnh.'
    };
  } },

{ ma: 'hoa-hno3-pu', chuong: 'Kim loại + HNO₃', muc: 3, dang: 'tln',
  tao(R) {
    const k = R.chon([
      { t: 'NO', he: 4, e: 3 }, { t: 'NO₂', he: 2, e: 1 },
      { t: 'N₂O', he: 10, e: 8 }, { t: 'N₂', he: 12, e: 10 }
    ]);
    const n = T(R.nguyen(2, 30) / 100, 2);
    const V = T(n * 22.4, 3);
    const nA = T(k.he * n, 3);
    return {
      q: `Cho kim loại M tác dụng hết với dung dịch HNO₃, thu được ${S(V)} lít khí ${k.t} (đktc, sản phẩm khử duy nhất). `
       + `Số mol HNO₃ đã tham gia phản ứng là bao nhiêu?`,
      ans: S(nA),
      giai: `n(${k.t}) = ${S(V)} / 22,4 = ${S(n)} mol\n`
          + `Công thức: n(HNO₃ phản ứng) = 2n(NO₂) + 4n(NO) + 10n(N₂O) + 12n(N₂) + 10n(NH₄⁺)\n`
          + `Ở đây chỉ có ${k.t} ⇒ n(HNO₃) = ${k.he}·${S(n)} = ${S(nA)} mol.`,
      meo: 'Hệ số HNO₃: NO₂ 2 · NO 4 · N₂O 10 · N₂ 12 · NH₄⁺ 10. Khác với hệ số nhận electron (1/3/8/10/8).'
    };
  } },

{ ma: 'hoa-quydoi-fe', chuong: 'Quy đổi hỗn hợp', muc: 4, dang: 'tln',
  tao(R) {
    const a = T(R.nguyen(10, 45) / 100, 2);              /* mol Fe */
    const nNO = T(R.nguyen(2, 20) / 100, 2);
    if (nNO >= a) return null;
    const b = T(1.5 * (a - nNO), 4);                      /* mol O */
    const m = T(56 * a + 16 * b, 3);
    const V = T(nNO * 22.4, 3);
    const nHNO3 = T(3 * a + nNO, 3);
    return {
      q: `Hoà tan hoàn toàn ${S(m)} gam hỗn hợp X gồm Fe, FeO, Fe₂O₃ và Fe₃O₄ trong dung dịch HNO₃ loãng dư, `
       + `thu được ${S(V)} lít khí NO (đktc, sản phẩm khử duy nhất). Số mol HNO₃ đã phản ứng là bao nhiêu?`,
      ans: S(nHNO3),
      giai: `Quy đổi hỗn hợp X về {Fe: a mol ; O: b mol}.\n`
          + `(1) Khối lượng: 56a + 16b = ${S(m)}\n`
          + `(2) Bảo toàn electron: Fe → Fe³⁺ + 3e (cho 3a); O + 2e → O²⁻ (nhận 2b); N⁺⁵ + 3e → NO (nhận 3·${S(nNO)})\n`
          + `    ⇒ 3a = 2b + ${S(T(3 * nNO, 3))}\n`
          + `Giải hệ: a = ${S(a)} ; b = ${S(b)}\n`
          + `Bảo toàn nguyên tố N: n(HNO₃) = n(NO₃⁻ trong muối) + n(NO) = 3a + n(NO)\n`
          + `= ${S(T(3 * a, 3))} + ${S(nNO)} = ${S(nHNO3)} mol.`
        + `\nBước cuối — kiểm chứng: khối lượng hỗn hợp quy đổi phải bằng đúng khối lượng đề cho, và số mol electron nhường phải bằng số mol electron nhận.\nChỗ dễ sai: quy đổi xong quên rằng oxi trong oxit cũng NHẬN electron, nên phải trừ phần electron này ra trước khi tính lượng chất oxi hoá còn lại.`,
      meo: 'Quy đổi mọi hỗn hợp oxit sắt về {Fe; O} rồi ghép bảo toàn khối lượng + bảo toàn electron. Nhớ O nhận 2e.'
    };
  } },

/* ---------- ĐỒ THỊ & TỈ LỆ ---------- */
{ ma: 'hoa-co2-caoh2', chuong: 'CO₂ + kiềm', muc: 3, dang: 'tln',
  tao(R) {
    const nCa = T(R.nguyen(15, 80) / 100, 2);
    const nCO2 = T(nCa + R.nguyen(3, 60) / 100, 2);
    if (nCO2 >= 2 * nCa) return null;
    const ket = T(2 * nCa - nCO2, 3);
    return {
      q: `Hấp thụ hoàn toàn ${S(nCO2)} mol CO₂ vào dung dịch chứa ${S(nCa)} mol Ca(OH)₂. `
       + `Sau phản ứng thu được bao nhiêu mol kết tủa?`,
      ans: S(ket),
      giai: `n(OH⁻) = 2·${S(nCa)} = ${S(T(2 * nCa, 3))} mol\n`
          + `T = n(OH⁻)/n(CO₂) = ${S(T(2 * nCa, 3))} / ${S(nCO2)} = ${S(T(2 * nCa / nCO2, 3))}\n`
          + `Vì 1 < T < 2 ⇒ tạo cả hai muối CaCO₃ và Ca(HCO₃)₂.\n`
          + `n(CO₃²⁻) = n(OH⁻) − n(CO₂) = ${S(T(2 * nCa, 3))} − ${S(nCO2)} = ${S(ket)} mol\n`
          + `Vì n(Ca²⁺) = ${S(nCa)} > ${S(ket)} nên toàn bộ CO₃²⁻ kết tủa ⇒ n(CaCO₃) = ${S(ket)} mol.`,
      meo: 'Khi tạo 2 muối: n↓ = n(OH⁻) − n(CO₂), rồi so với n(Ca²⁺) lấy giá trị nhỏ hơn.'
    };
  } },

{ ma: 'hoa-naoh-alcl3', chuong: 'Muối nhôm + kiềm', muc: 3, dang: 'tln',
  tao(R) {
    const nAl = T(R.nguyen(8, 45) / 100, 2);
    const tan = R() < 0.5;
    let nOH, ket, lyLuan;
    if (tan) {                                   /* 3 < T < 4: kết tủa tan một phần */
      nOH = T(3 * nAl + R.nguyen(3, 40) / 100, 2);
      if (nOH >= 4 * nAl) return null;
      ket = T(4 * nAl - nOH, 3);
      lyLuan = `Vì 3 < T < 4 ⇒ kết tủa Al(OH)₃ đã bị hoà tan một phần.\n`
             + `n↓ = 4·n(Al³⁺) − n(OH⁻) = 4·${S(nAl)} − ${S(nOH)} = ${S(ket)} mol.`;
    } else {                                     /* T ≤ 3: chưa tan */
      nOH = T(3 * nAl - R.nguyen(3, 40) / 100, 2);
      if (nOH <= 0) return null;
      ket = T(nOH / 3, 4);
      lyLuan = `Vì T ≤ 3 ⇒ kết tủa chưa bị hoà tan, OH⁻ hết trước.\n`
             + `n↓ = n(OH⁻)/3 = ${S(nOH)} / 3 = ${S(ket)} mol.`;
    }
    return {
      q: `Cho ${S(nOH)} mol NaOH vào dung dịch chứa ${S(nAl)} mol AlCl₃. Sau phản ứng thu được bao nhiêu mol kết tủa?`,
      ans: S(ket),
      giai: `T = n(OH⁻)/n(Al³⁺) = ${S(nOH)} / ${S(nAl)} = ${S(T(nOH / nAl, 3))}\n` + lyLuan,
      meo: 'T ≤ 3 ⇒ n↓ = n(OH⁻)/3. 3 < T < 4 ⇒ n↓ = 4n(Al³⁺) − n(OH⁻). T ≥ 4 ⇒ tan hết.'
    };
  } },

/* ---------- ĐIỆN PHÂN ---------- */
{ ma: 'hoa-faraday', chuong: 'Điện phân', muc: 3, dang: 'tln',
  tao(R) {
    const kl = R.chon([
      { t: 'Cu', A: 64, n: 2, mu: 'CuSO₄' }, { t: 'Ag', A: 108, n: 1, mu: 'AgNO₃' },
      { t: 'Zn', A: 65, n: 2, mu: 'ZnSO₄' }, { t: 'Ni', A: 59, n: 2, mu: 'NiSO₄' }
    ]);
    const k2 = R.nguyen(5, 60);                          /* n(e) = k2/100 mol */
    const I = (k2 % 2 === 0) ? R.chon([1, 2, 5, 10]) : R.chon([1, 5]);
    const ne = T(k2 / 100, 2);
    const t = k2 * 965 / I;                              /* luôn nguyên với các I trên */
    if (!Number.isInteger(t)) return null;
    const m = T(ne / kl.n * kl.A, 3);
    return {
      q: `Điện phân dung dịch ${kl.mu} với điện cực trơ, cường độ dòng điện ${I} A trong thời gian ${t} giây. `
       + `Khối lượng ${kl.t} bám vào catot là bao nhiêu gam?`,
      ans: S(m),
      giai: `n(e) = I·t / F = ${I}·${t} / 96500 = ${S(ne)} mol\n`
          + `Catot: ${kl.t}${kl.n === 1 ? '⁺' : '²⁺'} + ${kl.n}e → ${kl.t}\n`
          + `n(${kl.t}) = n(e)/${kl.n} = ${S(ne)}/${kl.n} = ${S(T(ne / kl.n, 4))} mol\n`
          + `m = ${S(T(ne / kl.n, 4))} · ${kl.A} = ${S(m)} gam.`,
      meo: 'Mọi bài điện phân bắt đầu từ n(e) = It/96500, rồi chia cho số electron mà ion nhận.'
    };
  } },

{ ma: 'hoa-dp-mdd', chuong: 'Điện phân', muc: 4, dang: 'tln',
  tao(R) {
    const kx = R.nguyen(4, 40);                           /* x = kx/100 mol Cu */
    const x = T(kx / 100, 2);
    const nCu = T(x + R.nguyen(3, 25) / 100, 2);           /* CuSO₄ ban đầu, còn dư */
    const I = R.chon([1, 5]);                              /* để t luôn nguyên */
    const mGiam = T(80 * x, 3);
    const ne = T(2 * x, 2);
    const t = 2 * kx * 965 / I;
    if (!Number.isInteger(t)) return null;
    return {
      q: `Điện phân dung dịch chứa ${S(nCu)} mol CuSO₄ với điện cực trơ, cường độ dòng điện ${I} A. `
       + `Sau thời gian t giây, khối lượng dung dịch giảm ${S(mGiam)} gam. Tính t (giây).`,
      ans: String(t),
      giai: `Đặt n(e) = 2x với x là số mol Cu bám catot.\n`
          + `Catot: Cu²⁺ + 2e → Cu ⇒ n(Cu) = x\n`
          + `Anot: 2H₂O → O₂ + 4H⁺ + 4e ⇒ n(O₂) = 2x/4 = x/2\n`
          + `m(dd giảm) = m(Cu) + m(O₂) = 64x + 32·(x/2) = 80x\n`
          + `⇒ 80x = ${S(mGiam)} ⇒ x = ${S(x)} mol\n`
          + `Kiểm tra: x = ${S(x)} < ${S(nCu)} ⇒ Cu²⁺ còn dư, giả thiết đúng.\n`
          + `n(e) = 2x = ${S(ne)} mol ⇒ t = n(e)·96500/I = ${S(ne)}·96500/${I} = ${t} giây.`,
      meo: 'm(dd giảm) = m(kim loại bám catot) + m(khí thoát ra ở cả hai cực).'
    };
  } },

/* ---------- HỮU CƠ ---------- */
{ ma: 'hoa-este-ran', chuong: 'Ester – thuỷ phân', muc: 3, dang: 'tln',
  tao(R) {
    const e = R.chon([
      { t: 'ethyl acetate CH₃COOC₂H₅', M: 88, mu: 'CH₃COONa', Mm: 82, al: 'C₂H₅OH', Mal: 46 },
      { t: 'methyl acetate CH₃COOCH₃', M: 74, mu: 'CH₃COONa', Mm: 82, al: 'CH₃OH', Mal: 32 },
      { t: 'methyl formate HCOOCH₃', M: 60, mu: 'HCOONa', Mm: 68, al: 'CH₃OH', Mal: 32 },
      { t: 'ethyl formate HCOOC₂H₅', M: 74, mu: 'HCOONa', Mm: 68, al: 'C₂H₅OH', Mal: 46 },
      { t: 'methyl acrylate CH₂=CHCOOCH₃', M: 86, mu: 'CH₂=CHCOONa', Mm: 94, al: 'CH₃OH', Mal: 32 }
    ]);
    const nE = T(R.nguyen(5, 45) / 100, 2);
    const du = T(R.nguyen(2, 20) / 100, 2);
    const nNa = T(nE + du, 3);
    const mE = T(nE * e.M, 3);
    const m = T(nE * e.Mm + du * 40, 3);
    return {
      q: `Xà phòng hoá hoàn toàn ${S(mE)} gam ${e.t} bằng dung dịch chứa ${S(nNa)} mol NaOH. `
       + `Cô cạn dung dịch sau phản ứng thu được bao nhiêu gam chất rắn khan?`,
      ans: S(m),
      giai: `n(ester) = ${S(mE)} / ${S(e.M)} = ${S(nE)} mol ; n(NaOH) = ${S(nNa)} mol\n`
          + `Ester đơn chức ⇒ phản ứng theo tỉ lệ 1 : 1 ⇒ NaOH dư ${S(nNa)} − ${S(nE)} = ${S(du)} mol\n`
          + `Chất rắn khan gồm muối ${e.mu} VÀ NaOH dư:\n`
          + `m = ${S(nE)}·${S(e.Mm)} + ${S(du)}·40 = ${S(T(nE * e.Mm, 3))} + ${S(T(du * 40, 3))} = ${S(m)} gam.`,
      meo: '"Chất rắn khan" luôn phải cộng cả NaOH dư, không chỉ muối. Đây là bẫy mất điểm số một của dạng này.'
    };
  } },

/* Bảo toàn khối lượng một bước ⇒ vận dụng, không phải vận dụng cao. */
{ ma: 'hoa-chatbeo-btkl', chuong: 'Chất béo', muc: 3, dang: 'tln',
  tao(R) {
    const cb = R.chon([
      { t: 'tristearin', M: 890 }, { t: 'triolein', M: 884 },
      { t: 'tripalmitin', M: 806 }, { t: 'trilinolein', M: 878 }
    ]);
    const n = T(R.nguyen(2, 30) / 100, 2);
    const m = T(n * cb.M, 3);
    const nNa = T(3 * n, 2);
    const mMuoi = T(m + 28 * n, 3);
    return {
      q: `Đun nóng ${S(m)} gam ${cb.t} với dung dịch NaOH vừa đủ, thu được glycerol và m gam muối. Tính m (gam).`,
      ans: S(mMuoi),
      giai: `n(chất béo) = ${S(m)} / ${cb.M} = ${S(n)} mol\n`
          + `Chất béo + 3NaOH → 3 muối + glycerol ⇒ n(NaOH) = ${S(nNa)} mol ; n(glycerol) = ${S(n)} mol\n`
          + `Bảo toàn khối lượng: m(chất béo) + m(NaOH) = m(muối) + m(glycerol)\n`
          + `${S(m)} + ${S(T(nNa * 40, 3))} = m + ${S(T(n * 92, 3))}\n`
          + `⇒ m = ${S(m)} + ${S(T(nNa * 40, 3))} − ${S(T(n * 92, 3))} = ${S(mMuoi)} gam.`,
      meo: 'Rút gọn: m(muối) = m(chất béo) + 28·n(chất béo). M(glycerol) = 92, tỉ lệ NaOH : chất béo = 3 : 1.'
    };
  } },

{ ma: 'hoa-chatbeo-br2', chuong: 'Chất béo', muc: 3, dang: 'tln',
  tao(R) {
    const cb = R.chon([
      { t: 'triolein', M: 884, pi: 3 }, { t: 'trilinolein', M: 878, pi: 6 }
    ]);
    const n = T(R.nguyen(2, 30) / 100, 2);
    const m = T(n * cb.M, 3);
    const nBr = T(n * cb.pi, 2);
    return {
      q: `Cho ${S(m)} gam ${cb.t} tác dụng với dung dịch nước bromine dư. Số mol Br₂ đã phản ứng tối đa là bao nhiêu?`,
      ans: S(nBr),
      giai: `n(${cb.t}) = ${S(m)} / ${cb.M} = ${S(n)} mol\n`
          + `Phân tử ${cb.t} có ${cb.pi} liên kết đôi C=C trong gốc hydrocarbon.\n`
          + `Mỗi liên kết C=C cộng 1 phân tử Br₂ ⇒ n(Br₂) = ${cb.pi}·${S(n)} = ${S(nBr)} mol.`,
      meo: 'Ba liên kết π trong nhóm C=O của chức ester KHÔNG cộng Br₂ — chỉ tính π của C=C.'
    };
  } },

{ ma: 'hoa-peptide-M', chuong: 'Peptide', muc: 3, dang: 'tln',
  tao(R) {
    const aa = { Gly: 75, Ala: 89, Val: 117 };
    const k = R.nguyen(2, 5);
    const ds = []; for (let i = 0; i < k; i++) ds.push(R.chon(['Gly', 'Ala', 'Val']));
    const tong = ds.reduce((s2, x) => s2 + aa[x], 0);
    const M = tong - 18 * (k - 1);
    return {
      q: `Tính phân tử khối của peptide mạch hở ${ds.join('-')}. `
       + `(M: Gly = 75 ; Ala = 89 ; Val = 117)`,
      ans: String(M),
      giai: `Peptide có ${k} mắt xích ⇒ có ${k - 1} liên kết peptide, mỗi liên kết tách ra 1 phân tử H₂O.\n`
          + `Σ M(amino acid) = ${ds.map(x => aa[x]).join(' + ')} = ${tong}\n`
          + `M(peptide) = ${tong} − 18·${k - 1} = ${tong} − ${18 * (k - 1)} = ${M}.`,
      meo: 'M(n-peptide) = ΣM(amino acid) − 18(n − 1). Số liên kết peptide = n − 1.'
    };
  } },

/* Bảo toàn khối lượng một bước ⇒ vận dụng, không phải vận dụng cao. */
{ ma: 'hoa-peptide-naoh', chuong: 'Peptide', muc: 3, dang: 'tln',
  tao(R) {
    const aa = { Gly: 75, Ala: 89, Val: 117 };
    const k = R.nguyen(3, 5);
    const ds = []; for (let i = 0; i < k; i++) ds.push(R.chon(['Gly', 'Ala', 'Val']));
    const M = ds.reduce((s2, x) => s2 + aa[x], 0) - 18 * (k - 1);
    const n = T(R.nguyen(4, 40) / 100, 2);
    const m = T(n * M, 3);
    const nNa = T(k * n, 3);
    const mMuoi = T(m + 40 * nNa - 18 * n, 3);
    return {
      q: `Thuỷ phân hoàn toàn ${S(m)} gam peptide ${ds.join('-')} (M = ${M}) bằng dung dịch NaOH vừa đủ, `
       + `thu được m gam hỗn hợp muối. Tính m (gam).`,
      ans: S(mMuoi),
      giai: `n(peptide) = ${S(m)} / ${M} = ${S(n)} mol\n`
          + `Peptide ${k} mắt xích: X + ${k}NaOH → ${k} muối + 1 H₂O\n`
          + `n(NaOH) = ${k}·${S(n)} = ${S(nNa)} mol ; n(H₂O) = ${S(n)} mol\n`
          + `Bảo toàn khối lượng: m(peptide) + m(NaOH) = m(muối) + m(H₂O)\n`
          + `${S(m)} + ${S(T(nNa * 40, 3))} = m + ${S(T(n * 18, 3))}\n`
          + `⇒ m = ${S(mMuoi)} gam.`,
      meo: 'n-peptide + nNaOH → n muối + ĐÚNG 1 H₂O (tính theo số phân tử peptide, không phải số liên kết peptide).'
    };
  } },

{ ma: 'hoa-lenmen', chuong: 'Carbohydrate', muc: 3, dang: 'tln',
  tao(R) {
    const k = R.nguyen(1, 25);
    const H = R.chon([50, 55, 60, 65, 70, 75, 80, 85, 90, 95]);
    const m = 162 * k;
    const mE = T(92 * k * H / 100, 3);
    return {
      q: `Lên men ${m} gam tinh bột thành ethanol với hiệu suất toàn bộ quá trình là ${H}%. `
       + `Khối lượng ethanol thu được là bao nhiêu gam?`,
      ans: S(mE),
      giai: `Sơ đồ: (C₆H₁₀O₅)ₙ → nC₆H₁₂O₆ → 2nC₂H₅OH\n`
          + `Cứ 162 gam tinh bột (1 mắt xích) cho tối đa 2·46 = 92 gam ethanol.\n`
          + `Lý thuyết: ${m}·(92/162) = ${S(T(92 * k, 3))} gam\n`
          + `Với H = ${H}%: m = ${S(T(92 * k, 3))} · ${H}/100 = ${S(mE)} gam.`,
      meo: 'Nhớ cặp số 162 → 92. Đi xuôi thì NHÂN hiệu suất, đi ngược (tính nguyên liệu cần) thì CHIA.'
    };
  } },

{ ma: 'hoa-trangbac', chuong: 'Phản ứng tráng bạc', muc: 3, dang: 'tln',
  tao(R) {
    const c = R.chon([
      { t: 'HCHO', M: 30, ag: 4 }, { t: 'CH₃CHO', M: 44, ag: 2 },
      { t: 'HCOOH', M: 46, ag: 2 }, { t: 'glucose', M: 180, ag: 2 },
      { t: 'HCOOCH₃', M: 60, ag: 2 }, { t: '(CHO)₂', M: 58, ag: 4 }
    ]);
    const n = T(R.nguyen(3, 40) / 100, 2);
    const m = T(n * c.M, 3);
    const mAg = T(n * c.ag * 108, 3);
    return {
      q: `Cho ${S(m)} gam ${c.t} (M = ${c.M}) tác dụng hoàn toàn với lượng dư dung dịch AgNO₃ trong NH₃. `
       + `Khối lượng Ag thu được là bao nhiêu gam?`,
      ans: S(mAg),
      giai: `n(${c.t}) = ${S(m)} / ${c.M} = ${S(n)} mol\n`
          + `${c.t} cho ${c.ag} Ag ${c.ag === 4 ? '(HCHO bị oxi hoá 2 nấc, hoặc phân tử có 2 nhóm –CHO)' : '(mỗi nhóm –CHO cho 2 Ag)'}\n`
          + `n(Ag) = ${c.ag}·${S(n)} = ${S(T(n * c.ag, 3))} mol\n`
          + `m(Ag) = ${S(T(n * c.ag, 3))}·108 = ${S(mAg)} gam.`,
      meo: 'Mỗi –CHO cho 2Ag. Riêng HCHO cho 4Ag; (CHO)₂ cũng 4Ag vì có hai nhóm –CHO.'
    };
  } },

{ ma: 'hoa-dot-amine', chuong: 'Amine', muc: 3, dang: 'tln',
  tao(R) {
    const C = R.nguyen(1, 6);
    const n = T(R.nguyen(4, 40) / 100, 2);
    const nCO2 = T(C * n, 3);
    const nH2O = T(n * (2 * C + 3) / 2, 3);
    return {
      q: `Đốt cháy hoàn toàn m gam amine X no, đơn chức, mạch hở thu được ${S(nCO2)} mol CO₂ và ${S(nH2O)} mol H₂O. `
       + `Số nguyên tử carbon trong phân tử X là bao nhiêu?`,
      ans: String(C),
      giai: `Amine no, đơn chức, mạch hở: CₙH₂ₙ₊₃N\n`
          + `Đốt cháy: n(H₂O) − n(CO₂) = 1,5·n(amine)\n`
          + `⇒ n(X) = (${S(nH2O)} − ${S(nCO2)}) / 1,5 = ${S(T(nH2O - nCO2, 4))} / 1,5 = ${S(n)} mol\n`
          + `Số C = n(CO₂)/n(X) = ${S(nCO2)} / ${S(n)} = ${C}\n`
          + `⇒ X là C${C}H${2 * C + 3}N.`,
      meo: 'Amine no hở: n(H₂O) − n(CO₂) = 1,5·n(amine). Ancol no hở thì hệ số là 1.'
    };
  } },

{ ma: 'hoa-alcohol-cuo', chuong: 'Oxi hoá alcohol', muc: 3, dang: 'tln',
  tao(R) {
    const a = R.chon([
      { t: 'CH₃OH', M: 32 }, { t: 'C₂H₅OH', M: 46 }, { t: 'CH₃CH₂CH₂OH', M: 60 },
      { t: 'CH₃CH₂CH₂CH₂OH', M: 74 }, { t: 'CH₃[CH₂]₄OH', M: 88 }
    ]);
    const n = T(R.nguyen(5, 50) / 100, 2);
    const dm = T(16 * n, 3);
    const m = T(n * a.M, 3);
    return {
      q: `Dẫn hơi ${a.t} qua ống đựng CuO nung nóng. Sau phản ứng hoàn toàn, khối lượng chất rắn trong ống `
       + `giảm ${S(dm)} gam. Khối lượng ${a.t} đã phản ứng là bao nhiêu gam? (M = ${a.M})`,
      ans: S(m),
      giai: `R–CH₂OH + CuO → R–CHO + Cu + H₂O\n`
          + `Mỗi mol alcohol lấy đi 1 mol O của CuO (CuO → Cu) ⇒ chất rắn giảm 16 gam mỗi mol.\n`
          + `n(alcohol) = ${S(dm)} / 16 = ${S(n)} mol\n`
          + `m = ${S(n)} · ${a.M} = ${S(m)} gam.`,
      meo: 'Δm(rắn giảm) = 16·n(alcohol phản ứng). Alcohol bậc III không phản ứng.'
    };
  } },

{ ma: 'hoa-tanggiam-kl', chuong: 'Kim loại + dung dịch muối', muc: 3, dang: 'tln',
  tao(R) {
    const c = R.chon([
      { kl: 'Fe', mu: 'CuSO₄', d: 8, chieu: 'tăng', gt: 'Fe (56) tan ra, Cu (64) bám vào ⇒ mỗi mol làm thanh nặng thêm 64 − 56 = 8 gam' },
      { kl: 'Zn', mu: 'CuSO₄', d: 1, chieu: 'giảm', gt: 'Zn (65) tan ra, Cu (64) bám vào ⇒ mỗi mol làm thanh nhẹ đi 65 − 64 = 1 gam' },
      { kl: 'Cu', mu: 'AgNO₃', d: 152, chieu: 'tăng', gt: 'Cu (64) tan ra, 2Ag (216) bám vào ⇒ mỗi mol Cu làm thanh nặng thêm 216 − 64 = 152 gam' },
      { kl: 'Fe', mu: 'AgNO₃', d: 160, chieu: 'tăng', gt: 'Fe (56) tan ra, 2Ag (216) bám vào ⇒ mỗi mol Fe làm thanh nặng thêm 216 − 56 = 160 gam' }
    ]);
    const n = T(R.nguyen(2, 40) / 200, 3);
    const dm = T(c.d * n, 4);
    return {
      q: `Nhúng một thanh ${c.kl} vào dung dịch ${c.mu} dư. Sau một thời gian, khối lượng thanh kim loại `
       + `${c.chieu} ${S(dm)} gam. Số mol ${c.kl} đã phản ứng là bao nhiêu?`,
      ans: S(n),
      giai: `${c.gt}.\n`
          + `n = Δm / ${c.d} = ${S(dm)} / ${c.d} = ${S(n)} mol.`,
      meo: 'Δm = n · |M(bám vào) − M(tan ra)|. Nhớ nhân 2 cho Ag vì 1 mol KL hoá trị II đẩy ra 2 mol Ag.'
    };
  } },

{ ma: 'hoa-nhiet-chay', chuong: 'Năng lượng hoá học', muc: 3, dang: 'tln',
  tao(R) {
    const f = R.chon([
      { t: 'CH₄', M: 16, dH: 890.3 }, { t: 'C₂H₆', M: 30, dH: 1560.7 },
      { t: 'C₂H₂', M: 26, dH: 1300.0 }, { t: 'C₂H₅OH', M: 46, dH: 1367.0 },
      { t: 'C₃H₈', M: 44, dH: 2220.0 }, { t: 'C₄H₁₀', M: 58, dH: 2877.0 },
      { t: 'CH₃OH', M: 32, dH: 726.0 }, { t: 'C₆H₆', M: 78, dH: 3267.0 }
    ]);
    const n = T(R.nguyen(5, 60) / 20, 2);
    const m = T(n * f.M, 3);
    const Q = T(n * f.dH, 2);
    return {
      q: `Đốt cháy hoàn toàn ${S(m)} gam ${f.t} (M = ${f.M}). Biết nhiệt lượng toả ra khi đốt 1 mol ${f.t} là `
       + `${S(f.dH)} kJ. Nhiệt lượng toả ra là bao nhiêu kJ?`,
      ans: S(Q),
      giai: `n(${f.t}) = ${S(m)} / ${f.M} = ${S(n)} mol\n`
          + `Q = n · ${S(f.dH)} = ${S(n)} · ${S(f.dH)} = ${S(Q)} kJ.\n`
          + `(Δ_rH < 0 nên đây là phản ứng toả nhiệt.)`,
      meo: 'Δ_rH âm = toả nhiệt. Nhiệt lượng toả ra tỉ lệ thuận với số mol nhiên liệu.'
    };
  } },

{ ma: 'hoa-pin', chuong: 'Điện phân – Pin điện', muc: 2, dang: 'tln',
  tao(R) {
    const kho = [
      { t: 'Li', E: -3.04 }, { t: 'K', E: -2.93 }, { t: 'Ca', E: -2.87 },
      { t: 'Na', E: -2.71 }, { t: 'Mg', E: -2.37 }, { t: 'Al', E: -1.66 },
      { t: 'Mn', E: -1.18 }, { t: 'Zn', E: -0.76 }, { t: 'Cr', E: -0.74 },
      { t: 'Fe', E: -0.44 }, { t: 'Cd', E: -0.40 }, { t: 'Co', E: -0.28 },
      { t: 'Ni', E: -0.26 }, { t: 'Sn', E: -0.14 }, { t: 'Pb', E: -0.13 },
      { t: 'Cu', E: 0.34 }, { t: 'Ag', E: 0.80 }, { t: 'Hg', E: 0.85 }
    ];
    const [a, b] = R.chonNhieu(kho, 2);
    const am = a.E < b.E ? a : b, duong = a.E < b.E ? b : a;
    const E = T(duong.E - am.E, 2);
    return {
      q: `Cho pin điện hoá ${am.t}–${duong.t} ở điều kiện chuẩn. Biết E°(${am.t}ⁿ⁺/${am.t}) = ${S(am.E)} V và `
       + `E°(${duong.t}ⁿ⁺/${duong.t}) = ${S(duong.E)} V. Sức điện động chuẩn của pin là bao nhiêu V?`,
      ans: S(E),
      giai: `Điện cực có E° nhỏ hơn là ANODE (cực âm): ${am.t} (${S(am.E)} V) — bị oxi hoá, tan ra.\n`
          + `Điện cực có E° lớn hơn là CATHODE (cực dương): ${duong.t} (${S(duong.E)} V).\n`
          + `E°(pin) = E°(cathode) − E°(anode) = ${S(duong.E)} − (${S(am.E)}) = ${S(E)} V.`,
      meo: 'E°(pin) luôn dương. Kim loại có E° nhỏ hơn luôn là cực âm và bị ăn mòn.'
    };
  } },

/* Bài này luôn là lên men tinh bột ra ethanol nên nó thuộc hẳn chuyên đề
   Carbohydrate; ghi nhãn chương là "Bài toán hiệu suất" thì vừa khó tra vừa
   bị coi là lạc chuyên đề khi ôn. */
{ ma: 'hoa-hieusuat-nguoc', chuong: 'Carbohydrate', muc: 3, dang: 'tln',

  tao(R) {
    const H = R.chon([40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90]);
    const mSP = T(R.nguyen(2, 40) * 4.6, 2);
    const mNL = T(mSP * 162 / 92 / (H / 100), 2);
    return {
      q: `Cần dùng bao nhiêu gam tinh bột để điều chế được ${S(mSP)} gam ethanol bằng phương pháp lên men, `
       + `biết hiệu suất toàn bộ quá trình là ${H}%?`,
      ans: S(mNL),
      giai: `Sơ đồ: 162 gam tinh bột → 92 gam ethanol (nếu H = 100%).\n`
          + `Lượng tinh bột theo lý thuyết = ${S(mSP)} · 162/92 = ${S(T(mSP * 162 / 92, 3))} gam\n`
          + `Vì H = ${H}% nên phải dùng nhiều hơn — đi NGƯỢC thì CHIA cho hiệu suất:\n`
          + `m = ${S(T(mSP * 162 / 92, 3))} / ${S(H / 100)} = ${S(mNL)} gam.`,
      meo: 'Tính sản phẩm từ nguyên liệu thì NHÂN H%. Tính nguyên liệu cần từ sản phẩm thì CHIA H%.'
    };
  } }
];
})();
