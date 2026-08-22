/* ============================================================
   VẬT LÍ — MẪU ĐỀ TỰ SINH
   ============================================================ */
window.TD = window.TD || {}; TD.GEN = TD.GEN || {};

(function () {
const S = TD.soVN, T = TD.lamTron, D = TD.dapSo;

TD.GEN.ly = [
{ ma: 'ly-nhietluong', chuong: 'Vật lí nhiệt', muc: 2, dang: 'tln',
  tao(R) {
    const c = R.chon([
      { t: 'nước', c: 4200 }, { t: 'nhôm', c: 880 }, { t: 'đồng', c: 380 },
      { t: 'sắt', c: 460 }, { t: 'chì', c: 130 }, { t: 'thuỷ tinh', c: 840 }
    ]);
    const m = T(R.nguyen(5, 60) / 10, 1);
    const t1 = R.nguyen(10, 40), t2 = t1 + R.nguyen(20, 70);
    const Q = T(m * c.c * (t2 - t1) / 1000, 3);
    return {
      q: `Tính nhiệt lượng cần cung cấp để làm ${S(m)} kg ${c.t} nóng lên từ ${t1} °C đến ${t2} °C. `
       + `Biết nhiệt dung riêng của ${c.t} là ${c.c} J/(kg·K). Đáp án tính bằng kJ (làm tròn đến hàng phần trăm).`,
      ans: D(Q, 2),
      giai: `Q = m·c·Δt\n`
          + `Δt = ${t2} − ${t1} = ${t2 - t1} °C (cũng chính là ${t2 - t1} K)\n`
          + `Q = ${S(m)} · ${c.c} · ${t2 - t1} = ${S(T(m * c.c * (t2 - t1), 1))} J = ${D(Q, 2)} kJ.`,
      meo: 'Độ chênh nhiệt độ trong thang °C và K là như nhau. Đọc kỹ đề hỏi J hay kJ.'
    };
  } },

{ ma: 'ly-chuyenthe', chuong: 'Vật lí nhiệt', muc: 2, dang: 'tln',
  tao(R) {
    const loai = R() < 0.5;
    const c = loai
      ? { t: 'làm nóng chảy hoàn toàn', ten: 'nhiệt nóng chảy riêng', k: 3.34e5, mo: 'nước đá ở 0 °C' }
      : { t: 'làm hoá hơi hoàn toàn', ten: 'nhiệt hoá hơi riêng', k: 2.26e6, mo: 'nước ở 100 °C' };
    const m = T(R.nguyen(2, 50) / 10, 1);
    const Q = T(m * c.k / 1000, 2);
    return {
      q: `Tính nhiệt lượng cần cung cấp để ${c.t} ${S(m)} kg ${c.mo}. `
       + `Biết ${c.ten} là ${c.k.toExponential(2).replace('e+', '·10^').replace('.', ',')} J/kg. Đáp án tính bằng kJ (làm tròn đến hàng phần trăm).`,
      ans: D(Q, 2),
      giai: `Trong quá trình chuyển thể, nhiệt độ KHÔNG đổi nên không dùng công thức mcΔt.\n`
          + `Q = ${loai ? 'λ' : 'L'}·m = ${S(T(c.k, 0))} · ${S(m)} = ${S(T(m * c.k, 0))} J = ${D(Q, 2)} kJ.`,
      meo: 'Nóng chảy dùng Q = λm, hoá hơi dùng Q = Lm. Trong lúc chuyển thể nhiệt độ đứng yên.'
    };
  } },

{ ma: 'ly-canbangnhiet', chuong: 'Vật lí nhiệt', muc: 3, dang: 'tln',
  tao(R) {
    const kl = R.chon([{ t: 'đồng', c: 380 }, { t: 'nhôm', c: 880 }, { t: 'sắt', c: 460 }]);
    const m1 = T(R.nguyen(2, 10) / 10, 1);           /* kim loại */
    const t1 = R.nguyen(80, 150);
    const m2 = T(R.nguyen(5, 30) / 10, 1);           /* nước */
    const t2 = R.nguyen(15, 30);
    const tcb = (m1 * kl.c * t1 + m2 * 4200 * t2) / (m1 * kl.c + m2 * 4200);
    const kq = T(tcb, 2);
    if (kq <= t2 || kq >= t1) return null;
    return {
      q: `Thả ${S(m1)} kg ${kl.t} ở ${t1} °C vào ${S(m2)} kg nước ở ${t2} °C. Bỏ qua hao phí nhiệt. `
       + `Nhiệt độ khi cân bằng là bao nhiêu °C? (c<sub>${kl.t}</sub> = ${kl.c}, c<sub>nước</sub> = 4200 J/kg·K; làm tròn đến hàng phần trăm)`,
      ans: D(kq, 2),
      giai: `Phương trình cân bằng nhiệt: Q(toả) = Q(thu)\n`
          + `${S(m1)}·${kl.c}·(${t1} − t) = ${S(m2)}·4200·(t − ${t2})\n`
          + `${S(T(m1 * kl.c, 2))}·(${t1} − t) = ${S(T(m2 * 4200, 2))}·(t − ${t2})\n`
          + `⇒ t = [${S(T(m1 * kl.c * t1, 1))} + ${S(T(m2 * 4200 * t2, 1))}] / [${S(T(m1 * kl.c, 2))} + ${S(T(m2 * 4200, 2))}] = ${D(kq, 2)} °C.`,
      meo: 'Nhiệt độ cân bằng luôn nằm GIỮA hai nhiệt độ ban đầu — dùng để kiểm tra kết quả.'
    };
  } },

{ ma: 'ly-nhietdong1', chuong: 'Nhiệt động lực học', muc: 3, dang: 'tln',
  tao(R) {
    const Q = R.nguyen(-40, 40) * 10;
    const A = R.nguyen(-40, 40) * 10;
    if (Q === 0 && A === 0) return null;
    const dU = Q + A;
    const moQ = Q >= 0 ? `nhận nhiệt lượng ${Q} J` : `toả ra nhiệt lượng ${-Q} J`;
    const moA = A >= 0 ? `nhận công ${A} J` : `thực hiện công ${-A} J lên môi trường ngoài`;
    return {
      q: `Một khối khí ${moQ} và ${moA}. Tính độ biến thiên nội năng của khối khí (đơn vị J).`,
      ans: String(dU),
      giai: `Định luật I nhiệt động lực học: ΔU = A + Q\n`
          + `Quy ước dấu: nhận nhiệt Q > 0, toả nhiệt Q < 0; nhận công A > 0, sinh công A < 0.\n`
          + `Ở đây Q = ${Q} J và A = ${A} J\n`
          + `ΔU = ${TD.cong(A, Q)} = ${TD.so(dU)} J ⇒ nội năng ${dU > 0 ? 'TĂNG' : dU < 0 ? 'GIẢM' : 'không đổi'}.`,
      meo: 'Quy ước dấu là chỗ mất điểm nhiều nhất. Sinh công thì A ÂM, toả nhiệt thì Q ÂM.'
    };
  } },

{ ma: 'ly-boyle', chuong: 'Khí lí tưởng', muc: 2, dang: 'tln',
  tao(R) {
    const p1 = R.nguyen(1, 8), V1 = R.nguyen(2, 20);
    const V2 = R.nguyen(1, 20);
    if (V2 === V1) return null;
    const p2 = T(p1 * V1 / V2, 3);
    return {
      q: `Nén đẳng nhiệt một lượng khí từ thể tích ${V1} lít xuống ${V2} lít. Áp suất ban đầu là ${p1} atm. `
       + `Áp suất sau khi nén là bao nhiêu atm? (làm tròn đến hàng phần trăm)`,
      ans: D(p2, 2),
      giai: `Quá trình đẳng nhiệt, áp dụng định luật Boyle: p₁V₁ = p₂V₂\n`
          + `${p1}·${V1} = p₂·${V2}\n`
          + `p₂ = ${p1 * V1}/${V2} = ${D(p2, 2)} atm.`,
      meo: 'Đẳng nhiệt: p và V tỉ lệ NGHỊCH. Thể tích giảm bao nhiêu lần thì áp suất tăng bấy nhiêu lần.'
    };
  } },

{ ma: 'ly-dangtich', chuong: 'Khí lí tưởng', muc: 3, dang: 'tln',
  tao(R) {
    const t1 = R.nguyen(0, 60), t2 = R.nguyen(60, 250);
    const p1 = R.nguyen(1, 6);
    const T1 = t1 + 273, T2 = t2 + 273;
    const p2 = T(p1 * T2 / T1, 3);
    return {
      q: `Một lượng khí trong bình kín có áp suất ${p1} atm ở ${t1} °C. Nung nóng bình đến ${t2} °C. `
       + `Áp suất của khí lúc này là bao nhiêu atm? (làm tròn đến hàng phần trăm)`,
      ans: D(p2, 2),
      giai: `Thể tích không đổi ⇒ quá trình đẳng tích, áp dụng định luật Charles: p₁/T₁ = p₂/T₂\n`
          + `Đổi sang Kelvin: T₁ = ${t1} + 273 = ${T1} K ; T₂ = ${t2} + 273 = ${T2} K\n`
          + `p₂ = p₁·T₂/T₁ = ${p1}·${T2}/${T1} = ${D(p2, 2)} atm.`,
      meo: 'BẮT BUỘC đổi sang Kelvin. Dùng thẳng độ C là sai hoàn toàn.'
    };
  } },

{ ma: 'ly-clapeyron', chuong: 'Khí lí tưởng', muc: 3, dang: 'tln',
  tao(R) {
    const n = T(R.nguyen(1, 20) / 10, 1);
    const t = R.nguyen(0, 150);
    const V = T(R.nguyen(5, 50) / 1000, 4);          /* m³ */
    const Tk = t + 273;
    const p = T(n * 8.31 * Tk / V, 0);
    return {
      q: `Một bình có thể tích ${S(T(V * 1000, 1))} lít chứa ${S(n)} mol khí lí tưởng ở nhiệt độ ${t} °C. `
       + `Tính áp suất của khí trong bình (đơn vị Pa, làm tròn đến hàng đơn vị). Cho R = 8,31 J/(mol·K).`,
      ans: D(p, 0),
      giai: `Phương trình Clapeyron–Mendeleev: pV = nRT\n`
          + `Đổi đơn vị: V = ${S(T(V * 1000, 1))} lít = ${S(V)} m³ ; T = ${t} + 273 = ${Tk} K\n`
          + `p = nRT/V = ${S(n)}·8,31·${Tk}/${S(V)} = ${D(p, 0)} Pa.`,
      meo: 'Đơn vị chuẩn: p (Pa), V (m³), T (K). Sai đơn vị là sai cả bài.'
    };
  } },

{ ma: 'ly-dongnang-phantu', chuong: 'Khí lí tưởng', muc: 3, dang: 'tln',
  tao(R) {
    const t = R.nguyen(-50, 300);
    const Tk = t + 273;
    if (Tk <= 0) return null;
    const W = 1.5 * 1.38e-23 * Tk;
    const heSo = T(W / 1e-21, 3);
    return {
      q: `Tính động năng trung bình của một phân tử khí lí tưởng ở nhiệt độ ${t} °C. `
       + `Cho k = 1,38·10⁻²³ J/K. Đáp án có dạng x·10⁻²¹ J, hãy tìm x (làm tròn đến hàng phần trăm).`,
      ans: D(heSo, 2),
      giai: `Động năng trung bình: W̄đ = (3/2)·k·T\n`
          + `T = ${t} + 273 = ${Tk} K\n`
          + `W̄đ = 1,5 · 1,38·10⁻²³ · ${Tk} = ${D(heSo, 2)}·10⁻²¹ J.`,
      meo: 'Động năng trung bình phân tử CHỈ phụ thuộc nhiệt độ, không phụ thuộc loại khí.'
    };
  } },

{ ma: 'ly-lucthu', chuong: 'Từ trường', muc: 2, dang: 'tln',
  tao(R) {
    const B = T(R.nguyen(1, 20) / 10, 1);
    const I = T(R.nguyen(10, 100) / 10, 1);
    const L = T(R.nguyen(5, 80) / 100, 2);
    const goc = R.chon([90, 30, 60, 45]);
    const sin = goc === 90 ? 1 : goc === 30 ? 0.5 : goc === 60 ? Math.sqrt(3) / 2 : Math.sqrt(2) / 2;
    const F = T(B * I * L * sin, 4);
    return {
      q: `Một đoạn dây dẫn dài ${S(L)} m mang dòng điện ${S(I)} A đặt trong từ trường đều có cảm ứng từ ${S(B)} T. `
       + `Dây hợp với đường sức từ góc ${goc}°. Tính lực từ tác dụng lên đoạn dây (đơn vị N, làm tròn đến hàng phần trăm).`,
      ans: D(F, 2),
      giai: `F = B·I·L·sinα\n`
          + `sin${goc}° = ${S(T(sin, 4))}\n`
          + `F = ${S(B)} · ${S(I)} · ${S(L)} · ${S(T(sin, 4))} = ${D(F, 2)} N.`,
      meo: 'Dây SONG SONG đường sức (α = 0) thì F = 0. Lực cực đại khi dây vuông góc.'
    };
  } },

{ ma: 'ly-tuthong', chuong: 'Từ trường', muc: 3, dang: 'tln',
  tao(R) {
    const N = R.chon([1, 10, 20, 50, 100, 200]);
    const B = T(R.nguyen(1, 50) / 100, 2);
    const Scm = R.nguyen(20, 400);                    /* cm² */
    const goc = R.chon([0, 30, 60, 45]);
    const cos = goc === 0 ? 1 : goc === 30 ? Math.sqrt(3) / 2 : goc === 60 ? 0.5 : Math.sqrt(2) / 2;
    const phi = T(N * B * (Scm / 10000) * cos, 6);
    if (phi === 0) return null;
    return {
      q: `Một khung dây gồm ${N} vòng, diện tích mỗi vòng ${Scm} cm², đặt trong từ trường đều B = ${S(B)} T. `
       + `Vectơ cảm ứng từ hợp với vectơ pháp tuyến của mặt phẳng khung góc ${goc}°. `
       + `Tính từ thông qua khung dây (đơn vị Wb, làm tròn đến 4 chữ số thập phân).`,
      ans: S(phi, 4),
      giai: `Φ = N·B·S·cosα\n`
          + `Đổi diện tích: S = ${Scm} cm² = ${S(T(Scm / 10000, 4))} m²\n`
          + `cos${goc}° = ${S(T(cos, 4))}\n`
          + `Φ = ${N} · ${S(B)} · ${S(T(Scm / 10000, 4))} · ${S(T(cos, 4))} = ${S(phi, 4)} Wb.`,
      meo: 'α là góc với PHÁP TUYẾN, không phải với mặt phẳng khung. Nhớ đổi cm² sang m² (chia 10 000).'
    };
  } },

{ ma: 'ly-sdd-camung', chuong: 'Cảm ứng điện từ', muc: 3, dang: 'tln',
  tao(R) {
    const N = R.chon([50, 100, 200, 250, 500]);
    const dPhi = T(R.nguyen(1, 60) / 1000, 4);
    const dt = T(R.chon([1, 2, 5, 10, 20, 25, 50]) / 100, 2);
    const e = T(N * dPhi / dt, 3);
    return {
      q: `Một khung dây gồm ${N} vòng. Từ thông qua mỗi vòng biến thiên một lượng ${S(dPhi)} Wb trong thời gian ${S(dt)} s. `
       + `Tính độ lớn suất điện động cảm ứng xuất hiện trong khung (đơn vị V, làm tròn đến hàng phần trăm).`,
      ans: D(e, 2),
      giai: `Định luật Faraday: |e| = N·|ΔΦ|/Δt\n`
          + `|e| = ${N} · ${S(dPhi)} / ${S(dt)} = ${D(e, 2)} V.`,
      meo: 'Dấu trừ trong công thức Faraday chỉ thể hiện định luật Lenz (chiều). Hỏi ĐỘ LỚN thì bỏ dấu trừ.'
    };
  } },

{ ma: 'ly-bienap', chuong: 'Máy biến áp', muc: 3, dang: 'tln',
  tao(R) {
    const N1 = R.chon([200, 500, 800, 1000, 1200, 2000, 2500]);
    const k = R.chon([2, 4, 5, 8, 10, 0.5, 0.25]);
    const N2 = Math.round(N1 / k);
    if (N2 < 10) return null;
    const U1 = R.chon([110, 220, 380]);
    const U2 = T(U1 * N2 / N1, 3);
    const hoiU = R() < 0.6;
    const I1 = T(R.nguyen(5, 50) / 10, 1);
    const I2 = T(I1 * N1 / N2, 3);
    return {
      q: `Một máy biến áp lí tưởng có cuộn sơ cấp ${N1} vòng và cuộn thứ cấp ${N2} vòng. `
       + (hoiU
          ? `Đặt vào hai đầu cuộn sơ cấp điện áp hiệu dụng ${U1} V. Điện áp hiệu dụng ở hai đầu cuộn thứ cấp là bao nhiêu V? (làm tròn đến hàng phần trăm)`
          : `Cường độ dòng điện hiệu dụng ở cuộn sơ cấp là ${S(I1)} A. Cường độ dòng điện ở cuộn thứ cấp là bao nhiêu A? (làm tròn đến hàng phần trăm)`),
      ans: hoiU ? D(U2, 2) : D(I2, 2),
      giai: hoiU
        ? `U₂/U₁ = N₂/N₁\nU₂ = ${U1} · ${N2}/${N1} = ${S(U2)} V ≈ ${D(U2, 2)} V.\n`
          + `(${N2 < N1 ? 'N₂ < N₁ nên đây là máy HẠ áp.' : 'N₂ > N₁ nên đây là máy TĂNG áp.'})`
        : `Với máy biến áp lí tưởng: U₁I₁ = U₂I₂ và U₂/U₁ = N₂/N₁\n`
          + `⇒ I₂/I₁ = N₁/N₂\nI₂ = ${S(I1)} · ${N1}/${N2} = ${S(I2)} A ≈ ${D(I2, 2)} A.\n`
          + `(${N2 < N1 ? 'Máy hạ áp: điện áp giảm nhưng dòng điện TĂNG.' : 'Máy tăng áp: điện áp tăng nhưng dòng điện GIẢM.'})`,
      meo: 'Điện áp và số vòng tỉ lệ THUẬN; cường độ dòng điện và số vòng tỉ lệ NGHỊCH.'
    };
  } },

{ ma: 'ly-haophi', chuong: 'Truyền tải điện', muc: 3, dang: 'tln',
  tao(R) {
    const k = R.nguyen(2, 40);
    const tang = R() < 0.5;
    return {
      q: tang
        ? `Khi truyền tải điện năng đi xa, nếu tăng điện áp ở nơi phát lên ${k} lần (giữ nguyên công suất truyền tải `
          + `và hệ số công suất) thì công suất hao phí trên đường dây giảm bao nhiêu lần?`
        : `Khi truyền tải điện năng đi xa, nếu giảm điện áp ở nơi phát đi ${k} lần (giữ nguyên công suất truyền tải `
          + `và hệ số công suất) thì công suất hao phí trên đường dây tăng bao nhiêu lần?`,
      ans: String(k * k),
      giai: `Công suất hao phí: P_hp = P²R/(U²cos²φ)\n`
          + `P, R, cosφ không đổi ⇒ P_hp tỉ lệ NGHỊCH với U².\n`
          + (tang
             ? `U tăng ${k} lần ⇒ U² tăng ${k * k} lần ⇒ P_hp giảm ${k * k} lần.`
             : `U giảm ${k} lần ⇒ U² giảm ${k * k} lần ⇒ P_hp tăng ${k * k} lần.`),
      meo: 'Hao phí tỉ lệ nghịch với BÌNH PHƯƠNG điện áp — đó là lý do có đường dây cao thế 500 kV.'
    };
  } },

{ ma: 'ly-dohutkhoi', chuong: 'Vật lí hạt nhân', muc: 3, dang: 'tln',
  tao(R) {
    /* Chọn hạt nhân và một giá trị năng lượng liên kết riêng thực tế, rồi SUY NGƯỢC
       ra khối lượng hạt nhân. Nhờ vậy số liệu vừa hợp lí về vật lí vừa nhất quán về số học. */
    const hn = R.chon([
      { t: '⁴₂He', Z: 2, A: 4 }, { t: '⁷₃Li', Z: 3, A: 7 }, { t: '⁹₄Be', Z: 4, A: 9 },
      { t: '¹¹₅B', Z: 5, A: 11 }, { t: '¹²₆C', Z: 6, A: 12 }, { t: '¹⁴₇N', Z: 7, A: 14 },
      { t: '¹⁶₈O', Z: 8, A: 16 }, { t: '²⁰₁₀Ne', Z: 10, A: 20 }, { t: '²³₁₁Na', Z: 11, A: 23 },
      { t: '²⁴₁₂Mg', Z: 12, A: 24 }, { t: '²⁷₁₃Al', Z: 13, A: 27 }, { t: '³¹₁₅P', Z: 15, A: 31 },
      { t: '³²₁₆S', Z: 16, A: 32 }, { t: '⁴⁰₂₀Ca', Z: 20, A: 40 }, { t: '⁵⁶₂₆Fe', Z: 26, A: 56 },
      { t: '⁶³₂₉Cu', Z: 29, A: 63 }, { t: '¹⁰⁸₄₇Ag', Z: 47, A: 108 }, { t: '²⁰⁷₈₂Pb', Z: 82, A: 207 }
    ]);
    const N = hn.A - hn.Z;
    const eps = R.nguyen(700, 880) / 100;            /* MeV/nuclon — dải thực tế 7,0–8,8 */
    const Wlk = eps * hn.A;
    const dm = Wlk / 931.5;
    const m = T(hn.Z * 1.00728 + N * 1.00866 - dm, 4);
    /* tính lại từ khối lượng đã làm tròn để lời giải khớp tuyệt đối với đề */
    const dm2 = hn.Z * 1.00728 + N * 1.00866 - m;
    const Wlk2 = dm2 * 931.5;
    const hoi = R.nguyen(1, 3);
    const kq = hoi === 1 ? T(dm2, 4) : hoi === 2 ? T(Wlk2, 2) : T(Wlk2 / hn.A, 2);
    if (kq <= 0) return null;
    const tenHoi = hoi === 1 ? 'độ hụt khối của hạt nhân (đơn vị u, làm tròn đến 4 chữ số thập phân)'
                 : hoi === 2 ? 'năng lượng liên kết của hạt nhân (đơn vị MeV, làm tròn đến hàng phần trăm)'
                             : 'năng lượng liên kết riêng của hạt nhân (đơn vị MeV/nuclon, làm tròn đến hàng phần trăm)';
    return {
      q: `Hạt nhân ${hn.t} có khối lượng ${S(m, 4)} u. Cho m<sub>p</sub> = 1,00728 u, m<sub>n</sub> = 1,00866 u, `
       + `1u = 931,5 MeV/c². Tính ${tenHoi}.`,
      ans: S(kq, hoi === 1 ? 4 : 2),
      giai: `Hạt nhân ${hn.t} có Z = ${hn.Z} proton và A − Z = ${N} neutron.\n`
          + `Độ hụt khối: Δm = ${hn.Z}·1,00728 + ${N}·1,00866 − ${S(m, 4)}\n`
          + `= ${S(T(hn.Z * 1.00728, 5), 5)} + ${S(T(N * 1.00866, 5), 5)} − ${S(m, 4)} = ${S(T(dm2, 4), 4)} u\n`
          + (hoi === 1 ? `Vậy Δm = ${S(kq, 4)} u.`
             : `Năng lượng liên kết: W_lk = Δm·931,5 = ${S(T(dm2, 4), 4)}·931,5 = ${S(T(Wlk2, 2), 2)} MeV\n`
               + (hoi === 2 ? `Vậy W_lk = ${S(kq, 2)} MeV.`
                            : `Năng lượng liên kết riêng: ε = W_lk/A = ${S(T(Wlk2, 2), 2)}/${hn.A} = ${S(kq, 2)} MeV/nuclon.`)),
      meo: 'So sánh độ bền các hạt nhân phải dùng W_lk/A (năng lượng liên kết RIÊNG), không dùng W_lk.'
    };
  } },

{ ma: 'ly-phongxa', chuong: 'Vật lí hạt nhân', muc: 3, dang: 'tln',
  tao(R) {
    const m0 = R.chon([8, 16, 32, 64, 128, 100, 200, 256]);
    const k = R.nguyen(1, 6);
    const hoiConLai = R() < 0.6;
    const conLai = T(m0 / Math.pow(2, k), 4);
    const daRa = T(m0 - conLai, 4);
    return {
      q: `Một mẫu chất phóng xạ ban đầu có khối lượng ${m0} g và chu kì bán rã T. `
       + `Sau khoảng thời gian t = ${k}T, khối lượng chất phóng xạ ${hoiConLai ? 'còn lại' : 'đã bị phân rã'} là bao nhiêu gam? `
       + `(làm tròn đến hàng phần trăm nếu cần)`,
      ans: S(hoiConLai ? conLai : daRa),
      giai: `Định luật phóng xạ: m = m₀·2^(−t/T)\n`
          + `Với t = ${k}T: m còn lại = ${m0}/${k === 1 ? '2' : '2<sup>' + k + '</sup>'} = ${m0}/${Math.pow(2, k)} = ${S(conLai)} g\n`
          + (hoiConLai ? `Vậy khối lượng còn lại là ${S(conLai)} g.`
                       : `Khối lượng đã phân rã = ${m0} − ${S(conLai)} = ${S(daRa)} g.`),
      meo: 'Đọc kỹ đề hỏi CÒN LẠI hay ĐÃ PHÂN RÃ — hai đáp án hoàn toàn khác nhau.'
    };
  } },

{ ma: 'ly-chukiban', chuong: 'Vật lí hạt nhân', muc: 3, dang: 'tln',
  tao(R) {
    const T0 = R.nguyen(2, 60);
    const k = R.nguyen(1, 6);
    const t = T0 * k;
    return {
      q: `Một chất phóng xạ có chu kì bán rã ${T0} ngày. Sau bao nhiêu ngày thì số hạt nhân của mẫu chất còn lại `
       + `bằng 1/${Math.pow(2, k)} số hạt nhân ban đầu?`,
      ans: String(t),
      giai: `N/N₀ = 2^(−t/T) = 1/${Math.pow(2, k)} = 2^(−${k})\n`
          + `⇒ t/T = ${k} ⇒ t = ${k}·T = ${k}·${T0} = ${t} ngày.`,
      meo: 'Còn lại 1/2ᵏ nghĩa là đã trôi qua đúng k chu kì bán rã.'
    };
  } },

{ ma: 'ly-daodong', chuong: 'Dao động điều hoà', muc: 2, dang: 'tln',
  tao(R) {
    const A = R.nguyen(2, 20);                        /* cm */
    const w = R.chon([2, 4, 5, 10, 20]);
    const hoiV = R() < 0.5;
    const vmax = A * w, amax = A * w * w;
    return {
      q: `Một vật dao động điều hoà với biên độ ${A} cm và tần số góc ${w} rad/s. `
       + `Tính ${hoiV ? 'tốc độ cực đại của vật (cm/s)' : 'gia tốc cực đại của vật (cm/s²)'}.`,
      ans: String(hoiV ? vmax : amax),
      giai: hoiV
        ? `v_max = ω·A = ${w}·${A} = ${vmax} cm/s (đạt tại vị trí cân bằng).`
        : `a_max = ω²·A = ${w}²·${A} = ${w * w}·${A} = ${amax} cm/s² (đạt tại hai vị trí biên).`,
      meo: 'Tại vị trí cân bằng: v cực đại, a = 0. Tại biên: v = 0, a cực đại. Hai đại lượng ngược pha nhau.'
    };
  } },

{ ma: 'ly-ohm', chuong: 'Dòng điện', muc: 2, dang: 'tln',
  tao(R) {
    const xi = R.nguyen(6, 24);
    const r = T(R.nguyen(2, 20) / 10, 1);
    const Rn = R.nguyen(2, 20);
    const I = T(xi / (Rn + r), 3);
    const hoiI = R() < 0.6;
    const U = T(I * Rn, 3);
    return {
      q: `Một nguồn điện có suất điện động ${xi} V và điện trở trong ${S(r)} Ω được nối với điện trở ngoài ${Rn} Ω. `
       + `Tính ${hoiI ? 'cường độ dòng điện trong mạch (A)' : 'hiệu điện thế giữa hai cực của nguồn (V)'}. (làm tròn đến hàng phần trăm)`,
      ans: hoiI ? D(I, 2) : D(U, 2),
      giai: `Định luật Ohm cho toàn mạch: I = ξ/(R + r)\n`
          + `I = ${xi}/(${Rn} + ${S(r)}) = ${xi}/${S(T(Rn + r, 2))} = ${S(I)} A\n`
          + (hoiI ? `Vậy I ≈ ${D(I, 2)} A.`
                  : `Hiệu điện thế hai cực: U = I·R = ${S(I)}·${Rn} = ${S(U)} V ≈ ${D(U, 2)} V.\n(Cũng bằng U = ξ − I·r = ${xi} − ${S(I)}·${S(r)}.)`),
      meo: 'U hai cực nguồn chỉ bằng ξ khi mạch HỞ. Có dòng chạy thì U = ξ − I·r luôn nhỏ hơn ξ.'
    };
  } },

{ ma: 'ly-joule', chuong: 'Dòng điện', muc: 2, dang: 'tln',
  tao(R) {
    const I = T(R.nguyen(5, 60) / 10, 1);
    const Rn = R.nguyen(2, 40);
    const t = R.chon([10, 30, 60, 120, 300, 600]);
    const Q = T(I * I * Rn * t / 1000, 3);
    return {
      q: `Cho dòng điện cường độ ${S(I)} A chạy qua điện trở ${Rn} Ω trong ${t} giây. `
       + `Tính nhiệt lượng toả ra trên điện trở (đơn vị kJ, làm tròn đến hàng phần trăm).`,
      ans: D(Q, 2),
      giai: `Định luật Joule–Lenz: Q = I²·R·t\n`
          + `Q = ${S(I)}² · ${Rn} · ${t} = ${S(T(I * I, 3))} · ${Rn} · ${t} = ${S(T(I * I * Rn * t, 1))} J = ${D(Q, 2)} kJ.`,
      meo: 'Nhiệt lượng tỉ lệ với BÌNH PHƯƠNG cường độ dòng điện — tăng I gấp đôi thì nhiệt gấp bốn.'
    };
  } },

{ ma: 'ly-kelvin', chuong: 'Vật lí nhiệt', muc: 1, dang: 'tln',
  tao(R) {
    const sangK = R() < 0.5;
    const t = R.nguyen(-100, 400);
    return {
      q: sangK
        ? `Đổi nhiệt độ ${t} °C sang thang Kelvin.`
        : `Đổi nhiệt độ ${t + 273} K sang thang Celsius.`,
      ans: String(sangK ? t + 273 : t),
      giai: sangK
        ? `T(K) = t(°C) + 273 = ${t} + 273 = ${t + 273} K.`
        : `t(°C) = T(K) − 273 = ${t + 273} − 273 = ${t} °C.`,
      meo: 'Nhớ mốc: 0 K = −273 °C (độ không tuyệt đối). Độ CHÊNH LỆCH thì hai thang như nhau.'
    };
  } }
];
})();
